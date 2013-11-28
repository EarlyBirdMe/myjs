var Focus = {};
Focus.init = function (picAPre, picImgPre, count, leftBtn, rightBtn, dotDiv, interval) {
    this.currentPos = 1;
    this.picAPrefix = picAPre;
    this.picImgPrefix = picImgPre;
    this.picCount = count;
    this.listener = null;
    this.interval = interval;
    var leftB = document.getElementById(leftBtn);
    var rightB = document.getElementById(rightBtn);
    this.picWidth = document.getElementById(this.picImgPrefix + '1').clientWidth;
    this.interv = null;
    this.isFirst = true;
    this.isTurningLeft = false;
    this.isTurningright = false;
    this.isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
    if (dotDiv != null && dotDiv != '') {
        this.dotDom = document.getElementById(dotDiv);
        var dotList = this.dotDom.getElementsByTagName('a');
        var that = this;
        for (var j = 0; j < dotList.length; j++) {
            dotList[j].onmouseover = (function () {
                var n = j + 1;
                return function () {
                    that.jumpPic(n);
                };
            })();
        }
    }
    var that = this;
    if (leftB != null && rightB != null) {
        leftB.onclick = (function () {
            return function () {
                that.showPicP();
            };
        })();
        rightB.onclick = (function () {
            return function () {
                that.showPicN();
            };
        })();
    }
    for (var i = 1; i <= this.picCount; i++) {
        document.getElementById(this.picAPrefix + i).onmouseover = (function () {
            return function () {
                that.pause();
            };
        })();
        document.getElementById(this.picAPrefix + i).onmouseout = (function () {
            return function () {
                that.resume();
            };
        })();
    }
};
Focus.pause = function () {
    if (this.listener != null) {
        clearTimeout(this.listener);
    }
    if (this.interv != null) {
        clearTimeout(this.interv);
    }
}, Focus.resume = function () {
    var that = this;
    this.listener = setTimeout(function () {
        that.showPic(null, 1, null);
        return false;
    }, this.interval);
}, Focus.showPic = function (n, auto, direct) {
    if (this.listener != null) {
        clearTimeout(this.listener);
    }
    if (this.interv != null) {
        clearTimeout(this.interv);
    }
    if (n == null) {
        n = this.currentPos;
    }
    if (n > this.picCount) {
        n = 1;
    }
    if (n < 1) {
        n = this.picCount;
    }
    var that = this;
    if (this.isFirst) {
        this.currentPos = n;
        var lastPos = this.getPreIdx(this.currentPos);
        var nextPos = this.getNextIdx(this.currentPos);
        this.loadPic(nextPos);
        this.setPicOrder(this.currentPos, nextPos);
        this.setDot(1);
        this.isFirst = false;
        this.toIdx = nextPos;
        this.listener = setTimeout(function () {
            that.showPic(this.currentPos, 1);
            return false;
        }, this.interval);
    } else if (auto != null && auto == 1) {
        this.currentPos = n;
        var lastPos = this.getPreIdx(this.currentPos);
        var nextPos = this.getNextIdx(this.currentPos);
        this.loadPic(nextPos);
        this.setPicOrder(this.currentPos, nextPos);
        this.setDot(nextPos);
        this.toIdx = nextPos;
        this.interv = setInterval(this.rollLeft(), 1);
        this.listener = setTimeout(function () {
            that.showPic(nextPos, 1);
            return false;
        }, this.interval);
    } else if (direct != null) {
        this.setDot(n);
        this.loadPic(n);
        this.setPicOrder(this.currentPos, n);
        this.toIdx = n;
        var nextPos = this.getNextIdx(n);
        if (direct == 'left') {
            this.interv = setInterval(this.rollLeft(), 1);
            this.listener = setTimeout(function () {
                that.showPic(n, 1);
                return false;
            }, this.interval);
        } else if (direct == 'right') {
            this.interv = setInterval(this.rollRight(), 1);
            this.listener = setTimeout(function () {
                that.showPic(n, 1);
                return false;
            }, this.interval);
        }
    }
}, Focus.setDot = function (n) {
    if (this.dotDom != null) {
        var dotList = this.dotDom.getElementsByTagName('a');
        for (var j = 0; j < dotList.length; j++) {
            if (j == n - 1) {
                dotList[j].className = 'def';
            } else {
                dotList[j].className = '';
            }
        }
    }
}, Focus.jumpPic = function (n) {
    if (n < this.currentPos) {
        this.showPic(n, 0, 'right');
    } else if (n > this.currentPos) {
        this.showPic(n, 0, 'left');
    }
}, Focus.loadPic = function (n) {
    if (n > this.picCount) {
        n = 1;
    }
    if (n < 1) {
        n = this.picCount;
    }
    var img = document.getElementById(this.picImgPrefix + n);
    var loaded = img.getAttribute('loaded');
    var sr = img.getAttribute('sr');
    if (sr != null && (loaded == null || loaded == '0')) {
        img.src = sr;
        img.setAttribute('loaded', '1');
    }
}, Focus.setPicOrder = function (curPos, nextPos) {
    for (var i = 1; i <= this.picCount; i++) {
        document.getElementById(this.picAPrefix + i).style.left = '0px';
        if (this.isIE) {
            if (document.getElementById(this.picAPrefix + i).filters.alpha) {
                document.getElementById(this.picAPrefix + i).style.filter = '';
            } else {
                document.getElementById(this.picAPrefix + i).style.filter = '';
            }
        } else {
            document.getElementById(this.picAPrefix + i).style.opacity = 1;
        }
        if (i == this.currentPos) {
            document.getElementById(this.picAPrefix + curPos).style.display = '';
            document.getElementById(this.picAPrefix + curPos).style.zIndex = this.picCount;
        } else if (i == nextPos) {
            document.getElementById(this.picAPrefix + nextPos).style.display = '';
            document.getElementById(this.picAPrefix + nextPos).style.zIndex = this.picCount - 1;
        } else {
            document.getElementById(this.picAPrefix + i).style.display = 'none';
            document.getElementById(this.picAPrefix + i).style.zIndex = 1;
        }
    }
}, Focus.showPicN = function () {
    if (this.listener != null) {
        clearTimeout(this.listener);
    }
    if (this.interv != null) {
        clearTimeout(this.interv);
    }
    if (this.isTurningLeft) {
        Focus.isTurningLeft = false;
        clearInterval(Focus.interv);
        Focus.currentPos = Focus.getNextIdx(Focus.currentPos);
        Focus.loadPic(Focus.getNextIdx(Focus.currentPos));
    }
    var lastPos = this.getPreIdx(this.currentPos);
    var nextPos = this.getNextIdx(this.currentPos);
    this.setDot(nextPos);
    this.loadPic(nextPos);
    this.setPicOrder(this.currentPos, nextPos);
    this.toIdx = nextPos;
    this.interv = setInterval(Focus.rollLeft(), 1);
    var that = this;
    this.listener = setTimeout(function () {
        that.showPic(nextPos, 1);
        return false;
    }, this.interval + 100);
}, Focus.showPicP = function () {
    if (this.listener != null) {
        clearTimeout(this.listener);
    }
    if (this.interv != null) {
        clearTimeout(this.interv);
    }
    if (this.isTurningRight) {
        Focus.isTurningRight = false;
        clearInterval(Focus.interv);
        Focus.currentPos = Focus.getPreIdx(Focus.currentPos);
        Focus.loadPic(Focus.getPreIdx(Focus.currentPos));
    }
    var lastPos = this.getNextIdx(this.currentPos);
    var nextPos = this.getPreIdx(this.currentPos);
    this.setDot(nextPos);
    this.loadPic(nextPos);
    this.setPicOrder(this.currentPos, nextPos);
    this.toIdx = nextPos;
    this.interv = setInterval(Focus.rollRight(), 1);
    var that = this;
    this.listener = setTimeout(function () {
        that.showPic(nextPos, 1);
        return false;
    }, this.interval + 100);
}, Focus.rollLeft = function () {
    return function () {
        Focus.isTurningLeft = true;
        var curPic = document.getElementById(Focus.picAPrefix + Focus.currentPos);
        if (Focus.isIE) {
            if (curPic.filters.alpha) {
            } else {
                curPic.style.filter = 'alpha(opacity=100)';
            }
            var opc = curPic.filters.alpha.opacity;
            if (opc - 10 >= 0) {
                curPic.filters.alpha.opacity -= 10;
                return;
            }
        } else {
            var opc = (curPic.style.opacity == '' ? 100 : curPic.style.opacity * 100);
            if (opc - 10 >= 0) {
                curPic.style.opacity = (opc - 10) / 100;
                return;
            }
        }
        Focus.isTurningLeft = false;
        clearInterval(Focus.interv);
        Focus.currentPos = Focus.toIdx;
        var nextPos = Focus.getNextIdx(Focus.currentPos);
        Focus.loadPic(nextPos);
        Focus.setPicOrder(Focus.currentPos, nextPos);
    };
}, Focus.rollRight = function () {
    return function () {
        Focus.isTurningRight = true;
        var curPic = document.getElementById(Focus.picAPrefix + Focus.currentPos);
        if (Focus.isIE) {
            if (curPic.filters.alpha) {
            } else {
                curPic.style.filter = 'alpha(opacity=100)';
            }
            var opc = curPic.filters.alpha.opacity;
            if (opc - 10 >= 0) {
                curPic.filters.alpha.opacity -= 10;
                return;
            }
        } else {
            var opc = (curPic.style.opacity == '' ? 100 : curPic.style.opacity * 100);
            if (opc - 10 >= 0) {
                curPic.style.opacity = (opc - 10) / 100;
                return;
            }
        }
        Focus.isTurningRight = false;
        clearInterval(Focus.interv);
        Focus.currentPos = Focus.toIdx;
        var nextPos = Focus.getNextIdx(Focus.currentPos);
        Focus.loadPic(nextPos);
        Focus.setPicOrder(Focus.currentPos, nextPos);
    };
}, Focus.getNextIdx = function (n) {
    if (n >= this.picCount || n < 1) {
        return 1;
    } else {
        return n + 1;
    }
}, Focus.getPreIdx = function (n) {
    if (n > this.picCount || n <= 1) {
        return this.picCount;
    } else {
        return n - 1;
    }
}