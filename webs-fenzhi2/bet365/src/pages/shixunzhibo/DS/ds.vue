<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/visdsinfo.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    平台简介：鼎盛国际游戏平台拥有符合国际标准的真人游戏摄影场，以顶尖开发技术把实地赌场完美地呈现在互联网。<br/>
                    以清晰的直播画面提供百家乐、龙虎，轮盘或骰宝多款热门产品，保证玩家在线上浏览的是最即时且公平 的投注实况，<br/>
                    在任何地点都能体验如亲临赌场般的刺激愉快感官享受。卓越的功能全由玩家使用点出发，使玩家在网络世界<br/>
                    的任何角落都能掌控全域，博彩行业的后起之秀。<br/>
                    游戏种类:<br/>
                    百家乐、高级百家乐、二十一点、轮盘、专业轮盘、骰宝、龙虎、高级龙虎门。
                </p>
                <a href=""> <img class="startgame" src="../../../assets/shixunzhibo/AG/startgame.png" alt=""></a> 
                <a href=""> <img class="shiwan" src="../../../assets/shixunzhibo/AG/shiwan.png" alt=""> </a>
            </div>   
            </div>
         </div>
        <Fotter/>
    </div>
</template>

<style>
.bg{ width:100%; height:761px; margin:0 auto; background:url(../../../assets/tiyusaishi/c_bg_x01.jpg); position:relative;} /*通用背景*/
#top1_img { width:1000px; height:180px; margin:0 auto; background:url(../../../assets/shixunzhibo/181011085456.jpg) no-repeat center top; position:relative;}

.ag_central img {
    padding:20px 0px 0 460px;
}
.ag_central_p p{
    color: white;
    position: absolute;
    top: 217px;
    left: 828px;
    font-size: 12px;
}
.startgame{
     position: relative;
    left: 513px;
    top:-90px;
}
.shiwan{
    position: relative;
    top:-90px;
    left: 100px;
}
</style>

<script>
import Header from '@/components/Header/Header.vue'
import Fotter from '@/components/Fotter/Fotter.vue'
export default {
    data(){
        return{

        }
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
}
</script>
