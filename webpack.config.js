/*
* @Author: wqy
* @Date:   2017-07-22 22:53:17
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-24 16:13:24
*/
 var webpack = require('webpack');
 //打包css插件
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 //在html中引入html插件
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var path = require("path");

//环境变量配置

//var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

 var getHtmlConfig = function(name,title){
    return{
            template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject : true,
            hash : true,
            title : title,
            chunks : ['common',name]
        }
 };
var config = {
     entry: {
        'common' : ['./src/page/commons/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/index.js'],
     	'result' : ['./src/page/result/index.js']
     },
     output: {
         path: path.resolve(__dirname, './dist'),
         publicPath: '/dist',
         filename: 'js/[name].js'
     },
     externals : {
     	'jquery' : 'window.jQuery'
     },
      module: {
        rules: [
           {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //resolve-url-loader may be chained before sass-loader if necessary
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: "resource/[name].[ext]"
                    }  
                  }
                ]
            },
            {
                test :/\.string$/,
                use:[{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
      },
      resolve : {
        alias : {
          util : __dirname + '/src/util',
          image : __dirname + '/src/image',
          service : __dirname + '/src/service',
          page : __dirname + '/src/page',
          node_modules:__dirname+'/node_modules'
        }
      },
     plugins : [
       //合并js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
     ]
 };
 //if('dev' === WEBPACK_ENV){
 //   config.entry.common.push('webpack-dev-server/client?http://localhost:8080');
 //}
 module.exports = config;