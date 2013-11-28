define("#animate", [], function (require, exports, module) {
    exports.switchNodes = function (topNodes, navNodes, navNodeClass, eventType, autoInterval) {
        topNodesAr = [], navNodesAr = [], navNodeClass = navNodeClass ? navNodeClass : "on", eventType = eventType ? eventType : "mouseover";
        var topLen = topNodes.length, navLen = navNodes.length;
        if (topLen != navLen) {
            alert("节点数量不一致");
            return
        }
        var len = topLen;
        curIndex = 0;
        for (var i = 0; i < len; i++)topNodes[i] = typeof topNodes[i] == "string" ? $(topNodes[i]) : topNodes[i], topNodesAr.push(topNodes[i]), navNodes[i] = typeof navNodes[i] == "string" ? $(navNodes[i]) : navNodes[i], navNodesAr.push(navNodes[i]);
        var autoSet = function (topNodesAr, navNodesAr, curIndex) {
            for (var i = 0; i < len; i++)topNodesAr[i].style.display = "none", $(navNodesAr[i]).removeClass(navNodeClass);
            $(navNodesAr[curIndex - 1]).addClass(navNodeClass), topNodesAr[curIndex - 1].style.display = ""
        }, setSwitchNode = function (topNodesAr, navNodesAr, topNode, navNode) {
            $(navNode).bind(eventType, function () {
                for (var i = 0; i < len; i++)topNodesAr[i].style.display = "none", $(navNodesAr[i]).removeClass(navNodeClass);
                $(navNode).addClass(navNodeClass), topNode.style.display = "block"
            })
        }, autoSetNav = function (topNodesAr, navNodesAr, curIndex, autoInterval) {
            window.setInterval(function () {
                curIndex >= len && (curIndex = 0), curIndex++, autoSet(topNodesAr, navNodesAr, curIndex)
            }, autoInterval)
        };
        autoInterval && autoSetNav(topNodesAr, navNodesAr, curIndex, autoInterval);
        for (var i = 0; i < len; i++)setSwitchNode(topNodesAr, navNodesAr, topNodesAr[i], navNodesAr[i])
    }, _Slide = function (conf) {
        conf = conf || {}, this.navLevel = conf.navLevel || 1, this.eventType = conf.eventType || "mouseover", this.autoPlayInterval = conf.autoPlayInterval || 5e3, this._play = !0, this._timer = null, this._fadeTimer = null, this._container = document.getElementById(conf.container), this._panelWrapper = document.getElementById(conf.panelWrapper) || $(this._container).children()[0], this._sliders = $(this._panelWrapper).children(), this._navWrapper = document.getElementById(conf.navWrapper) || $(this._panelWrapper).next()[0] || null, this._navs = this._navWrapper && $(this._navWrapper).children() || null, this._effect = conf.effect || "scrollx", this._panelSize = (this._effect.indexOf("scrolly") == -1 ? conf.width : conf.height) || (this._effect.indexOf("scrolly") == -1 ? $($(this._panelWrapper).children()[0]).width() : $($(this._panelWrapper).children()[0]).height()), this._count = conf.count || $(this._panelWrapper).children().length, this._navClassOn = conf.navClassOn || "on", this._target = 0, this._changeProperty = this._effect.indexOf("scrolly") == -1 ? "left" : "top", this.curIndex = 0, this.step = this._effect.indexOf("scroll") == -1 ? 1 : conf.Step || 5, this.slideTime = conf.slideTime || 10, this.init(), this.run(!0)
    }, _Slide.prototype = {init: function () {
        $(this._container).css("overflow", "hidden"), $(this._container).css("position", "relative"), $(this._panelWrapper).css("position", "relative"), this._effect.indexOf("scrolly") == -1 ? ($(this._panelWrapper).css("width", this._count * (this._panelSize + 200) + "px"), $(this._sliders).each(function (i, dom) {
            dom.style.styleFloat = dom.style.cssFloat = "left"
        })) : $(this._panelWrapper).css("height", this._count * (this._panelSize + 200) + "px");
        if (this._navs) {
            var _this = this;
            _this.eventType == "click" ? $(this._navs).each(function (i, el) {
                el.onclick = function (_this) {
                    return function () {
                        $(el).addClass(_this._navClassOn), _this._play = !1, _this.curIndex = i, _this._play = !0, _this.run()
                    }
                }(_this)
            }) : $(this._navs).each(function (i, el) {
                el.onmouseover = function (_this) {
                    return function () {
                        if (_this.navLevel == 1)$(el).addClass(_this._navClassOn); else if (_this.navLevel == 2) {
                            var nav = $(el).children()[0];
                            $(nav).addClass(_this._navClassOn)
                        }
                        _this._play = !1, _this.curIndex = i, _this.run()
                    }
                }(_this), el.onmouseout = function (_this) {
                    return function () {
                        if (_this.navLevel == 1)$(el).removeClass(_this._navClassOn); else if (_this.navLevel == 2) {
                            var nav = $(el).children()[0];
                            $(nav).removeClass(_this._navClassOn)
                        }
                        _this._play = !0, _this.run(!1, !0)
                    }
                }(_this)
            })
        }
        this._sliders && $(this._sliders).each(function (i, e2) {
            e2.onmouseover = function (_this) {
                return function () {
                    _this._play = !1, _this.run()
                }
            }(_this), e2.onmouseout = function (_this) {
                return function () {
                    _this._play = !0, _this.run(!1, !0)
                }
            }(_this)
        })
    }, run: function (isInit, noFade) {
        this.curIndex < 0 ? this.curIndex = this._count - 1 : this.curIndex >= this._count && (this.curIndex = 0), this._target = -1 * this._panelSize * this.curIndex;
        var curImg = $(this._panelWrapper).find('img[init_src]').get(this.curIndex);
        if (curImg) {
            var src = curImg.getAttribute('init_src');
            curImg.setAttribute('src', src);
        }
        var _this = this;
        this._navs && $(this._navs).each(function (i, el) {
            if (_this.curIndex == i) {
                if (_this.navLevel == 1)$(el).addClass(_this._navClassOn); else if (_this.navLevel == 2) {
                    var nav = $(el).children()[0];
                    $(nav).addClass(_this._navClassOn)
                }
            } else if (_this.navLevel == 1)$(el).removeClass(_this._navClassOn); else if (_this.navLevel == 2) {
                var nav = $(el).children()[0];
                $(nav).removeClass(_this._navClassOn)
            }
        }), this.scroll(), this._effect.indexOf("fade") >= 0 && !noFade && ($(this._panelWrapper).css("opacity", isInit ? .5 : .1), this.fade())
    }, scroll: function () {
        clearTimeout(this._timer);
        var _this = this, left = this._changeProperty, _cur_property = parseInt(this._panelWrapper.style[this._changeProperty]) || 0, _distance = (this._target - _cur_property) / this.step;
        Math.abs(_distance) < 1 && _distance != 0 && (_distance = _distance > 0 ? 1 : -1), _distance != 0 ? (this._panelWrapper.style[this._changeProperty] = _cur_property + _distance + "px", this._timer = setTimeout(function () {
            _this.scroll()
        }, this.slideTime)) : (this._panelWrapper.style[this._changeProperty] = this._target + "px", this._play && (this._timer = setTimeout(function () {
            _this.curIndex++, _this.run()
        }, this.autoPlayInterval)))
    }, click_next: function () {
        var _this = this;
        _this.curIndex++, _this.run()
    }, click_pre: function () {
        var _this = this;
        _this.curIndex--, _this.run()
    }, fade: function () {
        var _opacity = $(this._panelWrapper).css("opacity"), _this = this;
        _opacity < 1 && ($(this._panelWrapper).css("opacity", parseFloat(_opacity) + .02), setTimeout(function () {
            _this.fade()
        }, 1))
    }}, exports.SlideView = function (el, conf) {
        return conf = conf || {}, conf.container = el, new _Slide(conf)
    }
})
/*  |xGv00|d0092b8afcb0f52d28b769a23769ef16 */