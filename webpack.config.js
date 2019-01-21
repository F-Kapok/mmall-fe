/*
 * @Author: Kapok
 * @Date:   2019-01-21 10:37:06
 * @Last Modified by:   Kapok
 * @Last Modified time: 2019-01-21 15:50:00
 */

'use strict';
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
console.log(WEBPACK_ENV);
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//环境变量配置 dev / prod
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取HtmlWebpackPlugin参数方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
//webpack config
module.exports = {
    mode: 'development',
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: { //我写一个module
        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
        rules: [{
            // test 表示测试什么文件类型
            test: /\.css$/,
            // 使用 'style-loader','css-loader'
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }]
            })
        }]
    },
    //把CSS单独打包到文件里
    plugins: [
        new extractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ],
    //独立通用模块到js/common.js
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
};
if ('dev' === WEBPACK_ENV) {
    config.entry.conmmon.push('webpack-dev-server/client?http://localhost:8088/');
}