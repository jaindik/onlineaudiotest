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

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: `${device.name} Bluetooth & Codec Guide`,
        description: `Codec support and platform compatibility notes for ${device.name}. Actual audio delay varies by device, software, and test method.`,
        url,
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
          description: `Bluetooth codec support reference for ${device.name}. Device-specific end-to-end latency has not been measured consistently here.`,
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Bluetooth Version', value: device.bluetoothVersion },
            { '@type': 'PropertyValue', name: 'Codec Support', value: device.codecSupport.join(', ').toUpperCase() },
            { '@type': 'PropertyValue', name: 'Latency', value: 'Varies by connected device, codec, software, and test method; no model-specific measurement published here' },
            { '@type': 'PropertyValue', name: 'ANC', value: device.anc ? 'Yes' : 'No' },
            ...(device.chipset ? [{ '@type': 'PropertyValue', name: 'Chipset', value: device.chipset }] : []),
          ],
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Devices', url: `${SITE}/devices/` },
        { name: device.name, url },
      ]),
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
