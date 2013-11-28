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
                ReputationIndex = $data.ReputationIndex,
                ChainIndex = $data.ChainIndex,
                TotalCount = $data.TotalCount,
                CompetitionReport = $data.CompetitionReport,
                $each = $helpers.$each,
                $value = $data.$value,
                $index = $data.$index,
                $out = '';
            $out += '<div class=\"compare_main\"> <div class=\"final_score\"> <div class=\"num\">';
            $out += $escapeHTML($getValue(ReputationIndex));
            $out += '<i>';
            $out += $escapeHTML($getValue(ReputationIndex));
            $out += '</i></div> <span class=\"percentage\"> ';
            if (ChainIndex === 999999999) {
                $out += ' <i class=\"con_down\"></i>--% ';
            } else if (ChainIndex < 0) {
                $out += ' <i class=\"icon_down\"></i>';
                $out += $escapeHTML($getValue(-1 * ChainIndex));
                $out += '% ';
            } else {
                $out += ' <i class=\"icon_up\"></i>';
                $out += $escapeHTML($getValue(ChainIndex));
                $out += '% ';
            }
            $out += ' </span> <div class=\"bg_wrap\"> <div class=\"bg bg_t\"><span id=\"page-detail-deg1\" class=\"half_cut\" style=\"-webkit-transform:rotate(-180deg);\"><i></i></span></div> <div class=\"bg bg_b\"><span id=\"page-detail-deg2\" class=\"half_cut\" style=\"-webkit-transform:rotate(-180deg);\"><i></i></span></div> </div> </div> <div class=\"data_wrap\"> <div class=\"compare_data compare_weibo\"> <a href=\"javascript:;\" data-trigger=\"go\" data-id=\"d-focus\"> <i class=\"icon icon_weibo\"></i> <strong class=\"data\"><span class=\"num\">';
            $out += $escapeHTML($getValue(TotalCount));
            $out += '</span></strong> <p class=\"desc\">有效样本</p> </a> </div> <div class=\"compare_data compare_trend\"> <a href=\"javascript:;\" data-trigger=\"go\" data-id=\"d-reputation\"> <i class=\"icon icon_tendency\"></i> <strong class=\"data\"><span class=\"num\">';
            $out += $escapeHTML($getValue(ReputationIndex));
            $out += '</span></strong> <p class=\"desc\">口碑指数</p> </a> </div> </div> ';
            if (ReputationIndex <= 20) {
                $out += ' <h3 class=\"evaluation\">口碑指数很低，要引起重视了哦！</h3> ';
            } else if (ReputationIndex > 20 && ReputationIndex <= 40) {
                $out += ' <h3 class=\"evaluation\">口碑指数较低，是不是出了什么问题？</h3> ';
            } else if (ReputationIndex > 40 && ReputationIndex <= 60) {
                $out += ' <h3 class=\"evaluation\">口碑指数一般，需持续关注和优化。</h3> ';
            } else if (ReputationIndex > 60 && ReputationIndex <= 80) {
                $out += ' <h3 class=\"evaluation\">口碑指数较高，请继续加油！</h3> ';
            } else if (ReputationIndex > 80) {
                $out += ' <h3 class=\"evaluation\">口碑指数很高，很不错哦！</h3> ';
            }
            $out += '</div>';
            if (CompetitionReport.length) {
                $out += '<div class=\"rank\"> <h3 class=\"title\">竞品情况</h3> ';
                $each(CompetitionReport, function ($value, $index) {
                    $out += ' <div class=\"details\"> <span class=\"name\">';
                    $out += $escapeHTML($getValue($value.ProductUniqueName));
                    $out += '</span> <span class=\"score\">口碑指数 <strong class=\"tips\">';
                    $out += $escapeHTML($getValue($value.ReputationIndex || '--'));
                    $out += '</strong></span> <span class=\"weibo\"><i class=\"icon_weibo\"></i>';
                    $out += $escapeHTML($getValue($value.ProductWeiboCount || '--'));
                    $out += '</span> </div> ';
                });
                $out += '</div>';
            }
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});