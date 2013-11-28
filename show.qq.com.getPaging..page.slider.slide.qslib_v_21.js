(window.QSTRING = function () {
    QSTRING.qzfl = function () {
        window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
        QZFL.version = "2.1.1.7";
        QZFL._qzfl = 2.116;
        QZFL.emptyFn = function () {
        };
        QZFL.returnFn = function (v) {
            return v
        };
        (function () {
            var ua = QZFL.userAgent = {}, agent = navigator.userAgent, nv = navigator.appVersion, r, m, optmz;
            ua.adjustBehaviors = QZFL.emptyFn;
            if (window.ActiveXObject || window.msIsStaticHTML) {
                ua.ie = 6;
                (window.XMLHttpRequest || agent.indexOf("MSIE 7.0") > -1) && (ua.ie = 7);
                (window.XDomainRequest || agent.indexOf("Trident/4.0") > -1) && (ua.ie = 8);
                agent.indexOf("Trident/5.0") > -1 && (ua.ie = 9);
                agent.indexOf("Trident/6.0") > -1 && (ua.ie = 10);
                agent.indexOf("Trident/7.0") > -1 && (ua.ie = 11);
                ua.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf("beta") > -1;
                if (ua.ie < 7)try {
                    document.execCommand("BackgroundImageCache", false, true)
                } catch (ign) {
                }
                QZFL._doc = document;
                optmz = function (st) {
                    return function (fns, tm) {
                        var aargs;
                        if ("function" == typeof fns) {
                            aargs = Array.prototype.slice.call(arguments, 2);
                            return st(function () {
                                fns.apply(null,
                                    aargs)
                            }, tm)
                        } else if ("string" == typeof fns)return st(fns, tm)
                    }
                };
                window.setTimeout = QZFL._setTimeout = optmz(QZFL.nativeSetTimeout = window.setTimeout);
                window.setInterval = QZFL._setInterval = optmz(QZFL.nativeSetInterval = window.setInterval)
            } else if (document.getBoxObjectFor || typeof window.mozInnerScreenX != "undefined") {
                r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
                ua.firefox = parseFloat((r.exec(agent) || r.exec("Firefox/3.3"))[1], 10)
            } else if (!navigator.taintEnabled) {
                m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);
                ua.webkit = m ? parseFloat(m[1], 10) : document.evaluate ? document.querySelector ? 525 : 420 : 419;
                if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome)ua.chrome = m ? parseFloat(m[1], 10) : "2.0"; else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler)ua.safari = m ? parseFloat(m[1], 10) : "3.3";
                ua.air = agent.indexOf("AdobeAIR") > -1 ? 1 : 0;
                ua.isiPod = agent.indexOf("iPod") > -1;
                ua.isiPad = agent.indexOf("iPad") > -1;
                ua.isiPhone = agent.indexOf("iPhone") > -1
            } else if (window.opera)ua.opera = parseFloat(window.opera.version(), 10);
            else ua.ie = 6;
            if (!(ua.macs = agent.indexOf("Mac OS X") > -1)) {
                ua.windows = (m = /Windows.+?(\d+\.\d+)/i.exec(agent), m && parseFloat(m[1], 10));
                ua.linux = agent.indexOf("Linux") > -1;
                ua.android = agent.indexOf("Android") > -1
            }
            ua.iOS = agent.indexOf("iPhone OS") > -1;
            !ua.iOS && (m = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(agent), ua.iOS = m && m[1] ? true : false)
        })();
        QZFL.object = {map: function (object, scope) {
            return QZFL.object.extend(scope || window, object)
        }, extend: function () {
            var args = arguments, len = arguments.length, deep = false, i = 1, target =
                args[0], opts, src, clone, copy;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2
            }
            if (typeof target !== "object" && typeof target !== "function")target = {};
            if (len === i) {
                target = QZFL;
                --i
            }
            for (; i < len; i++)if ((opts = arguments[i]) != null)for (var name in opts) {
                src = target[name];
                copy = opts[name];
                if (target === copy)continue;
                if (deep && copy && typeof copy === "object" && !copy.nodeType) {
                    if (src)clone = src; else if (QZFL.lang.isArray(copy))clone = []; else if (QZFL.object.getType(copy) === "object")clone = {}; else clone = copy;
                    target[name] =
                        QZFL.object.extend(deep, clone, copy)
                } else if (copy !== undefined)target[name] = copy
            }
            return target
        }, each: function (obj, callback) {
            var value, i = 0, length = obj.length, isObj = length === undefined || typeof obj == "function";
            if (isObj)for (var name in obj) {
                if (callback.call(obj[name], obj[name], name, obj) === false)break
            } else for (value = obj[0]; i < length && false !== callback.call(value, value, i, obj); value = obj[++i]);
            return obj
        }, getType: function (obj) {
            return obj === null ? "null" : obj === undefined ? "undefined" : Object.prototype.toString.call(obj).slice(8,
                -1).toLowerCase()
        }, routeRE: /([\d\w_]+)/g, route: function (obj, path) {
            obj = obj || {};
            path = String(path);
            var r = QZFL.object.routeRE, m;
            r.lastIndex = 0;
            while ((m = r.exec(path)) !== null) {
                obj = obj[m[0]];
                if (obj === undefined || obj === null)break
            }
            return obj
        }, bind: function (obj, fn) {
            var slice = Array.prototype.slice, args = slice.call(arguments, 2);
            return function () {
                obj = obj || this;
                fn = typeof fn == "string" ? obj[fn] : fn;
                fn = typeof fn == "function" ? fn : QZFL.emptyFn;
                return fn.apply(obj, args.concat(slice.call(arguments, 0)))
            }
        }, ease: function (src, tar, rule) {
            if (tar) {
                if (typeof rule != "function")rule = QZFL.object._eachFn;
                QZFL.object.each(src, function (v, k) {
                    if (typeof v == "function")tar[rule(k)] = v
                })
            }
        }, _easeFn: function (name) {
            return"$" + name
        }};
        QZFL.namespace = QZFL.object;
        QZFL.runTime = {isDebugMode: false, error: QZFL.emptyFn, warn: QZFL.emptyFn};
        QZFL.console = window.console || {};
        QZFL.console.log = QZFL.console.log || function () {
        };
        QZFL.console.print = QZFL.console.log;
        QZFL.widget = {};
        QZFL.object.map(QZFL.object, QZFL);
        QZFL.config = QZFL.config || {};
        typeof QZFL.config.debugLevel ==
            "undefined" && (QZFL.config.debugLevel = 0);
        typeof QZFL.config.defaultDataCharacterSet == "undefined" && (QZFL.config.defaultDataCharacterSet = "GB2312");
        typeof QZFL.config.DCCookieDomain == "undefined" && (QZFL.config.DCCookieDomain = "qzone.qq.com");
        typeof QZFL.config.domainPrefix == "undefined" && (QZFL.config.domainPrefix = "qq.com");
        typeof QZFL.config.domain == "undefined" && (QZFL.config.domain = "qzs.qq.com");
        typeof QZFL.config.resourceDomain == "undefined" && (QZFL.config.resourceDomain = "qzonestyle.gtimg.cn");
        QZFL.config.gbEncoderPath =
            "http://" + QZFL.config.domain + "/qzone/v5/toolpages/";
        QZFL.config.FSHelperPage = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/fp_gbk.html";
        QZFL.config.defaultShareObject = "http://" + QZFL.config.resourceDomain + "/qzone/v5/toolpages/getset.swf";
        QZFL.config.staticServer = "http://" + QZFL.config.resourceDomain + "/ac/qzone/qzfl/lc/";
        QZFL.css = {classFileNameCache: {}, convertHexColor: function (color) {
            color = String(color || "");
            color.charAt(0) == "#" && (color = color.substring(1));
            color.length == 3 && (color = color.replace(/([0-9a-f])/ig,
                "$1$1"));
            return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0]
        }, rgb2hsl: function (r, g, b) {
            var t, red = Math.max(r / 255, 0), green = Math.max(g / 255, 0), blue = Math.max(b / 255, 0), max = Math.max(red, green, blue), min = Math.min(red, green, blue), result = {h: 0, s: 0, l: Math.max((max + min) / 2, 0)};
            if (max != min) {
                if (max == red)result.h = (t = 60 * ((green - blue) / (max - min))) < 0 ? t + 360 : t; else if (max == green)result.h = 60 * ((blue - red) / (max - min)) + 120; else if (max == blue)result.h = 60 * ((red -
                    green) / (max - min)) + 240;
                if (result.l <= 0.5)result.s = (max - min) / (2 * result.l); else if (0.5 < result.l)result.s = (max - min) / (2 - 2 * result.l);
                result.h = Math.round(result.h);
                result.s = Math.round(result.s * 100) / 100;
                result.l = Math.round(result.l * 100) / 100
            }
            return result
        }, getStyleSheetById: function (id) {
            var s;
            return(s = QZFL.dom.get(id)) && s.sheet || (s = document.styleSheets) && s[id]
        }, getRulesBySheet: function (sheetId) {
            var ss = typeof sheetId == "object" ? sheetId : QZFL.css.getStyleSheetById(sheetId), rs = {}, head, base;
            if (ss && !(rs = ss.cssRules ||
                ss.rules))if (head = document.getElementsByTagName("head")[0])if (base = head.getElementsByTagName("base")[0]) {
                QZFL.dom.removeElement(base);
                rs = ss.cssRules;
                head.appendChild(base)
            }
            return rs
        }, getRuleBySelector: function (sheetId, selector) {
            selector = String(selector).toLowerCase();
            var _ss = QZFL.css.getStyleSheetById(sheetId), _rs = QZFL.css.getRulesBySheet(_ss);
            for (var i = 0, len = _rs.length; i < len; ++i)if (selector == _rs[i].selectorText.toLowerCase())return _rs[i];
            return null
        }, insertCSSLink: function (url, opts) {
            var sid, doc,
                t, cssLink, head;
            if (QZFL.css.classFileNameCache[url])return;
            if (typeof opts == "string")sid = opts;
            opts = typeof opts == "object" ? opts : {};
            sid = opts.linkID || sid;
            doc = opts.doc || document;
            head = doc.getElementsByTagName("head")[0];
            cssLink = (t = doc.getElementById(sid)) && t.nodeName == "LINK" ? t : null;
            if (!cssLink) {
                cssLink = doc.createElement("link");
                sid && (cssLink.id = sid);
                cssLink.rel = cssLink.rev = "stylesheet";
                cssLink.type = "text/css";
                cssLink.media = opts.media || "screen";
                head.appendChild(cssLink)
            }
            try {
                url && (cssLink.href = url)
            } catch (ign) {
            }
            QZFL.css.classFileNameCache[url] =
                true;
            return QZFL.userAgent.ie < 9 && cssLink.sheet || cssLink
        }, insertStyleSheet: function (sheetId, rules) {
            var node = document.createElement("style");
            node.type = "text/css";
            sheetId && (node.id = sheetId);
            document.getElementsByTagName("head")[0].appendChild(node);
            if (rules)if (node.styleSheet)node.styleSheet.cssText = rules; else node.appendChild(document.createTextNode(rules));
            return node.sheet || node
        }, removeStyleSheet: function (id) {
            var _ss = QZFL.css.getStyleSheetById(id);
            _ss && QZFL.dom.removeElement(_ss.owningElement || _ss.ownerNode)
        },
            _reClassToken: /\s+/, updateClassName: function (elem, removeNames, addNames) {
                if (!elem || elem.nodeType != 1)return"";
                var oriName = elem.className, _s = QZFL.css, ar, b;
                if (removeNames && typeof removeNames == "string" || addNames && typeof addNames == "string") {
                    if (removeNames == "*")oriName = ""; else {
                        ar = oriName.split(_s._reClassToken);
                        var i = 0, l = ar.length, n;
                        oriName = {};
                        for (; i < l; ++i)ar[i] && (oriName[ar[i]] = true);
                        if (addNames) {
                            ar = addNames.split(_s._reClassToken);
                            l = ar.length;
                            for (i = 0; i < l; ++i)(n = ar[i]) && !oriName[n] && (b = oriName[n] = true)
                        }
                        if (removeNames) {
                            ar =
                                removeNames.split(_s._reClassToken);
                            l = ar.length;
                            for (i = 0; i < l; i++)(n = ar[i]) && oriName[n] && (b = true) && delete oriName[n]
                        }
                    }
                    if (b) {
                        ar.length = 0;
                        for (var k in oriName)ar.push(k);
                        oriName = ar.join(" ");
                        elem.className = oriName
                    }
                }
                return oriName
            }, hasClassName: function (elem, name) {
                return elem && name ? elem.classList ? elem.classList.contains(name) : name && (" " + elem.className + " ").indexOf(" " + name + " ") > -1 : false
            }, addClassName: function (elem, names) {
                var _s = QZFL.css;
                return names && (elem && elem.classList && !_s._reClassToken.test(names) ?
                    elem.classList.add(names) : _s.updateClassName(elem, null, names))
            }, removeClassName: function (elem, names) {
                var _s = QZFL.css;
                return names && (elem && elem.classList && !_s._reClassToken.test(names) ? elem.classList.remove(names) : _s.updateClassName(elem, names))
            }, replaceClassName: function (elems, a, b) {
                QZFL.css.swapClassName(elems, a, b, true)
            }, swapClassName: function (elems, a, b, _isRep) {
                if (elems && typeof elems == "object") {
                    if (elems.length === undefined)elems = [elems];
                    for (var elem, i = 0, l = elems.length; i < l; ++i)if ((elem = elems[i]) && elem.nodeType ==
                        1)if (QZFL.css.hasClassName(elem, a))QZFL.css.updateClassName(elem, a, b); else if (!_isRep && QZFL.css.hasClassName(elem, b))QZFL.css.updateClassName(elem, b, a)
                }
            }, toggleClassName: function (elem, name) {
                if (!elem || elem.nodeType != 1)return;
                var _s = QZFL.css;
                if (elem.classList && name && !_s._reClassToken.test(name))return elem.classList.toggle(name);
                if (_s.hasClassName(elem, name))_s.updateClassName(elem, name); else _s.updateClassName(elem, null, name)
            }};
        QZFL.dom = {getById: function (id) {
            return document.getElementById(id)
        }, getByName: function (name, tagName, rt) {
            return QZFL.selector((tagName || "") + '[name="' + name + '"]', rt)
        }, get: function (e) {
            return typeof e == "string" ? document.getElementById(e) : e
        }, getNode: function (e) {
            return e && (e.nodeType || e.item) ? e : document.getElementById(e)
        }, removeElement: function (elem) {
            if (elem = QZFL.dom.get(elem)) {
                if (QZFL.userAgent.ie > 8 && elem.tagName == "SCRIPT")elem.src = "";
                elem.removeNode ? elem.removeNode(true) : elem.parentNode && elem.parentNode.removeChild(elem)
            }
            return elem = null
        }, searchChain: function (elem, prop, func) {
            prop = prop || "parentNode";
            while (elem && elem.nodeType && elem.nodeType == 1) {
                if (!func || func.call(elem, elem))return elem;
                elem = elem[prop]
            }
            return null
        }, searchElementByClassName: function (elem, className) {
            elem = QZFL.dom.get(elem);
            return QZFL.dom.searchChain(elem, "parentNode", function (el) {
                return QZFL.css.hasClassName(el, className)
            })
        }, getElementsByClassName: function (className, tagName, context) {
            return QZFL.selector((tagName || "") + "." + className, QZFL.dom.get(context))
        }, isAncestor: function (a, b) {
            return a && b && a != b && QZFL.dom.contains(a, b)
        }, getAncestorBy: function (elem, method) {
            elem = QZFL.dom.get(elem);
            return QZFL.dom.searchChain(elem.parentNode, "parentNode", function (el) {
                return el.nodeType == 1 && (!method || method(el))
            })
        }, getFirstChild: function (elem) {
            elem = QZFL.dom.get(elem);
            return elem.firstElementChild || QZFL.dom.searchChain(elem && elem.firstChild, "nextSibling", function (el) {
                return el.nodeType == 1
            })
        }, getLastChild: function (elem) {
            elem = QZFL.dom.get(elem);
            return elem.lastElementChild || QZFL.dom.searchChain(elem && elem.lastChild, "previousSibling", function (el) {
                return el.nodeType ==
                    1
            })
        }, getNextSibling: function (elem) {
            elem = QZFL.dom.get(elem);
            return elem.nextElementSibling || QZFL.dom.searchChain(elem && elem.nextSibling, "nextSibling", function (el) {
                return el.nodeType == 1
            })
        }, getPreviousSibling: function (elem) {
            elem = QZFL.dom.get(elem);
            return elem.previousElementSibling || QZFL.dom.searchChain(elem && elem.previousSibling, "previousSibling", function (el) {
                return el.nodeType == 1
            })
        }, swapNode: function (node1, node2) {
            if (node1.swapNode)node1.swapNode(node2); else {
                var prt = node2.parentNode, next = node2.nextSibling;
                if (next == node1)prt.insertBefore(node1, node2); else if (node2 == node1.nextSibling)prt.insertBefore(node2, node1); else {
                    node1.parentNode.replaceChild(node2, node1);
                    prt.insertBefore(node1, next)
                }
            }
        }, createElementIn: function (tagName, elem, insertFirst, attrs) {
            var _e = (elem = QZFL.dom.get(elem) || document.body).ownerDocument.createElement(tagName || "div"), k;
            if (typeof attrs == "object")for (k in attrs)if (k == "class")_e.className = attrs[k]; else if (k == "style")_e.style.cssText = attrs[k]; else _e[k] = attrs[k];
            insertFirst ? elem.insertBefore(_e,
                elem.firstChild) : elem.appendChild(_e);
            return _e
        }, getStyle: function (el, property) {
            el = QZFL.dom.get(el);
            if (!el || el.nodeType == 9)return null;
            var w3cMode = document.defaultView && document.defaultView.getComputedStyle, computed = !w3cMode ? null : document.defaultView.getComputedStyle(el, ""), value = "";
            switch (property) {
                case "float":
                    property = w3cMode ? "cssFloat" : "styleFloat";
                    break;
                case "opacity":
                    if (!w3cMode) {
                        var val = 100;
                        try {
                            val = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
                        } catch (e) {
                            try {
                                val = el.filters("alpha").opacity
                            } catch (e) {
                            }
                        }
                        return val /
                            100
                    } else return parseFloat((computed || el.style)[property]);
                    break;
                case "backgroundPositionX":
                    if (w3cMode) {
                        property = "backgroundPosition";
                        return(computed || el.style)[property].split(" ")[0]
                    }
                    break;
                case "backgroundPositionY":
                    if (w3cMode) {
                        property = "backgroundPosition";
                        return(computed || el.style)[property].split(" ")[1]
                    }
                    break
            }
            if (w3cMode)return(computed || el.style)[property]; else return el.currentStyle[property] || el.style[property]
        }, setStyle: function (el, properties, value) {
            if (!(el = QZFL.dom.get(el)) || el.nodeType !=
                1)return false;
            var tmp, bRtn = true, w3cMode = (tmp = document.defaultView) && tmp.getComputedStyle, rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;
            if (typeof properties == "string") {
                tmp = properties;
                properties = {};
                properties[tmp] = value
            }
            for (var prop in properties) {
                value = properties[prop];
                if (prop == "float")prop = w3cMode ? "cssFloat" : "styleFloat"; else if (prop == "opacity") {
                    if (!w3cMode) {
                        prop = "filter";
                        value = value >= 1 ? "" : "alpha(opacity=" + Math.round(value * 100) + ")"
                    }
                } else if (prop == "backgroundPositionX" || prop == "backgroundPositionY") {
                    tmp =
                        prop.slice(-1) == "X" ? "Y" : "X";
                    if (w3cMode) {
                        var v = QZFL.dom.getStyle(el, "backgroundPosition" + tmp);
                        prop = "backgroundPosition";
                        typeof value == "number" && (value = value + "px");
                        value = tmp == "Y" ? value + " " + (v || "top") : (v || "left") + " " + value
                    }
                }
                if (typeof el.style[prop] != "undefined") {
                    el.style[prop] = value + (typeof value === "number" && !rexclude.test(prop) ? "px" : "");
                    bRtn = bRtn && true
                } else bRtn = bRtn && false
            }
            return bRtn
        }, createNamedElement: function (type, name, doc) {
            var _doc = doc || document, element;
            try {
                element = _doc.createElement("<" + type +
                    ' name="' + name + '">')
            } catch (ign) {
            }
            if (!element)element = _doc.createElement(type);
            if (!element.name)element.name = name;
            return element
        }, getRect: function (elem) {
            if (elem = QZFL.dom.get(elem)) {
                var box = QZFL.object.extend({}, elem.getBoundingClientRect());
                if (typeof box.width == "undefined") {
                    box.width = box.right - box.left;
                    box.height = box.bottom - box.top
                }
                return box
            }
        }, getPosition: function (elem) {
            var box, s, doc;
            if (box = QZFL.dom.getRect(elem)) {
                if (s = QZFL.dom.getScrollLeft(doc = elem.ownerDocument))box.left += s, box.right += s;
                if (s = QZFL.dom.getScrollTop(doc))box.top +=
                    s, box.bottom += s;
                return box
            }
        }, setPosition: function (el, pos) {
            QZFL.dom.setXY(el, pos["left"], pos["top"]);
            QZFL.dom.setSize(el, pos["width"], pos["height"])
        }, getXY: function (elem) {
            var box = QZFL.dom.getPosition(elem) || {left: 0, top: 0};
            return[box.left, box.top]
        }, getSize: function (elem) {
            var box = QZFL.dom.getPosition(elem) || {width: -1, height: -1};
            return[box.width, box.height]
        }, setXY: function (elem, x, y) {
            var _ml = parseInt(QZFL.dom.getStyle(elem, "marginLeft")) || 0, _mt = parseInt(QZFL.dom.getStyle(elem, "marginTop")) || 0;
            QZFL.dom.setStyle(elem,
                {left: (parseInt(x, 10) || 0) - _ml + "px", top: (parseInt(y, 10) || 0) - _mt + "px"})
        }, getScrollLeft: function (doc) {
            var _doc = doc || document;
            return _doc.defaultView && _doc.defaultView.pageXOffset || Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft)
        }, getScrollTop: function (doc) {
            var _doc = doc || document;
            return _doc.defaultView && _doc.defaultView.pageYOffset || Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop)
        }, getScrollHeight: function (doc) {
            var _doc = doc || document;
            return Math.max(_doc.documentElement.scrollHeight,
                _doc.body.scrollHeight)
        }, getScrollWidth: function (doc) {
            var _doc = doc || document;
            return Math.max(_doc.documentElement.scrollWidth, _doc.body.scrollWidth)
        }, setScrollLeft: function (value, doc) {
            var _doc = doc || document;
            _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollLeft = value
        }, setScrollTop: function (value, doc) {
            var _doc = doc || document;
            _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = value
        }, getClientHeight: function (doc) {
            var _doc =
                doc || document;
            return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight
        }, getClientWidth: function (doc) {
            var _doc = doc || document;
            return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientWidth : _doc.body.clientWidth
        }, _SET_SIZE_RE: /^\d+(?:\.\d*)?(px|%|em|in|cm|mm|pc|pt)?$/, setSize: function (el, w, h) {
            el = QZFL.dom.get(el);
            var _r = QZFL.dom._SET_SIZE_RE, m;
            QZFL.dom.setStyle(el, "width", (m = _r.exec(w)) ? m[1] ? w : parseInt(w, 10) + "px" : "auto");
            QZFL.dom.setStyle(el, "height", (m = _r.exec(h)) ?
                m[1] ? h : parseInt(h, 10) + "px" : "auto")
        }, getDocumentWindow: function (doc) {
            var _doc = doc || document;
            return _doc.parentWindow || _doc.defaultView
        }, getElementsByTagNameNS: function (node, ns, tgn) {
            node = node || document;
            var res = [];
            if (node.getElementsByTagNameNS)return node.getElementsByTagName(ns + ":" + tgn); else if (node.getElementsByTagName) {
                var n = document.namespaces;
                if (n.length > 0) {
                    var l = node.getElementsByTagName(tgn);
                    for (var i = 0, len = l.length; i < len; ++i)if (l[i].scopeName == ns)res.push(l[i])
                }
            }
            return res
        }, getElementByTagNameBubble: function (elem, tn) {
            if (!tn)return null;
            var maxLv = 15;
            tn = String(tn).toUpperCase();
            if (tn == "BODY")return document.body;
            elem = QZFL.dom.searchChain(elem = QZFL.dom.get(elem), "parentNode", function (el) {
                return el.tagName == tn || el.tagName == "BODY" || --maxLv < 0
            });
            return!elem || maxLv < 0 ? null : elem
        }, insertAdjacent: function (elem, where, html, isText) {
            var range, pos = ["beforeBegin", "afterBegin", "beforeEnd", "afterEnd"], doc;
            if (QZFL.lang.isElement(elem) && pos[where] && (QZFL.lang.isString(html) || QZFL.lang.isElement(html))) {
                if (elem.insertAdjacentHTML)elem["insertAdjacent" +
                    (typeof html == "object" ? "Element" : isText ? "Text" : "HTML")](pos[where], html); else {
                    range = (doc = elem.ownerDocument).createRange();
                    range[where == 1 || where == 2 ? "selectNodeContents" : "selectNode"](elem);
                    range.collapse(where < 2);
                    range.insertNode(typeof html != "string" ? html : isText ? doc.createTextNode(html) : range.createContextualFragment(html))
                }
                return true
            }
            return false
        }};
        QZFL.event = {KEYS: {BACKSPACE: 8, TAB: 9, RETURN: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46}, _eventListDictionary: {}, _fnSeqUID: 0, _objSeqUID: 0,
            addEvent: function (obj, eventType, fn, argArray) {
                var cfn, res = false, l, handlers;
                if (!obj)return res;
                if (!obj.eventsListUID)obj.eventsListUID = "e" + ++QZFL.event._objSeqUID;
                if (!(l = QZFL.event._eventListDictionary[obj.eventsListUID]))l = QZFL.event._eventListDictionary[obj.eventsListUID] = {};
                if (!fn.__elUID)fn.__elUID = "e" + ++QZFL.event._fnSeqUID + obj.eventsListUID;
                if (!l[eventType])l[eventType] = {};
                if (!l[eventType].handlers)l[eventType].handlers = {};
                handlers = l[eventType].handlers;
                if (typeof handlers[fn.__elUID] == "function")return false;
                cfn = function (evt) {
                    return fn.apply(obj, !argArray ? [QZFL.event.getEvent(evt)] : [QZFL.event.getEvent(evt)].concat(argArray))
                };
                if (obj.addEventListener) {
                    obj.addEventListener(eventType, cfn, false);
                    res = true
                } else if (obj.attachEvent)res = obj.attachEvent("on" + eventType, cfn); else res = false;
                if (res)handlers[fn.__elUID] = cfn;
                return res
            }, removeEvent: function (obj, eventType, fn) {
                var cfn = fn, res = false, l = QZFL.event._eventListDictionary, r;
                if (!obj)return res;
                if (!fn)return QZFL.event.purgeEvent(obj, eventType);
                if (obj.eventsListUID &&
                    l[obj.eventsListUID] && l[obj.eventsListUID][eventType]) {
                    l = l[obj.eventsListUID][eventType].handlers;
                    if (l && l[fn.__elUID]) {
                        cfn = l[fn.__elUID];
                        r = l
                    }
                }
                if (obj.removeEventListener) {
                    obj.removeEventListener(eventType, cfn, false);
                    res = true
                } else if (obj.detachEvent) {
                    obj.detachEvent("on" + eventType, cfn);
                    res = true
                } else return false;
                if (res && r && r[fn.__elUID])delete r[fn.__elUID];
                return res
            }, purgeEvent: function (obj, type) {
                var l, h;
                if (obj.eventsListUID && (l = QZFL.event._eventListDictionary[obj.eventsListUID]) && l[type] && (h = l[type].handlers))for (var k in h)if (obj.removeEventListener)obj.removeEventListener(type,
                    h[k], false); else if (obj.detachEvent)obj.detachEvent("on" + type, h[k]);
                if (obj["on" + type])obj["on" + type] = null;
                if (h) {
                    l[type].handlers = null;
                    delete l[type].handlers
                }
                return true
            }, getEvent: function (evt) {
                var evt = window.event || evt || null, c, _s = QZFL.event.getEvent, ct = 0;
                if (!evt) {
                    c = arguments.callee;
                    while (c && ct < _s.MAX_LEVEL) {
                        if ((evt = c.arguments[0]) && typeof evt.button != "undefined" && typeof evt.ctrlKey != "undefined")break;
                        ++ct;
                        c = c.caller
                    }
                }
                return evt
            }, getButton: function (evt) {
                var e = QZFL.event.getEvent(evt);
                if (!e)return-1;
                if (QZFL.userAgent.ie)return e.button - Math.ceil(e.button / 2); else return e.button
            }, getTarget: function (evt) {
                var e = QZFL.event.getEvent(evt);
                if (e)return e.srcElement || e.target; else return null
            }, getCurrentTarget: function (evt) {
                var e = QZFL.event.getEvent(evt);
                if (e)return e.currentTarget || document.activeElement; else return null
            }, cancelBubble: function (evt) {
                evt = QZFL.event.getEvent(evt);
                if (!evt)return false;
                if (evt.stopPropagation)evt.stopPropagation(); else if (!evt.cancelBubble)evt.cancelBubble = true
            }, preventDefault: function (evt) {
                evt =
                    QZFL.event.getEvent(evt);
                if (!evt)return false;
                if (evt.preventDefault)evt.preventDefault(); else evt.returnValue = false
            }, mouseX: function (evt) {
                evt = QZFL.event.getEvent(evt);
                return evt.pageX || evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
            }, mouseY: function (evt) {
                evt = QZFL.event.getEvent(evt);
                return evt.pageY || evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
            }, getRelatedTarget: function (ev) {
                ev = QZFL.event.getEvent(ev);
                var t = ev.relatedTarget;
                if (!t)if (ev.type ==
                    "mouseout")t = ev.toElement; else if (ev.type == "mouseover")t = ev.fromElement; else;
                return t
            }, onDomReady: function (fn) {
                var _s = QZFL.event.onDomReady;
                QZFL.event._bindReady();
                _s.pool.push(fn)
            }, _bindReady: function () {
                var _s = QZFL.event.onDomReady;
                if (typeof _s.pool != "undefined")return;
                _s.pool = _s.pool || [];
                if (document.readyState === "complete")return setTimeout(QZFL.event._readyFn, 1);
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", QZFL.event._domReady, false);
                    window.addEventListener("load",
                        QZFL.event._readyFn, false)
                } else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", QZFL.event._domReady);
                    window.attachEvent("onload", QZFL.event._readyFn);
                    var toplevel = false;
                    try {
                        toplevel = window.frameElement == null
                    } catch (e) {
                    }
                    if (document.documentElement.doScroll && toplevel)QZFL.event._ieScrollCheck()
                }
            }, _readyFn: function () {
                var _s = QZFL.event.onDomReady;
                _s.isReady = true;
                while (_s.pool.length) {
                    var fn = _s.pool.shift();
                    QZFL.lang.isFunction(fn) && fn()
                }
                _s.pool.length == 0 && (_s._fn = null)
            }, _domReady: function () {
                if (document.addEventListener) {
                    document.removeEventListener("DOMContentLoaded",
                        QZFL.event._domReady, false);
                    QZFL.event._readyFn()
                } else if (document.attachEvent)if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", QZFL.event._domReady);
                    QZFL.event._readyFn()
                }
            }, _ieScrollCheck: function () {
                if (QZFL.event.onDomReady.isReady)return;
                try {
                    document.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(QZFL.event._ieScrollCheck, 1);
                    return
                }
                QZFL.event._readyFn()
            }, delegate: function (delegateDom, selector, eventType, fn, argsArray) {
                var path = "http://" + QZFL.config.resourceDomain +
                    "/ac/qzfl/release/expand/delegate.js?max_age=864000";
                QZFL.imports(path, function () {
                    QZFL.event.delegate(delegateDom, selector, eventType, fn, argsArray)
                })
            }, undelegate: function (delegateDom, selector, eventType, fn) {
            }};
        QZFL.event.on = QZFL.event.addEvent;
        QZFL.event.bind = QZFL.object.bind;
        QZFL.event.getEvent.MAX_LEVEL = 10;
        QZFL.lang = {isString: function (o) {
            return QZFL.object.getType(o) == "string"
        }, isArray: function (o) {
            return QZFL.object.getType(o) == "array"
        }, isFunction: function (o) {
            return QZFL.object.getType(o) == "function"
        },
            isHashMap: function (o) {
                return QZFL.object.getType(o) == "object"
            }, isNode: function (o) {
                return o && (typeof o.nodeName != "undefined" || typeof o.nodeType != "undefined")
            }, isElement: function (o) {
                return o && o.nodeType == 1
            }};
        (function () {
            var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true, rBackslash = /\\/g, rNonWord = /\W/, tmpVar, rSpeedUp = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)|^(\w+)\.([\w\-]+$)/;
            [0, 0].sort(function () {
                baseHasDuplicate = false;
                return 0
            });
            var Sizzle = function (selector, context, results, seed) {
                results = results || [];
                context = context || document;
                var origContext = context;
                if (context.nodeType !== 1 && context.nodeType !== 9)return[];
                if (!selector || typeof selector !== "string")return results;
                var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle.isXML(context), parts = [], soFar = selector, speedUpMatch;
                if (!contextXML) {
                    speedUpMatch = rSpeedUp.exec(selector);
                    if (speedUpMatch) {
                        if (context.nodeType === 1 ||
                            context.nodeType === 9)if (speedUpMatch[1])return makeArray(context.getElementsByTagName(selector), results); else if (speedUpMatch[2] || speedUpMatch[4] && speedUpMatch[5])if (context.getElementsByClassName && speedUpMatch[2])return makeArray(context.getElementsByClassName(speedUpMatch[2]), results); else {
                            var suElems = context.getElementsByTagName(speedUpMatch[4] || "*"), suResBuff = [], suIt, suCN = " " + (speedUpMatch[2] || speedUpMatch[5]) + " ";
                            for (var sui = 0, sulen = suElems.length; sui < sulen; ++sui) {
                                suIt = suElems[sui];
                                (" " + suIt.className +
                                    " ").indexOf(suCN) > -1 && suResBuff.push(suIt)
                            }
                            return makeArray(suResBuff, results)
                        }
                        if (context.nodeType === 9)if ((selector === "body" || selector.toLowerCase() === "body") && context.body)return makeArray([context.body], results); else if (speedUpMatch[3])return(tmpVar = context.getElementById(speedUpMatch[3])) ? makeArray([tmpVar], results) : makeArray([], results)
                    }
                }
                do {
                    chunker.exec("");
                    m = chunker.exec(soFar);
                    if (m) {
                        soFar = m[3];
                        parts.push(m[1]);
                        if (m[2]) {
                            extra = m[3];
                            break
                        }
                    }
                } while (m);
                if (parts.length > 1 && origPOS.exec(selector))if (parts.length ===
                    2 && Expr.relative[parts[0]])set = posProcess(parts[0] + parts[1], context); else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector])selector += parts.shift();
                        set = posProcess(selector, set)
                    }
                } else {
                    if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                        ret = Sizzle.find(parts.shift(), context, contextXML);
                        context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] :
                            ret.set[0]
                    }
                    if (context) {
                        ret = seed ? {expr: parts.pop(), set: makeArray(seed)} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                        set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                        if (parts.length > 0)checkSet = makeArray(set); else prune = false;
                        while (parts.length) {
                            cur = parts.pop();
                            pop = cur;
                            if (!Expr.relative[cur])cur = ""; else pop = parts.pop();
                            if (pop == null)pop = context;
                            Expr.relative[cur](checkSet, pop, contextXML)
                        }
                    } else checkSet = parts =
                        []
                }
                if (!checkSet)checkSet = set;
                if (!checkSet)Sizzle.error(cur || selector);
                if (toString.call(checkSet) === "[object Array]")if (!prune)results.push.apply(results, checkSet); else if (context && context.nodeType === 1)for (i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])))results.push(set[i])
                } else for (i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && checkSet[i].nodeType === 1)results.push(set[i])
                } else makeArray(checkSet, results);
                if (extra) {
                    Sizzle(extra,
                        origContext, results, seed);
                    Sizzle.uniqueSort(results)
                }
                return results
            };
            Sizzle.uniqueSort = function (results) {
                if (sortOrder) {
                    hasDuplicate = baseHasDuplicate;
                    results.sort(sortOrder);
                    if (hasDuplicate)for (var i = 1; i < results.length; i++)if (results[i] === results[i - 1])results.splice(i--, 1)
                }
                return results
            };
            Sizzle.matches = function (expr, set) {
                return Sizzle(expr, null, null, set)
            };
            Sizzle.matchesSelector = function (node, expr) {
                return Sizzle(expr, null, null, [node]).length > 0
            };
            Sizzle.find = function (expr, context, isXML) {
                var set;
                if (!expr)return[];
                for (var i = 0, l = Expr.order.length; i < l; i++) {
                    var match, type = Expr.order[i];
                    if (match = Expr.leftMatch[type].exec(expr)) {
                        var left = match[1];
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) !== "\\") {
                            match[1] = (match[1] || "").replace(rBackslash, "");
                            set = Expr.find[type](match, context, isXML);
                            if (set != null) {
                                expr = expr.replace(Expr.match[type], "");
                                break
                            }
                        }
                    }
                }
                if (!set)set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
                return{set: set, expr: expr}
            };
            Sizzle.filter = function (expr, set, inplace, not) {
                var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
                while (expr && set.length) {
                    for (var type in Expr.filter)if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type], left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\")continue;
                        if (curLoop === result)result = [];
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match)anyFound = found = true;
                            else if (match === true)continue
                        }
                        if (match)for (var i = 0; (item = curLoop[i]) != null; i++)if (item) {
                            found = filter(item, match, i, curLoop);
                            var pass = not ^ !!found;
                            if (inplace && found != null)if (pass)anyFound = true; else curLoop[i] = false; else if (pass) {
                                result.push(item);
                                anyFound = true
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace)curLoop = result;
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound)return[];
                            break
                        }
                    }
                    if (expr === old)if (anyFound == null)Sizzle.error(expr); else break;
                    old = expr
                }
                return curLoop
            };
            Sizzle.error = function (msg) {
                throw"Syntax error, unrecognized expression: " +
                    msg;
            };
            var Expr = Sizzle.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (elem) {
                return elem.getAttribute("href")
            }, type: function (elem) {
                return elem.getAttribute("type")
            }}, relative: {"+": function (checkSet, part) {
                var isPartStr = typeof part === "string", isTag = isPartStr && !rNonWord.test(part), isPartStrNotTag = isPartStr && !isTag;
                if (isTag)part = part.toLowerCase();
                for (var i = 0, l = checkSet.length, elem; i < l; i++)if (elem = checkSet[i]) {
                    while ((elem =
                        elem.previousSibling) && elem.nodeType !== 1);
                    checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part
                }
                if (isPartStrNotTag)Sizzle.filter(part, checkSet, true)
            }, ">": function (checkSet, part) {
                var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length;
                if (isPartStr && !rNonWord.test(part)) {
                    part = part.toLowerCase();
                    for (; i < l; i++) {
                        elem = checkSet[i];
                        if (elem) {
                            var parent = elem.parentNode;
                            checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false
                        }
                    }
                } else {
                    for (; i < l; i++) {
                        elem = checkSet[i];
                        if (elem)checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part
                    }
                    if (isPartStr)Sizzle.filter(part, checkSet, true)
                }
            }, "": function (checkSet, part, isXML) {
                var nodeCheck, doneName = done++, checkFn = dirCheck;
                if (typeof part === "string" && !rNonWord.test(part)) {
                    part = part.toLowerCase();
                    nodeCheck = part;
                    checkFn = dirNodeCheck
                }
                checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML)
            }, "~": function (checkSet, part, isXML) {
                var nodeCheck, doneName = done++, checkFn = dirCheck;
                if (typeof part === "string" && !rNonWord.test(part)) {
                    part =
                        part.toLowerCase();
                    nodeCheck = part;
                    checkFn = dirNodeCheck
                }
                checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML)
            }}, find: {ID: function (match, context, isXML) {
                if (typeof context.getElementById !== "undefined" && !isXML) {
                    var m = context.getElementById(match[1]);
                    return m && m.parentNode ? [m] : []
                }
            }, NAME: function (match, context) {
                if (typeof context.getElementsByName !== "undefined") {
                    var ret = [], results = context.getElementsByName(match[1]);
                    for (var i = 0, l = results.length; i < l; i++)if (results[i].getAttribute("name") === match[1])ret.push(results[i]);
                    return ret.length === 0 ? null : ret
                }
            }, TAG: function (match, context) {
                if (typeof context.getElementsByTagName !== "undefined")return context.getElementsByTagName(match[1])
            }}, preFilter: {CLASS: function (match, curLoop, inplace, result, not, isXML) {
                match = " " + match[1].replace(rBackslash, "") + " ";
                if (isXML)return match;
                for (var i = 0, elem; (elem = curLoop[i]) != null; i++)if (elem)if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                    if (!inplace)result.push(elem)
                } else if (inplace)curLoop[i] = false;
                return false
            }, ID: function (match) {
                return match[1].replace(rBackslash, "")
            }, TAG: function (match, curLoop) {
                return match[1].replace(rBackslash, "").toLowerCase()
            }, CHILD: function (match) {
                if (match[1] === "nth") {
                    if (!match[2])Sizzle.error(match[0]);
                    match[2] = match[2].replace(/^\+|\s*/g, "");
                    var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                    match[2] = test[1] + (test[2] || 1) - 0;
                    match[3] = test[3] - 0
                } else if (match[2])Sizzle.error(match[0]);
                match[0] = done++;
                return match
            }, ATTR: function (match, curLoop, inplace, result, not, isXML) {
                var name = match[1] = match[1].replace(rBackslash, "");
                if (!isXML && Expr.attrMap[name])match[1] = Expr.attrMap[name];
                match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
                if (match[2] === "~=")match[4] = " " + match[4] + " ";
                return match
            }, PSEUDO: function (match, curLoop, inplace, result, not) {
                if (match[1] === "not")if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3]))match[3] = Sizzle(match[3], null, null, curLoop); else {
                    var ret = Sizzle.filter(match[3],
                        curLoop, inplace, true ^ not);
                    if (!inplace)result.push.apply(result, ret);
                    return false
                } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0]))return true;
                return match
            }, POS: function (match) {
                match.unshift(true);
                return match
            }}, filters: {enabled: function (elem) {
                return elem.disabled === false && elem.type !== "hidden"
            }, disabled: function (elem) {
                return elem.disabled === true
            }, checked: function (elem) {
                return elem.checked === true
            }, selected: function (elem) {
                if (elem.parentNode)elem.parentNode.selectedIndex;
                return elem.selected ===
                    true
            }, parent: function (elem) {
                return!!elem.firstChild
            }, empty: function (elem) {
                return!elem.firstChild
            }, has: function (elem, i, match) {
                return!!Sizzle(match[3], elem).length
            }, header: function (elem) {
                return/h\d/i.test(elem.nodeName)
            }, text: function (elem) {
                return"text" === elem.getAttribute("type")
            }, radio: function (elem) {
                return"radio" === elem.type
            }, checkbox: function (elem) {
                return"checkbox" === elem.type
            }, file: function (elem) {
                return"file" === elem.type
            }, password: function (elem) {
                return"password" === elem.type
            }, submit: function (elem) {
                return"submit" ===
                    elem.type
            }, image: function (elem) {
                return"image" === elem.type
            }, reset: function (elem) {
                return"reset" === elem.type
            }, button: function (elem) {
                return"button" === elem.type || elem.nodeName.toLowerCase() === "button"
            }, input: function (elem) {
                return/input|select|textarea|button/i.test(elem.nodeName)
            }}, setFilters: {first: function (elem, i) {
                return i === 0
            }, last: function (elem, i, match, array) {
                return i === array.length - 1
            }, even: function (elem, i) {
                return i % 2 === 0
            }, odd: function (elem, i) {
                return i % 2 === 1
            }, lt: function (elem, i, match) {
                return i < match[3] -
                    0
            }, gt: function (elem, i, match) {
                return i > match[3] - 0
            }, nth: function (elem, i, match) {
                return match[3] - 0 === i
            }, eq: function (elem, i, match) {
                return match[3] - 0 === i
            }}, filter: {PSEUDO: function (elem, match, i, array) {
                var name = match[1], filter = Expr.filters[name];
                if (filter)return filter(elem, i, match, array); else if (name === "contains")return(elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0; else if (name === "not") {
                    var not = match[3];
                    for (var j = 0, l = not.length; j < l; j++)if (not[j] === elem)return false;
                    return true
                } else Sizzle.error(name)
            },
                CHILD: function (elem, match) {
                    var type = match[1], node = elem;
                    switch (type) {
                        case "only":
                        case "first":
                            while (node = node.previousSibling)if (node.nodeType === 1)return false;
                            if (type === "first")return true;
                            node = elem;
                        case "last":
                            while (node = node.nextSibling)if (node.nodeType === 1)return false;
                            return true;
                        case "nth":
                            var first = match[2], last = match[3];
                            if (first === 1 && last === 0)return true;
                            var doneName = match[0], parent = elem.parentNode;
                            if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                var count = 0;
                                for (node = parent.firstChild; node; node =
                                    node.nextSibling)if (node.nodeType === 1)node.nodeIndex = ++count;
                                parent.sizcache = doneName
                            }
                            var diff = elem.nodeIndex - last;
                            if (first === 0)return diff === 0; else return diff % first === 0 && diff / first >= 0
                    }
                }, ID: function (elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match
                }, TAG: function (elem, match) {
                    return match === "*" && elem.nodeType === 1 || elem.nodeName.toLowerCase() === match
                }, CLASS: function (elem, match) {
                    return(" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1
                }, ATTR: function (elem, match) {
                    var name =
                        match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length +
                        1) === check + "-" : false
                }, POS: function (elem, match, i, array) {
                    var name = match[2], filter = Expr.setFilters[name];
                    if (filter)return filter(elem, i, match, array)
                }}};
            var origPOS = Expr.match.POS, fescape = function (all, num) {
                return"\\" + (num - 0 + 1)
            };
            for (var type in Expr.match) {
                Expr.match[type] = new RegExp(Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source);
                Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape))
            }
            var makeArray = function (array, results) {
                array = Array.prototype.slice.call(array,
                    0);
                if (results) {
                    results.push.apply(results, array);
                    return results
                }
                return array
            };
            try {
                Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
            } catch (e) {
                makeArray = function (array, results) {
                    var i = 0, ret = results || [];
                    if (toString.call(array) === "[object Array]")Array.prototype.push.apply(ret, array); else if (typeof array.length === "number")for (var l = array.length; i < l; i++)ret.push(array[i]); else for (; array[i]; i++)ret.push(array[i]);
                    return ret
                }
            }
            var sortOrder, siblingCheck;
            if (document.documentElement.compareDocumentPosition)sortOrder =
                function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                }; else {
                sortOrder = function (a, b) {
                    var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
                    if (a === b) {
                        hasDuplicate = true;
                        return 0
                    } else if (aup === bup)return siblingCheck(a, b); else if (!aup)return-1; else if (!bup)return 1;
                    while (cur) {
                        ap.unshift(cur);
                        cur = cur.parentNode
                    }
                    cur = bup;
                    while (cur) {
                        bp.unshift(cur);
                        cur = cur.parentNode
                    }
                    al =
                        ap.length;
                    bl = bp.length;
                    for (var i = 0; i < al && i < bl; i++)if (ap[i] !== bp[i])return siblingCheck(ap[i], bp[i]);
                    return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
                };
                siblingCheck = function (a, b, ret) {
                    if (a === b)return ret;
                    var cur = a.nextSibling;
                    while (cur) {
                        if (cur === b)return-1;
                        cur = cur.nextSibling
                    }
                    return 1
                }
            }
            Sizzle.getText = function (elems) {
                var ret = "", elem;
                for (var i = 0; elems[i]; i++) {
                    elem = elems[i];
                    if (elem.nodeType === 3 || elem.nodeType === 4)ret += elem.nodeValue; else if (elem.nodeType !== 8)ret += Sizzle.getText(elem.childNodes)
                }
                return ret
            };
            (function () {
                var form = document.createElement("div"), id = "script" + (new Date).getTime(), root = document.documentElement;
                form.innerHTML = "<a name='" + id + "'/>";
                root.insertBefore(form, root.firstChild);
                if (document.getElementById(id)) {
                    Expr.find.ID = function (match, context, isXML) {
                        if (typeof context.getElementById !== "undefined" && !isXML) {
                            var m = context.getElementById(match[1]);
                            return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : []
                        }
                    };
                    Expr.filter.ID =
                        function (elem, match) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return elem.nodeType === 1 && node && node.nodeValue === match
                        }
                }
                root.removeChild(form);
                root = form = null
            })();
            (function () {
                var div = document.createElement("div");
                div.appendChild(document.createComment(""));
                if (div.getElementsByTagName("*").length > 0)Expr.find.TAG = function (match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++)if (results[i].nodeType ===
                            1)tmp.push(results[i]);
                        results = tmp
                    }
                    return results
                };
                div.innerHTML = "<a href='#'></a>";
                if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#")Expr.attrHandle.href = function (elem) {
                    return elem.getAttribute("href", 2)
                };
                div = null
            })();
            if (document.querySelectorAll)(function () {
                var oldSizzle = Sizzle, id = "__sizzle__";
                Sizzle = function (query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = rSpeedUp.exec(query);
                        if (match &&
                            (context.nodeType === 1 || context.nodeType === 9))if (match[1])return makeArray(context.getElementsByTagName(query), extra); else if (match[2] && Expr.find.CLASS && context.getElementsByClassName)return makeArray(context.getElementsByClassName(match[2]), extra);
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body)return makeArray([context.body], extra); else if (match && match[3]) {
                                var elem = context.getElementById(match[3]);
                                if (elem && elem.parentNode) {
                                    if (elem.id === match[3])return makeArray([elem], extra)
                                } else return makeArray([],
                                    extra)
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra)
                            } catch (qsaError) {
                            }
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context, old = context.getAttribute("id"), nid = old || id, hasParent = context.parentNode, relativeHierarchySelector = /^\s*[+~]/.test(query);
                            if (!old)context.setAttribute("id", nid); else nid = nid.replace(/'/g, "\\$&");
                            if (relativeHierarchySelector && hasParent)context = context.parentNode;
                            try {
                                if (!relativeHierarchySelector || hasParent)return makeArray(context.querySelectorAll("[id='" +
                                    nid + "'] " + query), extra)
                            } catch (pseudoError) {
                            } finally {
                                if (!old)oldContext.removeAttribute("id")
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed)
                };
                for (var prop in oldSizzle)Sizzle[prop] = oldSizzle[prop]
            })();
            (function () {
                var html = document.documentElement, matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector, pseudoWorks = false;
                try {
                    matches.call(document.documentElement, "[test!='']:sizzle")
                } catch (pseudoError) {
                    pseudoWorks = true
                }
                if (matches)Sizzle.matchesSelector =
                    function (node, expr) {
                        expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                        if (!Sizzle.isXML(node))try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr))return matches.call(node, expr)
                        } catch (e) {
                        }
                        return Sizzle(expr, null, null, [node]).length > 0
                    }
            })();
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function (match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML)return context.getElementsByClassName(match[1])
            };
            function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                for (var i = 0, l = checkSet.length; i < l; i++) {
                    var elem = checkSet[i];
                    if (elem) {
                        var match = false;
                        elem = elem[dir];
                        while (elem) {
                            if (elem.sizcache === doneName) {
                                match = checkSet[elem.sizset];
                                break
                            }
                            if (elem.nodeType === 1 && !isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i
                            }
                            if (elem.nodeName.toLowerCase() === cur) {
                                match = elem;
                                break
                            }
                            elem = elem[dir]
                        }
                        checkSet[i] = match
                    }
                }
            }

            function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                for (var i = 0, l = checkSet.length; i < l; i++) {
                    var elem = checkSet[i];
                    if (elem) {
                        var match = false;
                        elem = elem[dir];
                        while (elem) {
                            if (elem.sizcache ===
                                doneName) {
                                match = checkSet[elem.sizset];
                                break
                            }
                            if (elem.nodeType === 1) {
                                if (!isXML) {
                                    elem.sizcache = doneName;
                                    elem.sizset = i
                                }
                                if (typeof cur !== "string") {
                                    if (elem === cur) {
                                        match = true;
                                        break
                                    }
                                } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                    match = elem;
                                    break
                                }
                            }
                            elem = elem[dir]
                        }
                        checkSet[i] = match
                    }
                }
            }

            if (document.documentElement.compareDocumentPosition)Sizzle.contains = function (a, b) {
                return!!(a.compareDocumentPosition(b) & 16)
            }; else if (document.documentElement.contains)Sizzle.contains = function (a, b) {
                if (a !== b && a.contains && b.contains)return a.contains(b);
                else if (!b || b.nodeType == 9)return false; else if (b === a)return true; else return Sizzle.contains(a, b.parentNode)
            }; else Sizzle.contains = function () {
                return false
            };
            Sizzle.isXML = function (elem) {
                var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false
            };
            var posProcess = function (selector, context) {
                var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context;
                while (match = Expr.match.PSEUDO.exec(selector)) {
                    later += match[0];
                    selector = selector.replace(Expr.match.PSEUDO,
                        "")
                }
                selector = Expr.relative[selector] ? selector + "*" : selector;
                for (var i = 0, l = root.length; i < l; i++)Sizzle(selector, root[i], tmpSet);
                return Sizzle.filter(later, tmpSet)
            };
            QZFL.selector = window.Sizzle = Sizzle;
            QZFL.object.makeArray = QZFL.dom.collection2Array = makeArray;
            QZFL.dom.uniqueSort = Sizzle.uniqueSort;
            QZFL.dom.contains = Sizzle.contains
        })();
        (function () {
            var _handler = QZFL.ElementHandler = function (selector, context) {
                this.elements = null;
                this._isElementHandler = true;
                this._init(selector, context)
            };
            _handler.prototype = {_init: function (selector, context) {
                if (QZFL.lang.isString(selector))this.elements = QZFL.selector(selector, context); else if (selector instanceof QZFL.ElementHandler)this.elements = selector.elements.slice(); else if (QZFL.lang.isArray(selector))this.elements = selector; else if (selector && (selector.nodeType && selector.nodeType !== 3 && selector.nodeType !== 8 || selector.setTimeout))this.elements = [selector]; else this.elements = []
            }, findElements: function (selector) {
                var _pushstack = [], _s;
                this.each(function (el) {
                    _s = QZFL.selector(selector, el);
                    if (_s.length >
                        0)_pushstack = _pushstack.concat(_s)
                });
                return _pushstack
            }, find: function (selector) {
                return _el.get(this.findElements(selector))
            }, filter: function (expr, elems, not) {
                if (not)expr = ":not(" + expr + ")";
                return _el.get(QZFL.selector.matches(expr, elems || this.elements))
            }, each: function (fn) {
                QZFL.object.each(this.elements, fn);
                return this
            }, concat: function (elements) {
                return _el.get(this.elements.concat(!!elements._isElementHandler ? elements.elements : elements))
            }, get: function (index) {
                return _el.get(this.elements[index])
            }, eq: function (index) {
                return this.elements[index ||
                    0]
            }, slice: function () {
                return _el.get(Array.prototype.slice.apply(this.elements, arguments))
            }};
            var _el = QZFL.element = {get: function (selector, context) {
                return new _handler(selector, context)
            }, extend: function (object) {
                QZFL.object.extend(_handler, object)
            }, extendFn: function (object) {
                QZFL.object.extend(_handler.prototype, object)
            }, getVersion: function () {
                return _handler.version
            }}
        })();
        QZFL.element.extend({version: "1.0"});
        QZFL.element.extendFn({bind: function (evtType, fn, argArr) {
            if (typeof fn != "function")return false;
            return this.each(function (el) {
                QZFL.event.addEvent(el, evtType, fn, argArr)
            })
        }, unBind: function (evtType, fn) {
            return this.each(function (el) {
                QZFL.event[fn ? "removeEvent" : "purgeEvent"](el, evtType, fn)
            })
        }, onHover: function (fnOver, fnOut) {
            this.onMouseOver(fnOver);
            return this.onMouseOut(fnOut)
        }, onMouseEnter: function (fn) {
            return this.bind("mouseover", function (evt) {
                var rel = QZFL.event.getRelatedTarget(evt);
                if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel))fn.call(this, evt)
            })
        }, onMouseLeave: function (fn) {
            return this.bind("mouseout",
                function (evt) {
                    var rel = QZFL.event.getRelatedTarget(evt);
                    if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel))fn.call(this, evt)
                })
        }, delegate: function (selector, eventType, fn, argsArray) {
            if (typeof fn != "function")return false;
            return this.each(function (el) {
                QZFL.event.delegate(el, selector, eventType, fn, argsArray)
            })
        }, undelegate: function (selector, eventType, fn) {
            return this.each(function (el) {
                QZFL.event.undelegate(el, selector, eventType, fn)
            })
        }});
        QZFL.object.each(["onClick", "onMouseDown", "onMouseUp", "onMouseOver",
            "onMouseMove", "onMouseOut", "onFocus", "onBlur", "onKeyDown", "onKeyPress", "onKeyUp"], function (name, index) {
            QZFL.ElementHandler.prototype[name] = function (fn) {
                return this.bind(name.slice(2).toLowerCase(), fn)
            }
        });
        QZFL.element.extendFn({setHtml: function (value) {
            return this.setAttr("innerHTML", value)
        }, getHtml: function (index) {
            var _e = this.elements[index || 0];
            return!!_e ? _e.innerHTML : null
        }, setVal: function (value) {
            if (QZFL.object.getType(value) == "array") {
                var _v = "\x00" + value.join("\x00") + "\x00";
                this.each(function (el) {
                    if (/radio|checkbox/.test(el.type))el.checked =
                        el.nodeType && ("\x00" + _v.indexOf(el.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + el.name.toString() + "\x00") > -1); else if (el.tagName == "SELECT")QZFL.object.each(el.options, function (e) {
                        e.selected = e.nodeType == 1 && ("\x00" + _v.indexOf(e.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + e.text.toString() + "\x00") > -1)
                    }); else el.value = value
                })
            } else this.setAttr("value", value);
            return this
        }, getVal: function (index) {
            var _e = this.elements[index || 0], _v;
            if (_e)if (_e.tagName == "SELECT") {
                _v = [];
                if (_e.selectedIndex < 0)return null;
                if (_e.type == "select-one")_v.push(_e.value); else QZFL.object.each(_e.options, function (e) {
                    if (e.nodeType == 1 && e.selected)_v.push(e.value)
                })
            } else _v = _e.value; else return null;
            return _v
        }, hasClass: function (className) {
            if (this.elements && this.elements.length)return QZFL.css.hasClassName(this.elements[0], className);
            return false
        }, addClass: function (className) {
            return this.each(function (el) {
                QZFL.css.addClassName(el, className)
            })
        }, removeClass: function (className) {
            return this.each(function (el) {
                QZFL.css.removeClassName(el,
                    className)
            })
        }, toggleClass: function (className) {
            return this.each(function (el) {
                QZFL.css.toggleClassName(el, className)
            })
        }, getSize: function (index) {
            var _e = this.elements[index || 0];
            return!!_e ? QZFL.dom.getSize(_e) : null
        }, getXY: function (index) {
            var _e = this.elements[index || 0];
            return!!_e ? QZFL.dom.getXY(_e) : null
        }, setSize: function (width, height) {
            return this.each(function (el) {
                QZFL.dom.setSize(el, width, height)
            })
        }, setXY: function (X, Y) {
            return this.each(function (el) {
                QZFL.dom.setXY(el, X, Y)
            })
        }, hide: function () {
            return this.each(function (el) {
                QZFL.dom.setStyle(el,
                    "display", "none")
            })
        }, show: function (isBlock) {
            return this.each(function (el) {
                QZFL.dom.setStyle(el, "display", isBlock ? "block" : "")
            })
        }, getStyle: function (key, index) {
            var _e = this.elements[index || 0];
            return!!_e ? QZFL.dom.getStyle(_e, key) : null
        }, setStyle: function (key, value) {
            return this.each(function (el) {
                QZFL.dom.setStyle(el, key, value)
            })
        }, setAttr: function (key, value) {
            key = key == "class" ? "className" : key;
            return this.each(function (el) {
                el[key] = value
            })
        }, getAttr: function (key, index) {
            key = key == "class" ? "className" : key;
            var node =
                this.elements[index || 0];
            return node ? node[key] === undefined ? node.getAttribute(key) : node[key] : null
        }});
        QZFL.element.extendFn({getPrev: function () {
            var _arr = [];
            this.each(function (el) {
                var _e = QZFL.dom.getPreviousSibling(el);
                _arr.push(_e)
            });
            return QZFL.element.get(_arr)
        }, getNext: function () {
            var _arr = [];
            this.each(function (el) {
                var _e = QZFL.dom.getNextSibling(el);
                _arr.push(_e)
            });
            return QZFL.element.get(_arr)
        }, getChildren: function () {
            var _arr = [];
            this.each(function (el) {
                var node = QZFL.dom.getFirstChild(el);
                while (node) {
                    if (!!node &&
                        node.nodeType == 1)_arr.push(node);
                    node = node.nextSibling
                }
            });
            return QZFL.element.get(_arr)
        }, getParent: function () {
            var _arr = [];
            this.each(function (el) {
                var _e = el.parentNode;
                _arr.push(_e)
            });
            return QZFL.element.get(_arr)
        }});
        QZFL.element.extendFn({create: function (tagName, attributes) {
            var _arr = [];
            this.each(function (el) {
                _arr.push(QZFL.dom.createElementIn(tagName, el, false, attributes))
            });
            return QZFL.element.get(_arr)
        }, appendTo: function (el) {
            var el = el.elements && el.elements[0] || QZFL.dom.get(el);
            return this.each(function (element) {
                el.appendChild(element)
            })
        },
            insertAfter: function (el) {
                var el = el.elements && el.elements[0] || QZFL.dom.get(el), _ns = el.nextSibling, _p = el.parentNode;
                return this.each(function (element) {
                    _p[!_ns ? "appendChild" : "insertBefore"](element, _ns)
                })
            }, insertBefore: function (el) {
                var el = el.elements && el.elements[0] || QZFL.dom.get(el), _p = el.parentNode;
                return this.each(function (element) {
                    _p.insertBefore(element, el)
                })
            }, remove: function () {
                return this.each(function (el) {
                    QZFL.dom.removeElement(el)
                })
            }});
        QZFL.FormSender = function (actionURL, method, data, charset) {
            this.name =
                "_fpInstence_" + QZFL.FormSender.counter;
            QZFL.FormSender.instance[this.name] = this;
            QZFL.FormSender.counter++;
            var c = String(charset).toLowerCase();
            if (typeof actionURL == "object" && actionURL.nodeType == 1 && actionURL.tagName == "FORM")this.instanceForm = actionURL; else {
                this.method = method || "POST";
                this.uri = actionURL;
                this.charset = c == "utf-8" || c == "gbk" || c == "gb2312" || c == "gb18030" ? c : "gb2312";
                this.data = typeof data == "object" || typeof data == "string" ? data : null;
                this.proxyURL = this.charset == "utf-8" ? QZFL.config.FSHelperPage.replace(/_gbk/,
                    "_utf8") : QZFL.config.FSHelperPage
            }
            this._sender = null;
            this.onSuccess = QZFL.emptyFn;
            this.onError = QZFL.emptyFn
        };
        QZFL.FormSender.instance = {};
        QZFL.FormSender.counter = 0;
        QZFL.FormSender._errCodeMap = {999: {msg: "Connection or Server error"}};
        QZFL.FormSender.pluginsPool = {"formHandler": [], "onErrorHandler": []};
        QZFL.FormSender._pluginsRunner = function (pType, data) {
            var _s = QZFL.FormSender, l = _s.pluginsPool[pType], t = data, len;
            if (l && (len = l.length))for (var i = 0; i < len; ++i)if (typeof l[i] == "function")t = l[i](t);
            return t
        };
        QZFL.FormSender._clear =
            function (o) {
                o._sender = o._sender.callback = o._sender.errorCallback = o._sender.onreadystatechange = null;
                if (QZFL.userAgent.safari || QZFL.userAgent.opera)setTimeout('QZFL.dom.removeElement(document.getElementById("_fp_frm_' + o.name + '"))', 50); else QZFL.dom.removeElement(document.getElementById("_fp_frm_" + o.name));
                o.instanceForm = null
            };
        QZFL.FormSender.prototype.send = function () {
            if (this._sender === null || this._sender === void 0) {
                var timer, sender = document.createElement("iframe");
                sender.id = sender.name = "_fp_frm_" + this.name;
                sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
                document.body.appendChild(sender);
                sender._Callback = function (th) {
                    return function (o) {
                        clearTimeout(timer);
                        th.onSuccess(o)
                    }
                }(this);
                sender.errorCallback = function (th) {
                    return function (o) {
                        clearTimeout(timer);
                        th.onError(o);
                        QZFL.FormSender._pluginsRunner("onErrorHandler", th);
                        QZFL.FormSender._clear(th)
                    }
                }(this);
                if (typeof sender.onreadystatechange != "undefined")!this.instanceForm && (QZFL.userAgent.ie && QZFL.userAgent.ie < 8) && (sender.onreadystatechange =
                    function (th) {
                        return function () {
                            if (th._sender.readyState == "complete" && th._sender.submited) {
                                QZFL.FormSender._clear(th);
                                th.onError(QZFL.FormSender._errCodeMap[999]);
                                QZFL.FormSender._pluginsRunner("onErrorHandler", th)
                            }
                        }
                    }(this)); else timer = setTimeout(function (th) {
                    return function () {
                        try {
                            var _t = th._sender.contentWindow.location.href;
                            if (_t.indexOf(th.uri) == 0) {
                                clearTimeout(timer);
                                QZFL.FormSender._clear(th);
                                th.onError(QZFL.FormSender._errCodeMap[999]);
                                QZFL.FormSender._pluginsRunner("onErrorHandler", th)
                            }
                        } catch (err) {
                            clearTimeout(timer);
                            QZFL.FormSender._clear(th);
                            th.onError(QZFL.FormSender._errCodeMap[999]);
                            QZFL.FormSender._pluginsRunner("onErrorHandler", th)
                        }
                    }
                }(this), 1500);
                this._sender = sender
            }
            if (!this.instanceForm) {
                var t = this, ie = QZFL.userAgent.ie, ifrurl, ifrHTML, data = t.data, jsondata = {};
                ifrHTML = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + t.charset + '" /><meta charset="' + t.charset + '" />';
                if (ie)ifrurl = 'javascript:document.open();document.domain="' + document.domain + '";var me=parent.QZFL.FormSender.instance["' +
                    t.name + '"];document.write(me.ifrHTML);document.close();';
                ifrHTML = ifrHTML + '<script type="text/javascript">' + (ie && 'document.charset="' + t.charset + '"' || "") + ';document.domain="' + document.domain + '";frameElement.submited=void(0);\x3c/script></head><body>';
                ifrHTML = ifrHTML + '<form action="' + t.uri + (t.uri.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + QS.string.getAntiCSRFToken() + '" accept-charset="' + t.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + t.charset + '" method="post">';
                ifrHTML = ifrHTML + '<input type="hidden" name="qzreferrer" id="qzreferrer" />';
                ifrHTML = ifrHTML + '</form><script type="text/javascript">var me=parent.QZFL.FormSender.instance["' + t.name + '"],doc=document,f=doc.getElementById("p"),d=me.jsonData,fg=doc.createDocumentFragment();if(typeof d=="string"){var l=d.split("&");for(var i=0;i<l.length;i++){var kv=l[i].split("=");var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=kv[0];ipt.value=decodeURIComponent(kv[1]);fg.appendChild(ipt);}}else{for(var i in d){var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=i;ipt.value=d[i];fg.appendChild(ipt);}}f.appendChild(fg);doc.getElementById("qzreferrer").value=parent.location.href;f.submit();\x3c/script></body></html>';
                t.ifrHTML = ifrHTML;
                t.ifrurl = ifrurl;
                t.jsonData = data;
                ie ? setTimeout(function (th) {
                    return function () {
                        th._sender.src = th.ifrurl
                    }
                }(t), 10) : sender.src = "javascript:;";
                if (!ie) {
                    var d = sender.contentDocument || sender.contentWindow.document;
                    if (d) {
                        d.open();
                        d.write(t.ifrHTML);
                        d.close()
                    }
                }
            } else {
                this.instanceForm.target = sender.name = sender.id;
                this._sender.submited = true;
                this.instanceForm.submit()
            }
            return true
        };
        QZFL.FormSender.prototype.destroy = function () {
            var n = this.name, instance = QZFL.FormSender.instance[n];
            instance._sender.parentNode.removeChild(instance._sender);
            delete QZFL.FormSender.instance[n]._sender;
            QZFL.FormSender.instance[n]._sender = null;
            delete QZFL.FormSender.instance[n];
            return null
        };
        QZFL.JsLoader = function () {
            this.onload = QZFL.emptyFn;
            this.onerror = QZFL.emptyFn
        };
        QZFL.JsLoader.prototype.load = function (src, doc, opt) {
            var opts = {}, t = typeof opt, o = this;
            if (t == "string")opts.charset = opt; else if (t == "object")opts = opt;
            opts.charset = opts.charset || "gb2312";
            setTimeout(function () {
                o._load.apply(o, [src, doc || document, opts]);
                o = null
            }, 0)
        };
        QZFL.JsLoader.count = 0;
        QZFL.JsLoader._idleInstancesIDQueue =
            [];
        QZFL.JsLoader.prototype._load = function (src, doc, opts) {
            var _ie = QZFL.userAgent.ie, o = this, tmp, k, idp = QZFL.JsLoader._idleInstancesIDQueue, _rm = QZFL.dom.removeElement, _ae = QZFL.event.addEvent, _new = false, _js;
            if (!(_js = doc.getElementById(idp.pop())) || QZFL.userAgent.ie && QZFL.userAgent.ie > 8) {
                _js = doc.createElement("script");
                _js.id = "_qz_jsloader_" + ++QZFL.JsLoader.count;
                _new = true
            }
            _ae(_js, _ie ? "readystatechange" : "load", function () {
                if (!_js || _ie && (doc.documentMode < 10 ? _js.readyState != "loaded" : _js.readyState != "complete"))return;
                _ie && idp.push(_js.id);
                _js._inUse = false;
                o.onload();
                !_ie && _rm(_js);
                _js = _ae = o = null
            });
            if (!_ie)_ae(_js, "error", function () {
                _ie && idp.push(_js.id);
                _js._inUse = false;
                o.onerror();
                !_ie && _rm(_js);
                _js = _ae = o = null
            });
            for (k in opts)if (typeof(tmp = opts[k]) == "string" && k.toLowerCase() != "src")_js.setAttribute(k, tmp);
            _new && doc.getElementsByTagName("head")[0].appendChild(_js);
            _js._inUse = true;
            _js.src = src;
            opts = null
        };
        QZFL["js" + "Loader"] = QZFL.JsLoader;
        QZFL.JSONGetter = function (actionURL, cname, data, charset, junctionMode) {
            if (QZFL.object.getType(cname) !=
                "string")cname = "_jsonInstence_" + (QZFL.JSONGetter.counter + 1);
            var prot = QZFL.JSONGetter.instance[cname];
            if (prot instanceof QZFL.JSONGetter); else {
                QZFL.JSONGetter.instance[cname] = prot = this;
                QZFL.JSONGetter.counter++;
                prot._name = cname;
                prot._sender = null;
                prot._timer = null;
                this.onSuccess = QZFL.emptyFn;
                this.onError = QZFL.emptyFn;
                this.onTimeout = QZFL.emptyFn;
                this.timeout = 5E3;
                this.clear = QZFL.emptyFn;
                this._baseClear = function () {
                    this._waiting = false;
                    this._squeue = [];
                    this._equeue = [];
                    this.onSuccess = this.onError = QZFL.emptyFn;
                    this.clear = null
                }
            }
            prot._uri = actionURL;
            prot._data = data && (QZFL.object.getType(data) == "object" || QZFL.object.getType(data) == "string") ? data : null;
            prot._charset = QZFL.object.getType(charset) != "string" ? QZFL.config.defaultDataCharacterSet : charset;
            prot._jMode = !!junctionMode;
            return prot
        };
        QZFL.JSONGetter.instance = {};
        QZFL.JSONGetter.counter = 0;
        QZFL.JSONGetter._errCodeMap = {999: {msg: "Connection or Server error."}, 998: {msg: "Connection to Server timeout."}};
        QZFL.JSONGetter.genHttpParamString = function (o) {
            var r = [];
            for (var i in o)r.push(i +
                "=" + encodeURIComponent(o[i]));
            return r.join("&")
        };
        QZFL.JSONGetter.prototype.addOnSuccess = function (f) {
            if (typeof f == "function") {
                if (this._squeue && this._squeue.push); else this._squeue = [];
                this._squeue.push(f)
            }
        };
        QZFL.JSONGetter._runFnQueue = function (q, resultArgs, th) {
            var f;
            if (q && q.length)while (q.length > 0) {
                f = q.shift();
                if (typeof f == "function")f.apply(th ? th : null, resultArgs)
            }
        };
        QZFL.JSONGetter.prototype.addOnError = function (f) {
            if (typeof f == "function") {
                if (this._equeue && this._equeue.push); else this._equeue = [];
                this._equeue.push(f)
            }
        };
        QZFL.JSONGetter.pluginsPool = {"srcStringHandler": [], "onErrorHandler": []};
        QZFL.JSONGetter._pluginsRunner = function (pType, data) {
            var _s = QZFL.JSONGetter, l = _s.pluginsPool[pType], t = data, len;
            if (l && (len = l.length))for (var i = 0; i < len; ++i)if (typeof l[i] == "function")t = l[i](t);
            return t
        };
        QZFL.JSONGetter.prototype.send = function (callbackFnName) {
            if (this._waiting)return;
            var clear, cfn = QZFL.object.getType(callbackFnName) != "string" ? "callback" : callbackFnName, da = this._uri;
            if (this._data)da += (da.indexOf("?") < 0 ? "?" : "&") + (typeof this._data ==
                "object" ? QZFL.JSONGetter.genHttpParamString(this._data) : this._data);
            da = QZFL.JSONGetter._pluginsRunner("srcStringHandler", da);
            if (this._jMode) {
                window[cfn] = this.onSuccess;
                var _sd = new QZFL.JsLoader;
                _sd.onerror = this.onError;
                _sd.load(da, void 0, this._charset);
                return
            }
            this._timer = setTimeout(function (th) {
                return function () {
                    th._waiting = false;
                    th.onTimeout()
                }
            }(this), this.timeout);
            if (QZFL.userAgent.ie && QZFL.userAgent.ie < 10 && !(QZFL.userAgent.beta && navigator.appVersion.indexOf("Trident/4.0") > -1)) {
                var df = document.createDocumentFragment(),
                    sender = (QZFL.userAgent.ie > 8 ? document : df).createElement("script");
                sender.charset = this._charset;
                this._senderDoc = df;
                this._sender = sender;
                this.clear = clear = function (o) {
                    clearTimeout(o._timer);
                    if (o._sender)o._sender.onreadystatechange = null;
                    df["callback"] = df["_Callback"] = df[cfn] = null;
                    df = o._senderDoc = o._sender = null;
                    o._baseClear()
                };
                df["callback"] = df["_Callback"] = df[cfn] = function (th) {
                    return function () {
                        th._waiting = false;
                        th.onSuccess.apply(th, arguments);
                        QZFL.JSONGetter._runFnQueue(th._squeue, arguments, th);
                        clear(th)
                    }
                }(this);
                if (QZFL.userAgent.ie < 9)sender.onreadystatechange = function (th) {
                    return function () {
                        if (th._sender && th._sender.readyState == "loaded")try {
                            th._onError()
                        } catch (ignore) {
                        }
                    }
                }(this); else sender.onerror = function (th) {
                    return function () {
                        try {
                            th._onError()
                        } catch (ignore) {
                        }
                    }
                }(this);
                this._waiting = true;
                df.appendChild(sender);
                this._sender.src = da
            } else {
                this.clear = clear = function (o) {
                    clearTimeout(o._timer);
                    o._baseClear()
                };
                window[cfn] = function () {
                    QZFL.JSONGetter.args = arguments
                };
                var callback = function (th) {
                    return function () {
                        th.onSuccess.apply(th,
                            QZFL.JSONGetter.args);
                        QZFL.JSONGetter._runFnQueue(th._squeue, QZFL.JSONGetter.args, th);
                        QZFL.JSONGetter.args = [];
                        clear(th)
                    }
                }(this);
                var _ecb = function (th) {
                    return function () {
                        th._waiting = false;
                        var _eo = QZFL.JSONGetter._errCodeMap[999];
                        th.onError(_eo);
                        QZFL.JSONGetter._runFnQueue(th._equeue, [_eo], th);
                        clear(th)
                    }
                }(this);
                var h = document.getElementsByTagName("head"), node;
                h = h && h[0] || document.body;
                if (!h)return;
                var baseElement = h.getElementsByTagName("base")[0];
                node = document.createElement("script");
                node.charset = this._charset ||
                    "utf-8";
                node.onload = function () {
                    this.onload = null;
                    if (node.parentNode)h.removeChild(node);
                    callback();
                    node = void 0
                };
                node.onerror = function () {
                    this.onerror = null;
                    _ecb()
                };
                node.src = da;
                baseElement ? h.insertBefore(node, baseElement) : h.appendChild(node)
            }
        };
        QZFL.JSONGetter.prototype._onError = function () {
            this._waiting = false;
            var _eo = QZFL.JSONGetter._errCodeMap[999];
            this.onError(_eo);
            QZFL.JSONGetter._runFnQueue(this._equeue, [_eo], this);
            QZFL.JSONGetter._pluginsRunner("onErrorHandler", this);
            this.clear(this)
        };
        QZFL.JSONGetter.prototype.destroy =
            QZFL.emptyFn;
        QZFL.XHR = function (actionURL, cname, method, data, isAsync, nocache) {
            var _s = QZFL.XHR, prot, n;
            cname = cname || "_xhrInstence_" + _s.counter;
            if (!(_s.instance[cname]instanceof QZFL.XHR)) {
                _s.instance[cname] = this;
                _s.counter++
            }
            prot = _s.instance[cname];
            prot._name = cname;
            prot._nc = !!nocache;
            prot._method = (typeof method == "string" ? method : "").toUpperCase() != "GET" ? "POST" : "GET";
            if (!(prot._uriObj = new QZFL.util.URI(actionURL)))throw new Error("URL not valid!");
            prot._uri = actionURL;
            prot._data = data;
            this.onSuccess = QZFL.emptyFn;
            this.onError = QZFL.emptyFn;
            this.charset = "gb2312";
            this.proxyPath = "";
            return prot
        };
        QZFL.XHR.instance = {};
        QZFL.XHR.counter = 0;
        QZFL.XHR.path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/expand/xhr_base.js?max_age=864001", QZFL.XHR.prototype.send = function () {
            var _s = QZFL.XHR, fn;
            if (this._method == "POST" && this._data == null)return false;
            if (typeof this._data == "object")this._data = _s.genHttpParamString(this._data, this.charset);
            if (this._method == "GET" && this._data)this._uri += (this._uri.indexOf("?") < 0 ? "?" : "&") +
                this._data;
            fn = location.host && this._uriObj.host != location.host ? "_DoXsend" : "_DoSend";
            if (_s[fn])return _s[fn](this); else {
                QZFL.imports(_s.path, function (th) {
                    return function () {
                        _s[fn](th)
                    }
                }(this));
                return true
            }
        };
        QZFL.XHR.genHttpParamString = function (o, cs) {
            cs = (cs || "gb2312").toLowerCase();
            var r = [];
            for (var i in o)r.push(i + "=" + (cs == "utf-8" ? encodeURIComponent(o[i]) : QZFL.string.URIencode(o[i])));
            return r.join("&")
        };
        QZFL.XHR._errCodeMap = {400: {msg: "Bad Request"}, 401: {msg: "Unauthorized"}, 403: {msg: "Forbidden"}, 404: {msg: "Not Found"},
            999: {msg: "Proxy page error"}, 1E3: {msg: "Bad Response"}, 1001: {msg: "No Network"}, 1002: {msg: "No Data"}, 1003: {msg: "Eval Error"}};
        QZFL.XHR._DoXsend = function (o) {
            var sender, uri = o._uriObj;

            function clear(obj) {
                try {
                    obj._sender = obj._sender.callback = obj._sender.errorCallback = obj._sender.onreadystatechange = null
                } catch (ign) {
                }
                if (QZFL.userAgent.safari || QZFL.userAgent.opera)setTimeout('QZFL.dom.removeElement($("_xsend_frm_' + obj._name + '"))', 1E3); else QZFL.dom.removeElement(QZFL.dom.get("_xsend_frm_" + obj._name))
            }

            if (o._sender ===
                null || o._sender === void 0) {
                sender = document.createElement("iframe");
                sender.id = "_xsend_frm_" + o._name;
                sender.style.width = sender.style.height = 0;
                sender.style.borderWidth = "0";
                sender.callback = function (data) {
                    o.onSuccess(data);
                    clear(o)
                };
                sender.errorCallback = function (num) {
                    o.onError(QZFL.XHR._errCodeMap[num]);
                    clear(o)
                };
                document.body.appendChild(sender);
                o._sender = sender
            }
            o.GBEncoderPath = QZFL.config.gbEncoderPath || "";
            o._sender.src = "http://" + uri.host + (this.proxyPath || "/xhr_proxy_gbk.html");
            return true
        };
        QZFL.XHR._DoSend =
            function (th) {
                var sender;
                if (!th._sender) {
                    if (window.XMLHttpRequest)sender = new XMLHttpRequest; else if (window.ActiveXObject)try {
                        !(sender = new ActiveXObject("Msxml2.XMLHTTP")) && (sender = new ActiveXObject("Microsoft.XMLHTTP"))
                    } catch (ign) {
                    }
                    if (!sender)return false;
                    th._sender = sender
                }
                try {
                    th._sender.open(th._method, th._uri, true)
                } catch (err) {
                    return false
                }
                th._method == "POST" && th._sender.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                th._nc && (th._sender.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT"),
                    th._sender.setRequestHeader("Cache-Control", "no-cache"));
                th._sender.onreadystatechange = function () {
                    try {
                        if (th._sender.readyState == 4) {
                            if (th._sender.status >= 200 && th._sender.status < 300)th.onSuccess({text: th._sender.responseText, xmlDom: th._sender.responseXML}); else if (QZFL.userAgent.safari && QZFL.object.getType(th._sender.status) == "undefined")th.onError(QZFL.XHR._errCodeMap[1002]); else th.onError(QZFL.XHR._errCodeMap[th._sender.status]);
                            delete th._sender;
                            th._sender = null
                        }
                    } catch (err) {
                    }
                };
                th._sender.send(th._method ==
                    "POST" ? th._data : void 0);
                return true
            };
        QZFL.XHR.prototype.destroy = QZFL.emptyFn;
        QZFL.cookie = {set: function (name, value, domain, path, hour) {
            if (hour) {
                var expire = new Date;
                expire.setTime(expire.getTime() + 36E5 * hour)
            }
            document.cookie = name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + QZFL.config.domainPrefix + ";");
            return true
        }, get: function (name) {
            var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
            return!m ? "" : m[1]
        }, del: function (name, domain, path) {
            document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + QZFL.config.domainPrefix + ";")
        }};
        QZFL.effect = {off: 0, mode: [], init: function () {
            var classArray = [
                ["webkit", "WebkitTransition"],
                ["firefox", "MozTransition"],
                ["opera", "OTransition"],
                ["ie", "msTransition"]
            ], ua = QZFL.userAgent, agent = "", cName = "";
            for (var i = 0, len = classArray.length; i < len; i++)if (ua[classArray[i][0]]) {
                agent = classArray[i][0];
                cName = classArray[i][1];
                break
            }
            return QZFL.effect.mode = cName in document.documentElement.style ? [agent, "css3"] : [agent]
        }, run: function (elem, prop, opts) {
            var o = QZFL.effect, tid = ++o._uniqueID, fpropArray, fprop, qDom;
            if (!elem)return;
            if (!o.mode[0])o.init();
            opts = o._opt(opts);
            opts.start();
            elem = QZFL.dom.get(elem);
            fpropArray = o._prop(prop, elem);
            fprop = fpropArray[0];
            elem._tid = tid;
            if (o.off) {
                qDom = QZFL.dom;
                for (var i in fpropArray[1])qDom.setStyle(elem, i, fpropArray[1][i]);
                window.setTimeout(opts.complete, opts.duration)
            } else {
                var t =
                    new QZFL.tweenMaker(0, 100, opts.duration, opts.interval);
                t.onStart = o.mode[1] == "css3" ? function () {
                    o._tweenArray[tid] = t;
                    (new QZFL.cssTransfrom(elem, fprop, opts)).firecss()
                } : function () {
                    o._tweenArray[tid] = t
                };
                t.onChange = o.mode[1] != "css3" ? function (p) {
                    o.drawStyle(fprop, p, elem);
                    opts.change(p)
                } : function (p) {
                    opts.change(p)
                };
                t.onEnd = function () {
                    if (o.mode[1] != "css3")opts.complete();
                    delete o._tweenArray[elem._tid]
                };
                t.start()
            }
        }, show: function (elem, duration, cb) {
            var d = QZFL.dom;
            elem = d.get(elem);
            cb = cb || QZFL.emptyFn;
            QZFL.effect.run(elem,
                {opacity: 1}, {duration: duration || 1E3, complete: cb, start: function () {
                    d.setStyle(elem, "opacity", 0);
                    d.setStyle(elem, "display", "")
                }})
        }, hide: function (elem, duration, cb) {
            var d = QZFL.dom;
            elem = d.get(elem);
            cb = cb || QZFL.emptyFn;
            QZFL.effect.run(elem, {opacity: 0}, {duration: duration || 1E3, complete: function () {
                d.setStyle(elem, "display", "none");
                d.setStyle(elem, "opacity", 1);
                cb()
            }})
        }, getPercent: function (elem) {
            var elem = QZFL.dom.get(elem), tid = elem._tid, t = QZFL.effect._tweenArray[tid];
            return t.getPercent()
        }, stop: function (elem) {
            var es =
                QZFL.effect, webkit = es.mode[1] == "css3", elem = QZFL.dom.get(elem);
            if (webkit) {
                var uid = (elem._transition || {})._uid, cText;
                cText = QZFL.cssTransfrom._cssText[uid];
                cText && (elem.style.cssText = cText)
            } else {
                var tid = elem._tid, t = es._tweenArray[tid];
                t && t.stop()
            }
        }, drawStyle: function (prop, p, elem) {
            p *= 0.01;
            QZFL.object.each(prop, function (f, pname) {
                var s = f.start, e = f.end, u = f.unit;
                v = e >= s ? (e - s) * p + s : s - (s - e) * p;
                QZFL.dom.setStyle(elem, pname, v + u)
            })
        }, _tweenArray: {}, _uniqueID: 0, _opt: function (opts) {
            var opt = opts, o = QZFL.effect;
            opt.duration =
                opts.duration || 500;
            opt.easing = o.mode[1] == "css3" ? opts.easing || false : false;
            opt.complete = opts.complete || QZFL.emptyFn;
            opt.interval = opts.interval || 25;
            opt.start = opts.start || QZFL.emptyFn;
            opt.change = opts.change || QZFL.emptyFn;
            return opt
        }, _prop: function (prop, elem) {
            var fprop = {}, es = QZFL.effect, webkit = es.mode[1] == "css3", endCSSMap = {};
            QZFL.object.each(prop, function (val, pname) {
                pname = QZFL.string.camelCase(pname);
                if (QZFL.object.getType(val) == "object") {
                    var f = es._cssValue(elem, val.value, pname);
                    endCSSMap[pname] = val.value =
                        f.end + (f.unit ? f.unit : 0);
                    if (webkit)fprop[pname] = val; else fprop[pname] = f
                } else {
                    var d = es._cssValue(elem, val, pname), tmp;
                    endCSSMap[pname] = tmp = d.end + (d.unit ? d.unit : 0);
                    if (webkit)d = tmp;
                    fprop[pname] = d
                }
            });
            return[fprop, endCSSMap]
        }, _cssValue: function (elem, val, name) {
            var fnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, fprop = {}, parts = fnum.exec(val + ""), o = QZFL.effect, start = o._cur(elem, name);
            if (parts) {
                var end = parseFloat(parts[2]), unit = parts[3] || (o._cssNumber[name] ? "" : "px");
                if (unit !== "px") {
                    QZFL.dom.setStyle(elem, name, (end ||
                        1) + unit);
                    start = (end || 1) / o._cur(elem, name) * start;
                    QZFL.dom.setStyle(elem, name, start + unit)
                }
                if (parts[1])end = (parts[1] === "-=" ? -1 : 1) * end + start;
                fprop = {start: start, end: end, unit: unit}
            } else fprop = {start: start, end: val, unit: ""};
            return fprop
        }, _cssNumber: {"zIndex": true, "fontWeight": true, "opacity": true, "zoom": true, "lineHeight": true}, _cur: function (elem, p) {
            var parsed, r = QZFL.dom.getStyle(elem, p);
            if (elem != null && elem[p] != null && (!elem.style || elem.style[p] == null))return elem[p];
            return isNaN(parsed = parseFloat(r)) ? !r || r ===
                "auto" ? 0 : r : parsed
        }};
        QZFL.tweenMaker = function (startvalue, endvalue, duration, interval, opt) {
            var o = this;
            o.duration = duration || 500;
            o.interval = interval || 25;
            o.startValue = startvalue;
            o.endValue = endvalue;
            o.count = Math.ceil(o.duration / o.interval);
            o.elapse = 0;
            o.opt = opt || {};
            o.functor = o.opt.functor || function (time, startValue, changeValue, duration) {
                return changeValue * time / duration + startValue
            };
            o.onStart = QZFL.emptyFn;
            o.onChange = QZFL.emptyFn;
            o.onEnd = QZFL.emptyFn;
            o.playing = false;
            o.changeValue = o.endValue - o.startValue;
            o.currentValue =
                0
        };
        QZFL.tweenMaker.prototype = {start: function () {
            var o = this;
            o.playing = true;
            o._startTime = (new Date).getTime();
            o.onStart.apply(o);
            o._runTimer()
        }, _runTimer: function () {
            var o = this;
            if (o.playing) {
                o._playTimer((new Date).getTime() - o._startTime);
                setTimeout(function () {
                    o._runTimer.apply(o, [])
                }, o.interval)
            }
        }, _playTimer: function (time) {
            var _end = false, o = this;
            if (time > o.duration) {
                time = o.duration;
                _end = true
            }
            o.currentValue = o.functor(time, o.startValue, o.changeValue, o.duration);
            o.onChange.apply(o, [o.getPercent()]);
            if (_end) {
                o.playing =
                    false;
                o.onEnd.apply(this);
                if (window.CollectGarbage)CollectGarbage()
            }
        }, stop: function () {
            this.isPlayed = false;
            this.currentValue = this.endValue
        }, getPercent: function () {
            return(this.currentValue - this.startValue) / this.changeValue * 100
        }};
        QZFL.cssTransfrom = function (elem, prop, opts) {
            var o = this;
            o._elem = elem;
            o._uid = "uid_" + QZFL.now();
            if (!o._running && prop) {
                o._conf = prop;
                o._duration = "duration"in opts ? opts.duration / 1E3 : 0.5;
                o._delay = "delay"in opts ? opts.delay : 0;
                o._easing = opts.easing || "ease";
                o._count = 0;
                o._running = false;
                o._callback =
                    QZFL.lang.isFunction(opts.complete) ? opts.complete : QZFL.emptyFn;
                o._change = opts.change;
                elem._transition = o
            }
            return o
        };
        QZFL.cssTransfrom._cssText = {};
        QZFL.cssTransfrom._attrs = {};
        QZFL.cssTransfrom._hasEnd = {};
        QZFL.cssTransfrom.prototype = {init: function () {
            var map = [
                ["webkit", "-webkit-transition", "WebkitTransition", "webkitTransitionEnd", "WebkitTransform"],
                ["firefox", "-moz-transition", "MozTransition", "transitionend", "MozTransform"],
                ["opera", "-o-transition", "OTransition", "oTransitionEnd", "OTransform"],
                ["ie", "-ms-transition",
                    "msTransition", "MSTransitionEnd", "msTransform"]
            ], tiClassPrefix, tiStyleName, tiEvtName, tfStyleName, ua = QZFL.userAgent, proto;
            for (var i = 0, len = map.length; i < len; i++)if (ua[map[i][0]]) {
                tiClassPrefix = map[i][1];
                tiStyleName = map[i][2];
                tiEvtName = map[i][3];
                tfStyleName = map[i][4];
                break
            }
            proto = QZFL.cssTransfrom.prototype;
            proto.TRANSITION = {"classPrefix": tiClassPrefix, "event": tiEvtName, "styleName": tiStyleName};
            proto.TRANSFORM = {"styleName": tfStyleName}
        }, firecss: function () {
            var o = this, elem = o._elem, uid = o._uid, conf = this._conf,
                getStyle = QZFL.dom.getStyle, ct = QZFL.cssTransfrom, attrs;
            var cssTextArray = [], delayKey, delayVal = [], pptVal = [], durationKey, durationVal = [], easingKey, easingVal = [], TRANSFORM, cPrefix, _cprop = "", cssText;
            if (!(this.TRANSITION && this.TRANSITION.classPrefix))this.init();
            cPrefix = this.TRANSITION.classPrefix;
            delayKey = cPrefix + "-delay";
            this.pptKey = cPrefix + "-property";
            durationKey = cPrefix + "-duration";
            easingKey = cPrefix + "-timing-function";
            TRANSFORM = this.TRANSFORM.styleName;
            if (conf.transform && !conf[TRANSFORM]) {
                conf[TRANSFORM] =
                    conf.transform;
                delete conf.transform
            }
            for (var attr in conf) {
                if (conf.hasOwnProperty(attr)) {
                    o._addProperty(attr, conf[attr]);
                    if (elem.style[attr] === "")QZFL.dom.setStyle(elem, attr, getStyle(elem, attr))
                }
                _cprop = attr
            }
            pptVal.push(getStyle(elem, this.pptKey));
            if (pptVal[0] && pptVal[0] !== "all") {
                durationVal.push(getStyle(elem, durationKey));
                easingVal.push(getStyle(elem, easingKey));
                delayVal.push(getStyle(elem, delayKey))
            } else pptVal.pop();
            attrs = ct._attrs[uid];
            for (var name in attrs) {
                hyphy = o._toHyphen(name);
                attr = attrs[name];
                if (attrs.hasOwnProperty(name) && attr.transition === o)if (name in elem.style) {
                    durationVal.push(parseFloat(attr.duration) + "s");
                    delayVal.push(parseFloat(attr.delay) + "s");
                    easingVal.push(attr.easing);
                    pptVal.push(hyphy);
                    cssTextArray.push(hyphy + ": " + attr.value)
                } else o._removeProperty(name)
            }
            if (!ct._hasEnd[uid]) {
                elem.addEventListener(this.TRANSITION.event, function (e) {
                    o._onTransfromEnd(e, uid)
                }, false);
                ct._hasEnd[uid] = true
            }
            cssText = cssTextArray.join(";");
            ct._cssText[uid] = elem.style.cssText + cssText;
            elem.style.cssText +=
                ["", this.pptKey + ":" + pptVal.join(","), durationKey + ":" + durationVal.join(","), easingKey + ":" + easingVal.join(","), delayKey + ":" + delayVal.join(","), cssText, ""].join(";")
        }, _toHyphen: function (prop) {
            prop = prop.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function (m0, m1, m2, m3) {
                var str = "";
                m1 && (str += "-" + m1.toLowerCase());
                str += m2;
                m3 && (str += "-" + m3.toLowerCase());
                return str
            });
            return prop
        }, _endTransfrom: function (sname) {
            var QF = QZFL, elem = this._elem, pptKey = this.pptKey, value = QF.dom.getStyle(elem, pptKey);
            if (!value) {
                pptKey = QF.string.camelCase(pptKey);
                value = elem.style[pptKey]
            }
            if (typeof value === "string") {
                value = value.replace(new RegExp("(?:^|,\\s)" + sname + ",?"), ",");
                value = value.replace(/^,|,$/, "");
                elem.style[this.TRANSITION.styleName] = value
            }
        }, _onTransfromEnd: function (e, uid) {
            var event = e, elem = this._elem, pname = QZFL.string.camelCase(event.propertyName), elapsed = event.elapsedTime, attrs = QZFL.cssTransfrom._attrs[uid], attr = attrs && attrs[pname], tran = attr ? attr.transition : null, _cprop = "";
            if (tran) {
                for (var attr in this._conf)_cprop = attr;
                tran._removeProperty(pname);
                tran._endTransfrom(pname);
                if (tran._count <= 0)tran._end(elapsed)
            }
        }, _addProperty: function (prop, conf) {
            var o = this, node = this._elem, uid = o._uid, attrs = QZFL.cssTransfrom._attrs[uid], computed, compareVal, dur, attr, val;
            if (!attrs)attrs = QZFL.cssTransfrom._attrs[uid] = {};
            attr = attrs[prop];
            if (conf && conf.value !== undefined)val = conf.value; else if (conf !== undefined) {
                val = conf;
                conf = {}
            }
            if (attr && attr.transition)if (attr.transition !== o)attr.transition._count--;
            o._count++;
            dur = (typeof conf.duration != "undefined" ? conf.duration : o._duration) ||
                1E-4;
            attrs[prop] = {value: val, duration: dur, delay: typeof conf.delay != "undefined" ? conf.delay : o._delay, easing: conf.easing || o._easing, transition: o};
            computed = QZFL.dom.getStyle(node, prop);
            compareVal = typeof val === "string" ? computed : parseFloat(computed);
            if (compareVal === val)setTimeout(function () {
                o._onTransfromEnd.call(o, {propertyName: prop, elapsedTime: dur}, uid)
            }, dur * 1E3)
        }, _removeProperty: function (prop) {
            var o = this, attrs = QZFL.cssTransfrom._attrs[o._uid];
            if (attrs && attrs[prop]) {
                delete attrs[prop];
                o._count--
            }
        }, _end: function () {
            var o =
                this, elem = o._elem, callback = o._callback;
            o._running = false;
            o._callback = null;
            if (elem && callback)setTimeout(function () {
                callback()
            }, 1)
        }};
        QZFL.now = function () {
            return(new Date).getTime()
        };
        QZFL.string = {RegExps: {trim: /^\s*|\s*$/g, ltrim: /^\s*/, rtrim: /\s*$/, nl2br: /\n/g, s2nb: /[\x20]{2}/g, URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g}, escString: {bsls: /\\/g, nl: /\n/g, rt: /\r/g, tab: /\t/g}, restXHTML: {re_amp: /&amp;/g,
            re_lt: /&lt;/g, re_gt: /&gt;/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /&quot;/g}, write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g, isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, cut: /[\x00-\xFF]/, getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g}, format: /\{([\d\w\.]+)\}/g}, commonReplace: function (s, p, r) {
            return s.replace(p, r)
        }, listReplace: function (s, l) {
            if (QZFL.lang.isHashMap(l)) {
                for (var i in l)s = QZFL.string.commonReplace(s, l[i], i);
                return s
            } else return s + ""
        }, trim: function (str) {
            QZFL.string.RegExps.trim.lastIndex =
                0;
            return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.trim, "")
        }, ltrim: function (str) {
            return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.ltrim, "")
        }, rtrim: function (str) {
            return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.rtrim, "")
        }, nl2br: function (str) {
            return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.nl2br, "<br />")
        }, s2nb: function (str) {
            return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.s2nb, "&nbsp;&nbsp;")
        }, URIencode: function (str) {
            var cc, ccc;
            return(str + "").replace(QZFL.string.RegExps.URIencode,
                function (a) {
                    if (a == " ")return"+"; else if (a == "\r")return"";
                    cc = a.charCodeAt(0);
                    ccc = cc.toString(16);
                    return"%" + (cc < 16 ? "0" + ccc : ccc)
                })
        }, escHTML: function (str) {
            var t = QZFL.string.RegExps.escHTML;
            return QZFL.string.listReplace(str + "", {"&amp;": t.re_amp, "&lt;": t.re_lt, "&gt;": t.re_gt, "&#039;": t.re_apos, "&quot;": t.re_quot})
        }, escString: function (str) {
            var t = QZFL.string.RegExps.escString;
            return QZFL.string.listReplace(str + "", {"\\\\": t.bsls, "\\n": t.nl, "": t.rt, "\\t": t.tab, "\\'": t.re_apos, '\\"': t.re_quot})
        }, restHTML: function (str) {
            if (!QZFL.string.restHTML.__utilDiv)QZFL.string.restHTML.__utilDiv =
                document.createElement("div");
            var t = QZFL.string.restHTML.__utilDiv;
            t.innerHTML = str + "";
            if (typeof t.innerText != "undefined")return t.innerText; else if (typeof t.textContent != "undefined")return t.textContent; else if (typeof t.text != "undefined")return t.text; else return""
        }, restXHTML: function (str) {
            var t = QZFL.string.RegExps.restXHTML;
            return QZFL.string.listReplace(str + "", {"<": t.re_lt, ">": t.re_gt, "'": t.re_apos, '"': t.re_quot, "&": t.re_amp})
        }, write: function (strFormat, someArgs) {
            if (arguments.length < 1 || !QZFL.lang.isString(strFormat))return"";
            var rArr = QZFL.lang.arg2arr(arguments), result = rArr.shift(), tmp;
            return result.replace(QZFL.string.RegExps.write, function (a, b, c) {
                b = parseInt(b, 10);
                if (b < 0 || typeof rArr[b] == "undefined")return"(n/a)"; else if (!c)return rArr[b]; else switch (c) {
                    case "x":
                        return"0x" + rArr[b].toString(16);
                    case "o":
                        return"o" + rArr[b].toString(8);
                    case "d":
                        return rArr[b].toString(10);
                    case "Q":
                        return'"' + rArr[b].toString(16) + '"';
                    case "q":
                        return"`" + rArr[b].toString(16) + "'";
                    case "b":
                        return"<" + !!rArr[b] + ">"
                }
            })
        }, isURL: function (s) {
            return QZFL.string.RegExps.isURL.test(s)
        },
            customEncode: function (s, type) {
                var r;
                if (typeof type == "undefined")type = "";
                switch (type.toUpperCase()) {
                    case "URICPT":
                        r = encodeURIComponent(s);
                        break;
                    default:
                        r = encodeURIComponent(s)
                }
                return r
            }, escapeURI: function (s) {
                if (window.encodeURIComponent)return encodeURIComponent(s);
                if (window.escape)return escape(s);
                return""
            }, fillLength: function (source, length, ch, isRight) {
                source = source + "";
                if (source.length < length) {
                    var res = (1 << length - source.length).toString(2).substring(1);
                    if (ch)res = res.replace("0", ch).substring(1);
                    return isRight ?
                        source + res : res + source
                } else return source
            }, cut: function (str, bitLen, tails) {
                str += "";
                bitLen -= 0;
                tails = tails || "";
                if (isNaN(bitLen))return str;
                var len = str.length, i = Math.min(Math.floor(bitLen / 2), len), cnt = QZFL.string.getRealLen(str.slice(0, i));
                for (; i < len && cnt < bitLen; i++)cnt += 1 + !QZFL.string.RegExps.cut.test(str.charAt(i));
                return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : "")
            }, getRealLen: function (s, isUTF8) {
                if (typeof s != "string")return 0;
                if (!isUTF8)return s.replace(QZFL.string.RegExps.getRealLen.r0, "**").length;
                else {
                    var cc = s.replace(QZFL.string.RegExps.getRealLen.r1, "");
                    return s.length - cc.length + encodeURI(cc).length / 3
                }
            }, format: function (str) {
                var args = Array.prototype.slice.call(arguments), v;
                str = args.shift() + "";
                if (args.length == 1 && typeof args[0] == "object")args = args[0];
                QZFL.string.RegExps.format.lastIndex = 0;
                return str.replace(QZFL.string.RegExps.format, function (m, n) {
                    v = QZFL.object.route(args, n);
                    return v === undefined ? m : v
                })
            }, camelCase: function (s) {
                var r = /-([a-z])/ig;
                return s.replace(r, function (all, letter) {
                    return letter.toUpperCase()
                })
            }};
        QZFL.util = {buildUri: function (s) {
            return new QZFL.util.URI(s)
        }, URI: function (s) {
            if (!(QZFL.object.getType(s) == "string"))return null;
            if (s.indexOf("://") < 1)s = location.protocol + "//" + location.host + (s.indexOf("/") == 0 ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + s;
            var depart = s.split("://");
            if (QZFL.object.getType(depart) == "array" && depart.length > 1 && /^[a-zA-Z]+$/.test(depart[0])) {
                this.protocol = depart[0].toLowerCase();
                var h = depart[1].split("/");
                if (QZFL.object.getType(h) == "array") {
                    this.host =
                        h[0];
                    this.pathname = "/" + h.slice(1).join("/").replace(/(\?|\#).+/i, "");
                    this.href = s;
                    var se = depart[1].lastIndexOf("?"), ha = depart[1].lastIndexOf("#");
                    this.search = se >= 0 ? depart[1].substring(se) : "";
                    this.hash = ha >= 0 ? depart[1].substring(ha) : "";
                    if (this.search.length > 0 && this.hash.length > 0)if (ha < se)this.search = ""; else this.search = depart[1].substring(se, ha);
                    return this
                } else return null
            } else return null
        }};
        QZFL.Tween = function (elem, prop, func, startValue, finishValue, duration) {
            var o = this;
            o.elem = QZFL.dom.get(elem);
            o.prop =
            {};
            o.sv = startValue;
            o.fv = finishValue;
            o.pname = prop;
            o.prop[prop] = parseInt(finishValue);
            o.opts = {duration: duration * 1E3};
            o.onMotionStart = QZFL.emptyFn;
            o.onMotionChange = null;
            o.onMotionStop = QZFL.emptyFn;
            o.css = true
        };
        QZFL.Tween.prototype.start = function () {
            var o = this, s = parseInt(o.sv), e = parseInt(o.fv);
            var set = QZFL.dom.setStyle(o.elem, o.pname, o.sv);
            if (set) {
                o.opts.complete = o.onMotionStop;
                o.opts.change = function (p) {
                    p *= 0.01;
                    var v = e >= s ? (e - s) * p + s : s - (s - e) * p;
                    o.onMotionChange && o.onMotionChange.apply(o, [o.elem, o.pname, v])
                };
                o.onMotionStart.apply(o);
                QZFL.effect.run(o.elem, o.prop, o.opts)
            } else {
                o.css = false;
                var t = new QZFL.tweenMaker(s, e, o.opts.duration, o.opts.interval || 15);
                t.onStart = function () {
                    o.t = t;
                    o.onMotionStart.apply(o)
                };
                t.onChange = function (p) {
                    p *= 0.01;
                    var v = e >= s ? (e - s) * p + s : s - (s - e) * p;
                    o.onMotionChange && o.onMotionChange.apply(o, [o.elem, o.pname, v])
                };
                t.onEnd = function () {
                    o.onMotionStop.apply(o)
                };
                t.start()
            }
        };
        QZFL.Tween.prototype.getPercent = function () {
            return this.css ? QZFL.effect.getPercent(this.elem) : this.t.getPercent()
        };
        QZFL.Tween.prototype.stop =
            function () {
                QZFL.effect.stop(this.elem)
            };
        QZFL.transitions = {};
        QZFL.media = {_tempImageList: [], _flashVersion: null, getImageInfo: function () {
            var _getInfo = function (img, callback, opts) {
                if (img) {
                    var _w = opts.ow || img.width, _h = opts.oh || img.height, r, ls, ss, d;
                    if (_w && _h) {
                        if (_w >= _h) {
                            ls = _w;
                            ss = _h;
                            d = ["width", "height"]
                        } else {
                            ls = _h;
                            ss = _w;
                            d = ["height", "width"]
                        }
                        r = {direction: d, rate: ls / ss, longSize: ls, shortSize: ss};
                        r.ow = _w;
                        r.oh = _h
                    }
                    QZFL.lang.isFunction(callback) && callback(img, r, opts)
                }
            };
            return function (callback, opts) {
                opts = opts || {};
                if (QZFL.lang.isString(opts.trueSrc)) {
                    var _i = new Image;
                    _i.onload = function (ele, cb, p) {
                        return function () {
                            _getInfo(ele, cb, p);
                            ele = ele.onerror = ele.onload = null
                        }
                    }(_i, callback, opts);
                    _i.onerror = function (ele, cb, p) {
                        return function () {
                            if (typeof p.errCallback == "function")p.errCallback();
                            ele = ele.onerror = ele.onload = null
                        }
                    }(_i, callback, opts);
                    _i.src = opts.trueSrc
                } else if (QZFL.lang.isElement(opts.img))_getInfo(opts.img, callback, opts)
            }
        }(), adjustImageSize: function (w, h, trueSrc, callback, errCallback) {
            var opts = {trueSrc: trueSrc,
                callback: function (cb) {
                    return function (o, type, ew, eh, p) {
                        QZFL.lang.isFunction(cb) && cb(o, ew, eh, null, p.ow, p.oh, p)
                    }
                }(callback), errCallback: errCallback};
            QZFL.media.reduceImage(0, w, h, opts)
        }, getFlashHtml: function (flashArguments, requiredVersion, flashPlayerCID) {
            var _attrs = [], _params = [];
            for (var k in flashArguments)switch (k) {
                case "noSrc":
                case "movie":
                    continue;
                    break;
                case "id":
                case "name":
                case "width":
                case "height":
                case "style":
                    if (typeof flashArguments[k] != "undefined")_attrs.push(" ", k, '="', flashArguments[k], '"');
                    break;
                case "src":
                    if (QZFL.userAgent.ie)_params.push('<param name="movie" value="', flashArguments.noSrc ? "" : flashArguments[k], '"/>'); else _attrs.push(' data="', flashArguments.noSrc ? "" : flashArguments[k], '"');
                    break;
                default:
                    _params.push('<param name="', k, '" value="', flashArguments[k], '" />')
            }
            if (QZFL.userAgent.ie)_attrs.push(' classid="clsid:', flashPlayerCID || "D27CDB6E-AE6D-11cf-96B8-444553540000", '"'); else _attrs.push(' type="application/x-shockwave-flash"');
            if (requiredVersion && requiredVersion instanceof
                QZFL.media.SWFVersion) {
                var _ver = QZFL.media.getFlashVersion().major, _needVer = requiredVersion.major;
                _attrs.push(' codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=', requiredVersion, '"')
            }
            return"<object" + _attrs.join("") + ">" + _params.join("") + "</object>"
        }, insertFlash: function (containerElement, flashArguments) {
            if (!containerElement || typeof containerElement.innerHTML == "undefined")return false;
            flashArguments = flashArguments || {};
            flashArguments.src = flashArguments.src || "";
            flashArguments.width =
                flashArguments.width || "100%";
            flashArguments.height = flashArguments.height || "100%";
            flashArguments.noSrc = true;
            containerElement.innerHTML = QZFL.media.getFlashHtml(flashArguments);
            var f = containerElement.firstChild;
            if (QZFL.userAgent.ie)setTimeout(function () {
                try {
                    f.LoadMovie(0, flashArguments.src)
                } catch (ign) {
                }
            }, 0); else f.setAttribute("data", flashArguments.src);
            return true
        }, getWMMHtml: function (wmpArguments, cid) {
            var params = [], objArgm = [];
            for (var k in wmpArguments)switch (k) {
                case "id":
                case "width":
                case "height":
                case "style":
                case "src":
                    objArgm.push(" ",
                        k, '="', wmpArguments[k], '"');
                    break;
                default:
                    objArgm.push(" ", k, '="', wmpArguments[k], '"');
                    params.push('<param name="', k, '" value="', wmpArguments[k], '" />')
            }
            if (wmpArguments["src"])params.push('<param name="URL" value="', wmpArguments["src"], '" />');
            if (QZFL.userAgent.ie)return'<object classid="' + (cid || "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6") + '" ' + objArgm.join("") + ">" + params.join("") + "</object>"; else return"<embed " + objArgm.join("") + "></embed>"
        }};
        QZFL.media.SWFVersion = function () {
            var a;
            if (arguments.length >
                1)a = arg2arr(arguments); else if (arguments.length == 1)if (typeof arguments[0] == "object")a = arguments[0]; else if (typeof arguments[0] == "number")a = [arguments[0]]; else a = []; else a = [];
            this.major = parseInt(a[0], 10) || 0;
            this.minor = parseInt(a[1], 10) || 0;
            this.rev = parseInt(a[2], 10) || 0;
            this.add = parseInt(a[3], 10) || 0
        };
        QZFL.media.SWFVersion.prototype.toString = function (spliter) {
            return[this.major, this.minor, this.rev, this.add].join(typeof spliter == "undefined" ? "," : spliter)
        };
        QZFL.media.SWFVersion.prototype.toNumber = function () {
            var se =
                0.001;
            return this.major + this.minor * se + this.rev * se * se + this.add * se * se * se
        };
        QZFL.media.getFlashVersion = function () {
            if (!QZFL.media._flashVersion) {
                var resv = 0;
                if (navigator.plugins && navigator.mimeTypes.length) {
                    var x = navigator.plugins["Shockwave Flash"];
                    if (x && x.description)resv = x.description.replace(/(?:[a-z]|[A-Z]|\s)+/, "").replace(/(?:\s+r|\s+b[0-9]+)/, ".").split(".")
                } else {
                    try {
                        for (var i = resv = 6, axo = new Object; axo != null; ++i) {
                            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                            resv = i
                        }
                    } catch (e) {
                        if (resv ==
                            6)resv = 0;
                        resv = Math.max(resv - 1, 0)
                    }
                    try {
                        resv = new QZFL.media.SWFVersion(axo.GetVariable("$version").split(" ")[1].split(","))
                    } catch (ignore) {
                    }
                }
                if (!(resv instanceof QZFL.media.SWFVersion))resv = new QZFL.media.SWFVersion(resv);
                if (resv.major < 3)resv.major = 0;
                QZFL.media._flashVersion = resv
            }
            return QZFL.media._flashVersion
        };
        QZFL.media.reduceImage = function () {
            var doReduce = function (o, type, ew, eh, p, cb) {
                var rl, k;
                if (p.rate == 1) {
                    p.direction[0] = ew > eh ? "height" : "width";
                    p.direction[1] = ew > eh ? "width" : "height"
                }
                rl = p.direction[type] ==
                    "width" ? ew : eh;
                type ? (rl > p.shortSize ? rl = p.shortSize : 1) && (p.k = p.shortSize / rl) : (rl > p.longSize ? rl = p.longSize : 1) && (p.k = p.longSize / rl);
                o.setAttribute(p.direction[type], rl);
                QZFL.lang.isFunction(cb) && cb(o, type, ew, eh, p)
            };
            return function (type, ew, eh, opts) {
                opts = opts || {};
                opts.img = QZFL.lang.isNode(opts.img) ? opts.img : QZFL.event.getTarget();
                opts.img.onload = null;
                opts.trueSrc && (opts.img.src = opts.trueSrc);
                if (opts.img)if (!(opts.direction && opts.rate && opts.longSize && opts.shortSize))r = QZFL.media.getImageInfo(function (o, p) {
                    if (!o || !p)return;
                    doReduce(opts.img, type, ew, eh, p, opts.callback)
                }, opts); else doReduce(opts.img, type, ew, eh, opts, opts.callback)
            }
        }();
        QZFL.media.imagePlusUrl = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/smart_image.js?max_age=1209603";
        QZFL.media.smartImage = function (w, h, params) {
            params = params || {};
            params.img = QZFL.lang.isNode(params.img) ? params.img : QZFL.event.getTarget();
            QZFL.imports(QZFL.media.imagePlusUrl, function (w, h, params) {
                return function () {
                    QZFL.media.smartImage(w, h, params)
                }
            }(w, h, params))
        };
        QZFL.media.reduceImgByRule = function (ew, eh, opts, cb) {
            opts = opts || {};
            opts.img = QZFL.lang.isNode(opts.img) ? opts.img : QZFL.event.getTarget();
            QZFL.imports(QZFL.media.imagePlusUrl, function (ew, eh, opts, cb) {
                return function () {
                    QZFL.media.reduceImgByRule(ew, eh, opts, cb)
                }
            }(ew, eh, opts, cb))
        }
    };
    QSTRING.base = function () {
        if (typeof QS == "undefined" || !QS)window.QSFL = window.QS = {};
        if (typeof QS.lang == "undefined" || !QS)QS.lang = {};
        QS.lang.getType = function (o) {
            return o === null ? "null" : o === undefined ? "undefined" : Object.prototype.toString.call(o).slice(8,
                -1).toLowerCase()
        };
        QS.lang.isString = function (o) {
            return QS.lang.getType(o) == "string"
        };
        QS.lang.isArray = function (o) {
            return QS.lang.getType(o) == "array"
        };
        QS.lang.isFunction = function (o) {
            return QS.lang.getType(o) == "function"
        };
        QS.lang.isObject = function (o) {
            return QS.lang.getType(o) == "object"
        };
        QS.lang.isBoolean = function (o) {
            return QS.lang.getType(o) == "boolean"
        };
        QS.lang.dateFormat = function (date, format) {
            function LENFix(i, n) {
                var sRet = i.toString();
                while (sRet.length < n)sRet = "0" + sRet;
                return sRet
            }

            var mapData = {"%Y": date.getFullYear(),
                "%m": LENFix(date.getMonth() + 1, 2), "%d": LENFix(date.getDate(), 2), "%H": LENFix(date.getHours(), 2), "%M": LENFix(date.getMinutes(), 2), "%S": LENFix(date.getSeconds(), 2)};
            return format.replace(/%[YmdHMS]/g, function (sData) {
                return mapData[sData]
            })
        };
        if (!QS.string)QS.string = QZFL.string;
        QS.string.huffman = {algorithm: {encode: function (sData) {
            function v() {
                return String.fromCharCode.apply(null, arguments)
            }

            var m = [];
            m[48] = [1, v(0)];
            m[57] = [6, v(1)];
            m[124] = [6, v(33)];
            m[46] = [5, v(17)];
            m[49] = [4, v(9)];
            m[54] = [6, v(5)];
            m[56] = [6, v(37)];
            m[52] = [5, v(21)];
            m[50] = [6, v(13)];
            m[38] = [8, v(45, 0)];
            m[10] = [9, v(173, 0)];
            m[70] = [10, v(173, 1)];
            m[100] = [15, v(173, 3)];
            m[105] = [16, v(173, 67, 0)];
            m[65] = [18, v(173, 195, 0)];
            m[69] = [18, v(173, 195, 2)];
            m[4] = [23, v(173, 195, 1)];
            m[5] = [23, v(173, 195, 65)];
            m[2] = [23, v(173, 195, 33)];
            m[3] = [23, v(173, 195, 97)];
            m[8] = [23, v(173, 195, 17)];
            m[9] = [23, v(173, 195, 81)];
            m[6] = [23, v(173, 195, 49)];
            m[7] = [23, v(173, 195, 113)];
            m[34] = [22, v(173, 195, 9)];
            m[36] = [22, v(173, 195, 41)];
            m[0] = [23, v(173, 195, 25)];
            m[1] = [23, v(173, 195, 89)];
            m[33] = [22, v(173, 195, 57)];
            m[22] =
                [23, v(173, 195, 5)];
            m[23] = [23, v(173, 195, 69)];
            m[20] = [23, v(173, 195, 37)];
            m[21] = [23, v(173, 195, 101)];
            m[26] = [23, v(173, 195, 21)];
            m[27] = [23, v(173, 195, 85)];
            m[24] = [23, v(173, 195, 53)];
            m[25] = [23, v(173, 195, 117)];
            m[13] = [23, v(173, 195, 13)];
            m[14] = [23, v(173, 195, 77)];
            m[11] = [23, v(173, 195, 45)];
            m[12] = [23, v(173, 195, 109)];
            m[18] = [23, v(173, 195, 29)];
            m[19] = [23, v(173, 195, 93)];
            m[15] = [23, v(173, 195, 61)];
            m[17] = [23, v(173, 195, 125)];
            m[62] = [22, v(173, 195, 3)];
            m[64] = [22, v(173, 195, 35)];
            m[59] = [22, v(173, 195, 19)];
            m[60] = [22, v(173, 195, 51)];
            m[84] =
                [22, v(173, 195, 11)];
            m[91] = [22, v(173, 195, 43)];
            m[78] = [22, v(173, 195, 27)];
            m[83] = [22, v(173, 195, 59)];
            m[41] = [22, v(173, 195, 7)];
            m[42] = [22, v(173, 195, 39)];
            m[39] = [22, v(173, 195, 23)];
            m[40] = [22, v(173, 195, 55)];
            m[47] = [22, v(173, 195, 15)];
            m[58] = [22, v(173, 195, 47)];
            m[43] = [22, v(173, 195, 31)];
            m[44] = [22, v(173, 195, 63)];
            m[67] = [14, v(173, 35)];
            m[117] = [13, v(173, 19)];
            m[103] = [16, v(173, 11, 0)];
            m[165] = [23, v(173, 139, 0)];
            m[166] = [23, v(173, 139, 64)];
            m[162] = [23, v(173, 139, 32)];
            m[164] = [23, v(173, 139, 96)];
            m[169] = [23, v(173, 139, 16)];
            m[170] = [23, v(173,
                139, 80)];
            m[167] = [23, v(173, 139, 48)];
            m[168] = [23, v(173, 139, 112)];
            m[156] = [23, v(173, 139, 8)];
            m[157] = [23, v(173, 139, 72)];
            m[154] = [23, v(173, 139, 40)];
            m[155] = [23, v(173, 139, 104)];
            m[160] = [23, v(173, 139, 24)];
            m[161] = [23, v(173, 139, 88)];
            m[158] = [23, v(173, 139, 56)];
            m[159] = [23, v(173, 139, 120)];
            m[181] = [23, v(173, 139, 4)];
            m[182] = [23, v(173, 139, 68)];
            m[179] = [23, v(173, 139, 36)];
            m[180] = [23, v(173, 139, 100)];
            m[185] = [23, v(173, 139, 20)];
            m[186] = [23, v(173, 139, 84)];
            m[183] = [23, v(173, 139, 52)];
            m[184] = [23, v(173, 139, 116)];
            m[173] = [23, v(173, 139,
                12)];
            m[174] = [23, v(173, 139, 76)];
            m[171] = [23, v(173, 139, 44)];
            m[172] = [23, v(173, 139, 108)];
            m[177] = [23, v(173, 139, 28)];
            m[178] = [23, v(173, 139, 92)];
            m[175] = [23, v(173, 139, 60)];
            m[176] = [23, v(173, 139, 124)];
            m[132] = [23, v(173, 139, 2)];
            m[133] = [23, v(173, 139, 66)];
            m[130] = [23, v(173, 139, 34)];
            m[131] = [23, v(173, 139, 98)];
            m[136] = [23, v(173, 139, 18)];
            m[137] = [23, v(173, 139, 82)];
            m[134] = [23, v(173, 139, 50)];
            m[135] = [23, v(173, 139, 114)];
            m[30] = [23, v(173, 139, 10)];
            m[31] = [23, v(173, 139, 74)];
            m[28] = [23, v(173, 139, 42)];
            m[29] = [23, v(173, 139, 106)];
            m[128] =
                [23, v(173, 139, 26)];
            m[129] = [23, v(173, 139, 90)];
            m[32] = [23, v(173, 139, 58)];
            m[127] = [23, v(173, 139, 122)];
            m[148] = [23, v(173, 139, 6)];
            m[149] = [23, v(173, 139, 70)];
            m[146] = [23, v(173, 139, 38)];
            m[147] = [23, v(173, 139, 102)];
            m[152] = [23, v(173, 139, 22)];
            m[153] = [23, v(173, 139, 86)];
            m[150] = [23, v(173, 139, 54)];
            m[151] = [23, v(173, 139, 118)];
            m[140] = [23, v(173, 139, 14)];
            m[141] = [23, v(173, 139, 78)];
            m[138] = [23, v(173, 139, 46)];
            m[139] = [23, v(173, 139, 110)];
            m[144] = [23, v(173, 139, 30)];
            m[145] = [23, v(173, 139, 94)];
            m[142] = [23, v(173, 139, 62)];
            m[143] = [23, v(173,
                139, 126)];
            m[230] = [23, v(173, 139, 1)];
            m[231] = [23, v(173, 139, 65)];
            m[228] = [23, v(173, 139, 33)];
            m[229] = [23, v(173, 139, 97)];
            m[234] = [23, v(173, 139, 17)];
            m[235] = [23, v(173, 139, 81)];
            m[232] = [23, v(173, 139, 49)];
            m[233] = [23, v(173, 139, 113)];
            m[222] = [23, v(173, 139, 9)];
            m[223] = [23, v(173, 139, 73)];
            m[220] = [23, v(173, 139, 41)];
            m[221] = [23, v(173, 139, 105)];
            m[226] = [23, v(173, 139, 25)];
            m[227] = [23, v(173, 139, 89)];
            m[224] = [23, v(173, 139, 57)];
            m[225] = [23, v(173, 139, 121)];
            m[246] = [23, v(173, 139, 5)];
            m[247] = [23, v(173, 139, 69)];
            m[244] = [23, v(173, 139, 37)];
            m[245] = [23, v(173, 139, 101)];
            m[250] = [23, v(173, 139, 21)];
            m[251] = [23, v(173, 139, 85)];
            m[248] = [23, v(173, 139, 53)];
            m[249] = [23, v(173, 139, 117)];
            m[238] = [23, v(173, 139, 13)];
            m[239] = [23, v(173, 139, 77)];
            m[236] = [23, v(173, 139, 45)];
            m[237] = [23, v(173, 139, 109)];
            m[242] = [23, v(173, 139, 29)];
            m[243] = [23, v(173, 139, 93)];
            m[240] = [23, v(173, 139, 61)];
            m[241] = [23, v(173, 139, 125)];
            m[198] = [23, v(173, 139, 3)];
            m[199] = [23, v(173, 139, 67)];
            m[196] = [23, v(173, 139, 35)];
            m[197] = [23, v(173, 139, 99)];
            m[202] = [23, v(173, 139, 19)];
            m[203] = [23, v(173, 139, 83)];
            m[200] =
                [23, v(173, 139, 51)];
            m[201] = [23, v(173, 139, 115)];
            m[189] = [23, v(173, 139, 11)];
            m[190] = [23, v(173, 139, 75)];
            m[187] = [23, v(173, 139, 43)];
            m[188] = [23, v(173, 139, 107)];
            m[194] = [23, v(173, 139, 27)];
            m[195] = [23, v(173, 139, 91)];
            m[192] = [23, v(173, 139, 59)];
            m[193] = [23, v(173, 139, 123)];
            m[214] = [23, v(173, 139, 7)];
            m[215] = [23, v(173, 139, 71)];
            m[212] = [23, v(173, 139, 39)];
            m[213] = [23, v(173, 139, 103)];
            m[218] = [23, v(173, 139, 23)];
            m[219] = [23, v(173, 139, 87)];
            m[216] = [23, v(173, 139, 55)];
            m[217] = [23, v(173, 139, 119)];
            m[206] = [23, v(173, 139, 15)];
            m[207] = [23,
                v(173, 139, 79)];
            m[204] = [23, v(173, 139, 47)];
            m[205] = [23, v(173, 139, 111)];
            m[210] = [23, v(173, 139, 31)];
            m[211] = [23, v(173, 139, 95)];
            m[208] = [23, v(173, 139, 63)];
            m[209] = [23, v(173, 139, 127)];
            m[102] = [16, v(173, 75, 0)];
            m[72] = [20, v(173, 203, 0)];
            m[82] = [20, v(173, 203, 8)];
            m[96] = [22, v(173, 203, 4)];
            m[112] = [22, v(173, 203, 36)];
            m[93] = [22, v(173, 203, 20)];
            m[94] = [22, v(173, 203, 52)];
            m[123] = [22, v(173, 203, 12)];
            m[125] = [22, v(173, 203, 44)];
            m[118] = [22, v(173, 203, 28)];
            m[121] = [22, v(173, 203, 60)];
            m[80] = [21, v(173, 203, 2)];
            m[81] = [21, v(173, 203, 18)];
            m[254] =
                [23, v(173, 203, 10)];
            m[255] = [23, v(173, 203, 74)];
            m[252] = [23, v(173, 203, 42)];
            m[253] = [23, v(173, 203, 106)];
            m[61] = [21, v(173, 203, 26)];
            m[99] = [20, v(173, 203, 6)];
            m[88] = [21, v(173, 203, 14)];
            m[126] = [22, v(173, 203, 30)];
            m[120] = [22, v(173, 203, 62)];
            m[75] = [20, v(173, 203, 1)];
            m[79] = [20, v(173, 203, 9)];
            m[16] = [21, v(173, 203, 5)];
            m[163] = [22, v(173, 203, 21)];
            m[191] = [22, v(173, 203, 53)];
            m[89] = [20, v(173, 203, 13)];
            m[97] = [19, v(173, 203, 3)];
            m[109] = [19, v(173, 203, 7)];
            m[101] = [15, v(173, 43)];
            m[107] = [21, v(173, 107, 0)];
            m[122] = [21, v(173, 107, 16)];
            m[85] =
                [21, v(173, 107, 8)];
            m[106] = [21, v(173, 107, 24)];
            m[71] = [20, v(173, 107, 4)];
            m[76] = [20, v(173, 107, 12)];
            m[63] = [19, v(173, 107, 2)];
            m[87] = [20, v(173, 107, 6)];
            m[90] = [20, v(173, 107, 14)];
            m[92] = [19, v(173, 107, 1)];
            m[73] = [21, v(173, 107, 5)];
            m[98] = [21, v(173, 107, 21)];
            m[74] = [20, v(173, 107, 13)];
            m[114] = [21, v(173, 107, 3)];
            m[119] = [21, v(173, 107, 19)];
            m[104] = [21, v(173, 107, 11)];
            m[113] = [21, v(173, 107, 27)];
            m[68] = [19, v(173, 107, 7)];
            m[116] = [16, v(173, 235, 0)];
            m[37] = [14, v(173, 27)];
            m[66] = [16, v(173, 59, 0)];
            m[108] = [17, v(173, 187, 0)];
            m[115] = [17, v(173,
                187, 1)];
            m[111] = [16, v(173, 123, 0)];
            m[110] = [16, v(173, 251, 0)];
            m[77] = [11, v(173, 7)];
            m[45] = [9, v(109, 0)];
            m[86] = [9, v(109, 1)];
            m[35] = [8, v(237, 0)];
            m[53] = [6, v(29)];
            m[55] = [7, v(61)];
            m[51] = [7, v(125)];
            m[95] = [2, v(3)];
            var nByte = 0;
            var nBit = 0;
            var sResult = "";
            sResult += String.fromCharCode(Math.floor(sData.length / 256) % 256);
            sResult += String.fromCharCode(sData.length % 256);
            for (var i = 0; i < sData.length; i++)for (var j = 0; j < m[sData.charCodeAt(i)][0]; j++) {
                nByte |= (m[sData.charCodeAt(i)][1].charCodeAt(j / 8) >> j % 8 & 1) << nBit;
                if (++nBit == 8) {
                    sResult +=
                        String.fromCharCode(nByte);
                    nByte = 0;
                    nBit = 0
                }
            }
            if (nBit > 0)sResult += String.fromCharCode(nByte);
            return sResult
        }, conv64: function (sData) {
            var mapSymbol = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-", "_"];
            var nByte = 0;
            var nBit = 0;
            var sResult = "";
            for (var i = 0; i < sData.length; i++)for (var j = 0; j < 8; j++) {
                nByte |= (sData.charCodeAt(i) >>
                    7 - j & 1) << 5 - nBit;
                if (++nBit == 6) {
                    sResult += mapSymbol[nByte];
                    nByte = 0;
                    nBit = 0
                }
            }
            if (nBit > 0)sResult += mapSymbol[nByte];
            return sResult
        }, encodeQQShow: function (sData) {
            if (sData.length > 1024 * 6)return"";
            return"Z2" + this.conv64(this.encode(sData))
        }}, encodeQQShow: function (sData) {
            return this.algorithm.encodeQQShow(sData)
        }};
        QS.string.capitalize = function (s) {
            return s.replace(/(^|\s+)\w/g, function (s) {
                return s.toUpperCase()
            })
        };
        QS.string._tk_hash = function (str) {
            var hash = 5381;
            for (var i = 0, len = str.length; i < len; ++i)hash += (hash << 5) +
                str.charCodeAt(i);
            return hash & 2147483647
        };
        QS.string.getAntiCSRFToken = function () {
            return QS.string._tk_hash(QSFL.cookie.get("skey"))
        };
        QS.string.getAntiCSRFPair = function () {
            var skey = QS.cookie.get("skey"), QS_TK_KEY = "qs_tk", qs_tk;
            if (skey)return["g_tk", QS.string._tk_hash(skey)]; else {
                qs_tk = QS.cookie.get(QS_TK_KEY);
                if (!qs_tk) {
                    qs_tk = parseInt(100 * Math.random() + 1, 10).toString();
                    QS.cookie.set(QS_TK_KEY, qs_tk)
                }
                return[QS_TK_KEY, QS.string._tk_hash(qs_tk)]
            }
        };
        QS.string.escUrl = function (s) {
            return escape(s).replace(/\+/g,
                "%2B")
        };
        QS.string.escAttr = function (s) {
            s = s || "";
            return s.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            })
        };
        QS.string.asclen = function (s) {
            return s.replace(/[\u0100-\uffff]/g, "  ").length
        };
        QS.string.splitByBytes = function (name, maxLength, extend) {
            _maxLength = maxLength || 6;
            if (typeof extend == "undefined")extend = "...";
            var _length = QS.string.asclen(name);
            var _aTmp = [], j = 0, _name;
            if (_length > _maxLength * 2)for (var i = 0; i < _length; i++) {
                _name = name.substr(i, 1);
                j += QS.string.asclen(_name);
                if (j > (_maxLength - 1) * 2)return _aTmp.join("") + extend; else _aTmp.push(_name)
            } else return name
        };
        QS.env = {UIN: {MIN: 1E4, MAX: 4294967294, BEGIN: 1E4, END: 4294967295, CONSTANT_END: 0}, DOMAIN: {QQSHOW: "show.qq.com", CONSTANT_END: 0}, oWindow: top, setWindow: function (oWindow) {
            this.oWindow = oWindow
        }, getWindow: function () {
            return this.oWindow
        }};
        QS.userAgent = function () {
            return QZFL.userAgent
        }();
        QS.userAgent.isIE = function () {
            return QS.userAgent.ie > 0
        };
        QS.userAgent.isIE6 = function () {
            return QS.userAgent.ie == 6
        };
        QS.userAgent.isIE7 = function () {
            return QS.userAgent.ie ==
                7
        };
        QS.userAgent.isIE8 = function () {
            return QS.userAgent.ie == 8
        };
        QS.userAgent.isIE11 = function () {
            return QS.userAgent.ie == 11
        };
        QS.userAgent.isFireFox = function () {
            return QS.userAgent.firefox > 0
        };
        QS.userAgent.isOpera = function () {
            return QS.userAgent.opera > 0
        };
        QS.userAgent.isChrome = function () {
            return QS.userAgent.chrome > 0
        };
        QS.userAgent.isSafari = function () {
            return QS.userAgent.safari > 0
        };
        QS.userAgent.isWebKit = function () {
            return navigator.userAgent.indexOf("AppleWebKit") > -1
        };
        QS.userAgent.isTT = function () {
            var bIsTT = true;
            try {
                var version = window.external.getTTVerStr()
            } catch (all) {
                bIsTT = false
            }
            return bIsTT
        };
        QS.userAgent.is360SE = function () {
            return navigator.userAgent.toLowerCase().indexOf("360se") > 0
        };
        QS.userAgent.isMaxthon = function () {
            return navigator.userAgent.toLowerCase().indexOf("maxthon") > 0
        };
        QS.userAgent.isTheworld = function () {
            return navigator.userAgent.toLowerCase().indexOf("theworld") > 0
        };
        QS.userAgent.support = {localStorage: function () {
            var result = false;
            try {
                result = !!window.localStorage
            } catch (e) {
            }
            return result
        }};
        QS.$e = QZFL.element.get;
        QS.effect = QZFL.effect;
        QS.cookie = {_findWindow: function (sDomain, oWin) {
            if (!oWin) {
                if (window.location.hostname.indexOf(sDomain) >= 0)return window;
                return arguments.callee.apply(this, [sDomain, top])
            }
            try {
                if (oWin.location.hostname.indexOf(sDomain) >= 0)return oWin
            } catch (e) {
            }
            var _oFind;
            for (var i = 0; i < oWin.frames.length; ++i) {
                _oFind = arguments.callee.apply(this, [sDomain, oWin.frames[i]]);
                if (_oFind)return _oFind
            }
            return null
        }, set: function (name, sValue, nExpireSec, sDomain, sPath) {
            sDomain = sDomain || "show.qq.com";
            sPath = sPath ||
                "/";
            var _sCookie = name + "=" + escape(sValue) + ";";
            if (document.cookie.length + _sCookie.length >= 4096)return false;
            if (nExpireSec) {
                var oDate = new Date;
                oDate.setTime(oDate.getTime() + parseInt(nExpireSec) * 1E3);
                _sCookie += "expires=" + oDate.toUTCString() + ";"
            }
            if (sDomain)_sCookie += "domain=" + sDomain + ";";
            if (sPath)_sCookie += "path=" + sPath + ";";
            var _oWin = this._findWindow(sDomain);
            if (!_oWin)return false;
            try {
                _oWin.document.cookie = _sCookie
            } catch (e) {
                return false
            }
            return true
        }, get: function (name, sDomain) {
            sDomain = sDomain || "show.qq.com";
            var _oWin = sDomain ? this._findWindow(sDomain) || window : window;
            return QS.param.get(_oWin.document.cookie, name, "; ", "=")
        }};
        QS.dom = {getById: function (sId) {
            return QZFL.dom.getById.apply(QZFL.dom, [sId])
        }, get: function (e) {
            return QZFL.dom.get.apply(QZFL.dom, [e])
        }, getPosition: function (el) {
            return QZFL.dom.getPosition.apply(QZFL.dom, [el])
        }, setPosition: function (el, pos) {
            QZFL.dom.setPosition.apply(QZFL.dom, [el, pos])
        }, getXY: function (el) {
            return QZFL.dom.getXY.apply(QZFL.dom, [el])
        }, setXY: function (el, x, y) {
            QZFL.dom.setXY.apply(QZFL.dom,
                [el, x, y])
        }, getSize: function (el) {
            return QZFL.dom.getSize.apply(QZFL.dom, [el])
        }, setSize: function (el, width, height) {
            QZFL.dom.setSize.apply(QZFL.dom, [el, width, height])
        }, setStyle: function (el, property, value) {
            return QZFL.dom.setStyle.apply(QZFL.dom, [el, property, value])
        }, getScrollLeft: function (doc) {
            return QZFL.dom.getScrollLeft.apply(QZFL.dom, [doc])
        }, getScrollTop: function (doc) {
            return QZFL.dom.getScrollTop.apply(QZFL.dom, [doc])
        }, getScrollHeight: function (doc) {
            return QZFL.dom.getScrollHeight.apply(QZFL.dom, [doc])
        },
            getScrollWidth: function (doc) {
                return QZFL.dom.getScrollWidth.apply(QZFL.dom, [doc])
            }, getClientHeight: function (doc) {
                return QZFL.dom.getClientHeight.apply(QZFL.dom, [doc])
            }, getClientWidth: function (doc) {
                return QZFL.dom.getClientWidth.apply(QZFL.dom, [doc])
            }, getDocumentWindow: function (doc) {
                return QZFL.dom.getDocumentWindow.apply(QZFL.dom, [doc])
            }, createElementIn: function (tagName, el, insertFirst, attributes) {
                return QZFL.dom.createElementIn.apply(QZFL.dom, [tagName, el, insertFirst, attributes])
            }, removeElement: function (el) {
                return QZFL.dom.removeElement.apply(QZFL.dom,
                    [el])
            }};
        QS.css = QZFL.css;
        QS.object = QZFL.object;
        QS.event = QZFL.event;
        QS.object.display = function (obj, action) {
            if (obj)obj.style.display = action || "block"
        };
        QS.json = {};
        QS.json.Getter = function (actionURL, data, onCallBack, opt) {
            var _opt = {cname: null, charset: null, junctionMode: null, onError: null, onTimeout: null, timeout: null, callbackFnName: null};
            if (opt) {
                _opt.cname = opt.cname;
                _opt.charset = opt.charset || "utf-8";
                _opt.junctionMode = opt.junctionMode;
                _opt.onError = opt.onError;
                _opt.onTimeout = opt.onTimeout;
                _opt.timeout = opt.timeout;
                _opt.callbackFnName = opt.callbackFnName
            }
            var g_tk = QS.string.getAntiCSRFPair();
            actionURL = QS.param.setUrl(actionURL, g_tk[0], g_tk[1]);
            var _firsrTime = new Date;
            this._instance = new QZFL.JSONGetter(actionURL, _opt.cname, data, _opt.charset, _opt.junctionMode);
            var _onSuccess = function (res) {
                var _time = new Date - _firsrTime;
                var _code = res["code"] - 0;
                onCallBack(res)
            };
            this._instance.onSuccess = _onSuccess || QZFL.emptyFn;
            this._instance.onError = _opt.onError || QZFL.emptyFn;
            this._instance.onTimeout = _opt.onTimeout || QZFL.emptyFn;
            this._instance.timeout =
                _opt.timeout || 5E3;
            this.callbackFnName = _opt.callbackFnName || "_Callback";
            return this._instance.prot
        };
        QS.json.Getter.prototype.send = function () {
            this._instance.send(this.callbackFnName)
        };
        QS.json.Getter.prototype.destroy = function () {
            this._instance = this._instance.destroy();
            return null
        };
        QS.json.formSender = function (actionURL, data, onCallBack, opt) {
            var _opt = {method: null, charset: null};
            if (opt) {
                _opt.method = opt.method;
                _opt.charset = opt.charset || "utf-8"
            }
            var _firsrTime = new Date;
            this._instance = new QZFL.FormSender(actionURL,
                _opt.method, data, _opt.charset);
            var _onSuccess = function (res) {
                var _time = new Date - _firsrTime;
                var _code = res["code"] - 0;
                onCallBack(res)
            };
            this._instance.onSuccess = _onSuccess || QZFL.emptyFn;
            this._instance.onError = _opt.onError || QZFL.emptyFn
        };
        QS.json.formSender.prototype.send = function () {
            this._instance.send()
        };
        QS.json.formSender.prototype.destroy = function () {
            this._instance = this._instance.destroy();
            return null
        };
        QS.json._get = function (actionURL, data, onCallBack, opt) {
            opt = opt || {};
            var _getter = new QS.json.Getter(actionURL,
                data, onCallBack, opt);
            _getter.send();
            _getter.destroy();
            return _getter
        };
        QS.json._post = function (actionURL, data, onCallBack, opt) {
            opt = opt || {};
            var _poster = new QS.json.formSender(actionURL, data, onCallBack, opt);
            _poster.send();
            setTimeout(function () {
                _poster.destroy()
            }, 5E3);
            return _poster
        };
        QS.json.send = function (actionURL, data, onCallBack, method, opt) {
            var startTime = +new Date, reportCodeCallback = function (json) {
                var latency = +new Date - startTime;
                onCallBack(json);
                if (json && json.code !== undefined)QS.json.reportReturnCode(actionURL,
                    json.code, latency)
            };
            if (method == "POST")QS.json._post(actionURL, data, reportCodeCallback, opt); else QS.json._get(actionURL, data, reportCodeCallback, opt)
        };
        QS.json.reportReturnCode = function () {
            var REPORT_URL = "http://c.isdspeed.qq.com/code.cgi", image, NETWORK_ERROR_CODE = 500;
            var report = function (cgiUrl, param) {
                image = image || document.createElement("img");
                var queryArray = [], prop, val;
                for (prop in param)if (param.hasOwnProperty(prop)) {
                    val = encodeURIComponent(param[prop]);
                    queryArray.push(prop + "=" + val)
                }
                image.src = cgiUrl +
                    "?" + queryArray.join("&")
            };
            var getType = function (code) {
                if (code === 0)return 1;
                if (code === NETWORK_ERROR_CODE)return 2;
                return 3
            };
            return function (cgiUrl, code, latency) {
                code = parseInt(code);
                var type = getType(code), urlParts = QS.browser.parseUrl(cgiUrl);
                report(REPORT_URL, {type: type, code: code, domain: urlParts.hostname, time: latency, cgi: urlParts.pathname})
            }
        }();
        if (typeof QS.array == "undefined" || !QS.array)QS.array = {};
        QS.array.find = function (arr, fnEQ) {
            var i, len = arr.length, _flag = QZFL.lang.isFunction(fnEQ);
            for (i = 0; i < len; ++i)if (_flag) {
                if (fnEQ(arr[i]))return i
            } else if (fnEQ ==
                arr[i])return i;
            return null
        };
        QS.array.each = function (arr, fn) {
            var _count = arr.length, _tmp = [];
            while (_count) {
                --_count;
                _tmp[_count] = fn(arr[_count])
            }
            return _tmp
        };
        QS.array.unique = function (arr) {
            arr = arr || [];
            var r = arr.sort(), i = 0;
            for (; i < r.length; i++)if (r[i] === r[i - 1])r.splice(i--, 1);
            return r
        };
        QS.array.findMulElemIf = function (arr, fnEQ) {
            var a = [];
            for (var i = 0; i < arr.length; ++i)if (fnEQ(arr[i]))a.push(arr[i]);
            return a
        };
        (function () {
            QS.param = function (sValPairs, sElemSep, sPairSep) {
                if (sValPairs) {
                    var _aElem = sValPairs.toString().split(sElemSep),
                        _aPair;
                    for (var i = 0; i < _aElem.length; ++i) {
                        _aPair = _aElem[i].split(sPairSep);
                        _aPair.length > 1 && (this[_aPair[0]] = unescape(_aPair[1]))
                    }
                }
            };
            QS.param.get = function (sValPairs, name, sElemSep, sPairSep) {
                var _xParam = new QS.param(sValPairs, sElemSep, sPairSep);
                return _xParam[name] ? _xParam[name] : ""
            };
            QS.param.set = function (sValPairs, name, sValue) {
                sValPairs = sValPairs.toString();
                name = name.toString();
                sValue = sValue.toString().escUrl();
                var _r = new RegExp("(^|\\W)" + name + "=[^&]*", "g");
                return sValPairs.match(_r) ? sValPairs.replace(_r,
                    "$1" + name + "=" + sValue) : sValPairs + (sValPairs ? "&" : "") + name + "=" + sValue
            };
            QS.param.getUrl = function (name, url) {
                !url && (url = window.location.href);
                url = url.toString();
                url = url.split("#")[0];
                var _nIndex = url.indexOf("?");
                return _nIndex >= 0 ? QS.param.get(url.substr(_nIndex + 1), name, "&", "=") : ""
            };
            QS.param.setUrl = function (url, name, value) {
                url = url.toString();
                name = name.toString();
                value = QS.string.escUrl(value.toString());
                var _r = new RegExp("(^|\\W)" + name + "=[^&]*", "g");
                var _url = url.split("#");
                _url[0] = _url[0].match(_r) ? _url[0].replace(_r,
                    "$1" + name + "=" + value) : _url[0] + (_url[0].indexOf("?") == -1 ? "?" : "&") + name + "=" + value;
                return _url.join("#")
            };
            QS.param._getFixHash = function (s) {
                if (QS.userAgent.isFireFox() && s.indexOf("=") >= 0)return s;
                return unescape(s)
            };
            QS.param.setHash = function (name, sValue, oLocation) {
                oLocation || (oLocation = window.location);
                sValue = QS.string.escUrl(sValue.toString());
                var _sUrl = QS.param._getFixHash(oLocation.hash.substr(1));
                var _r = new RegExp("(^|\\W)" + name + "=[^&]*", "g");
                oLocation.hash = escape(_sUrl.match(_r) ? _sUrl.replace(_r,
                    "$1" + name + "=" + sValue) : _sUrl + (_sUrl.length ? "&" : "") + name + "=" + sValue)
            };
            QS.param.getHash = function (name, oLocation) {
                oLocation || (oLocation = window.location);
                return oLocation.hash ? QS.param.get(QS.param._getFixHash(oLocation.hash.substr(1)), name, "&", "=") : ""
            }
        })();
        QS.CustomEventModule = function () {
            function CustomEventModule() {
                this._events = {}
            }

            CustomEventModule.prototype = {constructor: CustomEventModule, on: function (eventType, fn) {
                var arr = this._events[eventType];
                arr = isArray(arr) ? arr : [];
                for (var i = 0, len = arr.length; i < len; i++)if (fn ===
                    arr[i])return;
                arr.push(fn);
                this._events[eventType] = arr;
                return this
            }, off: function (eventType, fn) {
                if (isArray(this._events[eventType])) {
                    var fns = this._events[eventType];
                    for (var i = 0, len = fns.length; i < len; i++)if (fns[i] === fn)break;
                    fns.splice(i, 1)
                }
                return this
            }, trigger: function (eventType) {
                if (isArray(this._events[eventType])) {
                    var fns = this._events[eventType].slice(0);
                    for (var i = 0, len = fns.length; i < len; i++)fns[i].apply(this, [].slice.call(arguments, 1))
                }
                return this
            }};
            CustomEventModule.create = function () {
                return new CustomEventModule
            };
            function isArray(o) {
                return Object.prototype.toString.apply(o) === "[object Array]"
            }

            return CustomEventModule
        }()
    };
    QSTRING.template = function () {
        var template = function (id, content) {
            return template[typeof content === "object" ? "render" : "compile"].apply(template, arguments)
        };
        (function (exports, global) {
            exports.version = "1.1.0";
            exports.openTag = "<%";
            exports.closeTag = "%>";
            exports.parser = null;
            exports.render = function (id, data) {
                var cache = _getCache(id);
                if (cache === undefined)return _debug({id: id, name: "Render Error", message: "Not Cache"});
                return cache(data)
            };
            exports.compile = function (id, source) {
                var debug = arguments[2];
                if (typeof source !== "string") {
                    debug = source;
                    source = id;
                    id = null
                }
                try {
                    var Render = _compile(source, debug)
                } catch (e) {
                    e.id = id || source;
                    e.name = "Syntax Error";
                    return _debug(e)
                }
                function render(data) {
                    try {
                        return(new Render(data)).template
                    } catch (e) {
                        if (!debug)return exports.compile(id, source, true)(data);
                        e.id = id || source;
                        e.name = "Render Error";
                        e.source = source;
                        return _debug(e)
                    }
                }

                render.prototype = Render.prototype;
                render.toString = function () {
                    return Render.toString()
                };
                if (id)_cache[id] = render;
                return render
            };
            exports.helper = function (name, helper) {
                _helpers[name] = helper
            };
            var _cache = {};
            var _isNewEngine = "".trim;
            var _isServer = _isNewEngine && !global.document;
            var _keyWordsMap = {};
            var _forEach = function () {
                var forEach = Array.prototype.forEach || function (block, thisObject) {
                    var len = this.length >>> 0;
                    for (var i = 0; i < len; i++)if (i in this)block.call(thisObject, this[i], i, this)
                };
                return function (array, callback) {
                    forEach.call(array, callback)
                }
            }();
            var _create = Object.create || function (object) {
                function Fn() {
                }

                Fn.prototype = object;
                return new Fn
            };
            var _helpers = exports.prototype = {$forEach: _forEach, $render: exports.render, $getValue: function (value) {
                return value === undefined ? "" : value
            }};
            _forEach(("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if" + ",in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with" + ",abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto" + ",implements,import,int,interface,long,native,package,private,protected,public,short" +
                ",static,super,synchronized,throws,transient,volatile" + ",arguments,let,yield").split(","), function (key) {
                _keyWordsMap[key] = true
            });
            var _compile = function (source, debug) {
                var openTag = exports.openTag;
                var closeTag = exports.closeTag;
                var parser = exports.parser;
                var code = source;
                var tempCode = "";
                var line = 1;
                var outKey = {};
                var uniq = {$out: true, $line: true};
                var variables = "var $helpers=this," + (debug ? "$line=0," : "");
                var replaces = _isNewEngine ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"];
                var include = "function(id,data){" + "if(data===undefined){data=$data}" + "return $helpers.$render(id,data)" + "}";
                _forEach(code.split(openTag), function (code, i) {
                    code = code.split(closeTag);
                    var $0 = code[0];
                    var $1 = code[1];
                    if (code.length === 1)tempCode += html($0); else {
                        tempCode += logic($0);
                        if ($1)tempCode += html($1)
                    }
                });
                code = tempCode;
                if (debug)code = "try{" + code + "}catch(e){" + "e.line=$line;" + "throw e" + "}";
                code = variables + replaces[0] + code + "this.template=" + replaces[3];
                try {
                    var render = new Function("$data", code);
                    var proto = render.prototype =
                        _create(_helpers);
                    proto.toString = function () {
                        return this.template
                    };
                    return render
                } catch (e) {
                    e.temp = "function anonymous($data) {" + code + "}";
                    throw e;
                }
                function html(code) {
                    line += code.split(/\n/).length - 1;
                    code = code.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
                    code = replaces[1] + "'" + code + "'" + replaces[2];
                    return code + "\n"
                }

                function logic(code) {
                    var thisLine = line;
                    if (parser)code = parser(code); else if (debug)code = code.replace(/\n/g, function () {
                        line++;
                        return"$line=" + line + ";"
                    });
                    if (code.indexOf("=") ===
                        0)code = replaces[1] + (_isNewEngine ? "$getValue(" : "") + code.substring(1).replace(/[\s;]*$/, "") + (_isNewEngine ? ")" : "") + replaces[2];
                    if (debug)code = "$line=" + thisLine + ";" + code;
                    getKey(code);
                    return code + "\n"
                }

                function getKey(code) {
                    code = code.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, "");
                    _forEach(code.split(/[^\$\w\d]+/), function (name) {
                        if (/^this$/.test(name))throw{message: 'Prohibit the use of the "' + name + '"'};
                        if (!name || _keyWordsMap.hasOwnProperty(name) || /^\d/.test(name))return;
                        if (!uniq.hasOwnProperty(name)) {
                            setValue(name);
                            uniq[name] = true
                        }
                    })
                }

                function setValue(name) {
                    var value;
                    if (name === "include")value = include; else if (_helpers.hasOwnProperty(name))value = "$helpers." + name; else value = "$data." + name;
                    variables += name + "=" + value + ","
                }
            };
            var _getCache = function (id) {
                var cache = _cache[id];
                if (cache === undefined && !_isServer) {
                    var elem = document.getElementById(id);
                    if (elem)exports.compile(id, elem.value || elem.innerHTML);
                    return _cache[id]
                } else if (_cache.hasOwnProperty(id))return cache
            };
            var _debug = function (e) {
                var content = "[template]:\n" + e.id +
                    "\n\n[name]:\n" + e.name;
                if (e.message)content += "\n\n[message]:\n" + e.message;
                if (e.line) {
                    content += "\n\n[line]:\n" + e.line;
                    content += "\n\n[source]:\n" + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, "")
                }
                if (e.temp)content += "\n\n[temp]:\n" + e.temp;
                if (global.console)console.error(content);
                function error() {
                    return error + ""
                }

                error.toString = function () {
                    return"{Template Error}"
                };
                return error
            }
        })(template, window);
        if (typeof module !== "undefined" && module.exports)module.exports = template;
        QS.template = template
    };
    QSTRING.show =
        function () {
            QS.flash = {};
            QS.flash.execute = function (name, param) {
                var _flash = QS.dress.getFlash();
                if (!_flash)return false;
                var _edit = _flash._stFlash._oEditor;
                if (_edit)_edit.execute({c: name, p: param})
            };
            QS.flash.executeSync = function (name, param) {
                var _flash = QS.dress.getFlash();
                if (!_flash)return"";
                var _edit = _flash._stFlash._oEditor;
                if (_edit)return _edit.executeSync({c: name, p: param});
                return null
            };
            QS.flash._setSo = function (key, value) {
                if (QS.flash._checkSoValid()) {
                    var _object = {};
                    _object["commond"] = "setSo";
                    _object["key"] =
                        key;
                    _object["data"] = value;
                    return QS.flash.executeSync("sharedObject", _object)
                }
                return false
            };
            QS.flash._getSo = function (key) {
                if (QS.flash._checkSoValid()) {
                    var _object = {};
                    _object["commond"] = "getSo";
                    _object["key"] = key;
                    return QS.flash.executeSync("sharedObject", _object)
                }
                return null
            };
            QS.flash._checkSoValid = function () {
                var _object = {};
                _object["commond"] = "testSo";
                return QS.flash.executeSync("sharedObject", _object)
            };
            QS.flash._removeSo = function (key) {
                var _object = {};
                _object["commond"] = "removeSo";
                _object["key"] = key;
                return QS.flash.executeSync("sharedObject", _object)
            };
            QS.webJs = {};
            QS.webJs.executeSync = function (opt) {
                var _c = opt["c"].toString();
                var _command = opt["p"]["commond"];
                var _function = QS.dress[_c][_command];
                if (typeof _function == "function")return _function.call(this, opt)
            };
            QS.dress = QS.CustomEventModule.create();
            QS.dress._flashId = "myavatar";
            QS.dress.CLASSICALMODE = 0;
            QS.dress.FASHIONMODE = 1;
            QS.dress.PHOTOSHOWMODE = 2;
            QS.dress.BONEMODE = 4;
            QS.dress.MULPSHOWMODE = 201;
            QS.dress.isCMode = function (mode) {
                mode = mode == undefined ?
                    QS.user.getAvMode() : mode;
                return QS.dress.CLASSICALMODE == mode
            };
            QS.dress.isFMode = function (mode) {
                mode = mode == undefined ? QS.user.getAvMode() : mode;
                return QS.dress.FASHIONMODE == mode
            };
            QS.dress.isPMode = function (mode) {
                mode = mode == undefined ? QS.user.getAvMode() : mode;
                return QS.dress.PHOTOSHOWMODE == mode
            };
            QS.dress.isMulPShowMode = function (mode) {
                mode = mode == undefined ? QS.user.getAvMode() : mode;
                return QS.dress.MULPSHOWMODE == mode
            };
            QS.dress.isBMode = function (mode) {
                mode = mode == undefined ? QS.user.getAvMode() : mode;
                return QS.dress.BONEMODE ==
                    mode
            };
            QS.dress.getFlashContainer = function () {
                var _o = top.QSFL.$(QS.dress._flashId);
                if (_o)return _o;
                return null
            };
            QS.dress.getFlash = function () {
                var _o = QS.dress.getFlashContainer();
                if (_o)return _o.cQSAV;
                return null
            };
            QS.dress.isGroupPhotoShow = function (sn) {
                var _mode, _sn, _flash;
                if (sn) {
                    _sn = sn;
                    _flash = new QQSHOWAV;
                    _flash.FromItemSn(_sn)
                } else {
                    _sn = QS.dress.getShow();
                    _flash = QS.dress.getFlash()
                }
                _mode = _flash._stAvInf._iAvStyle;
                if (_mode == 0)if (_flash)return QQSHOWAV.hasItemByType(_flash._arrItemInf, 103);
                return false
            };
            QS.dress.isDefaultItem = function (itemNo, opt) {
                var _flash = QS.dress.getFlash();
                if (_flash == null)return false;
                opt = opt || {};
                opt.sex = opt.sex == undefined ? QS.user.getAvSex() : opt.sex;
                opt.mode = opt.mode == undefined ? QS.user.getAvMode() : opt.mode;
                opt.defType = opt.defType == undefined ? 0 : opt.defType;
                opt.footType = opt.footType == undefined ? 0 : opt.footType;
                return _flash.IsDefItemNo(itemNo, opt.sex, opt.mode, opt.defType, opt.footType) == -1 ? false : true
            };
            QS.dress.getDefaultShow = function (mode) {
                var _mode = mode == undefined ? QS.user.getAvMode() :
                    mode;
                if (QS.dress.isBMode(_mode))return""; else if (QS.dress.isPMode(_mode))return QS.dress.photoShow.getDefSingleShow(); else if (QS.dress.isMulPShowMode(_mode))return QS.dress.photoShow.getDefMShow(); else {
                    var _flash = QS.dress.getFlash();
                    _flash.InitDefShow();
                    return _flash.ToItemSn(0, 0, 0)
                }
            };
            QS.dress.initShow = function (sn) {
                var _mode = QS.user.getAvMode();
                if (QS.dress.isBMode(_mode))QS.dress.boneShow.initShow(sn); else if (QS.dress.isPMode(_mode))QS.dress.photoShow.initSingleShow(sn); else if (QS.dress.isMulPShowMode(_mode))QS.dress.photoShow.initMulPShow(sn);
                else QS.dress.fashion.initShow(sn)
            };
            QS.dress.readyInitShow = function () {
                var _flash = QS.dress.getFlash();
                if (_flash && _flash.IsReady()) {
                    _flash.InitShow();
                    if (_flash.IsV3()); else;
                } else setTimeout(function () {
                    QS.dress.readyInitShow()
                }, 100)
            };
            QS.dress.init = function (id) {
                window.ReqGetReady = function (oFlash) {
                    var _flash = QS.dress.getFlash();
                    _flash.InitFlash(oFlash);
                    _flash._stFlash._bReady = 1;
                    _flash._stFlash._bF6Ready = 1;
                    _flash._stFlash._iFlashInitCount += 1
                };
                function _initFlash(fid) {
                    var _o = QSFL.$(fid);
                    _o.innerHTML = "";
                    var _url = QS.frame.getFileURL("enginer.swf");
                    if (QS.userAgent.isTheworld())_url += "?" + Math.random();
                    initAvatarFlash(QS.dress._flashId, _url, 268, 433, _o, 0);
                    _o = QS.dress.getFlashContainer();
                    _o.cQSAV = new QQSHOWAV
                }

                function _setFrameStatus() {
                    var frame = QS.param.getUrl("frame", QS.browser.hash.get()), status = "none";
                    if (parseInt(frame) == 0)status = "off";
                    QS.frame.setFrame(status)
                }

                _setFrameStatus();
                QS.browser.title.init(document.title);
                _initFlash(id)
            };
            QS.dress.getShow = function () {
                if (QS.user.getAvMode() == 4)return QS.dress.boneShow.getShow();
                else return QS.dress.fashion.getShow()
            };
            QS.dress.getShowType = function (sn) {
                function MakeArr(inArray) {
                    var str = [], perArrRet;
                    for (var i = 0; i < inArray.length; i++) {
                        perArrRet = inArray[i];
                        str.push(perArrRet.ToStr().split("_"))
                    }
                    return str
                }

                function _checkPhotoShow(sSn) {
                    var _flash = new QQSHOWAV;
                    _flash.FromItemSn(sSn);
                    _flash.UpdateBodyRec();
                    var l = MakeArr(_flash.GetBodyAll()), len = l.length;
                    for (var i = 0; i < len; i++)if (l[i][0])if (_checkPhotoSpeItem(l[i][0]) == 1)return true;
                    return false
                }

                function _checkPhotoSpeItem(itemno) {
                    var s =
                        itemno.split("."), len = s.length;
                    if (len <= 1)return 0;
                    if (len == 3)if (QSFL.excore.checkUin(s[0]) && s[2] == 13)return 1;
                    return 0
                }

                if (sn.indexOf("V1") == 0) {
                    var _s = sn.split("#");
                    _s = _s[1].split("_");
                    if (_s[1] == 1)return 0; else if (_s[1] == 0)return 1
                } else if (sn.indexOf("B1") == 0 || sn.indexOf("$0") == 0)return 4;
                return null
            };
            QS.dress.defShow = function (sex, mode) {
                var _flash = QS.dress.getFlash();
                var _defShow = QS.dress.getDefShow(sex, mode);
                _flash.FromItemSn(_defShow, true);
                QS.dress.readyInitShow()
            };
            QS.dress.getDefShow = function (sex, mode) {
                var _flash = QS.dress.getFlash(), _sex = sex || _flash._stAvInf._chAvSex, _mode = mode == undefined ? _flash._stAvInf._iAvStyle : mode;
                return _flash.MakeDefStr(_sex, _mode)
            };
            QS.dress.getShowBySex = function (sex) {
                var _flash = QS.dress.getFlash();
                var _sex = sex || _flash._stAvInf._chAvSex;
                return _flash.MakeDefStr(_sex, _flash._stAvInf._iAvStyle)
            };
            QS.dress.getShowByMode = function (style) {
                var _flash = QS.dress.getFlash();
                if (style != 0 && style != 1)style = 1;
                return _flash.MakeDefStr(_flash._stAvInf._chAvSex, style)
            };
            QS.dress.getShowInfo =
                function (sn) {
                    var _data;
                    if (QS.dress.boneShow.isShow(sn)) {
                        _data = QS.dress.boneShow.getShowInfo(sn);
                        return{"sex": _data.sex, "mode": 4, "zoom": 1}
                    } else {
                        _data = QS.dress.fashion.getShowInfo(sn);
                        if (QS.dress.isPhotoShow(sn))_mode = QS.dress.PHOTOSHOWMODE; else _mode = _data._iAvStyle;
                        return _data ? {"sex": _data._chAvSex, "mode": _mode, "zoom": _data._iZoomLv} : null
                    }
                };
            QS.dress.getShowMode = function (sn) {
                return QS.dress.getShowInfo(sn)["mode"]
            };
            QS.dress.isBasicShow = function (sn) {
                var defAV = QS.dress.getFlash();
                var userArr = sn.split("#");
                var basicArr = defAV._arrBasicShow[userArr[1].substr(0, 5)];
                var itemArr = userArr[2].split("|");
                var iFlag = 0;
                for (var i = 0; i < itemArr.length; i++) {
                    iFlag = 0;
                    var itemSpcArr = itemArr[i].split("_");
                    if (itemSpcArr[1] >= 406 && itemSpcArr[1] <= 448) {
                        for (var j = 0; j < basicArr.length; j++)if (itemSpcArr[1] == basicArr[j][0]) {
                            iFlag++;
                            if (itemSpcArr[0] != basicArr[j][1])return false
                        }
                        if (iFlag == 0)return false
                    }
                }
                return true
            };
            QS.dress.isSameShow = function (sn1, sn2, opt) {
                var mode1 = QS.dress.getShowMode(sn1), mode2 = QS.dress.getShowMode(sn2);
                if (mode1 !=
                    mode2)return false;
                if (mode1 == 4)return QS.dress.boneShow.isSameShow(sn1, sn2, opt); else return QS.dress.fashion.isSameShow(sn1, sn2, opt)
            };
            QS.dress.isDefaultShow = function (sn) {
                var _defAV = QS.dress.getFlash();
                var _userArr = sn.split("#");
                var _defArr = _defAV._arrDefShow[_userArr[1].substr(0, 5)];
                var _itemArr = _userArr[2].split("|");
                var _flag = 0, _len = _itemArr.length, _lenx, _itemSpcArr;
                for (var i = 0; i < _len; i++) {
                    _flag = 0;
                    _itemSpcArr = _itemArr[i].split("_");
                    if (_itemSpcArr[1] >= 406 && _itemSpcArr[1] <= 448) {
                        _lenx = _defArr.length;
                        for (var j = 0; j < _lenx; j++)if (_itemSpcArr[1] == _defArr[j][0]) {
                            _flag++;
                            if (_itemSpcArr[0] != _defArr[j][1])return false
                        }
                        if (_flag == 0)return false
                    }
                }
                return true
            };
            QS.dress.isOriginalShow = function (sn) {
                var mode = QS.dress.getShowMode(sn);
                if (QS.dress.isBMode(mode))return QS.dress.boneShow.isDefaultShow(sn); else if (QS.dress.isFMode(mode) || QS.dress.isCMode(mode))return QS.dress.fashion.isOriginalShow(sn)
            };
            QS.dress.filterDefaultItems = function (sn) {
                var mode = QS.dress.getShowMode(sn);
                if (QS.dress.isBMode(mode))return QS.dress.boneShow.filterDefaultItems(sn);
                else if (QS.dress.isFMode(mode) || QS.dress.isCMode(mode))return QS.dress.fashion.filterDefaultItems(sn)
            };
            QS.dress.isPhotoShow = function (sn) {
                var _sn, _flash, _mode, _count, _itemNo, _tempArr, _base = Math.pow(10, 6);
                if (sn) {
                    _sn = sn;
                    _flash = new QQSHOWAV;
                    _flash.FromItemSn(_sn)
                } else {
                    _sn = QS.dress.getShow();
                    _flash = QS.dress.getFlash()
                }
                _mode = _flash._stAvInf._iAvStyle;
                if (_mode == 1) {
                    _count = _flash._arrItemInf.length;
                    while (_count) {
                        --_count;
                        _tempArr = _flash._arrItemInf[_count].ToStr().split("_")[0].split(".");
                        if (_tempArr.length ==
                            1) {
                            _itemNo = parseInt(_tempArr[0]);
                            if (_itemNo >= 9 * _base && _itemNo < 10 * _base)return true
                        } else if (_tempArr.length == 3)if (_tempArr[2] == 13 && QS.user.checkUin(_tempArr[0]))return true
                    }
                }
                return false
            };
            QS.dress.switchMode = function (mode) {
                QS.flash.execute("updataProfile", {style: mode})
            };
            QS.dress.hasItemByType = function (sn, type) {
                var mode = QS.dress.getShowMode(sn);
                if (QS.dress.isFMode(mode) || QS.dress.isCMode(mode))return QQSHOWAV.hasItemByType(QS.dress.fashion.getItemInfArr(sn), type);
                return false
            };
            QS.dress.filterItemByType =
                function (sn, iType) {
                    var retArr = [];
                    var defArr = sn.split("#");
                    if (defArr.length < 3)return sn;
                    var itemArr = defArr[2].split("|");
                    for (var i = 0; i < itemArr.length; i++) {
                        var itemSpcArr = itemArr[i].split("_");
                        if (itemSpcArr.length < 18)return sn;
                        if (itemSpcArr[8] == iType)continue; else if (iType == 100 && itemSpcArr[8] > iType)continue; else retArr.push(itemArr[i])
                    }
                    return defArr[0] + "#" + defArr[1] + "#" + retArr.join("|") + "#"
                };
            QS.dress.getItemInfArr = function (sn) {
                if (QS.dress.boneShow.isShow(sn))return QS.dress.boneShow.getItemInfArr(sn);
                return QS.dress.fashion.getItemInfArr(sn)
            };
            QS.dress.countItemByType = function (sn, type) {
                var itemNoArr = [];
                var count = 0;
                var defArr = sn.split("#");
                if (defArr.length < 3)return count;
                var itemArr = defArr[2].split("|");
                for (var i = 0; i < itemArr.length; i++) {
                    var itemSpcArr = itemArr[i].split("_");
                    if (itemSpcArr.length < 18)return count;
                    if (itemSpcArr[8] == type)IncreaceAtom(itemSpcArr[0]); else if (type == 100 && itemSpcArr[8] > type)IncreaceAtom(itemSpcArr[0]); else continue
                }
                function IncreaceAtom(itemNo) {
                    for (var i = 0; i < itemNoArr.length; i++)if (itemNoArr[i] ==
                        itemNo)return;
                    count++;
                    itemNoArr.push(itemNo)
                }

                return count
            };
            QS.dress._isItem = function (sn) {
                var _array = sn.split("|"), _itemNo = _array[0];
                if (isNaN(_itemNo))return false; else return true
            };
            QS.dress._getItemMode = function (itemNo) {
                var _mode = QS.user.getAvMode(), _base = Math.pow(10, 6);
                if (itemNo >= 0 && itemNo < _base)return QS.dress.CLASSICALMODE; else if (itemNo >= _base && itemNo < 2 * _base)return QS.dress.FASHIONMODE; else if (itemNo >= 3 * _base && itemNo < 5 * _base) {
                    if (QS.array.find([QS.dress.CLASSICALMODE, QS.dress.FASHIONMODE], _mode) !=
                        null)return _mode
                } else if (itemNo >= 7 * _base && itemNo < 9 * _base)return QS.dress.PHOTOSHOWMODE; else if (itemNo >= 20 * _base && itemNo < 21 * _base)return QS.dress.BONEMODE;
                return 1
            };
            QS.dress.getItemMode = function (itemNo) {
                return QS.dress._getItemMode(itemNo)
            };
            QS.dress._getItemSex = function (sn) {
                var _sex = sn.split("|")[1];
                if (QS.array.find(["F", "M"], _sex) != null)return _sex;
                return QS.user.getAvSex()
            };
            QS.dress.takeOffShow = function (mode) {
                var mode = mode == undefined ? QS.user.getAvMode() : mode;
                if (QS.dress.isBMode(mode))QS.dress.boneShow.takeOffShow();
                else if (QS.dress.isPMode(mode)) {
                    QS.flash.execute("clearAll");
                    QS.dress.photoShow.initSingleShow(QS.dress.removeItems(QS.dress.getShow()))
                } else if (QS.dress.isFMode(mode) || QS.dress.isCMode(mode))QS.dress.defShow()
            };
            QS.dress.removeItems = function (sn) {
                var obj = new QQSHOWAV, itemList = [], count = 0, itemNo = 0;
                obj.FromItemSn(sn);
                count = obj._arrItemInf.length;
                while (count) {
                    --count;
                    itemNo = obj._arrItemInf[count]._iItemNo;
                    if (itemNo.split(".").length == 1 && QS.dress.isPMode(QS.dress._getItemMode(itemNo)))obj._arrItemInf.splice(count,
                        1)
                }
                return obj.ToStr(obj._stAvInf, obj._arrItemInf)
            };
            QS.dress._switch = function (sn) {
                var _currentMode = QS.user.getAvMode(), _currentSex = QS.user.getAvSex(), _itemNo = 0, _mode = 1, _sex = "F", _showInfo = null, _map = {"item_sex_M": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u7537\u751f\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>', "item_sex_F": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u5973\u751f\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>',
                    "item_mode_0": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u7ecf\u5178\u98ce\u683c\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>', "item_mode_1": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u65f6\u5c1a\u98ce\u683c\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>', "item_mode_2": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u7167\u7247\u79c0\u98ce\u683c\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>',
                    "item_mode_4": '\u4eb2\uff0c\u662f\u60f3\u8bd5\u7a7f\u65b0\u79c0\u5a03\u5a03\u7269\u54c1\u5417\uff1f<a href="javascript:void(0)"> \u662f\uff0c\u8bf7\u5207\u6362</a>', "show_mode_0": "\u4eb2\uff0c\u5df2\u5207\u6362\u5230\u7ecf\u5178\u5f62\u8c61\u5566", "show_mode_1": "\u4eb2\uff0c\u5df2\u5207\u6362\u5230\u65f6\u5c1a\u5f62\u8c61\u5566", "show_mode_2": "\u4eb2\uff0c\u5df2\u5207\u6362\u5230\u7167\u7247\u79c0\u5f62\u8c61\u5566", "show_mode_4": "\u4eb2\uff0c\u5df2\u5207\u6362\u5230\u65b0\u79c0\u5a03\u5a03\u5f62\u8c61\u5566"};
                if (QS.dress._isItem(sn)) {
                    _itemNo = sn.split("|")[0];
                    _mode = QS.dress._getItemMode(_itemNo);
                    _sex = QS.dress._getItemSex(sn);
                    if (_currentSex != _sex) {
                        QS.dress.tips.create(_map["item_sex_" + _sex], {"sn": sn, "chSex": _sex});
                        return true
                    }
                    if (_currentMode != _mode) {
                        QS.dress.tips.create(_map["item_mode_" + _mode], {"sn": sn, "chMode": _mode});
                        return true
                    }
                    if (QS.dress.isPMode(_currentMode) && QS.dress.photoShow.hasPhotoInTryArea() == false) {
                        QS.dialog.tips("\u8bf7\u5148\u4e0a\u4f20\u7167\u7247\uff0c\u518d\u8bd5\u7a7f\u3002", {icon: "tips_ico_failed"});
                        return true
                    }
                } else if (QS.head.isHead(sn)) {
                    _showInfo = QS.head._parse(sn);
                    _mode = QS.dress._getItemMode(parseInt(_showInfo.show));
                    if (_currentSex != _showInfo.sex) {
                        QS.dress.tips.create(_map["item_sex_" + _showInfo.sex], {"sn": sn, "chSex": _showInfo.sex});
                        return true
                    }
                    if (_currentMode != _mode) {
                        QS.dress.tips.create(_map["item_mode_" + _mode], {"sn": sn, "chMode": _mode});
                        return true
                    }
                } else if (QS.dress.boneShow.isPosture(sn)) {
                    _sex = sn.split("#")[1];
                    if (_currentMode == 4 && _sex != _currentSex) {
                        QS.dress.tips.create(_map["item_sex_" +
                            _sex], {sn: sn, chSex: _sex});
                        return true
                    }
                } else {
                    _showInfo = QS.dress.getShowInfo(sn);
                    if (_showInfo.mode == _currentMode) {
                        if (!QS.dress.isPMode(_currentMode) && _showInfo.sex != _currentSex) {
                            QS.dress._forceChange(_showInfo.sex, _showInfo.mode);
                            return false
                        }
                    } else {
                        QS.dress._forceChange(_showInfo.sex, _showInfo.mode);
                        QS.dress.tips.create(_map["show_mode_" + _showInfo.mode], {"sn": sn, "chMode": _showInfo.mode, "chSex": _showInfo.sex});
                        return false
                    }
                }
                return false
            };
            QS.dress._hasSexInShow = function (show) {
                var r = true;
                show = show || "";
                if (show.indexOf("V1#U") == 0)r = false;
                return r
            };
            QS.dress.putOn = function (sn) {
                var paramArg = arguments[1] || {}, isNotRecorded;
                if (QS.lang.isBoolean(paramArg)) {
                    isNotRecorded = paramArg;
                    paramArg = {isNotRecorded: isNotRecorded}
                } else isNotRecorded = paramArg.isNotRecorded;
                var _sn = sn || "", _force = paramArg.force || false, _array = _sn.split("|"), _len = _array.length, _itemno = _array[0], _showMode = 1, _opt = {}, _param = {}, _l = ["id", "sex", "layers", "pose", "isFixed", "defX", "defY", "movable", "rotatable", "selectable", "type", "colorable"], isMulPosture =
                    QS.dress.boneShow.mulPosture.isMulString;
                if (!QS.dress._hasSexInShow(_sn)) {
                    QS.dialog.tips("\u62b1\u6b49\uff0c\u8be5\u6574\u5957\u5f62\u8c61\u5f02\u5e38\uff0c\u8bf7\u5230\u7269\u54c1\u8be6\u60c5\u4e2d\u8bd5\u7a7f\u76f8\u5173\u5355\u54c1\u3002", {"icon": "tips_ico_failed", "width": 380});
                    return false
                }
                QS.user.operation.trigger("putOn", {type: "putOn", params: QS.object.extend({serialStr: sn}, paramArg)});
                QS.frame.tryArea.toggle(1);
                QS.dress.tips.close();
                if (!isMulPosture(_sn) && QS.dress._switch(_sn))return false;
                if (QS.dress._isItem(_sn)) {
                    _showMode = QS.dress._getItemMode(_itemno);
                    for (var i = 0; i < _len; i++)if (_l[i])_param[_l[i]] = _array[i];
                    if (QS.dress.isFMode(_showMode) || QS.dress.isCMode(_showMode) || QS.dress.isPMode(_showMode)) {
                        QS.dress.putOnItem(_param);
                        if (QS.dress.photoShow.storage.has())QS.dress.photoShow.storage.set(QS.dress.getShow())
                    } else if (QS.dress.isBMode(_showMode))QS.dress.putOnBoneItem(_param, isNotRecorded);
                    _opt.type = "item";
                    _opt.show = QS.dress.getShow();
                    _opt.item = _sn
                } else if (isMulPosture(_sn))QS.dress.putOnBoneMulPosture(_sn.split("@"));
                else if (QS.head.isHead(_sn)) {
                    QS.dress.putOnHead(_sn);
                    isNotRecorded = true
                } else {
                    if (QS.dress.boneShow.isShow(_sn))QS.dress.putOnBoneShow(_sn, {isNotRecorded: isNotRecorded, force: _force}); else if (QS.dress.boneShow.isPosture(_sn)) {
                        _sn = _sn.split("#")[0];
                        QS.dress.putOnBonePosture(_sn);
                        return
                    } else if (QS.dress.isPhotoShow(_sn)) {
                        QS.dress.putOnShow(_sn);
                        QS.dress.photoShow.stats.putOnSuit();
                        QS.dress.photoShow.hasPhotoInTryArea.flag = false;
                        QS.dress.photoShow.storage.clear()
                    } else {
                        _sn = QS.head._replaceHeadInShow(_sn);
                        QS.dress.putOnShow(_sn)
                    }
                    _opt.type = "show";
                    _opt.show = _sn;
                    _opt.item = ""
                }
                if (QS.dress.isBMode(QS.user.getAvMode()))return false;
                if (QS.dress.isPMode() && QS.dress.photoShow.hasPhotoInTryArea.flag)isNotRecorded = true;
                if (!isNotRecorded && QS.dress.records && QS.lang.isFunction(QS.dress.records.set))QS.dress.records.set(_opt);
                QS.dress.records.initIndex()
            };
            QS.dress.tips = function () {
                var exports = {}, container, timer = 0, defaultOption = {ts: 3E3, jump: 0}, option = null;

                function create(message, opt) {
                    if (!message)return;
                    !container &&
                    init();
                    option = QS.object.extend(QS.object.extend({}, defaultOption), opt || {});
                    container.innerHTML = option.isHtml ? message : '<p class="tips_cont">' + message + '</p><a href="javascript:void(0)" class="shut" title="\u5173\u95ed">\u5173\u95ed</a><div class="bg"></div>';
                    container.style.display = "";
                    stopCountDown();
                    countDown()
                }

                function countDown() {
                    if (option && option.ts !== 0)timer = setTimeout(function () {
                        close()
                    }, option.ts)
                }

                function stopCountDown() {
                    clearTimeout(timer)
                }

                function init() {
                    container = QS.$("dress_tips");
                    container.onclick =
                        function (event) {
                            var target = QS.event.getTarget(event), mode, sex, url;
                            if (target.tagName.toUpperCase() == "A")if (target.className == "shut")close(); else if (option.clickFn) {
                                option.clickFn();
                                close()
                            } else if (option.sn) {
                                mode = QS.user.getAvMode();
                                sex = QS.user.getAvSex();
                                if (option.chSex != sex || option.chMode != mode) {
                                    sex = option.chSex === undefined ? sex : option.chSex;
                                    mode = option.chMode === undefined ? mode : option.chMode;
                                    QS.dress._forceChange(sex, mode, {jump: option.jump})
                                }
                                if (QS.dress.isMulPShowMode(mode)) {
                                    QS.dress.photoShow.initMulPShow(option.sn);
                                    close()
                                } else QS.dress.putOn(option.sn)
                            }
                            return false
                        };
                    QS.$e(container).onMouseEnter(function (event) {
                        option && option.mouseoverFn && option.mouseoverFn(event);
                        stopCountDown()
                    });
                    QS.$e(container).onMouseLeave(function (event) {
                        option && option.mouseoutFn && option.mouseoutFn(event);
                        countDown()
                    });
                    init = function () {
                    }
                }

                function close() {
                    stopCountDown();
                    !container && init();
                    container.innerHTML = "";
                    container.style.display = "none";
                    option = null
                }

                exports.create = create;
                exports.close = close;
                return exports
            }();
            QS.dress.fashion = {};
            QS.dress.fashion.putOnHead =
                function (sn) {
                    var _newItems = [], _oldShow = QS.dress.getShow(), _oldShowInfo = _oldShow.split("#"), _flash = QS.dress.getFlash(), _otherItems, _newSn;

                    function _format(sn) {
                        var _o = QS.head._parse(sn), _headItems = _o.show.split("|"), _count = _headItems.length, _headLy = QS.head._getHeadLy(1), _tmp = [];
                        while (_count) {
                            --_count;
                            _tmp = _headItems[_count].split("_");
                            if (_tmp.length < 19)return;
                            if (QS.array.find(_headLy, _tmp[1]) == null)return;
                            if (_tmp[8] == 104)_tmp[18] = _o.uin + "." + _o.id;
                            _headItems[_count] = _tmp.join("_")
                        }
                        return _headItems
                    }

                    function _merge(headItems, otherItems) {
                        var _count = otherItems.length, _otherItems = [];
                        while (_count) {
                            --_count;
                            _otherItems.push(otherItems[_count].ToStr())
                        }
                        return headItems.concat(_otherItems)
                    }

                    _otherItems = QS.head._filterItemInShow(QS.dress.getShow(), QS.head._getRelateLy(469)).otherItems;
                    _newItems = _merge(_format(sn), _otherItems);
                    _newSn = [_oldShowInfo[0], _oldShowInfo[1], _newItems.join("|"), _oldShowInfo.length == 4 ? _oldShowInfo[3] : ""].join("#");
                    if (QS.head._getHeadType(_oldShow)) {
                        _flash.FromItemSn(_newSn, true);
                        _flash.PutOnHead()
                    } else QS.dress.putOnShow(_newSn)
                };
            QS.dress.fashion.getShow = function () {
                var _flash = QS.dress.getFlash();
                return _flash.ToItemSn(0, 0, 0)
            };
            QS.dress.fashion.getItemInfArr = function (sn) {
                var _qsav = QS.dress.getFlash();
                var _objRet = new Object;
                if (0 != _qsav.FromStr(sn, _objRet))return[];
                return _qsav.RemoveDef(_objRet.arrItemInf, _objRet.stAvInfo._chAvSex, _objRet.stAvInfo._iAvStyle, _objRet.stAvInfo._iDefType, _objRet.stAvInfo._iFootType)
            };
            QS.dress.fashion.getShowInfo = function (sn) {
                var _flash = QS.dress.getFlash();
                var _objRet = new Object;
                if (0 != _flash.FromStr(sn, _objRet))return null;
                return _objRet.stAvInfo
            };
            QS.dress.fashion.isSameShow = function (sn1, sn2, opt) {
                function checkItems(sn1, sn2, isCheckHead) {
                    var showInfo1 = QS.head._filterItemInShow(sn1), showInfo2 = QS.head._filterItemInShow(sn2), isSameHead = true;

                    function isEqual(items1, items2) {
                        var count1 = items1.length, count2 = items2.length;
                        if (count1 != count2)return false;
                        while (count1) {
                            --count1;
                            if (QS.array.find(items1, function (o) {
                                if (o._iItemNo == items2[count1]._iItemNo)return true;
                                else return false
                            }) == null)return false
                        }
                        return true
                    }

                    if (isCheckHead)isSameHead = isEqual(showInfo1.headItems, showInfo2.headItems);
                    return isEqual(showInfo1.otherItems, showInfo2.otherItems) && isSameHead
                }

                function checkEffect(sn1, sn2, isCheck) {
                    var _flash1 = "", _flash2 = "";
                    if (isCheck == false)return true;
                    _flash1 = new QQSHOWAV;
                    _flash2 = new QQSHOWAV;
                    _flash1.FromItemSn(sn1);
                    _flash2.FromItemSn(sn2);
                    if (_flash1._stAvInf._sSpecialInfo != _flash2._stAvInf._sSpecialInfo)return false;
                    if (_flash1._stAvInf._sEmo != _flash2._stAvInf._sEmo)return false;
                    return true
                }

                var _opt = opt || {}, _checkSex = _opt["checkSex"] == undefined ? false : _opt["checkSex"], _checkMode = _opt["checkMode"] == undefined ? false : _opt["checkMode"], _checkEffect = _opt["checkEffect"] == undefined ? false : _opt["checkEffect"], _checkHead = _opt["checkHead"] == undefined ? true : _opt["checkHead"];
                if (sn1 == sn2)return true;
                if (_checkSex)if (QS.dress.getShowInfo(sn1).sex != QS.dress.getShowInfo(sn2).sex)return false;
                if (_checkMode)if (QS.dress.getShowInfo(sn1).mode != QS.dress.getShowInfo(sn2).mode)return false;
                return checkItems(sn1,
                    sn2, _checkHead) && checkEffect(sn1, sn2, _checkEffect) ? true : false
            };
            QS.dress.fashion.initShow = function (sn) {
                var _flash = QS.dress.getFlash();
                QS.flash.execute("updataProfile", {sex: QS.user.getAvSex(), style: QS.user.getAvMode()});
                _flash.FromItemSn(sn, true);
                _flash.InitShow()
            };
            QS.dress.fashion.isOriginalShow = function (sn) {
                var _defAV = QS.dress.getFlash(), _showInfo = sn.substr(3, 5), _defList = _defAV._arrDefShow[_showInfo], _basicList = _defAV._arrBasicShow[_showInfo], _mergeList = [].concat(_defList, _basicList), _mergeLength =
                    _mergeList.length, _userItemInfoList = sn.split("#")[2].split("|"), _userItemLength = _userItemInfoList.length, _i = 0, _j = 0, _itemInfo;
                for (; _i < _userItemLength; ++_i) {
                    _itemInfo = _userItemInfoList[_i].split("_");
                    for (_j = 0; _j < _mergeLength; ++_j)if (_itemInfo[1] == _mergeList[_j][0])if (_itemInfo[0] == _mergeList[_j][1])break;
                    if (_j == _mergeLength)return false
                }
                return true
            };
            QS.dress.fashion.filterDefaultItems = function (sn) {
                var _defAV = QS.dress.getFlash(), _showInfo = sn.substr(3, 5), _mergeList = [].concat(_defAV._arrDefShow[_showInfo],
                    _defAV._arrBasicShow[_showInfo]), _mergeLength = _mergeList.length, _userItemInfoList = sn.split("#")[2].split("|"), _userItemLength = _userItemInfoList.length, _i = 0, _j = 0, _itemInfo, _itemList = [];
                for (; _i < _userItemLength; ++_i) {
                    _itemInfo = _userItemInfoList[_i].split("_");
                    for (_j = 0; _j < _mergeLength; ++_j)if (_itemInfo[0] == _mergeList[_j][1])break;
                    if (_j < _mergeLength)continue;
                    for (_j = 0; _j < _itemList.length; ++_j)if (_itemList[_j].id == _itemInfo[0])break;
                    if (_j == _itemList.length)_itemList.push({"id": _itemInfo[0]})
                }
                return _itemList
            };
            QS.dress.boneShow = {"putOnHead": function (sn) {
                QS.flash.execute("showFromJs", {commond: "putOn", p: {target: sn, type: 3, isNotRecorded: true}})
            }, "isShow": function (sn) {
                return sn.indexOf("B1") == 0 ? true : false
            }, "isPosture": function (sn) {
                if (/^\$[0-9a-fA-F]{1}/.test(sn))return true;
                return false
            }, "getShow": function () {
                return QS.flash.executeSync("backData", {commond: "getAvString"})
            }, "getHeadDefaultItems": function () {
                return QS.flash.executeSync("backData", {commond: "getHeadDefaultItems"})
            }, "filterDefaultItems": function (sn) {
                var boneShow =
                    QS.dress.boneShow, sn = sn || boneShow.getShow(), showInfo = boneShow.getShowInfo(sn), allItems = showInfo.items, count = allItems.length, sex = showInfo.sex, defaultShow = boneShow.getDefaultShow()[sex == "M" ? 0 : 1], defaultItems = boneShow.getItemsFromShow(defaultShow), defaultCount = defaultItems.length, itemCount = 0, i = 0, j = 0, k = 0, items = [], obj = {};
                for (; i < count; ++i) {
                    obj = {};
                    for (j = 0; j < defaultCount; ++j)if (allItems[i][0] == defaultItems[j].id)break;
                    if (j < defaultCount)continue;
                    itemCount = items.length;
                    for (k = 0; k < itemCount; ++k)if (allItems[i][0] ==
                        items[k].id)break;
                    if (k < itemCount)continue;
                    obj.id = allItems[i][0];
                    items.push(obj)
                }
                return items
            }, "getDefaultShow": function () {
                return QS.flash.executeSync("backData", {commond: "getDefaultShow"})
            }, "getItemsFromShow": function (sn) {
                sn = sn || QS.dress.boneShow.getShow();
                return QS.flash.executeSync("backData", {commond: "getItemsFromShow", p: {"showString": sn}})
            }, "getInfoFromShow": function (sn) {
                sn = sn || QS.dress.boneShow.getShow();
                return QS.flash.executeSync("backData", {commond: "getInfoFromShow", p: {"showString": sn}})
            },
                "isDefaultShow": function (sn) {
                    function arraytoObject(a, key) {
                        var len = a.length, o = {};
                        while (len) {
                            --len;
                            o[a[len][key]] = a[len]
                        }
                        return o
                    }

                    var _sexMap = {"M": 0, "F": 1}, _sn = sn || QS.dress.boneShow.getShow(), _sex = _sexMap[QS.dress.boneShow.getInfoFromShow(_sn).sex], _defShow = QS.dress.boneShow.getDefaultShow()[_sex], _defItems = QS.dress.boneShow.getItemsFromShow(_defShow), _defItemObj = arraytoObject(_defItems, "id"), _defItemsCount = _defItems.length, _items = QS.dress.boneShow.getItemsFromShow(_sn), _count = _items.length;
                    if (_count >
                        _defItemsCount)return false;
                    while (_count) {
                        --_count;
                        if (_defItemObj[_items[_count].id] == undefined)return false
                    }
                    return true
                }, "toEditMode": function (editMode) {
                    QS.flash.executeSync("editFromJs", {commond: "editMode", p: {editMode: 3}})
                }, "takeOffShow": function () {
                    QS.flash.execute("editFromJs", {commond: "takeOffShow"})
                }, "getShowInfo": function (sn) {
                    return QS.flash.executeSync("backData", {commond: "getShowInfo", p: {sn: sn}})
                }, "getItemInfArr": function (sn) {
                    var items = QS.dress.boneShow.getShowInfo(sn).items, count = items.length;
                    while (count) {
                        --count;
                        items[count] = {"_iItemNo": items[count][0], "_iDlyNo": items[count][1], "_iPlyNo": items[count][2], "_iDefX": items[count][3], "_iDefY": items[count][4]}
                    }
                    return items
                }, "isSameShow": function (sn1, sn2, opt) {
                    var p = QS.object.extend({pose: false, sn1: sn1, sn2: sn2}, opt || {});
                    return QS.flash.executeSync("backData", {commond: "isSameShow", p: p})
                }, "initShow": function (sn) {
                    QS.flash.execute("updataProfile", {sex: QS.user.getAvSex(), style: 4, target: sn, force: true})
                }, "toPostureStr": function (sn, sex) {
                    return sn + "#" +
                        sex
                }, "deducePostureSex": function (posture) {
                    var postureStr = posture.slice(3), infoArray = postureStr.split("_"), info1 = infoArray.slice(0, 3), info2 = infoArray.slice(3, 6), disX, disY, result;
                    disX = info1[0] - info2[0];
                    disY = info1[1] - info2[1];
                    result = Math.sqrt(disX * disX + disY * disY);
                    if (result > 20)return"F";
                    return"M"
                }};
            (function () {
                var mulPosture = QS.dress.boneShow.mulPosture = QS.CustomEventModule.create(), storage;

                function editMode(mode) {
                    QS.flash.execute("editFromJs", {commond: "editMode", p: {result: mode}})
                }

                function hasMulPosture(sn) {
                    return/\$[0-9a-z]\|/i.test(sn) &&
                        sn.indexOf("@") > -1
                }

                mulPosture.enter = function () {
                    if (!QS.dress.isBMode())return;
                    editMode(100);
                    mulPosture.trigger("enter")
                };
                mulPosture.leave = function () {
                    editMode(101);
                    mulPosture.trigger("leave")
                };
                mulPosture.preview = function () {
                    mulPosture.trigger("preview")
                };
                mulPosture.deleteFrom = function (showStr) {
                    var showArray = showStr.split("#");
                    showArray.length = 5;
                    return showArray.join("#")
                };
                mulPosture.extractFrom = function (showStr) {
                    var showArray = showStr.split("#");
                    return showArray[5] || ""
                };
                mulPosture.getIndexUrl = function (sex) {
                    sex =
                        sex || QS.user.getAvSex();
                    return"http://imgcache.qq.com/qqshow/v5/bone/html/mul_posture.html?sex=" + sex
                };
                mulPosture.isIndexUrl = function (url) {
                    url = String(url);
                    var index = QS.browser.parseUrl(mulPosture.getIndexUrl()), compare = QS.browser.parseUrl(url);
                    return index.origin + index.pathname === compare.origin + compare.pathname
                };
                mulPosture.saveLatterThenBone = function () {
                    var t1 = QS.user.getSaveShowTime(QS.dress.BONEMODE), t2 = mulPosture.getSaved().saveTime;
                    if (t2 > t1)return true;
                    return false
                };
                mulPosture.hasInShow = function (showStr) {
                    return showStr.indexOf("B1") > -1 && hasMulPosture(showStr)
                };
                mulPosture.isMulString = function (sn) {
                    return sn.indexOf("B1") === -1 && hasMulPosture(sn)
                };
                mulPosture.translateSex = function (sex) {
                    var map = {"0": "M", 1: "F", "M": "0", "F": "1"};
                    sex = String(sex);
                    return map[sex] || ""
                };
                storage = function () {
                    var exports = {}, LIB_NAME = "_user", SAVED_POSTURE = "savedMulPosture", SAVED_TIME = "savedMulPostureTime";
                    exports.get = function () {
                        return""
                    };
                    exports.getSaved = function () {
                        var storageString = QS.data.storage.get(LIB_NAME, SAVED_POSTURE), time = QS.data.storage.get(LIB_NAME,
                            SAVED_TIME);
                        return{storageString: storageString, saveTime: time}
                    };
                    exports.setSaved = function (storageString, time) {
                        QS.data.storage.set(LIB_NAME, SAVED_POSTURE, storageString);
                        QS.data.storage.set(LIB_NAME, SAVED_TIME, time)
                    };
                    return exports
                }();
                function toStorageString(postureString) {
                    var sex = QS.dress.boneShow.deducePostureSex(postureString);
                    sex = mulPosture.translateSex(sex);
                    return sex + "#" + postureString
                }

                function toJson(storageString) {
                    var sex = mulPosture.translateSex(storageString.charAt(0));
                    return{postureString: storageString.slice(2),
                        interval: QS.user._getQmulpinterval(), sex: sex}
                }

                mulPosture.get = function () {
                    var postureString = storage.get() || mulPosture.getSaved().postureString;
                    return toJson(toStorageString(postureString))
                };
                mulPosture.getSaved = function () {
                    var info = storage.getSaved(), storageString = info.storageString || QS.user._getQmultposture(), saveTime = info.saveTime || QS.user._getQmpbtime() * 1E3, json = toJson(storageString);
                    json.saveTime = saveTime;
                    return json
                };
                mulPosture.setSaved = function (postureString, ts) {
                    var str = toStorageString(postureString);
                    storage.setSaved(str, ts)
                }
            })();
            QS.dress.addDefShowFace = function (sn) {
                var Defface = [
                    ["1_402_0_0_0_0_0_0_0_402_0_0_0_0_0_0_100_0_|3_451_0_0_0_0_0_0_0_451_0_0_0_0_0_0_100_0_|2_461_0_0_0_0_0_0_0_461_0_0_0_0_0_0_100_0_|6_473_0_0_0_0_0_0_0_473_0_0_0_0_0_0_100_0_|1_482_0_0_0_0_0_0_0_482_0_0_0_0_0_0_100_0_", "7_402_0_0_0_0_0_0_0_402_0_0_0_0_0_0_100_0_|9_451_0_0_0_0_0_0_0_451_0_0_0_0_0_0_100_0_|8_461_0_0_0_0_0_0_0_461_0_0_0_0_0_0_100_0_|12_473_0_0_0_0_0_0_0_473_0_0_0_0_0_0_100_0_|7_482_0_0_0_0_0_0_0_482_0_0_0_0_0_0_100_0_"],
                    ["1038987_402_0_0_0_0_0_0_0_402_0_0_0_0_0_0_100_0_|1038989_451_0_0_0_0_0_0_0_451_0_0_0_0_0_0_100_0_|1039156_450_0_0_0_0_0_0_0_450_0_0_0_0_0_0_100_0_|1038992_461_0_0_0_0_0_0_0_461_0_0_0_0_0_0_100_0_|1038986_465_0_0_0_0_0_0_0_465_0_0_0_0_0_0_100_0_|1038991_469_0_0_0_0_0_0_0_469_0_0_0_0_0_0_100_0_|1038990_473_0_0_0_0_0_0_0_473_0_0_0_0_0_0_100_0_|1038988_482_0_0_0_0_0_0_0_482_0_0_0_0_0_0_100_0_", "1038998_402_0_0_0_0_0_0_0_402_0_0_0_0_0_0_100_0_|1039000_451_0_0_0_0_0_0_0_451_0_0_0_0_0_0_100_0_|1039155_450_0_0_0_0_0_0_0_450_0_0_0_0_0_0_100_0_|1039003_461_0_0_0_0_0_0_0_461_0_0_0_0_0_0_100_0_|1038997_465_0_0_0_0_0_0_0_465_0_0_0_0_0_0_100_0_|1039002_469_0_0_0_0_0_0_0_469_0_0_0_0_0_0_100_0_|1039001_473_0_0_0_0_0_0_0_473_0_0_0_0_0_0_100_0_|1038999_482_0_0_0_0_0_0_0_482_0_0_0_0_0_0_100_0_"]
                ];
                var defArr = sn.split("#");
                var aUserInfo = defArr[1].split("_");
                var iSex = aUserInfo[0] == "M" ? 1 : 0;
                var iStyle = aUserInfo[1];
                return defArr[0] + "#" + defArr[1] + "#" + Defface[iStyle][iSex] + "|" + defArr[2] + "#" + (defArr.length == 4 ? defArr[3] : "")
            };
            QS.dress.putOnShow = function (sn) {
                var _flash = QS.dress.getFlash(), _itemSn = _flash.ToItemSn(0, 0, 0), _mode = QS.user.getAvMode();
                if (sn.split("#").length < 3)return;
                if (_itemSn == sn)sn = QS.dress.getDefaultShow(_mode); else {
                    var _isDefaultShow = QS.avatar.strictCheckDefaultShow(sn);
                    if (!_isDefaultShow)if (QS.dress.fashion.isSameShow(sn,
                        QS.dress.getShow(), {"checkHead": false}))sn = QS.dress.getDefaultShow(_mode)
                }
                if (sn.split("#").length < 3)return;
                if (QS.dress.isPMode(_mode))sn = QS.dress.photoShow.toOriginalScale(sn);
                _flash.FromItemSn(sn, true);
                QS.dress.readyInitShow(0)
            };
            QS.dress.putOnItem = function (param) {
                var _itemNo = param.id, _chSex = param.sex, _plyNo = param.layers, _fStl = param.pose, _bPoseBind = param.isFixed, _defX = param.defX, _defY = param.defY, _bMov = param.movable, _bRot = param.rotatable, _bSelc = param.selectable, _type = param.type, _logo = param.logo, _from =
                    param.from, _tryItem = param.tryItem, _sex = QS.user.getAvSex(), _mode = QS.user.getAvMode(), _itemStyle = _itemNo < 1E6 ? 0 : _itemNo < 2E6 ? 1 : -1;
                var _flash = QS.dress.getFlash();
                if (typeof _flash._stAvInf._chAvSex == "undefined" || typeof _flash._stAvInf._iAvStyle == "undefined" || typeof _flash._stAvInf._iDefType == "undefined")return;
                var OldItems = _flash.ToItemSn(0, 0, 0);
                var bHasFace = 0;
                if (_flash.CntSpcItem(102) > 0)bHasFace = 1;
                if (1 == _flash.ShopProc(_itemNo, _chSex, _plyNo, _fStl, _bPoseBind, _defX, _defY, _bMov, _bRot, _bSelc, _type, _logo));
            };
            QS.dress.putOnBoneShow = function (sn, options) {
                QS.flash.execute("showFromJs", {commond: "putOn", p: {target: sn, type: 0, isNotRecorded: options.isNotRecorded, force: options.force}})
            };
            QS.dress.putOnBonePosture = function (sn, isNotRecorded) {
                QS.flash.execute("showFromJs", {commond: "putOn", p: {target: sn, type: 2, isNotRecorded: isNotRecorded}})
            };
            QS.dress.putOnBoneMulPosture = function (postureArray) {
                QS.flash.execute("showFromJs", {commond: "putOn", p: {target: postureArray, type: 4}})
            };
            QS.dress.putOnBoneItem = function (param, isNotRecorded) {
                var t =
                    [];
                if (QS.lang.isArray(param))t = param; else t.push(param);
                QS.flash.execute("showFromJs", {commond: "putOn", p: {target: t, type: 1, isNotRecorded: isNotRecorded}})
            };
            QS.dress.takeOffBoneItems = function (param, isNotRecorded) {
                var t = [];
                if (param instanceof Array == false) {
                    if (typeof param.length == "undefined")return false;
                    for (var i = 0; i < param.length; i++)t.push(param[i])
                } else if (QS.lang.isArray(param))t = param; else t.push(param);
                QS.flash.execute("showFromJs", {commond: "takeOff", p: {target: t, type: 1, isNotRecorded: isNotRecorded}})
            };
            QS.dress.putOnHead = function (sn) {
                var _showInfo = QS.head._parse(sn), _mode = QS.dress._getItemMode(parseInt(_showInfo.show));
                if (QS.dress.isFMode(_mode)) {
                    if (QS.head._isSameHead(sn))sn = QS.head._getDefaultHead();
                    QS.dress.fashion.putOnHead(sn)
                } else if (QS.dress.isBMode(_mode))QS.dress.boneShow.putOnHead(_showInfo.show)
            };
            QS.dress._forceChange = function (sex, mode, opt) {
                var _switchUrl;
                opt = opt || {"jump": 0};
                QS.user.setAvSex(sex);
                QS.user.setAvMode(mode);
                QS.dress.initShow(QS.dress.getDefaultShow());
                QS.frame.sex.setStatus(sex);
                QS.frame.tryArea.initEvent(mode);
                if (opt.jump) {
                    _switchUrl = QS.browser.switchUrl(QS.browser.hash.get());
                    if (QS.frame.menu.selectMenu(_switchUrl) == false)QS.frame.menu.changeFilter({sex: sex});
                    QS.frame.location(_switchUrl)
                } else QS.frame.menu.changeFilter({sex: sex})
            };
            QS.dress.photoShow = {};
            (function (photoShow) {
                function _getItems(sn) {
                    var _flash;
                    if (sn) {
                        _flash = new QQSHOWAV;
                        _flash.FromItemSn(sn)
                    } else _flash = QS.dress.getFlash();
                    var itemList = _flash._arrItemInf, count = itemList.length;
                    while (count) {
                        --count;
                        if (QS.dress.isPMode(QS.dress._getItemMode(itemList[count]._iItemNo)) ==
                            false)itemList.splice(count, 1)
                    }
                    return itemList
                }

                var storage = function () {
                    var exports = {}, base64Key = "base64_cache", showKey = "show_cache", supportLocalStorage = QS.userAgent.support.localStorage();

                    function has() {
                        return supportLocalStorage && !!localStorage.getItem(base64Key)
                    }

                    function restore() {
                        var flash = QS.dress.getFlash(), itemList = [], count = 0, obj = get();
                        if (has()) {
                            QS.dress.getFlash().FromItemSn(QS.dress.getDefShow(QS.user.getAvSex(), QS.dress.FASHIONMODE), false);
                            QS.dress.initShow(flash.ToStr(flash._stAvInf, _getItems(obj[showKey])));
                            flashInterface.applyPhotoData(obj[base64Key])
                        }
                    }

                    function store(data, sn) {
                        if (supportLocalStorage) {
                            localStorage.setItem(base64Key, data);
                            if (sn)localStorage.setItem(showKey, sn)
                        }
                    }

                    function set(data) {
                        if (has())localStorage.setItem(showKey, data)
                    }

                    function get() {
                        var obj = {};
                        if (supportLocalStorage) {
                            obj[base64Key] = localStorage.getItem(base64Key);
                            obj[showKey] = localStorage.getItem(showKey)
                        }
                        return obj
                    }

                    function clear() {
                        if (supportLocalStorage) {
                            localStorage.removeItem(base64Key);
                            localStorage.removeItem(showKey)
                        }
                    }

                    exports.has =
                        has;
                    exports.restore = restore;
                    exports.store = store;
                    exports.set = set;
                    exports.get = get;
                    exports.clear = clear;
                    return exports
                }();
                var flashInterface = function () {
                    var exports = {};

                    function execute(command, param) {
                        QS.flash.execute("editFromJs", {commond: "photoShow", p: {c: command, p: param || ""}})
                    }

                    function applyFilter(filterType) {
                        execute("filter", {type: filterType})
                    }

                    function applyPhotoData(data, sn) {
                        photoShow.hasPhotoInTryArea.flag = true;
                        execute("photo", {base64: data});
                        storage.store(data, sn)
                    }

                    function uploadPhoto() {
                        execute("save")
                    }

                    function multPhotoPlay(data) {
                        QS.flash.execute("clearAll");
                        execute("roll", data)
                    }

                    function showDefault(modeName) {
                        QS.flash.execute("clearAll");
                        execute("showDefault", {type: modeName})
                    }

                    function toSelect() {
                        execute("toSelect")
                    }

                    function toAdjust() {
                        execute("toAdjust")
                    }

                    exports.applyFilter = applyFilter;
                    exports.applyPhotoData = applyPhotoData;
                    exports.uploadPhoto = uploadPhoto;
                    exports.multPhotoPlay = multPhotoPlay;
                    exports.showDefault = showDefault;
                    exports.toSelect = toSelect;
                    exports.toAdjust = toAdjust;
                    return exports
                }();
                var stats =
                    function () {
                        var exports = {}, effectType, pictureOrigin;

                        function DataAccess(data, fn) {
                            this._validData = fn || function (o) {
                                return o
                            };
                            this.data = fn && fn(data) || data
                        }

                        DataAccess.prototype = {set: function (value) {
                            this.data = this._validData(value)
                        }, get: function () {
                            return this.data
                        }};
                        function putOnSuit() {
                            effectType.set(-1);
                            pictureOrigin.set(-1)
                        }

                        effectType = new DataAccess(-1);
                        pictureOrigin = new DataAccess(-1);
                        exports.effectType = effectType;
                        exports.pictureOrigin = pictureOrigin;
                        exports.putOnSuit = putOnSuit;
                        return exports
                    }();
                var tryArea =
                    function () {
                        var exports = {}, container, className = "g_show_wide", shrinkWidth = 268, expandWidth = 979, flashId = "myavatar", css = QS.css, expanded, tryAreaDiv;

                        function init() {
                            container = QS.$("dress");
                            flash = function () {
                                if (navigator.appName.indexOf("Microsoft") != -1) {
                                    if (parseInt(QS.userAgent.ie) >= 9)return document.getElementById(flashId);
                                    return window[flashId]
                                } else return document[flashId]
                            }();
                            tryAreaDiv = QS.$("shower_wraper")
                        }

                        function mousewheel(event) {
                            var e = event || window.event, delta = 0;
                            if (e.wheelDelta)delta = e.wheelDelta /
                                120; else if (window.opera)delta = -delta; else if (e.detail)delta = -e.detail / 3;
                            flash.handleMouseWheelEvent && flash.handleMouseWheelEvent({x: e.offsetX === undefined ? e.layerX : e.offsetX, y: e.offsetY === undefined ? e.layerY : e.offsetY, delta: delta});
                            QS.event.preventDefault();
                            QS.event.cancelBubble();
                            return false
                        }

                        function expand() {
                            !container && init();
                            if (expanded)return;
                            expanded = true;
                            flash.setAttribute("width", expandWidth);
                            css.addClassName(container, className);
                            QS.frame.mask.show();
                            tryAreaDiv.style.zIndex = QS.frame.mask.ZINDEX +
                                1;
                            QS.event.addEvent(tryAreaDiv, "mousewheel", mousewheel);
                            QS.event.addEvent(tryAreaDiv, "DOMMouseScroll", mousewheel)
                        }

                        function shrink() {
                            !container && init();
                            if (!expanded)return;
                            expanded = false;
                            flash.setAttribute("width", shrinkWidth);
                            css.removeClassName(container, className);
                            QS.frame.mask.hide();
                            tryAreaDiv.style.zIndex = 2;
                            QS.event.purgeEvent(tryAreaDiv, "mousewheel", mousewheel);
                            QS.event.purgeEvent(tryAreaDiv, "DOMMouseScroll", mousewheel)
                        }

                        exports.expand = expand;
                        exports.shrin   k = shrink;
                        return exports
                    }();
                (function () {
                    function openFloatPage(url, width) {
                        QS.frame.popupFrame.open(url, {width: width})
                    }

                    photoShow.openPhotoEditor = function (status) {
                        status = status || "select";
                        if (!QS.user.checkLogin())return QS.user.login();
                        QS.frame.popupFrame.close();
                        var action = "to" + status.replace(/^(\w)/, function (firstChar) {
                            return firstChar.toUpperCase()
                        });
                        flashInterface[action]();
                        tryArea.expand()
                    };
                    photoShow.closePhotoEditor = function () {
                        tryArea.shrink()
                    };
                    photoShow.openEffectPage = function () {
                        tryArea.shrink();
                        openFloatPage("http://imgcache.qq.com/qqshow/v5/photoShow/html/effect.html",
                            322)
                    }
                })();
                var util = function () {
                    var exports = {};

                    function isPhotoItemRange(itemNo) {
                        return QS.dress._getItemMode(itemNo) == QS.dress.PHOTOSHOWMODE
                    }

                    exports.isPhotoItemRange = isPhotoItemRange;
                    return exports
                }();

                function SaveButton(domId, onEnable, onDisable) {
                    this.domId_ = domId;
                    this.disabled = false;
                    this.onDisable_ = onDisable || function () {
                    };
                    this.onEnable_ = onEnable || function () {
                    }
                }

                SaveButton.prototype.enable = function () {
                    this.disabled = false;
                    this.dom_ = this.dom_ || document.getElementById(this.domId_);
                    this.dom_.setAttribute("data-savebutton-disable",
                        "0");
                    this.onEnable_(this.dom_)
                };
                SaveButton.prototype.disable = function () {
                    this.disabled = true;
                    this.dom_ = this.dom_ || document.getElementById(this.domId_);
                    this.dom_.setAttribute("data-savebutton-disable", "1");
                    this.onDisable_(this.dom_)
                };
                var getSaveShowButton = function () {
                    var exports = function (showMode) {
                        return new SaveButton("saveshow_btn_" + showMode, onEnable, onDisable)
                    };

                    function onEnable(dom) {
                        dom.innerHTML = "<span>\u4fdd\u5b58\u5f62\u8c61</span>"
                    }

                    function onDisable(dom) {
                        dom.innerHTML = "<span>\u4fdd\u5b58\u4e2d...</span>"
                    }

                    return exports
                }();
                var photoShowSaveButton = getSaveShowButton(QS.dress.PHOTOSHOWMODE), multPhotoShowSaveButton = getSaveShowButton(QS.dress.MULPSHOWMODE);

                function save(showStr) {
                    if (photoShowSaveButton.disabled)return;
                    if (!QS.user.checkLogin())return QS.user.login();
                    if (!QS.dress.photoShow.hasPhotoInTryArea()) {
                        QS.dialog.tips("\u8bf7\u5148\u4e0a\u4f20\u7167\u7247\uff0c\u518d\u4fdd\u5b58\u5f62\u8c61\u3002", {icon: "tips_ico_failed"});
                        return false
                    }
                    var pictrueOrigin = photoShow.stats.pictureOrigin.get(), effectType =
                        photoShow.stats.effectType.get();
                    var param = {ss: showStr, omode: 2, from: "v5"};
                    if (pictrueOrigin != -1)param.photoSource = pictrueOrigin;
                    if (effectType != -1)param.filterType = effectType;
                    photoShowSaveButton.disable();
                    QS.json.send("http://gm.show.qq.com/cgi-bin/qs_gm_zhaopian_saveshow", param, resultProc, "POST");
                    function resultProc(result) {
                        photoShowSaveButton.enable();
                        var code = result.code;
                        switch (code) {
                            case 0:
                                QS.dress.photoShow.hasPhotoInTryArea.flag = false;
                                QS.dress.records.set({"type": "show", "item": "", "show": showStr});
                                QS.user.setSaveUserShow(showStr, QS.dress.PHOTOSHOWMODE);
                                QS.user.setSaveShowTime(QS.date.getCurrentTime(), QS.dress.PHOTOSHOWMODE);
                                var url = "http://imgcache.qq.com/qqshow/v5/public/html/save/savesucc.html?succMode=photoShow";
                                QS.frame.popupFrame.open(url, {width: 445});
                                QS.frame.popupFrame.maskEnd();
                                QS.dress.photoShow.storage.clear();
                                break;
                            case -1001:
                                QS.user.login();
                                break;
                            case -3002:
                            case -3003:
                            case -3016:
                            case -3020:
                                var url = "http://imgcache.qq.com/qqshow/v5/public/html/save/no_qualification.html?source=photoShow";
                                QS.frame.popupFrame.open(url, {width: 445});
                                QS.frame.popupFrame.maskEnd();
                                break;
                            default:
                                var map = function () {
                                    var _map = {"-1004": {msg: "\u60a8\u64cd\u4f5c\u7684\u9891\u7387\u592a\u5feb\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"}, "-3009": {msg: "\u60a8\u7684\u5f62\u8c61\u4e2d\u542b\u6709\u672a\u6b63\u5e38\u8bd5\u7a7f\u7684\u7269\u54c1\uff0c\u8bf7\u5220\u9664\u540e\u518d\u4fdd\u5b58\u3002"}, "-3010": {msg: "\u60a8\u8eab\u4e0a\u7269\u54c1\u8d85\u8fc7\u4e0a\u965020\u4ef6\uff0c\u8bf7\u5220\u51cf\u90e8\u5206\u518d\u8bd5\u3002"},
                                        "-3022": {msg: "\u4e2a\u4eba\u5f62\u8c61\u65e0\u4efb\u4f55\u4fee\u6539\uff0c\u60a8\u53ef\u4ee5\u66f4\u6362\u8eab\u4e0a\u7269\u54c1\u540e\u518d\u8fdb\u884c\u4fdd\u5b58\u3002", icon: "tips_ico_normal"}};
                                    _map["-3017"] = _map["-1004"];
                                    return _map
                                }(), title = "\u4fdd\u5b58\u5f62\u8c61\u5931\u8d25", failInfo = map[code];
                                QS.dialog.tips(title, {icon: failInfo.icon || "tips_ico_failed", msg: failInfo.msg})
                        }
                    }
                }

                function saveMultPhoto() {
                    if (multPhotoShowSaveButton.disabled)return;
                    if (!QS.user.checkLogin()) {
                        QS.user.login();
                        return
                    }
                    var queue =
                        previewMultPhoto.previewData || QS.user.getMulpshowData().avStrings || [];
                    if (queue.length == 0) {
                        QS.dialog.tips("\u8bf7\u5148\u5728\u53f3\u4fa7\u9875\u9762\u5236\u4f5c\u8f6e\u64ad\u7167\u7247\u79c0", {icon: "tips_ico_failed"});
                        return
                    }
                    var param = {op: 1, uin: QS.user.getUin()};
                    for (var i = 0, len = queue.length; i < len; i++)param["show" + i] = queue[i];
                    multPhotoShowSaveButton.disable();
                    QS.json.send("http://gm.show.qq.com/cgi-bin/qs_gm_mult_zhaopianshow", param, resultProc, "POST");
                    function resultProc(result) {
                        multPhotoShowSaveButton.enable();
                        var map = {"-1004": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\u3002", "-3017": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\u3002", "-3004": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u63d0\u4ea4\u7684\u5f62\u8c61\u4e32\u975e\u6cd5\u3002", "-3005": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u642d\u914d\u7684\u7167\u7247\u79c0\u7269\u54c1\u8fc7\u591a\uff0c\u8bf7\u4e0d\u8981\u8d85\u8fc720\u4e2a\u3002", "-3006": "\u5bf9\u4e0d\u671f\uff0c\u60a8\u4fdd\u5b58\u7167\u7247\u79c0\u592a\u9891\u7e41\u3002",
                            "-3007": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u5f53\u524d\u5f62\u8c61\u672a\u6539\u53d8\u3002", "-3008": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u672a\u6ce8\u518cQQ\u79c0\u3002", "-3010": "\u5bf9\u4e0d\u8d77\uff0c\u83b7\u53d6\u591a\u56fe\u7167\u7247\u79c0\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\u3002", "-3011": "\u5bf9\u4e0d\u8d77\uff0c\u83b7\u53d6\u7167\u7247\u5217\u8868\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\u3002", "-3012": "\u5bf9\u4e0d\u8d77\uff0c\u83b7\u53d6\u7167\u7247\u79c0\u5217\u8868\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\u3002",
                            "-3013": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8bbe\u7f6e\u7684\u8f6e\u64ad\u7167\u7247\u6570\u91cf\u8d85\u8fc7\u9650\u5236\u3002", "-3014": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8bbe\u7f6e\u7684\u8f6e\u64ad\u7167\u7247\u6570\u91cf\u5c11\u4e8e\u6700\u4f4e\u6570\u91cf\u9650\u5236\u3002"};
                        switch (result.code) {
                            case 0:
                                QS.user.setSaveUserShow(queue.slice(0), QS.dress.MULPSHOWMODE);
                                QS.user.setSaveShowTime(QS.date.getCurrentTime(), QS.dress.MULPSHOWMODE);
                                var url = "http://imgcache.qq.com/qqshow/v5/public/html/save/savesucc.html?succMode=multPhotoShow";
                                QS.frame.popupFrame.open(url, {width: 445});
                                QS.frame.popupFrame.maskEnd();
                                break;
                            case -1001:
                                QS.user.login();
                                break;
                            case -3002:
                            case -3003:
                            case -3009:
                                var url = "http://imgcache.qq.com/qqshow/v5/public/html/save/no_qualification.html?source=multPhotoShow";
                                QS.frame.popupFrame.open(url, {width: 445});
                                QS.frame.popupFrame.maskEnd();
                                setTimeout(function () {
                                    if (QS.frame.popupFrame._getContainer().src == url)QS.frame.popupFrame.close()
                                }, 5E3);
                                break;
                            default:
                                var message = map[result.code] || "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002";
                                QS.dialog.tips(message, {icon: "tips_ico_failed"})
                        }
                    }
                }

                function previewMultPhoto(queueString) {
                    var queue = queueString.split(",");
                    QS.frame.tryArea.toggle(1);
                    flashInterface.multPhotoPlay({interval: 5, avStrings: queue});
                    previewMultPhoto.previewData = queue;
                    QS.dialog.tips("\u8bf7\u5728\u8bd5\u7a7f\u6846\u67e5\u770b\u8f6e\u64ad\u6548\u679c")
                }

                function _initMulPShow(obj) {
                    QS.dress.switchMode(QS.dress.PHOTOSHOWMODE);
                    if (obj && obj.avStrings && obj.avStrings.length)QS.dress.photoShow.flashInterface.multPhotoPlay(obj); else QS.dress.photoShow.flashInterface.showDefault("multiple")
                }

                function _initSingleShow(sn) {
                    if (sn)QS.dress.fashion.initShow(QS.dress.photoShow.toOriginalScale(sn)); else {
                        QS.dress.switchMode(QS.dress.PHOTOSHOWMODE);
                        QS.dress.photoShow.flashInterface.showDefault("single");
                        QS.dress.getFlash().FromItemSn(QS.dress.getDefShow(QS.user.getAvSex(), QS.dress.FASHIONMODE), true)
                    }
                }

                function getDefMShow() {
                    if (QS.user.checkLogin())return QS.user.getMulpshowData();
                    return""
                }

                function getDefSingleShow() {
                    if (QS.user.checkLogin()) {
                        var record = QS.dress.records.getLatest(), sn = record && record.show ||
                            QS.user.getSaveUserShow(QS.dress.PHOTOSHOWMODE);
                        if (sn)return QS.dress.removeItems(sn)
                    }
                    return""
                }

                function hasPhotoInTryArea() {
                    return QS.dress.isPMode() && !!(hasPhotoInTryArea.flag || QS.dress.isPhotoShow(QS.dress.getShow()) || QS.user.getSaveUserShow(QS.dress.PHOTOSHOWMODE))
                }

                function toOriginalScale(sn) {
                    var splitShow = sn.split("#"), infos = splitShow[1].split("_");
                    infos[4] = "100";
                    infos[6] = "0";
                    infos[7] = "0";
                    splitShow[1] = infos.join("_");
                    return splitShow.join("#")
                }

                photoShow.storage = storage;
                photoShow.flashInterface =
                    flashInterface;
                photoShow.stats = stats;
                photoShow.save = save;
                photoShow.initSingleShow = _initSingleShow;
                photoShow.initMulPShow = _initMulPShow;
                photoShow.util = util;
                photoShow.saveMultPhoto = saveMultPhoto;
                photoShow.previewMultPhoto = previewMultPhoto;
                photoShow.getDefMShow = getDefMShow;
                photoShow.getDefSingleShow = getDefSingleShow;
                photoShow.hasPhotoInTryArea = hasPhotoInTryArea;
                photoShow.toOriginalScale = toOriginalScale
            })(QS.dress.photoShow)
        };
    QSTRING.head = function () {
        QS.head = {};
        QS.head._getHeadLy = function (mode) {
            var _headLy =
                [
                    [402, 451, 461, 473, 476, 478, 482, 483],
                    [402, 450, 451, 454, 457, 461, 465, 468, 469, 472, 473, 476, 482, 483]
                ];
            mode = mode == undefined ? QS.user.getAvMode() : mode;
            return _headLy[mode] ? _headLy[mode] : []
        };
        QS.head._getRelateLy = function (ly) {
            var _flash = QS.dress.getFlash(), _relateLy = _flash.GetRelateLy(ly, 0);
            return QS.array.unique(_relateLy.concat(QS.head._getHeadLy(1)))
        };
        QS.head._filterItemInShow = function (sn, ly) {
            var _headLy = ly || QS.head._getHeadLy(), _sn = sn || QS.dress.getShow(), _avatar = new QQSHOWAV, _itemList = [], _headItemList = [],
                _count;
            _avatar.FromItemSn(_sn, true);
            _itemList = _avatar._arrItemInf;
            _count = _itemList.length;
            while (_count) {
                --_count;
                if (QS.array.find(_headLy, _itemList[_count]._iDlyNo) != null)_headItemList.push(_itemList.splice(_count, 1)[0])
            }
            return{"headItems": _headItemList, "otherItems": _itemList, "avatarObj": _avatar}
        };
        QS.head._getSeparator = function () {
            return"&"
        };
        QS.head._getPrefix = function () {
            return"head"
        };
        QS.head.toHeadStr = function (opt) {
            var _separator = QS.head._getSeparator(), _prefix = QS.head._getPrefix();
            if (QS.object.getType(opt) ==
                "object")return[_prefix, opt.show, opt.sex, opt.uin, opt.id].join("&"); else if (QS.lang.isArray(opt)) {
                opt.unshift(_prefix);
                return opt.join("&")
            }
        };
        QS.head._parse = function (sn) {
            var _a = sn.split(QS.head._getSeparator());
            return{"show": _a[1], "sex": _a[2], "uin": _a[3], "id": _a[4]}
        };
        QS.head.isHead = function (sn) {
            return sn.split(QS.head._getSeparator())[0] == QS.head._getPrefix() ? true : false
        };
        QS.head._getHeadType = function (sn) {
            sn = sn || QS.dress.getShow();
            return QS.flash.executeSync("backData", {commond: "getHeadType", p: {"showString": sn}})
        };
        QS.head._replaceHeadInShow = function (toSn, fromSn) {
            var _fromHeadItems, _toShowInfo, _toAvatarObj, fromSn = fromSn || QS.dress.getShow();
            if (QS.user.getAvLockState() == 0)return toSn;
            if (QS.user.getAvLockState() && (QS.head._getHeadType(toSn) == 0 || QS.head._getHeadType(fromSn) == 0))return toSn;
            _fromHeadItems = QS.head._filterItemInShow(fromSn).headItems;
            _toShowInfo = QS.dress.fashion.isSameShow(toSn, fromSn, {"checkHead": false}) ? QS.head._filterItemInShow(QS.dress.getDefShow()) : QS.head._filterItemInShow(toSn);
            _toAvatarObj =
                _toShowInfo.avatarObj;
            return _toAvatarObj.ToStr(_toAvatarObj._stAvInf, _toShowInfo.otherItems.concat(_fromHeadItems))
        };
        QS.head._isSameHead = function (sn1, opt) {
            var headItems1 = [], headItems2 = [], count = 0;

            function _formatParam(sn1, opt) {
                opt = opt || {};
                opt.sn2 = opt.sn2 || QS.dress.getShow();
                if (QS.head.isHead(opt.sn2) == false)headItems2 = QS.array.each(QS.head._filterItemInShow(opt.sn2).headItems, function (sn) {
                    return sn.ToStr()
                }); else headItems2 = QS.head._parse(opt.sn2).show.split("|");
                if (QS.head.isHead(sn1))headItems1 =
                    QS.head._parse(sn1).show.split("|"); else headItems1 = QS.array.each(QS.head._filterItemInShow(sn1).headItems, function (sn) {
                    return sn.ToStr()
                })
            }

            function sortItems(items) {
                return items.sort(function (item1, item2) {
                    var ly1 = parseInt(item1.split("_")[9]), ly2 = parseInt(item2.split("_")[9]);
                    if (ly1 < ly2)return-1; else if (ly1 > ly2)return 1;
                    return 0
                })
            }

            function isSameItem(item1, item2) {
                var itemInfo1 = item1.split("_"), itemInfo2 = item2.split("_"), count = itemInfo1.length, relateLy = [457, 476, 483], ly1 = Number(itemInfo1[9]), ly2 = Number(itemInfo2[9]);
                if (item1 == item2)return true;
                while (count) {
                    --count;
                    if (Number(itemInfo1[count]) == Number(itemInfo2[count]))continue; else {
                        if (QS.array.find([8, 16, 18], count) != null)continue;
                        if (QS.array.find([14, 15], count) != null) {
                            itemInfo1[count] = Number(itemInfo1[count]) == 100 ? 0 : Number(itemInfo1[count]);
                            itemInfo2[count] = Number(itemInfo2[count]) == 100 ? 0 : Number(itemInfo2[count]);
                            if (itemInfo1[count] == itemInfo2[count])continue; else return false
                        }
                        if (ly1 == ly2 && QS.array.find(relateLy, ly1) != null)if (Number(itemInfo1[0]) == Number(itemInfo2[0]))continue;
                        return false
                    }
                }
                return true
            }

            _formatParam(sn1, opt);
            headItems1 = sortItems(headItems1);
            headItems2 = sortItems(headItems2);
            count = headItems1.length;
            if (count != headItems2.length)return false;
            while (count) {
                --count;
                if (isSameItem(headItems1[count], headItems2[count]) == false)return false
            }
            return true
        };
        QS.head._getDefaultHead = function () {
            var headItems = QS.array.each(QS.head._filterItemInShow(QS.dress.getDefaultShow()).headItems, function (item) {
                return item.ToStr()
            });
            return QS.head.toHeadStr({"show": headItems.join("|"), "sex": QS.user.getAvSex(),
                "uin": 0, "id": 0})
        }
    };
    QSTRING.data = function () {
        QS.data = {};
        var currentTime = new Date - 0;
        var _top = QS.env.getWindow();
        QS.data.init = function (output) {
            var _temp = output, _s;
            for (var o in _temp) {
                _s = "get" + QS.string.capitalize(o);
                QS.data[_s] = function (o) {
                    return function () {
                        return _temp[o]
                    }
                }(o)
            }
            QS.user.init();
            QS.browser.init()
        };
        QS.data.storage = {_list: {}, set: function (library, key, value) {
            if (QS.lang.getType(QS.data.storage._list[library]) == "undefined")QS.data.storage._list[library] = {};
            QS.data.storage._list[library][key] =
                value
        }, get: function (library, key) {
            var storage = QS.data.storage._list[library];
            if (!storage)return;
            if (typeof key == "undefined")return QS.object.extend({}, storage);
            return storage[key]
        }, remove: function (library, key) {
            var storage = QS.data.storage._list[library] || {};
            delete storage[key]
        }, clear: function (library) {
            delete QS.data.storage._list[library]
        }};
        QS.msg = function () {
            var getBmp = function () {
                return QS.user.getAllExtInfo().bmp
            };
            var getCount = function () {
                return getBmp().msgcount
            };
            var setCount = function (value) {
                getBmp().msgcount =
                    Math.max(value, 0)
            };
            var updateBoth = function (value) {
                setCount(value);
                QS.$("user_msg_num").innerHTML = getCount()
            };
            var decrease = function () {
                if (!QS.user.checkLogin())return;
                updateBoth(getCount() - 1)
            };
            var updateNum = function (value) {
                if (!QS.user.checkLogin())return;
                updateBoth(value)
            };
            return{_decrease: decrease, _updateNum: updateNum}
        }();
        QS.so = {};
        QS.so.set = function (key, value) {
            return QS.flash._setSo(key, encodeURIComponent(value))
        };
        QS.so.get = function (key) {
            var _value = QS.flash._getSo(key);
            if (_value == null)return"";
            return decodeURIComponent(_value)
        };
        QS.so.isOk = function () {
            return QS.flash._checkSoValid()
        };
        QS.so.remove = function (key) {
            return QS.flash._removeSo(key)
        };
        QS.so.flashReadyExecute = function (fn) {
            if (QS.so.isOk())QS.lang.isFunction(fn) && fn(); else setTimeout(function () {
                QS.so.flashReadyExecute(fn)
            }, 100)
        };
        QS.date = {};
        QS.date.getCurrentTime = function () {
            var _curTime = new Date;
            var _time = QS.user._getQnow() * 1E3;
            return _time + (_curTime - currentTime)
        }
    };
    QSTRING.browser = function () {
        QS.browser = {};
        QS.browser.init = function () {
            QS.browser.validTopFrame();
            var _hash =
                unescape(window.location.hash.toString()), _count = QS.param.getUrl("rcount", QS.browser.hash.get());

            function _set() {
                var _mode = QS.browser.hash.getAvMode(), _sex = QS.browser.hash.getAvSex();
                if (_mode != null)QS.user.setAvMode(_mode);
                if (_sex != null) {
                    if (_sex.substr(0, 1) == "U")_sex = _sex.substr(1, 1);
                    QS.user.setAvSex(_sex)
                }
            }

            if (QS.param.getHash("islogin") == "1") {
                QS.data.storage.set("browser", "isLogin", true);
                _hash = _hash.replace(/(&)+islogin=1/g, "").replace(/#/g, "");
                if (_count !== "") {
                    QS.data.storage.set("browser", "rcount",
                        _count);
                    _hash = _hash.replace(/(&)+rcount=(\d)+/g, "").replace(/#/g, "");
                    if (_count !== "0")_set()
                }
                window.location.hash = escape(_hash)
            } else _set()
        };
        QS.browser.validTopFrame = function () {
            if (window != top)location.href = "http://imgcache.qq.com/qqshow/v5/public/html/system/info/page-used-in-illlegal-domain.html"
        };
        QS.browser.isLogined = function () {
            return QS.data.storage.get("browser", "isLogin")
        };
        QS.browser.hasRecords = function () {
            var _rcount = QS.data.storage.get("browser", "rcount");
            return _rcount == null ? null : parseInt(_rcount)
        };
        QS.object.extend(QS.browser, function () {
            var _map = {"classic": QS.dress.CLASSICALMODE, "fashion": QS.dress.FASHIONMODE, "photoShow": QS.dress.PHOTOSHOWMODE, "bone": QS.dress.BONEMODE, "mulpShow": QS.dress.MULPSHOWMODE};

            function getPathName(mode) {
                if (QS.dress.isMulPShowMode(mode))return"photoShow";
                for (var key in _map)if (_map[key] == mode)return key;
                return"fashion"
            }

            function getModeByPath(path) {
                var _mode = _map[path], mainUrl = QS.browser.hash.get(), filename = QS.browser.parseUrl(mainUrl).filename.toLowerCase();
                if (QS.dress.isPMode(_mode) &&
                    filename === "multphoto.html")path = "mulpShow";
                return _map[path]
            }

            return{"getPathName": getPathName, "getModeByPath": getModeByPath}
        }());
        QS.browser.switchUrl = function (url, opt) {
            opt = opt || {};
            opt.sex = opt.sex || QS.user.getAvSex();
            opt.mode = opt.mode == undefined ? QS.user.getAvMode() : opt.mode;
            var _url = url, _folder = QS.browser.hash.getFolder(), _sex = opt.sex, _urlSex = QS.param.getUrl("sex", _url), _mode = opt.mode, _path = QS.browser.getPathName(_mode), _mainUrl = QS.browser.getMainUrl(_sex, _mode), _urlPrefix = "http://imgcache.qq.com/qqshow/v5/";
            if (QS.dress.isMulPShowMode(_mode))return _mainUrl;
            if (QS.dress.isBMode(_mode) || QS.dress.isPMode(_mode))if (QS.browser.getModeByPath(_folder) != _mode)return _mainUrl; else {
                _sex = _urlSex.substr(0, 1) == "U" ? "U" + _sex : _sex;
                return QS.param.setUrl(_url, "sex", _sex)
            }
            if (_folder == "public") {
                var mode = QS.param.getUrl("mode", _url);
                if (typeof mode != "undefined" && mode != "")_url = QS.param.setUrl(_url, "mode", _mode);
                var sex = QS.param.getUrl("sex", _url);
                if (typeof sex != "undefined" && sex != "")_url = QS.param.setUrl(_url, "sex", _sex);
                return _url
            }
            if (QS.browser.getModeByPath(_folder) !=
                undefined)return _urlPrefix + _path + "/html/index/index_" + _sex.toLowerCase() + ".html?sex=" + _sex;
            return _url
        };
        QS.browser.goMainUrl = function () {
            var _sex = QS.user.getAvSex(), _defaultUrl = QS.browser.getMainUrl(_sex, QS.user.getAvMode()), _hash = QS.browser.hash.get() || _defaultUrl;
            if (QS.browser.isLogined() && QS.browser.hasRecords() === 0)_hash = QS.browser.switchUrl(_hash);
            QS.browser._location(_hash)
        };
        QS.browser.getMainUrl = function (sex, mode) {
            var _mode = mode == undefined ? QS.user.getAvMode() : mode, _sex = sex || QS.user.getAvSex(),
                _path = "http://imgcache.qq.com/qqshow/v5/" + QS.browser.getPathName(_mode) + "/html/", mulPosture = QS.dress.boneShow.mulPosture;
            if (QS.dress.isBMode(_mode)) {
                if (mulPosture.saveLatterThenBone())return mulPosture.getIndexUrl();
                return _path + "index.html?sex=U" + _sex
            }
            if (QS.dress.isPMode(_mode))return _path + "show_photo.html?sex=U" + _sex;
            if (QS.dress.isMulPShowMode(_mode))return _path + "multPhoto.html?sex=U" + _sex;
            return _path + "index/index_" + _sex.toLowerCase() + ".html?sex=" + _sex
        };
        QS.browser._addSex = function (url, opt) {
            var _urlPrefix =
                "http://imgcache.qq.com/qqshow/v5/";
            if (QS.param.getUrl("sex"))return url;
            opt = opt || {};
            opt.sex = opt.sex || QS.user.getAvSex();
            if (url.indexOf(_urlPrefix + "public/html/recommend/weeklytopic/") == 0 || url.indexOf(_urlPrefix + "public/html/recommend/new_products.html") == 0 || url.indexOf(_urlPrefix + "public/html/clothes/") == 0 || url.indexOf(_urlPrefix + "bone/html/item.html") == 0)return QS.param.setUrl(url, "sex", opt.sex);
            return url
        };
        QS.browser._getFrame = function () {
            return QS.$("mainfra")
        };
        QS.browser.getUrl = function (param, hashUrl) {
            var hashUrl = hashUrl || QS.browser.shortUrl.toLong(QS.browser.hash.get()).url, url = location.href.split("#")[0] + "#", o, key;
            for (key in param)if (param.hasOwnProperty(key))hashUrl = QS.param.setUrl(hashUrl, key, param[key]);
            o = QS.browser.shortUrl.toShort(hashUrl);
            if (o.isShort)url += o.hash; else url += escape("u=" + QS.string.escUrl(o.hash));
            return{"longHash": o.url, "shortHash": o.hash, "url": url}
        };
        QS.browser.shortUrl = function () {
            var _urlPrefix = "http://imgcache.qq.com/qqshow/v5/", _hashPrefix = "!", _pageId = "id", _uSex =
                "U", _receiveParam = [_pageId, "frame", "mode", "sex"], _o = _urlTable();

            function _urlTable() {
                return{"fashion/html/index/index_f.html?sex=F&frame=1": "fashion_main_female", "fashion/html/index/index_m.html?sex=M": "fashion_main_male", "classic/html/index/index_f.html?sex=F": "classic_main_female", "classic/html/index/index_m.html?sex=M": "classic_main_male", "bone/html/index.html?sex=UM": "newdoll_main_male", "bone/html/index.html?sex=UF": "newdoll_main_female", "vip/html/index.html?frame=0": "vip_main", "paradise/html/flower/index.html": "paradise_flower_main",
                    "vip/html/privilege/index.html": "vip_privilege_main", "vip/html/info/vipportal_levelinfo.html": "vip_level", "vip/html/info/vipportal_vipyear.html": "vip_year", "vip/html/love/lovervip_index.html": "vip_lovervip", "user/html/my/item.html": "myshow_myitems", "user/html/my/collection.html": "myshow_mycollection", "user/html/msg/index.html": "myshow_message"}
            }

            function _setParam(url, o, isFilter) {
                var key, isUrl = true;
                if (url.indexOf(".html") == -1)isUrl = false;
                for (var key in o)if (o.hasOwnProperty(key)) {
                    if (isFilter && QS.array.find(_receiveParam,
                        key) != null)continue;
                    if (QS.param.getUrl(key, url) == "")if (isUrl)url = QS.param.setUrl(url, key, o[key]); else url = url + "&" + key + "=" + o[key]
                }
                return url
            }

            function _toShort(url) {
                var _url = url, _key, _value, _hash, _compare, _map;
                if (url.indexOf(_urlPrefix) == 0)_url = url.substring(_urlPrefix.length);
                _map = {"url": url, "hash": _url, "isShort": 0};
                _url = _setParam(_url, {"frame": 1}, false);
                for (_key in _o)if (_o.hasOwnProperty(_key)) {
                    _value = _o[_key];
                    _key = _setParam(_key, {"frame": 1}, false);
                    _compare = QS.tools.compareUrl(_urlPrefix + _url, _urlPrefix +
                        _key);
                    if (QS.array.find(["equal", "gt"], _compare) != null) {
                        _hash = _hashPrefix + _pageId + "=" + _value;
                        if (_compare == "gt")_hash = _setParam(_hash, new QS.param(_url.split("?")[1], "&", "="), true);
                        _map.hash = _hash;
                        _map.isShort = 1
                    }
                }
                return _map
            }

            function _toLong(url) {
                var _url = unescape(url).substring(_hashPrefix.length), _id = (new QS.param(_url, "&", "="))[_pageId], _key, _value, _map = {"hash": url, "url": url};
                for (_key in _o)if (_o.hasOwnProperty(_key)) {
                    _value = _o[_key];
                    _key = _setParam(_key, {"frame": 1}, false);
                    if (_id == _value) {
                        _map.url =
                            _setParam(_key, new QS.param(_url, "&", "="), true);
                        return _map
                    }
                }
                return _map
            }

            return{"toShort": _toShort, "toLong": _toLong}
        }();
        QS.browser.parseUrl = function (url) {
            url = url.replace(/^\s+/, "").replace(/\s+$/, "");
            var link = document.createElement("a"), location = window.location, ret = {};
            var translate = function (url) {
                var pureUrl, other, lastChar, firstChar;
                var root = function (url) {
                    return url.replace(/^/, location.origin || origin(location.href))
                };
                var relative = function (url) {
                    var baseElement = document.getElementsByTagName("base")[0],
                        base = baseElement && baseElement.href || pure(location.href).replace(/[^\/]*$/, "");
                    url = url.split("../").join(",").replace(/\.\//g, "").split(",").join("../");
                    base = base.replace(/\/?$/, "/");
                    return base + url
                };
                var parentDir = function (url) {
                    var parentDirArray = url.split("../"), transUrl = parentDirArray.shift();
                    for (var i = 0, len = parentDirArray.length; i < len; i++)transUrl = transUrl.replace(/[^\/]*\/$/, "") + parentDirArray[i];
                    return transUrl
                };
                /[^?#]*/.test(url);
                pureUrl = RegExp.lastMatch;
                other = RegExp.rightContext;
                firstChar = pureUrl.charAt(0);
                lastChar = pureUrl.charAt(pureUrl.length - 1);
                if (lastChar === ".")pureUrl += "/";
                if (firstChar === "/")pureUrl = root(pureUrl); else if (firstChar === "." || firstChar === "..")pureUrl = relative(pureUrl);
                if (pureUrl.indexOf("../") === -1)return pureUrl + other;
                return origin(pureUrl) + "/" + parentDir(pureUrl.replace(/https?:\/\/[^\/]*\/(.*)/, "$1")) + other
            };
            var origin = function (href) {
                return href.replace(/^(https?:\/\/[^\/]*).*$/, "$1")
            };
            var pure = function (href) {
                return href.replace(/(\?|#).*/, "")
            };
            url = translate(url);
            link.href = url;
            for (var name in location)if (typeof location[name] ===
                "string")ret[name] = link[name];
            if (ret.pathname.charAt(0) !== "/")ret.pathname = "/" + ret.pathname;
            ret.origin = ret.origin || origin(ret.href);
            ret.filename = ret.pathname.split("/").pop();
            ret.directory = ret.pathname.replace(/\/[^\/]*$/, "/");
            return ret
        };
        QS.browser._location = function (url, opt) {
            url = QS.browser._addSex(url);
            if (opt == "blank") {
                window.open(url);
                return
            }
            var _url = url;
            if (_url.indexOf("http://") == -1)_url = "http://imgcache.qq.com/qqshow/v5" + _url;
            if (opt == "top") {
                QS.browser.hash.set(_url);
                top.location.reload()
            } else {
                QS._timePoint.framepage_start =
                    new Date;
                var iframe = QS.browser._getFrame();
                QS.browser.hash.set(_url);
                iframe.src = _url
            }
        };
        QS.browser.hash = function () {
            var prefix = "http://imgcache.qq.com/qqshow/v5/", hashName = "u";

            function getHash() {
                var hash = QS.param.getHash(hashName);
                if (hash == "")return QS.browser.shortUrl.toLong(decodeURI(location.hash.substring(1))).url;
                return hash
            }

            function emptyHash(url) {
                return url.replace(/#.*$/, "")
            }

            function setHash(value) {
                var map = QS.browser.shortUrl.toShort(value);
                if (map.isShort) {
                    location.hash = encodeURI(map.hash);
                    return
                }
                value = QS.string.escUrl(value.toString());
                var newUrl = QS.param._getFixHash(location.hash.substr(1));
                newUrl = /^!\w*?=.*/.test(newUrl) ? "" : newUrl;
                var _r = new RegExp("(^|\\W)" + hashName + "=[^&]*", "g");
                location.replace(emptyHash(location.toString()) + "#" + escape(newUrl.match(_r) ? newUrl.replace(_r, "$1" + hashName + "=" + value) : newUrl + (newUrl.length ? "&" : "") + hashName + "=" + value))
            }

            return{set: function (url) {
                var hashUrl = QS.string.trim(url);
                if (hashUrl.charAt(0) === "/")hashUrl = hashUrl.substring(1);
                if (hashUrl.indexOf(prefix) ==
                    0)hashUrl = hashUrl.substring(prefix.length);
                setHash(hashUrl)
            }, get: function () {
                var hashUrl = QS.string.trim(getHash());
                if (!hashUrl.length)return"";
                var reg = /^https?:\/\/\w+\.qq\.com(\/\S*|$)/;
                if (reg.test(hashUrl))return hashUrl;
                return prefix + hashUrl
            }, getAvMode: function () {
                var _hash = getHash(), _mode, _folder;
                _mode = QS.param.getUrl("mode", _hash);
                if (_mode)return _mode;
                _folder = QS.browser.hash.getFolder();
                _mode = QS.browser.getModeByPath(_folder);
                return _mode == undefined ? QS.user.getMode() : _mode
            }, getAvSex: function () {
                return QS.param.getUrl("sex",
                    getHash()) || QS.user.getSex()
            }, getFolder: function () {
                var reg = /^(?!http)(\w+)\//, match = reg.exec(getHash());
                return match ? match[1] : null
            }}
        }();
        QS.browser.title = function () {
            var originalTitle;
            var store = function (title) {
                originalTitle = title
            };
            var get = function () {
                return originalTitle
            };
            var fixFlashBugInIE = function () {
                if (!document.attachEvent)return;
                document.attachEvent("onpropertychange", function (evt) {
                    evt = evt || window.event;
                    if (evt.propertyName === "title" && document.title !== originalTitle) {
                        document.detachEvent("onpropertychange",
                            arguments.callee);
                        document.title = originalTitle;
                        document.attachEvent("onpropertychange", arguments.callee)
                    }
                })
            };
            var changeTitle = function (title) {
                originalTitle = title;
                document.title = originalTitle
            };
            var init = function (title) {
                store(title);
                fixFlashBugInIE();
                arguments.callee = function () {
                }
            };
            return{changeTitle: changeTitle, get: get, init: init}
        }()
    };
    QSTRING.user = function () {
        QS.user = {};
        QS.user.extInfo = {};
        QS.user.init = function (output) {
            if (typeof QS.data.getUserInfo == "function") {
                var _userInfo = QS.data.getUserInfo();
                for (o in _userInfo) {
                    _s =
                        "_getQ" + o;
                    QS.user[_s] = function (o) {
                        return function () {
                            return _userInfo[o]
                        }
                    }(o)
                }
            }
            if (QS.user.getRegisterTime() == -1) {
                top.location = "http://show.qq.com/v3/my/inc/reg01.html?v=5";
                return
            }
        };
        QS.user.getRegisterTime = function () {
            if (typeof QS.user._getQregtime == "function")return parseInt(QS.user._getQregtime() || 0, 10);
            return 0
        };
        QS.user.get = function (name) {
            var _extInfo = QS.user.getAllExtInfo() || {"bmp": {}, "vipicon": {}, "activeflag": {}, "client": {}, "clientapp": {}, "exptime": {}, "lovervip": {}, "passport": {}, "presentflag": {},
                "tipflag": {}, "vipmore": {}, "year": {}, "yearmore": {}, "yearpassport": {}, "lockhead": {}}, _map = {"style": QS.user.getStyle(), "sex": QS.user.getAvSex(), "vip": Number(QS.user.isVip()).toString(), "uin": QS.user.getUin(), "name": unescape(QS.user._getQname()), "vip_enddate": _extInfo["vipmore"]["vip_enddate"] || ""};
            if (_map.hasOwnProperty(name))return _map[name]; else if (QS.array.find(["msgcount", "icon_freesave", "icon_senditem", "icon_autosave", "icon_lvItem", "icon_photo", "icon_itemprotect", "icon_sendflower"], name) != null)if (name ==
                "msgcount")return _extInfo["bmp"]["msgcount"] || 0; else return _extInfo["vipicon"][name] || 0; else if (QS.array.find(["flwcount", "totalcharm", "bloomFlowers", "recvflowers", "sendflowers", "flwnick", "reg", "glamour"], name) != null)return QS.so.get(name);
            return null
        };
        QS.user.set = function (name, value) {
            var _map = {"style": QS.user.setStyle, "sex": QS.user.setAvSex};
            var _function = _map[name];
            if (QZFL.lang.isFunction(_function) == "function")return _function(value); else return QS.so.set(name, value);
            return false
        };
        QS.user.getMode =
            function () {
                var mode;
                mode = QS.user._getQmode() || "1";
                if (mode === "401")mode = "4";
                return mode
            };
        QS.user.setAvMode = function (mode) {
            var _mode = mode;
            if (mode == null || QS.lang.getType(mode) == "undefined")_mode = QS.user.getMode();
            QS.data.storage.set("_user", "avMode", _mode);
            return true
        };
        QS.user.getAvMode = function () {
            var _mode = QS.data.storage.get("_user", "avMode");
            if (_mode != null)return _mode;
            return QS.user.getMode()
        };
        QS.user.setAvSex = function (sex) {
            var _sex = sex;
            if (_sex == "M" || _sex == "F") {
                QS.data.storage.set("_user", "avSex",
                    _sex);
                return true
            }
            return false
        };
        QS.user.getAvSex = function () {
            var _sex = QS.data.storage.get("_user", "avSex");
            if (_sex != null)return _sex;
            return QS.user.getSex()
        };
        QS.user.getSex = function () {
            return QS.user._getQsex() || "F"
        };
        QS.user.getStyle = function () {
            var _mode = QS.user.getAvMode();
            if (_mode == 0 || _mode == 1)return _mode;
            return 1
        };
        QS.user.setStyle = function (style) {
            var _style = style;
            if (_style == 0 || _style == 1) {
                QS.user.setAvMode(style);
                return true
            }
            return false
        };
        QS.user.getNick = function (isSource) {
            var nick = unescape(QS.user._getQname());
            if (nick) {
                if (isSource)return nick;
                return QS.string.escHTML(nick)
            }
            return""
        };
        QS.user.getUin = function () {
            return QS.user._getQuin() || 0
        };
        QS.user.isVip = function () {
            var _vip = QS.user._getQvip() || 0;
            return _vip == 1 ? true : false
        };
        QS.user.isVipking = function () {
            var vipking = QS.user._getQvipking() || 0;
            return vipking == 1 ? true : false
        };
        QS.user.isYearVip = function () {
            return!!parseInt(QS.user._getQvipyear())
        };
        QS.user.getVipLevel = function () {
            return QS.user._getQrlevel() || 0
        };
        QS.user.getNextLevelScore = function () {
            return{"dis": QS.user._getQrscoreleft(),
                "next": QS.user._getQrleveldis()}
        };
        QS.user.getViprank = function () {
            return QS.user._getQviprank()
        };
        QS.user.getRsequence = function () {
            return QS.user._getQrsequence()
        };
        QS.user.getRtotalscore = function () {
            return QS.user._getQrtotalscore()
        };
        QS.user.getBankdays = function () {
            return QS.user._getQbankdays()
        };
        QS.user.getSms15 = function () {
            return QS.user._getQsms15()
        };
        QS.user.getPrepaydays = function () {
            return QS.user._getQprepaydays()
        };
        QS.user.getIsInnerUser = function () {
            return QS.user._getQisInnerUser()
        };
        QS.object.extend(QS.user,
            function () {
                var _timeSuffix = "_Time", _showSuffix = "_Show";

                function getKey(mode, suffix) {
                    return mode + suffix
                }

                function setSaveUserShow(sn, mode) {
                    var _mode = typeof mode == undefined ? QS.user.getAvMode() : mode, _sn = sn;
                    if (QS.dress.isMulPShowMode(mode))_sn = QS.array.each(sn,function (v) {
                        return escape(v)
                    }).join("@");
                    QS.data.storage.set("_user", getKey(mode, _showSuffix), _sn)
                }

                function setSaveShowTime(time, mode) {
                    var _mode = typeof mode == undefined ? QS.user.getAvMode() : mode;
                    QS.data.storage.set("_user", getKey(mode, _timeSuffix),
                        time)
                }

                function getSaveShowTime(mode) {
                    var _m = typeof mode == undefined ? QS.user.getAvMode() : mode, _ts = QS.data.storage.get("_user", getKey(_m, _timeSuffix));
                    _m = parseInt(_m);
                    if (_ts == null)switch (_m) {
                        case QS.dress.CLASSICALMODE:
                            _ts = QS.user._getQctime() * 1E3;
                            break;
                        case QS.dress.FASHIONMODE:
                            _ts = QS.user._getQftime() * 1E3;
                            break;
                        case QS.dress.PHOTOSHOWMODE:
                            _ts = QS.user._getQptime() * 1E3;
                            break;
                        case 3:
                            _ts = QS.user._getQdtime() * 1E3;
                            break;
                        case QS.dress.BONEMODE:
                            _ts = QS.user._getQbtime() * 1E3;
                            break;
                        case QS.dress.MULPSHOWMODE:
                            _ts =
                                QS.user._getQmulpupdatetime() * 1E3;
                            break;
                        default:
                            _ts = QS.user._getQftime() * 1E3;
                            break
                    }
                    return _ts
                }

                function getSaveUserShow(mode) {
                    var _m = mode == undefined ? QS.user.getAvMode() : mode, _show = QS.data.storage.get("_user", getKey(mode, _showSuffix));
                    _m = parseInt(_m);
                    if (_show == null)switch (_m) {
                        case QS.dress.CLASSICALMODE:
                            _show = QS.user._getQcshow();
                            break;
                        case QS.dress.FASHIONMODE:
                            _show = QS.user._getQfshow();
                            break;
                        case QS.dress.PHOTOSHOWMODE:
                            _show = QS.user._getQpshow();
                            break;
                        case 3:
                            _show = QS.user._getQdshow();
                            break;
                        case QS.dress.BONEMODE:
                            _show =
                                QS.user._getQbshow() ? QS.dress.boneShow.mulPosture.deleteFrom(QS.user._getQbshow()) : "";
                            break;
                        case QS.dress.MULPSHOWMODE:
                            _show = getMulpshowData();
                            break;
                        default:
                            _show = QS.user._getQfshow();
                            break
                    } else if (QS.dress.isMulPShowMode(_m))_show = getMulpshowData();
                    return _show
                }

                function _getMulpshow() {
                    var _data = QS.data.storage.get("_user", getKey(QS.dress.MULPSHOWMODE, _showSuffix)) || QS.user._getQmulpshow();
                    if (_data)return QS.array.each(_data.split("@"), function (v) {
                        return unescape(v)
                    }); else return[]
                }

                function getMulpshowData() {
                    return{"interval": QS.user._getQmulpinterval(),
                        "avStrings": _getMulpshow()}
                }

                function getAllSaveShowTime() {
                    var _time = [];
                    _time[QS.dress.CLASSICALMODE] = getSaveShowTime(QS.dress.CLASSICALMODE);
                    _time[QS.dress.FASHIONMODE] = getSaveShowTime(QS.dress.FASHIONMODE);
                    _time[QS.dress.PHOTOSHOWMODE] = getSaveShowTime(QS.dress.PHOTOSHOWMODE);
                    _time[3] = getSaveShowTime(3);
                    _time[QS.dress.BONEMODE] = getSaveShowTime(QS.dress.BONEMODE);
                    _time[QS.dress.MULPSHOWMODE] = getSaveShowTime(QS.dress.MULPSHOWMODE);
                    return _time
                }

                function getLatestSaveShow() {
                    var _time = getAllSaveShowTime(),
                        _maxTs = getLatestSaveTime(), mulPosture = QS.dress.boneShow.mulPosture.getSaved();
                    if (mulPosture.saveTime <= _maxTs)return getSaveUserShow(QS.array.find(_time, _maxTs));
                    return getSaveUserShow(QS.dress.BONEMODE) + "#" + mulPosture.postureString
                }

                function getLatestSaveTime() {
                    var _time = getAllSaveShowTime();
                    return Math.max(_time[QS.dress.CLASSICALMODE], _time[QS.dress.FASHIONMODE], _time[QS.dress.PHOTOSHOWMODE], _time[3], _time[QS.dress.BONEMODE], _time[QS.dress.MULPSHOWMODE])
                }

                return{"getSaveUserShow": getSaveUserShow,
                    "getSaveShowTime": getSaveShowTime, "getLatestSaveShow": getLatestSaveShow, "getLatestSaveTime": getLatestSaveTime, "setSaveUserShow": setSaveUserShow, "setSaveShowTime": setSaveShowTime, "getMulpshowData": getMulpshowData}
            }());
        QS.user.getAvLockState = function () {
            var _flag = QS.data.storage.get("_user", "avLockState"), _o = QS.user.extInfo.getLockhead();
            if (_flag != null)return _flag;
            return _o.code == 0 ? _o.flag : 0
        };
        QS.user.setAvLockState = function (value) {
            QS.data.storage.set("_user", "avLockState", value)
        };
        QS.user.getItemDetail =
            function (item, options) {
                options = options || {};
                var _fn = function (show, item_id) {
                    var type = QS.dress.getShowInfo(show).mode, style = {};
                    if (type == 4) {
                        var url = "http://imgcache.qq.com/qqshow/v5/public/html/item/doll.html?show=" + escape(show);
                        style = {width: 707};
                        QS.stats.sendClick("show5.dolldetailsbox.count")
                    } else {
                        if (type == 1) {
                            style = {width: 657};
                            QS.stats.sendClick("show5.fashiondetailsbox.count")
                        } else {
                            style = {width: 502};
                            QS.stats.sendClick("show5.classicdetailsbox.count")
                        }
                        var url = "http://imgcache.qq.com/qqshow/v5/public/html/item/detail.html?type=" +
                            type + "&show=" + escape(show);
                        if (item_id)url += "&item=" + item_id
                    }
                    QS.frame.tryArea.toggle(1);
                    QS.frame.popupFrame.open(url, style);
                    QS.user.operation.trigger("detail", {type: "detail", params: QS.object.extend({serialStr: show, id: item_id}, options)})
                };
                if (!isNaN(item))QS.json.send("http://show.qq.com/cgi-bin/qqshow_recmd_getshowstr", {showid: item, omode: 3}, function (json) {
                    var node = json.data.node, show = unescape(node.show || node[0].show);
                    _fn(show, item)
                }); else _fn(unescape(item))
            };
        QS.user.checkUin = function (uin) {
            if (typeof uin !=
                "number" && !uin)return false;
            var _uin = uin.toString();
            return/^\s*[123456789]\d{4,9}\s*$/.test(_uin) && parseInt(_uin, 10) >= QS.env.UIN.MIN && parseInt(_uin, 10) <= QS.env.UIN.MAX ? true : false
        };
        QS.user.login = function () {
            var _login = QS.frame._login;
            if (QS.lang.isFunction(_login))_login(); else setTimeout(function () {
                _login()
            }, 900)
        };
        QS.user.getCookieUin = function () {
            return parseInt(QS.cookie.get("uin", "qq.com").replace(/o/g, ""), 10)
        };
        QS.user.logout = function () {
            QS.cart.clearAll();
            QS.library.importJs("http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js",
                function () {
                    pt_logout.logout(function (result) {
                        if (result == 2)location.reload()
                    })
                })
        };
        QS.user.checkLogin = function () {
            var _uin = QS.user.getCookieUin();
            if (QS.user.getUin() > 0 && _uin > 0)return true;
            return false
        };
        QS.user.getLoveVipInfo = function () {
            var _flag = QS.user.extInfo.getLovervip();
            if (_flag)return _flag;
            return null
        };
        QS.user.isLoveVip = function () {
            var _flag = QS.user.getLoveVipInfo();
            if (_flag && _flag["classification"] != null)return _flag["classification"];
            return 0
        };
        QS.user.extInfo = {};
        QS.user.extInfo.getLockhead = function () {
            return 0
        };
        QS.user.setExtInfo = function (opt) {
            QS.data.storage.set("_user", "extInfo", opt);
            var _userInfo = opt, _s;
            for (o in _userInfo) {
                _s = "get" + QS.string.capitalize(o);
                QS.user.extInfo[_s] = function (o) {
                    return function () {
                        return _userInfo[o] || ""
                    }
                }(o)
            }
        };
        QS.user.getAllExtInfo = function () {
            return QS.data.storage.get("_user", "extInfo")
        };
        QS.object.extend(QS.user, function () {
            function capitalize(word) {
                if (typeof word !== "string")return;
                var tailChars = word.substring(1);
                return word.charAt(0).toUpperCase() + tailChars.toLowerCase()
            }

            function isItemsNumExceed(showStr) {
                var MAX_ITEMS_NUM =
                    20, actualCount = computeTotalCount(showStr) - computeMinusCount(showStr);
                return actualCount > MAX_ITEMS_NUM;
                function computeTotalCount(showStr) {
                    var av = new QQSHOWAV, count = 0, items = [], mode = QS.dress.getShowMode(showStr);
                    if (mode == 4) {
                        items = QS.dress.boneShow.filterDefaultItems(showStr);
                        count = items.length
                    } else {
                        av.FromItemSn(showStr);
                        count = av.ItemCount()
                    }
                    return count
                }

                function computeMinusCount(showStr) {
                    var c = QSFL.dress.countItemByType;
                    var face = c(showStr, 102), flower = c(showStr, 3), badge = c(showStr, 4);
                    return face + flower +
                        badge
                }
            }

            function transToCartArgs(args) {
                return[args.name, args.itemno, 1, args.price, args.vipPrice, 0, 0, "", "", args.itemType]
            }

            function UserOperation() {
            }

            UserOperation.prototype = {constructor: UserOperation, typeOptions: {"item": 1, "suit": 1}, init: function (type, paramStr, options) {
                if (!QS.user.checkLogin())return QS.user.login();
                if (!this.typeOptions.hasOwnProperty(type))return;
                this.type = type.toLowerCase();
                this.paramStr = paramStr;
                this.options = options || {};
                QS.object.extend(this, this.getInherit());
                this.trigger();
                this.operate()
            },
                getInherit: function () {
                    return UserOperation["get" + capitalize(this.type) + "Proto"]()
                }, operate: function () {
                    var show = this.paramStr;
                    if (this.type == "suit") {
                        if (isItemsNumExceed(show))return QS.dialog.tips("\u5bf9\u4e0d\u8d77\uff0c\u5355\u6b21" + this.name + "\u7269\u54c1\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc720\u4ef6\u3002", {icon: "tips_ico_failed"});
                        if (QS.dress.getShowMode(show) != 4 && QS.dress.isGroupPhotoShow(this.paramStr))return QS.dialog.tips("\u5bf9\u4e0d\u8d77\uff0c\u5408\u5f71\u79c0\u6682\u4e0d\u652f\u6301" +
                            this.name + "\u529f\u80fd\uff01", {icon: "tips_ico_failed"})
                    }
                    this["operate" + capitalize(this.type)]()
                }, trigger: function () {
                    var cmd = this.ename.toLowerCase();
                    QS.user.operation.trigger(cmd, {type: cmd, params: QS.object.extend({serialStr: this.paramStr}, this.options)})
                }};
            UserOperation.factory = function (type) {
                var constr = type, Method = UserOperation[constr];
                if (typeof Method !== "function")throw{name: "Error", message: constr + "doesn't exist"};
                if (typeof Method.prototype.init !== "function")Method.prototype = new UserOperation;
                return new Method
            };
            UserOperation.getSuitProto = function () {
                return{}
            };
            UserOperation.getItemProto = function () {
                return{getCartArgs: function () {
                    var args = this.getParamMapObject();
                    return transToCartArgs(args)
                }, getJoinCartArgs: function () {
                    return this.getCartArgs().join("|")
                }, getParamMapObject: function () {
                    var args = this.getOldArgs();
                    return{"name": args[0], "itemno": args[1], "price": args[2], "vipPrice": args[3], "itemType": args[4], "mallsn": ""}
                }, getOldArgs: function () {
                    var args = this.paramStr.split("|");
                    return args
                }, getArgValue: function (name) {
                    return this.getParamMapObject()[name]
                },
                    isFreeUser: function () {
                        var itemType = this.getArgValue("itemType"), itemLevel = QS.item.getItemVipLevel(itemType);
                        if (itemType == 2)return false;
                        if (QS.user.isVip() && QS.user.getVipLevel() > itemLevel)return true;
                        return false
                    }}
            };
            UserOperation.Send = function () {
                this.name = "\u8d60\u9001";
                this.ename = "Send";
                this.operateItem = function () {
                    var info = this.paramStr || "", infoArr = info.split("|"), url, param, urlFix = "http://imgcache.qq.com/qqshow/v5/public/html/system/";
                    url = urlFix + "send/item.html";
                    param = {width: 596, height: 465};
                    info =
                        escape(this.paramStr);
                    url += "?info=" + info;
                    if (infoArr[4] == 14)QS.dialog.tips("NBA\u4e13\u5c5e\u7269\u54c1\u4e0d\u652f\u6301\u8d60\u9001\u3002", {"icon": "tips_ico_failed", "width": 380}); else QS.dialog.popup(url, param)
                };
                this.operateSuit = function () {
                    function filterEffect(show) {
                        var defArr = show.split("#"), defArrLen = defArr.length, infoArr;
                        infoArr = defArr[1].split("_");
                        infoArrLen = infoArr.length;
                        if (defArrLen >= 3 && infoArrLen > 8) {
                            infoArr.splice(8, 1);
                            defArr[1] = infoArr.join("_");
                            show = defArr.join("#")
                        }
                        return show
                    }

                    function filterSpecItems(show) {
                        var itemType =
                            [3, 4, 14, 101, 102, 103, 106];
                        show = filterEffect(show);
                        for (var i = 0; i < itemType.length; i++)show = QS.dress.filterItemByType(show, itemType[i]);
                        return show
                    }

                    function hasSpecItems(show) {
                        var r = false, defArr = [], defArrLen, infoArr = [], infoArrLen, itemType = [3, 4, 14, 101, 102, 103, 106];
                        defArr = show.split("#");
                        defArrLen = defArr.length;
                        if (defArrLen >= 3) {
                            infoArr = defArr[1].split("_");
                            infoArrLen = infoArr.length
                        }
                        if (defArrLen >= 3 && infoArrLen > 8)if (infoArr[8])r = true;
                        for (var i = 0; i < itemType.length; i++)if (r || QS.dress.hasItemByType(show, itemType[i])) {
                            r =
                                true;
                            break
                        }
                        return r
                    }

                    function getSpecItems(show) {
                        var itemType = [14, 101, 102, 103, 106], arr = [];
                        for (var i = 0; i < itemType.length; i++)if (QS.dress.hasItemByType(show, itemType[i]))arr.push(itemType[i]);
                        return arr
                    }

                    function getItemTypeName(type) {
                        var map = {3: "\u9c9c\u82b1", 4: "\u5fbd\u7ae0", 14: "NBA\u4e13\u5c5e\u7269\u54c1", 101: "\u6e38\u620f\u573a\u666f\u79c0", 102: "\u771f\u8138\u79c0", 103: "\u5408\u5f71\u79c0", 106: "\u771f\u8138\u79c0"};
                        return map[type]
                    }

                    var url, param, show = this.paramStr, filterShow = show, mode = QS.dress.getShowMode(show),
                        specItems = [], txt = [], msg = "", uin = this.options.uin || "", urlFix = "http://imgcache.qq.com/qqshow/v5/public/html/system/";
                    url = urlFix + "send/suit.html";
                    param = {width: 596, height: 495};
                    if (!QS.dress.isBMode(mode)) {
                        specItems = getSpecItems(show);
                        filterShow = filterSpecItems(show)
                    }
                    if (specItems.length > 0) {
                        for (var i = 0; i < specItems.length; i++)txt.push(getItemTypeName(specItems[i]));
                        msg = txt.join("\u3001").replace(/[\u3001]{1}$/, "");
                        msg += "\u4e0d\u652f\u6301\u8d60\u9001\u3002";
                        QS.dialog.tips(msg, {"icon": "tips_ico_failed", "width": 380})
                    } else if (QS.dress.isOriginalShow(filterShow))if (hasSpecItems(show))QS.dialog.tips("\u60a8\u8d60\u9001\u7684\u7269\u54c1\u4e2d\u5305\u542b\u7279\u6b8a\u7269\u54c1\uff0c\u53bb\u9664\u540e\u7684\u5149\u8eab\u5f62\u8c61\u4e0d\u652f\u6301\u8d60\u9001\u3002",
                        {"icon": "tips_ico_failed", "width": 380}); else QS.dialog.tips("\u57fa\u7840\u5f62\u8c61\u53ca\u5149\u8eab\u5f62\u8c61\u4e0d\u80fd\u8d60\u9001\u3002", {"icon": "tips_ico_failed", "width": 380}); else {
                        show = escape(show);
                        url += "?show=" + show + "&uin=" + uin;
                        QS.dialog.popup(url, param)
                    }
                }
            };
            UserOperation.Buy = function () {
                this.name = "\u8d2d\u4e70";
                this.ename = "Buy";
                this.operateItem = function () {
                    if (this.isFreeUser()) {
                        this.confirmPopup(this.getArgValue("itemType"));
                        return
                    }
                    this.sureBuyItem()
                };
                this.operateSuit = function () {
                    if (QS.user.isVip()) {
                        this.confirmPopup();
                        return
                    }
                    this.sureBuySuit()
                };
                this.sureBuyItem = function () {
                    if (!QS.cart.set(0, this.getCartArgs()))alert("\u60a8\u7684\u8d2d\u7269\u8f66\u5df2\u6ee1\uff0c\u8bf7\u652f\u4ed8\u540e\u7ee7\u7eed\u8d2d\u7269\u3002");
                    QS.cart.location()
                };
                this.sureBuySuit = function () {
                    if (QS.cart.getCount() == 20) {
                        alert("\u60a8\u7684\u8d2d\u7269\u8f66\u5df2\u6ee1\uff0c\u8bf7\u652f\u4ed8\u540e\u7ee7\u7eed\u8d2d\u7269\u3002");
                        QS.cart.location();
                        return false
                    }
                    var show, arrObj, itemnos = [], url = "http://show.qq.com/cgi-bin/qqshow_item_info",
                        itemno, uin = QS.user.getUin();
                    show = QS.dress.filterItemByType(this.paramStr, 3);
                    show = QS.dress.filterItemByType(show, 4);
                    arrObj = QS.dress.getItemInfArr(show);
                    for (var i = 0, len = arrObj.length; i < len; i++) {
                        itemno = arrObj[i]._iItemNo;
                        if (itemno.indexOf(uin) >= 0)continue;
                        itemnos.push(itemno)
                    }
                    QS.json.send(url, {item: itemnos.join("|"), omode: 2}, function (json) {
                        var intCode = parseInt(json.code);
                        intCode === 0 ? fnSucc(json.data.ItemList) : fnFail(json.message)
                    });
                    var that = this;

                    function fnSucc(items) {
                        var itemInfo, price, item, totalPrice =
                            0;
                        for (var i = 0, len = items.length; i < len; i++) {
                            item = items[i];
                            price = item.ipriceori;
                            itemInfo = transToCartArgs({"name": item.iname, "itemno": item.ino, "price": price, "vipPrice": item.ipricevip, "itemType": item.itype});
                            items.push(itemInfo);
                            QS.cart.set(0, itemInfo);
                            totalPrice += price
                        }
                        if (totalPrice != 0 && QS.user.onecoin.check())QS.user.onecoin.popup({source: "buy", show: show, notSaveItems: items, callBack: function () {
                            QS.cart.location()
                        }}); else QS.cart.location()
                    }

                    function fnFail(message) {
                        alert(message || "\u83b7\u53d6\u7269\u54c1\u8be6\u60c5\u5931\u8d25")
                    }
                };
                this.confirmPopup = function (itemType) {
                    var that = this;
                    QS.dialog.setOpener({"sureBuy": function () {
                        that["sureBuy" + capitalize(that.type)]()
                    }});
                    var url = "http://imgcache.qq.com/qqshow/v5/public/html/system/buy/free_confirm.html?itemType=" + itemType;
                    QS.dialog.popup(url, {width: 555, height: 385})
                }
            };
            UserOperation.Ask = function () {
                this.name = "\u7d22\u8981";
                this.ename = "Ask";
                this.operateItem = function () {
                    var mapObj = this.getParamMapObject();
                    if (!QS.user.isVip() && mapObj.itemType == 1)return alert("\u60a8\u4e0d\u662f\u7ea2\u94bb\u7528\u6237\uff0c\u4e0d\u80fd\u7d22\u8981\u7ea2\u94bb\u7269\u54c1[" +
                        mapObj.name + "]");
                    var url = "http://imgcache.qq.com/qqshow/v5/public/html/system/ask_for/suit.html?info=" + escape(this.getJoinCartArgs());
                    QS.dialog.popup(url, {width: 600, height: 455})
                };
                this.operateSuit = function () {
                    var url = "http://imgcache.qq.com/qqshow/v5/public/html/system/ask_for/suit.html?show=" + escape(this.paramStr);
                    QS.dialog.popup(url, {width: 600, height: 455})
                }
            };
            UserOperation.Collect = function () {
                this.name = "\u6536\u85cf";
                this.ename = "Collect";
                this.operateItem = function () {
                };
                this.operateSuit = function () {
                    var that =
                        this, cgiUrl = "http://mall.show.qq.com/cgi-bin/qqshow_user_showcollection_add", show = that.paramStr, mode = QS.dress.getShowMode(show), showStr = QS.string.huffman.encodeQQShow(show), param;
                    param = {"show": showStr, "name": "\u6211\u7684\u6536\u85cf", "tags": "", "desc": "", "type": 0, "omode": 2};
                    if (mode == 4) {
                        cgiUrl = "http://mall.show.qq.com/cgi-bin/qqshow_user_boneshow_showcollection";
                        param = {op: 1, show: showStr, t: Math.random()}
                    }
                    QS.json.send(cgiUrl, param, function (json) {
                        var code = parseInt(json.code);
                        if (code === 0) {
                            var myCollectionMap =
                                {"0": "http://imgcache.qq.com/qqshow/v5/user/html/my/collection.html?style=0", 1: "http://imgcache.qq.com/qqshow/v5/user/html/my/collection.html", 4: "http://imgcache.qq.com/qqshow/v5/user/html/my/collection.html?style=4"}, template = '<p style="color:#000;">\t\t\t\t\t\t    \t\t\t\u60a8\u4e5f\u53ef\u4ee5\u5728&nbsp;\t\t\t\t\t\t    \t\t\t<a href="#" event-type="close" onclick="QS.frame.location(\'{url}\');return false;">\t\t\t\t\t\t    \t\t\t\t\u6211\u7684QQ\u79c0-\u6211\u7684\u6536\u85cf\t\t\t\t\t\t    \t\t\t</a>\t\t\t\t\t\t    \t\t\t&nbsp;\u4e2d\u7ba1\u7406\u60a8\u7684\u6536\u85cf\u3002\t\t\t\t\t\t    \t\t</p>',
                                url = "", html = "";
                            url = myCollectionMap[mode];
                            html = QS.string.format(template, {url: url});
                            QS.dialog.tips("\u6536\u85cf\u6210\u529f\uff01", {msg: html});
                            return
                        }
                        var itemName = json.data.itemname;
                        mapCodeMsg = {"-20": "\u5f53\u524d\u5f62\u8c61\u4e2d\u6709\u6e38\u620f\u79c0\u7269\u54c1\uff0c\u4e0d\u80fd\u6536\u85cf", "-23": "\u539f\u59cb\u5f62\u8c61\u4e0d\u80fd\u6536\u85cf", "-25": "\u5bf9\u4e0d\u8d77\uff0c\u5355\u6b21\u6536\u85cf\u7269\u54c1\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc720\u4ef6\u3002", "-26": "\u5f53\u524d\u5f62\u8c61\u5185" +
                            (itemName ? "\u7684\u7269\u54c1[" + itemName + "]" : "\u6709") + "\u4e0e\u60a8\u7684\u5f62\u8c61\u6027\u522b\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8131\u4e0b\u540e\u518d\u6536\u85cf\u3002", "-27": "\u5f53\u524d\u5f62\u8c61\u5185" + (itemName ? "\u7684\u7269\u54c1[" + itemName + "]" : "\u6709") + "\u4e0e\u60a8\u7684\u5f62\u8c61\u98ce\u683c\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8131\u4e0b\u540e\u518d\u6536\u85cf\u3002", "-103": "\u5f53\u524d\u5f62\u8c61\u4e2d\u6709\u5408\u5f71\u79c0\u7269\u54c1\uff0c\u4e0d\u80fd\u6536\u85cf", "-2005": "\u60a8\u6536\u85cf\u7684\u6570\u91cf\u5df2\u8d85\u8fc71000\uff0c\u53bb\u6211\u7684\u6536\u85cf\u5220\u9664\u540e\u624d\u80fd\u7ee7\u7eed\u6536\u85cf\uff01"},
                            alertMsg = mapCodeMsg[code] || "\u7f51\u7edc\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01";
                        alert(alertMsg)
                    })
                }
            };
            var exports = function (op) {
                var o = UserOperation.factory(op);
                return function () {
                    o.init.apply(o, arguments)
                }
            };
            return{send: exports("Send"), buy: exports("Buy"), ask: exports("Ask"), collect: exports("Collect")}
        }());
        QS.user.onecoin = {popup: function () {
            var param = arguments[0] || {}, notSaveItems = param.notSaveItems || [], source = param.source || "", show = param.show || "", type = param.type || "pay", width = param.width || "401",
                height = param.height || "327", callBack = param.callBack, saveav = param.saveav || false, win = param.win || top;
            QS.dialog.setOpener({source: source, type: type, show: show, saveav: saveav, notSaveItems: notSaveItems, callBack: callBack});
            QS.dialog.popup("http://imgcache.qq.com/qqshow/v5/public/html/system/buy/onecoin_popup.html", {width: width, height: height})
        }, check: function () {
            var vip = QS.user.isVip(), uin = QS.user.getUin() - 0, reg = /^[1-9][0-9]+[^1]1{1}$/, r = false, whiteList = [0, 840594384, 2411703886, 675099237, 87185744, 259575108];
            if (vip ===
                false && (QS.user.checkUin(uin) && reg.test(uin) || whiteList.find(uin)))r = true;
            return r
        }};
        QS.user.unionVerify = function (url, opts) {
            var fn = opts.callBack || function () {
            };
            var closeLeft = opts.closeLeft || 0;
            QS.dialog.setOpener({callBack: function (dna) {
                if (dna)fn(dna)
            }});
            QS.dialog.popup("http://imgcache.qq.com/qqshow/v5/public/html/cipher/confirmation.html?closeLeft=" + closeLeft + "&jump=" + escape(url), {width: 373, height: 294})
        };
        QS.user.operation = QS.CustomEventModule.create();
        QS.user.minipay = function () {
            var inited, busy, dialog;

            function init(cb) {
                QS.library.importJs("http://imgcache.qq.com/bossweb/ipay/js/api/cashier.js", function () {
                    inited = true;
                    cb()
                })
            }

            function combineOption(option) {
                if (option === undefined) {
                    throw new Error("minipay\u63a5\u53e3\u81f3\u5c11\u9700\u8981aid\u53c2\u6570");
                    return
                }
                if (typeof option == "string")option = {aid: option};
                var defaultOption = {scene: "minipay", type: "service", codes: "xxqqf", target: "self", onClose: function () {
                    busy = false;
                    QS.frame.mask.hide();
                    option.onClose && option.onClose()
                }};
                return QS.object.extend({},
                    option, defaultOption)
            }

            function buy(option) {
                dialog = cashier.dialog.buy(combineOption(option));
                QS.frame.mask.show()
            }

            function exports(option) {
                if (busy)return;
                busy = true;
                if (!inited)init(function () {
                    buy(option)
                }); else buy(option)
            }

            return exports
        }()
    };
    QSTRING.expand = function () {
        QS.item = {};
        QS.item.getItemVipLevel = function (iItemType) {
            var iRet = 0;
            switch (iItemType) {
                case 3:
                    iRet = 2;
                    break;
                case 9:
                    iRet = 3;
                    break;
                case 10:
                    iRet = 4;
                    break;
                case 11:
                    iRet = 5;
                    break;
                case 4:
                    iRet = 6;
                    break;
                case 12:
                    iRet = 7;
                    break;
                default:
                    iRet = -1
            }
            return iRet
        };
        QS.item.similar = function (itemNo, show, opInfo) {
            var sex = QS.user.getAvSex();
            var itemstyle = QS.dress.getItemMode(itemNo);
            var style = QS.user.getAvMode();
            var cssstyle = {width: 657};
            QS.frame.tryArea.toggle(1);
            QS.frame.popupFrame.open("http://imgcache.qq.com/qqshow/v5/public/html/item/match.html?show=" + escape(show) + "&opInfo=" + escape(opInfo) + "&style=" + style + "&itemstyle=" + itemstyle + "&itemno=" + itemNo + "&sex=" + sex, cssstyle)
        };
        QS.tools = {};
        QS.tools.log = function (opt) {
            var _s = "";
            for (var o in opt)_s += " o:" + o + " opt:" + opt +
                "\n";
            alert(_s)
        };
        QS.tools.getYearVipLink = function (aid) {
            var _url = "http://show.qq.com/public/pay.html?ch=self&pageshow=acct&paytime=year&aid=" + aid;
            QS.browser._location(_url, "blank")
        };
        QS.tools.getVipLink = function (aid) {
            var _url = "http://show.qq.com/public/pay.html?ch=self&pageshow=acct&aid=" + aid;
            QS.frame.location(_url, "blank")
        };
        QS.tools.compareUrl = function () {
            function parse(url) {
                var result = {search: {}, hash: {}}, a = document.createElement("a");
                a.href = url;
                result.origin = a.origin;
                result.pathname = a.pathname;
                var search =
                    a.search.substr(1).split("&");
                for (var i = 0, len = search.length; i < len; i++) {
                    var t = search[i].split("=");
                    result.search[t[0]] = t[1]
                }
                var hash = a.hash.substr(1).split("&");
                for (var i = 0, len = hash.length; i < len; i++) {
                    var t = hash[i].split("=");
                    result.hash[t[0]] = t[1]
                }
                return result
            }

            function lt(set1, set2) {
                for (var key in set1)if (set1[key] != set2[key])return false;
                return true
            }

            function compareSet(set1, set2) {
                if (lt(set1, set2))if (lt(set2, set1))return"equal"; else return"lt"; else if (lt(set2, set1))return"gt"; else return"unequal"
            }

            var exports = function (url1, url2, compareType) {
                var o1 = parse(url1), o2 = parse(url2), result = "unequal";
                if (o1.origin == o2.origin && o1.pathname == o2.pathname)switch (compareType) {
                    case "query":
                        result = compareSet(o1.search, o2.search);
                    case "hash":
                        result = compareSet(o1.hash, o2.hash);
                    default:
                        var queryResult = compareSet(o1.search, o2.search), hashResult = compareSet(o1.hash, o2.hash);
                        if (queryResult == "unequal" || hashResult == "unequal")result = "unequal"; else if (queryResult == "lt")if (hashResult == "gt")result = "unequal"; else result = "lt";
                        else if (queryResult == "gt")if (hashResult == "lt")result = "unequal"; else result = "gt"; else result = hashResult
                }
                return result
            };
            return exports
        }();
        QS._timePoint = QS._timePoint || {};
        QS.stats = {"speed": {}};
        QS.stats.speed._isFirst = true;
        QS.stats.speed.setFirst = function (isFirst) {
            QS.stats.speed._isFirst = isFirst
        };
        QS.stats.speed.isFirst = function () {
            return QS.stats.speed._isFirst ? true : false
        };
        QS.stats.speed.get = function (key) {
            return QS._timePoint[key]
        };
        QS.stats.speed.send = function (flag1, flag2, flag3, timeList) {
            var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=" +
                flag1 + "&flag2=" + flag2 + "&flag3=" + flag3, img = new Image, index, count;
            if (QS.lang.isArray(timeList) == false)timeList = [timeList];
            count = timeList.length;
            for (index = 0; index < count; ++index)if (timeList[index])url += "&" + (index + 1).toString() + "=" + timeList[index];
            img.src = url
        };
        QS.stats.referer = function () {
            var adtag = QS.param.getHash("ADTAG");
            if (adtag)QS.stats.sendClick(adtag)
        };
        (function () {
            var callBeforeLoaded = [], isJsLoaded = false;

            function sendClick(pgv) {
                pgvSendClick({statIframe: true, virtualDomain: "show.qq.com", hottag: pgv})
            }

            function pingJsLoaded() {
                for (var i = 0, len = callBeforeLoaded.length; i < len; i++)sendClick(callBeforeLoaded[i]);
                callBeforeLoaded = null
            }

            QS.stats.sendClick = function (pgv) {
                if (!isJsLoaded)callBeforeLoaded.push(pgv); else sendClick(pgv)
            };
            QS.stats.sendPageSource = function (targetName, source) {
                QS.stats.sendClick(["show5.page_jump_source.", targetName, ".", source].join(""))
            };
            QS.stats.loadPingJs = function () {
                var fnList = [], requestSended = false;

                function sendPv() {
                    pgvMain({statIframe: true, virtualDomain: "show.qq.com"})
                }

                return function (callback) {
                    callback =
                        callback || function () {
                        };
                    if (!requestSended) {
                        QS.library.importJs("http://imgcache.qq.com/ac/qqshow/v5/pingjs/tcss.ping.js", function () {
                            sendPv();
                            for (var i = 0, len = fnList.length; i < len; i++)fnList[i]();
                            fnList.length = 0;
                            pingJsLoaded();
                            isJsLoaded = true
                        });
                        requestSended = true
                    } else if (typeof pgvMain == "undefined")fnList.push(callback); else callback()
                }
            }()
        })()
    };
    QSTRING.library = function () {
        QS.library = QS.library || {};
        QS.library.importJs = function (url, callback, charset) {
            callback = callback || function () {
            };
            charset = charset || "utf-8";
            var script = document.createElement("script"), container = document.getElementsByTagName("head")[0] || document.documentElement;

            function onSucc() {
                callback();
                container.removeChild(script);
                script = null
            }

            if ("onload"in script)script.onload = onSucc; else if (script.readyState)script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    onSucc()
                }
            };
            script.charset = charset;
            script.src = url;
            container.appendChild(script)
        }
    };
    QSTRING.exinterface = function () {
        QS.userdata =
            function () {
                var exports = QS.userAgent.support.localStorage() ? wrapLocalStorage() : wrapSo();

                function wrapLocalStorage() {
                    var localStorage = window.localStorage;

                    function inner(name) {
                        return function () {
                            return localStorage[name].apply(localStorage, arguments)
                        }
                    }

                    return{set: inner("setItem"), get: inner("getItem"), remove: inner("removeItem")}
                }

                function wrapSo(name) {
                    var so = QS.so;

                    function inner(name) {
                        return function () {
                            return so[name].apply(so, arguments)
                        }
                    }

                    return{get: inner("get"), set: inner("set"), remove: inner("remove")}
                }

                exports.getLocal = exports.get;
                exports.setLocal = exports.set;
                exports.removeLocal = exports.remove;
                return exports
            }();
        QS.media = {SWFlash: function (sId) {
            return this._init(sId)
        }};
        QS.media.SWFlash._iInstanceNum = 0;
        QS.media.SWFlash._oInstances = {};
        QS.media.SWFlash._oOriginalFns = {};
        QS.media.SWFlash._sVersion = null;
        QS.media.SWFlash.getVersion = function () {
            if (QS.media.SWFlash._sVersion)return QS.media.SWFlash._sVersion;
            var v, ax, e, a = [".7", ".6", ".3", ""], np = navigator.plugins, d, p, sf = "Shockwave Flash", sf2 = sf + " 2.0";
            if (QS.userAgent.isIE())for (var i in a)try {
                ax =
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash" + a[i]);
                ax.allowScriptAccess = "always";
                if (i == 1)v = "WIN 6,0,21,0";
                v = ax.GetVariable("$version");
                if (v)break
            } catch (e) {
                if (i == 3)v = "WIN 2,0,0,11";
                if (i == 2)v = "WIN 3,0,18,0";
                if (v)break
            } else if (np != null && np.length > 0)if (np[sf2] || np[sf]) {
                d = np[sf2] ? np[sf2].description : np[sf].description;
                p = d.match(/shockwave +flash +(\d+).(\d+) +([^0-9]{1,1})(\d+)/i);
                v = " " + p[1] + "," + p[2] + "," + p[4] + ",0"
            }
            if (v)v = v.substring(v.indexOf(" ") + 1);
            return QS.media.SWFlash._sVersion = v
        };
        QS.media.SWFlash.compare =
            function () {
                var v = QS.media.SWFlash.getVersion(), p, i, r = false, d = arguments[0] ? arguments[0].split(".") : null;
                if (!d && v)r = true; else if (v) {
                    p = v.split(",");
                    for (i = 0; i < p.length; i++) {
                        r = !isNaN(parseInt(d[i])) ? parseInt(p[i]) == parseInt(d[i]) : true;
                        if (r)continue;
                        r = parseInt(p[i]) > parseInt(d[i]);
                        break
                    }
                }
                return r
            };
        QS.media.SWFlash.expressInstall = function (fnHandler) {
        };
        QS.media.SWFlash.writeEmpty = function (sId, oOpt) {
            var container = arguments[2];
            var o = (new QS.media.SWFlash(sId)).setContent(null, oOpt);
            o._writeHolder(container);
            return o
        };
        QS.media.SWFlash.buildHTML = function (sUrl, oOpt) {
            if (oOpt.walign) {
                oOpt.align = oOpt.walign;
                delete oOpt.walign
            }
            if (sUrl) {
                oOpt.movie = sUrl;
                oOpt.url = sUrl
            }
            return QS.media.SWFlash.prototype._buildHTML(oOpt, arguments[2])
        };
        QS.media.SWFlash.flashReady = function (sId) {
            var o = QS.media.SWFlash._oInstances[sId];
            o ? setTimeout(function () {
                o._onReady.apply(o)
            }, 0) : 0;
            return true
        };
        QS.media.SWFlash.prototype = {_init: function () {
            if (arguments[0])this._sId = arguments[0].toString(); else this._sId = "unnamed_flash_" + QS.media.SWFlash._iInstanceNum++;
            return QS.media.SWFlash._oInstances[this._sId] = this
        }, _buildHTML: function (oOpt) {
            var html = "", fv = "", o = this._oOptions || oOpt, id = this._sId || arguments[1];
            if (!o.wmode)o.wmode = "window";
            if (!o.url)o.url = "about:blank";
            if (!o.version)o.version = "9,0,115,0";
            if (QS.userAgent.isIE()) {
                html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + o.version + '" width="' + o.width + '" height="' + o.height + '"';
                if (id)html += ' id="' + id + '"';
                if (o.style) {
                    html += ' style="' + o.style + '"';
                    delete o.style
                }
                if (o.align) {
                    html += ' align="' + o.align + '"';
                    delete o.align
                }
                if (o["class"]) {
                    html += ' class="' + o["class"] + '"';
                    delete o["class"]
                }
                html += ' data="' + o.url + '"';
                html += ">";
                delete o.width;
                delete o.height;
                delete o.version;
                if (o.src)delete o.src;
                for (var i in o)if (i != "url")html += '<param name="' + i + '" value="' + o[i] + '"/>';
                html += '<param name="movie" value="' + o.url + '"/>';
                html += "</object>"
            } else {
                html = "<object";
                if (id)html += ' id="' + id + '"';
                html += "><embed";
                if (id)html += ' name="' +
                    id + '"';
                o.src = o.url;
                delete o.url;
                if (o.movie)delete o.movie;
                for (var i in o)html += " " + i + '="' + o[i] + '"';
                html += ' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/></object>'
            }
            return html
        }, _writeHolder: function (xContainer) {
            var html = "", buildHandler = this._buildHTML, o = this._oOptions;
            this._buildHTML = function () {
                return html = '<div id="' + this._sId + '" style="width:' + o.width + ";height:" + o.height + ';"></div>'
            };
            if (xContainer)this.writeIn(xContainer); else this.write();
            this._buildHTML =
                buildHandler;
            return this
        }, setContent: function (sUrl, oOpt) {
            this._setOptions(oOpt);
            this._oOptions.url = sUrl;
            var opt = this._oOptions, o = this._oElement;
            if (o)if (o.nodeName == "OBJECT" || o.nodeName == "EMBED") {
                var i, v;
                for (i in opt) {
                    v = opt[i];
                    if (i.toLowerCase() == "url")if (QS.userAgent.isIE()) {
                        if (opt.url)setTimeout(function () {
                            o.setAttribute("movie", opt.url);
                            o.setAttribute("data", opt.url)
                        }, 0)
                    } else {
                        if (opt.url)o.setAttribute("src", opt.url)
                    } else o.setAttribute(i, v)
                }
            } else if (o.nodeName == "DIV") {
                var newElmt = document.createElement("div");
                var parent = o.parentNode;
                opt.movie = opt.url;
                newElmt.innerHTML = this._buildHTML();
                parent.replaceChild(newElmt, o);
                this._findObject()
            }
            return this
        }, write: function (oOpt) {
            if (!this._oElement) {
                document.write(this._buildHTML());
                this._findObject()
            }
            return this
        }, writeIn: function (xContainer, oOpt) {
            var eContainer = typeof xContainer == "string" ? QS.$(xContainer) : xContainer;
            if (!eContainer)throw"SWFlash.writeIn(): '" + xContainer + "' cannot be found!";
            if (!this._oElement) {
                eContainer.innerHTML = this._buildHTML();
                var o = this._findObject(),
                    opt = this._oOptions
            }
            return this
        }, addCallback: function (sFunc, fnHandler) {
            if (!this._oElement)throw"SWFlash.addCallback: required element!";
            if (!this._bReady)throw"SWFlash.addCallback: ExternalInvoke required!";
            if (!this._oCBs)this._oCBs = {};
            var oFns = QS.media.SWFlash._oOriginalFns;
            this._oCBs[sFunc] = oFns[sFunc] || fnHandler;
            if (typeof window[sFunc] == "undefined" || window[sFunc] == fnHandler && !oFns[sFunc]) {
                if (window[sFunc] == fnHandler)oFns[sFunc] = fnHandler;
                window[sFunc] = function (id) {
                    var p = Array.prototype.slice.call(arguments,
                        1), i, o = QS.media.SWFlash._oInstances[id];
                    if (!o || !o._oCBs)return;
                    p.push(id);
                    setTimeout(function () {
                        o._oCBs[sFunc].apply(o, p)
                    }, 0)
                }
            }
        }, invoke: function (sFunc) {
            var p, i;
            if (!this._oElement)throw"SWFlash.invoke: required element!";
            if (this._oElement[sFunc]) {
                p = Array.prototype.slice.call(arguments, 1);
                return this._oElement[sFunc].apply(this._oElement, p)
            }
        }, onReady: function (oSWFlash) {
        }, freeContent: function () {
            this._reset();
            return this.setContent("about:blank")
        }, remove: function () {
            this.freeContent();
            this._oElement.parentNode.removeChild(this._oElement);
            delete this._oElement;
            delete QS.media.SWFlash._oInstances[this._sId];
            this._oElement = null;
            QS.media.SWFlash._iInstanceNum--
        }, toString: function () {
            return"[SWFlash " + this._sId + "]"
        }, _findObject: function () {
            this._oElement = QS.$(this._sId);
            this._oElement = this._oElement.getElementsByTagName("embed")[0] || this._oElement;
            return this._oElement
        }, _reset: function () {
            this._bReady = false;
            this._oCBs = null;
            this._oOptions = null;
            return this
        }, _onReady: function () {
            this._bReady = true;
            this.onReady(this)
        }, _setOptions: function (oOpt) {
            var o =
                this._oElement, opt = this._oOptions;
            if (!oOpt && o && (o.nodeName == "OBJECT" || o.nodeName == "EMBED"))oOpt = {width: o.getAttribute("width") || 400, height: o.getAttribute("height") || 550, wmode: o.getAttribute("wmode") || "window", allowScriptAccess: o.getAttribute("allowScriptAccess") || "sameDomain"};
            oOpt = oOpt || opt || {width: 550, height: 400, wmode: "window"};
            if (opt)for (var i in oOpt)opt[i] = oOpt[i]; else opt = oOpt;
            var fv = opt.flashVars || "";
            if (fv.indexOf("_swcb_=") < 0) {
                if (fv)fv += "&";
                fv += "_swcb_=QS.media.SWFlash.flashReady&_swid_=" +
                    this._sId
            }
            opt.flashVars = fv;
            if (opt.walign) {
                opt.align = opt.walign;
                delete opt.walign
            }
            this._oOptions = opt;
            return opt
        }, _sId: null, _oElement: null, _bReady: false, _oOptions: null, _oCBs: null};
        QS.media.WriteFlash = function (sUrl, oOpt) {
            var elmt = arguments[2];
            var oflash = (new QS.media.SWFlash).setContent(sUrl, oOpt);
            if (elmt)oflash.writeIn(elmt); else oflash.write();
            return oflash
        }
    };
    QSTRING.dynamics = function () {
    };
    QSTRING.mall = function () {
        QS.monitor = {};
        QS.monitor.errorDetector = {TBidShowMall: 1, TBidMarketing: 2, dataId: 1000057,
            errStr: "", detect: function (aBid) {
                var _detector = QS.monitor.errorDetector;
                var _bid = aBid || _detector.TBidShowMall;
                _detector.errStr = "";
                window.onerror = function (sMsg, sUrl, sLineNo) {
                    sUrl = sUrl.substr(7, sUrl.length);
                    var _browser = QS.userAgent.isIE() ? "IE" + QS.userAgent.ie : QS.userAgent.isFireFox() ? "Firefox" + QS.userAgent.firefox : QS.userAgent.isChrome() ? "Chrome" + QS.userAgent.chrome : QS.userAgent.isSafari() ? "Safari" + QS.userAgent.safari : QS.userAgent.isOpera() ? "Opera" + QS.userAgent.opera : "Others";
                    var _sKey = sMsg.replace(/\n/g,
                        " ") + "|" + encodeURIComponent(sUrl) + "|" + sLineNo;
                    if (_detector.errStr.indexOf(_sKey) == -1) {
                        sMsg = encodeURIComponent(sMsg);
                        _browser.length <= 16 || (_browser = _browser.substr(0, 16));
                        sUrl.length <= 128 || (sUrl = sUrl.substr(0, 128));
                        sMsg.length <= 1024 || (sMsg = sMsg.substr(0, 1024));
                        _detector.errStr += _sKey + ",";
                        setTimeout(function () {
                            var img = new Image;
                            img.src = "http://s.isdspeed.qq.com/cgi-bin/s.fcg?dataId=" + _detector.dataId + "&bid=" + _bid + "&url=" + sUrl + "&lineNo=" + sLineNo + "&browser=" + _browser + "&errMsg=" + sMsg + "&referrer=" + document.referrer +
                                "&href=" + encodeURIComponent(window.location.href)
                        }, 0)
                    }
                    return false
                }
            }};
        QS.monitor.requestDetector = {TBid2K: 1, TBid1K7: 2, dataId: 1000063, detect: function (sUrl) {
            var _detector = QS.monitor.requestDetector;
            var _bid = 0;
            if (sUrl.length >= 2E3)_bid = _detector.TBid2K; else if (sUrl.length >= 1700)_bid = _detector.TBid1K7;
            if (_bid)setTimeout(function () {
                var _img = new Image;
                var _url = "http://s.isdspeed.qq.com/cgi-bin/s.fcg?";
                _url = QS.param.setUrl(url, "dataId", _detector.dataId);
                _url = QS.param.setUrl(url, "bid", bid);
                _url = QS.param.setUrl(url,
                    "length", sUrl.length);
                sUrl = sUrl ? sUrl : "?";
                var _vUrl = sUrl.split("?");
                if (_vUrl[0].length >= 128)_vUrl[0] = _vUrl[0].slice(0, 128);
                _url = QS.param.setUrl(_url, "url", _vUrl[0]);
                if (_vUrl.length == 1)_vUrl[1] = "";
                var _xParam = new QS.param(_vUrl[1], "&", "=");
                var _sMsg = "";
                for (var sName in _xParam)if (_xParam[sName] && _xParam[sName].length > 128)_sMsg = QS.param.setUrl(_sMsg, sName, _xParam[sName].length);
                url = QS.param.setUrl(url, "msg", sMsg);
                url = QS.param.setUrl(url, "rand", Math.random());
                img.src = url
            }, 0)
        }};
        QS.monitor.TCISD = {};
        QS.monitor.TCISD.retCode =
            function (sUrl, code, time, rate, reportUrl, uin) {
                setTimeout(function () {
                    try {
                        QS.monitor.TCISD.retCode.process(sUrl, code, time, rate, reportUrl, uin)
                    } catch (e) {
                    }
                }, 0)
            };
        QS.monitor.TCISD.retCode.process = function (sUrl, code, time, rate, reportUrl, uin) {
            var type = 2;
            var aDomainAndCGI = QS.monitor.TCISD.retCode.splitDomainAndCGI(sUrl);
            if (code < 0)code = -code;
            if (code == 0)type = 1;
            if (code > 0 && code < 11)code += 2012E3;
            QS.monitor.TCISD.retCode.send(aDomainAndCGI[1], type, code, time, aDomainAndCGI[0], rate, reportUrl, uin)
        };
        QS.monitor.TCISD.retCode.send =
            function (cgi, type, code, time, domain, rate, reportUrl, uin) {
                var _s = QS.monitor.TCISD.retCode, _c = _s.config, url = [];
                var iRate = rate || _c.defaultParams.reportRate;
                if (cgi.trim() == "")return;
                domain = domain || "show.qq.com";
                url.push(reportUrl || _c.webServerInterfaceURL, "?");
                url.push("cgi=", cgi, "&", "type=", type, "&", "code=", code, "&", "time=", time, "&", "domain=", domain, "&", "rate=", iRate);
                if (uin)url.push("&uin=", uin);
                var img = new Image;
                img.src = url.join("")
            };
        QS.monitor.TCISD.retCode.config = {webServerInterfaceURL: "http://c.isdspeed.qq.com/code.cgi",
            defaultParams: {reportRate: 1, netWorkErrorCode: 3}};
        QS.monitor.TCISD.retCode.splitDomainAndCGI = function (sUrl) {
            var aDomainAndCGI = [];
            sUrl = sUrl.split("?")[0];
            if (sUrl.indexOf("http://") < 0)sUrl = sUrl.split("http://")[0]; else sUrl = sUrl.split("http://")[1];
            if (sUrl.indexOf("/cgi-bin/") < 0) {
                var sDmain = QS.xhr.proxy.getHostByCgiName(sUrl);
                if (sDomain && sDomain != "")aDomainAndCGI[0] = sDomain; else aDomainAndCGI[0] = "show.qq.com";
                aDomainAndCGI[1] = sUrl;
                return aDomainAndCGI
            } else {
                aDomainAndCGI = sUrl.split("/cgi-bin/");
                var sDomain =
                    QS.xhr.proxy.getHostByCgiName(aDomainAndCGI[1]);
                if (sDomain && sDomain != "")aDomainAndCGI[0] = sDomain; else aDomainAndCGI[0] = "show.qq.com";
                return aDomainAndCGI
            }
            return aDomainAndCGI
        }
    };
    QSTRING.photo = function () {
        QS.photo = {}
    };
    QSTRING.init = function () {
        QSTRING.qzfl();
        QSTRING.base();
        QSTRING.head();
        QSTRING.show();
        QSTRING.data();
        QSTRING.browser();
        QSTRING.user();
        QSTRING.expand();
        QSTRING.template();
        QSTRING.exinterface();
        QSTRING.mall();
        QSTRING.library();
        QS.$ = QS.dom.getById
    }
})();
QSTRING.init();
