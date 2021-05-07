const fs = require('fs');
const path = require('path');

const pluginSEO = require('eleventy-plugin-seo');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginGoogleFonts = require('eleventy-google-fonts');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginTimeToRead = require('eleventy-plugin-time-to-read');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

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
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPlugin(pluginSEO, require('./src/data/seo.json'), {
    titleStyle: 'minimalistic',
    titleDivider: '|',
    imageWithBaseUrl: true,
  });

  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');

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

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  });

  eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('readableDate', (date) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('LLL dd, yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (date) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addPlugin(pluginTimeToRead, {
    style: 'short',
  });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', 'html'],
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};
