const fs = require('fs');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const manifestPath = path.resolve(__dirname, 'dist', 'assets', 'manifest.json');
const manifest = isDev
  ? {
      'main.js': '/assets/index.js',
      'main.css': '/assets/index.css',
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));

module.exports = (eleventyConfig) => {
  eleventyConfig.addLayoutAlias('base', 'base.njk');

  eleventyConfig.addShortcode('bundledCSS', function () {
    return manifest['main.css'] ? `<link href="${manifest['main.css']}" rel="stylesheet" />` : '';
  });

  eleventyConfig.addShortcode('bundledJS', function () {
    return manifest['main.js'] ? `<script defer="defer" src="${manifest['main.js']}" ></script>` : '';
  });

  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });

  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

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
