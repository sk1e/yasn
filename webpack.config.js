'use strict'


const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack")

// const vimeoDir = path.resolve(__dirname, "blocks/vimeo-player")

module.exports = {
  entry: './ui-kit.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        { test: /\.pug$/, loader: 'pug' },
        { test: /\.json$/, loader: 'json' },
        { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
        // { test: /\.styl/, loader: 'file?name=[path][name].css!stylus', include: vimeoDir},
        { test: /\.(svg|png|ttf|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]' }
    ]
  },

    resolve: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new HtmlWebpackPlugin({template: "index.pug"}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],

};

