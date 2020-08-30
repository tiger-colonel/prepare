/* eslint-disable no-undef */
let path = require('path');
let webpack = require('webpack')
let {cleanWebpackPlugin} = require('clean-webpack-plugin');
let webpackCommonConf = require('./webpack.common')
let {smart} = require('webpack-merge')
let {srcPath, distPath} = require('./paths')

module.exports = {
    mode: 'production',
    output: {
        // 输出文件的名称
        filename: 'bundle.[contentHash:8].js',
        // 输出路径
        // 绝对路径
        path: distPath,
    },
    // loader配置
    module: {
        // 对某个格式进行转换处理
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loaders: 'url-loader',
                // 图片小于8kb，减少请求的数量，但是会增加打包的体积
                options: {
                    limit: 5 * 1024,
                    // 取hash的前十位
                    // [ext]图片的扩展名
                    name: '[hash:10].[ext]',
                    // 打包到img目录下
                    outputPath: './img1/',
                    // s设置图片的cdn地址
                    // publicPath: 'http://cdn.beibei.com'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',

            }
        ]
    },
    // plugins插件配置
    plugins: [
        new cleanWebpackPlugin(), // 会默认清空output.Path 文件夹
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        })
    ],
};
