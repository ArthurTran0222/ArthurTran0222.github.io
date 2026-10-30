import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Có thể ghi đè qua biến môi trường khi deploy:
// ASTRO_SITE="https://ArthurTran0222.github.io"
// ASTRO_BASE="/"
const site = process.env.ASTRO_SITE || 'https://ArthurTran0222.github.io';
const rawBase = process.env.ASTRO_BASE || '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
