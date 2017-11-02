/**
 * Created by wqy on 2017/11/2.
 */

'use strict';

require('./index.scss');

require('page/commons/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.'+ type + '-success');
    $element.show();
});