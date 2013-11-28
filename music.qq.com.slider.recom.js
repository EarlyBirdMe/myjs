MUSIC.module.imgslide = function (container, time, imgArr, tpl, name, statFun, filterFlag) {
    this._name = name || 'g_imgPlayer';
    this._timer = null;
    this._stat = null;
    this._items = [];
    this._container = null;
    this._index = 0;
    this._intervalTime = 5000;
    this.tpl = {_img_tpl: '', _page_tpl: '', _focus_tpl: ''};
    if (typeof(filterFlag) == 'undefined') {
        filterFlag = true;
    }
    this._filterFlag = filterFlag;
    this._timerFilter = new MUSIC.widget.Timer();
    if (typeof(tpl) != 'undefined') {
        MUSIC.object.extend(this.tpl, tpl || {});
    }
    if (typeof(statFunc) != 'undefined') {
        this._stat = statFunc;
    }
    this._container = MUSIC.dom.get(container);
    this._intervalTime = time || this._intervalTime;
    var _html_img = [], _html_page = [];
    this._items = imgArr;
    for (var i = 0, len = this._items.length; i < len; i++) {
        _html_img.push(this.tpl._img_tpl.jstpl_format({page_class: i == 0 ? "class='current'" : "", display_img: i == 0 ? "block" : "none", link: this._items[i].link, index: i + 1, id: this._items[i].id, target: this._items[i].target, img: this._items[i].img, title: this._items[i].title, icon: this._items[i].icon == 1 ? 'block' : 'none', desc: this._items[i].desc}));
        _html_page.push(this.tpl._page_tpl.jstpl_format({page_class: i == 0 ? "class='current'" : "", page_index: i + 1, link: this._items[i].link, index: i, id: this._items[i].id, target: this._items[i].target, title: this._items[i].title, simg: this._items[i].simg, icon: this._items[i].icon == 1 ? 'block' : 'none', desc: this._items[i].desc}));
    }
    this._container.innerHTML = this.tpl._focus_tpl.jstpl_format({img_info: _html_img.join(''), page_info: _html_page.join('')});
    this._container._name = this._name;
    this._container._intervalTime = this._intervalTime;
    this._container.onmouseover = this.stop;
    this._container.onmouseout = this.start;
    var _elem = MUSIC.dom.get("ptitle" + this._name);
    if (_elem) {
        var iconD = this._items[0].icon == "1" ? "block" : "none";
        _elem.innerHTML = '<li class="current"> <a href="' + this._items[0].link + '" class="focus_icon_play" style="display:' + iconD + ';" onclick="' + this._name + '.stat(0, ' + this._items[0].id + ');" target="' + this._items[0].target + '"></a> <h3><a href="' + this._items[0].link + '" class="" onclick="g_imgPlayer.stat(0);" target="' + this._items[0].target + '">' + this._items[0].title + '</a></h3> <p class="">' + this._items[0].desc + '</p> </li>';
    }
    this.start();
    this._container._timer = this._timer;
};
MUSIC.module.imgslide.prototype.play = function (index) {
    if (typeof(index) == 'undefined') {
        index = this._index + 1;
    }
    index = index % this._items.length;
    if (index == this._index) {
        return;
    }
    this._timerFilter.stop();
    var _elems = MUSIC.dom.get("divimginfo" + this._name).getElementsByTagName("li"), _old = _elems[this._index], _new = _elems[index];
    var freq = 30, totaltimes = 10;
    this._timerFilter.freq = freq;
    this._timerFilter.totaltimes = totaltimes;
    function _filt(a, b) {
        a.style.display = 'block';
        if (!a) {
            return;
        }
        if (b >= 100) {
            a.style.filter = "none";
            a.style.opacity = 1;
            return;
        }
        a.style.filter = "alpha(opacity=" + b + ")";
        a.style.opacity = b / 100;
    }

    this._timerFilter.callback = function (times) {
        if (this._filterFlag) {
            _filt(_old, (totaltimes - times) / totaltimes * 100);
            _filt(_new, times / totaltimes * 100);
        } else {
            hideElement(_old);
            showElement(_new);
        }
    };
    this._timerFilter.endcallback = function () {
        hideElement(_old);
        showElement(_new);
    };
    this._timerFilter.start();
    try {
        _elems = MUSIC.dom.get("divpageinfo" + this._name).getElementsByTagName("li");
        if (_elems.length == 0) {
            _elems = MUSIC.dom.get("divpageinfo" + this._name).getElementsByTagName("a");
        }
        MUSIC.css.removeClassName(_elems[this._index], "current");
        MUSIC.css.addClassName(_elems[index], "current");
    }
    catch (e) {
    }
    var _elem = MUSIC.dom.get("ptitle" + this._name);
    if (_elem) {
        var iconD = this._items[index].icon == "1" ? "block" : "none";
        _elem.innerHTML = '<li class="current"> <a href="' + this._items[index].link + '" class="focus_icon_play" style="display:' + iconD + ';" onclick="' + this._name + '.stat(' + index + ', ' + this._items[index].id + ');" target="' + this._items[index].target + '"></a> <h3><a href="' + this._items[index].link + '" class="" onclick="g_imgPlayer.stat(' + index + ');" target="' + this._items[index].target + '">' + this._items[index].title + '</a></h3> <p class="">' + this._items[index].desc + '</p> </li>';
    }
    this._index = index;
};
MUSIC.module.imgslide.prototype.prev = function () {
    var index = (this._index - 1 + this._items.length) % this._items.length;
    ;
    this.play(index);
};
MUSIC.module.imgslide.prototype.next = function () {
    var index = (this._index + 1) % this._items.length;
    this.play(index);
};
MUSIC.module.imgslide.prototype.start = function () {
    if (this._timer == null) {
        this._timer = setInterval(this._name + ".play()", this._intervalTime);
    }
    hideElement("divfocuspage" + this._name);
};
MUSIC.module.imgslide.prototype.stop = function () {
    if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
    }
    showElement("divfocuspage" + this._name);
};
MUSIC.module.imgslide.getPageSouce = function () {
    var reg_map = {'static/index.html': 'index', 'static/mv/': 'mv'};
    for (var reg in reg_map) {
        var r = new RegExp(reg);
        if (r.test(window.location.href))
            return reg_map[reg];
    }
    return'index';
};
MUSIC.module.imgslide.prototype.stat = function (index, id) {
    if (this._stat) {
        this._stat(index);
    } else {
        pgvClickStat(MUSIC.module.imgslide.getPageSouce() + '.focus.' + index);
        g_stat3(217, id);
    }
};
MUSIC.module.imgslide.prototype.stat2 = function (id) {
}
var g_imgPlayer = null, g_imgPlayer2 = null;
MUSIC.channel.recom = {_focusnum: 10, _curTab: {album: "a1", song: "zx"}, _curTabPage: {album: 1, song: 0}, _albumTabs: ["a1", "a2", "a3", "a4"], _albumTabsTitle: {"a1": "1", "a2": "2", "a3": "3", "a4": "4"}, _albumTabsIndex: {"zx": 1, "zr": 2}, _songTabs: ["zx", "jp", "eu", "zr", "zhi", "neidi", "gangtai", "oumei", "rihan"], _songTabsTitle: {"zx": "华语", "eu": "欧美", "jp": "日韩", "zr": "热歌", "zhi": "流行指数", "neidi": "内地", "gangtai": "港台", "oumei": "欧美", "rihan": "日韩"}, _songTabsIndex: {"zx": 1, "eu": 2, "jp": 3, "zr": 4, "zhi": 5, "neidi": 6, "gangtai": 7, "oumei": 8, "rihan": 9}, data: {songlist: null, simsonglist: null, albumlist: null}, simsongrule: 0, _isDataLoading: false, _callback: null, loadFocus: function () {
    var url = "http://music.qq.com/midportal/static/recom//recom_focus_2.js";

    function dealFocusSucc(data) {
        if (data.length > 0) {
            var len = Math.min(g_recomChn._focusnum, data.length);
            var imgArr = [];
            for (var i = 0; i < len; i++) {
                imgArr.push({title: data[i]["title"], link: data[i]["url"], img: data[i]["img"], simg: data[i]["simg"], target: data[i]["target"], desc: "", onclick: "", icon: data[i]["icon"], id: data[i]["id"]});
            }
            var _imgTpl = {_img_tpl: '<li style="display:%(display_img);"><a href="%(link)" onclick="g_imgPlayer.stat(%(index), %(id));" target="%(target)"><img src="%(img)" alt="%(title)" width="700" height="320" /></a></li>', _page_tpl: '<li %(page_class)><a href="%(link)" onmouseover="g_imgPlayer.play(%(index));return false;"  target="%(target)" onclick="g_imgPlayer.play(%(index));g_imgPlayer.stat(%(index), %(id));"><img src="%(simg)" alt="%(title)" width="60" height="60" /><span class="border"></span><span class="mask"></span></a></li>', _focus_tpl: ['<ul class="mod_focus_pic" id="divimginfog_imgPlayer">%(img_info)</ul>', '<ul class="mod_focus_title" id="ptitleg_imgPlayer">', '</ul>', '<div class="focus_switch"><a href="javascript:;" class="icon_prev" onclick="g_imgPlayer.prev()"></a><a href="javascript:;" class="icon_next" onclick="g_imgPlayer.next()"></a></div>', '<ul class="mod_focus_list" id="divpageinfog_imgPlayer">%(page_info)</ul>'].join('')};
            g_imgPlayer = new MUSIC.module.imgslide("divimgplay", 5000, imgArr, _imgTpl);
        } else {
            dealFocusFail();
        }
    };
    function dealFocusFail() {
    };
    var j = new MUSIC.JSONGetter(url, "recomfocus", null, "utf-8", false);
    j.onSuccess = dealFocusSucc;
    j.onError = dealFocusFail;
    j.send("MusicJsonCallback");
}, loadAd: function (obj) {
    function _load() {
        try {
            var elem = MUSIC.dom.get("divmodads");
            if (elem) {
                var len = Math.min(3, obj.length);
                var imgArr = [];
                for (var i = 0; i < len; i++) {
                    imgArr.push({title: obj[i]["title"], link: obj[i]["url"], img: obj[i]["img"], simg: "", target: obj[i]["target"], desc: "", onclick: "", icon: 0, id: 0});
                }
                var _imgTpl = {_img_tpl: '<li %(page_class)><a href="%(link)" onclick="g_imgPlayer2.stat(%(index));" target="%(target)"><img src="%(img)" alt="%(title)"></a></li>', _page_tpl: '<a href="javascript:;" onmouseover="g_imgPlayer2.play(%(index));return false;"  onclick="g_imgPlayer2.play(%(index));" %(page_class)>%(index)</a>', _focus_tpl: ['<ul id="divimginfog_imgPlayer2">%(img_info)</ul>', '<div class="switch" id="divpageinfog_imgPlayer2">%(page_info)</div>'].join('')};
                g_imgPlayer2 = new MUSIC.module.imgslide("divmodads", 5000, imgArr, _imgTpl, "g_imgPlayer2", function (id) {
                    top.pgvClickStat('index.ad.' + id);
                }, false);
                showElement(elem);
                g_musicMain.resizePage();
            }
        } catch (e) {
        }
    }

    _load();
}, getSongAlbumInfo: function (callback) {
    if (this.data.songlist) {
        callback();
        return;
    }
    this._callback = callback;
    if (this._isDataLoading) {
        return;
    }
    var _this = this, url = "http://y.qq.com/y/static/recom/song.js", j = new MUSIC.JSONGetter(url, "recomsong", null, "utf-8", false);
    j.onSuccess = function (data) {
        _this.data.albumlist = {};
        _this.data.songlist = {};
        for (var i = 0; i < _this._albumTabs.length; i++) {
            var _tab = _this._albumTabs[i];
            _this.data.albumlist[_tab] = data["al" + _tab];
        }
        for (var i = 0; i < _this._songTabs.length; i++) {
            var _tab = _this._songTabs[i];
            _this.data.songlist[_tab] = data["sl" + _tab];
        }
        _this._callback();
        _this._isDataLoading = false;
    };
    j.onError = function () {
        _this._isDataLoading = false;
    };
    j.send("MusicJsonCallback");
    _this._isDataLoading = true;
}, getSimSongInfo: function (callback) {
    var uin = LoginMiniportal();
    if (uin < 10001) {
        return;
    }
    if (this.data.simsonglist) {
        callback();
        return;
    }
    var _this = this, url = "http://s.plcloud.music.qq.com/fcgi-bin/song_sim.fcg?utf8=1&start=1&num=48&uin=" + uin + "&rnd=" + new Date().valueOf(), j = new MUSIC.JSONGetter(url, "simsong", null, "utf-8", false);
    j.onSuccess = function (data) {
        _this.data.simsonglist = [];
        if (data.retcode == 0) {
            _this.simsongrule = data.rule_id;
            MUSIC.object.each(data.songs, function (info) {
                var _data = unescape(unescape(info.data)).replace(/\+/ig, " ");
                _this.data.simsonglist.push({s: _data});
            });
            if (_this.data.simsonglist.length < 48) {
                g_popup.show(1, "获取猜您喜欢歌曲信息失败！", "当前网络繁忙，请您稍后重试。", 3000, 320);
                return;
            }
            callback();
        } else if (data.retcode == -2) {
            g_trackServ.loginMiniportal();
        } else {
            g_popup.show(1, "获取猜您喜欢歌曲信息失败！", "当前网络繁忙，请您稍后重试。", 3000, 320);
        }
    };
    j.onError = function () {
        g_popup.show(1, "获取猜您喜欢歌曲信息失败！", "当前网络繁忙，请您稍后重试。", 3000, 320);
    };
    j.send("SongRecCallback");
}, showSongTab: function (tab, page, elid) {
    var _this = this;

    function getSongHtml(obj, i) {
        var tpl = {first: ['<li class="recommend_top" f="%(song_data)">', '<span class="data">%(song_data)</span>', '<em>1</em>', '<a class="mod_poster">', '<img src="%(albumpic)"  onerror="this.src=\'http://imgcache.qq.com/mediastyle/y/img/cover_mine_130.jpg\'" width="50" height="50" alt="%(song_name)" title="%(song_name)"/>', '</a>', '<h5 onmouseover="this.className=\'hover\'" onmouseout="this.className=\'\'"><a href="javascript:;" onclick="g_trackServ.showSingleSong(this);" title="%(song_name)">%(short_song_name)</a></h5>', '<p class="recommend_singer" title="%(singer_name)">%(short_singer_name)</p>', '<p class="recommend_album">%(album_name)</p>', '<span class="count "></span>', '<div class="list_cp">', '%(btn_play)', '%(btn_add)', '%(btn_like)', '%(btn_fav)', '%(btn_share)', '</div>', '</li>'].join(''), last: ['<li onmouseover="this.className = \'hover\';" onmouseout="this.className = \'\';">', '<span class="data">%(song_data)</span>', '<em>%(index)</em>', '<h5 onmouseover="this.className=\'hover\'" onmouseout="this.className=\'\'"><a href="javascript:;" onclick="g_trackServ.showSingleSong(this,\'Rankingn.music%(sindex)\');" title="%(song_name)">%(short_song_name)</a>-<span class="recommend_singer "><a href=\"/y/static/singer%(singer_idmod100)%(singer_id).html\" onclick="pgvClickStat(\'index.Rankingn.singer%(sindex)\');" title=\"%(singer_name)\">%(short_singer_name)</a></span></h5>', '<span class="count "></span>', '<div class="list_cp">', '%(btn_play)', '%(btn_add)', '%(btn_like)', '%(btn_fav)', '%(btn_share)', '</div>', '</li>'].join('')};
        var toplist_tpl = {first: ['<li class="rank_top">', '<span class="data">%(song_data)</span>', '<em>%(index)</em>', '<a class="mod_poster" href="/y/static/album%(album_idmod100)%(album_id).html?pgv_ref=qqmusic.y.index.Ranking.pic%(nol)" title=\"%(album_name)\"><img src="%(albumPic)"  onerror="this.src=\'http://imgcache.qq.com/mediastyle/y/img/cover_mine_130.jpg\'" width="50" height="50" alt="%(album_name)" title="%(album_name)"/></a>', '<h5 onmouseover="this.className=\'hover\'" onmouseout="this.className=\'\'"><a href="javascript:;" onclick="g_trackServ.showSingleSong(this);pgvClickStat(\'index.Ranking.music%(songindex)\');" title="%(song_name)">%(short_song_name)</a></h5>', '<p><a href="/y/static/singer%(singer_idmod100)%(singer_id).html?pgv_ref=qqmusic.y.index.Ranking.Singer%(songindex)" title="%(singer_name)">%(singer_name)</a></p>', '</li>'].join(''), last: ['<li>', '<span class="data">%(song_data)</span>', '<em>%(index)</em>', '<h5 onmouseover="this.className=\'hover\'" onmouseout="this.className=\'\'"><a href="javascript:;" onclick="g_trackServ.showSingleSong(this);pgvClickStat(\'index.Ranking.music%(songindex)\');" title="%(song_name)">%(short_song_name)</a></h5>', '<p><a href="/y/static/singer%(singer_idmod100)%(singer_id).html?pgv_ref=qqmusic.y.index.Ranking.Singer%(songindex)"title="%(singer_name)">%(singer_name)</a></p>', '</li>'].join('')}
        var musicObj = g_trackServ.formatMusic(obj.s);
        var songnamelen = 18;
        var singernamelen = 8;
        var data = {};
        data.song_data = obj.s;
        data.count = obj.c;
        if (obj.vid && obj.vid != "") {
            data.trackMvInfo = '<a href="javascript:;" onclick="g_trackServ.watchMv(\'' + obj.vid + '\');"><i title="MV" class="icon_mv"></i></a>';
            songnamelen -= 2;
        }
        if (obj.isShoufa) {
            data.trackShoufaIcon = '<i class="icon_exclusive"></i>';
            songnamelen -= 4;
        }
        if (obj.wb && obj.wb != "") {
            data.miniblog_icon = '<a href="javascript:;" onclick="jumpMiniblogWithLogin(\'http://t.qq.com/' + obj.wb.trim() + '\');stat_miniblog(' + musicObj.msingerid + ');"><i title="腾讯微博" class="icon_t"></i></a>';
            singernamelen -= 2;
        }
        if (obj.showurl && obj.showurl != "") {
            data.ticket_icon = '<a href="javascript:;" onclick="jumpPiaoWithLogin(\'' + obj.showurl.trim() + '\');"><i title="巡演中" class="icon_ticket"></i></a>';
            singernamelen -= 2;
        }
        data.tab_index = _this._songTabsIndex[tab];
        if (tab != "cwxh") {
            data.play_stat = "recom_stat(117, " + data.tab_index + ");";
            data.add_stat = "recom_stat(118, " + data.tab_index + ");";
        } else {
            data.play_stat = "g_stat(170, " + _this.simsongrule + ");";
            data.add_stat = "g_stat(171, " + _this.simsongrule + ");";
        }
        data.song_name = musicObj.msong.unescapeHTML().replace(/\"/g, "&quot;");
        data.short_song_name = musicObj.msong.unescapeHTML().unescapeHTML().cut(songnamelen).escapeHTML();
        data.singer_id = (g_mid.checkMid() ? "" : "singer_") + g_mid.getID({id: musicObj.msingerid, mid: musicObj.msingermid});
        data.singer_idmod100 = g_mid.getMidPath({id: musicObj.msingerid, mid: musicObj.msingermid});
        data.singer_name = musicObj.msinger;
        data.album_id = (g_mid.checkMid() ? "" : "album_") + g_mid.getID({id: musicObj.malbumid, mid: musicObj.malbummid.trim()}) + (g_mid.checkMid() ? "" : "_1.html");
        data.album_idmod100 = g_mid.getMidPath({id: musicObj.malbumid, mid: musicObj.malbummid.trim()});
        data.albumPic = g_mid.getAlbumPic({id: musicObj.malbumid, mid: musicObj.malbummid.trim(), type: 68});
        data.album_name = musicObj.malbum;
        data.short_singer_name = musicObj.msinger.unescapeHTML().unescapeHTML().cut(singernamelen).escapeHTML();
        data.index = i;
        if (tab == 'zx') {
            data.sindex = i + 1;
        } else if (tab == 'jp') {
            data.sindex = i + 1 + 12 * 1;
        } else if (tab == 'eu') {
            data.sindex = i + 1 + 12 * 2;
        }
        MUSIC.object.extend(data, g_trackServ.getSongButtonHtml(musicObj, "Rankingn.icon" + (data.sindex)));
        if (!i) {
            if (typeof(elid) != "undefined" && elid.songList == "topSongList") {
                data.nol = _this._songTabsIndex[tab] - 4;
                data.songindex = (i + (data.nol - 1) * 10 + 1);
                return toplist_tpl.first.jstpl_format(data);
            } else
                return tpl.last.jstpl_format(data);
        } else {
            if (typeof(elid) != "undefined" && elid.songList == "topSongList") {
                data.nol = _this._songTabsIndex[tab] - 4;
                data.songindex = (i + (data.nol - 1) * 10 + 1);
                return toplist_tpl.last.jstpl_format(data);
            } else
                return tpl.last.jstpl_format(data);
        }
    }

    function getSongTabHtml() {
        var tpl = "";
        if (typeof(elid) != "undefined") {
            tpl = '<li %(classon)> <a href="javascript:;" onclick="g_recomChn.showSongTab(\'%(tab)\', 0, {songList:\'' + elid.songList + '\',tag:\'' + elid.tag + '\'});pgvClickStat(\'index.Ranking.tab%(index)\');" class="">%(title)</a> </li>';
        } else tpl = '<li %(classon)> <a href="javascript:;" onclick="g_recomChn.showSongTab(\'%(tab)\');pgvClickStat(\'index.Rankingn.tab%(index)\');" class="">%(title)</a> </li>';
        var html = [];
        var i = 0, len = g_recomChn._songTabs.length, beg = 0, end = 0;
        if (tab == "zhi" || tab == "neidi" || tab == "gangtai" || tab == "oumei" || tab == "rihan") {
            beg = 4;
            end = 9;
        } else {
            beg = 0;
            end = 3;
        }
        for (i = beg; i < end; i++) {
            var data = {};
            data.tab = g_recomChn._songTabs[i];
            if (data.tab == tab) {
                data.classon = ' class="current" ';
            }
            if (i == end - 1) {
                data.classon = ' class="last" ';
                if (data.tab == tab) {
                    data.classon = ' class="last current" ';
                }
            }
            if (i == beg) {
                data.classon = ' class="first" ';
                if (data.tab == tab) {
                    data.classon = ' class="first current" ';
                }
            }
            data.title = g_recomChn._songTabsTitle[data.tab];
            data.index = i - beg + 1;
            html.push(tpl.jstpl_format(data));
        }
        return html.join('');
    }

    function _render(list) {
        var html = [];
        var i = 0, len = list.length;
        for (; i < len && i < 12; i++) {
            html.push(getSongHtml(list[i], i));
        }
        if (typeof(elid) == "undefined") {
            MUSIC.dom.get("divsonglist1").innerHTML = html.join('');
            MUSIC.dom.get("divsongtag").innerHTML = getSongTabHtml();
            g_trackServ.initSongList("divsonglist1");
            g_trackServ.getSongsCount('divsonglist1', 'span');
        } else {
            MUSIC.dom.get(elid.songList).innerHTML = html.join('');
            MUSIC.dom.get(elid.tag).innerHTML = getSongTabHtml();
        }
        g_recomChn._curTab.song = tab;
    }

    function _changeCurPage(curpage) {
        var divSongPage = MUSIC.dom.get("divsongtabpager");
        if (divSongPage) {
            var _elems = divSongPage.getElementsByTagName("a");
            MUSIC.css.removeClassName(_elems[g_recomChn._curTabPage.song + 1], "on");
            MUSIC.css.addClassName(_elems[curpage + 1], "on");
        }
        g_recomChn._curTabPage.song = curpage;
    }

    page = page || 0;
    var _beg = page * 12, _end = (page + 1) * 12;
    if (g_recomChn._curTab.song == tab && g_recomChn._curTabPage.song == page) {
        return;
    }
    if (tab == "cwxh") {
        this.getSimSongInfo(function () {
            var _tmplist = MUSIC.lang.objectClone(g_recomChn.data.simsonglist);
            _render(_tmplist.slice(_beg, _end));
            _changeCurPage(page);
        });
    } else {
        this.getSongAlbumInfo(function () {
            var _tmplist = MUSIC.lang.objectClone(g_recomChn.data.songlist[tab]);
            _render(_tmplist.slice(_beg, _end));
            _changeCurPage(page);
        });
    }
    recom_stat(this._songTabsIndex[tab] + 111);
}, goSongPageNum: function (page) {
    page = page || 0;
    if (g_recomChn._curTabPage.song == page) {
        return;
    }
    this.showSongTab(g_recomChn._curTab.song, page);
}, goSongPagePos: function (pos) {
    var page = (g_recomChn._curTabPage.song + pos + 4) % 4;
    this.showSongTab(g_recomChn._curTab.song, page);
}, showAlbumTab: function (tab, page) {
    _this = this;
    function getAlbumHtml(obj) {
        var tpl = ['<li pvalue="%(album_id)">', '<a href="/y/static/album%(album_idmod100)%(album_id).html?pgv_ref=qqmusic.y.index.music.pic%(index)" class="mod_poster_130">', '<img src="%(albumpic)" onerror="this.src=\'http://imgcache.qq.com/mediastyle/y/img/cover_mine_130.jpg\'" width="130" height="130" alt="%(album_name)" title="%(album_name)"/>', '<span class="icon_play" onclick="g_trackServ.playAlbum(\'%(album_id)\', \'music.play%(index)\');return false;" onmouseover="this.className=\'icon_play icon_play_hover\'" onmouseout="this.className=\'icon_play\'" title="播放"></span>', '<span class="shadow"></span>', '<strong class="album_name " href="/y/static/album%(album_idmod100)%(album_id).html" title="%(album_name)">%(album_name)</strong>', '<strong class="album_singer "  title="%(singer_name)" onclick="recom_stat();" href="/y/static/singer%(singer_idmod100)%(singer_id).html">%(short_singer_name)</strong>', '</a>', '</li>'].join('');
        var data = {};
        data.index = obj.index;
        data.album_id = (g_mid.checkMid() ? "" : "album_") + g_mid.getID({id: obj.id, mid: obj.mid}) + (g_mid.checkMid() ? "" : "_1.html");
        data.album_idmod100 = g_mid.getMidPath({id: obj.id, mid: obj.mid});
        data.albumpic = g_mid.getAlbumPic({id: obj.id, mid: obj.mid, type: 150});
        data.album_name = obj.name;
        data.short_album_name = obj.name;
        data.singer_id = (g_mid.checkMid() ? "" : "singer_") + g_mid.getID({id: obj.sid, mid: obj.smid});
        data.singer_idmod100 = g_mid.getMidPath({id: obj.sid, mid: obj.smid});
        data.singer_name = obj.sname;
        data.short_singer_name = obj.sname;
        var _map = ['', '<i class="icon_hq" title="高品质音乐"></i>', '<i class="icon_hifi" title="无损音乐"></i>'];
        if (obj.t >= 0 && obj.t <= 2) {
            data.album_icon = _map[obj.t];
        }
        data.tab_index = _this._albumTabsIndex[tab];
        return tpl.jstpl_format(data);
    }

    function getAlbumTabHtml() {
        var tpl = '<a href="javascript:;" onclick="g_recomChn.showAlbumTab(\'%(tab)\');pgvClickStat(\'index.music.%(ln)\');" class="%(classon)" %(title)></a>';
        var html = [];
        var i = 0, len = g_recomChn._albumTabs.length;
        for (i = 0; i < 2; i++) {
            var data = {};
            data.ln = i ? "next" : "last";
            switch (tab) {
                case g_recomChn._albumTabs[0]:
                    data.tab = !i ? "a1" : "a2";
                    data.classon = !i ? "cp_prev_disabled" : "cp_next";
                    data.title = !i ? "" : "title=\"下一页\"";
                    break;
                case g_recomChn._albumTabs[1]:
                    data.tab = !i ? "a1" : "a3";
                    data.classon = !i ? "cp_prev" : "cp_next";
                    data.title = !i ? "title=\"上一页\"" : "title=\"下一页\"";
                    break;
                case g_recomChn._albumTabs[2]:
                    data.tab = !i ? "a2" : "a4";
                    data.classon = !i ? "cp_prev" : "cp_next";
                    data.title = !i ? "title=\"上一页\"" : "title=\"下一页\"";
                    break;
                case g_recomChn._albumTabs[3]:
                    data.tab = !i ? "a3" : "a4";
                    data.classon = !i ? "cp_prev" : "cp_next_disabled";
                    data.title = !i ? "title=\"上一页\"" : "";
                    break;
                default:
                    break;
            }
            html.push(tpl.jstpl_format(data));
        }
        return html.join('');
    }

    if (g_recomChn._curTab.album == tab) {
        return;
    }
    this.getSongAlbumInfo(function () {
        var list = g_recomChn.data.albumlist[tab];
        var html = [];
        var i = 0, len = list.length;
        html.push('');
        for (; i < len && i < 10; i++) {
            list[i].index = i + 1;
            html.push(getAlbumHtml(list[i]));
        }
        html.push('');
        MUSIC.dom.get("divalbumtag").innerHTML = getAlbumTabHtml();
        MUSIC.dom.get("divalbumlist").innerHTML = html.join('');
        g_recomChn._curTab.album = tab;
    });
    recom_stat(this._albumTabsIndex[tab] + 107);
}, getSongDirNum: function () {
    var uin = uin || g_user.getUin();
    if (uin < 10001) {
        dealFail();
        return;
    }
    var itemTpl = ['<li %(css)>', '<a href="javascript:;"  onclick="g_recomChn.jumpSummary(\'%(target)\',\'%(hasNewCount)\');return false;">', '<strong>%(num)</strong>', '<span>%(name)</span>', '%(newCount)', '</a>', '</li>'].join('');
    var url = "http://s.plcloud.music.qq.com/fcgi-bin/myfriend_follow_summary.fcg?utf8=1&uin=" + uin + "&p=" + new Date();

    function dealSucc(data) {
        if (data.ret == 0) {
            var html = [];
            html.push(itemTpl.jstpl_format({num: parseInt(data.songdir_num, 10) + parseInt(data.order_songdir_num, 10), name: '歌单', css: 'onmouseover="this.className=\'follower\'" onmouseout="this.className=\'\'"', hasNewCount: '', newCount: '', target: 'albumlist'}));
            html.push(itemTpl.jstpl_format({num: parseInt(data.follow_num, 10), name: '收听', newCount: '', css: 'onmouseover="this.className=\'follower\'" onmouseout="this.className=\'\'"', hasNewCount: '', target: 'singer'}));
            var _countHtml = '';
            if (data.new_listen_num > 0) {
                _countHtml = '<span class="new_count">+' + data.new_listen_num + '</span>';
            }
            html.push(itemTpl.jstpl_format({num: data.listen_num, name: '听众', css: 'class="last" onmouseover="this.className=\'follower last\'" onmouseout="this.className=\'last\'"', hasNewCount: data.new_listen_num > 0 ? '1' : '', newCount: _countHtml, target: 'mylisten'}));
            var _d = MUSIC.dom.get("user_summary");
            if (!!_d) {
                _d.innerHTML = html.join('');
            }
        } else {
            dealFail();
        }
    };
    function dealFail() {
        var html = ['<li onmouseover="this.className=\'follower\'" onmouseout="this.className=\'\'">', '<a href="/y/static/mymusic/mymusic_albumlist.html" title="我的歌单">', '<strong>0</strong>', '<span>歌单  </span>', '</a>', '</li>', '<li onmouseover="this.className=\'follower\'" onmouseout="this.className=\'\'">', '<a href="/y/static/mymusic/mymusic_follow_listen.html?type=singer" title="收听">', '<strong>0</strong>', '<span>收听  </span>', '</a>', '</li>', '<li class="last" onmouseover="this.className=\'follower last\'" onmouseout="this.className=\'last\'">', '<a href="/y/static/mymusic/mymusic_follow_listen.html?type=mylisten" title="听众">', '<strong>0</strong>', '<span>听众   </span>', '</a>', '</li>'].join('');
        var _d = MUSIC.dom.get("user_summary");
        if (!!_d) {
            _d.innerHTML = html.join('');
        }
    };
    var j = new MUSIC.JSONGetter(url, "songDirNum", null, "utf-8", false);
    j.onSuccess = dealSucc;
    j.onError = dealFail;
    j.send("MusicJsonCallback");
}, jumpSummary: function (target, hasNewCount) {
    var stat = {'albumlist': 'infoalbum', 'singer': 'infosinger', 'mylisten': 'infomv'};
    pageHotClick();
    var url = "";
    if (target == 'albumlist') {
        url = '/y/static/mymusic/mymusic_albumlist.html';
    } else if (target == 'singer') {
        url = '/y/static/mymusic/mymusic_follow_listen.html?type=singer';
    } else {
        url = '/y/static/mymusic/mymusic_follow_listen.html?type=mylisten';
    }
    if (typeof hasNewCount != 'undefined' && hasNewCount == '1') {
        new Image().src = 'http://s.plcloud.music.qq.com/fcgi-bin/reset_new_listen.fcg?uin=' + g_user.getUin() + '&rnd=' + new Date().valueOf();
    }
    setTimeout(function () {
        window.location.href = url;
    }, 10);
}, _data: null, showUserInfo: function () {
    function count_level(score) {
        return g_user.countVipLevel(score);
    }

    function index_get_pic(uin) {
        uin = uin || g_user.getUin();
        if (!uin) {
            return;
        }
        var url = 'http://qlogo' + (uin % 4 + 1) + '.store.qq.com/qzone/' + uin + '/' + uin + '/100';
        return url;
    }

    if (!g_user.isLogin()) {
        showElement('logintab');
        hideElement('userInfo');
        return;
    }
    var tpl = ['<a href="/y/static/mymusic/mymusic_index.html" class="mod_user_photo">', '<img src="%(userPic)" width="50" height="50"/>', '</a>', '<p class="mod_user_name">%(nickname)</p>', '<p onmouseover="g_recomChn.showSpeedTips();" onmouseout="g_recomChn._speedTipsShow = false;setTimeout(function(){g_recomChn.hideSpeedTips();}, 300);" style="display:%(imgDis);">', '%(vipIcon)', '%(nianIcon)', '</p>', '%(icon)'].join('');
    g_user.getVipInfo(function (data) {
        g_recomChn._data = data;
        var obj = {};
        if (data.vip != 1 && data.vip != 2) {
            showElement('logintab');
            hideElement('userInfo');
            return;
        }
        if (data.vip == 2) {
            if (data.score > 0) {
                obj.openVipTitle = "续费绿钻";
                obj.vipIcon = "<a href=\"http://vip.music.qq.com/v2/my_level.html\" onclick=\"jumpWithKey(this.href);return false;\"><img src=\"http://imgcache.qq.com/music/icon/lv" + count_level(data.score) + "_g.png\" /> </a>";
                obj.nianIcon = "<a href=\"http://vip.music.qq.com/v2/year_intro.html\" onclick=\"jumpWithKey(this.href);return false;\"><img src=\"http://imgcache.qq.com/music/icon/ico_nian_g.png\" /></a>";
                obj.imgDis = "block";
                obj.openIcon = "block";
                obj.icon = ''
            } else {
                obj.openVipTitle = "开通绿钻";
                obj.vipIcon = "";
                obj.nianIcon = "";
                obj.imgDis = "none";
                obj.openIcon = "none";
                obj.icon = '';
            }
        } else if (data.vip == 1) {
            obj.icon = "";
            obj.openVipTitle = "续费绿钻";
            obj.openIcon = "none";
            obj.vipIcon = "<a href=\"http://vip.music.qq.com/v2/my_level.html\" onclick=\"jumpWithKey(this.href);return false;\"><img src=\"http://imgcache.qq.com/music/icon/lv" + count_level(data.score) + ".png\" /> </a>";
            if (data.yearFlag == 1) {
                obj.nianIcon = "<a href=\"http://vip.music.qq.com/v2/year_intro.html\" onclick=\"jumpWithKey(this.href);return false;\"><img src=\"http://imgcache.qq.com/music/icon/ico_nian.png\" /></a>";
            } else obj.nianIcon = "";
            obj.imgDis = "block";
        }
        obj.nickname = '<a href="/y/static/mymusic/mymusic_index.html">' + (data.nickname != "" ? data.nickname : g_user.getUin()) + '</a>';
        obj.userPic = index_get_pic(g_user.getUin());
        obj.qzoneUrl = "http://" + g_user.getUin() + "qzone.qq.com/";
        var elem = MUSIC.dom.get("mod_user_info");
        if (elem) {
            elem.innerHTML = tpl.jstpl_format(obj);
            showElement('userInfo');
            hideElement('logintab');
            if (data.vip == 2 && data.score <= 0) {
                showElement('normal_priv');
                hideElement('vip_priv');
                hideElement('vip_priv_g');
            } else if (data.vip == 1) {
                hideElement('normal_priv');
                showElement('vip_priv');
                hideElement('vip_priv_g');
            } else if (data.vip == 2 && data.score > 0) {
                hideElement('normal_priv');
                hideElement('vip_priv');
                showElement('vip_priv_g');
            }
        }
    });
    setTimeout(function () {
        g_recomChn.getSongDirNum();
    }, 100);
}, _speedTipsShow: false, showSpeedTips: function () {
    if (!(this._data)) {
        return;
    }
    var data = this._data;
    var _tpl = "<i class=\"icon_arrow_top\"></i> <p>成长值<strong>%(totalSpeed)</strong><a href=\"http://vip.music.qq.com\" target=\"_blank\">详情</a><br />%(speedTips)</p>";
    var obj = {totalSpeed: data.score, speedTips: data.vip == 1 ? "成长速度<strong>" + g_user.getSpeed(data.payway, data.yearFlag) + "</strong>点/天" : "成长值正在以<strong>5</strong>点/天的速度减少"};
    showElement('speed_tips');
    MUSIC.dom.get("speed_tips").innerHTML = _tpl.jstpl_format(obj);
    this._speedTipsShow = true;
}, hideSpeedTips: function () {
    if (!this._speedTipsShow) {
        hideElement('speed_tips');
    }
}, changePrive: function (obj) {
    if (obj.className == 'open_vip_list') {
        MUSIC.dom.getPreviousSibling(obj).className = 'vip_info_open';
        obj.className = 'close_vip_list';
    } else {
        MUSIC.dom.getPreviousSibling(obj).className = 'vip_info_close';
        obj.className = 'open_vip_list';
    }
}}
function recom_stat(optcode, tab) {
}
MUSIC.channel.recom.init = function (objAd) {
    MUSIC.lazyLoad.init({container: document, binder: top.window, windowElem: top.document, frame: top.document.getElementById("contentFrame")});
    g_mid.init({mid_flag: 1});
    this.loadFocus();
    this.loadAd(objAd);
    setTimeout(function () {
        MUSIC.channel.recom.showUserInfo();
    }, 100);
    g_trackServ.initSongList();
    g_musicMain.init();
    setTimeout(function () {
        g_trackServ.getSongsCount('divsonglist1', 'span');
    }, 100);
}
var g_recomChn = MUSIC.channel.recom;
/*  |xGv00|f9427b73a930ef6865ed266f0013eb9b */