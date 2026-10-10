import { AUDIO_HUB_PATHS, LOCALES, PT_BR_TOOL_PATHS } from '../lib/i18n';

export type LocalizedPageKind = 'landing' | 'tool' | 'guide' | 'device-index' | 'device-detail' | 'trust';

export interface LocalizedPageDefinition {
  id: string;
  englishPath: string;
  kind: LocalizedPageKind;
  priority: 'core' | 'supporting' | 'long-tail';
}

export type TranslationStatus = 'translated' | 'machine-assisted-draft' | 'missing';
export type ReviewStatus = 'approved' | 'pending-native-review' | 'blocked-legal-review';

export interface LocalePageStatus {
  translation: TranslationStatus;
  nativeReview: ReviewStatus;
  functionalQa: 'passed' | 'pending';
  serpResearch: 'complete' | 'pending-apify-access';
  sourceRevision: string;
}

/** The source-of-truth inventory for every indexable page family. */
export const INDEXABLE_PAGE_FAMILIES: LocalizedPageDefinition[] = [
  { id: 'home', englishPath: '/', kind: 'landing', priority: 'core' },
  { id: 'audio-test', englishPath: '/audio-test/', kind: 'landing', priority: 'core' },
  { id: 'audio-device-check', englishPath: '/audio-device-check/', kind: 'tool', priority: 'core' },
  { id: 'mic-test', englishPath: '/mic-test/', kind: 'tool', priority: 'core' },
  { id: 'speaker-test', englishPath: '/speaker-test/', kind: 'tool', priority: 'core' },
  { id: 'headphone-test', englishPath: '/headphone-test/', kind: 'tool', priority: 'core' },
  { id: 'latency-test', englishPath: '/latency-test/', kind: 'tool', priority: 'core' },
  { id: 'bluetooth-latency-test', englishPath: '/bluetooth-latency-test/', kind: 'tool', priority: 'core' },
  { id: 'hearing-test', englishPath: '/hearing-test/', kind: 'tool', priority: 'supporting' },
  { id: 'frequency-generator', englishPath: '/frequency-generator/', kind: 'tool', priority: 'supporting' },
  { id: 'audio-spectrum-analyzer', englishPath: '/audio-spectrum-analyzer/', kind: 'tool', priority: 'supporting' },
  { id: 'voice-recorder', englishPath: '/voice-recorder/', kind: 'tool', priority: 'supporting' },
  { id: 'mic-quality-test', englishPath: '/mic-quality-test/', kind: 'tool', priority: 'supporting' },
  { id: 'audio-reaction-test', englishPath: '/audio-reaction-test/', kind: 'tool', priority: 'supporting' },
  { id: 'decibel-meter', englishPath: '/decibel-meter/', kind: 'tool', priority: 'supporting' },
  { id: 'loudness-meter', englishPath: '/loudness-meter/', kind: 'tool', priority: 'supporting' },
  { id: 'echo-test', englishPath: '/echo-test/', kind: 'tool', priority: 'supporting' },
  { id: 'bpm-detector', englishPath: '/bpm-detector/', kind: 'tool', priority: 'supporting' },
  { id: 'key-detector', englishPath: '/key-detector/', kind: 'tool', priority: 'supporting' },
  { id: 'key-and-bpm-detector', englishPath: '/key-and-bpm-detector/', kind: 'tool', priority: 'supporting' },
  { id: 'bluetooth-codec-guide', englishPath: '/bluetooth-codec-guide/', kind: 'guide', priority: 'core' },
  { id: 'airpods-latency-test', englishPath: '/airpods-latency-test/', kind: 'guide', priority: 'core' },
  { id: 'devices', englishPath: '/devices/', kind: 'device-index', priority: 'core' },
  { id: 'device-detail', englishPath: '/devices/[slug]/', kind: 'device-detail', priority: 'long-tail' },
  { id: 'about', englishPath: '/about/', kind: 'trust', priority: 'supporting' },
  { id: 'contact', englishPath: '/contact/', kind: 'trust', priority: 'supporting' },
  { id: 'privacy', englishPath: '/privacy/', kind: 'trust', priority: 'supporting' },
  { id: 'terms', englishPath: '/terms/', kind: 'trust', priority: 'supporting' },
];

export const TARGET_LOCALES = Object.keys(LOCALES).filter((locale) => locale !== 'en');

const machineAssisted = (legal = false): LocalePageStatus => ({
  translation: 'machine-assisted-draft',
  nativeReview: legal ? 'blocked-legal-review' : 'pending-native-review',
  functionalQa: 'passed',
  serpResearch: 'pending-apify-access',
  sourceRevision: 'localization-wave-2026-09-07',
});

/** QA ledger. A page is not considered final until nativeReview is approved. */
export const LOCALE_PAGE_STATUS: Record<string, Record<string, LocalePageStatus>> = Object.fromEntries(
  TARGET_LOCALES.map((locale) => [locale, Object.fromEntries(INDEXABLE_PAGE_FAMILIES.map((page) => [
    page.id,
    machineAssisted(page.id === 'privacy' || page.id === 'terms'),
  ]))]),
);

export function getPublishedPath(locale: string, englishPath: string): string | null {
  if (locale === 'en') return englishPath;
  if (englishPath === '/audio-test/' && AUDIO_HUB_PATHS[locale]) return AUDIO_HUB_PATHS[locale];
  if (locale === 'pt-BR') {
    if (PT_BR_TOOL_PATHS[englishPath]) return PT_BR_TOOL_PATHS[englishPath];
    if (englishPath === '/devices/') return '/pt-br/dispositivos/';
    if (englishPath.startsWith('/devices/')) return `/pt-br/dispositivos/${englishPath.slice('/devices/'.length)}`;
    return englishPath === '/' ? '/pt-br/' : `/pt-br${englishPath}`;
  }
  return `/${locale.toLowerCase()}${englishPath}`;
}
