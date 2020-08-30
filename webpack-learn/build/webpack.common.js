/* eslint-disable no-undef */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {srcPath} = require('./paths')

module.exports = {
    // 入口
    entry: path.join(srcPath, 'index'),
    // loader配置
    module: {
        // 对某个格式进行转换处理
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    // plugins插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: path.jpin(srcPath, 'index.html'),
        }),
    ],
};
