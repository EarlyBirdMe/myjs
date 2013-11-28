MI.Slide = function (b) {
    function e(b) {
        b = UI.E(b).target;
        a.page(b.num)
    }

    var a = this, c = b.liFilter || "li";
    a._parent = b.parent || b.target.parentNode.parentNode;
    a._body = b.target;
    a._list = UI.GC(b.target, "ul")[0];
    a._li = UI.GC(a._body, c);
    a._page = a.$(".page") || UI.DC("div");
    a._pages = [];
    a._prev = a.$(".prev") || UI.DC("b");
    a._next = a.$(".next") || UI.DC("b");
    a.onClass = b.onClass || "on";
    if (!a._list || !a._li.length)return a;
    var c = a._li[0], d = parseInt(UI.C(c, "marginLeft")) + parseInt(UI.C(c, "marginRight"));
    a.stepSmall = UI.width(c) + (isNaN == d ? 0 : d);
    a.perPage = parseInt(UI.width(a._body) / a.stepSmall) || 1;
    a.total = Math.ceil(a._li.length / a.perPage);
    a.step = a.perPage * a.stepSmall;
    a._page.innerHTML = (new UI.tmplString(b.tmpl || a.tmpl.page))({num: a.total});
    UI.each(a._page.childNodes, function (b) {
        UI.isElement(b) && a._pages.push(b)
    });
    a.page();
    a._prev && (UI.EA(a._prev, "click", function () {
        a.prev()
    }), UI.EA(a._prev, "click", MI.Slide.click), UI.EA(a._prev, "mouseover", function () {
        a.pause = 1
    }), UI.EA(a._prev, "mouseout", function () {
        a.pause = 0
    }));
    a._next && (UI.EA(a._next, "click", function () {
        a.next()
    }), UI.EA(a._next, "click", MI.Slide.click), UI.EA(a._next, "mouseover", function () {
        a.pause = 1
    }), UI.EA(a._next, "mouseout", function () {
        a.pause = 0
    }));
    UI.each(a._pages, function (b, c) {
        b.num = c + 1;
        UI.EA(b, "click", MI.Slide.click);
        UI.EA(b, "click", e);
        UI.EA(b, "mouseover", function () {
            a.pause = 1
        });
        UI.EA(b, "mouseout", function () {
            a.pause = 0
        })
    });
    UI.EA(a._list, "mouseover", function () {
        a.pause = 1
    });
    UI.EA(a._list, "mouseout", function () {
        a.pause = 0
    });
    1 < a._pages.length ? (b.auto && setInterval(function () {
        a.pause || a.next()
    }, b.auto), UI.show(a._page)) : UI.hide(a._page);
    a.call = b.call;
    UI.isUndefined(b.loop) || (a.loop = b.loop)
};
MI.Slide.click = function (b) {
    b = UI.E(b);
    b.prevent();
    b.target.blur()
};
MI.Slide.prototype = {loop: 1, cur: 1, auto: 0, pause: 0, onClass: "on", tmpl: {page: '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"></a><%}%>'}, $: function (b) {
    return UI.GC(this._parent, b)[0]
}, page: function (b) {
    this.cur = b || this.cur;
    if (this.loop) {
        if (1 > this.cur && (this.cur = this.total), this.cur > this.total)this.cur = 1
    } else {
        if (1 > this.cur)return this.cur = 1, !1;
        if (this.cur > this.total)return this.cur = this.total, !1
    }
    UI.removeClass(UI.GC(this._page, "." + this.onClass)[0], this.onClass);
    UI.addClass(this._pages[this.cur - 1], this.onClass);
    this.scroll();
    this.call && this.call(this.cur)
}, prev: function () {
    this.cur--;
    this.page()
}, next: function () {
    this.cur++;
    this.page()
}, scroll: function () {
    clearInterval(this.delay);
    this.delay = UI.animate(this._list, "marginLeft", -(this.cur - 1) * this.step)
}};
//new MI.Slide({target: $("bn"),auto: 5E3,onClass: "cur",tmpl: '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>cur<%}%>"><%=i+1%></a><%}%>'})
/*version:98696*//*  |xGv00|d4d775a6e4fccba42ac5910b191e7609 */