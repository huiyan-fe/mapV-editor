/* globals __dirname */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = process.env.NODE_ENV || 'production';
// console.log('111', process, env);
module.exports = {
    entry: {
        // 'app/index': './src/app/index.jsx',
        'app/index': './src/app/index.vue.js',
        'app/common': ['mapv', 'vue', 'element-ui', 'vue-material']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        inline: false,
        hot: true,
    },

    module: {
        rules: [
            // {
            //     loader: 'worker-loader',
            //     options: { inline: true }
            // },
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
                    use: ['url-loader', 'css-loader', 'sass-loader']
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
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/page/index.html',
            hash: true,
            chunks: ['app/common', 'app/index'],
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app/common', // Specify the common bundle's name.
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath(`static/css/[name].${env==='production' ? '[chunkhash].':''}css`).replace('css/js', 'css');
            },
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: env === 'production' ? env : '"development"'
            }
        }),
    ]
};