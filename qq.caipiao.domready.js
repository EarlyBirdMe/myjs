/**
 * @namespace DOM Ready
 * 兼容某些页面头部没有引用jquery
 * Source http://888.qq.com/
 * @function
 * @param {Function} fn
 * @example
 * DOMReady(fn)
 */
window.DOMReady = function() {
    var evt = [],
        isReady = false,
        guid = 1,
        randomKey = +new Date();
    /** @ignore 执行并销毁队列事件 */
    var fire = function() {
        if (!evt)
            return;
        for (var i = 0, len = evt.length; i < len; i++) {
            evt[i]();
        }
        evt = null;
    };
    /** @ignore IE DOMContentloaded */
    var doScrollCheck = function() {
        try {
            document.documentElement.doScroll('left');
            isReady = true;
        } catch (e) {
            setTimeout(doScrollCheck, 1);
            return;
        }
        isReady && fire();
    }
    var addEvent = function() {
        if (window.addEventListener) {
            return function(el, eventName, fn) {
                el.addEventListener(eventName, fn, false);
            };
        } else {
            return function(el, eventName, fn) {
                if (!fn.guid) {
                    fn.guid = randomKey + guid;
                    guid++;
                }
                el['e' + fn.guid] = fn;
                el[fn.guid] = function() {
                    el['e' + fn.guid](window.event);
                };
                el.attachEvent('on' + eventName, el[fn.guid]);
            };
        }
    }();
    document.addEventListener ? addEvent(document, 'DOMContentLoaded', fire) : doScrollCheck();
    addEvent(window, 'load', fire);
    return function(fn) {
        evt ? evt.push(fn) : fn();
    };
}();