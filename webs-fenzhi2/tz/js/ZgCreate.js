var Zg_Create = function(){
	var $this = this;
	this.alert = function(Title,Content,option){
		try{
			var str = LG.gstr("lang_close");
		}catch(e){
			var str = "关闭";
		}
		
		var op = $.extend({
			ok_str		: str,
			id			: "ZgCreateAlert",
			size		: "static",
			position	: "middle",
			repeat		: true,
			complete 	: function(){},
			BeforeShow	: function(){}
		},option);
		var modal_div = $("<div/>").addClass("ZgModal").attr("id",op.id);
		modal_div.bind("Close",function(){
			modal_div.fadeOut(100,function(){
				modal_div.remove();
			});
		})
		var modal_size = "";
		if(op.size == "Large"){
			modal_size = "ZgModal-lg";
		}
		if(op.size == "small"){
			modal_size = "ZgModal-sm";
		}
		var dialog = $("<div/>").addClass("ZgModal-dialog " + modal_size);
		var content = $("<div/>").addClass("ZgModal-content");
		
		var head = $("<div/>").addClass("ZgModal-header");
		var cls_but = $("<button/>").addClass("close").html('<span aria-hidden="true">&times;</span>');
		cls_but.click(function(){
			modal_div.trigger("Close");
		})
		head.append(cls_but);
		head.append('<h4 class="ZgModal-title">' + Title + '</h4>');
		
		var body = $("<div/>").addClass("ZgModal-body");
		body.append(Content);
		
		var footer = $("<div/>").addClass("ZgModal-footer");

		var btn = $("<button/>").addClass("ZgModal-btn btn-cancel").html(op.ok_str)
		btn.click(op.complete);
		btn.click(function(){
			modal_div.trigger("Close");
		});
		btn.focus();
		footer.append(btn);
		content.append(head).append(body).append(footer);
		dialog.append(content);
		modal_div.append(dialog);
		
		if($("body").find("#"+op.id).length > 0){
			if(op.repeat){
				var myVar = setInterval(function(){ 
					if(!$("body").find("#"+op.id).length){
						clearInterval(myVar);
						op.BeforeShow();
						$("body").append(modal_div);
					}
				}, 200);
			}
		}else{
			op.BeforeShow();
			$("body").append(modal_div);
		}
	}
	this.confirm = function(Title,Content,option){
		try{
			var str_confirm = LG.gstr("lang_confirm");
			var str_cancel = LG.gstr("lang_cancel");
		}catch(e){
			var str_confirm = "确认";
			var str_cancel = "取消";
		}
		var op = $.extend({
			ok_str 		: str_confirm,
			close_str	: str_cancel,
			size		: "static",
			position	: "middle",
			id			: "ZgCreateConfirm",
			complete 	: function(){},
			BeforeShow	: function(){}
		},option);
		var modal_div = $("<div/>").addClass("ZgModal").attr("id",op.id);
		modal_div.bind("Close",function(){
			modal_div.fadeOut(100,function(){
				modal_div.remove();
			});
		})
		var modal_size = "";
		if(op.size == "Large"){
			modal_size = "ZgModal-lg";
		}
		if(op.size == "small"){
			modal_size = "ZgModal-sm";
		}
		var dialog = $("<div/>").addClass("ZgModal-dialog " + modal_size);
		var content = $("<div/>").addClass("ZgModal-content");
		
		var head = $("<div/>").addClass("ZgModal-header");
		var cls_but = $("<button/>").addClass("close").html('<span aria-hidden="true">&times;</span>');
		cls_but.click(function(){
			modal_div.trigger("Close");
		})
		head.append(cls_but);
		head.append('<h4 class="ZgModal-title">' + Title + '</h4>');
		
		var body = $("<div/>").addClass("ZgModal-body");
		body.append(Content);
		
		var footer = $("<div/>").addClass("ZgModal-footer");

		var btn = $("<button/>").addClass("ZgModal-btn btn-cancel").append(op.ok_str);
		btn.click(op.complete);
		btn.click(function(){
			modal_div.trigger("Close");
		});
		footer.append(btn);
		footer.append(
			$("<button/>").addClass("ZgModal-btn btn-cancel").html(op.close_str).click(function(){
				modal_div.trigger("Close")
			})
		);
		content.append(head).append(body).append(footer);
		dialog.append(content);
		modal_div.append(dialog);
		if($("body").find("#"+op.id).length > 0){
			if(op.repeat){
				var myVar = setInterval(function(){ 
					if(!$("body").find("#"+op.id).length){
						clearInterval(myVar);
						op.BeforeShow();
						$("body").append(modal_div);
					}
				}, 200);
			}
		}else{
			op.BeforeShow();
			$("body").append(modal_div);
		}
	}
};
var ZgCreate = new Zg_Create();