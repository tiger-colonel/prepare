/* eslint-disable no-undef */
const path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// let OptimizeCss = require('optimize-css-assets-webpack-plugin');
// let UglifyJsPlugin = require('uglify-js-plugin');

// console.log('----------', path.resolve(__dirname, 'dist'));
module.exports = {
    // 优化项
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true,
    //         }),
    //         new OptimizeCss({}),
    //     ]
    // },
    // 开发模式 ，production(生产)
    mode: 'development',
    // 入口
    entry: './src/index.js',
    output: {
        // 输出文件的名称
        filename: 'bundle.js',
        // 输出路径
        // 绝对路径
        path: path.resolve(__dirname, 'dist'),
    },
    // loader配置
    module: {
        // 对某个格式进行转换处理
        rules: [
            {
                test: /\.js$/,
                use: {
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
            {
                test: /\.css$/,
                use: [
                    // // use数组中的loader顺序，是从上到下，逆序执行

                    // // 将js的样式内容插入到style标签中
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // 将css文件转换为js
                    'css-loader',
                    // 'postcss-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loaders: 'url-loader',
                // 图片小于8kb，减少请求的数量，但是会增加打包的体积
                options: {
                    limit: 8 * 1024,
                    // 
                    esModule: false,
                    // 取hash的前十位
                    // [ext]图片的扩展名
                    name: '[hash:10].[ext]'
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
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    devServer: {
        // 项目构建路径
        contentBase: path.resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
    }
};
