var loading_fun = function(){
	var $this = this;
	var that;
	var loading_ready = {};
	var default_option = {
		txt			: false,
		forced_close: false
	}
	this.loading = function(b,_ready,option){
		var op = $.extend(default_option,option)
		var pass = true;
		if(_ready){
			loading_ready[_ready] = b;
		}
		if(!b){
			for(var k in loading_ready){
				if(loading_ready[k]){
					pass = false;
					break;
				}
			}
			if(pass == true){
				loading_ready = {};
			}
		}
		if(b){
			$("body").addClass("loading");
			that.stop(true, true).fadeIn(200);
			if(op.txt){
				that.find(".font_loading_text").html(op.txt);
			}
		}else{
			if(pass || op.forced_close){
				$("body").removeClass("loading"); 
				that.stop(true, true).delay(200).fadeOut(200);
			}
		}
	}
	var create = function(){
		that = $("<div/>").addClass("div_loading").append(
			$("<div/>").addClass("loading-rotate").append(
				$("<div/>")
			)
		).append(
			$("<div/>").addClass("div_loading_text").append(
				$("<div/>").addClass("font_loading_text")
			)
		)
	}
	var init = function(){
		create();
		$("body").append(that);
	}
	init();
}
var loadfun,loading=function(){};
$(function(){
	loadfun = new loading_fun();
	loading = loadfun.loading;
});