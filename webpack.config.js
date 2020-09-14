const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    devServer: {
        port: 4200,
    },
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './js/index.js'],
        about: ['@babel/polyfill', './js/about.js'],
        analytics: ['@babel/polyfill', './js/analytics.js']
    },
    output: {
        filename: "./js/[name].[hash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            chunks: ['main'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './about.html',
            chunks: ['about'],
            filename: 'about.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './analytics.html',
            chunks: ['analytics'],
            filename: 'analytics.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        importLoaders: 2,
                        hmr: isDev,
                        reloadAll: true,
                        publicPath: '../',
                    },
                },
                'css-loader'
            ]
        },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }]},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
        ]
    }
}