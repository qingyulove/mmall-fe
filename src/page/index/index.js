/*
* @Author: wqy
* @Date:   2017-07-22 22:33:06
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-25 23:20:04
*/
'use strict';
require('./index.scss');
require('../module.js');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
require('page/common/header/index.js');

var $$ = require('jquery');
var _mm = require('util/mm.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});