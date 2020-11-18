var ladder = function(arrow,ximg){
	var $this = this;
	var that;
	var straight_speed = 1,
		horizontal_speed = 3,
		horizontal_speed_s = 22,
		Lecturing_delay = 500,
		Drawlines_delay = 50,
		open_mask = 50,
		arrow = arrow,
		ximg = ximg;

	var canvas;
	var ctx;
	var Moveing = false;
	this.complete = function(){}
	
	var NowRoute = [];
	NowRoute[0] = [];
	NowRoute[0][0] = [];
	NowRoute[0][1] = [];
	NowRoute[1] = [];
	NowRoute[1][0] = [];
	NowRoute[1][1] = [];
	//--v1--
	NowRoute[0][0][0] = [21,53,'down',horizontal_speed],
	NowRoute[0][0][1] = [21,109,'right',straight_speed],
	NowRoute[0][0][2] = [191,109,'down',horizontal_speed_s],
	NowRoute[0][0][3] = [191,129,'left',straight_speed],
	NowRoute[0][0][4] = [21,129,'down',horizontal_speed_s],
	NowRoute[0][0][5] = [21,149,'right',straight_speed],
	NowRoute[0][0][6] = [191,149,'down',horizontal_speed],
	NowRoute[0][0][7] = [191,205,'end',0]

	NowRoute[1][0][0] = [191,53,'down',horizontal_speed],
	NowRoute[1][0][1] = [191,109,'left',straight_speed],
	NowRoute[1][0][2] = [21,109,'down',horizontal_speed_s],
	NowRoute[1][0][3] = [21,129,'right',straight_speed],
	NowRoute[1][0][4] = [191,129,'down',horizontal_speed_s],
	NowRoute[1][0][5] = [191,149,'left',straight_speed],
	NowRoute[1][0][6] = [21,149,'down',horizontal_speed],
	NowRoute[1][0][7] = [21,205,'end',0]

	NowRoute[0][1][0] = [21,53,'down',horizontal_speed],
	NowRoute[0][1][1] = [21,99,'right',straight_speed],
	NowRoute[0][1][2] = [191,99,'down',horizontal_speed_s],
	NowRoute[0][1][3] = [191,119,'left',straight_speed],
	NowRoute[0][1][4] = [21,119,'down',horizontal_speed_s],
	NowRoute[0][1][5] = [21,139,'right',straight_speed],
	NowRoute[0][1][6] = [191,139,'down',horizontal_speed_s],
	NowRoute[0][1][7] = [191,159,'left',straight_speed],
	NowRoute[0][1][8] = [21,159,'down',horizontal_speed],
	NowRoute[0][1][9] = [21,205,'end',0]

	NowRoute[1][1][0] = [191,53,'down',horizontal_speed],
	NowRoute[1][1][1] = [191,99,'left',straight_speed],
	NowRoute[1][1][2] = [21,99,'down',horizontal_speed_s],
	NowRoute[1][1][3] = [21,119,'right',straight_speed],
	NowRoute[1][1][4] = [191,119,'down',horizontal_speed_s],
	NowRoute[1][1][5] = [191,139,'left',straight_speed],
	NowRoute[1][1][6] = [21,139,'down',horizontal_speed_s],
	NowRoute[1][1][7] = [21,159,'right',straight_speed],
	NowRoute[1][1][8] = [191,159,'down',horizontal_speed],
	NowRoute[1][1][9] = [191,205,'end',0]
	/*
	//--v2--
	NowRoute[0][0][0] = [21,53,'down',horizontal_speed],
	NowRoute[0][0][1] = [21,99,'right',straight_speed],
	NowRoute[0][0][2] = [191,99,'down',horizontal_speed_s],
	NowRoute[0][0][3] = [191,119,'left',straight_speed],
	NowRoute[0][0][4] = [21,119,'down',horizontal_speed_s],
	NowRoute[0][0][5] = [21,139,'right',straight_speed],
	NowRoute[0][0][6] = [191,139,'down',horizontal_speed_s],
	NowRoute[0][0][7] = [191,159,'down',horizontal_speed],
	NowRoute[0][0][8] = [191,205,'end',0]

	NowRoute[1][0][0] = [191,53,'down',horizontal_speed],
	NowRoute[1][0][1] = [191,99,'left',straight_speed],
	NowRoute[1][0][2] = [21,99,'down',horizontal_speed_s],
	NowRoute[1][0][3] = [21,119,'right',straight_speed],
	NowRoute[1][0][4] = [191,119,'down',horizontal_speed_s],
	NowRoute[1][0][5] = [191,139,'left',straight_speed],
	NowRoute[1][0][6] = [21,139,'down',horizontal_speed_s],
	NowRoute[1][0][7] = [21,159,'down',horizontal_speed],
	NowRoute[1][0][8] = [21,205,'end',0]

	NowRoute[0][1][0] = [21,53,'down',horizontal_speed],
	NowRoute[0][1][1] = [21,99,'right',straight_speed],
	NowRoute[0][1][2] = [191,99,'down',horizontal_speed_s],
	NowRoute[0][1][3] = [191,119,'left',straight_speed],
	NowRoute[0][1][4] = [21,119,'down',horizontal_speed_s],
	NowRoute[0][1][5] = [21,139,'right',straight_speed],
	NowRoute[0][1][6] = [191,139,'down',horizontal_speed_s],
	NowRoute[0][1][7] = [191,159,'left',straight_speed],
	NowRoute[0][1][8] = [21,159,'down',horizontal_speed],
	NowRoute[0][1][9] = [21,205,'end',0]

	NowRoute[1][1][0] = [191,53,'down',horizontal_speed],
	NowRoute[1][1][1] = [191,99,'left',straight_speed],
	NowRoute[1][1][2] = [21,99,'down',horizontal_speed_s],
	NowRoute[1][1][3] = [21,119,'right',straight_speed],
	NowRoute[1][1][4] = [191,119,'down',horizontal_speed_s],
	NowRoute[1][1][5] = [191,139,'left',straight_speed],
	NowRoute[1][1][6] = [21,139,'down',horizontal_speed_s],
	NowRoute[1][1][7] = [21,159,'right',straight_speed],
	NowRoute[1][1][8] = [191,159,'down',horizontal_speed],
	NowRoute[1][1][9] = [191,205,'end',0]
	*/
	var lottery_ary = []
	var i = 0,g;
	var go = function(ary,a,b,i,s,p){
		ctx.beginPath();
		ctx.fillStyle = '#535353';
		g = i;
		ctx.arc(a, b, 6, 0, 2*Math.PI);
		ctx.fill();
	    switch(s){
	        case'left':{
	            if(a <= ary[g][0]){
	                i++
	                go(ary,ary[g][0],ary[g][1],i,ary[g][2],ary[g][3])
	            }else{
	                setTimeout(function(){
	                    a--;
	                    go(ary,a,b,i,s,p);
					},p)
	            }
	            break
			}
	        case'right':{
	            if(a >= ary[g][0]){
	            i++
	                go(ary,ary[g][0],ary[g][1],i,ary[g][2],ary[g][3])
	            }else{
	                setTimeout(function(){
	                    a++
	                    go(ary,a,b,i,s,p);
	              },p)
	            }
	            break
			}
	        case'down':{
	            if(b>=ary[g][1]){
	            	i++
	                go(ary,ary[g][0],ary[g][1],i,ary[g][2],ary[g][3])
	            }else{
	                setTimeout(function(){
	                    b++
	                    go(ary,a,b,i,s,p);
	                },p)
	            }
	            break
			}
	        case'end':{
	            finish()
				break
			}
	    }
	}
	this.Start = function(lottery){
		if(Moveing){
			return;
		}
		Moveing = true;
		lottery_ary = lottery;
		layer(lottery_ary[1]);
	}
	var clear = function(){
		init();
	}
	var layer = function(layer_quantity){
		ctx.beginPath();
		ctx.fillStyle = '#c6c3b9';
		if(layer_quantity ==  0){
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
		setTimeout(function(){
    		start(lottery_ary[0])
        },Lecturing_delay)
	}
	var start = function(start_side){
		ctx.beginPath();
		ctx.fillStyle = '#3b3a3c';
		img = new Image();
		img.src = arrow;
		if(start_side ==  0){
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
		var ary = NowRoute[lottery_ary[0]][lottery_ary[1]];
		setTimeout(function(){
			go(ary,ary[0][0],ary[0][1],1,ary[0][2],ary[0][3])
		},Drawlines_delay);
	}
	var finish = function(){
		if(lottery_ary[0] == lottery_ary[1]){
			ctx.beginPath();
			ctx.fillStyle = '#d63e35';
			ctx.arc(192, 236, 20, 0, 2*Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#ffffff';
			ctx.font="20px Microsoft JhengHei";
			ctx.fillText("双",182,244);
			ctx.stroke();
		}else{
			ctx.beginPath();
			ctx.fillStyle = '#106de1';
			ctx.arc(21, 236, 20, 0, 2*Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#ffffff';
			ctx.font="20px Microsoft JhengHei";
			ctx.fillText("单",11,244);
			ctx.stroke();
		}
		setTimeout(function(){
			$('.ladder-mask').show()
		},open_mask)

		setTimeout(function(){
			clear();
			$this.complete();
			Moveing = false;
		},5000)
		$this.complete();
	}

	var init = function(){
		$('#LadderCanvas').remove()
		$('.ladder-box').append('<canvas id="LadderCanvas"></canvas>')
		var canvas = document.getElementById("LadderCanvas");
		ctx=canvas.getContext("2d");
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
		ctx.font="20px Microsoft JhengHei";
		ctx.fillText("单",11,244);
		ctx.fillText("双",182,244);
		ctx.stroke();

		/*畫預設梯子*/
		ctx.beginPath();
		ctx.fillStyle = '#c6c3b9';
		ctx.fillRect(15, 53, 12, 152);
		ctx.fillRect(185, 53, 12, 152);
		ctx.fill();
	}
	init();
}