const path = require('path');
const WebpackBar = require('webpackbar');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isDev = process.env.NODE_ENV === 'development';
const fileName = isDev ? 'index' : 'index.[contenthash]';
const chunkName = isDev ? 'chunk.[name]' : 'chunk.[name].[contenthash]';

module.exports = {
  target: 'web',
  entry: [
    path.resolve(__dirname, 'src', 'assets', 'scripts', 'index.ts'),
    path.resolve(__dirname, 'src', 'assets', 'styles', 'index.css'),
  ],
  output: {
    filename: `${fileName}.js`,
    publicPath: 'assets/',
    chunkFilename: `${chunkName}.js`,
    path: path.resolve(__dirname, 'dist', 'assets'),
  },
  resolve: { extensions: ['.js', '.ts'] },
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
    new MiniCSSExtractPlugin({ filename: `${fileName}.css` }),
    new WebpackManifestPlugin({ fileName: 'build.json' }),
    new InjectManifest({
      swSrc: path.resolve('src', 'sw.ts'),
      swDest: path.resolve('dist', 'sw.js'),
      include: [/index.*\.js$/, /index.*\.css$/],
    }),
    new WebpackBar({ basic: !isDev }),
  ],
};
