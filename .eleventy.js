const fs = require('fs');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const manifestPath = path.resolve(__dirname, 'dist', 'build.json');
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

  eleventyConfig.addPassthroughCopy({ 'src/static': '/static', 'src/manifest.json': '' });

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
