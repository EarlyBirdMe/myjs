;(function(global){var cms_banner={'tourl':'','img':'http://imgcache.qq.com/vipstyle/caibei/v2/public/img/bg_banner.jpg','name':'官网topper'};var divclassname='grid_c1',flashhtml='',toplink='',styleimg='';if(cms_banner['img'].indexOf('.swf')>-1){divclassname='grid_c1 ann_top';flashhtml='<div class="ann_top_flashbanner">\
       <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="84" width="980">\
        <param name="movie" value="http://imgcache.qq.com/vipstyle/caibei/v2/portal/img/other/anniversary.swf">\
        <param name="quality" value="high">\
        <param name="wmode" value="transparent">\
        <!--[if !IE]>-->\
        <object type="application/x-shockwave-flash" data="http://imgcache.qq.com/vipstyle/caibei/v2/portal/img/other/anniversary.swf" height="84" width="980">\
         <param name="quality" value="high">\
         <param name="wmode" value="transparent">\
         <!--<![endif]-->\
         本页面需要Adobe Flash Player 10及以上版本，现在就下载：\
         <a href="http://www.adobe.com/go/getflashplayer"><img alt="获取 Adobe Flash player" init_src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"></a>\
         <!--[if !IE]>-->\
        </object>\
        <!--<![endif]-->\
       </object>\
      </div>\
      <div class="mod_banner_cover"></div>';}else if(cms_banner['img']){styleimg='background:url('+cms_banner['img']+') no-repeat scroll 0 0 transparent';}
if(cms_banner['tourl']){toplink='<a class="ann_top_falshlink" href="'+cms_banner['tourl']+'" target="_blank" title="'+cms_banner['name']+'" >'+cms_banner['name']+'</a>';}
var _sV2Top=' \
      <!--S-顶部导航--> \
      <div class="sec_topnav templateNeedDelete"> \
          <div class="grid_c1"> \
          <!--mod_toolbar--> \
          <div class="mod_toolbar clearfix"> \
              <ul class="col_r mod_hlist topnav_list">\
                  <li>\
                      <div class="mod_logininfo">\
                          <!--已登录-->\
                          <div class="c_sub1 info_logined"  style="display:none" id="v:login_info">\
                              欢迎您，<span class="u_nickname" id="v:top_nick">用户昵称</span>\
                              <a href="javascript:void(0);" class="lnk_logout" title="退出" id="v:top_logout">退出</a><span class="nav_split"><span>|</span></span><a href="http://cb.qq.com/my/my_jifen.html" class="lnk_cbpoint">彩贝:&nbsp;<span id="v:jifen_balance" class="c_em1_1" class="n_cbpoint">加载中</span></a>\
                          </div>\
                          <!--未登录-->\
                          <p id="v:logout_info" style="display:none;">您还未登录，请<a class="lnk_nav lnk_login" href="javascript:void(0);" id="v:top_login" title="登录">登录</a></p>\
                      </div>\
                  </li>\
                  <li class="nav_split"><span>|</span></li>\
                  <li><a href="http://cb.qq.com/help.html" target="_blank" class="lnk_nav lnk_help">帮助中心</a></li>\
                  <li class="nav_split"><span>|</span></li>\
                  <li><a href="http://t.qq.com/qqcaibei" target="_blank" class="lnk_nav lnk_tcb">彩贝微博</a></li>\
                  <li class="nav_split"><span>|</span></li>\
                  <li><a href="http://vip.qq.com" target="_blank" class="lnk_nav lnk_vipsrv">QQ会员</a><a href="http://cb.qq.com/my/mail_subscribe.html?attach=100.0000.00.100.00&QQ_from=100.0000.00.100.00" target="_blank" class="mod_btn mod_btn_gr"><span class="mod_btn_bd"><span class="ico_gb ico_add_b"></span> 订阅邮件</span></a></li>\
              </ul>\
          </div>\
          <!--/mod_toolbar-->\
          </div>\
      </div>\
      <!--E-顶部导航-->\
      <!--S-头部-->\
    <div class="sec_header">\
     <div class="'+divclassname+'">\
      '+flashhtml+'\
      <div class="mod_banner clearfix" style="'+styleimg+'">\
       <!--logo-->\
       <div class="col_l mod_logo">\
        <h1><a href="http://cb.qq.com/" title="QQ彩贝积分"><span class="hidden">QQ彩贝积分</span></a></h1>\
       </div>\
       '+toplink+'\
       <!--S-搜索组件-->\
       <div class="col_r mod_searchfull">\
        <!--搜索条-->\
        <div id="islistshow" class="mod_search"><!--:mod_search_hot表示高亮-->\
         <div class="mod_search_bd">\
          <input id="searchtext" type="text" class="ipt_search" value="请输入商家名称"/>\
          <span class="ico_gb ico_search"></span>\
         </div>\
         <div id="isclicklistshow" class="mod_search_ft">\
          <!--搜索没结果-->\
          <div id="se_result_con" class="mod_search_result" style="display:none">\
           <div class="mod_search_result_hd">\
            点击进入商家\
           </div>\
           <div class="mod_search_result_bd">\
            <!--搜索有结果-->\
            <ul id="resultlist"></ul>\
           </div>\
          </div>\
          <!--/搜索有结果-->\
          <!--无搜索结果-->\
          <div id="se_result_err" class="mod_search_noresult" style="display:none">\
           <div class="mod_search_noresult_bd">\
            <span class="ico_gb ico_alert1"></span>无搜索结果，请重新输入。\
           </div>\
           <span class="ico_gb ico_ylarr_u"></span>\
          </div>\
          <!--/无搜索结果-->\
         </div>\
         <!--/mod_search_ft-->\
        </div>\
        <!--商家下拉选择-->\
        <div class="mod_ddlclient">\
         <div class="mod_ddlclient_hd clearfix">\
          <span class="col_l client_name">商家</span>\
          <span class="col_l mod_iconarr mod_iconarr_d mod_iconarr_sd">\
           <span class="mod_iconarr_bl"></span>\
          </span>\
         </div>\
         <div class="mod_ddlclient_bd">\
          <!--TODO:商家下拉浮层-->\
         </div>\
        </div>\
       </div>\
       <!--E-搜索组件-->\
      </div>\
     </div>\
    </div>';var _sV2Nav=' \
          <!--S-菜单--> \
          <div class="sec_menu templateNeedDelete"> \
              <div class="grid_c1"> \
                  <div class="f_tx1 mod_menu clearfix"> \
                      <div class="col_l mod_menu_bd"> \
                          <ul class="mod_hlist menu_main"> \
                          <li id="v:nav_index"><a href="http://cb.qq.com/" class="lnk_home {CB_INDEX}"><span class="lbl_m lbl_home">首页</span></a></li> \
                          <li id="v:nav_service"><a href="http://cb.qq.com/service.html" class="lnk_srv {CB_SERVICE}"><span class="lbl_m lbl_srv">彩贝积分服务</span></a> \
                          <!--子弹出菜单--> \
        <div class="mod_subpopmenu subpopmenu_1" style="display:none"> \
         <div class="mod_subpopmenu_bd" style="width:100%"> \
          <ul class="subpopmenu_list"> \
           <li> \
            <a href="http://cb.qq.com/service.html"> \
             <span>彩贝积分介绍</span> \
            </a> \
           </li> \
           <li> \
            <a href="http://cb.qq.com/publicize.html"> \
             <span>彩贝积分宣传</span> \
            </a> \
           </li> \
          </ul> \
         </div> \
        </div> \
        <!--/子菜单--> \
                          </li> \
                          <li id="v:nav_jifen"><a href="http://cb.qq.com/shop/mall/" class="lnk_get {GET_JIFEN}"><span class="lbl_m lbl_get">赚取彩贝</span></a> \
                          <!--子弹出菜单--> \
        <div class="mod_subpopmenu subpopmenu_2" style="display:none"> \
         <div class="mod_subpopmenu_bd" style="width:100%"> \
          <ul class="subpopmenu_list menu_hasico"> \
           <li> \
            <a href="http://cb.qq.com/shop/mall/"> \
             <span>商家导航</span> \
            </a> \
           </li> \
           <li> \
            <a href="http://cb.qq.com/trip.html"> \
             <span class="ico_gb ico_menu_trval"></span> \
             <span>商旅频道</span> \
            </a> \
           </li> \
                                      <li> \
            <a href="http://cb.qq.com/shop/tuan/" target="_blank"> \
             <span class="ico_gb ico_menu_gruop"></span> \
             <span>团购优惠</span> \
            </a> \
           </li> \
           <li> \
            <a href="http://cb.qq.com/pay.html"> \
             <span class="ico_gb ico_menu_xuni"></span> \
             <span>腾讯业务</span> \
            </a> \
           </li> \
           <li> \
            <a href="http://cb.qq.com/shop/"> \
             <span class="ico_gb ico_menu_shop"></span> \
             <span>返利商城</span> \
            </a> \
           </li> \
            <li> \
            <a href="http://cb.qq.com/cdkey/"> \
              <span class="ico_gb ico_menu_key"></span> \
              <span>兑换码激活</span> \
            </a> \
           </li>\
     <li> \
     <a href="http://cb.qq.com/task/"> \
       <span class="ico_gb ico_menu_task"></span> \
       <span>拾贝任务</span> \
     </a> \
    </li>\
          </ul> \
         </div> \
        </div> \
        <!--/子菜单--> \
                          </li> \
                          <li id="v:nav_use"><a href="http://cb.qq.com/jifen/" class="lnk_use {USE_JIFEN}"><span class="lbl_m lbl_use">使用彩贝</span></a> \
                          <!--子弹出菜单--> \
        <div class="mod_subpopmenu subpopmenu_3" style="display:none"> \
         <div class="mod_subpopmenu_bd" style="width:100%"> \
               <ul class="subpopmenu_list menu_hasico"> \
           <li> \
            <a href="http://cb.qq.com/jifen/"> \
             <span class="ico_gb ico_menu_jifen"></span> \
             <span>积分商城</span> \
            </a> \
           </li> \
           <li> \
            <a href="http://cb.qq.com/jifen/cash.html"> \
             <span>积分支付</span> \
            </a> \
           </li> \
          </ul> \
         </div> \
        </div> \
        <!--/子菜单--> \
                          </li> \
                          <li><a href="http://cb.qq.com/active_main_board.html" class="lnk_act {ACT_PAGE}"><span class="lbl_m lbl_act">彩贝活动</span></a></li> \
                          <li><a href="http://bbs.cb.qq.com/" class="lnk_bbs" target="_blank"><span class="lbl_m lbl_bbs">彩贝论坛</span></a></li> \
                          <li><a href="http://cb.qq.com/my/my_jifen.html" class="lnk_ihome {I}"><span class="lbl_m lbl_ihome">个人中心</span></a></li>\
                          </ul> \
                      </div> \
                      <div class="col_r mod_menu_ext"> \
                          <ul class="mod_hlist"> \
                              <li><a href="http://cb.qq.com/shop/" class="lnk_mall" target="_blank"><span class="lbl_m lbl_mall">购物商城</span></a></li> \
                              <li><a href="http://cb.qq.com/jifen/" class="lnk_mallcb" target="_blank"><span class="lbl_m lbl_mallcb">积分商城</span></a></li> \
                          </ul> \
                          <div class="mod_menu_ext_bg"></div> \
                      </div> \
                  </div> \
                  <!--子菜单--> \
                  <div class="mod_submenu" style="display:{IS_SUB_MENU};"> \
                      <div class="mod_submenu_bd"> \
                          <!--一个子菜单对应一个ul。请注意根据主菜单的索引ID给子菜单加类名submenu_{index}--> \
                          <!--例如：菜单“彩贝积分服务”的索引是1，那么对应的子菜单类名为submenu_1--> \
                          <!--"彩贝积分服务"的子菜单--> \
                          <ul class="mod_hlist submenu_list submenu_1" style="display:{CB_SERVICE_SUB}"> \
                              <li> \
                                  <a href="http://cb.qq.com/service.html" class="{CB_SERVICE_SUB1}"> \
                                  <span>彩贝积分介绍</span> \
                                  <span class="mod_iconarr mod_iconarr_u"> \
                                      <span class="mod_iconarr_yl"></span> \
                                  </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/publicize.html" class="{CB_SERVICE_SUB2}"> \
                                      <span>彩贝积分宣传</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                          </ul> \
                          <!-- "赚取积分"子菜单 --> \
                          <ul class="mod_hlist submenu_list submenu_2" style="display:{GET_JIFEN_SUB}"> \
                              <li> \
                                  <a href="http://cb.qq.com/shop/mall/" class="{GET_JIFEN_SUB1}"> \
                                  <span>商家导航</span> \
                                  <span class="mod_iconarr mod_iconarr_u"> \
                                      <span class="mod_iconarr_yl"></span> \
                                  </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/trip.html" class="{GET_JIFEN_SUB2}"> \
                                      <span>商旅频道</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/shop/tuan/" target="_blank" class="{GET_JIFEN_SUB3}"> \
                                      <span>团购优惠</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/pay.html" class="{GET_JIFEN_SUB4}"> \
                                      <span>腾讯业务</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/shop/" target="_blank" class="{GET_JIFEN_SUB5}"> \
                                      <span>返利商城</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
         <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/cdkey/" class="{GET_JIFEN_SUB6}"> \
                                      <span>兑换码激活</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
         <li class="menu_split"><span></span></li> \
         <li> \
          <a href="http://cb.qq.com/task/" class="{GET_JIFEN_SUB7}"> \
           <span>拾贝任务</span> \
           <span class="mod_iconarr mod_iconarr_u"> \
            <span class="mod_iconarr_yl"></span> \
           </span> \
          </a> \
         </li> \
                          </ul> \
                          <!-- "使用积分"的子菜单 --> \
                          <ul class="mod_hlist submenu_list submenu_3" style="display:{USE_JIFEN_SUB}"> \
                              <li> \
                                  <a href="http://cb.qq.com/jifen/" class="{USE_JIFEN_SUB1}" target="_blank"> \
                                  <span>积分商城</span> \
                                  <span class="mod_iconarr mod_iconarr_u"> \
                                      <span class="mod_iconarr_yl"></span> \
                                  </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="http://cb.qq.com/jifen/cash.html" class="{USE_JIFEN_SUB2}"> \
                                      <span>积分支付</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                              <li class="menu_split"><span></span></li> \
                              <li> \
                                  <a href="javascript:void(0);" target="_blank" class="{USE_JIFEN_SUB3}" style="display:none"> \
                                      <span>特色兑换</span> \
                                      <span class="mod_iconarr mod_iconarr_u"> \
                                          <span class="mod_iconarr_yl"></span> \
                                      </span> \
                                  </a> \
                              </li> \
                          </ul> \
                      </div> \
                  </div> \
              </div> \
          </div>\
          <!--小黄条--> \
          <div id="container" style="display:none" class="mod_bulletin templateNeedDelete"></div> ';function _addEventV2(o){function isMouseLeave(evt,element){var target=evt.relatedTarget?evt.relatedTarget:evt.toElement;while(target&&target!=element){target=target.parentNode;}
return(target!=element);}
if(_findNavArr[1]!=o[1]){if(o[1].indexOf("v:nav_jifen")!=-1&&_path.indexOf("/task/detail/")!=-1)return;var li_e=document.getElementById(o[1]);var div_e=li_e.getElementsByTagName('div')[0];var a_e=li_e.getElementsByTagName('a')[0];var span_e=a_e.getElementsByTagName('span')[0];if(!div_e||!span_e){return;}
li_e.onmouseover=function(e){_addClassName(a_e,'menu_subon');div_e.style.display="";setTimeout(function(){if(a_e.className.search('menu_subon')!=-1){div_e.style.display="block";}},5);};li_e.onmouseout=function(e){e=arguments[0]||window.event;if(isMouseLeave(e,li_e)){div_e.style.display="none";_removeClassName(a_e,'menu_subon');}};}};function _bindMenuV2(){var g_length=_cbUrls.length;for(var loop=0;loop<g_length;loop++){_addEventV2(_cbUrls[loop]);}};var _sCopyRight=' \
        <div class="sec_footer templateNeedDelete"> \
            <div class="grid_c1"> \
                     <div class="mod_copyright"> \
                        <p><a href="http://www.tencent.com/" target="_blank">关于腾讯</a> | \
                        <a href="http://www.tencent.com/index_e.shtml" target="_blank">About Tencent</a> | \
                        <a href="http://www.qq.com/contract.shtml" target="_blank">服务条款</a> | \
                        <a href="http://www.tencentmind.com/" target="_blank">广告服务</a> | \
                        <a href="http://hr.tencent.com/" target="_blank">腾讯招聘</a> | \
                        <a href="http://service.qq.com/" target="_blank">客服中心</a> | \
                        <a href="http://www.qq.com/map/" target="_blank">网站导航</a></p> \
                         <p>Copyright&copy;1998-'+(new Date()).getFullYear()+' Tencent. All Rights Reserved.</p> \
                         <p>腾讯公司 <a href="http://www.tencent.com/law/mo_law.shtml?/law/copyright.htm" target="_blank">版权所有</a></p> \
                     </div> \
             </div>  \
        </div>  ';var _sIntro=' \
        <!--sec_mainE--> \
        <div class="grid_c1 sec_mainE templateNeedDelete"> \
            <div class="mod_cblink clearfix"> \
                <div class="col_l col_first col_cba"> \
                    <a href="http://open.cb.qq.com" target="_blank" class="mod_cblink_logo"><img src="http://imgcache.qq.com/vipstyle/caibei/v2/public/img/logo_cba150x85.jpg" width="150" height="85" /></a> \
                </div> \
                <div class="col_l col_jfsrv"> \
                    <h3>彩贝积分服务</h3> \
                    <ul> \
                        <li><a href="http://cb.qq.com/help.html#A1?attach=100.1101.00.100.01" target="_blank">什么是彩贝积分？</a></li> \
                        <li><a href="http://cb.qq.com/my/my_jifen.html" target="_blank">彩贝积分账户</a></li> \
                        <li><a href="http://cb.qq.com/act/school/act_1.html?attach=100.1101.00.100.00&QQ_from=100.1101.00.100.00" target="_blank">新手操作指引</a></li> \
                    </ul> \
                </div> \
                <div class="col_l col_get"> \
                    <h3>赚取彩贝积分</h3> \
                    <ul> \
                        <li><a href="http://kf.qq.com/info/74338.html" target="_blank">怎样获得彩贝积分？</a></li> \
                        <li><a href="http://kf.qq.com/info/54946.html" target="_blank">获得彩贝的时长？</a></li> \
                        <li><a href="http://kf.qq.com/info/74339.html" target="_blank">彩贝有效期多久？</a></li> \
                    </ul> \
                </div> \
                <div class="col_l col_use">\
                    <h3>使用彩贝积分</h3> \
                    <ul> \
                        <li><a href="http://kf.qq.com/info/72455.html" target="_blank">兑换实物的步骤</a></li>\
                        <li><a href="http://kf.qq.com/info/72452.html" target="_blank">填写收货地址</a></li> \
                        <li><a href="http://kf.qq.com/info/72451.html" target="_blank">兑换实物包邮吗？</a></li> \
                    </ul> \
                </div> \
                <div class="col_l col_last col_kefu"> \
                    <h3>客服服务</h3> \
                    <ul> \
                        <li>客服电话：</li>\
                        <li>4001-800-100</li> \
                        <li><a href="http://service.qq.com/category/2324_1.html" target="_blank">帮助中心</a></li>\
                    </ul> \
                </div> \
            </div> \
        </div> \
        <!--sec_mainE--> ';var _sTop=' \
  <!--S-顶部导航-->\
  <div class="sec_topnav templateNeedDelete">\
   <div class="grid_c1">\
    <!--mod_toolbar-->\
    <div class="mod_toolbar col_r">\
     <ul class="mod_hlist">\
      <li>\
       <div class="mod_logininfo clearfix">\
        <!--已登录-->\
        <div class="col_l info_logined" style="display:none" id="v:login_info">\
         欢迎您，<span class="u_nickname" id="v:top_nick">用户昵称</span>，\
         <a href="javascript:void(0);" class="lnk_logout" title="退出" id="v:top_logout">退出</a>\
         <span class="nav_split">|</span>\
         <a href="http://cb.qq.com/my/my_jifen.html" class="lnk_cbpoint">彩贝：<span id="v:jifen_balance" class="c_em1_1">加载中</span></a>\
         <span class="nav_split">|</span>\
        </div>\
        <!--未登录-->\
        <div class="col_l info_notlogin" id="v:logout_info" style="display:none;">您还未登录，请\
         <a class="lnk_nav lnk_login" href="javascript:void(0);" id="v:top_login" title="登录">登录</a>\
         <span class="nav_split">|</span>\
        </div>\
       </div>\
      </li>\
      <li>\
       <a href="http://bbs.cb.qq.com/" target="_blank" class="lnk_nav lnk_help">彩贝论坛</a>\
       <span class="nav_split">|</span>\
      </li>\
      <li>\
       <a href="http://t.qq.com/qqcaibei" target="_blank" class="lnk_nav lnk_tcb">彩贝微博</a>\
       <span class="nav_split">|</span>\
      </li>\
      <li>\
       <a href="http://kf.qq.com/category/2324_1.html" target="_blank" class="lnk_nav lnk_tcb">帮助中心</a>\
       <span class="nav_split">|</span>\
      </li>\
      <li>\
       <a href="http://cb.qq.com/my/mail_subscribe.html?attach=100.0000.00.100.00&QQ_from=100.0000.00.100.00" class="mod_btn mod_btn_gr" target="_blank"><span class="mod_btn_bd"><span class="ico_gb_add">+</span>订阅邮件</span></a>\
      </li>\
     </ul>\
    </div>\
    <!--/mod_toolbar-->\
    <!--mod_topmenu-->\
    <div class="mod_topmenu col_l">\
     <ul class="mod_hlist">\
      <li class="menu_on"><a href="http://cb.qq.com/">彩贝官网</a></li>\
      <li><a href="http://cb.qq.com/shop/" target="_blank">返利商城</a></li>\
      <li><a href="http://cb.qq.com/jifen/" target="_blank">积分商城</a></li>\
      <li><a href="http://cb.qq.com/trip/" target="_blank">彩贝商旅 </a></li>\
      <li><a href="http://cb.qq.com/pai/" target="_blank">拍拍返利 </a></li>\
     </ul>\
    </div>\
    <!--/mod_topmenu-->\
   </div>\
  </div>\
  <!--E-顶部导航-->\
  <!--S-头部-->\
  <div class="sec_header">\
   <div class="grid_c1">\
    <div class="mod_banner clearfix">\
     <!--logo-->\
     <div class="col_l mod_logo">\
      <h1><a href="http://cb.qq.com/" title="QQ彩贝积分"><span class="hidden">QQ彩贝积分</span></a></h1>\
     </div>\
     <!--S-搜索组件-->\
     <div class="col_r mod_searchfull">\
      <!--搜索条-->\
      <div id="islistshow" class="mod_search"><!--:mod_search_hot表示高亮-->\
       <div class="mod_search_bd"><input id="searchtext" type="text" class="ipt_search" value="请输入商家名称"/><a class="ico_gb ico_search" title="搜索"></a></div>\
       <div id="isclicklistshow" class="mod_search_ft">\
        <!--搜索没结果-->\
        <div id="se_result_con" class="mod_search_result" style="display:none">\
         <div class="mod_search_result_hd">\
          点击进入商家\
         </div>\
         <div class="mod_search_result_bd">\
          <!--搜索有结果-->\
          <ul id="resultlist"></ul>\
         </div>\
        </div>\
        <!--/搜索有结果-->\
        <!--无搜索结果-->\
        <div id="se_result_err" class="mod_search_noresult" style="display:none">\
         <div class="mod_search_noresult_bd">\
          <span class="ico_gb ico_alert1"></span>无搜索结果，请重新输入。\
         </div>\
         <span class="ico_gb ico_ylarr_u"></span>\
        </div>\
        <!--/无搜索结果-->\
       </div>\
       <!--/mod_search_ft-->\
      </div>\
     </div>\
     <!--E-搜索组件-->\
    </div>\
   </div>\
  </div>\
  <!--E-头部-->';var _sNav='<!--S-菜单-->\
  <div class="sec_menu templateNeedDelete">\
   <div class="grid_c1">\
    <div class="mod_menu clearfix">\
     <div class="col_l mod_menu_hd">\
      <a href="http://cb.qq.com/shop/mall/" target="_blank"><span class="lbl_m">商家导航</span><span class="ico_gb ico_gb_businav"><!--icon--></span></a>\
     </div>\
     <div class="col_l mod_menu_bd">\
      <ul class="mod_hlist menu_main">\
       <li id="v:nav_index" class="{CB_INDEX}"><a href="http://cb.qq.com/" class="lnk_home"><span class="lbl_m lbl_home">首页</span></a></li>\
       <li id="v:nav_service" class="{CB_SERVICE}"><!--要弹出子菜单请加menu_subon-->\
        <a href="http://cb.qq.com/service.html" class="lnk_srv menu_hassub"><span class="lbl_m lbl_srv">了解彩贝</span></a>\
        <!--子弹出菜单-->\
        <div class="mod_subpopmenu subpopmenu_1" >\
         <div class="mod_subpopmenu_bd">\
          <ul class="subpopmenu_list">\
           <li>\
            <a href="http://cb.qq.com/service.html"><span>彩贝积分介绍</span></a>\
           </li>\
           <li>\
            <a href="http://cb.qq.com/publicize.html"><span>彩贝积分宣传</span></a>\
           </li>\
          </ul>\
         </div>\
        </div>\
        <!--/子菜单-->\
       </li>\
       <li id="v:nav_jifen" class="{GET_JIFEN}"><!--mousehover加menu_subon类名-->\
        <a href="http://cb.qq.com/shop/mall/" class="lnk_get menu_hassub"><span class="lbl_m lbl_get">赚彩贝</span></a>\
        <!--子弹出菜单-->\
        <div class="mod_subpopmenu subpopmenu_2">\
         <div class="mod_subpopmenu_bd">\
          <ul class="subpopmenu_list">\
           <li>\
            <a href="http://cb.qq.com/shop/mall/" target="_blank"><span>商家导航</span></a>\
           </li>\
                                            <li>\
            <a href="http://cb.qq.com/shop/" target="_blank">\
             <span class="ico_gb ico_menu_shop"></span>\
             <span>返利商城</span>\
            </a>\
           </li>\
                                            <li>\
            <a href="http://cb.qq.com/pai/" target="_blank">\
             <span>拍拍返利</span>\
            </a>\
           </li>\
           <li>\
            <a href="http://cb.qq.com/trip/" target="_blank">\
             <span class="ico_gb ico_menu_trval"></span>\
             <span>商旅频道</span>\
            </a>\
           </li>\
                                            <li>\
            <a href="http://cb.qq.com/life/">\
            <span class="ico_gb ico_menu_fun"></span>\
             <span>娱乐生活</span>\
            </a>\
           </li>\
           <li>\
            <a href="http://cb.qq.com/pay.html">\
             <span class="ico_gb ico_menu_xuni"></span>\
             <span>腾讯业务</span>\
            </a>\
           </li>\
           <li> \
             <a href="http://cb.qq.com/cdkey/"> \
            <span class="ico_gb ico_menu_key"></span> \
            <span>兑换码激活</span> \
             </a> \
            </li>\
           <li> \
            <a href="http://cb.qq.com/task/"> \
              <span class="ico_gb ico_menu_task"></span> \
              <span>拾贝任务</span> \
            </a> \
           </li>\
          </ul>\
         </div>\
        </div>\
        <!--/子菜单-->\
       </li>\
       <li id="v:nav_use" class="{USE_JIFEN}">\
        <a href="http://cb.qq.com/jifen/" class="lnk_use menu_hassub" target="_blank"><span class="lbl_m lbl_use">花彩贝</span></a>\
        <!--子弹出菜单-->\
        <div class="mod_subpopmenu subpopmenu_3">\
         <div class="mod_subpopmenu_bd">\
          <ul class="subpopmenu_list">\
           <li>\
            <a href="http://cb.qq.com/jifen/exchange.html" target="_blank">\
             <span class="ico_gb ico_menu_gift"></span>\
             <span>积分兑换</span>\
            </a>\
           </li>\
           <li>\
            <a href="http://cb.qq.com/jifen/cash.html" target="_blank">\
             <span class="ico_gb ico_menu_jifen"></span>\
             <span>积分支付</span>\
            </a>\
           </li>\
           <li>\
            <a href="http://cb.qq.com/jifen/lottery.html" target="_blank">\
             <span>积分抽奖</span>\
            </a>\
           </li>\
          </ul>\
         </div>\
        </div>\
        <!--/子菜单-->\
       </li>\
       <li class="{ACT_PAGE}"><a href="http://cb.qq.com/active_main_board.html" class="lnk_act"><span class="lbl_m lbl_act">彩贝活动</span></a></li>\
       <li class="{I}"><a href="http://cb.qq.com/my/my_jifen.html" class="lnk_ihome"><span class="lbl_m lbl_ihome">个人中心</span></a></li>\
      </ul>\
     </div>\
     <div class="col_l mod_menu_ext">\
      <ul class="mod_hlist">\
       <li><a href="http://cb.qq.com/shop/" class="lnk_mall" target="_blank"><span class="lbl_m lbl_mall">返利商城</span></a></li>\
       <li><a href="http://cb.qq.com/trip/" class="lnk_travel" target="_blank"><span class="lbl_m lbl_travel">商旅频道</span></a></li>\
       <li><a href="http://cb.qq.com/jifen/" class="lnk_gmall" target="_blank"><span class="lbl_m lbl_gmall">积分商城</span></a></li>\
      </ul>\
     </div>\
    </div>\
    <!--子菜单-->\
    <div class="mod_submenu" style="display:{IS_SUB_MENU};">\
     <div class="mod_submenu_bd">\
      <!--一个子菜单对应一个ul。请注意根据主菜单的索引ID给子菜单加类名submenu_{index}-->\
      <ul class="mod_hlist submenu_list submenu_1" style="display:{CB_SERVICE_SUB};">\
       <li>\
        <a href="http://cb.qq.com/service.html" class="{CB_SERVICE_SUB1}"><span>彩贝积分介绍</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/publicize.html" class="{CB_SERVICE_SUB2}"><span>彩贝积分宣传</span></a>\
       </li>\
      </ul>\
      <ul class="mod_hlist submenu_list submenu_2" style="display:{GET_JIFEN_SUB}">\
       <li>\
        <a href="http://cb.qq.com/shop/mall/" class="{GET_JIFEN_SUB1}"><span>商家导航</span></a>\
       </li>\
                            <li>\
        <a href="http://cb.qq.com/shop/" class="{GET_JIFEN_SUB2}" target="_blank"><span>返利商城</span></a>\
       </li>\
                            <li>\
        <a href="http://cb.qq.com/pai/" class="{GET_JIFEN_SUB4}" target="_blank"><span>拍拍返利</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/trip/" class="{GET_JIFEN_SUB3}" target="_blank"><span>商旅频道</span></a>\
       </li>\
                            <li>\
        <a href="http://cb.qq.com/life/" class="{GET_JIFEN_SUB5}"><span>娱乐生活</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/pay.html" class="{GET_JIFEN_SUB6}"><span>腾讯业务</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/cdkey/" class="{GET_JIFEN_SUB7}"><span>兑换码激活</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/task/" class="{GET_JIFEN_SUB8}"><span>拾贝任务</span></a>\
       </li>\
      </ul>\
      <ul class="mod_hlist submenu_list submenu_3" style="display:{USE_JIFEN_SUB}">\
       <li>\
        <a href="http://cb.qq.com/jifen/" class="{USE_JIFEN_SUB1}" target="_blank"><span>积分商城</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/jifen/cash.html" class="{USE_JIFEN_SUB2}" target="_blank"><span>积分支付</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/jifen/exchange.html" class="{USE_JIFEN_SUB3}" target="_blank"><span>积分兑换</span></a>\
       </li>\
       <li>\
        <a href="http://cb.qq.com/jifen/lottery.html" class="{USE_JIFEN_SUB4}" target="_blank"><span>积分抽奖</span></a>\
       </li>\
      </ul>\
      <!--XX的子菜单B-->\
     </div>\
    </div>\
    <!--/子菜单-->\
   </div>\
  </div>\
  <!--E-菜单-->\
        <!--小黄条--> \
        <div id="container" style="display:none" class="mod_bulletin templateNeedDelete"></div>';var _loginStr=' \
            <!-- 用户未登录 开始 -->\
            <!--S-已登录-->\
            <!--用户彩贝信息-->\
            <div class="mod_uinfo" id="v:login_user_detail" style="display:none">\
                <div class="mod_ptl mod_uinfo_bd">\
                    <a href="http://face.qq.com" target="_blank">[%=@face%]</a>\
                    <div class="uinfo_main">\
                        <div class="c_sub2 uinfo_wc">您好，<span class="c_sub2 uinfo_name"></span></div>\
                        <div class="uinfo_flags clearfix"><!--下面的图标在末尾加0即未点亮状态，例如ico_uflag_cb0-->\
                            <a class="ico_gb ico_uflag ico_uflag_cb" href="http://cb.qq.com/act/lighticon/"><span>彩贝</span></a>\
                            <!--a class="ico_gb ico_uflag ico_uflag_m" href="#"><span>手机</span></a-->\
                            <a class="ico_gb ico_uflag ico_uflag_cft0" href="http://cb.qq.com/jump_to_CFT.php?type=3"><span>财付通</span></a>\
                            <!--a class="ico_gb ico_uflag ico_uflag_addr" href="#"><span>地址</span></a>\
                            <a class="ico_gb ico_uflag ico_uflag_rss" href="http://cb.qq.com/my/mail_subscribe.html" target="_blank"><span>订阅</span></a-->\
                            <a class="lnk_logoff" href="javascript:try{logout();}catch(e){};"><span>退出</span></a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <!--E-已登录-->\
            <!--S-未登录-->\
            <div class="sy_mod_sblogin_bd" id="v:logout_user_detail">\
                <a href="javascript:openLoginWindow();" class="mod_btnfix mod_btn_loginA"><span class="hidden">用户登录</span></a>\
            </div>\
            <!--E-未登录-->';function _writeTop(){if(getParam("iframe")!='tenpay'){document.write(_checkV2OrV3()?_sV2Top:_sTop);}};function getParam(paramName)
{var paramValue="",search=location.search;if(search.indexOf("?")==0&&search.indexOf("=")>1)
{var paramArr=unescape(search).substring(1,search.length).split("&");for(var index=0;index<paramArr.length;index++){if(paramArr[index].indexOf("=")>0)
{if(paramArr[index].split("=")[0].toLowerCase()==paramName.toLowerCase())
{paramValue=paramArr[index].split("=")[1];break;}}}}
return paramValue;}
function _writeLoginStr()
{document.write(_loginStr);};function _writeCopyRight(divId){if(typeof divId=='string'){var oCopyRight=document.getElementById(divId);oCopyRight&&(oCopyRight.innerHTML=_sCopyRight);}
else{if(getParam("iframe")!='tenpay'){document.write(_sCopyRight);}}};function _writeIntro(){if(getParam("iframe")!='tenpay'){document.write(_sIntro);}};var objReplace={'{CB_SERVICE}':'','{I}':'','{GET_JIFEN}':'','{USE_JIFEN}':'','{ACT_PAGE}':'','{CB_SERVICE_SUB}':'none','{CB_SERVICE_SUB1}':'','{CB_SERVICE_SUB2}':'','{GET_JIFEN_SUB}':'none','{GET_JIGEN_SUB1}':'','{GET_JIFEN_SUB2}':'','{GET_JIFEN_SUB3}':'','{GET_JIFEN_SUB4}':'','{GET_JIFEN_SUB6}':'','{GET_JIFEN_SUB7}':'','{GET_JIFEN_SUB8}':'','{USE_JIFEN_SUB}':'none','{USE_JIGEN_SUB1}':'','{USE_JIFEN_SUB2}':'','{USE_JIFEN_SUB3}':'','{IS_SUB_MENU}':'none'};var _find=false;var _findNavArr=Array();var _path=location.pathname.replace("index.html","").replace("index.php","");var _cbUrls=[['/','v:nav_index','',0,'cb.qq.com'],['/service.html','v:nav_service'],['/publicize.html','v:nav_service'],['/shop/mall/','v:nav_jifen'],['/shop/mall/','v:nav_jifen'],['/trip.html','v:nav_jifen'],['/tuan/','v:nav_jifen'],['/tuan/mall.html','v:nav_jifen'],['/tuan/temai.html','v:nav_jifen'],['/tuan/youhui.html','v:nav_jifen'],['/tuan/pianyi.html','v:nav_jifen'],['/life/','v:nav_jifen'],['/pay.html','v:nav_jifen'],['/cdkey/','v:nav_jifen'],['/task/','v:nav_jifen'],['/use_jifen.html','v:nav_use'],['/use_jifen_cash.html','v:nav_use'],['/jifen/','v:nav_use']];function _findMenu(o){if(!_find){if(typeof(o[0])=='string'){if(_path==o[0]){if(o[0]=='/'&&location.host==o[4]){_find=true;}else if(o[0]!='/'){_find=true;}}}else{if(_path.search(o[0])>-1){_find=true;}
if(o[4]&&location.host!=o[4]){_find=false;}}
if(_find){_findNavArr=o;}}};function _addEvent(o){function isMouseLeave(evt,element){var target=evt.relatedTarget?evt.relatedTarget:evt.toElement;while(target&&target!=element){target=target.parentNode;}
return(target!=element);}
if(_findNavArr[1]!=o[1]){if(o[1].indexOf("v:nav_jifen")!=-1&&_path.indexOf("/task/detail/")!=-1)return;var li_e=document.getElementById(o[1]);var div_e=li_e.getElementsByTagName('div')[0];var a_e=li_e.getElementsByTagName('a')[0];var span_e=a_e.getElementsByTagName('span')[0];if(!div_e||!span_e){return;}
li_e.onmouseover=function(e){_addClassName(li_e,'menu_subon');div_e.style.display="";setTimeout(function(){if(li_e.className.search('menu_subon')!=-1){div_e.style.display="block";}},5);};li_e.onmouseout=function(e){e=arguments[0]||window.event;if(isMouseLeave(e,li_e)){div_e.style.display="none";_removeClassName(li_e,'menu_subon');}};}};function _addClassName(elem,cname){if(elem&&cname){if(elem.className){if(_hasClassName(elem,cname)){return false;}else{elem.className+=' '+cname;return true;}}else{elem.className=cname;return true;}}else{return false;}}
function _removeClassName(elem,cname){if(elem&&cname&&elem.className){var old=elem.className;elem.className=(elem.className.replace(new RegExp('\\b'+cname+'\\b'),''));return elem.className!=old;}else{return false;}}
function _hasClassName(elem,cname){return(elem&&cname)?new RegExp('\\b'+cname+'\\b').test(elem.className):false;}
function _bindMenu(){var g_length=_cbUrls.length;for(var loop=0;loop<g_length;loop++){_addEvent(_cbUrls[loop]);}};function _writeNav(sFlag,isSubMenu,sIndex){if(getParam('iframe')=='tenpay')return;var sTopFlag=['{',sFlag||'','}'].join(''),sSubFlag=['{',sFlag||'','_SUB}'].join(''),sSubIndexFlag=sIndex&&(['{',sFlag||'','_SUB',sIndex,'}'].join(''));objReplace[sTopFlag]='menu_on';objReplace['{IS_SUB_MENU}']=(isSubMenu==1)?'block':'none';if(objReplace[sSubFlag]!='undefined'){objReplace[sSubFlag]='block';}
sIndex&&(objReplace[sSubIndexFlag]='smenu_on');var _sNavTPL=_checkV2OrV3()?_sV2Nav:_sNav;for(var key in objReplace){_sNavTPL=_sNavTPL.replace(new RegExp(key,'gm'),objReplace[key]);}
document.write(_sNavTPL);for(var index=0;index<_cbUrls.length;index++){_findMenu(_cbUrls[index]);}
if(_checkV2OrV3()){_bindMenuV2();}
else{_bindMenu();}};function _bindNavMenu(){for(var index=0;index<_cbUrls.length;index++){_findMenu(_cbUrls[index]);}
if(_checkV2OrV3()){_bindMenuV2();}
else{_bindMenu();}}
function _checkV2OrV3(){var linkDom=document.getElementsByTagName('link');if(linkDom[0]){return!(/caibei\/v3\/portal\/css\/global\.css/.test(linkDom[0].href));}}
global.JIFEN=global.JIFEN||{};global.JIFEN.INFO={writeCopyRight:_writeCopyRight,writeIntro:_writeIntro,writeTop:_writeTop,writeNav:_writeNav,writeLoginStr:_writeLoginStr,bindMenu:_bindNavMenu};setTimeout(function(){var script=document.getElementsByTagName('head'),dom=document.createElement('script');dom.type="text/javascript";dom.async=true;dom.src="http://tajs.qq.com/stats?sId=16309506";script[0]&&script[0].appendChild(dom);if(getParam('iframe')=='tenpay'){document.body.style.backgroundImage='none';var wrapDiv=_getElementByClass('wrap','div')[0];wrapDiv.style.backgroundImage='none';}},0);function _getElementByClass(className,tagName){if(!className){return;}
tagName=tagName||'*';var testClass=new RegExp("(^|\\s)"+className+"(\\s|$)");var elements=document.getElementsByTagName(tagName);var returnElements=[];for(var i=0,len=elements.length;i<len;i++){if(testClass.test(elements[i].className)){returnElements.push(elements[i]);}}
return returnElements;}})(window);/*  |xGv00|d23f10ebcbf197ca99877d469567055a */