MILoad = function(b, c) {
    var a = document.createElement('script');
    if (c) {
        a.onload = a.onerror = a.onreadystatechange = function() {
            var s = this.readyState;
            if (!s || (s && (s == 'loaded' || s == 'complete'))) {
                c(b);
            }
            a.parentNode.removeChild(a);
        }
    }
    a.setAttribute('type', 'text/javascript');
    a.setAttribute('charset', 'utf-8');
    a.setAttribute('src', b);
    document.getElementsByTagName('head')[0].appendChild(a)
};