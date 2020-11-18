<template>
    <div>
        <Header/>
         <div class="bg" >
            <div id="top1_img">
		    </div>
            <div class="ag_central" >
                <a href=""><img src="../../../assets/shixunzhibo/ab.png" alt=""></a> 
              <div class="ag_central_p" >
                <p>平台简介:<br>
                    (TG_欧博Allbet Gaming平台)是亚洲最新兴的博彩娱乐集团，扎根於菲律宾首都马尼拉，致力研发网上博奕游戏平<br/>
                   台并提供整合服务。获菲律宾政府认可的发牌及监管单位First Cagayan Leisure & Resort Corporation (FCLRC) <br/>
                    和 Cagayan Economic Zone Authority (CEZA) 授权，经营网路博彩游戏，拥有符合国际标准的真人游戏摄影场<br/>
                    以顶尖开发技术把实地赌场完美地呈现在互联网。卓越的功能全由玩家使用点出发，使玩家在网络世界的任何角落<br/>
                    都能掌控全域，致胜千里！ <br/><br/>
                    產品特色种类：（百家乐丶骰宝丶轮盘丶龙虎丶竞咪百家乐丶VIP包桌百家乐）及电子游戏，是专业为玩家打造的人<br/>
                    性化游戏平台。鸿博集团势将成为网络博彩业界最强的顶尖平台供应商。
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
