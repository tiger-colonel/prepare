const _ = require('lodash');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const defaultWebpackConfig = require('./webpack.config');

class WebpackConfigManager {
    constructor() {
        this.webpackConfigs = _.cloneDeep(defaultWebpackConfig);
    }
    updateConfig(config) {
        this._updateDistPath(config);
        this._addCssPlugin(config);
        this._addHTMLPlugin(config);
    }
    _updateDistPath(config) {
        const {webpackConfigs} = this;
        const {entry, dirId, basePath} = config;
        webpackConfigs.entry = entry;
        webpackConfigs.output = {
            path: path.join(basePath, './'),
            filename: `./dist/${dirId}/index.js`,
        };
    }
    _addCssPlugin(config) {
        const {webpackConfigs} = this;
        let {dirId, basePath} = config;
        webpackConfigs.plugins.push(new ExtractTextPlugin({
            filename: `./dist/${dirId}/index.css`,
            allChunks: true,
        }));
    }
    _addHTMLPlugin(config) {
        const {webpackConfigs} = this;
        let {dirId, basePath, htmlDocConfig} = config;
        let {
            title='',
        } = htmlDocConfig || {};
        webpackConfigs.plugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, '../scaffold/template/index.html'),
            templateParameters: Object.assign({
                vendorJsPath: '',
                title,
                keyword: '',
                desc: '',
            }, {
            }),
            filename: path.join(basePath, `./dist/${dirId}/index.html`),
            inject: false,
        }));
    }
    getConfig() {
        return this.webpackConfigs;
    }
}

module.exports = WebpackConfigManager;
