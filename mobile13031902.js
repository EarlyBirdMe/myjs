/*! mm | Date: Tue Mar 19 2013 19:12:27 GMT+0800 (CST) */
String.prototype._shift_en = function(e) {
    var t = e.length,
        n = 0;
    return this.replace(/[0-9a-zA-Z]/g, function(r) {
        var i = r.charCodeAt(0),
            s = 65,
            o = 26;
        i >= 97 ? s = 97 : i < 65 && (s = 48, o = 10);
        var u = i - s;
        return String.fromCharCode((u + e[n++ % t]) % o + s)
    })
}, function(e) {
    e.sohuHD || (e.sohuHD = {});
    if (sohuHD.passport) return;
    var t = function() {
            this.logoutTimes = 0, this.loginTimes = 0
        };
    t.prototype = {
        getAppid: function() {
            return this.getInfo().appid || ""
        },
        getPassport: function() {
            return this.getInfo().userid || ""
        },
        getUid: function() {
            return this.getInfo().uid || ""
        },
        getUUID: function() {
            return this.getInfo().uuid || ""
        },
        getQname: function() {
            return this.getInfo().uniqname || ""
        }
    }, t.prototype.b64_423 = function(e) {
        var t = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"),
            n = new String;
        for (var r = 0; r < e.length; r++) {
            for (var i = 0; i < 64; i++) if (e.charAt(r) == t[i]) {
                var s = i.toString(2);
                n += ("000000" + s).substr(s.length);
                break
            }
            if (i == 64) return r == 2 ? n.substr(0, 8) : n.substr(0, 16)
        }
        return n
    }, t.prototype.b2i = function(e) {
        var t = 0,
            n = 128;
        for (var r = 0; r < 8; r++, n /= 2) e.charAt(r) == "1" && (t += n);
        return String.fromCharCode(t)
    }, t.prototype.b64_decodex = function(e) {
        var t = new Array,
            n, r = "";
        for (n = 0; n < e.length; n += 4) r += this.b64_423(e.substr(n, 4));
        for (n = 0; n < r.length; n += 8) t += this.b2i(r.substr(n, 8));
        return t
    }, t.prototype.utf8to16 = function(e) {
        var t, n, r, i, s, o, u, a, f;
        t = [], i = e.length, n = r = 0;
        while (n < i) {
            s = e.charCodeAt(n++);
            switch (s >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t[r++] = e.charAt(n - 1);
                break;
            case 12:
            case 13:
                o = e.charCodeAt(n++), t[r++] = String.fromCharCode((s & 31) << 6 | o & 63);
                break;
            case 14:
                o = e.charCodeAt(n++), u = e.charCodeAt(n++), t[r++] = String.fromCharCode((s & 15) << 12 | (o & 63) << 6 | u & 63);
                break;
            case 15:
                switch (s & 15) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o = e.charCodeAt(n++), u = e.charCodeAt(n++), a = e.charCodeAt(n++), f = (s & 7) << 18 | (o & 63) << 12 | (u & 63) << 6 | (a & 63) - 65536, 0 <= f && f <= 1048575 ? t[r] = String.fromCharCode(f >>> 10 & 1023 | 55296, f & 1023 | 56320) : t[r] = "?";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    n += 4, t[r] = "?";
                    break;
                case 12:
                case 13:
                    n += 5, t[r] = "?"
                }
            }
            r++
        }
        return t.join("")
    }, t.prototype.selectInfo = function() {
        var e = ["ppinf", "ppinfo", "passport"],
            t, n, r;
        for (t = 0, n = e.length; t < n; t++) {
            r = (new RegExp("\\b" + e[t] + "\\b=(.*?)(?:$|;)")).exec(document.cookie);
            if (r && r.length) {
                r = r[1];
                break
            }
        }
        return r
    }, t.prototype.decodeInfo = function(e) {
        var t;
        try {
            e = unescape(e).split("|");
            if (e[0] == "1" || e[0] == "2") t = this.utf8to16(this.b64_decodex(e[3]));
            return t
        } catch (n) {}
    }, t.prototype.analyzeInfo = function(e) {
        e = e || "";
        var t = {},
            n, r, i;
        try {
            e = e.split("|");
            for (n = 0, r = e.length; n < r; n++) i = e[n].split(":"), i.length > 1 && (t[i[0]] = i[2])
        } catch (s) {}
        return t
    }, t.prototype.getInfo = function() {
        return this.analyzeInfo(this.decodeInfo(this.selectInfo()))
    }, sohuHD.passport = new t
}(window), function(e, t) {
    var n = function(e) {
            e = e || {};
            var t = e.width || "100%",
                n = e.height || "100%",
                r = e.noControls,
                i = e.poster,
                s = e.preload || "auto",
                o = e.noLoop,
                u = e.autoplay,
                a = {};
            a.unCheckFile = e.unCheckFile;
            var f = document.createElement("div");
            f.style.display = "none";
            var l = document.body || document.documentElement;
            l.appendChild(f);
            var c = "player" + sohuHD.random();
            sohuHD.playerlist.push(c), f.innerHTML = ['<video style="background:#000;" id="', c, '"', ' width="', t, '" height="', n, '"', r ? "" : " controls", u ? " autoplay" : "", ' preload="', s, '"', ">", '<p width="', t, '" height="', n, '">your device do not surpport video</p>', "</video>"].join(""), a.player = f.getElementsByTagName("video")[0];
            if (!a.player) a.tips = f.getElementsByTagName("p")[0], a.noplayer = {}, a.attr = function(e, t) {
                if (!t) return a.noplayer[e];
                a.noplayer[e] = t
            };
            else {
                a.attr = function(e, t) {
                    if (!t) return a.player[e];
                    a.player[e] = t
                };
                var h = ["loadstart", "progress", "suspend", "abort", "error", "stalled", "play", "pause", "loadedmetadata", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"];
                a.eventsHandler = {
                    trigger: function(e, t) {
                        var n = this[e];
                        if (n && n.length) for (var r = 0; r < n.length; ++r) n[r].callback.call(a.player, t), n[r].once && n.splice(r, 1)
                    }
                };
                var p = function(e) {
                        var t = this;
                        return t.eventsHandler[e] = [], t.player.addEventListener ? t.player.addEventListener(e, function(n) {
                            t.eventsHandler.trigger(e, n)
                        }) : t.player.attachEvent && t.player.attachEvent(e, function(n) {
                            t.eventsHandler.trigger(e, n)
                        }), t[e] = function(n, r) {
                            if (n) {
                                var i = {};
                                i.callback = n, r && (r.namespace && (i.namespace = r.namespace), i.once = r.once), t.eventsHandler[e].push(i)
                            } else t.eventsHandler.trigger(e, "this is self event")
                        }, t
                    };
                for (var d = 0; d < h.length; ++d) {
                    var v = h[d];
                    p.call(a, v)
                }
                a.events = [], a.bind = function(e, t, n) {
                    e = e.split("."), a[e[0]](t, {
                        namespace: e[1] || "",
                        once: n.once
                    })
                }, a.unbind = function(e) {
                    e = e.split(".");
                    var t = a.eventsHandler[e[0]];
                    if (t && t.length && e[1]) for (var n = 0; n < t.length; ++n) t[n].namespace == e[1] && t.splice(n, 1)
                }, a.buffered = function() {
                    var e = {
                        start: 0,
                        end: 0
                    },
                        t = this.player;
                    if (t.buffered.length) for (var n = 0; n < t.buffered.length; n++) e.start = Math.round(t.buffered.start(n)), e.end = Math.round(t.buffered.end(n));
                    return e
                }, a.playVideo = function() {
                    var e = this.attr("playlist");
                    if (e instanceof Array) return e && e.length && (/mp4|ogg|m3u8/ig.test(e[0].url) || this.unCheckFile ? (this.attr("src", e[0].url), this.player.innerHTML = ['<a href="', e[0].url, '"', ' style="width:', this.player.parentNode.clientWidth, "px;height:", this.player.parentNode.clientHeight, "px;", 'display:block;background:url(http://tv.sohu.com/upload/touch/skin/images/play@2x.png) no-repeat center center;"></a>'].join("")) : this.player.parentNode.innerHTML = "\u5bf9\u4e0d\u8d77\uff0c\u6b64\u89c6\u9891\u6682\u4e0d\u652f\u6301\u60a8\u7684\u8bbe\u5907\u89c2\u770b!", e.splice(0, 1), this.attr("playlist", e)), this;
                    throw new Error("html5 video playlist must be array")
                }
            }
            return a
        },
        r = ["qf1.hd.sohu.com.cn", "qf2.hd.sohu.com.cn"];
    r = r[Math.round(Math.random() * 10) % 2];
    var i = 44;
    t.prototype.isIOS ? t.prototype.isIpad ? i = 4 : i = 41 : t.prototype.isAndroid ? i = 42 : t.prototype.isIEMobile && (i = 43), sohuHD.pingbackArr = [];
    var s = function(e) {
            var t = new Image;
            t.src = e, sohuHD.pingbackArr.push(t)
        };
    t.prototype.qfVV = function(e) {
        var t = this.flashVarsObj.sid,
            n = this.flashVarsObj.vid,
            o = this.flashVarsObj.nid,
            u = this.flashVarsObj.hotVrs;
        s(["http://", r, "/dov.do?method=stat&pt=", i, "&seekto=0", "&error=0&code=2&allno=0&vvmark=1", "&sid=", t, "&vid=", n, "&nid=", o, "&totTime=", e, "&ref=", encodeURIComponent(location.href), "&dom=", encodeURIComponent(u), "&t=", sohuHD.random()].join(""))
    }, t.prototype.qfAbort = function() {
        var e = this.flashVarsObj.sid,
            t = this.flashVarsObj.vid,
            n = this.flashVarsObj.nid,
            o = this.flashVarsObj.hotVrs;
        s(["http://", r, "/dov.do?method=stat&pt=", i, "&seekto=0", "&code=4&error=800&allno=1&drag=-1", , "&sid=", e, "&vid=", t, "&nid=", n, "&ref=", encodeURIComponent(location.href), "&dom=", encodeURIComponent(o), "&t=", sohuHD.random()].join(""))
    }, t.prototype.qfError = function() {
        var e = this.flashVarsObj.sid,
            t = this.flashVarsObj.vid,
            n = this.flashVarsObj.nid,
            o = this.flashVarsObj.hotVrs;
        s(["http://", r, "/dov.do?method=stat&pt=", i, "&seekto=0", "&error=500&code=2&allno=1&vvmark=0", , "&sid=", e, "&vid=", t, "&nid=", n, "&ref=", encodeURIComponent(location.href), "&dom=", encodeURIComponent(o), "&t=", sohuHD.random()].join(""))
    }, t.prototype.qfBuffer = function(e) {
        if (e != 1 && e != 4) return;
        _e("buffer");
        var t = this.flashVarsObj.sid,
            n = this.flashVarsObj.vid,
            o = this.flashVarsObj.nid,
            u = this.flashVarsObj.hotVrs;
        s(["http://", r, "/dov.do?method=stat&pt=", i, "&seekto=0", "&code=5&bufno=1&allbufno=", e, "&sid=", t, "&vid=", n, "&nid=", o, "&ref=", encodeURIComponent(location.href), "&dom=", encodeURIComponent(u), "&t=", sohuHD.random()].join(""))
    };
    var o = function(e) {
            return document.getElementById(e || "")
        },
        u = function() {
            if (this == e) throw new Error(0, "HttpRequest is unable to call as a function.");
            var t = this,
                n = !1,
                r = !1,
                i, s = function() {
                    t.onreadystatechange && t.onreadystatechange.call(i);
                    if (i.readyState == 4) {
                        if (Number(i.status) >= 300) {
                            t.onerror && t.onerror.call(i, new Error(0, "Http error:" + i.status + " " + i.statusText)), r ? i.onreadystatechange = Function.prototype : i.onReadyStateChange = Function.prototype, i = null;
                            return
                        }
                        t.status = i.status, t.statusText = i.statusText, t.responseText = i.responseText, t.responseBody = i.responseBody, t.responseXML = i.responseXML, t.readyState = i.readyState, r ? i.onreadystatechange = Function.prototype : i.onReadyStateChange = Function.prototype, i = null, t.onfinish && t.onfinish()
                    }
                },
                o = function() {
                    var t;
                    try {
                        i = new e.XMLHttpRequest, r = !0
                    } catch (t) {
                        var n = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"],
                            s = function() {
                                var e;
                                for (var t = 0; t < n.length; t++) {
                                    try {
                                        var i = new ActiveXObject(n[t]);
                                        r = !1
                                    } catch (e) {
                                        continue
                                    }
                                    return i
                                }
                                throw {
                                    message: "XMLHttp ActiveX Unsurported."
                                }
                            };
                        try {
                            i = new s, r = !1
                        } catch (t) {
                            throw new Error(0, "XMLHttpRequest Unsurported.")
                        }
                    }
                };
            o(), this.abort = function() {
                i.abort()
            }, this.getAllResponseHeaders = function() {
                i.getAllResponseHeaders()
            }, this.getResponseHeader = function(e) {
                i.getResponseHeader(bstrHeader)
            }, this.open = function(e, r, s, o, u) {
                n = s;
                try {
                    i.open(e, r, s, o, u)
                } catch (a) {
                    if (!t.onerror) throw a;
                    t.onerror(a)
                }
            }, this.send = function(e) {
                try {
                    r ? i.onreadystatechange = s : i.onReadyStateChange = s, i.send(e), n || (this.status = i.status, this.statusText = i.statusText, this.responseText = i.responseText, this.responseBody = i.responseBody, this.responseXML = i.responseXML, this.readyState = i.readyState, r ? i.onreadystatechange = Function.prototype : i.onReadyStateChange = Function.prototype, i = null)
                } catch (o) {
                    if (!t.onerror) throw o;
                    t.onerror(o)
                }
            }, this.setRequestHeader = function(e, t) {
                i.setRequestHeader(e, t)
            }
        },
        a = function(e, t) {
            var n = new u;
            n.onfinish = function() {
                var e = (new Function("return " + this.responseText))();
                t(e)
            }, n.open("get", e, !0), n.send(null)
        },
        f = function(t, n) {
            var r = this,
                i = "jsonp" + sohuHD.random();
            t.indexOf("callback=?") > -1 && (t = t.replace("callback=?", "callback=" + i), e[i] = function(t) {
                n(t);
                try {
                    delete e[i]
                } catch (r) {}
            }, sohuHD.getScript(t + "&_=" + sohuHD.random(), null, null, r.qfError))
        };
    t.prototype.getHTML5 = function(t) {
        var r = this,
            i = r.flashVarsObj,
            u = sohuHD.cookie("SUV"),
            l = !1,
            c = !1,
            h = i.api_key,
            p = i.ltype,
            d = i.autoplay;
        i.id && (l = !0);
        if (p != "" && typeof p != "undefined") {
            c = !0;
            if (r.isAndroidHigh) r.isSBDevice = !0;
            else if (!r.isIOS) return r.enforceFlash = !0, o(t).innerHTML = r.getFlashHtml(), !1
        }
        var v = i.vid || i.id,
            m = i.nid || "",
            g = i.sid || u,
            y = i.pid || i.playListId || e.PLAYLIST_ID;
        _e("mytvid:" + i.id), _e("vid:" + i.vid), _e("ltype:" + i.ltype);
        var b = r.width,
            w = r.height,
            E = b,
            S = w,
            x = /^-?\d+(?:px)?$/i;
        x.test(E) && (E += "px"), x.test(S) && (S += "px");
        var T = function(t) {
                var r = this,
                    i = t.totalTime;
                r.qfVV(i);
                var o = r.flashVarsObj.vid || r.flashVarsObj.id,
                    u = r.flashVarsObj.nid,
                    a = r.flashVarsObj.pid,
                    f = r.flashVarsObj.sid,
                    l = r.flashVarsObj.api_key,
                    c = encodeURIComponent(r.videoInfo.company || ""),
                    h = r.videoInfo.cateid || "",
                    p = r.videoInfo.catecode || "",
                    v = r.videoInfo.systype || "",
                    m = r.videoInfo.type,
                    g = r.videoInfo.ltype || 0,
                    y = r.videoInfo.vtitle || "",
                    E = encodeURIComponent(document.referrer),
                    S = encodeURIComponent(location.href);
                s(["http://b.scorecardresearch.com/b?c1=1&c2=7395122&c3=&c4=&c5=&c6=&c11=", f].join("")), s(["http://count.vrs.sohu.com/count/stat.do?videoId=", o, "&apikey=", l, "&t=", sohuHD.random()].join("")), s(["http://pb.hd.sohu.com.cn/hdpb.gif?cts=isow&msg=playCount&isHD=0&time=0&ua=h5", "&sid=", f, "&uid=", f, "&pid=", a, "&vid=", o, "&nid=", u, "&type=", m, "&msg=playCount&isp2p=0&ltype=", g, "&company=", c, "&url=", S, "&td=", i, "&cateid=", h, "&refer=", E, "&systype=", v, "&catcode=", p, "&apikey=", l, "&t=", sohuHD.random()].join(""));
                var x = t.box,
                    T = t.playlist,
                    N = n({
                        width: b,
                        height: w,
                        autoplay: d,
                        unCheckFile: t.unCheckFile
                    });
                N.attr("playlist", T), N.attr("totalTime", i);
                var C = r.eventObj.onVideoReady;
                C && C.call(r, N);
                if (r.isSBDevice || !N || !N.player) {
                    if (T.length > 1) {
                        var k = ["\u8bf7\u70b9\u51fb\u64ad\u653e"];
                        for (var L = 0; L < T.length; ++L) k.push(' <a style="color:#fff;" href="', T[L], '">', L + 1, "</a>");
                        x.innerHTML = k.join("")
                    } else x.innerHTML = ['<a href="', T[0].url, '" style="display:block;height:100%;width:100%;"></a>'].join(""), x.style.backgroundImage = "url(http://tv.sohu.com/upload/touch/skin/images/play@2x.png)", x.style.backgroundPosition = "center center", x.style.backgroundRepeat = "no-repeat";
                    return null
                }
                var A = N.player;
                x.innerHTML = "", x.appendChild(A), N.playVideo(), N.ended(function() {
                    var e = N.attr("playlist");
                    return e && e.length ? N.playVideo() : swfGotoNewPage(), this
                }), N.abort(function() {
                    r.qfAbort()
                }), A.bufferCount = -1, N.playing(function() {
                    ++this.bufferCount
                }, {
                    once: !0
                }), N.playing(function() {
                    var e = this;
                    e.playing = !0, setTimeout(function() {
                        e.playing = !1
                    }, 3e3)
                }), N.playing(function() {
                    setInterval(function() {
                        _e("heart"), s(["http://pb.hd.sohu.com.cn/stats.gif?isHD=0&isp2p=0", "&url=", S, "&refer=", E, "&url=", S, "&systype=", v, "&vid=", o, "&pid=", a, "&nid=", u, "&catcode=", p, "&ua=h5&&uid=", f, "&tc=", O, "&type=vrs&cateid=", h, "&apikey=", l, "&userid=t=", sohuHD.random()].join(""))
                    }, 12e4)
                }, {
                    once: !0
                }), N.ended(function() {
                    setInterval(function() {
                        _e("end"), s(["http://pb.hd.sohu.com.cn/stats.gif?isHD=0&isp2p=0&msg=videoEnds", "&url=", S, "&refer=", E, "&url=", S, "&systype=", v, "&vid=", o, "&pid=", a, "&nid=", u, "&catcode=", p, "&ua=h5&&uid=", f, "&tc=", O, "&type=vrs&cateid=", h, "&apikey=", l, "&userid=t=", sohuHD.random()].join(""))
                    }, 12e4)
                });
                if (t.type == "tv") {
                    var O = parseInt(A.currentTime);
                    if (sohuHD.passport.getPassport()) {
                        var M = function() {
                                sohuHD.passport.getPassport() && s(["http://his.tv.sohu.com/his/ping.do?c=21&vid=", o, "&sid=", e.PLAYLIST_ID ? e.PLAYLIST_ID : e.VRS_ALBUM_ID, "&t=", O, "&_=", sohuHD.random()].join(""))
                            };
                        N.bind("playing.cloudHistory", function() {
                            this.cloudHistory = setInterval(function() {
                                M()
                            }, 12e4), M()
                        }, {
                            once: !0
                        })
                    } else {
                        var _ = function() {
                                try {
                                    var e = getVrsPlayerHistory(o, a, parseInt(A.currentTime), i, y)
                                } catch (t) {}
                            };
                        N.bind("playing.history", function() {
                            this.history = setInterval(_, 3e4), _()
                        }, {
                            once: !0
                        })
                    }
                }
                return N.waiting(function() {
                    if (this.playing || this.bufferCount < 0) return;
                    r.qfBuffer(this.bufferCount), ++this.bufferCount
                }), N
            };
        r.videoInfo = {};
        var N = "";
        if (l) {
            var C = "http://my.tv.sohu.com/videinfo.jhtml?m=viewtv&vid=" + v;
            r.flashVarsObj.hotVrs = C, a(C, function(n) {
                _e(n);
                var i = o(t);
                if (n && n.data && n.data.su) {
                    var s = [];
                    e._videoInfo && (r.videoInfo.cateid = _videoInfo.cateId), r.videoInfo.catecode = n.catcode, r.videoInfo.type = "my";
                    var u = n.data.su,
                        a = n.allot,
                        f = n.data.clipsDuration;
                    N = ["http://my.tv.sohu.com/ipad/", v, ".m3u8"].join(""), r.videoInfo.m3u8 = N;
                    if (r.isIpad || r.isAndroidHigh || r.isIphone && !r.isIOSLow) s.push({
                        url: N,
                        time: f[0]
                    });
                    else for (var l = 0; l < u.length; ++l) s.push({
                        url: ["http://", a, u[l], "?type=2"].join(""),
                        time: f[l]
                    });
                    T.call(r, {
                        type: "mytv",
                        box: i,
                        totalTime: n.data.totalDuration,
                        playlist: s
                    })
                } else r.qfError(), i.innerHTML = n.mytvmsg
            })
        } else if (c) {
            var k = ["http://live.tv.sohu.com/live/player_json.jhtml?callback=?&lid=", v, "&af=1&bw=524&type=", p, "&g=8&ipad=1"].join("");
            r.flashVarsObj.hotVrs = k, r.videoInfo.type = "vrs", r.videoInfo.ltype = p, f(k, function(e) {
                var n = o(t);
                if (e && e.data && e.data.clipsURL) {
                    var i = [],
                        s = e.data.clipsURL[0] || "";
                    /m3u8/ig.test(s) ? (N = ["http://", s].join(""), i.push({
                        url: N,
                        time: e.data.totalDuration
                    }), r.videoInfo.m3u8 = N) : i.push({
                        url: ["http://", s, "&type=hls"].join(""),
                        time: Infinity
                    }), T.call(r, {
                        type: "live",
                        box: n,
                        playlist: i,
                        totalTime: Infinity,
                        unCheckFile: !0
                    })
                } else r.qfError(), n.innerHTML = "\u5bf9\u4e0d\u8d77\uff0c\u6b64\u89c6\u9891\u6682\u4e0d\u652f\u6301\u60a8\u7684\u8bbe\u5907\u89c2\u770b!"
            })
        } else {
            var L = "jsonp" + sohuHD.random(),
                C = ["http://hot.vrs.sohu.com/vrs_flash.action?var=", L, "&gbk=true"];
            e.fkey && C.push("&fkey=", fkey), C.push("&vid=", v, "&pid=", y), C = C.join(""), _e(C), r.flashVarsObj.hotVrs = C, sohuHD.getScript(C, function() {
                var n = e[L],
                    i = o(t);
                if (n && n.data && n.data.su) {
                    var s = [];
                    r.videoInfo.cateid = n.caid, r.videoInfo.catecode = n.catcode, r.videoInfo.systype = n.systype, r.videoInfo.type = n.vt == "1" ? "vrs" : "vms", r.videoInfo.company = n.company, r.videoInfo.vtitle = n.data.tvName;
                    var u = (new Date).getTime().toString();
                    N = ["http://hot.vrs.sohu.com/ipad", v, "_", u._shift_en([23, 12, 131, 1321]), "_", v.toString()._shift_en([23, 12, 131, 1321]), ".m3u8"], e.fkey && N.push("?fkey=", fkey), N = N.join(""), r.videoInfo.m3u8 = N;
                    if (r.isIpad || r.isAndroidHigh || r.isIphone && !r.isIOSLow) s = [{
                        url: N,
                        time: n.data.totalDuration
                    }], T.call(r, {
                        type: "tv",
                        box: i,
                        totalTime: n.data.totalDuration,
                        playlist: s
                    });
                    else {
                        var a = ["http://api.tv.sohu.com/video/playinfo/", v, ".json?callback=?&encoding=gbk&api_key=f351515304020cad28c92f70f002261c&from=mweb"].join("");
                        f(a, function(e) {
                            var i = o(t);
                            if (e && e.data && e.data.downloadurl) T.call(r, {
                                type: "tv",
                                box: i,
                                totalTime: e.data.totalDuration,
                                playlist: [{
                                    url: e.data.downloadurl,
                                    time: e.data.totalDuration
                                }]
                            });
                            else {
                                var u = n.data.su,
                                    a = n.allot,
                                    f = n.data.clipsDuration,
                                    l = n.data.ck;
                                if (u && u.length && u[0]) {
                                    for (var c = 0; c < u.length; ++c) s.push({
                                        url: ["http://", a, u[c], "?type=2&key=", l[c]].join(""),
                                        time: f[c]
                                    });
                                    T.call(r, {
                                        type: "tv",
                                        box: i,
                                        totalTime: n.data.totalDuration,
                                        playlist: s
                                    })
                                } else i.innerHTML = "\u5bf9\u4e0d\u8d77\uff0c\u6b64\u89c6\u9891\u6682\u4e0d\u652f\u6301\u60a8\u7684\u8bbe\u5907\u89c2\u770b!"
                            }
                        })
                    }
                } else r.qfError(), i.innerHTML = "\u5bf9\u4e0d\u8d77\uff0c\u6b64\u89c6\u9891\u6682\u4e0d\u652f\u6301\u60a8\u7684\u8bbe\u5907\u89c2\u770b!"
            })
        }
    }
}(window, SWFObject);