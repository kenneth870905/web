<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/visbvinfo.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    　奢华贵气的艳紫色系，荷官与主 播性感美艳的全新黑色礼服，使用更 加便利的游戏介面，以及清晰的直播画面与<br/>
                    现场收音等，都是BG专业视讯团队将为您奉上的新一代BG真人视讯厅豪华设计，全新摄影棚视觉效果将让人惊艳无比。<br/>
                    游戏种类:
                    全新的牛牛、共咪百家乐与全彩百家乐模式。
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
