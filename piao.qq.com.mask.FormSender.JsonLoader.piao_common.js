(function (window) {
    function antiClickJacking() {
        document.write = "";
        window.top.location = window.self.location;
        setTimeout(function () {
            document.body.innerHTML = "";
        }, 0);
        window.self.onload = function () {
            document.body.innerHTML = "";
        };
    }

    function isSpecial() {
        var paths = ['dianying/buy.html', 'yanchu/buy.html', 'jingdian/buy.html'], pname = location.pathname, ret = false;
        for (var i = 0, j = paths.length; i < j; i++) {
            if (pname.indexOf(paths[i]) > -1) {
                ret = true;
                break;
            }
        }
        return ret;
    }

    if (window.top !== window.self && isSpecial()) {
        try {
            if (window.top.location.host) {
            } else {
                antiClickJacking();
            }
        } catch (ex) {
            antiClickJacking();
        }
    }
})(window);
(function () {
    if (typeof(QZFL) !== "object") {
        return;
    }
    var flag, imgs, len, m = "init_src", f = ["img", "iframe"];

    function o() {
        if (!flag) {
            flag = setTimeout(loadImgs, 30);
        }
    }

    function inView(el) {
        var r = QZFL.dom.getScrollTop() + QZFL.dom.getClientHeight();
        var t = el.offsetTop;
        while (el = el.offsetParent) {
            t += el.offsetTop;
        }
        return t <= r;
    }

    function loadImgs() {
        if (len < 1) {
            QZFL.event.removeEvent(window, "scroll", o);
            QZFL.event.removeEvent(window, "resize", o);
            return;
        }
        var attr;
        for (var s = 0, r = imgs.length; s < r; s++) {
            if (!imgs[s]) {
                continue;
            }
            attr = imgs[s].getAttribute(m);
            if (inView(imgs[s]) && attr) {
                imgs[s].src = attr;
                imgs[s].removeAttribute(m);
                delete imgs[s];
                len--;
            }
        }
        flag = 0;
    }

    function init(v) {
        v = v || {};
        if (typeof v != "object") {
            return;
        }
        var s;
        if (QZFL.object.getType(v) == "array") {
            s = v || f;
        } else {
            s = v.tagNames || f;
        }
        flag = 0;
        imgs = [];
        len = 0;
        for (var u = 0, t = s.length; u < t; u++) {
            var x = document.getElementsByTagName(s[u]);
            for (var y = 0, r = x.length; y < r; y++) {
                if (typeof x[y] == "object" && x[y].getAttribute(m)) {
                    imgs.push(x[y]);
                    len++;
                }
            }
        }
        QZFL.event.addEvent(window, "scroll", o);
        QZFL.event.addEvent(window, "resize", o);
        loadImgs();
    }

    QZFL.lazyLoad = {init: init}
})();
String.prototype.trim = function (r) {
    r = r || /(^\s+)|(\s+$)/g;
    return this.replace(r, "");
};
String.prototype.format = function () {
    var a = arguments;
    var data = (a.length == 1 && typeof(a[0]) == 'object') ? a[0] : a;
    return this.replace(/\{([\d\w]+)\}/g, function (m, n) {
        return data[n] !== undefined ? data[n].toString() : m;
    });
};
String.prototype.toJson = function (lvl_1, lvl_2, fn) {
    fn = QQVIP.object.getType(fn) == "function" ? fn : function (v) {
        return v;
    };
    var newar = this.split(lvl_1);
    var ar = [];
    for (var i = 0, l = newar.length; i < l; i++) {
        if (newar[i].trim() !== '') {
            ar.push(newar[i]);
        }
    }
    var r = {};
    QQVIP.object.each(ar, function (i) {
        var a = i.split(lvl_2);
        if (a[1] !== undefined) {
            r[a[0]] = fn(a[1]);
        }
    });
    return r;
};
String.prototype.html = function (isdecode) {
    var ar = ['&', '&amp;', '<', '&lt;', '>', '&gt;', ' ', '&nbsp;', '"', '&quot;', "'", '&#039;', '\\r', '<br>', '\\n', '<br>', '/', '&#047;', '\\\\', '&#092;'];
    if (isdecode) {
        ar.reverse();
    }
    for (var i = 0, r = this; i < ar.length; i += 2) {
        r = r.replace(new RegExp(ar[i], 'g'), ar[1 + i]);
    }
    return r;
};
String.prototype.realLength = function (t) {
    t = t || 'utf8';
    var inc = (t == "utf8") ? 3 : 2;
    var len = 0;
    for (var i = 0, j = this.length; i < j; i++) {
        if (this.charCodeAt(i) > 127) {
            len += inc;
        } else {
            len++;
        }
    }
    return len;
};
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return-1;
    };
}
Date.prototype.format = function () {
    var arg = arguments;
    if (arg.length == 1 && typeof arg[0] == 'string') {
        var str = arg[0];
        var reg = /(yyyy|yy|mm|m|dd|d|hh|h|MM|M|ss|s)/gi;
        var d = {yyyy: this.getFullYear(), yy: this.getFullYear().toString().match(/\d{2}$/), mm: (this.getMonth() + 1) < 10 ? ('0' + (this.getMonth() + 1)) : (this.getMonth() + 1), m: (this.getMonth() + 1), dd: this.getDate() < 10 ? ('0' + this.getDate()) : this.getDate(), d: this.getDate(), hh: this.getHours() < 10 ? ('0' + this.getHours()) : this.getHours(), h: this.getHours(), MM: this.getMinutes() < 10 ? ('0' + this.getMinutes()) : this.getMinutes(), M: this.getMinutes(), ss: this.getSeconds() < 10 ? ('0' + this.getSeconds()) : this.getSeconds(), s: this.getSeconds()};
        str = str.replace(reg, function () {
            return d[arguments[1]];
        });
        return str;
    }
};
(function () {
    var previousPIAO = window.PIAO;
    window.PIAO = {WGPvsrc: '1046', curCity: '', curCityName: '', CurCityPY: '', namespace: function (name) {
        var i, nms = name.split("."), o = this;
        for (i = (nms[0] === 'PIAO') ? 1 : 0; i < nms.length; i++) {
            o[nms[i]] = o[nms[i]] || {};
            o = o[nms[i]];
        }
        return o;
    }, noConflict: function () {
        window.PIAO = previousPIAO;
        return this;
    }};
    PIAO.initImgSrc = function (img) {
        var src, init_src, ret = false;
        if (!img) {
            return false;
        }
        src = img.getAttribute('src');
        if (src) {
            return src;
        }
        init_src = img.getAttribute('init_src');
        if (!init_src) {
            return false;
        }
        img.setAttribute('src', init_src);
        return init_src;
    };
    var ptScript = document.createElement('script');
    ptScript.setAttribute('src', 'http://imgcache.qq.com/ptlogin/ac/v9/js/pt_utility.js');
    var head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(ptScript);
    var previousQuickLogin = QQVIP.quickLogin;
    QQVIP.quickLogin = (function () {
        var CONST_PT_CGI = 'http://ui.ptlogin2.qq.com/cgi-bin/login?';
        var CONST_LOGIN_PROXY = 'http://imgcache.qq.com/ac/club/qqvip/v2.0/sLoginProxy_2.0.html';
        var CONST_DOMAIN = 'qq.com';
        var _pt2 = null;
        var _mask = null;
        var _mask_obj = null;
        var _valid = null;
        var _w = null;
        var _h = null;
        var _afterClose = null;
        var _beforeResize = null;
        var _afterResize = null;
        var _encode = encodeURIComponent;

        function _setCenter() {
            if (!_valid) {
                return;
            }
            try {
                _pt2.style.top = (window.innerHeight / 2 + window.pageYOffset) - _h / 2 + "px";
                _pt2.style.left = (window.innerWidth / 2 + window.pageXOffset) - _w / 2 + "px";
            } catch (e) {
                var _docElement = document.documentElement;
                if (!document.body.scrollTop) {
                    _pt2.style.top = (_docElement.offsetHeight / 2 + _docElement.scrollTop) - _h / 2 + "px";
                    _pt2.style.left = (_docElement.offsetWidth / 2 + _docElement.scrollLeft) - _w / 2 + "px";
                } else {
                    _pt2.style.top = (_docElement.offsetHeight / 2 + document.body.scrollTop) - _h / 2 + "px";
                    _pt2.style.left = (_docElement.offsetWidth / 2 + document.body.scrollLeft) - _w / 2 + "px";
                }
            }
            setTimeout(_setCenter, 500);
        }

        return{close: function () {
            if (_pt2) {
                _valid = false;
                _pt2.style.display = "none";
                if (_mask_obj) {
                    _mask_obj.style.display = "none";
                }
                if (typeof _afterClose == 'function') {
                    _afterClose(_pt2);
                }
            }
        }, resize: function (w, h) {
            if (_pt2) {
                if (typeof _beforeResize == 'function') {
                    _beforeResize(_pt2);
                }
                _valid = true;
                _w = w;
                _h = h;
                _pt2.style.width = w + "px";
                _pt2.style.height = h + "px";
                _pt2.getElementsByTagName("iframe")[0].style.height = h + "px";
                if (_mask) {
                    if (!_mask_obj) {
                        var n = document.createElement("div");
                        n.id = "_ptlogin2_mask_body";
                        n.style.position = "absolute";
                        n.style.background = "#333333";
                        n.style.opacity = "0.3";
                        n.style.filter = "alpha(opacity=30)";
                        n.style.zIndex = "999";
                        n.style.width = document.body.scrollWidth + "px";
                        n.style.height = document.body.scrollHeight + "px";
                        n.style.top = "0px";
                        n.style.left = "0px";
                        document.getElementsByTagName("body")[0].appendChild(n);
                        _mask_obj = n;
                    } else {
                        _mask_obj.style.display = "block";
                    }
                }
                _setCenter(w, h);
                if (typeof _afterResize == 'function') {
                    _afterResize(_pt2);
                }
            }
        }, open: function (obj) {
            obj = obj || {};
            var jumpURL = obj.jumpURL || location.href;
            var isQuick = obj.isQuick || false;
            var isMask = obj.isMask || false;
            var sTarget = 'top';
            if (obj.target == 'self' || obj.target == 'top' || obj.target == 'parent') {
                sTarget = obj.target;
            }
            var jump_name = obj.jumpName || 'clubcommjump';
            var appid = obj.appId || '8000212';
            if (typeof obj.onLoginCb == 'function') {
                window.ptlogin2_onLogin = obj.onLoginCb;
            }
            if (typeof obj.onResetCb == 'function') {
                window.ptlogin2_onReset = obj.onResetCb;
            }
            if (typeof obj.onSuccessCb == 'function') {
                window.ptlogin2_onSuccess = obj.onSuccessCb;
            }
            if (typeof obj.afterClose == 'function') {
                _afterClose = obj.afterClose;
            }
            if (typeof obj.beforeResize == 'function') {
                _beforeResize = obj.beforeResize;
            }
            if (typeof obj.afterResize == 'function') {
                _afterResize = obj.afterResize;
            }
            document.domain = CONST_DOMAIN;
            if (!_pt2) {
                var n = document.createElement("div");
                n.id = "_ptlogin2_div_container";
                n.style.position = "absolute";
                n.style.zIndex = "1000";
                n.style.width = "1px";
                n.style.height = "1px";
                n.style.top = "1px";
                n.style.left = "1px";
                n.innerHTML = '<iframe frameborder="no" scrolling="no" width="100%" height="100%" src="#"></iframe>';
                document.getElementsByTagName("body")[0].appendChild(n);
                _pt2 = n;
            }
            _pt2.style.display = "block";
            var arrURL = [];
            arrURL.push(CONST_PT_CGI);
            var objParm = {link_target: 'blank', target: 'self', appid: appid, f_url: 'loginerroralert', daid: '76'};
            if (typeof obj.style != 'undefined') {
                objParm['style'] = obj.style;
            }
            if (typeof obj.hideTitleBar != 'undefined') {
                objParm['hide_title_bar'] = obj.hideTitleBar;
            }
            if (typeof obj.hideCloseIcon != 'undefined') {
                objParm['hide_close_icon'] = obj.hideCloseIcon;
            }
            if (typeof obj.bgColor != 'undefined') {
                objParm['bgcolor'] = obj.bgColor;
            }
            if (typeof obj.bgImage != 'undefined') {
                objParm['bgimage'] = obj.bgImage;
            }
            if (typeof obj.fontColor != 'undefined') {
                objParm['fontcolor'] = obj.fontColor;
            }
            if (typeof obj.title != 'undefined') {
                objParm['title'] = obj.title;
            }
            if (typeof obj.loginText != 'undefined') {
                objParm['login_text'] = obj.loginText;
            }
            if (typeof obj.loginImg != 'undefined') {
                objParm['login_img'] = obj.loginImg;
            }
            if (typeof obj.resetImg != 'undefined') {
                objParm['reset_img'] = obj.resetImg;
            }
            if (typeof obj.uin != 'undefined') {
                objParm['uin'] = obj.uin;
            }
            if (typeof obj.hideUinTip != 'undefined') {
                objParm['hide_uin_tip'] = obj.hideUinTip;
            }
            if (isQuick) {
                objParm['qlogin_jumpname'] = jump_name;
                objParm['qlogin_auto_login'] = 0;
                objParm['qtarget'] = 'self';
                objParm['qlogin_param'] = _encode("target=" + sTarget + "&jump_url=" + _encode(jumpURL));
            }
            objParm['s_url'] = _encode(jumpURL);
            objParm['target'] = sTarget;
            for (var key in objParm) {
                if (objParm.hasOwnProperty(key)) {
                    arrURL.push(key + '=' + objParm[key] + '&');
                }
            }
            _pt2.getElementsByTagName('iframe')[0].src = arrURL.join('');
            _mask = !!isMask;
        }};
    })();
    window.ptlogin2_onClose = QQVIP.quickLogin.close;
    window.ptlogin2_onResize = QQVIP.quickLogin.resize;
    PIAO.login = {open: function (url) {
        url = url || location.href;
        var pos = url.indexOf('#');
        if (pos != -1) {
            url = url.substr(0, pos);
        }
        QQVIP.quickLogin.open({'jumpURL': url});
    }, is: function () {
        var u = QQVIP.cookie.get("uin"), k = QQVIP.cookie.get("skey");
        if (!u || !k) {
            u = QQVIP.cookie.get("p_uin");
            k = QQVIP.cookie.get("p_skey");
            if (!u || !k) {
                return false;
            }
        }
        return u.replace(/^[o0]+/i, "");
    }, quit: function () {
        var uin = PIAO.login.is();
        QQVIP.cookie.del("actnick_" + uin, location.host, '/');
        QQVIP.cookie.del("piao_music_" + uin, location.host, '/');
        QQVIP.cookie.del("piao_club_" + uin, location.host, '/');
        QQVIP.cookie.del("uin", 'qq.com', '/');
        QQVIP.cookie.del("skey", 'qq.com', '/');
        if (window['pt_utility']) {
            pt_utility.logout(1, function () {
                location.reload();
            });
        } else {
            PIAO.JsLoader(CONST_PT_UTILITY_URL, function () {
                pt_utility.logout(1, function () {
                    location.reload();
                });
            }, 'utf-8', false);
        }
    }, loginPaipai: function () {
    }};
    PIAO.cookie = {set: function (name, value, exp, host) {
        exp = exp || '';
        host = host || 'piao.qq.com';
        if (name == "piao_city" || name == "piao_bank") {
            exp = 4220;
            if (name == "piao_city") {
                host = "qq.com";
            }
        }
        QZFL.cookie.set(name, encodeURIComponent(value), host, '/', exp);
    }, get: function (name) {
        return decodeURIComponent(QQVIP.cookie.get(name));
    }, del: function (name) {
        QQVIP.cookie.del(name, location.host, '/');
    }};
    PIAO.openWindow = function (url, o, charset, mtd) {
        var f = document.createElement("form");
        document.body.appendChild(f);
        f.action = url;
        f.target = "_blank";
        f.method = mtd || "GET";
        f.charset = charset || 'utf-8';
        var html = [];
        if (o) {
            for (var key in o) {
                html.push('<input type="hidden" value="' + o[key] + '" name="' + key + '" />');
            }
        }
        f.innerHTML = html.join('');
        f.submit();
        QZFL.dom.removeElement(f);
    };
    PIAO.getTemplate = function (id) {
        var dom = document.getElementById(id);
        if (!dom) {
            return false;
        }
        var listtemp = dom.innerHTML;
        listtemp = listtemp.toString().replace(/[\n\r]/g, '');
        listtemp = listtemp.replace(/.*<!--template_begin>(.*)<template_end-->.*/g, "$1");
        return listtemp;
    };
    PIAO.getHrefArgs = function () {
        return location.search.substring(1).toJson('&', '=', function (v) {
            try {
                return decodeURIComponent(v);
            } catch (e) {
            }
        });
    };
    PIAO.initIpt = function (ipt) {
        if (!ipt) {
            return false;
        }
        var initVal = ipt.getAttribute('init_val');
        ipt.value = initVal;
        var _on = function () {
            var val = ipt.value.trim();
            if (val == initVal) {
                ipt.value = "";
            }
        };
        var _off = function () {
            if (ipt.value === '') {
                ipt.value = initVal;
            }
        };
        QZFL.event.addEvent(ipt, 'focus', _on);
        QZFL.event.addEvent(ipt, 'blur', _off);
        this.getVal = function () {
            var val = ipt.value.trim();
            if (val === '' || val == initVal) {
                return'';
            } else {
                return val;
            }
        };
    };
    PIAO.copyText = function (txt, cbf) {
        var clip = "";
        var trans = "";
        if (window.clipboardData && window.clipboardData.setData) {
            if (!window.clipboardData.setData("Text", txt)) {
                PIAO.PopMsg.msg("复制文本内容失败!");
                return false;
            }
        } else if (QQVIP.userAgent.opera && navigator.mimeTypes["application/x-shockwave-flash"]) {
            var d = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(d);
            d.innerHTML = "<embed src='/flash/clipboard.swf' FlashVars='clipboard=" + escape(txt) + "' width='0' height='0' type='application/x-shockwave-flash'></embed>";
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                PIAO.PopMsg.msg('您的FireFox限制剪贴板操作!请打开 about:config 页面开启此功能!');
                return false;
            }
            try {
                clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
                trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            } catch (e) {
                return false;
            }
            trans.addDataFlavor("text/unicode");
            var oStr = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            oStr.data = txt;
            trans.setTransferData("text/unicode", oStr, txt.length * 2);
            var clipid = "";
            try {
                clipid = Components.interfaces.nsIClipboard;
            } catch (e) {
                return false;
            }
            clip.setData(trans, null, clipid.kGlobalClipboard);
        } else {
            PIAO.PopMsg.msg("对不起，该功能只支持IE，firefox和opera浏览器！");
            return false;
        }
        if (typeof(cbf) == 'function') {
            cbf();
        }
    };
    PIAO.Checker = {qquin: function (uin) {
        if (this.num(String(uin))) {
            uin = parseInt(uin, 10);
            if (uin > 10000 && uin < 4247483647) {
                return true;
            }
        }
        return false;
    }, num: function (s) {
        if (/^\d+$/.test(s)) {
            return true;
        } else {
            return false;
        }
    }, mobile: function (strNum) {
        var partrn = /^1\d{10}$/;
        if (!partrn.test(strNum)) {
            return false;
        }
        return true;
    }, phone: function (strNum) {
        var partrn = /^(0\d{2,3}-)?\d{5,8}(-\d{1,8})?$/;
        if (!partrn.test(strNum)) {
            return false;
        }
        return true;
    }, name: function (strName) {
        var partrn = /^[\u4e00-\u9fa5a-z]{2,15}$|^[a-z]{2,15}$/i;
        if (partrn.test(strName)) {
            return true;
        } else {
            return false;
        }
    }, email: function (strEmail) {
        var patrn = /^([a-z0-9])+(([a-z0-9])+[\.]?[_]?)*@(([a-z0-9])+[\.]){1,2}[a-z]{2,3}$/i;
        if (patrn.test(strEmail)) {
            return true;
        } else {
            return false;
        }
        return false;
    }, postcode: function (strZip) {
        if (this.num(strZip) && strZip.length == 6) {
            return true;
        } else {
            return false;
        }
    }, string: function (str) {
        var special_string = /[&|\'|\"|<|>|#|%|@|*|~|\$|\\|=]+/;
        return!special_string.test(str);
    }};
    PIAO.getSelTxt = function (sel_id) {
        var sel = document.getElementById(sel_id);
        if (!sel) {
            return false;
        }
        var index = sel.selectedIndex;
        if (index > 0) {
            return sel.options[index].innerHTML;
        } else {
            return false;
        }
    };
    PIAO.getStringTime = function (str) {
        str = String(str);
        if (!/^\d{14}$/.test(str)) {
            return'';
        }
        return str.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/g, "$1-$2-$3 $4:$5:$6");
    };
    PIAO.getObjectTime = function (str, o) {
        str = String(str);
        o = o || {};
        if (str.length != 14) {
            return false;
        }
        var yy = str.substr(0, 4);
        var mm = str.substr(4, 2);
        var dd = str.substr(6, 2);
        var date = new Date(yy, parseInt(mm, 10) - 1, dd);
        var ww_arr = ['日', '一', '二', '三', '四', '五', '六'];
        var w = date.getDay();
        o['date'] = yy + '-' + mm + '-' + dd;
        o['week'] = ww_arr[w];
        o['time'] = str.substr(8, 2) + ":" + str.substr(10, 2);
        return o['date'] + '  周' + o['week'] + " " + o['time'];
    };
    PIAO.GoTop = function (el_id) {
        function go() {
            if (QQVIP.userAgent.chrome) {
                document.body.scrollTop = 0;
            } else {
                QZFL.dom.setScrollTop(0);
            }
        }

        var el = document.getElementById(el_id);
        if (el) {
            QQVIP.event.addEvent(window, 'scroll', function () {
                var s_top = QZFL.dom.getScrollTop();
                if (s_top > 0) {
                    var top = QZFL.dom.getClientHeight() + s_top;
                    el.style.top = (parseInt(top, 10) - 80) + 'px';
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });
            QQVIP.event.addEvent(el, 'click', function () {
                go();
            });
        }
    };
    PIAO.checkIpt = function (map, o) {
        o = o || {};
        map = map || {};
        for (var key in map) {
            var arr = [];
            var els = null;
            if (map[key]['name']) {
                els = document.getElementsByName(map[key]['name']);
                if (els) {
                    var val = '';
                    for (var i = 0, l = els.length; i < l; i++) {
                        val = els[i].value.trim();
                        if (val !== '') {
                            arr.push(val);
                        }
                    }
                }
            } else {
                arr.push(map[key]['val']);
            }
            o[key] = arr.join(map[key]['join']);
            if ((o[key] === '' && map[key]['null'] === 0) || o[key] !== '' && (!PIAO.Checker[map[key]['reg']](o[key]) || o[key].length > map[key]['maxlen'])) {
                if (els) {
                    els[0].focus();
                }
                return map[key]['info'];
            }
        }
        return true;
    };
    PIAO.getInc = function (base) {
        var i = base;
        return function () {
            return i++;
        };
    };
    PIAO.orderByField = function (list, filed, inc) {
        var v1, v2;
        inc = inc || false;
        function compare(val1, val2) {
            v1 = val1[filed];
            v2 = val2[filed];
            if (v1 < v2) {
                if (!inc) {
                    return 1;
                } else {
                    return-1;
                }
            } else if (v1 > v2) {
                if (!inc) {
                    return-1;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        }

        list.sort(compare);
    };
})();
(function (PIAO) {
    var crossAjaxCgiId = 'proxy_cajax_ifm_cgi_' + String(Math.random() * 1000000).substring(0, 6), crossAjaxPhpId = 'proxy_cajax_ifm_php_' + String(Math.random() * 1000000).substring(0, 6);
    PIAO.crossPorxy = {CGI: 'http://cgi.piao.qq.com/proxy.html', PHP: 'http://php.piao.qq.com/proxy.html'};
    QQVIP.security.getOldAntiCSRFToken = QQVIP.security.getAntiCSRFToken;
    QZFL.security.getAntiCSRFToken = function () {
        var key = QZFL.cookie.get("p_skey") || QZFL.cookie.get("skey");
        return QQVIP.security.getOldAntiCSRFToken({'skey': key});
    };
    PIAO.FormSender = function (url, o, cbk, type, charset) {
        if (!url) {
            return false;
        }
        document.domain = "qq.com";
        type = type || "POST";
        charset = charset || "utf-8";
        var date0 = new Date();
        var callback = function (ret, data) {
            if (cbk && QQVIP.object.getType(cbk) == "function") {
                cbk(ret, data);
            }
            if (ret && data && ((typeof(data['sub']) != 'undefined' || data['ret']) != 'undefined' || typeof(data['i_ret']) != 'undefined')) {
                var date1 = new Date();
                PIAO.errReport(url, o, (typeof(data['sub']) == 'object' ? data['sub']['iSubCode'] : data['sub']) || data['srv_subcode'] || data['ret'] || data['i_ret'] || 0, date1 - date0);
            }
        };
        o = o || {};
        o['g_tk'] = QQVIP.security.getAntiCSRFToken();
        o['_'] = Math.random();
        var sender = new QZFL.FormSender(url, type, o, charset);
        sender.onSuccess = function (data) {
            if (!data) {
                callback(false, {'ret': -1});
            } else {
                callback(true, data);
            }
        };
        sender.onError = function () {
            callback(false, {'ret': -2});
        };
        sender.onTimeout = function () {
            callback(false, {'ret': -3});
        };
        sender.send();
    };
    PIAO.JsonLoader = function (url, cbk, charset, type) {
        if (!url) {
            return false;
        }
        type = type === false ? false : true;
        charset = charset || 'utf-8';
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += ('g_tk=' + QQVIP.security.getAntiCSRFToken() + '&_=' + Math.random());
        var date0 = new Date();
        var jsonLoader = new QQVIP.JSONGetter(url, null, null, charset, type);
        var callback = function (ret, data) {
            if (cbk && QQVIP.object.getType(cbk) == "function") {
                cbk(ret, data);
            }
            if (ret && data && ((typeof(data['sub']) != 'undefined' || data['ret']) != 'undefined' || typeof(data['i_ret']) != 'undefined')) {
                var date1 = new Date();
                PIAO.errReport(url, {}, (typeof(data['sub']) == 'object' ? data['sub']['iSubCode'] : data['sub']) || data['srv_subcode'] || data['ret'] || data['i_ret'] || 0, date1 - date0);
            }
        };
        jsonLoader.onSuccess = function (data) {
            if (!data) {
                callback(false, {'ret': -1});
            } else {
                callback(true, data);
            }
        };
        jsonLoader.onError = function () {
            callback(false, {'ret': -2});
        };
        jsonLoader.onTimeout = function () {
            callback(false, {'ret': -3});
        };
        jsonLoader.send();
    };
    PIAO.JsLoader = function (url, callback, charset, g_tk) {
        g_tk = g_tk === false ? false : true;
        var jsl = new QZFL.JsLoader();
        jsl.onload = function () {
            if (callback && QQVIP.object.getType(callback) == "function") {
                callback();
            }
        };
        charset = charset || 'utf-8';
        if (g_tk) {
            url += url.indexOf('?') == -1 ? '?' : '&';
            url += ('g_tk=' + QQVIP.security.getAntiCSRFToken() + "&_=" + Math.random());
        }
        jsl.load(url, null, charset);
    };
    PIAO.XHRLoader = function (url, callback, o, type, charset) {
        try {
            charset = charset || 'utf-8';
            var xhr = new QZONE.XHR(url, null, type, o, true, true);
            xhr.charset = charset;
            o = o || {};
            o['g_tk'] = QQVIP.security.getAntiCSRFToken();
            o['t'] = Math.random();
            function xhrOnSuccess(res) {
                try {
                    for (var p in res) {
                        if (p == 'text') {
                            if (QQVIP.object.getType(callback) == 'function') {
                                callback(res[p]);
                            } else {
                                eval(res[p]);
                            }
                        }
                    }
                } catch (e) {
                }
            }

            xhr.onSuccess = xhrOnSuccess;
            xhr.send();
        } catch (e) {
        }
    };
    PIAO.crossAjax = function (url, o) {
        var proxyDomain = o.proxyDomain ? o.proxyDomain : PIAO.crossPorxy.CGI, ifrId = proxyDomain == PIAO.crossPorxy.CGI ? crossAjaxCgiId : crossAjaxPhpId, ifr = document.getElementById(ifrId), fload = function () {
            var params = [], func, rptArgs = {};
            var date0 = new Date();
            if ((typeof ifr.contentWindow == 'undefined') || (typeof ifr.contentWindow.ajax == 'undefined')) {
                window.setTimeout(fload, 100);
                return;
            }
            if (typeof o.data == 'object') {
                for (var key in o.data) {
                    params.push(key + '=' + o.data[key]);
                }
            }
            if (o.g_tk !== false) {
                params.push('g_tk=' + QQVIP.security.getAntiCSRFToken());
            }
            if (params.length > 0) {
                params = params.join('&');
                if (o.method === 'POST') {
                    o.data = params;
                    rptArgs = params.toJson('&', '=');
                } else {
                    url += ((url.indexOf('?') > -1 ? '&' : '?') + params);
                }
            }
            func = o.onSuccess;
            o.onSuccess = function (o) {
                func.call(window, o);
                if (o && o.responseText) {
                    var json = (new Function('return ' + o.responseText))();
                    if (json && (typeof json['sub'] != 'undefined' || typeof json['ret'] != 'undefined' || typeof json['i_ret'] != 'undefined')) {
                        var date1 = new Date();
                        try {
                            PIAO.errReport(url, rptArgs, (typeof(json['sub']) == 'object' ? json['sub']['iSubCode'] : json['sub']) || json['srv_subcode'] || json['ret'] || json['i_ret'] || 0, date1 - date0);
                        } catch (e) {
                        }
                    }
                }
            };
            ifr.contentWindow.ajax(url, o);
        };
        if (!ifr) {
            ifr = document.createElement("iframe");
            ifr.id = ifrId;
            ifr.style.width = ifr.style.height = "0";
            ifr.style.display = "none";
            ifr.src = proxyDomain;
            ifr.proxyReady = function () {
                fload();
            };
            document.body.appendChild(ifr);
        } else {
            fload();
        }
    };
})(PIAO);
(function (PIAO, window) {
    PIAO.isFromWG = function () {
        return false;
    };
    PIAO.pvReport = function () {
        if (pgvMain && QQVIP.object.getType(pgvMain) == "function") {
            var args = PIAO.getHrefArgs();
            var ref = args['pgv_ref'] || '';
            var pvsrc = PIAO.cookie.get('piao_pvsrc') || "";
            if (ref.indexOf('QQMusic') != -1) {
                var html = ref.substr(ref.indexOf('.') + 1) || '';
                pgvMain("", {"virtualRefDomain": "music.qq.com", "virtualRefURL": "/" + html + ".html", "useCookie": "false"});
            } else {
                switch (parseInt(pvsrc, 10)) {
                    case 1307:
                        pgvMain("", {"virtualRefDomain": "CLIENT.QQ", "virtualRefURL": "/imapp.html", "useCookie": "false"});
                        break;
                    case 1040:
                        pgvMain("", {"virtualRefDomain": "CLIENT.QQ", "virtualRefURL": "/qunapp.html", "useCookie": "false"});
                        break;
                    case 1022:
                        pgvMain("", {"virtualRefDomain": "CLIENT.PAI", "virtualRefURL": "/jingxuan.html", "useCookie": "false"});
                        break;
                    default:
                        pgvMain("", {"senseParam": PIAO.curCity});
                }
            }
        }
    };
    PIAO.hotClickReport = function (tag) {
        tag = String(tag).replace(/\./g, '_') || '';
        if (tag && pgvSendClick && QQVIP.object.getType(pgvSendClick) == "function") {
            var html = location.href.replace(/.*\/(.*)\.htm(l)*.*/g, "$1") || "INDEX";
            var ex = "ISD.PIAO." + html + "." + tag;
            ex = ex.toUpperCase();
            setTimeout(function () {
                pgvSendClick({hottag: ex});
            }, 0);
        }
    };
    PIAO.isVip = function (type, cbk) {
        var uin = PIAO.login.is();
        if (!uin) {
            cbk(false);
            return false;
        }
        var vip = PIAO.cookie.get('piao_' + type + '_' + uin);
        var check = function (data) {
            if (!data) {
                cbk(false);
            }
            if (typeof(data['is_' + type]) != 'undefined') {
                if (data['is_' + type] == 1) {
                    PIAO.cookie.set('piao_' + type + '_' + uin, '1');
                    cbk(true);
                } else {
                    PIAO.cookie.set('piao_' + type + '_' + uin, '-1');
                    cbk(false);
                }
            } else {
                cbk(false);
            }
        };
        if (vip) {
            if (vip === '1') {
                cbk(true);
            } else if (vip === '-1') {
                cbk(false);
            }
        } else {
            PIAO.getUserInfo(check, [type]);
        }
    };
    PIAO.isGreenVip = function (cbk) {
        PIAO.isVip('music', cbk);
        return;
    };
    PIAO.isClubVip = function (cbk) {
        PIAO.isVip('club', cbk);
        return;
    };
    PIAO.getGDT = function (pid, count, div_id, gdt_div, tpl, cbk) {
        var js = 'http://imgcache.qq.com/piao/js/comm/gdt.js';
        PIAO.JsLoader(js, function () {
            if (PIAO.initGDT) {
                PIAO.initGDT(pid, count, div_id, gdt_div, tpl, cbk);
            }
        }, 'utf-8', false);
    };
    PIAO.shareAct = function (info) {
        info = info || {};
        var url = window.location.toString();
        var tag = url.indexOf('?');
        if (tag != -1) {
            url = url.substr(0, tag);
        }
        if (url.indexOf("#") != -1) {
            url = url.substring(0, url.indexOf("#"));
        }
        if (info['args']) {
            url += '?' + info['args'];
        }
        info['site'] = encodeURIComponent(url);
        info['msg'] = info['txt'] ? (info['txt'] + "\n") : ("朋友，就是能和你一起分享精彩瞬间，一起回忆美好时刻的人。有好东西当然要和朋友一起分享：" + info['tname']);
        info['txt'] = info['msg'] + '\n' + url;
        info['title'] = encodeURIComponent(info['txt']);
        info['summary'] = info['summary'] || '朋友，就是能和你一起分享精彩瞬间，一起回忆美好时刻的人。有好东西当然要和朋友一起分享';
        info['summary'] = encodeURIComponent(info['summary']);
        function shareQQ() {
            PIAO.copyText(info['txt'], function () {
                PIAO.PopMsg.msg("地址已经复制到您的剪贴板，您可以发送给您的朋友啦！");
            });
        }

        function shareWeibo(t) {
            var go_url = "http://v.t.qq.com/share/share.php?title={msg}&site={site}&pic={pics}";
            t.href = go_url.format(info);
            t.target = "_blank";
        }

        function shareMail(t) {
            return false;
        }

        function shareQzone(t) {
            var go_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={site}&desc=&summary={summary}&pics={pics}&title={tname}';
            t.href = go_url.format(info);
            t.target = "_blank";
        }

        function sharePenyou(t) {
            var go_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={site}&desc=&summary={summary}&pics={pics}&title={tname}';
            t.href = go_url.format(info);
            t.target = "_blank";
        }

        $e("#share_div a").onClick(function (evt) {
            var t = evt.srcElement || evt.target;
            var type = t.getAttribute('s');
            switch (type) {
                case'qq':
                    shareQQ(t);
                    break;
                case'mail':
                    shareMail(t);
                    break;
                case'weibo':
                    shareWeibo(t);
                    break;
                case'qzone':
                    shareQzone(t);
                    break;
                case'pengyou':
                    sharePenyou(t);
                    break;
                default:
                    return;
            }
            PIAO.hotClickReport(type);
        });
    };
    PIAO.getAllCity = function (id, name, cbk) {
        var func = function () {
            var data = typeof(all_city_map) != 'undefined' ? all_city_map : {};
            if (name || id) {
                for (var key in data) {
                    if (name == data[key]['name'] || id == key) {
                        PIAO.curCity = key;
                        PIAO.curCityName = data[key]['name'];
                        PIAO.CurCityPY = data[key]['pinyin'];
                        break;
                    }
                }
            }
            cbk(data);
        };
        if (typeof(all_city_map) == 'undefined') {
            var jsl = new QZFL.JsLoader();
            jsl.onload = function () {
                func();
            };
            jsl.onerror = function () {
                func();
            };
            jsl.load('http://piao.qq.com/jingdian/data/type/all_cities.json', null, 'utf-8');
        } else {
            func();
        }
        return;
    };
    PIAO.changePiaoCity = function (city_id) {
        var url = location.href;
        var index = url.indexOf('#');
        url = index != -1 ? url.substr(0, index) : url;
        var tag = url.replace(/[\w:]+\/\/[\w\.]+\/(\w+)\/.*/g, "$1");
        var n_url = '/';
        var html = url.replace(/.*\/(.*)\.htm(l)?.*/g, "$1");
        if (tag == 'movie') {
            tag = 'dianying';
        }
        PIAO.cookie.set('piao_city', city_id);
        if (tag == "yanchu" || tag == 'dianying' || tag == "jingdian") {
            if (tag == 'dianying') {
                PIAO.changeDYCity(city_id, url, html);
                return;
            } else if (tag === 'yanchu') {
                if (html == 'yc_date') {
                    location.href = url;
                    return;
                }
            }
            location.href = n_url + tag + "/?city=" + city_id;
        } else if (tag == url) {
            if (html == url) {
                html = 'index';
            }
            location.href = n_url + html + ".html?city=" + city_id;
        } else if (tag == 'vip') {
            location.href = n_url + tag + "/" + html + ".html?city=" + city_id;
        } else {
            url = url.replace(/city=\.+/, '');
            url += url.indexOf('?') == -1 ? '?' : '&';
            url += 'city=' + city_id;
            location.href = url;
        }
    };
    PIAO.changeDYCity = function (city_id, url, html) {
        var n_url = '/dianying/';
        if (html == "movie" || html == "movie_detail" || url.indexOf('/act/') != -1 || url.match(/dianying\/movie\//)) {
            if (url.indexOf('city=') != -1) {
                url = url.replace(/(city=\d+)/g, function (_1, _2) {
                    return'city=' + city_id;
                });
            } else {
                url += url.indexOf('?') == -1 ? '?' : '&';
                url += 'city=' + city_id;
            }
            location.href = url;
        } else {
            if (url.match(/dianying\/yingyuan\/\d+\/cinema./)) {
                location.href = '/dianying/yingyuan/' + city_id + '/cinema.html';
            } else {
                location.href = n_url + "?city=" + city_id;
            }
        }
    };
    PIAO.getUserInfo = function (cbk, arr) {
        var map = {'club': "", 'music': "", 'show': "", 'home': ""};
        var url = "http://cgi.piao.qq.com/cgi-bin/piao/comm/usrinfo.fcg?need=";
        arr = arr || [];
        var args = [];
        var o = {};
        var ident = false;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (typeof(map[arr[i]]) != 'undefined') {
                if (!ident) {
                    args.push('user_ident');
                    ident = true;
                }
            } else {
                args.push(arr[i]);
            }
        }
        var callback = function (ret, data) {
            if (ret && data && typeof(data.ret) != 'undefined' && data.ret == '0' && cbk && QQVIP.object.getType(cbk) == "function") {
                var uin = PIAO.login.is(), club;
                if (typeof(data.data.is_club) != 'undefined') {
                    club = data.data.is_club > 0 ? 1 : -1;
                    PIAO.cookie.set('piao_club_' + uin, club);
                }
                if (typeof(data.data.is_music) != 'undefined') {
                    club = data.data.is_music > 0 ? 1 : -1;
                    PIAO.cookie.set('piao_music_' + uin, club);
                }
                cbk(data['data']);
            }
        };
        PIAO.FormSender(url, {'need': args.join(',')}, callback, 'GET', 'utf-8');
    };
    PIAO.initMYInfo = function () {
        var el = document.getElementById('user_info_div');
        if (!el) {
            return false;
        }
        var tpl = '<div class="photo"><img src="{face_url}" /></div><div class="usr_level"><p class="usr_name" id=>您好，{nick}</p><p><a style="display:none" href="http://vip.qq.com/myvip/" target="_blank"><img src="http://imgcache.qq.com/vipstyle/piao_v1/img/icon_vip.png" /></a><a href="http://vip.music.qq.com/" style="display:{music}"  target="_blank"><img src="http://imgcache.qq.com/vipstyle/piao_v1/img/icon_music.png" /></a></p></div>';
        var init = function (ret, data) {
            if (!ret || !data || data.ret != '0') {
                return false;
            }
            data = data.data;
            var o = {};
            o['nick'] = data.nick_name.replace(/<br\/>/g, "");
            o['face_url'] = data.face_url.html(true);
            o['vip'] = data['is_club'] == 1 ? '' : 'none';
            o['music'] = data['is_music'] == 1 ? '' : 'none';
            el.innerHTML = tpl.format(o);
        };
        el.innerHTML = '<div class="photo">欢迎您，请您先<a href="#" onClick="PIAO.login.open()">登录</a></div>';
        if (PIAO.login.is()) {
            var url = 'http://cgi.piao.qq.com/cgi-bin/piao/comm/usrinfo.fcg';
            PIAO.FormSender(url, {'need': 'nick_name,face_url,user_ident'}, init, 'GET', 'utf-8');
        }
    };
    PIAO.reportUV2OZ = function (ticket_id, trader_id) {
        var url = location.href;
        var tag = url.replace(/[\w:]+\/\/[\w\.]+\/(\w+)\/.*/g, "$1");
        var html = url.replace(/.*\/(.*)\.htm(l)+.*/g, "$1");
        var item_type = 0, page = 0;
        switch (tag) {
            case'jingdian':
                item_type = 3;
                break;
            case'yanchu':
                item_type = 2;
                break;
            case'dianying':
                item_type = 1;
                break;
        }
        if (html.indexOf('buy') != -1) {
            page = 1;
        } else if (html.indexOf('detail') != -1) {
            page = 2;
        }
        PIAO.JsLoader('http://php.piao.qq.com/piao_slog_v2.php?ver=2&page_id=' + page + '&item_id=' + ticket_id + '&item_type=' + item_type + "&trader_id=" + trader_id + "&_" + Math.random());
    };
    PIAO.getUserCity = function (cbk) {
        var url = "http://cgi.piao.qq.com/cgi-bin/piao/comm/ipgeo.fcg";
        var callback = function (ret, data) {
            if (ret && data && typeof(data.ret) != 'undefined' && data.ret == '0') {
                getUserLocation(data['data']);
            } else {
                PIAO.initNavCity();
            }
        };
        PIAO.FormSender(url, null, callback, 'GET', 'utf-8');
    };
    function getUserLocation(data) {
        if (data && typeof(data['country']) != "undefined") {
            var city_province = {'北京市': '', '上海市': '', '天津市': '', '重庆市': ''};
            if (data['country'] == "中国") {
                var province = data['province'] || '';
                var city = data['city'] || '';
                if (typeof(city_province[province]) != 'undefined') {
                    PIAO.curCityName = province.replace("市", '');
                } else {
                    PIAO.curCityName = city.replace("市", '');
                }
            } else {
                PIAO.curCityName = '深圳';
            }
        } else {
            PIAO.curCityName = '深圳';
            PIAO.curCity = 221;
        }
        PIAO.initNavCity();
    }

    PIAO.initNavCity = function () {
        PIAO.getAllCity(PIAO.curCity, PIAO.curCityName, function (data) {
            initNavCityDiv(data, 100);
        });
    };
    function initNavCityDiv(data, type) {
        var now_city = PIAO.curCity;
        var url = location.href;
        var html = url.replace(/.*\/(.*)\.htm(l)*.*/g, "$1");
        switch (html) {
            case'vip_dy':
                type = 4;
                break;
            case'vip_yc':
                type = 2;
                break;
            case'vip_jd':
                type = 1;
                break;
            default:
                type = 7;
        }
        var now_name = PIAO.curCityName;
        var temp = '';
        var arr = {};
        var json = {};
        var find = false;
        var chars = [];
        var hots = [];
        var tpl = '<a href="#" s="{id}" class="{class}">{name}</a>';
        var cur = "";
        var hot_citys = {'10': {'name': '北京', 'pinyin': 'beijing', 'hot': '1'}, '82': {'name': '上海', 'pinyin': 'shanghai', 'hot': '1'}, '221': {'name': '深圳', 'pinyin': 'shenzhen', 'hot': '1'}, '210': {'name': '广州', 'pinyin': 'guangzhou', 'hot': '1'}, '267': {'name': '成都', 'pinyin': 'chengdu', 'hot': '1'}, '266': {'name': '重庆', 'pinyin': 'chongqing', 'hot': '1'}, '179': {'name': '武汉', 'pinyin': 'wuhan', 'hot': '1'}, '11': {'name': '天津', 'pinyin': 'tianjin', 'hot': '1'}, '320': {'name': '西安', 'pinyin': 'xian', 'hot': '1'}, '96': {'name': '杭州', 'pinyin': 'hangzhou', 'hot': '1'}, '83': {'name': '南京', 'pinyin': 'nanjing', 'hot': '1'}};
        for (var id in data) {
            if (!(parseInt(data[id]['flag'], 2) & type)) {
                continue;
            }
            json = data[id];
            json.id = id;
            temp = json['pinyin'];
            cur = '';
            if (id == now_city || now_name == json['name']) {
                PIAO.curCityName = json['name'];
                PIAO.CurCityPY = json['pinyin'];
                PIAO.curCity = id;
                now_city = id;
                find = true;
                cur = 'current';
            }
            if (typeof(hot_citys[id]) != 'undefined') {
                data[id]['id'] = id;
                data[id]['class'] = cur;
                hots.push(tpl.format(data[id]));
            }
            temp = temp.charAt(0).toUpperCase();
            if (typeof(arr[temp]) == "undefined") {
                arr[temp] = [];
                chars.push(temp);
            }
            arr[temp].push(json);
        }
        html = [];
        var initCharCity = function (code) {
            if (typeof(arr[code]) == 'undefined') {
                return;
            }
            html.push('<li><strong>' + code + '</strong><p>');
            for (var j = 0, l = arr[code].length; j < l; j++) {
                if (now_city == arr[code][j]['id']) {
                    arr[code][j]['class'] = 'current';
                } else {
                    arr[code][j]['class'] = '';
                }
                html.push(tpl.format(arr[code][j]));
            }
            html.push('</p></li>');
        };
        chars.sort();
        var len = chars.length;
        var mid = Math.ceil(len / 1);
        for (var i = 0; i < mid; i++) {
            initCharCity(chars[i]);
            if (i + mid < len) {
                initCharCity(chars[i + mid]);
            }
        }
        var map_div = null;
        var city_map_div = null;
        var now_city_span2 = null;
        var sel_div = null;
        var search_list = null;
        map_div = $("piao_city_map_div");
        $e("#hot_city_span").setHtml(hots.join(''));
        $e("#all_city_ul").setHtml(html.join(''));
        city_map_div = $e('#piao_city_map_div');
        now_city_span2 = $e("#piao_now_city_span2");
        sel_div = $('piao_now_city_span');
        search_list = $('piao_city_search_list');
        PIAO.initCitySearch();
        city_map_div.onClick(function (evt) {
            var t = evt.srcElement || evt.target;
            QZFL.event.preventDefault(evt);
            var city_id = t.getAttribute('s');
            if (city_id) {
                PIAO.changePiaoCity(city_id);
            }
            if (t.id != 'piao_city_search_txt' || t.id != 'piao_city_search_txt_wg') {
                search_list.style.display = 'none';
            }
        });
        function func() {
            if (!find) {
                PIAO.curCityName = '深圳';
                PIAO.curCity = 221;
            }
            PIAO.cookie.set("piao_city", PIAO.curCity);
            now_city_span2.setHtml(PIAO.curCityName);
            $e("span._city_name").setHtml(PIAO.curCityName);
        }

        func();
        var is_show = false;

        function show() {
            if (is_show) {
                map_div.style.display = "";
                sel_div.className = "city_change current";
            }
        }

        function hide() {
            if (!is_show) {
                map_div.style.display = "none";
                sel_div.className = "city_change";
            }
        }

        addEvent(sel_div, 'mouseover', function () {
            is_show = true;
            setTimeout(function () {
                show();
            }, 100);
        });
        addEvent(sel_div, 'mousemove', function () {
            is_show = true;
            setTimeout(function () {
                show();
            }, 100);
        });
        addEvent(sel_div, 'mouseout', function () {
            is_show = false;
            setTimeout(function () {
                hide();
            }, 100);
        });
        addEvent(map_div, 'mouseover', function () {
            is_show = true;
            setTimeout(function () {
                show();
            }, 100);
        });
        addEvent(map_div, 'mouseout', function () {
            is_show = false;
            setTimeout(function () {
                hide();
            }, 100);
        });
        addEvent(map_div, 'mousemove', function () {
            is_show = true;
            setTimeout(function () {
                show();
            }, 100);
        });
    }

    PIAO.initUserLoginInfo = function () {
        if (PIAO.login.is()) {
            var nick = PIAO.cookie.get("actnick_" + PIAO.login.is());
            var load = false;
            if (nick) {
                var uin = PIAO.login.is();
                nick = nick || uin;
                load = true;
                $e("#user_login").setHtml('欢迎您，' + nick + '[' + uin + ']');
                $e("#logined_tpl").show();
                $e("#not_logined_tpl").hide();
            }
            if (!load) {
                PIAO.getUserInfo(function (data) {
                    if (!data) {
                        return false;
                    }
                    var nick = (data.nick_name) || PIAO.login.is();
                    nick = String(nick).replace(/<br\/>/g, "");
                    PIAO.cookie.set('actnick_' + PIAO.login.is(), nick);
                    $e("#logined_tpl").show();
                    $e("#not_logined_tpl").hide();
                    $e("#user_login").setHtml('欢迎您，' + nick + '[' + PIAO.login.is() + ']');
                }, ['nick_name']);
            }
        } else {
            $e("#logined_tpl").hide();
            $e("#not_logined_tpl").show();
        }
    };
    PIAO.initReport = function () {
        function puv() {
            PIAO.pvReport();
        }

        PIAO.JsLoader("http://pingjs.qq.com/tcss.ping.js", puv, "gb2312", false);
        var args = PIAO.getHrefArgs();
        var src = 0;
        var qz = args['qz_gdt'];
        var qz_old = args['qz_snsclick'];
        if (qz) {
            src = 1013;
            PIAO.cookie.set('piao_qzclick', qz);
        } else if (qz_old) {
            src = 1013;
            PIAO.cookie.set('piao_qzclick_old', qz_old);
        }
        var source = 0;
        var pgv_ref = args['pgv_ref'] || '';
        if (pgv_ref) {
            if (pgv_ref.indexOf('QQMusic') != -1) {
                source = 1035;
            }
        }
        source = source || parseInt(args['pvsrc'], 10) || parseInt(PIAO.cookie.get('piao_pvsrc') || 0, 10) || 1002;
        if (typeof(args['paipai']) != "undefined" && args['paipai'] == 1003) {
            source = 1003;
        }
        var old_source = PIAO.cookie.get('piao_pvsrc');
        if (args['attach']) {
            PIAO.cookie.set('piao_attach', args['attach']);
        }
        var referrer = document.referrer;
        if (referrer && referrer.indexOf('baidu') != -1) {
            source = 2700;
        } else if (referrer && referrer.indexOf('soso') != -1) {
            source = 2701;
        } else if (referrer && referrer.indexOf('google') != -1) {
            source = 2702;
        }
        if (source && !isNaN(source) && (old_source === '' || old_source == '1002' || old_source == '1034' || source == PIAO.WGPvsrc)) {
            PIAO.cookie.set('piao_pvsrc', source);
            if (source == 1003) {
                if (PIAO.login.is()) {
                    PIAO.login.loginPaipai();
                }
                $e("#paipai_logo_div").show();
                return true;
            }
        }
        $e("#piao_logo_div").show();
    };
    PIAO.reportTA = function () {
        PIAO.JsLoader("http://tajs.qq.com/stats?sId=15891802", null, "utf-8", false);
    };
    PIAO.initActSubNav = function () {
        var arr = [];
        arr.push('<ul id="act_mod_subnav">');
        arr.push('    <li class="nav_jd_home"><a href="/act/act_index.html" title=""><strong>活动首页</strong></a></li>');
        arr.push('    <li class="nav_jd_all"><a href="/act/act_all.htm" title=""><strong>全部活动</strong></a></li>');
        arr.push('</ul>');
        $e("#nav_sub_act_div").setHtml(arr.join(""));
        $e("#nav_sub_act_div").show();
        var url = location.href;
        var index = -1;
        var html = url.replace(/.*\/(.*)\.htm.*/g, "$1");
        switch (html) {
            case'act_index':
                index = 0;
                break;
            case'act_all':
                index = 1;
                break;
            default:
                index = -1;
                break;
        }
        $e("#act_mod_subnav a").each(function (el, i) {
            if (i == index) {
                el.className = "current";
                return;
            }
        });
    };
    PIAO.speedReport = (function () {
        var _REPORT_URL = "http://isdspeed.qq.com/cgi-bin/r.cgi";
        var _FREQUENCY = 1.0;
        var _FLAG1_VIP = 7824;
        var _MAX_TIME = 4000;
        var img;

        function send(timeArr, webFlag, pageFlag, freq, delayTime, extParam) {
            freq = freq || _FREQUENCY;
            delayTime = delayTime || 2000;
            if (Math.random() >= freq) {
                return;
            }
            if (typeof(PIAO.speedReport[webFlag]) != 'undefined') {
                webFlag = PIAO.speedReport[webFlag];
            }
            var callback = (function (timeArr, webFlag, pageFlag, extParam) {
                return function () {
                    var param = [];
                    param.push('flag1=' + _FLAG1_VIP);
                    param.push('flag2=' + webFlag);
                    param.push('flag3=' + pageFlag);
                    for (var i = 1, j = timeArr.length; i <= j; i++) {
                        if (timeArr[i]) {
                            if (i == 2 && timeArr[i] > _MAX_TIME) {
                                return;
                            }
                            param.push(i + "=" + timeArr[i]);
                        }
                    }
                    extParam = extParam || {};
                    for (var key in extParam) {
                        param.push(key + "=" + extParam[key]);
                    }
                    img = new Image();
                    img.src = _REPORT_URL + "?" + param.join("&");
                    img.onload = img.onerror = function () {
                        img = null;
                    };
                };
            })(timeArr, webFlag, pageFlag, extParam);
            setTimeout(callback, delayTime);
        }

        return{WEB_YC: 3, WEB_DY: 2, WEB_COM: 1, WEB_JD: 4, send: send};
    })();
    PIAO.errReport = (function () {
        var img;
        var codeRpt = {url: "http://c.isdspeed.qq.com/code.cgi", rate: 1, report: function (domain, cgi, type, code, time, rate, uin) {
            rate = rate || this.rate;
            uin = uin || PIAO.login.is();
            var url = this.url + '?domain=' + domain + "&cgi=" + encodeURIComponent(cgi) + "&type=" + type + "&code=" + code + "&time=" + time + "&rate=" + rate + "&uin=" + uin;
            img = new Image();
            img.src = url;
            img.onload = img.onerror = function () {
                img = null;
            };
        }}, cgi_map = {'/json_cro.php?mod=code&func=pay': ['-8231'], '/json_cro.php?mod=code&func=realtkpay': ['20007', '-8231'], '/subs_email.php': ['-11'], '/cgi-bin/yanchu/web/makeorder.fcg': ['63208', '63209', '63202', '63203', '63204'], '/cgi-bin/jingdian/book/book.fcg': ['-15422'], "/cgi-bin/dianying/ordering/ordering.fcg": ['61000', '61001', '61002', '61003', '61004']};
        return function (url, args, code, time) {
            var parser = document.createElement("a");
            parser.href = url;
            var domain = parser.hostname, cginame = parser.pathname, type, params = {}, mod, func, arr = [];
            if (cginame.slice(-3) == 'php') {
                if (parser.search.length > 0) {
                    params = parser.search.slice(1).toJson('&', '=');
                    mod = params['mod'];
                    func = params['func'];
                } else {
                    mod = args['mod'];
                    func = args['func'];
                }
                if (mod) {
                    arr.push("mod=" + mod);
                }
                if (func) {
                    arr.push("func=" + func);
                }
                if (arr.length > 0) {
                    cginame += '?' + arr.join('&');
                }
            }
            code = String(code);
            if (/^(0|-1|-4769|-10000)$/.test(code)) {
                type = 1;
            } else if (cgi_map[cginame] && cgi_map[cginame].indexOf(code) > -1) {
                type = 3;
            } else {
                type = 2;
            }
            codeRpt.report(domain, cginame, type, code, time);
            parser = null;
        };
    })();
    PIAO.initSearch = function () {
        var sBar = $('search_toolbar_ctl'), kword = $('site_search_keyword'), hint = $('site_hot_hint_ctx'), mShow = $('search_type_show'), menu = $('search_type_menu'), prev = $('search_type_prev'), sBuy = $('search_type_buy'), site_intelligentTimer, beforeWord, afterWord, curWord, piaoDisp = '搜索电影演出', buyDisp = '搜索 QQ网购 商品', disp = piaoDisp, addEvt = QZFL.event.addEvent;
        if (!sBar || !kword || !mShow || !menu) {
            return;
        }
        sBar.style.display = '';
        setTimeout(function () {
            kword.style.color = '#999999';
            kword.setAttribute('c', '0');
            kword.value = piaoDisp;
        }, 0);
        addEvt(window, 'beforeunload', function () {
            kword.style.color = '#999999';
            kword.setAttribute('c', '0');
        });
        $e(document).bind('click', function (e) {
            var el = e.srcElement || e.target;
            var kd = kword.value.trim();
            if (el == kword) {
                if (el.getAttribute('c') == '0') {
                    el.value = '';
                    el.style.color = '';
                    el.setAttribute('c', '1');
                }
            } else {
                hint.style.display = 'none';
                if (el.id == 'site_search_btn' || (el.parentNode && el.parentNode.id == 'site_search_btn')) {
                    if (kword.getAttribute('c') === '0' || kd === '') {
                        kword.value = '';
                        kword.style.color = '';
                        kword.setAttribute('c', '1');
                        kword.focus();
                    } else {
                        location.href = ((disp == piaoDisp) ? '/soso/search.html?keyword=' : 'http://searchex.buy.qq.com/html?as=1&KeyWord=') + encodeURIComponent(kd);
                    }
                } else if (kword.value === '') {
                    kword.value = disp;
                    kword.style.color = '#999999';
                    kword.setAttribute('c', '0');
                }
            }
        });
        $e(kword).bind('focus', function (evt) {
            var el = evt.srcElement || evt.target;
            if (el.getAttribute('c') == '0') {
                kword.value = '';
                kword.style.color = '';
                kword.setAttribute('c', '1');
            }
        });
        $e(kword).bind('keydown', function (e) {
            var el = e.srcElement || e.target, code = e.keyCode || e.which, $hint = $e(hint);
            beforeWord = el.value;
            if (el.value === '' || code == 13 || disp == buyDisp) {
                $hint.hide();
                return;
            }
            el.setAttribute('old', el.value);
            if ((code == 40 || code == 38) && $hint.elements[0].style.display != 'none') {
                var curHit = $hint.find('a.hitHot');
                var hits = $hint.find('a'), nextHit;
                if (curHit.elements.length === 0) {
                    nextHit = (code == 40) ? hits.elements[0] : hits.elements[hits.elements.length - 1];
                    nextHit.className = 'hitHot';
                    el.value = nextHit.getAttribute('word');
                } else {
                    hits.each(function (hit, i) {
                        if (hit == curHit.elements[0]) {
                            if (code == 40) {
                                nextHit = hits.elements[i + 1];
                            } else {
                                nextHit = hits.elements[i - 1];
                            }
                            if (nextHit) {
                                nextHit.className = 'hitHot';
                                el.value = nextHit.getAttribute('word');
                            } else {
                                el.value = curWord;
                            }
                            return false;
                        }
                    });
                    curHit.removeClass('hitHot');
                }
            }
        });
        $e(kword).bind('keyup', function (e) {
            var el = e.srcElement || e.target;
            var code = e.keyCode || e.which;
            afterWord = el.value;
            if (code == 13) {
                if (el.value.trim() === '') {
                    el.value = '';
                } else {
                    location.href = ((disp == piaoDisp) ? '/soso/search.html?keyword=' : 'http://searchex.buy.qq.com/html?as=1&KeyWord=') + encodeURIComponent(el.value);
                }
            } else if (code != 40 && code != 38 && disp == piaoDisp) {
                if (afterWord.trim() === '') {
                    $e('#site_hot_hint_ctx').hide();
                } else if (beforeWord.trim() != afterWord.trim() || (code == 32 && afterWord != beforeWord.trim())) {
                    curWord = el.value;
                    if (site_intelligentTimer) {
                        window.clearTimeout(site_intelligentTimer);
                    }
                    site_intelligentTimer = window.setTimeout(function () {
                        PIAO.JsLoader('http://cgi.piao.qq.com/cgi-bin/yanchu/soso/smart_hint.fcg?&keyword=' + encodeURIComponent(el.value));
                    }, 200);
                }
            }
        });
        addEvt(hint, 'click', function (e, ctx) {
            var el = e.srcElement || e.target;
            var kw = $('site_search_keyword');
            var tname = el.tagName.toUpperCase();
            if (tname == 'A') {
                kw.value = el.getAttribute('word');
            } else if (tname == 'STRONG') {
                kw.value = el.parentNode.getAttribute('word');
            } else {
                kw.value = QZFL.dom.getFirstChild(el).getAttribute('word');
            }
            ctx.style.display = 'none';
            window.setTimeout(function () {
                window.location.href = '/soso/search.html?keyword=' + encodeURIComponent(kw.value);
            });
            QZFL.event.cancelBubble(e);
        }, [hint]);
        addEvt(hint, 'mouseover', function (e, ctx) {
            var child = e.relatedTarget || e.fromElement;
            if (!QZFL.dom.isAncestor(ctx, child)) {
                $e(ctx).find('a.hitHot').removeClass('hitHot');
            }
        }, [hint]);
        addEvt(mShow, 'click', function () {
            var s = menu.style;
            if (s.display == 'none') {
                s.display = '';
                mShow.className = 'current';
            } else {
                s.display = 'none';
                mShow.className = '';
            }
        });
        addEvt(sBuy, 'click', function (evt, sBuy) {
            var s1 = '电影演出', s2 = 'QQ网购';
            menu.style.display = 'none';
            mShow.className = '';
            if (prev.innerHTML == s1) {
                prev.innerHTML = s2;
                sBuy.innerHTML = s1;
                disp = buyDisp;
            } else {
                prev.innerHTML = s1;
                sBuy.innerHTML = s2;
                disp = piaoDisp;
            }
            kword.value = disp;
            kword.style.color = '#999999';
            kword.setAttribute('c', '0');
        }, [sBuy]);
        addEvt(menu.parentNode, 'mouseout', function (evt, mpNode) {
            var r = evt.relatedTarget || evt.toElement;
            if (!QZFL.dom.isAncestor(mpNode, r)) {
                menu.style.display = 'none';
                mShow.className = '';
            }
        }, [menu.parentNode]);
    };
    PIAO.initHeader = function () {
        var mtop = $('wanggou_menu_ul'), cls = 'wg_ddl_hover';
        if (mtop) {
            $e('#wanggou_menu_ul > li.wg_ddl').each(function (li) {
                var el = $e(li);
                el.bind('mouseover', function () {
                    el.addClass(cls);
                });
                el.bind('mouseout', function (evt) {
                    var r = evt.relatedTarget || evt.toElement;
                    if (!QZFL.dom.isAncestor(li, r)) {
                        el.removeClass(cls);
                    }
                });
            });
        }
    };
    window.smarthint_callback = function (o) {
        var site_hot_hint_ctx = $('site_hot_hint_ctx');
        var kw = $('site_search_keyword').value.trim();
        if (o.ret == '0') {
            var resultlist = o.data.sRet.resultlist;
            if (resultlist.length > 0) {
                var htm = ['<ul>'], result;
                for (var i = 0, j = resultlist.length, index, showWord; i < j; i++) {
                    result = resultlist[i];
                    index = result.words.indexOf(kw);
                    if (index > -1) {
                        index = index + kw.length;
                        showWord = result.words.substring(0, index) + '<strong>' + result.words.substring(index) + '</strong>';
                    } else {
                        showWord = result.words;
                    }
                    htm.push('<li><a href="javascript:;" word="' + result.words + '">' + showWord + '</a></li>');
                }
                htm.push('</ul>');
                site_hot_hint_ctx.innerHTML = htm.join('');
                site_hot_hint_ctx.style.display = '';
            } else {
                site_hot_hint_ctx.innerHTML = '';
                site_hot_hint_ctx.style.display = 'none';
            }
        }
    };
})(PIAO, window);
(function (PIAO) {
    PIAO.MASK = {has: false, show: function () {
        var oMask = document.getElementById('bg_dark');
        var dom = QQVIP.dom;
        var height = dom.getClientHeight() > QQVIP.dom.getScrollHeight() ? dom.getClientHeight() : QQVIP.dom.getScrollHeight();
        if (!oMask) {
            oMask = document.createElement("div");
            oMask.id = "bg_dark";
            oMask.className = "mod_pop_mask";
            oMask.style.height = height + "px";
            var oBody = document.getElementsByTagName('body')[0];
            oBody.appendChild(oMask);
        } else {
            oMask.style.width = QQVIP.dom.getScrollWidth() + "px";
            oMask.style.height = height + "px";
            oMask.style.display = "block";
        }
        if (QQVIP.userAgent.ie < 7) {
            var oSels = document.getElementsByTagName("select") || [];
            for (var i = 0, l = oSels.length; i < l; i++) {
                oSels[i].style.visibility = 'hidden';
            }
        }
        function set() {
            if (PIAO.MASK.has) {
                var oMask = document.getElementById('bg_dark');
                oMask.style.width = QQVIP.dom.getScrollWidth() + "px";
                oMask.style.height = height + "px";
                oMask.style.display = "block";
            }
        }

        QQVIP.event.addEvent(window, 'resize', set);
        this.has = true;
    }, hide: function () {
        var oMask = document.getElementById('bg_dark');
        oMask.style.display = "none";
        if (QQVIP.userAgent.ie < 7) {
            var oSels = document.getElementsByTagName("select") || [];
            for (var i = 0, l = oSels.length; i < l; i++) {
                oSels[i].style.visibility = 'visible';
            }
        }
        PIAO.MASK.has = false;
    }};
    PIAO.POP = {restoreCSS: function (el, o) {
        if (!el) {
            return false;
        }
        for (var key in o) {
            el.style[key] = o[key];
        }
    }, show: function (objid, mask_show, evt, left_ex, top_ex) {
        left_ex = left_ex || 0;
        top_ex = top_ex || 0;
        var dom = QQVIP.dom;
        var top;
        var el = document.getElementById(objid);
        el.style.display = "block";
        var size = dom.getSize(el);
        mask_show = typeof(mask_show) == 'undefined' ? true : false;
        if (mask_show) {
            PIAO.MASK.show();
        }
        if (size[1] > dom.getClientHeight() * 0.8) {
            if (QQVIP.userAgent.ie < 7) {
                el.style.top = "150px";
            }
            el.style["marginTop"] = '0px';
            el.style.position = 'absolute';
            el.style.left = '50%';
            el.style["marginLeft"] = parseInt((-1) * size[0] / 2, 10) + 'px';
        } else {
            if (!evt) {
                if (QQVIP.userAgent.ie < 7) {
                    setTimeout(function () {
                        top = (dom.getClientHeight() - size[1]) / 2 + dom.getScrollTop();
                        el.style.position = 'absolute';
                        el.style.top = top;
                        var sels = el.getElementsByTagName('select');
                        for (var i = 0, l = sels.length; i < l; i++) {
                            sels[i].style.visibility = 'visible';
                        }
                        if (el.id == 'msg_div_div') {
                            var div = el.getElementsByTagName('div');
                            var arr = dom.getSize(div[0]);
                        }
                        el.style["marginLeft"] = parseInt((-1) * size[0] / 2, 10) + 'px';
                    }, 0);
                } else {
                    el.style.top = "50%";
                    if (el.id == 'msg_div_div') {
                        el.style["marginTop"] = (parseInt((-1) * size[1] / 2, 10) || -50) + 'px';
                        var div = el.getElementsByTagName('div');
                        var arr = dom.getSize(div[0]);
                        el.style["marginLeft"] = parseInt((-1) * arr[0] / 2, 10) + 'px';
                    } else {
                        el.style["marginLeft"] = parseInt((-1) * size[0] / 2, 10) + 'px';
                        el.style["marginTop"] = (parseInt((-1) * size[1] / 2, 10) || -150) + 'px';
                    }
                }
                el.style.left = '50%';
                el.style["marginLeft"] = parseInt((-1) * size[0] / 2, 10) + 'px';
            } else {
                el.style["marginTop"] = top_ex + 'px';
                var toph = QZFL.dom.getScrollTop();
                el.style.top = (evt.screenY + toph) + "px";
                el.style.position = 'absolute';
                var topw = QZFL.dom.getScrollLeft();
                el.style.left = (evt.screenX + topw + left_ex) + "px";
            }
        }
        if (QQVIP.userAgent.ie < 7) {
            var sels = el.getElementsByTagName('select');
            for (var i = 0, l = sels.length; i < l; i++) {
                sels[i].style.visibility = 'visible';
            }
            el.style.left = '50%';
            el.style["marginLeft"] = parseInt((-1) * size[0] / 2, 10) + 'px';
        }
    }, hide: function (objid) {
        $e("#" + objid).hide();
        $e("#bg_dark").hide();
        PIAO.MASK.hide();
    }};
    PIAO.PopMsg = {interval: null, _tpl: '<div class=""><div id="{div_id}"  class="mod_pop_gd_v3"><div   style="{style}" class="mod_pop_wrap"><div class="mod_pop_gd_hd"><h3>{title}</h3><button type="button" style="display:{closeCls}" title="关闭弹出层" onclick="PIAO.PopMsg.hide(\'tips_div\');">关闭</button></div><div class="mod_pop_gd_bd"><div class="{icon_type}"><h3>{info}</h3>{detail}</div></div><div class="mod_pop_gd_ft"><a href="{link}" id="com_ok_btn" style="display:{ok_btn_block}" class="btn_fit_pop"><span>{ok_btn_txt}</span></a><a href="javascript:PIAO.PopMsg.hide(\'tips_div\');" style="display:{no_btn_block}" id="com_no_btn" class="btn_fit_pop"><span>{no_btn_txt}</span></a></div></div></div>', hide: function (id) {
        var me = this;
        id = id || 'tips_div';
        $e("#" + id).hide();
        if (id != me._msg_id) {
            PIAO.MASK.hide();
        }
    }, showComm: function (o) {
        o['style'] = o['style'] || 'width:425px';
        o['ok_btn_txt'] = o['ok_btn_txt'] || "确定";
        o['no_btn_txt'] = o['no_btn_txt'] || '关闭';
        var str = PIAO.PopMsg._tpl.format(o);
        var me = this;
        me._init('tips_div', o.div_id, str, 101);
    }, show: function (tpl, o) {
        var str = tpl.format(o);
        var me = this;
        me._init('tips_div', o.div_id, str, 101);
    }, _init: function (div_id, id, html, index, evt, left_ex, top_ex) {
        var me = this;
        div_id = div_id || 'tips_div';
        index = index || 1000;
        var div = document.getElementById(div_id);
        if (!div) {
            div = document.createElement("div");
            div.id = div_id;
            div.style['z-index'] = index;
            document.getElementsByTagName("body")[0].appendChild(div);
        }
        div.innerHTML = html;
        div.style.display = 'block';
        if (div_id == me._msg_id) {
            PIAO.POP.show(id, false, evt, left_ex, top_ex);
        } else {
            PIAO.POP.show(id);
        }
    }, _msg_id: 'msg_tips_div', msg: function (msg, type, evt, left_ex, top_ex, t) {
        var me = this;
        type = type || 'info_alert';
        top_ex = top_ex || '-50';
        t = t || 1500;
        var tpl = '<div class="mod_pop_gd_v3" id="msg_div_div" style="width:320px;z-index:1900"><div class="mod_pop_wrap"  style="width:320px;position:absolute" ><div class="mod_pop_gd_bd"><div class="' + type + '"><p class="single_row" style="word-wrap:break-word;word-break:break-all">' + msg.html() + '</p></div></div></div></div>';
        me._init(me._msg_id, 'msg_div_div', tpl, 1100, evt, left_ex, top_ex);
        if (me.interval) {
            clearInterval(me.interval);
        }
        me.interval = setInterval(function () {
            PIAO.PopMsg.hide(me._msg_id);
            clearInterval(me.interval);
        }, t);
    }, txtBlur: function (id, color, oldcs) {
        oldcs = oldcs || '';
        color = color || 'orange';
        var map = {'black': 'c_tx1', 'orange': 'c_tx2', 'gray': 'c_tx3', 'green': 'c_tx4'};
        var cls = typeof(map[color]) != "undefined" ? map[color] : 'c_tx2';
        var el = document.getElementById(id);
        if (!el) {
            return false;
        }
        var max = 6;
        var i = 1;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            el.className = oldcs;
        }
        this.timer = setInterval(function () {
            if (i++ > max) {
                clearInterval(this.timer);
                el.className = oldcs;
                this.timer = null;
                return;
            }
            if (i % 2 == 1) {
                el.className = oldcs;
            } else {
                el.className = cls;
            }
        }, 500);
    }};
    PIAO.UserAddr = function () {
        var old_data = null;
        var out_cb = null;
        var post = false;
        var map = {'address': 'address', 'strCity': 'city', 'mobile': 'mobile', 'name': 'name', 'postcode': 'postcode', 'strProvince': 'province', 'strRegion': 'distric', 'phone': 'phone', 'ucVer': '', 'id': 'addressId', 'ppid': 'regionId', 'uiType': '', 'strEmail': ''};

        function makeData() {
            if (old_data === null) {
                if (out_cb && QQVIP.object.getType(out_cb) == "function") {
                    out_cb([]);
                } else {
                    return false;
                }
            }
            if (typeof(Xiake) == 'undefined' || typeof(Xiake.Region) == 'undefined' || typeof(Xiake.Region.data) == 'undefined') {
                getData(makeData);
                return;
            }
            var data = old_data;
            var cbk = out_cb;
            var new_data = [];
            var o, regionInfo;
            for (var i = 0, l = data.length; i < l; i++) {
                o = {};
                for (var key in data[i]) {
                    if (typeof(map[key]) != "undefined") {
                        var temp = map[key] || key;
                        o[temp] = data[i][key];
                    }
                }
                regionInfo = Xiake.Region.getRegion(o['regionId']);
                if (regionInfo) {
                    o['province'] = regionInfo['province'][1];
                    o['city'] = regionInfo['city'][1];
                    o['distric'] = regionInfo['region'] ? regionInfo['region'][1] : '';
                }
                if (typeof o.phone == 'undefined') {
                    o['phone'] = '';
                }
                new_data.push(o);
            }
            if (post) {
                cbk(true, new_data);
            } else {
                cbk(new_data);
            }
        }

        var get_url = 'http://cgi.piao.qq.com/cgi-bin/yanchu/app/delivery.fcg';
        this.getAddr = function (cbk) {
            var callback = function (data) {
                eval('var data = ' + data.responseText);
                var ret = data.ret;
                if (data && typeof(data.data) != "undefined") {
                    switch (parseInt(ret, 10)) {
                        case 0:
                            if (typeof(data.data.record) != "undefined") {
                                var arr = data.data.record || [];
                                old_data = arr;
                                out_cb = cbk;
                                makeData();
                                return;
                            }
                            break;
                        case-4769:
                            PIAO.login.open();
                            break;
                        default:
                            break;
                    }
                }
                cbk(false);
            };
            var param = {'data': {'sCmd': 'get', 'iLogin': '0'}, 'method': 'GET', 'onSuccess': callback, 'proxyDomain': PIAO.crossPorxy.CGI};
            PIAO.crossAjax(get_url, param);
            post = false;
        };
        var region_js = 'http://imgcache.qq.com/club/travel/js/v2/region_allowedZH.js';

        function getData(cbk) {
            if (typeof(Xiake) == 'undefined' || typeof(Xiake.Region) == 'undefined' || typeof(Xiake.Region.data) == 'undefined') {
                PIAO.JsLoader(region_js, cbk, 'utf-8', false);
            } else {
                cbk();
            }
        }

        this.initRegion = function (region_id, pro_sel, city_sel, area_sel) {
            if (!pro_sel || !city_sel || !area_sel) {
                return false;
            }
            region_id = region_id || null;
            function init() {
                var sels = new Xiake.Region(pro_sel, city_sel, area_sel);
                sels.setRegion(region_id);
            }

            getData(init);
        };
        var url = "http://cgi.piao.qq.com/cgi-bin/yanchu/app/delivery.fcg";
        this.submit = function (type, o, cbk) {
            var that = this;
            type = type || 'mod';
            var oo = {}, regionInfo;
            regionInfo = Xiake.Region.getRegion(o['regionId']);
            if (regionInfo) {
                oo['province'] = regionInfo['province'][1];
                oo['ctiy'] = regionInfo['city'][1];
                oo['region'] = regionInfo['region'] ? regionInfo['region'][1] : '';
            }
            oo['sCmd'] = type;
            oo['postcode'] = o['postcode'];
            oo['type'] = '3';
            oo['iLogin'] = '0';
            oo['name'] = o['name'];
            oo['mobile'] = o['mobile'];
            oo['addr'] = o['address'];
            oo['ppid'] = o['regionId'];
            oo['id'] = o['addressId'] || o['id'];
            var callback = function (data) {
                eval('var data = ' + data.responseText);
                if (data && typeof(data.ret) != "undefined" && data.ret == '0') {
                    if (typeof(data.data.record) != "undefined") {
                        that.getAddr(out_cb);
                        cbk(true);
                        return;
                    }
                }
                cbk(false, []);
            };
            oo['iLogin'] = '0';
            var param = {'data': oo, 'method': 'POST', 'onSuccess': callback, 'proxyDomain': PIAO.crossPorxy.CGI};
            PIAO.crossAjax(url, param);
            post = true;
        };
    };
    PIAO.showToolBar = function (tp) {
        var htm, div, tbCtx, buyMenu, showMenu, tm, showFunc, hideFunc, chgFunc, running, tbId = '_piao_tx_2wm_tb';
        if (location.hostname.indexOf('piao.qq.com') == -1 || $(tbId) != null) {
            return;
        }
        div = document.createElement('div');
        div.id = tbId;
        if (tp && tp === 'yc') {
            htm = '<a href="javascript:;" class="bar_top"><span>顶部</span></a>' + '<a href="http://support.qq.com/write.shtml?fid=841&ADPUBNO=" target="_blank" class="bar_feedback"><span>反馈</span></a>' + '<a href="javascript:;" class="bar_code"><span>购票</span></a>' + '<a href="javascript:;" class="bar_bottom"><span>底部</span></a>' + '<div class="bar_code_show"><a href="http://piao.qq.com/acts/yc/wxzh.html" target="_blank">' + '<img src="http://imgcache.qq.com/lifestyle/piao_v2/pic/code_show.jpg" width="316" height="316"/>' + '<span> 关注演出微信，优惠周周有 &gt;</span></a></div>';
            div.className = 'footer_bar';
        } else {
            htm = '<a href="javascript:;" class="bar_top"><span>顶部</span></a>' + '<a href="http://support.qq.com/write.shtml?fid=842&ADPUBNO=" target="_blank" class="bar_feedback"><span>反馈</span></a>' + '<a href="javascript:;" class="bar_code"><span>影评</span></a><a href="javascript:;" class="bar_code"><span>购票</span></a>' + '<a href="javascript:;" class="bar_bottom"><span>底部</span></a>' + '<div class="bar_code_show"><a href="http://piao.qq.com/acts/dy/wxdy.html" target="_blank">' + '<img src="http://imgcache.qq.com/lifestyle/piao_v2/pic/code_qr.jpg" width="591" height="306"/>' + '<span> 用微信/手机QQ随时随地4折购票，查看最新影评！扫一扫关注，查看详情 &gt;</span></a></div>';
            div.className = 'footer_bar footer_bar_extend';
        }
        div.innerHTML = htm;
        document.body.appendChild(div);
        tbCtx = $e('#' + tbId);
        buyMenu = tbCtx.find('a.bar_code');
        showMenu = tbCtx.find('div.bar_code_show');
        showMenu.setStyle('opacity', 0);
        showFunc = function () {
            clearTimeout(tm);
            tm = setTimeout(function () {
                showMenu.addClass('bar_code_out');
                if (running || showMenu.getStyle('opacity') == 1) {
                    return;
                }
                var t = 0, b = 0, c = 1, d = 15;
                running = true;
                (function () {
                    showMenu.setStyle('opacity', QZFL.transitions.regularEaseInOut(t, b, c, d));
                    if (t < d) {
                        setTimeout(arguments.callee, 30);
                        t++;
                    } else {
                        running = false;
                    }
                })();
            }, 250);
        };
        hideFunc = function () {
            clearTimeout(tm);
            tm = setTimeout(function () {
                showMenu.removeClass('bar_code_out');
                showMenu.setStyle('opacity', 0);
            }, 450);
        };
        buyMenu.bind('mouseover', showFunc);
        showMenu.bind('mouseover', showFunc);
        buyMenu.bind('mouseout', hideFunc);
        showMenu.bind('mouseout', hideFunc);
        tbCtx.find('.bar_top').bind('click', function () {
            document[document.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = 0;
            QZFL.event.preventDefault();
        });
        tbCtx.find('.bar_bottom').bind('click', function () {
            document[document.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = QZFL.dom.getScrollHeight();
            QZFL.event.preventDefault();
        });
        if (QZFL.userAgent.ie < 7) {
            tbCtx.setStyle('position', 'absolute');
            QQVIP.event.addEvent(window, 'scroll', function () {
                tbCtx.setStyle('top', QZFL.dom.getClientHeight() + QZFL.dom.getScrollTop() - 180 + 'px');
            });
        }
    };
    PIAO.initCitySearch = function () {
        var search_list = $e("#piao_city_search_list");
        var search_btn = $e("#piao_city_search_btn");
        var search_txt = $e("#piao_city_search_txt");
        search_list.bind('mouseover', function (evt) {
            var t = evt.srcElement || evt.target;
            $e('#piao_city_search_list li').removeClass('current');
            if (t.tagName.toUpperCase() == 'LI' && t.innerHTML != '无该城市搜索结果') {
                $e(t).addClass('current');
            }
        });
        search_list.bind('click', function (evt) {
            var t = evt.srcElement || evt.target;
            if (t.tagName.toUpperCase() == 'LI' && t.innerHTML != '无该城市搜索结果') {
                search_list.setStyle('display', 'none');
                search_txt.setVal(t.innerHTML);
                var cityid = t.getAttribute('cityid');
                PIAO.changePiaoCity(cityid);
            }
        });
        search_btn.bind('click', function () {
            var $ul = search_list;
            var curli = $ul.find('li.current');
            if (curli.elements.length == 1) {
                var cityid = curli.elements[0].getAttribute('cityid');
                PIAO.changePiaoCity(cityid);
            } else {
                PIAO.PopMsg.msg("暂无输入城市数据!");
            }
        });
        search_txt.bind('keyup', function (evt) {
            var t = evt.srcElement || evt.target;
            var $ul = search_list;
            var txt = t.value.trim().html();
            if (evt.keyCode == 13) {
                $ul.setStyle('display', 'none');
                var curli = $ul.find('li.current');
                if (curli.elements.length == 1) {
                    var cityid = curli.elements[0].getAttribute('cityid');
                    PIAO.changePiaoCity(cityid);
                } else {
                    PIAO.PopMsg.msg("暂无输入城市数据!");
                }
                return;
            }
            if (evt.keyCode == 40 || evt.keyCode == 38) {
                if ($ul.getStyle('display') == 'block') {
                    var liArr = $e('#piao_city_search_list li');
                    var currentLi, nextLi;
                    liArr.each(function (li) {
                        if (li.className == 'current') {
                            currentLi = $e(li);
                            return false;
                        }
                    });
                    if (!currentLi) {
                        currentLi = liArr.get(0);
                        currentLi.addClass('current');
                    } else {
                        currentLi.removeClass('current');
                        if (evt.keyCode == 40) {
                            nextLi = currentLi.getNext();
                            if (nextLi.elements.length > 0 && nextLi.elements[0] == null) {
                                currentLi = liArr.get(0);
                                currentLi.addClass('current');
                            } else {
                                nextLi.addClass('current');
                            }
                        } else {
                            nextLi = currentLi.getPrev();
                            if (nextLi.elements.length > 0 && nextLi.elements[0] == null) {
                                currentLi = liArr.get(liArr.elements.length - 1);
                                currentLi.addClass('current');
                            } else {
                                nextLi.addClass('current');
                            }
                        }
                    }
                    t.value = $ul.find('li.current').getHtml();
                }
                return;
            }
            var func = function (data) {
                if (txt.length === 0) {
                    $ul.setStyle('display', 'none');
                    return;
                }
                var filterData = [], city;
                for (var prop in data) {
                    city = data[prop];
                    if (city['name'].indexOf(txt) === 0 || city['pinyin'].indexOf(txt) === 0) {
                        if (city['name'] == txt) {
                            filterData.push('<li class="current" cityid="' + prop + '">' + city['name'] + '</li>');
                        } else {
                            filterData.push('<li cityid="' + prop + '">' + city['name'] + '</li>');
                        }
                    }
                }
                if (filterData.length > 0) {
                    $ul.setHtml(filterData.join(''));
                    $ul.setStyle('display', 'block');
                } else {
                    $ul.setHtml('<li style="color:red">无该城市搜索结果</li>');
                    $ul.setStyle('display', 'block');
                }
            };
            PIAO.getAllCity('', '', func);
        });
    }
})(PIAO);
(function () {
    var url = location.href;
    var tag = url.replace(/[\w:]+\/\/[\w\.]+\/(\w+)\/.*/g, "$1");
    var html = url.replace(/.*\/(.*)\.htm(l)*.*/g, "$1");
    var map = $e("#piao_nav_map a");
    var navs = map['elements'];
    try {
        if (QQVIP.userAgent.ie < 7) {
            document.execCommand("BackgroundImageCache", false, true);
        }
    } catch (e) {
    }
    if (!navs) {
        return false;
    }
    var index = -1;
    QZFL.event.addEvent(window, "load", function () {
        if (typeof(pageFlag) != "undefined" && typeof(webFlag) != "undefined") {
            PIAO.speedReport.send(startStepMark, webFlag, pageFlag);
        }
    });
    setTimeout(function () {
        if (!PIAO.curCity && typeof(all_city_map) == "undefined") {
            PIAO.curCityName = '深圳';
            PIAO.curCity = 221;
        }
    }, 2000);
    var yw_cls = "";
    PIAO.initHeader();
    if (window.top == window.self) {
        PIAO.reportTA();
    }
    if (html != "search") {
        PIAO.initSearch();
    }
    switch (tag) {
        case'yanchu':
            index = 2;
            yw_cls = "site_yc";
            break;
        case'jingdian':
            index = 3;
            yw_cls = "site_jd";
            break;
        case'movie':
        case'dianying':
            index = 1;
            yw_cls = "site_movie";
            if (url.indexOf('/act/') != -1) {
                index = 4;
                tag = 'act';
                PIAO.initActSubNav();
            }
            break;
        case'acts':
        case'act':
            index = 4;
            PIAO.initActSubNav();
            break;
        case'my':
            index = 5;
            PIAO.initMYInfo();
            break;
    }
    if (index == -1) {
        switch (html) {
            case'http://piao.qq.com/':
                index = 0;
                break;
            case'index':
                index = 0;
                break;
            case'help':
                index = -2;
                break;
        }
    }
    if (yw_cls !== "") {
        var yw_el = document.getElementById('yw_name_h2');
        if (yw_el) {
            yw_el.style.display = "";
            yw_el.className = yw_cls;
        }
    }
    if (tag == 'dianying') {
        if (html == 'city_err') {
            PIAO.checkMovieCity = false;
        } else {
            PIAO.checkMovieCity = true;
        }
    }
    if (index == -1 && tag == url) {
        index = 0;
    }
    if (index >= 0 && navs.length > index) {
        navs[index].className = 'current';
    }
    var cityId = PIAO.getHrefArgs()["city"];
    if (!/^[1-9]\d*$/.test(cityId)) {
        cityId = null;
    }
    if (cityId) {
        PIAO.cookie.set("piao_city", cityId);
    }
    PIAO.curCity = cityId || PIAO.cookie.get("piao_city") || null;
    PIAO.CurCityName = "";
    if (PIAO.curCity === null) {
        PIAO.getUserCity();
    } else {
        PIAO.initNavCity();
    }
    PIAO.initUserLoginInfo();
    setTimeout(function () {
        PIAO.initReport();
    }, 150);
    setTimeout(function () {
        PIAO.JsLoader("http://imgcache.qq.com/club/portal_new/bulletin.js", null, "gb2312", false);
    }, 100);
})();