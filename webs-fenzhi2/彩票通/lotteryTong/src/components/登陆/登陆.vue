<template>
    <div class="登录">
        <!-- <h1 @click="点我关闭登陆框()">点我关闭弹窗</h1> -->
        <div class="div_box" :style="{'background-image':'url('+皮肤区分.loginimg+')'}">
         <div class="dalete_box"  @click="点我关闭登陆框()"><img :src="皮肤区分.delete" alt=""></div>

            <div :class="皮肤区分.classname" class="contentbai" >
               <div class="test" @click="注册()">注册</div> 
                 <div class="账号">
                         <div class="icon_zh"><img :src="皮肤区分.imgl" alt=""></div>
                          <van-cell-group  class="input_box" >
                          <van-field  :error-message="手机号码格式" v-model="userinfo.name" placeholder="请输入账号手机号码" />
                          </van-cell-group >
                 </div>

                  <div class="账号 密码">
                     <div class="icon_zh"><img :src="皮肤区分.pwdimg" alt=""></div> 
                          <van-cell-group   class="input_box" >
                          <van-field   type="password"  error-message=""  v-model="userinfo.pwd" placeholder="请输入密码" />
                          </van-cell-group >
                     <div class="wjmi" @click="忘记密码()"> 忘记密码 </div>
                 </div>

                 <div class="login_btn" @click="登录()">登录</div>
            </div>
        </div>

    </div>
 
</template>

<script> 
 import { Toast } from 'vant';
 import { mapMutations,mapState } from 'vuex'
 export default {
    data() {
        return {
            userinfo:{
               name:"",
               pwd:"",
            },
            手机号码格式:"",
           
            bai:{
                loginimg:require("../../assets/img/qit/bai/loginbai.png"),
                delete:require("../../assets/img/qit/bai/icon_close.5fb77d7.png"),
                classname:'',
                imgl:require('@/assets/img/qit/bai/icon_sjhm.db1fec1.png'),
                pwdimg:require('@/assets/img/qit/bai/icon_password.122d2e6.png'),

           },
            hei:{
                loginimg:require("../../assets/img/qit/hei/loginimg.png"),
                delete:require("../../assets/img/qit/hei/icon_close.cc48b29.png"),
               classname:'contenthei',
                imgl:require('@/assets/img/qit/hei/icon_sjhm.e9d8fcf.png'),
                pwdimg:require('@/assets/img/qit/hei/icon_password.f1d9958.png'),
           }
        }
    },
    components: { // 注册组件

    },
    computed: { 
         isPhone: function () {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.userinfo.name)
        },
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
             改变密码框显示隐藏:'改变密码框显示隐藏',
             更改登录框显示隐藏:'更改登录框显示隐藏',
             更改注册框显示隐藏:"更改注册框显示隐藏",
             更改登陆状态:"更改登陆状态",
             保存:"保存"
        }),
        注册(){
          this.更改注册框显示隐藏(true)
          this.更改登录框显示隐藏(false)
        },
        忘记密码(){
            this.改变密码框显示隐藏(true)
        },
        登录(){
               var isphone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
               if(this.userinfo.name==""){
                 Toast('请填写手机号');            
               }else if(!isphone.test(this.userinfo.name)){
                    Toast('请填写正确格式的手机号');   
               }else{//前端验成功可以提交给后端
                    this.保存(this.userinfo)
                    //  发请求给后端如果请求成功后就把用户名存入本地存储
                            // var  name=this.userinfo.name
                            //    window.localStorage.setItem('name', name);  //把登录后的 
                            //     var name=window.localStorage.getItem(name); 
                            //  console.log(name)
                    Toast('前端验成功可以提交给后端'); 
                    this.更改登陆状态(true)
                     this. 更改登录框显示隐藏(false)
               }
        },
      
        点我关闭登陆框(){
          this. 更改登录框显示隐藏(false)
        }
    },
}


</script>
<style lang="scss" scoped>
.登录{
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
       height:_vw(300);
       position: absolute;
       left: 50%;
       top:_vw(200);
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
               margin:_vw(28) auto;
            .wjmi{
                   margin-top:_vw(5);
               width: _vw(65);
               height:_vw(30);
               border-left:1px solid #ffffff;
               line-height: _vw(30);
               font-size: _vw(13);
               text-align: center;
               
            }
           }
           .账号{
               margin-top:_vw(20);
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
                     height: _vw(40);
                    line-height:_vw(40);
                    // background: #d6a812;                
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