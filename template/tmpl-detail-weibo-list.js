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
                $each = $helpers.$each,
                RawDataList = $data.RawDataList,
                $value = $data.$value,
                $index = $data.$index,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                print = function (content) {
                    if (content !== undefined) {
                        $out += content;
                        return content
                    }
                },
                $out = '';
            $out += '';
            $each(RawDataList, function ($value, $index) {
                $out += '<div class=\"weibo_item\"> <div class=\"weibo_item_title\"> <h3 class=\"user_name\">';
                $out += $escapeHTML($getValue($value.Nick));
                $out += '</h3> ';
                if ($value.IsVip) {
                    $out += '<i class=\"icon icon_vip\"></i>';
                }
                $out += ' <span class=\"time\">';
                $out += $escapeHTML($getValue($value.ExtractDate));
                $out += '</span> </div> <div class=\"weibo_item_con\"> <p>';
                print($value.Text);
                $out += '</p> </div> <div class=\"weibo_item_ft\"> <span class=\"from\">来自 ';
                $out += $escapeHTML($getValue($value.From));
                $out += '</span> <span class=\"weibo_count\"><i class=\"icon_weibo\"></i>';
                $out += $escapeHTML($getValue($value.FansCnt));
                $out += '</span> </div></div>';
            });
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});