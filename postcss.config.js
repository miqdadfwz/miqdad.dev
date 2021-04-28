const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const plugins = [tailwind, autoprefixer];
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  const cssnano = require('cssnano');

  [].push.apply(plugins, [cssnano({ preset: 'default' })]);
}

module.exports = { plugins };
