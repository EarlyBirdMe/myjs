QS.ui = {};
QS.ui.getItemIcon = function (iItemType, iMallType) {
    var iCharactor = iItemType.toString();
    var code = "";
    if (iMallType == iItemType)return""; else switch (iCharactor) {
        case "1":
            code = '<sup class="new" title="\u65b0\u4e0a\u67b6QQ\u79c0">\u65b0</sup>';
            break;
        case "2":
            code = '<sup class="hot" title="\u70ed\u95e8QQ\u79c0">\u70ed</sup>';
            break;
        case "10":
            code = '<sup class="se" title="\u7cbe\u54c1QQ\u79c0">\u7cbe</sup>';
            break;
        case "4":
            code = '<sup class="lover" title="\u60c5\u4fa3QQ\u79c0">\u60c5\u4fa3</sup>';
            break;
        case "11":
            code = '<sup class="prize" title="\u5956\u54c1">\u5956</sup>';
            break;
        case "12":
            code = '<sup class="gift" title="\u8d60\u54c1">\u8d60</sup>';
            break;
        case "21":
            code = '<i class="g-mark g-mark-free"></i>';
            break;
        case "20":
            code = '<sup class="s_3" title="3\u6298">3\u6298</sup>';
            break;
        case "5":
            code = '<sup class="s_5" title="5\u6298">5\u6298</sup>';
            break;
        case "6":
            code = '<sup class="s_6" title="6\u6298">6\u6298</sup>';
            break;
        case "8":
            code = '<sup class="s_8" title="8\u6298">8\u6298</sup>';
            break;
        case "a":
            code = '<sup class="out_of_print">\u7edd</sup>';
            break;
        default:
            code = "";
            break
    }
    return code
};
QS.ui.slide = function () {
    var options, wrap, active, eventType, className, next, list, list_len, list_elems, pages, showPage, showSlip, timer, timer1, interval, random_index, stats_prev, stats_next, statistics;

    function init(id, options) {
        if (QS.lang.isString(id) && !QS.$e("#" + id))return;
        options = options || {};
        random_index = (new Date).getTime();
        slide_slip_id = "slide_slip_" + random_index;
        wrap = QS.$e("#" + id);
        interval = options.interval || 5;
        interval = interval * 1E3;
        eventType = options.eventType || "click";
        className = options.className || "cur";
        showPage =
            options.showPage || true;
        showSlip = options.showSlip || true;
        active = options.active || 1;
        statistics = options.statistics || {};
        stats_prev = statistics.prev;
        stats_next = statistics.next;
        list = wrap.find("ul:first").find("li");
        list_elems = list.elements, list_len = list_elems.length;
        if (list_len == 0)return;
        setIndex();
        set();
        if (showPage)showPlayPage();
        if (showSlip)showFlipOver();
        function _cb() {
            var flag = arguments[0];
            timer = setTimeout(function () {
                if (flag) {
                    active += 1;
                    setIndex()
                }
                play()
            }, interval)
        }

        _cb();
        wrap.bind("mouseover", function () {
            if (showSlip)QS.$(slide_slip_id).style.display =
                "";
            _cleartimeout()
        });
        wrap.bind("mouseout", function () {
            if (showSlip)QS.$(slide_slip_id).style.display = "none";
            _cb(true)
        })
    }

    function setIndex() {
        if (active < 1)active = list_len;
        if (active > list_len)active = 1;
        next = active + 1;
        if (next > list_len)next = 1;
        if (next <= 0)next = list_len
    }

    function set() {
        reset();
        var e = list.elements[active - 1];
        e.style.zIndex = 1;
        e.style.display = "";
        QS.dom.setStyle(e, {opacity: 100})
    }

    function reset() {
        list.each(function () {
            this.style.display = "none";
            this.style.zIndex = 0;
            QS.dom.setStyle(this, {opacity: 0})
        });
        if (pages &&
            showPage)pages.each(function () {
            this.className = ""
        })
    }

    function _cleartimeout() {
        if (timer)clearTimeout(timer)
    }

    function play() {
        doplay();
        timer = setTimeout(function () {
            active += 1;
            setIndex();
            play()
        }, interval)
    }

    function doplay() {
        var e_active = list.elements[active - 1], e_next = list.elements[next - 1];
        _cleartimeout();
        reset();
        QS.effect.run(e_next, {opacity: 1}, {duration: 600, start: function () {
            e_next.style.zIndex = 1;
            e_next.style.display = ""
        }, complete: function () {
        }});
        if (showPage)pages.elements[next - 1].className = className
    }

    function setOpacity(elem, opacity) {
        if (QS.userAgent.isIE())elem.style.filter = "alpha(opacity=" + opacity + ")"; else elem.style.opacity = opacity * 0.01 + ""
    }

    function skip(index) {
        setIndex(index);
        doplay()
    }

    function prevPlay() {
        active = active - 1;
        skip();
        stats_prev && QS.stats.sendClick(stats_prev)
    }

    function nextPlay() {
        active = active + 1;
        skip();
        stats_next && QS.stats.sendClick(stats_next)
    }

    function showFlipOver() {
        var div = document.createElement("div"), html = '<a href="javascript:void(0);" class="btn_prev" style="z-index:100" title="\u4e0a\u4e00\u4e2a">\u4e0a\u4e00\u4e2a</a> \t\t\t\t\t\t<a href="javascript:void(0);" class="btn_next" style="z-index:100" title="\u4e0b\u4e00\u4e2a">\u4e0b\u4e00\u4e2a</a>',
            btn, _prev, _next;
        div.id = slide_slip_id;
        div.innerHTML = html;
        btn = div.getElementsByTagName("a");
        _prev = btn[0];
        _next = btn[1];
        _prev.onclick = function () {
            prevPlay();
            return false
        };
        _next.onclick = function () {
            nextPlay();
            return false
        };
        div.style.display = "none";
        wrap.elements[0].appendChild(div)
    }

    function showPlayPage() {
        var html = [], div = document.createElement("div"), page_elems;
        div.className = "nav";
        div.style.zIndex = 100;
        html.push('<ul class="small">');
        for (var i = 0; i < list_len; i++)html.push('<li data="' + (i + 1) + '"><a href="javascript:void(0);">' +
            (i + 1) + "</a></li>");
        html.push("</ul>");
        div.innerHTML = html.join("");
        pages = QS.$e(div).find("li");
        page_elems = pages.elements;
        page_elems[active - 1].className = className;
        pages.bind(eventType, function () {
            var index = this.getAttribute("data");
            timer1 = setTimeout(function () {
                active = index - 1;
                skip()
            }, 200)
        });
        if (eventType == "mouseover")pages.bind("mouseout", function () {
            clearTimeout(timer1)
        });
        wrap.elements[0].appendChild(div)
    }

    return{init: function (id, options) {
        init(id, options)
    }, skip: function (index) {
        skip(index)
    }, prev: function () {
        prev()
    },
        next: function () {
            next()
        }}
}();
QS.ui.lazyLoadImage = function (options) {
    options = options || {};
    var preloadHeight = options.preloadHeight || 0, className = options.className || "", placeHolder = placeHolder || "http://imgcache.qq.com/qqshow/ac/v4/global/placeholder.gif", handlerWin = options.handlerWin || window, imgWin = options.imgWin || window, imgs = imgWin.document.getElementsByTagName("img"), targets = [], target, filter = [], len = imgs.length, i, viewOffset = getLoadOffset(), srcAttr = options.srcAttr || "_src", img;
    if (className)for (i = 0; i < len; i++) {
        if (imgs[i].className == className)targets.push(imgs[i])
    } else targets =
        imgs;
    for (i = 0, len = targets.length; i < len; ++i) {
        img = targets[i];
        if (img.getAttribute(srcAttr))filter.push(img)
    }
    targets = filter;
    function getLoadOffset() {
        return handlerWin.QS.dom.getScrollTop() + handlerWin.QS.dom.getClientHeight() + preloadHeight
    }

    function removeHandler() {
        QS.event.removeEvent(handlerWin, "scroll", loadNeeded)
    }

    var loadNeeded = function () {
        var viewOffset = getLoadOffset(), imgSrc, finished = true, i = 0, len = targets.length;
        for (; i < len; ++i) {
            target = targets[i];
            if (!target)continue;
            imgSrc = target.getAttribute(srcAttr);
            imgSrc && (finished = false);
            if (imgWin.QS.dom.getPosition(target).top < viewOffset && imgSrc) {
                target.src = imgSrc;
                target.removeAttribute(srcAttr);
                QS.lang.isFunction(options.onlazyload) && options.onlazyload(target)
            }
        }
        finished && removeHandler()
    };
    loadNeeded();
    QS.event.addEvent(handlerWin, "scroll", loadNeeded);
    QS.event.addEvent(window, "unload", removeHandler)
};
QS.ui.select = function () {
    function Select(settings) {
        var r = (new Date).getTime();
        this.id = settings.id || "select";
        this.className = settings.className || "g-selector";
        this.classNameHover = settings.classNameHover || "g-selector g-selector-hover";
        this.options = settings.options || [
            ["\u8bf7\u9009\u62e9", 0]
        ];
        this.isArrow = settings.isArrow || true;
        this.arrowId = settings.arrowId || "arrow_" + r;
        this.callBack = settings.callBack || function () {
        };
        this.index = settings.index > this.options.length - 1 ? 0 : settings.index || 0;
        this.defaultValue = settings.defaultValue ||
            undefined;
        this.eventType = settings.eventType || "mouseover"
    }

    Select.prototype.draw = function () {
        var len = this.options.length, html = "", options = this.options, defaultValue = this.defaultValue, findex, index, tpl = '<li event-type="sel" value="{value}">{text}</li>', list = [], e = QS.$(this.id);
        if (len == 0)return;
        index = this.index;
        html += '<div class="current">' + options[index][0] + "</div>";
        list = options.slice(0, index).concat(options.slice(index + 1, len));
        if (list.length > 0) {
            html += "<ul>";
            for (var i = 0; i < list.length; i++)html += QS.string.format(tpl,
                {text: list[i][0], value: list[i][1]});
            html += "</ul>"
        }
        html += '<i id="' + this.arrowId + '" class="g-arrow" style="display:none;"></i>';
        e.className = this.className;
        e.innerHTML = html;
        if (this.isArrow)QS.$(this.arrowId).style.display = ""
    };
    Select.prototype.bindHandler = function () {
        var that = this, options = that.options, eventType = this.eventType, id = that.id, e = QS.$(id);
        QS.$e("#" + id).bind("click", function (event) {
            var evt = QS.event.getEvent(event), target = QS.event.getTarget(event), eventType = target.getAttribute("event-type"), value,
                text, callBack = that.callBack;
            if (eventType == "sel") {
                value = target.getAttribute("value");
                text = target.innerHTML;
                that.index = that.findIndexFromValue(value);
                that.draw();
                callBack && callBack(value, text)
            }
            QS.event.cancelBubble(evt)
        });
        QS.event.addEvent(e, eventType, function (event) {
            var evt = QS.event.getEvent(event);
            if (e.className == that.classNameHover)e.className = that.className; else e.className = that.classNameHover;
            QS.event.cancelBubble(evt)
        });
        if (eventType == "mouseover")QS.event.addEvent(e, "mouseout", function () {
            e.className =
                that.className
        }); else QS.event.addEvent(document.body, "click", function () {
            e.className = that.className
        })
    };
    Select.prototype.findIndexFromValue = function (value) {
        var index, options = this.options;
        index = QS.array.find(options, function (v) {
            return v[1] == value
        });
        return index
    };
    Select.prototype.init = function () {
        var findex = this.findIndexFromValue(this.defaultValue);
        this.index = findex == 0 || findex ? findex : this.index;
        this.draw();
        this.bindHandler()
    };
    return function (settings) {
        (new Select(settings)).init()
    }
}();
QS.ui.getVipItemIcon = function (itemType) {
    var code = "";
    switch (itemType) {
        case "2":
            code = '<sup class="sale">\u7279</sup>';
            break;
        case "3":
            code = '<i class="g-mark g-mark-vip2"></i>';
            break;
        case "4":
            code = '<i class="g-mark g-mark-vip6"></i>';
            break;
        case "9":
            code = '<i class="g-mark g-mark-vip3"></i>';
            break;
        case "10":
            code = '<i class="g-mark g-mark-vip4"></i>';
            break;
        case "11":
            code = '<i class="g-mark g-mark-vip5"></i>';
            break;
        case "12":
            code = '<i class="g-mark g-mark-vip7"></i>';
            break;
        case "14":
            code = '<sup class="nba">NBA</sup>';
            break;
        case "15":
            code = '<sup class="ico_couple">\u60c5\u4fa3\u7ea2\u94bb</sup>';
            break
    }
    return code
};
QS.ui.scrollbar = function () {
    function noop() {
    }

    function isString(str) {
        return Object.prototype.toString.call(str) == "[object String]"
    }

    function getCurrentStyle(elem, name) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            name = name.replace(/[A-Z]/g, function (match) {
                return"-" + match.toLowerCase()
            });
            return document.defaultView.getComputedStyle(elem, null).getPropertyValue(name)
        } else if (elem.currentStyle) {
            name = name.replace(/-[a-z]/g, function (match) {
                return match.charAt(1).toUpperCase()
            });
            return elem.currentStyle[name]
        }
    }

    function Scroller(contentElement, options) {
        this.elements = {};
        this.elements.contentElement = isString(contentElement) ? QS.$(contentElement) : contentElement;
        this.options = Scroller.normalizeOptions(options);
        this.statusFlag = {isDragging: false, isInFrame: false, isInRange: false};
        this.hack = this.getHack()
    }

    Scroller.normalizeOptions = function () {
        var defaultConf = {mouseWheel: true, mouseWheelPixels: "auto", keyboardControl: true, keydownScrollPixels: "auto", height: "auto", autoHideScrollbar: false, updateOnContentResize: false, scrollButtons: {},
            callbacks: {onScrollStart: noop, onScroll: noop, onScrollEnd: noop, onTotalScroll: noop, onTotalScrollBack: noop}}, normalize = {mouseWheel: bool, mouseWheelPixels: num, keyboardControl: bool, keydownScrollPixels: num, height: function (h) {
            return parseFloat(h) + "px"
        }, autoHideScrollbar: bool, updateOnContentResize: bool};

        function bool(bool) {
            return Boolean(bool)
        }

        function num(num) {
            if (num == "auto")return num;
            return parseFloat(num)
        }

        return function (options) {
            options = options || {};
            for (var name in options)if (options.hasOwnProperty(name))options[name] =
                normalize[name](options[name]);
            return QS.object.extend(defaultConf, options)
        }
    }();
    Scroller.prototype = {constructor: Scroller, getHack: function () {
        var contentElement = this.elements.contentElement, display = getCurrentStyle(contentElement, "display"), oldStyle;
        if (display !== "none")return{setCss: noop, restoreCss: noop};
        return{setCss: function () {
            var s = contentElement.style;
            oldStyle = {display: s.display, visibility: s.visibility, position: s.position};
            s.visibility = "hidden";
            s.display = "block";
            s.position = "absolute"
        }, restoreCss: function () {
            var s =
                contentElement.style;
            s.visibility = oldStyle.visibility;
            s.display = oldStyle.display;
            s.position = oldStyle.position
        }}
    }, needScroller: function () {
        var height = parseFloat(this.options.height), element = this.elements.contentElement, scrollHeight = element.scrollHeight, clientHeight = element.clientHeight, elementHeight = scrollHeight - parseFloat(getCurrentStyle(element, "paddingTop")) - parseFloat(getCurrentStyle(element, "paddingBottom"));
        if (scrollHeight <= clientHeight && !height)return false;
        if (elementHeight <= parseFloat(height))return false;
        return true
    }, generateScrollerElements: function () {
        function getHtml() {
            return'<div class="scroller_content"></div>' + '<div class="scroller_bar">' + '<div class="bar" data-draggable="true">' + '<span class="top"></span>' + '<span class="bottom"></span>' + "</div>" + "</div>"
        }

        var contentElement = this.elements.contentElement, height = this.options.height, scrollArea = document.createElement("div"), contentParent, scrollbarParent, parentNode = contentElement.parentNode, fragment = document.createDocumentFragment();
        parentNode.style.display =
            "none";
        if (height != "auto")contentElement.style.height = height;
        scrollArea.className = "g_md_scroller";
        scrollArea.style.cssText = "height:100%;overflow:hidden;background-color:transparent";
        scrollArea.innerHTML = getHtml();
        contentParent = scrollArea.children[0];
        contentParent.style.height = "auto";
        fragment.appendChild(contentElement);
        while (contentElement.childNodes.length)contentParent.appendChild(contentElement.childNodes[0]);
        contentElement.appendChild(scrollArea);
        parentNode.appendChild(fragment);
        parentNode.style.display =
            "";
        scrollbarParent = scrollArea.children[1];
        scrollbarParent.style.height = scrollArea.offsetHeight + "px";
        scrollbarParent.style.cursor = "pointer";
        this.setAttr("contentScrollHeight", contentParent.scrollHeight);
        this.setAttr("contentOffsetHeight", scrollArea.offsetHeight);
        return{contentParent: contentParent, scrollbar: scrollbarParent.children[0], scrollbarParent: scrollbarParent, scrollArea: scrollArea}
    }, setAttr: function (name, val) {
        this[name] = val
    }, initDragDrop: function () {
        var self = this, dragging, diffY;
        DragDrop.on("dragstart",
            function (event) {
                self.statusFlag.isInFrame = true;
                self.statusFlag.isDragging = true;
                diffY = event.clientY - event.target.offsetTop
            });
        DragDrop.on("dragging", function (event) {
            if (!self.statusFlag.isInFrame)return;
            self.scroll(event.clientY - diffY)
        });
        DragDrop.on("dragend", function (event) {
            setTimeout(function () {
                self.statusFlag.isDragging = false
            }, 10)
        });
        DragDrop.enable()
    }, initClickScrollbar: function () {
        var self = this;
        this.elements.scrollbarParent.onclick = function (event) {
            if (self.statusFlag.isDragging)return;
            event = QS.event.getEvent(event);
            var target = QS.event.getTarget(event), distance;
            if (this.contains(target) && target !== this)return;
            distance = event.offsetY - parseFloat(self.elements.scrollbar.style.height) / 2;
            self.scroll(distance)
        }
    }, isInScrollArea: function (event) {
        var rect = QS.dom.getPosition(this.elements.scrollArea);
        var pageX = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        var pageY = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        if (pageX < rect.left || pageX > rect.right || pageY < rect.top ||
            pageY > rect.bottom)return false;
        return true
    }, initScrollEvent: function () {
        if (!this.options.mouseWheel)return;
        var self = this;

        function fireScroll(event) {
            event = QS.event.getEvent(event);
            if (!self.isInScrollArea(event))return;
            self.elements.scrollbarParent.style.display = "";
            self.scroll(getDistance());
            QS.event.preventDefault(event);
            function getDistance() {
                var f = self.getScrollbarOffset();
                s = self.getScrollDistance(self.options.mouseWheelPixels);
                if (event.wheelDelta) {
                    if (event.wheelDelta < 0)return f + s;
                    return f - s
                }
                if (event.detail) {
                    if (event.detail >
                        0)return f + s;
                    return f - s
                }
            }
        }

        if ("onmousewheel"in document)QS.event.addEvent(document, "mousewheel", fireScroll); else if (/Firefox/.test(navigator.userAgent))QS.event.addEvent(document, "DOMMouseScroll", fireScroll)
    }, initKeydownEvent: function () {
        var self = this;
        if (!this.options.keyboardControl)return;
        QS.event.addEvent(document, "keydown", function (event) {
            if (!self.statusFlag.isInRange)return;
            event = QS.event.getEvent(event);
            var upKey = 38, downKey = 40;
            if (event.keyCode != upKey && event.keyCode != downKey)return;
            self.scroll(getDistance());
            QS.event.preventDefault(event);
            function getDistance() {
                var f = self.getScrollbarOffset();
                s = self.getScrollDistance(self.options.keydownScrollPixels);
                if (event.keyCode == downKey)return f + s;
                return f - s
            }
        })
    }, initMousemove: function () {
        var self = this;
        QS.event.addEvent(document, "mousemove", function (event) {
            if (self.statusFlag.isDragging)return;
            event = QS.event.getEvent(event);
            if (self.isInScrollArea(event))self.statusFlag.isInRange = true; else self.statusFlag.isInRange = false;
            self.autoHideScrollbar()
        })
    }, initFrameEvent: function () {
        var f =
            window.frameElement, self = this;
        if (!f)return;
        QS.event.addEvent(f, "mouseout", function (event) {
            self.statusFlag.isInFrame = false
        });
        f = null
    }, initAutoResize: function () {
        if (!this.options.updateOnContentResize)return;
        var self = this;
        setTimeout(function () {
            self.updateScroller()
        }, 50)
    }, autoHideScrollbar: function () {
        if (!this.options.autoHideScrollbar)return;
        var element = this.elements.scrollbarParent;
        if (this.statusFlag.isInRange)element.style.display = "none"; else element.style.display = ""
    }, limitRange: function (moveTop) {
        moveTop =
            parseFloat(moveTop);
        var maxHeight = this.getOffsetHeight() - parseFloat(this.elements.scrollbar.style.height);
        if (moveTop < 0)return 0;
        return Math.min(moveTop, maxHeight)
    }, getScrollbarOffset: function () {
        return parseFloat(this.elements.scrollbar.style.top) || 0
    }, getOffsetHeight: function () {
        return this.contentOffsetHeight
    }, getScrollHeight: function () {
        return this.contentScrollHeight
    }, getContentOffset: function () {
        return-parseFloat(this.elements.contentParent.style.top) || 0
    }, getScrollDistance: function (s) {
        var DEFAULT_DISTANCE =
            100;
        if (s == "auto")return DEFAULT_DISTANCE;
        return parseFloat(s) / this.computeRatio()
    }, updateScroller: function () {
        if (this.noScrollbar())return;
        var contentScrollHeight = this.elements.contentParent.scrollHeight, top;
        this.setAttr("contentScrollHeight", contentScrollHeight);
        this.resizeScrollbar();
        top = this.getContentOffset();
        this.elements.scrollbar.style.top = top / this.computeRatio() + "px"
    }, computeRatio: function () {
        var scrollRoom = this.getOffsetHeight() - this.getScrollbarHeight(), contentRoom = this.getScrollHeight() -
            this.getOffsetHeight();
        return contentRoom / scrollRoom
    }, scroll: function (y) {
        if (this.noScrollbar())return;
        y = this.limitRange(y);
        this.elements.scrollbar.style.top = y + "px";
        this.elements.contentParent.style.top = -y * this.computeRatio() + "px"
    }, resizeScrollbar: function () {
        var height = this.getScrollbarHeight();
        this.elements.scrollbar.style.height = height + "px"
    }, getScrollbarHeight: function () {
        var ratio = this.getScrollHeight() / this.getOffsetHeight();
        return Math.max(this.getOffsetHeight() / ratio, 20)
    }, noScrollbar: function () {
        return this.elements.scrollbarParent.offsetHeight ===
            0
    }};
    var DragDrop = function () {
        var dragDrop = QS.CustomEventModule.create(), dragging = null;

        function handleEvent(event) {
            event = QS.event.getEvent(event);
            var target = QS.event.getTarget(event);

            function trigger(type) {
                dragDrop.trigger(type, {target: dragging, clientX: event.clientX, clientY: event.clientY})
            }

            switch (event.type) {
                case "mousedown":
                    while (target && target != document) {
                        if (target.getAttribute("data-draggable") === "true") {
                            dragging = target;
                            trigger("dragstart");
                            QS.event.preventDefault(event);
                            break
                        }
                        target = target.parentNode
                    }
                    break;
                case "mousemove":
                    if (dragging != null) {
                        trigger("dragging");
                        QS.event.preventDefault(event)
                    }
                    break;
                case "mouseup":
                    trigger("dragend");
                    dragging = null;
                    break
            }
        }

        dragDrop.enable = function () {
            QS.event.addEvent(document, "mousedown", handleEvent);
            QS.event.addEvent(document, "mousemove", handleEvent);
            QS.event.addEvent(document, "mouseup", handleEvent)
        };
        dragDrop.disable = function () {
            QS.event.removeEvent(document, "mousedown", handleEvent);
            QS.event.removeEvent(document, "mousemove", handleEvent);
            QS.event.removeEvent(document, "mouseup",
                handleEvent)
        };
        return dragDrop
    }();
    return function (contentElement, options) {
        var scroller = new Scroller(contentElement, options), hasScrollbar = false, controller = function () {
            var operations = {"update": function () {
                scroller.updateScroller()
            }, "scrollToTop": function () {
                scroll(0)
            }, "scrollToBottom": function () {
                scroll(scroller.getScrollHeight())
            }, "scrollUp": function (px) {
                scroll(-px)
            }, "scrollDown": function (px) {
                scroll(px)
            }, "checkScrollerStatus": function () {
                return hasScrollbar
            }};

            function scroll(px) {
                var dis = scroller.getScrollbarOffset() +
                    scroller.getScrollDistance(px);
                scroller.scroll(dis)
            }

            function execute(cmd) {
                if (Object.prototype.toString.call(operations[cmd]) == "[object Function]")operations[cmd].apply(null, [].slice.call(arguments, 1))
            }

            return function (cmd) {
                var otherController;
                if (hasScrollbar)return execute.apply(null, arguments);
                if (cmd === "update") {
                    otherController = new QS.ui.scrollbar(contentElement, options);
                    if (otherController("checkScrollerStatus")) {
                        controller = otherController;
                        hasScrollbar = true;
                        scroller = null
                    }
                }
            }
        }();
        scroller.hack.setCss();
        if (!scroller.needScroller()) {
            scroller.hack.restoreCss();
            return controller
        }
        hasScrollbar = true;
        scroller.elements = QS.object.extend(scroller.elements, scroller.generateScrollerElements());
        scroller.hack.restoreCss();
        scroller.resizeScrollbar();
        scroller.initDragDrop();
        scroller.initClickScrollbar();
        scroller.initAutoResize();
        scroller.initScrollEvent();
        scroller.initKeydownEvent();
        scroller.initMousemove();
        scroller.initFrameEvent();
        return controller
    }
}();
QS.ui.dataPage = function () {
    function DataPage(id, data, settings) {
        var template = '<% for (var i = 0; i < list.length; i++) { %> \t\t\t\t\t<a class="<%=list[i].classname %>" data-id="<%=list[i].issue %>" data-index="<%=indexStart+i%>" href="<%=list[i].url %>" target="<%=list[i].target %>"> \t\t\t\t\t\t<span class="period_num"><%=list[i].issue %></span> \t\t\t\t\t\t<strong class="title"><%=list[i].name %></strong> \t\t\t\t\t\t<span class="arrow"><span class="arrow_in"></span></span> \t\t\t\t\t</a>  \t\t\t\t\t<% } %>',
            boxHtml = '<div id="{content_wrap}" class="period_content"> \t\t\t\t\t\t{content} \t\t\t\t\t\t</div> \t\t\t\t\t\t<a id="{prev}" href="javascript:;" class="period_next period_next_disable">\u4e0a\u4e00\u9875</a> \t\t\t\t\t\t<a id="{next}" href="javascript:;" class="period_next period_next_disable">\u4e0b\u4e00\u9875</a>';
        opts = QS.object.extend({index: 1, pageNum: 7, template: template, boxHtml: boxHtml, callBack: function () {
        }, prevClass: "period_prev", nextClass: "period_next", prevClassDis: "period_prev period_prev_disable",
            nextClassDis: "period_next period_next_disable", classname: "period_link", currentClass: "period_link current", onselectTopic: null}, settings), data = data || [], len = data.length, index = opts.index;
        this.id = id || "period";
        this.data = data;
        opts.index = index > len || index < 0 ? 1 : index;
        opts.totalPage = Math.ceil(data.length / opts.pageNum);
        this.opts = opts;
        this.random = (new Date).getTime()
    }

    DataPage.prototype.draw = function () {
        var that = this;
        that.showHtml();
        that.bindHandler()
    };
    DataPage.prototype.showHtml = function (pageno) {
        var that = this, opts =
            that.opts, e = QS.$(that.id), content_wrap = "content_" + that.random, prev = "prev_" + that.random, next = "next_" + that.random, html = "";
        that.content = content_wrap;
        that.prev = prev;
        that.next = next;
        html = QS.string.format(opts.boxHtml, {content_wrap: content_wrap, content: that.getHtml(), prev: prev, next: next});
        e.innerHTML = html;
        that.delegateClick()
    };
    DataPage.prototype.delegateClick = function () {
        var that = this, container;
        if (QS.lang.getType(that.opts.onselectTopic) != "function")return;
        container = QS.$(that.content);
        QS.event.addEvent(container,
            "click", function (event) {
                var target = QS.event.getTarget(event), index;
                while (target && target != container) {
                    index = target.getAttribute("data-index");
                    if (index !== null) {
                        that.opts.onselectTopic(index);
                        that.resetCurrent(target);
                        that.opts.index = index;
                        QS.event.preventDefault(event);
                        break
                    }
                    target = target.parentNode
                }
            });
        container = null
    };
    DataPage.prototype.getHtml = function (pageno) {
        var that = this, opts = that.opts, data = that.data, len = data.length, pageNum = opts.pageNum, index = opts.index, pageno = pageno || Math.ceil(index / pageNum), list =
            [], content, render = QS.template.compile(opts.template), classname = opts.classname, currentClass = opts.currentClass, start = (pageno - 1) * pageNum;
        for (var i = 0; i < data.length; i++)data[i]["classname"] = i + 1 == index ? currentClass : classname;
        list = data.slice(start, pageno * pageNum);
        content = render({list: list, indexStart: start});
        if (that.clicktype)opts.callBack(that.clicktype, list, data[index], index);
        that.pageno = pageno;
        return content
    };
    DataPage.prototype.bindHandler = function (pageno) {
        var that = this, opts = that.opts, totalPage = opts.totalPage,
            pageno = pageno || that.pageno, prev = QS.$(that.prev), next = QS.$(that.next), prevClass = opts.prevClass, nextClass = opts.nextClass, prevClassDis = opts.prevClassDis, nextClassDis = opts.nextClassDis;
        if (totalPage == 1) {
            prev.className = prevClassDis;
            next.className = nextClassDis
        } else if (pageno == 1) {
            prev.className = prevClassDis;
            next.className = nextClass;
            prev.onclick = null;
            next.onclick = function () {
                that.clicktype = "next";
                that.gotoPage(++pageno);
                return
            }
        } else if (pageno == totalPage) {
            prev.className = prevClass;
            next.className = nextClassDis;
            prev.onclick = function () {
                that.clicktype = "prev";
                that.gotoPage(--pageno);
                return
            };
            next.onclick = null
        } else {
            prev.className = prevClass;
            next.className = nextClass;
            prev.onclick = function () {
                that.clicktype = "prev";
                that.gotoPage(--pageno);
                return
            };
            next.onclick = function () {
                that.clicktype = "next";
                that.gotoPage(++pageno);
                return
            }
        }
    };
    DataPage.prototype.gotoPage = function (pageno) {
        var that = this, e = QS.$(that.content);
        e.innerHTML = that.getHtml(pageno);
        that.bindHandler(pageno)
    };
    DataPage.prototype.resetCurrent = function (target) {
        var curClass =
            "current", list = target.parentNode.children;
        QS.object.each(list, function (elem) {
            QS.css.removeClassName(elem, curClass)
        });
        QS.css.addClassName(target, curClass)
    };
    return function (id, data, settings) {
        return new DataPage(id, data, settings)
    }
}();
QS.tools.showSideNav = function (html) {
    var MIN_SCREEN_WIDTH = 1490;
    var navElement = document.createElement("div");

    function throttle(method, opt) {
        opt = QS.object.extend({context: null, delay: 100, args: []}, opt || {});
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.apply(opt.context, opt.args)
        }, opt.delay)
    }

    function calcNavTop() {
        return(top.QS.dom.getClientHeight() - getNavHeight()) / 2 + getScrollTop() - getFrameTop()
    }

    function getNavHeight() {
        return navElement.children[0].offsetHeight
    }

    function getScrollTop() {
        var doc =
            top.document;
        return doc.documentElement.scrollTop || doc.body.scrollTop
    }

    function setNavTop() {
        navElement.style.top = calcNavTop() + "px"
    }

    function fixAnchors() {
        if (window.frameElement == null)return;
        if (QS.userAgent.isIE())return;
        navElement.onclick = function (event) {
            var id, target = QS.event.getTarget(event);
            while (target && target != navElement) {
                if (target.hash && target.hash.indexOf("#") === 0) {
                    id = target.hash.slice(1);
                    break
                }
                target = target.parentNode
            }
            if (!id)return false;
            scrollToAnchor(id)
        }
    }

    function getFrameTop() {
        if (getFrameTop.cacheTop)return getFrameTop.cacheTop;
        var frame = window, offsetTop;
        while (frame = frame.frameElement)offsetTop = QS.dom.getPosition(frame).top;
        getFrameTop.cacheTop = offsetTop;
        return getFrameTop.cacheTop
    }

    function scrollToAnchor(id) {
        var container = QS.$(id), selfTop;
        if (!container)return;
        selfTop = QS.dom.getPosition(container).top;
        QS.frame.scrollTopTo(selfTop + getFrameTop())
    }

    function monitorResize() {
        var style = navElement.style;
        if (top.QS.dom.getClientWidth() < MIN_SCREEN_WIDTH)style.display = "none"; else style.display = ""
    }

    navElement.style.cssText = "position:absolute;right:30px;";
    navElement.innerHTML = html;
    document.body.insertBefore(navElement, document.body.firstChild);
    QS.event.addEvent(top, "scroll", function () {
        throttle(setNavTop)
    });
    QS.event.addEvent(top, "resize", function () {
        throttle(monitorResize)
    });
    setNavTop();
    monitorResize();
    fixAnchors()
};
QS.tools.getPaging = function (container, totalPage, onTurn, opt) {
    var exports = {}, currentPage = 0, opt = opt || {}, btnNum = opt.btnNum || 9, sectionLength = btnNum - 2;
    if (typeof container == "string")container = document.getElementById(container);
    container.onclick = function (event) {
        var target = window.event && window.event.srcElement || event.target, btnStatus = target.getAttribute("data-btn-status"), btnType;
        if (btnStatus && btnStatus == "enabled") {
            btnType = target.getAttribute("data-btn-type");
            if (btnType == "prev")turnToPage(--currentPage); else if (btnType ==
                "next")turnToPage(++currentPage); else if (btnType == "go") {
                var inputPageNo = container.getElementsByTagName("input")[0].value;
                turnToPage(inputPageNo)
            } else {
                var pageNo = parseInt(target.innerHTML) || 1;
                turnToPage(pageNo)
            }
        }
        return false
    };
    container.onkeyup = function (event) {
        event = event || window.event;
        if (event.keyCode != 13)return;
        var target = window.event && window.event.srcElement || event.target, btnType = target.getAttribute("data-btn-type");
        if (btnType == "input")turnToPage(target.value)
    };
    function fixPageNo(pageNo) {
        pageNo =
            parseInt(pageNo) || 1;
        pageNo = pageNo > totalPage ? totalPage : pageNo;
        pageNo = pageNo < 1 ? 1 : pageNo;
        return pageNo
    }

    function turnToPage(pageNo) {
        pageNo = fixPageNo(pageNo);
        onTurn(pageNo);
        drawButton(pageNo)
    }

    function drawButton(pageNo) {
        pageNo = fixPageNo(pageNo);
        currentPage = pageNo;
        container.innerHTML = generateHtml(pageNo)
    }

    function generateHtml(pageNo) {
        if (totalPage == 1)return"";
        var prev = '<a href="javascript:;" class="prev" data-btn-status="enabled" data-btn-type="prev">\u4e0a\u4e00\u9875</a>', disabledPrev = '<a href="javascript:;" class="prev_dis" data-btn-type="prev" data-btn-type="disabled">\u4e0a\u4e00\u9875</a>',
            next = '<a href="javascript:;" class="next" data-btn-status="enabled" data-btn-type="next">\u4e0b\u4e00\u9875</a>', disabledNext = '<a href="javascript:;" class="next_dis" data-btn-type="next" data-btn-type="disabled">\u4e0b\u4e00\u9875</a>', dots = '<span class="ellipsis">.....</span>', pageBtn = '<a href="javascript:;" data-btn-type="enabled" data-btn-status="enabled">{num}</a>', currentPageBtn = '<a href="javascript:;" class="set" data-btn-type="disabled">{num}</a>', jumpPart = '<div class="go" style="display:{display}"><label>\u8f6c\u5230 <input type="text" value="{pageNo}" data-btn-type="input"/> \u9875 <a href="javascript:;" data-btn-type="go" data-btn-status="enabled">GO</a></label></div>',
            btnContainerElement = '<div class="g_md_page"><div class="page_long">{btns}</div></div>', result = [];

        function btn(num) {
            return pageBtn.replace("{num}", num)
        }

        function currentBtn(num) {
            return currentPageBtn.replace("{num}", num)
        }

        function jumpPageBtn(num) {
            return jumpPart.replace("{pageNo}", pageNo).replace("{display}", opt.hideGo ? "none" : "")
        }

        if (totalPage <= btnNum) {
            if (pageNo == 1)result.push(disabledPrev); else result.push(prev);
            for (var i = 1; i <= totalPage; i++)if (pageNo == i)result.push(currentBtn(i)); else result.push(btn(i));
            if (pageNo == totalPage)result.push(disabledNext); else result.push(next)
        } else {
            var t = [];
            if (pageNo == 1)t = [disabledPrev, currentBtn(1), btn(totalPage), next]; else if (pageNo == totalPage)t = [prev, btn(1), currentBtn(totalPage), disabledNext]; else t = [prev, btn(1), btn(totalPage), next];
            if (pageNo > totalPage - (sectionLength + 1) / 2) {
                result[0] = dots;
                for (var i = totalPage - sectionLength + 1; i < totalPage; i++)if (pageNo == i)result.push(currentBtn(i)); else result.push(btn(i))
            } else if (pageNo < (sectionLength + 3) / 2) {
                for (var i = 2; i < 2 + sectionLength; i++)if (pageNo ==
                    i)result.push(currentBtn(i)); else result.push(btn(i));
                result[result.length - 1] = dots
            } else {
                result[0] = dots;
                for (var i = pageNo - (sectionLength - 1) / 2 + 1; i <= pageNo + (sectionLength - 1) / 2; i++)if (pageNo == i)result.push(currentBtn(i)); else result.push(btn(i));
                result[result.length - 1] = dots
            }
            result.push(t[2], t[3]);
            result.unshift(t[0], t[1])
        }
        result.push(jumpPageBtn());
        return btnContainerElement.replace("{btns}", result.join(""))
    }

    function getCurrentPageNo() {
        return currentPage
    }

    exports.turnToPage = turnToPage;
    exports.drawButton =
        drawButton;
    exports.getCurrentPageNo = getCurrentPageNo;
    return exports
};
QS.tools.getPageSwitcher = function () {
    function getExportsObject(instance) {
        var methodList = ["generateSwitcher", "getCurrentPage", "turnToPage"];

        function getInstanceObject() {
            var object = {};
            QS.object.each(methodList, function (method) {
                object[method] = QS.object.bind(instance, instance[method])
            });
            return object
        }

        return getInstanceObject()
    }

    function Switcher(container, totalPage, onswitch, options) {
        this.currentPage = 1;
        this.container = container;
        this.totalPage = totalPage;
        this.onswitch = onswitch;
        this.options = options;
        return getExportsObject(this)
    }

    Switcher.prototype = {getCurrentPage: function () {
        return this.currentPage
    }, limitPageRange: function (page) {
        page = parseInt(page);
        if (page < 1)return 1;
        if (page > this.totalPage)return this.totalPage;
        return page
    }, generateSwitcher: function (page) {
        if (this.totalPage < 2) {
            this.container.innerHTML = "";
            return
        }
        this.currentPage = this.limitPageRange(page || 1);
        var that = this;
        this.container.innerHTML = this.generateHtml();
        QS.event.removeEvent(this.container, "click", this.container.__delegatedFn__);
        function delegateFn(event) {
            var target =
                QS.event.getTarget(event), evtType;
            while (target && target != that.container) {
                evtType = target.getAttribute("data-event");
                if (that[evtType]) {
                    currentPage = that[evtType](target);
                    QS.event.preventDefault(event)
                }
                target = target.parentNode
            }
        }

        QS.event.addEvent(this.container, "click", delegateFn);
        this.container.__delegatedFn__ = delegateFn
    }, generateHtml: function () {
        var html = '<div class="g_md_page_pop">' + this.generateNav() + this.generateDots() + "</div>";
        return html
    }, generateNav: function () {
        var tmpl = '<div class="nav">' + '<a href="##" data-event="onPrevEvent" hideFocus class="prev<% if (currentPage === 1){ %><%=" prev_disabled"%><% } %>"><i></i></a>' +
            '<a href="##" data-event="onNextEvent" hideFocus class="next<% if (totalPage === currentPage) { %><%=" next_disabled"%><% } %>"><i></i></a>' + "</div>";
        return renderHtml(tmpl, {totalPage: this.totalPage, currentPage: this.currentPage})
    }, generateDots: function () {
        var tmpl = '<div class="switcher">' + "<% for (var i = 1; i <= totalPage; i++) { %>" + '<a href="##" hideFocus data-event="onSwitchEvent" data-page="<%=i%>" ' + '<% if (i === currentPage) { %><%="class=current"%><% } %> ></a>' + "<% } %>" + "</div>";
        return renderHtml(tmpl,
            {totalPage: this.totalPage, currentPage: this.currentPage})
    }, onPrevEvent: function () {
        if (this.currentPage == 1)return;
        this.turnToPage(this.currentPage - 1)
    }, onNextEvent: function () {
        if (this.currentPage === this.totalPage)return;
        this.turnToPage(this.currentPage + 1)
    }, onSwitchEvent: function (target) {
        var page = parseInt(target.getAttribute("data-page"));
        if (this.currentPage == page)return;
        this.turnToPage(page)
    }, turnToPage: function (page) {
        this.currentPage = this.limitPageRange(page || 1);
        this.onswitch(this.currentPage);
        this.generateSwitcher(this.currentPage)
    }};
    function renderHtml(tmpl, obj) {
        var render = QS.template.compile(tmpl);
        return render(obj)
    }

    function noop() {
    }

    return function (container, totalPage, onswitch, options) {
        totalPage = parseInt(totalPage);
        if (QS.lang.isString(container))container = QS.$(container);
        var switcher = new Switcher(container, totalPage, onswitch, options);
        return switcher
    }
}();
QS.tools.getAvFlashStr = function (sn, w, h) {
    var mode = sn.match(/V1#[MFU]_0_/) ? 0 : 1, w = w || [140, 186][mode], h = h || [226, 300][mode], opt = {"width": w, "height": h, "quality": "high", "flashVars": "sItems=" + escape(sn), "wmode": "transparent", "allowScriptAccess": "always"};
    return QS.media.SWFlash.buildHTML("http://qqshow2-item.qq.com/1000000/53/02/", opt)
};
QS.tools.getHeadFlashStr = function (sn, sex, opt) {
    var _opt = opt || {}, _map = ["C", "F", "P", "D", "B"], _mode = QS.user.getAvMode();
    _opt.w = _opt.w || 84;
    _opt.h = _opt.h || 84;
    _opt.mode = _opt.mode == undefined ? _map[_mode] : _map[_opt.mode];
    param = {"width": _opt.w, "height": _opt.h, "align": "middle", "quality": "best", "bgcolor": "#ffffff", "wmode": "transparent", "allowScriptAccess": "always", "flashVars": "gender=" + sex + "&show=" + sn + "&mode=" + _opt.mode + "&w=" + _opt.w + "&h=" + _opt.h};
    return QS.media.SWFlash.buildHTML("http://qqshow2-item.qq.com/1000000/73/02/",
        param)
};
QS.tools.snapshot = function () {
    var BASE_URL = "http://imgcache.qq.com/qqshow_v3/htdocs/syndata/excel_snashot/", _transform = function (itemno) {
        return Math.floor(itemno % 1E3 / 100) + "/" + itemno % 100 + ""
    }, getDirectoryById = function (id) {
        return[id.substr(3, 1) || "0", "/", parseInt(id.substr(4, 2), 10) || "0", "/"].join("")
    };

    function getFSuit(id) {
        return BASE_URL + _transform(id) + "/" + id + "_0.jpg"
    }

    function getCSuit(id) {
        return BASE_URL + _transform(id) + "/" + id + "_0.gif"
    }

    function getCSuitNoBg(id) {
        return BASE_URL + _transform(id) + "/" + id + "_0_0.png"
    }

    function getFSuitNoBg136(id) {
        return BASE_URL + _transform(id) + "/" + id + "_136-450.png"
    }

    function getFSuitNoBg155(id) {
        return BASE_URL + _transform(id) + "/" + id + "_155-450.png"
    }

    function getFSuitNoBg220(id) {
        return BASE_URL + _transform(id) + "/" + id + "_220-500.png"
    }

    function getFSuit350(id) {
        return BASE_URL + _transform(id) + "/" + id + "_345-557.png"
    }

    function getFSingle(id) {
        return"http://imgcache.qq.com/qqshow/fashion/data/item/" + _transform(id) + "/" + id + ".jpg"
    }

    function getCSingle(id) {
        return"http://qqshow2-item.qq.com/" + id + "/00/00/"
    }

    function getBSingle(id) {
        return"http://qqshow2-item.qq.com/" + id + "/00/00/"
    }

    function getRecommendHead(id) {
        return BASE_URL + getDirectoryById(id) + id + "_100.png"
    }

    function getHeadFSingle(id) {
        return"http://qqshow2-item.qq.com/" + id + "/00/00/"
    }

    return{getFSuit: function (id) {
        return getFSuit(id)
    }, getFSuitNoBg136: function (id) {
        return getFSuitNoBg136(id)
    }, getFSuit350: function (id) {
        return getFSuit350(id)
    }, getFSuitNoBg155: getFSuitNoBg155, getFSuitNoBg220: getFSuitNoBg220, getCSuit: function (id) {
        return getCSuit(id)
    }, getCSuitNoBg: function (id) {
        return getCSuitNoBg(id)
    },
        getFSingle: function (id) {
            return getFSingle(id)
        }, getCSingle: function (id) {
            return getCSingle(id)
        }, getBSingle: function (id) {
            return getBSingle(id)
        }, getRecommendHead: getRecommendHead, getHeadFSingle: getHeadFSingle}
}();
if (typeof QS.library.activity == "undefined")QS.library.activity = {};
QS.library.activity.fastSaveShow = function (opt) {
    QS.dialog.setOpener(opt || {});
    opt.width = 300;
    opt.height = 350;
    QS.dialog.popup("http://imgcache.qq.com/qqshow/v5/public/html/save/saveshow.html", opt)
};
QS.library.activity.freePresent = function () {
    function Present(opts) {
        this.confId = opts.confId;
        this.ruleId = opts.ruleId;
        this.listId = opts.listId;
        this.isCheck = opts.isCheck || false;
        this.succ = opts.succ;
        this.fail = opts.fail;
        this.error = opts.error
    }

    Present.prototype.request = function () {
        var that = this;
        if (that.isCheck) {
            function onVerifyOK(verifyCode) {
                that._sendRuest(verifyCode)
            }

            QS.library.activity.verifyCode(onVerifyOK)
        } else that._sendRuest()
    };
    Present.prototype._sendRuest = function (verifyCode) {
        var that = this, confId = that.confId,
            ruleId = that.ruleId, listId = that.listId, succ = that.succ, fail = that.fail, error = that.error, url = "http://mkt.show.qq.com/cgi-bin/qqshow_live_present", param;

        function onFail(xmlDoc) {
            var code = parseInt(xmlDoc.getElementsByTagName("QQSHOW")[0].getAttribute("code"), 10), msg = xmlDoc.getElementsByTagName("QQSHOW")[0].getAttribute("message");
            if (typeof fail == "function")fail(code, msg); else if (code == -1001)QS.user.login(); else QS.dialog.alert(QS.library.activity.getExchageErrorMessage(code, msg))
        }

        function onError() {
            error ?
                error() : QS.dialog.alert("\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002")
        }

        function onSucc(msg) {
            succ && succ(msg)
        }

        param = {omode: 3, confid: confId, ruleid: ruleId, listid: listId};
        if (verifyCode)param.webcode = verifyCode;
        QS.json.send(url, param, function (json) {
            var code = json.code, msg = json.msg;
            if (code == 0)onSucc(msg); else if (code == -1001)QS.user.login(); else if (typeof fail == "function")fail(code, msg); else QS.dialog.alert(QS.library.activity.getExchageErrorMessage(code, msg))
        })
    };
    return function (opts) {
        return new Present(opts)
    }
}();
QS.library.activity.getExchageErrorMessage = function (code, msg) {
    var retCode = {119001: "\u5bf9\u4e0d\u8d77\uff0c\u6d3b\u52a8\u8fd8\u672a\u5f00\u59cb\uff0c\u8bf7\u7ee7\u7eed\u5173\u6ce8\uff01", 119002: "\u5bf9\u4e0d\u8d77\uff0c\u6d3b\u52a8\u5df2\u7ecf\u7ed3\u675f\u3002\u8c22\u8c22\u5173\u6ce8\uff01", 119003: "\u6d3b\u52a8\u53c2\u4e0e\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", 119004: "\u4eca\u5929\u8be5\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01", 119005: "\u672c\u6d3b\u52a8\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01",
        "-501": "\u4eca\u5929\u6d3b\u52a8\u5c1a\u672a\u5f00\u59cb\uff0c\u8bf7\u7ee7\u7eed\u5173\u6ce8\uff01", "-502": "\u4eca\u5929\u6d3b\u52a8\u65f6\u95f4\u5df2\u7ed3\u675f\uff0c\u8c22\u8c22\u5173\u6ce8\uff01", "-503": "\u6d3b\u52a8\u8fd8\u672a\u5f00\u59cb\uff0c\u8bf7\u7ee7\u7eed\u5173\u6ce8\uff01", "-504": "\u6d3b\u52a8\u5df2\u7ecf\u7ed3\u675f\uff0c\u8c22\u8c22\u5173\u6ce8\uff01"};
    if ("-1002" == code)return msg; else return retCode[code] || QS.library.activity.getOSSErrorMessage(code) || QS.library.activity.retCommCode(code) ||
        "\u5bf9\u4e0d\u8d77\uff0c\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002"
};
QS.library.activity.getOSSErrorMessage = function (code) {
    var retCode = {502001: "\u6d3b\u52a8\u5df2\u7ecf\u7ed3\u675f\uff0c\u8c22\u8c22\u5173\u6ce8\uff01", 502003: "\u60a8\u4e0d\u5177\u5907\u6d3b\u52a8\u8d44\u683c\uff0c\u8bf7\u53c2\u9605\u6d3b\u52a8\u8bf4\u660e\u3002", 502004: "\u5bf9\u4e0d\u8d77\uff0c\u672c\u6d3b\u52a8\u4ec5\u9650\u7ea2\u94bb\u53c2\u52a0\uff0c\u8bf7\u5f00\u901a\u7ea2\u94bb\u518d\u6765\u53c2\u52a0\u3002", 502005: "\u60a8\u4e0d\u5177\u5907\u6d3b\u52a8\u8d44\u683c\uff0c\u8bf7\u53c2\u9605\u6d3b\u52a8\u8bf4\u660e\u3002",
        502006: "\u60a8\u4e0d\u5177\u5907\u6d3b\u52a8\u8d44\u683c\uff0c\u8bf7\u53c2\u9605\u6d3b\u52a8\u8bf4\u660e\u3002", 502012: "\u60a8\u4eca\u5929\u83b7\u5f97\u8be5\u7269\u54c1\u7684\u6b21\u6570\u5df2\u6ee1\uff01", 502013: "\u60a8\u672c\u6708\u83b7\u5f97\u8be5\u7269\u54c1\u7684\u6b21\u6570\u5df2\u6ee1\uff01", 502213: "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8f93\u5165\u7684\u5151\u6362\u7801\u9519\u8bef\u3002", 502400: "\u60a8\u64cd\u4f5c\u9891\u7e41\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", 502401: "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u6ca1\u6709\u62bd\u5956\u8d44\u683c\uff0c\u5148\u53bb\u83b7\u53d6\u8d44\u683c\u5427\uff01",
        502404: "\u60a8\u7684\u6d3b\u52a8\u8d44\u683c\u5df2\u7ecf\u4f7f\u7528\u5b8c\u6bd5\uff01", 502405: "\u60a8\u4e0d\u5177\u5907\u6d3b\u52a8\u8d44\u683c\uff0c\u8bf7\u53c2\u9605\u6d3b\u52a8\u8bf4\u660e\u3002", 502409: "\u60a8\u8f93\u5165\u7684\u5151\u6362\u7801\u5df2\u4f7f\u7528\u3002", 502410: "\u6d3b\u52a8\u5151\u6362\u7801\u53d1\u653e\u5b8c\u6bd5\uff0c\u8c22\u8c22\u5173\u6ce8\uff01", 502600: "\u672c\u6d3b\u52a8\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01", 502601: "\u60a8\u5728\u672c\u6d3b\u52a8\u4e2d\u83b7\u5f97\u8be5\u7269\u54c1\u7684\u6b21\u6570\u5df2\u6ee1\uff01",
        502605: "\u60a8\u672c\u5468\u83b7\u5f97\u8be5\u7269\u54c1\u7684\u6b21\u6570\u5df2\u6ee1\uff01", 502606: "\u4eca\u5929\u8be5\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01", 502607: "\u672c\u5468\u8be5\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01", 502608: "\u672c\u6708\u8be5\u7269\u54c1\u5df2\u7ecf\u53d1\u653e\u5b8c\u6bd5\uff01", 502803: "\u64cd\u4f5c\u5931\u8d25\uff0c\u60a8\u4e0d\u7b26\u5408\u53c2\u52a0\u6d3b\u52a8\u6761\u4ef6\u6216\u5df2\u7ecf\u53c2\u52a0\u8fc7\uff0c\u8c22\u8c22\u5173\u6ce8\uff01",
        "-2006002": "\u8be5QQ\u53f7\u5df2\u5151\u6362\u8fc7\uff0c\u6216\u8005\u5151\u6362\u7801\u5df2\u88ab\u4f7f\u7528\u6216\u65e0\u6548\u3002"};
    return retCode[code]
};
QS.library.activity.retCommCode = function (code) {
    var mapRetCode = {"-1001": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u6ca1\u767b\u5f55\uff0c\u8bf7\u5148\u767b\u5f55\u3002", "-1002": "\u60a8\u8f93\u5165\u7684\u53c2\u6570\u6709\u9519\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff0c\u8c22\u8c22\u3002", "-1003": "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-1004": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u64cd\u4f5c\u592a\u9891\u7e41\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-1005": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u6ca1\u6ce8\u518cQQ\u79c0\u3002",
        "-1006": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u597d\u53cb\u8fd8\u6ca1\u6709\u6ce8\u518cQQ\u79c0\uff01", "-1007": "\u5bf9\u4e0d\u8d77\uff0c\u5bf9\u65b9\u4e0d\u662f\u60a8\u76847\u5929\u597d\u53cb\uff01", "-1008": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u4e0d\u662f\u5bf9\u65b9\u76847\u5929\u597d\u53cb\uff01", "-1009": "\u5bf9\u4e0d\u8d77\uff0c\u4e3a\u4e86\u60a8\u7684\u5b89\u5168\uff0c\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\u3002", "-1100": "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-1101": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u7559\u8a00\u4e2d\u6709\u654f\u611f\u8bcd\u6c47,\u8bf7\u4fee\u6539\u540e\u518d\u8fdb\u884c\u64cd\u4f5c\u3002",
        "-1200": "\u5bf9\u4e0d\u8d77\uff0c\u7cfb\u7edf\u6b63\u5728\u5347\u7ea7\u7ef4\u62a4\u4e2d\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff0c\u8c22\u8c22\u60a8\u7684\u652f\u6301!", "-1300": "QQ\u79c0\u5546\u57ce\u6b63\u5728\u5347\u7ea7\u7ef4\u62a4\u4e2d\uff0c\u90e8\u5206\u529f\u80fd\u5c06\u4e0d\u53ef\u7528\uff0c\u7ed9\u60a8\u5e26\u6765\u4e0d\u4fbf\uff0c\u656c\u8bf7\u8c05\u89e3\uff0c\u8c22\u8c22\u60a8\u7684\u652f\u6301!"};
    return mapRetCode[code]
};
QS.library.activity.verifyCode = function (fnOk, fnCancel) {
    QS.dialog.setOpener({ok: function (verifyCode) {
        fnOk && fnOk(verifyCode)
    }, cancel: function (verifyCode) {
        fnCancel && fnCancel(verifyCode)
    }});
    QS.dialog.popup("http://imgcache.qq.com/qqshow/v5/public/html/system/verifycode.html", {width: 340, height: 200})
};
