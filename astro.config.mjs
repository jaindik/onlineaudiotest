// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// Segments that should never appear in the sitemap (redirect stubs & error pages)
const EXCLUDE_SEGMENTS = ['audio-test', 'headphone-test', '404', '500'];

export default defineConfig({
  site: 'https://onlineaudiotest.com',

  compressHTML: true,

  build: {
    // Bundle all component CSS into <style> tags — no render-blocking .css fetches
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      filter: (page) => !EXCLUDE_SEGMENTS.some((seg) => page.includes(`/${seg}`)),
      serialize(item) {
        const u = item.url;
        const today = new Date().toISOString().split('T')[0];
        item.lastmod = today;
        if (u === 'https://onlineaudiotest.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (/\/(mic-test|speaker-test|latency-test)\/?$/.test(u)) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (/\/(about|contact)\/?$/.test(u)) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});