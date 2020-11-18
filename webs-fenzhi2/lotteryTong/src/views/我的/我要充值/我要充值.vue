<template>
    <div class="我要充值">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">我要充值</span>
            <span class="sqzj">&nbsp;</span>
        </div>
       <div class="content">
         <div class="div_text">
             <div class="title">充值金额</div>
             <div class="bottom_text">
                 <div class="qian">&yen;</div>
                 <div class="input"><input type="text" @blur="失去焦点()" v-model="num" autofocus="autofocus"></div>
                 <div class="add"  v-if="tiyu" @click="加一千()">+k</div>
                 <div class="textnum" v-if="!tiyu" v-text="tishi">{{tishi}}</div>
             </div>
         </div>

         <ul class="btn_box">
           <li @click="加(100)">100元</li>
           <li  @click="加(200)">200元</li>
           <li  @click="加(300)">300元</li>
           <li  @click="加(500)">500元</li>
           <li  @click="加(1000)">1000元</li>
         </ul>

         <div class="银行卡转账" >
             <div class="title">
                 <div class="left">
                     <div class="yh"><img src="@/assets/img/wd/wdqb_yhk@2x.12386f6.png" alt=""></div>
                     <div>银行卡转账</div>
                 </div>
                 <div class="right">推荐</div>
             </div>

             <ul class="ka_ul">
                  <li @click="充值('银行卡转账')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/7c24c282-a422-4f2d-9fb3-116edd77a2e0.png" alt=""></div>
                         <p>沈阳友悦商贸行</p>
                     </div>
                     <div  class="right_r">
                         限额100元~5000元
                     </div>
                 </li>
                 <li  @click="充值('银行卡转账')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/9a01a19d-f785-4914-b989-fa0b78dcf06a.png" alt=""></div>
                         <p>闫绍仓</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>

                   <li  @click="充值('银行卡转账')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/7c24c282-a422-4f2d-9fb3-116edd77a2e0.png" alt=""></div>
                         <p>沈阳友械商贸行</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>
                  <li  @click="充值('银行卡转账')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/7c24c282-a422-4f2d-9fb3-116edd77a2e0.png" alt=""></div>
                         <p>黄霞</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>

                   <li  @click="充值('银行卡转账')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/9a01a19d-f785-4914-b989-fa0b78dcf06a.png" alt=""></div>
                         <p>支付宝H5</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>
             </ul>

         </div>

         <div class="kong"></div>

         
         <div class="银行卡转账">
             <div class="title">
                 <div class="left">
                     <div class="yh"><img src="@/assets/img/wd/icon_zxzf@2x.93d2262.png" alt=""></div>
                     <div>云闪付</div>
                 </div>
                 <div class="right">实时到账</div>
             </div>

             <ul class="ka_ul">
                 <li  @click="充值('在线支付')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/9a01a19d-f785-4914-b989-fa0b78dcf06a.png" alt=""></div>
                         <p>沈阳友悦商贸行</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>

                   <li  @click="充值('在线支付')">
                     <div class="left_l">
                         <div class=ka_img><img src="@/assets/img/wd/b160a275-0663-4edd-a6f0-08b2fa03f78c.png" alt=""></div>
                         <p>沈阳友悦商贸行</p>
                     </div>
                     <div  class="right_r">
                         限额 100元~5000元
                     </div>
                 </li>

                  
             </ul>

              
         </div>


       </div>




    </div>
</template>
<script>
import { Toast } from 'vant';
import { mapState } from 'vuex'
import { Dialog } from 'vant'
export default {
    data() {  
        return {
            num:"",
            QQID:"",
            message:"",
            tiyu:true,
            tishi:"",
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
        加(num){
            this.num=num
        },
          失去焦点(){
              var regu = /^[1-9]\d*$/;
              if(this.num!==''){
                  if(!regu.test(this.num)  ){
                      this.tiyu=false
                     this.tishi="请输入整数"
                  }else{
                        this.tiyu=false
                      console.log(11)
                    var int=parseInt(this.num)    
                    if(int<=49 || int>=50001){
                        this.tiyu=false
                     this.tishi="限额50~50000元"
                    }else{
                        this.tiyu=true
                       return this.num
                    //    console.log("验证成功")                         
                    }          
                  }
              }else{
             this.tiyu=false

              }
        },
      
        充值(type){
                      if(this.tiyu==true && this.num!==''){
                             Toast("可以充值")                              
                          if(type=='银行卡转账'){
                              this.$router.history.push('/bankCard')
                          }else if (type=='在线支付'){
                              console.log('在线支付')
                               this.$router.history.push('/onlinePayment')  
                          }
                    }else{
                        Toast("不可以充值")
                        return
                    }
   


        
        },
        加一千(){
            if(this.num!==''){
                  var numdata=parseInt(this.num) +1000
                  this.num=numdata
            }
   
        },
        返回() {//头部
            history.back()
        },
      
    }
    
}


</script>
<style lang="scss" scoped>
.我要充值{
      background-color: #ececec !important;   
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
      background-color: #ececec !important;
        .div_text{
            padding:_vw(6) _vw(10) _vw(10) _vw(10);
            background: #ffffff;

            .title{
             margin:_vw(10) _vw(0) _vw(0) _vw(0);

            }
            .bottom_text{
                
                display: flex;
                align-items: center;
               .qian{
                   font-size: _vw(20);
                   width:_vw(20);
                //    background: goldenrod;
                   text-align: center;
               }
               .input{
                   flex:1;
                //    background: green;
                   height: _vw(60);
                   input{
                      outline:none ;
                      border:none; 
                      display: block;
                      width: 100%;
                      height: 100%;
                      line-height: _vw(60);
                      font-size: _vw(30);
                      font-weight: 1000;
                      color:#ac1e2d;
                    // display:table-cell; 
                    // vertical-align:bottom;
                    // vertical-align:bottom;
                    // background: #1eac3d;
                    padding-left:_vw(14);
                   }
               }
               .textnum{
                   font-size:_vw(14);
                   color:#666666;
               }
               .add{
                   background: #ff9217;
                   text-align: center;
                   width: _vw(28);
                   height: _vw(18);
                   font-size: _vw(12);
                   line-height: _vw(18);
                   color:#ffffff;
               }
            }
        }
        .btn_box{
            display: flex;
            justify-content: space-between;
            padding:_vw(6) _vw(10) _vw(20) _vw(10);
            background: #ececec;
            li{
                width: _vw(60);
                height: _vw(24);
                font-size: _vw(12);
                line-height: _vw(24);
                text-align: center;
                background: #ffffff;
                border-radius: _vw(4)
            }
        }
        .银行卡转账{
            background: #ffffff;
            .title{
                padding:0px _vw(10);
                line-height: _vw(34);  
                height: _vw(34);
                display:flex;
                justify-content: space-between;
                // border-bottom: 1px solid #f7f5f5;
                font-size: _vw(16);
                .left{
                    display:flex;
                    align-items: center;
                    div:nth-child(2){
                        margin-top:_vw(4);
                    }
                    .yh{
                        width: _vw(23);
                        height: _vw(21);
                        margin-right: _vw(6);
                        // margin-top:_vw(2
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .right{
                        margin-top:_vw(2);
                        color:red;
                        // color:#999999;
                }
            }
            .ka_ul{
                margin-top:_vw(10);
                padding:_vw(0) _vw(12);
                li:nth-last-child(1){
                    border:none;
                }
               li{
                    border-bottom: 1px solid #e9e7e7;
                    // line-height: _vw(34);
                    display: flex;
                    justify-content: space-between;
                    font-size: _vw(14);
                    .left_l{
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                        .ka_img{
                            width: _vw(35);
                            min-height: _vw(22);
                            margin-right:_vw(10);
                            margin-top:_vw(2);
                            img{
                                width: 100%;
                                height: 100%;
                            }
                          }
                          p{
                              margin:0;
                          font-size:_vw(12);
                          }
                    }
                    .right_r{
                        color:#999999;  
                       font-size:_vw(12);
                       line-height:_vw(40);
                    }
                  }
            }
           
        }

         .kong{
                height: _vw(10);
                background: #ececec;
            }

    }

  
}
</style>