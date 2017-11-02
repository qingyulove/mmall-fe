/*
* @Author: wqy
* @Date:   2017-07-22 22:33:06
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-25 23:20:04
*/
'use strict';
require('./index.scss');
require('../module.js');
require('page/commons/nav-simple/index.js');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');

var $$ = require('jquery');
var _mm = require('util/mm.js');
var navSide = require('page/commons/nav-side/index.js');

var html = '<div>{{data}}</div>';
console.log(_mm.getUrlParam("test"));
var data = {
	data : 123
};
navSide.init({
    name: 'user-center'
});
//$$('body').html('hello index');
console.log("htmlTemplate: "+_mm.renderHtml(html,data));
console.log('hello index');