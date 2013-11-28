Timeline.importGuide = (function () {
    var HTML_GUIDE = '<div class="guide_steps" id="guide_steps"><div class="steps_pic"><ul><li class="step_1"style="display:block;"><h2>从出生开始</h2><div class="birthday"id="guide_birthday"></div><p>时光从生命的起点开始，点缀着记忆的片段</p><div class="step_help"><i class="ui_icon icon_step_help"></i><div class="help_txt">时光轴的起点是你在个人档里设置的生日,如果生日设置为隐藏，他人也不会看到你生日的具体日期。</div></div></li><li class="step_2"><h2>重大事件</h2><p>记忆中，有最美的风景，也一定有那些最重要的人</p><div class="step_help"><i class="ui_icon icon_step_help"></i><div class="help_txt">生活笔记里可以记录自己过往或现在的大部分场景，这里全是你的精彩。</div></div></li><li class="step_3"><h2>随笔和签到表情导入</h2><p>这些记忆，时而快乐，时而伤感；都是珍藏的幸福</p><div class="step_help"><i class="ui_icon icon_step_help"></i><div class="help_txt">之前的原创内容我们会为你导入，日常的想法也请记在随笔里面。</div></div></li><li class="step_4"><h2>多种皮肤记录你的心情</h2><p>多款精美背景皮肤可供选择，展示属于你的时光背景</p><div class="step_help"><i class="ui_icon icon_step_help"></i><div class="help_txt">时光轴的背景是我们准备的一个有意思的功能，用不同的图画表达不同时代的心声。</div></div></li><li class="step_5"><h2>多种皮肤记录你的心情</h2><p>多款精美背景皮肤可供选择，展示属于你的时光背景</p><a href="javascript:void(0)"class="btn_guide"title="进入时光轴"id="btn_enter"style="display:none;">进入时光轴</a><a href="javascript:void(0)"class="btn_guide"style="display:none;"title="刷新"id="btn_refresh">刷新</a><a href="javascript:void(0)" onclick="return false" class="btn_guide" title="进入" id="btn_enter_timeline">进入</a></li></ul></div><a href="javascript:void(0)"class="steps_arrows steps_prev"id="steps_prev"></a><a href="javascript:void(0)"class="steps_arrows steps_next"id="steps_next"></a><div class="guide_tips" id="guide_tips"></div></div>';
    var HTML_BIRTHDAY = '<%if(hasBirth){%><%=data.year%>年<%=data.month%>月<%=data.day%>日[<%=lunarDate.cYear%>年(<%=lunarDate.aYear%>年)<%if(lunarDate.lMonth!="undefined月"){%>&nbsp;<%=lunarDate.lMonth%><%=lunarDate.lDay%><%}%><%if(lunarDate.solarTerm){%>&nbsp;<%=lunarDate.solarTerm%><%}%><%if(lunarDate.sFestival){%>&nbsp;<%=lunarDate.sFestival%><%}%><%if(lunarDate.lFestival){%>&nbsp;<%=lunarDate.lFestival%><%}%>]<%}else{%>我出生了<%}%>';
    var MAX_STEP = 4;
    var HINT_PREPARING = "我们正在为您准备数据，请耐心等待...";
    var HINT_QUOTA_FULL = "名额已满，明天请早...";
    var HINT_NEW = '您时光轴上的历史数据正在逐步添加……';
    var REFRESH_COUNTDOWN = 5;
    var _curStep = 0;
    var _ownerUin = QZONE.FP.getQzoneConfig().ownerUin;
    var _loginUin = QZONE.FP.getQzoneConfig().loginUin;
    var _mask = null;
    var _divGuide;
    var _canRefresh = true;
    var _isOwner = QZONE.FP.getQzoneConfig('isOwner');

    function _goNext() {
        if (_curStep + 1 > MAX_STEP) {
            return;
        }
        _goStep(_curStep + 1);
    };
    function _goPrev() {
        if (_curStep - 1 < 0) {
            return;
        }
        _goStep(_curStep - 1);
    };
    function _goStep(aStep) {
        _curStep = aStep;
        QZFL.object.each([0, 1, 2, 3, 4], function (i) {
            $e(".step_" + (i + 1)).setStyle("display", _curStep == i ? "block" : "none");
        })
        if (_curStep == 0) {
            $("steps_prev").className = "steps_arrows steps_prev steps_prev_disabled";
        } else if (_curStep == MAX_STEP) {
            $("steps_next").className = "steps_arrows steps_next steps_next_disabled";
        } else {
            $("steps_prev").className = "steps_arrows steps_prev";
            $("steps_next").className = "steps_arrows steps_next";
        }
        if (_curStep == MAX_STEP && _canRefresh) {
        }
    };
    function _refreshTimer(cntDown) {
        if (cntDown != 0) {
            $("btn_refresh").innerHTML = "请稍等(" + cntDown + ")...";
            cntDown--;
            setTimeout(function () {
                _refreshTimer(cntDown);
            }, 1000);
        } else {
            $("btn_refresh").className = "btn_guide";
            $("btn_refresh").innerHTML = "刷新";
            $("btn_refresh").disabled = false;
        }
    }

    function _refresh() {
        var data = {rnd: Math.random()}
        $("btn_refresh").className = "btn_guide_disabled";
        $("btn_refresh").disabled = true;
        Timeline.utils.dataLoader("http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + Timeline.CONST.CGI_GET_STATE, data, function (o) {
            if (o.state != Timeline.CONST.STATE_INITIALED) {
                $e("#btn_enter").hide();
                $e("#btn_refresh").show();
                _refreshTimer(REFRESH_COUNTDOWN);
            } else {
                $e("#btn_enter").show();
                $e("#btn_refresh").hide();
            }
        }, function () {
            _refreshTimer(REFRESH_COUNTDOWN);
        });
    }

    function _enter() {
        location.reload(true);
    }

    function _setFeedsData() {
        var data = {rnd: Math.random()}
        Timeline.utils.dataLoader("http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + Timeline.CONST.CGI_GET_FEEDS_DATA, data, function (o) {
            QZFL.object.each(o.data, function (item) {
                var year, month;
                year = 1900 + parseInt(item.offset / 12);
                month = item.offset % 12 + 1;
                Timeline.core.updateSummary({year: year, month: month, count: item.num});
            });
            Timeline.core.isOwnerMode = function () {
                return false;
            }
            var div = document.createElement('div');
            div.id = 'timeline_fixed_container';
            div.className = 'lay_tml_fixed';
            $('layBackground') ? document.body.insertBefore(div, $('layBackground')) : document.body.appendChild(div);
            Timeline.summary.init(QZFL.dom.createElementIn('div', div, false, {className: 'tml_scrubber', style: 'left:' + (QZFL.dom.getRect($('timelineContent')).left) + 'px;'}), Timeline.core.getSummaryData());
            Timeline.summary.refreshView();
            setTimeout(function () {
                Timeline.summary.fixPos(true)
            }, 200);
            Timeline.line.init();
            Timeline.profile.init();
            Timeline.line.setStageBG("/qzone_v6/proj_timeline/img/tml_default_bgs/11.jpg");
            if (_isOwner) {
                $e('#post_area').show();
                Timeline.post = new Timeline.Post($('post_area'), {type: 1});
                Timeline.post2 = new Timeline.Post($('post_area_float'), {type: 2});
                Timeline.Post.addEvent("onAdded", function (o, opt) {
                    Timeline.UI.addEventToView(o, opt);
                });
                Timeline.Post.addEvent("onBeginAdd", function () {
                    Timeline.line.setEditStatus(true);
                });
                Timeline.Post.addEvent("onEndAdd", function () {
                    Timeline.line.setEditStatus(false);
                });
                Timeline.Post.addEvent("onSetBGLocked", function (blnLocked) {
                    _setBGLocked(!!blnLocked);
                });
                TCISD.pv('timeline.qzone.qq.com', 'Timeline_master_guide');
            } else {
                TCISD.pv('timeline.qzone.qq.com', 'Timeline_guest_guide');
            }
            QZONE.qzEvent.addEventListener("QZ_SCROLL", function () {
                Timeline.summary.fixPos();
            });
            QZFL.object.each(o.event, function (item) {
                item.readOnly = true;
                Timeline.core.addEventData(item);
            });
            Timeline.UI.appendEvents(Timeline.core.getCurEventData());
        }, function () {
        });
    }

    function _initGuide() {
        _mask = QZFL.maskLayout.create(350, document, {opacity: 0.8});
        QZFL.maskLayout.getRef().style.filter = 'alpha(opacity=80)';
        $e(document.body).addClass("novice_guide");
        _divGuide = QZFL.dom.createElementIn("div", document.body, true, {"class": "tml_fixed", "style": "z-index:380;"});
        _divGuide.innerHTML = HTML_GUIDE;
        document.body.style.top = document.body.style.marginTop = "0px";
        $("guide_steps").style.marginTop = Math.max(Math.round((QZFL.dom.getClientHeight() - 400) / 2), 160) + "px";
        $e("#guide_birthday").setHtml(tmpl(HTML_BIRTHDAY, Timeline.core.getBirthday()));
        $e(".step_help").onHover(function () {
            $e(this).addClass("step_help_hover")
        }, function () {
            $e(this).removeClass("step_help_hover")
        });
        $e("#steps_prev").onClick(_goPrev);
        $e("#steps_next").onClick(_goNext);
        $e("#btn_enter").onClick(_enter);
        $e("#btn_refresh").onClick(_refresh);
        $e("#btn_enter_timeline").onClick(function () {
            QZONE.FP.noShareDb.set('TimelineNovicePageGuided' + _loginUin, '1');
            _enter();
        });
        _goStep(0);
    }

    function _close() {
        if (_mask != null) {
            QZFL.maskLayout.remove();
        }
        $e(document.body).removeClass("novice_guide");
        if (_divGuide) {
            _divGuide.innerHTML = "";
            QZFL.dom.removeElement(_divGuide);
            _divGuide = null;
        }
    }

    function _init(aState) {
        QZFL.css.addClassName($("timelineContent"), "tml_guest");
        QZFL.dom.setStyle($("loadingHint"), {"display": "none"});
        QZFL.dom.setStyle($("timelineContent"), {"display": ""});
        if (_isOwner) {
            _initGuide();
        }
        if (aState == Timeline.CONST.STATE_NODATA) {
            Timeline.utils.dataSender("http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + Timeline.CONST.CGI_APPLY_APP, {}, function (o) {
                if (_isOwner) {
                }
            }, function (o) {
                if (_isOwner) {
                }
            }, {showTips: false});
        } else if (aState == Timeline.CONST.STATE_INITIALING) {
            if (_isOwner) {
            }
        }
        if (_isOwner) {
            $("guide_tips").innerHTML = HINT_NEW;
        }
        _setFeedsData();
        QZONE.qzEvent.addEventListener("QZ_JUMP_ENTER_APP", _close);
        QZONE.qzEvent.addEventListener("QZ_JUMP_ENTER_BASE_APP", _close);
    }

    return{init: _init, close: _close}
})();
Timeline.importGuide = QZFL.object.extend(Timeline.importGuide, PAGE_EVENT);
Timeline.importGuide.addEvent("onInitGuide", function (aState) {
    Timeline.importGuide.init(aState);
});
/*  |xGv00|cad72539b68f4c609995316ac7878c9f */