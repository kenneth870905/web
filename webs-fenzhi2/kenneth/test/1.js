console.log('1.js')
!
function(t, r) {
	"object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.initNECaptcha = r() : t.initNECaptcha = r()
}(this, function() {
	return function(t) {
		function r(e) {
			if (n[e]) return n[e].exports;
			var o = n[e] = {
				exports: {},
				id: e,
				loaded: !1
			};
			return t[e].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
		}
		var n = {};
		return r.m = t, r.c = n, r.p = "/", r(0)
	}([function(t, r, n) {
		n(18), n(21), n(20), n(17), n(19);
		var e = n(15);
		t.exports = e
	}, function(t, r) {
		function n(t, r, n) {
			return r in t ? Object.defineProperty(t, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[r] = n, t
		}
		function e(t, r) {
			function n() {}
			n.prototype = r.prototype, t.prototype = new n, t.prototype.constructor = t
		}
		function o(t, r, n) {
			this.name = "CaptchaError", this.code = t, this.message = t + ("(" + E[t] + ")") + (r ? " - " + r : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.data = n || {}
		}
		var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, c = "prototype", u = 100, s = 200, l = 300, f = 500, p = 501, h = 502, d = 503, y = 504, v = 600, m = 1e3, E = (i = {}, n(i, u, "script error"), n(i, s, "business error"), n(i, l, "unpass error"), n(i, f, "request error"), n(i, p, "request api error"), n(i, h, "request script error"), n(i, d, "request img error"), n(i, y, "request timeout error"), n(i, v, "request anticheat token error"), n(i, m, "unknown error"), i);
		e(o, Error), o[c].toString = function() {
			var t = String(this.stack);
			return 0 === t.indexOf("CaptchaError:") ? t : this.name + ": " + this.message + (t ? "\n    " + t : "")
		}, o.set = function(t, r) {
			"number" == typeof t && "string" == typeof r && (E[t] = r), "object" === ("undefined" == typeof t ? "undefined" : a(t)) && t && Object.assign(E, t)
		}, o.get = function(t) {
			return E[t]
		}, o.remove = function(t) {
			String(t) in E && delete E[t]
		}, r = t.exports = o, r.SCRIPT_ERROR = u, r.BUSINESS_ERROR = s, r.UNPASS_ERROR = l, r.REQUEST_ERROR = f, r.REQUEST_API_ERROR = p, r.REQUEST_SCRIPT_ERROR = h, r.REQUEST_IMG_ERROR = d, r.REQUEST_TIMEOUT_ERROR = y, r.ANTICHEAT_TOKEN_ERROR = v, r.UNKNOWN_ERROR = m
	}, function(t, r, n) {
		function e(t, r) {
			var n = {};
			for (var e in t) r.indexOf(e) >= 0 || Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
			return n
		}
		var o = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, i = n(22), a = n(3), c = n(10), u = n(13), s = n(9), l = 0, f = function(t) {
			return "string" == typeof t ? [t, t] : Array.isArray(t) && 1 === t.length ? t.concat(t) : t
		}, p = function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
			return parseInt((new Date).valueOf() / t, 10)
		}, h = {
			script: function(t, r) {
				var n = this;
				this.cacheTime && (t = t + "?v=" + p(this.cacheTime)), i(t, {
					charset: "UTF-8"
				}, function(e, o) {
					var i = n.detectKey;
					if (e || i && !window[i]) {
						var a = new Error("Failed to load script(" + t + ")." + (e ? e.message : "unreliable script"));
						return a.data = {
							url: t,
							retry: !! n._options.retry
						}, void r(a)
					}
					r(o)
				})
			},
			image: function(t, r) {
				var n = this,
					e = document.createElement("img");
				e.onload = function() {
					e.onload = e.onerror = null, r({
						width: e.width,
						height: e.height,
						src: t
					})
				}, e.onerror = function(o) {
					e.onload = e.onerror = null;
					var i = new Error("Failed to load image(" + t + ")." + o.message);
					i.data = {
						url: t,
						retry: !! n._options.retry
					}, r(i)
				}, e.src = t
			},
			api: function(t, r, n) {
				var e = this;
				u(t, n, function(n, o) {
					if (n) {
						var i = new Error("Failed to request api(" + t + ")." + n.message);
						return i.data = {
							url: t,
							retry: !! e._options.retry
						}, void r(i)
					}
					r(o)
				}, {
					timeout: this.timeout
				})
			}
		}, d = function(t) {
			this.id = t.id || "resource_" + l++, this.type = t.type || "script", this.url = t.url || "", this.payload = t.payload, this.timeout = t.timeout || 6e3, this.cacheTime = t.cacheTime ? parseInt(t.cacheTime, 10) : 0, this.detectKey = t.detectKey || "", this._options = t, a.call(this), this.load(), this.setTimeout()
		};
		c(d, a), Object.assign(d.prototype, {
			load: function() {
				var t = this,
					r = h[this.type];
				r && r.call(this, this.url, function(r) {
					return t.resolve(r)
				}, this.payload)
			},
			addSupport: function(t, r, n) {
				("function" != typeof h[t] || n) && (h[t] = r)
			},
			setTimeout: function() {
				var t = this;
				window.setTimeout(function() {
					var r = String(t.url),
						n = new Error("Timeout: failed to request " + t.type + "(" + r + ").");
					n.data = {
						url: r
					}, t.resolve(n)
				}, this.timeout)
			}
		}), d.SUPPORTS = h;
		var y = function(t) {
				h.hasOwnProperty(t) && (d[t] = function(r) {
					var n = r.disableRetry,
						i = r.onTryError,
						c = r.checkResult,
						u = e(r, ["disableRetry", "onTryError", "checkResult"]);
					if (n) {
						var l = u.url;
						return Array.isArray(l) && (l = l[0] || ""), new d(o({}, u, {
							url: l,
							type: t
						}))
					}
					var p = f(r.url),
						h = new a,
						y = function v() {
							var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
								n = function(n) {
									var e = p.length;
									r < e - 1 ? v(r + 1) : r === e - 1 && (n.data = o({}, n.data, {
										url: String(p)
									}), h.resolve(n)), "function" == typeof i && i(n, {
										type: t,
										urls: p,
										url: l,
										index: r
									})
								},
								e = function(t) {
									var r = t instanceof Error ? t : new Error("Failed to check result of " + l);
									r.data = {
										url: l,
										retry: !! u.retry
									}, n(r)
								},
								l = p[r],
								f = new d(o({}, u, {
									type: t,
									url: l,
									retry: r > 0
								}));
							f.then(function(t) {
								if (!s.isFn(c)) return h.resolve(t);
								var r = c(t);
								r instanceof a ? r.then(function() {
									return h.resolve(t)
								})["catch"](function(t) {
									return e(t)
								}) : r ? h.resolve(t) : e()
							})["catch"](function(t) {
								return n(t)
							})
						};
					return y(0), h
				})
			};
		for (var v in h) y(v);
		d.all = function(t) {
			var r = 0,
				n = !1,
				e = new a,
				o = [];
			return t.map(function(i, a) {
				i.then(function(i) {
					n || (o[a] = i, r++, r === t.length && e.resolve(o))
				})["catch"](function(t) {
					n = !0, e.resolve(t)
				})
			}), e
		}, t.exports = d
	}, function(t, r) {
		function n() {
			this._state = i, this._arg = void 0, this._fullfilledCallback = [], this._rejectedCallback = []
		}
		function e(t) {
			window.setTimeout(t, 1)
		}
		function o(t) {
			if (t) {
				var r = new n;
				t.then = function() {
					return r.then.apply(r, arguments)
				}, t["catch"] = function() {
					return r["catch"].apply(r, arguments)
				}, t["finally"] = function() {
					return r["finally"].apply(r, arguments)
				}, t.resolve = function() {
					return r.resolve.apply(r, arguments)
				}
			}
		}
		var i = "pending",
			a = "fullfilled",
			c = "rejected";
		Object.assign(n.prototype, {
			then: function(t, r) {
				var n = function(t) {
						return "function" == typeof t
					};
				return n(t) && this._fullfilledCallback.push(t), n(r) && this._rejectedCallback.push(r), this._state !== i && this._emit(this._state), this
			},
			"catch": function(t) {
				return this.then(null, t)
			},
			"finally": function(t) {
				return this.then(t, t)
			},
			resolve: function(t) {
				this._state === i && (t instanceof Error ? this._state = c : this._state = a, this._arg = t, this._emit(this._state))
			},
			_emit: function(t) {
				var r = this;
				switch (t) {
				case a:
					e(function() {
						r._fullfilledCallback.map(function(t) {
							return t(r._arg)
						}), r._fullfilledCallback = [], r._rejectedCallback = []
					});
					break;
				case c:
					e(function() {
						r._rejectedCallback.map(function(t) {
							return t(r._arg)
						}), r._fullfilledCallback = [], r._rejectedCallback = []
					})
				}
			}
		}), n.mixin = o, t.exports = n
	}, function(t, r) {
		t.exports = function(t) {
			var r = t.protocol,
				n = void 0 === r ? "" : r,
				e = t.host,
				o = void 0 === e ? "" : e,
				i = t.port,
				a = void 0 === i ? "" : i,
				c = t.path,
				u = void 0 === c ? "" : c,
				s = t.search,
				l = void 0 === s ? "" : s,
				f = t.hash,
				p = void 0 === f ? "" : f;
			if (n && (n = n.replace(/:?\/{0,2}$/, "://")), o) {
				var h = o.match(/^([-0-9a-zA-Z.:]*)(\/.*)?/);
				o = h[1], u = (h[2] || "") + "/" + u
			}
			if (!o && (n = ""), a) {
				if (!o) throw Error('"host" is required, if "port" was provided');
				a = ":" + a
			}
			return u && (u = u.replace(/^\/*|\/+/g, "/")), l && (l = l.replace(/^\??/, "?")), p && (p = p.replace(/^#?/, "#")), n + o + a + u + l + p
		}
	}, function(t, r) {
		r.CAPTCHA_TYPE = {
			JIGSAW: 2,
			POINT: 3,
			SMS: 4,
			INTELLISENSE: 5,
			ICON_POINT: 7,
			INFERENCE: 9
		}, r.CAPTCHA_CLASS = {
			CAPTCHA: "yidun",
			PANEL: "yidun_panel",
			SLIDE_INDICATOR: "yidun_slide_indicator",
			SLIDER: "yidun_slider",
			JIGSAW: "yidun_jigsaw",
			POINT: "point",
			SMS: "yidun_sms",
			TIPS: "yidun_tips",
			REFRESH: "yidun_refresh",
			CONTROL: "yidun_control",
			BGIMG: "yidun_bgimg",
			INPUT: "yidun_input",
			LOADBOX: "yidun_loadbox",
			LOADICON: "yidun_loadicon",
			LOADTEXT: "yidun_loadtext",
			ERROR: "error",
			WARN: "warn",
			VERIFY: "verifying",
			SUCCESS: "success",
			LOADING: "loading",
			LOADFAIL: "loadfail"
		}, r.WIDTH_LIMIT = [220, 1e4], r.SAMPLE_NUM = 50, r.DEVICE = {
			MOUSE: 1,
			TOUCH: 2,
			MOUSE_TOUCH: 3
		}, r.MAX_VERIFICATION = 5, r.RTL_LANGS = ["ar", "he"], r.CACHE_MIN = 6e4, r.FILE_DETECT_KEY = {
			core: "NECaptcha",
			light: "NECaptcha_theme_light",
			dark: "NECaptcha_theme_dark",
			plugins: "NECaptcha_plugin",
			watchman: "initWatchman"
		}, r.FEEDBACK_URL = "http://support.dun.163.com/feedback/captcha", r.RUN_ENV = {
			WEB: 10,
			ANDROID: 20,
			IOS: 30,
			MINIPROGRAM: 40,
			JUMPER_MINI_PROGRAM: 50
		}
	}, function(t, r, n) {
		var e = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, o = n(2), i = n(12);
		t.exports = function(t) {
			return function(r, n, a, c) {
				Object.assign(n, {
					referer: i()
				});
				var u = e({}, t, c, {
					url: r,
					payload: n
				});
				o.api(u).then(function(t) {
					return a(null, t)
				})["catch"](a)
			}
		}
	}, function(t, r, n) {
		var e = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, o = n(11), i = n(1), a = i.REQUEST_SCRIPT_ERROR, c = i.REQUEST_IMG_ERROR, u = i.REQUEST_API_ERROR;
		t.exports = function(t, r) {
			return function(n, s) {
				var l = s.type,
					f = s.url,
					p = s.index,
					h = {
						script: a,
						image: c,
						api: u
					},
					d = new i(h[l], n.message, e({}, r, {
						url: f
					}));
				o(d, t, {
					times: p + 1
				})
			}
		}
	}, function(t, r, n) {
		var e = n(5),
			o = e.FILE_DETECT_KEY;
		t.exports = function(t) {
			var r = Object.keys(o);
			if (r.indexOf(t) > -1) return o[t];
			for (var n = 0, e = r.length; n < e; n++) if (new RegExp("/" + r[n] + "\\.(\\S*?\\.min\\.)?js").test(t)) return o[r[n]];
			return ""
		}
	}, function(t, r) {
		var n = {}.toString,
			e = {
				slice: function(t, r, n) {
					for (var e = [], o = r || 0, i = n || t.length; o < i; o++) e.push(o);
					return e
				},
				getObjKey: function(t, r) {
					for (var n in t) if (t.hasOwnProperty(n) && t[n] === r) return n
				},
				typeOf: function(t) {
					return null == t ? String(t) : n.call(t).slice(8, -1).toLowerCase()
				},
				isFn: function(t) {
					return "function" == typeof t
				},
				log: function(t, r) {
					var n = ["info", "warn", "error"];
					return "string" == typeof t && ~n.indexOf(t) ? void(console && console[t]("[NECaptcha] " + r)) : void e.error('util.log(type, msg): "type" must be one string of ' + n.toString())
				},
				warn: function(t) {
					e.log("warn", t)
				},
				error: function(t) {
					e.log("error", t)
				},
				assert: function(t, r) {
					if (!t) throw new Error("[NECaptcha] " + r)
				},
				msie: function o() {
					var t = navigator.userAgent,
						o = parseInt((/msie (\d+)/.exec(t.toLowerCase()) || [])[1]);
					return isNaN(o) && (o = parseInt((/trident\/.*; rv:(\d+)/.exec(t.toLowerCase()) || [])[1])), o
				},
				now: function() {
					return (new Date).getTime()
				},
				getIn: function(t, r, n) {
					if ("[object Object]" !== Object.prototype.toString.call(t)) return n;
					"string" == typeof r && (r = r.split("."));
					for (var e = 0, o = r.length; e < o; e++) {
						var i = r[e];
						if (e < o - 1 && !t[i]) return n || void 0;
						t = t[i]
					}
					return t
				},
				raf: function i(t) {
					var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
					function(t) {
						window.setTimeout(t, 16)
					};
					i(t)
				},
				nextFrame: function(t) {
					e.raf(function() {
						return e.raf(t)
					})
				},
				sample: function(t, r) {
					var n = t.length;
					if (n <= r) return t;
					for (var e = [], o = 0, i = 0; i < n; i++) i >= o * (n - 1) / (r - 1) && (e.push(t[i]), o += 1);
					return e
				},
				template: function(t, r) {
					var n = function(t) {
							return t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
						},
						e = {
							start: "<%",
							end: "%>",
							interpolate: /<%=(.+?)%>/g
						},
						o = e,
						i = new RegExp("'(?=[^" + o.end.substr(0, 1) + "]*" + n(o.end) + ")", "g"),
						a = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").replace(i, "\t").split("'").join("\\'").split("\t").join("'").replace(o.interpolate, "',$1,'").split(o.start).join("');").split(o.end).join("p.push('") + "');}return p.join('');");
					return r ? a(r) : a
				},
				uuid: function a(t, r) {
					var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
						a = [],
						e = void 0;
					if (r = r || n.length, t) for (e = 0; e < t; e++) a[e] = n[0 | Math.random() * r];
					else {
						var o = void 0;
						for (a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4", e = 0; e < 36; e++) a[e] || (o = 0 | 16 * Math.random(), a[e] = n[19 === e ? 3 & o | 8 : o])
					}
					return a.join("")
				},
				reverse: function(t) {
					return Array.isArray(t) ? t.reverse() : "string" === e.typeOf(t) ? t.split("").reverse().join("") : t
				},
				encodeUrlParams: function(t) {
					var r = [];
					for (var n in t) t.hasOwnProperty(n) && r.push(window.encodeURIComponent(n) + "=" + window.encodeURIComponent(t[n]));
					return r.join("&")
				}
			};
		t.exports = e
	}, function(t, r) {
		t.exports = function(t, r) {
			function n() {}
			n.prototype = r.prototype, t.prototype = new n, t.prototype.constructor = t
		}
	}, function(t, r, n) {
		function e(t, r, n) {
			return r in t ? Object.defineProperty(t, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[r] = n, t
		}
		var o, i = n(6),
			a = n(4),
			c = n(1),
			u = c.REQUEST_SCRIPT_ERROR,
			s = c.REQUEST_API_ERROR,
			l = c.REQUEST_IMG_ERROR,
			f = c.BUSINESS_ERROR,
			p = c.UNPASS_ERROR,
			h = c.ANTICHEAT_TOKEN_ERROR,
			d = n(3),
			y = n(2),
			v = n(9),
			m = v.uuid,
			E = (o = {}, e(o, s, "api"), e(o, l, "image"), e(o, u, "script"), e(o, f, "business"), e(o, p, "unpass"), e(o, h, "anticheat"), o),
			_ = null;
		t.exports = function(t, r, n) {
			var e = r.protocol,
				o = r.apiServer,
				c = r.__serverConfig__,
				u = void 0 === c ? {} : c,
				s = r.captchaId,
				l = r.timeout,
				f = new d,
				p = function(t) {
					var r = "/api/v2/collect";
					return Array.isArray(t) ? t.map(function(t) {
						return a({
							protocol: e,
							host: t,
							path: r
						})
					}) : a({
						protocol: e,
						host: t,
						path: r
					})
				},
				h = p(o || u.apiServer || ["c.dun.163yun.com", "c.dun.163.com"]),
				v = i({
					timeout: l,
					disableRetry: !0
				}),
				g = t.data,
				R = Object.assign({
					id: s,
					token: g.token || "",
					type: E[t.code] || "other",
					target: g.url || g.resource || "",
					message: t.toString()
                }, n);
                console.log(R)
			null == window.ip && (window.ip = function(t, r, n) {
				_ = {
					ip: t,
					dns: n
				}
			});
			var O = e + "://only-d-" + m(32) + "-" + (new Date).valueOf() + ".nstool.netease.com/ip.js";
			return y.script({
				url: O,
				timeout: l,
				checkResult: function(t) {
					t && t.parentElement.removeChild(t);
					var r = new d;
					return _ && _.dns ? (r.resolve(), r) : (setTimeout(function() {
						return r.resolve(new Error("try to collect dns again"))
					}, 100), r)
				}
			})["finally"](function() {
				Object.assign(R, _), v(h, R, function(t, r) {
					if (t || r.error) {
						console && console.warn("Failed to collect error.");
						var n = new Error(t ? t.message : r.msg);
						return n.data = {
							url: h
						}, void f.resolve(n)
					}
					f.resolve()
				})
			}), f
		}
	}, function(t, r) {
		t.exports = function() {
			return location.href.replace(/\?[\s\S]*/, "").substring(0, 128)
		}
	}, function(t, r) {
		function n() {}
		function e(t, r, e, a) {
			function c() {
				l.parentNode && l.parentNode.removeChild(l), window[d] = n, f && clearTimeout(f)
			}
			function u() {
				window[d] && c()
			}
			function s(t) {
				var r = [];
				for (var n in t) t.hasOwnProperty(n) && r.push(m(n) + "=" + m(t[n]));
				return r.join("&")
			}
			"object" === ("undefined" == typeof e ? "undefined" : o(e)) && (a = e, e = null), "function" == typeof r && (e = r, r = null), a || (a = {});
			var l, f, p = Math.random().toString(36).slice(2, 9),
				h = a.prefix || "__JSONP",
				d = a.name || h + ("_" + p) + ("_" + i++),
				y = a.param || "callback",
				v = a.timeout || 6e3,
				m = window.encodeURIComponent,
				E = document.getElementsByTagName("script")[0] || document.head;
			return v && (f = setTimeout(function() {
				c(), e && e(new Error("Timeout"))
			}, v)), window[d] = function(t) {
				c(), e && e(null, t)
			}, r && (t = t.split("?")[0]), t += (~t.indexOf("?") ? "&" : "?") + s(r) + "&" + y + "=" + m(d), t = t.replace("?&", "?"), l = document.createElement("script"), l.type = "text/javascript", l.src = t, E.parentNode.insertBefore(l, E), u
		}
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, i = 0;
		t.exports = e
	}, function(t, r, n) {
		function e() {
			this._events = {}
		}
		var o = n(3);
		t.exports = e, Object.assign(e.prototype, {
			on: function(t, r) {
				var n = this._events;
				return n[t] || (n[t] = []), n[t].push(r), this
			},
			once: function(t, r) {
				var n = this,
					e = function o() {
						r.apply(void 0, arguments), n.off(t, o)
					};
				return this.on(t, e)
			},
			off: function(t, r) {
				if (t) if (t && !r) this._events[t] = [];
				else {
					var n = this._events[t] || [],
						e = n.indexOf(r);
					e > -1 && n.splice(e, 1)
				} else this._events = {};
				return this
			},
			emit: function(t) {
				for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) n[e - 1] = arguments[e];
				var i = this._events[t] || [],
					a = new o,
					c = {},
					u = function s(t) {
						var r = i[t];
						if (!r) return void a.resolve(c);
						var e = !1,
							o = {
								async: function() {
									return e = !0, function(r) {
										return r instanceof Error ? void a.resolve(r) : void s(t + 1)
									}
								}
							};
						r.call.apply(r, [o].concat(n, [c])), !e && s(t + 1)
					};
				return u(0), a
			}
		})
	}, function(t, r, n) {
		function e(t, r, n) {
			r = r ||
			function() {}, n = n ||
			function(t) {
				console && console.error('[NECaptcha] initNECaptcha(config, onload, onerror) has thrown an error. If needed, handle it yourself in callback "onerror".\n', t)
			};
			var a = window.location.protocol.replace(":", ""),
				l = {
					protocol: "http" === a || "https" === a ? a : "https",
					timeout: 6e3,
					runEnv: p.WEB
				};
			t = Object.assign({}, l, t);
			var m = function(r) {
					var n = "plugins" + (y ? "" : ".min") + ".js";
					return Array.isArray(r) ? r.map(function(r) {
						return c({
							protocol: t.protocol,
							host: r,
							path: n
						})
					}) : c({
						protocol: t.protocol,
						host: r,
						path: n
					})
				},
				E = "loader_plugins",
				_ = v[E] || i.script({
					id: E,
					url: m(t.staticServer || ["cstaticdun.126.net", "cstatic.dun.163yun.com"]),
					timeout: t.timeout,
					cacheTime: f,
					onTryError: h(t),
					detectKey: d("plugins")
				});
			!v[E] && (v[E] = _), _.then(function() {
				var i = new o({
					captchaConfig: t,
					cache: v
				});
				i._hooks = {
					onload: r,
					onerror: n
				}, e.apply(i), i.run()
			})["catch"](function(t) {
				v[E] = null, n(new u(s, t.message, t.data))
			})
		}
		var o = n(16),
			i = n(2),
			a = n(3),
			c = n(4),
			u = n(1),
			s = u.REQUEST_SCRIPT_ERROR,
			l = n(5),
			f = l.CACHE_MIN,
			p = l.RUN_ENV,
			h = n(7),
			d = n(8),
			y = !1,
			v = {};
		e.use = function(t) {
			this._plugins || (this._plugins = []);
			var r = t.constructor,
				n = !! r.singleton,
				e = this._plugins.map(function(t) {
					return t.constructor
				}).indexOf(r) > -1;
			e && n || this._plugins.push(t)
		}, e.apply = function(t) {
			this._plugins && this._plugins.map(function(r) {
				return r.apply(t)
			})
		}, e.VERSION = "2.1.1", e.ResourceLoader = i, e.Thenable = a, e.CaptchaError = u, t.exports = e
	}, function(t, r, n) {
		function e(t, r) {
			if (!t) throw new Error("[NECaptcha Loader] " + r)
		}
		function o(t) {
			s.call(this), e(t.captchaConfig, 'option "captchaConfig" is required.'), e(t.cache, 'option "cache" is required.'), this._captchaConfig = t.captchaConfig, this._captchaHooks = t.captchaHooks, this._cache = t.cache, this._error = null
		}
		var i = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, a = n(6), c = n(4), u = n(1), s = n(14), l = n(10), f = n(2), p = n(7), h = n(8), d = n(5), y = d.CACHE_MIN, v = u.REQUEST_API_ERROR, m = u.REQUEST_SCRIPT_ERROR, E = u.UNKNOWN_ERROR, _ = !1;
		l(o, s), Object.assign(o.prototype, {
			run: function() {
				var t = this;
				this.fetchConfig(function() {
					return t.loadResources()
				})
			},
			fetchConfig: function(t) {
				var r = this,
					n = this._captchaConfig,
					e = n.captchaId,
					o = n.protocol,
					u = n.timeout,
					s = n.apiServer,
					l = n.__serverConfig__,
					f = n.ipv6,
					h = n.runEnv;
				null == s && (s = ["c.dun.163yun.com", "c.dun.163.com"]);
				var d = function() {
						var t = "/api/v2/getconf";
						return Array.isArray(s) ? s.map(function(r) {
							return c({
								protocol: o,
								host: r,
								path: t
							})
						}) : c({
							protocol: o,
							host: s,
							path: t
						})
					},
					y = d(),
					m = {
						id: e,
						ipv6: f,
						runEnv: h
					},
					E = {
						timeout: u
					},
					g = a(i({}, E, {
						onTryError: p(this._captchaConfig)
					})),
					R = function() {
						g(y, m, function(n, e) {
							if (n || e.error) {
								var o = n ? n.message : e.msg,
									i = new Error(o + " (" + y + ")");
								return i.data = {
									url: y
								}, void r.catchError(i, v)
							}
							var a = function(t) {
									var n = r._captchaConfig;
									null == n.apiServer && (n.apiServer = t.apiServer), null == n.staticServer && (n.staticServer = t.staticServers), n.theme = t.theme, n.acConfig = t.ac, n.__serverConfig__ = t
								},
								c = e.data;
							_ && l && (c = Object.assign({}, c, l)), a(c), r.emit("after-config", r._captchaConfig.__serverConfig__).then(t)["catch"](function(t) {
								return r.catchError(t)
							})
						})
					};
				this.emit("before-config", {
					params: m,
					jsonpOpts: E
				}).then(R)["catch"](function(t) {
					return r.catchError(t)
				})
			},
			loadResources: function() {
                console.log('loadResources')
				var t = this,
					r = this._captchaConfig,
					n = r.protocol,
					e = r.timeout,
					o = r.staticServer,
					i = r.__serverConfig__,
					a = function(t, r) {
						return Array.isArray(t) ? t.map(function(t) {
							return c({
								protocol: n,
								host: t,
								path: r
							})
						}) : c({
							protocol: n,
							host: t,
							path: r
						})
					};
				this.emit("before-load", o).then(function() {
					var r = i.resources.map(function(r) {
						var n = a(o, r),
							i = Array.isArray(n) ? n[0] : n,
							c = t._cache[i];
						return c || (c = f.script({
							id: i,
							url: n,
							timeout: e,
							cacheTime: 10 * y,
							onTryError: p(t._captchaConfig),
							detectKey: h(r)
						}), t._cache[i] = c, c["catch"](function() {
							t._cache[i] = null
						})), c
					});
					f.all(r).then(function() {
						t.emit("after-load")["catch"](function(r) {
							return t.catchError(r)
						})
					})["catch"](function(r) {
						return t.catchError(r, m)
					})
				})["catch"](function(r) {
					return t.catchError(r)
				})
			},
			catchError: function(t, r) {
				if (!this._error) {
					var n = new u(r || E, t.message, t.data);
					this._error = n, this.emit("error", n)
				}
			}
		}), t.exports = o
	}, function(t, r) {
		Array.isArray || (Array.isArray = function(t) {
			return "[object Array]" === Object.prototype.toString.call(t)
		})
	}, function(t, r) {
		"function" != typeof Object.assign && (Object.assign = function(t) {
			if (null == t) throw new TypeError("Cannot convert undefined or null to object");
			t = Object(t);
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				if (null != n) for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		})
	}, function(t, r) {
		var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		};
		Object.keys || (Object.keys = function() {
			"use strict";
			var t = Object.prototype.hasOwnProperty,
				r = !{
					toString: null
				}.propertyIsEnumerable("toString"),
				e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
				o = e.length;
			return function(i) {
				if ("function" != typeof i && ("object" !== ("undefined" == typeof i ? "undefined" : n(i)) || null === i)) throw new TypeError("Object.keys called on non-object");
				var a, c, u = [];
				for (a in i) t.call(i, a) && u.push(a);
				if (r) for (c = 0; c < o; c++) t.call(i, e[c]) && u.push(e[c]);
				return u
			}
		}())
	}, function(t, r) {
		Array.prototype.indexOf || (Array.prototype.indexOf = function(t, r) {
			var n;
			if (null == this) throw new TypeError('"this" is null or not defined');
			var e = Object(this),
				o = e.length >>> 0;
			if (0 === o) return -1;
			var i = +r || 0;
			if (Math.abs(i) === 1 / 0 && (i = 0), i >= o) return -1;
			for (n = Math.max(i >= 0 ? i : o - Math.abs(i), 0); n < o;) {
				if (n in e && e[n] === t) return n;
				n++
			}
			return -1
		})
	}, function(t, r) {
		Array.prototype.map || (Array.prototype.map = function(t, r) {
			var n, e, o;
			if (null == this) throw new TypeError(" this is null or not defined");
			var i = Object(this),
				a = i.length >>> 0;
			if ("[object Function]" !== Object.prototype.toString.call(t)) throw new TypeError(t + " is not a function");
			for (r && (n = r), e = new Array(a), o = 0; o < a;) {
				var c, u;
				o in i && (c = i[o], u = t.call(n, c, o, i), e[o] = u), o++
			}
			return e
		})
	}, function(t, r) {
		function n(t, r) {
			for (var n in r) t.setAttribute(n, r[n])
		}
		function e(t, r) {
			t.onload = function() {
				this.onerror = this.onload = null, r(null, t)
			}, t.onerror = function() {
				this.onerror = this.onload = null, r(new Error("Failed to load " + this.src), t)
			}
		}
		function o(t, r) {
			t.onreadystatechange = function() {
				"complete" != this.readyState && "loaded" != this.readyState || (this.onreadystatechange = null, r(null, t))
			}
		}
		t.exports = function(t, r, i) {
			var a = document.head || document.getElementsByTagName("head")[0],
				c = document.createElement("script");
			"function" == typeof r && (i = r, r = {}), r = r || {}, i = i ||
			function() {}, c.type = r.type || "text/javascript", c.charset = r.charset || "utf8", c.async = !("async" in r) || !! r.async, c.src = t, r.attrs && n(c, r.attrs), r.text && (c.text = "" + r.text);
			var u = "onload" in c ? e : o;
			u(c, i), c.onload || e(c, i), a.appendChild(c)
		}
	}])
});