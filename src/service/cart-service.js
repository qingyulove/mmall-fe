/**
 * Created by wqy on 2017/10/24.
 */
'use strict';
var _mm = require('util/mm.js');

var _cart = {
    getCartCount : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            method : 'POST',
            success : resolve,
            error : reject
        })
    }
}
module.exports = _cart;