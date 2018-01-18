/*
* @Author: wqy
* @Date:   2017-07-22 23:13:29
* @Last Modified by:   wqy
* @Last Modified time: 2017-09-06 00:05:37
*/
'use strict';
require('./index.scss');

require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var formError = {
    show :function (errMsg) {
        $(".error-item").show();
        $(".err-msg").text(errMsg);
    },
    hide : function () {
        $(".error-item").hide();
        $(".err-msg").text("");
    }
};
var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        $("#submit").click(function () {
            _this.submit();
        });
        $(".user-content").keyup(function (e) {
            if(e.keyCode == 13){
                _this.submit();
            }
        });
    },
    submit:function () {
        var formData = {
            username : $.trim($("#username").val()),
            password : $.trim($("#password").val()),
        },
        validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            _user.login(formData,function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function (errMsg) {
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }

    },
    //表单验证
    formValidate : function (formData) {
        var result = {
            status : false,
            msg : ""
        };
        if(!_mm.validate(formData.username,'require')){
            result.msg = "用户名不能为空";
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = "密码不能为空";
            return result;
        }
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};
$(function () {
    page.init();
});
console.log('hello user-login');