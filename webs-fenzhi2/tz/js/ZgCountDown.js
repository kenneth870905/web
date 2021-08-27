var CountDown = function(prop){
	var options = $.extend({
		maturity		: false,
		second			: false,
		id				: "#PeriodsCloseTime",
		callback		: function(){},
		callfivesec		: function(){},
		callmaturity	: function(){}
	},prop);
	var $this = this,
		that = $(options.id),
		days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60,
		MaturityTime = new Date(),
		Tmier;
	var TimeInit = function(DateStr){
		MaturityTime = new Date(DateStr);
		t_Timer();
	}
	var TimeInitBySecond = function(){
		MaturityTime = new Date();
		MaturityTime.setSeconds(MaturityTime.getSeconds() + options.second);
		t_Timer_second();
	}
	this.clear_timer = function(){
		clearTimeout(Tmier);
	}
	var t_Timer_second = function(){
		var left;
		var d_time = {
			d	: 0,
			h	: 0,
			i	: 0,
			s	: 0,
		}
		left = Math.floor((MaturityTime - (new Date())) / 1000);
		if(left < 0){
			left = 0;
		}
		d_time.h = Math.floor(left / hours);
		left -= d_time.h*hours;
		
		d_time.i = Math.floor(left / minutes);
		left -= d_time.i*minutes;
		
		d_time.s = left;
		options.callback(d_time);
		CreateContent(d_time);
		
		var c = 0;
		for(var i in d_time){
			if(d_time[i]!=0){
				c++;
				break;
			}
		}
		if(c==0){
			options.callmaturity()
		}else{
			Tmier = setTimeout(function(){
				t_Timer_second();
			}, 1000);
		}
	}
	var t_Timer = function(){
		var left;
		var d_time = {
			d	: 0,
			h	: 0,
			i	: 0,
			s	: 0,
		}
		left = Math.floor((MaturityTime - (new Date())) / 1000);
		if(left < 0){
			left = 0;
		}
		d_time.h = Math.floor(left / hours);
		left -= d_time.h*hours;
		
		d_time.i = Math.floor(left / minutes);
		left -= d_time.i*minutes;
		
		d_time.s = left;
		options.callback(d_time);
		CreateContent(d_time);
		
		var c = 0;
		for(var i in d_time){
			if(d_time[i]!=0){
				c++;
				break;
			}
		}
		if(c==0){
			options.callmaturity()
		}else{
			Tmier = setTimeout(function(){
				t_Timer();
			}, 1000);
		}
	}
	this.Stop = function(){
		clearTimeout(Tmier);
	}
	var CreateContent = function(d_time){
		that.html(padLeft((d_time.d *24)+d_time.h,2) + ":" + padLeft(d_time.i,2) + ":" + padLeft(d_time.s,2));
	}
	/*不足補0(左)*/
	var padLeft = function(str,lenght){
		if(str.toString().length >= lenght)
			return str;
		else
			return padLeft("0" +str,lenght);
	}
	var init = function(){
		/*if(options.maturity){
			TimeInit(options.maturity);
		}*/
		TimeInitBySecond();
	}
	init();
};