var animation1;
var animation2;
var waitfinish;
var ifopen = false;
var videoTools = {};

function activateflame(pos2, divnum) {
	var pos1 = parseInt($("#car" + divnum).css("left"));
	if (pos1 > pos2) {
		$(".car" + divnum + " .wind").css("display", "block");
		$(".car" + divnum + " .flame").css("display", "block");
	} else {
		$(".car" + divnum + " .wind").css("display", "none");
		$(".car" + divnum + " .flame").css("display", "none");
	}
}
$(function() {
	$(".currentdraw").on("click", "#closeSound", function() {
		if ($(this).hasClass("closesoundbtn")) {
			$(this).removeClass("closesoundbtn");
			document.getElementById("sound").play();
			ifopen = true;
		} else {
			$(this).addClass("closesoundbtn");
			ifopen = false;
			if ($("#sound").attr("src") != undefined) {
				document.getElementById("sound").pause()
			}
		}
	});
})

function animate() {
	var random1 = Math.floor((Math.random() * 40) + 30);
	random1 = random1 / 10;
	var random2 = Math.floor((Math.random() * 40) + 30);
	random2 = random2 / 10;
	var random3 = Math.floor((Math.random() * 40) + 30);
	random3 = random3 / 10;
	var random4 = Math.floor((Math.random() * 40) + 30);
	random4 = random4 / 10;
	var random5 = Math.floor((Math.random() * 40) + 30);
	random5 = random5 / 10;
	var random6 = Math.floor((Math.random() * 40) + 30);
	random6 = random6 / 10;
	var random7 = Math.floor((Math.random() * 40) + 30);
	random7 = random7 / 10;
	var random8 = Math.floor((Math.random() * 40) + 30);
	random8 = random8 / 10;
	var random9 = Math.floor((Math.random() * 40) + 30);
	random9 = random9 / 10;
	var random10 = Math.floor((Math.random() * 40) + 30);
	random10 = random10 / 10;
	var random1a = Math.floor((Math.random() * 10) + 1);
	random1a = random1a / 10;
	var random2a = Math.floor((Math.random() * 10) + 1);
	random2a = random2a / 10;
	var random3a = Math.floor((Math.random() * 10) + 1);
	random3a = random3a / 10;
	var random4a = Math.floor((Math.random() * 10) + 1);
	random4a = random4a / 10;
	var random5a = Math.floor((Math.random() * 10) + 1);
	random5a = random5a / 10;
	var random6a = Math.floor((Math.random() * 10) + 1);
	random6a = random6a / 10;
	var random7a = Math.floor((Math.random() * 10) + 1);
	random7a = random7a / 10;
	var random8a = Math.floor((Math.random() * 10) + 1);
	random8a = random8a / 10;
	var random9a = Math.floor((Math.random() * 10) + 1);
	random9a = random9a / 10;
	var random10a = Math.floor((Math.random() * 10) + 1);
	random10a = random10a / 10;
	var random1b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random1b, "1");
	random1b = random1b + "px";
	var random2b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random2b, "2");
	random2b = random2b + "px";
	var random3b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random3b, "3");
	random3b = random3b + "px";
	var random4b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random4b, "4");
	random4b = random4b + "px";
	var random5b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random5b, "5");
	random5b = random5b + "px";
	var random6b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random6b, "6");
	random6b = random6b + "px";
	var random7b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random7b, "7");
	random7b = random7b + "px";
	var random8b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random8b, "8");
	random8b = random8b + "px";
	var random9b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random9b, "9");
	random9b = random9b + "px";
	var random10b = Math.floor((Math.random() * 1100) + 200);
	activateflame(random10b, "10");
	random10b = random10b + "px";
	var car1 = document.getElementById("car1");
	var car2 = document.getElementById("car2");
	var car3 = document.getElementById("car3");
	var car4 = document.getElementById("car4");
	var car5 = document.getElementById("car5");
	var car6 = document.getElementById("car6");
	var car7 = document.getElementById("car7");
	var car8 = document.getElementById("car8");
	var car9 = document.getElementById("car9");
	var car10 = document.getElementById("car10");
	TweenMax.to(car1, random1, {
		left: random1b,
		delay: random1a
	});
	TweenMax.to(car2, random2, {
		left: random2b,
		delay: random2a
	});
	TweenMax.to(car3, random3, {
		left: random3b,
		delay: random3a
	});
	TweenMax.to(car4, random4, {
		left: random4b,
		delay: random4a
	});
	TweenMax.to(car5, random5, {
		left: random5b,
		delay: random5a
	});
	TweenMax.to(car6, random6, {
		left: random6b,
		delay: random6a
	});
	TweenMax.to(car7, random7, {
		left: random7b,
		delay: random7a
	});
	TweenMax.to(car8, random8, {
		left: random8b,
		delay: random8a
	});
	TweenMax.to(car9, random9, {
		left: random9b,
		delay: random9a
	});
	TweenMax.to(car10, random10, {
		left: random10b,
		delay: random10a
	});
}
var carpositionoffset = [0, 9, 25, 40, 53, 67, 78, 101, 122, 139];

function sortFloat(a, b) {
	return a - b;
}

function checkposition() {
	carposition = new Array();
	carsequence = new Array();
	my_array = new Array();
	for (var i = 0; i < 10; i++) {
		var carname = i + 1;
		var carp = parseInt($("#car" + carname).css("left"));
		carp = carp + carpositionoffset[i];
		carp = carp + "." + i;
		carposition[i] = parseFloat(carp);
	}
	carposition.sort(sortFloat);
	for (var i = 0; i < 10; i++) {
		var carstring = carposition[i];
		carstring = String(carstring);
		my_array = carstring.split(".");
		if (my_array[1] == undefined) {
			carsequence[i] = "0";
		} else {
			carsequence[i] = my_array[1];
		}
	}
	for (var i = 0; i < 10; i++) {
		var posname = i + 1;
		var position = "#pos" + posname;
		var carssquencename = carsequence[i];
		var bgposition = -64 * carssquencename;
		$(position).css("background-position", "0px " + bgposition + "px");
	}
}

function wheelon() {
	for (var i = 1; i < 11; i++) {
		$(".wheel" + i + "a").css("display", "block");
		$(".wheel" + i + "b").css("display", "block");
	}
}

function wheeloff() {
	for (var i = 1; i < 11; i++) {
		$(".wheel" + i + "a").css("display", "none");
		$(".wheel" + i + "b").css("display", "none");
	}
}
var countdowninv;
var countdowninv2;

function startcountdown(timer) {
	TweenLite.killDelayedCallsTo(winnerpage);
	$(".page1").css("display", "block");
	$(".page2").css("display", "none");
	if (waitfinish == true) {
		return false;
	}
	stopanimation();
	$("#car1").css("left", "1206px");
	$("#car2").css("left", "1197px");
	$("#car3").css("left", "1181px");
	$("#car4").css("left", "1166px");
	$("#car5").css("left", "1153px");
	$("#car6").css("left", "1139px");
	$("#car7").css("left", "1128px");
	$("#car8").css("left", "1105px");
	$("#car9").css("left", "1084px");
	$("#car10").css("left", "1067px");
	$(".roadstart").css("left", "960px");
	$(".trafficlight").css("display", "block");
	$(".redlight").css("display", "none");
	$(".yellowlight").css("display", "none");
	$(".greenlight").css("display", "none");
	$(".countdownnum").html("");
	$(".countdownnum2").html("");
	$(".countdownnum").css("display", "block");
	$(".countdownnum2").css("display", "block");
	countdowninv = setInterval(function() {
		timer -= 1;
		countdowntimer(timer);
		countdown(timer);
		if (timer == 0) {
			clearInterval(countdowninv);
			clearInterval(countdowninv2);
		}
	}, 1000);
	var timer2 = 99;
	countdowninv2 = setInterval(function() {
		minisectimer(timer2);
		if (timer2 == 0) {
			timer2 = 99;
		}
		timer2 -= 1;
	}, 10);
	countdowntimer(timer);
	countdown(timer);
}

function minisectimer(timer2) {
	var timershow = convertTime(timer2);
	$(".countdownnum2").html(timershow);
}

function convertTime(num) {
	var shownum = String(num);
	var countnum = shownum.length;
	if (countnum == 1) {
		shownum = "0" + shownum;
		return shownum;
	} else {
		return shownum;
	}
}

function countdown(sec) {
	var minute = sec / 60;
	minute = Math.floor(minute);
	if (minute == 0) {
		var showminute = "00";
	} else {
		var showminute = String(minute);
		showminute = convertTime(showminute);
	}
	var second = sec - (minute * 60);
	var showsec = convertTime(second);
	if (sec < 0) {
		$(".countdownnum").html("00:00");
	} else {
		$(".countdownnum").html(showminute + ":" + showsec);
	}
}

function countdowntimer(timer) {
	if (timer >= 0) {
		$(".trafficlight").css("display", "block");
	} else {
		$(".trafficlight").css("display", "none");
	}
	if (timer <= 2) {
		$(".redlight").css("display", "block");
	}
	if (timer == 2) {
		if (ifopen && videoTools.ifsund()) {
			$("#sound").attr("src", "/video/pk10/sound/cuttime.mp3");
			$("#sound").removeAttr("loop");
			document.getElementById("sound").play();
		}
	}
	if (timer <= 1) {
		$(".yellowlight").css("display", "block");
	}
	if (timer == 0) {
		if ($(window.parent.document).find("#personage").css("margin-top") != "25px") {
			$(window.parent.document).find("#ad").css("display", "none");
		}
		startanimation();
		$(".countdownnum").html("00:00");
		$(".countdownnum2").html("00");
		$(".greenlight").css("display", "block");
		$(".trafficlight").delay(500).fadeOut(300);
	}
}

function startanimation() {
	setTimeout(function() {
		if (ifopen && videoTools.ifsund()) {
			$("#sound").attr("src", "/video/pk10/sound/staring.mp3");
			$("#sound").attr("loop", "loop");
			document.getElementById("sound").play();
		}
	}, 1000);
	wheelon();
	var roadstart = document.getElementById("roadstart");
	TweenMax.to(roadstart, 1, {
		left: "1334px",
		ease: Power1.easeIn
	});
	var roaditm = document.getElementById("roaditm");
	TweenMax.to(roaditm, 0.4, {
		left: "-120px",
		repeat: -1,
		ease: Linear.easeNone
	});
	var scenaryitm = document.getElementById("scenaryitm");
	TweenMax.to(scenaryitm, 20, {
		left: "0",
		repeat: -1,
		ease: Linear.easeNone
	});
	$("wheel1a").css("display", "block");
	animation1 = setInterval(function() {
		animate();
	}, 3000);
	animation2 = setInterval(function() {
		checkposition();
	}, 300);
	animate();
	wheelon();
}

function windflameani() {
	$(".wind").animate({
		opacity: 0.70
	}, 150, function() {
		$(".wind").css("opacity", "1");
	});
	$(".flame").animate({
		opacity: 0.70
	}, 150, function() {
		$(".flame").css("opacity", "1");
	});
}
var animation3 = setInterval(function() {
	windflameani();
}, 150);

function stopanimation() {
	$("#roaditm").css("left", "-1300px");
	$("#scenaryitm").css("left", "-1334px");
	$(".wind").css("display", "none");
	$(".flame").css("display", "none");
	TweenMax.killAll();
	wheeloff();
	clearInterval(animation1);
	clearInterval(animation2);
	clearInterval(countdowninv);
	clearInterval(countdowninv2);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midgame() {
	TweenLite.killDelayedCallsTo(winnerpage);
	$(".page1").css("display", "block");
	$(".page2").css("display", "none");
	if (waitfinish == true) {
		return false;
	}
	stopanimation();
	$("#roadstart").css("left", "1334px");
	$(".trafficlight").css("display", "none");
	for (var i = 1; i < 11; i++) {
		var randomnum = getRandomInt(200, 1000);
		$("#car" + i).css("left", randomnum + "px");
	}
	startanimation();
}

function finishgame(finalresult) {
	setTimeout(function() {
		$("#sound").attr("src", "/video/pk10/sound/over.mp3");
		document.getElementById("sound").pause();
		if (ifopen && videoTools.ifsund()) {
			$("#sound").removeAttr("loop");
			document.getElementById("sound").play();
		}
		setTimeout(function() {
			$("#sound").removeAttr("src");
		}, 4000);
	}, 3000);
	TweenLite.killDelayedCallsTo(winnerpage);
	$(".page1").css("display", "block");
	$(".page2").css("display", "none");
	if (waitfinish == true) {
		return false;
	}
	waitfinish = true;
	TweenMax.killAll();
	wheelon();
	$("#roaditm").css("left", "-1300px");
	var roaditm = document.getElementById("roaditm");
	TweenMax.to(roaditm, 0.4, {
		left: "-120px",
		repeat: -1,
		ease: Linear.easeNone
	});
	var scenaryitm = document.getElementById("scenaryitm");
	TweenMax.to(scenaryitm, 20, {
		left: "0",
		repeat: -1,
		ease: Linear.easeNone
	});
	var roadstart = document.getElementById("roadstart");
	TweenMax.to(roadstart, 1, {
		left: "1334px",
		ease: Linear.easeNone,
		delay: 3
	});
	var checkpositionani = setInterval(function() {
		checkposition();
	}, 300);
	$("#roadstart").css("left", "-250px");
	$(".trafficlight").css("display", "none");
	clearInterval(animation1);
	clearInterval(countdowninv);
	clearInterval(countdowninv2);
	var resultarry = finalresult.split(",");
	$(resultarry).each(function(index) {
		if (this.substring(0, 1) == "0") {
			resultarry[index] = this.substring(1, 2)
		}
	})
	for (var i = 0; i < 10; i++) {
		var randomdelay = Math.floor((Math.random() * 10) + 1);
		randomdelay = randomdelay / 10;
		var caroffset = parseInt(resultarry[i]) - 1;
		var winningpos = (i * 100) - carpositionoffset[caroffset] + 350;
		var anipos = winningpos + "px";
		var carnum = "car" + resultarry[i];
		var car = document.getElementById(carnum);
		activateflame(winningpos, resultarry[i]);
		TweenMax.to(car, 3, {
			left: anipos,
			delay: randomdelay
		});
	}
	$(".flashlight").delay(3200).fadeIn(100, function() {
		$(".flashlight").fadeOut(500);
		clearInterval(checkpositionani);
		waitfinish = false;
		resultpage(finalresult);
		setTimeout(function() {
			$("#sound").removeAttr("src");
		}, 6000);
	});
}

function resultpage(finalresult) {
	$(".page1").css("display", "block");
	$(".page2").css("display", "none");
	if (waitfinish == true) {
		return false;
	}
	stopanimation();
	$("#roadstart").css("left", "130px");
	$(".trafficlight").css("display", "none");
	var resultarry = finalresult.split(",");
	$(resultarry).each(function(index) {
		if (this.substring(0, 1) == "0") {
			resultarry[index] = this.substring(1, 2)
		}
	});
	for (var i = 0; i < 10; i++) {
		var caroffset = parseInt(resultarry[i]) - 1;
		var winningpos = (i * 100) - carpositionoffset[caroffset] + 350;
		var anipos = winningpos + "px";
		var carnum = "car" + resultarry[i];
		$("#" + carnum).css("left", anipos);
	}
	showcurrentresult(finalresult);
	TweenLite.delayedCall(2, winnerpage, [finalresult]);
}

function showcurrentresult(results) {
	var resultarry = results.split(",");
	$(resultarry).each(function(index) {
		if (this.substring(0, 1) == "0") {
			resultarry[index] = this.substring(1, 2)
		}
	});
	for (var i = 0; i < 10; i++) {
		var posname = i + 1;
		var position = "#pos" + posname;
		var carssquencename = resultarry[i] - 1;
		var bgposition = -64 * carssquencename;
		$(position).css("background-position", "0px " + bgposition + "px");
	}
}

function winnerpage(results) {
	$(".resultitm").css("opacity", 0);
	$(".resultcar1").css("left", "483px");
	$(".resultcar1").css("top", "288px");
	$(".resultcar2").css("left", "170px");
	$(".resultcar2").css("top", "251px");
	$(".resultcar3").css("left", "946px");
	$(".resultcar3").css("top", "254px");
	var resultarry = results.split(",");
	$(resultarry).each(function(index) {
		if (this.substring(0, 1) == "0") {
			resultarry[index] = this.substring(1, 2)
		}
	});
	$(".page1").css("display", "none");
	$(".page2").css("display", "block");
	for (var i = 0; i < 3; i++) {
		var posname = i + 1;
		var position = ".resultcarimg" + posname;
		$(position).attr("src", "/video/pk10/img/num/" + resultarry[i] + ".png");
	}
	var resultcar1 = document.getElementById("resultcar1");
	TweenMax.to(resultcar1, 1, {
		left: "395px",
		top: "328px",
		opacity: 1,
		delay: 0.2
	});
	var resultcar2 = document.getElementById("resultcar2");
	TweenMax.to(resultcar2, 1, {
		left: "81px",
		top: "287px",
		opacity: 1,
		delay: 0.7
	});
	var resultcar3 = document.getElementById("resultcar3");
	TweenMax.to(resultcar3, 1, {
		left: "859px",
		top: "291px",
		opacity: 1,
		delay: 1.2
	});
	var result1 = document.getElementById("result1");
	TweenMax.to(result1, 1, {
		opacity: 1,
		delay: 0.2
	});
	var result2 = document.getElementById("result2");
	TweenMax.to(result2, 1, {
		opacity: 1,
		delay: 0.7
	});
	var result3 = document.getElementById("result3");
	TweenMax.to(result3, 1, {
		opacity: 1,
		delay: 1.2
	});
}

function hideAddressBar() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 0);
}
window.addEventListener("load", function() {
	hideAddressBar();
});
window.addEventListener("orientationchange", hideAddressBar);
videoTools.ifsund = function() {
	var flag = null;
	if ($("#closeSound").hasClass("closesoundbtn")) {
		flag = false;
	} else {
		flag = true;
	}
	console.log("flag：" + flag);
	return flag
}


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
// var obj = {
//     currNum: 36,
//     currid: 12345678,
//     GuaYaArr: ["和", "冠", "亚"],
//     LoHuArr: ["虎", "虎", "龙", "虎", "龙"],
//     result: "8,2,6,9,3,4,1,10,5,7"
// };
