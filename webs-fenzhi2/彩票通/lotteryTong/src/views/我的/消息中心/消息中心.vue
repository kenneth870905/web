<template>
    <div class="消息中心">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">消息中心</span>
            <span class="sqzj">&nbsp;</span>
        </div>
      <div class="content">
        <ul>
            <li v-for="(item,index) in 5">
                <div class="top">
                  <span class="iconfont iconpinglunshu"></span>赔率涨不停   车房尽在眼前
                </div>
                <div class="item_content">
                  ——【六合彩】 118期——
                    |  特码红波球  |
                可得高额赔率：55倍

                    |    平特生肖    |
                可得高额赔率：2.20倍
                </div>
                <div class="bottom">
                    <div class="left">有效时间：2019-10-03-2019-10-31</div>
                    <div class="right">进行中</div>
                </div>
            </li>
        </ul>
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
.消息中心{
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
     ul{
         padding:_vw(10);
         li{
             margin-bottom:_vw(1) solid #ddd;
             border:_vw(1) solid #ddd;
             border-radius: _vw(4);
             font-size: _vw(12);
             margin-bottom: _vw(10);
             .top{
                 padding:_vw(0) _vw(10);
                 line-height: _vw(31);
                 font-weight: 500;
                 .iconpinglunshu{
                     margin-right: _vw(10);
                 }
               
             }
             .item_content{
                 padding:_vw(10);
                   border-top:_vw(1) solid #ddd;
                  border-bottom:_vw(1) solid #ddd;
                  min-height: _vw(80)
             }
             .bottom{
                 display: flex;
                 justify-content: space-between;
                 padding:_vw(0) _vw(10);
                 line-height: _vw(31);


             }

         }
     }
    }
}
</style>