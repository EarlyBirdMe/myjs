document.domain = "tenpay.com";
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.trimAll = function () {
    return this.replace(/\s*/g, "");
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/ig, "**").length;
};
Number.prototype.toFixed = function (b) {
    b = b || 0;
    var a = (Math.round(this * Math.pow(10, b)) / Math.pow(10, b)).toString();
    if (b > 0) {
        a = a.split(".");
        a[1] = a[1] || "";
        b -= a[1].length;
        while (b > 0) {
            a[1] += "0";
            b--;
        }
        a = a.join(".");
    }
    return a;
};
Number.prototype.fix = function (c) {
    var b = String(this);
    c = Math.abs(c);
    b = b.split(".");
    b[1] = b[1] || "";
    var a = b[1].length;
    if (a < c) {
        a = c - a;
        while (a > 0) {
            b[1] += "0";
            a--;
        }
    }
    return b[0] + ((c > 0) ? ("." + b[1].substr(0, c)) : "");
};
Number.prototype.div = function (a) {
    var f = 0, d = 0, c = this.toString(), b = a.toString();
    try {
        f = c.split(".")[1].length;
    } catch (g) {
    }
    try {
        d = b.split(".")[1].length;
    } catch (g) {
    }
    return(Number(c.replace(".", "")) / Number(b.replace(".", ""))) * Math.pow(10, d - f);
};
Number.prototype.mul = function (a) {
    var d = 0, c = this.toString(), b = a.toString();
    try {
        d += c.split(".")[1].length;
    } catch (f) {
    }
    try {
        d += b.split(".")[1].length;
    } catch (f) {
    }
    return Number(c.replace(".", "")) * Number(b.replace(".", "")) / Math.pow(10, d);
};
Number.prototype.add = function (b) {
    var d = 0, c = 0, a, g;
    try {
        d = this.toString().split(".")[1].length;
    } catch (f) {
    }
    try {
        c = b.toString().split(".")[1].length;
    } catch (f) {
    }
    a = Math.pow(10, Math.max(d, c));
    g = (d >= c) ? d : c;
    return((this * a + b * a) / a).toFixed(g) * 1;
};
Number.prototype.sub = function (b) {
    var d = 0, c = 0, a, g;
    try {
        d = this.toString().split(".")[1].length;
    } catch (f) {
    }
    try {
        c = b.toString().split(".")[1].length;
    } catch (f) {
    }
    a = Math.pow(10, Math.max(d, c));
    g = (d >= c) ? d : c;
    return((this * a - b * a) / a).toFixed(g) * 1;
};
Date.prototype.dateDiff = function (b, a) {
    var c = 0;
    switch (a) {
        case"Y":
            c = this.getFullYear() - b.getFullYear();
            break;
        case"M":
            c = (this.getFullYear() - b.getFullYear()) * 12 + (this.getMonth() - b.getMonth());
            break;
        case"d":
            c = (this - b) / 86400000;
            break;
        case"h":
            c = (this - b) / 3600000;
            break;
        case"m":
            c = (this - b) / 60000;
            break;
        case"s":
            c = (this - b) / 1000;
            break;
        default:
            c = this - b;
            break;
    }
    return c;
};
Date.prototype.format = function (e, k) {
    var g = this.getFullYear();
    var l = this.getMonth() + 1;
    var f = this.getDate();
    var c = this.getHours();
    var a = this.getMinutes();
    var b = this.getSeconds();
    if (k) {
        l = (l < 10) ? ("0" + l) : l;
        f = (f < 10) ? ("0" + f) : f;
        c = (c < 10) ? ("0" + c) : c;
        a = (a < 10) ? ("0" + a) : a;
        b = (b < 10) ? ("0" + b) : b;
    }
    e = e || "%Y-%M-%d %h:%m:%s";
    e = e.replace("%Y", g);
    e = e.replace("%M", l);
    e = e.replace("%d", f);
    e = e.replace("%h", c);
    e = e.replace("%m", a);
    e = e.replace("%s", b);
    return e;
};
var JSON;
if (!JSON) {
    JSON = {};
}
(function () {
    function f(n) {
        return n < 10 ? "0" + n : n;
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case"string":
                return quote(value);
            case"number":
                return isFinite(value) ? String(value) : "null";
            case"boolean":
            case"null":
                return String(value);
            case"object":
                if (!value) {
                    return"null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }

    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else {
                if (typeof space === "string") {
                    indent = space;
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {"": value});
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
}());
var CP = {};
(function (g, h, e) {
    var b = {buy: {version: "v2.0.20130808", relay: ["log", "@buy"]}, gpcAward: {version: "v1.0.20130531", relay: ["buy"]}, QQFriend: {version: "v1.0.20120822"}, md5: {version: "v1.0.0"}, rc4: {version: "v1.0.0"}, serverTime: {url: "https://www.tenpay.com/cgi-bin/v1.0/get_current_time.cgi", version: false, cache: false}, channel: {url: "http://life.tenpay.com/res/lottery/js/cp_channel.js", version: "v1.0.20130307", charset: "gb2312"}, log: {url: "https://img.tenpay.com/v2/res/js/log/log-min.js", version: "v1.0.20120830", charset: "utf-8"}, speed: {url: "https://www.tenpay.com/v2/res/js/global/speed-min.js", version: false, charset: "utf-8"}, ta: {url: "http://tajs.qq.com/stats?sId=25763879", version: null, charset: "utf-8"}, luckyBet: {version: "v1.0.20130822", relay: ["@buy"]}, animate: {version: "v1.0.20130118"}, easyBuy: {version: "v1.0.20130911", relay: ["@buy"]}, tab: {version: "v1.0.20130124"}};
    var a = false;
    var f = Array.prototype.slice;
    var d = {};
    d.Version = "v3.4.2";
    d.Console = function () {
        if (typeof console != "undefined") {
            var l = f.call(arguments);
            d.Each(l, function (n, m) {
                if (d.getType(n) == "object") {
                    console.dir(n);
                } else {
                    console.log(n);
                }
            });
        }
    };
    d.TopWin = function () {
        var m = g;
        try {
            while (m.parent && m.parent != m && m.parent.CP) {
                m = m.parent;
            }
        } catch (l) {
        }
        return m;
    }();
    d.Data = {ssq: ["双色球", "Ssq", "ssq"], "3d": ["福彩3D", "C3d", "3D"], ssc: ["时时彩", "Ssc", "ssc"], csc: ["老时时彩", "Csc", "csc"], qlc: ["七乐彩", "Qlc", "qlc"], dlt: ["大乐透", "Dlt", "dlt"], qxc: ["七星彩", "Qxc", "qxc"], "115": ["十一运夺金", "C115", "115"], h15: ["黑龙江11选5", "H15", "h15"], "225": ["22选5", "C225", "225"], pl3: ["排列三", "Pl3", "pl3"], pl5: ["排列五", "Pl5", "pl5"], sfc: ["胜负彩", "Sfc", "sfc"], rjc: ["任选九", "Rjc", "rjc"], jcz: ["竞足胜平负", "Jcz", "jcz"], zc4cj: ["四场进球", "Zc4cj", "zc4cj"], zc6cb: ["六场半全场", "Zc6cb", "zc6cb"], xync: ["快乐十分", "Xync", "xync"], jcft01: ["竞足胜平负", "-", "-"], jcft02: ["竞足比分", "-", "-"], jcft03: ["竞足总进球", "-", "-"], jcft04: ["竞足半全场", "-", "-"], jcft11: ["竞足胜平负", "-", "-"], jcft12: ["竞足比分", "-", "-"], jcft13: ["竞足总进球", "-", "-"], jcft14: ["竞足半全场", "-", "-"], jcl: ["竞篮", "Jcl", "jcl"], jcbsk01: ["竞篮胜负", "-", "-"], jcbsk02: ["竞篮让分胜负", "-", "-"], jcbsk03: ["竞篮胜分差", "-", "-"], jcbsk04: ["竞篮大小分", "-", "-"], jcbsk11: ["竞篮胜负", "-", "-"], jcbsk12: ["竞篮让分胜负", "-", "-"], jcbsk13: ["竞篮胜分差", "-", "-"], jcbsk14: ["竞篮大小分", "-", "-"]};
    d.array = {};
    d.array.each = function (m, p) {
        var q, l = m.length;
        if (l == 0) {
            return;
        }
        for (var n = 0; n < l; n++) {
            if ((q = p(m[n], n)) != e) {
                if (q === false) {
                    return false;
                }
                if (q === -1) {
                    break;
                }
            }
        }
        return true;
    };
    d.array.sort = function (l, m) {
        return l.sort([function (q, p) {
            return parseInt(q, 10) - parseInt(p, 10);
        }, function (p, q) {
            return parseInt(q, 10) - parseInt(p, 10);
        }][m || 0]);
    };
    d.array.get = function (p, z, u, x, t) {
        var w = Math.abs(p - z) + 1;
        if (typeof u == "undefined" || u > w) {
            return this.create(p, z);
        }
        if (u < 1) {
            return[];
        }
        var m = {}, B = new Array(u), r = 0, A, v = typeof x == "undefined" ? false : true;
        if (typeof t != "undefined") {
            for (var q = 0, n = t.length; q < n; q++) {
                m["$" + t[q]] = t[q];
            }
        }
        while (r < u) {
            if (v) {
                B[r++] = parseInt(Math.random() * w + p);
            } else {
                A = parseInt(Math.random() * w + p);
                if (typeof m["$" + A] == "undefined") {
                    B[r++] = m["$" + A] = A;
                }
            }
        }
        return B;
    };
    d.array.copy = function (l) {
        return l.concat();
    };
    d.inArray = function (n, l) {
        if (typeof n == "string" || typeof n == "number") {
            for (var m in l) {
                if (l[m] === n + "") {
                    return true;
                }
            }
        }
        return false;
    };
    d.array.unique = function (n) {
        n = n || [];
        var l = {};
        for (var p = 0; p < n.length; p++) {
            var m = n[p];
            if (typeof(l[m]) == "undefined") {
                l[m] = 1;
            }
        }
        n.length = 0;
        for (var p in l) {
            if (l.hasOwnProperty(p)) {
                n[n.length] = p;
            }
        }
        n = d.array.sort(n);
        return n;
    };
    d.each = d.array.each;
    d.math = {};
    d.math.C = function (t, l) {
        var s = 1, r = 1;
        for (var q = t, p = 1; p <= l; s *= q--, r *= p++) {
        }
        return s / r;
    };
    d.math.P = function (t, l) {
        var s = 1, r = 1;
        for (var q = t, p = 1; p <= l; s *= q--, r *= p++) {
        }
        return s;
    };
    d.math.Cs = function (m) {
        var l = [];
        var p = function (r, q) {
            var u = [];
            var t = q.length;
            for (var s = 0; s < t; s++) {
                u.push(r.join(q[s] + "x") + "" + q[s] + (s == t - 1 ? "" : "x"));
            }
            l = (u.join("")).split(/x/);
        };
        for (var n = 0; n < m.length; n++) {
            p(l, m[n]);
        }
        return l;
    };
    d.pad = function (p, n) {
        var q = "", m = (p < 0), l = String(Math.abs(p));
        if (l.length < n) {
            q = (new Array(n - l.length + 1)).join("0");
        }
        return(m ? "-" : "") + q + l;
    };
    d.comma = function (m, l) {
        if (!l || l < 1) {
            l = 3;
        }
        m = String(m).split(".");
        m[0] = m[0].replace(new RegExp("(\\d)(?=(\\d{" + l + "})+$)", "ig"), "$1,");
        return m.join(".");
    };
    d.mArr = function (l) {
        var m = 1;
        if (d.getType(l[0]) == "array") {
            d.each(l, function (p, n) {
                m *= p.length;
            });
        } else {
            m = l.length;
        }
        return m;
    };
    d.$_GET = function (q, p) {
        p = p || h.location.href.toString();
        var m = p.substring(p.indexOf("?") + 1, p.length).split("&");
        var l = {};
        for (i = 0; j = m[i]; i++) {
            l[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var n = l[q.toLowerCase()] || "";
        n = n.replace(/</g, "&lt;");
        if (typeof(n) == "undefined") {
            return"";
        } else {
            return n;
        }
    };
    d.t = function () {
        return Date.parse(new Date());
    };
    d.getType = function (m) {
        var l;
        return((l = typeof(m)) == "object" ? Object.prototype.toString.call(m).slice(8, -1) : l).toLowerCase();
    };
    d.Extend = function (n, m) {
        if (typeof d[n] == "undefined") {
            d[n] = {};
        }
        if (d.getType(m) == "object") {
            for (var l in m) {
                if (m.hasOwnProperty(l)) {
                    d[n][l] = m[l];
                }
            }
        } else {
            d[n] = m;
        }
    };
    d.Each = function (r, q) {
        var m;
        if (d.getType(r) == "object" && r.hasOwnProperty) {
            for (var n in r) {
                if (r.hasOwnProperty(n)) {
                    m = q.apply(null, [r[n], n]);
                    if (m === false) {
                        break;
                    }
                }
            }
        } else {
            for (var p = 0, l = r.length; p < l; p++) {
                m = q.apply(null, [r[p], p]);
                if (m === false) {
                    break;
                }
            }
        }
    };
    d.Module = function (l, m) {
        if (!b[l]) {
            throw new Error(moduleName + " is not declared!");
        }
        if (typeof m == "function") {
            b[l].ref = m;
        }
    };
    d.Use = function () {
        var s = "http://caipiao.tenpay.com/v1.0/i/lib/";
        var m = a ? ".js" : "_min.js";
        var n = f.call(arguments), p = {}, q = [], r = (typeof n[n.length - 1] == "function") ? n.pop() : null, A = 0, C = 0, B = 0, F = {}, w = 0, l = 0, x = 0, D = 0;
        var G = function (I, H) {
            if (typeof F[I] == "undefined") {
                F[I] = !!H;
                w++;
                if (H === true) {
                    x++;
                }
            }
        };
        var u = function () {
            d.Each(F, function (I, H) {
                var J;
                if (b["@" + H] === true) {
                    t(H);
                } else {
                    if (typeof CPS_LOTTERY_CONFIG !== "undefined") {
                        J = CPS_LOTTERY_CONFIG[H];
                        J && d.Loader.loadScript(J.url, function () {
                            b["@" + H] = true;
                            t(H);
                        }, null, null, J.charset || "utf-8");
                    }
                }
            });
        };
        var t = function (H) {
            l++;
            if (F[H] === true) {
                D++;
            }
            E && E();
        };
        var v = function (H, L, I) {
            if (!b[H]) {
                throw new Error(H + " is not declared!");
            }
            var P = b[H].relay || [], O = P.length, N = !!I ? 1 : 0;
            if (typeof p[H] == "undefined") {
                p[H] = 0;
            }
            p[H] += L + N;
            if (O > 0) {
                var J = L + 1, K;
                for (var M = 0; M < O; M++) {
                    if (P[M].substr(0, 1) == "@") {
                        K = P[M].substr(1);
                        G(K, true);
                    } else {
                        v(P[M], J, true);
                    }
                }
            }
        };
        var E = function () {
            if (D == x && C == B) {
                var J = d, I;
                for (var H = 0; H < B; H++) {
                    I = b[q[H][0]];
                    if (I.loaded !== true) {
                        if (typeof I.ref == "function") {
                            I.ref(J);
                        }
                        if (I.cache !== false) {
                            I.loaded = true;
                        }
                    }
                }
                if (l == w && typeof r == "function") {
                    r(J);
                    E = null;
                }
            }
        };
        var z = function () {
            var O, H, J, N, I, K;
            for (var M = 0; n[M];) {
                var P = n[M], Q = P.substr(0, 1);
                if (Q == "@") {
                    G(P.substr(1), false);
                    n.splice(M, 1);
                } else {
                    M++;
                }
            }
            A = n.length;
            for (var M = 0; M < A; M++) {
                v(n[M], 0, false);
            }
            for (var L in p) {
                if (p.hasOwnProperty(L)) {
                    B++;
                    q.push([L, p[L]]);
                }
            }
            q.sort(function (S, R) {
                return R[1] - S[1];
            });
            if (w > 0) {
                if (typeof CPS_LOTTERY_CONFIG == "undefined") {
                    d.Loader.loadScript("https://www.tenpay.com/v2/res/pub/cps/lottery/config.js?v=" + Math.random(), u, null, null, "utf-8");
                } else {
                    u();
                }
            }
            if (B > 0) {
                for (var M = 0; M < B; M++) {
                    O = q[M];
                    H = O[0];
                    J = b[H];
                    if (J.loaded === true) {
                        C++;
                        E && E();
                    } else {
                        N = (typeof J.version == "string") ? J.version : (J.version === false) ? Math.random() : "";
                        K = J.charset || null;
                        if (typeof J.url == "string") {
                            I = J.url;
                        } else {
                            I = s + H + "/" + H + m;
                        }
                        I += N ? ((I.indexOf("?") == -1 ? "?" : "&") + "v=" + N) : "";
                        d.Loader.loadScript(I, function () {
                            C++;
                            E && E();
                        }, null, null, K);
                    }
                }
            } else {
                E && E();
            }
        }();
    };
    d.Dom = {$: function (l) {
        return(typeof l == "string") ? h.getElementById(l) : l;
    }, getElementsByClassName: function () {
        if (h.querySelectorAll || h.getElementsByClassName) {
            return function (q, w, l) {
                var v = (typeof l == "string") ? h.getElementById(l) : l || h, m = (h.getElementsByClassName && v.getElementsByClassName(q)) || v.querySelectorAll("." + q), s = m.length;
                if (s > 0 && w) {
                    var u = m, m = [], x = w.toLowerCase();
                    for (var r = 0; r < s; r++) {
                        if (u[r].nodeName.toLowerCase() == x) {
                            m.push(u[r]);
                        }
                    }
                }
                return m;
            };
        } else {
            return function (q, x, l) {
                var z = x || "*", w = (typeof l == "string") ? h.getElementById(l) : l || h, m = w.getElementsByTagName(z), v = [], s = m.length;
                if (s > 0) {
                    var u = new RegExp("(?:^|\\s+)" + q.replace(/\-/g, "\\-") + "(?:\\s+|$)");
                    for (var r = 0; r < s; r++) {
                        if (m[r].className && u.test(m[r].className)) {
                            v.push(m[r]);
                        }
                    }
                }
                return v;
            };
        }
    }(), getMeta: function (n) {
        var m = h.getElementsByTagName("meta");
        for (var p = 0, l = m.length; p < l; p++) {
            if (m[p].name === n) {
                return m[p];
            }
        }
    }, hasClass: function (q, p) {
        q = q.trim().split(/\s+/);
        var m = " " + p.className + " ", n = 0, l = q.length;
        for (; n < l; n++) {
            if (m.indexOf(" " + q[n] + " ") == -1) {
                return false;
            }
        }
        return true;
    }, addClass: function (q, p) {
        q = q.trim().split(/\s+/);
        var m = p.className, n = 0, l = q.length;
        for (; n < l; n++) {
            m = (" " + m + " ").replace(" " + q[n] + " ", " ");
        }
        m += " " + q.join(" ");
        p.className = m.trim();
    }, removeClass: function (q, p) {
        q = q.trim().split(/\s+/);
        var m = p.className, n = 0, l = q.length;
        for (; n < l; n++) {
            m = (" " + m + " ").replace(" " + q[n] + " ", " ");
        }
        p.className = m.trim();
    }, replaceClass: function (m, l, n) {
        d.Dom.removeClass(m, n);
        d.Dom.addClass(l, n);
    }, toggleClass: function (m, l) {
        d.Dom.hasClass(m, l) ? d.Dom.removeClass(m, l) : d.Dom.addClass(m, l);
    }, getStyle: function (n, l) {
        if (n.style[l]) {
            return n.style[l];
        } else {
            if (n.currentStyle) {
                return n.currentStyle[l];
            } else {
                if (h.defaultView && h.defaultView.getComputedStyle) {
                    l = l.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var m = h.defaultView.getComputedStyle(n, "");
                    return m && m.getPropertyValue(l);
                }
            }
        }
        return null;
    }};
    d.Browser = function () {
        var m = navigator.userAgent.toLowerCase();
        var l = (l = /msie ([\w.]+)/.exec(m)) ? {type: "ie", version: l[1]} : (l = /firefox\/([\w.]+)/.exec(m)) ? {type: "firefox", version: l[1]} : (l = /chrome\/([\w.]+)/.exec(m)) ? {type: "chrome", version: l[1]} : (l = /version\/([\w.]+).*(safari)/.exec(m)) ? {type: "safari", version: l[1]} : (l = /opera.*version\/([\w.]+)/.exec(m)) ? {type: "opera", version: l[1]} : {type: "", version: 0};
        l.core = (/trident/.test(m)) ? "trident" : (/gecko/.test(m) && !/like gecko/.test(m)) ? "gecko" : (/webkit/.test(m)) ? "webkit" : (/presto/.test(m)) ? "presto" : null;
        l.type && (l[l.type] = l.version);
        l.core && (l[l.core] = l.core);
        return l;
    }();
    d.Cookie = {set: function (p, r, q, s, l) {
        if (l) {
            var n = new Date();
            var m = new Date();
            m.setTime(parseFloat(n.getTime()) + 3600000 * l);
        }
        h.cookie = p + "=" + r + "; " + (l ? ("expires=" + m.toUTCString() + "; ") : "") + ("path=" + (s || "/") + "; domain=" + (q || "tenpay.com") + ";");
    }, get: function (m) {
        var n = new RegExp("(?:^|;+|\\s+)" + m + "=([^;]*)");
        var l = h.cookie.match(n);
        return(!l ? "" : l[1]);
    }, del: function (l, m, n) {
        h.cookie = l + "=; expires=Mon, 2 Mar 2009 19:00:00 UTC; path=" + (n || "/") + "; domain=" + (m || "tenpay.com") + ";";
    }};
    d.Storage = function () {
        var n = "tenpay.com", p = {}, s = null, l = 0, m;
        if (g.localStorage) {
            s = g.localStorage;
            l = 1;
        } else {
            if (g.globalStorage) {
                s = g.globalStorage;
                l = 2;
            } else {
                m = function () {
                    if (l == 3) {
                        return;
                    }
                    try {
                        s = h.createElement("input");
                        s.type = "hidden";
                        s.addBehavior("#default#userData");
                        h.getElementsByTagName("body")[0].appendChild(s);
                        s.load(n);
                        l = 3;
                    } catch (t) {
                        p = null;
                        throw new Error("Your Browser does not support Local Storage");
                    }
                };
            }
        }
        var q = function (t, u) {
            var w = 0;
            if (u) {
                if (typeof u == "number") {
                    w = (+new Date()) + u;
                } else {
                    w = +d.Date.format(u, "%Y-%M-%d %h:%m:%s");
                }
            }
            return JSON.stringify({e: w, v: t});
        };
        var r = function (u, t) {
            var A = null;
            if (t) {
                var x = JSON.parse(t), z = parseInt(x.e, 10) || 0, w = +new Date();
                if (z == 0 || (z - w) >= 0) {
                    A = x.v;
                } else {
                    p.removeItem(u);
                }
            }
            return A;
        };
        switch (l) {
            case 1:
                p = {setItem: function (u, t, w) {
                    s.setItem(u, q(t, w));
                }, getItem: function (t) {
                    return r(t, s.getItem(t));
                }, removeItem: function (t) {
                    s.removeItem(t);
                }, clear: function () {
                    s.clear();
                }};
                break;
            case 2:
                p = {setItem: function (u, t, w) {
                    s[n][u] = q(t, w);
                }, getItem: function (t) {
                    return r(t, s[n][t]);
                }, removeItem: function (t) {
                    s.removeItem(t);
                }, clear: function () {
                    for (var t in s) {
                        if (s.hasOwnProperty(t)) {
                            delete s[t];
                        }
                    }
                }};
                break;
            default:
                p = {setItem: function (u, t, w) {
                    m();
                    s.setAttribute(u, q(t, w));
                    s.save(n);
                }, getItem: function (t) {
                    m();
                    return r(t, s.getAttribute(t));
                }, removeItem: function (t) {
                    m();
                    s.removeAttribute(t);
                    s.save(n);
                }, clear: function () {
                    m();
                    var w = s.xmlDocument, v = w.firstChild.attributes, u = v.length, t;
                    while (--u >= 0) {
                        t = v[u];
                        s.removeAttribute(t.nodeName);
                    }
                    s.save(n);
                }};
                break;
        }
        return p;
    }();
    d.Date = {format: function (p, u) {
        u = u || "%Y-%M-%d %h:%m:%s";
        u = u.replace(/\-/g, "\\-");
        u = u.replace(/\|/g, "\\|");
        u = u.replace(/\./g, "\\.");
        u = u.replace("%Y", "(\\d{4})");
        u = u.replace("%M", "(\\d{1,2})");
        u = u.replace("%d", "(\\d{1,2})");
        u = u.replace("%h", "(\\d{1,2})");
        u = u.replace("%m", "(\\d{1,2})");
        u = u.replace("%s", "(\\d{1,2})");
        var v = new RegExp("^" + u + "$");
        var w = v.exec(p);
        var l = (w[1] || 0) - 0;
        var r = (w[2] || 1) - 1;
        var t = (w[3] || 0) - 0;
        var q = (w[4] || 0) - 0;
        var n = (w[5] || 0) - 0;
        var x = (w[6] || 0) - 0;
        return new Date(l, r, t, q, n, x);
    }};
    d.Util = {show: function (r, q) {
        var n = [].concat(r), p;
        for (var m = 0, l = n.length; m < l; m++) {
            p = d.Dom.$(n[m]);
            if (p) {
                if (!q) {
                    p.style.display = "block";
                } else {
                    p.style.visibility = "visible";
                }
            }
        }
        return this;
    }, hide: function (r, q) {
        var n = [].concat(r), p;
        for (var m = 0, l = n.length; m < l; m++) {
            p = d.Dom.$(n[m]);
            if (p) {
                if (!q) {
                    p.style.display = "none";
                } else {
                    p.style.visibility = "hidden";
                }
            }
        }
        return this;
    }, copy: function (l) {
        if (g.clipboardData) {
            g.clipboardData.clearData();
            g.clipboardData.setData("Text", l);
        } else {
            if (navigator.userAgent.indexOf("Opera") != -1) {
                g.location = l;
            } else {
                d.Box.text({icon: 4, title: "提示", info: "当前浏览器不支持此功能"});
                return false;
            }
        }
        return true;
    }, filterScript: function (l) {
        l = l || "";
        l = decodeURIComponent(l);
        l = l.replace(/<.*>/g, "");
        l = l.replace(/(java|vb|action)script/gi, "");
        l = l.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, "");
        l = l.replace(/[\s ]/g, "&nbsp;");
        return l;
    }, htmlspecialchars: function (l) {
        return l.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }, getPara: function (n, m) {
        var l = (typeof m == "undefined") ? g.location.search : m.split("#")[0];
        l = l.split("?");
        l = (typeof l[1] == "undefined") ? l[0] : l[1];
        l = l.split("&");
        for (var p = 0; l[p]; p++) {
            l[p] = l[p].split("=");
            if (l[p][0] == n) {
                try {
                    return this.filterScript(l[p][1]);
                } catch (q) {
                }
            }
        }
        return"";
    }, greet: function () {
        var l = (new Date()).getHours();
        var m = "";
        if (l < 6) {
            m = "凌晨好";
        } else {
            if (l < 9) {
                m = "早上好";
            } else {
                if (l < 12) {
                    m = "上午好";
                } else {
                    if (l < 14) {
                        m = "中午好";
                    } else {
                        if (l < 18) {
                            m = "下午好";
                        } else {
                            m = "晚上好";
                        }
                    }
                }
            }
        }
        return m;
    }, win: function (m, l) {
        var n = d.TopWin.name || "{}";
        try {
            n = JSON.parse(n);
        } catch (p) {
            n = {};
        }
        if (typeof l != "undefined") {
            n[m] = l;
            d.TopWin.name = JSON.stringify(n);
        }
        return n[m] || "";
    }, doForm: function (m, s, l, q, n) {
        var v = h.createElement("form"), u = "cp_dynamic_form_" + (+new Date()), r = h.getElementsByTagName("body")[0], t = "";
        v.method = l;
        v.target = s;
        v.action = m;
        v.id = u;
        v.name = u;
        for (var p in q) {
            if (q.hasOwnProperty(p)) {
                t += '<input type="hidden" name="' + p + '" value="' + q[p] + '" />';
            }
        }
        v.innerHTML = t;
        r.appendChild(v);
        if (n !== false) {
            v.submit();
            r.removeChild(v);
        }
        v = null;
        return u;
    }, redirectTo: function (m, l, p) {
        var n = d.User.getSession();
        d.Util.doForm("https://www.tenpay.com/v2.0/wallet/loading.html", "_blank", "get", {j: 1, COOKIE_wallet_s: n._key || "", COOKIE_wallet_u: n._uin || "", COOKIE_skey: n.skey || "", COOKIE_uin: n.uin || "", qluin: n.qluin || "", qlskey: n.qlskey || "", tourl: m, flush_cookie: (l !== false ? 1 : 0), new_open: (p !== false ? 1 : 0), qlsign: d.Cookie.get("qlsign") || ""});
        return false;
    }, clone: function (l) {
        var n = new Object();
        for (var m in l) {
            n[m] = l[m];
        }
        return n;
    }, cloneAll: function (m) {
        var l = JSON.stringify(m);
        return JSON.parse(l);
    }, throttle: function (m, l) {
        l = l ? l : 150;
        var n = (new Date()).getTime();
        if (l === -1) {
            return(function () {
                m.apply(null, arguments);
            });
        }
        return(function () {
            var p = (new Date()).getTime();
            if (p - n > l) {
                n = p;
                m.apply(null, arguments);
            }
        });
    }, cut: function (t, s) {
        var m = t.replace(/[^\u0000-\u00FF]/gmi, "**").length, l = "";
        if (m <= s) {
            l = t;
        } else {
            var r = t.split(""), q = 0;
            for (var p = 0, n = r.length; p < n; p++) {
                q += r[p].replace(/[^\u0000-\u00FF]/gmi, "**").length;
                if (q <= (s - 3)) {
                    l += r[p];
                } else {
                    l += "...";
                    break;
                }
            }
        }
        return l;
    }, checkActiveX: function () {
        if (!g.ActiveXObject) {
            return false;
        }
        var m = g.external;
        try {
            if (m && typeof m.msActiveXFilteringEnabled != "undefined" && m.msActiveXFilteringEnabled()) {
                return false;
            }
        } catch (l) {
        }
        return true;
    }, checkFlash: function () {
        var m = "ShockwaveFlash.ShockwaveFlash", t = "Shockwave Flash", s = 0, u = false;
        if (d.Util.checkActiveX()) {
            try {
                var l = new ActiveXObject(m), q = l.GetVariable("$version");
                s = parseInt(q.split(" ")[1].split(",")[0]);
                u = !!l;
            } catch (r) {
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var l = navigator.plugins[t];
                if (l) {
                    var v = l.description.split(" ");
                    for (var n = 0, p = v.length; n < p; n++) {
                        if (isNaN(parseInt(v[n]))) {
                            continue;
                        }
                        s = parseInt(v[n]);
                    }
                }
                u = !!l;
            }
        }
        return{support: !!u, version: s};
    }, checkCSS3: function (q) {
        var p = h.createElement("div"), m = p.style, n = "Khtml Ms O Moz Webkit".split(" "), l = n.length;
        if (q in p.style) {
            return true;
        }
        q = q.replace(/^[a-z]/, function (r) {
            return r.toUpperCase();
        });
        while (l--) {
            if (n[l] + q in m) {
                return true;
            }
        }
        return false;
    }};
    d.Channel = {init: function () {
        d.Use("channel");
    }, set: function () {
        if (typeof LotteryChannel != "undefined") {
            LotteryChannel.addCode.apply(null, arguments);
        }
    }, get: function () {
        var m = d.Channel.getPartnerId(), l = m ? (m + ",") : "";
        if (typeof LotteryChannel != "undefined") {
            return(l + (LotteryChannel.getCodeSN.apply(null, arguments) || d.Scene.v));
        } else {
            return(l + d.Scene.v);
        }
    }, getPartnerId: function () {
        var q = "", p = "abcdefghij", r = d.Cookie.get("partnerId");
        if (r && !/[^\d\|]/.test(r)) {
            for (var n = 0, l = r.length; n < l; n++) {
                var m = r.charAt(n);
                q += m !== "|" ? (p.charAt(m) || "") : "_";
            }
        }
        return q;
    }, call: function (m, l) {
        if (typeof LotteryChannel != "undefined") {
            LotteryChannel[m].apply(null, l || []);
        }
    }};
    d.Scene = function () {
        var l = {"-1": "WEB_CAIPIAO", "0": "CLIENT", "1": "WALLET", "2": "WEBQQ", "3": "QZONE", "4": "SOSO", "5": "PENGYOU", "6": "TENPAY", "7": "TENCITY", "8": "APPBOX", "9": "QPLUS", "10": "WEIBO", "11": "PAIPAI_CHONG_WEB", "12": "PAIPAI_CHONG_CLIENT"};
        var m = (d.Util.getPara("SCENE") || d.Util.win("cp_scene")).toString() || "-1";
        d.Util.win("cp_scene", m);
        return{k: m, v: l[m] || ""};
    }();
    d.Size = {getObjSize: function (m) {
        var l = d.Dom.$(m);
        return[l.offsetWidth, l.offsetHeight];
    }, getPageSize: function () {
        var l = h.getElementsByTagName("html")[0];
        return[l.scrollWidth, l.scrollHeight];
    }, getWinSize: function () {
        var m = h.documentElement.clientWidth || g.innerWidth;
        var l = h.documentElement.clientHeight || g.innerHeight;
        return[m, l];
    }, getScrollSize: function () {
        var m = [];
        m[0] = g.pageXOffset || h.documentElement.scrollLeft;
        m[1] = g.pageYOffset || h.documentElement.scrollTop;
        var n = this.getPageSize();
        var l = this.getWinSize();
        m[2] = n[0] - l[0];
        m[3] = n[1] - l[1];
        m[2] = (m[2] > 0) ? Math.abs(m[2]) : 0;
        m[3] = (m[3] > 0) ? Math.abs(m[3]) : 0;
        return m;
    }, getFrameSize: function (t) {
        var q = d.Dom.$(t);
        var l = q.contentWindow.document.body.scrollWidth;
        var s = q.contentWindow.document.body.scrollHeight;
        var p = q.contentWindow.document.documentElement.scrollHeight;
        var m = q.contentWindow.document.getElementsByTagName("body")[0].offsetHeight;
        var r = q.contentWindow.document.getElementsByTagName("html")[0].offsetHeight;
        var n = Math.max(s, p, m, r);
        if (parseInt(d.Browser.version, 10) < 9 && q.contentWindow.document.compatMode == "BackCompat") {
            n -= 2;
        }
        return[l, n];
    }, getObjPosition: function (p) {
        var m = d.Dom.$(p);
        var l = m.offsetLeft, n = m.offsetTop;
        while (m = m.offsetParent) {
            l += m.offsetLeft;
            n += m.offsetTop;
        }
        return[l, n];
    }, getMousePoint: function () {
        var p = d.Event.getEvent();
        var m = y = 0, n = h.documentElement, l = h.body;
        if (g.pageYoffset) {
            m = g.pageXoffset;
            y = g.pageYoffset;
        } else {
            m = (n && n.scrollLeft || l && l.scrollLeft || 0) - (n && n.clientLeft || l && l.clientLeft || 0);
            y = (n && n.scrollTop || l && l.scrollTop || 0) - (n && n.clientTop || l && l.clientTop || 0);
        }
        m += p.clientX;
        y += p.clientY;
        return{x: m, y: y};
    }};
    d.Event = function () {
        var l = 1;
        var m = +new Date();
        return{getEvent: function () {
            if (g.event) {
                return g.event;
            }
            var p = arguments.callee.caller;
            while (p != null) {
                var n = p.arguments[0];
                if (n && String(n.constructor).indexOf("Event") != -1) {
                    return n;
                }
                p = p.caller;
            }
            return null;
        }, eventSrc: function () {
            var p = d.Event.getEvent();
            var n = (p && (p.target || p.srcElement)) || null;
            return n;
        }, addEvent: function () {
            if (g.addEventListener) {
                return function (q, n, p) {
                    q.addEventListener(n, p, false);
                };
            } else {
                return function (q, n, p) {
                    if (!p.guid) {
                        p.guid = m + l;
                        l++;
                    }
                    q["e" + p.guid] = p;
                    q[p.guid] = function () {
                        q["e" + p.guid](g.event);
                    };
                    q.attachEvent("on" + n, q[p.guid]);
                };
            }
        }(), removeEvent: function () {
            if (g.removeEventListener) {
                return function (q, n, p) {
                    q.removeEventListener(n, p, false);
                };
            } else {
                return function (q, n, p) {
                    if (p.guid && q[p.guid]) {
                        q.detachEvent("on" + n, q[p.guid]);
                        q[p.guid] = null;
                    } else {
                        q.detachEvent("on" + n, p);
                    }
                };
            }
        }(), preventDefault: function () {
            var n = d.Event.getEvent();
            if (g.event) {
                n.returnValue = false;
            } else {
                n.preventDefault();
            }
        }, stopPropagation: function () {
            var n = d.Event.getEvent();
            if (g.event) {
                n.cancelBubble = true;
            } else {
                n.stopPropagation();
            }
        }, dispatchEvent: function (s, t, w) {
            var s = d.Dom.$(s), n = null;
            var p = {click: 1, dblclick: 1, mouseover: 1, mouseout: 1, mousedown: 1, mouseup: 1, mousemove: 1};
            var v = {keyup: 1, keydown: 1, keypress: 1};
            var q = {submit: 1, focus: 1, blur: 1, change: 1, select: 1, resize: 1, scroll: 1};
            var u = {canBubble: true, cancelable: true, view: g, detail: 1, screenX: 0, screenY: 0, clientX: 0, clientY: 0, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, button: 0, relatedTarget: null};
            if (typeof w == "object") {
                d.Each(w, function (z, x) {
                    u[x] = z;
                });
            }
            if (!p[t] && !v[t] && !q[t]) {
                throw new Error(t + " event not supported");
            }
            if (h.createEvent) {
                if (p[t]) {
                    n = h.createEvent("MouseEvents");
                    if (n.initMouseEvent) {
                        n.initMouseEvent(t, u.canBubble, u.cancelable, u.view, u.detail, u.screenX, u.screenY, u.clientX, u.clientY, u.ctrlKey, u.altKey, u.shiftKey, u.metaKey, u.button, u.relatedTarget);
                    } else {
                        n = h.createEvent("UIEvents");
                        n.initEvent(t, u.canBubble, u.cancelable);
                    }
                    n.simulate = true;
                    s.dispatchEvent(n);
                } else {
                    if (v[t]) {
                        try {
                            n = h.createEvent("KeyEvents");
                            n.initKeyEvent(t, u.canBubble, u.cancelable, u.view, u.ctrlKey, u.altKey, u.shiftKey, u.metaKey, u.keyCode, u.charCode);
                        } catch (r) {
                            try {
                                n = h.createEvent("Events");
                            } catch (r) {
                                n = h.createEvent("UIEvents");
                            } finally {
                                n.initEvent(t, u.canBubble, u.cancelable);
                            }
                        }
                        n.simulate = true;
                        s.dispatchEvent(n);
                    } else {
                        if (q[t]) {
                            n = h.createEvent("UIEvents");
                            n.initUIEvent(t, u.canBubble, u.cancelable, u.view, u.detail);
                            n.simulate = true;
                            s.dispatchEvent(n);
                        }
                    }
                }
            } else {
                if (h.createEventObject) {
                    n = h.createEventObject();
                    n.simulate = true;
                    s.fireEvent("on" + t, n);
                } else {
                    throw new Error("Dispatch Event not supported");
                }
            }
        }, bind: function (q, p, s) {
            for (var r = 0, n = q.length; r < n; r++) {
                d.Event.addEvent(q[r], p, s);
            }
        }, once: function (n) {
            return function () {
                try {
                    n.apply(this, arguments);
                } catch (p) {
                } finally {
                    n = null;
                }
            };
        }};
    }();
    d.Loader = {loadScript: function (l, u, r, q, p) {
        q = (typeof q == "boolean") ? q : true;
        var s = h.getElementsByTagName("head")[0];
        var t = h.createElement("script");
        var n = "cp_script_" + (+new Date());
        var m = (t.onreadystatechange !== e && t.readyState !== e) ? "readystatechange" : "load";
        t.type = "text/javascript";
        if (typeof p == "string") {
            t.charset = p;
        }
        t.id = n;
        t.src = l;
        d.Event.addEvent(t, m, function () {
            var v = t.readyState || "loaded";
            if (v == "loaded" || v == "complete") {
                q && s.removeChild(t);
                s = null;
                t = null;
                if (typeof u == "function") {
                    u.apply(null, r || []);
                }
            }
        });
        s.appendChild(t);
        return n;
    }, loadCss: function (l) {
        var m = h.createElement("link");
        m.setAttribute("rel", "stylesheet");
        m.setAttribute("type", "text/css");
        m.setAttribute("href", l);
        h.getElementsByTagName("head")[0].appendChild(m);
    }, loadFrame: function (p) {
        var l = (!p.id || !d.Dom.$(p.id)) ? true : false;
        var m = l ? h.createElement("iframe") : d.Dom.$(p.id);
        if (p.id) {
            m.id = p.id;
        }
        if (p.css) {
            m.className = p.css;
        }
        if (p.w) {
            m.style.width = (/^\d+(\.\d+)?$/.test(p.w)) ? p.w + "px" : p.w;
        }
        if (p.h) {
            m.style.height = (/^\d+(\.\d+)?$/.test(p.h)) ? p.h + "px" : p.h;
        }
        if (p.scroll) {
            m.scrolling = p.scroll;
        }
        m.frameBorder = 0;
        m.src = p.url;
        if (d.Browser.type == "ie") {
            m.onreadystatechange = function () {
                if (m.readyState == "complete") {
                    if (typeof p.fn == "function") {
                        p.fn();
                    }
                    m.onreadystatechange = null;
                    m = null;
                }
            };
        } else {
            m.onload = function () {
                if (typeof p.fn == "function") {
                    p.fn();
                }
                m.onload = null;
                m = null;
            };
        }
        if (l) {
            var n = (p.target) ? d.Dom.$(p.target) : h.body;
            n.appendChild(m);
        }
    }, jsonp: function (m, n) {
        if (!m || typeof m != "string") {
            return;
        }
        if (d.getType(n) == "object") {
            n.vars = n.vars || "";
            n.preFix = n.preFix || "CP";
            n.outPut = n.outPut || 1;
            var q = "JSONP_G_" + n.preFix + "_" + (+new Date()), p = (n.outPut == 1 ? "JsonObj=" : "jsonObj=") + q, l = n.vars ? "&" + n.vars : "", m = m + "?" + p + l + "&t=" + Math.random();
            if (n.outPut === 1) {
                g[q] = function (r) {
                    if (typeof n.callBack == "function") {
                        n.callBack.call(null, r);
                    }
                    g[q] = null;
                };
                d.Loader.loadScript(m, null, null, n.isDestory, n.charset);
            } else {
                if (n.outPut === 2) {
                    d.Loader.loadScript(m, function (r) {
                        if (typeof g[q] != "undefined") {
                            if (typeof n.callBack == "function") {
                                n.callBack.apply(null, [g[q]].concat(r));
                            }
                            g[q] = null;
                        }
                    }, n.args || [], n.isDestory, n.charset);
                }
            }
        } else {
            d.Loader.loadScript(m);
        }
    }};
    function c() {
        this.config = {method: "GET", asynch: true, contentType: "application/x-www-form-urlencoded; charset=gb2312", cache: false, proxy: null, url: null, param: null, formName: null, requestHeader: [], headerHandler: null, responseHeader: [], headerArgs: [], handler: null, args: [], isXML: true, timeout: 10000, interval: -1, tryTimes: -1, isOld: false, isEncode: false};
        this.Request = {UNINITIALIZED: 0, LOADING: 1, LOADED: 2, INTERACTIVE: 3, COMPLETED: 4};
        this.instance = null;
        this.timeoutId = null;
        this.intervalId = null;
        this.requestTimes = 0;
        this.readystatechange = null;
    }

    c.prototype = {setConfig: function (l) {
        l = l || {};
        this.config.method = (l.method || "GET").toUpperCase();
        this.config.asynch = typeof(l.asynch) == "boolean" ? l.asynch : true;
        this.config.contentType = l.contentType || "application/x-www-form-urlencoded; charset=gb2312";
        this.config.cache = typeof(l.cache) == "boolean" ? l.cache : false;
        this.config.proxy = l.proxy || null;
        this.config.url = l.url || null;
        this.config.param = l.param || null;
        this.config.formName = l.formName || null;
        this.config.requestHeader = l.requestHeader || [];
        this.config.headerHandler = l.headerHandler || null;
        this.config.responseHeader = l.responseHeader || [];
        this.config.headerArgs = l.headerArgs || [];
        this.config.handler = l.handler || null;
        this.config.args = l.args || [];
        this.config.isXML = typeof(l.isXML) == "boolean" ? l.isXML : true;
        this.config.timeout = l.timeout || 10000;
        this.config.interval = l.interval || -1;
        this.config.tryTimes = l.tryTimes || -1;
        this.config.isOld = typeof(l.isOld) == "boolean" ? l.isOld : false;
        this.config.isEncode = typeof(l.isEncode) == "boolean" ? l.isEncode : true;
        this.config.statusHandler = l.statusHandler || null;
    }, getConfig: function () {
        return this.config;
    }, getInstance: function () {
        try {
            this.instance = new XMLHttpRequest();
        } catch (n) {
            try {
                this.instance = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (m) {
                try {
                    this.instance = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (l) {
                    this.instance = null;
                }
            }
        }
        return this.instance;
    }, resetStatus: function () {
        this.clearAbort();
        this.clearCycle();
        this.clearReadyStateChange();
        this.requestTimes = 0;
        this.instance = null;
    }, captureException: function (l) {
        this.resetStatus();
        throw new Error(l);
    }, evalHandler: function (p, n) {
        if (typeof(p) == "function") {
            var m = this.config;
            if (!m.isOld) {
                p.apply(p, n);
            } else {
                var l = n[0].data;
                if (l !== null) {
                    p.apply(p, [l]);
                } else {
                    if (typeof m.statusHandler == "function") {
                        m.statusHandler(n[0].status);
                    } else {
                        l = this.config.isXML ? '<?xml version="1.0" encoding="gb2312"?><root><retcode>' + n[0].status + "</retcode><retmsg>请求异常！</retmsg></root>" : '{"retcode": "' + n[0].status + '", "retmsg": "请求异常！"}';
                        p.apply(p, [l]);
                    }
                }
            }
        } else {
            if (null != p) {
                this.captureException("Get Handler Error!\nPlease check the handler's type.\nThe handler's type must be a function or null.");
            }
        }
        this.instance = null;
    }, filterChar: function (m) {
        var l = "";
        if (m) {
            l = m.replace(/%/g, "%25").replace(/\r\n/g, "%0D%0A").replace(/=/g, "%3D").replace(/&/g, "%26").replace(/\?/g, "%3F").replace(/\+/g, "%2B");
        }
        return l;
    }, getQueryString: function () {
        var s = this.getConfig();
        var u = s.param || "";
        var w = s.formName;
        if (null != w) {
            var l = (u) ? u.split("&") : [];
            var q = [];
            var m = null;
            var n = null;
            var x = 0;
            var p = "";
            var v = "";
            try {
                m = typeof(w) == "object" ? w : h.forms[w];
                q = m.elements;
                x = q.length;
                for (var r = 0; r < x; r++) {
                    n = q[r];
                    p = (n.tagName || "").toUpperCase();
                    v = (n.type || "").toUpperCase();
                    if (!n.name) {
                        continue;
                    }
                    switch (p) {
                        case"SELECT":
                        case"TEXTAREA":
                            l.push(n.name + "=" + (s.isEncode ? encodeURIComponent(n.value) : this.filterChar(n.value)));
                            break;
                        case"INPUT":
                            switch (v) {
                                case"TEXT":
                                case"PASSWORD":
                                case"HIDDEN":
                                    l.push(n.name + "=" + (s.isEncode ? encodeURIComponent(n.value) : this.filterChar(n.value)));
                                    break;
                                case"RADIO":
                                case"CHECKBOX":
                                    if (n.checked) {
                                        l.push(n.name + "=" + (s.isEncode ? encodeURIComponent(n.value) : this.filterChar(n.value)));
                                    }
                                    break;
                            }
                            break;
                    }
                }
                u = l.join("&");
            } catch (t) {
                this.captureException("get form data error ! \n " + t.message);
            } finally {
                l = null;
                q = null;
                m = null;
                n = null;
                x = 0;
                p = null;
                v = null;
            }
        }
        return u || "";
    }, appendParameter: function (l, m) {
        if (m) {
            l = l + (l.indexOf("?") === -1 ? "?" : "&") + m;
        }
        return l;
    }, makeURL: function () {
        var m = this.getConfig();
        var l = m.url || "";
        var n = m.proxy;
        var q = this.getQueryString();
        var p = null;
        if ("GET" == m.method) {
            l = this.appendParameter(l, q);
        } else {
            p = q;
        }
        if (null != n) {
            l = this.appendParameter(n, "req_url=" + encodeURIComponent(l));
        }
        m = null;
        q = null;
        return{URL: l, DATA: p};
    }, clearAbort: function () {
        if (null != this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }, clearCycle: function () {
        if (null != this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }, clearReadyStateChange: function () {
        if (null != this.readystatechange) {
            clearInterval(this.readystatechange);
            this.readystatechange = null;
        }
    }, $abort: function (l, p, n) {
        var m = this.getConfig();
        if (m.timeout > 0) {
            var q = this;
            this.timeoutId = setTimeout(function () {
                l.abort();
                if (m.interval <= 0 && m.tryTimes > 0 && q.requestTimes < m.tryTimes) {
                    q.requestTimes++;
                    n.unshift({status: "TRY#" + q.requestTimes, data: null});
                    q.evalHandler(p, n);
                    n.shift();
                    q.$send();
                } else {
                    n.unshift({status: "TIMEOUT", data: null});
                    q.evalHandler(p, n);
                    n.shift();
                }
                q.clearAbort();
            }, m.timeout);
        }
    }, callSender: function () {
        if (this.getConfig().interval > 0) {
            var l = this;
            this.$send();
            this.intervalId = setInterval(function () {
                l.$send();
            }, this.config.interval);
        } else {
            this.$send();
        }
    }, $getResponseHeader: function (q) {
        var p = this.config.responseHeader;
        var n = p.length;
        var l = [];
        for (var m = 0; m < n; m++) {
            l.push({name: p[m], value: q.getResponseHeader(p[m])});
        }
        return l;
    }, $interactive: function (r) {
        var m = this.getConfig();
        var p = m.headerHandler;
        var l = m.headerArgs;
        var n = r.getAllResponseHeaders();
        var q = this.$getResponseHeader(r);
        l.unshift({all: n, headers: q});
        this.evalHandler(p, l);
        l.shift();
    }, $completed: function (q) {
        var m = this.config;
        var n = m.isXML;
        var p = m.handler;
        var l = m.args;
        this.clearAbort();
        if (200 == q.status || 304 == q.status || 302 == q.status) {
            l.unshift({status: q.status, data: (n ? q.responseXML : q.responseText)});
            this.evalHandler(p, l);
            l.shift();
        } else {
            if (m.interval <= 0 && m.tryTimes > 0 && this.requestTimes < m.tryTimes) {
                this.requestTimes++;
                l.unshift({status: "TRY#" + this.requestTimes, data: null});
                this.evalHandler(p, l);
                l.shift();
                this.$send();
            } else {
                l.unshift({status: q.status, data: null});
                this.evalHandler(p, l);
                l.shift();
            }
        }
        m = null;
        q = null;
    }, $setHeader: function (p) {
        var n = this.config.requestHeader;
        var m = n.length;
        var q = null;
        for (var l = 0; l < m; l++) {
            q = n[l];
            p.setRequestHeader(q.name, q.value);
        }
    }, $send: function () {
        try {
            var n = this;
            var q = this.getInstance();
            var m = this.makeURL();
            var l = this.getConfig();
            if (null != q) {
                q.open(l.method, m.URL, l.asynch);
                if (!l.cache) {
                    q.setRequestHeader("No-Cache", "1");
                    q.setRequestHeader("Pragma", "no-cache");
                    q.setRequestHeader("Cache-Control", "no-cache");
                    q.setRequestHeader("Expires", "0");
                    q.setRequestHeader("Last-Modified", "Thu, 1 Jan 1970 00:00:00 GMT");
                    q.setRequestHeader("If-Modified-Since", "-1");
                }
                q.setRequestHeader("Content-Type", l.contentType);
                this.$setHeader(q);
                this.$abort(q, l.handler, l.args);
                if (l.asynch) {
                    if (null != l.headerHandler || null != l.handler) {
                        n.readystatechange = setInterval(function () {
                            switch (q.readyState) {
                                case n.Request.UNINITIALIZED:
                                case n.Request.LOADING:
                                case n.Request.LOADED:
                                case n.Request.INTERACTIVE:
                                    break;
                                case n.Request.COMPLETED:
                                    n.clearReadyStateChange();
                                    n.clearAbort();
                                    if (null != l.headerHandler) {
                                        n.$interactive(q);
                                    }
                                    if (null != l.handler) {
                                        n.$completed(q);
                                    }
                                    break;
                            }
                        }, 50);
                    }
                }
                q.send(m.DATA);
                if (false === l.asynch && null != l.handler) {
                    this.$completed(q);
                }
            } else {
                this.captureException("Get XMLHttpRequest Object Failure!");
            }
        } catch (p) {
            this.captureException("An Runtime Error Occurred ! \n\n" + p.message);
        }
    }, sendRequest: function (l) {
        this.resetStatus();
        this.setConfig(l);
        this.callSender();
    }, send: function (l) {
        l = l || {};
        this.sendRequest({url: l.url, method: l.method || "GET", handler: l.callBack || null, args: [], param: l.vars || null, contentType: l.contentType || null, isXML: ((l.getType || 1) == 2), timeout: l.timeout || -1, interval: l.interval || -1, tryTimes: l.tryTimes || -1, isOld: true, statusHandler: l.statusHandler || null});
    }, byForm: function (m, n, l) {
        m = (typeof m == "object") ? m : h.forms[m];
        l = l || {};
        this.sendRequest({url: m.getAttribute("action"), method: l.method || "GET", handler: n || null, args: [], param: null, contentType: l.contentType || null, formName: m, timeout: l.timeout || -1, interval: l.interval || -1, tryTimes: l.tryTimes || -1, isEncode: l.isEncode || true, isXML: ((l.getType || 1) == 2), isOld: true, statusHandler: l.statusHandler || null});
    }};
    d.Ajax = function () {
        var n = null;
        var q = function () {
            return !!(n && n.instance === null) ? n : (n = new c());
        };
        var l = function () {
            var r = q();
            r.sendRequest.apply(r, f.apply(arguments, [0, arguments.length]));
        };
        var p = function () {
            var r = q();
            r.send.apply(r, f.apply(arguments, [0, arguments.length]));
        };
        var m = function () {
            var r = q();
            r.byForm.apply(r, f.apply(arguments, [0, arguments.length]));
        };
        return{sendRequest: l, send: p, byForm: m};
    }();
    function k() {
        this.$domain = "caipiao.tenpay.com";
        this.url = "https://img.tenpay.com/res/js/stat/ping_tcss_https.3.1.0.js";
        this.loader = null;
        this.DOMAIN = {www: "www.tenpay.com", shouji: "shouji.tenpay.com", xinyongka: "xinyongka.tenpay.com", chong: "chong.tenpay.com", youxi: "youxi.tenpay.com", qbqd: "qbqd.tenpay.com", qq: "qq.tenpay.com", caipiao: "500wan.zone.tenpay.com", airb2c: "air.tenpay.com", hnair: "hnair.qq.com", wallet: "wallet.tenpay.com", jipiao: "jipiao.tenpay.com", jiudian: "jiudian.tenpay.com", gwt: "gwt.tenpay.com", jiaofei: "jiaofei.tenpay.com", mch: "mch.tenpay.com", action: "action.tenpay.com", cp: "caipiao.tenpay.com", bc: "tc.caipiao.tenpay.com"};
    }

    k.prototype = {main: function (l) {
        if (typeof(pgvMain) == "function") {
            pgvMain("", {virtualDomain: this.$domain, virtualURL: l, repeatApplay: "true"});
        }
    }, start: function (l) {
        if (typeof(pgvMain) == "function") {
            pgvMain("pathtrace", {virtualURL: l, virtualDomain: this.$domain, pathStart: true, tagParamName: "ADTAG", useRefUrl: true, careSameDomainRef: true, repeatApplay: "true"});
        }
    }, load: function (n, p) {
        var l = (typeof(n) == "string" && "" != n) ? n : location.pathname;
        var m = p || null;
        if (null == this.loader) {
            var r = this;
            var q = "";
            q = d.Loader.loadScript(this.url, function (t, s) {
                r.loader = h.getElementById(q);
                r.innerCall(t, s);
            }, [l, m], false);
        } else {
            this.innerCall(l, m);
        }
    }, innerCall: function (m, l) {
        if (null != l) {
            if (true === l.start) {
                this.start(m);
            } else {
                this.main(m);
            }
        } else {
            this.main(m);
        }
    }, clickStat: function (m, l) {
        try {
            if (typeof(pgvSendClick) == "function") {
                pvCurDomain = l ? this.DOMAIN[l] || this.$domain : this.$domain;
                pgvSendClick({hottag: m, virtualDomain: pvCurDomain, virtualURL: this.$path});
            } else {
                var q = this;
                var p = "";
                p = d.Loader.loadScript(this.url, function (s, r) {
                    q.loader = h.getElementById(p);
                    if (typeof(pgvSendClick) == "function") {
                        pvCurDomain = r;
                        var t = q.$path;
                        pgvSendClick({hottag: s, virtualDomain: pvCurDomain, virtualURL: t});
                    }
                }, [m, (l ? this.DOMAIN[l] || this.$domain : this.$domain)], false);
            }
        } catch (n) {
        }
    }, pgv: function (l, m, n) {
        this.$domain = this.DOMAIN[l] || "caipiao.tenpay.com";
        m = m || location.pathname;
        this.$path = m;
        n = n || null;
        this.load(m, n);
    }};
    d.Stat = new k();
    d.DOMReady = function () {
        var m = [], p = false;
        var n = function () {
            if (!m) {
                return;
            }
            for (var r = 0, q = m.length; r < q; r++) {
                m[r]();
            }
            m = null;
        };
        var l = function () {
            try {
                h.documentElement.doScroll("left");
                p = true;
            } catch (q) {
                setTimeout(l, 1);
                return;
            }
            p && n();
        };
        h.addEventListener ? d.Event.addEvent(h, "DOMContentLoaded", n) : l();
        d.Event.addEvent(g, "load", n);
        return function (q) {
            m ? m.push(q) : q();
        };
    }();
    d.Amount = {format: function (l, m) {
        return !(/^(\-)?[0-9]+(\.[0-9]+)?$/).test(l) ? false : Number(l).fix(typeof m == "number" ? m : 2);
    }, split: function (p, q) {
        if (!(p = this.format(p, 2))) {
            return false;
        }
        var l = p.indexOf("-") != -1;
        q = q || 3;
        p = p.replace("-", "").toString().split(".");
        var m = (Number(p[0]).toFixed(q - ((p[0].length % q) || q)).split(".")[1] || "") + p[0];
        p[0] = "";
        while (m.length > 0) {
            p[0] += (!p[0] ? m.substr(0, q) - 0 : m.substr(0, q)) + ",";
            m = m.substr(q);
        }
        return(l ? "-" : "") + p[0].substr(0, p[0].length - 1) + (p[1] ? "." + p[1] : "");
    }, cn: function (m) {
        var n = m.indexOf("-") != -1;
        m = n ? Math.abs(m) : m;
        if (!(m = this.format(m, 2)) || parseFloat(m) > 999999999999.99) {
            return false;
        }
        if (Number(m) == 0) {
            return"零";
        }
        var l = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        m = m.split(".");
        var u = "";
        var r = m[0];
        var q = m[1];
        if (r) {
            var t = ["", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿", "拾", "佰", "仟"];
            for (var p = 0, s = r.length; p < s; p++) {
                u += l[r[p]] + t[s - p - 1];
            }
            u += "元";
        }
        if (q > 0) {
            var t = ["分", "角"];
            for (var p = 0, s = q.length; p < s; p++) {
                if (q[p] > 0) {
                    u += l[q[p]] + t[s - p - 1];
                }
            }
        } else {
            u += "整";
        }
        return(n ? "负" : "") + u;
    }, fen2Yuan: function (l) {
        return(parseFloat(l) / 100).fix(2);
    }, yuan2Fen: function (l) {
        return(parseFloat(l) * 100).fix(0);
    }};
    d.Effect = function () {
        var l = function () {
            this.timer = null;
        };
        l.prototype = {setOpacity: function (n, p) {
            n.style.filter = "alpha(opacity = " + p * 100 + ");";
            n.style.mozOpacity = p;
            n.style.khtmlOpacity = p;
            n.style.opacity = p;
        }, remove: function () {
            this.timer && clearInterval(this.timer);
        }, init: function (r) {
            var p = this;
            p.remove();
            var s = {target: r.target, unit: r.unit || 0.1, range: r.range || 0, rate: r.rate || 100, fn: r.fn || null};
            var q = d.Dom.$(s.target);
            if (typeof s.range == "object") {
                var n = (s.range[0] - s.range[1] > 0) ? 1 : 2;
                s.unit = (n == 1) ? -s.unit : s.unit;
                p.timer = setInterval(function () {
                    p.setOpacity(q, s.range[0]);
                    s.range[0] = s.range[0] + s.unit;
                    if ((n == 1 && s.range[0] <= s.range[1]) || (n == 2 && s.range[0] >= s.range[1])) {
                        p.remove();
                        p.setOpacity(q, s.range[1]);
                        s.fn && s.fn();
                        return;
                    }
                }, s.rate);
            } else {
                p.setOpacity(q, s.range);
                s.fn && s.fn();
            }
        }};
        var m = function () {
            var n = {Back: {easeOut: function (q, p, v, u, r) {
                if (r == e) {
                    r = 1.70158;
                }
                return v * ((q = q / u - 1) * q * ((r + 1) * q + r) + 1) + p;
            }, easeInOut: function (q, p, v, u, r) {
                if (r == e) {
                    r = 1.70158;
                }
                if ((q /= u / 2) < 1) {
                    return v / 2 * (q * q * (((r *= (1.525)) + 1) * q - r)) + p;
                }
                return v / 2 * ((q -= 2) * q * (((r *= (1.525)) + 1) * q + r) + 2) + p;
            }}, Cubic: {easeIn: function (q, p, s, r) {
                return s * (q /= r) * q * q + p;
            }, easeOut: function (q, p, s, r) {
                return s * ((q = q / r - 1) * q * q + 1) + p;
            }, easeInOut: function (q, p, s, r) {
                if ((q /= r / 2) < 1) {
                    return s / 2 * q * q * q + p;
                }
                return s / 2 * ((q -= 2) * q * q + 2) + p;
            }}};
            return function (s, q, v, t) {
                var r = s;
                if (typeof r != "function") {
                    var u = s.split(".");
                    r = n[u[0]][u[1]];
                }
                var q = q || [];
                q[0] = q[0] || 0, q[1] = q[1] || 0, q[2] = typeof q[2] == "number" ? q[2] : 500, q[3] = typeof q[3] == "number" ? q[3] : 100;
                if (v) {
                    var p;
                    var w = function () {
                        if (q[0] < q[3]) {
                            q[0]++;
                            p = r.apply(null, q);
                            v.apply(null, [p]);
                            setTimeout(w, 10);
                        } else {
                            t && t.apply(null, [p]);
                            return p;
                        }
                    };
                    w();
                } else {
                    return r.apply(null, q);
                }
            };
        }();
        return{Opacity: l, Tween: m};
    }();
    d.Box = function () {
        var v = d.Browser.type == "ie" && parseInt(d.Browser.version, 10) == 6;
        var p = null;
        var z = null;
        var w = null;
        var l = false;
        var E = "CP_Box";
        var x = function () {
            if (p) {
                return;
            }
            var F = h.getElementsByTagName("body")[0];
            var G = [];
            G.push('<div id="box_inner" class="box">');
            G.push('<a id="box_closer" class="box-closer" href="###" title="关闭"><!--closer--></a>');
            G.push('<div id="box_title" class="box-title"><span id="box_title_main" class="box-title-main"></span></div>');
            G.push('<div id="box_content" class="box-content"><span id="box_icon" class="box-ico"><!--ico--></span><div id="box_content_main"></div></div>');
            G.push('<div id="box_ft" class="box-ft"><span class="box-btn-bt"><input type="button" value="确定" /></span><span class="box-btn-bt"><input type="button" value="取消" /></span></div>');
            G.push('<span class="box-tl"></span><span class="box-tr"></span><span id="box_bl" class="box-bl"></span><span id="box_br" class="box-br"></span>');
            G.push("</div>");
            G.push('<div class="box-shadow"></div>');
            G = G.join("");
            p = h.createElement("div");
            p.id = "box";
            p.className = "box-outer";
            p.innerHTML = G;
            F.appendChild(p);
            z = h.createElement("div");
            z.id = "box_mask";
            z.className = "box-mask";
            if (v) {
                z.innerHTML = '<iframe frameborder="0" src="about:blank" allowtransparency="true"></iframe>';
            }
            F.appendChild(z);
        };
        var u = function () {
            w && clearInterval(w);
            d.Util.hide([z, p]);
            d.Event.removeEvent(g, "resize", C);
            if (v) {
                s.sel(true);
                d.Event.removeEvent(g, "scroll", s.fixed);
            }
            l = false;
            return false;
        };
        var A = function (L, K) {
            l && u();
            v && s.sel();
            E = L.name || "CP_Box";
            var J = ["box-outer"];
            p.style.position = (L.fixed === false || v) ? "absolute" : "fixed";
            var G = 20;
            if (L.opacityBorder === false) {
                J.push("box-no-opacity");
                G = 0;
            }
            L.chromeless && J.push("box-chromeless");
            L.skin && J.push(L.skin);
            z.style.backgroundColor = (typeof L.maskColor == "string") ? L.maskColor : "#ccc";
            L.opacity = parseFloat(L.opacity) || 0.7;
            z.style.filter = "alpha(opacity = " + L.opacity * 100 + ")";
            z.style.mozOpacity = z.style.khtmlOpacity = z.style.opacity = L.opacity;
            p.style.width = ((L.w ? parseInt(L.w, 10) : 476) + G) + "px";
            if (!L.chromeless) {
                t(L.title || "");
                d.Util.show("box_title");
            } else {
                d.Util.hide("box_title");
            }
            L.closer ? d.Util.hide("box_closer") : d.Util.show("box_closer");
            d.Dom.$("box_inner").style.backgroundColor = (L.bgTransparent !== true) ? "#fff" : "transparent";
            switch (K) {
                case"text":
                    p.style.height = L.h ? (L.h + "px") : "auto";
                    r(L.info);
                    L.icon = parseInt(L.icon, 10) || 0;
                    if (L.icon < 1 || L.icon > 5) {
                        d.Util.hide("box_icon");
                        d.Dom.$("box_content_main").className = "";
                    } else {
                        J.push("box-std box-tips");
                        if (!L.btns) {
                            L.btns = [
                                ["关闭", d.Box.close]
                            ];
                        }
                        d.Util.show("box_icon");
                        var F = ["box-ico-ok", "box-ico-err", "box-ico-warn", "box-ico-notice", "box-ico-qna"];
                        d.Dom.$("box_icon").className = "box-ico " + F[L.icon - 1];
                        d.Dom.$("box_content_main").className = "box-content-main";
                    }
                    break;
                case"frame":
                    p.style.height = "auto";
                    d.Util.hide("box_icon");
                    r(L);
                    break;
            }
            if (typeof L.btns == "object") {
                var I = d.Dom.$("box_ft").getElementsByTagName("input");
                if (I.length < 1) {
                    I = d.Dom.$("box_ft").getElementsByTagName("a");
                }
                for (var H = 0; H < 2; H++) {
                    if (L.btns[H]) {
                        I[H].value = L.btns[H][0];
                        I[H].onclick = L.btns[H][1];
                        I[H].parentNode.style.display = "inline-block";
                    } else {
                        d.Util.hide(I[H].parentNode);
                    }
                }
                d.Util.show("box_ft");
            } else {
                d.Util.hide("box_ft");
            }
            d.Dom.$("box_closer").onclick = function () {
                d.Box.close();
                if (typeof L.cfn == "function") {
                    L.cfn();
                }
                return false;
            };
            p.className = J.join(" ");
        };
        var t = function (F) {
            d.Dom.$("box_title_main").innerHTML = F || "";
        };
        var r = function (G) {
            if (d.getType(G) != "object") {
                d.Dom.$("box_content_main").innerHTML = G || "";
                if (v) {
                    s.odd();
                }
            } else {
                w && clearInterval(w);
                var F = d.Dom.$("box_iframe");
                if (!F) {
                    d.Dom.$("box_content_main").innerHTML = '<div id="box_iframe_loading" class="box-loading box-loading-iframe">正在载入...</div><iframe id="box_iframe" frameborder="0" class="box-iframe" style="display:none;" src="about:blank"></iframe>';
                    F = d.Dom.$("box_iframe");
                } else {
                    d.Util.show("box_iframe_loading");
                }
                F.id = "box_iframe_tmp";
                d.Util.hide(F);
                d.Loader.loadFrame({id: "box_iframe", css: "box-iframe", w: G.w2, h: G.h, scroll: G.scroll, url: G.url, fn: function () {
                    d.Util.hide("box_iframe_loading").show("box_iframe", true);
                    try {
                        if (typeof G.fn == "function") {
                            G.fn();
                        }
                    } catch (I) {
                    }
                    d.Dom.$("box_iframe").setAttribute("data-offset", (typeof G.offset == "object") ? "1" : "0");
                    setTimeout(function () {
                        n(G.h);
                    }, 0);
                    if (G.monitor && typeof G.h != "number") {
                        m();
                    }
                    var H = d.Dom.$("box_iframe_tmp");
                    H && H.parentNode.removeChild(H);
                    if (v) {
                        s.odd();
                    }
                }, target: "box_content_main"});
            }
        };
        var q = function (G, J) {
            var F = d.Dom.$("box_iframe");
            if (F) {
                F.setAttribute("data-offset", "1");
            }
            if (G == "auto" && J == "auto") {
                D();
            } else {
                if (G == "auto" && J != "auto") {
                    var I = d.Size.getObjSize(p);
                    p.style.left = "50%";
                    p.style.top = 0;
                    p.style.marginLeft = -I[0] / 2 + "px";
                    p.style.marginTop = J + "px";
                } else {
                    if (G != "auto" && J == "auto") {
                        var I = d.Size.getObjSize(p);
                        var H = d.Size.getScrollSize();
                        p.style.left = 0;
                        p.style.top = "50%";
                        p.style.marginLeft = G + "px";
                        p.style.marginTop = -I[1] / 2 + (v ? H[1] : 0) + "px";
                    } else {
                        p.style.left = 0;
                        p.style.top = 0;
                        p.style.marginLeft = G + "px";
                        p.style.marginTop = J + "px";
                    }
                }
            }
        };
        var D = function () {
            var F = d.Dom.$("box_iframe");
            if (F) {
                F.setAttribute("data-offset", "0");
            }
            var I = d.Size.getPageSize();
            z.style.width = I[0] + "px";
            z.style.height = I[1] + "px";
            var H = d.Size.getObjSize(p);
            var G = d.Size.getScrollSize();
            p.style.left = "50%";
            p.style.top = "50%";
            p.style.marginLeft = -H[0] / 2 + "px";
            p.style.marginTop = -H[1] / 2 + (v ? G[1] : 0) + "px";
        };
        var n = function (H) {
            var F = d.Dom.$("box_iframe");
            if (!F) {
                return;
            }
            if (typeof H == "number") {
                F.style.height = H + "px";
            } else {
                F.style.height = "auto";
                try {
                    var G = d.Size.getFrameSize(F);
                    F.style.height = G[1] + "px";
                } catch (I) {
                }
            }
            if (v) {
                p.className = p.className;
            }
            if (F.getAttribute("data-offset") === "0") {
                D();
            }
        };
        var m = function () {
            w = setInterval(function () {
                n();
            }, 500);
        };
        var B = function (F) {
            d.Util.show([z, p]);
            if (d.getType(F.offset) == "array") {
                q(F.offset[0], F.offset[1]);
            } else {
                D();
            }
            d.Event.addEvent(g, "resize", C);
            if (v && F.fixed !== false) {
                d.Event.addEvent(g, "scroll", s.fixed);
            }
            if (d.Browser.ie) {
                p.className = p.className;
            }
            l = true;
            return false;
        };
        var C = function () {
            var G = d.Size.getScrollSize();
            var F = d.Size.getWinSize();
            z.style.width = ((G[2] > 0) ? (F[0] + G[2]) : F[0]) + "px";
            z.style.height = ((G[3] > 0) ? (F[1] + G[3]) : F[1]) + "px";
        };
        var s = {sel: function (I) {
            var G = h.getElementsByTagName("select");
            var H = I ? d.Util.show : d.Util.hide;
            for (var J = 0, F = G.length; J < F; J++) {
                H(G[J], true);
            }
        }, fixed: function () {
            var G = d.Size.getObjSize(p);
            var F = d.Size.getScrollSize();
            p.style.marginTop = -G[1] / 2 + F[1] + "px";
        }, odd: function () {
            var G = d.Dom.$("box_inner");
            var F = d.Size.getObjSize(G);
            if (F[1] % 2 != 0) {
                d.Dom.$("box_bl").style.bottom = d.Dom.$("box_br").style.bottom = "-2px";
            } else {
                d.Dom.$("box_bl").style.bottom = d.Dom.$("box_br").style.bottom = "-1px";
            }
        }};
        return{name: function () {
            return E;
        }, isOpen: function () {
            return l;
        }, obj: function () {
            return{box: p, boxFrame: d.Dom.$("box_iframe"), boxCloser: d.Dom.$("box_closer")};
        }, text: function (F) {
            x();
            A(F, "text");
            B(F);
        }, frame: function (F) {
            if (F.login && !d.User.isCPUser()) {
                d.TopWin.CP.User.checkLogin(function () {
                    d.TopWin.CP.Box.frame(F);
                });
            } else {
                x();
                A(F, "frame");
                B(F);
            }
        }, offset: q, center: D, resetFrameSize: n, setTitle: t, setContent: r, close: u};
    }();
    d.Validator = function () {
        var l = {qq: /^[1-9]\d{4,10}$/, email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/, vcode: /^[a-z0-9]{4}$/i, mobileVCode: /^\d{6}$/, mobile: /^1[0-9]{10}$/, chinese: /^[\u4e00-\u9fa5]+$/, url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i};
        return{test: function (q, m) {
            var n = l[q];
            if (!n) {
                return false;
            }
            return(typeof n == "object") ? n.test(m) : n(m);
        }};
    }();
    d.Form = function () {
        var s = {debug: false, form: null, global: false, errHandler: null, submit: null, fields: []};
        var v = {};
        var q = function (z) {
            for (var x in s) {
                if (s.hasOwnProperty(x)) {
                    v[x] = z[x] || s[x];
                }
            }
        };
        var u = function (z, x) {
            if (v[z]) {
                v[z] = x;
            }
        };
        var n = function (x) {
            return v[x] || null;
        };
        var p = function (A, C, z) {
            var x = v.fields;
            for (var B = 0; B < x.length; B++) {
                if (A == x[B].name) {
                    x[B][C] = z;
                    break;
                }
            }
        };
        var t = function (x) {
            var I = true;
            var E = v.fields;
            for (var D = 0, F = E.length; D < F; D++) {
                if (x && x != E[D].name) {
                    continue;
                }
                var H = true;
                if (E[D].type == "pwdCtrl") {
                    H = E[D].rule.apply(d.Dom.$(E[D].name), [null]);
                } else {
                    var C = h.getElementsByName(E[D].name);
                    var A, z;
                    var G = typeof E[D].require == "string";
                    if (G) {
                        z = E[D].require;
                    }
                    switch (E[D].type) {
                        case"checkbox":
                            C = C[0];
                            A = C.value.trim();
                            if (G && !C.checked) {
                                H = false;
                            }
                            break;
                        case"radio":
                            if (G) {
                                H = false;
                            }
                            for (var B = 0; B < C.length; B++) {
                                if (C[B].checked) {
                                    A = C[B].value.trim();
                                    H = true;
                                    break;
                                }
                            }
                            break;
                        case"select":
                            C = C[0];
                            A = l(C);
                            if (A == "") {
                                H = false;
                            }
                            break;
                        default:
                            C = C[0];
                            A = C.value.trim();
                            if (G && A == "") {
                                H = false;
                            }
                            break;
                    }
                    if (H) {
                        z = E[D].msg;
                        switch (typeof E[D].rule) {
                            case"string":
                                H = d.Validator.test(E[D].rule, A);
                                break;
                            case"function":
                                H = E[D].rule.apply(C, [z]);
                                break;
                            case"object":
                                H = E[D].rule.test(A);
                                break;
                        }
                    }
                }
                if (!H) {
                    I = false;
                    if (E[D].type != "pwdCtrl" && z) {
                        w(E[D].name, z, E[D].focus);
                    }
                    if (!n("global")) {
                        return false;
                    }
                    break;
                } else {
                    I = true;
                    w(E[D].name);
                }
            }
            return I;
        };
        var w = function (z, C, x) {
            var A = n("errHandler");
            if (A) {
                A.apply(h.getElementsByName(z), [C]);
            } else {
                if (C) {
                    var B = h.getElementsByName(z)[0];
                    var D = d.Dom.$("err_" + z);
                    if (!D) {
                        D = h.createElement("div");
                        D.id = "err_" + z;
                        D.className = "err";
                        B.parentNode.appendChild(D);
                    }
                    D.innerHTML = C;
                    d.Util.show(D);
                    if (x) {
                        B.focus();
                    }
                } else {
                    d.Util.hide("err_" + z);
                }
            }
            if (d.TopWin.location != g.self.location) {
                d.TopWin.CP.Box.resetFrameSize();
            }
        };
        var m = function (x) {
            var A = h.getElementsByName(x);
            for (var z = 0; z < A.length; z++) {
                if (A[z].checked) {
                    return A[z].value;
                }
            }
            return null;
        };
        var l = function (A, z) {
            var x = d.Dom.$(A);
            return(!z) ? x.options[x.selectedIndex].value : x.options[x.selectedIndex].text;
        };
        var r = function (C, A) {
            var z = d.Dom.$(C);
            var B = z.getElementsByTagName("option");
            for (var x = 0; x < B.length; x++) {
                if (A == B[x].value) {
                    B[x].selected = true;
                    break;
                }
            }
        };
        return{getRdoVal: m, getSelVal: l, initSel: r, cmpTime: function (z, x) {
            z = (typeof z == "object") ? +z : +new Date(z);
            x = (typeof x == "object") ? +x : +new Date(x);
            return(z > x) ? 1 : (z == x) ? 0 : -1;
        }, getPwd: function (A, z) {
            var x = d.Dom.$("tm").value.substring(0, 20);
            switch (z) {
                case 1:
                    return A.getLoginPasswd(x);
                default:
                    return A.getStrongPasswd(x);
            }
        }, disabled: function (z, x) {
            var C = h.forms[z || v.form || 0];
            var B = C.elements;
            for (var A = 0; A < B.length; A++) {
                B[A].disabled = !x;
            }
        }, reset: function (x) {
            var z = h.forms[x || v.form || 0];
            z.reset();
        }, get: function (A, z) {
            var D = h.forms[A || v.form || 0];
            var C = D.elements;
            var E, x = "";
            var z = (typeof z == "object") ? ("|" + z.join("|") + "|") : (typeof z == "string") ? ("|" + z + "|") : null;
            for (var B = 0; B < C.length; B++) {
                if (C[B].name == "") {
                    continue;
                }
                if (z && z.indexOf("|" + C[B].name + "|") == -1) {
                    continue;
                }
                if (C[B].tagName == "select") {
                    E = l(C[B]);
                } else {
                    if (C[B].type == "radio" || C[B].type == "checkbox") {
                        if (!C[B].checked) {
                            continue;
                        }
                        E = C[B].value;
                    } else {
                        E = C[B].value.trim();
                    }
                }
                x += C[B].name + "=" + E + "&";
            }
            return x.substr(0, x.length - 1);
        }, str2JSON: function (B) {
            var A = {};
            var x = B.split("&");
            for (var z = 0; z < x.length; z++) {
                x[z] = x[z].split("=");
                A[x[z][0]] = x[z][1];
            }
            return A;
        }, init: function (B) {
            q(B);
            u("submit", function () {
                if (!t()) {
                    return false;
                }
                var F = v.fields;
                for (var G = 0; G < F.length; G++) {
                    d.Util.hide(d.Dom.$("err_" + F[0].name));
                }
                if (B.debug) {
                    return false;
                }
                B.submit && B.submit();
                return false;
            });
            var E = h.forms[v.form || 0];
            var D = E.elements;
            var z = v.fields;
            for (var C = 0; C < z.length; C++) {
                if (z[C].type == "pwdCtrl") {
                    continue;
                }
                for (var A = 0, x = D.length; A < x; A++) {
                    if (D[A].name == z[C].name && !z[C].type) {
                        p(z[C].name, "type", (D[A].tagName.toLowerCase() == "select") ? "select" : D[A].type);
                        if (D[A].type == "text" && typeof z[C].maxlen == "number") {
                            D[A].maxLength = z[C].maxlen;
                        }
                        if (z[C].event) {
                            h.getElementsByName(z[C].name)[0]["on" + z[C].event] = (function (F) {
                                return function () {
                                    t(F);
                                };
                            })(z[C].name);
                        }
                        break;
                    }
                }
            }
            E.onsubmit = v.submit;
        }};
    }();
    d.User = function () {
        var l = null;
        return{isLogin: function () {
            return(d.Cookie.get("qluin") == "") ? false : true;
        }, logout: function (p) {
            var n, m = new Image();
            m.src = "https://www.tenpay.com/app/v1.0/logout.cgi?v=" + Math.random();
            m = null;
            d.Cookie.del("qluin");
            d.Cookie.del("qlskey");
            d.Cookie.del("qltn");
            d.Cookie.del("qq_nickname");
            d.Cookie.del("qq_logtype");
            d.Cookie.del("certuserflag");
            d.Cookie.del("uin");
            d.Cookie.del("skey");
            d.Cookie.del("p_uin");
            d.Cookie.del("p_skey");
            d.Cookie.del("cp_nickname", "caipiao.tenpay.com");
            if (p !== false) {
                n = (typeof p == "string") ? p : g.location.pathname + g.location.search;
                g.location.href = n;
            }
            return false;
        }, type: function () {
            return parseInt(d.Cookie.get("qq_logtype"), 10);
        }, info: function () {
            return[d.Cookie.get("qluin"), d.Cookie.get("qq_nickname"), d.Cookie.get("qltn"), decodeURIComponent(d.Cookie.get("cp_nickname"))];
        }, getSession: function () {
            var C = d.Cookie.get("skey") || d.Util.getPara("skey") || null;
            var q = d.Cookie.get("uin") || d.Util.getPara("uin") || null;
            var u = d.Util.getPara("clientkey") || null;
            var z = d.Util.getPara("clientuin") || null;
            var w = d.Cookie.get("wallet_u") || null;
            var x = d.Cookie.get("wallet_s") || null;
            var p = d.Cookie.get("qluin") || null;
            var n = d.Cookie.get("qlskey") || null;
            var v = d.Cookie.get("qq_logtype") || null;
            var B = d.Cookie.get("qltn") || null;
            var s = d.Cookie.get("qlattid") || null;
            var A = d.Cookie.get("qq_nickname") || null;
            var r = decodeURIComponent(d.Cookie.get("cp_nickname")) || null;
            var t = w || z || p || null;
            var m = x || u || null;
            return{skey: C, uin: q, qluin: p, qlskey: n, logtype: v, qltn: B, qlattid: s, ckey: u, cuin: z, wuin: w, wkey: x, qqnick: A, _uin: t, _key: m, cpnick: r};
        }, isCPUser: function () {
            var m = d.Cookie.get("cp_nickname") || "";
            return(!d.User.isLogin() || m == "") ? false : true;
        }, isSpNickName: function (r, s) {
            var q = /^~彩/g, p = "CP";
            r = d.getType(r) == "string" ? r : "";
            if (!q.test(r)) {
                return false;
            }
            if (s !== false) {
                for (var n = 0, m = r.length; n < m; n++) {
                    p += r.charCodeAt(n);
                }
                return !d.Cookie.get(p);
            }
            return true;
        }, checkSPNickName: function (m) {
            var q = d.User.info(), n = typeof m.successCallback == "function" ? m.successCallback : function () {
            };
            if (d.User.isCPUser()) {
                if (!d.User.isSpNickName(q[3], false) || m.showModify === false) {
                    try {
                        n.apply(null, m.args || []);
                    } catch (p) {
                    }
                } else {
                    if (d.User.isSpNickName(q[3])) {
                        d.View.modifyNick(m.modifyTips || 1);
                    } else {
                        d.TopWin.CP.Box.text({icon: 3, title: "提示", info: "您修改的昵称尚未生效,请稍后再试。"});
                    }
                }
            }
        }, userInfoCache: function (m) {
            if (d.getType(m) == "object") {
                l = m;
            } else {
                return l;
            }
        }, getUserInfo: function (n) {
            n = n || {};
            var m = "http://caipiao.tenpay.com/lottery/query_user_info.cgi";
            d.Loader.jsonp(m, {vars: typeof n.param == "string" ? n.param : "", preFix: "GET_USERINFO", callBack: function (p) {
                if (typeof n.callback == "function") {
                    n.callback.call(null, p);
                }
            }});
        }, getBalance: function (m, n) {
            d.User.getUserInfo({callback: function (p) {
                var r = parseInt(p.retcode, 10);
                if (r == 0 || r == 2) {
                    var q = d.Amount.fen2Yuan(p.balance || 0) - 0;
                    d.User.balance = q;
                    if (typeof m == "function") {
                        m(q);
                    }
                } else {
                    if (r == 88820001 || r == 88821000) {
                        d.User.logout(false);
                        if (n === true) {
                            d.User.checkLogin({successCallback: function () {
                                if (typeof m == "function") {
                                    m(d.User.balance);
                                }
                            }, para: "balance=1"});
                        } else {
                            d.TopWin.location.reload();
                        }
                    } else {
                        d.Box.text({icon: 3, title: "提示", info: "获取余额失败"});
                    }
                }
            }, param: "balance=1"});
        }, balance: -1, mobile: false};
    }();
    d.Category = function () {
        var p = {ssq: {name: "双色球", format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式", "3": "胆拖"}}, "3d": {name: "福彩3D", format: "code|play|betWay|multi", play: {"1": "直选", "2": "组三", "3": "组六"}, betWay: {"1": "单式", "2": "复式", "3": "包号", "4": "和值"}}, qlc: {name: "七乐彩", format: "code|play|betWay|multi", play: {"1": ""}, betWay: {"1": "单式", "2": "复式", "3": "胆拖"}}, "155": {name: "15选5", format: "code|play|betWay|multi", play: {"1": ""}, betWay: {"1": "单式", "2": "复式", "5": "胆拖"}}, ssc: {name: "新时时彩", format: "code|play|betWay|multi", play: {"1": "一星直选", "2": "二星直选", "3": "三星直选", "4": "四星直选", "5": "五星直选", "6": "二星复选", "7": "三星复选", "8": "四星复选", "9": "五星复选", "10": "二星组选", "11": "大小单双", "12": "五星通选", "13": "任选一", "14": "任选二", "15": "三星组三", "16": "三星组六"}, betWay: {"1": "单式", "2": "复式", "3": "包号", "4": "和值", "5": "胆拖"}}, csc: {name: "老时时彩", format: "code|play|betWay|multi", play: {"1": "一星直选", "2": "二星直选", "3": "三星直选", "4": "四星直选", "5": "五星直选", "6": "二星复选", "7": "三星复选", "8": "四星复选", "9": "五星复选", "10": "二星组选", "11": "大小单双", "12": "五星通选", "13": "任选一", "14": "任选二", "15": "三星组三", "16": "三星组六"}, betWay: {"1": "单式", "2": "复式", "3": "包号", "4": "和值", "5": "胆拖"}}, k3k: {name: "快3", format: "code|play|betWay|multi", play: {"1": "和值", "2": "三同号通选", "3": "三同号单选", "4": "三不同号", "5": "三连号通选", "6": "二同号复选", "7": "二同号单选", "8": "二不同号"}, betWay: {"1": "单式", "2": "复式", "4": "和值", "5": "胆拖"}}, dlt: {name: "大乐透", BC: true, format: "code|betWay|multi|addto", betWay: {"1": "单式", "2": "复式", "3": "胆拖", "4": "生肖乐单式", "5": "生肖乐复式"}}, "115": {name: "十一运夺金", format: "code|betWay|multi", betWay: {"101": "任选一单式", "1012": "任选一复式", "102": "任选二复式", "103": "任选三复式", "104": "任选四复式", "105": "任选五复式", "106": "任选六复式", "107": "任选七复式", "108": "选前二组选复式", "109": "选前三组选复式", "111": "任选二单式", "112": "任选三单式", "113": "任选四单式", "114": "任选五单式", "115": "任选六单式", "116": "任选七单式", "117": "任选八单式", "1172": "任选八复式", "121": "任选二胆拖", "122": "任选三胆拖", "123": "任选四胆拖", "124": "任选五胆拖", "125": "任选六胆拖", "126": "任选七胆拖", "131": "选前二组选单式", "132": "选前二组选和值", "133": "选前二组选胆拖", "134": "选前二组选跨度", "141": "选前二直选单式", "142": "选前二直选定位复式", "143": "选前二直选和值", "144": "选前二直选复式", "145": "选前二直选跨度", "151": "选前三组选单式", "152": "选前三组选和值", "153": "选前三组选胆拖", "154": "选前三组选跨度", "161": "选前三直选单式", "162": "选前三直选定位复式", "163": "选前三直选和值", "164": "选前三直选复式", "165": "选前三直选跨度"}}, qxc: {name: "七星彩", BC: true, format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, pl3: {name: "排列三", BC: true, format: "code|betWay|multi", betWay: {"1": "直选单式", "2": "直选复式", "3": "直选和值", "4": "组三单式", "5": "组三复式", "6": "组三和值", "7": "组六单式", "8": "组六复式", "9": "组六和值"}}, pl5: {name: "排列五", BC: true, format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, "225": {name: "22选5", BC: true, format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, sfc: {name: "胜负彩", format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, rjc: {name: "任选9场", format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, h15: {name: "11选5", format: "code|betWay|multi", betWay: {"101": "任选一单式", "102": "任选二复式", "103": "任选三复式", "104": "任选四复式", "105": "任选五复式", "106": "任选六复式", "107": "任选七复式", "108": "选前二组选复式", "109": "选前三组选复式", "110": "任选一单式", "111": "任选二单式", "112": "任选三单式", "113": "任选四单式", "114": "任选五单式", "115": "任选六单式", "116": "任选七单式", "117": "任选八单式", "121": "任选二胆拖", "122": "任选三胆拖", "123": "任选四胆拖", "124": "任选五胆拖", "125": "任选六胆拖", "126": "任选七胆拖", "131": "选前二组选单式", "132": "选前二组选和值", "133": "选前二组选胆拖", "134": "选前二组选跨度", "141": "选前二直选单式", "142": "选前二直选定位复式", "143": "选前二直选和值", "144": "选前二直选复式", "145": "选前二直选跨度", "151": "选前三组选单式", "152": "选前三组选和值", "153": "选前三组选胆拖", "154": "选前三组选跨度", "161": "选前三直选单式", "162": "选前三直选定位复式", "163": "选前三直选和值", "164": "选前三直选复式", "165": "选前三直选跨度"}}, xync: {name: "快乐十分", format: "code|play|betWay|multi", play: {"1": "选一数投", "2": "选一红投", "3": "选二连组", "4": "选二连直", "5": "任选二", "6": "任选三", "7": "任选四", "8": "任选五", "9": "选三前直", "10": "选三前组"}, betWay: {"1": "单式", "2": "复式"}}, zc4cj: {name: "4场进球", format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, zc6cb: {name: "6场半全", format: "code|betWay|multi", betWay: {"1": "单式", "2": "复式"}}, jcbsk01: {name: "竞彩篮球胜负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk11: {name: "竞彩篮球胜负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk02: {name: "竞彩篮球让分胜负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk12: {name: "竞彩篮球让分胜负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk03: {name: "竞彩篮球胜分差", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk13: {name: "竞彩篮球胜分差", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk04: {name: "竞彩篮球大小分", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcbsk14: {name: "竞彩篮球大小分", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft01: {name: "竞彩足球让球胜平负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft11: {name: "竞彩足球让球胜平负", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft02: {name: "竞彩足球比分", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft12: {name: "竞彩足球比分", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft03: {name: "竞彩足球总进球", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft13: {name: "竞彩足球总进球", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft04: {name: "竞彩足球半全场", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, jcft14: {name: "竞彩足球半全场", format: "gameDay|weekID|teamID|code|codeD$multi$passType"}, bc_gdx: {name: "新11选5", BC: true, format: ""}, bc_dlc: {name: "11选5", BC: true, format: ""}, bc_syy: {name: "十一运夺金", BC: true, format: ""}, bc_gkl: {name: "快乐10分", BC: true, format: ""}, bc_sf: {name: "胜负彩", BC: true, format: ""}, bc_r9: {name: "任选九场", BC: true, format: ""}, bc_jq: {name: "进球彩", BC: true, format: ""}, bc_bq: {name: "6场半全", BC: true, format: ""}, bc_jczq: {name: "竞彩足球", BC: true, format: ""}, bc_jclq: {name: "竞彩篮球", BC: true, format: ""}, bc_bd: {name: "足球单场", BC: true, format: ""}, bc_k3: {name: "老快3", BC: true, format: ""}, bc_jk3: {name: "新快3", BC: true, format: ""}, bc_kl8: {name: "快乐8", BC: true, format: ""}};
        var q = function (B, r) {
            B = B.toLowerCase();
            var A = p[B];
            if (!A) {
                throw new Error("不存在此彩种的配置信息");
            }
            var E = {};
            switch (B) {
                case"jcbsk01":
                case"jcbsk11":
                case"jcbsk02":
                case"jcbsk12":
                case"jcbsk03":
                case"jcbsk13":
                case"jcbsk04":
                case"jcbsk14":
                case"jcft01":
                case"jcft11":
                case"jcft02":
                case"jcft12":
                case"jcft03":
                case"jcft13":
                case"jcft04":
                case"jcft14":
                    var C = A.format.split("$").join("|").split("|"), r = r.split("$"), s = r[0].split("-"), x = r[1], D = r[2].split("|").join(",");
                    for (var v = 0, w = s.length; v < w; v++) {
                        s[v] += "|" + x + "|" + D;
                    }
                    break;
                default:
                    var C = A.format.split("|"), s = r.split("-");
                    break;
            }
            for (var v = 0, w = s.length; v < w; v++) {
                s[v] = s[v].split("|");
                for (var u = 0, t = s[v].length; u < t; u++) {
                    var z = C[u];
                    if (!E[z]) {
                        E[z] = [];
                    }
                    if (typeof A[z] == "object") {
                        E[z].push(A[z][s[v][u]]);
                        if (!E[z + "Flag"]) {
                            E[z + "Flag"] = [];
                        }
                        E[z + "Flag"].push(s[v][u]);
                    } else {
                        E[z].push(s[v][u]);
                    }
                }
            }
            return E;
        };
        var m = function (r, t, s) {
            if (r >= 1000) {
                return"获取中";
            }
            if (r == 3) {
                if (t == 2 || t == 3) {
                    t = 2;
                    if (s == 2) {
                        s = 1;
                    } else {
                        s = 0;
                    }
                } else {
                    s = "";
                }
            } else {
                t = "";
                s = "";
            }
            var u = {"0": "未支付", "1": "支付成功出票中", "2": "支付成功出票中", "30": "出票成功等待开奖", "31": "未中奖", "320": "已中奖派奖中", "321": "已派奖", "4": "购买失败退款中", "5": "购买失败退款中", "6": "购买失败退款中", "7": "出票失败己退款"};
            return u[r + "" + t + "" + s];
        };
        var l = function (r) {
            return(r == 1) ? "进行中" : "已完成";
        };
        var n = function (r, u, t, s, w) {
            if (r >= 1000) {
                if (r != 2001) {
                    return"获取中";
                } else {
                    return"已截止";
                }
            }
            w = (w == 1) ? 1 : 2;
            if ((w == 1 && !isNaN(u) && !isNaN(t) && !isNaN(s)) || (w == 2 && r == 4)) {
                return m(u, t, s);
            }
            var v = (w == 1) ? ["未支付", "已支付", "加入合买中", "加入合买成功", "加入合买失败", "申请撤销合买", "合单撤销成功", "申请退款", "退款成功", "退款失败", "过期撤单", "作废"] : ["未支付", "进行中", "已可投注", "正在投注", "投注完成", "申请退款", "退款成功", "退款失败", "过期撤单", "作废", "用户撤单"];
            return v[r * 1] || "未知";
        };
        return{parse: q, get: function (w, x, u) {
            w = w.toLowerCase();
            var s = q(w, x);
            switch (w) {
                case"3d":
                    var t = p[w];
                    for (var v = 0, r = s.betWayFlag.length; v < r; v++) {
                        if (s.betWayFlag[v] == "3") {
                            s.betWayFlag[v] = "2";
                            s.betWay[v] = t.betWay[2];
                        }
                    }
                    break;
                case"ssc":
                    for (var v = 0, r = s.playFlag.length; v < r; v++) {
                        if (s.playFlag[v] == "11") {
                            s.betWay[v] = "";
                        }
                    }
                    break;
                case"k3k":
                    for (var v = 0, r = s.playFlag.length; v < r; v++) {
                        if (s.playFlag[v] != "4" && s.playFlag[v] != "8") {
                            s.betWay[v] = "";
                        }
                    }
                    break;
                case"115":
                    for (var v = 0, r = s.betWayFlag.length; v < r; v++) {
                        if (s.betWayFlag[v] == "101" && s.code[v].split(",").length > 1) {
                            s.betWayFlag[v] += "2";
                            s.betWay[v] = "任选一复式";
                        }
                        if (s.betWayFlag[v] == "117" && s.code[v].split(",").length > 8) {
                            s.betWayFlag[v] += "2";
                            s.betWay[v] = "任选八复式";
                        }
                    }
                    break;
            }
            return(typeof u == "undefined" ? s : s[u]) || "";
        }, getConf: function (s, r) {
            if (typeof s == "undefined") {
                return p;
            } else {
                s = s.toLowerCase();
                return(typeof r != "undefined" ? p[s] && p[s][r] : p[s]) || "";
            }
        }, setConf: function (r, s) {
            if (d.getType(r) == "object") {
                s = d.getType(s) == "boolean" ? s : true;
                for (var t in r) {
                    if (r.hasOwnProperty(t) && (!p.hasOwnProperty(t) || s)) {
                        p[t] = r[t];
                    }
                }
            }
            return p;
        }, getBetState_DG: m, getBetState_ZH: l, getBetState_HM: n, getBetState: function (t, r) {
            var s = "";
            switch (t) {
                case"dg":
                    s = m.apply(null, r);
                    break;
                case"zh":
                    s = l.apply(null, r);
                    break;
                case"hm":
                    s = n.apply(null, r);
                    break;
            }
            return s;
        }, getTrackState: function (w, v, r, t, s) {
            var u = "";
            if (w == 2 || w == 4 || w == 5 || w == 6) {
                u = (v == 2) ? "已退款" : "退款中";
            } else {
                if (w >= 1000) {
                    u = "获取中";
                } else {
                    if (w == 3) {
                        if (r == 3) {
                            if (t == 0) {
                                u = "已出票";
                            } else {
                                if (t == 2 || t == 3) {
                                    if (s == 2) {
                                        u = "已派奖";
                                    } else {
                                        u = "已中奖派奖中";
                                    }
                                } else {
                                    u = "未中奖";
                                }
                            }
                        } else {
                            if (r == 7) {
                                u = "已退款";
                            } else {
                                if (r == 4 || r == 5 || r == 6) {
                                    u = "退款中";
                                } else {
                                    u = "出票中";
                                }
                            }
                        }
                    } else {
                        u = "未开始";
                    }
                }
            }
            return u;
        }};
    }();
    d.Pay = function () {
        var r = null;
        var v = function (C, B, A, z) {
            d.Box.text({icon: A || -1, title: B || "提示", info: C, name: z});
        };
        var t = function (A, z, B) {
            A = A - 0;
            var C = [];
            C.push('<div class="forms">');
            C.push('<span class="box-ico-notice"><!--ico--></span>');
            C.push('<div class="msg">');
            C.push('<div class="title-str">您的财付通余额不足，本次购彩还差<em>' + A.sub(B) + "</em>元</div>");
            C.push('<div class="tips">当前账户余额为 ' + B + " 元</div>");
            C.push("</div>");
            C.push('<div id="cp_pay_tools_wrapper" class="tools"><span id="lnk_cp_pay_charge" class="box-btn-a"><a href="###">立即充值</a></span><a href="###" class="link" onclick="CP.Box.close();return false;">取消</a></div>');
            C.push("</div>");
            C = C.join("");
            v(C, "提示", -1, "CP_PAY");
            d.Dom.$("lnk_cp_pay_charge").onclick = function () {
                s(z);
                return false;
            };
        };
        var s = function (z) {
            z = z || (r && r.chargeCallBack);
            d.Util.redirectTo("https://www.tenpay.com/v2/account/charge/net_bank.shtml");
            var A = '<span class="box-btn-a"><a id="lnk_cp_pay_chargeconfim" href="###">已经充值，继续投注</a></span><a href="http://caipiao.tenpay.com/v1.0/help_v2/" target="_blank" class="link" data-redirect="true">充值遇到问题？</a>';
            d.Dom.$("cp_pay_tools_wrapper").innerHTML = A;
            d.Dom.$("lnk_cp_pay_chargeconfim").onclick = function () {
                d.Box.close();
                if (typeof z == "function") {
                    z();
                }
                return false;
            };
        };
        var m = function (A) {
            if (d.getType(A) != "object") {
                A = {lotteryType: arguments[0], para: arguments[1]};
            }
            var B = A.scene, z = "?retcode=0&type=" + A.lotteryType + "&" + (A.para || "");
            B && d.Cookie.set("cp_pagetype", B);
            switch (B) {
                case"wallet":
                case"cuifei":
                    d.TopWin.location.href = "https://wallet.tenpay.com/v4.0/caipiao_pay_result.shtml" + z;
                    break;
                case"open":
                default:
                    d.Box.frame({w: 500, h: 200, title: "支付成功", url: "https://wallet.tenpay.com/v4.0/caipiao_pay_result.shtml" + z});
                    break;
            }
        };
        var w = function (A) {
            var B = d.User.info(), C = "";
            C += '<div class="forms">';
            C += '<div class="buy-row">';
            C += '<div class="ltxt">本次投注共计：</div>';
            switch (r.orderType) {
                case 1:
                    var z = (typeof r.betNum != "undefined" || typeof r.multi != "undefined");
                    C += '<div class="rtxt"><em> ' + d.Amount.format(r.money) + " </em>元";
                    C += z ? "(" : "";
                    C += r.betNum ? ("共 " + r.betNum + " 注") : "";
                    C += (typeof r.multi != "undefined") ? "，" : "";
                    C += r.multi ? ("投 " + r.multi + " 倍") : "";
                    C += z ? ")" : "";
                    C += "</div>";
                    break;
                case 2:
                    C += '<div class="rtxt"><em> ' + d.Amount.format(r.money) + " </em>元 ";
                    C += "(共" + (typeof r.HM_strokeCount != "undefined" ? r.HM_strokeCount : "-") + "份，认购" + (typeof r.HM_subscribeStrokeCount != "undefined" ? r.HM_subscribeStrokeCount : "-") + "份，保底" + (typeof r.HM_minimum != "undefined" ? r.HM_minimum : "-") + "份)";
                    C += "</div>";
                    break;
                case 21:
                    C += '<div class="rtxt"><em> ' + d.Amount.format(r.money) + " </em>元 ";
                    C += "(共 " + (typeof r.HM_subscribeStrokeCount != "undefined" ? r.HM_subscribeStrokeCount : "-") + " 份)";
                    C += "</div>";
                    break;
                case 3:
                default:
                    C += '<div class="rtxt"><em> ' + d.Amount.format(r.money) + " </em>元</div>";
                    break;
            }
            C += "</div>";
            if (r.issue && (r.orderType == 1 || r.orderType == 2)) {
                C += '<div class="buy-row">';
                C += '<div class="ltxt">本次投注期次：</div>';
                C += '<div class="rtxt"> 第 ' + r.issue + " 期 [" + d.Category.getConf(r.lotteryType, "name") + "]</div>";
                C += "</div>";
            }
            C += '<div class="buy-row">';
            C += '<div class="ltxt">财付通账户名：</div>';
            C += '<div class="rtxt">' + B[0] + "</div>";
            C += "</div>";
            C += '<div class="buy-row">';
            C += '<div class="ltxt">账户余额：</div>';
            C += '<div class="rtxt">' + A + " 元</div>";
            C += '</div><div class="buy-tool" id="cp_pay_btns">';
            C += '<span class="box-btn-a"><a id="lnk_cp_pay_confirm" href="###">确认投注</a></span>';
            C += '<a href="###" class="link" onclick="CP.Box.close();return false;">返回修改</a><span id="cb_rebate_wrapper"><div class="caibei">&nbsp;</div></span></div>';
            C += '<div class="buy-tool hide" id="cp_pay_loading"><span class="loading">提交中...</span></div>';
            C += '<div class="b-tip">系统将通过短信为您向彩票中心进行投注<a href="http://caipiao.tenpay.com/v1.0/help_v2/" target="_blank" class="link" data-redirect="true">了解更多</a></div>';
            C += "</div>";
            v(C, "提示", -1, "CP_PAY");
            d.Dom.$("lnk_cp_pay_confirm").onclick = u;
            n();
        };
        var l = function (z, C, E) {
            var B = (typeof C == "string") ? ("action=" + C + "&") : "", D = (C === "cuifei") ? "CUIFEI" : d.Scene.v, A = "https://wallet.tenpay.com/v4.0/paycenter_caipiao.shtml?" + B + "url=";
            z = z.replace(/&?pay_scene=\d*/i, "") + "&pay_scene=3";
            z += "&stat_type=1&stat_data=" + D;
            A += encodeURIComponent(z);
            A += (typeof E == "string") ? "&" + E : "";
            return A;
        };
        var q = function (z, B, C) {
            var A = l(z, B, C);
            B && d.Cookie.set("cp_pagetype", B);
            switch (B) {
                case"wallet":
                case"cuifei":
                    d.TopWin.location.href = A;
                    break;
                case"open":
                default:
                    d.Box.frame({w: 580, h: 370, title: "购彩", name: "CP_PAY", url: A});
                    break;
            }
        };
        var n = function () {
            var E = r.money, A = r.orderType, F = r.lotteryType, z = !!d.Category.getConf(F, "BC"), C = ["dlt", "pl3", "pl5", "qxc", "225"];
            if (A === 1) {
                if (!z) {
                    F = F.replace("3d", "3D");
                } else {
                    var D = /^bc_/;
                    if (C.join("|").indexOf(F) == -1 && !D.test(F)) {
                        F = "bc_" + F;
                    }
                }
                var B = "http://caipiao.tenpay.com/lottery/query_caibei_rebate.cgi";
                d.Loader.jsonp(B, {vars: "payAmount=" + E + "&orderType=" + A + "&type=" + F, preFix: "CAIBEI", callBack: function (G) {
                    var I = parseInt(G.retcode, 10), J = G.rebate || 0, L = G.exp || 0, H = d.Dom.$("cb_rebate_wrapper"), K;
                    if (I == 0 && (J > 0 || L > 0) && H) {
                        switch (r.lotteryType) {
                            case"jcbsk01":
                            case"jcbsk02":
                            case"jcbsk03":
                            case"jcbsk04":
                            case"jcbsk11":
                            case"jcbsk12":
                            case"jcbsk13":
                            case"jcbsk14":
                            case"jcft01":
                            case"jcft02":
                            case"jcft03":
                            case"jcft04":
                            case"jcft11":
                            case"jcft12":
                            case"jcft13":
                            case"jcft14":
                            case"zqdc":
                                if (J > 0) {
                                    K = '<div class="btn-tip"><span class="ico-caibei"><!-- icon --></span>开奖后您将获得<em>' + J + "</em>彩贝积分</div>";
                                } else {
                                    if (L > 0) {
                                        K = '<div class="btn-tip"><span class="ico-new-s"><!-- icon --></span>出票成功后您将获得<em>' + L + "</em>经验</div>";
                                    }
                                }
                                break;
                            default:
                                if (J > 0) {
                                    K = '<div class="btn-tip"><span class="ico-caibei"><!-- icon --></span>出票成功后您将获得<em>' + J + "</em>彩贝积分</div>";
                                } else {
                                    if (L > 0) {
                                        K = '<div class="btn-tip"><span class="ico-new-s"><!-- icon --></span>出票成功后您将获得<em>' + L + "</em>经验</div>";
                                    }
                                }
                                break;
                        }
                        H.innerHTML = K || "";
                    }
                }});
            }
        };
        var p = function () {
            var B = r.lotteryType, z = !!d.Category.getConf(B, "BC"), A = z ? "BOCAI" : "TENPAYLOTTERY", C = d.Cookie.get("partnerId");
            C && d.Stat.clickStat("PARTNER.BUY." + A + ".All", "cp");
        };
        var u = function () {
            d.Util.hide("cp_pay_btns").show("cp_pay_loading");
            p();
            if (typeof r.submitHandler == "function") {
                r.submitHandler();
                return;
            }
            d.Ajax.send({url: r.payUrl, vars: r.payPara || "", method: "post", getType: 1, contentType: "application/x-www-form-urlencoded; charset=utf-8", callBack: function (C) {
                d.Util.hide("cp_pay_loading").show("cp_pay_btns");
                var A = JSON.parse(C);
                if (typeof r.payCallBack == "function") {
                    r.payCallBack(A);
                } else {
                    var B = parseInt(A.retcode, 10);
                    switch (B) {
                        case 0:
                            m({lotteryType: r.lotteryType, scene: r.scene});
                            break;
                        case 10:
                            var z = A.redirectURL;
                            q(z, r.scene, r.param);
                            break;
                        case 20:
                            d.User.getBalance(function (D) {
                                t(r.money, null, D);
                            });
                            break;
                        default:
                            v(A.retmsg, null, 4);
                            break;
                    }
                }
            }});
            return false;
        };
        var x = function (z) {
            r = z || {};
            d.User.getBalance(w, true);
        };
        return{init: x, showResult: m, showCharge: function () {
            var z = f.call(arguments);
            d.User.getBalance(function (A) {
                z.push(A);
                t.apply(null, z);
            });
        }, loading: function (z) {
            z ? d.Util.hide("cp_pay_btns").show("cp_pay_loading") : d.Util.hide("cp_pay_loading").show("cp_pay_btns");
        }, redirect: q, getPayUrl: l};
    }();
    d.Tpl = function () {
        var m = {};
        return{render: function l(q, p) {
            var n = !/\W/.test(q) ? m[q] = m[q] || l(h.getElementById(q).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + q.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');");
            return p ? n(p) : n;
        }};
    }();
    d.View = {initCertCtrl: function (l) {
        var m = function () {
            try {
                var p = h.getElementById("cert_wrapper");
                if (p) {
                    return;
                }
                p = h.createElement("div");
                p.id = "cert_wrapper";
                p.style.visibility = "hidden";
                h.getElementsByTagName("body")[0].appendChild(p);
                TFL.cert.Draw("QQCertCtrl", "", "cert_wrapper");
                if (typeof l == "function") {
                    setTimeout(l, 10);
                }
            } catch (n) {
            }
        };
        if (typeof TFL == "undefined" || typeof TFL.cert == "undefined") {
            d.Loader.loadScript("https://img.tenpay.com/v2.0/js/base.js", m, [], false);
        } else {
            m();
        }
    }, installCert: function () {
        d.Box.text({icon: 3, title: "提示", info: "您已启用了数字证书，但本机未安装证书。", btns: [
            ["安装", function () {
                g.open("https://www.tenpay.com/v2/safe/fund_protect.shtml");
            }],
            ["关闭", function () {
                d.Box.close();
            }]
        ]});
    }, showMsg: function (p, n, m, l) {
        d.TopWin.CP.Box.text({icon: (typeof m == "number") ? m : 3, title: n || "提示", info: p || "系统繁忙，请稍后再试", cfn: function () {
            typeof l == "function" && l();
        }});
    }, showTips: function (n) {
        var q = "", p = null, r = +new Date(), l = ["box-ico-ok", "box-ico-err", "box-ico-warn", "box-ico-notice", "box-ico-qna"];
        q += '<div class="box-tip"><span class="' + (0 < n.icon && n.icon <= 5 ? l[o.icon - 1] : l[3]) + '"><!--ico--></span><div class="box-tip-content"><div class="box-tip-title">' + (n.tipsTitle || "") + '</div><div class="box-tip-line">' + (n.tipsInfo || "") + '</div><div class="box-tip-btn" id="box_btns' + r + '"><span class="box-btn-a"><a href="###" onclick="CP.TopWin.CP.Box.close();return false;">确 定</a></span><a class="box-white-btn" href="###" onclick="CP.TopWin.CP.Box.close();return false;"><span>取 消</span></a></div></div>';
        if (d.getType(n.btns) == "array") {
            p = n.btns;
            n.btns = false;
        }
        n.icon = -1;
        n.title = n.title || "提示";
        n.info = q;
        d.Box.text(n);
        if (p) {
            var m = d.Dom.$("box_btns" + r).getElementsByTagName("a");
            m[0].innerHTML = p[0][0];
            m[0].onclick = p[0][1];
            if (p.length == 2) {
                m[1].innerHTML = "<span>" + p[1][0] + "</span>";
                m[1].onclick = p[1][1];
            }
        }
    }, getServerTime: function (q) {
        var p = new Date(), r = d.Dom.$("MOD_CP_SERVER_TIME"), n = /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/, l = r && n.test(r.innerHTML) ? d.Date.format(r.innerHTML) : false;
        var m = function () {
            typeof q == "function" && q.call(null, p);
        };
        if (l !== false) {
            p = l;
            m();
        } else {
            d.Use("serverTime", function () {
                typeof G_SYSTEM_TIME !== "undefined" && (p = new Date(G_SYSTEM_TIME * 1000));
                m();
            });
        }
    }, sliding: function (n) {
        var l = d.getType(n.target) == "string" ? $(n.target) : n.target, r = n.dir || "down", q = Math.abs(n.speed) || 20, w = n.size || d.Size.getObjSize(l), p = {up: {style: "height", flag: [1, -1], easing: "Cubic.easeIn"}, down: {style: "height", flag: [0, 1], easing: "Cubic.easeOut"}, left: {style: "width", flag: [1, -1], easing: "Cubic.easeIn"}, right: {style: "width", flag: [0, 1], easing: "Cubic.easeOut"}};
        if (!p[r] || !l) {
            return;
        }
        var u = p[r]["style"], t = p[r]["flag"], s = p[r]["easing"], m = u == "width" ? w[0] * t[0] : w[1] * t[0], v = u == "width" ? w[0] * t[1] : w[1] * t[1];
        var x = function (z) {
            l.style[u] = z + "px";
        };
        l.style.overflow = "hidden";
        d.Effect.Tween(s, [0, m, v, q], function (z) {
            x(z);
            if (typeof n.slidingFn == "function") {
                n.slidingFn(z);
            }
        }, function (z) {
            x(z);
            if (typeof n.endCallBack == "function") {
                n.endCallBack(z);
            }
        });
        return false;
    }, stopSaleTips: function (l) {
        var r = {}, q = /caipiao.tenpay.com\/v1.0\/buy\/([^\.]+)\.shtml/, s = {springWishes: {stop: "2013-02-01 18:00:00", start: "2013-02-18 00:00:00"}, stopSaleTips: {stop: "2013-02-09 00:00:00", start: "2013-02-16 00:00:00"}};
        var u = function () {
            l = d.getType(l) == "object" ? l : {};
            var v = s[l.timeingType];
            r.stopTimeStr = l.stopTimeStr || (v && v.stop) || "2011-01-01 00:00:00";
            r.startTimeStr = l.startTimeStr || (v && v.start) || "2011-01-01 00:00:00";
            r.serverTime = d.getType(l.serverTime) == "date" ? l.serverTime : false;
            r.showLayer = l.showLayer || false;
            r.targetId = l.targetId !== false ? (l.targetId || "mod_stop_sale_tips") : "";
            r.callBack = typeof l.callBack == "function" ? l.callBack : function () {
            };
        };
        var n = function () {
            var w = "", x = s.stopSaleTips["start"], v = q.test(d.TopWin.location.href) ? RegExp.$1 : "";
            w += '<div class="box-tip spring-box"><span class="box-ico-notice"><!--ico--></span><div class="box-tip-content"><div class="box-tip-title">春节假期各彩种暂停销售，' + p(x).replace("00:00", "") + '开售</div><div class="box-tip-line">忙碌了一年的您，快与家人过个欢乐祥和年吧！</div><div class="box-tip-btn"><span class="box-btn-a"><a href="###" onclick="CP.Storage.setItem(\'spring_stop_sale_' + v + '\', 1);CP.TopWin.CP.Box.close();return false;">确 定</a></span><a href="http://caipiao.tenpay.com/v1.0/inform/news.shtml?id=244" target="_blank" class="link">查看休市公告>></a></div></div>';
            d.Box.text({icon: -1, w: 456, h: 203, title: "彩票休市通知", info: w, cfn: function () {
                d.Storage.setItem("spring_stop_sale_" + v, 1);
                d.TopWin.CP.Box.close();
            }});
        };
        var p = function (x) {
            var v = /^\d{4}-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):\d{2}$/, w = "";
            if (v.test(x)) {
                w += (RegExp.$1 - 0) + "月" + (RegExp.$2 - 0) + "日" + RegExp.$3 + ":" + RegExp.$4;
            }
            return w;
        };
        var m = function () {
            var w = function () {
                var A = r.serverTime, z = d.Date.format(r.stopTimeStr), x = d.Date.format(r.startTimeStr), B = d.Dom.$("mod_stop_sale_time"), D = d.Dom.$(r.targetId);
                if (A.dateDiff(z, "d") >= 0 && A.dateDiff(x, "d") < 0) {
                    r.callBack();
                    if (B && D) {
                        var C = p(r.stopTimeStr) + "-" + p(r.startTimeStr);
                        C !== "-" && (B.innerHTML = C);
                    }
                    D && d.Dom.removeClass("hide", D);
                }
            };
            var v = function () {
                var x = q.test(d.TopWin.location.href) ? RegExp.$1 : "";
                if (r.showLayer && d.Storage.getItem("spring_stop_sale_" + x) != 1) {
                    var B = r.serverTime, A = d.Date.format(s.stopSaleTips["stop"]), z = d.Date.format(s.stopSaleTips["start"]);
                    if (B.dateDiff(A, "d") >= 0 && B.dateDiff(z, "d") < 0) {
                        n();
                    }
                }
            };
            if (r.serverTime !== false) {
                w();
                v();
            } else {
                d.Use("serverTime", function () {
                    if ("undefined" !== typeof G_SYSTEM_TIME) {
                        r.serverTime = new Date(G_SYSTEM_TIME * 1000);
                        w();
                        v();
                    }
                });
            }
        };
        var t = function () {
            s = typeof CPS_G_SPRING_TIMEING !== "undefined" ? CPS_G_SPRING_TIMEING : s;
            u();
            m();
        };
        if (typeof CPS_G_SPRING_TIMEING !== "undefined") {
            t();
        } else {
            d.Loader.loadScript("https://www.tenpay.com/v2/res/pub/cps/lottery/new_year.js?v=" + Math.random(), t, null, null, "utf-8");
        }
    }};
    g.CP = d;
    g.$ = d.Dom.$;
    g.$$ = d.Dom.getElementsByClassName;
})(window, document);