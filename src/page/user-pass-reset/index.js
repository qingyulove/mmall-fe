/**
 * Created by wqy on 2018/1/15.
 */
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
    data:{
        username:'',
        question:'',
        password:'',
        answer:'',
        token:''
    },
    init:function () {
        this.bindEvent();
        this.onLoad();
    },
    onLoad:function () {
        this.loadStepUsername();
    },
    bindEvent:function () {
        var _this = this;
        $("#submit-username").click(function (res) {
            var username = $.trim($("#username").val());
            if(username){
                _user.getQuestion(username,function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('请输入用户名');
            }
            _this.submit();
        });
        $("#submit-question").click(function (res) {
            var answer = $.trim($("#answer").val());
            if(answer){
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer
                },function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('请输入密码提示问题的答案');
            }
            _this.submit();
        });
        $("#submit-password").click(function (res) {
            var password = $.trim($("#password").val());
            if(password && password.length>=6){
                _user.resetPassword({
                    username:_this.data.username,
                    passwordNew:password,
                    forgetToken:_this.data.token
                },function (res) {
                    window.location.href='./result.html?type=pass-reset'
                },function (errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('请输入不少于6位的新密码');
            }
            _this.submit();
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
    },
    loadStepUsername:function () {
        $(".step-username").show();
    },
    loadStepQuestion:function () {
        formError.hide();
        $(".step-username").hide();
        $(".step-question").show();
        $(".question").text(this.data.question);
    },
    loadStepPassword:function () {
        formError.hide();
        $(".step-question").hide();
        $(".step-password").show();
    }
};
$(function () {
    page.init();
});
console.log('hello user-pass-reset');