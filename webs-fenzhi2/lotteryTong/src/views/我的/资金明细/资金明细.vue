<template>
    <div class="申请专家">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">资金明细</span>
            <span class="sqzj">&nbsp;</span>
        </div>
        <ul>
            <li @click="$router.history.push('/ChangeAccount')">
              <div class="left">
                 <img :src="皮肤区分.qbbz" alt="">
              </div>
              <div class="right"> <span>钱包变账</span><span class="iconfont iconyoubian"></span></div>
            </li>
             <li @click="$router.history.push('/rechargeRecord')">
              <div class="left">
                 <img :src="皮肤区分.czjl" alt="">
              </div>
              <div class="right"> <span>充值记录</span><span class="iconfont iconyoubian"></span></div>
            </li>
             <li @click="$router.history.push('/WithdrawalsRecords')">
              <div class="left">
                 <img :src="皮肤区分.tkjl" alt="">
              </div>
              <div class="right"> <span>提款记录</span><span class="iconfont iconyoubian"></span></div>
            </li>
             <li @click="$router.history.push('/RebatesRecord')">
              <div class="left">
                 <img :src="皮肤区分.fdjl" alt="">
              </div>
              <div class="right"> <span>返点记录</span><span class="iconfont iconyoubian"></span></div>
            </li>
        </ul>


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
                qbbz: require('@/assets/img/wd/bai/qianbaozhanbian.5ac730f.png'),
                czjl: require('@/assets/img/wd/bai/czjl.png'),
                tkjl: require('@/assets/img/wd/bai/tikuanjilu.b9884d2.png'),
                fdjl: require('@/assets/img/wd/bai/fandianjilu.fc9d3fa.png'),


            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
                qbbz: require('@/assets/img/wd/hei/qianbaozhanbian.545a68f.png'),
                czjl: require('@/assets/img/wd/hei/chongzhijilu.1c4e88e.png'),
                tkjl: require('@/assets/img/wd/hei/tikuanjilu.510320e.png'),
                fdjl: require('@/assets/img/wd/hei/fandianjilu.56da5b4.png'),
             
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
.申请专家{
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
    ul{
        // background: gold;
        padding-left: _vw(14);
        box-sizing: border-box;
        li{
            display:flex;
            justify-content: space-between;
            align-items: center;
            .left{
               width: _vw(20);
               height: _vw(18);
               img{
                   width: 100%;
                   height: 100%;
               }
            }
            .right{
                padding-right: _vw(20);
                box-sizing: border-box;
                height: _vw(44);
                width: 90%;
                display:flex;
                justify-content:space-between;
              border-bottom:_vw(1) solid #f1f1f7;
              span:nth-child(2){
                color:#c8c8cd
              }
              .iconyoubian{
                  font-size: _vw(12);
              }
               span{
                    font-size: _vw(16);
                  line-height: _vw(44);
              }
            }
          
        }
    }
  
}
</style>