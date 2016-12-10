// const path = require('path');
import path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pageList = [
  'ui-kit',
  'index',
  'news',
  'events',
  'polls',
  'messages',
  'profile',
];

const entries = {};
pageList.forEach((x) => { entries[x] = `./pages/${x}.js`; });

const htmlPlugins = [];

pageList.forEach((x) => {
  htmlPlugins.push(new HtmlWebpackPlugin({
    template: `pages/${x}.pug`,
    filename: `${x}.html`,
    chunks: [x],
  }));
});

module.exports = {
  entry: entries,

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve(__dirname, 'web_modules')],
        query: { presets: ['babel-preset-latest'] },
      },
      { test: /\.pug$/, loader: 'pug?pretty=true' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
      { test: /\.(svg|png|ttf|eot|woff|woff2)(\?v=.+)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },


  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ].concat(htmlPlugins),

  resolve: {
    alias: {
      'font-awesome': 'font-awesome/css/font-awesome.min.css',
      'user-photos': 'blocks/user-profile/user-photos/',
      d3: 'd3/node_modules',
    },
  },
};
