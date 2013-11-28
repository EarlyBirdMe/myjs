window['PP.index.v2012.time'] && window['PP.index.v2012.time'].push(new Date());
function $addClass(ids, cName) {
    $setClass(ids, cName, "add");
};
function $addEvent(obj, type, handle) {
    if (!obj || !type || !handle) {
        return;
    }
    if (obj instanceof Array) {
        for (var i = 0, l = obj.length; i < l; i++) {
            $addEvent(obj[i], type, handle);
        }
        return;
    }
    if (type instanceof Array) {
        for (var i = 0, l = type.length; i < l; i++) {
            $addEvent(obj, type[i], handle);
        }
        return;
    }
    window.__allHandlers = window.__allHandlers || {};
    window.__Hcounter = window.__Hcounter || 1;
    function setHandler(obj, type, handler, wrapper) {
        obj.__hids = obj.__hids || [];
        var hid = 'h' + window.__Hcounter++;
        obj.__hids.push(hid);
        window.__allHandlers[hid] = {type: type, handler: handler, wrapper: wrapper}
    }

    function createDelegate(handle, context) {
        return function () {
            return handle.apply(context, arguments);
        };
    }

    if (window.addEventListener) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.addEventListener(type, wrapper, false);
    }
    else if (window.attachEvent) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.attachEvent("on" + type, wrapper);
    }
    else {
        obj["on" + type] = handle;
    }
};
function $addToken(url, type) {
    var token = $getToken();
    if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
        return url;
    }
    if (url.indexOf("#") != -1) {
        var f1 = url.match(/\?.+\#/);
        if (f1) {
            var t = f1[0].split("#"), newPara = [t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
            return url.replace(f1[0], newPara);
        } else {
            var t = url.split("#");
            return[t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
        }
    }
    return token == "" ? (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type) : (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type);
};
function $addZero(v, size) {
    for (var i = 0, len = size - (v + "").length; i < len; i++) {
        v = "0" + v;
    }
    ;
    return v + "";
};
function $aioSubscibe() {
    if ($isLogin()) {
        var uin = $getUin();
        if (uin != "") {
            $loadScript("http://party.paipai.com/cgi-bin/aiopopwindow_query?uin=" + uin);
            window["do_aiopopwindow_query"] = function (d) {
                if (d.ret == 0) {
                    var img = document.createElement("img");
                    img.src = "http://static.paipaiimg.com/news_v2/aio/aio_float.png";
                    var float = $float({id: "aiofloat", closeId: "aioFloatClose", html: '<div class="float_aio"><div class="inner"><p class="sub_num">4000万拍友的共同选择，快来订阅吧！</p><div class="aio_des"><p class="question" id="aioQuestion"><a href="javascript:void(0);">什么是每日精选？</a></p><p class="answer" id="aioAnswerTip" style="display:none">聚合了丰富信息的综合购物入口，每天随QQ弹出，为您提供全面的购物服务</p><a href="javascript:void(0);" id="aioTipClose" class="close2"></a></div><div class="btn_sub" id="aioSubscibe"><a href="javascript:void(0);"></a><span id="aioSucceedTip" style="display:none">已订阅成功<b></b></span></div><a href="javascript:void(0);" id="aioFloatClose" class="close1"></a><div style="position:relative"><div style="position:absolute;right:123px;*right:130px;"><input id="addweibo_check" type="checkbox" checked  style="margin-top:2px"/>收听"腾讯微卖场"认证微博</div></div></div></div>', fix: true, style: "none", cover: true, width: 613, height: 418, cssUrl: "http://static.paipaiimg.com/news_v2/aio/aiofloat.css", onInit: function () {
                        $addEvent($id("aioQuestion"), "mouseover", function (event) {
                            $id("aioAnswerTip").style.display = "";
                        });
                        $addEvent($id("aioTipClose"), "click", function (event) {
                            $id("aioAnswerTip").style.display = "none";
                        });
                        $addEvent($id("aioSubscibe"), "click", function (event) {
                            $loadScript("http://service.paipai.com/cgi-bin/shoppingguide_modify?option=1&callback=aioSubscibeCallback&aioSrc=1&t=" + Math.random());
                            makeReport("http://service.paipai.com/cgi-bin/ad_exposure_rate", "1076.8.2");
                            if ($id("addweibo_check").checked) {
                                $loadScript("http://tshop.qq.com/addWeiboFriend.xhtml?uin=weimaichang&callback=addWeiboFriendFun&t=" + Math.random());
                            }
                            window["aioSubscibeCallback"] = function (d) {
                                if (d.i_ret == 0) {
                                    $id("aioSucceedTip").style.display = "";
                                }
                            }
                        });
                        makeReport("http://service.paipai.com/cgi-bin/ad_exposure_rate", "1076.8.1");
                    }, onClose: function () {
                        makeReport("http://service.paipai.com/cgi-bin/ad_exposure_rate", "1076.8.3");
                        return true;
                    }});
                }
            }
        } else {
            return;
        }
    } else {
        return;
    }
    function makeReport(url, rd) {
        scriptElem = document.createElement("script");
        scriptElem.src = url + "?ptag=" + rd + "&t=" + Math.random();
        document.getElementsByTagName("head")[0].appendChild(scriptElem);
    }
};
var $ajax = (function (window, undefined) {
    var oXHRCallbacks, xhrCounter = 0;
    var fXHRAbortOnUnload = window.ActiveXObject ? function () {
        for (var key in oXHRCallbacks) {
            oXHRCallbacks[key](0, 1);
        }
    } : false;
    return function (opt) {
        var o = {url: '', method: 'GET', data: null, type: "text", async: true, cache: false, timeout: 0, autoToken: true, username: '', password: '', beforeSend: $empty(), onSuccess: $empty(), onError: $empty(), onComplete: $empty()};
        for (var key in opt) {
            o[key] = opt[key]
        }
        var callback, timeoutTimer, xhrCallbackHandle, ajaxLocation, ajaxLocParts;
        try {
            ajaxLocation = location.href;
        }
        catch (e) {
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            ajaxLocation = ajaxLocation.href;
        }
        ajaxLocParts = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/.exec(ajaxLocation.toLowerCase()) || [];
        o.isLocal = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ajaxLocParts[1]);
        o.method = (typeof(o.method) != "string" || o.method.toUpperCase() != "POST") ? "GET" : "POST";
        o.data = (typeof o.data == "string") ? o.data : $makeUrl(o.data);
        if (o.method == 'GET' && o.data) {
            o.url += (o.url.indexOf("?") < 0 ? "?" : "&") + o.data;
        }
        if (o.autoToken) {
            o.url = $addToken(o.url, "ajax");
        }
        o.xhr = $xhrMaker();
        if (o.xhr === null) {
            return false;
        }
        try {
            if (o.username) {
                o.xhr.open(o.method, o.url, o.async, o.username, o.password);
            }
            else {
                o.xhr.open(o.method, o.url, o.async);
            }
        }
        catch (e) {
            o.onError(-2, e);
            return false;
        }
        if (o.method == 'POST') {
            o.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        if (!o.cache) {
            o.xhr.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT');
            o.xhr.setRequestHeader('Cache-Control', 'no-cache');
        }
        o.beforeSend(o.xhr);
        if (o.async && o.timeout > 0) {
            if (o.xhr.timeout === undefined) {
                timeoutTimer = setTimeout(function () {
                    if (o.xhr && callback) {
                        callback(0, 1);
                    }
                    o.onError(0, null, 'timeout');
                }, o.timeout);
            }
            else {
                o.xhr.timeout = o.timeout;
                o.xhr.ontimeout = function () {
                    if (o.xhr && callback) {
                        callback(0, 1);
                    }
                    o.onError(0, null, 'timeout');
                };
            }
        }
        o.xhr.send(o.method == 'POST' ? o.data : null);
        callback = function (e, isAbort) {
            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
                timeoutTimer = undefined;
            }
            if (callback && (isAbort || o.xhr.readyState === 4)) {
                callback = undefined;
                if (xhrCallbackHandle) {
                    o.xhr.onreadystatechange = $empty();
                    if (fXHRAbortOnUnload) {
                        try {
                            delete oXHRCallbacks[xhrCallbackHandle];
                        }
                        catch (e) {
                        }
                    }
                }
                if (isAbort) {
                    if (o.xhr.readyState !== 4) {
                        o.xhr.abort();
                    }
                }
                else {
                    var status, statusText, responses;
                    responses = {headers: o.xhr.getAllResponseHeaders()};
                    status = o.xhr.status;
                    try {
                        statusText = o.xhr.statusText;
                    }
                    catch (e) {
                        statusText = "";
                    }
                    try {
                        responses.text = o.xhr.responseText;
                    }
                    catch (e) {
                        responses.text = "";
                    }
                    if (!status && o.isLocal) {
                        status = responses.text ? 200 : 404;
                    }
                    else if (status === 1223) {
                        status = 204;
                    }
                    if (status >= 200 && status < 300) {
                        responses.text = responses.text.replace(/<!--\[if !IE\]>[\w\|]+<!\[endif\]-->/g, '');
                        switch (o.type) {
                            case'text':
                                o.onSuccess(responses.text);
                                break;
                            case"json":
                                var json;
                                try {
                                    json = (new Function("return (" + responses.text + ")"))();
                                }
                                catch (e) {
                                    o.onError(status, e, responses.text);
                                }
                                if (json) {
                                    o.onSuccess(json);
                                }
                                break;
                            case"xml":
                                o.onSuccess(o.xhr.responseXML);
                                break;
                        }
                    }
                    else {
                        if (status === 0 && o.timeout > 0) {
                            o.onError(status, null, 'timeout');
                        }
                        else {
                            o.onError(status, null, statusText);
                        }
                    }
                    o.onComplete(status, statusText, responses);
                }
                delete o.xhr;
            }
        };
        if (!o.async) {
            callback();
        }
        else if (o.xhr.readyState === 4) {
            setTimeout(callback, 0);
        }
        else {
            xhrCallbackHandle = ++xhrCounter;
            if (fXHRAbortOnUnload) {
                if (!oXHRCallbacks) {
                    oXHRCallbacks = {};
                    if (window.attachEvent) {
                        window.attachEvent("onunload", fXHRAbortOnUnload);
                    }
                    else {
                        window["onunload"] = fXHRAbortOnUnload;
                    }
                }
                oXHRCallbacks[xhrCallbackHandle] = callback;
            }
            o.xhr.onreadystatechange = callback;
        }
    };
})(window, undefined);
(function () {
    var queue = [], timer = null, IE = $isBrowser("ie");
    var rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, ropacity = /opacity=([^)]*)/i, opacityReg = /opacity/i, colorReg = /color/i, padMar = /^(padding|margin)$/i, borderReg = /^border$/i
    cssNumber = {"fillOpacity": true, "fontWeight": true, "lineHeight": true, "opacity": true, "orphans": true, "widows": true, "zIndex": true, "zoom": true};
    var eases = {liner: function (t, b, c, d) {
        return c * t / d + b;
    }, easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    }, easeOut: function (t, b, c, d) {
        return-c * (t /= d) * (t - 2) + b;
    }, easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return-c / 2 * ((--t) * (t - 2) - 1) + b;
    }, easeInStrong: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    }, easeOutStrong: function (t, b, c, d) {
        return-c * ((t = t / d - 1) * t * t * t - 1) + b;
    }, easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return-c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }, elasticIn: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }, elasticOut: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }, elasticBoth: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return-0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }, backIn: function (t, b, c, d, s) {
        if (s === undefined) {
            s = 1.70158;
        }
        if (t === d) {
            t -= 0.001;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }, backOut: function (t, b, c, d, s) {
        if (typeof s === 'undefined') {
            s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }, backBoth: function (t, b, c, d, s) {
        if (typeof s === 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }, bounceIn: function (t, b, c, d) {
        return c - eases.bounceOut(d - t, 0, c, d) + b;
    }, bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }, bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return eases.bounceIn(t * 2, 0, c, d) * 0.5 + b;
        }
        return eases.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }}

    function camelCase(str) {
        return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function (all, letter) {
            return(letter + "").toUpperCase();
        })
    }

    var Fx = function (ele, prop, option) {
        this.opt = {speed: 1000, ease: "liner", onInit: null, onStart: null, onComplete: null, initStart: true};
        this.ele = $id(ele);
        this.prop = prop;
        this.option = option;
        for (var o in option) {
            this.opt[o] = option[o];
        }
        this.ease = ('function' == typeof this.opt.ease) ? this.opt.ease : eases[this.opt.ease] || eases["liner"];
    }
    var Anim = function () {
        this.init.apply(this, arguments);
    };
    Anim.prototype.init = function (ele, prop, option) {
        this.fxs = [];
        this.pFxs = [];
        this.rFxs = [];
        this.curPart = 0;
        if (prop) {
            this.fxs.push(new Fx(ele, prop, option));
        }
        this.isEnd = false;
        return this.runFx();
    };
    Anim.prototype.runFx = function (fxp) {
        var fx = fxp, pushInPfx = true;
        if (!fx) {
            fx = this.fxs.shift();
            var nextFx = this.fxs[0];
            if (fx === "prev") {
                if (this.pFxs.length == 0)return false;
                this.curPart--;
                fx = this.pFxs.pop();
                this.rFxs.push(fx);
                this.prop = fx._prop;
                pushInPfx = false;
            } else if (fx === "next") {
                if (this.rFxs.length == 0)return false;
                this.curPart++;
                fx = this.rFxs.pop();
                this.pFxs.push(fx);
                this.prop = fx.prop;
                pushInPfx = false;
            }
        }
        if (pushInPfx) {
            while (this.rFxs.length > 0) {
                this.pFxs.push(this.rFxs.pop());
            }
            this.curPart++;
            this.pFxs.push(fx);
            this.prop = fx.prop;
        }
        this.fx = fx;
        this.opt = fx.opt;
        this.ease = fx.ease;
        this.ele = fx.ele;
        this.curframe = 1;
        this.frames = Math.ceil((this.opt.speed / 1000) * 35);
        this.initProp();
        this.opt.onInit && this.opt.onInit.call(this);
        if (this.opt.initStart) {
            this.overflow && (this.ele.style.overflow = "hidden");
            this.start();
            return true;
        } else return false;
    }
    Anim.prototype.initProp = function () {
        this.camelProp();
        this.oriAtt = {};
        this.units = {};
        var val, parts, csparts, num, elem = this.ele;
        for (var name in this.prop) {
            var cs = $curStyle(elem, name);
            if (name.match(colorReg)) {
                if (name == "borderColor") {
                    cs = $curStyle(elem, "borderLeftColor");
                }
                this.oriAtt[name] = convertColor(cs);
                this.prop[name] = convertColor(this.prop[name]);
            } else {
                csparts = rfxnum.exec(cs);
                if (csparts && csparts[2]) {
                    cs = parseFloat(csparts[2]);
                }
                if (name.match(opacityReg)) {
                    if (IE) {
                        cs = ropacity.test((elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) : 1;
                    } else {
                        cs != 0 && !cs && (cs = 1);
                    }
                }
                cs = cs != 0 && !cs ? 0 : cs === "auto" ? 0 : cs;
                this.oriAtt[name] = cs;
                val = this.prop[name];
                parts = rfxnum.exec(val);
                if (parts) {
                    num = parseFloat(parts[2]);
                    this.units[name] = parts[3] || (cssNumber[name] ? "" : "px");
                    if (parts[1]) {
                        num = (parts[1] === "-=" ? -num : num) + cs;
                    }
                    this.prop[name] = num;
                }
            }
        }
        this.fx._prop = $extend(this.oriAtt);
    };
    Anim.prototype.camelProp = function () {
        var elem = this.ele;
        for (var p in this.prop) {
            name = camelCase(p);
            if (name.match(padMar)) {
                var that = this;
                $each(["Top", "Right", "Bottom", "Left"], function (fn) {
                    that.prop[name + fn] = that.prop[p];
                });
                delete this.prop[p];
                continue;
            }
            if (name.match(borderReg)) {
                this.prop[name + "Width"] = this.prop[p];
                delete this.prop[p];
                continue;
            }
            if (p !== name) {
                this.prop[name] = this.prop[p];
                delete this.prop[p];
            }
            if (name === "height" || name === "width") {
                var dplay = $curStyle(elem, "display"), flo = $curStyle(elem, "float");
                if (dplay === "inline" && (!flo || flo === "none")) {
                    elem.style.display = "inline-block";
                }
                if (!this.overflow) {
                    this.overflow = [elem.style.overflow, elem.style.overflowX, elem.style.overflowY];
                }
            }
        }
    };
    Anim.prototype.start = function () {
        !this.opt.initStart && (this.opt.initStart = true);
        if (this.isEnd)return;
        this.isStop = false;
        var exist = false;
        for (var i = 0; i < queue.length; ++i) {
            if (queue[i] === this) {
                exist = true;
                break;
            }
        }
        !exist && queue.push(this);
        this.opt.onStart && this.opt.onStart.call(this);
        if (!timer) {
            timer = window.setTimeout(execAnims, 13);
        }
    };
    Anim.prototype.stop = function (end) {
        this.isStop = true;
        this.isEnd = !!end;
    };
    Anim.prototype.step = function () {
        if (this.curframe > this.frames) {
            if (this.fxs.length > 0) {
                this.opt.onComplete && this.opt.onComplete.call(this);
                return this.runFx();
            } else {
                this.isEnd = true;
                var overflows = this.overflow;
                if (overflows) {
                    var elem = this.ele;
                    $each(["", "X", "Y"], function (jn, i) {
                        elem.style["overflow" + jn] = overflows[i];
                    });
                }
                this.opt.onComplete && this.opt.onComplete.call(this);
                return false;
            }
        }
        var prop = this.prop, fn;
        for (var p in prop) {
            fn = this.attFns[p] || this.attFns["defFn"];
            fn.call(this, p);
        }
        this.curframe++;
        return true;
    };
    Anim.prototype.next = function (prop, option) {
        if (prop) {
            this.fxs.push(new Fx(this.ele, prop, option));
        } else {
            this.fxs.push("next");
        }
        return this;
    };
    Anim.prototype.nextAll = function () {
        var temp = [], len = this.fxs.length;
        for (var i = 0; i < len; ++i) {
            var fx = this.fxs[i];
            if (fx === "prev") {
                temp.push("next");
            }
        }
        ;
        this.fxs = this.fxs.concat(temp);
        return this;
    };
    Anim.prototype.prev = function () {
        this.fxs.push("prev");
        return this;
    };
    Anim.prototype.prevAll = function () {
        var temp = ["prev"], len = this.fxs.length;
        for (var i = 0; i < len; ++i) {
            var fx = this.fxs[i];
            if (fx instanceof Fx || fx === "next") {
                temp.push("prev");
            } else if (fx === "prev") {
                temp.pop();
            }
        }
        ;
        this.fxs = this.fxs.concat(temp);
        return this;
    };
    Anim.prototype.execEase = function (from, to) {
        var args = [this.curframe, from, to - from, this.frames];
        return this.ease.apply(this, args);
    };
    Anim.prototype.attFns = {opacity: function (p) {
        var style = this.ele.style, res = this.isEnd ? this.prop[p] : this.execEase(this.oriAtt[p], this.prop[p]);
        if (IE) {
            style['filter'] = 'alpha(opacity=' + Math.round(res * 100) + ')';
        } else {
            style[p] = res;
        }
    }, defFn: function (p) {
        var res = this.isEnd ? this.prop[p] : this.execEase(this.oriAtt[p], this.prop[p]);
        this.ele.style[p] = res + this.units[p];
    }}
    $each(["width", "height", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom"], function (jn) {
        Anim.prototype.attFns[jn] = function (p) {
            var res = this.isEnd ? this.prop[p] : this.execEase(this.oriAtt[p], this.prop[p]);
            this.ele.style[p] = Math.max(0, res) + this.units[p];
        };
    });
    $each(["color", "backgroundColor", "borderColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor"], function (jn) {
        Anim.prototype.attFns[jn] = function (p) {
            var res = "", ori = this.oriAtt[p], pro = this.prop[p];
            if (this.isEnd) {
                res = "rgb(" + pro.join(",") + ")";
            } else {
                var r = Math.round(this.execEase(ori[0], pro[0]));
                var g = Math.round(this.execEase(ori[1], pro[1]));
                var b = Math.round(this.execEase(ori[2], pro[2]));
                res = "rgb(" + r + "," + g + "," + b + ")";
            }
            this.ele.style[p] = res;
        };
    });
    function convertColor(color) {
        var cS = color.split('#');
        if (cS[1]) {
            cS = cS[1].split('');
            cS = cS.length < 6 ? (cS[0] + cS[0] + cS[1] + cS[1] + cS[2] + cS[2]).split('') : cS;
            return[parseInt(cS[0] + cS[1], 16), parseInt(cS[2] + cS[3], 16), parseInt(cS[4] + cS[5], 16)];
        } else {
            var rgbs = /rgb\((.*)\)/.exec(cS[0])[1].replace(/\s*/g, '').split(',');
            return[parseInt(rgbs[0], 10), parseInt(rgbs[1], 10), parseInt(rgbs[2], 10)]
        }
    };
    function execAnims() {
        for (var i = 0; i < queue.length; ++i) {
            var anim = queue[i];
            if ((!anim.step() || anim.isStop) && queue[i] === anim) {
                queue.splice(i--, 1);
            }
        }
        if (queue.length > 0) {
            timer = window.setTimeout(arguments.callee, 13);
        } else {
            timer = null;
        }
    }

    window.$animation = function (ele, prop, option) {
        return new Anim(ele, prop, option);
    }
})();
function $biFocusAd(opt) {
    var option = {dataList: [], idList: [], staticFileUrl: "", templateType: "json", templateIdList: null, contentList: [], pageSize: 0, pcs: "", serverTime: null, delay: 0, onInit: $empty(), onSuccess: $empty(), onEach: $empty(), onRender: null, timeout: 3000, beginTime: "", endTime: "", byCgi: g_biFocusAd_byCgi && p_biFocusAd_byCgi};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var thisFunc = arguments.callee;
    var cgiCallback = getCgiCallback();
    var stateObj = new Array(option.idList.length);
    var isTimeout = false;
    init();
    if (option.dataList.length > 0) {
        processData();
    } else {
        var now = option.serverTime ? option.serverTime : $getServerTime();
        if (!option.byCgi || ((option.endTime && now > new Date(option.endTime)) || (option.beginTime && now < new Date(option.beginTime)))) {
            loadStaticData();
        } else {
            loadCgiData();
            startTimer();
        }
    }
    function init() {
        if (option.contentList.length > 0) {
            for (var i = 0, j = option.contentList.length; i < j; i++) {
                var list = option.contentList[i];
                for (var m = 0, n = list.length; m < n; m++) {
                    list[m] = $id(list[m]);
                }
            }
        }
        for (var i = 0, j = stateObj.length; i < j; i++) {
            stateObj[i] = [];
        }
        if (!!option.pcs) {
            option.pageSize = {};
            var pcs = option.pcs.split(",");
            for (var i = 0, j = pcs.length; i < j; i++) {
                var arr = pcs[i].split(":");
                option.pageSize[arr[0]] = arr[1];
            }
        }
    }

    function loadCgiData() {
        var url = "http://express.paipai.com/tws/focus/focus_show_direction?" + $buildParam({gids: option.idList.join("|"), url: encodeURIComponent(location.href), urlref: document.referrer ? encodeURIComponent(document.referrer) : "", pc: typeof option.pageSize == "object" ? "" : option.pageSize, pcs: option.pcs, callback: cgiCallback, debug_uin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        setTimeout(function () {
            $loadScript(url)
        }, option.delay);
        window[cgiCallback] = function (json) {
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.list;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        return"biFocusAd" + thisFunc.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
                isTimeout = true;
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.list;
            processData();
        };
        window[cgiCallback] = $empty();
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        var isComplete = IsDataComplete();
        if (option.staticFileUrl && !hasReqStaticFile && !isComplete) {
            loadStaticData();
        }
        if (!option.staticFileUrl || hasReqStaticFile || isComplete) {
            option.onSuccess();
        }
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var locations = option.dataList[i].locations;
            var groupId = option.dataList[i].groupid;
            var groupIndex = $inArray(groupId * 1, option.idList);
            if (groupIndex == -1 || locations.length == 0) {
                continue;
            }
            for (var m = 0, n = locations.length; m < n; m++) {
                if (stateObj[groupIndex][m]) {
                    continue;
                }
                var locationId = locations[m].locationid;
                var plans = locations[m].plans;
                if (!!option.pcs && !option.pageSize[locationId]) {
                    continue;
                }
                if (plans.length == 0) {
                    stateObj[groupIndex][m] = false;
                    continue;
                }
                var pageSize = 0;
                if (typeof option.pageSize == "number") {
                    pageSize = option.pageSize;
                } else {
                    pageSize = option.pageSize[locationId];
                }
                if (pageSize == 0) {
                    continue;
                }
                if (plans.length > pageSize) {
                    if (isTimeout) {
                        plans = plans.slice(0, pageSize);
                    } else {
                        plans = $randomSubArray(plans, pageSize);
                    }
                }
                option.onEach(plans, groupId, locationId, groupIndex, m);
                if (option.templateIdList) {
                    var templateId = "";
                    if (typeof option.templateIdList == "string") {
                        templateId = option.templateIdList;
                    } else if ((option.templateIdList instanceof Array) && typeof option.templateIdList[0] == "string") {
                        templateId = option.templateIdList[groupIndex];
                    } else {
                        templateId = option.templateIdList[groupIndex][m];
                    }
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, plans);
                    }
                    else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var k = 0; k < plans.length; k++) {
                            tmp.push($jsonToTpl(plans[k], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    $setHtml(option.contentList.length ? option.contentList[groupIndex][m] : $id('f' + locationId), html);
                } else if (option.onRender) {
                    option.onRender(plans, groupId, locationId, groupIndex, m);
                }
                ;
                stateObj[groupIndex][m] = true;
            }
        }
    };
    function IsDataComplete() {
        if (hasReqStaticFile) {
            return true;
        } else {
            for (var i = 0, j = stateObj.length; i < j; i++) {
                if (stateObj[i].length == 0) {
                    return false;
                }
                for (var m = 0, n = stateObj[i].length; m < n; m++) {
                    if (!stateObj[i][m]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
$break = window["$break"] || function (t) {
    return t === window["$break"];
};
function $buildParam(opt) {
    var arr = [];
    for (var o in opt) {
        o && (arr.push(o + "=" + opt[o]));
    }
    return arr.join("&");
};
function $child(node, val, fn, filter) {
    var results = [], filter = filter || $empty();
    if (!node)return results;
    walk(node.firstChild, function (n) {
        if (!n) {
            return;
        }
        var actual = n.nodeType === 1 && n.nodeName.toLowerCase();
        if (typeof actual === 'string' && (actual === val || typeof val !== 'string') && filter(n)) {
            results.push(n);
            fn && fn(n, results.length - 1);
        }
    });
    return results;
    function walk(n, func) {
        func(n);
        while (n && (n = n.nextSibling)) {
            func(n, func);
        }
    }
};
function $countRd(rd, random) {
    var arrRd = rd.split("."), rand = random || 100;
    var jsrdUrl = "http://service.paipai.com/cgi-bin/ping?u=http://jsrd.paipai.com&fu=http://jsrd.paipai.com%3FPTAG%3D" + rd + "&resolution=1024*768";
    jsrdUrl += "&fpageId=" + arrRd[0] + "&fdomainId=" + arrRd[1] + "&flinkId=" + arrRd[2];
    if (/paipai.com|buy.qq.com|wanggou.com/.test(document.domain)) {
        if (Math.random() <= rand / 100) {
            $report(jsrdUrl);
        }
    } else {
        $report($makeRd(rd));
    }
};
function $curStyle(obj, prop) {
    if (obj.currentStyle) {
        return obj.currentStyle[prop];
    }
    else if (window.getComputedStyle) {
        prop = prop.replace(/([A-Z])/g, "-$1");
        prop = prop.toLowerCase();
        return window.getComputedStyle(obj, null).getPropertyValue(prop);
    }
    return null;
};
function $decodeTemplate(str, desc) {
    str = str.replace(/[\n\r]/g, "");
    var a = str.match(/<!--(.*?)\/\*(.*?)\*\/(.*?)\1-->/gi);
    var b = {};
    var c = {};
    if (!a) {
        return[];
    }
    for (var i = 0; i < a.length; i++) {
        var t = a[i].match(/(.*?)\/\*(.*?)\*\/(.*)\1/i);
        b[t[1]] = $strTrim(t[3]);
        c[t[1]] = t[2];
    }
    desc == true ? b._desc = c : "";
    return b;
};
function $delClass(ids, cName) {
    $setClass(ids, cName, "remove");
};
function $delEvent(obj, type, handle) {
    if (!obj || !type || !handle) {
        return;
    }
    if (obj instanceof Array) {
        for (var i = 0, l = obj.length; i < l; i++) {
            $delEvent(obj[i], type, handle);
        }
        return;
    }
    if (type instanceof Array) {
        for (var i = 0, l = type.length; i < l; i++) {
            $delEvent(obj, type[i], handle);
        }
        return;
    }
    function find(obj, type, handler) {
        var hids = obj.__hids;
        if (!hids || !window.__allHandlers) {
            return null;
        }
        for (var i = hids.length - 1; i >= 0; i--) {
            var hid = hids[i];
            var h = window.__allHandlers[hid];
            if (h && h.type == type && h.handler == handler) {
                var wrapper = h.wrapper;
                window.__allHandlers[hid] = null;
                delete window.__allHandlers[hid];
                hids.splice(i, 1);
                obj.__hids = hids;
                return wrapper;
            }
        }
        return null;
    }

    if (window.removeEventListener) {
        obj.removeEventListener(type, find(obj, type, handle) || handle, false);
    }
    else if (window.detachEvent) {
        obj.detachEvent("on" + type, find(obj, type, handle) || handle);
    }
};
function $each(jn, fn) {
    var len = jn.length;
    if ("number" === typeof len) {
        for (var i = 0; i < len; i++) {
            try {
                fn(jn[i], i);
            } catch (e) {
                if ($break(e)) {
                    break;
                } else {
                    throw e;
                }
                ;
            }
        }
    } else {
        for (var k in jn) {
            try {
                fn(jn[k], k);
            } catch (e) {
                if ($break(e)) {
                    break;
                } else {
                    throw e;
                }
                ;
            }
        }
    }
};
function $empty() {
    return function () {
        return true;
    }
};
function $extend() {
    var target = arguments[0] || {}, i = 1, length = arguments.length, options;
    if (typeof target != "object" && typeof target != "function")
        target = {};
    for (; i < length; i++)
        if ((options = arguments[i]) != null)
            for (var name in options) {
                var copy = options[name];
                if (target === copy)
                    continue;
                if (copy !== undefined)
                    target[name] = copy;
            }
    return target;
};
function $float(opt) {
    var option = {id: "", left: 0, top: 0, width: 400, height: 0, title: "", html: "", leaver: 2, zindex: 255, autoResize: false, cover: true, dragble: false, fix: false, titleId: "", showClose: true, closeId: "", bgframeLeft: -2, bgframeTop: -2, cName: "module_box_normal vt_float", style: "stand", contentStyle: "", cssUrl: window.config_float_css || "http://static.paipaiimg.com/module/module_box.css", onInit: $empty(), onClose: $empty()};
    for (var i in opt) {
        option[i] = opt[i];
    }
    var that = arguments.callee;
    var _host = window.location.hostname, _isQQ = _host.indexOf("qq.com") != -1, _isBBC = _host.indexOf("buy.qq.com") != -1, _isPP = _host.indexOf("paipai.com") != -1;
    if (_isPP) {
        option.bgframeLeft = 0;
        option.bgframeTop = 0;
    }
    that.data ? "" : init(option.cssUrl);
    option.id = option.id ? option.id : ++that.data.zIndex;
    option.close = closeFloat;
    option.destruct = destructFloat;
    option.closeOther = closeOther;
    option.keepBoxFix = keepBoxFix;
    option.resize = resize;
    option.show = showBox;
    option.setPos = setPos;
    option.closeOther();
    option.show();
    that.data.list.push(option);
    if (option.dragble) {
        $initDragItem({barDom: option.boxTitleHandle, targetDom: option.boxHandle});
    }
    return option;
    function closeFloat() {
        if (!option.onClose(option)) {
            return;
        }
        option.closeOther();
        option.destruct();
    }

    function destructFloat() {
        var _this = this;
        _this.cover ? that.data.closeCover() : "";
        if (_this.sizeTimer) {
            clearInterval(_this.sizeTimer);
        }
        if (_this.fixTimer) {
            clearInterval(_this.fixTimer);
        }
        _this.boxHandle ? document.body.removeChild(_this.boxHandle) : "";
        _this.boxHandel = _this.boxHandle = null;
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue;
            }
            if (_this.id == that.data.list[i].id) {
                that.data.list[i] = null;
            }
        }
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = null;
                    _el = null;
                }
            }
        }
    }

    function closeOther() {
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue;
            }
            if (that.data.list[i].leaver >= this.leaver && this.id != that.data.list[i].id) {
                that.data.list[i].destruct();
            }
        }
    }

    function showBox() {
        this.cover ? that.data.showCover() : "";
        var c = document.createElement("div"), content = "", _style = option.contentStyle ? (' style="' + option.contentStyle + '" ') : "";
        c.id = this.boxId = 'float_box_' + this.id;
        c.style.position = "absolute";
        if ($isBrowser("ie6")) {
            content = '<iframe frameBorder="0" style="position:absolute;left:' + option.bgframeLeft + 'px;top:' + option.bgframeTop + 'px;z-index:-1;border:none;" id="float_iframe_' + this.id + '"></iframe>';
        }
        switch (option.style + "") {
            case"stand":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_title" id="float_title_' + this.id + '"><a href="javascript:;" style="display:' + (this.showClose ? '' : 'none') + ';"  class="bt_close" id="float_closer_' + this.id + '">×</a><h4>' + this.title + '</h4></div><div class="box_content" ' + _style + '>' + this.html + '</div>';
                break;
            case"":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + '</div>';
                break;
            case"none":
                c.className = "";
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + '</div>';
                break;
            case"new":
                c.className = option.cName;
                c.innerHTML = content + '<div class="layer_inner"><div class="layer_hd" ' + _style + ' id="float_title_' + this.id + '"><div class="layer_hd_title">' + this.title + '</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_' + this.id + '">close</a> </div> <div class="layer_bd">' + this.html + '</div></div></div>';
                break;
        }
        document.body.appendChild(c);
        c = null;
        this.boxHandel = this.boxHandle = $id('float_box_' + this.id);
        if ($isBrowser("ie6")) {
            this.boxIframeHandle = $id('float_iframe_' + this.id);
        }
        this.boxTitleHandle = $id(option.titleId || ('float_title_' + this.id));
        this.boxCloseHandle = $id('float_closer_' + this.id);
        this.height ? (this.boxHandle.style.height = (option.height == "auto" ? option.height : option.height + "px")) : "";
        this.width ? (this.boxHandle.style.width = (option.width == "auto" ? option.width : option.width + "px")) : "";
        this.boxHandle.style.zIndex = that.data.zIndex;
        this.sw = parseInt(this.boxHandle.offsetWidth);
        this.sh = parseInt(this.boxHandle.offsetHeight);
        this.setPos();
        var _this = this;
        _this.boxCloseHandle ? _this.boxCloseHandle.onclick = function () {
            _this.close();
            return false;
        } : "";
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = function () {
                        _this.close();
                        return false;
                    };
                    _el = null;
                }
            }
        }
        _this.keepBoxFix();
        if (!_this.onInit(option)) {
            return;
        }
    }

    function setPos(left, top) {
        var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
        var p = [0, 0];
        left && (this.left = left);
        top && (this.top = top);
        p[0] = parseInt(this.left ? this.left : (psw + (ww - this.sw) / 2));
        p[1] = parseInt(this.top ? this.top : (psh + (wh - this.sh) / 2));
        (p[0] + this.sw) > (psw + ww) ? (p[0] = psw + ww - this.sw - 10) : "";
        (p[1] + this.sh) > (psh + wh) ? (p[1] = psh + wh - this.sh - 10) : "";
        p[1] < psh ? p[1] = psh : "";
        p[0] < psw ? p[0] = psw : "";
        if ($isBrowser("ie6")) {
            this.boxIframeHandle.height = (this.sh - 2) + "px";
            this.boxIframeHandle.width = (this.sw - 2) + "px";
        }
        this.boxHandle.style.left = p[0] + "px";
        this.boxHandle.style.top = p[1] + "px";
        this.keepBoxFix();
    }

    function resize(w, h) {
        if (w && w.constructor === Number) {
            this.sw = w;
            this.boxHandle.style.width = this.sw + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.width = (this.sw - 2) + "px";
            }
        }
        if (h && h.constructor === Number) {
            this.sh = h;
            this.boxHandle.style.height = this.sh + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.height = (this.sh - 2) + "px";
            }
        }
        this.setPos();
    }

    function keepBoxFix() {
        if (this.fix) {
            var _this = this;
            if ($isBrowser("ie6")) {
                !_this.fixTimer && (_this.fixTimer = setInterval(function () {
                    _this.boxHandle.style.left = (_this.left ? _this.left : ($getPageScrollWidth() + ($getWindowWidth() - _this.sw) / 2)) + "px";
                    _this.boxHandle.style.top = (_this.top ? _this.top : ($getPageScrollHeight() + ($getWindowHeight() - _this.sh) / 2)) + "px";
                }, 30));
            } else {
                _this.boxHandle.style.position = "fixed";
                _this.boxHandle.style.left = (_this.left ? _this.left : ($getWindowWidth() - _this.sw) / 2) + "px";
                _this.boxHandle.style.top = (_this.top ? _this.top : ($getWindowHeight() - _this.sh) / 2) + "px";
            }
        }
    }

    function autoResize() {
        if (this.autoResize) {
            var _this = this;
            _this.sizeTimer = setInterval(function () {
                _this.sw = _this.boxHandle.offsetWidth;
                _this.sh = _this.boxHandle.offsetHeight;
                if ($isBrowser("ie6")) {
                    _this.boxIframeHandle.height = (_this.sh - 2) + "px";
                    _this.boxIframeHandle.width = (_this.sw - 2) + "px";
                }
            }, 50);
        }
    }

    function init(cssUrl) {
        if (cssUrl) {
            $loadCss(cssUrl);
        }
        that.data = {};
        that.data.zIndex = option.zindex;
        that.data.list = [];
        createCover();
        that.data.showCover = showCover;
        that.data.closeCover = closeCover;
        function createCover() {
            var c = document.createElement("div");
            c.id = "float_cover";
            c.style.display = "none";
            c.style.width = "0px";
            c.style.height = "0px";
            c.style.backgroundColor = "#cccccc";
            c.style.zIndex = 250;
            c.style.position = "fixed";
            c.style.hasLayout = -1;
            c.style.left = "0px";
            c.style.top = "0px";
            c.style.filter = "alpha(opacity=50);";
            c.style.opacity = "0.5";
            document.body.appendChild(c);
            if ($isBrowser("ie6")) {
                c.innerHTML = '<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>';
                c.style.position = "absolute";
            }
            that.data.cover = $id("float_cover");
            that.data.coverIframe = $id("float_cover_iframe");
            that.data.coverIsShow = false;
            that.data.coverSize = [0, 0];
            c = null;
        }

        function showCover() {
            that.data.cover.style.display = "block";
            that.data.coverIsShow = true;
            keepCoverShow();
            that.data.coverTimer = setInterval(function () {
                keepCoverShow();
            }, 50);
            function keepCoverShow() {
                var _d = that.data;
                if (_d.coverIsShow) {
                    var ch = $getContentHeight(), wh = $getWindowHeight(), cw = $getContentWidth(), ww = $getWindowWidth(), ns = [wh, ww];
                    if ($isBrowser("ie6")) {
                        _d.cover.style.top = $getPageScrollHeight() + "px";
                    }
                    if (ns.toString() != that.data.coverSize.toString()) {
                        _d.coverSize = ns;
                        _d.cover.style.height = ns[0].toFixed(0) + "px";
                        _d.cover.style.width = ns[1].toFixed(0) + "px";
                        if (_d.coverIframe) {
                            _d.coverIframe.style.height = ns[0].toFixed(0) + "px";
                            _d.coverIframe.style.width = ns[1].toFixed(0) + "px";
                        }
                    }
                }
            }
        }

        function closeCover() {
            that.data.cover.style.display = "none";
            that.data.coverIsShow = false;
            clearInterval(that.data.coverTimer);
        }
    }
};
function $focusAd(opt) {
    var option = {dataList: [], idList: [], time: "", beginTime: "", endTime: "", staticFileUrl: "", templateIdList: [], contentList: [], onInit: $empty(), onEach: $empty(), autoRender: true, onRender: $empty(), onSuccess: $empty(), timeout: 3000, byCgi: g_focusAd_byCgi && p_focusAd_byCgi, cgiRule: $empty()};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var cgiCallback = getCgiCallback();
    var completeDataCount = 0;
    var handledTagObj = {};
    var retCode = null;
    if (option.dataList.length > 0) {
        processData();
    } else {
        if (option.byCgi && option.cgiRule()) {
            loadCgiData();
            startTimer();
        } else {
            loadStaticData();
        }
    }
    function loadCgiData() {
        var url = "http://express.paipai.com/tws/focus/focus_search?" + $buildParam({id: option.idList.join("|"), curl: encodeURIComponent(location.href), callback: cgiCallback, time: option.time, begin: option.beginTime, end: option.endTime, t: Math.round(new Date() / (1000 * 60))});
        retCode = $returnCode({id: 180331, url: url, frequence: 2});
        $loadScript(url);
        window[cgiCallback] = function (json) {
            retCode.report(json.errCode == 0 ? true : false, json.errCode);
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.list;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!$focusAd.counter) {
            $focusAd.counter = 0;
        }
        $focusAd.counter++;
        return"focusAd" + $focusAd.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.list;
            processData();
        };
        window[cgiCallback] = function (json) {
            retCode && (retCode.report(json.errCode == 0 ? true : false, json.errCode));
        };
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        checkDataIsComplete();
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var adId = option.dataList[i].groupid;
            if (handledTagObj[adId]) {
                continue;
            }
            var list = option.dataList[i].ad;
            if (list.length == 0) {
                continue;
            }
            option.onEach(adId, list);
            if (option.autoRender) {
                $setHtml(option.contentList[i], $formatArray(option.templateIdList[i], list));
            } else {
                option.onRender(adId, list);
            }
            handledTagObj[adId] = true;
            completeDataCount++;
        }
    };
    function checkDataIsComplete() {
        if (completeDataCount < option.idList.length) {
            loadStaticData();
        } else {
            option.onSuccess();
        }
    }
};
(function () {
    var _formatArray_cache = {};
    $formatArray = function (str, data) {
        var fn = !/\W/.test(str) ? _formatArray_cache[str] = _formatArray_cache[str] || $formatArray($id(str).innerHTML) : new Function("arr", "var p=[];p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');return p.join('');");
        return data ? fn(data) : fn;
    }
})();
function $formatDate(date, formatStr) {
    var arrWeek = ['日', '一', '二', '三', '四', '五', '六'], str = formatStr.replace(/yyyy|YYYY/, date.getFullYear()).replace(/yy|YY/, $addZero(date.getFullYear() % 100, 2)).replace(/mm|MM/, $addZero(date.getMonth() + 1, 2)).replace(/m|M/g, date.getMonth() + 1).replace(/dd|DD/, $addZero(date.getDate(), 2)).replace(/d|D/g, date.getDate()).replace(/hh|HH/, $addZero(date.getHours(), 2)).replace(/h|H/g, date.getHours()).replace(/ii|II/, $addZero(date.getMinutes(), 2)).replace(/i|I/g, date.getMinutes()).replace(/ss|SS/, $addZero(date.getSeconds(), 2)).replace(/s|S/g, date.getSeconds()).replace(/w/g, date.getDay()).replace(/W/g, arrWeek[date.getDay()]);
    return str;
};
(function () {
    var _formatJson_cache = {};
    $formatJson = function (str, data) {
        var fn = !/\W/.test(str) ? _formatJson_cache[str] = _formatJson_cache[str] || $formatJson($id(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    }
})();
function $getContentHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollHeight : doeCath.scrollHeight;
};
function $getContentWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollWidth : doeCath.scrollWidth;
};
function $getCookie(name) {
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
};
function $getMousePosition(e) {
    var e = window.event ? window.event : e;
    if (e.evt)e = e.evt;
    var pos = [];
    if (typeof e.pageX != "undefined") {
        pos = [e.pageX, e.pageY];
    } else if (typeof e.clientX != "undefined") {
        pos = [e.clientX + $getScrollPosition()[0], e.clientY + $getScrollPosition()[1]];
    }
    return pos;
};
function $getPageScrollHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    var ua = navigator.userAgent.toLowerCase();
    return(window.MessageEvent && ua.indexOf('firefox') == -1 && ua.indexOf('opera') == -1 && ua.indexOf('msie') == -1) ? bodyCath.scrollTop : doeCath.scrollTop;
};
function $getPageScrollWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollLeft : doeCath.scrollLeft;
};
function $getQuery(name, url) {
    var u = arguments[1] || window.location.search, reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
};
function $getScrollPosition() {
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    return[scrollLeft ? scrollLeft : 0, scrollTop ? scrollTop : 0];
};
function $getServerTime(url) {
    var xhr = $xhrMaker(), url = url || "http://" + window.location.hostname + "/favicon.ico";
    try {
        xhr.open("HEAD", url, false);
        xhr.send();
    } catch (e) {
        return new Date();
    }
    return new Date(xhr.getResponseHeader("Date"));
};
function $getStdTemplate(str, id) {
    window["_template"] ? "" : window._template = {};
    if (window["_template"][id]) {
        return window["_template"][id];
    }
    var s = $id("template_" + id);
    s ? str = s.innerHTML : "";
    var obj = $decodeTemplate(str);
    return window["_template"][id] = obj;
};
function $getTarget(e, parent, tag) {
    var e = window.event || e, tar = e.srcElement || e.target;
    if (parent && tag && tar.nodeName.toLowerCase() != tag) {
        while (tar = tar.parentNode) {
            if (tar == parent || tar == document.body || tar == document) {
                return null;
            } else if (tar.nodeName.toLowerCase() == tag) {
                break;
            }
        }
    }
    ;
    return tar;
};
function $getToken() {
    var skey = $getCookie("skey"), token = skey == null ? "" : $time33(skey);
    return token;
};
function $getUin() {
    var uin = $getCookie("uin") || $getCookie('uin_cookie') || $getCookie('pt2gguin') || $getCookie('o_cookie') || $getCookie('luin') || $getCookie('buy_uin');
    return uin ? parseInt(uin.replace("o", ""), 10) : "";
};
function $getWindowHeight() {
    var bodyCath = document.body;
    return(document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientHeight;
};
function $getWindowWidth() {
    var bodyCath = document.body;
    return(document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientWidth;
};
function $getY(e) {
    var t = e.offsetTop || 0;
    while (e = e.offsetParent) {
        t += e.offsetTop;
    }
    return t;
};
function $gray(ratio, base, lastnum) {
    var uin = $getUin();
    if (!uin) {
        return Math.random() <= ratio;
    } else {
        base = base ? (10 - base) : 0;
        var lastNum = lastnum || (uin % 10);
        return((lastNum * 1 + base) % 10) / 10 < ratio;
    }
};
function $guessLike(opt) {
    var option = {length: 0, itemId: "", classId: "", sceneeId: 5, timeout: 3000, onTimeout: $empty(), onFail: $empty(), onSuccess: $empty()};
    $option(option, opt);
    var inptr = null, isReturned = false
    loadGuessData();
    inptr = setTimeout(function () {
        if (!isReturned) {
            option.onTimeout(3, option.length, option.sceneeId);
            window.guesslikeCallback = $empty();
        }
    }, option.timeout);
    function loadGuessData() {
        $loadScript("http://express.paipai.com/tws/item/favoritemshow_v1?qquin=" + $getUin() + "&sceneId=" + option.sceneeId + "&ps=" + option.length + "&itemId=" + option.itemId + "&classId=" + option.classId + "&callback=guesslikeCallback&t=" + Math.round(new Date().getTime() / (1000 * 60 * 3)));
        window.guesslikeCallback = function (json) {
            isReturned = true;
            clearTimeout(inptr);
            if (json.errCode != "0") {
                option.onFail(2, option.length, option.sceneeId);
                return;
            }
            var dataList = json.data;
            if (option.length > 0 && dataList.length > option.length) {
                dataList = dataList.slice(0, option.length);
            }
            option.onSuccess(dataList);
        };
    }
};
function $hasClass(old, cur) {
    if (!old || !cur)return null;
    var arr = (typeof old == 'object' ? old.className : old).split(' ');
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cur == arr[i]) {
            return cur;
        }
    }
    ;
    return null;
};
function $htmlDecode(str) {
    return typeof(str) != "string" ? "" : str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'");
};
function $id(id) {
    return typeof(id) == "string" ? document.getElementById(id) : id;
};
function $inArray(t, arr) {
    if (arr.indexOf) {
        return arr.indexOf(t);
    }
    for (var i = arr.length; i--;) {
        if (arr[i] === t) {
            return i * 1;
        }
    }
    ;
    return-1;
};
function $initDragItem(opt) {
    var option = {barDom: "", targetDom: ""};
    for (var i in opt) {
        option[i] = opt[i];
    }
    var that = arguments.callee;
    that.option ? "" : that.option = {};
    option.barDom.style.cursor = 'move';
    option.targetDom.style.position = "absolute";
    option.barDom.onmousedown = function (e) {
        var e = window.event || e;
        that.option.barDom = this;
        that.option.targetDom = option.targetDom;
        var currPostion = [parseInt(option.targetDom.style.left) ? parseInt(option.targetDom.style.left) : 0, parseInt(option.targetDom.style.top) ? parseInt(option.targetDom.style.top) : 0];
        that.option.diffPostion = [$getMousePosition({evt: e})[0] - currPostion[0], $getMousePosition({evt: e})[1] - currPostion[1]];
        document.onselectstart = function () {
            return false;
        };
        window.onblur = window.onfocus = function () {
            document.onmouseup();
        };
        return false;
    };
    option.targetDom.onmouseup = document.onmouseup = function () {
        if (that.option.barDom) {
            that.option = {};
            document.onselectstart = window.onblur = window.onfocus = null;
        }
    };
    option.targetDom.onmousemove = document.onmousemove = function (e) {
        try {
            var e = window.event || e;
            if (that.option.barDom && that.option.targetDom) {
                that.option.targetDom.style.left = ($getMousePosition({evt: e})[0] - that.option.diffPostion[0]) + "px";
                that.option.targetDom.style.top = ($getMousePosition({evt: e})[1] - that.option.diffPostion[1]) + "px";
            }
        }
        catch (e) {
        }
    };
};
function $isBrowser(str) {
    str = str.toLowerCase();
    var b = navigator.userAgent.toLowerCase();
    var arrB = [];
    arrB['firefox'] = b.indexOf("firefox") != -1;
    arrB['opera'] = b.indexOf("opera") != -1;
    arrB['safari'] = b.indexOf("safari") != -1;
    arrB['chrome'] = b.indexOf("chrome") != -1;
    arrB['gecko'] = !arrB['opera'] && !arrB['safari'] && b.indexOf("gecko") > -1;
    arrB['ie'] = !arrB['opera'] && b.indexOf("msie") != -1;
    arrB['ie6'] = !arrB['opera'] && b.indexOf("msie 6") != -1;
    arrB['ie7'] = !arrB['opera'] && b.indexOf("msie 7") != -1;
    arrB['ie8'] = !arrB['opera'] && b.indexOf("msie 8") != -1;
    arrB['ie9'] = !arrB['opera'] && b.indexOf("msie 9") != -1;
    arrB['ie10'] = !arrB['opera'] && b.indexOf("msie 10") != -1;
    return arrB[str];
};
function $isDocReady() {
    if (navigator.userAgent.match(/MSIE/)) {
        try {
            document.documentElement.doScroll('left');
            return true;
        } catch (e) {
        }
        return false;
    } else {
        return document.body ? true : false;
    }
};
function $isLogin() {
    return($getCookie("skey") && $getCookie("uin")) ? true : false;
};
function $jsonToTpl(json, tpl) {
    return tpl.replace(/{#(\w+)#}/g, function (a, b) {
        return json[b] || ""
    });
};
function $listHoverDetail(option) {
    var _option = {detailContentSrc: "/sinclude/common/pp_category_detail.shtml", detailContainer: $id("ppCategoryDetail"), detailListTagName: "ul", listContainer: $id("ppCategoryList"), listItem: $child($id("ppCategoryList"), "li"), isAjaxLoad: true, currentIndex: -1, classHide: "hide", classCurrent: "current", delayTime: 300, eventShow: function () {
    }, eventHide: function () {
    }, initContent: _getDetailContent};
    $extend(_option, option);
    _option.initEvent = _bindEvents;
    _option.initContent();
    return _option;
    function _getDetailContent() {
        if (_option.isAjaxLoad) {
            $ajax({url: _option.detailContentSrc, method: 'get', type: 'text', onSuccess: function (data) {
                _option.detailContainer.innerHTML = data;
                _bindEvents();
            }, onError: function (msg) {
            }});
        } else {
            _bindEvents();
        }
        _option.isInited = true;
    }

    function _bindEvents() {
        _option.detailList = $child(_option.detailContainer, _option.detailListTagName);
        _option.detailListLen = _option.detailList.length;
        _option.isHover = _option.currentIndex != -1;
        _switchDetail();
        for (var i = 0, len = _option.listItem.length; i < len; i++) {
            (function (n) {
                $addEvent(_option.listItem[n], "mouseover", function () {
                    _option.timerSwitch && clearTimeout(_option.timerSwitch);
                    _option.timerSwitch = setTimeout(function () {
                        _option.currentIndex = n;
                        _switchDetail();
                    }, _option.delayTime);
                });
            })(i);
        }
        $addEvent(_option.listContainer, "mouseover", _mouseoverPanel);
        $addEvent(_option.listContainer, "mouseout", _mouseoutPanel);
        $addEvent(_option.detailContainer, "mouseover", function () {
            _option.timerSwitch && clearTimeout(_option.timerSwitch);
            _mouseoverPanel();
        });
        $addEvent(_option.detailContainer, "mouseout", _mouseoutPanel);
    }

    function _mouseoverPanel(e) {
        _option.isHover = true;
        if (_option.timerShow == undefined) {
            _option.timerShow = setTimeout(_showDetail, _option.delayTime);
        }
    }

    function _mouseoutPanel(e) {
        _option.isHover = false;
        setTimeout(_hideDetail, _option.delayTime);
    }

    function _switchDetail() {
        for (var i = 0; i < _option.detailListLen; i++) {
            if (i === _option.currentIndex) {
                $delClass(_option.detailList[i], _option.classHide);
                $addClass(_option.listItem[i], _option.classCurrent);
            } else {
                $addClass(_option.detailList[i], _option.classHide);
                $delClass(_option.listItem[i], _option.classCurrent);
            }
        }
        _showDetail();
    }

    function _showDetail() {
        if (_option.isHover && (_option.currentIndex !== -1)) {
            $delClass(_option.detailContainer, _option.classHide);
            clearTimeout(_option.timerShow);
            _option.timerShow = null;
            _option.eventShow();
        }
    }

    function _hideDetail() {
        if (_option.isHover) {
            return;
        }
        clearTimeout(_option.timerShow);
        _option.timerShow = null;
        clearTimeout(_option.timerSwitch);
        $addClass(_option.detailContainer, _option.classHide);
        _option.currentIndex = -1;
        _switchDetail();
        _option.eventHide();
    }
};
function $loadCss(path, callback) {
    if (!path) {
        return;
    }
    var l;
    if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
        l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', path);
        l.setAttribute("id", "loadCss" + Math.random());
        document.getElementsByTagName("head")[0].appendChild(l);
        window["_loadCss"] ? (window["_loadCss"] += "|" + path) : (window["_loadCss"] = "|" + path);
    }
    l && (typeof callback == "function") && (l.onload = callback);
    return true;
};
function $loadImg(obj, attr) {
    if (!obj)return;
    var attr = attr || "back_src", images = obj.getElementsByTagName("IMG");
    for (var i = 0, len = images.length; i < len; i++) {
        var oImg = images[i], src = oImg.getAttribute(attr);
        '' == oImg.src && src && (oImg.src = src);
    }
};
function $loadScript(obj) {
    if (!$loadScript.counter) {
        $loadScript.counter = 1;
    }
    var isObj = typeof(obj) == "object", url = isObj ? obj.url : arguments[0], id = isObj ? obj.id : arguments[1], obj = isObj ? obj : arguments[2], _head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, _script = document.createElement("script"), D = new Date(), _time = D.getTime(), _isCleared = false, _timer = null, o = obj || {}, data = o.data || '', charset = o.charset || "gb2312", isToken = o.isToken, timeout = o.timeout, isAutoReport = o.isAutoReport || false, reportOptions = o.reportOptions || {}, reportType = o.reportType || 'current', reportRetCodeName = o.reportRetCodeName, reportSuccessCode = typeof(o.reportSuccessCode) == "undefined" ? 200 : o.reportSuccessCode, reportErrorCode = typeof(o.reportErrorCode) == "undefined" ? 500 : o.reportErrorCode, reportTimeoutCode = typeof(o.reportTimeoutCode) == "undefined" ? 600 : o.reportTimeoutCode, onload = o.onload, onsucc = o.onsucc, callbackName = o.callbackName || '', callback = o.callback, errorback = o.errorback, _jsonpLoadState = 'uninitialized';
    var complete = function (errCode) {
        if (!_script || _isCleared) {
            return;
        }
        _isCleared = true;
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        _script.onload = _script.onreadystatechange = _script.onerror = null;
        if (_head && _script.parentNode) {
            _head.removeChild(_script);
        }
        _script = null;
        if (callbackName) {
            if (callbackName.indexOf('.') == -1) {
                window[callbackName] = null;
                try {
                    delete window[callbackName];
                }
                catch (e) {
                }
            }
            else {
                var arrJ = callbackName.split("."), p = {};
                for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                    var n = arrJ[j];
                    if (j == 0) {
                        p = window[n];
                    }
                    else {
                        if (j == jLen - 1) {
                            try {
                                delete p[n];
                            }
                            catch (e) {
                            }
                        }
                        else {
                            p = p[n];
                        }
                    }
                }
            }
        }
        if (_jsonpLoadState != "loaded" && typeof errorback == "function") {
            errorback(errCode);
        }
        if (isAutoReport && reportType != 'cross') {
            _retCoder.report(_jsonpLoadState == "loaded", errCode);
        }
    };
    var jsontostr = function (d) {
        var a = [];
        for (var k in d) {
            a.push(k + '=' + d[k]);
        }
        return a.join('&');
    };
    if (isAutoReport && reportOptions) {
        if (reportType == 'cross') {
            $returnCode(reportOptions).reg();
        }
        else {
            reportOptions.url = reportOptions.url || url.substr(0, url.indexOf('?') == -1 ? url.length : url.indexOf('?'));
            var _retCoder = $returnCode(reportOptions);
        }
    }
    if (data) {
        url += (url.indexOf("?") != -1 ? "&" : "?") + (typeof data == 'string' ? data : jsontostr(data));
    }
    if (callbackName && typeof callback == "function") {
        var oldName = callbackName;
        if (callbackName.indexOf('.') == -1) {
            callbackName = window[callbackName] ? callbackName + $loadScript.counter++ : callbackName;
            window[callbackName] = function (jsonData) {
                _jsonpLoadState = 'loaded';
                if (isAutoReport && reportRetCodeName) {
                    reportSuccessCode = jsonData[reportRetCodeName];
                }
                callback.apply(null, arguments);
                onsucc && (onsucc());
            };
        }
        else {
            var arrJ = callbackName.split("."), p = {}, arrF = [];
            for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                var n = arrJ[j];
                if (j == 0) {
                    p = window[n];
                }
                else {
                    if (j == jLen - 1) {
                        p[n] ? (n = n + $loadScript.counter++) : '';
                        p[n] = function (jsonData) {
                            _jsonpLoadState = 'loaded';
                            if (isAutoReport && reportRetCodeName) {
                                reportSuccessCode = jsonData[reportRetCodeName];
                            }
                            callback.apply(null, arguments);
                            onsucc && (onsucc());
                        };
                    }
                    else {
                        p = p[n];
                    }
                }
                arrF.push(n);
            }
            callbackName = arrF.join('.');
        }
        url = url.replace('=' + oldName, '=' + callbackName);
    }
    _jsonpLoadState = 'loading';
    id = id ? (id + _time) : _time;
    url = (isToken !== false ? $addToken(url, "ls") : url);
    _script.charset = charset;
    _script.id = id;
    _script.onload = _script.onreadystatechange = function () {
        var uA = navigator.userAgent.toLowerCase();
        if (!(!(uA.indexOf("opera") != -1) && uA.indexOf("msie") != -1) || /loaded|complete/i.test(this.readyState)) {
            if (typeof onload == "function") {
                onload();
            }
            complete(_jsonpLoadState == "loaded" ? reportSuccessCode : reportErrorCode);
        }
    };
    _script.onerror = function () {
        complete(reportErrorCode);
    };
    if (timeout) {
        _timer = setTimeout(function () {
            complete(reportTimeoutCode);
        }, parseInt(timeout, 10));
    }
    setTimeout(function () {
        _script.src = url;
        try {
            _head.insertBefore(_script, _head.lastChild);
        } catch (e) {
        }
    }, 0);
};
function $loadUrl(o) {
    o.element = o.element || 'script';
    var el = document.createElement(o.element);
    el.charset = o.charset || 'utf-8';
    if (o.noCallback == true) {
        el.setAttribute("noCallback", "true");
    }
    el.onload = el.onreadystatechange = function () {
        if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
            clear();
        }
    };
    el.onerror = function () {
        clear();
    };
    el.src = o.url;
    document.getElementsByTagName('head')[0].appendChild(el);
    function clear() {
        if (!el) {
            return;
        }
        el.onload = el.onreadystatechange = el.onerror = null;
        el.parentNode && (el.parentNode.removeChild(el));
        el = null;
    }
};
(function () {
    var counter = 1;
    $login = function (opts) {
        var that = arguments.callee;
        var login = {option: {'title': "腾讯电商-请您登录后继续刚才的操作", 'containerId': "", 'floatDialog': true, 'modalDialog': true, 'dragable': true, 'showClose': true, 'quickLogin': true, 'checkLogin': true, 'checkReady': true, 'showProtocol': false, 'site': 'paipai', 'noChangeQQ': false, 'defaultQQ': "", 'type': "self", 'action': "", 'x': 0, 'y': 0, 'domain': "", 'skin': "http://static.paipaiimg.com/module/module_box.css", 'appid': '', 'onLogin': $empty(), 'onReset': $empty(), 'onClose': $empty(), 'onResize': $empty(), 'onSuccess': $empty(), 'onFailure': $empty()}, init: function (opts) {
            var option = this.option;
            for (var i in opts) {
                option[i] = opts[i];
            }
            if (option.checkReady && !$isDocReady()) {
                return;
            }
            var hn = location.hostname, topDomain = hn.split(".");
            if (topDomain.length > 1) {
                topDomain = topDomain[topDomain.length - 2] + '.' + topDomain[topDomain.length - 1];
                try {
                    document.domain = option.domain || topDomain;
                } catch (e) {
                }
            }
            option.show = this.show;
            option.close = this.close;
            option.resize = this.resize;
            option.doAction = this.doAction;
            option.counter = counter++;
            if (hn.indexOf("paipai.com") != -1) {
                $setCookie('returnurl', '', -1, '/', 'paipai.com');
                $setCookie('referurl', '', -1, '/', 'paipai.com');
            }
            if (option.checkLogin && $isLogin()) {
                option.doAction();
                return;
            }
            this.registerLoginEvent();
            this.load(option.skin);
            option.show(option);
            that.instance = option;
            return option;
        }, registerLoginEvent: function () {
            ptlogin2_onLogin = function () {
                return $login.instance.onLogin() ? true : false;
            };
            ptlogin2_onReset = function () {
                return $login.instance.onReset() ? true : false;
            };
            ptlogin2_onClose = function () {
                if (location.hostname.indexOf("qq.com") != -1) {
                    ptlogin2_onSuccess();
                }
                return $login.instance.onClose() ? true : false;
            };
            ptlogin2_onResize = function (w, h) {
                var login = $login.instance;
                w = parseInt(w);
                h = parseInt(h);
                if (!login.onResize(w, h)) {
                    return false;
                }
                login.resize($id("login_frame_" + login.counter), w, h);
                if (login.floatDialog) {
                    h = h + 75 - (login.showProtocol ? 0 : 39);
                    login.floatHandle ? login.floatHandle.resize(w + 28, h) : "";
                    login.resize($id("loginunit"), w + 28, h);
                } else {
                    h = h + 60 - (login.showProtocol ? 0 : 39);
                    login.resize($id(login.containerId), w, h);
                    login.resize($id("loginunit2"), w, h);
                }
                return true;
            };
            ptlogin2_onSuccess = function () {
                var login = $login.instance;
                if (!login.onSuccess()) {
                    return false;
                }
                login.close();
                var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1, isDone = false;
                var url = "", url2 = "", url3 = "";
                if (isQQ) {
                    url = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url2 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url3 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://base.51buy.com/login/synclogin");
                } else if (isWG) {
                    url = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url2 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                    url3 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://base.51buy.com/login/synclogin");
                } else {
                    url = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                    url2 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url3 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://base.51buy.com/login/synclogin");
                }
                var doAction = function () {
                    if (!isDone) {
                        isDone = true;
                        login.doAction();
                    }
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                };
                var timer = setTimeout(function () {
                    doAction();
                }, 2000);
                var img = new Image(), img2 = new Image(), img3 = new Image();
                img.onabort = img.onerror = img2.onabort = img2.onerror = img3.onabort = img3.onerror = function () {
                    doAction();
                };
                img.src = url;
                img2.src = url2;
                img3.src = url3;
                return true;
            };
            ptlogin2_onFailure = function (err) {
                var login = $login.instance;
                if (!login.onFailure(err)) {
                    return false;
                }
                if (err) {
                    alert("登录失败！可能的错误原因：" + err);
                }
                $login(login);
                return true;
            };
            ptlogin2_frame_onLoad = function () {
                var login = $login.instance;
                if (login.noChangeQQ) {
                    var _ifrm = $id('login_frame_' + login.counter);
                    if (_ifrm) {
                        var _u = _ifrm.contentWindow && _ifrm.contentWindow.document.getElementById('u');
                        if (_u) {
                            _u.disabled = true;
                        }
                    }
                }
            };
        }, doAction: function () {
            switch (this.type) {
                case"func":
                    this.action();
                    break;
                case"top":
                    top.location.href = this.action;
                    break;
                case"parent":
                    parent.location.href = this.action;
                    break;
                case"self":
                    location.href = this.action;
                    break;
                case"blank":
                    window.open(this.action);
                    break;
            }
        }, show: function (option) {
            var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1;
            if (!this.appid) {
                if (isWG) {
                    this.appid = 677010801;
                } else if (hn.indexOf("buy.qq.com") > -1) {
                    if (hn.indexOf("seller.buy.qq.com") > -1) {
                        this.appid = 703010802;
                    } else {
                        this.appid = 677010801;
                    }
                } else {
                    this.appid = isQQ ? 8000210 : 17000101;
                }
            }
            if (!this.daid) {
                if (hn.indexOf("wanggou.com") != -1) {
                    this.daid = 154;
                } else if (hn.indexOf("buy.qq.com") != -1) {
                    this.daid = 128;
                } else if (hn.indexOf("shop.qq.com") != -1) {
                    this.daid = 127;
                } else if (hn.indexOf("paipai.com") != -1) {
                    this.daid = 126;
                } else if (hn.indexOf("51buy.com") != -1) {
                    this.daid = 68;
                } else if (hn.indexOf("chong.qq.com") != -1) {
                    this.daid = 129;
                } else if (hn.indexOf("kuyoo.cn") != -1) {
                    this.daid = 130;
                } else if (hn.indexOf("etg.qq.com") != -1) {
                    this.daid = 131;
                } else if (hn.indexOf("wkd.qq.com") != -1) {
                    this.daid = 66;
                } else if (hn.indexOf("weikeduo.qq.com") != -1) {
                    this.daid = 132;
                } else if (hn.indexOf("victor.qq.com") != -1) {
                    this.daid = 133;
                } else if (hn.indexOf("piao.qq.com") != -1) {
                    this.daid = 76;
                } else if (hn.indexOf("go.qq.com") != -1) {
                    this.daid = 70;
                } else if (hn.indexOf("gaopeng.qq.com") != -1) {
                    this.daid = 134;
                } else if (hn.indexOf("gaopeng.com") != -1) {
                    this.daid = 135;
                } else if (hn.indexOf("518.qq.com") != -1) {
                    this.daid = 152;
                } else if (hn.indexOf("yixun.com") != -1) {
                    this.daid = 174;
                }
            }
            if (this.daid == 154 || this.daid == 128 || this.daid == 127) {
                this.title = "腾讯网购-请您登录后继续刚才的操作";
            } else if (this.daid == 126) {
                this.title = "腾讯拍拍-请您登录后继续刚才的操作";
            }
            var query = {"style": 13, "daid": this.daid, "pt_safe": 1, "hide_title_bar": 1, "hide_close_icon": 1, "target": "self", "no_verifyimg": 1, "f_url": "loginerroralert", "bgcolor": this.floatDialog ? "f2faff" : "eef5ff", "link_target": "blank", "uin": this.defaultQQ, "appid": this.appid, "t": Math.random()};
            if (!this.quickLogin) {
                query['enable_qlogin'] = 0;
            }
            if (isQQ) {
                var url = 'https://ssl.ui.ptlogin2.qq.com/cgi-bin/login?';
                query['s_url'] = hn.indexOf("buy.qq.com") > -1 ? 'http://buy.qq.com%2Fredirect.html' : (/(chong\.qq\.com)/.test(hn) ? 'http%3A%2F%2Fchong.qq.com%2Fmember%2Flogin_s.shtml' : 'http://imgcache.qq.com%2Fqqshop%2Fac%2Fportal%2Fredirect.html');
            } else if (isWG) {
                var url = 'https://ssl.ui.ptlogin2.qq.com/cgi-bin/login?';
                query['s_url'] = 'http://member.wanggou.com/userlogin/ptlogin%3Floginfrom%3D21';
            } else {
                var url = 'https://ssl.ui.ptlogin2.paipai.com/cgi-bin/login?';
                query['s_url'] = 'http://member.paipai.com/cgi-bin/ptlogin%3Floginfrom%3D18';
            }
            url += $makeUrl(query);
            var width = 398, ifrmHeight = 370, height = ifrmHeight + 35 + (this.showProtocol ? 39 : 0);
            var isQQbuy = hn.indexOf("buy.qq.com") > -1 || isWG;
            var h = '<div class="{class}" id="{class}" style="position:relative;\
                    height:' + height + 'px;\
                    width:' + width + 'px"><h3 id="login_title_{id}" style="padding:0;\
                    margin:0"><span id="login_close_btn_{id}"{display}>关闭</span><strong>登录</strong><em>{title}</em></h3><iframe src="' + url + '" id="login_frame_{id}" name="login_frame_{id}" scrolling="no" frameborder="0" allowTransparency ="true" onload="ptlogin2_frame_onLoad()"  style="height:' + ifrmHeight + 'px;\
                    width:' + (width - 2) + 'px"></iframe><div id="login_protocol_{id}" style="text-align:center"><input name="" id="login_protocol_chk_{id}" type="checkbox" value="" checked="checked" /><label for="login_protocol_chk_{id}"> 已阅读并同意<a class="blule" href="' + (isQQbuy ? 'http://buy.qq.com/agreement.html' : 'http://help.paipai.com/user_agreement.shtml') + '" target="_blank">《' + (isQQbuy ? 'QQ网购平台服务协议' : '拍拍网用户服务协议') + '》</a></label></div><div id="login_protocol_mask_{id}" onclick="alert(\'请先同意《' + (isQQbuy ? 'QQ网购平台服务协议' : '拍拍网用户服务协议') + '》\')" style="position:absolute;\
                            left:3px;\
                    top:28px;\
                    filter:alpha(opacity=1);\
                    opacity:0.01;\
                    background-color:#000;\
                    display:none;\
                    width:398px;\
                    height:' + ifrmHeight + 'px"></div></div>';
            h = h.replace(/{id}/g, option.counter).replace(/{class}/g, this.floatDialog ? "loginunit" : "loginunit2").replace(/{display}/g, this.showClose ? "" : 'style="display:none;\
                    "').replace(/{title}/g, this.title);
            if (this.floatDialog) {
                this.floatHandle = $float({width: width, height: height, cover: this.modalDialog, style: 'none', title: this.title, titleId: 'login_title_' + option.counter, html: '<div id="login_content_' + option.counter + '">' + h + '</div>', left: this.x, top: this.y, dragble: this.dragable, fix: !this.dragable, showClose: this.showClose, closeId: this.showClose ? "login_close_btn_" + option.counter : ''});
                this.containerId = "login_content_" + option.counter;
            } else {
                $id(this.containerId).innerHTML = h;
            }
            if (this.showProtocol) {
                $id("login_protocol_" + option.counter).style.display = "";
                $id("login_protocol_chk_" + option.counter).onclick = function () {
                    var a = $id("login_protocol_mask_" + option.counter);
                    if (this.checked) {
                        a.style.display = "none"
                    } else {
                        a.style.display = "";
                    }
                };
            } else {
                $id("login_protocol_" + option.counter).style.display = "none";
            }
        }, close: function () {
            if (this.floatDialog && this.floatHandle) {
                this.floatHandle.close();
            }
        }, load: function (arrURL) {
            if (arrURL instanceof Array) {
                for (var i = 0, l = arrURL.length; i < l; i++) {
                    if (arrURL[i] && /^(http|https):\/\//ig.test(arrURL[i])) {
                        $loadCss(arrURL[i]);
                    }
                }
            } else if (arrURL) {
                $loadCss(arrURL);
            }
        }, resize: function (obj, w, h) {
            if (h) {
                obj.style.height = h + 'px';
            }
            if (w) {
                obj.style.width = w + 'px';
            }
        }}
        return login.init(opts);
    };
})(window);
function $makeRd(rd, url) {
    var url = url || 'http://www.paipai.com/rd.html', arrRd = rd.split(".");
    return"http://service.paipai.com/cgi-bin/go?pageId=" + arrRd[0] + "&domainId=" + arrRd[1] + "&linkId=" + arrRd[2] + "&url=" + escape(url);
};
function $makeUrl(data) {
    var arr = [];
    for (var k in data) {
        arr.push(k + "=" + data[k]);
    }
    ;
    return arr.join("&");
};
function $martCpc(opt) {
    var option = {dataList: null, idList: [], pc: 0, pcs: "", care: 0, mask: 0, templateType: "json", templateIdList: null, contentList: [], onInit: $empty(), onEach: $empty(), onRender: null, onSuccess: $empty()};
    var thisFunc = arguments.callee;
    $option(option, opt);
    init();
    loadCgiData();
    function init() {
        if (option.contentList.length > 0) {
            for (var i = 0, j = option.contentList.length; i < j; i++) {
                var list = option.contentList[i];
                for (var m = 0, n = list.length; m < n; m++) {
                    list[m] = $id(list[m]);
                }
            }
        }
    }

    function loadCgiData() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        var callbackName = "martCallback" + thisFunc.counter;
        var url = "http://express.paipai.com/tws/martcpc/martcpcshow?" + $buildParam({actid: option.idList.join("|"), url: encodeURIComponent(location.href), callback: callbackName, pc: option.pc, pcs: option.pcs, mask: option.mask, care: option.care, ch: 0, duin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        $loadScript(url);
        window[callbackName] = function (json) {
            if (json.errCode == "0") {
                option.dataList = json.activity;
                processData();
            }
        };
    }

    function processData() {
        option.onInit();
        renderHtml();
        option.onSuccess();
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var activeId = option.dataList[i].activeId;
            var activeIndex = $inArray(activeId * 1, option.idList);
            var areas = option.dataList[i].area;
            for (var m = 0, n = areas.length; m < n; m++) {
                var areaId = areas[m].areaId;
                var tabs = areas[m].tabs;
                option.onEach(tabs, activeId, areaId, activeIndex, m);
                if (option.templateIdList) {
                    var templateId = getTemplate(activeIndex, m);
                    if (!templateId) {
                        continue;
                    }
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, tabs);
                    }
                    else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var x = 0, y = tabs.length; x < y; x++) {
                            tmp.push($jsonToTpl(tabs[x], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    var dom = option.contentList.length > 0 ? option.contentList[activeIndex][m] : $id("m" + areaId);
                    $setHtml(dom, html);
                } else if (option.onRender) {
                    option.onRender(tabs, activeId, areaId, activeIndex, m);
                }
            }
        }
    }

    function getTemplate(activityIndex, areaIndex) {
        if (typeof option.templateIdList == "string") {
            return option.templateIdList;
        } else if (option.templateIdList instanceof Array) {
            if (typeof option.templateIdList[activityIndex] == "string") {
                return option.templateIdList[activityIndex];
            } else {
                return option.templateIdList[activityIndex][areaIndex]
            }
        }
        return"";
    }
};
function $namespace(name) {
    for (var arr = name.split(','), r = 0, len = arr.length; r < len; r++) {
        for (var i = 0, k, name = arr[r].split('.'), parent = {}; k = name[i]; i++) {
            i === 0 ? eval('(typeof ' + k + ')==="undefined"?(' + k + '={}):"";parent=' + k) : (parent = parent[k] = parent[k] || {});
        }
    }
};
function $option() {
    var pt = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
        for (var k in arguments[i]) {
            pt[k] = arguments[i][k]
        }
    }
    return pt;
};
function $preventDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    ;
    return false;
};
function $randomInt(num1, num2) {
    if (num2 == undefined) {
        num2 = num1;
        num1 = 0;
    }
    return Math.floor(Math.random() * (num2 - num1) + num1);
};
function $randomSubArray(arr, len, filter) {
    if (arr.length < len) {
        len = arr.length;
    }
    var obj = {}, list = [];
    filter = filter ? filter : (function () {
        return true;
    });
    do {
        var index = $randomInt(arr.length);
        if (!obj[index] && filter(list, index)) {
            obj[index] = index + 1;
            list.push(arr[index]);
        }
    } while (list.length < len);
    return list;
};
function $report(url) {
    $loadUrl({'url': url + ((url.indexOf('?') == -1) ? '?' : '&') + "cloud=true&" + Math.random(), 'element': 'img'});
};
function $returnCode(opt) {
    var option = {url: "", action: "", sTime: "", eTime: "", retCode: "", errCode: "", frequence: 1, refer: location.href, uin: "", domain: "paipai.com", from: 1, report: report, isReport: false, timeout: 3000, timeoutCode: 444, formatUrl: true, reg: reg};
    for (var i in opt) {
        option[i] = opt[i];
    }
    if (option.url) {
        option.sTime = new Date();
    }
    if (option.timeout) {
        setTimeout(function () {
            if (!option.isReport) {
                option.report(false, option.timeoutCode);
            }
        }, option.timeout);
    }
    function reg() {
        this.sTime = new Date();
        if (!this.action) {
            return;
        }
        var rcookie = $getCookie("retcode"), cookie2 = [];
        rcookie = rcookie ? rcookie.split("|") : [];
        for (var i = 0; i < rcookie.length; i++) {
            if (rcookie[i].split(",")[0] != this.action) {
                cookie2.push(rcookie[i]);
            }
        }
        cookie2.push(this.action + "," + this.sTime.getTime());
        $setCookie("retcode", cookie2.join("|"), 60, "/", this.domain);
    }

    function report(ret, errid) {
        this.isReport = true;
        this.eTime = new Date();
        this.retCode = ret ? 1 : 2;
        this.errCode = isNaN(parseInt(errid)) ? "0" : parseInt(errid);
        if (this.action) {
            this.url = "http://retcode.paipai.com/" + this.action;
            var rcookie = $getCookie("retcode"), ret = "", ncookie = [];
            rcookie = rcookie ? rcookie.split("|") : [];
            for (var i = 0; i < rcookie.length; i++) {
                if (rcookie[i].split(",")[0] == this.action) {
                    ret = rcookie[i].split(",");
                }
                else {
                    ncookie.push(rcookie[i]);
                }
            }
            $setCookie("retcode", ncookie.join("|"), 60, "/", this.domain);
            if (!ret) {
                return;
            }
            this.sTime = new Date(parseInt(ret[1]));
        }
        if (!this.url) {
            return;
        }
        var domain = this.url.replace(/^.*\/\//, '').replace(/\/.*/, ''), timer = this.eTime - this.sTime, cgi = encodeURIComponent(this.formatUrl ? this.url.match(/^[\w|/|.|:|-]*/)[0] : this.url);
        this.reportUrl = "http://c.isdspeed.qq.com/code.cgi?domain=" + domain + "&cgi=" + cgi + "&type=" + this.retCode + "&code=" + this.errCode + "&time=" + timer + "&rate=" + this.frequence + (this.uin ? ("&uin=" + this.uin) : "");
        if (this.reportUrl && Math.random() < (1 / this.frequence) && this.url) {
            $report(this.reportUrl);
        }
    }

    return option;
};
function $scroll(opt) {
    var that = arguments.callee;
    if (that.isBind === undefined) {
        that.isBind = false;
        that.heightList = [];
        that.funcList = [];
        that.optList = [];
        that.visibleH = document.documentElement.clientHeight || document.body.clientHeight;
    }
    if (opt.clean == true) {
        that.heightList = [];
        that.funcList = [];
        that.optList = [];
    }
    var _win = window, _doc = document;
    if (opt.parent) {
        _win = opt.parent.window;
        _doc = opt.parent.document;
        that.visibleH = _doc.documentElement.clientHeight || _doc.body.clientHeight;
    }
    var height = opt.height != undefined ? opt.height : $getY($id(opt.id));
    if (that.visibleH < height) {
        that.heightList.push(height * 1);
        that.funcList.push(opt.func);
        that.optList.push(opt);
    } else {
        opt.func(opt);
    }
    ;
    if (that.isBind) {
        that.isBind = true;
    } else {
        $addEvent(_win, 'scroll', onScroll);
        $addEvent(_win, 'resize', onScroll);
    }
    ;
    function onScroll() {
        $throttle(doScroll, null, 100);
    }

    function doScroll() {
        var len = that.heightList.length;
        if (len === 0) {
            $delEvent(_win, 'scroll', onScroll);
            $delEvent(_win, 'resize', onScroll);
            return null;
        }
        ;
        var dv = _doc.defaultView, y = (dv) ? dv.pageYOffset : 0, h = that.visibleH, arrHeight = [], arrFunc = [], arrOpt = [];
        var doList = [];
        try {
            h += Math.max(_doc.body.scrollTop, _doc.documentElement.scrollTop, y);
        } catch (e) {
        }
        for (var i = 0; i < len; i++) {
            if (h > that.heightList[i]) {
                doList.push(that.optList[i]);
            } else {
                arrHeight.push(that.heightList[i]);
                arrFunc.push(that.funcList[i]);
                arrOpt.push(that.optList[i]);
            }
        }
        ;
        that.heightList = arrHeight;
        that.funcList = arrFunc;
        that.optList = arrOpt;
        if (doList.length > 0) {
            execTask(doList);
        }
    }

    function execTask(taskList) {
        for (var i = 0, j = taskList.length; i < j; i++) {
            taskList[i].func(taskList[i]);
        }
    }
};
function $setClass(ids, cName, kind) {
    if (!ids) {
        return;
    }
    var set = function (obj, cName, kind) {
        if (!obj) {
            return;
        }
        var oldName = obj.className, arrName = oldName ? oldName.split(' ') : [];
        if (kind == "add") {
            if (!$hasClass(oldName, cName)) {
                arrName.push(cName);
                obj.className = arrName.join(' ');
            }
        }
        else if (kind == "remove") {
            var newName = [];
            for (var i = 0, l = arrName.length; i < l; i++) {
                if (cName != arrName[i] && ' ' != arrName[i]) {
                    newName.push(arrName[i]);
                }
            }
            obj.className = newName.join(' ');
        }
    };
    if (typeof(ids) == "string") {
        var arrDom = ids.split(",");
        for (var i = 0, l = arrDom.length; i < l; i++) {
            if (arrDom[i]) {
                set($id(arrDom[i]), cName, kind);
            }
        }
    }
    else if (ids instanceof Array) {
        for (var i = 0, l = ids.length; i < l; i++) {
            if (ids[i]) {
                set(ids[i], cName, kind);
            }
        }
    }
    else {
        set(ids, cName, kind);
    }
};
function $setCookie(name, value, expires, path, domain, secure) {
    var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
};
function $setHtml(o, html) {
    if (o && o.nodeType == 1) {
        o.innerHTML = $xss(html, "none");
    }
};
function $slider(obj) {
    var opt = {titleId: "", titleTag: "", contentId: "", contentTag: "", prevId: "", nextId: "", perView: 1, className: "current", eventType: "mouseover", initIndex: NaN, timeLag: 300, funcInit: $empty(), funcTabInit: $empty(), func: $empty(), onPage: $empty(), nodeWalker: null, auto: false, autoKeep: true, autoTimes: 100, autoLag: 5000, fadeLag: 50, fadeTimes: 500, initSpeed: 100, effect: 'none', width: 0, height: 0, backAttr: "back_src", isLoadInit: true, focusIndex: setEffect, clearAuto: function () {
        clearInterval(autoIntr)
    }, cont: null, tabs: null};
    for (var i in obj) {
        opt[i] = obj[i]
    }
    ;
    ((opt.width == 0 && opt.effect == "scrollx") || (opt.height == 0 && opt.effect == "scrolly")) && (opt.effect = "none");
    var total = 0, autoCount = 0, isInit = true, intr = null, autoIntr = null, _imgs = [];
    if (opt.contentId) {
        var oContent = $id(opt.contentId), _cont = (opt.nodeWalker || $child)(oContent, opt.contentTag, function (dom) {
            switch (opt.effect) {
                case"none":
                    dom.style.display = "none";
                    break;
                case"scrollx":
                    dom.style.width = opt.width + "px";
                    dom.style.styleFloat = dom.style.cssFloat = "left";
                    dom.style.visibility = "hidden";
                    break;
                case"scrolly":
                    dom.style.height = opt.height + "px";
                    dom.style.visibility = "hidden";
                    break;
                case"fade":
                    dom.style.display = "none";
                    dom.style.position = "absolute";
                    dom.style.left = 0;
                    dom.style.top = 0;
                    break;
            }
            ;
            opt.funcInit(total++, dom);
        });
        if (opt.auto) {
            $addEvent(oContent, "mouseover", function () {
                clearInterval(autoIntr);
            });
            opt.autoKeep && $addEvent(oContent, "mouseout", function () {
                setAuto();
            });
        }
        ;
        opt.cont = _cont;
    }
    var len = opt.perView, now = 0;
    if (opt.titleId) {
        var oTitle = $id(opt.titleId), _tabs = (opt.nodeWalker || $child)(oTitle, opt.titleTag, function (dom) {
            opt.funcTabInit(now, dom);
            dom.setAttribute("index", now++);
        });
        $addEvent(oTitle, opt.eventType, function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar && $inArray(tar, _tabs) != -1) {
                var cur = tar.getAttribute("index") * 1;
                clearInterval(autoIntr);
                if (cur != current) {
                    intr = setTimeout(function () {
                        setEffect(cur);
                    }, opt.timeLag);
                }
            }
        });
        $addEvent(oTitle, "mouseout", function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar) {
                clearTimeout(intr);
                opt.auto && opt.autoKeep && setAuto();
            }
        });
        opt.tabs = _tabs;
        total = now;
    }
    ;
    var pageTotal = Math.ceil(total / len), current = isNaN(opt.initIndex) ? $randomInt(pageTotal) : opt.initIndex, autoTotal = opt.autoTimes * total - 1;
    setEffect(current);
    opt.auto && setAuto();
    opt.prevId && ($id(opt.prevId).onclick = function (e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current - 1) < 0 ? (pageTotal - 1) : now);
    });
    opt.nextId && ($id(opt.nextId).onclick = function (e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current + 1) >= pageTotal ? 0 : now);
    })
    isInit = false;
    return opt;
    function setAuto() {
        autoIntr && clearInterval(autoIntr);
        autoIntr = setInterval(function () {
            if (autoCount >= autoTotal) {
                clearInterval(autoIntr);
            } else {
                setEffect((now = current + 1) >= pageTotal ? 0 : now);
                autoCount++;
            }
        }, opt.autoLag);
    }

    function setEffect(cur) {
        if (!opt.contentId) {
            showItem(cur);
            current = cur;
            return;
        }
        ;
        if (isInit) {
            switch (opt.effect) {
                case"scrollx":
                    oContent.style.position = "relative";
                    oContent.style.width = (total + 1) * opt.width + "px";
                    oContent.style.left = -current * opt.width + "px";
                    break;
                case"scrolly":
                    oContent.style.position = "relative";
                    oContent.style.top = -current * opt.height + "px";
                    break;
                case"fade":
                    oContent.style.position = "relative";
                    break;
            }
            ;
            for (var i = 0; i < len; i++) {
                (now = cur + i) < total && showItem(now);
            }
            ;
            opt.onPage(cur);
            current = cur;
        } else {
            var fadeStep = Math.floor(opt.fadeTimes / opt.fadeLag), fadeIntr = null, fadeCount = 0;
            if (opt.globeFadeIntr) {
                switch (opt.effect) {
                    case"fade":
                        _cont[current].style.zIndex = 0;
                        _cont[cur].style.zIndex = 1;
                        _cont[current].style.filter = "alpha(opacity=0)";
                        _cont[current].style.opacity = 0;
                        _cont[cur].style.filter = "alpha(opacity=1)";
                        _cont[cur].style.opacity = 1;
                        current = cur;
                        break;
                }
                clearInterval(opt.globeFadeIntr);
            }
            opt.globeFadeIntr = null;
            switch (opt.effect) {
                case"none":
                    for (var i = 0; i < len; i++) {
                        (now = current * len + i) < total && (_cont[now].style.display = "none");
                        (now = cur * len + i) < total && showItem(now);
                    }
                    ;
                    opt.onPage(cur);
                    current = cur;
                    break;
                case"scrollx":
                    var left = getSpeed(opt.width);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.left = -left.end + "px";
                            current = cur;
                        } else {
                            oContent.style.left = -getMove(left) + "px";
                            left.t = left.t < opt.fadeTimes ? (left.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"scrolly":
                    var top = getSpeed(opt.height);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.top = -top.end + "px";
                            current = cur;
                        } else {
                            oContent.style.top = -getMove(top) + "px";
                            top.t = top.t < opt.fadeTimes ? (top.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"fade":
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            _cont[current].style.zIndex = 0;
                            _cont[cur].style.zIndex = 1;
                            current = cur;
                        } else {
                            var per = fadeCount / fadeStep;
                            _cont[current].style.filter = "alpha(opacity=" + (1 - per) * 100 + ")";
                            _cont[current].style.opacity = 1 - per;
                            _cont[cur].style.filter = "alpha(opacity=" + (per * 100) + ")";
                            _cont[cur].style.opacity = per;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
            }
            ;
        }
        function getSpeed(s) {
            var flag = (cur - current) < 0 ? -1 : 1, end = cur * s, here = (cur - flag) * s, oFirst = _cont[0];
            current == 0 && (oFirst.style.position = "static");
            if (current + 1 == total && cur == 0) {
                flag = 1;
                end = (current + 1) * s;
                here = current * s;
                oFirst.style.position = "relative";
                opt.effect == "scrollx" ? oFirst.style.left = end + "px" : oFirst.style.top = end + "px";
            }
            ;
            return{t: 0, distance: flag * s, end: end, here: here}
        }

        function getMove(obj) {
            var b = obj.here, c = obj.distance, d = opt.fadeTimes, t = obj.t / d - 1;
            return parseInt(-c * (t * t * t * t - 1) + b, 10);
        }

        function showItem(cur) {
            if (opt.contentId && !_imgs[cur] && (isInit == false || (isInit == true && opt.isLoadInit == true))) {
                $loadImg(_cont[cur], opt.backAttr);
                _imgs[cur] = true;
            }
            ;
            if (opt.contentId) {
                _cont[cur].style.display == "none" && (_cont[cur].style.display = "block");
                _cont[cur].style.visibility == "hidden" && (_cont[cur].style.visibility = "visible");
            }
            ;
            if (opt.titleId) {
                for (var i = 0, len = _tabs.length; i < len; i++) {
                    i != cur && $delClass(_tabs[i], opt.className);
                }
                $addClass(_tabs[cur], opt.className);
                _tabs[cur].style.display == "none" && (_tabs[cur].style.display = "block");
            }
            ;
            opt.func(cur);
        }
    }
};
function $strTrim(str, code) {
    var argus = code || "\\s";
    var temp = new RegExp("(^" + argus + "*)|(" + argus + "*$)", "g");
    return str.replace(temp, "");
};
function $throttle(method, context, delay) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, delay);
};
function $time33(str) {
    for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    ;
    return hash & 0x7fffffff;
};
function $xhrMaker() {
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = null;
            }
        }
    }
    ;
    return xhr;
};
function $xss(str, type) {
    if (!str) {
        return str === 0 ? "0" : "";
    }
    switch (type) {
        case"none":
            return str + "";
            break;
        case"html":
            return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
        case"htmlEp":
            return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            });
            break;
        case"url":
            return escape(str).replace(/\+/g, "%2B");
            break;
        case"miniUrl":
            return str.replace(/%/g, "%25");
            break;
        case"script":
            return str.replace(/[\\"']/g,function (r) {
                return"\\" + r;
            }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
            break;
        case"reg":
            return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (a) {
                return"\\" + a;
            });
            break;
        default:
            return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
    }
};
$namespace("PP.index.v2012");
PP.index.v2012 = {areaCheck: function () {
    var buyArea = 'cn';

    function setCookie(area) {
        $setCookie("buy_area", area, 60 * 24 * 3, "/", "paipai.com");
    }

    function initAreaLayer(id) {
        $loadCss('http://static.gtimg.com/css/change_area_floating.css');
        $delClass($id('areaTxt' + id), 'hide');
        $delClass($id('areaBtn' + id), 'hide');
        $addEvent($id('areaBtn' + id), 'click', function () {
            $countRd("20180." + id + ".1");
            setCookie(buyArea);
        })
        $addEvent($id('areaBtn1'), 'click', function () {
            $addClass($id('areaLayer'), 'hide');
            setCookie('cn');
            $countRd("20180.1.1");
        })
        $addEvent($id('areaLayerClose'), 'click', function () {
            $addClass($id('areaLayer'), 'hide');
        })
        $delClass($id('areaLayer'), 'hide');
    }

    window.portalAreaCheck = function (obj) {
        buyArea = obj.ext;
        if (obj.ext === 'tw') {
            setCookie('cn');
        } else if (obj.ext === 'hk' || obj.ext === 'mo') {
            initAreaLayer(2);
        } else {
            setCookie('cn');
        }
    }
    if ($getCookie("buy_area") != 'cn') {
        $loadScript('http://ip.buy.qq.com/json.php?mod=region&act=ip&callback=portalAreaCheck', 'portalArea');
    }
}, portalTopGg: function () {
    if (!$id('portalTopGg2'))return;
    var gg2 = $id('portalTopGg2'), curTime = +new Date();
    if (curTime > gg2.getAttribute('stime') - 0 && curTime < gg2.getAttribute('etime') - 0) {
        if ($getUin() && $getCookie("skey")) {
            window.portalTopGgCb = function (obj) {
                if (obj.ret === 0) {
                    $addClass($id('portalTopGg'), 'hide');
                    $delClass(gg2, 'hide');
                } else {
                    showDefault();
                }
            }
            $loadScript('http://party.paipai.com/tws/activemkt/cxpl/querywhiteuser?bizname=whiteuserattr&callback=portalTopGgCb&t=' + Math.random());
        } else {
            showDefault();
        }
    }
    function showDefault() {
        var defaultGgCnt = $id('portalTopGg'), availGg = [];
        for (var i = 0, len = defaultGgCnt.childNodes.length; i < len; i++) {
            if (defaultGgCnt.childNodes[i].nodeType === 1) {
                availGg.push(defaultGgCnt.childNodes[i]);
                $addClass(defaultGgCnt.childNodes[i], 'hide');
            }
        }
        $delClass(availGg[Math.floor(Math.random() * availGg.length)], 'hide');
    }
}, portalSilder: function () {
    $biFocusAd({idList: [129, 130, 131, 132, 133, 134, 771], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2012/9/adcpcg1.js", pageSize: 1, onSuccess: function () {
        var arr = this.dataList, listHtml = '', navHtml = '';
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].groupid !== '0' && arr[i].locations.length !== 0 && arr[i].locations[0].plans.length !== 0) {
                if (arr[i].groupid === '771') {
                    if (arr[i].locations[0].plans[0].materialdesc === 'ppindexslider') {
                        listHtml = $formatJson($getStdTemplate('', 'portalSlider').template1, arr[i].locations[0].plans[0]) + listHtml;
                        navHtml += '<li></li>';
                    }
                } else {
                    listHtml += $formatJson($getStdTemplate('', 'portalSlider').template1, arr[i].locations[0].plans[0]);
                    navHtml += '<li></li>';
                }
            }
        }
        $id('portalSliderList').innerHTML = listHtml;
        $id('portalSliderNav').innerHTML = navHtml;
        $slider({auto: true, initIndex: arr[0] && arr[0].locations.length && arr[0].locations[0].plans.length ? 0 : NaN, width: 535, height: 295, effect: "scrolly", titleId: "portalSliderNav", titleTag: "li", contentId: "portalSliderList", contentTag: "li", funcTabInit: function (i, dom) {
            dom.innerHTML = i + 1;
        }});
    }});
}, bindShop: function () {
    if ($id('buyqqApiDomTpl')) {
        $biFocusAd({idList: [350], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2013/1/adcpcg101.js", pcs: '1529:0,1530:2', templateIdList: ['buyqqApiDomTpl'], contentList: [
            [$id('buyqqApi2Dom')]
        ], onSuccess: function () {
            $loadImg($id('buyqqApi2Dom'));
        }});
    }
    window.portalShopCpc = function (obj) {
        if (obj.errCode == '0') {
            var data = obj.locations[0].plans;
            $id('shopqqApiDom1').innerHTML = $formatArray($id('buyqqApiDomTpl').innerHTML, data);
            var list = $child($id('shopqqApiDom1'), "a");
            list[2] && $id("shopqqApiDom2").appendChild(list[2]);
            list[3] && $id("shopqqApiDom2").appendChild(list[3]);
        }
    }
    $loadScript('http://focus.paipai.com/focuscpc/focuscpcshow?id=36Kz5lJ7zNpYd-c2pgrvlgb1A4qy1wHA&callback=portalShopCpc');
    $slider({contentId: "qqshopList", contentTag: "li", prevId: "shopPrevLink", nextId: "shopNextLink", auto: true, effect: "fade", initIndex: 0, isLoadInit: true, autoLag: 5500, func: function (cur) {
    }});
}, portalLogin: function () {
    function elNum(el, num) {
        el.innerHTML = num;
        if (num > 0) {
            $addClass(el, 'em');
        }
    }

    window.buyerStatCallback = function (obj) {
        if (obj.errCode == '0') {
            var data = obj.data[0];
            var n1 = data.WaitMyPayAsBuyer - 0, n2 = data.WaitMyConfirmReceiveAsBuyer - 0, n3 = data.EvalBuyerNotReply - 0, n0 = n1 + n2 + n3;
            if (n0 == 0) {
                $id('loginStatN0').parentNode.innerHTML = $id('loginStatN0').parentNode.getAttribute('data-none');
            } else {
                elNum($id('loginStatN0'), n0);
            }
            elNum($id('loginStatN1'), n1);
            elNum($id('loginStatN2'), n2);
            elNum($id('loginStatN3'), n3);
            $addClass($id('unloginStat'), 'hide');
            $delClass($id('loginStat'), 'hide');
            $countRd("20084.119.1");
        } else {
            $delClass($id('unloginStat'), 'hide');
            $addClass($id('loginStat'), 'hide');
        }
    }
    function checkLogin() {
        $loadScript('http://my.paipai.com/myppindex/buyerstatinfo?callback=buyerStatCallback&t=' + Math.random(), 'portalLogin');
    }

    checkLogin();
    $id('loginBtn').onclick = function () {
        $login({type: "func", action: function () {
            checkLogin();
            PP.toolBar.showWelcome();
            PP.index.v2012.recommend.reload();
        }});
        return false;
    }
}, portalNotice: function () {
    $slider({contentId: "portalNoticeList", contentTag: "li", perView: 2, prevId: "noticePrevLink", nextId: "noticeNextLink"});
    $addEvent($id("portalNotice"), "mouseover", function () {
        $addClass($id("portalNotice"), "portal-notice-hover")
    });
    $addEvent($id("portalNotice"), "mouseout", function () {
        $delClass($id("portalNotice"), "portal-notice-hover")
    });
}, recommend: function () {
    var _opt = {tplViewed: '', tplRecom: '', viewedId: 'portalViewed', recomId: 'portalGuess', btnPrev: 'portalRecommendPrev', btnNext: 'portalRecommendNext', btnChange: '', defaultCommId: Array(33).join('0'), recomNum: 8, guessLikeMaxNum: 25, guessLikeNum: 5, recomGroupNum: 4, recomNumNew: 5, bindFresher: true, onInitShow: function () {
    }};
    var _aViewed = [], _listRecom = {}, _nlistRecom = 0, _index = 0, _guessLikeCurPage = 0, requestNum = 0, _domViewedList = [], _domRecomList = [], _isBinded = false;
    var fresher = {srcList: ['http://www.paipai.com/sinclude/xml/tjw/tjw2012/tjw2/tjw13949903856.js', 'http://www.paipai.com/sinclude/xml/tjw/tjw2012/tjw2/tjw10930805855.js'], counter: 0, tpl: $getStdTemplate('', 'recommend').template3, fresherId: 'portalFresherGoodsList', goodsList: [], goodsObj: {}, maxNum: 12, recomGroupNum: 4, btnChange: 'moreRecommend2'}

    function _initBindEvents() {
        if (_isBinded)return;
        $addEvent($id(_opt.btnPrev), 'click', function () {
            $addClass(_domViewedList[_index], 'hide');
            $addClass(_domRecomList[_index], 'hide');
            _index = _index - 1 < 0 ? _nlistRecom - 1 : _index - 1;
            _showDom();
            return false;
        });
        $addEvent($id(_opt.btnNext), 'click', function () {
            $addClass(_domViewedList[_index], 'hide');
            $addClass(_domRecomList[_index], 'hide');
            _index = _index + 2 > _nlistRecom ? 0 : _index + 1;
            _showDom();
            return false;
        });
        $addEvent($id(_opt.btnChange), 'click', function () {
            var currentIndex = parseInt(_domViewedList[_index].getAttribute('data-index')) || 0;
            var maxIndex = Math.ceil(_opt.recomNum / _opt.recomGroupNum) - 1;
            _domViewedList[_index].setAttribute('data-index', currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
            _groupRecomDom();
            return false;
        });
        _isBinded = true;
    }

    function _requestUserStat() {
        if (_opt.bindFresher && $getUin() && $getCookie("skey")) {
            $loadScript('http://member.paipai.com/cgi-bin/onlinechecker/GetOnlineInfo?callback=chkUserInfo&t=' + Math.random());
        } else if ($gray(0.5, 8, $getQuery("lastnum"))) {
            _requestGuessLike();
        } else {
            _requestViewed();
        }
    }

    function _requestGuessLike() {
        if (_aViewed.length) {
            _opt.guessLikeNum = 4;
            $guessLike({length: 20, itemId: _aViewed[0]['commId'], sceneeId: '1015', onTimeout: _getRankData, onFail: _getRankData, onSuccess: function (commList) {
                for (var i = 0, j = commList.length; i < j; i++) {
                    commList[i].commodityUrl = commList[i].clickUrl + '&PTAG=20084.188.8';
                    commList[i].image = commList[i].img120X120;
                }
                $id(_opt.recomId).innerHTML = $formatJson(_opt.tplGuessLike, commList);
                _setStyle();
                _bindEvent(commList.length);
                var viewedHTML = $formatJson(_opt.tplViewed, _aViewed[0]);
                $id(_opt.viewedId).innerHTML = viewedHTML;
                $delClass($child($id(_opt.viewedId), 'li'), 'hide');
                $addClass($id('portalRecommend'), 'portal-recommend-1');
            }});
        } else {
            $guessLike({length: _opt.guessLikeMaxNum, onTimeout: _getRankData, onFail: _getRankData, onSuccess: function (commList) {
                for (var i = 0, j = commList.length; i < j; i++) {
                    var ptag = _getPtag(i);
                    commList[i].commodityUrl = commList[i].clickUrl + '&PTAG=' + ptag;
                    commList[i].image = commList[i].img120X120;
                }
                $id(_opt.recomId).innerHTML = $formatJson(_opt.tplGuessLike, commList);
                _setStyle();
                _bindEvent(commList.length);
            }});
        }
        function _getRankData(msgId, maxLength) {
            $loadScript("http://static.paipaiimg.com/sinclude/rank/48050.js?t=" + (new Date().getTime() / (1000 * 60 * 15)));
            window.queryRankById = function (json) {
                if (json.errCode != 0) {
                    return;
                }
                var list = json.data.itemData;
                if (maxLength > 0 && list.length > maxLength) {
                    list = list.slice(0, maxLength);
                }
                for (var i = 0, j = list.length; i < j; i++) {
                    var ptag = _getPtag(i);
                    list[i].commodityUrl = "http://auction1.paipai.com/" + list[i].itemId + "?DAP=" + msgId + ":" + 5 + ":" + list[i].itemId + "&PTAG=" + ptag;
                    list[i].commodityName = unescape(list[i].itemName);
                    list[i].image = unescape(list[i].itemPicUrl_120x120);
                }
                $id(_opt.recomId).innerHTML = $formatJson(_opt.tplGuessLike, list);
                _setStyle();
                _bindEvent(list.length);
            };
        };
        function _getPtag(index) {
            var page = Math.floor(index / _opt.guessLikeNum);
            return page >= 5 ? "20084.188.6" : ("20084.188." + (page + 1));
        }

        function _setStyle() {
            $id(_opt.recomId).parentNode.style.display = "block";
            var recmdTitle = $id("recmdTitle");
            recmdTitle.innerHTML = "您可能还喜欢";
            recmdTitle.className = "portal-recommend-t2";
            recmdTitle.style.display = "block";
            $delClass($id("moreRecommend"), "hide");
        }

        function _bindEvent(length) {
            var guessLikeTotalPage = Math.floor(length / _opt.guessLikeNum);
            $id("moreRecommend").onclick = function (ev) {
                _guessLikeCurPage++;
                _guessLikeCurPage = _guessLikeCurPage >= guessLikeTotalPage ? 0 : _guessLikeCurPage;
                var glItemList = $child($child($id(_opt.recomId), "ul")[0], "li");
                var startIndex = _guessLikeCurPage * _opt.guessLikeNum;
                var endIndex = _opt.guessLikeNum * (_guessLikeCurPage + 1);
                for (var i = 0, j = glItemList.length; i < j; i++) {
                    if (i >= startIndex && i < endIndex) {
                        $delClass(glItemList[i], "hide");
                        if (i > 4 && !glItemList[i].getAttribute("hasLoadImg")) {
                            $loadImg(glItemList[i]);
                            glItemList[i].setAttribute("hasLoadImg", "true")
                        }
                    } else {
                        $addClass(glItemList[i], "hide");
                    }
                }
            };
        }
    }

    function _getFresherGoods() {
        for (var i = 0, len = fresher.srcList.length; i < len; i++) {
            var callback = fresher.srcList[i].match(/\w+(?=\.js)/i)[0];
            window[callback] = function (obj) {
                fresher.goodsList = fresher.goodsList.concat(obj.data.adList);
                ++fresher.counter == fresher.srcList.length && _checkFresherGoods();
            };
            $loadScript(fresher.srcList[i] + '?t=' + Math.random());
        }
    }

    function _checkFresherGoods() {
        var idList = [];
        for (var i = 0, len = Math.min(fresher.goodsList.length, 20); i < len; i++) {
            var id = fresher.goodsList[i].id
            if (id) {
                idList.push(id);
                fresher.goodsObj[id] = fresher.goodsList[i];
            }
        }
        $loadScript('http://my.paipai.com/cgi-bin/item_view/item_list?sItemid=' + idList.join('|'));
    }

    function _requestViewed() {
        _listRecom = {};
        _aViewed = [];
        $loadScript("http://my.paipai.com/cgi-bin/vieweditems/pull?callback=getViewData&dtag=indexRecommend&t=" + (+new Date));
    }

    function _requestRecom(commId, disNum) {
        $loadScript("http://search.paipai.com/cgi-bin/spromote?sname=paipaicomm&searchtype=direct&callback=recommendCallback&proNum=256&numfix=1&disNum=" + disNum + "&tagid=_" + commId + "&commid=" + commId + "&t=" + (+new Date));
    }

    function _requestRecomByVisitkey(commId, disNum) {
        $loadScript("http://search.paipai.com/cgi-bin/spromote?sname=paipaicomm&searchtype=fast&callback=recommendCallback&disNum=" + (disNum * 2) + "&tagid=_" + commId + "&vistkey=" + ($getCookie('visitkey') || 1) + "&t=" + (+new Date));
    }

    function _buildDom() {
        var viewedHTML = '', recomHTML = '', list;
        _nlistRecom = _aViewed.length;
        for (var i = 0, len = _aViewed.length; i < len; i++) {
            var list = _listRecom['_' + _aViewed[i].commId];
            if (list) {
                viewedHTML += $formatJson(_opt.tplViewed, _aViewed[i]);
                recomHTML += $formatJson(_opt.tplRecom, list);
            } else {
                _nlistRecom--;
            }
        }
        if (_nlistRecom == 0) {
            if (_listRecom['_' + _opt.defaultCommId]) {
                _listRecom['_' + _opt.defaultCommId].length > _opt.recomNumNew && (_listRecom['_' + _opt.defaultCommId] = _listRecom['_' + _opt.defaultCommId].slice(0, _opt.recomNumNew));
                $id(_opt.recomId).innerHTML = $formatJson(_opt.tplRecom, _listRecom['_' + _opt.defaultCommId]);
                _initshowDom();
            } else {
                _requestRecomByVisitkey(_opt.defaultCommId, _opt.recomNumNew);
            }
        } else {
            $id(_opt.viewedId).innerHTML = viewedHTML;
            $id(_opt.recomId).innerHTML = recomHTML;
            _initshowDom();
        }
    }

    function _groupRecomDom() {
        if ($id(_opt.btnChange)) {
            var currentIndex = parseInt(_domViewedList[_index].getAttribute('data-index')) || 0;
            var maxIndex = Math.ceil(_opt.recomNum / _opt.recomGroupNum) - 1;
            if (_domRecomList[_index].childNodes.length > _opt.recomGroupNum) {
                $delClass($id(_opt.btnChange), 'hide');
            } else {
                $addClass($id(_opt.btnChange), 'hide');
            }
        }
        for (var i = 0, len = _opt.recomNum; i < len; i++) {
            if (currentIndex * _opt.recomGroupNum <= i && (currentIndex + 1) * _opt.recomGroupNum > i) {
                $delClass(_domRecomList[_index].childNodes[i], 'hide');
            } else {
                $addClass(_domRecomList[_index].childNodes[i], 'hide');
            }
        }
    }

    function _initshowDom() {
        _domViewedList = $child($id(_opt.viewedId), 'li');
        _domRecomList = $child($id(_opt.recomId), 'ul');
        _initBindEvents();
        if (_nlistRecom > 1) {
            $delClass($id(_opt.btnPrev), 'hide');
            $delClass($id(_opt.btnNext), 'hide');
        } else {
            $addClass($id(_opt.btnPrev), 'hide');
            $addClass($id(_opt.btnNext), 'hide');
        }
        _opt.onInitShow(_nlistRecom);
        _showDom();
    }

    function _showDom() {
        $delClass(_domViewedList[_index], 'hide');
        $delClass(_domRecomList[_index], 'hide');
        if (_nlistRecom > 0) {
            _groupRecomDom();
        }
    }

    window.itemCommInfoCallBack = function (obj) {
        var html = '', total = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (obj[i].dwNum > 0 && total < 12) {
                html += $formatJson(fresher.tpl, fresher.goodsObj[obj[i].strItemId]);
                total += 1;
            }
        }
        $id(fresher.fresherId).innerHTML = html;
        if (total > fresher.recomGroupNum) {
            var list = $child($id(fresher.fresherId), 'li');
            var groupShow = function () {
                var btn = $id(fresher.btnChange), currentIndex = btn.getAttribute('data-index') - 0 || 0, len = list.length, nextIndex = currentIndex + 2 > Math.ceil(len / fresher.recomGroupNum) ? 0 : currentIndex + 1;
                for (var i = 0; i < len; i++) {
                    if (i >= fresher.recomGroupNum * currentIndex && i < fresher.recomGroupNum * (currentIndex + 1)) {
                        $delClass(list[i], 'hide');
                    } else {
                        $addClass(list[i], 'hide');
                    }
                }
                btn.setAttribute('data-index', nextIndex);
            }
            groupShow();
            $id(fresher.btnChange).onclick = function () {
                groupShow();
                return false;
            }
            $delClass($id(fresher.btnChange), 'hide');
        } else {
            $addClass($id(fresher.btnChange), 'hide');
        }
        $id('portalRecommend').className = 'portal-recommend portal-recommend-2';
    }
    window['chkUserInfo'] = function (obj) {
        var isFresher = obj.isLogin && obj.colorDiamondLevel == '0';
        if (isFresher) {
            _getFresherGoods();
        } else if ($gray(0.5, 8, $getQuery("lastnum"))) {
            _requestGuessLike();
        } else {
            _requestViewed();
        }
    }
    window['recommendCallback'] = function (obj) {
        requestNum++;
        obj.list.length && (_listRecom[obj.ActionId] = obj.list);
        requestNum >= _aViewed.length && _buildDom();
    }
    window['getViewData'] = function (obj) {
        if (obj.errCode == 0 && obj.data.value != '') {
            var tempArr = obj.data.value.replace(/\{\|\}$/, "").split("{|}"), tempArrLength = tempArr.length;
            for (var i = 0, len = Math.min(tempArrLength, 1); i < len; i++) {
                var item = tempArr[i].split("{:}");
                _aViewed.push({title: item[0], commId: item[1], img: 'http://img0.paipaiimg.com/' + item[3], price: item[4]});
            }
            _requestGuessLike();
        } else {
            _requestGuessLike();
        }
    }
    return{init: function (option) {
        $extend(_opt, option);
        _requestUserStat();
    }, reload: function () {
        _requestUserStat();
    }}
}(), portalFloor: function () {
    var groupid = ['26', '27', '28', '29', '30', '31|32|33', '74', '272'];
    var data = {}, tpl = '<a href="<%=clickurl%>" target="_blank" title="<%=materialDesc%>"><img src="<%=materialurl%>" alt="<%=materialDesc%>"></a>', aPtag = ['20084.13.10', '20084.13.11', '20084.14.10', '20084.14.11', '20084.109.10', '20084.109.11', '20084.16.10', '20084.16.11', '20084.110.10', '20084.110.11', '20084.15.10', '20084.15.11', '20084.15.12', '20084.117.10', '20084.117.11', '20084.186.10', '20084.186.11'], goodTpl = $getStdTemplate('', 'portalFloorGood').template1;
    var floorMap = {'33735': {'domain': 'man', 'floor': '0', 'pos': 0, 'ptag': {'clickUrl': ['20084.13.4', '20084.13.5'], 'keyword': ['20084.13.7', '20084.13.8']}, 'areaId': '390'}, '33756': {'domain': 'man', 'floor': '0', 'pos': 2, 'ptag': {'clickUrl': ['20084.13.6'], 'keyword': ['20084.13.9']}, 'areaId': '406'}, '33739': {'domain': 'lady', 'floor': '1', 'pos': 0, 'ptag': {'clickUrl': ['20084.14.4'], 'keyword': ['20084.14.7']}, 'areaId': '394'}, '33743': {'domain': 'lady', 'floor': '1', 'pos': 1, 'ptag': {'clickUrl': ['20084.14.5'], 'keyword': ['20084.14.8']}, 'areaId': '396'}, '33736': {'domain': 'lady', 'floor': '1', 'pos': 2, 'ptag': {'clickUrl': ['20084.14.6'], 'keyword': ['20084.14.9']}, 'areaId': '391'}, '33754': {'domain': 'beauty', 'floor': '2', 'pos': 0, 'ptag': {'clickUrl': ['20084.109.4', '20084.109.5', '20084.109.6'], 'keyword': ['20084.109.7', '20084.109.8', '20084.109.9']}, 'areaId': '405'}, '33753': {'domain': 'bag', 'floor': '6', 'pos': 0, 'ptag': {'clickUrl': ['20084.117.4', '20084.117.5'], 'keyword': ['20084.117.7', '20084.117.8']}, 'areaId': '403'}, '33745': {'domain': 'shine', 'floor': '6', 'pos': 2, 'ptag': {'clickUrl': ['20084.117.6'], 'keyword': ['20084.117.9']}, 'areaId': '400'}, '33752': {'domain': '3c', 'floor': '3', 'pos': 0, 'ptag': {'clickUrl': ['20084.16.4'], 'keyword': ['20084.16.7']}, 'areaId': '402'}, '33750': {'domain': '3c', 'floor': '3', 'pos': 1, 'ptag': {'clickUrl': ['20084.16.5'], 'keyword': ['20084.16.8']}, 'areaId': '401'}, '33751': {'domain': '3c', 'floor': '3', 'pos': 2, 'ptag': {'clickUrl': ['20084.16.6'], 'keyword': ['20084.16.9']}, 'areaId': '404'}, '33758': {'domain': 'sports', 'floor': '4', 'pos': 0, 'ptag': {'clickUrl': ['20084.110.4', '20084.110.5', '20084.110.6'], 'keyword': ['20084.110.7', '20084.110.8', '20084.110.9']}, 'areaId': '408'}, '33740': {'domain': 'life', 'floor': '5', 'pos': 0, 'ptag': {'clickUrl': ['20084.15.4'], 'keyword': ['20084.15.7']}, 'areaId': '395'}, '33747': {'domain': 'baby', 'floor': '5', 'pos': 1, 'ptag': {'clickUrl': ['20084.15.5'], 'keyword': ['20084.15.8']}, 'areaId': '397'}, '33755': {'domain': 'food', 'floor': '5', 'pos': 2, 'ptag': {'clickUrl': ['20084.15.6'], 'keyword': ['20084.15.9']}, 'areaId': '407'}, '33737': {'domain': 'book', 'floor': '7', 'pos': 0, 'ptag': {'clickUrl': ['20084.186.4', '20084.186.5', '20084.186.6'], 'keyword': ['20084.186.7', '20084.186.8', '20084.186.9']}, 'areaId': '393'}}
    var idGroup = [], psGroup = [];
    for (var item in floorMap) {
        idGroup.push(item);
        psGroup.push(floorMap[item].areaId + ':' + floorMap[item].ptag.clickUrl.length);
    }
    getMartCpc();
    function getMartCpc() {
        var cgi = 'http://express.paipai.com/tws/martcpc/martcpcshow?actid=' + idGroup.join('|') + '&url=' + encodeURIComponent(location.href) + '&callback=portalFloorCpc&ch=0&pcs=' + psGroup.join(',') + '&mask=2&t=' + Math.random();
        $loadScript(cgi);
    }

    window.portalFloorCpc = function (ret) {
        if (ret.errCode != '0') {
            return;
        }
        var obj = ret.activity;
        for (var j = 0, len = obj.length; j < len; j++) {
            var key = 'portalFloor' + floorMap[obj[j].activeId].floor + 'Good';
            data[key] = data[key] || [];
            var index = 0;
            for (var i = 0; i < obj[j].area.length; i++) {
                if (obj[j].area[i].areaId === floorMap[obj[j].activeId].areaId) {
                    index = i;
                    break;
                }
            }
            for (var k = 0; k < Math.min(obj[j].area[index].tabs.length, floorMap[obj[j].activeId].ptag.clickUrl.length); k++) {
                var item = obj[j].area[index].tabs[k];
                item.searchUrl = 'http://' + floorMap[obj[j].activeId].domain + '.paipai.com/search_list.shtml?ptag=' + floorMap[obj[j].activeId].ptag.keyword[k] + '&keyword=';
                item.itemShortName = $htmlDecode($htmlDecode(item.recmdRegName));
                item.itemExtValue1 = $htmlDecode($htmlDecode(item.itemExtValue1));
                item.activePrice = item.activityPrice;
                var jpUrl = 'http://search1.paipai.com/cgi-bin/comm_search1?KeyWord=' + encodeURIComponent(item.itemShortName) + '&l_tg=1&ProCommID=' + item.commodityId + '&ptag=' + floorMap[obj[j].activeId].ptag.clickUrl[k];
                if (/^http\:\/\/auction/.test(item.clickUrl)) {
                    item.clickUrl = jpUrl;
                } else {
                    item.clickUrl = item.clickUrl + '&type=2&jpUrl=' + encodeURIComponent(jpUrl);
                }
                item.uploadPicUrl1 = item.uploadPicUrl1 ? item.uploadPicUrl1 : item.img160x160;
                data[key][floorMap[obj[j].activeId].pos + k] = item;
            }
            if (data[key][0] && data[key][1] && data[key][2]) {
                $id('portalFloor' + floorMap[obj[j].activeId].floor).getElementsByTagName('ul')[0].innerHTML = $formatJson(goodTpl, data[key]);
                if (floorMap[obj[j].activeId].floor == '0') {
                    $loadImg($id('portalFloor0'));
                }
            }
        }
    };
    function checkGroupIndex(id) {
        for (var i = 0, len = groupid.length; i < len; i++) {
            if (groupid[i] === id || ('|' + groupid[i]).indexOf('|' + id) > -1) {
                return i * 1;
            }
        }
        ;
        return-1;
    }

    function appendFloor() {
        for (var i in data) {
            if (i.indexOf('Good') === -1) {
                var html = '';
                for (var j = 0; j < data[i].length; j++) {
                    var tmpHtml = $formatJson(tpl, data[i][j]).replace(/PTAG%3D([.\d]+)/i, 'PTAG%3D' + aPtag.shift());
                    html += tmpHtml;
                }
                var div = document.createElement('div');
                div.className = 'protal-floor-img';
                div.innerHTML = html;
                $id(i) && $id(i).appendChild(div);
            }
        }
    }

    $focusAd({idList: groupid.join('|').split('|'), staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpt/2012/9/adcptg27.js", autoRender: false, onSuccess: function () {
        var arr = this.dataList;
        for (var i = 0, len = arr.length; i < len; i++) {
            var floorIndex = checkGroupIndex(arr[i].groupid);
            if (!data['portalFloor' + floorIndex]) {
                data['portalFloor' + floorIndex] = [];
            }
            data['portalFloor' + floorIndex] = data['portalFloor' + floorIndex].concat(arr[i].ad);
        }
        appendFloor();
    }});
}, todaySale: function () {
    var api = "http://www.paipai.com/tjw/sale_json/index_v2011.js", currentTime = parseInt($formatDate(new Date(), "HHII"), 10), aItemTimes = [], currentIndex = 0;
    var sliderBind = function () {
        var sl = $slider({isLoadInit: false, prevId: "salePrevLink", nextId: "saleNextLink", contentId: "portalSaleList", contentTag: "dl"});
        for (var i = 0, len = aItemTimes.length; i < len; i++) {
            currentIndex = aItemTimes[i] < currentTime ? i : currentIndex;
        }
        sl.focusIndex(currentIndex);
    };
    window.fillSale = function (data) {
        var tpl = $getStdTemplate('', 'todaySale').template1, html = '';
        for (var i = 0, len = data.length; i < len; i++) {
            html += $formatJson(tpl, {"item": data[i][0], "img": data[i][3].replace("40x40.jpg", "120x120.jpg"), "name": data[i][1], "price": data[i][2], "time": data[i][4]})
            aItemTimes.push(parseInt(data[i][4].replace(":", ""), 10));
        }
        $id('portalSaleList').innerHTML = html;
        setTimeout(sliderBind, 300);
    };
    $loadScript(api, "todaySale");
}, portalGroupon: function () {
    window.tuansmart_callback_static = function (obj) {
        $id('grouponBd').innerHTML = $formatJson($getStdTemplate('', 'groupon').template1, obj.data.TuanItem[0]);
    };
    $loadScript("http://www.paipai.com/tjw/express/tuan/tuansmart_static_" + (new Date().getDate()) + ".js", 'portalGroupon');
}, newProduct: function () {
    window.tjwppmsxg21 = function (obj) {
        if (obj.data == undefined)return;
        $id('newProduct').getElementsByTagName('ul')[0].innerHTML = $formatJson($getStdTemplate('', 'newProduct').template1, obj.data.adList);
    };
    $loadScript("http://static.paipaiimg.com/sinclude/xp2011/xp11/xg/tjwppmsxg21.js?t=" + (new Date().getHours()), "newProduct");
}, portalCoupon: function () {
    if (!$id('portalCoupon'))return;
    var packetIndexData = {};
    window.queryRedPacket = function (obj) {
        obj.data.sort(function (a, b) {
            return b.TotalIssued - a.TotalIssued;
        })
        for (var i = 0, len = obj.data.length; i < len; i++) {
            obj.data[i].banner = packetIndexData[obj.data[i].PacketStockId].materialurl;
            obj.data[i].logo = packetIndexData[obj.data[i].PacketStockId].materialUrl1;
            obj.data[i].clickurl = packetIndexData[obj.data[i].PacketStockId].clickurl;
        }
        $id('portalCouponList').innerHTML = $formatArray($id('portalCouponTpl').innerHTML, obj.data);
    }
    $focusAd({idList: [117], autoRender: false, staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpt/2012/3/adcpt18.js", onSuccess: function () {
        var data = this.dataList[0].ad, batchid = [], userData1;
        for (var i = 0, len = data.length; i < len; i++) {
            userData1 = data[i].userData1;
            if (userData1) {
                batchid.push(userData1);
                packetIndexData[userData1] = data[i];
            }
        }
        $loadScript('http://party.paipai.com/cgi-bin/cxpl_query_redpacket?batchid=' + batchid.join('|'));
    }});
}, hotsale: function () {
    var api = "http://express.paipai.com/tws/rank/RankBatchQuery?rankIds=48050&callback=commentListCallBack&t=" + (+new Date());
    window.commentListCallBack = function (obj) {
        var list = obj.data[0].itemData, html = '', tpl = $getStdTemplate('', 'hotsale');
        for (var i = 0, len = list.length; i < 7; i++) {
            html += $formatJson(tpl.template1, list[i]);
        }
        $id("hotsaleList").innerHTML = html;
    };
    $loadScript(api, "hotsale", {charset: "utf-8"});
}, tiao: function () {
    $biFocusAd({idList: [369], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2013/1/adcpc369.js", templateIdList: ["portalTiaoTpl"], pageSize: 1, onSuccess: function (o) {
        var data = this.dataList, listHtml = '';
        if (data[0] && data[0].locations.length) {
            var arr = data[0].locations;
            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i].plans[0].clickurl = arr[i].plans[0].clickurl + '&ptag=20084.189.' + (i + 1);
                listHtml += $formatArray(this.templateIdList[0], arr[i].plans);
            }
        }
        $id('portalTiaoList').innerHTML = listHtml;
    }});
}, hotSearch: function () {
    var api = "http://www.paipai.com/tjw/hotsearch/hotsearch.js?t=" + (+new Date());
    window.rankSearchCallback = function (obj) {
        var list = obj.data[0].itemData, html = '', tpl = $getStdTemplate('', 'homeHotSearch');
        for (var i = 0; i < 10; i++) {
            html += $formatJson(tpl.template1, list[i]);
        }
        $id("homeHotSearch").innerHTML = html;
    };
    $loadScript(api);
}, submitSearchForm: function (sw, rd) {
    var searchForm = document.forms["searchForm"];
    searchForm["KeyWord"].value = sw;
    searchForm["PTAG"].value = rd;
    searchForm.submit();
}, portalGg: function () {
    $scroll({id: 'portalGg', func: function () {
        $biFocusAd({idList: [112], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2012/7/adcpc112.js", templateIdList: [
            ["portalGgTpl"]
        ], contentList: [
            [$id("portalGg")]
        ], pageSize: 3});
    }});
}, brandsale: function (config) {
    var option = {tpl: $getStdTemplate('', 'brandsale').template1, titleId: 'brandsaleTab', titleTag: "li", tag: 'data-tag', contentId: 'brandsaleContainer', day: 7, imgWidth: 106}
    $extend(option, config);
    var data = {}, counter = 0, aTag = [];
    var d = new Date(), end = parseInt(new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1) / 1000), begin = end - 3600 * 24 * option.day;
    $focusAd({idList: [18], autoRender: false, staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpt/2012/3/adcpt18.js", beginTime: begin, endTime: end, onSuccess: function () {
        storeData(this.dataList[0].ad);
    }});
    function storeData(list) {
        for (var i = 0, len = list.length; i < len; i++) {
            var obj = {'url': list[i].clickurl, 'img': list[i].materialUrl1, 'name': list[i].userData1, 'discount': list[i].materialDesc}
            if (list[i].endshowtime == end) {
                var day = 'd0';
                data[day] = data[day] ? data[day] : [];
                data[day].push(obj);
            }
            if (list[i].endshowtime < end && list[i].beginshowtime >= begin) {
                var cate = 'id' + list[i].resourceid;
                data[cate] = data[cate] ? data[cate] : [];
                data[cate].push(obj);
            }
        }
        ;
        allLoaded();
    }

    function allLoaded() {
        var html = '';
        var tabLi = $child($id(option.titleId), option.titleTag)
        for (var i = 0, len = tabLi.length; i < len; i++) {
            var tag = tabLi[i].getAttribute(option.tag);
            html += $formatJson(option.tpl, data[tag]);
        }
        $id(option.contentId).innerHTML = html;
        $slider({effect: "none", initIndex: 0, titleId: option.titleId, titleTag: "li", contentId: option.contentId, contentTag: "ul", timeLag: 100, func: function (i) {
        }, funcTabInit: function (i, dom) {
        }});
    }
}, bindCPC: function () {
    var titleId = 'portalCpcTab', contentId = 'portalCpcList', titleList = $child($id(titleId, 'li')), contentList = $child($id(contentId), 'li');
    var addItem = function (dataId, len, oldList) {
        var cgiMap = {'33574': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229347832031.js', '33581': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229699152032.js', '33582': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229729452033.js', '33583': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229509112034.js', '33584': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229493212035.js', '33585': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229880862036.js', '33586': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229213382037.js', '33587': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239846872038.js', '33588': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239400572039.js', '33589': 'http://www.paipai.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239895822040.js'};
        var cgi = cgiMap[dataId];
        var callback = cgi.replace(/^.*\//, '').replace('.js', '');
        window[callback] = function (obj) {
            var newList = obj.data.adList;
            for (var i = 0; i < len; i++) {
                if (newList[i]) {
                    newList[i].clickUrl = 'http://auction1.paipai.com/' + newList[i].id + '?src=home';
                    newList[i].commFullName = newList[i].recmdRegName;
                    newList[i].uploadPicUrl1 = newList[i].img160x160;
                    newList[i].newPrice = (newList[i].newPrice - 0) * 100;
                    oldList.push(newList[i]);
                }
            }
            buildDom(dataId, oldList);
        }
        $loadScript(cgi);
    }
    var buildDom = function (adsbannerid, data) {
        var html = $formatArray($id('cpcTpl').innerHTML, data);
        var container = $id('portalCpcList' + adsbannerid);
        container.innerHTML = html;
        container.setAttribute('data-loaded', '1');
    }
    var getList = function (adsbannerid) {
        $martCpc({idList: [adsbannerid], templateType: "json", pc: 10, onSuccess: function () {
            var data = this.dataList[0].area[0].tabs;
            if (this.pc - data.length) {
                addItem(this.idList[0], this.pc - data.length, data);
            } else {
                buildDom(this.idList[0], data);
            }
        }});
    };
    $scroll({id: titleId, func: function () {
        $slider({effect: "none", auto: false, initIndex: Math.floor(Math.random() * titleList.length), titleId: titleId, titleTag: "li", contentId: contentId, contentTag: "li", timeLag: 100, func: function (i) {
            contentList[i].getAttribute('data-loaded') != '1' && getList(titleList[i].getAttribute('data-adsbannerid'));
        }});
    }});
}, starSeller: function () {
    window.callbackStarSeller = function (data) {
        $id('starSeller').innerHTML = $formatJson($getStdTemplate('', 'starSeller').template1, data.itemlist[0]);
    };
    $loadScript('http://bbs.paipai.com/api.php?mod=js&bid=374&datetype=jsonp&callback=callbackStarSeller');
}, loadImg: function () {
    var aLazyBox = [];
    aLazyBox.push("hotsaleList");
    aLazyBox.push("portalTiaoList");
    aLazyBox.push("portalGg");
    for (var i = 0; i < 8; i++) {
        aLazyBox.push("portalFloor" + i);
    }
    for (var n = 0, nLazyBoxLen = aLazyBox.length; n < nLazyBoxLen; n++) {
        $scroll({id: aLazyBox[n], func: function (opt) {
            $loadImg($id(opt.id));
        }});
    }
}, categoryNav: function () {
    $listHoverDetail({detailContainer: $id("ppCategoryDetail"), listContainer: $id("ppCategoryList"), listItem: $child($id("ppCategoryList"), "li"), isAjaxLoad: true, delayTime: 100, eventShow: function () {
        if (!this.listContainerOffsetTop) {
            this.listContainerOffsetTop = $getY(this.listContainer);
        }
        var offsetHeight = $getPageScrollHeight() - this.listContainerOffsetTop;
        this.detailContainer.style.height = this.detailList[this.currentIndex].offsetHeight + "px";
        this.detailContainer.style.top = offsetHeight > 0 ? offsetHeight + 10 + "px" : "0";
        var pointer = $id("ppCategoryDetailPointer");
        pointer.style.top = this.listItem[this.currentIndex].offsetTop + 8 + "px";
        $delClass(pointer, "hide");
        $delClass($id('ppCategoryDetailShadow'), "hide");
    }, eventHide: function () {
        $addClass($id('ppCategoryDetailShadow'), "hide");
        $addClass($id('ppCategoryDetailPointer'), 'hide');
        this.detailContainer.style.height = this.listContainer.offsetHeight - 2 + "px";
    }, initContent: function () {
        var option = this;
        window.showCategoryDetail = function (obj) {
            option.detailContainer.innerHTML = obj.html;
            option.initEvent();
        };
        $loadScript('http://static.paipaiimg.com/sinclude/common/pp_category_detail_js.shtml');
    }});
}, dcBanner: function () {
    var elBannerS = $id('dcBannerS'), elBannerB = $id('dcBannerB'), t = 5000;
    if (!elBannerS || !elBannerB)return;
    var cb = {'showSmallBanner': function () {
        $animation("dcBannerS", {"height": 80, "opacity": 1});
    }, 'showBigBanner': function () {
        $animation("dcBannerB", {"height": 300}, {speed: 300, ease: "easeIn"});
    }, 'hideSmallBanner': function () {
        $animation("dcBannerS", {"height": 0, "opacity": 0});
    }, 'hideBigBanner': function () {
        $animation("dcBannerB", {"height": 0}, {speed: 300, ease: "easeout"});
    }};
    var stHideBanner = setTimeout(function () {
        cb.hideBigBanner();
        cb.showSmallBanner()
    }, t);
    var stHideBanner;
    $addEvent(elBannerB, 'mouseover', function () {
        clearTimeout(stHideBanner);
    });
    $addEvent(elBannerB, 'mouseout', function () {
        clearTimeout(stHideBanner);
        stHideBanner = setTimeout(function () {
            cb.hideBigBanner();
            cb.showSmallBanner()
        }, t);
    });
    $addEvent($id('dcBtnHide'), 'click', function () {
        clearTimeout(stHideBanner);
        cb.hideBigBanner();
        cb.showSmallBanner();
    });
    $addEvent($id('dcBtnShow'), 'click', function () {
        cb.hideSmallBanner();
        cb.showBigBanner();
    });
}};
PP.index.v2012.init = function () {
    this.areaCheck();
    this.dcBanner();
    this.portalTopGg();
    this.portalSilder();
    this.bindShop();
    this.todaySale();
    this.portalNotice();
    this.recommend.init({tplViewed: $getStdTemplate('', 'recommend').template1, tplRecom: $getStdTemplate('', 'recommend').template2, tplGuessLike: $getStdTemplate('', 'recommend').template4, btnChange: 'moreRecommend', onInitShow: function (n) {
        var el = $id('portalRecommend');
        if (n > 0) {
            el.className = 'portal-recommend portal-recommend-1';
        } else {
            el.className = 'portal-recommend portal-recommend-0';
        }
    }});
    this.portalFloor();
    this.portalGroupon();
    this.portalCoupon();
    this.brandsale();
    this.hotsale();
    this.tiao();
    this.hotSearch();
    this.portalGg();
    this.bindCPC();
    this.starSeller();
    this.loadImg();
    this.categoryNav();
    $aioSubscibe();
};
PP.index.v2012.init();
window['PP.index.v2012'] = '20174:20130329:20130722102015';
window['PP.index.v2012.time'] && window['PP.index.v2012.time'].push(new Date());