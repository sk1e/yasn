'use strict'


const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './flat.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        { test: /\.pug$/, loader: 'pug' },
        { test: /\.styl$/, loader: ExtractTextPlugin.extract('!css!stylus') },
        { test: /\.(png|svg|ttf|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]' }
    ]
  },
    resolve: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new HtmlWebpackPlugin({template: "index.pug"}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
    ],

};

