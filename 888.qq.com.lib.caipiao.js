/***********************************************************
 * Copyright (c) 2005-2012, 888.qq.com All rights reserved *
 ***********************************************************/

/**
 * @fileOverView QQ彩票API接口库
 * @author: classyuan、Jeking
 * @version: v1.0.0.20121008
 * @encode: GB2312
 *
 * @remark:
 *     1) 此API内路径请使用完整路径,勿使用相对根目录路径,因为涉及到第三方调用(例如:8788)
 *     2) 此API内接口调用请使用JSONP方式,原因同上
 *
 *
 * @modify:
 *     2012/11/15 xiaoqi 先停用session
 *     2012/11/20 classyuan 修改库文件地址
 *     2012/11/22 classyuan 修改登录验证逻辑
 *     2012/12/14 classyuan 增加checkLogin方法
 *     2013/06/15 jeking 添加cp.util.formatdesstr 玩法说明格式化工具
 *     2013/06/19 jeking 优化formatWinCodes快频标红逻辑
 *
 */

var domain_sites = {
    '888.qq.com': 'qq.com',
    'test.qq.com': 'qq.com',
    'dev.qq.com': 'qq.com',
    '888.sports.qq.com': 'qq.com',
    'buy.888.qq.com': 'qq.com'
};
domain_sites[window.location.host] && (document.domain = domain_sites[window.location.host]);

// Part1: 对象原型/原生对象扩展
/**
 * @description 保留小数
 * @author jeking、classyuan
 * @param {String|Number} n 小数位数
 * @return {String}
 * @example
 var i='123.45678'
 i.toFixed(2);  123.46
 */
Number.prototype.toFixed = function (n) {
    n = n || 0;
    var result = (Math.round(this * Math.pow(10, n)) / Math.pow(10, n)).toString();
    if (arguments.length > 1 && arguments[1] == "fix") {
        result = (Math.floor(this * Math.pow(10, n)) / Math.pow(10, n)).toString();
    }
    if (n > 0) { // 处理位数n
        result = result.split('.');
        result[1] = result[1] || '';
        n -= result[1].length;
        while (n > 0) {
            result[1] += '0';
            n--;
        }
        result = result.join('.');
    }
    return result;
};
/**
 * @description 把Number设置为指定小数位数的数字, 主要用于金额截取(不进行四舍五入,直接截取)
 * @author jeking、classyuan
 * @param {String|Number} n 小数位数
 * @return {String}
 * @example
 var i='123.45678'
 i.toFixed();//123.45
 i.toFixed(3);//123.456
 */
Number.prototype.fix = function (n) {
    var val = String(this);
    n = Math.abs(n);
    val = val.split('.');
    val[1] = val[1] || '';
    var m = val[1].length;
    if (m < n) { // 小数位数少于要截取的位数
        m = n - m;
        while (m > 0) {
            val[1] += '0';
            m--;
        }
    }
    return val[0] + ((n > 0) ? ('.' + val[1].substr(0, n)) : '');
};

/**
 * @description 日期比较(Date - date)（传入的参数需要是时间对象）
 * @author jeking、classyuan
 * @param {Object} date 必须是时间对象
 * @param {String} [cmpType:ms] 比较类型, 可选值: Y/M/d/h/m/s/ms -> 年/月/日/时/分/妙/毫秒
 * @return {Int}
 * @example
 lotteryDrawTime.dateDiff(_serverTime, 'd')
 */

Date.prototype.dateDiff = function (date, cmpType) {
    var diff = 0;
    switch (cmpType) {
        case 'Y':
            diff = this.getFullYear() - date.getFullYear();
            break;
        case 'M':
            diff = (this.getFullYear() - date.getFullYear()) * 12 + (this.getMonth() - date.getMonth());
            break;
        case 'd':
            diff = (this - date) / 86400000;
            break;
        case 'h':
            diff = (this - date) / 3600000;
            break;
        case 'm':
            diff = (this - date) / 60000;
            break;
        case 's':
            diff = (this - date) / 1000;
            break;
        default:
            diff = this - date;
            break;
    }
    return diff;
};

/**
 * @description 格式化日期为指定的格式
 * @author jeking、classyuan
 * @param {String} pattern 输出格式, %Y/%M/%d/%h/%m/%s %w的组合
 * @param {Boolean} [isFill:false] 不足两位是否补0
 * @return {String}
 * @example
 var t=new Date();
 t.format('%Y/%M/%d %h:%m:%s');
 输出：2012/07/16 16:05:30
 */
Date.prototype.format = function (pattern, isFill) {
    var Y = this.getFullYear();
    var M = this.getMonth() + 1;
    var d = this.getDate();
    var h = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    var w = this.getDay();
    var week=['日','一','二','三','四','五','六'];
    w=week[w];
    if (isFill) {
        M = (M < 10) ? ('0' + M) : M;
        d = (d < 10) ? ('0' + d) : d;
        h = (h < 10) ? ('0' + h) : h;
        m = (m < 10) ? ('0' + m) : m;
        s = (s < 10) ? ('0' + s) : s;
        s = w;
    }
    pattern = pattern || '%Y-%M-%d %h:%m:%s';
    pattern = pattern.replace('%Y', Y);
    pattern = pattern.replace('%M', M);
    pattern = pattern.replace('%d', d);
    pattern = pattern.replace('%h', h);
    pattern = pattern.replace('%m', m);
    pattern = pattern.replace('%s', s);
    pattern = pattern.replace('%w', w);
    return pattern;
};


var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
/**
 * @description base64转码
 * @author jeking、classyuan
 * @param {String} d 转码字符串
 * @return {String}
 * @example
 base64encode("nihao");//bmloYW8=
 */
function base64encode(d) {
    var a, b, e, c, f, g;
    e = d.length;
    b = 0;
    for (a = ""; b < e;) {
        c = d.charCodeAt(b++) & 255;
        if (b == e) {
            a += base64EncodeChars.charAt(c >> 2);
            a += base64EncodeChars.charAt((c & 3) << 4);
            a += "==";
            break
        }
        f = d.charCodeAt(b++);
        if (b == e) {
            a += base64EncodeChars.charAt(c >> 2);
            a += base64EncodeChars.charAt((c & 3) << 4 | (f & 240) >> 4);
            a += base64EncodeChars.charAt((f & 15) << 2);
            a += "=";
            break
        }
        g = d.charCodeAt(b++);
        a += base64EncodeChars.charAt(c >> 2);
        a += base64EncodeChars.charAt((c & 3) << 4 | (f & 240) >> 4);
        a += base64EncodeChars.charAt((f & 15) << 2 | (g & 192) >>
            6);
        a += base64EncodeChars.charAt(g & 63)
    }
    return a
}
/**
 * @description base64解码
 * @author jeking、classyuan
 * @param {String} d 转码字符串
 * @return {String}
 * @example
 base64encode("bmloYW8=");//nihao
 */
function base64decode(d) {
    var a, b, e, c, f;
    c = d.length;
    e = 0;
    for (f = ""; e < c;) {
        do a = base64DecodeChars[d.charCodeAt(e++) & 255]; while (e < c && -1 == a);
        if (-1 == a)break;
        do b = base64DecodeChars[d.charCodeAt(e++) & 255]; while (e < c && -1 == b);
        if (-1 == b)break;
        f += String.fromCharCode(a << 2 | (b & 48) >> 4);
        do {
            a = d.charCodeAt(e++) & 255;
            if (61 == a)return f;
            a = base64DecodeChars[a]
        } while (e < c && -1 == a);
        if (-1 == a)break;
        f += String.fromCharCode((b & 15) << 4 | (a & 60) >> 2);
        do {
            b = d.charCodeAt(e++) & 255;
            if (61 == b)return f;
            b = base64DecodeChars[b]
        } while (e < c && -1 == b);
        if (-1 ==
            b)break;
        f += String.fromCharCode((a & 3) << 6 | b)
    }
    return f
}
function utf16to8(d) {
    var a, b, e, c;
    a = "";
    e = d.length;
    for (b = 0; b < e; b++)c = d.charCodeAt(b), 1 <= c && 127 >= c ? a += d.charAt(b) : (2047 < c ? (a += String.fromCharCode(224 | c >> 12 & 15), a += String.fromCharCode(128 | c >> 6 & 63)) : a += String.fromCharCode(192 | c >> 6 & 31), a += String.fromCharCode(128 | c >> 0 & 63));
    return a
}
function utf8to16(d) {
    var a, b, e, c, f, g;
    a = "";
    e = d.length;
    for (b = 0; b < e;)switch (c = d.charCodeAt(b++), c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            a += d.charAt(b - 1);
            break;
        case 12:
        case 13:
            f = d.charCodeAt(b++);
            a += String.fromCharCode((c & 31) << 6 | f & 63);
            break;
        case 14:
            f = d.charCodeAt(b++), g = d.charCodeAt(b++), a += String.fromCharCode((c & 15) << 12 | (f & 63) << 6 | (g & 63) << 0)
    }
    return a
};


jQuery.extend({stringify: function (a) {
    var c = typeof a;
    if ("object" != c || null === a)return"string" == c && (a = '"' + a + '"'), "" + a;
    var d, b, f = [], e = a && a.constructor == Array;
    for (d in a)b = a[d], c = typeof b, a.hasOwnProperty(d) && ("string" == c ? b = '"' + b + '"' : "object" == c && null !== b && (b = jQuery.stringify(b)), f.push((e ? "" : '"' + d + '":') + ("" + b)));
    return(e ? "[" : "{") + ("" + f) + (e ? "]" : "}")
}});


/**
 * @namespace 彩票类
 * @name CP
 * @author jeking、classyuan
 */
var CP = {}; // 防止子页面'var CP = CP || {}'的写法造成CP未定义
CP.Dom = {};
/**
 * @description 时间戳
 * @author jeking、classyuan
 * @return {String} 如：1342414283491
 * @example CP.t();
 * @memberOf CP
 */
CP.t = function () {
    return Date.parse(new Date());
};

/**
 * @description 返回数据类型
 * @param {*} o 任何对象[0,1]|{a:"123"}|123|'123'|true|function(){}|null|undefined
 * @author jeking、classyuan
 * @return {String} string|array|object|function|number|boolean|null|undefined
 * @example CP.getType([0,1]);
 * @memberOf CP
 */
CP.getType = function (o) {
    var t;
    return ((t = typeof(o)) == 'object' ? Object.prototype.toString.call(o).slice(8, -1) : t).toLowerCase();
};


/**
 * @description 获取当前渠道
 * @author classyuan
 * @return {String}
 * @memberOf CP
 */
CP.Channel = function () {
    var name = '';
    var conf = {
        hulai: '/hulai',
        qqapp: '/qqapp',
        game: '/game',
        py: '/py',
        qzone: '/qzone',
        qplus: '/qplus'
    };
    /**
     * @description 返回当前渠道
     * @author classyuan
     * @return {String}
     * @example CP.Channel.get();
     * @memberOf CP.Channel
     */
    var getName = function () {
        if (name === '') {
            var pathname = window.location.pathname || '/';
            pathname = pathname.split('/');
            name = pathname[1];
        }
        return conf[name] || '';
    }
    return {
        get: getName

    }
}()
/**
 * @description 获取服务器时间
 * @author jeking、classyuan
 * @return {String} 如：1345021562000
 * @example CP.getServerTime();
 * @memberOf CP
 */
CP.getServerTime = function (flag) {
    var _ts = this;
    if (typeof(_ts.thisTime) !== 'number' || flag) {
        jQuery.ajax({
            type: 'POST',
            url: '/channel/include/get_server_time.php',
            cache: false,
            async: false,
            dataType: 'text',
            success: function (json) {
                _ts.thisTime = new Date().getTime() - new Date(json).getTime();

            }
        })
    }
    return new Date().getTime() - _ts.thisTime;
}

/**
 * @namespace 数学计算类
 * @name math
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.math = {
    /**
     * @description 排列总数
     * @param {Int} n 总数
     * @param {Int} m 组合位数
     * @author classyuan
     * @return {Int}
     * @example CP.math.C(6,5);
     * @memberOf CP.math
     */
    C: function (n, m) {
        var n1 = 1, n2 = 1;
        for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
        }
        return n1 / n2;
    },
    /**
     * @description 组合总数
     * @param {Int} n 总数
     * @param {Int} m 组合位数
     * @author classyuan
     * @return {Int}
     * @example CP.math.P(5,3); 60
     * @memberOf CP.math
     */
    P: function (n, m) {
        var n1 = 1, n2 = 1;
        for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
        }
        return n1;
    },
    /**
     * @description 枚举数组算法
     * @param {Int} n 数组长度
     * @param {Int|Array} m 枚举位数
     * @author classyuan
     * @return {Int}
     * @example CP.math.Cs(4,3);  [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
     * @memberOf CP.math
     */
    Cs: function (len, num) {
        var arr = [];
        if (typeof(len) == 'number') {
            for (var i = 0; i < len; i++) {
                arr.push(i + 1);
            }
        } else {
            arr = len;
        }
        var r = [];
        (function f(t, a, n) {
            if (n == 0) return r.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat(a[i]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return r;
    },
    /**
     * @description 获取竞彩N串1注数
     * @param {Array} spArr [2,2,1] 每一场选中的个数
     * @param {Int} n n串1
     * @author classyuan
     * @return {Int}
     * @example CP.math.N1([2,2,1],3);
     * @memberOf CP.math
     */
    N1: function (spArr, n) {
        var zhushu = 0;
        var m = spArr.length;//场次
        var arr = CP.math.Cs(m, n);
        for (var i = 0; i < arr.length; i++) {
            var iTotal = 1;//每场注数
            for (var j = 0; j < arr[i].length; j++) {
                iTotal *= spArr[arr[i][j] - 1]
            }
            zhushu += iTotal
        }
        return zhushu;
    },
    /**
     * @description 获取竞彩N串1胆拖注数
     * @param {Array} spArrd [[3,3,3,1,2],[1,1,1,1,0]] 选中5场，4场胆拖
     * @param {Int} n n串1
     * @author classyuan
     * @return {Int}
     * @example CP.math.N1d([[3,3,3,1,2],[1,1,1,1,0]],5); 选中5场，4场胆拖，5串1玩法  return 54
     * @example CP.math.N1d([[3,3,3,1,2],[1,0,0,0,0]],3); 选中5场，1场胆拖，3串1玩法  return 87
     * @memberOf CP.math
     */
    N1d: function (spArrd, n) {
        var nArr = [], dArr = [];
        try {
            for (var i = 0; i < spArrd[1].length; i++) {
                if (spArrd[1][i] == 1) {
                    dArr.push(spArrd[0][i]);
                } else {
                    nArr.push(spArrd[0][i]);
                }
            }
        } catch (e) {
            return 0;
        }
        if (dArr.length <= n) {
            return CP.math.N1(nArr, n - dArr.length) * CP.math.N1(dArr, dArr.length);
        } else {
            return 0;
        }
    },
    /**
     * 枚举二维数组元素组合
     * @param {Array.<Array>} oriArr 二维数组
     * @param {Number} comQty 组合数
     * @param {Array.<Array>=} fixedArr 固定二维数组
     * @return {Array.<Array>}
     * @example 二维数组
     *           [
     *              [a1,b1],
     *              [a2]
     *           ],
     *           组合数2，
     *           可得到：
     *           [
     *              [a1,a2],
     *              [b1,a2]
     *           ]
     */
    enumCom: function (oriArr, comQty, fixedArr) {
        var comArr = [];

        //存储第二维数组第一个元素的数组
        var firstArr = [];
        for (var i = 0, l = oriArr.length; i < l; i++) {
            firstArr.push(oriArr[i][0]);
        }

        comArr = CP.math.Cs(firstArr, comQty);

        var oriItem;
        for (var i = 0, l = oriArr.length; i < l; i++) {
            oriItem = oriArr[i];
            if (oriItem.length > 1) {
                //组合数组
                var comItem;
                for (var j = 0; comItem = comArr[j]; j++) {
                    var addedArr = [];
                    var index = CP.Util.indexOf(comItem, oriItem[0]);
                    if (index !== -1) {
                        for (var k = 1; k < oriItem.length; k++) {
                            var cloneComItem = comItem.slice();
                            cloneComItem.splice(index, 1, oriItem[k]);
                            addedArr.push(cloneComItem);
                        }
                    }
                    comArr = comArr.concat(addedArr);
                }
            }
        }

        if (fixedArr && fixedArr.length > 0) {
            var fixedComArr = CP.math.enumCom(fixedArr, fixedArr.length);
            var comComArr = [];
            var comItem;
            for (var i = 0; comItem = comArr[i]; i++) {
                var fixedItem;
                for (var j = 0; fixedItem = fixedComArr[j]; j++) {
                    comComArr.push(comItem.concat(fixedItem));
                }
            }
            comArr = comComArr;
        }

        return comArr;
    },
    /**
     * @description N串M算法 注意最多支持15场多余的会被截断，不符合规定的串法一律返回0
     * @author classyuan
     * @param {Array} arr 选中场次
     * @param {String} str N串M
     * @return {Number}
     * @example
     CP.math.NM([1,1,2,2,1,1,1,2,1],'4_5')
     CP.math.NM([1,1,2,2,1,1,1,2,1],'8_1')
     * @memberOf CP.math
     */
    NM: function (arr, str, isDan) {
        if (!/^\d{1,2}_\d{1,2}$/.test(str)) {
            return false;
        }
        if (arr.length > 15) {
            arr.length = 15;
        }//超过15场则截断

        var len = arr.length,//数组长度 场次数
            result = [],//保存各种
            n1Arr = [],//计算各种串法注数
            cacheArr = [],//临时数组
            y = Number(str.split('_')[0]) || 0,//N值
            x = len - (y - 1);//曲线公式变量

        switch (str) {//不同串法前面补0
            case '6_7':
                cacheArr = [0, 0, 0, 0];
                break;
            case '6_22':
            case '5_6':
                cacheArr = [0, 0, 0];
                break;
            case '6_42':
            case '5_16':
            case '4_5':
                cacheArr = [0, 0];
                break;
            case '6_57':
            case '5_26':
            case '4_11':
            case '3_4':
                cacheArr = [0];
                break;
        }
        switch (str) {
            case '6_63':
                result.push(x * (x + 1) * (x + 2) * (x + 3) * (x + 4) / 120);
            case '5_31':
            case '6_57':
                result.push(x * (x + 1) * (x + 2) * (x + 3) / 24);
            case '4_15':
            case '5_26':
            case '6_42':
                result.push(x * (x + 1) * (x + 2) / 6);
            case '3_7':
            case '4_11':
            case '5_16':
            case '6_22':
                result.push(x * (x + 1) / 2);
            case '2_3':
            case '3_4':
            case '4_5':
            case '5_6':
            case '6_7':
                result.push(x);
                result.push(1);
                for (var i = 0; i < y && i < 6; i++) {//计算N串1保存到数组
                    n1Arr[i] = CP.math.N1(arr, i + 1);
                }
                cacheArr = cacheArr.concat(result);
                result = 0;
                for (var i = 0, _l = n1Arr.length; i < 6 && i < _l; i++) {
                    result += n1Arr[i] * cacheArr[i];
                }
                break;
            default :
                if (/\d+\_1/.test(str)) {
                    result = CP.math.N1(arr, y);
                } else {
                    result = 0;//非规定串法一律返回0
                }
        }
        return result;
    },
    /**
     * @description 机选号码
     * @param {Int} startNum   起始值
     * @param {Int} totalNum   总数长度
     * @param {Int} len        机选个数或者数组
     * @param {Int} a          是否重复，缺省不重复
     * @param {Array} rep      删除不需要的元素，定胆机选用
     * @param {String} con     幸运选号类型'彩种+玩法+类型+值'例如：dlcr5xz1
     * @param {String} hour    幸运选好保留时间
     * @author classyuan
     * @return {Array}
     * @example CP.math.random(1,35,5); 机选1-35之间5不重复个数字 return [4,12,16,8,34,9]
     * @example CP.math.random(1,12,2,true); 机选 return [4,4]
     * @example CP.math.random(1,11,5,null,[],'dlcr5xz1') 幸运选号
     * @memberOf CP.math   1 10 5
     */
    random: function (startNum, totalNum, len, a, rep, con,hour) {
        var absNum = Math.abs(startNum - totalNum) + 1;
        var repL = 0;
        var luckCon=con&&con.split('')||[];
        if (typeof(rep) == 'object') {
            repL = rep.length;
        }
        if (typeof len == "undefined" || len > absNum || len < 1 || len > absNum - repL) {
            return [];
        }

        var o = {}, _r = new Array(len), i = 0, s, j = 1;
        if (luckCon.length > 0&&CP.Cookie.get(con)!=='') {
            return CP.Cookie.get(con).split(',');
        }else{
            while (i < len) {
                s = parseInt(Math.random() * absNum + startNum);
                if (!a) {
                    s = function (a, s) {
                        for (var i = 0; i < a.length;) {
                            if (a[i++] == s)return null;
                            if (typeof(rep) == 'object') {
                                for (var j = 0; j < repL; j++) {
                                    if (s == rep[j])return null;
                                }
                            }
                        }
                        return s
                    }(_r, s);
                    s !== null && (_r[i++] = s);
                } else {
                    _r[i++] = s;
                }
            }
            if(luckCon.length > 0){
                hour=(hour||1)-(new Date().getMinutes())/60;
                CP.Cookie.set(con, _r.join(','),null,null,hour);
            }
        }
        return _r;
    }
};
/**
 * @namespace 工具辅助
 * @name Util
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Util = {
    /**
     * @description 获取meta标签的content信息
     * @param {String} name <meat>标签的name属性
     * @author jeking、classyuan
     * @return {String}
     * @example CP.Util.getMeta('keywords');
     * @memberOf CP.Util
     */
    getMeta: function (name) {
        var oMeta = document.getElementsByTagName('meta');
        for (var i = 0, len = oMeta.length; i < len; i++) {
            if (oMeta[i].name == name) return oMeta[i].content;
        }
    },
    /**
     * @description 复制到剪切板内容（注意:仅支持ie）
     * @name copy
     * @param {String} txt 保存到剪切板的字符串
     * @author jeking、classyuan
     * @return {Boolean}
     * @example CP.Util.copy('你好');
     * @memberOf CP.Util
     */
    copy: function (txt) {
        if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData('Text', txt);
        } else if (navigator.userAgent.indexOf('Opera') != -1) {
            window.location = txt;
        } else {
            CP.Box.text({
                icon: 4,
                title: '提示',
                info: '当前浏览器不支持此功能'
            });
            return false;
        }
        return true;
    },
    /**
     * @description 过滤文本内容中含有的脚本等危险信息
     * @param {String} str 需要过滤的字符串
     * @author jeking、classyuan
     * @return {String}
     * @example
     CP.Util.filterScript('123<script src="a.js"></script>456');
     结果：123456
     * @memberOf CP.Util
     */
    filterScript: function (str) {
        str = str || '';
        str = decodeURIComponent(str);
        str = str.replace(/<.*>/g, ''); // 过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
        str = str.replace(/[\s ]/g, '&nbsp;'); // 替换空格
        return str;
    },
    /**
     * @description 获取地址栏参数（注意:该方法会经filterScript处理过）
     * @param {String} name 需要获取的参数如bc_tag
     * @param {String} url 缺省：window.location.href
     * @author jeking、classyuan
     * @return {String}
     * @example
     CP.Util.getPara('bc_tag');

     当前地址:http://888.qq.com/static/ssq/?bc_tag=70018.1.38
     返回值:70018.1.38
     * @memberOf CP.Util
     */
    getPara: function (name, url) {
        var para = (typeof url == 'undefined') ? window.location.search : url;
        para = para.split('?');
        para = (typeof para[1] == 'undefined') ? para[0] : para[1];
        var hashIndex = para.indexOf("#");
        if (hashIndex > 0) {
            para = para.substring(0, hashIndex);
        }
        para = para.split('&');
        for (var i = 0; para[i]; i++) {
            para[i] = para[i].split('=');
            if (para[i][0] == name) {
                try { // 防止FF等decodeURIComponent异常
                    return this.filterScript(para[i][1]);
                } catch (e) {
                }
            }
        }
        return '';
    },
    /**
     * @description 根据当前时间获取问候语
     * @author jeking、classyuan
     * @return {String}
     * @example
     CP.Util.greet();//早上好
     * @memberOf CP.Util
     */
    greet: function () {
        var now = (new Date()).getHours();
        var str = '';
        if (now < 6) {
            str = '凌晨好';
        } else if (now < 9) {
            str = '早上好';
        } else if (now < 12) {
            str = '上午好';
        } else if (now < 14) {
            str = '中午好';
        } else if (now < 18) {
            str = '下午好';
        } else {
            str = '晚上好';
        }
        return str;
    },
    /**
     * @description 利用window.name特性,存/取信息到当前应用顶层窗口(CP.TopWin.name)
     注意:需操作CP.TopWin.name属性时请使用此接口
     * @param {String} k
     * @param {String|Array|Object} v 缺省:"取"操作
     * @author jeking、classyuan
     * @return {String}
     * @example CP.Util.win();
     * @memberOf CP.Util
     */
    win: function (k, v) {
        var winNameVal = CP.TopWin.name || '{}';
        try {
            winNameVal = jQuery.parseJSON(winNameVal);
        } catch (e) {
            winNameVal = {};
        }
        if (typeof v != 'undefined') {
            winNameVal[k] = v;
            CP.TopWin.name = jQuery.stringify(winNameVal);
        }
        return winNameVal[k] || '';
    },
    /**
     * 获取元素在数组中的index，如没找到，返回-1
     * @param {Array} arr
     * @param {Oabject} el
     * @return {Number}
     */
    indexOf: function (arr, el) {
        if (arr) {
            if (typeof arr.indexOf === "function") {
                return arr.indexOf(el);
            } else {
                var item;
                for (var i = 0, l = arr.length; i < l; i++) {
                    item = arr[i];
                    if (item === el) {
                        return i;
                    }
                }
            }
        }
        return -1;
    },
    /**
     * @description 动态生成表单
     * @author jeking、classyuan
     * @param {String} url 表单action
     * @param {String} target 表单target
     * @param {String} method 表单提交方式 GET|POST
     * @param {Object} params 表单元素
     * @param {Boolean} [isAutoSubmit:true] 是否自动提交
     * @return {String} 表单ID
     * @example
     CP.Util.doForm(
     'http://888.qq.com/static/dlt.php',
     '_blank',
     'POST',
     'codes=01,02,03,04,05|07&type=ssq&zhushu=1&beishu=1',
     'false'
     );
     * @memberOf CP.Util
     */
    doForm: function (url, target, method, params, isAutoSubmit) {
        var frm = document.createElement('form'),

            frmID = 'cp_dynamic_form_' + (+new Date()),
            bd = document.getElementsByTagName('body')[0],
            str = '';
        frm.method = method;
        frm.target = target;
        frm.action = url;
        frm.id = frmID;
        frm.name = frmID;
        frm.style.display = 'none';
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
                str += '<input type="hidden" name="' + k + '" value="' + params[k] + '" />';
            }
        }
        frm.innerHTML = str;
        bd.appendChild(frm);
	    if (isAutoSubmit !== false) {
		    frm.submit();
		    bd.removeChild(frm);
	    }
	    frm = null;
        return frmID;
    },
    /**
     * @description 重定向，带登录态跳转
     * @author jeking、classyuan
     * @param {String} url 目标地址
     * @param {Boolean} [blank:'_lank'] 跳转方式
     * @param {Object} params 表单元素
     * @example CP.Util.redirectTo('https://www.tenpay.com/v2/account/charge/net_bank.shtml');
     * @memberOf CP.Util
     */
    redirectTo: function (url, blank) {
        //var s = CP.User.getSession();
        CP.Util.doForm('/v1.0/inc/redirect.html', blank || '_blank', 'get', {
            'tourl': url
        });
        return false;
    },
    /**
     * @description 小于10的数字前补0
     * @author classyuan
     * @param {String|Nubmer|Array} obj 需要获取的参数如bc_tag
     * @return {String}
     * @example
     CP.Util.padArray([1,5,10,11]);//['01','05','10','11']
     CP.Util.padArray(5);//'05'
     CP.Util.padArray(5,3);//'005'

     * @memberOf CP.Util
     */
    padArray: function (obj, length) {
        if (obj instanceof Array) {
            for (var j = 0, _max = obj.length; j < _max; j++) {
                var i = Number(obj[j]);
                obj[j] = CP.Util.pad(i, length || 2);
            }
        }
        return obj;
    },

    /**
     * @description 是否补零
     * @author classyuan
     * @param {String} source 数值
     * @param {Int} [length:true] 长度
     * @example CP.Util.pad(9,2);return 09
     * @example CP.Util.pad(9,3);return 009
     * @memberOf CP.Util
     */
    pad: function (source, length) {
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));
        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
        return (negative ? "-" : "") + pre + string;
    },
    /**
     * @description 腾讯侧获取表单提交token值
     * @author classyuan
     * @example CP.Util.getToken();return '40236742'
     * @memberOf CP.Util
     */
    getToken: function () {
        var hash=5318;
        var str= CP.Cookie.get('skey')||'';
        for(var i= 0,len=str.length;i<len;++i){
            hash+=(hash<<5)+str.charCodeAt(i);
        }
        return hash&0x7fffffff;
    },
    /**
     * @description 获取唯一key值
     * @author classyuan
     * @example CP.Util.key();return '108ed532eef'
     * @memberOf CP.Util
     */
    key: function () {
        return parseInt(new Date().getTime() * Math.random()).toString(16);
    },
    /**
     * @description 获取唯一key值
     * @author classyuan
     * @example CP.Util.paramToObj('name=class&age=19');return {name:class,age:19}
     * @memberOf CP.Util
     */
    paramToObj: function (str) {
        var a = str.split('&');
        var obj = {};
        for (var i = 0, n = null, l = a.length; i < l; i++) {
            n = a[i].split('=');
            obj[n[0]] = n[1];
        }
        return obj;
    },
    /**
     * @description 计算是否有重复号码
     * @param {String} c 已选号码
     * @return {String} a 对比的号码
     * @return {String} t 重复多少个号码
     * @example
     var c=[
     ['01 02 03','04 05 06'],
     ['08','02']
     ]
     var a=['04 03','06 08']
     CP.Util.isCodesRepeat(c,a);
     * @memberOf CP.Util
     */
    isCodesRepeat: function (c, a, t) {
        if (c.length == 0) {
            return false;
        }
        var f = typeof(c) == 'object' && typeof(c[0]) == 'string' ? false : c[0].length > 1;//是否矩阵对比

        for (var i = 0, l = c.length; i < l; i++) {
            var m = n = a.length;
            try {
                if (f) {
                    for (var j = 0; j < n; j++) {
                        var reg = new RegExp('(' + c[i][j].replace(/ /g, ')|(') + ')');
                        reg.test(a[j]) && m--;
                    }
                } else {
                    var reg = new RegExp('(' + c[i].replace(/ /g, ')|(') + ')', 'g');
                    var r = a.match(reg) || [];
                    if (t <= r.length)
                        return true;
                }
            } catch (e) {
                return true;
            }
            if (m == 0)return true;
        }
        return false;
    },
    /**
     * @description 中奖号码标红
     * @param {String} c 购买的号码
     * @param {Array} w 开奖号码
     * @param {String} t 标红类型 default|matrix|and|Q2|Q3
     * @param {Array} s 连接符如 逗号竖线空格等  默认值逗号 ["切割","拼接"]
     * @param {String} l 彩种名
     * @return {String} str
     * @example
     var c=
     CP.Util.formatWinCodes(c,w,t,s);
     * @memberOf CP.Util
     */
    formatWinCodes: function (c, w, t, s, l) {
        var str = '';
        t = t && t.toUpperCase();//统一用大写
        var formatCode = function (c, w, s) {
            w = typeof(w) == 'string' && [w] || w;
            for (var i = 0, arr = [], l = c.length; i < l; i++) {
                if (!!w) {
                    for (var j = 0, l1 = w.length; j < l1; j++) {
                        if (w[j] == c[i]) {
                            arr.push('<em class="red">' + c[i] + '</em>');
                            break;
                        } else if (j == l1 - 1) {
                            arr.push(c[i]);
                        }
                    }
                } else {
                    arr.push(c[i]);
                }
            }
            return arr.join(s);
        };
        var formatCodeA1 = function (c, w, s) {	//快乐十分选一红投
            w = typeof(w) == 'string' && [w] || w;
            for (var i = 0, arr = [], l = c.length; i < l; i++) {
                if (!!w) {
                    if (w[0] == '19' || w[0] == '20') {
                        arr.push('<em>' + c[i] + '</em>');
                    } else {
                        arr.push(c[i]);
                    }
                } else {
                    arr.push(c[i]);
                }
            }
            return arr.join(s);
        };
        var common = function () {
            var n = Number(w[0]) + Number(w[1]) + Number(w[2]);
            var key = c.split(","), arr = [];
            for (var i = 0, l = key.length; i < l; i++) {
                if (key[i] == n) {
                    arr.push('<em>' + n + '</em>');
                } else {
                    arr.push(key[i]);
                }
            }
            str = arr.join(",");
        };

        switch (t) {
            case 'Q1':
            case 'R1':
                str = formatCode(c.split(s[0]), w[0], s[1]);
                break;
            case 'Q2':
                c = c.split(s[1]);
                str = formatCode(c[0].split(s[0]), w[0], s[0]) + ',' + formatCode(c[1].split(s[0]), w[1], s[0]);
                break;
            case 'Q3':
                c = c.split(s[1]);
                str = formatCode(c[0].split(s[0]), w[0], s[0]) + ',' + formatCode(c[1].split(s[0]), w[1], s[0]) + ',' + formatCode(c[2].split(s[0]), w[2], s[0]);
                break;
            case 'F1':
                w.length = 1;
                str = formatCode(c.split(s[0]), w[0], s[0]);
                break;
            case 'A1':
                w.length = 1;
                str = formatCodeA1(c.split(s[0]), w, s[1]);
                break;
            case 'Z2':
                w.length = 2;
                str = formatCode(c.split(s[0]), w, s[1]);
                break;
            case 'B2':
                str = formatCode(c.split(s[0]), w, s[1]);
                break;
            case 'B3':
            case 'Z3':
                w.length = 3;
                str = formatCode(c.split(s[0]), w, s[1]);
                break;
            case 'KPDT':
                c = c.split("@");
                if (c.length > 1) {
                    str = formatCode(c[0].split(s[0]), w, s[1]) + '|' + formatCode(c[1].split(s[0]), w, s[1]);
                } else {
                    str = formatCode(c[0].split(s[0]), w, s[1]);
                }
                break;
            case '3A'://快3 三同号通选
            case '3D'://快3 三连号通选
                str = CP.Category.getConf(l, 'betWay')[t];
                break;
            case 'HZ'://和值类型
                var hz = 0;
                for (var i = 0; i < w.length; i++) {
                    hz += parseInt(w[i]);
                }
                str = formatCode(c.split(s[0]), String(hz).split(s[0]), s[1]);
                break;
            case 'FS':
                var strArr = [];
                for (var i = 0; i < c.split(s[0]).length; i++) {
                    strArr.push(formatCode(c.split(s[0])[i].split(' '), w[i], ''));
                }
                str = strArr.join(',');
                break;
            case '2B':	//k3 二同号单选
                //c:'11#2' w:[1,1,2]
                var key = c.split('#')[0].substring(1);
                var win_num = '', win_other_num = '';
                if (w[0] == w[1]) {
                    win_num = w[0];
                    win_other_num = w[2];
                } else if (w[0] == w[2]) {
                    win_num = w[0];
                    win_other_num = w[1];
                } else if (w[1] == w[2]) {
                    win_num = w[1];
                    win_other_num = w[0];
                }
                if (key == win_num && c.split('#')[1] == win_other_num) {
                    str = '<em class="red">' + c + '</em>';
                } else {
                    str = c;
                }
                break;
            case '2A': //k3 二同号复选
                var key = c.split('*')[0].substring(1);
                var win_num = '';
                if (w[0] == w[1] || w[0] == w[2]) {
                    win_num = w[0]
                } else if (w[1] == w[2]) {
                    win_num = w[1]
                }
                if (key == win_num) {
                    str = '<em class="red">' + c + '</em>';
                } else {
                    str = c;
                }
                break;
            case '3B': //k3 三同号单选
                var key = c.substring(2);
                var win_num = '';
                if ((w[0] == w[1]) && (w[1] == w[2])) {
                    win_num = w[0]
                }
                if (key == win_num) {
                    str = '<em class="red">' + c + '</em>';
                } else {
                    str = c;
                }
                break;
            case 'ZX': //3D 直选
                var key = c.split(",");
                var arr = [];
                for (var i = 0, l = w.length; i < l; i++) {
                    if (key[i].indexOf(w[i]) > -1) {
                        var _i = key[i].indexOf(w[i]);
                        arr.push(key[i].replace(key[i].substring(_i, _i + 1), '<em class="red">' + key[i].substring(_i, _i + 1) + '</em>'))
                    } else {
                        arr.push(key[i]);
                    }
                }
                str = arr.join(",");
                break;
            case 'Z3FS': //3D 组三复试
                if ((w[0] == w[1]) || (w[1] == w[2]) || (w[0] == w[2])) {
                    var win_num = [];
                    if (w[0] == w[1]) {
                        win_num = [w[0], w[2]];
                    } else {
                        win_num = [w[0], w[1]];
                    }
                    var key = c.split(","), arr = [];
                    for (var i = 0, l = key.length; i < l; i++) {
                        if ($.inArray(key[i], win_num) > -1) {
                            arr.push('<em class="red">' + key[i] + '</em>');
                        } else {
                            arr.push(key[i]);
                        }
                    }
                    str = arr.join(",");
                } else {
                    str = c;
                }
                break;
            case 'Z6FS': //3D 组6复试
                var key = c.split(","), arr = [];
                for (var i = 0, l = key.length; i < l; i++) {
                    if ($.inArray(key[i], w) > -1) {
                        arr.push('<em>' + key[i] + '</em>');
                    } else {
                        arr.push(key[i]);
                    }
                }
                str = arr.join(",");
                break;
            case 'ZXHZ': //3D 直选和值
                common();
                break;
            case 'Z6HZ': //3D 组六和值
                if ((w[0] == w[1]) || (w[1] == w[2]) || (w[0] == w[2])) {
                    str = c;
                } else {
                    common();
                }
                break;
            case 'Z3HZ': //3D 组三和值
                if ((w[0] == w[1] == w[2]) || ((w[0] != w[1]) && (w[1] != w[2]) && (w[0] != w[2]))) {
                    str = c;
                } else {
                    common();
                }
                break;
            case 'PL3ZXHZ': //PL3 ZXHZ(组选和值)
                if ((w[0] == w[1]) && (w[1] == w[2]) && (w[0] == w[2])) {
                    str = c;
                } else {
                    common();
                }
                break;
            default:
                str = formatCode(c.split(s[0]), w, s[1]);
                break;
        }
        return str;

    },
    /**
     * @description 快频期号格式统一
     * @param {String} s 期号
     * @param {t} s 彩种类型
     * @return {String} str
     * @example
     CP.Util.formatIssue('20130319054','k3');
     * @memberOf CP.Util
     */
    formatIssue: function (s, t) {
        var reg1 = new RegExp('^20(\\d{6})0(\\d{2})$'),
            reg2 = new RegExp('^20(\\d{6})(\\d{2})$'),
            reg3 = new RegExp('^(\\d{6})0(\\d{2})$'),
            reg4 = new RegExp('^(\\d{6})(\\d{2})$'),
            reg = null;
        t = t || "";
        if (reg1.test(s) && t !== 'scc') {
            reg = reg1;
        } else if (reg2.test(s)) {
            reg = reg2;
        } else if (reg3.test(s) && t !== 'scc') {
            reg = reg3;
        } else if (reg4.test(s)) {
            reg = reg4;
        }
        return s.replace(reg, '$1\-$2');
    },
    /**
     * @description 快频切换tab玩法说明文字格式化工具
     * @param {String} str 说明文字
     * @param {Array} args 要格式化的文字数组
     * @return {String} str
     * @example
     var str='选至少 {0} 个号码投注，猜中开奖号码的任意{1}个，即中奖，单注奖金 <em class="red bold">{2}</em> 元。<span class="icon-ask" title="投注方案：{3} \n\开奖号码：{4} \n\中奖金额：{5}元"></span>';
     CP.Util.formatDesStr(str,[2,2,6,"02,04","02,03,04,05,06",6]);
     * @memberOf CP.Util
     */
    formatDesStr: function (str, args) {
        if (!!args) {
            for (var i = 0; i < args.length; i++) {
                str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
            }
            return str;
        }
    }
};


/**
 * @namespace 金额转换类
 * @description 注意:金额不能四舍五入
 * @name Amount
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Amount = {
    /**
     * @description 格式化指定金额为N位小数, 缺省为2位
     * @author jeking、classyuan
     * @param {String|Number} val 接受的格式: 123/123.xxx
     * @param {Int} [n:2] 小数位数
     * @return {String|False}
     * @example CP.Amount.format();
     * @memberOf CP.Amount
     */
    format: function (val, n) {
        return !(/^(\-)?[0-9]+(\.[0-9]+)?$/).test(val) ? false : Number(val).fix(typeof n == 'number' ? n : 2);
    },
    /**
     * @description N位拆分并格式化金额, 缺省为3位
     * @author jeking、classyuan
     * @param {String|Number} val 小数
     * @param {Int} n 拆分长度 缺省：3
     * @return {String|False}
     * @example
     CP.Amount.split('123456.789');//123,456.789
     CP.Amount.split(123456.789,2);//12,34,56.789
     * @memberOf CP.Amount
     */
    split: function (val, n) {
        if (!(val = this.format(val, 2))) return false;
        var negative = val.indexOf('-') != -1;
        n = n || 3;
        val = val.replace('-', '').toString().split('.');
        var tmp = (Number(val[0]).toFixed(n - ((val[0].length % n) || n)).split('.')[1] || '') + val[0];
        val[0] = '';
        while (tmp.length > 0) {
            val[0] += (!val[0] ? tmp.substr(0, n) - 0 : tmp.substr(0, n)) + ','
            tmp = tmp.substr(n);
        }
        return (negative ? '-' : '') + val[0].substr(0, val[0].length - 1) + (val[1] ? '.' + val[1] : '');
    },
    /**
     * @description 转换为大写金额
     * @author jeking、classyuan
     * @param {String|Number} val 金额
     * @return {String|Flase}
     * @example
     CP.Amount.cn('123456.789');//壹拾贰万叁仟肆佰伍拾陆元柒角捌分
     CP.Amount.cn(123456.789);//壹拾贰万叁仟肆佰伍拾陆元柒角捌分
     * @memberOf CP.Amount
     */
    cn: function (val) {
        val += "";
        var negative = val.indexOf('-') != -1;
        val = negative ? Math.abs(val) : val;
        if (!(val = this.format(val, 2)) || parseFloat(val) > 999999999999.99) return false;
        if (Number(val) == 0) return '零';
        var digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        val = val.split('.');
        var result = '';
        var integer = val[0];
        var decimal = val[1];
        if (integer) {
            var units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'];
            for (var i = 0, len = integer.length; i < len; i++) {
                result += digits[integer[i]] + units[len - i - 1];
            }
            result += '元';
        }
        if (decimal > 0) {
            var units = ['分', '角'];
            for (var i = 0, len = decimal.length; i < len; i++) {
                if (decimal[i] > 0) {
                    result += digits[decimal[i]] + units[len - i - 1];
                }
            }
        } else {
            result += '整';
        }
        return (negative ? '负' : '') + result;
    },
    /**
     * @description 亿万转换
     * @author classyuan
     * @param {String|Number} val 金额
     * @example
     CP.Amount.cnUnit('123456.789');//12万
     CP.Amount.cnUnit(1234500006.789);//1亿2345万
     * @memberOf CP.Amount
     */
    cnUnit: function (val) {
        val = parseInt(val, 10) + '';
        val = val.substring(0, val.length - 4);
        var yi = val.substring(0, val.length - 4);
        var wan = val.substring(val.length - 4, val.length);
        if (yi != "") {
            val = (yi + "亿" + wan + "万");
        } else if (wan != "") {
            val = (wan + "万");
        }
        return val;
    },
    /**
     * @description 分转元
     * @author jeking、classyuan
     * @param {String|Number} val 金额
     * @return {String}
     * @example
     CP.Amount.fen2Yuan('400');//4.00
     * @memberOf CP.Amount
     */
    fen2Yuan: function (val) {
        return (parseFloat(val) / 100).fix(2);
    },
    /**
     * @description 元转分
     * @author jeking、classyuan
     * @param {String|Number} val 金额
     * @return {String}
     * @example
     CP.Amount.yuan2Fen('4');//400
     * @memberOf CP.Amount
     */
    yuan2Fen: function (val) {
        return (parseFloat(val) * 100).fix(0);
    }
};

/**
 * @namespace Loader类
 * @name Loader
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Loader = {
    /**
     * @description 动态加载样式
     * @author jeking、classyuan
     * @param {String} url 需要加载样式的link
     * @example
     CP.Loader.loadCss('http://888.gtimg.com/new_css/qq_caipiao/global.css');
     * @memberOf CP.Loader
     */
    loadCss: function (url) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', url);
        document.getElementsByTagName('head')[0].appendChild(css);
    },
    /**
     *
     */
    /**
     * @description 动态创建并加载iframe(若对象已存在则直接加载)
     * @author jeking、classyuan
     * @param {Object} o 配置对象
     * {
	 *     o.url: {String} iframe地址
	 *     [o.id]: {String/Object} 若id指向的对象存在则不创建
	 *     [o.css]: {String} 样式名
	 *     [o.w]: {Int} iframe宽度
	 *     [o.h]: {Int} iframe高度
	 *     [o.scroll]: {String} scrolling
	 *     [o.fn]: {Function} 回调
	 *     [o.target]: {String/Object} 要插入的父节点(创建iframe或指定的iframe不存在时可指定)
	 * }
     * @example
     CP.Loader.loadFrame({
			id: 'box_iframe',//id
			css: 'box-iframe',//class
			w: 400,//宽
			h: 200,//高
			scroll: o.scroll,//滚动条
			url: 'http://888.qq.com',//链接地址
			fn: function() {//加载完毕回调
				加载完毕
			},
			target: 'box_content_info'//要加入到的id，缺省：body
		});
     * @memberOf CP.Loader
     */
    loadFrame: function (o) {
        var isCeate = (!o.id || jQuery('#' + o.id).length == 0) ? true : false;
        var iframe = isCeate ? jQuery('<iframe></iframe>') : jQuery('#' + o.id);
        if (o.id) iframe.attr('id', o.id);
        if (o.css) iframe.addClass(o.css);
        if (o.w) iframe.width(o.w);
        if (o.h) iframe.height(o.h);
        if (o.scroll) iframe.attr('scrolling', o.scroll);
        iframe.attr('frameborder', '0')
        iframe.attr('frameBorder', 0);
        iframe.attr('src', o.url);
        iframe.bind('load', function () {
            if (typeof o.fn == 'function') o.fn();
            iframe.unbind('load');
            iframe = null;
        })
        if (isCeate) {
            var target = (o.target) ? jQuery('#' + o.target) : jQuery("body");
            target.append(iframe);
        }
    }
};


/**
 * @namespace Box类
 * @name Box
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Box = function () {
    var isIE6 = jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 6;
    var oBox = null;
    var oBoxMask = null;
    var iframeTimer = null;
    var isBoxOpen = false;
    var name = 'CP_Box';
    var closeCallBack = null;
    /** @ignore 初始化Box */
    var init = function () {
        if (oBox) return;
        // box
        var bd = jQuery('body');
        var str = [];
        str.push('<div id="box_inner" class="box">');
        str.push('<a id="box_closer" class="box-closer" href="###" title="关闭">&times;<!--closer--></a>');
        str.push('<div id="box_title" class="box-title"><span id="box_title_main" class="box-title-main"></span></div>');
        str.push('<div id="box_content" class="box-content">');
        str.push('<span id="box_icon" class="box-ico"><!--ico--></span>');
        str.push('<div id="box_content_main">');
        str.push('<div id="box_content_info"></div>');
        str.push('<div id="box_ft" class="box-ft"><span class="box-btn-bt"><a href="#nogo" class="btn-box-ok" id="btn_box_ok"><span>确定</span></a></span><span class="box-btn-bt"><a href="#nogo" class="btn-box-cancel"  id="btn_box_cancel" ><span>取消</span></a></span></div>');
        str.push('</div>');
        str.push('</div>');
        str.push('');
        str.push('<span class="box-tl"></span><span class="box-tr"></span><span id="box_bl" class="box-bl"></span><span id="box_br" class="box-br"></span>');
        str.push('</div>');
        str.push('<div class="box-shadow"></div>');


        str = str.join('');
        oBox = jQuery('<div></div>');
        oBox.attr('id', 'box');
        oBox.attr('class', 'box-outer');
        oBox.html(str);
        bd.append(oBox);
        // mask
        oBoxMask = jQuery('<div></div>');
        oBoxMask.attr('id', 'box_mask');
        oBoxMask.attr('class', 'box-mask');
        if (isIE6) oBoxMask[0].innerHTML = '<iframe frameborder="0" src="about:blank" ></iframe>';
        bd.append(oBoxMask);
    };
    /** @ignore 关闭弹出层 */
    var close = function () {
        if (closeCallBack) {
            closeCallBack();
            closeCallBack = null
        }

        iframeTimer && clearInterval(iframeTimer);
        oBoxMask.hide();
        oBox.hide();
        // 销毁onresize事件
        jQuery(window).unbind('resize');
        if (jQuery.browser.msie) bugFix.sel(true);
        // 销毁ie6 bug fix事件
        if (isIE6) jQuery(window).unbind('scroll');
        isBoxOpen = false;
        return false;
    };
    /**
     * @ignore 设置
     * @param {Object} o 配置
     * @param {String} scene 使用场景
     */
    var setter = function (o, scene) {
        // 设置自定义样式,窗口规范
        var boxMode = ['box-outer'];
        // 是否固定
        if (o.fixed === false) oBox.css('position', 'absolute');
	    //TODO 首先显示，以方便后续获取尺寸
	    oBox.show().css("left","-1200px");
        // 透明度外边框
        var border = 20; // 透明边框+border值:9+1+1+9
        if (o.opacityBorder === false) {
            boxMode.push('box-no-opacity');
            border = 0;
        }
        // 无内边框
        o.chromeless && boxMode.push('box-chromeless');
        // 自定义皮肤
        o.skin && boxMode.push(o.skin);
        // 遮罩透明度
        if (typeof o.opacity == 'undefined') o.opacity = 0.35;
        if (typeof o.w == 'undefined') o.w = 450;
        oBoxMask.css("opacity", o.opacity);
        //oBoxMask.style.filter = 'alpha(opacity = ' + o.opacity * 100 + ')';
        //oBoxMask.style.mozOpacity = oBoxMask.style.khtmlOpacity = oBoxMask.style.opacity = o.opacity;
        // 尺寸
        oBox.width((parseInt(o.w, 10)) + border);
        // 内容
        if (!o.chromeless) {
            setTitle(o.title || '');
            jQuery('#box_title').css('display', 'block');
        } else {
            jQuery('#box_title').css('display', 'none');
        }
        // closer
        o.closer ? jQuery('#box_closer').hide() : jQuery('#box_closer').show();
        switch (scene) {
            case 'text':
                oBox.height(o.h ? (o.h + 'px') : 'auto');
                setContent(o.info);
                o.icon = parseInt(o.icon, 10) || 0;
                if ((o.icon < 1 || o.icon > 5) && (o.icon < 11 || o.icon > 15)) {
                    jQuery('#box_content').removeClass('box-content-forms box-content-forms-small');
                    jQuery('#box_icon').hide();
                    jQuery('#box_content_main').removeClass()
                } else {
                    var $box_content_main = jQuery('#box_content_main');
                    var $box_content_info = jQuery('#box_content_info');
                    var $box_icon = jQuery('#box_icon');
                    var $box_content = jQuery('#box_content');
                    boxMode.push('box-std box-tips'); // 提示类规范(缺省有关闭按钮)
                    if (!o.btns) o.btns = [
                        ['关闭', CP.Box.close]
                    ];
                    var arrIcon = {'1': 'box-ico-ok1', '2': 'box-ico-err1', '3': 'box-ico-warn1', '4': 'box-ico-notice1', '5': 'box-ico-qna1',
                        '11': 'box-ico-ok1', '12': 'box-ico-err1', '13': 'box-ico-warn1', '14': 'box-ico-notice1', '15': 'box-ico-qna1'};
                    $box_icon.show().attr('class', 'box-ico ' + arrIcon[o.icon]);
                    $box_content_main.addClass('box-content-main').width((o.w) - $box_icon.outerWidth(true) - 30)
                    $box_content_info.addClass('box-content-info').html('<div class="vertical"><div class="vertical-content">' + $box_content_info.html() + '</div></div>');
                    $box_content.removeClass('box-content-forms-small');

                    $box_content.addClass('box-content-forms');
                    //if (o.icon >= 11 && o.icon <= 15) {
                        $box_content_main.width((o.w) - $box_icon.outerWidth(true) - 90);
                        $box_content.addClass('box-content-forms-small');
                    //}
                }
                try {
                    o.ofn();//打开后回调
                } catch (e) {
                }
                break;
            case 'frame':
                jQuery('#box_content').removeClass('box-content-forms box-content-forms-small');
                oBox.height('auto');
                jQuery('#box_icon').hide();
                setContent(o);
                break;
        }
        // btns
        if (typeof o.btns == 'object') {
            var btn = jQuery('#box_ft input');
            if (btn.length < 1) {
                btn = jQuery('#box_ft a');
            }
            for (var i = 0; i < 2; i++) {
                if (o.btns[i]) {
                    btn.eq(i).children().text(o.btns[i][0]);
                    btn.eq(i).unbind().click(o.btns[i][1]);
                    btn.eq(i).parent().css('display', 'inline-block');
                } else {
                    btn.eq(i).parent().hide();
                }
            }
            jQuery('#box_ft').show();
        } else {
            jQuery('#box_ft').hide();
        }
        // 绑定closer事件同时为关闭按钮追加事件
        jQuery('#box_closer').click(function () {
            CP.Box.close();
            return false;
        })
        jQuery(oBox).removeClass();
        jQuery(oBox).addClass(boxMode.join(' '));
        show(o);
        if (typeof o.cfn == 'function') {
            closeCallBack = o.cfn;
        } else {
            closeCallBack = null;
        }
    };
    /** @ignore 设置弹出层标题 */
    var setTitle = function (title) {
        jQuery('#box_title_main').html(title || '');
    };
    /** @ignore 在打开的Box中设置内容 */
    var setContent = function (o) {
        if (!o || typeof o == 'string') {
            jQuery('#box_content_main').css("width", "100%");
            jQuery('#box_content_info').html(o||'');
            if (isIE6) bugFix.odd(); // bugFix: ie6基数bug
        } else {
            // 防止ie出现'已释放Script的代码'错误,在iframe加载完成后再释放前一个iframe
            iframeTimer && clearInterval(iframeTimer);
            var oBoxFrame = jQuery('#box_iframe');
            if (oBoxFrame.length == 0) {
                jQuery('#box_content_main').css("width", "100%");
                jQuery('#box_content_info').html('<div id="box_iframe_loading" class="box-loading box-loading-iframe">正在载入...</div><iframe id="box_iframe" frameborder="0" '+(o.chromeless?'allowTransparency="true"':'')+' class="box-iframe" style="display:none;" frameborder="0" src="about:blank"></iframe>');
                oBoxFrame = jQuery('#box_iframe');
            } else {
                jQuery('#box_iframe_loading').show();
            }
            //oBoxFrame.attr('id','box_iframe_tmp');
            oBoxFrame.show().css('visibility', 'hidden');
            if(CP.Box.isOpen()){
                //兼容iframe被关闭后作用域问题
                jQuery('#box_iframe').removeAttr('id','').hide();
            }
            CP.Loader.loadFrame({
                id: 'box_iframe',
                css: 'box-iframe',
                w: o.w2,
                h: o.h,
                scroll: o.scroll,
                url: o.url,
                fn: function () {
                    jQuery('#box_iframe_loading').hide();
                    jQuery('#box_iframe').show().css('visibility', 'visible');
                    try { // 防止fn的引用地址不存在而出现'不能执行已释放Script的代码'错误
                        if (typeof o.fn == 'function') {
                            o.fn();
                        }
                    } catch (e) {
                    }
                    // 局中或偏移标记位
                    jQuery('#box_iframe').attr('data-offset', (typeof o.offset == 'object') ? '1' : '0');
                    // 防止iframe页面渲染时间造成的ie Object required错误
                    setTimeout(function () {
                        resetFrameSize(o.h);
                    }, 0);
                    if (o.monitor && typeof o.h != 'number') frameMonitor();
                    //var iframe = jQuery('#box_iframe_tmp');
                    //iframe.length!=0 && iframe.remove();
                    if (isIE6) bugFix.odd(); // bugFix: ie6基数bug
                },
                target: 'box_content_info'
            });
        }
    };
    /** @ignore 偏移 */
    var offset = function (x, y) {
        var oBoxFrame = jQuery('#box_iframe');
        if (oBoxFrame) {
            oBoxFrame.attr('data-offset', '1');
            //oBoxFrame.setAttribute('data-offset', '1');
        }
        if (x == 'auto' && y == 'auto') {
            center();
        } else if (x == 'auto' && y != 'auto') {
            var arrObjSize = CP.Size.getObjSize(oBox);
            oBox.css('left', '50%');
            oBox.css('top', '0');
            oBox.css('margin-left', -arrObjSize[0] / 2 + 'px');
            oBox.css('margin-top', y + 'px');
        } else if (x != 'auto' && y == 'auto') {
            var arrObjSize = CP.Size.getObjSize(oBox);
            var arrScrollSize = CP.Size.getScrollSize();
            oBox.css('left', '0');
            oBox.css('top', '50%');
            oBox.css('margin-left', x + 'px');
            oBox.css('margin-top', -arrObjSize[1] / 2 + (isIE6 ? arrScrollSize[1] : 0) + 'px');
        } else {
            oBox.css('left', '0');
            oBox.css('top', '0');
            oBox.css('margin-left', x + 'px');
            oBox.css('margin-top', y + 'px');
        }
    };
    /** @ignore 居中 */
    var center = function () {
        var oBoxFrame = jQuery('#box_iframe');
        if (oBoxFrame) {
            oBoxFrame.attr('data-offset', '0');
        }
        var arrPageSize = CP.Size.getWinSize();
        oBoxMask.width(arrPageSize[0]);
        oBoxMask.height(arrPageSize[1]);
        var arrObjSize = CP.Size.getObjSize(oBox);
        var arrScrollSize = CP.Size.getScrollSize();

        oBox.css('left', '50%');
        oBox.css('top', '50%');
        oBox.css('margin-left', -arrObjSize[0] / 2 + 'px');
        oBox.css('margin-top', -arrObjSize[1] / 2 + (isIE6 ? arrScrollSize[1] : 0) + 'px');
    };
    /** @ignore 重设iframe高度 */
    var resetFrameSize = function (h) {
        var oBoxFrame = jQuery('#box_iframe');
        if (oBoxFrame.length == 0) return;
        if (typeof h == 'number') {
            oBoxFrame.css('height', h + 'px');
        } else {
            oBoxFrame.css('height', 'auto');
            try { // 防止跨域访问
                var arrFrameSize = CP.Size.getFrameSize(oBoxFrame);
                oBoxFrame.height(arrFrameSize[1]);
            } catch (e) {
            }
        }
        if (isIE6) oBox.addClass(oBox.attr('class')); // bugFix: ie6渲染bug
        // 局中或偏移,偏移时不作处理
        if (oBoxFrame.attr('data-offset') === '0') {
            center();
        }
    };
    /** @ignore 检测本页面是否被iframe */
    var isIframePage = function () {
        try {
            if (self.frameElement.tagName == "IFRAME") {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false
        }
    }
    /** @ignore 监控iframe尺寸变化(定义了高度时无效) */
    var frameMonitor = function () {
        iframeTimer = setInterval(function () {
            resetFrameSize();
        }, 500);
    };
    /**
     * @ignore 显示
     * @param {Object} o 配置
     */
    var show = function (o) {
        isBoxOpen && close();// 销毁上次打开的Box
        oBoxMask.show();
        oBox.show().css("visibility","visible");
        //CP.Util.show([oBoxMask, oBox]);
        // 局中或偏移
        if (o.offset instanceof Array) {
            offset(o.offset[0], o.offset[1]);
        } else {
            center();
        }
        jQuery(window).bind('resize', resize)
        if (jQuery.browser.msie) bugFix.sel();
        // ie6 bug fix
        if (isIE6 && o.fixed !== false) jQuery(window).bind('scroll', bugFix.fixed);
        isBoxOpen = true;
        return false;
    };
    /** @ignore mask reset */
    var resize = function () {
        var arrScrollSize = CP.Size.getScrollSize();
        var arrWinSize = CP.Size.getWinSize();
        if (isIE6)arrWinSize[1] += 21;
        oBoxMask.width(arrWinSize[0]);
        //oBoxMask.height((arrScrollSize[3] > 0) ? (arrWinSize[1] + arrScrollSize[3]) : arrWinSize[1]);
        oBoxMask.height(arrWinSize[1]);
        oBoxMask.children("iframe").css({'width': arrWinSize[0] + 'px', 'height': arrWinSize[1] + 'px'})
    };
    /** @ignore bug fix */
    var bugFix = {
        /*
         * 修复滚动时select闪烁问题
         * @param {Boolean} [undo:false] 是否撤销
         */
        sel: function (undo) {
            /*var oSel = document.getElementsByTagName('select');
             var fun = undo ? CP.Util.show : CP.Util.hide;
             for (var i = 0; i < oSel.length; i++) {
             fun(oSel[i], true);
             }*/
        },
        // ie6 fixed问题
        fixed: function () {
            var arrObjSize = CP.Size.getObjSize(oBox);
            var arrScrollSize = CP.Size.getScrollSize();
            oBox.css('margin-top', -arrObjSize[1] / 2 + arrScrollSize[1] + 'px');
        },
        // ie6 基数定位bug
        odd: function () {
            var objInner = '#box_inner';
            var objInnerSize = CP.Size.getObjSize(objInner);
            jQuery('#box_bl,#box_br').css('bottom', objInnerSize[1] % 2 != 0 ? '-2px' : '-1px');
        }
    };


    /* @lends CP.Box */
    return {
        /**
         * 返回当前Box的name
         * @return {String}
         * @example CP.Box.name() 返回box的id
         */
        name: function () {
            return name;
        },
        /**
         * 当前Box是否处于打开状态
         * @return {Boolean}
         */
        /**
         * 当前Box是否处于打开状态
         * @return {Boolean} true|false
         * @example CP.Box.isOpen() 返回box的id
         */
        isOpen: function () {
            return isBoxOpen;
        },
        /**
         * 返回Box内部对象引用
         * @return {Object} {'box':obj1, 'boxFrame':obj2, 'boxCloser':obj3}
         */
        obj: function () {
            return {
                'box': oBox,
                'boxFrame': jQuery('#box_iframe')[0],
                'boxCloser': jQuery('#box_closer')[0]
            };
        },
        /**
         * @description 普通弹出层
         * @author jeking、classyuan
         * @param {Object} o 配置
         * {
		 *     [w:450]: 300, // 宽度
		 *     [h:auto]: 200, // 此处设置的是box的整体高度
		 *     [offset:null]: [x, y], // XY轴偏移量,此时不局中; 为auto时局中偏移
		 *     [name:CP_Box]: '', // 弹层名称
		 *     [fixed:true]: false, // 是否固定
		 *     [opacity:0.7]: 0.5, // 遮罩透明度
		 *     [opacityBorder:true]: false, // 是否显示透明度边框
		 *     [skin:'']: 'new', // 皮肤
		 *     [chromeless:false]: true, //无边框
		 *     [title:'']: '提示', // 标题
		 *     info: '提示内容', // 内容
		 *     [icon:false]: 1, // icon; 可选值: 1,2,3,4,5; 对应['ok', 'err', 'warn', 'notice', 'qna']
		 *     [btns:false]: [['是', function(){}], ['否', function(){}]], // 自定义按钮事件
		 *     [closer:false]: true, // 是否隐藏关闭按钮
		 *     [cfn:null]: function() {} // 追加关闭按钮事件
		 * }
         * @example
         //普通弹出层直接添加html
         CP.Box.text({
		      info: '<div>你好吗？</div>'// 内容
		  	});
         * @example
         //有icon的弹出层四种icon选择
         CP.Box.text({
		      info: '<div>你好吗？</div>', // 内容
			  icon:1 //有icon的弹出层
		  	});
         * @example
         //高级弹出层
         CP.Box.text({
		      info: '<div>你好吗？</div>', // 内容
			  btns：[
			  	['确定',function(){
					alert("点击确定");
				}],
				['取消',function(){
					CP.Box.close();//关闭弹出层
				}]
			  ],cfn:function(){
				  	alert('浮层已经关闭你想执行其他函数吗？');
			  }
		  	});
         * @memberOf  CP.Box
         */
        text: function (o) {
            init();
            setter(o, 'text');
            name = o.name || 'CP_Box';//调整为回调后执行赋值
        },
        /**
         * @description iframe弹出层
         * @author jeking、classyuan
         * @author jeking、classyuan
         * @param {Object} o 配置
         * {
		 *     [w:476]: 300, // 宽度
		 *     [w2:auto]: 200, // 此处设置的是iframe的宽度,缺省100%自适应
		 *     [offset:null]: [x, y], // XY轴偏移量,此时不局中; 为auto时局中偏移
		 *     [name:CP_Box]: '', // 弹层名称
		 *     [h:auto]: 200, // 此处设置的是iframe的高度
		 *     [fixed:true]: false, // 是否固定
		 *     [login:false]: true, // 是否需要验证登录态
		 *     [opacity:0.7]: 0.5, // 遮罩透明度
		 *     [opacityBorder:true]: false, // 透明度边框
		 *     [skin:'']: 'new', // 皮肤
		 *     [chromeless:false]: true, // 无边框
		 *     [scroll:'']: 'no', // scrolling
		 *     [monitor:false]: true, // 监控iframe高度变化
		 *     [title:'']: '提示', // 标题
		 *     url: url, // iframe地址
		 *     [fn:null]: function() {}, // iframe加载完成回调
		 *     [closer:false]: true, // 是否隐藏关闭按钮
		 *     [cfn:null]: function() {} // 追加关闭按钮事件
		 * }
         * @example
         //iframe加载弹出层
         CP.Box.frame({
                w     : 500,
                h     : 200,
                title : '支付成功',
                url   : 'http://caipiao.tenpay.com/v1.0/buy/result.shtml'
            });
         * @example
         //iframe加载弹出层
         CP.Box.frame({
                title : '支付成功',
                url   : 'http://caipiao.tenpay.com/v1.0/buy/result.shtml',
				fn    : function(){alert("加载完毕")},
				cfn   : function(){alert("浮层已经关闭你想执行其他函数吗？")}
            });
         *
         */
        frame: function (o) {
            if (o.login) {
                CP.TopWin.CP.User.checkLogin(function () {
                    CP.TopWin.CP.Box.frame(o);
                });
            } else {
                init();
                setter(o, 'frame');
            }
            name = o.name || 'CP_Box';//调整为回调后执行赋值
        },
        //
        isIframePage: isIframePage,
        /**
         * 偏移
         * @function
         */
        offset: offset,
        /**
         * 局中
         * @function
         */
        center: center,
        /**
         * 重设iframe尺寸
         * @function
         */
        resetFrameSize: resetFrameSize,
        /**
         * @description更改标题
         * @function
         */
        setTitle: setTitle,
        /**
         * 在打开的Box中设置内容
         * @function
         * @param {String|Object} o 为String则设置文本内容; 为Object则设置iframe内容
         * @example
         * setContent('box');
         * setContent({
		 *     url: url,
		 *     monitor: true,
		 *     fn: function() {}
		 * });
         */
        setContent: setContent,
        /**
         * 关闭
         * @function
         */
        close: close,
        //报错消息弹出框
        showErrBox: function (_msg, _fn, _name) {
            CP.TopWin.CP.Box.text({
                w: 470,
                title: '温馨提示',
                icon: 3,
                name: _name || 'CP_Box',
                info: _msg,
                btns: [
                    ["关闭", function () {
                        CP.TopWin.CP.Box.close();
                        _fn && _fn();
                    }]
                ],
                cfn: _fn || function () {
                }
            });
        },
        //报错消息弹出框小icon
        showErrBoxs: function (_msg, _fn, _name) {
            CP.TopWin.CP.Box.text({
                w: 470,
                title: '温馨提示',
                icon: 13,
                name: _name || 'CP_Box',
                info: _msg,
                btns: [
                    ["关闭", function () {
                        CP.TopWin.CP.Box.close();
                        _fn && _fn();
                    }]
                ],
                cfn: _fn || function () {
                }
            });
        },
        //confirm类型
        showConfirm1: function (_msg, _fn) {
            CP.TopWin.CP.Box.text({
                w: 470,
                title: '温馨提示',
                info: _msg,
                icon: 4,
                btns: [
                    ["确定", function () {
                        CP.TopWin.CP.Box.close();
                        _fn.call(null);
                    }],
                    ["取消", function () {
                        CP.TopWin.CP.Box.close();
                    }]
                ],
                cfn: function () {
                }
            });
        },
        //confirm类型
        showConfirm: function (_msg, _fn) {
            CP.TopWin.CP.Box.text({
                w: 470,
                title: '温馨提示',
                info: _msg,
                icon: 3,
                btns: [
                    ["确定", function () {
                        CP.TopWin.CP.Box.close();
                        _fn.call(null);
                    }],
                    ["取消", function () {
                        CP.TopWin.CP.Box.close();
                    }]
                ],
                cfn: function () {
                }
            });
        }

    };
}();


/**
 * @namespace 校验
 * @example
 * CP.Validator.test('校验规则名称', val)
 */
CP.Validator = function () {
    // 校验规则(支持正则与函数)
    var pattern = {
        // 是否QQ号
        qq: /^[1-9]\d{4,10}$/,
        // 是否EMail
        email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/,
        // 是否验证码
        vcode: /^[a-z0-9]{4}$/i, // /^[!a-z0-9]{4}$/i
        // 是否手机验证码(6位数字)
        mobileVCode: /^\d{6}$/,
        // 是否手机
        mobile: /^1[0-9]{10}$/,
        // 是否中文
        chinese: /^[\u4e00-\u9fa5]+$/
    };
    return {
        /**
         * 执行校验
         * @param {String} p 校验规则名称(可选值:qq/email/vcode/mobileVCode/mobile/chinese)
         * @param {String} v 表单值
         * @return {Boolean}
         */
        test: function (p, v) {
            var fn = pattern[p];
            if (!fn) return false;
            return (typeof fn == 'object') ? fn.test(v) : fn(v);
        }
    };
}();

/**
 * @namespace 时间函数
 * @name Date
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Date = {
    /**
     * @description 格式化日期文本为日期对象
     * @author jeking、classyuan
     * @param {String} date 文本日期
     * @param {String} [pattern:%Y-%M-%d %h:%m:%s] 文本日期的格式
     * @return {Date}
     * @example CP.Date.format('2012-07-17 03:20:30','%Y-%M-%d %h:%m:%s')
     * @memberOf CP.Date
     */    format: function (date, pattern) {
        pattern = pattern || '%Y-%M-%d %h:%m:%s';
        pattern = pattern.replace(/\-/g, '\\-');
        pattern = pattern.replace(/\|/g, '\\|');
        pattern = pattern.replace(/\./g, '\\.');
        pattern = pattern.replace('%Y', '(\\d{4})');
        pattern = pattern.replace('%M', '(\\d{1,2})');
        pattern = pattern.replace('%d', '(\\d{1,2})');
        pattern = pattern.replace('%h', '(\\d{1,2})');
        pattern = pattern.replace('%m', '(\\d{1,2})');
        pattern = pattern.replace('%s', '(\\d{1,2})');
        var regExp = new RegExp('^' + pattern + '$');
        var group = regExp.exec(date);
        var Y = (group[1] || 0) - 0;
        var M = (group[2] || 1) - 1;
        var d = (group[3] || 0) - 0;
        var h = (group[4] || 0) - 0;
        var m = (group[5] || 0) - 0;
        var s = (group[6] || 0) - 0;
        return new Date(Y, M, d, h, m, s);
    }
};
/**
 * @namespace Size类主要获取尺寸
 * @name Size
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Size = {
    /**
     * @description 获取dom实际宽高尺寸包括隐藏的高度overflow:hidden
     * @author jeking、classyuan
     * @param {String} id dom对象
     * @return {Array} [width, height]
     * @example CP.Size.getObjSize()
     * @memberOf CP.Size
     */
    getObjSize: function (id) {
        var obj = jQuery(id)[0];
        return [obj.offsetWidth, obj.offsetHeight];
    },
    /**
     * @description 获取页面实际尺寸
     * @author jeking、classyuan
     * @return {Array} [width, height]
     * @example CP.Size.getPageSize()
     * @memberOf CP.Size
     */
    getPageSize: function () {
        var oHtml = jQuery('html')[0];
        return [oHtml.scrollWidth, oHtml.scrollHeight];
    },
    /**
     * @description 获取窗口可视尺寸
     * @author jeking、classyuan
     * @return {Array} [width, height]
     * @example CP.Size.getWinSize()
     * @memberOf CP.Size
     */
    getWinSize: function () {
        var winX = document.documentElement.clientWidth || window.innerWidth;
        var winY = document.documentElement.clientHeight || window.innerHeight;
        return [winX, winY];
    },
    /**
     * @description 获取窗口滚动尺寸
     * @author jeking、classyuan
     * @return {Array} [水平向左, 垂直向上, 水平all, 垂直all]
     * @example CP.Size.getScrollSize()
     * @memberOf CP.Size
     */
    getScrollSize: function () {
        var arrScrollSize = [];
        arrScrollSize[0] = window.pageXOffset || document.documentElement.scrollLeft;
        arrScrollSize[1] = window.pageYOffset || document.documentElement.scrollTop;
        var arrPageSize = this.getPageSize();
        var arrWinSize = this.getWinSize();
        arrScrollSize[2] = arrPageSize[0] - arrWinSize[0];
        arrScrollSize[3] = arrPageSize[1] - arrWinSize[1];
        arrScrollSize[2] = (arrScrollSize[2] > 0) ? Math.abs(arrScrollSize[2]) : 0;
        arrScrollSize[3] = (arrScrollSize[3] > 0) ? Math.abs(arrScrollSize[3]) : 0;
        return arrScrollSize;
    },
    /**
     * @description 获取iframe尺寸
     * @author jeking、classyuan
     * @param {String|Object} id dom对象
     * @return {Array} [width, height]
     * @example CP.Size.getFrameSize()
     * @memberOf CP.Size
     */
    getFrameSize: function (id) {
        var obj = jQuery(id)[0];
        var w = obj.contentWindow.document.body.scrollWidth;
        var iHeight1 = obj.contentWindow.document.body.scrollHeight;
        var iHeight2 = obj.contentWindow.document.documentElement.scrollHeight;
        var iBodyHeight = obj.contentWindow.document.getElementsByTagName('body')[0].offsetHeight;
        var iHtmlHeight = obj.contentWindow.document.getElementsByTagName('html')[0].offsetHeight;
        var h = Math.max(Math.max(iHeight1, iHeight2), Math.max(iBodyHeight, iHtmlHeight));
        h += 2; // MSIE 2px 文档边框值(IE6下存在), 由于MSIE并没有0,0的文档起始位置，因此通常会设置2px的边框在周围
        return [w, h];
    },
    /**
     * @description 获取元素坐标
     * @author jeking、classyuan
     * @param {String|Object} id dom对象
     * @return {Array} [x, y]
     * @example CP.Size.getObjPosition()
     * @memberOf CP.Size
     */
    getObjPosition: function (id) {
        var obj = jQuery(id)[0];
        var x = obj.offsetLeft, y = obj.offsetTop;
        while (obj = obj.offsetParent) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
        }
        return [x, y];
    }
};


/**
 * @namespace 用户模块类
 * @name User
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.User = {
    /**
     * @description 保存用户信息（用户名、头像、余额、待开奖方案数、站内信条数、身份证、注册日期等）
     * @author jeking、classyuan
     * @return {Object}
     {
		 "uid":"1000000345",//用户id
		 "nickName":"classyuan",//用户名
		 "balance":4999720,//余额
		 "serverTime":1351156987,//服务器时间
		 "createTime":1348135163,//注册时间
		 "idcard":"440301198711204917",//身份证
		 "user_img":"http:\/\/bbs3.bocaiwawa.com\/uc_server\/images\/noavatar_middle.gif",//头像地址
		 "no_bonus_num":"0"//待开奖方案
	 }
     * @example CP.User.info
     * @memberOf CP.User
     */
    info: null,
    /**
     * @description 是否登录
     * @author jeking、classyuan
     * @return {Boolean}
     * @example CP.User.isLogin()
     * @memberOf CP.User
     */
    isLogin: function () {
        if (CP.Cookie.get('userinfo') != '') {
            return true;
        } else {
//			CP.User.logout();
            return false;
        }
    },
    /**
     * @description 退出登录
     * @author jeking、classyuan
     * @param {String} [url] 跳转的地址, 缺省刷新当前页面; 当url为false时不跳转
     * @example CP.User.logout()
     * @memberOf CP.User
     */
    logout: function (url) {
        var u;
        jQuery.ajax({
            url: "/my/login/ajax_logout.php",
            cache: false,
            async: false
        })
        CP.User.balance = -1;
        CP.User.info = null;
        CP.Cookie.del('luin');
        CP.Cookie.del('cp_nickname');
        CP.Cookie.del('uin'); // 快速登录cookie
        CP.Cookie.del('skey');
        CP.Cookie.del('cp_nickname');
        if (url !== false) {
            u = (typeof url == 'string') ? url : window.location.pathname + window.location.search;
            window.location.href = u;
        }
        return false;
    },
    /**
     * @description 获取session
     * @author jeking、classyuan
     * @return {Object}
     {
			'skey': skey,
			'uin': uin,
			'ckey': clientkey,
			'cuin': clientuin,
			'qltn': qltn,
			'qqnick': qqnick,
			'_uin': _uin,
			'_key': _key,
			'cpnick': cpNickname
	 }
     * @example CP.User.getSession()
     * @memberOf CP.User
     */
    getSession: function () {
        var skey = CP.Cookie.get('skey') || CP.Util.getPara('skey') || null;
        var uin = CP.Cookie.get('uin') || CP.Util.getPara('uin') || null;
        var clientkey = CP.Util.getPara('clientkey') || null;
        var clientuin = CP.Util.getPara('clientuin') || null;
        var qqnick = CP.Cookie.get('cp_nickname') || null;
        var _uin = clientuin || uin || null;
        var _key = clientkey || null;
        CP.User.info.qq = uin && parseInt(uin.replace(/\D/g, ''), 10) || null;
        return {
            'skey': skey,
            'qq': uin,
            'nickname': qqnick,
            'clientuin': _uin,
            'clientkey': _key
        };
    },
    /**
     * @description 是否彩票用户
     * @author jeking、classyuan
     * @return {Boolean} true&false
     * @example CP.User.isCPUser()
     * @memberOf CP.User
     */
    isCPUser: function () {
        var rc = -1;
        jQuery.ajax({
            type: 'POST',
            url: '/my/login/login.php?scallback=1&scene=web',
            cache: false,
            async: false,
            data: {ajax_check: 1},
            dataType: 'json',
            success: function (json) {
                rc = Number(json.retcode);
            }
        });
        return rc;
    },
    /**
     * @description 检测是否登录
     * @param {Function} fn 回调成功回调
     * @param {String} bctag 回调成功回调
     * @example CP.User.checkLogin();
     * @memberOf CP.User
     */
    checkLogin: function (fn, bctag) {
        if (CP.User.isLogin()) {
            typeof(fn) == 'function' && fn();
        } else {
            CP.User.showLogin({
                successCallback: function () {
                    typeof(fn) == 'function' && fn();
                },
                bctag: bctag || null
            })
        }
    },
    /**
     * @description 弹出层登录
     * @param {Object} opt
     *     {
	 *         {Function} [successCallback]: function, // 成功回调
	 *         {Boolean} [closer:false]: true, // true时若点击关闭按钮则检测是否为彩票用户,为否则跳回彩票首页
	 *     }
     * @example CP.User.showLogin();
     * @memberOf CP.User
     */
    showLogin: function (opt) {
        opt = opt || {};
        /** @ignore */
        CP.TopWin._G_LOGINMOD_CALLBACK = function (json) {
            CP.TopWin.CP.Box.close();
            var rc = parseInt(json.retcode, 10);
            switch (rc) {
                case 0://登录成功
                    //获取用户信息
                    CP.User.getUserInfo({
                        successCallback: function () {
                            CP.Cookie.set('cp_nickname', CP.Cookie.get('userinfo'), null, null, 0.5);
                            fire_G_CP_LOGIN_CALLBACK();
                            if (typeof opt.successCallback == 'function') {
                                opt.successCallback();
                            }
                        }
                    });
                    break;
                case 1://没有注册
                    if (typeof(opt.successHandler) === 'function') {
                        opt.successHandler();
                    } else {
                        CP.User.showReg(opt);
                    }
                    break;
                case -1://登录失败
                    CP.User.logout();
                    break;

            }
        };
        var _url = '';
        if (document.domain == 'qq.com') {
            _url = '/v1.0/inc/mod_login.html'
        } else {
            _url = '/my/pubprocess/load_info.php?type=quick_login&scene=web'
        }
        CP.TopWin.CP.Box.frame({
            w: 400,
            scroll: 'no',
            title: '用户登录',
            url: _url,
            monitor: true,
            cfn: function () {
                if (opt.closer === 'reload') {
                    CP.TopWin.location.replace('http://' + window.location.host);
                } else if (!!opt.closer) {
                    CP.TopWin.location.replace(opt.closer);
                }
            }
        });
        return false;
    },
    /**
     * @description 已登陆QQ,未注册彩票用户
     * @example CP.User.showReg();
     * @memberOf CP.User
     */
    showReg: function (opt) {
        opt = opt || {};
        var vars = opt.scene || 'web';
        var url = '/my/login/login.php?scallback=1&quick_reg=1&bc_tag=' + (opt.bctag || '') + '&channel=' + encodeURIComponent(CP.Channel.get()) + '&scene=' + vars;
        /** @ignore */
        CP.TopWin._G_ACTIVE_SUCCESS = function () {
            CP.TopWin.CP.Box.close();
            // 自定义回调;
            CP.User.getUserInfo({
                successCallback: function () {
                    CP.Cookie.set('cp_nickname', CP.Cookie.get('userinfo'), null, null, 0.5);
                    fire_G_CP_LOGIN_CALLBACK();
                    if (typeof opt.successCallback == 'function') {
                        opt.successCallback();
                    }
                }
            });//获取用户信息
        };

        CP.TopWin.CP.Box.frame({
            w: 470,
            scroll: 'no',
            title: '激活QQ彩票',
            url: url,
            monitor: true,
            cfn: function () {
                /*if (!CP.User.isCPUser()) {
                 CP.TopWin.location.reload();
                 }*/
            }
        });
        return false;

    },
    /**
     * @description 获取彩票用户信息
     * @param {Object} opt
     *     {
	 *         successCallback: function, // 回调, 接收json参数
	 *         errorCallback:function, //回调，失败
	 *         param: false, // 查询待开奖方案&站内信数据
	 *     }
     * @example CP.User.getUserInfo(opt);
     * @memberOf CP.User
     */
    getUserInfo: function (opt) {
        var jsonObj = 'JSON_G_GET_USERINFO_' + (+new Date()),
            url = '/my/login/get_userinfo.php?jsonp=' + jsonObj;
        if (!!opt.param) {
            url += '&' + opt.param;//'level=2' | 'level=3'
        }
        jQuery.getScript(url, function () {
            var json = window[jsonObj];
            var rc = parseInt(json.retcode, 10);
            switch (rc) {
                case 0:
                    CP.User.info = json;
                    CP.User.info.balance = CP.User.balance = Number(json.balance);
                    CP.User.info.qq = parseInt(CP.Cookie.get('uin').replace(/\D/, ''), 10);
                    if (typeof opt.successCallback == 'function') {
                        opt.successCallback();
                    }
                    break;
                default:
                    CP.User.info = null;
                    if (typeof opt.errorCallback == 'function') {
                        opt.errorCallback();
                    }
                    break;
            }
        });
    },
    /**
     * @description 获取余额并回调
     * @author jeking、classyuan
     * @param {Function} [fn] 回调函数
     * @example CP.User.getBalance()
     * @memberOf CP.User
     */
    getBalance: function (fn) {
        var url = '/my/login/get_userinfo.php?jsonp=JSON_G_BALANCE';
        jQuery.getScript(url, function () {
            var json = JSON_G_BALANCE;
            var rc = parseInt(json.retcode, 10);
            if (rc == 0) {
                var balance = json.balance;
                CP.User.balance = balance;
                if (typeof fn == 'function') {
                    fn(balance);
                }
            } else if (rc == -1) {
                CP.User.showLogin({successCallback: fn})
            } else {
                CP.Box.text({
                    icon: 3,
                    title: '提示',
                    info: '获取余额失败'
                });
            }
            JSON_G_BALANCE = null;
        });
    },
    /**
     * 用户余额(元)
     */
    balance: -1,
    /**
     * 用户手机
     */
    mobile: false
};

/**
 * @namespace 返回应用的最顶层窗口
 */
CP.TopWin = function () {
    var win = window;
    try {
        while (win.parent && win.parent != win && win.parent.CP) {
            win = win.parent;
        }
    } catch (e) {
    }
    return win;
}();
/**
 * 注册全局回调接口
 * @description:
 *     1) 回调必须注册到应用顶层(CP.TopWin)
 *     2) 必须以push方式注册
 *     3) CP.TopWin.G_LOGIN_CALLBACK: 全局登录回调; 由未登录到登录成功后触发, 已登陆的不触发(因为已登录的时候, 接口注册晚于执行)
 */
CP.TopWin.G_LOGIN_CALLBACK = (typeof CP.TopWin.G_LOGIN_CALLBACK != 'undefined') ? [].concat(CP.TopWin.G_LOGIN_CALLBACK) : [];

var fire_G_CP_LOGIN_CALLBACK = function () {
    for (var i = 0, len = CP.TopWin.G_LOGIN_CALLBACK.length; i < len; i++) {
        try{
	        CP.TopWin.G_LOGIN_CALLBACK[i]();
        }catch(e){}
    }
    //CP.TopWin.G_LOGIN_CALLBACK = [];
};
/**
 * @namespace 彩种相关
 */
CP.Category = function () {
    // 彩种配置

    // 【投注格式format标识说明】: 若需转义,以对象形式定义即可
    // code: 号码
    // betWay: 投注方式文本
    // betWayFlag: 投注方式标识
    // play: 玩法文本
    // playFlag: 玩法标识
    // multi: 倍数
    // addto: 追加
    var category = {
        'ssq': {
            name: '双色球',
            format: 'code|betWay|multi', // 投注格式
            betWay: { // 投注方式映射
                '1': '单式',
                '2': '复式',
                '3': '胆拖'
            }
        },
        'dlt': {
            name: '大乐透',
            format: 'code|betWay|multi', // 投注格式
            betWay: { // 投注方式映射
                '1': '单式',
                '2': '复式',
                '3': '胆拖'
            }
        },
        'pl3': {
            name: '排列三',
            format: 'code|betWay|multi',
            betWay: {
                '1': '直选单式',
                '2': '直选复式',
                '3': '直选和值',
                '4': '组三单式',
                '5': '组三复式',
                '6': '组三和值',
                '7': '组六单式',
                '8': '组六复式',
                '9': '组六和值'
            }
        },
        'pl5': {
            name: '排列五',
            format: 'code|betWay|multi',
            betWay: {
                '1': '单式',
                '2': '复式'
            }
        },
        'fc3d': {
            name: '福彩3D',
            format: 'code|play|betWay|multi',
            play: {
                '1': '直选',
                '2': '组三',
                '3': '组六'
            },
            betWay: {
                '1': '单式',
                '2': '复式',
                '3': '包号',
                '4': '和值'
            }
        },
        'qlc': {
            name: '七乐彩',
            format: 'code|betWay|multi',
            betWay: {
                '1': '单式',
                '2': '复式'
            }
        },
        'qxc': {
            name: '七星彩',
            format: 'code|betWay|multi',
            betWay: {
                '1': '单式',
                '2': '复式'
            }
        },
        'exw': {
            name: '22选5',
            format: 'code|betWay|multi',
            betWay: {
                '1': '单式',
                '2': '复式'
            }
        },
        // 竞彩: 日期|周数|场次|注码|胆码-日期|周数|场次|注码|胆码$倍数$过关方式
        'jclq': {
            name: '竞彩篮球',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'jczq': {
            name: '竞彩足球',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'sfc': {
            name: '胜负彩',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'r9': {
            name: '任选九场',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'bd': {
            name: '北京单场',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'jq': {
            name: '四场进球',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        'bq': {
            name: '六场半全',
            format: 'gameDay|weekID|teamID|code|codeD$multi$passType'
        },
        /*[[快频*/
        'kl8': {
            name: '快乐8',
            format: 'code|betWay|multi',
            betWay: {
                'R1': '任选一',
                'R2': '任选二',
                'R3': '任选三',
                'R4': '任选四',
                'R5': '任选五',
                'R6': '任选六',
                'R7': '任选七',
                'R8': '任选八',
                'R9': '任选九',
                'RA': '任选十'
            }
        },
        'k3': {
            name: '快3',//江苏
            format: 'code|betWay|multi',
            betWay: {
                'HZ': '和值',
                '3A': '三同号通选',
                '3B': '三同号单选',
                '3C': '三不同号',
                '3D': '三连号通选',
                '2A': '二同号复选',
                '2B': '二同号单选',
                '2C': '二不同号'
            }
        },
        'ek3': {
            name: '新快3',//湖北
            format: 'code|betWay|multi',
            betWay: {
                'HZ': '和值',
                '3A': '三同号通选',
                '3B': '三同号单选',
                '3C': '三不同号',
                '3D': '三连号通选',
                '2A': '二同号复选',
                '2B': '二同号单选',
                '2C': '二不同号'
            }
        },
        'jk3': {
            name: '新快3',//吉林
            format: 'code|betWay|multi',
            betWay: {
                'HZ': '和值',
                '3A': '三同号通选',
                '3B': '三同号单选',
                '3C': '三不同号',
                '3D': '三连号通选',
                '2A': '二同号复选',
                '2B': '二同号单选',
                '2C': '二不同号'
            }
        },
        'gdx': {
            name: '新11选5',
            format: 'code|betWay|multi',
            betWay: {
                'R1': '前一',
                'R2': '任选二',
                'R3': '任选三',
                'R4': '任选四',
                'R5': '任选五',
                'R6': '任选六',
                'R7': '任选七',
                'R8': '任选八',
                'Q2': '前二直选',
                'Q3': '前三直选',
                'Z2': '前二组选',
                'Z3': '前三组选',
                'R2dt': '任选二胆拖',
                'R3dt': '任选三胆拖',
                'R4dt': '任选四胆拖',
                'R5dt': '任选五胆拖',
                'R6dt': '任选六胆拖',
                'R7dt': '任选七胆拖',
                'Z2dt': '前二组胆拖',
                'Z3dt': '前三组胆拖'
            }
        },
        'dlc': {
            name: '11选5',
            format: 'code|betWay|multi',
            betWay: {
                'R1': '前一',
                'R2': '任选二',
                'R3': '任选三',
                'R4': '任选四',
                'R5': '任选五',
                'R6': '任选六',
                'R7': '任选七',
                'R8': '任选八',
                'Q2': '前二直选',
                'Q3': '前三直选',
                'Z2': '前二组选',
                'Z3': '前三组选',
                'R2dt': '任选二胆拖',
                'R3dt': '任选三胆拖',
                'R4dt': '任选四胆拖',
                'R5dt': '任选五胆拖',
                'R6dt': '任选六胆拖',
                'R7dt': '任选七胆拖',
                'Z2dt': '前二组胆拖',
                'Z3dt': '前三组胆拖'
            }
        },
        'syy': {
            name: '十一运夺金',
            format: 'code|betWay|multi',
            betWay: {
                'R1': '前一',
                'R2': '任选二',
                'R3': '任选三',
                'R4': '任选四',
                'R5': '任选五',
                'R6': '任选六',
                'R7': '任选七',
                'R8': '任选八',
                'Q2': '前二直选',
                'Q3': '前三直选',
                'Z2': '前二组选',
                'Z3': '前三组选',
                'R2dt': '任选二胆拖',
                'R3dt': '任选三胆拖',
                'R4dt': '任选四胆拖',
                'R5dt': '任选五胆拖',
                'R6dt': '任选六胆拖',
                'R7dt': '任选七胆拖',
                'Z2dt': '前二组胆拖',
                'Z3dt': '前三组胆拖'

            }
        },
        'gkl': {
            name: '快乐10分',
            format: 'code|betWay|multi',
            betWay: {
                'A1': '选一红投',
                'F1': '选一数投',
                'R2': '任选二',
                'R3': '任选三',
                'R4': '任选四',
                'R5': '任选五',
                'B2': '选二连组',
                'B3': '选三前组',
                'R2dt': '任选二胆拖',
                'R3dt': '任选三胆拖',
                'R4dt': '任选四胆拖',
                'R5dt': '任选五胆拖',
                'B2dt': '选二连组胆拖',
                'B3dt': '选三前组胆拖'
            }
        },
        'ssc': {
            name: '老时时彩',
            format: 'code|betWay|multi',
            betWay: {
                '100': '选一红投复式'
            }
        },
        'jxssc': {
            name: '新时时彩',
            format: 'code|betWay|multi',
            betWay: {
                '100': '选一红投复式'
            }
        }
        /*]]快频*/
    };
    /**
     * 获取配置信息(取不到时返回空)
     * @param {String} [type] 彩种类型
     * @param {String} [name] 配置名称,缺省时返回整个配置信息
     * @return {*}
     */
    var getConf = function (type, name) {
        if (typeof type == 'undefined') {
            return category;
        } else {
            type = type.toLowerCase();
            return (typeof name != 'undefined' ? category[type] && category[type][name] : category[type]) || '';
        }
    }
    return {
        getConf: getConf
    }
}();

/**
 * @namespace Cookie类
 * @name Cookie
 * @author jeking、classyuan
 * @memberOf CP
 */
CP.Cookie = {
    /**
     * @description 设置cookie
     * @author jeking、classyuan
     * @param {String} name 名称
     * @param {String} value 值
     * @param {String} [domain:tenpay.com] 域
     * @param {String} [path:/] 路径
     * @param {String} [hour] 小时
     * @example CP.Cookie.set('cp_pagetype', 'page', 'tenpay.com');
     * @memberOf CP.Cookie
     */
    set: function (name, value, domain, path, hour) {
        if (hour) {
            var now = new Date();
            var expire = new Date();
            expire.setTime(parseFloat(now.getTime()) + 3600000 * hour);
        }
        document.cookie = name + '=' + value + '; ' + (hour ? ('expires=' + expire.toUTCString() + '; ') : '') + ('path=' + (path || '/') + '; domain=' + (domain || document.domain || 'qq.com') + ';');
    },
    /**
     * @description 设置cookie
     * @author jeking、classyuan
     * @param {String} name 名称
     * @example CP.Cookie.get('cp_pagetype'); "page"
     * @memberOf CP.Cookie
     */
    get: function (name) {
        var re = new RegExp('(?:^|;+|\\s+)' + name + '=([^;]*)');
        var result = document.cookie.match(re);
        return (!result ? '' : result[1]);
    },
    /**
     * @description 删除cookie
     * @param {String} name 名称
     * @param {String} [domain:tenpay_com] 域
     * @param {String} [path:/] 路径
     * @example CP.Cookie.del('cp_pagetype');
     * @memberOf CP.Cookie
     */
    del: function (name, domain, path) {
        document.cookie = name + '=; expires=Mon, 2 Mar 2009 19:00:00 UTC; path=' + (path || '/') + '; domain=' + (domain || 'qq.com') + ';';
    }
};

/**
 * @namespace 点击流
 * @name Stat
 * @author classyuan
 * @memberOf CP
 */
function Stat() {
    this.$domain = window.location.host || '888.qq.com';
    this.url = location.protocol == 'https:' ? 'https://www.tenpay.com/zft/js/ping_tenpay.ziped.js?v=20100916' : 'http://pingjs.qq.com/ping.js';
    this.loader = null;
    this.DOMAIN = {
        www: 'www.tenpay.com',
        wallet: 'wallet.tenpay.com',
        mch: "mch.tenpay.com",
        action: "action.tenpay.com",
        caipiao: '500wan.zone.tenpay.com',
        cp: '888.qq.com',
        bc: 'tc.caipiao.tenpay.com'
    };
};
Stat.prototype = {
    // 重置全局数据
    resetGlobalValue: function () {
        pvCurDomain = '';
        pvCurUrl = '';
        pvCurParam = '';
        pvRefDomain = '';
        pvRefUrl = '';
        pvRealDomain = '';
        pvRefParam = '';
        pvRepeatCount = 1;
    },
    main: function (path) {
        if (typeof(pgvMain) == 'function') {
            this.resetGlobalValue();
            pgvMain('', {
                virtualDomain: this.$domain,
                virtualURL: path
            });
        }
    },
    start: function (path) {
        if (typeof(pgvMain) == 'function') {
            this.resetGlobalValue();
            pgvMain('pathtrace', {virtualURL: path, virtualDomain: this.$domain, pathStart: true, tagParamName: 'ADTAG', useRefUrl: true, careSameDomainRef: true});
        }
    },
    load: function (path, param) {
        var sPath = (typeof(path) == 'string' && '' != path) ? path : location.pathname;
        var oTrace = param || null;
        if (null == this.loader) {
            var _this = this;
            var id = '';
            id = jQuery.getScript(this.url, function (path, trace) {
                _this.loader = document.getElementById(id);
                _this.innerCall(path, trace);
            }, [sPath, oTrace], false);
        } else {
            this.innerCall(sPath, oTrace);
        }
    },
    innerCall: function (path, trace) {
        if (null != trace) {
            if (true === trace.start) {
                this.start(path);
            } else {
                this.main(path);
            }
        } else {
            this.main(path);
        }
    },
    /**
     * @description 发送指定按钮统计,ping.js使用的。
     * @param {String} tag
     * @param {String} [_domain:qq.com]
     * @example CP.Stat.clickStat(‘xxxxx’);
     * @memberOf CP.Stat
     */
    clickStat: function (tag, _domain) {
        //彩字APP临时解决方案
        tag=tag.replace(/\//g,'');
        if (typeof(pgvSendClick) == 'function') {
            pvCurDomain = _domain ? this.DOMAIN[_domain] || this.$domain : this.$domain;
            pgvSendClick({hottag: tag});
        } else {
            var _this = this;
            var id = '';
            id = jQuery.getScript(this.url, function (sTag, sDomain) {
                _this.loader = document.getElementById(id);
                if (typeof(pgvSendClick) == 'function') {
                    pvCurDomain = sDomain;
                    pgvSendClick({hottag: sTag});
                }
            }, [tag, (_domain ? this.DOMAIN[_domain] || this.$domain : this.$domain)], false);
        }
    },
    /**
     * @description 发送PV/UV统计
     * @param {String} [_domain:qq.com]
     * @param {String} [path:location.pathname]
     * @param {String} [param:null]
     * @example CP.Stat.pgv();
     * @memberOf CP.Stat
     */
    pgv: function (_domain, path, param) {
        this.$domain = this.DOMAIN[_domain] || this.$domain || '888.qq.com';
        path = path || location.pathname;
        param = param || null;
        this.load(path, param);
    },
    /*
     * @description bctag发送指定按钮统计
     * @param {String|Object} tag ['40094.8.3'|CP.Stat.clickBctag({'tagsports':'40094.8.3','tag888':'40094.8.2','tagbuy':'40094.8.1'})]
     * @param {String} [_domain:qq.com]
     * @example CP.Stat.clickBctag();
     * @memberOf CP.Stat
     */
    clickBctag: function (tag) {
        if(typeof tag=='object'){
            var host=window.location.host.split('.')[0];
            tag=tag['tag'+host];
            if(!tag){
                return false;
            }
        }
        if (typeof(window.StatisticsClass) == 'object' && typeof(StatisticsClass.hm_report_main) == 'function') {
            tag ? StatisticsClass.hm_report_main(tag) : StatisticsClass.hm_report_main();
        } else {
            jQuery.getScript('http://888.gtimg.com/new_js/info/marketing/statistics_fuc.js', function () {
                if (typeof(window.StatisticsClass) == 'object' && typeof(StatisticsClass.hm_report_main) == 'function') {
                    tag ? StatisticsClass.hm_report_main(tag) : StatisticsClass.hm_report_main();
                }
            });
        }
    },
    /**
     * @description bctag发送PV/UV统计
     * @param {String} [_domain:qq.com]
     * @param {String} [path:location.pathname]
     * @param {String} [param:null]
     * @example CP.Stat.pgvBctag();
     * @memberOf CP.Stat
     */
    pgvBctag: function () {
        this.clickBctag();
    }
};
CP.Stat = new Stat();

/**
 * 为自定义属性绑定事件
 */
var initCustomAttr = function () {
    /**
     * 热点点击流
     * 1) 页面初始化时,为有自定义属性data-stat的元素绑定点击流事件
     * 2) 动态插入的元素,由js绑定事件
     * 3) 如：<div data-sportstag="40094.8.2" data-bctag="40094.8.1" data-buytag="40094.8.3">aaaaaa</div>
     */
    var tag={
        stat:null,
        tag888:null,
        tagbuy:null,
        tagsports:null
    }
    var host=window.location.host.split('.')[0];
    var hotStatHandler = function () {
        var bctag=tag['tag'+host];
        var hottag=tag.stat;
        hottag && CP.Stat.clickStat(hottag);
        bctag && CP.Stat.clickBctag(bctag);
    }
    jQuery(window.document).on('click','[data-stat],[data-bctag],[data-buytag],[data-buytag]',function(){
        var _this=jQuery(this);
        setTimeout(function(){

            //tcss点击流
            tag.stat = _this.attr('data-stat') || false;
            //888站点
            tag.tag888 = _this.attr('data-bctag') || false;
            //buy站点
            tag.tagbuy = _this.attr('data-buytag') || false;
            //sports站点
            tag.tagsports = _this.attr('data-sportstag') || false;
            if(tag.stat||tag.tag888||tag.tagbuy||tag.tagsports){
                hotStatHandler();
            }
        },200);
    });
}


/**
 * @namespace 文件上传
 * @name Upload
 * @author classyuan
 * @memberOf CP
 */
CP.Upload = function () {
    /**
     * @description 表单添加参数,只添加不去重
     * @param {obj:Object} 要增加的参数
     * @example CP.Upload.addData(obj);
     * @memberOf CP.Upload
     */
    var setData = function (obj, id) {
        var domHtml = '';
        var $dom = jQuery("#" + id);
        var $ipt = $dom.find("input,select");
        for (var key in obj) {
            if ($ipt.is("input[name=" + key + "]")) {
	            //防止给file input类型赋值出现异常
	            var $input =  $dom.find("input[name=" + key + "]");
	            if ($input.attr("type") !== 'file') {
		            $input.val(obj[key])
	            }
            } else {
                domHtml += '<input type="hidden" name="' + key + '" value="' + obj[key] + '"/>';
            }
        }
        jQuery("#" + id).append(domHtml);
    }
    /**
     * @description 设置表单地址
     * @param o:{
			id:'file_upload',//file的id
			name:'file_upload',//file的name值
			textId:null,//选择文件后显示文件名
			url:''//上传地址
		 } name 名称
     * @example CP.Upload.init('cp_pagetype');
     * @memberOf CP.Upload
     */
    var setUrl = function (url, id) {
        var $dom = jQuery("#" + id);
        if ($dom.length > 0) {
            $dom.attr("action", url);
        }
    }
    /*
     * 重置上传组件
     */
    var resetAll = function () {
        if ($form) {
            $form.remove()
            $form = null;
        }
        if ($iframe) {
            $iframe.remove()
            $iframe = null;
            $file = null
        }
        if (filename) {
            filename = null;
        }
    }
    /**
     * @description 提交表单
     * @example CP.Upload.doSubmit();
     * @memberOf CP.Upload
     */
    var doSubmit = function (id) {
        var $dom = jQuery("#" + id);
        if ($dom.length > 0) {
            $dom.submit();
        }
    }
    /*
     * 获取文件名
     */
    var getFileName = function (el) {
        var filepath = el[0].value;
        var pos1 = filepath.lastIndexOf('/');//windows系
        var pos2 = filepath.lastIndexOf('\\');//unix系
        var pos = Math.max(pos1, pos2);
        filename = filepath.substring(pos + 1);
        var filesuffix = filepath.substring(filepath.lastIndexOf('.') + 1, filepath.length);
        return filename;
    }


    /**
     * 检查文件类型
     * @param {Object} handler file句柄
     * @return {Boolean}
     */
    var checkFileType = function (handler) {
        var allowFileType = handler.attr('data-upload-allowfiletype');
        if (allowFileType) {
            var uploadFileType = handler.value.substr(handler.value.lastIndexOf('.') + 1).toLowerCase(),
                strAllowFileType = '|' + allowFileType.toLowerCase() + '|';
            if (strAllowFileType.indexOf('|' + uploadFileType + '|') == -1) {
                handler.attr('data-nofile', 1); // 因为不能清空file句柄, 故设置文件为空标记
                CP.Box.text({
                    icon: 3,
                    title: '提示',
                    info: '只允许上传 ' + allowFileType + ' 类型的文件'
                });
                return false;
            }
        }
        handler.setAttribute('data-nofile', 0);
        return true;
    };
    /**
     * 上传校验
     * @param {String} guid 表单GUID
     * @return {Boolean}
     */
    var validate = function (guid) {
        var frm = document.forms['cp_upload_frm_' + guid];
        files = frm.getElementsByTagName('input');
        for (var i = 0; files[i]; i++) {
            if (files[i].type == 'file') {
                if (!files[i].value || files[i].getAttribute('data-nofile') == 1) {
                    CP.Box.text({
                        icon: 3,
                        title: '提示',
                        info: '请选择文件'
                    });
                    return false;
                } else if (!checkFileType(files[i])) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * @description 初始化
     * @param o:{
			id:'file_upload',//file的id
			name:'file_upload',//file的name值
			textId:null,//选择文件后显示文件名
			url:''//上传地址
		 } name 名称
     * @example CP.Upload.init('cp_pagetype');
     * @memberOf CP.Upload
     */
    var init = function (o) {
        var obj = {
            login: true, // 是否需要登录,缺省为false
            files: [
                {
                    name: 'file_body', // file控件名称
                    id: 'file_body', // file控件id
                    filePathID: 'ipt_upload_field', // 文件路径input ID, 缺省为空
                    allowFileType: 'txt' // 允许上传的文件类型, 缺省不限
                }
            ],
            url: '', // 上传接口
            submitBtnID: '' // 提交按钮ID
        }
        jQuery.extend(obj, o);

        var _form = obj.files[0].name + parseInt(CP.t() * Math.random());
        var _iframe = _form + 'iframe'
        var $file = jQuery("#" + obj.files[0].id);
        jQuery("body").append('<iframe id="' + _iframe + '" name="' + _iframe + '" src="/v1.0/iframe/none.html" frameborder="0" style="display:none;"></iframe>');//创建ifrmae来提交表单
        $file.wrap('<form id="' + _form + '" action="' + obj.url + '" method="post" target="' + _iframe + '" enctype="multipart/form-data" accept-charset="utf-8"></form>');
        jQuery("#" + _iframe).load(function () {
            if (jQuery(this).attr("src").indexOf('/v1.0/iframe/none.html') == -1) {
                jQuery(this).remove();
            }
        });
        //file内容改变修改文件名显示
        $file.attr({
            "data-upload-filePathID": obj.files[0].filePathID,
            "data-upload-form": _form,
            "data-upload-iframe": _iframe

        }).change(function () {
                var $dom = jQuery("#" + jQuery(this).attr("data-upload-filePathID"));
                if ($dom.length == 0) {
                    return false;
                }
                if ($dom.is("input")) {
                    $dom.val(getFileName(jQuery(this)));
                } else {
                    $dom.text(getFileName(jQuery(this)));
                }
            });

        return {
            formId: _form,
            iframeId: _iframe,
            fileId: obj.id
        }
    }

    return {
        init: init,
        getFileName: getFileName,
        addData: setData,
        setUrl: setUrl,
        submit: doSubmit
    }
}();

/**
 * @namespace 截止时间倒计时
 * @name Timer
 * @author classyuan
 */
var Timer = function () {
    this.serverTime = CP.getServerTime() || new Date().getTime();//服务器时间
    this.endTimeArr = [];
    this.time;//定时器
}
Timer.prototype = {
    /**
     * @description 倒计时
     * @param {Number} endTime 时间戳
     * @param {Function} callback 每次间隔执行
     * @param {Number} speed 频率
     * @example var t=new Timer();
       t.countDown(1349411500000,function(obj){
         if(obj){
            //{d: d, h: h, m: m, s: s, ms: ms, text: str}
         }else{

           clearInterval(t2.time)
         }
       },1000);
     * @memberOf Timer
     */
    countDown: function (endTime, callback, speed) {
        var _this = this;
        speed = speed || 1000;
        this.time = window.setInterval(function () {
            var obj = {};
            var str = "";
            var t = CP.getServerTime();
            var difftime = 0;
            difftime = (new Date(endTime).getTime() - t);
            obj = _this.run(difftime)
            callback && callback(obj);
        }, speed)
    },
    run: function (difftime) {
        var obj = {};
        var str = "";
        if (difftime >= 0) {
            var d = Math.floor(difftime / (1000 * 60 * 60 * 24));
            var h = Math.floor(difftime / (1000 * 60 * 60)) % 24;
            h < 10 && (h = '0' + h)
            var m = Math.floor(difftime / (1000 * 60)) % 60;
            m < 10 && (m = '0' + m)
            var s = Math.floor(difftime / 1000) % 60;
            s < 10 && (s = '0' + s)
            var ms = Math.floor(difftime / 100) % 10;
            if (d > 0) {
                str += d + '天 ';
            }
            if (h >= 0) {
                str += h + ':';
            }
            if (m >= 0) {
                str += m + ':';
            }
            if (s >= 0) {
                str += s;
            }
            if (ms >= 0) {
                str += '.' + ms;
            }
            obj = {d: d, h: h, m: m, s: s, ms: ms, text: str}
        } else {
            obj = false
        }
        return obj;
    },
    /**
     * @description 多个倒计时
     * @param {Array} endTimeArr 时间戳
     * @param {Function} callback 每次间隔执行
     * @param {Number} speed 频率
     * @example var t=new Timer();
     t.countDownArr(1349411500000,function(arr){
         if(arr[0]){
            //{d: d, h: h, m: m, s: s, ms: ms, text: str}
         }else{

           clearInterval(t2.time)
         }
       },1000);
     * @memberOf Timer
     */
    countDownArr: function (endTimeArr, callback, speed) {
        var _this = this;
        this.endTimeArr = endTimeArr;
        speed = speed || 1000;
        this.time = window.setInterval(function () {
            var objArr = [];
            var str = "";
            var t = CP.getServerTime();
            var difftime = 0;

            for (var i = 0, len = _this.endTimeArr.length; i < len; i++) {
                var obj = {};
                difftime = (new Date(_this.endTimeArr[i]).getTime() - t);
                obj = _this.run(difftime)
                objArr.push(obj);
            }
            callback && callback(objArr);
        }, speed)
    },
    /**
     * @description 显示当前服务器时间
     * @param {Function} callback 每次间隔执行
     * @example var t=new Timer();
     t.countUp(function(serverTime){
         //serverTime为当前时间
       });
     * @memberOf Timer
     */
    countUp: function (callback) {
        var _this = this;
        this.time = window.setInterval(function () {
            if (_this.serverTime) {
                _this.serverTime += 1000;
                callback && callback(_this.serverTime);
            }
        }, 1000)
    },
    upadte: function () {
        this.serverTime = CP.getServerTime(true)
    },
    upadteEnd: function (arr) {
        this.endTimeArr = arr || [];
    }
}


/*
 * @description 数字输入框
 * @param {Object} o,new numInput({max,ipt,up,down,checkMax,fn});
 * @example jQuery('#ipt_multi').NumInput({
 val : 15,
 max : 20,
 min : 10,
 num : 2,
 fn  : function(){}
 });
 * @memberOf jQuery
 */
jQuery.fn.NumInput = function (options) {
    this.each(function () {
        var o = {
            max: 999999999,//最大值
            min: 1,//最小值
            val: 1,//默认值
            up: '.up',//上点击dom
            down: '.down',//下点击dom
            num: 1,//加减间隔
            float: 0,
            pad: 1,//补零位数
            ts: this,
            fn: function () {
            }//回调函数
        }
        if (options) {
            jQuery.extend(o, options);
        } else {
            o.val = jQuery(this).val() || 1;
        }
        var $ipt = jQuery(this);
        var $up = $ipt.siblings(o.up);
        var $down = $ipt.siblings(o.down);
        $ipt.val(o.val);
        var _val = $ipt.val();
        //加法
        var doAdd = function () {
            var n1 = parseFloat($ipt.val());//原数字
            var n2 = n1 + o.num;//新数字
            $ipt.val(parseFloat((n2 > o.max ? n1 : n2).toFixed(o.float)));
            $ipt.focus();
            o.fn();
        }
        var doMinus = function () {
            var n1 = parseFloat($ipt.val());//原数字
            var n2 = n1 - o.num;//新数字
            $ipt.val(parseFloat((n2 < o.min ? n1 : n2).toFixed(o.float)));
            $ipt.focus();
            o.fn();
        }


        $ipt.off().click(function (event) {
            event.stopPropagation();
        }).blur(function () {
                var str = $ipt.val().match(/\d{1,}(\.\d{0,}){0,1}/);
                str = (str && str[0]) || o.val;
                $ipt.val(parseFloat(parseFloat(str).toFixed(o.float)));

                if ($ipt.val() > o.max) {
                    $ipt.val(o.max)
                } else if ($ipt.val() < o.min) {
                    $ipt.val(o.min)
                }
                if (isNaN($ipt.val())) {
                    $ipt.val(o.val)
                }
                isPad();
                o.fn();
            }).keydown(function (event) {
                var _e = event;
                var _k = _e.keyCode;
                if (_k == 38) {
                    doAdd();
                }
                if (_k == 40) {
                    doMinus();
                }
            }).keyup(function () {
                var str = $ipt.val().match(/\d{1,}(\.\d{0,}){0,1}/) || '';
                if (str !== '') {
                    str = (str && str[0]) || o.val;
                    $ipt.val(str);
                    if ($ipt.val() != '' && /\D/.test($ipt.val())) {
                        $ipt.val(str);
                        if (_val > o.max) {
                            $ipt.val(o.max);
                        }
                        if (_val < o.min) {
                            $ipt.val(o.min);
                        }
                    }
                    o.fn();
                    //$ipt.selectRange(0,5)
                }
            });

        $up.length > 0 && $up.off().click(function () {
            doAdd()
        });
        $down.length > 0 && $down.off().click(function () {
            doMinus();
        })
        var isPad = function () {
            if (o.pad > 1) {
                $ipt.val(CP.Util.pad($ipt.val(), o.pad));
            }
        }
    })
    return this
};
/*
 * @description input光标进入位置
 * @param {Object} o,new numInput({max,ipt,up,down,checkMax,fn});
 * @example jQuery('#ipt_multi').selectRange(2,3);
 * @memberOf jQuery
 */
jQuery.fn.selectRange = function (start, end) {
    return this.each(function () {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

(function () {
    /**
     * 定义命名空间。如'test.test'
     * @param ns
     */
    var namespace = function (ns) {
        if (typeof(ns) != "string")return;
        ns = ns.split(".");
        var o, ni;
        for (var i = 0, len = ns.length; i < len, ni = ns[i]; i++) {
            try {
                o = (o ? (o[ni] = o[ni] || {}) : (eval(ni + "=" + ni + "||{}")));
            } catch (e) {
                o = eval(ni + "={}");
            }
        }
        return o;
    };
    namespace("CP.util").namespace = namespace;
})();