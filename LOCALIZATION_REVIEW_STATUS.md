# Localization review ledger

Last updated: 2026-10-15

This ledger is intentionally explicit: a deployed page is not considered final SEO content until the native, functional, legal/safety, and SERP gates are complete. Generated non-English locale routes that have not passed editorial review remain accessible to direct visitors but are `noindex`, excluded from the sitemap, and omitted from `hreflang` until approved.

## Indexing gate added October 15, 2026

The ten generated locale groups (`id-ID`, `hi-IN`, `vi-VN`, `es-MX`, `ur-PK`, `de-DE`, `tr-TR`, `bn-BD`, `th-TH`, and `fr-FR`) are draft translations. They remain available by direct URL, but return `noindex, follow`, are excluded from the sitemap, and are not emitted as `hreflang` alternates. English and the existing PT-BR page family remain eligible for indexing. Promote a locale only after page-level native, functional, legal/safety, and SERP review is recorded.

## Locale status

| Locale | Page-family coverage | Translation | Functional QA | Native review | Legal/safety review | SERP research |
|---|---:|---|---|---|---|---|
| pt-BR | 44/44 | machine-assisted draft + Portuguese cluster | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| id-ID | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| hi-IN | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| vi-VN | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| es-MX | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| ur-PK | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| de-DE | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| tr-TR | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| bn-BD | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |
| th-TH | 44/44 | translated working draft | passed | pending native reviewer | pending for privacy, terms, hearing | blocked: Apify monthly limit |

## Technical gates currently passing

- All 44 English sitemap page families have a route in each target locale cluster.
- The October 11 build emitted 530 pages and 528 sitemap URLs before the October 15 indexing gate; those counts are historical and should not be treated as the current indexable URL count.
- `npm run validate:localization` checks built-file existence, self-canonicals, the English/PT-BR alternate set, draft noindex directives, document language, and functional tools.
- The validator confirms indexable alternates are in the sitemap, hreflang relationships are reciprocal, `x-default` matches the English URL, and draft routes are excluded from the sitemap and alternate-language signals.
- Localized pages use shared interactive audio components and locale-prefixed internal links.
- Urdu pages set `dir="rtl"`; all page families use HTTPS trailing-slash canonicals.
- Historical production crawl verification returned HTTP 200 for all 528 URLs in the pre-gate sitemap after deployment version `53a0438e-59e8-4f31-805d-4044e7910b4b`.

## Required sign-off before calling a locale final

1. A native speaker reviews titles, H1s, controls, errors, technical vocabulary, and mobile text expansion.
2. A qualified reviewer checks hearing-safety, decibel/loudness caveats, privacy, and terms copy.
3. SERP research records local primary queries, intent, competing page types, and terminology; scraped result counts must not be presented as search volume.
4. Chrome, Firefox, and Safari checks cover microphone denial, autoplay restrictions, repeated runs, keyboard access, and RTL layout where applicable.

Until those gates are recorded in `src/data/localizationRegistry.ts`, status remains `machine-assisted-draft` / `pending-native-review`; the draft routes remain accessible but are not indexable.
