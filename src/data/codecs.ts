export interface CodecInfo {
  id: string;
  name: string;
  developer: string;
  maxBitrateKbps: number;
  /** Typical real-world round-trip latency range in ms */
  latencyRange: [number, number];
  audioQuality: 'standard' | 'good' | 'high' | 'very-high';
  /** True if natively supported on Android without third-party apps */
  androidNative: boolean;
  /** True if supported on iOS/macOS */
  iOSSupport: boolean;
  compression: 'lossy' | 'lossless-like' | 'lossless';
  summary: string;
}

export const CODECS: Record<string, CodecInfo> = {
  sbc: {
    id: 'sbc',
    name: 'SBC',
    developer: 'Bluetooth SIG',
    maxBitrateKbps: 328,
    latencyRange: [150, 270],
    audioQuality: 'standard',
    androidNative: true,
    iOSSupport: true,
    compression: 'lossy',
    summary: 'The mandatory fallback codec every Bluetooth device supports. Highest latency, lowest audio quality. Used when no premium codec is available.',
  },
  aac: {
    id: 'aac',
    name: 'AAC',
    developer: 'Apple / ISO',
    maxBitrateKbps: 264,
    latencyRange: [70, 200],
    audioQuality: 'good',
    androidNative: false,
    iOSSupport: true,
    compression: 'lossy',
    summary: 'Apple\'s preferred codec. Excellent latency on iOS (70–150 ms) due to hardware-level optimization in W/H chips. Inconsistent on Android — implementation quality varies widely by device.',
  },
  aptx: {
    id: 'aptx',
    name: 'aptX',
    developer: 'Qualcomm',
    maxBitrateKbps: 352,
    latencyRange: [60, 120],
    audioQuality: 'good',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Qualcomm\'s CD-quality baseline codec. Lower latency than SBC and AAC. Requires both the source device and headphones to support it. Not available on Apple devices.',
  },
  aptx_hd: {
    id: 'aptx_hd',
    name: 'aptX HD',
    developer: 'Qualcomm',
    maxBitrateKbps: 576,
    latencyRange: [100, 200],
    audioQuality: 'high',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Higher-resolution variant of aptX supporting 24-bit/48kHz audio. Trades some latency efficiency for improved audio quality. Still better than LDAC for real-time use.',
  },
  aptx_adaptive: {
    id: 'aptx_adaptive',
    name: 'aptX Adaptive',
    developer: 'Qualcomm',
    maxBitrateKbps: 1000,
    latencyRange: [50, 90],
    audioQuality: 'very-high',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Qualcomm\'s premium adaptive-bitrate codec. Dynamically switches between 279–1000 kbps based on signal conditions. Game mode target: 50 ms. Excellent for both quality and latency.',
  },
  ldac: {
    id: 'ldac',
    name: 'LDAC',
    developer: 'Sony',
    maxBitrateKbps: 990,
    latencyRange: [170, 350],
    audioQuality: 'very-high',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Sony\'s high-resolution wireless codec at up to 990 kbps. Outstanding audio quality but the highest latency of any mainstream codec. Avoid for gaming or video. Best for critical listening only.',
  },
  samsung_scalable: {
    id: 'samsung_scalable',
    name: 'Samsung Scalable',
    developer: 'Samsung',
    maxBitrateKbps: 512,
    latencyRange: [50, 110],
    audioQuality: 'high',
    androidNative: false,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Samsung\'s proprietary adaptive codec, exclusive to Galaxy devices and Galaxy Buds. Adjusts bitrate based on Bluetooth signal stability. Solid latency and quality on the Galaxy ecosystem.',
  },
  aptx_ll: {
    id: 'aptx_ll',
    name: 'aptX Low Latency',
    developer: 'Qualcomm',
    maxBitrateKbps: 352,
    latencyRange: [32, 40],
    audioQuality: 'good',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'Qualcomm states approximately 40 ms end to end latency for aptX Low Latency, with some implementations measured closer to 32 ms. Built specifically to keep audio and video in sync for gaming and lip sync, at the cost of the higher bitrate ceiling that aptX HD or aptX Adaptive offer. Source: Qualcomm aptX Low Latency product page.',
  },
  lc3: {
    id: 'lc3',
    name: 'LC3',
    developer: 'Bluetooth SIG',
    maxBitrateKbps: 345,
    latencyRange: [20, 30],
    audioQuality: 'high',
    androidNative: true,
    iOSSupport: false,
    compression: 'lossy',
    summary: 'The mandatory codec for Bluetooth LE Audio, built on 7.5 ms or 10 ms frames, which typically works out to roughly 20 to 30 ms of algorithmic latency in real implementations. Requires Bluetooth 5.2 or later hardware on both the source and the headphones, plus OS-level LE Audio support. Source: Bluetooth SIG LC3 technical characterization white paper.',
  },
};

export const CODEC_QUALITY_ORDER: string[] = ['sbc', 'aptx_ll', 'lc3', 'aac', 'aptx', 'aptx_hd', 'samsung_scalable', 'aptx_adaptive', 'ldac'];

export function getCodecInfo(id: string): CodecInfo | undefined {
  return CODECS[id];
}

export function getBestCodec(codecIds: string[]): CodecInfo | undefined {
  let best: CodecInfo | undefined;
  let bestScore = -1;
  const scoreMap: Record<string, number> = { sbc: 0, aptx_ll: 1, lc3: 2, aac: 3, aptx: 4, aptx_hd: 5, samsung_scalable: 6, aptx_adaptive: 7, ldac: 8 };
  for (const id of codecIds) {
    const score = scoreMap[id] ?? -1;
    if (score > bestScore && CODECS[id]) {
      best = CODECS[id];
      bestScore = score;
    }
  }
  return best;
}

export function getLowestLatencyCodec(codecIds: string[]): CodecInfo | undefined {
  let best: CodecInfo | undefined;
  let bestMin = Infinity;
  for (const id of codecIds) {
    const codec = CODECS[id];
    if (codec && codec.latencyRange[0] < bestMin) {
      best = codec;
      bestMin = codec.latencyRange[0];
    }
  }
  return best;
}
