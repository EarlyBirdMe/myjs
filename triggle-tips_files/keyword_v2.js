
﻿if(typeof(SearchSource)=="undefined"||!SearchSource){var SearchSource;}
window.SearchSource=SearchSource={Init:function(){this.SourceKey=ADV_MAP.getAllMall();this.Dictionary=[];this.ChangeKeyWord();},ChangeKeyWord:function(){if(0==this.SourceKey){return;}
if(!SearchDic.PinYin){LoadJS('http://imgcache.qq.com/ac/club/caibei/pinyin_1.0.js');}
for(var i in this.SourceKey){var m=this.SourceKey[i];var tem={};var keyword=[];tem.id=m.id;keyword=keyword.concat(m.enName,m.cnName);keyword=keyword.concat(SearchDic.PinYin.ConvertPYs(m.cnName));tem.nick=keyword;this.Dictionary.push(tem);}},SearchIndex:function(event,str){var idarr=[];if(/[\u4E00-\u9FA5]/.test(str)){}
else{str=str.toString().toLowerCase();}
for(var i in this.Dictionary){var tem=this.Dictionary[i];for(var j in tem.nick){if(tem.nick[j].indexOf(str)!=-1){idarr.push(tem.id);break;}}}
if(0==idarr.length){return idarr;}
var se_re=this.GetInfo(idarr);if(/[\u4E00-\u9FA5]/.test(str)){se_re.sort(function(a,b){var t1=a.cnName.indexOf(str);var t2=b.cnName.indexOf(str);if(t1==0&&t2!=0){return-1;}
if(t1!=0&&t2==0){return 1;}
return 0;});}
return se_re;},GetInfo:function(data){var resultinfo=[];for(var i in data){for(var j in this.SourceKey){var tem=this.SourceKey[j];if(tem.id==data[i]){resultinfo.push(tem);}}}
return resultinfo;},IsKeyUpDown:function(event){var _evt=event||window.event;var val=_evt.keyCode;if(38==val||40==val){return true;}
return false;},IsKeyLeftRight:function(event){var _evt=event||window.event;var val=_evt.keyCode;if(37==val||39==val){return true;}
return false;},IsKeyEnter:function(event){var _evt=event||window.event;var val=_evt.keyCode;if(13==val){return true;}
return false;},Trim:function(str){return str.replace(/^\s*|\s*$/g,'');},GetAllMall:function(){return this.SourceKey;},GetDictionary:function(){return this.Dictionary;},GetMallInfoById:function(id){for(var i=0,len=this.SourceKey.length;i<len;i++){if(this.SourceKey[i]['id']==id){return this.SourceKey[i];}};return;},GetMallInfoByenName:function(str){for(var i=0,len=this.SourceKey.length;i<len;i++){if(this.SourceKey[i]['enName']==str){return this.SourceKey[i];}};return'';},GetcnNameById:function(id){for(var i=0,len=this.SourceKey.length;i<len;i++){if(this.SourceKey[i]['id']==id){return this.SourceKey[i]['cnName'];}};return'';},GetBonusById:function(id){var _info=this.GetMallInfoById(id);return _info['bonus']||'';}};function LoadJS(src,charset){if(!charset)
charset='utf-8';var s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('charset',charset);s.setAttribute('src',src);document.body.appendChild(s);};/*  |xGv00|f891e67a69f8a11b40d1fd9f95200e68 */