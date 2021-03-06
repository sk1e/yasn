import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const pageList = [
  'ui-kit',
  'index',
  'news',
  'events',
  'polls',
  'messages',
  'profile',
  'contacts',
  'terms',
];

const entries = pageList.reduce((acc, x) => (
  { [x]: ['babel-polyfill', `./pages/${x}.js`], ...acc }
), {});

const htmlPlugins = pageList.map(x => new HtmlWebpackPlugin({
  template: `pages/${x}.pug`,
  filename: `${x}.html`,
  chunks: [x],
}));

export default {
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
        include: [path.resolve(__dirname, 'web_modules'), path.resolve(__dirname, 'pages')],
        query: { presets: ['babel-preset-latest'] },
      },
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
      { test: /\.(svg|png|ico|jpeg|ttf|eot|woff|woff2)(\?v=.+)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },
  stylus: {
    import: ['~shared/constants.styl'],
  },

  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ].concat(htmlPlugins),

  resolve: {
    alias: {
      'font-awesome.css': 'font-awesome/css/font-awesome.min.css',
      'user-photos': 'blocks/user-profile/user-photos/',
    },
  },
};
