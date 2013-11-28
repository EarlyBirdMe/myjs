/**
 * FileOverview  文字轮播  http://www.wanggou.com/
 * Author zjc
 * Version 1.0
 * Date: 13-8-24
 * Time: 下午5:13
 */

(function() { //右侧挂件 以及回到顶部按钮动作
    if ((typeof $isBrowser != 'function') || (typeof $getPageScrollHeight != 'function'))
        return;
    var totop = $id('wgGoToTop'), suggest = $id('wg_suggest'), floating = $id('wgfloating'), isie6 = $isBrowser('ie6'), wh = $getWindowHeight ? $getWindowHeight() - 55 : 590;

    var h = 0;
    setInterval(function() {
        var _h = $getPageScrollHeight();
        if (h == _h)
            return;
        else
            h = _h;

        totop.style.bottom = h > 300 ? '15px' : '-55px';

        if (isie6) {
            if (floating)
                floating.style.top = h + 300 + "px";

            suggest.style.top = h + wh - 41 + "px";
            totop.style.top = h + wh + "px";
            totop.style.display = h > 300 ? '' : 'none';
        }
    }, 300);

})();

//多行文本溢出显示省略号(...)的方法
$(".figcaption").each(function(i){
    var divH = $(this).height();
    var $p = $("p", $(this)).eq(0);
    while ($p.outerHeight() > divH) {
        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    };
});


function bind(scope, fn /*, variadic args to curry */) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        return fn.apply(scope, args.concat(toArray(arguments)));
    };
}
// 来自 Prototype.js 的 [`.bind`](http://www.prototypejs.org/api/function/bind) 方法
Function.prototype.bind = function(){
    var fn = this,
        args = Array.prototype.slice.call(arguments),
        object = args.shift();
    return function(){
        return fn.apply(object,
            args.concat(Array.prototype.slice.call(arguments)));
    };
};

__bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};
