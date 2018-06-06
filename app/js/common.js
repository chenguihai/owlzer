$(function () {
    $("#name07").load("./html/foot.html");
    $(".name08").load("./html/login.html");
    console.log("login")
    // $("#name07").html($("#foot").load("./html/foot.html"));

});
var Lazyload = function (c) {
    c = c || document.body;
    var e, d = "-src", h = -200, i = function () {
        var t = Array.prototype.slice.call(c.querySelectorAll("img[-src]"));
        if (t.length) for (var e, i, o, a = window.innerWidth || html.clientWidth, n = window.innerHeight || html.clientHeight, r = 0, l = t.length; r < l; r++) (i = (e = t[r]).getBoundingClientRect()).top + i.height > h && n - i.bottom + i.height > h && i.left + i.width > h && a - i.right + i.width > h && (o = e.getAttribute(d)) && (e.classList.add("ani"), e.addEventListener("load", function () {
            var t = this;
            setTimeout(function () {
                t.classList.add("loaded")
            }, 1)
        }), e.setAttribute("src", o), e.removeAttribute(d))
    }, o = 0, t = function () {
        if (!e) {
            var t = +new Date - o;
            30 < t ? (i(), o = +new Date) : (e = 1, setTimeout(function () {
                i(), e = 0, o = +new Date
            }, t))
        }
    };
    return t(), addEventListener("scroll", t), addEventListener("resize", t), t
};
!function () {
    var r, l = document.documentElement, t = document.body, c = 0, d = 0, o = function (i) {
        if (!c) {
            var o;
            r && r.img && r.img.parentNode && h(r, 1), c = 1, l.setAttribute("lightbox-loading", 1), d = 1, l.setAttribute("lightbox-switch", 1), i.img ? o = i.img : ((o = document.createElement("img")).className = "lightbox-bigger-img", o.src = i.getAttribute("data-url") || i.src), f = m;
            var t = function (t, e, i, o) {
                  i = i || l.clientWidth, o = o || window.innerHeight || l.clientHeight;
                  var a = e / t;
                  return t < i && e < o || (i < t && (e = (t = i) * a), o < e && (t = (e = o) / a)), {
                      width: t,
                      height: e,
                      top: (o - e) / 2,
                      left: (i - t) / 2
                  }
              }(Math.max(+i.getAttribute("data-width"), 2 * i.naturalWidth), Math.max(+i.getAttribute("data-height"), 2 * i.naturalHeight)),
              e = function (t, e) {
                  var i = t.getBoundingClientRect(), o = t.ghost || t.cloneNode(1), a = i.width / (e.width - i.width),
                    n = i.top - e.top;
                  trTop = n * a, trTop = trTop / i.height * 100;
                  var r = i.left - e.left;
                  trLeft = r * a, trLeft = trLeft / i.width * 100;
                  var l = e.width / i.width;
                  return o.removeAttribute("lightbox"), o.className = "lightbox-ghost", o.style.cssText = "transform-origin:" + trLeft + "% " + trTop + "%;width:" + i.width + "px;height:" + i.height + "px;top:" + i.top + "px;right:" + i.right + "px;bottom:" + i.bottom + "px;left:" + i.left + "px;", g.appendChild(o), setTimeout(function () {
                      o.style.cssText += "transform:scale(" + l + ");"
                  }), o
              }(i, t);
            i.ghost = e, i.img = o;
            var a = +new Date;
            o.style.cssText = "width:" + t.width + "px;height:" + t.height + "px;";
            var n = function () {
                var t = +new Date - a, e = function () {
                    g.appendChild(o), s(i), c = 0
                };
                l.removeAttribute("lightbox-loading"), 300 < t ? e() : setTimeout(e, 300 - t)
            };
            o.complete ? n() : o.onload = n, i.classList.add("lightbox-hidden"), u.classList.remove("hide"), r = i
        }
    }, h = function (t, e) {
        c || (g.appendChild(t.ghost), g.removeChild(t.img), setTimeout(function () {
            t.ghost.style.cssText += "transform:scale(1);"
        }), e || (u.classList.add("shadowout"), n.innerHTML = ""), d = 0, setTimeout(function () {
            g.removeChild(t.ghost), t.classList.remove("lightbox-hidden"), e || (l.removeAttribute("lightbox-switch"), u.classList.add("hide"), u.classList.remove("shadowout"))
        }, 300))
    }, s = function (t) {
        var e = t.getAttribute("data-group");
        if (e) {
            var i = Array.prototype.slice.call(document.querySelectorAll('img[lightbox][data-group="' + e + '"]')),
              o = i.length;
            if (o <= 1) n.innerHTML = ""; else {
                var a = i.indexOf(t);
                n.innerHTML = a + 1 + "/" + o
            }
        } else n.innerHTML = ""
    }, u = document.createElement("div");
    u.className = "lightbox-shadow hide", u.innerHTML = '<div class="lightbox-box"></div><h4></h4><i></i>', t.appendChild(u);
    var g = u.querySelector(".lightbox-box"), n = u.querySelector("i");
    t.addEventListener("click", function (t) {
        var e = t.target;
        "" === e.getAttribute("lightbox") && o(e)
    }), u.onmousemove = function (t) {
        t.target;
        r.img.style.cssText += "transform-origin:" + t.clientX / l.clientWidth * 100 + "% " + t.clientY / l.clientHeight * 100 + "%;"
    };
    var f = 1, m = 1;
    u.onmousewheel = function (t) {
        t.preventDefault();
        t.target;
        r.img.style.cssText += "transform-origin:" + t.clientX / l.clientWidth * 100 + "% " + t.clientY / l.clientHeight * 100 + "%;", (f += t.deltaY / 400 * (f / 5)) < m && (f = m), 5 < f && (f = 5), r.img.style.cssText += "transform:scale(" + f + ");"
    }, addEventListener("keyup", function (t) {
        if (d) switch (t.keyCode) {
            case 37:
                !function () {
                    if (!c && r) {
                        var t = r.getAttribute("data-group");
                        if (t) {
                            var e = Array.prototype.slice.call(document.querySelectorAll('img[lightbox][data-group="' + t + '"]'));
                            if (e.length) {
                                var i = e.indexOf(r) - 1;
                                -1 != i && o(e[i])
                            }
                        }
                    }
                }();
                break;
            case 39:
                !function () {
                    if (!c && r) {
                        var t = r.getAttribute("data-group");
                        if (t) {
                            var e = Array.prototype.slice.call(document.querySelectorAll('img[lightbox][data-group="' + t + '"]'));
                            if (e.length) {
                                var i = e.indexOf(r) + 1;
                                i != e.length && o(e[i])
                            }
                        }
                    }
                }()
        }
    });
    var e = {};
    u.ontouchstart = function (t) {
        console.log(t.touches), 2 == t.touches.length && (1, e.a = t.touches[0], e.b = t.touches[1])
    }, u.ontouchmove = function (t) {
        t.preventDefault()
    }, u.onclick = function () {
        r && h(r)
    }
}(), function () {
    var t, e = function (t, e) {
        return i = (e || document).querySelectorAll(t), Array.prototype.slice.call(i);
        var i
    }, i = function (y) {
        if (!y.started) {
            y.started = 1, y.style.cssText = "height:1000px";
            y.getAttribute("data-type");
            var w = +y.getAttribute("data-height"), A = +y.getAttribute("data-width"),
              T = +y.getAttribute("data-padding"), L = y.offsetWidth - 2 * T, M = e(".content-image", y);
            1, y.classList.add("absfix");
            var o = 0;
            M.forEach(function (t) {
                var e, i = (e = "img", (t || document).querySelector(e));
                t.img = i, t.height = +i.getAttribute("data-height"), t.width = +i.getAttribute("data-width"), t.scale = t.height / t.width, o += 1 - t.width / t.height
            });
            var E = 0 < o ? "纵向" : "横向", t = function () {
                if (L = y.offsetWidth - 2 * T, "横向" == E) {
                    for (var t, e = 0, i = -1; c = M[++i];) c.expectWidth = w / c.scale, c.left = e, e += c.expectWidth;
                    t = e / Math.round(e / L);
                    var o = 单行宽度 = 0, a = 0, n = [];
                    n[a] = {item: []};
                    for (i = -1; c = M[++i];) {
                        if (t * (a + 1) < c.left || !M[i + 1]) {
                            if (!M[i + 1]) {
                                n[a].item.push(c), n[a].expectWidth = c.left - o + c.expectWidth, o = c.left;
                                break
                            }
                            n[a].expectWidth = c.left - o, o = c.left, n[++a] = {item: []}
                        }
                        n[a].item.push(c)
                    }
                    n[n.length - 1].item.length || n.pop();
                    var r = 0;
                    for (i = -1; c = n[++i];) {
                        var l = L - T * (c.item.length - 1);
                        c.h = Math.floor(l / c.expectWidth * w), c.top = r, r += c.h + T
                    }
                    i = -1;
                    for (var c, d = 0, h = 0; c = n[++i];) d = 0, c.item.forEach(function (t) {
                        var e = Math.floor(c.h / t.scale);
                        t.style.cssText = "height:" + c.h + "px;width:" + e + "px;top:" + c.top + "px;left:" + d + "px;", d += e + T, h = c.top + c.h + T
                    });
                    y.style.cssText += ";height:" + h + "px;"
                } else {
                    var s = [], u = Math.floor((L + T) / A), g = Math.floor((L + T) / u) - T;
                    u < 1 && (u = 1);
                    for (i = 0; i < u; i++) s[i] = 0;
                    i = 0;
                    for (var f, m = M.length; i < m; i++) {
                        f = M[i];
                        var p = (x = s).indexOf(Math.min.apply(Math, x)), v = Math.ceil(f.scale * g);
                        f.style.cssText = "width:" + g + "px;height:" + v + "px;top:" + s[p] + "px;left:" + p * (g + T) + "px;", s[p] += v + T
                    }
                    y.style.cssText += ";height:" + s[(b = s, b.indexOf(Math.max.apply(Math, b)))] + "px;"
                }
                var b, x
            };
            return t(), {repull: y.repull = t}
        }
        y.repull()
    };
    i.init = function () {
        e("[fall]").forEach(i)
    }, addEventListener("resize", function () {
        clearTimeout(t), t = setTimeout(i.init, 30)
    }), window.Fall = i
}(), Fall.init(), function () {
    var d, h = document, s = function (t, e) {
        return i = (e || h).querySelectorAll(t), Array.prototype.slice.apply(i);
        var i
    }, u = {}, a = function () {
        return location.pathname + location.search
    }, n = Lazyload(document.body), g = function (t) {
        var e, i, o;
        t.url != a() && history.pushState({
            url: t.url,
            title: t.title
        }, t.title, t.url), document.title = t.title, (e = M.children[0]) && e.parentNode && e.parentNode.removeChild(e), i = M, o = t.dom, i.appendChild(o), t.scroll && setTimeout(function () {
            scrollTo(0, t.scroll)
        }), window.萌评 && 萌评.运转(), Fall.init(), n(), r()
    }, i = function (n) {
        n != d && (u[d] && (u[d].scroll = h.body.scrollTop || h.documentElement.scrollTop), d = n), s("header nav a.active").forEach(function (t) {
            t.classList.remove("active")
        });
        var t = n.match(/\/(\w{0,})/);
        t = t[1];
        var e, i, o, a, r, l, c = (e = 'header nav a[href*="/' + t + '"]', (i || h).querySelector(e));
        if (c && c.classList.add("active"), u[n]) return g(u[n]);
        o = n, a = function (t) {
            var e = t.match(/<title>(.+?)<\/title>/);
            e = e ? e[1] : "";
            var i, o,
              a = (i = t.replace(/^.+?<div id="?M"?>/, "").replace(/<\/div><scri.+?$/, ""), (o = h.createElement("div")).innerHTML = i, o.children[0]);
            u[n] = {url: n, title: e, dom: a}, scrollTo(0, 0), g(u[n])
        }, r = function () {
            location.href = n
        }, (l = new XMLHttpRequest).open("GET", o), l.onload = function () {
            a && a(l.response)
        }, l.onerror = r, l.send()
    }, e = function () {
        if (window.pannellum) {
            var t = s(".panorama-box");
            t.length && t.forEach(function (t) {
                if (!t.loaded) {
                    t.loaded = 1;
                    var e = {
                        type: "equirectangular",
                        panorama: t.getAttribute("data-src"),
                        dynamic: 1,
                        autoLoad: !0,
                        hfov: 120,
                        autoRotate: -.1,
                        mouseZoom: "fullscreenonly"
                    };
                    t.getAttribute("data-text") && (e.title = t.getAttribute("data-text")), t.getAttribute("data-auto-rotate") && (e.autoRotate = t.getAttribute("data-auto-rotate")), t.getAttribute("data-un-auto-load") && (e.autoLoad = !1), t.getAttribute("data-hfov") && (e.hfov = t.getAttribute("data-hfov")), pannellum.viewer(t, e)
                }
            })
        }
    }, r = function () {
        if (!window.pannellum && s(".panorama-box").length) {
            var t = document.createElement("script");
            t.src = "/static/js/pannellum.js", t.onload = e, document.body.appendChild(t)
        } else e()
    };
    r();
    var t;
    t = location.pathname + location.search, u[t] = {
        url: t,
        title: document.title,
        dom: M.children[0]
    }, h.body.onclick = function (t) {
        for (var e = t.target; e && "A" != e.tagName && e != this && (e = e.parentNode);) ;
        !e || "A" != e.tagName || "_blank" == e.getAttribute("target") || e.origin != location.origin || t.ctrlKey || t.metaKey || (i(e.pathname + e.search), t.preventDefault())
    }, window.addEventListener("popstate", function () {
        i(a())
    })
}(), setTimeout(function () {
    var t;
    (t = document.createElement("script")).src = "//comment.moe/dest/static/js/build.js", document.body.appendChild(t), (t = document.createElement("link")).href = "//comment.moe/dest/static/css/plus.css", t.rel = "stylesheet", document.body.appendChild(t)
}, 2e3);