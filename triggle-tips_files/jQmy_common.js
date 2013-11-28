;(function(global){var _sNav=' \
            <!-- 个人信息-->\
            <div class="i_mod_boxA i_mod_boxA0 lbox_1">\
                <div class="i_mod_boxA_hd i_mod_boxA_hd0">\
                    <!-- S-页内登录组件 -->\
                    <div class="mod_mlogin">\
                        <!--登录前-->\
                        <div class="mod_mlogin_bd mod_mlogin_bd1" id="v:logout_user_detail" style="display:block">\
                            <a href="javascript:void(0);" onclick="javascript:openLoginWindow();" class="mod_btnfix mod_btn_loginA"><span class="hidden">用户登录</span></a>\
                        </div>\
                        <!--登录后-->\
                        <div class="mod_mlogin_bd">\
                            <!--登录模块mod_uinfo-->\
                            <div class="mod_uinfo">\
                                <!-- 已登录开始 -->\
                                <div class="mod_ptl mod_uinfo_bd" id="v:login_user_detail" style="display:none">\
                                    <a href="http://face.qq.com/" target="_blank">[%=@face%]</a>\
                                    <div class="uinfo_main">\
                                        <div class="c_sub2 uinfo_wc">您好，<span class="c_sub2 uinfo_name">[%=@nick%]</span></div>\
                                        <div class="uinfo_flags clearfix"><!--下面的图标在末尾加0即未点亮状态，例如ico_uflag_cb0-->\
                                            [%=@is_light_icon%]\
                                            <!--a class="ico_gb ico_uflag ico_uflag_m" href="#"><span>手机</span></a-->\
                                            [%=@is_open_cft%]\
                                            <!--a class="ico_gb ico_uflag ico_uflag_addr" href="#"><span>地址</span></a-->\
                                            <!--a class="ico_gb ico_uflag ico_uflag_rss" href="#"><span>订阅</span></a-->\
                                            <a class="lnk_logoff" href="javascript:void(0);" onclick="javascript:try{logout();}catch(e){};"><span>退出</span></a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <!--/mod_uinfo-->\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <!--个人中心导航模块：i_mod_nav-->\
            <div class="i_mod_nav">\
                <div class="i_mod_nav_bd">\
                    <ul class="nav_list">\
                        <li class="first clearfix">\
                            <a href="/my/my_jifen.html" {MY_JIFEN}>\
                                <span>我的彩贝中心</span>\
                                <span class="mod_iconarr mod_iconarr_r" >\
                                    <span class="mod_iconarr_yl"></span>\
                                </span>\
                            </a>\
                        </li>\
                        <li class="clearfix">\
                            <a href="/my/my_jifen_source.html" {MY_JIFEN_SOURCE}>\
                                <span>赚取彩贝记录</span>\
                                <span class="mod_iconarr mod_iconarr_r">\
                                    <span class="mod_iconarr_yl"></span>\
                                </span>\
                            </a>\
                        </li>\
                        <li class="clearfix">\
                            <a href="/my/my_exchange.html" {MY_EXCHANGE}>\
                                <span>使用彩贝记录</span>\
                                <span class="mod_iconarr mod_iconarr_r">\
                                    <span class="mod_iconarr_yl"></span>\
                                </span>\
                            </a>\
                        </li>\
                        <li class="clearfix">\
                        <a href="/my/my_lottery.html" {MY_LOTTERY}>\
                            <span>任务与活动中奖物品记录</span>\
                            <span class="mod_iconarr mod_iconarr_r">\
                                <span class="mod_iconarr_yl"></span>\
                            </span>\
                        </a>\
                        </li>\
                        <li class="clearfix">\
                        <a href="/my/my_coupon.html" {MY_COUPON}>\
                            <span>我的优惠券</span>\
                            <span class="mod_iconarr mod_iconarr_r">\
                                <span class="mod_iconarr_yl"></span>\
                            </span>\
                        </a>\
                        </li>\
                        <li class="last clearfix">\
                            <a href="/my/my_addr.html" {MY_ADDR}>\
                                <span>个人资料</span>\
                                <span class="mod_iconarr mod_iconarr_r">\
                                    <span class="mod_iconarr_yl"></span>\
                                </span>\
                            </a>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
            <!--/i_mod_nav-->\
            <!--个人资料-->\
            <div class="i_mod_boxA lbox_2" >\
                <div class="i_mod_boxA_hd">\
                    <h3>个人资料</h3>\
                </div>\
                <div class="i_mod_boxA_bd" id="v:login_preferred_info" style="display:none;">\
                    <ul class="tb_uinfo">\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                            <span class="i_ico i_ico_user"></span>\
                            </div>\
                            <div class="col_l col_txt">\
                                [%=@preName%]\
                            </div>\
                        </li>\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                                <span class="i_ico i_ico_addr"></span>\
                            </div>\
                            <div class="col_l col_txt">\
                                [%=@preAddr%]\
                            </div>\
                        </li>\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                                <span class="i_ico i_ico_mobile"></span>\
                            </div>\
                            <div class="col_l col_txt">\
                                [%=@preMobile%]\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="i_mod_boxA_bd" id="v:no_preferred_info" style="display:">\
                <ul class="tb_uinfo">\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                            <span class="i_ico i_ico_user"></span>\
                            </div>\
                            <div class="col_l col_txt" id="v:no_preferred_name">\
                            </div>\
                        </li>\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                                <span class="i_ico i_ico_addr"></span>\
                            </div>\
                            <div class="col_l col_txt" id="v:no_preferred_hint">\
                                加载中\
                            </div>\
                        </li>\
                        <li class="clearfix">\
                            <div class="col_l col_ico">\
                                <span class="i_ico i_ico_mobile"></span>\
                            </div>\
                            <div class="col_l col_txt" id="v:no_preferred_mobile">\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="i_mod_boxA_ft">\
                    <a href="/my/my_addr.html" class="lnk_edit">\
                        <span>修改信息</span>\
                        <span class="mod_iconarr mod_iconarr_r">\
                            <span class="mod_iconarr_bk"></span>\
                        </span>\
                    </a>\
                </div>\
           </div>';var objReplace={'{MY_JIFEN}':'','{MY_JIFEN_SOURCE}':'','{MY_ADDR}':'','{MY_EXCHANGE}':'','${MY_CDK}':'','${MY_LOTTERY}':''};function _writeNav(sFlag){var sFlag=['{',sFlag||'','}'].join('');objReplace[sFlag]='class="nav_on"';var _sNavTPL=_sNav;for(var key in objReplace){_sNavTPL=_sNavTPL.replace(new RegExp(key,'gm'),objReplace[key]);}
document.write(_sNavTPL);};global.JIFEN=global.JIFEN||{};global.JIFEN.INFO.MY={writeNav:_writeNav};})(window);function initMyPreferredAddr(){curEditAddrId=-1;var objParam={cmd:'getPreferredAddr',g_tk:$.cb.security.getAntiCSRFToken()};$.getJSON('http://cb.qq.com/my/paipai_addr_cmd.php?callback=?',objParam,function(data){if(data.iUin<JIFEN.gMinUin){JIFEN.openLoginWindow();return;}
if(data.errorCode==JIFEN.CONST_RET_OK){if(data.iCount<1){$('#v\\:no_preferred_hint').html("暂无首选地址");$('#v\\:no_preferred_name').html("未填写");$('#v\\:no_preferred_mobile').html("未填写");$('#v\\:no_preferred_info').show();$('#v\\:login_preferred_info').hide();return;}
var mobile=_.escape(data.sRecvMobileNo);mobile=mobile.substr(0,3)+"******"+mobile.substr(9,10);var sTPL=JIFEN.getElementTPL('v:login_preferred_info');sTPL=sTPL.replace(/<%=@preName%>/g,_.escape(data.sRecvName));sTPL=sTPL.replace(/<%=@preAddr%>/g,_.escape(data.sRecvProvince+' '+data.sRecvCity+' '
+data.sRecvDistrict+' '+data.sRecvAddr));sTPL=sTPL.replace(/<%=@preMobile%>/g,mobile);$('#v\\:login_preferred_info').show();var oLoginDiv=$('#v\\:login_preferred_info');oLoginDiv.html(sTPL);$('#v\\:no_preferred_info').hide();}else{var sTPL=JIFEN.getElementTPL('v:login_preferred_info');sTPL=sTPL.replace(/<%=@preName%>/g,'');sTPL=sTPL.replace(/<%=@preAddr%>/g,'加载失败…');sTPL=sTPL.replace(/<%=@preMobile%>/g,'');$('#v\\:login_preferred_info').show();var oLoginDiv=$('#v\\:login_preferred_info');oLoginDiv.html(sTPL);$('#v\\:no_preferred_info').hide();}});};/*  |xGv00|f396316d459f010870c90448738af950 */