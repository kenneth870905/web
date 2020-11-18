<template>
    <div class="冰心推荐"  :class="皮肤区分.classname" :style="{'background':皮肤区分.contbj}">
        
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">六合大神</span>
            <span class="sqzj">&nbsp;</span>
        </div>

        <div class="投注"  @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>


       <div class="content">
          <ul>
              <li  @click="$router.history.push('/markSixSanitoMin?id=zhdsb')"><img :src="皮肤区分.zhdsb" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=tmzq')"><img :src="皮肤区分.tmzq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=txzq')"><img :src="皮肤区分.txzq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=pmzq')"><img :src="皮肤区分.pmzq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=ptyx')"><img :src="皮肤区分.ptyx" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=ptlx')"><img :src="皮肤区分.ptlx" alt=""></li>

              <li  @click="$router.history.push('/markSixSanitoMin?id=lxzq')"><img :src="皮肤区分.lxzq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=bzzq')"><img :src="皮肤区分.bzzq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=jszq')"><img :src="皮肤区分.jszq" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=gssh')"><img :src="皮肤区分.gssh" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=gsgl')"><img :src="皮肤区分.gsgl" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=jqdx')"><img :src="皮肤区分.jqdx" alt=""></li>
              <li  @click="$router.history.push('/markSixSanitoMin?id=yqjh')"><img :src="皮肤区分.yqjh" alt=""></li>
              <li  @click="$router.history.push('/markSixImg')"><img :src="皮肤区分.lhtk" alt=""></li>
          </ul>  
       </div>
      
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            classname:'',
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
                contbj:"#f0f0f0",
                classname:"白",
               zhdsb:require("@/assets/img/lhds/bai/wave_close.3c0b0b3.png"),
               tmzq:require("@/assets/img/lhds/bai/8213a020-fdb6-4005-a15b-7a339e9b256a.png"),
               txzq:require("@/assets/img/lhds/bai/7b4e025c-b499-4765-8092-397af8ba038a.png"),
               pmzq:require("@/assets/img/lhds/bai/3bc5613d-9540-4931-a7b0-a2cdf074e51b.png"),
               ptyx:require("@/assets/img/lhds/bai/cd3dd724-e1c6-4663-9e6b-1480b7b25405.png"),
               ptlx:require("@/assets/img/lhds/bai/d9319287-c1d3-4094-a165-328d8e880675.png"),

               lxzq:require("@/assets/img/lhds/bai/891876e4-0879-428b-b3ae-7dc7f3eac5e5.png"),
               bzzq:require("@/assets/img/lhds/bai/9585bac0-7de3-4f6c-97ec-344a396b1aaa.png"),
               jszq:require("@/assets/img/lhds/bai/bc6c650b-564e-4d4d-a1ba-1f1e919156a8.png"),
               gssh:require("@/assets/img/lhds/bai/f342ae08-9c36-4630-a988-c48739ad8acc.png"),
               gsgl:require("@/assets/img/lhds/bai/6999be4c-9c2c-4a22-8e05-b36a0a10bdb6.png"),
               jqdx:require("@/assets/img/lhds/bai/1f30b0e1-f441-4ea6-8415-bade718c191b.png"),
               yqjh:require("@/assets/img/lhds/bai/ff739b61-257e-4f5d-a25c-8b1d4140dee7.png"),
               lhtk:require("@/assets/img/lhds/bai/c6591f69-f787-4631-b20f-9718515425f6.png"),
            },
            hei: {
                color: "#eacd91",
                topbj: "#191a1f",
                contbj:"#1d1e23",
                classname:"黑",

                zhdsb:require("@/assets/img/lhds/hei/ebddf39f-5df9-4fb1-911f-4c7a81497f2f.png"), 
               tmzq:require("@/assets/img/lhds/hei/83e56ca7-a754-4665-ad91-732864cb591f.png"),
               txzq:require("@/assets/img/lhds/hei/ccaaec05-0ba0-4590-a7ae-6d8510d4f0a6.png"),
               pmzq:require("@/assets/img/lhds/hei/eea8f2e3-e760-4f64-a135-e6857c5cf215.png"),
               ptyx:require("@/assets/img/lhds/hei/3cdbfbe3-c79a-406f-8746-0f149fb7ca82.png"),
               ptlx:require("@/assets/img/lhds/hei/9e9dc6d7-cd4a-4442-89e6-16d5cd29ac82.png"),

               lxzq:require("@/assets/img/lhds/hei/e1c80d84-934e-4bc6-ad2c-8c717b3cf99d.png"),
               bzzq:require("@/assets/img/lhds/hei/9fad30f0-0f76-4903-b41c-2d4e764abed9.png"),
               jszq:require("@/assets/img/lhds/hei/f6431d7e-546f-4632-af49-14606a2bf73f.png"),
               gssh:require("@/assets/img/lhds/hei/2b4b9f4f-2133-48b0-8666-1d7cf2bacf94.png"),
               gsgl:require("@/assets/img/lhds/hei/af072383-47d7-4029-b704-46229e05b237.png"),
               jqdx:require("@/assets/img/lhds/hei/6bf8e9dd-49a9-4278-9fe5-0b99efb1fad1.png"),
               yqjh:require("@/assets/img/lhds/hei/67ef5c90-24aa-446a-beda-bfd4e2242ce5.png"),
               lhtk:require("@/assets/img/lhds/hei/1556f737-2f29-4e8b-ba13-77d8e88e44f0.png"),
            }
        }
    },
    components: { // 注册组件
        
    },
    created() {
        
    
    },

    computed: {
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
    },
    methods:{
        返回() {//头部
            history.back()
        },
     
    }
    
}


</script>
<style lang="scss" scoped>
.白{
   
}
.黑{

}
.冰心推荐{
    position: absolute;
    left:0px;
    top:0px;
    height:100%;
    width: 100%;         
     .投注{
        width: _vw(47);
       height: _vw(47);
       border-radius: 50%;
         position: fixed;
       top:_vw(140);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
       .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
    }
    .content{
         padding:_vw(10);
           box-sizing: border-box;
           padding-top:_vw(45);
       ul{
           width: 100%;
           display:flex;
           flex-wrap: wrap;
           align-items: center;
           box-sizing: border-box;
           justify-content: space-between;
           li{
            width: 48%;
            height: _vw(60);
            margin-bottom: _vw(10);
            img{
                width: 100%;
                height: 100%;
                
            }
            
           }
       }
    }
  
}
</style>