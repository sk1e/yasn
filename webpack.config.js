'use strict'


const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack")


module.exports = {
    entry: {
        // "ui-kit": "./ui-kit.js",
        "index": "./index.js"
    },
    

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [path.resolve(__dirname, 'blocks')],
                query: { presets: ['babel-preset-latest']}
            },
            { test: /\.pug$/, loader: 'pug' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
             { test: /\.(svg|png|ttf|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]' }
        ]
    },

    plugins: [
        // pp,
        new HtmlWebpackPlugin({template: "index.pug", filename: "index.html", chunks: ["index"]}),
        // new HtmlWebpackPlugin({template: "ui-kit.pug", filename: "ui-kit.html", chunks: ["ui-kit"]}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ],
};


