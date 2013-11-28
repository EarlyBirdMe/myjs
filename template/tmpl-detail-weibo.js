define(function (require, exports, module) {
    var helpers = {
        "$escapeHTML": function (content) {

            return typeof content === 'string' ? content.replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
                return {
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "&": "&#38;"
                }[s];
            }) : content;
        },
        "$getValue": function (value) {

            if (typeof value === 'string' || typeof value === 'number') {

                return value;

            } else if (!value) {

                return '';

            } else if (typeof value === 'function') {

                return value();

            }

        }
    };
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                id = $data.id,
                $out = '';
            $out += '<div id=\"d-weibo\" class=\"mod_detail\"> <div class=\"detail_title\"> <i class=\"icon icon_weibo\"></i> <h3 class=\"title\">热门微博</h3> <a data-trigger=\"tips\" data-content=\"\" href=\"javascript:;\" class=\"question\">?</a> </div> <div class=\"detail_con\"> <div id=\"weibo_list\" class=\"weibo_list\"> </div> <a href=\"#!/weibo/';
            $out += $escapeHTML($getValue(id));
            $out += '\" class=\"click_more\">点击更多➤</a> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});