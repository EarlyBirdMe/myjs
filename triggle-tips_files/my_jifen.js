
﻿;(function(global){var _defaultValue="中文|拼音",_cityDefaultValue="中文|拼音",_hotelDefaultValue="输入酒店名称";var GET_ZANCUN_JIFEN_URL='http://cb.qq.com/my/get_zancun_jifen.php';function getLatestMall(){var mallId=[];var uin=$.cb.cookie.get("uin");$.getJSON('http://open.cb.qq.com/CaiBeiConnect/merchant_connect_session_func.php?callback=?',{cmd:'get',uin:uin},function(data){if(0==data.iRet){var malllist=data.merchant_list;mallId=malllist.split("&");if(mallId.length==0){$o('v:lataistmall').innerHTML='<li class="clearfix">您最近无浏览记录</li>';return;}
var getToUrl=function(id){var newHref='http://fanli.qq.com/redirect.php?attach='+attach+'&mall_id='+id+'&forcelogin=1&login_type=1';return newHref;};var getPercent=function(id){return ADV_MAP.getBonusById(id);};var htm=[];var attach='100.1020.01.000.00';var tpl='<li class="clearfix">\
        <div class="col_l col_avatar">\
         <a href="{result_url}" target="_blank" mall_id="{number}"><img src="{imgurl}" width="80" height="27" alt="{number}"></a>\
        </div>\
        <div class="col_r col_fanli">\
         最高返<span class="c_em1">{percent}</span>\
        </div>\
       </li>'
var len=mallId.length;var comstr='';var tfsImgs=[];for(var j=0;j<len;j++){tfsImgs.push(mallId[j]);}
var objParam={iCmd:'400',g_tk:$.cb.security.getAntiCSRFToken(),ids:tfsImgs.join(',')};$.ajax({url:"http://cb.qq.com/shop/mmap.php",data:objParam,dataType:"jsonp",timeout:　JIFEN.gTimeout,success:function(tfsData){if(tfsData.iRet==JIFEN.CONST_RET_OK){try{for(var i=0;i<len;i++){if(/^\d+$/.test(mallId[i])!=true){continue;}
if(comstr.indexOf(mallId[i])!=-1){continue;}
var newurl=getToUrl(mallId[i]);var imgurl=tfsData.items[mallId[i]][1];var percent=getPercent(mallId[i]);if(percent==='')continue;htm.push(tpl.replace('{number}',mallId[i]).replace('{result_url}',newurl).replace('{imgurl}',imgurl).replace('{percent}',percent));comstr=comstr+','+mallId[i];}
htm=_.first(htm,6);$o('v:lataistmall').innerHTML=htm.join('');}catch(e){}}}});}});}
function _queryChangeAirMall(mallId){if(('goldenholiday'==mallId)||('cococ'==mallId))
{$o('airRatioHintId').innerHTML='最高返9%彩贝';}
else if(('csair'==mallId)||('ceair'==mallId)||('hnair'==mallId)||('shenzhenair'==mallId)||('scal'==mallId))
{$o('airRatioHintId').innerHTML='每单返10彩贝';}
else if('mangocity'==mallId)
{$o('airRatioHintId').innerHTML='最高返1.8%彩贝';}
else if('ctrip'==mallId)
{$o('airRatioHintId').innerHTML='最高返0.45%彩贝';}
else if('17u'==mallId){$o('airRatioHintId').innerHTML='最高返1.8%彩贝';}
else{$o('airRatioHintId').innerHTML='';}}
function _queryChangeHotelMall(mallId){if(('mangocity'==mallId)||('qmango'==mallId))
{$o('hotelRatioHintId').innerHTML='最高返4.5%彩贝';}
else if('ctrip'==mallId)
{$o('hotelRatioHintId').innerHTML='最高返2.7%彩贝';}
else if('elong'==mallId)
{$o('hotelRatioHintId').innerHTML='最高返8.1%彩贝';}
else if('17u'==mallId){$o('hotelRatioHintId').innerHTML='最高返8.5%彩贝';}
else{$o('hotelRatioHintId').innerHTML='';}}
function _queryChangeTrainMall(mallId){if('tieyou_cb'==mallId)
{$o('trainRatioHintId').innerHTML='最高返360彩贝';}}
function _bindTripEvent(){switchNodes($('#v\\:div_air,#v\\:div_hotel,#v\\:div_train').get(),$('#v\\:tab_air,#v\\:tab_hotel,#v\\:tab_train').get(),'current','click',0);JIFEN_TRIP.flightBind('oneWayId','roundId','fromCityId','fromCityButtonId','toCityId','toCityButtonId','depDateId','depDateButtonId','returnDateId','returnDateButtonId','queryId','ticket_select',_defaultValue,0,1,_queryChangeAirMall);JIFEN_TRIP.hotelBind('txtCity','btnCity','txtCheckin','btnCheckin','txtCheckout','btnCheckout','txtHotel','price_select','hotel_mall','queryHotel',_cityDefaultValue,_hotelDefaultValue,1,_queryChangeHotelMall);JIFEN_TRIP.trainBind('train_from','train_from_btn','train_to','train_to_btn','leave_date','leave_date_btn','train_mall','train_query',_cityDefaultValue,1,_queryChangeTrainMall);var hotel_mall=$o('hotel_mall').value;JIFEN_TRIP.Data.asynGetCityList($o('ticket_select').value);JIFEN_TRIP.Data.asynGetCityList(hotel_mall,1);JIFEN_TRIP.Data.asynGetCityList('tieyou_cb',4);JIFEN_TRIP.Data.setHotelPriceSlt(hotel_mall,'price_select');}
var openCftGuide={show:function(name){$.getJSON(GET_ZANCUN_JIFEN_URL+'?callback=?',{g_tk:$.CSRF()},function(data){if(data.ret==0){if(parseInt(data.iBalance,10)>0){$('#guideNickName').html(name);$('#guideJifen').html(data.iBalance);$('#openCftGuide').slideDown('normal');}}});},hide:function(){$('#openCftGuide').slideUp('normal');},bindEvent:function(){var self=openCftGuide;$('#openCftGuide a.i_mod_guide_close').click(function(){self.hide();return false;});self._t=setTimeout(self.hide,10000);$('#openCftGuide').mouseenter(function(){clearTimeout(self._t);}).mouseleave(function(){self._t=setTimeout(self.hide,10000);});},init:function(name){var self=openCftGuide;self.show(name);self.bindEvent();}}
function _bindAllEvent(){$.getJSON('/act_cmd.php?callback=?',{iCmd:210,sGroupIds:68},function(json){if(json['iErrCode']==0){var html='',tab='';html=tab='';var items=json['items'][68];if(!items)return;for(var i=0;i<items.length;i++){var item=items[i];html+=['<li><a href="',item['sLinkUrl'],'" target="_blank" title="',item['sName'],'"><img src="',item['sImgUrl'],'" width="200" height="120" alt="',item['sName'],'" /></a></li>'].join('');tab+=['<a href="',item['sLinkUrl'],'" title="',item['sName'],'" target="_blank"></a>'].join('');}
$('#v\\:uselist').html(html);$('#v\\:usetab').html(tab);JIFEN.SlideView("v:usejifen",{panelWrapper:'v:uselist',navWrapper:"v:usetab"});}});$.getJSON('/adv/cmd.php?callback=?',{cmd:'play',iGroupId:100000,iCount:3,g_tk:$.CSRF()},function(json){if(json['iRet']==0){var items=eval('('+json.sResult+')')
if(!items)return;var _listTpl='<%_.each(data, function(v, k){%><li><a href="javascript:;" viewid="<%=v.sViewId%>"><img src="<%=v.sImgUrl%>" width="200" height="120" /></a></li><%});%>';var _tabTpl='<%_.each(data, function(v, k){%><a href="javascript:;" viewid="<%=v.sViewId%>"></a><%});%>';var openwin=function(){var viewid=$(this).attr('viewid');window.open('/adv/cmd.php?cmd=click&g_tk='+$.CSRF()+'&sViewId='+viewid);};$('#v\\:getlist').html(_.template(_listTpl,{data:items})).find('a').click(openwin);$('#v\\:gettab').html(_.template(_tabTpl,{data:items})).find('a').click(openwin);var _report=[];var _curIdx=0;var _isVisible=function(e){doc_body=document.body;doc_element=document.compatMode=='BackCompat'?doc_body:document.documentElement;if($.browser.msie&&parseInt($.browser.version)==9){var offsetT=doc_element.scrollTop;var offsetL=doc_element.scrollLeft;}
else if(window.MessageEvent&&!document.getBoxObjectFor){var offsetT=doc_body.scrollTop;var offsetL=doc_body.scrollLeft;}
else{var offsetT=doc_element.scrollTop;var offsetL=doc_element.scrollLeft;}
var bottom=offsetT+doc_element.clientHeight;var left=offsetL+doc_element.clientWidth;var eOffsetTop=e.offsetTop;var eOffsetLeft=e.offsetLeft;while(e=e.offsetParent){eOffsetTop+=e.offsetTop;eOffsetLeft+=e.offsetLeft;}
return(eOffsetTop<=bottom&&offsetT<eOffsetTop+120&&eOffsetLeft<=left&&offsetL<eOffsetLeft+200);};var _callback=function(idx){_curIdx=idx;if($.inArray(_curIdx,_report)>-1)return;if(!_isVisible(document.getElementById('v:getlist').parentNode))return;_report.push(_curIdx);$.getScript('/adv/cmd.php?cmd=show&g_tk='+$.CSRF()+'&sViewId='+items[_curIdx]['sViewId']);};$(window).bind('resize scroll',function(){if($.inArray(_curIdx,_report)>-1)return;if(!_isVisible(document.getElementById('v:getlist').parentNode))return;_report.push(_curIdx);$.getScript('/adv/cmd.php?cmd=show&g_tk='+$.CSRF()+'&sViewId='+items[_curIdx]['sViewId']);});JIFEN.SlideView("v:getjifen",{panelWrapper:'v:getlist',navWrapper:"v:gettab",callback:_callback});}});};function _execInit(){setTimeout(function(){showYellowTips();},0);setTimeout(function(){_bindAllEvent();},0);setTimeout(function(){initMyPreferredAddr();},0);setTimeout(function(){getLatestMall();},0);setTimeout(function(){_bindTripEvent();},0);getDetailUsrInfo({oplist:'getTJInfo'},function(data){$('#v\\:jifenBalance').html(data['jifenBalance']>=0?data['jifenBalance']:'加载中');$('#v\\:datedeadline').html(data['jifenBalance']>0?data['jifenPeriod']:'');$('#v\\:jifen_return').html(data['willTotalJifen']>=0?data['willTotalJifen']:'加载中');if(data['jifenBalance']<=0){$('#v\\:jifenperiod').hide();}else{$("#v\\:jifenperiod").show();}
if(data['isOpenCFT']==0){$('#v\\:open_cft').show();openCftGuide.init(data.sNick||'');}else{$('#v\\:open_cft').hide();}
if(data['jifenBalance']>0){$('#v\\:cancel_cft').show();}else{$('#v\\:cancel_cft').hide();}},function(data){openLoginWindow();});$(global).bind('load',function(){asynSendPvg();});};_execInit();})(window);/*  |xGv00|2bec2351248609ee6c07b9d4f3115fbc */