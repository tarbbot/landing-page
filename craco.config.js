// Load configuration from environment or config file
const path = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const { SITE, load } = require('./scripts/shared.cjs');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env }) => {
      // sitemap.xml for https://znit.io: one entry per language page, each listing every alternate
      // (hreflang) so search engines connect the translations.
      if (env === 'production') {
        const { LANG_PATH, HREFLANG, LANG_CODES } = load('src/i18n/locales.ts');
        const alternates = [
          ...LANG_CODES.map((c) => ({ lang: HREFLANG[c], url: SITE + LANG_PATH[c] })),
          { lang: 'x-default', url: SITE + LANG_PATH['en-US'] },
        ];
        webpackConfig.plugins.push(
          new SitemapPlugin({
            base: SITE,
            paths: LANG_CODES.map((c) => ({
              path: LANG_PATH[c],
              priority: c === 'en-US' ? 1.0 : 0.8,
              changefreq: 'weekly',
              links: alternates,
            })),
            options: { filename: 'sitemap.xml', lastmod: true, skipgzip: true },
          })
        );
      }

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }
      
      return webpackConfig;
    },
  },
};