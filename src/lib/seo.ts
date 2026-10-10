import type { Device } from '../data/devices';

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
        headline: `${device.name} Codec Support & Compatibility Guide`,
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
          '@type': 'Thing',
          name: device.name,
          brand: { '@type': 'Brand', name: device.manufacturer },
          description: `Codec compatibility reference for ${device.name}. Check the current manufacturer specification and the connected source device before relying on codec availability.`,
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
  const base = [
    `${device.name} Bluetooth reference`,
    `${device.manufacturer} ${device.category} audio setup`,
  ];

  return [...new Set(base)].join(', ');
}
