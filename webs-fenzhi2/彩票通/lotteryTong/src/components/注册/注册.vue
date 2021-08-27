<template>
    <div class="注册">
        <!-- <h1 @click="点我关闭登陆框()">点我关闭弹窗</h1> -->
        <div class="div_box" :style="{'background-image':'url('+皮肤区分.registerimg+')'}">
         <div class="dalete_box"  @click="点我关闭登陆框()"><img :src="皮肤区分.delete" alt=""></div>



            <div class="contentbai"  :class="皮肤区分.classname" >
               <div class="test" @click="登陆()">登陆</div> 
                 <div class="账号">
                     <div class="icon_zh"><img :src="皮肤区分.zhimg" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   :error-message="TSname" v-model="register.name" placeholder="请输入昵称" />
                          </van-cell-group >
                 </div>

                 <div class="账号">
                     <div class="icon_zh"><img  :src="皮肤区分.ipimg"  alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   :error-message="TSphone" v-model="register.phone" placeholder="请输入账号手机号码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img  :src="皮肤区分.yzimg"  alt=""></div> 
                          <van-cell-group class="input_box" >
                               <van-field   :error-message="TSphoneYZ"   v-model="register.phoneYZ" placeholder="请输入验证码" />
                          </van-cell-group >
                     <div class="wjmi" @click="获取验证码()"> 获取验证码 </div>
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img  :src="皮肤区分.pwdimg"  alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   type="password"  :error-message="TSpwd" v-model="register.pwd" placeholder="请输入密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号">
                     <div class="icon_zh"><img  :src="皮肤区分.pwdqrimg"  alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   type="password"  :error-message="TSpassword" v-model="register.password" placeholder="请确认密码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img  :src="皮肤区分.yqname"  alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field   :error-message="TSinvite" v-model="register.invite" placeholder="请输入邀请码" />
                          </van-cell-group >
                      <div class="wjmi"> 可选填 </div>
                 </div>
                 <div class="login_btn" @click="注册()">确认</div>
            </div>
        </div>

    </div>
 
</template>

<script> 
 import { Toast } from 'vant';
 import { mapMutations,mapState} from 'vuex'
 export default {
    data() {
        return {
            register:{
                name:'',//账号3344466666
                phone:'',//手机
                phoneYZ:'',//验证码
                pwd:'',//密码
                password:'',//确认密码
                invite:''//邀请码
            },
            TSname:"昵称为2-6个汉字",
            TSphone:"",
            TSphoneYZ:"",
            TSpwd:"",
            TSpassword:"",
            TSinvite:"",
            bai:{
               registerimg:require("../../assets/img/qit/bai/register.png"),
               delete:require("../../assets/img/qit/bai/icon_close.5fb77d7.png"),
               classname:"",
              zhimg:require('@/assets/img/qit/bai/icon_user.32c2cc9.png'),
              ipimg:require('@/assets/img/qit/bai/icon_sjhm.db1fec1.png'),
              yzimg:require('@/assets/img/qit/bai/icon_code.5199604.png'),
              pwdimg:require('@/assets/img/qit/bai/icon_password.122d2e6.png'),
              pwdqrimg:require('@/assets/img/qit/bai/icon_password.122d2e6.png'),
              yqname:require('@/assets/img/qit/bai/icon_yqm.50780cc.png'),





           },
            hei:{
                registerimg:require("../../assets/img/qit/hei/register.png"),
                delete:require("../../assets/img/qit/hei/icon_close.cc48b29.png"),
               classname:"contenthei",

              zhimg:require('@/assets/img/qit/hei/icon_user.b3fecea.png'),
              ipimg:require('@/assets/img/qit/hei/icon_sjhm.e9d8fcf.png'),
              yzimg:require('@/assets/img/qit/hei/icon_code.23f9627.png'),
              pwdimg:require('@/assets/img/qit/hei/icon_password.f1d9958.png'),
              pwdqrimg:require('@/assets/img/qit/hei/icon_password.f1d9958.png'),
              yqname:require('@/assets/img/qit/hei/icon_yqm.30282b9.png'),
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
          ...mapMutations({
            更改注册框显示隐藏:'更改注册框显示隐藏',
            更改登录框显示隐藏:"更改登录框显示隐藏"
        }),
         登陆(){
         this.更改登录框显示隐藏(true)
         this.更改注册框显示隐藏(false)
        },
        获取验证码(){
              var isphone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
         if(this.register.phone==""){
              Toast('请填写手机号');            
         }else if(!isphone.test(this.register.phone)){
              Toast('请填写正确格式的手机号码');            
         }
         else{//弹出验证框
          Toast('手机号码填写正确'); 
             return true 
         }
        },
     
        注册(){
             var hztest =  /^[\u4e00-\u9fa5]{2,6}$/;
               var isphone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
           
            if(this.register.name==''){
              Toast('账户名不能为空'); 
              return         
            }else if(!hztest.test(this.register.name)){//账户名不正确
                 Toast("昵称为2-6个汉字！"); 
                 return
            }
            // else if(hztest.test(this.register.name)){//用户名输入域正确
            //     this.TSname=''
            // }
            else if (this.register.phone==""){//手机号码正确 phoneYZ
                   Toast("请输入手机号码"); 
                  return
            }
            else if (!isphone.test(this.register.phone)){//手机号码不正确
                 Toast("请输入正确格式的手机号码");
                 return 
            }
              else if (this.register.phoneYZ==""){//手机号码正确 phoneYZ
                   Toast("请输入手机验证码"); 
               return
            } 
            else if (this.register.pwd==""){//手机号码正确 phoneYZ
                   Toast("请输入密码"); 
               return
            }
             else if (this.register.password==""){//手机号码正确 phoneYZ
                   Toast("请再次输入密码"); 
                return
            }
             else if (this.register.password!==this.register.pwd){//手机号码正确 phoneYZ
                   Toast("两次输入密码不一致"); 
                return
            }
       
           else{//获取到所有数据提交给后端
               console.log(this.register)
              Toast('前端验证成功'); 
           }
        },
        
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
       height:_vw(516);
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
               margin-bottom:_vw(24);
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