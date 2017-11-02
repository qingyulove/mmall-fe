/**
 * Created by wqy on 2017/10/23.
 */
'use strict';
require('./index.scss');

var _mm = require('util/mm.js');
var _templateIndex = require('./index.string');


var navSide = {
    option : {
        name : '',
        navList : [
            {name: 'user-center',desc: '个人中心',href:'./user-center.html',isActive: false},
            {name: 'order-list',desc: '我的订单',href:'./order-list.html',isActive: false},
            {name: 'pass-update',desc: '修改密码',href:'./pass-update.html',isActive: false},
            {name: 'about',desc: '关于MMall',href:'./about.html',isActive: false}
        ]
    },
    init : function (option) {
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav : function () {

        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        var navHtml = _mm.renderHtml(_templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHtml);
    }

};

module.exports = navSide;