var G = G || {};
G.index = G.index || {};
$.extend(G.index, {templates: {tpl_goods: '<li>                        <div class="mod_goods mod_goods_w80">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_promo"><a href="{URL}" target="_blank" title="{PROMOTE}" ytag={ytag}>{PROMOTE}</a></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{TITLE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>', tpl_hotsale: '<li>                        <div class="mod_goods mod_goods_w80">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_promo"><a href="{URL}" target="_blank" title="{TITLE}" ytag={ytag}>{SOLDNUM}</a></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{TITLE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>',
    tpl_goodsPic: '<li class="sy_mod_fgoods_high">\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t</li>', tpl_ad: '<li><a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img _src="{picUrl}" alt="{title}" /></a></li>', tpl_tejia: '<li>                        <div class="mod_goods">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{IMG}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><span class="c_tx2">{PROMOTE}</span>{TITLE}</a></p>                            </div>                        </div>                    </li>',
    tpl_quick: '<li>\t\t\t\t\t\t<div class="mod_goods mod_goods_w120">\t\t\t\t\t\t\t<div class="mod_goods_img load_effect">\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" ytag="{ytag}" title="{TITLE}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mod_goods_info">\t\t\t\t\t\t\t\t<p class="mod_goods_price"><span class="mod_price mod_price_now"><i>&yen;</i><span>{PRICE}</span></span></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><del>{mPRICE}</del></span></p>\t\t\t\t\t\t\t\t<p class="mod_goods_tit"><a href="{URL}" target="_blank" ytag="{ytag}" title="{TITLE}">{PROMOTE}</a></p>\t\t\t\t\t\t\t\t<div class="mod_goods_stock">\t\t\t\t\t\t\t\t\t<em>库存</em>\t\t\t\t\t\t\t\t\t<span><i class="mod_goods_stock_bg2" w={STOCKPERCENT} style="width:100%"></i></span>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</li>',
    tpl_qbTomorrow: '<li>\t\t\t\t\t\t<div class="mod_goods mod_goods_w120">\t\t\t\t\t\t\t<div class="mod_goods_img load_effect">\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" ytag="{ytag}" title="{TITLE}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mod_goods_info">\t\t\t\t\t\t\t\t<p class="mod_goods_p1">惊喜价 请期待</p>\t\t\t\t\t\t\t\t<p class="mod_goods_tit">{PROMOTE}</p>\t\t\t\t\t\t\t\t<div class="mod_goods_coming">尚未开始</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</li>',
    tpl_trigger: "<i>&bull;</i>", tpl_sliderTrigger: "<li>{index}</li>", tpl_night: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_thh">\t\t\t\t\t\t\t\t<div class="ulike_thh_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}#{COMMODITYID}" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_thh_price" title="省{LESSPRICE}元"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span><em style="display:{DISPLAY}">省{LESSPRICE}元</em></p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_thh_info">\t\t\t\t\t\t\t\t\t<p class="ulike_thh_tit">天黑黑开抢<b>3折起</b></p>\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_wrap">\t\t\t\t\t\t\t\t\t\t<b class="yugaoSpan">距</b>\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time">\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeH">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeM">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeS">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s></div></div></div></div></div></div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}" ytag="{ytag}">天黑黑</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多抢购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_moring: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_thh ulike_zs">\t\t\t\t\t\t\t\t<div class="ulike_thh_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}#{COMMODITYID}" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_thh_price" title="省{LESSPRICE}元"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span><em style="display:{DISPLAY}">省{LESSPRICE}元</em></p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_thh_info">\t\t\t\t\t\t\t\t\t<p class="ulike_thh_tit">早市开抢<b>3折起</b></p>\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_wrap">\t\t\t\t\t\t\t\t\t\t<b class="yugaoSpan">距</b>\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time">\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeH">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeM">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeS">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s></div></div></div></div></div></div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}" ytag="{ytag}">早市</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多抢购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_tuan: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_tg">\t\t\t\t\t\t\t\t<div class="ulike_tg_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" title="{TITLE}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_tg_amout">已售出<b>{SALECOUNT}</b>件</p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_tg_info">\t\t\t\t\t\t\t\t\t<p class="ulike_tg_tit"><a target="_blank" href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" title="{TITLE}" ytag="{ytag}">{TITLE}</a></p>\t\t\t\t\t\t\t\t\t<div class="ulike_tg_price">\t\t\t\t\t\t\t\t\t\t团购价 <span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="ulike_tg_price_old">\t\t\t\t\t\t\t\t\t\t易迅价 <span class="mod_price"><i>&yen;</i><del>{mPRICE}</del></span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?DAP={DAP}" ytag="{ytag}">今日团购</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多团购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_new: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com?DAP={DAP}" title="新品首发" ytag="{ytag}">新品首发</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入新品频道</b><i></i></a>\t\t\t\t\t\t</li>', tpl_hao: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://hao.yixun.com?DAP={DAP}" title="最惠购" ytag="{ytag}">最惠购</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://hao.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入最惠购频道</b><i></i></a>\t\t\t\t\t\t</li>',
    tpl_faxian: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" title="易迅发现" ytag="{ytag}">易迅发现</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入发现频道</b><i></i></a>\t\t\t\t\t\t</li>',
    tpl_ulikeAd: '<li>\t\t\t\t\t\t\t<div class="ulike_r1_brand">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /><span class="ulike_r1_tit"><em>{title}</em><span>{remarks}</span></span></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>'}, init: function () {
    $("#tfs_1").hide();
    0 < location.href.indexOf("admin.icson.com") ? $("[_module]").each(function () {
        var a = $(this), d = a.show().attr("_f");
        if (d && "function" == typeof G.index[d])G.index[d]({dom: a})
    }) : this.gettf();
    this.loadImgWhenScroll();
    this.scroll({id: "#J_FliderImg", func: this.right2FAd});
    this.notice();
    this.banner();
    $(document).ready(function () {
        var a = $("#chongQQ");
        a.attr("src", a.attr("_src")).removeAttr("_src")
    });
    this.getServiceMsg()
}, banner: function () {
    $("#J_FBClose").click(function () {
        $("#J_FBanner").slideUp("normal")
    });
    var a = $("#J_Hint p"), d = a.length;
    if (0 < d) {
        var c = 0;
        setInterval(function () {
            var b = (c + 1) % d;
            a.eq(c).fadeOut(500, function () {
                a.eq(b).fadeIn();
                c = b
            })
        }, 3E3)
    }
    var b = $("#J_SBanner");
    0 < b.length && setTimeout(function () {
        b.animate({height: "80px"},
            "slow", function () {
                $("#J_SBanner1").fadeOut("slow");
                $("#J_SBanner2").fadeIn("slow")
            })
    }, 15E3)
}, notice: function () {
    function a(a) {
        var c = "next" == a ? (b + 1) % e : (b - 1 + e) % e;
        d.eq(b).stop(0, 1).fadeOut(300, function () {
            d.eq(c).stop(0, 1).fadeIn(300, function () {
                b = c
            })
        })
    }

    var d = $("#J_Notice"), c = $("#J_NBtn"), b = 0, e = d.length;
    1 != e && ($("#J_NPrev").click(function () {
        a("prev")
    }), $("#J_NNext").click(function () {
        a("next")
    }), c.show())
}, getServiceMsg: function () {
    var a = $("#J_ServNum");
    G.logic.login.getLoginUser(function (d) {
        d && (d.data &&
            a.length) && $.ajax({url: "http://service.yixun.com/json.php?mod=orderurge&act=getnoticemsg", dataType: "jsonp", cache: !0, scriptCharset: "gb2312", success: function (d) {
            if (0 == d.errno) {
                d = d.data;
                for (var b = 0, e = 0; 0 > e; e++) {
                    var f;
                    (f = d[e].count) && (b += f)
                }
                0 < b && a.html(b).show()
            }
        }})
    })
}, gettf: function () {
    function a(a) {
        a.lazyDo = a.lazyDo || "loadScriptWhenScroll";
        if ("function" == typeof b[a.lazyDo])b[a.lazyDo](a)
    }

    var d = window.tfList || [], c = window.tfsList || {}, b = this;
    timeStat[4] = new Date - timeStat[0];
    for (var e = 0, f = d.length; e < f; e++)a(d[e]);
    for (e in c)a(c[e])
}, loadTf: function (a) {
    var d = this.data.siteId, c = a.tfId, b = "&callback=" + (a.cb || "G.index.tfDataHandler"), e = "&skey=" + (3E5 < c ? this.data.areaId : d), f, g = "&wsid=" + d;
    if ("string" == typeof c)f = "http://s1.smart.yixun.com/w/tf/gettfx?type=jsonp&tfid=" + c + e + b + g; else if (c instanceof Array) {
        var h = G.header.common.getCookie;
        f = h("loc") || "0";
        h = h("prid") || "0";
        f = f.split("_")[4] || "0";
        h = h.split("_")[0];
        d = "&biReserved=0:" + h + "," + f + "," + d;
        c = c.join(",");
        f = "http://s1.smart.yixun.com/w/tf/gettfxs?tfids=" + c + e + b + g + d
    }
    return this.loadScript({url: f,
        dataType: "script", error: function (b) {
            $('[_module="' + a.tfId + '"]').each(function () {
                var a = $(this), b = a.attr("_f");
                if (b && "function" == typeof G.index[b])G.index[b]({dom: a});
                G.index.loadImgWhenScroll(a)
            })
        }})
}, tfDataHandler: function (a) {
    a = a ? a : {};
    var d = a.data, c = this;
    $('[_module="' + a.tfId + '"]').each(function () {
        var a = $(this), e = a.attr("id").match(/(POS_\d*)_/);
        if (e && (e = e[1]) && d[e]) {
            var f;
            c.fillDom(a, d[e], "fill");
            (f = a.attr("_lm")) && c.fillDom(a, d[f], "append")
        }
        if ((e = a.attr("_f")) && "function" == typeof c[e])c[e]({dom: a});
        else a.show();
        c.loadImgWhenScroll(a)
    })
}, fillDom: function (a, d, c) {
    if (d && 0 != d.length) {
        var b = [], e, f, g, h = "fill" == c;
        c = a.attr(h ? "_tpl" : "_lmTpl") || "tpl_goods";
        e = a.attr(h ? "_ytag" : "_lmYtag") || "30000";
        f = a.attr("_n");
        g = d.length;
        if (!(a.hasClass("sy_mod_rank_bd") && 5 > g)) {
            g = h && f ? Math.min(f, g) : g;
            c = this.templates[c];
            for (f = 0; f < g; f++) {
                var k = d[f];
                this.decorateData(k);
                b.push(c.replace(/\{(\w+)\}/g, function (a, b) {
                    return"ytag" == b ? e++ : k[b] || ""
                }))
            }
            h ? a.html(b.join("")) : a.append(b.join(""))
        }
    }
}, multiTplFill: function (a, d, c, b) {
    if (d && !(0 > d.length)) {
        for (var e = [], f, g, h, k = 0, m = d.length; k < m; k++) {
            g = d[k];
            h = a[g];
            f = this.templates[g];
            if (0 == h.length)break;
            var l = h.splice(0, 1)[0];
            h = h.check;
            b && (b[g] ? b[g].push(l) : b[g] = [l]);
            this.decorateData(l, h) ? e.push(f.replace(/\{(\w+)\}/g, function (a, b) {
                return"ytag" == b ? c++ : l[b] || ""
            })) : k--
        }
        return e.join("")
    }
}, decorateData: function (a, d) {
    var c = a.AREA_STOCK_INFO ? this.jsonparser(a.AREA_STOCK_INFO) : {}, b = a.EXTDATA ? a.EXTDATA : {}, e, f, g, h;
    "string" == typeof b && (0 != b.indexOf("{") && (b = "{" + b + "}"), b = this.jsonparser(b));
    a.mPRICE =
        a.PRICE;
    if (c = c[this.data.siteId])if (a.mPrice = c.price ? c.price : a.mPrice, e = c.multiInfo || {}, "market" == d ? (e = e["4:4"] || e["3:3"] || {}, a.DISPLAY = $.isEmptyObject(e) ? "none" : "block") : e = e["3:3"] || {}, a.PRICE = e.mPrice ? (e.mPrice / 100).toFixed(2) : c.price ? (c.price / 100).toFixed(2) : a.PRICE, a.SALECOUNT = c.sale_count ? c.sale_count : "20", a.LESSPRICE = (a.mPRICE - a.PRICE).toFixed(2), "tuan" == d && (!e.ETime || 0 >= e.ETime))return!1;
    if ((f = b.list) && (f = f[0]))for (var k in f)a[k] = f[k];
    (h = b.inventory) && (g = a.INVENTORY) && (a.STOCKPERCENT = (g / h).toFixed(2));
    a.SOLDNUM = !a.SOLDNUM && 0 == a.SOLDNUM ? a.PROMOTE : "已售" + (a.SOLDNUM += 50) + "件";
    if (c = a.IMG)0 < c.indexOf("/160?") ? (a.pic120 = c.replace(/\/160\?/, "/120?"), a.pic80 = c.replace(/\/160\?/, "/80?")) : (a.pic120 = c.replace(/\/pic160/, "/middle"), a.pic80 = c.replace(/\/pic160/, "/small"));
    (a.URL || a.url).replace(/[\?&]DAP=([^&#]*)/, function (b, d) {
        a.DAP = d
    });
    return!0
}, loadScriptWhenScroll: function (a) {
    var d = this.loadTf(a), c;
    a.tfId instanceof Array ? (c = "#tfs_" + a.groupId, $('[_group="' + a.groupId + '"]').attr("_arr", a.tfId.join("_"))) : c =
        "#tf_" + a.tfId;
    this.scroll({id: c, func: d})
}, mainSlider: function (a) {
    a = a.dom;
    var d = a.find("li").eq(0).show();
    d.attr("src", d.attr("_src"));
    a.show();
    this.createTab($("#J_STigger"), this.templates.tpl_sliderTrigger, $(".slider_img").find("li").length, "on", "li");
    this.slider({titleId: "#J_STigger", titleTag: "li", contentId: ".slider_img", contentTag: "li", prevId: "#J_SPrev", nextId: "#J_SNext", areaId: "#J_MainSlider"})()
}, quickBuy: function (a) {
    timeStat[5] = new Date - timeStat[0];
    a = a.dom;
    var d = a.find("li");
    d.eq(3).addClass("daily_goods_wide");
    d.eq(0).after('<li class="daily_goods_wide"></li>');
    a.hasClass("cur") && (a.show(), this.setStock())
}, qbTomorrow: function (a) {
    var d = this.data.serverTime, d = (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9)).getTime() + (9 <= d.getHours() ? 864E5 : 0) - d, c = this.createTimer(d, $("#quickH"), $("#quickM"), $("#quickS"), "div", "b");
    c(1, !0);
    setInterval(function () {
        c(0, !0)
    }, 1E3);
    var b = this.loadTf(a), e = 0, f = $(".daily_hd"), g = $(".daily_goods");
    $(".daily_change").click(function () {
        b();
        var a = (e + 1) % 2;
        g.eq(e).hide();
        g.eq(a).show();
        f.eq(e).hide();
        f.eq(a).show();
        e = a;
        return!1
    })
}, setStock: function () {
    $(".mod_goods_stock i").each(function () {
        var a = $(this), d = "mod_goods_stock_bg2", c = a.attr("w") || 0.5, c = 100 * parseFloat(c);
        100 < c ? c = 90 : 0 > c && (c = Math.floor(100 * Math.random() + 1));
        79 < c && 101 > c ? c = Math.floor(20 * Math.random() + 40) : 49 < c && 80 > c ? c = Math.floor(20 * Math.random() + 20) : 50 > c && 19 < c ? (c = Math.floor(20 * Math.random() + 5), d = "mod_goods_stock_bg1") : 0 <= c && (c = Math.floor(10 * Math.random() + 5), d = "mod_goods_stock_bg1");
        a.animate({width: c + "%"}, 1E3, "", function () {
            a.removeClass().addClass(d)
        })
    })
},
    adSlider: function (a) {
        a = a.dom;
        var d = a.attr("id");
        this.createTab($('[_trigger="' + d + '"]'), this.templates.tpl_trigger, $("#" + d).find("li").length, "glide_on", "i");
        this.slider({titleId: '[_trigger="' + d + '"]', titleTag: "i", contentId: "#" + d, contentTag: "li", className: "glide_on", speed: 0})();
        a.show()
    }, dealIntrest: function (a) {
        function d() {
            if (!(3 > q)) {
                for (var a = [], b = {}, d, c, e = t, f = 0; 3 > f; f++) {
                    if (0 == q)return;
                    d = l[p++];
                    c = g[d];
                    var h = k[d];
                    if ("tpl_tuan" == h)c.check = "tuan"; else if ("tpl_night" == h || "tpl_moring" == h)c.check = "market";
                    if (0 == c.length) {
                        c = v[h];
                        if (!c || 0 == c.length) {
                            q--;
                            l.splice(--p, 1);
                            continue
                        }
                        for (var m = 0, n = c.length; m < n; m++)g[d].push(c[m]);
                        c = g[d]
                    }
                    a.push(h);
                    b[h] = c;
                    p %= q
                }
                return G.index.multiTplFill(b, a, e, v)
            }
        }

        function c(a) {
            var b = $(".ulike_r1 li", a);
            a = $(".ulike_r2 li", a);
            b.eq(0).addClass("ulike_r1_narrow");
            b.eq(6).addClass("ulike_r1_narrow");
            a.eq(0).addClass("ulike_r2_narrow");
            a.hover(function () {
                $(this).addClass("ulike_r2_on")
            }, function () {
                $(this).removeClass("ulike_r2_on")
            });
            $(".mod_goods", b).each(function () {
                var a = $(this);
                0 == $(".mod_goods_promo", a).find("a").html().length && a.addClass("ulike_nocx")
            })
        }

        if (a) {
            var b, e, f, g;
            if (b = window.tfsList["1"])if (b = b.tfId, (e = a[b[0]]) && (e = e.data) && 0 != e.length)if ((f = a[b[1]]) && (f = f.data) && 0 != f.length)if ((g = a[b[2]]) && (g = g.data) && 0 != g.length) {
                var h = "tpl_goods tpl_goods tpl_ulikeAd tpl_ulikeAd tpl_goods tpl_goods tpl_goods tpl_ulikeAd tpl_goods tpl_goods tpl_goods tpl_ulikeAd".split(" "), k = {POS_1: "tpl_tuan", POS_2: "tpl_moring", POS_3: "tpl_night", POS_4: "tpl_new", POS_5: "tpl_hao", POS_6: "tpl_faxian"},
                    m = {};
                if ((m.tpl_goods = e.POS_1) && 8 < m.tpl_goods.length)if ((m.tpl_ulikeAd = f.POS_1) && 4 < m.tpl_ulikeAd.length) {
                    e = this.data.serverTime;
                    f = e.getHours();
                    f = 11 > f ? 7 > f ? 0 : 1 : 18 > f ? 2 : 3;
                    var l = "POS_1 POS_2 POS_3 POS_4 POS_5 POS_6".split(" "), n = a[b[2]].sortData, p = 0, q = 5;
                    2 > f ? l.splice(2, 1) : l.splice(1, 1);
                    if (n) {
                        l.sort(function (a, b) {
                            return n[a] > n[b]
                        });
                        a = 0;
                        for (b = l.length; a < b; a++)n[l[a]] || (q--, l.splice(a, 1), a--, b--)
                    }
                    b = 21E3;
                    var t = 21500, v = {}, r = this.multiTplFill(m, h, b);
                    mod2 = d();
                    var w = $('[_group="1"]');
                    if (r && mod2) {
                        $(".ulike_r1").html(r);
                        $(".ulike_r2").html(mod2);
                        c($("#ulikeS1"));
                        w.show();
                        for (a = 2; 5 > a && !(8 > m.tpl_goods.length || 3 > m.tpl_ulikeAd.length); a++) {
                            b += 1E3;
                            t += 1E3;
                            r = this.multiTplFill(m, h, b);
                            mod2 = d();
                            if (!r || !mod2)break;
                            w.append('<div class="ulike_bd" id="ulikeS' + a + '" style="display:none"><ul class="ulike_r1">' + r + '</ul><ul class="ulike_r2">' + mod2 + "</ul></div>");
                            c($("#ulikeS" + a))
                        }
                        var s = $(".ulike_bd"), u = 0, x = s.length, h = $(".ulike_r1 li", s.last());
                        12 > h.length ? $(".ulike_r1", s.last()).append('<li><div class="ulike_r1_brand ulike_guang"><a target="_blank" href="http://guang.yixun.com" alt="去逛逛" ytag="24999"><b>想看更多喜欢？</b><i class="ulike_guang_bg"></i></a></div></li>') :
                            h.last().html('<div class="ulike_r1_brand ulike_guang"><a target="_blank" href="http://guang.yixun.com" alt="去逛逛" ytag="24999"><b>想看更多喜欢？</b><i class="ulike_guang_bg"></i></a></div>');
                        h = (new Date(e.getFullYear(), e.getMonth(), e.getDate(), [7, 11, 18, 24][f])).getTime() - e;
                        $(".yugaoSpan").html(0 == f % 2 ? "距开始" : "距结束");
                        var y = this.createTimer(h, $(".timeH"), $(".timeM"), $(".timeS"), "div", "b", !1);
                        setInterval(function () {
                            y()
                        }, 1E3);
                        1 != x && $(".ulike_change").click(function () {
                            var a = (u + 1) % x;
                            s.eq(u).hide();
                            s.eq(a).show();
                            u = a;
                            return!1
                        }).show()
                    }
                }
            }
        }
    }, hsTabs: function (a) {
        var d = this.loadTf(a), c = a.tfId, b = $("#" + c).find("li"), e = 1, f = 0;
        $('[_module="' + c + '"]').each(function () {
            $(this).attr("_f", "hsLazydo").attr("id", "POS_" + e++ + "_" + c)
        });
        b.each(function () {
            var a = $(this);
            $("a", this).bind("mouseover click", function () {
                if (!a.hasClass("on")) {
                    var c = b.eq(f), e = a.index();
                    d();
                    c.removeClass("on");
                    a.addClass("on");
                    $('[_tab="' + a.attr("id") + '"]').removeClass("hide");
                    e != f && $('[_tab="' + c.attr("id") + '"]').addClass("hide");
                    f = e
                }
            })
        })
    }, hsSlider: function (a, d, c) {
        function b() {
            var b = (d + 1) % c;
            a.eq(d).trigger("click");
            d = b
        }

        a.eq(d).trigger("click");
        var e = setInterval(b, 6E3);
        a.each(function () {
            var a = $(this), c = a.parent().attr("id");
            a.hover(function () {
                clearInterval(e);
                c.replace(/Fht_(\d+)/, function (a, b) {
                    d = b
                })
            }, function () {
                e = setInterval(b, 6E3)
            });
            $('[_tab="' + c + '"]').hover(function () {
                clearInterval(e)
            }, function () {
                e = setInterval(b, 6E3)
            })
        })
    }, right2FAd: function () {
        var a = 0, d = $(".flider_trigger a"), c = $(".flider_img a");
        c.each(function () {
            var a = $("img", this);
            a.attr("_src") &&
            a.attr("src", a.attr("_src")).removeAttr("_src")
        });
        d.mouseover(function () {
            var b = $(this).index();
            b != a && (d.eq(a).removeClass("flider_trigger_lk_on"), d.eq(b).addClass("flider_trigger_lk_on"), c.eq(a).hide(), c.eq(b).show(), a = b)
        })
    }, goodsLazydo: function (a) {
        a = a.dom;
        $(".mod_goods", a).each(function () {
            var a = $(this);
            a.parent().addClass("sy_mod_fgoods_low");
            0 == $(".mod_goods_promo", a).find("a").html().length && a.addClass("sy_goods_nocx")
        });
        a.show();
        a = a.parents(".sy_mod_f");
        a = $(".sy_mod_rank_ext a", a);
        var d = a.length,
            c = Math.floor(Math.random() * d);
        this.hsSlider(a, c, d)
    }, syGoodsLazydo: function (a) {
        a = a.dom;
        $(".mod_goods", a).each(function () {
            var a = $(this);
            0 == $(".mod_goods_promo", a).find("a").html().length && a.addClass("sy_goods_nocx")
        });
        a.show()
    }, hsLazydo: function (a) {
        a = a.dom;
        var d = 1;
        0 == a.find(".sy_mod_rank_order").length && $(".mod_goods", a).each(function () {
            $(this).parent().prepend('<i class="sy_mod_rank_order sy_mod_rank_order_' + d + '">' + d++ + "</i>")
        })
    }, createTimer: function (a, d, c, b, e, f) {
        if (!(0 >= a)) {
            var g = function (a) {
                var b =
                    a.wrap, c = a.inner, d = a.data;
                a.el.each(function () {
                    var a = $(this);
                    $(b + " " + c, a).eq(0).html(d);
                    $(b, a).eq(1).addClass("animRollTop");
                    $(b, a).eq(3).addClass("animRollBtm");
                    setTimeout(function () {
                        $(b + " " + c, a).eq(1).html(d);
                        $(b + " " + c, a).eq(3).html(d);
                        $(b, a).eq(1).removeClass("animRollTop")
                    }, 200);
                    setTimeout(function () {
                        $(b + " " + c, a).eq(2).html(d);
                        $(b, a).eq(3).removeClass("animRollBtm")
                    }, 400)
                })
            };
            return function (h, k) {
                if (!(0 > a)) {
                    var m = Math.floor(a / 36E5), l = Math.floor(a / 6E4 % 60), n = Math.floor(a / 1E3 % 60);
                    10 > m ? m = "0" + m : "";
                    10 > l ? l = "0" + l : "";
                    10 > n ? n = "0" + n : "";
                    a -= 1E3;
                    k ? (g({el: b, data: n, wrap: e, inner: f}), (h || "59" == n) && g({el: c, data: l, wrap: e, inner: f}), (h || "59" == l && "59" == n) && g({el: d, data: m, wrap: e, inner: f})) : (d.html(m), c.html(l), b.html(n))
                }
            }
        }
    }, createTab: function (a, d, c, b, e) {
        if (!(2 > c)) {
            for (var f = [], g = 1, h = 0; h < c; h++)f.push(d.replace(/\{(\w+)\}/g, function (a, b) {
                if ("index" == b)return g++
            }));
            a.html(f.join("")).find(e).eq(0).addClass(b);
            a.show()
        }
    }, slider: function (a) {
        return function () {
            function d() {
                clearInterval(l.timer);
                l.timer = setInterval(function () {
                    c((f +
                        1) % b.len)
                }, b.autoLag)
            }

            function c(a) {
                f != a && (h.removeClass(function () {
                    return b.className
                }).eq(a).addClass(b.className), "fade" == b.effect && (g.eq(f).stop(0, 1).fadeOut(2 * b.speed), g.eq(a).stop(0, 1).css("opacity", "0.8").fadeIn(b.speed, function () {
                    $(this).css("opacity", 1)
                }), f = a))
            }

            var b = {titleId: "", titleTag: "", contentId: "", contentTag: "", prevId: "", nextId: "", areaId: "", className: "on", initIndex: 0, timeLag: 300, auto: !0, speed: 200, autoLag: 6E3, effect: "fade", backAttr: "_src"}, e;
            for (e in a)b[e] = a[e];
            var f = b.initIndex, g =
                $(b.contentId).find(b.contentTag), h = $(b.titleId).find(b.titleTag), k = $(b.prevId), m = $(b.nextId);
            e = $(b.areaId);
            var l = arguments.callee, n = 0 < k.length && 0 < m.length;
            0 == e.length && (e = g);
            b.len = Math.min(h.length, g.length);
            0 != b.len && (g.each(function () {
                var a = $("img", this), c;
                (c = a.attr(b.backAttr)) && a.attr("src", c).removeAttr(b.backAttr)
            }), 1 == b.len ? h.hide() : (h.show(), d(), h.hover(function () {
                clearInterval(l.timer);
                c($(this).index())
            }, function () {
                d()
            }), g.hover(function () {
                clearInterval(l.timer)
            }, function () {
                d()
            }), n && (k.click(function () {
                c((f +
                    b.len - 1) % b.len)
            }).hover(function () {
                    clearInterval(l.timer)
                }, function () {
                    d()
                }), m.click(function () {
                c((f + 1) % b.len)
            }).hover(function () {
                clearInterval(l.timer)
            }, function () {
                d()
            }), e.hover(function () {
                k.show();
                m.show()
            }, function () {
                k.hide();
                m.hide()
            }))))
        }
    }, loadScript: function (a) {
        var d = 0;
        if (a.url)return function () {
            1 == d || 2 == d || (d = 1, $.ajax({url: a.url, dataType: a.dataType, timeout: 4E3, success: function (c) {
                d = 2;
                a.success && "function" === typeof a.success && a.success(c)
            }, error: function (c, b) {
                d = 0;
                a.error && "function" === typeof a.error &&
                a.error(b)
            }, cache: !0}))
        }
    }, jsonparser: function (a) {
        return"undefined" != typeof JSON && JSON.parse ? JSON.parse(a) : (new Function("return " + a.replace(/^\s+/, "")))()
    }, getY: function (a) {
        return 0 == a.length ? 0 : a.offset().top
    }, loadImgWhenScroll: function () {
        function a(a) {
            for (var c = 0, d = a.data.length; c < d; c++) {
                var g = a.data[c], h = $(g).attr("_src");
                h && !g.src && $(g).attr("src", h).removeAttr("_src")
            }
        }

        var d = G.index, c = d.data && d.data.visibleH;
        return function (b) {
            b = b || document;
            b = $("img[_src]", b);
            var e = {}, f = b.length;
            if (0 != f) {
                for (var g = 0; g <
                    f; g++) {
                    var h = b[g], k = d.getY($(h));
                    0 != k && (k = k > c ? k : 0, e[k] ? e[k].push(h) : e[k] = [h])
                }
                for (g in e)d.scroll({height: g, data: e[g], func: a})
            }
        }
    }(), scroll: function (a) {
        function d() {
            b.throttle(c, null, 100)
        }

        function c() {
            var a = g.heightList.length;
            if (0 === a)return e.unbind("scroll", d), e.unbind("resize", d), null;
            var b = h ? h.pageYOffset : 0, c = g.visibleH, n = [];
            try {
                c += Math.max(f.body.scrollTop, f.documentElement.scrollTop, b)
            } catch (p) {
            }
            for (b = 0; b < a && g.heightList[b]; b++)c > g.heightList[b] && (n.push(g.optList[b]), g.heightList.splice(b,
                1), g.optList.splice(b, 1), b--);
            if (0 < n.length) {
                a = 0;
                for (c = n.length; a < c; a++)n[a].func(n[a])
            }
        }

        var b = G.index, e = $(window), f = document, g = {isBind: !1, heightList: [], optList: [], visibleH: b.data&& b.data.visibleH}, h = f.defaultView;
        return function (a) {
            !0 == a.clean && (g.heightList = [], g.optList = []);
            var c = void 0 != a.height ? a.height : b.getY($(a.id)), c = c - 200;
            g.visibleH < c ? (g.heightList.push(1 * c), g.optList.push(a)) : a.func(a);
            g.isBind || (e.bind("scroll", d), e.bind("resize", d), g.isBind = !0)
        }
    }(), throttle: function (a, d, c) {
        clearTimeout(a.tId);
        a.tId = setTimeout(function () {
            a.call(d)
        }, c)
    }});
/*  |xGv00|d8e35d4124f82c063c7eed76e1948cb5 */


try {
    G.index.tfDataHandler({"data": {"POS_1": [{"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130925174605248590.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130925174621537266.jpg","remarks": "","title": "乐视TV","url": "http://u.yixun.com/letv?cp-ptss=1810-8-126217-t&DAP=3687773589174994284:563798767808022273:2:10599143"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130924115221637708.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130924115221637708.jpg","remarks": "","title": "每日精选","url": "http://event.yixun.com/event/123155fb3.html?cp-ptss=1793-2-17466-t&DAP=3687773589174994284:563798767808022273:2:9924788"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130923145647159306.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130923145647159306.jpg","remarks": "","title": "百货第四波","url": "http://event.yixun.com/event/133233640.html?cp-ptss=1793-2-36769-t&DAP=3687773589174994284:563798767808022273:2:10599224"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130925151021196518.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130925151021196518.jpg","remarks": "","title": "NOTE3 首发","url": "http://event.yixun.com/event/130451583.html?cp-ptss=1810-8-81972-t&DAP=3687773589174994284:563798767808022273:2:10599177"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130926114912250427.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130926114912250427.jpg","remarks": "","title": "金九狂欢第4波","url": "http://event.yixun.com/event/1328452d5.html?cp-ptss=1793-2-27798-t&DAP=3687773589174994284:563798767808022273:2:9924715"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130927132321374659.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130927132321374659.jpg","remarks": "","title": "联想平板首发","url": "http://event.yixun.com/event/131265459.html?cp-ptss=1793-2-57472-t&DAP=3687773589174994284:563798767808022273:2:10689641"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130926132434357131.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130926132441935351.jpg","remarks": "","title": "亿元掉落三重礼","url": "http://event.yixun.com/event/13220d0d8.html?cp-ptss=1793-2-9350-t&DAP=3687773589174994284:563798767808022273:2:10691344"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130923093231465131.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130923093231465131.jpg","remarks": "","title": "家电特价送券","url": "http://event.yixun.com/event/13216a97e.html?cp-ptss=1793-2-35370-t&DAP=3687773589174994284:563798767808022273:2:9924773"}]},"POOLID": 1793}]},"iRet": 0,"msg": "","sortData": {"POS_1": 1},"tfId": 300020}
    );
} catch (e) {
}
;
