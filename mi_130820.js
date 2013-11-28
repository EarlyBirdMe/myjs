//t.qq.com
String.prototype.hasString = function (a) {
    if ("object" == typeof a) {
        for (var b = 0, c = a.length; b < c; b++)if (!this.hasString(a[b]))return!1;
        return!0
    }
    if (-1 != this.indexOf(a))return!0
};
String.prototype.breakWord = function (a, b) {
    b || (b = "<wbr/>");
    return this.replace(RegExp("(\\w{" + (a ? a : 0) + "})(\\w)", "g"), function (a, g, i) {
        return g + b + i
    })
};
window.UI && function () {
    var a = UI;
    window.UI_ = function () {
        for (var b in a)UI[b] || (UI[b] = a[b])
    }
}();
UI = {ajax: function (a) {
    var b = a.xhr || UI.xmlHttp(), c, g;
    a.async = UI.isUndefined(a.async) ? !0 : a.async;
    b.onreadystatechange = function () {
        b && (1 == b.readyState ? a.timeout && a.fail && (g = setTimeout(function () {
            c || (c = 1, a.fail(), b.abort(), b = null)
        }, a.timeout), a.timeout = 0) : 2 == b.readyState ? a.send && a.send() : 4 == b.readyState && !c && (c = 1, 200 == b.status ? a.success && a.success(b.responseText) : a.fail && a.fail(), clearTimeout(g), b = null))
    };
    if (UI.isObject(a.data)) {
        var i = [], j;
        for (j in a.data)i.push(j + "=" + encodeURIComponent(a.data[j]));
        a.data = i.join("&")
    }
    i = function () {
        a.refer && b.setRequestHeader("rf", a.refer)
    };
    "get" == a.type ? (b.open("GET", a.url + (a.url.hasString("?") ? "&" : "?") + (a.data || ""), a.async), i(), b.send(null)) : (b.open("POST", a.url, a.async), i(), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.send(a.data));
    return b
}, get: function (a, b, c) {
    var g = UI.xmlHttp(), i = a.hasString("?") ? "&" : "?";
    g.onreadystatechange = function () {
        if (4 == g.readyState && 200 == g.status)try {
            c(g.responseText)
        } catch (a) {
        } else return g
    };
    if (void 0 != b)if (UI.isObject(b)) {
        var j = [], k;
        for (k in b)j.push(k + "=" + encodeURIComponent(b[k]));
        a += i + j.join("&")
    } else a += i + b;
    g.open("GET", a, !0);
    g.send(null);
    return g
}, xmlHttp: function () {
    return window.ActiveXObject ? function () {
        return new ActiveXObject("Microsoft.XMLHTTP")
    } : window.XMLHttpRequest ? function () {
        return new XMLHttpRequest
    } : function () {
    }
}(), crossAsynJson: function (a, b, c, g) {
    var i = UI.DC("script"), j = UI.GT(document, "head")[0];
    window[b] = function (a) {
        window[b] = void 0;
        try {
            delete window[b]
        } catch (g) {
        }
        c(a);
        j && setTimeout(function () {
            j.removeChild(i)
        }, 5)
    };
    g && UI.A(i, "charset", g);
    UI.A(i, "type", "text/javascript");
    UI.A(i, "src", a);
    j.appendChild(i)
}, getScript: function (a, b, c) {
    var g = UI.DC("script");
    UI.B.ie ? g.onreadystatechange = function () {
        if ("loaded" == this.readyState || "complete" == this.readyState)b && b(), g = null
    } : g.onload = function () {
        b && b();
        g = null
    };
    c && UI.A(g, "charset", c);
    UI.A(g, "type", "text/javascript");
    UI.A(g, "src", a);
    UI.A(g, "async", "true");
    UI.GT(document, "head")[0].appendChild(g)
}, getCss: function () {
    var a = function (b, g) {
        var i;
        try {
            for (var j = document.styleSheets, k, m, l = 0, n = j.length; l < n; l++)if (m = j[l].ownerNode, m.href == b)if (UI.B.safari)k = m.sheet; else if (m.sheet)try {
                k = m.sheet.cssRules
            } catch (w) {
                if (1E3 == w.code || 18 == w.code)k = 1
            }
            k ? g() : i = 1
        } catch (x) {
            i = 1
        }
        i && setTimeout(function () {
            a(b, g)
        }, 50)
    }, b = 50;
    return function (c, g, i) {
        var j = i ? i : UI.DC("link");
        g && (UI.B.safari || UI.B.firefox ? setTimeout(function () {
            a(c, g)
        }, 50) : j.onload = function () {
            g()
        });
        i || (UI.A(j, "rel", "stylesheet"), UI.A(j, "type", "text/css"), UI.GT(document, "head")[0].appendChild(j));
        try {
            UI.A(j, "href", c)
        } catch (k) {
            if (0 < b) {
                b--;
                var j = UI.GC("style"), m = j.length;
                1 < m && (UI.remove(j[m - 1]), i || UI.remove(null), UI.getCss(c, g || null, i || null))
            }
        }
    }
}(), evalScript: function (a) {
    var b = this.regExp.script;
    (a = (a || "").match(RegExp(b, "img"))) && UI.each(a, function (a) {
        eval(a.match(RegExp(b, "im"))[1])
    })
}, regExp: {script: "<script[^>]*>([\\S\\s]*?)<\/script>"}, encode: function (a) {
    return escape(UI.utfEncode(a))
}, decode: function (a) {
    return UI.utfDecode(unescape(a))
}, utfEncode: function (a) {
    for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0, g = a.length; c < g; c++) {
        var i = a.charCodeAt(c);
        128 > i ? b += String.fromCharCode(i) : (127 < i && 2048 > i ? b += String.fromCharCode(i >> 6 | 192) : (b += String.fromCharCode(i >> 12 | 224), b += String.fromCharCode(i >> 6 & 63 | 128)), b += String.fromCharCode(i & 63 | 128))
    }
    return b
}, utfDecode: function (a) {
    for (var b = "", c = 0, g = c1 = c2 = c3 = 0; c < a.length;)g = a.charCodeAt(c), 128 > g ? (b += String.fromCharCode(g), c++) : 191 < g && 224 > g ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((g & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((g & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
    return b
}, parseUrl: function (a, b) {
    var c = a ? a : document.location.href, g = {}, b = b || "?";
    if (!c.hasString(b))return g;
    for (var c = c.split(b)[1].split("&"), i = 0; i < c.length; i++) {
        var j = c[i].replace(/#.*$/g, "").split("=");
        j[1] || (j[1] = "");
        g[j[0]] = UI.B.ie ? j[1] : UI.decode(j[1])
    }
    return g
}, cookie: function (a, b, c, g) {
    if (void 0 == b) {
        a += "=";
        b = document.cookie.split(";");
        c = 0;
        for (g = b.length; c < g; c++) {
            for (var i = b[c]; " " == i.charAt(0);)i = i.substring(1, i.length);
            if (0 == i.indexOf(a))return decodeURIComponent(i.substring(a.length, i.length))
        }
        return null
    }
    i = "";
    c && (i = new Date, i.setTime(i.getTime() + 864E5 * c), i = "; expires=" + i.toGMTString());
    document.cookie = a + "=" + b + i + "; path=/" + (g ? ";domain=" + g : "")
}, drag: function (a, b, c) {
    var g = document, c = void 0 != c ? c : !0;
    UI.EA(a, "mousedown", function (i) {
        b.start && b.start(i);
        c && (a.setCapture ? a.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP));
        b.drag && (g.onmousemove = b.drag);
        g.onmouseup = function () {
            c && (a.releaseCapture ? a.releaseCapture() : window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP));
            b.stop && b.stop(i);
            g.onmousemove = null;
            g.onmouseup = null;
            b.call && b.call(i)
        }
    })
}, animate: function (a, b, c, g, i, j) {
    var i = i || 0.4, k = b.hasString("scroll"), m = "height,width,marginLeft,marginTop".hasString(b), l = "opacity" == b, c = l ? 100 * c : c, n, w = setInterval(function () {
        var j, q, p;
        j = m ? a.style[b] : k ? a[b] : UI.C(a, b);
        l ? (j *= 100, 100 < c && (c = 100)) : k || (j = "auto" == j ? 0 : Number(j.slice(0, -2)));
        if (isNaN(c))clearInterval(w); else {
            if (3 >= Math.abs(c - j) || k && n == j)j = c, clearInterval(w);
            p = (c - j) * i;
            l || (0 < p && 1 > p ? p = 1 : 0 > p && -1 < p && (p = -1));
            q = n = j + p;
            if (!l && (0 > p && 0 < c - q || 0 < p && 0 < q - c))q = c;
            m ? a.style[b] = q + "px" : k ? a[b] = parseInt(q) : UI.C(a, b, !l ? q + "px" : q / 100 + "");
            j == c && (UI.isString(g) ? eval(g) : g && g())
        }
    }, j || 40);
    return w
}, getX: function (a) {
    return a.getBoundingClientRect ? a.getBoundingClientRect().left + UI.scrollX() : (a.offsetParent ? a.offsetLeft + UI.getX(a.offsetParent) : a.offsetLeft) + ("fixed" == UI.C(a, "position") ? UI.scrollX() : 0)
}, getY: function (a) {
    return a.getBoundingClientRect ? a.getBoundingClientRect().top + UI.scrollY() : (a.offsetParent ? a.offsetTop + UI.getY(a.offsetParent) : a.offsetTop) + ("fixed" == UI.C(a, "position") ? UI.scrollY() : 0)
}, within: function (a, b) {
    var c = UI.getX(b) - UI.scrollX(), g = UI.width(b) + c, i = UI.getY(b) - UI.scrollY(), j = UI.height(b) + i, k = {};
    if (a[0] > c && a[0] < g && a[1] > i && a[1] < j)return a[0] - c < (g - c) / 2 && (k.left = !0), a[1] - i < (j - i) / 2 && (k.top = !0), k
}, frameX: function (a) {
    return a.frameElement ? UI.getX(a.frameElement) + UI.frameX(a.parent) : 0
}, frameY: function (a) {
    return a.frameElement ? UI.getY(a.frameElement) + UI.frameY(a.parent) : 0
}, width: function (a) {
    return a ? parseInt(a.offsetWidth) : 0
}, height: function (a) {
    return a ? parseInt(a.offsetHeight) : 0
}, pageWidth: function () {
    return document.body.scrollWidth || document.documentElement.scrollWidth
}, pageHeight: function () {
    return document.body.scrollHeight || document.documentElement.scrollHeight
}, windowWidth: function () {
    var a = document.documentElement;
    return self.innerWidth || a && a.clientWidth || document.body.clientWidth
}, windowHeight: function () {
    var a = document.documentElement;
    return self.innerHeight || a && a.clientHeight || document.body.clientHeight
}, scrollX: function (a) {
    var b = document.documentElement;
    if (a) {
        var c = a.parentNode, g = a.scrollLeft || 0;
        a == b && (g = UI.scrollX());
        return c ? g + UI.scrollX(c) : g
    }
    return self.pageXOffset || b && b.scrollLeft || document.body.scrollLeft
}, scrollY: function (a) {
    var b = document.documentElement;
    if (a) {
        var c = a.parentNode, g = a.scrollTop || 0;
        a == b && (g = UI.scrollY());
        return c ? g + UI.scrollY(c) : g
    }
    return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
}, scrollTo: function (a, b, c) {
    if (a == document.documentElement || a == document.body)return window.scrollTo(b, c)
}, hide: function (a) {
    UI.isString(a) && (a = this.G(a));
    if (a) {
        if (!a.__curDisplay) {
            var b = this.C(a, "display");
            "none" != b && (a.__curDisplay = b)
        }
        a.style.display = "none"
    }
}, show: function (a) {
    UI.isString(a) && (a = this.G(a));
    a && (a.style.display = a.__curDisplay || "")
}, toggle: function (a) {
    UI.isString(a) && (a = this.G(a));
    "none" == this.C(a, "display") ? this.show(a) : this.hide(a)
}, hasClass: function (a, b) {
    return!a || !a.className ? !1 : a.className != a.className.replace(RegExp("\\b" + b + "\\b"), "")
}, addClass: function (a, b) {
    a && (a.className ? this.hasClass(a, b) || (a.className += " " + b) : a.className = b)
}, removeClass: function (a, b) {
    if (a) {
        var c = b.split(" ");
        1 < c.length ? UI.each(c, function (b) {
            UI.removeClass(a, b)
        }) : this.hasClass(a, b) && (a.className = a.className.replace(RegExp("\\b" + b + "\\b"), "").replace(/\s$/, ""))
    }
}, toggleClass: function (a, b) {
    this.hasClass(a, b) ? this.removeClass(a, b) : this.addClass(a, b)
}, next: function (a) {
    a = a.nextSibling;
    return null == a ? !1 : UI.isElement(a) ? a : this.next(a)
}, prev: function (a) {
    a = a.previousSibling;
    return null == a ? !1 : UI.isElement(a) ? a : this.prev(a)
}, remove: function (a) {
    a && a.parentNode && a.parentNode.removeChild(a)
}, append: function (a, b) {
    b.appendChild(a)
}, prepend: function (a, b) {
    var c = b.firstChild;
    c ? UI.before(a, c) : UI.append(a, b)
}, after: function (a, b) {
    var c = b.parentNode;
    c.lastChild == a ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
}, before: function (a, b) {
    b.parentNode.insertBefore(a, b)
}, replace: function (a, b) {
    b.parentNode.replaceChild(a, b)
}, tmpl: function () {
    var a = {};
    return function c(g, i) {
        var j = !/\W/.test(g) ? a[g] = a[g] || c(UI.G(g).innerHTML) : UI.tmplString(g);
        return i ? j(i) : j
    }
}(), tmplString: function (a) {
    return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
}, txTpl: function () {
    var a = {};
    return function (b, c, g, i, j) {
        var k = [];
        if ((j = void 0 != j ? j : !0) && a[b]) {
            for (var j = 0, m = a[b].propList, l = m.length; j < l; j++)k.push(c[m[j]]);
            c = a[b].parsefn
        } else {
            m = [];
            g || (g = "<%");
            i || (i = "%>");
            i = (!1 == /[^\w\d_:\.-]/g.test(b) ? document.getElementById(b).innerHTML : b).replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split(g).join("\t").replace(RegExp("((^|" + i + ")[^\t]*)'", "g"), "$1\r").replace(RegExp("\t=(.*?)" + i, "g"), "';\n s+=$1;\n s+='").split("\t").join("';\n").split(i).join("\n s+='").split("\r").join("\\'");
            for (l in c)m.push(l), k.push(c[l]);
            c = new Function(m, " var s='';\n s+='" + i + "';\n return s");
            j && (a[b] = {parsefn: c, propList: m})
        }
        try {
            return c.apply(null, k)
        } catch (n) {
            b = "txTpl" + (new Date).getTime(), c = "var " + b + "=" + c.toString(), j = navigator.userAgent.toLowerCase(), m = document.getElementsByTagName("head")[0], l = document.createElement("script"), -1 < j.indexOf("gecko") && -1 == j.indexOf("khtml") ? window.eval.call(window, c) : (l.innerHTML = c, m.appendChild(l), m.removeChild(l)), window[b].apply(null, k)
        }
    }
}(), html: function (a) {
    var b = UI.DC("div"), c = [];
    b.innerHTML = a;
    UI.each(b.childNodes, function (a) {
        UI.isElement(a) && c.push(a)
    });
    return c
}, css: function (a, b) {
    var c;
    b || (b = UI.DC("style"), UI.A(b, "type", "text/css"), UI.append(b, UI.GT(document, "head")[0]));
    if (b.styleSheet)try {
        b.styleSheet.cssText = a
    } catch (g) {
        c = $$("head style");
        var i = c.length;
        1 < i && (UI.remove(c[i - 1]), c[i - 2].styleSheet.cssText += a)
    } else c = document.createTextNode(a), UI.append(c, b)
}, text: function (a) {
    for (var b = [], a = a.childNodes, c, g = 0, i = a.length; g < i; g++)c = a[g].nodeName.toUpperCase(), "STYLE" == c || "SCRIPT" == c || b.push(1 != a[g].nodeType ? a[g].nodeValue : UI.text(a[g]));
    return b.join("")
}, parent: function (a, b) {
    if (UI.isArray(a)) {
        var c = [];
        UI.each(a, function (a) {
            (b && UI.hasClass(a.parentNode, b) || !b) && c.push(a.parentNode)
        });
        return c
    }
    return a && a.parentNode
}, parents: function (a, b) {
    if (b) {
        var c = [], g = UI.parents(a);
        UI.each(g, function (a) {
            UI.hasClass(a, b) && c.push(a)
        });
        return c
    }
    return(g = a.parentNode) ? "HTML" == g.nodeName ? [g] : [g].concat(UI.parents(g)) : []
}, children: function (a, b) {
    var c = [];
    b && (b = b.split("|"));
    UI.each(a.childNodes, function (a) {
        var i = !1;
        if (b)for (var j = 0, k = b.length; j < k; j++)if (UI.hasClass(a, b[j])) {
            i = !0;
            break
        }
        UI.isElement(a) && (!b || i) && c.push(a)
    });
    return c
}, A: function (a, b, c) {
    if (a && a.getAttribute) {
        if (void 0 == c)return a.getAttribute(b) || "";
        "" == c ? a.removeAttribute(b) : a.setAttribute(b, c)
    }
}, C: function () {
    var a;
    return function (b, c, g) {
        if (b)if (void 0 == g) {
            if (window.getComputedStyle)return c = c.replace(/([A-Z])/g, "-$1"), c = c.toLowerCase(), window.getComputedStyle(b, null).getPropertyValue(c);
            if (b.currentStyle)return"opacity" == c ? 0 <= b.style.filter.indexOf("opacity=") ? parseFloat(b.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1" : b.currentStyle[c]
        } else!a && "opacity" == c && (a = "opacity"in b.style ? 1 : 2), "opacity" == c && 2 == a ? b.style.filter = (b.style.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + 100 * g + ")" : b.style[c] = g
    }
}(), DC: function (a) {
    return document.createElement(a)
}, E: function (a) {
    if (a && a.clone)return a;
    a = window.event || a || {};
    return{clone: !0, stop: function () {
        a && a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    }, prevent: function () {
        a && a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }, target: a.target || a.srcElement, relatedTarget: a.relatedTarget || (a.fromElement && a.fromElement === a.srcElement ? a.toElement : a.fromElement), x: a.clientX || a.pageX, y: a.clientY || a.pageY, button: a.button, key: a.keyCode, shift: a.shiftKey, alt: a.altKey, ctrl: a.ctrlKey, type: a.type, wheel: a.wheelDelta / 120 || -a.detail / 3}
}, bind: function (a, b, c) {
    c && UI.clear(function () {
        b = null
    });
    return function () {
        return a.apply(b, Array.prototype.slice.call(arguments))
    }
}, EA: function (a, b, c, g) {
    if (a) {
        if (UI.isString(a))var i = c, c = function () {
            eval(i)
        };
        return a.addEventListener ? ("mousewheel" == b && UI.B.firefox && (b = "DOMMouseScroll"), a.addEventListener(b, c, g), !0) : a.attachEvent ? a.attachEvent("on" + b, c) : !1
    }
}, ER: function (a, b, c) {
    if (a)return a.removeEventListener ? (a.removeEventListener(b, c, !1), !0) : a.detachEvent ? a.detachEvent("on" + b, c) : !1
}, fireEvent: function () {
    return document.dispatchEvent ? function (a, b) {
        var c = document.createEvent("HTMLEvents");
        c.initEvent(b, !0, !0);
        return!a.dispatchEvent(c)
    } : function (a, b) {
        var c = document.createEventObject();
        return a.fireEvent("on" + b, c)
    }
}(), linkEvent: function () {
    var a = {}, b = function (b, g) {
        var i = a[b];
        i && UI.each(i, function (a) {
            UI.isFunction(a) && a(g)
        })
    };
    b.event = a;
    b.add = function (b, g) {
        a[b] || (a[b] = []);
        g && a[b].push(g)
    };
    b.remove = function (b, g) {
        var i = a[b];
        UI.each(i, function (a, b) {
            g && a == g && i.splice(b, 1)
        })
    };
    return b
}(), G: function (a) {
    return UI.isElement(a) ? a : document.getElementById(a)
}, GT: function (a, b) {
    return a.getElementsByTagName(b)
}, GC: function () {
    function a(q, p) {
        p || (p = q, q = document);
        q = q || document;
        if (!/^[\w\-_#]+$/.test(p) && q.querySelectorAll)return b(q.querySelectorAll(p));
        if (-1 < p.indexOf(",")) {
            for (var h = p.split(/,/g), n = [], y = 0, u = h.length; y < u; ++y)n = n.concat(a(q, h[y]));
            return l(n)
        }
        var h = p.match(g), u = h.pop(), n = (u.match(j) || m)[1], v = !n && (u.match(i) || m)[1], y = u.split(".").slice(2), u = !n && (u.match(k) || m)[1];
        if (v && !u && q.getElementsByClassName)u = b(q.getElementsByClassName(v)); else {
            u = !n && b(q.getElementsByTagName(u || "*"));
            if (v) {
                for (var v = RegExp("(^|\\s)" + v + "(\\s|$)"), w = -1, x, E = -1, z = [], y = y || ""; x = u[++w];)v.test(x.className) && x.className.hasString(y) && (z[++E] = x);
                u = z
            }
            if (n)return(h = document.getElementById(n)) ? [h] : []
        }
        return h[0] && u[0] ? c(h, u) : u
    }

    function b(a) {
        try {
            return Array.prototype.slice.call(a)
        } catch (b) {
            for (var c = [], g = 0, i = a.length; g < i; ++g)c[g] = a[g];
            return c
        }
    }

    function c(a, b, g) {
        var l = a.pop();
        if (">" === l)return c(a, b, !0);
        for (var n = [], u = -1, v = (l.match(j) || m)[1], w = !v && (l.match(i) || m)[1], l = !v && (l.match(k) || m)[1], x = -1, E, z, s, l = l && l.toLowerCase(); E = b[++x];) {
            z = E.parentNode;
            do if (s = (s = (s = !l || "*" === l || l === z.nodeName.toLowerCase()) && (!v || z.id === v)) && (!w || RegExp("(^|\\s)" + w + "(\\s|$)").test(z.className)), g || s)break; while (z = z.parentNode);
            s && (n[++u] = E)
        }
        return a[0] && n[0] ? c(a, n) : n
    }

    var g = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig, i = /^(?:[\w\-_]+)?\.([\w\-_]+)/, j = /^(?:[\w\-_]+)?#([\w\-_]+)/, k = /^([\w\*\-_]+)/, m = [null, null], l, n = +new Date, w, x = 1;
    w = function (a) {
        var b = a[n], c = x++;
        return!b ? (a[n] = c, !0) : !1
    };
    l = function (a) {
        for (var b = a.length, c = [], g = -1, i = 0, j; i < b; ++i)j = a[i], w(j) && (c[++g] = j);
        n += 1;
        return c
    };
    return a
}(), closest: function (a, b, c) {
    c = c || document;
    for (b = UI.GC(c, b); a;) {
        if (UI.has(b, a))return a;
        a = a.parentNode
    }
    return null
}, getEvent: function () {
    if (window.event)return window.event;
    for (var a = arguments.callee.caller; a;) {
        var b = a.arguments[0];
        if (b && (b.constructor === Event || b.constructor === MouseEvent || "object" === typeof b && b.preventDefault && b.stopPropagation))return b;
        a = a.caller
    }
    return null
}, sortElement: function (a, b) {
    if (1 < a.length && b)for (var c = 0, g = b.length; c < g; c++)a = a.sort(function (a, g) {
        return a.className.hasString(b[c]) && !g.className.hasString(b[c]) ? 1 : -1
    });
    return a
}, withinElement: function (a, b) {
    for (var b = UI.E(b || UI.getEvent()), c = b.relatedTarget || document; c;) {
        if (a === c)return!0;
        c = c.parentNode
    }
    return!1
}, isDate: function (a) {
    return"Date" == this.getType(a)
}, isMouseMove: function () {
    var a, b, c;
    UI.EA(document.body, "mousedown", function (a) {
        a = UI.E(a);
        b = a.x + "," + a.y
    });
    UI.EA(document.body, "mouseup", function (g) {
        g = UI.E(g);
        c = g.x + "," + g.y;
        a = b != c
    });
    UI.isMouseMove = function () {
        return a
    }
}, cloneDate: function (a) {
    if (!a)return a;
    d = new Date;
    d.setTime(a.getTime());
    return d
}, formatDate: function (a, b) {
    for (var c = b.replace(/\W/g, ",").split(","), g = "yyyy MM dd hh mm ss ww".split(" "), i = {y: a.getFullYear(), M: a.getMonth() + 1, d: a.getDate(), h: a.getHours(), m: a.getMinutes(), s: a.getSeconds(), w: a.getDay()}, j = 0, k = c.length; j < k; j++)for (var m = c[j], l = 0; 7 > l; l++) {
        var n = g[l].slice(-1);
        m.hasString(n) && ("w" == n && 0 == i[n] && (i[n] = 7), b = m.hasString(g[l]) ? b.replace(RegExp(g[l], "g"), this.addZero(i[n])) : b.replace(RegExp(g[l].slice(g[l].length / 2), "g"), i[n]))
    }
    return b
}, parseDate: function (a, b) {
    b || (b = "yyyy-MM-dd");
    var b = b.replace(/\W/g, ",").split(","), a = a.replace(/\D/g, ",").split(","), c = 2E3, g = 0, i = 1, j = 0, k = 0, m = 0;
    UI.each(b, function (b, n) {
        "" != a[n] && !isNaN(a[n]) && (b.hasString("y") && (c = Number(a[n])), b.hasString("M") && (g = Number(a[n]) - 1), b.hasString("d") && (i = Number(a[n])), b.hasString("h") && (j = Number(a[n])), b.hasString("m") && (k = Number(a[n])), b.hasString("s") && (m = Number(a[n])), b.hasString("w") && (m = Number(a[n])))
    });
    return new Date(c, g, i, j, k, m)
}, zoneDate: function (a, b) {
    var c = new Date(Number(a)), c = c.getTime() + 6E4 * c.getTimezoneOffset();
    return new Date(c + 36E5 * b)
}, isObject: function (a) {
    return"object" == typeof a
}, isElement: function (a) {
    return a && 1 == a.nodeType
}, isUndefined: function (a) {
    return"undefined" == typeof a
}, isFunction: function (a) {
    return"Function" == this.getType(a)
}, isNumber: function (a) {
    return"Number" == this.getType(a)
}, isString: function (a) {
    return"String" == this.getType(a)
}, isArray: function (a) {
    return"Array" == this.getType(a)
}, getType: function (a) {
    return Object.prototype.toString.call(a).slice(8, -1)
}, json: function (a) {
    var b = {};
    if (a)try {
        b = eval("(" + a + ")")
    } catch (c) {
    }
    return b
}, json2str: function (a) {
    var b = [], c = UI.isArray(a);
    if (UI.isObject(a)) {
        if (null === a)return"null";
        if (window.JSON && window.JSON.stringify)return JSON.stringify(a);
        for (var g in a)b.push((c ? "" : '"' + g + '":') + UI.json2str(a[g]));
        b = b.join();
        return c ? "[" + b + "]" : "{" + b + "}"
    }
    return UI.isNumber(a) || UI.isFunction(a) ? a.toString() : UI.isUndefined(a) ? "undefined" : !a ? '""' : '"' + a + '"'
}, addZero: function (a, b) {
    return Array(Math.abs(("" + a).length - ((b || 2) + 1))).join(0) + a
}, trim: function (a) {
    return a.replace(/^\s+|\s+$/g, "")
}, random: function (a, b) {
    void 0 == a && (a = 0);
    void 0 == b && (b = 9);
    return Math.floor(Math.random() * (b - a + 1) + a)
}, has: function (a, b) {
    for (var c = 0, g = a.length; c < g; c++)if (a[c] == b)return!0;
    return!1
}, hasKey: function (a, b) {
    return b in a
}, each: function (a, b) {
    if (a)if (UI.isUndefined(a[0]) && !UI.isArray(a))for (var c in a) {
        if (b(a[c], c))break
    } else {
        c = 0;
        for (var g = a.length; c < g && !b(a[c], c); c++);
    }
}, merge: function (a, b) {
    var c = [];
    if (b)return UI.each(b, function (b) {
        UI.has(a, b) || c.push(b)
    }), a.concat(c);
    UI.each(a, function (a) {
        UI.has(c, a) || c.push(a)
    });
    return c
}, clone: function clone(b) {
    var c, g;
    if (null === b || "object" !== typeof b)c = b; else for (g in c = new b.constructor, b)b.hasOwnProperty(g) && (c[g] = clone(b[g]));
    return c
}, ready: function (a) {
    if (UI.ready.done)return a();
    UI.isReady.done ? UI.readyDo.push(a) : (UI.readyDo = [a], UI.isReady())
}, readyDo: [], isReady: function () {
    if (!UI.isReady.done) {
        UI.isReady.done = !0;
        if ("complete" == document.readyState)UI.onReady(); else if (document.addEventListener)if ("interactive" == document.readyState && !UI.B.ie9)UI.onReady(); else document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, !1);
            UI.onReady()
        }, !1); else if (document.attachEvent) {
            var a = top != self;
            a ? document.attachEvent("onreadystatechange", function () {
                "complete" === document.readyState && (document.detachEvent("onreadystatechange", arguments.callee), UI.onReady())
            }) : document.documentElement.doScroll && !a && function () {
                if (!UI.ready.done) {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    UI.onReady()
                }
            }()
        }
        UI.EA(window, "load", UI.onReady)
    }
}, onReady: function () {
    if (!UI.ready.done) {
        UI.ready.done = !0;
        for (var a = 0, b = UI.readyDo.length; a < b; a++)UI.readyDo[a]();
        UI.readyDo = null
    }
}};
UI.B = function () {
    var a = {}, b = navigator.userAgent;
    a.win = a.win || b.hasString("Win32");
    UI.each({win: "Windows", mac: "Mac", ie: "MSIE", ie6: "MSIE 6", ie7: "MSIE 7", ie8: "MSIE 8", ie9: "MSIE 9", safari: "WebKit", webkit: "WebKit", chrome: "Chrome", ipad: "iPad", iphone: "iPhone", os4: "OS 4", os5: "OS 5", os6: "OS 6", qq: "QQBrowser", firefox: "Firefox", tt: "TencentTraveler", opera: "Opera"}, function (c, i) {
        a[i] = b.hasString(c)
    });
    a.ie6 = a.ie6 && !a.ie7 && !a.ie8;
    a.opera = window.opera || a.opera;
    try {
        a.maxthon = window.external && window.external.max_version
    } catch (c) {
    }
    return a
}();
UI.proxyEvent = function () {
    var a = function (a, b, c) {
        var g = 1, i = [], j = [];
        if (UI.isElement(a))for (; a;) {
            g++;
            i.push(a);
            var k = a.className, k = (UI.isString(k) ? k : "").split(" ").join(".");
            j.push(a.nodeName.toLowerCase() + (a.id ? "#" + a.id : "") + (k ? "." + k : ""));
            UI.proxyEventStop || c && g >= c || a === b ? (a = null, UI.proxyEventStop = 0) : a = a.parentNode
        }
        return[j, i]
    }, b = function (a, b, g, i, j, k, p) {
        var h, D, y = b.split("|"), u = 0, v = [];
        2 == y.length && (v = y[1].split("&"));
        y = y[0].split(",");
        !UI.proxyEventStop && !k[b] && (UI.each(y, function (a) {
            if ("*" == a)h = 1; else if (a) {
                h = 0;
                for (var b = j, k = a.split(" "), m = k.length - 1, l = m + p; 0 <= l; l--) {
                    a = g[b];
                    c(a, k[m]) && (D || (D = i[b]), m--);
                    u++;
                    if (0 > m || !a)break;
                    b++
                }
                0 > m && (h = 1)
            }
            if (h)return 1
        }), UI.each(v, function (b) {
            b = b.split("=");
            b[1] && UI.A(a, b[0]) == b[1] || "" == b[1] && UI.A(a, b[0]) || (h = 0)
        }));
        h && D && (D && (h = D), k[b] = 1);
        return h
    }, c = function (a, b) {
        var c = b.match(/[\.#]?[\w|-]+/g), g = 1;
        if (a)return UI.each(c, function (b) {
            var c = b.slice(0, 1);
            if ("." == c) {
                if (c = a.match(/\.[^\.#]+/g), !c || !UI.has(c, b))g = 0
            } else(c = "#" == c ? a.match(/#\w+/g) : a.match(/\w+/g)) && c[0] == b || (g = 0)
        }), g
    };
    UI.isSelector = function (c, g, i) {
        var i = i || 5, j = a(c, null, i), k = {}, q;
        UI.each(j[1], function (a, c) {
            if (q = b(a, g, j[0], j[1], c, k, i))return!0
        });
        return q
    };
    var g, i = {}, j = +new Date, k = j;
    return function (c, l, n, w, x) {
        var q, p;
        if (c) {
            g = UI.A(c, "p_h");
            if (!g || g < k)UI.A(c, "p_h", j), i[j] = {}, j++;
            q = i[UI.A(c, "p_h")];
            if (!q[l]) {
                q[l] = [];
                var h = q[l];
                UI.EA(c, l, function (b) {
                    var g = UI.E(b), i = {}, j = a(g.target, c, 10);
                    UI.each(j[1], function (a, b) {
                        for (var c = 0, k = h.length; c < k; c++) {
                            var l = h[c][1](a, j[0], j[1], b, i);
                            l && h[c][0].call(UI.isElement(l) ? l : a, g)
                        }
                    })
                })
            }
            p = q[l];
            UI.each(w, function (a) {
                p.push([n(a), function (c, g, h, i, j) {
                    return b(c, a, g, h, i, j, x || 5)
                }])
            })
        }
    }
}();
UI.proxyEvent.stop = function () {
    UI.proxyEventStop = 1
};
window.UI_ && UI_();
UI.B.ie && document.execCommand("BackgroundImageCache", !1, !0);
UI._clearCache = [];
UI.clear = function (a) {
    UI._clearCache.push(a)
};
UI.EA(window, "unload", function () {
    for (var a = 0, b = UI._clearCache.length; a < b; a++)UI._clearCache[a]()
});
UI.isMouseMove();
window.define || function (a, b) {
    function c(e) {
        return function (a) {
            return Object.prototype.toString.call(a) === "[object " + e + "]"
        }
    }

    function g(e) {
        e = e.replace(ia, "/");
        for (e = e.replace(t, "$1/"); e.match(ba);)e = e.replace(ba, "/");
        return e
    }

    function i(e) {
        e = g(e);
        ja.test(e) ? e = e.slice(0, -1) : F.test(e) || (e += ".js");
        return e.replace(":80/", "/")
    }

    function j(e, a) {
        return ka.test(e) ? e : la.test(e) ? (a || O).match(A)[0] + e : ma.test(e) ? (O.match(na) || ["/"])[0] + e.substring(1) : H.base + e
    }

    function k(e, a) {
        if (!e)return"";
        var f = e, b = H.alias, f = e = b && P(b[f]) ? b[f] : f, b = H.paths, c;
        if (b && (c = f.match(oa)) && P(b[c[1]]))f = b[c[1]] + c[2];
        c = f;
        var r = H.vars;
        r && -1 < c.indexOf("{") && (c = c.replace(pa, function (e, a) {
            return P(r[a]) ? r[a] : e
        }));
        e = j(c, a);
        c = e = i(e);
        var f = H.map, B = c;
        if (f)for (b = 0; b < f.length && !(B = f[b], B = o(B) ? B(c) || c : c.replace(B[0], B[1]), B !== c); b++);
        return B
    }

    function m(e, a) {
        var f = e.sheet, b;
        if (ca)f && (b = !0); else if (f)try {
            f.cssRules && (b = !0)
        } catch (o) {
            "NS_ERROR_DOM_SECURITY_ERR" === o.name && (b = !0)
        }
        setTimeout(function () {
            b ? a() : m(e, a)
        }, 20)
    }

    function l() {
        if (R)return R;
        if (S && "interactive" === S.readyState)return S;
        for (var e = Q.getElementsByTagName("script"), a = e.length - 1; 0 <= a; a--) {
            var f = e[a];
            if ("interactive" === f.readyState)return S = f
        }
    }

    function n(e) {
        this.uri = e;
        this.dependencies = [];
        this.exports = null;
        this.status = 0
    }

    function w(a, f) {
        if (e(a)) {
            for (var b = [], o = 0; o < a.length; o++)b[o] = w(a[o], f);
            return b
        }
        b = {id: a, refUri: f};
        B("resolve", b);
        return b.uri || k(b.id, f)
    }

    function x(f, b) {
        e(f) || (f = [f]);
        q(f, function () {
            for (var e = [], o = 0; o < f.length; o++)e[o] = v(I[f[o]]);
            b && b.apply(a, e)
        })
    }

    function q(e, a) {
        var b = u(e);
        if (0 === b.length)a(); else {
            B("load", b);
            for (var o = b.length, c = o, r = 0; r < o; r++)(function (e) {
                function b(a) {
                    a || (a = o);
                    var c = u(r.dependencies);
                    0 === c.length ? a() : N(r) ? (c = J, c.push(c[0]), f("Circular dependencies: " + c.join(" -> ")), J.length = 0, a(!0)) : (da[e] = c, q(c, a))
                }

                function o(e) {
                    !e && r.status < W && (r.status = W);
                    0 === --c && a()
                }

                var r = I[e];
                r.dependencies.length ? b(function (a) {
                    function f() {
                        o(a)
                    }

                    r.status < T ? p(e, f) : f()
                }) : r.status < T ? p(e, b) : o()
            })(b[r])
        }
    }

    function p(e, a) {
        function f() {
            delete X[r];
            Y[r] = !0;
            U && (D(e, U), U = b);
            var a, o = V[r];
            for (delete V[r]; a = o.shift();)a()
        }

        I[e].status = qa;
        var c = {uri: e};
        B("fetch", c);
        var r = c.requestUri || e;
        if (Y[r])a(); else if (X[r])V[r].push(a); else {
            X[r] = !0;
            V[r] = [a];
            var g = H.charset;
            B("request", c = {uri: e, requestUri: r, callback: f, charset: g});
            if (!c.requested) {
                var c = c.requestUri, A = ea.test(c), h = K.createElement(A ? "link" : "script");
                if (g && (g = o(g) ? g(c) : g))h.charset = g;
                var i = h;
                A && (ca || !("onload"in i)) ? setTimeout(function () {
                    m(i, f)
                }, 1) : i.onload = i.onerror = i.onreadystatechange = function () {
                    ra.test(i.readyState) && (i.onload = i.onerror = i.onreadystatechange = null, !A && !H.debug && Q.removeChild(i), i = b, f())
                };
                A ? (h.rel = "stylesheet", h.href = c) : (h.async = !0, h.src = c);
                R = h;
                fa ? Q.insertBefore(h, fa) : Q.appendChild(h);
                R = b
            }
        }
    }

    function h(a, c, r) {
        1 === arguments.length && (r = a, a = b);
        if (!e(c) && o(r)) {
            var g = [];
            r.toString().replace(sa, "").replace(ta, function (e, a, f) {
                f && g.push(f)
            });
            c = g
        }
        var A = {id: a, uri: w(a), deps: c, factory: r};
        if (!A.uri && K.attachEvent) {
            var h = l();
            h ? A.uri = h.src : f("Failed to derive: " + r)
        }
        B("define", A);
        A.uri ? D(A.uri, A) : U = A
    }

    function D(e, a) {
        var f = I[e] || (I[e] = new n(e));
        f.status < T && (f.id = a.id || e, f.dependencies = w(a.deps || [], e), f.factory = a.factory, f.factory !== b && (f.status = T))
    }

    function y(e) {
        function a(f) {
            return w(f, e.uri)
        }

        function f(e) {
            return v(I[a(e)])
        }

        if (!e)return null;
        if (e.status >= ga)return e.exports;
        e.status = ga;
        f.resolve = a;
        f.async = function (e, b) {
            x(a(e), b);
            return f
        };
        var c = e.factory, c = o(c) ? c(f, e.exports = {}, e) : c;
        e.exports = c === b ? e.exports : c;
        e.status = ua;
        return e.exports
    }

    function u(e) {
        for (var a = [], f = 0; f < e.length; f++) {
            var b = e[f];
            b && (I[b] || (I[b] = new n(b))).status < W && a.push(b)
        }
        return a
    }

    function v(e) {
        var a = y(e);
        null === a && (!e || !ea.test(e.uri)) && B("error", e);
        return a
    }

    function N(e) {
        var a = da[e.uri] || [];
        if (0 === a.length)return!1;
        J.push(e.uri);
        a:{
            for (e = 0; e < a.length; e++)for (var f = 0; f < J.length; f++)if (J[f] === a[e]) {
                e = !0;
                break a
            }
            e = !1
        }
        if (e) {
            e = J[0];
            for (f = a.length - 1; 0 <= f; f--)if (a[f] === e) {
                a.splice(f, 1);
                break
            }
            return!0
        }
        for (e = 0; e < a.length; e++)if (N(I[a[e]]))return!0;
        J.pop();
        return!1
    }

    function L(e) {
        var a = H.preload, f = a.length;
        f ? x(w(a), function () {
            a.splice(0, f);
            L(e)
        }) : e()
    }

    function E(a) {
        for (var f in a) {
            var b = a[f];
            if (b && "plugins" === f) {
                f = "preload";
                for (var o = [], c = void 0; c = b.shift();)o.push(Z + "plugin-" + c);
                b = o
            }
            if ((o = H[f]) && M(o))for (var r in b)o[r] = b[r]; else e(o) ? b = o.concat(b) : "base" === f && (b = i(j(b + "/"))), H[f] = b
        }
        B("config", a);
        return s
    }

    var z = a.seajs;
    if (!z || !z.version) {
        var s = a.seajs = {version: "2.0.0"}, M = c("Object"), P = c("String"), e = Array.isArray || c("Array"), o = c("Function"), f = s.log = function (e, f) {
            a.console && (f || H.debug) && console[f || (f = "log")] && console[f](e)
        }, r = s.events = {};
        s.on = function (e, a) {
            if (!a)return s;
            (r[e] || (r[e] = [])).push(a);
            return s
        };
        s.off = function (e, a) {
            if (!e && !a)return s.events = r = {}, s;
            var f = r[e];
            if (f)if (a)for (var b = f.length - 1; 0 <= b; b--)f[b] === a && f.splice(b, 1); else delete r[e];
            return s
        };
        var B = s.emit = function (e, a) {
            var f = r[e], b;
            if (f)for (f = f.slice(); b = f.shift();)b(a);
            return s
        }, A = /[^?#]*\//, ia = /\/\.\//g, t = /([^:\/])\/\/+/g, ba = /\/[^/]+\/\.\.\//, F = /\?|\.(?:css|js)$|\/$/, ja = /#$/, oa = /^([^/:]+)(\/.+)$/, pa = /{([^{]+)}/g, ka = /^\/\/.|:\//, la = /^\./, ma = /^\//, na = /^.*?\/\/.*?\//, K = document, C = location, O = C.href.match(A)[0], G = K.getElementsByTagName("script"), G = K.getElementById("seajsnode") || G[G.length - 1], Z = ((G.hasAttribute ? G.src : G.getAttribute("src", 4)).match(A) || "")[0] || O;
        s.cwd = function (e) {
            return e ? O = g(e + "/") : O
        };
        s.dir = Z;
        var Q = K.getElementsByTagName("head")[0] || K.documentElement, fa = Q.getElementsByTagName("base")[0], ea = /\.css(?:\?|$)/i, ra = /^(?:loaded|complete|undefined)$/, R, S, ca = 536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"), ta = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, sa = /\\\\/g, I = s.cache = {}, U, X = {}, Y = {}, V = {}, da = {}, qa = 1, T = 2, W = 3, ga = 4, ua = 5;
        n.prototype.destroy = function () {
            delete I[this.uri];
            delete Y[this.uri]
        };
        var J = [];
        s.use = function (e, a) {
            L(function () {
                x(w(e), a)
            });
            return s
        };
        n.load = x;
        s.resolve = k;
        a.define = h;
        s.require = function (e) {
            return(I[k(e)] || {}).exports
        };
        var $ = Z, ha = $.match(/^(.+?\/)(?:seajs\/)+(?:\d[^/]+\/)?$/);
        ha && ($ = ha[1]);
        var H = E.data = {base: $, charset: "utf-8", preload: []};
        s.config = E;
        var aa, C = C.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"), C = C + (" " + K.cookie);
        C.replace(/seajs-(\w+)=1/g, function (e, a) {
            (aa || (aa = [])).push(a)
        });
        E({plugins: aa});
        C = G.getAttribute("data-config");
        G = G.getAttribute("data-main");
        C && H.preload.push(C);
        G && s.use(G);
        if (z && z.args) {
            G = ["define", "config", "use"];
            z = z.args;
            for (C = 0; C < z.length; C += 2)s[G[z[C]]].apply(s, z[C + 1])
        }
    }
}(this);
(function () {
    var a = UI.G, b = UI.GC;
    if (!window.MIApp || window.MIApp.lib)window.$ = UI.G, window.$$ = UI.GC;
    window._ || (window._ = function (e) {
        if (1 == arguments.length)return e;
        var a = Array.prototype.slice.call(arguments, 1);
        return e.replace(/\{(\d+)\}/g, function (e, b) {
            return a[b]
        })
    });
    var c = !UI.parseUrl().jsDebug;
    c && (onerror = function (e, a, f) {
        if ((window.MIApiId || MI.api.type) < 1E3 && document.domain == "qq.com") {
            if (UI.B.ie)for (var b = arguments.callee.caller.caller, c, g = []; b;) {
                c = b;
                g.push(c.toString().replace(/function/g, "F").substring(0, 80));
                b = b.caller
            }
            b = navigator.userAgent;
            g = {name: "btnOnerror", iBak1: f || "", sText: g ? g.join("") : "", sBak1: encodeURIComponent(e || ""), sBak2: b, id: 1210};
            c = UI.json2str(g);
            if (!MI.Error[c] && !b.hasString("MetaSr") && !b.hasString("LBBROWSER")) {
                MI.Bos(g);
                MI.Error[c] = 1
            }
        }
        if (!MI.user.isLab && MI.hostType)return true
    });
    String.prototype.toTitle = function () {
        return this.replace(/\r/g, "").replace(/\n/g, "").replace(/\'/g, "&#39;").replace(/\"/g, "&#34;").replace(/</g, "&#60;").replace(/>/g, "&#62;")
    };
    try {
        document.domain = "qq.com"
    } catch (g) {
    }
    if (window.MI) {
        var i = MI;
        window.MI_ = function () {
            for (var e in i)MI[e] || (MI[e] = i[e])
        }
    }
    var j = MI = {time: null, user: {account: "", name: "", fun: {}}, string: {length: function (e) {
        var a = (e || "").match(/[^\x00-\x80]/g);
        return e.length + (a ? a.length : 0)
    }, escape: function (e) {
        return MI.string.html(e).replace(/'/g, "\\'")
    }, escapeReg: function (e) {
        for (var a = [], f = 0; f < e.length; f++) {
            var b = e.charAt(f);
            switch (b) {
                case ".":
                case "$":
                case "^":
                case "{":
                case "[":
                case "(":
                case "|":
                case ")":
                case "*":
                case "+":
                case "?":
                case "\\":
                    a.push("\\x" + b.charCodeAt(0).toString(16).toUpperCase());
                    break;
                default:
                    a.push(b)
            }
        }
        return a.join("")
    }, html: function (e) {
        var e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), a = e.replace(/\/\*(\s|.)*?\*\//g, "");
        a.match(/expression/g) && (e = a.replace(/expression/g, "expressio n"));
        return e
    }, cut: function (e, a, f) {
        var f = UI.isUndefined(f) ? "..." : f, b = [], c = "";
        if (MI.string.length(e) > a) {
            e = e.split("");
            UI.each(e, function (e) {
                if (a > 0) {
                    b.push(e);
                    a = a - MI.string.length(e)
                } else return 1
            });
            c = b.join("") + f
        } else c = e;
        return c
    }, id: function (e) {
        var e = e || "", a;
        if ((a = e.match(/[?#&]account=([^&]+)($|&)/)) && a[1])a = a[1]; else if (a = e.match(/[\w-]{9,99}/g))a = a[a.length - 1]; else(a = e.match(/[^\/]+$/g)) && (a = a[0]);
        return(a || "").replace("#M", "").split("?")[0]
    }, account: function (e) {
        return(e = (e || "").match(/@[^@]+$/g)) && e[0] ? e[0].slice(1, -1) : ""
    }, parseInt: function (e) {
        var a = "";
        if (UI.isNumber(e))a = e; else if (UI.isString(e))(a = (a = e.match(/([0-9]{5,})($|\D)/)) && a[1]) || (a = e.replace(/\D/g, ""));
        return a
    }, sprintf: function () {
        var e = arguments, a = e[0] || "", f, b;
        f = 1;
        for (b = e.length; f < b; f++)a = a.replace(/%s/, e[f]);
        return a
    }, entityReplace: function (e) {
        return e.replace(/&#38;?/g, "&amp;").replace(/&amp;/g, "&").replace(/&#(\d+);?/g,function (e, a) {
            return String.fromCharCode(a)
        }).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#13;/g, "\n").replace(/(&#10;)|(&#x\w*;)/g, "").replace(/&amp;/g, "&")
    }}, html: {button: function (e, a, f) {
        if (!MI.html.buttonId)MI.html.buttonId = MI.random();
        MI.html.buttonId++;
        var b = "btn_" + MI.html.buttonId;
        return'<label class="' + (a ? a + " " : "") + 'gb_btn" for="' + b + '"><input id="' + b + '" type="button" value="' + (e || "") + '" class="' + (f ? f + " " : "") + 't" /></label>'
    }}, number: {format: function (e) {
        return(e + "").replace(/(?=(?!\b)(?:\w{3})+$)/g, ",")
    }}, random: function (e) {
        return parseInt((new Date).getTime() / (e || 1))
    }, drop: {}, delay: {}, validate: {}, canvas: {}, focus: function (e) {
        if (e) {
            var a, f = e.nodeName;
            try {
                e.focus();
                if (f == "INPUT" || f == "TEXTAREA") {
                    a = e.value.length;
                    MI.selectTxt(e, a, a, a)
                }
            } catch (b) {
            }
        }
    }, blur: function () {
        this.blur()
    }, click: function () {
        return false
    }, cancelBubble: function (e) {
        UI.E(e).stop()
    }, hideFocus: function () {
        UI.A(this, "hideFocus", "true");
        this.onmouseover = null
    }, boss: null, ajaxTimes: 0, talkNew: [], talkMore: [], host: "", hostType: 0, crs: [], quickLogin: null, newQucikLogin: function () {
        MI.app("utils/login", function (e) {
            e()
        })
    }, json: function (e) {
        e = UI.json(e);
        e.result == -1E3 ? MI.user.fun.apiNoMove = 1 : e.result == -1 && (MI.quickLogin ? MI.quickLogin() : MI.newQucikLogin());
        return e
    }, music: {info: "", state: null, box: ""}, tmpl: {picTool: ['<div class="tl_tools bor_bg picTools"><a href="$Url/2000" class="btnOriginal" target="_blank"><i class="ic ic_tool_zoomIn"></i>', _("查看大图"), '</a><a href="#" class="btnBack"><i class="ic ic_tool_rtl"></i>', _("向左"), '</a><a href="#" class="btnPrev"><i class="ic ic_tool_rtr"></i>', _("向右"), '</a><a href="$hisUrl" boss="btn_pic_getMore" class="btnMore" target="_blank"><i class="ic ic_tool_album"></i>$Gender' + _("的相册") + '</a><a href="#" codeUrl="$codeUrl" class="btnMobile" style="display:none;"><i class="ic ic_tool_qrcode"></i>存到手机</a></div>'].join(""), reply: ['<div class="talkWrap bgr3 dialogPics" style="overflow:visible"><div class="SA"><em>◆</em><span>◆</span></div>\t<div class="top c_tx5"><span class="left"><span class="number cNote"></span><span class="replyTitle"></span><span class="addReply"></span></span><a href="#" class="close" title="', _("关闭"), '">', _("关闭"), '</a>\t</div>\t<div class="cont"><textarea class="inputTxt"></textarea><div class="sendStatus clear"></div></div>\t<div class="bot"><div class="insertFun"><div class="sendList insertFace"><a class="txt" href="#" title="', _("表情"), '"><em class="sico ico_face"></em></a></div><div class="sendList atSome"><a class="txt" href="#" title="', _("@朋友帐号就可以提到他"), '"><em class="sico ico_at"></em>', _("朋友"), '</a></div><div class="sendList newTopic"><a href="#" class="creatNew txt" title="', _("汇聚相同热点的广播"), '" tabindex="3"><em class="sico ico_topic"></em>', _("话题"), '</a></div><div class="sendList uploadPic" style="display:none"><a href="#" class="txt sendPic" tabindex="3" title="', _("支持jpg、jpeg、gif、png格式，文件小于5M"), '"><em class="sico ico_pic"></em></a></div><div class="sendList uploadPic" style="display:none"><form target="retweetPic" method="post" enctype="multipart/form-data" class="sPicForm"><a href="javascript:;" class="txt sendPic"><em class="sico ico_pic"></em><input class="filePrew" name="pic" type="file" size="3" title="', _("支持jpg、jpeg、gif、png格式，文件小于5M"), '" tabindex="3"/></a></form></div><div class="sendList keyWords schBrace" style="display:none"><a class="txt" title="分享你的兴趣、关注点" href="#" boss="btnWideKeyWord"><em class="sico ic_keyword"></em>关键词</a></div></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><a hrer="#" class="autoBackspace" style="display:none">', _("[自动缩减]"), '</a><span class="countTxt c_tx5"></span>\t</div>\t<div class="talkSuc c_tx5" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div>\t<iframe class="retweetPicIfr" id="retweetPic" name="retweetPic" src="about:blank" style="display:none"></iframe></div>'].join("")}, selectTxt: function (e, a, f) {
        var b;
        try {
            if (document.createRange)e.setSelectionRange(a, f); else {
                b = e.createTextRange();
                b.collapse(1);
                b.moveStart("character", a);
                b.moveEnd("character", f - a);
                b.select()
            }
        } catch (c) {
        }
    }, getSelectTxt: function (e) {
        var a = MI.cursorX(e), f = 0, b = "";
        if (document.selection) {
            b = document.selection.createRange().text;
            f = a + b.length
        } else {
            f = e.selectionEnd;
            b = e.value.substring(a, f)
        }
        return{start: a, end: f, txt: b}
    }, insertTxt: function (e, a, f, b) {
        var c, g = false;
        b == void 0 && (b = 0);
        e.focus();
        if (document.selection) {
            c = document.selection.createRange();
            if (c.parentElement() === e) {
                c.moveStart("character", -b);
                c.text = a;
                g = true
            }
        }
        if (!g) {
            c = e.value;
            cursor = f + a.length - b;
            e.value = c.substring(0, f - b) + a + c.substring(f, c.length);
            MI.selectTxt(e, cursor, cursor, cursor)
        }
    }, cursorX: function (e) {
        if (document.selection) {
            var a = document.selection.createRange(), f = 0;
            a.moveStart("character", -e.value.length);
            e = a.text.split("");
            a = document.selection.createRange().text;
            return f = e[e.length - 1].replace(/\r/g, "").length - a.length
        }
        return e.selectionStart
    }, countNum: function (e, a, f) {
        if (e && e && !e.innerHTML.hasString(_("超过"))) {
            var b = e.innerHTML.replace(/\D/g, "") || 0, b = f ? MI.number.format(parseInt(b.replace(/,/g, "")) + a) : parseInt(b) + a;
            e.innerHTML = b < 0 ? 0 : b
        }
    }, countTxt: function (e, a, f, b) {
        f == null && (f = 1);
        var c = MI.string.length(e), g, h = 0, i = 0, j = e.match(RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi")) || [];
        if (!f)c = e.length;
        if (b != 140 || c < 1E3) {
            a && UI.each(j, function (a) {
                e = e.replace(a, "_");
                i++;
                g = a.length;
                g > 256 && (h = h + (g - 256))
            });
            a = UI.trim(e).replace(RegExp(_("#输入话题标题#"), "g"), "");
            c = Math.ceil((MI.string.length(a) + i * 20 + h) / 2);
            f || (c = a.length + i * 20 + h)
        }
        return c
    }, fC: {numFormat: [], num: []}, sFollowTip: [_("添加到特别收听"), _("取消特别收听")], proxyEvent: UI.proxyEvent, newCountNum: 0, newCountFirst: 1, newCount: function (e, a, b, c) {
        MI.app("NewMsgBox", function () {
            MI._newCount && MI._newCount(e, a, b, c)
        })
    }, cPlayer: {}, bottomFix: 0, report: function (e) {
        e && e.match(/[^\d]/g) ? jubao_user(e) : jubao_msg(e)
    }, relay: function (e, a, b, c, g, h) {
        var i = {}, t;
        if (a)if (UI.isString(a))i.content = a; else if (UI.isElement(a))i.tweetDom = a;
        if (b)i.title = b;
        if (c)i.pref = c;
        if (g) {
            i.config = g;
            t = g.type
        }
        if (h)i.focusLast = 1;
        return MI.TalkBox.showBox(e, t || 1, i)
    }, relayMsg: function (e, a, b, c, g, h, i, t) {
        b = {title: b, talkToTip: c, originPos: g, pref: h, config: i, focusLast: t, hasOrigin: true};
        if (a)if (UI.isString(a))b.content = a; else if (UI.isElement(a))b.tweetDom = a;
        return MI.TalkBox.showBox(e, 1, b)
    }, comment: function (e, a, b, c, g) {
        g ? g.type = 4 : g = {type: 4};
        MI.relay(e, a, b, c, g)
    }, picError: function (e) {
        var a = e.src || "", b = /\/\/t[\d]/;
        (a.hasString("qlogo.cn") || a.hasString("qpic.cn")) && a.match(b) && MI.Bos({name: "btnOnerrorPic", sBak1: e.src, id: 1210});
        e.onerror = null
    }, picErrorReloaded: function (e) {
        MI.Bos({name: "btnOnerrorPicReloaded", id: 1210});
        UI.ER(UI.E(e).target, "load", MI.picErrorReloaded)
    }, scrollHack: function (e) {
        return e.getBoundingClientRect ? 0 : UI.scrollY(e) - UI.scrollY() * (UI.B.safari && !UI.B.ipad ? 2 : 1)
    }, ajax: function (e, a) {
        var b = "_ajaxProxy_", c = "_ajax_", g = "_ajaxXhr_", h = "http://" + document.location.host, i = h, t, j = UI.isObject(e);
        if (j) {
            if (e.url) {
                if (MI.user.fun.apiNoMove) {
                    t = /http:\/\/api1.t.qq.com/g;
                    if (e.url.match(t))
                        e.url = e.url.replace(t, MI.api.host)
                }
                (t = e.url.match(/(http:\/\/)+([^\/]+)/i)) && t[0] && (i = t[0])
            }
            e.data = e.data || "";
            if (MI.api.type) {
                t = MI.random();
                var F = MI.api.type, k = MI.api.host;
                if (UI.isObject(e.data)) {
                    if (!e.data.apiType) {
                        e.data.apiType = F;
                        e.data.apiHost = k
                    }
                    e.type == "get" && (e.data._r = t)
                } else if (UI.isString(e.data)) {
                    if (!e.data.hasString("apiType")) {
                        e.data = e.data + ("&apiType=" + F);
                        e.data = e.data + ("&apiHost=" + k)
                    }
                    if (e.type == "get")
                        e.data = e.data + ("&_r=" + t)
                }
            }
            t = MI.token();
            if (UI.isObject(e.data) && !e.data.g_tk)
                e.data.g_tk = t;
            else if (UI.isString(e.data) && !e.data.hasString("g_tk"))
                e.data = e.data + ("&g_tk=" + t);
            if (i.hasString(h))
                return UI.ajax(e)
        } else
            UI.isString(e) && (i = "http://" + e.replace(c, ""));
        h = i.replace("http://", "");
        b = b + h;
        g = g + h;
        c = c + h;
        UI.isString(e) && (c = e);
        MI[c] || (MI[c] = []);
        if (MI[b]) {
            if (MI[g]) {
                if (MI[c].length && !a) {
                    UI.each(MI[c], function (e) {
                        MI.ajax(e, true)
                    });
                }
                else {
                    if (e && j) {
                        MI[c] = [];
                        if (e.url && e.url.hasString(i)) {
                            try {
                                e.xhr = MI[b].contentWindow.xmlHttp()
                            } catch (l) {
                                g = /api[\d].t.qq.com/g;
                                if (e.url.match(g)) {
                                    e.url = e.url.replace(g, "api.t.qq.com");
                                    MI.ajax(e, true)
                                }
                                return
                            }
                            e.refer = document.location.href
                        }
                        return UI.ajax(e)
                    }
                }
            }
            else {
                j && MI[c].push(e);
            }
        }
        else {
            j && MI[c].push(e);
            j = "ajaxProxy" + MI.random();
            MI[b] = UI.html('<iframe id="' + j + '" name="' + j + '" src="' + i + '/proxy.html" style="display:none" onload="setTimeout(function(){MI[\'' + g + "'] = 1;MI.ajax('" + c + "');},50);\"></iframe>")[0];
            UI.ready(function () {
                UI.append(MI[b], document.body)
            })
        }
        return {abort: function () {
            for (var a = 0, b = MI[c].length; a < b; a++)
                if (MI[c][a] == e) {
                    MI[c].splice(a, 1);
                    break
                }
        }}
    }, layoutFix: "", api: {host: "http://" + (window.MIAPIHost || "api.t.qq.com"), type: 0, version: "", source: null, base: "http://mat1.gtimg.com/www/mb/", boss: null}, define: function (e, a, b) {
        var c = arguments.length, g = "", h = null, i = null;
        if (!c || c && !UI.isString(arguments[0]) || c == 1)return false;
        g = e;
        if (c == 2)i = arguments[1]; else if (c == 3)if (UI.isArray(arguments[1])) {
            h = arguments[1];
            UI.isFunction(arguments[2]) && (i = arguments[2])
        } else return false;
        if (!h || !h.length)MI[g] = UI.isFunction(i) ? i.apply(this, []) : i; else {
            MI[g] = function () {
            };
            MI[g].__depens__ = 1;
            MI.app(h, function () {
                for (var e = [], a = MI._appMultiCall, b = 0; b < h.length; b++)e.push(a[h[b]]);
                MI[g] = i.apply(this, e);
                MI.appLoadDo(g)
            })
        }
    }, app: function (e, a) {
        var b = {};
        if (UI.isString(e)) {
            b[e] = a;
            MI.app(b)
        } else if (UI.isArray(e))if (e.length == 1) {
            b[e[0]] = a;
            MI.app(b)
        } else {
            var c = function (a) {
                for (var b = MI._appMultiCall, f = [], c = 0; c < e.length; c++)f.push(b[e[c]]);
                a.apply(this, f)
            }, a = a || function () {
            };
            UI.each(e, function (e) {
                var a = {};
                a[e] = function () {
                };
                MI.app(a)
            });
            var g = 600, h = setInterval(function () {
                var b = 0;
                g--;
                if (g) {
                    for (var f in e)MI._appMuduleStatus[e[f]] || (b = 1);
                    if (!b) {
                        clearInterval(h);
                        c(a)
                    }
                } else clearInterval(h)
            }, 100)
        } else if (UI.isObject(e))for (var i in e)if (b = MI[i] || UI[i]) {
            if (UI.isFunction(e[i]))e[i](b)
        } else if (MI._appLoad[i])MI._appLoad[i].push(e[i]); else {
            MI._app[i] = e[i];
            MI._appLoad[i] = [];
            MI.appLoaded && MI.appLoad(e)
        }
    }, _appMultiCall: {}, _appMuduleStatus: {}, _appHost: ["mat1.gtimg.com/www", "mat1.t.qq.com/mb/mat1", "www.qq.com/mb/mat1"], _appHostType: 0, _app: {}, _appLoad: {}, _appLoading: {}, appLoad: function (e) {
        var a, b;
        for (b in e || MI._app) {
            UI.isArray(e) && (b = e[b]);
            if (MI.version[b])if (MI[b]) {
                if (MI._app[b]) {
                    if (UI.isFunction(MI._app[b]))MI._app[b](MI[b] || UI[b]);
                    MI._appLoad[b] = MI._app[b] = null
                }
            } else {
                if (!MI._appLoading[b]) {
                    setTimeout(function (e) {
                        return function () {
                            UI.getScript(MI.version[e], function () {
                                MI._appMuduleStatus[e] = 1;
                                MI.appLoadDo(e)
                            }, "utf-8");
                            MI.api.type < 1E3 && MI.version[e] == MI.version._auto[e] && MI.Bos({name: "btnOnerrorJsFileAutoSuccess", sBak1: e, id: 1210})
                        }
                    }(b), 20);
                    (a = MI.version[b.slice(0, 1).toLocaleLowerCase() + b.slice(1)]) && a.match(/\.css$/g) && UI.getCss(a);
                    a = 0;
                    MI._appLoading[b] = 1
                }
            } else MI._appMuduleStatus[b] = 1
        }
        MI.appLoaded = 1
    }, appLoadDo: function (e) {
        var a = MI[e] || UI[e];
        MI._appMultiCall[e] = a || null;
        if (a) {
            if (!a.__depens__) {
                if (UI.isFunction(MI._app[e]))MI._app[e](a);
                MI._appLoad[e] && UI.each(MI._appLoad[e], function (e) {
                    UI.isFunction(e) && e(a)
                });
                MI._appLoad[e] = MI._app[e] = null
            }
            MI.api.type < 1E3 && MI.version[e] == MI.version._auto[e] && MI.Bos({name: "btnOnerrorJsFileAuto", sBak1: e, id: 1210})
        } else if (c) {
            var b = MI._appHost, g = "", h = "", i = MI.version[e], j, t, k = {};
            if (i) {
                if (i.hasString(b[0])) {
                    j = b[0];
                    t = b[1];
                    g = "btnOnerrorJsFile";
                    h = "btnOnerrorJsFileReloadSuccess"
                } else if (i.hasString(b[1])) {
                    j = b[1];
                    t = b[2];
                    g = "btnOnerrorJsFileReload";
                    h = "btnOnerrorJsFileReloadSuccess2"
                } else i.hasString(b[2]) && (g = "btnOnerrorJsFile2");
                if (t) {
                    MI.version[e] = i.replace(j, t);
                    k[e] = function () {
                        MI.api.type < 1E3 && MI.Bos({name: h, sBak1: MI.version[e], sBak2: MI.user.account || "", id: 1210});
                        if (MI.isS) {
                            var a = MI.json(MI.S({name: "option_load_js", isCross: false}));
                            a[e] = [MI.version._js[e], t];
                            MI.S({name: "option_load_js", value: UI.json2str(a), isCross: false})
                        }
                    };
                    MI._appLoading[e] = 0;
                    MI._appLoad[e] && MI._appLoad[e].push(k[e]);
                    MI.appLoad(k)
                }
            }
            MI.api.type < 1E3 && MI.Bos({name: g, sBak1: i, sBak2: MI.user.account || "", id: 1210})
        }
    }, appLoaded: 0, config: function (e) {
        e.mi && UI.each(e.mi, function (e, a) {
            UI.each(e, function (e) {
                var b = e.split("."), c = b[0], o = b[1], b = function () {
                    var b = arguments;
                    MI.app(a, function (a) {
                        UI.isFunction(a) && (o ? MI[c][o] = a : MI[e] = a);
                        o ? MI[c][o].apply(MI[c], b) : MI[e].apply(this, b)
                    })
                };
                o ? MI[c][o] = b : MI[e] = b
            })
        })
    }, dialog: {}, tips: {}, GoTop: {}, Card: {}, App: {}, FollowBtn: {}, sidePanel: {}}, k = MI.api.base, m = {ui: {DatePicker: "110906", ColorPicker: "110107"}, mi: {}}, l = {ui: {datePicker: "121106", colorPicker: "101228"}, mi: {base: "130226", wide: "130226", apollo: "130320", talkListShare: "120221", mood: "130204", picList: "120912", itemSelect: "120305", message: "120704", picViewer: "130425"}}, n = {}, w = {City: 1, CityAll: 1}, x = {_js: {}, _css: {}, _auto: {}}, q;
    for (q in m)for (var p in m[q])m[q][p].hasString(":") ? x[p] = m[q][p] : (x[p] = k + "js/" + (p.hasString("/") ? "" : q + ".") + p + (n[p] ? ".lab" : "") + (w[p] && window.MILang ? "." + window.MILang : "") + "_" + m[q][p] + ".js", x._js[p] = m[q][p]);
    for (q in l)for (p in l[q])x[p] = k + "css/" + q + "." + p + (n[p] ? ".lab" : "") + "_" + l[q][p] + ".css", x._css[p] = l[q][p];
    j.version = x;
    MI.versionSet = function (e) {
        for (var a in e) {
            var b = MI.version[a], c;
            if (a.slice(0, 1) == "_") {
                b = a.slice(1);
                c = MI.swf[b];
                MI.swf[b] = c ? c.replace(/_\w+/g, "_" + e[a]) : MI.api.base + "swf/" + b + "_" + e[a] + ".swf"
            } else if (e[a].hasString(":"))MI.version[a] = e[a]; else if (e[a]) {
                if (b) {
                    c = b.split("_");
                    if (c.length == 3) {
                        b = c[0] + "_" + c[1];
                        c = c[2]
                    } else {
                        b = c[0];
                        c = c[1]
                    }
                    MI.version[a] = b + "_" + e[a] + "." + c.match(/\.\w+$/g)[0].slice(1)
                } else MI.version[a] = MI.api.base + "js/" + (a.hasString("/") ? a : "mi." + a) + "_" + e[a] + ".js";
                MI.version._js[a] = e[a]
            } else delete MI.version[a];
            b = MI.version[a];
            if (window.seajs && b) {
                c = {};
                c[a] = b;
                seajs.config({alias: c})
            }
        }
    };
    j = MI;
    k = function () {
        return MI.api.base + "img/p1/head_normal_"
    };
    k = {h: k(), h20: k() + "20.png", h30: k() + "30.png", h40: k() + "40.png", h50: k() + "50.png", h80: k() + "80.png", h100: k() + "100.png", h120: k() + "120.png", h180: k() + "180.png"};
    j.picSrc = k;
    MI.focusDropList = function (e, a) {
        e.onfocus = function () {
            UI.show(a)
        }
    };
    MI.swf = {};
    var j = MI, h = "", D = "http://api1.t.qq.com";
    MI.api.host && (h = MI.api.host + MI.api.version);
    window.MIApiHost && (h = MIApiHost, MI.api.host = MIApiHost);
    MI.user.fun.apiNoMove && (D = h);
    location.href.match(/^https?:\/\/qun\.t\.qq\.com/i);
    setTimeout(function () {
        if (MI.user.fun.wideStyle)MI.url.userCard = MI.url.userCard.replace(h, D)
    }, 0);
    j.url = {t: h + "/old/message.php", mySidebar: h + "/asyn/mysidebar.php", mySidebarNew: h + "/asyn/mysidebar_n_new.php", userSidebar: h + "/asyn/usersidebar.php", similarUser: h + "/asyn/samiliarRecStars.php", recommend: h + "/recommend.json?_v=1.0", recommendGet: h + "/recommend/get.json?", relations: h + "/relations?_v=1.0", recommendBlock: h + "/recommend/block.json?_v=1.0", relationsIdol: h + "/relations/idol_follow.json?_v=1.0", birthdayGet: h + "/recommend/friends_birthday.json", tag: h + "/asyn/tag_oper.php", topNavApp: h + "/asyn/topNavApp.php", topNavGroup: h + "/asyn/myWQNavJson.php", htmlContent: h + "/asyn/getHtmlContent.php", viewSet: h + "/asyn/myViewSetting.php", thirdappshield: h + "/asyn/thirdappshield.php", recommendAdd: h + "/recommend/add.json?", homeBitSet: h + "/asyn/homeBitSet.php", fansList: h + "/friends/follower.json", lastYearToday: h + "/msg/lytNextMsg.json", getWidget: h + "/side/get.json", missTalkGuide: h + "/missedSurprise", closeMissTalkGuide: h + "/mcop?type=1&op=1", getWidgetConfig: h + "/side/getAppConfig.json", setWidgetConfig: h + "/side/setAppConfig.json", delWidgetConfig: h + "/side/delAppConfig.json", addWidgetConfig: h + "/side/addAppConfig.json", list: h + "/asyn/mylist.php", listGet: h + "/asyn/getList.php", listAdd: h + "/asyn/createlist.php", listEdit: h + "/asyn/editlist.php", listDel: h + "/asyn/dellist.php", listFollow: h + "/asyn/list.php", listJoin: h + "/asyn/joinlist.php", listJoins: h + "/asyn/joinlists.php", listExit: h + "/asyn/exitlist.php", otherSave: h + "/asyn/others_save.php", listCnt: h + "/asyn/listcnt.php", validateVideo: h + "/asyn/validvideo.php", uploadSearchPic: h + "/asyn/searchpic.php", uploadUrlPic: "http://upload.t.qq.com/old/uploadextpic.php", uploadOrder: h + "/asyn/richMsgOp.php", musicPlayUrl: h + "/asyn/musicPlayUrl.php", vote: h + "/vote/vote.php", newvote: "http://vote.t.qq.com/createVote.php", talkPublish: h + "/old/publish.php", at: h + "/asyn/nicktips.php", topic: h + "/asyn/topicSuggest.php", relativeTopics: h + "/asyn/relativeTopics.php", topic: h + "/asyn/relativeTopics.php", notice: h + "/asyn/notice.php", MoodList: h + "/asyn/userEmotionStatistics.php", getAvatar: h + "/user/gets.json?_v=1.1", talkDel: h + "/old/delete.php", talkFavor: h + "/asyn/favoritemsg.php", talkUpTop: h + "/asyn/myTopTweet.php", talkShield: h + "/asyn/blockAtMsg.php", favGroup: h + "/asyn/favoritemsggroup.php", newCount: "http://message.t.qq.com/newMsgCount.php", newly: h + "/asyn/home.php", relayList: h + "/old/message_relay_frame.php", relayListAt: h + "/asyn/atMessageFrame.php", relayListSecond: h + "/old/message_relay_second.php", urlPreview: h + "/asyn/urlpreview.php", praiseReply: h + "/asyn/praiseReply.php", shareQzone: h + "/share/shareQzone.php", shareMail: h + "/mail/mailShare.php", shareMailActive: h + "/mail/mailActive.php", shareMailList: h + "/mail/mailist.php", shareQQ: h + "/share/shareMsg.php", shareQQList: h + "/share/qqList.php", translate: h + "/asyn/translate.php", urlDetail: h + "/asyn/urldetail.php", reportSpam: h + "/asyn/reportSpam.php", reportRead: h + "/report", readList: h + "/asyn/getUserMiniList.php", delReadList: h + "/asyn/delMiniUser.php", like: h + "/msg/setLike.php", allMyList: h + "/asyn/allmylist.php", qunList: h + "/asyn/myWQjson.php", mySidebar: h + "/asyn/mysidebar.php", myAtSet: h + "/asyn/myAtSettingSave.php", inboxSend: h + "/inbox/send.php", historyFace: h + "/old/historyFace.php", syncQzoneSet: h + "/asyn/userSyncSetting.php", userBit: h + "/asyn/userBitAttrSave.php", userAttr: h + "/asyn/userAttrSave.php", userRelation: D + "/asyn/userRelation.php", follow: h + "/old/follow.php", unfollow: h + "/old/unfollow.php", sFollow: h + "/asyn/group_oper.php", block: h + "/asyn/block.php", unblock: h + "/asyn/unblock.php", bkName: h + "/asyn/bkName_oper.php", topicFollow: h + "/asyn/topic.php", searchFeed: h + "/asyn/messageSearch.php", signList: h + "/asyn/signList.php", friendSigns: h + "/asyn/friendSigns.php", topicInfo: h + "/asyn/topicInfo.php", medal: h + "/asyn/medalpoint.php", shop: h + "/asyn/shoppoint.php", medals: h + "/medal/list.json", searchList: h + "/asyn/searchBoxList.php", userCard: h + "/asyn/userCard.php", uRela: h + "/recommend/same_listener.php", message: h + "/messages/send.php", comm: h + "/asyn/comm.php", urlDetail: h + "/asyn/urldetail.php", smartBox: h + "/asyn/messagetips.php", reportSpam: h + "/asyn/reportSpam.php", chatStat: h + "/chat/updateChatStat.php", recommendStat: h + "/asyn/recommendStat.php", userTips: h + "/asyn/userTips.php", taskUrl: h + "/asyn/taskInfo.php", taskSubscribe: h + "/asyn/taskSubscribe", userAttrSave: h + "/asyn/userAttrSave.php", myViewSettingSave: h + "/asyn/myViewSettingSave.php", ajaxTips: h + "/asyn/getExtTipsInfo.php", userFriends: h + "/asyn/userFriends.json", getPresentInfo: h + "/asyn/getPresentInfo.php", topMenuApps: h + "/asyn/topMenuApps.php", topMenuWQ: h + "/asyn/topMenuWQ.php", micrTpcTl: h + "/mictopic/getMicTopic.php", micrTpcCate: h + "/mictopic/getMicCategory.php", micrTpcList: h + "/mictopic/getMicCategoryTopic.php", micrTpcCollect: h + "/mictopic/collectMessage.php", micrTpcTl2: h + "/asyn/subjectOperation.php", rtPicMsgs: h + "/asyn/messageRtpic.php", getMsg: h + "/msg/getmsg.php", updateTips: D + "/asyn/updateTips.php", exceptionShow: h + "/asyn/exceptionShow.php", getPRCode: h + "/asyn/getPRCode.php", killnoreply: "http://p.t.qq.com/asyn/killnoreply.php", applyDownload: "http://file.t.qq.com/air/applyDownload.php", applyDownloadXF: "http://file.t.qq.com/air/offline_linkinfo.php", olympicCollect: "http://c.t.qq.com/asyn/selectedPersonalCategoryInfo.php", collectMessage: "http://c.t.qq.com/asyn/selectedPersonalMessage.php", uploadGrabPic: "http://upload.t.qq.com/asyn/uploadpicCommon.php", uploadPic: "/asyn/uploadpic.php", weixinInfo: "http://p.t.qq.com/innerapi/asyncinfo/weixininfo"};
    MI.token = function (a) {
        for (var b = 5381, f = UI.cookie("p_skey") || UI.cookie("skey") || UI.cookie("lskey") || "", c = 0, g = f.length; c < g; ++c)b = b + ((b << 5) + f.charCodeAt(c));
        b = f ? b & 2147483647 : "";
        return a ? a + (a.hasString("?") ? "&" : "?") + "g_tk=" + b : b
    };
    MI.pageSpeed = function () {
        UI.EA(window, "load", function () {
            if (window.QosS) {
                var a = QosS.t;
                a[5] = +new Date;
                MI.Speed(QosS.site, 0.1, a[1] - a[0], a[5] - a[0], a[2] - a[0], a[3] - a[0], a[4] - a[0])
            }
        })
    };
    var j = MI, y = [], u = 0, v, N, k = function (e, b) {
        var f = true;
        if (UI.isFunction(e)) {
            f = e;
            u ? f() : y.push(f)
        } else {
            if (UI.isObject(e)) {
                f = UI.isUndefined(e.isCross) ? true : e.isCross;
                b = e.value;
                e = e.name
            }
            var c = a("sIframeProxy"), g = c && f && u ? c.contentWindow : window;
            try {
                if (g.localStorage)if (b != void 0)g.localStorage[e] = b; else return g.localStorage[e] || ""; else if (UI.B.ie) {
                    if (!v) {
                        v = g.document.createElement("div");
                        v.innerHTML = '<input style="display:none;behavior:url(#default#userData)" id="usersData">';
                        g.document.body.appendChild(v);
                        v = g.document.getElementById("usersData")
                    }
                    try {
                        v.load("oXMLBranch")
                    } catch (h) {
                    }
                    if (b != void 0) {
                        b == "" ? v.removeAttribute(e) : v.setAttribute(e, b);
                        try {
                            v.save("oXMLBranch")
                        } catch (i) {
                        }
                    } else return v.getAttribute(e) || ""
                }
            } catch (j) {
                if (!N) {
                    MI.Bos({name: "btnStorageFull", id: 1210});
                    f = function () {
                        var a = /^draft|top|time|option|tips|follow/, e = g.localStorage;
                        if (e)try {
                            for (var b in e)if (!b.match(a)) {
                                e[b] = "";
                                e.removeItem(b)
                            }
                        } catch (f) {
                        } else if (UI.B.ie) {
                            a = new Date;
                            a.setSeconds(a.getSeconds() - 1);
                            v.expires = a.toUTCString();
                            try {
                                v.save("oXMLBranch");
                                MI.Bos({name: "btnStorageClear", id: 1210})
                            } catch (c) {
                            }
                        }
                        N = 1
                    };
                    u ? f() : y.push(f)
                }
            }
            return""
        }
    };
    k.exec = function () {
        u = 1;
        UI.each(y, function (a) {
            a()
        });
        y = []
    };
    k.iframe = function () {
        var a = UI.html('<iframe id="sIframeProxy" name="sIframeProxy" src="http://api.t.qq.com/proxy.html" onload="MI.S.exec();" style="display:none"></iframe>')[0];
        UI.append(a, document.body)
    };
    j.S = k;
    MI.isS = 1;
    MI.Crs = function (a, c) {
        function f(a) {
            var e = UI.A(a, t) || "", f = MI.Crs.iconPic && e.hasString("mblogpic") && !UI.hasClass(a, "noIconPic"), c;
            setTimeout(function () {
                var o = a.parentNode;
                if (o) {
                    var g = b(o, ".preview")[0], h = MI.Crs.iconPic, i = UI.hasClass(o, "vThumbs");
                    if (f && !i) {
                        var r = e.match(/\w{10,30}/g) || ["NOMD5"];
                        if (MI.user.fun.mergePic && h.hasString(r[0]) && !UI.A(a, "show")) {
                            e = MI.Crs.iconPicUrl;
                            UI.addClass(o.parentNode.parentNode, "iconPic");
                            c = true
                        } else {
                            g && setTimeout(function () {
                                UI.remove(g)
                            }, 50);
                            MI.Crs.iconPic = MI.Crs.iconPic + e
                        }
                    }
                    if (!c && g && MI.Crs.autoExpandPic) {
                        if (o && o.onclick)o.onclick()
                    } else if (g && MI.user.fun.autoPic)if (r = UI.A(g, "crs")) {
                        if (!f) {
                            UI.A(g, "src", r);
                            UI.A(g, "crs", "")
                        }
                        MI.Crs.preLoad(r)
                    }
                    if (i) {
                        var o = o.parentNode, j;
                        if (MI.user.fun.mergePic && h.hasString(e) && !UI.A(a, "show")) {
                            h = b(o, ".vSimple")[0];
                            j = b(o, ".vThumbs")[0];
                            b(j, "img");
                            UI.hide(j);
                            h.style.display = "inline";
                            o.onmouseover = function () {
                                j.style.display = "inline";
                                UI.addClass(this, "hover")
                            };
                            o.onmouseout = function () {
                                UI.hide(j);
                                UI.removeClass(this, "hover")
                            };
                            (h = UI.parents(a, "mediaWrap")[0]) && UI.addClass(h, "iconPic")
                        } else MI.Crs.iconPic = MI.Crs.iconPic + e
                    }
                    UI.A(a, "resizeto") && UI.EA(a, "load", function () {
                        MI.Crs.onLoadResize(a)
                    });
                    if (e)a.src = e;
                    a.style.display = "inline";
                    UI.removeClass(a, "loading")
                }
            }, k);
            UI.removeClass(a, t)
        }

        var g, h = UI.scrollY(), i = h + UI.windowHeight() * 1.5, j = h - 100, t = "crs", k = 0, F = 0, l = 5;
        MI.Crs.y && (i = i + MI.Crs.y);
        if (a) {
            g = b(c, "." + t);
            if (!c)MI.crs = g
        }
        MI.Crs._body || UI.ready(function () {
            MI.Crs._body = UI.html('<div style="display:none"></div>')[0];
            UI.append(MI.Crs._body, document.body)
        });
        UI.each(g || MI.crs, function (a) {
            a.onerror = function () {
                MI.picError(this)
            };
            if (!F && UI.hasClass(a, t) && a.parentNode) {
                l--;
                if (l >= 0)f(a); else if (c) {
                    l = 5;
                    f(a)
                } else {
                    var e = UI.getY(a.parentNode) || UI.getY(a.parentNode.parentNode);
                    if (e && e < i && e > j) {
                        l = 5;
                        f(a)
                    }
                    !MI.Crs.less && (e && e > i) && (F = 1)
                }
                k = k + 2
            }
        });
        clearTimeout(MI.delay.resetCrs);
        MI.delay.resetCrs = setTimeout(function () {
            MI.crs = b("." + t)
        }, 400)
    };
    MI.Crs.autoExpandPic = !1;
    MI.Crs.iconPic = "x";
    MI.Crs.iconPicUrl = MI.api.base + "images/" + ("en_US" == window.MILang ? "en/" : "") + "vT.png";
    MI.Crs.disabled = 0;
    MI.Crs.less = 0;
    MI.Crs.preview = [];
    MI.Crs.preLoad = function (a, b) {
        if (MI.Crs.preview.length >= (b || 5)) {
            var f = [];
            f.push("<div>");
            UI.each(MI.Crs.preview, function (a) {
                if (a) {
                    f.push('<img src="' + a.replace(/[^\/]+$/g, "460") + '" onerror="MI.picError(this)" />');
                    MI.Bos("btnPicBigPreload", "", 1E-4)
                }
            });
            f.push("</div>");
            setTimeout(function () {
                UI.append(UI.html(f.join(""))[0], MI.Crs._body)
            }, 500);
            MI.Crs.preview = []
        } else {
            MI.Crs.preview.push(a);
            clearTimeout(MI.Crs.preDelay);
            MI.Crs.preDelay = setTimeout(function () {
                MI.Crs.preLoad("", 1)
            }, 3E3)
        }
    };
    MI.Uin = function () {
        var a = UI.trim(UI.cookie("p_luin") || UI.cookie("uin") || UI.cookie("luin") || "");
        return Number(a.replace(/o/g, ""))
    };
    MI.Pic = function (a, b) {
        a.src = MI.picSrc.h + (b ? b : 50) + ".png"
    };
    MI.Load = function (e, c, f, g) {
        function h(e, f) {
            var c = a(e);
            if (c) {
                var o = c.parentNode, g = b(o, "h3 .btn")[0] || UI.DC("a");
                UI.hasClass(o, k);
                e == "star" && MI.user.fun.widgetAdmin && (f = '<div class="sc_cnt_rmdfollow">' + f + "</div>");
                if (c.innerHTML == "" || F)c.innerHTML = f;
                if (e == "medaltips")MI.app("Sidebar", function () {
                    MI.Sidebar.medalShow(f)
                }); else if (e == "taskDegree") {
                    var r = a("taskDegree");
                    if (r) {
                        r.innerHTML = f;
                        UI.each(b(r, "a"), function (a) {
                            a.onclick = function () {
                                MI.Bos("btn_openTask_Degree");
                                MI.app("Task", function () {
                                    MI.Task.build()
                                });
                                return false
                            }
                        });
                        UI.show(r)
                    }
                }
                UI.removeClass(o, k);
                g.title = i;
                UI.evalScript(f);
                UI.removeClass(g, t);
                MI.app("Base", function () {
                    if (e == "recommend" || e == "star" || e == "citylife") {
                        MI.Card.build(c, ".userPic img", 3);
                        MI.Card.build(c, ".knownInfo .BossHref,.kRelaBox a", MI.hostType === 3 ? 3 : 2)
                    } else e == "appRecommend" && MI.Card.build(c, ".knownInfo .rela_info a", MI.hostType === 3 ? 3 : 2)
                })
            }
        }

        var i = _("收起"), j = _("展开"), t = "loading", k = "fold", F, l, m, n, p;
        if (UI.isArray(e) && (e.length || MI.user.fun.widgetAdmin)) {
            UI.each(e, function (e) {
                (e = a(e)) && (b(e.parentNode, "h3 .btn")[0] || UI.DC("a"))
            });
            l = +new Date;
            var q = function (c) {
                if (c.result == 0) {
                    UI.each(e, function (a, e) {
                        var b = c.info[f[e]];
                        if (b)try {
                            h(a, b)
                        } catch (o) {
                        }
                    });
                    MI.Load.bottom()
                }
                UI.each(e, function (e) {
                    if (e = a(e)) {
                        e = b(e.parentNode, "h3 .btn")[0];
                        UI.removeClass(e, t)
                    }
                });
                if (c.result == 0 && MI.user.fun.widgetAdmin)for (var o in c.info) {
                    var g = c.info[o];
                    g && (o.hasString("app_") ? MI.Load.widget.show(o, g) : h(o, g))
                }
            };
            UI.isObject(c) ? q(c) : MI.ajax({url: c, type: "get", data: "t=" + f.join(","), success: function (a) {
                m = +new Date - l;
                a = MI.json(a);
                q(a);
                n = +new Date - l;
                setTimeout(function () {
                    p = +new Date - l;
                    MI.Speed("t_asyn_sidebar", 0.1, m, n, p)
                }, 0)
            }})
        } else {
            var s = a(e);
            if (s) {
                var v = s.parentNode, u = b(v, "h3 .btn")[0] || UI.DC("a"), w = UI.hasClass(v, k);
                u.title = w ? i : j;
                if (UI.A(s, "refresh")) {
                    F = 1;
                    MI.Bos("btnRefresh" + f)
                }
                if (UI.hasClass(u, t))return;
                if (s.innerHTML == "" || F) {
                    F || UI.addClass(u, t);
                    l = +new Date;
                    MI.ajax({url: c, type: "get", data: "t=" + f, success: function (a) {
                        m = +new Date - l;
                        a = MI.json(a);
                        if (a.result == 0) {
                            h(e, a.info[f]);
                            MI.Load.bottom()
                        }
                        UI.removeClass(u, t);
                        UI.A(s, "refresh", "");
                        n = +new Date - l;
                        setTimeout(function () {
                            p = +new Date - l;
                            MI.Speed("t_asyn_sidebar", 0.1, m, n, p)
                        }, 0)
                    }})
                } else UI.toggleClass(v, k)
            }
            MI.Load.bottom();
            try {
                u.blur()
            } catch (x) {
            }
            if (!F && MI.Load.id[f]) {
                MI.ajax({url: MI.url.userBit, data: {t: MI.Load.id[f], v: w ? 0 : 1}});
                g != 0 && MI.Bos("btn" + (w ? "Un" : "") + "Fold" + f)
            }
        }
    };
    MI.Load.widget = {index: 0, time: 0, delay: 1, delayNum: 50, data: [], delayShow: function () {
        var a = MI.Load.widget;
        a.delay = 0;
        UI.linkEvent.remove("windowScroll", a.delayShow);
        if (a.data.length) {
            UI.each(a.data, function (b) {
                a.show(b[0], b[1])
            });
            a.data = []
        }
        MI.app("Wide", function () {
            MI.Widget.widgetFloat()
        })
    }, create: function (a, c, f) {
        c.innerHTML = f;
        c.id = a;
        if (a == "app_recStars")if (a = b(c, ".SC_bd")[0])a.id = "star";
        UI.evalScript(f);
        MI.Load.bottom()
    }, show: function (e, b) {
        var f = this;
        if (!f.time)f.time = +new Date;
        if (f.delay && (f.index > 4 && e) && UI.height(f._wrap) > UI.scrollY() + UI.windowHeight() - 200)f.data.push([e, b]); else {
            if (!f._body) {
                f._wrap = a("widgetWrap");
                if (!f._wrap)return;
                f._body = f._wrap.childNodes;
                setTimeout(function () {
                    UI.linkEvent.add("windowScroll", f.delayShow)
                }, 1E3);
                MI.app("Wide", function () {
                    MI.Widget.update()
                })
            }
            var c = f._body[f.index];
            if (c) {
                f.create(e, c, b);
                f.index++
            }
        }
    }};
    MI.Load.id = {star: 36, topic: 37, tags: 38, recommend: 39, citylife: 104};
    MI.Load.bottom = function () {
        clearTimeout(MI.Load.delay);
        MI.Load.delay = setTimeout(function () {
            MI.talkList && MI.talkList.bottom();
            MI.bottom();
            MI.bottom("pageNav")
        }, 50)
    };
    MI.TalkBox = function (e, b) {
        if (this._body = UI.isString(e) ? a(e) : e) {
            var f = this;
            f._txt = f.$("textarea") || f.$(".inputTxt");
            f._tip = f.$(".countTxt");
            f._guide = f.$("h2 em");
            f._tipBig = f.$(".talkSuc");
            f._btn = f.$(".sendBtn");
            f._num = [a("talkNum")];
            f._close = f.$(".close");
            f._addReply = f.$(".addReply");
            f._sendCnt = f.$(".sendCnt") || f._body;
            f.otherCheck = [];
            f.getOtherValue = {};
            f.resetOtherValue = [];
            var c = function () {
                UI.ER(f._body, UI.B.ipad ? "touchstart" : "mouseover", c);
                UI.ER(f._txt, "focus", c);
                MI.app("TalkBoxRich", function () {
                    f.addEvent()
                })
            };
            UI.EA(f._body, UI.B.ipad ? "touchstart" : "mouseover", c);
            UI.EA(f._txt, "focus", c);
            UI.EA(f._txt, "click", function () {
                f.guideTextRemove()
            });
            UI.proxyEvent(f._body, "click", function (a) {
                return function (e) {
                    var b = this;
                    MI.app("TalkBoxRich", function () {
                        f.events && f.events[a] && f.events[a].call(b, e, f)
                    })
                }
            }, [".top .close", ".creatNew", ".btnASFeedback", ".atSome", ".btnTextToPic", ".btnRealWord", ".insertFace .txt,.ico_face", ".atWen .txt", ".addComt", ".addReply", ".sendBtn", ".newFeel .txt", ".newVote .txt", ".newOrder .txt", ".newGift .txt", ".uploadFile .txt", ".uploadVideo .txt", ".uploadMusic .txt", ".record .txt", ".uploadPic .txt", ".synchFrm .diary", ".synchFrm .qq", ".replayQzoneCheckbox", ".autoBackspace", ".uploadPicConfirm", ".uploadPicCancel", ".schBrace .txt", ".btnMicoZt", ".text2PicBtn a, .longWB .txt", ".btnMicoZj", ".moreBox .more"], 10);
            if (f._guide)f.guide = f._guide.innerHTML;
            f.guideTextValue = UI.trim(UI.A(f._txt, "guide") || "");
            f.guideTextTopic = f.guideTextValue.match(/#[^#]+#/g) || "";
            if (f.guideTextTopic) {
                f.guideTextTopic = f.guideTextTopic[0];
                f.guideTextValue = f.guideTextValue.replace(f.guideTextTopic, "")
            }
            f.guideTextValue && setTimeout(function () {
                f.guideTextAdd(f.guideTextValue);
                f.countTxt()
            }, 200);
            f.iconPic = MI.user.fun.iconPic;
            f.delay = {};
            if (b)for (var g in b)f[g] = b[g];
            f._txt.onfocus = function () {
                UI.removeClass(f._body, "condensed");
                UI.addClass(f._sendCnt, "focus");
                this.focused = 1;
                f.guideTextRemove();
                f.countTxt();
                UI.linkEvent("talkBoxFocus", f)
            };
            f._txt.onblur = function () {
                var a = this;
                clearTimeout(f.delay.blur);
                f.delay.blur = setTimeout(function () {
                    if (!a.focused) {
                        UI.removeClass(f._sendCnt, "focus");
                        if (f.condensed && !f._txt.value && !f.hasMedia())f.delay.condensed = setTimeout(function () {
                            UI.addClass(f._body, "condensed");
                            setTimeout(function () {
                                f.hideMedia()
                            }, 0)
                        }, 200);
                        f.sending || f.countTxt()
                    }
                }, 200);
                this.focused = 0;
                f.guideTextAdd(f.guideTextValue);
                f.countTxt();
                UI.linkEvent("talkBoxBlur", f)
            };
            UI.ready(function () {
                setTimeout(function () {
                    f._txt.blur();
                    f.countTxt()
                }, 0)
            })
        }
    };
    MI.TalkBox.showBox = function (a, b, f) {
        var c, g, h = new MI.Reply, i = h.talkBox, j = f && f.tweetDom, k, l, m, f = f || {};
        switch (b) {
            case 0:
                c = f.title || _("来，说说你在做什么，想什么");
                b = null;
                break;
            case 1:
                c = f.title || _("转播原文，顺便说两句：");
                if (j && UI.GC(j, ".replyBox").length) {
                    g = MI.TalkList.getRelayOld(j);
                    k = 80
                }
                break;
            case 2:
            case 7:
                f.title && (c = _(f.title));
                if (f.talkTo)i.talkTo = f.talkTo; else if (j) {
                    j = UI.GC(j, ".userName strong a")[0];
                    i.talkTo = MI.string.account(j.title || UI.A(j, "rel"))
                }
                if (b === 7) {
                    i.topic = "@" + i.talkTo + " ";
                    i.txtMax = i.txtMax - i.topic.length
                } else {
                    i.topic = "";
                    i.txtMax = MI.TalkBox.prototype.txtMax
                }
                break;
            case 4:
                c = f.title || _("评论原文：");
                if (j && UI.GC(j, ".replyBox").length) {
                    g = MI.TalkList.getRelayOld(j);
                    k = 80
                }
                break;
            default:
                return
        }
        f.hasOrigin && (c = '<h1 class="DmainTit">' + c + "</h1>");
        if (f.content) {
            g = f.content;
            k = 80
        }
        h.show({title: c, cont: g, height: k, type: b, talkId: a, doFocus: false, success: f.success || null});
        b = f.pref || "";
        h.talkBox.data ? h.talkBox.data.pgv_ref = b : h.talkBox.data = {pgv_ref: b};
        if (f.config)for (var n in f.config)h.talkBox[n] = f.config[n];
        f.focusLast ? setTimeout(function () {
            MI.focus(i._txt)
        }, 200) : setTimeout(function () {
            try {
                i._txt.focus();
                MI.selectTxt(i._txt, 0, 0, 0);
                i.countTxt()
            } catch (a) {
            }
        }, 200);
        if (f.hasOrigin) {
            h._talkTo.innerHTML = f.talkToTip || " ";
            UI.addClass(h._talkTo, "c_tx5");
            h._talkTo.parentNode.style.paddingTop = "10px";
            f = f.originPos || "down";
            if (f == "down") {
                l = UI.html('<ul class="LC LC_sc_app LC_sc_app_noHead  LC_sc_app_loading"></ul>')[0];
                UI.after(l, h._body);
                UI.before(UI.html('<div class="D_bor"></div>')[0], l)
            } else {
                l = UI.html('<ul class="LC LC_sc_app LC_sc_app_loading"></ul>')[0];
                UI.before(l, h._body);
                UI.after(UI.html('<div class="D_bor"></div>')[0], l)
            }
            m = function () {
                MI.dialog.show({title: c})
            };
            m();
            MI.app("utils/getTalk", function (b) {
                b({id: a, target: l, call: function () {
                    UI.removeClass(l, "LC_sc_app_loading");
                    m()
                }})
            })
        }
        return h
    };
    var j = MI.TalkBox, k = MI.url.talkPublish, m = 0, L, E;
    try {
        E = parent.source, L = top.document.location.hostname
    } catch (z) {
    }
    "web2.qq.com" == L || "web.qq.com" == L ? m = 1009 : E && (m = E);
    j.prototype = {delayTime: 1500, delayVideo: null, delayVideoTime: null, url: k, event: function (a, b, f) {
        var c = this;
        UI.proxyEvent(c._body, a, function () {
            return function (a) {
                b.call(this, a, c)
            }
        }, [f])
    }, source: m, feelTip: 1, txtTopic: _("#输入话题标题#"), txtKeyword: _("{输入搜索关键词}"), txtPic: _("#分享图片#"), txtVideo: "", txtMusic: _("#分享音乐#"), txtTip: {empty: _("请输入内容"), fail: _("发送失败,请重试"), repeat: _("请不要连续发表重复内容")}, txtTipSend: _("广播中"), startTime: 0, condensed: 0, addCheck: null, addNum: 1, autoHeight: 0, autoSave: 0, guideTextKeep: 1, guideTextAdd: function (a) {
        if ((this._txt.value == "" || this._txt.value == a || this._txt.value == this.guideTextTopic) && a) {
            var b = this.guideTextTopic, f = MI.json(MI.S("option_topic_" + MI.Uin())), c;
            b && f && f[encodeURI(b)] && (c = 1);
            if (!c) {
                this.guideText = a;
                UI.addClass(this._txt, "cNote");
                this._txt.value = this.guideTextValue
            }
        }
    }, guideTextRemove: function (a) {
        var b = this;
        if (b.guideText) {
            if (a)b._txt.value = ""; else if (b._txt.value == b.guideText) {
                a = b.guideText.match(/#[^#]+#/g);
                if (b.guideTextKeep) {
                    b._txt.value = b.guideTextTopic || b.guideTextValue;
                    setTimeout(function () {
                        b._txt.select()
                    }, 0)
                } else {
                    b._txt.value = a ? a.join("") : "";
                    b.focus()
                }
            }
            UI.removeClass(b._txt, "cNote");
            b.countTxt();
            b.guideText = null
        }
    }, countUrl: 1, txtMax: 140, zhCount: 1, countTxt: function () {
        var a = this, b = a._txt.value, f = a._autoBackspace, c, g;
        if (!a.tipNoChange) {
            a.guideText && b == a.guideText && (b = "");
            if ((a.length = g = MI.countTxt(b, a.countUrl, a.zhCount, a.txtMax)) || !a._tip.innerHTML.hasString(a.txtTip.empty)) {
                if (g > this.txtMax) {
                    c = '<em class="error">';
                    a._btn.disable = 1;
                    f && b.indexOf("||") === -1 ? UI.hide(f) : UI.show(f)
                } else {
                    c = "<em>";
                    f && UI.hide(f);
                    a._btn.disable = 0
                }
                if (!a.isEmpty && g == 0)a._btn.disable = 1;
                MI.user.fun.sendBtnDisabledOnNoText && (g == 0 ? UI.addClass(a._btn, "disabled") : UI.removeClass(a._btn, "disabled"));
                b = Math.abs(a.txtMax - g);
                g > this.txtMax ? a.miniCount ? a.showTip(_("{0}-{1}</em>", c, b)) : a.showTip(_("超出{0}{1}</em>字", c, b)) : a.miniCount ? a.showTip(_("{0}{1}</em>", c, b)) : a.showTip(_("还能输入{0}{1}</em>字", c, b));
                if (a._msgTo && (a._msgTo.value == "" || a._msgTo.error))a._btn.disable = 1;
                if (g <= a.txtMax && a.type == 1 && a.boxType != "trans") {
                    a._btn.disable = 0;
                    MI.user.fun.sendBtnDisabledOnNoText && UI.removeClass(a._btn, "disabled")
                }
                if (a.autoHeight) {
                    clearTimeout(this.delay.height);
                    this.delay.height = setTimeout(function () {
                        UI.C(a._txt, "height", "");
                        var b = UI.A(a._txt, "padding");
                        (!b || b == "NaN") && UI.A(a._txt, "padding", parseInt(UI.C(a._txt, "paddingTop")) + parseInt(UI.C(a._txt, "paddingBottom")));
                        var f = a._txt.scrollHeight, c = a._txt.clientHeight, b = Number(UI.A(a._txt, "padding") || 0), g = parseInt(UI.C(a._txt, "lineHeight")), f = f > c ? f : c;
                        !isNaN(b) && !UI.B.firefox && (f = f - b);
                        isNaN(g);
                        if (f > 0) {
                            if (a.autoHeight > 40 && f >= a.autoHeight)f = a.autoHeight;
                            if (f >= a.autoHeight) {
                                f = a.autoHeight;
                                UI.C(a._txt, "overflowY", "auto")
                            } else UI.C(a._txt, "overflowY", "hidden");
                            if (f) {
                                UI.C(a._txt, "height", f + "px");
                                (b = UI.next(a._txt)) && UI.C(b, "height", f + "px")
                            }
                        }
                    }, UI.B.ipad ? 800 : 100)
                }
                if (a.autoSave && g <= this.txtMax && MI.isS) {
                    clearTimeout(a.delay.save);
                    a.delay.save = setTimeout(function () {
                        a.save()
                    }, 80)
                }
                if (MI.Text2Pic && !a.type && a.uploadCollection && !UI.B.ipad) {
                    a.overFlow = g > this.txtMax;
                    a._pic && (a._pic.style.display != "none" && !UI.hasClass(a._body, "dialogPics")) && MI.Text2Pic.formTalk(a, g - this.txtMax > 0 && !a.isLongWBModify)
                }
                a.countTxtCall && a.countTxtCall()
            }
        }
    }, focus: function () {
        this._txt && MI.focus(this._txt)
    }, guideReset: function () {
    }, save: function () {
        var a = this._txt.value;
        if (!(this.guideText && a != this.guideText) && MI.Base)try {
            var b = a.replace(RegExp(this.txtTopic, "g"), "").replace(RegExp(this.txtKeyword, "g"), "") || "";
            this.guideText && b == this.guideText && (b = "");
            MI.S("draft_" + MI.Uin(), b)
        } catch (f) {
        }
    }, showTip: function (a, b) {
        b == 2 ? UI.addClass(this._tip, "loading") : UI.removeClass(this._tip, "loading");
        this._tip.innerHTML = b == 1 ? '<span class="error">' + a + "</span>" : a
    }, flashTip: function () {
        clearInterval(this.delay.flashTip);
        UI.C(this._tip, "opacity", "0");
        this.delay.flashTip = UI.animate(this._tip, "opacity", 1, 0, 0.1);
        clearTimeout(this.delay.condensed)
    }, hideMedia: function () {
        var a = this;
        UI.each(["Video", "Music", "Pic", "Order", "Vote", "RelTopic"], function (b) {
            b = "up" + b;
            a[b] && a[b].hide()
        });
        a.hideVote && a.hideVote();
        a.guideTextRemove(true);
        clearTimeout(a.delay.condensed);
        UI.linkEvent("talkBoxHideMedia", a)
    }, hasMedia: function () {
        return this._pic && this.picsNum > 0 || this._music && UI.hasClass(this._musicAnchor, "disabled") || this._video && UI.hasClass(this._videoAnchor, "disabled") ? true : false
    }, hide: function () {
        UI.remove(this._body);
        this.hideCall && this.hideCall();
        clearTimeout(this.delay.tip);
        UI.hide(this._tipBig);
        this.display = this.sending = 0;
        UI.removeClass(this._btn, "btnNoStr")
    }, hideCall: null, success: null, reset: function () {
        var a = this;
        UI.removeClass(a._btn, "btnNoStr");
        a._btn.disable = 0;
        setTimeout(function () {
            a.countTxt()
        }, 500)
    }, resetRtPic: function (a) {
        var b = this;
        MI.app("TalkBoxRich", function () {
            b._resetRtPic(a)
        })
    }, data: {}, send: function () {
        var a = this;
        MI.app("TalkBoxRich", function () {
            a._send()
        })
    }, countNum: function (a) {
        if ((!(a > 0) || this.addNum) && this._num && this._num.length)for (var b = 0, f = this._num.length; b < f; b++)MI.countNum(this._num[b], a)
    }, addTopic: function (a) {
        var b = 1;
        a ? b = 0 : a = this.txtTopic;
        try {
            this._txt.focus()
        } catch (f) {
        }
        this.hideMedia();
        (!this._txt.value.hasString(this.txtTopic) || !b) && MI.insertTxt(this._txt, a, MI.cursorX(this._txt));
        if (b) {
            b = this._txt.value.replace(/\r/g, "").indexOf(a);
            b == -1 && (b = 0);
            MI.selectTxt(this._txt, b + 1, b + a.length - 1, b)
        }
        this.countTxt()
    }, addKeyword: function (a, b) {
        var b = b || {}, f = 1;
        a ? f = 0 : a = b.defaultTxt ? b.defaultTxt : this.txtKeyword;
        try {
            this._txt.focus()
        } catch (c) {
        }
        (!this._txt.value.hasString(a) || !f) && MI.insertTxt(this._txt, a, MI.cursorX(this._txt));
        if (f) {
            f = this._txt.value.replace(/\r/g, "").indexOf(a);
            f == -1 && (f = 0);
            MI.selectTxt(this._txt, f + 1, f + a.length - 1, f)
        }
        this.countTxt()
    }, goUser: function (a) {
        MI.hostType == 1 ? document.location.href = a : window.open(a)
    }, addPic: function (a) {
        var b = this;
        MI.app("TalkBoxRich", function () {
            b._addPic(a)
        })
    }, addMusic: function (a) {
        var b = this;
        MI.app("TalkBoxRich", function () {
            b._addMusic(a)
        })
    }, getVideo: function (a) {
        var b = this;
        MI.app("TalkBoxRich", function () {
            b._getVideo(a)
        })
    }, $: function (a) {
        return b(this._body, a)[0]
    }};
    MI.TalkBox.captureEnable = function () {
        return UI.B.win && (UI.B.ie || UI.B.chrome || UI.B.firefox) || UI.B.mac && (UI.B.firefox || UI.B.chrome || UI.B.safari)
    };
    MI.TalkBox.cur = null;
    MI.TalkList = function (e, c) {
        var f = this, g = a("moreList");
        f._body = UI.isString(e) ? a(e) : e;
        if (!f._body)return false;
        f._more = f._bottom = g ? b(g, "a")[0] : UI.DC("a");
        f._new = a("talkNew");
        f._list = UI.children(f._body);
        g = function (a) {
            return function (b) {
                var e = this;
                MI.app("TalkListRich", function () {
                    f.events && f.events[a] && f.events[a].call(e, b, UI.closest(e, "li,.talkListLi") || e, f)
                })
            }
        };
        UI.proxyEvent(f._body, "click", g, [".relay", ".comt", ".reply", ".comtOrg", ".relayOrg", ".delBtn", ".showAllCont", ".subHover .alarm", ".alarm", ".view", ".upTop", ".shield", ".fav.light", ".fav", ".shareBtn a", ".upTop.light", ".upTop", ".shield.light", ".shield", ".privacyBtn", ".selectCls .popupDropBtn", ".replyMsg", ".areaInfo a", ".orderWrap,.rich_mod", ".time", ".ico_shield", ".eventPic", ".medalMsgClickBtn", ".tl_imgGroup_link img", ".cap_panel", ".msgCnt .ic_pic", ".zfNum2", ".at_stranger a", ".at_detail a", ".tl_prepic_lk", ".readNum", ".int_like", ".picTools .btnMobile", "a.detail", ".shieldUser", ".shieldFrom", ".btn_trans", ".delQuanUser", ".ico_2dCode", ".richmax_up_bar_weixin a", ".ui_slideshow_toolbar .icon_rotate_left", ".ui_slideshow_toolbar .icon_rotate_right", ".picTools .btnOriginal"], 10);
        UI.proxyEvent(f._body, "mousedown", g, ["li", ".f"]);
        UI.proxyEvent(f._body, "mouseover", g, ["li", ".btn_trans", ".msgCnt .ic_pic", ".ico_shield", ".pubInfo a .sico"]);
        UI.proxyEvent(f._body, "mouseout", g, ["li", ".btn_trans"]);
        MI.user.account || UI.proxyEvent(f._body, "click", function () {
            return function (a) {
                MI.unLoginRich.call(this, a);
                a.prevent()
            }
        }, [".orderDetail", ".rich_mod"], 10);
        setTimeout(function () {
            f.cacheLast();
            f.cacheFirst()
        }, 0);
        f.iconPic = MI.user.fun.iconPic;
        f.iconPic && UI.addClass(f._body, "iconPic");
        f.useSidePanel = MI.user.fun.userSidePanel;
        f.tmplData = {};
        if (c)for (var h in c)f[h] = c[h];
        f.ids = {};
        UI.each(f.boxes, function (a) {
            f[a] = f[a] || {};
            if (f.isAt)f[a].isAt = f.isAt
        });
        if (f._more && !UI.A(f._more, "load")) {
            UI.A(f._more, "load", "1");
            f._more.onmouseover = MI.hideFocus;
            UI.EA(f._more, "click", UI.bind(f._moreClick, f))
        }
        if (f._new && !UI.A(f._new, "load")) {
            UI.A(f._new, "load", "1");
            UI.EA(f._new, "click", UI.bind(f._newClick, f));
            UI.linkEvent.add("windowScroll", function (a) {
                if (f.news) {
                    var b = a.scrollY + a.windowHeight;
                    UI.each(f._news, function (a) {
                        if (UI.hasClass(a, "newMsg") && UI.getY(a) + UI.height(a) + 70 < b) {
                            UI.removeClass(a, "newMsg bg4 bor_bg5");
                            f.news--
                        }
                    })
                }
            })
        }
        f.card();
        f.buildTips();
        setTimeout(function () {
            f.bottom();
            for (var a = 0, b = f._list.length; a < b; a++)f.addEvent(f._list[a]);
            f.addFollowBtn(f._body)
        }, 0)
    };
    MI.TalkList.rtPics = {};
    MI.TalkList.showPicPreview = function (a) {
        var b = this;
        MI.app("TalkListRich", function () {
            b._showPicPreview(a)
        })
    };
    MI.TalkList.getRelayOld = function (a, b, f) {
        var b = b || UI.GC(a, ".msgCnt")[0], c = UI.GC(a, ".userName strong a")[0], c = MI.string.account(c.title || UI.A(c, "rel")), g, h = "";
        b && UI.GC(a, ".replyBox").length === 0 && (g = 1);
        if (!g) {
            a = (a = a.id ? a.id.match(/([0-9]{5,})($|\D)/) : 0) && a[1];
            h = this._getRelayOld(a, b, c)
        }
        if (f) {
            f._txt.value = h;
            try {
                f._txt.focus();
                MI.selectTxt(f._txt, 0, 0, 0);
                f.countTxt()
            } catch (i) {
            }
        } else return h
    };
    MI.TalkList._getRelayOld = function (a, c, f) {
        var g = "", h, c = c.cloneNode(1);
        UI.each(UI.GC(c, "em"), function (a) {
            var b = UI.A(a, "rel");
            if (b)a.innerHTML = b
        });
        UI.each(UI.GC(c, "img"), function (a) {
            var b = a.title;
            b && UI.after(UI.html("<b>/" + b + "</b>")[0], a)
        });
        UI.each(UI.GC(c, ".btn_trans"), function (a) {
            UI.remove(a)
        });
        UI.each(b(c, "i.ic_pic"), function (a) {
            var b = UI.A(a, "data-rpid"), e = UI.A(a, "data-rpurl");
            if (b.match(/^[1-9]$/) && e) {
                h = h || {};
                a.innerHTML = " [image" + b + "]";
                h[b] = e
            }
        });
        h && (MI.TalkList.rtPics[a] = h);
        return g = " || @" + f + ": " + UI.text(c)
    };
    MI.TalkList.prototype = {cur: null, curSource: null, isQun: 0, _moreClick: function (a) {
        this.more();
        UI.E(a).prevent()
    }, _newClick: function () {
        var a = b(this._new, "strong")[0];
        if (a) {
            this.newly();
            MI.Bos("btnkNew", parseInt(a.innerHTML))
        }
        return false
    }, _tip: null, _news: [], news: 0, hasBottom: 1, type: 0, apiType: 0, tmpl: "", relay2Cur: 0, relayAtCur: 0, moreTimes: 0, newlyUrl: MI.url.newly, refreshUrl: "", removeUrl: MI.url.talkDel, removeTip: _("确定删除这条广播？"), favorUrl: MI.url.talkFavor, shieldUrl: MI.url.talkShield, upTopUrl: MI.url.talkUpTop, unfavTip: _("确定删除这条收藏？"), unUpTopTip: _("确定删除这条置顶？"), unShieldTip: _("确定取消屏蔽这条信息？"), shieldTip: _("不再接收来自本条广播的<br>@提醒？"), xhr: {}, last: {}, iconPics: {}, picsDelay: null, _iconPics: function (a) {
        var c = this;
        if (!UI.parents(a, "tl_prepic_wp").length) {
            var f = UI.html('<div class="tl_prepic_wp"><a href="#" class="tl_prepic_lk"><i class="ico_pics"></i>查看图片</a></div>')[0];
            UI.replace(f, a);
            UI.append(a, f);
            UI.hide(a);
            f = b(f, ".tl_prepic_lk")[0];
            UI.EA(f, "mouseover", function () {
                c.picsDelay && clearTimeout(c.picsDelay);
                c.picsDelay = setTimeout(function () {
                    UI.show(a)
                }, 50)
            });
            UI.EA(f, "mouseout", function () {
                c.picsDelay && clearTimeout(c.picsDelay);
                c.picsDelay = setTimeout(function () {
                    UI.A(a, "show") || UI.hide(a)
                }, 200)
            });
            a.onmouseover = function () {
                c.picsDelay && clearTimeout(c.picsDelay)
            };
            a.onmouseout = function () {
                c.picsDelay && clearTimeout(c.picsDelay);
                c.picsDelay = setTimeout(function () {
                    UI.A(a, "show") || UI.hide(a)
                }, 300)
            }
        }
    }, first: {time: 1}, add: [], time: [], page: 1, pageMode: function (a) {
        var b = this;
        MI.user.fun.pageMode && MI.app("TalkListRich", function () {
            b._pageMode(a)
        })
    }, lastVideo: null, lastMusic: null, musicState: 0, musicPlayDetec: 0, musicDelay: 0, checkTalkId: function () {
    }, comtBoxList: 1, replyCont: "", boxes: ["replyBox", "relayBox", "comtBox", "relayListBox", "relayListComtBox"], setData: function (a) {
        var b = this, f;
        for (f in a)UI.each(b.boxes, function (c) {
            if (!b[c].data)b[c].data = {};
            b[c].data[f] = a[f] + (f == "pgv_ref" ? "." + c : "")
        })
    }, card: function (a) {
        if (this.hideUserCard == 1)return false;
        a = a || this._body;
        MI.app("Base", function () {
            MI.Card.build(a, ".userPic img", MI.user.fun.wideStyle && MI.user.fun.userSidePanel ? 2 : 1);
            MI.Card.build(a, ".need-card,.msgBox strong a,.msgBox em a", 2)
        })
    }, buildTips: function (a) {
        var b = this, a = a || b._body;
        MI.app("Base", function () {
            MI.tips.build({area: a, target: ".ico_phone", txt: MI.Tips.txt[0]});
            MI.tips.build({area: a, target: ".url,.ico_video,.ico_vote", txt: b.urlTips, click: function () {
                MI.Bos("btnClickUrl")
            }, width: MI.api.type == 4 ? 280 : 236});
            MI.tips.build({area: a, target: ".tIcon.ico_gy", txt: b.gongyiTips, click: function () {
                MI.Bos("btnClickGongyi")
            }});
            MI.tips.build({area: a, target: ".tIcon.myIcon", txt: b.removeIcon});
            MI.tips.build({area: a, target: ".pubInfo .sico", txt: b.fromIcon})
        })
    }, addFollowBtn: function (a) {
        var b = function () {
            setTimeout(function () {
                MI.FollowBtn.build(a, ".userPic a");
                if (MI.boss == 35 || MI.boss == 12 || MI.boss == 55) {
                    var b = MI.boss == 35 ? 79 : MI.boss == 12 ? 80 : 81;
                    MI.FollowBtn.followCall = function () {
                        MI.feedBack({name: "timeline", id: 1191, iPos: b, iBak1: 3, sBak1: ""})
                    };
                    MI.FollowBtn.unFollowCall = function () {
                        MI.feedBack({name: "timeline", id: 1191, iPos: b, iBak1: 8, sBak1: ""})
                    }
                }
            }, 100)
        };
        if (a.nodeName == "LI")b(); else {
            this.followBtn && b();
            this.eventsCall && this.eventsCall(a)
        }
    }, iconPicToggle: function () {
        var a = this;
        MI.app("TalkListRich", function () {
            a._iconPicToggle()
        })
    }, event: function (a, b, c) {
        var g = this;
        UI.proxyEvent(g._body, a, function () {
            return function (a) {
                b.call(this, a, UI.closest(this, "li,.talkListLi") || this, g);
                a.prevent()
            }
        }, [c])
    }, addEvent: function (a) {
        var c = this, f = a.id, g = b(a, ".time"), h = b(a, "a")[0], i = b(a, ".userPic img"), j = b(a, ".mFun a")[0], k = b(a, ".picBox"), l = b(a, ".mediaWrap .videoBox"), m = b(a, ".mod_tl_recom")[0], n = b(a, ".replyBox"), p = UI.A(a, "isPics");
        c.ids[f] = 1;
        if (p) {
            p = b(a, ".zfNum")[0] || b(a, ".left .time")[0] || b(a, ".relay")[0];
            tweetId = (href = UI.A(p, "href")) && href != "#" && href.indexOf("#") < 0 && href.match(/[^\/]+$/g)[0] || f;
            isReplay = n.length ? 1 : 0;
            (f = b(a, ".tl_imgGroup")[0]) && (c.iconPics[tweetId] && isReplay ? c._iconPics(f) : c.iconPics[tweetId] = f)
        }
        var q = function (b) {
            UI.ER(a, UI.B.ipad ? "touchstart" : "mouseover", q);
            h && UI.ER(h, "focus", q);
            MI.app("TalkListRich", function () {
                c._addEvent(a);
                b && UI.isFunction(b) && b()
            })
        };
        UI.EA(a, UI.B.ipad ? "touchstart" : "mouseover", q);
        h && UI.EA(h, "focus", q);
        a.nodeName != "LI" && UI.addClass(a, "talkListLi");
        if (j)j.onclick = function () {
            q(function () {
                j.onclick()
            });
            return false
        };
        if (m) {
            MI.FollowBtn.build(m, ".msgBox .mod_tl_recom p a.BossHref", "text", function (a) {
                return a.parentNode
            }, function (a) {
                UI.hasClass(a, "addAttention") && MI.Bos({name: "btnFollowBtnRecom", id: 1191})
            });
            (m = b(m, ".msgBox .mod_tl_recom .userPic a")[0]) && UI.A(m, "followBtn", 1)
        }
        UI.each(i, function (a) {
            a.onerror = function () {
                MI.picError(this)
            }
        });
        k && (MI.user.fun.newImgTmpl ? MI.TalkList.newPicEvent(k) : MI.TalkList.picEvent(k));
        l && MI.TalkList.videoEvent(l);
        c.eventCall && c.eventCall(a);
        MI.app("Base", function () {
            UI.linkEvent("MI.TalkList.event", {target: a})
        });
        i = 0;
        for (k = g.length; i < k; i++) {
            UI.A(g[i], "rel") || UI.A(g[i], "rel", UI.A(a, "rel"));
            l = UI.zoneDate(UI.A(g[i], "rel") + "000", 8);
            g[i].title = UI.formatDate(l, _("yyyy年M月d日 hh:mm"));
            c.time.push(g[i])
        }
    }, moreFun: function (a) {
        var c = this;
        c._shareBtn ? c._shareBtn != a && UI.removeClass(c._shareBtn, "mFunDis") : UI.EA(document.body, "click", function () {
            UI.removeClass(c._shareBtn, "mFunDis")
        });
        c._shareBtn = a;
        UI.addClass(a, "mFunDis");
        var a = b(a, "a"), f = a.length;
        if (f) {
            a = a[f - 1];
            UI.hasClass(a, "detail") && UI.removeClass(a, "line")
        }
    }, moreFunHide: function () {
        UI.removeClass(this._shareBtn, "mFunDis")
    }, cacheLast: function () {
        var a = UI.children(this._body), b = a[a.length - 1], c, g;
        if (b) {
            g = UI.A(b, "fav");
            a = UI.A(b, "rel");
            c = MI.string.parseInt(UI.A(b, "tid") || b.id);
            b = UI.A(b, "shield");
            this.last = {id: c, time: a, fav: g ? g : 0, shield: b ? b : 0};
            if (this.date)this.last.pubDate = UI.formatDate(UI.zoneDate(a + "000", 8), "yyyy-MM-d")
        }
    }, cacheFirst: function () {
        var a = UI.children(this._body)[0], b;
        if (a) {
            b = UI.A(a, "rel");
            a = MI.string.parseInt(UI.A(a, "tid") || a.id);
            this.first = {time: b, id: a}
        }
    }, bottom: function () {
        if (this.hasBottom) {
            var a = UI.parents(this._body, "main")[0], b, c, g;
            if (a && this._more && this._more.innerHTML) {
                b = UI.next(a);
                c = a.parentNode;
                g;
                if (b) {
                    UI.C(this._body, "marginBottom", 0);
                    UI.C(a, "min-height", 0);
                    g = UI.height(a) - UI.height(c) - 1;
                    g = g + MI.bottomFix;
                    UI.C(this._body, "marginBottom", g < -1 ? -g + "px" : "");
                    UI.C(a, "min-height", UI.height(b) + "px")
                }
            }
        }
    }, updateTime: function (a) {
        var b = this;
        MI.app("TalkListRich", function () {
            b.updateTime(a)
        })
    }, hasNext: 1, more: function (a) {
        var b = this;
        MI.app("TalkListRich", function () {
            b.more(a)
        })
    }, newly: function () {
        var a = this;
        MI.app("TalkListRich", function () {
            a.newly()
        })
    }, addNewly: function (a) {
        var b = this;
        MI.app("TalkListRich", function () {
            b.addNewly(a)
        })
    }, addMore: function (a, b) {
        var c = this;
        MI.app("TalkListRich", function () {
            c.addMore(a, b)
        })
    }, clear: function (a) {
        var b = this.talkBox;
        MI.TalkList.musicStop && MI.TalkList.musicStop();
        b && b.hide();
        this.ids = {};
        this.longWB = {count: 0};
        this._body.innerHTML = a || ""
    }};
    MI.TalkList.cur = null;
    MI.TalkList.date = 0;
    MI.TalkList.showEvent = function (a) {
        if (a)a.style.cssText = "display:block;_display:inline;"
    };
    MI.TalkList.videoEvent = function (a) {
        var c = this;
        if (a.length && !UI.hasClass(a[0], "voteBox")) {
            var a = a[0], f = b(a, ".vWrap")[0], g = Number(f.getAttribute("thumbs")), f = b(a, ".vThumbsBox")[0];
            b(f, ".vSimple");
            var h = b(f, ".vThumbs")[0];
            b(a, ".vTools");
            var i = b(a, ".vClose")[0], j = b(f, "span")[1], k = b(h, "img")[0];
            if (k) {
                var l = UI.A(k, "crs"), m;
                if (l && (l.hasString("shp.qpic.cn") || l.hasString("vpic.video.qq.com") || l.hasString(".qpic.cn/mblogpic/")))if (UI.hasClass(h, "vPic_full"))m = 430; else if (UI.hasClass(h, "vPic_even"))m = 210; else if (!l.hasString(".qpic.cn/mblogpic/"))k.width = 140;
                k.onload = function () {
                    if (g)this.load = 1;
                    if (j)j.style.display = "inline";
                    m && UI.A(k, "data-resize", m + "," + (m === 210 ? 1 : 0));
                    setTimeout(function () {
                        c.resizePic(k)
                    }, 0)
                }
            }
            if (g) {
                k.onerror = function () {
                    MI.videoThumb(this)
                };
                setTimeout(function () {
                    if (k.load && j)j.style.display = "inline"
                }, 1500)
            } else {
                f.onmouseover = function () {
                    UI.addClass(this, "hover")
                };
                f.onmouseout = function () {
                    UI.removeClass(this, "hover")
                }
            }
            f.onclick = function () {
                MI.TalkList.video && MI.TalkList.video(this, 2);
                return false
            };
            i.onclick = function () {
                MI.TalkList.videoClose();
                return false
            };
            a = b(a.parentNode.parentNode, ".msgCnt")[0];
            if ((a = b(a, ".ico_video")) && a.length > 0) {
                f = 0;
                for (h = a.length; f < h; f++)a[f].onclick = function () {
                    var a = b(this.parentNode.parentNode, ".videoBox")[0];
                    a && a.isOpen ? c.videoClose() : c.video(this, 1);
                    return false
                }
            }
        }
    };
    MI.TalkList.resizePic = function (a) {
        var b = 150, c = 150, g = UI.width(a) || a.width, h = UI.height(a) || a.height, i = a.style, j, k, l, m = false;
        if (j = UI.A(a, "data-resize")) {
            j = j.split(",");
            k = j[0];
            l = j[1] === "1";
            m = !!MI.user.fun.newImgTmpl
        }
        if (m)c = b = k;
        if (g > b || h > c || m) {
            i.visibility = "hidden";
            g = a.style;
            h = "display:inline;visibility:visible;";
            i = a.clientWidth;
            a = a.clientHeight;
            if (!a || !(i < b && a < c && !m)) {
                m = i / a;
                g.cssText = l ? m < b / c ? h + ("height:" + b / m + "px;width:" + b + "px") : h + ("height:" + c + "px;width:" + c * m + "px") : m > b / c ? h + ("height:" + b / m + "px;width:" + b + "px") : h + ("height:" + c + "px;width:" + c * m + "px")
            }
        }
    };
    MI.TalkList.pic = function () {
        var a = this, c = b(a, "img")[0], f, g = a.href, h = a.parentNode, i = UI.hasClass(h, "big");
        if (UI.hasClass(c, "preview"))c = c.nextSibling;
        if (c.loaded) {
            a.blur();
            f = c.nextSibling;
            f.style.display == "none" && UI.toggle(f.nextSibling);
            if (i) {
                var j = UI.getY(f);
                UI.height(f) > UI.windowHeight() && j < UI.scrollY() && setTimeout(function () {
                    window.scrollTo(0, j)
                }, 0);
                MI.mediaMutex && MI.mediaMutex(c, 1)
            } else MI.mediaMutex && MI.mediaMutex(c);
            UI.toggleClass(h, "big bgr2");
            UI.toggleClass(h, "ico_gif_pn");
            if (!UI.hasClass(h, "big")) {
                a.style.width = "auto";
                a.style.height = "auto"
            }
            g = b(a, "img.large")[0];
            if (MI.user.fun.minSizePicCheck) {
                var k;
                g.width && g.width > 460 && (k = 460);
                g.height && g.height > 460 && (k = 460);
                k || (k = Math.max(g.width, g.height));
                if (k < 460) {
                    var l = UI.parents(g, "picBox")[0];
                    l.style.width = k + "px";
                    g.parentNode.style.width = k + "px"
                } else {
                    l = UI.parents(g, "picBox")[0];
                    l.style.width = "460px";
                    g.parentNode.style.width = "460px"
                }
                UI.hasClass(h, "big")
            }
            if (!UI.hasClass(h, "big")) {
                a.style.width = "auto";
                h.style.cssText = ""
            }
            MI.user.fun.checkPicOnSmall && c.parentNode.clientWidth <= 75 && (UI.hasClass(h, "big") ? UI.C(a, "width", "75px") : UI.C(a, "width", "auto"))
        } else {
            MI.mediaMutex && MI.mediaMutex(c);
            if (c.loading)return false;
            c.loading = 1;
            var m = UI.html('<em class="ico_load"></em>')[0];
            m.style.cssText = "width:" + UI.width(a) + "px;height:" + UI.height(a) + "px;";
            UI.prepend(m, a);
            f = UI.DC("img");
            f.className = "large";
            f.r = 0;
            UI.after(f, c);
            f.onload = function () {
                if (!UI.B.ie || this.fileSize || !this.load) {
                    this.load = 1;
                    UI.toggleClass(h, "big bgr2");
                    UI.removeClass(h, "ico_gif_pn");
                    if (MI.user.fun.minSizePicCheck) {
                        var b;
                        this.width && this.width > 460 && (b = 460);
                        this.height && this.height > 460 && (b = 460);
                        b || (b = Math.max(this.width, this.height));
                        if (b < 460) {
                            var g = UI.parents(this, "picBox")[0];
                            g.style.width = b + "px";
                            this.parentNode.style.width = b + "px"
                        } else {
                            g = UI.parents(this, "picBox")[0];
                            g.style.width = "460px";
                            this.parentNode.style.width = "460px"
                        }
                        if (!UI.hasClass(h, "big"))h.style.cssText = ""
                    }
                    c.loading = 0;
                    c.loaded = 1;
                    c.parentNode.blur();
                    UI.remove(m);
                    MI.user.fun.checkPicOnSmall && a.clientWidth <= 75 && (UI.hasClass(h, "big") ? UI.C(a, "width", "75px") : UI.C(a, "width", "auto"));
                    MI.TalkList.picSize(f);
                    this.onload = null
                }
            };
            f.onerror = function () {
                MI.picError(this)
            };
            f.src = g
        }
        if (!i && !c.use) {
            c.use = 1;
            MI.Bos("btnPicBigPreloadUse", "", 0.0010)
        } else MI.Bos(i ? "btnPicSmall" : "btnPicBig", "", 0.01);
        UI.linkEvent("MI.TalkList.resize");
        return false
    };
    MI.TalkList.picEvent = function (a) {
        for (var c = 0, f = a.length; c < f; c++) {
            var g = a[c], h = b(g, "img")[0], i = h.parentNode, j = b(g, ".picTools"), k = "", l = "", m = 0;
            if (!i.href)break;
            var n = UI.parents(i, "msgBox")[0];
            if (n) {
                l = b(n, ".userName a")[0] || b(n, ".msgCnt a")[0];
                n = l.href;
                l = UI.A(l, "gender") || _("他");
                k = "http://t.qq.com/app/qzphoto/" + MI.string.id(n) + "?preview"
            } else m = 1;
            if (j.length)UI.each(j, function (a) {
                var a = a.parentNode, c = b(a, "img")[0];
                UI.removeClass(a, "big bgr2");
                c.src = c.src.replace(/460$/, "160")
            }); else {
                if (!MI.user.fun.wideStyle)MI.tmpl.picTool = ['<div class="tools bor_bg picTools"><a href="#" class="btnBack"><em></em>', _("向左转"), '</a><span>|</span><a href="#" class="btnPrev"><em></em>', _("向右转"), '</a><a href="$Url/2000" class="btnOriginal" target="_blank">', _("查看大图"), "</a></div>"].join("");
                UI.before(UI.html(MI.tmpl.picTool.replace("$Url", i.href.replace(/\/460$/g, "")).replace("$hisUrl", k).replace("$codeUrl", i.href).replace("$Gender", l))[0], i)
            }
            l = b(g, ".picTools .btnMobile");
            MI.user.fun.picCode && l[0] && UI.show(l[0]);
            if (m) {
                UI.hide(b(g, ".picTools .btnMore")[0]);
                l.length && UI.hide(l[0])
            }
            k = UI.html('<img class="preview" crs="' + i.href.replace(/460$/, "160") + '"/>')[0];
            UI.prepend(k, i);
            if (!UI.B.ipad) {
                var p;
                i.onmouseover = function () {
                    var a = UI.A(k, "crs");
                    if (a) {
                        UI.A(k, "src", a);
                        UI.A(k, "crs", "")
                    }
                    if (MI.user.fun.checkBtnOriginalPic) {
                        a = UI.GC(this.parentNode, ".btnOriginal")[0];
                        i.clientWidth < 460 ? UI.C(a, "display", "none") : UI.C(a, "display", "")
                    }
                    UI.addClass(this, "hover");
                    UI.A(this, "hideFocus", "true");
                    clearTimeout(p)
                };
                i.onmouseout = function () {
                    var a = this;
                    p = setTimeout(function () {
                        UI.removeClass(a, "hover")
                    }, 250)
                }
            }
            i.onclick = MI.TalkList.pic;
            if (!UI.B.ie) {
                UI.A(h, "alt", _("[图片]"));
                m = document.createElement("canvas");
                m.id = MI.random() * Math.random() + "C";
                MI.canvas[m.id] = m.getContext("2d");
                if (j) {
                    UI.remove(b(g, "canvas")[0]);
                    UI.remove(b(g, ".large")[0])
                }
                UI.after(m, h);
                UI.A(m, "width", h.width);
                UI.A(m, "height", h.height)
            }
            h.r = 0;
            h.onload = function () {
                MI.TalkList.picLoad.call(this, g)
            };
            b(g, ".btnBack")[0].onclick = b(g, ".btnPrev")[0].onclick = MI.TalkList.picTool
        }
    };
    MI.TalkList.newPicEvent = function (a) {
        var c, f;
        c = 0;
        for (f = a.length; c < f; c++) {
            var g = a[c], h = b(g, "img")[0], i = h.parentNode;
            b(g, ".picTools");
            UI.hasClass(g, "vPic_even");
            var j = UI.hasClass(g, "picB_num1"), k = UI.hasClass(g, "picL_num1"), l = UI.hasClass(g, "picS_num1"), m = UI.A(h, "data-noRotate") == "true" ? true : false;
            UI.EA(i, "click", function (a) {
                var b = UI.A(h, "data-uid");
                b && MI.cPlayer.view(b);
                MI.Bos("btnPicBigSingleImg");
                k && MI.Bos("btnPicBigLongImg");
                a = UI.E(a);
                a.prevent()
            });
            if (UI.A(h, "data-noData") == "true") {
                var m = true, n = function () {
                    m = false;
                    if (UI.width(h) > 430) {
                        UI.C(h, "width", "430px");
                        UI.C(UI.GC(i, ".pic_showAll")[0], "width", "430px")
                    } else UI.width(h) < 140 ? UI.C(UI.GC(i, ".pic_showAll")[0], "width", "140px") : UI.C(UI.GC(i, ".pic_showAll")[0], "width", UI.width(h) + "px");
                    if (UI.width(h) < 66 || UI.height(h) < 66)m = true;
                    if (UI.height(h) > 400) {
                        m = true;
                        UI.C(i, "height", "400px");
                        UI.addClass(i, "longPic");
                        UI.show(UI.GC(i, ".pic_showAll")[0])
                    }
                };
                h.complete ? n() : h.onload = function () {
                    n()
                }
            }
            if (UI.A(h, "data-fixed") == "true")h.style.padding = "0 25px";
            if ((j || l) && !UI.B.ipad) {
                var p = UI.GC(g, ".ui_slideshow_toolbar")[0];
                g.onmouseover = function () {
                    if (!m) {
                        if (!p) {
                            if (!MI.tmpl.newPicTool)MI.tmpl.newPicTool = ['<div class="ui_slideshow_toolbar"><a href="#" class="icon_rotate_left" title="', _("左转"), '"><i></i></a><a href="#" class="icon_rotate_right" title="', _("右转"), '"><i></i></a></div>'].join("");
                            p = UI.html(MI.tmpl.newPicTool)[0];
                            UI.after(p, i)
                        }
                        UI.show(p)
                    }
                };
                g.onmouseout = function () {
                    m || UI.hide(p)
                }
            }
        }
    };
    MI.TalkList.picLoad = function (a) {
        if (!this.load) {
            this.load = 1;
            !UI.B.ie && this.whirl && MI.TalkList.picDraw(this, this.nextSibling);
            this.loaded ? UI.addClass(a, "big bgr2") : UI.hasClass(this.parentNode.lastChild, "ic_gif") && setTimeout(function () {
                UI.addClass(a, "ico_gif_pn")
            }, 200);
            if (!this.loaded && this.width && this.width < 50)this.style.padding = "0 25px"
        }
    };
    MI.TalkList.picTool = function () {
        var a = this.parentNode.parentNode, c = UI.hasClass(this, "btnPrev"), f = b(a, ".shade");
        if (f.length) {
            UI.remove(f[0]);
            UI.removeClass(a, "pic_shade_pn")
        }
        a = b(a, "img");
        MI.TalkList.rotateImg(c, a[a.length - 1]);
        this.blur();
        c ? MI.Bos("btnRightTurn") : MI.Bos("btnLeftTurn");
        return false
    };
    MI.Flash = {version: 0, getObject: function (a, b, c, g, h, i) {
        b = "<object " + (h ? 'id="' + h + '"' : "") + ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + c + '" height="' + g + '" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0"><param name="allowScriptAccess" value="always" /><param name="movie" value="' + b + '" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param value="' + (i || "") + "&langVer=" + window.MILang + '" name="FlashVars" /><embed ' + (h ? 'name="' + h + '"' : "") + ' src="' + b + '" width="' + c + '" height="' + g + '" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="always" FlashVars="' + (i || "") + "&langVer=" + window.MILang + '" type="application/x-shockwave-flash"/></object>';
        if (a)a.innerHTML = b; else return b
    }};
    MI.bannerTips = function (b) {
        if (b = b || MI.bannerTipsCache) {
            var c = b.banner, f = b.newBanner, g = b.tips, h = b.newTips;
            a("talkBox");
            if (c)if (MI.user.fun.showRecommend) {
                UI.hide("homeBannerTip");
                UI.hide("NewGuideBannerTip");
                MI.app("Base", function () {
                    var a = 10, f = setInterval(function () {
                        if (a != 0) {
                            a--;
                            MI.MayBeKnow.returnResult == 1 && clearInterval(f)
                        } else {
                            clearInterval(f);
                            MI.app("utils/banner", function (a) {
                                a.old(c)
                            });
                            delete b.banner;
                            UI.show("NewGuideBannerTip");
                            UI.show("homeBannerTip")
                        }
                    }, 200)
                })
            } else {
                MI.app("utils/banner", function (a) {
                    a.old(c)
                });
                delete b.banner
            }
            if (f) {
                if (MI.user.fun.showRecommend) {
                    UI.hide("NewGuideBannerTip");
                    MI.app("Base", function () {
                        var a = 10, b = setInterval(function () {
                            if (a != 0) {
                                a--;
                                MI.MayBeKnow.returnResult == 1 && clearInterval(b)
                            } else {
                                clearInterval(b);
                                MI.app("utils/banner", function (a) {
                                    a(f)
                                });
                                UI.show("NewGuideBannerTip")
                            }
                        }, 200)
                    })
                } else MI.app("utils/banner", function (a) {
                    a(f)
                });
                delete b.newBanner
            }
            if (g) {
                if (UI.parseUrl().firstin !=
                    null || MI.bannerTips.hasShown == 1)return;
                MI.bannerTips.hasShown = 1;
                MI.app("utils/tip", function (a) {
                    a.old(g);
                    delete b.tips
                })
            }
            if (h) {
                if (UI.parseUrl().firstin != null)return;
                MI.app("utils/tip", function (a) {
                    a(h);
                    delete b.oNewTips
                })
            }
            var i = 5, j = setInterval(function () {
                if (i != 0) {
                    (g || h) && MI.app("utils/tip", function (a) {
                        a.position()
                    });
                    i--
                } else clearInterval(j)
            }, 1E3);
            if (b)MI.bannerTipsCache = b
        }
    };
    var s = "t.qq.com", M = [
        ["${1}", 1],
        ["p/t/${1}${2}", 2]
    ];
    MI.getInternalUrl = function (a) {
        var b, c;
        if (UI.isObject(a)) {
            s = a.base || s;
            M = a.templates || M;
            return""
        }
        if (MI.api.type == 5) {
            s = "z.t.qq.com";
            M = [
                ["mb/qzone/index.html#mod=profile&account=${1}", 1],
                ["mb/qzone/agg.html#id=${1}", 1]
            ]
        }
        theBase = "http://" + s + "/";
        b = M[a];
        c = b[0];
        if (b) {
            var g = 1;
            for (b = b[1]; g <= b; g++)c = c.replace("${"+g+"}", arguments[g] || "");
            return theBase + c
        }
        return""
    };
    MI.config({mi: {"t/mi.App": "App.autoHeight App.qqDownload App.reply App.comment App.relay App.tip App.alert".split(" "), Base: "PV Speed Bos follow changeLang addHover goHome sidePanelUserProfile sidePanelTopicProfile alert tip confirm reply talk chat recom hotLine reFollow message addQQ topic topicDel topicOp updateTopic feedBack buildTip showShieldDialog paneLoad pageLoad pageClick miniPlayer RightFloatAd BotAd sceneId butlerTip bottom videoThumb calcImgInfo Crs.onLoadResize FollowBtn.build dialog.show GoTop.build GoTop.position Card.build cPlayer.show cPlayer.view cPlayer.load2Show tips.build TalkBox.showDraft TalkList.rotateImg TalkList.picDraw TalkList.picSize newCount.setTitle".split(" "), Wide: ["Widget"]}});
    MI.Error = {};
    window.MI_ && MI_();
    MI.newCount.data = {};
    document.titleTmp || (document.titleTmp = document.title);
    MI.host = document.location.host;
    "t.qq.com" == MI.host || "qun.t.qq.com" == MI.host || "event.t.qq.com" == MI.host || "p.t.qq.com" == MI.host ? MI.hostType = 1 : "xy.t.qq.com" == MI.host ? MI.hostType = 2 : "z.t.qq.com" == MI.host ? MI.hostType = 3 : "app.t.qq.com" == MI.host && (MI.hostType = 4);
    MI.versionSet({"lib\/jquery": "1.8.3.3", "lib\/highcharts": "130606", "utils\/addQQ": "130609", "utils\/addNote": "130805", "utils\/tip": "130609", "utils\/banner": "130609", "utils\/getTalk": "130609", "utils\/login": "130704c", "utils\/swipeSch": "130718a", "module\/Page": "130517", "module\/ToggleBox": "130516", "module\/TalkBox.LongWB": "130731", "module\/TalkBox.addFace": "130613", "module\/AreaPicker": "130704", "module\/Animate": "130809", "DatePicker": "130517", "ColorPicker": "110107", "Base": "130809", "Tmpl": "130731", "NewMsgBox": "130730", "MapPop": "120222", "LbsMap": "130226", "WebQQ": "130409b", "WebQQFull": "130409", "Radio": "110905", "FAQBox": "111104", "NonTx": "110318", "TalkBoxRich": "130808d", "Mood": "130725", "Capture": "130322", "TransformST": "110823", "FileUploader": "120222", "TalkListRich": "130807", "TalkListFav": "130701", "TalkListUpdate": "120221", "TalkListShare": "130723", "Scroll": "101111", "QQDownload": "111115b", "Music": "130716", "QQMusicInstance": "111029", "QQMusicPlayer": "130715", "QQMusicWmpPlayer": "110711", "QQMuicHtml5Player": "130715", "Validate": "130517", "ValidateNew": "110920", "Slide": "130322", "PicList": "130731", "PicViewer": "130731a", "RelateSelect": "130802", "City": "111017b", "CityAll": "110802b", "Occupation": "130305", "ItemSelect": "130416", "Message": "130812", "c\/player\/mi.cSlide.player": "130418m", "QmEditor": "130621a", "t\/mi.TalkListTab": "130801a", "c\/mi.cWaterfall": "130627", "c\/mi.cTumblr": "130422", "Task": "130718", "GiftBox": "130812", "Theme": "130715a", "Tag": "130426", "List": "121224", "SettingEdu": "130115", "SettingWork": "121002", "Face": "130427", "Sidebar": "130809", "Wide": "130814", "Vote": "121214", "MicroTopic": "130307", "SubjectPublish": "130128a", "t\/mi.RealWord": "130524", "t\/mi.Widget.admin": "130326", "t\/mi.App": "130712", "t\/mi.TimeAxis": "130612", "p\/mi.TalkPic": "130626", "k\/mi.HotTopic": "130523", "Group": "111228", "QunList": "110804", "_CallOver": "130105", "_ShuoShuoUploader": "121114", "_NewMultiPic": "130626", "_MultiBeautify": "130626", "_Mood": "130422a", "_MoodDemo": "110805", "_MusicRecord": "111101", "_VideoRecord": "111104", "_CameraPhoto": "111001", "_Text2Pic": "110926", "_SinglePhoto": "120621", "_PingtuEditor": "120920", "datePicker": "130514", "colorPicker": "101228", "base": "130808", "mood": "130813", "talkListShare": "120221", "picList": "130507", "picViewer": "130729", "itemSelect": "130314", "message": "130329", "wide": "130813", "apollo": "130725a", "c\/mi.cSlide.tumblr": "120917a", "k\/subscribeTopic": "130407", "p\/medal": "130808b", "p\/guanjia": "130716", "p\/silenceCntPopup": "130507", "r\/qqFriendSelector": "130627", "r\/qqFriendsBanner": "121219", "r\/famousPersonDialog": "121029", "r\/homeRecommendBanner": "121105a", "r\/sFollowDialog": "130509", "r\/qqFriendPush": "130401", "r\/silenceFrdPopup": "130325", "quan\/quanDialog": "130805b", "p\/silenceChnPopup": "130522", "quan\/quanSort": "130723", "quan\/quanRec": "130709", "t\/mi.Cash": "130809a", "t\/mi.Member": "130726a"});
    window._MIVersion && MI.versionSet(_MIVersion);
    window._MIRun && UI.each(_MIRun, function (a) {
        a()
    });
    MIRun = function (a) {
        a()
    };
    UI.ready(function () {
        if (UI.hasClass(document.body, "ipad"))UI.B.ipad = 1;
        if (MI.user.fun) {
            var a = {app: 1, atShield: 0, audioRecord: 0, audioUpload: 0, autoMoreContinue: 1, autoPic: 1, autoTxt2Pic: 1, bannerAd: 0, card: 1, chat: 0, favGroup: 1, goTop: 1, hasThirdAppShield: 1, mergePic: 1, msgBox: 1, newMusic: 1, newRelay2: 1, note: 1, noti: 1, report: 1, search: 1, selfVideo: 1, shortcuts: 1, collect: 0}, b;
            for (b in a)UI.isUndefined(MI.user.fun[b]) && (MI.user.fun[b] = a[b])
        }
        if (MI.api.source)MI.TalkBox.prototype.source = MI.api.source;
        if (MI.isS)if (c) {
            a = MI.json(MI.S({name: "option_load_js", isCross: false}));
            for (b in a)if (UI.isArray(a[b]) && a[b][0] == MI.version._js[b] && MI.version[b]) {
                MI.version[b] = MI.version[b].replace("mat1.gtimg.com/www", a[b][1]);
                MI.version._auto[b] = MI.version[b]
            }
        } else MI.S({name: "option_load_js", value: "", isCross: false});
        MI.appLoad();
        UI.parseUrl();
        if (MI.user.isLab || MI.user.fun.newMusicBox)MI.user.fun.newMusic = 1;
        MI.user.fun.newSinglePicUpload = 1;
        MI.miniPlayer();
        MI.S.iframe()
    });
    if (window.seajs) {
        var P = window.define;
        window.define = function (a, b, c) {
            var g = arguments.length;
            if (g === 1) {
                c = a;
                a = void 0
            } else if (g === 2) {
                c = b;
                b = void 0;
                if (UI.isArray(a)) {
                    b = a;
                    a = void 0
                }
            }
            P(a, b, c)
        };
        if (seajs.on)seajs.on("error", function (a) {
            MI.Bos({name: "btnOnerrorJsFileSeaJS", sBak1: a.uri, sBak2: MI.user.account || "", id: 1210})
        });
        c || seajs.config({base: MI.api.base + "js/"})
    }
})();
/*version:116776*//*  |xGv00|27d372a931e62ffa1f3e5941a4f2bf2b */