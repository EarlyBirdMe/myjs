/**
 * 对浏览器的动画帧（requestAnimationFrame）接口进行封装，兼容各浏览器版本，模拟setTimeout接口
 * 默认帧频为60fps，即1000/60 ms
 *
 */
(function(){
    window.requestAnimationFrame = (function(){
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
                window.setTimeout(callback, 1000/60, true);
            };
    })();
    /**
     * 清除动画帧（requestAnimationFrame）接口，清除timeout
     * @param {Object} handle 动画帧句柄
     *
     */
    window.clearRequestTimeout = function(handle){
        window.cancelAnimationFrame? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame? window.webkitCancelRequestAnimationFrame(handle.value) :
                window.mozCancelRequestAnimationFrame? window.mozCancelRequestAnimationFrame(handle.value) :
                    window.oCancelRequestAnimationFrame? window.oCancelRequestAnimationFrame(handle.value) :
                        window.msCancelRequestAnimationFrame? window.msCancelRequestAnimationFrame(handle.value) :
                            window.clearTimeout(handle);
    };
    /**
     * 实现任意帧频的动画帧接口，设置timeout
     *
     */
    window.requestTimeout = function(cb, delay){
        if(!window.requestAnimationFrame &&
            !window.webkitRequestAnimationFrame &&
            !window.mozRequestAnimationFrame &&
            !window.oRequestAnimationFrame &&
            !window.msRequestAnimationFrame) {
            return window.setTimeout(cb, delay, true);
        }

        var start = (new Date()).getTime(),
            handle = new Object();

        function loop(){
            var current = (new Date()).getTime(),
                delta = current - start;

            delta >= delay ? cb.call() : handle.value = window.requestAnimationFrame(loop);
        };

        handle.value = window.requestAnimationFrame(loop);
        return handle;
    };
})();