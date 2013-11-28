window['PP.tiao.index.time'] && window['PP.tiao.index.time'].push(new Date());
function $addClass(ids, cName) {
    $setClass(ids, cName, "add");
};
function $addEvent(obj, type, handle) {
    if (!obj || !type || !handle) {
        return;
    }
    if (obj instanceof Array) {
        for (var i = 0, l = obj.length; i < l; i++) {
            $addEvent(obj[i], type, handle);
        }
        return;
    }
    if (type instanceof Array) {
        for (var i = 0, l = type.length; i < l; i++) {
            $addEvent(obj, type[i], handle);
        }
        return;
    }
    window.__allHandlers = window.__allHandlers || {};
    window.__Hcounter = window.__Hcounter || 1;
    function setHandler(obj, type, handler, wrapper) {
        obj.__hids = obj.__hids || [];
        var hid = 'h' + window.__Hcounter++;
        obj.__hids.push(hid);
        window.__allHandlers[hid] = {type: type, handler: handler, wrapper: wrapper}
    }

    function createDelegate(handle, context) {
        return function () {
            return handle.apply(context, arguments);
        };
    }

    if (window.addEventListener) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.addEventListener(type, wrapper, false);
    }
    else if (window.attachEvent) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.attachEvent("on" + type, wrapper);
    }
    else {
        obj["on" + type] = handle;
    }
};
function $addRd(url, rd) {
    url = url.replace(/？/, "?");
    var reg = /ptag[=,]\d+\.\d+\.\d+/i, hasQuery = /\?/.test(url);
    hasAnchor = url.indexOf('#') > -1;
    if (reg.test(url)) {
        url = url.replace(reg, "PTAG=" + rd);
    } else {
        url = hasAnchor ? url.replace("#", (hasQuery ? "&" : "?") + "PTAG=" + rd + "#") : (url + (hasQuery ? "&" : "?") + "PTAG=" + rd);
    }
    return url;
};
function $addToken(url, type) {
    var token = $getToken();
    if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
        return url;
    }
    if (url.indexOf("#") != -1) {
        var f1 = url.match(/\?.+\#/);
        if (f1) {
            var t = f1[0].split("#"), newPara = [t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
            return url.replace(f1[0], newPara);
        } else {
            var t = url.split("#");
            return[t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
        }
    }
    return token == "" ? (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type) : (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type);
};
function $addUrlRd(url, rd, biz) {
    try {
        biz = biz ? biz : "biFocusAd";
        if (biz == "biFocusAd" || biz == "martCpc" || biz == "focusAd") {
            var targetUrl = decodeURIComponent($getQuery("url", url));
            if (/ptag|PTAG/.test(targetUrl)) {
                targetUrl = targetUrl.replace(/\d{5}\.\d{1,3}\.\d{1,3}/, "");
                url = url.replace(/\d{5}\.\d{1,3}\.\d{1,3}/, "");
                url += encodeURIComponent(rd);
            } else {
                url += encodeURIComponent((targetUrl.indexOf("?") > -1 ? "&" : "?") + "ptag=" + rd);
            }
        } else if (biz == "biXuanPin") {
            url = url.replace(/(\&amp\;|&)pageurl/, encodeURIComponent('?PTAG=' + rd) + '&amp;pageurl');
        }
        return url;
    } catch (e) {
        return url;
    }
};
var $appendHtml = function (o, html) {
    if (o && o.nodeType == 1) {
        var domf = document.createDocumentFragment(), tmp = document.createElement('div');
        tmp.innerHTML = $xss(html, "none");
        var nodes = tmp.childNodes;
        for (var i = 0, len = nodes.length; i < len; i++) {
            domf.appendChild(nodes[i].cloneNode(true));
        }
        o.appendChild(domf);
    }
};
function $autoLoadImages(option) {
    var opt = {scrollOffsetH: 100};
    if (option) {
        for (var key in option) {
            opt[key] = option[key];
        }
    }
    if (window['_PP_core_autoLoadImages_data']) {
        if (window['_PP_core_autoLoadImages_data'].nosrcLength == 0) {
            clearInterval(window._PP_core_autoLoadImages_data.ptr);
            window._PP_core_autoLoadImages_data.ptr = setInterval(function () {
                doScroll();
            }, 100);
        }
        window['_PP_core_autoLoadImages_data'].allNum = 0;
        return;
    }
    window['_PP_core_autoLoadImages_data'] = {allNum: 0, nosrcImages: [], nosrcLength: 0, ciguid: 0, ptr: null};
    clearInterval(window._PP_core_autoLoadImages_data.ptr);
    window._PP_core_autoLoadImages_data.ptr = setInterval(function () {
        doScroll()
    }, 100);
    function doScroll() {
        var data = window['_PP_core_autoLoadImages_data'], allImage = document.images;
        if (allImage.length > data.allNum) {
            data.nosrcImages = [];
            for (var i = 0, j = allImage.length; i < j; i++) {
                var src = allImage[i].getAttribute("init_src");
                if (src && !allImage[i].getAttribute("iguid")) {
                    data.nosrcImages.push([allImage[i], src, $getY(allImage[i])]);
                }
            }
            data.nosrcLength = data.nosrcImages.length;
            data.allNum = allImage.length;
        }
        if (data.nosrcLength == 0) {
            if (data.ptr != null) {
                clearInterval(data.ptr);
                data.ptr = null;
                data.allNum = 0;
                data.nosrcImages = [];
            }
            return;
        }
        ;
        var bodyCache = document.body, domCache = (document.compatMode == 'BackCompat') ? bodyCache : document.documentElement, offsetH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, visibleH = offsetH + domCache.clientHeight;
        for (var i = 0, j = data.nosrcImages.length; i < j; i++) {
            if (!data.nosrcImages[i]) {
                continue;
            }
            if ((visibleH + opt.scrollOffsetH) > data.nosrcImages[i][2]) {
                var _item = data.nosrcImages[i];
                _item[0].setAttribute("src", _item[1]);
                _item[0].setAttribute("iguid", data.ciguid++);
                delete data.nosrcImages[i];
                data.nosrcLength--;
            }
        }
    }
};
function $biFocusAd(opt) {
    var option = {dataList: [], idList: [], staticFileUrl: "", templateType: "json", templateIdList: null, contentList: [], pageSize: 0, pcs: "", serverTime: null, delay: 0, onInit: $empty(), onSuccess: $empty(), onEach: $empty(), onRender: null, timeout: 3000, beginTime: "", endTime: "", byCgi: g_biFocusAd_byCgi && p_biFocusAd_byCgi};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var thisFunc = arguments.callee;
    var cgiCallback = getCgiCallback();
    var stateObj = new Array(option.idList.length);
    var isTimeout = false;
    init();
    if (option.dataList.length > 0) {
        processData();
    } else {
        var now = option.serverTime ? option.serverTime : $getServerTime();
        if (!option.byCgi || ((option.endTime && now > new Date(option.endTime)) || (option.beginTime && now < new Date(option.beginTime)))) {
            loadStaticData();
        } else {
            loadCgiData();
            startTimer();
        }
    }
    function init() {
        if (option.contentList.length > 0) {
            for (var i = 0, j = option.contentList.length; i < j; i++) {
                var list = option.contentList[i];
                for (var m = 0, n = list.length; m < n; m++) {
                    list[m] = $id(list[m]);
                }
            }
        }
        for (var i = 0, j = stateObj.length; i < j; i++) {
            stateObj[i] = [];
        }
        if (!!option.pcs) {
            option.pageSize = {};
            var pcs = option.pcs.split(",");
            for (var i = 0, j = pcs.length; i < j; i++) {
                var arr = pcs[i].split(":");
                option.pageSize[arr[0]] = arr[1];
            }
        }
    }

    function loadCgiData() {
        var url = "http://express.paipai.com/tws/focus/focus_show_direction?" + $buildParam({gids: option.idList.join("|"), url: encodeURIComponent(location.href), urlref: document.referrer ? encodeURIComponent(document.referrer) : "", pc: typeof option.pageSize == "object" ? "" : option.pageSize, pcs: option.pcs, callback: cgiCallback, debug_uin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        setTimeout(function () {
            $loadScript(url)
        }, option.delay);
        window[cgiCallback] = function (json) {
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.list;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        return"biFocusAd" + thisFunc.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
                isTimeout = true;
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.list;
            processData();
        };
        window[cgiCallback] = $empty();
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        var isComplete = IsDataComplete();
        if (option.staticFileUrl && !hasReqStaticFile && !isComplete) {
            loadStaticData();
        }
        if (!option.staticFileUrl || hasReqStaticFile || isComplete) {
            option.onSuccess();
        }
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var locations = option.dataList[i].locations;
            var groupId = option.dataList[i].groupid;
            var groupIndex = $inArray(groupId * 1, option.idList);
            if (groupIndex == -1 || locations.length == 0) {
                continue;
            }
            for (var m = 0, n = locations.length; m < n; m++) {
                if (stateObj[groupIndex][m]) {
                    continue;
                }
                var locationId = locations[m].locationid;
                var plans = locations[m].plans;
                if (!!option.pcs && !option.pageSize[locationId]) {
                    continue;
                }
                if (plans.length == 0) {
                    stateObj[groupIndex][m] = false;
                    continue;
                }
                var pageSize = 0;
                if (typeof option.pageSize == "number") {
                    pageSize = option.pageSize;
                } else {
                    pageSize = option.pageSize[locationId];
                }
                if (pageSize == 0) {
                    continue;
                }
                if (plans.length > pageSize) {
                    if (isTimeout) {
                        plans = plans.slice(0, pageSize);
                    } else {
                        plans = $randomSubArray(plans, pageSize);
                    }
                }
                option.onEach(plans, groupId, locationId, groupIndex, m);
                if (option.templateIdList) {
                    var templateId = "";
                    if (typeof option.templateIdList == "string") {
                        templateId = option.templateIdList;
                    } else if ((option.templateIdList instanceof Array) && typeof option.templateIdList[0] == "string") {
                        templateId = option.templateIdList[groupIndex];
                    } else {
                        templateId = option.templateIdList[groupIndex][m];
                    }
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, plans);
                    }
                    else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var k = 0; k < plans.length; k++) {
                            tmp.push($jsonToTpl(plans[k], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    $appendHtml(option.contentList.length ? option.contentList[groupIndex][m] : $id('f' + locationId), html);
                } else if (option.onRender) {
                    option.onRender(plans, groupId, locationId, groupIndex, m);
                }
                ;
                stateObj[groupIndex][m] = true;
            }
        }
    };
    function IsDataComplete() {
        if (hasReqStaticFile) {
            return true;
        } else {
            for (var i = 0, j = stateObj.length; i < j; i++) {
                if (stateObj[i].length == 0) {
                    return false;
                }
                for (var m = 0, n = stateObj[i].length; m < n; m++) {
                    if (!stateObj[i][m]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
function $buildParam(opt) {
    var arr = [];
    for (var o in opt) {
        o && (arr.push(o + "=" + opt[o]));
    }
    return arr.join("&");
};
function $child(node, val, fn, filter) {
    var results = [], filter = filter || $empty();
    if (!node)return results;
    walk(node.firstChild, function (n) {
        if (!n) {
            return;
        }
        var actual = n.nodeType === 1 && n.nodeName.toLowerCase();
        if (typeof actual === 'string' && (actual === val || typeof val !== 'string') && filter(n)) {
            results.push(n);
            fn && fn(n, results.length - 1);
        }
    });
    return results;
    function walk(n, func) {
        func(n);
        while (n && (n = n.nextSibling)) {
            func(n, func);
        }
    }
};
function $countRd(rd, random) {
    var arrRd = rd.split("."), rand = random || 100;
    var jsrdUrl = "http://service.paipai.com/cgi-bin/ping?u=http://jsrd.paipai.com&fu=http://jsrd.paipai.com%3FPTAG%3D" + rd + "&resolution=1024*768";
    jsrdUrl += "&fpageId=" + arrRd[0] + "&fdomainId=" + arrRd[1] + "&flinkId=" + arrRd[2];
    if (/paipai.com|buy.qq.com|wanggou.com/.test(document.domain)) {
        if (Math.random() <= rand / 100) {
            $report(jsrdUrl);
        }
    } else {
        $report($makeRd(rd));
    }
};
function $delClass(ids, cName) {
    $setClass(ids, cName, "remove");
};
function $empty() {
    return function () {
        return true;
    }
};
function $float(opt) {
    var option = {id: "", left: 0, top: 0, width: 400, height: 0, title: "", html: "", leaver: 2, zindex: 255, autoResize: false, cover: true, dragble: false, fix: false, titleId: "", showClose: true, closeId: "", bgframeLeft: -2, bgframeTop: -2, cName: "module_box_normal vt_float", style: "stand", contentStyle: "", cssUrl: window.config_float_css || "http://static.paipaiimg.com/module/module_box.css", onInit: $empty(), onClose: $empty()};
    for (var i in opt) {
        option[i] = opt[i];
    }
    var that = arguments.callee;
    var _host = window.location.hostname, _isQQ = _host.indexOf("qq.com") != -1, _isBBC = _host.indexOf("buy.qq.com") != -1, _isPP = _host.indexOf("paipai.com") != -1;
    if (_isPP) {
        option.bgframeLeft = 0;
        option.bgframeTop = 0;
    }
    that.data ? "" : init(option.cssUrl);
    option.id = option.id ? option.id : ++that.data.zIndex;
    option.close = closeFloat;
    option.destruct = destructFloat;
    option.closeOther = closeOther;
    option.keepBoxFix = keepBoxFix;
    option.resize = resize;
    option.show = showBox;
    option.setPos = setPos;
    option.closeOther();
    option.show();
    that.data.list.push(option);
    if (option.dragble) {
        $initDragItem({barDom: option.boxTitleHandle, targetDom: option.boxHandle});
    }
    return option;
    function closeFloat() {
        if (!option.onClose(option)) {
            return;
        }
        option.closeOther();
        option.destruct();
    }

    function destructFloat() {
        var _this = this;
        _this.cover ? that.data.closeCover() : "";
        if (_this.sizeTimer) {
            clearInterval(_this.sizeTimer);
        }
        if (_this.fixTimer) {
            clearInterval(_this.fixTimer);
        }
        _this.boxHandle ? document.body.removeChild(_this.boxHandle) : "";
        _this.boxHandel = _this.boxHandle = null;
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue;
            }
            if (_this.id == that.data.list[i].id) {
                that.data.list[i] = null;
            }
        }
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = null;
                    _el = null;
                }
            }
        }
    }

    function closeOther() {
        for (var i = 0, l = that.data.list.length; i < l; i++) {
            if (!that.data.list[i]) {
                continue;
            }
            if (that.data.list[i].leaver >= this.leaver && this.id != that.data.list[i].id) {
                that.data.list[i].destruct();
            }
        }
    }

    function showBox() {
        this.cover ? that.data.showCover() : "";
        var c = document.createElement("div"), content = "", _style = option.contentStyle ? (' style="' + option.contentStyle + '" ') : "";
        c.id = this.boxId = 'float_box_' + this.id;
        c.style.position = "absolute";
        if ($isBrowser("ie6")) {
            content = '<iframe frameBorder="0" style="position:absolute;left:' + option.bgframeLeft + 'px;top:' + option.bgframeTop + 'px;z-index:-1;border:none;" id="float_iframe_' + this.id + '"></iframe>';
        }
        switch (option.style + "") {
            case"stand":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_title" id="float_title_' + this.id + '"><a href="javascript:;" style="display:' + (this.showClose ? '' : 'none') + ';"  class="bt_close" id="float_closer_' + this.id + '">×</a><h4>' + this.title + '</h4></div><div class="box_content" ' + _style + '>' + this.html + '</div>';
                break;
            case"":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + '</div>';
                break;
            case"none":
                c.className = "";
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + '</div>';
                break;
            case"new":
                c.className = option.cName;
                c.innerHTML = content + '<div class="layer_inner"><div class="layer_hd" ' + _style + ' id="float_title_' + this.id + '"><div class="layer_hd_title">' + this.title + '</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_' + this.id + '">close</a></div><div class="layer_bd">' + this.html + '</div></div></div>';
                break;
        }
        document.body.appendChild(c);
        c = null;
        this.boxHandel = this.boxHandle = $id('float_box_' + this.id);
        if ($isBrowser("ie6")) {
            this.boxIframeHandle = $id('float_iframe_' + this.id);
        }
        this.boxTitleHandle = $id(option.titleId || ('float_title_' + this.id));
        this.boxCloseHandle = $id('float_closer_' + this.id);
        this.height ? (this.boxHandle.style.height = (option.height == "auto" ? option.height : option.height + "px")) : "";
        this.width ? (this.boxHandle.style.width = (option.width == "auto" ? option.width : option.width + "px")) : "";
        this.boxHandle.style.zIndex = that.data.zIndex;
        this.sw = parseInt(this.boxHandle.offsetWidth);
        this.sh = parseInt(this.boxHandle.offsetHeight);
        this.setPos();
        var _this = this;
        _this.boxCloseHandle ? _this.boxCloseHandle.onclick = function () {
            _this.close();
            return false;
        } : "";
        if (_this.closeId) {
            var arrClose = _this.closeId.split(",");
            for (var l = arrClose.length; l--;) {
                var _el = $id(arrClose[l]);
                if (_el) {
                    _el.onclick = function () {
                        _this.close();
                        return false;
                    };
                    _el = null;
                }
            }
        }
        _this.keepBoxFix();
        if (!_this.onInit(option)) {
            return;
        }
    }

    function setPos(left, top) {
        var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
        var p = [0, 0];
        left && (this.left = left);
        top && (this.top = top);
        p[0] = parseInt(this.left ? this.left : (psw + (ww - this.sw) / 2));
        p[1] = parseInt(this.top ? this.top : (psh + (wh - this.sh) / 2));
        (p[0] + this.sw) > (psw + ww) ? (p[0] = psw + ww - this.sw - 10) : "";
        (p[1] + this.sh) > (psh + wh) ? (p[1] = psh + wh - this.sh - 10) : "";
        p[1] < psh ? p[1] = psh : "";
        p[0] < psw ? p[0] = psw : "";
        if ($isBrowser("ie6")) {
            this.boxIframeHandle.height = (this.sh - 2) + "px";
            this.boxIframeHandle.width = (this.sw - 2) + "px";
        }
        this.boxHandle.style.left = p[0] + "px";
        this.boxHandle.style.top = p[1] + "px";
        this.keepBoxFix();
    }

    function resize(w, h) {
        if (w && w.constructor === Number) {
            this.sw = w;
            this.boxHandle.style.width = this.sw + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.width = (this.sw - 2) + "px";
            }
        }
        if (h && h.constructor === Number) {
            this.sh = h;
            this.boxHandle.style.height = this.sh + "px";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.height = (this.sh - 2) + "px";
            }
        }
        this.setPos();
    }

    function keepBoxFix() {
        if (this.fix) {
            var _this = this;
            if ($isBrowser("ie6")) {
                !_this.fixTimer && (_this.fixTimer = setInterval(function () {
                    _this.boxHandle.style.left = (_this.left ? _this.left : ($getPageScrollWidth() + ($getWindowWidth() - _this.sw) / 2)) + "px";
                    _this.boxHandle.style.top = (_this.top ? _this.top : ($getPageScrollHeight() + ($getWindowHeight() - _this.sh) / 2)) + "px";
                }, 30));
            } else {
                _this.boxHandle.style.position = "fixed";
                _this.boxHandle.style.left = (_this.left ? _this.left : ($getWindowWidth() - _this.sw) / 2) + "px";
                _this.boxHandle.style.top = (_this.top ? _this.top : ($getWindowHeight() - _this.sh) / 2) + "px";
            }
        }
    }

    function autoResize() {
        if (this.autoResize) {
            var _this = this;
            _this.sizeTimer = setInterval(function () {
                _this.sw = _this.boxHandle.offsetWidth;
                _this.sh = _this.boxHandle.offsetHeight;
                if ($isBrowser("ie6")) {
                    _this.boxIframeHandle.height = (_this.sh - 2) + "px";
                    _this.boxIframeHandle.width = (_this.sw - 2) + "px";
                }
            }, 50);
        }
    }

    function init(cssUrl) {
        if (cssUrl) {
            $loadCss(cssUrl);
        }
        that.data = {};
        that.data.zIndex = option.zindex;
        that.data.list = [];
        createCover();
        that.data.showCover = showCover;
        that.data.closeCover = closeCover;
        function createCover() {
            var c = document.createElement("div");
            c.id = "float_cover";
            c.style.display = "none";
            c.style.width = "0px";
            c.style.height = "0px";
            c.style.backgroundColor = "#cccccc";
            c.style.zIndex = 250;
            c.style.position = "fixed";
            c.style.hasLayout = -1;
            c.style.left = "0px";
            c.style.top = "0px";
            c.style.filter = "alpha(opacity=50);";
            c.style.opacity = "0.5";
            document.body.appendChild(c);
            if ($isBrowser("ie6")) {
                c.innerHTML = '<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>';
                c.style.position = "absolute";
            }
            that.data.cover = $id("float_cover");
            that.data.coverIframe = $id("float_cover_iframe");
            that.data.coverIsShow = false;
            that.data.coverSize = [0, 0];
            c = null;
        }

        function showCover() {
            that.data.cover.style.display = "block";
            that.data.coverIsShow = true;
            keepCoverShow();
            that.data.coverTimer = setInterval(function () {
                keepCoverShow();
            }, 50);
            function keepCoverShow() {
                var _d = that.data;
                if (_d.coverIsShow) {
                    var ch = $getContentHeight(), wh = $getWindowHeight(), cw = $getContentWidth(), ww = $getWindowWidth(), ns = [wh, ww];
                    if ($isBrowser("ie6")) {
                        _d.cover.style.top = $getPageScrollHeight() + "px";
                    }
                    if (ns.toString() != that.data.coverSize.toString()) {
                        _d.coverSize = ns;
                        _d.cover.style.height = ns[0].toFixed(0) + "px";
                        _d.cover.style.width = ns[1].toFixed(0) + "px";
                        if (_d.coverIframe) {
                            _d.coverIframe.style.height = ns[0].toFixed(0) + "px";
                            _d.coverIframe.style.width = ns[1].toFixed(0) + "px";
                        }
                    }
                }
            }
        }

        function closeCover() {
            that.data.cover.style.display = "none";
            that.data.coverIsShow = false;
            clearInterval(that.data.coverTimer);
        }
    }
};
(function () {
    var _formatArray_cache = {};
    $formatArray = function (str, data) {
        var fn = !/\W/.test(str) ? _formatArray_cache[str] = _formatArray_cache[str] || $formatArray($id(str).innerHTML) : new Function("arr", "var p=[];p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');return p.join('');");
        return data ? fn(data) : fn;
    }
})();
function $getContentHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollHeight : doeCath.scrollHeight;
};
function $getContentWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollWidth : doeCath.scrollWidth;
};
function $getCookie(name) {
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
};
function $getMousePosition(e) {
    var e = window.event ? window.event : e;
    if (e.evt)e = e.evt;
    var pos = [];
    if (typeof e.pageX != "undefined") {
        pos = [e.pageX, e.pageY];
    } else if (typeof e.clientX != "undefined") {
        pos = [e.clientX + $getScrollPosition()[0], e.clientY + $getScrollPosition()[1]];
    }
    return pos;
};
function $getPageScrollHeight() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    var ua = navigator.userAgent.toLowerCase();
    return(window.MessageEvent && ua.indexOf('firefox') == -1 && ua.indexOf('opera') == -1 && ua.indexOf('msie') == -1) ? bodyCath.scrollTop : doeCath.scrollTop;
};
function $getPageScrollWidth() {
    var bodyCath = document.body;
    var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
    return(window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollLeft : doeCath.scrollLeft;
};
function $getQuery(name, url) {
    var u = arguments[1] || window.location.search, reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
};
function $getScrollPosition() {
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    return[scrollLeft ? scrollLeft : 0, scrollTop ? scrollTop : 0];
};
function $getServerTime(url) {
    var sysTime = document.getElementById('SYSTIME');
    if (sysTime) {
        var ts = sysTime.value.substring(0, 19).split('-'), dObj = new Date(ts[0], parseInt(ts[1], 10) - 1, ts[2], ts[3], ts[4], ts[5]);
        return dObj;
    }
    var xhr = $xhrMaker(), url = url || "http://" + window.location.hostname + "/favicon.ico";
    try {
        xhr.open("HEAD", url, false);
        xhr.send();
    } catch (e) {
        return new Date();
    }
    return new Date(xhr.getResponseHeader("Date"));
};
function $getTarget(e, parent, tag) {
    var e = window.event || e, tar = e.srcElement || e.target;
    if (parent && tag && tar.nodeName.toLowerCase() != tag) {
        while (tar = tar.parentNode) {
            if (tar == parent || tar == document.body || tar == document) {
                return null;
            } else if (tar.nodeName.toLowerCase() == tag) {
                break;
            }
        }
    }
    ;
    return tar;
};
function $getToken() {
    var skey = $getCookie("skey"), token = skey == null ? "" : $time33(skey);
    return token;
};
function $getUin() {
    var uin = $getCookie("uin") || $getCookie('uin_cookie') || $getCookie('pt2gguin') || $getCookie('o_cookie') || $getCookie('luin') || $getCookie('buy_uin');
    return uin ? parseInt(uin.replace("o", ""), 10) : "";
};
function $getWindowHeight() {
    var bodyCath = document.body;
    return(document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientHeight;
};
function $getWindowWidth() {
    var bodyCath = document.body;
    return(document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientWidth;
};
function $getY(e) {
    var t = e.offsetTop || 0;
    while (e = e.offsetParent) {
        t += e.offsetTop;
    }
    return t;
};
function $hasClass(old, cur) {
    if (!old || !cur)return null;
    var arr = (typeof old == 'object' ? old.className : old).split(' ');
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cur == arr[i]) {
            return cur;
        }
    }
    ;
    return null;
};
function $id(id) {
    return typeof(id) == "string" ? document.getElementById(id) : id;
};
function $inArray(t, arr) {
    if (arr.indexOf) {
        return arr.indexOf(t);
    }
    for (var i = arr.length; i--;) {
        if (arr[i] === t) {
            return i * 1;
        }
    }
    ;
    return-1;
};
function $initDragItem(opt) {
    var option = {barDom: "", targetDom: ""};
    for (var i in opt) {
        option[i] = opt[i];
    }
    var that = arguments.callee;
    that.option ? "" : that.option = {};
    option.barDom.style.cursor = 'move';
    option.targetDom.style.position = "absolute";
    option.barDom.onmousedown = function (e) {
        var e = window.event || e;
        that.option.barDom = this;
        that.option.targetDom = option.targetDom;
        var currPostion = [parseInt(option.targetDom.style.left) ? parseInt(option.targetDom.style.left) : 0, parseInt(option.targetDom.style.top) ? parseInt(option.targetDom.style.top) : 0];
        that.option.diffPostion = [$getMousePosition({evt: e})[0] - currPostion[0], $getMousePosition({evt: e})[1] - currPostion[1]];
        document.onselectstart = function () {
            return false;
        };
        window.onblur = window.onfocus = function () {
            document.onmouseup();
        };
        return false;
    };
    option.targetDom.onmouseup = document.onmouseup = function () {
        if (that.option.barDom) {
            that.option = {};
            document.onselectstart = window.onblur = window.onfocus = null;
        }
    };
    option.targetDom.onmousemove = document.onmousemove = function (e) {
        try {
            var e = window.event || e;
            if (that.option.barDom && that.option.targetDom) {
                that.option.targetDom.style.left = ($getMousePosition({evt: e})[0] - that.option.diffPostion[0]) + "px";
                that.option.targetDom.style.top = ($getMousePosition({evt: e})[1] - that.option.diffPostion[1]) + "px";
            }
        }
        catch (e) {
        }
    };
};
function $isBrowser(str) {
    str = str.toLowerCase();
    var b = navigator.userAgent.toLowerCase();
    var arrB = [];
    arrB['firefox'] = b.indexOf("firefox") != -1;
    arrB['opera'] = b.indexOf("opera") != -1;
    arrB['safari'] = b.indexOf("safari") != -1;
    arrB['chrome'] = b.indexOf("chrome") != -1;
    arrB['gecko'] = !arrB['opera'] && !arrB['safari'] && b.indexOf("gecko") > -1;
    arrB['ie'] = !arrB['opera'] && b.indexOf("msie") != -1;
    arrB['ie6'] = !arrB['opera'] && b.indexOf("msie 6") != -1;
    arrB['ie7'] = !arrB['opera'] && b.indexOf("msie 7") != -1;
    arrB['ie8'] = !arrB['opera'] && b.indexOf("msie 8") != -1;
    arrB['ie9'] = !arrB['opera'] && b.indexOf("msie 9") != -1;
    arrB['ie10'] = !arrB['opera'] && b.indexOf("msie 10") != -1;
    return arrB[str];
};
function $isDocReady() {
    if (navigator.userAgent.match(/MSIE/)) {
        try {
            document.documentElement.doScroll('left');
            return true;
        } catch (e) {
        }
        return false;
    } else {
        return document.body ? true : false;
    }
};
function $isLogin() {
    return($getCookie("skey") && $getCookie("uin")) ? true : false;
};
function $isWidthScreen() {
    var body = document.body;
    if (body.getAttribute("noAutoAdjust")) {
        return!!body.getAttribute("wideScreen");
    } else {
        return screen.availWidth >= 1280;
    }
};
function $jsonToTpl(json, tpl) {
    return tpl.replace(/{#(\w+)#}/g, function (a, b) {
        return json[b] || ""
    });
};
function $loadCss(path, callback) {
    if (!path) {
        return;
    }
    var l;
    if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
        l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', path);
        l.setAttribute("id", "loadCss" + Math.random());
        document.getElementsByTagName("head")[0].appendChild(l);
        window["_loadCss"] ? (window["_loadCss"] += "|" + path) : (window["_loadCss"] = "|" + path);
    }
    l && (typeof callback == "function") && (l.onload = callback);
    return true;
};
function $loadImg(obj, attr) {
    if (!obj)return;
    var attr = attr || "back_src", images = obj.getElementsByTagName("IMG");
    for (var i = 0, len = images.length; i < len; i++) {
        var oImg = images[i], src = oImg.getAttribute(attr);
        '' == oImg.src && src && (oImg.src = src);
    }
};
function $loadScript(obj) {
    if (!$loadScript.counter) {
        $loadScript.counter = 1;
    }
    var isObj = typeof(obj) == "object", url = isObj ? obj.url : arguments[0], id = isObj ? obj.id : arguments[1], obj = isObj ? obj : arguments[2], _head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, _script = document.createElement("script"), D = new Date(), _time = D.getTime(), _isCleared = false, _timer = null, o = obj || {}, data = o.data || '', charset = o.charset || "gb2312", isToken = o.isToken, timeout = o.timeout, isAutoReport = o.isAutoReport || false, reportOptions = o.reportOptions || {}, reportType = o.reportType || 'current', reportRetCodeName = o.reportRetCodeName, reportSuccessCode = typeof(o.reportSuccessCode) == "undefined" ? 200 : o.reportSuccessCode, reportErrorCode = typeof(o.reportErrorCode) == "undefined" ? 500 : o.reportErrorCode, reportTimeoutCode = typeof(o.reportTimeoutCode) == "undefined" ? 600 : o.reportTimeoutCode, onload = o.onload, onsucc = o.onsucc, callbackName = o.callbackName || '', callback = o.callback, errorback = o.errorback, _jsonpLoadState = 'uninitialized';
    var complete = function (errCode) {
        if (!_script || _isCleared) {
            return;
        }
        _isCleared = true;
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        _script.onload = _script.onreadystatechange = _script.onerror = null;
        if (_head && _script.parentNode) {
            _head.removeChild(_script);
        }
        _script = null;
        if (callbackName) {
            if (callbackName.indexOf('.') == -1) {
                window[callbackName] = null;
                try {
                    delete window[callbackName];
                }
                catch (e) {
                }
            }
            else {
                var arrJ = callbackName.split("."), p = {};
                for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                    var n = arrJ[j];
                    if (j == 0) {
                        p = window[n];
                    }
                    else {
                        if (j == jLen - 1) {
                            try {
                                delete p[n];
                            }
                            catch (e) {
                            }
                        }
                        else {
                            p = p[n];
                        }
                    }
                }
            }
        }
        if (_jsonpLoadState != "loaded" && typeof errorback == "function") {
            errorback(errCode);
        }
        if (isAutoReport && reportType != 'cross') {
            _retCoder.report(_jsonpLoadState == "loaded", errCode);
        }
    };
    var jsontostr = function (d) {
        var a = [];
        for (var k in d) {
            a.push(k + '=' + d[k]);
        }
        return a.join('&');
    };
    if (isAutoReport && reportOptions) {
        if (reportType == 'cross') {
            $returnCode(reportOptions).reg();
        }
        else {
            reportOptions.url = reportOptions.url || url.substr(0, url.indexOf('?') == -1 ? url.length : url.indexOf('?'));
            var _retCoder = $returnCode(reportOptions);
        }
    }
    if (data) {
        url += (url.indexOf("?") != -1 ? "&" : "?") + (typeof data == 'string' ? data : jsontostr(data));
    }
    if (callbackName && typeof callback == "function") {
        var oldName = callbackName;
        if (callbackName.indexOf('.') == -1) {
            callbackName = window[callbackName] ? callbackName + $loadScript.counter++ : callbackName;
            window[callbackName] = function (jsonData) {
                _jsonpLoadState = 'loaded';
                if (isAutoReport && reportRetCodeName) {
                    reportSuccessCode = jsonData[reportRetCodeName];
                }
                callback.apply(null, arguments);
                onsucc && (onsucc());
            };
        }
        else {
            var arrJ = callbackName.split("."), p = {}, arrF = [];
            for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                var n = arrJ[j];
                if (j == 0) {
                    p = window[n];
                }
                else {
                    if (j == jLen - 1) {
                        p[n] ? (n = n + $loadScript.counter++) : '';
                        p[n] = function (jsonData) {
                            _jsonpLoadState = 'loaded';
                            if (isAutoReport && reportRetCodeName) {
                                reportSuccessCode = jsonData[reportRetCodeName];
                            }
                            callback.apply(null, arguments);
                            onsucc && (onsucc());
                        };
                    }
                    else {
                        p = p[n];
                    }
                }
                arrF.push(n);
            }
            callbackName = arrF.join('.');
        }
        url = url.replace('=' + oldName, '=' + callbackName);
    }
    _jsonpLoadState = 'loading';
    id = id ? (id + _time) : _time;
    url = (isToken !== false ? $addToken(url, "ls") : url);
    _script.charset = charset;
    _script.id = id;
    _script.onload = _script.onreadystatechange = function () {
        var uA = navigator.userAgent.toLowerCase();
        if (!(!(uA.indexOf("opera") != -1) && uA.indexOf("msie") != -1) || /loaded|complete/i.test(this.readyState)) {
            if (typeof onload == "function") {
                onload();
            }
            complete(_jsonpLoadState == "loaded" ? reportSuccessCode : reportErrorCode);
        }
    };
    _script.onerror = function () {
        complete(reportErrorCode);
    };
    if (timeout) {
        _timer = setTimeout(function () {
            complete(reportTimeoutCode);
        }, parseInt(timeout, 10));
    }
    setTimeout(function () {
        _script.src = url;
        try {
            _head.insertBefore(_script, _head.lastChild);
        } catch (e) {
        }
    }, 0);
};
function $loadUrl(o) {
    o.element = o.element || 'script';
    var el = document.createElement(o.element);
    el.charset = o.charset || 'utf-8';
    if (o.noCallback == true) {
        el.setAttribute("noCallback", "true");
    }
    el.onload = el.onreadystatechange = function () {
        if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
            clear();
        }
    };
    el.onerror = function () {
        clear();
    };
    el.src = o.url;
    document.getElementsByTagName('head')[0].appendChild(el);
    function clear() {
        if (!el) {
            return;
        }
        el.onload = el.onreadystatechange = el.onerror = null;
        el.parentNode && (el.parentNode.removeChild(el));
        el = null;
    }
};
(function () {
    var counter = 1;
    $login = function (opts) {
        var that = arguments.callee;
        var login = {option: {'title': "腾讯电商-请您登录后继续刚才的操作", 'containerId': "", 'floatDialog': true, 'modalDialog': true, 'dragable': true, 'showClose': true, 'quickLogin': true, 'checkLogin': true, 'checkReady': true, 'showProtocol': false, 'site': 'paipai', 'noChangeQQ': false, 'defaultQQ': "", 'type': "self", 'action': "", 'x': 0, 'y': 0, 'domain': "", 'skin': "http://static.paipaiimg.com/module/module_box.css", 'appid': '', 'onLogin': $empty(), 'onReset': $empty(), 'onClose': $empty(), 'onResize': $empty(), 'onSuccess': $empty(), 'onFailure': $empty()}, init: function (opts) {
            var option = this.option;
            for (var i in opts) {
                option[i] = opts[i];
            }
            if (option.checkReady && !$isDocReady()) {
                return;
            }
            var hn = location.hostname, topDomain = hn.split(".");
            if (topDomain.length > 1) {
                topDomain = topDomain[topDomain.length - 2] + '.' + topDomain[topDomain.length - 1];
                try {
                    document.domain = option.domain || topDomain;
                } catch (e) {
                }
            }
            option.show = this.show;
            option.close = this.close;
            option.resize = this.resize;
            option.doAction = this.doAction;
            option.counter = counter++;
            if (hn.indexOf("paipai.com") != -1) {
                $setCookie('returnurl', '', -1, '/', 'paipai.com');
                $setCookie('referurl', '', -1, '/', 'paipai.com');
            }
            if (option.checkLogin && $isLogin()) {
                option.doAction();
                return;
            }
            this.registerLoginEvent();
            this.load(option.skin);
            option.show(option);
            that.instance = option;
            return option;
        }, registerLoginEvent: function () {
            ptlogin2_onLogin = function () {
                return $login.instance.onLogin() ? true : false;
            };
            ptlogin2_onReset = function () {
                return $login.instance.onReset() ? true : false;
            };
            ptlogin2_onClose = function () {
                if (location.hostname.indexOf("qq.com") != -1) {
                    ptlogin2_onSuccess();
                }
                return $login.instance.onClose() ? true : false;
            };
            ptlogin2_onResize = function (w, h) {
                var login = $login.instance;
                w = parseInt(w);
                h = parseInt(h);
                if (!login.onResize(w, h)) {
                    return false;
                }
                login.resize($id("login_frame_" + login.counter), w, h);
                if (login.floatDialog) {
                    h = h + 75 - (login.showProtocol ? 0 : 39);
                    login.floatHandle ? login.floatHandle.resize(w + 28, h) : "";
                    login.resize($id("loginunit"), w + 28, h);
                } else {
                    h = h + 60 - (login.showProtocol ? 0 : 39);
                    login.resize($id(login.containerId), w, h);
                    login.resize($id("loginunit2"), w, h);
                }
                return true;
            };
            ptlogin2_onSuccess = function () {
                var login = $login.instance;
                if (!login.onSuccess()) {
                    return false;
                }
                login.close();
                var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1, isDone = false;
                var url = "", url2 = "", url3 = "", url4 = "";
                if (isQQ) {
                    url = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url2 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20&daid=154");
                    url3 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                    url4 = "http://ptlogin2.qq.com/pt4_web_jump?succ_url=" + encodeURIComponent("http://chong.qq.com/login/synclogin") + "&daid=129&appid=677010801&pt4_token=" + $getCookie("p_skey");
                } else if (isWG) {
                    url = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                    url2 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                    url3 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                    url4 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://chong.qq.com/login/synclogin");
                } else {
                    url = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                    url2 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20&daid=154");
                    url3 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                    url4 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://chong.qq.com/login/synclogin");
                }
                var doAction = function () {
                    if (!isDone) {
                        isDone = true;
                        login.doAction();
                    }
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                };
                var timer = setTimeout(function () {
                    doAction();
                }, 2000);
                var img = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image();
                img.onabort = img.onerror = img2.onabort = img2.onerror = img3.onabort = img3.onerror = img4.onabort = img4.onerror = function () {
                    doAction();
                };
                img.src = url;
                img2.src = url2;
                img3.src = url3;
                img4.src = url4;
                return true;
            };
            ptlogin2_onFailure = function (err) {
                var login = $login.instance;
                if (!login.onFailure(err)) {
                    return false;
                }
                if (err) {
                    alert("登录失败！可能的错误原因：" + err);
                }
                $login(login);
                return true;
            };
            ptlogin2_frame_onLoad = function () {
                var login = $login.instance;
                if (login.noChangeQQ) {
                    var _ifrm = $id('login_frame_' + login.counter);
                    if (_ifrm) {
                        var _u = _ifrm.contentWindow && _ifrm.contentWindow.document.getElementById('u');
                        if (_u) {
                            _u.disabled = true;
                        }
                    }
                }
            };
        }, doAction: function () {
            switch (this.type) {
                case"func":
                    this.action();
                    break;
                case"top":
                    top.location.href = this.action;
                    break;
                case"parent":
                    parent.location.href = this.action;
                    break;
                case"self":
                    location.href = this.action;
                    break;
                case"blank":
                    window.open(this.action);
                    break;
            }
        }, show: function (option) {
            var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1;
            if (!this.appid) {
                if (isWG) {
                    this.appid = 677010801;
                } else if (hn.indexOf("buy.qq.com") > -1) {
                    if (hn.indexOf("seller.buy.qq.com") > -1) {
                        this.appid = 703010802;
                    } else {
                        this.appid = 677010801;
                    }
                } else {
                    this.appid = isQQ ? 8000210 : 17000101;
                }
            }
            debugger;
            if (!this.daid) {
                if (hn.indexOf("wanggou.com") != -1) {
                    this.daid = 154;
                } else if (hn.indexOf("buy.qq.com") != -1) {
                    this.daid = 128;
                } else if (hn.indexOf("shop.qq.com") != -1) {
                    this.daid = 127;
                } else if (hn.indexOf("paipai.com") != -1) {
                    this.daid = 126;
                } else if (hn.indexOf("51buy.com") != -1) {
                    this.daid = 68;
                } else if (hn.indexOf("chong.qq.com") != -1) {
                    this.daid = 129;
                } else if (hn.indexOf("kuyoo.cn") != -1) {
                    this.daid = 130;
                } else if (hn.indexOf("etg.qq.com") != -1) {
                    this.daid = 131;
                } else if (hn.indexOf("wkd.qq.com") != -1) {
                    this.daid = 66;
                } else if (hn.indexOf("weikeduo.qq.com") != -1) {
                    this.daid = 132;
                } else if (hn.indexOf("victor.qq.com") != -1) {
                    this.daid = 133;
                } else if (hn.indexOf("piao.qq.com") != -1) {
                    this.daid = 76;
                } else if (hn.indexOf("go.qq.com") != -1) {
                    this.daid = 70;
                } else if (hn.indexOf("gaopeng.qq.com") != -1) {
                    this.daid = 134;
                } else if (hn.indexOf("gaopeng.com") != -1) {
                    this.daid = 135;
                } else if (hn.indexOf("518.qq.com") != -1) {
                    this.daid = 152;
                } else if (hn.indexOf("yixun.com") != -1) {
                    this.daid = 174;
                } else if (hn.indexOf("licai.qq.com") != -1) {
                    this.daid = 190;
                }
                $setCookie("daid", this.daid, 525600);
            }
            if (this.daid == 154 || this.daid == 128 || this.daid == 127) {
                this.title = "腾讯网购-请您登录后继续刚才的操作";
            } else if (this.daid == 126) {
                this.title = "腾讯拍拍-请您登录后继续刚才的操作";
            }
            var query = {"style": 13, "daid": this.daid, "pt_safe": 1, "hide_title_bar": 1, "hide_close_icon": 1, "target": "self", "no_verifyimg": 1, "f_url": "loginerroralert", "bgcolor": this.floatDialog ? "f2faff" : "eef5ff", "link_target": "blank", "uin": this.defaultQQ, "appid": this.appid, "t": Math.random()};
            if (!this.quickLogin) {
                query['enable_qlogin'] = 0;
            }
            if (isQQ) {
                var url = 'https://ssl.ui.ptlogin2.qq.com/cgi-bin/login?';
                query['s_url'] = hn.indexOf("buy.qq.com") > -1 ? 'http://buy.qq.com%2Fredirect.html' : (/(chong\.qq\.com)/.test(hn) ? 'http%3A%2F%2Fchong.qq.com%2Fmember%2Flogin_s.shtml' : 'http://imgcache.qq.com%2Fqqshop%2Fac%2Fportal%2Fredirect.html');
            } else if (isWG) {
                var url = 'https://ssl.ui.ptlogin2.qq.com/cgi-bin/login?';
                query['s_url'] = encodeURIComponent('http://member.wanggou.com/userlogin/ptlogin?loginfrom=21&daid=154');
            } else {
                var url = 'https://ssl.ui.ptlogin2.paipai.com/cgi-bin/login?';
                query['s_url'] = 'http://member.paipai.com/cgi-bin/ptlogin%3Floginfrom%3D18';
            }
            url += $makeUrl(query);
            var width = 398, ifrmHeight = 370, height = ifrmHeight + 35 + (this.showProtocol ? 39 : 0);
            var isQQbuy = hn.indexOf("buy.qq.com") > -1 || isWG;
            var h = '<div class="{class}" id="{class}" style="position:relative;\
                    height:' + height + 'px;\
                    width:' + width + 'px"><h3 id="login_title_{id}" style="padding:0;\
                    margin:0"><span id="login_close_btn_{id}"{display}>关闭</span><strong>登录</strong><em>{title}</em></h3><iframe src="' + url + '" id="login_frame_{id}" name="login_frame_{id}" scrolling="no" frameborder="0" allowTransparency ="true" onload="ptlogin2_frame_onLoad()"  style="height:' + ifrmHeight + 'px;\
                    width:' + (width - 2) + 'px"></iframe><div id="login_protocol_{id}" style="text-align:center"><input name="" id="login_protocol_chk_{id}" type="checkbox" value="" checked="checked" /><label for="login_protocol_chk_{id}"> 已阅读并同意<a class="blule" href="' + (isQQbuy ? 'http://buy.qq.com/agreement.html' : 'http://help.paipai.com/user_agreement.shtml') + '" target="_blank">《' + (isQQbuy ? 'QQ网购平台服务协议' : '拍拍网用户服务协议') + '》</a></label></div><div id="login_protocol_mask_{id}" onclick="alert(\'请先同意《' + (isQQbuy ? 'QQ网购平台服务协议' : '拍拍网用户服务协议') + '》\')" style="position:absolute;\
                            left:3px;\
                    top:28px;\
                    filter:alpha(opacity=1);\
                    opacity:0.01;\
                    background-color:#000;\
                    display:none;\
                    width:398px;\
                    height:' + ifrmHeight + 'px"></div></div>';
            h = h.replace(/{id}/g, option.counter).replace(/{class}/g, this.floatDialog ? "loginunit" : "loginunit2").replace(/{display}/g, this.showClose ? "" : 'style="display:none;\
                    "').replace(/{title}/g, this.title);
            if (this.floatDialog) {
                this.floatHandle = $float({width: width, height: height, cover: this.modalDialog, style: 'none', title: this.title, titleId: 'login_title_' + option.counter, html: '<div id="login_content_' + option.counter + '">' + h + '</div>', left: this.x, top: this.y, dragble: this.dragable, fix: !this.dragable, showClose: this.showClose, closeId: this.showClose ? "login_close_btn_" + option.counter : ''});
                this.containerId = "login_content_" + option.counter;
            } else {
                $id(this.containerId).innerHTML = h;
            }
            if (this.showProtocol) {
                $id("login_protocol_" + option.counter).style.display = "";
                $id("login_protocol_chk_" + option.counter).onclick = function () {
                    var a = $id("login_protocol_mask_" + option.counter);
                    if (this.checked) {
                        a.style.display = "none"
                    } else {
                        a.style.display = "";
                    }
                };
            } else {
                $id("login_protocol_" + option.counter).style.display = "none";
            }
        }, close: function () {
            if (this.floatDialog && this.floatHandle) {
                this.floatHandle.close();
            }
        }, load: function (arrURL) {
            if (arrURL instanceof Array) {
                for (var i = 0, l = arrURL.length; i < l; i++) {
                    if (arrURL[i] && /^(http|https):\/\//ig.test(arrURL[i])) {
                        $loadCss(arrURL[i]);
                    }
                }
            } else if (arrURL) {
                $loadCss(arrURL);
            }
        }, resize: function (obj, w, h) {
            if (h) {
                obj.style.height = h + 'px';
            }
            if (w) {
                obj.style.width = w + 'px';
            }
        }}
        return login.init(opts);
    };
})(window);
function $loginFrame(opt) {
    var option = {};
    if (opt.title) {
        option.title = opt.title;
    }
    if (opt.domId) {
        option.containerId = opt.domId;
    }
    if (opt['float'] === false || opt['float'] === true) {
        option.floatDialog = opt['float'];
    }
    if (opt.model === false || opt.model === true) {
        option.modalDialog = opt.model;
    }
    if (opt.drag === false || opt.drag === true) {
        option.dragable = opt.drag;
    }
    if (opt.close === false || opt.close === true) {
        option.showClose = opt.close;
    }
    if (opt.quick === false || opt.quick === true) {
        option.quickLogin = opt.quick;
    }
    if (opt.check === false || opt.check === true) {
        option.checkLogin = opt.check;
    }
    if (opt.checkReady === false || opt.checkReady === true) {
        option.checkReady = opt.checkReady;
    }
    if (opt.hideXieyi === false || opt.hideXieyi === true) {
        option.showProtocol = !opt.hideXieyi;
    }
    if (opt.noChangeQQ) {
        option.noChangeQQ = opt.noChangeQQ;
    }
    if (opt.defaultId) {
        option.defaultQQ = opt.defaultId;
    }
    if (opt.type) {
        option.type = opt.type;
    }
    if (opt.action) {
        option.action = opt.action;
    }
    if (opt.x) {
        option.x = opt.x;
    }
    if (opt.y) {
        option.y = opt.y;
    }
    if (opt.onLogin) {
        option.onLogin = opt.onLogin;
    }
    if (opt.onReset) {
        option.onReset = opt.onReset;
    }
    if (opt.onClose) {
        option.onClose = opt.onClose;
    }
    if (opt.onResize) {
        option.onResize = opt.onResize;
    }
    if (opt.onSuccess) {
        option.onSuccess = opt.onSuccess;
    }
    if (opt.onFailure) {
        option.onFailure = opt.onFailure;
    }
    return $login(option);
};
function $makeRd(rd, url) {
    var url = url || 'http://www.paipai.com/rd.html', arrRd = rd.split(".");
    return"http://service.paipai.com/cgi-bin/go?pageId=" + arrRd[0] + "&domainId=" + arrRd[1] + "&linkId=" + arrRd[2] + "&url=" + escape(url);
};
function $makeUrl(data) {
    var arr = [];
    for (var k in data) {
        arr.push(k + "=" + data[k]);
    }
    ;
    return arr.join("&");
};
function $martCpc(opt) {
    var option = {dataList: null, idList: [], pc: 0, pcs: "", care: 0, mask: 0, templateType: "json", templateIdList: null, contentList: [], onInit: $empty(), onEach: $empty(), onRender: null, onSuccess: $empty()};
    var thisFunc = arguments.callee;
    $option(option, opt);
    init();
    loadCgiData();
    function init() {
        if (option.contentList.length > 0) {
            for (var i = 0, j = option.contentList.length; i < j; i++) {
                var list = option.contentList[i];
                for (var m = 0, n = list.length; m < n; m++) {
                    list[m] = $id(list[m]);
                }
            }
        }
    }

    function loadCgiData() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        var callbackName = "martCallback" + thisFunc.counter;
        var url = "http://express.paipai.com/tws/martcpc/martcpcshow?" + $buildParam({actid: option.idList.join("|"), url: encodeURIComponent(location.href), callback: callbackName, pc: option.pc, pcs: option.pcs, mask: option.mask, care: option.care, ch: 0, duin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        $loadScript(url);
        window[callbackName] = function (json) {
            if (json.errCode == "0") {
                option.dataList = json.activity;
                processData();
            }
        };
    }

    function processData() {
        option.onInit(option);
        renderHtml();
        option.onSuccess(option);
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var activeId = option.dataList[i].activeId;
            var activeIndex = $inArray(activeId * 1, option.idList);
            var areas = option.dataList[i].area;
            areas.sort(function (a, b) {
                return a.areaId - b.areaId;
            });
            for (var m = 0, n = areas.length; m < n; m++) {
                var areaId = areas[m].areaId;
                var tabs = areas[m].tabs;
                option.onEach(tabs, activeId, areaId, activeIndex, m);
                if (option.templateIdList) {
                    var templateId = getTemplate(activeIndex, m);
                    if (!templateId) {
                        continue;
                    }
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, tabs);
                    }
                    else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var x = 0, y = tabs.length; x < y; x++) {
                            tmp.push($jsonToTpl(tabs[x], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    var dom = option.contentList.length > 0 ? option.contentList[activeIndex][m] : $id("m" + areaId);
                    $setHtml(dom, html);
                } else if (option.onRender) {
                    option.onRender(tabs, activeId, areaId, activeIndex, m);
                }
            }
        }
    }

    function getTemplate(activityIndex, areaIndex) {
        if (typeof option.templateIdList == "string") {
            return option.templateIdList;
        } else if (option.templateIdList instanceof Array) {
            if (typeof option.templateIdList[activityIndex] == "string") {
                return option.templateIdList[activityIndex];
            } else {
                return option.templateIdList[activityIndex][areaIndex]
            }
        }
        return"";
    }
};
function $namespace(name) {
    for (var arr = name.split(','), r = 0, len = arr.length; r < len; r++) {
        for (var i = 0, k, name = arr[r].split('.'), parent = {}; k = name[i]; i++) {
            i === 0 ? eval('(typeof ' + k + ')==="undefined"?(' + k + '={}):"";parent=' + k) : (parent = parent[k] = parent[k] || {});
        }
    }
};
function $option() {
    var pt = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
        for (var k in arguments[i]) {
            pt[k] = arguments[i][k]
        }
    }
    return pt;
};
function $preventDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    ;
    return false;
};
function $randomInt(num1, num2) {
    if (num2 == undefined) {
        num2 = num1;
        num1 = 0;
    }
    return Math.floor(Math.random() * (num2 - num1) + num1);
};
function $randomSubArray(arr, len, filter) {
    if (arr.length < len) {
        len = arr.length;
    }
    var obj = {}, list = [];
    filter = filter ? filter : (function () {
        return true;
    });
    do {
        var index = $randomInt(arr.length);
        if (!obj[index] && filter(list, index)) {
            obj[index] = index + 1;
            list.push(arr[index]);
        }
    } while (list.length < len);
    return list;
};
function $report(url) {
    $loadUrl({'url': url + ((url.indexOf('?') == -1) ? '?' : '&') + Math.random(), 'element': 'img'});
};
function $returnCode(opt) {
    var option = {url: "", action: "", sTime: "", eTime: "", retCode: "", errCode: "", frequence: 1, refer: location.href, uin: "", domain: "paipai.com", from: 1, report: report, isReport: false, timeout: 3000, timeoutCode: 444, formatUrl: true, reg: reg};
    for (var i in opt) {
        option[i] = opt[i];
    }
    if (option.url) {
        option.sTime = new Date();
    }
    if (option.timeout) {
        setTimeout(function () {
            if (!option.isReport) {
                option.report(false, option.timeoutCode);
            }
        }, option.timeout);
    }
    function reg() {
        this.sTime = new Date();
        if (!this.action) {
            return;
        }
        var rcookie = $getCookie("retcode"), cookie2 = [];
        rcookie = rcookie ? rcookie.split("|") : [];
        for (var i = 0; i < rcookie.length; i++) {
            if (rcookie[i].split(",")[0] != this.action) {
                cookie2.push(rcookie[i]);
            }
        }
        cookie2.push(this.action + "," + this.sTime.getTime());
        $setCookie("retcode", cookie2.join("|"), 60, "/", this.domain);
    }

    function report(ret, errid) {
        this.isReport = true;
        this.eTime = new Date();
        this.retCode = ret ? 1 : 2;
        this.errCode = isNaN(parseInt(errid)) ? "0" : parseInt(errid);
        if (this.action) {
            this.url = "http://retcode.paipai.com/" + this.action;
            var rcookie = $getCookie("retcode"), ret = "", ncookie = [];
            rcookie = rcookie ? rcookie.split("|") : [];
            for (var i = 0; i < rcookie.length; i++) {
                if (rcookie[i].split(",")[0] == this.action) {
                    ret = rcookie[i].split(",");
                }
                else {
                    ncookie.push(rcookie[i]);
                }
            }
            $setCookie("retcode", ncookie.join("|"), 60, "/", this.domain);
            if (!ret) {
                return;
            }
            this.sTime = new Date(parseInt(ret[1]));
        }
        if (!this.url) {
            return;
        }
        var domain = this.url.replace(/^.*\/\//, '').replace(/\/.*/, ''), timer = this.eTime - this.sTime, cgi = encodeURIComponent(this.formatUrl ? this.url.match(/^[\w|/|.|:|-]*/)[0] : this.url);
        this.reportUrl = "http://c.isdspeed.qq.com/code.cgi?domain=" + domain + "&cgi=" + cgi + "&type=" + this.retCode + "&code=" + this.errCode + "&time=" + timer + "&rate=" + this.frequence + (this.uin ? ("&uin=" + this.uin) : "");
        if (this.reportUrl && Math.random() < (1 / this.frequence) && this.url) {
            $report(this.reportUrl);
        }
    }

    return option;
};
function $setClass(ids, cName, kind) {
    if (!ids) {
        return;
    }
    var set = function (obj, cName, kind) {
        if (!obj) {
            return;
        }
        var oldName = obj.className, arrName = oldName ? oldName.split(' ') : [];
        if (kind == "add") {
            if (!$hasClass(oldName, cName)) {
                arrName.push(cName);
                obj.className = arrName.join(' ');
            }
        }
        else if (kind == "remove") {
            var newName = [];
            for (var i = 0, l = arrName.length; i < l; i++) {
                if (cName != arrName[i] && ' ' != arrName[i]) {
                    newName.push(arrName[i]);
                }
            }
            obj.className = newName.join(' ');
        }
    };
    if (typeof(ids) == "string") {
        var arrDom = ids.split(",");
        for (var i = 0, l = arrDom.length; i < l; i++) {
            if (arrDom[i]) {
                set($id(arrDom[i]), cName, kind);
            }
        }
    }
    else if (ids instanceof Array) {
        for (var i = 0, l = ids.length; i < l; i++) {
            if (ids[i]) {
                set(ids[i], cName, kind);
            }
        }
    }
    else {
        set(ids, cName, kind);
    }
};
function $setCookie(name, value, expires, path, domain, secure) {
    var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
};
function $setHtml(o, html) {
    if (o && o.nodeType == 1) {
        o.innerHTML = $xss(html, "none");
    }
};
function $setSaleMail(obj) {
    var option = {mid: 0, x: document.documentElement.clientWidth / 2 - 200, y: document.documentElement.scrollTop + 150, template: '<div class="box_hint_normal"><span class="icon msg3-icon-right"></span><div class="hint_content" style="width:560px;"><p class="hint_title"><strong>恭喜您订阅成功！</strong></p>{#mailDesc#}<div class="hint_op"><p><a href="http://my.paipai.com/mail/subscribe_center.shtml?PTAG=20024.17.4" ptag="10007.41.14" target="_blank">管理订阅</a><p></div>{#showOther#}<div class="hint_other"><h5>推荐订阅栏目：</h5><ul>{#otherCommend#}</ul><a class="order_link all" target="_blank" href="http://www.paipai.com/sale/qqmail/order.shtml" title="更多订阅" id="ID_MoreMailOrder">更多订阅</a></div>{#showOther#}<div style="clear:both"></div></div></div></div></div> ', templateForNoMail: '<div class="box_hint_normal"> <span class="icon msg2-icon-info"></span><div class="hint_content"><p class="hint_title"><strong>您尚未激活QQ邮箱，请激活后再订阅本栏目。</strong></p><div class="hint_op"><button type="submit" value="激活QQMail" ptag="" onclick="window.open(\'http://mail.qq.com\');">激活QQMail</button></div></div>', templateForCommend: '<li><img src="{#commendImage#}" alt="{#commendType#}" />{#commendDesc#}{#commendStatus#}</li>', typeForCommend: ["200", "201", "202", "206", "306", "320", "322", "329", "330", "331", "332", "333", "334", "340"], mailConfig: {"200": ["促销信息大全", "<p>本栏目为您搜罗最优惠的促销精选！</p><p>您的订阅邮件将在每周五发送至您的QQ邮箱，敬请关注。</p>"], "201": ["新品推荐", "<p>本栏目为您推荐最潮人气新品！</p><p>您的订阅邮件将在每周三发送至您的QQ邮箱，敬请关注。</p>"], "202": ["时尚指标", "<p>本栏目为您速递最前沿的时尚情报！</p><p>您的订阅邮件将在每周一发送至您的QQ邮箱，敬请关注。</p>"], "206": ["我关注的店铺最近更新", "<p>本栏目为您播报您关注店铺最新推荐精品！</p><p>您的订阅邮件将在每周一发送至您的QQ邮箱，敬请关注。</p>"], "306": ["QQ商城优质生活每周精选", "<p>本栏目为您速递QQ商城时尚购物资讯！</p><p>您的订阅邮件将在每周四发送至您的QQ邮箱，敬请关注。</p>"], "320": ["女装潮流精选", "<p>本栏目为您搜罗最in最潮的女装情报！</p><p>您的订阅邮件将每周四发送至您的QQ邮箱，敬请关注。</p>"], "322": ["拍拍精品团购", "<p>本栏目为您抢先播报每日团购！</p><p>您的订阅邮件将每天发送至您的QQ邮箱，敬请关注。</p>"], "329": ["彩钻贵族周刊", "<p>本栏目为您推荐彩钻最新精华购物特权！</p><p>您的订阅邮件将发送至您的QQ邮箱，敬请关注。</p>"], "330": ["美容美妆", "<p>本栏目为您传递美容扮靓最新资讯</p><p>您的订阅邮件将在每周五发送至您的QQ邮箱，敬请关注。</p>"], "331": ["易迅数码导购", "<p>本栏目为您速递省钱放心的数码潮品！</p><p>您的订阅邮件将发送至您的QQ邮箱，敬请关注。</p>"], "332": ["品质生活家", "<p>本栏目为推荐最优质的家居美食资讯</p><p>您的订阅邮件将每周五发送至您的QQ邮箱，敬请关注。</p>"], "333": ["便民充值服务", "<p>本栏目为您甄选最超值的充值送礼优惠</p><p>您的订阅邮件逢1、8、15、22日发送至您的QQ邮箱，敬请关注。</p>"], "334": ["母婴期刊", "<p>本栏目为您精选官方认证最可信的母婴精品</p><p>您的订阅邮件将发送至您的QQ邮箱，敬请关注。</p>"], "340": ["QQ网购优质精选", "<p>本栏目为您推荐优质行货正品导购！</p><p>您的订阅邮件将在每周三发送至您的QQ邮箱，敬请关注。</p>"], "777": ["拍拍网所有", "<p>您的订阅信息将以邮件形式发送至您的QQ邮箱，敬请关注。</p>"]}, mailDescription: {"200": "促销大全", "340": "品牌会", "202": "时尚帮你挑", "322": "今日特价爆款", "206": "我的专享优惠", "320": "潮流服饰", "330": "尚品会", "334": "品质生活家", "329": "数码大牌五折抢"}, float: true, left: "", top: ""}
    for (var i in obj) {
        option[i] = obj[i];
    }
    window.PP_core_saleMail_option = option;
    $loginFrame({type: 'func', model: false, action: function () {
        var mid = window.PP_core_saleMail_option.mid == "777" ? "200|340|322|202|201|306|206|331|333" : window.PP_core_saleMail_option.mid;
        $loadScript("http://my.paipai.com/cgi-bin/mailbook_setbook?callback=ModifySaleMailInfo&option=1&bookitem=" + mid + "&t=" + Math.random());
    }, x: window.PP_core_saleMail_option.x, y: window.PP_core_saleMail_option.y});
    if (option.float) {
        $loadCss("http://static.paipaiimg.com/css/common/salemail.css");
        $loadCss("http://static.paipaiimg.com/module/msg_tips.css");
    }
    window.ModifySaleMailInfo = function (json) {
        if (!option.float) {
            return;
        }
        if (json.i_ret == -1) {
            $loginFrame({type: 'func', check: false, model: false, action: function () {
                var mid = window.PP_core_saleMail_option.mid == "777" ? "200|340|322|202|201|306|206|331|333|334|330|329|320" : window.PP_core_saleMail_option.mid;
                $loadScript("http://my.paipai.com/cgi-bin/mailbook_setbook?callback=ModifySaleMailInfo&option=1&bookitem=" + mid + "&t=" + Math.random());
            }, x: window.PP_core_saleMail_option.x, y: window.PP_core_saleMail_option.y});
        } else if (json.i_ret == 0) {
            var hc = window.PP_core_saleMail_option.template;
            var midAll = window.PP_core_saleMail_option.mid.toString().split('|');
            var fillHtml = "";
            for (var i = 0, j = midAll.length; i < j; i++) {
                var mailConfig = window.PP_core_saleMail_option.mailConfig[midAll[i]];
                if (!mailConfig) {
                    alert("邮件配置错误，请联系客服！");
                    return false;
                } else {
                    if (i == j - 1) {
                        fillHtml += '“' + window.PP_core_saleMail_option.mailDescription[midAll[i]] + '”';
                    } else {
                        fillHtml += '“' + window.PP_core_saleMail_option.mailDescription[midAll[i]] + '”、';
                    }
                }
            }
            if (midAll.length > 1) {
                hc = hc.replace(/{#mailDesc#}/g, '<p>已成功订阅邮件栏目：<span style="font-weight:bold">' + fillHtml + '</span></p> \
                                <p style="color:#acacac;">您的订阅信息将以邮件形式发送至您的QQ邮箱，敬请关注。</p>');
                hc = hc.replace(/{#showOther#}.*{#showOther#}/g, "");
                fillHtml = "";
            } else {
                midAll = midAll[0] / 1;
                var mailConfig = window.PP_core_saleMail_option.mailConfig[midAll];
                if (!mailConfig) {
                    alert("邮件配置错误，请联系客服！");
                    return false;
                }
                hc = hc.replace(/{#mailTitle#}/g, mailConfig[0]);
                hc = hc.replace(/{#mailDesc#}/g, mailConfig[1]);
                var userOrder = [];
                if (window.PP_core_saleMail_option.mid == "777") {
                    userOrder = window.PP_core_saleMail_option.typeForCommend.concat();
                } else {
                    for (var i = 0, len = json.data.length; i < len; i++) {
                        if ($inArray(json.data[i].toString(), window.PP_core_saleMail_option.typeForCommend) != -1) {
                            userOrder.push(json.data[i].toString());
                        }
                    }
                    if ($inArray(window.PP_core_saleMail_option.mid.toString(), userOrder) == -1) {
                        userOrder.push(window.PP_core_saleMail_option.mid.toString());
                    }
                }
                if (userOrder.length < window.PP_core_saleMail_option.typeForCommend.length) {
                    var commendStr = getCommendList(userOrder, window.PP_core_saleMail_option.mid, window.PP_core_saleMail_option.templateForCommend);
                    hc = hc.replace(/{#otherCommend#}/g, commendStr);
                }
                if (commendStr) {
                    hc = hc.replace(/{#showOther#}/g, "");
                } else {
                    hc = hc.replace(/{#showOther#}.*{#showOther#}/g, "");
                }
            }
            var float = $float({title: "邮件订阅", html: hc, width: "650", left: option.left || "", top: option.top || ""});
            $id("ID_MoreMailOrder").onclick = function () {
                float.close();
            }
        } else if (json.i_ret == 1) {
            $float({title: "提示", html: window.PP_core_saleMail_option.templateForNoMail});
        }
        function getCommendList(bookItem, curItem, template) {
            if (curItem == "777" || bookItem.length >= option.typeForCommend.length)return"";
            var bookItemObj = {"200": ["1", "200", "http://mat1.gtimg.com/paipaimai/images/email/2010/0205/icon_sale.png", "促销信息大全", "<p>搜罗最优惠促销精选！</p><p>逢周五投递</p>", "10007.41.17"], "202": ["2", "202", "http://mat1.gtimg.com/paipaimai/images/email/20101217/l2.png", "时尚指标", "<p>速递最前沿时尚情报！</p><p>逢周一投递</p>", "10007.41.19"], "201": ["3", "201", "http://mat1.gtimg.com/paipaimai/images/email/20101217/l3.png", "新品推荐", "<p>推荐最潮人气新品！</p><p>逢周三投递</p>", "10007.41.18"], "322": ["4", "322", "http://mat1.gtimg.com/paipaimai/images/email/20101217/l4.png", "精品团购", "<p>每日团购优惠抢先报！</p><p>每天投递</p>", "10007.41.26"], "206": ["5", "206", "http://mat1.gtimg.com/paipaimai/images/email/20101217/l1.png", "店铺更新", "<p>播报关注店铺最新推荐。</p><p>逢周一投递</p>", "10007.41.25"], "320": ["6", "320", "http://mat1.gtimg.com/paipaimai/images/email/20101217/01.jpg", "女装潮流", "<p>推荐最人气潮爆女装！</p><p>逢周四投递</p>", "10007.41.29"], "306": ["7", "306", "http://mat1.gtimg.com/paipaimai/images/email/20101217/02.jpg", "商城生活", "<p>QQ商城精品抢先看！</p><p>逢周四投递</p>", "10007.41.23"], "329": ["8", "329", "http://mat1.gtimg.com/paipaimai/images/email/20101217/03.jpg", "彩钻周刊", "<p>推荐最精华购物特权！</p><p>逢周一投递</p>", "10007.41.31"], "330": ["9", "330", "http://mat1.gtimg.com/paipaimai/images/email/20101217/04.jpg", "美容美妆", "<p>最新最优惠美妆推荐！</p><p>逢周五投递</p>", "10007.41.32"], "331": ["10", "331", "http://pics3.paipaiimg.com/update/20120725/index_yixun.jpg", "易讯数码导购", "<p>数码家电大百科！</p><p>逢周二投递</p>", "10007.41.33"], "332": ["11", "332", "http://mat1.gtimg.com/paipaimai/images/email/20101217/06.jpg", "品质生活家", "<p>打造白领优质生活样板</p><p>逢周五投递</p>", "10007.41.34"], "334": ["12", "334", "http://mat1.gtimg.com/paipaimai/images/email/20101217/07.jpg", "母婴期刊", "<p>搜罗最全育儿宝典！</p><p>每周投递</p>", "10007.41.35"], "333": ["13", "333", "http://mat1.gtimg.com/paipaimai/images/email/20101217/08.jpg", "便民充值服务", "<p>超值充值优惠抢先看！</p><p>1、8、15、22日投递</p>", "10007.41.36"], "340": ["14", "340", "http://pics2.paipaiimg.com/update/20120224/index_buyqq.jpg", "QQ网购", "<p>速递优质行货正品！</p><p>逢周三投递</p>", "10007.41.37"]}, core = ["200", "322", "202", "201", "306", "206", "331", "333", "340"], unCore = [], bookCore = [], str = "", commObj = [], unsubscribedItems = [];
            for (var i = 0, len = core.length; i < len; i++) {
                $inArray(core[i], bookItem) < 0 ? commObj.push(core[i]) : bookCore.push(core[i]);
            }
            for (var i = unCore.length; i--;) {
                if ($inArray(unCore[i], bookItem) != -1) {
                    unCore.splice(i, 1);
                }
            }
            for (var i = 0; ; i++) {
                var j = Math.floor(Math.random() * unCore.length);
                if (unCore[j]) {
                    unsubscribedItems.push(unCore[j]);
                    unCore.splice(j, 1);
                }
                if (unCore.length == 0)break;
            }
            commObj = commObj.concat(unsubscribedItems.concat(bookCore));
            var item;
            for (var i = 0; i < 4; i++) {
                var comm = template;
                item = bookItemObj[commObj[i]];
                comm = comm.replace(/{#commendImage#}/g, item[2]);
                comm = comm.replace(/{#commendType#}/g, item[3]);
                comm = comm.replace(/{#commendDesc#}/g, item[4]);
                comm = comm.replace(/{#commendStatus#}/g, $inArray(item[1], bookCore) < 0 ? '<a class="order_link" href="javascript:void(0);" title="' + item[3] + '" mailid="' + item[1] + '" onclick="$setSaleMail({mid:\'' + item[1] + '\',ptag:\'' + item[5] + '\'})" ptag="' + item[5] + '">免费订阅</a>' : '<p class="done">已订阅</p>');
                str += comm;
            }
            return str;
        };
        return;
    };
};
var $simpleListScroll = function (option) {
    var opt = {cls: [], child: [], cont: null, perView: 0, prev: null, next: null, pager: [], func: function () {
    }, cpage: 1, actPager: 'click', isLoop: false, auto: 0, isHold: false, autoLoadImg: true, hoverDealy: 200, actPage: null, total: 0, page: 0};
    for (var o in option) {
        opt[o] = option[o];
    }
    opt.total = opt.total ? opt.total : opt.child.length;
    opt.page = Math.ceil(opt.total / option.perView);
    opt['setClass'] = function () {
        var len = opt.cls.length;
        if (len > 2) {
            if (opt.prev)opt.prev.className = opt.cpage == 1 ? opt.cls[1] : opt.cls[0];
            if (opt.next)opt.next.className = opt.cpage == opt.page ? opt.cls[3] : opt.cls[2];
        }
        if (opt.pager.length) {
            for (var i = 0; i < opt.pager.length; i++) {
                opt.pager[i].className = opt.cpage == (i + 1) ? opt.cls[len - 2] : opt.cls[len - 1];
            }
        }
    };
    opt['truning'] = function (type) {
        type == 'back' ? opt.cpage-- : opt.cpage++;
        opt.cpage = opt.cpage < 1 ? opt.page : opt.cpage;
        opt.cpage = opt.cpage > opt.page ? 1 : opt.cpage;
    };
    opt['showList'] = function () {
        for (var i = 0; i < opt.total; i++) {
            if (opt.child[i])opt.child[i].style.display = 'none';
        }
        for (var i = (opt.cpage - 1) * opt.perView; opt.child[i] && i < opt.cpage * opt.perView; i++) {
            opt.child[i].style.display = 'block';
            opt.loadImg(opt.child[i]);
        }
        opt.func(opt.cpage);
    };
    opt['loadImg'] = function (content) {
        if (!opt.autoLoadImg)return;
        var imgs = content.getElementsByTagName('IMG');
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].getAttribute('back_src')) {
                imgs[i].src = imgs[i].getAttribute('back_src');
                imgs[i].setAttribute('back_src', '');
            }
        }
    };
    opt['showPage'] = function (p) {
        if (p)opt.cpage = p;
        opt.setClass();
        opt.showList();
    };
    if (opt.prev)opt.prev.onclick = function () {
        if (opt.isLoop || opt.cpage != 1) {
            opt.truning('back');
            opt.showPage();
        }
        return false;
    };
    if (opt.next)opt.next.onclick = function () {
        if (opt.isLoop || opt.cpage != opt.page) {
            opt.truning();
            opt.showPage();
        }
        return false
    };
    if (opt.pager.length) {
        var wrapper = function () {
            opt.actPage = this.getAttribute('no');
            (function (em) {
                setTimeout(function () {
                    wrapperDo(em)
                }, opt.hoverDealy);
            })(this)
            return false;
        }
        var wrapperDo = function (em) {
            var no = em.getAttribute('no');
            if (opt.cpage != no && opt.actPage == no) {
                opt.cpage = no > opt.page ? 1 : no;
                opt.showPage();
            }
        };
        for (var i = 0; i < opt.pager.length; i++) {
            opt.pager[i].setAttribute('no', i + 1);
            opt.actPager == 'click' ? opt.pager[i].onclick = wrapper : opt.pager[i].onmouseover = wrapper;
        }
    }
    if (opt.auto) {
        opt.cont.onmouseover = function () {
            opt.isHold = true;
        }
        opt.cont.onmouseout = function () {
            opt.isHold = false;
        }
        setInterval(function () {
            if (opt.isHold)return;
            opt.truning();
            opt.showPage();
        }, opt.auto);
    }
    opt.showPage();
    return opt;
};
function $slider(obj) {
    var opt = {titleId: "", titleTag: "", contentId: "", contentTag: "", prevId: "", nextId: "", perView: 1, className: "current", eventType: "mouseover", initIndex: NaN, timeLag: 300, funcInit: $empty(), funcTabInit: $empty(), func: $empty(), onPage: $empty(), nodeWalker: null, auto: false, autoKeep: true, autoTimes: 100, autoLag: 5000, fadeLag: 50, fadeTimes: 500, initSpeed: 100, effect: 'none', width: 0, height: 0, backAttr: "back_src", isLoadInit: true, focusIndex: setEffect, clearAuto: function () {
        clearInterval(autoIntr)
    }, cont: null, tabs: null, funcTabChange: $empty()};
    for (var i in obj) {
        opt[i] = obj[i]
    }
    ;
    ((opt.width == 0 && opt.effect == "scrollx") || (opt.height == 0 && opt.effect == "scrolly")) && (opt.effect = "none");
    var total = 0, autoCount = 0, isInit = true, intr = null, autoIntr = null, _imgs = [];
    if (opt.contentId) {
        var oContent = $id(opt.contentId), _cont = (opt.nodeWalker || $child)(oContent, opt.contentTag, function (dom) {
            switch (opt.effect) {
                case"none":
                    dom.style.display = "none";
                    break;
                case"scrollx":
                    dom.style.width = opt.width + "px";
                    dom.style.styleFloat = dom.style.cssFloat = "left";
                    dom.style.visibility = "hidden";
                    break;
                case"scrolly":
                    dom.style.height = opt.height + "px";
                    dom.style.visibility = "hidden";
                    break;
                case"fade":
                    dom.style.display = "none";
                    dom.style.position = "absolute";
                    dom.style.left = 0;
                    dom.style.top = 0;
                    break;
            }
            ;
            opt.funcInit(total++, dom);
        });
        if (opt.auto) {
            $addEvent(oContent, "mouseover", function () {
                clearInterval(autoIntr);
            });
            opt.autoKeep && $addEvent(oContent, "mouseout", function () {
                setAuto();
            });
        }
        ;
        opt.cont = _cont;
    }
    var len = opt.perView, now = 0;
    if (opt.titleId) {
        var oTitle = $id(opt.titleId), _tabs = (opt.nodeWalker || $child)(oTitle, opt.titleTag, function (dom) {
            opt.funcTabInit(now, dom);
            dom.setAttribute("index", now++);
        });
        $addEvent(oTitle, opt.eventType, function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar && $inArray(tar, _tabs) != -1) {
                var cur = tar.getAttribute("index") * 1;
                clearInterval(autoIntr);
                if (cur != current) {
                    intr = setTimeout(function () {
                        opt.funcTabChange();
                        setEffect(cur);
                    }, opt.timeLag);
                }
            }
        });
        $addEvent(oTitle, "mouseout", function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar) {
                clearTimeout(intr);
                opt.auto && opt.autoKeep && setAuto();
            }
        });
        opt.tabs = _tabs;
        total = now;
    }
    ;
    var pageTotal = Math.ceil(total / len), current = isNaN(opt.initIndex) ? $randomInt(pageTotal) : opt.initIndex, autoTotal = opt.autoTimes * total - 1;
    setEffect(current);
    opt.auto && setAuto();
    if (opt.prevId) {
        if (opt.prevId.indexOf(",") > -1) {
            var prevs = opt.prevId.split(",");
            for (var i = 0, j = prevs.length; i < j; i++) {
                $addEvent($id(prevs[i]), "click", showPrev);
            }
        } else {
            $addEvent($id(opt.prevId), "click", showPrev);
        }
    }
    if (opt.nextId) {
        if (opt.nextId.indexOf(",") > -1) {
            var nexts = opt.nextId.split(",");
            for (var i = 0, j = nexts.length; i < j; i++) {
                $addEvent($id(nexts[i]), "click", showNext);
            }
        } else {
            $addEvent($id(opt.nextId), "click", showNext);
        }
    }
    isInit = false;
    return opt;
    function setAuto() {
        autoIntr && clearInterval(autoIntr);
        autoIntr = setInterval(function () {
            if (autoCount >= autoTotal) {
                clearInterval(autoIntr);
            } else {
                setEffect((now = current + 1) >= pageTotal ? 0 : now);
                autoCount++;
            }
        }, opt.autoLag);
    }

    function setEffect(cur) {
        if (!opt.contentId) {
            showItem(cur);
            current = cur;
            return;
        }
        ;
        if (isInit) {
            switch (opt.effect) {
                case"scrollx":
                    oContent.style.position = "relative";
                    oContent.style.width = (total + 1) * opt.width + "px";
                    oContent.style.left = -current * opt.width + "px";
                    break;
                case"scrolly":
                    oContent.style.position = "relative";
                    oContent.style.top = -current * opt.height + "px";
                    break;
                case"fade":
                    oContent.style.position = "relative";
                    break;
            }
            ;
            for (var i = 0; i < len; i++) {
                (now = cur + i) < total && showItem(now);
            }
            ;
            opt.onPage(cur);
            current = cur;
        } else {
            var fadeStep = Math.floor(opt.fadeTimes / opt.fadeLag), fadeIntr = null, fadeCount = 0;
            if (opt.globeFadeIntr) {
                switch (opt.effect) {
                    case"fade":
                        _cont[current].style.zIndex = 0;
                        _cont[cur].style.zIndex = 1;
                        _cont[current].style.filter = "alpha(opacity=0)";
                        _cont[current].style.opacity = 0;
                        _cont[cur].style.filter = "alpha(opacity=1)";
                        _cont[cur].style.opacity = 1;
                        current = cur;
                        break;
                }
                clearInterval(opt.globeFadeIntr);
            }
            opt.globeFadeIntr = null;
            switch (opt.effect) {
                case"none":
                    for (var i = 0; i < len; i++) {
                        (now = current * len + i) < total && (_cont[now].style.display = "none");
                        (now = cur * len + i) < total && showItem(now);
                    }
                    ;
                    opt.onPage(cur);
                    current = cur;
                    break;
                case"scrollx":
                    var left = getSpeed(opt.width);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.left = -left.end + "px";
                            current = cur;
                        } else {
                            oContent.style.left = -getMove(left) + "px";
                            left.t = left.t < opt.fadeTimes ? (left.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"scrolly":
                    var top = getSpeed(opt.height);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.top = -top.end + "px";
                            current = cur;
                        } else {
                            oContent.style.top = -getMove(top) + "px";
                            top.t = top.t < opt.fadeTimes ? (top.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"fade":
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            _cont[current].style.zIndex = 0;
                            _cont[cur].style.zIndex = 1;
                            current = cur;
                        } else {
                            var per = fadeCount / fadeStep;
                            _cont[current].style.filter = "alpha(opacity=" + (1 - per) * 100 + ")";
                            _cont[current].style.opacity = 1 - per;
                            _cont[cur].style.filter = "alpha(opacity=" + (per * 100) + ")";
                            _cont[cur].style.opacity = per;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
            }
            ;
        }
        function getSpeed(s) {
            var flag = (cur - current) < 0 ? -1 : 1, end = cur * s, here = (cur - flag) * s, oFirst = _cont[0];
            current == 0 && (oFirst.style.position = "static");
            if (current + 1 == total && cur == 0) {
                flag = 1;
                end = (current + 1) * s;
                here = current * s;
                oFirst.style.position = "relative";
                opt.effect == "scrollx" ? oFirst.style.left = end + "px" : oFirst.style.top = end + "px";
            }
            ;
            return{t: 0, distance: flag * s, end: end, here: here}
        }

        function getMove(obj) {
            var b = obj.here, c = obj.distance, d = opt.fadeTimes, t = obj.t / d - 1;
            return parseInt(-c * (t * t * t * t - 1) + b, 10);
        }

        function showItem(cur) {
            if (opt.contentId && !_imgs[cur] && (isInit == false || (isInit == true && opt.isLoadInit == true))) {
                $loadImg(_cont[cur], opt.backAttr);
                _imgs[cur] = true;
            }
            ;
            if (opt.contentId) {
                _cont[cur].style.display == "none" && (_cont[cur].style.display = "block");
                _cont[cur].style.visibility == "hidden" && (_cont[cur].style.visibility = "visible");
            }
            ;
            if (opt.titleId) {
                for (var i = 0, len = _tabs.length; i < len; i++) {
                    i != cur && $delClass(_tabs[i], opt.className);
                }
                $addClass(_tabs[cur], opt.className);
                _tabs[cur].style.display == "none" && (_tabs[cur].style.display = "block");
            }
            ;
            opt.func(cur);
        }
    }

    function showPrev(e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current - 1) < 0 ? (pageTotal - 1) : now);
    }

    function showNext(e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current + 1) >= pageTotal ? 0 : now);
    }
};
function $time33(str) {
    for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    ;
    return hash & 0x7fffffff;
};
function $xhrMaker() {
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = null;
            }
        }
    }
    ;
    return xhr;
};
function $xss(str, type) {
    if (!str) {
        return str === 0 ? "0" : "";
    }
    switch (type) {
        case"none":
            return str + "";
            break;
        case"html":
            return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
        case"htmlEp":
            return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            });
            break;
        case"url":
            return escape(str).replace(/\+/g, "%2B");
            break;
        case"miniUrl":
            return str.replace(/%/g, "%25");
            break;
        case"script":
            return str.replace(/[\\"']/g,function (r) {
                return"\\" + r;
            }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
            break;
        case"reg":
            return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (a) {
                return"\\" + a;
            });
            break;
        default:
            return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
    }
};
$namespace("PP.tiao.index");
PP.tiao.index = {isWG: true};
PP.tiao.index.init = function () {
    this.isWG = window.location.host.indexOf('paipai.com') == -1 && $isWidthScreen();
    var tp = $getQuery('tp');
    if (tp)this.isWG = tp == 'w';
    this.loadFocus();
    this.setRd();
    this.loadBaoyou();
    this.rss();
};
PP.tiao.index.loadFocus = function () {
    $biFocusAd({idList: this.isWG ? [582, 596, 353] : [352, 353], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2013/2/adcpcg108.js", pcs: this.isWG ? '2132:6,2172:1,1535:12' : '1533:6,1534:1,1535:9', templateIdList: this.isWG ? [
        ["protalTpl"],
        ["ladyTpl1"],
        ['', "ladyTpl2"]
    ] : [
        ["protalTpl"],
        ["ladyTpl1", "ladyTpl2"]
    ], contentList: this.isWG ? [
        [$id('f1533')],
        [$id('f1534')],
        ['', $id('f1535')]
    ] : [
        [$id('f1533')],
        [$id('f1534'), $id('f1535')]
    ], timeout: 5000, templateType: "json", onSuccess: function () {
        $simpleListScroll({cls: ['prev', 'prev', 'next', 'next', 'on', ''], total: 6, child: $child($id('f1533')), perView: 1, pager: $child($id('protalTitle')), prev: $id('prev'), next: $id('next'), actPager: 'mouseover', isLoop: true, func: function (p) {
        }});
        $autoLoadImages();
    }});
    $biFocusAd({idList: this.isWG ? [354, 597, 599, 356] : [354, 356], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2013/2/adcpcg107.js", pcs: this.isWG ? '1536:12,2173:1,2176:1,1543:6,1544:6' : '1536:9,1537:1,1542:1,1543:4,1544:5', templateIdList: this.isWG ? [
        ["manTpl1", 0],
        ["manTpl2"],
        ["fasTpl1"],
        [0, "fasTpl2", "fasTpl2"]
    ] : [
        ["manTpl1", "manTpl2"],
        ["fasTpl1", "fasTpl2", "fasTpl2"]
    ], contentList: this.isWG ? [
        [$id('f1536'), 0],
        [$id('f1537')],
        [$id('f1542')],
        [0, $id('f1543'), $id('f1544')]
    ] : [
        [$id('f1536'), $id('f1537')],
        [$id('f1542'), $id('f1543'), $id('f1544')]
    ], timeout: 5000, templateType: "json", onSuccess: function () {
        setCss('floorMan');
        $autoLoadImages();
    }});
    $biFocusAd({idList: this.isWG ? [598, 355] : [355], staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/adcpc/2013/1/adcpc355.js", pcs: this.isWG ? '2174:1,2175:1,1540:8,1541:1' : '1538:1,1539:1,1540:5,1541:1', templateIdList: this.isWG ? [
        ["cosTpl1", "cosTpl2"],
        ['', '', "cosTpl3", "cosTpl4"]
    ] : [
        ["cosTpl1", "cosTpl2", "cosTpl3", "cosTpl4"]
    ], contentList: this.isWG ? [
        [$id('f1538'), $id('f1539')],
        [0, 0, $id('f1540'), $id('f1541')]
    ] : [
        [$id('f1538'), $id('f1539'), $id('f1540'), $id('f1541')]
    ], timeout: 5000, templateType: "json", onSuccess: function () {
        setCss('floorFashion');
        $autoLoadImages();
    }});
    var setCss = function (ul) {
        var li = $id(ul).getElementsByTagName('li');
        for (var i = 0; i < li.length; i++) {
            li[i].className = 'item_' + (i + 1);
        }
        ;
    }
}
PP.tiao.index.setRd = function () {
    var rd = {lady: ['33530.2.', 11], man: ['33530.3.', 11], cos: ['33530.4.', 9], fashion: ['33530.5.', 11], rightFloat: ['33530.1.', 14]};
    var addRD = function (id, tp) {
        if (!$id(id))return;
        var links = $id(id).getElementsByTagName('A');
        for (var i = 0; i < links.length; i++) {
            links[i].href = $addRd(links[i].href, rd[tp][0] + (rd[tp][1]++));
        }
        ;
    }
    addRD('ladyKW', 'lady');
    addRD('manKW', 'man');
    addRD('cosKW', 'cos');
    addRD('fashionKW', 'fashion');
    addRD('tiaoRightFloat', 'rightFloat');
}
PP.tiao.index.rss = function () {
    window.confmail = function () {
        $setSaleMail({mid: 202, ptag: '33530.1.37'});
    }
    window.remindqq = function () {
        if (!$isLogin()) {
            $login({type: 'func', check: false, action: function () {
                remindqq();
            }});
            return;
        }
        $loadScript('http://party.paipai.com/cgi-bin/v2/shopcoupon_expire_notify?appid=1500000000&cmd=6&itemid=10014&templid=1004&callBack=searchBack');
        window.searchBack = function (json) {
            if (json.ret == 1) {
                $loadScript('http://party.paipai.com/cgi-bin/v2/shopcoupon_expire_notify?cmd=4&appid=1500000000&templid=1004&uin=' + $getUin() + '&itemid=10014&tagid=0&callBack=sendBack');
                window.sendBack = function (json) {
                    if (json.ecode == 0) {
                        $float({html: '订阅成功！'})
                    }
                    else {
                        $float({html: '订阅失败，请稍候再试。'})
                    }
                }
            }
            else {
                alert(json.msg);
            }
        }
        $countRd('33530.1.34');
    }
}
PP.tiao.index.loadBaoyou = function () {
    var Length = 10;
    var data = [
        {martId: '33574', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229347832031.js'},
        {martId: '33581', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229699152032.js'},
        {martId: '33582', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229729452033.js'},
        {martId: '33583', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229509112034.js'},
        {martId: '33584', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229493212035.js'},
        {martId: '33585', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229880862036.js'},
        {martId: '33586', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229213382037.js'},
        {martId: '33587', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239846872038.js'},
        {martId: '33588', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239400572039.js'},
        {martId: '33589', staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239895822040.js'}
    ];
    $slider({titleId: "baoyouTitle", titleTag: "li", contentId: "baoyouContent", contentTag: "ul", className: "cur", func: function (i) {
        if (!data[i].hasLoad) {
            showBaoyou(i, this.cont[i]);
        }
    }});
    function showBaoyou(index, dom) {
        $martCpc({idList: [data[index].martId], templateType: "json", pc: Length, onEach: function (itemList) {
            for (var i = 0, j = itemList.length; i < j; i++) {
                itemList[i].clickUrl = $addUrlRd(itemList[i].clickUrl, "20219.65." + (index + 1), "ptag", "martCpc");
            }
        }, onRender: function (itemList, martId, areaId) {
            dom.innerHTML = $formatArray("baoyouTpl", itemList);
            if (Length - itemList.length > 0) {
                addItem(index, Length - itemList.length, dom);
            } else {
                data[index].hasLoad = true;
                $autoLoadImages();
            }
        }});
    }

    function addItem(index, len, dom) {
        var callback = data[index].staticUrl.match(/\w*(?=\.js)/)[0];
        $loadScript(data[index].staticUrl);
        window[callback] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            var dataList = json.data.adList;
            var newList = [];
            for (var i = 0; i < len; i++) {
                if (dataList[i]) {
                    dataList[i].clickUrl = 'http://auction1.paipai.com/' + dataList[i].id + "?PTAG=20219.65." + (index + 1);
                    dataList[i].commFullName = dataList[i].recmdRegName;
                    dataList[i].uploadPicUrl1 = dataList[i].img160x160;
                    dataList[i].newPrice = (dataList[i].newPrice - 0) * 100;
                    newList.push(dataList[i]);
                }
            }
            dom.innerHTML += $formatArray("baoyouTpl", newList);
            data[index].hasLoad = true;
            $autoLoadImages();
        }
    }
};
window['PP.tiao.index'] = '21027:20130205:20130903202736';
window['PP.tiao.index.time'] && window['PP.tiao.index.time'].push(new Date());
/*  |xGv00|0d2bc9a4845280fd2e44b22c0a0d588a */