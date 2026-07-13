import type { Device } from '../data/devices';
import { CODECS } from '../data/codecs';

const SITE = 'https://onlineaudiotest.com';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFAQSchema(faqs: { q: string; a: string }[]): object {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function buildWebApplicationSchema(opts: {
  name: string;
  url: string;
  description: string;
  features?: string[];
}): object {
  return {
    '@type': 'WebApplication',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires Web Audio API support',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(opts.features ? { featureList: opts.features } : {}),
    provider: {
      '@type': 'Organization',
      name: 'OnlineAudioTest.com',
      url: `${SITE}/`,
    },
  };
}

export function buildDevicePageSchema(device: Device): object {
  const url = `${SITE}/devices/${device.slug}/`;

  const codecRows = device.codecLatency
    .map((cl) => {
      const codec = CODECS[cl.codecId];
      if (!codec) return null;
      return `${codec.name}: ${cl.latencyRange[0]}–${cl.latencyRange[1]} ms`;
    })
    .filter(Boolean)
    .join('; ');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: device.metaTitle,
        description: device.metaDescription,
        url,
        dateModified: new Date().toISOString().split('T')[0],
        author: {
          '@type': 'Organization',
          name: 'OnlineAudioTest.com',
          url: `${SITE}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'OnlineAudioTest.com',
          url: `${SITE}/`,
        },
        about: {
          '@type': 'Product',
          name: device.name,
          brand: { '@type': 'Brand', name: device.manufacturer },
          description: device.intro,
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Bluetooth Version', value: device.bluetoothVersion },
            { '@type': 'PropertyValue', name: 'Codec Support', value: device.codecSupport.join(', ').toUpperCase() },
            { '@type': 'PropertyValue', name: 'Typical Latency', value: `${device.typicalLatencyMs[0]}–${device.typicalLatencyMs[1]} ms` },
            { '@type': 'PropertyValue', name: 'ANC', value: device.anc ? 'Yes' : 'No' },
            ...(device.chipset ? [{ '@type': 'PropertyValue', name: 'Chipset', value: device.chipset }] : []),
            ...(codecRows ? [{ '@type': 'PropertyValue', name: 'Per-Codec Latency', value: codecRows }] : []),
          ],
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Devices', url: `${SITE}/devices/` },
        { name: device.name, url },
      ]),
      buildFAQSchema(device.faqs),
    ],
  };
}

export function generateDeviceKeywords(device: Device): string {
  const codecNames = device.codecSupport
    .map((id) => CODECS[id]?.name ?? id.toUpperCase())
    .join(', ');

  const base = [
    `${device.name} latency`,
    `${device.name} bluetooth delay`,
    `${device.name} audio latency ms`,
    `${device.name} ${codecNames.split(', ')[0]} latency`,
    `${device.manufacturer} ${device.category} bluetooth latency`,
    ...device.keywords,
  ];

  return [...new Set(base)].join(', ');
}
