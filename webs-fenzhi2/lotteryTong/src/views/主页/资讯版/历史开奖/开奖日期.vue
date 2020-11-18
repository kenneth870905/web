<template>
    <div class="开奖日期">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">开奖日期</span>
            <span class="sqzj">&nbsp;</span>
        </div>
         
         <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
        </div>
       
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
           
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
.开奖日期{
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

        .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(100);
        right: _vw(20);
        z-index: 40;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .返回 {
        width: _vw(40);
        height: _vw(40);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        position: fixed;
        top: 50%;
        left: 0px;
        z-index: 40;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }

    
  
}
</style>