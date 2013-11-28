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

        },
        "$each": function (data, callback) {

            if (_isArray(data)) {
                for (var i = 0, len = data.length; i < len; i++) {
                    callback.call(data, data[i], i, data);
                }
            } else {
                for (var i in data) {
                    callback.call(data, data[i], i);
                }
            }

        }
    };
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                _rangeTypeText = $data._rangeTypeText,
                reputation = $data.reputation,
                $each = $helpers.$each,
                $value = $data.$value,
                $index = $data.$index,
                id = $data.id,
                $out = '';
            $out += '<div id=\"d-reputation\" class=\"mod_detail\"> <div class=\"detail_title\"> <i class=\"icon icon_smile\"></i> <h3 class=\"title\">口碑趋势</h3> <a data-trigger=\"tips\" data-content=\"\" href=\"javascript:;\" class=\"question\">?</a> </div> <div class=\"detail_con\"> <h3 class=\"detail_con_title\">口碑指数趋势图</h3> <h4 class=\"detail_con_subtitle\">';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '最高<span id=\"reputation-max\">--</span>，';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '最低<span id=\"reputation-min\">--</span>，';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '平均<span id=\"reputation-mean\">--</span></h4> <div style=\"height:200px\" id=\"reputation_trend_chart\" class=\"detail_data_wrap\"> </div> <div class=\"detail_con_txt\"> 近一';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '的口碑指数为<span class=\"tips\">';
            $out += $escapeHTML($getValue(reputation.ReputationIndex));
            $out += '</span>，与上';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '相比<span id=\"reputation-difference\" class=\"tips\">--</span> </div> <div class=\"praise_detail\"> <div class=\"praise_area positive_area\"> <div class=\"praise_title\"><i class=\"ico_circle\"></i><h3 class=\"title\">正面口碑 Top5：</h3></div> <ul class=\"praise_list\"> ';
            $each(reputation.ReputationTop5List[0].TermList, function ($value, $index) {
                $out += ' <li> <a href=\"#!/reputation/';
                $out += $escapeHTML($getValue(id));
                $out += '/1/';
                $out += $escapeHTML($getValue($value.Alias));
                $out += '\"><span class=\"txt\">';
                $out += $escapeHTML($getValue($value.Alias));
                $out += '</span><span class=\"percentage\"><strong>';
                $out += $escapeHTML($getValue($value.Percentage));
                $out += '</strong>%</span></a> ';
                if ($value.IsNew) {
                    $out += '<i class=\"flag flag_n\">n</i>';
                }
                $out += ' </li> ';
            });
            $out += ' </ul> </div> <div class=\"praise_area negative_area\"> <div class=\"praise_title\"><i class=\"ico_circle\"></i><h3 class=\"title\">负面口碑 Top5：</h3></div> <ul class=\"praise_list\"> ';
            $each(reputation.ReputationTop5List[1].TermList, function ($value, $index) {
                $out += ' <li> <a href=\"#!/reputation/';
                $out += $escapeHTML($getValue(id));
                $out += '/-1/';
                $out += $escapeHTML($getValue($value.Alias));
                $out += '\"><span class=\"txt\">';
                $out += $escapeHTML($getValue($value.Alias));
                $out += '</span><span class=\"percentage\"><strong>';
                $out += $escapeHTML($getValue($value.Percentage));
                $out += '</strong>%</span></a> ';
                if ($value.IsNew) {
                    $out += '<i class=\"flag flag_n\">n</i>';
                }
                $out += ' </li> ';
            });
            $out += ' </ul> </div> </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});