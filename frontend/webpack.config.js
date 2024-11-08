const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/app.js',
    mode: "development",
    output: {
       filename: 'main.js',
       path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: '.dist',
        compress: true,
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./index.html"
    }),
        new CopyPlugin({
            patterns: [
                { from: "templates", to: "templates" },
                { from: "static/images", to: "images" },
                { from: "config", to: "config" },
                { from: "src/services", to: "src/services" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};