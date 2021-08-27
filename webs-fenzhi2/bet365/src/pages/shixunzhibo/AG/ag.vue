<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/agqijian.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    (TG_AG平台)是目前最具創意及創新的合法博彩娛樂平台供應商。從2012年開始，我們的團隊憑著大膽革新的思<br/>
                   維，使AG平台能迅速在市場上佔一席位。Asia Gaming全球首創VIP包桌及咪牌百家樂，讓網上娛樂平台衝破傳統<br/>
                   的束縛，帶來一個革命性的新體驗。AG平台同時符合IOM及First Cagayan認證, 並獲得TST公平認證。我們的宗旨<br/>
                    是秉持一個『公平、公正、公開』的真人荷官博彩平台，讓玩家感覺更逼真更震撼，仿如置身現場。017-A-02。 <br/><br/>
                    產品特色种类：百家乐（旗舰厅、实地厅、VIP包桌）VIP包桌：玩家擁有獨立私人空間，且權限更多，例如：要求<br/>
                    更換荷官咪牌百家樂：桌主自行咪牌，感覺更實在，耍樂更興奮。
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
