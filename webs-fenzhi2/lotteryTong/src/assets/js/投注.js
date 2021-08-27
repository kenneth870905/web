
import 投注10 from './投注10.js'
import 投注20 from './投注20.js'
import 投注30 from './投注30.js'
import 投注40 from './投注40.js'
import 投注50 from './投注50.js'
import 投注60 from './投注60.js';
import 投注70 from './投注70.js';

class 投注配置{
    // 1002
    constructor(id, 玩法) {
        this.id = id;
        this.玩法 = 玩法;
        this.type = id.toString().substring(0,2);
        this.code = 玩法.Code;
    }
    get 配置() {
        // 时时彩
        if(this.type==10){
            let 时时彩=new 投注10(this.玩法);
            return 时时彩;
        }else if(this.type==20){    //pk10
            let 投注=new 投注20(this.玩法);
            return 投注;
        }else if(this.type==30){    //3d
            let 投注=new 投注30(this.玩法);
            return 投注;
        }else if(this.type==40){    // 快3
            let 投注=new 投注40(this.玩法);
            return 投注;
        }else if(this.type==50){
            let 投注=new 投注50(this.玩法);
            return 投注;
        }else if(this.type==60){
            let 投注=new 投注60(this.玩法);
            return 投注;
        }else if(this.type==70){
            let 投注=new 投注70(this.玩法);
            // return 投注.球组;
            return 投注;
        }
        return []
    }
}


export  default 投注配置