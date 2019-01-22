/*
* @Author: Kapok
* @Date:   2019-01-22 15:00:08
* @Last Modified by:   Kapok
* @Last Modified time: 2019-01-22 15:13:41
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})