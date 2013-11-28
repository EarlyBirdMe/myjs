define(function (require, exports, module) {
    var dependencies = {
        "tmpl-tag-list": require("tmpl-tag-list")
    };
    var helpers = {};
    helpers.$render = function (id, data) {
        return dependencies[id](data);
    };
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
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
                HasNext = $data.HasNext,
                $out = '';
            $out += '<div id=\"page-tag\" class=\"wrap\"> <div class=\"main\"> <div class=\"keyword_tab_wrap\"> <div id=\"tag-tab\" class=\"keyword_tab tab_1\"> <a href=\"javascript:;\" data-trigger=\"sort\" data-type=\"1\"><i class=\"icon_gray_clock\"></i>按时间</a> <a href=\"javascript:;\" data-trigger=\"sort\" data-type=\"2\"><i class=\"icon_hot\"></i>按热度</a> <a href=\"javascript:;\" data-trigger=\"sort\" data-type=\"3\"><i class=\"icon_audience\"></i>按听众数</a> <i class=\"tab_bg\"></i> </div> </div> <div id=\"weibo-list\" class=\"weibo_list\"> ';
            include('tmpl-tag-list');
            $out += ' </div> <a id=\"weibo-more\" data-trigger=\"more\" href=\"javascript:;\" class=\"click_more\" ';
            if (HasNext) {
                $out += 'disabled';
            }
            $out += '>点击更多</a> </div> </div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});