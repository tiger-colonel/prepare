const path = require('path');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                            ],
                            fallback: {
                                loader: 'vue-style-loader',
                            },
                        }),
                        less: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                                'less-loader',
                            ],
                            fallback: {
                                loader: 'vue-style-loader',
                            },
                        }),
                    },
                },
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: [
                            [
                                'transform-runtime',
                                {
                                    helper: false,
                                    polyfill: false,
                                    regenerator: true,
                                    moduleName: 'babel-runtime',
                                },
                                ['add-module-exports'],
                            ],
                        ],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'vue-style-loader',
                        }, {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        }, {
                            loader: 'less-loader',
                        },
                    ],
                    fallback: {
                        loader: 'vue-style-loader',
                    },
                }),
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'less-loader',
                    ],
                    fallback: {
                        loader: 'vue-style-loader',
                    },
                }),
            },
        ],
    },
    resolve: {
    //     modules: [
    //         path.resolve('./'),
    //         'node_modules',
    //     ],
    //     mainFields: ['jsnext:main', 'main'],
        // extensions: ['.js', '.vue'],
    },
    plugins: [
        new VueLoaderPlugin(),
        // new ESLintPlugin({}),
        new OptimizeCssPlugin({
            cssProcessorOptions: {
                safe: true,
                autoprefixer: {
                    remove: false,
                },
            },
        }),
    ],
};
