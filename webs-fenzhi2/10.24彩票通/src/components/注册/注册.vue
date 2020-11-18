<template>
    <div class="注册">
        <!-- <h1 @click="点我关闭登陆框()">点我关闭弹窗</h1> -->
        <div class="div_box" :style="{'background-image':'url('+皮肤区分.registerimg+')'}">
         <div class="dalete_box"  @click="点我关闭登陆框()"><img :src="皮肤区分.delete" alt=""></div>
            <div class="contentbai" v-if="皮肤切换==true">
               <div class="test">注册</div> 
                 <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_user.32c2cc9.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   error-message="式错误" v-model="name" placeholder="请输入昵称" />
                          </van-cell-group >
                 </div>

                 <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_sjhm.db1fec1.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   error-message="式错误" v-model="name" placeholder="请输入账号手机号码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_code.5199604.png" alt=""></div> 
                          <van-cell-group class="input_box" >
                               <van-field   error-message="式错误"   v-model="pwd" placeholder="请输入验证码" />
                          </van-cell-group >
                     <div class="wjmi"> 获取验证码 </div>
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_password.122d2e6.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   error-message="式错误" v-model="name" placeholder="请输入密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_password.122d2e6.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   error-message="式错误" v-model="name" placeholder="请确认密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img src="../../assets/img/qit/bai/icon_yqm.50780cc.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   error-message="式错误" v-model="name" placeholder="请确认呢邀请码" />
                          </van-cell-group >
                      <div class="wjmi"> 可选填 </div>
                 </div>
                 <div class="login_btn" @click="注册()">完成</div>
            </div>


























             <div class="contentbai contenthei" v-if="皮肤切换==false">
               <div class="test">注册</div> 
                <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_user.b3fecea.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  error-message="式错误"  v-model="name" placeholder="请输入昵称" />
                          </van-cell-group >
                 </div>

                 <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_sjhm.e9d8fcf.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  error-message="式错误"  v-model="name" placeholder="请输入账号手机号码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_code.23f9627.png" alt=""></div> 
                          <van-cell-group class="input_box" >
                               <van-field  error-message="式错误"    v-model="pwd" placeholder="请输入验证码" />
                          </van-cell-group >
                     <div class="wjmi"> 获取验证码 </div>
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_password.f1d9958.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  error-message="式错误"  v-model="name" placeholder="请输入密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_password.f1d9958.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  error-message="式错误"  v-model="name" placeholder="请确认密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img src="../../assets/img/qit/hei/icon_yqm.30282b9.png" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  error-message="式错误"  v-model="name" placeholder="请确认呢邀请码" />
                          </van-cell-group >
                      <div class="wjmi"> 可选填 </div>
                 </div>
                 <div class="login_btn" @click="注册()">完成</div>

            </div>



        </div>

    </div>
 
</template>

<script> 
 import { mapMutations,mapState} from 'vuex'
 export default {
    data() {
        return {
            name:"",
            pwd:"",
            bai:{
               registerimg:require("../../assets/img/qit/bai/register.png"),
               delete:require("../../assets/img/qit/bai/icon_close.5fb77d7.png"),
           },
            hei:{
                registerimg:require("../../assets/img/qit/hei/register.png"),
                delete:require("../../assets/img/qit/hei/icon_close.cc48b29.png"),
           }
        }
    },
    components: { // 注册组件

    },
    computed: { 
          ...mapState({
            皮肤切换:'皮肤切换',
         }),
         皮肤区分(){
            if(this.皮肤切换==true){
                return this.bai
            }else{
                return this.hei
            }
        },
    },
    created(){
    },
    methods: {
        注册(){
            alert("注册成功")
        },
         ...mapMutations({
            更改注册框显示隐藏:'更改注册框显示隐藏'
        }),
        点我关闭登陆框(){
          this. 更改注册框显示隐藏(false)
        }
    },
}


</script>
<style lang="scss" scoped>
.注册{
    position: absolute;
    z-index:20;
    width: 100%;
    height: 100%;
    left: 0px;
    top:0px;
    color:#ffffff;
    background: rgba(0,0,0,0.5);
    .div_box{
       width: _vw(300);
       height:_vw(500);
       position: absolute;
       left: 50%;
       top:_vw(90);
       margin-left: _vw(-150);
       background-repeat: no-repeat;
       background-size: 100% 100%;
       padding-top:_vw(30);
       box-sizing: border-box;
       .contenthei{
           .test{
               color:#e6bb85 !important;
           }
           .login_btn{
               background: #9e2d32 !important;
               color:#ffffff !important;
           }
           .密码{
            .wjmi{
               border-left:1px solid #e6bb85 !important;
               color:#6a614d;
            }
           }
            .账号{
               border:1px solid #e6bb85 !important;
            .input_box{
                /deep/input{
                color:#6a614d !important;   
                }
                    /deep/ input::-webkit-input-placeholder {
                        color: #6a614d !important;
                    }
            }
            }

       }
       .contentbai{
           width: 84%;
           margin:0px auto;
           box-sizing: border-box;
           .login_btn{
               width: 100%;
               border-radius: _vw(25);
               height: _vw(40);
               background: #ffffff;
               color:#5dadff;
               line-height: _vw(40);
               text-align: center;
               font-size: _vw(18);
           }
           .密码{
            .wjmi{
                   margin-top:_vw(5);
               width: _vw(75);
               height:_vw(30);
               border-left:1px solid #ffffff;
               line-height: _vw(30);
               font-size: _vw(13);
               text-align: center;
               
            }
           }
           .账号{
               margin-bottom:_vw(20);
               width: 100%;
               border-radius: _vw(25);
               border:1px solid #ffffff;
               height: _vw(40);
               display: flex;
            //    align-items: center;
              box-sizing: border-box;
            /deep/.van-cell-group{
                padding:0px;
                background:none;
                background-color:rgba(0,0,0,0.0);
            }
            /deep/[class*=van-hairline]::after{
                border:none;
            }
               .input_box{
                  display: block;
                   flex:1;
                   
                   /deep/input{
                   color:#ffffff ;   
                   font-size: _vw(16);   
                   height:_vw(40);               
                   }
                   /deep/.van-cell-group{
                     padding:0px;
                     background-color:rgba(0,0,0,0.0) ;
                   }
                   /deep/.van-cell{
                     background-color:rgba(0,0,0,0.0);
                      padding:_vw(0)  _vw(0)  _vw(0)  _vw(10) ;
                         line-height: 21px;
                   }
                  /deep/ input::-webkit-input-placeholder {
                        color: #ffffff ;
                    }
               }
               .icon_zh{
                   width: _vw(15);
                   height: _vw(18);
                   margin-left:_vw(14);
                   margin-top:_vw(10);
                   img{
                       width: 100%;
                       height: 100%;
                   }
               }
           }
            .test{

            margin-bottom:_vw(10);
            line-height: _vw(40);
            text-indent: _vw(10);
            font-size: _vw(18)
            }
       }
     
       .dalete_box{
           width:_vw(30);
           height:_vw(30);
           position: absolute;
           top:_vw(30);
           right:_vw(6);
           img{
               width: 100%;
               height: 100%;
           }
       }
    }
}
</style>