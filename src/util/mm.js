/*
* @Author: wqy
* @Date:   2017-09-24 15:55:12
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-27 00:21:56
*/
'use strict';
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};

var _mm = {

	request : function(param){
		var _this = this;

		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.type || 'json',
			data: param.data || '',
			success : function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}

			},
			error: function(err){
				typeof param.error === 'function' && param.error(err.status);

			}
		});
	},
	doLogin :function(){
		window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
	},
	//渲染html模板
	renderHtml :function(htmlTemplate,data){
		var template = 	Hogan.compile(htmlTemplate),
		    result = template.render(data);
		return result;
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '出错了');
	},
	//字段的验证，支持是否为空、手机、邮箱
	validate : function(value,type){
		var value = $.trim(value);
		if('require' === type){
			return !!value;
		}
		//手机号
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	goHome : function(){
		window.location.href = './index.html';
	}

};

module.exports = _mm;