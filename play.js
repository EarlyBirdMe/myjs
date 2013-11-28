//2013-1-25 14:1 chs
typeof sohuTouch == "undefined" && (sohuTouch = {}), sohuTouch.UA = navigator.userAgent, sohuTouch.iOS = !! sohuTouch.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), sohuTouch.Android = sohuTouch.UA.indexOf("Android") > -1, sohuTouch.IE = sohuTouch.UA.indexOf("MSIE") > -1, sohuTouch.play = {
    ourl: "",
    nurl: "",
    nu: "",
    lu: "",
    page: 0,
    index: 0,
    nextPage: function(e) {
        sohuTouch.play.pageGo($("#list p a").index($("#list p a.color3")) + 1, 0)
    },
    prePage: function(e) {
        sohuTouch.play.pageGo($("#list p a").index($("#list p a.color3")) - 1, 1)
    },
    pageGo: function(e, t) {
        if (e >= 0 && $("#list p a").eq(e).length > 0) {
            var n = {
                cellWidth: $("#list .slide li").width(),
                padding: 8
            };
            $("#list p a").removeClass("color3"), $("#list p a").eq(e).addClass("color3"), $("#playlist ul").eq(e).touchslider(n), $("#playlist ul").eq(e)[0].sliderObj && ($("#playlist ul").eq(e)[0].sliderObj.deleTouchEnd = function(t, n) {
                var r = null;
                for (; t <= n; t++) r = $("#playlist ul").eq(e).find("li img").eq(Math.min(t, $("#playlist ul").eq(e).find("li img").length)), r[0] && !r[0].imged && (r.attr("src", r.attr("data-src")), r[0].imged = !0)
            }), $("#playlist ul").eq(e)[0].sliderObj && (t == 1 ? ($("#playlist ul").eq(e)[0].sliderObj.slideTo($("#playlist ul").eq(e).children("li").length - 1), $("#playlist ul").eq(e)[0].sliderObj.deleTouchEnd($("#playlist ul").eq(e).children("li").length - 8, $("#playlist ul").eq(e).children("li").length - 1)) : t == 0 ? $("#playlist ul").eq(e)[0].sliderObj.deleTouchEnd(0, 7) : t == 2 && (e == sohuTouch.play.page ? ($("#playlist ul").eq(e)[0].sliderObj.slideTo(sohuTouch.play.index), $("#playlist ul").eq(e)[0].sliderObj.deleTouchEnd(sohuTouch.play.index - 6, sohuTouch.play.index + 6)) : $("#playlist ul").eq(e)[0].sliderObj.deleTouchEnd(0, 7)), $("#playlist ul").eq(e)[0].sliderObj.slideToBegin = sohuTouch.play.prePage, $("#playlist ul").eq(e)[0].sliderObj.slideToEnd = sohuTouch.play.nextPage), $("#playlist ul").hide().eq(e).show()
        }
    },
    getSimilar: function(e) {
        var t = "";
        cid == "9001" ? (t = "http://search.vrs.sohu.com/p?title=" + escape(escape($(".info h1").text())) + "&source=1&vid=" + vid + "&tag=" + escape(escape($(".info h1").text())) + "&cid=9001&pageNum=1&pageSize=10&var=video_similar_search_result", $("#maylike h2").html("\u76f8\u5173\u63a8\u8350")) : t = "http://search.vrs.sohu.com/v?id=" + vid + "&pid=" + plid + "&pageNum=" + e + "&pageSize=10&isgbk=true&var=video_similar_search_result", sohuHD.getScript(t, function() {
            if (typeof video_similar_search_result == "undefined" || !video_similar_search_result.videos) return;
            var e = [],
                t = video_similar_search_result.videos,
                n;
            if (t.length == 0) {
                $("#maylike").hide();
                return
            }
            $.each(t, function(t, r) {
                r.albumUrl = r.videoUrl || r.albumUrl, r.albumUrl = sohuTouch.formatUrl(r.albumUrl), n = r.horBigPic || r.videoBigPic, e.push('<li><a class="pic" href="' + r.albumUrl + '"><img alt="' + r.videoName + '" data-src="' + n + '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">', '<a href="' + r.albumUrl + '" title="' + r.videoName + '" >' + sohuHD.strSub(r.videoName, 14, !0) + "</a>", "<em>\u64ad\u653e\uff1a", r.videoPlayCount, "</em></span></li>")
            }), $("#likelist").html(e.join("")), $("#maylike a").click(function() {
                (new Image).src = "http://click.hd.sohu.com.cn/s.gif?type=HTML5&ref=" + escape(location.href) + "&_t=" + (new Date).getTime()
            }), $("#maylike .slide ul").touchslider({
                cellWidth: $("#maylike .slide li").width(),
                padding: 8
            }), $("#likelist")[0].sliderObj && ($("#likelist")[0].sliderObj.deleTouchEnd = function(e, t) {
                var n = null;
                for (; e <= t; e++) n = $("#likelist li img").eq(Math.min(e, $("#likelist li img").length)), n[0] && !n[0].imged && (n.attr("src", n.attr("data-src")), n[0].imged = !0)
            }, $("#likelist")[0].sliderObj.deleTouchEnd(0, 7))
        })
    }
}, sohuHD.showLoginWinBox = function() {
    alert("\u8bf7\u5148\u767b\u5f55"), $("body").scrollTop(0), $(".login").is(":hidden") && $(".login_btn").click(), $('input[name="email"]').focus()
}, sohuHD.waitAjaxCall.login.push(function() {
    sohuHD.getScript("http://my.tv.sohu.com/user/a/profile/currinfo.do?varname=gUserParams", function() {
        if (typeof gUserParams != "undefined" && gUserParams.status == "1") {
            data = gUserParams.data, data.nickName = unescape(data.nickName);
            var e = sohuHD.waitAjaxCall.userParms;
            for (var t = 0; t < e.length; ++t) e[t].call(sohuHD)
        }
    })
});
var swfGotoNewPage = function(e) {
        var e = e || "";
        e = sohuTouch.formatUrl(sohuTouch.play.nurl), e && sohuHD.redirect(e)
    },
    drawPlayer = function() {
        var e = function(e) {
                var t = [];
                if (typeof sh_user != "undefined" && sh_user != "0") {
                    var r = e.attr("totalTime");
                    this.isIpad || this.isIphone && !this.isIOSLow ? t.push({
                        url: window.playurl_m3u8 || "",
                        time: r
                    }) : t.push({
                        url: window.playurl_mp4 || "",
                        time: r
                    }), e.attr("playlist", t)
                }
                t = e.attr("playlist");
                if ($(document).getUrlParam("startClient") == "1" || $.cookie("_fromAndroidApp")) t.length && (t = [{
                    url: ["sohuvideo://vid=", vid, "&sid=", plid, "&m3u8=", encodeURIComponent(this.videoInfo.m3u8), "&title=", encodeURIComponent($("div.info>h1").html())].join("")
                }]), $.cookie("_fromAndroidApp", 1, {
                    domain: "m.tv.sohu.com",
                    path: "/"
                }), this.isSBDevice = !0;
                try {
                    sohuTouch.playUrl = t[0].url
                } catch (i) {}
                messagebus.publish("touch.sohu.videoUrl");
                if (this.isSBDevice) {
                    if (t.length > 1) {
                        var s = ['<p style="color:#fff;padding-bottom: 10px;">\u8bf7\u70b9\u51fb\u5e8f\u53f7\u64ad\u653e</p>'];
                        for (var o = 0; o < t.length; ++o) s.push('<a style="color:#fff;padding-right: 10px;font-size: 28px;" href="', t[o].url, '">', o + 1, "</a>");
                        $("#player").html(s.join("")).css({
                            width: "100%",
                            height: n,
                            paddingTop: n / 2,
                            "text-align": "center",
                            fontSize: 20
                        })
                    } else t.length ? $("#player").html(['<a href="', t[0].url, '" style="display:block;height:100%;width:100%;"></a>'].join("")).css({
                        width: "100%",
                        height: n,
                        background: "url(http://tv.sohu.com/upload/touch/skin/images/play@2x.png) center center no-repeat"
                    }) : $("#player").html("\u5bf9\u4e0d\u8d77\uff0c\u8fd9\u4e2a\u89c6\u9891\u6682\u65f6\u4e0d\u652f\u6301\u60a8\u7684\u8bbe\u5907\u64ad\u653e").css({
                        width: "100%",
                        height: n,
                        paddingTop: n / 2,
                        "text-align": "center",
                        fontSize: 20
                    });
                    $("#player").css("backgroundColor", "#000")
                }
            },
            t = window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
        if (!t) setTimeout(drawPlayer, 10);
        else {
            var n = 0;
            sohuTouch.iOS ? n = t * 9 / 16 : navigator.userAgent.search(/Android.4/) > -1 ? n = t / window.devicePixelRatio * 9 / 16 : sohuTouch.IE ? n = $("body").width() * 9 / 16 : $("body").width() == t ? n = t * 9 / 16 : $("body").width() < 1e3 ? n = window.screen.height - $("header").height() - 35 : n = t * 9 / 16;
            var r = !0;
            typeof sh_user != "undefined" && typeof sh_feeuser != "undefined" && sh_user != "0" && sh_feeuser == "0" && (r = !1);
            var i = !1;
            typeof sh_user != "undefined" && sh_user != "0" && (i = !0), cid == "9001" && typeof from != "undefined" && from == "0" ? $("#player").append(showVrsPlayer({
                bid: vid,
                playerID: "_i_player",
                autoplay: r,
                getHTML: 1,
                width: "100%",
                height: n,
                noipadbar: !0,
                api_key: "f351515304020cad28c92f70f002261c",
                onVideoReady: function(t) {
                    e.call(this, t)
                },
                enforceMP4: i
            })) : $("#player").append(showVrsPlayer({
                vid: vid,
                playerID: "_i_player",
                pid: pid,
                autoplay: r,
                getHTML: 1,
                width: "100%",
                height: n,
                noipadbar: !0,
                api_key: "f351515304020cad28c92f70f002261c",
                onVideoReady: function(t) {
                    e.call(this, t)
                },
                enforceMP4: i
            }))
        }
    };
messagebus.wait(["touch.sohu.videoUrl", "touch.sohu.playlist"], function() {
    var e = sohuTouch.playUrl;
    $("#notplay").remove(), $("#list").is(":visible") ? $("#list>h2").append(['<a id="notplay" href="', e, '" style="display:block;">\u65e0\u6cd5\u64ad\u653e?</a>'].join("")) : $("#maylike>h2").append(['<a id="notplay" href="', e, '" style="display:block;">\u65e0\u6cd5\u64ad\u653e?</a>'].join(""))
}, window, null, {}), drawPlayer();
var videoList = function(e) {
        if (typeof e == "undefined" || !e.videos) {
            $("#list").hide(), messagebus.publish("touch.sohu.playlist");
            return
        }
        var t = [],
            n = [],
            r, i, s = e.videos.length,
            o = e.videos,
            u = "",
            a = cid,
            f = 20,
            l = 0;
        if (s > 1) {
            f = s <= f ? s : f, l = s % f > 0 ? parseInt(s / f) + 1 : parseInt(s / f);
            for (var c = 0; c < l; c++) {
                var h = c * f,
                    p = (c + 1) * f;
                c + 1 == l && (p = p > s ? s : p);
                var d = c == 0 ? ' class="color3"' : "";
                n.push("<li><a" + d + ' rel="', c + 1, '" href="javascript:sohuTouch.play.pageGo(', c, ', 2);">' + (h + 1 == p ? p : h + 1 + "-" + p) + "</a></li>")
            }
            $("#list >p").html("<ul>" + n.join("") + "</ul>"), $("#list >p ul").css("width", ($("#list >p li").outerWidth(!0) + 10) * $("#list >p").find("li").length / 10 + "rem"), l == 1 && $("#list >p").hide();
            for (var v = 0; v < l; v++) {
                t.push('<div><ul class="vlist">');
                var m = (v + 1) * f > s ? s : (v + 1) * f;
                for (var g = v * f; g < m; g++) if (vid == o[g].vid) {
                    sohuTouch.play.page = v, sohuTouch.play.index = g - v * f, t.push('<li class="active"><a class="pic" rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '"><img data-src="', o[g].largePicUrl, '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">'), a == 2 || a == 16 ? (u = o[g].subName ? o[g].subName : o[g].name, t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">\u7b2c', parseInt(o[g].order) < 10 ? "0" + o[g].order : o[g].order, "\u96c6</a>", "<em></em>")) : a == 7 || a == 6 ? (u = o[g].subName ? o[g].subName : o[g].name, t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">', sohuHD.strSub(u, 24), "</a><span>", o[g].publishTime.replace(/-/g, ""), "</span>")) : (u = o[g].subName ? o[g].subName : o[g].name, t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">', sohuHD.strSub(u, 28, !0), "</a>")), t.push("</span></li>"), r = o[g].order, i = g + 1, sohuTouch.play.nu = o[g + 1] != undefined ? o[g + 1].vid : "", sohuTouch.play.lu = o[g - 1] != undefined ? o[g - 1].vid : "";
                    var y = o[g + 1] != undefined ? o[g + 1].pageUrl : "",
                        b = o[g + 1] != undefined ? o[g + 1].name : "";
                    sohuTouch.play.nurl = y, vrsHitoryInfo = {
                        order: o[g].order,
                        curl: o[g].pageUrl,
                        title: o[g].name,
                        nurl: y,
                        nextname: b
                    }, sohuTouch.play.ourl = o[g].pageUrl, sohuTouch.play.ourl != "" && $(".pchome").attr("href", sohuTouch.play.ourl + "#pc").show(), a == 2 || a == 16 || a == 1 ? e.totalSet == e.updateSet ? $("#list>h2>span").html("\u5171" + e.totalSet + "\u96c6") : e.totalSet > e.updateSet && $("#list>h2>span").html("\u5171" + e.totalSet + "\u96c6 \u66f4\u65b0\u81f3" + e.updateSet + "\u96c6") : a != "7" && a != "6" && a != "26" && a != "8" && $("#list>h2").html("\u4e13\u8f91\u5217\u8868")
                } else t.push('<li><a class="pic" rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '"><img data-src="', o[g].largePicUrl, '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">'), a == "2" || a == "16" ? t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">\u7b2c', parseInt(o[g].order) < 10 ? "0" + o[g].order : o[g].order, "\u96c6</a>", "<em></em>") : a == "7" || a == "6" ? (u = o[g].subName ? o[g].subName : o[g].name, t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">', sohuHD.strSub(u, 24), "</a><span>", o[g].publishTime.replace(/-/g, ""), "</span>")) : (u = o[g].subName ? o[g].subName : o[g].name, t.push('<a rel="', o[g].vid, '" href="', sohuTouch.formatUrl(o[g].pageUrl), '">', sohuHD.strSub(u, 32, !0), "</a>")), t.push("</span></li>");
                t.push("</ul></div>")
            }
            $("#playlist").html(t.join("")), $.each($("#playlist ul"), function() {
                $(this).css("width", ($("#playlist li").outerWidth(!0) + 10) * $(this).find("li").length / 10 + "rem")
            }), $("#list p ul").touchslider({
                cellWidth: $("#list p ul li").width(),
                padding: 4
            }), $("#list p ul")[0].sliderObj && $("#list p ul")[0].sliderObj.slideTo(l), sohuTouch.play.pageGo(sohuTouch.play.page, 2)
        } else s == 1 && (sohuTouch.play.ourl = o[0].pageUrl, sohuTouch.play.nurl = "", sohuTouch.play.ourl != "" && $(".pchome").attr("href", sohuTouch.play.ourl + "#pc").show(), vrsHitoryInfo = {
            order: o[0].order,
            curl: o[0].pageUrl,
            title: o[0].name,
            nurl: "",
            nextname: ""
        }), $("#list").hide();
        sohuTouch.play.ourl == "" && location.href.indexOf("m.tv.sohu.com/v") < 0 && $(".pchome").attr("href", location.href.replace("m.tv", "tv") + "#pc").show(), messagebus.publish("touch.sohu.playlist")
    },
    videoListB = function(e) {
        if (typeof e.data == "undefined" || !e.data.list) {
            $("#list").hide(), messagebus.publish("touch.sohu.playlist");
            return
        }
        var t = "http://my.tv.sohu.com/u/pw/",
            n = [],
            r = e.data.list.length,
            i = e.data.list,
            s = "",
            o;
        $("#list >p").html('<ul><li><a rel="1" href="javascript:sohuTouch.play.pageGo(0, 2);">1-20</a></li></ul>'), $("#list >p ul").css("width", ($("#list >p li").outerWidth(!0) + 10) * $("#list >p").find("li").length / 10 + "rem"), $("#list >p").hide(), $("#list>h2").html("\u4e13\u8f91\u5217\u8868");
        if (r > 1) {
            n.push('<div><ul class="vlist">');
            for (var u = 0; u < r; u++) {
                o = t + i[u].playlistId + "_1_" + (u + 1);
                if (vid == i[u].videoId) {
                    sohuTouch.play.page = 0, sohuTouch.play.index = u, n.push('<li class="active"><a class="pic" rel="', i[u].videoId, '" href="', sohuTouch.formatUrl(o), '"><img data-src="', i[u].smallPic, '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">'), s = i[u].title, n.push('<a rel="', i[u].videoId, '" href="', sohuTouch.formatUrl(o), '">', sohuHD.strSub(s, 28, !0), "</a>"), n.push("</span></li>"), sohuTouch.play.nu = i[u + 1] != undefined ? i[u + 1].vid : "", sohuTouch.play.lu = i[u - 1] != undefined ? i[u - 1].vid : "";
                    var a = i[u + 1] != undefined ? t + i[u + 1].playlistId + "_1_" + (u + 2) : "",
                        f = i[u + 1] != undefined ? i[u + 1].name : "";
                    sohuTouch.play.nurl = a, vrsHitoryInfo = {
                        order: u,
                        curl: t + i[u].playlistId + "_1_" + (u + 1),
                        title: i[u].name,
                        nurl: a,
                        nextname: f
                    }, sohuTouch.play.ourl = o, sohuTouch.play.ourl != "" && $(".pchome").attr("href", sohuTouch.play.ourl + "#pc").show()
                } else n.push('<li><a class="pic" rel="', i[u].videoId, '" href="', sohuTouch.formatUrl(o), '"><img data-src="', i[u].smallPic, '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">'), s = i[u].title, n.push('<a rel="', i[u].videoId, '" href="', sohuTouch.formatUrl(o), '">', sohuHD.strSub(s, 32, !0), "</a>"), n.push("</span></li>")
            }
            n.push("</ul></div>"), $("#playlist").html(n.join("")), $.each($("#playlist ul"), function() {
                $(this).css("width", ($("#playlist li").outerWidth(!0) + 10) * $(this).find("li").length / 10 + "rem")
            }), $("#list p ul").touchslider({
                cellWidth: $("#list p ul li").width(),
                padding: 4
            }), $("#list p ul")[0].sliderObj && $("#list p ul")[0].sliderObj.slideTo(_pageT), sohuTouch.play.pageGo(sohuTouch.play.page, 2)
        } else r == 1 && (sohuTouch.play.ourl = t + i[0].playlistId, sohuTouch.play.nurl = "", sohuTouch.play.ourl != "" && $(".pchome").attr("href", sohuTouch.play.ourl + "#pc").show(), vrsHitoryInfo = {
            order: 0,
            curl: t + i[0].playlistId,
            title: i[0].title,
            nurl: "",
            nextname: ""
        }), $("#list").hide();
        sohuTouch.play.ourl == "" && location.href.indexOf("m.tv.sohu.com/v") < 0 && $(".pchome").attr("href", location.href.replace("m.tv", "tv") + "#pc").show(), messagebus.publish("touch.sohu.playlist")
    },
    videoListC = function(e) {
        if (!e || !e.videos || e.updateSet <= 1) {
            $("#list").hide(), sohuTouch.play.ourl = location.href.replace("m.tv", "my.tv"), sohuTouch.play.nurl = "", vrsHitoryInfo = {
                order: 0,
                curl: sohuTouch.play.ourl,
                title: $("#video .info h1").text(),
                nurl: "",
                nextname: ""
            }, messagebus.publish("touch.sohu.playlist");
            return
        }
        var t = [],
            n = e.videos.length,
            r = e.videos,
            i = "";
        if (n > 1) {
            t.push('<div><ul class="vlist">');
            for (var s = 0; s < n; s++) vid == r[s].vid && (sohuTouch.play.index = s), t.push("<li ", vid == r[s].vid ? ' class="active"' : "", '><a class="pic" rel="', r[s].vid, '" href="', sohuTouch.formatUrl(r[s].pageUrl), '"><img data-src="', r[s].largePicUrl, '" src="http://tv.sohu.com/upload/touch/skin/images/loading43.png" /></a>', '<span class="text">'), i = r[s].subName ? r[s].subName : r[s].name, t.push('<a rel="', r[s].vid, '" href="', sohuTouch.formatUrl(r[s].pageUrl), '">', sohuHD.strSub(i, 28, !0), "</a>"), t.push("</span></li>");
            t.push("</ul></div>"), $("#playlist").html(t.join("")), $("#playlist ul").css("width", ($("#playlist li").outerWidth(!0) + 10) * $("#playlist li").length / 10 + "rem"), sohuTouch.play.page = 0, sohuTouch.play.pageGo(sohuTouch.play.page, 2);
            var o = "",
                u = "";
            $("#playlist li.active").next().length > 0 && (sohuTouch.play.nu = $("#playlist li.active").next().find("a.pic").attr("rel"), o = $("#playlist li.active").next().find("a").attr("href"), u = $("#playlist li.active").next().find("span a").text()), $("#playlist li.active").prev().length > 0 && (sohuTouch.play.lu = $("#playlist li.active").prev().find("a.pic").attr("rel")), sohuTouch.play.nurl = o, vrsHitoryInfo = {
                order: 0,
                curl: location.href,
                title: $("#video .info h1").text(),
                nurl: o,
                nextname: u
            }, sohuTouch.play.ourl = location.href.replace("http://m.tv", "http://my.tv")
        }
        sohuTouch.play.ourl != "" && $(".pchome").attr("href", sohuTouch.play.ourl + "#pc").show(), $("#list>h2").html("\u4e13\u8f91\u5217\u8868"), messagebus.publish("touch.sohu.playlist")
    };
window.openApp = function(e) {
    var t = document.getElementById("_i_player");
    t && t.pause();
    var n = (new Date).getTime();
    window.setTimeout(function() {
        (new Date).getTime() - n < 1200 && confirm("\u8bf7\u786e\u8ba4\u662f\u5426\u5df2\u5b89\u88c5\u641c\u72d0\u89c6\u9891\u5ba2\u6237\u7aef\uff1f\n\u5df2\u5b89\u88c5\uff1aiOS \u7cfb\u7edf\u51fa\u9519\u5bfc\u81f4\u65e0\u6cd5\u6253\u5f00\uff0c\u8bf7\u91cd\u542f\u60a8\u7684\u7cfb\u7edf\uff1b\n\u672a\u5b89\u88c5\uff1a\u731b\u51fb\u201c\u597d\u201d\u7acb\u5373\u5b89\u88c5!") && (sohuTouch.iphone ? document.location = "http://itunes.apple.com/cn/app/id458587755?mt=8" : sohuTouch.ipad && (document.location = "http://itunes.apple.com/cn/app/id414430589?mt=8"))
    }, 1e3), window.location = e
}, $(function() {
    if ($(document).getUrlParam("back") != null) {
        $("header .logo").hide();
        var e = $(document).getUrlParam("back"),
            t = $("header .back");
        switch (e) {
        case "app_ipad":
            t.attr("href", "javascript:window.openApp('sohu-SViPad://');");
            break;
        case "app_iphone":
            t.attr("href", "javascript:window.openApp('sohuvideo-iphone://');");
            break;
        default:
            t.attr("href", "javascript:history.go(-1);")
        }
        t.show()
    }
    typeof sh_user != "undefined" && typeof sh_feeuser != "undefined" && typeof order_url != "undefined" && sh_user == "1" && (sh_feeuser == "0" ? ($("#video").prepend('<div class="liantong">\u6b22\u8fce\u8ba2\u8d2d\u7531\u4e0a\u6d77\u8054\u901a\u63d0\u4f9b\u7684\u201c\u641c\u72d0\u8054\u901a\u7248\u201d\u4e1a\u52a1\u3002\u4fe1\u606f\u8d39\uff1a10\u5143/\u6708(\u542b\u89c6\u9891\u6d41\u91cf\u53ca\u5185\u5bb9\u7684\u8d39\u7528)\u3002 \u8be6\u60c5\u8bf7\u54a8\u8be2\uff1a10010&nbsp;<a href="http://m.tv.sohu.com/shgz/">\u8be6\u7ec6\u89c4\u5219</a><br /><a class="btn">\u7acb\u5373\u5f00\u901a</a></div>'), $("#video .liantong a.btn").click(function() {
        window.open(order_url)
    })) : sh_feeuser == "1" && $("#video").append('<div class="liantong">\u60a8\u5df2\u7ecf\u8ba2\u8d2d\u201c\u641c\u72d0\u8054\u901a\u7248\u201d\u4e1a\u52a1\uff0c\u529f\u80fd\u8d39\u5df2\u542b\u89c6\u9891\u6d41\u91cf\u548c\u5185\u5bb9\u8d39\u7528\u3002<a href="http://m.tv.sohu.com/shgz/">\u8be6\u7ec6\u89c4\u5219</a></div>'));
    if (cid == "9001") if (location.href.indexOf("/pl/") > -1) {
        var n = vid;
        typeof from != "undefined" && from == "1" && (n = "v" + vid), $("#list>p").html('<ul><li><a href="javascript:sohuTouch.play.pageGo(0, 2);" rel="1" class="">1-20</a></li></ul>').hide(), sohuHD.getScript("http://my.tv.sohu.com/play/getvideolist.do?playlistid=" + plid + "&pagesize=20&callback=videoListC&vid=" + n)
    } else location.href.indexOf("/us/") > -1 ? ($("#list").hide(), messagebus.publish("touch.sohu.playlist")) : sohuHD.getScript("http://my.tv.sohu.com/user/a/playlist/getvideos.do?playlistId=" + plid + "&size=20&pg=1&callBack=videoListB");
    else sohuHD.getScript("http://m.tv.sohu.com/videolist?playlistid=" + plid + "&callback=videoList");
    sohuTouch.play.getSimilar(1), window.onresize = function() {
        var e = window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
        navigator.userAgent.search(/Android.4/) > -1 ? playHeight = e / window.devicePixelRatio * 9 / 16 : $("body").width() == e && sohuTouch.Android ? $("#_i_player").css("height", $("body").width() * 9 / 160 + "rem") : sohuTouch.IE && $("#_i_player").css("height", $("body").width() * 9 / 16 + "px"), $("#list .slide ul:visible").each(function() {
            this.sliderObj && (this.sliderObj.resize($(".slide li").width(), 8), $("#list p a").index($("#list p a.color3")) == sohuTouch.play.page ? (this.sliderObj.slideTo(sohuTouch.play.index), this.sliderObj.deleTouchEnd(sohuTouch.play.index - 6, sohuTouch.play.index + 6)) : this.sliderObj.deleTouchEnd(0, 7))
        }), $("#maylike .slide ul")[0].sliderObj && $("#maylike .slide ul")[0].sliderObj.resize($(".slide li").width(), 8), $("#list p ul")[0] && $("#list p ul")[0].sliderObj && $("#list p ul")[0].sliderObj.resize($("#list p ul li").width(), 4)
    }, $("header .nav_btn").length > 0 && $("header .nav_btn").bind(sohuTouch.startEvent, function(e) {
        var t = $("#nav").css("display") == "block";
        return t ? $("#nav").hide() : ($("#history").hide(), $("#search").hide(), $("#login .login").hide(), $("#nav").show()), e.preventDefault(), !1
    }), $("#intro_btn").click(function() {
        $("#video .share").is(":visible") && ($("#video .share").hide(), $("#share_btn").toggleClass("share_btn_active")), $("#collect_btn").hasClass("collect_btn_active") && $("#collect_btn").removeClass("collect_btn_active"), $("#video .intro").toggle(), $("#intro_btn").toggleClass("intro_btn_active")
    }), $("#share_btn").click(function() {
        $("#video .intro").is(":visible") && ($("#video .intro").hide(), $("#intro_btn").toggleClass("intro_btn_active")), $("#collect_btn").hasClass("collect_btn_active") && $("#collect_btn").removeClass("collect_btn_active"), $("#video .share").toggle(), $("#share_btn").toggleClass("share_btn_active")
    }), $("#video .share a,#video .btn span a").click(function() {
        jump($(this).attr("rel"), null, sohuTouch.play.ourl, document.title.replace(" - \u641c\u72d0\u89c6\u9891", "").split("#")[0])
    }), $("#collect_btn").click(function(e) {
        e && e.preventDefault();
        var t = "";
        cid == "9001" ? t = "" : t = "&pid=" + pid;
        var n = ["http://my.tv.sohu.com/user/third/bookmark.do?vid=", vid, t, "&url=", encodeURIComponent(sohuTouch.play.ourl), "&title=", escape(document.title.split("-")[0].replace(/\u300a|\u300b/g, ""))].join("");
        PassportSC.cookieHandle() ? sohuTouch.Android ? sohuHD.redirect(n, "_blank") : window.open(n, "sohushare", "toolbar=0,status=0,resizable=1,width=615,height=505,left=" + (screen.width - 615) / 2 + ",top=" + (screen.height - 505) / 2) : sohuHD.showLoginWinBox(), $(this).addClass("collect_btn_active"), $("#video .intro").is(":visible") && ($("#video .intro").hide(), $("#intro_btn").toggleClass("intro_btn_active")), $("#video .share").is(":visible") && ($("#video .share").hide(), $("#share_btn").toggleClass("share_btn_active"))
    });
    var r = function(e) {
            var t = e;
            return e == 1 ? t = 1e3 : e == 9001 && typeof from != "undefined" && from == "1" && typeof videoType != "undefined" && (t = videoType), t
        },
        i = function() {
            var e = plid;
            return cid == 9001 && (from == "1" ? e = vrs_playlistid : e = uid), e
        },
        s = new tvComment({
            playListId: i(),
            filmType: r(cid),
            vid: vid,
            pageType: "more",
            cPageSize: 5,
            nid: ""
        });
    s.config.commentBox = $("#remark"), s.config.cTotalBox = $("#totalCommentsCount"), s.config.cNonBox = "<li class='last nocom'>\u6682\u65e0\u8bc4\u8bba</li>", s.textArea = ["<div>", '<div class="box l">', '<a href="http://my.tv.sohu.com/user/" tag="userLink"  class="mypic"><img tag="userPic" width="30" height="30" class="bd" src="http://tv.sohu.com/upload/space/skin/imgs/avatar_s.jpg"></a>', '<div class="areatxt l">', "<em></em>", '<div tag="textarea"></div>', '<div class="btn">', '<span class="r">', '<input type="button" value="\u53d1 \u5e03" class="btn_send"  tag= "submit"/>', "</span>", '<span class="inTip l">\u8fd8\u53ef\u4ee5\u8f93\u5165<b tag="txtCount"></b>\u5b57</span>', "</div>", "</div>", "</div>", "</div>"].join(""), s.cMainMoudel = ["<li>", '<div class="pic l">', '<a href="{userLink}"><img class="bd" alt="{nickName}" src="{headPic}"></a>', "</div>", '<div class="text">', '<a href="{userLink}" class="s1">{nickName}\uff1a</a>{content}', '<div class="time"><span class="source">\u6765\u81ea\u4e8e\uff1a<a href="{fromUrl}" target="_blank">{fromName}</a>{userAgent}&nbsp;&nbsp;\u901a\u8fc7<a href="{agentFromUrl}" target="_blank">{agentFromName}</a>{/userAgent}</span><span>{createTime}</span></div>', "</div>", "</li>"].join(""), s.cBoxHtml = ['<div class="remark">', '<div class="inputBox" tag="textareaBox"></div>', '<ul id="commentsCList" class="commlist" tag="cListBox" >', "</ul>", "</div>", '<div class="page_more" tag="pagesNavBox">', "</div>"].join(""), s.getPageHtml = function(e, t) {
        if (e < t) var n = '<a href="#" page="' + (e + 1) + '">\u663e\u793a\u66f4\u591a</a>';
        else var n = "";
        return n
    }, s.config.cLoadHtml = '<img src="http://tv.sohu.com/upload/touch/skin/images/loading@2x.gif" id="commloading" />', s.drawCommentBox(), s.initComment();
    var o = !1,
        u = null,
        a = function() {
            event.targetTouches[0].pageY + $(window).height() - event.targetTouches[0].clientY >= $(document).height() + 10 && (o = !0)
        },
        f = function() {
            o && (sohuTouch.iOS && sohuTouch.IOS6 ? (s.config.commentBox.find("[page]").click(), o = !1) : u == null && (u = setTimeout(function() {
                s.config.commentBox.find("[page]").click(), o = !1, u = null
            }, 50)))
        };
    document.addEventListener && (document.addEventListener("touchmove", a), document.addEventListener("touchend", f))
})