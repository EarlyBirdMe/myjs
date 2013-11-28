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
                ProductUniqueId = $data.ProductUniqueId,
                ProductUniqueName = $data.ProductUniqueName,
                RepuIndexDiffrence = $data.RepuIndexDiffrence,
                TotalCount = $data.TotalCount,
                ReputationIndex = $data.ReputationIndex,
                iCompRepuIndex = $data.iCompRepuIndex,
                iComRepuIndexDiffrence = $data.iComRepuIndexDiffrence,
                _warnClass = $data._warnClass,
                _length = $data._length,
                _thisValue = $data._thisValue,
                Math = $data.Math,
                _warnClass2 = $data._warnClass2,
                _length2 = $data._length2,
                _thisValue2 = $data._thisValue2,
                $out = '';
            $out += '<div class=\"project_main\"> <div class=\"project_logo\"> <img src=\"img/products/';
            $out += $escapeHTML($getValue(ProductUniqueId));
            $out += '.png\" onerror=\"this.onerror=null;this.src=\'./img/products/default.png\'\" alt=\"';
            $out += $escapeHTML($getValue(ProductUniqueName));
            $out += '\" /> ';
            if (RepuIndexDiffrence < -30 && TotalCount > 30 || ReputationIndex < iCompRepuIndex || iComRepuIndexDiffrence > 30 || ReputationIndex < 28) {
                $out += ' <i class=\"flag_warning\">!</i> ';
            }
            $out += ' <i class=\"flag_success\">√</i> </div> <div class=\"project_name\"> <h3>';
            $out += $escapeHTML($getValue(ProductUniqueName));
            $out += '</h3> </div> ';
            if (RepuIndexDiffrence > 0) {
                $out += ' <span class=\"project_updown\"><i>↑</i></span> ';
            } else {
                $out += ' <span class=\"project_updown compare_down\"><i>↓</i></span> ';
            }
            $out += ' <div class=\"project_value\" data-trigger=\"switchValue\"> <div class=\"project_value_a ';
            $out += $escapeHTML($getValue(_warnClass));
            $out += '\"> ';
            if (_length < 4) {
                $out += ' ';
                $out += $escapeHTML($getValue(_thisValue));
                $out += ' ';
            } else if (_length < 7) {
                $out += ' ';
                $out += $escapeHTML($getValue(Math.round(_thisValue / 1000) + 'k'));
                $out += ' ';
            } else {
                $out += ' ';
                $out += $escapeHTML($getValue(Math.round(_thisValue / 10000) + 'w'));
                $out += ' ';
            }
            $out += ' </div> <div class=\"project_value_b ';
            $out += $escapeHTML($getValue(_warnClass2));
            $out += '\"> ';
            if (_length2 < 4) {
                $out += ' ';
                $out += $escapeHTML($getValue(_thisValue2));
                $out += ' ';
            } else if (_length2 < 7) {
                $out += ' ';
                $out += $escapeHTML($getValue(Math.round(_thisValue2 / 1000) + 'k'));
                $out += ' ';
            } else {
                $out += ' ';
                $out += $escapeHTML($getValue(Math.round(_thisValue2 / 10000) + 'w'));
                $out += ' ';
            }
            $out += ' </div> </div></div>';
            this.template = $out
        };
    Render.prototype = helpers;
    return function (data) {
        return (new Render(data)).template;
    };
});