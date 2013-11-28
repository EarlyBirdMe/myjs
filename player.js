function sec2min(c) {
    c = Math.floor(Math.round(c));
    var b = 0;
    var a = 0;
    b = Math.floor(c / 60);
    c = c % 60;
    if (b < 10) {
        b = "" + b
    }
    if (c < 10) {
        c = "0" + c
    }
    return (b + ":" + c)
}
function loading(b, a) {
    this.canvas = b;
    if (a) {
        this.radius = a.radius || 12;
        this.circleLineWidth = a.circleLineWidth || 4;
        this.circleColor = a.circleColor || "rgba(0,153,222,0.3)";
        this.moveArcColor = a.moveArcColor || 'rgba(0,153,222,0.8)"'
    } else {
        this.radius = 12;
        this.circelLineWidth = 4;
        this.circleColor = "#94dcf6";
        this.moveArcColor = "#0099de"
    }
}
loading.prototype = {
    show: function() {
        var c = document.getElementById("canvas");
        c.style.display = "block";
        var d = this.canvas;
        if (!d.getContext) {
            return
        }
        if (d.__loading) {
            return
        }
        d.__loading = this;
        var b = d.getContext("2d");
        var a = this.radius;
        var f = this;
        var g = Math.PI * 1.5;
        var e = Math.PI / 6;
        d.loadingInterval = setInterval(function() {
            d.width = c.clientWidth;
            d.height = c.clientWidth;
            b.clearRect(0, 0, d.width, d.height);
            var i = f.circleLineWidth;
            var h = {
                x: d.width / 2,
                y: d.height / 2
            };
            b.beginPath();
            b.lineWidth = i;
            b.strokeStyle = f.circleColor;
            b.arc(h.x, h.y, a, 0, Math.PI * 2);
            b.closePath();
            b.stroke();
            b.beginPath();
            b.strokeStyle = f.moveArcColor;
            b.arc(h.x, h.y, a, g, g + Math.PI * 0.45);
            b.stroke();
            g += e
        }, 60)
    },
    hide: function() {
        var b = document.getElementById("canvas");
        b.style.display = "none";
        var c = this.canvas;
        c.__loading = false;
        if (c.loadingInterval) {
            window.clearInterval(c.loadingInterval)
        }
        var a = c.getContext("2d");
        if (a) {
            a.clearRect(0, 0, c.width, c.height)
        }
    }
};
$.cookie = function(b, j, m) {
    if (typeof j != "undefined") {
        m = m || {};
        if (j === null) {
            j = "";
            m.expires = -1
        }
        var e = "";
        if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
            var f;
            if (typeof m.expires == "number") {
                f = new Date();
                f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
            } else {
                f = m.expires
            }
            e = "; expires=" + f.toUTCString()
        }
        var l = m.path ? "; path=" + m.path : "";
        var g = m.domain ? "; domain=" + m.domain : "";
        var a = m.secure ? "; secure" : "";
        document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
    } else {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var k = document.cookie.split(";");
            for (var h = 0; h < k.length; h++) {
                var c = jQuery.trim(k[h]);
                if (c.substring(0, b.length + 1) == (b + "=")) {
                    d = decodeURIComponent(c.substring(b.length + 1));
                    break
                }
            }
        }
        return d
    }
};

function S4() {
    return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
}
function loadPlayer(player, param) {
    DEBUG__ = true;
    DEBUG__ = false;
    if (!DEBUG__) {
        window.console = {};
        window.console.log = function() {}
    }
    var _guid = "jlhmijc8idqpohnmsjpqaceuv0";
    var PlayerParam = {
        segSeekIsReady: false,
        seekOffsetSeconds: 1,
        seekSuccessSeconds: 0,
        offset_seconds: 0,
        seg: [],
        segIndex: 0,
        current_seconds: param.history ? param.history : 0,
        video_duration: 0,
        startX: 0,
        seekBarStartX: 0,
        player_progress_bar_width: 0,
        player_progress_position_width: 0,
        vid: param.vid,
        showid: param.showid ? param.showid : "",
        guid: hex_md5(_guid),
        poster: param.poster ? param.poster : "",
        title: param.title,
        supportHTML5Video: false,
        isIOS: false,
        os: "",
        portrait: param.portrait,
        landscape: param.landscape,
        isAutoAdapterScreen: param.isAutoAdapterScreen,
        isPlayStart: false,
        isPlayEnd: false,
        noVideoFormat: false,
        idle: 0,
        fullScreen: false,
        videoCss: "",
        isSupportAutoPlay: true,
        last_seconds: -100,
        stopPlayIdle: 0,
        isFirstPlay: true,
    };

    function adapterVideoSize() {
        try {
            var videoDiv = document.getElementById("video_player_area");
            var tmpv = document.getElementById("youku_html5_video");
            var sw = 0;
            var sh = 0;
            var cw = 0;
            var ch = 0;
            var user_agent = window.navigator.userAgent;
            if (user_agent.indexOf("Android 4") != -1 && user_agent.indexOf("Chrome") == -1) {
                sw = window.screen.width;
                sh = window.screen.height
            } else {
                sw = window.innerWidth;
                sh = window.innerHeight + 1
            }
            sw = document.documentElement.clientWidth;
            sh = document.documentElement.clientHeight + 1;
            var capr = 0;
            var vapr = 16 / 9;
            if (tmpv.videoWidth > 0 && tmpv.videoHeight > 0) {
                vapr = tmpv.videoWidth / tmpv.videoHeight
            }
            var cw = document.body.clientWidth;
            var playerBox = document.getElementById(player);
            if (!PlayerParam.isAutoAdapterScreen) {
                cw = playerBox.clientWidth;
                sw = cw;
                ch = playerBox.clientHeight;
                sh = ch
            }
            capr = sw / sh;
            if (sw < sh) {
                ch = Math.round(cw / vapr);
                tmpv.style.width = cw + "px";
                tmpv.style.height = ch + "px";
                if (vapr > 16 / 9) {
                    videoDiv.style.width = cw + "px";
                    videoDiv.style.height = cw * 9 / 16 + "px"
                } else {
                    videoDiv.style.width = cw + "px";
                    videoDiv.style.height = ch + "px"
                }
            } else {
                ch = Math.round(cw / capr);
                if (vapr >= capr) {
                    tmpv.style.width = cw + "px";
                    tmpv.style.height = Math.round(cw / vapr) + "px";
                    videoDiv.style.width = cw + "px";
                    videoDiv.style.height = Math.round(cw / capr) + "px"
                } else {
                    tmpv.style.width = Math.round(ch * vapr) + "px";
                    tmpv.style.height = ch + "px";
                    videoDiv.style.width = cw + "px";
                    videoDiv.style.height = ch + "px"
                }
            }
        } catch (e) {
            console.log(e)
        }
        var player_progress_bar = document.getElementById("player_progress_bar");
        PlayerParam.player_progress_bar_width = player_progress_bar.clientWidth;
        updatePlayerProgress(PlayerParam.current_seconds, PlayerParam.video_duration, true);
        if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
            if (PlayerParam.portrait) {
                fullScreen(false);
                PlayerParam.portrait()
            }
        } else {
            if (PlayerParam.landscape) {
                fullScreen(true);
                PlayerParam.landscape()
            }
        }
    }
    function clickVideo() {
        if (PlayerParam.noVideoFormat || !PlayerParam.supportHTML5Video) {
            return
        }
        PlayerParam.idle = 0;
        if (youku_html5_control.style.visibility == "hidden" || !youku_html5_control.style.visibility) {
            showControlsTitle(true)
        } else {
            showControlsTitle(false)
        }
    }
    function showControlsTitle(isShow) {
        var youku_html5_control = document.getElementById("youku_html5_control");
        var youku_html5_title = document.getElementById("youku_html5_title");
        if (isShow) {
            youku_html5_control.style.visibility = "visible";
            youku_html5_title.style.visibility = "visible"
        } else {
            youku_html5_control.style.visibility = "hidden";
            youku_html5_title.style.visibility = "hidden"
        }
    }
    function fullScreen(isFull) {
        if (isFull) {
            var tmp = document.getElementById("toptitle");
            tmp.style.display = "none";
            tmp = document.getElementsByClassName("diff_button")[0];
            tmp.style.display = "none";
            tmp = document.getElementById("related");
            tmp.style.display = "none";
            tmp = document.getElementById("channel_module");
            tmp.style.display = "none";
            tmp = document.getElementsByClassName("channel_bottom_advertise")[0];
            tmp.style.display = "none";
            tmp = document.getElementsByClassName("hotword")[0];
            tmp.style.display = "none";
            tmp = document.getElementsByClassName("bottom")[0];
            tmp.style.display = "none"
        } else {
            var tmp = document.getElementById("toptitle");
            tmp.style.display = "block";
            tmp = document.getElementsByClassName("diff_button")[0];
            tmp.style.display = "block";
            tmp = document.getElementById("related");
            tmp.style.display = "block";
            tmp = document.getElementById("channel_module");
            tmp.style.display = "block";
            tmp = document.getElementsByClassName("channel_bottom_advertise")[0];
            tmp.style.display = "block";
            tmp = document.getElementsByClassName("hotword")[0];
            tmp.style.display = "block";
            tmp = document.getElementsByClassName("bottom")[0];
            tmp.style.display = "block"
        }
    }
    function addListener() {
        console.log("---addListener---");
        var v = document.getElementById("youku_html5_video");
        var player_progress_bar = document.getElementById("player_progress_bar");
        PlayerParam.player_progress_bar_width = player_progress_bar.clientWidth;
        PlayerParam.player_progress_position_width = 0;
        console.log(PlayerParam);
        var player_progress_position = document.getElementById("player_progress_position_touch_area");
        console.log(player_progress_position);
        player_progress_position.addEventListener("touchstart", seekStart, false);
        player_progress_position.addEventListener("touchmove", seekMove, false);
        player_progress_position.addEventListener("touchend", seekEnd, false);
        var player_progress_bar = document.getElementById("player_progress_bar_touch_area");
        console.log(player_progress_bar);
        player_progress_bar.addEventListener("touchstart", clickProgressStart, false);
        player_progress_bar.addEventListener(PlayerParam.isMobile ? "touchend" : "click", clickProgressEnd, false);
        var play_btn_div = document.getElementById("play_btn_div");
        var youku_html5_control = document.getElementById("youku_html5_control");
        var youku_html5_title = document.getElementById("youku_html5_title");
        play_btn_div.addEventListener(PlayerParam.isMobile ? "touchend" : "click", clickVideo, false);
        var btn_fullscreen = document.getElementById("btn_fullscreen");
        btn_fullscreen.addEventListener(PlayerParam.isMobile ? "touchend" : "click", function(e) {
            try {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation()
                }
            } catch (e) {
                console.log(e)
            }
            var v = document.getElementById("youku_html5_video");
            try {
                if (v.webkitSupportsFullscreen) {
                    v.webkitEnterFullscreen()
                }
            } catch (e) {
                console.log(e)
            }
        });
        var btn_play = document.getElementById("btn_play");
        btn_play.addEventListener(PlayerParam.isMobile ? "touchend" : "click", function(e) {
            console.log("---play---");
            if (PlayerParam.supportHTML5Video) {
                var t = document.getElementById("youku_html5_video");
                if (t.paused) {
                    if (PlayerParam.isPlayEnd) {
                        PlayerParam.isPlayEnd = false;
                        getRealPlayUrl(PlayerParam.seg[PlayerParam.segIndex].url, true)
                    } else {
                        t.play()
                    }
                } else {
                    t.pause()
                }
            }
        }, false);
        var play_icon = document.getElementById("play_icon");
        play_icon.addEventListener(PlayerParam.isMobile ? "touchend" : "click", function() {
            if (PlayerParam.supportHTML5Video) {
                if (PlayerParam.isSupportAutoPlay) {
                    PlayerParam.isSupportAutoPlay = false
                }
                v.play();
                showLoading(true)
            } else {
                console.log("--download play----");
                var downLoadUrl = "http://m.youku.com/smartphone/pvs?vid=" + PlayerParam.vid + "&format=3gphd&stat_down_=download_play";
                console.log(downLoadUrl);
                $.get("http://m.youku.com/exter/stat/mlog.html", {
                    type: "download_play",
                    vid: PlayerParam.vid,
                }, function(response, status, xhr) {}, "json");
                window.location.href = downLoadUrl
            }
        }, false);
        if (PlayerParam.supportHTML5Video) {
            var youku_html5_video = document.getElementById("youku_html5_video");
            v.addEventListener("timeupdate", timeupdate, false);
            v.addEventListener("progress", progress, false);
            v.addEventListener("waiting", function(e) {
                console.log(e.type);
                showLoading(true)
            }, false);
            v.addEventListener("suspend", function(e) {
                console.log(e.type)
            }, false);
            v.addEventListener("abort", function(e) {
                console.log(e.type)
            }, false);
            v.addEventListener("stalled", function(e) {
                console.log(e.type)
            }, false);
            v.addEventListener("error", function(e) {
                console.log(e.type)
            }, false);
            v.addEventListener("playing", function(e) {
                console.log(e.type)
            });
            v.addEventListener("play", function(e) {
                console.log(e.type);
                btn_play.style["background-image"] = 'url("http://m.youku.com/exter/images/btn_pause.png")';
                if (play_icon.style.display != "none") {
                    play_icon.style.display = "none"
                }
                if (PlayerParam.isFirstPlay) {
                    PlayerParam.isFirstPlay = false;
                    try {
                        video_vv_begin(PlayerParam.vid, PlayerParam.showid, 200, PlayerParam.isSupportAutoPlay)
                    } catch (e) {
                        console.log(e)
                    }
                    showLoading(true)
                }
            }, false);
            v.addEventListener("pause", function(e) {
                console.log(e.type);
                btn_play.style["background-image"] = 'url("http://m.youku.com/exter/images/btn_play.png")';
                showLoading(false);
                showControlsTitle(true)
            }, false);
            v.addEventListener("seeking", play, false);
            v.addEventListener("seeked", play, false);
            v.addEventListener("ended", ended, false);
            v.addEventListener("canplaythrough", function(e) {}, false);
            v.addEventListener("canplay", function(e) {}, false);
            v.onwebkitfullscreenchange = function(e) {
                console.log(e);
                console.log(document.webkitIsFullScreen)
            }
        }
        window.onbeforeunload = function() {
            try {
                if (!isPlayEnded()) {
                    video_vv_end(PlayerParam.vid, PlayerParam.current_seconds, false, "cancel")
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    function isPlayEnded() {
        return (PlayerParam.current_seconds > 0 && PlayerParam.video_duration > 0 && PlayerParam.video_duration - PlayerParam.current_seconds <= 3)
    }
    function ended(e) {
        var v = e.target;
        PlayerParam.segIndex++;
        if (PlayerParam.segIndex < PlayerParam.seg.length) {
            getRealPlayUrl(PlayerParam.seg[PlayerParam.segIndex].url, true)
        } else {
            PlayerParam.isPlayEnd = true;
            PlayerParam.segIndex = 0;
            var play_icon = document.getElementById("play_icon");
            play_icon.style.display = "block";
            try {
                video_vv_end(PlayerParam.vid, PlayerParam.current_seconds, isPlayEnded(), "ended")
            } catch (e) {
                console.log(e)
            }
            if (PlayerParam.video_duration - PlayerParam.current_seconds <= 3) {
                PlayerParam.isFirstPlay = true;
                isVvBegin = false;
                isVvEnd = false
            }
        }
    }
    function play(e) {
        var v = e.target;
        v.play()
    }
    function getCurrentSeconds(seg, seconds) {
        var sum = 0;
        for (var i = 0; i < PlayerParam.segIndex; i++) {
            sum += seg[i].seconds
        }
        sum = sum + Math.round(seconds);
        return sum
    }
    function progress(e) {
        if (PlayerParam.offset_seconds == 0) {
            adapterVideoSize()
        }
    }
    function timeupdate(e) {
        var v = e.target;
        if (PlayerParam.offset_seconds == 0 && v.currentTime > PlayerParam.seekSuccessSeconds && PlayerParam.segSeekIsReady) {
            PlayerParam.seekSuccessSeconds = 0;
            PlayerParam.current_seconds = getCurrentSeconds(PlayerParam.seg, v.currentTime);
            updatePlayerProgress(PlayerParam.current_seconds, PlayerParam.video_duration, true);
            showLoading(false)
        }
        if (v.currentTime > 0.5 && PlayerParam.offset_seconds > 0 && PlayerParam.segSeekIsReady) {
            v.currentTime = PlayerParam.offset_seconds;
            PlayerParam.offset_seconds = 0
        }
        try {
            if (v.currentTime > 0) {
                PlayerParam.isPlayStart = true;
                adapterVideoSize()
            }
        } catch (e) {
            console.log(e)
        }
    }
    function clickProgress(e) {
        console.log("--clickProgress---");
        console.log(e)
    }
    function clickProgressStart(e) {
        console.log("--clickProgressStart---11");
        console.log(e);
        PlayerParam.seekBarStartX = e.targetTouches[0].clientX
    }
    function clickProgressEnd(e) {
        console.log("--clickProgressEnd---33");
        console.log(e);
        if (!PlayerParam.isPlayStart) {
            return
        }
        var element = $("#player_progress_position_touch_area");
        var left = 0;
        if (e.type == "click") {
            left = e.offsetX
        } else {
            if (Math.abs(PlayerParam.seekBarStartX - e.changedTouches[0].clientX) <= 5) {
                console.log(element.css("left"));
                console.log(e.changedTouches[0].clientX);
                var t = (document.body.clientWidth - $("#player_progress_bar")[0].clientWidth) / 2;
                console.log("t:" + t + " clientx:" + e.changedTouches[0].clientX);
                left = (e.changedTouches[0].clientX - t)
            }
        }
        element.css({
            left: left + "px"
        });
        PlayerParam.current_seconds = Math.round(left * (PlayerParam.video_duration / (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width)));
        updatePlayerProgress(PlayerParam.current_seconds, PlayerParam.video_duration, false);
        seek(document.getElementById("youku_html5_video"), PlayerParam.current_seconds)
    }
    function getVideoDuration(seg) {
        var tmp = 0;
        for (var i = 0; i < seg.length; i++) {
            tmp += seg[i].seconds
        }
        return tmp
    }
    function getVideoIndex(position) {
        var sum = 0;
        for (var i = 0; i < PlayerParam.seg.length; i++) {
            sum += parseInt(PlayerParam.seg[i].seconds, 10);
            if (sum >= position) {
                return i
            }
        }
    }
    function getOffsetSeconds(current, index) {
        var sum = 0;
        index = (index > PlayerParam.seg.length) ? PlayerParam.seg.length : index;
        for (var i = 0; i < index; i++) {
            sum += parseInt(PlayerParam.seg[i].seconds, 10)
        }
        if (sum > PlayerParam.video_duration) {
            sum = PlayerParam.video_duration
        }
        return (current - sum > 0) ? current - sum : 0
    }
    function seek(media, seconds) {
        showLoading(true);
        var index = getVideoIndex(seconds);
        PlayerParam.current_seconds = seconds;
        if (PlayerParam.segIndex == index) {
            media.play();
            media.currentTime = seconds;
            PlayerParam.offset_seconds = 0;
            setSeekSuccessSeconds(seconds, index)
        } else {
            PlayerParam.segSeekIsReady = false;
            media.pause();
            seconds = getOffsetSeconds(seconds, index);
            PlayerParam.segIndex = index;
            PlayerParam.offset_seconds = seconds;
            setSeekSuccessSeconds(seconds, index);
            getRealPlayUrl(PlayerParam.seg[index].url, true)
        }
    }
    function setSeekSuccessSeconds(seconds, index) {
        if (seconds + PlayerParam.seekOffsetSeconds > PlayerParam.seg[index].seconds) {
            PlayerParam.seekSuccessSeconds = seconds
        } else {
            PlayerParam.seekSuccessSeconds = seconds + PlayerParam.seekOffsetSeconds
        }
    }
    function seekStart(e) {
        console.log("--touchStart---1");
        console.log(e);
        if (!PlayerParam.isPlayStart) {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        console.log(PlayerParam);
        PlayerParam.startX = e.targetTouches[0].clientX;
        console.log(PlayerParam.startX);
        $("#player_progress_position_touch_area").css({
            top: "-15px",
        });
        $("#player_progress_position").css({
            position: "absolute",
            bottom: "0px",
            height: "31px",
            width: "31px",
            "-moz-border-radius": "15px",
            "-webkit-border-radius": "15px",
            "border-radius": "15px",
            "margin-left": "-5px",
            "z-index": "35",
            "background-size": "31px 31px",
            top: "0px",
        })
    }
    function seekMove(e) {
        console.log("--touchMove---2");
        if (!PlayerParam.isPlayStart) {
            return
        }
        PlayerParam.idle = 0;
        var v = document.getElementById("youku_html5_video");
        v.pause();
        PlayerParam.offset_seconds = 1;
        var leftX = 0;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            leftX = e.targetTouches[0].clientX - PlayerParam.startX
        }
        var element = $("#player_progress_position_touch_area");
        var tmp = $("#player_progress_played");
        var left = element.css("left");
        left = parseInt(left.substring(0, left.indexOf("px")));
        var rate = leftX / (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width);
        var seekedTime = Math.round(rate * PlayerParam.video_duration);
        var currentTime = PlayerParam.current_seconds;
        currentTime += seekedTime;
        if (currentTime > PlayerParam.video_duration) {
            currentTime = PlayerParam.video_duration
        }
        if (currentTime < 0) {
            currentTime = 0
        }
        updatePlayerProgress(currentTime, PlayerParam.video_duration, false)
    }
    function seekEnd(e) {
        console.log("--touchEnd---3");
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        if (!PlayerParam.isPlayStart) {
            return
        }
        var element = $("#player_progress_position_touch_area");
        var left = element.css("left");
        left = parseInt(left.substring(0, left.indexOf("px")));
        PlayerParam.current_seconds = Math.round(left * (PlayerParam.video_duration / (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width)));
        console.log("current_seconds:" + PlayerParam.current_seconds + " " + left + " " + (PlayerParam.video_duration / (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width)));
        $("#player_progress_position_touch_area").css({
            top: "-10px",
        });
        $("#player_progress_position").css({
            position: "absolute",
            bottom: "0px",
            height: "21px",
            width: "21px",
            "-moz-border-radius": "10px",
            "-webkit-border-radius": "10px",
            "border-radius": "10px",
            "margin-left": "0px",
            "z-index": "35",
            "background-size": "21px 21px",
            top: "0px",
        });
        seek(document.getElementById("youku_html5_video"), PlayerParam.current_seconds)
    }
    function updatePlayerProgress(seconds, duration, isUpdateProgressBuffered) {
        var tmp = $("#player_progress_played");
        if (seconds > 0 && duration > 0) {
            tmp.css({
                width: (PlayerParam.player_progress_position_width + Math.round(seconds / duration * (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width))) + "px"
            });
            var t = "0";
            if (tmp[0].style.width) {
                t = parseInt(tmp[0].style.width.substring(0, tmp[0].style.width.indexOf("px")))
            }
            tmp = $("#player_progress_position_touch_area");
            if (t <= PlayerParam.player_progress_bar_width) {
                var left = (Math.round(seconds / duration * (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width)));
                tmp.css({
                    left: left + "px"
                })
            }
            var player_progress_buffered = $("#player_progress_buffered");
            if (isUpdateProgressBuffered) {
                tmp = document.getElementById("youku_html5_video");
                var buffered = tmp.buffered;
                if (buffered.length != 0) {
                    buffered = buffered.end(0)
                } else {
                    buffered = 0
                }
                buffered = getCurrentSeconds(PlayerParam.seg, buffered);
                player_progress_buffered.css({
                    width: (PlayerParam.player_progress_position_width + Math.round(buffered / duration * (PlayerParam.player_progress_bar_width - PlayerParam.player_progress_position_width))) + "px"
                })
            } else {
                player_progress_buffered.css({
                    width: left + "px"
                })
            }
            var current_time = document.getElementById("current_time");
            current_time.innerHTML = sec2min(seconds)
        }
    }
    function getRealPlayUrl(playurl, isplay) {
        console.log("getRealPlayUrl");
        console.log(playurl);
        if (playurl.indexOf("m3u8") != -1 || playurl.indexOf("t.mp4") != -1) {
            playUrlCallback(playurl, isplay)
        } else {
            try {
                var param = {};
                $.get(playurl, param, function(response, status, xhr) {
                    console.log("getRealPlayUrl response");
                    console.log(response);
                    try {
                        if (response[0].server) {
                            console.log(PlayerParam);
                            playUrlCallback(response[0].server, isplay)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }, "jsonp")
            } catch (e) {
                console.log(e)
            }
        }
        function playUrlCallback(realplayurl, isplay) {
            console.log("playUrlCallback");
            PlayerParam.segSeekIsReady = true;
            var v = document.getElementById("youku_html5_video");
            if (v) {
                v.src = realplayurl;
                if (isplay) {
                    v.play()
                }
            }
            var play_icon = document.getElementById("play_icon");
            play_icon.style.display = "block"
        }
    }
    function getSupportVideoForamt(data) {
        var vformat = "";
        if (PlayerParam.isSupportH5M3U8) {
            vformat = "m3u8_flv"
        } else {
            if (data.results["3gphd"].length > 0) {
                vformat = "3gphd"
            } else {
                if (data.results.mp4.length > 0) {
                    vformat = "mp4"
                }
            }
        }
        if (!PlayerParam.supportHTML5Video) {
            vformat = "";
            if (data.results["3gphd"].length > 0) {
                vformat = "3gphd"
            }
        }
        return vformat
    }
    function reTryGetPlayUrl(reason) {
        var playurlApi = "wireless/videos/<vid>/playurl";
        playurlApi = playurlApi + "?pid=JsLoaderForWeibo";
        playurlApi = playurlApi.replace(/<vid>/, PlayerParam.vid);
        playurlApi = playurlApi + "&format=1,2,4,5,6&guid=" + PlayerParam.guid;
        playurlApi = "http://m.youku.com/webapp/weiboProxy?d1=" + S4() + "" + S4() + "&api=" + encodeURIComponent(playurlApi) + "&d2=" + S4() + "&isPost=false&ah=all";
        json_data = {
            format: "1,2,4,5,6",
        };
        $.ajax({
            type: "GET",
            url: playurlApi,
            cache: false,
            data: json_data,
            dataType: "json",
            success: function(response, status, xhr) {
                console.log(response);
                var vformat = "";
                vformat = getSupportVideoForamt(response);
                goPlay(vformat, response);
                try {
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        retry_playurl: vformat ? "success_" + vformat : "failed",
                        status: response.status,
                        response_code: xhr.status,
                        reason: reason,
                        vid: PlayerParam.vid
                    }, function(response, status, xhr) {
                        console.log(response)
                    }, "json")
                } catch (e) {
                    console.log(e)
                }
            },
            error: function(xhr, status) {
                console.log("error");
                goPlay(false, false);
                var resp = eval("(" + xhr.responseText + ")");
                try {
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        retry_playurl: "failed",
                        status: resp.status,
                        response_code: xhr.status,
                        reason: reason,
                        vid: vid,
                        code: resp.code
                    }, function(response, status, xhr) {
                        console.log(response)
                    }, "json")
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }
    function goPlay(vformat, data) {
        if (vformat) {
            PlayerParam.seg = data.results[vformat];
            PlayerParam.video_duration = getVideoDuration(PlayerParam.seg);
            var total_time = document.getElementById("total_time");
            total_time.innerHTML = sec2min(PlayerParam.video_duration);
            var current_time = document.getElementById("current_time");
            current_time.innerHTML = "0:00";
            PlayerParam.segIndex = getVideoIndex(PlayerParam.current_seconds);
            PlayerParam.offset_seconds = getOffsetSeconds(PlayerParam.current_seconds, PlayerParam.segIndex);
            setSeekSuccessSeconds(PlayerParam.offset_seconds, PlayerParam.segIndex);
            getRealPlayUrl(data.results[vformat][PlayerParam.segIndex].url, false)
        } else {
            PlayerParam.title = "该视频暂无移动格式。请稍后再来：）";
            var player_title = document.getElementById("player_title");
            player_title.innerHTML = PlayerParam.title;
            var current_time = document.getElementById("current_time");
            current_time.innerHTML = "--:--";
            PlayerParam.noVideoFormat = true
        }
    }
    function getPlayUrl() {
        PlayerParam.segSeekIsReady = false;
        var playurl = "";
        var playurlApi = "http://m.youku.com/wireless_api3/videos/" + PlayerParam.vid + "/playurl";
        json_data = {
            format: "1,2,4,5,6",
        };
        $.ajax({
            type: "GET",
            url: playurlApi,
            cache: false,
            data: json_data,
            dataType: "json",
            success: function(data, textStatus, XMLHttpRequest) {
                console.log(data);
                if (data.status == "success") {
                    var vformat = "";
                    vformat = getSupportVideoForamt(data);
                    if (vformat == "3gphd" || vformat == "m3u8_flv") {
                        goPlay(vformat, data)
                    } else {
                        reTryGetPlayUrl("no_3gphd")
                    }
                } else {
                    reTryGetPlayUrl("status_failed")
                }
            },
            error: function(xhr, status) {
                console.log("error");
                reTryGetPlayUrl("getplayurl_error")
            }
        })
    }
    function showLoading(isShow) {
        var loadingObj = new loading(document.getElementById("canvas"), {
            radius: 8 * 3,
            circleLineWidth: 3 * 3
        });
        if (isShow) {
            loadingObj.show()
        } else {
            loadingObj.hide()
        }
    }(function init() {
        var checkSuportHtml5Video = function(element) {
                suportVideoType = {
                    MP4: "video/mp4",
                    FLV: "video/x-flv",
                    M3U8: "application/vnd.apple.mpegurl",
                    OGG: "video/ogg",
                    WEBM: "video/webm"
                };
                User_Agent = {
                    isWin: "Win",
                    isMac: "Mac",
                    isSafari: "Safari",
                    isChrome: "Chrome",
                    isIPAD: "iPad",
                    isIPHONE: "iPhone",
                    isIPOD: "iPod",
                    isLEPAD: "lepad_hls",
                    isMIUI: "MI-ONE",
                    isAndroid4: "Android 4.",
                    isAndroid41: "Android 4.1",
                    isSonyDTV: "SonyDTV",
                    isBlackBerry: "BlackBerry"
                };
                PlayerParam.supportHTML5Video = false;
                PlayerParam.isIOS = false;
                PlayerParam.os = "";
                if (element.canPlayType) {
                    PlayerParam.supportHTML5Video = true;
                    for (var type in suportVideoType) {
                        PlayerParam["support" + type] = element.canPlayType(suportVideoType[type]) ? true : false
                    }
                }
                for (var ua in User_Agent) {
                    if (navigator.userAgent.indexOf(User_Agent[ua]) !== -1) {
                        PlayerParam[ua] = true;
                        PlayerParam.os = PlayerParam.os + (User_Agent[ua] + " ")
                    } else {
                        PlayerParam[ua] = false
                    }
                }
                if (navigator.userAgent.indexOf("Android") !== -1) {
                    var tmp = navigator.userAgent.indexOf("Android");
                    tmp = navigator.userAgent.substr(tmp, 10);
                    console.log(tmp);
                    if (tmp > User_Agent.isAndroid4) {
                        PlayerParam.isAndroid4 = true;
                        PlayerParam.os = PlayerParam.os + (tmp + " ")
                    }
                }
                PlayerParam.isIOS = PlayerParam.isIPAD || PlayerParam.isIPHONE || PlayerParam.isIPOD;
                PlayerParam.isSupportH5M3U8 = PlayerParam.isIOS || (PlayerParam.isMac && PlayerParam.isSafari && !PlayerParam.isChrome) || PlayerParam.isLEPAD || PlayerParam.isSonyDTV || PlayerParam.isBlackBerry;
                PlayerParam.isSupportH5MP4 = PlayerParam.isChrome || PlayerParam.isIE10 || PlayerParam.isAndroid41 || PlayerParam.isAndroid4 || PlayerParam.isMIUI;
                PlayerParam.isSupportH5FLV = PlayerParam.supportFLV;
                PlayerParam.isMobile = PlayerParam.isIPAD || PlayerParam.isIPHONE || PlayerParam.isIPOD || PlayerParam.isLEPAD || PlayerParam.isMIUI || PlayerParam.isAndroid4 || PlayerParam.isSonyDTV;
                PlayerParam.isSupportAutoPlay = PlayerParam.isAndroid4 ? PlayerParam.isAndroid4 : false;
                var tmpua = window.navigator.userAgent;
                tmpua = tmpua.toLowerCase();
                if (tmpua.indexOf("android") != -1 && tmpua.indexOf("mqqbrowser") != -1) {
                    PlayerParam.supportHTML5Video = false
                }
                console.log(PlayerParam);
                return PlayerParam.supportHTML5Video
            };
        var initPlayerArea = function(a) {
                var playerBox = document.getElementById(player);
                var playerArea = document.getElementById("video_player_area");
                var playerArea = document.createElement("div");
                playerArea.id = "video_player_area";
                playerArea.className = "player_area";
                var w = playerBox.clientWidth ? playerBox.clientWidth : document.body.clientWidth;
                var h = playerBox.clientHeight ? playerBox.clientHeight : w * 9 / 16;
                playerArea.style.cssText = "width:" + w + "px;height:" + h + "px;";
                playerBox.appendChild(playerArea);
                var canvas = document.createElement("canvas");
                canvas.id = "canvas";
                canvas.className = "player_loading";
                playerArea.appendChild(canvas);
                var title_area = document.createElement("div");
                title_area.className = "player_title_area";
                title_area.id = "youku_html5_title";
                playerArea.appendChild(title_area);
                var title = document.createElement("div");
                title.id = "player_title";
                title.className = "player_title";
                title.innerHTML = PlayerParam.title;
                title_area.appendChild(title);
                var title_mask = document.createElement("div");
                title_mask.className = "player_title_mask";
                title_area.appendChild(title_mask);
                var video = document.createElement("video");
                video.className = "player_video";
                video.id = "youku_html5_video";
                video.style.cssText = "width:" + w + "px;height:" + h + "px;";
                video.poster = PlayerParam.poster;
                console.log(PlayerParam.poster);
                if (!checkSuportHtml5Video(video)) {
                    video = {};
                    video = document.createElement("div");
                    video.className = "player_download";
                    var poster = document.createElement("div");
                    poster.className = "player_poster";
                    poster.innerHTML = '<img src="' + PlayerParam.poster + '"/>';
                    playerArea.appendChild(poster)
                }
                playerArea.appendChild(video);
                var play_btn_div = document.createElement("div");
                play_btn_div.id = "play_btn_div";
                play_btn_div.innerHTML = '<div id="play_icon"></div>';
                playerArea.appendChild(play_btn_div);
                var control = document.createElement("div");
                control.className = "player_control_area";
                control.id = "youku_html5_control";
                control.innerHTML = '<div id="player_progress_bar_touch_area"><div id="player_progress_bar"><div id="player_progress_played"></div><div id="player_progress_buffered"></div><div id="player_progress_position_touch_area"><div id="player_progress_position"></div></div></div></div>';
                playerArea.appendChild(control);
                var control_mask = document.createElement("div");
                control_mask.className = "player_control_mask";
                control.appendChild(control_mask);
                var player_control = document.createElement("div");
                player_control.className = "player_control";
                player_control.innerHTML = '<div id="btn_play"></div><div id="video_time"><span id="current_time">--:--</span>/<span id="total_time">--:--</span></div><div id="btn_fullscreen"></div>';
                control.appendChild(player_control)
            };
        initPlayerArea();
        addListener();
        getPlayUrl();
        var resizeEvent = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(resizeEvent, function() {
            console.log("----resizeEvent----");
            setTimeout(adapterVideoSize, 500);
            console.log(PlayerParam.current_seconds);
            setTimeout(function() {
                try {
                    var tmpv = document.getElementById("youku_html5_video");
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        type: "resize",
                        screen: document.documentElement.clientWidth < document.documentElement.clientHeight ? "VR" : "HR",
                        currentTime: tmpv.currentTime
                    }, function(response, status, xhr) {}, "json")
                } catch (e) {
                    console.log(e)
                }
            }, 1000)
        }, false);
        setInterval(function() {
            var v = document.getElementById("youku_html5_video");
            if (!v) {
                return
            }
            if (PlayerParam.idle > 5) {
                showControlsTitle(false);
                PlayerParam.idle = 0
            } else {
                if (!v.paused) {
                    PlayerParam.idle++;
                    if (PlayerParam.current_seconds != PlayerParam.last_seconds) {
                        PlayerParam.last_seconds = PlayerParam.current_seconds;
                        PlayerParam.stopPlayIdle = 0
                    } else {
                        PlayerParam.stopPlayIdle++
                    }
                    if (PlayerParam.stopPlayIdle > 1 && PlayerParam.last_seconds > 0) {
                        showLoading(true)
                    }
                }
            }
        }, 1000)
    })()
};