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
                _rangeTypeText = $data._rangeTypeText,
                focus = $data.focus,
                $out = '';
            $out += '<div id=\"d-focus\" class=\"mod_detail\"> <div class=\"detail_title\"> <i class=\"icon icon_rank\"></i> <h3 class=\"title\">热度趋势</h3> <a data-trigger=\"tips\" data-content=\"\" href=\"javascript:;\" class=\"question\">?</a> </div> <div class=\"detail_con\"> <h3 class=\"detail_con_title\">热度趋势图</h3> <h4 class=\"detail_con_subtitle\">历史';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '平均<span>';
            $out += $escapeHTML($getValue(focus.HistoryAverageCount));
            $out += '</span>条</h4> <div style=\"height:200px\" id=\"focus_trend_chart\" class=\"detail_data_wrap\"> </div> <div class=\"detail_con_txt\"> 周近一';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '共有相关微博<span class=\"tips\">';
            $out += $escapeHTML($getValue(focus.TotalCount));
            $out += '</span>条，与上一';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '相比<span id=\"focus-difference\" class=\"tips\">--</span> </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});