/* Post-build SEO step (runs after `craco build`).
 * - writes one prerendered HTML page per language (build/<lang>/index.html) with the real text in the
 *   HTML, <title>, description, canonical, hreflang, Open Graph and JSON-LD, so crawlers do not depend
 *   on running the React app to see the content;
 * - writes robots.txt (sitemap.xml comes from sitemap-webpack-plugin).
 * React replaces the snapshot as soon as it mounts. Site address: SITE_URL (default https://znit.io). */
const fs = require('fs');
const path = require('path');
const { ROOT, SITE, load } = require('./shared.cjs');

const BUILD = path.join(ROOT, 'build');
const { translations } = load('src/i18n/translations.ts');
const { LANG_PATH, HREFLANG, LANG_CODES } = load('src/i18n/locales.ts');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (code) => SITE + LANG_PATH[code];
const OG_LOCALE = { 'en-US': 'en_US', 'en-GB': 'en_GB', 'pt-BR': 'pt_BR', 'es-ES': 'es_ES', 'fr-FR': 'fr_FR', 'de-DE': 'de_DE', 'zh-CN': 'zh_CN', 'ja-JP': 'ja_JP' };
const NAMES = { 'en-US': 'English (US)', 'en-GB': 'English (UK)', 'pt-BR': 'Português', 'es-ES': 'Español', 'fr-FR': 'Français', 'de-DE': 'Deutsch', 'zh-CN': '中文', 'ja-JP': '日本語' };
const VENUES = ['Binance', 'OKX', 'Bybit', 'Coinbase', 'Bitfinex'];

const head = (code) => {
  const tr = translations[code];
  const { title, description } = tr.seo;
  const alt = LANG_CODES.map((c) => `<link rel="alternate" hreflang="${HREFLANG[c]}" href="${url(c)}">`).join('');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': SITE + '/#org', name: 'Znit.io', url: SITE + '/', logo: SITE + '/apple-touch-icon.png' },
      { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'Znit.io', inLanguage: HREFLANG[code], publisher: { '@id': SITE + '/#org' } },
      { '@type': 'WebPage', '@id': url(code) + '#page', url: url(code), name: title, description, inLanguage: HREFLANG[code], isPartOf: { '@id': SITE + '/#site' } },
    ],
  };
  return (
    `<link rel="canonical" href="${url(code)}">${alt}<link rel="alternate" hreflang="x-default" href="${url('en-US')}">` +
    `<meta property="og:type" content="website"><meta property="og:site_name" content="Znit.io"><meta property="og:title" content="${esc(title)}">` +
    `<meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url(code)}"><meta property="og:locale" content="${OG_LOCALE[code]}">` +
    `<meta property="og:image" content="${SITE}/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">` +
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${SITE}/og-image.png">` +
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>` +
    `<style>body{background:#06040d;margin:0}#seo-snapshot{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}</style>` +
    // without JavaScript the text is the page: show it as a plain readable document
    `<noscript><style>#seo-snapshot{position:static;width:auto;height:auto;margin:0 auto;padding:40px 24px;overflow:visible;clip:auto;clip-path:none;white-space:normal;max-width:960px;font:16px/1.6 system-ui,sans-serif;color:#eef0ff}#seo-snapshot h1{font-size:44px;line-height:1.1}#seo-snapshot h2{margin-top:40px}#seo-snapshot a{color:#22e6ff}</style></noscript>`
  );
};

const snapshot = (code) => {
  const l = translations[code].landing;
  const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join('');
  const links = LANG_CODES.map((c) => `<a href="${LANG_PATH[c]}" hreflang="${HREFLANG[c]}" lang="${HREFLANG[c]}">${esc(NAMES[c])}</a>`).join(' · ');
  return (
    `<main id="seo-snapshot">` +
    `<header><h1>${esc(l.hero.title)} ${esc(l.hero.subtitle)}</h1><p>${esc(l.hero.description)}</p></header>` +
    `<p>${esc(l.manifesto)}</p>` +
    `<section id="strategies"><h2>${esc(l.strategies.title)}</h2><p>${esc(l.strategies.subtitle)}</p>` +
    l.strategies.items.map((s) => `<article><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><ul>${li(s.tags)}</ul></article>`).join('') +
    `</section>` +
    `<section id="simulator"><h2>${esc(l.sim.title)}</h2><p>${esc(l.sim.subtitle)}</p><p>${esc(l.sim.note)}</p></section>` +
    `<section id="venues"><h2>${esc(l.venues.title)}</h2><p>${esc(l.venues.subtitle)}</p><ul>${li(VENUES)}</ul><p>${esc(l.venues.note)}</p></section>` +
    `<section id="process"><h2>${esc(l.process.title)}</h2><p>${esc(l.process.subtitle)}</p><ol>` +
    l.process.steps.map((s) => `<li><strong>${esc(s.title)}</strong> ${esc(s.description)}</li>`).join('') +
    `</ol></section>` +
    `<section id="why"><h2>${esc(l.why.title)}</h2><p>${esc(l.why.subtitle)}</p><ul>` +
    Object.values(l.why.reasons).map((r) => `<li><strong>${esc(r.title)}</strong> ${esc(r.description)}</li>`).join('') +
    `</ul></section>` +
    `<section id="start"><h2>${esc(l.cta.title)}</h2><p>${esc(l.cta.description)}</p></section>` +
    `<nav aria-label="Languages">${links}</nav></main>`
  );
};

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('seo: <div id="root"></div> not found in build/index.html');

for (const code of LANG_CODES) {
  const { title, description } = translations[code].seo;
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${HREFLANG[code]}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(description)}"`)
    .replace('</head>', head(code) + '</head>')
    .replace('<div id="root"></div>', `<div id="root">${snapshot(code)}</div>`);
  const out = path.join(BUILD, LANG_PATH[code].replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

// sitemap.xml is emitted by sitemap-webpack-plugin (craco.config.js); fail loudly if it is missing.
const sitemapFile = path.join(BUILD, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) throw new Error('seo: build/sitemap.xml not found, check SitemapPlugin in craco.config.js');
console.log(`seo: sitemap.xml ok, ${(fs.readFileSync(sitemapFile, 'utf8').match(/<loc>/g) || []).length} URLs, at ${path.relative(ROOT, sitemapFile)} (publish it, then submit ${SITE}/sitemap.xml in Search Console)`);
fs.writeFileSync(path.join(BUILD, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`seo: ${LANG_CODES.length} pages and robots.txt written for ${SITE}`);
