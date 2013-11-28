define(function (require, exports) {
    var $ = require('jquery');
    var actLib = require('app/v2/js/act/actLib/1.0.0/actLib');
    var _ = require('ac/gallery/underscore/1.4.2/underscore');
    window.showDialog = require('ac/showDialog/showDialog-1.0');
    var login = actLib.login;
    var quickLogin = actLib.quickLogin;
    var token = actLib.csrf.getToken();
    var FormSender = actLib.FormSender;
    var gCgiUrl = 'http://act-cgi.cb.qq.com/201310/zx/zx_cmd.php';
    var isIe6 = $.browser.msie && parseInt($.browser.version) < 7;
    var isLogin = false;
    var BANNER_TIME = 300;
    var CARD_STEP = 1;
    var CARD_WIDTH = 980;
    window.TGDialogS = function (e) {
        showDialog.show({id: e, bgcolor: "#000000", opacity: 70});
    };
    var showMsg = function (content, title, type) {
        title && $("#msg_title").html(title);
        $("#msg_content").html(content);
        if (type && type == 'cd') {
            $("a.close", $("#msg_box")).attr("onclick", "");
            $("div.confirm", $("#msg_box")).html('');
            var count = 6;
            setInterval(function () {
                count--;
                $("#count_down").html(count);
                if (count == 0) {
                    location.href = "http://cb.qq.com";
                }
            }, 1000);
        }
        TGDialogS('msg_box');
    }
    var share = function () {
        if (!$("#share").attr("checked")) {
            return;
        }
        var param = {title: '#办卡赢取580元礼品啦#中信QQ彩贝卡是全球第一张可以线上线下均可累积彩贝积分的信用卡，还有9元看电影，星巴克五折等丰富特权。开卡并首刷即可领取最高价值580元礼包哦。快来看看。', url: 'http://act.cb.qq.com/201310/zx/index.html', content: '', pic: 'http://imgcache.qq.com/vipstyle/caibei/v3/act/131008_zx_caibei/images/share.jpg', add_friend: '', flag: '12'};
        document.domain = 'qq.com';
        var oFormSender = new FormSender('http://cb.qq.com/share_to_weibo.php?g_tk=' + token, 'POST', param, 'utf-8');
        oFormSender.onSuccess = function (data) {
        };
        oFormSender.send();
    }
    var receive = function () {
        if (!isLogin) {
            quickLogin.open();
            return;
        }
        var objParam = {iCmd: 100, g_tk: token}
        $.ajax({url: gCgiUrl, data: objParam, dataType: 'jsonp', success: function (data) {
            var iRet = parseInt(data.iRet);
            switch (iRet) {
                case 0:
                    showMsg('<p align="left" style="padding-left:80px">恭喜！您已经成功领取礼品。</p>' + '<p>&nbsp;</p><p align="left" style="padding-left:80px">礼品发放说明：</p>' + '<p align="left" style="padding-left:80px">实物礼品将于20个工作日内寄送到到您申请信用卡时的单位地址。</p>' + '<p align="left" style="padding-left:80px">虚拟礼品将直接发放到您的彩贝账户。<a href="http://cb.qq.com/my/my_lottery.html" target="_blank">去查看&gt;&gt;</a></p>');
                    share();
                    break;
                case-1001:
                    quickLogin.open();
                    break;
                case-10002:
                    showMsg('<p align="left" style="padding-left:80px">对不起,您还没有通过本活动办理中信QQ彩贝卡。<a href="https://cb.qq.com/bank/citic/session.php?cardtype=KPQQCB02" target="_blank">去办卡&gt;&gt;</a></p>' + '<p align="left" style="padding-left:80px;padding-top:10px;">1）如果您已经通过本活动提交办卡资料，请于卡片申请成功后刷卡消费一次再来领取哦。</p>' + '<p align="left" style="padding-left:80px">2）如果您已经成功办理卡片，请刷卡消费一次后，再来本页面领取。</p>' + '<p align="left" style="padding-left:80px">3）领取时间说明：当日22:00前刷卡消费，请在刷卡消费后次日18:00后来本页面领取。当日22：00之后刷卡消费，请于第三日18:00后来本页面领取。</p>');
                    break;
                case-10003:
                    showMsg('<p align="left" style="padding-left:80px; padding-right:10px">对不起，您还没有刷卡记录。请在拿到卡片后任意刷卡消费一次，次日即可领取奖品哦。<a href="http://cb.qq.com/shop/?attach=100.1010.00.000.00" target="_blank">去消费&gt;&gt;<a></p>');
                    break;
                case 7101:
                    showMsg('非常抱歉！本活动正在升级中，请稍后再来参加。');
                    break;
                case 7102:
                    showMsg('抱歉！本活动已结束，<span id="count_down">6</span>秒钟跳转到QQ彩贝首页。', '温馨提示', 'cd');
                    break;
                case 7103:
                    showMsg('活动礼包已经领完，请关注QQ彩贝其他活动 <a href="http://cb.qq.com/active_main_board.html" class="c_gre">Go>></a>');
                    break;
                case 7105:
                    showMsg('对不起，您已经领取过。每个QQ号只能领取一次哦。去查看<a style="color:#00EAFF;" href="http://cb.qq.com/my/my_lottery.html" target="_blank">我的礼品&gt;&gt;</a>');
                    break;
                default:
                    showMsg('非常抱歉！本活动正在升级中，请稍后再来参加。');
                    break;
            }
        }});
    }
    var initPresent = function () {
        var objParam = {iCmd: 100, g_tk: token};
        var data = {isOpen: 1, iCardType: 1};
        if (data.isOpen == 1) {
            $("input[name='gift100']").each(function () {
                $(this).attr("disable", false);
            });
            if (data.iCardType == 1) {
                $("#gft1").attr("disabled", true).attr("checked", false);
            } else if (data.iCardType == 2) {
            } else if (data.iCardType == 3) {
                $("#gft1,#gft2").attr("disabled", true).attr("checked", false);
                $("#gft3").attr("checked", true);
            }
        } else {
            $("input[name='gift100']").each(function () {
                $(this).attr("disabled", true).attr("checked", false);
            });
        }
    }
    var bindEvent = function () {
        $("a.report_bl").bind("click", function () {
            var val = $(this).attr("type");
            UserAction.record('zhongxin.index', val, 0, 0, 0);
        });
        $("a.btn-get").bind("click", function () {
            receive();
            UserAction.record('zhongxin.lq', 0, 0, 0, 0);
            return false;
        });
        $("input[name='gift100']").bind("click", function () {
            if (!isLogin) {
                quickLogin.open();
                return;
            }
        });
        $("a.switcher").bind("mouseover", function () {
            var bannerObj = $(this).parent();
            var bannerName = bannerObj.attr("class");
            var left = bannerObj.position().left;
            if (bannerName == "b-2") {
                if ((Number(left) == 656)) {
                    bannerObj.animate({left: 108}, BANNER_TIME);
                } else if ((Number(left) == 108)) {
                    $("li.b-4").animate({left: 872}, BANNER_TIME);
                    $("li.b-3").animate({left: 764}, BANNER_TIME);
                    bannerObj.animate({left: 656}, BANNER_TIME);
                }
            } else if (bannerName == "b-3") {
                if (Number(left) == 764) {
                    $("li.b-2").animate({left: 108}, BANNER_TIME);
                    bannerObj.animate({left: 216}, BANNER_TIME);
                } else if (Number(left) == 216) {
                    $("li.b-4").animate({left: 872}, BANNER_TIME);
                    bannerObj.animate({left: 764}, BANNER_TIME);
                }
            } else if (bannerName == "b-4") {
                if (Number(left) == 872) {
                    $("li.b-2").animate({left: 108}, BANNER_TIME);
                    $("li.b-3").animate({left: 216}, BANNER_TIME);
                    bannerObj.animate({left: 324}, BANNER_TIME);
                } else if (Number(left) == 324) {
                    bannerObj.animate({left: 872}, BANNER_TIME);
                }
            }
        });
        var setCardPos = function () {
            $("a.btn-swi").each(function () {
                var step = Number($(this).attr('step'));
                if (step == CARD_STEP) {
                    $("a.btn-swi").removeClass('cur');
                    $(this).addClass('cur');
                }
            });
        }
        $("a.arrow-left").bind("click", function () {
            if (CARD_STEP > 1) {
                $("#card_list").animate({'margin-left': 980 * (2 - CARD_STEP)}, 300);
                CARD_STEP--;
            } else {
                $("#card_list").animate({'margin-left': -(2 * CARD_WIDTH)}, 100);
                CARD_STEP = 3;
            }
            setCardPos();
        });
        $("a.arrow-right").bind("click", function () {
            if (CARD_STEP < 3) {
                $("#card_list").animate({'margin-left': -(CARD_STEP * CARD_WIDTH)}, 300);
                CARD_STEP++;
            } else {
                $("#card_list").animate({'margin-left': 0}, 100);
                CARD_STEP = 1;
            }
            setCardPos();
        });
        $("a.btn-swi").bind('click', function () {
            if ($(this).hasClass('cur'))return;
            var orgiPos = CARD_STEP;
            var curPos = Number($(this).attr("step"));
            $("a.btn-swi").removeClass('cur');
            $(this).addClass('cur');
            if (!isIe6) {
                if (curPos == "3") {
                    $("#open_card").removeClass("bg-4").addClass("bg-4-blue");
                } else {
                    $("#open_card").removeClass("bg-4-blue").addClass("bg-4");
                }
            }
            if ((curPos - orgiPos) > 0) {
                $("#card_list").animate({'margin-left': -((curPos - 1) * CARD_WIDTH)}, 300);
                CARD_STEP = curPos;
            } else {
                $("#card_list").animate({'margin-left': 980 * (1 - curPos)}, 100);
                CARD_STEP = curPos;
            }
        });
        $("div.gift-img").hover(function () {
            $("div.gift-detail", $(this)).fadeIn();
        }, function () {
            $("div.gift-detail", $(this)).fadeOut();
        });
        $("div.gtxt-1,div.gtxt-2,div.gtxt-3").hover(function () {
            $("div.gift-detail", $(this)).fadeIn();
        }, function () {
            $("div.gift-detail", $(this)).fadeOut();
        });
        initPos();
    }
    var initPos = function () {
        var type = actLib.util.getParameter('type');
        if (!type || type == "")return;
        if (type == 'platinum') {
            moveCard(2);
        } else if (type == 'blue') {
            moveCard(3);
        }
    }
    var moveCard = function (curPos) {
        var orgiPos = CARD_STEP;
        $("a.btn-swi").removeClass('cur');
        if (curPos == '2') {
            $('a.cd-white').addClass('cur');
        } else if (curPos == '3') {
            $('a.cd-blue').addClass('cur');
        }
        if (!isIe6) {
            if (curPos == "3") {
                $("#open_card").removeClass("bg-4").addClass("bg-4-blue");
            } else {
                $("#open_card").removeClass("bg-4-blue").addClass("bg-4");
            }
        }
        if ((curPos - orgiPos) > 0) {
            $("#card_list").animate({'margin-left': -((curPos - 1) * CARD_WIDTH)}, 300);
            CARD_STEP = curPos;
        } else {
            $("#card_list").animate({'margin-left': 980 * (1 - curPos)}, 100);
            CARD_STEP = curPos;
        }
    }
    var ActOther = {checkActOffline: function () {
        var iActId = 1000489, CONST_LIMIT_ACT_OFFLINE = 7101, CONST_LIMIT_ACT_TIME = 7102, CONST_LIMIT_ACT_TOTAL_COUNT = 7103;
        $.getJSON('http://cb.qq.com/act/check_act_limit.php?callback=?', {iCmd: '100', iActId: iActId, iUin: 0}, function (oData) {
            if (parseInt(oData.iErrCode) == CONST_LIMIT_ACT_OFFLINE) {
                showMsg('非常抱歉！本活动正在升级中，请稍后再来参加。');
            } else if (parseInt(oData.iErrCode) == CONST_LIMIT_ACT_TOTAL_COUNT) {
                showMsg('活动礼包已经领完，请关注QQ彩贝其他活动 <a href="http://cb.qq.com/active_main_board.html" class="c_gre">Go>></a>');
            } else if (parseInt(oData.iErrCode) == CONST_LIMIT_ACT_TIME) {
                showMsg('抱歉！本活动已结束，<span id="count_down">6</span>秒钟跳转到QQ彩贝首页。', '温馨提示', 'cd');
            }
        });
    }}
    var UserAction = {record: function (des, val, goodsId, goodsType, mallId) {
        var attach = actLib.util.getParameter('attach');
        attach = $.trim(attach) == "" ? 0 : attach;
        var objParam = {attach: attach, des: des, val: val, goodsId: goodsId, goodsType: goodsType, mallId: mallId};
        $.ajax({url: "http://act-cgi.cb.qq.com/report_bailing.php", data: objParam, dataType: "jsonp", timeout:　8000, success
        :
        function (data) {
        }
    }
    )
    ;
}
}
var init = function () {
    bindEvent();
    login.getSimpleUserInfo({}, function (data) {
        if (data.iUin !== 0) {
            isLogin = true
        }
        initPresent();
    }, function (data) {
    });
    setTimeout(ActOther.checkActOffline, 200);
    setTimeout(actLib.pvg.asynSendPvg, 200);
}
init();
})
;
/*  |xGv00|e90af27e1c9ba1781ee8d345dcc83029 */