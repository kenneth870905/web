<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/og.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    (TG_OG平台)是遵照赌场专业严谨的流程，以清晰的直播画面提供百家乐、龙虎，轮盘或骰宝多款热门产品，保证<br/>
                    玩家在线上浏览的是最即时且公平的投注实况，在任何地点都能体验如亲临赌场般的刺激愉快感官享受。此外鸿博<br/>
                    HONBET_OG平台真人投注也提供眯牌百家乐，传统龙虎和新式龙虎，增加多元的投注方式及值得信赖的服务品<br/>
                    质。<br/>
                    <br/>
                    產品特色种类：全新功能VIP 包桌、咪牌百家乐、新式龙虎，骰宝和轮盘等等。
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
    top:-150px;
}
.shiwan{
    position: relative;
    top:-150px;
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
