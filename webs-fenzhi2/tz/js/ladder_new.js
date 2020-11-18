var ladder = function(option){
	var op = $.extend({
		s		: "单",
		d		: "双",
		arrow	: false,
		ximg	: false,
		font	: "",
		sPosX	: Number,
		sPosY	: Number,
		dPosX	: Number,
		dPosY	: Number,
		// font: 
	},option)
	var $this = this;
	var that;
	var drow_speed = 3,
		open_mask = 500,
		arrow = op.arrow,
		ximg = op.ximg;
		end_seconds = 7;
	var show_start_ladder = true;
	var ctx;
	var Moveing = false;
	var NowRoute = [];
	var move_timer;
	var end_time
	this.complete = function(){}
	this.Start = function(lot){
		if(Moveing){
			ReStart();
		}
		end_time = new Date();
		end_time.setSeconds(end_time.getSeconds() + end_seconds);
		Moveing = true;
		if(show_start_ladder){
			DrowLayer(lot[1]);
		}
		DrowStart(lot[0]);
		GoRun(lot);
	}
	this.Stop = function(){
		clear();
		$this.complete();
		Moveing = false;
	}
	var DrowLayer = function(ladder_number){
		ctx.beginPath();
		ctx.fillStyle = '#c6c3b9';
		if(ladder_number ==  0){
			ctx.fillRect(27, 103, 158, 12);
			ctx.fillRect(27, 123, 158, 12);
			ctx.fillRect(27, 143, 158, 12);
		}else{
			ctx.fillRect(27, 93, 158, 12);
			ctx.fillRect(27, 113, 158, 12);
			ctx.fillRect(27, 133, 158, 12);
			ctx.fillRect(27, 153, 158, 12);
		}
		ctx.fill();
	}
	var DrowStart = function(starting_point){
		ctx.beginPath();
		ctx.fillStyle = '#3b3a3c';
		img = new Image();
		img.src = arrow;
		if(starting_point ==  0){
			ctx.arc(21, 21, 20, 0, 2*Math.PI);
			img.onload = function(){
				ctx.drawImage(img,14,13);   
			}
		}else{
			ctx.arc(192, 21, 20, 0, 2*Math.PI);
			img.onload = function(){
				ctx.drawImage(img,185,13);   
			}
		}
		ctx.fill();
	}
	var GoRun = function(lot){
		var ary = NowRoute[lot[0]][lot[1]];
		var x = ary[0][0];
		var y = ary[0][1];
		var ing = 0;
		move_timer = setInterval(function(){
			var nowtime = new Date();
			var run = new function(){
				var stop = false;
				var runing = function(){
					ctx.beginPath();
					ctx.fillStyle = '#535353';
					ctx.arc(x, y, 6, 0, 2*Math.PI);
					ctx.fill();
					switch(ary[ing][2]){
						case 'left':{
							if(x > ary[ing+1][0]){
								x--;
							}else{
								ing++;
							}
							break;
						}
						case 'right':{
							if(x < ary[ing+1][0]){
								x++;
							}else{
								ing++;
							}
							break;
						}
						case 'down':{
							if(y < ary[ing+1][1]){
								y++;
							}else{
								ing++;
							}
							break;
						}
						case'end':{
							clearInterval(move_timer)
							finish(lot)
							stop = true;
							break
						}
					}
					if(!stop){
						if (end_time <= nowtime){
							clearInterval(move_timer);
							runing();
						}
					}
				}
				runing();
			}
		},drow_speed);
	}
	var finish = function(lot){
		if(lot[0] == lot[1]){
			ctx.beginPath();
			ctx.fillStyle = '#d63e35';
			ctx.arc(192, 236, 20, 0, 2*Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#ffffff';
			ctx.font= op.font;
			ctx.fillText(op.d,op.dPosX,op.dPosY);
			ctx.stroke();
		}else{
			ctx.beginPath();
			ctx.fillStyle = '#106de1';
			ctx.arc(21, 236, 20, 0, 2*Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#ffffff';
			ctx.font= op.font;
			ctx.fillText(op.s,op.sPosX,op.sPosY);
			ctx.stroke();
		}
		$('.ladder-mask').delay(open_mask).fadeIn(300);
		
		move_timer = setInterval(function(){
			clearInterval(move_timer)
			clear();
			$this.complete();
			Moveing = false;
		},5000)
		$this.complete();
	}
	var clear = function(){
		ReStart();
	}
	var ReStart = function(){
		clearInterval(move_timer);
		$('#LadderCanvas').remove()
		$('.ladder-box').append('<canvas id="LadderCanvas"></canvas>')
		var canvas = document.getElementById("LadderCanvas");
		ctx = canvas.getContext("2d");
	    canvas.width = 214;
	    canvas.height = 258;

	    /*畫圓框線*/
	    ctx.beginPath();
		ctx.strokeStyle = '#a79f89';
		ctx.lineWidth=1;
		ctx.arc(21, 21, 20, 0, 2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(192, 21, 20, 0, 2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = '#a59f89';
		ctx.arc(21, 236, 20, 0, 2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(192, 236, 20, 0, 2*Math.PI);
		ctx.stroke();

		/*畫實心圓*/
	    ctx.beginPath();
		ctx.fillStyle = '#aca796';
		ctx.arc(21, 21, 20, 0, 2*Math.PI);
		ctx.arc(192, 21, 20, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(172,167,150,0.7)';
		ctx.arc(21, 236, 20, 0, 2*Math.PI);
		ctx.arc(192, 236, 20, 0, 2*Math.PI);
		ctx.fill();

		/*圓內的字*/
		ctx.beginPath();
		img = new Image();
		img.src = ximg;
	    img.onload = function(){
	        ctx.drawImage(img,12,12);   
	        ctx.drawImage(img,183,12); 
	    }
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = '#ffffff';
		ctx.font= op.font;
		ctx.fillText(op.s,op.sPosX,op.sPosY);
		ctx.fillText(op.d,op.dPosX,op.dPosY);
		ctx.stroke();

		/*畫預設梯子*/
		ctx.beginPath();
		ctx.fillStyle = '#c6c3b9';
		ctx.fillRect(15, 53, 12, 152);
		ctx.fillRect(185, 53, 12, 152);
		ctx.fill();
	}
	var CreateDrowRoute = function(){
		NowRoute[0] = [];
		NowRoute[0][0] = [];
		NowRoute[0][1] = [];
		NowRoute[1] = [];
		NowRoute[1][0] = [];
		NowRoute[1][1] = [];
		//--v1--
		NowRoute[0][0][0] = [21,53,'down'],
		NowRoute[0][0][1] = [21,109,'right'],
		NowRoute[0][0][2] = [191,109,'down'],
		NowRoute[0][0][3] = [191,129,'left'],
		NowRoute[0][0][4] = [21,129,'down'],
		NowRoute[0][0][5] = [21,149,'right'],
		NowRoute[0][0][6] = [191,149,'down'],
		NowRoute[0][0][7] = [191,205,'end']

		NowRoute[1][0][0] = [191,53,'down'],
		NowRoute[1][0][1] = [191,109,'left'],
		NowRoute[1][0][2] = [21,109,'down'],
		NowRoute[1][0][3] = [21,129,'right'],
		NowRoute[1][0][4] = [191,129,'down'],
		NowRoute[1][0][5] = [191,149,'left'],
		NowRoute[1][0][6] = [21,149,'down'],
		NowRoute[1][0][7] = [21,205,'end']

		NowRoute[0][1][0] = [21,53,'down'],
		NowRoute[0][1][1] = [21,99,'right'],
		NowRoute[0][1][2] = [191,99,'down'],
		NowRoute[0][1][3] = [191,119,'left'],
		NowRoute[0][1][4] = [21,119,'down'],
		NowRoute[0][1][5] = [21,139,'right'],
		NowRoute[0][1][6] = [191,139,'down'],
		NowRoute[0][1][7] = [191,159,'left'],
		NowRoute[0][1][8] = [21,159,'down'],
		NowRoute[0][1][9] = [21,205,'end']

		NowRoute[1][1][0] = [191,53,'down'],
		NowRoute[1][1][1] = [191,99,'left'],
		NowRoute[1][1][2] = [21,99,'down'],
		NowRoute[1][1][3] = [21,119,'right'],
		NowRoute[1][1][4] = [191,119,'down'],
		NowRoute[1][1][5] = [191,139,'left'],
		NowRoute[1][1][6] = [21,139,'down'],
		NowRoute[1][1][7] = [21,159,'right'],
		NowRoute[1][1][8] = [191,159,'down'],
		NowRoute[1][1][9] = [191,205,'end']
	}
	var init = function(){
		CreateDrowRoute();
		ReStart()
	}
	init();
}