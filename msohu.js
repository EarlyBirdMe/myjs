(function(e) {
    String.prototype.trim === e && (String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }), Array.prototype.reduce === e && (Array.prototype.reduce = function(t) {
        if (this === void 0 || this === null) throw new TypeError;
        var n = Object(this),
            r = n.length >>> 0,
            i = 0,
            s;
        if (typeof t != "function") throw new TypeError;
        if (r == 0 && arguments.length == 1) throw new TypeError;
        if (arguments.length >= 2) s = arguments[1];
        else do {
            if (i in n) {
                s = n[i++];
                break
            }
            if (++i >= r) throw new TypeError
        } while (!0);
        while (i < r) i in n && (s = t.call(e, s, n[i], i, n)), i++;
        return s
    })
})();
var Zepto = function() {
        function C(e) {
            return E.call(e) == "[object Function]"
        }
        function k(e) {
            return e instanceof Object
        }
        function L(t) {
            var n, r;
            if (E.call(t) !== "[object Object]") return !1;
            r = C(t.constructor) && t.constructor.prototype;
            if (!r || !hasOwnProperty.call(r, "isPrototypeOf")) return !1;
            for (n in t);
            return n === e || hasOwnProperty.call(t, n)
        }
        function A(e) {
            return e instanceof Array
        }
        function O(e) {
            return typeof e.length == "number"
        }
        function M(t) {
            return t.filter(function(t) {
                return t !== e && t !== null
            })
        }
        function _(e) {
            return e.length > 0 ? [].concat.apply([], e) : e
        }
        function D(e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function P(e) {
            return e in a ? a[e] : a[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
        }
        function H(e, t) {
            return typeof t == "number" && !l[D(e)] ? t + "px" : t
        }
        function B(e) {
            var t, n;
            return u[e] || (t = o.createElement(e), o.body.appendChild(t), n = f(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), u[e] = n), u[e]
        }
        function j(t, r) {
            return r === e ? n(t) : n(t).filter(r)
        }
        function F(e, t, n, r) {
            return C(t) ? t.call(e, n, r) : t
        }
        function I(e, t, r) {
            var i = e % 2 ? t : t.parentNode;
            i ? i.insertBefore(r, e ? e == 1 ? i.firstChild : e == 2 ? t : null : t.nextSibling) : n(r).remove()
        }
        function q(e, t) {
            t(e);
            for (var n in e.childNodes) q(e.childNodes[n], t)
        }
        var e, t, n, r, i = [],
            s = i.slice,
            o = window.document,
            u = {},
            a = {},
            f = o.defaultView.getComputedStyle,
            l = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            },
            c = /^\s*<(\w+|!)[^>]*>/,
            h = [1, 3, 8, 9, 11],
            p = ["after", "prepend", "before", "append"],
            d = o.createElement("table"),
            v = o.createElement("tr"),
            m = {
                tr: o.createElement("tbody"),
                tbody: d,
                thead: d,
                tfoot: d,
                td: v,
                th: v,
                "*": o.createElement("div")
            },
            g = /complete|loaded|interactive/,
            y = /^\.([\w-]+)$/,
            b = /^#([\w-]+)$/,
            w = /^[\w-]+$/,
            E = {}.toString,
            S = {},
            x, T, N = o.createElement("div");
        return S.matches = function(e, t) {
            if (!e || e.nodeType !== 1) return !1;
            var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
            if (n) return n.call(e, t);
            var r, i = e.parentNode,
                s = !i;
            return s && (i = N).appendChild(e), r = ~S.qsa(i, t).indexOf(e), s && N.removeChild(e), r
        }, x = function(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, T = function(e) {
            return e.filter(function(t, n) {
                return e.indexOf(t) == n
            })
        }, S.fragment = function(t, r) {
            r === e && (r = c.test(t) && RegExp.$1), r in m || (r = "*");
            var i = m[r];
            return i.innerHTML = "" + t, n.each(s.call(i.childNodes), function() {
                i.removeChild(this)
            })
        }, S.Z = function(e, t) {
            return e = e || [], e.__proto__ = arguments.callee.prototype, e.selector = t || "", e
        }, S.isZ = function(e) {
            return e instanceof S.Z
        }, S.init = function(t, r) {
            if (!t) return S.Z();
            if (C(t)) return n(o).ready(t);
            if (S.isZ(t)) return t;
            var i;
            if (A(t)) i = M(t);
            else if (L(t)) i = [n.extend({}, t)], t = null;
            else if (h.indexOf(t.nodeType) >= 0 || t === window) i = [t], t = null;
            else if (c.test(t)) i = S.fragment(t.trim(), RegExp.$1), t = null;
            else {
                if (r !== e) return n(r).find(t);
                i = S.qsa(o, t)
            }
            return S.Z(i, t)
        }, n = function(e, t) {
            return S.init(e, t)
        }, n.extend = function(n) {
            return s.call(arguments, 1).forEach(function(r) {
                for (t in r) r[t] !== e && (n[t] = r[t])
            }), n
        }, S.qsa = function(e, t) {
            var n;
            return e === o && b.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : i : e.nodeType !== 1 && e.nodeType !== 9 ? i : s.call(y.test(t) ? e.getElementsByClassName(RegExp.$1) : w.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
        }, n.isFunction = C, n.isObject = k, n.isArray = A, n.isPlainObject = L, n.inArray = function(e, t, n) {
            return i.indexOf.call(t, e, n)
        }, n.trim = function(e) {
            return e.trim()
        }, n.uuid = 0, n.map = function(e, t) {
            var n, r = [],
                i, s;
            if (O(e)) for (i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n);
            else for (s in e) n = t(e[s], s), n != null && r.push(n);
            return _(r)
        }, n.each = function(e, t) {
            var n, r;
            if (O(e)) {
                for (n = 0; n < e.length; n++) if (t.call(e[n], n, e[n]) === !1) return e
            } else for (r in e) if (t.call(e[r], r, e[r]) === !1) return e;
            return e
        }, n.fn = {
            forEach: i.forEach,
            reduce: i.reduce,
            push: i.push,
            indexOf: i.indexOf,
            concat: i.concat,
            map: function(e) {
                return n.map(this, function(t, n) {
                    return e.call(t, n, t)
                })
            },
            slice: function() {
                return n(s.apply(this, arguments))
            },
            ready: function(e) {
                return g.test(o.readyState) ? e(n) : o.addEventListener("DOMContentLoaded", function() {
                    e(n)
                }, !1), this
            },
            get: function(t) {
                return t === e ? s.call(this) : this[t]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    this.parentNode != null && this.parentNode.removeChild(this)
                })
            },
            each: function(e) {
                return this.forEach(function(t, n) {
                    e.call(t, n, t)
                }), this
            },
            filter: function(e) {
                return n([].filter.call(this, function(t) {
                    return S.matches(t, e)
                }))
            },
            add: function(e, t) {
                return n(T(this.concat(n(e, t))))
            },
            is: function(e) {
                return this.length > 0 && S.matches(this[0], e)
            },
            not: function(t) {
                var r = [];
                if (C(t) && t.call !== e) this.each(function(e) {
                    t.call(this, e) || r.push(this)
                });
                else {
                    var i = typeof t == "string" ? this.filter(t) : O(t) && C(t.item) ? s.call(t) : n(t);
                    this.forEach(function(e) {
                        i.indexOf(e) < 0 && r.push(e)
                    })
                }
                return n(r)
            },
            eq: function(e) {
                return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
            },
            first: function() {
                var e = this[0];
                return e && !k(e) ? e : n(e)
            },
            last: function() {
                var e = this[this.length - 1];
                return e && !k(e) ? e : n(e)
            },
            find: function(e) {
                var t;
                return this.length == 1 ? t = S.qsa(this[0], e) : t = this.map(function() {
                    return S.qsa(this, e)
                }), n(t)
            },
            closest: function(e, t) {
                var r = this[0];
                while (r && !S.matches(r, e)) r = r !== t && r !== o && r.parentNode;
                return n(r)
            },
            parents: function(e) {
                var t = [],
                    r = this;
                while (r.length > 0) r = n.map(r, function(e) {
                    if ((e = e.parentNode) && e !== o && t.indexOf(e) < 0) return t.push(e), e
                });
                return j(t, e)
            },
            parent: function(e) {
                return j(T(this.pluck("parentNode")), e)
            },
            children: function(e) {
                return j(this.map(function() {
                    return s.call(this.children)
                }), e)
            },
            siblings: function(e) {
                return j(this.map(function(e, t) {
                    return s.call(t.parentNode.children).filter(function(e) {
                        return e !== t
                    })
                }), e)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(e) {
                return this.map(function() {
                    return this[e]
                })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = null), f(this, "").getPropertyValue("display") == "none" && (this.style.display = B(this.nodeName))
                })
            },
            replaceWith: function(e) {
                return this.before(e).remove()
            },
            wrap: function(e) {
                return this.each(function() {
                    n(this).wrapAll(n(e)[0].cloneNode(!1))
                })
            },
            wrapAll: function(e) {
                return this[0] && (n(this[0]).before(e = n(e)), e.append(this)), this
            },
            unwrap: function() {
                return this.parent().each(function() {
                    n(this).replaceWith(n(this).children())
                }), this
            },
            clone: function() {
                return n(this.map(function() {
                    return this.cloneNode(!0)
                }))
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return (t === e ? this.css("display") == "none" : t) ? this.show() : this.hide()
            },
            prev: function() {
                return n(this.pluck("previousElementSibling"))
            },
            next: function() {
                return n(this.pluck("nextElementSibling"))
            },
            html: function(t) {
                return t === e ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
                    var r = this.innerHTML;
                    n(this).empty().append(F(this, t, e, r))
                })
            },
            text: function(t) {
                return t === e ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                    this.textContent = t
                })
            },
            attr: function(n, r) {
                var i;
                return typeof n == "string" && r === e ? this.length == 0 || this[0].nodeType !== 1 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function(e) {
                    if (this.nodeType !== 1) return;
                    if (k(n)) for (t in n) this.setAttribute(t, n[t]);
                    else this.setAttribute(n, F(this, r, e, this.getAttribute(n)))
                })
            },
            removeAttr: function(e) {
                return this.each(function() {
                    this.nodeType === 1 && this.removeAttribute(e)
                })
            },
            prop: function(t, n) {
                return n === e ? this[0] ? this[0][t] : e : this.each(function(e) {
                    this[t] = F(this, n, e, this[t])
                })
            },
            data: function(t, n) {
                var r = this.attr("data-" + D(t), n);
                return r !== null ? r : e
            },
            val: function(t) {
                return t === e ? this.length > 0 ? this[0].value : e : this.each(function(e) {
                    this.value = F(this, t, e, this.value)
                })
            },
            offset: function() {
                if (this.length == 0) return null;
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: e.width,
                    height: e.height
                }
            },
            css: function(n, r) {
                if (r === e && typeof n == "string") return this.length == 0 ? e : this[0].style[x(n)] || f(this[0], "").getPropertyValue(n);
                var i = "";
                for (t in n) typeof n[t] == "string" && n[t] == "" ? this.each(function() {
                    this.style.removeProperty(D(t))
                }) : i += D(t) + ":" + H(t, n[t]) + ";";
                return typeof n == "string" && (r == "" ? this.each(function() {
                    this.style.removeProperty(D(n))
                }) : i = D(n) + ":" + H(n, r)), this.each(function() {
                    this.style.cssText += ";" + i
                })
            },
            index: function(e) {
                return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(e) {
                return this.length < 1 ? !1 : P(e).test(this[0].className)
            },
            addClass: function(e) {
                return this.each(function(t) {
                    r = [];
                    var i = this.className,
                        s = F(this, e, t, i);
                    s.split(/\s+/g).forEach(function(e) {
                        n(this).hasClass(e) || r.push(e)
                    }, this), r.length && (this.className += (i ? " " : "") + r.join(" "))
                })
            },
            removeClass: function(t) {
                return this.each(function(n) {
                    if (t === e) return this.className = "";
                    r = this.className, F(this, t, n, r).split(/\s+/g).forEach(function(e) {
                        r = r.replace(P(e), " ")
                    }), this.className = r.trim()
                })
            },
            toggleClass: function(t, r) {
                return this.each(function(i) {
                    var s = F(this, t, i, this.className);
                    (r === e ? !n(this).hasClass(s) : r) ? n(this).addClass(s) : n(this).removeClass(s)
                })
            }
        }, ["width", "height"].forEach(function(t) {
            n.fn[t] = function(r) {
                var i, s = t.replace(/./, function(e) {
                    return e[0].toUpperCase()
                });
                return r === e ? this[0] == window ? window["inner" + s] : this[0] == o ? o.documentElement["offset" + s] : (i = this.offset()) && i[t] : this.each(function(e) {
                    var i = n(this);
                    i.css(t, F(this, r, e, i[t]()))
                })
            }
        }), p.forEach(function(e, t) {
            n.fn[e] = function() {
                var e = n.map(arguments, function(e) {
                    return k(e) ? e : S.fragment(e)
                });
                if (e.length < 1) return this;
                var r = this.length,
                    i = r > 1,
                    s = t < 2;
                return this.each(function(n, o) {
                    for (var u = 0; u < e.length; u++) {
                        var a = e[s ? e.length - u - 1 : u];
                        q(a, function(e) {
                            e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && window.eval.call(window, e.innerHTML)
                        }), i && n < r - 1 && (a = a.cloneNode(!0)), I(t, o, a)
                    }
                })
            }, n.fn[t % 2 ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {
                return n(t)[e](this), this
            }
        }), S.Z.prototype = n.fn, S.camelize = x, S.uniq = T, n.zepto = S, n
    }();
window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function(e) {
    function s(e) {
        return e._zid || (e._zid = r++)
    }
    function o(e, t, r, i) {
        t = u(t);
        if (t.ns) var o = a(t.ns);
        return (n[s(e)] || []).filter(function(e) {
            return e && (!t.e || e.e == t.e) && (!t.ns || o.test(e.ns)) && (!r || s(e.fn) === s(r)) && (!i || e.sel == i)
        })
    }
    function u(e) {
        var t = ("" + e).split(".");
        return {
            e: t[0],
            ns: t.slice(1).sort().join(" ")
        }
    }
    function a(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }
    function f(t, n, r) {
        e.isObject(t) ? e.each(t, r) : t.split(/\s/).forEach(function(e) {
            r(e, n)
        })
    }
    function l(t, r, i, o, a, l) {
        l = !! l;
        var c = s(t),
            h = n[c] || (n[c] = []);
        f(r, i, function(n, r) {
            var i = a && a(r, n),
                s = i || r,
                f = function(e) {
                    var n = s.apply(t, [e].concat(e.data));
                    return n === !1 && e.preventDefault(), n
                },
                c = e.extend(u(n), {
                    fn: r,
                    proxy: f,
                    sel: o,
                    del: i,
                    i: h.length
                });
            h.push(c), t.addEventListener(c.e, f, l)
        })
    }
    function c(e, t, r, i) {
        var u = s(e);
        f(t || "", r, function(t, r) {
            o(e, t, r, i).forEach(function(t) {
                delete n[u][t.i], e.removeEventListener(t.e, t.proxy, !1)
            })
        })
    }
    function v(t) {
        var n = e.extend({
            originalEvent: t
        }, t);
        return e.each(d, function(e, r) {
            n[e] = function() {
                return this[r] = h, t[e].apply(t, arguments)
            }, n[r] = p
        }), n
    }
    function m(e) {
        if (!("defaultPrevented" in e)) {
            e.defaultPrevented = !1;
            var t = e.preventDefault;
            e.preventDefault = function() {
                this.defaultPrevented = !0, t.call(this)
            }
        }
    }
    var t = e.zepto.qsa,
        n = {},
        r = 1,
        i = {};
    i.click = i.mousedown = i.mouseup = i.mousemove = "MouseEvents", e.event = {
        add: l,
        remove: c
    }, e.proxy = function(t, n) {
        if (e.isFunction(t)) {
            var r = function() {
                    return t.apply(n, arguments)
                };
            return r._zid = s(t), r
        }
        if (typeof n == "string") return e.proxy(t[n], t);
        throw new TypeError("expected function")
    }, e.fn.bind = function(e, t) {
        return this.each(function() {
            l(this, e, t)
        })
    }, e.fn.unbind = function(e, t) {
        return this.each(function() {
            c(this, e, t)
        })
    }, e.fn.one = function(e, t) {
        return this.each(function(n, r) {
            l(this, e, t, null, function(e, t) {
                return function() {
                    var n = e.apply(r, arguments);
                    return c(r, t, e), n
                }
            })
        })
    };
    var h = function() {
            return !0
        },
        p = function() {
            return !1
        },
        d = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    e.fn.delegate = function(t, n, r) {
        var i = !1;
        if (n == "blur" || n == "focus") e.iswebkit ? n = n == "blur" ? "focusout" : n == "focus" ? "focusin" : n : i = !0;
        return this.each(function(s, o) {
            l(o, n, r, t, function(n) {
                return function(r) {
                    var i, s = e(r.target).closest(t, o).get(0);
                    if (s) return i = e.extend(v(r), {
                        currentTarget: s,
                        liveFired: o
                    }), n.apply(s, [i].concat([].slice.call(arguments, 1)))
                }
            }, i)
        })
    }, e.fn.undelegate = function(e, t, n) {
        return this.each(function() {
            c(this, t, n, e)
        })
    }, e.fn.live = function(t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function(t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function(t, n, r) {
        return n == undefined || e.isFunction(n) ? this.bind(t, n) : this.delegate(n, t, r)
    }, e.fn.off = function(t, n, r) {
        return n == undefined || e.isFunction(n) ? this.unbind(t, n) : this.undelegate(n, t, r)
    }, e.fn.trigger = function(t, n) {
        return typeof t == "string" && (t = e.Event(t)), m(t), t.data = n, this.each(function() {
            "dispatchEvent" in this && this.dispatchEvent(t)
        })
    }, e.fn.triggerHandler = function(t, n) {
        var r, i;
        return this.each(function(s, u) {
            r = v(typeof t == "string" ? e.Event(t) : t), r.data = n, r.target = u, e.each(o(u, t.type || t), function(e, t) {
                i = t.proxy(r);
                if (r.isImmediatePropagationStopped()) return !1
            })
        }), i
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(t) {
        e.fn[t] = function(e) {
            return this.bind(t, e)
        }
    }), ["focus", "blur"].forEach(function(t) {
        e.fn[t] = function(e) {
            if (e) this.bind(t, e);
            else if (this.length) try {
                this.get(0)[t]()
            } catch (n) {}
            return this
        }
    }), e.Event = function(e, t) {
        var n = document.createEvent(i[e] || "Events"),
            r = !0;
        if (t) for (var s in t) s == "bubbles" ? r = !! t[s] : n[s] = t[s];
        return n.initEvent(e, r, !0, null, null, null, null, null, null, null, null, null, null, null, null), n
    }
}(Zepto), function(e) {
    function t(e) {
        var t = this.os = {},
            n = this.browser = {},
            r = e.match(/WebKit\/([\d.]+)/),
            i = e.match(/(Android)[\/\s+]([\d.]+)/),
            s = e.match(/(iPad).*OS\s([\d_]+)/),
            o = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
            u = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            a = u && e.match(/TouchPad/),
            f = e.match(/Kindle\/([\d.]+)/),
            l = e.match(/Silk\/([\d._]+)/),
            c = e.match(/(BlackBerry).*Version\/([\d.]+)/);
        if (n.webkit = !! r) n.version = r[1];
        i && (t.android = !0, t.version = i[2]), o && (t.ios = t.iphone = !0, t.version = o[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), u && (t.webos = !0, t.version = u[2]), a && (t.touchpad = !0), c && (t.blackberry = !0, t.version = c[2]), f && (t.kindle = !0, t.version = f[1]), l && (n.silk = !0, n.version = l[1]), !l && t.android && e.match(/Kindle Fire/) && (n.silk = !0)
    }
    t.call(e, navigator.userAgent), e.__detect = t
}(Zepto), function(e, t) {
    function c(e) {
        return e.toLowerCase()
    }
    function h(e) {
        return r ? r + e : c(e)
    }
    var n = "",
        r, i, s, o = {
            Webkit: "webkit",
            Moz: "",
            O: "o",
            ms: "MS"
        },
        u = window.document,
        a = u.createElement("div"),
        f = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        l = {};
    e.each(o, function(e, i) {
        if (a.style[e + "TransitionProperty"] !== t) return n = "-" + c(e) + "-", r = i, !1
    }), l[n + "transition-property"] = l[n + "transition-duration"] = l[n + "transition-timing-function"] = l[n + "animation-name"] = l[n + "animation-duration"] = "", e.fx = {
        off: r === t && a.style.transitionProperty === t,
        cssPrefix: n,
        transitionEnd: h("TransitionEnd"),
        animationEnd: h("AnimationEnd")
    }, e.fn.animate = function(t, n, r, i) {
        return e.isObject(n) && (r = n.easing, i = n.complete, n = n.duration), n && (n /= 1e3), this.anim(t, n, r, i)
    }, e.fn.anim = function(r, i, s, o) {
        var u, a = {},
            c, h = this,
            p, d = e.fx.transitionEnd;
        i === t && (i = .4), e.fx.off && (i = 0);
        if (typeof r == "string") a[n + "animation-name"] = r, a[n + "animation-duration"] = i + "s", d = e.fx.animationEnd;
        else {
            for (c in r) f.test(c) ? (u || (u = []), u.push(c + "(" + r[c] + ")")) : a[c] = r[c];
            u && (a[n + "transform"] = u.join(" ")), !e.fx.off && typeof r == "object" && (a[n + "transition-property"] = Object.keys(r).join(", "), a[n + "transition-duration"] = i + "s", a[n + "transition-timing-function"] = s || "linear")
        }
        return p = function(t) {
            if (typeof t != "undefined") {
                if (t.target !== t.currentTarget) return;
                e(t.target).unbind(d, arguments.callee)
            }
            e(this).css(l), o && o.call(this)
        }, i > 0 && this.bind(d, p), setTimeout(function() {
            h.css(a), i <= 0 && setTimeout(function() {
                h.each(function() {
                    p.call(this)
                })
            }, 0)
        }, 0), this
    }, a = null
}(Zepto), function($) {
    function triggerAndReturn(e, t, n) {
        var r = $.Event(t);
        return $(e).trigger(r, n), !r.defaultPrevented
    }
    function triggerGlobal(e, t, n, r) {
        if (e.global) return triggerAndReturn(t || document, n, r)
    }
    function ajaxStart(e) {
        e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
    }
    function ajaxStop(e) {
        e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
    }
    function ajaxBeforeSend(e, t) {
        var n = t.context;
        if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
        triggerGlobal(t, n, "ajaxSend", [e, t])
    }
    function ajaxSuccess(e, t, n) {
        var r = n.context,
            i = "success";
        n.success.call(r, e, i, t), triggerGlobal(n, r, "ajaxSuccess", [t, n, e]), ajaxComplete(i, t, n)
    }
    function ajaxError(e, t, n, r) {
        var i = r.context;
        r.error.call(i, n, t, e), triggerGlobal(r, i, "ajaxError", [n, r, e]), ajaxComplete(t, n, r)
    }
    function ajaxComplete(e, t, n) {
        var r = n.context;
        n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
    }
    function empty() {}
    function mimeToDataType(e) {
        return e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
    }
    function appendQuery(e, t) {
        return (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }
    function serializeData(e) {
        isObject(e.data) && (e.data = $.param(e.data)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data))
    }
    function serialize(e, t, n, r) {
        var i = $.isArray(t);
        $.each(t, function(t, s) {
            r && (t = n ? r : r + "[" + (i ? "" : t) + "]"), !r && i ? e.add(s.name, s.value) : (n ? $.isArray(s) : isObject(s)) ? serialize(e, s, n, t) : e.add(t, s)
        })
    }
    var jsonpID = 0,
        isObject = $.isObject,
        document = window.document,
        key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = "application/json",
        htmlType = "text/html",
        blankRE = /^\s*$/;
    $.active = 0, $.ajaxJSONP = function(e) {
        var t = "jsonp" + ++jsonpID,
            n = document.createElement("script"),
            r = function() {
                $(n).remove(), t in window && (window[t] = empty), ajaxComplete("abort", i, e)
            },
            i = {
                abort: r
            },
            s;
        return e.error && (n.onerror = function() {
            i.abort(), e.error()
        }), window[t] = function(r) {
            clearTimeout(s), $(n).remove(), delete window[t], ajaxSuccess(r, i, e)
        }, serializeData(e), n.src = e.url.replace(/=\?/, "=" + t), $("head").append(n), e.timeout > 0 && (s = setTimeout(function() {
            i.abort(), ajaxComplete("timeout", i, e)
        }, e.timeout)), i
    }, $.ajaxSettings = {
        type: "GET",
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0
    }, $.ajax = function(options) {
        var settings = $.extend({}, options || {});
        for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host);
        var dataType = settings.dataType,
            hasPlaceholder = /=\?/.test(settings.url);
        if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")), $.ajaxJSONP(settings);
        settings.url || (settings.url = window.location.toString()), serializeData(settings);
        var mime = settings.accepts[dataType],
            baseHeaders = {},
            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
            xhr = $.ajaxSettings.xhr(),
            abortTimeout;
        settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime));
        if (settings.contentType || settings.data && settings.type.toUpperCase() != "GET") baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded";
        settings.headers = $.extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                    dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText;
                    try {
                        dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : JSON.parse(result))
                    } catch (e) {
                        error = e
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings)
                } else ajaxError(null, "error", xhr, settings)
            }
        };
        var async = "async" in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async);
        for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
        return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function() {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings)
        }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr)
    }, $.get = function(e, t) {
        return $.ajax({
            url: e,
            success: t
        })
    }, $.post = function(e, t, n, r) {
        return $.isFunction(t) && (r = r || n, n = t, t = null), $.ajax({
            type: "POST",
            url: e,
            data: t,
            success: n,
            dataType: r
        })
    }, $.getJSON = function(e, t) {
        return $.ajax({
            url: e,
            success: t,
            dataType: "json"
        })
    }, $.fn.load = function(e, t) {
        if (!this.length) return this;
        var n = this,
            r = e.split(/\s/),
            i;
        return r.length > 1 && (e = r[0], i = r[1]), $.get(e, function(e) {
            n.html(i ? $(document.createElement("div")).html(e.replace(rscript, "")).find(i).html() : e), t && t.call(n)
        }), this
    };
    var escape = encodeURIComponent;
    $.param = function(e, t) {
        var n = [];
        return n.add = function(e, t) {
            this.push(escape(e) + "=" + escape(t))
        }, serialize(n, e, t), n.join("&").replace("%20", "+")
    }
}(Zepto), function(e) {
    e.fn.serializeArray = function() {
        var t = [],
            n;
        return e(Array.prototype.slice.call(this.get(0).elements)).each(function() {
            n = e(this);
            var r = n.attr("type");
            this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
                name: n.attr("name"),
                value: n.val()
            })
        }), t
    }, e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function(t) {
        if (t) this.bind("submit", t);
        else if (this.length) {
            var n = e.Event("submit");
            this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()
        }
        return this
    }
}(Zepto), function(e) {
    function u(e) {
        return "tagName" in e ? e : e.parentNode
    }
    function a(e, t, n, r) {
        var i = Math.abs(e - t),
            s = Math.abs(n - r);
        return i >= s ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
    }
    function f() {
        o = null, t.last && (t.el.trigger("longTap"), t = {})
    }
    function l() {
        o && clearTimeout(o), o = null
    }
    function c() {
        n && clearTimeout(n), r && clearTimeout(r), i && clearTimeout(i), o && clearTimeout(o), n = r = i = o = null, t = {}
    }
    var t = {},
        n, r, i, s = 750,
        o;
    e(document).ready(function() {
        var h, p;
        e(document.body).bind("touchstart", function(r) {
            h = Date.now(), p = h - (t.last || h), t.el = e(u(r.touches[0].target)), n && clearTimeout(n), t.x1 = r.touches[0].pageX, t.y1 = r.touches[0].pageY, p > 0 && p <= 250 && (t.isDoubleTap = !0), t.last = h, o = setTimeout(f, s)
        }).bind("touchmove", function(n) {
            l(), t.x2 = n.touches[0].pageX, t.y2 = n.touches[0].pageY, e.os.android && Math.abs(t.x1 - t.x2) > 20 && n.preventDefault()
        }).bind("touchend", function(s) {
            l(), t.x2 && Math.abs(t.x1 - t.x2) > 30 || t.y2 && Math.abs(t.y1 - t.y2) > 75 ? i = setTimeout(function() {
                t.el && t.el.trigger("swipe"), t.el && t.el.trigger("swipe" + a(t.x1, t.x2, t.y1, t.y2)), t = {}
            }, 0) : "last" in t && (r = setTimeout(function() {
                var r = e.Event("tap");
                r.cancelTouch = c, t.el && t.el.trigger(r), t.isDoubleTap ? (t.el && t.el.trigger("doubleTap"), t = {}) : n = setTimeout(function() {
                    n = null, t.el && t.el.trigger("singleTap"), t = {}
                }, 250)
            }, 0))
        }).bind("touchcancel", c), e.os.android && e(window).bind("scroll", c)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) {
        e.fn[t] = function(e) {
            return this.bind(t, e)
        }
    })
}(Zepto);
var template = function(e, t) {
        return template[typeof t == "object" ? "render" : "compile"].apply(template, arguments)
    };
(function(e, t) {
    "use strict";
    e.version = "1.1.0", e.openTag = "<%", e.closeTag = "%>", e.parser = null, e.render = function(e, t) {
        var n = l(e);
        return n === undefined ? c({
            id: e,
            name: "Render Error",
            message: "Not Cache"
        }) : n(t)
    }, e.compile = function(t, r) {
        function u(n) {
            try {
                return (new s(n)).template
            } catch (o) {
                return i ? (o.id = t || r, o.name = "Render Error", o.source = r, c(o)) : e.compile(t, r, !0)(n)
            }
        }
        var i = arguments[2];
        typeof r != "string" && (i = r, r = t, t = null);
        try {
            var s = f(r, i)
        } catch (o) {
            return o.id = t || r, o.name = "Syntax Error", c(o)
        }
        return u.prototype = s.prototype, u.toString = function() {
            return s.toString()
        }, t && (n[t] = u), u
    }, e.helper = function(e, t) {
        a[e] = t
    };
    var n = {},
        r = "".trim,
        i = r && !t.document,
        s = {},
        o = function() {
            var e = Array.prototype.forEach ||
            function(e, t) {
                var n = this.length >>> 0;
                for (var r = 0; r < n; r++) r in this && e.call(t, this[r], r, this)
            };
            return function(t, n) {
                e.call(t, n)
            }
        }(),
        u = Object.create ||
    function(e) {
        function t() {}
        return t.prototype = e, new t
    }, a = e.prototype = {
        $forEach: o,
        $render: e.render,
        $getValue: function(e) {
            return e === undefined ? "" : e
        }
    };
    o("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","), function(e) {
        s[e] = !0
    });
    var f = function(t, n) {
            function S(e) {
                return p += e.split(/\n/).length - 1, e = e.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"), e = g[1] + "'" + e + "'" + g[2], e + "\n"
            }
            function x(e) {
                var t = p;
                return l ? e = l(e) : n && (e = e.replace(/\n/g, function() {
                    return p++, "$line=" + p + ";"
                })), e.indexOf("=") === 0 && (e = g[1] + (r ? "$getValue(" : "") + e.substring(1).replace(/[\s;]*$/, "") + (r ? ")" : "") + g[2]), n && (e = "$line=" + t + ";" + e), T(e), e + "\n"
            }
            function T(e) {
                e = e.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, ""), o(e.split(/[^\$\w\d]+/), function(e) {
                    if (/^this$/.test(e)) throw {
                        message: 'Prohibit the use of the "' + e + '"'
                    };
                    if (!e || s.hasOwnProperty(e) || /^\d/.test(e)) return;
                    v.hasOwnProperty(e) || (N(e), v[e] = !0)
                })
            }
            function N(e) {
                var t;
                e === "include" ? t = y : a.hasOwnProperty(e) ? t = "$helpers." + e : t = "$data." + e, m += e + "=" + t + ","
            }
            var i = e.openTag,
                f = e.closeTag,
                l = e.parser,
                c = t,
                h = "",
                p = 1,
                d = {},
                v = {
                    $out: !0,
                    $line: !0
                },
                m = "var $helpers=this," + (n ? "$line=0," : ""),
                g = r ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                y = "function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}";
            o(c.split(i), function(e, t) {
                e = e.split(f);
                var n = e[0],
                    r = e[1];
                e.length === 1 ? h += S(n) : (h += x(n), r && (h += S(r)))
            }), c = h, n && (c = "try{" + c + "}catch(e){" + "e.line=$line;" + "throw e" + "}"), c = m + g[0] + c + "this.template=" + g[3];
            try {
                var b = new Function("$data", c),
                    w = b.prototype = u(a);
                return w.toString = function() {
                    return this.template
                }, b
            } catch (E) {
                throw E.temp = "function anonymous($data) {" + c + "}", E
            }
        },
        l = function(t) {
            var r = n[t];
            if (r === undefined && !i) {
                var s = document.getElementById(t);
                return s && e.compile(t, s.value || s.innerHTML), n[t]
            }
            if (n.hasOwnProperty(t)) return r
        },
        c = function(e) {
            function r() {
                return r + ""
            }
            var n = "[template]:\n" + e.id + "\n\n[name]:\n" + e.name;
            return e.message && (n += "\n\n[message]:\n" + e.message), e.line && (n += "\n\n[line]:\n" + e.line, n += "\n\n[source]:\n" + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, "")), e.temp && (n += "\n\n[temp]:\n" + e.temp), t.console && console.error(n), r.toString = function() {
                return "{Template Error}"
            }, r
        }
})(template, this), typeof module != "undefined" && module.exports && (module.exports = template), function(e, t) {
    function A(e) {
        return i === "" ? e : (e = e.charAt(0).toUpperCase() + e.substr(1), i + e)
    }
    var n = Math,
        r = t.createElement("div").style,
        i = function() {
            var e = "t,webkitT,MozT,msT,OT".split(","),
                t, n = 0,
                i = e.length;
            for (; n < i; n++) {
                t = e[n] + "ransform";
                if (t in r) return e[n].substr(0, e[n].length - 1)
            }
            return !1
        }(),
        s = i ? "-" + i.toLowerCase() + "-" : "",
        o = A("transform"),
        u = A("transitionProperty"),
        a = A("transitionDuration"),
        f = A("transformOrigin"),
        l = A("transitionTimingFunction"),
        c = A("transitionDelay"),
        h = /android/gi.test(navigator.appVersion),
        p = /iphone|ipad/gi.test(navigator.appVersion),
        d = /hp-tablet/gi.test(navigator.appVersion),
        v = A("perspective") in r,
        m = "ontouchstart" in e && !d,
        g = i !== !1,
        y = A("transition") in r,
        b = "onorientationchange" in e ? "orientationchange" : "resize",
        w = m ? "touchstart" : "mousedown",
        E = m ? "touchmove" : "mousemove",
        S = m ? "touchend" : "mouseup",
        x = m ? "touchcancel" : "mouseup",
        T = function() {
            if (i === !1) return !1;
            var e = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return e[i]
        }(),
        N = function() {
            return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
            function(e) {
                return setTimeout(e, 1)
            }
        }(),
        C = function() {
            return e.cancelRequestAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame || e.mozCancelRequestAnimationFrame || e.oCancelRequestAnimationFrame || e.msCancelRequestAnimationFrame || clearTimeout
        }(),
        k = v ? " translateZ(0)" : "",
        L = function(n, r) {
            var i = this,
                c;
            i.wrapper = typeof n == "object" ? n : t.getElementById(n), i.wrapper.style.overflow = "hidden", i.scroller = i.wrapper.children[0], i.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: h,
                hideScrollbar: p,
                fadeScrollbar: p && v,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function(e) {
                    e.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (c in r) i.options[c] = r[c];
            i.x = i.options.x, i.y = i.options.y, i.options.useTransform = g && i.options.useTransform, i.options.hScrollbar = i.options.hScroll && i.options.hScrollbar, i.options.vScrollbar = i.options.vScroll && i.options.vScrollbar, i.options.zoom = i.options.useTransform && i.options.zoom, i.options.useTransition = y && i.options.useTransition, i.options.zoom && h && (k = ""), i.scroller.style[u] = i.options.useTransform ? s + "transform" : "top left", i.scroller.style[a] = "0", i.scroller.style[f] = "0 0", i.options.useTransition && (i.scroller.style[l] = "cubic-bezier(0.33,0.66,0.66,1)"), i.options.useTransform ? i.scroller.style[o] = "translate(" + parseInt(i.x, 10) + "px," + parseInt(i.y, 10) + "px)" + k : i.scroller.style.cssText += ";position:absolute;top:" + parseInt(i.y, 10) + "px;left:" + parseInt(i.x, 10) + "px", i.options.useTransition && (i.options.fixedScrollbar = !0), i.refresh(), i._bind(b, e), i._bind(w), m || i.options.wheelAction != "none" && (i._bind("DOMMouseScroll"), i._bind("mousewheel")), i.options.checkDOMChanges && (i.checkDOMTime = setInterval(function() {
                i._checkDOMChanges()
            }, 500))
        };
    L.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(e) {
            var t = this;
            switch (e.type) {
            case w:
                if (!m && e.button !== 0) return;
                t._start(e);
                break;
            case E:
                t._move(e);
                break;
            case S:
            case x:
                t._end(e);
                break;
            case b:
                t._resize();
                break;
            case "DOMMouseScroll":
            case "mousewheel":
                t._wheel(e);
                break;
            case T:
                t._transitionEnd(e)
            }
        },
        _checkDOMChanges: function() {
            if (this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale) return;
            this.refresh()
        },
        _scrollbar: function(e) {
            var r = this,
                i;
            if (!r[e + "Scrollbar"]) {
                r[e + "ScrollbarWrapper"] && (g && (r[e + "ScrollbarIndicator"].style[o] = ""), r[e + "ScrollbarWrapper"].parentNode.removeChild(r[e + "ScrollbarWrapper"]), r[e + "ScrollbarWrapper"] = null, r[e + "ScrollbarIndicator"] = null);
                return
            }
            r[e + "ScrollbarWrapper"] || (i = t.createElement("div"), r.options.scrollbarClass ? i.className = r.options.scrollbarClass + e.toUpperCase() : i.style.cssText = "position:absolute;z-index:100;" + (e == "h" ? "height:7px;bottom:1px;left:2px;right:" + (r.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (r.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:opacity;" + s + "transition-duration:" + (r.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (r.options.hideScrollbar ? "0" : "1"), r.wrapper.appendChild(i), r[e + "ScrollbarWrapper"] = i, i = t.createElement("div"), r.options.scrollbarClass || (i.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + s + "background-clip:padding-box;" + s + "box-sizing:border-box;" + (e == "h" ? "height:100%" : "width:100%") + ";" + s + "border-radius:3px;border-radius:3px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:" + s + "transform;" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + s + "transition-duration:0;" + s + "transform: translate(0,0)" + k, r.options.useTransition && (i.style.cssText += ";" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), r[e + "ScrollbarWrapper"].appendChild(i), r[e + "ScrollbarIndicator"] = i), e == "h" ? (r.hScrollbarSize = r.hScrollbarWrapper.clientWidth, r.hScrollbarIndicatorSize = n.max(n.round(r.hScrollbarSize * r.hScrollbarSize / r.scrollerW), 8), r.hScrollbarIndicator.style.width = r.hScrollbarIndicatorSize + "px", r.hScrollbarMaxScroll = r.hScrollbarSize - r.hScrollbarIndicatorSize, r.hScrollbarProp = r.hScrollbarMaxScroll / r.maxScrollX) : (r.vScrollbarSize = r.vScrollbarWrapper.clientHeight, r.vScrollbarIndicatorSize = n.max(n.round(r.vScrollbarSize * r.vScrollbarSize / r.scrollerH), 8), r.vScrollbarIndicator.style.height = r.vScrollbarIndicatorSize + "px", r.vScrollbarMaxScroll = r.vScrollbarSize - r.vScrollbarIndicatorSize, r.vScrollbarProp = r.vScrollbarMaxScroll / r.maxScrollY), r._scrollbarPos(e, !0)
        },
        _resize: function() {
            var e = this;
            e.resizeLocked !== !0 && setTimeout(function() {
                e.refresh()
            }, h ? 200 : 0)
        },
        _pos: function(e, t) {
            if (this.zoomed) return;
            e = parseInt(e, 10), t = parseInt(t, 10), e = this.hScroll ? e : 0, t = this.vScroll ? t : 0, this.options.useTransform ? this.scroller.style[o] = "translate(" + e + "px," + t + "px) scale(" + this.scale + ")" + k : (e = n.round(e), t = n.round(t), this.scroller.style.left = e + "px", this.scroller.style.top = t + "px"), this.x = e, this.y = t, this._scrollbarPos("h"), this._scrollbarPos("v")
        },
        _scrollbarPos: function(e, t) {
            var r = this,
                i = e == "h" ? r.x : r.y,
                s;
            if (!r[e + "Scrollbar"]) return;
            i = r[e + "ScrollbarProp"] * i, i < 0 ? (r.options.fixedScrollbar || (s = r[e + "ScrollbarIndicatorSize"] + n.round(i * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px"), i = 0) : i > r[e + "ScrollbarMaxScroll"] && (r.options.fixedScrollbar ? i = r[e + "ScrollbarMaxScroll"] : (s = r[e + "ScrollbarIndicatorSize"] - n.round((i - r[e + "ScrollbarMaxScroll"]) * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px", i = r[e + "ScrollbarMaxScroll"] + (r[e + "ScrollbarIndicatorSize"] - s))), r[e + "ScrollbarWrapper"].style[c] = "0", r[e + "ScrollbarWrapper"].style.opacity = t && r.options.hideScrollbar ? "0" : "1", r[e + "ScrollbarIndicator"].style[o] = "translate(" + (e == "h" ? parseInt(i, 10) + "px,0)" : "0," + parseInt(i, 10) + "px)") + k
        },
        _start: function(t) {
            var r = this,
                i = m ? t.touches[0] : t,
                s, u, a, f, l;
            if (!r.enabled) return;
            if (r.options.onBeforeScrollStart && r.options.onBeforeScrollStart.call(r, t) === !1) return;
            (r.options.useTransition || r.options.zoom) && r._transitionTime(0), r.moved = !1, r.animating = !1, r.zoomed = !1, r.distX = 0, r.distY = 0, r.absDistX = 0, r.absDistY = 0, r.dirX = 0, r.dirY = 0, r.options.zoom && m && t.touches.length > 1 && (f = n.abs(t.touches[0].pageX - t.touches[1].pageX), l = n.abs(t.touches[0].pageY - t.touches[1].pageY), r.touchesDistStart = n.sqrt(f * f + l * l), r.originX = n.abs(t.touches[0].pageX + t.touches[1].pageX - r.wrapperOffsetLeft * 2) / 2 - r.x, r.originY = n.abs(t.touches[0].pageY + t.touches[1].pageY - r.wrapperOffsetTop * 2) / 2 - r.y, r.options.onZoomStart && r.options.onZoomStart.call(r, t));
            if (r.options.momentum) {
                r.options.useTransform ? (s = getComputedStyle(r.scroller, null)[o].replace(/[^0-9\-.,]/g, "").split(","), u = +(s[12] || s[4]), a = +(s[13] || s[5])) : (u = +getComputedStyle(r.scroller, null).left.replace(/[^0-9-]/g, ""), a = +getComputedStyle(r.scroller, null).top.replace(/[^0-9-]/g, ""));
                if (u != r.x || a != r.y) r.options.useTransition ? r._unbind(T) : C(r.aniTime), r.steps = [], r._pos(u, a), r.options.onScrollEnd && r.options.onScrollEnd.call(r)
            }
            r.absStartX = r.x, r.absStartY = r.y, r.startX = r.x, r.startY = r.y, r.pointX = i.pageX, r.pointY = i.pageY, r.startTime = t.timeStamp || Date.now(), r.options.onScrollStart && r.options.onScrollStart.call(r, t), r._bind(E, e), r._bind(S, e), r._bind(x, e)
        },
        _move: function(e) {
            var t = this,
                r = m ? e.touches[0] : e,
                i = r.pageX - t.pointX,
                s = r.pageY - t.pointY,
                u = t.x + i,
                a = t.y + s,
                f, l, c, h = e.timeStamp || Date.now();
            if (t.options.onBeforeScrollMove && t.options.onBeforeScrollMove.call(t, e) === !1) return;
            if (t.options.zoom && m && e.touches.length > 1) {
                f = n.abs(e.touches[0].pageX - e.touches[1].pageX), l = n.abs(e.touches[0].pageY - e.touches[1].pageY), t.touchesDist = n.sqrt(f * f + l * l), t.zoomed = !0, c = 1 / t.touchesDistStart * t.touchesDist * this.scale, c < t.options.zoomMin ? c = .5 * t.options.zoomMin * Math.pow(2, c / t.options.zoomMin) : c > t.options.zoomMax && (c = 2 * t.options.zoomMax * Math.pow(.5, t.options.zoomMax / c)), t.lastScale = c / this.scale, u = this.originX - this.originX * t.lastScale + this.x, a = this.originY - this.originY * t.lastScale + this.y, u = parseInt(u, 10), a = parseInt(a, 10), this.scroller.style[o] = "translate(" + u + "px," + a + "px) scale(" + c + ")" + k, t.options.onZoom && t.options.onZoom.call(t, e);
                return
            }
            t.pointX = r.pageX, t.pointY = r.pageY;
            if (u > 0 || u < t.maxScrollX) u = t.options.bounce ? t.x + i / 2 : u >= 0 || t.maxScrollX >= 0 ? 0 : t.maxScrollX;
            if (a > t.minScrollY || a < t.maxScrollY) a = t.options.bounce ? t.y + s / 2 : a >= t.minScrollY || t.maxScrollY >= 0 ? t.minScrollY : t.maxScrollY;
            t.distX += i, t.distY += s, t.absDistX = n.abs(t.distX), t.absDistY = n.abs(t.distY);
            if (t.absDistX < 6 && t.absDistY < 6) return;
            t.options.lockDirection && (t.absDistX > t.absDistY + 5 ? (a = t.y, s = 0) : t.absDistY > t.absDistX + 5 && (u = t.x, i = 0)), t.moved = !0, t._pos(u, a), t.dirX = i > 0 ? -1 : i < 0 ? 1 : 0, t.dirY = s > 0 ? -1 : s < 0 ? 1 : 0, h - t.startTime > 300 && (t.startTime = h, t.startX = t.x, t.startY = t.y), t.options.onScrollMove && t.options.onScrollMove.call(t, e)
        },
        _end: function(r) {
            if (m && r.touches.length !== 0) return;
            var i = this,
                s = m ? r.changedTouches[0] : r,
                u, f, l = {
                    dist: 0,
                    time: 0
                },
                c = {
                    dist: 0,
                    time: 0
                },
                h = (r.timeStamp || Date.now()) - i.startTime,
                p = i.x,
                d = i.y,
                v, g, y, b, w;
            i._unbind(E, e), i._unbind(S, e), i._unbind(x, e);
            if (i.options.onBeforeScrollEnd && i.options.onBeforeScrollEnd.call(i, r) === !1) return;
            if (i.zoomed) {
                w = i.scale * i.lastScale, w = Math.max(i.options.zoomMin, w), w = Math.min(i.options.zoomMax, w), i.lastScale = w / i.scale, i.scale = w, i.x = i.originX - i.originX * i.lastScale + i.x, i.y = i.originY - i.originY * i.lastScale + i.y, i.scroller.style[a] = "200ms", i.scroller.style[o] = "translate(" + parseInt(i.x, 10) + "px," + parseInt(i.y, 10) + "px) scale(" + i.scale + ")" + k, i.zoomed = !1, i.refresh(), i.options.onZoomEnd && i.options.onZoomEnd.call(i, r);
                return
            }
            if (!i.moved) {
                m && (i.doubleTapTimer && i.options.zoom ? (clearTimeout(i.doubleTapTimer), i.doubleTapTimer = null, i.options.onZoomStart && i.options.onZoomStart.call(i, r), i.zoom(i.pointX, i.pointY, i.scale == 1 ? i.options.doubleTapZoom : 1), i.options.onZoomEnd && setTimeout(function() {
                    i.options.onZoomEnd.call(i, r)
                }, 200)) : this.options.handleClick && (i.doubleTapTimer = setTimeout(function() {
                    i.doubleTapTimer = null, u = s.target;
                    while (u.nodeType != 1) u = u.parentNode;
                    u.tagName != "SELECT" && u.tagName != "INPUT" && u.tagName != "TEXTAREA" && (f = t.createEvent("MouseEvents"), f.initMouseEvent("click", !0, !0, r.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null), f._fake = !0, u.dispatchEvent(f))
                }, i.options.zoom ? 250 : 0))), i._resetPos(200), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
                return
            }
            if (h < 300 && i.options.momentum) {
                l = p ? i._momentum(p - i.startX, h, -i.x, i.scrollerW - i.wrapperW + i.x, i.options.bounce ? i.wrapperW : 0) : l, c = d ? i._momentum(d - i.startY, h, -i.y, i.maxScrollY < 0 ? i.scrollerH - i.wrapperH + i.y - i.minScrollY : 0, i.options.bounce ? i.wrapperH : 0) : c, p = i.x + l.dist, d = i.y + c.dist;
                if (i.x > 0 && p > 0 || i.x < i.maxScrollX && p < i.maxScrollX) l = {
                    dist: 0,
                    time: 0
                };
                if (i.y > i.minScrollY && d > i.minScrollY || i.y < i.maxScrollY && d < i.maxScrollY) c = {
                    dist: 0,
                    time: 0
                }
            }
            if (l.dist || c.dist) {
                y = n.max(n.max(l.time, c.time), 10), i.options.snap && (v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(p, d), p = b.x, d = b.y, y = n.max(b.time, y))), i.scrollTo(n.round(p), n.round(d), y), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
                return
            }
            if (i.options.snap) {
                v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(i.x, i.y), (b.x != i.x || b.y != i.y) && i.scrollTo(b.x, b.y, b.time)), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
                return
            }
            i._resetPos(200), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r)
        },
        _resetPos: function(e) {
            var t = this,
                n = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x,
                r = t.y >= t.minScrollY || t.maxScrollY > 0 ? t.minScrollY : t.y < t.maxScrollY ? t.maxScrollY : t.y;
            if (n == t.x && r == t.y) {
                t.moved && (t.moved = !1, t.options.onScrollEnd && t.options.onScrollEnd.call(t)), t.hScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.hScrollbarWrapper.style[c] = "300ms"), t.hScrollbarWrapper.style.opacity = "0"), t.vScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.vScrollbarWrapper.style[c] = "300ms"), t.vScrollbarWrapper.style.opacity = "0");
                return
            }
            t.scrollTo(n, r, e || 0)
        },
        _wheel: function(e) {
            var t = this,
                n, r, i, s, o;
            if ("wheelDeltaX" in e) n = e.wheelDeltaX / 12, r = e.wheelDeltaY / 12;
            else if ("wheelDelta" in e) n = r = e.wheelDelta / 12;
            else {
                if (!("detail" in e)) return;
                n = r = -e.detail * 3
            }
            if (t.options.wheelAction == "zoom") {
                o = t.scale * Math.pow(2, 1 / 3 * (r ? r / Math.abs(r) : 0)), o < t.options.zoomMin && (o = t.options.zoomMin), o > t.options.zoomMax && (o = t.options.zoomMax), o != t.scale && (!t.wheelZoomCount && t.options.onZoomStart && t.options.onZoomStart.call(t, e), t.wheelZoomCount++, t.zoom(e.pageX, e.pageY, o, 400), setTimeout(function() {
                    t.wheelZoomCount--, !t.wheelZoomCount && t.options.onZoomEnd && t.options.onZoomEnd.call(t, e)
                }, 400));
                return
            }
            i = t.x + n, s = t.y + r, i > 0 ? i = 0 : i < t.maxScrollX && (i = t.maxScrollX), s > t.minScrollY ? s = t.minScrollY : s < t.maxScrollY && (s = t.maxScrollY), t.maxScrollY < 0 && t.scrollTo(i, s, 0)
        },
        _transitionEnd: function(e) {
            var t = this;
            if (e.target != t.scroller) return;
            t._unbind(T), t._startAni()
        },
        _startAni: function() {
            var e = this,
                t = e.x,
                r = e.y,
                i = Date.now(),
                s, o, u;
            if (e.animating) return;
            if (!e.steps.length) {
                e._resetPos(400);
                return
            }
            s = e.steps.shift(), s.x == t && s.y == r && (s.time = 0), e.animating = !0, e.moved = !0;
            if (e.options.useTransition) {
                e._transitionTime(s.time), e._pos(s.x, s.y), e.animating = !1, s.time ? e._bind(T) : e._resetPos(0);
                return
            }
            u = function() {
                var a = Date.now(),
                    f, l;
                if (a >= i + s.time) {
                    e._pos(s.x, s.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), e._startAni();
                    return
                }
                a = (a - i) / s.time - 1, o = n.sqrt(1 - a * a), f = (s.x - t) * o + t, l = (s.y - r) * o + r, e._pos(f, l), e.animating && (e.aniTime = N(u))
            }, u()
        },
        _transitionTime: function(e) {
            e += "ms", this.scroller.style[a] = e, this.hScrollbar && (this.hScrollbarIndicator.style[a] = e), this.vScrollbar && (this.vScrollbarIndicator.style[a] = e)
        },
        _momentum: function(e, t, r, i, s) {
            var o = 6e-4,
                u = n.abs(e) / t,
                a = u * u / (2 * o),
                f = 0,
                l = 0;
            return e > 0 && a > r ? (l = s / (6 / (a / u * o)), r += l, u = u * r / a, a = r) : e < 0 && a > i && (l = s / (6 / (a / u * o)), i += l, u = u * i / a, a = i), a *= e < 0 ? -1 : 1, f = u / o, {
                dist: a,
                time: n.round(f)
            }
        },
        _offset: function(e) {
            var t = -e.offsetLeft,
                n = -e.offsetTop;
            while (e = e.offsetParent) t -= e.offsetLeft, n -= e.offsetTop;
            return e != this.wrapper && (t *= this.scale, n *= this.scale), {
                left: t,
                top: n
            }
        },
        _snap: function(e, t) {
            var r = this,
                i, s, o, u, a, f;
            o = r.pagesX.length - 1;
            for (i = 0, s = r.pagesX.length; i < s; i++) if (e >= r.pagesX[i]) {
                o = i;
                break
            }
            o == r.currPageX && o > 0 && r.dirX < 0 && o--, e = r.pagesX[o], a = n.abs(e - r.pagesX[r.currPageX]), a = a ? n.abs(r.x - e) / a * 500 : 0, r.currPageX = o, o = r.pagesY.length - 1;
            for (i = 0; i < o; i++) if (t >= r.pagesY[i]) {
                o = i;
                break
            }
            return o == r.currPageY && o > 0 && r.dirY < 0 && o--, t = r.pagesY[o], f = n.abs(t - r.pagesY[r.currPageY]), f = f ? n.abs(r.y - t) / f * 500 : 0, r.currPageY = o, u = n.round(n.max(a, f)) || 200, {
                x: e,
                y: t,
                time: u
            }
        },
        _bind: function(e, t, n) {
            (t || this.scroller).addEventListener(e, this, !! n)
        },
        _unbind: function(e, t, n) {
            (t || this.scroller).removeEventListener(e, this, !! n)
        },
        destroy: function() {
            var t = this;
            t.scroller.style[o] = "", t.hScrollbar = !1, t.vScrollbar = !1, t._scrollbar("h"), t._scrollbar("v"), t._unbind(b, e), t._unbind(w), t._unbind(E, e), t._unbind(S, e), t._unbind(x, e), t.options.hasTouch || (t._unbind("DOMMouseScroll"), t._unbind("mousewheel")), t.options.useTransition && t._unbind(T), t.options.checkDOMChanges && clearInterval(t.checkDOMTime), t.options.onDestroy && t.options.onDestroy.call(t)
        },
        refresh: function() {
            var e = this,
                t, r, i, s, o = 0,
                u = 0;
            e.scale < e.options.zoomMin && (e.scale = e.options.zoomMin), e.wrapperW = e.wrapper.clientWidth || 1, e.wrapperH = e.wrapper.clientHeight || 1, e.minScrollY = -e.options.topOffset || 0, e.scrollerW = n.round(e.scroller.offsetWidth * e.scale), e.scrollerH = n.round((e.scroller.offsetHeight + e.minScrollY) * e.scale), e.maxScrollX = e.wrapperW - e.scrollerW, e.maxScrollY = e.wrapperH - e.scrollerH + e.minScrollY, e.dirX = 0, e.dirY = 0, e.options.onRefresh && e.options.onRefresh.call(e), e.hScroll = e.options.hScroll && e.maxScrollX < 0, e.vScroll = e.options.vScroll && (!e.options.bounceLock && !e.hScroll || e.scrollerH > e.wrapperH), e.hScrollbar = e.hScroll && e.options.hScrollbar, e.vScrollbar = e.vScroll && e.options.vScrollbar && e.scrollerH > e.wrapperH, t = e._offset(e.wrapper), e.wrapperOffsetLeft = -t.left, e.wrapperOffsetTop = -t.top;
            if (typeof e.options.snap == "string") {
                e.pagesX = [], e.pagesY = [], s = e.scroller.querySelectorAll(e.options.snap);
                for (r = 0, i = s.length; r < i; r++) o = e._offset(s[r]), o.left += e.wrapperOffsetLeft, o.top += e.wrapperOffsetTop, e.pagesX[r] = o.left < e.maxScrollX ? e.maxScrollX : o.left * e.scale, e.pagesY[r] = o.top < e.maxScrollY ? e.maxScrollY : o.top * e.scale
            } else if (e.options.snap) {
                e.pagesX = [];
                while (o >= e.maxScrollX) e.pagesX[u] = o, o -= e.wrapperW, u++;
                e.maxScrollX % e.wrapperW && (e.pagesX[e.pagesX.length] = e.maxScrollX - e.pagesX[e.pagesX.length - 1] + e.pagesX[e.pagesX.length - 1]), o = 0, u = 0, e.pagesY = [];
                while (o >= e.maxScrollY) e.pagesY[u] = o, o -= e.wrapperH, u++;
                e.maxScrollY % e.wrapperH && (e.pagesY[e.pagesY.length] = e.maxScrollY - e.pagesY[e.pagesY.length - 1] + e.pagesY[e.pagesY.length - 1])
            }
            e._scrollbar("h"), e._scrollbar("v"), e.zoomed || (e.scroller.style[a] = "0", e._resetPos(200))
        },
        scrollTo: function(e, t, n, r) {
            var i = this,
                s = e,
                o, u;
            i.stop(), s.length || (s = [{
                x: e,
                y: t,
                time: n,
                relative: r
            }]);
            for (o = 0, u = s.length; o < u; o++) s[o].relative && (s[o].x = i.x - s[o].x, s[o].y = i.y - s[o].y), i.steps.push({
                x: s[o].x,
                y: s[o].y,
                time: s[o].time || 0
            });
            i._startAni()
        },
        scrollToElement: function(e, t) {
            var r = this,
                i;
            e = e.nodeType ? e : r.scroller.querySelector(e);
            if (!e) return;
            i = r._offset(e), i.left += r.wrapperOffsetLeft, i.top += r.wrapperOffsetTop, i.left = i.left > 0 ? 0 : i.left < r.maxScrollX ? r.maxScrollX : i.left, i.top = i.top > r.minScrollY ? r.minScrollY : i.top < r.maxScrollY ? r.maxScrollY : i.top, t = t === undefined ? n.max(n.abs(i.left) * 2, n.abs(i.top) * 2) : t, r.scrollTo(i.left, i.top, t)
        },
        scrollToPage: function(e, t, n) {
            var r = this,
                i, s;
            n = n === undefined ? 400 : n, r.options.onScrollStart && r.options.onScrollStart.call(r), r.options.snap ? (e = e == "next" ? r.currPageX + 1 : e == "prev" ? r.currPageX - 1 : e, t = t == "next" ? r.currPageY + 1 : t == "prev" ? r.currPageY - 1 : t, e = e < 0 ? 0 : e > r.pagesX.length - 1 ? r.pagesX.length - 1 : e, t = t < 0 ? 0 : t > r.pagesY.length - 1 ? r.pagesY.length - 1 : t, r.currPageX = e, r.currPageY = t, i = r.pagesX[e], s = r.pagesY[t]) : (i = -r.wrapperW * e, s = -r.wrapperH * t, i < r.maxScrollX && (i = r.maxScrollX), s < r.maxScrollY && (s = r.maxScrollY)), r.scrollTo(i, s, n)
        },
        disable: function() {
            this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(E, e), this._unbind(S, e), this._unbind(x, e)
        },
        enable: function() {
            this.enabled = !0
        },
        stop: function() {
            this.options.useTransition ? this._unbind(T) : C(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
        },
        zoom: function(e, t, n, r) {
            var i = this,
                s = n / i.scale;
            if (!i.options.useTransform) return;
            i.zoomed = !0, r = r === undefined ? 200 : r, e = e - i.wrapperOffsetLeft - i.x, t = t - i.wrapperOffsetTop - i.y, i.x = e - e * s + i.x, i.y = t - t * s + i.y, i.scale = n, i.refresh(), i.x = i.x > 0 ? 0 : i.x < i.maxScrollX ? i.maxScrollX : i.x, i.y = i.y > i.minScrollY ? i.minScrollY : i.y < i.maxScrollY ? i.maxScrollY : i.y, i.scroller.style[a] = r + "ms", i.scroller.style[o] = "translate(" + parseInt(i.x, 10) + "px," + parseInt(i.y, 10) + "px) scale(" + n + ")" + k, i.zoomed = !1
        },
        isReady: function() {
            return !this.moved && !this.zoomed && !this.animating
        }
    }, r = null, typeof exports != "undefined" ? exports.iScroll = L : e.iScroll = L
}(window, document), function() {
    var e = this,
        t = e.template,
        n = function() {},
        r = Array.prototype,
        i = r.slice,
        s = r.splice,
        o = Object.prototype,
        u = o.toString,
        a = window.navigator,
        f = a.userAgent,
        l = /(iPhone\sOS)\s(6_[\d])/.test(f) && window.screen.height == 568,
        c = a.standalone || /Safari/i.test(f) && !/CriOS/i.test(f) && /Version\/(\d+\.?)+\sMobile\/*/.test(f),
        h = l && c,
        p = !l && c;
    typeof MX == "undefined" && (e.MX = {}), MX.version = "0.0.1", MX.namespace = function() {
        var t = arguments.length,
            n = 0,
            r, i, s, o, u, a;
        for (; n < t; ++n) {
            s = arguments[n], o = arguments[n].split("."), a = e[o[0]], a === undefined && (a = e[o[0]] = {}), u = o.slice(1), r = u.length;
            for (i = 0; i < r; ++i) a = a[u[i]] = a[u[i]] || {}
        }
        return a
    }, MX.ns = MX.namespace, MX.ns("MX.lib");
    var d = MX.lib.Zepto = e.Zepto;
    d.extend(MX.lib, {
        Template: t,
        iScroll: e.iScroll
    }), t && (t.openTag = "<#", t.closeTag = "#>"), d.extend(MX, {
        emptyFn: function() {},
        ready: function(t, n) {
            d(document).ready(function() {
                t.call(n || e, MX)
            })
        },
        chain: function(e) {
            n.prototype = e;
            var t = new n;
            return n.prototype = null, t
        },
        getClass: function(t) {
            if (!MX.isString(t)) return t;
            var n = t.split("."),
                r = n.slice(1),
                i = e[n[0]];
            for (var s = 0, o = r.length; s < o; ++s) i = i[r[s]];
            return i
        },
        isDefined: function(e) {
            return typeof e != "undefined"
        },
        isString: function(e) {
            return typeof e == "string"
        },
        isNumber: function(e) {
            return typeof e == "number" && isFinite(e)
        },
        isBoolean: function(e) {
            return typeof e == "boolean"
        },
        isDate: function(e) {
            return u.call(e) === "[object Date]"
        },
        isEmpty: function(e, t) {
            return e === null || e === undefined || (t ? !1 : e === "") || d.isArray(e) && e.length === 0
        },
        each: function(e, t, n) {
            if (!e || !t) return;
            MX.isDefined(n) ? d.each(e, d.proxy(t, n)) : d.each(e, t)
        },
        toArray: function(e) {
            return e ? d.isArray(e) ? i.call(e) : u.call(e) == "[object Arguments]" ? i.call(e) : i.call(arguments, 0) : []
        },
        applyIf: function(e, t) {
            var n;
            if (e) for (n in t) e[n] === undefined && (e[n] = t[n]);
            return e
        },
        defer: function(e, t, n, r) {
            return n = n || window, t > 0 ? setTimeout(function() {
                e.apply(n, r)
            }, t) : (e.apply(n, r), 0)
        },
        trim: function(e) {
            return MX.isString(e) ? d.trim(e) : e
        },
        ajax: function(e, t) {
            e = e || {}, t = t || e.scope || e.context || window, MX.isDefined(e.timeout) || (e.timeout = 3e4), d.isFunction(e.success) && (e.success = d.proxy(e.success, t)), d.isFunction(e.error) && (e.error = d.proxy(e.error, t)), d.isFunction(e.complete) && (e.complete = d.proxy(e.complete, t));
            if (window.navigator.onLine) return d.ajax.call(d, e);
            var n = {
                status: 503,
                statusText: "Network Offline"
            };
            d.isFunction(e.error) && e.error.call(t, n, "error", null), d.isFunction(e.complete) && e.complete.call(t, n, "error")
        },
        getWindowSize: function() {
            return {
                w: MX.getWindowWidth(),
                h: MX.getWindowHeight()
            }
        },
        getWindowWidth: function() {
            return window.innerWidth
        },
        getWindowHeight: function() {
            return window.innerHeight
        },
        isIphone5: l,
        isSafari: c,
        isIphone5Safari: h,
        isIphone4Safari: p,
        getUrlParams: function(e, t) {
            MX.isBoolean(e) && (t = e, e = null);
            var n = window.location.search,
                r, i, s = {};
            return !e && !n && (e = window.location.href), e && (r = e.indexOf("?"), n = r != -1 ? e.substring(r) : ""), n && (n = n.substr(1), r = n.indexOf("#"), r != -1 && (n = n.substring(0, r)), MX.each(n.split("&"), function(e, n) {
                n = n.split("="), i = n[1];
                if (t === !0) try {
                    i = JSON.parse(i)
                } catch (r) {}
                s[n[0]] = i
            }, this)), s
        },
        createOrientationChangeProxy: function(e, t) {
            return function() {
                clearTimeout(t.orientationChangeTimeout);
                var n = MX.toArray(arguments);
                t.orientationChangeTimeout = MX.defer(function() {
                    var r = window.orientation;
                    r != t.lastOrientation && e.apply(t, n), t.lastOrientation = r
                }, d.os.android ? 300 : 0, t)
            }
        },
        parsePx: function(e) {
            return e ? parseInt(e.replace("px", "")) : 0
        }
    }), e.Matrix = MX, MX.ns("MX.clazz", "MX.app", "MX.util", "MX.widget")
}(), function() {
    var e = MX.lib.Zepto,
        t = e.os,
        n = {
            log: function(e) {
                alert(e)
            },
            warn: function(e) {
                alert(e)
            },
            error: function(e) {
                alert(e)
            },
            debug: function(e) {
                alert(e)
            }
        };
    if (window.chrome || !t.ios && !t.android && console) n = console;
    MX.Console = {
        chrome: !! window.chrome,
        log: function(e) {
            MX.debug === !0 && n.log(e)
        },
        warn: function(e) {
            MX.debug === !0 && n.warn(e)
        },
        error: function(e) {
            MX.debug === !0 && n.error(e)
        },
        debug: function(e) {
            MX.debug === !0 && n.debug(e)
        }
    }
}(), function() {
    var e = MX.lib.Zepto,
        t = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"],
        n = [],
        r = function() {};
    e.extend(r, {
        $isClass: !0,
        addMembers: function(e) {
            var n = this.prototype,
                r = [],
                i, s, o, u;
            for (o in e) r.push(o);
            t && r.push.apply(r, t);
            for (i = 0, s = r.length; i < s; i++) o = r[i], e.hasOwnProperty(o) && (u = e[o], typeof u == "function" && !u.$isClass && (u.$owner = this, u.$name = o), n[o] = u);
            return this
        },
        extend: function(e) {
            var t = e.prototype,
                n, i, s;
            i = this.prototype = MX.chain(t), this.superclass = i.superclass = t;
            if (!e.$isClass) {
                n = r.prototype;
                for (s in n) s in i && (i[s] = n[s])
            }
        }
    }), e.extend(r.prototype, {
        $isInstance: !0,
        callParent: function(e) {
            var t, r = (t = this.callParent.caller) && (t = t.$owner ? t : t.caller) && t.$owner.superclass[t.$name];
            return r.apply(this, MX.toArray(e) || n)
        },
        constructor: function() {
            return this
        }
    }), MX.clazz.Base = r
}(), function() {
    var e = MX.clazz.Base,
        t = function() {
            function e() {
                return this.constructor.apply(this, arguments) || null
            }
            return e
        },
        n = function(t, n) {
            var r = e.prototype,
                i = n.extend,
                s, o, u;
            delete n.extend, i && i !== Object ? s = i : s = e, o = s.prototype;
            if (!s.$isClass) for (u in r) o[u] || (o[u] = r[u]);
            t.extend(s)
        };
    MX.clazz.Class = {
        define: function(r) {
            var i, s;
            r || (r = {}), i = t();
            for (s in e) i[s] = e[s];
            return n(i, r), i.addMembers(r), i
        },
        override: function(e, t) {
            e.addMembers(t)
        }
    }
}(), function() {
    function n(e, t, n, r) {
        return function() {
            return e.removeListener(t, n, r), n.apply(r, arguments)
        }
    }
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        r = t.define({
            constructor: function(e, t) {
                this.events = {}, this.defaultScope = t || window, e && this.addListener(e)
            },
            addEvents: function(e) {
                var t, n, r, i = this.events;
                if (MX.isString(e)) {
                    t = arguments, r = t.length;
                    while (r--) i[t[r]] = i[t[r]] || []
                } else MX.each(e, function(e, t) {
                    i[e] = i[e] || []
                })
            },
            addListener: function(t, n, r, i) {
                if (!MX.isString(t)) {
                    var s, o, u = t.scope;
                    for (o in t) {
                        if (o === "scope") continue;
                        s = t[o], e.isFunction(s) ? this.addListener(o, s, u) : this.addListener(o, s.fireFn, s.scope || u)
                    }
                    return
                }
                var a = this.events;
                t = t.toLowerCase(), a[t] = a[t] || [], r = r || this.defaultScope, i = i || {}, a[t].push({
                    single: i.single,
                    fireFn: n,
                    listenerFn: this.createListener(t, n, r, i),
                    scope: r
                })
            },
            removeListener: function(t, n, r) {
                t = t.toLowerCase();
                var i = this.events[t];
                if (e.isArray(i)) {
                    r = r || this.defaultScope;
                    for (var s = 0, o = i.length; s < o; s++) if (i[s].fireFn == n && r == i[s].scope) {
                        i.splice(s, 1);
                        return
                    }
                }
            },
            clearListeners: function(e) {
                this.events[e.toLowerCase()] = []
            },
            purgeListeners: function() {
                for (var e in this.events) this.clearListeners(e)
            },
            hasListener: function(t) {
                var n = this.events[t.toLowerCase()];
                return e.isArray(n) && n.length > 0
            },
            fireEvent: function(t) {
                var n = this.events[t.toLowerCase()];
                if (e.isArray(n)) {
                    var r = Array.prototype.slice.call(arguments, 1),
                        i = n.length,
                        s = 0,
                        o;
                    if (i > 0) for (; s < i; s++) {
                        o = n[s];
                        if (o) {
                            o.single === !0 && s--;
                            if (MX.Console && MX.Console.chrome) {
                                if (o.listenerFn.apply(o.scope, r) === !1) return !1
                            } else try {
                                if (o.listenerFn.apply(o.scope, r) === !1) return !1
                            } catch (u) {
                                MX.Console.error('fire event callback error: the event name is "' + t + '": ' + u.message)
                            }
                        }
                    }
                }
            },
            createListener: function(e, t, r, i) {
                var s = t;
                return i = i || {}, i.single && (s = n(this, e, t, r)), s
            }
        });
    e.extend(r.prototype, {
        on: r.prototype.addListener,
        un: r.prototype.removeListener
    }), MX.util.Dispatcher = r
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class;
    MX.util.HashMap = t.define({
        constructor: function(e) {
            e = e || {};
            var t = this,
                n = e.keyFn;
            t.clear(!0), n && (t.getKey = n)
        },
        getCount: function() {
            return this.length
        },
        getData: function(e, t) {
            return t === undefined && (t = e, e = this.getKey(t)), [e, t]
        },
        getKey: function(e) {
            return e.id
        },
        add: function(e, t) {
            var n = this;
            return t === undefined && (t = e, e = n.getKey(t)), n.containsKey(e) ? n.replace(e, t) : (n.map[e] = t, ++n.length, t)
        },
        replace: function(e, t) {
            var n = this,
                r = n.map,
                i;
            return t === undefined && (t = e, e = n.getKey(t)), n.containsKey(e) || n.add(e, t), i = r[e], r[e] = t, t
        },
        remove: function(e) {
            var t = this.findKey(e);
            return t !== undefined ? this.removeAtKey(t) : !1
        },
        removeAtKey: function(e) {
            var t = this,
                n;
            return t.containsKey(e) ? (n = t.map[e], delete t.map[e], --t.length, !0) : !1
        },
        get: function(e) {
            return this.map[e]
        },
        clear: function(e) {
            var t = this;
            return t.map = {}, t.length = 0, t
        },
        containsKey: function(e) {
            return this.map[e] !== undefined
        },
        contains: function(e) {
            return this.containsKey(this.findKey(e))
        },
        getKeys: function() {
            return this.getArray(!0)
        },
        getValues: function() {
            return this.getArray(!1)
        },
        getArray: function(e) {
            var t = [],
                n, r = this.map;
            for (n in r) r.hasOwnProperty(n) && t.push(e ? n : r[n]);
            return t
        },
        each: function(t, n) {
            var r = e.extend({}, this.map),
                i, s = this.length;
            n = n || this;
            for (i in r) if (r.hasOwnProperty(i) && t.call(n, i, r[i], s) === !1) break;
            return this
        },
        clone: function() {
            var e = new this.self,
                t = this.map,
                n;
            for (n in t) t.hasOwnProperty(n) && e.add(n, t[n]);
            return e
        },
        findKey: function(e) {
            var t, n = this.map;
            for (t in n) if (n.hasOwnProperty(t) && n[t] === e) return t;
            return undefined
        },
        find: function(e, t) {
            var n;
            return this.each(function(r, i) {
                if (e.call(t || window, i, r)) return n = i, !1
            }), n
        }
    })
}(), function() {
    function o(e, t, n, r, i) {
        return function() {
            return e.dun(t, n, r, i), r.apply(this, arguments)
        }
    }
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.util.Dispatcher,
        r = 1e3,
        i = function(e) {
            return (e || "gen-id") + ++r
        },
        s = function(e, t) {
            var n = !0;
            return e.length == t.length ? e.each(function(e, r) {
                if (r != t[e]) return n = !1, !1
            }) : n = !1, n
        };
    MX.clazz.Utility = t.define({
        constructor: function(t) {
            t = t || {}, e.extend(this, t), this.initialConfig = t, this.id || (this.id = i(this.idPrefix || "")), this.ob = new n(this.listeners, this), delete this.listeners, this.relayMethod(this.ob, "addEvents", "fireEvent", "addListener", "removeListener", "on", "un"), this.addEvents("beforedestroy", "destroy"), this.init(), this.initEvents()
        },
        init: MX.emptyFn,
        initEvents: MX.emptyFn,
        relayMethod: function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            for (var n = 0, r = t.length; n < r; n++) {
                var i = t[n],
                    s = e[i];
                !this[i] && s && (this[i] = function(t) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }(s))
            }
        },
        createEventCache: function() {
            this.eventCaches || (this.eventCaches = [])
        },
        clearEventCache: function() {
            if (this.eventCaches) {
                var e = this.eventCaches.length - 1,
                    t;
                for (; e >= 0; e--) t = this.eventCaches[e], this.mun(t.el, t.type, t.fn, t.scope)
            }
        },
        mon: function(t, n, r, i) {
            this.createEventCache();
            if (e.isPlainObject(n)) {
                var s;
                i = n.scope || this, delete n.scope;
                for (s in n) this.mon(t, s, n[s], i);
                return
            }
            t = e(t);
            if (t.length > 1) {
                MX.each(t, function(e, t) {
                    this.mon(t, n, r, i)
                }, this);
                return
            }
            i = i || this;
            var o = e.proxy(r, i);
            this.eventCaches.push({
                el: t,
                type: n,
                fn: r,
                proxyFn: o,
                scope: i
            }), t.bind(n, o)
        },
        mun: function(t, n, r, i) {
            this.createEventCache();
            if (!n) {
                for (var o = 0, u = this.eventCaches.length; o < u; o++) {
                    var a = this.eventCaches[o];
                    s(t, a.el) && this.mun(t, a.type, a.fn, a.scope)
                }
                return
            }
            if (e.isPlainObject(n)) {
                var f;
                i = n.scope || this, delete n.scope;
                for (f in n) this.mun(t, f, n[f], i);
                return
            }
            i = i || this, t = e(t);
            for (var o = 0, u = this.eventCaches.length; o < u; o++) {
                var a = this.eventCaches[o];
                if (s(t, a.el) && n == a.type && r == a.fn && i == a.scope) {
                    this.eventCaches.splice(o, 1), t.unbind(n, a.proxyFn);
                    break
                }
            }
        },
        createDelegateCache: function() {
            this.delegateCaches || (this.delegateCaches = [])
        },
        clearDelegateCache: function() {
            if (this.delegateCaches) {
                var e = this.delegateCaches.length - 1,
                    t;
                for (; e >= 0; e--) t = this.delegateCaches[e], this.undelegate(t.el, t.selector, t.type, t.fn, t.scope)
            }
        },
        delegate: function(t, n, r, i, s) {
            this.createDelegateCache();
            if (e.isPlainObject(r)) {
                var o;
                s = r.scope || this, delete r.scope;
                for (o in r) this.delegate(t, n, o, r[o], s);
                return
            }
            t = e(t);
            if (t.length > 1) {
                MX.each(t, function(e, t) {
                    this.delegate(t, n, r, i, s)
                }, this);
                return
            }
            s = s || this;
            var u = e.proxy(i, s);
            this.delegateCaches.push({
                el: t,
                selector: n,
                type: r,
                fn: i,
                proxyFn: u,
                scope: s
            }), t.delegate(n, r, u)
        },
        undelegate: function(t, n, r, i, o) {
            this.createDelegateCache();
            if (!r) {
                for (var u = 0, a = this.delegateCaches.length; u < a; u++) {
                    var f = this.delegateCaches[u];
                    s(t, f.el) && this.undelegate(t, f.selector, f.type, f.fn, f.scope)
                }
                return
            }
            if (e.isPlainObject(r)) {
                var l;
                o = r.scope || this, delete r.scope;
                for (l in r) this.undelegate(t, n, l, r[l], o);
                return
            }
            o = o || this, t = e(t);
            for (var u = 0, a = this.delegateCaches.length; u < a; u++) {
                var f = this.delegateCaches[u];
                if (s(t, f.el) && n == f.selector && r == f.type && i == f.fn && o == f.scope) {
                    this.delegateCaches.splice(u, 1), t.undelegate(n, r, f.proxyFn);
                    break
                }
            }
        },
        createDispatcherCache: function() {
            this.dispatcherCaches || (this.dispatcherCaches = [])
        },
        clearDispatcherCache: function() {
            if (this.dispatcherCaches) {
                var e = this.dispatcherCaches.length - 1,
                    t;
                for (; e >= 0; e--) t = this.dispatcherCaches[e], this.dun(t.obj, t.event, t.fn, t.scope)
            }
        },
        don: function(t, n, r, i, s) {
            this.createDispatcherCache();
            if (e.isPlainObject(n)) {
                var o;
                i = n.scope || this, delete n.scope;
                for (o in n) this.don(t, o, n[o], i || this, s);
                return
            }
            if (t) {
                i = i || this;
                var u = this.createListener(t, n, r, i, s);
                this.dispatcherCaches.push({
                    obj: t,
                    event: n,
                    fn: r,
                    fireFn: u,
                    scope: i
                }), t.on(n, u, i)
            }
        },
        dun: function(t, n, r, i) {
            this.createDispatcherCache();
            if (e.isPlainObject(n)) {
                var s;
                i = n.scope || this, delete n.scope;
                for (s in n) this.dun(t, s, n[s], i || this);
                return
            }
            i = i || this;
            for (var o = 0, u = this.dispatcherCaches.length; o < u; o++) {
                var a = this.dispatcherCaches[o];
                if (a.obj == t && a.event == n && a.fn == r && a.scope == i) {
                    this.dispatcherCaches.splice(o, 1), t.un(n, a.fireFn, i);
                    break
                }
            }
        },
        createListener: function(e, t, n, r, i) {
            var s = n;
            return i = i || {}, i.single && (s = o(this, e, t, n, r)), s
        },
        beforeDestroy: MX.emptyFn,
        onDestroy: MX.emptyFn,
        destroy: function() {
            this.isDestroyed || this.fireEvent("beforedestroy", this) !== !1 && (this.destroying = !0, this.beforeDestroy(), this.clearEventCache(), this.clearDelegateCache(), this.clearDispatcherCache(), this.onDestroy(), this.fireEvent("destroy", this), this.ob.purgeListeners(), this.destroying = !1, this.isDestroyed = !0)
        }
    })
}(), function() {
    var e = MX.util.Dispatcher,
        t = window.navigator,
        n = t.onLine,
        r = navigator.connection ? navigator.connection.type : n ? 0 : 6,
        i = {},
        s = new e;
    s.addEvents("online", "offline");
    var o = function() {
            i.online = !0, r = navigator.connection ? navigator.connection.type : 0, s.fireEvent("online", r)
        },
        u = function() {
            i.online = !1, r = 6, s.fireEvent("offline", r)
        };
    window.ononline = o, window.onoffline = u, i = {
        online: n,
        networkType: r,
        on: function() {
            s.on.apply(s, arguments)
        },
        un: function() {
            s.un.apply(s, arguments)
        }
    }, MX.util.NetworkMonitor = i
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = function(e) {
            return e.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
        };
    MX.util.Collection = t.define({
        extend: n,
        allowFunctions: !1,
        init: function() {
            this.items = [], this.map = {}, this.keys = [], this.length = 0
        },
        initEvents: function() {
            this.addEvents("clear", "add", "replace", "remove", "sort")
        },
        add: function(e, t) {
            arguments.length == 1 && (t = arguments[0], e = this.getKey(t));
            if (typeof e != "undefined" && e !== null) {
                var n = this.map[e];
                if (typeof n != "undefined") return this.replace(e, t);
                this.map[e] = t
            }
            return this.length++, this.items.push(t), this.keys.push(e), this.fireEvent("add", this.length - 1, t, e), t
        },
        getKey: function(e) {
            return e.id
        },
        replace: function(e, t) {
            arguments.length == 1 && (t = arguments[0], e = this.getKey(t));
            var n = this.map[e];
            if (typeof e == "undefined" || e === null || typeof n == "undefined") return this.add(e, t);
            var r = this.indexOfKey(e);
            return this.items[r] = t, this.map[e] = t, this.fireEvent("replace", e, n, t), t
        },
        addAll: function(t) {
            if (arguments.length > 1 || e.isArray(t)) {
                var n = arguments.length > 1 ? arguments : t;
                for (var r = 0, i = n.length; r < i; r++) this.add(n[r])
            } else for (var s in t)(this.allowFunctions || typeof t[s] != "function") && this.add(s, t[s])
        },
        each: function(e, t) {
            var n = [].concat(this.items);
            for (var r = 0, i = n.length; r < i; r++) if (e.call(t || n[r], n[r], r, i) === !1) break
        },
        eachKey: function(e, t) {
            for (var n = 0, r = this.keys.length; n < r; n++) e.call(t || window, this.keys[n], this.items[n], n, r)
        },
        find: function(e, t) {
            for (var n = 0, r = this.items.length; n < r; n++) if (e.call(t || window, this.items[n], this.keys[n])) return this.items[n];
            return null
        },
        insert: function(e, t, n) {
            return arguments.length == 2 && (n = arguments[1], t = this.getKey(n)), this.containsKey(t) && (this.suspendEvents(), this.removeKey(t), this.resumeEvents()), e >= this.length ? this.add(t, n) : (this.length++, this.items.splice(e, 0, n), typeof t != "undefined" && t !== null && (this.map[t] = n), this.keys.splice(e, 0, t), this.fireEvent("add", e, n, t), n)
        },
        remove: function(e) {
            return this.removeAt(this.indexOf(e))
        },
        removeAt: function(e) {
            if (e < this.length && e >= 0) {
                this.length--;
                var t = this.items[e];
                this.items.splice(e, 1);
                var n = this.keys[e];
                return typeof n != "undefined" && delete this.map[n], this.keys.splice(e, 1), this.fireEvent("remove", t, n), t
            }
            return !1
        },
        removeKey: function(e) {
            return this.removeAt(this.indexOfKey(e))
        },
        getCount: function() {
            return this.length
        },
        indexOf: function(e) {
            return this.items.indexOf(e)
        },
        indexOfKey: function(e) {
            return this.keys.indexOf(e)
        },
        item: function(e) {
            var t = this.map[e],
                n = t !== undefined ? t : typeof e == "number" ? this.items[e] : undefined;
            return typeof n != "function" || this.allowFunctions ? n : null
        },
        itemAt: function(e) {
            return this.items[e]
        },
        key: function(e) {
            return this.map[e]
        },
        contains: function(e) {
            return this.indexOf(e) != -1
        },
        containsKey: function(e) {
            return typeof this.map[e] != "undefined"
        },
        clear: function() {
            this.length = 0, this.items = [], this.keys = [], this.map = {}, this.fireEvent("clear")
        },
        first: function() {
            return this.items[0]
        },
        last: function() {
            return this.items[this.length - 1]
        },
        _sort: function(e, t, n) {
            var r, i, s = String(t).toUpperCase() == "DESC" ? -1 : 1,
                o = [],
                u = this.keys,
                a = this.items;
            n = n ||
            function(e, t) {
                return e - t
            };
            for (r = 0, i = a.length; r < i; r++) o[o.length] = {
                key: u[r],
                value: a[r],
                index: r
            };
            o.sort(function(t, r) {
                var i = n(t[e], r[e]) * s;
                return i === 0 && (i = t.index < r.index ? -1 : 1), i
            });
            for (r = 0, i = o.length; r < i; r++) a[r] = o[r].value, u[r] = o[r].key;
            this.fireEvent("sort", this)
        },
        sort: function(e, t) {
            this._sort("value", e, t)
        },
        reorder: function(e) {
            this.suspendEvents();
            var t = this.items,
                n = 0,
                r = t.length,
                i = [],
                s = [],
                o;
            for (o in e) i[e[o]] = t[o];
            for (n = 0; n < r; n++) e[n] == undefined && s.push(t[n]);
            for (n = 0; n < r; n++) i[n] == undefined && (i[n] = s.shift());
            this.clear(), this.addAll(i), this.resumeEvents(), this.fireEvent("sort", this)
        },
        keySort: function(e, t) {
            this._sort("key", e, t ||
            function(e, t) {
                var n = String(e).toUpperCase(),
                    r = String(t).toUpperCase();
                return n > r ? 1 : n < r ? -1 : 0
            })
        },
        getRange: function(e, t) {
            var n = this.items;
            if (n.length < 1) return [];
            e = e || 0, t = Math.min(typeof t == "undefined" ? this.length - 1 : t, this.length - 1);
            var r, i = [];
            if (e <= t) for (r = e; r <= t; r++) i[i.length] = n[r];
            else for (r = e; r >= t; r--) i[i.length] = n[r];
            return i
        },
        filter: function(e, t, n, r) {
            return MX.isEmpty(t, !1) ? this.clone() : (t = this.createValueMatcher(t, n, r), this.filterBy(function(n) {
                return n && t.test(n[e])
            }))
        },
        filterBy: function(e, t) {
            var n = new MX.util.Collection;
            n.getKey = this.getKey;
            var r = this.keys,
                i = this.items;
            for (var s = 0, o = i.length; s < o; s++) e.call(t || this, i[s], r[s]) && n.add(r[s], i[s]);
            return n
        },
        findIndex: function(e, t, n, r, i) {
            return MX.isEmpty(t, !1) ? -1 : (t = this.createValueMatcher(t, r, i), this.findIndexBy(function(n) {
                return n && t.test(n[e])
            }, null, n))
        },
        findIndexBy: function(e, t, n) {
            var r = this.keys,
                i = this.items;
            for (var s = n || 0, o = i.length; s < o; s++) if (e.call(t || this, i[s], r[s])) return s;
            return -1
        },
        createValueMatcher: function(e, t, n, i) {
            return e.exec || (e = String(e), t === !0 ? e = r(e) : (e = "^" + r(e), i === !0 && (e += "$")), e = new RegExp(e, n ? "" : "i")), e
        },
        clone: function() {
            var e = new MX.util.Collection,
                t = this.keys,
                n = this.items;
            for (var r = 0, i = n.length; r < i; r++) e.add(t[r], n[r]);
            return e.getKey = this.getKey, e
        }
    })
}(), function() {
    function e(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return e.replace(/\{(\d+)\}/g, function(e, n) {
            return t[n]
        })
    }
    MX.util.Date = {
        now: Date.now ||
        function() {
            return +(new Date)
        },
        toString: function(e) {
            var t = MX.util.Format.leftPad;
            return e.getFullYear() + "-" + t(e.getMonth() + 1, 2, "0") + "-" + t(e.getDate(), 2, "0") + "T" + t(e.getHours(), 2, "0") + ":" + t(e.getMinutes(), 2, "0") + ":" + t(e.getSeconds(), 2, "0")
        },
        getElapsed: function(e, t) {
            return Math.abs(e - (t || new Date))
        },
        useStrict: !1,
        formatCodeToRegex: function(n, r) {
            var i = t.parseCodes[n];
            return i && (i = typeof i == "function" ? i() : i, t.parseCodes[n] = i), i ? MX.applyIf({
                c: i.c ? e(i.c, r || "{0}") : i.c
            }, i) : {
                g: 0,
                c: null,
                s: MX.util.Format.escapeRegex(n)
            }
        },
        parseFunctions: {
            MS: function(e, t) {
                var n = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/"),
                    r = (e || "").match(n);
                return r ? new Date(((r[1] || "") + r[2]) * 1) : null
            }
        },
        parseRegexes: [],
        formatFunctions: {
            MS: function() {
                return "\\/Date(" + this.getTime() + ")\\/"
            }
        },
        y2kYear: 50,
        MILLI: "ms",
        SECOND: "s",
        MINUTE: "mi",
        HOUR: "h",
        DAY: "d",
        MONTH: "mo",
        YEAR: "y",
        defaults: {},
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNumbers: {
            January: 0,
            Jan: 0,
            February: 1,
            Feb: 1,
            March: 2,
            Mar: 2,
            April: 3,
            Apr: 3,
            May: 4,
            June: 5,
            Jun: 5,
            July: 6,
            Jul: 6,
            August: 7,
            Aug: 7,
            September: 8,
            Sep: 8,
            October: 9,
            Oct: 9,
            November: 10,
            Nov: 10,
            December: 11,
            Dec: 11
        },
        defaultFormat: "m/d/Y",
        getShortMonthName: function(e) {
            return MX.util.Date.monthNames[e].substring(0, 3)
        },
        getShortDayName: function(e) {
            return MX.util.Date.dayNames[e].substring(0, 3)
        },
        getMonthNumber: function(e) {
            return MX.util.Date.monthNumbers[e.substring(0, 1).toUpperCase() + e.substring(1, 3).toLowerCase()]
        },
        formatContainsHourInfo: function() {
            var e = /(\\.)/g,
                t = /([gGhHisucUOPZ]|MS)/;
            return function(n) {
                return t.test(n.replace(e, ""))
            }
        }(),
        formatContainsDateInfo: function() {
            var e = /(\\.)/g,
                t = /([djzmnYycU]|MS)/;
            return function(n) {
                return t.test(n.replace(e, ""))
            }
        }(),
        unescapeFormat: function() {
            var e = /\\/gi;
            return function(t) {
                return t.replace(e, "")
            }
        }(),
        formatCodes: {
            d: "MX.util.Format.leftPad(this.getDate(), 2, '0')",
            D: "MX.util.Date.getShortDayName(this.getDay())",
            j: "this.getDate()",
            l: "MX.util.Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "MX.util.Date.getSuffix(this)",
            w: "this.getDay()",
            z: "MX.util.Date.getDayOfYear(this)",
            W: "MX.util.Format.leftPad(MX.util.Date.getWeekOfYear(this), 2, '0')",
            F: "MX.util.Date.monthNames[this.getMonth()]",
            m: "MX.util.Format.leftPad(this.getMonth() + 1, 2, '0')",
            M: "MX.util.Date.getShortMonthName(this.getMonth())",
            n: "(this.getMonth() + 1)",
            t: "MX.util.Date.getDaysInMonth(this)",
            L: "(MX.util.Date.isLeapYear(this) ? 1 : 0)",
            o: "(this.getFullYear() + (MX.util.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (MX.util.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "MX.util.Format.leftPad(this.getFullYear(), 4, '0')",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "MX.util.Format.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "MX.util.Format.leftPad(this.getHours(), 2, '0')",
            i: "MX.util.Format.leftPad(this.getMinutes(), 2, '0')",
            s: "MX.util.Format.leftPad(this.getSeconds(), 2, '0')",
            u: "MX.util.Format.leftPad(this.getMilliseconds(), 3, '0')",
            O: "MX.util.Date.getGMTOffset(this)",
            P: "MX.util.Date.getGMTOffset(this, true)",
            T: "MX.util.Date.getTimezone(this)",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function() {
                var e, n, r, i, s;
                for (e = "Y-m-dTH:i:sP", n = [], r = 0, i = e.length; r < i; ++r) s = e.charAt(r), n.push(s == "T" ? "'T'" : t.getFormatCode(s));
                return n.join(" + ")
            },
            U: "Math.round(this.getTime() / 1000)"
        },
        isValid: function(e, n, r, i, s, o, u) {
            i = i || 0, s = s || 0, o = o || 0, u = u || 0;
            var a = t.add(new Date(e < 100 ? 100 : e, n - 1, r, i, s, o, u), t.YEAR, e < 100 ? e - 100 : 0);
            return e == a.getFullYear() && n == a.getMonth() + 1 && r == a.getDate() && i == a.getHours() && s == a.getMinutes() && o == a.getSeconds() && u == a.getMilliseconds()
        },
        parse: function(e, n, r) {
            var i = t.parseFunctions;
            return i[n] == null && t.createParser(n), i[n](e, MX.isDefined(r) ? r : t.useStrict)
        },
        parseDate: function(e, n, r) {
            return t.parse(e, n, r)
        },
        getFormatCode: function(e) {
            var n = t.formatCodes[e];
            return n && (n = typeof n == "function" ? n() : n, t.formatCodes[e] = n), n || "'" + MX.util.Format.escape(e) + "'"
        },
        createFormat: function(e) {
            var n = [],
                r = !1,
                i = "",
                s;
            for (s = 0; s < e.length; ++s) i = e.charAt(s), !r && i == "\\" ? r = !0 : r ? (r = !1, n.push("'" + MX.util.Format.escape(i) + "'")) : n.push(t.getFormatCode(i));
            t.formatFunctions[e] = Function.prototype.constructor.apply(Function.prototype, ["return " + n.join("+")])
        },
        createParser: function() {
            var n = ["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,", "def = MX.util.Date.defaults,", "results = String(input).match(MX.util.Date.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = MX.util.Date.clearTime(new Date);", "y = MX.util.Format.from(y, MX.util.Format.from(def.y, dt.getFullYear()));", "m = MX.util.Format.from(m, MX.util.Format.from(def.m - 1, dt.getMonth()));", "d = MX.util.Format.from(d, MX.util.Format.from(def.d, dt.getDate()));", "h  = MX.util.Format.from(h, MX.util.Format.from(def.h, dt.getHours()));", "i  = MX.util.Format.from(i, MX.util.Format.from(def.i, dt.getMinutes()));", "s  = MX.util.Format.from(s, MX.util.Format.from(def.s, dt.getSeconds()));", "ms = MX.util.Format.from(ms, MX.util.Format.from(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = MX.util.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), MX.util.Date.YEAR, y < 100 ? y - 100 : 0);", "v = !strict? v : (strict === true && (z <= 364 || (MX.util.Date.isLeapYear(v) && z <= 365))? MX.util.Date.add(v, MX.util.Date.DAY, z) : null);", "}else if(strict === true && !MX.util.Date.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "v = MX.util.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), MX.util.Date.YEAR, y < 100 ? y - 100 : 0);", "}", "}", "}", "if(v){", "if(zz != null){", "v = MX.util.Date.add(v, MX.util.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = MX.util.Date.add(v, MX.util.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");
            return function(r) {
                var i = t.parseRegexes.length,
                    s = 1,
                    o = [],
                    u = [],
                    a = !1,
                    f = "",
                    l = 0,
                    c = r.length,
                    h = [],
                    p;
                for (; l < c; ++l) f = r.charAt(l), !a && f == "\\" ? a = !0 : a ? (a = !1, u.push(MX.util.Format.escape(f))) : (p = t.formatCodeToRegex(f, s), s += p.g, u.push(p.s), p.g && p.c && (p.calcAtEnd ? h.push(p.c) : o.push(p.c)));
                o = o.concat(h), t.parseRegexes[i] = new RegExp("^" + u.join("") + "$", "i"), t.parseFunctions[r] = Function.prototype.constructor.apply(Function.prototype, ["input", "strict", e(n, i, o.join(""))])
            }
        }(),
        parseCodes: {
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|0[1-9])"
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|[1-9])"
            },
            D: function() {
                for (var e = [], n = 0; n < 7; e.push(t.getShortDayName(n)), ++n);
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + e.join("|") + ")"
                }
            },
            l: function() {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + t.dayNames.join("|") + ")"
                }
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            F: function() {
                return {
                    g: 1,
                    c: "m = parseInt(MX.util.Date.getMonthNumber(results[{0}]), 10);\n",
                    s: "(" + t.monthNames.join("|") + ")"
                }
            },
            M: function() {
                for (var e = [], n = 0; n < 12; e.push(t.getShortMonthName(n)), ++n);
                return MX.applyIf({
                    s: "(" + e.join("|") + ")"
                }, t.formatCodeToRegex("F"))
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|0[1-9])"
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|[1-9])"
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function() {
                return t.formatCodeToRegex("Y")
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\ny = ty > MX.util.Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                s: "(\\d{1,2})"
            },
            a: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm|AM|PM)",
                calcAtEnd: !0
            },
            A: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM|am|pm)",
                calcAtEnd: !0
            },
            g: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|[0-9])"
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|1[0-9]|[0-9])"
            },
            h: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|0[1-9])"
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|[0-1][0-9])"
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])"
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])"
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
            },
            O: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + MX.util.Format.leftPad(hr, 2, '0') + MX.util.Format.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{4})"
            },
            P: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + MX.util.Format.leftPad(hr, 2, '0') + MX.util.Format.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{2}:\\d{2})"
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+-]?\\d{1,5})"
            },
            c: function() {
                var e = [],
                    n = [t.formatCodeToRegex("Y", 1), t.formatCodeToRegex("m", 2), t.formatCodeToRegex("d", 3), t.formatCodeToRegex("H", 4), t.formatCodeToRegex("i", 5), t.formatCodeToRegex("s", 6),
                    {
                        c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                    }, {
                        c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", t.formatCodeToRegex("P", 8).c, "}else{", t.formatCodeToRegex("O", 8).c, "}", "}"].join("\n")
                    }],
                    r, i;
                for (r = 0, i = n.length; r < i; ++r) e.push(n[r].c);
                return {
                    g: 1,
                    c: e.join(""),
                    s: [n[0].s, "(?:", "-", n[1].s, "(?:", "-", n[2].s, "(?:", "(?:T| )?", n[3].s, ":", n[4].s, "(?::", n[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")
                }
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
            }
        },
        dateFormat: function(e, n) {
            return t.format(e, n)
        },
        isEqual: function(e, t) {
            return e && t ? e.getTime() === t.getTime() : !e && !t
        },
        format: function(e, n) {
            var r = t.formatFunctions;
            return MX.isDate(e) ? (r[n] == null && t.createFormat(n), r[n].call(e) + "") : ""
        },
        getTimezone: function(e) {
            return e.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
        },
        getGMTOffset: function(e, t) {
            var n = e.getTimezoneOffset();
            return (n > 0 ? "-" : "+") + MX.util.Format.leftPad(Math.floor(Math.abs(n) / 60), 2, "0") + (t ? ":" : "") + MX.util.Format.leftPad(Math.abs(n % 60), 2, "0")
        },
        getDayOfYear: function(e) {
            var n = 0,
                r = MX.util.Date.clone(e),
                i = e.getMonth(),
                s;
            for (s = 0, r.setDate(1), r.setMonth(0); s < i; r.setMonth(++s)) n += t.getDaysInMonth(r);
            return n + e.getDate() - 1
        },
        getWeekOfYear: function() {
            var e = 864e5,
                t = 7 * e;
            return function(n) {
                var r = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 3) / e,
                    i = Math.floor(r / 7),
                    s = (new Date(i * t)).getUTCFullYear();
                return i - Math.floor(Date.UTC(s, 0, 7) / t) + 1
            }
        }(),
        isLeapYear: function(e) {
            var t = e.getFullYear();
            return (t & 3) == 0 && !! (t % 100 || t % 400 == 0 && t)
        },
        getFirstDayOfMonth: function(e) {
            var t = (e.getDay() - (e.getDate() - 1)) % 7;
            return t < 0 ? t + 7 : t
        },
        getLastDayOfMonth: function(e) {
            return t.getLastDateOfMonth(e).getDay()
        },
        getFirstDateOfMonth: function(e) {
            return new Date(e.getFullYear(), e.getMonth(), 1)
        },
        getLastDateOfMonth: function(e) {
            return new Date(e.getFullYear(), e.getMonth(), t.getDaysInMonth(e))
        },
        getDaysInMonth: function() {
            var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return function(n) {
                var r = n.getMonth();
                return r == 1 && t.isLeapYear(n) ? 29 : e[r]
            }
        }(),
        getSuffix: function(e) {
            switch (e.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th"
            }
        },
        clone: function(e) {
            return new Date(e.getTime())
        },
        isDST: function(e) {
            return (new Date(e.getFullYear(), 0, 1)).getTimezoneOffset() != e.getTimezoneOffset()
        },
        clearTime: function(e, n) {
            if (n) return MX.util.Date.clearTime(MX.util.Date.clone(e));
            var r = e.getDate(),
                i, s;
            e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
            if (e.getDate() != r) {
                for (i = 1, s = t.add(e, MX.util.Date.HOUR, i); s.getDate() != r; i++, s = t.add(e, MX.util.Date.HOUR, i));
                e.setDate(r), e.setHours(s.getHours())
            }
            return e
        },
        add: function(e, t, n) {
            var r = MX.util.Date.clone(e),
                i = MX.util.Date,
                s;
            if (!t || n === 0) return r;
            switch (t.toLowerCase()) {
            case MX.util.Date.MILLI:
                r.setMilliseconds(r.getMilliseconds() + n);
                break;
            case MX.util.Date.SECOND:
                r.setSeconds(r.getSeconds() + n);
                break;
            case MX.util.Date.MINUTE:
                r.setMinutes(r.getMinutes() + n);
                break;
            case MX.util.Date.HOUR:
                r.setHours(r.getHours() + n);
                break;
            case MX.util.Date.DAY:
                r.setDate(r.getDate() + n);
                break;
            case MX.util.Date.MONTH:
                s = e.getDate(), s > 28 && (s = Math.min(s, MX.util.Date.getLastDateOfMonth(MX.util.Date.add(MX.util.Date.getFirstDateOfMonth(e), MX.util.Date.MONTH, n)).getDate())), r.setDate(s), r.setMonth(e.getMonth() + n);
                break;
            case MX.util.Date.YEAR:
                s = e.getDate(), s > 28 && (s = Math.min(s, MX.util.Date.getLastDateOfMonth(MX.util.Date.add(MX.util.Date.getFirstDateOfMonth(e), MX.util.Date.YEAR, n)).getDate())), r.setDate(s), r.setFullYear(e.getFullYear() + n)
            }
            return r
        },
        between: function(e, t, n) {
            var r = e.getTime();
            return t.getTime() <= r && r <= n.getTime()
        },
        compat: function() {
            var e = window.Date,
                n, r, i = ["useStrict", "formatCodeToRegex", "parseFunctions", "parseRegexes", "formatFunctions", "y2kYear", "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "MONTH", "YEAR", "defaults", "dayNames", "monthNames", "monthNumbers", "getShortMonthName", "getShortDayName", "getMonthNumber", "formatCodes", "isValid", "parseDate", "getFormatCode", "createFormat", "createParser", "parseCodes"],
                s = ["dateFormat", "format", "getTimezone", "getGMTOffset", "getDayOfYear", "getWeekOfYear", "isLeapYear", "getFirstDayOfMonth", "getLastDayOfMonth", "getDaysInMonth", "getSuffix", "clone", "isDST", "clearTime", "add", "between"],
                o = i.length,
                u = s.length,
                a, f, l;
            for (l = 0; l < o; l++) a = i[l], e[a] = t[a];
            for (n = 0; n < u; n++) f = s[n], e.prototype[f] = function() {
                var e = Array.prototype.slice.call(arguments);
                return e.unshift(this), t[f].apply(t, e)
            }
        }
    };
    var t = MX.util.Date
}(), function() {
    var e = MX.lib.Zepto,
        t = /\{(\d+)\}/g,
        n = /('|\\)/g,
        r = /([-.*+?\^${}()|\[\]\/\\])/g,
        i = .9.toFixed() !== "1",
        s = function(e) {
            if (e && e.length > 0) {
                var t = e.split("-"),
                    n = 1,
                    r = t.length,
                    i = [];
                i.push(t[0]);
                for (; n < r; n++) i.push(MX.util.Format.capitalize(t[n]));
                e = i.join("")
            }
            return e
        },
        o = MX.util.Format = {
            leftPad: function(e, t, n) {
                var r = String(e);
                n = n || " ";
                while (r.length < t) r = n + r;
                return r
            },
            format: function(e) {
                var n = Array.prototype.slice.call(arguments, 1);
                return e.replace(t, function(e, t) {
                    return n[t]
                })
            },
            capitalize: function(e) {
                return e.length > 0 ? e.charAt(0).toUpperCase() + e.substr(1) : e
            },
            uncapitalize: function(e) {
                return e.length > 0 ? e.charAt(0).toLowerCase() + e.substr(1) : e
            },
            toCamelCase: function(t) {
                if (e.isPlainObject(t)) {
                    var n = {};
                    return e.each(t, function(e, t) {
                        n[s(e)] = t
                    }), n
                }
                return s(t)
            },
            urlAppend: function(t, n) {
                t += t.indexOf("?") === -1 ? "?" : "&";
                if (MX.isString(n)) t += n;
                else {
                    var r = [];
                    e.each(n, function(e, t) {
                        r.push(e + "=" + (t || ""))
                    }), t += r.join("&")
                }
                return t.charAt(t.length - 1) == "?" && (t = t.substring(0, t.length - 1)), t
            },
            escapeRegex: function(e) {
                return e.replace(r, "\\$1")
            },
            escape: function(e) {
                return e.replace(n, "\\$1")
            },
            numberToFixed: i ?
            function(e, t) {
                t = t || 0;
                var n = Math.pow(10, t);
                return (Math.round(e * n) / n).toFixed(t)
            } : function(e, t) {
                return e.toFixed(t)
            },
            from: function(e, t) {
                return isFinite(e) && (e = parseFloat(e)), isNaN(e) ? t : e
            },
            date: function(e, t) {
                return e ? (MX.isDate(e) || (e = new Date(Date.parse(e))), MX.util.Date.dateFormat(e, t || MX.util.Date.defaultFormat)) : ""
            },
            dateRenderer: function(e) {
                return function(t) {
                    return o.date(t, e)
                }
            }
        }
}(), function() {
    var e = window.localStorage,
        t = function(e) {
            try {
                return Zepto.isPlainObject(e) || Zepto.isArray(e) ? "$$jsondata$$" + JSON.stringify(e) : e
            } catch (t) {
                MX.Console.error("storage.js:12: convert value error: " + t.message)
            }
            return e
        },
        n = function(e) {
            try {
                var t = "$$jsondata$$",
                    n = t.length;
                if (e && e.length > n && e.substr(0, n) == t) return JSON.parse(e.substr(n))
            } catch (r) {
                MX.Console.error("storage.js:24: parse value error: " + r.message)
            }
            return e
        },
        r = {
            globalPrefix: "",
            set: function(n, i) {
                try {
                    e.setItem(r.globalPrefix + n, t(i))
                } catch (s) {
                    MX.Console.error("storage.js:34: set value error: " + s.message)
                }
            },
            get: function(t) {
                var i;
                try {
                    i = n(e.getItem(r.globalPrefix + t))
                } catch (s) {
                    MX.Console.error("storage.js:43: get value error: " + s.message)
                }
                return i
            },
            remove: function(t) {
                try {
                    e.removeItem(r.globalPrefix + t)
                } catch (n) {
                    MX.Console.error("storage.js:52: remove value error: " + n.message)
                }
            }
        };
    MX.util.Storage = r
}(), function() {
    var e = function(e) {
            var t = document.cookie.indexOf(";", e);
            return t == -1 && (t = document.cookie.length), decodeURIComponent(document.cookie.substring(e, t))
        };
    MX.util.Cookie = {
        set: function(e, t) {
            var n = arguments,
                r = arguments.length,
                i = r > 2 ? n[2] : null,
                s = r > 3 ? n[3] : "/",
                o = r > 4 ? n[4] : null,
                u = r > 5 ? n[5] : !1;
            document.cookie = e + "=" + encodeURIComponent(t) + (i === null ? "" : "; expires=" + i.toGMTString()) + (s === null ? "" : "; path=" + s) + (o === null ? "" : "; domain=" + o) + (u === !0 ? "; secure" : "")
        },
        get: function(t) {
            var n = t + "=",
                r = n.length,
                i = document.cookie.length,
                s = 0,
                o = 0;
            while (s < i) {
                o = s + r;
                if (document.cookie.substring(s, o) == n) return e(o);
                s = document.cookie.indexOf(" ", s) + 1;
                if (s === 0) break
            }
            return null
        },
        clear: function(e, t, n) {
            this.get(e) && (t = t || "/", document.cookie = e + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT; path=" + t + (n ? "; domain=" + n : ""))
        }
    }
}(), function() {
    function l(e) {
        e = e[0] || e, e.style.webkitTransform = "", e.style.webkitTransitionDuration = ""
    }
    var e = MX.lib.Zepto,
        t = "box oBox",
        n = 450,
        r = 12,
        i = 11,
        s = 10,
        o = "silent",
        u = function(e, t, n, r) {
            e = e[0] || e, e.removeEventListener("webkitTransitionEnd", a, !1), e.addEventListener("webkitTransitionEnd", a, !1), e.callback = n, e.canTrans = !0, e.className = t, e.transTimeout = setTimeout(function() {
                e.canTrans && (e.canTrans = !1, e.callback && e.callback())
            }, r > 0 ? r : 0)
        },
        a = function(e) {
            var t = this;
            e.preventDefault(), t.removeEventListener("webkitTransitionEnd", a, !1), clearTimeout(t.transTimeout), t.canTrans && (t.canTrans = !1, t.callback && t.callback())
        },
        f = function(t, n, r, i) {
            t = t[0] || t, t.removeEventListener("webkitTransitionEnd", a, !1), t.addEventListener("webkitTransitionEnd", a, !1), t.callback = r, t.canTrans = !0, e(t).css(n), t.transTimeout = setTimeout(function() {
                t.canTrans && (t.canTrans = !1, t.callback && t.callback())
            }, i > 0 ? i : 0)
        },
        c = {
            baseCss: t,
            animateDuration: n,
            transfromCss: u,
            transfromStyle: f,
            silentTransformCss: function(t, n, r, i) {
                t = e(t), t.addClass(o), e.isFunction(n) ? n.call(r || window) : MX.isString(n) ? t.addClass(n) : t.css(n), setTimeout(function() {
                    t.removeClass(o), i && i.call(r || window)
                }, 0)
            },
            slideLeft: function(r, i, s, o) {
                s = e.proxy(s, o), c.silentTransformCss(r, function() {
                    l(r), c.silentTransformCss(i, function() {
                        l(i)
                    }, window, function() {
                        u(i, t + " box_silent box_right", function() {
                            u(r, t), u(i, t + " box_current", s, n)
                        })
                    })
                })
            },
            slideRight: function(r, i, s, o) {
                s = e.proxy(s, o), c.silentTransformCss(r, function() {
                    l(r), c.silentTransformCss(i, function() {
                        l(i)
                    }, window, function() {
                        u(i, t + " box_silent box_before", function() {
                            u(r, t + " box_right", function() {
                                u(r, t + " box_silent", function() {
                                    u(r, t)
                                })
                            }, n), u(i, t + " box_current", s, n)
                        })
                    })
                })
            },
            shadeUpIn: function(o, a, f, l) {
                f = e.proxy(f, l);
                var c = e(o),
                    h = e(a);
                u(a, t + " box_silent box_below", function() {
                    h.css("z-index", r), c.hasClass("box_middle") && c.css("z-index", i), u(a, t + " box_middle", function() {
                        h.css("z-index", i), c.hasClass("box_middle") && c.css("z-index", s), f()
                    }, n)
                })
            },
            shadeUpOut: function(s, o, a, f) {
                a = e.proxy(a, f);
                var l = e(s),
                    c = e(o);
                !c.hasClass("box_middle") && !c.hasClass("box_current") && u(o, t + " box_silent box_current", function() {
                    u(o, t + " box_current")
                }), l.css("z-index", r), c.hasClass("box_middle") && c.css("z-index", i), u(s, t + " box_below", function() {
                    u(s, t + " box_silent", function() {
                        u(s, t, function() {
                            l.css("z-index", ""), c.hasClass("box_middle") && c.css("z-index", i), a()
                        })
                    })
                }, n)
            },
            shadeDownIn: function(r, o, a, f) {
                a = e.proxy(a, f);
                var l = e(r),
                    c = e(o);
                u(o, t + " box_silent box_above", function() {
                    c.css("z-index", i), l.hasClass("box_middle") && l.css("z-index", s), u(o, t + " box_middle", a, n)
                })
            },
            shadeDownOut: function(r, o, a, f) {
                a = e.proxy(a, f);
                var l = e(r),
                    c = e(o);
                !c.hasClass("box_middle") && !c.hasClass("box_current") && u(o, t + " box_silent box_current", function() {
                    u(o, t + " box_current")
                }), l.css("z-index", i), c.hasClass("box_middle") && c.css("z-index", s), u(r, t + " box_above", function() {
                    u(r, t + " box_silent", function() {
                        u(r, t, function() {
                            l.css("z-index", ""), c.hasClass("box_middle") && c.css("z-index", i), a()
                        })
                    })
                }, n)
            }
        };
    MX.app.Animate = c
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.lib.Template,
        n = MX.clazz.Class,
        r = MX.clazz.Utility;
    MX.app.Template = n.define({
        extend: r,
        isTemplate: !0,
        init: function() {
            try {
                if (!this.template) {
                    var n = e(this.targetTmpl).html();
                    this.template = t(n)
                } else MX.isString(this.template) && (this.template = t(this.template))
            } catch (r) {}
            this.store && this.bindStore(this.store, !0)
        },
        initEvents: function() {
            this.addEvents("beforerender", "render")
        },
        applyTemplate: function(e) {
            return this.template ? this.template(e || {}) : ""
        },
        render: function(e, t) {
            this.fireEvent("beforerender", this), this.el && (this.el.remove(), this.el = null), e = e || this.container;
            try {
                e.html(this.applyTemplate(t))
            } catch (n) {}
            return this.el = e.children(), this.fireEvent("render", this), this.el
        },
        bindStore: function(e, t) {
            t !== !0 && this.unbindStore(), e && (this.store = e, this.don(this.store, "load", this.onLoad, this))
        },
        unbindStore: function() {
            this.store && (this.dun(this.store, "load", this.onLoad, this), this.store = null)
        },
        onLoad: function() {
            var e, t = this.store;
            t.isModel ? e = t.get() : (e = {}, e[t.dataProperty] = t.get()), this.render(this.container, e)
        },
        onDestroy: function() {
            this.unbindStore()
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.app.Template;
    MX.app.View = t.define({
        extend: n,
        elIdPrefix: "webapp-view-",
        init: function() {
            this.initTemplate(), this.initComponent(), this.onInit()
        },
        initTemplate: function() {
            var e = this.templates;
            this.templates = {}, e && MX.each(MX.toArray(e), function(e, t) {
                this.addTemplate(t)
            }, this)
        },
        initComponent: function() {
            var e = this.components;
            this.components = {}, e && MX.each(MX.toArray(e), function(e, t) {
                this.addComponent(t)
            })
        },
        onInit: MX.emptyFn,
        initEvents: function() {
            this.addEvents("beforerender", "render"), this.onInitEvents()
        },
        onInitEvents: MX.emptyFn,
        render: function(t) {
            if (!this.rendered && this.fireEvent("beforerender", this) !== !1) {
                this.rendered = !0, this.ct = t = e(t || this.container), this.el = e(document.createElement("div")), this.el.attr({
                    id: this.elIdPrefix + this.id
                });
                var n = this.getInitialCls();
                n && this.el.addClass(n), this.cls && this.el.addClass(this.cls);
                var r = this.getInitialStyles();
                r && this.el.css(r), this.style && this.el.css(this.style), t.append(this.el), this.templates && MX.each(this.templates, function(e, t) {
                    t.container = this.el
                }, this), this.components && MX.each(this.components, function(e, t) {
                    t.container = this.el
                }, this), this.autoRenderTmpl && this.autoRenderTmpl.render(this.el), this.onRender(t), this.fireEvent("render", this)
            }
        },
        onRender: MX.emptyFn,
        getInitialCls: MX.emptyFn,
        getInitialStyles: MX.emptyFn,
        addTemplate: function(t) {
            var n;
            MX.isString(t) ? (n = MX.getClass(t), t = new n) : t.isTemplate || (e.isPlainObject(t) ? (n = MX.getClass(t.cls || r), t = new n(t)) : t = new t), t.autoRender === !0 && (this.autoRenderTmpl = t), this.templates[t.id] = t
        },
        getTemplate: function(e) {
            return this.templates[e]
        },
        addComponent: function(e) {
            e.isComponent || (e = (new MX.getClass(e))()), this.components[e.id] = e
        },
        getComponent: function(e) {
            return this.components[e]
        },
        getEl: function() {
            return this.el
        },
        getCt: function() {
            return this.ct
        },
        onDestroy: function() {
            MX.each(this.templates, function(e, t) {
                t.destroy()
            }, this), this.templates = null, MX.each(this.components, function(e, t) {
                t.destroy()
            }, this), this.components = null, this.el && this.el.remove(), this.el = this.ct = null
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.util.HashMap;
    MX.app.Controller = t.define({
        extend: n,
        init: function() {
            this.models = this.models || new r, this.stores = this.stores || new r, this.relayMethod(this.view, "getTemplate", "getComponent")
        },
        initEvents: function() {
            this.addEvents("beforeviewin", "viewin", "afterviewin", "beforeviewout", "viewout", "viewloading", "pulldown", "pullup", "scrollmove", "scrollend", "touchend")
        },
        initOnViewRender: function() {
            this.initDomEvents(), this.onInit(), this.onInitEvents()
        },
        onInit: MX.emptyFn,
        onInitEvents: MX.emptyFn,
        initDomEvents: function() {
            this.events && (this.bindEvent(this.events), delete this.events), this.delegates && (this.delegateEvent(this.delegates), delete this.delegates)
        },
        bindEvent: function(t, n, r, i, s) {
            var o = arguments.length;
            o == 1 && (n = t, t = this.view);
            if (e.isPlainObject(n)) {
                var u, a, f, r, l;
                s = n.scope || this, delete n.scope;
                for (u in n) f = u.indexOf(" "), r = f != -1 ? u.substring(f + 1) : "", a = f != -1 ? u.substring(0, f) : u, l = n[u], l = MX.isString(l) ? this[l] : l, this.bindEvent(t || this.view, a, r, l, s);
                return
            }
            o == 3 ? (i = r, r = n, n = t, t = this.view) : o == 4 && MX.isString(t) && (s = i, i = r, r = n, n = t, t = this.view), this.mon(r ? t.el.find(r) : t.el, n, this.createCallbackFn(i, s))
        },
        unbindEvent: function(e, t, n, r, i) {
            var s = arguments.length;
            s == 3 ? (r = n, n = t, t = e, e = this.view) : s == 4 && MX.isString(e) && (i = r, r = n, n = t, t = e, e = this.view), this.mun(n ? e.el.find(n) : e.el, t, this.createCallbackFn(r, i))
        },
        delegateEvent: function(t, n, r, i, s) {
            var o = arguments.length;
            o == 1 && (n = t, t = this.view);
            if (e.isPlainObject(n)) {
                var u, a, f, r, l;
                s = n.scope || this, delete n.scope;
                for (u in n) f = u.indexOf(" "), r = u.substring(f + 1), a = u.substring(0, f), l = n[u], l = MX.isString(l) ? this[l] : l, this.delegateEvent(t || this.view, a, r, l, s);
                return
            }
            o == 3 ? (i = r, r = n, n = t, t = this.view) : o == 4 && MX.isString(t) && (s = i, i = r, r = n, n = t, t = this.view), this.delegate(t.el, r, n, this.createCallbackFn(i, s))
        },
        undelegateEvent: function(e, t, n, r, i) {
            var s = arguments.length;
            s == 3 ? (r = n, n = t, t = e, e = this.view) : s == 4 && MX.isString(e) && (i = r, r = n, n = t, t = e, e = this.view), this.undelegate(e.el, n, t, this.createCallbackFn(r, i))
        },
        createCallbackFn: function(t, n) {
            return e.proxy(function(e) {
                e.preventDefault(), t.apply(n || this, arguments)
            }, this)
        },
        createViewEventCache: function() {
            this.viewEventCaches || (this.viewEventCaches = [])
        },
        clearViewEventCache: function() {
            if (this.viewEventCaches) {
                var e = this.viewEventCaches.length - 1,
                    t;
                for (; e >= 0; e--) t = this.viewEventCaches[e], this.dun(t.obj, t.event, t.fn, t.scope)
            }
        },
        bindViewEvent: function(e, t, n, r) {
            this.createViewEventCache(), this.viewEventCaches.push({
                obj: e,
                event: t,
                fn: n,
                scope: r
            }), this.don(e, t, n, r)
        },
        getHideInput: function() {
            return this.getEl().find("input,select,textarea")
        },
        beforeViewIn: MX.emptyFn,
        onViewIn: MX.emptyFn,
        afterViewIn: MX.emptyFn,
        beforeViewOut: MX.emptyFn,
        onViewOut: MX.emptyFn,
        onViewLoading: MX.emptyFn,
        onPreloading: MX.emptyFn,
        onViewBlockOut: MX.emptyFn,
        onPullDown: MX.emptyFn,
        onPullUp: MX.emptyFn,
        beforeScrollStart: MX.emptyFn,
        beforeScrollMove: MX.emptyFn,
        onOriginalScrollMove: MX.emptyFn,
        onScrollMove: MX.emptyFn,
        onScrollEnd: MX.emptyFn,
        onTouchEnd: MX.emptyFn,
        onSwipeDownBack: function() {
            this.getPagelet().webapp.back(null, {
                unloadSource: !0
            })
        },
        onResetBoxHeight: MX.emptyFn,
        getPagelet: function() {
            return this.pagelet
        },
        getModel: function(e) {
            return this.models.get(e)
        },
        getStore: function(e) {
            return this.stores.get(e)
        },
        getView: function() {
            return this.view
        },
        getEl: function() {
            return this.view && this.view.el
        },
        getCt: function() {
            return this.view && this.view.getCt()
        },
        getPageletCt: function() {
            return this.pagelet && this.pagelet.ct
        },
        getPageletEl: function() {
            return this.pagelet && this.pagelet.el
        },
        getMainEl: function() {
            return this.pagelet && this.pagelet.mainEl
        },
        getLoadingEl: function() {
            return this.pagelet && this.pagelet.loadingEl
        },
        getScroll: function() {
            return this.pagelet && this.pagelet.scroll
        },
        getHeader: function() {
            return this.pagelet && this.pagelet.header
        },
        getFooter: function() {
            return this.pagelet && this.pagelet.footer
        },
        getParams: function() {
            return this.pagelet && this.pagelet.params
        },
        getHash: function() {
            return this.pagelet && this.pagelet.hash
        },
        getScrollY: function() {
            var e = this.getScroll();
            return e ? e.y + e.options.topOffset : document.body.scrollTop
        },
        getHeadAndFootHeight: function() {
            var e = 0,
                t = this.getHeader(),
                n = this.getFooter();
            return t && (e += t.getHeight()), n && (e += n.getHeight()), e
        },
        setViewInEffect: function(e) {
            this.pagelet && (this.pagelet.viewInEffect = e)
        },
        setViewOutEffect: function(e) {
            this.pagelet && (this.pagelet.viewOutEffect = e)
        },
        enablePulling: function() {
            this.pagelet && (this.pagelet.setEnablePullDown(!0), this.pagelet.setEnablePullUp(!0))
        },
        disablePulling: function() {
            this.pagelet && (this.pagelet.setEnablePullDown(!1), this.pagelet.setEnablePullUp(!1))
        },
        enablePullDown: function() {
            this.pagelet && this.pagelet.setEnablePullDown(!0)
        },
        disablePullDown: function() {
            this.pagelet && this.pagelet.setEnablePullDown(!1)
        },
        enablePullUp: function() {
            this.pagelet && this.pagelet.setEnablePullUp(!0)
        },
        disablePullUp: function() {
            this.pagelet && this.pagelet.setEnablePullUp(!1)
        },
        refreshScroll: function() {
            this.pagelet && this.pagelet.refreshScroll()
        },
        resetPullDownStatus: function() {
            this.pagelet && this.pagelet.resetPullDownStatus()
        },
        resetPullUpStatus: function() {
            this.pagelet && this.pagelet.resetPullUpStatus()
        },
        setPreloadLeftView: function(e) {
            this.pagelet && this.pagelet.setPreloadView(!0, e)
        },
        setPreloadRightView: function(e) {
            this.pagelet && this.pagelet.setPreloadView(!1, e)
        },
        isPreload: function() {
            return !!this.pagelet && !! this.pagelet.isPreloadView
        },
        preloadComplete: function() {
            this.pagelet && this.pagelet.preloadComplete()
        },
        isCurrentView: function() {
            return !!this.pagelet && !! this.pagelet.isCurrentView
        },
        onDestroy: function() {
            this.clearViewEventCache(), this.models = this.stores = this.view = this.pagelet = null
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.app.View,
        r = MX.app.Animate;
    MX.app.HeaderView = t.define({
        extend: n,
        elIdPrefix: "webapp-header-",
        animateDuration: 250,
        useFixed: !0,
        "float": !1,
        init: function() {
            this.callParent(), this.hidden = !1
        },
        initEvents: function() {
            this.addEvents("show", "hide")
        },
        getInitialCls: function() {
            return "boxFlow"
        },
        show: function(t) {
            if (this.hidden) {
                this.hidden = !1;
                var n = this.el;
                !this.useFixed && this.float || t === !0 ? (n.css(this.useFixed || !this.float ? {
                    "margin-top": "0px",
                    visibility: "",
                    display: ""
                } : {
                    "margin-top": "",
                    visibility: "",
                    display: ""
                }), this.onShow(), this.fireEvent("show", this)) : (n[0].style.webkitTransitionProperty = "margin", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "200ms", r.transfromStyle(n, {
                    "margin-top": "0px",
                    visibility: "",
                    display: ""
                }, e.proxy(function() {
                    n[0].style.webkitTransitionProperty = "", n[0].style.webkitTransitionTimingFunction = "", n[0].style.webkitTransitionDuration = "", this.onShow(), this.fireEvent("show", this)
                }, this), this.animateDuration))
            }
        },
        onShow: MX.emptyFn,
        hide: function(t) {
            if (!this.hidden) {
                this.hidden = !0;
                var n = this.el;
                !this.useFixed && this.float || t === !0 ? (n.css(this.useFixed || !this.float ? {
                    "margin-top": "-" + n.height() + "px",
                    visibility: "hidden",
                    display: ""
                } : {
                    "margin-top": "",
                    visibility: "",
                    display: "none"
                }), this.onHide(), this.fireEvent("hide", this)) : (n[0].style.webkitTransitionProperty = "margin", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "200ms", r.transfromStyle(n, {
                    "margin-top": "-" + n.height() + "px"
                }, e.proxy(function() {
                    n[0].style.webkitTransitionProperty = "", n[0].style.webkitTransitionTimingFunction = "", n[0].style.webkitTransitionDuration = "", n.css("visibility", "hidden"), this.onHide(), this.fireEvent("hide", this)
                }, this), this.animateDuration))
            }
        },
        onHide: MX.emptyFn,
        isHidden: function() {
            return this.hidden
        },
        getHeight: function(e) {
            var t = 0,
                n = this.el;
            if (!this.isHidden() || e === !0) if (!this.float && n) return n.height() + MX.parsePx(n.css("margin-top"));
            return t
        },
        getOriginalHeight: function() {
            return this.el ? this.el.height() : 0
        },
        resetMargin: function() {
            this.el && this.el.css({
                "margin-top": (this.hidden ? "-" + this.el.height() : "0") + "px"
            })
        },
        setMarginTop: function(e) {
            !this.hidden && this.el && this.el.css({
                "margin-top": e + "px"
            })
        }
    })
}(), function() {
    var e = MX.clazz.Class,
        t = MX.app.HeaderView,
        n = MX.app.Animate;
    MX.app.FooterView = e.define({
        extend: t,
        elIdPrefix: "webapp-footer-",
        show: function(e) {
            if (this.hidden) {
                this.hidden = !1;
                var t = this.el;
                !this.useFixed && this.float || e === !0 ? (t.css(this.useFixed || !this.float ? {
                    "margin-bottom": "0px",
                    visibility: "",
                    display: ""
                } : {
                    "margin-bottom": "",
                    visibility: "",
                    display: ""
                }), this.onShow(), this.fireEvent("show", this)) : (t[0].style.webkitTransitionProperty = "margin", t[0].style.webkitTransitionTimingFunction = "ease", t[0].style.webkitTransitionDuration = "200ms", n.transfromStyle(t, {
                    "margin-bottom": "0px",
                    visibility: "",
                    display: ""
                }, Zepto.proxy(function() {
                    t[0].style.webkitTransitionProperty = "", t[0].style.webkitTransitionTimingFunction = "", t[0].style.webkitTransitionDuration = "", this.onShow(), this.fireEvent("show", this)
                }, this), this.animateDuration))
            }
        },
        hide: function(e) {
            if (!this.hidden) {
                this.hidden = !0;
                var t = this.el;
                !this.useFixed && this.float || e === !0 ? (t.css(this.useFixed || !this.float ? {
                    "margin-bottom": "-" + t.height() + "px",
                    visibility: "hidden",
                    display: ""
                } : {
                    "margin-bottom": "",
                    visibility: "",
                    display: "none"
                }), this.onHide(), this.fireEvent("hide", this)) : (t[0].style.webkitTransitionProperty = "margin", t[0].style.webkitTransitionTimingFunction = "ease", t[0].style.webkitTransitionDuration = "200ms", n.transfromStyle(t, {
                    "margin-bottom": "-" + t.height() + "px"
                }, Zepto.proxy(function() {
                    t[0].style.webkitTransitionProperty = "", t[0].style.webkitTransitionTimingFunction = "", t[0].style.webkitTransitionDuration = "", t.css("visibility", "hidden"), this.onHide(), this.fireEvent("hide", this)
                }, this), this.animateDuration))
            }
        },
        getHeight: function(e) {
            var t = 0,
                n = this.el;
            if (!this.isHidden() || e === !0) if (!this.float && n) return n.height() + MX.parsePx(n.css("margin-bottom"));
            return t
        },
        resetMargin: function() {
            this.el && this.el.css({
                "margin-bottom": (this.hidden ? "-" + this.el.height() : "0") + "px"
            })
        },
        setMarginBottom: function(e) {
            !this.hidden && this.el && this.el.css({
                "margin-bottom": e + "px"
            })
        }
    })
}(), function() {
    var e = MX.clazz.Class,
        t = MX.clazz.Utility,
        n = MX.util.HashMap;
    MX.app.Header = e.define({
        extend: t,
        singleton: !0,
        init: function() {
            this.models = this.models || {}, this.stores = this.stores || {}, this.modelInstances = new n, this.storeInstances = new n, this.initView(), this.initController()
        },
        initView: function() {
            this.view || (this.view = new this.viewCls({
                container: this.container
            }))
        },
        initController: function() {
            if (!this.controller && this.controllerCls) {
                this.destroyModelAndStore();
                var e, t;
                MX.each(this.models, function(t, n) {
                    n.singleton ? e = n.instance : e = new n.cls(n), this.modelInstances.add(e)
                }, this), MX.each(this.stores, function(e, n) {
                    n.singleton ? t = new n.cls(n) : t = n.instance, this.storeInstances.add(t)
                }, this), this.controller = new this.controllerCls({
                    headlet: this,
                    view: this.view,
                    models: this.modelInstances,
                    stores: this.storeInstances,
                    getHeader: function() {
                        return this.headlet.header
                    },
                    getFooter: function() {
                        return this.headlet.footer
                    },
                    setMargin: this.setMargin
                }), this.don(this.view, "render", this.controller.initOnViewRender, this.controller)
            }
        },
        render: function(e) {
            this.view.render(e)
        },
        isRendered: function() {
            return this.view ? this.view.rendered : !1
        },
        applyParams: function(e) {
            Zepto.extend(this, e), this.view.useFixed = this.useFixed, this.view.float = this.float, this.controller.pagelet = this.pagelet, this.getEl()[this.float ? "addClass" : "removeClass"]("boxFlow_above")
        },
        prepare: function(e) {
            this.handleControl("Prepare", !1, e)
        },
        load: function(e) {
            this.controller.relayMethod(this, "getPageletController"), this.handleControl("Load", !1, e)
        },
        beforeRelease: function(e) {
            this.handleControl("beforeRelease", !0, e)
        },
        release: function(e) {
            e.duplicate || (this.useFixed = !0, this.view.useFixed = !0, this.float = !1, this.view.float = !1, delete this.params, delete this.header, delete this.footer, delete this.pagelet, delete this.pageletController, delete this.controller.getPageletController), this.handleControl("Release", !1, e)
        },
        handleControl: function(e, t, n) {
            var r = this.controller,
                i;
            r && (i = r[t === !0 ? e : "on" + e], i && i.call(r, n))
        },
        getHideInput: function() {
            return this.controller ? this.controller.getHideInput() : null
        },
        show: function(e, t) {
            this.view.show(e);
            var n = this.pagelet,
                r;
            !e && t !== !0 && this.useFixed && !this.float && n && (r = n.group ? n.group.viewCt : n.mainEl, r[0].style.webkitTransitionProperty = "height", r[0].style.webkitTransitionTimingFunction = "ease", r[0].style.webkitTransitionDuration = "200ms", r.height(MX.getWindowHeight() - this.getOriginalHeight() - (n.footer ? n.footer.getOriginalHeight() : 0)), setTimeout(function() {
                r && (r[0].style.webkitTransitionProperty = "", r[0].style.webkitTransitionTimingFunction = "", r[0].style.webkitTransitionDuration = "")
            }, this.view.animateDuration)), this.controller && this.controller.onShow && this.controller.onShow()
        },
        hide: function(e, t) {
            this.view.hide(e);
            var n = this.pagelet,
                r;
            !e && t !== !0 && this.useFixed && !this.float && n && (r = n.group ? n.group.viewCt : n.mainEl, r[0].style.webkitTransitionProperty = "height", r[0].style.webkitTransitionTimingFunction = "ease", r[0].style.webkitTransitionDuration = "200ms", r.height(MX.getWindowHeight() - (n.footer ? n.footer.getOriginalHeight() : 0)), setTimeout(function() {
                r && (r[0].style.webkitTransitionProperty = "", r[0].style.webkitTransitionTimingFunction = "", r[0].style.webkitTransitionDuration = "")
            }, this.view.animateDuration)), this.controller && this.controller.onHide && this.controller.onHide()
        },
        getView: function() {
            return this.view
        },
        getController: function() {
            return this.controller
        },
        getEl: function() {
            return this.view.el
        },
        getHeight: function(e) {
            return this.view.getHeight(e)
        },
        getOriginalHeight: function() {
            return this.view.getOriginalHeight()
        },
        getPagelet: function() {
            return this.pagelet
        },
        getPageletController: function() {
            return this.pageletController
        },
        getFooter: function() {
            return this.footer
        },
        destroyModelAndStore: function() {
            this.modelInstances.each(function(e, t) {
                t.singleton || t.destroy()
            }, this), this.modelInstances.clear(), this.storeInstances.each(function(e, t) {
                t.singleton || t.destroy()
            }, this), this.storeInstances.clear()
        },
        onDestroy: function() {
            delete this.params, delete this.header, delete this.footer, delete this.pagelet, delete this.pageletController, this.controller && (delete this.controller.getPageletController, this.controller.destroy()), this.view.destroy(), this.view = this.controller = null, this.destroyModelAndStore()
        }
    })
}(), function() {
    var e = MX.clazz.Class,
        t = MX.app.Header;
    MX.app.Footer = e.define({
        extend: t,
        getHeader: function() {
            return this.header
        },
        show: function(e, t) {
            this.view.show(e);
            var n = this.pagelet,
                r;
            !e && t !== !0 && this.useFixed && !this.float && n && (r = n.group ? n.group.viewCt : n.mainEl, r[0].style.webkitTransitionProperty = "height", r[0].style.webkitTransitionTimingFunction = "ease", r[0].style.webkitTransitionDuration = "200ms", r.height(MX.getWindowHeight() - this.getOriginalHeight() - (n.header ? n.header.getOriginalHeight() : 0)), setTimeout(function() {
                r && (r[0].style.webkitTransitionProperty = "", r[0].style.webkitTransitionTimingFunction = "", r[0].style.webkitTransitionDuration = "")
            }, this.view.animateDuration)), this.controller && this.controller.onShow && this.controller.onShow()
        },
        hide: function(e, t) {
            this.view.hide(e);
            var n = this.pagelet,
                r;
            !e && t !== !0 && this.useFixed && !this.float && n && (r = n.group ? n.group.viewCt : n.mainEl, r[0].style.webkitTransitionProperty = "height", r[0].style.webkitTransitionTimingFunction = "ease", r[0].style.webkitTransitionDuration = "200ms", r.height(MX.getWindowHeight() - (n.header ? n.header.getOriginalHeight() : 0)), setTimeout(function() {
                r && (r[0].style.webkitTransitionProperty = "", r[0].style.webkitTransitionTimingFunction = "", r[0].style.webkitTransitionDuration = "")
            }, this.view.animateDuration)), this.controller && this.controller.onHide && this.controller.onHide()
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.util.NetworkMonitor,
        i = MX.util.Date;
    MX.app.Model = t.define({
        extend: n,
        isModel: !0,
        disableCache: !1,
        priorityCache: !1,
        cacheExpires: 36e5,
        defaultRequestMethod: "GET",
        idProperty: "id",
        dataProperty: "data",
        autoLoad: !1,
        dirty: !1,
        init: function() {
            this.baseParams = this.baseParams || {}, this.renderer = this.renderer || {}, this.initRestful(), this.initFields(), this.initTable(), this.fetched = !1, this.removed = !1, this.modified = {}, this.data = {}, this.values && (this.initialData = e.extend({}, this.values), this.set(this.values)), this.autoLoad && this.load()
        },
        initRestful: function() {
            this.restful = this.restful || "", MX.isString(this.restful) && (this.restful = {
                create: this.restful,
                read: this.restful,
                update: this.restful,
                destroy: this.restful
            });
            var t, n, r = {};
            for (t in this.restful) n = this.restful[t], MX.isString(n) ? n = {
                url: n,
                type: this.defaultRequestMethod
            } : n = e.extend({
                type: this.defaultRequestMethod
            }, n), r[t] = n;
            this.restful = r
        },
        initFields: function() {
            if (this.fields) {
                var e = {};
                MX.each(this.fields, function(t, n) {
                    MX.isString(n) && (n = {
                        name: n
                    }), n.type = n.type, e[n.name] = n
                }, this), e[this.idProperty] = {
                    name: this.idProperty
                }, this.fields = e
            }
        },
        initTable: function() {
            var e = this;
            e.fields || (e.disableCache = !0);
            if (!e.disableCache && e.tableName) {
                var t, n = e.fields,
                    r = [],
                    i = [];
                i.push(e.idProperty + " UNIQUE");
                for (t in n) t != e.idProperty && (i.push(t), r.push(t));
                i.push("_last_updated TIMESTAMP"), r = r.join(","), e.db.transaction(function(t) {
                    t.executeSql("CREATE TABLE IF NOT EXISTS " + e.tableName + " (" + i.join(", ") + ")", [], function(t, n) {
                        t.executeSql("SELECT * FROM systables WHERE table_name = ?", [e.tableName], function(t, n) {
                            n.rows.length == 0 && t.executeSql("INSERT INTO systables VALUES (?)", [e.tableName])
                        }), t.executeSql("SELECT column_name FROM syscolumns WHERE table_name = ?", [e.tableName], function(t, n) {
                            var s = !0;
                            n.rows.length == 0 ? t.executeSql("INSERT INTO syscolumns VALUES (?, ?)", [e.tableName, r]) : n.rows.item(0)["column_name"] != r ? t.executeSql("UPDATE syscolumns SET column_name = ? WHERE table_name = ?", [r, e.tableName]) : s = !1, s && (t.executeSql("DROP TABLE " + e.tableName, []), t.executeSql("CREATE TABLE IF NOT EXISTS " + e.tableName + " (" + i.join(", ") + ")", []))
                        })
                    })
                }, function(e) {
                    MX.Console.error("model.js:190 : Err_message: " + e.message)
                })
            }
        },
        initEvents: function() {
            this.addEvents("datachanged", "idchanged", "beforeload", "load", "loadfailed", "sync", "remove")
        },
        set: function(e, t) {
            var n, r = this.fields || e,
                i = this.data,
                s = this.modified,
                o, u, a, f, l, c, h = {},
                p = {};
            MX.isString(e) && (n = e, e = {}, e[n] = t);
            for (n in r) if (e.hasOwnProperty(n)) {
                t = e[n] || "", o = i[n];
                if (s[n] === t) {
                    i[n] = t, h[n] = t, p[n] = o, delete s[n], a = !1;
                    for (u in s) this.dirty = !0, a = !0;
                    a || (this.dirty = !1)
                } else o !== t && (i[n] = t, h[n] = t, p[n] = o, MX.isDefined(s[n]) || (s[n] = o, this.dirty = !0));
                n == this.idProperty && o !== t && (this.fetched = !1, f = !0, l = o, c = t)
            }
            f && this.fireEvent("idchanged", c, l), this.fireEvent("datachanged", h, p)
        },
        getId: function() {
            return this.data[this.idProperty]
        },
        get: function(t, n) {
            var r, i = this.data,
                s = this.renderer,
                o = function(t) {
                    return t && (e.isFunction(t) ? t = {
                        renderer: t
                    } : MX.isString(t) && (t = {
                        type: t
                    })), t
                };
            if (n === !0) r = t ? i[t] : e.extend({}, i);
            else if (this.fields) if (t) r = this.renderData(this.fields[t], i[t]);
            else {
                r = {}, fields = this.fields;
                for (t in fields) r[t] = this.renderData(fields[t], i[t])
            } else if (t) s ? r = this.renderData(o(s[t]), i[t]) : r = i[t];
            else {
                r = {};
                for (t in i) r[t] = this.renderData(o(s[t]), i[t])
            }
            return r
        },
        getRawValue: function(e) {
            return this.get(e, !0)
        },
        renderData: function(t, n) {
            if (t) {
                var r = "Y-m-d H:i:s",
                    s = t.renderer,
                    o = t.type;
                try {
                    if (s && e.isFunction(s)) n = s.call(this, n);
                    else if (o == "number") n = parseInt(n);
                    else if (o == "float") n = parseFloat(n);
                    else if (o == "date") n = i.parse(n, t.format || r);
                    else if (o == "timestampToDateString") {
                        var u = new Date;
                        u.setTime(n), n = i.format(u, t.format || r)
                    } else o == "string" && (n = "" + n)
                } catch (a) {}
            }
            return n
        },
        load: function(e) {
            this.removed || (!this.disableCache && (!r.online || this.priorityCache) ? this.loadStorage(e) : this.fetch(e))
        },
        fetch: function(t) {
            !this.removed && !this.loading && this.fireEvent("beforeload", this) !== !1 && (this.loading = !0, t = t || {}, t.data = t.data || {}, t.data = e.extend({}, this.baseParams, this.getFetchParams() || {}, t.data, {
                _dt: (new Date).getTime()
            }), t = e.extend({
                type: this.defaultRequestMethod
            }, this.restful.read, t, {
                dataType: "json",
                success: e.proxy(this.onFetchSuccess, this),
                error: e.proxy(this.handleLoadFailed, this),
                complete: e.proxy(this.handleRequestComplete, this)
            }), this.cancelFetch(), this.lastXhr = MX.ajax(t))
        },
        cancelFetch: function() {
            this.lastXhr && (this.lastXhr.abort(), delete this.lastXhr)
        },
        getFetchParams: function(e) {
            var e = {};
            return e[this.idProperty] = this.getId(), e
        },
        onFetchSuccess: function(e, t, n) {
            if (!e) return;
            e = this.dataProperty ? e[this.dataProperty] : e, this.handleLoadSuccess(e), this.updateStorage()
        },
        sync: function() {},
        remove: function(e) {},
        handleLoadSuccess: function(e) {
            this.fetched = !0, this.set(e || {}), this.modified = {}, this.dirty = !1, this.fireEvent("load", this)
        },
        handleLoadFailed: function() {
            for (var e in this.data) this.data.hasOwnProperty(e) && e != this.idProperty && (this.data[e] = "");
            this.modified = {}, this.dirty = !1, this.fireEvent("loadfailed", this)
        },
        handleRequestComplete: function() {
            this.loading = !1, delete this.lastXhr
        },
        hasStorage: function() {
            return this.fatched
        },
        getStorageId: function() {
            return this.getId()
        },
        loadStorage: function(e) {
            var t = this,
                n = t.getStorageId();
            !t.disableCache && n && t.db.transaction(function(i) {
                i.executeSql("SELECT * FROM " + t.tableName + " WHERE " + t.idProperty + " = ?", [n], function(n, i) {
                    if (i.rows.length > 0) {
                        var s, o, u = {},
                            a = i.rows.item(0);
                        if (r.online && a._last_updated + t.cacheExpires < (new Date).getTime()) t.fetch(e);
                        else {
                            for (s in t.fields) t.fields.hasOwnProperty(s) && (u[s] = t.parseValue(a[s]));
                            t.handleLoadSuccess(u)
                        }
                    } else r.online ? t.fetch(e) : t.handleLoadFailed()
                })
            }, function(e) {
                MX.Console.error("model.js:500 : Err_message: " + e.message), t.handleLoadFailed()
            })
        },
        updateStorage: function() {
            var e = this,
                t = e.getStorageId();
            !e.disableCache && t && e.db.transaction(function(n) {
                n.executeSql("SELECT * FROM " + e.tableName + " WHERE " + e.idProperty + " = ?", [t], function(n, r) {
                    var i, s, o = e.fields,
                        u = e.data,
                        a, f = [],
                        l = [],
                        c = [],
                        h;
                    if (r.rows.length > 0) {
                        for (i in o) i != e.idProperty && (f.push(i + " = ?"), c.push(e.convertValue(u[i])));
                        f.push("_last_updated = ?"), c.push((new Date).getTime()), c.push(t), a = "UPDATE " + e.tableName + " SET " + f.join(", ") + " WHERE " + e.idProperty + " = ?"
                    } else {
                        f.push(e.idProperty), l.push("?"), c.push(t);
                        for (i in o) i != e.idProperty && (f.push(i), l.push("?"), c.push(e.convertValue(u[i])));
                        f.push("_last_updated"), l.push("?"), c.push((new Date).getTime()), a = "INSERT INTO " + e.tableName + " (" + f.join(", ") + ") VALUES (" + l.join(", ") + ")"
                    }
                    n.executeSql(a, c)
                })
            }, function(e) {
                MX.Console.error("model.js:552 : Err_message: " + e.message)
            })
        },
        convertValue: function(t) {
            try {
                return e.isPlainObject(t) || e.isArray(t) ? "$$jsondata$$" + JSON.stringify(t) : t
            } catch (n) {}
            return t
        },
        parseValue: function(e) {
            try {
                var t = "$$jsondata$$",
                    n = t.length;
                if (e && e.length > n && e.substr(0, n) == t) return JSON.parse(e.substr(n))
            } catch (r) {}
            return e
        },
        removeStorage: function() {}
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.util.Collection,
        i = MX.util.NetworkMonitor;
    MX.app.Store = t.define({
        extend: n,
        isStore: !0,
        disableCache: !1,
        priorityCache: !1,
        cacheExpires: 36e5,
        modelCls: "MX.app.Model",
        idProperty: "id",
        defaultRequestMethod: "GET",
        dataProperty: "data",
        pageSize: 20,
        autoLoad: !1,
        currentPage: 1,
        init: function() {
            this.baseParams = this.baseParams || {}, this.initRestful(), this.initTable(), this.storageKey = this.storageKey || this.id, this.meta = this.meta || {}, MX.applyIf(this.meta, {
                pageNumberProperty: "page",
                pageSizeProperty: "pageSize",
                pageStartProperty: "pageStart",
                totalProperty: "total"
            }), this.modelRestful = this.modelRestful || this.restful, this.modelCls = MX.getClass(this.modelCls), this.fetched = !1, this.data = new r({
                getKey: function(e) {
                    return e.data[e.idProperty]
                }
            }), this.autoLoad && this.load()
        },
        initRestful: function() {
            this.restful = this.restful || "", MX.isString(this.restful) && (this.restful = {
                create: this.restful,
                read: this.restful,
                update: this.restful,
                destroy: this.restful
            });
            var t, n, r = {};
            for (t in this.restful) n = this.restful[t], MX.isString(n) ? n = {
                url: n,
                type: this.defaultRequestMethod
            } : n = e.extend({
                type: this.defaultRequestMethod
            }, n), r[t] = n;
            this.restful = r
        },
        initTable: function() {
            var e = this;
            e.disableCache || (e.tableName = e.tableName || "storepaging", e.db.transaction(function(t) {
                t.executeSql("CREATE TABLE IF NOT EXISTS " + e.tableName + " (id UNIQUE, value, _last_updated TIMESTAMP)", [], function(t, n) {
                    t.executeSql("SELECT * FROM systables WHERE table_name = ?", [e.tableName], function(t, n) {
                        n.rows.length == 0 && t.executeSql("INSERT INTO systables VALUES (?)", [e.tableName])
                    })
                })
            }, function(e) {
                MX.Console.error("store.js:180 : Err_message: " + e.message)
            }))
        },
        initEvents: function() {
            this.addEvents("datachange", "beforeload", "load", "loadfailed", "remove")
        },
        load: function(e) {
            this.removed || (e = e || {}, e.data = e.data || {}, e.data.page = e.data.page || this.currentPage, !this.disableCache && (!i.online || this.priorityCache) ? this.loadStorage(e) : this.fetch(e))
        },
        fetch: function(t) {
            var n = this,
                r = n.meta,
                i, s = n.maxPage;
            t = t || {}, t.data = t.data || {}, i = t.data.page || n.currentPage, i = i < 1 ? 1 : i, t.data.page = i, !n.loading && i && (!s || s && i <= s) && n.fireEvent("beforeload", n, i) !== !1 && (n.loading = !0, n.toPage = i, t.data[r.pageNumberProperty] = i, t.data[r.pageSizeProperty] = n.pageSize, t.data[r.pageStartProperty] = (i - 1) * n.pageSize, t.data._dt = (new Date).getTime(), t.data = e.extend({}, n.baseParams, t.data), t = e.extend({
                type: n.defaultRequestMethod
            }, n.restful.read, t, {
                dataType: "json",
                success: e.proxy(n.onFetchSuccess, n),
                error: e.proxy(n.handleLoadFailed, n),
                complete: e.proxy(n.handleRequestComplete, n)
            }), n.cancelFetch(), n.lastXhr = MX.ajax(t))
        },
        cancelFetch: function() {
            this.lastXhr && (this.lastXhr.abort(), delete this.lastXhr)
        },
        onFetchSuccess: function(e, t, n) {
            if (!e) return;
            var r = this.dataProperty ? e[this.dataProperty] : e;
            this.handleLoadSuccess(r), this.updateStorage(e)
        },
        handleLoadSuccess: function(e) {
            e = e || [], this.lastPage = this.currentPage, this.currentPage = this.toPage;
            if (e.length > 0) {
                var t = this.meta;
                MX.isDefined(e[t.totalProperty]) && (this.total = e[t.totalProperty]), this.data.clear(), this.appendData(e), this.fireEvent("datachanged", this)
            } else this.data.clear(), this.fireEvent("datachanged", this);
            this.fireEvent("load", this)
        },
        handleLoadFailed: function() {
            this.data.clear(), this.fireEvent("loadfailed", this)
        },
        handleRequestComplete: function() {
            this.loading = !1, delete this.lastXhr
        },
        appendData: function(e) {
            e && MX.each(e, function(e, t) {
                this.data.add(this.createModel(t))
            }, this)
        },
        createModel: function(e) {
            return new this.modelCls({
                disableCache: !0,
                idProperty: this.idProperty,
                restful: this.modelRestful,
                fields: this.fields,
                renderer: this.renderer,
                values: e,
                listeners: {
                    scope: this,
                    sync: this.onModelSync,
                    remove: this.onModelRemove
                }
            })
        },
        onModelSync: function() {
            this.fireEvent("datachanged", this)
        },
        onModelRemove: function(e) {
            this.data.removeKey(e.getId()), this.fireEvent("datachanged", this)
        },
        first: function() {
            this.load({
                data: {
                    page: 1
                }
            })
        },
        last: function() {
            if (MX.isDefined(this.total)) {
                var e = this.getPageData().pageCount;
                this.load({
                    data: {
                        page: e
                    }
                })
            }
        },
        previous: function() {
            this.load({
                data: {
                    page: this.currentPage - 1
                }
            })
        },
        next: function() {
            this.currentPage == 1 && this.get().length == 0 ? this.first() : this.load({
                data: {
                    page: this.currentPage + 1
                }
            })
        },
        add: function(e) {
            this.appendData(MX.toArray(e))
        },
        insert: function(e, t) {
            this.data.insert(e, this.createModel(t)), this.fireEvent("datachanged", this)
        },
        remove: function(e) {
            var t = this.data.item(e);
            t && t.remove()
        },
        each: function(e, t) {
            this.data.each(e, t || this)
        },
        get: function(e, t) {
            var n, r;
            return e ? (r = this.data.item(e), r && (n = r.get(null, t))) : (n = [], this.each(function(e) {
                n.push(e.get(null, t))
            })), n
        },
        getPageData: function() {
            return {
                total: this.total,
                maxPage: this.maxPage,
                currentPage: this.currentPage,
                pageCount: MX.isDefined(this.total) ? Math.ceil(this.total / this.pageSize) : 1,
                fromRecord: (this.currentPage - 1) * this.pageSize + 1,
                toRecord: MX.isDefined(this.total) ? Math.min(this.currentPage * this.pageSize, this.total) : this.pageSize
            }
        },
        sync: function() {
            this.each(function(e, t) {
                t.sync()
            }, this)
        },
        hasStorage: function() {
            return !1
        },
        getStorageId: function() {
            return "list"
        },
        getStorageKey: function(e) {
            return this.storageKey + "-" + this.getStorageId() + "-" + e
        },
        loadStorage: function(e) {
            var t = this,
                n = e.data.page;
            if (!t.disableCache) {
                t.toPage = n;
                var r = t.getStorageKey(n);
                t.db.transaction(function(n) {
                    n.executeSql("SELECT * FROM " + t.tableName + " WHERE id = ?", [r], function(n, r) {
                        if (r.rows.length > 0) {
                            var s = r.rows.item(0);
                            if (i.online && s._last_updated + t.cacheExpires < (new Date).getTime()) t.fetch(e);
                            else try {
                                t.handleLoadSuccess(JSON.parse(s.value))
                            } catch (o) {
                                t.handleLoadFailed()
                            }
                        } else i.online ? t.fetch(e) : t.handleLoadFailed()
                    })
                }, function(e) {
                    MX.Console.error("store.js:482 : Err_message: " + e.message), t.handleLoadFailed()
                })
            }
        },
        updateStorage: function(e) {
            var t = this;
            if (!t.disableCache) {
                var n = t.getStorageKey(t.currentPage);
                t.db.transaction(function(e) {
                    e.executeSql("SELECT * FROM " + t.tableName + " WHERE id = ?", [n], function(e, r) {
                        try {
                            var i = [],
                                s = JSON.stringify(t.get(null, !0));
                            r.rows.length > 0 ? (sql = "UPDATE " + t.tableName + " SET value = ?, _last_updated = ? WHERE id = ?", i.push(s), i.push((new Date).getTime()), i.push(n)) : (sql = "INSERT INTO " + t.tableName + " (id, value, _last_updated) VALUES (?, ?, ?)", i.push(n), i.push(s), i.push((new Date).getTime())), e.executeSql(sql, i)
                        } catch (o) {}
                    })
                }, function(e) {
                    MX.Console.error("store.js:517 : Err_message: " + e.message)
                })
            }
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.lib.iScroll,
        n = MX.clazz.Class,
        r = MX.clazz.Utility,
        i = MX.util.HashMap,
        s = /:\w+/g,
        o = /\*\w+/g,
        u = /[-[\]{}()+?.,\\^$|#\s]/g,
        a = /(:|\*)\w+/g,
        f = document.body;
    MX.app.Pagelet = n.define({
        extend: r,
        elIdPrefix: "webapp-pagelet-",
        singleton: !1,
        delayViewSource: !1,
        useFixed: !0,
        useScroll: !0,
        enablePulling: !1,
        enablePullDown: !0,
        enablePullUp: !0,
        useFixedPullingOffset: 10,
        unuseFixedPullingOffset: 100,
        beforeScrollPreventDefault: !0,
        hScroll: !1,
        vScroll: !0,
        hScrollbar: !1,
        vScrollbar: !1,
        checkDOMChanges: !1,
        checkDOMChangesInterval: 3e3,
        pullHtml: '<div class="pullLoad"><div class="stats ready"><i class="i iL iL1"></i><p class="st st1"></p></div></div>',
        constructor: function(e) {
            e.singleton || delete e.id, this.callParent([e])
        },
        init: function() {
            this.models = this.models || {}, this.stores = this.stores || {}, this.modelInstances = new i, this.storeInstances = new i;
            var e = this.url;
            this.urlParams = e.match(a), this.urlRe || (e = e.replace(u, "\\$&").replace(s, "([^/]+)").replace(o, "(.*?)"), this.urlRe = new RegExp("^" + e + "$")), this.initView(), this.initController(), this.delayViewSource && (this.delayViewSource = this.getDataSource(this.delayViewSource), this.delayViewSource = this.delayViewSource ? this.delayViewSource : !1), this.enablePullDown = !1, this.enablePulling && (this.enablePullDown ? this.pullDownStore = this.pullDownStore ? this.getDataSource(this.pullDownStore) : this.delayViewSource : this.pullDownStore = null, this.enablePullUp ? this.pullUpStore = this.pullUpStore ? this.getDataSource(this.pullUpStore) : this.delayViewSource : this.pullUpStore = null)
        },
        initEvent: function() {
            this.addEvents("beforerender", "render", "resetboxheight")
        },
        initView: function() {
            this.view || (this.view = new this.viewCls({
                container: this.viewCt,
                pagelet: this,
                getHeaderCt: function() {
                    return this.pagelet.headerCt
                },
                getFooterCt: function() {
                    return this.pagelet.footerCt
                }
            }), this.don(this.view, "render", this.initScroll, this), this.don(this.view, "destroy", this.destroyScroll, this))
        },
        initController: function() {
            if (!this.controller && this.controllerCls) {
                var e, t;
                MX.each(this.models, function(t, n) {
                    n.singleton ? e = n.instance : e = new n.cls(n), this.modelInstances.add(e)
                }, this), MX.each(this.stores, function(e, n) {
                    n.singleton ? t = n.instance : t = new n.cls(n), this.storeInstances.add(t)
                }, this), this.controller = new this.controllerCls({
                    view: this.view,
                    models: this.modelInstances,
                    stores: this.storeInstances,
                    pagelet: this,
                    getHeaderCt: function() {
                        return this.pagelet.headerCt
                    },
                    getFooterCt: function() {
                        return this.pagelet.footerCt
                    }
                }), this.don(this.view, "render", this.controller.initOnViewRender, this.controller)
            }
        },
        getDataSource: function(e) {
            var t;
            return MX.isString(e) ? t = this.modelInstances.get(e) || this.storeInstances.get(e) : t = e, t
        },
        getDelayViewSource: function() {
            return this.delayViewSource
        },
        match: function(e) {
            return this.urlRe && this.urlRe.test(e)
        },
        parseParams: function(e) {
            var t = this.urlRe.exec(e).slice(1),
                n = {};
            return MX.each(this.urlParams, function(e, r) {
                n[r.substr(1)] = t[e]
            }, this), this.params = n, n
        },
        render: function(t) {
            if (!this.rendered && this.fireEvent("beforerender", this) !== !1) {
                this.rendered = !0, this.ct = t = e(t || (this.group ? this.group.viewCt : this.container)), this.el = e(document.createElement("div")), this.el.attr({
                    id: this.elIdPrefix + this.id
                }), this.style && this.el.css(this.style);
                var n, r, i, s;
                this.group ? (n = "oBox", r = "oMain") : (n = "gBox", r = "gMain", i = "gHead", s = "gFoot"), this.el.addClass("box " + n + " " + (this.cls || "")), this.mainEl = e('<div class="boxMain ' + r + '"><div class="iWrap"></div></div>'), i && this.el.append('<div class="boxHead ' + i + '"></div>'), this.el.append(this.mainEl), s && this.el.append('<div class="boxFoot ' + s + '"></div>'), t.append(this.el), this.group ? (this.headerCt = this.group.headerCt, this.footerCt = this.group.footerCt) : (this.headerCt = this.el.children("div." + i), this.footerCt = this.el.children("div." + s)), this.viewCt = this.mainEl.find("div.iWrap"), this.view && this.view.render(this.viewCt), this.group || (this.header && this.header.render(this.headerCt), this.footer && this.footer.render(this.footerCt)), this.onRender(t), this.fireEvent("render", this)
            }
        },
        onRender: MX.emptyFn,
        initScroll: function() {
            this.scrollTopOffset = 0, this.scrollBottomOffset = 0, this.enablePulling && this.view && this.view.el && (this.enablePullDown && (this.pullDownEl = e(this.pullHtml).addClass("down"), this.pullDownEl.find("p").html("下拉加载最新"), this.useFixed || this.pullDownEl.hide(), this.pullDownEl.insertBefore(this.view.el), this.scrollTopOffset = this.pullDownEl.height()), this.enablePullUp && (this.pullUpEl = e(this.pullHtml).addClass("up"), this.pullUpEl.find("p").html("上拉加载更多"), this.useFixed || this.pullUpEl.hide(), this.pullUpEl.insertAfter(this.view.el), this.scrollBottomOffset = this.pullUpEl.height()));
            if (this.useFixed && this.useScroll && this.mainEl && this.mainEl[0]) {
                var n = this;
                this.scroll = new t(this.mainEl[0], {
                    hScroll: this.hScroll,
                    vScroll: this.vScroll,
                    hScrollbar: this.hScrollbar,
                    vScrollbar: this.vScrollbar,
                    useTransform: !0,
                    useTransition: !0,
                    handleClick: !1,
                    checkDOMChanges: this.checkDOMChanges,
                    checkDOMChangesInterval: this.checkDOMChangesInterval || 3e3,
                    topOffset: this.scrollTopOffset,
                    x: 0,
                    y: -this.scrollTopOffset,
                    onRefresh: function() {
                        n.resetScroll(this)
                    },
                    onBeforeScrollStart: e.proxy(this.beforeScrollStart, this),
                    onBeforeScrollMove: e.proxy(this.beforeScrollMove, this),
                    onBeforeScrollEnd: e.proxy(this.beforeScrollEnd, this),
                    onScrollMove: e.proxy(this.onScrollMove, this),
                    onScrollEnd: e.proxy(this.onScrollEnd, this),
                    onTouchEnd: e.proxy(this.onTouchEnd, this)
                }), this.pullDownEl && (this.mainEl.children()[0].style.webkitTransform = "translateY(-" + this.scrollTopOffset + "px)"), this.mainEl.addClass("iScrolled")
            }
            this.swipeDownOut === !0 && !this.scroll && this.mon(this.viewCt, "swipeDown", this.onSwipeDown)
        },
        onSwipeDown: function() {
            f.scrollTop <= 0 && this.swipeDownBack()
        },
        beforeScrollStart: function(e) {
            delete this.touchMoveVertical, this.touchCoords = {}, this.touchCoords.startX = e.touches[0].pageX, this.touchCoords.startY = e.touches[0].pageY;
            var t = this.handleControl("beforeScrollStart", !0, {
                e: e
            });
            return t === !1 && e.preventDefault(), t
        },
        resetScroll: function(e) {
            this.enablePulling && (e = e || this.scroll, this.resetPullDownLoading(e), this.resetPullUpLoading(e))
        },
        resetPullDownLoading: function(e) {
            e = e || this.scroll, this.pullDownEl && (this.pullDownLoading ? this.useFixed ? e && (e.minScrollY = 0) : this.pullDownEl.show() : (this.resetPullDownStatus(), this.useFixed ? e && (e.minScrollY = -this.scrollTopOffset) : this.pullDownEl.hide()))
        },
        resetPullUpLoading: function(e) {
            e = e || this.scroll, this.pullUpEl && (this.pullUpLoading ? this.useFixed || this.pullUpEl.show() : (this.resetPullUpStatus(), this.useFixed || this.pullUpEl.hide()))
        },
        resetPullDownStatus: function() {
            this.pullDownLoading = !1;
            var t = e(this.pullDownEl.children()[0]);
            t.hasClass("loading") && (t.removeClass("loading").addClass("ready"), t.find("p").html("下拉加载最新"))
        },
        resetPullUpStatus: function() {
            this.pullUpLoading = !1;
            var t = e(this.pullUpEl.children()[0]);
            t.hasClass("loading") && (t.removeClass("loading").addClass("ready"), t.find("p").html("上拉加载更多"))
        },
        beforeScrollMove: function(e) {
            if (!this.touchCoords) return !1;
            this.touchCoords.stopX = e.touches[0].pageX, this.touchCoords.stopY = e.touches[0].pageY;
            var t = this.touchCoords.startY - this.touchCoords.stopY,
                n = Math.abs(t),
                r = Math.abs(this.touchCoords.startX - this.touchCoords.stopX),
                i;
            if (this.beforeScrollPreventDefault === !1) {
                var s = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : e.target ? e.target.nodeName.toLowerCase() : "";
                s != "select" && s != "option" && s != "input" && s != "textarea" && (i = !0)
            } else i = !0;
            if (MX.isDefined(this.touchMoveVertical)) t != 0 && i && e.preventDefault();
            else {
                if (!(n > r)) return delete this.touchCoords, this.touchMoveVertical = !1, !1;
                this.touchMoveVertical = !0, t != 0 && i && e.preventDefault()
            }
            var o = this.handleControl("beforeScrollMove", !0, {
                e: e
            });
            if (this.swipeDownOut === !0) {
                var u = this.scroll,
                    a = e.touches[0],
                    f = a.pageY - u.pointY;
                u.y + u.options.topOffset == 0 && f > 0 && (f > 100 && this.swipeDownBack(), o = !1)
            }
            return o
        },
        beforeScrollEnd: function() {
            if (!this.touchCoords) return !1
        },
        swipeDownBack: function() {
            this.swipeDownBackLocked || (this.swipeDownBackLocked = !0, this.controller && this.controller.onSwipeDownBack())
        },
        onScrollMove: function(t) {
            this.handleControl("OriginalScrollMove", !1, {
                e: t
            });
            if (MX.isDefined(this.scrollMoveTimeout)) return;
            this.scrollMoveTimeout = MX.defer(function() {
                clearTimeout(this.scrollMoveTimeout), delete this.scrollMoveTimeout
            }, 100, this);
            if (this.enablePulling) {
                var n = this.scroll.y,
                    r = this.scroll.maxScrollY;
                if (this.enablePullDown && this.pullDownEl && !this.pullDownLoading) {
                    var i = e(this.pullDownEl.children()[0]);
                    n > this.useFixedPullingOffset && !i.hasClass("pulling") ? (i.removeClass("ready").addClass("pulling"), i.find("p").html("松手查看最新"), this.scroll.minScrollY = 0) : n < this.useFixedPullingOffset && i.hasClass("pulling") && (i.removeClass("pulling").addClass("ready"), i.find("p").html("下拉加载最新"), this.scroll.minScrollY = -this.scrollTopOffset)
                }
                if (this.enablePullUp && this.pullUpEl && !this.pullUpLoading) {
                    var s = e(this.pullUpEl.children()[0]);
                    n < r - this.useFixedPullingOffset && !s.hasClass("pulling") ? (s.removeClass("ready").addClass("pulling"), s.find("p").html("放开它放开它")) : n > r - this.useFixedPullingOffset && s.hasClass("pulling") && (s.removeClass("pulling").addClass("ready"), s.find("p").html("上拉加载更多"))
                }
            }
            this.handleControl("ScrollMove", !1, {
                e: t
            })
        },
        onScrollEnd: function(t) {
            if (this.enablePulling) {
                var n = !1;
                if (this.enablePullDown && this.pullDownEl) {
                    var r = e(this.pullDownEl.children()[0]);
                    r.hasClass("pulling") ? (this.pullDownLoading = !0, r.removeClass("pulling").addClass("loading"), r.find("p").html("加载中"), this.useFixed ? this.pullDownAction() : !this.useFixed && this.pullDownStore && (this.pullDownAction(), n = !0), this.pullDownStore || (this.pullDownLoading = !1, n = !0)) : this.useFixed && (n = !0)
                }
                if (this.enablePullUp && this.pullUpEl) {
                    var i = e(this.pullUpEl.children()[0]);
                    i.hasClass("pulling") ? (this.pullUpLoading = !0, i.removeClass("pulling").addClass("loading"), i.find("p").html("加载中"), this.useFixed ? this.pullUpAction() : !this.useFixed && this.pullUpStore && (this.pullUpAction(), n = !0), this.pullUpStore || (this.pullUpLoading = !1, n = !0)) : this.useFixed && (n = !0)
                }
                n && this.refreshScroll()
            }
            this.handleControl("ScrollEnd", !1, {
                e: t
            }), MX.defer(this.refreshScroll, 200, this)
        },
        onTouchEnd: function(e) {
            this.handleControl("TouchEnd", !1, {
                e: e
            })
        },
        onBodyScrollMove: function(t) {
            var n = MX.getWindowHeight(),
                r = f.scrollHeight,
                t = f.scrollTop,
                i = t + n;
            if (this.enablePulling) {
                if (this.enablePullDown && this.pullDownEl && !this.pullDownLoading) {
                    var s = e(this.pullDownEl.children()[0]);
                    t < this.lastScrollHeight && !s.hasClass("pulling") && t <= 0 && (s.removeClass("ready").addClass("pulling"), s.find("p").html("松手查看最新"))
                }
                if (this.enablePullUp && this.pullUpEl && !this.pullUpLoading) {
                    var o = e(this.pullUpEl.children()[0]);
                    i > this.lastScrollHeight && !o.hasClass("pulling") && i >= r - this.unuseFixedPullingOffset && (o.removeClass("ready").addClass("pulling"), o.find("p").html("放开它放开它"))
                }
            }
            this.lastScrollHeight = i, this.handleControl("ScrollMove"), this.onScrollEnd()
        },
        pullDownAction: function() {
            this.handleControl("PullDown")
        },
        pullUpAction: function() {
            this.handleControl("PullUp")
        },
        onPullingDownLoad: function() {
            this.pullDownLoading = !1
        },
        afterPullingDownLoad: function() {
            this.pullDownLoading = !1, this.refreshScroll(!0)
        },
        onPullingUpLoad: function() {
            this.pullUpLoading = !1
        },
        afterPullingUpLoad: function() {
            this.pullUpLoading = !1, this.refreshScroll(!0)
        },
        setLoadingView: function(t) {
            if (this.blockTransformView || this.getDelayViewSource()) this.loadingEl || (this.loadingTmpl ? this.loadingEl = e(this.loadingTmpl.applyTemplate()) : (this.loadingEl = e(document.createElement("div")), this.loadingEl.html("加载中...")), this.useFixed || this.loadingEl.css("display", "none"), this.mainEl.append(this.loadingEl)), t ? (this.viewCt.css("display", "none"), this.loadingEl.css("display", "")) : (this.loadingEl.css("display", "none"), this.viewCt.css("display", ""))
        },
        beforeViewIn: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), this.useFixed && this.useScroll && this.scroll && t.scrollTop !== !1 && this.scroll.scrollTo(0, 0, 0), this.enablePulling && (this.pullDownStore && (this.don(this.pullDownStore, "load", this.onPullingDownLoad), this.don(this.pullDownStore, "loadfailed", this.onPullingDownLoad)), this.pullUpStore && (this.don(this.pullUpStore, "load", this.onPullingUpLoad), this.don(this.pullUpStore, "loadfailed", this.onPullingUpLoad))), t.unloadSource !== !0 && this.setLoadingView(!0), this.handleControl("beforeViewIn", !0, t)
        },
        viewIn: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), this.useScroll && (this.useFixed ? this.scroll && (this.scroll.resizeLocked = !1) : t.scrollTop === !1 ? f.scrollTop = this.lastScrollY || 0 : f.scrollTop = 0), this.setLoadingView(!1), this.handleControl("ViewIn", !1, t)
        },
        afterViewIn: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), this.handleControl("afterViewIn", !0, t), this.swipeDownBackLocked = !1, this.enablePulling && (this.pullDownStore && (this.don(this.pullDownStore, "load", this.afterPullingDownLoad), this.don(this.pullDownStore, "loadfailed", this.afterPullingDownLoad)), this.pullUpStore && (this.don(this.pullUpStore, "load", this.afterPullingUpLoad), this.don(this.pullUpStore, "loadfailed", this.afterPullingUpLoad)))
        },
        beforeViewOut: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), !t.blockOnLoading && this.useScroll && (this.useFixed && this.scroll ? (this.lastScrollX = this.scroll.x, this.lastScrollY = this.scroll.y) : this.useFixed || (this.lastScrollY = f.scrollTop)), this.enablePulling && (this.pullDownStore && (this.dun(this.pullDownStore, "load", this.onPullingDownLoad), this.dun(this.pullDownStore, "loadfailed", this.onPullingDownLoad), this.dun(this.pullDownStore, "load", this.afterPullingDownLoad), this.dun(this.pullDownStore, "loadfailed", this.afterPullingDownLoad)), this.pullUpStore && (this.dun(this.pullUpStore, "load", this.onPullingUpLoad), this.dun(this.pullUpStore, "loadfailed", this.onPullingUpLoad), this.dun(this.pullUpStore, "load", this.afterPullingUpLoad), this.dun(this.pullUpStore, "loadfailed", this.afterPullingUpLoad))), this.cancelFetch(), this.controller.clearViewEventCache(), this.handleControl("beforeViewOut", !0, t)
        },
        viewOut: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), this.scroll && (this.scroll.resizeLocked = !0), this.pullDownLoading = this.pullUpLoading = !1, this.resetPullDownLoading(), this.resetPullUpLoading(), this.handleControl("ViewOut", !1, t)
        },
        viewLoading: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), clearTimeout(this.preloadingTimeout), this.preloadingTimeout = null, this.isPreloadView = !1, this.handleControl("ViewLoading", !1, t)
        },
        preloading: function(t) {
            t = e.extend({}, t), t.params = e.extend({}, this.params), this.isPreloadView = !0, clearTimeout(this.preloadingTimeout), this.preloadingTimeout = MX.defer(function() {
                this.isPreloadView = !1
            }, 6e4, this), this.handleControl("Preloading", !1, t)
        },
        preloadComplete: function() {
            clearTimeout(this.preloadingTimeout), this.preloadingTimeout = null, this.isPreloadView = !1, this.setLoadingView(!1)
        },
        viewBlockOut: function(e) {
            e = e || {}, clearTimeout(this.preloadingTimeout), this.preloadingTimeout = null, this.isPreloadView = !1, this.cancelFetch(), this.controller.clearViewEventCache(), this.handleControl("ViewBlockOut", !1, e)
        },
        handleControl: function(e, t, n) {
            var r = this.controller,
                i;
            return r && (n = n || {}, i = r[t === !0 ? e : "on" + e](n), r.fireEvent(e.toLowerCase(), n)), i
        },
        getHideInput: function() {
            return this.controller ? this.controller.getHideInput() : null
        },
        cancelFetch: function() {
            this.modelInstances.each(function(e, t) {
                t.cancelFetch()
            }, this), this.storeInstances.each(function(e, t) {
                t.cancelFetch()
            }, this)
        },
        setEnablePullDown: function(e) {
            this.enablePullDown = e, this.pullDownEl && (this.useFixed ? this.pullDownEl.css({
                visibility: e ? "visible" : "hidden"
            }) : this.pullDownEl[e && this.pullDownLoading ? "show" : "hide"](), this.resetPullDownStatus(), MX.defer(this.refreshScroll, this.useFixed ? 200 : 0, this, [!0]))
        },
        setEnablePullUp: function(e) {
            this.enablePullUp = e, this.pullUpEl && (this.useFixed ? this.pullUpEl[e ? "show" : "hide"]() : this.pullUpEl[e && this.pullUpLoading ? "show" : "hide"](), this.resetPullUpStatus(), MX.defer(this.refreshScroll, this.useFixed ? 200 : 0, this, [!0]))
        },
        refreshScroll: function(e) {
            this.useFixed ? (this.webapp.resetScroll(), this.scroll && (e === !0 ? this.scroll.refresh() : this.scroll._checkDOMChanges())) : this.resetScroll()
        },
        refreshScrollStatus: function() {
            var e = this.scroll;
            this.useFixed && (this.webapp.resetScroll(), e && (e.wrapperW = e.wrapper.clientWidth || 1, e.wrapperH = e.wrapper.clientHeight || 1, e.minScrollY = -e.options.topOffset || 0, e.scrollerW = Math.round(e.scroller.offsetWidth * e.scale), e.scrollerH = Math.round((e.scroller.offsetHeight + e.minScrollY) * e.scale), e.maxScrollX = e.wrapperW - e.scrollerW, e.maxScrollY = e.wrapperH - e.scrollerH + e.minScrollY, e.dirX = 0, e.dirY = 0))
        },
        setPreloadView: function(e, t) {
            e ? this.preloadLeftView = t : this.preloadRightView = t, this.isCurrentView && !this.isTransforming && this.webapp.preloadView()
        },
        getEl: function() {
            return this.el
        },
        getView: function() {
            return this.view
        },
        getController: function() {
            return this.controller
        },
        destroyViewAndController: function() {
            this.header && !this.group && this.header.destroy(), this.footer && !this.group && this.footer.destroy(), this.controller && this.controller.destroy(), this.view && this.view.destroy(), this.el && (this.el.remove(), this.el = null), this.header = this.footer = this.view = this.controller = null
        },
        destroyModelAndStore: function() {
            this.modelInstances.each(function(e, t) {
                t.singleton || t.destroy()
            }, this), this.modelInstances.clear(), this.storeInstances.each(function(e, t) {
                t.singleton || t.destroy()
            }, this), this.storeInstances.clear()
        },
        destroyScroll: function() {
            this.scroll && this.scroll.destroy(), this.pullDownEl && this.pullDownEl.remove(), this.pullUpEl && this.pullUpEl.remove(), this.pullDownEl = this.pullUpEl = null
        },
        onDestroy: function() {
            this.loadingEl && (this.loadingEl.remove(), this.loadingEl = null), this.destroyViewAndController(), this.destroyModelAndStore(), this.modelInstances = this.storeInstances = null, this.group && (this.group.removePagelet(this), this.group = null), this.webapp = null
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.app.Animate;
    MX.app.PageletGroup = t.define({
        extend: n,
        elIdPrefix: "webapp-pagelet-group-",
        init: function() {
            this.pagelets = {}
        },
        render: function(t) {
            this.rendered || (this.rendered = !0, this.ct = t = e(t || this.container), this.el = e(document.createElement("div")), this.el.attr({
                id: this.elIdPrefix + this.id
            }).addClass("box gBox"), this.el.append('<div class="boxHead gHead"></div>'), this.el.append('<div class="boxMain gMain"></div>'), this.el.append('<div class="boxFoot gFoot"></div>'), t.append(this.el), this.viewCt = this.el.find("div.gMain"), this.headerCt = this.el.find("div.gHead"), this.footerCt = this.el.find("div.gFoot"), this.header && this.header.render(this.headerCt), this.footer && this.footer.render(this.footerCt))
        },
        addPagelet: function(e) {
            this.pagelets[e.id] = e
        },
        removePagelet: function(e) {
            delete this.pagelets[e.id]
        },
        setView: function(e, t) {
            MX.each(this.pagelets, function(n, i) {
                r.silentTransformCss(i.el, function() {
                    i == e ? (i.el.addClass("box_current"), t !== !0 && this.useFixed && this.webapp.setDisplayStatus(i.el, !0)) : (i.el.removeClass("box_current"), this.useFixed && this.webapp.setDisplayStatus(i.el, !1))
                }, this)
            }, this)
        },
        onDestroy: function() {
            this.header && this.header.destroy(), this.footer && this.footer.destroy(), MX.each(this.pagelets, function(e, t) {
                t.destroy()
            }, this), this.header = this.footer = this.pagelets = null, this.webapp = null
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.util.HashMap,
        i = MX.util.Format,
        s = MX.util.Storage,
        o = MX.util.NetworkMonitor,
        u = MX.app.Model,
        a = MX.app.Store,
        f = MX.app.Header,
        l = MX.app.Footer,
        c = MX.app.Pagelet,
        h = MX.app.PageletGroup,
        p = MX.app.Animate,
        d = MX.app.Template,
        v = /#(.*)$/,
        m = /^[#\/]/,
        g = /:\w+/g,
        y = /\*\w+/g,
        b = /[-[\]{}()+?.,\\^$|#\s]/g,
        w = document.body,
        E = $(w);
    MX.app.Application = t.define({
        extend: n,
        useFixed: !0,
        pageletCacheSize: 30,
        useWebStorage: !0,
        online: o.online,
        networkType: 0,
        startingUpSelector: "div#startingUpView",
        databaseSize: 52428800,
        init: function() {
            this.models = {}, this.stores = {}, this.pagelets = new r, this.pageletGroups = {}, this.headers = {}, this.footers = {};
            var e = window.location,
                t = e.href,
                n = this.getHash(),
                i = n.length;
            t = t.charAt(t.length - 1) == "#" ? t.substring(0, t.length - 1) : t, this.baseUrl = t.substring(0, t.length - (i > 0 ? i + 1 : i)), this.baseUrlParams = MX.getUrlParams(), this.histories = [this.getFragment()], this.initNetworkMonitor()
        },
        initEvents: function() {
            this.addEvents("beforelaunch", "launch", "beforeforward", "beforetransformview", "transformview", "aftertransformview", "offlineunavailable", "bodyscroll"), this.mon(window, "hashchange", this.onHashChange)
        },
        initNetworkMonitor: function() {
            this.don(o, "online", function(e) {
                this.online = !0, this.networkType = e
            }, this), this.don(o, "offline", function(e) {
                this.online = !1, this.networkType = e
            }, this)
        },
        setConfig: function(t) {
            e.extend(this, t || {}), this.boxCt = e(this.boxContainer || this.boxCt || "body"), this.boxCtDom = this.boxCt[0], delete this.boxContainer, this.pageletCacheSize < 3 && (this.pageletCacheSize = 3), this.database || (this.useWebStorage = !1), MX.isString(this.loadingTmpl) && (this.loadingTmpl = new d({
                targetTmpl: this.loadingTmpl
            })), this.urlRoot = this.urlRoot || "", this.welcome = this.welcome || ""
        },
        addModel: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addModel(t)
                }, this);
                return
            }
            var n = e.extend({}, t),
                r = n.id;
            n.cls = n.cls ? MX.getClass(n.cls) : u, n.database = n.database || this.database, n.disableCache = this.useWebStorage ? n.disableCache === !0 : !0, n.db = this.db, n.singleton && (n.instance = new n.cls(e.extend({}, n)), delete n.id), this.models[r] = n
        },
        addStore: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addStore(t)
                }, this);
                return
            }
            var n = e.extend({}, t),
                r = n.id;
            n.cls = n.cls ? MX.getClass(n.cls) : a, n.database = n.database || this.database, n.disableCache = this.useWebStorage ? n.disableCache === !0 : !0, n.db = this.db, n.singleton && (n.instance = new n.cls(e.extend({}, n)), delete n.id), this.stores[r] = n
        },
        addHeader: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addHeader(t)
                }, this);
                return
            }
            var n = e.extend({}, t),
                r = n.id;
            n.viewCls = MX.getClass(n.view), n.controllerCls = MX.getClass(n.controller), n.models = n.model, n.stores = n.store, delete n.view, delete n.controller, this.headers[r] = n
        },
        addFooter: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addFooter(t)
                }, this);
                return
            }
            var n = e.extend({}, t),
                r = n.id;
            n.viewCls = MX.getClass(n.view), n.controllerCls = MX.getClass(n.controller), n.models = n.model, n.stores = n.store, delete n.view, delete n.controller, this.footers[r] = n
        },
        addPagelet: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addPagelet(t)
                }, this);
                return
            }
            if (t.clonePagelet) {
                var n = this.pagelets.get(t.clonePagelet);
                n && (t = e.extend({}, n, t), delete t.instance)
            }
            var r = e.extend({}, t);
            r.singleton = r.singleton === !0, r.noCache = r.noCache === !0, r.webapp = this, r.container = this.boxCt, r.useFixed = this.useFixed, r.loadingTmpl = this.loadingTmpl, r.viewCls = MX.getClass(r.view), r.controllerCls = MX.getClass(r.controller), r.group || (r.headerId = r.header, r.footerId = r.footer), r.hideHeaderOnViewIn = r.hideHeaderOnViewIn === !0, r.hideFooterOnViewIn = r.hideFooterOnViewIn === !0, r.fullScreenMode = this.fullScreenLocked === !0 || r.fullScreenMode === !0, r.enablePulling = r.enablePulling === !0, r.blockTransformView = r.blockTransformView === !0;
            var i = r.url;
            i = i.replace(b, "\\$&").replace(g, "([^/]+)").replace(y, "(.*?)"), r.urlRe = new RegExp("^" + i + "$"), r.model && (r.models = {}, MX.each(MX.toArray(r.model), function(e, t) {
                r.models[t] = this.models[t]
            }, this)), r.store && (r.stores = {}, MX.each(MX.toArray(r.store), function(e, t) {
                r.stores[t] = this.stores[t]
            }, this)), delete r.model, delete r.store, delete r.header, delete r.footer, delete r.view, delete r.controller, this.pagelets.add(r)
        },
        addPageletGroup: function(t) {
            if (!t) return;
            if (e.isArray(t)) {
                MX.each(t, function(e, t) {
                    this.addPageletGroup(t)
                }, this);
                return
            }
            var n = e.extend({}, t);
            n.webapp = this, n.useFixed = this.useFixed, n.container = this.boxCt, n.headerId = n.header, n.footerId = n.footer, delete n.header, delete n.footer, this.pageletGroups[n.id] = n
        },
        beforeLaunch: MX.emptyFn,
        onLaunch: MX.emptyFn,
        launch: function(e) {
            MX.defer(function() {
                this._launch(e)
            }, 200, this)
        },
        _launch: function(t) {
            if (!this.isLaunched && this.beforeLaunch() !== !1 && this.fireEvent("beforelaunch", this) !== !1) {
                this.isLaunched = !0, t && this.setConfig(t), this.database && this.initDatabase(), MX.widget && MX.widget.Overlayer && (MX.widget.Overlayer.prototype.useFixed = this.useFixed, MX.widget.Overlayer.prototype.container = this.boxCt), this.addModel(this.model), this.addStore(this.store), this.addHeader(this.header), this.addFooter(this.footer), this.addPageletGroup(this.group), this.addPagelet(this.pagelet), delete this.model, delete this.store, delete this.header, delete this.footer, delete this.group, delete this.pagelet, this.startingUpView = this.boxCt.find(this.startingUpSelector), this.startingUpView.length == 0 && delete this.startingUpView, this.adjustPlatform(), this.useFixed && (this._onBoxTouchStart = e.proxy(this.onBoxTouchStart, this), this._onBoxTouchMove = e.proxy(this.onBoxTouchMove, this), this._onBoxTouchEnd = e.proxy(this.onBoxTouchEnd, this)), this.onLaunch(), this.fireEvent("launch", this);
                var n = this.getFragment(),
                    r = this.matchPagelet(n),
                    i = MX.getUrlParams();
                !r && i.hash ? this.forward(i.hash) : r ? (r = this.createPagelet(r, n), this.fresh(r, r.parseParams(n))) : this.forward(this.welcome)
            }
        },
        initDatabase: function() {
            var e = this;
            if (window.openDatabase) try {
                e.db = window.openDatabase(e.database, "1.0", e.databaseDesc || "Offline storage", e.databaseSize, function(e) {})
            } catch (t) {
                MX.Console.error("application.js:568 : Err_message: " + t.message)
            } else MX.Console.error("application.js:572 : web sql database not supported");
            e.db ? e.db.transaction(function(t) {
                t.executeSql("CREATE TABLE IF NOT EXISTS systables (table_name)", [], function(t, n) {
                    var r = s.get("_last_clear_database_expires"),
                        i = !1,
                        o = new Date,
                        u, a;
                    r && (u = new Date, u.setTime(r), i = o.getFullYear() == u.getFullYear() && o.getMonth() == u.getMonth() && o.getDate() == u.getDate()), MX.isDefined(e.databaseExpires) && e.databaseExpires > 0 && !i && (o = o.getTime(), a = o - e.databaseExpires, t.executeSql("SELECT table_name FROM systables", [], function(e, t) {
                        var n = t.rows,
                            r = 0,
                            i = n.length,
                            s;
                        if (i > 0) for (; r < i; r++) s = n.item(r).table_name, e.executeSql("DELETE FROM " + s + " WHERE _last_updated < ?", [a], null, function() {})
                    }), s.set("_last_clear_database_expires", o))
                }), t.executeSql("CREATE TABLE IF NOT EXISTS syscolumns (table_name, column_name)", [])
            }, function(t) {
                e.useWebStorage = !1, MX.Console.error("application.js:605 : Err_message: " + t.message)
            }) : (e.useWebStorage = !1, MX.Console.error("application.js:577 : Err_message: 无法访问浏览器数据库database对象"))
        },
        createPagelet: function(e, t) {
            var n, r = this.urlRoot + t;
            if (e.singleton) e.instance || (e.instance = new c(e)), n = e.instance;
            else if (e.noCache !== !0) {
                this.pageletCaches = this.pageletCaches || [], n = this.getPagelet(t);
                if (!n) {
                    n = new c(e), this.pageletCaches.push(n);
                    if (this.pageletCaches.length > this.pageletCacheSize) {
                        var i = function() {
                                var e = this.pageletCaches.shift();
                                this.lastPagelet == e || this.nextPagelet == e || this.keepPagelet == e ? (this.pageletCaches.push(e), i.call(this)) : e.isDestroyed || e.destroying ? i.call(this) : e.destroy()
                            };
                        i.call(this)
                    }
                }
            } else n = new c(e);
            return n.hash = r, n
        },
        destroyPagelet: function(e, t) {
            e && !e.singleton && (e.noCache === !0 || t === !0) && e.destroy()
        },
        getPagelet: function(e) {
            var t, n, r, i = this.urlRoot + e;
            this.pageletCaches = this.pageletCaches || [];
            for (r = this.pageletCaches.length, n = r - 1; n >= 0; n--) {
                t = this.pageletCaches[n];
                if (t.isDestroyed || t.destroying) {
                    this.pageletCaches.splice(n, 1), n--;
                    continue
                }
                if (t.hash == i) return t
            }
            return null
        },
        isPageletExist: function(e) {
            return !!this.getPagelet(e)
        },
        getFragment: function(e) {
            var t = e || this.getHash();
            return this.urlRoot && (t = t.indexOf(this.urlRoot) != -1 ? t.substr(this.urlRoot.length) : t), t.replace(m, "")
        },
        getHash: function() {
            var e = window.location.href.match(v);
            return e ? e[1] : ""
        },
        getCurrentUrl: function(t, n) {
            var r = this.baseUrl,
                s = e.extend({}, this.baseUrlParams),
                o = this.getFragment(),
                u = r.indexOf("?"),
                a;
            return r = u != -1 ? r.substring(0, u) : r, t === !0 ? (s.hash = n || o, a = i.urlAppend(r, s)) : (n = n || o, delete s.hash, a = i.urlAppend(r, s), a += "#" + n), a
        },
        matchPagelet: function(e) {
            var t = this.pagelets.find(function(t) {
                return t.url == e
            });
            return t || (t = this.pagelets.find(function(t) {
                return t.urlRe && t.urlRe.test(e)
            })), t
        },
        forward: function(t, n) {
            !this.blockTransforming && this.fireEvent("beforeforward", this, t) !== !1 && (this.lastHashUrl = t, MX.isBoolean(n) && (n = {
                unloadSource: n
            }), n = n || {}, this.isPageletExist(t) || (n.unloadSource = !1), MX.isDefined(n.clearBoxMiddle) || (n.clearBoxMiddle = !0), this.forwardTransformingOptions = e.extend({}, n), window.location.href = this.baseUrl + "#/" + this.urlRoot + t)
        },
        back: function(e, t) {
            var n = this.histories,
                r = n.length,
                i;
            MX.isBoolean(t) && (t = {
                unloadSource: t
            }), t = t || {}, MX.isDefined(t.clearBoxMiddle) || (t.clearBoxMiddle = !1), e && r <= 1 ? (t.unloadSource = !1, i = e) : e && r > 1 ? (n.pop(), i = n.pop()) : (n.pop(), i = n.pop(), i && r < 2 && (t.unloadSource = !1)), i && this.forward(i, t)
        },
        onHashChange: function() {
            if (this.hashChangeLocked === !0) return;
            var t = this.getFragment(),
                n;
            this.lastHashUrl && this.lastHashUrl != t && delete this.forwardTransformingOptions, !this.blockTransforming && (n = this.matchPagelet(t)) ? this.online || n.offlineUnavailable !== !0 ? (this.histories.push(t), n = this.createPagelet(n, t), this.transformingOptions = e.extend({}, this.forwardTransformingOptions), delete this.forwardTransformingOptions, this.fresh(n, n.parseParams(t))) : (this.fireEvent("offlineunavailable", this, n), window.location.href = this.baseUrl + "#") : delete this.forwardTransformingOptions
        },
        fresh: function(e, t) {
            if (!this.blockTransforming && this.fireEvent("beforetransformview", this, e.controller) !== !1) {
                clearTimeout(this.blockTransformingTimeout), this.blockTransformingTimeout = null, this.blockTransforming = !0, this.transforming = !0, this.transformingOptions = this.transformingOptions || {}, this.beforeTransformPagelet(e);
                var n = MX.getWindowHeight();
                this.startingUpView && (this.startingUpView.css("min-height", n + "px"), this.startingUpView.find("div.gMain").height(n)), this.touchMoveIgnore = this.touchBoxIgnore = null;
                var r = this.lastPagelet,
                    i = this.nextPagelet = e,
                    s;
                i.isTransforming = !0, this.fullScreenMode = i.fullScreenMode, this.preparePagelet(i), i.render(), i.params = t, this.transformHeaderAndFooterStartStatus(r, i), this.useFixed || this.resetBodyHeight({
                    pagelet: i,
                    ignoreHide: !! this.startingUpView
                }), this.showInputBeforeViewIn(i), this.showInputBeforeViewIn(i.header), this.showInputBeforeViewIn(i.footer), i.beforeViewIn(this.transformingOptions), MX.defer(this.transformPagelet, 10, this)
            }
        },
        preparePagelet: function(e) {
            if (e.group) {
                var t = this.pageletGroups[MX.isString(e.group) ? e.group : e.group.id];
                t.instance || (t.instance = new h(t)), t = e.group = t.instance, t.header || (t.header = this.getHeader(t.headerId)), t.footer || (t.footer = this.getFooter(t.footerId)), e.header = t.header, e.footer = t.footer, t.addPagelet(e), t.render()
            } else e.header || (e.header = this.getHeader(e.headerId)), e.footer || (e.footer = this.getFooter(e.footerId))
        },
        beforeTransformPagelet: function(t) {
            var n = this,
                r = n.lastPagelet,
                i = n.nextPagelet;
            n.hasPreloadView = !1, n.boxCtDom.removeEventListener("touchstart", n._onBoxTouchStart, !1);
            if (n.blockTransformOnLoading && i) {
                n.blockTransformOnLoading = !1, i.isTransforming = !1;
                var s = i.getDelayViewSource();
                s && (i.dun(s, "load", n.delayTransformPagelet, n), i.dun(s, "loadfailed", n.delayTransformPagelet, n)), n.setDisplayStatus(i.el, !1), r && n.setDisplayStatus(r.el, !1), i.viewBlockOut(), n.destroyPagelet(i, t != i), i = n.nextPagelet = null
            }
            if (r) {
                var o = n.boxCt.children("div.box_current");
                r.group && r.group.el ? o = o.not(r.group.el) : o = o.not(r.el), t.el && (o = o.not(t.el)), t.group && t.group.el && (o = o.not(t.group.el)), MX.each(o, function(t, r) {
                    r = e(r), p.silentTransformCss(r, function() {
                        r.removeClass("box_current").css("z-index", ""), n.setDisplayStatus(r, !1)
                    })
                })
            }
            if (n.transformingOptions.clearBoxMiddle) {
                var u = n.boxCt.children("div.box_middle");
                r && (r.group && r.group.el ? u = u.not(r.group.el) : u = u.not(r.el)), t.el && (u = u.not(t.el)), t.group && t.group.el && (u = u.not(t.group.el)), MX.each(u, function(t, r) {
                    r = e(r), p.silentTransformCss(r, function() {
                        r.removeClass("box_middle").css("z-index", ""), n.setDisplayStatus(r, !1)
                    })
                })
            }
            r && r.beforeViewOut({
                blockOnLoading: !! n.blockTransformOnLoading && !! i
            }), t == r && (n.lastPagelet = null)
        },
        transformPagelet: function() {
            var e = this.lastPagelet,
                t = this.nextPagelet,
                n = this.getAnimateEffect(e, t, this.transformingOptions.useViewOut),
                r = this.compareGroup(e, t),
                i, s, o;
            e && (i = e.group && !r ? e.group.el : e.el), t.group && !r ? (t.group.setView(t), s = t.group.el) : s = t.el, this.transformingOptions.unloadSource !== !0 && t.blockTransformView ? o = this.blockTransformPagelet : this.transformingOptions.unloadSource !== !0 && t.getDelayViewSource() ? o = this.loadDelayViewSource : o = this.onTransformPagelet, this.transformCss(e, t, n, i, s, o), this.blockTransformingTimeout = MX.defer(function() {
                this.blockTransforming = !1
            }, 600, this)
        },
        loadDelayViewSource: function() {
            this.blockTransformOnLoading = !0;
            var e = this.nextPagelet,
                t = e.getDelayViewSource();
            e.don(t, "load", this.next, this, {
                single: !0
            }), e.don(t, "loadfailed", this.next, this, {
                single: !0
            }), t.isStore ? t.load({
                data: {
                    page: 1
                }
            }) : t.load()
        },
        blockTransformPagelet: function() {
            this.blockTransformOnLoading = !0;
            var e = this.nextPagelet;
            e && this.nextPagelet.viewLoading()
        },
        next: function() {
            var e = this.nextPagelet;
            this.blockTransformOnLoading && e && e.isTransforming && (this.blockTransformOnLoading = !1, this.onTransformPagelet())
        },
        onTransformPagelet: function(t) {
            var n = this,
                r = n.lastPagelet,
                i = n.nextPagelet;
            if (i && i.isTransforming) {
                t = t || {}, e.extend(t, n.transformingOptions), n.transformHeaderAndFooterEndStatus(r, i, t);
                if (r) {
                    var s = i.hideInputCaches;
                    n.hideInputOnViewOut(r, s), n.compareGroup(r, i) || (n.hideInputOnViewOut(r.header), n.hideInputOnViewOut(r.footer)), r.viewOut(t), n.un("bodyscroll", n.firePageletBodyScrollMove, r), n.destroyPagelet(r)
                }
                var o = n.preloadLeftPagelet,
                    u = n.preloadRightPagelet,
                    a, f;
                o && r && o != r && o != i && (a = n.getBoxEl(o, r), p.silentTransformCss(a, function() {
                    a && (a.removeClass("box_before"), n.setTranslateX(a, ""), n.setTransitionDuration(a, ""), n.setDisplayStatus(a, !1))
                }, n)), u && r && u != r && u != i && (f = n.getBoxEl(u, r), p.silentTransformCss(f, function() {
                    f && (f.removeClass("box_right"), n.setTranslateX(f, ""), n.setTransitionDuration(f, ""), n.setDisplayStatus(f, !1))
                }, n)), i.viewIn(t), !n.useFixed && i.enablePulling && (n.on("bodyscroll", n.firePageletBodyScrollMove, i), n.don(i, "destroy", function() {
                    n.un("bodyscroll", n.firePageletBodyScrollMove, i)
                }, n)), n.fireEvent("transformview", n, n.nextPagelet.controller), n.afterTransformPagelet(t)
            }
        },
        afterTransformPagelet: function(e) {
            var t = this,
                n = t.lastPagelet,
                r = t.nextPagelet,
                i = t.startingUpView,
                s, o;
            r && r.isTransforming && (delete t.startingUpView, i && (i.css("z-index", "10"), s = r.group ? r.group.el : r.el, o = t.getAnimateEffect(n, r, t.transformingOptions.useViewOut), p.silentTransformCss(s, function() {
                s.addClass(o == "slideLeft" || o == "slideRight" ? "box_current" : "box_middle")
            }, t), i.animate({
                opacity: 0
            }, {
                duration: 300,
                easing: "ease",
                complete: function() {
                    i.remove()
                }
            })), r.refreshScroll(!0), t.resetScroll(), n && (n.isCurrentView = !1), r.isCurrentView = !0, r.afterViewIn(e), t.fireEvent("aftertransformview", t, r.controller), t.preloadLeftPagelet = t.preloadRightPagelet = null, r.isTransforming = !1, t.lastPagelet = r, t.nextPagelet = null, t.blockTransformOnLoading = !1, t.lastHashUrl = null, t.transformingOptions = null, t.transforming = !1, t.blockTransforming = !1, clearTimeout(t.blockTransformingTimeout), t.blockTransformingTimeout = null, t.hasPreloadView = !1, t.preloadView())
        },
        transformHeaderAndFooterStartStatus: function(e, t, n) {
            var r = t.header,
                i = t.footer,
                s = this.compareGroup(e, t);
            n = n || {}, n.duplicate = s, e && (e.header && e.header.beforeRelease(n), e.footer && e.footer.beforeRelease(n)), r && (r.applyParams({
                useFixed: this.useFixed,
                "float": !! t.headerFloat,
                params: t.params,
                footer: i,
                pagelet: t,
                pageletController: t.controller
            }), r[t.hideHeaderOnViewIn !== !0 && !this.fullScreenMode ? "show" : "hide"](!0), r.prepare(n)), i && (i.applyParams({
                useFixed: this.useFixed,
                "float": !! t.footerFloat,
                params: t.params,
                header: r,
                pagelet: t,
                pageletController: t.controller
            }), i[t.hideFooterOnViewIn !== !0 && !this.fullScreenMode ? "show" : "hide"](!0), i.prepare(n))
        },
        transformHeaderAndFooterEndStatus: function(e, t, n) {
            var r = t.header,
                i = t.footer,
                s = !! e && !! t.group && e.group == t.group;
            n = n || {}, n.duplicate = s, e && (e.header && e.header.release(n), e.footer && e.footer.release(n)), r && r.load(n), i && i.load(n)
        },
        compareGroup: function(e, t) {
            var n = e && e.group,
                r = t && t.group;
            return n && r ? MX.isString(n) && !MX.isString(r) ? n === r.id : !MX.isString(n) && MX.isString(r) ? n.id === r : n == r : !1
        },
        transformCss: function(e, t, n, r, i, s) {
            var o = this;
            if (e) if (!o.useFixed) o.setDisplayStatus(r, !1), o.setDisplayStatus(i, !0), n == "slideLeft" || n == "slideRight" ? (r.removeClass("box_current"), i.addClass("box_current")) : n == "shadeUpIn" || n == "shadeDownIn" ? i.addClass("box_middle") : (n == "shadeUpOut" || n == "shadeDownOut") && i.removeClass("box_middle"), s.call(o);
            else {
                var u = function() {
                        s.call(o), o.setDisplayStatus(r, !1), e && e.el && !o.compareGroup(e, t) && o.setDisplayStatus(e.el, !1)
                    };
                o.clearPreloadViewStyle(!0), setTimeout(function() {
                    !r.hasClass("box_current") && !r.hasClass("box_middle") ? p.silentTransformCss(i, function() {
                        o.setDisplayStatus(i, !0), o.resetBoxHeight(t), i.addClass(n == "slideLeft" || n == "slideRight" ? "box_current" : "box_middle"), u.call(o)
                    }, o) : (o.setDisplayStatus(r, !0), o.setDisplayStatus(i, !0), o.resetBoxHeight(t), MX.defer(function() {
                        p[n](r, i, u, o)
                    }, 100, o))
                }, 10)
            } else o.startingUpView ? (o.setDisplayStatus(i, !0), o.resetBoxHeight(t), s.call(o)) : p.silentTransformCss(i, function() {
                o.setDisplayStatus(i, !0), o.resetBoxHeight(t), i.addClass(n == "slideLeft" || n == "slideRight" ? "box_current" : "box_middle"), s.call(o)
            }, o)
        },
        getAnimateEffect: function(e, t, n) {
            if (MX.isString(n)) return n;
            var r = t.viewInEffect || "",
                i = e && e.viewOutEffect || "",
                s;
            return n === !0 ? s = i || r : s = r || i, s || "slideLeft"
        },
        setDisplayStatus: function(e, t) {
            e && (t ? e.css("display", "") : e.css("display", "none"))
        },
        getBoxEl: function(e, t) {
            var n;
            return e && (e.group && !this.compareGroup(t, e) ? n = e.group.el : n = e.el), n
        },
        showInputBeforeViewIn: function(e) {
            e && e.hideInputCaches && MX.each(e.hideInputCaches, function(e, t) {
                t.show()
            })
        },
        hideInputOnViewOut: function(t, n) {
            if (t) {
                var r = t.getHideInput();
                if (r) {
                    t.hideInputCaches = t.hideInputCaches || [];
                    var i, s = n ? n.length : 0,
                        o;
                    MX.each(r, function(r, i) {
                        o = !1;
                        for (r = 0; r < s; r++) if (i == n[r][0]) {
                            o = !0;
                            break
                        }
                        o || (i = e(i), i.css("display") != "none" && (i.hide(), t.hideInputCaches.push(i)))
                    }, this)
                }
            }
        },
        getHeader: function(t) {
            var n = this.headers[t],
                r, i;
            return n && (n = e.extend({}, n), n.models && (i = {}, MX.each(MX.toArray(n.models), function(e, t) {
                i[t] = this.models[t]
            }, this), n.models = i), n.stores && (i = {}, MX.each(MX.toArray(n.stores), function(e, t) {
                t[t] = this.stores[t]
            }, this), n.stores = i), r = new f(n)), r
        },
        getFooter: function(t) {
            var n = this.footers[t],
                r, i;
            return n && (n = e.extend({}, n), n.models && (i = {}, MX.each(MX.toArray(n.models), function(e, t) {
                i[t] = this.models[t]
            }, this), n.models = i), n.stores && (i = {}, MX.each(MX.toArray(n.stores), function(e, t) {
                t[t] = this.stores[t]
            }, this), n.stores = i), r = new l(n)), r
        },
        preloadView: function() {
            var e = this,
                t = e.lastPagelet,
                n, r, i, s, o, u, a;
            if (e.useFixed && !e.transforming && t) {
                n = t.preloadLeftView, r = t.preloadRightView, i = e.matchPagelet(n), s = e.matchPagelet(r);
                if (!i && !s) return;
                if (i && !s) {
                    if (t.group && t.group.id != i.group) return
                } else if (!i && s) {
                    if (t.group && t.group.id != s.group) return
                } else if (t.group && (t.group.id != i.group || t.group.id != s.group) || !t.group && i.group && s.gourp && i.group == s.gourp) return;
                i && (o = e.getPagelet(n), o ? (i = e.preloadLeftPagelet = o, u = !1) : (i = e.preloadLeftPagelet = e.createPagelet(i, n), u = !0), e.preparePreloadPagelet(i, n, !0, u)), s && (o = e.getPagelet(r), o ? (s = e.preloadRightPagelet = o, u = !1) : (s = e.preloadRightPagelet = e.createPagelet(s, r), u = !0), e.preparePreloadPagelet(s, r, !1, u)), e.hasPreloadView = !! i || !! s, e.hasPreloadView && e.boxCtDom && (e.boxCtDom.removeEventListener("touchstart", e._onBoxTouchStart, !1), e.boxCtDom.addEventListener("touchstart", e._onBoxTouchStart, !1))
            }
        },
        preparePreloadPagelet: function(e, t, n, r) {
            var i = this,
                s = i.lastPagelet,
                o, u = e.group && !i.compareGroup(s, e);
            i.preparePagelet(e), e.render(), e.params = e.parseParams(t), u ? (e.group.setView(e), o = e.group.el) : o = e.el, p.silentTransformCss(o, function() {
                o.addClass(n ? "box_before" : "box_right"), i.setDisplayStatus(o, !0)
            }, i), u || i.resetBoxHeight(e), e.beforeViewIn({
                preload: !0
            });
            if (r) {
                if (e.blockTransformView) e.preloading();
                else if (e.getDelayViewSource()) {
                    var a = function() {
                            e.setLoadingView(!1)
                        },
                        f = e.getDelayViewSource();
                    e.don(f, "load", a, i, {
                        single: !0
                    }), e.don(f, "loadfaild", a, i, {
                        single: !0
                    }), f.isStore ? f.load({
                        data: {
                            page: 1
                        }
                    }) : f.load()
                }
            } else e.setLoadingView(!1)
        },
        preloadTransform: function(e, t) {
            var n = this;
            if (!n.transforming) {
                n.blockTransformingTimeout = null, n.blockTransforming = !0, n.transforming = !0, n.transformingOptions = n.transformingOptions || {}, n.boxCtDom.removeEventListener("touchstart", n._onBoxTouchStart, !1), n.hasPreloadView = !1, n.hashChangeLocked = !0, n.histories.push(t), window.location.href = n.baseUrl + "#/" + n.urlRoot + t;
                var r = n.lastPagelet,
                    i = n.nextPagelet = e;
                r.beforeViewOut(), i.isTransforming = !0, n.fullScreenMode = i.fullScreenMode, n.showInputBeforeViewIn(i), n.showInputBeforeViewIn(i.header), n.showInputBeforeViewIn(i.footer), n.transformHeaderAndFooterStartStatus(r, i, {
                    preload: !0
                }), i.group && !n.compareGroup(r, i) && n.resetBoxHeight(i), n.onPreloadTransform()
            }
        },
        onPreloadTransform: function() {
            var e = this,
                t = e.lastPagelet,
                n = e.nextPagelet,
                r = e.preloadLeftPagelet,
                i = e.preloadRightPagelet,
                s = e.getBoxEl(t, r || i),
                o = e.getBoxEl(n, t),
                u, a;
            r && r != n && (u = e.getBoxEl(r, t), p.silentTransformCss(u, function() {
                u && (u.removeClass("box_before"), e.setTranslateX(u, ""), e.setTransitionDuration(u, ""), e.setDisplayStatus(u, !1))
            }, e)), i && i != n && (a = e.getBoxEl(i, t), p.silentTransformCss(a, function() {
                a && (a.removeClass("box_right"), e.setTranslateX(a, ""), e.setTransitionDuration(a, ""), e.setDisplayStatus(a, !1))
            }, e)), p.silentTransformCss(s, function() {
                s && (s.removeClass("box_before box_right box_middle box_current"), e.setTranslateX(s, ""), e.setTransitionDuration(s, ""), e.setDisplayStatus(s, !1))
            }, e), p.silentTransformCss(o, function() {
                o.removeClass("box_before box_right"), o.addClass(t.group && t.group == n.group ? "box_current" : s && s.hasClass("box_current") ? "box_current" : "box_middle"), e.setTranslateX(o, ""), e.setTransitionDuration(o, ""), e.hashChangeLocked = !1
            }, e), MX.defer(e.onTransformPagelet, 50, e, [{
                preload: !0
            }])
        },
        preparePreloadView: function(e) {
            var t = this,
                n = t.lastPagelet,
                r;
            e.group && !t.compareGroup(n, e) ? r = e.group.el : r = e.el, t.setDisplayStatus(r, !0), t.setTransitionDuration(r, 0)
        },
        onBoxTouchStart: function(e) {
            delete this.touchMoveHorizontal;
            if (this.transforming || !this.hasPreloadView || this.boxTouchLocked) return;
            var t = e.target,
                n = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : t ? t.nodeName.toLowerCase() : "";
            if (n == "select" || n == "option" || n == "input" || n == "textarea") return;
            var r = this.touchBoxIgnore,
                i = this.lastPagelet,
                s = this.preloadLeftPagelet,
                o = this.preloadRightPagelet,
                u;
            u = i.ct, u = u[0] || u;
            if (!(t === u || u.contains && u.contains(t))) return;
            if (r) {
                r = r[0] || r;
                if (t === r || r.contains && r.contains(t)) return
            }
            this.boxCtDom.removeEventListener("touchmove", this._onBoxTouchMove, !1), this.boxCtDom.removeEventListener("touchend", this._onBoxTouchEnd, !1), this.boxCtDom.addEventListener("touchmove", this._onBoxTouchMove, !1), this.boxCtDom.addEventListener("touchend", this._onBoxTouchEnd, !1), this.touchCoords = {}, this.touchCoords.startX = e.touches[0].pageX, this.touchCoords.startY = e.touches[0].pageY, s && this.preparePreloadView(s), o && this.preparePreloadView(o), pEl = this.getBoxEl(i, s || o), this.setTransitionDuration(pEl, 0)
        },
        onBoxTouchMove: function(e) {
            if (!this.touchCoords || !this.hasPreloadView || !this.useFixed || this.transforming) return;
            this.touchCoords.stopX = e.touches[0].pageX, this.touchCoords.stopY = e.touches[0].pageY;
            var t = this.touchCoords.startX - this.touchCoords.stopX,
                n = Math.abs(t),
                r = Math.abs(this.touchCoords.startY - this.touchCoords.stopY),
                i = this.lastPagelet,
                s = this.preloadLeftPagelet,
                o = this.preloadRightPagelet,
                u = this.getBoxEl(i, s || o),
                a = this.getBoxEl(s, i),
                f = this.getBoxEl(o, i),
                l = MX.getWindowWidth(),
                c;
            if (MX.isDefined(this.touchMoveHorizontal)) t != 0 && e.preventDefault(), i.scroll && i.scroll.enabled && i.scroll.disable();
            else {
                if (!(n > r)) {
                    delete this.touchCoords, this.touchMoveHorizontal = !1;
                    return
                }
                this.touchMoveHorizontal = !0, t != 0 && e.preventDefault(), i.scroll && i.scroll.enabled && i.scroll.disable()
            }
            t < 0 && !a || t > 0 && !f ? c = Math.ceil(t / 2) : c = t, n < l && (this.setTranslateX(u, -c), a && this.setTranslateX(a, -l - c), f && this.setTranslateX(f, l - c))
        },
        onBoxTouchEnd: function(e) {
            var t = this,
                n = t.lastPagelet;
            t.boxCtDom.removeEventListener("touchmove", t._onBoxTouchMove, !1), t.boxCtDom.removeEventListener("touchend", t._onBoxTouchEnd, !1), n.scroll && n.scroll.enable();
            if (!t.touchCoords) return;
            t.boxTouchLocked = !0, t.boxTouchLockedTimeout = setTimeout(function() {
                t.boxTouchLocked = !1
            }, 200);
            var r = t.touchCoords.startX - t.touchCoords.stopX,
                i = Math.abs(r),
                s = MX.getWindowWidth(),
                o = Math.ceil(s * .4),
                u = t.preloadLeftPagelet,
                a = t.preloadRightPagelet,
                f = t.getBoxEl(n, u || a),
                l = t.getBoxEl(u, n),
                c = t.getBoxEl(a, n),
                h = t.getTransitionDuration(),
                p, d = function(e) {
                    p = Math.ceil(i / s * h), p = p < h ? p : h, p = e ? p / 2 : p, t.setTransitionDuration(f, p), l && t.setTransitionDuration(l, p), c && t.setTransitionDuration(c, p), setTimeout(function() {
                        t.setTranslateX(f, 0), l && t.setTranslateX(l, -s), c && t.setTranslateX(c, s), MX.defer(t.clearPreloadViewStyle, p + 50, t)
                    }, 0)
                };
            i >= o ? t.touchCoords.startX > t.touchCoords.stopX ? a ? (p = Math.ceil((1 - i / s) * h), p = p < h ? p : h, t.setTransitionDuration(f, p), t.setTransitionDuration(c, p), l && t.setTransitionDuration(l, 0), setTimeout(function() {
                t.setTranslateX(f, -s), t.setTranslateX(c, 0), l && t.setTranslateX(l, -s), MX.defer(t.preloadTransform, p + 50, t, [a, n.preloadRightView])
            }, 0)) : d.call(t, !0) : u ? (p = Math.ceil((1 - i / s) * h), p = p < h ? p : h, t.setTransitionDuration(f, p), t.setTransitionDuration(l, p), c && t.setTransitionDuration(c, 0), setTimeout(function() {
                t.setTranslateX(f, s), t.setTranslateX(l, 0), c && t.setTranslateX(c, s), MX.defer(t.preloadTransform, p + 50, t, [u, n.preloadLeftView])
            }, 1)) : d.call(t, !0) : MX.isNumber(i) && i != 0 && d.call(t)
        },
        clearPreloadViewStyle: function(e) {
            var t = this,
                n = t.lastPagelet,
                r = t.preloadLeftPagelet,
                i = t.preloadRightPagelet,
                s = t.getBoxEl(n, r || i),
                o = t.getBoxEl(r, n),
                u = t.getBoxEl(i, n);
            t.setTransitionDuration(s, ""), o && t.setTransitionDuration(o, ""), u && t.setTransitionDuration(u, ""), e === !0 && (t.setTranslateX(s, ""), o && t.setTranslateX(o, ""), u && t.setTranslateX(u, ""))
        },
        getTransitionDuration: function(e) {
            var t = 500;
            return MX.isDefined(e) ? e != "" && (e = e < t ? e : t) : e = t, e
        },
        setTranslateX: function(e, t) {
            (e[0] || e).style.webkitTransform = t === "" ? t : "translate3d(" + t + "px, 0px, 0px)"
        },
        setTransitionDuration: function(e, t) {
            t != "" && (t = this.getTransitionDuration(t) + "ms"), (e[0] || e).style.webkitTransitionDuration = t
        },
        enterFullScreen: function() {
            if (!this.transforming && this.fullScreenLocked !== !0 && !this.fullScreenMode && this.useFixed && this.lastPagelet) {
                this.fullScreenMode = !0;
                var e = this.lastPagelet,
                    t, n;
                if (e.header || e.footer) n = (e.header || e.footer).getView(), n.on("hide", function() {
                    e.refreshScroll(!0)
                }, this, {
                    single: !0
                }), t = e.group ? e.group.viewCt : e.mainEl, t[0].style.webkitTransitionProperty = "height", t[0].style.webkitTransitionTimingFunction = "ease", t[0].style.webkitTransitionDuration = "200ms", t.height(MX.getWindowHeight()), setTimeout(function() {
                    t && (t[0].style.webkitTransitionProperty = "", t[0].style.webkitTransitionTimingFunction = "", t[0].style.webkitTransitionDuration = "")
                }, n.animateDuration), e.header && e.header.hide(!1, !0), e.footer && e.footer.hide(!1, !0)
            }
        },
        closeFullScreen: function() {
            if (!this.transforming && this.fullScreenLocked !== !0 && this.fullScreenMode && this.useFixed && this.lastPagelet) {
                this.fullScreenMode = !1;
                var e = this.lastPagelet,
                    t, n;
                if (e.header || e.footer) n = (e.header || e.footer).getView(), n.on("show", function() {
                    e.refreshScroll(!0)
                }, this, {
                    single: !0
                }), e.header && e.header.show(!1, !0), e.footer && e.footer.show(!1, !0), t = e.group ? e.group.viewCt : e.mainEl, t[0].style.webkitTransitionProperty = "height", t[0].style.webkitTransitionTimingFunction = "ease", t[0].style.webkitTransitionDuration = "200ms", t.height(MX.getWindowHeight() - (e.header ? e.header.getOriginalHeight() : 0) - (e.footer ? e.footer.getOriginalHeight() : 0)), setTimeout(function() {
                    t && (t[0].style.webkitTransitionProperty = "", t[0].style.webkitTransitionTimingFunction = "", t[0].style.webkitTransitionDuration = "")
                }, n.animateDuration)
            }
        },
        adjustPlatform: function() {
            this.useFixed ? (this.mon(document, "touchmove", this.onTouchMove), this.resetBodyHeight()) : (E.addClass("static").css("min-height", MX.getWindowHeight() + "px"), this.mon(window, "scroll", this.onBodyScroll)), this.mon(window, "orientationchange", MX.createOrientationChangeProxy(this.onOrientationChange, this));
            var t, n, r, i;
            e.browser.webkit ? t = "webkit" : e.browser.silk && (t = "silk"), e.os.ios ? n = "ios" : e.os.android ? n = "android" : e.os.webos && (n = "webos"), n && e.os.version && (r = e.os.version, r = n + (r.indexOf(".") != -1 ? r.substring(0, r.indexOf(".")) : r)), e.os.iphone ? i = "iphone" : e.os.ipad ? i = "ipad" : e.os.touchpad ? i = "touchpad" : e.os.blackberry ? i = "blackberry" : e.os.kindle && (i = "kindle"), t && E.addClass(t), n && E.addClass(n), r && E.addClass(r), i && E.addClass(i), MX.isIphone5 ? this.setViewportWidthPorperty("320.1") : this.setViewportWidthPorperty("device-width"), this.resetScroll()
        },
        onTouchMove: function(t) {
            var n = this.touchMoveIgnore,
                r = t.target,
                i, s, o;
            if (n) {
                o = function(e) {
                    e = e[0] || e, r !== e && (!e.contains || e.contains && !e.contains(r)) && t.preventDefault()
                };
                if (e.isArray(n)) for (i = 0, s = n.length; i < s; i++) o(n[i]);
                else o(n)
            } else t.preventDefault()
        },
        setViewportWidthPorperty: function(t) {
            var n = document.querySelector("meta[name=viewport]"),
                r = n.content,
                i = r.split(","),
                s = [],
                o, u, a = i.length,
                f = "width";
            for (u = 0; u < a; u++) o = e.trim(i[u]).split("="), o[0] == f ? s.push(f + "=" + t) : s.push(o[0] + "=" + o[1]);
            r = s.join(", "), r.indexOf(f + "=") == -1 && (r = f + "=" + t + ", " + r), n.content = r
        },
        resetBodyHeight: function(e) {
            var t = window.orientation,
                n, r, i;
            e = e || {};
            if (this.useFixed) e.resetScroll !== !1 && this.resetScroll(), n = MX.getWindowHeight(), r = window.screen.height - 20 - 44, MX.isIphone5Safari || MX.isIphone4Safari ? i = n >= r ? n : n + (!navigator.standalone && t == 0 ? 60 : 0) : i = n, this.startingUpView && this.startingUpView.css("height", i + "px"), E.css("height", i + "px"), this.resetBoxHeight();
            else {
                var s = e.pagelet || this.lastPagelet,
                    o = e.ignoreHide === !0;
                if (s) {
                    var u = s.header,
                        a = s.footer;
                    n = MX.getWindowHeight(), i = n - (u ? u.getHeight(o) : 0) - (a ? a.getHeight(o) : 0), this.startingUpView && this.startingUpView.css("min-height", n + "px"), E.css("min-height", n + "px"), s.el && s.el.css("min-height", i + "px")
                }
            }
        },
        onOrientationChange: function(e) {
            var t = this,
                n = t.lastPagelet;
            if (t.useFixed) {
                t.resetBodyHeight(), !t.transforming && n && n.refreshScroll(!0);
                var r = t.preloadLeftPagelet,
                    i = t.preloadRightPagelet,
                    s, o, u = MX.getWindowWidth();
                r && (s = t.getBoxEl(r, n), p.silentTransformCss(s, function() {
                    t.setTranslateX(s, -u)
                })), i && (o = t.getBoxEl(i, n), p.silentTransformCss(o, function() {
                    t.setTranslateX(o, u)
                }))
            } else t.resetBodyHeight({
                pagelet: n,
                ignoreHide: !! t.startingUpView
            })
        },
        onBodyScroll: function() {
            this.bodyScrollLoacked || (this.fireEvent("bodyscroll", this), this.bodyScrollLoackedTimeout = MX.defer(function() {
                clearTimeout(this.bodyScrollLoackedTimeout), this.bodyScrollLoacked = !1
            }, 100, this))
        },
        firePageletBodyScrollMove: function() {
            this.onBodyScrollMove()
        },
        resetScroll: function(e) {
            if (this.useFixed || e === !0) window.scrollTo(0, 1), this.resetBoxHeight()
        },
        refreshScroll: function() {
            var e = this.lastPagelet;
            this.useFixed && e && e.refreshScroll()
        },
        refreshScrollStatus: function() {
            var e = this.lastPagelet;
            this.useFixed && e && e.refreshScrollStatus()
        },
        resetBoxHeight: function(e) {
            var t = e || this.lastPagelet,
                n, r;
            this.useFixed && t && (t.group ? n = t.group.viewCt : n = t.mainEl, n && (r = MX.getWindowHeight() - (t.header ? t.header.getHeight(!0) : 0) - (t.footer ? t.footer.getHeight(!0) : 0), n.height() != r && n.height(r), t.handleControl("ResetBoxHeight", !1, r)))
        },
        onDestroy: function() {
            this.pagelets.each(function(e, t) {
                t.singleton && t.instance.destroy()
            }, this), this.pagelets.chear(), MX.each(this.pageletGroups, function(e, t) {
                t.instance && t.instance.destroy()
            }, this), MX.each(this.models, function(e, t) {
                t.singleton && t.instance.destroy()
            }, this), MX.each(this.stores, function(e, t) {
                t.singleton && t.instance.destroy()
            }, this), this.pagelets = this.pageletGroups = this.header = this.footer = null, this.models = this.stores = null, this.boxCt = this.boxCtDom = null
        }
    })
}(), function() {
    MX.app.WebApp = new MX.app.Application, MX.lib.Zepto(document).bind("unload", function() {
        MX.app.WebApp.destroy(), MX.app.WebApp = null
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = MX.app.Template,
        i = MX.app.Animate;
    MX.widget.Overlayer = t.define({
        extend: n,
        animate: !0,
        mask: !0,
        autoRender: !1,
        useFixed: !0,
        offsetX: 0,
        offsetY: 0,
        init: function() {
            MX.isString(this.tmpl) && (this.tmpl = new r({
                targetTmpl: this.tmpl
            })), this.hidden = !0, this.autoRender && this.render()
        },
        initEvents: function() {
            this.addEvents("render"), this.mon(window, "orientationchange", MX.createOrientationChangeProxy(this.onOrientationChange, this))
        },
        onOrientationChange: function() {
            this.rendered && !this.hidden && this.adjustTop()
        },
        render: function(t) {
            if (!this.rendered) {
                this.rendered = !0, this.el = e(document.createElement("div")), this.el.html(this.tmpl.applyTemplate(t));
                var n = "lay " + (this.cls || "") + (this.animate ? "" : " lay_silent");
                this.el.css("opacity", "0").addClass(n), this.ct = e(this.container), this.mask ? (this.layCt = e(document.createElement("div")), this.layCt.addClass("boxLay gBoxLay"), this.layCt.append(this.el), this.ct.append(this.layCt)) : this.ct.append(this.el), this.onRender(), this.fireEvent("render", this)
            }
        },
        onRender: MX.emptyFn,
        show: function(e) {
            var t = this;
            t.hidden ? (t.hidden = !1, t.render(e), t.beforeShow(e), t.mask && t.layCt.addClass("on"), t.adjustTop(), t.el.css("visibility", "visible"), t.animate ? i.transfromStyle(t.el, {
                opacity: "1"
            }, function() {
                t.onShow()
            }, 200) : (t.el.css("opacity", "1"), t.onShow())) : t.adjustTop()
        },
        adjustTop: function() {
            var e = MX.getWindowHeight(),
                t = this.el.height(),
                n;
            if (this.useFixed) n = e / 2 - t / 2;
            else {
                var r = document.body,
                    i = r.offsetHeight;
                i > e ? n = r.scrollTop + e / 2 - t / 2 : n = i / 2 - t / 2
            }
            this.el.css("top", n + "px")
        },
        beforeShow: MX.emptyFn,
        onShow: MX.emptyFn,
        hide: function() {
            var e = this;
            e.hidden || (e.hidden = !0, e.beforeHide(), e.mask && e.layCt.removeClass("on"), e.animate ? i.transfromStyle(e.el, {
                opacity: "0"
            }, function() {
                e.el.css("visibility", "hidden"), e.onHide()
            }, 200) : (e.el.css("visibility", "hidden"), e.onHide()))
        },
        beforeHide: MX.emptyFn,
        onHide: MX.emptyFn,
        toggle: function(e) {
            this.hidden ? this.show(e) : this.hide()
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility;
    MX.widget.Slide = t.define({
        extend: n,
        activeIndex: 0,
        transWidth: .2,
        duration: 500,
        timingFunction: "ease",
        fill: !0,
        spacing: 10,
        init: function() {
            this.wrapper = e(this.wrapper), this.wrapDom = this.wrapper[0], this.resetItemWidth(), this.setTransitionTimingFunction(this.timingFunction), this.transform(this.activeIndex, !0)
        },
        initEvents: function() {
            this.addEvents("beforetouchstart", "touchstart", "touchmove", "touchend", "beforetransform", "transform", "transformfirst", "transformlast"), this._onTouchStart = e.proxy(this.onTouchStrat, this), this._onTouchMove = e.proxy(this.onTouchMove, this), this._onTouchEnd = e.proxy(this.onTouchEnd, this), this.wrapDom.addEventListener("touchstart", this._onTouchStart, !1), this.mon(window, "orientationchange", MX.createOrientationChangeProxy(this.onOrientationChange, this))
        },
        onOrientationChange: function() {
            this.resetItemWidth()
        },
        onTouchStrat: function(e) {
            delete this.horizontal, this.fireEvent("beforetouchstart", this, this.activeIndex) !== !1 && (this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.wrapDom.addEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.addEventListener("touchend", this._onTouchEnd, !1), this.setTransitionDuration(0), this.touchCoords = {}, this.touchCoords.startX = e.touches[0].pageX, this.touchCoords.startY = e.touches[0].pageY, this.fireEvent("touchstart", this))
        },
        onTouchMove: function(e) {
            if (!this.touchCoords) return;
            this.touchCoords.stopX = e.touches[0].pageX, this.touchCoords.stopY = e.touches[0].pageY;
            var t = this.touchCoords.startX - this.touchCoords.stopX,
                n = Math.abs(t),
                r = Math.abs(this.touchCoords.startY - this.touchCoords.stopY);
            if (MX.isDefined(this.horizontal)) t != 0 && (e.stopPropagation(), e.preventDefault()), this.iscroll && this.iscroll.enabled && this.iscroll.disable();
            else {
                if (!(n > r)) {
                    delete this.touchCoords, this.horizontal = !1;
                    return
                }
                this.horizontal = !0, t != 0 && (e.stopPropagation(), e.preventDefault()), this.iscroll && this.iscroll.enabled && this.iscroll.disable()
            }
            var i = this.getItemWidth(),
                s = this.activeIndex * i,
                o = this.getLastIndex();
            this.activeIndex == 0 && t < 0 || this.activeIndex == o && t > 0 ? s += Math.ceil(t / 2) : s += t, n < i && (this.setTranslateX(-s), this.fireEvent("touchmove", this))
        },
        onTouchEnd: function(e) {
            this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.iscroll && this.iscroll.enable();
            if (!this.touchCoords) return;
            this.fireEvent("touchend", this);
            var t = this.getItemWidth(),
                n = this.getTransWidth(),
                r = Math.abs(this.touchCoords.startX - this.touchCoords.stopX),
                i, s = this.duration;
            r > t && (r = t), r >= n ? (this.touchCoords.startX > this.touchCoords.stopX ? i = this.activeIndex + 1 : i = this.activeIndex - 1, s = Math.ceil((1 - r / t) * s)) : (i = this.activeIndex, s = Math.ceil(r / t * s)), this.transform(i, !1, s), delete this.touchCoords
        },
        getItemWidth: function() {
            return this.itemWidth || (this.itemWidth = this.wrapper.children(":first-child").width()), this.itemWidth
        },
        getTransWidth: function() {
            var e = this.transWidth;
            return e < 1 && (e = this.getItemWidth() * e), e
        },
        getLastIndex: function() {
            return this.wrapper.children().length - 1
        },
        transform: function(e, t, n) {
            var r = this.getLastIndex(),
                i = this.getItemWidth();
            e < 0 ? this.fireEvent("transformfirst", this) === !1 && this.setTranslateX(0, !0) : e > r ? this.fireEvent("transformlast", this) === !1 && this.setTranslateX(-r * i, !0) : e != this.activeIndex && this.fireEvent("beforetransform", this, this.activeIndex, e) !== !1 ? this.transformHandle(e, t, n) : this.transformHandle(this.activeIndex, t, n)
        },
        transformHandle: function(e, t, n) {
            var r = this,
                i = r.getItemWidth(),
                s = e * i,
                o = r.activeIndex;
            r.activeIndex = e, r.setTransitionDuration(n), r.setTranslateX(-s, t), setTimeout(function() {
                r.setTransitionDuration(r.duration)
            }, 0), e != o && r.fireEvent("transform", r, e, o)
        },
        setTranslateX: function(e, t) {
            var n = this;
            t === !0 && n.setTransitionDuration(0), n.wrapDom.style.webkitTransform = "translate3d(" + e + "px, 0px, 0px)", t === !0 && setTimeout(function() {
                n.setTransitionDuration(n.duration)
            }, 0)
        },
        setTransitionDuration: function(e) {
            e = e < this.duration ? e : this.duration, e += "ms", this.wrapDom.style.webkitTransitionDuration = e
        },
        setTransitionTimingFunction: function(e) {
            this.wrapDom.style.webkitTransitionProperty = "-webkit-transform", this.wrapDom.style.webkitTransitionTimingFunction = e
        },
        resetItemWidth: function() {
            if (this.fill) {
                this.itemWidth = null;
                var e = MX.getWindowWidth(),
                    t = this.wrapper.children();
                this.wrapper.width((e + this.spacing * 2) * t.length), t.width(e), this.setTranslateX(-this.activeIndex * (this.getItemWidth() || e + this.spacing), !0)
            }
        },
        prev: function() {
            this.transform(this.activeIndex - 1)
        },
        next: function() {
            this.transform(this.activeIndex + 1)
        },
        onDestroy: function() {
            this.wrapDom.removeEventListener("touchstart", this._onTouchStart, !1), this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.wrapper = this.wrapDom = null, this.iscroll = null
        }
    })
}(), function() {
    var e = MX.lib.Zepto,
        t = MX.clazz.Class,
        n = MX.clazz.Utility,
        r = {
            slide: {
                duration: 600,
                timingFunction: "ease",
                previousStyle: "",
                nextStyle: "",
                currentStyle: ""
            },
            "3d": {},
            zoom: {}
        };
    MX.widget.Carousel = t.define({
        extend: n,
        activeIndex: 0,
        transWidth: .2,
        fill: !0,
        autoPlay: !0,
        interval: 3e3,
        transition: "slide",
        init: function() {
            this.wrapper = e(this.wrapper), this.wrapDom = this.wrapper[0], this.wrapper.children().css("position", "absolute"), this.resetItemWidth();
            var t = this.getItemWidth();
            MX.each(this.wrapper.children(), function(e, n) {
                n.style.webkitTransform = "translateX(" + (e == 0 ? 0 : t) + "px)"
            }), this.setAllTransitionTimingFunction(this.getTimingFunction()), this.transform(this.activeIndex, !1, !0), this.running = !1, this.autoPlay && this.start()
        },
        initEvents: function() {
            this.addEvents("beforetouchstart", "touchstart", "touchmove", "touchend", "beforetransform", "transform"), this._onTouchStart = e.proxy(this.onTouchStrat, this), this._onTouchMove = e.proxy(this.onTouchMove, this), this._onTouchEnd = e.proxy(this.onTouchEnd, this), this.wrapDom.addEventListener("touchstart", this._onTouchStart, !1), this.mon(window, "orientationchange", MX.createOrientationChangeProxy(this.onOrientationChange, this))
        },
        onOrientationChange: function() {
            this.resetItemWidth()
        },
        onTouchStrat: function(e) {
            delete this.horizontal, this.clear(), this.fireEvent("beforetouchstart", this, this.activeIndex) !== !1 && (this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.wrapDom.addEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.addEventListener("touchend", this._onTouchEnd, !1), this.prepareTransform(), this.touchCoords = {}, this.touchCoords.startX = e.touches[0].pageX, this.touchCoords.startY = e.touches[0].pageY, this.fireEvent("touchstart", this))
        },
        onTouchMove: function(e) {
            if (!this.touchCoords) return;
            this.touchCoords.stopX = e.touches[0].pageX, this.touchCoords.stopY = e.touches[0].pageY;
            var t = this.touchCoords.startX - this.touchCoords.stopX,
                n = Math.abs(t),
                r = Math.abs(this.touchCoords.startY - this.touchCoords.stopY);
            if (MX.isDefined(this.horizontal)) t != 0 && (e.stopPropagation(), e.preventDefault()), this.iscroll && this.iscroll.enabled && this.iscroll.disable();
            else {
                if (!(n > r)) {
                    delete this.touchCoords, this.horizontal = !1;
                    return
                }
                this.horizontal = !0, t != 0 && (e.stopPropagation(), e.preventDefault()), this.iscroll && this.iscroll.enabled && this.iscroll.disable()
            }
            var i = this.activeIndex,
                s = this.getItemWidth(),
                o = this.getContext(i),
                u = this.getLastIndex(),
                a = u > 0 ? 2 : 1,
                f = i,
                l;
            if (n < s) {
                if (t > 0) {
                    u > 1 && this.setTranslateX(o.prev, -s - t);
                    for (var c = 0; c < a; c++) {
                        l = s * c, this.setTranslateX(f, l - t);
                        if (l > n) break;
                        f = f == u ? 0 : f + 1
                    }
                } else {
                    u > 1 && this.setTranslateX(o.next, s - t);
                    for (var c = 0; c < a; c++) {
                        l = s * c, this.setTranslateX(f, -l - t);
                        if (l > n) break;
                        f = f == 0 ? u : f - 1
                    }
                }
                this.fireEvent("touchmove", this)
            }
        },
        onTouchEnd: function(e) {
            this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.iscroll && this.iscroll.enable();
            if (!this.touchCoords) {
                this.autoPlay && this.run();
                return
            }
            this.fireEvent("touchend", this);
            var t = this.getItemWidth(),
                n = this.getTransWidth(),
                r = Math.abs(this.touchCoords.startX - this.touchCoords.stopX),
                i = this.getContext(this.activeIndex),
                s, o = !(this.touchCoords.startX > this.touchCoords.stopX),
                u = this.getDuration();
            r > t && (r = t), r >= n ? (this.touchCoords.startX > this.touchCoords.stopX ? s = i.next : s = i.prev, u = Math.ceil((1 - r / t) * u)) : (s = i.curr, u = Math.ceil(r / t * u)), this.transform(s, o, !1, u), delete this.touchCoords
        },
        getItemWidth: function() {
            return this.itemWidth || (this.itemWidth = (this.wrapper.children(":first-child").width() || MX.getWindowWidth()) + 5), this.itemWidth
        },
        getTransWidth: function() {
            var e = this.transWidth;
            return e < 1 && (e = this.getItemWidth() * e), e
        },
        getLastIndex: function() {
            return this.wrapper.children().length - 1
        },
        getContext: function(e) {
            var t = this.getLastIndex(),
                n = e - 1,
                r = e + 1;
            return n < 0 && (n = t), r > t && (r = 0), {
                prev: n,
                next: r,
                curr: e
            }
        },
        prepareTransform: function(e) {
            var t = this,
                n = t.activeIndex,
                r = t.getItemWidth() || e || 0,
                i = t.getContext(n),
                s = i.prev,
                o = i.next;
            t.clear(), t.setTranslateX(s, -r, !0), t.setTranslateX(o, r, !0), t.setTranslateX(n, 0, !0), MX.each(t.wrapper.children(), function(e, i) {
                e != n && e != s && e != o && t.setTranslateX(e, -r, !0)
            }, t), setTimeout(function() {
                t.setAllTransitionDuration(0)
            }, 0)
        },
        transform: function(e, t, n, r) {
            var i = this.getLastIndex();
            (!MX.isDefined(r) || r == null) && this.prepareTransform(), e >= 0 && e <= i && e != this.activeIndex && this.fireEvent("beforetransform", this, this.activeIndex, e) !== !1 ? this.transformHandle(e, t, n, r) : this.transformHandle(this.activeIndex, t, n, r)
        },
        transformHandle: function(e, t, n, r) {
            var i = this,
                s = i.activeIndex,
                o = i.getItemWidth(),
                u = i.getContext(e),
                a = i.activeIndex != e ? s : t ? u.prev : u.next,
                f, l = i.activeIndex;
            i.activeIndex != e ? f = t ? o : -o : f = t ? -o : o, i.clear(), i.activeIndex = e, setTimeout(function() {
                i.setTransitionDuration(a, r), i.setTransitionDuration(e, r), i.setTranslateX(a, f, n), i.setTranslateX(e, 0, n), setTimeout(function() {
                    i.setTransitionDuration(a, i.getDuration()), i.setTransitionDuration(e, i.getDuration())
                }, 0)
            }, 0), e != l && i.fireEvent("transform", i, e, l), i.autoPlay && i.run()
        },
        setTranslateX: function(e, t, n) {
            var r = this;
            n === !0 && r.setTransitionDuration(e, 0), r.wrapper.children(":nth-child(" + (e + 1) + ")")[0].style.webkitTransform = "translate3d(" + t + "px, 0px, 0px)", n === !0 && setTimeout(function() {
                r.setTransitionDuration(e, r.getDuration())
            }, 0)
        },
        setTransitionDuration: function(e, t) {
            var n = this.getDuration();
            t = t < n ? t : n, t += "ms", this.wrapper.children(":nth-child(" + (e + 1) + ")")[0].style.webkitTransitionDuration = t
        },
        setAllTransitionDuration: function(e) {
            var t = this.getDuration();
            e = e < t ? e : t, e += "ms", MX.each(this.wrapper.children(), function(t, n) {
                n.style.webkitTransitionProperty = "-webkit-transform", n.style.webkitTransitionDuration = e
            }, this)
        },
        setAllTransitionTimingFunction: function(e) {
            MX.each(this.wrapper.children(), function(t, n) {
                n.style.webkitTransitionProperty = "-webkit-transform", n.style.webkitTransitionTimingFunction = e
            }, this)
        },
        getDuration: function() {
            return r[this.transition].duration
        },
        getTimingFunction: function() {
            return r[this.transition].timingFunction
        },
        resetItemWidth: function(e) {
            if (this.fill) {
                this.itemWidth = null;
                var t = MX.getWindowWidth();
                this.wrapper.width(t), this.wrapper.children().width(this.wrapper.width() || t), this.prepareTransform(t)
            }
        },
        prev: function() {
            this.transform(this.getContext(this.activeIndex).prev, !0)
        },
        next: function() {
            this.transform(this.getContext(this.activeIndex).next, !1)
        },
        start: function() {
            this.running || (this.running = !0, this.autoPlay = !0, this.run())
        },
        stop: function() {
            this.running = !1, this.autoPlay = !1, this.clear()
        },
        run: function() {
            this.clear(), this.loopTimeout = MX.defer(function() {
                this.transform(this.getContext(this.activeIndex).next)
            }, this.interval, this)
        },
        clear: function() {
            clearTimeout(this.loopTimeout), delete this.loopTimeout
        },
        reset: function() {
            this.transform(0, !1, !0)
        },
        onDestroy: function() {
            this.wrapDom.removeEventListener("touchstart", this._onTouchStart, !1), this.wrapDom.removeEventListener("touchmove", this._onTouchMove, !1), this.wrapDom.removeEventListener("touchend", this._onTouchEnd, !1), this.wrapper = this.wrapDom = null, this.iscroll = null
        }
    })
}(), function(e) {
    var t = e.lib.Zepto,
        n = e.app.WebApp,
        r = e.util.Cookie,
        i = window.localStorage,
        s = "/msohu/",
        o = "/wcms/",
        u = "/comments/",
        a = "/uc/",
        f = "application/json, text/javascript, */*; q=0.01",
        l = 10,
        c = !! window.MSOHU_CONFIG.POST_CC;
    e.debug = !! window.MSOHU_CONFIG.DEBUG;
    var h = !0,
        p = {
            useFixed: h,
            database: "msohu",
            databaseDesc: "Offline msohu storage",
            databaseExpires: 2592e5,
            loadingTmpl: "#loadingTmpl",
            welcome: "channel/headline/0",
            model: [{
                id: "articlesModel",
                tableName: "articles",
                fields: ["title", "content", "create_time", "media", "page_count", "next", "prev"],
                priorityCache: !0
            }, {
                id: "galleryGroupModel",
                baseParams: {
                    api_version: 2
                },
                tableName: "gallery",
                fields: ["title", "images", "desc", "next", "prev"],
                priorityCache: !0,
                singleton: !0
            }, {
                id: "commentCountModel",
                restful: u + "dynamic/cmt_wap_topic_count.json",
                dataProperty: "",
                disableCache: !0
            }],
            store: [{
                id: "channelFocusStore",
                restful: o + "fragment/focus/"
            }, {
                id: "channelFeedsStore",
                restful: o + "news/",
                pageSize: 18,
                meta: {
                    pageSizeProperty: "page_size"
                },
                maxPage: l
            }, {
                id: "channelLatestFeedsStore",
                restful: o + "news/",
                pageSize: 18,
                meta: {
                    pageSizeProperty: "page_size"
                },
                maxPage: l,
                disableCache: !0,
                singleton: !0
            }, {
                id: "headlineFragmentStore",
                restful: o + "fragment/",
                priorityCache: !0,
                cacheExpires: 6e5
            }, {
                id: "lastHeadlineFragmentStore",
                restful: o + "fragment/",
                storageKey: "headlineFragmentStore"
            }, {
                id: "articlesRecStore",
                restful: o + "fragment/",
                disableCache: !0,
                singleton: !0
            }, {
                id: "articlesHotStore",
                restful: o + "news/",
                pageSize: 50,
                meta: {
                    pageSizeProperty: "page_size"
                },
                disableCache: !0,
                singleton: !0
            }, {
                id: "galleryListStore",
                restful: o + "picturegroup/",
                pageSize: 10,
                meta: {
                    pageSizeProperty: "page_size"
                },
                maxPage: l,
                singleton: !0
            }, {
                id: "galleryLatestStore",
                restful: o + "picturegroup/",
                pageSize: 10,
                meta: {
                    pageSizeProperty: "page_size"
                },
                disableCache: !0,
                singleton: !0
            }, {
                id: "commentAllStore",
                restful: {
                    read: {
                        accepts: {
                            json: f
                        }
                    }
                },
                pageSize: 15,
                maxPage: l,
                meta: {
                    pageNumberProperty: "pageNo",
                    totalProperty: "valueCount"
                },
                dataProperty: "commentList",
                disableCache: !0,
                renderer: {
                    createTime: {
                        type: "timestampToDateString",
                        format: "m月d日 H:i:s"
                    }
                },
                singleton: !0
            }, {
                id: "commentHotStore",
                restful: {
                    read: {
                        accepts: {
                            json: f
                        }
                    }
                },
                pageSize: 3,
                meta: {
                    pageNumberProperty: "pageNo",
                    totalProperty: "valueCount"
                },
                dataProperty: "commentList",
                disableCache: !0,
                renderer: {
                    createTime: {
                        type: "timestampToDateString",
                        format: "m月d日 H:i:s"
                    }
                },
                singleton: !0
            }],
            header: [{
                id: "channelHeader",
                view: "Msohu.ChannelHeaderView",
                controller: "Msohu.ChannelHeaderController"
            }, {
                id: "articlesHeader",
                view: "Msohu.ArticlesHeaderView",
                controller: "Msohu.ArticlesHeaderController"
            }, {
                id: "commentsHeader",
                view: "Msohu.CommentsHeaderView",
                controller: "Msohu.CommentsHeaderController"
            }, {
                id: "galleryHeader",
                view: "Msohu.GalleryHeaderView",
                controller: "Msohu.GalleryHeaderController"
            }, {
                id: "cityWeatherHeader",
                view: "Msohu.CityWeatherHeaderView",
                controller: "Msohu.CityWeatherHeaderController"
            }, {
                id: "releaseLogHeader",
                view: "Msohu.ReleaseLogHeaderView",
                controller: "Msohu.ReleaseLogHeaderController"
            }, {
                id: "offlineSettingHeader",
                view: "Msohu.OfflineSettingHeaderView",
                controller: "Msohu.OfflineSettingHeaderController"
            }, {
                id: "feedbackHeader",
                view: "Msohu.FeedbackHeaderView",
                controller: "Msohu.FeedbackHeaderController"
            }],
            footer: [{
                id: "commentsFooter",
                view: "Msohu.CommentsFooterView",
                controller: "Msohu.CommentsFooterController",
                model: "commentCountModel"
            }],
            group: [{
                id: "channelGroup",
                header: "channelHeader"
            }, {
                id: "articleGroup",
                header: "articlesHeader",
                footer: "commentsFooter"
            }],
            pagelet: [{
                id: "headlineChannelPagelet",
                url: "channel/headline/0",
                view: "Msohu.ChannelView",
                controller: "Msohu.HeadlineChannelController",
                model: "commentCountModel",
                store: ["channelFocusStore", "channelFeedsStore", "channelLatestFeedsStore", "headlineFragmentStore", "lastHeadlineFragmentStore"],
                group: "channelGroup",
                enablePulling: !1,
                pullDownStore: "lastHeadlineFragmentStore",
                pullUpStore: "headlineFragmentStore",
                blockTransformView: !0
            }, {
                id: "channelPagelet",
                url: "channel/:cid/:sid",
                view: "Msohu.ChannelView",
                controller: "Msohu.ChannelController",
                model: "commentCountModel",
                store: ["channelFocusStore", "channelFeedsStore", "channelLatestFeedsStore"],
                group: "channelGroup",
                delayViewSource: "channelFeedsStore",
                enablePulling: !0,
                pullDownStore: "channelLatestFeedsStore",
                pullUpStore: "channelFeedsStore"
            }, {
                id: "articlesPagelet",
                url: "articles/:aid",
                view: "Msohu.ArticlesView",
                controller: "Msohu.ArticlesController",
                model: "articlesModel",
                store: ["articlesRecStore", "articlesHotStore"],
                group: "articleGroup",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                enablePulling: !0,
                enablePullDown: !1,
                pullUpStore: "articlesModel",
                hideFooterOnViewIn: !h,
                footerFloat: !h,
                blockTransformView: !0
            }, {
                id: "commentsPagelet",
                url: "comments/:id",
                header: "commentsHeader",
                footer: "commentsFooter",
                view: "Msohu.CommentsView",
                controller: "Msohu.CommentsController",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                store: ["commentAllStore", "commentHotStore"],
                delayViewSource: "commentAllStore",
                enablePulling: !0,
                enablePullDown: !1,
                pullUpStore: "commentAllStore",
                hideFooterOnViewIn: !h,
                footerFloat: !h,
                noCache: !0,
                offlineUnavailable: !0
            }, {
                id: "galleryListPagelet",
                url: "gallery/list/:id",
                group: "channelGroup",
                view: "Msohu.GalleryListView",
                controller: "Msohu.GalleryListController",
                store: ["galleryListStore", "galleryLatestStore"],
                delayViewSource: "galleryListStore",
                enablePulling: !0,
                pullDownStore: "galleryLatestStore",
                pullUpStore: "galleryListStore"
            }, {
                id: "newsGalleryPagelet",
                url: "newsgallery/:cid/:id",
                group: "channelGroup",
                view: "Msohu.NewsGalleryView",
                controller: "Msohu.NewsGalleryController",
                store: ["galleryListStore", "galleryLatestStore"],
                delayViewSource: "galleryListStore",
                enablePulling: !0,
                pullDownStore: "galleryLatestStore",
                pullUpStore: "galleryListStore"
            }, {
                id: "galleryGroupPagelet",
                url: "gallery/group/:id",
                header: "galleryHeader",
                footer: "commentsFooter",
                view: "Msohu.GalleryGroupView",
                controller: "Msohu.GalleryGroupController",
                model: "galleryGroupModel",
                delayViewSource: "galleryGroupModel",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                useScroll: !1,
                headerFloat: !0,
                footerFloat: !0,
                hideFooterOnViewIn: !0
            }, {
                id: "settingsPagelet",
                url: "settings",
                group: "channelGroup",
                view: "Msohu.SettingsView",
                controller: "Msohu.SettingsController",
                useScroll: !0,
                beforeScrollPreventDefault: !1,
                singleton: !0,
                preloadRightView: "weather"
            }, {
                id: "weatherPagelet",
                url: "weather",
                group: "channelGroup",
                view: "Msohu.WeatherView",
                controller: "Msohu.WeatherController",
                useScroll: !0,
                singleton: !0,
                preloadLeftView: "settings",
                preloadRightView: "channel/headline/0"
            }, {
                id: "cityweatherPagelet",
                url: "cityweather/:id",
                header: "cityWeatherHeader",
                view: "Msohu.CityWeatherView",
                controller: "Msohu.CityWeatherController",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                useScroll: !0,
                blockTransformView: !0,
                offlineUnavailable: !0
            }, {
                id: "feedbackPagelet",
                url: "feedback",
                header: "feedbackHeader",
                view: "Msohu.FeedbackView",
                controller: "Msohu.FeedbackController",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                useScroll: !0,
                singleton: !0,
                offlineUnavailable: !0
            }, {
                id: "offlineSettingPagelet",
                url: "offlineSetting",
                header: "offlineSettingHeader",
                view: "Msohu.OfflineSettingView",
                controller: "Msohu.OfflineSettingController",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                useScroll: !0,
                singleton: !0
            }, {
                id: "releaseLogPagelet",
                url: "release",
                header: "releaseLogHeader",
                view: "Msohu.ReleaseLogView",
                controller: "Msohu.ReleaseLogController",
                viewInEffect: "shadeUpIn",
                viewOutEffect: "shadeUpOut",
                swipeDownOut: !0,
                blockTransformView: !0,
                singleton: !0
            }]
        },
        d = [{
            name: "设置",
            hash: "settings",
            list: [{}]
        }, {
            name: "天气",
            hash: "weather",
            list: [{}]
        }, {
            name: "头条",
            hash: "headline",
            list: [{
                title: "头条",
                focus: "1135",
                headline: "15084",
                list: "2"
            }]
        }, {
            name: "新闻",
            hash: "news",
            list: [{
                title: "全部",
                focus: "532",
                headline: "1601",
                list: "2"
            }, {
                title: "国内",
                focus: "",
                headline: "1444",
                list: "32"
            }, {
                title: "社会",
                focus: "",
                headline: "1154",
                list: "53"
            }, {
                title: "军事",
                focus: "",
                headline: "1150",
                list: "8"
            }, {
                title: "国际",
                focus: "",
                headline: "1447",
                list: "57"
            }, {
                title: "图库",
                focus: "",
                headline: "1638",
                list: "55",
                index: "0"
            }, {
                title: "历史",
                focus: "",
                headline: "",
                list: "470"
            }, {
                title: "评论",
                focus: "",
                headline: "",
                list: "2686"
            }, {
                title: "传媒",
                focus: "",
                headline: "",
                list: "471"
            }]
        }, {
            name: "财经",
            hash: "finance",
            list: [{
                title: "全部",
                focus: "",
                headline: "156",
                list: "5"
            }, {
                title: "宏观",
                focus: "",
                headline: "",
                list: "33"
            }, {
                title: "股票",
                focus: "",
                headline: "",
                list: "103"
            }, {
                title: "理财",
                focus: "",
                headline: "95",
                list: "22"
            }, {
                title: "公司",
                focus: "",
                headline: "",
                list: "34"
            }, {
                title: "产业",
                focus: "",
                headline: "",
                list: "560"
            }, {
                title: "个股",
                focus: "",
                headline: "",
                list: "49"
            }, {
                title: "楼市",
                focus: "",
                headline: "",
                list: "132"
            }, {
                title: "评论",
                focus: "",
                headline: "",
                list: "409"
            }, {
                title: "图库",
                focus: "",
                headline: "1992",
                list: "450",
                index: "6"
            }]
        }, {
            name: "娱乐",
            hash: "ent",
            list: [{
                title: "全部",
                focus: "80",
                headline: "1669",
                list: "4"
            }, {
                title: "明星",
                focus: "",
                headline: "",
                list: "15"
            }, {
                title: "图库",
                focus: "",
                headline: "1641",
                list: "40",
                index: "2"
            }, {
                title: "电影",
                focus: "",
                headline: "",
                list: "284"
            }, {
                title: "电视",
                focus: "",
                headline: "",
                list: "290"
            }, {
                title: "音乐",
                focus: "",
                headline: "",
                list: "19"
            }, {
                title: "独家",
                focus: "",
                headline: "",
                list: "399"
            }, {
                title: "韩娱",
                focus: "",
                headline: "",
                list: "46"
            }, {
                title: "日娱",
                focus: "",
                headline: "",
                list: "301"
            }, {
                title: "欧美",
                focus: "",
                headline: "",
                list: "295"
            }]
        }, {
            name: "体育",
            hash: "sport",
            list: [{
                title: "全部",
                focus: "83",
                headline: "286",
                list: "3"
            }, {
                title: "NBA",
                focus: "408",
                headline: "168",
                list: "24"
            }, {
                title: "英超",
                focus: "",
                headline: "1878",
                list: "79"
            }, {
                title: "中超",
                focus: "",
                headline: "1781",
                list: "82"
            }, {
                title: "欧冠",
                focus: "21137",
                headline: "1797",
                list: "208"
            }, {
                title: "综合",
                focus: "",
                headline: "1837",
                list: "27"
            }, {
                title: "CBA",
                focus: "293",
                headline: "115",
                list: "23"
            }, {
                title: "西甲",
                focus: "",
                headline: "1876",
                list: "81"
            }, {
                title: "意甲",
                focus: "",
                headline: "1877",
                list: "80"
            }, {
                title: "彩票",
                focus: "",
                headline: "430",
                list: "28"
            }, {
                title: "图库",
                focus: "83",
                headline: "",
                list: "31",
                index: "4"
            }]
        }, {
            name: "科技",
            hash: "tech",
            list: [{
                title: "全部",
                focus: "247",
                headline: "248",
                list: "7"
            }, {
                title: "互联网",
                focus: "",
                headline: "",
                list: "190"
            }, {
                title: "通信",
                focus: "",
                headline: "",
                list: "191"
            }, {
                title: "业界",
                focus: "",
                headline: "",
                list: "193"
            }, {
                title: "科学",
                focus: "",
                headline: "",
                list: "74"
            }, {
                title: "苹果",
                focus: "",
                headline: "",
                list: "210"
            }, {
                title: "安卓",
                focus: "",
                headline: "",
                list: "211"
            }, {
                title: "数码",
                focus: "",
                headline: "",
                list: "61"
            }, {
                title: "手机",
                focus: "21992",
                headline: "22112",
                list: "101"
            }, {
                title: "图库",
                focus: "",
                headline: "341",
                list: "267",
                index: "7"
            }]
        }, {
            name: "图库",
            hash: "gallery",
            list: [{
                title: "新闻",
                focus: "",
                headline: "1638",
                list: "55"
            }, {
                title: "军事",
                focus: "",
                headline: "1647",
                list: "527"
            }, {
                title: "娱乐",
                focus: "",
                headline: "1641",
                list: "40"
            }, {
                title: "写真",
                focus: "",
                headline: "",
                list: "75"
            }, {
                title: "体育",
                focus: "83",
                headline: "",
                list: "31"
            }, {
                title: "女人",
                focus: "",
                headline: "1894",
                list: "99"
            }, {
                title: "财经",
                focus: "",
                headline: "1992",
                list: "450"
            }, {
                title: "科技",
                focus: "",
                headline: "341",
                list: "267"
            }, {
                title: "健康",
                focus: "",
                headline: "",
                list: "112"
            }, {
                title: "情趣",
                focus: "",
                headline: "",
                list: "87"
            }, {
                title: "趣图",
                focus: "",
                headline: "",
                list: "2727"
            }]
        }, {
            name: "女人",
            hash: "women",
            list: [{
                title: "全部",
                focus: "1476",
                headline: "1840",
                list: "326"
            }, {
                title: "时尚",
                focus: "863",
                headline: "1841",
                list: "6"
            }, {
                title: "服饰",
                focus: "",
                headline: "",
                list: "95"
            }, {
                title: "美容",
                focus: "",
                headline: "",
                list: "97"
            }, {
                title: "生活",
                focus: "",
                headline: "",
                list: "98"
            }, {
                title: "健康",
                focus: "394",
                headline: "1842",
                list: "20"
            }, {
                title: "两性",
                focus: "",
                headline: "",
                list: "63"
            }, {
                title: "情感",
                focus: "572",
                headline: "15270",
                list: "21"
            }, {
                title: "图库",
                focus: "",
                headline: "1894",
                list: "99",
                index: "5"
            }, {
                title: "数说",
                focus: "",
                headline: "",
                list: "2833"
            }]
        }, {
            name: "汽车",
            hash: "auto",
            list: [{
                title: "全部",
                focus: "11564",
                headline: "12592",
                list: "1592"
            }, {
                title: "新闻",
                focus: "",
                headline: "",
                list: "1947"
            }, {
                title: "新车",
                focus: "",
                headline: "",
                list: "1918"
            }, {
                title: "导购",
                focus: "",
                headline: "",
                list: "1944"
            }, {
                title: "对比",
                focus: "",
                headline: "",
                list: "1959"
            }, {
                title: "试驾",
                focus: "",
                headline: "",
                list: "1964"
            }, {
                title: "用车",
                focus: "",
                headline: "",
                list: "2026"
            }, {
                title: "谍照",
                focus: "",
                headline: "",
                list: "1955"
            }, {
                title: "产业",
                focus: "",
                headline: "",
                list: "1965"
            }, {
                title: "评论",
                focus: "",
                headline: "",
                list: "1966"
            }]
        }, {
            name: "星座",
            hash: "astro",
            list: [{
                title: "全部",
                focus: "1423",
                headline: "1839",
                list: "9"
            }, {
                title: "星情",
                focus: "",
                headline: "",
                list: "309"
            }, {
                title: "运程",
                focus: "",
                headline: "",
                list: "310"
            }, {
                title: "命理",
                focus: "",
                headline: "",
                list: "311"
            }, {
                title: "解梦",
                focus: "",
                headline: "",
                list: "316"
            }, {
                title: "生肖",
                focus: "",
                headline: "",
                list: "319"
            }, {
                title: "血型",
                focus: "",
                headline: "",
                list: "320"
            }, {
                title: "爱情",
                focus: "",
                headline: "",
                list: "323"
            }, {
                title: "猎奇",
                focus: "",
                headline: "",
                list: "2901"
            }, {
                title: "风水",
                focus: "",
                headline: "",
                list: "312"
            }]
        }, {
            name: "笑话",
            hash: "joke",
            list: [{
                title: "全部",
                focus: "19560",
                headline: "19565",
                list: "1393"
            }, {
                title: "极品",
                focus: "",
                headline: "",
                list: "2543"
            }, {
                title: "成人",
                focus: "",
                headline: "",
                list: "2560"
            }, {
                title: "幽默",
                focus: "",
                headline: "",
                list: "2561"
            }, {
                title: "段子",
                focus: "",
                headline: "",
                list: "2562"
            }, {
                title: "笑闻",
                focus: "",
                headline: "",
                list: "2563"
            }, {
                title: "灵异",
                focus: "",
                headline: "",
                list: "2564"
            }, {
                title: "冷料",
                focus: "",
                headline: "",
                list: "2565"
            }, {
                title: "趣图",
                focus: "",
                headline: "",
                list: "2727",
                index: "10"
            }]
        }],
        v = e.getUrlParams(!0);
    t.extend(p, v), window.Msohu = {
        config: p,
        channels: d,
        WCMS_HOST: o,
        COMMENTS_HOST: u,
        MSOHU_HOST: s,
        UC_HOST: a,
        ACCEPT_TYPE: f,
        cities: ["北京", "上海", "广州", "深圳", "重庆", "成都", "天津", "杭州", "南京", "钓鱼岛"],
        postCC: c,
        useFixed: h
    }, Msohu.hasSmuid = !! r.get("_smuid"), Msohu.Config = {
        key: "msohu_user_config",
        data: {},
        init: function() {
            try {
                var e = i.getItem(Msohu.Config.key);
                e && (e = JSON.parse(e), t.extend(Msohu.Config.data, e))
            } catch (n) {}
        },
        set: function(e, t) {
            Msohu.Config.data[e] = t;
            try {
                i.setItem(Msohu.Config.key, JSON.stringify(Msohu.Config.data))
            } catch (n) {}
        },
        get: function(e) {
            return Msohu.Config.data[e]
        },
        remove: function(e) {
            delete Msohu.Config.data[e];
            try {
                i.setItem(Msohu.Config.key, JSON.stringify(Msohu.Config.data))
            } catch (t) {}
        }
    }, n.on("launch", Msohu.Config.init), window.addToHomeConfig = {
        autostart: !1,
        touchIcon: !0,
        startDelay: 0,
        expire: 2592e3,
        animationIn: "fade",
        message: "<strong>添加手机搜狐到桌面</strong>点击下方 %icon <br>选择“添加至主屏幕”"
    };
    var m = window.location.href;
    (/sohu\.com\/?$/i.test(m) || /index\.html#?$/i.test(m) || /#\/(channel|newsgallery|gallery\/list)\//i.test(m)) && n.on("transformview", function() {
        window.addToHome.show(), setTimeout(function() {
            t("#addToHomeScreen .addToHomeClose").click(function() {
                Msohu.cc({
                    position: "000030_desktop_close"
                })
            })
        }, 10), Msohu.cc({
            position: "000029_desktop_show"
        }), window.navigator.standalone && Msohu.cc({
            position: "000029_desktop_bookmark"
        }), n.on("beforetransformview", function() {
            t("#addToHomeScreen").length > 0 && window.addToHome.close()
        }, window, {
            single: !0
        })
    }, window, {
        single: !0
    })
}(MX), function(e) {
    var t = e.lib.Zepto,
        n = e.clazz.Class,
        r = e.util.Format,
        i = e.widget.Overlayer,
        s = e.app.WebApp;
    Msohu.ShareWindow = n.define({
        extend: i,
        baseLinks: ["http://w.sohu.com/t2/share.do?appKey=jJyoQBKGARsjefXboFtZ", "http://weibo.cn/ext/share?relateUid=1934323297&wm=4602", ""],
        onRender: function() {
            this.mon(this.el.find("div.close a"), "click", this.hide), this.mon(this.el.find("div.ls a"), "click", this.share)
        },
        beforeShow: function(e) {
            this.lastCtCls = e.brightCls, this.options = e, this.layCt.addClass(e.brightCls), this.el.find("a.act").removeClass("act")
        },
        onHide: function() {
            this.lastCtCls && this.layCt.removeClass(this.lastCtCls), this.options = {}, this.lastCtCls = ""
        },
        share: function(e) {
            var n = t(e.target);
            n = n.closest("a");
            var i, o = this.options.fromPage,
                u, a = encodeURIComponent("http://m.sohu.com/" + (o == "news" ? "n" : "p") + "/" + this.options.newsId + "/"),
                f = encodeURIComponent(s.getCurrentUrl(!0)),
                l = encodeURIComponent(this.options.title || ""),
                c = encodeURIComponent(this.options.pic || "");
            n.hasClass("act") ? n.removeClass("act") : (index = n.closest("div.it").index(), index == 0 ? i = r.urlAppend(this.baseLinks[0], {
                url: a,
                returnURL: f,
                title: l,
                picture: c
            }) : index == 1 ? i = r.urlAppend(this.baseLinks[1], {
                backurl: f,
                ru: a,
                rt: l,
                tp: c
            }) : index == 2, o == "news" ? index == 0 ? u = "000029_share_btnnews_sohu" : index == 1 && (u = "000029_share_btnpics_sohu") : o == "gallery" && (index == 0 ? u = "000029_share_btnnews_sina" : index == 1 && (u = "000029_share_btnpics_sina")), u && Msohu.cc({
                position: u
            }), window.location.href = i)
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.clazz.Class,
        u = e.lib.Zepto,
        a = e.util.Storage,
        f = e.util.Date,
        l = e.app.WebApp,
        c = window.navigator;
    Msohu.ChannelHeaderView = o.define({
        extend: i,
        templates: [{
            id: "channelHeadTmpl",
            targetTmpl: "#channelHeadTmpl",
            autoRender: !0
        }, {
            id: "subChannelNavTmpl",
            targetTmpl: "#subChannelNavTmpl"
        }, {
            id: "citySubNavTmpl",
            targetTmpl: "#citySubNavTmpl"
        }]
    }), Msohu.ChannelHeaderController = o.define({
        extend: r,
        delegates: {
            "click div.it > a": "toggleSubNav",
            "click h1 > a": "reloadHandler",
            "click div.offline > a": "offlineDownload"
        },
        onInit: function() {
            this.hideTitle = !1, this.scroll = new iScroll(this.getEl().find("div.siteNav")[0], {
                hScroll: !0,
                vScroll: !1,
                hScrollbar: !1,
                vScrollbar: !1,
                useTransform: !0,
                useTransition: !0,
                checkDOMChanges: !1,
                onScrollEnd: u.proxy(this.onScrollEnd, this)
            }), this.initWeather()
        },
        onInitEvents: function() {
            this.addEvents("showheader", "hideheader", "changecolumn", "cityweather"), this.don(l, "beforetransformview", this.onHide, this), this.don(Msohu.OfflineDownload, {
                scope: this,
                startdownload: this.startOfflineDownload,
                resumedownload: this.resumeOfflineDownload,
                pausedownload: this.pauseOfflineDownload,
                downloadChannel: this.onDownloadChannel,
                downloadarticle: this.onDownloadArticle,
                finishdownload: this.finishOfflineDownload,
                downloadfailed: this.failOfflineDownload,
                nonedownload: this.noneOfflineDownload
            }), this.mon(window, "orientationchange", e.createOrientationChangeProxy(this.orientationChangeHandler, this))
        },
        orientationChangeHandler: function() {
            this.scroll && this.scroll.resizeLocked !== !0 && this.adjustScroll(this.getColumnEl(this.lastColumn), !0)
        },
        initWeather: function() {
            var e = a.get("msohu_user_defaultCity");
            e ? this.loadCityWeather(e) : l.online ? c.geolocation ? c.geolocation.getCurrentPosition(u.proxy(this.onPositionSuccess, this), u.proxy(this.onPositionError, this), {
                timeout: 5e3
            }) : this.loadCityWeather() : (Msohu.cityWeather = a.get("msohu_last_cityWeather"), this.renderWeather(), this.fireEvent("cityweather", this))
        },
        onPositionSuccess: function(e) {
            var t = e.coords.latitude,
                n = e.coords.longitude;
            this.loadCityWeather(null, n + "," + t)
        },
        onPositionError: function(e) {
            this.loadCityWeather()
        },
        loadCityWeather: function(t, n) {
            var r = this;
            t = t || "", n = n || "", e.ajax({
                url: Msohu.WCMS_HOST + "weather/",
                method: "GET",
                dataType: "json",
                data: {
                    city: t,
                    points: n
                },
                success: function(e) {
                    e.status == 0 && (Msohu.cityWeather = e.data, a.get("msohu_user_defaultCity") || a.set("msohu_user_defaultCity", e.data[0].city), a.set("msohu_last_cityWeather", e.data), r.renderWeather(), r.fireEvent("cityweather", r))
                },
                error: function() {}
            })
        },
        renderWeather: function() {
            if (Msohu.cityWeather) {
                var e = this.getColumnEl("weather"),
                    t = Msohu.cityWeather[0],
                    n = t.temp_l + "℃/" + t.temp_h + "℃";
                e.find("b").html(t.city);
                var r = e.find("a"),
                    i = r.find("em");
                i.length > 0 ? i.html(n) : r.append("<em>" + n + "</em>")
            }
        },
        adjustScroll: function(t, n) {
            if (!this.adjustScrolling) {
                this.adjustScrolling = !0;
                var r = this.scroll.x,
                    i = t.width(),
                    s = t.index() * i,
                    o = e.getWindowWidth(),
                    u = -Math.ceil(s - o / 2 + i / 2);
                if (Math.ceil(r) != u) {
                    var a = -(i * 13 - o);
                    u > 0 && (u = 0), u < a && (u = a), this.scroll.scrollTo(u, 0, n === !0 ? 0 : 300)
                }
                n ? this.adjustScrolling = !1 : e.defer(function() {
                    this.adjustScrolling = !1
                }, 300, this)
            } else clearTimeout(this.adjustScrollTimeout), this.adjustScrollTimeout = e.defer(function() {
                this.adjustScroll(t, n)
            }, 300, this)
        },
        selectColumn: function(t, n, r) {
            this.subNavBox && this.hideSubNav(), this.citySubNavBox && this.hideCityNav(), this.subChannnelIndex = n ? parseInt(n) : 0;
            var i;
            e.isNumber(t) && (i = this.getColumnEl(t), t = i.data("column")), i = i || this.getColumnEl(t);
            if (i.length > 0) {
                i.addClass("on");
                if (this.lastColumn != t) {
                    if (this.lastColumn) {
                        var s = this.getColumnEl(this.lastColumn);
                        s.removeClass("on"), this.lastColumn != "weather" && s.find("em").remove()
                    }
                    var o = i.index(),
                        u = o < this.lastColumnIndex ? "slideRight" : "slideLeft";
                    this.lastColumn = t, this.lastColumnIndex = o, this.getEl().find("div.siteNav")[(o == 0 || o == i.parent().children().length - 1 ? "add" : "remove") + "Class"]("hideMask"), this.onChangeColumn(t, u), this.fireEvent("changecolumn", t), this.adjustScroll(i, r)
                }
                Msohu.currentChannel = t, t != "settings" && t != "weather" ? this.setSubChannel(n) : this.hideOfflineStatusLay()
            }
            return t
        },
        onChangeColumn: function(e, t) {
            var n = {
                useViewOut: t
            };
            e == "settings" ? l.forward("settings", n) : e == "weather" ? l.forward("weather", n) : e == "gallery" ? l.forward("gallery/list/" + this.subChannnelIndex, n) : l.forward("channel/" + e + "/" + this.subChannnelIndex, n)
        },
        getColChilds: function() {
            return this.getEl().find("div.siteNav > div.wrap").children()
        },
        getColumnEl: function(t) {
            if (e.isNumber(t)) {
                var n = this.getColChilds(),
                    r = n.length;
                return t = t > r - 1 ? r - 1 : t, u(n[t < 0 ? 0 : t])
            }
            return this.getEl().find('div.siteNav div[data-column="' + t + '"]')
        },
        initSubNav: function() {
            this.subNavBox || (this.subNavBox = u(document.createElement("div")), this.subNavBox.addClass("boxFlow boxFlow_below"), this.subNavBox.height(0), this.subNavEl = this.getTemplate("subChannelNavTmpl").render(this.subNavBox, {
                list: Msohu.channels[this.lastColumnIndex].list,
                lastColumn: this.lastColumn,
                subIndex: this.subChannnelIndex
            }), this.subNavBox.insertAfter(this.getCt()))
        },
        showSubNav: function() {
            clearTimeout(this.hideSubNavTimeout), this.initSubNav(), this.setSubChannel(this.subChannnelIndex), this.getEl().find("div.on").addClass("act"), this.subNavBox.height(this.subNavEl.height()), this.hideSubNavTimeout = e.defer(this.hideSubNav, 3e3, this)
        },
        hideSubNav: function() {
            if (this.subNavBox) {
                var e = this.getEl();
                clearTimeout(this.hideSubNavTimeout), this.initSubNav(), this.subNavBox.height(0), setTimeout(function() {
                    e.find("div.on").removeClass("act")
                }, 400)
            }
        },
        toggleSubNav: function(e) {
            if (l.blockTransforming) return;
            var t = u(e.target).closest("div.it"),
                n = t.data("column");
            t.hasClass("on") ? n == "weather" ? (this.initCityNav(), this.citySubNavBox && (this.citySubNavBox.height() == 0 ? this.showCityNav() : this.hideCityNav())) : n != "settings" && n != "headline" && (this.initSubNav(), this.subNavBox.height() == 0 ? this.showSubNav() : this.hideSubNav()) : this.selectColumn(n), Msohu.currentChannel = n
        },
        setSubChannel: function(e) {
            var t = Msohu.channels[this.lastColumnIndex].list;
            this.subNavBox && (this.subNavEl = this.getTemplate("subChannelNavTmpl").render(this.subNavBox, {
                list: Msohu.channels[this.lastColumnIndex].list,
                lastColumn: this.lastColumn,
                subIndex: this.subChannnelIndex
            }), this.subNavBox.find("div.on").removeClass("on"), u(this.subNavBox.find("div.it")[e]).addClass("on")), e = e || 0;
            if (this.lastColumn == "gallery" || e > 0) {
                var n = this.getColumnEl(this.lastColumn).find("a"),
                    r = n.find("em");
                r.length > 0 ? r.html(t[e].title) : n.append("<em>" + t[e].title + "</em>")
            } else this.getColumnEl(this.lastColumn).find("em").remove(), this.lastColumn !== "headline" && this.lastColumn !== "weather" && this.getEl().find("div.on > a").append('<em><i class="i i9"></i></em>')
        },
        getHideInput: function() {
            return this.citySubNavBox ? this.citySubNavBox.find("input,select,textarea") : null
        },
        initCityNav: function() {
            if (!this.citySubNavBox) {
                this.citySubNavBox = u(document.createElement("div")), this.citySubNavBox.addClass("boxFlow boxFlow_below"), this.citySubNavBox.height(0), this.citySubNavEl = this.getTemplate("citySubNavTmpl").render(this.citySubNavBox, {
                    city: Msohu.cityWeather ? Msohu.cityWeather[0].city : "北京",
                    cities: Msohu.cities
                }), this.citySubNavBox.insertAfter(this.getCt());
                var e = this.citySubNavBox.find("input");
                this.mon(this.citySubNavBox.find("a.delete"), "click", this.clearSearchCity, this), this.mon(e, "focus", this.showSearchCityCache, this), this.mon(e, "keyup", this.searchCity, this), this.mon(e, "input", this.searchCity, this), this.delegate(this.citySubNavEl, "a.js_searchCityRs", "click", this.goCityWeather, this)
            }
        },
        showCityNav: function() {
            this.citySubNavBoxHidden = !1, this.initCityNav(), this.citySubNavBox && (this.setCitySub(Msohu.cityWeather ? Msohu.cityWeather[0].city : "北京"), this.citySubNavBox.height(this.citySubNavEl.height()))
        },
        hideCityNav: function() {
            this.citySubNavBoxHidden = !0, this.citySubNavBox && (this.citySubNavBox.height(0), this.clearSearchCity())
        },
        setCitySub: function(e) {
            this.citySubNavBox && (this.citySubNavEl.children("div.on").removeClass("on"), this.citySubNavEl.children('div.it[data-city="' + e + '"]').addClass("on"))
        },
        onHide: function() {
            this.hideSubNav(), this.hideCityNav(), this.hideOfflineTip()
        },
        searchCity: function() {
            var t = this,
                n = this.citySubNavEl.find("input").val();
            if (!n) {
                t.clearSearchCity();
                return
            }
            this.citySubNavEl.find("a.delete").show();
            var r = a.get("msohu_cities");
            !r && !t.searchCityLoading ? (t.searchCityLoading = !0, e.ajax({
                url: Msohu.WCMS_HOST + "area/cities/",
                type: "GET",
                dataType: "json",
                success: function(e) {
                    r = e.cities, a.set("msohu_cities", r), t.filterCity(r, n)
                },
                complete: function() {
                    t.searchCityLoading = !1
                }
            })) : t.filterCity(r, n)
        },
        filterCity: function(t, n) {
            var r = [],
                i;
            n = n || "", n = e.trim(n), e.each(t, function(e, t) {
                i = new RegExp(".*?" + n + ".*?", "i"), i.test(t) && r.push(t)
            }, this), r.length > 0 && this.showSearchResult(r)
        },
        showSearchResult: function(t) {
            var n = this.citySubNavEl.find("div.js_rs");
            n.length == 0 && (n = u('<div class="it cross js_rs"><div class="wCityAsso"></div></div>'), n.insertAfter(this.citySubNavEl.find("div.js_search")));
            var r = [];
            e.each(t, function(e, t) {
                r.push('<a href="#" class="asso js_searchCityRs">', t, "</a>");
                if (e >= 4) return !1
            }, this), n.children(".wCityAsso").html(r.join("")), this.citySubNavBox.addClass("boxFlow_above").removeClass("boxFlow_below"), n.show(), this.citySubNavBox.height(this.citySubNavEl.height() + n.children(".wCityAsso").height())
        },
        clearSearchCity: function() {
            var e = this;
            e.citySubNavBox && (e.citySubNavEl.find("input").val(""), e.citySubNavEl.find("a.delete").hide(), e.citySubNavBox.height(e.citySubNavBoxHidden ? 0 : e.citySubNavEl.height()), setTimeout(function() {
                e.citySubNavBox.addClass("boxFlow_below").removeClass("boxFlow_above"), e.citySubNavEl.find("div.js_rs").hide().children("wCityAsso").html("")
            }, 100))
        },
        showSearchCityCache: function() {
            this.searchCityCache && this.searchCityCache.length > 0 && this.showSearchResult(this.searchCityCache)
        },
        goCityWeather: function(e) {
            e.preventDefault();
            var t = u(e.target).html();
            this.searchCityCache = this.searchCityCache || [];
            var n = u.inArray(t, this.searchCityCache);
            n != -1 && this.searchCityCache.splice(n, 1), this.searchCityCache.unshift(t), l.forward("cityweather/" + t)
        },
        reloadHandler: function() {
            l.forward("channel/headline/0")
        },
        offlineDownloadTip: function() {
            var t = a.get("msohu_offline_last_updated"),
                n = a.get("msohu_offline_last_updated_date"),
                r = a.get("msohu_offline_download_done"),
                i = a.get("msohu_offline_download_tip_hidden"),
                s = a.get("msohu_offline_last_show_tip");
            if (!this.isShowOfflineTip) {
                this.isShowOfflineTip = !0;
                if (n && r == "1") i != "1" && this.createOfflineSuccessTip();
                else if (!s || Date.now() >= parseInt(s) + 12096e5) this.offlineTip = u('<div class="lay tipPop offlineTip fixed" style="opacity:0"></div>'), this.offlineTip.html('<div class="cnt">                                                    <div class="arr"></div>                                                    <div class="des">点击 <i class="i iT9"></i> 可以离线下载哦！</div>                                                </div>'), l.boxCt.append(this.offlineTip), this.offlineTip.animate({
                    opacity: 1
                }, {
                    duration: 300,
                    easing: "ease"
                }), this.offlineTip.click(u.proxy(function() {
                    clearTimeout(this.offlineTipTimeout), this.hideOfflineTip()
                }, this)), this.offlineTipTimeout = e.defer(function() {
                    this.hideOfflineTip()
                }, 2e3, this), a.set("msohu_offline_last_show_tip", Date.now())
            }
            if (n && r == "1") {
                var o = this.getEl().find("div.offline a"),
                    f = o.find("em");
                f.length == 0 ? o.append("<em>" + t + "</em>") : f.html(t)
            }
        },
        createOfflineSuccessTip: function(t) {
            clearTimeout(this.offlineTipTimeout);
            var n = a.get("msohu_offline_last_updated_date"),
                r = a.get("msohu_offline_last_updated_timestamp"),
                i = a.get("msohu_offline_download_done"),
                s = a.get("msohu_offline_download_tip_hidden");
            if (n && i == "1") {
                if (!this.offlineTip) {
                    var o = new Date,
                        f = new Date(parseInt(r));
                    if (t || o.getDate() != f.getDate()) this.offlineTip = u('<div class="lay tipPop offlineTip fixed" style="opacity:0"></div>'), this.offlineTip.html('<div class="cnt">                                                    <div class="arr"></div>                                                    ' + (t === !0 ? '<div class="des">已完成下载</div>' : '                                                    <div class="des">上次离线下载：<br>' + n + '</div>                                                    <div class="opt"><a href="javascript:void(0);" class="btn btnA btnA3"><i class="i i2"></i>不再提示</a></div>') + "                                                </div>"), l.boxCt.append(this.offlineTip), this.offlineTip.animate({
                        opacity: 1
                    }, {
                        duration: 300,
                        easing: "ease"
                    }), this.offlineTip.find("a").click(u.proxy(function() {
                        a.set("msohu_offline_download_tip_hidden", "1"), this.hideOfflineTip()
                    }, this))
                } else this.offlineTip.show();
                this.offlineTipTimeout = e.defer(function() {
                    this.hideOfflineTip()
                }, 2e3, this)
            }
        },
        offlineDownload: function() {
            var e = a.get("msohu_offline_channels");
            e ? Msohu.OfflineDownload.downloading ? Msohu.OfflineDownload.paused ? Msohu.OfflineDownload.resume() : Msohu.OfflineDownload.pause() : Msohu.OfflineDownload.download() : (this.hideOfflineTip(), Msohu.offlineDownloadAfterSetting = !0, l.forward("offlineSetting"))
        },
        startOfflineDownload: function() {
            this.hideOfflineTip();
            var e = this.getEl().find("div.offline"),
                t = e.find("a"),
                n = t.find("em");
            n.length == 0 ? t.append("<em>0%</em>") : n.html("0%"), e.addClass("downloading"), this.offlineStatusLayEl && (this.offlineStatusLayEl.find("div.stats").addClass("downloading").removeClass("paused finished"), this.offlineStatusLayEl.find("b.js_offlineStatus").html(Msohu.OfflineDownload.downloadingChannelName ? Msohu.OfflineDownload.downloadingChannelName + "..." : ""), this.offlineStatusLayEl.find("em.js_offlinePress").html("0"), this.offlineStatusLayEl.find("div.s3 div.cnt").html("已完成")), this.layOfflineDisplayFlag = !0, Msohu.useFixed || this.showOfflineStatusLay(), Msohu.Tip.show("开始离线下载"), Msohu.cc({
                position: "000029_offline_begin"
            })
        },
        resumeOfflineDownload: function() {
            clearTimeout(this.offlineDownloadLayTimeout), this.getEl().find("div.offline").addClass("downloading"), this.offlineDownloadingFlagEl && this.hideTitle && this.offlineDownloadingFlagEl.show(), this.offlineStatusLayEl && this.offlineStatusLayEl.find("div.stats").addClass("downloading").removeClass("paused"), Msohu.Tip.show("恢复离线下载")
        },
        pauseOfflineDownload: function() {
            clearTimeout(this.offlineDownloadLayTimeout), this.getEl().find("div.offline").removeClass("downloading"), this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.hide(), this.offlineStatusLayEl && this.offlineStatusLayEl.find("div.stats").addClass("paused").removeClass("downloading"), this.offlineDownloadLayTimeout = e.defer(function() {
                this.hideOfflineStatusLay()
            }, 3e3, this), Msohu.Tip.show("暂停离线下载"), Msohu.cc({
                position: "000029_offline_stop"
            })
        },
        onDownloadChannel: function(e) {
            this.offlineStatusLayEl && this.offlineStatusLayEl.find("b.js_offlineStatus").html(e + "...")
        },
        onDownloadArticle: function() {
            var e = this.getEl().find("div.offline a"),
                t = e.find("em"),
                n = Msohu.OfflineDownload.getProgress();
            t.length == 0 ? e.append("<em>" + n + "%</em>") : t.html(n + "%"), this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.find("div.cnt").html("离线下载：" + n + "％..."), this.offlineStatusLayEl && this.offlineStatusLayEl.find("em.js_offlinePress").html(n)
        },
        finishOfflineDownload: function() {
            clearTimeout(this.offlineDownloadLayTimeout);
            var t = this.getEl().find("div.offline"),
                n = t.find("a"),
                r = n.find("em");
            r.length == 0 ? (r = u("<em>100%</em>"), n.append(r)) : r.html("100%"), t.removeClass("downloading"), this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.hide(), this.offlineStatusLayEl && this.offlineStatusLayEl.find("div.stats").addClass("finished").removeClass("downloading"), this.offlineDownloadLayTimeout = e.defer(function() {
                this.hideOfflineStatusLay(!0)
            }, 3e3, this), Msohu.Tip.show("下载完成");
            var i = f.format(new Date, "G:i");
            a.set("msohu_offline_last_updated_date", f.format(new Date, "Y-m-d G:i")), a.set("msohu_offline_last_updated", i), a.set("msohu_offline_last_updated_timestamp", Date.now()), r.html(i)
        },
        failOfflineDownload: function(t, n) {
            clearTimeout(this.offlineDownloadLayTimeout);
            var r = this.getEl().find("div.offline"),
                i = r.find("a").find("em");
            i.length != 0 && i.html(""), r.removeClass("downloading"), this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.hide(), this.offlineStatusLayEl && (this.offlineStatusLayEl.find("div.stats").addClass("finished").removeClass("downloading"), this.offlineStatusLayEl.find("div.s3 div.cnt").html("下载失败")), this.offlineDownloadLayTimeout = e.defer(function() {
                this.hideOfflineStatusLay(!0)
            }, 3e3, this), Msohu.MessageBox.show({
                title: "离线失败",
                content: n,
                submitText: "知道了"
            })
        },
        noneOfflineDownload: function() {
            this.createOfflineSuccessTip(!0)
        },
        onViewBeforeScrollMove: function(e, t) {
            if (Msohu.useFixed) {
                var n = t.e,
                    r = e.getScroll(),
                    i = r.y,
                    s = n.touches[0],
                    o = s.pageY - r.pointY,
                    u = i + r.options.topOffset,
                    a = this.getEl().find("div.tray"),
                    f = 47,
                    c = parseInt(a.data("margin") || 0);
                if (o > 0) {
                    c >= -20 && this.hideOfflineStatusLay();
                    if (u >= 0 && c < 0) return c += Math.abs(o), c = c > 0 ? 0 : c, a.data("margin", c), this.view.setMarginTop(c), l.resetBoxHeight(), r.pointY += o, !1
                } else if (o < 0) {
                    this.hideOfflineTip(), c < -20 && this.showOfflineStatusLay(!0);
                    if (c > -f) return c -= Math.abs(o), c = c < -f ? -f : c, a.data("margin", c), this.view.setMarginTop(c), l.resetBoxHeight(), r.pointY += o, !1
                }
            }
        },
        onViewScrollMove: function(e) {
            if (Msohu.useFixed) {
                var t = e.getEl().offset().top,
                    n = e.getScroll(),
                    r = n.y,
                    i = 47,
                    s = r + n.options.topOffset;
                s < 0 ? this.hideTitle || (this.hideTitle = !0, Msohu.OfflineDownload.downloading && (this.offlineDownloadingFlagEl || (this.offlineDownloadingFlagEl = u('<a href="javascript:void(0);" style="display:none;" class="lay offlineStatus2 fixed"></a>'), l.boxCt.append(this.offlineDownloadingFlagEl)), Msohu.OfflineDownload.paused || this.offlineDownloadingFlagEl.show()), l.lastPagelet.refreshScrollStatus(), this.fireEvent("hideheader")) : s >= 0 && this.showTitle()
            } else this.showOfflineStatusLay()
        },
        showOfflineStatusLay: function(e) {
            Msohu.OfflineDownload.downloading && this.layOfflineDisplayFlag && (e === !0 || !Msohu.useFixed || this.hideTitle) && (this.offlineStatusLayEl || (this.offlineStatusLayEl = u('<div class="offlineStatus">                                                            <div class="stats ' + (Msohu.OfflineDownload.downloading ? Msohu.OfflineDownload.paused ? "paused" : "downloading" : "finished") + '"><!-- downloading paused finished -->                                                                <div class="s s1">                                                                    <a href="#" class="btn close"><i class="i i2"></i></a>                                                                    <div class="cnt">正在下载：<b class="js_offlineStatus">' + (Msohu.OfflineDownload.downloadingChannelName ? Msohu.OfflineDownload.downloadingChannelName + "..." : "") + '</b><em class="js_offlinePress">' + Msohu.OfflineDownload.getProgress() + '</em>％</div>                                                                </div>                                                                <div class="s s2">                                                                    <div class="cnt">已暂停下载...</div>                                                                </div>                                                                <div class="s s3">                                                                    <div class="cnt">已完成</div>                                                                </div>                                                            </div>                                                        </div>'), this.offlineStatusLayEl.insertBefore(this.getEl().find("div.siteNav")), this.mon(this.offlineStatusLayEl.find("a"), "click", function() {
                this.layOfflineDisplayFlag = !1, this.hideOfflineStatusLay(!0)
            }, this), this.mon(this.offlineStatusLayEl.find("div.cnt"), "click", function() {
                Msohu.OfflineDownload.downloading && (Msohu.OfflineDownload.paused ? Msohu.OfflineDownload.resume() : Msohu.OfflineDownload.pause())
            }, this)), this.offlineStatusLayEl.show())
        },
        hideOfflineStatusLay: function(e) {
            (e === !0 || Msohu.useFixed) && this.offlineStatusLayEl && this.offlineStatusLayEl.hide()
        },
        showTitle: function(e) {
            e && (this.getEl().find("div.tray").data("margin", 0), this.view.resetMargin()), this.hideTitle && (this.hideTitle = !1, this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.hide(), this.hideOfflineStatusLay(), l.lastPagelet.refreshScrollStatus(), this.fireEvent("showheader"))
        },
        onPrepare: function() {
            l.on("aftertransformview", function() {
                var e = a.get("msohu_guide1"),
                    t = a.get("msohu_guide2");
                e != "1" ? this.initGuide("1") : t != "1" && this.lastColumnIndex > 2 ? (this.showTitle(!0), this.initGuide("2")) : this.offlineDownloadTip()
            }, this, {
                single: !0
            }), this.showOfflineStatusLay(), Msohu.OfflineDownload.downloading && this.hideTitle && this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.show()
        },
        onLoad: function() {
            this.scroll.refresh()
        },
        onRelease: function(e) {
            this.guide1El && this.guide1El.remove(), this.guide2El && this.guide2El.remove(), e.duplicate || this.offlineDownloadingFlagEl && this.offlineDownloadingFlagEl.hide()
        },
        initGuide: function(e) {
            var t = this["guide" + e + "El"] = u('<div class="boxLay"><div class="lay guide"><div class="s s' + e + '"></div></div></div>');
            l.boxCt.append(t);
            var n = function() {
                    a.set("msohu_guide" + e, "1"), this.mun(t, "click", n, this), this.mun(t, "swipe", n, this), t.remove(), this.offlineDownloadTip()
                };
            this.mon(t, "click", n, this), this.mon(t, "swipe", n, this)
        },
        hideOfflineTip: function() {
            var e = this;
            e.offlineTip && e.offlineTip.animate({
                opacity: 0
            }, {
                duration: 200,
                easing: "ease",
                complete: function() {
                    e.offlineTip && (e.offlineTip.remove(), e.offlineTip = null)
                }
            })
        },
        onDestroy: function() {
            this.callParent(), this.scroll && this.scroll.destroy(), this.subNavBox && (this.hideSubNav(), this.subNavBox.remove(), this.subNavBox = this.subNavEl = null), this.citySubNavBox && (this.hideCityNav(), this.citySubNavBox.remove(), this.citySubNavBox = this.citySubNavEl = null), this.offlineTip && (this.offlineTip.remove(), this.offlineTip = null), this.offlineDownloadingFlagEl && (this.offlineDownloadingFlagEl.remove(), this.offlineDownloadingFlagEl = null), this.offlineStatusLayEl && (this.offlineStatusLayEl.remove(), this.offlineStatusLayEl = null), this.guide1El && this.guide1El.remove(), this.guide2El && this.guide2El.remove()
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.widget.Carousel,
        u = e.clazz.Class,
        a = e.lib.Zepto,
        f = e.util.Storage,
        l = e.app.WebApp;
    Msohu.ChannelView = u.define({
        extend: n,
        templates: [{
            id: "channelBodyTmpl",
            targetTmpl: "#channelBodyTmpl",
            autoRender: !0
        }, {
            id: "channelFocusTmpl",
            targetTmpl: "#channelFocusTmpl"
        }, {
            id: "channelFeedsTmpl",
            targetTmpl: "#channelFeedsTmpl"
        }],
        onRender: function() {
            this.templates.channelFocusTmpl.container = this.el.find("div.potPlayer"), this.templates.channelFeedsTmpl.container = this.el.find("div.feeds")
        }
    }), Msohu.ChannelController = u.define({
        extend: r,
        onInit: function() {
            var e = this;
            this.getStore("channelFocusStore").getStorageId = function() {
                return e.channelFocusId
            }, this.getStore("channelFeedsStore").getStorageId = function() {
                return this.baseParams.channel_id
            }
        },
        onFocusLoad: function() {
            var e = this.getStore("channelFocusStore");
            e.channelFocusId == this.channelFocusId ? (this.focusLoaded = !0, this.feedsLoaded && this.renderFocus()) : e.fetch({
                data: {
                    id: this.channelFocusId
                }
            })
        },
        renderFocus: function() {
            if (this.focusLoaded && !this.focusRendered) {
                this.focusRendered = !0;
                var e = this.getEl(),
                    t = this.getStore("channelFocusStore").get(),
                    n = /\/\w+\/(\d+)\//;
                a.each(t, function(e, t) {
                    var r = t.link_url,
                        i;
                    /^\/p\//i.test(r) ? (t.isGallery = !0, i = n.exec(r)) : /c\//i.test(r) ? t.link_url = "http://m.sohu.com" + (r.charAt(0) == "/" ? "" : "/") + r : i = n.exec(r), i && i[1] ? t.id = i[1] : (t.isOutside = !0, t.isGallery = !1)
                }), this.getTemplate("channelFocusTmpl").render(null, {
                    list: t
                }), this.focusCarousel = new o({
                    wrapper: e.find("div.potPlayer div.wrap"),
                    iscroll: this.getScroll(),
                    autoPlay: this.isCurrentView(),
                    fill: !1,
                    listeners: {
                        scope: this,
                        transform: this.onFocusTransform
                    }
                }), this.onRenderFocus()
            }
        },
        onRenderFocus: e.emptyFn,
        onFocusTransform: function(e, t, n) {
            if (this.getEl()) {
                var r = this.getEl().find(".potPlayer .stats");
                r.css("background-position", t * 10 + "px 0")
            }
        },
        onFeedsLoad: function() {
            this.feedsLoaded = !0, this.renderFocus();
            var t = [],
                n = this.getEl(),
                r = this.getChannelFeedsStore(),
                i = r.get();
            a.each(i, function(e, n) {
                var r = n.id.toString();
                n.when = Msohu.calcTimesUntilNow(n.create_time), n.isGallery = r.length == 6, n.video_count = 0, t.push(r)
            }), this.feedsId = t, this.loadComments(t);
            var s = r.currentPage;
            n.find("div.feeds")[s == 1 ? "html" : "append"](this.getTemplate("channelFeedsTmpl").applyTemplate({
                online: l.online,
                isFirst: s == 1,
                params: this.getParams(),
                data: i
            })), this.refreshScroll(), this.updateFeedsArray(t), l.online || this.disablePullDown(), !l.online && s == 1 && i.length == 0 ? (this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight()), this.disablePullUp()) : s >= r.maxPage || !l.online && s >= 3 ? this.disablePullUp() : s < r.maxPage && this.enablePullUp()
        },
        onFeedsLoadFailed: function() {
            var t = this.getChannelFeedsStore(),
                n = t.get(),
                r = t.currentPage,
                i = t.toPage;
            i == 1 && n.length == 0 && (this.disablePullDown(), this.disablePullUp(), this.getEl().find("div.feeds").html(this.getTemplate("channelFeedsTmpl").applyTemplate({
                online: l.online,
                isFirst: r == 1,
                params: this.getParams(),
                data: n,
                content: l.online ? "新闻列表加载失败" : ""
            })), this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight()))
        },
        getChannelFeedsStore: function() {
            return this.getStore("channelFeedsStore")
        },
        getChannelLatestFeedsStore: function() {
            return this.getStore("channelLatestFeedsStore")
        },
        onLatestFeedsLoad: function() {
            var e = [],
                t = [],
                n = this.getEl(),
                r = this.feedsArray || [],
                i = this.getChannelLatestFeedsStore().get();
            a.each(i, function(n, i) {
                var s = i.id.toString();
                a.inArray(s, r) == -1 && (i.when = Msohu.calcTimesUntilNow(i.create_time), i.isGallery = s.length == 6, i.video_count = 0, t.push(i), e.push(s))
            }), t.length > 0 && (n.find("div.feeds").prepend(this.getTemplate("channelFeedsTmpl").applyTemplate({
                online: l.online,
                data: t
            })), this.feedsId = e, this.loadComments(e), this.updateFeedsArray(e, !0))
        },
        beforeViewIn: function(e) {
            var t = this.getChannelFeedsStore(),
                n = this.getStore("channelFocusStore"),
                r = this.getChannelLatestFeedsStore();
            this.bindViewEvent(n, "load", this.onFocusLoad, this), this.bindViewEvent(t, "load", this.onFeedsLoad, this), this.bindViewEvent(t, "loadfailed", this.onFeedsLoadFailed, this), this.bindViewEvent(r, "load", this.onLatestFeedsLoad, this), this.bindViewEvent(this.getModel("commentCountModel"), "load", this.onCommentModelLoad, this);
            var i = this.getParams(),
                s = this.getHeader().getController(),
                o = s.getColumnEl(i.cid).index(),
                u = i.sid,
                a = Msohu.channels[o].list[u];
            Msohu.galleryBack = "channel", e.preload || (Msohu.currentChannel = i.cid, Msohu.currentChannelIndex = o, Msohu.currentSubChannelIndex = u, s.selectColumn(i.cid, u, !0)), t.baseParams = r.baseParams = {
                channel_id: a.list,
                roll: 1
            };
            if (!this.focusLoaded || !this.focusRendered) l.online && a.focus !== "" ? (n.channelFocusId = this.channelFocusId = a.focus, n.fetch({
                data: {
                    id: this.channelFocusId
                }
            })) : (this.focusRendered = !0, this.getTemplate("channelFocusTmpl").render(null, {
                list: []
            }));
            this.enablePullDown(), t.currentPage < t.maxPage && this.enablePullUp(), this.setLoadingChannelName(), this.focusCarousel && this.focusCarousel.reset()
        },
        onViewIn: function(e) {
            var t = this.getHeader().getController();
            if (e.preload) {
                var n = this.getParams();
                Msohu.currentChannel = n.cid;
                var r = t.getColumnEl(n.cid).index();
                Msohu.currentChannelIndex = r;
                var i = n.sid;
                Msohu.currentSubChannelIndex = i, t.selectColumn(n.cid, i, !0)
            }
            t.scroll.resizeLocked = !1
        },
        setLoadingChannelName: function() {
            var e = this.getParams(),
                t = this.getHeader().getController(),
                n = t.getColumnEl(e.cid).index(),
                r = e.sid,
                i = this.getLoadingEl(),
                s = i.find("div.channelName"),
                o = Msohu.channels[n];
            s.length == 0 && (s = a('<div class="channelName"></div>'), i.append(s)), s.html(r == 0 ? o.name : o.list[r].title)
        },
        afterViewIn: function() {
            Msohu.SwipeLock.unlock(), l.keepPagelet = null, this.focusCarousel && (l.touchBoxIgnore = this.focusCarousel.wrapper), this.getLoadingEl().find("div.channelName").remove(), this.setViewOutEffect(null), this.toggleFocusCarousel();
            var e = this.getParams(),
                t = this.getHeader().getController(),
                n = t.getColumnEl(e.cid).index(),
                r = t.getColumnEl(n - 1).data("column");
            this.setPreloadLeftView(r == "gallery" ? "gallery/list/0" : "channel/" + r + "/0");
            var i = t.getColumnEl(n + 1);
            if (i) {
                var s = i.data("column");
                s != e.cid && this.setPreloadRightView(s == "gallery" ? "gallery/list/0" : "channel/" + s + "/0")
            }
        },
        beforeViewOut: function() {
            this.focusCarousel && this.focusCarousel.stop()
        },
        onViewOut: function() {
            l.keepPagelet = this.getPagelet(), this.getHeader().getController().scroll.resizeLocked = !0
        },
        loadComments: function(e) {
            var t = e.join("|");
            this.getModel("commentCountModel").load({
                accepts: {
                    json: Msohu.ACCEPT_TYPE
                },
                data: {
                    ids: t
                }
            })
        },
        onCommentModelLoad: function() {
            var e = this.getEl(),
                t = this.getModel("commentCountModel");
            this.feedsId && a.each(this.feedsId, function(n, r) {
                var i = 0,
                    s = t.get(r);
                s && s.count && (i = s.count), e.find('a[data-id="' + r + '"]').find("div.comment").html(i + "评论")
            })
        },
        updateFeedsArray: function(e, t) {
            var n = this.feedsArray || [];
            n = t ? e.concat(n) : n.concat(e), Msohu.feedsArray = this.feedsArray = n
        },
        beforeScrollMove: function(e) {
            return this.lastBodyOffsetTop = this.getEl().offset().top, this.getHeader().getController().onViewBeforeScrollMove(this, e)
        },
        onOriginalScrollMove: function() {
            this.getHeader().getController().onViewScrollMove(this)
        },
        onScrollMove: function() {
            this.toggleFocusCarousel()
        },
        onScrollEnd: function() {
            this.toggleFocusCarousel()
        },
        toggleFocusCarousel: function() {
            if (this.focusCarousel && this.isCurrentView()) {
                var e = this.getScroll(),
                    t = e.y + e.options.topOffset;
                t < -170 ? this.focusCarousel.stop() : this.focusCarousel.start()
            }
        },
        onPullDown: function() {
            this.getChannelLatestFeedsStore().first()
        },
        onPullUp: function() {
            this.getChannelFeedsStore().next()
        },
        swipeChannelLeft: function() {
            var e = this.getHeader().getController(),
                t, n = Msohu.channels[8].list.length,
                r = Msohu.currentChannel,
                i = +Msohu.currentChannelIndex,
                s = Msohu.channels[i].list.length,
                o = +this.getParams().sid;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideLeft"), o += 1, o = o > s - 1 ? 0 : o, Msohu.channels[i].list[o].index ? (t = Msohu.channels[i].list[o].index, l.forward("newsgallery/" + r + "/" + t, {
                unloadSource: !0,
                scrollTop: !1
            }), Msohu.currentSubChannelIndex = o) : l.forward("channel/" + r + "/" + o, {
                unloadSource: !0,
                scrollTop: !1
            }), e.setSubChannel(o))
        },
        swipeChannelRight: function() {
            var e = this.getHeader().getController(),
                t, n = Msohu.channels[8].list.length,
                r = Msohu.currentChannel,
                i = +Msohu.currentChannelIndex,
                s = Msohu.channels[i].list.length,
                o = +this.getParams().sid;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideRight"), o -= 1, o = o < 0 ? s - 1 : o, Msohu.channels[i].list[o].index ? (t = Msohu.channels[i].list[o].index, l.forward("newsgallery/" + r + "/" + t, {
                unloadSource: !0,
                scrollTop: !1
            }), Msohu.currentSubChannelIndex = o) : l.forward("channel/" + r + "/" + o, {
                unloadSource: !0,
                scrollTop: !1
            }), e.setSubChannel(o))
        },
        onDestroy: function() {
            var e = this.getScroll();
            e && e.destroy(), this.focusCarousel && this.focusCarousel.destroy()
        }
    })
}(MX), function(e) {
    var t = e.clazz.Class,
        n = e.lib.Zepto,
        r = e.util.Storage,
        i = e.util.Date;
    WebApp = e.app.WebApp, Msohu.HeadlineChannelController = t.define({
        extend: Msohu.ChannelController,
        onInit: function() {
            this.callParent(), this.getStore("headlineFragmentStore").maxPage = 2;
            var e = r.get("msohu_releaselog_updated");
            if (!e) this.loadReleaseLog();
            else {
                var t = new Date,
                    n = new Date;
                n.setTime(e), (t.getFullYear() != n.getFullYear() || t.getMonth() != n.getMonth() || t.getDate() != n.getDate()) && this.loadReleaseLog()
            }
        },
        beforeViewIn: function(e) {
            this.getParams = function() {
                return {
                    cid: "headline",
                    sid: "0"
                }
            }, this.callParent([e])
        },
        afterViewIn: function(t) {
            this.callParent([t]), this.setPreloadLeftView("weather"), this.setPreloadRightView("channel/news/0"), this.focusCarousel && e.defer(function() {
                this.focusCarousel.itemWidth = null
            }, 400, this)
        },
        onViewLoading: function() {
            this.getStore("headlineFragmentStore").load({
                data: {
                    page: 1,
                    tops: "15084,1137",
                    ids: "1140,24885,1144,24820,1142,1197,1150,26242,1146,26299,1152,26310,12618,1148,20810,1154",
                    order: "time"
                }
            }), this.enablePullUp()
        },
        onPreloading: function() {
            this.getStore("headlineFragmentStore").load({
                data: {
                    page: 1,
                    tops: "15084,1137",
                    ids: "1140,24885,1144,24820,1142,1197,1150,26242,1146,26299,1152,26310,12618,1148,20810,1154",
                    order: "time"
                }
            }), this.enablePullUp()
        },
        onRenderFocus: function() {
            var e = r.get("msohu_releaselog");
            e ? this.renderReleaseLog() : this.loadReleaseLog()
        },
        onFeedsLoad: function() {
            this.feedsLoaded = !0, this.renderFocus();
            var t = [],
                n = this.getEl(),
                r = this.getChannelFeedsStore(),
                s = r.get(),
                o = Date.now();
            for (var u = 0; u < s.length; u++) {
                var a = s[u],
                    f = i.parse(a.create_time, "Y-m-d H:i:s");
                if (f.getTime() < o - 1728e5) s.splice(u, 1), u--;
                else {
                    var l = a.id.toString();
                    a.when = Msohu.calcTimesUntilNow(a.create_time), a.isGallery = l.length == 6, a.video_count = 0, a.isHiddenImg = u > 3, t.push(l)
                }
            }
            this.feedsId = t;
            var c = r.currentPage;
            n.find("div.feeds")[c == 1 ? "html" : "append"](this.getTemplate("channelFeedsTmpl").applyTemplate({
                online: WebApp.online,
                isFirst: c == 1,
                params: this.getParams(),
                data: s,
                isHeadline: !0
            })), this.refreshScroll(), this.updateFeedsArray(t), WebApp.online || this.disablePullDown(), !WebApp.online && c == 1 && s.length == 0 ? (this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight()), this.disablePullUp()) : (c >= r.maxPage || !WebApp.online && c >= 3) && this.disablePullUp(), this.loadComments(t), this.isPreload() ? this.preloadComplete() : WebApp.next()
        },
        onLatestFeedsLoad: function() {
            var e = [],
                t = [],
                r = this.getEl(),
                s = this.feedsArray || [],
                o = this.getChannelLatestFeedsStore().get(),
                u = Date.now();
            for (var a = 0; a < o.length; a++) {
                var f = o[a],
                    l = i.parse(f.create_time, "Y-m-d H:i:s"),
                    c = f.id.toString();
                n.inArray(c, s) == -1 && l.getTime() > u - 1728e5 && (f.when = Msohu.calcTimesUntilNow(f.create_time), f.isGallery = c.length == 6, f.video_count = 0, t.push(f), e.push(c))
            }
            t.length > 0 && (r.find("div.feeds").prepend(this.getTemplate("channelFeedsTmpl").applyTemplate({
                online: WebApp.online,
                data: t
            })), this.feedsId = e, this.loadComments(e), this.updateFeedsArray(e, !0))
        },
        onFeedsLoadFailed: function() {
            this.callParent(), WebApp.next()
        },
        getChannelFeedsStore: function() {
            return this.getStore("headlineFragmentStore")
        },
        getChannelLatestFeedsStore: function() {
            return this.getStore("lastHeadlineFragmentStore")
        },
        onPullDown: function() {
            this.getStore("lastHeadlineFragmentStore").load({
                data: {
                    tops: "15084,1137",
                    ids: "1140,24885,1144,24820,1142,1197,1150,26242,1146,26299,1152,26310,12618,1148,20810,1154",
                    order: "time"
                }
            })
        },
        onPullUp: function() {
            this.getStore("headlineFragmentStore").get().length == 0 ? this.getStore("headlineFragmentStore").load({
                data: {
                    page: 1,
                    tops: "15084,1137",
                    ids: "1140,24885,1144,24820,1142,1197,1150,26242,1146,26299,1152,26310,12618,1148,20810,1154",
                    order: "time"
                }
            }) : this.getStore("headlineFragmentStore").load({
                data: {
                    page: 2,
                    ids: "1148,1839,1154,12618,12592,1142,1146,20810",
                    order: "time"
                }
            })
        },
        loadReleaseLog: function() {
            e.ajax({
                url: Msohu.WCMS_HOST + "fragment/content/",
                type: "GET",
                dataType: "json",
                data: {
                    id: "27506"
                },
                scope: this,
                success: function(e) {
                    r.set("msohu_releaselog_updated", (new Date).getTime()), r.set("msohu_releaselog", e.data), this.focusRendered && this.renderReleaseLog()
                },
                error: function() {}
            })
        },
        renderReleaseLog: function() {
            var t = r.get("msohu_releaselog");
            if (t && !this.releaseLogRendered) {
                this.releaseLogRendered = !0;
                var i = this.getEl().find("div.potPlayer");
                t = n(t), i.find("div.wrap").append(t), t.css("position", "absolute"), t[0].style.webkitTransform = "translateX(" + e.getWindowWidth() + "px)";
                var s = i.find("a.pot").length;
                i.find(".stats").css("width", s * 10 + "px")
            }
        },
        beforeScrollStart: function() {
            this.callParent(), this.getEl().find("div.feeds img[data-src]").not('img[data-loaded="true"]').each(function() {
                var e = n(this);
                e.attr("src", e.data("src")).data("loaded", !0)
            })
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.clazz.Class,
        u = e.lib.Zepto,
        a = e.app.WebApp;
    Msohu.ArticlesHeaderView = o.define({
        extend: i,
        templates: {
            id: "articlesHeaderTmpl",
            targetTmpl: "#articlesHeaderTmpl",
            autoRender: !0
        },
        onRender: function() {
            if (!a.useFixed) {
                var e = u('<div class="toCmt"><a href="#" class="btn" data-cc="000029_comment_btnnews"><i class="i iT iT6"></i><b></b></a></div>');
                e.insertAfter(this.getEl().find("div.share"))
            }
        }
    }), Msohu.ArticlesHeaderController = o.define({
        extend: r,
        events: {
            "click div.back > a": "backToChannel",
            "click div.bright > a": "toggleDayAndNight",
            "click div.size > a": "toggleFontSize",
            "click div.share > a": "toggleShareWin",
            "click div.toCmt > a": "goComments"
        },
        onInit: function() {
            var e = this.getEl(),
                t = Msohu.Config.get("reading_mode"),
                n = Msohu.Config.get("font_size"),
                r = e.find("div.bright > a"),
                i = e.find("div.size > a");
            r[(t === "night" ? "add" : "remove") + "Class"]("brightLow"), i[(n === "larger" ? "add" : "remove") + "Class"]("fontSizeLarge")
        },
        backToChannel: function() {
            var e = Msohu.currentChannel,
                t = Msohu.currentSubChannelIndex;
            e && t ? a.forward("channel/" + e + "/" + t, {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            }) : a.forward("channel/headline/0")
        },
        toggleDayAndNight: function(e) {
            var t = this.pagelet.ct;
            u(e.target).closest("a").toggleClass("brightLow"), t.toggleClass("brightLow");
            var n = t.hasClass("brightLow");
            Msohu.Config.set("reading_mode", n ? "night" : "daylight"), Msohu.cc({
                position: n ? "000029_textpage_moon" : "000029_textpage_sun"
            })
        },
        toggleFontSize: function(e) {
            var t = this.pagelet.ct;
            u(e.target).closest("a").toggleClass("fontSizeLarge"), t.toggleClass("fontSizeLarge");
            var n = t.hasClass("fontSizeLarge");
            Msohu.Config.set("font_size", n ? "larger" : "smaller"), this.getPageletController().refreshScroll(), Msohu.cc({
                position: n ? "000029_textpage_sizemax" : "000029_textpage_sizemin"
            })
        },
        toggleShareWin: function(e) {
            if (this.articleTitle) {
                var t = this.pagelet.ct;
                Msohu.shareWin.show({
                    newsId: this.getParams().aid,
                    fromPage: "news",
                    brightCls: t.hasClass("brightLow") ? "brightLow" : "",
                    title: this.articleTitle
                })
            }
        },
        goComments: function() {
            a.forward("comments/" + this.getParams().aid)
        },
        onLoad: function() {
            this.don(this.getFooter().getController(), "loadcomment", this.onLoadComment, this)
        },
        onLoadComment: function(e) {
            this.getEl().find("div.toCmt b").html(e)
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.util.Storage,
        u = e.clazz.Class,
        a = e.lib.Zepto,
        f = e.app.WebApp;
    Msohu.HotAndRecCache = function() {
        function r(r) {
            var i, s = o.get(e);
            s = s || t;
            for (i = 0; i < s.hot.length; i += 1) if (s.hot[i] && s.hot[i].id === r) return n(s.hot[i].list).slice(0, 8);
            return []
        }
        function i() {
            var r = o.get(e);
            return r = r || t, r.rec ? n(r.rec) : []
        }
        function s(n, r) {
            var i = o.get(e);
            i = i || t;
            var s = !1;
            for (var u = 0; u < i.hot.length; u++) if (i.hot[u].id == n) {
                s = !0, i.hot[u].list = r;
                break
            }
            s || i.hot.push({
                id: n,
                list: r
            }), o.set(e, i)
        }
        function u(n) {
            var r = o.get(e);
            r = r || t, r.rec = n, o.set(e, r)
        }
        var e = "msohu_hot_rec",
            t = {
                hot: [],
                rec: []
            },
            n = function(e) {
                var t = [],
                    n;
                return a.each(e, function(e, r) {
                    n = Math.floor(Math.random() * (e + 1)), t[e] = t[n], t[n] = r
                }), t
            };
        return {
            getHot: r,
            getRec: i,
            setHot: s,
            setRec: u
        }
    }(), Msohu.ArticlesView = u.define({
        extend: n,
        templates: [{
            id: "articlesBodyTmpl",
            targetTmpl: "#articlesBodyTmpl"
        }, {
            id: "recommendationTmpl",
            targetTmpl: "#recommendationTmpl"
        }, {
            id: "articleHotListTmpl",
            targetTmpl: "#articleHotListTmpl"
        }, {
            id: "articleRecListTmpl",
            targetTmpl: "#articleRecListTmpl"
        }, {
            id: "articlesFailedTmpl",
            targetTmpl: "#articlesFailedTmpl"
        }]
    }), Msohu.ArticlesController = u.define({
        extend: r,
        delegates: {
            "click div.finCnt": "onContentClick"
        },
        onInit: function() {
            var e = this,
                t = e.getModel("articlesModel");
            t.getStorageId = function() {
                return this.getId() + "-" + e.currentPageNo
            }, t.fetches = {}, t.hasStorage = function() {
                return this.fetches[e.currentPageNo]
            }
        },
        onSwipeDownBack: function() {
            this.getHeader().getController().backToChannel()
        },
        beforeViewIn: function(e) {
            var t = this.getModel("articlesModel");
            this.bindViewEvent(t, "load", this.onArticlesModelLoad, this), this.bindViewEvent(t, "loadfailed", this.onArticlesModelLoadFailed, this);
            var n = Msohu.channels[Msohu.currentChannelIndex || "2"].list[0].list;
            this.bindViewEvent(this.getStore("articlesHotStore"), "load", this.onArticlesHotStoreLoad, this), this.bindViewEvent(this.getStore("articlesRecStore"), "load", this.onArticlesRecStoreLoad, this);
            var r = Msohu.Config.get("reading_mode"),
                i = Msohu.Config.get("font_size"),
                s = this.getPageletCt();
            s[(r === "night" ? "add" : "remove") + "Class"]("brightLow"), s[(i === "larger" ? "add" : "remove") + "Class"]("fontSizeLarge"), e.preload || (this.getFooter().getController().newsId = this.getParams().aid)
        },
        onViewLoading: function() {
            var e = this.getModel("articlesModel"),
                t = this.getParams().aid;
            e.restful.read.url = Msohu.WCMS_HOST + "news/" + t + "/", e.set("id", t), this.loaded ? f.next() : (this.loaded = !0, this.currentPageNo = 1, e.load({
                data: {
                    page: this.currentPageNo,
                    page_size: 1800,
                    rest: "0"
                }
            }))
        },
        onPreloading: function() {
            var e = this.getModel("articlesModel"),
                t = this.getParams().aid;
            e.restful.read.url = Msohu.WCMS_HOST + "news/" + t + "/", e.set("id", t), this.loaded || (this.loaded = !0, this.currentPageNo = 1, e.load({
                data: {
                    page: this.currentPageNo,
                    page_size: 1800,
                    rest: "0"
                }
            }))
        },
        afterViewIn: function() {
            this.getFooter().getController().initComment({
                fromPage: "news",
                showCommentNum: !0,
                newsId: this.getParams().aid
            }), this.setViewOutEffect("shadeUpOut"), this.initPreloadView()
        },
        beforeViewOut: function() {
            this.mun(this.getEl().find("img"), "load", this.refreshScroll, this)
        },
        onPullUp: function() {
            var e = this.getModel("articlesModel");
            if (this.currentPageNo < this.totalPages) {
                this.currentPageNo += 1;
                var t = this.getParams().aid;
                e.set("id", t), e.load({
                    data: {
                        page: this.currentPageNo,
                        page_size: 1800,
                        rest: "0"
                    }
                })
            }
        },
        onArticlesModelLoad: function() {
            var e = this.getEl(),
                t = this.getModel("articlesModel"),
                n = t.get();
            this.totalPages = n.page_count, t.fetches[this.currentPageNo] = !0, this.getHeader().getController().articleTitle = n.title, this.currentPageNo == 1 ? (n.when = Msohu.calcTimesUntilNow(n.create_time), this.getEl().html(this.getTemplate("articlesBodyTmpl").applyTemplate(n))) : this.currentPageNo <= this.totalPages && this.getEl().find("div.cnt").append(n.content);
            var r = this.getEl().find("img");
            f.online ? (this.mon(r, "load", this.refreshScroll, this), this.currentPageNo == this.totalPages && this.disablePullUp()) : (r.parent().addClass("unload"), this.currentPageNo == this.totalPages && this.disablePullUp()), this.currentPageNo == 1 && (this.isPreload() ? this.preloadComplete() : f.next()), this.currentPageNo == this.totalPages && (f.online, this.disablePullUp()), this.refreshScroll()
        },
        initPreloadView: function() {
            var e = this.getModel("articlesModel"),
                t;
            if (f.online) t = e.get("prev");
            else {
                var n, r = this.getParams().aid,
                    i = Msohu.feedsArray;
                i && +i.length && (n = a.inArray(r, i), i && n !== -1 && n + 1 < i.length && (t = i[n + 1]))
            }
            t && this.setPreloadRightView("articles/" + t);
            var s;
            if (f.online) s = e.get("next");
            else {
                var n, r = this.getParams().aid,
                    i = Msohu.feedsArray;
                i && +i.length && (n = a.inArray(r, i), i && n !== -1 && n - 1 >= 0 && (s = i[n - 1]))
            }
            s && this.setPreloadLeftView("articles/" + s)
        },
        onArticlesModelLoadFailed: function() {
            this.currentPageNo == 1 && (this.loaded = !1, this.getEl().html(this.getTemplate("articlesFailedTmpl").applyTemplate({
                online: f.online
            })), this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight() - this.getFooter().getHeight()), this.disablePullUp(), f.next())
        },
        loadHotAndRec: function() {
            if (!this.loadHotAndRecStatus) {
                this.loadHotAndRecStatus = !0;
                var e = this.getEl(),
                    t = this.getParams().aid,
                    n = this.getScroll(),
                    r = Msohu.channels[Msohu.currentChannelIndex || "2"].list[0].list,
                    i = this.getStore("articlesHotStore"),
                    s = this.getStore("articlesRecStore"),
                    o, u, a, f, l, c;
                e.append(this.getTemplate("recommendationTmpl").applyTemplate()), o = e.find("div.feeds").eq(0), u = e.find("div.feeds").eq(1), a = Msohu.HotAndRecCache.getHot(r);
                if (a && a.length > 0) {
                    for (var h = 0; h < 6; h++) if (a[h].id == t) {
                        a[h] = a.pop();
                        break
                    }
                    a && this.getTemplate("articleHotListTmpl").render(o, {
                        data: a.slice(0, 6)
                    });
                    var p = o.find("img");
                    this.mon(p, "load", this.refreshScroll, this), Msohu.isLoadHotCache || (Msohu.isLoadHotCache = !0, i.baseParams = {
                        channel_id: r,
                        roll: 1
                    }, i.first())
                } else i.baseParams = {
                    channel_id: r,
                    roll: 1
                }, i.first();
                c = Msohu.HotAndRecCache.getRec();
                if (c && c.length > 0) {
                    f = c.slice(0, c.length % 2 === 0 ? 6 : c.length - 1);
                    for (var h = 0; h < f.length; h++) if (f[h].id == t) {
                        f[h] = c.pop();
                        break
                    }
                    f && this.getTemplate("articleRecListTmpl").render(u, {
                        data: f
                    });
                    var p = u.find("img");
                    this.mon(p, "load", this.refreshScroll, this), Msohu.isLoadRecCache || (Msohu.isLoadRecCache = !0, s.baseParams = {
                        id: 1603,
                        roll: 1
                    }, s.first())
                } else s.baseParams = {
                    id: 1603,
                    roll: 1
                }, s.first()
            }
        },
        onArticlesHotStoreLoad: function() {
            var e = Msohu.channels[Msohu.currentChannelIndex || "2"].list[0].list,
                t = this.getEl(),
                n = this.getScroll(),
                r = this.getStore("articlesHotStore").get(),
                i = function(e) {
                    var t = [],
                        n;
                    return a.each(e, function(e, r) {
                        n = Math.floor(Math.random() * (e + 1)), t[e] = t[n], t[n] = r
                    }), t
                },
                s = t.find("div.feeds").eq(0),
                o = this.getParams().aid,
                u, f;
            a.each(r, function(e, t) {
                t.isGallery = t.id.toString().length == 6, delete t.redirect_url, delete t.summary
            }), Msohu.HotAndRecCache.setHot(e, r);
            if (!Msohu.isLoadHotCache) {
                f = [];
                var l = r.length;
                l -= l % 2;
                for (u = 0; u < l && f.length < 6; u++) r[u].id != o && f.push(r[u]);
                this.getTemplate("articleHotListTmpl").render(s, {
                    data: f
                });
                var c = s.find("img");
                this.mon(c, "load", this.refreshScroll, this)
            }
        },
        onArticlesRecStoreLoad: function() {
            var e = this.getParams().aid,
                t = this.getStore("articlesRecStore").get(),
                n = this.getEl().find("div.feeds").eq(1),
                r, i;
            a.each(t, function(e, t) {
                t.isGallery = t.id.toString().length == 6, delete t.redirect_url, delete t.summary
            });
            if (!Msohu.isLoadRecCache) {
                i = [];
                var s = t.length;
                s -= s % 2;
                for (r = 0; r < s && i.length < 6; r++) t[r].id != e && i.push(t[r]);
                this.getTemplate("articleRecListTmpl").render(n, {
                    data: i
                });
                var o = n.find("img");
                this.mon(o, "load", this.refreshScroll, this), this.refreshScroll(), Msohu.HotAndRecCache.setRec(t)
            }
        },
        swipeArticleLeft: function() {
            var e;
            if (f.online) e = this.getModel("articlesModel").get("prev");
            else {
                var t, n = this.getParams().aid,
                    r = Msohu.feedsArray;
                r && +r.length && (t = a.inArray(n, r), r && t !== -1 && t + 1 < r.length && (e = r[t + 1]))
            }
            e ? Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), f.forward("articles/" + e, {
                unloadSource: !0,
                useViewOut: "slideLeft",
                scrollTop: !1
            })) : Msohu.Tip.show("没有了")
        },
        swipeArticleRight: function() {
            var e;
            if (f.online) e = this.getModel("articlesModel").get("next");
            else {
                var t, n = this.getParams().aid,
                    r = Msohu.feedsArray;
                r && +r.length && (t = a.inArray(n, r), r && t !== -1 && t - 1 >= 0 && (e = r[t - 1]))
            }
            e ? Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), f.forward("articles/" + e, {
                unloadSource: !0,
                useViewOut: "slideRight",
                scrollTop: !1
            })) : Msohu.Tip.show("没有了")
        },
        onContentClick: function(t) {
            var n = t.target;
            if (f.online && n.tagName.toLowerCase() === "img") {
                var r = e.getWindowWidth(),
                    i = parseInt(n.style.width, 10) == r;
                n.style.width = i ? "" : r + "px", i || Msohu.cc({
                    position: "000029_textpage_picslarge"
                }), this.refreshScroll();
                return
            }
            f.fullScreenMode ? f.closeFullScreen() : f.enterFullScreen()
        },
        onDestroy: function() {
            this.scroll && this.scroll.destroy()
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.clazz.Class,
        u = e.lib.Zepto,
        a = e.app.WebApp;
    Msohu.CommentsHeaderView = o.define({
        extend: i,
        cls: "txtFinHead",
        templates: {
            id: "commentsHeadTmpl",
            targetTmpl: "#commentsHeadTmpl",
            autoRender: !0
        }
    }), Msohu.CommentsHeaderController = o.define({
        extend: r,
        events: {
            "click div.back > a": "backToArticles"
        },
        backToArticles: function() {
            a.back("channel/headline/0", {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !a.useFixed
            })
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.util.Date,
        i = e.util.Storage,
        s = e.app.Controller,
        o = e.app.HeaderView,
        u = e.app.FooterView,
        a = e.clazz.Class,
        f = e.lib.Zepto,
        l = e.app.WebApp;
    Msohu.CommentsView = a.define({
        extend: n,
        templates: [{
            id: "commentsBodyTmpl",
            targetTmpl: "#commentsBodyTmpl",
            autoRender: !0
        }, {
            id: "commentsListTmpl",
            targetTmpl: "#commentsListTmpl"
        }, {
            id: "commentsListBlankTmpl",
            targetTmpl: "#commentsListBlankTmpl"
        }, {
            id: "commentFloorTmpl",
            targetTmpl: "#commentFloorTmpl"
        }, {
            id: "commentFootTmpl",
            targetTmpl: "#commentFootTmpl"
        }],
        onRender: function() {
            if (!l.useFixed) {
                this.commentPostEl = f('<div class="boxFlow cmtDash default2"></div>'), this.commentPostEl.html(this.getTemplate("commentFootTmpl").applyTemplate()), this.getEl().prepend(this.commentPostEl), this.usernameLabel = this.commentPostEl.find("div.cnt > label"), this.texta = this.commentPostEl.find("div.cnt > textarea"), this.cmtNum = this.commentPostEl.find("div.toCmt b");
                var t = i.get("msohu_last_comment");
                e.trim(t) && this.texta.val(t)
            }
        },
        onDestroy: function() {
            this.callParent(), this.commentPostEl && this.commentPostEl.remove()
        }
    }), Msohu.CommentsController = a.define({
        extend: s,
        delegates: {
            "click div.js_toggleOptions": "toggleOptions",
            "click div.opts > a.support": "support",
            "click div.opts > a.reply": "reply"
        },
        onInitEvents: function() {
            l.useFixed || this.delegateEvent({
                "focus div.cmtDash textarea": "onTextAreaFocus",
                "blur div.cmtDash textarea": "onTextAreaBlur",
                "keyup div.cmtDash textarea": "onTextAreaKeyUp",
                "input div.cmtDash textarea": "onTextAreaKeyUp",
                "click div.cmtDash div.send > a": "onSendCommentClick",
                "click div.cmtDash div.login > a": "onLoginClick"
            })
        },
        onSwipeDownBack: function() {
            this.getHeader().getController().backToArticles()
        },
        beforeViewIn: function() {
            this.refreshComment = !0, this.bindViewEvent(this.getStore("commentHotStore"), "load", this.onLoadHotComments), this.bindViewEvent(this.getStore("commentAllStore"), "load", this.onLoadAllComments);
            var e = this.getParams().id;
            this.getStore("commentHotStore").restful.read.url = Msohu.COMMENTS_HOST + "dynamic/cmt_wap_hot_" + e + ".json", this.getStore("commentAllStore").restful.read.url = Msohu.COMMENTS_HOST + "dynamic/cmt_wap_all_" + e + ".json", this.getStore("commentHotStore").load(), this.bindViewEvent(this.getFooter().getController(), "sendcommentsuccess", this.onSendComment, this), this.enablePullUp();
            if (!l.useFixed) {
                var t = this.getView();
                t.usernameLabel.html(""), t.cmtNum.html(""), t.commentPostEl.addClass("default2"), t.commentPostEl.find(".js_comments").data("cc", ""), t.commentPostEl.find(".js_submit").data("cc", "000029_comment_final_publish")
            }
            this.getFooter().getController().initComment({
                fromPage: "",
                showCommentNum: !1,
                newsId: this.getParams().id
            })
        },
        onLoadHotComments: function() {
            var e = this.getStore("commentHotStore").get(),
                t;
            if (e && e.length > 0) {
                var n = this.getEl().find("div.comments > div.hotCmts");
                n.length == 0 && (n = f('<div class="comments"><div class="h3">热门评论</div><div class="cmts hotCmts"></div></div>'), this.getView().commentPostEl ? n.insertAfter(this.getView().commentPostEl) : this.getEl().prepend(n)), e = this.processCommentFloor(e), t = this.getTemplate("commentsListTmpl").applyTemplate({
                    data: e
                }), this.getEl().find("div.comments > div.hotCmts").html(t).parent().show()
            } else this.getEl().find("div.comments > div.hotCmts").html("").parent().hide()
        },
        onLoadAllComments: function() {
            var t = this.getStore("commentAllStore"),
                n = t.get();
            n = this.processCommentFloor(n);
            var r;
            t.currentPage == 1 && n.length == 0 ? (r = this.getTemplate("commentsListBlankTmpl").applyTemplate(), this.getEl().find("div.comments > div.newCmts").html(r), this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight(!Msohu.useFixed) - (Msohu.useFixed ? this.getFooter().getHeight() : 43) - 71), this.disablePullUp()) : (r = this.getTemplate("commentsListTmpl").applyTemplate({
                data: n
            }), this.getEl().find("div.comments > div.newCmts")[this.refreshComment ? "html" : "append"](r), this.refreshComment = !1, (t.currentPage == 1 && n.length < t.pageSize || t.currentPage > 1 && n.length == 0 || t.currentPage >= t.maxPage) && this.disablePullUp())
        },
        processCommentFloor: function(e) {
            var t, n, r, i;
            for (r = 0; r < e.length; r++) {
                t = "", n = e[r].floors;
                if (n && n.length > 0) for (i = 0; i < n.length; i++) n[i].floorHtml = t, n[i].level = i + 1, t = this.getTemplate("commentFloorTmpl").applyTemplate(n[i]);
                e[r].floorHtml = t
            }
            return e
        },
        onPullUp: function() {
            this.getStore("commentAllStore").next()
        },
        toggleOptions: function(t) {
            var n = f(t.target).closest("div.js_toggleOptions").next();
            this.lastToggleEl && this.lastToggleEl[0] != n[0] && this.lastToggleEl.removeClass("open"), n.toggleClass("open"), this.lastToggleEl = n;
            var r = this;
            setTimeout(function() {
                r.refreshScroll();
                var t = r.getScroll(),
                    i = n.closest("div.cmt", r.getEl()),
                    s = i.parent(),
                    o = e.getWindowHeight(),
                    u;
                if (t) u = i.offset().top + i.height() + r.getFooter().getEl().height(), n.hasClass("open") && s.hasClass("newCmts") && s.children().length == i.index() + 1 ? u >= o && t.scrollToElement(n[0], 100) : u >= o && t.scrollTo(0, t.y - (u - o), 100);
                else {
                    var a = document.body.scrollTop + o;
                    u = i.offset().top + i.height(), n.hasClass("open") && s.hasClass("newCmts") && s.children().length == i.index() + 1 ? u >= a && (document.body.scrollTop = a) : u >= a && (document.body.scrollTop = u - o)
                }
            }, 200)
        },
        support: function(t) {
            var n = this;
            cmt = f(t.target).closest("div.cmt"), commentId = cmt.data("id");
            if (!cmt.data("ding")) {
                var r = parseInt(cmt.data("count") || 0) + 1,
                    i = n.getEl().find('div.comments div[data-id="' + commentId + '"]');
                i.data("ding", !0), i.find("a.support > b.back").html("已顶<em>" + r + "</em>"), i.find("a.support").addClass("act"), Msohu.Tip.show("操作成功"), e.ajax({
                    url: Msohu.COMMENTS_HOST + "post/simple_up/",
                    accepts: {
                        json: Msohu.ACCEPT_TYPE
                    },
                    type: "POST",
                    dataType: "json",
                    data: {
                        commentId: commentId,
                        topicId: n.getParams().id,
                        rt: "json"
                    },
                    success: function(e) {},
                    error: function() {}
                }), Msohu.cc({
                    position: "000029_comment_final_up"
                })
            }
        },
        reply: function(e) {
            var t = f(e.target).closest("div.cmt");
            l.useFixed ? this.getFooter().getController().reply({
                replyId: t.data("id"),
                author: t.data("author")
            }) : this.replyComment({
                replyId: t.data("id"),
                author: t.data("author")
            }), Msohu.cc({
                position: "000029_comment_final_reply"
            })
        },
        onSendComment: function(e, t) {
            t.commentId = t.msgId, t.author = Msohu.User.nickname, t.createTime = r.format(new Date, "m月d日 H:i:s");
            if (t.replyId) {
                var n = this.getEl().find('div.cmts > div.cmt[data-id="' + t.replyId + '"]');
                t.floors = [{
                    author: n.find("div.js_nickname a").html(),
                    content: n.find("div.js_content").html()
                }]
            }
            t = this.processCommentFloor([t]);
            var i = this.getTemplate("commentsListTmpl").applyTemplate({
                data: t
            });
            this.getEl().find("div.comments > div.newCmts").prepend(i), this.getEl().find("div.js_blank").remove(), this.refreshScroll()
        },
        onTextAreaFocus: function() {
            this.getView().commentPostEl.addClass("focus")
        },
        onTextAreaBlur: function() {
            this.getView().texta.val() || (this.getView().commentPostEl.removeClass("focus").removeClass("logon"), this.replyId = "", this.getView().usernameLabel.html(""), this.getView().commentPostEl.find(".js_submit").data("cc", "000029_comment_final_publish"))
        },
        onTextAreaKeyUp: function() {
            i.set("msohu_last_comment", this.getView().texta.val())
        },
        onSendCommentClick: function() {
            var t = this,
                n = this.getParams().id;
            if (!Msohu.User.isLogin) {
                var r = t.getView().commentPostEl.find("div.name > input");
                r.val(Msohu.User.passport), t.getView().commentPostEl.addClass("logon"), Msohu.Tip.show("请先登录");
                return
            }
            var i = e.trim(t.getView().texta.val());
            if (i == "" && n) {
                Msohu.Tip.show("评论不能为空");
                return
            }
            Msohu.Tip.show("评论发布中...");
            var s = {
                topicId: n,
                content: i,
                replyId: t.replyId || "",
                passport: Msohu.User.passport.toLowerCase(),
                author: Msohu.User.nickname
            };
            e.ajax({
                url: Msohu.COMMENTS_HOST + "post/mobilecomment/?_input_encode=UTF-8",
                accepts: {
                    json: Msohu.ACCEPT_TYPE
                },
                type: "POST",
                dataType: "json",
                data: s,
                success: function(e) {
                    t.processSuccess(e, s)
                },
                error: t.processFailed
            })
        },
        processSuccess: function(e, t) {
            e.status == 1 ? (i.set("msohu_last_comment", ""), this.getView().texta.val(""), this.onTextAreaBlur(), t.msgId = e.msg, this.getFooter().getController().fireEvent("sendcommentsuccess", this, t), Msohu.Tip.show("评论成功")) : this.processFailed()
        },
        processFailed: function(e) {
            Msohu.Tip.show("提交失败")
        },
        onLoginClick: function() {
            var e = this.getView().commentPostEl.find("div.auth"),
                t = e.children("div.name").children("input").val(),
                n = e.children("div.password").children("input").val();
            Msohu.User.login(t, n, this.onLogin, this)
        },
        onLogin: function() {
            this.getView().commentPostEl.removeClass("logon"), this.onSendCommentClick()
        },
        replyComment: function(e) {
            l.resetScroll(!0), this.replyId = e.replyId, this.getView().usernameLabel.html("回复" + e.author), this.onTextAreaFocus(), this.getView().commentPostEl.find(".js_submit").data("cc", "000029_comment_final_replypub")
        }
    })
}(MX), function(e) {
    var t = e.app.Model,
        n = e.app.View,
        r = e.app.Controller,
        i = e.app.HeaderView,
        s = e.app.FooterView,
        o = e.clazz.Class,
        u = e.lib.Zepto,
        a = e.app.WebApp,
        f = window.localStorage;
    Msohu.CommentsFooterView = o.define({
        extend: s,
        cls: "cmtDash",
        templates: {
            id: "commentFootTmpl",
            targetTmpl: "#commentFootTmpl",
            autoRender: !0
        },
        onRender: function() {
            this.usernameLabel = this.el.find("div.cnt > label"), this.texta = this.el.find("div.cnt > textarea"), this.cmtNum = this.el.find("div.toCmt b");
            var t = f.getItem("msohu_last_comment");
            e.trim(t) && this.texta.val(t)
        }
    }), Msohu.CommentsFooterController = o.define({
        extend: r,
        events: {
            "focus textarea": "focus",
            "blur textarea": "blur",
            "keyup textarea": "onKeyUp",
            "input textarea": "onKeyUp",
            "click div.send > a": "onSendClick",
            "click div.toCmt > a": "onCommentsClick",
            "click div.login > a": "login"
        },
        onInit: function() {
            Msohu.commentCountCache = Msohu.commentCountCache || []
        },
        onInitEvents: function() {
            this.addEvents("sendcommentsuccess", "loadcomment");
            var t = this.getModel("commentCountModel");
            t.getFetchParams = e.emptyFn, this.don(t, "load", this.onLoadCommentCount)
        },
        initComment: function(e) {
            u.extend(this, e || {});
            var t = this.getView();
            t.usernameLabel.html(""), t.cmtNum.html(""), this.replyId = "", this.showCommentNum ? (this.getEl().removeClass("default2"), this.loadCommentCount(), this.fromPage == "news" ? (this.getEl().find(".js_comments").data("cc", "000029_comment_btnnews"), this.getEl().find(".js_submit").data("cc", "000029_comment_btnnews_publish")) : this.fromPage == "gallery" && (this.getEl().find(".js_comments").data("cc", "000029_comment_btnpics"), this.getEl().find(".js_submit").data("cc", "000029_comment_btnpics_publish"))) : (this.getEl().addClass("default2"), this.getEl().find(".js_comments").data("cc", ""), this.getEl().find(".js_submit").data("cc", "000029_comment_final_publish"))
        },
        loadCommentCount: function() {
            for (var e = 0, t = Msohu.commentCountCache.length; e < t; e++) if (Msohu.commentCountCache[e].id == this.newsId) {
                this.processCommentCount(Msohu.commentCountCache[e].count);
                return
            }
            this.getModel("commentCountModel").load({
                accepts: {
                    json: Msohu.ACCEPT_TYPE
                },
                data: {
                    ids: this.newsId
                }
            })
        },
        onLoadCommentCount: function() {
            var e = this.getModel("commentCountModel").get(this.newsId);
            e = e ? e.count || 0 : 0;
            for (var t = 0, n = Msohu.commentCountCache.length; t < n; t++) if (Msohu.commentCountCache[t].id == this.newsId) {
                Msohu.commentCountCache.splice(t, 1);
                break
            }
            Msohu.commentCountCache.push({
                id: this.newsId,
                count: e
            }), Msohu.commentCountCache.length > 10 && Msohu.commentCountCache.pop(), this.processCommentCount(e)
        },
        processCommentCount: function(e) {
            this.getView().cmtNum.html(e), this.fireEvent("loadcomment", e ? e : 0)
        },
        onPrepare: function(e) {
            if (!e.preload) {
                this.processCommentCount(""), this.getEl().removeClass("focus").removeClass("logon");
                var t = this.getEl().find("div.auth");
                t.children("div.name").children("input").val(""), t.children("div.password").children("input").val("")
            }
        },
        focus: function() {
            this.getEl().addClass("focus")
        },
        blur: function() {
            this.getView().texta.val() || (this.getEl().removeClass("focus").removeClass("logon"), this.replyId = "", this.getView().usernameLabel.html(""), this.getEl().find(".js_submit").data("cc", "000029_comment_final_publish")), setTimeout(function() {
                a.resetBoxHeight()
            }, 0)
        },
        onKeyUp: function() {
            f.setItem("msohu_last_comment", this.getView().texta.val())
        },
        onCommentsClick: function() {
            a.forward("comments/" + this.newsId)
        },
        onSendClick: function() {
            var t = this;
            if (!Msohu.User.isLogin) {
                var n = t.getEl().find("div.name > input");
                n.val(Msohu.User.passport), t.getEl().addClass("logon"), Msohu.Tip.show("请先登录"), a.resetBoxHeight();
                return
            }
            var r = e.trim(t.getView().texta.val());
            if (r == "" && t.newsId) {
                Msohu.Tip.show("评论不能为空");
                return
            }
            a.resetBoxHeight(), Msohu.Tip.show("评论发布中...");
            var i = {
                topicId: t.newsId,
                content: r,
                replyId: t.replyId || "",
                passport: Msohu.User.passport.toLowerCase(),
                author: Msohu.User.nickname
            };
            e.ajax({
                url: Msohu.COMMENTS_HOST + "post/mobilecomment/?_input_encode=UTF-8",
                accepts: {
                    json: Msohu.ACCEPT_TYPE
                },
                type: "POST",
                dataType: "json",
                data: i,
                success: function(e) {
                    t.processSuccess(e, i)
                },
                error: t.processFailed
            })
        },
        processSuccess: function(e, t) {
            e.status == 1 ? (f.setItem("msohu_last_comment", ""), this.getView().texta.val(""), this.blur(), t.msgId = e.msg, this.fireEvent("sendcommentsuccess", this, t), Msohu.Tip.show("评论成功")) : this.processFailed(), a.resetBoxHeight()
        },
        processFailed: function(e) {
            Msohu.Tip.show("提交失败"), a.resetBoxHeight()
        },
        login: function() {
            var e = this.getEl().find("div.auth"),
                t = e.children("div.name").children("input").val(),
                n = e.children("div.password").children("input").val();
            Msohu.User.login(t, n, this.onLogin, this)
        },
        onLogin: function() {
            this.getEl().removeClass("logon"), this.onSendClick()
        },
        reply: function(e) {
            this.replyId = e.replyId, this.getView().usernameLabel.html("回复" + e.author), this.focus(), this.getEl().find(".js_submit").data("cc", "000029_comment_final_replypub")
        }
    })
}(MX), function(e) {
    var t = e.clazz.Class,
        n = e.lib.Zepto,
        r = e.util.Cookie,
        i = e.app.Model,
        s = e.app.View,
        o = e.app.Controller,
        u = e.app.WebApp;
    Msohu.SettingsView = t.define({
        extend: s,
        cls: "settings",
        templates: [{
            id: "settingsTmpl",
            targetTmpl: "#settingsTmpl"
        }, {
            id: "loginSettingTmpl",
            targetTmpl: "#loginSettingTmpl"
        }],
        onRender: function() {
            this.getTemplate("settingsTmpl").render(this.el, {
                user: Msohu.User
            })
        }
    }), Msohu.SettingsController = t.define({
        extend: o,
        delegates: {
            "click a.js_login": "login",
            "click a.js_logout": "logout",
            "click a.js_feedback": "goFeedback",
            "click a.js_channelSetting": "offlineChannelSetting"
        },
        beforeViewIn: function(e) {
            if (!e.preload) {
                var t = this.getHeader().getController();
                t.showTitle(!0), t.selectColumn("settings")
            }
        },
        onViewIn: function(e) {
            var t = this.getHeader().getController();
            e.preload && (t.showTitle(!0), t.selectColumn("settings")), t.scroll.resizeLocked = !1
        },
        onViewOut: function(e) {
            this.getHeader().getController().scroll.resizeLocked = !0
        },
        login: function() {
            var e = this.getEl().find("div.auth"),
                t = e.children("div.name").children("input").val(),
                n = e.children("div.password").children("input").val();
            Msohu.User.login(t, n, this.onLogin, this)
        },
        onLogin: function() {
            Msohu.Tip.show("登录成功"), this.renderLogIn()
        },
        logout: function() {
            Msohu.User.logout(this.renderLogIn, this)
        },
        renderLogIn: function() {
            this.getTemplate("loginSettingTmpl").render(this.getEl().find("div.js_loginSetting"), Msohu.User)
        },
        goFeedback: function() {
            u.forward("feedback")
        },
        offlineChannelSetting: function() {
            u.forward("offlineSetting")
        }
    })
}(MX), function(e) {
    var t = e.clazz.Class,
        n = e.util.Date,
        r = e.util.Storage,
        i = e.app.View,
        s = e.app.Controller,
        o = e.app.HeaderView,
        u = e.app.WebApp;
    Msohu.WeatherView = t.define({
        extend: i,
        cls: "weather",
        templates: [{
            id: "weatherTmpl",
            targetTmpl: "#weatherTmpl"
        }],
        renderWeather: function(t) {
            t = t || Msohu.cityWeather || [];
            if (!this.cityRendered && t.length > 0) {
                this.cityRendered = !0;
                var i = [],
                    s;
                e.each(t, function(e, t) {
                    t = Zepto.extend({}, t), s = n.parse(t.date, "Ymd"), t.weatherCode = this.getWeatherCode(t.weather), t.weekDay = n.format(s, "l"), t.tdate = n.format(s, "Y/m/d"), t.pm25 && (t.pm25 = t.pm25.toFixed(1)), i.push(t)
                }, this);
                var o = this.getTemplate("weatherTmpl").applyTemplate({
                    data: i,
                    defaultCity: r.get("msohu_user_defaultCity")
                });
                this.el.html(o)
            }
        },
        getWeatherCode: function(e) {
            var t, n = /晴/,
                r = /雨/,
                i = /雪/,
                s = /多云/,
                o = /阴/,
                u = /雷阵雨/,
                a = /雾/;
            return a.test(e) ? t = "04" : r.test(e) && i.test(e) && n.test(e) ? t = "11" : r.test(e) && i.test(e) ? t = "12" : i.test(e) && n.test(e) ? t = "09" : i.test(e) && (s.test(e) || o.test(e)) ? t = "10" : i.test(e) ? t = "08" : e == "阴" || e == "阴转多云" ? t = "02" : u.test(e) ? t = "06" : !r.test(e) && (s.test(e) || o.test(e) && n.test(e)) ? t = "03" : e == "晴" ? t = "01" : r.test(e) && n.test(e) ? t = "07" : t = "05", t
        }
    }), Msohu.WeatherController = t.define({
        extend: s,
        delegates: {
            "click div.prompt > a.btn": "showPrompt",
            "click div.opt > a.btn": "setDefaultCity"
        },
        beforeViewIn: function(e) {
            var t = this.getHeader().getController();
            e.preload || (t.showTitle(!0), t.selectColumn("weather")), Msohu.refreshDefaultCity && (Msohu.refreshDefaultCity = !1, Msohu.cityWeather = null, t.initWeather(), this.view.cityRendered = !1), this.bindViewEvent(t, "cityweather", function() {
                this.renderWeather()
            }, this.view), this.view.renderWeather(), u.touchMoveIgnore = this.getEl()
        },
        onViewIn: function(e) {
            var t = this.getHeader().getController();
            e.preload && (t.showTitle(!0), t.selectColumn("weather")), t.scroll && (t.scroll.resizeLocked = !1)
        },
        beforeViewOut: function() {
            this.getHeader().getController().hideCityNav()
        },
        onViewOut: function(e) {
            var t = this.getHeader().getController().scroll;
            t && (t.resizeLocked = !0)
        },
        onResetBoxHeight: function(e) {
            this.getEl().height(e)
        },
        showPrompt: function() {
            var e = this.getEl();
            e.hasClass("showPrompt") ? (e.removeClass("showPrompt"), e.find("div.prompt").css("margin-top", "0px"), e.hasClass("showPrompt") && Msohu.cc({
                position: "000029_weather_expand"
            })) : (e.addClass("showPrompt"), e.find("div.prompt").css("margin-top", "-" + e.find("div.prompt div.cnt").height() + "px"))
        },
        setDefaultCity: function() {
            var e = this.getEl().find("div.opt"),
                t = this.city || Msohu.cityWeather[0].city,
                n = e.hasClass("other");
            r.set("msohu_user_defaultCity", n ? t : ""), e.toggleClass("other"), Msohu.Tip.show(n ? "已设为默认城市" : "已取消默认城市"), Msohu.refreshDefaultCity = !n, n ? Msohu.cc({
                position: "000029_weather_setcity"
            }) : Msohu.cc({
                position: "000029_weather_cancelcity"
            })
        }
    }), Msohu.CityWeatherHeaderView = t.define({
        extend: o,
        cls: "txtFinHead",
        templates: {
            id: "cityWeatherHeaderTmpl",
            targetTmpl: "#cityWeatherHeaderTmpl",
            autoRender: !0
        }
    }), Msohu.CityWeatherHeaderController = t.define({
        extend: s,
        events: {
            "click div.back > a": "backToWeather"
        },
        backToWeather: function() {
            u.back("weather", {
                unloadSource: !0,
                useViewOut: !0
            })
        }
    }), Msohu.CityWeatherView = t.define({
        extend: Msohu.WeatherView,
        onRender: function() {
            this.el.addClass("others")
        }
    }), Msohu.CityWeatherController = t.define({
        extend: Msohu.WeatherController,
        onViewLoading: function() {
            this.loadCityWeather(this.getParams().id)
        },
        onPreloading: function() {
            this.loadCityWeather(this.getParams().id)
        },
        beforeViewIn: function() {
            u.touchMoveIgnore = this.getEl()
        },
        afterViewIn: function() {
            u.useFixed || e.defer(u.resetBodyHeight, 500, u)
        },
        beforeViewOut: function() {},
        loadCityWeather: function(t) {
            var n = this;
            e.ajax({
                url: Msohu.WCMS_HOST + "weather/",
                method: "GET",
                dataType: "json",
                data: {
                    city: decodeURIComponent(t)
                },
                success: function(e) {
                    n.onLoadCityWeather(e.data)
                },
                error: function() {}
            })
        },
        onLoadCityWeather: function(e) {
            this.lastCityWeather = e, e && e.length > 0 && (this.city = e[0].city, this.getView().renderWeather(e)), u.next()
        },
        setDefaultCity: function() {
            this.callParent(), this.getEl().find("div.local").hasClass("other") || r.set("msohu_last_cityWeather", this.lastCityWeather), Msohu.refreshDefaultCity = !0
        }
    })
}(MX), function(e) {
    var t = e.lib.Zepto,
        n = e.clazz.Class,
        r = e.util.Date,
        i = e.app.View,
        s = e.app.Controller,
        o = e.app.WebApp;
    Msohu.GalleryListView = n.define({
        extend: i,
        cls: "albums",
        templates: [{
            id: "galleryListTmpl",
            targetTmpl: "#galleryListTmpl"
        }]
    }), Msohu.GalleryListController = n.define({
        extend: s,
        onInitEvents: function() {
            var e = this.getStore("galleryListStore");
            this.don(e, "load", function() {
                var t = e.data.last();
                t && (e.baseParams.timestamp = r.parse(t.get("create_time"), "Y-m-d H:i:s").getTime())
            })
        },
        beforeViewIn: function(e) {
            var t = e.params.id,
                n = Msohu.channels[8].list[t].list,
                r = this.getStore("galleryListStore"),
                i = this.getStore("galleryLatestStore");
            r.baseParams = i.baseParams = {
                channel_id: n,
                roll: 1
            }, r.getStorageId = function() {
                return this.baseParams.channel_id
            };
            var s = Msohu.Config.get("reading_mode"),
                o = Msohu.Config.get("font_size"),
                u = this.getParams().id,
                a = Msohu.channels[8].list[u];
            r.baseParams.channel_id = i.baseParams.channel_id = a.list, this.bindViewEvent(r, "load", this.onLoadMore), this.bindViewEvent(r, "loadfailed", this.onLoadMoreFailed), this.bindViewEvent(i, "load", this.onLoadLatest), this.enablePullUp(), this.enablePullDown(), e.preload || this.selectHeaderColumn(), this.getMainEl().addClass("brightLow"), this.setLoadingChannelName()
        },
        selectHeaderColumn: function() {
            var e = this.getHeader().getController(),
                t = this.getParams().id;
            e.selectColumn("gallery", t, !0), Msohu.currentChannelIndex = e.getColumnEl("gallery").index(), Msohu.currentSubChannelIndex = t + 1
        },
        setLoadingChannelName: function() {
            var e = this.getLoadingEl(),
                n = e.find("div.channelName"),
                r = Msohu.channels[8],
                i = this.getParams().id;
            n.length == 0 && (n = t('<div class="channelName"></div>'), e.append(n)), n.html(i == 0 ? r.name : r.list[i].title)
        },
        onViewIn: function(e) {
            e.preload && this.selectHeaderColumn(), this.getHeader().getController().scroll.resizeLocked = !1
        },
        afterViewIn: function() {
            o.keepPagelet = null, Msohu.SwipeLock.unlock(), this.getLoadingEl().find("div.channelName").remove(), this.setViewOutEffect(null);
            var e = this.getHeader().getController(),
                t = e.getColumnEl("gallery").index(),
                n = e.getColumnEl(t - 1).data("column"),
                r = e.getColumnEl(t + 1).data("column");
            this.setPreloadLeftView("channel/" + n + "/0"), this.setPreloadRightView("channel/" + r + "/0")
        },
        beforeViewOut: function() {
            Msohu.galleryArray = [], this.getEl().find("a.album").each(function(e, t) {
                t.getAttribute("data-id") && Msohu.galleryArray.push(t.getAttribute("data-id"))
            }), Msohu.currentGalleryListIndex = this.getParams().id, Msohu.galleryBack = "gallery"
        },
        onViewOut: function() {
            o.keepPagelet = this.getPagelet(), this.getHeader().getController().scroll.resizeLocked = !0
        },
        onPullDown: function() {
            this.getStore("galleryLatestStore").first()
        },
        onPullUp: function() {
            this.getStore("galleryListStore").next()
        },
        onLoadLatest: function() {
            var t = this.getStore("galleryListStore").get(),
                n = this.getEl(),
                r = [];
            e.each(t, function(e, t) {
                n.find('a[data-id="' + t.id + '"]').length == 0 && r.push(t)
            }, this);
            var i = this.getTemplate("galleryListTmpl").applyTemplate({
                online: o.online,
                data: r
            });
            this.getEl().prepend(i)
        },
        onLoadMore: function() {
            var e = this.getStore("galleryListStore"),
                t = this.getTemplate("galleryListTmpl").applyTemplate({
                    online: o.online,
                    data: e.get()
                });
            this.getEl()[e.currentPage == 1 ? "html" : "append"](t), e.currentPage == e.maxPage && this.disablePullUp()
        },
        onLoadMoreFailed: function() {
            o.online || (this.getEl().html('<div class="feed js_blank">                                        <div class="noCnt">暂不提供图库离线阅读</div>                                    </div>'), this.getEl().find("div.js_blank").height(e.getWindowHeight() - this.getHeader().getHeight()), this.disablePullDown(), this.disablePullUp())
        },
        onSwipeLeft: function() {
            var e = this.getHeader().getController(),
                t = this.getParams().id,
                n = Msohu.channels[8].list.length;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideLeft"), t++, t = t > n - 1 ? 0 : t, o.forward("gallery/list/" + t, {
                unloadSource: !0,
                scrollTop: !1
            }), e.setSubChannel(t))
        },
        onSwipeRight: function() {
            var e = this.getHeader().getController(),
                t = this.getParams().id,
                n = Msohu.channels[8].list.length;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideRight"), t -= 1, t = t < 0 ? n - 1 : t, o.forward("gallery/list/" + t, {
                unloadSource: !0,
                scrollTop: !1
            }), e.setSubChannel(t))
        },
        beforeScrollMove: function(e) {
            return this.lastBodyOffsetTop = this.getEl().offset().top, this.getHeader().getController().onViewBeforeScrollMove(this, e)
        },
        onOriginalScrollMove: function() {
            this.getHeader().getController().onViewScrollMove(this)
        }
    })
}(MX), function(e) {
    var t = e.lib.Zepto,
        n = e.clazz.Class,
        r = Msohu.GalleryListView,
        i = Msohu.GalleryListController,
        s = e.app.WebApp;
    Msohu.NewsGalleryView = n.define({
        extend: r
    }), Msohu.NewsGalleryController = n.define({
        extend: i,
        selectHeaderColumn: function() {
            var e = this.getParams();
            if (!Msohu.currentChannel) {
                Msohu.currentChannel = "news", Msohu.currentChannelIndex = 3;
                for (var t = 0; t < Msohu.channels.length; t++) if (Msohu.channels[t].hash == e.cid) {
                    Msohu.currentChannel = e.cid, Msohu.currentChannelIndex = t;
                    break
                }
            }
            var n = this.getHeader().getController(),
                r = 0;
            channelIndex = Msohu.currentChannelIndex, channelList = Msohu.channels[channelIndex].list;
            for (var t = 0; t < channelList.length; t++) if (channelList[t].index == e.id) {
                r = t, Msohu.currentSubChannelIndex = t;
                break
            }
            n.selectColumn(Msohu.currentChannel, r)
        },
        beforeViewOut: function(e) {
            this.callParent([e]), Msohu.galleryBack = "newsgallery"
        },
        onSwipeLeft: function() {
            var e = this.getHeader().getController(),
                t = Msohu.currentChannel,
                n, r;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideLeft"), r = Msohu.currentSubChannelIndex, n = Msohu.channels[Msohu.currentChannelIndex].list.length, r += 1, r = r > n - 1 ? 0 : r, s.forward("channel/" + t + "/" + r, {
                unloadSource: !0,
                scrollTop: !1
            }), Msohu.currentSubChannelIndex = r, e.setSubChannel(r))
        },
        onSwipeRight: function() {
            var e = this.getHeader().getController(),
                t = Msohu.currentChannel,
                n, r;
            Msohu.SwipeLock.locked || (Msohu.SwipeLock.lock(), this.setViewOutEffect("slideRight"), r = Msohu.currentSubChannelIndex, n = Msohu.channels[Msohu.currentChannelIndex].list.length, r -= 1, r = r < 0 ? n - 1 : r, s.forward("channel/" + t + "/" + r, {
                unloadSource: !0,
                scrollTop: !1
            }), Msohu.currentSubChannelIndex = r, e.setSubChannel(r))
        }
    })
}(MX), function(e) {
    var t = e.lib.Zepto,
        n = e.clazz.Class,
        r = e.util.Format,
        i = e.widget.Slide,
        s = e.app.HeaderView,
        o = e.app.View,
        u = e.app.Controller,
        a = e.app.Animate,
        f = e.app.WebApp;
    Msohu.GalleryHeaderView = n.define({
        extend: s,
        cls: "photoFinHead",
        templates: [{
            id: "galleryHeaderTmpl",
            targetTmpl: "#galleryHeaderTmpl",
            autoRender: !0
        }, {
            id: "shareWindowTmpl",
            targetTmpl: "#shareWindowTmpl"
        }, {
            id: "galleryGroupNoteTmpl",
            targetTmpl: "#galleryGroupNoteTmpl"
        }]
    }), Msohu.GalleryHeaderController = n.define({
        extend: u,
        events: {
            "click div.back > a": "backToList",
            "click div.note > a": "showNote",
            "swipeUp div.note > a": "showNote",
            "swipeDown div.note > a": "showNote",
            "click div.comment > a": "showComment",
            "click div.share > a": "showShare"
        },
        onInit: function() {
            this.commentHidden = !0, this.noteHidden = !0
        },
        backToList: function() {
            var e = Msohu.currentChannel,
                t = Msohu.currentSubChannelIndex,
                n = Msohu.currentGalleryListIndex;
            Msohu.galleryBack == "gallery" ? f.forward("gallery/list/" + n, {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            }) : Msohu.galleryBack == "newsgallery" ? f.forward("newsgallery/" + e + "/" + n, {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            }) : Msohu.galleryBack == "channel" ? f.forward("channel/" + e + "/" + t, {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            }) : f.forward("gallery/list/0")
        },
        showNote: function(e) {
            var n = this.noteEl;
            n ? this.noteHidden ? (this.hideLastTool(), this.noteHidden = !1, this.setThumbNote(this.currentNum), this.lastTool = 1, !Msohu.useFixed || e === !0 ? n.css(Msohu.useFixed ? {
                "margin-bottom": "0px",
                visibility: "",
                display: ""
            } : {
                "margin-bottom": "",
                visibility: "",
                display: ""
            }) : (n[0].style.webkitTransitionProperty = "margin", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "200ms", a.transfromStyle(n, {
                "margin-bottom": "0px",
                visibility: "",
                display: ""
            }, t.proxy(function() {
                n[0].style.webkitTransitionProperty = "height", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "300ms"
            }, this), 200))) : (this.noteHidden = !0, delete this.lastTool, this.collapseNote(), !Msohu.useFixed || e === !0 ? n.css(this.useFixed || !this.float ? {
                "margin-bottom": "-" + n.height() + "px",
                visibility: "hidden",
                display: ""
            } : {
                "margin-bottom": "",
                visibility: "",
                display: "none"
            }) : (n[0].style.webkitTransitionProperty = "margin", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "200ms", a.transfromStyle(n, {
                "margin-bottom": "-" + n.height() + "px"
            }, t.proxy(function() {
                n[0].style.webkitTransitionProperty = "height", n[0].style.webkitTransitionTimingFunction = "ease", n[0].style.webkitTransitionDuration = "300ms", n.css("visibility", "hidden")
            }, this), 200))) : this.initNote(this.showNote, e)
        },
        initNote: function(e, n) {
            var r = this;
            if (!r.noteEl) {
                var i, s;
                i = r.getTemplate("galleryGroupNoteTmpl").applyTemplate(), s = r.noteEl = t(document.createElement("div")), s.addClass("boxFlow boxFlow_above" + (Msohu.useFixed ? " boxFlow_silent" : "")), s[0].style.webkitTransitionProperty = "height", s[0].style.webkitTransitionTimingFunction = "ease", s[0].style.webkitTransitionDuration = "300ms", Msohu.useFixed ? s.css("visibility", "hidden") : s.css("display", "none"), s.html(i), this.getFooter().getView().getCt().append(s), Msohu.useFixed ? (s.css({
                    "margin-bottom": "-" + s.height() + "px"
                }), setTimeout(function() {
                    s.removeClass("boxFlow_silent"), setTimeout(function() {
                        e.call(r, n)
                    }, 0)
                }, 0)) : e.call(r, n), r.noteCntEl = s.find("div.cnt"), r.noteCntEl[0].style.webkitTransition = "none", r.mon(s, {
                    scope: r,
                    click: r.toggleNote
                })
            }
        },
        toggleNote: function() {
            this.noteExpanded ? this.collapseNote() : this.expandNote()
        },
        expandNote: function() {
            if (!this.noteExpanded && !this.noteHidden) {
                if (this.noteEl.find("div.cnt > div.wrap").html() == "") return;
                this.noteExpanded = !0, this.noteElHeight = this.noteEl.height();
                var e = this.getPagelet().getView().getCt().height() - this.getEl().height();
                this.noteEl.css("height", e + "px"), this.noteCntEl.css("height", e - this.noteEl.find("div.inf").height() - 30 + "px"), this.noteEl.children("a.photoNote").addClass("open"), f.touchMoveIgnore = this.noteCntEl, f.resetScroll(), Msohu.cc({
                    position: "000029_pics_layer"
                })
            }
        },
        collapseNote: function() {
            var e = this;
            if (e.noteExpanded && !e.noteHidden) {
                e.noteExpanded = !1;
                var t = e.noteElHeight;
                e.noteEl.css("height", t + "px");
                var n = e.noteEl.children("a.photoNote");
                setTimeout(function() {
                    n.removeClass("open"), e.noteCntEl.css("height", t - e.noteEl.find("div.inf").height() - 30 + "px")
                }, 300), f.touchMoveIgnore = null, f.resetScroll()
            }
        },
        resetNote: function() {
            if (this.noteExpanded) {
                var e = this.getCt().height() - this.getEl().height();
                this.noteEl.css("height", e + "px"), this.noteCntEl.css("height", e - this.noteEl.find("div.inf").height() - 30 + "px")
            }
        },
        showThumbs: function() {},
        showComment: function() {
            this.commentHidden ? (this.hideLastTool(), this.commentHidden = !1, this.lastTool = 3, this.getFooter().show()) : (this.commentHidden = !0, delete this.lastTool, this.getFooter().hide())
        },
        showShare: function() {
            this.data && Msohu.shareWin.toggle({
                newsId: this.getParams().id,
                fromPage: "gallery",
                brightCls: "brightLow",
                title: this.data.title,
                pic: this.data.images[0] ? "http://s7.rr.itc.cn/org/" + this.data.images[0].url : ""
            })
        },
        hideLastTool: function(t, n) {
            e.isDefined(this.lastTool) && (this.lastTool == 1 ? this.showNote(t) : this.lastTool == 2 ? this.showThumbs(t) : this.lastTool == 3 && n !== !0 && this.showComment(t))
        },
        initData: function(e, t) {
            this.data = e, this.currentNum = t || 1, this.setThumbNote(this.currentNum)
        },
        setThumbNote: function(e) {
            this.noteEl && (this.currentNum = e, this.data ? (this.noteEl.find("div.ttl").html(this.data.title), this.data.images && (this.noteEl.find("div.num").html(e + "/" + this.data.images.length), this.noteEl.find("div.cnt > div.wrap").html(this.data.images[e - 1].desc))) : (this.noteEl.find("div.ttl").html(""), this.noteEl.find("div.num").html("1/1"), this.noteEl.find("div.cnt > div.wrap").html("")))
        },
        onHide: function() {
            this.collapseNote()
        },
        onRelease: function(e) {
            e.duplicate || this.hideLastTool(!0, !0)
        },
        onDestroy: function() {
            this.callParent(), this.noteEl && this.noteEl.remove()
        }
    }), Msohu.GalleryGroupView = n.define({
        extend: o,
        cls: "photoZone",
        templates: [{
            id: "galleryGroupTmpl",
            targetTmpl: "#galleryGroupTmpl"
        }]
    }), Msohu.GalleryGroupController = n.define({
        extend: u,
        events: {
            click: "fullScreen",
            swipeUp: "expandNote"
        },
        onInitEvents: function() {
            this.mon(window, "orientationchange", e.createOrientationChangeProxy(this.orientationChangeHandler, this))
        },
        onSwipeDownBack: function() {
            this.getHeader().getController().backToList()
        },
        beforeViewIn: function() {
            var e = this.getModel("galleryGroupModel"),
                t = this.getParams().id;
            e.restful.read.url = Msohu.WCMS_HOST + "pic/" + t + "/", this.bindViewEvent(e, "load", this.onGalleryModelLoad, this), e.set("id", parseInt(t)), this.getMainEl().addClass("brightLow"), this.getFooter().hide(!0), this.getFooter().getController().initComment({
                fromPage: "gallery",
                showCommentNum: !0,
                newsId: parseInt("9" + r.leftPad(t, 9, "0"))
            })
        },
        afterViewIn: function() {
            var e = this.getHeader().getController();
            this.lastGalleryData && e.initData(this.lastGalleryData, this.currentNum), e.noteHidden && this.lastGalleryData && e.showNote(!0), this.disableTransformImage = !1
        },
        beforeViewOut: function() {
            this.disableTransformImage = !0;
            var e = this.getHeader().getController();
            this.currentNum = e.currentNum
        },
        onViewOut: function() {
            this.getMainEl().removeClass("brightLow")
        },
        onGalleryModelLoad: function() {
            var e = this.getModel("galleryGroupModel").get();
            this.getEl().html(this.getTemplate("galleryGroupTmpl").applyTemplate(t.extend({
                imgSize: this.getPicSize()
            }, e))), this.lastGalleryData = e, this.currentNum = 1, this.fill = e.images.length < 50, this.slide = new i({
                wrapper: this.getEl().find("div.wrap"),
                fill: this.fill,
                listeners: {
                    scope: this,
                    transformfirst: this.onTransformFirst,
                    transformlast: this.onTransformLast,
                    beforetransform: this.beforeTransformImage,
                    transform: this.onTransformImage
                }
            }), this.orientationChangeHandler()
        },
        getPicSize: function() {
            var t, n, r, i;
            return t = e.getWindowWidth(), n = window.devicePixelRatio, r = t * n, r <= 320 ? i = "p" : r <= 480 ? i = "q" : r <= 640 ? i = "r" : i = "s", i
        },
        onTransformFirst: function(e) {
            var n;
            if (f.online) n = this.getModel("galleryGroupModel").get("prev");
            else {
                var r = 0;
                Msohu.galleryArray && (r = t.inArray(thisId, Msohu.galleryArray), r -= 1, r > -1 && (n = Msohu.galleryArray[r]))
            }
            return n ? setTimeout(function() {
                f.forward("gallery/group/" + n, {
                    useViewOut: "slideRight"
                })
            }, 10) : Msohu.Tip.show("没有了"), !1
        },
        onTransformLast: function(e) {
            var n, r;
            if (f.online) r = this.getModel("galleryGroupModel").get("prev");
            else {
                var i = 0;
                Msohu.galleryArray && (i = t.inArray(thisId, Msohu.galleryArray), i != -1 && (i += 1, i < Msohu.galleryArray.length && (r = Msohu.galleryArray[i])))
            }
            return r ? setTimeout(function() {
                f.forward("gallery/group/" + r, {
                    useViewOut: "slideLeft"
                })
            }, 10) : Msohu.Tip.show("没有了"), !1
        },
        beforeTransformImage: function() {
            return !this.disableTransformImage
        },
        onTransformImage: function(e, n, r) {
            var i = this.getHeader().getController(),
                s = n,
                o = i.data.images,
                u = o.length - 1,
                a = this.getEl().find(".photo"),
                f;
            i.currentNum = s + 1, n > r ? s > 0 && s < u && this.loadImg(t(a[s + 2]).find("img")) : s < u && s > 0 && this.loadImg(t(a[s - 2]).find("img")), i.setThumbNote(s + 1)
        },
        loadImg: function(e) {
            e.data("loaded") || setTimeout(function() {
                e.data("loaded", !0).css("background-image", "url(" + e.data("link") + ")")
            }, 200)
        },
        orientationChangeHandler: function() {
            this.fill && this.getEl().width(e.getWindowWidth()), this.getHeader().getController().resetNote()
        },
        fullScreen: function(e) {
            var t = this.getHeader();
            this.fullScreenMode ? (this.fullScreenMode = !1, t.show(), t.getController().showNote()) : (this.fullScreenMode = !0, t.hide(), t.getController().hideLastTool())
        },
        expandNote: function() {
            this.getHeader().getController().expandNote()
        },
        onDestroy: function() {
            this.callParent(), this.slide && this.slide.destroy()
        }
    })
}(MX), function(e) {
    var t = e.clazz.Class,
        n = e.lib.Zepto,
        r = e.app.Model,
        i = e.app.View,
        s = e.app.Controller,
        o = e.app.HeaderView,
        u = e.app.WebApp;
    Msohu.FeedbackHeaderView = t.define({
        extend: o,
        templates: {
            id: "feedbackHeaderTmpl",
            targetTmpl: "#feedbackHeaderTmpl",
            autoRender: !0
        }
    }), Msohu.FeedbackHeaderController = t.define({
        extend: s,
        events: {
            "click a.js_back": "back",
            "click a.js_submit": "submit"
        },
        back: function() {
            u.back("settings", {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            })
        },
        submit: function() {
            this.getPagelet().getController().submit()
        }
    }), Msohu.FeedbackView = t.define({
        extend: i,
        templates: {
            id: "feedbackTmpl",
            targetTmpl: "#feedbackTmpl",
            autoRender: !0
        }
    }), Msohu.FeedbackController = t.define({
        extend: s,
        defaultValue: "欢迎你提出宝贵意见，您的意见和建议是我们不断前进的动力！",
        events: {
            "focus textarea": "onFocus",
            "blur textarea": "onBlur"
        },
        onSwipeDownBack: function() {
            this.getHeader().getController().back()
        },
        submit: function() {
            var t = this,
                r = e.trim(this.getEl().find("input").val()),
                i = e.trim(this.getEl().find("textarea").val()),
                s = !0;
            r != "" && !/\d{11}/i.test(r) && (s = !1, Msohu.Tip.show("手机号码错误")), s && (i == this.defaultValue || i == "") && (s = !1, Msohu.Tip.show("留言不能为空")), s && e.ajax({
                url: Msohu.MSOHU_HOST + "help/",
                type: "POST",
                dataType: "html",
                data: {
                    phone_number: r,
                    content: "手机搜狐概念版=|=" + i
                },
                success: n.proxy(t.processSuccess, t),
                error: function(e, t, n) {
                    Msohu.Tip.show("提交失败")
                }
            })
        },
        processSuccess: function() {
            Msohu.Tip.show("提交成功"), this.getEl().find("input").val(""), this.getEl().find("textarea").val(this.defaultValue), this.getHeader().getController().back()
        },
        onFocus: function() {
            this.getEl().find("div.cnt").addClass("focus");
            var t = this.getEl().find("textarea");
            e.trim(t.val()) == this.defaultValue && t.val("")
        },
        onBlur: function() {
            this.getEl().find("div.cnt").removeClass("focus");
            var t = this.getEl().find("textarea"),
                n = e.trim(t.val());
            t.val(n), n == "" && t.val(this.defaultValue)
        }
    })
}(MX), function(e) {
    var t = e.clazz.Class,
        n = e.clazz.Utility,
        r = e.lib.Zepto,
        i = e.util.Storage,
        s = e.app.Model,
        o = e.app.View,
        u = e.app.Controller,
        a = e.app.HeaderView,
        f = e.app.WebApp;
    Msohu.OfflineSettingHeaderView = t.define({
        extend: a,
        templates: {
            id: "offlineSettingHeaderTmpl",
            targetTmpl: "#offlineSettingHeaderTmpl",
            autoRender: !0
        }
    }), Msohu.OfflineSettingHeaderController = t.define({
        extend: u,
        events: {
            "click a.js_back": "back",
            "click a.js_submit": "submit"
        },
        back: function() {
            f.back("settings", {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            })
        },
        submit: function() {
            var t = [];
            e.each(this.getPagelet().getView().getEl().find("a"), function(e, n) {
                n = r(n), c = n.data("channel"), n.hasClass("on") && c && t.push(c)
            }), t = t.join(","), t ? (i.set("msohu_offline_channels", t), Msohu.offlineDownloadAfterSetting ? (Msohu.offlineDownloadAfterSetting = !1, Msohu.OfflineDownload.download(), this.back()) : (Msohu.Tip.show("保存成功"), this.back())) : Msohu.Tip.show("请选择下载频道")
        }
    }), Msohu.OfflineSettingView = t.define({
        extend: o,
        cls: "channelSets",
        templates: [{
            id: "offlineSettingTmpl",
            targetTmpl: "#offlineSettingTmpl"
        }],
        renderSetting: function() {
            var t = i.get("msohu_offline_channels"),
                n;
            t ? (n = {}, e.each(t.split(","), function(e, t) {
                n[t + "On"] = !0
            }, this)) : n = {
                headlineOn: !0,
                newsOn: !0,
                entOn: !0,
                sportOn: !0,
                womenOn: !0
            }, this.el.html(this.getTemplate("offlineSettingTmpl").applyTemplate(n))
        }
    }), Msohu.OfflineSettingController = t.define({
        extend: u,
        delegates: {
            "click a": "onChannelClick"
        },
        onSwipeDownBack: function() {
            this.getHeader().getController().back()
        },
        beforeViewIn: function() {
            this.view.renderSetting()
        },
        onChannelClick: function(e) {
            r(e.target).closest("a", this.getEl()).toggleClass("on")
        }
    }), Msohu.OfflineDownloadWorker = t.define({
        extend: n,
        init: function() {
            this.downloading = !1
        },
        initEvent: function() {
            this.addEvent("startdownload", "resumedownload", "pausedownload", "downloadchannel", "downloadarticle", "finishdownload", "downloadfailed", "nonedownload")
        },
        getChannelList: function(t) {
            var n;
            return e.each(Msohu.channels, function(e, r) {
                if (r.hash == t) return n = r, !1
            }, this), n
        },
        download: function() {
            if (this.downloading) return;
            var e = i.get("msohu_offline_channels");
            if (!f.useWebStorage) {
                this.handleDownloadFailed(1, "本地数据库不可用");
                return
            }
            if (!f.useWebStorage || !f.online || !e) {
                this.handleDownloadFailed(3, "网络离线");
                return
            }
            if (!f.useWebStorage || !f.online || !e) {
                this.handleDownloadFailed(5, "没有设置下载频道");
                return
            }
            this.channelArr = [], this.newsArr = {}, this.lastProgress = 0, this.count = 0;
            var t = i.get("msohu_offline_download_done");
            this.channelNames = {}, this.downloadingChannelName = "", e = e.split(",");
            var n, s, o, u, a;
            for (s = 0, o = e.length; s < o; s++) {
                n = e[s], u = "msohu_offline_" + n + "_lastUpdated", a = i.get(u);
                if (t == "1" && a && parseInt(a) > (new Date).getTime() - 72e5) continue;
                i.set(u, (new Date).getTime());
                var l = this.getChannelList(n);
                l && (n = r.extend({}, l.list[0]), n.channelHash = l.hash, this.channelNames[l.hash] = l.name, this.channelArr.push(n), this.downloadingChannelName || (this.downloadingChannelName = l.name))
            }
            n = this.channelArr.pop(), n ? (this.downloading = !0, i.set("msohu_offline_download_done", "0"), this.fireEvent("startdownload"), this.downloadChannel(n)) : this.fireEvent("nonedownload")
        },
        downloadChannel: function(e) {
            if (this.stopDownload.call(this, "downloadChannel", Array.prototype.slice.call(arguments, 0))) return;
            this.newsArr[e.channelHash] = [], this.downloadChannelPage(e, 1, e.channelHash == "headline" ? 1 : 3)
        },
        downloadChannelPage: function(t, n, r) {
            if (this.stopDownload.call(this, "downloadChannelPage", Array.prototype.slice.call(arguments, 0))) return;
            var i = this,
                s, o;
            t.channelHash == "headline" ? (s = Msohu.WCMS_HOST + "fragment/", o = {
                tops: "15084,1137",
                ids: "1140,24885,1144,24820,1142,1197,1150,26242,1146,26299,1152,26310,12618,1148,20810,1154",
                order: "time"
            }) : (s = Msohu.WCMS_HOST + "news/", o = {
                channel_id: t.list,
                page: n,
                page_size: 18,
                roll: "1"
            }), e.ajax({
                url: s,
                type: "GET",
                dataType: "json",
                data: o,
                success: function(s) {
                    s.data.length == 0 && i.handleDownloadFailed(6, "加载分页数据AJAX请求响应数据为空"), e.each(s.data, function(e, n) {
                        /\d{9}/i.test(n.id) && i.newsArr[t.channelHash].push(n.id)
                    }, i);
                    var o = (t.channelHash == "headline" ? "headlineFragmentStore-list" : "channelFeedsStore-" + t.list) + "-" + n;
                    f.db.transaction(function(e) {
                        e.executeSql("SELECT * FROM storepaging WHERE id = ?", [o], function(e, u) {
                            try {
                                var a = [],
                                    f = JSON.stringify(s.data);
                                u.rows.length > 0 ? (sql = "UPDATE storepaging SET value = ?, _last_updated = ? WHERE id = ?", a.push(f), a.push((new Date).getTime()), a.push(o)) : (sql = "INSERT INTO storepaging (id, value, _last_updated) VALUES (?, ?, ?)", a.push(o), a.push(f), a.push((new Date).getTime())), e.executeSql(sql, a, function() {});
                                if (n < r) i.downloadChannelPage(t, n + 1, r);
                                else if (i.channelArr.length > 0) i.downloadChannel(i.channelArr.pop());
                                else {
                                    for (var l in i.newsArr) i.newsChannelArr = i.newsChannelArr || [], i.newsChannelArr.push(l), i.count += i.newsArr[l].length;
                                    i.downloadChannelArticle()
                                }
                            } catch (c) {
                                i.handleDownloadFailed(6, "加载分页数据出错")
                            }
                        })
                    }, function(e) {
                        i.handleDownloadFailed(2, "处理分页数据SQL出错: Err_message: " + e.message)
                    })
                },
                error: function(e, t, n) {
                    i.handleDownloadFailed(t == "timeout" ? 4 : 6, "加载分页数据AJAX请求出错")
                }
            })
        },
        downloadChannelArticle: function() {
            if (this.stopDownload.call(this, "downloadChannelArticle", Array.prototype.slice.call(arguments, 0))) return;
            if (this.newsChannelArr.length == 0) {
                this.finishDownload();
                return
            }
            var e = this.newsChannelArr.pop(),
                t = this.channelNames[e];
            t ? (this.downloadingChannelName = t, this.fireEvent("downloadchannel", t), this.downloadArticle(this.newsArr[e])) : this.handleDownloadFailed(6, "加载频道新闻正文出错，频道名称为null")
        },
        downloadArticle: function(e) {
            if (this.stopDownload.call(this, "downloadArticle", Array.prototype.slice.call(arguments, 0))) return;
            if (e.length == 0) {
                this.downloadChannelArticle();
                return
            }
            var t = e.pop();
            this.fireEvent("downloadarticle"), this.downloadArticlePage(e, t, 1, 1)
        },
        downloadArticlePage: function(t, n, r, i) {
            if (this.stopDownload.call(this, "downloadArticlePage", Array.prototype.slice.call(arguments, 0))) return;
            var s = this,
                o = n + "-" + r;
            f.db.transaction(function(u) {
                u.executeSql("CREATE TABLE IF NOT EXISTS articles (" + ["id UNIQUE", "title", "content", "create_time", "media", "page_count", "next", "prev", "_last_updated TIMESTAMP"].join(", ") + ")", [], function(u, a) {
                    var l = ["title", "content", "create_time", "media", "page_count", "next", "prev"];
                    u.executeSql("SELECT * FROM systables WHERE table_name = ?", ["articles"], function(e, t) {
                        t.rows.length == 0 && e.executeSql("INSERT INTO systables VALUES (?)", ["articles"])
                    }), u.executeSql("SELECT column_name FROM syscolumns WHERE table_name = ?", ["articles"], function(e, t) {
                        t.rows.length == 0 && e.executeSql("INSERT INTO syscolumns VALUES (?, ?)", ["articles", l.join(",")])
                    }), u.executeSql("SELECT * FROM articles WHERE id = ?", [o], function(u, a) {
                        a.rows.length == 0 ? e.ajax({
                            url: Msohu.WCMS_HOST + "news/" + n + "/",
                            type: "GET",
                            dataType: "json",
                            data: {
                                id: n,
                                page: r,
                                page_size: 1800,
                                rest: "0"
                            },
                            success: function(u) {
                                i = u.data.page_count;
                                var a = [],
                                    c = [],
                                    h = [];
                                a.push("id"), c.push("?"), h.push(o), e.each(l, function(e, t) {
                                    a.push(t), c.push("?"), h.push(u.data[t])
                                }), a.push("_last_updated"), c.push("?"), h.push((new Date).getTime()), f.db.transaction(function(e) {
                                    e.executeSql("INSERT INTO articles (" + a.join(", ") + ") VALUES (" + c.join(", ") + ")", h, function(e, t) {})
                                }, function(t) {
                                    e.Console.error("offlinedownload.js:405 : Err_message: " + t.message)
                                }), r < i ? s.downloadArticlePage(t, n, r + 1, i) : s.downloadArticle(t)
                            },
                            error: function(e, t, n) {
                                s.handleDownloadFailed(t == "timeout" ? 4 : 6, "加载新闻正文AJAX请求出错")
                            }
                        }) : s.downloadArticle(t)
                    })
                })
            }, function(e) {
                s.handleDownloadFailed(2, "处理新闻正文SQL出错: Err_message: " + e.message)
            })
        },
        finishDownload: function() {
            clearTimeout(this.downloadTimeout), delete this.downloadTimeout, this.downloading = !1, this.paused = this.pausing = !1, this.lastAction = null, i.set("msohu_offline_download_done", "1"), this.fireEvent("finishdownload")
        },
        handleDownloadFailed: function(t, n) {
            clearTimeout(this.downloadTimeout), e.Console.error("离线下载失败: " + n || "unknow error");
            switch (t) {
            case 1:
                n = "本地数据库不可用";
                break;
            case 2:
                n = "本地数据库异常";
                break;
            case 3:
                n = "网络离线";
                break;
            case 4:
                n = "离线下载超时";
                break;
            case 5:
                n = "没有设置下载频道";
                break;
            case 6:
                n = "服务器异常，请稍后再试";
                break;
            default:
                n = "请查看网络连接/浏览器版本！"
            }
            delete this.downloadTimeout, this.downloading = !1, this.paused = this.pausing = !1, this.lastAction = null, i.set("msohu_offline_download_done", "0"), this.fireEvent("downloadfailed", t, n)
        },
        getProgress: function() {
            var e = 0;
            if (this.count && this.newsArr) {
                var t = 0;
                for (var n in this.newsArr) t += this.newsArr[n].length;
                e = 100 - Math.floor(t / this.count * 100), e = e < 0 ? 0 : e, this.lastProgress > e && (e = this.lastProgress)
            }
            return this.lastProgress = e, e
        },
        resume: function() {
            this.paused = !1, this.pausing && this.lastAction && this[this.lastAction[0]].apply(this, this.lastAction[1]), this.fireEvent("resumedownload")
        },
        pause: function() {
            clearTimeout(this.downloadTimeout), delete this.downloadTimeout, this.paused = !0, this.fireEvent("pausedownload")
        },
        stopDownload: function(t, n) {
            return clearTimeout(this.downloadTimeout), !this.paused && this.downloading && (this.downloadTimeout = e.defer(function() {
                this.handleDownloadFailed(4, "离线下载超时")
            }, 3e4, this)), this.downloading ? this.paused ? (this.pausing = !0, this.lastAction = [t, n], !0) : !1 : !0
        }
    }), Msohu.OfflineDownload = new Msohu.OfflineDownloadWorker
}(MX), function(e) {
    var t = e.lib.Zepto,
        n = e.clazz.Class,
        r = e.util.Storage,
        i = e.app.HeaderView,
        s = e.app.View,
        o = e.app.Controller,
        u = e.app.WebApp;
    Msohu.ReleaseLogHeaderView = n.define({
        extend: i,
        templates: {
            id: "releaseLogHeadTmpl",
            targetTmpl: "#releaseLogHeadTmpl",
            autoRender: !0
        }
    }), Msohu.ReleaseLogHeaderController = n.define({
        extend: o,
        events: {
            "click div.back > a": "back",
            "click div.toCmt > a": "toCmt"
        },
        back: function() {
            u.back("channel/headline/0", {
                unloadSource: !0,
                useViewOut: !0,
                scrollTop: !1
            })
        },
        toCmt: function() {
            u.forward("feedback")
        }
    }), Msohu.ReleaseLogView = n.define({
        extend: s,
        cls: "dayUpTimeline"
    }), Msohu.ReleaseLogController = n.define({
        extend: o,
        onSwipeDownBack: function() {
            this.getHeader().getController().back()
        },
        onViewLoading: function() {
            var e = r.get("msohu_releaselog_page_updated"),
                t = r.get("msohu_releaselog_page");
            if (!e) this.loadLog();
            else {
                var n = new Date,
                    i = new Date;
                i.setTime(e), !t || n.getFullYear() != i.getFullYear() || n.getMonth() != i.getMonth() || n.getDate() != i.getDate() ? this.loadLog() : (this.renderLog(t), u.next())
            }
        },
        loadLog: function() {
            e.ajax({
                url: Msohu.WCMS_HOST + "fragment/content/",
                type: "GET",
                dataType: "json",
                data: {
                    id: "27507"
                },
                scope: this,
                success: function(e) {
                    r.set("msohu_releaselog_page_updated", (new Date).getTime()), r.set("msohu_releaselog_page", e.data), this.renderLog(e.data), u.next()
                },
                error: function() {
                    u.next()
                }
            })
        },
        renderLog: function(e) {
            this.getEl().html(e)
        }
    })
}(MX);
var addToHome = function(e) {
        function S() {
            if (!r) return;
            var l = Date.now(),
                c;
            if (e.addToHomeConfig) for (c in e.addToHomeConfig) w[c] = e.addToHomeConfig[c];
            w.autostart || (w.hookOnLoad = !1), i = /ipad/gi.test(t.platform), s = e.devicePixelRatio && e.devicePixelRatio > 1, u = /^MQQBrowser/i.test(n), o = /Safari/i.test(t.appVersion) && !/CriOS/i.test(t.appVersion), a = t.standalone, f = t.appVersion.match(/OS (\d+_\d+)/i), f = f[1] ? +f[1].replace("_", ".") : 0, h = +e.localStorage.getItem("addToHome"), d = e.sessionStorage.getItem("addToHomeSession"), v = w.returningVisitor ? h && h + 24192e5 > l : !0, h || (h = l), p = v && h <= l, w.hookOnLoad ? e.addEventListener("load", x, !1) : !w.hookOnLoad && w.autostart && x()
        }
        function x() {
            e.removeEventListener("load", x, !1), v ? w.expire && p && e.localStorage.setItem("addToHome", Date.now() + w.expire * 6e4) : e.localStorage.setItem("addToHome", Date.now());
            if (!g && (!o || u || !p || d || a || !v)) return;
            var n = w.touchIcon ? document.querySelectorAll("head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]") : [],
                r, l = "",
                c, h = t.platform.split(" ")[0],
                y = t.language.replace("-", "_"),
                b, S;
            m = document.createElement("div"), m.id = "addToHomeScreen", m.style.cssText += "left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:" + (f < 5 ? "absolute" : "fixed"), w.message in E && (y = w.message, w.message = ""), w.message === "" && (w.message = y in E ? E[y] : E.en_us);
            if (n.length) {
                for (b = 0, S = n.length; b < S; b++) {
                    r = n[b].getAttribute("sizes");
                    if (r) {
                        if (s && r == "114x114") {
                            l = n[b].href;
                            break
                        }
                    } else l = n[b].href
                }
                l = '<span style="background-image:url(' + l + ')" class="addToHomeTouchIcon"></span>'
            }
            m.className = (i ? "addToHomeIpad" : "addToHomeIphone") + (l ? " addToHomeWide" : ""), m.innerHTML = l + w.message.replace("%device", h).replace("%icon", f >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') + (w.arrow ? '<span class="addToHomeArrow"></span>' : "") + '<span class="addToHomeClose">×</span>', document.body.appendChild(m), c = m.querySelector(".addToHomeClose"), c && c.addEventListener("click", k, !1), !i && f > 5 && window.addEventListener("orientationchange", M, !1), setTimeout(T, w.startDelay)
        }
        function T() {
            var t, n = 208;
            if (i) {
                f < 5 ? (c = e.scrollY, l = e.scrollX) : f < 6 && (n = 160), m.style.top = c + w.bottomOffset + "px", m.style.left = l + n - Math.round(m.offsetWidth / 2) + "px";
                switch (w.animationIn) {
                case "drop":
                    t = "0.6s", m.style.webkitTransform = "translate3d(0," + -(e.scrollY + w.bottomOffset + m.offsetHeight) + "px,0)";
                    break;
                case "bubble":
                    t = "0.6s", m.style.opacity = "0", m.style.webkitTransform = "translate3d(0," + (c + 50) + "px,0)";
                    break;
                default:
                    t = "1s", m.style.opacity = "0"
                }
            } else {
                c = e.innerHeight + e.scrollY, f < 5 ? (l = Math.round((e.innerWidth - m.offsetWidth) / 2) + e.scrollX, m.style.left = l + "px", m.style.top = c - m.offsetHeight - w.bottomOffset + "px") : (m.style.left = "50%", m.style.marginLeft = -Math.round(m.offsetWidth / 2) - (e.orientation % 180 && f > 5 ? 40 : 0) + "px", m.style.bottom = w.bottomOffset + "px");
                switch (w.animationIn) {
                case "drop":
                    t = "1s", m.style.webkitTransform = "translate3d(0," + -(c + w.bottomOffset) + "px,0)";
                    break;
                case "bubble":
                    t = "0.6s", m.style.webkitTransform = "translate3d(0," + (m.offsetHeight + w.bottomOffset + 50) + "px,0)";
                    break;
                default:
                    t = "1s", m.style.opacity = "0"
                }
            }
            m.offsetHeight, m.style.webkitTransitionDuration = t, m.style.opacity = "1", m.style.webkitTransform = "translate3d(0,0,0)", m.addEventListener("webkitTransitionEnd", L, !1), b = setTimeout(C, w.lifespan)
        }
        function N(e) {
            if (!r || m) return;
            g = e, x()
        }
        function C() {
            clearInterval(y), clearTimeout(b), b = null;
            var t = 0,
                n = 0,
                r = "1",
                s = "0",
                o = m.querySelector(".addToHomeClose");
            o && o.removeEventListener("click", C, !1), !i && f > 5 && window.removeEventListener("orientationchange", M, !1), f < 5 && (t = i ? e.scrollY - c : e.scrollY + e.innerHeight - c, n = i ? e.scrollX - l : e.scrollX + Math.round((e.innerWidth - m.offsetWidth) / 2) - l), m.style.webkitTransitionProperty = "-webkit-transform,opacity";
            switch (w.animationOut) {
            case "drop":
                i ? (s = "0.4s", r = "0", t += 50) : (s = "0.6s", t = t + m.offsetHeight + w.bottomOffset + 50);
                break;
            case "bubble":
                i ? (s = "0.8s", t = t - m.offsetHeight - w.bottomOffset - 50) : (s = "0.4s", r = "0", t -= 50);
                break;
            default:
                s = "0.8s", r = "0"
            }
            m.addEventListener("webkitTransitionEnd", L, !1), m.style.opacity = r, m.style.webkitTransitionDuration = s, m.style.webkitTransform = "translate3d(" + n + "px," + t + "px,0)"
        }
        function k() {
            e.sessionStorage.setItem("addToHomeSession", "1"), d = !0, C()
        }
        function L() {
            m.removeEventListener("webkitTransitionEnd", L, !1), m.style.webkitTransitionProperty = "-webkit-transform", m.style.webkitTransitionDuration = "0.2s";
            if (!b) {
                m.parentNode.removeChild(m), m = null;
                return
            }
            f < 5 && b && (y = setInterval(A, w.iterations))
        }
        function A() {
            var t = new WebKitCSSMatrix(e.getComputedStyle(m, null).webkitTransform),
                n = i ? e.scrollY - c : e.scrollY + e.innerHeight - c,
                r = i ? e.scrollX - l : e.scrollX + Math.round((e.innerWidth - m.offsetWidth) / 2) - l;
            if (n == t.m42 && r == t.m41) return;
            m.style.webkitTransform = "translate3d(" + r + "px," + n + "px,0)"
        }
        function O() {
            e.localStorage.removeItem("addToHome"), e.sessionStorage.removeItem("addToHomeSession")
        }
        function M() {
            m.style.marginLeft = -Math.round(m.offsetWidth / 2) - (e.orientation % 180 && f >= 6 ? 40 : 0) + "px"
        }
        var t = e.navigator,
            n = t.userAgent,
            r = "platform" in t && /iphone|ipod|ipad/gi.test(t.platform),
            i, s, o, u, a, f, l = 0,
            c = 0,
            h = 0,
            p, d, v, m, g, y, b, w = {
                autostart: !0,
                returningVisitor: !1,
                animationIn: "drop",
                animationOut: "fade",
                startDelay: 2e3,
                lifespan: 15e3,
                bottomOffset: 14,
                expire: 0,
                message: "",
                touchIcon: !1,
                arrow: !0,
                hookOnLoad: !0,
                iterations: 100
            },
            E = {
                ca_es: "Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d'inici</strong>.",
                cs_cz: "Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.",
                da_dk: "Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.",
                de_de: "Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.",
                el_gr: "Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.",
                en_us: "Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.",
                es_es: "Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.",
                fi_fi: "Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.",
                fr_fr: "Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l'écran d'accueil</strong>.",
                he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
                hr_hr: "Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.",
                hu_hu: "Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.",
                it_it: "Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.",
                ja_jp: "このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。",
                ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
                nb_no: "Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>",
                nl_nl: "Installeer deze webapp op uw %device: tik %icon en dan <strong>Zet in beginscherm</strong>.",
                pl_pl: "Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.",
                pt_br: "Instale este web app em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.",
                pt_pt: "Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.",
                ru_ru: "Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.",
                sv_se: "Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.",
                th_th: "ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>",
                tr_tr: "%device için bu uygulamayı kurduktan sonra %icon simgesine dokunarak <strong>Ana Ekrana Ekle</strong>yin.",
                zh_cn: "您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。",
                zh_tw: "您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。"
            };
        return S(), {
            show: N,
            close: C,
            reset: O
        }
    }(window);
(function(e) {
    function f() {
        u += parseInt(Math.random() * 10 + 1), u = u > 100 ? 100 : u, o.html(u + "%"), u < 100 && (a = setTimeout(f, 70))
    }
    var t = e.util.Cookie,
        n = e.util.Format,
        r = e.widget.Overlayer,
        i = window.localStorage,
        s = e.app.WebApp;
    e.util.Date.dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], Msohu.calcTimesUntilNow = function(t) {
        var n, r, i, s, o;
        return t = e.util.Date.parse(t, "Y-m-d H:i:s").getTime(), n = parseInt((Date.now() - t) / 1e3, 10), n > 0 && (r = parseInt(n / 60, 10), i = parseInt(r / 60, 10), s = parseInt(i / 24, 10), o = parseInt(s / 30, 10)), o >= 1 ? o + "月前" : s >= 1 ? s + "天前" : i >= 1 ? i + "小时前" : r >= 1 ? r + "分钟前" : n >= 1 ? n + "秒钟前" : "1秒钟前"
    }, Msohu.SwipeLock = {
        locked: !1,
        lock: function() {
            clearTimeout(Msohu.SwipeLock.lockTimeout), Msohu.SwipeLock.locked = !0, Msohu.SwipeLock.lockTimeout = e.defer(Msohu.SwipeLock.unlock, 1e3)
        },
        unlock: function() {
            clearTimeout(Msohu.SwipeLock.lockTimeout), Msohu.SwipeLock.locked = !1
        }
    }, Msohu.Tip = function() {
        var t;
        return {
            init: function() {
                t = new r({
                    tmpl: "#tipBoxTmpl",
                    cls: "miniPop",
                    mask: !1,
                    animate: Msohu.useFixed,
                    useFixed: Msohu.useFixed
                })
            },
            show: function(n) {
                clearTimeout(this.hideTimeout), t.render(), t.el.find("div.cnt").html(n), t.show(), this.hideTimeout = e.defer(this.hide, 1e3, this)
            },
            hide: function() {
                clearTimeout(this.hideTimeout), t.hide()
            }
        }
    }(), Msohu.MessageBox = function() {
        var e, t, n, i, s, o, u;
        return e = {
            init: function() {
                u = new r({
                    tmpl: "#messageBoxTmpl",
                    cls: "pop winPop",
                    mask: !0,
                    animate: Msohu.useFixed,
                    useFixed: Msohu.useFixed,
                    onRender: function() {
                        n = this.el.find("div.ttl"), i = this.el.find("div.des");
                        var t = this.el.find("div.opts > a");
                        s = t.find("b"), this.el.find("div.close > a").click(function(t) {
                            t.preventDefault(), e.hide()
                        }), t.click(function(t) {
                            t.preventDefault(), e.hide()
                        })
                    }
                })
            },
            show: function(e) {
                e = Zepto.extend({
                    title: "提示",
                    content: "",
                    submitText: "确定"
                }, e), u.render(), n.html(e.title), i.html(e.content), s.html(e.submitText), t = e, u.show(), e && e.onShow && e.onShow.call(e.scope || window)
            },
            hide: function() {
                u.hide(), t && t.onHide && t.onHide.call(t.scope || window)
            }
        }, e
    }(), Msohu.User = {
        isLogin: !! t.get("s_m_u"),
        nickname: t.get("nickname") || "",
        passport: i.getItem("last_passport") || "",
        login: function(t, n, r, i) {
            if (!s.online) {
                Msohu.Tip.show("网络不通,登录失败");
                return
            }!t && !n ? Msohu.Tip.show("请输入帐号/密码") : t ? n ? (Msohu.Tip.show("登录中..."), e.ajax({
                url: Msohu.UC_HOST + "api/login/",
                type: "GET",
                dataType: "json",
                data: {
                    passport: t,
                    password: n
                },
                success: function(e) {
                    Msohu.User.processLogin(e, t, r, i)
                },
                error: function() {
                    Msohu.User.processLoginFailed(4)
                }
            })) : Msohu.Tip.show("请输入密码") : Msohu.Tip.show("请输入帐号")
        },
        processLogin: function(e, n, r, s) {
            e.status == 0 ? (Zepto.extend(Msohu.User, {
                isLogin: !! t.get("s_m_u"),
                nickname: t.get("nickname") || "",
                passport: n
            }), i.setItem("last_passport", n), r.call(s || window)) : this.processLoginFailed(e.status)
        },
        processLoginFailed: function(e) {
            var t;
            e == 1 || e == 2 ? t = "帐号或密码错误" : t = "登录失败", Msohu.Tip.show(t)
        },
        logout: function(e, n) {
            t.clear("s_m_u", "/", "sohu.com"), t.clear("nickname", "/", "sohu.com"), Zepto.extend(Msohu.User, {
                isLogin: !1,
                nickname: "",
                passport: ""
            }), Msohu.Tip.show("退出成功"), e.call(n || window)
        }
    }, Msohu.silentTransformCss = function(e, t) {
        e = Zepto(e), e.addClass("silent"), Zepto.isFunction(t) ? t() : e.css(t), setTimeout(function() {
            e.removeClass("silent")
        }, 0)
    };
    var o = Zepto("#startingUpView div.num"),
        u = 0,
        a;
    f(), s.on("transformview", function() {
        clearTimeout(a), o.html("100%")
    }, this, {
        single: !0
    }), s.on("offlineunavailable", function() {
        Msohu.Tip.show("请连网使用服务")
    }, this);
    var l = function(e) {
            var t = Zepto(new Image);
            t.bind("load", function() {
                t.remove()
            }).bind("error", function() {
                t.remove()
            }), t.attr("src", e)
        },
        c = "http://zz.m.sohu.com";
    Msohu.pv = function(e) {
        if (!Msohu.postCC || !s.online) return;
        var r = c + "/h5_pv.gif",
            i = (new Date).getTime(),
            o = encodeURIComponent(window.location.href),
            u = t.get("_smuid"),
            a = Msohu.hasSmuid ? "2" : "1",
            f = "",
            h = "4";
        Msohu.hasSmuid = !0, r = n.urlAppend(r, {
            t: i,
            r: o,
            _smuid: u,
            _smuid_type: a,
            _trans_: f,
            c: e.c,
            v: h
        }), l(r)
    }, Msohu.cc = function(e) {
        if (!Msohu.postCC || !s.online) return;
        var r = c + "/h5_cc.gif",
            i = (new Date).getTime(),
            o = encodeURIComponent(window.location.href),
            u = t.get("_smuid"),
            a = Msohu.hasSmuid ? "2" : "1",
            f = "",
            h = "click",
            p = "4";
        Msohu.hasSmuid = !0, r = n.urlAppend(r, {
            t: i,
            r: o,
            _smuid: u,
            _smuid_type: a,
            _trans_: f,
            position: e.position,
            op: h,
            details: e.details,
            c: e.c,
            v: p
        }), l(r)
    };
    var h = function(e) {
            if (e == "北京") return "99001";
            if (e == "上海") return "99002";
            if (e == "广州") return "99003";
            if (e == "深圳") return "99004";
            if (e == "重庆") return "99005";
            if (e == "成都") return "99006";
            if (e == "天津") return "99007";
            if (e == "杭州") return "99008";
            if (e == "南京") return "99009";
            if (e == "钓鱼岛") return "99010"
        };
    s.on("aftertransformview", function(e, t) {
        var r = t.getPagelet().hash,
            i = t.getParams(),
            s = "";
        /channel\/\w+\/\d+/i.test(r) || /articles\/\d+/i.test(r) || /newsgallery\/\w+\/\d+/i.test(r) || /gallery\/list\/\d+/i.test(r) || /gallery\/group\/\d+/i.test(r) ? (s = Msohu.currentChannelIndex - 2, s == 0 ? s = n.leftPad(s, 2, "0") : s = n.leftPad(s, 2, "0") + n.leftPad(Msohu.currentSubChannelIndex, 3, "0")) : /^weather/i.test(r) && Msohu.cityWeather ? s = h(Msohu.cityWeather[0].city) : /^cityweather\//i.test(r) && (s = h(i.id)), Msohu.pv({
            c: s
        })
    }, this), Zepto("body").delegate("a[data-cc]", "click", function(e) {
        var t = Zepto(e.target).closest("a[data-cc]"),
            n = t.data("cc");
        n && Msohu.cc({
            position: n
        })
    });
    var p = window.applicationCache;
    p.addEventListener("updateready", function() {
        p.swapCache()
    }, !1)
})(MX);
var monitorImage = "http://zz.m.sohu.com/msohu_cv.gif/?";
MX.ready(function(e) {
    function a() {
        o.html(i), r.on("launch", function() {
            Msohu.Tip.init(), Msohu.MessageBox.init(), Msohu.shareWin = new Msohu.ShareWindow({
                tmpl: "#shareWindowTmpl",
                cls: "pop sharePop",
                baseUrl: r.baseUrl,
                animate: Msohu.useFixed,
                useFixed: Msohu.useFixed
            })
        }), r.on("beforetransformview", function() {
            Msohu.shareWin.hide()
        }), r.on("aftertransformview", function() {
            Msohu.cc({
                position: "000029_monitor_all_v4"
            }), t(document).one("touchmove", function() {
                Msohu.cc({
                    position: "000029_monitor_slid_v4"
                })
            })
        }, window, {
            single: !0
        }), r.launch(Msohu.config)
    }
    var t = e.lib.Zepto,
        n = e.util.Storage,
        r = e.app.WebApp,
        i = n.get("msohu_templates"),
        s = n.get("msohu_template_version"),
        o = t("#templates"),
        u = o.data("version");
    s != u || !i ? e.ajax({
        url: "msohu.tmpl",
        type: "GET",
        dataType: "text",
        success: function(e) {
            n.set("msohu_template_version", u), n.set("msohu_templates", e), i = e, a()
        },
        error: function() {}
    }) : a()
}), Zepto(window).one("load", function() {
    Msohu.cc({
        position: "000029_monitor_ready_v4"
    })
})