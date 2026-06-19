# Headphone Test Page — Content Plan v2 (Ship-Ready)
**Target URL:** https://onlineaudiotest.com/headphone-test/
**Primary keyword:** headphone test online
**Status:** SHIP THIS

---

## CRITICAL: Replace the redirect first

`/headphone-test/` currently redirects to `/speaker-test/` with `noindex`. Kill it. Replace with a real page.

---

## TITLE TAG
```
Headphone Test Online — Free Left Right & Balance Check
```
*(55 chars)*

## META DESCRIPTION
```
Test your headphones, earbuds, or AirPods online. Check left/right channels, driver balance, bass, treble, and distortion free in your browser.
```
*(144 chars)*

---

## FULL PAGE CONTENT

---

# Headphone Test Online

Test your headphones, earbuds, gaming headset, or AirPods directly in your browser. Check left and right channels, driver balance, bass, treble, and distortion — in under three minutes, no download required.

---

*[TOOL RENDERS HERE]*

---

## Quick Results Guide

Read your result immediately after each test:

| What you hear | Result |
|---|---|
| Sound only in left ear during Left test | ✅ Pass |
| Sound only in right ear during Right test | ✅ Pass |
| Both ears play during a single-channel test | ❌ Fail — channels mixing |
| One side noticeably quieter | ⚠️ Possible balance issue |
| Sound comes from the wrong ear | ❌ Channels reversed |
| Buzzing or rattling at any volume | ❌ Driver or debris issue |
| Crackling only at high volume | ⚠️ Volume too high — lower it |
| One ear completely silent | ❌ Cable, connection, or driver failure |

---

## What Each Test Checks

| Test | What it checks |
|---|---|
| Left / Right test | Channel correctness — each ear gets its own signal |
| Driver match (1 kHz) | Volume balance between left and right drivers |
| Bass test | Low-frequency response and driver seal |
| Treble test | High-frequency extension and driver clarity |
| Frequency sweep | Full-range performance across all drivers |
| Distortion check | Physical driver damage or debris |

---

## How to Test Your Headphones

**Before you start:**
- Wear your headphones correctly. Over-ear pads should fully encircle your ear. IEMs need a proper seal to produce accurate bass.
- Disable any virtual surround (Spatial Sound on Windows, Dolby Atmos, Razer 7.1). These deliberately mix channels and will cause the left/right test to appear to fail.
- Set volume to 40–60%. Testing at high volume risks hearing damage and can trigger distortion that is not actually a hardware problem.

**The test sequence:**
1. **Left / Right test** — confirm each ear receives only its channel
2. **Driver match** — confirm both ears are equally loud
3. **Frequency sweep** — listen for anything that drops out or distorts
4. **Distortion check** — listen for buzzing, crackling, or rattling

---

## Left Right Headphone Test

Click **"Left only"** — sound in your left ear only, right ear silent. Click **"Right only"** — sound in your right ear only, left ear silent.

**If channels are reversed (left audio in right ear):**

| Device type | Fix |
|---|---|
| Wired headphones | Replace the cable — internal wiring is crossed |
| Bluetooth headphones | Disconnect, re-pair; check OS for channel swap setting |
| AirPods | Settings → Accessibility → Audio/Visual → Balance → centre; re-insert both buds |
| USB gaming headset | Check companion software (G Hub, Razer Synapse, SteelSeries GG) for channel remap |
| 3.5mm gaming headset | Confirm plugged into headphone port, not mic port |

**If one ear produces no sound:**
- Wired: wiggle the cable at the jack. Sound that flickers means the break is near the connector.
- True wireless: reseat in charging case for 10 seconds, then re-pair.
- Any device: check that Mono Audio is not enabled. Windows: Settings → Accessibility → Audio → Mono Audio → Off. Mac: System Settings → Accessibility → Audio → Mono Audio → uncheck.

---

## Headphone Balance Test

Balance problems in headphones feel different from speaker balance problems — because the driver sits against your ear, even a 1 dB difference between sides is immediately audible.

**How to check balance:**
Play the 1 kHz driver match signal. Close your eyes. The tone should appear as a single point centred in your head. If it pulls left or right, one driver is louder.

**Software fix first:**
- Windows: Settings → System → Sound → device Properties → Balance → centre
- Mac: System Settings → Sound → Output → Balance → centre

**If balance is centred in the OS but still sounds uneven:**
The most common physical cause is earwax blockage — clean the mesh on the quieter earbud with a dry soft brush before assuming driver damage. IEM users: check that both tips are the same size and seated at the same depth.

---

## Bass Test

**For IEMs:** Bass in an IEM depends entirely on ear tip seal. If the tip does not seal the canal, bass collapses by 15–20 dB. Before diagnosing a broken driver: push the IEM slightly deeper and reseat. If bass returns, it was a seal problem. Try a larger ear tip if bass is consistently weak.

**For over-ear headphones:** The ear pad must fully encircle your ear. A gap caused by glasses frames or compressed foam dramatically reduces bass. If bass sounds thin, check that the pad is making full contact.

**For Bluetooth headphones:** If bass sounds weak via Bluetooth but correct when used wired, the Bluetooth codec is compressing it. SBC has the lowest quality — if your headphones support AAC, aptX, or LDAC, ensure you are connected with that codec.

**Pass:** Bass frequencies feel full and equal in both ears.
**Fail:** Bass absent on one side, or weak on both despite correct fit — driver or seal problem.

---

## Treble Test

**Wearing position first:** High-frequency sound is sensitive to driver angle and distance. If treble sounds thin or harsh, adjust the fit before assuming a driver problem.

**How to test:**
Play the frequency sweep from 4 kHz upward. Treble should remain clear up to at least 12–14 kHz for most adults (16+ kHz for younger listeners). If one ear cuts off noticeably earlier than the other, that driver is degraded.

**What to listen for:**
- Treble present but harsh/metallic → not damage, likely the headphone's natural tuning or volume too high
- Treble cuts off on one side → driver degradation on that ear
- Hissing or crackling that intensifies with frequency → physical damage to the driver

---

## Distortion Test

Play a sine tone at moderate volume (40–60%). A healthy driver produces a clean, single tone. Any of the following mean a problem:

| Sound | Likely cause |
|---|---|
| Buzzing at all volumes | Debris inside the driver cavity (common in IEMs — clean first) |
| Rattling that changes with frequency | Loose internal component |
| Crackling at low and high volume | Driver damage — replace |
| Crackling only at high volume | Volume too high — lower it, not a hardware problem |
| Distortion only on one side | That driver is damaged |

---

## Gaming Headset Test

Virtual surround software (Dolby Atmos for Headphones, Windows Sonic, DTS Headphone:X, Razer 7.1) deliberately mixes channels to simulate surround sound. When active, the left/right test will appear to fail even on a working headset — sound bleeds between ears by design.

**Disable virtual surround before testing:**
- Windows: right-click speaker icon → Spatial sound → Off
- Razer Synapse: Headset → 7.1 Surround → Off
- Logitech G Hub: Headset → DTS → Off
- SteelSeries GG: Headset → Surround → Off

Then run the channel test. If channels are correct with surround off, the hardware is fine — the HRTF mapping was causing the apparent failure.

**USB vs 3.5mm headsets:**
USB gaming headsets have their own DAC/amp. If the headset sounds wrong, check the companion app's mixer levels first. 3.5mm headsets with a four-conductor (TRRS) cable need a splitter adapter if your PC only has separate headphone and mic ports, or the mic and audio channels may route incorrectly.

---

## Bluetooth Headphone Test

**Codec affects quality:**
The audio quality you hear depends on which Bluetooth codec is active. From highest to lowest quality: LDAC > aptX Adaptive > aptX HD > aptX > AAC > SBC. If your headphones sound compressed or narrow via Bluetooth, a lower-quality codec is active.

On Android: Settings → Developer Options → Bluetooth Audio Codec shows which codec is in use. On iOS: AAC is the maximum for most headphones. On Windows: check the companion app.

**If channels are reversed via Bluetooth:**
Update the headphone firmware through the companion app. If no update fixes it, factory reset the headphones and re-pair.

**Connection dropout causing one-sided audio:**
Interference from 2.4GHz Wi-Fi, low battery (in true wireless), or distance from the source device are the most common causes. Move closer to the source and test again.

For measuring actual Bluetooth audio delay, use the [Bluetooth Latency Test](/bluetooth-latency-test/).

---

## AirPods & Wireless Earbuds Test

**AirPods L/R assignment:**
AirPods use proximity sensors to detect which ear they are in. If inserted correctly but channels are still reversed, go to Settings → Accessibility → Audio/Visual → Balance and confirm the slider is centred.

**One AirPod quieter:**
Clean the mesh first — earwax blockage is the cause in the majority of cases. Use a dry soft-bristle brush. If cleaning does not help, reset: press and hold the case button until the amber light flashes.

**Automatic Ear Detection misfiring:**
If one AirPod keeps pausing or goes silent intermittently: Settings → Bluetooth → your AirPods → Automatic Ear Detection → toggle off and back on.

**ANC and Transparency mode:**
Test headphones in Normal mode (no ANC, no Transparency) for accurate driver quality results. ANC applies DSP that changes frequency response — a distortion that appears only in ANC mode is the ANC processing, not the driver.

**True wireless non-AirPods (Galaxy Buds, Sony WF, Jabra):**
One bud connects as primary, the other as secondary. If the secondary drops out, reseat both buds in the case for 10 seconds, then reopen. Factory reset if the problem persists.

---

## Common Headphone Problems

### One Earbud Not Working

First confirm the problem is the earbud, not the source: plug a different pair into the same device. If the new pair works on both sides, the problem is the original earbud.

| Cause | Fix |
|---|---|
| Cable open circuit | Wiggle at the jack — if sound flickers, replace the cable |
| True wireless out of charge | Reseat in case for 10 seconds |
| True wireless sync failure | Forget device, factory reset, re-pair |
| AirPods ear detection | Settings → Bluetooth → AirPods → Automatic Ear Detection → toggle |
| Driver failure | If all above fail, the driver is physically dead |

### Left Earbud Quieter Than Right

| Cause | Fix |
|---|---|
| Earwax on mesh | Clean with dry soft brush — most common cause |
| IEM tip wrong size or depth | Reseat with correct tip for proper seal |
| OS balance shifted | Windows/Mac balance slider — centre it |
| Driver degradation | EQ compensation (temporary) or replace headphones |

### Audio Only Playing In One Ear

For wired: the 3.5mm jack is not fully inserted. A partially inserted jack commonly produces mono from one ear only — push it in firmly.

For any device: check Mono Audio. Windows: Settings → Accessibility → Audio → Mono Audio → Off. Mac: System Settings → Accessibility → Audio → Mono Audio → uncheck. Mono Audio collapses both channels to one ear even when headphones are the selected output.

### Headphone Channels Reversed

| Device type | Cause | Fix |
|---|---|---|
| Wired headphones | Cable internally crossed | Replace cable |
| USB headset | Software channel remap | Check companion app, restore defaults |
| Bluetooth | Firmware channel assignment | Update firmware, factory reset |
| Any device + Windows | Spatial Audio remap | Right-click speaker icon → Spatial sound → Off |

### Bluetooth Audio Delay

Bluetooth headphones introduce latency that varies by codec: SBC is highest (~150–200ms), aptX LL reaches ~40ms, AirPods-to-Apple-device path can reach ~9ms. This tool does not measure latency — use the [Audio Latency Test](/latency-test/) or [Bluetooth Latency Test](/bluetooth-latency-test/).

---

## How to Tell If Your Headphones Are Damaged

Run the frequency sweep and the distortion check, then compare:

| Symptom | What it means |
|---|---|
| One ear completely silent | Driver dead or cable open circuit |
| Buzzing at all frequencies on one side | Debris in driver cavity — clean first |
| Crackling at any volume level | Driver damage |
| Treble cuts off on one side | Driver degradation on that ear |
| Bass absent despite correct fit and seal | Driver or port problem |
| Distortion only on one side | That driver is damaged |
| Both ears sound identical but thin | Not damage — that is the headphone's tuning |

**The swap test:** Put the right cup on your left ear. If the problem moves with the cup, the driver is the issue. If the same ear has the problem regardless of which cup is on it, it is your ear, not the headphone.

---

## Frequently Asked Questions

**How do I test my headphones online?**
Click "Left only" to confirm sound in your left ear, "Right only" for your right ear. Run the frequency sweep to check full-range driver response. Under three minutes total.

**Why is one earbud quieter than the other?**
Clean the mesh with a dry brush first — earwax blockage is the most common cause. If cleaning does not help, check the OS balance setting. If balance is centred and one driver is still quieter, the driver has degraded.

**How do I fix reversed headphone channels?**
Wired: replace the cable. Bluetooth: update firmware, then factory reset. USB headset: check companion app for a channel remap setting. Windows: disable Spatial Sound by right-clicking the speaker icon.

**Can I test AirPods with this tool?**
Yes. Open this page in Safari with AirPods connected. Run the left/right test. If channels are reversed, re-insert the buds and check Settings → Accessibility → Audio/Visual → Balance.

**What is driver mismatch?**
One driver produces more volume than the other at the same input. Even a 1 dB difference is audible in headphones as the stereo image pulling to one side.

**How do I test a gaming headset?**
Disable virtual surround first: in Windows, right-click the speaker icon → Spatial sound → Off. Disable surround in the companion app. Then run the channel test. If channels are correct with surround off, the hardware is fine.

**Why does one earbud only work when I push the jack in further?**
The 3.5mm socket's spring contacts are worn. Push the jack firmly in — if that fixes it temporarily, the cable or socket needs replacement.

**Does this test work with Bluetooth headphones?**
Yes. Bluetooth latency causes the tone to play slightly late, but channel and frequency accuracy is unaffected. For latency testing, use the [Bluetooth Latency Test](/bluetooth-latency-test/).

**What does the frequency sweep test?**
It plays tones from 20Hz to 20kHz. Any frequency range that sounds absent, distorted, or unequal between ears identifies a driver problem.

**How do I fix audio only playing in one ear on Windows?**
Three checks: (1) Settings → Accessibility → Audio → Mono Audio is OFF. (2) Settings → System → Sound → device Properties → Balance is centred. (3) Correct output device is selected.

**Why do my headphones sound fine with music but show a problem in the test?**
Music masks small imbalances. Test tones expose them because there is nothing to mask them. A problem the test reveals is real — it is just harder to notice during normal listening.

**Do open-back headphones test differently?**
The channel test is identical. The frequency sweep will show bass rolloff below 80–100Hz in open-back models — that is by design, not damage.

**How can I tell if my headphones are dying?**
Distortion at moderate volume on one driver, treble rolling off on one side, or bass disappearing despite correct fit. If the problem is on one driver only and started recently, that driver is failing.

**My Bluetooth headphones sound worse than wired. Is that normal?**
Yes, if SBC codec is active. SBC compresses aggressively. If your headphones support AAC, aptX, or LDAC and your source device supports the same, switching codec improves quality significantly.

**What is the one-ear swap test?**
Put the right cup on your left ear. If the problem moves with the cup, the driver is the issue. If the same ear has the problem regardless of which cup, it is your ear canal, not the headphone.

---

## Conclusion

Run the left/right test every time you connect a new pair. Run the frequency sweep when one ear sounds different from the other. The whole test takes under three minutes.

For testing desktop speakers or soundbar channels, see the [Left Right Speaker Test](/speaker-test/). For measuring audio delay, use the [Audio Latency Test](/latency-test/).

---

## SCHEMA

### FAQPage (15 questions)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I test my headphones online?", "acceptedAnswer": { "@type": "Answer", "text": "Click 'Left only' to confirm sound in your left ear, then 'Right only' for your right ear. Run the frequency sweep to check full-range driver response. The entire test takes under three minutes." } },
    { "@type": "Question", "name": "Why is one earbud quieter than the other?", "acceptedAnswer": { "@type": "Answer", "text": "Clean the mesh with a dry brush first — earwax blockage is the most common cause. If cleaning does not help, check the OS balance setting. If balance is centred and one driver is still quieter, the driver has degraded." } },
    { "@type": "Question", "name": "How do I fix reversed headphone channels?", "acceptedAnswer": { "@type": "Answer", "text": "Wired: replace the cable. Bluetooth: update firmware, then factory reset. USB headset: check companion app for a channel remap setting. Windows: disable Spatial Sound by right-clicking the speaker icon." } },
    { "@type": "Question", "name": "Can I test AirPods with this tool?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Open this page in Safari with AirPods connected. Run the left/right test. If channels are reversed, re-insert the buds and check Settings → Accessibility → Audio/Visual → Balance." } },
    { "@type": "Question", "name": "What is driver mismatch in headphones?", "acceptedAnswer": { "@type": "Answer", "text": "Driver mismatch means one driver produces more volume than the other at the same input. Even a 1 dB difference is audible in headphones as the stereo image pulling to one side." } },
    { "@type": "Question", "name": "How do I test a gaming headset?", "acceptedAnswer": { "@type": "Answer", "text": "Disable virtual surround first: in Windows, right-click the speaker icon and set Spatial sound to Off, then disable surround in the companion app. Run the channel test — if channels are correct with surround off, the hardware is fine." } },
    { "@type": "Question", "name": "Why does one earbud only work when I push the jack in further?", "acceptedAnswer": { "@type": "Answer", "text": "The 3.5mm socket's spring contacts are worn. If pushing the jack in fully fixes it temporarily, the cable or socket needs replacement." } },
    { "@type": "Question", "name": "Does this headphone test work with Bluetooth headphones?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Bluetooth latency causes the tone to play slightly late, but channel and frequency accuracy are unaffected. For latency testing, use the Bluetooth Latency Test." } },
    { "@type": "Question", "name": "What does the frequency sweep test?", "acceptedAnswer": { "@type": "Answer", "text": "It plays tones from 20Hz to 20kHz. Any frequency range that sounds absent, distorted, or unequal between ears identifies a driver problem." } },
    { "@type": "Question", "name": "How do I fix audio only playing in one ear on Windows?", "acceptedAnswer": { "@type": "Answer", "text": "Three checks: (1) Settings → Accessibility → Audio → Mono Audio is OFF. (2) Settings → System → Sound → device Properties → Balance is centred. (3) The correct output device is selected." } },
    { "@type": "Question", "name": "Why do my headphones sound fine with music but show a problem in the test?", "acceptedAnswer": { "@type": "Answer", "text": "Music masks small imbalances. Test tones expose them because there is nothing to mask them. A problem the test reveals is real — it is just harder to notice during normal listening." } },
    { "@type": "Question", "name": "Do open-back headphones test differently than closed-back?", "acceptedAnswer": { "@type": "Answer", "text": "The channel test is identical. The frequency sweep will show bass rolloff below 80–100Hz in open-back models — that is by design, not damage." } },
    { "@type": "Question", "name": "How can I tell if my headphones are dying?", "acceptedAnswer": { "@type": "Answer", "text": "Signs include distortion at moderate volume on one driver, treble rolling off on one side, or bass disappearing despite correct fit. If the problem is on one driver only and started recently, that driver is failing." } },
    { "@type": "Question", "name": "My Bluetooth headphones sound worse than wired. Is that normal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, if SBC codec is active. SBC compresses aggressively. If your headphones support AAC, aptX, or LDAC and your source supports the same codec, switching to it improves quality significantly." } },
    { "@type": "Question", "name": "What is the one-ear swap test?", "acceptedAnswer": { "@type": "Answer", "text": "Put the right cup on your left ear. If the problem moves with the cup, the driver is the issue. If the same ear has the problem regardless of which cup is on it, it is your ear canal, not the headphone." } }
  ]
}
```

### WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Headphone Test Online",
  "url": "https://onlineaudiotest.com/headphone-test/",
  "description": "Free online headphone test. Check left and right channels, driver balance, bass, treble, and distortion for headphones, earbuds, gaming headsets, and AirPods.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires Web Audio API (Chrome, Firefox, Safari, Edge)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["Left right headphone channel test", "Frequency sweep 20Hz to 20kHz", "Driver matching test", "Bass test", "Treble test", "Distortion detection", "No download required"],
  "provider": { "@type": "Organization", "name": "OnlineAudioTest.com", "url": "https://onlineaudiotest.com/" }
}
```

---

## INTERNAL LINKS

| Direction | Source | Anchor | Destination |
|---|---|---|---|
| In | `/speaker-test/` | Headphone Test | `/headphone-test/` |
| In | `/` homepage | headphone test | `/headphone-test/` |
| In | `/mic-test/` | Headphone Test | `/headphone-test/` |
| Out | Conclusion | Left Right Speaker Test | `/speaker-test/` |
| Out | Bluetooth section | Bluetooth Latency Test | `/bluetooth-latency-test/` |
| Out | Delay FAQ | Bluetooth Latency Test | `/bluetooth-latency-test/` |
| Out | Conclusion | Audio Latency Test | `/latency-test/` |

---

## IMPLEMENTATION CHECKLIST

- [ ] Replace redirect in `headphone-test.astro` with full Astro page
- [ ] Remove `noindex`, remove canonical pointing to `/speaker-test/`
- [ ] Build headphone tool (L/R isolation + frequency sweep + distortion check)
- [ ] Set title and meta description
- [ ] Add Quick Results Guide table directly below the tool
- [ ] Add "What Each Test Checks" comparison table
- [ ] Add all content sections in order
- [ ] Add FAQPage + WebApplication JSON-LD schemas
- [ ] Add internal links OUT (speaker-test, latency-test, bluetooth-latency-test)
- [ ] Update `/speaker-test/` to add link IN to this page
- [ ] Submit to GSC → URL Inspection → Request Indexing after deploy
