
var Tween = {Quart: {easeIn: function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
},easeOut: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
},easeInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}},Expo: {easeIn: function(t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
},easeOut: function(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
},easeInOut: function(t, b, c, d) {
    if (t == 0)
        return b;
    if (t == d)
        return b + c;
    if ((t /= d / 2) < 1)
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}}};
function elContains(parent, child) {
    if (parent && parent.firstChild) {
        while (child) {
            if (child === parent) {
                return true;
            }
            child = child.parentNode;
            if (child && (child.nodeType != 1)) {
                child = null;
            }
        }
    }
    return false;
}
function BindArgs(func, args) {
    return function() {
        return func.apply(window, args);
    }
}
var sliderTimer = null;
var autoPlayTimer = null;
var slideAnimation = {t: 0,b: null,c: null,d: 35,slider: null,callback: null,init: function(slider, curPos, callback) {
    this.slider = slider;
    this.t = 0;
    this.b = Math.abs(parseFloat(slider.style.left));
    this.c = curPos * 980 - this.b;
    if (QZFL.userAgent.ie == 6) {
        this.d = 15;
    }
    this.curPos = curPos;
    this.callback = callback;
},run: function() {
    var distance = Math.ceil(Tween.Quart.easeOut(this.t, this.b, this.c, this.d));
    if (this.t < this.d) {
        this.slider.style.left = -distance + 'px';
        this.t++;
        sliderTimer = window.setTimeout(function() {
            slideAnimation.run();
        }, 10);
    } else {
        this.slider.style.left = -this.curPos * 980 + 'px';
        if (this.callback)
            this.callback();
    }
}};
function slideShow(link, callback) {
    var prev = $e("#slider_navs a[class='current']");
    var curPos = link.getAttribute('sIndex');
    var slider = $('slider_pics');
    prev.removeClass('current');
    link.className = 'current';
    slideAnimation.init(slider, curPos, callback);
    slideAnimation.run();
}
function autoSliderPlay(links) {
    var navs = $e("#slider_navs a");
    var i = 0;
    navs.each(function(nav) {
        if (nav.className == 'current') {
            i = nav.getAttribute('sIndex');
            return false;
        }
    });
    if (i == (navs.elements.length - 1)) {
        i = 0;
    } else {
        i++;
    }
    link = links[i];
    slideShow(link, function() {
        if (autoPlayTimer) {
            window.clearTimeout(autoPlayTimer);
        }
        autoPlayTimer = window.setTimeout(BindArgs(autoSliderPlay, [links]), 5000);
    });
}
var sliderImgObj = {elements: null,index: 0,max: 0,finish: false,init: function(pid) {
    this.elements = $(pid).getElementsByTagName('img');
    this.max = this.elements.length;
    this.loadAll();
},loadAll: function() {
    var curEl, lazy_src;
    for (var i = 0; i < this.max; i++) {
        lazy_src = this.elements[i].getAttribute('lazy_src');
        if (lazy_src != '') {
            curEl = this.elements[i];
            break;
        }
    }
    if (curEl) {
        curEl.src = curEl.getAttribute('lazy_src');
        curEl.setAttribute('lazy_src', '');
        window.setTimeout((function(that) {
            return function() {
                that.loadAll();
            }
        })(this), 2500);
    }
},load: function() {
    var lazy_src, curEl;
    for (var i = 0; i < this.max; i++) {
        curEl = this.elements[i];
        lazy_src = curEl.getAttribute('lazy_src');
        if (lazy_src != '') {
            curEl.src = curEl.getAttribute('lazy_src');
            curEl.setAttribute('lazy_src', '');
        }
    }
    this.finish = true;
}};
function initSlider() {
    sliderImgObj.init('slider_pics');
    var links = $e('#slider_navs a');
    links.each(function(link, index, links) {
        QZFL.event.addEvent(link, 'mouseover', function(evt, link, i) {
            if (sliderTimer) {
                window.clearTimeout(sliderTimer);
            }
            if (autoPlayTimer) {
                window.clearTimeout(autoPlayTimer);
            }
            if (!sliderImgObj.finish) {
                sliderImgObj.load();
            }
            slideShow(link);
        }, [link, index]);
        QZFL.event.addEvent(link, 'mouseout', function(evt, links, link) {
            if (autoPlayTimer) {
                window.clearTimeout(autoPlayTimer);
            }
            autoPlayTimer = window.setTimeout(BindArgs(autoSliderPlay, [links]), 5000);
        }, [links, link]);
        if (index == 0) {
            autoPlayTimer = window.setTimeout(BindArgs(autoSliderPlay, [links]), 5000);
        }
    });
}
var MovieData = {movie_on: {},movie_will: {},set: function(k, v) {
    this[k] = v;
}};
function initMovie(callback) {
    var cid = 221;
    PIAO.JsLoader('http://imgcache.qq.com/piao/data/app/movie/movies/cities/' + cid + '/movies_city_' + cid + '.json', function() {
        callback();
        var tmpl = '<li>\
    <a href="{link}" class="photo" target="_blank"><img init_src="{pic}" width="150" height="210" title="推荐指数{level}颗星" onerror="this.src=\'http://imgcache.qq.com/club/movie_channel/pic/zq.gif\'"/></a>\
    <p class="g_name"><a href="{link}" target="_blank">{name}</a></p>\
    <p class="c_tx3">{remark}</p>\
   </li>', htm = [];
        var movies = MovieData['movies_city_' + cid].info, movie;
        for (var i = 0, j = movies.length; i < j; i++) {
            movie = movies[i];
            movie.link = '/dianying/movie/' + movie.id % 100 + '/sche_' + movie.id + '.html';
            movie.pic = 'http://imgcache.qq.com/piao/pics/movies/' + movie.id % 100 + '/' + movie.id + '/' + movie.id + '_210_300.jpg';
            htm.push(tmpl.format(movie));
        }
        renderMovieRank(movies);
        htm = htm.slice(0, 6);
        $e('#movie_cxt').setHtml(htm.join(''));
        QZFL.lazyLoad.init($e('#movie_cxt img'));
    });
}
var movieScores = {scores: []};
function renderMovieCallBack(json) {
    if (json.node) {
        movieScores.scores = json.node;
    }
}
function renderMovieRank(movieArr) {
    var dianying_rank_ctx = $('dianying_rank_ctx');
    var htmlArr = [], scoreArr;
    var startCls = ['', 'star_05', 'star_1', 'star_15', 'star_2', 'star_25', 'star_3', 'star_35', 'star_4', 'star_45', 'star_5'];
    movieArr.sort(function(m1, m2) {
        return (parseFloat(m2.score) - parseFloat(m1.score));
    });
    movieArr = movieArr.slice(0, 5);
    for (var i = 0, j = movieArr.length, movie, cls; i < j; i++) {
        movie = movieArr[i];
        scoreArr = parseFloat(movie.score).toFixed(1).split('.');
        if ((scoreArr[1] && scoreArr[1] == '0') || scoreArr[0] % 2 != 0) {
            cls = startCls[parseInt(scoreArr[0], 10)];
        } else {
            cls = startCls[parseInt(scoreArr[0], 10) + 1];
        }
        htmlArr.push('<li><div class="label"><em class="c_tx2">' + movie.score + '</em></div><div class="info"><span class="g_name"><a target="_blank" href="' + movie.link + '">' + movie.name + '</a></span><span class="star"><span class="piao_star ' + cls + '"></span></span></div></li>');
    }
    $e('#dianying_rank_ctx').setHtml(htmlArr.join(''));
}
var YCData = {rcmd_0: [],set: function(k, v) {
    this[k] = v;
}};
function initYC() {
    PIAO.JsLoader('/yanchu/data/data_rcmd_0.json', function() {
        var ycTpl = ['<li>', '<a href="{link}" class="photo" target="_blank"><img width="150" height="210" init_src="{pic}" alt="{name}" title="{name}"/>{ytype}</a>', '<div class="info">', '<p class="yc_name"><a href="{link}" target="_blank">[{type}]{name}</a></p>', '<p class="c_tx3">售价：<strong class="g_price">{priceRange}</strong></p>', '</div>', '</li>'].join('');
        var data = YCData.rcmd_0;
        var htm = [], showArr = [], operaArr = [];
        for (var i = 0, j = data.length, record, tprice, ytype; i < j; i++) {
            record = data[i];
            tprice = record.price.split('~');
            if (tprice.length == 1 || tprice[0] == tprice[1]) {
                tprice = '<i class="g_yen">&yen;</i>' + (tprice[0] == 'NULL') ? '待定' : tprice[0];
            } else {
                tprice = '<i class="g_yen">&yen;</i>' + tprice[0] + ' - <i class="g_yen">&yen;</i>' + tprice[1];
            }
            record.priceRange = tprice;
            ytype = record.ytype;
            if (ytype && ytype != '' && ytype != '--') {
                if (ytype.length < 3) {
                    record.ytype = '<span class="bubble"><b>' + ytype + '</b></span></a>';
                } else {
                    record.ytype = '<span class="bubble"><em>' + ytype + '</em></span></a>';
                }
            } else {
                record.ytype = '';
            }
            if (record.type == '演唱会') {
                showArr.push(record);
            } else if (record.type == '话剧歌剧' || record.type == '话剧/歌剧') {
                operaArr.push(record);
            }
        }
        var arr = showArr.concat(operaArr);
        arr = arr.slice(0, 6);
        for (var i = 0, j = arr.length; i < j; i++) {
            htm.push(ycTpl.format(arr[i]));
        }
        $e('#yc_cxt').setHtml(htm.join(''));
        QZFL.lazyLoad.init($e('#yc_cxt img'));
    }, 'utf-8', false);
}
var JDData = {rcmd_0: [],set: function(k, v) {
    this[k] = v;
}};
function initJD() {
    PIAO.JsLoader('/jingdian/data/data_rcmd_0.json', function() {
        var jdTpl = ['<li>', '<a href="{link}" target="_blank" class="photo"><img width="150" height="100" init_src="{pic}" alt="{name}" title="{name}"/>{ytype}</a>', '<p class="yc_name"><a href="{link}" target="_blank">[{type}]{name_2}</a></p>', '<p class="c_tx3">原价：<del><i class="g_yen">&yen;</i><span>{price}</span></del></p>', '<p class="c_tx3">QQ价：<strong class="g_price"><i class="g_yen">&yen;</i>{pprice}</strong></p>', '</li>'].join('');
        var data = JDData.rcmd_0.slice(0, 6);
        var arr = [], desc = '';
        for (var i = 0, l = data.length, record, ytype; i < l; i++) {
            record = data[i];
            ytype = record.ytype;
            if (ytype && ytype != '' && ytype != '--') {
                if (ytype.length < 3) {
                    record.ytype = '<span class="bubble"><b>' + ytype + '</b></span></a>';
                } else {
                    record.ytype = '<span class="bubble"><em>' + ytype + '</em></span></a>';
                }
            } else {
                record.ytype = '';
            }
            desc = record['name'];
            record['name_2'] = desc.length > 8 ? desc.substr(0, 8) + "..." : desc;
            arr.push(jdTpl.format(record));
        }
        $e("#jd_cxt").setHtml(arr.join(""));
        QZFL.lazyLoad.init($e('#jd_cxt img'));
    }, 'utf-8', false);
}
function addEventHandler() {
    var link = $('weiboLink'), links;
    var ids = ['qqdianying', 'qqyanchu', 'qqjingdian'];
    QZFL.event.addEvent(link, 'click', function() {
        PIAO.FormSender('http://act.piao.qq.com/comm/json.php', {mod: 4,act: 'util',fn: 'follow',ids: ids.join(','),callback: 'frame_callback'}, function(ret, dt) {
            var c = parseInt(dt.ret);
            switch (c) {
                case 6:
                    if (window.confirm("你还没有开通微博，现在开通吗？")) {
                        window.open("http://t.qq.com/");
                    }
                    break;
                case 3:
                case 5:
                    PIAO.login.open();
                    break;
                case 0:
                    PIAO.PopMsg.msg('感谢收听QQ票务的微博，票务小妹这厢有礼啦~', 'info_success');
                    break;
                default:
                    PIAO.PopMsg.msg('收听出现错误，请稍后重试。');
                    break;
            }
        }, 'POST', 'utf-8')
    });
    var links = $e('#rank_menu_ctx a');
    links.each(function(link, index) {
        QZFL.event.addEvent(link, 'mouseover', function(evt, rankMenuLink, rankMenuLinks) {
            var curCid = rankMenuLink.getAttribute('cid');
            rankMenuLinks.each(function(menu) {
                var cid = menu.getAttribute('cid');
                if (curCid == cid) {
                    menu.className = 'current';
                    $(cid).style.display = '';
                } else {
                    menu.className = '';
                    $(cid).style.display = 'none';
                }
            });
        }, [link, links]);
    });
}
function initHotCinemaOrMovie(city, hotCinemaArr) {
    var cinema, moviewillHtml = [];
    var movie_will = MovieData.movie_will, movieArr = [];
    if (city) {
        for (var i = 0, j = hotCinemaArr.length; i < j; i++) {
            cinema = hotCinemaArr[i];
            moviewillHtml.push('<li><span class="g_name"><a target="_blank" href="/dianying/cinema_detail.html?city=' + city.id + '&cinema=' + cinema.id + '">[' + city.name + ']' + cinema.name + '</a></span><span class="c_tx2">' + parseInt(cinema.lowest / 100) + '元起</span></li>');
        }
    } else {
        for (var movie in movie_will) {
            movieArr.push(movie_will[movie]);
        }
        movieArr = movieArr.sort(function(a, b) {
            return parseFloat(b.date) - parseFloat(a.date);
        });
        for (var i = 0; i < 4; i++) {
            moviewillHtml.push('<li><span class="g_name"><a target="_blank" href="/dianying/movie_detail.html?movie_name=' + encodeURIComponent(movieArr[i].name) + '">' + movieArr[i].name + '</a></span><span class="c_tx2">' + movieArr[i].date.substring(0, 4) + '-' + movieArr[i].date.substring(4, 6) + '-' + movieArr[i].date.substring(6, 8) + '</span></li>');
        }
    }
    $('moviewill_ctx').innerHTML = moviewillHtml.join('');
}
(function() {
    $e('div.piao_head .city_buy').hide();
    addEventHandler();
    initSlider();
})();
(function init() {
    if (PIAO.curCity == null) {
        window.setTimeout(arguments.callee, 100);
        return false;
    } else {
        PIAO.showToolBar();
        initMovie(function() {
            PIAO.quickBuy.addEventListener('firstLoad', initHotCinemaOrMovie);
            PIAO.quickBuy.init('search_tabs_ctx');
        });
        initYC();
        initJD();
        QZFL.lazyLoad.init();
    }
    setTimeout(function() {
        PIAO.getGDT('72058699716532947', 1, 'gdt_li', 'gdt_div', '', function(ret) {
            if (ret !== true) {
                $e('#act_list_ul li').each(function(el, i) {
                    if (i > 1) {
                        el.style.display = "";
                    }
                })
            }
        });
    }, 0);
})();
