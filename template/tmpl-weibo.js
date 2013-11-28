define(function (require, exports, module) {
    var dependencies = {
        "tmpl-weibo-list": require("tmpl-weibo-list")
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
            $out += '<div id=\"page-weibo\" class=\"wrap\"> <div class=\"main\"> <div id=\"weibo-list\" class=\"weibo_list\"> ';
            include('tmpl-weibo-list');
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