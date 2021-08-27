<template>
    <div class="关于我们">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">关于我们</span>
            <span class="sqzj">&nbsp;</span>
        </div>
      <div class="content">
         <p>
             彩票通：娱乐游戏行业领导者，十年诚信经营，老品牌值得信赖!
         </p>
         <p>
             成立于2009年，针对全球客户的多元化需求提供高性能的解决方案！系统稳定，功能齐全!
         </p>
         <p>
           彩票通注册于菲律宾首都马尼拉，拥有 Gagayan Economic Zone Authority 合法公司牌照。  
         </p>
         <p>
             集团主要分布在东南亚多个国家如：老挝 柬埔寨 新加坡 菲律宾，集团发展至今有2000多人，其中核心技术团队人数达数百人 。
         </p>
         <p>
             彩票通是业界最具品牌实力、最有公信力、最受玩家欢迎的彩票/彩票资讯/棋牌/电竞一站式在线游戏娱乐平台。汇聚来自五湖四海的贵宾玩家，作为亚洲最大的彩票游戏娱乐平台，我们致力于为玩家提供全国各大联销型彩票及各地地方彩票的代购合买、彩票软件、彩票资讯等综合服务，同时提供最公正的娱乐系统、最顶级的用户体验、最专业的客服及充值提现服务！
         </p>
      </div>


    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
export default {
    data() {  
        return {
            QQID:"",
            message:"",
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
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
.关于我们{
        padding-top:_vw(35);
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
     p{
         margin:0px;
         text-indent: _vw(20);
         font-size: _vw(14);
     }
 }
  
}
</style>