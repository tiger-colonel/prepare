/* eslint-disable no-undef */
let path = require('path');
let webpack = require('webpack')
let {cleanWebpackPlugin} = require('clean-webpack-plugin');
let webpackCommonConf = require('./webpack.common')
let {smart} = require('webpack-merge')
let {distPath} = require('./paths')
module.exports = smart(webpackCommonConf, {
    mode: 'development', 
    // loader配置
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: 'file-loader',
            },
        ]
    },
    // plugins插件配置
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development';
            ENV: JSON.stringify('development')
        }), 
    ],
    devServer: {
        port: 8080,
        progress: true,
        // 项目构建路径
        contentBase: distPath,
        // 启动gzip压缩
        compress: true,
        // 自动打开浏览器
        open: true,
        // 代理
        proxy: {
            // 将本地的 /api/xxx 请求代理到localhost:3000/api/xxx
            '/api': 'http://localhost:3000',
            // 
            '/api2': {
                target: 'http://localhost:3000',
            }
        }
    }
})
