import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const site = 'https://onlineaudiotest.com';
const locales = ['pt-br', 'id-id', 'hi-in', 'vi-vn', 'es-mx', 'ur-pk', 'de-de', 'tr-tr', 'bn-bd', 'th-th', 'fr-fr'];
const sitemap = fs.readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(site, ''));
const sitemapSet = new Set(urls);
const english = urls.filter((url) => !locales.some((locale) => url === `/${locale}/` || url.startsWith(`/${locale}/`)));
const errors = [];
const functionalTools = ['audio-device-check', 'mic-test', 'speaker-test', 'headphone-test', 'latency-test', 'bluetooth-latency-test', 'hearing-test', 'frequency-generator', 'audio-spectrum-analyzer', 'voice-recorder', 'mic-quality-test', 'audio-reaction-test', 'decibel-meter', 'loudness-meter', 'echo-test', 'bpm-detector', 'key-detector', 'key-and-bpm-detector'];
const englishChromeLabels = ['>Tools<', '>Devices<', '>Company<', '>Legal<', '>Home<', '>All rights reserved.<'];
const pages = new Map();
const hreflangBySegment = Object.fromEntries(locales.map((locale) => [locale, locale === 'pt-br' ? 'pt-BR' : locale.replace(/-([a-z]{2})$/, (_, region) => `-${region.toUpperCase()}`)]));

const languageForUrl = (url) => {
  if (url === '/' || !url.startsWith('/')) return 'en';
  const segment = url.split('/')[1];
  return locales.includes(segment) ? hreflangBySegment[segment] : 'en';
};

for (const url of urls) {
  const file = path.join(root, url === '/' ? 'index.html' : url.replace(/^\//, ''), url === '/' ? '' : 'index.html');
  if (!fs.existsSync(file)) { errors.push(`${url}: missing built file`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  const localized = locales.some((locale) => url.startsWith(`/${locale}/`));
  pages.set(url, { alternates: new Map(alternates.map(([, lang, href]) => [lang, href])) });
  if (!html.match(/<title>[^<]+<\/title>/)) errors.push(`${url}: missing title`);
  if (!html.match(/<meta name="description" content="[^"]+"/)) errors.push(`${url}: missing meta description`);
  if (!html.match(/<h1(?:\s[^>]*)?>[\s\S]*?\S[\s\S]*?<\/h1>/)) errors.push(`${url}: missing H1`);
  if (canonical !== `${site}${url}`) errors.push(`${url}: canonical ${canonical ?? 'missing'}`);
  if (alternates.length !== 13 || new Set(alternates.map(([, lang]) => lang)).size !== 13) errors.push(`${url}: expected 13 unique hreflang links, found ${alternates.length}`);
  for (const [, lang, href] of alternates) {
    let alternatePath;
    try { alternatePath = new URL(href).pathname; } catch { alternatePath = null; }
    if (!alternatePath || !sitemapSet.has(alternatePath)) errors.push(`${url}: ${lang} alternate is not an indexable sitemap URL (${href})`);
  }
  const alternateMap = new Map(alternates.map(([, lang, href]) => [lang, href]));
  if (alternateMap.get('x-default') !== alternateMap.get('en')) errors.push(`${url}: x-default must match the English alternate`);
  if (url !== '/' && !localized && html.includes('noindex')) errors.push(`${url}: unexpected noindex`);
  if (localized && html.includes('noindex')) errors.push(`${url}: localized page is noindex`);
  if (localized && html.match(/<html[^>]+lang="en"/)) errors.push(`${url}: English document language`);
  if (localized && englishChromeLabels.some((label) => html.includes(label))) errors.push(`${url}: untranslated English chrome label`);
  if (localized && functionalTools.some((tool) => url.endsWith(`/${tool}/`)) && !html.includes('id="localized-tool"')) errors.push(`${url}: missing shared functional tool experience`);
}

for (const [url, page] of pages) {
  const sourceAbsolute = `${site}${url}`;
  const sourceLanguage = languageForUrl(url);
  for (const [language, href] of page.alternates) {
    if (language === 'x-default') continue;
    let targetPath;
    try { targetPath = new URL(href).pathname; } catch { continue; }
    const target = pages.get(targetPath);
    if (target && target.alternates.get(sourceLanguage) !== sourceAbsolute) {
      errors.push(`${url}: ${language} alternate does not reciprocate ${sourceLanguage}`);
    }
  }
}

for (const locale of locales) {
  const count = urls.filter((url) => url === `/${locale}/` || url.startsWith(`/${locale}/`)).length;
  if (count !== english.length) errors.push(`${locale}: ${count} sitemap URLs vs ${english.length} English URLs`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Localization QA passed: ${urls.length} sitemap URLs; ${english.length} English families × ${locales.length} localized locales.`);
