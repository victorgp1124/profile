const path = require('path');
const htmlWebpack = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [miniCss.loader,
                'css-loader',
                'stylus-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                generator: {
                    filename: 'static/fonts/[hash][ext][query]',
                }
            }    
        ]
    },
    plugins: [
        new htmlWebpack({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new miniCss({
            filename: 'assets/[name].[contenthash].css'
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new TerserPlugin()
        ]
    }

    
}