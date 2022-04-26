const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPluglin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './assets/scripts/main.js' },
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        port: 8080
    },
    module: {
        rules: [ 
            {
                test: /\.js$/,
                // use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|svg|jpg|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }
                // ,
                    // 'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPluglin({ 
            template: './index.html'
        }),
        new MiniCssExtractPlugin()
    ],
};