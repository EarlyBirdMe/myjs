//http://piao.qq.com/dianying/movie/3/sche_1403.html#plan
var photoDoctorOk = false;
var globalImgHash = {};
function asyncInnerHTML(HTML, callback) {
    var temp = document.createElement('div');
    var frag = document.createDocumentFragment();
    temp.innerHTML = HTML;
    (function () {
        if (temp.firstChild) {
            frag.appendChild(temp.firstChild);
            setTimeout(arguments.callee, 0);
        } else {
            try {
                callback(frag);
            } catch (e) {
            }
            ;
        }
    })();
};
function charTrim(str, len, needPostfix) {
    var halflen = Math.floor(len / 2);
    var result = [];
    var prefix;
    if (len && getRealLen(str) > len) {
        var prefix = str.substr(0, halflen);
        var curLen = getRealLen(prefix);
        var pad = str.substr(halflen);
        var a = pad.split("");
        var iLen = a.length;
        for (var i = 0; i < iLen; i++) {
            if (getRealLen(prefix + a[i]) > len) {
                return(needPostfix ? (prefix.substring(0, prefix.length - 1) + "...") : prefix);
            } else {
                prefix += a[i];
            }
        }
        return(needPostfix ? (prefix.substring(0, prefix.length - 1) + "...") : prefix);
    } else {
        return str;
    }
};
function replaceMentionPattern(value, remarkData) {
    if (value) {
        var mentionPattern = /(?:@\{uin:([^\}]*),nick:([^\}]*)\})|[^@]+/g;
        value = value.replace(mentionPattern, function ($0, uin, nick) {
            if (uin) {
                uin = trim(uin);
                nick = nick.unHtmlReplace();
                nick = nick.replace(/\%2C|%25|%7D/g, function (str) {
                    switch (str) {
                        case'%2C':
                            return',';
                        case'%25':
                            return'%';
                        case'%7D':
                            return'}';
                    }
                    return str;
                });
                var showNick = (remarkData && remarkData[uin]) ? remarkData[uin] : nick;
                return['@', showNick.htmlReplace()].join('');
            }
            return $0;
        });
    }
    return value;
};
(function () {
    QZFL.element.extendFn({"fadeIn": function (time, callBack) {
        this.show();
        this.removeClass("hide");
        this.each(function () {
            var t = this;
            time = time || 0.5;
            callBack = callBack || QZFL.emptyFn;
            var tween = new QZFL.Tween(this, "opacity", null, 0, 1, time);
            tween.onMotionStop = function () {
                callBack();
            }
            tween.start();
        });
    }, "fadeOut": function (time, callBack) {
        this.each(function () {
            var t = this;
            time = time || 0.5;
            callBack = callBack || QZFL.emptyFn;
            var tween = new QZFL.Tween(this, "opacity", null, 0.5, 0, time);
            tween.onMotionStop = function () {
                callBack();
            }
            tween.start();
        });
    }, "adopt": function (child) {
        this.each(function () {
            this.appendChild(child);
        })
    }})
})();
var p2pid = "QZoneFile.FileGetter.1";
var p2pVersion = 1.5;
function getComponentVersion(obj) {
    if (!obj) {
        return 0;
    }
    var v = 0;
    try {
        v += obj.Version(0);
        v += obj.Version(1) * 0.1;
        v += obj.Version(2) * 0.001;
        v += obj.Version(3) * 0.000001;
    } catch (err) {
        return 0;
    }
    return v;
};
function sendP2pStatistic(photo) {
    if (!photo.lloc) {
        return;
    }
    if (!window.globalCfg) {
        return;
    }
    var ownerUin = (globalCfg.uin || photo.spaceuin || photo.uin);
    if (!(/1$/.test(ownerUin))) {
        return;
    }
    var loginUin = QZONE.FP.getQzoneConfig().loginUin;
    var url = "http://cgi.photodownload.qq.com/cgi-bin/photo_cgi?";
    var data = ['Key=UserViewPhoto', 'Val=' + loginUin + "|" + ownerUin + "|" + (globalCfg.aid || photo.albumid) + "|" + photo.url + "|slide"]
    var img = new Image;
    img.onload = function () {
        this.onload = this.onerror = null;
    }
    img.onerror = function () {
        this.onerror = this.onload = null;
    }
    img.src = url + data.join("&");
}
function showUGCLikeModule(photo) {
    $e("div.pop_iv_like").setStyle("display", "none");
    if (!photo.lloc) {
        return;
    }
    if (!window.globalCfg) {
        return;
    }
    var ownerUin = (globalCfg.uin || photo.spaceuin || photo.uin);
    if (!ownerUin) {
        return;
    }
    var aid = globalCfg.aid || photo.albumid;
    if (!aid) {
        return;
    }
    $e("div.pop_iv_like").setStyle("display", "");
    QZONE.FP.addUGCLike($e("div.pop_iv_like").elements[0], {curKey: "http://user.qzone.qq.com/" + ownerUin + "/photo/" + aid + "/" + photo.lloc, uniKey: "http://user.qzone.qq.com/" + ownerUin + "/photo/" + aid + "/" + photo.lloc, from: 2}, {"onLike": function () {
    }, "onCancelLike": function () {
    }, "btnStyle": 2, "template": {keepInSameRow: true}}, function () {
    })
}
(function () {
    var globalCfg = {"topGap": 15, "barGap": 200, "clientHeight": QZFL.dom.getClientHeight()};
    var rotateMatrix = {"0": [1, 0, 0, 1], "-90": [0, -1, 1, 0], "-180": [-1, 0, 0, -1], "-270": [0, 1, -1, 0]}
    var rotate = 0;
    var origin = false;
    var first = true;
    var lateness = 0;

    function al(s, e, p) {
        return(s + (e - s) * p) + "px";
    }

    var fxInfo = {"preOuterWidth": 0, "preInnerWidth": 0, "preInnerHeight": 0, "preImgWidth": 0, "preImgHeight": 0}

    function isRelaxTime() {
        var now = new Date();
        var begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);
        return(now >= begin && now <= end);
    }

    function preloadImgFunc(index, num) {
        if (typeof num == "undefined") {
            index = 0;
            num = 3;
        }
        var now = new Date();
        var begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30);
        if ((QZONE && QZONE.FP && QZONE.FP.getLoginBitmap && QZONE.FP.getLoginBitmap(27)) || !(now >= begin && now <= end)) {
            var nextPhoto;
            var curIndex = (slideView.index + index) % slideView.photos.length;
            if (curIndex == slideView.photos.length) {
                nextPhoto = slideView.photos[0];
            } else {
                nextPhoto = slideView.photos[curIndex];
            }
            if (!nextPhoto) {
                return;
            }
            index++;
            num--;
            if (!globalImgHash[nextPhoto.url]) {
                globalImgHash[nextPhoto.url] = document.createElement("img");
                globalImgHash[nextPhoto.url].style.display = "";
                globalImgHash[nextPhoto.url].style.zIndex = 2;
                globalImgHash[nextPhoto.url].style.position = "absolute";
                globalImgHash[nextPhoto.url].loaded = false;
                globalImgHash[nextPhoto.url].src = nextPhoto.url;
                globalImgHash[nextPhoto.url].onload = function () {
                    this.onload = null;
                    this.loaded = true;
                    if (num && isRelaxTime()) {
                        preloadImgFunc(index, num);
                    }
                }
            } else {
                if (num && isRelaxTime()) {
                    preloadImgFunc(index, num);
                }
            }
        }
    }

    function getSizeAndPosition(w, h) {
        var adjusted;
        if (rotate) {
            adjusted = false;
        }
        if (!origin) {
            if (h > slideView.maxHeight) {
                w = w * (slideView.maxHeight / h);
                h = slideView.maxHeight;
                if (rotate == 0) {
                    adjusted = true;
                }
            }
            if (w > slideView.maxImgWidth) {
                h = h * (slideView.maxImgWidth / w);
                w = slideView.maxImgWidth;
                if (rotate == 0) {
                    adjusted = true;
                }
            }
        }
        var endOuterWidth = (Math.max(slideView.minWidth, w) + slideView.borderWidth), endInnerWidth = Math.max(slideView.minWidth, w), endInnerHeight = Math.max(slideView.minHeight, h), endImgLeft = w < slideView.minWidth ? (slideView.minWidth - w) / 2 : 0, endImgTop = h < slideView.minHeight ? (slideView.minHeight - h) / 2 : 0, endOuterMarginHeight = -endInnerHeight / 2 - (slideView.beAbleToPost ? 49 : 30) - (slideView.hasLike ? 17 : 0), endOuterMarginLeft = -endOuterWidth / 2, endOuterTop = (QZFL.dom.getClientHeight() - endInnerHeight) / 2 - (slideView.beAbleToPost ? 49 : 30) - (slideView.hasLike ? 17 : 0), endOuterLeft = (QZFL.dom.getClientWidth() - endOuterWidth) / 2;
        if (slideView.origin_upload && origin) {
            endOuterTop = (QZFL.dom.getClientHeight() - h) / 2 > 0 ? (QZFL.dom.getClientHeight() - h) / 2 : 0, endOuterLeft = (QZFL.dom.getClientWidth() - w) / 2 > 0 ? (QZFL.dom.getClientWidth() - w) / 2 : 0;
        }
        return{"width": w, "height": h, "endOuterWidth": endOuterWidth, "endInnerWidth": endInnerWidth, "endInnerHeight": endInnerHeight, "endImgLeft": endImgLeft, "endImgTop": endImgTop, "endOuterMarginHeight": endOuterMarginHeight, "endOuterMarginLeft": endOuterMarginLeft, "adjusted": adjusted, "endOuterTop": endOuterTop, "endOuterLeft": endOuterLeft}
    }

    QZFL.dragdrop.startDrag = function (e, handlerId, target, options) {
        var _d = QZFL.dom;
        var _e = QZFL.event;
        if (_e.getButton() != 0 || _e.getTarget().noDrag) {
            return;
        }
        if (options.ignoreTagName == _e.getTarget().tagName || _e.getTarget().noDragdrop) {
            return;
        }
        var size = _d.getSize(target);
        var stylePosition = _d.getStyle(target, "position");
        var isAbsolute = stylePosition == "absolute" || stylePosition == "fixed";
        var ghost = null, hasGhost = false;
        var xy = null;
        if (options.rangeElement) {
            var _re = options.rangeElement;
            var _el = QZFL.dom.get(_re[0]);
            var _elSize = QZFL.dom.getSize(_el);
            var _r = _re[1];
            if (!_re[2]) {
                options.range = [_r[0] ? 0 : null, _r[1] ? 0 : null, _r[2] ? _elSize[1] : null, _r[3] ? _elSize[0] : null];
            } else {
                var _elXY = QZFL.dom.getXY(_el);
                options.range = [_r[0] ? _elXY[1] : null, _r[1] ? _elXY[0] : null, _r[2] ? _elXY[1] + _elSize[1] : null, _r[3] ? _elXY[0] + _elSize[0] : null];
            }
        }
        if (!isAbsolute || options.ghost) {
            xy = isAbsolute ? [parseInt(target.style.left), parseInt(target.style.top)] : _d.getXY(target);
            ghost = _d.createElementIn("div", isAbsolute ? target.parentNode : document.body, false, {style: options.ghostStyle || this.dragGhostStyle});
            ghost.id = "dragGhost";
            _d.setStyle(ghost, "opacity", "0.8");
            setTimeout(function () {
                _d.setStyle(target, "opacity", "0.5");
            }, 0);
            if (options.ghostSize) {
                _d.setSize(ghost, options.ghostSize[0], options.ghostSize[1]);
                xy = [e.clientX + QZFL.dom.getScrollLeft() - 30, e.clientY + QZFL.dom.getScrollTop() - 20];
            } else {
                _d.setSize(ghost, size[0] - 2, size[1] - 2);
            }
            _d.setXY(ghost, xy[0], xy[1]);
            hasGhost = true;
        } else {
            xy = _d.getXY(target);
        }
        var dragTarget = ghost || target;
        this.currentDragCache = {size: size, xy: xy, mXY: xy, dragTarget: dragTarget, target: target, x: e.clientX - parseInt(xy[0]), y: e.clientY - parseInt(xy[1]), ghost: ghost, hasGhost: hasGhost, isAbsolute: isAbsolute, options: options, scrollRangeTop: QZFL.dragdrop._scrollRange, scrollRangeBottom: QZFL.dom.getClientHeight() - QZFL.dragdrop._scrollRange, maxScrollRange: Math.max(QZFL.dom.getScrollHeight() - QZFL.dom.getClientHeight(), 0)};
        var self = this;
        QZFL.event.removeEvent(window, "resize", windowResized);
        QZFL.event.removeEvent(document.body, "resize", windowResized);
        _e.on(document, "mousemove", _e.bind(this, this.doDrag), [handlerId, this.currentDragCache, options]);
        _e.on(document, "mouseup", _e.bind(this, function (a, b, c, d, e, f, g) {
            self.endDrag(a, b, c, d, e, f, g);
            QZFL.event.addEvent(window, "resize", windowResized);
            QZFL.event.addEvent(document.body, "resize", windowResized);
        }), [handlerId, this.currentDragCache, options]);
        this.dragdropPool[handlerId].onStartDrag.apply(null, [e, handlerId, this.currentDragCache, options]);
        _e.preventDefault();
    }
    function fixSizeAndPosition(img, w, h, cb, t) {
        img = slideView.bigImg || img;
        var sp = getSizeAndPosition(w, h);
        h = sp.height, w = sp.width;
        var endOuterWidth = sp.endOuterWidth, endInnerWidth = sp.endInnerWidth, endInnerHeight = sp.endInnerHeight, endImgLeft = sp.endImgLeft, endImgTop = sp.endImgTop;
        var endOuterMarginHeight = sp.endOuterMarginHeight;
        var endOuterMarginLeft = sp.endOuterMarginLeft;
        var endOuterTop = sp.endOuterTop, endOuterLeft = sp.endOuterLeft;
        if (!first) {
            if (ua.ie == 6) {
                $e("#arrow_span").hide();
                $e("#" + slideView.innerDivId).find("p.tips").hide();
            }
            var tween;
            var time = 0.22445;
            var tweenImg = $("tweenImg");
            var widthChanged = (w != fxInfo.preImgWidth) ? true : false, widthberChanged = (endInnerWidth != fxInfo.preInnerWidth) ? true : false, leftChanged = (fxInfo.preImgLeft != endImgLeft) ? true : false, heightChanged = (h != fxInfo.preImgHeight) ? true : false, heightBorderChanged = (endInnerHeight != fxInfo.preInnerHeight) ? true : false, topChanged = (fxInfo.preImgTop != endImgTop) ? true : false;
            if (!widthChanged) {
                time -= 0.11222;
            }
            if (!heightChanged) {
                time -= 0.11222;
            }
            if (slideView.beAbleToPost) {
                $("defaultInput").style.width = 1 + "px";
                $("textInput").style.width = 1 + "px";
            }
            if (t != null) {
                time = t;
            }
            $e(tweenImg).setStyle("opacity", 0.0001);
            tweenImg.style.display = "";
            tweenImg.style.width = "1px";
            tween = new QZFL.Tween(tweenImg, "width", null, "1px", "100px", time);
            var marginDiv = $e("#" + slideView.outerDivId).getParent();
            var outerDiv = $(slideView.outerDivId);
            var innerDiv = $(slideView.innerDivId);
            var container = $(slideView.imgContainerId);
            tween.onMotionChange = function (obj, prop, value) {
                var p = (value - 1) / (100 - 1);
                try {
                    img.style.width = al(fxInfo.preImgWidth, w, p);
                    innerDiv.style.width = container.style.width = al(fxInfo.preInnerWidth, endInnerWidth, p);
                    outerDiv.style.width = al(fxInfo.preOuterWidth, endOuterWidth, p);
                    img.style.left = al(fxInfo.preImgLeft, endImgLeft, p);
                    img.style.height = al(fxInfo.preImgHeight, h, p);
                    container.style.height = al(fxInfo.preInnerHeight, endInnerHeight, p);
                    img.style.top = al(fxInfo.preImgTop, endImgTop, p);
                    marginDiv.setStyle("marginTop", al(fxInfo.preOuterMarginHeight, endOuterMarginHeight, p));
                    if (!origin) {
                        marginDiv.setStyle("top", "50%");
                        marginDiv.setStyle("left", "50%");
                    }
                    if (slideView.smallImg) {
                        slideView.smallImg.style.width = al(fxInfo.preImgWidth, w, p);
                        slideView.smallImg.style.left = al(fxInfo.preImgLeft, endImgLeft, p);
                        slideView.smallImg.style.height = al(fxInfo.preImgHeight, h, p);
                        slideView.smallImg.style.top = al(fxInfo.preImgTop, endImgTop, p);
                    }
                    if (ua.ie == 6) {
                        $e("#arrow_span").hide();
                        $e("#arrow_span").show();
                        $e("#" + slideView.innerDivId).find("p.tips").hide();
                        $e("#" + slideView.innerDivId).find("p.tips").show();
                    }
                } catch (e) {
                }
                ;
            }
            tween.onMotionStop = function () {
                tweenImg.style.display = "none";
                var p = 1;
                try {
                    img.style.width = al(fxInfo.preImgWidth, w, p);
                    outerDiv.style.width = al(fxInfo.preOuterWidth, endOuterWidth, p);
                    container.style.width = innerDiv.style.width = al(fxInfo.preInnerWidth, endInnerWidth, p);
                    marginDiv.setStyle("marginTop", al(fxInfo.preOuterMarginHeight, endOuterMarginHeight, p));
                    if (slideView.origin_upload && origin) {
                        outerDiv.style.top = endOuterTop + "px";
                        outerDiv.style.left = endOuterLeft - 300 + "px";
                    }
                    if (slideView.origin_upload && !origin) {
                        outerDiv.style.top = endOuterTop + "px";
                        outerDiv.style.left = 0 + "px";
                    }
                    if (!origin) {
                        marginDiv.setStyle("top", "50%");
                        marginDiv.setStyle("left", "50%");
                    } else if (slideView.origin_upload) {
                        marginDiv.setStyle("top", "50%");
                        marginDiv.setStyle("left", "50%");
                    }
                    img.style.left = al(fxInfo.preImgLeft, endImgLeft, p);
                    img.style.height = al(fxInfo.preImgHeight, h, p);
                    container.style.height = al(fxInfo.preInnerHeight, endInnerHeight, p);
                    img.style.top = al(fxInfo.preImgTop, endImgTop, p);
                    if (slideView.smallImg) {
                        slideView.smallImg.style.width = al(fxInfo.preImgWidth, w, p);
                        slideView.smallImg.style.left = al(fxInfo.preImgLeft, endImgLeft, p);
                        slideView.smallImg.style.height = al(fxInfo.preImgHeight, h, p);
                        slideView.smallImg.style.top = al(fxInfo.preImgTop, endImgTop, p);
                    }
                    if (ua.ie == 6) {
                        $e("#arrow_span").hide();
                        $e("#arrow_span").show();
                        $e("#" + slideView.innerDivId).find("p.tips").hide();
                        $e("#" + slideView.innerDivId).find("p.tips").show();
                    }
                    if (slideView.beAbleToPost) {
                        $("defaultInput").style.width = (endInnerWidth - 2 - 2 - 8) + "px";
                        $("textInput").style.width = (endInnerWidth - 2 - 8 - 50 - 140) + "px";
                    }
                } catch (e) {
                }
                fxInfo = {"preOuterWidth": endOuterWidth, "preInnerWidth": endInnerWidth, "preInnerHeight": endInnerHeight, "preImgWidth": w, "preImgHeight": h, "preImgLeft": endImgLeft, "preImgTop": endImgTop, "preOuterMarginHeight": endOuterMarginHeight, "preOuterMarginLeft": endOuterMarginLeft, "preOuterTop": endOuterTop, "preOuterLeft": endOuterLeft}
                try {
                    (cb || QZFL.emptyFn)();
                } catch (e) {
                }
            }
            tween.start();
        } else {
            first = false;
            $e(img).setStyle("left", endImgLeft + "px");
            $e("#" + slideView.outerDivId).setStyle("width", endOuterWidth + "px");
            $e("#" + slideView.outerDivId).getParent().setStyle("marginTop", endOuterMarginHeight + "px");
            $e("#" + slideView.innerDivId).setStyle("width", endInnerWidth + "px");
            $e("#" + slideView.imgContainerId).setStyle("height", endInnerHeight + "px");
            $e("#" + slideView.imgContainerId).setStyle("width", endInnerWidth + "px");
            $e(img).setStyle("width", w + "px");
            $e(img).setStyle("height", h + "px");
            $e(img).setStyle("left", endImgLeft + "px");
            $e(img).setStyle("top", endImgTop + "px");
            var xy = QZFL.dom.getXY($("displayOuterDiv").parentNode);
            fxInfo = {"preOuterWidth": endOuterWidth, "preInnerWidth": endInnerWidth, "preInnerHeight": endInnerHeight, "preImgWidth": w, "preImgHeight": h, "preImgLeft": endImgLeft, "preImgTop": endImgTop, "preOuterMarginHeight": endOuterMarginHeight, "preOuterMarginLeft": endOuterMarginLeft, "preOuterTop": xy[0], "preOuterLeft": xy[1]}
            try {
                (cb || QZFL.emptyFn)();
            } catch (e) {
                alert(2)
            }
        }
        img.style.display = "";
    }

    function renderImg() {
        if (slideView.lazyInfo) {
            slideView.display();
            return;
        }
        var t, i, n;
        i = slideView.index;
        t = slideView.photos.length;
        n = slideView.photos[i - 1].name;
        asyncInnerHTML('<p style="z-index:1001" class="tips"><span class="cont_tips"><span id="photoName" class="photo_name">' + n + '</span><span id="pageIndex" class="current">' + i + '</span>/' + t + '</span></p>', function (df) {
            $(slideView.imgContainerId).parentNode.appendChild(df);
        });
        if (slideView.allowReprint) {
            var code = ['<div class="option" id="tips_share" style="display:none;z-index:20000">', '<p><a href="##" id="btn_reprint" ', slideView.showReprintIcon ? '' : 'style="display:none"', ' title="转到我空间" onclick="slideView.noReprint();return false">转载</a> <span class="v_line">|</span> <a href="##" id="btn_share" title="分享给好友" ', slideView.showShareIcon ? '' : 'style="display:none"', ' onclick="slideView.noShare();return false">分享</a></p>', '</div>'].join("");
            if (slideView.showReprintIcon) {
                code = code.replace("slideView.noReprint()", "slideView.reprint()");
                if (slideView.showShareIcon) {
                    code = code.replace("slideView.noShare()", "slideView.share()");
                }
            }
            asyncInnerHTML(code, function (df) {
                $(slideView.imgContainerId).parentNode.appendChild(df);
            });
        }
        slideView.display();
        if (slideView.commentList) {
            slideView.initComment();
        }
    }

    function showAnimation(cb) {
        var hintTime;
        clearTimeout(slideView.closeTimer);
        cb = cb || QZFL.emptyFn;
        var tweenImg = $e("#tweenImg"), img = new Image;
        var tweenTime = 0.25;
        img.onload = function () {
            img = null;
            clearTimeout(hintTime);
            QZONE.FP.hideMsgbox();
            this.onerror = null;
            this.onload = null;
            $e(".loading_first").hide();
            tweenImg.setStyle("left", slideView.originLeft + "px");
            tweenImg.setStyle("top", slideView.originTop + "px");
            tweenImg.setStyle("width", slideView.originWidth + "px");
            tweenImg.setStyle("height", slideView.originHeight + "px");
            tweenImg.setAttr("src", slideView.photos[slideView.index - 1].url);
            tweenImg.setStyle("opacity", 0.7);
            tweenImg.show();
            var imgDom = tweenImg.elements[0];
            var outerDiv = $(slideView.outerDivId), innerDiv = $(slideView.innerDivId), imgContainer = $(slideView.imgContainerId);
            var sp = getSizeAndPosition(this.width, this.height);
            outerDiv.style.width = sp.endOuterWidth + "px";
            innerDiv.style.width = sp.endInnerWidth + "px";
            $e(outerDiv).getParent().elements[0].style.marginTop = sp.endOuterMarginHeight + "px";
            imgContainer.style.height = sp.endInnerHeight + "px";
            var xy = QZFL.dom.getXY(outerDiv);
            $e(outerDiv).hide();
            if (sp.height == slideView.originHeight) {
                slideView.originHeight--;
            }
            var tween = new QZFL.Tween(imgDom, "height", null, slideView.originHeight + "px", sp.height, tweenTime);
            tween.onMotionChange = function (obj, prop, value) {
                var p = (value - slideView.originHeight) / (sp.height - slideView.originHeight);
                imgDom.style.left = al(slideView.originLeft, xy[0] + sp.endImgLeft, p);
                imgDom.style.top = al(slideView.originTop, xy[1] + sp.endImgTop, p);
                imgDom.style.width = al(slideView.originWidth, sp.width, p);
            }
            tween.onMotionStop = function () {
                tweenImg.hide();
                $e(outerDiv).setStyle("visibility", "visible");
                cb();
                var tw = new QZFL.Tween($("mask_shadow"), "opacity", null, 0, 1, 0.3);
                tw.start();
            }
            tween.start();
        }
        img.onerror = function () {
            img = null;
            clearTimeout(hintTime);
            QZONE.FP.hideMsgbox();
            this.onload = null;
            this.onerror = null;
            $e("#mask_shadow").setStyle("opacity", 0)
            $e("#mask_shadow").show();
            tweenImg.hide();
            var outerDiv = $(slideView.outerDivId);
            $e(outerDiv).setStyle("visibility", "visible");
            cb();
            var tw = new QZFL.Tween($("mask_shadow"), "opacity", null, 0, 1, 0.3);
            tw.start();
        }
        hintTime = setTimeout(function () {
            QZONE.FP.showMsgbox("正在读取照片...", 6, 10000);
        }, 500);
        img.src = slideView.photos[slideView.index - 1].url;
    }

    function closeWithAnimation(cb) {
        QZONE.FP.hideMsgbox();
        $e("#mask_shadow").hide();
        $e("div.pop_iv_option").hide();
        var tweenTime = 0.5;
        var tweenImg = $e("#tweenImg"), outerDiv = $(slideView.outerDivId);
        var sp = QZFL.dom.getPosition(slideView.curImg || slideView.bigImg);
        tweenImg.setStyle("left", sp.left + "px");
        tweenImg.setStyle("top", sp.top + "px");
        tweenImg.setStyle("width", sp.width + "px");
        tweenImg.setStyle("height", sp.height + "px");
        tweenImg.setAttr("src", slideView.photos[slideView.index - 1].url);
        tweenImg.setStyle("opacity", 0.5);
        tweenImg.show();
        $e(outerDiv).hide();
        var imgDom = tweenImg.elements[0];
        var tween = new QZFL.Tween(imgDom, "left", null, sp.left + "px", slideView.originLeft + 5, tweenTime);
        tween.start();
        var tween = new QZFL.Tween(imgDom, "top", null, sp.top + "px", slideView.originTop + 5, tweenTime);
        tween.start();
        var tween = new QZFL.Tween(imgDom, "width", null, sp.width + "px", slideView.originWidth, tweenTime);
        tween.start();
        var tween = new QZFL.Tween(imgDom, "height", null, sp.height + "px", slideView.originHeight, tweenTime);
        tween.onMotionStop = function () {
            (cb || QZFL.emptyFn)();
        }
        tween.start();
    }

    function windowResized() {
        globalCfg.clientHeight = QZFL.dom.getClientHeight();
        slideView.maxHeight = globalCfg.clientHeight - globalCfg.topGap - globalCfg.barGap;
        var img = new Image;
        var curImg = slideView.curImg || slideView.bigImg;
        img.onload = function () {
            this.onload = null;
            this.onerror = null;
            img = null;
            fixSizeAndPosition(curImg, this.width, this.height, function () {
                slideView.adjust();
            });
        }
        img.onerro = function () {
            this.onload = null;
            this.onerror = null;
            img = null;
        }
        if (curImg) {
            img.src = curImg.src;
        }
    }

    function getMousePositionMsg(e, img) {
        var x = QZONE.event.mouseX(e);
        var p = QZONE.dom.getPosition(img);
        if (x < (p.left + p.width / 2)) {
            return"left";
        } else {
            return"right";
        }
    }

    function mouseOverImg(e) {
        var img = $(slideView.imgContainerId);
        if (origin) {
            QZONE.css.removeClassName(img, "right-img");
            QZONE.css.removeClassName(img, "left-img");
            return;
        }
        QZONE.event.cancelBubble();
        e = QZONE.event.getEvent(e);
        if (slideView.photos.length == 1) {
            img.title = "仅一张照片";
            return;
        }
        img.title = "";
        if (getMousePositionMsg(e, img) == "left" && img.className.indexOf("left-img") == -1) {
            QZONE.css.removeClassName(img, "right-img");
            QZONE.css.addClassName(img, "left-img");
        } else if (getMousePositionMsg(e, img) == "right" && img.className.indexOf("right-img") == -1) {
            QZONE.css.removeClassName(img, "left-img");
            QZONE.css.addClassName(img, "right-img");
        }
    }

    function mouseOutImg(e) {
        try {
            $('tips_share').style.display = "none";
            QZFL.event.cancelBubble();
            QZFL.event.preventDefault();
        } catch (e) {
        }
    }

    function actionEvent(e) {
        if (origin) {
            return;
        }
        QZONE.event.cancelBubble();
        e = QZONE.event.getEvent(e);
        var img = $(slideView.imgContainerId);
        var btn = QZONE.event.getButton(e);
        if (btn == 0) {
            if (getMousePositionMsg(e, img) == "left") {
                slideView.pre();
            } else {
                slideView.next();
            }
        }
    }

    function bindMouseEvent() {
        $e("#" + slideView.imgContainerId).onMouseMove(mouseOverImg)
        $e(slideView.curImg).onMouseMove(mouseOverImg);
        $e(slideView.bakImg).onMouseMove(mouseOverImg);
        $e(slideView.smallImg).onMouseMove(mouseOverImg);
        $e("#" + slideView.imgContainerId).onClick(actionEvent);
        $e(slideView.curImg).onClick(actionEvent);
        $e(slideView.bakImg).onClick(actionEvent);
        $e(slideView.smallImg).onClick(actionEvent);
        $e("#displayInnerDiv").onHover(function () {
            if (slideView.allowReprint) {
                try {
                    $('tips_share').style.display = "";
                } catch (e) {
                }
            }
        }, mouseOutImg);
    }

    var loadingTimer;
    var n = 0;

    function showLoadingTips() {
        n++;
        if (n > 3) {
            n = 1;
        }
        $e("div.showTips").show();
        var a = [];
        for (var i = 0; i < n; i++) {
            a.push(".");
        }
        $e("div.showTips").setHtml("正在加载" + a.join(""));
        loadingTimer = setTimeout(showLoadingTips, 100);
    }

    function hideLoadingTips() {
        clearTimeout(loadingTimer);
        $e("div.showTips").hide();
    }

    QZFL.event.addEvent(window, "resize", windowResized);
    QZFL.event.addEvent(document.body, "resize", windowResized);
    var preLoadImg = new Image;
    var preLoadBigImg = new Image;
    var preLoadTimer = null;
    var loadIconTimer = null;
    var commentTimer = null;
    var proloadImgFuncTimer = null;
    var keepOrigin = false;
    var slideView = {"fadeInAndOut": true, "smallTrans": false, "outerDivId": "displayOuterDiv", "innerDivId": "displayInnerDiv", "imgContainerId": "imgContainer", "autoChange": false, "defImgNum": 2, "curImg": null, "bakImg": null, "smallImg": null, "photos": null, "index": 0, "maxHeight": globalCfg.clientHeight - globalCfg.topGap - globalCfg.barGap, "minWidth": 400, "minHeight": 300, "maxImgWidth": 670, "borderWidth": 6, "comment": false, "animation": true, "origin_upload": 0, "originLeft": 100, "originTop": 100, "originWidth": 100, "originHeight": 100, "indexChanged": QZFL.emptyFn, "allowReprint": false, "showShareIcon": false, "showReprintIcon": false, "noShare": function () {
        QZONE.FP.showMsgbox("抱歉，照片主人禁止分享", 3, 2000);
    }, "noReprint": function () {
        QZONE.FP.showMsgbox("抱歉，照片主人禁止转载", 3, 2000);
    }, "getExData": function () {
        return frameElement.G_Param.exData;
    }, "init": function (photos, index, settings) {
        var _p = frameElement.G_Param;
        settings.originLeft = _p['x'] - 0;
        settings.originTop = _p['y'] - 0;
        settings.originWidth = _p['w'] - 0;
        settings.originHeight = _p['h'] - 0;
        slideView.closeTimer = setTimeout(function () {
            slideView.close();
        }, 5000);
        for (var i in settings) {
            if (i == "postComment") {
                slideView.beAbleToPost = settings.postComment;
            } else {
                slideView[i] = settings[i];
            }
        }
        if (!slideView.beAbleToPost) {
            $e("#" + slideView.imgContainerId).getParent().addClass("cont_normal");
        }
        slideView.photos = photos;
        slideView.index = index - 0 + 1;
        if (slideView.commentList) {
            $e(".pop_iv_wrap").addClass("pop_iv_comment");
        }
        var img;
        for (var i = 0; i < slideView.defImgNum; i++) {
            img = document.createElement("img");
            img.style.position = "absolute";
            img.style.display = "none";
            img.src = "about:blank";
            img.style.zIndex = 2;
            slideView[(i == 0 ? "curImg" : "bakImg")] = img;
            $e(img).setStyle("opacity", 0);
            $(slideView.imgContainerId).appendChild(img);
        }
        if (slideView.smallTrans) {
            img = document.createElement("img");
            img.style.position = "absolute";
            img.style.display = "none";
            img.src = "about:blank";
            img.style.zIndex = 1;
            slideView["smallImg"] = img;
            $e(img).setStyle("opacity", 0);
            $(slideView.imgContainerId).appendChild(img);
        }
        if (slideView.animation) {
            if (ua.firefox == 3.6) {
                clearTimeout(slideView.closeTimer);
                $e("#mask_shadow").setStyle("opacity", 0)
                $e("#mask_shadow").show();
                $e("#" + slideView.outerDivId).setStyle("visibility", "visible");
                renderImg();
                if (slideView.beAbleToPost) {
                    try {
                        PostComment.init();
                    } catch (e) {
                    }
                }
                $e("#" + slideView.outerDivId).show();
                var tw = new QZFL.Tween($("mask_shadow"), "opacity", null, 0, 1, 0.3);
                tw.start();
            } else {
                showAnimation(function () {
                    renderImg();
                    if (slideView.beAbleToPost) {
                        try {
                            PostComment.init();
                        } catch (e) {
                        }
                    }
                    $e("#" + slideView.outerDivId).show();
                });
            }
        } else {
            $e(".loading_first").hide();
            $e("#mask_shadow").show();
            renderImg();
        }
        bindMouseEvent();
    }, "initComment": function () {
        CommentList.init($e(".pop_iv_wrap"));
    }, "showComment": function () {
        if (!slideView.commentList) {
            return;
        }
        var photo = slideView.photos[slideView.index - 1];
        setTimeout(function () {
            CommentList.display(photo);
        }, 400);
    }, "display": function () {
        rotate = 0;
        if (!keepOrigin) {
            origin = false;
        }
        if (origin) {
            slideView.originSize();
        }
        if (slideView.rotateImg) {
            slideView.rotateImg.style.display = 'none';
        }
        var photo = slideView.photos[slideView.index - 1];
        slideView.indexChanged(photo);
        sendP2pStatistic(photo);
        clearTimeout(preLoadTimer);
        clearTimeout(loadIconTimer);
        clearTimeout(commentTimer);
        clearTimeout(proloadImgFuncTimer);
        var loading = $e("#" + slideView.imgContainerId).getParent();
        loading.removeClass("loading");
        loadIconTimer = setTimeout(function () {
            loading.addClass("loading");
        }, 1000);
        var time, nt = new Date().getTime();
        if (nt - lateness > 900) {
            time = 0;
        } else {
            time = 900;
            if (QZONE && QZONE.FP && ((QZONE.FP.getUserVIPLevel && QZONE.FP.getUserVIPLevel() == 7) || (QZONE.FP.isUserVIPExpress && QZONE.FP.isUserVIPExpress()))) {
                time = 200;
            }
        }
        lateness = nt;
        try {
            $e("#pageIndex").getParent().getParent().hide();
            $("pageIndex").innerHTML = slideView.index;
            $e("#pageIndex").getParent().getParent().show();
        } catch (e) {
        }
        ;
        try {
            var name = $e("#photoName");
            name.hide();
            name.setHtml(escHTML(charTrim(restHTML(photo.name), 18, true)));
            name.show();
        } catch (e) {
        }
        ;
        if (slideView.smallTrans && !first) {
            var name = $e("#photoName");
            name.hide();
            name.setHtml(escHTML(charTrim(restHTML(photo.name), 18, true)));
            name.show();
            PostComment.cancel();
            CommentList.hide();
            preLoadTimer = setTimeout(function () {
                refreshPing(3);
                if (slideView.curImg) {
                    slideView.curImg.parentNode.removeChild(slideView.curImg);
                    slideView.curImg = null;
                }
                if (slideView.bigImg) {
                    slideView.bigImg.onload = null;
                    slideView.bigImg.parentNode.removeChild(slideView.bigImg);
                    slideView.bigImg = null;
                }
                if (slideView.smallImg) {
                    slideView.smallImg.onload = null;
                    slideView.smallImg.parentNode.removeChild(slideView.smallImg);
                    slideView.smallImg = null;
                }
                $e("#pageIndex").getParent().getParent().hide();
                $("pageIndex").innerHTML = slideView.index;
                $e("#pageIndex").getParent().getParent().show();
                if (globalImgHash[photo.url]) {
                    slideView.bigImg = globalImgHash[photo.url];
                    preloadImgFunc(0, 3);
                } else {
                    globalImgHash[photo.url] = slideView.bigImg = document.createElement("img");
                    slideView.bigImg.style.display = "";
                    slideView.bigImg.style.zIndex = 2;
                    slideView.bigImg.style.position = "absolute";
                    slideView.bigImg.src = photo.url;
                    slideView.bigImg.onload = function () {
                        this.onload = null;
                        this.loaded = true;
                    }
                }
                $("imgContainer").appendChild(slideView.bigImg);
                slideView.smallImg = document.createElement("img");
                $("imgContainer").appendChild(slideView.smallImg);
                if (slideView.bigImg.loaded) {
                    clearTimeout(loadIconTimer);
                    loading.removeClass("loading");
                    slideView.smallImg.style.display = "none";
                } else {
                    slideView.smallImg.style.display = "";
                    slideView.smallImg.style.zIndex = 1;
                    slideView.smallImg.style.position = "absolute";
                    slideView.smallImg.onload = function () {
                        clearTimeout(loadIconTimer);
                        loading.removeClass("loading");
                    }
                    slideView.smallImg.src = photo.pre;
                }
                fixSizeAndPosition(slideView.smallImg, photo.width, photo.height, function () {
                    commentTimer = setTimeout(slideView.showComment, 1000);
                    proloadImgFuncTimer = setTimeout(preloadImgFunc, 500);
                });
            }, time);
        } else {
            $e(slideView.curImg).fadeOut();
            $e(slideView.curImg).hide();
            PostComment.cancel();
            loading.removeClass("loading");
            if (!loadIconTimer) {
                loadIconTimer = setTimeout(function () {
                    loading.addClass("loading");
                }, 1000);
            }
            preLoadImg.onload = preLoadImg.onerror = (function (img) {
                clearTimeout(loadIconTimer);
                loading.removeClass("loading");
                return function (e) {
                    this.onload = null;
                    this.onerror = null;
                    var t = this;
                    img.src = photo.url;
                    photo.width = t.width;
                    photo.height = t.height;
                    fixSizeAndPosition(img, t.width, t.height);
                    img = $e(img);
                    img.setStyle("opacity", 1);
                    img.show();
                    img = null;
                    if (!slideView.lazyInfo) {
                        slideView.showComment();
                    } else {
                        setTimeout(function () {
                            slideView.getInfo(slideView.setInfo)
                        }, 0)
                    }
                }
            })(slideView.bakImg);
            if (first) {
                preLoadImg.src = photo.url;
                var temp = slideView.bakImg;
                slideView.bakImg = slideView.curImg;
                slideView.curImg = temp;
                proloadImgFuncTimer = setTimeout(preloadImgFunc, 500);
            } else {
                preLoadTimer = setTimeout(function () {
                    if (globalImgHash[photo.url] && globalImgHash[photo.url].loaded) {
                    }
                    else {
                    }
                    preLoadImg.src = photo.url;
                    var temp = slideView.bakImg;
                    slideView.bakImg = slideView.curImg;
                    slideView.curImg = temp;
                    proloadImgFuncTimer = setTimeout(preloadImgFunc, 500);
                }, time);
            }
        }
        if (photo.lloc) {
            slideView.hasLike = true;
            showUGCLikeModule(photo);
        }
    }, "pre": function (force) {
        if (slideView.dynamicData && !force) {
            slideView.dynamicPre();
            return;
        }
        if (slideView.lazyInfo) {
            return;
        }
        if (slideView.photos.length == 1) {
            return;
        }
        if (!slideView.checkComment("pre")) {
            return;
        }
        if (slideView.index == 1) {
            slideView.index = slideView.photos.length;
        } else {
            slideView.index--;
        }
        if (slideView.beAbleToPost) {
            $e(".pop_iv_post").show();
        }
        QZFL.dragdrop.unRegisterDragdropHandler($("displayOuterDiv").parentNode);
        $e(".op_equal").show();
        $e(".op_hd").show();
        $e(".op_size").hide();
        $e("#arrow_span").show();
        slideView.display();
        QZFL.event.cancelBubble();
        QZFL.event.preventDefault();
    }, "next": function (force) {
        if (slideView.dynamicData && !force) {
            slideView.dynamicNext();
            return;
        }
        ;
        if (slideView.lazyInfo) {
            return;
        }
        if (slideView.photos.length == 1) {
            return;
        }
        if (!slideView.checkComment("next")) {
            return;
        }
        if (slideView.beAbleToPost) {
            $e(".pop_iv_post").show();
        }
        $e(".op_equal").show();
        $e(".op_hd").show();
        $e(".op_size").hide();
        $e("#arrow_span").show();
        QZFL.dragdrop.unRegisterDragdropHandler($("displayOuterDiv").parentNode);
        if (slideView.index == slideView.photos.length) {
            slideView.index = 1;
        } else {
            slideView.index++;
        }
        slideView.display();
        QZFL.event.cancelBubble();
        QZFL.event.preventDefault();
    }, "checkComment": function (action) {
        if (slideView.beAbleToPost) {
            if (trim($("textInput").value) != "") {
                QZONE.FP.confirm("提示", "翻页将删除您正在编辑的评论内容，确定放弃评论？", {"type": 2, "hastitle": true, "okfn": function () {
                    $("textInput").value = "";
                    slideView[action]();
                }, "tips": ["确定", "取消"]});
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, "close": function () {
        QZFL.event.cancelBubble();
        QZFL.event.preventDefault();
        if (QZONE.FP._t.QZONE.FrontPage.popupDialog._cpp) {
            QZONE.FP.closePopup();
        }
        if (slideView.origin_upload) {
            try {
                QZONE.FP.getCurrentAppWindow().myView.slideToLloc(slideView.photos[slideView.index - 1].lloc);
            } catch (e) {
            }
        }
        try {
            QZONE.FP.addUGCLike.dispose($e("div.pop_iv_like").elements[0]);
        } catch (e) {
        }
        if (slideView.animation) {
            if (slideView.commentList) {
                $e(".sidebar").hide();
                var div = $e(".pop_iv_wrap");
                div.removeClass("pop_iv_comment");
            }
            try {
                if (ua.firefox == 3.6) {
                    setTimeout(function () {
                        QZONE.FP.closeFullScreenDialog();
                    }, 0);
                } else {
                    closeWithAnimation(function () {
                        $e("#tweenImg").hide();
                        setTimeout(function () {
                            QZONE.FP.closeFullScreenDialog();
                        }, 0);
                    })
                }
            } catch (e) {
                setTimeout(function () {
                    QZONE.FP.closeFullScreenDialog();
                }, 0);
            }
        } else {
            setTimeout(function () {
                QZONE.FP.closeFullScreenDialog();
            }, 0);
        }
    }, "setInfo": function (photos, index) {
        var needRepaint = false;
        if (index == -1) {
            needRepaint = true;
            index = 0;
        }
        slideView.photos = photos;
        slideView.index = index - 0 + 1;
        slideView.lazyInfo = false;
        preloadImgFunc(0, 3);
        if (slideView.photos.length > 1) {
            try {
                $e(".op_prev").show();
                $e(".op_next").show();
                $e(".op_prev_disable").hide();
                $e(".op_next_disable").hide();
            } catch (e) {
            }
        }
        if (slideView.allowReprint) {
            try {
                $e(".op_share").show();
                $e(".op_reprint").show();
                $e(".op_share_disable").hide();
                $e(".op_reprint_disable").hide();
            } catch (e) {
            }
        }
        asyncInnerHTML('<p style="z-index:1001" class="tips"><span class="cont_tips"><span id="photoName" class="photo_name">' + slideView.photos[slideView.index - 1].name + '</span><span id="pageIndex" class="current">' + slideView.index + '</span>/' + slideView.photos.length + '</span></p>', function (df) {
            $(slideView.imgContainerId).parentNode.appendChild(df);
        });
        if (slideView.allowReprint) {
            var code = ['<div class="option" id="tips_share" style="display:none;z-index:20000">', '<p><a href="##" id="btn_reprint" ', slideView.showReprintIcon ? '' : 'style="display:none"', ' title="转到我空间" onclick="slideView.noReprint();return false">转载</a> <span class="v_line">|</span> <a href="##" id="btn_share" title="分享给好友" ', slideView.showShareIcon ? '' : 'style="display:none"', ' onclick="slideView.noShare();return false">分享</a></p>', '</div>'].join("");
            if (slideView.showReprintIcon) {
                code = code.replace("slideView.noReprint()", "slideView.reprint()");
            }
            if (slideView.showShareIcon) {
                code = code.replace("slideView.noShare()", "slideView.share()");
            }
            asyncInnerHTML(code, function (df) {
                $(slideView.imgContainerId).parentNode.appendChild(df);
            });
        }
        if (slideView.origin_upload) {
            keepOrigin = true;
            origin = true;
            $e('.op_equal').each(function (el) {
                $e(el).removeClass("op_equal");
                $e(el).addClass("op_hd");
                $e(el).find("a").elements[0].title = "高清浏览";
                $e(el).find("a").elements[0].innerHTML = "高清浏览";
            });
            setTimeout(function () {
                slideView.originSize();
            }, 50)
        }
        if (needRepaint) {
            slideView.display();
        }
        if (slideView.beAbleToPost && slideView.origin_upload) {
            $('comment_li').style.display = "";
        }
        if (slideView.commentList) {
            QZFL.FP.getRemarkList(function (remarkData) {
                slideView._remarkData = remarkData;
                slideView.initComment();
                slideView.showComment();
            });
        }
        if (slideView.photos[slideView.index - 1].lloc) {
            slideView.hasLike = true;
        }
        showUGCLikeModule(slideView.photos[slideView.index - 1]);
    }, "getFxInfo": function () {
        return fxInfo;
    }, "getPhoto": function () {
        return slideView.photos[slideView.index - 1];
    }, "adjust": function (cb) {
        cb = cb || QZFL.emptyFn;
        var img = slideView.curImg || slideView.bigImg;
        var w, h;
        if (img) {
            var photo = slideView.photos[Math.max(slideView.index - 1, 0)];
            if (!photo) {
                return;
            }
            if (rotate % 180 == 0) {
                w = photo.width;
                h = photo.height;
            } else {
                h = photo.width;
                w = photo.height;
            }
            fixSizeAndPosition(img, w, h, function () {
                if (rotate != 0) {
                    if (slideView.smallImg) {
                    }
                    var sp = getSizeAndPosition(w, h);
                    var rotateImg
                    if (!slideView.rotateImg) {
                        rotateImg = document.createElement("img");
                        rotateImg.src = "about:blank";
                        rotateImg.style.position = "absolute";
                        rotateImg.style.display = "none";
                        rotateImg.style.zIndex = 3;
                        slideView["rotateImg"] = rotateImg;
                        $(slideView.imgContainerId).appendChild(rotateImg);
                    }
                    slideView["rotateImg"].src = photo.url;
                    if (ua.ie) {
                        slideView.rotateImg.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + rotateMatrix[rotate][0] + ',M21=' + rotateMatrix[rotate][1] + ',M12=' + rotateMatrix[rotate][2] + ',M22=' + rotateMatrix[rotate][3] + ', sizingmethod="auto expand"); ';
                        slideView.rotateImg.style.left = sp.endImgLeft + "px";
                        slideView.rotateImg.style.top = sp.endImgTop + "px";
                    } else {
                        var map = {"0": "init", "1": "first", "2": "second", "3": "third"}
                        slideView.rotateImg.className = map[rotate / -90] + "_degree";
                        if (rotate % 180 == 0) {
                            slideView.rotateImg.style.left = sp.endImgLeft + "px";
                            slideView.rotateImg.style.top = sp.endImgTop + "px";
                        } else {
                            slideView.rotateImg.style.left = sp.endImgLeft + (sp.width - sp.height) / 2 + "px";
                            slideView.rotateImg.style.top = sp.endImgTop + (sp.height - sp.width) / 2 + "px";
                        }
                    }
                    if (rotate % 180 == 0) {
                        slideView.rotateImg.style.height = sp.height + "px";
                        slideView.rotateImg.style.width = sp.width + "px";
                    } else {
                        slideView.rotateImg.style.height = sp.width + "px";
                        slideView.rotateImg.style.width = sp.height + "px";
                    }
                    slideView.rotateImg.style.display = "";
                } else {
                    img.style.display = "";
                    if (slideView.smallImg) {
                    }
                    if (slideView.rotateImg) {
                        slideView.rotateImg.style.display = "none";
                    }
                }
                cb();
            }, 0.00001);
        }
    }, "rotate": function (direction) {
        if (direction == "right") {
            if (rotate == -360) {
                rotate = 0;
            }
            rotate -= 90;
        } else {
            if (rotate == 0) {
                rotate = -360;
            }
            rotate += 90;
        }
        if (rotate == -360) {
            rotate = 0;
        }
        slideView.adjust();
    }, "originSize": function () {
        origin = true;
        slideView.adjust(function () {
            var opt = {ghost: false}
            $e(".pop_iv_post").hide();
            if (slideView.beAbleToPost) {
                $e("#" + slideView.imgContainerId).getParent().addClass("cont_normal");
            }
            $e(".sidebar").hide();
            $e(".op_equal").hide();
            $e(".op_hd").hide();
            $e(".op_size").show();
            $e("#arrow_span").hide();
            slideView.dragHandler = QZFL.dragdrop.registerDragdropHandler($("displayOuterDiv").parentNode, $("displayOuterDiv").parentNode, opt);
        });
    }, "perfectSize": function () {
        origin = false;
        slideView.adjust(function () {
            if (slideView.beAbleToPost) {
                $e(".pop_iv_post").show();
            }
            if (slideView.commentList) {
                CommentList.display(slideView.photos[slideView.index - 1])
            }
            $e(".op_equal").show();
            $e(".op_hd").show();
            $e(".op_size").hide();
            $e("#arrow_span").show();
            QZFL.dragdrop.unRegisterDragdropHandler($("displayOuterDiv").parentNode);
            if (slideView.beAbleToPost) {
                $e("#" + slideView.imgContainerId).getParent().removeClass("cont_normal");
            }
        });
    }, "goToComment": function () {
        if ($e(".panel_int").hasClass("hide")) {
            slideView.perfectSize();
            setTimeout(function () {
                PostComment.writeOneMore();
            }, 100);
        } else {
            $('textInput').focus();
        }
    }, "postComment": function (content, v, cb) {
        var photo = slideView.photos[slideView.index - 1];
        if (photo && photo.lloc) {
            var data = {"albumid": photo.albumid, "content": content, "forumindex": photo.forum, "lloc": photo.lloc, "output_type": "jsonhtml", "picname": photo.name, "zz": 1, "refer": "ic", "sloc": photo.sloc, "uin": photo.spaceuin, "verifycode": v || "", "privacy": 1}
            PhotoLogic.getCommentUrl({"uin": photo.spaceuin, "refer": "qzone", "callBack": function (url) {
                dataSender(url, data, function (d) {
                    photo.forum = 1;
                    d.nick = restHTML(d.nick);
                    cb.onSuccess(d);
                }, function (d) {
                    cb.onError(d);
                });
            }})
        } else {
            QZONE.FP.showMsgbox("对不起，获取图片数据失败，请稍后再试！", 5, 2000);
        }
    }};
    this.slideView = slideView;
    var dataSender = function (url, data, sucCb, errCb, options) {
        options = options || {showTips: false, checkLogin: true};
        var arg = arguments;

        function _cfn() {
            setTimeout(function () {
                arg.callee.apply(null, arg)
            }, 0);
        }

        sucCb = sucCb || QZFL.emptyFn;
        errCb = errCb || QZFL.emptyFn;
        var arg = arguments;
        data.output_type = "jsonhtml";
        data.refer = data.refer || "qzone";
        data.uin = data.uin || QZONE.FP._t.g_iLoginUin
        var post = new QZFL.FormSender(url, "post", data, "gb2312");
        post.onSuccess = function (d) {
            var ret = d.ret;
            var msg = d.msg;
            if (d.data) {
                ret = d.data.code;
                msg = d.data.msg;
            }
            if (ret == 0) {
                sucCb(d);
            } else if (ret == -900) {
                QZONE.FP.showLoginBox(null, function () {
                    arg.callee.apply(null, arg);
                });
            } else {
                if (options.showTips) {
                    QZONE.FP.showMsgbox(msg, 5, 2000);
                }
                errCb({"ret": d.ret, "msg": d.msg});
            }
        }
        post.onError = function (d) {
            if (options.showTips) {
                QZONE.FP.showMsgbox("对不起，网络繁忙，请稍后再试！", 5, 2000);
            }
            errCb({"ret": "", "msg": "对不起，网络繁忙，请稍后再试！"});
        }
        post.send();
    };
    var dom;
    dom = ua.firefox ? document : document.body;
    QZFL.event.addEvent(dom, "keydown", function (e) {
        QZONE.event.cancelBubble();
        try {
            e = QZONE.event.getEvent(e);
            if (e.keyCode == QZONE.event.KEYS["LEFT"]) {
                slideView.pre();
            } else if (e.keyCode == QZONE.event.KEYS["RIGHT"]) {
                slideView.next();
            } else if (e.keyCode == QZONE.event.KEYS["ESC"]) {
                slideView.close();
            }
        } catch (e) {
        }
        ;
    })
})();
(function () {
    var tpl = ['<div id="slideViewToolBar" class="pop_iv_option_v3">', '<div class="wrap">', '<div class="pop_iv_bg inner">', '<span class="pop_iv_bg l">&nbsp;</span>', '<ul>', '<li id="comment_li" style="display:none">', '<span class="op op_comment"><a href="##" title="添加评论" class="pop_iv_bg" hidefocus="true"  onclick="slideView.goToComment();">添加评论</a></span>', '<span class="op op_line"><span class="pop_iv_bg">&nbsp;</span></span>', '</li>', '<li id="share_li" style="display:none;">', '<span style="display:none" class="op op_share"><a href="##" title="分享给好友" class="pop_iv_bg" hidefocus="true" onclick="slideView.share();">分享</a></span>', '<span title="分享给好友" style="cursor:pointer;" class="op op_share_disable" onclick="slideView.noShare();"><span class="pop_iv_bg">分享</span></span>', '</li>', '<li id="reprint_li" style="display:none;">', '<span class="op op_line"><span class="pop_iv_bg">&nbsp;</span></span>', '<span style="display:none" class="op op_reprint"><a href="##" title="转到我空间" class="pop_iv_bg" hidefocus="true" onclick="slideView.reprint();">转载</a></span>', '<span title="转到我空间" style="cursor:pointer;" class="op op_reprint_disable" onclick="slideView.noReprint();"><span class="pop_iv_bg">转载</span></span>', '</li>', '<li>', '<span class="op op_rotate_l"><a href="##" title="左旋转" class="pop_iv_bg" onclick="slideView.rotate(\'right\');return false" hidefocus="true">左旋转</a></span>', '</li>', '<li>', '<span class="op op_rotate_r"><a href="##" title="右旋转" class="pop_iv_bg" hidefocus="true" onclick="slideView.rotate(\'left\');return false;">右旋转</a></span>', '</li>', '<li>', '<span class="op op_line"><span class="pop_iv_bg">&nbsp;</span></span>', '<span class="op op_equal"><a href="##" title="原图大小" class="pop_iv_bg" hidefocus="true" onclick="slideView.originSize();return false;">原图大小</a></span>', '<span class="op op_size" style="display:none"><a href="##" title="适合尺寸" class="pop_iv_bg" hidefocus="true" onclick="slideView.perfectSize();return false;">适合尺寸</a></span>', '</li>', '<li>', '<span class="op op_line"><span class="pop_iv_bg">&nbsp;</span></span>', '<span style="display:none" class="op op_prev"><a href="##" title="上一张" class="pop_iv_bg" hidefocus="true" onclick="slideView.pre();">上一张</a></span>', '<span class="op op_prev_disable"><span class="pop_iv_bg">上一张</span></span>', '</li>', '<li>', '<span style="display:none" class="op op_next"><a href="##" title="下一张" class="pop_iv_bg" hidefocus="true" onclick="slideView.next();">下一张</a></span>', '<span class="op op_next_disable"><span class="pop_iv_bg">下一张</span></span>', '</li>', '<li>', '<span class="op op_line"><span class="pop_iv_bg">&nbsp;</span></span>', '<span class="op op_close"><a href="##" title="关闭" class="pop_iv_bg" hidefocus="true" onclick="slideView.close();return false;">关闭</a></span>', '</li>', '</ul>', '<span class="pop_iv_bg r">&nbsp;</span>', '</div>', '</div>', '</div>'].join("");
    asyncInnerHTML(tpl, function (df) {
        document.body.appendChild(df);
        if (ua.ie) {
            document.body.focus();
        } else {
            setTimeout(function () {
                $e(".op_close").elements[0].focus();
                $e(".op_close").elements[0].blur();
            }, 200);
        }
        setTimeout(function () {
            if (slideView.photos == null) {
                setTimeout(arguments.callee, 200);
                return;
            }
            if (slideView.showReprintIcon) {
                if (slideView.showShareIcon) {
                    $e("#share_li").show();
                    $e("#reprint_li").show();
                    $e("#btn_share").show();
                    $e("#btn_reprint").show();
                } else {
                    $e("#reprint_li").show();
                    $e("#btn_reprint").show();
                }
            }
            if (slideView.photos.length > 1) {
                $e(".op_prev").show();
                $e(".op_next").show();
                $e(".op_prev_disable").hide();
                $e(".op_next_disable").hide();
            }
            if (slideView.allowReprint) {
                $e(".op_share").show();
                $e(".op_reprint").show();
                $e(".op_share_disable").hide();
                $e(".op_reprint_disable").hide();
            }
        }, 0);
    })
})();
(function () {
    QZFL.element.extendFn({"slideRight": function () {
        this.each(function () {
            var w = this.scrollWidth;
            QZFL.dom.setStyle(this, "opacity", 1);
            this.style.width = "0px";
            this.style.display = "";
            var tween = new QZFL.Tween(this, "width", null, "0px", w, 1);
            tween.start();
        })
    }})
})();
(function () {
    String.prototype.htmlReplace = function () {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
    }
    String.prototype.unHtmlReplace = function () {
        var s = (this).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&quot;/g, "\"");
        return s.replace(/&#(\d{2});/g, function ($0, $1) {
            return unescape("%" + parseInt($1).toString(16));
        });
    }
    var numPerPage = 3;
    var randomSeed = new Date().getTime();
    var curPhoto = null;
    var commentListTpl = ['<div class="sidebar" style="display:none">', '<div class="cont">', '<p class="desc hide">', '<span id="photoDesc"></span>', '</p>', '<div id="title" class="tit hide">', '<div>', '<h2 id="commentNum">评论</h2>', '<p id="showMoreComment" style="display:none;">', '<a id="moreHref" target="_blank" href="##" title="查看全部">查看全部<span>&gt;&gt;</span></a>', '</p>', '</div>', '</div>', '<div class="comment" id="commentListDiv">', '<p id="loading" class="loading">Loading……</p>', '<ol id="commentList" class="hide"></ol>', '</div>', '</div>', '<div class="shadow_box">', '<iframe class="shadow_box_iframe"></iframe>', '<div class="shadow_box_cont">&nbsp;</div>', '</div>', '</div>'].join("");
    var timer = null;
    var changed = false;
    this.CommentList = {"init": function (dom) {
        asyncInnerHTML(commentListTpl, function (df) {
            var div = $e(dom);
            div.adopt(df);
        });
    }, "display": function (photo) {
        changed = true;
        clearTimeout(timer);
        $e("#showMoreComment").hide();
        $e("#commentNum").setHtml("评论");
        $e("#title").removeClass("hide");
        var name = $e("#photoName");
        name.hide();
        name.setHtml(escHTML(charTrim(restHTML(photo.name), 18, true)));
        name.show();
        var desc = $e("#photoDesc");
        photo.replacedDesc = replaceMentionPattern(photo.desc, slideView._remarkData);
        if (trim(photo.replacedDesc)) {
            desc.setHtml(photo.replacedDesc);
            desc.getParent().removeClass("hide");
        } else {
            desc.getParent().addClass("hide");
        }
        if (photo.forum) {
            $e(".sidebar").fadeIn();
            $e("#commentList").addClass("hide");
            $e("#loading").removeClass("hide");
            $e("#commentNum").setHtml("评论");
            $e("#commentListDiv").show();
            $e("#commentNum").setHtml("评论");
            timer = setTimeout(function () {
                CommentList.getCommentList(photo);
            }, 1000);
        } else {
            $e("#commentListDiv").hide();
            $e("#title").addClass("hide");
            if (trim(photo.replacedDesc)) {
                $e(".sidebar").fadeIn();
            } else {
                $e(".sidebar").hide();
            }
        }
        curPhoto = photo;
    }, "getCommentList": function (photo) {
        changed = false;
        if (!photo) {
            photo = curPhoto;
            randomSeed = new Date().getTime();
        }
        try {
            $("commentList").innerHTML = "";
        } catch (e) {
        }
        var start = 0;
        var data = {"lloc": curPhoto.lloc, "albumid": globalCfg.aid || photo.albumid, "start": start, "num": numPerPage, "t": randomSeed, "uin": globalCfg.uin || photo.uin, "order": 1};
        PhotoLogic.getCommentListUrl({"uin": globalCfg.uin || photo.uin, "refer": "ic", "callBack": function (url) {
            if (changed) {
                return;
            }
            if (data) {
                data.output_type = "json";
                if (!url.match(/refer\=/)) {
                    data.refer = data.refer || "qzone";
                }
                if (!(data.uin || url.match(/uin\=/))) {
                    data.uin = globalCfg.uin
                }
                var p = [];
                for (var i in data) {
                    p.push(i.URIParam() + "=" + (data[i] + "").URIParam());
                }
                if (url.match(/\?/)) {
                    url += "&" + p.join("&");
                } else {
                    url += "?" + p.join("&");
                }
            }
            var charset = "GB2312";
            var cFN = "_Callback";
            snd = new QZFL.JSONGetter(url, void(0), null, charset);
            snd.onSuccess = function (d) {
                if (changed) {
                    return;
                }
                if (d.ret == 0) {
                    if (d.total == 0) {
                        if (!trim(curPhoto.replacedDesc)) {
                            $e(".sidebar").hide();
                        } else {
                            $e("#commentListDiv").hide();
                            $e("#title").addClass("hide");
                        }
                    } else {
                        CommentList.renderList(d);
                    }
                } else {
                    $e("#commentListDiv").addClass("hide");
                    $("commentNum").innerHTML = "评论获取失败！";
                }
            }
            snd.onError = function (d) {
                if (changed) {
                    return;
                }
                $e("#commentListDiv").addClass("hide");
                $("commentNum").innerHTML = "评论获取失败！";
            }
            setTimeout(function () {
                snd.send(cFN);
            }, 0);
        }})
    }, "renderList": function (ret) {
        $e(".sidebar").fadeIn();
        var list = ret.diary;
        var str = [];
        for (var i = Math.min(3, ret.total) - 1; i >= 0; i--) {
            var data = list[i];
            str.push('<li class="' + (i == 0 ? "last" : "") + '">' + '<div>' + '<p><a target="_blank" href="' + data.url + '" title="点击查看评论人信息">' + ((slideView._remarkData && slideView._remarkData[data.writeruin]) ? slideView._remarkData[data.writeruin].htmlReplace() : data.writer) + '</a>：' + (replaceMentionPattern(data.content, slideView._remarkData)).replace(/\[em\]e(\d{1,3})\[\/em\]/g, '<img src="/qzone/em/e$1.gif">') + '</p>' + '<p class="time">' + data.time + '</p>' + '</div>', '</li>')
        }
        str = str.join("");
        asyncInnerHTML(str, function (df) {
            $e("#commentNum").setHtml("评论(" + ret.total + ")");
            if (ret.total > numPerPage) {
                $("moreHref").href = "http://user.qzone.qq.com/" + (globalCfg.uin || curPhoto.uin) + "/photo/" + (globalCfg.aid || curPhoto.albumid) + "/" + curPhoto.lloc + "/";
                $e("#showMoreComment").show();
            } else {
                $e("#showMoreComment").hide();
            }
            $e("#commentListDiv").show();
            $e("#commentListDiv").getParent().removeClass("hide");
            $e("#title").removeClass("hide");
            $("commentList").innerHTML = "";
            $("commentList").appendChild(df);
            $e("#commentList").removeClass("hide");
            $e("#loading").addClass("hide");
            if (ua.ie && ua.ie < 8) {
                $e("#commentList").find("li").onHover(function () {
                    $e(this).addClass("xxie6");
                }, function () {
                    $e(this).removeClass("xxie6")
                })
            }
        })
    }, "hide": function () {
        $e(".sidebar").fadeOut();
    }, "showAllComment": function () {
    }}
})();
(function () {
    var validLength = 150;
    var tpl = ['<div class="pop_iv_post">', '<p id="errorTips" class="pop_iv_bg panel_notice hide"><span class="pop_iv_bg arrow">&nbsp;</span></p>', '<div class="panel_default">', '<p class="pop_iv_bg">', '<input class="pop_iv_bg" type="text" onclick="PostComment.write();" id="defaultInput" name="PostInput" value="随便说两句…" style="width:388px;" />', '<span class="pop_iv_bg arrow">&nbsp;</span>', '</p>', '</div>', '<div class="panel_int hide">', '<div class="int">', '<p class="pop_iv_bg">', '<input class="pop_iv_bg" type="text" onkeydown = "PostComment.checkKeyDown(event);" onkeyup = "PostComment.showContentLength(this);" id="textInput" name="textInput" style="width:200px;" />', '<span id="lengthTips" class="count">0/' + validLength + '</span>', '<span class="pop_iv_bg arrow">&nbsp;</span>', '</p>', '</div>', '<p class="btn">', '<button onclick="PostComment.submit();" type="button" class="btn_1" id="PostDone">确定</button>', '<button onclick="PostComment.cancel();" type="button" class="btn_2" id="PostCancel">取消</button>', '</p>', '</div>', '<div id="succTips" class="panel_done hide">', '<div class="comment" id="commentTips">', '<p>添加评论成功!<span id="authorName" class="author">by 艾文王</span><span id="postTime" class="time"></span></p>', '</div>', '<p class="btn"><button onclick="PostComment.writeOneMore();" type="button" class="btn_1" id="PostMore">再写一句</button></p>', '</div>', '</div>'].join("");

    function lengthError(l) {
        var errorTips = $("errorTips");
        errorTips.innerHTML = '已超出' + (l - validLength) + '个字<span class="pop_iv_bg arrow">&nbsp;</span>';
        $e(errorTips).removeClass("hide");
        $e("#arrow_span").hide();
    }

    function postSucc(ret) {
        ret.time = "刚刚";
        $("commentTips").innerHTML = '<p>添加评论成功!<span id="authorName" class="author">by ' + escHTML(charTrim(ret.nick, 16, true)) + '</span><span id="postTime" class="time">' + ret.time + '</span></p>';
        $e("#succTips").removeClass("hide");
        $e(".panel_int").addClass("hide");
        $("textInput").value = "";
        slideView.photos[slideView.index - 1].forum = 1;
        if (slideView.commentList) {
            CommentList.getCommentList();
        }
    }

    function postError(ret) {
        var d = ret;
        if (d.ret == -906 || d.ret == -907) {
            setTimeout(function () {
                QZONE.FP._t.popupCallback = function (verifycode) {
                    if (!!verifycode) {
                        PostComment.submit(verifycode);
                    }
                };
            }, 200);
            setTimeout(function () {
                QZONE.FP.popupDialog('请输入验证码', '<iframe frameborder="no" id="verifycodeFrame" style="width:100%;height:165px" src="/qzone/verifycode.html?imgcode=15000501&type=' + (d.ret == -906 ? 1 : 0) + '"></iframe>', 340, 190);
            }, 500);
        } else if (d.ret == 1) {
            $("commentTips").innerHTML = '<p>' + ret.msg.replace(/错误码:(.)*/, "") + '</p>';
            $e("#succTips").removeClass("hide");
            $e(".panel_int").addClass("hide");
            $("textInput").value = "";
            slideView.photos[slideView.index - 1].forum = 1;
        } else {
            $e("#errorTips").removeClass("hide");
            $("errorTips").innerHTML = ret.msg.replace(/错误码:(.)*/, "");
            $e("#arrow_span").hide();
        }
    }

    this.PostComment = {"init": function () {
        asyncInnerHTML('<span id="arrow_span" class="arrow">&nbsp;</span>', function (df) {
            $e("#" + slideView.innerDivId).find("div").elements[0].appendChild(df);
        })
        asyncInnerHTML(tpl, function (df) {
            $(slideView.innerDivId).insertBefore(df, $(slideView.innerDivId).lastChild);
            setTimeout(function () {
                try {
                    var fxInfo = slideView.getFxInfo();
                    $("defaultInput").style.width = (fxInfo.preInnerWidth - 2 - 2 - 8) + "px";
                    $("textInput").style.width = (fxInfo.preInnerWidth - 2 - 8 - 50 - 140) + "px";
                } catch (e) {
                    setTimeout(arguments.callee, 500);
                }
            }, 500);
        })
    }, "write": function () {
        QZFL.event.cancelBubble();
        QZFL.event.preventDefault();
        $("textInput").value = "";
        $("lengthTips").innerHTML = "0/" + validLength;
        $e(".panel_default").addClass("hide");
        $e(".panel_int").removeClass("hide");
        $("textInput").focus();
    }, "submit": function (v) {
        v = v || null;
        var content = trim($("textInput").value);
        var l = content.length;
        if (l > validLength) {
            lengthError(l);
            var img = $("errorTips").style.backgroundImage;
            $("errorTips").style.backgroundImage = "none";
            var tween = new QZFL.Tween($("errorTips"), "backgroundColor", null, "#FF9999", "#FFFFE2", 1);
            tween.onMotionStop = function () {
                $("errorTips").style.backgroundImage = img;
            }
            tween.start();
            return false;
        }
        if (l == 0) {
            var errorTips = $("errorTips");
            errorTips.innerHTML = '请先输入评论内容<span class="pop_iv_bg arrow">&nbsp;</span>';
            $e(errorTips).removeClass("hide");
            $e("#arrow_span").hide();
            setTimeout(function () {
                $e(errorTips).addClass("hide");
                $e("#arrow_span").show();
            }, 3000);
            return false;
        }
        $e("#errorTips").addClass("hide");
        $e("#arrow_span").show();
        slideView.postComment(content, v, {"onSuccess": postSucc, "onError": postError});
    }, "cancel": function () {
        QZFL.event.cancelBubble();
        QZFL.event.preventDefault();
        try {
            $("textInput").value = "";
        } catch (e) {
        }
        ;
        $e("#errorTips").addClass("hide");
        $e("#arrow_span").show();
        $e(".panel_int").addClass("hide");
        $e(".panel_default").removeClass("hide");
        $e("#succTips").addClass("hide");
    }, "showContentLength": function (obj) {
        var length = trim(obj.value).length;
        length = Math.min(length, 999);
        $("lengthTips").innerHTML = length + "/" + validLength;
        if (length > validLength) {
            lengthError(length);
        } else {
            $e("#errorTips").addClass("hide");
            $e("#arrow_span").show();
        }
    }, "writeOneMore": function () {
        $e("#succTips").addClass("hide");
        PostComment.write();
    }, "getComment": function (index) {
    }, "checkKeyDown": function (e) {
        QZFL.event.cancelBubble();
        e = QZFL.event.getEvent(e);
        if (e.keyCode == QZFL.event.KEYS["RETURN"]) {
            QZFL.event.preventDefault();
            PostComment.submit();
        } else if (e.keyCode == QZFL.event.KEYS["ESC"]) {
            PostComment.cancel();
        }
    }, "hide": function () {
        $e("#errorTips").getParent().hide();
    }};
})();
var photoDoctorOk = true;
/*  |xGv00|591ab14e4a3ab5dc1e2b1db7b519c980 */