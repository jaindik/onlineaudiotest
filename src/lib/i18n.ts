/**
 * Supported localization targets.
 *
 * Keep locale metadata in one place so route generation, document language,
 * RTL handling and hreflang output cannot drift between pages.
 */
export interface LocaleDefinition {
  code: string;
  language: string;
  region: string;
  label: string;
  direction: 'ltr' | 'rtl';
  ogLocale: string;
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES: Record<string, LocaleDefinition> = {
  en: { code: 'en', language: 'en', region: '', label: 'English', direction: 'ltr', ogLocale: 'en_US' },
  'pt-BR': { code: 'pt-BR', language: 'pt', region: 'BR', label: 'Português (Brasil)', direction: 'ltr', ogLocale: 'pt_BR' },
  'id-ID': { code: 'id-ID', language: 'id', region: 'ID', label: 'Bahasa Indonesia', direction: 'ltr', ogLocale: 'id_ID' },
  'hi-IN': { code: 'hi-IN', language: 'hi', region: 'IN', label: 'हिन्दी', direction: 'ltr', ogLocale: 'hi_IN' },
  'vi-VN': { code: 'vi-VN', language: 'vi', region: 'VN', label: 'Tiếng Việt', direction: 'ltr', ogLocale: 'vi_VN' },
  'es-MX': { code: 'es-MX', language: 'es', region: 'MX', label: 'Español (México)', direction: 'ltr', ogLocale: 'es_MX' },
  'ur-PK': { code: 'ur-PK', language: 'ur', region: 'PK', label: 'اردو', direction: 'rtl', ogLocale: 'ur_PK' },
  'de-DE': { code: 'de-DE', language: 'de', region: 'DE', label: 'Deutsch', direction: 'ltr', ogLocale: 'de_DE' },
  'tr-TR': { code: 'tr-TR', language: 'tr', region: 'TR', label: 'Türkçe', direction: 'ltr', ogLocale: 'tr_TR' },
  'bn-BD': { code: 'bn-BD', language: 'bn', region: 'BD', label: 'বাংলা', direction: 'ltr', ogLocale: 'bn_BD' },
  'th-TH': { code: 'th-TH', language: 'th', region: 'TH', label: 'ไทย', direction: 'ltr', ogLocale: 'th_TH' },
  'fr-FR': { code: 'fr-FR', language: 'fr', region: 'FR', label: 'Français', direction: 'ltr', ogLocale: 'fr_FR' },
};

export function getLocale(code = DEFAULT_LOCALE): LocaleDefinition {
  return LOCALES[code] ?? LOCALES[DEFAULT_LOCALE];
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/** Build a complete alternate set for a page once every version exists. */
export function buildAlternateLinks(alternates: AlternateLink[]): AlternateLink[] {
  const seen = new Set<string>();
  return alternates.filter((alternate) => {
    if (seen.has(alternate.hreflang)) return false;
    seen.add(alternate.hreflang);
    return alternate.href.startsWith('https://onlineaudiotest.com/');
  });
}

export const AUDIO_HUB_PATHS: Record<string, string> = {
  en: '/audio-test/',
  'pt-BR': '/pt-br/teste-de-audio/',
  'id-ID': '/id-id/audio-test/',
  'hi-IN': '/hi-in/audio-test/',
  'vi-VN': '/vi-vn/audio-test/',
  'es-MX': '/es-mx/audio-test/',
  'ur-PK': '/ur-pk/audio-test/',
  'de-DE': '/de-de/audio-test/',
  'tr-TR': '/tr-tr/audio-test/',
  'bn-BD': '/bn-bd/audio-test/',
  'th-TH': '/th-th/audio-test/',
  'fr-FR': '/fr-fr/audio-test/',
};

export const PT_BR_TOOL_PATHS: Record<string, string> = {
  '/audio-test/': '/pt-br/teste-de-audio/',
  '/speaker-test/': '/pt-br/teste-de-alto-falante/',
  '/mic-test/': '/pt-br/teste-de-microfone/',
  '/headphone-test/': '/pt-br/teste-de-fone-de-ouvido/',
  '/latency-test/': '/pt-br/teste-de-latencia/',
  '/bluetooth-latency-test/': '/pt-br/teste-de-latencia-bluetooth/',
  '/audio-device-check/': '/pt-br/verificacao-de-dispositivo-de-audio/',
  '/bluetooth-codec-guide/': '/pt-br/guia-de-codecs-bluetooth/',
  '/airpods-latency-test/': '/pt-br/teste-de-latencia-airpods/',
  '/about/': '/pt-br/sobre/',
  '/contact/': '/pt-br/contato/',
  '/privacy/': '/pt-br/privacidade/',
  '/terms/': '/pt-br/termos/',
  '/hearing-test/': '/pt-br/teste-de-audicao/',
  '/frequency-generator/': '/pt-br/gerador-de-frequencia/',
  '/audio-spectrum-analyzer/': '/pt-br/analisador-de-espectro-de-audio/',
  '/voice-recorder/': '/pt-br/gravador-de-voz/',
  '/mic-quality-test/': '/pt-br/teste-de-qualidade-do-microfone/',
  '/audio-reaction-test/': '/pt-br/teste-de-reacao-audio/',
  '/decibel-meter/': '/pt-br/medidor-de-decibeis/',
  '/loudness-meter/': '/pt-br/medidor-de-volume/',
  '/echo-test/': '/pt-br/teste-de-eco/',
  '/bpm-detector/': '/pt-br/detector-de-bpm/',
  '/key-detector/': '/pt-br/detector-de-tom-musical/',
  '/key-and-bpm-detector/': '/pt-br/detector-de-tom-e-bpm/',
};

export function localizedToolPath(path: string, locale = DEFAULT_LOCALE): string {
  if (locale === 'en') return path;
  if (locale === 'pt-BR') {
    if (path === '/') return '/pt-br/';
    if (PT_BR_TOOL_PATHS[path]) return PT_BR_TOOL_PATHS[path];
    if (path === '/devices/') return '/pt-br/dispositivos/';
    if (path.startsWith('/devices/')) return `/pt-br/dispositivos/${path.slice('/devices/'.length)}`;
    return path;
  }
  return `/${locale.toLowerCase()}${path}`;
}

export function buildAudioHubAlternates(): AlternateLink[] {
  return buildAlternateLinks([
    ...Object.entries(AUDIO_HUB_PATHS).map(([hreflang, path]) => ({
      hreflang,
      href: `https://onlineaudiotest.com${path}`,
    })),
    { hreflang: 'x-default', href: 'https://onlineaudiotest.com/audio-test/' },
  ]);
}

export function buildHomeAlternates(): AlternateLink[] {
  return buildAlternateLinks([
    { hreflang: 'en', href: 'https://onlineaudiotest.com/' },
    { hreflang: 'pt-BR', href: 'https://onlineaudiotest.com/pt-br/' },
    { hreflang: 'x-default', href: 'https://onlineaudiotest.com/' },
  ]);
}

export function buildToolAlternates(englishPath: string, portuguesePath: string): AlternateLink[] {
  return buildAlternateLinks([
    { hreflang: 'en', href: `https://onlineaudiotest.com${englishPath}` },
    { hreflang: 'pt-BR', href: `https://onlineaudiotest.com${portuguesePath}` },
    { hreflang: 'x-default', href: `https://onlineaudiotest.com${englishPath}` },
  ]);
}

export function buildDeviceAlternates(slug: string): AlternateLink[] {
  return buildToolAlternates(`/devices/${slug}/`, `/pt-br/dispositivos/${slug}/`);
}

const INDEXABLE_ENGLISH_PATHS = new Set([
  '/', '/audio-test/', '/audio-device-check/', '/mic-test/', '/speaker-test/', '/headphone-test/',
  '/latency-test/', '/bluetooth-latency-test/', '/hearing-test/', '/frequency-generator/',
  '/audio-spectrum-analyzer/', '/voice-recorder/', '/mic-quality-test/', '/audio-reaction-test/',
  '/decibel-meter/', '/loudness-meter/', '/echo-test/', '/bpm-detector/', '/key-detector/',
  '/key-and-bpm-detector/', '/bluetooth-codec-guide/', '/airpods-latency-test/', '/devices/',
  '/about/', '/contact/', '/privacy/', '/terms/',
]);

/** Generate alternates only for the English and established PT-BR page families. */
export function buildSiteAlternates(currentPath: string): AlternateLink[] {
  const normalized = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
  let englishPath = normalized;
  const ptEntry = Object.entries(PT_BR_TOOL_PATHS).find(([, path]) => path === normalized);
  if (ptEntry) englishPath = ptEntry[0];
  else if (normalized === '/pt-br/') englishPath = '/';
  else if (normalized.startsWith('/pt-br/dispositivos/')) englishPath = `/devices/${normalized.slice('/pt-br/dispositivos/'.length)}`;
  else {
    const localePrefix = Object.keys(LOCALES).filter((code) => code !== 'en' && code !== 'pt-BR').map((code) => `/${code.toLowerCase()}/`).find((prefix) => normalized.startsWith(prefix));
    if (localePrefix) englishPath = `/${normalized.slice(localePrefix.length)}`;
  }
  const isDeviceDetail = englishPath.startsWith('/devices/') && englishPath !== '/devices/';
  if (!isDeviceDetail && !INDEXABLE_ENGLISH_PATHS.has(englishPath)) return [];
  return buildAlternateLinks([
    { hreflang: 'en', href: `https://onlineaudiotest.com${englishPath}` },
    { hreflang: 'pt-BR', href: `https://onlineaudiotest.com${localizedToolPath(englishPath, 'pt-BR')}` },
    { hreflang: 'x-default', href: `https://onlineaudiotest.com${englishPath}` },
  ]);
}
