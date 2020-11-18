(function (r) {
    if (!String.prototype.trim) String.prototype.trim = function () { return this.replace(/^\s+/, "").replace(/\s+$/, "") }; var b = b || {}; b.hash = {}; b.defineShapes = {}; b.init = function () { b.initRoot(); b.initDefs(); b.initShapes(); b.interval = Math.floor(1E3 / r.Fr) }; b.createTag = function (a) { return document.createElementNS("http://www.w3.org/2000/svg", a) }; b.initRoot = function () {
        var a = r.Ft; b.root = b.createTag("svg"); b.root.setAttribute("width", a.xm - a.xi); b.root.setAttribute("height", a.ym - a.yi); b.root.setAttribute("viewBox",
            a.xi + " " + a.yi + " " + r.Fw + " " + r.Fh); b.scene = document.createElement("div"); b.scene.style.position = "relative"; b.scene.style.left = "0"; b.scene.style.top = "0"; b.scene.appendChild(b.root); document.body.appendChild(b.scene)
    }; b.initDefs = function () { var a = b.createTag("g"), c = b.createTag("defs"); a.appendChild(c); b.root.appendChild(a); b.defs = c }; b.initShapes = function () {
        for (var a = r.tg, c = 0, f = a.length; c < f; c++) {
            var d = a[c]; switch (d.tp) {
                case 2: b.processShape(d); break; case 10: b.processFont(d); break; case 11: b.processText(d);
                    break; case 39: b.processSprite(d); break; case 7: b.processButton(d)
            }b.hash[d.id] = d
        }
    }; b.processFont = function (a) {
        var c = b.createTag("font"); c.setAttribute("id", "ft" + a.id); c.setAttribute("horiz-adv-x", 1024); var f = b.createTag("font-face"); f.setAttribute("font-family", "ft" + a.id); f.setAttribute("line-height", "1.15"); f.setAttribute("units-per-em", a.us); f.setAttribute("font-weight", "bold"); c.appendChild(f); f = 0; for (var d = a.fo.length; f < d; f++) {
            var g = a.fo[f], e = b.createTag("glyph"); e.setAttribute("d", g.da); e.setAttribute("unicode",
                g.co); "ad" in g && e.setAttribute("horiz-adv-x", g.ad); c.appendChild(e)
        } b.defs.appendChild(c)
    }; b.processText = function (a) {
        var c = b.createTag("g"), f = b.createTag("defs"), d = b.createTag("g"); if ("rs" in a) for (var g = 0; a.rs[g]; g++) {
            var e = a.rs[g]; if (a.tt == "html") {
                var j = a.bd, o = document.createTextNode(e.tx), h = document.createElement("span"); h.style.fontSize = e.fs + "px"; h.style.color = e.c; h.style.fontFamily = e.fd; h.appendChild(o); if (g == 0) {
                    text_p = document.createElement("p"); text_div = document.createElement("div"); text_div.style.textAlign =
                        "left"; text_body = document.createElement("body"); var k = b.createTag("foreignObject"); k.setAttribute("x", j.l); k.setAttribute("y", j.t); k.setAttribute("width", j.r - j.l); k.setAttribute("height", j.b - j.t); j = b.createTag("g"); j.setAttribute("transform", a.tf); j.setAttribute("translate", e.translate); j.appendChild(k); k.appendChild(text_body); text_body.appendChild(text_div); text_div.appendChild(text_p); text_p.appendChild(h); d.appendChild(j)
                } else k.appendChild(h); k = h
            } else {
                h = b.createTag("text"); if (e.psd === !0) {
                    j = "";
                    o = 0; for (var l = e.tx.length; o < l; o++)j += "*"; e.tx = j
                } o = document.createTextNode(e.tx); h.appendChild(o); e.b && h.setAttribute("font-weight", "bold"); h.setAttribute("font-size", e.h); e.fd.toString().match(/\d/) ? h.setAttribute("font-family", "ft" + e.fd) : h.setAttribute("font-family", e.fd); h.setAttribute("fill", e.c); h.setAttribute("x", e.x); h.setAttribute("y", e.y); h.setAttribute("fill-rule", "nonzero"); h.setAttribute("style", "white-space:pre"); h.setAttribute("transform", a.tf); d.appendChild(h)
            }
        } c.appendChild(f); c.appendChild(d);
        c.setAttribute("type", "text"); b.defineShapes[a.id] = c
    }; b.processSprite = function (a) { var c = b.createTag("g"), f = b.createTag("defs"), d = b.createTag("g"); c.setAttribute("type", "sprite"); c.appendChild(f); c.appendChild(d); b.defineShapes[a.id] = c }; b.processButton = function (a) { var c = b.createTag("g"), f = b.createTag("defs"), d = b.createTag("g"); c.setAttribute("type", "button"); c.appendChild(f); c.appendChild(d); b.defineShapes[a.id] = c }; b.processShape = function () {
        var a = function (a, d, g) {
            if (document.getElementById(d)) return d;
            g = b.createTag(g); for (var c in a) typeof a[c] == "object" || c == "type" || g.setAttribute(c, a[c]); a = a.sp; c = 0; for (var j = a.length; c < j; c++) { var o = a[c], h = b.createTag("stop"), k; for (k in o) h.setAttribute(k, o[k]); g.appendChild(h) } g.setAttribute("id", d); b.defs.appendChild(g); return d
        }, c = function (a, c) {
            if (document.getElementById(c)) return c; var g = b.createTag("pattern"), e; for (e in a) typeof a[e] == "object" || e == "type" || g.setAttribute(e, a[e]); var j = b.createTag("image"); for (e in a.image) e == "xlink:href" ? j.setAttributeNS("http://www.w3.org/1999/xlink",
                "href", a.image[e]) : j.setAttribute(e, a.image[e]); g.appendChild(j); g.setAttribute("id", c); b.defs.appendChild(g); return c
        }; return function (f) {
            var d = b.createTag("g"), g = b.createTag("defs"), e = b.createTag("g"); d.appendChild(g); d.appendChild(e); if (g = f.pt) for (var j = 0, o = g.length; j < o; j++) {
                var h = g[j], k = b.createTag("path"); k.setAttribute("d", h.da); if (typeof h.fi !== "undefined") {
                    var l = f.Fs[h.fi], i = f.id, m = h.fi; if (l) {
                        var q = k, n = i; i = l.tp; if (i == 1) q.setAttribute("fill", l.c), q.setAttribute("fill-opacity", typeof l["fill-opacity"] ==
                            "undefined" ? 1 : l["fill-opacity"]); else { m = "f" + n + ":" + m; n = ""; switch (i) { case 2: n = a(l, m, "linearGradient"); break; case 3: n = a(l, m, "radialGradient"); break; case 4: case 5: case 6: case 7: n = c(l, m) }q.setAttribute("fill", "url(#" + n + ")") }
                    }
                } if (typeof h.ln !== "undefined") {
                    l = f.Ls[h.ln]; i = f.id; q = k; h = h.ln; m = void 0; for (m in l) typeof l[m] != "object" && q.setAttribute(m, l[m]); if ("fi" in l) {
                        h = "l" + i + ":" + h; i = ""; switch (l.fi.tp) {
                            case 2: i = a(l.fi, h, "linearGradient"); break; case 3: i = a(l.fi, h, "radialGradient"); break; case 4: case 5: case 6: case 7: i =
                                c(l.fi, h)
                        }q.setAttribute("stroke", "url(#" + i + ")")
                    } q.setAttribute("fill", "none")
                } e.appendChild(k)
            } d.setAttribute("type", "shape"); b.defineShapes[f.id] = d
        }
    }(); b.filterElement = function (a, c) {
        var f = { "0": "Shadow", "1": "Blur", "2": "Glow", "3": "Bevel" }, d = function (a) { return a == 0 ? "SourceGraphic" : a }; this.defs = a.firstChild; this.target = a.firstChild.nextSibling; this.id = "filter_" + a.getAttribute("id"); this.base = 0; this.filters = c; this.element = b.createTag("filter"); this.defs.appendChild(this.element); this.Rgb = function (a) {
            var c =
                ["R", "G", "B"], d = b.createTag("feComponentTransfer"); d.setAttribute("in", a); this.element.appendChild(d); for (a = 0; a < c.length; a++) { var f = b.createTag("feFunc" + c[a]); f.setAttribute("type", "linear"); f.setAttribute("slope", 0); d.appendChild(f) } return this
        }; this.Rgba = function (a, c, d) {
            var f = ["R", "G", "B"], h = [c.r, c.g, c.b, c.a]; c = b.createTag("feComponentTransfer"); c.setAttribute("result", d); this.element.appendChild(c); for (d = 0; d < f.length; d++) {
                var k = b.createTag("feFunc" + f[d]); k.setAttribute("type", "linear"); k.setAttribute("intercept",
                    h[d]); k.setAttribute("Ue", 0); c.appendChild(k)
            } f = b.createTag("feFuncA"); f.setAttribute("type", "linear"); f.setAttribute("slope", a); f.setAttribute("xh", 0); c.appendChild(f); return this
        }; this.Fo = function (a, c, d) { var f = b.createTag("feOffset"); f.setAttribute("dx", a); f.setAttribute("dy", c); d !== !1 && f.setAttribute("result", d); this.element.appendChild(f); return this }; this.Fg = function (a, c) { var d = b.createTag("feGaussianBlur"); d.setAttribute("stdDeviation", [a, c].join(" ")); this.element.appendChild(d); return this };
        this.Com = function (a, c, d, f, h, k) { var l = b.createTag("feComposite"); c !== !1 && l.setAttribute("in", c); d !== !1 && l.setAttribute("in2", d); l.setAttribute("operator", a); f != 0 && l.setAttribute("k2", f); h != 0 && l.setAttribute("k3", h); k && l.setAttribute("result", k); this.element.appendChild(l); return this }; this.Shadow = function (a) {
            if (a.op & 128) { var c = b.createTag("feFlood"); c.setAttribute("result", ++this.base); this.element.appendChild(c) } a.op & 128 ? this.Rgb(d(this.base - 1)) : this.Rgb(d(this.base)); this.Fg(a.bx, a.by).Fo(a.dx, a.dy,
                !1); a.op & 128 && this.Com("arithmetic", !1, d(this.base), -1, 1); this.Rgba(a.st, a.c, ++this.base); a.op & 32 ? a.op & 64 && a.op & 128 ? this.Com("in", d(this.base), d(this.base - 2), 0, 0, ++this.base) : a.op & 64 ? this.Com("out", d(this.base), d(this.base - 1), 0, 0, ++this.base) : a.op & 128 ? this.Com("atop", d(this.base), d(this.base - 2), 0, 0, ++this.base) : this.Com("over", d(this.base - 1), d(this.base), 0, 0, ++this.base) : a.op & 128 ? this.Com("in", d(this.base), d(this.base - 2), 0, 0, ++this.base) : a.op & 64 && this.Com("out", d(this.base), d(this.base - 1), 0, 0, ++this.base)
        };
        this.Blur = function (a) { var c = b.createTag("feGaussianBlur"); c.setAttribute("in", d(this.base)); c.setAttribute("result", ++this.base); c.setAttribute("stdDeviation", [a.bx, a.by].join(" ")); this.element.appendChild(c) }; this.Glow = function (a) {
            if (a.op & 128) { var c = b.createTag("feFlood"); c.setAttribute("result", ++this.base); this.element.appendChild(c) } a.op & 128 ? this.Rgb(d(this.base - 1)) : this.Rgb(d(this.base)); this.Fg(a.bx, a.by); a.op & 128 && this.Com("arithmetic", !1, d(this.base), -1, 1); a.op & 128 ? this.Rgba(a.st, a.c, d(this.base)) :
                this.Rgba(a.st, a.c, ++this.base); a.op & 64 && a.op & 128 ? this.Com("in", d(this.base), d(this.base - 1), 0, 0, ++this.base) : a.op & 64 ? this.Com("out", d(this.base), d(this.base - 1), 0, 0, ++this.base) : a.op & 128 ? this.Com("atop", d(this.base), d(this.base - 1), 0, 0, ++this.base) : this.Com("over", d(this.base - 1), d(this.base), 0, 0, ++this.base)
        }; this.Bevel = function (a) {
            this.Rgb(d(this.base)).Fg(a.bx, a.by).Fo("-" + a.dx, "-" + a.dy, ++this.base).Rgb(d(this.base - 1)).Fg(a.bx, a.by).Fo(a.dx, a.dy, ++this.base).Com("arithmetic", d(this.base - 1), d(this.base),
                1, -1).Rgba(a.st, a.highlightColor, ++this.base).Com("arithmetic", d(this.base - 1), d(this.base - 2), 1, -1).Rgba(a.st, a.c, ++this.base).Com("arithmetic", d(this.base - 1), d(this.base), 1, 1, ++this.base); a.op & 64 ? a.op & 16 || (a.op & 128 ? this.Com("in", this.base, d(this.base - 5), 0, 0, ++this.base) : this.Com("out", this.base, d(this.base - 5), 0, 0, ++this.base)) : a.op & 128 ? this.Com("atop", this.base, d(this.base - 5), 0, 0, ++this.base) : a.op & 16 ? this.Com("over", this.base, d(this.base - 5), 0, 0, ++this.base) : this.Com("over", d(this.base - 5), this.base,
                    0, 0, ++this.base)
        }; this.init = function () { var a = this.filters.rt, c = this.filters.rc; this.element.setAttribute("width", a.w); this.element.setAttribute("height", a.h); this.element.setAttribute("x", a.x); this.element.setAttribute("y", a.y); this.element.setAttribute("id", this.id); for (a = 0; a < c.length; a++)this.filterDom(c[a]); this.attachFilter() }; this.reset = function (a) { for (; this.element.firstChild;)this.element.removeChild(this.element.firstChild); this.base = 0; this.filters = a; this.init() }; this.filterDom = function (a) { if (f[a.tp]) this[f[a.tp]](a) };
        this.attachFilter = function () { this.element.childNodes.length > 0 && this.target.setAttribute("filter", "url(#" + this.id + ")") }; this.init()
    }; var s = function (a, c) { for (var b = 0; b < c.length; b++)if (c[b] == a) return !0; return !1 }; b.sprite = function (a, c) {
        function f(a, c) { return a - c } function d(a) { var c = [], d = [], b; for (b in a) c.push(b); c.sort(f); for (b = 0; b < c.length; b++)d.push(a[c[b]]); return d } this.placeObjects = a.Sf; this.sprites = {}; this.depths = {}; this.frame = this.arrayIndex = 0; this.par = c; this.diff = this.firstFrame = null; this.pIdArr =
            []; this.diff = a == r.Mf ? "Mf" : "Tag"; this.frames = []; var g = [], e = []; g = []; var j = [], o = []; e = []; for (var h = {}, k = 0, l = this.placeObjects.length; k < l; k++) {
                var i = this.placeObjects[k]; if (!(i.tp == 14 || i.tp == 43)) {
                    var m = i.d; !i.remove && m && j.push(m); i.remove && e.push(m); i.remove && g.push(i); if (i.tp == 1) {
                        e = d(h); if (g) { for (m = 0; m < g.length; m++)s(g[m].d, j) || o.push(g[m]); e = e.concat(o) } g = e.slice(); g.push(i); if (o.length > 0) for (a = 0; a < o.length; a++)for (var q in h) (o[a] == h[q] || o[a].d == h[q].d) && delete h[q]; this.frames.push(g); g = []; g = []; j =
                            []; o = []; e = []
                    } else if (m && !i.remove) if (m in h) { var n = h[m], p = {}; p.id = i.id; p.d = i.d; if (i.ma) p.ma = i.ma; if (!i.ma && n.ma && !s(i.d, e)) p.ma = n.ma; if (i.cD) p.cD = i.cD; if (!i.cD && n.cD && !s(i.d, e)) p.cD = n.cD; if (i.cx) p.cx = i.cx; if (!i.cx && n.cx && !s(i.d, e)) p.cx = n.cx; if (i.fl) p.fl = i.fl; if (!i.fl && n.fl && !s(i.d, e)) p.fl = n.fl; if (i.opacity) p.opacity = i.opacity; if (!i.opacity && n.opacity && !s(i.d, e)) p.opacity = n.opacity; if (i.opacity == 0) p.opacity = 0; if (i.rp) p.rp = !0; if (i.tp) p.tp = i.tp; h[m] = p } else h[m] = i
                }
            } b.sprite.instances.push(this); this.debugId =
                a.id
    }; b.sprite.instances = []; b.sprite.prototype.showFrame = function () { for (var a = this.frames[this.frame], c = a[a.length - 1], b = null, d = 0, g = a.length - 1; d < g; d++)b = a[d], this.renderShape(b), this.lastDepth = b.d; this.lastDepth = null; "ac" in c && this.handleAction(c.ac); this.pause || this.frame++; if (this.frame == this.frames.length) this.frame = 0 }; b.sprite.prototype.handleAction = function (a) { for (var c = 0, b = a.length; c < b; c++)this.action(a[c]) }; b.sprite.prototype.action = function (a) {
        a = a.as; for (var c = 0, b = 0, d = a.length; b < d; b++)switch (c =
            a[b].code, c) { case 7: this.stop(); break; case 129: this.gotoFrame(a[b].frame); break; case 6: this.play() }
    }; b.sprite.prototype.stop = function () { this.pause = !0 }; b.sprite.prototype.start = function () { this.pause = !1 }; b.sprite.prototype.gotoFrame = function (a) { this.frame = a }; b.sprite.prototype.gotoAndStop = function (a) { if (this.frames[a]) this.frame = a, this.pause = !0 }; b.sprite.prototype.play = function () { this.pause = !1 }; b.sprite.prototype.renderShape = function (a) {
        if ("nm" in a) this.name = a.nm; var c; if ("remove" in a) return this.removeShape(a.d);
        "rp" in a ? (c = this.replaceShape(a), this.afterRender(c, a)) : (c = this.getShape(a)) && this.afterRender(c, a); return !0
    }; b.sprite.prototype.replaceShape = function (a) {
        var c = this.par.firstChild.nextSibling, b = this.createShape(a), d = a.d; if (this.depths[d]) {
            var g = this.par.getAttribute("id") + ":" + d + ":" + this.depths[d], e = document.getElementById(g); if (g == b.id) return e; c.replaceChild(b, e); this.sprites[d + ":" + this.depths[d]] && (this.sprites[d + ":" + this.depths[d]] = null, delete this.sprites[d + ":" + this.depths[d]]); this.buttons &&
                this.buttons[d + ":" + this.depths[d]] && (this.buttons[d + ":" + this.depths[d]] = null, delete this.buttons[d + ":" + this.depths[d]])
        } else { if (this.lastDepth) { if (e = this.par.getAttribute("id") + ":" + this.lastDepth + ":" + this.depths[this.lastDepth], e = document.getElementById(e)) g = e.nextSibling } else g = c.firstChild; g ? c.insertBefore(b, g) : c.appendChild(b) } this.depths[d] = a.id; return b
    }; b.sprite.prototype.removeShape = function (a) {
        if (this.depths[a]) {
            var c = this.depths[a], b = this.par.firstChild.nextSibling; c = this.par.getAttribute("id") +
                ":" + a + ":" + c; c = document.getElementById(c); b.removeChild(c); this.sprites[a + ":" + this.depths[a]] && (this.sprites[a + ":" + this.depths[a]] = null, delete this.sprites[a + ":" + this.depths[a]]); this.buttons && this.buttons[a + ":" + this.depths[a]] && (this.buttons[a + ":" + this.depths[a]] = null, delete this.buttons[a + ":" + this.depths[a]]); delete this.depths[a]
        } return a
    }; b.sprite.prototype.getShape = function (a) { a = this.par.getAttribute("id") + ":" + a.d + ":" + a.id; return document.getElementById(a) }; b.sprite.prototype.afterRender = function (a,
        c) { this.mxTransform(a, c); this.cxTransform(a, c); this.changeOpacity(a, c); this.addFilters(a, c) }; b.sprite.prototype.mxTransform = function (a, c) { var b = { mask: "moveShape", shape: "moveShape", text: "moveText", sprite: "moveSprite", button: "moveButton" }; if ("ma" in c && a.getAttribute("type")) { var d = a.getAttribute("type"); this[b[d]](a, c) } }; b.sprite.prototype.moveShape = function (a, c) {
            var b = c.ma; if (a.nodeName.toLowerCase() == "g") a.firstChild.nextSibling.setAttribute("transform", "matrix(" + b + ")"); else for (var d = a.childNodes,
                g = 0, e = d.length; g < e; g++)d[g].setAttribute("transform", "matrix(" + b + ")")
        }; b.sprite.prototype.moveText = function (a, c) { for (var f = a.firstChild.nextSibling.childNodes, d = c.ma, g = 0; f[g]; g++) { var e = f[g].getAttribute("transform"); f[g].oriMx = f[g].oriMx || e; e = f[g].oriMx.match(/matrix\(([^(]+)\)/)[1]; e = b.sprite.concatMatrix(e, d); f[g].setAttribute("transform", "matrix(" + e + ")") } }; b.sprite.prototype.moveSprite = function (a, c) {
            var f = c.ma, d = c.d + ":" + c.id; this.sprites[d] = this.sprites[d] || new b.sprite(b.hash[c.id], a); this.sprites[d].showFrame();
            a.firstChild.nextSibling.setAttribute("transform", "matrix(" + f + ")")
        }; b.sprite.prototype.moveButton = function (a, c) { var f = c.d, d = this.depths[c.d], g = c.ma, e = b.hash[c.id]; if (!this.buttons) this.buttons = {}; if (this.buttons[f + ":" + d]) for (var j in e = this.buttons[f + ":" + d].sprites, e) e[j].showFrame(); else this.buttons[f + ":" + d] = new b.sprite.Button(a, e); this.buttons[f + ":" + d].element.setAttribute("transform", "matrix(" + g + ")") }; b.bindAsEventListener = function (a, c) {
            var b = Array.prototype.slice.call(arguments, 2); return function (d) {
                c.apply(a,
                    [d || window.event].concat(b))
            }
        }; b.sprite.Button = function (a, c) { this.pid = a.getAttribute("id"); this.element = a.firstChild.nextSibling; this.states = {}; this.sprites = {}; this.init(c); this.element.style.cursor = "pointer" }; b.sprite.Button.prototype = {
            init: function (a) {
                function c(a) {
                    for (var c = null, d = 0, f = h[a].length; d < f; d++) {
                        c = h[a][d][0].cloneNode(!0); c.style.display = a == "up" || a == "hit" ? "block" : "none"; c.setAttribute("state", a); a == "hit" && (c.style.opacity = 0); o.appendChild(c); var e = h[a][d][1]; "opacity" in e && b.sprite.prototype.changeOpacity(c,
                            e); "cx" in e && b.sprite.prototype.colorTransform(c, e.cx); "fl" in e && b.sprite.prototype.addFilters(c, e); if (c.getAttribute("type") == "sprite") { e = c.getAttribute("sid"); var g = a.concat(d); k[g] = k[g] || new b.sprite(b.hash[e], c); k[g].showFrame() }
                    }
                } for (var f = a.rc, d, g, e, j = f.length - 1; j >= 0; j--)d = f[j], e = d.s, g = b.defineShapes[d.id].cloneNode(!0), g.setAttribute("transform", d.tf), g.setAttribute("sid", d.id), g.setAttribute("id", this.pid.concat(":", d.id, "_", j)), this.states[e] || (this.states[e] = []), this.states[e].push([g, d]);
                var o = this.element, h = this.states, k = this.sprites; "up" in this.states && c("up"); "hit" in this.states && c("hit"); "down" in this.states && c("down"); "over" in this.states && c("over"); this.normalEvents(); "ac" in a && this.handleAction(a.ac)
            }, normalEvents: function () {
                this.element.addEventListener("mousedown", b.bindAsEventListener(this, this.mousedownHandler), !1); this.element.addEventListener("mouseup", b.bindAsEventListener(this, this.mouseupHandler), !1); this.element.addEventListener("mouseover", b.bindAsEventListener(this,
                    this.mouseoverHandler), !1); this.element.addEventListener("mouseout", b.bindAsEventListener(this, this.mouseoutHandler), !1)
            }, handleAction: function (a) { for (var c = 0, b = a.length; c < b; c++) { var d = a[c]; switch (d.cd) { case "OverDownToOverUp": case "IdleToOverUp": this.handleRelease(d.as) } } }, handleRelease: function (a) {
                for (var c = 0, f = a.length; c < f; c++) {
                "u" in a[c] && function (a, c) { a.addEventListener("mouseup", function () { window.open(c) }, !1) }(this.element, a[c].u); var d = a[c].sm; if (/^\S+$/.test(d) && d.indexOf(".") == -1) {
                    d = d.match(/^([^\(]+)\(([^\(]*)\)$/);
                    var g = d[1].trim(); (function (a, c, b, d) { c.addEventListener("mouseup", function () { if (b in a) a[b](d) }, !1) })(b.sprite.instances[0], this.element, g, d[2])
                }
                }
            }, mouseoutHandler: function () { this.changeState("up") }, mouseoverHandler: function () { this.changeState("over") }, mousedownHandler: function () { "down" in this.states && this.changeState("down") }, mouseupHandler: function () { this.changeState("up") }, changeState: function (a) {
                for (var c = this.element.childNodes, b = 0, d; d = c[b]; b++)d.style.display = d.getAttribute("state") == "hit" ||
                    d.getAttribute("state") == a ? "block" : "none"
            }
        }; b.sprite.prototype.cxTransform = function (a, c) { "cx" in c && this.colorTransform(a, c.cx) }; b.sprite.prototype.colorTransform = function () {
            function a(a, b) { var d = a.match(/rgb\(([^(]+)\)/)[1].split(","), g = Math.max(0, Math.min((d[0] - 0) * b.Rm / 256 + b.Ra, 255)), e = Math.max(0, Math.min((d[1] - 0) * b.Gm / 256 + b.Ga, 255)); d = Math.max(0, Math.min((d[2] - 0) * b.Bm / 256 + b.Ba, 255)); g = parseInt(g); e = parseInt(e); d = parseInt(d); return [g, e, d] } return function (c, b) {
                var d = c.getAttribute("type"); if ((d ==
                    "shape" || d == "text") && c.nodeName.toLowerCase() != "clippath") {
                        d = c.firstChild.nextSibling; try {
                            for (var g = 0, e = d.childNodes.length; g < e; g++) {
                                var j = d.childNodes[g], o = b, h = j.hasAttribute("stroke") ? "stroke" : "fill", k = j.getAttribute(h); if (k) switch (k.match(/^\S{3}/)[0]) {
                                    case "rgb": var l = j, i = h; l.oriC = l.oriC || k; var m = a(l.oriC, o); l.setAttribute(i, "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")"); break; case "url": l = j; i = h; var q = k.match(/url\(#([^(]+)\)/)[1], n = ""; switch (i) { case "stroke": n = "l"; break; case "fill": n = "f" }var p = q.indexOf(n);
                                        p !== 0 && (q = q.substr(p)); var r = document.getElementById(q); if (r.nodeName != "pattern") { var s = l.parentNode.previousSibling, t = l.parentNode.parentNode.getAttribute("id") + q; if (document.getElementById(t)) var u = document.getElementById(t); else u = r.cloneNode(!0), u.setAttribute("id", t), s.appendChild(u); var w = r.childNodes, x = u.childNodes; n = 0; for (var y = w.length; n < y; n++) { var z = w[n].getAttribute("stop-color"), v = a(z, o); x[n].setAttribute("stop-color", "rgb(" + v[0] + "," + v[1] + "," + v[2] + ")") } l.setAttribute(i, "url(#" + t + ")") }
                                }
                            }
                        } catch (A) { }
                } else if (d ==
                    "sprite") { e = c.firstChild.nextSibling.childNodes; j = 0; for (h = e.length; j < h; j++)this.colorTransform(e[j], b) }
            }
        }(); b.sprite.prototype.changeOpacity = function (a, c) { var b = 1; if ("opacity" in c) b = c.opacity, a.setAttribute("opacity", b) }; b.sprite.prototype.addFilters = function (a, c) { if ("fl" in c) { var f = c.fl; a.filter ? a.filter.reset(f) : a.filter = new b.filterElement(a, f) } }; b.sprite.prototype.getNode = function (a) { return b.defineShapes[a.id].cloneNode(!0) }; b.sprite.prototype.createShape = function (a) {
            var c = this.getNode(a), b =
                this.par.getAttribute("id") + ":" + a.d + ":" + a.id; "cD" in a ? (this.clipDepthId = b, this.clipDepth = a.cD, this.clipDepthDepth = a.d, c = this.createClip(a)) : this.clipDepthId && a.d > this.clipDepthDepth && a.d <= this.clipDepth && c.setAttribute("clip-path", "url(#" + this.clipDepthId + ")"); c.setAttribute("id", b); return c
        }; b.sprite.prototype.createClip = function (a) { var c = this.getNode(a); switch (c.getAttribute("type")) { case "shape": return this.createSimpleClip(c); case "sprite": return this.createComplexClip(a) } }; b.sprite.prototype.createSimpleClip =
            function (a) { var c = b.createTag("clipPath"); a = a.firstChild.nextSibling.childNodes; for (var f = 0, d = a.length; f < d; f++) { var g = a[f].cloneNode(!0); c.appendChild(g) } c.setAttribute("clippathunits", "userSpaceOnUse"); c.setAttribute("type", "shape"); return c }; b.sprite.prototype.createComplexClip = function (a) { a = b.hash[a.id]; for (var c = [], f = 0; f < a.Sf.length; f++)a.Sf[f].remove || c.push(a.Sf[f]); return this.createSimpleClip(b.defineShapes[c[0].id]) }; b.sprite.concatMatrix = function (a, c) {
                var b = []; a = a.split(","); c = c.split(",");
                for (var d = 0; a[d]; d++)a[d] -= 0, c[d] -= 0; b.push(a[0] * c[0] + a[1] * c[1]); b.push(a[0] * c[1] + a[1] * c[3]); b.push(a[1] * c[0] + a[3] * c[1]); b.push(a[1] * c[1] + a[3] * c[3]); b.push(c[4] * a[0] + c[5] * a[1] + a[4]); b.push(c[4] * a[1] + c[5] * a[3] + a[5]); return b.join(",")
            }; b.start = function () {
                var a = b.createTag("g"); b.setBackground(b.root); a.setAttribute("id", "0"); a.appendChild(b.createTag("defs")); a.appendChild(b.createTag("g")); b.root.appendChild(a); var c = new b.sprite(r.Mf, a); b.timer = setTimeout(function () {
                    c.showFrame(); b.timer = setTimeout(arguments.callee,
                        b.interval)
                }, b.interval); (function () { var a = document.createElement("button"); a.innerHTML = "stop"; a.id = "control"; document.body.appendChild(a); if (a) a.onclick = function () { a.innerHTML == "stop" ? (a.innerHTML = "start", c.stop(), b.stop()) : (a.innerHTML = "stop", c.start(), b.timer = setTimeout(function () { c.showFrame(); b.timer = setTimeout(arguments.callee, b.interval) }, b.interval)) } })()
            }; b.stop = function () { clearTimeout(b.timer) }; b.resume = function () {
            b.timer = setTimeout(function () {
                mainMovie.showFrame(); setTimeout(arguments.callee,
                    b.interval)
            }, b.interval)
            }; b.setBackground = function (a) { var c = b.createTag("rect"), f = { x: r.Ft.xi, y: r.Ft.yi, width: r.Fw, height: r.Fh, fill: r.Bg }, d; for (d in f) c.setAttribute(d, f[d]); a.appendChild(c) }; b.init(); b.start()
})(data);
document.getElementById("control").style.display = "none";