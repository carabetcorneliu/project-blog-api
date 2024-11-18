const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        // filename: 'main.js',                     // default
        filename: '[name].[contenthash].js',        // Cache-busting filenames
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index.html',
            chunks: ['index'],                      // JS chunk
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'login.html',
        //     template: './src/pages/login.html',
        //     chunks: ['login'],                      // JS
        // }),
        new CleanWebpackPlugin(),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};