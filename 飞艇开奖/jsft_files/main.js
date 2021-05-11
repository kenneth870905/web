function activateflame(a, t) {
    parseInt($("#car" + t).css("left")) > a ? ($(".car" + t + " .wind").css("display", "block"), $(".car" + t +
        " .flame").css("display", "block")) : ($(".car" + t + " .wind").css("display", "none"), $(".car" + t +
            " .flame").css("display", "none"))
}

function animate() {
    var a = Math.floor(40 * Math.random() + 30);
    a /= 10;
    var t = Math.floor(40 * Math.random() + 30);
    t /= 10;
    var e = Math.floor(40 * Math.random() + 30);
    e /= 10;
    var n = Math.floor(40 * Math.random() + 30);
    n /= 10;
    var o = Math.floor(40 * Math.random() + 30);
    o /= 10;
    var r = Math.floor(40 * Math.random() + 30);
    r /= 10;
    var l = Math.floor(40 * Math.random() + 30);
    l /= 10;
    var i = Math.floor(40 * Math.random() + 30);
    i /= 10;
    var s = Math.floor(40 * Math.random() + 30);
    s /= 10;
    var c = Math.floor(40 * Math.random() + 30);
    c /= 10;
    var d = Math.floor(10 * Math.random() + 1);
    d /= 10;
    var m = Math.floor(10 * Math.random() + 1);
    m /= 10;
    var f = Math.floor(10 * Math.random() + 1);
    f /= 10;
    var p = Math.floor(10 * Math.random() + 1);
    p /= 10;
    var u = Math.floor(10 * Math.random() + 1);
    u /= 10;
    var y = Math.floor(10 * Math.random() + 1);
    y /= 10;
    var h = Math.floor(10 * Math.random() + 1);
    h /= 10;
    var v = Math.floor(10 * Math.random() + 1);
    v /= 10;
    var g = Math.floor(10 * Math.random() + 1);
    g /= 10;
    var w = Math.floor(10 * Math.random() + 1);
    w /= 10;
    var $ = Math.floor(1100 * Math.random() + 200);
    activateflame($, "1"), $ += "px";
    var M = Math.floor(1100 * Math.random() + 200);
    activateflame(M, "2"), M += "px";
    var x = Math.floor(1100 * Math.random() + 200);
    activateflame(x, "3"), x += "px";
    var I = Math.floor(1100 * Math.random() + 200);
    activateflame(I, "4"), I += "px";
    var T = Math.floor(1100 * Math.random() + 200);
    activateflame(T, "5"), T += "px";
    var B = Math.floor(1100 * Math.random() + 200);
    activateflame(B, "6"), B += "px";
    var k = Math.floor(1100 * Math.random() + 200);
    activateflame(k, "7"), k += "px";
    var E = Math.floor(1100 * Math.random() + 200);
    activateflame(E, "8"), E += "px";
    var b = Math.floor(1100 * Math.random() + 200);
    activateflame(b, "9"), b += "px";
    var A = Math.floor(1100 * Math.random() + 200);
    activateflame(A, "10"), A += "px";
    var L = document.getElementById("car1"),
        _ = document.getElementById("car2"),
        H = document.getElementById("car3"),
        N = document.getElementById("car4"),
        C = document.getElementById("car5"),
        S = document.getElementById("car6"),
        q = document.getElementById("car7"),
        G = document.getElementById("car8"),
        Y = document.getElementById("car9"),
        D = document.getElementById("car10");
    TweenMax.to(L, a, {
        left: $,
        delay: d
    }), TweenMax.to(_, t, {
        left: M,
        delay: m
    }), TweenMax.to(H, e, {
        left: x,
        delay: f
    }), TweenMax.to(N, n, {
        left: I,
        delay: p
    }), TweenMax.to(C, o, {
        left: T,
        delay: u
    }), TweenMax.to(S, r, {
        left: B,
        delay: y
    }), TweenMax.to(q, l, {
        left: k,
        delay: h
    }), TweenMax.to(G, i, {
        left: E,
        delay: v
    }), TweenMax.to(Y, s, {
        left: b,
        delay: g
    }), TweenMax.to(D, c, {
        left: A,
        delay: w
    })
}

function sortFloat(a, t) {
    return a - t
}

function checkposition() {
    carposition = new Array, carsequence = new Array, my_array = new Array;
    for (n = 0; n < 10; n++) {
        var a = n + 1,
            t = parseInt($("#car" + a).css("left"));
        t = (t += carpositionoffset[n]) + "." + n, carposition[n] = parseFloat(t)
    }
    carposition.sort(sortFloat);
    for (n = 0; n < 10; n++) {
        var e = carposition[n];
        e = String(e), my_array = e.split("."), void 0 == my_array[1] ? carsequence[n] = "0" : carsequence[n] =
            my_array[1]
    }
    for (var n = 0; n < 10; n++) {
        var o = "#pos" + (n + 1),
            r = -64 * carsequence[n];
        $(o).css("background-position", "0px " + r + "px")
    }
}

function wheelon() {
    for (var a = 1; a < 11; a++) $(".wheel" + a + "a").css("display", "block"), $(".wheel" + a + "b").css("display",
        "block")
}

function wheeloff() {
    for (var a = 1; a < 11; a++) $(".wheel" + a + "a").css("display", "none"), $(".wheel" + a + "b").css("display", "none")
}

function wheeloff_2() {
    for (var a = 1; a < 11; a++) $(".wheel" + a + "b").css("display", "none")
}

function startcountdown(a) {
    if (TweenLite.killDelayedCallsTo(winnerpage), $(".page1").css("display", "block"), $(".page2").css("display", "none"), 1 == waitfinish) return !1;
    stopanimation(), $("#car1").css("left", "1206px"), $("#car2").css("left", "1197px"), $("#car3").css("left",
        "1181px"), $("#car4").css("left", "1166px"), $("#car5").css("left", "1153px"), $("#car6").css("left",
            "1139px"), $("#car7").css("left", "1128px"), $("#car8").css("left", "1105px"), $("#car9").css("left",
                "1084px"), $("#car10").css("left", "1067px"), $(".roadstart").css("left", "960px"), $(".trafficlight").css(
                    "display", "block"), $(".redlight").css("display", "none"), $(".yellowlight").css("display", "none"), $(
                        ".greenlight").css("display", "none"), $(".countdownnum").html(""), $(".countdownnum2").html(""), $(
                            ".countdownnum").css("display", "block"), $(".countdownnum2").css("display", "block"), countdowninv =
        setInterval(function () {
            countdowntimer(a -= 1), countdown(a), 0 == a && (clearInterval(countdowninv), clearInterval(
                countdowninv2))
        }, 1e3);
    var t = 99;
    countdowninv2 = setInterval(function () {
        minisectimer(t), 0 == t && (t = 99), t -= 1
    }, 10), countdowntimer(a), countdown(a)
}

function minisectimer(a) {
    var t = convertTime(a);
    $(".countdownnum2").html(t)
}

function convertTime(a) {
    var t = String(a);
    return 1 == t.length ? t = "0" + t : t
}

function countdown(a) {
    var t = a / 60;
    if (0 == (t = Math.floor(t))) var e = "00";
    else e = convertTime(e = String(t));
    var n = convertTime(a - 60 * t);
    a < 0 ? $(".countdownnum").html("00:00") : $(".countdownnum").html(e + ":" + n)
}

function countdowntimer(a) {
    a >= 0 ? $(".trafficlight").css("display", "block") : $(".trafficlight").css("display", "none"), a <= 2 && a > 0 &&
        ($(".redlight").css("display", "block"), playing.pause(), playing = document.getElementById("cuttime"),
            ifopen && isplay && playing.play()), a <= 1 && $(".yellowlight").css("display", "block"), 0 == a && (
                startanimation(), $(".countdownnum").html("00:00"), $(".countdownnum2").html("00"), $(".greenlight").css(
                    "display", "block"), $(".trafficlight").delay(500).fadeOut(300))
}

function startanimation() {
    $(".wheel10a img").css("animation", "twinkling 0.01s  ease-in-out  infinite"), playing.pause(), playing = document
        .getElementById("running"), ifopen && isplay && playing.play(), addint = setInterval(function () {
            ShipUndulation()
        }, 200), wheelon();
    var a = document.getElementById("roadstart");
    TweenMax.to(a, 1, {
        left: "1334px",
        ease: Power1.easeIn
    });
    var t = document.getElementById("roaditm");
    TweenMax.to(t, .4, {
        left: "-120px",
        repeat: -1,
        ease: Linear.easeNone
    });
    var e = document.getElementById("scenaryitm");
    TweenMax.to(e, 20, {
        left: "0",
        repeat: -1,
        ease: Linear.easeNone
    }), $("wheel1a").css("display", "block"), $("wheel1b").css("display", "block"), animation1 = setInterval(
        function () {
            animate()
        }, 3e3), animation2 = setInterval(function () {
            checkposition()
        }, 300), animate(), wheelon()
}

function windflameani() {
    $(".wind").animate({
        opacity: .7
    }, 150, function () {
        $(".wind").css("opacity", "1")
    }), $(".flame").animate({
        opacity: .7
    }, 150, function () {
        $(".flame").css("opacity", "1")
    })
}

function stopanimation() {
    $("#roaditm").css("left", "-1300px"), $("#scenaryitm").css("left", "-1334px"), $(".flame").css("display", "none"),
        TweenMax.killAll(), wheeloff_2(), $(".wheel10a img").css("animation", "initial"), clearInterval(animation1),
        clearInterval(animation2), clearInterval(animation3), clearInterval(countdowninv), clearInterval(countdowninv2),
        clearInterval(addint), running.pause(), playing = empt
}

function getRandomInt(a, t) {
    return Math.floor(Math.random() * (t - a + 1)) + a
}

function midgame() {
    if (TweenLite.killDelayedCallsTo(winnerpage), $(".page1").css("display", "block"), $(".page2").css("display",
        "none"), 1 == waitfinish) return !1;
    stopanimation(), $("#roadstart").css("left", "1334px"), $(".trafficlight").css("display", "none");
    for (var a = 1; a < 11; a++) {
        var t = getRandomInt(200, 1e3);
        $("#car" + a).css("left", t + "px")
    }
    startanimation()
}

function finishgame(a, t) {
    if (TweenLite.killDelayedCallsTo(winnerpage), $(".page1").css("display", "block"), $(".page2").css("display",
        "none"), playing.pause(), playing = document.getElementById("running"), ifopen && isplay && playing.play(),
        1 == waitfinish) return !1;
    waitfinish = !0, TweenMax.killAll(), wheelon(), $("#roaditm").css("left", "-1300px");
    var e = document.getElementById("roaditm");
    TweenMax.to(e, .4, {
        left: "-120px",
        repeat: -1,
        ease: Linear.easeNone
    });
    var n = document.getElementById("scenaryitm");
    TweenMax.to(n, 20, {
        left: "0",
        repeat: -1,
        ease: Linear.easeNone
    });
    var o = document.getElementById("roadstart");
    TweenMax.to(o, 1, {
        left: "1334px",
        ease: Linear.easeNone,
        delay: 3
    });
    var r = setInterval(function () {
        checkposition()
    }, 300);
    $("#roadstart").css("left", "-250px"), $(".trafficlight").css("display", "none"), clearInterval(animation1),
        clearInterval(countdowninv), clearInterval(countdowninv2);
    for (var l = a.split(","), i = 0; i < 10; i++) {
        var s = Math.floor(10 * Math.random() + 1);
        s /= 10;
        var c = parseInt(l[i]) - 1,
            d = 100 * i - carpositionoffset[c] + 350,
            m = d + "px",
            f = "car" + l[i],
            p = document.getElementById(f);
        activateflame(d, l[i]), TweenMax.to(p, 3, {
            left: m,
            delay: s
        })
    }
    $(".flashlight").delay(3200).fadeIn(100, function () {
        $(".flashlight").fadeOut(500), clearInterval(r), waitfinish = !1, resultpage(a)
    }), void 0 != t && setTimeout(function () {
        startcountdown(t)
    }, 1e4)
}

function resultpage(a) {
    if ($(".page1").css("display", "block"), $(".page2").css("display", "none"), playing.pause(), playing = document
        .getElementById("kaisound"), ifopen && isplay && playing.play(), 1 == waitfinish) return !1;
    stopanimation(), $("#roadstart").css("left", "130px"), $(".trafficlight").css("display", "none");
    for (var t = a.split(","), e = 0; e < 10; e++) {
        var n = parseInt(t[e]) - 1,
            o = 100 * e - carpositionoffset[n] + 350 + "px",
            r = "car" + t[e];
        $("#" + r).css("left", o)
    }
    showcurrentresult(a), TweenLite.delayedCall(2, winnerpage, [a])
}

function showcurrentresult(a) {
    console.log(a)
    for (var t = a.split(","), e = 0; e < 10; e++) {
        var n = "#pos" + (e + 1),
            o = -64 * (t[e] - 1);
        $(n).css("background-position", "0px " + o + "px")
    }
}

function winnerpage(a) {
    $(".resultitm").css("opacity", 0), $(".resultcar1").css("left", "483px"), $(".resultcar1").css("top", "288px"), $(
        ".resultcar2").css("left", "170px"), $(".resultcar2").css("top", "251px"), $(".resultcar3").css("left",
            "946px"), $(".resultcar3").css("top", "254px");
    var t = a.split(",");
    $(".page1").css("display", "none"), $(".page2").css("display", "block");
    for (var e = 0; e < 3; e++) {
        var n = ".resultcarimg" + (e + 1);
        $(n).attr("src", "/video/pk10_ft/img/winner" + t[e] + ".png")
    }
    var o = document.getElementById("resultcar1");
    TweenMax.to(o, 1, {
        left: "395px",
        top: "328px",
        opacity: 1,
        delay: .2
    });
    var r = document.getElementById("resultcar2");
    TweenMax.to(r, 1, {
        left: "81px",
        top: "287px",
        opacity: 1,
        delay: .7
    });
    var l = document.getElementById("resultcar3");
    TweenMax.to(l, 1, {
        left: "859px",
        top: "291px",
        opacity: 1,
        delay: 1.2
    });
    var i = document.getElementById("result1");
    TweenMax.to(i, 1, {
        opacity: 1,
        delay: .2
    });
    var s = document.getElementById("result2");
    TweenMax.to(s, 1, {
        opacity: 1,
        delay: .7
    });
    var c = document.getElementById("result3");
    TweenMax.to(c, 1, {
        opacity: 1,
        delay: 1.2
    })
}

function hideAddressBar() {
    setTimeout(function () {
        window.scrollTo(0, 1)
    }, 0)
}
var animation1, animation2, waitfinish, addint, carHeight = [],
    isplay = !0,
    ifopen = !1,
    playing = "";
$(function () {
    document.getElementById("running"), document.getElementById("kaisound"), document.getElementById("cuttime");
    var a = document.getElementById("empt");
    playing = a
}), createNum = function (a, t) {
    var e = t - a,
        n = Math.random();
    return a + Math.round(n * e)
}, ShipUndulation = function () {
    for (var a = 0; a < 10; a++) $(".car" + (a + 1)).css("top", createNum(carHeight[a] - 4, carHeight[a] + 4) + "px")
};
var carpositionoffset = [0, 9, 25, 40, 53, 67, 78, 101, 122, 139];
setCarHeight = function () {
    for (var a = 1; a < 11; a++) {
        var t = 1 * $(".car" + a).css("top").replace("px", "");
        carHeight.push(t)
    }
}, setCarHeight();
var countdowninv, countdowninv2, animation3 = setInterval(function () {
    windflameani()
}, 150),
    soundBtn = document.getElementById("soundBtn");
    soundBtn.onclick = function () {
        console.log(123,playing)
        if("on" == this.className ){
            this.className = "off"  
            isplay = !1
            playing.pause()
        }else{
            playing.play()
            this.className = "on"
            isplay = !0
        }
    // ? (this.className = "off", isplay = !1, playing.pause()) : (this.className = "on", isplay = !0, playing.play())
};
var fun = {};
    fun.stateSound = function () {
        running.play(), kaisound.play(), running.pause(), kaisound.pause()
    }
fun.fillHtml = function (a, t) {
    $("#currentdrawid").html(a.currNum)
    $("#nextdrawtime").html(a.nextdrawtime)
    $("#nextdrawid").html(a.currid)
    $("#stat1_1").html(a.GuaYaArr[0])
    $("#stat1_2").html(a.GuaYaArr[1])
    $("#stat1_3").html(a.GuaYaArr[2])
    $("#stat2_1").html(a.LoHuArr[0])
    $("#stat2_2").html(a.LoHuArr[1])
    $("#stat2_3").html(a.LoHuArr[2])
    $("#stat2_4").html(a.LoHuArr[3])
    $("#stat2_5").html(a.LoHuArr[4])
    showcurrentresult(a.result)
    void 0 != t && startcountdown(t)
};
var obj = {
    currNum: 36,
    currid: 12345678,
    GuaYaArr: ["和", "冠", "亚"],
    LoHuArr: ["虎", "虎", "龙", "虎", "龙"],
    result: "8,2,6,9,3,4,1,10,5,7"
};
window.addEventListener("load", function () {
    hideAddressBar()
}), window.addEventListener("orientationchange", hideAddressBar);
