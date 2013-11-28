define(function (require, exports, module) {
    var dependencies = {
        "tmpl-home-project": require("tmpl-home-project")
    };
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
    helpers.$render = function (id, data) {
        return dependencies[id](data);
    };
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                _isValueSwitch = $data._isValueSwitch,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                _rangeTypeText = $data._rangeTypeText,
                _sortType = $data._sortType,
                $each = $helpers.$each,
                productList = $data.productList,
                $value = $data.$value,
                $index = $data.$index,
                include = function (id, data) {
                    if (data === undefined) {
                        data = $data
                    }
                    var content = $helpers.$render(id, data);
                    if (content !== undefined) {
                        $out += content;
                        return content
                    }
                },
                $out = '';
            $out += '<div id=\"page-home\" class=\"wrap ';
            if (_isValueSwitch) {
                $out += 'project_value_switch';
            }
            $out += '\"> <div class=\"time_bar\" style=\"visibility:hidden\"></div> <div class=\"time_bar\" style=\"position:fixed;\"><i class=\"icon icon_clock\"></i>近一';
            $out += $escapeHTML($getValue(_rangeTypeText));
            $out += '内数据 <span class=\"time_bar_desc_2\">竞品</span><span class=\"time_bar_desc\"><b class=\"a\">';
            $out += $escapeHTML($getValue(['产品热度', '口碑指数'][_sortType - 1]));
            $out += '</b><b class=\"b\">';
            $out += $escapeHTML($getValue(['口碑指数', '产品热度'][_sortType - 1]));
            $out += '</b><i class=\"icon icon_rank\"></i></span></div> <div id=\"home-main\" class=\"main\"> <div class=\"project_list\"> ';
            $each(productList, function ($value, $index) {
                $out += ' <a class=\"mod_project\" href=\"#!/detail/';
                $out += $escapeHTML($getValue($value.ProductUniqueId));
                $out += '/';
                $out += $escapeHTML($getValue($value.ProductUniqueName));
                $out += '\" data-id=\"';
                $out += $escapeHTML($getValue($value.ProductUniqueId));
                $out += '\" id=\"';
                $out += $escapeHTML($getValue($value.ProductUniqueId));
                $out += '\"> ';
                include('tmpl-home-project', $value);
                $out += ' </a> ';
            });
            $out += ' </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});