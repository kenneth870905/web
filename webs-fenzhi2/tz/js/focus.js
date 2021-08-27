var WinChkFocus = new function(){
	var $this = this;
	var hidden = "visible";
	var ChangeType = false;
	var sec = 1;
	var RunType;
	this.GetNowFocus = function(){
		return ChangeType;
	}
	var Run = function(){
		RunType = setInterval(function(){
			switch($("body").attr("focus")){
				case "visible":{
					ChangeType = true;
					//console.log('user in')
					break;
				}
				case "hidden":{
					ChangeType = false;
					//console.log('user out')
					break;
				}
			}
		},sec * 1000);
	}
	var FocusTop = function(){
		$(window).focus(function() {
			$("body").attr({"focus":'visible'})
		}).blur(function() {
			$("body").attr({"focus":'hidden'})
		});
	}
	var WinChange = function(){
		if (hidden in document)
		document.addEventListener("visibilitychange", onchange);
	  else if ((hidden = "mozHidden") in document)
		document.addEventListener("mozvisibilitychange", onchange);
	  else if ((hidden = "webkitHidden") in document)
		document.addEventListener("webkitvisibilitychange", onchange);
	  else if ((hidden = "msHidden") in document)
		document.addEventListener("msvisibilitychange", onchange);
	  // IE 9 and lower:
	  else if ("onfocusin" in document)
		document.onfocusin = document.onfocusout = onchange;
	  // All others:
	  else
		window.onpageshow = window.onpagehide
		= window.onfocus = window.onblur = onchange;
	
	  function onchange (evt) {
		var v = "visible", h = "hidden",
			evtMap = {
			  focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
			};
	
		evt = evt || window.event;
		if (evt.type in evtMap){
			$("body").attr({"focus":evtMap[evt.type]})
		}else{
			$("body").attr({"focus":this[hidden] ? "hidden" : "visible"})
		}
	  }
	
	  // set the initial state (but only if browser supports the Page Visibility API)
	  if( document[hidden] !== undefined )
		onchange({type: document[hidden] ? "blur" : "focus"});
	  
	}
	var init = function(){
		FocusTop();
		WinChange();
		Run();
	}
	init();
}