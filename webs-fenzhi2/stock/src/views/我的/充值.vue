<template>
    <div class="chongzhi">
        <van-nav-bar title="充值" left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="fangs_title">充值方式:</div>
        <ul>
            <li v-for="(item,index) in dataAll " @click="go(item)">
                <div :class="{activeWX:item.payTypeText =='微信扫码',activeZFB:item.payTypeText =='支付宝扫码',activeYHZZ:item.payTypeText =='网银转账'}" ></div>
                <div class="title_text">{{item.payTypeText}}</div>
            </li>
            
        </ul>
     </div>
</template>

<script>
import { api_充值首页} from "@/api/资金接口.js";
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
    },
    data() {
        return {
         dataAll:"",             
        }
    },
    created(){
      api_充值首页().then(x=>{
         this.dataAll= x.data.data
         console.log( this.dataAll)
         
      }).catch(err=>{
          console.log(err)
      })
    },
    methods: {
        go(item){
          if(item.payTypeText=="微信扫码"){
             this.$router.push('/my/rechargeWechat')
          }else if(item.payTypeText=="支付宝扫码"){
             this.$router.push('/my/rechargeAlipay')

          }else if(item.payTypeText=="网银转账"){
            this.$router.push('/my/rechargeInternetbank')
          }else{
             this.$router.push('/my/recharge')
          }
        },
        onClickLeft(){
            history.back()
        },
       
    },
}
</script>

<style lang="scss" scoped>
.activeWX{
       background: url("../../assets/img/wixinZZ.png") no-repeat;
        background-size: 100% 100%;
}
.activeZFB{
    background: url("../../assets/img/zhifubaoZZ.png") no-repeat;
        background-size: 100% 100%;
}
.activeYHZZ{
     background: url("../../assets/img/yinhangZZ.png") no-repeat;
        background-size: 100% 100%;
}
.chongzhi{
    padding-top: _vw(60);
    .fangs_title{
        height: _vw(50);
        font-size: _vw(18);
        font-weight: 600;
        line-height: _vw(50);
        background: #ffffff;
        padding-left:_vw(20);
    }
    ul{
            padding:0px _vw(20) 0px _vw(20);
            background: #ffffff;
            margin-top:_vw(20);
            li:nth-last-child(1){
                border-bottom: none;
            }
        li{
        display:flex;  
         box-sizing: border-box;
         font-size: _vw(16);
         border-bottom:1px solid #ccc;
         padding:_vw(6) 0px _vw(6) _vw(0);

        div:nth-child(1){
            margin-top:_vw(6);
            width: _vw(40);
            height: _vw(40);
          
        }
        .title_text{
            padding-left: _vw(30);
            line-height: _vw(50);
        }

        }
    }
}


</style>

