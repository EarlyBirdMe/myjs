@if (0===0) @end/*
:: ----------------------------------------------------------
:: Author    糖饼 / CDC Web Team
:: Blog		 http://www.planeart.cn
:: Email     bingzitang@tencent.com
:: ----------------------------------------------------------

@echo off
call CScript.EXE "%~dpnx0" //Nologo //e:jscript %*
title artTemplate模版编译工具
goto cmd
*/

// 设置待处理的模版编码
var $charset = 'UTF-8';

// 依赖的外部脚本
var $dependencies = [
	{
		path: './engine/template.js',
		charset: 'UTF-8'
	},
	{
		path: './engine/template-syntax.js',
		charset: 'UTF-8'
	}
	
];

var Global = this;
var OS = {
	
	file: {
	
		/** 
		 * 文件读取
		 * @param	{String}		文件路径
		 * @param	{String}		指定字符集
		 * @param 	{Boolean} 		是否为二进制数据. 默认false
		 * @return	{String} 	    文件内容
		 */
		read: function (path, charset, isBinary) {
			charset = charset || 'UTF-8';
			var stream = new ActiveXObject('adodb.stream');
			var fileContent;

			stream.type = isBinary ? 1 : 2;
			stream.mode = 3;
			stream.open();
			stream.charset = charset;
			stream.loadFromFile(path);
			fileContent = new String(stream.readText());
			fileContent.charset = charset;
			stream.close();
			return fileContent.toString();
		},

		/**
		 * 文件写入
		 * @param 	{String} 		文件路径
		 * @param 	{String} 		要写入的数据
		 * @param	{String}		指定字符集. 默认'UTF-8'
		 * @param 	{Boolean} 		是否为二进制数据. 默认false
		 * @return 	{Boolean} 		操作是否成功
		 */
		 write: function (path, data, charset, isBinary) {
			var stream = new ActiveXObject('adodb.stream');
			
			stream.type = isBinary ? 1 : 2;

			if (charset) {
				stream.charset = charset;
			} else if (!isBinary) {
				stream.charset = 'UTF-8';
			}
			
			try {
				stream.open();
				if (!isBinary) {
					stream.writeText(data);
				} else {
					stream.write(data);
				}
				stream.saveToFile(path, 2);

				return true;
			} catch (e) {
				throw e;
			} finally {
				stream.close();
			}

			return true;
		},
		
		/**
		 * 枚举目录中所有文件名(包括子目录文件)
		 * @param	{String}	目录
		 * @return	{Array}		文件列表
		 */
		get: (function (path) {
			var fso = new ActiveXObject('Scripting.FileSystemObject');
			var listall = function (infd) {
			
				var fd = fso.GetFolder(infd + '\\');
				var fe = new Enumerator(fd.files);
				var list = [];
				
				while(!fe.atEnd()) { 
					list.push(fe.item() + '');
					fe.moveNext();
				}
				
				var fk = new Enumerator(fd.SubFolders);
				for (; !fk.atEnd(); fk.moveNext()) {
					list = list.concat(listall(fk.item()));
				}
				
				return list;
			};
			
			return function (path) {
				var list = [];
				try {
					list = listall(path);
				} catch (e) {
				}
				return list;
			}
		})()
	},
	
	app: {
	
		/**
		 * 获取运行参数
		 * @return	{Array}			参数列表
		 */
		getArguments: function () {
			var Arguments = WScript.Arguments;
			var length = Arguments.length;
			var args = [];
			
			if (length) {
				for (var i = 0; i < length; i ++) {
					args.push(Arguments(i));
				}
			}
			
			return args;
		},
		
		quit: function () {
			WScript.Quit(OS.app.errorlevel);
		},
		
		errorlevel: 0
	},
	
	// 引入外部脚本
	include: function (path, charset) {
		var content = OS.file.read(path, charset);
		if (Global.execScript) {
			console.log(5)
			Global.execScript(content);
		} else {
		console.log(execScript)
			Global.eval(content);
		}
	},
	
	// 控制台
	console: {
		error: function (message) {
			OS.app.errorlevel = 1;
			WScript.Echo(message);
		},
		log: function (message) {
			WScript.Echo(message);
		}
	}
};

var console = OS.console;









/*-----*/


if (!Array.prototype.forEach) {
  // ES5 15.4.4.18
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
  Array.prototype.forEach = function(fn, context) {
    for (var i = 0, len = this.length >>> 0; i < len; i++) {
      if (i in this) {
        fn.call(context, this[i], i, this);
      }
    }
  }; 
}

if (!String.prototype.trim) {
String.prototype.trim = (function() {

    // http://perfectionkills.com/whitespace-deviations/
    var whiteSpaces = [

      '\\s',
      '00A0', // 'NO-BREAK SPACE'
      '1680', // 'OGHAM SPACE MARK'
      '180E', // 'MONGOLIAN VOWEL SEPARATOR'
      '2000-\\u200A',
      '200B', // 'ZERO WIDTH SPACE (category Cf)
      '2028', // 'LINE SEPARATOR'
      '2029', // 'PARAGRAPH SEPARATOR'
      '202F', // 'NARROW NO-BREAK SPACE'
      '205F', // 'MEDIUM MATHEMATICAL SPACE'
      '3000' //  'IDEOGRAPHIC SPACE'

    ].join('\\u');

    var trimLeftReg = new RegExp('^[' + whiteSpaces + ']+');
    var trimRightReg = new RegExp('[' + whiteSpaces + ']+$');

    return function() {
      return String(this).replace(trimLeftReg, '').replace(trimRightReg, '');
    }

  })();
}


// 加载依赖的外部脚本
for (var i = 0; i < $dependencies.length; i ++) {
	eval(OS.file.read($dependencies[i].path, $dependencies[i].charset));
}

function js_beautify(a,b){function J(a){a=typeof a=="undefined"?!1:a;while(d.length&&(d[d.length-1]===" "||d[d.length-1]===l||d[d.length-1]===y||a&&(d[d.length-1]==="\n"||d[d.length-1]==="\r")))d.pop()}function K(a){return a.replace(/^\s\s*|\s\s*$/,"")}function L(){var a=F;F=!1,M(),F=a}function M(a){j.eat_next_space=!1;if(F&&S(j.mode))return;a=typeof a=="undefined"?!0:a,j.if_line=!1,J();if(!d.length)return;if(d[d.length-1]!=="\n"||!a)w=!0,d.push("\n");y&&d.push(y);for(var b=0;b<j.indentation_level;b+=1)d.push(l);j.var_line&&j.var_line_reindented&&d.push(l),j.case_body&&d.push(l)}function N(){if(f==="TK_COMMENT")return M(!0);if(j.eat_next_space){j.eat_next_space=!1;return}var a=" ";d.length&&(a=d[d.length-1]),a!==" "&&a!=="\n"&&a!==l&&d.push(" ")}function O(){w=!1,j.eat_next_space=!1,d.push(e)}function P(){j.indentation_level+=1}function Q(){d.length&&d[d.length-1]===l&&d.pop()}function R(a){j&&k.push(j),j={previous_mode:j?j.mode:"BLOCK",mode:a,var_line:!1,var_line_tainted:!1,var_line_reindented:!1,in_html_comment:!1,if_line:!1,in_case:!1,case_body:!1,eat_next_space:!1,indentation_baseline:-1,indentation_level:j?j.indentation_level+(j.case_body?1:0)+(j.var_line&&j.var_line_reindented?1:0):0,ternary_depth:0}}function S(a){return a==="[EXPRESSION]"||a==="[INDENTED-EXPRESSION]"}function T(a){return X(a,["[EXPRESSION]","(EXPRESSION)","(FOR-EXPRESSION)","(COND-EXPRESSION)"])}function U(){u=j.mode==="DO_BLOCK";if(k.length>0){var a=j.mode;j=k.pop(),j.previous_mode=a}}function V(a,b){for(var c=0;c<a.length;c++)if(K(a[c])[0]!=b)return!1;return!0}function W(a){return X(a,["case","return","do","if","throw","else"])}function X(a,b){for(var c=0;c<b.length;c+=1)if(b[c]===a)return!0;return!1}function Y(a){var b=p,d=c.charAt(b);while(X(d,m)&&d!=a){b++;if(b>=I)return 0;d=c.charAt(b)}return d}function Z(){x=0;if(p>=I)return["","TK_EOF"];v=!1;var a=c.charAt(p);p+=1;var b=F&&S(j.mode);if(b){var e=0;while(X(a,m)){a==="\n"?(J(),d.push("\n"),w=!0,e=0):a==="	"?e+=4:a!=="\r"&&(e+=1);if(p>=I)return["","TK_EOF"];a=c.charAt(p),p+=1}j.indentation_baseline===-1&&(j.indentation_baseline=e);if(w){var h;for(h=0;h<j.indentation_level+1;h+=1)d.push(l);if(j.indentation_baseline!==-1)for(h=0;h<e-j.indentation_baseline;h++)d.push(" ")}}else{while(X(a,m)){a==="\n"&&(x+=D?x<=D?1:0:1);if(p>=I)return["","TK_EOF"];a=c.charAt(p),p+=1}if(C&&x>1)for(h=0;h<x;h+=1)M(h===0),w=!0;v=x>0}if(X(a,n)){if(p<I)while(X(c.charAt(p),n)){a+=c.charAt(p),p+=1;if(p===I)break}if(p===I||!a.match(/^[0-9]+[Ee]$/)||c.charAt(p)!=="-"&&c.charAt(p)!=="+")return a==="in"?[a,"TK_OPERATOR"]:(v&&f!=="TK_OPERATOR"&&f!=="TK_EQUALS"&&!j.if_line&&(C||g!=="var")&&M(),[a,"TK_WORD"]);var i=c.charAt(p);p+=1;var k=Z(p);return a+=i+k[0],[a,"TK_WORD"]}if(a==="("||a==="[")return[a,"TK_START_EXPR"];if(a===")"||a==="]")return[a,"TK_END_EXPR"];if(a==="{")return[a,"TK_START_BLOCK"];if(a==="}")return[a,"TK_END_BLOCK"];if(a===";")return[a,"TK_SEMICOLON"];if(a==="/"){var q="",s=!0;if(c.charAt(p)==="*"){p+=1;if(p<I)while((c.charAt(p)!=="*"||!c.charAt(p+1)||c.charAt(p+1)!=="/")&&p<I){a=c.charAt(p),q+=a;if(a==="\r"||a==="\n")s=!1;p+=1;if(p>=I)break}return p+=2,s&&x==0?["/*"+q+"*/","TK_INLINE_COMMENT"]:["/*"+q+"*/","TK_BLOCK_COMMENT"]}if(c.charAt(p)==="/"){q=a;while(c.charAt(p)!=="\r"&&c.charAt(p)!=="\n"){q+=c.charAt(p),p+=1;if(p>=I)break}return p+=1,v&&M(),[q,"TK_COMMENT"]}}if(a==="'"||a==='"'||a==="/"&&(f==="TK_WORD"&&W(g)||g===")"&&X(j.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"])||f==="TK_COMMENT"||f==="TK_START_EXPR"||f==="TK_START_BLOCK"||f==="TK_END_BLOCK"||f==="TK_OPERATOR"||f==="TK_EQUALS"||f==="TK_EOF"||f==="TK_SEMICOLON")){var t=a,u=!1,y=a;if(p<I)if(t==="/"){var z=!1;while(u||z||c.charAt(p)!==t){y+=c.charAt(p),u?u=!1:(u=c.charAt(p)==="\\",c.charAt(p)==="["?z=!0:c.charAt(p)==="]"&&(z=!1)),p+=1;if(p>=I)return[y,"TK_STRING"]}}else while(u||c.charAt(p)!==t){y+=c.charAt(p),u?u=!1:u=c.charAt(p)==="\\",p+=1;if(p>=I)return[y,"TK_STRING"]}p+=1,y+=t;if(t==="/")while(p<I&&X(c.charAt(p),n))y+=c.charAt(p),p+=1;return[y,"TK_STRING"]}if(a==="#"){if(d.length===0&&c.charAt(p)==="!"){y=a;while(p<I&&a!="\n")a=c.charAt(p),y+=a,p+=1;return d.push(K(y)+"\n"),M(),Z()}var A="#";if(p<I&&X(c.charAt(p),r)){do a=c.charAt(p),A+=a,p+=1;while(p<I&&a!=="#"&&a!=="=");return a!=="#"&&(c.charAt(p)==="["&&c.charAt(p+1)==="]"?(A+="[]",p+=2):c.charAt(p)==="{"&&c.charAt(p+1)==="}"&&(A+="{}",p+=2)),[A,"TK_WORD"]}}if(a==="<"&&c.substring(p-1,p+3)==="<!--"){p+=3,a="<!--";while(c[p]!="\n"&&p<I)a+=c[p],p++;return j.in_html_comment=!0,[a,"TK_COMMENT"]}if(a==="-"&&j.in_html_comment&&c.substring(p-1,p+2)==="-->")return j.in_html_comment=!1,p+=2,v&&M(),["-->","TK_COMMENT"];if(X(a,o)){while(p<I&&X(a+c.charAt(p),o)){a+=c.charAt(p),p+=1;if(p>=I)break}return a==="="?[a,"TK_EQUALS"]:[a,"TK_OPERATOR"]}return[a,"TK_UNKNOWN"]}var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y="";b=b?b:{};var z;b.space_after_anon_function!==undefined&&b.jslint_happy===undefined&&(b.jslint_happy=b.space_after_anon_function),b.braces_on_own_line!==undefined&&(z=b.braces_on_own_line?"expand":"collapse"),z=b.brace_style?b.brace_style:z?z:"collapse";var A=b.indent_size?b.indent_size:4,B=b.indent_char?b.indent_char:" ",C=typeof b.preserve_newlines=="undefined"?!0:b.preserve_newlines,D=typeof b.max_preserve_newlines=="undefined"?!1:b.max_preserve_newlines,E=b.jslint_happy==="undefined"?!1:b.jslint_happy,F=typeof b.keep_array_indentation=="undefined"?!1:b.keep_array_indentation,G=typeof b.space_before_conditional=="undefined"?!0:b.space_before_conditional,H=typeof b.indent_case=="undefined"?!1:b.indent_case;w=!1;var I=a.length;l="";while(A>0)l+=B,A-=1;while(a&&(a[0]===" "||a[0]==="	"))y+=a[0],a=a.substring(1);c=a,i="",f="TK_START_EXPR",g="",h="",d=[],u=!1,m="\n\r	 ".split(""),n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split(""),r="0123456789".split(""),o="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::",o+=" <%= <% %> <?= <? ?>",o=o.split(" "),q="continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(","),k=[],R("BLOCK"),p=0;for(;;){var $=Z(p);e=$[0],t=$[1];if(t==="TK_EOF")break;switch(t){case"TK_START_EXPR":if(e==="["){if(f==="TK_WORD"||g===")"){X(g,q)&&N(),R("(EXPRESSION)"),O();break}j.mode==="[EXPRESSION]"||j.mode==="[INDENTED-EXPRESSION]"?h==="]"&&g===","?(j.mode==="[EXPRESSION]"&&(j.mode="[INDENTED-EXPRESSION]",F||P()),R("[EXPRESSION]"),F||M()):g==="["?(j.mode==="[EXPRESSION]"&&(j.mode="[INDENTED-EXPRESSION]",F||P()),R("[EXPRESSION]"),F||M()):R("[EXPRESSION]"):R("[EXPRESSION]")}else i==="for"?R("(FOR-EXPRESSION)"):X(i,["if","while"])?R("(COND-EXPRESSION)"):R("(EXPRESSION)");g===";"||f==="TK_START_BLOCK"?M():f==="TK_END_EXPR"||f==="TK_START_EXPR"||f==="TK_END_BLOCK"||g==="."?v&&M():f!=="TK_WORD"&&f!=="TK_OPERATOR"?N():i==="function"||i==="typeof"?E&&N():(X(g,q)||g==="catch")&&G&&N(),O();break;case"TK_END_EXPR":if(e==="]")if(F){if(g==="}"){Q(),O(),U();break}}else if(j.mode==="[INDENTED-EXPRESSION]"&&g==="]"){U(),M(),O();break}U(),O();break;case"TK_START_BLOCK":i==="do"?R("DO_BLOCK"):R("BLOCK");if(z=="expand"||z=="expand-strict"){var _=!1;z=="expand-strict"?(_=Y()=="}",_||M(!0)):f!=="TK_OPERATOR"&&(g==="="||W(g)&&g!=="else"?N():M(!0)),O(),_||P()}else f!=="TK_OPERATOR"&&f!=="TK_START_EXPR"?f==="TK_START_BLOCK"?M():N():S(j.previous_mode)&&g===","&&(h==="}"?N():M()),P(),O();break;case"TK_END_BLOCK":U(),z=="expand"||z=="expand-strict"?(g!=="{"&&M(),O()):(f==="TK_START_BLOCK"?w?Q():J():S(j.mode)&&F?(F=!1,M(),F=!0):M(),O());break;case"TK_WORD":if(u){N(),O(),N(),u=!1;break}if(e==="function"){j.var_line&&(j.var_line_reindented=!0);if((w||g===";")&&g!=="{"&&f!="TK_BLOCK_COMMENT"&&f!="TK_COMMENT"){x=w?x:0,C||(x=1);for(var ab=0;ab<2-x;ab++)M(!1)}}if(e==="case"||e==="default"){g===":"||j.case_body?Q():(H||j.indentation_level--,M(),H||j.indentation_level++),O(),j.in_case=!0,j.case_body=!1;break}s="NONE",f==="TK_END_BLOCK"?X(e.toLowerCase(),["else","catch","finally"])?z=="expand"||z=="end-expand"||z=="expand-strict"?s="NEWLINE":(s="SPACE",N()):s="NEWLINE":f!=="TK_SEMICOLON"||j.mode!=="BLOCK"&&j.mode!=="DO_BLOCK"?f==="TK_SEMICOLON"&&T(j.mode)?s="SPACE":f==="TK_STRING"?s="NEWLINE":f==="TK_WORD"?(g==="else"&&J(!0),s="SPACE"):f==="TK_START_BLOCK"?s="NEWLINE":f==="TK_END_EXPR"&&(N(),s="NEWLINE"):s="NEWLINE",X(e,q)&&g!==")"&&(g=="else"?s="SPACE":s="NEWLINE",e==="function"&&(g==="get"||g==="set")&&(s="SPACE")),j.if_line&&f==="TK_END_EXPR"&&(j.if_line=!1);if(X(e.toLowerCase(),["else","catch","finally"]))f!=="TK_END_BLOCK"||z=="expand"||z=="end-expand"||z=="expand-strict"?M():(J(!0),N());else if(s==="NEWLINE"){if(f!=="TK_START_EXPR"&&g!=="="&&g!==","||e!=="function")e==="function"&&g=="new"?N():W(g)?N():f!=="TK_END_EXPR"?(f!=="TK_START_EXPR"||e!=="var")&&g!==":"&&(e==="if"&&i==="else"&&g!=="{"?N():(j.var_line=!1,j.var_line_reindented=!1,M())):X(e,q)&&g!=")"&&(j.var_line=!1,j.var_line_reindented=!1,M())}else S(j.mode)&&g===","&&h==="}"?M():s==="SPACE"&&N();O(),i=e,e==="var"&&(j.var_line=!0,j.var_line_reindented=!1,j.var_line_tainted=!1),e==="if"&&(j.if_line=!0),e==="else"&&(j.if_line=!1);break;case"TK_SEMICOLON":O(),j.var_line=!1,j.var_line_reindented=!1,j.mode=="OBJECT"&&(j.mode="BLOCK");break;case"TK_STRING":f==="TK_END_EXPR"&&X(j.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"])?N():f=="TK_STRING"||f==="TK_START_BLOCK"||f==="TK_END_BLOCK"||f==="TK_SEMICOLON"?M():f==="TK_WORD"&&N(),O();break;case"TK_EQUALS":j.var_line&&(j.var_line_tainted=!0),N(),O(),N();break;case"TK_OPERATOR":var bb=!0,cb=!0;j.var_line&&e===","&&T(j.mode)&&(j.var_line_tainted=!1);if(j.var_line&&e===","){if(j.var_line_tainted){O(),j.var_line_reindented=!0,j.var_line_tainted=!1,M();break}j.var_line_tainted=!1}if(W(g)){N(),O();break}if(e===":"&&j.in_case){H&&(j.case_body=!0),O(),M(),j.in_case=!1;break}if(e==="::"){O();break}if(e===","){j.var_line?j.var_line_tainted?(O(),M(),j.var_line_tainted=!1):(O(),N()):f==="TK_END_BLOCK"&&j.mode!=="(EXPRESSION)"?(O(),j.mode==="OBJECT"&&g==="}"?M():N()):j.mode==="OBJECT"?(O(),M()):(O(),N());break}X(e,["--","++","!"])||X(e,["-","+"])&&(X(f,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||X(g,q))?(bb=!1,cb=!1,g===";"&&T(j.mode)&&(bb=!0),f==="TK_WORD"&&X(g,q)&&(bb=!0),j.mode==="BLOCK"&&(g==="{"||g===";")&&M()):e==="."?bb=!1:e===":"?j.ternary_depth==0?(j.mode="OBJECT",bb=!1):j.ternary_depth-=1:e==="?"&&(j.ternary_depth+=1),bb&&N(),O(),cb&&N(),e!=="!";break;case"TK_BLOCK_COMMENT":var db=e.split(/\x0a|\x0d\x0a/);if(V(db.slice(1),"*")){M(),d.push(db[0]);for(ab=1;ab<db.length;ab++)M(),d.push(" "),d.push(K(db[ab]))}else{db.length>1?M():f==="TK_END_BLOCK"?M():N();for(ab=0;ab<db.length;ab++)d.push(db[ab]),d.push("\n")}Y("\n")!="\n"&&M();break;case"TK_INLINE_COMMENT":N(),O(),T(j.mode)?N():L();break;case"TK_COMMENT":v?M():N(),O(),Y("\n")!="\n"&&L();break;case"TK_UNKNOWN":W(g)&&N(),O()}h=g,f=t,g=e}var eb=y+d.join("").replace(/[\n ]+$/,"");return eb}typeof exports!="undefined"&&(exports.js_beautify=js_beautify)


var compileTemplate = (function () {


// 包装成SeaJS模块
var toAMD = function (code) {

    template.onerror = function (e) {
        throw e;
    };

    var render = template.compile(code);
    var prototype = render.prototype;

    render = render.toString().replace(/^function\s+(anonymous)/, 'function');

    // 提取include模板
    // @see https://github.com/seajs/seajs/blob/master/src/util-deps.js
    //var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*include|(?:^|[^$])\binclude\s*\(\s*(["'])(.+?)\1\s*\)/g; //"
    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*include|(?:^|[^$])\binclude\s*\(\s*(["'])(.+?)\1\s*(,\s*(.+?)\s*)?\)/g; //"
	var SLASH_RE = /\\\\/g

    function parseDependencies(code) {
      var ret = []

      code.replace(SLASH_RE, "")
          .replace(REQUIRE_RE, function(m, m1, m2) {
            if (m2) {
              ret.push(m2)
            }
          })

      return ret
    };

    var dependencies = [];
    parseDependencies(render).forEach(function (id) {
        dependencies.push('"' + id + '": ' + 'require("' + id + '")');
    });
    var isDependencies = dependencies.length;
    dependencies = '{' + dependencies.join(',') + '}';


    var helpers = [];
    for (var name in prototype) {
        if (name !== '$render') {
            helpers.push('"' + name + '": ' + prototype[name].toString());
        }
    }
    helpers = '{' + helpers.join(',') + '}';


    code = 'define(function (require, exports, module) {\n'
         +      (isDependencies ? 'var dependencies = ' + dependencies + ';' : '')
         +      'var helpers = ' + helpers + ';\n'
         +      (isDependencies ? 'helpers.$render = function (id, data) {'
         +          'return dependencies[id](data);'
         +      '};' : '')
         +      'var Render = ' + render  + ';\n'
         +      'Render.prototype = helpers;'
         +      'return function (data) {\n'
         +          'return (new Render(data)).template;'
         +      '};\n'
         + '});';
    
    
    return code;
};


// 格式化js
var beautify = function (code) {
    
    if (typeof js_beautify !== 'undefined') {
        var config = {
            indent_size: 4,
            indent_char: ' ',
            preserve_newlines: true,
            braces_on_own_line: false,
            keep_array_indentation: false,
            space_after_anon_function: true
        };
        code = js_beautify(code, config);
    }
    return code;
};


// 压缩模板
var compress = function (code) {
    
    var openTag = template.openTag;
    var closeTag = template.closeTag;
    
    if (typeof template !== 'undefined') {
        openTag = template.openTag;
        closeTag = template.closeTag
    }
    
    code = code
    // 去除 html 与 js 多行注释
    .replace(/\/\*(.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|<!--.*?-->/g, '')
    // 去除多余制表符、TAB符、回车符
    .replace(/\n/g, '')
    .replace(/[\r\t]/g, ' ')
    // "\" 转义
    .replace(/\\/g, "\\\\");

    function html (text) {
        return text.replace(/\s+/g, ' ');
    };
    
    function logic (text) {
        return openTag + text.trim() + closeTag;
    };

    // 语法分析
    var strings = '';
    code.split(openTag).forEach(function (text, i) {
        text = text.split(closeTag);
        
        var $0 = text[0];
        var $1 = text[1];
        
        // text: [html]
        if (text.length === 1) {
            
            strings += html($0);
         
        // text: [logic, html]
        } else {
                   
            strings += logic($0);    
            
            if ($1) {
                strings += html($1);
            }
        }
        

    });

    code = strings;

    // ANSI 转义
    /*var unicode = [], ansi;
    for (var i = 0 ; i < code.length; i ++) {
        ansi = code.charCodeAt(i);
        if (ansi > 255) {
            unicode.push('\\u' + ansi.toString(16));
        } else {
            unicode.push(code.charAt(i));
        } 
    }
    code = unicode.join('').trim();*/
    
    return code;
};

return function (source) {
    return beautify(toAMD(compress(source)));
}

})();

var args = OS.app.getArguments();
var list = args.length ? args : OS.file.get('./');

list.forEach(function (path) {
	var rname = /\.(html|htm)$/i;
	if (!rname.test(path)) {
		return;
	}
	console.log('compile: ' + path);
	var source = OS.file.read(path, $charset);
	var code = compileTemplate(source);
	var target = path.replace(rname, '.js');
	OS.file.write(target, code, $charset);
	console.log('output: ' + target);
});

OS.app.quit();

/*-----------------------------------------------*//*
:cmd
::if %errorlevel% == 0 exit
pause>nul
exit
*/





