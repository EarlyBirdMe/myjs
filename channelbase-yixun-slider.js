(function (b, c, e) {
    function a(g, f) {
        return(g && g.hasOwnProperty && (g instanceof f))
    }

    function d(f) {
        if (!(a(this, d))) {
            return new d(f)
        }
        if (!f.dataSource || !f.dataSource.length) {
            return
        }
        this.opt = $.extend({target: null, width: null, height: null, direction: 1, duration: "400", speed: 2000, showLink: true, openTarget: "_blank", showBar: true, mainClass: "main_slide", bodyClass: "body_slide", bottomClass: "bor_slide", showLink: true, pClass: "t", barClass: "ctrl", barLink: false, hoverStop: true, barNumber: true, barArrow: false, dataSource: [
            {link: null, text: null, src: null}
        ]}, f || {});
        this.general();
        this.show(0);
        this.setTimer();
        this.bindHover()
    }

    $.extend(d.prototype, {setTimer: function () {
        var f = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            f.show((f.bars.filter(function () {
                return/(^|\s+)item\d_hover/.test(this.className.toString())
            }).index() + 1) % f.len, true)
        }, this.opt.speed)
    }, clearTimer: function () {
        clearInterval(this.timer)
    }, general: function () {
        var g = this.opt, k = ['<div id="slide_' + (new Date()).getTime() + '" class="' + g.mainClass + '"><ul class="' + g.bodyClass + '">'], j = [];
        this.len = g.dataSource.length;
        for (var f = 0; f < this.len; f++) {
            var h = g.dataSource[f], m = h.text.replace(/<[^>]*>/g, "");
            k.push("<li><a" + (h.ytag ? (' ytag="' + h.ytag + '"') : "") + ' href="' + h.link + '" target="_blank" hotName="' + (h.hotName || "") + '"><img title="' + m + '" alt="' + m + '"  ksrc="' + h.src + '"></a></li>')
        }
        k.push("</ul>");
        if (g.showBar) {
            k.push('<div class="' + g.bottomClass + '">');
            if (g.showLink) {
                k.push('<p class="' + g.pClass + '"><a ' + (g.openTarget !== "_self" ? (' target="' + g.openTarget + '"') : "") + "></a></p>")
            }
            k.push('<ul class="' + g.barClass + '">');
            for (var f = 0; f < this.len; f++) {
                var h = g.dataSource[f];
                k.push('<li class="item' + f + '">' + (g.barLink ? ("<a " + (g.openTarget !== "_self" ? (' target="' + g.openTarget + '"') : "")) + ' href="' + h.link + '">' : "") + (g.barNumber ? (f + 1) : h.text) + (g.barArrow ? '<span class="arrow_bottom"><i>��</i></span>' : "") + (g.barLink ? "</a>" : "") + "</li>")
            }
            k.push("</ul></div>")
        }
        var l = $(k.join(""));
        this.panel = l.find(">ul");
        this.bottom = l.find("." + g.bottomClass);
        if (g.showLink) {
            this.link = this.bottom.find("p>a")
        }
        if (g.showBar) {
            this.bars = this.bottom.find("li")
        }
        $(g.target).html("").append(l)
    }, bindHover: function () {
        if (!this.opt.hoverStop) {
            return
        }
        var f = this;
        this.bars && this.bars.hover(function () {
            f.clearTimer();
            f.show($(this).index())
        }, function () {
            f.setTimer()
        });
        var g = this.panel;
        if (this.opt.showLink) {
            g.add(this.link)
        }
        g.hover(function () {
            f.clearTimer()
        }, function () {
            f.setTimer()
        })
    }, show: function (k, m) {
        if (this.index == k) {
            return
        }
        var l = !!m && k == 0, p = this, i = null, g = this.opt, h = this.panel.find("img:eq(" + k + ")")[0], f = h.getAttribute("src");
        if (!f) {
            h.src = h.getAttribute("ksrc");
            h.removeAttribute("ksrc")
        }
        if (g.showBar) {
            this.bars.removeClass(function (q) {
                return"item" + q + "_hover"
            }).eq(k).addClass("item" + k + "_hover")
        }
        var j = {};
        j[g.direction ? "left" : "top"] = -1 * (l ? p.len : k) * (g.direction ? g.width : g.height);
        if (l) {
            i = this.panel.find(">li:first");
            var n = {position: "relative"};
            n[g.direction ? "left" : "top"] = g[g.direction ? "width" : "height"] * this.len;
            i.css(n)
        }
        this.panel.stop(1, 0).animate(j, g.duration, function () {
            if (l && i) {
                var q = {position: ""};
                q[g.direction ? "left" : "top"] = "";
                i.css(q);
                p.panel.css(g.direction ? "left" : "top", "")
            }
        });
        this.index = k;
        if (g.showLink) {
            var o = g.dataSource[k];
            this.opt.showLink && p.link.attr({href: o.link, title: o.text.replace(/<[^>]+>/g, "")}).html(o.text)
        }
    }});
    b.ui.slidePlay = d
})(G, window);