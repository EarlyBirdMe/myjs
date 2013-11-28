function slide(a) {
    this.argObj = arguments[0];
    this.argNeed = ["target", "show"];
    this.target = typeof(this.argObj.target) == "string" ? $("#" + this.argObj.target) : this.argObj.target;
    this.show = typeof(this.argObj.show) == "string" ? this.target.find("." + this.argObj.show) : this.argObj.show;
    this.page = this.argObj.page ? (typeof(this.argObj.page) == "string" ? this.target.find("." + this.argObj.page) : this.argObj.page) : false;
    this.autoplay = this.argObj.autoplay == false ? false : true;
    this.interval = this.argObj.interval ? +this.argObj.interval : 3000;
    this.pageEvent = this.argObj.pageEvent || "click";
    this.effect = this.argObj.effect || "slr";
    this.w = this.target.width();
    this.h = this.target.height();
    this.index = 0;
    this.init()
}
slide.prototype = {author: "yangfeifei", date: "2012-09-13", init: function () {
    var a = this;
    a.argAnalyze()
}, argAnalyze: function () {
    var c = this, a = c.argObj, e = c.argNeed, b, d;
    for (b = 0; b < e.length; b++) {
        if (!a[e[b]]) {
            throw new Error("Missing required arguments " + e[b])
        }
    }
    switch (c.effect) {
        case"slr":
            c.defaultCss.slr(c);
            if (c.page) {
                c.actionList.slr.pick(c)
            }
            if (c.autoplay) {
                c.actionList.slr.autoplay(c)
            }
            break;
        case"sud":
            c.defaultCss.sud(c);
            if (c.page) {
                c.actionList.sud.pick(c)
            }
            if (c.autoplay) {
                c.actionList.sud.autoplay(c)
            }
            break;
        case"fade":
            c.defaultCss.fade(c);
            if (c.page) {
                c.actionList.fade.pick(c)
            }
            if (c.autoplay) {
                c.actionList.fade.autoplay(c)
            }
            break
    }
}, getThis: function () {
    return this
}, defaultCss: {slr: function (d) {
    var f = d, c = f.show, e = f.h, b = f.w, a = c.find("li"), g = a.length;
    c.css({width: g * b, position: "relative", left: "0"});
    a.css({"float": "left"})
}, sud: function (b) {
    var c = b, a = c.show;
    a.css({position: "relative", top: "0"})
}, fade: function (c) {
    var d = c, b = d.show, a = b.find("li");
    b.css({position: "relative"});
    $(a[0]).css({display: "block"})
}}, actionList: {slr: {isPage: function (b) {
    var a = b, c = a.page[0];
    return c ? true : false
}, isRight: function (e) {
    var d = e, c = d.w, b = d.show, f = -(d.index * c), a = -(b.width() - c);
    return(f > a) ? false : true
}, isLeft: function (d) {
    var c = d, b = c.w, a = c.show, e = -(c.index * b);
    return(e < 0) ? false : true
}, pageChange: function (d, c, e) {
    var b = d, a = b.page.find("li");
    $(a[c]).removeClass("on");
    $(a[e]).addClass("on")
}, left: function (e) {
    var d = e, b = d.w, a = d.show, f = -(d.index * b), c = d.actionList.slr.isRight(d);
    c ? a.stop(true, false).animate({left: 0}, 400, function () {
        d.index = 0
    }) : a.stop(true, false).animate({left: f - b}, 400);
    if (d.actionList.slr.isPage(d)) {
        c ? d.actionList.slr.pageChange(d, d.index, 0) : d.actionList.slr.pageChange(d, d.index, d.index + 1)
    }
    d.index++
}, right: function (i) {
    var c = i, f = c.w, g = c.show, b = -(g.width() - f), a = -(c.index * f), d = c.actionList.slr.isLeft(c), g = c.show, h = g.find("li"), e = h.length;
    d ? g.stop(true, false).animate({left: b}, 400, function () {
        c.index = e - 1
    }) : g.stop(true, false).animate({left: Number(a) + Number(f)}, 400);
    if (c.actionList.slr.isPage(c)) {
        d ? c.actionList.slr.pageChange(c, c.index, e - 1) : c.actionList.slr.pageChange(c, c.index, c.index - 1)
    }
    c.index--
}, pick: function (e) {
    var d = e, f = d.pageEvent, b = d.w, g = d.page, c = g.find("li"), a = d.show;
    c.each(function (h) {
        $(this).bind(f, function () {
            a.stop(true, false).animate({left: -(h * b)}, 400);
            $(c[d.index]).removeClass("on");
            $(this).addClass("on");
            d.index = h
        })
    })
}, autoplay: function (e) {
    var d = e, a = d.show, f = d.page, c = f ? f.find("li") : undefined, b = d.interval, g = setInterval(function () {
        d.actionList.slr.left(d)
    }, b);
    a.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.slr.left(d)
        }, b)
    });
    f ? c.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.slr.left(d)
        }, b)
    }) : undefined
}}, sud: {isPage: function (b) {
    var a = b, c = a.page[0];
    return c ? true : false
}, isTop: function (c) {
    var b = c, d = b.h, a = b.show, e = -(b.index * d), f = -(a.height() - d);
    return(e > f) ? false : true
}, isBottom: function (d) {
    var c = d, e = c.h, b = c.w, a = c.show, f = -(c.index * e);
    return(f < 0) ? false : true
}, up: function (d) {
    var c = d, e = c.h, f = -(c.index * e), b = c.show, a = c.actionList.sud.isTop(c);
    a ? b.stop(true, false).animate({top: 0}, 400, function () {
        c.index = 0
    }) : b.stop(true, false).animate({top: f - e}, 400);
    if (c.actionList.slr.isPage(c)) {
        a ? c.actionList.slr.pageChange(c, c.index, 0) : c.actionList.slr.pageChange(c, c.index, c.index + 1)
    }
    c.index++
}, down: function (j) {
    var b = j, c = b.h, f = b.show, a = -(f.height() - c), d = -(b.index * c), i = b.actionList.sud.isBottom(b), f = b.show, g = f.find("li"), e = g.length;
    i ? f.stop(true, false).animate({top: a}, 400, function () {
        b.index = e - 1
    }) : f.stop(true, false).animate({top: Number(d) + Number(c)}, 400);
    if (b.actionList.slr.isPage(b)) {
        i ? b.actionList.slr.pageChange(b, b.index, e - 1) : b.actionList.slr.pageChange(b, b.index, b.index - 1)
    }
    b.index--
}, pick: function (d) {
    var c = d, f = c.pageEvent, e = c.h, g = c.page, b = g.find("li"), a = c.show;
    b.each(function (h) {
        $(this).bind(f, function () {
            a.stop(true, false).animate({top: -(h * e)}, 400);
            $(b[c.index]).removeClass("on");
            $(this).addClass("on");
            c.index = h
        })
    })
}, autoplay: function (e) {
    var d = e, a = d.show, f = d.page, c = f ? f.find("li") : undefined, b = d.interval, g = setInterval(function () {
        d.actionList.sud.up(d)
    }, b);
    a.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.sud.up(d)
        }, b)
    });
    f ? c.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.sud.up(d)
        }, b)
    }) : undefined
}}, fade: {isFinal: function (d) {
    var c = d, b = c.show, a = b.find("li"), e = a.length;
    return(c.index + 1) < e ? false : true
}, isFirst: function (b) {
    var a = b;
    return a.index > 0 ? false : true
}, next: function (e) {
    var d = e, b = d.show, a = b.find("li"), f = d.page, c = f.find("li");
    if (!d.actionList.fade.isFinal(d)) {
        $(a[d.index]).stop(true, true).fadeOut();
        $(a[d.index + 1]).stop(true, true).fadeIn();
        d.actionList.slr.pageChange(d, d.index, d.index + 1);
        d.index++
    } else {
        $(a[d.index]).stop(true, true).fadeOut();
        $(a[0]).stop(true, true).fadeIn();
        d.actionList.slr.pageChange(d, d.index, 0);
        d.index = 0
    }
}, last: function (e) {
    var d = e, b = d.show, a = b.find("li"), g = a.length, f = d.page, c = f.find("li");
    if (!d.actionList.fade.isFirst(d)) {
        $(a[d.index]).stop(true, true).fadeOut();
        $(a[d.index - 1]).stop(true, true).fadeIn();
        d.actionList.slr.pageChange(d, d.index, d.index - 1);
        d.index--
    } else {
        $(a[d.index]).stop(true, true).fadeOut();
        $(a[g - 1]).stop(true, true).fadeIn();
        d.actionList.slr.pageChange(d, d.index, g - 1);
        d.index = g - 1
    }
}, pick: function (e) {
    var d = e, f = d.pageEvent, g = d.page, c = g.find("li"), b = d.show, a = b.find("li");
    c.each(function (h) {
        $(this).bind(f, function () {
            if (d.index != h) {
                $(a[d.index]).stop(true, true).fadeOut();
                $(a[h]).stop(true, true).fadeIn();
                $(c[d.index]).removeClass("on");
                $(this).addClass("on");
                d.index = h
            } else {
                return
            }
        })
    })
}, autoplay: function (e) {
    var d = e, a = d.show, f = d.page, c = f ? f.find("li") : undefined, b = d.interval, g = setInterval(function () {
        d.actionList.fade.next(d)
    }, b);
    a.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.fade.next(d)
        }, b)
    });
    f ? c.hover(function () {
        clearInterval(g)
    }, function () {
        g = setInterval(function () {
            d.actionList.fade.next(d)
        }, b)
    }) : undefined
}}}};
