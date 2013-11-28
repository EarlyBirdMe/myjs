CP.Module("animate", function () {
    var b = function (f) {
        var d = $(f.target);
        var k = f.direction || "up";
        var q = Math.abs(f.time) || 3000;
        var j = Math.abs(f.speed) || 20;
        var h = d.style;
        d.innerHTML += d.innerHTML;
        var o = 0, i = 0, l = CP.Dom.getElementsByClassName("js-rotator-sub", null, d)[0], g = 0, p, n, m;
        switch (k) {
            case"up":
            case"down":
                o = CP.Size.getObjSize(f.target)[1];
                g = l.scrollHeight;
                n = "marginTop";
                m = (k == "up") ? -1 : 1;
                break;
            case"left":
            case"right":
                o = CP.Size.getObjSize(f.target)[0];
                g = l.scrollWidth;
                n = "marginLeft";
                m = (k == "left") ? -1 : 1;
                break;
            default:
                throw new Error("\u6682\u4e0d\u652f\u6301" + k + "\u6eda\u52a8");
                break
        }
        var e = function () {
            CP.Effect.Tween("Cubic.easeOut", [0, 0, g, j], function (r) {
                r += i;
                h[n] = r * m + "px"
            }, function (r) {
                i += g;
                h[n] = i * m + "px";
                if (i >= o / 2) {
                    i = 0;
                    h[n] = "0px"
                }
                p = setTimeout(e, q)
            })
        };
        p = setTimeout(e, q);
        d.onmouseover = function () {
            clearTimeout(p)
        };
        d.onmouseout = function () {
            p = setTimeout(e, q)
        }
    };
    var c = (function () {
        var e = function (f) {
            this.parent = $(f.parentId);
            this.target = $$(f.clsTarget, null, this.parent)[0];
            this.panel = $$(f.clsPanel, null, this.parent)[0];
            this.targetSize = CP.Size.getObjSize(this.target);
            this.panelSize = null;
            this.isOn = false;
            this.timer = null;
            this.delay = f.delay || 200;
            this.init()
        };
        e.prototype = {init: function () {
            var f = this;
            this.target.onmouseover = function () {
                f.isOn = false;
                clearTimeout(f.timer);
                CP.Util.show(f.panel)
            };
            this.target.onmouseout = function () {
                var g = CP.Size.getMousePoint();
                var h = CP.Size.getObjPosition(f.target);
                if (!(g.x > h[0] && g.x < h[0] + f.targetSize[0] && g.y > h[1] && g.y < h[1] + f.targetSize[1])) {
                    clearTimeout(f.timer);
                    f.timer = setTimeout(function () {
                        !f.isOn && CP.Util.hide(f.panel)
                    }, f.delay)
                }
            };
            this.panel.onmouseover = function () {
                f.isOn = true
            };
            this.panel.onmouseout = function () {
                var g = CP.Size.getMousePoint();
                var h = CP.Size.getObjPosition(f.panel);
                if (f.panelSize === null) {
                    f.panelSize = CP.Size.getObjSize(f.panel)
                }
                if (!(g.x > h[0] && g.x < h[0] + f.panelSize[0] && g.y > h[1] && g.y < h[1] + f.panelSize[1])) {
                    clearTimeout(f.timer);
                    f.timer = setTimeout(function () {
                        CP.Util.hide(f.panel)
                    }, f.delay);
                    f.isOn = false
                }
            }
        }};
        var d = function (g) {
            var f = new e(g)
        };
        return{getInstance: d}
    })();
    var a = function (d) {
        this.container = $(d.containerID);
        this.index = Math.abs(d.index || 0);
        this.duration = Math.abs(d.duration || 4000);
        this.trigger = (d.trigger == "mouseover") ? "mouseover" : "click";
        this.callback = d.callback || null;
        this.playClass = d.playClass || "js-slideshow-play";
        this.switchClass = d.switchClass || "js-slideshow-switch";
        this.lazyLoad = d.lazyLoad || "data-lazyload-img";
        this.currentClass = d.currentClass || "on";
        this.hoverPause = (d.hoverPause === false) ? false : true;
        this.count = 0;
        this.hasSwitch = false;
        this.playList = null;
        this.switchList = null;
        this.imgList = [];
        this.lock = false;
        this.Opacity = new CP.Effect.Opacity();
        this.timer = null;
        this._init()
    };
    a.prototype = {constructor: a, _start: function () {
        var d = this;
        this._stop();
        this.timer = setInterval(function () {
            d._go()
        }, this.duration)
    }, _stop: function () {
        clearInterval(this.timer)
    }, _lazyLoad: function (e) {
        var f = this, d = this.imgList[e], g = d && d.getAttribute(this.lazyLoad) || null;
        if (g) {
            d.onload = function () {
                if (e != f.index) {
                    f._swc(e)
                }
            };
            d.src = g;
            d.removeAttribute(this.lazyLoad)
        }
        return !!g
    }, _go: function (d) {
        var e = this;
        d = (typeof d == "number") ? d : this.index + 1;
        if (d + 1 > this.count) {
            d = 0
        }
        if (d == this.index) {
            return
        }
        if (!this._lazyLoad(d)) {
            this._swc(d)
        }
    }, _swc: function (d) {
        this.lock = true;
        var e = this;
        e.callback && e.callback(d, e.playList[d], e.switchList[d]);
        CP.Dom.removeClass(e.currentClass, e.switchList[e.index]);
        CP.Dom.addClass(e.currentClass, e.switchList[d]);
        e.playList[d].style.zIndex = 0;
        e.Opacity.init({target: e.playList[d], range: 1});
        e.Opacity.init({target: e.playList[e.index], range: [1, 0], rate: 30, fn: function () {
            e.playList[e.index].style.zIndex = -1;
            e.playList[d].style.zIndex = 1;
            e.index = d;
            e.lock = false
        }})
    }, _switchPlay: function (d) {
        if (!this.lock) {
            this._go(d.getAttribute("data-fadeshow-index") - 0)
        }
    }, _init: function () {
        if (!this.container) {
            throw new Error("Container is not found")
        }
        var d = this;
        this.playList = $$(this.playClass, null, this.container);
        this.switchList = $$(this.switchClass, null, this.container);
        this.hasSwitch = !!this.switchList[0];
        this.count = this.playList.length;
        if (this.count < 1) {
            return
        }
        this.index = this.index > this.count - 1 ? this.count - 1 : this.index;
        CP.Each(this.playList, function (f, e) {
            d.imgList.push(f.getElementsByTagName("img")[0] || null);
            if (d.index != e) {
                f.style.zIndex = -1;
                d.Opacity.setOpacity(f, 0)
            }
            if (d.hoverPause) {
                CP.Event.addEvent(f, "mouseover", function () {
                    d._stop()
                });
                CP.Event.addEvent(f, "mouseout", function () {
                    d._start()
                })
            }
            if (d.hasSwitch) {
                d.switchList[e].setAttribute("data-fadeshow-index", e);
                if (d.trigger == "click") {
                    CP.Event.addEvent(d.switchList[e], d.trigger, function () {
                        CP.Event.preventDefault();
                        d._stop();
                        d._switchPlay(this);
                        d._start()
                    })
                } else {
                    CP.Event.addEvent(d.switchList[e], d.trigger, function () {
                        d._stop();
                        d._switchPlay(this)
                    });
                    CP.Event.addEvent(d.switchList[e], "mouseout", function () {
                        d._start()
                    })
                }
            }
        });
        this._lazyLoad(this.index);
        this.playList[this.index].style.zIndex = 1;
        CP.Dom.addClass(this.currentClass, this.switchList[this.index]);
        this._start()
    }};
    CP.Animate = {rotator: b, pop: c, FadeShow: a}
});
