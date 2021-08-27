<template>
    <div class="wechat">
        <van-nav-bar title="微信扫码" left-arrow :fixed="true" @click-left="onClickLeft"/>
          <div class="wechat_content">
            <div class="code_img">
                <div class="img_box">
                <img :src="objdata.aliPay_QRCode" alt="">                 
                </div>

                <p class="code_title">扫一扫二维码完成微信转账</p>
            </div>

             <ul class="bottom_ul">

                    <li class="ky_nun">
                        <div class="ky_nun_title">可用余额</div>
                        <div> <span class="fred">{{objdata.money}}</span><span>&nbsp;元</span></div>
                    </li>
                    <li>
                        <van-field v-model="num"   type="text"    label="已付金额"  :placeholder="'请转入'+objdata.min+'~'+objdata.max+'之间的整数'"  required   />
                    </li>
                    <li>
                        <van-field v-model="name"   type="text"    label="付款人"  placeholder="付款人姓名"  required   />
                    </li>
                    <li>
                        <van-field v-model="numflow"   type="text"    label="流水号"  placeholder="请输入流水号"  required   />
                    </li>
            </ul>
                <div class="bottom">
                    <p class="title_p_text">注意{{objdata.describe}}</p>
                </div>
            <!-- <p class="p_title"><span>收款人:&nbsp;</span>广州君以科技有限公司</p> -->

               <div class="bottom_btn">
                 <van-button type="danger" @click="确认转账()">确认</van-button>
             </div>
          </div>
    </div>
</template>

<script>
import { api_充值首页,api_确认充值} from "@/api/资金接口.js";
export default {
    name:"",
    components:{
    },
    data() {
        return {
            num:"", //充值金额
            name:"",//付款人
            numflow:"",//流水号
            objdata:"",
        }
    },
     created(){
      api_充值首页().then(x=>{
      var dataAll= x.data.data
       this.objdata= dataAll.find(x => x.payTypeText == "微信扫码")
       console.log(  this.objdata)
      }).catch(err=>{
          console.log(err)
      })
    },
    methods: {
        onClickLeft(){
            history.back()
        },
         确认转账(){

              if(this.num || this.name || this.numflow){
                if( parseInt(this.num) >= this.objdata.min  &&  parseInt(this.num) <= this.objdata.max){
                var obj={
                inAmount: this.num,//充值金额
                bankFlow: this.numflow,//流水订单号
                outAccount: this.objdata.bankNum,//网银入款账号
                paymentId:  this.objdata.paymentId,//支付方式id
                paymentType:  this.objdata.paymentType,//支付方式
                // memberId: 1,//类型
                // remarks: "我是大理石"  //
                }
                api_确认充值(obj).then(x=>{
                     if(x.data.code==200){
                       this.$toast(x.data.msg)
                    }else{
                      this.$toast("内部服务器错误")                      
                    }
                }).catch(err=>{
                    console.log(err)
                })

               }else{
                      this.$toast("请转入"+ this.objdata.min+'~'+this.objdata.max+'的整数');
               }

            }else{
                 this.$toast("资料填写不完整")
            }
         
        },
       
    },
}
</script>
<style lang="scss" scoped> 
/deep/.van-field__label{
    width: _vw(90);
}
.wechat_content{
    padding-top:_vw(60);
    .code_img{
        background: #ffffff;
        padding:_vw(10) _vw(30) _vw(8) _vw(30);
        .img_box{
            width: _vw(190);
            height: _vw(190);
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .code_title{
            color:rgb(85, 138, 236);
            text-align: center;
        }
    }

      .bottom_ul{
              margin-top:_vw(10);
              background: #ffffff;
               li:nth-child(4){
                     border-bottom:none;
                 }
             li{
                   border-bottom:1px solid #ccc;
                 font-size: _vw(15);
                 padding:_vw(4) _vw(10);
                 width: 90%;
                 margin:0px auto;
                 
             }
              .ky_nun{
                //  background: green;
                 height: _vw(50);
                  display:flex;
                  line-height: _vw(50);
                  .ky_nun_title{
                      width: 20%;
                      padding-left:_vw(10);
                      font-size: _vw(14);
                      color:#323232;
                  }
                  .fred{
                      padding-left:_vw(20);
                      font-size:_vw(22);
                  }                  
             }
         }
            .bottom{
             width: 90%;
             margin: 0px auto;
             font-size: _vw(16);
             color:#999999;
                .title_p_text{
                    text-indent: _vw(30);
                    color:red;
                }
         }
         .p_title{
             width: 90%;
             text-align: center;
             margin:0px auto;
             color:#323232;
             font-size: _vw(14);
             margin-top:_vw(10);
         }

           .bottom_btn{
             width: 80%;    
             margin: 0px auto;
             margin-top:_vw(20);
             .van-button{
             width: 100%;      
             margin:0px auto;      
             border-radius: _vw(6); 
             font-size: _vw(20);  
             }  
         }


}
</style>

