var T, baidu = T = baidu || {version: "1.3.9"};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.json = baidu.json || {};
baidu.json.stringify = (function () {
    var b = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

    function a(g) {
        if (/["\\\x00-\x1f]/.test(g)) {
            g = g.replace(/["\\\x00-\x1f]/g, function (i) {
                var j = b[i];
                if (j) {
                    return j
                }
                j = i.charCodeAt();
                return"\\u00" + Math.floor(j / 16).toString(16) + (j % 16).toString(16)
            })
        }
        return'"' + g + '"'
    }

    function d(o) {
        var j = ["["], k = o.length, g, m, n;
        for (m = 0; m < k; m++) {
            n = o[m];
            switch (typeof n) {
                case"undefined":
                case"function":
                case"unknown":
                    break;
                default:
                    if (g) {
                        j.push(",")
                    }
                    j.push(baidu.json.stringify(n));
                    g = 1
            }
        }
        j.push("]");
        return j.join("")
    }

    function c(g) {
        return g < 10 ? "0" + g : g
    }

    function f(g) {
        return'"' + g.getFullYear() + "-" + c(g.getMonth() + 1) + "-" + c(g.getDate()) + "T" + c(g.getHours()) + ":" + c(g.getMinutes()) + ":" + c(g.getSeconds()) + '"'
    }

    return function (m) {
        switch (typeof m) {
            case"undefined":
                return"undefined";
            case"number":
                return isFinite(m) ? String(m) : "null";
            case"string":
                return a(m);
            case"boolean":
                return String(m);
            default:
                if (m === null) {
                    return"null"
                } else {
                    if (m instanceof Array) {
                        return d(m)
                    } else {
                        if (m instanceof Date) {
                            return f(m)
                        } else {
                            var i = ["{"], l = baidu.json.stringify, g, k;
                            for (var j in m) {
                                if (Object.prototype.hasOwnProperty.call(m, j)) {
                                    k = m[j];
                                    switch (typeof k) {
                                        case"undefined":
                                        case"unknown":
                                        case"function":
                                            break;
                                        default:
                                            if (g) {
                                                i.push(",")
                                            }
                                            g = 1;
                                            i.push(l(j) + ":" + l(k))
                                    }
                                }
                            }
                            i.push("}");
                            return i.join("")
                        }
                    }
                }
        }
    }
})();
baidu.json.parse = function (a) {
    return(new Function("return (" + a + ")"))()
};
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function (c, a) {
    for (var b in a) {
        if (a.hasOwnProperty(b)) {
            c[b] = a[b]
        }
    }
    return c
};
baidu.sio = baidu.sio || {};
baidu.lang = baidu.lang || {};
baidu.lang.isFunction = function (a) {
    return"[object Function]" == Object.prototype.toString.call(a)
};
baidu.lang.isString = function (a) {
    return"[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.sio._createScriptTag = function (b, a, c) {
    b.setAttribute("type", "text/javascript");
    c && b.setAttribute("charset", c);
    b.setAttribute("src", a);
    document.getElementsByTagName("head")[0].appendChild(b)
};
baidu.sio._removeScriptTag = function (b) {
    if (b.clearAttributes) {
        b.clearAttributes()
    } else {
        for (var a in b) {
            if (b.hasOwnProperty(a)) {
                delete b[a]
            }
        }
    }
    if (b && b.parentNode) {
        b.parentNode.removeChild(b)
    }
    b = null
};
baidu.sio.callByServer = function (a, o, p) {
    var k = document.createElement("SCRIPT"), j = "bd__cbs__", m, f, q = p || {}, d = q.charset, g = q.queryField || "callback", n = q.timeOut || 0, b, c = new RegExp("(\\?|&)" + g + "=([^&]*)"), i;
    if (baidu.lang.isFunction(o)) {
        m = j + Math.floor(Math.random() * 2147483648).toString(36);
        window[m] = l(0)
    } else {
        if (baidu.lang.isString(o)) {
            m = o
        } else {
            if (i = c.exec(a)) {
                m = i[2]
            }
        }
    }
    if (n) {
        b = setTimeout(l(1), n)
    }
    a = a.replace(c, "\x241" + g + "=" + m);
    if (a.search(c) < 0) {
        a += (a.indexOf("?") < 0 ? "?" : "&") + g + "=" + m
    }
    baidu.sio._createScriptTag(k, a, d);
    function l(r) {
        return function () {
            try {
                if (r) {
                    q.onfailure && q.onfailure()
                } else {
                    o.apply(window, arguments);
                    clearTimeout(b)
                }
                window[m] = null;
                delete window[m]
            } catch (s) {
            } finally {
                baidu.sio._removeScriptTag(k)
            }
        }
    }
};
baidu.string = baidu.string || {};
baidu.string.getByteLength = function (a) {
    return String(a).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.subByte = function (c, b, a) {
    c = String(c);
    a = a || "";
    if (b < 0 || baidu.string.getByteLength(c) <= b) {
        return c + a
    }
    c = c.substr(0, b).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, b).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
    return c + a
};
baidu.string.format = function (c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1), d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
        return c.replace(/#\{(.+?)\}/g, function (f, i) {
            var g = b[i];
            if ("[object Function]" == d.call(g)) {
                g = g(i)
            }
            return("undefined" == typeof g ? "" : g)
        })
    }
    return c
};
baidu.format = baidu.string.format;
baidu.string.toCamelCase = function (a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
        return a
    }
    return a.replace(/[-_][^-_]/g, function (b) {
        return b.charAt(1).toUpperCase()
    })
};
(function () {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function (b) {
        return String(b).replace(a, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.string.encodeHTML = function (a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.string.decodeHTML = function (a) {
    var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return b.replace(/&#([\d]+);/g, function (d, c) {
        return String.fromCharCode(parseInt(c, 10))
    })
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.stripTags = function (a) {
    return String(a || "").replace(/<[^>]+>/g, "")
};
(function () {
    var a = window[baidu.guid];
    baidu.lang.guid = function () {
        return"TANGRAM__" + (a._counter++).toString(36)
    };
    a._counter = a._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class = function (a) {
    this.guid = a || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var a in this) {
        if (!baidu.lang.isFunction(this[a])) {
            delete this[a]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function () {
    return"[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function (a, b) {
    this.type = a;
    this.returnValue = true;
    this.target = b || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (d, c, b) {
    if (!baidu.lang.isFunction(c)) {
        return
    }
    !this.__listeners && (this.__listeners = {});
    var a = this.__listeners, f;
    if (typeof b == "string" && b) {
        if (/[^\w\-]/.test(b)) {
            throw ("nonstandard key:" + b)
        } else {
            c.hashCode = b;
            f = b
        }
    }
    d.indexOf("on") != 0 && (d = "on" + d);
    typeof a[d] != "object" && (a[d] = {});
    f = f || baidu.lang.guid();
    c.hashCode = f;
    a[d][f] = c
};
baidu.lang.Class.prototype.removeEventListener = function (d, c) {
    if (typeof c != "undefined") {
        if ((baidu.lang.isFunction(c) && !(c = c.hashCode)) || (!baidu.lang.isString(c))) {
            return
        }
    }
    !this.__listeners && (this.__listeners = {});
    d.indexOf("on") != 0 && (d = "on" + d);
    var b = this.__listeners;
    if (!b[d]) {
        return
    }
    if (typeof c != "undefined") {
        b[d][c] && delete b[d][c]
    } else {
        for (var a in b[d]) {
            delete b[d][a]
        }
    }
};
baidu.lang.Class.prototype.dispatchEvent = function (d, a) {
    if (baidu.lang.isString(d)) {
        d = new baidu.lang.Event(d)
    }
    !this.__listeners && (this.__listeners = {});
    a = a || {};
    for (var c in a) {
        d[c] = a[c]
    }
    var c, b = this.__listeners, f = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    f.indexOf("on") != 0 && (f = "on" + f);
    baidu.lang.isFunction(this[f]) && this[f].apply(this, arguments);
    if (typeof b[f] == "object") {
        for (c in b[f]) {
            b[f][c].apply(this, arguments)
        }
    }
    return d.returnValue
};
baidu.lang.createClass = function (g, b) {
    b = b || {};
    var f = b.superClass || baidu.lang.Class;
    var d = function () {
        if (f != baidu.lang.Class) {
            f.apply(this, arguments)
        } else {
            f.call(this)
        }
        g.apply(this, arguments)
    };
    d.options = b.options || {};
    var k = function () {
    }, j = g.prototype;
    k.prototype = f.prototype;
    var a = d.prototype = new k();
    for (var c in j) {
        a[c] = j[c]
    }
    typeof b.className == "string" && (a._className = b.className);
    a.constructor = j.constructor;
    d.extend = function (m) {
        for (var l in m) {
            d.prototype[l] = m[l]
        }
        return d
    };
    return d
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function (a) {
    return String(a).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.object.each = function (f, c) {
    var b, a, d;
    if ("function" == typeof c) {
        for (a in f) {
            if (f.hasOwnProperty(a)) {
                d = f[a];
                b = c.call(f, d, a);
                if (b === false) {
                    break
                }
            }
        }
    }
    return f
};
baidu.lang.isArray = function (a) {
    return"[object Array]" == Object.prototype.toString.call(a)
};
baidu.url.jsonToQuery = function (c, f) {
    var a = [], d, b = f || function (g) {
        return baidu.url.escapeSymbol(g)
    };
    baidu.object.each(c, function (i, g) {
        if (baidu.lang.isArray(i)) {
            d = i.length;
            while (d--) {
                a.push(g + "=" + b(i[d], g))
            }
        } else {
            a.push(g + "=" + b(i, g))
        }
    });
    return a.join("&")
};
baidu.ajax = baidu.ajax || {};
baidu.dom = baidu.dom || {};
baidu.dom.g = function (a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.removeClass = function (g, k) {
    g = baidu.dom.g(g);
    var d = g.className.split(/\s+/), l = k.split(/\s+/), b, a = l.length, c, f = 0;
    for (; f < a; ++f) {
        for (c = 0, b = d.length; c < b; ++c) {
            if (d[c] == l[f]) {
                d.splice(c, 1);
                break
            }
        }
    }
    g.className = d.join(" ");
    return g
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom._g = function (a) {
    if (baidu.lang.isString(a)) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.dom.insertAfter = function (d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c.nextSibling)
    }
    return d
};
baidu.dom.addClass = function (g, j) {
    g = baidu.dom.g(g);
    var b = j.split(/\s+/), a = g.className, f = " " + a + " ", d = 0, c = b.length;
    for (; d < c; d++) {
        if (f.indexOf(" " + b[d] + " ") < 0) {
            a += (a ? " " : "") + b[d]
        }
    }
    g.className = a;
    return g
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.hasClass = function (c, d) {
    c = baidu.dom.g(c);
    var b = baidu.string.trim(d).split(/\s+/), a = b.length;
    d = c.className.split(/\s+/).join(" ");
    while (a--) {
        if (!(new RegExp("(^| )" + b[a] + "( |\x24)")).test(d)) {
            return false
        }
    }
    return true
};
baidu.dom.removeClass = function (n, m) {
    n = baidu.dom.g(n);
    var p = n.className.split(/\s+/), l = m.split(/\s+/), i, j = l.length, q, o = 0;
    for (; o < j; ++o) {
        for (q = 0, i = p.length; q < i; ++q) {
            if (p[q] == l[o]) {
                p.splice(q, 1);
                break
            }
        }
    }
    n.className = p.join(" ");
    return n
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.toggleClass = function (d, c) {
    if (baidu.dom.hasClass(d, c)) {
        baidu.dom.removeClass(d, c)
    } else {
        baidu.dom.addClass(d, c)
    }
};
baidu.browser = baidu.browser || {};
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
}
baidu.dom._NAME_ATTRS = (function () {
    var a = {cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", rowspan: "rowSpan", valign: "vAlign", usemap: "useMap", frameborder: "frameBorder"};
    if (baidu.browser.ie < 8) {
        a["for"] = "htmlFor";
        a["class"] = "className"
    } else {
        a.htmlFor = "for";
        a.className = "class"
    }
    return a
})();
baidu.dom.setAttr = function (b, a, c) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        b.style.cssText = c
    } else {
        a = baidu.dom._NAME_ATTRS[a] || a;
        b.setAttribute(a, c)
    }
    return b
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function (c, a) {
    c = baidu.dom.g(c);
    for (var b in a) {
        baidu.dom.setAttr(c, b, a[b])
    }
    return c
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.create = function (c, a) {
    var d = document.createElement(c), b = a || {};
    return baidu.dom.setAttrs(d, b)
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter.filter = function (b, f, g) {
    for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
        if (c = c[g]) {
            f = c(b, f)
        }
    }
    return f
};
baidu.dom.setStyle = function (c, b, d) {
    var f = baidu.dom, a;
    c = f.g(c);
    b = baidu.string.toCamelCase(b);
    if (a = f._styleFilter) {
        d = a.filter(b, d, "set")
    }
    a = f._styleFixer[b];
    (a && a.set) ? a.set(c, d) : (c.style[a || b] = d);
    return c
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.getAttr = function (b, a) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        return b.style.cssText
    }
    a = baidu.dom._NAME_ATTRS[a] || a;
    return b.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom.insertBefore = function (d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c)
    }
    return d
};
baidu.dom.setStyles = function (b, c) {
    b = baidu.dom.g(b);
    for (var a in c) {
        baidu.dom.setStyle(b, a, c[a])
    }
    return b
};
baidu.setStyles = baidu.dom.setStyles;
baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.getComputedStyle = function (b, a) {
    b = baidu.dom._g(b);
    var d = baidu.dom.getDocument(b), c;
    if (d.defaultView && d.defaultView.getComputedStyle) {
        c = d.defaultView.getComputedStyle(b, null);
        if (c) {
            return c[a] || c.getPropertyValue(a)
        }
    }
    return""
};
baidu.dom.getStyle = function (c, b) {
    var f = baidu.dom;
    c = f.g(c);
    b = baidu.string.toCamelCase(b);
    var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || f.getComputedStyle(c, b);
    if (!d) {
        var a = f._styleFixer[b];
        if (a) {
            d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
        }
    }
    if (a = f._styleFilter) {
        d = a.filter(b, d, "get")
    }
    return d
};
baidu.getStyle = baidu.dom.getStyle;
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = +RegExp["\x241"]
}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.dom.getPosition = function (a) {
    a = baidu.dom.g(a);
    var l = baidu.dom.getDocument(a), d = baidu.browser, i = baidu.dom.getStyle, c = d.isGecko > 0 && l.getBoxObjectFor && i(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""), j = {left: 0, top: 0}, g = (d.ie && !d.isStrict) ? l.body : l.documentElement, m, b;
    if (a == g) {
        return j
    }
    if (a.getBoundingClientRect) {
        b = a.getBoundingClientRect();
        j.left = Math.floor(b.left) + Math.max(l.documentElement.scrollLeft, l.body.scrollLeft);
        j.top = Math.floor(b.top) + Math.max(l.documentElement.scrollTop, l.body.scrollTop);
        j.left -= l.documentElement.clientLeft;
        j.top -= l.documentElement.clientTop;
        var k = l.body, n = parseInt(i(k, "borderLeftWidth")), f = parseInt(i(k, "borderTopWidth"));
        if (d.ie && !d.isStrict) {
            j.left -= isNaN(n) ? 2 : n;
            j.top -= isNaN(f) ? 2 : f
        }
    } else {
        m = a;
        do {
            j.left += m.offsetLeft;
            j.top += m.offsetTop;
            if (d.isWebkit > 0 && i(m, "position") == "fixed") {
                j.left += l.body.scrollLeft;
                j.top += l.body.scrollTop;
                break
            }
            m = m.offsetParent
        } while (m && m != a);
        if (d.opera > 0 || (d.isWebkit > 0 && i(a, "position") == "absolute")) {
            j.top -= l.body.offsetTop
        }
        m = a.offsetParent;
        while (m && m != l.body) {
            j.left -= m.scrollLeft;
            if (!d.opera || m.tagName != "TR") {
                j.top -= m.scrollTop
            }
            m = m.offsetParent
        }
    }
    return j
};
baidu.dom.children = function (b) {
    b = baidu.dom.g(b);
    for (var a = [], c = b.firstChild; c; c = c.nextSibling) {
        if (c.nodeType == 1) {
            a.push(c)
        }
    }
    return a
};
baidu.dom.remove = function (a) {
    a = baidu.dom._g(a);
    var b = a.parentNode;
    b && b.removeChild(a)
};
baidu.dom.insertHTML = function (d, a, c) {
    d = baidu.dom.g(d);
    var b, f;
    if (d.insertAdjacentHTML) {
        d.insertAdjacentHTML(a, c)
    } else {
        b = d.ownerDocument.createRange();
        a = a.toUpperCase();
        if (a == "AFTERBEGIN" || a == "BEFOREEND") {
            b.selectNodeContents(d);
            b.collapse(a == "AFTERBEGIN")
        } else {
            f = a == "BEFOREBEGIN";
            b[f ? "setStartBefore" : "setEndAfter"](d);
            b.collapse(f)
        }
        b.insertNode(b.createContextualFragment(c))
    }
    return d
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom._matchNode = function (a, c, d) {
    a = baidu.dom.g(a);
    for (var b = a[d]; b; b = b[c]) {
        if (b.nodeType == 1) {
            return b
        }
    }
    return null
};
baidu.dom.prev = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
baidu.string.escapeReg = function (a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.dom.q = function (k, f, b) {
    var l = [], d = baidu.string.trim, j, g, a, c;
    if (!(k = d(k))) {
        return l
    }
    if ("undefined" == typeof f) {
        f = document
    } else {
        f = baidu.dom.g(f);
        if (!f) {
            return l
        }
    }
    b && (b = d(b).toUpperCase());
    if (f.getElementsByClassName) {
        a = f.getElementsByClassName(k);
        j = a.length;
        for (g = 0; g < j; g++) {
            c = a[g];
            if (b && c.tagName != b) {
                continue
            }
            l[l.length] = c
        }
    } else {
        k = new RegExp("(^|\\s)" + baidu.string.escapeReg(k) + "(\\s|\x24)");
        a = b ? f.getElementsByTagName(b) : (f.all || f.getElementsByTagName("*"));
        j = a.length;
        for (g = 0; g < j; g++) {
            c = a[g];
            k.test(c.className) && (l[l.length] = c)
        }
    }
    return l
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.next = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.getText = function (d) {
    var b = "", f, c = 0, a;
    d = baidu._g(d);
    if (d.nodeType === 3 || d.nodeType === 4) {
        b += d.nodeValue
    } else {
        if (d.nodeType !== 8) {
            f = d.childNodes;
            for (a = f.length; c < a; c++) {
                b += baidu.dom.getText(f[c])
            }
        }
    }
    return b
};
(function () {
    var a = navigator.userAgent;
    if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && !/chrome/i.test(a)) {
        baidu.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
    }
})();
(function () {
    var a = baidu.dom.ready = function () {
        var i = false, g = [], c;
        if (document.addEventListener) {
            c = function () {
                document.removeEventListener("DOMContentLoaded", c, false);
                d()
            }
        } else {
            if (document.attachEvent) {
                c = function () {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", c);
                        d()
                    }
                }
            }
        }
        function d() {
            if (!d.isReady) {
                d.isReady = true;
                for (var l = 0, k = g.length; l < k; l++) {
                    g[l]()
                }
            }
        }

        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (j) {
                setTimeout(b, 1);
                return
            }
            d()
        }

        function f() {
            if (i) {
                return
            }
            i = true;
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", c, false);
                window.addEventListener("load", d, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", c);
                    window.attachEvent("onload", d);
                    var j = false;
                    try {
                        j = window.frameElement == null
                    } catch (k) {
                    }
                    if (document.documentElement.doScroll && j) {
                        b()
                    }
                }
            }
        }

        f();
        return function (j) {
            d.isReady ? j() : (g[g.length] = j)
        }
    }();
    a.isReady = false
})();
baidu.event = baidu.event || {};
baidu.event.stopPropagation = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
baidu.event.getTarget = function (a) {
    return a.target || a.srcElement
};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function (b, f, i) {
    f = f.replace(/^on/i, "");
    b = baidu.dom._g(b);
    var g = function (k) {
        i.call(b, k)
    }, a = baidu.event._listeners, d = baidu.event._eventFilter, j, c = f;
    f = f.toLowerCase();
    if (d && d[f]) {
        j = d[f](b, f, g);
        c = j.type;
        g = j.listener
    }
    if (b.addEventListener) {
        b.addEventListener(c, g, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, g)
        }
    }
    a[a.length] = [b, f, i, g, c];
    return b
};
baidu.on = baidu.event.on;
baidu.object.values = function (d) {
    var a = [], c = 0, b;
    for (b in d) {
        if (d.hasOwnProperty(b)) {
            a[c++] = d[b]
        }
    }
    return a
};
baidu.lang.isNumber = function (a) {
    return"[object Number]" == Object.prototype.toString.call(a) && isFinite(a)
};
(function () {
    var d = baidu.browser, m = {keydown: 1, keyup: 1, keypress: 1}, a = {click: 1, dblclick: 1, mousedown: 1, mousemove: 1, mouseup: 1, mouseover: 1, mouseout: 1}, j = {abort: 1, blur: 1, change: 1, error: 1, focus: 1, load: d.ie ? 0 : 1, reset: 1, resize: 1, scroll: 1, select: 1, submit: 1, unload: d.ie ? 0 : 1}, g = {scroll: 1, resize: 1, reset: 1, submit: 1, change: 1, select: 1, error: 1, abort: 1}, l = {KeyEvents: ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"], MouseEvents: ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"], HTMLEvents: ["bubbles", "cancelable"], UIEvents: ["bubbles", "cancelable", "view", "detail"], Events: ["bubbles", "cancelable"]};
    baidu.object.extend(g, m);
    baidu.object.extend(g, a);
    function c(s, q) {
        var p = 0, o = s.length, r = {};
        for (; p < o; p++) {
            r[s[p]] = q[s[p]];
            delete q[s[p]]
        }
        return r
    }

    function f(q, p, o) {
        o = baidu.object.extend({}, o);
        var r = baidu.object.values(c(l[p], o)), s = document.createEvent(p);
        r.unshift(q);
        if ("KeyEvents" == p) {
            s.initKeyEvent.apply(s, r)
        } else {
            if ("MouseEvents" == p) {
                s.initMouseEvent.apply(s, r)
            } else {
                if ("UIEvents" == p) {
                    s.initUIEvent.apply(s, r)
                } else {
                    s.initEvent.apply(s, r)
                }
            }
        }
        baidu.object.extend(s, o);
        return s
    }

    function b(o) {
        var p;
        if (document.createEventObject) {
            p = document.createEventObject();
            baidu.object.extend(p, o)
        }
        return p
    }

    function i(r, o) {
        o = c(l.KeyEvents, o);
        var s;
        if (document.createEvent) {
            try {
                s = f(r, "KeyEvents", o)
            } catch (q) {
                try {
                    s = f(r, "Events", o)
                } catch (p) {
                    s = f(r, "UIEvents", o)
                }
            }
        } else {
            o.keyCode = o.charCode > 0 ? o.charCode : o.keyCode;
            s = b(o)
        }
        return s
    }

    function n(p, o) {
        o = c(l.MouseEvents, o);
        var q;
        if (document.createEvent) {
            q = f(p, "MouseEvents", o);
            if (o.relatedTarget && !q.relatedTarget) {
                if ("mouseout" == p.toLowerCase()) {
                    q.toElement = o.relatedTarget
                } else {
                    if ("mouseover" == p.toLowerCase()) {
                        q.fromElement = o.relatedTarget
                    }
                }
            }
        } else {
            o.button = o.button == 0 ? 1 : o.button == 1 ? 4 : baidu.lang.isNumber(o.button) ? o.button : 0;
            q = b(o)
        }
        return q
    }

    function k(q, o) {
        o.bubbles = g.hasOwnProperty(q);
        o = c(l.HTMLEvents, o);
        var s;
        if (document.createEvent) {
            try {
                s = f(q, "HTMLEvents", o)
            } catch (r) {
                try {
                    s = f(q, "UIEvents", o)
                } catch (p) {
                    s = f(q, "Events", o)
                }
            }
        } else {
            s = b(o)
        }
        return s
    }

    baidu.event.fire = function (p, q, o) {
        var r;
        q = q.replace(/^on/i, "");
        p = baidu.dom._g(p);
        o = baidu.object.extend({bubbles: true, cancelable: true, view: window, detail: 1, screenX: 0, screenY: 0, clientX: 0, clientY: 0, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, keyCode: 0, charCode: 0, button: 0, relatedTarget: null}, o);
        if (m[q]) {
            r = i(q, o)
        } else {
            if (a[q]) {
                r = n(q, o)
            } else {
                if (j[q]) {
                    r = k(q, o)
                } else {
                    throw (new Error(q + " is not support!"))
                }
            }
        }
        if (r) {
            if (p.dispatchEvent) {
                p.dispatchEvent(r)
            } else {
                if (p.fireEvent) {
                    p.fireEvent("on" + q, r)
                }
            }
        }
    }
})();
baidu.event.un = function (c, g, b) {
    c = baidu.dom._g(c);
    g = g.replace(/^on/i, "").toLowerCase();
    var k = baidu.event._listeners, d = k.length, f = !b, j, i, a;
    while (d--) {
        j = k[d];
        if (j[1] === g && j[0] === c && (f || j[2] === b)) {
            i = j[4];
            a = j[3];
            if (c.removeEventListener) {
                c.removeEventListener(i, a, false)
            } else {
                if (c.detachEvent) {
                    c.detachEvent("on" + i, a)
                }
            }
            k.splice(d, 1)
        }
    }
    return c
};
baidu.un = baidu.event.un;
baidu.array = baidu.array || {};
baidu.array.indexOf = function (f, b, d) {
    var a = f.length, c = b;
    d = d | 0;
    if (d < 0) {
        d = Math.max(0, a + d)
    }
    for (; d < a; d++) {
        if (d in f && f[d] === b) {
            return d
        }
    }
    return -1
};
baidu.each = baidu.array.forEach = baidu.array.each = function (j, f, b) {
    var d, g, c, a = j.length;
    if ("function" == typeof f) {
        for (c = 0; c < a; c++) {
            g = j[c];
            d = f.call(b || j, g, c);
            if (d === false) {
                break
            }
        }
    }
    return j
};
baidu.array.contains = function (a, b) {
    return(baidu.array.indexOf(a, b) >= 0)
};
baidu.page = baidu.page || {};
baidu.page.getWidth = function () {
    var d = document, a = d.body, c = d.documentElement, b = d.compatMode == "BackCompat" ? a : d.documentElement;
    return Math.max(c.scrollWidth, a.scrollWidth, b.clientWidth)
};
baidu.page.getViewWidth = function () {
    var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientWidth
};
baidu.page.getScrollLeft = function () {
    var a = document;
    return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
};
baidu.page.loadJsFile = function (b) {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", b);
    a.setAttribute("defer", "defer");
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.getHeight = function () {
    var d = document, a = d.body, c = d.documentElement, b = d.compatMode == "BackCompat" ? a : d.documentElement;
    return Math.max(c.scrollHeight, a.scrollHeight, b.clientHeight)
};
baidu.page.getViewHeight = function () {
    var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientHeight
};
baidu.page.getScrollTop = function () {
    var a = document;
    return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
};
baidu.fn = baidu.fn || {};
baidu.fn.blank = function () {
};
baidu.ajax.request = function (d, s) {
    s = s || {};
    var k = s.data || "", i = !(s.async === false), j = s.username || "", q = s.password || "", a = (s.method || "GET").toUpperCase(), g = s.headers || {}, o = s.timeout || 0, c = {}, m, p, r;

    function l() {
        if (r.readyState == 4) {
            try {
                var u = r.status
            } catch (t) {
                f("failure");
                return
            }
            f(u);
            if ((u >= 200 && u < 300) || u == 304 || u == 1223) {
                f("success")
            } else {
                f("failure")
            }
            window.setTimeout(function () {
                r.onreadystatechange = baidu.fn.blank;
                if (i) {
                    r = null
                }
            }, 0)
        }
    }

    function b() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (t) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                }
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }

    function f(v) {
        v = "on" + v;
        var u = c[v], w = baidu.ajax[v];
        if (u) {
            if (m) {
                clearTimeout(m)
            }
            if (v != "onsuccess") {
                u(r)
            } else {
                try {
                    r.responseText
                } catch (t) {
                    return u(r)
                }
                u(r, r.responseText)
            }
        } else {
            if (w) {
                if (v == "onsuccess") {
                    return
                }
                w(r)
            }
        }
    }

    for (p in s) {
        c[p] = s[p]
    }
    g["X-Requested-With"] = "XMLHttpRequest";
    try {
        r = b();
        if (a == "GET") {
            if (k) {
                d += (d.indexOf("?") >= 0 ? "&" : "?") + k;
                k = null
            }
            if (s.noCache) {
                d += (d.indexOf("?") >= 0 ? "&" : "?") + "b" + (+new Date) + "=1"
            }
        }
        if (j) {
            r.open(a, d, i, j, q)
        } else {
            r.open(a, d, i)
        }
        if (i) {
            r.onreadystatechange = l
        }
        if (a == "POST") {
            r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        for (p in g) {
            if (g.hasOwnProperty(p)) {
                r.setRequestHeader(p, g[p])
            }
        }
        f("beforerequest");
        if (o) {
            m = setTimeout(function () {
                r.onreadystatechange = baidu.fn.blank;
                r.abort();
                f("timeout")
            }, o)
        }
        r.send(k);
        if (!i) {
            l()
        }
    } catch (n) {
        f("failure")
    }
    return r
};
baidu.ajax.get = function (b, a) {
    return baidu.ajax.request(b, {onsuccess: a})
};
baidu.ajax.post = function (b, c, a) {
    return baidu.ajax.request(b, {onsuccess: a, method: "POST", data: c})
};
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = +RegExp["\x241"]
}
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = +RegExp["\x241"]
    }
} catch (e) {
}
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = +RegExp["\x241"]
}
baidu.fn.bind = function (b, a) {
    var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    return function () {
        var f = baidu.lang.isString(b) ? a[b] : b, d = (c) ? c.concat([].slice.call(arguments, 0)) : arguments;
        return f.apply(a || f, d)
    }
};
baidu.page = baidu.page || {};
baidu.page.getHeight = function () {
    var i = document, g = i.body, j = i.documentElement, f = i.compatMode == "BackCompat" ? g : i.documentElement;
    return Math.max(j.scrollHeight, g.scrollHeight, f.clientHeight)
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function (b) {
    return String(b).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.string = baidu.string || {};
baidu.string.escapeReg = function (b) {
    return String(b).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.url.getQueryValue = function (f, j) {
    var i = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(j) + "=([^&#]*)(&|\x24|#)", "");
    var g = f.match(i);
    if (g) {
        return g[2]
    }
    return null
};
baidu.url.jsonToQuery = function (l, j) {
    var i = [], k, g = j || function (a) {
        return baidu.url.escapeSymbol(a)
    };
    baidu.object.each(l, function (a, b) {
        if (baidu.lang.isArray(a)) {
            k = a.length;
            while (k--) {
                i.push(b + "=" + g(a[k], b))
            }
        } else {
            i.push(b + "=" + g(a, b))
        }
    });
    return i.join("&")
};
baidu.swf = baidu.swf || {};
baidu.swf.version = (function () {
    var j = navigator;
    if (j.plugins && j.mimeTypes.length) {
        var m = j.plugins["Shockwave Flash"];
        if (m && m.description) {
            return m.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var c = 10; c >= 2; c--) {
                try {
                    var k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
                    if (k) {
                        var i = k.GetVariable("$version");
                        return i.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (l) {
                }
            }
        }
    }
})();
baidu.swf.createHTML = function (I) {
    I = I || {};
    var y = baidu.swf.version, A = I.ver || "6.0.0", B, D, C, E, z, J, H = {}, u = baidu.string.encodeHTML;
    for (E in I) {
        H[E] = I[E]
    }
    I = H;
    if (y) {
        y = y.split(".");
        A = A.split(".");
        for (C = 0; C < 3; C++) {
            B = parseInt(y[C], 10);
            D = parseInt(A[C], 10);
            if (D < B) {
                break
            } else {
                if (D > B) {
                    return""
                }
            }
        }
    } else {
        return""
    }
    var w = I.vars, x = ["classid", "codebase", "id", "width", "height", "align"];
    I.align = I.align || "middle";
    I.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    I.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    I.movie = I.url || "";
    delete I.vars;
    delete I.url;
    if ("string" == typeof w) {
        I.flashvars = w
    } else {
        var k = [];
        for (E in w) {
            J = w[E];
            if (J) {
                k.push(E + "=" + encodeURIComponent(J))
            }
        }
        I.flashvars = k.join("&")
    }
    var v = ["<object "];
    for (C = 0, z = x.length; C < z; C++) {
        J = x[C];
        v.push(" ", J, '="', u(I[J]), '"')
    }
    v.push(">");
    var G = {wmode: 1, scale: 1, quality: 1, play: 1, loop: 1, menu: 1, salign: 1, bgcolor: 1, base: 1, allowscriptaccess: 1, allownetworking: 1, allowfullscreen: 1, seamlesstabbing: 1, devicefont: 1, swliveconnect: 1, flashvars: 1, movie: 1};
    for (E in I) {
        J = I[E];
        E = E.toLowerCase();
        if (G[E] && J) {
            v.push('<param name="' + E + '" value="' + u(J) + '" />')
        }
    }
    I.src = I.movie;
    I.name = I.id;
    delete I.id;
    delete I.movie;
    delete I.classid;
    delete I.codebase;
    I.type = "application/x-shockwave-flash";
    I.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    v.push("<embed");
    var i;
    for (E in I) {
        J = I[E];
        if (J) {
            if ((new RegExp("^salign\x24", "i")).test(E)) {
                i = J;
                continue
            }
            v.push(" ", E, '="', u(J), '"')
        }
    }
    if (i) {
        v.push(' salign="', u(i), '"')
    }
    v.push("></embed></object>");
    return v.join("")
};
baidu.swf.getMovie = function (g) {
    var f = document[g], d;
    return baidu.browser.ie == 9 ? f && f.length ? (d = baidu.array.remove(baidu.lang.toArray(f), function (a) {
        return a.tagName.toLowerCase() != "embed"
    })).length == 1 ? d[0] : d : f : f || window[g]
};
baidu.swf.create = function (f, g) {
    f = f || {};
    var d = baidu.swf.createHTML(f) || f.errorMessage || "";
    if (g && "string" == typeof g) {
        g = document.getElementById(g)
    }
    if (g) {
        g.innerHTML = d
    } else {
        document.write(d)
    }
};
baidu.array.some = function (j, k, g) {
    var l = 0, i = j.length;
    for (; l < i; l++) {
        if (l in j && k.call(g || j, j[l], l)) {
            return true
        }
    }
    return false
};
(function (m, f) {
    function c(s, r) {
        if (s instanceof Array) {
            for (var q = 0, p = s.length; q < p; q++) {
                if (r.call(s[q], s[q], q) === false) {
                    return
                }
            }
        } else {
            for (var q in s) {
                if (s.hasOwnProperty(q)) {
                    if (r.call(s[q], s[q], q) === false) {
                        return
                    }
                }
            }
        }
    }

    m.each = c;
    function b(q, p) {
        this.svnMod = "";
        this.name = null;
        this.path = q;
        this.fn = null;
        this.exports = {};
        this._loaded = false;
        this._requiredStack = [];
        this._readyStack = [];
        b.cache[this.path] = this;
        if (p) {
            if (p.charAt(0) !== ".") {
                var o = p.split(":");
                if (o.length > 1) {
                    this.svnMod = o[0];
                    this.name = o[1]
                } else {
                    this.name = p
                }
            }
        }
        if (!this.svnMod) {
            this.svnMod = this.path.split("/js/")[0].substr(1)
        }
        this.type = "js";
        this.getKey = function () {
            return this.svnMod + ":" + this.name
        };
        this._info = {}
    }

    b.currentPath = "";
    b.loadedPaths = {};
    b.loadingPaths = {};
    b.cache = {};
    b.paths = {};
    b.handlers = [];
    b.moduleFileMap = {};
    b.requiredPaths = {};
    b.lazyLoadPaths = {};
    b.services = {};
    b.isPathsLoaded = function (p) {
        var o = true;
        c(p, function (q) {
            if (!(q in b.loadedPaths)) {
                return o = false
            }
        });
        return o
    };
    b.require = function (r, q) {
        if (r.search(":") < 0) {
            if (!q) {
                q = "superpage";
                if (b.currentPath) {
                    q = b.currentPath.split("/js/")[0].substr(1)
                }
            }
            r = q + ":" + r
        }
        var s = b.get(r, b.currentPath);
        if (s.type == "css") {
            return
        }
        if (s) {
            if (!s._inited) {
                s._inited = true;
                var p, o = s.svnMod;
                if (p = s.fn.call(null, function (t) {
                    return b.require(t, o)
                }, s.exports, new j(s.name, o))) {
                    s.exports = p
                }
            }
            return s.exports
        } else {
            throw new Error('Module "' + r + '" not found!')
        }
    };
    b.baseUrl = f ? (f[f.length - 1] == "/" ? f : (f + "/")) : "/";
    b.getBasePath = function (o) {
        var q, p;
        if ((p = o.indexOf("/")) !== -1) {
            q = o.slice(0, p)
        }
        if (q && (q in b.paths)) {
            return b.paths[q]
        }
        return b.baseUrl
    };
    b.getJsPath = function (o, y) {
        if (o.charAt(0) === ".") {
            y = y.replace(/\/[^\/]+\/[^\/]+$/, "");
            if (o.search("./") === 0) {
                o = o.substr(2)
            }
            var t = 0;
            o = o.replace(/^(\.\.\/)+/g, function (A) {
                t = A.length / 3;
                return""
            });
            while (t > 0) {
                y = y.substr(0, y.lastIndexOf("/"));
                t--
            }
            return y + "/" + o + "/" + o.substr(o.lastIndexOf("/") + 1) + ".js"
        } else {
            var p, v, r, q, s, z;
            if (o.search(":") >= 0) {
                var u = o.split(":");
                p = u[0];
                o = u[1]
            } else {
                if (y) {
                    p = y.split("/")[1]
                }
            }
            p = p || "superpage";
            var x = /\.css(?:\?|$)/i.test(o);
            if (x) {
                if (b.moduleFileMap[p][o]) {
                    m._useConfig && (o = b.moduleFileMap[p][o])
                } else {
                    !m._useConfig && alert(o + "没有配置在config.js中")
                }
            }
            var o = s = o;
            var w = b.getBasePath(o);
            if ((r = o.indexOf("/")) !== -1) {
                v = o.slice(0, r);
                q = o.lastIndexOf("/");
                s = o.slice(q + 1)
            }
            if (v && (v in b.paths)) {
                o = o.slice(r + 1)
            }
            z = w + p + "/js/" + o + ".js";
            return z
        }
    };
    b.get = function (o, q) {
        var p = b.getJsPath(o, q);
        if (b.cache[p]) {
            return b.cache[p]
        }
        return new b(p, o)
    };
    b.prototype = {load: function () {
        b.loadingPaths[this.path] = true;
        var p = this.svnMod || "superpage", r = s_domain.staticUrl + "static/" + p + "/";
        var t = this;
        var o = /\.css(?:\?|$)/i.test(this.name);
        this.type = o ? "css" : "js";
        var s = "/" + this.type + "/" + b.moduleFileMap[p][this.name];
        if (m._useConfig && b.moduleFileMap[p][this.name]) {
            r += this.type + "/" + b.moduleFileMap[p][this.name]
        } else {
            r += this.type + "/" + this.name + (o ? "" : ".js")
        }
        if ((baidu.array.indexOf(m._firstScreenCSS, s) >= 0) || (m._useConfig && s == m._firstScreenJS)) {
            if (o) {
                setTimeout(function () {
                    t._loaded = true;
                    t.ready()
                }, 1)
            } else {
                t._loaded = true;
                t.ready()
            }
        } else {
            var q = new Date().getTime();
            n.create({src: r, type: this.type, loaded: function () {
                t._info.loadedTime = new Date().getTime() - q;
                if (t.type == "css") {
                    t._loaded = true;
                    t.ready()
                }
            }})
        }
    }, lazyLoad: function () {
        var o = this.name;
        if (b.lazyLoadPaths[this.getKey()]) {
            this.define();
            delete b.lazyLoadPaths[this.getKey()]
        } else {
            if (this.exist()) {
                return
            }
            b.requiredPaths[this.getKey()] = true;
            this.load()
        }
    }, ready: function (r, s) {
        var q = s ? this._requiredStack : this._readyStack;
        if (r) {
            if (this._loaded) {
                r()
            } else {
                q.push(r)
            }
        } else {
            b.loadedPaths[this.path] = true;
            delete b.loadingPaths[this.path];
            this._loaded = true;
            b.currentPath = this.path;
            if (this._readyStack && this._readyStack.length > 0) {
                this._inited = true;
                var p, o = this.svnMod;
                if (p = this.fn.call(null, function (t) {
                    return b.require(t, o)
                }, this.exports, new j(this.name, o))) {
                    this.exports = p
                }
                c(this._readyStack, function (t) {
                    t()
                });
                delete this._readyStack
            }
            if (this._requiredStack && this._requiredStack.length > 0) {
                c(this._requiredStack, function (t) {
                    t()
                });
                delete this._requiredStack
            }
        }
    }, define: function () {
        var r = this, p = this.deps, o = this.path, q = [];
        if (!p) {
            p = this.getDependents()
        }
        if (p.length) {
            c(p, function (s) {
                q.push(b.getJsPath(s, r.path))
            });
            c(p, function (t) {
                var s = b.get(t, r.path);
                s.ready(function () {
                    if (b.isPathsLoaded(q)) {
                        r.ready()
                    }
                }, true);
                s.lazyLoad()
            })
        } else {
            this.ready()
        }
    }, exist: function () {
        var o = this.path;
        return(o in b.loadedPaths || o in b.loadingPaths)
    }, getDependents: function () {
        var t = this;
        var s = this.fn.toString();
        var p = s.match(/function\s*\(([^,]*),/i);
        var o = new RegExp("[^.]\\b" + p[1] + "\\(\\s*('|\")([^()\"']*)('|\")\\s*\\)", "g");
        var r = s.match(o);
        var q = [];
        if (r) {
            c(r, function (v, u) {
                q[u] = v.substr(p[1].length + 3).slice(0, -2)
            })
        }
        return q
    }};
    var n = {create: function (o) {
        var p = o.src;
        if (p in this._paths) {
            return
        }
        this._paths[p] = true;
        c(this._rules, function (q) {
            p = q.call(null, p)
        });
        l(p, o.type, o.loaded)
    }, _paths: {}, _rules: [], addPathRule: function (o) {
        this._rules.push(o)
    }};

    function k(r, p) {
        var o = (p == "css");
        var q = document.createElement(o ? "link" : "script");
        return q
    }

    function l(t, q, v, s) {
        var r = k(t, q);
        if (r.nodeName === "SCRIPT") {
            d(r, o)
        } else {
            i(r, o)
        }
        var u = setTimeout(function () {
            throw new Error("load " + q + " timeout : " + t);
            !s && l(t + "?v=" + (new Date()).valueOf(), q, o, true)
        }, m._loadScriptTimeout || 10000);

        function o() {
            if (!o.isCalled) {
                o.isCalled = true;
                clearTimeout(u);
                v && v()
            }
        }

        var p = document.getElementsByTagName("head")[0];
        if (q == "css") {
            r.rel = "stylesheet";
            r.href = t;
            p.appendChild(r)
        } else {
            r.type = "text/javascript";
            r.charset = "utf-8";
            r.src = t;
            p.insertBefore(r, p.firstChild)
        }
    }

    function d(o, p) {
        o.onload = o.onerror = o.onreadystatechange = function () {
            if (/loaded|complete|undefined/.test(o.readyState)) {
                o.onload = o.onerror = o.onreadystatechange = null;
                if (o.parentNode) {
                    o.parentNode.removeChild(o);
                    try {
                        if (o.clearAttributes) {
                            o.clearAttributes()
                        } else {
                            for (var r in o) {
                                delete o[r]
                            }
                        }
                    } catch (q) {
                    }
                }
                o = undefined;
                p && p()
            }
        }
    }

    function i(o, p) {
        if (o.attachEvent) {
            o.attachEvent("onload", p)
        } else {
            setTimeout(function () {
                g(o, p)
            }, 0)
        }
    }

    function g(s, u) {
        if (u && u.isCalled) {
            return
        }
        var o;
        var r = navigator.userAgent;
        var t = ~r.indexOf("AppleWebKit");
        var p = ~r.indexOf("Opera");
        if (t || p) {
            if (s.sheet) {
                o = true
            }
        } else {
            if (s.sheet) {
                try {
                    if (s.sheet.cssRules) {
                        o = true
                    }
                } catch (q) {
                    if (q.name === "SecurityError" || q.name === "NS_ERROR_DOM_SECURITY_ERR") {
                        o = true
                    }
                }
            }
        }
        setTimeout(function () {
            if (o) {
                u && u()
            } else {
                g(s, u)
            }
        }, 1)
    }

    m.version = "1.0";
    m.use = function (r, q) {
        if (typeof r === "string") {
            r = [r]
        }
        var p = [];
        var o = [];
        c(r, function (s, t) {
            o[t] = false
        });
        c(r, function (t, v) {
            var u = b.get(t), s = u._loaded;
            u.ready(function () {
                var x = u.exports || {};
                x._INFO = u._info;
                if (x._INFO) {
                    x._INFO.isNew = !s
                }
                p[v] = x;
                o[v] = true;
                var w = true;
                c(o, function (y) {
                    if (y === false) {
                        return w = false
                    }
                });
                if (q && w) {
                    q.apply(null, p)
                }
            });
            u.lazyLoad()
        })
    };
    m.module = function (o, q, r) {
        var p = b.get(o);
        p.fn = q;
        p.deps = r;
        if (b.requiredPaths[p.getKey()]) {
            p.define()
        } else {
            b.lazyLoadPaths[p.getKey()] = true
        }
    };
    m.pathRule = function (o) {
        n.addPathRule(o)
    };
    m._addPath = function (o, p) {
        if (p.slice(-1) !== "/") {
            p += "/"
        }
        if (o in b.paths) {
            throw new Error(o + " has already in Module.paths")
        } else {
            b.paths[o] = p
        }
    };
    var a = "superpage";
    m._setMod = function (o) {
        a = o || "superpage"
    };
    m._fileMap = function (q, p) {
        if (typeof q === "object") {
            c(q, function (s, t) {
                m._fileMap(t, s)
            })
        } else {
            var o = a;
            if (typeof p === "string") {
                p = [p]
            }
            q = q.indexOf("js/") == 1 ? q.substr(4) : q;
            q = q.indexOf("css/") == 1 ? q.substr(5) : q;
            var r = b.moduleFileMap[o];
            if (!r) {
                r = {}
            }
            c(p, function (s) {
                if (!r[s]) {
                    r[s] = q
                }
            });
            b.moduleFileMap[o] = r
        }
    };
    m._eventMap = {};
    m.call = function (r, s, t) {
        var p = [];
        for (var q = 2, o = arguments.length; q < o; q++) {
            p.push(arguments[q])
        }
        m.use(r, function (u) {
            var x = s.split(".");
            for (var w = 0, v = x.length; w < v; w++) {
                u = u[x[w]]
            }
            if (u) {
                u.apply(this, p)
            }
        })
    };
    m._setContext = function (o) {
        if (typeof o === "object") {
            c(o, function (q, p) {
                j.prototype[p] = b.require(q)
            })
        }
    };
    m._setContextMethod = function (o, p) {
        j.prototype[o] = p
    };
    var j = function (p, o) {
        this.modName = p;
        this.svnMod = o
    };
    j.prototype = {domain: s_domain, session: s_session, use: function (q, p) {
        if (typeof q === "string") {
            q = [q]
        }
        for (var o = q.length - 1; o >= 0; o--) {
            q[o] = this.svnMod + ":" + q[o]
        }
        m.use(q, p)
    }};
    m._Context = j;
    m.addLog = function (p, o) {
        m.use("lib/log", function (q) {
            q.defaultLog(p, o)
        })
    };
    m.fire = function (o, q, p) {
        m.use("lib/mod_evt", function (r) {
            r.fire(o, q, p)
        })
    };
    m._defService = function (p, o) {
        if (p) {
            var q = b.services[p];
            q = q || {};
            c(o, function (s, r) {
                q[r] = s
            });
            b.services[p] = q
        }
    };
    m.getService = function (o, r, p) {
        var s = b.services[o];
        if (s) {
            var q = s[r];
            if (q) {
                m.use(o + ":" + q, p)
            } else {
                throw new Error(o + " mod didn't provide service " + r)
            }
        } else {
            throw new Error(o + " mod didn't define any services")
        }
    }
})((function () {
    return window.F = {}
})());
F.module("lib/mod_evt", function (g, f, b) {
    var d = {};
    var i = function (y, s, l) {
        var p = y.split("/"), v = p[0], n = p[1], x = v + "-" + s, m = {handlerCount: 0, returnValue: true};
        if (d[x]) {
            l = l || {};
            var w = d[x];
            for (var q = 0, u = w.length; q < u; q++) {
                var r = w[q];
                if (n && r.submod && n != r.submod) {
                    continue
                }
                var z = {_MOD: v, _EVENT_NAME: s, _SUBMOD: n || ""};
                for (var o in l) {
                    z[o] = l[o]
                }
                var t = r.hnd(z);
                if (t === false) {
                    m.returnValue = false
                }
            }
            m.handlerCount = w.length
        }
        return m
    };
    var j = function (q, m, p) {
        var l = q.split("/"), o = l[0], k = l[1], n = o + "-" + m;
        h = {hnd: p, mod: o, submod: k};
        if (d[n]) {
            d[n].push(h)
        } else {
            d[n] = [h]
        }
    };
    var a = function (p, q, n) {
        var o = Object.prototype.toString.call(p);
        if (o == "[object String]") {
            var l = Object.prototype.toString.call(q);
            if (l == "[object String]") {
                j(p, q, n)
            } else {
                if (l == "[object Array]") {
                    for (var m = 0, k = q.length; m < k; m++) {
                        j(p, q[m], n)
                    }
                }
            }
        } else {
            if (o == "[object Array]") {
                for (var m = 0, k = p.length; m < k; m++) {
                    a(p[m], q, n)
                }
            }
        }
    };
    var c = function (u, o, v) {
        var l = u.split("/"), q = l[0], k = l[1], s = q + "-" + o;
        if (d[s]) {
            var r = d[s], t = [];
            for (var m = 0, p = r.length; m < p; m++) {
                var n = r[m];
                if (n.hnd != v) {
                    t.push(n)
                }
            }
            d[s] = t
        }
    };
    f.fire = i;
    f.on = a;
    f.un = c;
    f.handlers = d
});
F.module("lib/sbase", function (c, b, a) {
    var d = b;
    d.isIE = T.browser.ie;
    d.isIE6 = T.browser.ie == 6;
    d.isIE9 = T.browser.ie == 9;
    d.isChrome = T.browser.chrome;
    d.isSafari = T.browser.safari;
    d.isFirefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp["\x241"] : undefined;
    d.isWebkit = T.browser.isWebkit;
    d.isSogouIE = function () {
        var f = navigator.userAgent.toLowerCase();
        return(f.indexOf("msie") > 0) && (f.indexOf("se") > 0) && (f.indexOf("360se") == -1)
    };
    d.isBaidu = /BIDUBrowser/i.test(navigator.userAgent);
    d.trim = T.string.trim;
    d.createDom = T.dom.create;
    d.formatString = T.string.format;
    d.insertHTML = T.dom.insertHTML;
    d.createClass = T.lang.createClass;
    d.extendObject = T.object.extend;
    d.hasClass = T.dom.hasClass;
    d.remove = T.dom.remove;
    d.getScrollTop = T.page.getScrollTop;
    d.getScrollLeft = T.page.getScrollLeft;
    d.getViewWidth = T.page.getViewWidth;
    d.getViewHeight = T.page.getViewHeight;
    d.getPageHeight = T.page.getHeight;
    d.jsonToQuery = function (f) {
        return T.url.jsonToQuery(f, function (g) {
            return window.encodeURIComponent(g)
        })
    };
    d.encodeHTML = T.string.encodeHTML;
    d.decodeHTML = T.string.decodeHTML;
    d.getText = T.dom.getText;
    d.jsonToString = T.json.stringify;
    d.g = d.$ = d.$E = window.$E = function (f) {
        return typeof f == "object" ? f : document.getElementById(f)
    };
    d.show = function (f) {
        f = (typeof f == "object") ? f : d.$(f);
        f.style.display = "block";
        return f
    };
    d.hide = function (f) {
        f = (typeof f == "object") ? f : d.$(f);
        if (f) {
            f.style.display = "none";
            return f
        }
    };
    d.addClass = function (g, f) {
        return g && T.dom.addClass(g, f)
    };
    d.$D = function (f) {
        f && (f.parentNode && f.parentNode.removeChild(f))
    };
    d.on = T.event.on;
    d.un = T.event.un;
    d.Bind = function (g, f) {
        return T.fn.bind(f, g)
    };
    d.show = function (f) {
        f = (typeof f == "object") ? f : d.$(f);
        if (f) {
            f.style.display = "block";
            return f
        }
    };
    d.hide = function (f) {
        f = (typeof f == "object") ? f : d.$(f);
        if (f) {
            f.style.display = "none";
            return f
        }
    };
    d.Contains = function (f, g) {
        var f = d.g(f) || f;
        var g = d.g(g) || g;
        while (g && g != f) {
            g = g.parentNode
        }
        return(g == f)
    };
    d.Extend = function (f, i, j) {
        for (var g in i) {
            if (!(j && f[g])) {
                f[g] = i[g]
            }
        }
        return f
    };
    d.getAttr = T.dom.getAttr;
    d.setAttr = T.dom.setAttr;
    d.addClass = T.dom.addClass;
    d.q = T.dom.q;
    d.removeClass = function (g, f) {
        return g && T.dom.removeClass(g, f)
    };
    d.getPosition = T.dom.getPosition;
    d.children = function (f) {
        return T.dom.children(d.g(f))
    };
    d.firstChild = function (i, g) {
        if (d.isIE) {
            return i.firstChild
        } else {
            var f = i.getElementsByTagName(g);
            return f[0]
        }
    };
    d.lastChild = function (i, g) {
        if (d.isIE) {
            return i.lastChild
        } else {
            var f = i.getElementsByTagName(g);
            return f[f.length - 1]
        }
    };
    d.jsonParse = T.json.parse;
    d.forEach = function (l, k, g) {
        if (l.forEach) {
            l.forEach(k, g)
        } else {
            for (var j = 0, f = l.length; j < f; j++) {
                k.call(g, l[j], j, l)
            }
        }
    };
    d.stopEvent = function (f) {
        f = f || window.event;
        if (f.stopPropagation) {
            f.preventDefault();
            f.stopPropagation()
        } else {
            f.returnValue = false;
            f.cancelBubble = true
        }
    };
    d.post = function (f, g, i) {
        if (typeof g != "string") {
            g.bsToken = T.g("bsToken") && T.g("bsToken").value || "";
            g._req_seqid = s_session.seqId;
            if (s_session.debug) {
                g.debug = "on"
            }
            g = T.url.jsonToQuery(g)
        } else {
            g += "&_req_seqid=" + s_session.seqId + "&bsToken=" + (T.g("bsToken") && T.g("bsToken").value || "");
            if (s_session.debug) {
                g += "&debug=on"
            }
        }
        T.ajax.post(f, g, function (l, k) {
            if (k) {
                var j = T.json.parse(k);
                if (j.errNo == "403") {
                } else {
                    if (j.errNo == "2012") {
                        F.use("common/pop", function (m) {
                            m && m.alert("非常抱歉，系统正在升级维护中，立即恢复正常。")
                        })
                    } else {
                        i && i(j);
                        a.fire("ajaxSuccess", {logId: j.logId, url: f, method: "post", data: j})
                    }
                }
            }
        })
    };
    if (!d.ajax) {
        d.ajax = d.extendObject({}, T.ajax)
    }
    d.extendObject(d.ajax, {get: function (f, i) {
        var g = {};
        if (!T.url.getQueryValue(f, "_req_seqid")) {
            g._req_seqid = s_session.seqId
        }
        if (s_session.debug) {
            g.debug = "on"
        }
        if (!T.url.getQueryValue(f, "asyn") || T.url.getQueryValue(f, "asyn") != 1) {
            g.asyn = 1
        }
        if (!T.url.getQueryValue(f, "t") && !T.url.getQueryValue(f, "r")) {
            g.t = (new Date()).valueOf()
        }
        if (f && f.indexOf("?") > 0) {
            f += "&" + T.url.jsonToQuery(g)
        } else {
            f += "?" + T.url.jsonToQuery(g)
        }
        T.ajax.get(f, function (m, l) {
            if (l) {
                var k = {};
                try {
                    k = T.json.parse(l)
                } catch (j) {
                    new Image().src = s_domain.baseuri + "/page/data/pageserver?errno=2013&url=" + encodeURIComponent(f)
                }
                if (k.errNo && (k.errNo == "403")) {
                    new Image().src = s_domain.baseuri + "/page/data/pageserver?errno=403&url=" + encodeURIComponent(f)
                } else {
                    i && i(k);
                    a.fire("ajaxSuccess", {logId: k.logId, url: f, method: "get", data: k})
                }
            }
        })
    }, loadJsFile: T.page.loadJsFile, callByServer: T.sio.callByServer});
    d.isLeftBtn = function (f) {
        return(d.isIE9 || (d.isIE && f.button == 1 || !d.isIE && f.button == 0))
    };
    d.domReady = T.dom.ready;
    d.loadCss = function (g) {
        var f = document.createElement("link");
        f.setAttribute("rel", "stylesheet");
        f.setAttribute("type", "text/css");
        f.setAttribute("href", g);
        document.getElementsByTagName("head")[0].appendChild(f)
    };
    d.setStyle = T.dom.setStyle;
    d.setStyles = T.dom.setStyles;
    d.prev = T.dom.prev;
    d.next = T.dom.next;
    d.Extend(d, T, 1);
    d.body = function () {
        var j = 0, l = 0, o = 0, g = 0, i = 0, k = 0;
        var n = window, f = document, m = f.documentElement;
        j = m.clientWidth || f.body.clientWidth;
        l = n.innerHeight || m.clientHeight || f.body.clientHeight;
        g = f.body.scrollTop || m.scrollTop;
        o = f.body.scrollLeft || m.scrollLeft;
        i = Math.max(f.body.scrollWidth, m.scrollWidth || 0);
        k = Math.max(f.body.scrollHeight, m.scrollHeight || 0, l);
        return{scrollTop: g, scrollLeft: o, documentWidth: i, documentHeight: k, viewWidth: j, viewHeight: l}
    };
    if (!F._useConfig) {
        window.S = d
    }
});
F.module("lib/log", function (n, u, r) {
    var k = r.base;
    var j = {m: 1, mod: 1, submod: 1, evttype: 1, mouse: 1, initiator: 1, portrait: 1, glogid: 1, mlogid: 1, slogid: 1, type: 1, pid: 1, logitemid: 1}, a = {sys: 1, base: 1, page: 2, feed: 2, nav: 2, hot: 2, app: 2, msg: 2, res: 2}, i = {}, p = s_session.usertype, q = (s_session.userTips.isNewVersion ? "pack" : "classic"), o = s_session.portrait, d = s_session.logId || "0", m = 0, g = {};
    var s = function (x, w) {
        var v = {mod: x, submod: w || "", utype: p, superver: q, portrait: o, mlogid: a[x] == 2 ? i[x] || d : "", glogid: d, type: 2011, pid: 315, version: "PCHome", terminal: "PC", _r: Math.random()};
        return v
    };
    var c = function (v) {
        var x = "imglog__" + (new Date()).getTime(), w = window[x] = new Image();
        w.onload = (w.onerror = function () {
            window[x] = null
        });
        w.src = v;
        w = null
    };
    var f = function (w) {
        var B = s(w._MOD, w._SUBMOD), v = w._MOD + "_" + w._EVENT_NAME;
        B.m = v;
        if (g[v]) {
            B.logitemid = g[v]
        }
        for (var x in w) {
            if (x.indexOf("_") == 0) {
                continue
            }
            if (B[x]) {
                r.warn("logParamConflicted", x + " is conflicted in " + B.m);
                continue
            }
            var z = w[x], y = typeof z;
            if (y == "string" || y == "number" || y == "boolean") {
                B[x] = z
            }
        }
        var A = t() + k.jsonToQuery(B);
        F.use("lib/mod_evt", function (C) {
            var D = C.fire("lib/log", "beforeSendLog", {modEvt: C, logParams: B});
            if (D.returnValue) {
                c(A)
            }
        })
    };
    var b = function (x, w) {
        var z = Object.prototype.toString.call(w);
        switch (z) {
            case"[object Array]":
                r.listen(x, w, f);
                break;
            case"[object Object]":
                var v = x.split("/")[0];
                for (var y in w) {
                    r.listen(x, y, f);
                    g[v + "_" + y] = w[y]
                }
                break
        }
    };
    var t = function () {
        return"http://dj" + (++m % 3) + ".baidu.com/v.gif?"
    };
    var l = /home\/\w+\/(data|submit)\/\w+/;
    r.listen("lib/sbase", "ajaxSuccess", function (w) {
        if (!w.logId) {
            return
        }
        var x = w.url && w.url.match(l), v = x && x[0] || "", z = v.split("/"), y = z && z[1];
        if (y) {
            i[y] = w.logId
        }
    });
    u.defaultLog = b
});
F.use("lib/sbase", function (b) {
    b.BaseClass = function () {
        var c = this, d = {};
        c.on = function (g, i) {
            var f = d[g];
            if (!f) {
                f = d[g] = []
            }
            f.push(i)
        };
        c.un = function (g, i) {
            if (!g) {
                d = {};
                return
            }
            var f = d[g];
            if (f) {
                if (i) {
                    T.each(f, function (k, j) {
                        if (k == i) {
                            f.splice(j, 1);
                            return false
                        }
                    })
                } else {
                    d[g] = []
                }
            }
        };
        c.fire = function (g, i) {
            var f = d[g];
            if (f) {
                i = i || {};
                T.each(f, function (j) {
                    i._result = j.call(c, T.extend({_ctx: {src: c}}, i))
                })
            }
        }
    };
    var a = {};
    a.create = function (c, f) {
        f = f || b.BaseClass;
        return function d() {
            f.apply(this, arguments);
            var g = T.extend({}, this);
            c.apply(this, arguments);
            this._super = g
        }
    };
    b.Class = a
});
F.module("lib/exception", function (d, c, b) {
    var f = d("lib/sbase");
    d("lib/mod_evt");
    var a = function (j, i) {
        j.errType = i;
        if (b.fire) {
            setTimeout(function () {
                b.fire("jsErrorCaptured", j)
            }, 3000)
        }
    };
    var g = c;
    g.err = function (l, k, j, i) {
        if (f.isChrome && l == "Script error." && j == 0) {
            return
        }
        a({key: "sysOnError", msg: encodeURIComponent(l), url: k, line: j, status: i}, "error")
    };
    g.warn = function (j, i, l, k) {
        a({key: i, mod: j, msg: l, errObj: k}, "warn")
    };
    g.fail = function (j, i, l, k) {
        a({key: i, mod: j, msg: l, errObj: k}, "fail")
    }
});
(function () {
    if (T.browser.ie != 6) {
        window.onerror = function (c, b, a) {
            F.use("lib/exception", function (d) {
                if (!window._load_status) {
                    window._load_status = "before"
                }
                d.err(c, b, a, window._load_status);
                if (!F._useConfig) {
                    throw new Error(c, b, a)
                }
            })
        }
    }
})();
F.use("lib/sbase", function (a) {
    a.UIM = a.UIM || {};
    a.UIM.View = a.Class.create(function (b) {
        var d = this, f = new a.UIM.Model(b);

        function c(g) {
            f.init(g)
        }

        d.model = f;
        d.initModel = c
    })
});
F.use("lib/sbase", function (a) {
    a.UIM = a.UIM || {};
    a.UIM.Model = a.Class.create(function (v) {
        var s = this, o = {}, c = {a: [], u: [], d: []};

        function q(x) {
            var w = (a.lang.isString(x) ? a.json.parse(x) : x);
            a.each(w, function (y) {
                o["d" + y.id] = y
            })
        }

        function f(w, x) {
            v.load(w, function (y) {
                if (y && y.data) {
                    q(y.data);
                    x(s, y)
                } else {
                    x(s, {_err: true})
                }
            }, function () {
                x(s, {_err: true})
            })
        }

        function b(x) {
            var y = o;
            for (var w in y) {
                if (y.hasOwnProperty(w)) {
                    if (x(a.extendObject({}, y[w])) === false) {
                        break
                    }
                }
            }
        }

        function p() {
            o = {}
        }

        function k() {
            var w = o;
            for (var x in w) {
                if (w.hasOwnProperty(x)) {
                    return false
                }
            }
            return true
        }

        function n(y, x) {
            x = x || {};
            var z = x.count || 0, w = [];
            b(function (A) {
                if (y(A) === true) {
                    w.push(A);
                    if (z > 0 && (z <= w.length)) {
                        return false
                    }
                }
            });
            return w
        }

        function r(x) {
            var w = o["d" + x];
            return(w ? a.extendObject({}, o["d" + x]) : w)
        }

        function j(A, y, z) {
            if (r(A)) {
                var x = o["d" + A];
                var w = parseInt(y.id);
                x.id = y.id;
                delete o["d" + A];
                o["d" + w] = x
            } else {
                c.d.push(y);
                t(z)
            }
        }

        function i(w) {
            return(w && (typeof w.id != "undefined") && (w.id != ""))
        }

        function m(w, x) {
            if (i(w)) {
                if (!r(w.id)) {
                    o["d" + w.id] = w;
                    x && x({data: w});
                    s.fire("added", {data: r(w.id)})
                }
            } else {
                if (w) {
                    c.a.push(w);
                    t(x)
                }
            }
        }

        function g(z, A) {
            if (i(z)) {
                var y = o["d" + z.id];
                if (y) {
                    var x = d(y, z);
                    if (v.hasUpdatedProp(x)) {
                        c.u.push(z);
                        t(A)
                    } else {
                        a.extend(y, z);
                        var w = {data: r(z.id), changeList: x};
                        s.fire("updated", w);
                        A && A(w)
                    }
                }
            }
        }

        function d(y, w) {
            var B = [];
            for (var A in y) {
                if (w.hasOwnProperty(A)) {
                    var z = y[A], x = w[A];
                    if (z != x) {
                        B.push(A)
                    }
                }
            }
            return B
        }

        function u(z, x, y) {
            var w = r(z);
            if (w) {
                if (x) {
                    delete o["d" + z];
                    s.fire("removed", {data: w});
                    y && y({data: w})
                } else {
                    c.d.push(w);
                    t(y)
                }
            }
        }

        function t(B) {
            var x = c;
            if (x.a.length > 0) {
                var A = x.a;
                x.a = [];
                a.each(A, function (C) {
                    v.add(C, function (D) {
                        if (D.errNo == 0) {
                            if (D.data) {
                                a.extend(C, D.data)
                            }
                            C.id = C.id || Math.floor(Math.random() * new Date().getTime());
                            m(C, function (E) {
                                B && B(E, D)
                            })
                        } else {
                            B({data: C}, D)
                        }
                    })
                });
                A = null
            }
            if (x.u.length > 0) {
                var w = x.u;
                x.u = [];
                a.each(w, function (C) {
                    v.update(C, function (G) {
                        if (G.errNo == 0) {
                            var E = r(C.id), H = d(E, C), D = {data: r(C.id), changeList: H};
                            a.extend(r(C.id), C);
                            s.fire("updated", D);
                            B && B(D, G)
                        } else {
                            B({data: C}, G)
                        }
                    })
                });
                w = null
            }
            if (x.d.length > 0) {
                var z = x.d;
                x.d = [];
                var y = l(z);
                if (y[0].length > 0) {
                    a.each(y[0], function (C) {
                        delete o["d" + C.id];
                        s.fire("removed", {data: C});
                        B && B({data: C})
                    })
                }
                if (y[1].length > 0) {
                    v.remove(y[1], function (C) {
                        if (C.errNo == 0) {
                            a.each(y[1], function (D) {
                                delete o["d" + D.id];
                                s.fire("removed", {data: D});
                                B && B({data: D}, C)
                            })
                        } else {
                            a.each(y[1], function (D) {
                                B && B({data: D}, C)
                            })
                        }
                    })
                }
            }
        }

        function l(x) {
            var w = [];
            w[0] = [];
            w[1] = [];
            if (x.length > 0) {
                a.each(x, function (y) {
                    if (y.id < 0) {
                        w[0].push(y)
                    } else {
                        w[1].push(y)
                    }
                })
            }
            return w
        }

        s.init = q;
        s.load = f;
        s.get = r;
        s.find = n;
        s.each = b;
        s.add = m;
        s.update = g;
        s.remove = u;
        s.clear = p;
        s.isEmpty = k;
        s.set = j
    })
});
F.use("lib/sbase", function (a) {
    var b = a.Class.create(function (c) {
        var f = this;

        function g(i, j, k) {
            if (!i) {
                return
            }
            a.post(i.url, d(i.params, j), function (l) {
                k(l)
            })
        }

        function d(m, j) {
            var l = a.extendObject({}, m);
            for (var k in j) {
                if (j.hasOwnProperty(k)) {
                    var i = j[k];
                    l[k] = i
                }
            }
            return l
        }

        f.load = function (k, l, i) {
            var j = c.load.url;
            j += (j.indexOf("?") > 0 ? "&" : "?");
            if (k) {
                j += a.url.jsonToQuery(k, encodeURIComponent) + "&"
            }
            j += "asyn=1&_t=" + new Date().getTime();
            a.ajax.request(j, {method: "GET", onsuccess: function (p, o) {
                if (o) {
                    try {
                        var n = baidu.json.parse(o);
                        if (n.errNo && (n.errNo == "403")) {
                            pop && pop.alert("已经退出，请重新登录");
                            setTimeout(function () {
                                location.href = s_domain.login + s_domain.bs + s_domain.baseuri
                            }, 2000)
                        } else {
                            l && l(n)
                        }
                    } catch (m) {
                        i && i()
                    }
                } else {
                    i && i()
                }
            }, onfailure: function (m) {
                i && i()
            }})
        };
        f.add = function (i, j) {
            g(c.add, i, j)
        };
        f.update = function (i, j) {
            g(c.update, i, j)
        };
        f.hasUpdatedProp = function (n) {
            var m = c.update.params;
            for (var k = 0, j = n.length; k < j; k++) {
                if (m.hasOwnProperty(n[k])) {
                    return true
                }
            }
            return false
        };
        f.remove = function (k, l) {
            var j = [], i = [];
            a.forEach(k, function (m) {
                j.push(m.id);
                if (m.layout) {
                    i.push(m.layout)
                }
            });
            if (i.length > 0) {
                g(c.remove, {id: j.join(","), layout: i.join(",")}, l)
            } else {
                g(c.remove, {id: j.join(",")}, l)
            }
        }
    });
    a.UIM = a.UIM || {};
    a.UIM.Service = {};
    a.UIM.Service.create = function (c) {
        return new b(c)
    }
});
F.module("common/image_lazy_load", function (c, g, m) {
    var f = m.base;
    var l = 0;
    var k = 0;
    var j = [];
    var d = false;
    g.isVisible = function (r, t) {
        var E = t ? 0 : 60;
        var w = t ? 0 : 60;
        var B = {};
        try {
            B = f.getPosition(r)
        } catch (C) {
            B = {left: 0, top: 0}
        }
        var p = f.getScrollTop();
        var y = f.getScrollLeft();
        var x = f.getViewWidth();
        var v = f.getViewHeight();
        var A = B.left - E, q = B.top - w, z = B.left + r.offsetWidth + E, o = B.top + r.offsetHeight + w, s = y, D = p, n = y + x, u = p + v;
        return A <= n && q <= u && z >= s && o >= D
    };
    var b = function (n) {
        if (f.getAttr(n, "data-loaded") == "1") {
            return true
        }
        return false
    };
    var a = function () {
        if (!d) {
            d = true;
            l = window.setInterval(function () {
                if (j.length === 0) {
                    window.clearInterval(l);
                    d = false;
                    return
                }
                for (var n = 0; n < j.length; n++) {
                    var p = j[n];
                    if (!b(p) && g.isVisible(p)) {
                        if (f.getAttr(p, "data-loadfunc") != "1") {
                            f.setAttr(p, "data-loadfunc", 1);
                            f.on(p, "load", function (r) {
                                var t = this;
                                f.setAttr(t, "data-loaded", 1);
                                for (var q = 0; q < j.length; q++) {
                                    var s = j[q];
                                    if (t === s) {
                                        j.splice(q, 1)
                                    }
                                }
                            })
                        }
                        var o = f.getAttr(p, "data-src") + "";
                        if (o.indexOf("http") > -1) {
                            f.setAttr(p, "src", o);
                            p.removeAttribute("data-src")
                        }
                    }
                }
            }, 300)
        }
    };
    g.scanAndDoRender = function (o) {
        var n = false;
        if (!o) {
            o = document.body;
            n = true
        }
        var p = [];
        f.forEach(o.getElementsByTagName("img"), function (r, q) {
            if (f.getAttr(r, "data-src") && !b(r)) {
                p.push(r)
            }
        });
        if (n) {
            j = p
        } else {
            j = j.concat(p)
        }
        a(j)
    };
    var i = function () {
        f.forEach(["resize", "scroll", "load"], function (n) {
            f.on(window, n, function (o) {
                if (k) {
                    window.clearTimeout(k)
                }
                k = window.setTimeout(function () {
                    k = 0;
                    _scanAndDoRender()
                }, 20);
                f.stopEvent(o)
            })
        })
    };
    g.init = function () {
        g.scanAndDoRender();
        i()
    }
});
F.module("common/user_attr", function (b, f, n) {
    var d = n.base;
    var k = {SUBMIT_STATUS: ["/page/submit/userattr", "/page/submit/usertips"]};
    var m = [(n.session.userProp || 0), (n.session.userTips || 0)], c = {};
    var j = function (o) {
        var p = m[0][o], q = m[1][o];
        if (p != undefined) {
            c.name = 0;
            return p
        } else {
            if (q != undefined) {
                c.name = 1;
                return q
            } else {
                return
            }
        }
    };
    var a = function (p, q) {
        var o = j(p);
        if (typeof o != "undefined" && (o != q)) {
            d.post(s_domain.baseuri + k.SUBMIT_STATUS[c.name], {prop: p, value: i(q)}, function (r) {
                if (r.errNo == 0) {
                    m[c.name][p] = q;
                    n.fire("setUserAttr", {attr: p, state: "setSucc"})
                } else {
                    n.fire("setUserAttr", {attr: p, state: "setFail"})
                }
            })
        }
    };
    var g = function (v, p) {
        var o = v.length, r = [], t = [];
        for (var s = 0; s < o; s++) {
            var q = j(v[s]);
            if (typeof q != "undefined" && (q != p[s])) {
                r.push(v[s]);
                t.push(i(p[s]))
            }
        }
        var u = r.length;
        if (u > 0) {
            if (l) {
                d.post(s_domain.baseuri + k.SUBMIT_STATUS[c.name], {prop: r.join(","), value: t.join(",")}, function (y) {
                    if (y.errNo == 0) {
                        for (var x = 0; x < u; x++) {
                            m[c.name][r[x]] = (t[x] == "on" ? true : false);
                            n.fire("setUserAttr", {attr: r[x], state: "setSucc"})
                        }
                    } else {
                        for (var w = 0; w < u; w++) {
                            m[c.name][r[w]] = t[w];
                            n.fire("setUserAttr", {attr: r[w], state: "setFail"})
                        }
                    }
                })
            } else {
            }
        }
    };
    var i = function (o) {
        if (o === true) {
            return"on"
        } else {
            if (o === false) {
                return"off"
            } else {
                return o
            }
        }
    };
    var l = function (p) {
        if (p && p.length > 0) {
            var r = p.length, q = c[_names[0]];
            for (var o = r - 1; o >= 0; o--) {
                if (c[_names[0]] != q) {
                    return false
                }
            }
            return true
        }
    };
    f.getAttr = j;
    f.setAttr = a;
    f.setMultiAttr = g
});
F.module("common/strpx", function (f, b, a) {
    var g = a.base;
    var d = 0, c = "中", j = "visibility:hidden;position:absolute;bottom:0;left:0;", i = "s_strpx_span";
    b.Strpx = function (p) {
        d++;
        var m = 0, o = {}, n = g.createDom("span", {style: j + (p || ""), id: i + d});
        document.getElementsByTagName("body")[0].appendChild(n);
        n.innerHTML = c;
        m = n.offsetWidth;
        var l = function (v) {
            var u = 0;
            for (var t = 0, r = v.length; t < r; t++) {
                var s = v.charCodeAt(t);
                u += s > 255 ? m : q.call(this, v.charAt(t))
            }
            return u
        };
        var q = function (s) {
            if (o[s]) {
                return o[s]
            } else {
                n.innerHTML = (s == " " ? "&nbsp;" : s);
                var r = n.offsetWidth;
                o[s] = r;
                return r
            }
        };
        var k = function (x, u, y) {
            if (!x) {
                return x
            }
            if (x.length * m < u) {
                return x
            }
            if (l(x) <= u) {
                return x
            }
            if (y) {
                u = u - l(y)
            }
            if (u < 0) {
                u = 0
            }
            var w = 0;
            for (var t = 0, r = x.length; t < r; t++) {
                var s = x.charCodeAt(t), v = s > 255 ? m : q.call(this, x.charAt(t));
                if (w <= u && w + v > u) {
                    return x.substring(0, t) + (y || "")
                } else {
                    w += v
                }
            }
            return x
        };
        return{substringByPx: k, getLengthPx: l}
    }
});
F.module("common/localstorage", function (d, b, a) {
    var f = a.base;
    var c, f = c = f || {version: "1.5.2.2"};
    f.$$ = window[f.guid] = window[f.guid] || {global: {}};
    f.data = f.data || {};
    f.lang.isDate = function (g) {
        return{}.toString.call(g) === "[object Date]" && g.toString() !== "Invalid Date" && !isNaN(g)
    };
    b.ls = f.data.storage = (function () {
        var j = f.lang.guid(), n = {SUCCESS: 0, FAILURE: 1, OVERFLOW: 2};

        function o(p) {
            return p.replace(/[_\s]/g, function (q) {
                return q == "_" ? "__" : "_s"
            })
        }

        function l() {
            return f.dom.g(j + "-storage")
        }

        function i() {
            var p;
            if (window.ActiveXObject && f.browser.ie < 9) {
                p = g()
            } else {
                if (window.localStorage) {
                    p = m()
                } else {
                    p = k()
                }
            }
            return p
        }

        function g() {
            f.dom.insertHTML(document.body, "beforeEnd", f.string.format('<div id="#{id}" style="display:none;"></div>', {id: j + "-storage"}));
            l().addBehavior("#default#userData");
            return{set: function (u, t, v, x) {
                var q = n.SUCCESS, w = l(), s = o(u), p = x && x.expires ? x.expires : new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
                if (f.lang.isDate(p)) {
                    p = p.getTime()
                } else {
                    p = new Date().getTime() + (p - 0)
                }
                w.expires = new Date(p).toUTCString();
                try {
                    w.setAttribute(s, t);
                    w.save(s)
                } catch (r) {
                    q = n.OVERFLOW
                }
                w = null;
                v && v.call(this, q, t)
            }, get: function (q, v) {
                var p = n.SUCCESS, r = l(), u = o(q), t = null;
                try {
                    r.load(u);
                    t = r.getAttribute(u)
                } catch (s) {
                    p = n.FAILURE
                }
                v && v.call(this, p, t)
            }, del: function (q, v) {
                var p = n.SUCCESS, r = l(), u = o(q), t;
                try {
                    r.load(u);
                    t = r.getAttribute(u);
                    if (t) {
                        r.removeAttribute(u);
                        r.expires = new Date(315532799000).toUTCString();
                        r.save(u)
                    } else {
                        p = n.FAILURE
                    }
                } catch (s) {
                    p = n.FAILURE
                }
                v && v.call(this, p, t)
            }}
        }

        function m() {
            return{set: function (v, u, w, x) {
                var q = n.SUCCESS, r = window.localStorage, t = o(v), p = x && x.expires ? x.expires : 0;
                if (f.lang.isDate(p)) {
                    p = p.getTime()
                } else {
                    if (p > 0) {
                        p = new Date().getTime() + (p - 0)
                    }
                }
                try {
                    r.setItem(t, p + "|" + u)
                } catch (s) {
                    q = n.OVERFLOW
                }
                w && w.call(this, q, u)
            }, get: function (w, x) {
                var r = n.SUCCESS, s = window.localStorage, v = o(w), p = null, t, q;
                try {
                    p = s.getItem(v)
                } catch (u) {
                    r = n.FAILURE
                }
                if (p) {
                    t = p.indexOf("|");
                    q = parseInt(p.substring(0, t), 10);
                    if (new Date(q).getTime() > new Date().getTime() || q == 0) {
                        p = p.substring(t + 1, p.length)
                    } else {
                        p = null;
                        r = n.FAILURE;
                        this.del(w)
                    }
                } else {
                    r = n.FAILURE
                }
                x && x.call(this, r, p)
            }, del: function (q, v) {
                var p = n.SUCCESS, u = window.localStorage, t = o(q), s = null;
                try {
                    s = u.getItem(t)
                } catch (r) {
                    p = n.FAILURE
                }
                if (s) {
                    s = s.substring(s.indexOf("|") + 1, s.length);
                    p = n[s ? "SUCCESS" : "FAILURE"];
                    s && u.removeItem(t)
                } else {
                    p = n.FAILURE
                }
                v && v.call(this, p, s)
            }}
        }

        function k() {
            return{set: function (q, r, s, p) {
                f.cookie.set(o(q), r, p);
                s && s.call(me, n.SUCCESS, r)
            }, get: function (p, r) {
                var q = f.cookie.get(o(p));
                r && r.call(me, n[q ? "SUCCESS" : "FAILURE"], q)
            }, del: function (p, s) {
                var r = o(p), q = f.cookie.get(r);
                f.cookie.remove(r);
                s && s.call(me, n[q ? "SUCCESS" : "FAILURE"], q)
            }}
        }

        return{set: function (q, s, t, p) {
            var r = this;
            !r._storage && (r._storage = i());
            r._storage.set.apply(r._storage, arguments)
        }, get: function (p, r) {
            var q = this;
            !q._storage && (q._storage = i());
            q._storage.get.apply(q._storage, arguments)
        }, remove: function (p, r) {
            var q = this;
            !q._storage && (q._storage = i());
            q._storage.del.apply(q._storage, arguments)
        }}
    })()
});
F.module("common/tween", function (c, b, a) {
    var d = a.base;
    b.Class = function () {
        var q = {simple: function (v, s, t, u) {
            return t * v / u + s
        }, regularEaseIn: function (u, s, w, v) {
            return w * (u /= v) * u + s
        }, regularEaseOut: function (u, s, w, v) {
            return -w * (u /= v) * (u - 2) + s
        }, strongEaseOut: function (u, s, w, v) {
            return w * ((u = u / v - 1) * u * u * u * u + 1) + s
        }};
        var n = [];
        var k = 0;
        var j = 10;

        function r(s) {
            n.push(s);
            l()
        }

        function l() {
            if (k) {
                return
            }
            clearInterval(k);
            k = setInterval(i, j)
        }

        function i() {
            if (n.length == 0) {
                clearInterval(k);
                k = 0;
                return
            }
            var t = +new Date();
            for (var u = 0; u < n.length; u++) {
                var s = n[u];
                s.passed = t - s.start;
                if (s.passed >= s.duration) {
                    s.passed = s.duration;
                    s.tween = s.to;
                    g(s);
                    s.destroy();
                    u--
                } else {
                    f(s)
                }
            }
        }

        function f(s, t) {
            s.tween = t !== undefined ? t : q[s.trans](s.passed, s.from, s.to - s.from, s.duration);
            g(s)
        }

        function g(s) {
            try {
                s.func()
            } catch (t) {
            }
        }

        function p(t) {
            for (var u = 0, s = this.length; u < s; u++) {
                if (this[u] === t) {
                    return u
                }
            }
            return -1
        }

        function o() {
            var t = this;
            t.ondestroy();
            for (var s in t) {
                delete t[s]
            }
            n.splice(n.indexOf ? n.indexOf(t) : p.call(n, t), 1);
            t = null
        }

        return function m(s) {
            if (!s || this == window) {
                return
            }
            this.from = s.from || 0;
            this.to = s.to === undefined ? 1 : s.to;
            this.trans = s.trans || "simple";
            this.duration = s.duration === undefined ? 1000 : s.duration;
            this.func = s.func || function () {
            };
            this.start = +new Date();
            this.destroy = o;
            this.ondestroy = s.ondestroy || function () {
            };
            r(this)
        }
    }()
});