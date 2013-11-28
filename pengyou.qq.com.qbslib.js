(function () {
    (function (a) {
        a.c = '1';
        a.purl = 'http://qping.qq.com/p.gif?oid={cl}&wid={wid}';
        a.curl = 'http://qping.qq.com/p.gif?oid={cl}&wid={wid}';
        var burl = "http://broadcast.qq.com/d.fcg?p=";
        a.dataUrl = {get: function (plist, udatalist) {
            var udata = {};
            a.each(udatalist, function (v) {
                a.mix(udata, v);
            });
            var url = burl + plist.join(',') + '&' + a.serializeQuery(udata);
            return url;
        }};
        a.trimData = function (data, pconf) {
            if (data[0]) {
                pconf = a.mix(pconf, data[0]);
            }
            var pid = pconf['p'];
            a.each(data, function (v, k) {
                var oid = v.cl;
                v.l = v.cl;
                if (oid) {
                    a.dm.omap[oid] = pid;
                }
            });
        };
        a._getorderdata = function (oid) {
            var pid = a.dm.omap[oid + ''];
            var data = a.getOrderData(pid, oid);
            return data;
        };
        a.view = function (oid) {
            var data = a._getorderdata(oid);
            if (!data) {
                return;
            }
            a.ping.append(data);
            a.ping.flush();
        };
        a.viewpos = function (pid) {
            var pos = a.getPosData(pid);
            var data = pos.data;
            if (!data) {
                return;
            }
            a.each(data, function (v, k) {
                a.ping.append(v);
            });
            a.ping.flush();
        };
        a.action = function (oid, cmd) {
            if (cmd == 'close') {
                var closeurl = 'http://qping.qq.com/c?t=' + ((new Date()).getTime()) + '&o=';
                closeurl += oid;
                a.pingreq(closeurl);
            }
        };
        a.getTxtStr = function (data) {
            var txt_tpl = '<a href="{_l}" target="_blank" onclick="javascript: {_t}.click(\'{cl}\', false, true);" title=\'{text}\'>{txt}</a>';
            var reg = /\[url\]([^\[]*)\[\/url\]/g;
            var txt = data.txt;
            var t = a.stripTag(txt);
            var in_str = '';
            if (!txt.match(reg)) {
                in_str = a.format(txt_tpl, {'cl': data.cl, 'txt': txt, '_l': data._l, '_t': a.t, 'text': t});
            } else {
                in_str = txt.replace(reg, function (mat, ltxt) {
                    return a.format(txt_tpl, {'cl': data.cl, 'txt': ltxt, '_l': data._l, '_t': a.t, 'text': t});
                });
            }
            return in_str;
        };
        a.click = function (oid, open_in_this, user_open_link) {
            var pid = a.dm.omap[oid + ''];
            return a._click(pid, oid, open_in_this, user_open_link);
        };
    })(QBS);
    (function (a) {
        a.charset = 'GB2312';
        a.cbname = '_bc';
        a.c = '2';
        var burl = 'http://i.gdt.qq.com/view.fcg?';
        a._burl = burl;
        a.dataUrl = {get: function (plist, userdataList) {
            var len = plist.length, extkey, ext, arr, screen = window.screen;
            var req = {'adposcount': len, 'posid': [], count: []};
            var extreq = {};
            var extpos = {};
            a.each(plist, function (posid, posnum) {
                var ud = userdataList[posid] || {}, reqparam;
                arr = ['siteset', 'cur', 'adposcount', 'adid', 'adloc'];
                a.each(arr, function (dv) {
                    delete ud[dv];
                });
                req.posid.push(posid);
                req.count.push(ud.count || 1);
                delete ud.count;
                if (a.getUrlParam('adid')) {
                    req.adid = a.getUrlParam('adid');
                }
                if (a.getUrlParam('adloc')) {
                    req.adloc = a.getUrlParam('adloc');
                }
                reqparam = ud.req;
                if (reqparam) {
                    a.each(reqparam, function (v, k) {
                        !req[k] && (req[k] = v);
                    });
                    delete ud.req;
                }
                if (ud.appid) {
                    extreq.appid = ud.appid;
                    req.appid = ud.appid;
                    delete ud.appid;
                }
                a.each(ud, function (uv, uk) {
                    if (uk.substr(0, 2) == 'u_') {
                        extkey = uk.substr(2);
                        extreq[extkey] = uv;
                        delete ud[uk];
                    }
                });
                extpos[posnum + ''] = ud;
            });
            var fl = a.filterManage.get();
            if (fl && fl.length > 0) {
                var fapp = {'app': fl};
                extreq.filter = fapp;
            }
            extreq.rst = screen.width + '*' + screen.height;
            var ENV = a.ENV;
            if (typeof(extreq.hosttype) === 'undefined' && typeof(ENV.hosttype) != 'undefined') {
                extreq.hosttype = ENV.hosttype;
                extreq.hostver = ENV.hostver + '';
            }
            if (typeof(extreq.yellow) === 'undefined' && typeof(ENV.yellow) != 'undefined') {
                extreq.yellow = ENV.yellow;
            }
            if (a.getUrlParam('_gdtoid')) {
                extreq.aid = a.getUrlParam('_gdtoid');
            }
            req.posid = req.posid.join('|');
            req.count = req.count.join('|');
            ext = {'req': extreq, 'pos': extpos};
            req.ext = encodeURIComponent(a.JSONToString(ext));
            var url = burl + (a.getObjectToStringFn('=', '&', false, false))(req);
            return url;
        }};
        a.onPostGet = function (conf, userdata, appid) {
        };
        a.trimData = function (data, pconf) {
            var playcfg = pconf.playcfg, loginUin, uintail;
            try {
                var FP = (typeof(QZONE) != 'undefined') && (QZONE.FrontPage || QZONE.FP);
                FP && (loginUin = FP.getQzoneConfig('loginUin'));
                loginUin && (uintail = loginUin % 100);
            } catch (e) {
            }
            a.each(data, function (v, k) {
                v.cl = v.cl || v.id;
                if (v.ext) {
                    var tmpalist, ainfo;
                    if (v.ext.appclass) {
                        v.appclass = v.ext.appclass;
                    }
                    if (v.ext.appname) {
                        v.appname = v.ext.appname;
                    }
                    tmpalist = v.ext.alist;
                    if (tmpalist) {
                        ainfo = tmpalist[2019];
                        if (ainfo) {
                            var tmpaid = ainfo.aid;
                            if (tmpaid && v.txt) {
                                ainfo.aid = {url: v.rl, txt: v.txt};
                                v.bqqdeal = 1;
                                v.txt = '';
                                v.orirl = v.rl;
                                v.rl = tmpaid;
                            }
                        }
                        ainfo = tmpalist[2016];
                        if (ainfo && ainfo.aid && ainfo.aid.list && ainfo.aid.list.length && v.txt && !(playcfg && playcfg[1039] == 1)) {
                            v.txt = '';
                        }
                        ainfo = tmpalist[2023];
                        if (ainfo) {
                            v.pcpush = {appid: v.targetid, canpush: true, canhover: true};
                            if (ainfo.aid && ainfo.aid.appname) {
                                ainfo.aid.sendtipmsg = '手机接收应用';
                            }
                        }
                        var alist = [];
                        a.each(tmpalist, function (av) {
                            alist.push(av);
                        });
                        v.alist = alist;
                    }
                }
            });
            if (pconf.playmod == 3) {
                pconf.playmode = 'default';
            } else {
                pconf.playmode = 'npdata';
            }
        };
        a._fixDataURL = function (data_url) {
            var gray = a.getUrlParam('gray');
            if (/\b72343472179107023\b/.test(data_url)) {
                var n = Math.random() * 1000;
                if (n < 1) {
                    gray = 'gray';
                }
            }
            if (gray == 'gray') {
                data_url = data_url.replace('http://i.gdt.qq.com', 'http://gray.i.gdt.qq.com');
            }
            return data_url;
        };
        a.precallback = function (o, ecb, startTime) {
            var list;
            if (o && (o.ret == 0) && o.data) {
                a.each(o.data, function (v, k) {
                    var hasOrder = false, eflag;
                    try {
                        if (v.ret == 0) {
                            hasOrder = true;
                            list = v.list || [v];
                            v.cfg.p = k;
                            list.cfg = v.cfg;
                            a.callback(list);
                            a.sendStat(11, startTime, [k]);
                        } else {
                            list = [];
                            list.cfg = {'p': k};
                            a.callback(list);
                            a.sendStat(12, startTime, [k]);
                        }
                    } catch (e) {
                        eflag = hasOrder ? 16 : 13;
                        setTimeout(function () {
                            a.onerror(eflag, startTime, [k]);
                        }, 0);
                        try {
                            var r = (!!e.stack ? 500 : 1000), extra = '', url = '';
                            try {
                                url = location.href;
                            } catch (exi) {
                                url = 'location access deny';
                            }
                            r = Math.random() * r;
                            if (r < 1 || a._full_stat) {
                                a.sendErrMsg(e, url, k, {extra: extra, hasOrder: hasOrder});
                            }
                        } catch (ex) {
                            if (typeof(TCISD) != 'undefined') {
                                var opts = {referURL: 'http://qzone.com/appreterr', referDomain: 'qzone.com', referPath: '/appreterr'};
                                TCISD.pv('gdt.qq.com', '/ret/error', opts);
                            }
                        }
                    }
                });
            } else {
                if (o && o.ret) {
                    var retcode = o.rpt;
                    if (retcode) {
                        retcode = (retcode == 63) ? 15 : retcode;
                        ecb(retcode);
                    } else {
                        ecb(52);
                    }
                } else {
                    ecb(53);
                }
            }
        };
        var emsgnum = 0;
        a.sendErrMsg = function (e, url, pid, opt) {
            var data, broswer = '', btype, map, callerinfo = '', tmp, msg = e.message, stack = e.stack, extra, hasOrder, orderdesc = '', charleft = 8;
            opt = opt || {};
            extra = opt.extra;
            hasOrder = opt.hasOrder;
            map = {chrome: 11, firefox: 12, ie: 13, opera: 14, safari: 15};
            try {
                a.each(a.dom.ua, function (v, k) {
                    if (v && map[k]) {
                        broswer = k + '' + v;
                        btype = map[k];
                        return false;
                    }
                });
            } catch (exi) {
            }
            orderdesc = hasOrder ? 'hasorder' : 'noorder';
            data = {dataId: 1000058, bid: 20, url: a.string.cut(url, 128 - charleft), lineNo: 0, browser: broswer, errMsg: [pid, orderdesc, msg, navigator.userAgent]};
            if (!!stack) {
                stack = stack.split(/\n\s*at\s*/).slice(0, 3).join(' ◆ ');
                data.errMsg.push(stack);
            }
            data.errMsg.push(extra);
            data.errMsg = a.string.cut('【' + data.errMsg.join(' 】 【 ') + '】', 1024 - charleft);
            setTimeout(function () {
                if (extra && typeof(TCISD) != 'undefined') {
                    if (a.TCISD) {
                        a.TCISD.valueStat(440064, 1, btype, {'reportRate': 1, 'duration': 1});
                    }
                    var opts = {referURL: 'http://qzone.com/appinfo', referDomain: 'qzone.com', referPath: '/appinfo'}, emsg = a.string.cut('/' + ([pid, msg, stack]).join('').replace(/["\/:]/g, ''), 256);
                    TCISD.pv('gdt.qq.com', emsg, opts);
                }
            }, 0);
            var cgi = 'http://s.isdspeed.qq.com/cgi-bin/s.fcg', FormSender, _sender;
            if (a.fp && a.fp.QZFL && (FormSender = a.fp.QZFL.FormSender)) {
                _sender = new FormSender(cgi, 'post', data, 'utf-8');
                _sender.send();
            } else {
                emsgnum++;
                var frameId = '_GDT_ONERROR_SENDER_' + emsgnum, cntid = "_GDT_SENDER_" + emsgnum, doc = document, wrapFrm, frameEl, formEl, df, elist, loaded = false;
                wrapFrm = doc.createElement('div');
                wrapFrm.id = cntid;
                wrapFrm.style.display = 'none';
                wrapFrm.innerHTML = '<iframe id="' + frameId + '" name="' + frameId + '" onload=""  width="1px" height="1px" style="display:none"></iframe>';
                formEl = doc.createElement('form');
                formEl.method = 'post';
                formEl.target = frameId;
                formEl.style.cssText = 'display:none';
                doc.body.appendChild(wrapFrm);
                wrapFrm.appendChild(formEl);
                var clear = (function (cntid, doc) {
                    return function () {
                        var cnt = doc.getElementById(cntid);
                        cnt.parentNode.removeChild(cnt);
                    };
                })(cntid, doc);
                frameEl = doc.getElementById(frameId);
                if (frameEl.attachEvent) {
                    frameEl.attachEvent("onload", function () {
                        clear();
                    });
                } else {
                    frameEl.onload = function () {
                        clear();
                    };
                }
                df = doc.createDocumentFragment();
                for (var k in data) {
                    tmp = doc.createElement('input');
                    tmp.name = k;
                    tmp.type = 'hidden';
                    tmp.value = data[k];
                    df.appendChild(tmp);
                }
                formEl.appendChild(df);
                formEl.action = cgi;
                formEl.submit();
                formEl = frameEl = null;
            }
        };
        a.sendStat = function (errcode, startTime, calledlist) {
            var duration, clen = calledlist.length, keyPid = {'72058698667513039': 440056, '432346668857152719': 440057, '648519450970936527': 440058, '216173886743368911': 440059, '432631442368746703': 440060, '72343472179107023': 440061, '288231480781296847': 440083, '720577045008864463': 440084, '504690135918302415': 440085, '83062611038295247': 440086, '72058737322218703': 410195, '216173925398074575': 410196, '288231519436002511': 410197, '576461895587714255': 410198}, isKP = false, statId, commStated = false, commStatId = 400350;
            if (calledlist.length > 0) {
                a.each(calledlist, function (v, k) {
                    if (!!keyPid[v]) {
                        isKP = true;
                        statId = keyPid[v];
                        _send(v);
                    } else {
                        isKP = false;
                        statId = commStatId;
                        !commStated && _send(v);
                        commStated = true;
                    }
                });
            }
            function _send(pid) {
                var ecode = 0, succode = 1, url, urlext, rate = 1;
                ecode = errcode;
                succode = (ecode == 50 || ecode == 51) ? 2 : succode;
                succode = (ecode == 12 || ecode > 51) ? 3 : succode;
                rate = (succode === 1) ? 1000 : 100;
                duration = (+new Date()) - startTime;
                if (a.TCISD) {
                    a.TCISD.valueStat(statId, succode, ecode, {'reportRate': rate, 'duration': duration});
                }
                urlext = '?' + pid;
                url = a._burl;
                a.valueStat(url, succode, ecode, duration, rate, {urlext: urlext});
                if (succode != 2) {
                    urlext = '?qzfl';
                    a.valueStat(url, succode, ecode, duration, rate, {urlext: urlext});
                }
            }
        };
        a.onerror = function (type, startTime, calledlist) {
            a.sendStat(type, startTime, calledlist);
        };
    })(GDT);
    function _k(a) {
        var fk = (a.fp.QZFL) ? a.fp.QZFL : ((typeof QBSCOMM != 'undefined') ? QBSCOMM : undefined);
        if (!fk) {
            return;
        }
        (function (a) {
            a.dom = fk.dom;
            a.dom.ua = fk.userAgent;
            a.css = fk.css;
            a.string = fk.string;
            a.event = fk.event;
            a.JSONGetter = fk.JSONGetter;
            a.TCISD = (typeof TCISD != 'undefined') ? TCISD : fk.TCISD;
            a.ENV = (function () {
                var m = {};
                try {
                    var win = a.fp;
                    if (win && win.location.host.indexOf('qzone.qq.com') > 0 && typeof(win.g_version) == 'number') {
                        m.hosttype = 'qzone';
                        m.hostver = win.g_version;
                    }
                    if (win.QZONE && win.QZONE.FP && win.QZONE.FP.getUserVIPLevel) {
                        m.yellow = QZONE.FP.getUserVIPLevel(true);
                    }
                } catch (e) {
                }
                return m;
            })();
            a.getlocalStorage = function (win) {
                var store = null, engine = null, searchOrder, engines;
                win = win || window;
                searchOrder = ['localStorage', 'userData'];
                engines = {localStorage: {test: function () {
                    return win.localStorage ? true : false;
                }, init: function () {
                    store = win.localStorage;
                }, getItem: function (key) {
                    return store.getItem(key);
                }, setItem: function (key, value) {
                    return store.setItem(key, value);
                }}, userData: {test: function () {
                    return win.ActiveXObject ? true : false;
                }, init: function () {
                    store = win.document.documentElement;
                    store.addBehavior('#default#userdata');
                }, getItem: function (key) {
                    store.load(key);
                    return store.getAttribute(key);
                }, setItem: function (key, value) {
                    store.load(key);
                    store.setAttribute(key, value);
                    return store.save(key);
                }}};
                for (var i = 0, l = searchOrder.length; i < l; i++) {
                    engine = engines[searchOrder[i]];
                    try {
                        if (engine.test()) {
                            engine.init();
                            break;
                        } else {
                            engine = null;
                        }
                    } catch (ex) {
                        engine = null;
                    }
                }
                if (engine) {
                    delete engine.test;
                    delete engine.init;
                }
                return engine;
            };
            var _lc = a.getlocalStorage();
            a._full_stat = _lc && _lc.getItem('_gdt_full_stat');
            a.dm = {omap: {}, dlist: {}, clist: {}};
            var isEmpty = function (o) {
                var empty = true;
                each(o, function (v, k, _break) {
                    empty = false;
                    return _break;
                });
                return empty;
            }, each = function (d, a, b) {
                if (typeof d.length == "number") {
                    for (var f = 0, n = d.length; f < n; f++)a.call(b, d[f], f);
                }
                else if (typeof d == "number") {
                    for (f = 0; f < d; f++)a.call(b, f, f);
                }
                else {
                    for (f in d)a.call(b, d[f], f);
                }
            }, map = function (d, a) {
                var b = [];
                each(d, function (f, n) {
                    b.push(a(f, n));
                });
                return b;
            }, mix = function (r) {
                r = r || {};
                for (var i = 1; i < arguments.length; i++) {
                    var s = arguments[i];
                    if (s) {
                        for (var j in s) {
                            r[j] = s[j];
                        }
                    }
                }
                return r;
            }, getObjectToStringFn = function (assign_token, pair_separator, need_last, need_encode) {
                var encode = need_encode ? encodeURIComponent : function (k) {
                    return k;
                };
                return function (o) {
                    return map(o,function (v, k) {
                        if (k != null) {
                            return k + assign_token + encode(v);
                        }
                    }).join(pair_separator) + (need_last ? pair_separator : '');
                };
            };
            (function (q) {
                var commurl = 'http://c.isdspeed.qq.com/code.cgi', collector = [], timer, duration = 1000;

                function valueStat(domain, cgi, type, code, time, rate, exts) {
                    var param = [];
                    param.push('key=' + 'domain,cgi,type,code,time,rate', 'r=' + Math.random());
                    if (typeof exts.unshift == 'function') {
                        var i = 0;
                        while (exts.length) {
                            if (param.join('&').length > 1000) {
                                break;
                            }
                            var c = exts.shift();
                            param.push([i + 1, 1].join('_') + '=' + c[0]);
                            param.push([i + 1, 2].join('_') + '=' + c[1]);
                            param.push([i + 1, 3].join('_') + '=' + c[2]);
                            param.push([i + 1, 4].join('_') + '=' + c[3]);
                            param.push([i + 1, 5].join('_') + '=' + c[4]);
                            param.push([i + 1, 6].join('_') + '=' + c[5]);
                            i++;
                        }
                    }
                    if (i > 0) {
                        a.pingreq(commurl + '?' + param.join('&'), 1000);
                    }
                }

                var urlParse = /^http:\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/;
                q.parseUrl = function (req) {
                    var mtch = req.match(urlParse), url = mtch[2], domain = mtch[1];
                    return[domain, url];
                };
                q.valueStat = function (req, type, code, time, rate, conf) {
                    var pUrl = q.parseUrl(req), domain, url;
                    conf = conf || {};
                    domain = pUrl[0];
                    url = pUrl[1];
                    conf.urlext && (url += conf.urlext);
                    q._valueStat(domain, url, type, code, time, rate);
                };
                q._valueStat = function (domain, cgi, type, code, time, rate) {
                    if (Math.random() < 1 / rate) {
                        collector.push([domain, cgi, type, code, time, rate]);
                    }
                };
                function _r() {
                    if (collector.length) {
                        valueStat('', '', '', '', '', '', collector);
                    }
                    timer = setTimeout(_r, duration);
                    duration *= 1.1;
                }

                _r();
            })(a);
            mix(a, {isEmpty: isEmpty, each: each, map: map, getType: function (obj) {
                return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
            }, getUrlParam: function (name, cancelBubble) {
                var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
                var m = location.href.match(r);
                try {
                    if ((!m || m == "") && !cancelBubble)m = top.location.href.match(r);
                } catch (e) {
                }
                return(!m ? "" : m[2]);
            }, mix: mix, bind: function (method, thisObj) {
                var args = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var this_args = Array.prototype.slice.call(arguments, 0);
                    return method.apply(thisObj, args.concat(this_args));
                };
            }, format: function (s, config, reserve) {
                return s.replace(/\{([^}]*)\}/g, (typeof config == 'object') ? function (m, i) {
                    var ret = config[i];
                    return ret == null && reserve ? m : (ret === undefined ? '' : ret);
                } : config);
            }, JSONToString: function (obj) {
                if (typeof JSON != 'undefined' && JSON.stringify) {
                    return JSON.stringify(obj);
                } else {
                    var str = '', arr = [], type;
                    var otype = a.getType(obj);
                    var bstart = (otype == 'array') ? '[' : '{';
                    var bend = (otype == 'array') ? ']' : '}';
                    str += bstart;
                    a.each(obj, function (v, k) {
                        var substr = "";
                        if (otype != 'array') {
                            substr = "\"" + k + "\":";
                        }
                        type = a.getType(v);
                        if (type == 'string') {
                            substr += "\"" + v + "\"";
                        } else if (type == 'number') {
                            substr += v;
                        } else {
                            substr += a.JSONToString(v);
                        }
                        arr.push(substr);
                    });
                    str += arr.join(',');
                    str += bend;
                    return str;
                }
            }, linkOnload: function (src, callback, errCallback) {
                var link = document.createElement('link'), loaded = false, timeout = 20000, isWebkit = navigator.userAgent.indexOf('WebKit') > 0, timer, emptyFn = function () {
                }, head = document.getElementsByTagName('head')[0] || document.documentElement;
                callback = callback || emptyFn;
                errCallback = errCallback || emptyFn;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = src;
                head.appendChild(link);
                if (link.attachEvent) {
                    link.attachEvent('onload', function () {
                        loaded = true;
                        callback();
                    });
                } else {
                    _poll();
                }
                function _poll() {
                    if (isWebkit && link.sheet) {
                        _cb();
                    } else if (link.sheet) {
                        try {
                            if (link.sheet.cssRules) {
                                _cb();
                            }
                        } catch (e) {
                            if (e.code === 1000) {
                                _cb();
                            }
                        }
                    }
                    if (!loaded) {
                        timer = setTimeout(_poll, 50);
                    }
                    function _cb() {
                        loaded = true;
                        callback();
                    }
                }

                setTimeout(function () {
                    clearTimeout(timer);
                    loaded ? callback() : errCallback();
                }, timeout);
            }, getObjectToStringFn: getObjectToStringFn, serializeStyles: getObjectToStringFn(':', ';', true, false), serializeAttrs: getObjectToStringFn('=', ' ', true, false), serializeQuery: getObjectToStringFn('=', '&', false, true)});
            (function () {
                var el_template = '<{tag} {attrs}style="{styles}">{inner}</{tag}>';
                buildHTML = function (styles, attrs, tag, inner) {
                    return a.format(el_template, {tag: tag || 'div', attrs: a.serializeAttrs(attrs || {}), styles: a.serializeStyles(styles), inner: inner || ''});
                };
                a.dom.buildHTML = buildHTML;
            })();
        })(a);
        (function (a) {
            var each = a.each, dom = a.dom, ua = dom.ua, buildHTML = dom.buildHTML, $ = dom.get;
            a.__imgs = [];
            a.pingreq = function (url) {
                setTimeout(function () {
                    var img = new Image();
                    img.src = url;
                    a.__imgs.push(img);
                }, 0);
            };
            a.TCISD && a.TCISD.setPingSender && a.TCISD.setPingSender(a.pingreq);
            var getExtension = a.getExtension = function (uri) {
                return(/\.(\w+)(?:$|\?)/).exec(uri)[1].toLowerCase();
            };
            a.init = function (pid, c, d) {
                a.dm.clist[pid] = c;
                a.dm.dlist[pid] = d;
            };
            a.getPosData = function (pid) {
                var d = a.dm.dlist[pid];
                var c = a.dm.clist[pid];
                if (d && c) {
                    return{'cfg': c, 'data': d};
                }
            };
            a.getPosCfg = function (pid) {
                var c = a.dm.clist[pid];
                if (c) {
                    return c;
                }
            };
            a.getOrderData = function (pid, oid) {
                var pos = a.getPosData(pid);
                var data;
                if (pos) {
                    var datalist = pos['data'];
                    for (var i = 0, len = datalist.length; i < len; i++) {
                        var o = datalist[i];
                        if (o.cl == oid) {
                            data = o;
                            break;
                        }
                    }
                }
                return data;
            };
            a.render = function (pid, callback) {
                var pos = a.getPosData(pid), type = pos.cfg.playmode, d = df.get(type), hasCb = typeof(callback) == 'function';
                if (d) {
                    if (hasCb) {
                        d.render(pid, callback);
                    } else {
                        return d.render(pid);
                    }
                    (callback && !callback._runed) && callback(true);
                } else {
                    if (hasCb) {
                        callback(true);
                    } else {
                        return true;
                    }
                }
            };
            var _dclass = {};
            a.DisplayFactory = {reg: function (type, displayer) {
                _dclass[type] = displayer;
            }, get: function (type) {
                return _dclass[type];
            }};
            var df = a.DisplayFactory;
            a.DisplayBase = {render: function (pid, cb) {
                var ret;
                this.preRender(pid);
                ret = this.doRender(pid, cb);
                return ret;
            }, preRender: function () {
            }, doRender: function () {
            }};
            a.PingDisplayBase = a.mix({}, a.DisplayBase, {preRender: function (pid) {
                var pos = a.getPosData(pid);
                data = pos.data;
                if (data && data[0]) {
                    a.ping.append(data[0]);
                }
            }});
            var getExtendFun = function (superclass) {
                var _extend = function (o, type) {
                    var kclass = a.mix({}, superclass, o);
                    df.reg(type, kclass);
                };
                return function (clist) {
                    each(clist, _extend);
                };
            };
            a.setPingDisplayer = getExtendFun(a.PingDisplayBase);
            a.setNoPingDisplayer = getExtendFun(a.DisplayBase);
            a.stripTag = function (str) {
                var reg = /\[url\]([^\[]+)\[\/url\]/g;
                str = str.replace(reg, "$1");
                reg = /<br\s*\/>|<\/?[^>]*>/g;
                str = str.replace(reg, "");
                str = str.replace(/<|>/g, "");
                str = str.replace(/'/g, "&#39;");
                return str;
            };
            a.isLink = function (str) {
                var link_reg = /^http(s)?:\/\//;
                return link_reg.test(str);
            };
            a.setOrderLink = function (pid, oid, linklist) {
                if (a.getType(linklist) == 'array') {
                    var d = a.getOrderData(pid, oid);
                    a.each(linklist, function (v, k) {
                        if (v && v.nodeType == 1) {
                            v.onclick = function () {
                                return a._click(pid, d.cl, false, true);
                            };
                            v.href = d._l;
                            v.target = '_blank';
                        }
                    });
                }
            };
            a.getOrderLink = function (pid, oid) {
                var d = a.getOrderData(pid, oid);
                var arr = ['onclick="return ' + a.t + '._click(\'' + pid + '\', \'' + d.cl + '\', false, true);"', 'href="' + d._l + '"', 'target = "_blank"'];
                return arr.join(" ");
            };
            a.clear = function (pid) {
            };
            a._click = function (pid, oid, open_in_this, user_open_link) {
                var data = a.getOrderData(pid, oid);
                if (!data) {
                    return;
                }
                if (a._clickdeal) {
                    a._clickdeal(pid, oid);
                }
                a.ping.appendClick(data);
                var link = data.rl;
                if (data.pcpush && data.pcpush.canpush) {
                    a.pingreq(data.rl);
                    a.dealPcpush(pid, oid, data.pcpush.appid, data);
                    return false;
                } else if (a.isLink(link)) {
                    if (!user_open_link) {
                        var target = !open_in_this ? '_blank' : '';
                        a.openUrl(link, target);
                        return false;
                    }
                } else {
                    try {
                        a._execln(link);
                        return false;
                    } catch (e) {
                    }
                }
            };
            a._openlink = function (pid, oid) {
                var data = a.getOrderData(pid, oid);
                if (!data) {
                    return;
                }
                var link = data.rl;
                if (a.isLink(link)) {
                    return true;
                } else {
                    try {
                        a._execln(link);
                        return false;
                    } catch (e) {
                    }
                }
            };
            a._execFun = function (link) {
                var f = new Function(link);
                setTimeout(f, 300);
            };
            a._execln = a._execFun;
            a.openUrl = function (url, target) {
                if (!target) {
                    window.location = url;
                    return;
                }
                var a = document.createElement('a');
                a.href = url;
                a.target = target;
                a.style.diaplay = 'none';
                document.body.appendChild(a);
                try {
                    a.click();
                } catch (e) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, true);
                    a.dispatchEvent(evt);
                    if (ua.firefox) {
                        window.open(url);
                    }
                }
                document.body.removeChild(a);
            };
            (function () {
                var Poller = function (polltime, pollnum) {
                    this.isPlaying = true;
                    this.frun = true;
                    this.curPoll = 0;
                    this.prePoll = 0;
                    this.pollTime = polltime;
                    this.pollNum = pollnum;
                    this.timer;
                    this.onpause = function () {
                    };
                    this.oncontinue = function () {
                    };
                    this.pollArr = {};
                };
                Poller.prototype.pollPlay = function () {
                    var poller = this;
                    this.timer = setTimeout(function () {
                        poller.pollPlay();
                    }, this.pollTime);
                    if (this.isPlaying) {
                        this.prePoll = this.curPoll;
                        this.setCurrentState(this.curPoll);
                        this.curPoll = (this.curPoll + 1) % this.pollNum;
                    }
                };
                Poller.prototype.setCurrentState = function (num) {
                    var poller = this;
                    this.onflip(num);
                };
                Poller.prototype.setCurPoll = function (num) {
                    var cur = parseInt(num, 10);
                    if (!isNaN(cur)) {
                        this.prePoll = this.curPoll;
                        this.curPoll = num;
                        this.setCurrentState(num);
                    }
                };
                Poller.prototype.setFrame = function (frame) {
                    this.prePoll = this.curPoll;
                    frame = (frame > this.pollNum) ? this.pollNum : frame;
                    frame = (frame < 0) ? 0 : frame;
                    this.curPoll = frame;
                    this.setCurrentState(this.curPoll);
                };
                Poller.prototype.pause = function (cur) {
                    this.isPlaying = false;
                    this.setCurPoll(cur);
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    a.bind(this.onpause, this)();
                };
                Poller.prototype.goon = function () {
                    this.isPlaying = true;
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    var poller = this;
                    this.timer = setTimeout(function () {
                        poller.pollPlay();
                    }, this.pollTime);
                    a.bind(this.oncontinue, this)();
                };
                Poller.prototype.clear = function () {
                    this.isPlaying = false;
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                };
                a.Poller = Poller;
            })();
        })(a);
        (function (a) {
            var callconf = {}, queuenum = 0, callque = {}, pidqnum = {};
            var wantedcallnum = 0, callingnum = 0, user_data_buffer = {}, call_p_buffer = [], _tmp_user_data_buffer = {};
            a._clearCallConf = function () {
                user_data_buffer = {};
                call_p_buffer = [];
                callingnum = 0;
                wantedcallnum = 0;
            };
            a._mget = function (list) {
                var _tmpcall_p_buf = call_p_buffer, _tmpcallnum = wantedcallnum, _tmpcallingnum = callingnum, _tmp_user_data_buffer = user_data_buffer;
                a._clearCallConf();
                var num = list.length;
                a.each(list, function (v, k) {
                    v[2] = num;
                    a._get.apply(null, v);
                });
                call_p_buffer = _tmpcall_p_buf;
                wantedcallnum = _tmpcallnum;
                callingnum = _tmpcallingnum;
                user_data_buffer = _tmp_user_data_buffer;
            };
            a._dealpos = function (pid, callback) {
                var conf = callconf[pid];
                if (conf) {
                    conf.callback = callback;
                    var pos = a.getPosData(pid);
                    if (pos) {
                        pos.ret = true;
                        callback(pos);
                    } else if (conf._dataret) {
                        callback({'ret': false});
                    }
                }
            };
            a._get = function (pid, container, num, render_default, callback, user_data, opt) {
                var type, arg0 = arguments[0], appid, opt = opt || {}, needstat = (pid == '72343472179107023') && opt.isStat, staturl = opt.statUrl;
                if (needstat) {
                    QZFL.pingSender(staturl + '&4=500');
                }
                type = a.getType(arg0);
                if (type == 'array') {
                    a._mget(arg0);
                    return;
                }
                a.onPreGet();
                var conf = {'pid': pid, 'container': container, 'callback': callback, 'needstat': needstat, 'staturl': opt.statUrl, 'render_default': render_default};
                callconf[pid] = conf;
                wantedcallnum = wantedcallnum || num;
                call_p_buffer.push(pid);
                pidqnum[pid] = queuenum;
                callingnum++;
                if (user_data) {
                    appid = user_data.appid;
                    user_data_buffer[pid] = user_data;
                }
                if (needstat) {
                    QZFL.pingSender(staturl + '&5=500');
                }
                if (wantedcallnum == callingnum || wantedcallnum == 1) {
                    var data_url = a.dataUrl.get(call_p_buffer, user_data_buffer);
                    if (a._fixDataURL) {
                        data_url = a._fixDataURL(data_url);
                    }
                    if (a.fixDataURL) {
                        data_url = a.fixDataURL(data_url);
                    }
                    var startTime = +new Date();
                    var onerror = (function (calledlist, stTime) {
                        return function (type) {
                            if (!calledlist) {
                                return;
                            }
                            try {
                                a.each(calledlist, function (pid, k) {
                                    var conf = callconf[pid];
                                    callconf[pid] = null;
                                    a.dealcallback(pid, conf, {'ret': false});
                                });
                            } catch (e) {
                            }
                            if (a.onerror) {
                                a.onerror(type, stTime, calledlist);
                            }
                            calledlist = null;
                        };
                    })(call_p_buffer, startTime);
                    callque[queuenum] = wantedcallnum;
                    queuenum++;
                    a._clearCallConf();
                    var charset = a.charset || 'utf-8';
                    var js1 = new a.JSONGetter(data_url, null, null, charset);
                    js1.timeout = 15000;
                    js1.onSuccess = (function (stTime, needstat) {
                        return function (o) {
                            try {
                                if (a.getType(o) == 'function') {
                                    o(a);
                                } else {
                                    a.precallback(o, onerror, stTime);
                                    if (needstat) {
                                        QZFL.pingSender(staturl + '&7=500');
                                    }
                                }
                            } catch (e) {
                                onerror(14);
                            }
                        };
                    })(startTime, needstat);
                    js1.onError = function (data) {
                        onerror(51);
                    };
                    js1.onTimeout = function (data) {
                        onerror(50);
                    };
                    var cb = a.cbname || '_bc';
                    js1.send(cb);
                }
                if (needstat) {
                    QZFL.pingSender(staturl + '&6=500');
                }
                a.onPostGet && a.onPostGet(conf, user_data, appid);
            };
            a.callback = function (data) {
                var pconf = (data.cfg) ? data.cfg : data[0];
                if (pconf.playcfg) {
                    a.mix(pconf, pconf.playcfg);
                }
                var pid = pconf['p'];
                var qnum = pidqnum[pid];
                callque[qnum]--;
                var conf = callconf[pid];
                if (!conf) {
                    return;
                }
                if (conf.needstat) {
                    QZFL.pingSender(conf.staturl + '&8=500');
                }
                conf._dataret = true;
                if (data.length == 0) {
                    a.dealcallback(pid, conf, {'ret': false});
                    return;
                }
                a.trimData(data, pconf);
                pconf.id = pid;
                pconf.container = conf.container;
                a.init(pid, pconf, data);
                a.each(data, function (v, k) {
                    var oid = v.cl;
                    v._l = (a.isLink(v.rl)) ? v.rl : 'javascript:;';
                    v.olink = a.getOrderLink(pid, oid);
                });
                if (a._viewwhensee) {
                    a._viewwhensee(pid);
                }
                if (a._beforeRender) {
                    a._beforeRender(pid);
                }
                a.render(pid, function (ret) {
                    var _self = arguments.callee;
                    if (_self._runed) {
                        return;
                    }
                    a.dealcallback(pid, conf, {'ret': ret, 'data': data, 'cfg': pconf});
                    _self._runed = true;
                });
            };
            a.dealcallback = function (pid, conf, data) {
                var qnum = pidqnum[pid];
                if (callque[qnum] == 0) {
                    a.ping.flush();
                }
                if (!conf) {
                    return;
                }
                if (conf.needstat) {
                    QZFL.pingSender(conf.staturl + '&9=500');
                }
                if (!data.ret && conf.render_default) {
                    a.renderDefault(conf);
                    data.ret = true;
                    if (conf.callback) {
                        conf.callback(data);
                    }
                    return;
                }
                if (conf.callback) {
                    conf.callback(data);
                }
            };
        })(a);
    }

    _k(QBS);
    _k(GDT);
    (function (a) {
        var each = a.each, dom = a.dom, ua = dom.ua, buildHTML = dom.buildHTML, $ = dom.get;
        a.ping = (function () {
            var q = ['cl', 'wid', 'c'], pb = {}, pinged = {}, clearBuffer = function (f) {
                each(q, function (k) {
                    f[k] = [];
                });
            }, pc = function (d) {
                var cda = {};
                clearBuffer(cda);
                var cl = d.l || d.cl;
                cda['cl'].push(cl);
                cda['wid'].push(2);
                cda['c'].push(a.c);
                var pingurl = a.format(a.curl, cda);
                pingurl += '&e=' + (new Date()).getTime();
                a.pingreq(pingurl);
            };
            clearBuffer(pb);
            return{append: function (d) {
                var oid = d['cl'];
                if (pinged[oid]) {
                    return;
                }
                var cl = d.l || d.cl;
                pb['cl'].push(cl);
                pb['wid'].push(1);
                pb['c'].push(a.c);
                pinged[oid] = 1;
            }, appendClick: pc, flush: function (type) {
                if (!a.isEmpty(pb['cl'])) {
                    a.pingreq(a.format(a.purl, pb) + '&t=' + Math.random());
                    clearBuffer(pb);
                }
            }};
        })();
        var FLASH_VAR_LINK = 'adlink';
        a.Helper = {render: function (config, data, el, set_size) {
            if (set_size) {
                dom.setStyle(el, {width: config.w, height: config.h});
            }
            var Helper = a.Helper;
            var t = Helper.getType(config, data, el);
            if (t) {
                Helper.s[t](config, data, el);
                return true;
            } else {
                return false;
            }
        }, getType: function (config, data, el) {
            var t = '';
            var v2 = el.className.match(/_qbs_v2/);
            if (v2) {
                return'data';
            }
            if (data.img && (data.txt == undefined)) {
                if (a.getExtension(data.img) != 'swf') {
                    t = 'img';
                } else {
                    t = 'flash';
                }
            } else if (data.txt && (data.img == undefined)) {
                t = 'txt';
            } else if (data.txt && data.img) {
                t = 'imgtxt';
            }
            return t;
        }, s: {'flash': (function () {
            var param_template = '<param name="{name}" value="{value}"></param>';
            var buildParams = function (o) {
                return a.map(o,function (v, k) {
                    return a.format(param_template, {name: k, value: v});
                }).join('');
            };
            return function (config, data, el) {
                var params = {quality: 'high', allowscriptaccess: 'always', wmode: 'opaque', swliveconnect: true};
                if (config.params) {
                    a.mix(params, config.params);
                }
                var flashvars = config.flashvars || {};
                if (data.ln) {
                    flashvars[FLASH_VAR_LINK] = data.ln;
                }
                params.flashvars = a.serializeQuery(flashvars);
                var attrs = {};
                if (ua.ie) {
                    attrs.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
                    params.movie = data.img;
                } else {
                    params.type = 'application/x-shockwave-flash';
                    attrs.data = data.img;
                }
                el.innerHTML = buildHTML({width: config.w + 'px', height: config.h + 'px'}, attrs, 'object', buildParams(params));
            };
        })(), 'img': function (config, data, el) {
            var styles = {display: 'block', cursor: 'pointer', width: config.w + 'px', height: config.h + 'px'};
            var url = data.img;
            if (getExtension(url) == 'png' && ua.ie != 0 && ua.ie < 7) {
                styles['filter'] = a.format('progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{uri}\')', url);
            } else {
                styles['background-image'] = a.format('url({uri})', url);
            }
            el.innerHTML = buildHTML(styles);
            el.firstChild.onclick = function () {
                a.click(data.cl);
            };
        }, 'imgtxt': function renderImgTxt(conf, data, el) {
            var txt_str;
            var img_tpl = '<p class="qbs_img" style="{img_pstyle}"><a href="{_l}" target="_blank" onclick="javascript: {_t}.click(\'{cl}\', false, true);"><img src="{img}" title=\'{text}\' alt="" style="{style})" /></a></p>';
            var txt_tpl = '<p class="qbs_cont" style="{txt_pstyle}">{txt_str}</p>';
            txt_str = a.getTxtStr(data);
            var styles = {width: conf.w + 'px', height: conf.h + 'px'};
            var style = a.serializeStyles(styles);
            var playcfg = conf.playcfg;
            var layout = (playcfg && playcfg.layout && playcfg.layout >= 1 && playcfg.layout <= 4) ? playcfg.layout : 3;
            var img_pstyle = '', txt_pstyle = '';
            if (layout == 1 || layout == 2) {
                var img_style = {};
                var txt_style = {};
                if (layout == 1) {
                    img_style['float'] = 'left';
                }
                if (layout == 2) {
                    txt_style['float'] = 'left';
                    var width = el.clientWidth - conf.w - 5;
                    txt_style['width'] = width + 'px';
                }
                img_pstyle = a.serializeStyles(img_style);
                txt_pstyle = a.serializeStyles(txt_style);
            }
            var img_str = a.format(img_tpl, {'img': data.img, 'cl': data.cl, 'text': '', '_l': data._l, '_t': a.t, 'style': style, 'img_pstyle': img_pstyle});
            txt_str = a.format(txt_tpl, {'txt_str': txt_str, 'txt_pstyle': txt_pstyle});
            var str = '';
            str = (layout == 1 || layout == 3) ? img_str + txt_str : txt_str + img_str;
            el.innerHTML = str;
            return true;
        }, 'txt': function (config, data, el) {
            var txt_str = a.getTxtStr(data);
            el.innerHTML = txt_str;
        }, 'data': function (config, data, el) {
            if (data.img) {
                var imgs = dom.getElementsByClassName('_qbs_img', null, el);
                var as = el.getElementsByTagName('a');
                var img = imgs[0];
                ln = as[0];
                var url = data.rl;
                if (img && ln) {
                    var imgurl = data.img;
                    if (getExtension(imgurl) == 'png' && ua.ie != 0 && ua.ie < 7) {
                        img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgurl + "', sizingMethod='scale')";
                        img.src = "http://qzonestyle.gtimg.cn/ac/b.gif";
                    } else {
                        img.src = imgurl;
                    }
                    img.style.width = config.w + 'px';
                    img.style.height = config.h + 'px';
                    img.alt = '';
                    img.title = '';
                    ln.href = url;
                    ln.target = "_blank";
                    ln.onclick = function () {
                        return a.click(data.cl, false, true);
                    };
                    return true;
                } else {
                    return false;
                }
            }
        }}};
        var rendbanner = a.Helper.render;
        a.setNoPingDisplayer({'default': {doRender: function (pid) {
            var pos = a.getPosData(pid);
            var data = pos['data'];
            var c = pos['cfg'];
            data = data[0];
            return rendbanner(c, data, c.container);
        }}, 'npdata': {doRender: function (pid) {
            return true;
        }}, 'ns': {doRender: function () {
            return true;
        }}, 'roll': {doRender: function () {
            return true;
        }}, 'custom': {doRender: function (pid) {
            return true;
        }}});
        a.setPingDisplayer({'banner': {doRender: function (pid) {
            var pos = a.getPosData(pid);
            var data = pos['data'];
            var c = pos['cfg'];
            data = data[0];
            return rendbanner(c, data, c.container);
        }}, 'data': {doRender: function (pid) {
            return true;
        }}, 'imgtxt': {}});
        a.renderDefault = function (conf) {
            var el = conf.container;
            conf = a.mix({'playmode': 'banner', 'w': el.clientWidth, 'h': el.clientHeight}, conf);
            var data = [
                {'img': a.format('http://qzs.qq.com/qzone/biz/qbs/default.swf', 1), 'ln': 'http://life.qzone.qq.com', 'w': el.clientWidth, 'h': el.clientHeight}
            ];
            var pid = conf.pid;
            a.init(pid, conf, data);
            a.render(pid);
        };
    })(QBS);
    (function (a) {
        a.setNoPingDisplayer({'default': {doRender: function (pid, callback) {
            var h = a.Hepler, pos = a.getPosData(pid), data = pos['data'], cfg = pos['cfg'];
            cfg.pid = pid;
            cfg = h.getCfg(cfg, data);
            h.render(cfg, data, callback);
        }}});
        a.Hepler = {deftTmpl: {htmlBox: ['<div class="mod_sns_gdt_externalad">', '<div class="mod_sns_gdt_externalad_inner">', '<div class="sns_gdt_externalad_box">', '{GDTAD_CONTENTS}', '</div>', '</div>', '</div>'].join(''), cells: {html: '<div class="sns_gdt_externalad_box" style="width:{tw}px;">{GDTAD_CELL}</div>', flash: ['<span style="width:{tw}px;height:{th}px;position:relative;display:inline-block;_zoom:1;">', '<a {olink} style="filter:alpha(opacity=0);opacity:0;position:absolute;width:{tw}px;height:{th}px;left:0;top:0;background:#fff;"></a>', '{GDTAD_CELL}', '</span>'].join('')}, img: '<a {olink} class="sns_gdt_externalad_img_link"><img src="{img}" alt="GDT image" /></a>', txt: '<div class="sns_gdt_externalad_txt"><a {olink} class="sns_gdt_externalad_txt_link">{txt}</a></div>'}, getCfg: function (config, data) {
            config.tnum = data.length || 0;
            config.isHtml = !!(config.pt < 4);
            return config;
        }, getAdHtml: function (cfg, data) {
            var str = [], i, cellData = {pid: cfg.pid, tw: cfg.tw, th: cfg.th}, clsName = '', h = a.Hepler, adType = cfg.pt, isHtml = cfg.isHtml, adNums = data.length || 0;
            if (adNums === 0) {
                str = push('<!--没有广告素材-->');
                return str;
            }
            if (adNums > 1) {
                a.each(new Array(adNums), function (v, k) {
                    var c;
                    c = h.getAdCellStr(cfg, a.mix(cellData, data[k]));
                    str.push(c);
                });
                isHtml && (clsName = 'sns_gdt_externalad_two');
            } else {
                isHtml && (clsName = 'sns_gdt_externalad_one');
                str.push(h.getAdCellStr(cfg, a.mix(cellData, data[0])));
            }
            str = ['<div class="', clsName, '" style="width:', cfg.pw, 'px;height:', cfg.ph, 'px;overflow:hidden;">', str.join(''), '</div>'].join('');
            return str;
        }, getAdCellStr: function (cfg, data) {
            var h = a.Hepler, t = h.deftTmpl, adType = cfg.pt, regExp = /\{GDTAD_CELL\}/, tmpl = [t.txt, t.img, t.img + t.txt], str = '', flaStr, flaAttr;
            if (cfg.isHtml) {
                str = tmpl[adType - 1];
                str = t.cells.html.replace(regExp, str);
            } else {
                flaAttr = {width: '{tw}', height: '{th}'};
                if (ua.ie) {
                    flaAttr.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
                } else {
                    flaAttr.type = 'application/x-shockwave-flash';
                    flaAttr.data = '{img}';
                }
                flaStr = buildHTML({}, flaAttr, 'object', (function () {
                    var temp = '<param name="{name}" value="{value}"></param>', params = {movie: '{img}', wmode: 'transparent'};
                    return a.map(params,function (v, k) {
                        return a.format(temp, {name: k, value: v});
                    }).join('');
                })());
                str = t.cells.flash.replace(regExp, flaStr);
            }
            str = a.format(str, data);
            return str;
        }, render: function (cfg, data, callback) {
            var h = a.Hepler, css = 'http://' + a.siDomain + '/open_proj/gdt_mod_ad.css', t = h.deftTmpl, isHtml = cfg.isHtml, cellsStr;
            if (isHtml) {
                a.linkOnload(css, function () {
                    fillAd(t.htmlBox);
                }, function () {
                    callback(false);
                });
            } else {
                fillAd();
            }
            function fillAd(wrapper) {
                var w = wrapper || '{GDTAD_CONTENTS}';
                cellsStr = h.getAdHtml(cfg, data);
                cfg.container && (cfg.container.innerHTML = w.replace(/\{GDTAD_CONTENTS\}/, cellsStr));
                if (!cfg.noping) {
                    a.viewpos(cfg.pid);
                }
                callback(true);
            }
        }};
        a.ping_vgdt = function (url) {
            var p = new a.JSONGetter(url, null, null, 'utf-8'), statId = 440065, succode, retcode;
            p.onSuccess = function (re) {
                if (re.ret >= 50) {
                    return;
                }
                if (re.ret === 0) {
                    succode = 1;
                    retcode = 11;
                } else {
                    succode = 3;
                    retcode = 50 + re.ret;
                }
                var rate = 1;
                a.TCISD && a.TCISD.valueStat(statId, succode, retcode, {'reportRate': rate});
                a.valueStat(url, succode, retcode, 1, rate);
                a.valueStat(url, succode, retcode, 1, rate, {urlext: '?qzfl'});
            };
            p.onError = function () {
                a.TCISD && a.TCISD.valueStat(statId, 2, 50, {'reportRate': 1});
                a.valueStat(url, 2, 50, 1, 1);
            };
            p.send('_cb');
        };
        a.ping = (function () {
            var plist = [], extlist = [], mplist = [], mextlist = [];
            return{'append': function (d) {
                plist.push(d.apurl);
                if (d.opurl) {
                    extlist.push(d.opurl);
                }
                if (d.apptrace) {
                    extlist.push(d.apptrace);
                }
                if (d.ext && d.ext.outerurl) {
                    extlist.push(d.ext.outerurl);
                }
            }, appendMulti: function (d) {
                mplist.push(d.apurl);
                if (d.opurl) {
                    mextlist.push(d.opurl);
                }
                if (d.apptrace) {
                    mextlist.push(d.apptrace);
                }
                if (d.ext && d.ext.outerurl) {
                    mextlist.push(d.ext.outerurl);
                }
            }, flushMulti: function () {
                a._postOrderView(mplist);
                mplist = [];
                while (mextlist.length > 0) {
                    v = mextlist.shift();
                    a.pingreq(v);
                }
            }, appendClick: function (data) {
                if (data.appclick) {
                    a.pingreq(data.appclick);
                }
            }, flush: function () {
                var v, rd = Math.random() * 100;
                while (plist.length > 0) {
                    v = plist.shift();
                    if (rd < 1 || a._full_stat) {
                        a.ping_vgdt(v);
                    } else {
                        a.pingreq(v);
                    }
                }
                while (extlist.length > 0) {
                    v = extlist.shift();
                    a.pingreq(v);
                }
            }};
        })();
        function pgvOrder(n, d) {
            var opts = {referURL: 'http://user.qzone.qq.com/inforcenter', referDomain: 'user.qzone.qq.com', referPath: '/inforcenter'};
            if (typeof(TCISD) != 'undefined') {
                TCISD.pv('gdt.qq.com', '/ic_qbs/' + d + '_' + n, opts);
            }
        }

        var _attachedScoll = false;
        var _scrollPlist = {};
        a._beforeRender = function (pid) {
            var d = a.getPosData(pid);
            var c = (d && d.cfg) ? d.cfg : null;
            if (c && c.playcfg && !c.playcfg.noping) {
                a._viewpos(pid, true);
            }
        };
        a._viewwhensee = function (pid) {
            if (pid != '216459759766590671') {
                return;
            }
            if (QZFL) {
                _scrollPlist[pid] = 0;
                setTimeout(function () {
                    a._scrollViewPid(pid);
                }, 400);
                if (!_attachedScoll) {
                    QZFL.event.addEvent(parent, 'scroll', a._scrollView);
                    QZFL.event.addEvent(window, 'beforeunload', function () {
                        QZFL.event.removeEvent(parent, 'scroll', a._scrollView);
                    });
                    _attachedScoll = true;
                }
            }
        };
        var _scrolltimer = null;
        a._scrollView = function () {
            try {
                var _g = document.getElementById;
            } catch (e) {
                var thisfun = arguments.callee;
                QZFL.event.removeEvent(parent, 'scroll', thisfun);
                return;
            }
            if (_scrolltimer) {
                clearTimeout(_scrolltimer);
            }
            setTimeout(function () {
                _scrolltimer = null;
                a.each(_scrollPlist, function (v, k) {
                    a._scrollViewPid(k);
                });
            }, 100);
        };
        a._scrollViewPid = function (pid) {
            if (_scrollPlist[pid]) {
                return;
            }
            var _pdoc = parent.document;
            var cont = QZFL.dom.get('ad_home_left');
            var h = QZFL.dom.getXY(cont)[1];
            var _ph = QZFL.dom.getXY(frameElement, _pdoc)[1];
            var scrollHeight = QZFL.dom.getScrollTop(_pdoc);
            var windowHeight = QZFL.dom.getClientHeight(_pdoc);
            if ((scrollHeight + windowHeight) > (h + _ph + 20)) {
                var d = a.getPosData(pid);
                d && d.data && (d.data.length > 0) && pgvOrder(pid, 'orderinview');
                _scrollPlist[pid] = 1;
                QZFL.event.removeEvent(parent, 'scroll', a._scrollView);
            }
        };
        a.isLink = function (link) {
            return!(/jtype=[12]/).test(link);
        };
        a.dealPcpush = function (posid, orderid, appid, orderdata) {
            var pcpushinfo = orderdata.ext && orderdata.ext.alist && orderdata.ext.alist[2023] && orderdata.ext.alist[2023].aid || {}, pushjs = 'http://' + a.imgcacheDomain + '/open/canvas/pcpush.js', title = '随时在手机上玩', from = 'QZGDT.' + orderid;
            QZFL.imports(pushjs, function () {
                var timediff, pkgsize, pushtype;
                if (pcpushinfo.canpush) {
                    pcpushinfo.isgdt = 1;
                    pcpushinfo.appid = appid;
                    pcpushinfo.timestamp = pcpushinfo.timestamp || (+new Date()) / 1000;
                    (timediff = pcpushinfo.timestamp - (+new Date()) / 1000);
                    pkgsize = parseFloat(pcpushinfo.apppkgsize, 10);
                    pushtype = (pkgsize > 10) ? 2 : 1;
                    PCPUSH.autoPush(pcpushinfo, pushtype, from, timediff);
                } else {
                    PCPUSH.show(appid, from, title);
                }
            });
        };
        a._execln = function (link) {
            var linktype, reg = /jtype=([\d])/, mat;
            mat = link.match(reg);
            linktype = mat && mat[1];
            if (!linktype) {
                return;
            }
            linktype = parseInt(linktype, 10);
            var getter = new a.JSONGetter(link);
            getter.onSuccess = function (o) {
                a._elinkCb(o, linktype);
            };
            getter.onError = function (data) {
                _sendelinkStat(50, linktype);
            };
            getter.send('_cb');
        };
        a._elinkCb = function (o, linktype) {
            var link;
            if (o && o.ret == 0) {
                _sendelinkStat(11, linktype);
                link = a.string.restHTML(o.data);
                if (linktype == 1) {
                    a._execFun(link);
                } else if (linktype == 2) {
                    a._callDialog(link);
                }
            } else {
                _sendelinkStat(60 + o.ret, linktype);
            }
        };
        function _sendelinkStat(code, linktype) {
            var succCode;
            succCode = code >= 50 ? 2 : 1;
            statId = (linktype == 1) ? 420164 : 420165;
            a._ozstat(statId, succCode, code);
        }

        a._ozstat = function (statId, succCode, code) {
            var url = 'http://isdspeed.qq.com/cgi-bin/v.cgi?flag1={statId}&flag2={succCode}&flag3={code}&1=1&2=1&sds=', succCode;
            url = a.format(url, {statId: statId, succCode: succCode, code: code});
            url += Math.random();
            a.pingreq(url);
        };
        function _senddialogRpt(code) {
            var statId = 420157, succCode;
            succCode = code >= 50 ? 2 : 1;
            if (code == 60 && a.dom.ua.ie) {
                code = 62;
            }
            a._ozstat(statId, succCode, code);
            var pluserrmap = {50: 10551, 51: 10552, 60: 10553, 61: 10553, 62: 10553, 11: 10554, 53: 10554}, pcode = pluserrmap[code], uin, t;
            qplusurl = 'http://cgi.merc.qq.com/report/report?strValue=0&nValue={pcode}&t={t}';
            t = Math.random();
            qplusurl = a.format(qplusurl, {pcode: pcode, t: t});
            a.pingreq(qplusurl);
        }

        a._callDialog = function (link) {
            var getter = new a.JSONGetter(link);
            getter.onSuccess = a._sellerCgiCb;
            getter.onError = function (data) {
                _senddialogRpt(50);
            };
            getter.send('_Callback');
        };
        a._sellerCgiCb = function (o) {
            var isSupport, tenUrl, backupUrl;
            if (o && o.retcode == 0) {
                isSupport = a._isTencentSupport();
                if (isSupport) {
                    tenUrl = o.tencent_string;
                    if (tenUrl && (tenUrl.substr(0, 10) == 'tencent://')) {
                        window.location.href = tenUrl;
                        _senddialogRpt(11);
                    } else {
                        _senddialogRpt(53);
                    }
                } else {
                    backupUrl = o.siteurl;
                    if (backupUrl) {
                        a.openUrl(o.siteurl, '_blank');
                        _senddialogRpt(60);
                    } else {
                        _senddialogRpt(61);
                    }
                }
                return;
            }
            _senddialogRpt(51);
        };
        a._isTencentSupport = function () {
            var version = 0;
            try {
                var qax = new ActiveXObject("TimwpDll.TimwpCheck");
                version = qax.GetHummerQQVersion();
            } catch (e) {
            }
            return version;
        };
        a._execfn = function (link) {
            var doc = document;
            var head = doc.getElementsByTagName('head')[0];
            var s = doc.createElement('script');
            s.src = link;
            head.insertBefore(s, head.firstChild);
        };
        a.view = function (pid, olist) {
            var t = a.getType(olist);
            if (t == 'array') {
                a._mview(pid, olist);
            } else {
                a._view(pid, olist);
            }
        };
        a._mview = function (pid, olist, forcePing) {
            var d = a.getPosData(pid);
            var c = (d && d.cfg) ? d.cfg : null;
            if (c && c.playcfg && !c.playcfg.noping && !forcePing) {
                return;
            }
            a.each(olist, function (oid) {
                var odata = a.getOrderData(pid, oid);
                if (!odata) {
                    return;
                }
                a.ping.appendMulti(odata);
            });
            a.ping.flushMulti();
        };
        a._view = function (pid, oid, forcePing) {
            var d = a.getPosData(pid);
            var c = (d && d.cfg) ? d.cfg : null;
            if (c && c.playcfg && !c.playcfg.noping && !forcePing) {
                return;
            }
            var odata = a.getOrderData(pid, oid);
            if (!odata) {
                return;
            }
            a.ping.append(odata);
            a.ping.flush();
        };
        a._clickdeal = function (pid, oid) {
            var d = a.getOrderData(pid, oid), tmp;
            if (d && d.targetid && ((d.targettype == 11) || (d.targettype == 14))) {
                a.filterManage.set(d.targetid);
            }
            if (d.bqqdeal) {
                a.pingreq(d.orirl);
            }
        };
        a.click = function (pid, oid, open_in_this, user_open_link) {
            return a._click(pid, oid, open_in_this, user_open_link);
        };
        a.viewpos = function (pid) {
            a._viewpos(pid, false);
        };
        a._viewpos = function (pid, forcePing) {
            var d = a.getPosData(pid), c;
            c = (d && d.cfg) ? d.cfg : null;
            if (c && c.playcfg && !c.playcfg.noping && !forcePing) {
                return;
            }
            var dlist = (d && d.data) ? d.data : null;
            if (dlist && dlist.length == 1) {
                a._view(pid, dlist[0].cl, true);
                return;
            }
            if (c && c.apurl) {
                a.pingreq(c.apurl);
            }
            if (c && c.opurl) {
                a.pingreq(c.opurl);
            }
            if (c && c.apptrace) {
                a.pingreq(c.apptrace);
            }
            if (dlist) {
                var dc, varr = [];
                for (var i = 0, len = dlist.length; i < len; i++) {
                    dc = dlist[i];
                    varr.push(dc.apurl);
                    if (dc.ext && dc.ext.outerurl) {
                        a.pingreq(dc.ext.outerurl);
                    }
                }
                a._postOrderView(varr);
            }
        };
        a._postOrderView = function (list) {
            var dc, varr = [], targeturl;
            a.each(list, function (url) {
                var mat = url.match(/viewid=([^&]*)/);
                (!targeturl) && (targeturl = url.substring(0, url.indexOf('?')));
                if (mat && mat[1]) {
                    varr.push(mat[1]);
                }
            });
            targeturl = targeturl || 'http://v.gdt.qq.com/gdt_stats.fcg';
            a._batchview(targeturl, varr);
        };
        a.filterManage = (function () {
            var fm = {};
            var getDateTime = function (time) {
                var date = time ? new Date(time) : new Date();
                var datestr = date.toDateString();
                return Date.parse(datestr);
            };
            _localstorage = a.getlocalStorage(a.fp);
            fm._db = {set: function (k, v) {
                _localstorage && _localstorage.setItem(k, v);
            }, get: function (k) {
                return _localstorage && _localstorage.getItem(k);
            }};
            var _datekey = '_gdt_filter_date', _datakey = '_gdt_filter_data';
            fm.set = function (id) {
                var exist = false;
                var cdata = fm.get();
                var dn = getDateTime();
                exist = ('|' + cdata.join('|') + '|').indexOf('|' + id + '|') >= 0;
                if (!exist) {
                    cdata.unshift(id);
                    var len = cdata.length;
                    if (len > 5) {
                        cdata.length--;
                    }
                    fm._db.set(_datakey, cdata.join('|'));
                    fm._db.set(_datekey, dn);
                }
            };
            fm.get = function () {
                var _date = fm._db.get(_datekey), data = fm._db.get(_datakey);
                var cdata = data ? data.split('|') : [];
                var dn = getDateTime();
                if (_date) {
                    var d1 = getDateTime(+_date);
                    cdata = (d1 != dn) ? [] : cdata;
                } else {
                    cdata = [];
                }
                a.each(cdata, function (v, k) {
                    cdata[k] = v + '';
                });
                return cdata;
            };
            return fm;
        })();
        var vnum = 0, idpfx = '_gdt_view_frame_';
        a._clearviewframe = function (num) {
            var doc = document, dom = a.dom, fid = idpfx + num;
            var ifr = doc.getElementById(fid);
            var cont = ifr.parentNode;
            cont.parentNode.removeChild(cont);
        };
        a._batchview = function (targeturl, list) {
            var FormSender, data, _sender, _img;

            function formatData(d, isStr) {
                var ret = !!isStr ? [] : {};
                a.each(d, function (v, k) {
                    if (!!isStr) {
                        ret.push('viewid' + k + '=' + v);
                    } else {
                        ret['viewid' + k] = v;
                    }
                });
                if (!!isStr) {
                    ret.push('count=' + d.length);
                } else {
                    ret.count = d.length;
                }
                return ret;
            }

            if (list.length <= 3) {
                a.pingreq(targeturl + '?' + formatData(list, true).join('&'));
            } else if (a.fp && a.fp.QZFL && (FormSender = a.fp.QZFL.FormSender)) {
                _sender = new FormSender(targeturl, 'post', formatData(list), 'GB2312');
                _sender.send();
            } else {
                var doc = document, dom = a.dom, cnum = 0, str = '', fid = idpfx + vnum, ifr, fom;
                str = '<iframe onload="" id="' + fid + '" name="' + fid + '" ></iframe><form target="' + fid + '" action="' + targeturl + '" method="post">';
                a.each(list, function (v, k) {
                    str += '<input name="viewid' + k + '" value="' + v + '" />';
                });
                str += '<input name="count" value="' + list.length + '" />';
                str += '</form>';
                var cont = doc.createElement('div');
                cont.innerHTML = str;
                cont.style.display = 'none';
                doc.body.appendChild(cont);
                ifr = doc.getElementById(fid);
                var clear = (function (vnum) {
                    return function () {
                        a._clearviewframe(vnum);
                    };
                })(vnum);
                if (ifr.attachEvent) {
                    ifr.attachEvent("onload", function () {
                        clear(vnum);
                    });
                } else {
                    ifr.onload = function () {
                        clear(vnum);
                    };
                }
                fom = ifr.parentNode.getElementsByTagName('form')[0];
                fom.submit();
                vnum++;
            }
        };
        var FP = (typeof(QZONE) != 'undefined') && (QZONE.FrontPage || QZONE.FP);
        a.like = function (uin, pid, oid, cb, fb) {
            pgvOrder(oid, 'like_' + pid);
            FP.addILike(uin, function (o) {
                likeCallback(o, pid, oid);
                if (cb) {
                    cb(o);
                }
            }, fb, {'scene': 7});
        };
        function likeCallback(o, pid, oid) {
            if (o && (o.ret == 0)) {
                pgvOrder(oid, 'like_succ_' + pid);
                FP.showMsgbox('关注成功', 0, 2000);
            }
            if (o && (o.ret != 0) && o.msg) {
                if (o.ret == -20) {
                    FP.showMsgbox('你已经关注此空间,请勿重复操作.', 0, 2000);
                } else {
                    FP.showMsgbox(o.msg, 0, 2000);
                }
            }
        }

        a.share = function (desc, pid, oid, onSuccess) {
            var odata = a.getOrderData(pid, oid);
            if (!odata) {
                return;
            }
            desc = desc || '';
            var viewId = odata.rl;
            var tpl = '{llimit}"spaceuin":{uin},"description":"{desc}","cgi":"http://c.gdt.qq.com/share.fcg","fields":{llimit}"title":"","type":90,"url":"","viewId":"{viewId}"{rlimit},"onSuccess":{_callback},"cgiType":"FormSender"{rlimit}';
            var uin = FP.getQzoneConfig('loginUin');
            var data = {'uin': uin, 'desc': desc, 'viewId': viewId, '_callback': 'top._gdtShareCallback', 'llimit': '{', 'rlimit': '}'};
            var str = a.format(tpl, data);
            var param = encodeURIComponent(str);
            pingShare(oid, pid, 'share');
            top._gdtShareCallback = function () {
                shareCallback(pid, oid, onSuccess);
            };
            FP.popupDialog('转给我的好友', {'src': 'http://' + a.imgcacheDomain + '/qzone/app/qzshare/popup.html?params=' + param + '#platform='}, 408, 300);
        };
        function pingShare(oid, pid, key) {
            pgvOrder(oid, key + '_' + pid);
            if (a.TCISD) {
                var ecode;
                ecode = (key == 'share') ? 11 : 12;
                a.TCISD.valueStat(410193, 1, ecode, {'reportRate': 1, 'duration': 1});
            }
        }

        function shareCallback(pid, oid, cb) {
            pingShare(oid, pid, 'share_succ');
            if (cb) {
                cb();
            }
        }

        a.getSale = function (conf, pid, odata, opt) {
            var str;
            var num = conf.aid;
            str = '<div class="hot_number">此商品最近售出<span class="number_color">' + num + '</span>件</div>';
            return{'text': str};
        };
        a.getPageLike = function (conf, pid, odata, opt) {
            opt = opt || {};
            var arrStr = [], atype = conf.atype, count, fcount, flist, fconf, pagename, pageuin, pnameCutLen, pnameLen = 0, fnick, fnickCutLen = 0, fnicklen = 0, likecount;
            if (atype == 2017) {
                fconf = conf.aid || {};
                flist = fconf.list || [];
                fcount = parseInt(fconf.count, 10) || 0;
                likecount = parseInt(fconf.total, 10) || 0;
                pnameCutLen = 12;
                pagename = fconf.pagename;
                pnameLen = a.string.getRealLen(pagename);
                pageuin = fconf.uin;
                fnickCutLen = 12;
                arrStr.push('<div class="interactive_focus_txt">');
                if (fcount > 0) {
                    if (fcount === 1) {
                        arrStr.push('好友');
                        if (pnameLen <= 8) {
                            fnickCutLen += 4;
                        } else if (pnameLen <= 10) {
                            fnickCutLen += 2;
                        }
                    } else {
                        fnickCutLen += 9 - ((Math.min(pnameLen, pnameCutLen)) + (fcount + '').length);
                    }
                    var user = flist[0], userlist = [];
                    if (user) {
                        fnick = user.nickname;
                        fnicklen = a.string.getRealLen(fnick);
                        fnick = a._trimnickname(fnick, fnickCutLen);
                        if (opt.platform && opt.platform != 'qzone') {
                            userlist.push(fnick);
                        } else {
                            userlist.push(a._wrapnickname(fnick, user.uin));
                        }
                    }
                    arrStr.push(userlist.join('、'));
                    if (fcount > 1) {
                        arrStr.push('等' + fcount + '位好友');
                    }
                } else {
                    if (likecount < 1e6) {
                        pnameCutLen += 4;
                    }
                    arrStr.push('共有' + likecount + '人');
                }
                pagename = a._trimnickname(pagename, pnameCutLen);
                arrStr.push('关注了<a href="http://user.qzone.qq.com/' + pageuin + '" target="_blank">' + pagename + '</a>');
                arrStr.push('<\/div>');
                arrStr.push('<a class="bgr2 btn_interactive_focus _js_like" onclick="GDT.likeaction(' + pageuin + ', \'' + pid + '\', \'' + odata.cl + '\',  this);return false;" href="javascript:;">关注</a><span class="c_tx3 interactive_focused_txt _js_liked" style="display: none;" id="gdtlike_' + pid + '_' + odata.cl + '">已关注</span>');
            }
            return{'text': arrStr.join('')};
        };
        a.getBqqStr = function (conf, pid, odata, opt) {
            opt = opt || {};
            var arrStr = [], atype = conf.atype;
            fconf = conf.aid || {};
            arrStr.push('<a href="' + odata.orirl + '" onclick="GDT._Bqqaction(\'' + pid + '\', \'' + odata.cl + '\')" target="_blank">' + fconf.txt + '</a>');
            return{'text': arrStr.join('')};
        };
        a._Bqqaction = function (pid, cl) {
            pgvOrder(cl, 'bqqclick');
        };
        a.likeaction = function (uin, pid, oid, el) {
            var dom = a.dom, odata = a.getOrderData(pid, oid);
            a.like(uin, pid, oid, function (o) {
                if (o && (o.ret == 0 || o.ret == -20)) {
                    a.pingreq(odata.rl);
                    el.style.display = 'none';
                    dom.get('gdtlike_' + pid + '_' + oid).style.display = 'block';
                }
            });
        };
        a.getFriendApp = function (conf, pid, odata, opt) {
            opt = opt || {};
            var str = '', appname, fconf, flist, count, cfgPos, cfgFriend, isFriendEmp;
            cfgPos = a.getPosCfg(pid);
            cfgFriend = cfgPos && cfgPos.playcfg && cfgPos.playcfg[1008];
            cfgFriend = parseInt(cfgFriend, 10);
            isFriendEmp = (cfgFriend == 1);
            if (cfgFriend == 2) {
                str = a._getFriendApp(conf, odata);
            } else {
                fconf = conf.aid || {};
                flist = fconf.list || [];
                count = parseInt(fconf.count, 10) || 0;
                if (count <= 2) {
                    count = flist.length;
                }
                count = (flist.length == 0) ? 0 : count;
                if (count > 0) {
                    appname = odata.appname;
                    if (appname) {
                        var userlist = [];
                        for (var i = 0; i < 2; i++) {
                            var user = flist[i];
                            if (user) {
                                var nick = a._trimnickname(user.nickname, 8);
                                if (opt.platform && opt.platform != 'qzone') {
                                    userlist.push(nick);
                                } else {
                                    userlist.push(a._wrapnickname(nick, user.uin, 'interactive_txt_a'));
                                }
                            }
                        }
                        str += userlist.join('、');
                        var action = a._getAppAction(conf, odata);
                        if (count <= 2) {
                            str += '最近' + action;
                            if (isFriendEmp) {
                                str = '好友' + str;
                            }
                        } else {
                            count = a._formatFriendNum(count);
                            str += '等' + count + '个好友最近' + action;
                        }
                        var applen = (count <= 2 || flist.length < 2) ? 20 : 12;
                        var tappname = a._trimnickname(appname, applen);
                        str += '<a class="ad_interactive_a" href="' + odata._l + '" onclick="return GDT._openlink(\'' + pid + '\', \'' + odata.cl + '\');" title="' + appname + '" target="_blank">' + tappname + '</a>';
                    } else {
                        str = '';
                    }
                }
            }
            return{'text': str};
        };
        var friendtpl = '<div class="inter_play_box clearfix"> <div class="player_avatar"> <a class="ui_avatar_link" href="{f0link}" target="_blank"><img src="{logo}" alt="" /></a> </div> <div class="play_text"> <div class="player_name">{friendlink} </div> <div class="play_together"><span class="play_hot">热玩中</span><a class="play_together_link bg6 c_tx6" {olink}>一起玩</a> </div> </div> </div>', nofriendtpl = '<div class="inter_play_box many_players clearfix"> <div class="play_text"> <div class="play_together"> <span class="play_hot">众多网友热玩中...</span><a class="play_together_link bg6 c_tx6" {olink}>一起玩</a> </div> </div> </div>';
        a._getFriendApp = function (conf, odata) {
            var str = '', atype = conf.atype, appname, fconf, flist, count;
            fconf = conf.aid || {};
            flist = fconf.list || [];
            count = parseInt(fconf.count, 10) || 0;
            if (count <= 2) {
                count = flist.length;
            }
            count = (flist.length == 0) ? 0 : count;
            appname = odata.appname;
            if (appname) {
                if (count > 0) {
                    var d = odata, userlist = [], user, nick;
                    for (var i = 0; i < 2; i++) {
                        user = flist[i];
                        if (user) {
                            var len = 8;
                            if (i == 0) {
                                d.logo = QZONE.FP.getPURL(user.uin, 35);
                                d.f0link = 'http://user.qzone.qq.com/' + user.uin;
                            }
                            len = (count >= 10 || i == 1) ? 6 : len;
                            nick = a._trimnickname(user.nickname, len);
                            userlist.push(a._wrapnickname(nick, user.uin));
                        }
                    }
                    d.logo = d.logo || '';
                    d.friendlink = userlist.join('、');
                    if (count >= 3) {
                        d.friendlink = userlist[0] + '<span class="play_hot">等' + count + '位好友</span>';
                    }
                    str = a.format(friendtpl, d);
                } else {
                    str = a.format(nofriendtpl, odata);
                }
            }
            return str;
        };
        a._getAppAction = function (anode, odata) {
            var action = {1: '在玩', 2: '在用'}, type = 1;
            var cls = odata && parseInt(odata.appclass, 10);
            type = (cls == 769) ? 1 : 2;
            return action[type];
        };
        a._formatFriendNum = function (num) {
            num = parseInt(num, 10);
            var str = num;
            if (num > (1e8 - 1)) {
                str = a._getnum(num / 1e8) + '亿';
            } else if (num > (1e4 - 1)) {
                str = a._getnum(num / 1e4) + '万';
            }
            return str;
        };
        a._getnum = function (num) {
            num = num + '';
            num = num.replace(/(\d*)(\.(\d)\d*)?/, function ($all, $pre, $n, $fix) {
                var str = '';
                str = $pre ? $pre : str;
                str = $fix ? str + '.' + $fix : str;
                return str;
            });
            return num;
        };
        var _inList = {2016: ['App', 'appfriends', a.getFriendApp], 2017: ['Like', 'pagelike', a.getPageLike], 2019: ['Like', 'pagelike', a.getBqqStr], 2030: ['Sale', 'sale', a.getSale]};
        a.dealExt = function (aid, pid, oid, cb, opt) {
        };
        a._dealExtList = function (pid, oid, arrRet, opt) {
            var oda, alist, anode, ret, num = 0, strRet = '';
            oda = a.getOrderData(pid, oid);
            alist = oda && oda.ext && oda.ext.alist;
            if (alist) {
                a.each(alist, function (anode, aid) {
                    aid = parseInt(aid, 10);
                    var aconf = _inList[aid];
                    if (aconf) {
                        ret = aconf[2](anode, pid, oda, opt);
                        if (ret && (strRet = ret.text)) {
                            num++;
                            if (aid === 2017) {
                                arrRet.push('<div class="qz_interactive_focus">' + strRet + '<\/div>');
                            } else {
                                arrRet.push('<div class="interactive_txt">' + strRet + '<\/div>');
                            }
                        }
                    }
                });
            }
            return num;
        };
        a._dealExt = function (pid, oid, aid, fn, opt) {
            var ret = {}, oda, alist, anode;
            oda = a.getOrderData(pid, oid);
            alist = oda && oda.ext && oda.ext.alist;
            anode = alist && alist[aid];
            if (anode) {
                ret = fn(anode, pid, oda, opt);
            }
            return ret;
        };
        a.each(_inList, function (v, k) {
            var fkey = v[1], fn = v[2];
            a['get' + v[0] + 'Str'] = (function (aid, fn) {
                return function (pid, oid, opt) {
                    return a._dealExt(pid, oid, aid, fn, opt);
                };
            })(k, fn);
        });
        var _appcssloaded;
        a._loadAppFriendCss = function (opt) {
            if (!_appcssloaded) {
                a.css.insertCSSLink('http://' + a.siDomain + '/open_proj/sns_icenter_interactive.css?max_age=31536000&d=20120803', opt);
                _appcssloaded = true;
            }
        };
        a.renderExt = function (pid, oid, container, callback, opt) {
            var div, num = 0, arr = [], ret;
            var doc = (opt && opt.doc) || document;
            opt = opt || {};
            opt.dealfn = opt.dealfn || {};
            div = doc.createElement('div');
            var contcn = 'qz_interactive ';
            contcn += opt.textclass || '';
            div.className = contcn;
            num = a._dealExtList(pid, oid, arr, opt);
            if (arr.length > 0) {
                div.innerHTML = arr.join('');
                container && container.appendChild(div);
                a._loadAppFriendCss({'doc': doc});
                var lnks = div.getElementsByTagName('a');
                a.each(lnks, function (v) {
                    if (v.getAttribute('appnick')) {
                        v.onclick = function () {
                            pgvOrder('appnickname', pid);
                        };
                    }
                });
            }
            return num;
        };
        a.bindPcpushhover = function (el, posid, orderid) {
            var row = $e(el), orderdata, cfg, type = 1;
            cfg = GDT.getPosCfgByKey(posid, 'mapptpl', orderid);
            orderdata = GDT.getOrderData(posid, orderid);
            type = (cfg == 3 || cfg == 4) ? 2 : type;
            if (type == 1) {
                row.find('.__pcpush_direct_push').show();
                row.find('._js_pcpush_hover:not(.__pcpush_qrcode)').remove();
            } else {
                row.find('.__pcpush_direct_push').remove();
            }
            if (orderdata && orderdata.pcpush && orderdata.pcpush.canhover) {
                row.onHover(function () {
                    row.find('._js_pcpush_hover').show();
                }, function () {
                    row.find('._js_pcpush_hover').hide();
                });
            }
        };
        a.getPosCfgByKey = function (pid, cfgkey, oid) {
            var o, cv, cfg;
            if (oid) {
                o = a.getOrderData(pid, oid);
                cfg = o && o.cfg;
            } else {
                o = a.getPosCfg(pid);
                cfg = o && o.playcfg;
            }
            cv = cfg && cfg[cfgkey];
            return cv;
        };
        a._wrapnickname = function (nick, uin, cn) {
            cn = cn || '';
            return'<a class="' + cn + '" appnick="1" href="http://user.qzone.qq.com/' + uin + '" target="_blank">' + nick + '</a>';
        };
        a._trimnickname = function (nick, length) {
            nick = nick || '';
            nick = a.string.restHTML(nick);
            var len = a.string.getRealLen(nick);
            if (length && (len > length)) {
                nick = a.string.cut(nick, length - 2, '...');
            }
            nick = a.string.escHTML(nick);
            return nick;
        };
        a.closeOrder = function (pid, oid) {
            var d = a.getOrderData(pid, oid);
            if (d && d.closeurl) {
                a.pingreq(d.closeurl);
            }
        };
        try {
            if (location.host === 'my.qzone.qq.com' || (/\bapp=[\d]{5}/).test(location.href)) {
                setTimeout(function () {
                    var ifr = document.createElement('iframe');
                    ifr.frameBorder = '0';
                    ifr.width = ifr.height = '1';
                    ifr.style.cssText = 'position:absolute;left:0;top:0';
                    ifr.src = 'http://qzs.qq.com/qzone/biz/comm/widget/cookiematching/cm_helper.html#mod=cm';
                    document.body.appendChild(ifr);
                }, 10000);
            }
        } catch (err) {
        }
    })(GDT);
})();
/*  |xGv00|138b6b729212bb3c9950b4840da9d98d */