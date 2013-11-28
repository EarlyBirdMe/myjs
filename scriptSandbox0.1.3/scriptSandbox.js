/**
 * JavaScriot Sandbox
 * @author		tangbin
 * @date		2012-01-24
 * @see			http://code.google.com/p/script-sandbox/
 * @copyright	Copyright (c) 2012, planeArt.cn. All rights reserved.
 * @license		BSD
 * @constructor
 */
var scriptSandbox = function () {

	var that = this;
	
	// 使用 iframe 创建一个新的执行环境
	var iframe = document.createElement('iframe');
	
	iframe.style.display = 'none';
	iframe.src = 'about:blank';
	
	// HTML5 iframe 沙箱属性
	// @see http://www.infoq.com/cn/news/2010/01/HTML-5-Sandbox-IFrame
	iframe.sandbox = 'allow-scripts';
	
	(document.body || document.getElementsByTagName('head')[0]).appendChild(iframe);

	
	this.sandbox = iframe;
	this.window = iframe.contentWindow;
	this.document = iframe.contentDocument || iframe.contentWindow.document;


	
	var script = ['<script>'];
	var iframes = [];
	
	
	// 针对对象不支持访问 "__proto__" 的浏览器使用黑名单机制，
	// 简单的重定义存在安全隐患的 DOM 方法
	var blacklist = this.blacklist;
	var len = blacklist.length;
	
	for (var i = 0, blackName; i < len; i ++) {
	
		blackName = blacklist[i];
		
		script.push('try {');
	
		
		if (blackName === 'frameElement') {
			// safari bug
			script.push('function ', blackName, ' () {}');
		} else {
			// chrome 与 IE9 的 document 属性是常量
			script.push('eval("function ', blackName, ' () {}")');
		};

		script.push('} catch (e) {}');
		
		iframes.push('<iframe name="', blackName, '"></iframe>');
		
	};
	
	
	iframes = iframes.join('');
	script.push('</script>');
	script = script.join('');
	
	
	
	this.document.open();
	this.document.write('<html><head></head><body>' + script + '</body></html>');
	this.document.close();
	
	

	// 初始化沙箱环境 (在沙箱中的闭包内执行)
	var evalCode = function () {
	
		var html = document.documentElement;
		var head = document.head;
		var body = document.body;
		var proto = '__proto__';
		
		// 清除 document.head 与 document.body
		head && html.removeChild(head);
		html.removeChild(body);
		
		// 转移创建 script 需要用到的 document.createElement 方法
		if (document[proto]) {
			$host.createElement = document[proto].createElement;
		};
		
		// opera: 强制覆盖 parent 与 top 等"顽固"属性
		if (typeof this.parent === 'object') {
			var div = document.createElement('div');
			div.innerHTML = $iframes;
			html.appendChild(div);
		};
	
		// chrome|firefox|opera|safair: 清除原型属性与方法
		if (window[proto]) {
			window[proto] = {};
			document[proto] = {};
			delete html.innerHTML;
		};
		
		// IE9: document 是常量，只能覆盖掉其属性
		if  (this.document.createElement) { // 注意，IE6 需要使用 this 前缀
			$host.createElement = document.createElement;
			document.createElement = null;
		};
		
		// IE: 屏蔽脚本报错
		this.onerror = function (e) {
			console.log(e);
			return true;
		};
		
		
		// 开放给沙箱与外界通讯的接口
		this.sandbox = $sandbox;
		
		// 沙箱内调试方法
		this.console = $console;
		
	};
	
	var requires = {
		
		$host: this,
		
		$iframes: iframes,
		
		$sandbox: {
			postMessage: function (message) {
				that.message.apply(that, arguments);
			},
			message: function () {}
		},
		
		$console: window.console || {
			log: function (msg) {
				that.log(msg);
			}
		},
		
		document: this.document
		
	};
	
	try {
		this.eval(evalCode, requires);
	} catch (e) {
		this.log('scriptSandbox: Initialize Error!');
		this.log(e);
	};
	
};

scriptSandbox.prototype = {
	
	
	version: '0.1.3',

	
	/**
	 * JSONP 安全加载器
	 * @param	{String}	地址
	 * @param	{Function}	回调函数 ( 第一个参数接收 JSON )
	 * @param	{String}	(可选) 指定回调函数名 (不建议填写，因为程序能自动生成)
	 */
	getJSON: function (url, callback, name) {
		
		var ts = + new Date;
		var urlCallback = name ? '' : '&callback=sandbox' + ts;
		var sandboxWindow = this.window;
		
		
		sandboxWindow[name] = function (data) {
		
			if (window.JSON && typeof data === 'string') {
				try {
					data = JSON.parse(data);
				} catch (e) {};
			};
			
			removeCallback();
			callback(data);
		};
		
		
		var removeCallback = function () {
			if (sandboxWindow[name]) {
				sandboxWindow[name] = undefined;
			};
		};
			
			
		this.getScript(url, function () {
			removeCallback();
		}, urlCallback);
		
	},
	
	
	/**
	 * 请求远程脚本
	 * @param	{String}	URL
	 * @param	{Function}	(可选) 回调函数
	 */
	getScript: function (url, callback) {
	
		var query = arguments[2] || '';
		var ts = + new Date;
		var ret = url.replace(/([?&])_=[^&]*/, "$1_=" + ts );
		

		url = ret + ((ret === url) ? (/\?/.test(url) ? '&' : '?') + '_=' + ts : '');
		url = url + query;

		var sDocument = this.document;
		var sCreateElement = this.createElement;
		
		var script = sCreateElement
		? sCreateElement.call(sDocument, 'script')
		: sDocument.createElement('script');
		
		
		script.async = 'async';
		
		
		script.onload = script.onreadystatechange = function () {
		
			var isReady = !script.readyState
			|| /loaded|complete/.test(script.readyState);
			
			if (isReady) {

				script.onload = script.onreadystatechange = null;
				sDocument.documentElement.removeChild(script);

				callback && callback();
			};
			
		};
		
		script.src = url;
		sDocument.documentElement.appendChild(script);
	},
	
	
	/**
	 * 在沙箱环境中设置全局变量
	 * @param	{Object}	待浅复制的对象
	 */
	defined: function (data) {
		for (var i in data) {
			this.window[i] = data[i];
		};
	},
	
	
	/**
	 * 在沙箱环境中执行 javascript 代码
	 * @param	{String, Function}	表达式内容
	 * @param	{Object}	(可选) 依赖的对象
	 * @return	{Any}	引擎运行后结果
	 */
	eval: function (code, requires) {
	
		var context = this.window;
		var variable = [];
		var value = [];
		
		requires = requires || {};
		for (var i in requires) {
			variable.push(i);
			value.push(requires[i]);
		};
		
		code = code.toString();
		
		if (code.indexOf('function') === 0) {
			code = 'return (' + code + ').apply(this, arguments)';
		} else {
			code = 'return (' + code + ')';
		};

		// IE6 BUG
		if (!context.Function) {
			context.Function = window.Function;
		};
		
		return (new context.Function(variable, code))
		.apply(context, value);
	},
	
	
	/**
	 * 监听沙箱传递来的消息
	 * @event
	 */
	message: function () {},
	
	
	/*
	 * 向沙箱发送消息
	 * @param	{Any}	消息
	 */
	postMessage: function (message) {
		this.window.sandbox.message(message);
	},
	
	
	/**
	 * 关闭沙箱 - 沙箱内的对象将从内存中清空
	 */
	close: function () {
		this.sandbox.src = 'about:blank';
		this.sandbox.parentNode.removeChild(this.sandbox);
	},
	
	
	/**
	 * 用来定义沙箱内 console.log 方法 ( IE6,7 )
	 */
	log: function (message) {
		window.console && console.log(message);
	},
	
	
	/** @inner API 黑名单 */
	blacklist:
	['top', 'parent', 'opener', 'frames', 'document', 'frameElement',
	'alert', 'confirm', 'prompt', 'open', 'showModelessDialog', 'print',
	'Image', 'ActiveXObject', 'XMLHttpRequest', 'WebSocket', 'execScript']
	
};
