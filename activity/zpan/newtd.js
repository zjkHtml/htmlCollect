(function(){
  var stime = new Date().getTime() / 1000,
    pvid = '',
    ro = window.MS_RO || '',
    s = ro || window.MS_S || '',
    str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    ref = encodeURIComponent(document.referrer),
    src = encodeURIComponent(window.location.href)
    rs = Math.random(),
    distance = (parseQueryString()['distance'] || null),
    uuid = window.MS_UUID || ((!parseQueryString()['uuid'] || parseQueryString()['uuid'] === '__UUID__') ? document.cookie.replace(/(?:(?:^|.*;\s*)uuid\s*\=\s*([^;]*).*$)|^.*$/, "$1") : parseQueryString()['uuid']);
  for (var i = 0; i < 16; i++) {pvid += str[Math.floor(Math.random() * str.length)]}
  window.onbeforeunload = function() {
    var url_ = document.location.protocol + '//cm.1rtb.com/track?',
      etime = new Date().getTime() / 1000,
      sType = 'leave';

    img = new Image(1, 1);
    img.src = url_ + serialize([],{
      pvid : pvid,
      etime : etime,
      stime : stime,
      sType : sType,
      ref : ref,
      src : src,
      uuid : uuid,
      s : s
    });
  }
  function Pd(url) {
    var Md = "https:" == document.location.protocol ? "https://cm.1rtb.com": "http://cm.1rtb.com",
      host = Md + "/track?",
      img = new Image(1, 1);
    img.src = host + url;
    img.onload = function() {
        loadJS("/html/mapping.html");           
    };
  }
  function parseQueryString () {
    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
  };
  function getKeys(a) {
    if (Object.keys) {
        return Object.keys(a)
    }
    var b = [];
    for (var c in a) {
        if (a.hasOwnProperty(c)) {
            b.push(c)
        }
    }
    return b
  };
  function loadJS(path) {
    var mtd = document.createElement('iframe'); mtd.async = true;
    mtd.src = ('https:' == document.location.protocol ? 'https://d.1rtb.com' : 'http://d.1rtb.com') + path;
    mtd.width = 0; mtd.height = 0; mtd.setAttribute("frameborder","0",0);
    mtd.style.display = "none";
    var s = document.getElementsByTagName('body')[0]; s.parentNode.insertBefore(mtd, s);
  }
  function serialize(m, a){
    var n = getKeys(a);
    var i = [];
    var b = [];
    for (var c = 0; c < n.length; c++) {
        var o = false;
        for (var p = 0; p < m.length; p++) {
            if (m[p] == n[c]) {
                o = true
            }
        }
        if (o == false) {
            i.push(n[c])
        }
    }
    for (var c = 0; c < i.length; c++) {
        b.push(i[c] + "=" + encodeURIComponent(a[i[c]]))
    }
    b = b.join("&");
    return b
  };
  function extend(e, t, n) {
    for (key in t)
        n && (isPlainObject(t[key]) || isArray(t[key])) ? (isPlainObject(t[key]) && !isPlainObject(e[key]) && (e[key] = {}),
        isArray(t[key]) && !isArray(e[key]) && (e[key] = []),
        extend(e[key], t[key], n)) : void 0 !== t[key] && (e[key] = t[key]);
    return e
  }
  function isObject(e) {
      return "object" == typeof e
  }
  function isWindow(e) {
      return null != e && e == e.window
  }
  function isPlainObject(e) {
      return isObject(e) && !isWindow(e) && "isPrototypeOf"in e && "[object Object]" === Object.prototype.toString.call(e)
  }
  function isArray(e) {
      return e instanceof Array
  }
  

  Pd(serialize([],extend({
    pvid : pvid,
    s : s,
    ref : ref,
    src : src,
    rs : Math.random(),
    uuid : uuid,
    sType : 'eng'
  })))
  window.MS_TRANSFORM = function(data){
    Pd(serialize([],extend({
      pvid : pvid,
      s : s,
      ref : ref,
      src : src,
      rs : Math.random(),
      uuid : uuid,
      sType : 'act'
    },data)))
  }
})();