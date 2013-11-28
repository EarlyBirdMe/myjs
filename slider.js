//2012-5-15 17:55 chs
(function(a) {
    function b(a, b, c) {
        return this.elem = a, this.width = b || 0, this.parentWidth = 0, this.colWidth = c || 0, this.startX = 0, this.startY = 0, this.startLeft = 0, this.touchStartTime = 0, this.sliding = !1, this.isdoslide = !1, this
    }
    a.fn.touchslider = function(c) {
        var d = {
            cellWidth: 0,
            padding: 0,
            left: "0"
        },
            e = [];
        return c && a.extend(d, c), this.each(function(c) {
            var f = 0,
                g = a(this);
            g.css({
                position: "relative",
                left: d.left + "rem"
            }), g.children("li").each(function() {
                a(this).css({
                    position: "absolute",
                    left: f / 10 + "rem"
                }), f += d.cellWidth + d.padding
            }), g.css("width", f / 10 + "rem");
            if (!g[0].sliderObj) try {
                document.createEvent("TouchEvent"), e[c] = new b(g, f, d.cellWidth + d.padding), e[c].makeTouchable(), g[0].sliderObj = e[c]
            } catch (h) {
                g.css("overflow", "hidden")
            }
        })
    }, b.prototype = {
        deleTouchEnd: function(a, b) {},
        deleTouching: function(a, b) {},
        slideToBegin: function(a) {},
        slideToEnd: function(a) {},
        resize: function(b, c) {
            var d = this,
                e = 0;
            $elem = d.elem, $elem.children("li").each(function() {
                a(this).css({
                    position: "absolute",
                    left: e / 10 + "rem"
                }), e += b + c
            }), $elem.css({
                width: e / 10 + "rem",
                left: "0rem"
            }), $elem.parent().css("width", "auto"), d.width = e, d.colWidth = b + c, d.width < $elem.parent().width() && $elem.parent().css("width", (d.width - 1) / 10 + "rem"), d.parentWidth = $elem.parent().width()
        },
        slideTo: function(a) {
            var b = this;
            $elem = b.elem;
            var c = a * b.colWidth;
            c = Math.abs(c) + $elem.parent().width() > b.width ? b.width - $elem.parent().width() : c, $elem.css({
                left: "-" + c / 10 + "rem"
            })
        },
        makeTouchable: function() {
            var b = this;
            $elem = b.elem, b.width < $elem.parent().width() && $elem.parent().css("width", (b.width - 1) / 10 + "rem"), b.parentWidth = $elem.parent().width(), $elem[0].ontouchstart = function(c) {
                return b.touchStart(a(this), c), !0
            }, $elem[0].ontouchend = function(c) {
                return b.sliding ? (b.sliding = !1, b.touchEnd(a(this), c), !1) : !0
            }, $elem[0].ontouchmove = function(c) {
                if (b.sliding || Math.abs(b.startY - c.targetTouches[0].clientY) < 10) return b.touchMove(a(this), c), !1
            }
        },
        touchStart: function(a, b) {
            a.css({
                "-webkit-transition-duration": "0"
            }), this.startY = b.targetTouches[0].clientY, this.startX = b.targetTouches[0].clientX, this.startLeft = this.getLeft(a), this.touchStartTime = (new Date).getTime()
        },
        getLeft: function(a) {
            return parseInt(a.css("left").substring(0, a.css("left").length - 2), 10)
        },
        touchEnd: function(a, b) {
            var c = this;
            this.getLeft(a) > 0 ? this.isdoslide || (this.doSlide(a, 0, "0.5s"), this.getLeft(a) > this.parentWidth / 2 && this.slideToBegin(a), a.parent().removeClass("sliding"), this.startX = null) : Math.abs(this.getLeft(a)) + this.parentWidth > this.width ? this.isdoslide || (this.doSlide(a, "-" + (this.width - this.parentWidth), "0.5s"), Math.abs(this.getLeft(a)) + this.parentWidth - this.width > this.parentWidth / 2 && this.slideToEnd(a), a.parent().removeClass("sliding"), this.startX = null) : this.slideMomentum(a, b), this.startY = null, setTimeout(function() {
                c.isdoslide = !1
            }, 100)
        },
        doSlide: function(a, b, c) {
            this.isdoslide = !0, a.css({
                left: b + "px",
                "-webkit-transition-property": "left",
                "-webkit-transition-duration": c
            });
            var d = parseInt(Math.abs(b) / this.colWidth),
                e = d + parseInt(this.parentWidth / this.colWidth);
            this.deleTouchEnd(d, e), this.deleTouching(d, e)
        },
        slideMomentum: function(a, b) {
            var c = ((new Date).getTime() - this.touchStartTime) * 10,
                d = this.getLeft(a),
                e = 2e3 * (Math.abs(this.startLeft) - Math.abs(d));
            c = Math.round(e / c);
            var f = c + d,
                g = f % this.colWidth;
            Math.abs(g) > this.colWidth / 2 ? f -= this.colWidth - Math.abs(g) : f -= g;
            if (this.slidingLeft) {
                var h = parseInt("-" + (this.width - this.parentWidth), 10);
                this.doSlide(a, Math.max(h, f), "0.5s")
            } else this.doSlide(a, Math.min(0, f), "0.5s");
            a.parent().removeClass("sliding"), this.startX = null
        },
        touchMove: function(a, b) {
            if (!this.isdoslide) {
                this.sliding || a.parent().addClass("sliding"), this.sliding = !0;
                var c = 0;
                this.startX > b.targetTouches[0].clientX ? (c = -(this.startX - b.targetTouches[0].clientX - this.startLeft), a.css("left", c / 10 + "rem"), this.slidingLeft = !0) : (c = b.targetTouches[0].clientX - this.startX + this.startLeft, a.css("left", c / 10 + "rem"), this.slidingLeft = !1);
                var d = parseInt(-c / this.colWidth),
                    e = d + parseInt(this.parentWidth / this.colWidth);
                this.deleTouching(d, e)
            }
        }
    }
})(jQuery)