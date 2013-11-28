

JSONP_TEST('{"name": "来自沙箱的JSON数据"}');

(function () {
// return


try {
	
	console.log(document.createElement)
	console.log(document.cookie)
	console.log(this);
	print();
} catch (e) {
	
};


try {
	alert('我是恶意脚本');
} catch (e) {
	
};

try {
	(new Image).src = 'http://g.cn';
} catch (e) {
	
};


try {
	if (document && ('createElement' in document)) {
		var img = document.createElement('img');
		img.src = 'http://google.cn';
		sandbox.postMessage('沙箱能访问自己的 document !');
		
	} else {}
	
} catch (e) {
};


try {
	top.document.body.innerHTML += 'hello world!1';
} catch (e) {
	
};

try {
	this.top.document.body.innerHTML += 'hello world!2';
} catch (e) {
};

try {
	window.document.body.innerHTML += 'hello world!3';//
} catch (e) {
};

try {
	window.top.document.body.innerHTML += 'hello world!4';
} catch (e) {
};

try {
	document.body.innerHTML += 'hello world!5';//
} catch (e) {
};

try {
	parent.document.body.innerHTML += 'hello world!6';
} catch (e) {
};

try {
	this.parent.document.body.innerHTML += 'hello world!7';
} catch (e) {
};

try {
	// 执行此 API， safari 会导致异常
	frameElement.ownerDocument.body.innerHTML += '测试 abcd 发现的漏洞';
} catch (e) {
	
};

try {
	console.log(document.getElementsByTagName('*'));
} catch (e) {};

try {
	console.log(document.documentElement);
	document.documentElement.appendChild(document.createElement('div'));
} catch (e) {};

try {
	document.documentElement.innerHTML = '<img src="http://g.cn" />';
} catch (e) {};

try {
	document.documentElement.outerHTML = '<img src="http://g.cn" />';
} catch (e) {};


})();

console.log('沙箱内所有脚本执行完毕')
sandbox.postMessage('我是沙箱内通过 postMessage 传送的消息');
