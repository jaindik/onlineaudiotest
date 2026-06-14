# Tinnitus Frequency Matcher — Full Product & SEO Plan

> Written from a senior engineering perspective after a full competitive teardown of audionotch.com.

---

## 1. Competitive Analysis: AudioNotch Deep Teardown

### What They Built

AudioNotch's `/app/tune/` is the gold standard free tinnitus frequency tuner. Their entire business is a 3-step funnel:

1. **Free tuner** → user finds their tinnitus frequency (no account required)
2. **Notched therapy creation** → requires paid account ($39.95–$99.95)
3. **Ongoing listening** → retention via subscription

The free tuner is the traffic engine. It ranks for every tinnitus frequency keyword and feeds their paid product. Our tool doesn't need to sell therapy — we can offer a better, fully free experience and win on SEO.

### Their Tool — Exact Functionality

**UI Controls:**
- Play / Stop button
- Volume slider (default: 25%)
- Frequency input number box (type exact Hz)
- Frequency adjustment slider (range not publicly documented)
- Wave type dropdown: Pure tone, Square wave, Sawtooth wave, Triangle wave, Filtered noise, BB noise

**Matching Method:** Pure free adjustment. No guided methodology. User drags the slider until the tone "sounds like" their tinnitus. That's it. No structure, no confirmation step, no psychoacoustic rigor.

**Educational content on the page (their H2 structure — this is their SEO skeleton):**
- "How close do I have to be?" → ERB formula: `ERB = 107.94 * f + 24.7`
- "What is octave confusion?" → Compare F, F/2, 2F and pick closest
- "What if I have multiple tinnitus tones?" → Sequential notching workaround
- "What are the most common tinnitus frequencies?" → Distribution graph
- "What is Notched Sound Therapy?"
- "How Does AudioNotch Work?"

**After matching:** Click "Create Therapy" → requires account creation → paywall.

### Their Weaknesses (Our Opportunities)

| AudioNotch Weakness | Our Advantage |
|---------------------|---------------|
| Slider only — zero guided methodology | Structured 3-phase matching with octave identification first |
| Octave confusion is just text warning — not built into the tool | Automated octave confusion test built directly into the flow |
| No fine-tune controls | Arrow-key fine tuning + number input |
| No downloadable result | Download matched tone as WAV |
| No shareable URL | `?freq=4000&wave=sine` URL params |
| Create Therapy → paywall immediately | 100% free, no account |
| Basic UI, no waveform | Live waveform visualizer (we already have this) |
| No frequency interpretation | Show what their frequency means + context |
| No internal tool cross-links | Link to our hearing test, frequency generator |
| No result history | localStorage saves last matched frequency |

### Their SEO Keywords (Extracted from Content + H Tags)

Primary:
- tinnitus frequency matcher
- find my tinnitus frequency
- tinnitus frequency test
- tinnitus pitch matching
- what frequency is my tinnitus
- tinnitus tuner online free
- tinnitus tone generator free

Long-tail (from their H2s and FAQ content):
- what hz is tinnitus
- how accurate does tinnitus frequency need to be
- octave confusion tinnitus
- most common tinnitus frequencies
- tinnitus frequency 4000 hz
- tinnitus frequency 8000 hz
- how to find tinnitus pitch
- tinnitus frequency chart
- identify tinnitus frequency online
- tinnitus tone matching online
- pure tone tinnitus test
- tinnitus frequency detection free tool

---

## 2. Our Feature: Tinnitus Frequency Matcher

### URL
```
https://onlineaudiotest.com/tinnitus-frequency-matcher/
```

### Page Title
```
Tinnitus Frequency Matcher — Find Your Tinnitus Hz Free
```

### Meta Description
```
Find your exact tinnitus frequency in Hz using our free online matcher. 
Guided 3-step tone matching with octave confirmation, waveform visualizer, 
and downloadable result. No account required.
```

### H1
```
Tinnitus Frequency Matcher
```

---

## 3. User Flow — 3-Phase Matching Methodology

This is the core engineering differentiator. Instead of "drag a slider until it sounds right," we use a structured psychoacoustic protocol that mirrors clinical pitch matching.

### Phase 1 — Octave Identification (Coarse)

**Goal:** Narrow down to the right octave before fine-tuning. Eliminates octave confusion entirely.

**UI:** 8–9 frequency buttons at standard octave intervals. User clicks each and decides if their tinnitus is higher, lower, or in the same range.

**Frequencies shown:**
```
125 Hz | 250 Hz | 500 Hz | 1 kHz | 2 kHz | 4 kHz | 8 kHz | 12 kHz | 16 kHz
```

**Interaction:** User clicks Play on each. A simple three-button response:
- "My tinnitus is LOWER"
- "Sounds close to this range"  
- "My tinnitus is HIGHER"

The selected range becomes the slider's starting center point for Phase 2.

**Why this works:** Most people can correctly identify their octave even if they can't nail the exact frequency. This removes the single biggest source of error in free-slider matching.

---

### Phase 2 — Fine Tuning (In-Octave Slider)

**Goal:** Find the exact frequency within ±1 ERB of the true tinnitus frequency.

**UI:** 
- Large frequency display (same design as our existing frequency generator)
- Logarithmic slider scoped to the identified octave ±1 octave (e.g., if user picked 4 kHz, slider runs 2 kHz–8 kHz)
- Number input for direct Hz entry
- Wave type selector: Sine, Square, Sawtooth, Triangle, Bandlimited Noise
- Live waveform visualizer
- Keyboard arrow key fine control (← → for ±1 Hz, Shift+← → for ±10 Hz)

**Instructions shown:**
> "Adjust the slider until the computer tone blends with or cancels your tinnitus. They should sound like the same pitch. Use arrow keys for fine adjustment."

---

### Phase 3 — Octave Confirmation (Anti-Confusion Check)

**Goal:** Automatically surface F/2 and 2F comparisons so users confirm they're not off by an octave.

**UI:** Three audio buttons presented side by side:

```
[  Play F/2  ]    [  Play F  ]    [  Play 2F  ]
  (half freq)     (your match)    (double freq)
```

Label: "Which of these three tones sounds most like your tinnitus?"

User clicks the one that matches. If they pick F/2 or 2F, the matched frequency automatically updates.

**Why this matters:** AudioNotch mentions octave confusion in a text paragraph. We make it an interactive step that cannot be skipped.

---

### Result Screen

After Phase 3, show a result card:

```
Your Tinnitus Frequency

  4,000 Hz
  (4.0 kHz)
  
  Wave Type: Pure Tone

  [  Play  ]  [  Download WAV  ]  [  Share  ]

  ─────────────────────────────────────────

  What this means:
  4,000 Hz is in the high-frequency range. This is the 
  single most common tinnitus frequency, typically caused 
  by noise-induced hearing loss affecting the 4 kHz "notch" 
  in the cochlea.

  Accuracy: Your match should be within ±400 Hz to be 
  therapeutically effective (based on ERB at 4 kHz).

  ─────────────────────────────────────────

  Next steps:
  → Take our Hearing Test to check your hearing at this frequency
  → Use our Frequency Generator to listen to tones near your tinnitus
  → Return to this page weekly — tinnitus frequency can shift
```

**URL updates to:** `/tinnitus-frequency-matcher/?freq=4000&wave=sine`
**localStorage:** Saves `tinnitusFreq`, `tinnitusWave`, `tinnitusDate` for returning users

---

## 4. Technical Implementation

### File
```
src/pages/tinnitus-frequency-matcher.astro
```

### Core Audio Engine

Reuse and extend the existing frequency generator's Web Audio API engine:
- `AudioContext` + `OscillatorNode` (sine/square/sawtooth/triangle)
- For bandlimited noise: `AudioBufferSourceNode` with white noise buffer fed through `BiquadFilterNode` (type: `bandpass`, Q factor: ~5, centered on target frequency)
- `GainNode` for volume, `AnalyserNode` for waveform visualizer
- Same `OfflineAudioContext` WAV export from frequency generator

### Phase Logic (State Machine)

```typescript
type Phase = 'intro' | 'coarse' | 'fine' | 'confirm' | 'result';

// State
let phase: Phase = 'intro';
let coarseFreq: number | null = null;   // selected octave center
let matchedFreq: number = 4000;
let matchedWave: OscillatorType = 'sine';
```

### Octave Coarse Range Mapping

```typescript
const OCTAVE_CENTERS = [125, 250, 500, 1000, 2000, 4000, 8000, 12000, 16000];

function getFineTuneRange(center: number): [number, number] {
  // One full octave below and above selected center
  return [center / 2, center * 2];
}
```

### ERB Accuracy Display

```typescript
function getERB(hz: number): number {
  return 107.94 * hz + 24.7;  // AudioNotch's own published formula
}

function getAccuracyWindow(hz: number): string {
  const erb = getERB(hz);
  const window = Math.round(erb * 2); // ±1 ERB
  return `±${window} Hz`;
}
```

### URL Persistence

```typescript
// On result: write to URL
const params = new URLSearchParams({ freq: String(Math.round(matchedFreq)), wave: matchedWave });
history.replaceState(null, '', '?' + params.toString());

// On load: restore from URL
const p = new URLSearchParams(window.location.search);
const savedFreq = parseFloat(p.get('freq') ?? '');
if (!isNaN(savedFreq) && savedFreq >= 20 && savedFreq <= 20000) {
  matchedFreq = savedFreq;
  // Skip to result phase if freq is in URL
  phase = 'result';
}
```

### localStorage Resume Banner

```typescript
const saved = localStorage.getItem('tinnitusMatch');
if (saved) {
  const { freq, wave, date } = JSON.parse(saved);
  // Show: "Last match: 4,000 Hz on Jun 3, 2026 — Resume or Start Over"
}
```

---

## 5. SEO Content Plan

### Page Structure (H2 sections below the tool)

1. **What Is Tinnitus Pitch Matching?**
   - Explain the concept, why finding the frequency matters for therapy
   - Internal link: hearing test

2. **How to Find Your Tinnitus Frequency** ← Primary keyword section
   - Walk through the 3-phase method
   - Explain octave confusion and how we handle it

3. **Most Common Tinnitus Frequencies**
   - Table: frequency → % of tinnitus sufferers → common cause
   - Targets: "tinnitus frequency 4000 hz", "most common tinnitus hz", etc.
   - Sourced from published tinnitus frequency distribution research

4. **What Does Your Tinnitus Frequency Mean?**
   - Frequency ranges and what they indicate about the underlying cause
   - Links to hearing test

5. **What Is the ERB Tolerance?**
   - Explain the ERB formula
   - Make it accessible: "You don't need to be exact — here's why"

6. **Tinnitus Frequency Matching FAQ**
   - 12–15 targeted questions (see below)

### Common Tinnitus Frequencies Table (SEO anchor)

| Frequency | Prevalence | Common Cause |
|-----------|------------|--------------|
| 1,000 Hz | ~10% | Ear infection, medication |
| 2,000 Hz | ~12% | Noise exposure, early hearing loss |
| 4,000 Hz | ~25% | Noise-induced hearing loss (most common) |
| 6,000 Hz | ~15% | Noise exposure |
| 8,000 Hz | ~18% | Age-related hearing loss |
| 10,000–12,000 Hz | ~8% | High-frequency noise damage |
| 16,000+ Hz | ~5% | Severe high-frequency loss |

> Note: Pull exact figures from published research before publishing (Axelsson & Ringdahl 1989; Henry et al.) and cite them.

### FAQ Targets (12 Questions → FAQ Schema)

1. What is tinnitus pitch matching?
2. How do I find my tinnitus frequency?
3. What is the most common tinnitus frequency?
4. Is 4000 Hz a common tinnitus frequency?
5. How accurate does my tinnitus frequency need to be?
6. What is octave confusion in tinnitus?
7. Can my tinnitus frequency change over time?
8. What wave type should I use to match my tinnitus?
9. What is bandlimited noise and why is it used for tinnitus matching?
10. What do I do after finding my tinnitus frequency?
11. Can this tool diagnose tinnitus?
12. How is this different from AudioNotch?

---

## 6. Full JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Tinnitus Frequency Matcher",
      "url": "https://onlineaudiotest.com/tinnitus-frequency-matcher/",
      "description": "Free online tool to find your tinnitus frequency in Hz using a guided 3-phase pitch matching method with octave confirmation.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onlineaudiotest.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tinnitus Frequency Matcher", "item": "https://onlineaudiotest.com/tinnitus-frequency-matcher/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [ ... 12 Q&A objects ... ]
    }
  ]
}
```

---

## 7. Internal Linking Map

### This page links OUT to:
- `/hearing-test/` — "Take our hearing test to check sensitivity at your tinnitus frequency"
- `/frequency-generator/` — "Use our frequency generator to explore tones near your tinnitus" + `?freq=4000` param to preload
- `/speaker-test/` — natural mention when talking about headphone vs speaker testing

### Other pages link IN to this page:
- `/hearing-test/` → "If you have tinnitus, try our [Tinnitus Frequency Matcher]"
- `/frequency-generator/` → Add FAQ: "Can I use this to find my tinnitus frequency? → Try our [dedicated tinnitus matcher]"
- Homepage `/` → Add to tools list
- Nav/footer → Add to free tools section

---

## 8. Differentiators Summary vs AudioNotch

| Feature | AudioNotch | Us |
|---------|-----------|-----|
| Structured coarse → fine methodology | No — slider only | Yes — Phase 1 octave ID |
| Octave confusion handled IN the tool | No — text warning only | Yes — Phase 3 confirmation |
| Account required | Yes for therapy creation | No — 100% free |
| Downloadable matched tone WAV | No | Yes |
| Shareable URL with frequency | No | Yes (?freq=4000) |
| Resume last session | No | Yes (localStorage) |
| Frequency interpretation / meaning | No | Yes — table + context |
| Waveform visualizer | No | Yes |
| ERB accuracy display | Text only | Computed live per matched frequency |
| Bandlimited noise wave type | "Filtered noise", "BB noise" (no explanation) | Yes + explanation |
| Fine-tune via keyboard | Partially | Yes — arrow keys ±1 Hz / ±10 Hz |

---

## 9. Keyword Targeting Priority

### Tier 1 — Target from day 1 (page title, H1, meta)
- tinnitus frequency matcher
- find my tinnitus frequency
- tinnitus frequency test

### Tier 2 — H2 headings + content
- what frequency is my tinnitus
- most common tinnitus frequencies
- tinnitus pitch matching online
- how to identify tinnitus frequency
- tinnitus frequency hz

### Tier 3 — FAQ schema, body content
- octave confusion tinnitus
- tinnitus frequency 4000 hz
- tinnitus frequency chart
- what wave type matches tinnitus
- tinnitus tuner free online
- audionotch alternative free

---

## 10. Implementation Checklist

### Build
- [ ] `/tinnitus-frequency-matcher.astro` page created
- [ ] Phase 1: Octave coarse selector (9 frequency buttons)
- [ ] Phase 2: Fine-tune slider scoped to selected octave
- [ ] Phase 3: Octave confirmation (F/2, F, 2F three-way)
- [ ] Result card with frequency, interpretation, ERB window
- [ ] Download WAV of matched frequency
- [ ] URL params (`?freq=&wave=`) on result
- [ ] localStorage save/restore with resume banner
- [ ] Waveform visualizer (reuse from frequency-generator)
- [ ] Bandlimited noise type (BiquadFilter bandpass on white noise buffer)
- [ ] Keyboard fine-tune (arrow keys ±1 Hz / ±10 Hz)

### SEO
- [ ] Full JSON-LD schema (SoftwareApplication + BreadcrumbList + FAQPage)
- [ ] 12-question FAQ section in HTML
- [ ] Common Tinnitus Frequencies table with research-backed data
- [ ] Educational H2 sections (6 sections, ~1200 words minimum)
- [ ] Canonical URL set
- [ ] Add page to nav/footer free tools list
- [ ] Add inbound links from /hearing-test/ and /frequency-generator/

### Medical/Legal
- [ ] Disclaimer: "This tool is for informational purposes only and is not a substitute for professional medical advice. Consult an audiologist for tinnitus diagnosis."
- [ ] Volume warning (same as frequency generator disclaimer)

---

## 11. Medical Disclaimer Text (Required)

```
This tinnitus frequency matcher is a free informational tool and does not 
constitute medical advice, diagnosis, or treatment. Tinnitus can have many 
causes. If you experience persistent ringing in your ears, consult an 
audiologist or ENT physician. Do not use this tool as a substitute for 
professional evaluation. Listening at unsafe volumes can worsen hearing loss.
```

---

## 12. Page Word Count Target

AudioNotch's tune page has substantial educational content (8+ H2 sections). To compete for the same keywords we need:

- Tool + instructions: ~200 words
- Educational sections (6 × ~150 words): ~900 words
- FAQ (12 × ~80 words): ~960 words
- **Total: ~2,000 words minimum**

This exceeds AudioNotch's content depth and gives us a real shot at ranking above them for informational queries without any backlinks, purely on content quality + tool superiority.
