/* eslint-disable no-undef */
let webpack = require('webpack')
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let webpackCommonConf = require('./webpack.common')
let {merge} = require('webpack-merge')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// let TerserPlugin = require('terser-webpack-plugin') 
let HappyPack = require('happypack')
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


let UglifuJSPlugin = require('uglify-js-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let {distPath} = require('./paths')

module.exports = merge(webpackCommonConf, {
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
                test: /\.js$/,
                use: ['happypack/loader?id=babel'],
                // loader: ['babel-loader?cacheDirectory'],
                include: srcPath,
                exclude: /node_modules/,  
            },
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
                test: /\.css$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                // 数组中的loader顺序，是从右到左，逆序执行
                // 先是加前缀，然后解析import等引入的css模块，生成css，最后，插入html中的head的style中
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    // plugins插件配置
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空output.Path 文件夹
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        // 抽离css文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        }),
        // 多进程打包
        new HappyPack({
            // 唯一的标识 id， 来代表当前的HappyPack 是用来处理一类特定的文件
            id: 'babel',
            loader: ['babel-loader?cacheDirectory'],
        }),
        // 多进程压缩
        new ParallelUglifyPlugin({

        })
    ],
    optimization: {
        minimizer: [
            new UglifuJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initail 入口 chunk 对于异步导入的文件不处理
                async 异步 chunk，只对异步导入的文件处理
                all 全部 chunk
             */
             cacheGroups: {
                //  第三方模块
                vendor: {
                    name: 'vendor', // chunk名称
                    priority: 1, // 权限更高，优先抽离
                    test: /node_modules/,
                    minSize: 0, // 大小限制
                    minChunks: 1, // 最少复用几次
                },
                // 公共模块
                common: {
                    name: 'common',
                    priority: 0, 
                    minSize: 0,
                    minChunks: 2,
                }
             }
        }
    }
})
