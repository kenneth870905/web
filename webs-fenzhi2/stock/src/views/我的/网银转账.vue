<template>
    <div class="Internetbank">
        <van-nav-bar title="网银转账" left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="Internetbank_content">
              <ul class="top_ul">
                <li>
                    <p class='box_left'>开户人:</p>
                    <p class='box_content' >{{objdata.bankAccount}}</p>
                    <p class='box_right'  @click="复制(objdata.bankAccount)">复制</p>
                </li>
                  <li>
                    <p class='box_left'>收款账号:</p>
                    <p class='box_content'>{{objdata.bankNum}}</p>
                    <p class='box_right'  @click="复制(objdata.bankNum)">复制</p>
                </li>
                  <li>
                    <p class='box_left'>开户地址:</p>
                    <!-- <p class='box_content dizhi'>金额为金额为金额为已付款金额为已付款金额为</p> -->
                    <p class='box_content dizhi'>{{objdata.openingBank}}</p>

                    <p class='box_right'  @click="复制(objdata.openingBank)">复制</p>
                </li>
            </ul>

           <ul class="bottom_ul">
                <li>
                      <van-field v-model="num"   type="text"    label="已付金额"  :placeholder="'请转入'+objdata.min+'~'+objdata.max+'之间的整数'"  required   />
                     <span class="danwei">元</span>
                </li>
                  <li>
                      <van-field v-model="name"   type="text"    label="付款人"  placeholder="付款人姓名"  required   />
                </li>
                   <li>
                      <van-field v-model="numflow"   type="text"    label="流水号"  placeholder="请输入流水号"  required   />
                </li>
            </ul>

            <div class="bottom">
                <p class="title_p">充值说明:</p>
                <p class="title_p_text">登录你的网银转账成功后，填写付款金额和姓名提交</p>
            </div>

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
            num:"",//已付金额
            name:"",//付款人
            numflow:"",//流水号
            userid:"",//开户人
            objdata:'',//所有数据
        }
    },
     created(){
      api_充值首页().then(x=>{
      var dataAll= x.data.data
       this.objdata= dataAll.find(x => x.payTypeText == "网银转账")
       console.log(  this.objdata)
      }).catch(err=>{
          console.log(err)
      })
    },
    methods: {
        确认转账(){
           
            if(this.num || this.name || this.numflow){
                if( parseInt(this.num) >= this.objdata.min  &&  parseInt(this.num) <= this.objdata.max){
                    // alert(1)
                var obj={
                inAmount: this.num,//充值金额
                bankFlow: this.numflow,//流水订单号
                outAccount: this.objdata.bankNum,//网银入款账号
                paymentId:  this.objdata.paymentId,//支付方式id
                paymentType:  this.objdata.paymentType,//支付方式
                // memberId: 1,//类型
                // remarks: ""  //
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
        复制(text){
            // alert(text)
            this.$copyText(text).then((e) => {
                this.$toast("复制成功")
            }, (e) => {
                this.$toast("复制失败，请手动复制")
            })
        },
        onClickLeft(){
            history.back()
        },
       
    },
}
</script>

<style lang="scss" scoped>
/deep/.van-field__label{
    width: _vw(80);
}
 .Internetbank{
     .Internetbank_content{
         padding-top:_vw(60);
         .top_ul{
             background: #ffffff;
             li:nth-child(3){
                 border-bottom: none;
             }
             li{
                //  height: _vw(50);
                 display:flex;
                 justify-content:space-between;
                 border-bottom:1px solid #ccc;
                 font-size: _vw(15);
                 padding:0px _vw(0);
                 width: 90%;
                 margin:0px auto;
                 .box_content{
                     margin:0px;
                     font-size: _vw(14);
                    line-height: _vw(50);
                    width: 60%;
                    
                 }
                 .dizhi{
                     width:60%;
                     word-wrap:break-word; 
                 }
                 .box_left{
                     color:#999999;
                     width: 24%;
                 }
                 .box_right{
                     color:#01aaed;
                     width: 13%;
                     text-align: right;

                 }
             }
         }
          .bottom_ul{
              margin-top:_vw(20);
             background: #ffffff;
               li:nth-child(3){
                     border-bottom:none;
                 }
             li{
                   border-bottom:1px solid #ccc;
                 font-size: _vw(15);
                 padding:_vw(4) _vw(10);
                 width: 90%;
                 margin:0px auto;
                 position: relative;
                 .danwei{
                     position: absolute;
                     right:_vw(10);
                     top:32%;
                 }
             }
         }
         .bottom{
             width: 90%;
             margin: 0px auto;
             font-size: _vw(16);
             color:#999999;
             .title_p{
                 color:red;
             }
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

 }
</style>
