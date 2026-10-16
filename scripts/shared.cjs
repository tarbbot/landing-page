/* Shared by craco.config.js (sitemap) and scripts/seo.cjs (prerender): site address and the i18n maps. */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const SITE = (process.env.SITE_URL || process.env.REACT_APP_SITE_URL || 'https://znit.io').replace(/\/$/, '');

// Loads a dependency-free TypeScript file from src/ (translations, locales) without building the app.
const load = (file) => {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^import .*$/gm, '');
  const mod = { exports: {} };
  new Function('exports', 'module', ts.transpileModule(src, { compilerOptions: { module: 'commonjs', target: 'es2019' } }).outputText)(mod.exports, mod);
  return mod.exports;
};

module.exports = { ROOT, SITE, load };
