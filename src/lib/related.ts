import type { Device } from '../data/devices';
import { DEVICES } from '../data/devices';

export interface RelatedResource {
  title: string;
  href: string;
  desc: string;
}

/** Returns up to `limit` devices related to the given slug.
 *  Priority: (1) same category + different manufacturer, (2) relatedSlugs list. */
export function getRelatedDevices(currentSlug: string, limit = 3): Device[] {
  const current = DEVICES.find((d) => d.slug === currentSlug);
  if (!current) return [];

  const seen = new Set<string>([currentSlug]);
  const results: Device[] = [];

  // First pass: explicit related list from data
  for (const slug of current.relatedSlugs) {
    if (results.length >= limit) break;
    const device = DEVICES.find((d) => d.slug === slug);
    if (device && !seen.has(device.slug)) {
      results.push(device);
      seen.add(device.slug);
    }
  }

  // Second pass: same category, different manufacturer
  if (results.length < limit) {
    for (const device of DEVICES) {
      if (results.length >= limit) break;
      if (!seen.has(device.slug) && device.category === current.category && device.manufacturer !== current.manufacturer) {
        results.push(device);
        seen.add(device.slug);
      }
    }
  }

  // Third pass: any remaining device
  if (results.length < limit) {
    for (const device of DEVICES) {
      if (results.length >= limit) break;
      if (!seen.has(device.slug)) {
        results.push(device);
        seen.add(device.slug);
      }
    }
  }

  return results.slice(0, limit);
}

/** Returns all devices from the same manufacturer, excluding the current device. */
export function getSameManufacturerDevices(currentSlug: string): Device[] {
  const current = DEVICES.find((d) => d.slug === currentSlug);
  if (!current) return [];
  return DEVICES.filter((d) => d.manufacturer === current.manufacturer && d.slug !== currentSlug);
}

/** Returns site resource links relevant to a given device.
 *  Always includes the latency test. Conditionally adds codec guide, AirPods page, etc. */
export function getRelatedResources(device: Device): RelatedResource[] {
  const resources: RelatedResource[] = [
    {
      title: 'Live Audio Latency Test',
      href: '/latency-test/',
      desc: 'Measure your exact Bluetooth delay in milliseconds, in your browser.',
    },
    {
      title: 'Bluetooth Codec Guide',
      href: '/bluetooth-codec-guide/',
      desc: 'Understand SBC, AAC, aptX, LDAC, and aptX Adaptive in depth.',
    },
    {
      title: 'Bluetooth Latency Test',
      href: '/bluetooth-latency-test/',
      desc: 'General Bluetooth latency reference and comparison by codec.',
    },
  ];

  if (device.manufacturer === 'Apple') {
    resources.push({
      title: 'AirPods Latency Test',
      href: '/airpods-latency-test/',
      desc: 'Dedicated AirPods latency measurement and Apple ecosystem tips.',
    });
  }

  if (device.micSupport) {
    resources.push({
      title: 'Microphone Test',
      href: '/mic-test/',
      desc: 'Test your headset\'s microphone quality in your browser.',
    });
  }

  if (device.category === 'over-ear' || device.category === 'on-ear') {
    resources.push({
      title: 'Headphone Test',
      href: '/headphone-test/',
      desc: 'Test driver balance and frequency response on your headphones.',
    });
  } else {
    resources.push({
      title: 'Hearing Test',
      href: '/hearing-test/',
      desc: 'Check your frequency range hearing — 20 Hz to 20 kHz.',
    });
  }

  return resources;
}

/** Returns a latency rating label from a millisecond value. */
export function latencyRating(ms: number): { label: string; grade: 'excellent' | 'good' | 'fair' | 'poor' } {
  if (ms <= 60) return { label: 'Excellent', grade: 'excellent' };
  if (ms <= 120) return { label: 'Good', grade: 'good' };
  if (ms <= 200) return { label: 'Acceptable', grade: 'fair' };
  return { label: 'High', grade: 'poor' };
}

/** Human-readable category label. */
export function categoryLabel(category: Device['category']): string {
  const map: Record<Device['category'], string> = {
    'true-wireless': 'True Wireless Earbuds',
    'over-ear': 'Over-Ear Headphones',
    'on-ear': 'On-Ear Headphones',
    'gaming': 'Gaming Headset',
  };
  return map[category] ?? category;
}
