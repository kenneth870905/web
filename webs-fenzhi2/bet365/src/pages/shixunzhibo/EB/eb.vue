<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/visebinfo.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    eBET于2012年成立，并且在2013年正式迈入国际市場，成长为全球化的集团。eBET拥有丰富专业经验的技术研发<br/>
                    团队，经过创意的激荡及玩家的考验，所创造的移动娱乐平台在业界快速的崛起，走在时代尖端，给予玩家无与伦<br/>
                    比尊贵体验。eBET所有的游戏及系统皆經由当地政府以及国际许可认证，确保游戏的公平性，是最值得信赖好选<br/>
                    择。<br/>
                    游戏种类:<br/>
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
