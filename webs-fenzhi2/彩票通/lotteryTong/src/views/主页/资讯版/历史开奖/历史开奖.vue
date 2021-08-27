<template>
    <div class="历史开奖">
            <router-view></router-view>
           <div class="tab_box"> 
          <div  class="left " @click="go('/historyLottery/')" :class="{active:urlS=='/historyLottery/'}">历史开奖</div>
          <div  class="right" @click="go('/LotteryTime')" :class="{active:urlS=='/LotteryTime'}">开奖日期</div>
       </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
           urlS:"/historyLottery/",
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
            go(url){
             this.urlS=url
             this.$router.history.push(url);
        }
     
    }
    
}


</script>
<style lang="scss" scoped>
.历史开奖{
    position: absolute;
    left:0px;
    top:0px;
    height: 100%;
    width: 100%;
    // background:red;   
    .tab_box{
            display:flex;
            justify-content: space-between;
            position: fixed;
            left:0px;
            bottom:0px;
            width: 100%;
            height: _vw(45);
            background:#f0f0f0;
            .active{
                background-color: #eacd91;
                color:#ffffff;
            }
            .left,.right{
                width: 50%;
                line-height: _vw(45);
                text-align: center;
                font-size: _vw(14);
            }
    }
    
   
}
</style>