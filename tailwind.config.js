module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.njk'],
  theme: {
    fontFamily: {
      serif: ['PT Serif', 'Oswald', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
