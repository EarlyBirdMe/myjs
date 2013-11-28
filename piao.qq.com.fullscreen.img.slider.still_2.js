var Live = {};
Live.SimpleImgShow = function () {
    this.config = {showCnt: 6, items: null, playRight: null, playLeft: null, curPage: 0, disCss: "over", showImgOnInit: true, defaultIndex: 0, isPolish: true, onchange: null}
}
Live.SimpleImgShow.prototype = {init: function (_config) {
    for (var prop in _config) {
        this.config[prop] = _config[prop];
    }
    var self = this;
    this.config.playRight.bind("mouseup", function () {
        self.moveR();
    });
    this.config.playLeft.bind("mouseup", function () {
        self.moveL();
    });
    if (this.config.defaultIndex >= 0) {
        this.show(this.config.defaultIndex);
    }
}, play: function (offset) {
    if (offset < 0 && this.config.curPage == 0)
        return;
    var size = this.config.items.elements.length;
    if (offset > 0 && this.config.curPage == Math.ceil(size / this.config.showCnt) - 1)
        return;
    var istart = 0, iend = 0;
    istart = this.config.curPage * this.config.showCnt + offset;
    iend = (this.config.curPage + 1) * this.config.showCnt + offset - 1;
    istart = istart < 0 ? 0 : istart;
    iend = iend > size - 1 ? size - 1 : iend;
    if (!!this.config.isPolish) {
        if (iend - istart + 1 < this.config.showCnt) {
            istart = istart - (this.config.showCnt - (iend - istart)) + 1;
        }
    }
    this.showBySE(istart, iend, offset);
}, showBySE: function (istart, iend, offset) {
    var len = this.config.items.elements.length;
    for (var i = istart; i <= iend && i < len; i++) {
        var $item = this.config.items.get(i);
        if (!$item)
            return;
        if (!!this.config.showImgOnInit) {
            var $img = $item.find("img").elements[0];
            if (!$img.getAttribute('src')) {
                $img.setAttribute('src', $img.getAttribute('_src'))
            }
        }
        $item.show();
    }
    for (var i = 0; i < istart; i++) {
        this.config.items.get(i).hide();
    }
    for (var i = iend + 1, len = this.config.items.elements.length; i < len; i++) {
        this.config.items.get(i).hide();
    }
    if (offset > 0)
        this.config.curPage++; else if (offset < 0)
        this.config.curPage--;
    this.setBtn();
    if (typeof this.config.onchange == "function") {
        this.config.onchange(istart, iend, this.config.curPage);
    }
}, show: function (tabidx) {
    var istart = 0, iend = 0;
    istart = tabidx * this.config.showCnt;
    iend = istart + this.config.showCnt - 1;
    offset = istart - this.config.curPage * this.config.showCnt;
    this.showBySE(istart, iend, offset);
}, moveR: function () {
    this.play(this.config.showCnt);
}, moveL: function () {
    this.play(-1 * this.config.showCnt);
}, setBtn: function () {
    if (this.config.curPage <= 0) {
        this.config.playLeft.addClass(this.config.disCss);
    }
    else {
        this.config.playLeft.removeClass(this.config.disCss);
    }
    var size = this.config.items.elements.length;
    if (this.config.curPage == Math.ceil(size / this.config.showCnt) - 1) {
        this.config.playRight.addClass(this.config.disCss);
    }
    else {
        this.config.playRight.removeClass(this.config.disCss);
    }
}};
Live.still = function () {
    this.config = {pageSize: 9, coverid: "", title: "", photo_popup_url: "http://imgcache.qq.com/piao/js/dianying/movie/icenter_popup.html", jsonUrl: "http://live.qq.com/json/qzmovie/still/", main_div: "#still_main", scroll_container: "#still_scroll_container", items: "#still_scroll_container div", playLeft: "#still_main .page_pre", playRight: "#still_main .page_next", itemTemp: '<div><a href="javascript:;" ><img _index="{index}" height="67" width="67" alt="����" _src="{pic}" onerror="this.src=\'http://imgcache.qq.com/club/movie_channel/pic/zq.gif\'" /></a></div>'};
};
Live.still.prototype = {init: function (_config) {
    for (var prop in _config) {
        this.config[prop] = _config[prop];
    }
    if (!$e(this.config.main_div).elements.length) {
        return;
    }
    var self = this;
    _qqliveMovieStillCallback = function (json) {
        self.showPic(json);
    };
}, popup: function (param, src, iData) {
    window.still_list = iData;
    var dom = QZFL.event.getTarget(), xy = QZFL.dom.getXY(dom), size = QZFL.dom.getSize(dom), offset = [0, 0], scroll = QZONE.dom.getScrollTop(), x = xy[0] + offset[0], y = xy[1] + offset[1]
        - scroll, w = size[0], h = size[1];
    QZONE.FP.fullscreenDialog({src: src + '?params=' + param});
    var _iframe = $("fullscreen_dialog_frame");
    _iframe.G_Param = {'x': x, 'y': y, 'w': w, 'h': h, 'appid': "-403"};
    QZFL.event.preventDefault();
}, showPic: function (json) {
    var self = this;
    var sb = [];
    var listlength = json.list.length;
    var len = 48;
    var cur = 0;
    var title = this.config.title;

    function getSlimShoot(url) {
        return url.replace(".jpg", "_100_100.jpg");
    }

    for (var i = 0; i < listlength && cur < len; i++) {
        var item = json.list[i];
        item.name = title;
        sb.push(this.config.itemTemp.replace("{index}", i).replace("{pic}", getSlimShoot(item.url)));
        cur++;
    }
    $e(this.config.main_div).show();
    $e(this.config.scroll_container).setHtml(sb.join(''));
    var hottvshow = new Live.SimpleImgShow();
    hottvshow.init({showCnt: self.config.pageSize, items: $e(self.config.items), playRight: $e(self.config.playRight), playLeft: $e(self.config.playLeft)});
    $e(self.config.scroll_container + " a").bind("click", function (evt) {
        var el = evt.srcElement || evt.target;
        self.popup(el.getAttribute("_index"), self.config.photo_popup_url, json.list);
        return false;
    });
}};
var _qqliveMovieStillCallback;
QZONE.FrontPage = {};
QZONE.FP = QZONE.FrontPage;
QZONE.FrontPage.fullscreenDialog = function (html) {
    var _self = QZONE.FrontPage.fullscreenDialog;
    var _cw = QZFL.dom.getClientWidth();
    var _ch = QZFL.dom.getClientHeight();
    if (typeof(html) == 'object') {
        html = _self.template_iframe.replace(/__p__/g, ' src="' + html.src + '" height="' + _ch + '" width="' + _cw + '"');
    } else {
        html = html + "";
    }
    var fsdiv = document.createElement("div");
    fsdiv.id = "fullscreen_dialog_div";
    fsdiv.style.position = "absolute";
    fsdiv.style.left = "0px";
    fsdiv.style.top = QZFL.dom.getScrollTop() + "px";
    fsdiv.style.zIndex = 8999;
    fsdiv.innerHTML = html;
    document.body.appendChild(fsdiv);
    QZFL.event.addEvent(window, "resize", QZONE.FrontPage.fullscreenDialog._reSize);
    _self._fnl = [function () {
        QZFL.event.removeEvent(window, "resize", QZONE.FP.fullscreenDialog._reSize);
    }];
    if (PIAO) {
        setTimeout(function () {
            if (QQVIP.userAgent.ie < 7) {
                $e("#tenvideo_flash_player_0").hide();
            }
            PIAO.MASK.show();
        }, 0);
    }
};
QZONE.FrontPage.fullscreenDialog.template_iframe = '<iframe id="fullscreen_dialog_frame" frameborder="no" allowtransparency="yes"__p__></iframe>';
QZONE.FrontPage.fullscreenDialog._reSize = function () {
    var _self = QZONE.FrontPage.fullscreenDialog;
    var _cw = QZFL.dom.getClientWidth();
    var _ch = QZFL.dom.getClientHeight();
    var _f = QZFL.dom.get("fullscreen_dialog_frame");
    var _d = QZFL.dom.get("fullscreen_dialog_div");
    QZFL.dom.setSize(_f, _cw, _ch);
    QZFL.dom.setSize(_d, _cw, _ch);
};
QZONE.FrontPage.closeFullScreenDialog = function () {
    QZFL.event.removeEvent(window, "resize", QZONE.FrontPage.fullscreenDialog._reSize);
    var _self = QZONE.FrontPage.fullscreenDialog;
    QZFL.dom.removeElement($("fullscreen_dialog_div"));
    if (PIAO) {
        PIAO.MASK.hide();
        if (QQVIP.userAgent.ie < 7) {
            $e("#tenvideo_flash_player_0").show();
        }
    }
    var tmp = _self._fnl;
    if (tmp && tmp.length > 0) {
        for (; tmp.length > 0;) {
            tf = tmp.pop();
            if (typeof(tf) == 'function') {
                tf();
            }
        }
    }
};
QZONE.FrontPage.clearFullscreenFn = function () {
    var _self = QZONE.FrontPage.fullscreenDialog;
    if ((_self._fnl instanceof Array) && (_self._fnl.length > 0)) {
        _self._fnl = null;
        delete _self._fnl;
    }
    _self._fnl = [];
};
QZONE.FrontPage.hideMsgbox = function () {
};
var g_V = {qz: "_2.0.8.4"}
QZONE.FP._t = {QZONE: {FrontPage: {popupDialog: {_cpp: null}}}};
/*  |xGv00|bf483119ce46a4799c1b445b4b986064 */