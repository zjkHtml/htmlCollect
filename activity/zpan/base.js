var baseJs = {
	_getQueryString: function(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
			n = window.location.search.substr(1).match(t);
		return null != n ? unescape(n[2]) : null
	},
	_getDeviceInfo: function() {
		return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 2 : 1
	},
	_ajax: function(e, t, n, o, r) {
		return $.ajax({
			url: e,
			data: t || {},
			type: n || "POST",
			async: o || !0,
			success: r,
			error: function(e) {
				console.log("网络异常，请稍后重试！")
			}
		})
	},
	_requereStyle: function(e) {
		return {
			init: function(e) {
				this.param = e
			},
			renderStyle: function() {},
			setConfig: function() {}
		}
	},
	_setRem: function() {
		var e = document.documentElement,
			t = "orientationchange" in window ? "orientationchange" : "resize",
			n = function() {
				var t = e.clientWidth || 375;
				(t = t > 750 ? 750 : t) && (e.style.fontSize = t / 375 * 20 + "px", window.remscale = t / 375)
			};
		document.addEventListener && (window.addEventListener(t, n, !1), document.addEventListener("DOMContentLoaded", n, !1))
	},
	isWeiXin: function() {
		return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? 1 : 0
	},
	getLoaded: function(e, t, n) {
		var o = parseInt(localStorage.getItem("settime")),
			r = parseInt(localStorage.getItem("beforeday"));
		if (!o || !r) return localStorage.setItem("settime", e), void localStorage.setItem("beforeday", t);
		if ((new Date).getTime() > o) {
			var i = parseInt((new Date).getDate());
			return !(i <= r) && (n(), localStorage.setItem("beforeday", i), !0)
		}
		return !0
	},
	getSesionLoaded: function(e, t) {
		var n = sessionStorage.getItem("returnloaded"),
			o = sessionStorage.getItem("skiploaded");
		n || "return" != e || (t(), sessionStorage.setItem("returnloaded", "returnloaded")), o || "skip" != e || (t(), sessionStorage.setItem("skiploaded", "skiploaded"))
	},
	setCookie: function(e, t) {
		var n = new Date;
		n.setTime(n.getTime() + 2592e6), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString()
	},
	getCookie: function(e) {
		var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
		return (t = document.cookie.match(n)) ? unescape(t[2]) : null
	},
	delCookie: function(e) {
		var t = this,
			n = new Date;
		n.setTime(n.getTime() - 1);
		var o = t.getCookie(e);
		null != o && (document.cookie = e + "=" + o + ";expires=" + n.toGMTString())
	}
};