
var SearchSource=SearchSource||{};var seaattach='100.1020.00.000.00';SearchSource.ImgUrl={};SearchSource.InitDic=function(obj){if(obj.val()=='请输入商家名称'){obj.val('');}
$('#islistshow').addClass('mod_search_hot');SearchSource.Init();};SearchSource.Search=function(event){if(SearchSource.IsKeyUpDown(event)||SearchSource.IsKeyLeftRight(event)){return;}
var get_result=[];$o('se_result_err').style.display='none';$o('se_result_con').style.display='';var str=SearchSource.Trim($o('searchtext').value);if(str==""){$o('se_result_con').style.display='none';return;}
get_result=SearchSource.SearchIndex(event,str);SearchSource.DrawSearchResult(get_result);};SearchSource.DrawSearchResult=function(data){var tpl='<li class="clearfix">\
                        <a id="{number}" name="se_name_forse" href="{result_url}" onmouseover="SearchSource.MouseIn(this);" onMouseout="SearchSource.MouseOut(this);" target="_blank">\
                            <img src="http://p.qpic.cn/cblogo/4/cb_jifen_detail_sMultiColorLOGOUrl_{number}/0" imgmallid="{number}" class="col_l col_pic sechangeimg" width="80" height="27" />\
                            <span class="col_desc">\
                                {mallid}最高返<span class="n_fanli">{percent}</span>\
                            </span>\
                        </a>\
                    </li>';if(0==data.length){$o('se_result_err').style.display='';$o('se_result_con').style.display='none';return;}
var htm=[],idList=[],flag=false,len=data.length>5?5:data.length;for(var i=0;i<len;i++){var newurl=SearchSource.FindUrl(data[i].id);htm.push(tpl.replace(/{number}/g,data[i].id).replace('{result_url}',newurl).replace('{mallid}',data[i].cnName).replace('{percent}',data[i].bonus));}
$o('resultlist').innerHTML=htm.join('');$o(data[0].id).className="lnk_sbxhot";};SearchSource.GetImgSrc=function(idList,dom){$.ajax({'url':'http://cb.qq.com/shop/mmap.php?callback=?','type':'GET','data':{iCmd:400,ids:idList,g_tk:getAntiCSRFToken},'dataType':'jsonp',success:function(data){if(data.iRet==0&&data.items){var domU=dom||$('#resultlist');for(var key in data.items){if(SearchSource.ImgUrl[key]&&SearchSource.ImgUrl[key][0]&&SearchSource.ImgUrl[key][1])continue;SearchSource.ImgUrl[key]=data.items[key];}
domU.find("img[imgmallid]").each(function(){$this=$(this);var mallid=$this.attr('imgmallid');SearchSource.ImgUrl[mallid]&&$this.attr('src',SearchSource.ImgUrl[mallid][0]);});}},error:function(data){}});}
SearchSource.enterOpenWay='';SearchSource.GoToUrl=function(event){var _evt=event||window.event;if(!SearchSource.IsKeyUpDown(event)&&!SearchSource.IsKeyEnter(event)){return;}
if(_evt.keyCode==13){if($o('se_result_con').style.display=='none'){return;}
var lists=$('.lnk_sbxhot',$('#resultlist'));if(lists.length>0){var mid=lists[0].id;if(mid){var name=SearchSource.GetcnNameById(mid);if(name){$o('searchtext').value=name;}}
if(SearchSource.enterOpenWay=='new'){window.open(lists[0].href);}else{window.location=lists[0].href;}}
return;}
if(_evt.keyCode==38){var lists=$('a[name="se_name_forse"]');var n=lists.length;for(var i=0;i<n;i++){if("lnk_sbxhot"==lists[i].className){lists[i].className="";if(i==0){i=n;}
lists[i-1].className="lnk_sbxhot";return;}}}
if(_evt.keyCode==40){var lists=$('a[name="se_name_forse"]');var n=lists.length;for(var i=0;i<n;i++){if("lnk_sbxhot"==lists[i].className){lists[i].className="";if(i>=n-1){i=-1;}
lists[i+1].className="lnk_sbxhot";return;}}}};SearchSource.ClickGoToUrl=function(){var lists=$('.lnk_sbxhot',$('#resultlist'));if(lists.length>0){var mid=lists[0].id;if(mid){var name=SearchSource.GetcnNameById(mid);if(name){$o('searchtext').value=name;}}}
return false;};SearchSource.CancelSearch=function(){$o('searchtext').value='请输入商家名称';};SearchSource.MouseIn=function(obj){var lists=$('.lnk_sbxhot',$('#resultlist'));if(lists.length>0){lists[0].className="";}
if(""==obj.className){obj.className="lnk_sbxhot";}};SearchSource.MouseOut=function(obj){};SearchSource.FindUrl=SearchSource.FindUrl||function(id){var newHref='http://item.cb.qq.com/mall/'+id+'.html';return newHref;};SearchSource.SearchBlur=function(){var str=SearchSource.Trim($o('searchtext').value);if(str==""){$o('searchtext').value='请输入商家名称';}
$('#islistshow').removeClass('mod_search_hot');};(function(){$(document).click(function(event){var _evt=event||window.event;var _div=$o('isclicklistshow');var _divtext=$o('islistshow');var divxy=$(_div).offset();var div_height=$(_div).height();var div_width=$(_div).width();var textxy=$(_divtext).offset();var text_height=$(_divtext).height();var text_width=$(_divtext).width();var mousex=_evt.clientX;var mousey=_evt.clientY;if(mousex>textxy.left&&mousex<(textxy.left+text_width)&&mousey>textxy.top&&mousey<(textxy.top+text_height)){return;}
if(mousex>divxy.left&&mousex<(divxy.left+div_width)&&mousey>divxy.top&&mousey<(divxy.top+div_height)){if($o('se_result_err').style.display!=''){SearchSource.ClickGoToUrl();}}
else{$('#islistshow').removeClass('mod_search_hot');$o('searchtext').value='请输入商家名称';$o('se_result_err').style.display='none';$o('se_result_con').style.display='none';}});})();(function(){var ae=$('#searchtext');ae.bind('focus',function(){try{SearchSource.InitDic(ae);}catch(e){}});ae.bind('blur',function(){try{SearchSource.SearchBlur();}catch(e){}});ae.bind('keydown',function(event){try{SearchSource.GoToUrl(event);}catch(e){}});ae.bind('keyup',function(event){try{SearchSource.Search(event);}catch(e){}});})(window);/*  |xGv00|90d36823d793c128285aa1ba78799320 */