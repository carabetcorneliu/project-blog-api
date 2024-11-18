const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'production',
    optimization: {
        moduleIds: 'deterministic',                 // Better caching with consistent module IDs
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),  // Set environment to production
          }),
        new BundleAnalyzerPlugin(),     // Bundle analysis for optimization
    ],
}