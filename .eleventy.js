const fs = require('fs');
const path = require('path');

const pluginSEO = require('eleventy-plugin-seo');
const pluginGoogleFonts = require('eleventy-google-fonts');

const { DateTime } = require('luxon');

const isDev = process.env.NODE_ENV === 'development';
const manifestPath = path.resolve(__dirname, 'dist', 'assets', 'build.json');
const manifest = isDev
  ? { 'main.js': '/assets/index.js', 'main.css': '/assets/index.css' }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginGoogleFonts);
  eleventyConfig.addPlugin(pluginSEO, require('./src/data/seo.json'));

  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');

  eleventyConfig.addNunjucksShortcode('bundledCSS', function () {
    return manifest['main.css'] ? `<link href="${manifest['main.css']}" rel="stylesheet"></link>` : '';
  });

  eleventyConfig.addNunjucksShortcode('bundledJS', function () {
    return manifest['main.js'] ? `<script defer="defer" src="${manifest['main.js']}"></script>` : '';
  });

  eleventyConfig.addNunjucksShortcode('preloadCSS', function () {
    return manifest['main.css'] ? `<link rel="preload" href="${manifest['main.css']}" as="style"></link>` : '';
  });

  eleventyConfig.addNunjucksShortcode('preloadJS', function () {
    return manifest['main.js'] ? `<link rel="preload" href="${manifest['main.js']}" as="script"></link>` : '';
  });

  eleventyConfig.addNunjucksShortcode('version', function () {
    try {
      return require('./package.json').version || '0.0.1';
    } catch {
      return '0.0.1';
    }
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

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('readableDate', (date) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('LLL dd, yyyy');
  });

  eleventyConfig.addFilter('htmlDateString', (date) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  return {
    passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};
