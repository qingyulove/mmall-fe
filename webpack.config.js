/*
* @Author: wqy
* @Date:   2017-07-22 22:53:17
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-21 23:30:02
*/
 var webpack = require('webpack');
 //打包css插件
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 //在html中引入html插件
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var path = require("path");

//环境变量配置

//var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

 var getHtmlConfig = function(name){
    return{
            template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject : true,
            hash : true,
            chunks : ['common',name]
        }
 }
var config = {
     entry: {
        'common' : ['./src/page/commons/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/index.js']
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
                test: /\.scss$/,
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
            }
        ]
      },
     plugins : [
       //合并js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 }
 //if('dev' === WEBPACK_ENV){
 //   config.entry.common.push('webpack-dev-server/client?http://localhost:8080');
 //}
 module.exports = config