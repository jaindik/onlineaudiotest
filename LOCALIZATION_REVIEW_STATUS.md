# Localization review ledger

Last updated: 2026-09-07

This ledger is intentionally explicit: a deployed page is not considered final SEO content until the native, functional, legal/safety, and SERP gates are complete. The current generated pages are translated working drafts with the technical SEO layer enabled.

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
- The build emits 530 pages and the sitemap contains 528 indexable URLs; error documents remain outside the sitemap.
- `npm run validate:localization` checks built-file existence, self-canonicals, 13 unique hreflang links, document language, and equal locale coverage.
- The validator also confirms every alternate is present in the sitemap, every hreflang relationship is reciprocal, `x-default` matches the English URL, localized pages have title/meta description/H1, and localized pages are not accidentally `noindex`.
- Localized pages use shared interactive audio components and locale-prefixed internal links.
- Urdu pages set `dir="rtl"`; all page families use HTTPS trailing-slash canonicals.
- Production crawl verification returned HTTP 200 for all 528 sitemap URLs after deployment version `53a0438e-59e8-4f31-805d-4044e7910b4b`.

## Required sign-off before calling a locale final

1. A native speaker reviews titles, H1s, controls, errors, technical vocabulary, and mobile text expansion.
2. A qualified reviewer checks hearing-safety, decibel/loudness caveats, privacy, and terms copy.
3. SERP research records local primary queries, intent, competing page types, and terminology; scraped result counts must not be presented as search volume.
4. Chrome, Firefox, and Safari checks cover microphone denial, autoplay restrictions, repeated runs, keyboard access, and RTL layout where applicable.

Until those gates are recorded in `src/data/localizationRegistry.ts`, status remains `machine-assisted-draft` / `pending-native-review` even though the technical routes are deployed.
