/*
* @Author: wqy
* @Date:   2017-07-22 22:53:17
* @Last Modified by:   wqy
* @Last Modified time: 2017-07-23 00:17:37
*/
 
var config = {
     entry: {
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/index.js']
     },
     output: {
         path: './dist',
         filename: 'js/[name].js'
     },
     externals : {
     	'jquery' : 'window.jquery'
     },
     plugins:[
     new
     ]
 }
 module.exports = config