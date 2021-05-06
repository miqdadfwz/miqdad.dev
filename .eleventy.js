const fs = require('fs');
const path = require('path');

const pluginSEO = require('eleventy-plugin-seo');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginGoogleFonts = require('eleventy-google-fonts');
const pluginNavigation = require('@11ty/eleventy-navigation');

const isDev = process.env.NODE_ENV === 'development';
const manifestPath = path.resolve(__dirname, 'dist', 'build.json');
const manifest = isDev
  ? {
      'main.js': '/assets/index.js',
      'main.css': '/assets/index.css',
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRSS);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginGoogleFonts);

  eleventyConfig.addPlugin(pluginSEO, require('./src/data/seo.json'), {
    titleStyle: 'minimalistic',
    titleDivider: '|',
    imageWithBaseUrl: true,
  });

  eleventyConfig.addLayoutAlias('base', 'base.njk');

  eleventyConfig.addShortcode('bundledCSS', function () {
    return manifest['main.css'] ? `<link href="${manifest['main.css']}" rel="stylesheet"></link>` : '';
  });

  eleventyConfig.addShortcode('bundledJS', function () {
    return manifest['main.js'] ? `<script defer="defer" src="${manifest['main.js']}"></script>` : '';
  });

  eleventyConfig.addShortcode('preloadCSS', function () {
    return manifest['main.css'] ? `<link rel="preload" href="${manifest['main.css']}" as="style"></link>` : '';
  });

  eleventyConfig.addShortcode('preloadJS', function () {
    return manifest['main.js'] ? `<link rel="preload" href="${manifest['main.js']}" as="script"></link>` : '';
  });

  eleventyConfig.addPassthroughCopy({ 'src/static': '/static', 'src/manifest.json': '', 'src/robots.txt': '' });

  eleventyConfig.setBrowserSyncConfig({
    files: [manifestPath],
    ...(isDev
      ? {
          https: {
            cert: path.resolve('ssl', 'localhost+2.pem'),
            key: path.resolve('ssl', 'localhost+2-key.pem'),
          },
        }
      : {}),
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};
