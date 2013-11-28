_.Module.define({path: "common/component/SlideShow", sub: {defaultOptions: {effect: "slide", activeClass: "tbui_slideshow_active", interval: 5000, slide: {speed: 500}, fade: {speed: 500}}, initial: function (b) {
    b = $.extend({}, this.defaultOptions, b);
    var a = this;
    this.options = b;
    this.animating = false;
    this.current = 0;
    this.vendorPrefix = false;
    this.$nav = $(b.nav);
    this.$navItem = this.$nav.children();
    this.total = this.$navItem.size();
    this.$container = $(b.target);
    this.$list = this.$container.children(".tbui_slideshow_list");
    this.$tokens = this.$list.children();
    if (!b.width) {
        b.width = this.$container.width()
    }
    if (!b.height) {
        b.height = this.$container.height()
    }
    this.$container.add(this.$list).css({width: b.width, height: b.height});
    this.interval = b.interval || 5000;
    this.$navItem.first().addClass(b.activeClass);
    this.$tokens.first().show();
    this.$navItem.click(function () {
        var c = this;
        if (b.auto) {
            a.stop()
        }
        this.delayHandler = setTimeout(function () {
            a.delayHandler = null;
            a.setActive($(c).index())
        }, 10)
    }).bind("mouseout", function () {
        if (b.auto) {
            a.play()
        }
        if (this.delayHandler) {
            clearTimeout(this.delayHandler)
        }
    });
    this.effectHandler = this["_" + b.effect];
    if (b.auto) {
        this.play();
        this.$list.hover(function () {
            a.stop()
        }, function () {
            a.play()
        })
    }
    if (b.next) {
        $(b.next).click(function (c) {
            c.preventDefault();
            c.stopPropagation();
            a.next()
        })
    }
    if (b.prev) {
        $(b.prev).click(function (c) {
            c.preventDefault();
            c.stopPropagation();
            a.prev()
        })
    }
}, setActive: function (a) {
    if (!this.animating && a !== this.current) {
        this.$navItem.removeClass(this.options.activeClass).eq(a).addClass(this.options.activeClass);
        this.effectHandler(a)
    }
}, next: function () {
    var a = this.current + 1;
    if (a == this.total) {
        a = 0
    }
    this.setActive(a)
}, prev: function () {
    var a = this.current - 1;
    if (a == -1) {
        a = this.total - 1
    }
    this.setActive(a)
}, play: function () {
    var a = this;
    if (this.autoHandler == null) {
        this.autoHandler = setInterval(function () {
            a.next()
        }, this.options.interval)
    }
}, stop: function () {
    clearInterval(this.autoHandler);
    this.autoHandler = null
}, _slide: function (f) {
    var d, g, b, c, e, a, h;
    var i = this;
    this.animating = true;
    d = this.current;
    h = f > d ? 1 : -1;
    g = f > d ? -this.options.width : this.options.width;
    c = f;
    this.$tokens.eq(d).siblings().css({display: "none", left: 0, zIndex: 0});
    this.$tokens.eq(c).css({display: "block", left: h * this.options.width, zIndex: 10});
    if (this.vendorPrefix) {
        e = this.vendorPrefix;
        a = e + "Transform";
        b = e + "TransitionDuration";
        this.$list[0].style[a] = "translateX(" + g + "px)";
        this.$list[0].style[b] = this.options.slide.speed + "ms";
        this.$list.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
            i.$list[0].style[a] = "";
            i.$list[0].style[b] = "";
            i.$tokens.eq(c).css({left: 0});
            i.$tokens.eq(d).css({display: "none", left: 0, zIndex: 0});
            i.animating = false;
            i.current = c;
            i.$list.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
            i.trigger("animateEnd")
        })
    } else {
        i.$list.stop().animate({left: g}, this.options.slide.speed, function () {
            i.$list.css({left: 0});
            i.$tokens.eq(c).css({left: 0});
            i.$tokens.eq(d).css({display: "none", left: 0, zIndex: 0});
            i.current = c;
            i.animating = false;
            i.trigger("animateEnd")
        })
    }
}, _fade: function (c) {
    var a = this;
    var d, b;
    this.animating = true;
    d = this.current;
    b = c;
    this.$tokens.eq(b).css({display: "none", left: 0, zIndex: 10});
    this.$tokens.eq(d).stop().fadeOut(this.options.fade.speed);
    this.$tokens.eq(b).stop().fadeIn(this.options.fade.speed, (function () {
        a.$tokens.eq(b).css({zIndex: 0});
        a.animating = false;
        a.current = b
    }))
}, _getVendorPrefix: function () {
    var a, b, c, d, e;
    a = document.body || document.documentElement;
    c = a.style;
    d = "Transition";
    e = ["Moz", "Webkit", "Khtml", "O", "ms"];
    b = 0;
    while (b < e.length) {
        if (typeof c[e[b] + d] === "string") {
            return e[b]
        }
        b++
    }
    return false
}}});