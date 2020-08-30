/* eslint-disable no-undef */
let webpack = require('webpack')

let webpackCommonConf = require('./webpack.common')
let {merge} = require('webpack-merge')
let {distPath} = require('./paths')
module.exports = merge(webpackCommonConf, {
    mode: 'development', 
    // loader配置
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader?cacheDirectory'],
                include: srcPath,
                exclude: /node_modules/,  
            },
            // 直接引入图片 url
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: 'file-loader',
            },
            {
                test: /\.css$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: ['style-loader', 'css-loader',],
            },
            {
                test: /\.less$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: ['style-loader', 'css-loader', 'less-loader'],
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
