define(function (require, exports, module) {
    var dependencies = {
        "tmpl-detail-report": require("tmpl-detail-report"),
        "tmpl-detail-reputation": require("tmpl-detail-reputation"),
        "tmpl-detail-focus": require("tmpl-detail-focus"),
        "tmpl-detail-hotTerm": require("tmpl-detail-hotTerm"),
        "tmpl-detail-weibo": require("tmpl-detail-weibo")
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

        }
    };
    helpers.$render = function (id, data) {
        return dependencies[id](data);
    };
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $escapeHTML = $helpers.$escapeHTML,
                $getValue = $helpers.$getValue,
                id = $data.id,
                _period = $data._period,
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
            $out += '<div id=\"page-detail\" data-id=\"';
            $out += $escapeHTML($getValue(id));
            $out += '\" class=\"wrap\"> <div class=\"time_bar\" style=\"visibility:hidden\"></div> <div class=\"time_bar\" style=\"position:fixed\"><i class=\"icon icon_clock\"></i>';
            $out += $escapeHTML($getValue(_period));
            $out += '</div> <div class=\"main\" style=\"background:#FFF\"> <div class=\"mod_compare\"> ';
            include('tmpl-detail-report');
            $out += ' ';
            include('tmpl-detail-reputation');
            $out += ' ';
            include('tmpl-detail-focus');
            $out += ' ';
            include('tmpl-detail-hotTerm');
            $out += ' ';
            include('tmpl-detail-weibo');
            $out += ' </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});