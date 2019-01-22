/*
 * @Author: Kapok
 * @Date:   2019-01-21 10:37:06
 * @Last Modified by:   Kapok
 * @Last Modified time: 2019-01-22 17:24:03
 */

'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//环境变量配置 dev / prod
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取HtmlWebpackPlugin参数方法
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
//webpack config
var config = {
    mode: 'development',
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'result': ['./src/page/result/index.js'],
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }]
                })
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=10000&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + "/src/util",
            page: __dirname + "/src/page",
            service: __dirname + "/src/service",
            image: __dirname + "/src/image",
        }
    },
    //把CSS单独打包到文件里
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录页面')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册页面')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
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


module.exports = config;