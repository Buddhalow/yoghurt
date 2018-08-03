const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        new HtmlWebpackPlugin(),
        new GhPagesWebpackPlugin({
            path: './dist',
            options: {
                message: 'Update Home Page',
                user: {
                    name: 'Alexander Forselius',
                    email: 'alexander.forselius@buddhalow.com'
                }
            }
        })
    ],
    watch: true
} 