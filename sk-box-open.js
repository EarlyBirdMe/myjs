(function (b) {
    window.XBox = {content: null, version: "v1.3.4", init: function (a) {
        var c = b.defaultConfig(a.site);
        b.extend(c, a || {});
        if (!("1,2,3,14,15,50,51,52,61,".indexOf(c.site + ",") == -1 || b.trim(c.site) == ""))this.content = new b.KuBox(c), aa = this
    }, clean: function () {
        this.content.cleanRefresh()
    }, suggestUpdate: function (a) {
        this.kUpdate(a)
    }, kUpdate: function (a) {
        this.content.kUpdate(a, !0)
    }, yUpdate: function (a) {
        this.content.yUpdate(a)
    }};
    b.trim = function (a) {
        return String.prototype.trim ? a == null || a == void 0 ? "" : String.prototype.trim.call(a) :
            a == null || a == void 0 ? "" : a.toString().replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
    };
    b.g = function (a) {
        if ("string" == typeof a || a instanceof String)return document.getElementById(a); else if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9))return a;
        return null
    };
    b.gc = function (a, c, d) {
        var e = [], g, f, h;
        if (!(a = b.trim(a)))return null;
        if ("undefined" == typeof c)c = document; else if (c = b.g(c), !c)return e;
        d && (d = b.trim(d).toUpperCase());
        if (c.getElementsByClassName) {
            f = c.getElementsByClassName(a);
            c = f.length;
            for (g = 0; g < c; g++)h =
                f[g], d && h.tagName != d || (e[e.length] = h)
        } else {
            a = RegExp("(^|\\s)" + a + "(\\s|$)");
            f = d ? c.getElementsByTagName(d) : c.all || c.getElementsByTagName("*");
            c = f.length;
            for (g = 0; g < c; g++)h = f[g], a.test(h.className) && (e[e.length] = h)
        }
        return e
    };
    b.isFunction = function (a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    };
    b.isArray = function (a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    };
    b.readCookie = function (a) {
        var c = "";
        a += "=";
        if (document.cookie.length > 0 && (offset = document.cookie.indexOf(a), offset != -1)) {
            offset += a.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)end = document.cookie.length;
            c = unescape(document.cookie.substring(offset, end))
        }
        return c
    };
    b.isEmptyObject = function (a) {
        if (a == null || a == void 0)return!0;
        for (var c in a)return!1;
        return!0
    };
    b.extend = function (a, c) {
        for (var d in c)c.hasOwnProperty(d) && c[d] != null && c[d] != void 0 && (a[d] = c[d])
    };
    b.bind = function (a, c) {
        var d = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
        return function () {
            var b = Object.prototype.toString.call(a) ===
                "[object String]" ? c[a] : a, g = d ? d.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
            return b.apply(c || b, g)
        }
    };
    b.events = {element: function (a) {
        return a.target || a.srcElement
    }, listen: function (a, c, d) {
        b.events.attachEvent(a, c, d, !1, null)
    }, attachEvent: function (a, c, d, b, g) {
        if (c == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || a.attachEvent))c = "keydown";
        a.addEventListener ? a.addEventListener(c, d, b) : a.attachEvent && (a["e" + c + (g || "") + d] = d, a[c + (g || "") + d] = function () {
            return a["e" + c + (g || "") + d](window.event)
        },
            a.attachEvent("on" + c, a[c + (g || "") + d]))
    }, listenLive: function (a, c, d, e, g) {
        b.events.attachEvent(a, d, b.bind(function (a) {
            var d = b.events.element(a ? a : window.event);
            (d.getAttribute("sk_live") == c || c == "") && e.apply(d, arguments)
        }, this), g || !1, c)
    }};
    b.browser = {ua: navigator.userAgent.toLowerCase(), isOpera: function () {
        return this.ua.indexOf("opera") > -1
    }, isChrome: function () {
        return/chrome/.test(this.ua)
    }, isSafari: function () {
        return!this.isChrome() && /safari/.test(this.ua)
    }, isIE: function () {
        return!this.isOpera() && this.ua.indexOf("msie") > -1
    }, isIE6: function () {
        return!this.isOpera() && this.ua.indexOf("msie 6") > -1
    }, isIE7: function () {
        return!this.isOpera() && this.ua.indexOf("msie 7") > -1
    }, isIE8: function () {
        return!this.isOpera() && this.ua.indexOf("msie 8") > -1
    }, isGecko: function () {
        return!this.isSafari() && this.ua.indexOf("gecko") > -1
    }};
    b.dom = {visible: function (a) {
        return b.g(a).style.display != "none"
    }, hide: function () {
        for (var a = 0; a < arguments.length; a++)b.g(arguments[a]).style.display = "none"
    }, show: function () {
        for (var a = 0; a < arguments.length; a++)b.g(arguments[a]).style.display =
            "block"
    }, getHeight: function (a) {
        a = b.g(a);
        return a.offsetHeight
    }, addClass: function (a, c) {
        if (a = b.g(a))a.className = "" == a.className ? c : a.className + " " + c
    }, removeClass: function (a, c) {
        if (a = b.g(a))a.className = a.className.replace(RegExp("(^| )" + c + "( |$)"), "$1").replace(/ $/, "")
    }, hasClass: function (a, c) {
        for (var d = a.className.split(/\s+/), b = 0; b < d.length; b++)if (d[b] == c)return!0;
        return!1
    }, attr: function (a, c, d) {
        var b = c;
        if (typeof c === "string")if (d === void 0)return a && a.getAttribute(c); else b = {}, b[c] = d;
        for (var g in b)a.setAttribute(g,
            b[g])
    }, isTag: function (a, c) {
        if (!a)return!1;
        return a.tagName.toLowerCase() == c.toLowerCase()
    }, cleanChild: function (a) {
        for (; a.childNodes.length > 0;)a.removeChild(a.firstChild)
    }};
    b.defaultConfig = function (a) {
        switch (a.toString()) {
            case "1":
                return{clientMark: "SOKUSESSID", kUrl: "http://tip.soku.com/search_keys", yUrl: "http://tip.soku.com/search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/v?keyword=" + encodeURIComponent(a) : ""
                }};
            case "2":
                return{clientMark: "SOKUSESSID", kUrl: "http://tip.soku.com/search_keys",
                    yUrl: "http://tip.soku.com/search_yun", queryUrl: function (a) {
                        return a ? "http://www.soku.com/search_video/q_" + encodeURIComponent(a) : ""
                    }};
            case "3":
                return{kUrl: "http://tip.tudou.soku.com/search_keys", yUrl: "http://tip.soku.com/t_search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/t/nisearch/" + encodeURIComponent(a) : ""
                }};
            case "14":
                return{clientMark: "__ysuid", target: "_blank", kUrl: "http://tip.soku.com/search_keys", yUrl: "http://tip.soku.com/search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/search_video/q_" +
                        encodeURIComponent(a) : ""
                }};
            case "15":
                return{target: "_blank", kUrl: "http://tip.tudou.soku.com/search_keys", yUrl: "http://tip.soku.com/t_search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/t/nisearch/" + encodeURIComponent(a) : ""
                }};
            case "50":
                return{clientMark: "SOKUSESSID", skin: "simple", size: 5, contentId: "id_xbox", iframe: !1, kUrl: "http://tip.soku.com/search_keys", yUrl: "http://tip.soku.com/search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/m/s/video?q=" + encodeURIComponent(a) : ""
                }, whenInput: function (a) {
                    a ?
                        !$("div.yk-cancel")[0] && $('<div class="yk-cancel" ></div>').appendTo($("div.yk-so-box")) : $("div.yk-cancel").remove()
                }, beforeShow: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "0px")
                }, beforeHide: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "109px")
                }};
            case "51":
                return{clientMark: "SOKUSESSID", skin: "simple", size: 5, contentId: "id_xbox", iframe: !1, kUrl: "http://tip.soku.com/search_keys", yUrl: "http://tip.soku.com/search_yun", queryUrl: function (a) {
                    return a ? "http://www.soku.com/m/y/video?q=" +
                        encodeURIComponent(a) : ""
                }, whenInput: function (a) {
                    a ? !$("div.yk-cancel")[0] && $('<div class="yk-cancel" ></div>').appendTo($("div.yk-so-box")) : $("div.yk-cancel").remove()
                }, beforeShow: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "0px")
                }, beforeHide: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "109px")
                }};
            case "52":
                return{skin: "simple", size: 5, iframe: !1, contentId: "id_xbox", kUrl: "http://tip.tudou.soku.com/search_keys", yUrl: "http://tip.soku.com/t_search_yun", queryUrl: function (a) {
                    return a ?
                        "http://www.soku.com/m/t/video?q=" + encodeURIComponent(a) : ""
                }, whenInput: function (a) {
                    a ? !$("div.yk-cancel")[0] && $('<div class="yk-cancel" ></div>').appendTo($("div.yk-so-box")) : $("div.yk-cancel").remove()
                }, beforeShow: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "0px")
                }, beforeHide: function () {
                    $("div.yk-header-box div.yk-so-box").css("margin-left", "109px")
                }};
            case "61":
                return{skin: "simple", size: 5, clientMark: "__ysuid", target: "_blank", kUrl: "http://tip.soku.com/search_keys", yUrl: "http://tip.soku.com/search_yun",
                    queryUrl: function (a) {
                        return a ? "http://www.soku.com/m/y/video?q=" + encodeURIComponent(a) : ""
                    }};
            default:
                return{}
        }
    };
    b.log = function (a) {
        this.cons = {LOG_MOUSE_SELECT: "mouseSelect", LOG_KEY_SELECT: "keySelect"};
        this.settings = {site: "", costSize: 10};
        b.extend(this.settings, a || {});
        this.costRepository = {};
        this.costRepositorySize = 0;
        this.startCost = function (a) {
            this.costRepositorySize >= this.settings.costSize || (this.costRepository[a] = (new Date).getTime(), this.costRepositorySize++)
        };
        this.endCost = function (a) {
            var d = this.costRepository[a];
            d && (this.costRepository[a] = (new Date).getTime() - d)
        };
        this.sendCost = function () {
            var a = "[", d = !1;
            for (k in this.costRepository) {
                var b = this.costRepository[k];
                b && (d && (a += ","), a += "{", a += "c:", a += b, a += "}", d = !0)
            }
            a += "]";
            if (d)this.costRepository = {}, this.costRepositorySize = 0, this._request(this._buildDataLogUrl({type: 4, pos: "7", cost: a}))
        };
        this.send = function (a) {
            this._request(this._buildClickLogUrl(a || {}));
            this._request(this._buildDataLogUrl(a || {}))
        };
        this._buildClickLogUrl = function (a) {
            var b = "http://lstat.youku.com/sokuClick.php";
            b += "?type=" + (a.type || "");
            b += "&pos=" + (a.pos || "");
            b += "&keyword=" + encodeURIComponent(a.qword || "");
            b += "&url=" + encodeURIComponent(a.url || "");
            b += "&site=" + (this.settings.site || "");
            return b
        };
        this._buildDataLogUrl = function (a) {
            var b = "http://log.soku.com/sak.gif";
            b += "?type=" + (a.type || "");
            b += "&pos=" + (a.pos || "");
            b += "&keyword=" + encodeURIComponent(a.qword || "");
            b += "&url=" + encodeURIComponent(a.url || "");
            b += "&site=" + (this.settings.site || "");
            b += "&ok=" + encodeURIComponent(a.bword || "");
            b += "&os=" + encodeURIComponent(a.qword ||
                "");
            b += "&dv=" + (a.dataver || "");
            b += "&kq=" + (a.wordtype || "");
            b += "&kt=" + (a.operate || "");
            b += "&re=" + encodeURIComponent(this._getRefer());
            b += "&ki=" + (a.windex || 0);
            var e = document.getElementById("log_param_soku"), e = e ? e.getAttribute("keyword") : "";
            b += "&lk=" + (e || "");
            b += "&cost=" + (a.cost || "[]");
            return b
        };
        this._getRefer = function () {
            var a = document.referrer || "";
            if (a != "")return a;
            return window.location
        };
        this._request = function (a) {
            var b = new Image, e = "soku_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
            window[e] =
                b;
            b.onload = b.onerror = b.onabort = function () {
                b.onload = b.onerror = b.onabort = null;
                b = window[e] = null
            };
            b.src = a
        }
    };
    b.XDomain = function (a) {
        this.settings = {proxy: "about:blank"};
        b.extend(this.settings, a || {});
        this.box = document.body || document.getElementsByTagName("head")[0]
    };
    b.extend(b.XDomain.prototype, {send: function (a) {
        var c = {url: null, success: function () {
        }, dataType: "string"};
        b.extend(c, a || {});
        if (c.url && typeof c.url === "string") {
            c.url += (c.url.indexOf("?") > 0 ? "&" : "?") + "windowname=get";
            var d = document.createElement("iframe");
            d.style.display = "none";
            d._state = 0;
            this.box.appendChild(d);
            b.events.listen(d, "load", b.bind(function () {
                if (d._state == 1) {
                    var a = d.contentWindow.name ? c.dataType == "object" ? eval("(" + d.contentWindow.name + ")") : c.dataType == "string" ? d.contentWindow.name : null : null;
                    c.success && typeof c.success === "function" && c.success.call(this, a);
                    this._destory(d)
                } else if (d._state == 0)d._state = 1, d.contentWindow.location.replace(this.settings.proxy)
            }, this));
            d.src = c.url
        }
    }, _destory: function (a) {
        a.contentWindow.document.write("");
        a.contentWindow.close();
        this.box.removeChild(a)
    }});
    b.autoremind = function (a) {
        var c = {minChars: 0, maxChars: 15, delay: 50, searchId: "headq", request: function () {
        }, moveUp: function () {
        }, moveDown: function () {
        }, enter: function () {
        }};
        b.extend(c, a || {});
        var d = document.getElementById(c.searchId), e = {BACKSPACE: 8, TAB: 9, RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, INSERT: 45, SHIFT: 16, CTRL: 17, ALT: 18, CAPSLOCK: 20, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F9: 120, F10: 122, F12: 123};
        b.events.listen(d,
            "keypress", b.bind(function (a) {
                var f = b.trim(d.value).length + 1, a = a || window.event;
                switch (a.which ? a.which : a.keyCode) {
                    case e.RETURN:
                        c.enter.apply(this, arguments);
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        break;
                    case e.UP:
                        c.moveUp.apply(this, arguments);
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        break;
                    case e.DOWN:
                        c.moveDown.apply(this, arguments);
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        break;
                    case e.ESC:
                    case e.PAGE_UP:
                    case e.PAGE_DOWN:
                    case e.END:
                    case e.HOME:
                    case e.INSERT:
                    case e.CTRL:
                    case e.ALT:
                    case e.DELETE:
                    case e.LEFT:
                    case e.RIGHT:
                    case e.SHIFT:
                    case e.TAB:
                    case e.CAPSLOCK:
                    case e.F1:
                    case e.F2:
                    case e.F3:
                    case e.F4:
                    case e.F5:
                    case e.F6:
                    case e.F7:
                    case e.F9:
                    case e.F10:
                    case e.F11:
                    case e.F12:
                        break;
                    case e.BACKSPACE:
                        f = f - 2 < 0 ? 0 : f - 2;
                    default:
                        if (f >= c.minChars && f <= c.maxChars)this.requestTimeoutId != 0 && clearTimeout(this.requestTimeoutId), this.requestTimeoutId = setTimeout(function () {
                            c.request.apply(this, arguments)
                        }, c.delay)
                }
            }, this))
    };
    b.KuBox = function (a) {
        this.settings = {site: "", searchId: "headq", size: 10, target: "_self", contentId: null, refreshId: "_xbox_refresh", skin: "classics", historyName: "cshn", history: !1, crossHistory: !1, iframe: !0, clientMark: null, kUrl: null, yUrl: null, queryUrl: function () {
        }, beforeEnter: function () {
            return!0
        },
            whenInput: function () {
            }, beforeShow: function () {
            }, afterShow: function () {
            }, beforeHide: function () {
            }, afterHide: function () {
            }};
        b.extend(this.settings, a || {});
        this.repository = {};
        this.log = new b.log({site: this.settings.site});
        this.XDomain = new b.XDomain;
        this.keys = {};
        if (this.dom_search = b.g(this.settings.searchId))this.initQueryWord = this._bword(), this.dom_boxDiv = document.createElement("div"), this.dom_scriptDiv = document.createElement("div"), this.dom_content = this.settings.contentId ? b.g(this.settings.contentId) : this.dom_search.parentNode,
            this.dom_content.appendChild(this.dom_boxDiv), this.dom_content.appendChild(this.dom_scriptDiv), this.dom_boxDiv.innerHTML = this._skinManager.htmlKeel.call(this, this.settings.skin), this.dom_refreshDiv = b.g(this.settings.refreshId), this.hide(), this.settings.history && this.updateHistory(), this._skinManager.event.call(this, this.settings.skin)
    };
    b.extend(b.KuBox.prototype, {kUpdate: function (a, c) {
        if (typeof a == "object") {
            var d = a.q;
            c && this.log.endCost(d);
            b.isEmptyObject(this.repository[d]) && (this.repository[d] =
                a);
            d == this._bword() && (b.dom.cleanChild(this.dom_refreshDiv), this.show(d))
        }
    }, yUpdate: function (a) {
        if (typeof a == "object") {
            var c = a.q || "", d = a.dq || "";
            b.isEmptyObject(this.repository[c]) && (this.repository[c] = a);
            this.initQueryWord == "" && d != "" && this.defaultWord(d);
            c == this._bword() && (b.dom.cleanChild(this.dom_refreshDiv), this.show(c))
        }
    }, show: function (a) {
        this.settings.beforeShow.apply(this, arguments);
        var c = !1;
        if (this.dom_refreshDiv.childNodes.length > 0)b.dom.visible(this.dom_boxDiv) || (b.dom.show(this.dom_boxDiv),
            c = !0); else {
            var d = this._skinManager.htmlRefresh.call(this, this.settings.skin, this.repository[a || this._bword()]);
            d != "" ? (this.dom_refreshDiv.innerHTML = d, b.dom.show(this.dom_boxDiv), c = !0) : this.hide();
            this._resetIframe()
        }
        var d = b.gc("autolist", this.dom_boxDiv, "ul"), d = b.isArray(d) && d.length > 0 ? d[0].childNodes : [], e = d.length > 0 ? d[0].getAttribute("dataver") : "";
        (d.length > 0 ? d[0].getAttribute("boxtype") : "") == "1" && c && this.log.send({type: 4, pos: "6", bword: this._bword(), dataver: e});
        c && this.settings.afterShow.apply(this,
            arguments)
    }, hide: function () {
        this.dom_refreshDiv.childNodes.length > 0 ? (this.settings.beforeHide.apply(this, arguments), b.dom.visible(this.dom_boxDiv) && (b.dom.hide(this.dom_boxDiv), this.settings.afterHide.apply(this, arguments))) : b.dom.hide(this.dom_boxDiv)
    }, cleanRefresh: function () {
        this.dom_refreshDiv.innerHTML = ""
    }, defaultWord: function (a) {
        this.dom_search.value = a;
        this.dom_search.defaultValue = a
    }, updateHistory: function () {
        try {
            var a = this._bword();
            if (!(a == "" || a == void 0)) {
                var b = a, d = this._readCookie(this.settings.historyName);
                if (d != "")for (var e = d.split(","), d = 0; d < e.length; d++)if (e[d] != "" && e[d] != a && (b += "," + e[d], d >= 8))break;
                this._writeCookie(this.settings.historyName, b, 720, ".soku.com", "/")
            }
        } catch (g) {
        }
    }, cleanHistory: function () {
        this._writeCookie(this.settings.historyName, "", 720, ".soku.com", "/")
    }, timeRequest: function () {
        this.initTimeRequestWord = this._bword();
        this.requestIntervalId != 0 && clearInterval(this.requestIntervalId);
        var a = this;
        this.requestIntervalId = setInterval(function () {
            var b = a._bword();
            if (b != a.initTimeRequestWord)a.initTimeRequestWord =
                b, a._handler.remoteKu.call(a)
        }, 50)
    }, _resetIframe: function () {
        if (this.settings.iframe) {
            var a = this.dom_boxDiv.childNodes[0], b = document.getElementById("sk_holder_iframe");
            if (a && b)b.style.width = a.offsetWidth + "px", b.style.height = a.offsetHeight + "px"
        }
    }, _bword: function (a) {
        if (a)this.dom_search.value = a;
        return b.trim(this.dom_search.value)
    }, _sub: function (a, c, d, e) {
        a = b.trim(a);
        if (a == "")return"";
        if (c && (c = a.split(" "), c != null && c.length > 0))for (var g = 0, f = !0; g < c.length; g++, f = !1) {
            var h = c[g];
            if (f)a = h; else {
                if (!/^[a-zA-Z]+$/.test(h))break;
                a += " " + h
            }
        }
        c = a.length;
        d = /^[0-9a-zA-Z\s.,-]+$/.test(a) ? d * 2 : d;
        if (d >= c)return a;
        return a.substring(0, d) + e
    }, _hight: function (a, b, d) {
        var e = this._bword(), g = e.length, f = a ? a.length : 0;
        if (g <= 0 || g >= f)return a;
        if (a.substring(0, g) == e)return a.substring(0, g) + b + a.substring(g) + d;
        return a
    }, _readCookie: function (a) {
        var b = "";
        a += "=";
        if (document.cookie.length > 0 && (offset = document.cookie.indexOf(a), offset != -1)) {
            offset += a.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)end = document.cookie.length;
            b = unescape(document.cookie.substring(offset,
                end))
        }
        return b
    }, _writeCookie: function (a, b, d, e, g) {
        var f = "";
        d != null && (f = new Date((new Date).getTime() + d * 36E5), f = "; expires=" + f.toGMTString());
        document.cookie = a + "=" + escape(b) + f + (g == null ? "" : "; path=" + g) + (e == null ? "" : ";domain=" + e)
    }, _skinManager: {cons: {SIMPLE: "simple", CLASSICS: "classics"}, htmlKeel: function (a) {
        return a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleKeel.call(this) : this._skinManager._classicsKeel.call(this)
    }, htmlRefresh: function (a, b) {
        return a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleHTML.call(this,
            b) : this._skinManager._classicsHTML.call(this, b)
    }, event: function (a) {
        a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleEvent.call(this) : this._skinManager._classicsEvent.call(this)
    }, _buildIframe: function () {
        return this.settings.iframe ? '<iframe id="sk_holder_iframe" frameborder="0" scrolling="no" style="position: absolute; z-index: ' + (b.browser.isIE() ? -1 : 0) + '; top: -2px; left: -2px;"></iframe>' : ""
    }, _simpleKeel: function () {
        var a = [];
        a.push('<div class="yk-kubox">');
        a.push(this._skinManager._buildIframe.call(this));
        a.push('<ul class="autocomplete" id="' + this.settings.refreshId + '">');
        a.push("</ul>");
        a.push("</div>");
        return a.join("")
    }, _simpleHTML: function (a) {
        if (b.isEmptyObject(a))return"";
        var c = a.q, d = a.r, e = a.vs || "", a = a.t || "", g = !1;
        if (!b.isArray(d) || d.length == 0)return"";
        for (var f = [], h = 0; h < d.length && h < this.settings.size; h++) {
            var j = d[h], i = j.b || "", j = j.c, m = this._hight(j, '<em sk_live="kuwordlist">', "</em>");
            i == 1 && d.length == 1 && !this._readCookie(this.settings.historyName) || (g = !0, f.push('<li sk_live="kuwordlist" boxtype="' +
                a + '" wordtype="' + i + '" dataver="' + e + '" windex="' + h + '" qword="' + j + '" ><a sk_live="kuwordlist" ><span class="title" sk_live="kuwordlist">' + m + '</span></a><div class="yk-sel" sk_live="puton" ><span class="yk-select" sk_live="puton" ></span></div></li>'))
        }
        g && f.push("<li>" + (c ? "" : '<a sk_live="clean"><span class="title documentary" sk_live="clean">\u6e05\u9664\u641c\u7d22\u8bb0\u5f55</span></a>') + '<div class="yk-sel" sk_live="close" ><span class="yk-close" sk_live="close">\u6536\u8d77</span></div></li>');
        return f.join("")
    }, _classicsKeel: function () {
        var a = [];
        a.push('<div class="kubox' + (this.settings.site == 3 || this.settings.site == 15 ? " kubox_tudou" : "") + '" style="display:block;">');
        a.push(this._skinManager._buildIframe.call(this));
        a.push('<div class="main" id="' + this.settings.refreshId + '">');
        a.push("</div>");
        a.push("</div>");
        return a.join("")
    }, _classicsHTML: function (a) {
        if (b.isEmptyObject(a))return"";
        var c = a.r, d = a.vs || "", e = a.t || "";
        if (!b.isArray(c) || c.length == 0)return"";
        a = [];
        a.push('<ul class="autolist">');
        for (var g = 0; g < c.length && g < this.settings.size; g++) {
            var f = c[g], h = f.u, j = b.isArray(h) && h.length > 0, i = j ? b.trim(h[0].m) : "", h = f.b || "", m = f.c, i = this._hight(h == 1 ? this._sub(m, i != "\u7535\u5f71" && i != "\u7535\u89c6\u5267", 8, "") : m, '<b sk_live="kuwordlist">', "</b>"), n = f.z, f = b.trim(f.l);
            a.push('<li sk_live="kuwordlist" boxtype="' + e + '" wordtype="' + h + '" dataver="' + d + '" windex="' + g + '" qword="' + m + '" ><a sk_live="kuwordlist" href="#" onclick="return false;">' + i + "</a>" + (j && !n ? '<span class="expand">&gt;</span>' : "") + (n ? '<span sk_live="kuwordlist" class="kubox-records">' +
                n + "</span>" : "") + "</li>")
        }
        a.push("</ul>");
        a.push('<div class="panels">');
        for (g = 0; g < c.length && g < this.settings.size; g++) {
            f = c[g];
            h = f.u;
            j = b.isArray(h) && h.length > 0;
            a.push('<div class="panel" style="display:' + (g == 0 && j ? "block" : "none") + ';">');
            for (d = 0; j && d < h.length && d < 1; d++) {
                var l = h[d], f = l.k, e = l.d, m = l.j, n = l.a, i = b.trim(l.m), q = l.y || "", o = l.w || "", p = l.p || "", l = l.b;
                a.push('<div class="item">');
                a.push('<div class="thumb"><a href="' + e + '" target="_blank"><img sk_live="log_show" log_pos="2" src="' + n + '"></a></div>');
                a.push('<div class="title"><a sk_live="log_show" log_pos="2" href="' +
                    e + '" target="_blank">' + m + "</a></div>");
                a.push(i != "" ? '<div class="pub">' + i + "</div>" : "");
                a.push(p != "" && i != "\u52a8\u6f2b" ? '<div class="actor">' + (i == "\u7535\u5f71" || i == "\u7535\u89c6\u5267" ? "\u4e3b\u6f14: " : "\u4e3b\u6301\u4eba: ") + p + "</div>" : "");
                a.push(i == "\u7535\u89c6\u5267" || i == "\u7535\u5f71" || i == "\u52a8\u6f2b" ? '<div class="period">\u5e74\u4ee3: ' + q + "</div>" : "");
                a.push(o != "" && i != "\u7535\u89c6\u5267" && i != "\u7535\u5f71" ? '<div class="period">\u5730\u533a: ' + o + "</div>" : "");
                l && l == "1" ? a.push('<div class="goplay"><a sk_live="log_show" log_pos="5" href="' +
                    f + '" target="_blank"><em>\u7ee7\u7eed\u770b</em></a></div>') : a.push('<div class="play"><a sk_live="log_show" log_pos="3" href="' + f + '" target="_blank"><em>\u64ad\u653e</em></a></div>');
                a.push("</div>")
            }
            j && a.push('<div class="clearfix"></div>');
            a.push("</div>")
        }
        a.push("</div>");
        return a.join("")
    }, _simpleEvent: function () {
        b.events.listen(this.dom_search, "click", b.bind(this._handler.searchClick, this));
        b.events.listen(this.dom_search, "touchstart", b.bind(this._handler.searchClick, this));
        b.events.listen(this.dom_search,
            "input", b.bind(this._handler.searchInput, this));
        b.autoremind({request: b.bind(this._handler.remoteKu, this), enter: b.bind(this._handler.boxWordEnter, this)});
        b.events.listenLive(this.dom_content, "kuwordlist", "click", b.bind(this._handler.bwSimpleClick, this), !0);
        b.events.listenLive(this.dom_content, "clean", "click", b.bind(this._handler.simpleClean, this), !0);
        b.events.listenLive(this.dom_content, "close", "click", b.bind(this._handler.simpleClose, this), !0);
        b.events.listenLive(this.dom_content, "puton", "click",
            b.bind(this._handler.simplePuton, this), !0)
    }, _classicsEvent: function () {
        b.events.listen(document, "click", b.bind(this._handler.documentClick, this));
        b.events.listen(document, "touchstart", b.bind(this._handler.documentClick, this));
        b.events.listen(this.dom_search, "click", b.bind(this._handler.searchClick, this));
        b.events.listen(this.dom_search, "touchstart", b.bind(this._handler.searchClick, this));
        b.events.listen(this.dom_search, "input", b.bind(this._handler.searchInput, this));
        b.autoremind({request: b.bind(this._handler.remoteKu,
            this), moveUp: b.bind(this._handler.boxWordMoveUp, this), moveDown: b.bind(this._handler.boxWordMoveDown, this), enter: b.bind(this._handler.boxWordEnter, this)});
        b.events.listenLive(this.dom_content, "kuwordlist", "mouseover", b.bind(this._handler.boxWordMouseOver, this));
        b.events.listenLive(this.dom_content, "kuwordlist", "click", b.bind(this._handler.boxWordClick, this), !0);
        b.events.listenLive(this.dom_content, "log_show", "click", b.bind(this._handler.boxLogShow, this))
    }}, _handler: {documentClick: function (a) {
        var a =
            b.events.element(a ? a : window.event), c = !1;
        if (a)for (var d = 0; d < 6; d++) {
            if (!a || b.dom.isTag(a, "body"))break;
            if (b.dom.hasClass(a, "kubox") || b.dom.hasClass(a, "yk-kubox") || a.getAttribute("id") == this.settings.searchId) {
                c = !0;
                break
            }
            a = a.parentNode
        }
        if (!c) {
            if (this.initQueryWord == "" && this._bword() == "")this.dom_search.value = this.dom_search.defaultValue;
            this.hideTimeoutId != 0 && clearTimeout(this.hideTimeoutId);
            var e = this;
            this.hideTimeoutId = setTimeout(function () {
                e.hide();
                e.log.sendCost()
            }, 100)
        }
    }, searchClick: function () {
        if (this.initQueryWord ==
            "" && this._bword() == this.dom_search.defaultValue)this.dom_search.value = "";
        b.isEmptyObject(this.repository[this._bword()]) ? this._bword() == "" ? this._handler.remoteYun.call(this) : this._handler.remoteKu.call(this) : this.show()
    }, searchInput: function () {
        if (this._bword() != "") {
            this.inputTimeoutId != 0 && clearTimeout(this.inputTimeoutId);
            var a = this;
            this.inputTimeoutId = setTimeout(function () {
                a.closeClick ? a.closeClick = !1 : a._handler.remoteKu.call(a)
            }, 300)
        }
    }, boxWordMoveUp: function () {
        for (var a = b.gc("autolist", this.dom_boxDiv,
            "ul"), a = b.isArray(a) && a.length > 0 ? a[0].childNodes : [], c = a.length - 1, d = 0; d < a.length; d++) {
            var e = a[d];
            if (e && b.dom.hasClass(e, "current")) {
                c = d == 0 ? a.length - 1 : d - 1;
                break
            }
        }
        this._handler._selectWord.call(this, a[c]);
        this.dom_search.value = a[c].getAttribute("qword")
    }, boxWordMoveDown: function () {
        for (var a = b.gc("autolist", this.dom_boxDiv, "ul"), a = b.isArray(a) && a.length > 0 ? a[0].childNodes : [], c = 0, d = 0; d < a.length; d++) {
            var e = a[d];
            if (e && b.dom.hasClass(e, "current")) {
                c = d == a.length - 1 ? 0 : d + 1;
                break
            }
        }
        this._handler._selectWord.call(this,
            a[c]);
        this.dom_search.value = a[c].getAttribute("qword")
    }, boxWordEnter: function () {
        this.settings.beforeEnter.call(this, this._bword()) && this._handler._requestWord.call(this, this.log.cons.LOG_KEY_SELECT)
    }, boxWordMouseOver: function (a) {
        a = b.events.element(a ? a : window.event);
        this._handler._selectWord.call(this, b.dom.isTag(a, "span") || b.dom.isTag(a, "a") ? a.parentNode : b.dom.isTag(a, "b") ? a.parentNode.parentNode : a)
    }, boxWordClick: function () {
        this._handler._requestWord.call(this, this.log.cons.LOG_MOUSE_SELECT)
    }, boxLogShow: function (a) {
        var a =
            b.events.element(a ? a : window.event), c = b.gc("autolist", this.dom_boxDiv, "ul"), c = b.gc("current", b.isArray(c) && c.length > 0 ? c[0] : null, "li"), c = b.isArray(c) && c.length > 0 ? c[0] : null, d = b.dom.isTag(a, "img") ? a.parentNode.getAttribute("href") : a.getAttribute("href");
        this.log.send({type: 4, pos: a.getAttribute("log_pos"), bword: this._bword(), wordtype: c.getAttribute("wordtype"), qword: c.getAttribute("qword"), dataver: c.getAttribute("dataver"), url: d, windex: c.getAttribute("windex")})
    }, remoteKu: function () {
        var a = this._bword();
        this.settings.whenInput.call(this, a);
        var c = this.repository[a];
        if (b.isEmptyObject(c))if (a == "")this._handler.remoteYun.call(this); else {
            if (!(b.trim(this.settings.kUrl) == "" || this.keys[a]))this.keys[a] = a, c = "", c += (this.settings.kUrl.indexOf("?") > -1 ? "&" : "?") + "jsoncallback=XBox.kUpdate", c += "&query=" + encodeURIComponent(a), c += this.settings.site != "1" ? "&site=" + this.settings.site : "", c += "&h=" + (new Date).getHours(), b.dom.cleanChild(this.dom_scriptDiv), this.log.startCost(a), a = document.createElement("script"), a.src =
                this.settings.kUrl + c, this.dom_scriptDiv.appendChild(a)
        } else a != "" ? this.kUpdate(c) : this.yUpdate(c)
    }, remoteYun: function () {
        b.trim(this.settings.yUrl) == "" ? this.hide() : this.keys[""] || (this.keys[""] = "search_yun", this._handler._requestYkYun.call(this))
    }, simpleClean: function () {
        window.confirm("\u786e\u8ba4\u6e05\u9664\u5168\u90e8\u641c\u7d22\u8bb0\u5f55?") && (this.cleanHistory(), this.hide(), this.cleanRefresh(), this.repository[""] = "", this.keys[""] = "")
    }, simpleClose: function () {
        this.closeClick = !0;
        this.hide();
        this.log.sendCost()
    },
        simplePuton: function () {
            var a = b.events.element(event ? event : window.event), a = b.dom.isTag(a, "span") ? a.parentNode : a, c = a.parentNode, d = b.gc("selected", c.parentNode, "div");
            b.isArray(d) && d.length > 0 && b.dom.removeClass(d[0], "selected");
            b.dom.addClass(a, "selected");
            if (a = c.getAttribute("qword"))this._bword(a), this._handler.remoteKu.call(this)
        }, bwSimpleClick: function (a) {
            var a = b.events.element(a ? a : window.event), a = b.dom.isTag(a, "a") ? a.parentNode : b.dom.isTag(a, "span") ? a.parentNode.parentNode : b.dom.isTag(a, "em") ? a.parentNode.parentNode.parentNode :
                a, c = b.gc("current", a.parentNode, "a");
            b.isArray(c) && c.length > 0 && b.dom.removeClass(c[0], "current");
            b.dom.addClass(a.firstChild, "current");
            this._resetIframe();
            var c = this._bword(), d = "0", e = "", g = "";
            a && (c = a.getAttribute("qword"), d = a.getAttribute("windex"), e = a.getAttribute("dataver"), g = a.getAttribute("wordtype"));
            a = c != "" ? this.settings.queryUrl.call(this, c) : "http://www.soku.com";
            this.log.send({type: 4, pos: "1", bword: this._bword(), wordtype: g, qword: c, dataver: e, url: a, windex: d || "0"});
            this.log.sendCost();
            this.settings.target ==
                "_blank" ? window.open(a, "_blank") : document.location = a
        }, simpleTouchStart: function (a) {
            a.preventDefault();
            a.stopPropagation();
            stx = sty = etx = ety = curX = curY = 0;
            stx = a.touches[0].pageX;
            sty = a.touches[0].pageY
        }, simpleTouchMove: function (a) {
            a.preventDefault();
            a.stopPropagation();
            curX = a.targetTouches[0].pageX - stx + etx;
            curY = a.targetTouches[0].pageY - sty + ety
        }, simpleTouchEnd: function (a, b) {
            b.preventDefault();
            b.stopPropagation();
            etx = curX;
            ety = curY;
            var d = Math.abs(ety);
            Math.abs(etx) < 10 && d < 10 && a && a.call(this, b)
        }, _requestHistory: function (a) {
            this.settings.crossHistory ?
                this.XDomain.send({url: "http://www.soku.com/search/cookie.html?cn=" + this.settings.historyName, success: function (b) {
                    a && a.call(this, b)
                }}) : a && a.call(this, this._readCookie(this.settings.historyName))
        }, _requestYkYun: function () {
            var a = "";
            a += (this.settings.yUrl.indexOf("?") > -1 ? "&" : "?") + "jsoncallback=XBox.yUpdate";
            a += "&site=" + this.settings.site;
            var c = this._readCookie(this.settings.clientMark);
            a += c != "" ? "&cm=" + c : "";
            a += "&h=" + (new Date).getHours();
            b.dom.cleanChild(this.dom_scriptDiv);
            c = document.createElement("script");
            c.src = this.settings.yUrl + a;
            this.dom_scriptDiv.appendChild(c)
        }, _requestTdYun: function () {
            this._handler._requestHistory.call(this, function () {
            })
        }, _requestWord: function (a) {
            var c = this._bword(), d = "0", e = "", g = "", f = b.gc("autolist", this.dom_boxDiv, "ul"), f = b.gc("current", b.isArray(f) && f.length > 0 ? f[0] : null, "li");
            if (f = b.isArray(f) && f.length > 0 ? f[0] : null)c = f.getAttribute("qword"), d = f.getAttribute("windex"), e = f.getAttribute("dataver"), g = f.getAttribute("wordtype");
            f = c != "" ? this.settings.queryUrl.call(this, c) : "http://www.soku.com";
            this.log.send({type: 4, pos: "1", bword: this._bword(), wordtype: g, qword: c, dataver: e, url: f, operate: a || "", windex: d || "0"});
            this.log.sendCost();
            this.settings.target == "_blank" ? window.open(f, "_blank") : document.location = f
        }, _selectWord: function (a) {
            for (var c = a.parentNode.childNodes, d = b.gc("panel", this.dom_boxDiv, "div"), e = 0; e < c.length; e++) {
                var g = c[e];
                if (g && b.dom.hasClass(g, "current")) {
                    b.dom.removeClass(g, "current");
                    break
                }
            }
            b.dom.addClass(a, "current");
            if (d && d[0]) {
                for (a = 0; a < d.length; a++) {
                    var f = d[a];
                    if (f && b.dom.visible(f)) {
                        b.dom.hide(f);
                        break
                    }
                }
                for (e = 0; e < c.length; e++)if ((g = c[e]) && b.dom.hasClass(g, "current")) {
                    f = d[e];
                    if (f.childNodes.length > 0)this.showTimeoutId != 0 && clearTimeout(this.showTimeoutId), this.showTimeoutId = setTimeout(function () {
                        b.dom.show(f)
                    }, 100);
                    break
                }
            }
            this._resetIframe()
        }}})
})({});
