// Shared audio analysis engine — BPM & Key detection

export function getMono(buf: AudioBuffer): Float32Array {
  if (buf.numberOfChannels === 1) return buf.getChannelData(0).slice();
  const L = buf.getChannelData(0);
  const R = buf.getChannelData(1);
  const out = new Float32Array(L.length);
  for (let i = 0; i < L.length; i++) out[i] = (L[i] + R[i]) * 0.5;
  return out;
}

// Cooley-Tukey radix-2 in-place FFT — input must be power-of-2 length
export function fftMagnitudes(signal: Float32Array): Float32Array {
  const n = signal.length;
  const re = new Float64Array(signal);
  const im = new Float64Array(n);

  // Bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { const t = re[i]; re[i] = re[j]; re[j] = t; }
  }

  // Butterfly passes
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wRe = Math.cos(ang);
    const wIm = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curRe = 1.0, curIm = 0.0;
      const half = len >> 1;
      for (let k = 0; k < half; k++) {
        const uRe = re[i + k], uIm = im[i + k];
        const vRe = re[i + k + half] * curRe - im[i + k + half] * curIm;
        const vIm = re[i + k + half] * curIm + im[i + k + half] * curRe;
        re[i + k] = uRe + vRe; im[i + k] = uIm + vIm;
        re[i + k + half] = uRe - vRe; im[i + k + half] = uIm - vIm;
        const nRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe; curRe = nRe;
      }
    }
  }

  const mag = new Float32Array(n >> 1);
  for (let i = 0; i < (n >> 1); i++) mag[i] = Math.sqrt(re[i] * re[i] + im[i] * im[i]);
  return mag;
}

// ── BPM DETECTION ─────────────────────────────────────────────────────────────
//
// Uses spectral flux onset detection (not RMS energy flux).
// Spectral flux = sum of positive bin-to-bin magnitude differences between
// consecutive frames. This detects actual transients regardless of loudness,
// and is not fooled by slow-moving volume changes or sustained notes.
//
// Two analysis windows are evaluated; the one with stronger autocorrelation
// is used so a quiet intro or breakdown does not poison the result.

export function detectBPM(audioBuffer: AudioBuffer): { bpm: number; confidence: number } {
  const sr   = audioBuffer.sampleRate;
  const mono = getMono(audioBuffer);

  const frameSize = 1024;
  const hop  = 512;
  const fps  = sr / hop;

  // Hann window — reduces spectral leakage on onset frames
  const hann = new Float32Array(frameSize);
  for (let i = 0; i < frameSize; i++) hann[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / frameSize));

  // Compute spectral flux onset strength for a sample slice
  function spectralFlux(samples: Float32Array): Float32Array {
    const nFrames = Math.floor((samples.length - frameSize) / hop);
    const onset   = new Float32Array(nFrames);
    const frame   = new Float32Array(frameSize);
    // prevMag starts as silence — fftMagnitudes always returns a new array,
    // so assigning prevMag = mag on each iteration is safe (no aliasing).
    let prevMag: Float32Array = new Float32Array(frameSize >> 1);

    for (let f = 0; f < nFrames; f++) {
      const off = f * hop;
      for (let i = 0; i < frameSize; i++) frame[i] = samples[off + i] * hann[i];
      const mag = fftMagnitudes(frame);
      let flux = 0;
      for (let i = 0; i < mag.length; i++) {
        const d = mag[i] - prevMag[i];
        if (d > 0) flux += d; // half-wave rectification: only count increases
      }
      onset[f] = flux;
      prevMag = mag; // safe — fftMagnitudes allocates a fresh array each call
    }
    return onset;
  }

  // Autocorrelation of onset function over 60–200 BPM lag range
  function acBPM(onset: Float32Array): { lag: number; strength: number } {
    const nFrames = onset.length;
    const minLag  = Math.max(1, Math.ceil(fps * 60 / 200));
    const maxLag  = Math.floor(fps * 60 / 60);

    let totalAC = 0, bestLag = minLag, bestVal = -Infinity;
    for (let lag = minLag; lag <= maxLag; lag++) {
      const n = nFrames - lag;
      let sum = 0;
      for (let i = 0; i < n; i++) sum += onset[i] * onset[i + lag];
      const v = sum / n; // divide by pairs to remove lag-length bias
      totalAC += v;
      if (v > bestVal) { bestVal = v; bestLag = lag; }
    }
    const meanAC = totalAC / (maxLag - minLag + 1);
    return {
      lag:      bestLag,
      strength: meanAC > 0 ? Math.min(1, Math.max(0, (bestVal / meanAC - 1) / 3)) : 0,
    };
  }

  // Analyze two non-overlapping windows; keep the one with stronger periodicity.
  // 30s is enough data — autocorrelation over 60 BPM (1 Hz period) needs ~60 lags.
  const windowLen = Math.min(Math.floor(sr * 35), Math.floor(mono.length * 0.40));
  const windowStarts = [0.15, 0.52].map(p => Math.floor(mono.length * p));

  let bestLag      = fps * 60 / 120; // fallback: 120 BPM
  let bestStrength = 0;

  for (const s of windowStarts) {
    const end = Math.min(s + windowLen, mono.length);
    if (end - s < sr * 8) continue;
    const onset = spectralFlux(mono.subarray(s, end));
    const { lag, strength } = acBPM(onset);
    if (strength > bestStrength) { bestStrength = strength; bestLag = lag; }
  }

  const rawBPM = fps * 60 / bestLag;

  // Half/double-time correction — expand candidates and score them.
  // Score: strongly prefer the 80–160 BPM range; mildly prefer proximity to 120.
  const candidates = [rawBPM, rawBPM * 2, rawBPM / 2, rawBPM * 3 / 2, rawBPM * 2 / 3]
    .filter(b => b >= 55 && b <= 210)
    .sort((a, b) => {
      const score = (bpm: number) =>
        (bpm >= 80 && bpm <= 160 ? 3 : bpm >= 65 && bpm <= 180 ? 1 : 0) -
        Math.abs(bpm - 120) * 0.005;
      return score(b) - score(a);
    });

  return { bpm: Math.round(candidates[0] ?? rawBPM), confidence: bestStrength };
}

// ── KEY DETECTION ─────────────────────────────────────────────────────────────
//
// Improvements over naive chromagram:
//   1. Low frequency cutoff raised to 130 Hz (≈ C3).
//      Frequencies below 130 Hz are dominated by kick drums and sub-bass,
//      which add spurious chroma energy and bias results toward keys that
//      contain common drum-tuning pitches (often around C/D).
//   2. Log-compressed accumulation: log1p(mag) reduces the dominance of a
//      single very loud note (e.g., a prominent bass note in one section).
//   3. Three analysis windows (10%, 35%, 60% of the track) are combined so
//      that a single atypical section does not dominate the chromagram.
//   4. L2 normalization before Pearson correlation (more stable than max-norm).

const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function pearson(a: number[], b: number[]): number {
  const n = a.length;
  let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da  += (a[i] - ma) ** 2;
    db  += (b[i] - mb) ** 2;
  }
  return (da * db === 0) ? 0 : num / Math.sqrt(da * db);
}

export function detectKey(audioBuffer: AudioBuffer): { key: string; scale: string; confidence: number } {
  const sr   = audioBuffer.sampleRate;
  const mono = getMono(audioBuffer);

  const fftSize = 2048;
  const hop     = 1024;

  // Hann window
  const hann = new Float32Array(fftSize);
  for (let i = 0; i < fftSize; i++) hann[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / fftSize));

  // Bin → pitch-class map.
  // Lower bound: 130 Hz (≈ C3) — avoids kick drum and bass guitar open strings.
  // Upper bound: 4200 Hz — covers melody/harmony range without high noise.
  const binToPC = new Int8Array(fftSize >> 1).fill(-1);
  for (let bin = 1; bin < (fftSize >> 1); bin++) {
    const freq = (bin * sr) / fftSize;
    if (freq < 130 || freq > 4200) continue;
    const midi = 69 + 12 * Math.log2(freq / 440);
    binToPC[bin] = (((Math.round(midi) % 12) + 12) % 12) as number;
  }

  // Accumulate chromagram across three windows
  const chroma    = new Float64Array(12);
  const frame     = new Float32Array(fftSize);
  const winLen    = Math.min(Math.floor(sr * 30), Math.floor(mono.length * 0.30));
  const winStarts = [0.10, 0.38, 0.65].map(p => Math.floor(mono.length * p));

  for (const start of winStarts) {
    const end = Math.min(start + winLen, mono.length);
    if (end - start < sr * 6) continue; // skip if window too short
    const samples = mono.subarray(start, end);
    const nFrames = Math.floor((samples.length - fftSize) / hop);

    for (let f = 0; f < nFrames; f++) {
      const off = f * hop;
      for (let i = 0; i < fftSize; i++) frame[i] = samples[off + i] * hann[i];
      const mag = fftMagnitudes(frame);
      for (let bin = 1; bin < (fftSize >> 1); bin++) {
        const pc = binToPC[bin];
        // log1p compresses the dynamic range: a note 10× louder gets ~2.4×
        // weight, not 10×. Prevents one dominant bass note from controlling
        // the chromagram.
        if (pc >= 0) chroma[pc] += Math.log1p(mag[bin]);
      }
    }
  }

  // L2 normalize — preserves relative shape; more numerically stable than
  // max-normalization when one pitch class is much louder than the others.
  let l2 = 0;
  for (let i = 0; i < 12; i++) l2 += chroma[i] * chroma[i];
  l2 = Math.sqrt(l2);
  if (l2 > 0) for (let i = 0; i < 12; i++) chroma[i] /= l2;

  // Krumhansl-Schmuckler: correlate with all 24 key profiles
  const ch = Array.from(chroma);
  let bestKey = 0, bestScale = 'major', bestCorr = -Infinity;

  for (let root = 0; root < 12; root++) {
    const rotate = (profile: number[]) =>
      Array.from({ length: 12 }, (_, i) => profile[(i - root + 12) % 12]);
    const maj = pearson(ch, rotate(MAJOR_PROFILE));
    const min = pearson(ch, rotate(MINOR_PROFILE));
    if (maj > bestCorr) { bestCorr = maj; bestKey = root; bestScale = 'major'; }
    if (min > bestCorr) { bestCorr = min; bestKey = root; bestScale = 'minor'; }
  }

  return {
    key:        NOTE_NAMES[bestKey],
    scale:      bestScale,
    // Pearson r ∈ [-1, 1]: map to [0, 1] confidence
    confidence: Math.max(0, Math.min(1, (bestCorr + 1) / 2)),
  };
}
