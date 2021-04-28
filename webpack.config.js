const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = isDev ? 'index' : 'index.[contenthash]';

module.exports = {
  target: 'web',
  entry: [
    path.resolve(__dirname, 'src', 'assets', 'scripts', 'index.ts'),
    path.resolve(__dirname, 'src', 'assets', 'styles', 'index.css'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: `${filename}.js`,
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  optimization: {
    minimizer: [
      ...(isDev
        ? []
        : [
            new ESBuildMinifyPlugin({
              target: 'es2015',
            }),
          ]),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      {
        test: /(\.css)$/,
        include: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }],
      },
      {
        test: /(\.css)$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }, 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: `${filename}.css` }),
    new WebpackManifestPlugin({ publicPath: '/src/assets/' }),
    new SimpleProgressWebpackPlugin({ format: 'minimal' }),
  ],
};
