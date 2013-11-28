(function() {
    function v(a) {
        var c = document.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        document.getElementsByTagName("head")[0].appendChild(c)
    }
    function ba(a) {
        function c(a, c) {
            return a << c | a >>> 32 - c
        }
        function f(a) {
            var c = "",
                b, f;
            for (b = 7; 0 <= b; b--) f = a >>> 4 * b & 15, c += f.toString(16);
            return c
        }
        var b, g, d = Array(80),
            j = 1732584193,
            q = 4023233417,
            i = 2562383102,
            k = 271733878,
            m = 3285377520,
            n, l, s, o, p, a = function(a) {
                for (var a = a.replace(/\r\n/g, "\n"), c = "", b = 0; b < a.length; b++) {
                    var f = a.charCodeAt(b);
                    128 > f ? c += String.fromCharCode(f) : (127 < f && 2048 > f ? c += String.fromCharCode(f >> 6 | 192) : (c += String.fromCharCode(f >> 12 | 224), c += String.fromCharCode(f >> 6 & 63 | 128)), c += String.fromCharCode(f & 63 | 128))
                }
                return c
            }(a);
        n = a.length;
        var r = [];
        for (b = 0; b < n - 3; b += 4) g = a.charCodeAt(b) << 24 | a.charCodeAt(b + 1) << 16 | a.charCodeAt(b + 2) << 8 | a.charCodeAt(b + 3), r.push(g);
        switch (n % 4) {
        case 0:
            b = 2147483648;
            break;
        case 1:
            b = a.charCodeAt(n - 1) << 24 | 8388608;
            break;
        case 2:
            b = a.charCodeAt(n - 2) << 24 | a.charCodeAt(n - 1) << 16 | 32768;
            break;
        case 3:
            b = a.charCodeAt(n - 3) << 24 | a.charCodeAt(n - 2) << 16 | a.charCodeAt(n - 1) << 8 | 128
        }
        for (r.push(b); 14 != r.length % 16;) r.push(0);
        r.push(n >>> 29);
        r.push(n << 3 & 4294967295);
        for (a = 0; a < r.length; a += 16) {
            for (b = 0; 16 > b; b++) d[b] = r[a + b];
            for (b = 16; 79 >= b; b++) d[b] = c(d[b - 3] ^ d[b - 8] ^ d[b - 14] ^ d[b - 16], 1);
            g = j;
            n = q;
            l = i;
            s = k;
            o = m;
            for (b = 0; 19 >= b; b++) p = c(g, 5) + (n & l | ~n & s) + o + d[b] + 1518500249 & 4294967295, o = s, s = l, l = c(n, 30), n = g, g = p;
            for (b = 20; 39 >= b; b++) p = c(g, 5) + (n ^ l ^ s) + o + d[b] + 1859775393 & 4294967295, o = s, s = l, l = c(n, 30), n = g, g = p;
            for (b = 40; 59 >= b; b++) p = c(g, 5) + (n & l | n & s | l & s) + o + d[b] + 2400959708 & 4294967295, o = s, s = l, l = c(n, 30), n = g, g = p;
            for (b = 60; 79 >= b; b++) p = c(g, 5) + (n ^ l ^ s) + o + d[b] + 3395469782 & 4294967295, o = s, s = l, l = c(n, 30), n = g, g = p;
            j = j + g & 4294967295;
            q = q + n & 4294967295;
            i = i + l & 4294967295;
            k = k + s & 4294967295;
            m = m + o & 4294967295
        }
        p = f(j) + f(q) + f(i) + f(k) + f(m);
        return p.toLowerCase()
    }
    function H() {
        return d.isAndroid ? d.isAndroid4 ? "adr4" : "adr" : d.isIPHONE ? "iph" : d.isIPAD ? "ipa" : d.isIPOD ? "ipo" : "oth"
    }
    function w(a) {
        return 200 >= a ? "x-player-200" : 300 >= a ? "x-player-200-300" : 660 >= a ? "x-player-300-660" : 800 >= a ? "x-player-660-800" : "x-player"
    }
    DEBUG__ = 0;
    if (0 == DEBUG__ || !window.console) window.console = {}, window.console.log = function() {};
    debug = {
        log: function(a) {
            null != document.getElementById("debug") && (document.getElementById("debug").innerHTML += a + " | ")
        }
    };
    var b = {},
        z = {},
        d = {
            playerType: "",
            uniplayerUrl: "http://passport-log.youku.com/logsys/logstorage/append?project=uniplayer&log=",
            MPIECEURL: "http://passport-log.youku.com/logsys/logstorage/append?project=mpiece&log="
        };
    $$$ = function(a) {
        return document.getElementById(a)
    };
    var r = function(a) {
            var c = [],
                b;
            for (b in a) c.push(b + ":" + a[b]);
            return "{" + c.join(",") + "}"
        },
        l = function(a) {
            var c = [],
                b;
            for (b in a) c.push(b + "=" + a[b]);
            return c.join("&")
        },
        I = function(a) {
            if (!a) return "";
            var a = a.toString(),
                c, b, e, g, d, j;
            e = a.length;
            b = 0;
            for (c = ""; b < e;) {
                g = a.charCodeAt(b++) & 255;
                if (b == e) {
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 2);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 3) << 4);
                    c += "==";
                    break
                }
                d = a.charCodeAt(b++);
                if (b == e) {
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 2);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 3) << 4 | (d & 240) >> 4);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 15) << 2);
                    c += "=";
                    break
                }
                j = a.charCodeAt(b++);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 2);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 3) << 4 | (d & 240) >> 4);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 15) << 2 | (j & 192) >> 6);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(j & 63)
            }
            return c
        },
        A = function() {
            for (var a = {}, c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
                var e = c[b].split("=");
                "undefined" === typeof a[e[0]] ? a[e[0]] = e[1] : "string" === typeof a[e[0]] ? a[e[0]] = [a[e[0]], e[1]] : a[e[0]].push(e[1])
            }
            return a
        }();
    VER = "2013-04-1514:54:55";
    VER = "2013-04-1817:58:04";
    VER = "2013-04-1913:08:30";
    VER = "2013-04-1914:56:47";
    VER = "2013-04-1915:02:06";
    VER = "2013-04-1915:07:08";
    VER = "2013-04-22 9:48:13";
    VER = "2013-04-2210:01:55";
    VER = "2013-04-2210:03:43";
    VER = "2013-04-2210:04:02";
    VER = "2013-04-2210:05:30";
    VER = "2013-04-2210:42:30";
    VER = "2013-04-2210:51:23";
    VER = "2013-04-2210:52:18";
    VER = "2013-04-2213:59:36";
    VER = "2013-04-2213:59:48";
    VER = "2013-04-2214:01:03";
    VER = "2013-04-2214:10:15";
    VER = "2013-04-2214:11:51";
    VER = "2013-04-23 9:34:29";
    VER = "2013-04-23 9:48:02";
    VER = "2013-04-2310:02:12";
    VER = "2013-04-2310:04:14";
    VER = "2013-04-2310:04:41";
    VER = "2013-04-2310:05:36";
    VER = "2013-04-2310:24:33";
    VER = "2013-04-2310:25:12";
    VER = "2013-04-2311:27:04";
    VER = "2013-04-2311:27:52";
    VER = "2013-04-2311:39:10";
    VER = "2013-04-2311:45:16";
    VER = "2013-04-2315:25:35";
    VER = "2013-04-2315:44:03";
    VER = "2013-04-2315:54:15";
    VER = "2013-04-2317:49:00";
    VER = "2013-04-2317:50:35";
    VER = "2013-04-2318:04:08";
    VER = "2013-04-2318:23:04";
    VER = "2013-04-2318:26:26";
    VER = "2013-04-2411:25:30";
    VER = "2013-04-2411:27:27";
    VER = "2013-04-2411:45:21";
    VER = "2013-04-2411:50:41";
    VER = "2013-04-2414:05:22";
    VER = "2013-04-2510:09:39";
    VER = "2013-04-26 9:40:27";
    d.Log = function(a, c) {
        var b = document.createElement("img");
        c && b.addEventListener("error", c, !1);
        b.src = a;
        b.id = "youku-uniplayer-stat"
    };
    d.uniReport = function(a) {
        a.partner = b.initConfig.client_id;
        a.os = escape(d.os);
        a.mios = d.isMobileIOS;
        a.adrd4 = d.isAndroid4;
        a.mobile = d.isMobile;
        a.adrpad = d.isAndroidPad;
        !1 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, "")));
        a.version = VER.replace(/[-: ]/g, "");
        d.Log(d.uniplayerUrl + r(a))
    };
    d.Load = function(a, c) {
        if ("js" == c) {
            var b = document.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.setAttribute("src", a)
        } else "css" == c && (b = document.createElement("link"), b.setAttribute("rel", "stylesheet"), b.setAttribute("type", "text/css"), b.setAttribute("href", a));
        "undefined" != typeof b && document.getElementsByTagName("head")[0].appendChild(b)
    };
    d.showError = function(a, c, b) {
        var e = document.createElement("div");
        e.id = "youku-player-error";
        e.style.position = "relative";
        e.style.color = "white";
        e.style.background = "black";
        e.style.width = "100%";
        e.style.height = "100%";
        var g = document.createElement("div");
        g.id = "youku-player-errorMsg";
        g.innerHTML = "\u60a8\u8fd8\u6ca1\u6709\u5b89\u88c5flash\u64ad\u653e\u5668\uff0c\u8bf7\u4e0b\u8f7d\u5b89\u88c5\u6216\u5728PC\u4e0a\u89c2\u770b";
        c && (g.innerHTML = c, g.style.cssText += "margin-left:-" + b / 2 + "px");
        e.appendChild(g);
        c = $$$(a).childNodes;
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            d.parentNode.removeChild(d)
        }
        c = $$$(a).offsetWidth;
        376 > c && (g.style.cssText += "margin-left:-" + c / 2 + "px");
        $$$(a).appendChild(e)
    };
    (function() {
        var a = document.createElement("video"),
            c = {
                MP4: "video/mp4",
                OGG: "video/ogg",
                WEBM: "video/webm"
            },
            b = {
                isWin: "Win",
                isMac: "Mac",
                isSafari: "Safari",
                isChrome: "Chrome",
                isIPAD: "iPad",
                isIPHONE: "iPhone",
                isIPOD: "iPod",
                isLEPAD: "lepad_hls",
                isMIUI: "MI-ONE",
                isAndroid: "Android",
                isAndroid4: "Android 4.",
                isAndroid41: "Android 4.1",
                isSonyDTV: "SonyDTV",
                isBlackBerry: "BlackBerry",
                isMQQBrowser: "MQQBrowser",
                isMobile: "Mobile"
            };
        d.supportHTML5Video = !1;
        d.isIOS = !1;
        d.os = "";
        if (a.canPlayType) {
            d.supportHTML5Video = !0;
            for (var e in c) d["canPlay" + e] = a.canPlayType(c[e]) ? !0 : !1
        }
        for (var g in b) if (-1 !== navigator.userAgent.indexOf(b[g]) ? (d[g] = !0, d.os += b[g] + " ") : d[g] = !1, -1 !== navigator.userAgent.indexOf("Android")) a = navigator.userAgent.indexOf("Android"), a = navigator.userAgent.substr(a, 10), a > b.isAndroid4 && (d.isAndroid4 = !0, d.os += a + " ");
        d.isMobileIOS = d.isIPAD || d.isIPHONE || d.isIPOD;
        d.isIOS = d.isMobileIOS || d.isMac;
        d.isSupportH5M3U8 = d.isMobileIOS || d.isMac && d.isSafari && !d.isChrome || d.isLEPAD || d.isSonyDTV;
        d.isSupportH5MP4 = (d.isChrome || d.isIE10 || d.isAndroid41 || d.isAndroid4 || d.isMIUI) && d.canPlayMP4;
        g = b = 0;
        try {
            if (document.all) {
                var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                h && (b = 1, VSwf = h.GetVariable("$version"), parseInt(VSwf.split(" ")[1].split(",")[0]))
            } else if (navigator.plugins && 0 < navigator.plugins.length && (h = navigator.plugins["Shockwave Flash"])) for (var b = 1, j = h.description.split(" "), h = 0; h < j.length; ++h) isNaN(parseInt(j[h])) || parseInt(j[h])
        } catch (q) {
            g = b = 1
        }
        d.isSupportFlash = b && !g;
        d.isMQQBrowser && (d.isSupportH5MP4 = !1, d.isSupportFlash = !1);
        d.isPhone = d.isIPHONE || d.isIPOD || d.isAndroid && d.isMobile;
        d.isAndroidPad = d.isAndroid && !d.isMobile;
        d.isPad = d.isIPAD || d.isAndroidPad;
        d.isMobile = d.isIPAD || d.isIPHONE || d.isIPOD || d.isLEPAD || d.isMIUI || d.isAndroid4 || d.isSonyDTV
    })();
    var C = function(a) {
            debug.log("canplay mp4 = " + d.canPlayMP4);
            b.initConfig = a;
            this._vid = a.vid;
            this._target = a.target;
            this._partnerId = a.partnerId;
            a.client_id && (this._partnerId = a.client_id);
            !this._vid || !this._target || !this._partnerId ? alert("[Fail]The params of {vid,target,client_id} are necessary !") : (this._events = a.events, d._target = this._target, this._paid = 0, null != a.paid && (this._paid = a.paid), this._id = a.id, null == this._id && (this._id = "youku-player"), d.playerId = this._id, this._width = a.width, this._height = a.height, this._expand = a.expand, null == a.width || null == a.height ? null == a.expand && (this._expand = 0) : null == a.expand && (this._expand = 1), this._prefer = a.prefer ? a.prefer.toLowerCase() : "flash", this._starttime = a.starttime, this._password = a.password, this._poster = a.poster, this._autoplay = eval(a.autoplay), this._canWide = a.canWide, this._showRelated = a.show_related, this._winType = a.wintype, this._playlistconfig = a.playlistconfig, this._isMobile = d.isMobile, this._isMobileIOS = d.isMobileIOS, this._playerType = "")
        };
    C.prototype = {
        isSupportH5MP4: function() {
            return d.isSupportH5MP4
        },
        isSupportH5M3U8: function() {
            return d.isSupportH5M3U8
        },
        isSupportFlash: function() {
            return d.isSupportFlash
        },
        playerType: function() {
            if ("" != this._playerType) return this._playerType;
            this._playerType = "h5" == this._prefer ? this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : this.isSupportFlash() ? "flash" : "error" : "flash" == this._prefer ? this.isSupportFlash() ? "flash" : this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : "error" : "error";
            window.console && console.log && console.log("playerType = " + this._playerType);
            return this._playerType
        },
        select: function() {
            "h5m3u8" == this.playerType() ? this.selectH5M3U8() : "h5mp4" == this.playerType() ? this.selectH5MP4() : "flash" == this.playerType() ? this.selectFlash() : this.selectDirectUrl();
            if (this._events && this._events.onPlayerReady) {
                var a = this._events.onPlayerReady;
                if ("h5" == d.playerType) var c = setInterval(function() {
                    if ($$$(d.playerId)) {
                        clearInterval(c);
                        try {
                            a()
                        } catch (b) {}
                    }
                }, 500);
                else "flash" == d.playerType && (c = setInterval(function() {
                    if (1 == z.swfLoaded) {
                        clearInterval(c);
                        try {
                            a()
                        } catch (b) {}
                    }
                }, 500))
            }
        },
        selectH5MP4: function() {
            d.uniReport({
                mp4: 1
            });
            d.playerType = "h5";
            var a = this._h5player = new YoukuHTML5Player({
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: "mp4",
                wintype: this._winType,
                expand: this._expand,
                canWide: this._canWide ? this._canWide : 0
            });
            d.GetMP4OK = function(c, b) {
                a.startPlay(c, b)
            };
            i.playlistconfig = this._playlistconfig;
            i.start(this._vid, this._password, "mp4")
        },
        selectH5M3U8: function() {
            d.uniReport({
                m3u8: 1
            });
            d.playerType = "h5";
            var a = {
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: "m3u8",
                wintype: this._winType,
                expand: this._expand,
                canWide: this._canWide ? this._canWide : 0
            };
            if (d.isIPHONE || d.isIPOD) a.playType = "directsrc";
            var c = new YoukuHTML5Player(a);
            this._h5player = c;
            d.GetM3U8OK = function(a, b) {
                console.log("videoinfo src = " + b.src);
                c.startPlay(a, b)
            };
            i.playlistconfig = this._playlistconfig;
            i.start(this._vid, this._password, "m3u8")
        },
        selectH5VTag: function() {
            d.playerType = "h5";
            var a = "http://v.youku.com/player/getM3U8/vid/" + this._vid + "/type/mp4/ts/" + parseInt((new Date).getTime() / 1E3),
                a = a + (this._password ? "/password/" + this._password : ""),
                a = '<video src="' + (a + "/v.m3u8") + '" controls width=' + this._width + " height=" + this._height + " id=" + this._id + " autohide=false " + (this._poster ? "poster=" + this._poster : "") + " " + (!0 == this._autoplay ? "autoplay=true" : "") + "></video>";
            $$$(this._target).innerHTML = a
        },
        selectFlash: function() {
            d.uniReport({
                flash: 1
            });
            d.playerType = "flash";
            var a = {
                imglogo: this._poster || "",
                paid: this._paid,
                partnerId: b.initConfig.client_id
            };
            null != b.initConfig.firsttime && (a.firsttime = b.initConfig.firsttime);
            null != this._autoplay && (a.isAutoPlay = this._autoplay);
            null != this._showRelated && (a.isShowRelatedVideo = this._showRelated);
            for (var c in b.initConfig.adconfig) a[c] = b.initConfig.adconfig[c];
            for (c in b.initConfig.flashconfig) a[c] = b.initConfig.flashconfig[c];
            c = "";
            null != this._partnerId && 16 == (this._partnerId + "").length && (c = "/partnerid/" + this._partnerId);
            a.delayload && (c = "");
            var f = "";
            null != this._winType && "" != this._winType && (f = "/winType/" + this._winType);
            c = "http://player.youku.com/player.php/sid/" + this._vid + c + f + "/v.swf";
            b.initConfig.flashsrc && (c = b.initConfig.flashsrc);
            a = l(a);
            $$$(this._target).innerHTML = "<object type=application/x-shockwave-flash data= " + c + " width=100% height=100% id=" + this._id + "><param name=allowFullScreen value=true><param name=allowScriptAccess value=always><param name=movie value=" + c + "><param name=flashvars value=" + a + ">" + (b.initConfig.flashext || "") + "</object>";
            this._expand && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px")
        },
        selectDirectUrl: function() {
            debug.log("select directsrc");
            d.uniReport({
                direct: 1
            });
            d.playerType = "directsrc";
            var a = new DirectPlayer({
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: "mp4",
                playType: "directsrc",
                wintype: this._winType,
                expand: this._expand,
                canWide: this._canWide ? this._canWide : 0
            });
            this._h5player = a;
            i.playlistconfig = this._playlistconfig;
            i.start(this._vid, this._password, "mp4", function(c, b) {
                a.startPlay(c, b)
            })
        },
        selectError_: function(a, c) {
            d.uniReport({
                error: 1
            });
            if (this._width || this._height) $$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px";
            d.playerType = "error";
            d.showError(this._target, a, c)
        }
    };
    z.Player = function(a, c) {
        c.target = a;
        var b = new C(c);
        b.select();
        this._player = "";
        b._h5player && (this._h5player = b._h5player)
    };
    z.Player.prototype = {
        player: function() {
            return "" != this._player ? this._player : this._player = "h5" == d.playerType ? new J(this._h5player) : "flash" == d.playerType ? new K : "error"
        },
        resize: function(a, c) {
            this.player().resize(a, c)
        },
        currentTime: function() {
            return this.player().currentTime()
        },
        totalTime: function() {
            return this.player().totalTime()
        },
        playVideo: function() {
            this.player().playVideo()
        },
        pauseVideo: function() {
            this.player().pauseVideo()
        },
        seekTo: function(a) {
            this.player().seekTo(a)
        },
        hideControls: function() {
            this.player().hideControls()
        },
        showControls: function() {
            this.player().showControls()
        },
        playVideoById: function(a) {
            this.player().playVideoById(a)
        },
        switchFullScreen: function() {
            try {
                this.player().switchFullScreen()
            } catch (a) {}
        }
    };
    var K = function() {
            this._player = document.getElementById(d.playerId)
        };
    K.prototype = {
        resize: function(a, c) {
            this._player.style.width = a + "px";
            this._player.style.height = c + "px"
        },
        currentTime: function() {
            var a = this._player.getPlayerState().split("|");
            return 3 <= a.length ? a[2] : -1
        },
        totalTime: function() {
            var a = this._player.getPlayerState().split("|");
            return 4 <= a.length ? a[3] : -1
        },
        playVideo: function() {
            this._player.pauseVideo(!1)
        },
        pauseVideo: function() {
            this._player.pauseVideo(!0)
        },
        seekTo: function(a) {
            this._player.nsseek(a)
        },
        playVideoById: function(a) {
            this._player.playVideoByID(a)
        },
        hideControls: function() {
            this._player.showControlBar(!1)
        },
        showControls: function() {
            this._player.showControlBar(!0)
        }
    };
    var i = {},
        x = {},
        B = [];
    i.mp4srcs = [];
    i.start = function(a, c, b, e) {
        this._callback = e;
        if (null == this._callback) switch (this._type) {
        case "m3u8":
            this._callback = d.GetM3U8OK;
            break;
        case "mp4":
            this._callback = d.GetMP4OK;
            break;
        default:
            this._callback = d.GetM3U8OK
        }
        null != x[a] && null != x[a][b] ? (console.log("Cache Hit vid = " + a), this._callback(x[a][b].v, x[a][b].videoInfo)) : (this._vid = a, this._password = c, this._type = b, this._videoInfo = null, this._url = "", this.mp4srcs = [], this.request())
    };
    i.cache = function() {
        x[i._vid] = {};
        x[i._vid][i._type] = {
            v: this._v,
            videoInfo: this._videoInfo
        }
    };
    i.getPlayListUrl = function() {
        var a = "http://v.youku.com/player/getPlaylist/VideoIDS/" + this._vid,
            a = a + "/Pf/4",
            c;
        for (c in this.playlistconfig) a += "/" + c + "/" + this.playlistconfig[c];
        return a += this._password ? "/password/" + this._password : ""
    };
    i.error = function(a) {
        a || (a = 0);
        d.uniReport({
            error: a,
            vid: b.initConfig.vid
        });
        d.showError(b.config.parentBox, "\u8be5\u89c6\u9891\u6682\u65f6\u4e0d\u80fd\u64ad\u653e,\u8bf7\u4e0b\u8f7dAPP\u6216\u5728PC\u4e0a\u89c2\u770b", 320)
    };
    i.reportPlayListUep = function() {
        var a = (new Date).getTime() - this._plreqStartTime;
        B.push({
            type: 8,
            time: a
        })
    };
    i.response = function(a) {
        this.reportPlayListUep();
        (b.v = a) && a.data && a.data[0] && !0 !== a.data[0].rtmp ? this.init(a) : this.error(1, a, a.data, a.data[0])
    };
    i.request = function() {
        this._url = this.getPlayListUrl();
        this._url += "?__callback=BuildVideoInfo.response";
        this._plreqStartTime = (new Date).getTime();
        v(this._url)
    };
    i.m3u8src = function(a) {
        a = "http://v.youku.com/player/getM3U8/vid/" + this._vid + "/type/" + a + "/ts/" + parseInt((new Date).getTime() / 1E3);
        if (d.isIPHONE || d.isIPOD) a += "/useKeyFrame/0";
        a += this._password ? "/password/" + this._password : "";
        return a + "/v.m3u8"
    };
    i.total = function(a) {
        for (var c in a.segs) {
            for (var b = 0, e = 0, g = 0; g < a.segs[c].length; g++) var d = a.segs[c][g],
                b = b + parseInt(d.seconds),
                e = e + parseInt(d.size);
            return {
                totalTime: b,
                totalBytes: e
            }
        }
    };
    i.cleanSrc = function() {
        for (var a = [], c = i.mp4srcs, b = 0; b < i.mp4srcs.length; b++) {
            for (var e = 0; e < i.mp4srcs.length; e++) {
                var g = c[e].split("/")[5].substr(8, 2),
                    g = parseInt(g, 16);
                if (g == b) break
            }
            a.push(c[e])
        }
        i.mp4srcs = a;
        a = this._videoInfo._videoSegsDic[k];
        for (b = 0; b < a.length; b++) a[b].fyksrc = a[b].src, a[b].src = i.mp4srcs[b]
    };
    i.processError = function(a) {
        debug.log("playlist errorcode = " + a.error_code);
        null == this._callback ? "m3u8" == this._type ? d.GetM3U8OK(this._v, {}) : d.GetMP4OK(this._v, {}) : this._callback(this._v, {})
    };
    i.init = function(a) {
        this._v = a;
        a = a.data[0];
        if (null != a.error_code) this.processError(a);
        else {
            var c = i.total(a);
            this._videoInfo = new L(a, this._type);
            this._videoInfo.totalTime = c.totalTime;
            if ("m3u8" == this._type) b.defaultVideoType = "mp4", d.isIPHONE && (b.defaultVideoType = "flv"), null != m.getItem("defaultVideoType") && (b.defaultVideoType = m.getItem("defaultVideoType")), -1 == a.streamtypes.indexOf(b.defaultVideoType) && (b.defaultVideoType = "mp4", -1 == a.streamtypes.indexOf("mp4") && (b.defaultVideoType = "flv")), debug.log("default = " + b.defaultVideoType), this._videoInfo.src = i.m3u8src(b.defaultVideoType), this.cache(), null == this._callback ? d.GetM3U8OK(this._v, this._videoInfo) : this._callback(this._v, this._videoInfo);
            else if ("mp4" == this._type) {
                c = ["3gphd", "mp4", "flv"];
                k = null;
                for (var f = 0; f < c.length; f++) if (this._videoInfo._videoSegsDic[c[f]] && !("3gphd" == c[f] && 7200 < parseInt(a.seconds))) {
                    k = c[f];
                    break
                }
                debug.log("mp4 type=" + k);
                k ? ("flv" == k && (b.config.playType = "directsrc"), this.fetchDirectSrc(this._videoInfo._videoSegsDic[k]), this._tid = setInterval("checkSrc()", 500)) : this.error(2)
            }
        }
    };
    i.getFileUrl = function(a) {
        var c = [];
        if (a) for (var b = 0; b < a.length; b++) c.push(a[b].src);
        return c
    };
    i.fetchDirectSrc = function(a) {
        this._fyks = urls = this.getFileUrl(a);
        if (this._v && this._v.data[0].trial) {
            for (var a = 0, c = this._v.data[0].segs, a = 0; a < c.mp4.length && -1 !== c.mp4[a].k; a++);
            urls.length = a
        }
        for (a = 0; a < urls.length; a++) v(urls[a] + "&callback=DirectSrcOK")
    };
    DirectSrcOK = function(a) {
        null == a || ("object" != typeof a || 0 == a.length) || i.mp4srcs.push(a[0].server)
    };
    var L = function(a, c) {
            var b = new Date;
            this._sid = b.getTime() + "" + (1E3 + b.getMilliseconds()) + "" + (parseInt(9E3 * Math.random()) + 1E3);
            this._seed = a.seed;
            this._fileType = c;
            b = new M(this._seed);
            this._streamFileIds = a.streamfileids;
            this._videoSegsDic = {};
            for (c in a.segs) {
                for (var e = [], g = 0, d = 0; d < a.segs[c].length; d++) {
                    var j = a.segs[c][d],
                        q = {};
                    q.no = j.no;
                    q.size = j.size;
                    q.seconds = j.seconds;
                    j.k && (q.key = j.k);
                    q.fileId = this.getFileId(a.streamfileids, c, parseInt(d), b);
                    q.type = c;
                    q.src = this.getVideoSrc(j.no, a, c, q.fileId);
                    e[g++] = q
                }
                this._videoSegsDic[c] = e
            }
        },
        M = function(a) {
            this._randomSeed = a;
            this.cg_hun()
        };
    M.prototype = {
        cg_hun: function() {
            this._cgStr = "";
            for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", c = a.length, b = 0; b < c; b++) {
                var e = parseInt(this.ran() * a.length);
                this._cgStr += a.charAt(e);
                a = a.split(a.charAt(e)).join("")
            }
        },
        cg_fun: function(a) {
            for (var a = a.split("*"), c = "", b = 0; b < a.length - 1; b++) c += this._cgStr.charAt(a[b]);
            return c
        },
        ran: function() {
            this._randomSeed = (211 * this._randomSeed + 30031) % 65536;
            return this._randomSeed / 65536
        }
    };
    L.prototype = {
        getFileId: function(a, c, b, e) {
            for (var g in a) if (g == c) {
                streamFid = a[g];
                break
            }
            if ("" == streamFid) return "";
            c = e.cg_fun(streamFid);
            a = c.slice(0, 8);
            b = b.toString(16);
            1 == b.length && (b = "0" + b);
            b = b.toUpperCase();
            c = c.slice(10, c.length);
            return a + b + c
        },
        getVideoSrc: function(a, c, b, e, g, d) {
            if (!c.videoid || !b) return "";
            var j = this._sid,
                q = {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    "3gphd": 1,
                    "3gp": 0
                }[b],
                i = {
                    flv: "flv",
                    mp4: "mp4",
                    hd2: "flv",
                    "3gphd": "mp4",
                    "3gp": "flv"
                }[b],
                k = a.toString(16);
            1 == k.length && (k = "0" + k);
            var l = c.segs[b][a].seconds,
                a = c.segs[b][a].k;
            if ("" == a || -1 == a) a = c.key2 + c.key1;
            b = "";
            c.show && (b = c.show.show_paid ? "&ypremium=1" : "&ymovie=1");
            return "http://f.youku.com" + ("/player/getFlvPath/sid/" + j + "_" + k + "/st/" + i + "/fileid/" + e + "?K=" + a + "&hd=" + q + "&myp=0&ts=" + l + "&ypp=0" + b + ((g ? "/password/" + g : "") + (d ? d : "")))
        }
    };
    var J = function(a) {
            this._player = document.getElementById("youku-html5player-video");
            null == this._player && (this._player = document.getElementById("youku-html5player-video-0"));
            this._oplayer = a
        };
    J.prototype = {
        resize: function(a, c) {
            this._oplayer.resize(a, c)
        },
        currentTime: function() {
            return this._player.currentTime
        },
        totalTime: function() {
            return this._player.duration
        },
        playVideo: function() {
            this._player.play()
        },
        pauseVideo: function() {
            this._player.pause()
        },
        seekTo: function(a) {
            try {
                this._player.currentTime = a
            } catch (c) {}
        },
        playVideoById: function(a, c) {
            debug.log("YKH5Player playVideoByid");
            var f = this._oplayer;
            b.config.autoplay = !0;
            b.config.vid = a;
            i.start(a, c, b.config.content, function(a, c) {
                f.startPlay(a, c)
            })
        },
        hideControls: function() {
            this._player.removeAttribute("controls")
        },
        showControls: function() {
            this._player.setAttribute("controls", !0)
        },
        switchFullScreen: function() {
            this._oplayer.controls.fullscreenPanel.switchFullScreen({})
        }
    };
    (function() {
        this.FX = function(c, b, f, d, q, i) {
            this.el = a.get(c);
            this.attributes = b;
            this.duration = f || 0.7;
            this.transition = d && d in FX.transitions ? d : "easeInOut";
            this.callback = q ||
            function() {};
            this.ctx = i || window;
            this.units = {};
            this.frame = {};
            this.endAttr = {};
            this.startAttr = {}
        };
        this.FX.transitions = {
            linear: function(a, c, b, f) {
                return b * a / f + c
            },
            easeIn: function(a, c, b, f) {
                return -b * Math.cos(a / f * (Math.PI / 2)) + b + c
            },
            easeOut: function(a, c, b, f) {
                return b * Math.sin(a / f * (Math.PI / 2)) + c
            },
            easeInOut: function(a, c, b, f) {
                return -b / 2 * (Math.cos(Math.PI * a / f) - 1) + c
            }
        };
        this.FX.prototype = {
            start: function() {
                var a = this;
                this.getAttributes();
                this.duration *= 1E3;
                this.time = (new Date).getTime();
                this.animating = !0;
                this.timer = setInterval(function() {
                    var c = (new Date).getTime();
                    c < a.time + a.duration ? (a.elapsed = c - a.time, a.setCurrentFrame()) : (a.frame = a.endAttr, a.complete());
                    a.setAttributes()
                }, 10)
            },
            ease: function(a, c) {
                return FX.transitions[this.transition](this.elapsed, a, c - a, this.duration)
            },
            complete: function() {
                clearInterval(this.timer);
                this.timer = null;
                this.animating = !1;
                this.callback.call(this.ctx)
            },
            setCurrentFrame: function() {
                for (attr in this.startAttr) if (this.startAttr[attr] instanceof Array) {
                    this.frame[attr] = [];
                    for (var a = 0; a < this.startAttr[attr].length; a++) this.frame[attr][a] = this.ease(this.startAttr[attr][a], this.endAttr[attr][a])
                } else this.frame[attr] = this.ease(this.startAttr[attr], this.endAttr[attr])
            },
            getAttributes: function() {
                for (var c in this.attributes) switch (c) {
                case "color":
                case "borderColor":
                case "border-color":
                case "backgroundColor":
                case "background-color":
                    this.startAttr[c] = b(this.attributes[c].from || a.getStyle(this.el, c));
                    this.endAttr[c] = b(this.attributes[c].to);
                    break;
                case "scrollTop":
                case "scrollLeft":
                    var d = this.el == document.body ? document.documentElement || document.body : this.el;
                    this.startAttr[c] = this.attributes[c].from || d[c];
                    this.endAttr[c] = this.attributes[c].to;
                    break;
                default:
                    var h = this.attributes[c].to,
                        j = this.attributes[c].units || "px";
                    this.attributes[c].from ? d = this.attributes[c].from : (d = parseFloat(a.getStyle(this.el, c)) || 0, "px" != j && document.defaultView && (a.setStyle(this.el, c, (h || 1) + j), d *= (h || 1) / parseFloat(a.getStyle(this.el, c)), a.setStyle(this.el, c, d + j)));
                    this.units[c] = j;
                    this.endAttr[c] = h;
                    this.startAttr[c] = d
                }
            },
            setAttributes: function() {
                for (var c in this.frame) switch (c) {
                case "opacity":
                    a.setStyle(this.el, c, this.frame[c]);
                    break;
                case "scrollLeft":
                case "scrollTop":
                    (this.el == document.body ? document.documentElement || document.body : this.el)[c] = this.frame[c];
                    break;
                case "color":
                case "borderColor":
                case "border-color":
                case "backgroundColor":
                case "background-color":
                    a.setStyle(this.el, c, "rgb(" + Math.floor(this.frame[c][0]) + "," + Math.floor(this.frame[c][1]) + "," + Math.floor(this.frame[c][2]) + ")");
                    break;
                default:
                    a.setStyle(this.el, c, this.frame[c] + this.units[c])
                }
            }
        };
        var a = {
            get: function(a) {
                return "string" == typeof a ? document.getElementById(a) : a
            },
            getStyle: function(a, b) {
                var b = c(b),
                    f = document.defaultView;
                return f && f.getComputedStyle ? f.getComputedStyle(a, "")[b] || null : "opacity" == b ? (f = a.filters("alpha").opacity, isNaN(f) ? 1 : f ? f / 100 : 0) : a.currentStyle[b] || null
            },
            setStyle: function(a, b, f) {
                "opacity" == b ? (a.style.filter = "alpha(opacity=" + 100 * f + ")", a.style.opacity = f) : (b = c(b), a.style[b] = f)
            }
        },
            c = function() {
                var a = {};
                return function(c) {
                    if (a[c]) return a[c];
                    var b = c.split("-"),
                        f = b[0];
                    if (1 < b.length) for (var d = 1, i = b.length; d < i; d++) f += b[d].charAt(0).toUpperCase() + b[d].substring(1);
                    return a[c] = f
                }
            }(),
            b = function() {
                var a = /^#?(\w{2})(\w{2})(\w{2})$/,
                    c = /^#?(\w{1})(\w{1})(\w{1})$/,
                    b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
                return function(f) {
                    var d = f.match(a);
                    if (d && 4 == d.length) return [parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)];
                    if ((d = f.match(b)) && 4 == d.length) return [parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)];
                    if ((d = f.match(c)) && 4 == d.length) return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)]
                }
            }()
    })();
    FX.transitions.quadIn = function(a, c, b, e) {
        return b * (a /= e) * a + c
    };
    FX.transitions.quadOut = function(a, c, b, e) {
        return -b * (a /= e) * (a - 2) + c
    };
    FX.transitions.quadInOut = function(a, c, b, e) {
        return 1 > (a /= e / 2) ? b / 2 * a * a + c : -b / 2 * (--a * (a - 2) - 1) + c
    };
    FX.transitions.cubicIn = function(a, c, b, e) {
        return b * (a /= e) * a * a + c
    };
    FX.transitions.cubicOut = function(a, c, b, e) {
        return b * ((a = a / e - 1) * a * a + 1) + c
    };
    FX.transitions.cubicInOut = function(a, c, b, e) {
        return 1 > (a /= e / 2) ? b / 2 * a * a * a + c : b / 2 * ((a -= 2) * a * a + 2) + c
    };
    FX.transitions.quartIn = function(a, c, b, e) {
        return b * (a /= e) * a * a * a + c
    };
    FX.transitions.quartOut = function(a, c, b, e) {
        return -b * ((a = a / e - 1) * a * a * a - 1) + c
    };
    FX.transitions.quartInOut = function(a, c, b, e) {
        return 1 > (a /= e / 2) ? b / 2 * a * a * a * a + c : -b / 2 * ((a -= 2) * a * a * a - 2) + c
    };
    FX.transitions.quintIn = function(a, c, b, e) {
        return b * (a /= e) * a * a * a * a + c
    };
    FX.transitions.quintOut = function(a, c, b, e) {
        return b * ((a = a / e - 1) * a * a * a * a + 1) + c
    };
    FX.transitions.quintInOut = function(a, c, b, e) {
        return 1 > (a /= e / 2) ? b / 2 * a * a * a * a * a + c : b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    };
    FX.transitions.expoIn = function(a, c, b, e) {
        return 0 == a ? c : b * Math.pow(2, 10 * (a / e - 1)) + c - 0.001 * b
    };
    FX.transitions.expoOut = function(a, c, b, e) {
        return a == e ? c + b : 1.001 * b * (-Math.pow(2, -10 * a / e) + 1) + c
    };
    FX.transitions.expoInOut = function(a, c, b, e) {
        return 0 == a ? c : a == e ? c + b : 1 > (a /= e / 2) ? b / 2 * Math.pow(2, 10 * (a - 1)) + c - 5.0E-4 * b : 1.0005 * (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c
    };
    FX.transitions.circIn = function(a, c, b, e) {
        return -b * (Math.sqrt(1 - (a /= e) * a) - 1) + c
    };
    FX.transitions.circOut = function(a, c, b, e) {
        return b * Math.sqrt(1 - (a = a / e - 1) * a) + c
    };
    FX.transitions.circInOut = function(a, c, b, e) {
        return 1 > (a /= e / 2) ? -b / 2 * (Math.sqrt(1 - a * a) - 1) + c : b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
    };
    FX.transitions.backIn = function(a, c, b, e, d) {
        d = d || 1.70158;
        return b * (a /= e) * a * ((d + 1) * a - d) + c
    };
    FX.transitions.backOut = function(a, c, b, e, d) {
        d = d || 1.70158;
        return b * ((a = a / e - 1) * a * ((d + 1) * a + d) + 1) + c
    };
    FX.transitions.backBoth = function(a, c, b, e, d) {
        d = d || 1.70158;
        return 1 > (a /= e / 2) ? b / 2 * a * a * (((d *= 1.525) + 1) * a - d) + c : b / 2 * ((a -= 2) * a * (((d *= 1.525) + 1) * a + d) + 2) + c
    };
    FX.transitions.elasticIn = function(a, c, b, e, d, h) {
        if (0 == a) return c;
        if (1 == (a /= e)) return c + b;
        h || (h = 0.3 * e);
        !d || d < Math.abs(b) ? (d = b, b = h / 4) : b = h / (2 * Math.PI) * Math.asin(b / d);
        return -(d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - b) * 2 * Math.PI / h)) + c
    };
    FX.transitions.elasticOut = function(a, c, b, e, d, h) {
        if (0 == a) return c;
        if (1 == (a /= e)) return c + b;
        h || (h = 0.3 * e);
        if (!d || d < Math.abs(b)) var d = b,
            j = h / 4;
        else j = h / (2 * Math.PI) * Math.asin(b / d);
        return d * Math.pow(2, -10 * a) * Math.sin((a * e - j) * 2 * Math.PI / h) + b + c
    };
    FX.transitions.elasticBoth = function(a, c, b, e, d, h) {
        if (0 == a) return c;
        if (2 == (a /= e / 2)) return c + b;
        h || (h = e * 0.3 * 1.5);
        if (!d || d < Math.abs(b)) var d = b,
            j = h / 4;
        else j = h / (2 * Math.PI) * Math.asin(b / d);
        return 1 > a ? -0.5 * d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - j) * 2 * Math.PI / h) + c : 0.5 * d * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * e - j) * 2 * Math.PI / h) + b + c
    };
    FX.transitions.backIn = function(a, c, b, e, d) {
        "undefined" == typeof d && (d = 1.70158);
        return b * (a /= e) * a * ((d + 1) * a - d) + c
    };
    FX.transitions.backOut = function(a, c, b, e, d) {
        "undefined" == typeof d && (d = 1.70158);
        return b * ((a = a / e - 1) * a * ((d + 1) * a + d) + 1) + c
    };
    FX.transitions.backBoth = function(a, c, b, e, d) {
        "undefined" == typeof d && (d = 1.70158);
        return 1 > (a /= e / 2) ? b / 2 * a * a * (((d *= 1.525) + 1) * a - d) + c : b / 2 * ((a -= 2) * a * (((d *= 1.525) + 1) * a + d) + 2) + c
    };
    FX.transitions.bounceIn = function(a, c, b, e) {
        return b - FX.transitions.bounceOut(e - a, 0, b, e) + c
    };
    FX.transitions.bounceOut = function(a, c, b, e) {
        return (a /= e) < 1 / 2.75 ? b * 7.5625 * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c : a < 2.5 / 2.75 ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c
    };
    FX.transitions.bounceBoth = function(a, c, b, e) {
        return a < e / 2 ? 0.5 * FX.transitions.bounceIn(2 * a, 0, b, e) + c : 0.5 * FX.transitions.bounceOut(2 * a - e, 0, b, e) + 0.5 * b + c
    };
    var t = {
        "-1": "\u8be5\u89c6\u9891\u6b63\u5728\u8f6c\u7801\u4e2d... , \u8bf7\u7a0d\u5019",
        "-2": "\u8be5\u89c6\u9891\u6b63\u5728\u5ba1\u6838\u4e2d... , \u8bf7\u7a0d\u5019",
        "-3": "\u8be5\u89c6\u9891\u5df2\u88ab\u5c4f\u853d",
        "-4": "\u8be5\u89c6\u9891\u8f6c\u7801\u5931\u8d25",
        "-9": "\u65e0\u6548\u89c6\u9891",
        "-5": "\u8be5\u89c6\u9891\u88ab\u8bbe\u4e3a\u79c1\u5bc6",
        "-6": "\u8be5\u89c6\u9891\u5df2\u7ecf\u52a0\u5bc6",
        "-7": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8f93\u5165\u7684\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
        "-8": "Sorry,this video can only be streamed within Mainland China.",
        "-15": "\u5f88\u62b1\u6b49! \u8be5\u89c6\u9891\u7684\u683c\u5f0f\u6682\u65f6\u4e0d\u652f\u6301\u5728ipad\u5e73\u53f0\u4e0a\u64ad\u653e",
        "-25": "\u60a8\u7684\u8d26\u53f7\u89c2\u770b\u8fc7\u4e8e\u9891\u7e41\uff0c\u8d85\u8fc7IP\u4e0a\u9650,\u5982\u8d26\u53f7\u88ab\u76d7\uff0c\u8bf7\u53ca\u65f6\u8054\u7cfb\u5ba2\u670d"
    },
        D = function(a, c) {
            this.player = a;
            this._handle = {};
            this._feedback = b.get(".x-feedback");
            this._message = this._feedback.getElementsByClassName("x-message")[0];
            this._messagetxt = this._message.getElementsByClassName("x-message-txt")[0];
            this._messagebtn = this._message.getElementsByClassName("x-message-btn")[0];
            this._errorcode = this._error = null;
            this.init(c);
            this.bindEvent()
        };
    D.prototype = {
        init: function(a) {
            if (a && a.data && a.data[0] && (a.data[0].error_code || a.data[0].error)) {
                b.hide(b.get(".x-video-button"));
                b.hide(b.get(".x-dashboard"));
                this._vid = a.data[0].videoid;
                this._title = a.data[0].title;
                this._userid = a.data[0].userid;
                this._error = a.data[0].error;
                this._errorcode = parseInt(a.data[0].error_code);
                switch (this._errorcode) {
                case -1:
                    this.setMessage(t["-1"]);
                    break;
                case -2:
                    this.setMessage(t["-2"]);
                    break;
                case -3:
                    this.setMessage(t["-3"]);
                    this.setButton("\u641c\u7d22", this.search);
                    break;
                case -4:
                    this.setMessage(t["-4"]);
                    this.bind_feedback = b.bindAsEventListener(this, this.feedback);
                    this.setButton("\u5728\u7ebf\u53cd\u9988", this.bind_feedback);
                    break;
                case -9:
                    this.setMessage(t["-9"]);
                    break;
                case -5:
                    this.setMessage(t["-5"]);
                    this.bind_contact = b.bindAsEventListener(this, this.contactOwner);
                    this.setButton("\u8054\u7cfb\u4e0a\u4f20\u8005", this.bind_contact);
                    break;
                case -6:
                    this._messagetxt.innerHTML = "<input type=password placeholder=\u8f93\u5165\u5bc6\u7801\u89c2\u770b\u89c6\u9891 class=x-message-input>";
                    this.bind_inputpassword = b.bindAsEventListener(this, this.inputPassword);
                    this.setButton("\u786e\u5b9a", this.bind_inputpassword);
                    break;
                case -7:
                    this._messagetxt.innerHTML = '<input type=password placeholder="\u5bf9\u4e0d\u8d77,\u60a8\u8f93\u5165\u7684\u5bc6\u7801\u9519\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165" class=x-message-input>';
                    this.bind_inputpassword = b.bindAsEventListener(this, this.inputPassword);
                    this.setButton("\u786e\u5b9a", this.bind_inputpassword);
                    break;
                case -8:
                    this.setMessage(t["-8"]);
                    break;
                case -15:
                    this.setMessage(t["-15"]);
                    break;
                case -25:
                    this.setMessage(t["-25"]);
                    break;
                default:
                    this.setMessage(a.data[0].error)
                }
                this.show()
            }
        },
        bindEvent: function() {},
        show: function() {
            b.show(this._feedback);
            b.show(this._message)
        },
        hide: function() {
            b.hide(this._message)
        },
        setMessage: function(a) {
            this._messagetxt.innerHTML = "<p>" + a + "</p>"
        },
        setButton: function(a, c) {
            this._messagebtn.innerHTML = "<button type=button class=x-btn>" + a + "</button>";
            var f = this._message.getElementsByClassName("x-btn")[0];
            b.addEventHandler(f, "click", c)
        },
        search: function() {
            window.location.href = "http://www.soku.com/search_video/q_" + this._title
        },
        feedback: function() {
            window.location.href = "http://www.youku.com/service/feed/subtype/4/"
        },
        contactOwner: function() {
            window.location.href = "http://i.youku.com/u/id_" + this._userid
        },
        onPasswordConfirm: function() {},
        inputPassword: function() {
            var a = this._messagetxt.getElementsByClassName("x-message-input")[0],
                c = a.value;
            if (null == c || 0 == c.replace(/\s/g, "").length) a.value = "", a.placeholder = "\u5bc6\u7801\u4e3a\u7a7a\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165";
            else {
                var f = this.player;
                i.start(this._vid, c, b.config.content, function(a, c) {
                    f.startPlay(a, c)
                })
            }
        }
    };
    var N = function(a) {
            this._handler = {};
            this.player = a;
            this._fullflag = null;
            this.init();
            this._fullscreen = b.get(".x-fullscreen");
            this._btn = this._fullscreen.getElementsByTagName("button")[0];
            this._btnb = this._btn.getElementsByTagName("b")[0];
            this.bindEvent()
        };
    N.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function() {},
        bindEvent: function() {
            this.bind_switch = b.bindAsEventListener(this, this.switchFullScreen);
            b.addEventHandler(this._fullscreen, "click", this.bind_switch, !0)
        },
        removeEvent: function() {
            b.removeEventHandler(this._fullscreen, "click", this.bind_switch, !0)
        },
        zoomStatus: function() {
            return this._btnb.className
        },
        fullFlag: function() {
            if (null !== this._fullflag) return this._fullflag;
            var a = this.player.video.webkitDisplayingFullscreen;
            return this._fullflag = "undefined" != typeof a ? a : !1
        },
        switchFullScreen: function(a) {
            var c = a.method || "c",
                f = this._btnb.className;
            b.config.events && b.config.events.onSwitchFullScreen ? (-1 === f.indexOf("in") ? (this._fullflag = !1, this._btnb.className = f.replace(/out/g, "in"), this.player._reporter.sendUserActionReport("xexfs", c)) : (this._fullflag = !0, this._btnb.className = f.replace(/in/g, "out"), this.player._reporter.sendUserActionReport("xenfs", c)), c = b.config.events.onSwitchFullScreen, c(a, f)) : (a = document.getElementById("x-player"), -1 === f.indexOf("in") ? (this.player._reporter.sendUserActionReport("xexfs", c), document.webkitCancelFullScreen && (this._btnb.className = f.replace(/out/g, "in"), this._fullflag = !1, document.webkitCancelFullScreen())) : (this.player._reporter.sendUserActionReport("xenfs", c), a.webkitRequestFullScreen ? (this._btnb.className = f.replace(/in/g, "out"), this._fullflag = !0, a.webkitRequestFullScreen()) : this.player.video.webkitSupportsFullscreen && 1 <= this.player.video.readyState && this.player.video.webkitEnterFullscreen()))
        }
    };
    var O = function(a, c) {
            this.handler = {};
            this.player = a;
            this.feedback = b.get(".x-feedback");
            this.information = b.get(".x-information");
            this.title = this.information.getElementsByClassName("x-title")[0];
            this.videoState = this.information.getElementsByClassName("x-video-state")[0];
            this.init(c)
        };
    O.prototype = {
        init: function(a) {
            !a.data[0].trial && (!a.data[0].error_code && !a.data[0].error) && (this.title.innerHTML = a.data[0].title, this.videoState.innerHTML = "<span>\u65f6\u957f: " + b.getTime(parseInt(a.data[0].seconds)) + "</span>", this.show())
        },
        show: function() {
            b.show(this.feedback);
            b.show(this.information)
        },
        hide: function() {
            b.hide(this.feedback);
            b.hide(this.information)
        },
        bindEvent: function() {}
    };
    var P = function(a) {
            this.player = a;
            this._tip = b.get(".x-interaction-tips");
            this.init()
        };
    P.prototype = {
        init: function() {
            this._tip.innerHTML = "<div class=x-interaction-info><div class=x-interaction-time></div><div class=x-shadow></div></div>";
            this._time = this._tip.getElementsByClassName("x-interaction-time")[0]
        },
        setProgress: function(a) {
            !0 != this._progressFlag && (this._time.innerHTML = b.getTime(parseInt(a)))
        },
        setTip: function(a) {
            this._progressFlag = !0;
            this._time.innerHTML = a;
            var c = this;
            setTimeout(function() {
                c._progressFlag = !1
            }, 1E3)
        },
        isVisible: function() {
            return "none" != this._tip.style.display
        },
        hide: function() {
            b.hide(this._tip)
        },
        show: function() {
            b.show(this._tip)
        },
        autoHide: function(a) {
            var c = this;
            setTimeout(function() {
                c.hide()
            }, a || 1E3)
        }
    };
    var Q = function(a, c) {
            this._handler = {};
            !c || !c.data || !c.data[0] || !c.data[0].dvd || !c.data[0].dvd.audiolang ? b.get(".x-localization").style.display = "none" : (this.player = a, this._language = b.get(".x-localization"), this.init(c), this.bindEvent(), this._button = this._language.getElementsByTagName("button")[0], this._panel = this._language.getElementsByTagName("div")[0], this._left = this._language.getElementsByClassName("x-btn-shadow-left")[0], this._right = this._language.getElementsByClassName("x-btn-shadow-right")[0], this._nodes = this._language.getElementsByTagName("li"))
        };
    Q.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function(a) {
            for (var a = a.data[0], c = a.dvd.audiolang, b = ["<button class=x-control-btn title=\u8bed\u8a00\u8bbe\u7f6e>", "", "</button>"], e = ["<div class=x-panel><ul>", "", "</ul><div class=x-panel-mask></div><div class=x-panel-bridg></div>", "</div>"], d = [], h = 0; h < c.length; h++) {
                var j = "",
                    j = j + ("<li data-vid=" + c[h].vid),
                    j = j + (" data-language=" + c[h].lang);
                c[h].vid == a.vidEncoded ? (b[1] = c[h].lang, j += " class=selected>") : j += ">";
                j += c[h].lang + "</li>";
                d[c[h].langid] = j
            }
            e[1] = d.join("");
            this._language.innerHTML = b.join("") + e.join("") + "<b class=x-btn-shadow-left></b><b class=x-btn-shadow-right></b>"
        },
        bindEvent: function() {
            var a = this._language.getElementsByTagName("li");
            if (0 != a.length) {
                this.bind_toggle = b.bindAsEventListener(this, this.toggleLanguagePanel);
                b.addEventHandler(this._language, "click", this.bind_toggle);
                for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchLanguage))
            }
        },
        removeEvent: function() {
            null != this._language && b.removeEventHandler(this._language, "click", this.bind_toggle)
        },
        hide: function() {
            if (this._language) {
                var a = this._panel;
                this._language.className = this._language.className.replace(/[\s]*pressed/g, "");
                a.style.display = "none"
            }
        },
        toggleLanguagePanel: function(a) {
            var c = this._panel,
                b = this._language.className; - 1 === b.indexOf("pressed") ? (this._language.className += " pressed", c.style.display = "block", this.player._reporter.sendUserActionReport("xcl", "c")) : (this._language.className = b.replace(/[\s]*pressed/g, ""), c.style.display = "none", this.player._reporter.sendUserActionReport("xhl", "c"));
            this.dispatch(a)
        },
        switchLanguage: function(a) {
            this.player._reporter.sendUserActionReport("xsl", "c");
            a.stopPropagation();
            for (var a = a.target, c = null, c = a.getAttribute ? a.getAttribute("data-vid") : a.parentNode.getAttribute("data-vid"), a = this._nodes, f = 0; f < a.length; f++) if (a[f].getAttribute("data-vid") == c) {
                if (-1 !== a[f].className.indexOf("selected")) {
                    this.toggleLanguagePanel();
                    return
                }
                a[f].innerHTML = a[f].getAttribute("data-language");
                a[f].className += " selected";
                this._button.innerHTML = a[f].getAttribute("data-language")
            } else a[f].innerHTML = a[f].getAttribute("data-language"), a[f].className = a[f].className.replace(/[\s]*selected/g, "");
            this.toggleLanguagePanel();
            var e = this.player,
                d = this.player.video.currentTime;
            if ("mp4" == b.config.content) d = this.player.currentTime, i.start(c, "", b.config.content, function(a, f) {
                console.log("switchLanguage vid = " + c);
                if (a.data && a.data[0]) {
                    null == a.data[0].dvd && (a.data[0].dvd = b.v.data[0].dvd, console.log("switchLanuage keep dvd info audiolang"));
                    b.config.nextAutoPlay = 1;
                    e.startPlay(a, f);
                    var h = 0;
                    e.video.addEventListener("canplay", function() {
                        if (h !== 1) {
                            h = 1;
                            e.seek(d)
                        }
                    })
                }
            });
            else {
                this.player.video.src = this.player.video.src.replace(/vid\/[^\/]+\/type/, "vid/" + c + "/type");
                this.player.video.autoplay = !0;
                var h = this,
                    j = 0;
                this.player.video.addEventListener("canplay", function() {
                    1 !== j && (j = 1, h.player.seek(d))
                })
            }
        }
    };
    var m = {
        setItem: function(a, c) {
            try {
                window.localStorage.setItem(a, c)
            } catch (b) {}
        },
        getItem: function(a) {
            try {
                return window.localStorage.getItem(a)
            } catch (c) {
                return null
            }
        },
        removeItem: function(a) {
            try {
                window.localStorage.removeItem(a)
            } catch (c) {}
        }
    },
        R = function(a) {
            this.player = a;
            this._progress = b.get(".x-progress-mini");
            this._track = this._progress.getElementsByClassName("x-progress-track-mini")[0];
            this._play = this._progress.getElementsByClassName("x-progress-play-mini")[0];
            this._load = this._progress.getElementsByClassName("x-progress-load-mini")[0];
            this._handler = {};
            this.bindEvent();
            this.resetProgress();
            this.hide()
        };
    R.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        bindEvent: function() {},
        removeEvent: function() {},
        dispatch: function(a) {
            if (a && this._handler[a.type]) this._handler[a.type]()
        },
        setProgress: function(a, c) {
            var f = Math.min(a, b.videoInfo.totalTime);
            this.playTime = f;
            var e = f / b.videoInfo.totalTime;
            this._play.style.width = 100 * e + "%";
            !0 !== c && (this.loadTime = f += Math.max(this.player.bufferedEnd() - a, 0), e = f / b.videoInfo.totalTime + 0.05, this._load.style.width = 100 * Math.min(Math.max(e, 0), 1) + "%")
        },
        resetProgress: function() {
            this._play.style.width = "0%";
            this._load.style.width = "0%"
        },
        show: function() {
            this._progress.style.display = "block"
        },
        hide: function() {
            this._progress.style.display = "none"
        }
    };
    var S = function(a, c) {
            this._handler = {};
            this._hasPayInfo = !1;
            this._feedback = b.get(".x-feedback");
            this._payInfo = b.get(".x-payinfo");
            this._text = b.get(".x-payinfo-txt");
            this._title = this._text.getElementsByTagName("h1")[0];
            this._vip = this._text.getElementsByTagName("em")[0];
            this._tip = b.get(".x-payinfo-tips");
            this._button = b.get(".x-payinfo-btn");
            this._tryBtn = b.get("#x-try");
            this._payBtn = b.get("#x-pay");
            this.player = a;
            this.init(c)
        };
    S.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        bindEvent: function() {
            this.bind_try = b.bindAsEventListener(this, this.play);
            this.bind_pay = b.bindAsEventListener(this, this.pay);
            b.addEventHandler(this._tryBtn, "click", this.bind_try);
            b.addEventHandler(this._payBtn, "click", this.bind_pay)
        },
        removeEvent: function() {
            b.removeEventHandler(this._tryBtn, "click", this.bind_try);
            b.removeEventHandler(this._payBtn, "click", this.bind_pay)
        },
        init: function(a) {
            if (null == a.data[0].trial) debug.log("not pay");
            else {
                this._hasPayInfo = !0;
                this._showid = a.data[0].show.showid;
                this._type = a.data[0].show.paid_type;
                var c = a.data[0].title;
                12 < c.length && (c = c.substr(0, 12) + "...");
                this._tryDuration = parseInt(a.data[0].trial.time);
                this.player.tryDuration = this._tryDuration;
                debug.log("try = " + this._tryDuration);
                "vod" == this._type ? (this._title.innerHTML = c + "<em class=x-vip>\u4ed8\u8d39\u5f71\u7247</em>", this._payBtn.innerHTML = "\u7acb\u5373\u8d2d\u4e70") : (this._title.innerHTML = c + "<em class=x-vip>\u4ed8\u8d39\u5305\u6708\u5f71\u7247</em>", this._payBtn.innerHTML = "\u5f00\u901a\u5f71\u89c6\u4f1a\u5458");
                this.bindEvent();
                this.show()
            }
        },
        play: function() {
            0 === this.activeTime ? this.player.seek(0) : this.player.video.play();
            this.player._reporter.sendUserActionReport("xtry", "c")
        },
        pay: function() {
            -1 !== this._payBtn.innerHTML.indexOf("\u4f1a\u5458") ? window.open("http://cps.youku.com/redirect.html?id=000002b0", "", "", !1) : window.open("http://cps.youku.com/redirect.html?id=000002b1&url=" + escape("http://pay.youku.com/buy/redirect.html?pstype=1&psid=" + this._showid), "", "", !1);
            this.player._reporter.sendUserActionReport("xbuy", "c")
        },
        hide: function() {
            this._feedback.style.display = "none"
        },
        show: function() {
            !1 != this._hasPayInfo && (this._feedback.style.display = "block", this._payInfo.style.display = "block")
        },
        isBlock: function() {
            return "block" == this._feedback.style.display
        },
        showTip: function() {
            this._hasPayInfo && (this._tip.innerHTML = "\u514d\u8d39\u8bd5\u770b\u5df2\u7ecf\u7ed3\u675f\uff0c\u4ed8\u8d39\u5373\u53ef\u89c2\u770b", this.show())
        },
        clearTip: function() {
            this._tip.innerHTML = ""
        },
        hasPayInfo: function() {
            return this._hasPayInfo
        },
        tryDuration: function() {
            return this._tryDuration
        }
    };
    var T = function(a) {
            this.player = a;
            this._progress = b.get(".x-progress");
            this._track = this._progress.getElementsByClassName("x-progress-track")[0];
            this._play = this._progress.getElementsByClassName("x-progress-play")[0];
            this._load = this._progress.getElementsByClassName("x-progress-load")[0];
            this._seek = this._progress.getElementsByClassName("x-progress-seek")[0];
            this._seekHandle = this._seek.getElementsByClassName("x-seek-handle")[0];
            this._seekBtn = this._seekHandle.getElementsByClassName("x-seek-handle-btn")[0];
            this._seekPointer = this._seek.getElementsByClassName("x-seek-pointer")[0];
            this._seekPointerLine = this._seekPointer.getElementsByClassName("x-seek-pointer-line")[0];
            this._seekPointerArrow = this._seekPointer.getElementsByClassName("x-seek-pointer-arrow")[0];
            this._seekPointerTime = this._seekPointer.getElementsByClassName("x-seek-pointer-time")[0];
            this._handler = {};
            this.bindEvent();
            this.uiAdapt()
        };
    T.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        bindEvent: function() {
            this.bind_seek = b.bindAsEventListener(this, this.seek);
            this.bind_touchstart = b.bindAsEventListener(this, this.onTouchStart);
            this.bind_showtimetip = b.bindAsEventListener(this, this.showTimeTip);
            this.bind_hidetimetip = b.bindAsEventListener(this, this.hideTimeTip);
            b.addEventHandler(this._seek, "click", this.bind_seek, !0);
            b.addEventHandler(this._seek, "touchstart", this.bind_touchstart)
        },
        removeEvent: function() {
            b.removeEventHandler(this._seek, "click", this.bind_seek, !0);
            b.removeEventHandler(this._seek, "touchstart", this.bind_touchstart)
        },
        dispatch: function(a) {
            if (a && this._handler[a.type]) this._handler[a.type]()
        },
        setProgress: function(a, c) {
            var f = Math.min(Math.max(a, 0), b.videoInfo.totalTime);
            this.playTime = f;
            var e = f / b.videoInfo.totalTime,
                d = this._seek.offsetWidth,
                h = this._seekHandle.offsetWidth;
            this._play.style.width = Math.min(100 * (e + h / d / 2), 100) + "%";
            this._seekHandle.style.left = e * d > d - h ? d - h + "px" : 100 * Math.min(Math.max(e, 0), 1) + "%";
            this.uCurrentTime.innerHTML = b.getTime(f);
            !0 !== c && (this.loadTime = f += Math.max(this.player.bufferedEnd() - a, 0), e = f / b.videoInfo.totalTime, this._load.style.width = 100 * Math.min(Math.max(e + 0.05, 0), 1) + "%")
        },
        resetProgress: function() {
            this._seekHandle.style.left = this._seekHandle.style.width;
            this._load.style.width = "0";
            this._play.style.width = "0"
        },
        seek: function(a) {
            var c = (new Date).getTime() - U;
            if (a.srcElement == this._seekHandle || c < V) return debug.log(c + "," + V), !1;
            this.player._reporter.sendUserActionReport("xcs", "c");
            c = a.offsetX || a.changedTouches[0].clientX - this._seek.clientX;
            debug.log("x = " + c);
            var c = c / this._seek.offsetWidth,
                f = c * b.videoInfo.totalTime;
            debug.log("progress bar time = " + f + "rate = " + c + "total = " + b.videoInfo.totalTime);
            this.setProgress(f, !0);
            this.hideTimeTip();
            this.player.seek(f);
            this.dispatch(a)
        },
        handleX: function() {
            return this._seekHandle.parentNode.parentNode.parentNode.parentNode.offsetLeft + this._seekHandle.offsetLeft + this._seekHandle.parentNode.offsetLeft
        },
        onTouchStart: function(a) {
            if (1 != a.targetTouches.length || this.isTouching) return !1;
            this.startX = a.targetTouches[0].clientX;
            if (100 < Math.abs(this.startX - this.handleX())) debug.log("<font color=green>too big 100over </font>");
            else {
                a.preventDefault();
                this.isTouching = !0;
                this.startTime = this._currentTime = this.player.video.currentTime;
                "m3u8" == b.config.content && (this._prepaused = this.player.video.paused, this.player.video.pause(), this.startTime = this.player.video.currentTime);
                if ("mp4" == b.config.content) {
                    this.player.video.pause();
                    this.startTime = this.player.video.currentTime;
                    for (a = 0; a < o; a++) this.startTime += parseInt(b.videoInfo._videoSegsDic[k][a].seconds)
                }
                this.bind_onTouchMove = b.bindAsEventListener(this, this.onTouchMove);
                this.bind_onTouchEnd = b.bindAsEventListener(this, this.onTouchEnd);
                b.addEventHandler(this._seek, "touchmove", this.bind_onTouchMove);
                b.addEventHandler(this._seek, "touchend", this.bind_onTouchEnd)
            }
        },
        onTouchMove: function(a) {
            if (1 != a.targetTouches.length) return !1;
            a.preventDefault();
            a.stopPropagation();
            this._currentTime = this.startTime + (a.targetTouches[0].clientX - this.startX) / this._seek.offsetWidth * b.videoInfo.totalTime;
            this.setProgress(Math.min(Math.max(this._currentTime, 0), b.videoInfo.totalTime), !0);
            this.showTimeTip();
            return !1
        },
        onTouchEnd: function(a) {
            this.isTouching = !1;
            if (1 < a.changedTouches.length) return !1;
            var c = {
                tb: parseInt(100 * this.startTime) / 100,
                to: parseInt(100 * this._currentTime) / 100
            };
            debug.log("tb=" + c.tb);
            this.player._reporter.sendUserActionReport("xds", "d", c);
            a.preventDefault();
            a.stopPropagation();
            b.removeEventHandler(this._seek, "touchmove", this.bind_onTouchMove);
            b.removeEventHandler(this._seek, "touchend", this.bind_onTouchEnd);
            this.player.seek(Math.min(Math.max(this._currentTime, 0), b.videoInfo.totalTime - 5));
            this.hideTimeTip();
            return !1
        },
        showTimeTip: function() {
            this._seekPointerTime.innerHTML = b.getTime(this.playTime);
            this._seekPointer.style.display = "block"
        },
        hideTimeTip: function() {
            this._seekPointer.style.display = "none"
        },
        uiAdapt: function() {}
    };
    var W = function(a, c) {
            this._handler = {};
            "m3u8" != b.config.content ? b.get(".x-quality").style.display = "none" : !c || !c.data || !c.data[0] || !(c.data[0].streamtypes && 1 < c.data[0].streamtypes.length) ? b.get(".x-quality").style.display = "none" : (this.player = a, this._quality = b.get(".x-quality"), this.init(c), this.bindEvent(), this._button = this._quality.getElementsByTagName("button")[0], this._panel = this._quality.getElementsByTagName("div")[0], this._nodes = this._quality.getElementsByTagName("li"), this._left = this._quality.getElementsByClassName("x-btn-shadow-left")[0], this._right = this._quality.getElementsByClassName("x-btn-shadow-right")[0])
        };
    W.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function(a) {
            var a = a.data[0],
                c = ["<button class=x-control-btn title=\u753b\u8d28\u8bbe\u7f6e>", "", "</button>"],
                f = ["<div class=x-panel><ul>", "", "</ul><div class=x-panel-mask></div><div class=x-panel-bridg></div>", "</div>"],
                e = "",
                d = [],
                h;
            for (h in p) if (-1 !== a.streamtypes.indexOf(h) && -1 === d.indexOf(p[h])) {
                var j = "",
                    i = "";
                h == b.defaultVideoType && (j = "", c[1] = p[h], i = " class=selected");
                e += "<li data-vtype=" + h + i + ">" + j + p[h] + "</li>";
                d.push(p[h])
            }
            "" == c[1] && (c[1] = d[0]);
            f[1] = e;
            this._quality.innerHTML = c.join("") + f.join("") + "<b class=x-btn-shadow-left></b><b class=x-btn-shadow-right></b>"
        },
        bindEvent: function() {
            var a = this._quality.getElementsByTagName("li");
            if (0 != a.length) {
                this.bind_toggle = b.bindAsEventListener(this, this.toggleQualityPanel);
                b.addEventHandler(this._quality, "click", this.bind_toggle);
                for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchQuality))
            }
        },
        removeEvent: function() {
            null != this._quality && b.removeEventHandler(this._quality, "click", this.bind_toggle)
        },
        hide: function() {
            if (this._quality) {
                var a = this._panel;
                this._quality.className = this._quality.className.replace(/[\s]*pressed/g, "");
                a.style.display = "none"
            }
        },
        toggleQualityPanel: function(a) {
            var c = this._panel,
                b = this._quality.className; - 1 === b.indexOf("pressed") ? (this._quality.className += " pressed", c.style.display = "block", this.player._reporter.sendUserActionReport("xcq", "c")) : (this._quality.className = b.replace(/[\s]*pressed/g, ""), c.style.display = "none", this.player._reporter.sendUserActionReport("xhq", "c"));
            this.dispatch(a)
        },
        switchQuality: function(a) {
            this.player._reporter.sendUserActionReport("xsq", "c");
            a.stopPropagation();
            for (var c = a.target, a = null, a = c.getAttribute ? c.getAttribute("data-vtype") : c.parentNode.getAttribute("data-vtype"), c = this._button, f = this._nodes, e = 0; e < f.length; e++) if (f[e].getAttribute("data-vtype") == a) {
                if (-1 !== f[e].className.indexOf("selected")) {
                    this.toggleQualityPanel();
                    return
                }
                f[e].innerHTML = p[a];
                f[e].className += " selected";
                c.innerHTML = p[a];
                m.setItem("defaultVideoType", a);
                b.defaultVideoType = a
            } else {
                var d = f[e].getAttribute("data-vtype");
                f[e].innerHTML = p[d];
                f[e].className = f[e].className.replace(/selected/, "")
            }
            debug.log("q1");
            this.toggleQualityPanel();
            var h = this.player.video.currentTime,
                j = this.player.video.src.replace(/type\/(flv|flvhd|mp4|hd2)/, "type/" + a);
            this.player.video.src = j;
            var i = this,
                k = 0;
            this.player.video.addEventListener("canplay", function() {
                1 === k ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (k = 1, debug.log("q2 nsrc=" + j), i.player.seek(h), debug.log("q3"))
            })
        },
        switchQuality_: function(a) {
            a.stopPropagation();
            for (var a = a.target.dataset.vtype, c = this._button, b = this._nodes, e = 0; e < b.length; e++) if (b[e].dataset.vtype == a) {
                if (-1 !== b[e].className.indexOf("selected")) {
                    this.toggleQualityPanel();
                    return
                }
                b[e].innerHTML = p[a];
                b[e].className += " selected";
                c.innerHTML = p[a]
            } else b[e].innerHTML = p[b[e].dataset.vtype], b[e].className = b[e].className.replace(/selected/, "");
            debug.log("q1");
            this.toggleQualityPanel();
            var d = this.player.video.currentTime,
                h = this.player.video.src.replace(/type\/(flv|flvhd|mp4|hd2)/, "type/" + a);
            this.player.video.src = h;
            var j = this,
                i = 0;
            this.player.video.addEventListener("canplay", function() {
                1 === i ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (i = 1, debug.log("q2 nsrc=" + h), j.player.seek(d), debug.log("q3"))
            })
        }
    };
    var X = function(a, c) {
            this._handler = {};
            this.player = a;
            this._panel = document.createElement("div");
            this._panel.className = "x-recommend";
            this.init(c);
            this.bindEvent();
            this.request(c);
            window.relatedpanel = this;
            b.get("#x-player").appendChild(this._panel);
            this._panel.style.display = "block";
            var f = {
                e: "xendcard"
            };
            f.device = d.isAndroid ? "adr" : d.isIPAD ? "ipad" : "oth";
            d.Log(d.uniplayerUrl + r(f))
        };
    X.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        startInterval: function() {
            var a = this;
            this._pageInterval = setInterval(function() {
                a.changePage(1)
            }, 5E3)
        },
        restartInterval: function() {
            clearInterval(this._pageInterval);
            this.startInterval()
        },
        bindEvent: function() {
            this.bind_replay = b.bindAsEventListener(this, this.replay);
            b.addEventHandler(this._replaybtn, "click", this.bind_replay, !0);
            this._curPageNum = 0;
            this.startInterval();
            this.bind_touchstart = b.bindAsEventListener(this, this.touchStart);
            this.bind_touchmove = b.bindAsEventListener(this, this.touchMove);
            this.bind_touchend = b.bindAsEventListener(this, this.touchEnd);
            b.addEventHandler(this._bottom, "touchstart", this.bind_touchstart);
            b.addEventHandler(this._list, "touchstart", this.bind_touchstart);
            b.addEventHandler(this._bottom, "touchmove", this.bind_touchmove);
            b.addEventHandler(this._list, "touchmove", this.bind_touchmove);
            b.addEventHandler(this._bottom, "touchend", this.bind_touchend);
            b.addEventHandler(this._list, "touchend", this.bind_touchend)
        },
        removeEvent: function() {
            b.removeEventHandler(this._replaybtn, "click", this.bind_replay, !0)
        },
        bindDynamicEvent: function() {
            var a = this._listinner.getElementsByClassName("x-item");
            this.bind_itemclick = b.bindAsEventListener(this, this.onItemClick);
            for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", this.bind_itemclick, !0)
        },
        onItemClick: function(a) {
            a = a.currentTarget.getAttribute("data-i");
            debug.log("related onitemclick" + a + " " + this._info.data[a].videoid);
            this.player._reporter.sendRecommendLog(this._info.data[a])
        },
        isNoPageFlip: function() {
            return 660 < b.get("#x-player").offsetWidth ? !0 : !1
        },
        isPageSplitNumber: function(a) {
            for (var c = b.get("#x-player").offsetWidth, f = [], f = 200 >= c ? [-1] : 320 >= c ? [1, 3, 5, 7, 9, 11] : 660 >= c ? [2, 5, 8, 11, 14, 17] : [8, 18, 28, 38], c = 0; c < f.length; c++) if (f[c] == a) return !0;
            return !1
        },
        init: function(a) {
            this._panel.innerHTML = "<div class=x-recommend-info></div><div class=x-recommend-list></div><div class=x-recommend-pages></div>";
            this._info = this._panel.getElementsByClassName("x-recommend-info")[0];
            this._list = this._panel.getElementsByClassName("x-recommend-list")[0];
            this._bottom = this._panel.getElementsByClassName("x-recommend-pages")[0];
            var c = a.data[0].title.substr(0, 30);
            c.length < a.data[0].title.length && (c += "...");
            this._info.innerHTML = "<h3><span>\u521a\u521a\u770b\u4e86\uff1a</span>" + c + "</h3><div class=x-recommend-btn><button class=btn><span class=x-ico-replay></span>\u91cd\u64ad</button></div>";
            this._replaybtn = this._info.getElementsByClassName("btn")[0];
            this._list.innerHTML = "<div class=x-shadow-left></div><div class=x-shadow-right></div><div class=x-recommend-list-inner></div><div class=x-pages-list></div>";
            this._listinner = this._list.getElementsByClassName("x-recommend-list-inner")[0]
        },
        request: function(a) {
            var c;
            c = {
                VideoID: a.data[0].vidEncoded,
                md: 2
            };
            a.data[0].show && (c.ShowID = a.data[0].show.showid);
            a = a.controller.playmode;
            c.page = "1";
            c.page = {
                normal: 1,
                show: 3,
                folder: 4
            }[a];
            "interior" == b.config.winType ? c.apptype = 1 : (c.apptype = 8, c.page = 1);
            for (var f in b.initConfig.playlistconfig) c[f] = b.initConfig.playlistconfig[f];
            c.__callback = "relatedpanel.parseResponse";
            c = "http://v.youku.com/player/getRelatedPlayList?" + l(c);
            v(c)
        },
        parseResponse: function(a) {
            this._info = a;
            this.buildPanel(this._info)
        },
        buildPanel: function(a) {
            var c = a.data,
                f = c.length;
            debug.log("realted len = " + f);
            for (var e = [], a = 0; a < f; a++) {
                var d = c[a].logo,
                    h = c[a].title.substr(0, 12),
                    j = c[a].link;
                "myoukucom" == b.initConfig.client_id && (j = "http://m.youku.com/smartphone/detail?vid=" + c[a].videoid);
                e.push("<ul class=x-item data-i=" + a + "><li class=x-item-img><img class=x-item-img-node src=" + d + "></li><li class=x-item-info><div class=x-item-title>" + h + "</div><div class=x-item-bg></div></li><li class=x-item-url><a target=_blank href=" + j + "></a></li><li class=x-item-loading><div class=x-play-loading></div></li></ul>")
            }
            c = [];
            if (this.isNoPageFlip()) for (a = 0; 29 > a && 2 * a + 2 < e.length; a++) f = "", f = 2 == a ? '<div class="x-entry x-entry-large">' + e[0] + "</div>" : "<div class=x-entry>" + e[2 * a + 1] + e[2 * a + 2] + "</div>", c.push(f);
            else for (a = 0; a < e.length; a++) f = "<div class=x-entry>" + e[a] + "</div>", c.push(f);
            debug.log("entry length = " + c.length);
            e = [];
            d = [];
            f = this._listinner.offsetWidth;
            for (a = 0; a < c.length; a++) d.push(c[a]), this.isPageSplitNumber(a) && (d = '<div class=x-page style="float:left;width:' + f + 'px">' + d.join("") + "</div>", e.push(d), d = []);
            0 == e.length && (d = '<div class=x-page style="float:left;width:' + f + 'px">' + d.join("") + "</div>", e.push(d));
            this._pages = e;
            this._listinner.innerHTML = '<div class=x-pages style="width:1000%;">' + e.join("") + "</div>";
            this.buildBottomTip(0);
            this.bindDynamicEvent();
            this.buildImgEvent()
        },
        buildImgEvent: function() {
            for (var a = this._listinner.getElementsByClassName("x-item-img-node"), c = 0; c < a.length; c++) b.addEventHandler(a[c], "error", b.bindAsEventListener(this, this.onLoadImgError)), b.addEventHandler(a[c], "abort", b.bindAsEventListener(this, this.onLoadImgError))
        },
        onLoadImgError: function(a) {
            debug.log("img error");
            a = a.target;
            b.addClass(a.parentNode.parentNode, "x-no-pic");
            a.src = "http://player.youku.com/h5player/img/no_pic.png"
        },
        buildBottomTip: function(a) {
            if (!this.isNoPageFlip()) {
                for (var c = this._pages.length, b = [], d = 0; d < c; d++) {
                    var g = "",
                        g = "";
                    d == a && (g = " class=current");
                    g = "<li" + g + "><em>" + (d + 1) + "</em></li>";
                    b.push(g)
                }
                this._bottom.innerHTML = "<ul>" + b.join("") + "</ul>"
            }
        },
        replay: function(a) {
            this.player.controls.rePlay(a)
        },
        changePage: function(a) {
            if (!this.isNoPageFlip()) {
                var c = 0; - 1 == a ? (c = this._pages.length, c = (this._curPageNum + c - 1) % c) : c = (this._curPageNum + 1) % this._pages.length;
                a = this._listinner.getElementsByClassName("x-pages")[0];
                (new FX(a, {
                    left: {
                        to: -(c * this._listinner.offsetWidth)
                    }
                }, 0.5, "fadeIn", function() {})).start();
                this.buildBottomTip(c);
                this._curPageNum = c
            }
        },
        changePage_: function(a) {
            if (!this.isNoPageFlip()) {
                var c = 0; - 1 == a ? (a = this._pages.length, c = (this._curPageNum + a - 1) % a) : c = (this._curPageNum + 1) % this._pages.length;
                var b = this._listinner.getElementsByClassName("x-pages")[0];
                b.innerHTML = this._pages[this._curPageNum] + this._pages[c];
                b.getElementsByClassName("x-page");
                var d = this,
                    g = b.offsetLeft;
                debug.log("left=" + g);
                (new FX(b, {
                    left: {
                        to: -b.offsetWidth
                    }
                }, 0.5, "fadeIn", function() {
                    b.innerHTML = d._pages[c];
                    setTimeout(function() {
                        b.style.left = g + "px";
                        debug.log(b.style.left)
                    }, 100)
                })).start();
                this.buildBottomTip(c);
                this._curPageNum = c
            }
        },
        onResize: function() {
            var a = this;
            setTimeout(function() {
                a.buildPanel(a._info)
            }, 500)
        },
        touchStart: function(a) {
            clearInterval(this._pageInterval);
            this._startX = a.targetTouches[0].clientX;
            this._startY = a.targetTouches[0].clientY;
            debug.log("startx = " + this._startX);
            this._endX = this._startX;
            this._endY = this._startY
        },
        touchMove: function(a) {
            this._endX = a.targetTouches[0].clientX;
            this._endY = a.targetTouches[0].clientY;
            Math.abs(this._startX - this._endX) < Math.abs(this._startY - this._endY) || a.preventDefault()
        },
        touchEnd: function() {
            debug.log("endx= " + this._endX);
            this.restartInterval();
            this._endX < this._startX - 80 ? (debug.log("recm left"), this.changePage(1)) : this._endX > this._startX + 80 ? (debug.log("recm right"), this.changePage(-1)) : debug.log("too short " + (this._endX - this._startX))
        }
    };
    var Y = function(a) {
            this.player = a;
            this._handle = {};
            this._tips = b.get(".x-tips");
            b.hide(this._tips);
            this._tips.innerHTML = "<p class=x-tip-p></p><div class=x-tips-close><a href=#><em>\u5173\u95ed</em></a></div><div class=x-tips-shadow></div>";
            this._ptip = this._tips.getElementsByClassName("x-tip-p")[0];
            this._ctip = this._tips.getElementsByClassName("x-tips-close")[0];
            null == m.getItem("youku_conf_skip") && m.setItem("youku_conf_skip", !0);
            this.bindEvent()
        };
    Y.prototype = {
        bindEvent: function() {
            b.addEventHandler(this._ctip, "click", b.bindAsEventListener(this, this.closeTip))
        },
        closeTip: function() {
            b.hide(this._tips);
            this.keepLastTime()
        },
        autoHide: function(a) {
            var c = this;
            setTimeout(function() {
                c.closeTip()
            }, a)
        },
        keepLastTime: function() {},
        ignoreLastTime: function() {},
        isShowTimeTip: function() {
            var a = m.getItem("youku_keep_lasttime"),
                a = parseInt(a),
                c = m.getItem("youku_ignore_lasttime"),
                c = parseInt(c);
            return 3 <= a || 3 <= c ? !1 : !0
        },
        showLastTimeTip: function(a) {
            a = b.getTime(a);
            debug.log("last = " + a);
            !1 != this.isShowTimeTip() && (this._ptip.innerHTML = "\u4f18\u9177\u8bb0\u5fc6\u60a8\u4e0a\u6b21\u64ad\u653e\u5230<span class=x-tips-time>" + a + "</span>, <a class=x-tip-timebegin href=#>\u4ece\u5934\u89c2\u770b</a>", this._playBegin = this._ptip.getElementsByClassName("x-tip-timebegin")[0], b.addEventHandler(this._playBegin, "click", b.bindAsEventListener(this, this.seekBegin)), b.show(this._tips), this.autoHide(5E3))
        },
        onSkipTail: function() {
            "true" == m.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "\u5373\u5c06\u4e3a\u60a8\u8df3\u8fc7\u7247\u5c3e, <a class=x-tip-skipnoway href=#>\u4e0d\u518d\u8df3\u8fc7</a>", this._skipnowtail = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnowtail, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "\u662f\u5426\u8df3\u8fc7\u7247\u5934\u7247\u5c3e? <a class=x-tip-skipalways href=#>\u59cb\u7ec8\u8df3\u8fc7</a>", this._skipalwtail = this._ptip.getElementsByClassName("x-tip-skipalways")[0], b.addEventHandler(this._skipalwtail, "click", b.bindAsEventListener(this, this.skipAlways)));
            b.show(this._tips);
            this.autoHide(1E4)
        },
        onSkipHead: function() {
            "true" == m.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "\u5df2\u7ecf\u4e3a\u60a8\u8df3\u8fc7\u7247\u5934, <a class=x-tip-skipnoway href=#>\u4e0d\u518d\u8df3\u8fc7</a>", this._skipnow = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnow, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "\u662f\u5426\u8df3\u8fc7\u7247\u5934\u7247\u5c3e? <a class=x-tip-skipalways href=#>\u59cb\u7ec8\u8df3\u8fc7</a>", this._skipalw = this._ptip.getElementsByClassName("x-tip-skipalways")[0], b.addEventHandler(this._skipalw, "click", b.bindAsEventListener(this, this.skipImediately)));
            b.show(this._tips);
            this.autoHide(1E4)
        },
        skipImediately: function() {
            debug.log("skip imediately");
            this.player._reporter.sendUserActionReport("xskh", "c");
            m.setItem("youku_conf_skip", !0);
            var a = parseInt((b.v.data[0].dvd || "").head) / 1E3;
            this.onSkipHead();
            this.player.seek(a);
            return !1
        },
        skipNoway: function() {
            this.player._reporter.sendUserActionReport("xnsk", "c");
            m.setItem("youku_conf_skip", !1);
            this._ptip.innerHTML = "\u8bbe\u7f6e\u6210\u529f";
            return !1
        },
        skipAlways: function() {
            this.player._reporter.sendUserActionReport("xask", "c");
            m.setItem("youku_conf_skip", !0);
            this._ptip.innerHTML = "\u8bbe\u7f6e\u6210\u529f";
            return !1
        },
        seekBegin: function() {
            this.player._reporter.sendUserActionReport("xseb", "c");
            b.hide(this._tips);
            this.ignoreLastTime();
            this.player.seek(0);
            return !1
        }
    };
    var E = function(a, c, b) {
            this.player = a;
            this.v = c;
            this.sid = b;
            if (0 < B.length) for (a = 0; a < B.length; a++) this.sendUepReport(B[a].type, B[a].time);
            this.dimension = {
                w: document.getElementById("x-player").offsetWidth,
                h: document.getElementById("x-player").offsetHeight
            };
            this.screenDim = {
                w: screen.availWidth,
                h: screen.availHeight
            };
            if ("onorientationchange" in window) {
                var e = this;
                window.addEventListener("orientationchange", function() {
                    e.sendUserActionReport("xro", "r");
                    var a = {
                        e: "xro"
                    };
                    a.device = d.isAndroid ? "adr" : d.isIPAD ? "ipad" : "oth";
                    d.Log(d.uniplayerUrl + r(a))
                })
            }
        };
    E.prototype = {
        sendRecommendLog: function(a) {
            var c = b.v.data[0];
            c.sid = b.videoInfo._sid;
            a = {
                vid: c.videoid,
                uid: b.v.user.id,
                sct: c.categories,
                apt: 12,
                pg: a.pg,
                md: 2,
                pos: a.cpos,
                dvid: a.dvid,
                dsid: a.dsid,
                dct: a.dct,
                abver: a.abver,
                dma: a.dma,
                ord: a.ord,
                rtlid: a.rtlid,
                alginfo: a.alginfo,
                sid: 0
            };
            c.show && (a.sid = c.show.showid);
            a.xts = parseInt(1E4 * Math.random());
            d.Log("http://e.stat.youku.com/recommond/log?" + l(a))
        },
        sendTSLog: function(a) {
            if (!1 != b.v.controller.tsflag) {
                if (null == this.tstimer) {
                    var c = this;
                    this.tstimer = setInterval(function() {
                        c.player.video.paused || c.sendTSLog(60)
                    }, 5E3)
                }
                61 == a && (clearInterval(this.tstimer), this.tstimer = null);
                var f = b.v.data[0];
                f.sid = b.videoInfo._sid;
                b.initConfig.tslogconfig = b.initConfig.tslogconfig || {};
                var e = {};
                e.vvid = f.sid;
                e.vid = f.videoid;
                e.cf = this.getHDFlag();
                e.cpt = this.player.currentTime ? Math.floor(this.player.currentTime) : 0;
                e.ext = this.getExtString(a);
                e.r = Math.floor(1E6 * Math.random());
                a = "http://p-log.ykimg.com/tslog?";
                this._ip ? (a = "http://" + this._ip + "/tslog?", c = this, d.Log(a + l(e))) : (window.youkureport = this, e.callback = "youkureport.tslogparse", v(a + l(e)), !1 === this._bTsResponse && this.sendTSErrorLog(), this._tsReqTime = (new Date).getTime(), this._bTsResponse = !1)
            }
        },
        tslogparse: function(a) {
            1E3 < (new Date).getTime() - this._tsReqTime && this.sendTSErrorLog();
            this._ip = a.ip;
            a = /^(\d)+\.(\d)+\.(\d)+\.(\d)+$/g;
            this._ip && this._ip.match(a) ? this._bTsResponse = !0 : this._ip = null
        },
        sendTSErrorLog: function(a, c) {
            var f = b.v.data[0];
            f.sid = b.videoInfo._sid;
            f = {
                vid: f.videoid,
                vvid: f.sid
            };
            f.host = a || "p-log.ykimg.com";
            f.code = c || 900;
            f.cost = (new Date).getTime() - this._tsReqTime;
            d.Log("http://p.l.ykimg.com/ykvisitts?" + l(f))
        },
        sendVVLog: function(a) {
            if (!1 != b.v.controller.tsflag) {
                var c = b.v.data[0];
                c.sid = b.videoInfo._sid;
                b.initConfig.vvlogconfig = b.initConfig.vvlogconfig || {};
                var f = {
                    pvid: ""
                };
                f.chid = c.ct;
                f.url = escape(window.location.href);
                f.rurl = "";
                f.vvid = c.sid;
                f.vid = c.videoid;
                f.schid = c.cs;
                f.plid = "";
                f.plchid = "";
                f.shid = null == c.show ? "" : c.show.showID;
                f.shchid = c.ct;
                f.ptype = b.WIN_TYPE;
                f.cp = null == c.show ? "" : c.show.copyright;
                f.vl = parseInt(c.seconds);
                f.cf = this.getHDFlag();
                f.hf = this.getMaxFileType();
                f.spt = 0;
                f.pb = 62 == a ? 2 : 0;
                f.vdoid = c.userid;
                f.out = "interior" == b.initConfig.wintype ? 0 : 1;
                f.ext = this.getExtString(a);
                for (var e in b.initConfig.vvlogconfig) f[e] = b.initConfig.vvlogconfig[e];
                d.Log("http://v.l.youku.com/ykvvlog?" + l(f))
            }
        },
        getExtString: function(a) {
            var c = {
                iku: "m"
            };
            c.full = this.player.controls.fullscreenPanel.fullFlag();
            c.lang = 1;
            c.num = a;
            c.ctp = 0;
            c.pc = 60 == a ? 0 : 1;
            c.clb = 0;
            return escape(l(c))
        },
        getPlayByType_: function(a) {
            var c = 0;
            62 == a && (c = 2);
            b.initConfig.vvlogconfig.pb && (c = b.initConfig.vvlogconfig.pb);
            return c
        },
        getMaxFileType: function() {
            return b.v.data[0].segs.hd2 ? 2 : b.v.data[0].segs.mp4 ? 1 : 0
        },
        getHDFlag: function() {
            var a = null,
                c = this.player.video.src,
                a = -1 != c.indexOf("m3u8") ? {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    hd3: 3
                } : {
                    "030020": 4,
                    "030004": 0,
                    "030008": 1,
                    "030080": 3
                },
                b;
            for (b in a) if (-1 !== c.indexOf(b)) return a[b];
            return 0
        },
        addPlayerDurationReport: function(a) {
            var c = b.videoInfo;
            if (!(null == c || null == c._playListData)) {
                if (null == this.drtimer) {
                    var f = this;
                    this.drtimer = setInterval(function() {
                        f.player.video.paused || f.addPlayerDurationReport(60)
                    }, 6E4)
                }
                61 == a && (clearInterval(this.drtimer), this.drtimer = null);
                var e = {};
                e.sid = c._sid;
                e.videoOwnerId = b.v.data[0].userid;
                e.viewUserId = b.v.user.id;
                e.videoid = b.v.data[0].videoid;
                e.ct = b.v.data[0].ct;
                e.cs = b.v.data[0].cs;
                e.number = a;
                e.rnd = ((new Date).getTime() - c.abstarttime) / 1E3;
                null != c._playListData.show ? (e.showid_v2 = null == c._playListData.show ? "" : c._playListData.show.showid, e.showid_v3 = null == c._playListData.show ? "" : c._playListData.show.showid_encode, e.show_videotype = c._playListData.show.show_videotype, e.stg = c._playListData.show.stage, e.Tid = c._playListData.show.theaterid, e.Copyright = c._playListData.show.copyright) : (e.showid_v2 = "", e.Tid = 0, e.Copyright = "");
                e.hd = 0;
                e.ikuflag = "m";
                e.hd = {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    hd3: 3
                }[b.defaultVideoType];
                e.winType = b.WIN_TYPE;
                e.mtype = H();
                e.totalsec = c.totalTime;
                e.fullflag = this.player.controls.fullscreenPanel.fullFlag();
                e.playComplete = 0;
                61 == a && (e.playComplete = 1);
                59 == a && (e.referUrl = (b.initConfig.vvlogconfig || "").rurl, e.url = encodeURIComponent(window.location.href), e.starttime = 0);
                e.currentPlayTime = parseInt(this.player.currentTime || 0);
                e.continuationPlay = 0;
                e.pid = b.initConfig.client_id;
                e.timestamp = (new Date).getTime();
                d.Log("http://stat.youku.com/player/addPlayerDurationReport?" + l(e))
            }
        },
        addPlayerStaticReport: function() {
            var a = {};
            a.videoid = this.v.data[0].videoid;
            a.t = this.v.data[0].ts;
            a.totalsec = parseInt(this.v.data[0].seconds);
            a.ikuflag = "m";
            a.url = escape(window.location.href);
            a.fullflag = this.player.controls.fullscreenPanel.fullFlag();
            a.source = "video";
            a.referer = (b.initConfig.vvlogconfig || "").rurl;
            a.sid = this.sid;
            a.uid = this.v.data[0].userid;
            for (var c = a.t, f = !1, e = ""; !f;) {
                for (var e = "", g = 0; 20 > g; g++) var h = Math.floor(61 * Math.random()),
                    e = e + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(h, h + 1);
                hstr = c + e;
                hashcash = ba(hstr);
                "00" == hashcash.substring(0, 2) && (f = !0)
            }
            a.h = e;
            a.totalseg = b.pieceLength();
            a = l(a);
            d.Log("http://stat.youku.com/player/addPlayerStaticReport?" + a)
        },
        sendUserActionReport: function(a, c, f) {
            c = {
                t: 1002,
                e: a,
                v: c
            };
            c.d = I(H());
            var e = {
                v: "h5player",
                vid: b.v.data[0].videoid,
                ssid: b.videoInfo._sid,
                ct: b.v.data[0].ct,
                cs: b.v.data[0].cs,
                uid: 0
            };
            b.v.data[0].user && (e.uid = b.v.user.id);
            e.sid = "";
            b.v.data[0].show && (e.sid = b.v.data[0].show.showid);
            e.tc = this.player.currentTime || 0;
            e.w = b.get("#x-player").offsetWidth;
            e.h = b.get("#x-player").offsetHeight;
            e.f = this.player.video.webkitDisplayingFullscreen ? "on" : "off";
            e.q = this.player.getQuality();
            for (var g in f) e[g] = f[g];
            c.x = I(l(e));
            f = l(c);
            if ("xre" == a) this.checkPlayerResize("http://e.stat.ykimg.com/red/ytes.php?", f);
            else {
                if ("xenfs" == a || "xexfs" == a) {
                    this._giveupReTag = !0;
                    var h = this;
                    setTimeout(function() {
                        h._giveupReTag = false
                    }, 800)
                }
                d.Log("http://e.stat.ykimg.com/red/ytes.php?" + f)
            }
            this.sendCustomUserAction(a)
        },
        checkScreenRotate: function(a, c) {
            var b = screen.availWidth,
                e = screen.availHeight;
            debug.log("<hr/>rota w,h = " + b + "," + e);
            if (this.screenDim.w != b || this.screenDim.h != e) this.screenDim.w = b, this.screenDim.h = e, debug.log("<b><font color=red>rotate</font></b>"), d.Log(a + c)
        },
        checkPlayerResize: function(a, c) {
            if (!0 === this._giveupReTag) debug.log("give up xre after enfs or exfs");
            else {
                var b = document.getElementById("x-player");
                this._resizeList = this._resizeList || [];
                this._resizeList.push({
                    str: c,
                    time: (new Date).getTime(),
                    w: b.offsetWidth,
                    h: b.offsetHeight
                });
                var e = this;
                setTimeout(function() {
                    if (0 != e._resizeList.length) {
                        for (var c = e._resizeList[0].time, b = 0; b < e._resizeList.length; b++) {
                            var f = e._resizeList[b].w,
                                i = e._resizeList[b].h,
                                k = e._resizeList[b].time;
                            if (f != e.dimension.w || i != e.dimension.h) e.dimension.w = f, e.dimension.h = i, (800 < k - c || b == e._resizeList.length - 1) && d.Log(a + e._resizeList[b].str)
                        }
                        e._resizeList = []
                    }
                }, 1E3)
            }
        },
        sendCustomUserAction: function(a) {
            var b = {
                e: a
            };
            b.device = d.isAndroid ? "adr" : d.isIPAD ? "ipad" : "oth";
            switch (a) {
            case "xenfs":
                d.Log(d.uniplayerUrl + r(b));
                break;
            case "xexfs":
                d.Log(d.uniplayerUrl + r(b))
            }
        },
        sendCustomLoadedTime: function(a) {
            a = {
                vid: b.v.data[0].videoid,
                os: escape(d.os),
                adrd4: d.isAndroid4,
                mobile: d.isMobile,
                type: "mp4" == b.config.content ? k : b.config.content,
                cost: a,
                ver: VER.replace(/[-:]/g, "")
            };
            !1 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, "")));
            d.Log("http://passport-log.youku.com/logsys/logstorage/append?project=xplayerloadtime&log=" + r(a))
        },
        sendUepReport: function(a, c) {
            if (!(10 < 100 * Math.random())) {
                var f = {
                    m: d.isSupportH5M3U8 ? 5 : 4,
                    hd: this.getHDFlag(),
                    t: a,
                    s: c,
                    u: escape(window.location.href),
                    p: 2,
                    v: b.videoInfo._sid,
                    ct: b.v.data[0].ct,
                    cs: b.v.data[0].cs,
                    a: b.v.controller.area_code + "|" + b.v.controller.dma_code
                };
                d.Log("http://v.l.youku.com/uep?" + l(f))
            }
        },
        sendLoadedTime: function(a) {
            debug.log("loaded cost = " + a);
            this.sendCustomLoadedTime(a);
            this.sendUepReport(6, a)
        },
        sendComScoreReport: function(a) {
            if (!this._hasComScore) {
                for (var b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) if (-1 !== b[d].src.indexOf("scorecardresearch.com/beacon.js")) {
                    this._hasComScore = !0;
                    break
                }!0 !== this._hasComScore && (b = document.createElement("script"), d = document.getElementsByTagName("script")[0], b.async = !0, b.src = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js", d.parentNode.insertBefore(b, d));
                this._hasComScore = !0
            }
            var e = setInterval(function() {
                if ("undefined" != typeof COMSCORE) {
                    clearInterval(e);
                    try {
                        COMSCORE.beacon({
                            c1: 1,
                            c2: 7293931,
                            c3: a
                        })
                    } catch (b) {
                        debug.log("beacon exception")
                    }
                }
            }, 500)
        },
        sendIResearchReport: function() {
            var a = window,
                b = void 0,
                d = void 0,
                d = {
                    UA: "UA-youku-000003",
                    NO_FLS: 1,
                    WITH_REF: 0,
                    URL: "http://player.youku.com/embed/partner/iwt.js"
                };
            a._iwt ? a._iwt.track(d, void 0) : (a._iwtTQ = a._iwtTQ || []).push([d, void 0]);
            if (!a._iwtLoading) {
                var e = void 0;
                a._iwtLoading = 1;
                b = document.createElement("script");
                b.src = d.URL;
                e = document.getElementsByTagName("script");
                e = e[e.length - 1];
                e.parentNode.insertBefore(b, e)
            }
        },
        sendIResearchReport_: function(a, b) {
            var d = {
                UA: "UA-youku-000003",
                NO_FLS: 1,
                WITH_REF: 0,
                URL: "http://player.youku.com/embed/partner/iwt.js"
            };
            window._iwt ? window._iwt.track(d, b) : (window._iwtTQ = window._iwtTQ || [], window._iwtTQ.push([d, b]));
            if (!this._hasIRe) {
                for (var d = document.getElementsByTagName("script"), e = 0; e < d.length; e++) if (-1 !== d[e].src.indexOf("iwt.js")) {
                    this._hasIRe = !0;
                    break
                }!0 !== this._hasIRe && (d = document.createElement("script"), e = document.getElementsByTagName("script")[0], d.async = !0, d.src = ("https:" == document.location.protocol ? "https://" : "http://") + "player.youku.com/embed/partner/iwt.js", e.parentNode.insertBefore(d, e));
                this._hasIRe = !0
            }
        },
        sendThirdPartyReport: function(a) {
            "xplayer_h5" == a && (a = d.isAndroid ? "xplayer_h5_android" : d.isIPAD ? "xplayer_h5_ipad" : "xplayer_h5_other");
            this.sendComScoreReport(a);
            this.sendIResearchReport(a)
        }
    };
    var F = function(a, b) {
            this._handler = {};
            this.player = a;
            this.video = this.player.video;
            this.controls = this.player.controls;
            this._adplugin = this.player._adplugin;
            this._adplugin.adplayer = this;
            this.video.preload = "none";
            this.video.src = b.data.urls[0];
            debug.log("ad src=" + this.video.src);
            this.video.style.display = "block";
            this._addata = b.data;
            this._addata.curnum = 0;
            this._playTag = [];
            this.bindAdEvent();
            this._adreporter = new Z(this, this._addata)
        };
    F.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        bindAdEvent: function() {
            this.bind_fadtoplay = b.bindAsEventListener(this, this.onPlayClick);
            this.bind_fadplay = b.bindAsEventListener(this, this.onAdPlay);
            this.bind_fadended = b.bindAsEventListener(this, this.onAdEnded);
            this.bind_faderror = b.bindAsEventListener(this, this.onAdError);
            this.bind_fadpause = b.bindAsEventListener(this, this.onAdPause);
            this.bind_fadsuspend = b.bindAsEventListener(this, this.onAdSuspend);
            this.bind_fadstalled = b.bindAsEventListener(this, this.onAdStalled);
            this.bind_fadwaiting = b.bindAsEventListener(this, this.onAdWaiting);
            this.bind_fadloadedmetadata = b.bindAsEventListener(this, this.onAdLoadedMetaData);
            this.bind_fadtimeupdate = b.bindAsEventListener(this, this.onAdTimeUpdate);
            this.bind_fadclick = b.bindAsEventListener(this, this.onAdClick);
            b.addEventHandler(this.video, "play", this.bind_fadplay);
            b.addEventHandler(this.video, "ended", this.bind_fadended);
            b.addEventHandler(this.video, "error", this.bind_faderror);
            b.addEventHandler(this.video, "pause", this.bind_fadpause);
            b.addEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.addEventHandler(this.video, "stalled", this.bind_fadstalled);
            b.addEventHandler(this.video, "waiting", this.bind_fadwaiting);
            b.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            this.shadow = this.controls.buttons.shadow;
            this.videobtn = this.controls.buttons.videobtn;
            b.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        removeAdEvent: function() {
            b.removeEventHandler(this.video, "play", this.bind_fadplay);
            b.removeEventHandler(this.video, "ended", this.bind_fadended);
            b.removeEventHandler(this.video, "error", this.bind_faderror);
            b.removeEventHandler(this.video, "pause", this.bind_fadpause);
            b.removeEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.removeEventHandler(this.video, "stalled", this.bind_fadstalled);
            b.removeEventHandler(this.video, "waiting", this.bind_fadwaiting);
            b.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            b.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        onPlayClick: function() {
            this.video.play()
        },
        play: function() {
            this.video.load();
            this.video.play()
        },
        leftSecond: function() {
            for (var a = this._addata.curnum, b = this._addata.seconds.length, d = this._addata.seconds[a] - this.video.currentTime, a = a + 1; a < b; a++) d += this._addata.seconds[a];
            return parseInt(d)
        },
        clearTimer: function() {
            clearInterval(this._checkTimer);
            this._checkTimer = null
        },
        checkPause: function() {
            if (!this._checkTimer) {
                var a = this;
                this._timelist = [];
                this._checkTimer = setInterval(function() {
                    if (a.video.paused) a.onAdPause();
                    else a._timelist.push(a.video.currentTime), 3 <= a._timelist.length && (1 > Math.abs(a._timelist[0] - a._timelist[2]) && (debug.log("<b>ad unexpected pause</b>"), a.video.play()), a._timelist = [])
                }, 1E3)
            }
        },
        onAdPlay: function() {
            this.checkPause();
            var a = this.controls.container.poster,
                c = this.controls.buttons.shadow;
            b.hide(this.controls.buttons.videobtn);
            b.hide(a);
            b.hide(b.get(".x-feedback"));
            b.show(c);
            this.video.style.display = "block";
            a = this._addata.curnum;
            debug.log("left=" + this.leftSecond() + " curtotal=" + this._addata.seconds[a] + " curtime=" + this.video.currentTime);
            this._adplugin.setLeftSecond(this.leftSecond());
            this._adplugin.show();
            var d = this;
            setTimeout(function() {
                debug.log("ad media timeout check begin = " + d._adBegin);
                d._adBegin || (d.removeAdEvent(), d._adplugin.hide(), d.dispatch({
                    type: ADConstant.AD_ERROR,
                    data: !0
                }))
            }, 1E4);
            this._playTag[a] || (this._playTag[a] = !0, this._adreporter.sendSUS())
        },
        onAdError: function() {
            this.removeAdEvent();
            this._adplugin.hide();
            this.dispatch({
                type: ADConstant.AD_ERROR,
                data: !0
            })
        },
        onAdEnded: function(a) {
            debug.log("ad ended");
            this._adreporter.sendSUE();
            if (this._addata.curnum < this._addata.urls.length - 1) this.onMiddleAdEnded(a);
            else this.removeAdEvent(), this._adplugin.hide(), this.clearTimer(), this.dispatch({
                type: ADConstant.AD_END,
                data: !0
            })
        },
        onMiddleAdEnded: function() {
            debug.log("onMiddleAdEnded");
            this._pauseLeftSec = !0;
            var a = this;
            setTimeout(function() {
                a._pauseLeftSec = !1
            }, 1E3);
            this._addata.curnum++;
            this.video.src = this._addata.urls[this._addata.curnum];
            this.video.load();
            this.video.play();
            this._adBegin = !1
        },
        onAdPause: function() {
            this.player.video.ended || (b.show(this.controls.buttons.videobtn), b.hide(this.controls.buttons.shadow))
        },
        onAdSuspend: function() {
            debug.log("<font color=red>ad suspend</font>")
        },
        onAdStalled: function() {
            debug.log("<font color=red>ad stalled</font>")
        },
        onAdWaiting: function(a) {
            this.controls.onWaiting(a)
        },
        onAdTimeUpdate: function(a) {
            4 == a.target.readyState && (this._adBegin = !0, b.hide(this.controls.buttons.loading), this._pauseLeftSec || this._adplugin.setLeftSecond(this.leftSecond()), this._adreporter.sendSU(this.video.currentTime))
        },
        onAdLoadedMetaData: function() {
            this._adBegin = !0
        },
        onAdClick: function() {
            this.video.pause();
            this._adreporter.sendCUM();
            var a = this._addata,
                a = a.info.VAL[a.curnum].CU;
            debug.log("click cu=" + a);
            window.open(a, "", "", !1)
        }
    };
    ADConstant = {
        FRONT_REQUEST_BASE: "http://mf.atm.youku.com/mf?",
        BACK_REQUEST_BASE: "http://mb.atm.youku.com/mb?",
        PAUSE_REQUEST_BASE: "http://mp.atm.youku.com/mp?",
        INSERT_REQUEST_BASE: "http://valo.atm.youku.com/valo?",
        OVERLAY_REQUEST_BASE: "http://valc.atm.youku.com/valc?",
        FRONT_AD: "frontAD",
        BACK_AD: "backAD",
        INSERT_AD: "insertAD",
        PAUSE_AD: "pauseAD",
        OVERLAY_AD: "overlayAD",
        AD_END: "adend",
        AD_ERROR: "aderror",
        FRONT_AD_END: "frontADend",
        FRONT_AD_ERROR: "frontADerror",
        FRONT_AD_INFO_OK: "frontAdinfook",
        FRONT_AD_INFO_TIMEOUT: "frontAdinfotimeout",
        BACK_AD_END: "backAdend",
        BACK_AD_ERROR: "backaderror",
        BACK_AD_INFO_OK: "backAdinfook",
        BACK_AD_INFO_TIMEOUT: " backAdinfotimeout",
        INSERT_AD_INFO_OK: "insertAdinfook",
        PAUSE_AD_INFO_OK: "pauseAdinfook",
        OVERLAY_AD_INFO_OK: "overlayAdinfook",
        AdPluginObject: "adpluginobject"
    };
    var $ = function(a, c, d) {
            this._handler = {};
            this.player = a;
            this.sid = d;
            this._advids = [];
            this._adsecs = [];
            this._adsrcs = [];
            this._vid = c.data[0].videoid;
            this._advert = b.get(".x-advert");
            this._adskip = this._advert.getElementsByClassName("x-advert-skip")[0];
            this._adcount = this._advert.getElementsByClassName("x-advert-countdown")[0];
            this._adknowdet = this._advert.getElementsByClassName("x-advert-detail")[0];
            this.init(c);
            this.bindEvent()
        };
    $.prototype = {
        init: function(a) {
            this.initRequestParam(a);
            this._adskipTxt = this._adskip.getElementsByClassName("x-advert-txt")[0];
            this._adskipTxt.innerHTML = "\u8df3\u8fc7\u5e7f\u544a";
            this._adcountTxt = this._adcount.getElementsByClassName("x-advert-txt")[0];
            this._adcountTxt.innerHTML = "\u5e7f\u544a\u5269\u4f59\u65f6\u95f4<span class=x-advert-sec></span>\u79d2";
            this._adsec = this._adcountTxt.getElementsByClassName("x-advert-sec")[0]
        },
        initRequestParam: function(a) {
            var c = {
                site: 1,
                p: 0,
                vl: parseInt(a.data[0].seconds),
                fu: 0,
                ct: a.data[0].ct,
                cs: a.data[0].cs,
                d: 0,
                paid: a.data[0].show ? a.data[0].show.paid : 0,
                s: a.data[0].show ? a.data[0].show.showid : 0,
                sid: this.sid,
                td: a.data[0].sourceVid ? a.data[0].sourceVid : 0,
                v: a.data[0].videoid,
                vip: a.user.vip ? 1 : 0,
                wintype: "xplayer_m3u8",
                k: "",
                u: a.data[0].userid,
                bt: d.isPad ? "pad" : "phone",
                os: d.isMobileIOS ? "ios" : "Android",
                rst: d.isMobileIOS ? "m3u8" : "3gphd",
                tict: 0,
                aw: "w",
                vs: "1.0"
            };
            c.k = escape((a.data[0].tags || []).join("|"));
            for (var f in b.initConfig.adconfig) c[f] = b.initConfig.adconfig[f];
            this._param = c
        },
        initRequestParam_: function(a) {
            var c = {
                ct: a.data[0].ct,
                cs: a.data[0].cs,
                v: a.data[0].videoid,
                t: parseInt(a.data[0].seconds),
                u: a.data[0].userid,
                fileid: "todo",
                winType: "xplayer_m3u8",
                partnerid: b.config.partnerId,
                sid: this.sid,
                k: "",
                td: "todo"
            };
            c.s = a.data[0].show ? a.data[0].show.showid : "";
            a.user && (c.vip = a.user.vip ? 1 : 0);
            c.paid = a.data[0].show ? a.data[0].show.paid : 0;
            for (var d in b.initConfig.adconfig) c[d] = b.initConfig.adconfig[d];
            this._param = c
        },
        bindEvent: function() {
            var a = this;
            this._adskip.addEventListener("click", function() {
                a.adplayer.video.pause();
                window.open("http://cps.youku.com/redirect.html?id=000002bf", "", "", !1)
            }, !1);
            this._adknowdet.addEventListener("click", function() {
                debug.log("detail clicked");
                a.adplayer.onAdClick("")
            }, !1)
        },
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        show: function() {
            b.show(this._advert)
        },
        hide: function() {
            b.hide(this._advert)
        },
        setLeftSecond: function(a) {
            this._adsec && (this._adsec.innerText = a)
        },
        adParse: function(a) {
            this._isAdInfoOk = !0;
            if (a && a.VAL) for (var b = a.VAL, d = 0; d < b.length; d++) this._adsrcs.push(b[d].RS), this._adsecs.push(parseInt(b[d].AL));
            debug.log("frontad len =" + this._adsrcs.length);
            this.dispatch({
                type: ADConstant.FRONT_AD_INFO_OK,
                data: {
                    ids: this._advids || [],
                    urls: this._adsrcs,
                    seconds: this._adsecs,
                    info: a
                }
            })
        },
        frontAdParse_: function(a) {
            this._isAdInfoOk = !0;
            if (a) for (var c = 2; a["A" + c];) this._advids.push(a["A" + c].RS), this._adsecs.push(parseInt(a["A" + c].VL)), c++;
            debug.log("frontad len =" + this._advids.length);
            for (c = 0; c < this._advids.length; c++) this._adsrcs.push(b.m3u8src(this._advids[c], "mp4"));
            debug.log(this._adsrcs);
            this.dispatch({
                type: ADConstant.FRONT_AD_INFO_OK,
                data: {
                    ids: this._advids,
                    urls: this._adsrcs,
                    seconds: this._adsecs,
                    info: a
                }
            })
        },
        frontAd: function() {
            this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0;
            this._param.p = 7;
            this._param.callback = ADConstant.AdPluginObject + ".adParse";
            var a = ADConstant.FRONT_REQUEST_BASE + l(this._param);
            v(a);
            var b = this;
            setTimeout(function() {
                b._isAdInfoOk || (debug.log("adinfo timeout"), b.dispatch({
                    type: ADConstant.FRONT_AD_INFO_TIMEOUT,
                    data: {
                        timeout: 2E3
                    }
                }))
            }, 2E3)
        },
        backAd: function() {
            this._param.fu = this.player.controls.fullscreenPanel.fullFlag();
            this._param.p = 9;
            this._param.callback = ADConstant.AdPluginObject + ".adParse";
            this._param.ctu = 0;
            var a = ADConstant.BACK_REQUEST_BASE + l(this._param);
            v(a);
            var b = this;
            setTimeout(function() {
                b._isAdInfoOk || (debug.log("adinfo timeout"), b.dispatch({
                    type: ADConstant.BACK_AD_INFO_TIMEOUT,
                    data: {
                        timeout: 5E3
                    }
                }))
            }, 5E3)
        },
        insertAd: function() {
            this._param.ps = 0;
            this._param.pt = 0
        },
        pauseAd: function() {}
    };
    var Z = function(a, b) {
            this.adplayer = a;
            this.addata = b
        };
    Z.prototype = {
        sendSUS: function() {
            var a = this.addata.info.VAL[this.addata.curnum].SUS;
            if ("undefined" != typeof a) for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendSUS_: function() {
            var a = this.addata.info,
                b = this.addata.curnum + 2,
                f = a["A" + b].ATMSU,
                e = a["A" + b].ISOSU;
            d.Log(a["A" + b].SU);
            d.Log(f);
            d.Log(e)
        },
        sendSUE: function() {
            var a = this.addata.info.VAL[this.addata.curnum].SUE;
            if ("undefined" != typeof a) for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendSUE_: function() {
            var a = this.addata.info,
                b = this.addata.curnum + 2,
                f = a["A" + b].COU;
            d.Log(a["A" + b].OU);
            d.Log(f)
        },
        sendSU: function(a) {
            var b = this.addata.info.VAL[this.addata.curnum].SU;
            if ("undefined" != typeof b) {
                for (var f = 1E4, e = null, g = 0; g < b.length; g++) {
                    var h = b[g].U,
                        i = parseInt(b[g].T),
                        i = a - i;
                    0 <= i && i < f && (f = i, e = h)
                }
                null != e && d.Log(e)
            }
        },
        sendSU_: function(a) {
            curnum += 2;
            var b = this.addata.info["A" + curnum].MT;
            b && a >= parseInt(b) && (a = this.addata.info["A" + curnum].CMU, d.Log(this.addata.info["A" + curnum].MU), d.Log(a))
        },
        sendCUM: function() {
            var a = this.addata.info.VAL[this.addata.curnum].CUM;
            if ("undefined" != typeof cum) for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendCUM_: function() {
            var a = this.addata;
            d.Log(a.info["A" + (a.curnum + 2)].VCU)
        }
    };
    DirectPlayer = function(a) {
        b.config = a;
        null == b.config.width && (b.config.width = document.getElementById(b.config.parentBox).offsetWidth);
        this.buildDirectDom(document.getElementById(b.config.parentBox))
    };
    DirectPlayer.prototype = {
        buildDirectDom: function(a) {
            a.innerHTML = "<div id=x-player class=" + w(b.config.width) + "><div class=x-container><div class=x-poster><img id=x-img></img></div><div class=x-video-button><div class=x-play-ico></div></div><div class=x-feedback><div class=x-information><h1 class=x-title></h1><div class=x-video-state><span class=x-time-span></span></div></div><div class=x-feedback-mask></div></div></div></div>"
        },
        bindEvent: function() {
            this._videobtn = b.get(".x-video-button");
            b.addEventHandler(this._videobtn, "click", b.bindAsEventListener(this, this.redirect))
        },
        startPlay: function(a, c) {
            b.v = a;
            b.videoInfo = c;
            b.videoInfo._playListData = a.data[0];
            this._pimg = b.get("#x-img");
            this._pimg.src = a.data[0].logo;
            this._title = b.get(".x-title");
            this._title.innerHTML = a.data[0].title;
            this._timespan = b.get(".x-time-span");
            this._timespan.innerHTML = b.getTime(a.data[0].seconds);
            b.show(b.get(".x-poster"));
            b.show(b.get(".x-feedback"));
            b.show(b.get(".x-information"));
            this.adapterForReport();
            this._reporter = new E(this, b.v, b.videoInfo._sid);
            this.bindEvent()
        },
        onPlayStart: function() {
            b.config.events && b.config.events.onPlayStart && (debug.log("api:onplaystart"), b.config.events.onPlayStart())
        },
        getSrc: function() {
            if (this.src) return this.src;
            "m3u8" == b.config.content ? this.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[k] && (this.src = b.videoInfo._videoSegsDic[k][0].src);
            return this.src
        },
        redirect: function() {
            var a = this.getSrc();
            debug.log("redirect play src=" + a);
            window.open(a, "", "", !1);
            this.onPlayStart();
            this._reporter.addPlayerStaticReport();
            this._reporter.addPlayerDurationReport(59);
            this._reporter.sendVVLog(59);
            this._reporter.sendTSLog(60);
            this._reporter.sendUserActionReport("xps", "c");
            this._reporter.sendThirdPartyReport("xplayer_dl")
        },
        adapterForReport: function() {
            this.controls = {
                fullscreenPanel: {
                    fullFlag: function() {
                        return 1
                    }
                }
            };
            this.video = {
                src: this.getSrc()
            };
            this.getQuality = function() {
                return "m"
            }
        }
    };
    (function(a, b) {
        a = online = "http://player.youku.com/" + a;
        if ("js" == b) {
            var d = document.createElement("script");
            d.setAttribute("type", "text/javascript");
            d.setAttribute("src", a)
        } else "css" == b && (d = document.createElement("link"), d.setAttribute("rel", "stylesheet"), d.setAttribute("type", "text/css"), d.setAttribute("href", a));
        "undefined" != typeof d && document.getElementsByTagName("head")[0].appendChild(d)
    })("h5player/play.css?ver=" + VER.replace(/[-:]/g, ""), "css");
    var aa = function(a, c) {
            this.setting = {
                debug: !1,
                controls: b.get(".x-dashboard"),
                picture: b.get(".x-container"),
                feedback: b.get(".x-feedback"),
                container: {
                    poster: b.get(".x-poster")
                },
                buttons: {
                    pointVideo: b.get("#point-video"),
                    playControl: b.get(".x-play-control"),
                    play: b.get("#x-playbtn"),
                    videobtn: b.get(".x-video-button"),
                    loading: b.get(".x-play-loading"),
                    shadow: b.get(".x-shadow"),
                    currentTime: b.get(".x-time-current"),
                    totalTime: b.get(".x-time-duration"),
                    fullscreen: b.get(".x-fullscreen")
                },
                classNames: {
                    play: "x-playing",
                    pause: "x-pause"
                },
                init: function() {}
            };
            b.extend(this.setting, c);
            this.player = a;
            this.dashboard = this.setting.controls;
            this.container = this.setting.container;
            this.progressBar = new T(a);
            this.progressBar.uCurrentTime = this.setting.buttons.currentTime;
            this.miniProgressBar = new R(a);
            this.fullscreenPanel = new N(a);
            this.interactionPanel = new P(a);
            this.xplayer = b.get("#x-player");
            this.buttons = this.setting.buttons
        };
    aa.prototype = {
        init: function(a, c) {
            this.buttons.totalTime.innerHTML = c.totalTime ? b.getTime(c.totalTime) : "00:00";
            this.resetProgress();
            this.buttons.play.className = this.setting.classNames.play;
            var d = this.container.poster.getElementsByTagName("img")[0];
            b.config.poster ? d.src = b.config.poster : a.data[0].trial ? (this.container.poster.style.backgroundColor = "black", d.parentNode.removeChild(d), b.show(this.container.poster)) : (d.src = a.data[0].logo, this.container.poster.style.display = "block");
            this._qualityPanel = new W(this.player, a);
            this._languagePanel = new Q(this.player, a);
            this._payPanel = new S(this.player, a);
            this._feedbackPanel = new D(this.player, a);
            this._informationPanel = new O(this.player, a);
            this.tipPanel = new Y(this.player, a);
            this.bindDynamicEvent()
        },
        bindDynamicEvent: function() {
            this.bind_mutualHide = b.bindAsEventListener(this, this.mutualHide);
            b.addEventHandler(this._languagePanel, "click", this.bind_mutualHide);
            b.addEventHandler(this._qualityPanel, "click", this.bind_mutualHide)
        },
        retimer: function() {
            debug.log("retimer");
            this.autoHideDashBoard()
        },
        autoHideDashBoard: function(a) {
            this.dashboardTimer && clearTimeout(this.dashboardTimer);
            var b = this.setting.controls,
                d = this._payPanel,
                e = this.player,
                g = this._informationPanel,
                h = this.miniProgressBar;
            this.dashboardTimer = setTimeout(function() {
                !1 == e.video.paused && (b.style.display = "none", h.show(), d.hide(), g.hide())
            }, a || 5E3)
        },
        onMultiTouch: function() {},
        showBoardInfo: function() {
            b.show(this.setting.controls);
            this.miniProgressBar.hide();
            this._informationPanel.show();
            this._payPanel.hasPayInfo() && this._payPanel.show()
        },
        toggleDashBoard: function(a) {
            if (!("touchend" == a.type && 1 < a.changedTouches.length)) {
                this._sx = this._sx || 0;
                this._sy = this._sy || 0;
                a.changedTouches = a.changedTouches || [{
                    clientX: this._sx,
                    clientY: this._sy
                }];
                var b = {
                    x: this._sx,
                    y: this._sy
                },
                    a = {
                        x: a.changedTouches[0].clientX,
                        y: a.changedTouches[0].clientY
                    };
                !this._stmtag && (1 !== this._sactionType && this.isTouchTooShort(b, a, 100)) && (b = this.setting.controls, a = b.style.display, "none" == a || "" == a ? (this.player._reporter.sendUserActionReport("xcd", "c"), this.showBoardInfo(), this.autoHideDashBoard(), U = (new Date).getTime()) : (this.player._reporter.sendUserActionReport("xhd", "c"), clearTimeout(this.dashboardTimer), b.style.display = "none", this.miniProgressBar.show(), this._informationPanel.hide(), this._payPanel.hasPayInfo() && this._payPanel.hide()))
            }
        },
        bindEvent: function() {
            debug.log("bind event");
            this.bind_uireinit = b.bindAsEventListener(this, this.uiInit);
            this.bind_play = b.bindAsEventListener(this, this.play);
            this.bind_redirect = b.bindAsEventListener(this, this.redirect);
            this.bind_showTimeTip = b.bindAsEventListener(this, this.showTimeTip);
            this.bind_hideTimeTip = b.bindAsEventListener(this, this.hideTimeTip);
            this.bind_changeVolume = b.bindAsEventListener(this, this.changeVolume);
            this.bind_toggleVolume = b.bindAsEventListener(this, this.toggleVolume);
            this.bind_gestureChange = b.bindAsEventListener(this, this.onGestureChange);
            this.bind_toggleDashBoard = b.bindAsEventListener(this, this.toggleDashBoard);
            this.bind_retimer = b.bindAsEventListener(this, this.retimer);
            b.addEventHandler(this.progressBar, "click", this.bind_uireinit);
            b.addEventHandler(this.setting.controls, "click", this.bind_retimer);
            b.addEventHandler(this.setting.controls, "touchstart", this.bind_retimer);
            b.addEventHandler(this.buttons.playControl, "click", this.bind_play);
            "directsrc" != b.config.playType ? (b.addEventHandler(this.buttons.videobtn, "touchstart", b.bindAsEventListener(this, this.onVideoBtnTouchStart)), b.addEventHandler(this.buttons.videobtn, "touchend", this.bind_play)) : !d.isIPHONE && !d.isIPOD && b.addEventHandler(this.buttons.videobtn, "click", this.bind_redirect, !0);
            b.addEventHandler(this.buttons.shadow, "touchstart", b.bindAsEventListener(this, this.shadowTouchStart));
            b.addEventHandler(this.buttons.shadow, "touchmove", b.bindAsEventListener(this, this.shadowTouchMove));
            b.addEventHandler(this.buttons.shadow, "touchend", b.bindAsEventListener(this, this.shadowTouchEnd));
            b.addEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard);
            b.addEventHandler(this.buttons.shadow, "touchend", b.bindAsEventListener(this, this.onMultiTouch));
            b.addEventHandler(this.buttons.shadow, "gesturechange", this.bind_gestureChange)
        },
        removeEvent: function() {
            debug.log("remove event begin");
            b.removeEventHandler(this.progressBar, "click", this.bind_uireinit);
            b.removeEventHandler(this.buttons.playControl, "click", this.bind_play);
            b.removeEventHandler(this.buttons.videobtn, "click", this.bind_play);
            b.removeEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard);
            b.removeEventHandler(this.progressBar, "touchstart", this.bind_uireinit);
            b.removeEventHandler(this._languagePanel, "click", this.bind_mutualHide);
            b.removeEventHandler(this._qualityPanel, "click", this.bind_mutualHide);
            this.progressBar.removeEvent();
            this.fullscreenPanel.removeEvent();
            this._languagePanel.removeEvent();
            this._qualityPanel.removeEvent();
            debug.log("remove event end")
        },
        onGestureChange: function(a) {
            a.preventDefault();
            var b = -1 !== this.fullscreenPanel.zoomStatus().indexOf("in");
            if (1.1 < a.scale && b || 0.9 > a.scale && !b) a.method = "m", this.fullscreenPanel.switchFullScreen(a)
        },
        toggleVolume: function() {},
        changeVolume: function() {},
        rePlay: function() {
            debug.log("replay");
            this.player._reporter.sendUserActionReport("xrp", "c");
            u = !1;
            (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend);
            this.resetProgress();
            this.player.replay();
            debug.log("replay func end")
        },
        redirect: function(a) {
            this.player.redirect(a)
        },
        onVideoBtnTouchStart: function(a) {
            this._vtsx = a.targetTouches[0].clientX;
            this._vtsy = a.targetTouches[0].clientY
        },
        play: function(a) {
            a = a || {};
            if (u) this.rePlay();
            else {
                if (a.currentTarget == this.buttons.videobtn) {
                    if (50 < Math.abs(a.changedTouches[0].clientY - this._vtsy)) {
                        debug.log("videobtn too long y");
                        return
                    }
                    this.player._reporter.sendUserActionReport("xps", "c")
                }
                var b = this.player.video.paused;
                debug.log("m3u8 isPause = " + b + " e = " + a);
                b ? (0 === this._payPanel.activeTime ? (this._payPanel.activeTime = -1, this.player.seek(0)) : this.player.video.play(), a.currentTarget == this.buttons.playControl && this.player._reporter.sendUserActionReport("xpl", "c")) : (this.player.video.pause(), a.currentTarget == this.buttons.playControl && this.player._reporter.sendUserActionReport("xpa", "c"))
            }
        },
        autoShow: function() {
            this.show();
            var a = this;
            setTimeout(function() {
                a.hide()
            }, 5E3)
        },
        mutualHide: function(a) {
            a._target == this._languagePanel ? this._qualityPanel.hide() : a._target == this._qualityPanel && this._languagePanel.hide()
        },
        show: function(a) {
            a ? b.show(this.buttons[a]) : b.show(this.setting.controls)
        },
        hide: function(a) {
            a ? b.hide(this.buttons[a]) : b.hide(this.setting.controls)
        },
        backAdPrepare: function() {
            this.dashboard.style.display = "none";
            this.buttons.shadow.display = "none"
        },
        onEnded: function() {
            this.dashboard.style.display = "none";
            this.buttons.shadow.display = "none";
            this.buttons.videobtn.style.display = "block";
            this.container.poster.style.display = "block";
            this._informationPanel.show();
            this.miniProgressBar.hide();
            null == b.v.data[0].trial && (this._relatedPanel = new X(this.player, b.v))
        },
        onPlay: function() {
            this.player.video.style.display = "block";
            this.buttons.play.className = this.setting.classNames.pause;
            this.buttons.videobtn.style.display = "none";
            this.container.poster.style.display = "none";
            this.buttons.shadow.style.display = "block";
            (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend);
            u = !1;
            this._first || (this._first = !0, this._feedbackPanel.show(), this.setting.controls.style.display = "block");
            this.autoHideDashBoard(2E3)
        },
        onPause: function() {
            this.buttons.play.className = this.setting.classNames.play;
            b.hide(this.buttons.loading);
            this.interactionPanel.isVisible() || this.showBoardInfo()
        },
        onWaiting: function() {
            "none" == this.buttons.videobtn.style.display && (this.buttons.loading.style.display = "block")
        },
        onTryPlayEnded: function() {
            debug.log("try end");
            var a = this.player.video;
            this.player.video.pause();
            this._payPanel.activeTime = 0;
            u = !0;
            this.onEnded({
                target: a
            });
            this._payPanel.showTip();
            var b = this;
            setTimeout(function() {
                b.dashboard.style.display = "none";
                b.buttons.shadow.style.display = "none"
            }, 1E3)
        },
        onTimeUpdate: function(a) {
            this.buttons.loading.style.display = "none";
            if (a.target == this.player.video) {
                var b = this.player.currentTime;
                4 == a.target.readyState && this.setProgress(b);
                if (this._payPanel.hasPayInfo() && b >= this._payPanel.tryDuration()) this.onTryPlayEnded()
            }
        },
        removeControls: function() {
            this.video.controls = !1
        },
        loadControls: function() {
            this.video.controls = !0
        },
        setProgress: function(a) {
            a = Math.min(Math.max(a, 0), b.videoInfo.totalTime);
            this.progressBar.setProgress(a);
            this.miniProgressBar.setProgress(a);
            this.interactionPanel.setProgress(a);
            this.buttons.currentTime.innerHTML = b.getTime(this.progressBar.playTime)
        },
        resetProgress: function() {
            this.progressBar.resetProgress();
            this.miniProgressBar.resetProgress();
            this.buttons.currentTime.innerHTML = "00:00"
        },
        hideTimeTip: function(a) {
            if (a.srcElement.id == this.buttons.progressHandler.id) return !1;
            this.buttons.progressTime.style.display = "none"
        },
        showTimeTip: function(a) {
            if (a.srcElement.id == this.buttons.progressHandler.id || a.srcElement.id == this.buttons.progressTime.id || a.srcElement.id == this.buttons.pointVideo.id) return !1;
            a = a.offsetX / this.buttons.progressBar.offsetWidth;
            this.buttons.progressTime.innerHTML = b.getTime(a * b.videoInfo.totalTime);
            this.buttons.progressTime.style.left = 100 * Math.min(Math.max(a, 0.023), 0.977) + "%";
            this.buttons.progressTime.style.display = "block"
        },
        shadowTouchStart: function(a) {
            1 < a.targetTouches.length || (this._sx = a.targetTouches[0].clientX, this._sy = a.targetTouches[0].clientY, this._smx = this._sx, this._smy = this._sy, this._presmx = this._sx, this._presmy = this._sy, this._deltaxs = [], this._stime = this.player.currentTime || 0, this._ttime = null, this._spretag = this._stmtag = !1, this._presmt = this._sactionTime = (new Date).getTime(), this._stmlrtag = this._sactionType = 0)
        },
        shadowTouchMove: function(a) {
            if (!(1 < a.targetTouches.length)) {
                this._smx = a.targetTouches[0].clientX;
                this._smy = a.targetTouches[0].clientY;
                this._smt = (new Date).getTime();
                var b = Math.abs(this._smx - this._sx),
                    d = Math.abs(this._smy - this._sy),
                    e = this._smt - this._sactionTime;
                0 === this._stmlrtag && (this._stmlrtag = b > d ? 1 : -1);
                1 == this._stmlrtag && a.preventDefault();
                if (1 != this._sactionType) if (100 < b && b > d && 500 > e) debug.log("quick seek moving"), this.player.video.pause(), this._sactionType = 1, this.interactionPanel.setTip(this._smx > this._sx ? "\u5feb\u8fdb30\u79d2" : "\u5feb\u900030\u79d2"), this.interactionPanel.show();
                else if (200 > b && (100 > d && 1E3 < e) && (this._spretag = !0), this._spretag && b > d || this._stmtag) debug.log("stmtag =" + this._stmtag), this._sactionType = 2, this._stmtag = !0, this.player.video.pause(), this.dragging(a)
            }
        },
        shadowTouchEnd: function(a) {
            1 < a.changedTouches.length || (this.adrAdapt(a), this.isShadowTouchTooShort() && !this._stmtag && 1 != this._sactionType ? debug.log("too short or horizontal") : (a = Math.abs(this._smy - this._sy) > Math.abs(this._smx - this._sx) ? "xdud" : "xdlr", debug.log("shadow action = " + a), this.player._reporter.sendUserActionReport(a, "d"), null != this._ttime ? (debug.log("<br/><b>normal seek</b>"), this.player.seek(this._ttime), this.interactionPanel.hide(), this.player._reporter.sendUserActionReport("xtseek", "d"), d.Log(d.uniplayerUrl + r({
                e: "xtseek",
                adr: d.isAndroid,
                ios: d.isIPAD,
                d: parseInt(this._ttime - this._stime)
            }))) : 1 == this._sactionType && (a = 0 < this._smx - this._sx ? 30 : -30, debug.log("<br/><font color=red>quick seek deltat = " + a + " cur=" + this._stime + "</font>"), this.setProgress(this._stime + a), this.interactionPanel.setTip(0 < a ? "\u5feb\u8fdb" + a + "\u79d2" : "\u5feb\u9000" + -a + "\u79d2"), this.interactionPanel.show(), this.interactionPanel.autoHide(), this.player.seek(this._stime + a), this.player._reporter.sendUserActionReport("xqseek", "d"), d.Log(d.uniplayerUrl + r({
                e: "xqseek",
                adr: d.isAndroid,
                ios: d.isIPAD,
                d: a
            })), debug.log("<br/>"))))
        },
        dragging_: function(a) {
            var c = this._smx - this._presmx;
            this._deltaxs.push(10 < c ? c / 2 : c);
            for (var d = c = 0; d < this._deltaxs.length; d++) c += this._deltaxs[d];
            a = Math.min(Math.max(c / a.currentTarget.offsetWidth * b.videoInfo.totalTime + this._stime, 0), b.videoInfo.totalTime);
            this.setProgress(a);
            this.interactionPanel.show();
            this._ttime = a;
            this._presmx = this._smx;
            this._presmy = this._smy;
            this._presmt = this._smt
        },
        dragging: function(a) {
            a = Math.min(Math.max(60 * ((this._smx - this._sx) / a.currentTarget.offsetWidth) + this._stime, 0), b.videoInfo.totalTime);
            this.setProgress(a);
            this.interactionPanel.show();
            this._ttime = a;
            this._presmx = this._smx;
            this._presmy = this._smy;
            this._presmt = this._smt
        },
        adrAdapt: function(a) {
            d.isAndroid && (this._smx = a.changedTouches[0].clientX, this._smy = a.changedTouches[0].clientY, debug.log("<hr/>adr smy= " + this._smy + " y = " + this._sy))
        },
        isShadowTouchTooShort: function(a) {
            return this.isTouchTooShort({
                x: this._sx,
                y: this._sy
            }, {
                x: this._smx,
                y: this._smy
            }, a)
        },
        isTouchTooShort: function(a, b, d) {
            var e = Math.abs(b.x - a.x),
                e = e || 1.0E-6,
                a = (a = Math.abs(b.y - a.y)) || 1.0E-6;
            debug.log(e + "," + a);
            d = d || 100;
            return e < d && a < d ? !0 : !1
        },
        showLastTimeTip: function(a) {
            0 >= a || this.tipPanel.showLastTimeTip(a)
        },
        uiInit: function() {
            debug.log("uiInit");
            u && (u = !1, this.buttons.videobtn.style.display = "block")
        },
        onResize: function(a) {
            var c = document.getElementById(b.config.parentBox).offsetWidth,
                d = document.getElementById(b.config.parentBox).offsetHeight;
            if (c && (d && b.resizeTag) && (this.player._reporter.sendUserActionReport("xre", "r"), d = this.xplayer.className, this.xplayer && (-1 === d.indexOf("fullscreen") ? this.xplayer.className = w(c) : (c = window.innerWidth, this.xplayer.className = w(c) + " x-player-fullscreen")), this._relatedPanel)) this._relatedPanel.onResize(a)
        }
    };
    var G = function() {
            this.video = b.get("#youku-html5player-video");
            this._startPlayTime = -1;
            this._waitTry = 0
        };
    G.prototype = {
        getVideo: function() {
            return this.video
        },
        show: function() {
            b.show(this.video)
        },
        hide: function() {
            b.hide(this.video)
        },
        play: function() {
            this.video.play()
        },
        pause: function() {
            this.video.pause()
        },
        setupControls: function(a) {
            this.controls && this.controls.removeEvent();
            return new aa(a)
        },
        hideControls: function() {
            this.controls.hide()
        },
        showControls: function() {
            this.controls.show()
        },
        removeControls: function() {
            this.controls.removeControls()
        },
        loadControls: function() {
            this.controls.loadControls()
        },
        retry: function() {},
        showError: function(a) {
            this.errorBox || (this.errorBox = document.createElement("div"), this.errorBox.style.cssText = "position:absolute;width:100%;top:50%;display:none;text-align:center;", this.video.parentNode.appendChild(this.errorBox));
            this.errorBox.innerHTML = a;
            this.errorBox.style.marginTop = "-" + this.errorBox.offsetHeight / 2 + "px";
            this.errorBox.style.display = "block"
        },
        onLoadStart: function() {},
        onCanPlay: function() {},
        onLoadedData: function() {},
        onLoadedMetaData: function() {},
        onAbort: function() {},
        onError: function() {
            this._reporter.sendUserActionReport("xve", "e");
            d.uniReport({
                error: 10,
                vid: b.v.data[0].videoid,
                time: this.currentTime,
                errorcode: this.video.error.code,
                ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
            });
            if (0 <= this._retry--) debug.log("video onerror retry it ,time=" + this.currentTime), this.video.load(), this.video.play(), this.seek(this.currentTime);
            else if (!this._errorTag) {
                d.uniReport({
                    error: 11,
                    errorcode: this.video.error.code,
                    vid: b.v.data[0].videoid,
                    ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
                });
                this._errorTag = !0;
                var a = b.get(".x-container");
                this.controls.removeEvent();
                var c = this;
                setTimeout(function() {
                    c.controls.buttons.videobtn.style.display = "none"
                }, 500);
                this.video.style.display = "none";
                this.video.pause();
                var f = document.createElement("div");
                f.id = "youku-player-error";
                f.style.color = "white";
                f.style.background = "black";
                f.style.width = "100%";
                f.style.height = "100%";
                var e = document.createElement("div");
                e.id = "youku-player-errorMsg";
                e.style.cssText = "width:50%;height:50%;position:absolute;top:40%;left:50%;word-break:break-word;white-space:normal;";
                e.style.marginLeft = "-176px";
                e.innerHTML = "\u62b1\u6b49\uff0c\u60a8\u8bf7\u6c42\u7684\u8d44\u6e90\u5df2\u8fc7\u671f\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u65b0\u89c2\u770b";
                f.appendChild(e);
                a.insertBefore(f, this.video);
                this.controls.buttons.play.className = "start_disabled"
            }
        },
        onPause: function() {
            this.controls.onPause()
        },
        onPlayIPH: function() {
            debug.log("onplayiph");
            this._firstPlayTag || (this._firstPlayTag = !0, this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), this._reporter.sendThirdPartyReport("xplayer_iph"))
        },
        onPlay: function() {
            debug.log("onplay");
            this.controls.onPlay();
            this._firstPlayTag || (this._firstPlayTag = !0, this.onPlayStart(), b.initConfig.firsttime ? (debug.log("starttime = " + b.initConfig.firsttime), this.seek(b.initConfig.firsttime)) : this.seekToLastPoint() || this.skipHead(), this._startPlayTime = (new Date).getTime(), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60))
        },
        onVolumeChange: function() {},
        onPlaying: function() {},
        onStalled: function(a) {
            debug.log("<b>stalled</b>");
            if (this.isOnePiece() || a.target == this.video) this.controls.onWaiting(a)
        },
        onSuspend: function() {
            debug.log("<b>suspend</b>")
        },
        onWaiting: function(a) {
            if (this.isOnePiece() || a.target == this.video) this.controls.onWaiting(a)
        },
        onSeeked: function() {
            debug.log("onSeeked waitSkip=" + this._waitSeek + " try= " + this._waitTry);
            if (!isNaN(this._waitSeek)) {
                var a = this._waitSeek;
                10 < Math.abs(this.video.currentTime - a) && 5 >= this._waitTry ? (this._waitTry += 1, this.seek(a)) : this._waitSeek = "NaN"
            }
        },
        onSeeking: function(a) {
            debug.log("seeking");
            if (this.isOnePiece() || a.target == this.video) {
                var b = this;
                setTimeout(function() {
                    b.controls.onWaiting(a)
                }, 100)
            }
        },
        onDurationChange: function() {},
        onProgress: function() {},
        onRateChange: function() {},
        customWaiting: function() {
            var a = this;
            !1 == this.video.paused && this._lastTime === this.currentTime && (debug.log("custom waiting!:) networkstate=" + this.video.networkState), this.controls.onWaiting());
            this._lastTime = this.currentTime;
            setTimeout(function() {
                a.customWaiting()
            }, 5E3)
        },
        sendLoadedTime: function() {
            var a = 0,
                a = -1 == this._startPlayTime ? 0 : (new Date).getTime() - this._startPlayTime;
            this._reporter.sendLoadedTime(a)
        },
        onTimeUpdate: function(a) {
            if (this.isOnePiece()) this.currentTime = this.video.currentTime;
            else {
                for (var c = 0, d = 0; d < o; d++) c += parseInt(b.videoInfo._videoSegsDic[k][d].seconds);
                this.currentTime = c + this.video.currentTime
            }
            this.controls.onTimeUpdate(a);
            !this._firstflag && 4 == this.video.readyState && (this._firstflag = !0, this.customWaiting(), this.recordLocalPlayPoint(), this.sendLoadedTime());
            this._comscoreflag || (this._comscoreflag = !0, this._reporter.sendThirdPartyReport("xplayer_h5"));
            this.skipTail(this.currentTime)
        },
        curVideo: function() {
            return this.video
        },
        getQuality: function() {
            if ("m3u8" == b.config.content) {
                var a = this.video.src;
                if (-1 !== a.indexOf("mp4")) return "m";
                if (-1 !== a.indexOf("flv")) return "f";
                if (-1 !== a.indexOf("hd2")) return "h"
            } else return "m"
        },
        bufferedEnd: function() {
            var a = this.curVideo().buffered;
            return 0 == a.length ? 0 : a.end(a.length - 1)
        },
        loadNextVideo: function() {
            var a = b.v.data[0].list_next,
                c = this;
            debug.log("loadNextVideo vid = " + a.vidEncoded);
            if (a.vidEncoded) {
                var d = {
                    isFullScreen: !0,
                    vid: a.vid,
                    vidEncoded: a.vidEncoded,
                    Pt: 2 == window.playmode ? a.seq : null
                };
                b.config.nextAutoPlay = !0;
                i.start(a.vidEncoded, "", b.config.content, function(a, b) {
                    c.startPlay(a, b);
                    try {
                        onPlayerStart(d)
                    } catch (h) {
                        console.log("onPlayerStart error")
                    }
                })
            }
        },
        onPlayEnd: function() {
            b.config.events && b.config.events.onPlayEnd && (debug.log("m3u8 playend"), b.config.events.onPlayEnd(b.v.data[0].list_next))
        },
        onPlayStart: function() {
            b.config.events && b.config.events.onPlayStart && (debug.log("api:onplaystart"), b.config.events.onPlayStart())
        },
        onMiddleEnded: function() {
            o++;
            this.video.src = b.multiPieceSrc(o);
            this.video.load();
            this.video.play();
            this.video.style.display = "block";
            debug.log("middle src = " + this.video.src)
        },
        onEnded: function(a) {
            if (this.isOnePiece() || o == b.videoInfo._videoSegsDic[k].length - 1) u = !0, this._reporter.addPlayerDurationReport(61), this._reporter.sendTSLog(61), this.clearLocalPlayPoint(), this.showEndCard(a);
            else this.onMiddleEnded(a)
        },
        showEndCard: function(a) {
            this.video.style.display = "none";
            this.controls.onEnded(a);
            this.onPlayEnd()
        },
        onBeginFullscreen: function() {},
        onEndFullscreen: function() {
            debug.log("end full screen controls = " + this.video.controls)
        },
        detectIsPlaying: function(a) {
            var b = a || 0,
                d = this;
            clearTimeout(this.timeoutTimer);
            0 === this.video.currentTime && 60 >= b && (this.video.load(), this.play(), this.timeoutTimer = setTimeout(function() {
                d.detectIsPlaying(++b)
            }, 1E3))
        },
        isOnePiece: function() {
            return "m3u8" == b.config.content || "mp4" == b.config.content && 1 == b.videoInfo._videoSegsDic[k].length
        },
        bindEvent: function() {
            if (!b.v.data[0].error_code && !b.v.data[0].error) if ("directsrc" == b.config.playType) b.addEventHandler(this.video, "play", b.bindAsEventListener(this, this.onPlayIPH));
            else {
                var a = {
                    loadstart: "onLoadStart",
                    canplay: "onCanPlay",
                    loadeddata: "onLoadedData",
                    loadedmetadata: "onLoadedMetaData",
                    abort: "onAbort",
                    error: "onError",
                    pause: "onPause",
                    waiting: "onWaiting",
                    stalled: "onStalled",
                    suspend: "onSuspend",
                    play: "onPlay",
                    volumechange: "onVolumeChange",
                    playing: "onPlaying",
                    seeked: "onSeeked",
                    seeking: "onSeeking",
                    durationchange: "onDurationChange",
                    progress: "onProgress",
                    ratechange: "onRateChange",
                    timeupdate: "onTimeUpdate",
                    ended: "onEnded",
                    webkitbeginfullscreen: "onBeginFullscreen",
                    webkitendfullscreen: "onEndFullscreen"
                },
                    c;
                for (c in a) b.addEventHandler(this.video, c, b.bindAsEventListener(this, this[a[c]]))
            }
        }
    };
    var o = -1,
        u = !1,
        k = null,
        U = 0,
        V = 600,
        p = {
            flvhd: "\u6807\u6e05",
            flv: "\u6807\u6e05",
            mp4: "\u9ad8\u6e05",
            hd2: "\u8d85\u6e05"
        };
    b.WIN_TYPE = 30;
    b.defaultVideoType = "mp4";
    b.resizeTag = !0;
    b.extend = function(a, b) {
        for (var d in b) a[d] = b[d]
    };
    b.inherits = function(a, b) {
        var d = function() {};
        d.prototype = b.prototype;
        a.prototype = new d;
        a.prototype.constructor = a
    };
    b.bind = function(a, b) {
        return function() {
            return b.apply(a, arguments)
        }
    };
    b.bindAsEventListener = function(a, b) {
        var d = Array.prototype.slice.call(arguments).slice(2);
        return function(e) {
            return b.apply(a, [e || window.event].concat(d))
        }
    };
    b.getCurrentStyle = function(a) {
        return a.currentStyle || document.defaultView.getComputedStyle(a, null)
    };
    b.addEventHandler = function(a, c, d, e) {
        b.config.isMobile && ("click" == c && !e) && (c = "touchend");
        a.addEventListener ? a.addEventListener(c, d, !1) : a.attachEvent ? a.attachEvent("on" + c, d) : a["on" + c] = d
    };
    b.removeEventHandler = function(a, c, d, e) {
        b.config.isMobile && ("click" == c && !e) && (c = "touchend");
        a.removeEventListener ? a.removeEventListener(c, d, !1) : a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = null
    };
    b.show = function(a) {
        a.style.display = "video" === a.tagName.toLowerCase() ? "" : "block"
    };
    b.hide = function(a) {
        a && (a.style.display = "none")
    };
    b.getLeftPosition = function(a) {
        for (var b = a.offsetLeft; a.offsetParent;) a = a.offsetParent, b += a.offsetLeft;
        return b
    };
    b.get = function(a) {
        return document.querySelector(a)
    };
    b.pieceLength = function() {
        return "m3u8" == b.config.content ? 1 : b.videoInfo._videoSegsDic[k].length
    };
    b.multiPieceSrc = function(a) {
        return a >= b.videoInfo._videoSegsDic[k].length ? "" : b.videoInfo._videoSegsDic[k][a].src
    };
    b.getTime = function(a) {
        if (!a) return "00:00";
        var b = Math.floor(a),
            a = b % 60,
            b = Math.floor(b / 60);
        return (10 > b ? "0" + b : b) + ":" + (10 > a ? "0" + a : a)
    };
    b.addClass = function(a, c) {
        b.hasClass(a, c) || (a.className += " " + c)
    };
    b.hasClass = function(a, b) {
        return RegExp("(^| )" + b + "( |$)").test(a.className)
    };
    b.removeClass = function(a, b) {
        a.className = a.className.replace(RegExp("(^| )" + b + "( |$)"), " ").replace(/^\s+|\s+$/g, "")
    };
    b.m3u8src = function(a, b) {
        var d = "http://v.youku.com/player/getM3U8/vid/" + a + "/type/" + b + "/ts/" + parseInt((new Date).getTime() / 1E3);
        return d + "/v.m3u8"
    };
    YoukuHTML5Player = function(a, c) {
        null == a.parentBox && (a.parentBox = "parentBox");
        a.expand && 0 < parseInt(a.width) ? (document.getElementById(a.parentBox).style.width = a.width + "px", document.getElementById(a.parentBox).style.height = a.height + "px") : (a.width = document.getElementById(a.parentBox).offsetWidth, a.height = document.getElementById(a.parentBox).offsetHeight);
        b.config = a;
        var d = document.getElementById(b.config.parentBox),
            e = parseInt(b.config.width);
        parseInt(b.config.height);
        player = '<div id=x-player class="' + w(e) + '">';
        d.innerHTML = player + '<div class="x-container"><div class=x-poster><img></img></div><video id=youku-html5player-video></video><div id="x-video-button"><div class="x-play-ico"></div></div><div class="x-play-loading"></div><div class="x-feedback"><div class=x-information><h1 class=x-title></h1><div class=x-video-state></div></div><div class="x-message"><div class=x-message-txt></div><div class=x-message-btn></div></div><div class="x-payinfo"><div class=x-payinfo-txt><h1><em class=vip></em></h1><p class=x-payinfo-tips></p></div><div class=x-payinfo-btn><button type=button id=x-try class=x-btn>\u514d\u8d39\u8bd5\u770b</button><button type=button id=x-pay class="x-btn x-btn-pay"></button></div></div><div class="x-feedback-mask"></div></div><div class=x-advert><div class=x-advert-info><div class=x-advert-skip><div class=x-advert-txt></div><div class=x-advert-mask></div></div><div class=x-advert-countdown><div class=x-advert-txt></div><div class=x-advert-mask></div></div></div><div class=x-advert-detail><a href=\'javascript:void(0)\'>\u8be6\u7ec6\u4e86\u89e3</a><div class=x-advert-mask></div></div></div><div class=x-interaction-tips></div><div class=x-shadow></div></div><div class="x-dashboard"><div class="x-console"><div class="x-progress"><div class="x-progress-track"><div class="x-progress-load"></div><div class=x-progress-play></div></div><div class="x-progress-seek"><div class="x-seek-handle"><div class="x-seek-handle-btn"></div><div class="x-seek-pointer"><div class="x-seek-pointer-line"></div><div class="x-seek-pointer-arrow"></div><div class="x-seek-pointer-time"></div></div></div></div></div><div class="x-controls"><div class="x-time-display"><span class="x-time-current">00:00</span><span class="x-time-splite">/</span><span class="x-time-duration">00:00</span></div><div class="x-play-control"><button class="x-control-btn"><span id=x-playbtn class="x-playing"></span></button><b class="x-btn-shadow-left"></b><b class="x-btn-shadow-right"></b></div><div class="x-settings"><div class="x-localization"></div><div class="x-quality"></div><div class="x-fullscreen"><button class="x-control-btn" type="button" title="\u5168\u5c4f\u6a21\u5f0f" rol="button"><b class=x-zoomin></b></button><b class="x-btn-shadow-left"></b></div></div></div></div><div class="x-dashboard-mask"></div></div><div class=x-tips></div><div class=x-progress-mini><div class=x-progress-track-mini></div><div class=x-progress-play-mini></div><div class=x-progress-load-mini></div></div></div>';
        G.apply(this, arguments);
        this.video.style.width = "100%";
        this.video.style.height = "100%";
        this.video.style.display = "none";
        this._firstPlayTag = !1;
        this._retry = 2;
        this.uiAdapter()
    };
    b.inherits(YoukuHTML5Player, G);
    b.extend(YoukuHTML5Player.prototype, {
        startPlay: function(a, c, d) {
            a && (a.data && a.data[0]) && (c.abstarttime = (new Date).getTime(), c._playListData = a.data[0], c._user = a.user, b.v = a, b.videoInfo = c, this.setting = {}, b.extend(this.setting, d), a.data[0].error_code || a.data[0].error ? this.processError(a, c, d) : (this.controls = this.setupControls(this), this.controls.init(b.v, b.videoInfo), this.mpieceReport(), this._reporter = new E(this, b.v, b.videoInfo._sid), this._frontAdTag = !1, !this._frontAdTag && "directsrc" != b.config.playType ? (this._frontAdTag = !0, this._adplugin = new $(this, a, b.videoInfo._sid), this.bind_frontAd = b.bindAsEventListener(this, this.onFrontAdInfoOK), this.bind_frontAdInfoTimeout = b.bindAsEventListener(this, this.onFrontAdInfoTimeout), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_OK, this.bind_frontAd, !1), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_TIMEOUT, this.bind_frontAdInfoTimeout), this.bind_backAdInfoOK = b.bindAsEventListener(this, this.onBackAdInfoOK), this.bind_backAdInfoTimeout = b.bindAsEventListener(this, this.onBackAdInfoTimeout), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_OK, this.bind_backAdInfoOK, !1), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_TIMEOUT, this.bind_backAdInfoTimeout), this._adplugin.frontAd(), window[ADConstant.AdPluginObject] = this._adplugin) : this.realStartPlay()))
        },
        onFrontAdInfoTimeout: function() {
            this.realStartPlay(!0)
        },
        onFrontAdInfoOK: function(a) {
            debug.log("onFrontAdInfoOK");
            if (0 == a.data.urls.length) this.realStartPlay();
            else {
                this.adplayer = new F(this, a);
                var b = this;
                this.adplayer.addEventListener(ADConstant.AD_END, function(a) {
                    debug.log("ad end");
                    b._realFlag || (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
                }, !1);
                this.adplayer.addEventListener(ADConstant.AD_ERROR, function(a) {
                    debug.log("<font color=red>ad error</font>");
                    b._realFlag || (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
                }, !1);
                this.createIdNode()
            }
        },
        onBackAdInfoTimeout: function() {
            debug.log("onBackAdInfoTimeout");
            this.showEndCard()
        },
        onBackAdInfoOK: function(a) {
            debug.log("onBackAdInfoOK");
            if (0 == a.data.urls.length) this.showEndCard();
            else {
                this.adplayer = new F(this, a);
                var b = this;
                this.adplayer.addEventListener(ADConstant.AD_END, function() {
                    b.showEndCard()
                });
                this.adplayer.addEventListener(ADConstant.AD_ERROR, function() {
                    b.showEndCard()
                });
                this.adplayer.play()
            }
        },
        prepareVideoTag: function() {
            this.video.preload = "none";
            "m3u8" == b.config.content ? this.video.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[k] && (this.video.src = b.videoInfo._videoSegsDic[k][0].src);
            if ((d.isIPHONE || d.isIPOD) && b.v.data[0].trial) this.video.style.height = "50%", this.video.style.position = "relative", this.video.style.top = "25%";
            this.createIdNode()
        },
        createIdNode: function() {
            if (!document.getElementById(b.config.id)) {
                var a = document.createElement("div");
                a.id = b.config.id;
                document.getElementById(b.config.parentBox).appendChild(a)
            }
        },
        redirect: function() {
            var a = "";
            "m3u8" == b.config.content ? a = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[k] && (a = b.videoInfo._videoSegsDic[k][0].src);
            debug.log("redirect play src=" + a);
            this._reporter.addPlayerStaticReport();
            this._reporter.addPlayerDurationReport(59);
            this._reporter.sendVVLog(59);
            this._reporter.sendTSLog(60);
            this._reporter.sendUserActionReport("xps", "c");
            window.open(a, "", "", !1);
            this.onPlayStart()
        },
        realStartPlay: function(a) {
            debug.log("realStartPlay");
            this.controls.bindEvent();
            this.bindEvent();
            this.prepareVideoTag();
            this.playVideos(a)
        },
        playVideos: function(a) {
            debug.log("playVideos");
            u = !1;
            o = 0;
            this.video.style.display = "block";
            if (b.config.autoplay || b.config.nextAutoPlay || a) this.video.load(), this.video.play()
        },
        processError: function(a) {
            this.feedbackPanel = new D(this, a)
        },
        mpieceReport: function() {
            "mp4" == b.config.content && (b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[k] && 1 < b.videoInfo._videoSegsDic[k].length) && (debug.log("mpiece report"), d.Log(d.MPIECEURL + r({
                partner: b.config.partnerId,
                type: k,
                length: b.videoInfo._videoSegsDic[k].length,
                vid: b.v.data[0].videoid
            })))
        },
        resize_: function(a, c, d) {
            debug.log("resize=" + b.resizeTag);
            c && (d && b.resizeTag && this.controls) && (a = this.controls.xplayer.className, this.controls && this.controls.xplayer && (-1 === a.indexOf("fullscreen") ? this.controls.xplayer.className = w(c) : (c = window.innerWidth, this.controls.xplayer.className = w(c) + " x-player-fullscreen")))
        },
        uiAdapter: function() {
            "index" == b.config.wintype && (b.hide(b.get(".x-localization")), b.hide(b.get(".x-quality")));
            b.get("#x-video-button").className = "x-video-button";
            "m3u8" != b.config.content && b.hide(b.get(".x-quality"));
            var a = this;
            window.addEventListener("resize", function(b) {
                debug.log("window.resize");
                if (a.controls) a.controls.onResize(b)
            }, !1)
        },
        isOutTryDuration: function(a) {
            return this.tryDuration ? a >= this.tryDuration : !1
        },
        replay: function() {
            o = 0;
            this._ireflag = this._comscoreflag = !1;
            this.video.style.display = "block";
            this.isOnePiece() || (this.video.src = b.multiPieceSrc(o));
            this.video.load();
            this.video.play();
            this._reporter.sendVVLog(62);
            this._reporter.sendTSLog(60);
            this._reporter.addPlayerDurationReport(62)
        },
        seekToLastPoint: function() {
            if (d.isAndroid) return !1;
            var a = b.v.data[0].lastpoint / 1E3 || -1,
                c = parseInt(m.getItem(b.v.data[0].videoid + "_playpoint")) || -1,
                f = -1; - 1 != a && -1 != c ? (f = a, 60 > Math.abs(a - c) && (f = c)) : (f = a, -1 == a && (f = c));
            debug.log("lastpoint=" + f);
            a = m.getItem("youku_ignore_lasttime");
            a = parseInt(a) || 0;
            return -1 !== f && 120 <= f && 3 > a && null == b.v.data[0].trial && 600 <= b.v.data[0].seconds ? (this.controls.showLastTimeTip(f), d.isAndroid && (this._waitSeek = f), this.seek(f), !0) : !1
        },
        clearLocalPlayPoint: function() {
            var a = b.v.data[0].videoid;
            clearTimeout(this._recordLPPTimer);
            m.removeItem(a + "_playpoint")
        },
        recordLocalPlayPoint: function() {
            var a = b.v.data[0].videoid,
                c = this.currentTime || 0,
                d = this;
            this._recordLPPTimer = setTimeout(function() {
                d.recordLocalPlayPoint()
            }, 1E4);
            m.removeItem(a + "_playpoint");
            if (600 <= b.v.data[0].seconds && (c < b.v.data[0].seconds - 120 && null == b.v.data[0].trial && 120 <= c) && (m.setItem(a + "_playpoint", c), !this.updatePPVids)) {
                this.updatePPVids = !0;
                c = m.getItem("youku_playpoint_vids") || "";
                if ("" == c) c = a;
                else {
                    for (var c = c.split(":"), e = 0; e < c.length; e++) c[e] == a && (c[e] = "");
                    c.push(a);
                    c = c.join(":");
                    for (e = 0;
                    ":" == c.charAt(e);) e++;
                    c = c.substring(e);
                    c = c.replace(/:(:)+/g, ":")
                }
                a = c.split(":");
                30 < a.length && (debug.log("slice"), m.removeItem(a[0] + "_playpoint"), c = a.slice(1).join(":"));
                debug.log("youku_playpoint_vids=" + c);
                m.setItem("youku_playpoint_vids", c)
            }
        },
        skipHead: function() {
            if (!d.isAndroid) {
                var a = parseInt((b.v.data[0].dvd || {}).head || -1);
                debug.log("skiphead = " + a); - 1 != a && (this.controls.tipPanel.onSkipHead(), "true" == m.getItem("youku_conf_skip") && (d.isAndroid && (this._waitSeek = a / 1E3), this.seek(a / 1E3)))
            }
        },
        skipTail: function(a) {
            if (!d.isAndroid) {
                var c = parseInt((b.v.data[0].dvd || {}).tail || -1); - 1 != c && (a >= c / 1E3 - 10 && !this._tailTip) && (debug.log("skiptail(act before 10) =" + c), this._tailTip = !0, this.controls.tipPanel.onSkipTail()); - 1 != c && (a >= c / 1E3 && !this._tailSkipped) && (this._tailSkipped = !0, "true" == m.getItem("youku_conf_skip") && this.seek(parseInt(b.v.data[0].seconds) - 1))
            }
        },
        assistSkipTail: function(a) {
            var c = parseInt((b.v.data[0].dvd || {}).tail || -1);
            this._tailTip = a >= c / 1E3 ? this._tailSkipped = !0 : this._tailSkipped = !1
        },
        seek: function(a) {
            a = a || 0;
            a = Math.max(a, 0);
            b.videoInfo.totalTime && (a = Math.min(a, b.videoInfo.totalTime - 5));
            this.isOutTryDuration(a) && (a = this.tryDuration - 1);
            this.assistSkipTail(a);
            var c = this;
            this.switchTimer && clearTimeout(this.switchTimer);
            this.currentTime = a;
            if (this.isOnePiece()) {
                var d = this.video.seekable;
                1 == d.length && a < d.end(0) ? (debug.log("seek ct = " + a + ",end = " + d.end(0)), this.seekTo(a)) : (this.controls.onWaiting(), this.switchTimer = setTimeout(function() {
                    c.seek(a)
                }, 100))
            } else debug.log("multi seek"), this.multiSeekTo(a)
        },
        seekTo: function(a) {
            if (this.isOnePiece()) {
                debug.log("is one piece");
                var b = this;
                try {
                    b.video.currentTime = a
                } catch (d) {
                    var e = 0;
                    this.video.addEventListener("canplay", function() {
                        1 !== e && (e = 1, debug.log("canplay time=" + a), b.video.currentTime = a)
                    })
                }
                b.video.paused && b.video.play()
            }
        },
        multiSeekTo_: function() {
            debug.log("YoukuHTML5 ")
        },
        multiSeekTo: function(a) {
            debug.log("YoukuHTML5Player multiSeekTo !");
            for (var c = 0, d = 0, e = 0, g = 0; g < b.videoInfo._videoSegsDic[k].length; g++) {
                var h = parseInt(b.videoInfo._videoSegsDic[k][g].seconds),
                    c = c + h;
                if (c > a) {
                    d = g;
                    e = h - (c - a);
                    break
                } else if (c == a) {
                    d = g + 1;
                    e = 0;
                    break
                }
            }
            this.video.pause();
            if (d == o) {
                debug.log(" piece time = " + e);
                try {
                    this.video.currentTime = e
                } catch (i) {}
            } else {
                o = d;
                var l = 0,
                    m = this;
                this.video.addEventListener("canplay", function() {
                    1 !== l && (l = 1, debug.log("canplay time=" + e), m.video.currentTime = e)
                });
                this.video.src = b.multiPieceSrc(o);
                this.video.load()
            }
            this.video.play();
            this.video.style.display = "block"
        }
    });
    var y = function() {
            return {
                isIPAD: b.isIPAD,
                isIPHONE: b.isIPHONE,
                isIPOD: b.isIPOD,
                isLEPAD: b.isLEPAD,
                support: d.isSupportH5M3U8,
                supportM3U8: d.isSupportH5M3U8,
                supportMP4: d.isSupportH5MP4,
                play: function(a) {
                    var b = new YoukuHTML5Player(a);
                    i.start(a.vid, a.password, a.content, function(a, d) {
                        b.startPlay(a, d)
                    })
                }
            }
        }();
    window.YoukuPlayerSelect = C;
    window.BuildVideoInfo = i;
    window.checkSrc = function() {
        i._fyks.length > i.mp4srcs.length || (clearInterval(i._tid), i.cleanSrc(), i.cache(), null == i._callback ? d.GetMP4OK(i._v, i._videoInfo) : i._callback(i._v, i._videoInfo))
    };
    window.QS = A;
    window.YKP = d;
    window.YKU = z;
    window.YoukuHTML5Player = YoukuHTML5Player;
    window.player5 = y;
    A = document.getElementsByTagName("script");
    for (y = 0; y < A.length; y++) if (-1 !== A[y].src.indexOf("player.youku.com/jsapi")) {
        eval(A[y].innerHTML);
        break
    }
    window.notifyYKU = function() {
        z.swfLoaded = 1
    }
})();