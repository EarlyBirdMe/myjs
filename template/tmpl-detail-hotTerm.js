define(function (require, exports, module) {
    var helpers = {
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

        },
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
                hotTerm = $data.hotTerm,
                $each = $helpers.$each,
                $value = $data.$value,
                $index = $data.$index,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                id = $data.id,
                $out = '';
            $out += '<div id=\"d-hotTerm\" class=\"mod_detail\"> <div class=\"detail_title\"> <i class=\"icon icon_word\"></i> <h3 class=\"title\">热词分析</h3> <a data-trigger=\"tips\" data-content=\"\" href=\"javascript:;\" class=\"question\">?</a> </div> <div class=\"detail_con\"> <div class=\"keyword_wrap keyword_define\"> <div class=\"keyword_input\"> <span class=\"title\">关键词订阅</span> <input id=\"detail-keyword\" type=\"text\" class=\"ipt\" style=\"display:none\" /> <a id=\"detail-showInput\" data-trigger=\"showInput\" href=\"javascript:;\" class=\"keyword add_keyword\"><i class=\"icon icon_add\">+</i></a> <a id=\"detail-addKeyword\" data-trigger=\"addKeyword\" href=\"javascript:;\" class=\"keyword add_keyword\" style=\"display:none\"><span class=\"txt\">确定</span></a> <a id=\"detail-shouwEdit\" data-trigger=\"shouwEdit\" href=\"javascript:;\" class=\"keyword add_keyword\" ';
            if (!hotTerm.CustomList.length) {
                $out += 'style=\"display:none\"';
            }
            $out += '><span class=\"txt\">编辑</span></a> </div> <div id=\"detail-keyword-my\"> ';
            $each(hotTerm.CustomList, function ($value, $index) {
                $out += ' <span class=\"keyword\"> <a href=\"#!/tag/';
                $out += $escapeHTML($getValue(id));
                $out += '/';
                $out += $escapeHTML($getValue($value.Word));
                $out += '\"><span class=\"txt\">';
                $out += $escapeHTML($getValue($value.Word));
                $out += '</span><span class=\"num\"><strong>';
                $out += $escapeHTML($getValue($value.Count));
                $out += '</strong>条</span></a> <a data-trigger=\"removeKeyword\" data-keyword=\"';
                $out += $escapeHTML($getValue($value.Word));
                $out += '\" href=\"javascript:;\" class=\"del\" style=\"display:none\">x</a> ';
                if ($value.IsNew) {
                    $out += ' <span class=\"flag flag_n\">n</span> ';
                }
                $out += ' </span> ';
            });
            $out += ' </div> </div> <div class=\"keyword_wrap\"> ';
            $each(hotTerm.TopList, function ($value, $index) {
                $out += ' <span class=\"keyword\"><a href=\"#!/tag/';
                $out += $escapeHTML($getValue(id));
                $out += '/';
                $out += $escapeHTML($getValue($value.Word));
                $out += '\"><span class=\"txt\">';
                $out += $escapeHTML($getValue($value.Word));
                $out += '</span><span class=\"num\"><strong>';
                $out += $escapeHTML($getValue($value.Count));
                $out += '</strong>条</span></a>';
                if ($value.IsNew) {
                    $out += '<span class=\"flag flag_n\">n</span>';
                }
                $out += '</span> ';
            });
            $out += ' </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});