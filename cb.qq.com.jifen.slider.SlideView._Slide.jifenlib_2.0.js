var JIFEN = JIFEN || {};
JIFEN = $.extend(JIFEN, {gMinUin: 10000, gEncoding: 'utf-8', gTimeout: 8000, gPrefixHost: 'http://' + document.location.host, gCBPrefixHost: 'http://cb.qq.com', CONST_RET_OK: 0, CONST_RET_ERR: -1000, CONST_RET_ERR_NOT_LOGIN: -1001, CONST_RET_ERR_IVD_PARAM: -1002, CONST_RET_ERR_IVD_CMD: -1003, CONST_RET_ERR_FRE_LIMIT: -1004, CONST_RET_ERR_IVD_VERIFYCODE: -1005, CONST_RET_ERR_NOT_ACTIVE_CFT: -1006, CONST_RET_ERR_GET_PAIPAI_ADDR: -1007, CONST_RET_ERR_BLACK_UIN: -1008, CONST_RET_ERR_LESS_JIFEN: -2302, CONST_RET_ERR_NOT_OPEN_CFT: -2301, CONST_RET_ERR_EX_ITEM_LIMIT: -2201, CONST_RET_ERR_EX_TYPE_LIMIT: -2202, CONST_RET_ERR_EX_USER_LIMIT: -2203, CONST_RET_ERR_EX_XUANFENG_LIMIT: -2204, CONST_RET_ERR_EX_SUPER_VIP_LIMIT: -2205, CONST_RET_ERR_EX_LIMIT_PER_DAY: -2211, CONST_RET_ERR_EX_LIMIT_PER_WEEK: -2212, CONST_RET_ERR_EX_LIMIT_PER_MONTH: -2213, CONST_RET_ERR_EX_LIMIT_PER_YEAR: -2214, CONST_RET_ERR_EX_LIMIT_FOREVER: -2215, CONST_RET_ERR_SERVICE_LIMIT: -2401, CONST_RET_ERR_ITEM_NOEXIST: -2101, CONST_RET_ERR_ITEM_OFF_MALL: -2102, CONST_RET_ERR_ITEM_OFF_TIME: -2103, CONST_RET_ERR_ITEM_SOLD_OUT: -2104});
(function (JIFEN) {
    JIFEN.$o = function (id) {
        return document.getElementById(id);
    };
    JIFEN.isIe6 = $.browser.msie && parseInt($.browser.version) < 7;
    JIFEN.getParameter = function (n, s, d) {
        var reg = new RegExp("(?:^|[&\?])" + n + "=([^&#]*)(?:[&#].*|$)");
        var val = (s || location.search || '').match(reg);
        if (val) {
            val = val[1];
        }
        val = val || '';
        return d && val ? decodeURIComponent(val) : val;
    };
    JIFEN.doEnterHandler = function (enterCb) {
        $(document).unbind('keydown');
        if ($.type(enterCb) == 'function') {
            $(document).bind('keydown', function (evt) {
                if (evt.keyCode == 13) {
                    enterCb(evt);
                    evt.preventDefault();
                }
            });
        }
    };
    JIFEN.getElementTPL = function (element) {
        if (typeof element == 'string')element = $o(element);
        if (!element)return'';
        return element.oldHTML || (element.oldHTML = element.innerHTML.replace(/%5b%/ig, "<%").replace(/%%5d/ig, "%>").replace(/\[%/g, "<%").replace(/%\]/g, "%>").replace(/\{%/g, "<%").replace(/%\}/g, "%>").replace(/\<!--%/g, "<%").replace(/%-->/g, "%>").replace(/END-->/ig, '').replace(/<!--BEGIN/ig, ''));
    };
    JIFEN.isValidMobile = function (mobile) {
        var patrn = /^[1-9]\d+$/;
        if (patrn.test(mobile) && mobile.length == 11) {
            return true;
        }
        else {
            return false;
        }
    };
    JIFEN.setHomepage = function (pageURL) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(pageURL);
        }
        else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                }
            }
            try {
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', pageURL);
            } catch (e) {
            }
            ;
        }
    };
    JIFEN.addFav = function (title, url) {
        url = url || gPrefixHost;
        if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else if (document.all) {
            window.external.addFavorite(url, title);
        } else if (window.opera && window.print) {
            alert("请使用 Ctrl+D 进行添加");
            return;
        } else {
            alert("请使用 Ctrl+D 进行添加");
        }
    };
    JIFEN.notice_me = function (title, content, ntime, ctype) {
        var isIE = navigator.userAgent.match(/MSIE/);
        if (isIE) {
            try {
                var xmlhttp = new ActiveXObject("TimwpDll.TimwpCheck");
                var n = xmlhttp.GetHummerQQVersion();
                if (n < 2509) {
                    if (confirm("您当前未安装QQ或使用的QQ版本过低，不支持此功能。请先下载QQ2009正式版SP4及以上版本。")) {
                        window.target = "_top";
                        window.open("http://im.qq.com/qq/dlqq.shtml");
                    }
                }
                else {
                    var ctype = ctype || 2;
                    var cpAdder = new ActiveXObject("QQCPHelper.CPAdder");
                    var retVal = cpAdder.AddMemoNote(title, content, ctype, 0, ntime, 0);
                }
            } catch (e) {
                if (confirm("您当前未安装QQ或使用的QQ版本过低，不支持此功能。请先下载QQ2009正式版SP4及以上版本。")) {
                    window.target = "_top";
                    window.open("http://im.qq.com/qq/dlqq.shtml");
                }
            }
        }
        else {
            alert('温馨提示：\r\n　　您使用的浏览器不支持QQ备忘录，建议您使用IE/TT浏览器访问。');
        }
        return false;
    };
    JIFEN.getNickLength = function (nick) {
        var len = 0;
        for (var index = 0; index < nick.length; index++) {
            if (nick.charCodeAt(index) < 299) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    };
    JIFEN.getNickName = function (nickName) {
        var result = nickName;
        var flag = true;
        while (flag) {
            result = result.substring(0, result.length - 1);
            if (JIFEN.getNickLength(result) <= 13) {
                flag = false;
            }
        }
        return result;
    }
    JIFEN.showYellowTips = function () {
        setTimeout(function () {
            $.ajax({type: "GET", url: "http://imgcache.qq.com/club/portal_new/bulletin.js", dataType: "script", scriptCharset: "gbk"});
        }, 100);
    };
    JIFEN.Pop = (function () {
        var curDiv = null, _st = null, _stm = null;
        var showMask = function () {
            var pop_mask = $('#v\\:pop_mask');
            var iframe_mask = $('#iframe_mask');
            if (pop_mask.size() <= 0) {
                var oFragment = document.createDocumentFragment();
                var d_pop_mask = document.createElement('DIV');
                d_pop_mask.id = 'v:pop_mask';
                d_pop_mask.className = 'mod_pop_mask';
                d_pop_mask.style.display = 'block';
                oFragment.appendChild(d_pop_mask);
                if (iframe_mask.size() <= 0 && JIFEN.isIe6) {
                    var d_iframe_mask = document.createElement('IFRAME');
                    d_iframe_mask.id = 'iframe_mask';
                    d_iframe_mask.style.display = 'block';
                    oFragment.appendChild(d_iframe_mask);
                }
                document.body.appendChild(oFragment);
                pop_mask = $('#v\\:pop_mask');
                iframe_mask = $('#iframe_mask');
            }
            pop_mask.show();
            if (JIFEN.isIe6) {
                iframe_mask.show();
                var height = 0, width = 0;
                _stm = setInterval(function () {
                    var top1 = document.body.scrollHeight;
                    var top2 = window.screen.availHeight;
                    var new_height = top1 > top2 ? top1 : top2;
                    if (new_height != height) {
                        pop_mask.css('height', new_height + 'px');
                        height = new_height;
                    }
                    var new_width = document.body.scrollWidth;
                    if (new_width != width) {
                        pop_mask.css('width', new_width + 'px');
                        width = new_width;
                    }
                }, 100);
            }
        };
        var hidePop = function () {
            $(curDiv).hide();
            curDiv = null;
            $('#v\\:pop_mask').hide();
            if (JIFEN.isIe6) {
                $('#iframe_mask').hide();
                $(window).unbind('scroll', setPopPosTop);
                $('#dynamic_style_IE6PopHack').remove();
                if (_stm)clearInterval(_stm);
            }
            $(window).unbind('resize', setPopPosTop);
            $(window).unbind('resize', setIE6CSSHack);
        };
        var showPop = function (div, conf) {
            if (curDiv) {
                hidePop();
            }
            curDiv = $.type(div) === 'string' ? $o(div) : div;
            showMask();
            oCurDiv = $(curDiv);
            oCurDiv.show();
            var defaults = {noShake: false};
            var params = $.extend(defaults, conf || {});
            if (JIFEN.isIe6) {
                if (params.noShake) {
                    if ($(curDiv).hasClass('mod_pop')) {
                        getFloatDiv().css('top', 0);
                    }
                    adjustIE6CSSHack();
                    $(window).bind('resize', setIE6CSSHack);
                }
                else {
                    adjustTop();
                    $(window).bind('scroll', setPopPosTop);
                    $(window).bind('resize', setPopPosTop);
                }
            }
            else {
                adjustTop();
                $(window).bind('resize', setPopPosTop);
            }
        };
        var getPopPosTop = function () {
            if (!curDiv)return;
            var iHeight = getFloatDiv().height();
            var iWinHeight = $(window).height();
            var iTop = Math.floor((iWinHeight - iHeight) * 0.5);
            return iTop;
        };
        var getFloatDiv = function () {
            var o = $(curDiv);
            if (o.hasClass('mod_pop')) {
                return o.children().eq(0);
            }
            else {
                return o;
            }
        };
        var setPopPosTop = function () {
            if (_st) {
                clearTimeout(_st);
            }
            _st = setTimeout(adjustTop, 200);
        };
        var setIE6CSSHack = function () {
            if (_st) {
                clearTimeout(_st);
            }
            _st = setTimeout(adjustIE6CSSHack, 200);
        };
        var adjustTop = function () {
            if (JIFEN.isIe6) {
                getFloatDiv().css('top', getPopPosTop() + $(document).scrollTop() + 'px');
            } else {
                getFloatDiv().css('top', getPopPosTop() + 'px');
            }
        };
        var adjustIE6CSSHack = function () {
            $('#dynamic_style_IE6PopHack').remove();
            var css = ['html{background-image:url(about:blank);background-attachment:fixed;}', '#' + $(curDiv).attr('id') + '{_top:expression(eval(document.documentElement.scrollTop+' + getPopPosTop() + '));}'];
            JIFEN.dynamicStyle(css, 'IE6PopHack');
        };
        return{hidePop: hidePop, showPop: showPop, showMask: showMask};
    })();
    JIFEN.showMask = JIFEN.Pop.showMask;
    JIFEN.dynamicStyle = function (cssTexts, suffix) {
        var id = "dynamic_style_" + (suffix || (new Date().getTime()));
        var style = document.getElementById(id);
        if (null == style) {
            style = document.createElement("style");
            style.type = "text/css";
            style.rel = "stylesheet";
            style.setAttribute("id", id);
            document.getElementsByTagName("head")[0].appendChild(style);
            if ($.browser.msie) {
                style.styleSheet.cssText = cssTexts.join("");
            } else {
                for (var i = 0; i < cssTexts.length; i++) {
                    style.sheet.insertRule(cssTexts[i], i);
                }
            }
        }
        return style;
    };
    JIFEN.truncation = function (str, length, truncation) {
        length = length || 30, truncation = truncation ? truncation : '...';
        var re = /[^\x00-\xff]/g;
        var tmp = str.replace(/\*/g, 'o').replace(re, '**');
        var tmp2 = tmp.substring(0, length);
        var xLen = tmp2.split('\*').length - 1;
        var chNum = xLen / 2;
        length = length - chNum;
        var res = str.substring(0, length);
        return str.length > length ? res + truncation : res;
    };
    JIFEN.getAncestorBy = function (node, method) {
        while (node = node.parentNode) {
            if (node && node.nodeType == 1 && (!method || method(node))) {
                return node;
            }
        }
        return null;
    }
})(JIFEN);
window.$o = JIFEN.$o;
window.isIe6 = JIFEN.isIe6;
window.Pop = JIFEN.Pop;
window.getAntiCSRFToken = $.cb.security.getAntiCSRFToken;
window.showYellowTips = JIFEN.showYellowTips;
(function (JIFEN) {
    function isLogin() {
        var uin = $.cb.cookie.get("uin");
        if (uin == null || uin == '') {
            return false;
        }
        else {
            return true;
        }
    }

    JIFEN.isLogin = isLogin;
    function logout(callback) {
        var isCfm = window.confirm("您确认退出彩贝积分吗？");
        if (isCfm) {
            $.cb.cookie.del('uin');
            $.cb.cookie.del('skey');
            if (callback && $.isFunction(callback)) {
                callback();
            } else {
                window.top.location.reload();
            }
        }
    };
    JIFEN.logout = logout;
    JIFEN.ua = (function () {
        var aY = {}, aZ = navigator.userAgent, aX = navigator.appVersion, aW;
        if (window.ActiveXObject) {
            aY.ie = 6;
            (window.XMLHttpRequest || (aZ.indexOf("MSIE 7.0") >= 0)) && (aY.ie = 7);
            (window.XDomainRequest || (aZ.indexOf("Trident/4.0") >= 0)) && (aY.ie = 8);
            (aZ.indexOf("Trident/5.0") >= 0) && (aY.ie = 9);
            (aZ.indexOf("Trident/6.0") >= 0) && (aY.ie = 10);
        } else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != "undefined") {
            aW = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i.exec(aZ);
            aY.firefox = aW ? parseFloat(aW[1], 10) : 3.3;
        } else if (!navigator.taintEnabled) {
            aW = /AppleWebKit.(\d+\.\d+)/i.exec(aZ);
            aY.webkit = aW ? parseFloat(aW[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
            if ((aW = /Chrome.(\d+\.\d+)/i.exec(aZ)) || window.chrome) {
                aY.chrome = aW ? parseFloat(aW[1], 10) : 2;
            } else if ((aW = /Version.(\d+\.\d+)/i.exec(aZ)) || window.safariHandler) {
                aY.safari = aW ? parseFloat(aW[1], 10) : 3.3;
            }
        } else if (window.opera) {
            aY.opera = parseFloat(window.opera.version(), 10);
        }
        aW = /CPU.+?OS (\d+(?:_\d+)?).+?like Mac OS X/i.exec(aZ);
        if (aZ.indexOf("iPod") >= 0) {
            aY.iPod = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1;
        } else if (aZ.indexOf("iPhone") >= 0) {
            aY.iPhone = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1;
        } else if (aZ.indexOf("iPad") >= 0) {
            aY.iPad = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1;
        } else if (aZ.indexOf("Macintosh") >= 0 || aZ.indexOf("OS X") >= 0) {
            aW = /(?:Mac )?OS X (\d+(?:_\d+)?)/i.exec(aZ);
            aY.mac = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1;
        } else if (aZ.indexOf("Window") >= 0) {
            aW = /Windows NT (\d+(?:\.\d+)?)/i.exec(aZ);
            aY.windows = aW ? parseFloat(aW[1], 10) : 1;
        } else if (aZ.indexOf("Android") >= 0) {
            aW = /Android (\d+(?:\.\d+)?)/i.exec(aZ);
            aY.android = aW ? parseFloat(aW[1], 10) : 1;
        } else if (aZ.indexOf("Linux") >= 0) {
            aY.linux = 1;
        }
        aY.mobile = aY.iPod || aY.iPhone || aY.iPad || aY.android;
        return aY;
    })();
    function openLoginWindow(jumpURL, onSuccessCb, isMask) {
        var sUserAgent = navigator.userAgent.toLowerCase(), hln_css = encodeURIComponent("http://imgcache.qq.com/vipstyle/caibei/v3/public/img/ptlogin_244x100.png"), s_url = encodeURIComponent(location.href), style = 8;
        if (JIFEN.ua.iPhone || JIFEN.ua.android) {
            style = JIFEN.ua.android ? 9 : style;
            location.href = "http://ui.ptlogin2.qq.com/cgi-bin/login?style=" + style + "&hln_copyright=1998&appid=546000242&s_url=" + s_url + "&hln_css=" + hln_css + "&low_login_enable=0";
            return;
        }
        var aLoginParam = {isMask: isMask || 0, jumpName: 'clubcommjump', appId: '8000212', jumpURL: jumpURL || '', isQuick: true, onSuccessCb: onSuccessCb, title: '%B5%C7%C2%BCQQ%B2%CA%B1%B4%BB%FD%B7%D6'};
        if (JIFEN.ua.mobile) {
            aLoginParam['setCenterOnce'] = 1;
        }
        $.cb.quickLogin.open(aLoginParam);
    };
    JIFEN.openLoginWindow = openLoginWindow;
    function getSimpleUsrInfo(paraObj, loginCbFn, notLoginCbFn) {
        if (!isLogin()) {
            $('#v\\:logout_info').show();
            $('#v\\:login_info').hide();
            if ($.isFunction(notLoginCbFn)) {
                notLoginCbFn({iUin: 0});
            }
            ;
            return;
        }
        var token = $.cb.security.getAntiCSRFToken();
        $.ajax({url: JIFEN.gCBPrefixHost + "/my/get_user_info.php?g_tk=" + token + "&callback=?", data: paraObj, dataType: "json", timeout:　JIFEN.gTimeout, success
    :
        function (data) {
            if (data.iUin > JIFEN.gMinUin) {
                $('#v\\:top_nick').html(data.sNick);
                $('#v\\:jifen_balance').html(data.jifenBalance >= 0 ? data.jifenBalance : '加载中');
                $('#v\\:logout_info').hide();
                $('#v\\:login_info').show();
                if ($.isFunction(loginCbFn)) {
                    loginCbFn(data);
                }
                ;
            }
            else {
                $('#v\\:logout_info').show();
                $('#v\\:login_info').hide();
                if ($.isFunction(notLoginCbFn)) {
                    notLoginCbFn(data);
                }
                ;
            }
        }
    }

    )
    ;
};
JIFEN.getSimpleUsrInfo = getSimpleUsrInfo;
function getDetailUsrInfo(paraObj, loginCbFn, notLoginCbFn) {
    paraObj = paraObj || {};
    getSimpleUsrInfo({oplist: 'isClub|clubLevel|geJiFen|isLightIcon|' + (paraObj.oplist || '')}, function (data) {
        var sTPL = JIFEN.getElementTPL('v:login_user_detail');
        sTPL = sTPL.replace(/<%=@face%>/g, '<img class="uinfo_avatar" src="/qq_face.php?' + data['iUin'] + '" />');
        sTPL = sTPL.replace(/<%=@nick%>/g, function () {
            var nickNameLength = JIFEN.getNickLength(data['sNick']);
            if (nickNameLength <= 16) {
                return data['sNick'];
            } else {
                return JIFEN.getNickName(data['sNick']) + "...";
            }
        });
        sTPL = sTPL.replace(/<%=@jifen_balance%>/g, data['jifenBalance'] >= 0 ? data['jifenBalance'] : '加载中');
        if (data['jifenBalance'] > 0) {
            sTPL = sTPL.replace(/<%=@jifen_period%>/g, data['jifenPeriod']);
        } else {
            sTPL = sTPL.replace(/<%=@jifen_period%>/g, '');
        }
        if (data['isLightIcon'] > 0) {
            var isLightIcon = '<a class="ico_gb ico_uflag ico_uflag_cb" href="/act/lighticon/index.html" title="您已经点亮彩贝图标。" target="_blank"><span>彩贝</span></a>';
            sTPL = sTPL.replace(/<%=@is_light_icon%>/g, isLightIcon);
        }
        else {
            var isLightIcon = '<a class="ico_gb ico_uflag ico_uflag_cb0" href="/act/lighticon/index.html" title="您尚未点亮彩贝图标，点击去点亮吧。" target="_blank"><span>彩贝</span></a>';
            sTPL = sTPL.replace(/<%=@is_light_icon%>/g, isLightIcon);
        }
        if (data['clubLevel'] == -1) {
            sTPL = sTPL.replace(/<%=@vip_level%>/g, '<a href="http://vip.qq.com/myvip/" target="_blank" class="icon_level_back" title="QQ准会员' + '"><span id="level" class="level_n' + '"></span></a>');
        }
        else if (data['clubLevel'] >= 1 && data['clubLevel'] <= 7) {
            sTPL = sTPL.replace(/<%=@vip_level%>/g, '<a href="http://vip.qq.com/myvip/" target="_blank" class="icon_level_back" title="QQ会员等级VIP' + data['clubLevel'] + '"><span id="level" class="level' + data['clubLevel'] + '"></span></a>');
        }
        else {
            sTPL = sTPL.replace(/<%=@vip_level%>/g, '');
        }
        if (data['isOpenCFT'] == 1) {
            sTPL = sTPL.replace(/<%=@is_open_cft%>/g, '<a class="ico_gb ico_uflag ico_uflag_cft" href="/jump_to_CFT.php?type=3" target="_blank" title="您已激活财付通账户，获得的彩贝积分可及时打入您的积分账户。"><span>财付通</span></a>');
        }
        else if (data['isOpenCFT'] == 0) {
            sTPL = sTPL.replace(/<%=@is_open_cft%>/g, '<a class="ico_gb ico_uflag ico_uflag_cft0" href="/jump_to_CFT.php?type=2" target="_blank" title="您还未激活财付通帐户，获取的彩贝积分无法及时打入您的积分帐户。"><span>财付通</span></a>');
        }
        else {
            sTPL = sTPL.replace(/<%=@is_open_cft%>/g, '');
        }
        var oLoginDiv = $('#v\\:login_user_detail');
        oLoginDiv.html(sTPL);
        oLoginDiv.show();
        $('#v\\:logout_user_detail').hide();
        $('#v\\:login_loading').hide();
        $.isFunction(loginCbFn) && loginCbFn(data);
        if (data['isOpenCFT'] == 0) {
            $('#active_cft').show();
        }
    }, function (data) {
        $('#v\\:login_user_detail').hide();
        $('#v\\:logout_user_detail').show();
        $.isFunction(notLoginCbFn) && notLoginCbFn(data);
    });
};
JIFEN.getDetailUsrInfo = getDetailUsrInfo;
})
(JIFEN);
window.isLogin = JIFEN.isLogin;
(function (global) {
    var CFG_MALL_JSON_LIST_URL = 'http://imgcache.qq.com/club/go/static/mall_json_list/[%=@id%]/mall_list_[%=@id%].js';
    var CFG_MALL_URL_IMAGE = 'http://imgcache.qq.com/club/go/item/img/[%=@path%]/[%=@id%].jpg';
    var CFG_MALL_BIG_URL_IMAGE = "http://imgcache.qq.com/club/go/item/img/[%=@path%]/[%=@id%]_big.jpg";
    var CFG_MALL_RCMD_URL_IMAGE = 'http://imgcache.qq.com/club/go/item/img/[%=@path%]/[%=@id%]_rcmd.jpg';
    global.getMallListURL = function (i) {
        return CFG_MALL_JSON_LIST_URL.replace(/\[%=@id%\]/g, i);
    };
    global.getMallImgURL = function (mallId) {
        return CFG_MALL_URL_IMAGE.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallBigImgURL = function (mallId) {
        return CFG_MALL_BIG_URL_IMAGE.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallRcmdImgURL = function (mallId) {
        return CFG_MALL_RCMD_URL_IMAGE.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    var CFG_MALL_IMAGE_URL_130_40 = 'http://imgcache.qq.com/club/go/caibei2.0/busi_img/[%=@path%]/[%=@id%]_130_40.png';
    var CFG_MALL_IMAGE_URL_130_40_f = 'http://imgcache.qq.com/club/go/caibei2.0/busi_img/[%=@path%]/[%=@id%]_130_40_f.png';
    var CFG_MALL_IMAGE_URL_115_55 = 'http://imgcache.qq.com/club/go/caibei2.0/busi_img/[%=@path%]/[%=@id%]_115_55.png';
    var CFG_MALL_IMAGE_URL_80_27 = 'http://imgcache.qq.com/club/go/caibei2.0/busi_img/[%=@path%]/[%=@id%]_80_27.png';
    var CFG_MALL_IMAGE_URL_80_27_f = 'http://imgcache.qq.com/club/go/caibei2.0/busi_img/[%=@path%]/[%=@id%]_80_27_f.png';
    global.getMallImgURL_130_40 = function (mallId) {
        return CFG_MALL_IMAGE_URL_130_40.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallImgURL_130_40_f = function (mallId) {
        return CFG_MALL_IMAGE_URL_130_40_f.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallImgURL_115_55 = function (mallId) {
        return CFG_MALL_IMAGE_URL_115_55.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallImgURL_80_27 = function (mallId) {
        return CFG_MALL_IMAGE_URL_80_27.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.getMallImgURL_80_27_f = function (mallId) {
        return CFG_MALL_IMAGE_URL_80_27_f.replace(/\[%=@path%\]/g, mallId % 10).replace(/\[%=@id%\]/g, mallId);
    };
    global.js_strtr = function (tpl, arr) {
        var reg = null;
        tpl += "";
        for (var key in arr) {
            reg = new RegExp(key, "gm");
            tpl = tpl.replace(reg, arr[key]);
        }
        return tpl;
    };
    global.union_url = function (mallid, tourl, attach) {
        var attach = attach || '';
        var tourl = tourl || '';
        var cgi = 'http://fanli.qq.com/redirect.php';
        if (tourl.indexOf(cgi) > -1) {
            return tourl;
        }
        if (tourl.indexOf('cb.qq.com/') > -1 || tourl.indexOf('fanli.qq.com/') > -1) {
            if (tourl.indexOf('attach') < 0 && attach) {
                if (tourl.indexOf('?') < 0) {
                    tourl += '?attach=' + attach;
                }
                else {
                    tourl += '&attach=' + attach;
                }
            }
            return tourl;
        }
        if (parseInt(mallid) > 0) {
            var mallurl = [cgi, '?mall_id=', mallid, '&forcelogin=1&login_type=1&attach=', attach, '&QQ_from=', attach].join('');
            if (tourl) {
                if (tourl.indexOf('?') < 0 && tourl.indexOf('#') < 0) {
                    tourl += '?attach=' + attach;
                }
                else if (JIFEN.getParameter('attach', tourl) == '') {
                    var tourlAr = tourl.split('?');
                    if (tourlAr[0].indexOf('#') > -1) {
                        var tourlArHash = tourlAr[0].split('#');
                        tourl = tourlArHash[0] + '?attach=' + attach;
                        if (tourlAr[1]) {
                            tourl += '&' + tourlAr[1];
                        }
                        tourl += '#';
                        if (tourlArHash[1]) {
                            tourl += tourlArHash[1];
                        }
                    }
                    else {
                        if (!tourlAr[1]) {
                            tourl = tourlAr[0] + '?attach=' + attach;
                        }
                        else {
                            if (tourlAr[1].indexOf('#') < 0) {
                                tourl = tourlAr[0] + '?' + tourlAr[1] + '&attach=' + attach;
                            }
                            else {
                                var tourlArHash = tourlAr[1].split('#');
                                tourl = tourlAr[0] + '?' + tourlArHash[0] + '&attach=' + attach + '#';
                                if (tourlArHash[1]) {
                                    tourl += tourlArHash[1];
                                }
                            }
                        }
                    }
                }
                mallurl += '&toURL=' + encodeURIComponent(tourl);
            }
            return mallurl;
        }
        else if (tourl) {
            return tourl;
        }
        else {
            return'http://cb.qq.com/';
        }
    };
})(window);
;
(function (JIFEN) {
    var _sSourceQqFrom = null;

    function _getSourceQqFrom() {
        _sSourceQqFrom = _getSourceQqFromInUrl(window.location.href);
        return _sSourceQqFrom;
    }

    function _getSourceQqFromInUrl(sUrl) {
        var aQqFromSection = sUrl.match(/[?&](attach|QQ_from)=[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+/gi);
        if (null == aQqFromSection) {
            aQqFromSection = sUrl.match(/[?&](attach|QQ_from)=[0-9a-zA-Z]+_[0-9a-zA-Z]+_[0-9a-zA-Z]+/gi);
        }
        if (null != aQqFromSection) {
            var aKeyValue = aQqFromSection[0].split('=');
            return _upgradeQqFrom(aKeyValue[1]);
        }
        return"";
    }

    function _hookHrefClick() {
        $(document).bind('click', function (event) {
            _clickHookCallBack(event);
        });
    }

    function _unhookHrefClick() {
        $(document).unbind('click', _clickHookCallBack);
    }

    function _clickHookCallBack(event) {
        var isURL = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
        var oSrcElement = event.target;
        var oLink = null;
        if ('a' == oSrcElement.tagName || 'A' == oSrcElement.tagName) {
            oLink = oSrcElement;
        } else {
            oLink = JIFEN.getAncestorBy(oSrcElement, function (oDom) {
                return('a' == oDom.tagName || 'A' == oDom.tagName);
            });
        }
        if (null != oLink && null != oLink.href && "" != oLink.href) {
            if (null == _sSourceQqFrom) {
                _getSourceQqFrom();
            }
            if ("" == _sSourceQqFrom || (false == isURL.test(oLink.href) && 0 != oLink.href.indexOf("/"))) {
            } else {
                oLink.href = _transferQqFromToUrl(oLink.href, _sSourceQqFrom);
            }
        }
    }

    function _transferQqFromToUrl(sUrl, sSourceQqFrom) {
        var sAnchor = "";
        if (sUrl.indexOf("#") > -1) {
            sAnchor = sUrl.substr(sUrl.indexOf("#"));
            sUrl = sUrl.substr(0, sUrl.indexOf("#"));
        }
        if ("" == _getSourceQqFromInUrl(sUrl)) {
            if (-1 == sUrl.indexOf("?")) {
                sUrl += "?attach=" + sSourceQqFrom;
            } else {
                sUrl = sUrl.replace("?attach=&", "?").replace("&attach=&", "&").replace("?attach=", "?").replace("&attach=", "");
                sUrl += "&attach=" + sSourceQqFrom;
            }
        } else {
            sUrl = _modifyQqFromInUrlNewOrOld(sUrl, sSourceQqFrom);
        }
        return sUrl + sAnchor;
    }

    function _modifyQqFromInUrlNewOrOld(sUrl, sSourceQqFrom) {
        sSourceQqFrom = _upgradeQqFrom(sSourceQqFrom);
        sUrl = _modifyQqFromInUrl(sUrl, sSourceQqFrom);
        var aQqFromSection = sUrl.match(/[?&]?(attach|QQ_from)(=|%3D)[0-9a-zA-Z]+_[0-9a-zA-Z]+_[0-9a-zA-Z]+/gi);
        if (null != aQqFromSection) {
            for (var i = 0; i < aQqFromSection.length; i++) {
                var oOldReg = /[0-9a-zA-Z]+_[0-9a-zA-Z]+_[0-9a-zA-Z]+/g;
                var sTargetQqFrom = oOldReg.exec(aQqFromSection[i])[0];
                var sResultQqFrom = _modifyQqFromNewOrOld(sSourceQqFrom, sTargetQqFrom);
                var sResultQqFromSection = aQqFromSection[i].replace(sTargetQqFrom, sResultQqFrom);
                sUrl = sUrl.replace(aQqFromSection[i], sResultQqFromSection);
            }
        }
        return sUrl;
    }

    function _modifyQqFromInUrl(sUrl, sSourceQqFrom) {
        var aQqFromSection = sUrl.match(/[?&]?(attach|QQ_from)(=|%3D)[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+/gi);
        if (null != aQqFromSection) {
            for (var i = 0; i < aQqFromSection.length; i++) {
                var oNewReg = /[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+/g;
                var sTargetQqFrom = oNewReg.exec(aQqFromSection[i])[0];
                var sResultQqFrom = _modifyQqFrom(sSourceQqFrom, sTargetQqFrom);
                var sResultQqFromSection = aQqFromSection[i].replace(sTargetQqFrom, sResultQqFrom);
                sUrl = sUrl.replace(aQqFromSection[i], sResultQqFromSection);
            }
        }
        return sUrl;
    }

    function _modifyQqFromNewOrOld(sSource, sTarget) {
        sSource = _upgradeQqFrom(sSource);
        sTarget = _upgradeQqFrom(sTarget);
        if ("" == sSource || "" == sTarget) {
            return"";
        }
        return _modifyQqFrom(sSource, sTarget);
    }

    function _modifyQqFrom(sSource, sTarget) {
        var aSource = sSource.split(".");
        var aTarget = sTarget.split(".");
        if (null == aSource || null == aTarget) {
            return"";
        }
        if (5 != aSource.length || 5 != aSource.length) {
            return"";
        }
        aTarget[3] = aSource[3];
        aTarget[4] = aSource[4];
        return aTarget.join(".");
    }

    function _upgradeQqFrom(sQqFrom) {
        var oldReg = /^[0-9a-zA-Z]+_[0-9a-zA-Z]+_[0-9a-zA-Z]+$/;
        var newReg = /^[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
        if (true == oldReg.test(sQqFrom)) {
            var aOldQqFrom = sQqFrom.split("_");
            var sPageArea = aOldQqFrom[2].substr(0, 2);
            var sExtension = aOldQqFrom[2].substr(2, 2);
            var sSubExt = aOldQqFrom[2].substr(4);
            aOldQqFrom[2] = sPageArea;
            aOldQqFrom[3] = sExtension;
            aOldQqFrom[4] = sSubExt;
            return aOldQqFrom.join(".");
        } else if (true == newReg.test(sQqFrom)) {
            return sQqFrom;
        }
        return"";
    }

    JIFEN.hookHrefClick = _hookHrefClick;
    JIFEN.unhookHrefClick = _unhookHrefClick;
    JIFEN.QQ_FROM_API = {hookHrefClick: _hookHrefClick, unhookHrefClick: _unhookHrefClick, clickHookCallBack: _clickHookCallBack, transferQqFromToUrl: _transferQqFromToUrl, modifyQqFromInUrlNewOrOld: _modifyQqFromInUrlNewOrOld, modifyQqFromInUrl: _modifyQqFromInUrl, modifyQqFromNewOrOld: _modifyQqFromNewOrOld, modifyQqFrom: _modifyQqFrom, upgradeQqFrom: _upgradeQqFrom}
})(JIFEN);
(function (JIFEN) {
    JIFEN.switchNodes = function (topNodes, navNodes, navNodeClass, eventType, autoInterval) {
        topNodesAr = [];
        navNodesAr = [];
        navNodeClass = navNodeClass ? navNodeClass : 'on';
        eventType = eventType ? eventType : 'mouseover';
        var topLen = topNodes.length, navLen = navNodes.length;
        if (topLen != navLen) {
            alert('节点数量不一致');
            return;
        }
        var len = topLen;
        curIndex = 0;
        for (var i = 0; i < len; i++) {
            topNodes[i] = (typeof topNodes[i] == 'string') ? $o(topNodes[i]) : topNodes[i];
            topNodesAr.push(topNodes[i]);
            navNodes[i] = (typeof navNodes[i] == 'string') ? $o(navNodes[i]) : navNodes[i];
            navNodesAr.push(navNodes[i]);
        }
        var autoSet = function (topNodesAr, navNodesAr, curIndex) {
            for (var i = 0; i < len; i++) {
                topNodesAr[i].style.display = 'none';
                $(navNodesAr[i]).removeClass(navNodeClass);
            }
            $(navNodesAr[curIndex - 1]).addClass(navNodeClass);
            topNodesAr[curIndex - 1].style.display = '';
        }
        var setSwitchNode = function (topNodesAr, navNodesAr, topNode, navNode) {
            $(navNode).bind(eventType, function () {
                for (var i = 0; i < len; i++) {
                    topNodesAr[i].style.display = 'none';
                    $(navNodesAr[i]).removeClass(navNodeClass);
                }
                $(navNode).addClass(navNodeClass);
                topNode.style.display = 'block';
            });
        }
        var autoSetNav = function (topNodesAr, navNodesAr, curIndex, autoInterval) {
            window.setInterval(function () {
                if (curIndex >= len) {
                    curIndex = 0;
                }
                curIndex++;
                autoSet(topNodesAr, navNodesAr, curIndex);
            }, autoInterval);
        }
        if (autoInterval) {
            autoSetNav(topNodesAr, navNodesAr, curIndex, autoInterval);
        }
        for (var i = 0; i < len; i++) {
            setSwitchNode(topNodesAr, navNodesAr, topNodesAr[i], navNodesAr[i]);
        }
    }
    _Slide = function (conf) {
        conf = conf || {};
        this.callback = conf.callback || false;
        this.navLevel = conf.navLevel || 1;
        this.eventType = conf.eventType || 'mouseover';
        this.autoPlayInterval = conf.autoPlayInterval || 5 * 1000;
        this._play = true;
        this._timer = null;
        this._fadeTimer = null;
        this._container = $o(conf.container);
        this._panelWrapper = $o(conf.panelWrapper) || $(this._container).children()[0];
        this._sliders = $(this._panelWrapper).children();
        this._navWrapper = $o(conf.navWrapper) || $(this._panelWrapper).next()[0] || null;
        this._navs = (this._navWrapper && $(this._navWrapper).children()) || null;
        this._effect = conf.effect || 'scrollx';
        this._panelSize = (this._effect.indexOf("scrolly") == -1 ? conf.width : conf.height) || (this._effect.indexOf("scrolly") == -1 ? $($(this._panelWrapper).children()[0]).width() : $($(this._panelWrapper).children()[0]).height());
        this._count = conf.count || $(this._panelWrapper).children().length;
        this._navClassOn = conf.navClassOn || "on";
        this._target = 0;
        this._changeProperty = this._effect.indexOf("scrolly") == -1 ? "left" : "top";
        this.curIndex = 0;
        this.step = this._effect.indexOf("scroll") == -1 ? 1 : (conf.Step || 5);
        this.slideTime = conf.slideTime || 10;
        this.init();
        this.run(true);
    }
    _Slide.prototype = {init: function () {
        $(this._container).css("overflow", "hidden");
        $(this._container).css("position", "relative");
        $(this._panelWrapper).css("position", "relative");
        if (this._effect.indexOf("scrolly") == -1) {
            $(this._panelWrapper).css("width", this._count * (this._panelSize + 200) + "px");
            $(this._sliders).each(function (i, dom) {
                dom.style.styleFloat = dom.style.cssFloat = "left";
            });
        }
        else {
            $(this._panelWrapper).css("height", this._count * (this._panelSize + 200) + "px");
        }
        if (this._navs) {
            var _this = this;
            if (_this.eventType == 'click') {
                $(this._navs).each(function (i, el) {
                    el.onclick = (function (_this) {
                        return function () {
                            $(el).addClass(_this._navClassOn);
                            _this._play = false;
                            _this.curIndex = i;
                            _this._play = true;
                            _this.run();
                        }
                    })(_this)
                })
            } else {
                $(this._navs).each(function (i, el) {
                    el.onmouseover = (function (_this) {
                        return function () {
                            if (_this.navLevel == 1) {
                                $(el).addClass(_this._navClassOn);
                            }
                            else if (_this.navLevel == 2) {
                                var nav = $(el).children()[0];
                                $(nav).addClass(_this._navClassOn);
                            }
                            _this._play = false;
                            _this.curIndex = i;
                            _this.run();
                        }
                    })(_this);
                    el.onmouseout = (function (_this) {
                        return function () {
                            if (_this.navLevel == 1) {
                                $(el).removeClass(_this._navClassOn);
                            }
                            else if (_this.navLevel == 2) {
                                var nav = $(el).children()[0];
                                $(nav).removeClass(_this._navClassOn);
                            }
                            _this._play = true;
                            _this.run(false, true);
                        }
                    })(_this);
                });
            }
        }
        if (this._sliders) {
            $(this._sliders).each(function (i, e2) {
                e2.onmouseover = (function (_this) {
                    return function () {
                        _this._play = false;
                        _this.run();
                    }
                })(_this);
                e2.onmouseout = (function (_this) {
                    return function () {
                        _this._play = true;
                        _this.run(false, true);
                    }
                })(_this);
            });
        }
    }, run: function (isInit, noFade) {
        if (this.curIndex < 0) {
            this.curIndex = this._count - 1;
        } else if (this.curIndex >= this._count) {
            this.curIndex = 0;
        }
        this._target = -1 * this._panelSize * this.curIndex;
        var curImg = $(this._panelWrapper).find('img[init_src]').get(this.curIndex);
        if (curImg) {
            var src = curImg.getAttribute('init_src');
            curImg.setAttribute('src', src);
            $(curImg).removeAttr('init_src');
        }
        var _this = this;
        if (this._navs) {
            $(this._navs).each(function (i, el) {
                if (_this.curIndex == i) {
                    if (_this.navLevel == 1) {
                        $(el).addClass(_this._navClassOn);
                    }
                    else if (_this.navLevel == 2) {
                        var nav = $(el).children()[0];
                        $(nav).addClass(_this._navClassOn);
                    }
                }
                else {
                    if (_this.navLevel == 1) {
                        $(el).removeClass(_this._navClassOn);
                    }
                    else if (_this.navLevel == 2) {
                        var nav = $(el).children()[0];
                        $(nav).removeClass(_this._navClassOn);
                    }
                }
            })
        }
        this.scroll();
        if (this._effect.indexOf("fade") >= 0 && !noFade) {
            $(this._panelWrapper).css("opacity", isInit ? 0.5 : 0.1);
            this.fade();
        }
    }, scroll: function () {
        clearTimeout(this._timer);
        var _this = this, left = this._changeProperty, _cur_property = parseInt(this._panelWrapper.style[this._changeProperty]) || 0, _distance = (this._target - _cur_property) / this.step;
        if (Math.abs(_distance) < 1 && _distance != 0) {
            _distance = _distance > 0 ? 1 : -1;
        }
        if (_distance != 0) {
            this._panelWrapper.style[this._changeProperty] = (_cur_property + _distance) + "px";
            this._timer = setTimeout(function () {
                _this.scroll();
            }, this.slideTime);
        } else {
            if (this.callback)this.callback(_this.curIndex);
            this._panelWrapper.style[this._changeProperty] = this._target + "px";
            if (this._play) {
                this._timer = setTimeout(function () {
                    _this.curIndex++;
                    _this.run();
                }, this.autoPlayInterval);
            }
        }
    }, click_next: function () {
        var _this = this;
        _this.curIndex++;
        _this.run();
    }, click_pre: function () {
        var _this = this;
        _this.curIndex--;
        _this.run();
    }, fade: function () {
        var _opacity = $(this._panelWrapper).css("opacity");
        var _this = this;
        if (_opacity < 1) {
            $(this._panelWrapper).css("opacity", parseFloat(_opacity) + 0.02);
            setTimeout(function () {
                _this.fade();
            }, 1);
        }
    }}
    JIFEN.SlideView = function (el, conf) {
        conf = conf || {};
        conf.container = el;
        return new _Slide(conf);
    }
})(JIFEN);
window.switchNodes = JIFEN.switchNodes;
(function () {
    $('#v\\:top_login').click(function (evt) {
        openLoginWindow();
    });
    $('#v\\:top_logout').click(function (evt) {
        logout();
    });
    setTimeout(function () {
        JIFEN.hookHrefClick();
    }, 0);
    if ($.browser.msie) {
        setTimeout(function () {
            $("map").each(function (oMap) {
                $(oMap).click(function () {
                    JIFEN.clickHookCallBack();
                });
            });
        }, 0);
    }
    $(document).click(function (event) {
        var dom = $(event.target);
        if (dom.attr('name') == 'btn_close' || dom.hasClass('btn_pop_close')) {
            Pop.hidePop();
        }
    });
    if (JIFEN.isIe6) {
        document.execCommand("BackgroundImageCache", false, true);
    }
    var _osearch = $o('islistshow');
    if (_osearch != null && _osearch != undefined) {
        var _jsBeginlib = '<script type="text/javascript" src="', _jsEndlib = '"><\/script>';
        document.write([_jsBeginlib, 'http://imgcache.qq.com/club/cbjifen/v2/js/keyword_v2.js', _jsEndlib, _jsBeginlib, 'http://imgcache.qq.com/ac/club/caibei/pinyin_1.0.js', _jsEndlib, _jsBeginlib, 'http://imgcache.qq.com/club/go/webAPI/mall_map.js', _jsEndlib, _jsBeginlib, 'http://imgcache.qq.com/club/cbjifen/v2/js/search_v3.js', _jsEndlib].join(''));
    }
    function loadAndBindSearch() {
        $.getScript('http://imgcache.qq.com/club/cbjifen/v2/js/shop/search_shop.js', function () {
            window.loadSearch = true;
            $('#islistshow_new input[search="searchtext"]').each(function () {
                var that = $(this);
                var type = 'mall';
                try {
                    SearchSource.InitDic(that, type);
                } catch (e) {
                }
                type = that.attr('search_type');
                that.bind('focus', function () {
                    try {
                        SearchSource.InitDic(that, type);
                    } catch (e) {
                    }
                });
                that.bind('blur', function () {
                    try {
                        SearchSource.SearchBlur();
                    } catch (e) {
                    }
                });
                that.bind('keydown', function (event) {
                    try {
                        SearchSource.GoToUrl(event);
                    } catch (e) {
                    }
                });
                that.bind('keyup', function (event) {
                    try {
                        SearchSource.Search(event);
                    } catch (e) {
                    }
                });
                that.bind('webkitspeechchange', function (event) {
                    try {
                        SearchSource.Search(event);
                    } catch (e) {
                    }
                });
            });
        });
    }

    _osearch = $o('islistshow_new');
    if (_osearch != null && _osearch != undefined) {
        $.getScript('http://imgcache.qq.com/ac/club/caibei/pinyin_1.0.js');
        $.getScript('http://imgcache.qq.com/club/cbjifen/v2/js/shop/app/placeHolder.js', function () {
            window.loadActSource = false;
            window.loadCouponSource = false;
            window.loadSearch = false;
            window.loadMallMnt = false;
            $('.mod_search_hd').hover(function () {
                if (!window.loadSearch) {
                    if (typeof window.MallMnt === 'undefined' && window.loadMallMnt === false) {
                        window.loadMallMnt = true;
                        $.getScript('http://cb.qq.com/merchant/mall_online_info.php', function () {
                            loadAndBindSearch();
                        });
                    }
                    else {
                        loadAndBindSearch();
                    }
                }
                $('.mod_search_hd_sel', this).addClass('mod_search_hd_unfold');
                $('.mod_search_hdlist', this).show();
            }, function () {
                $('.mod_search_hd_sel', this).removeClass('mod_search_hd_unfold');
                $('.mod_search_hdlist', this).hide();
            });
            $('#mall_search_form input[search="searchtext"]').bind('focus', function () {
                if (!window.loadSearch) {
                    $('#islistshow_new').addClass('mod_search_hot');
                    if (typeof window.MallMnt === 'undefined' && window.loadMallMnt === false) {
                        window.loadMallMnt = true;
                        $.getScript('http://cb.qq.com/merchant/mall_online_info.php', function () {
                            loadAndBindSearch();
                        });
                    }
                    else {
                        loadAndBindSearch();
                    }
                }
            });
            $('.mod_search_hd .mod_search_hdlist a').click(function () {
                $('#isclicklistshow').hide();
                var show_form = $(this).attr('show_form');
                if (show_form === 'act_search_form' && !window.loadActSource) {
                    $.getScript('http://cb.qq.com/act_cmd.php?iCmd=400', function () {
                        window.loadActSource = true;
                    });
                }
                if (show_form === 'coupon_search_form' && !window.loadCouponSource) {
                    $.getScript('http://cb.qq.com/coupon/get_coupon.php?cmd=query_mall_coupon_num', function () {
                        window.loadCouponSource = true;
                    });
                }
                $('.mod_searchfull form').hide();
                $('.mod_searchfull form input[search="searchtext"]').val('');
                $('.mod_searchfull form input[name="mallid"]').val('');
                $o(show_form).style.display = 'block';
                mallPlace.setHolderPosition();
                couponPlace.setHolderPosition();
                actPlace.setHolderPosition();
                paipaiPlace.setHolderPosition();
            });
            $('#paipai_search_form,#coupon_search_form').submit(function () {
                var keyword = $.trim($(this).find('[hold="search_input"]').val());
                $(this).find('[name="keyword"]').val(encodeURIComponent(keyword));
                if (keyword == '') {
                    return false;
                }
                return true;
            });
            $('#coupon_search_form,#act_search_form,#mall_search_form').submit(function () {
                var mallid = $.trim($(this).find('#search_mallid').val());
                if (mallid == '') {
                    return false;
                }
                return true;
            })
            var placeObj = {labelMode: true, labelAlpha: true, idleOpacity: 0.6, holderOpacity: 0.6, setLeft: 1, setTop: 1}
            var mallPlace = new PlaceHolder($('#mall_searchtext'), 'mall_searchlabel', placeObj);
            var couponPlace = new PlaceHolder($('#coupon_searchtext'), 'coupon_searchlabel', placeObj);
            var actPlace = new PlaceHolder($('#act_searchtext'), 'act_searchlabel', placeObj);
            var paipaiPlace = new PlaceHolder($('#paipai_searchtext'), 'paipai_searchlabel', placeObj);
        });
    }
})();
window.getSimpleUsrInfo = JIFEN.getSimpleUsrInfo;
window.getDetailUsrInfo = JIFEN.getDetailUsrInfo;
window.openLoginWindow = JIFEN.openLoginWindow;
window.logout = JIFEN.logout;
(function (global) {
    var PAGE = function (conf) {
        var conf = conf || {};
        var tmp;
        this.PAGE_FRAGMENT_LEN = conf.pageFragmentNum || 5;
        tmp = conf.disPrePageClass || 'mod_pager_disable mod_pager_lblprev';
        this.DISABLED_PRE_PAGE_HTML = '<span class="' + tmp + '"><span>上一页</span></span>';
        tmp = conf.prePageClass || 'mod_pager_btnprev';
        this.PRE_PAGE_HTML_TPL = '<a class="' + tmp + '" href="javascript:[%=@cbFnName%];void(0);" title="上一页"><span>上一页</span></a>';
        tmp = conf.disNextPageClass || 'mod_pager_disable mod_pager_lblnext';
        this.DISABLED_NEXT_PAGE_HTML = '<span class="' + tmp + '"><span>下一页</span></span>';
        tmp = conf.nextPageClass || 'mod_pager_btnnext';
        this.NEXT_PAGE_HTML_TPL = '<a class="' + tmp + '" href="javascript:[%=@cbFnName%];void(0);" title="下一页"><span>下一页</span></a>';
        tmp = conf.curPageClass || 'on';
        this.CUR_PAGE_HTML_TPL = '<span class="' + tmp + '"><span>[%=@curPage%]</span></span>';
        tmp = conf.missPageClass || 'mod_pager_more';
        this.OMISSION_PAGE_HTML = '<span class="' + tmp + '"><span>…</span></span>';
        this.SCRIPT_CODE = 'var oInput=$(this).siblings(\'input\');if(!oInput) return;var page_num=oInput.val();if(page_num.length==0){alert(\'对不起，请您输入页码！\');oInput.focus();return;}page_num=parseInt(page_num,10);if(page_num==0){alert(\'对不起，您输入页码不正确！\');oInput.focus();return;} var totalPageNum=[%=@totalPage%];var regNumb=(/[^0-9]/g);if(!regNumb.test(page_num)){if(page_num>totalPageNum) {page_num=totalPageNum;};[%=@cbFnName%](page_num);}else{alert(\'对不起，您输入的页码不是数字，请重新输入！\');oInput.focus();return;}';
        tmp = conf.navPageClass || 'mod_pager_opts';
        tmp2 = conf.navPageGotoClass || 'mod_pager_goto';
        tmp3 = conf.navPageSubmitClass || 'mod_pager_btnsubmit';
        this.PAGENAV_OPTION_HTML = '<p class="' + tmp + '"><span class="' + tmp2 + '">到<input type="text" name="PageCount" />页 <a class="' + tmp3 + '" onclick="javascript:' + this.SCRIPT_CODE + ';"><span>确定</span></a></span></p>';
        this._curLoginUin = -1;
        this.PAGE_HTML_TPL = '<a href="javascript:[%=@cbFnName%];void(0);" title="[%=@page%]"><span>[%=@page%]</span></a>';
    };
    PAGE.prototype = {init: function (totalPage, pageNav, cbFnName) {
        this.totalPage = totalPage < 1 ? 1 : totalPage;
        this.pageNavElement = ($.type(pageNav) == 'string') ? $(pageNav) : pageNav;
        this.cbFnName = ($.type(cbFnName) == 'string') ? cbFnName : '';
    }, show: function (curPage) {
        curPage = curPage < 1 ? 1 : (curPage > this.totalPage ? this.totalPage : curPage);
        var fragmentBegIndex, fragmentEndIndex;
        if (this.totalPage <= this.PAGE_FRAGMENT_LEN) {
            fragmentBegIndex = 1;
            fragmentEndIndex = this.totalPage;
        }
        else {
            if (curPage < (Math.ceil(this.PAGE_FRAGMENT_LEN / 2) + 1)) {
                fragmentBegIndex = 1;
                fragmentEndIndex = this.PAGE_FRAGMENT_LEN;
            } else if (curPage > (this.totalPage - Math.floor(this.PAGE_FRAGMENT_LEN / 2))) {
                fragmentBegIndex = (this.totalPage - this.PAGE_FRAGMENT_LEN + 1);
                fragmentEndIndex = this.totalPage;
            } else {
                fragmentBegIndex = (curPage - Math.ceil(this.PAGE_FRAGMENT_LEN / 2) + 1);
                fragmentEndIndex = (curPage + Math.floor(this.PAGE_FRAGMENT_LEN / 2));
            }
        }
        var first = '';
        if (fragmentBegIndex == 1) {
            first = '';
        } else if (fragmentBegIndex == 2) {
            first = this.PAGE_HTML_TPL.replace(/\[%=@page%\]/g, '1').replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(1)');
        }
        else {
            first = this.PAGE_HTML_TPL.replace(/\[%=@page%\]/g, '1').replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(1)') + this.OMISSION_PAGE_HTML;
        }
        var last = '';
        if (fragmentEndIndex == this.totalPage) {
            last = '';
        }
        else if (fragmentEndIndex == (this.totalPage - 1)) {
            last = this.PAGE_HTML_TPL.replace(/\[%=@page%\]/g, this.totalPage).replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(' + this.totalPage + ')');
        }
        else {
            last = this.OMISSION_PAGE_HTML + this.PAGE_HTML_TPL.replace(/\[%=@page%\]/g, this.totalPage).replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(' + this.totalPage + ')');
        }
        var szHTML = [];
        szHTML.push('<p class="mod_pager_main">');
        if (curPage > 1) {
            var preNum = curPage - 1;
            var prePage = this.PRE_PAGE_HTML_TPL.replace(/\[%=@prePage%\]/g, preNum).replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(' + preNum + ')');
            szHTML.push(prePage);
        }
        else {
            szHTML.push(this.DISABLED_PRE_PAGE_HTML);
        }
        szHTML.push('<span class="mod_pager_n">');
        szHTML.push(first);
        for (var i = fragmentBegIndex; i <= fragmentEndIndex; i++) {
            if (i == curPage) {
                szHTML.push(this.CUR_PAGE_HTML_TPL.replace(/\[%=@curPage%\]/g, curPage));
            }
            else {
                szHTML.push(this.PAGE_HTML_TPL.replace(/\[%=@page%\]/g, i).replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(' + i + ')'));
            }
        }
        szHTML.push(last);
        szHTML.push('</span>');
        if (curPage < this.totalPage) {
            var nextNum = curPage + 1;
            var nextPage = this.NEXT_PAGE_HTML_TPL.replace(/\[%=@nextPage%\]/g, nextNum).replace(/\[%=@cbFnName%\]/g, this.cbFnName + '(' + nextNum + ')');
            szHTML.push(nextPage);
        } else {
            szHTML.push(this.DISABLED_NEXT_PAGE_HTML);
        }
        szHTML.push('</p>');
        szHTML.push(this.PAGENAV_OPTION_HTML.replace(/\[%=@cbFnName%\]/g, this.cbFnName).replace(/\[%=@totalPage%\]/g, this.totalPage));
        this.pageNavElement.html(szHTML.join('&nbsp;'));
    }}
    global.PAGE = PAGE;
})(window);
JIFEN.Share = {onSuccess: function (data) {
    if (data.JSON.ret == JIFEN.CONST_RET_OK) {
        alert('分享成功！');
    }
    else {
        alert('服务器忙，请稍后重试。');
    }
}, tpl: '<div class="mod_pop pop_share" style="display:none" id="div_like">\
        <div class="mod_pop_wrap" style="top: 150px; width: 507px;">\
            <div class="mod_pop_hd">\
                <h3>分享活动</h3>\
                <a title="关闭弹出层" href="javascript:void(0);" class="btn_pop_close" name="btn_close" close_id="div_like">X</a>\
            </div>\
            <div class="mod_pop_bd">\
                <div class="act_mod_share">\
                    <div class="act_mod_share_hd">\
                        <p>{help}</p>\
                        <strong>我想说：</strong>\
                        <label id="v:like_label" for="v:like_say" style="position:absolute;color:graytext;cursor:text;margin:2px 0 0 8px"></label>\
                        <input id="v:like_say" value="{say}" type="text" class="bd0 c_sub1" placeholder="您还能输入87个字" />\
                    </div>\
                    <div class="act_mod_share_bd">\
                        <div class="act_mod_share_quote">\
                            <h4 id="v:like_title">{title}</h4>\
                            <p class="act_rel">\
                                <a id="v:like_url" href="{url}" target="_blank">{url}</a>\
                            </p>\
                        </div>\
                        <div class="act_avatar" style="display:{show_img}">\
                            <img id="v:like_img" src="{img}" width="{width}" height="{height}" />\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="mod_pop_ft mod_pop_ft_e5e5e5">\
                <div class="col_l mod_snsshare mod_snsshare_B">\
                    <div class="mod_snsshare_bd">\
                        <label class="mod_lblrbx lbl_txt">{appendtxt}</label>\
                        {friend}\
                    </div>\
                </div>\
                <a class="col_r btn_pop_em" href="javascript:void(0);" id="v:share"><span>{btn}</span></a>\
            </div>\
        </div>\
    </div>', gTContent: {}, createHtml: function (conf) {
    var defaults = {help: '', title: '#喜欢QQ彩贝#拾味生活，贝添色彩', say: '', url: 'http://cb.qq.com/', img: '', btn: '立即分享', flag: '12', friend: {}, width: 200, height: 120};
    this.gTContent = $.extend({}, defaults, conf || {});
    this.successCb = conf.onSuccess || this.onSuccess;
    if (!$o('div_like')) {
        var hasFriendParam = false;
        var sFriendHtml = '';
        var sAddFriendTpl = '<label class="mod_lblrbx">\
                <input name="add_friend" value="{id}" id="{id}" type="checkbox" checked="checked"  />\
                <label for="{id}">{name}</label>\
                </label>';
        for (var id in this.gTContent.friend) {
            sFriendHtml += js_strtr(sAddFriendTpl, {'{id}': id, '{name}': this.gTContent.friend[id]});
            hasFriendParam = true;
        }
        if (!hasFriendParam) {
            sFriendHtml = '<label class="mod_lblrbx">\
                        <input id="v:like_weibo" type="checkbox" checked="checked"  />\
                        <span title="腾讯微博" class="ico_gb ico_sns ico_sns_wb"><span>腾讯微博</span></span>\
                    </label>\
                    <label class="mod_lblrbx">\
                        <input id="v:like_qzone" type="checkbox" checked="checked"  />\
                        <span title="QQ空间" class="ico_gb ico_sns ico_sns_qz"><span>QQ空间</span></span>\
                    </label>\
                    <label class="mod_lblrbx lbl_tip">\
                        分享成功后，好友动态将会显示本条信息\
                    </label>';
        }
        var oDiv = document.createElement('DIV');
        oDiv.innerHTML = js_strtr(this.tpl, {'{help}': this.gTContent.help, '{title}': this.gTContent.title, '{say}': this.gTContent.say, '{url}': this.gTContent.url, '{img}': this.gTContent.img, '{btn}': this.gTContent.btn, '{appendtxt}': hasFriendParam ? '收听：' : '分享到：', '{friend}': sFriendHtml, '{show_img}': this.gTContent.img ? '' : 'none', '{width}': this.gTContent.width, '{height}': this.gTContent.height});
        document.body.appendChild(oDiv);
        $('#v\\:share').click(function () {
            JIFEN.Share.share();
        });
        if (!hasFriendParam) {
            $('#v\\:like_weibo,#v\\:like_qzone').click(function () {
                JIFEN.Share.checkShareType();
            });
        }
    }
}, smartLen: function (str) {
    str = str.replace(new RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi"), '充填充填充填充填充填充');
    return Math.ceil(($.trim(str.replace(/[^\u0000-\u00ff]/g, "aa")).length) / 2);
}, smartCut: function (str, maxLen) {
    maxLen = maxLen || 140;
    if (this.smartLen(str) <= maxLen) {
        return;
    }
    else {
        for (var i = 0, l = str.length; i < l; i++) {
            var tempStr = str.substr(0, i);
            if (this.smartLen(tempStr) >= maxLen) {
                return tempStr;
            }
        }
        return str;
    }
}, getShareType: function () {
    var like_weibo = $o('v:like_weibo');
    var like_qzone = $o('v:like_qzone');
    if (like_weibo && like_qzone) {
        if (like_weibo.checked && like_qzone.checked) {
            return'12';
        } else if (like_weibo.checked) {
            return'1';
        } else if (like_qzone.checked) {
            return'2';
        }
    }
    return this.gTContent.flag;
}, checkShareType: function () {
    var like_weibo = $o('v:like_weibo');
    var like_qzone = $o('v:like_qzone');
    if (like_weibo && like_qzone) {
        if (!like_weibo.checked && !like_qzone.checked) {
            $o('v:share').className = 'col_r btn_pop_dis';
            return false;
        } else {
            $o('v:share').className = 'col_r btn_pop_em';
            return true;
        }
    }
    return true;
}, show: function (conf) {
    this.createHtml(conf);
    Pop.showPop('div_like', {noShake: true});
}, share: function () {
    if (!JIFEN.Share.checkShareType())return;
    var shareType = this.getShareType();
    var leftLen = 140 - this.smartLen(this.gTContent.title + this.gTContent.url);
    var say = $o('v:like_say').value;
    say = (this.smartLen(say) > leftLen) ? this.smartCut(say, leftLen - 10) : say;
    var friends = [];
    $('#div_like [name=add_friend]:checked').each(function () {
        friends.push(this.value);
    });
    setTimeout(function () {
        Pop.hidePop();
    }, 100);
    var param = {title: $o('v:like_title').innerHTML, url: $o('v:like_url').innerHTML, content: say, pic: $('#v\\:like_img').attr('src'), add_friend: friends.join(','), flag: shareType};
    document.domain = 'qq.com';
    var oFormSender = new jQuery.cb.formSender('http://cb.qq.com/share_to_weibo.php?g_tk=' + $.CSRF(), 'POST', param, 'utf-8');
    oFormSender.onSuccess = this.successCb;
    oFormSender.send();
}};
JIFEN.Clipboard = {version: "1.0.0", clients: {}, moviePath: 'http://imgcache.qq.com/club/cbjifen/v2/video/clipboard/Clipboard.swf', nextId: 1, setMoviePath: function (path) {
    this.moviePath = path;
}, dispatch: function (id, eventName, args) {
    var client = this.clients[id];
    if (client) {
        client.receiveEvent(eventName, args);
    }
}, register: function (id, client) {
    this.clients[id] = client;
}, getDOMObjectPosition: function (obj, stopObj) {
    var info = {left: 0, top: 0, width: obj.width ? obj.width : obj.offsetWidth, height: obj.height ? obj.height : obj.offsetHeight};
    while (obj && (obj != stopObj)) {
        info.left += obj.offsetLeft;
        info.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return info;
}, Client: function (elem) {
    this.handlers = {};
    this.id = Clipboard.nextId++;
    this.movieId = 'ClipboardMovie_' + this.id;
    Clipboard.register(this.id, this);
    if (elem)this.glue(elem);
}};
JIFEN.Clipboard.Client.prototype = {id: 0, ready: false, movie: null, clipText: '', handCursorEnabled: true, cssEffects: true, handlers: null, glue: function (elem, appendElem) {
    this.domElement = $o(elem);
    var zIndex = 99;
    if (this.domElement.style.zIndex) {
        zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
    }
    if (typeof(appendElem) == 'string') {
        appendElem = $o(appendElem);
    }
    else if (typeof(appendElem) == 'undefined') {
        appendElem = document.getElementsByTagName('body')[0];
    }
    var box = Clipboard.getDOMObjectPosition(this.domElement, appendElem);
    this.div = document.createElement('div');
    var style = this.div.style;
    style.position = 'absolute';
    style.left = '' + box.left + 'px';
    style.top = '' + box.top + 'px';
    style.width = '' + box.width + 'px';
    style.height = '' + box.height + 'px';
    style.zIndex = zIndex;
    appendElem.appendChild(this.div);
    this.div.innerHTML = this.getHTML(box.width, box.height);
}, getHTML: function (width, height) {
    var html = '';
    var flashvars = 'id=' + this.id + '&width=' + width + '&height=' + height;
    if ($.browser.msie) {
        var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
        html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + Clipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
    }
    else {
        html += '<embed id="' + this.movieId + '" src="' + Clipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
    }
    return html;
}, hide: function () {
    if (this.div) {
        this.div.style.left = '-2000px';
    }
}, show: function () {
    this.reposition();
}, destroy: function () {
    if (this.domElement && this.div) {
        this.hide();
        this.div.innerHTML = '';
        var body = document.getElementsByTagName('body')[0];
        try {
            body.removeChild(this.div);
        } catch (e) {
            ;
        }
        this.domElement = null;
        this.div = null;
    }
}, reposition: function (elem) {
    if (elem) {
        this.domElement = $o(elem);
        if (!this.domElement)this.hide();
    }
    if (this.domElement && this.div) {
        var box = Clipboard.getDOMObjectPosition(this.domElement);
        var style = this.div.style;
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
    }
}, setText: function (newText) {
    this.clipText = newText;
    if (this.ready)this.movie.setText(newText);
}, addEventListener: function (eventName, func) {
    eventName = eventName.toString().toLowerCase().replace(/^on/, '');
    if (!this.handlers[eventName])this.handlers[eventName] = [];
    this.handlers[eventName].push(func);
}, setHandCursor: function (enabled) {
    this.handCursorEnabled = enabled;
    if (this.ready)this.movie.setHandCursor(enabled);
}, receiveEvent: function (eventName, args) {
    eventName = eventName.toString().toLowerCase().replace(/^on/, '');
    switch (eventName) {
        case'load':
            this.movie = $o(this.movieId);
            if (!this.movie) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 1);
                return;
            }
            if (!this.ready && $.browser.mozilla && navigator.userAgent.match(/Windows/)) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 100);
                this.ready = true;
                return;
            }
            this.ready = true;
            this.movie.setText(this.clipText);
            this.movie.setHandCursor(this.handCursorEnabled);
            break;
    }
    if (this.handlers[eventName]) {
        for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
            var func = this.handlers[eventName][idx];
            if (typeof(func) == 'function') {
                func(this, args);
            }
            else if ((typeof(func) == 'object') && (func.length == 2)) {
                func[0][func[1]](this, args);
            }
            else if (typeof(func) == 'string') {
                window[func](this, args);
            }
        }
    }
}};
JIFEN.Clipboard.init = function (txt, clipContainer, clipBtn, callBack) {
    var clip = new JIFEN.Clipboard.Client();
    clip.setHandCursor(true);
    clip.glue(clipContainer, clipBtn);
    clip.setText(txt);
    if ($.isFunction(callBack)) {
        clip.addEventListener('complete', function () {
            setTimeout(callBack, 0);
        });
    }
}
window.Clipboard = JIFEN.Clipboard;
JIFEN.setSlideAd = function (conf) {
    conf = conf || '';
    var classname = conf.classname || 'mi_act';
    var actid = conf.actId || 199;
    var _width = conf.width || 112;
    var _height = conf.height || 227;
    var _top = conf.top || 170;
    var _marginRight = conf.marginRight || -612;
    var _direction = conf.direction || 'right';
    var _marginLeft = conf.marginLeft || -612;
    var _zIndex = conf.zIndex || 0;
    $.ajax({url: "http://cb.qq.com/shop/mall.php?callback=?", data: {iCmd: 200, iActId: actid, g_tk: $.CSRF()}, dataType: "json", timeout: JIFEN.gTimeout, success: function (data) {
        if (JIFEN.CONST_RET_OK == data.iRet) {
            var actData = eval('(' + data.sResult + ')');
            actData.aContent = eval('(' + actData.sContent.replace(/[\r\n]/g, '').replace(/,\}/g, '}').replace(/,\]/g, ']') + ')');
            if (!actData.aContent.adPicUrl || !actData.aContent.adLinkUrl)return;
            var oAdNav = document.createElement('a');
            oAdNav.style.cssText = 'position:fixed;_position:absolute;width:' + _width + 'px;height:' + _height + 'px;top:' + _top + 'px;background:url("' + decodeURIComponent(actData.aContent.adPicUrl) + '") no-repeat;';
            if (_direction == 'right') {
                $(oAdNav).css('right', '50%');
                $(oAdNav).css('margin-right', _marginRight + 'px');
            }
            else if (_direction == 'left') {
                $(oAdNav).css('left', '50%');
                $(oAdNav).css('margin-left', _marginLeft + 'px');
            }
            if (_zIndex) {
                $(oAdNav).css('z-index', _zIndex);
            }
            if (JIFEN.isIe6) {
                $(window).bind('scroll', function () {
                    var _scrollTop = parseInt($(document).scrollTop()) + _top;
                    $(oAdNav).css({'position': 'absolute', 'top': _scrollTop + 'px'});
                })
            }
            var _title = actData.aContent.sName || '';
            oAdNav.setAttribute('href', actData.aContent.adLinkUrl.replace(/&amp;/g, '&'));
            oAdNav.setAttribute('title', _title);
            oAdNav.setAttribute('target', 'blank');
            document.body.appendChild(oAdNav);
        }
    }});
}
var showSlideAdPages = {'/': {'actId': 212}, '/jzy/': {'marginRight': -625, 'top': 405, 'actId': 211}, '/201212/appbox/': {'actId': 199}, '/my/my_jifen_source.html': {'actId': 199}, '/201212/ttd/': {'marginRight': -625, 'actId': 212}, '/shop/topic.html': {'direction': 'left', 'actId': 199}, '/jifen/': {'marginRight': -612, 'top': 123, 'actId': 212, 'zIndex': 10}}
setTimeout(function () {
    var pathname = location.pathname;
    var hostname = location.hostname;
    if (!(hostname == 'cb.qq.com' || hostname == 'act.cb.qq.com')) {
        return;
    }
    for (var key in showSlideAdPages) {
        var _i = key, _j = _i + 'index.html';
        if (pathname == _i || pathname == _j) {
            JIFEN.setSlideAd(showSlideAdPages[key]);
        }
    }
}, 0)
/*  |xGv00|09d97230aed5a8093f9288cb2f66f239 */