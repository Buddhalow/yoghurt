const path = require('path');
const HtmlWebpackPlugin = require('../../../Library/Caches/typescript/2.9/node_modules/@types/html-webpack-plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

 module.exports = {
    entry: ['./src/example.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
     resolve: {
        extensions: ['.js'],
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ],
    watch: true
} 