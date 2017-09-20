/* globals __dirname */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        // 'app/index': './src/app/index.jsx',
        'app/index': './src/app/index.vue.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            //
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            }, {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/page/index.html',
            hash: true,
            chunks: ['app/index', 'app/common']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app/common', // Specify the common bundle's name.
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('static/css/[name].[chunkhash].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
};