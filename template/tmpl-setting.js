﻿define(function (require, exports, module) {
    var helpers = {};
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                origin = $data.origin,
                sortType = $data.sortType,
                rangeType = $data.rangeType,
                isDebug = $data.isDebug,
                $out = '';
            $out += '<div id=\"page-setting\" class=\"wrap\"> <div id=\"order_wrap\" class=\"order_wrap\"> <div class=\"order_wrap_show\"> ';
            if (origin === 'Home') {
                $out += ' <h3 class=\"order_title\"><i class=\"icon icon_select\"></i>选择排序</h3> <ul class=\"order_list\"> <li data-trigger=\"sort\" data-type=\"1\" ';
                if (sortType == 1) {
                    $out += 'class=\"current\"';
                }
                $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>产品热度</a></li> <li data-trigger=\"sort\" data-type=\"2\" ';
                if (sortType == 2) {
                    $out += 'class=\"current\"';
                }
                $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>口碑指数</a></li> </ul> ';
            }
            $out += ' <h3 class=\"order_title\"><i class=\"icon icon_clock\"></i>时间范围</h3> <ul class=\"order_list\"> <li data-trigger=\"range\" data-type=\"1\" ';
            if (rangeType == 1) {
                $out += 'class=\"current\"';
            }
            $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>周</a></li> <li data-trigger=\"range\" data-type=\"2\" ';
            if (rangeType == 2) {
                $out += 'class=\"current\"';
            }
            $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>月</a></li> <li data-trigger=\"range\" data-type=\"3\" ';
            if (rangeType == 3) {
                $out += 'class=\"current\"';
            }
            $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>季</a></li> <li data-trigger=\"range\" data-type=\"4\" ';
            if (rangeType == 4) {
                $out += 'class=\"current\"';
            }
            $out += '><a href=\"javascript:;\"><i class=\"icon icon_ticked\"></i>年</a></li> </ul> ';
            if (origin === 'Home') {
                $out += ' <h3 class=\"order_title\"><i class=\"icon\"></i>高级</h3> <ul class=\"order_list link_list\"> <li><a data-trigger=\"sync\" href=\"javascript:;\">离线所有产品详情数据</a></li> <li><a href=\"javascript:;\" data-trigger=\"clearData\">清空所有本地数据</a></li> </ul> ';
            }
            $out += ' <h3 class=\"order_title\"><i class=\"icon\"></i>关于</h3> <ul class=\"order_list link_list\"> <li><a href=\"javascript:;\">版本：2.0</a></li> </ul> ';
            if (isDebug) {
                $out += ' <h3 class=\"order_title\"><i class=\"icon\"></i>Debug</h3> <ul class=\"order_list\"> <li><a href=\"javascript:;\" data-trigger=\"console\">打开控制台</a></li> <li><a href=\"javascript:;\" data-trigger=\"getAllData\">查看本地缓存</a></li> </ul> ';
            }
            $out += ' <div class=\"contact_wrap\"> <i class=\"icon icon_contact\" data-trigger=\"debug\"></i> <div class=\"contact_txt\"> <p>你有想在XXX上监测的产品吗？</p> <p><a href=\'moa-call: </div> </div> </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});