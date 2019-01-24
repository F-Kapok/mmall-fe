/*
 * @Author: Kapok
 * @Date:   2019-01-21 10:37:06
 * @Last Modified by:   Kapok
 * @Last Modified time: 2019-01-24 14:06:15
 */

'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//环境变量配置 dev / prod
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取HtmlWebpackPlugin参数方法
var getHtmlConfig = function (name, title) {
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
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
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
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader']
            },
            {test: /\.string$/, loader: 'html-loader'},
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
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
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