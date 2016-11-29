const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'ui-kit': './pages/ui-kit.js',
    index: './pages/index.js',
  },

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
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
      { test: /\.(svg|png|ttf|eot|woff|woff2)(\?v=.+)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'pages/index.pug', filename: 'index.html', chunks: ['index'] }),
    new HtmlWebpackPlugin({ template: 'pages/ui-kit.pug', filename: 'ui-kit.html', chunks: ['ui-kit'] }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ],

  resolve: {
    alias: {
      'font-awesome': 'font-awesome/css/font-awesome.min.css',
    },
  },
};
