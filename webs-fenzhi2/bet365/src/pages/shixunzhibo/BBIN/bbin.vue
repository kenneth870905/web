<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/liveBBIN.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    BBIN 成立於1999年，17年來穩健的經營並成功的將產品銷售至亞洲各地。以追求最佳品質，重視消費者回饋的博<br/>
                    彩娛樂平台服務著稱，並以系統化標準開發每一款遊戲，不斷創新的圖形技術結合東方元素，建構亞洲的最大遊戲 <br/>
                    供應商。<br/>
                    BBIN 是亞洲享有盛名的網路博彩娛樂集團，提供多元網路娛樂服務平台和遊戲商品開發、真人視訊、電子遊藝、桌<br/>
                    上遊戲、樂透彩等皆有豐富多樣的選擇。.. <br/>
                    游戏种类:<br/>
                    百家乐、龙虎、 骰宝、轮盘、二八杠、三公、牛牛、温州牌九、德州扑克、色碟、无限21点
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
    top:-180px;
}
.shiwan{
    position: relative;
    top:-180px;
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
