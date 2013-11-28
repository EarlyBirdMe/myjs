(function($, undefined) {
    var pay, paiPay;
    $(document).ready(initial);

    function initial() {
        qing.init({
            id: 1003,
            aid: {
                "sTeam": "pingtai",
                "sSite": "pay"
            },
            logid: pai.OZ_NORMAL,
            login: true,
            hasLoginCb: function(uin, nick) {
                getUserInfo();
                pai.getQuanInfo()
            },
            loginCb: function(uin, nick) {
                if (pay && pay.resetUin) pay.resetUin(uin);
                if (paiPay && paiPay.resetUin) paiPay.resetUin(uin);
                getUserInfo();
                pai.getQuanInfo();
                getAutoPaiState()
            },
            logoutCb: function() {
                renderUserInfo(false);
                clearQuanInfo();
                pai.reAutoPai()
            }
        });
        initMainPic();
        initPaiSuccSwf();
        initDeltaTime();
        initSnapshot();
        bindEvent()
    }
    function initMainPic() {
        pai.initMainPic()
    }
    function initPaiSuccSwf() {
        pai.initPaiSuccSwf()
    }
    function initSnapshot() {
        pai.loadSnapshot(function() {
            if (window.pai_snapshot && window.pai_snapshot.purchase_data && window.pai_snapshot.purchase_data.length) {
                var htmlStr = "";
                $.each(window.pai_snapshot.purchase_data, function(idx, data) {
                    htmlStr += "<li>\u606d\u559c" + data.nickname + "\u4ee5<strong>" + pai.toYuan(data.price) + "\u5143</strong>\u6210\u529f\u83b7\u5f978\u4f4d\u9753\u53f7<strong>" + data.name + "</strong></li>";
                    $(".mod_placard .slider_content").html(htmlStr);
                    $(".mod_placard").show()
                });
                pai.rollPurchase()
            }
        })
    }
    function initDeltaTime() {
        pai.access(true, true, "act_0", function(ret, result) {
            var svr_time = result["handleRet"][0];
            pai_start = (new Date(svr_time)).set({
                hour: pai.PAI_START,
                minute: 0,
                second: 0,
                millisecond: 0
            }), client_time = pai.getNow();
            if (svr_time < pai_start) {
                pai.alertPaiNotStart();
                return
            }
            pai.addCache("delta_time", client_time - svr_time);
            pai.loadJson(function() {
                initPai(pai.PAI_TYPE_ALL, 1, true)
            })
        })
    }
    function initialPay() {
        var callee = arguments.callee;
        if (!callee.inited) {
            pay = new vip.pay.vf(pai.VF_BUY_QUAN, {
                "reqUrl": pai.PPL_URL,
                "loginCb": qing.login,
                "qbSuccCb": function(payVF) {
                    var amount = payVF.pay.getConfig("defaultPayTime");
                    setQuanNum(Number(amount))
                },
                "tenpaySuccCb": function() {
                    pai.getQuanInfo()
                },
                "bankSuccCb": function() {
                    pai.getQuanInfo()
                }
            }, {
                "width": "550px",
                "type": "pai",
                "title": "\u8d2d\u4e70\u62cd\u5238",
                "serviceName": "\u62cd\u5238",
                "price": 10,
                "payTime": [100, 200, 500, "other"],
                "defaultPayTime": 200,
                "maxPayTime": 1E3
            });
            callee.inited = true
        }
    }
    function initialPaiPay() {
        var callee = arguments.callee;
        if (!callee.done) {
            paiPay = new vip.pay.vf(pai.VF_PAI_PAY, {
                "reqUrl": pai.PPL_URL,
                "loginCb": qing.login,
                "qbSuccCb": function(payVF) {}
            }, {
                "width": "520px",
                "type": "at",
                "title": "\u8d2d\u4e70\u62cd\u54c1"
            });
            callee.done = true
        }
    }
    function getUserInfo() {
        window.handleUserInfo = function(data) {
            data = data[0];
            renderUserInfo(data)
        };
        qing.loadScript("http://vipfunc.qq.com/common/user.php?callback=handleUserInfo&data=is_club,nick_name,face_url,club_end_time")
    }

    function clearQuanInfo() {
        pai.setCache({
            "quan_used_num": 0,
            "quan_unused_num": 0
        });
        pai.renderQuanInfo()
    }
    function getAutoPaiState() {
        pai.access(true, false, "act_8", function(ret, result) {
            var r = result["handleRet"][0],
                info = r.data;
            if (info) pai.renderAutoPaiBtnBatch(info)
        }, {}, {
            "lotIds": pai.getCache("pai_in_eye").join("|")
        })
    }
    function setQuanNum(num, used_num) {
        num = num || 0;
        used_num = used_num || 0;
        pai.setCache("quan_unused_num", Number(pai.getCache("quan_unused_num")) + Number(num));
        pai.setCache("quan_used_num", Number(pai.getCache("quan_used_num")) + Number(used_num));
        pai.renderQuanInfo()
    }
    function alertNoQuan() {
        VF.show({
            texts: ["\u563f\u563f\uff0c\u53e3\u888b\u91cc\u7684\u62cd\u5238\u5df2\u7ecf\u4e0d\u591f\u4e00\u6b21\u7ade\u62cd\u4e86\u54e6\uff0c\u5feb\u70b9\u53bb\u6dfb\u70b9\u62cd\u5238\u8fc7\u6765\u5427"],
            buttons: [{
                text: "\u8d2d\u4e70\u62cd\u5238",
                click: function() {
                    this.hide();
                    openPay()
                }
            }, {
                text: "\u5173\u95ed",
                click: function() {
                    this.hide()
                }
            }]
        })
    }
    function renderUserInfo(data) {
        var tpl_user_info = '<div class="haslogin">                <img src="{{face_url}}" alt="" class="user_face">                <div class="user_info">                    <p class="user_wrap">                        {{{login_or_logout}}}                        <span class="subtext">\u5c0a\u8d35\u7684\uff1a</span>                        <span class="user_name">{{nick_name}}</span>                    </p>                    {{{history_html}}}                </div>            </div>',
            view_user_info = {};
        if (data && data["is_login"]) {
            vipact.extend(view_user_info, {
                "face_url": data["face_url"],
                "nick_name": data["nick_name"],
                "history_html": '<a href="#" class="btn_history">\u6211\u7684\u5386\u53f2\u8bb0\u5f55<span class="ico_arror_y"></span></a>',
                "login_or_logout": '<a href="#" class="link_logout" onclick="quitLogin();return false;">[\u9000\u51fa]</a>'
            });
            pai.setCache("nick_name", encodeURIComponent(data["nick_name"].html(true)));
            if (data["is_club"] && data["club_end_time"]) pai.setCache("club_end_time", Date.parseExact(data["club_end_time"], "yyyy-MM-dd").getTime());
            else pai.setCache("club_end_time", Date.today().getTime())
        } else vipact.extend(view_user_info, {
            "face_url": "http://imgcache.gtimg.cn/vipportal_v2/img/temp/img_face.jpg",
            "nick_name": "QQ\u7528\u6237",
            "history_html": '<a href="#" class="btn_history">\u6211\u7684\u5386\u53f2\u8bb0\u5f55<span class="ico_arror_y"></span></a>',
            "login_or_logout": '<a href="#" class="link_logout" onclick="toLogin(); return false;">[\u767b\u5f55]</a>'
        });
        $(".header_user").html(Mustache.render(tpl_user_info, view_user_info));
        bindShowHistoryEvent()
    }
    function bindEvent() {
        bindCommonEvent();
        bindBuyQuanEvent();
        bindExchangeClubEvent();
        bindPaiTypeSwitchEvent();
        bindPaiItemCommonEvent();
        bindPagerEvent();
        bindGuideEvent()
    }
    function bindCommonEvent() {
        $(document).dblclick(function(e) {
            if (e.ctrlKey) pai.showGuide()
        });
        $(".btn_newpeople").click(function(e) {
            pai.showGuide();
            return false
        })
    }
    function bindGuideEvent() {
        $(".next a").click(function() {
            var rel = $(this).attr("rel");
            $(".jp_mask").find("." + rel).show();
            $(this).closest(".act_mod_tip").hide();
            if (rel === "step_over") {
                $(".jp_mask").hide();
                pai.finishGuide()
            }
            return false
        });
        $(".btn_close").click(function(e) {
            $(".jp_mask .act_mod_tip").hide();
            $(".jp_mask").hide();
            pai.finishGuide()
        })
    }
    function bindBuyQuanEvent() {
        $(".btn_buyquan").click(function(e) {
            openPay();
            return false
        })
    }
    function openPay() {
        initialPay();
        if (!pay.open()) qing.login()
    }
    function bindPaiTypeSwitchEvent() {
        var ele = $(".jp_nav a"),
            ele_li = $(".jp_nav > li");
        ele.click(function(e) {
            var paitype = $(this).attr("paitype");
            if (!(paitype == pai.PAI_TYPE_ALL || paitype == pai.PAI_TYPE_LH)) {
                VF.show(pai.type_name[paitype] + "\u7ade\u62cd\u5c06\u4e8e\u8fd1\u671f\u4e0a\u7ebf\uff0c\u656c\u8bf7\u671f\u5f85\uff01");
                return false
            }
            var parent_li = $(this).parent();
            if (parent_li.hasClass("current")) return false;
            ele_li.removeClass("current");
            parent_li.addClass("current");
            initPai(paitype, 1, false);
            return false
        })
    }
    function bindShowHistoryEvent() {
        $(".btn_history").click(function(e) {
            if (!login.is()) qing.login();
            showMyPai();
            return false
        })
    }
    function getPurchaseStatus(closeTime, purchaseTime, status) {
        if (status != 0) return 0;
        else {
            var now = pai.getRealNow();
            if (closeTime * 1E3 + pai.PAY_DEADLINE <= now) return 2;
            return 1
        }
    }
    function getPurchaseTxt(closeTime, purchaseTime, status) {
        if (status != 0) return (new Date(purchaseTime * 1E3)).toString("yyyy-MM-dd");
        else {
            var now = pai.getRealNow();
            if (closeTime * 1E3 + pai.PAY_DEADLINE <= now) return "\u5df2\u8fc7\u671f";
            return "\u672a\u4ed8\u6b3e"
        }
    }
    function showMyPai() {
        pai.access(true, false, "act_6", function(ret, result) {
            var r = result["handleRet"][0],
                info = r.data;
            var show_history_div = $("#show_history_div"),
                show_history_div_obj = show_history_div.get(0),
                html_arr = [];
            if (info.length) $.each(info, function(idx, val) {
                html_arr.push(Mustache.render('<tr><td><div class="pro">{{productName}}</div></td><td>{{price}}</td><td>{{type}}</td><td>{{lotCloseTime}}</td><td>{{purchaseTime}}</td><td>{{{payUrl}}}</td></tr>', {
                    "lotid": val.lotId,
                    "productName": pai.getProductName(val.productType, val.productName),
                    "price": pai.toYuan(val.price),
                    "centPrice": val.price,
                    "type": pai.type_name[val.productType],
                    "lottype": val.productType,
                    "lotCloseTime": (new Date(val.lotCloseTime * 1E3)).toString("yyyy-MM-dd"),
                    "purchaseTime": getPurchaseTxt(val.lotCloseTime, val.purchaseTime, val.status),
                    "payUrl": pai.getPayUrl(val, getPurchaseStatus(val.lotCloseTime, val.purchaseTime, val.status))
                }))
            });
            else html_arr.push('<tr><td colspan="6">\u6682\u65e0\u8bb0\u5f55</td></tr>');
            show_history_div.find("thead").html('<tr>                                <th class="col_1">\u62cd\u54c1</th>                                <th class="col_2">\u6210\u4ea4\u4ef7\uff08\u5143\uff09</th>                                <th class="col_3">\u7c7b\u578b</th>                                <th class="col_4">\u62cd\u4e0b\u65e5\u671f</th>                                <th class="col_5">\u4ed8\u6b3e\u65e5\u671f</th>                                <th class="col_6">\u64cd\u4f5c</th>                            </tr>');
            show_history_div.find("tbody").html(html_arr.join(""));
            VF.showHtmlDlg(show_history_div_obj);
            bindPaiPayEvent()
        })
    }
    function showMyBid() {
        pai.access(true, false, "act_9", function(ret, result) {
            var r = result["handleRet"][0],
                info = r.data;
            var show_history_div = $("#show_history_div");
            var html_arr = [];
            if (info.length) $.each(info, function(idx, val) {
                html_arr.push(Mustache.render('<tr><td><div class="pro">{{productName}}</div></td><td>{{bidPrice}}</td><td>{{bidVouchers}}</td><td>{{bidTime}}</td></tr>', {
                    "productName": pai.getProductName(val.productType, val.productName) || "\u672a\u77e5",
                    "bidPrice": pai.toYuan(val.bidPrice),
                    "bidVouchers": val.bidVouchers,
                    "bidTime": val.bidTime
                }))
            });
            else html_arr.push('<tr><td colspan="4">\u6682\u65e0\u8bb0\u5f55</td></tr>');
            show_history_div.find("thead").html('<tr>                                <th class="col_1">\u62cd\u54c1</th>                                <th class="col_2">\u51fa\u4ef7\uff08\u5143\uff09</th>                                <th class="col_3">\u6d88\u8017\u62cd\u5238\u6570</th>                                <th class="col_4">\u51fa\u4ef7\u65e5\u671f</th>                            </tr>');
            show_history_div.find("tbody").html(html_arr.join(""))
        }, {}, {
            "max": pai.MAX_MY_BID
        })
    }
    function bindPaiPayEvent() {
        var show_history_div = $("#show_history_div"),
            show_history_div_a = show_history_div.find("a"),
            show_history_tab = show_history_div.find("li");
        show_history_div_a.unbind("click");
        show_history_tab.unbind("click");
        show_history_div_a.click(function(e) {
            var ele = e.target;
            if ($(ele).hasClass("btn_pai_pay")) {
                initialPaiPay();
                VF.hideHtmlDlg(show_history_div.get(0));
                var payTime = {};
                var at_id = pai.at_id[$(ele).attr("lottype")];
                payTime[at_id] = {
                    "text": "\u62cd\u54c1\uff1a" + $(ele).attr("lotname"),
                    "price": $(ele).attr("price"),
                    "num": $(ele).attr("lotid")
                };
                paiPay.pay.setConfig({
                    "serviceName": "\u62cd\u54c1",
                    "payTime": payTime,
                    "defaultPayTime": at_id
                });
                if (!paiPay.open()) qing.login();
                return false
            } else if ($(ele).hasClass("jp_pop_close")) {
                VF.hideHtmlDlg(show_history_div.get(0));
                return false
            }
        });
        show_history_tab.removeClass("selected");
        show_history_tab.eq(0).addClass("selected");
        show_history_tab.click(function(e) {
            var ele = e.target;
            show_history_tab.removeClass("selected");
            $(ele).addClass("selected");
            var tab = $(ele).attr("tab");
            if (tab == 1) showMyPai();
            else if (tab == 2) showMyBid()
        })
    }
    function bindPaiItemCommonEvent() {
        function toggleBoard(ele) {
            var btn = $(ele);
            var lotid = btn.attr("lotid");
            var item = btn.closest("li");
            var part_info = item.find(".part_info");
            var leftValue = item.hasClass("item_5n") ? -196 : 196;
            if (btn.parent().is(part_info)) {
                part_info.animate({
                    left: 0
                }, 400, function() {
                    item.removeClass("selected");
                    item.find(".part_price .btn_toggle").show()
                });
                pai.setCache("pai_board_open", 0)
            } else {
                var selectedItem = item.parent().find(".selected");
                selectedItem.find(".part_info").css("left", 0);
                selectedItem.find(".part_price .btn_toggle").show();
                selectedItem.removeClass("selected");
                item.addClass("selected");
                btn.hide();
                part_info.animate({
                    left: leftValue
                }, 400);
                pai.setCache("pai_board_open", lotid);
                pai.timerRecord(true);
                pai.startRecordTimer()
            }
        }
        $(".pai_list").click(function(e) {
            var ele = e.target;
            var lotid = $(ele).attr("lotid");
            if ($(ele).hasClass("btn_a")) {
                handlePai(lotid);
                return false
            }
            if ($(ele).hasClass("btn_b")) return false;
            if ($(ele).is("input")) {
                handleAutoPai(lotid, $(ele).attr("checked") == "checked" ? 1 : 0);
                return false
            }
            if ($(ele).hasClass("btn_toggle")) {
                toggleBoard(ele);
                return false
            }
        })
    }
    function handlePai(lotid) {
        if (!login.is()) {
            qing.login();
            return false
        }
        pai.report(2, 1);
        pai.report(lotid, 1, true);
        pai.access(true, false, "act_3", {
            "callback": function(ret, result) {
                pai.report(lotid, 2, true);
                pai.report(3, 1);
                var r = result["handleRet"][0],
                    num = r.data["vouchers"],
                    status = r.data["status"],
                    used = r.data["used"],
                    unused = r.data["unused"];
                if (status == pai.STATUS_OVER) pai.showSuccWeibo(lotid);
                pai.showRiseIcon(lotid);
                pai.resetQuanNum(used, unused)
            },
            "-20011": function() {
                pai.report(lotid, 3, true);
                pai.report(4, 1);
                alertNoQuan();
                pai.checkQuanInfo()
            }
        }, {}, {
            "lotid": lotid,
            "isauto": "0",
            "nickname": pai.getCache("nick_name")
        })
    }
    function handleAutoPai(lotid, flag) {
        if (!login.is()) {
            qing.login();
            return false
        }
        VF.show({
            texts: flag ? ["\u4f7f\u7528\u81ea\u52a8\u51fa\u4ef7\u540e\uff0c\u82e5\u60a8\u7684\u51fa\u4ef7\u88ab\u8d85\u8fc7\u5219\u7cfb\u7edf\u4f1a1\u79d2\u949f\u5185\u5e2e\u60a8\u81ea\u52a8\u51fa\u4ef7\uff0c\u63d0\u9ad8\u60a8\u62cd\u5230\u7269\u54c1\u7684\u6210\u529f\u7387\uff0c\u82e5\u540c\u65f6\u95f4\u6bb5\u81ea\u52a8\u51fa\u4ef7\u7528\u6237\u8f83\u591a\uff0c\u60a8\u7684\u51fa\u4ef7\u4f1a\u6709\u4e00\u5b9a\u5ef6\u8fdf\u3002\u82e5\u9700\u53d6\u6d88\u8be5\u529f\u80fd\uff0c\u8bf7\u53d6\u6d88\u52fe\u9009\u201c\u81ea\u52a8\u51fa\u4ef7\u201d\u3002", '<span style="color:#f00; font-weight:bold;">\u8bf7\u6ce8\u610f\uff1a\u82e5\u4e0d\u53d6\u6d88\u52fe\u9009\uff0c\u90a3\u4e48\u65e0\u8bba\u5173\u95ed\u9875\u9762\u6216\u9000\u51fa\u767b\u5f55\u5747\u65e0\u6cd5\u963b\u6b62\u201c\u81ea\u52a8\u51fa\u4ef7\u201d\uff0c\u76f4\u81f3\u60a8\u7684\u62cd\u5238\u6d88\u8017\u5b8c\u6bd5\u6216\u51fa\u4ef7\u7269\u54c1\u6210\u4ea4\u540e\u624d\u4f1a\u505c\u6b62\u81ea\u52a8\u51fa\u4ef7\uff01</span>'] : ["\u786e\u5b9a\u53d6\u6d88\u5bf9\u8be5\u62cd\u54c1\u81ea\u52a8\u51fa\u4ef7\uff1f"],
            buttons: [{
                text: "\u786e\u5b9a",
                click: function() {
                    this.hide();
                    setAutoPai(lotid, flag)
                }
            }, {
                text: "\u53d6\u6d88",
                click: function() {
                    this.hide()
                }
            }]
        })
    }
    function setAutoPai(lotid, flag) {
        pai.access(true, false, "act_4", {
            "callback": function(ret, result) {
                var r = result["handleRet"][0],
                    state = r.data;
                if (state) pai.renderAutoPaiBtn(lotid, flag)
            },
            "-20011": function() {
                alertNoQuan();
                pai.checkQuanInfo()
            }
        }, {}, {
            "lotid": lotid,
            "flag": flag,
            "nickname": pai.getCache("nick_name")
        })
    }
    function bindPagerEvent() {
        var pai_page = $(".pai_page");
        pai_page.click(function(e) {
            var page_input = pai_page.find("input");
            var ele = e.target;
            var page = $(ele).attr("to");
            var lottype = $(ele).attr("lottype");
            if ($(ele).hasClass("btn_pager")) initPai(lottype, page, false);
            if ($(ele).hasClass("btn_pager_user")) initPai(lottype, page_input.val(), false);
            return false
        })
    }
    function bindExchangeClubEvent() {
        var exchange_club_div = $("#exchange_club_div"),
            quan_num_span = exchange_club_div.find(".quan_num"),
            club_num_span = exchange_club_div.find(".club_num"),
            input = exchange_club_div.find("input"),
            flash_span = exchange_club_div.find(".flash"),
            exchange_club_div_obj = exchange_club_div.get(0);
        pai.onlyNum(input);
        $(".btn_dui").click(function(e) {
            if (!login.is()) {
                qing.login();
                return false
            }
            var used_num = pai.getCache("quan_used_num");
            var club_num = pai.getExchangeClubNum(used_num);
            var max_club_num = Math.floor((pai.MAX_CLUB_TIME - pai.getCache("club_end_time")) / 26784E5);
            if (club_num < 1) {
                VF.show({
                    texts: ["\u73b0\u5728\u5df2\u7ecf\u4f7f\u7528\u7684\u62cd\u5238\u8fd8\u4e0d\u591f\u5151\u6362\u4f1a\u5458\u7684\u54e6", "\u6e29\u99a8\u63d0\u793a\uff1a\u6bcf\u4f7f\u7528100\u5f20\u62cd\u5238\u5c31\u53ef\u4ee5\u5151\u63621\u4e2a\u6708\u4f1a\u5458"]
                });
                return false
            }
            quan_num_span.html(used_num);
            club_num_span.html(club_num);
            input.val(Math.min(club_num, max_club_num));
            input.attr("maxLength", club_num.toString().length);
            VF.showHtmlDlg(exchange_club_div_obj);
            return false
        });
        exchange_club_div.find(".close").click(function(e) {
            VF.hideHtmlDlg(exchange_club_div_obj);
            return false
        });
        exchange_club_div.find(".confirm").click(function(e) {
            var used_num = pai.getCache("quan_used_num");
            var club_num = pai.getExchangeClubNum(used_num);
            var max_club_num = Math.floor((pai.MAX_CLUB_TIME - pai.getCache("club_end_time")) / 26784E5);
            var num = input.val();
            if (num > club_num) {
                flash_span.html("*\u60a8\u6700\u591a\u80fd\u5151\u6362" + club_num + "\u4e2a\u6708\u4f1a\u5458\u3002");
                pai.flash(flash_span);
                return false
            } else if (num > max_club_num) {
                flash_span.html("*\u4f1a\u5458\u6700\u591a\u5f00\u901a\u5230" + (new Date(pai.MAX_CLUB_TIME)).toString("yyyy") + "\u5e74\u3002");
                pai.flash(flash_span);
                return false
            } else if (num <= 0) {
                flash_span.html("*\u8bf7\u81f3\u5c11\u5151\u63621\u4e2a\u6708\u4f1a\u5458\u3002");
                pai.flash(flash_span);
                return false
            }
            pai.access(true, false, "act_2", {
                "callback": function(ret, result) {
                    var r = result["handleRet"][0],
                        months = r.data;
                    setQuanNum(0, -months * pai.QUAN_PER_CLUB);
                    pai.setCache("club_end_time", pai.getCache("club_end_time") + months * 26784E5);
                    VF.hideHtmlDlg(exchange_club_div_obj);
                    VF.show({
                        "type": "success",
                        "texts": ['\u606d\u559c\u60a8\u6210\u529f\u5151\u6362<strong class="c_tx1">' + months + "\u4e2a\u6708</strong>\u4f1a\u5458\u3002"]
                    })
                },
                "-10134": function() {
                    flash_span.html("*\u60a8\u5df2\u4f7f\u7528\u7684\u62cd\u5238\u6570\u4e0d\u8db3\uff0c\u4e0d\u80fd\u5151\u6362\u4f1a\u5458\u3002");
                    pai.flash(flash_span)
                },
                "-100001": function() {
                    flash_span.html("*\u4f1a\u5458\u6700\u591a\u5f00\u901a\u5230" + (new Date(pai.MAX_CLUB_TIME)).toString("yyyy") + "\u5e74\u3002");
                    pai.flash(flash_span)
                }
            }, {}, {
                "num": num
            });
            return false
        })
    }
    function initPai(type, page, isInit) {
        pai.clearPaiInEye();
        pai.clearOverPai();
        pai.clearLostPai();
        pai.setCannotFlashSucc();
        var data = pai.getPai(type, page),
            pai_arr = data["data"],
            html_arr = [],
            tpl_pai = '<li id="pai_item_{{lot_id}}" class="{{item_class}}">                    <div class="part_info">                        <p class="text_1">                            <span class="tit">\u6bcf\u6b21\u51fa\u4ef7</span>                            = \u62cd\u5356\u4ef7\u6da8<em>0.01</em>\u5143 <br />                            = \u6d88\u8017<em>{{quan_num}}</em>\u5f20\u62cd\u5238                        </p>                        <div class="text_2">                            <p class="col">                                <span class="tit">\u6210\u4ea4\u6761\u4ef6</span>                                \u51fa\u4ef7=\u5e95\u724c\u4ef7                                <br />                            </p>                            <p class="col">                                <span class="tit">\u6d41\u62cd\u6761\u4ef6</span>                                \u5012\u8ba1\u65f6\u5f52\u96f6                                <br />\u4e14\u51fa\u4ef7\u2260\u5e95\u724c\u4ef7                            </p>                        </div>                        <table class="cjlist bidRecord">                            <thead>                                <tr>                                    <th class="label">\u6635 \u79f0</th>                                    <th>\u51fa \u4ef7</th>                                </tr>                            </thead>                            <tbody>                            </tbody>                        </table>                        <a href="#" class="btn_toggle" title="\u7f29\u8d77" lotid="{{lot_id}}">\u7f29\u8d77</a>                    </div>                    <div class="part_price">                        <div class="price_pro">                            <div class="ico_type {{ico_type}}"></div>                            {{#isLH}}<p class="price_pro_name">{{lh_num}}</p>{{/isLH}}                            {{^isLH}}<p class="price_pro_name">{{img_name}}</p>{{/isLH}}                        </div>                        <p class="timer">Loading...</span></p>                        <h3>{{product_name}}</h3>                        <p class="price_sc"><span class="col_tit">\u5e02\u573a\u4f30\u503c\uff1a</span>{{market_price}}\u5143</p>                        <p class="price_dp"><span class="col_tit">\u5e95 \u724c \u4ef7\uff1a</span><span class="num basePrice">?</span>\u5143</p>                        <p class="price_pm"><span class="col_tit">\u5f53\u524d\u4ef7\u683c\uff1a</span><em class="num lastPrice">Loading</em>\u5143<img width="18" height="18" alt="" src="http://imgcache.gtimg.cn/vipstyle/game/portal/jingpai/pic/pic_rise.gif" class="ico_rise" style="display:none;" /></p>                        <p class="price_last"><span class="col_tit">\u6700\u540e\u51fa\u4ef7\uff1a</span><span class="lastuser lastNickName">Loading...</span></p>                        <div class="ft">                            <div class="autogroup">                                <a href="#" class="btn_a" lotid="{{lot_id}}">\u6211\u8981\u52a0\u4ef7</a>                                <a href="#" class="btn_b" style="display:none">\u81ea\u52a8\u51fa\u4ef7\u4e2d...</a>                                <br />                                <label><input type="checkbox" lotid="{{lot_id}}" /> \u81ea\u52a8\u51fa\u4ef7</label>                            </div>                        </div>                        <a href="#" class="btn_toggle" title="\u5c55\u5f00" lotid="{{lot_id}}">\u5c55\u5f00</a>                        <div class="ico_deal_success" style="display:none;">\u6210\u4ea4</div>                        <div class="ico_deal_miss" style="display:none;">\u6d41\u62cd</div>                    </div>                </li>';
        $.each(pai_arr, function(idx, val) {
            pai.addCache("pai_end_time_" + val.id, val.end * 1E3);
            pai.addPaiInEye(val.id);
            html_arr.push(Mustache.render(tpl_pai, {
                "ico_type": pai.ico_type[val.type],
                "lot_id": val.id,
                "item_class": "item_" + (idx % 5 + 1) + "n",
                "img_name": pai.product_name[val.type],
                "product_name": pai.product_name[val.type] + "(" + pai.quan_num[val.type] + "\u62cd\u5238/\u6b21)",
                "lh_num": val.name,
                "market_price": pai.toYuan(val.mprice),
                "isLH": val.type == pai.PAI_TYPE_LH,
                "quan_num": pai.quan_num[val.type]
            }))
        });
        $(".jp_mod_list").html(html_arr.join(""));
        pai.loadPaiState(pai.getCache("pai_in_eye"), function() {
            pai.setCanFlashSucc();
            pai.timerClock();
            pai.startClockTimer();
            pai.startStateTimer()
        });
        renderPager(data, type);
        getAutoPaiState();
        if (isInit) pai.initGuide()
    }
    function renderPager(data, type) {
        function getPagerBtn(page, total, type) {
            var page_arr = [],
                page = Number(page);
            if (page - 2 > 1) {
                page_arr.push(Mustache.render('{{#isCurrent}}<span class="current"><span>{{pageNum}}</span></span>{{/isCurrent}}{{^isCurrent}}<a href="#" title="{{pageNum}}" to="{{pageNum}}" lottype="{{lottype}}" class="btn_pager">{{pageNum}}</a>{{/isCurrent}}', {
                    "isCurrent": page == 1,
                    "pageNum": 1,
                    "lottype": type
                }));
                page_arr.push('<span class="mod_pagenav_more"><span>...</span></span>')
            }
            var start = page - 2,
                end = page + 2,
                start = Math.max(1, start),
                end = Math.min(total, end);
            for (; start <= end; ++start) page_arr.push(Mustache.render('{{#isCurrent}}<span class="current"><span>{{pageNum}}</span></span>{{/isCurrent}}{{^isCurrent}}<a href="#" title="{{pageNum}}" to="{{pageNum}}" lottype="{{lottype}}" class="btn_pager">{{pageNum}}</a>{{/isCurrent}}', {
                "isCurrent": page == start,
                "pageNum": start,
                "lottype": type
            }));
            if (page + 2 < total) {
                page_arr.push('<span class="mod_pagenav_more"><span>...</span></span>');
                page_arr.push(Mustache.render('{{#isCurrent}}<span class="current"><span>{{pageNum}}</span></span>{{/isCurrent}}{{^isCurrent}}<a href="#" title="{{pageNum}}" to="{{pageNum}}" lottype="{{lottype}}" class="btn_pager">{{pageNum}}</a>{{/isCurrent}}', {
                    "isCurrent": page == total,
                    "pageNum": total,
                    "lottype": type
                }))
            }
            return page_arr.join("&nbsp;")
        }
        var total = data["total"],
            page = data["page"],
            tpl_pager = '<p class="mod_pagenav_main">                            {{#firstPage}}<span class="mod_pagenav_disable"><span>\u9996\u9875</span></span> <span class="mod_pagenav_disable"><span>\u4e0a\u4e00\u9875</span></span>{{/firstPage}}{{^firstPage}}<a href="#" title="\u9996\u9875" to="1" lottype="{{lottype}}" class="btn_pager">\u9996\u9875</a> <a href="#" title="\u4e0a\u4e00\u9875" to="{{prePage}}" lottype="{{lottype}}" class="btn_pager">\u4e0a\u4e00\u9875</a>{{/firstPage}}\t\t\t\t\t\t\t\t<span class="mod_pagenav_count">                                    {{{pagerBtn}}}\t\t\t\t\t\t\t\t</span>                            {{#lastPage}}<span class="mod_pagenav_disable"><span>\u4e0b\u4e00\u9875</span></span> <span class="mod_pagenav_disable"><span>\u5c3e\u9875</span></span>{{/lastPage}}{{^lastPage}}<a href="#" title="\u4e0b\u4e00\u9875" to="{{postPage}}" lottype="{{lottype}}" class="btn_pager">\u4e0b\u4e00\u9875</a> <a href="#" title="\u5c3e\u9875" to="{{total}}" lottype="{{lottype}}" class="btn_pager">\u5c3e\u9875</a>{{/lastPage}}                        </p>                        <p class="mod_pagenav_option">                            <span class="mod_pagenav_turn">\u5230<input type="text" name="PageCount" maxlength="{{maxlength}}">\u9875 <button lottype="{{lottype}}" class="btn_pager_user">\u786e\u5b9a</button></span>                        </p>';
        $(".pai_page").html(Mustache.render(tpl_pager, {
            "firstPage": page == 1,
            "lastPage": page == total,
            "prePage": page - 1,
            "postPage": Number(page) + 1,
            "total": total,
            "lottype": type,
            "pagerBtn": getPagerBtn(page, total, type),
            "maxlength": total.toString().length
        }));
        pai.onlyNum($(".pai_page input"))
    }
})(jQuery); /*  |xGv00|eb5fcf280ddf4b31cfb0f4162013a931 */