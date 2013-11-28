
(function(ns){var _l={};var _getAdvChName=function(m_id){try{return _l[m_id][1];}catch(e){return m_id;}};var _getAdvId=function(m_id){try{return _l[m_id][0];}catch(e){return'';}};var _isAuth=function(m_id){try{return _l[m_id][2];}catch(e){return'';}};var _getAdvUnionName=function(id){try{var key;for(key in _l){if(_l[key][0]==id){return key;}}
return'';}catch(e){return'';}};var _allOnMallList=[];var _getAllOnMall=function(){if(_allOnMallList&&_allOnMallList.length){return _allOnMallList;}
else{_getMallMap();return _allOnMallList;}};var _getMallInfoById=function(id){for(var i=0,len=_allOnMallList.length;i<len;i++){if(_allOnMallList[i]['id']==id){return _allOnMallList[i];}};return{};};var _getMallInfoByEnname=function(enName){for(var i=0,len=_allOnMallList.length;i<len;i++){if(_allOnMallList[i]['enName']==enName){return _allOnMallList[i];}};return{};};var _getBonusById=function(id){var _info=_getMallInfoById(id);return _info['bonus']||'';};function _getMallMap(){$.ajax({url:'http://cb.qq.com/shop/mmap.php?callback=?',type:'GET',data:{iCmd:600,g_tk:$.cb.security.getAntiCSRFToken()},dataType:'jsonp',success:function(json){if(json.iRet==0&&json.items){var len=json.items.length,allTemp=[];for(var i=0;i<len;i++){allTemp.push({id:json.items[i].iD,cnName:json.items[i].sN,enName:json.items[i].sM,bonus:json.items[i].sB,iAuth:json.items[i].iU,iMix:json.items[i].iP});}
if(allTemp){_allOnMallList=allTemp;}
return allTemp;}
return[];},error:function(data){}});}
function _ajaxOnOffMall(callfunc){$.ajax({url:'http://cb.qq.com/shop/mmap.php?callback=?',type:'GET',data:{iCmd:200,g_tk:$.cb.security.getAntiCSRFToken()},dataType:'jsonp',success:function(json){if(json.iRet==0&&json.items){_l=json.items;}
if($.type(callfunc)=="function")callfunc();},error:function(data){if($.type(callfunc)=="function")callfunc();}});}
function _getOnOffMall(){if(_isEmptyObject(_l)){_ajaxOnOffMall();}
return _l;}
function _isEmptyObject(obj){for(var i in obj){return false;}
return true;}
function _isOnMallOK(){if(_allOnMallList&&_allOnMallList.length)return true;return false;}
function _isAllMallOk(){if(_isEmptyObject(_l))return false;return true;}
ns.MallMnt=ns.ADV_MAP={getAdvChName:_getAdvChName,getAdvId:_getAdvId,getAdvUnionName:_getAdvUnionName,isAuth:_isAuth,getAllMall:_getAllOnMall,getMallInfoById:_getMallInfoById,getMallInfoByEnname:_getMallInfoByEnname,getBonusById:_getBonusById,ajaxMallMap:_getMallMap,ajaxOnOffMall:_ajaxOnOffMall,getOnOffMall:_getOnOffMall,isOnMallOK:_isOnMallOK,isAllMallOk:_isAllMallOk};})(window);if(!ADV_MAP.isOnMallOK()){ADV_MAP.ajaxMallMap();}/*  |xGv00|98e3651bb9021b0d344aba781a7117af */