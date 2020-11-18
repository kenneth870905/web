<template>
  <div class="登录">

     <!-- ============弹出框============================= --> 
        <van-popup v-model="show"  :close-on-click-overlay="false"  class="弹出框" >
           <div class="tc_box">
                 <div class="定位关闭" @click="show=false"><van-icon name="cross" /></div>
               <div class="img_box"><img @click="点击跟换二维码()" :src="configData.api_url+imgurl" alt=""></div>
        
              <div class="input" >
                <div class="left_input">
                    <van-cell-group>
                    <van-field v-model="valuenum"  placeholder="请输入以上验证码" />
                    </van-cell-group>
                </div>
                <div class="right" @click="点击确认验证码()">确认</div>
             </div>


           </div>
     </van-popup>



      <div class="title">
            <span class="返回" @click="返回()">
                <van-icon name="arrow-left" /></span>
                 <span>注册</span>
                <div></div>
      </div>

        <div class="content">
            <div class="引导">
                <span class="zhis">手机号注册</span><span class="min_yd" @click="$router.push('/login')">去登录</span>
            </div>
             <div  class="账号" >
                 <div class="left">
                     <van-dropdown-menu active-color="#ee0a24" :change="海边(value1)">
                        <van-dropdown-item  v-model="value1"  :title="title"   :options="option1" />
                    </van-dropdown-menu>
                 </div>
                 <div class="right">
                    <input id="name" v-model="user.phone" type="text" placeholder="请输入手机号"   class="input">
                 </div>
             </div>


             <div class="输入框" >
                   <input  :type="密码show==true ? 'text' : 'password'"   v-model="user.pwd"  placeholder="8-16位密码，区分大小写"   class="input">
                    <div class="定位"   @click="密码show=!密码show">
                     <span><van-icon  class="icon"  :name="密码show==true ? 'eye-o' : 'closed-eye' " /></span>
                   </div>
             </div>


             <div class="验证码"  >
                 <div class="框">
                    <input type="text"  v-model="user.verify"   placeholder="请输入短息验证码"   class="input">
                 </div>
                         <van-button   class="验证"  @click="获取验证码的函数()"  v-if="是否发送验证码"  type="danger">获取短信</van-button>
                         <van-button    class="验证"  @click="获取验证码的函数()"   v-if="!是否发送验证码"   disabled type="danger">{{时间+' s' }}</van-button>
                    <!-- <div class="验证" @click="获取验证码的函数()"> {{时间>0 ? 时间+' s' : '获取短信'}}</div> -->
             </div>
             <div  class="text">
                    <div  v-if="text!==''" class="text_box" >{{text}}<van-icon name="warning"  class="icon" /></div>
             </div>
           
              <div class="login_btn" @click="注册()">注册</div>
             
        </div>
  </div>
</template>
<script>
import {注册,获取验证码,获取图形验证码} from "@/api/登陆注册.js"
import { Toast } from 'vant';
import {  mapMutations} from 'vuex' 

export default {
    data() {
        return {
          密码show:false,
          是否发送验证码:true,
             configData: config,
             imgurl:"/admin/Applogin/yzcode",
          show:false,
          valuenum:"",
            是否登录:true,
            value1: 0,
            时间:0,
            text:"",
            title:"",
            user:{
              phone:"",
              pwd:"",
              verify:"",
            },
            option1: [
                { text: '中国+86', value: 0 },
                { text: '台湾地区+886', value: 1 },
                { text: '香港地区+852', value: 2 },
                { text: '澳门地区+853', value: 3 }
            ],
        }
    },
    components: { // 注册组件

    },
  computed:{
             isPhone: function () {
              var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
             return phoneTest.test(this.user.phone)
           },

            isPwd: function () {
              var PwdTest = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{0,20}$/;
                return PwdTest.test(this.user.pwd)
           },
       },

  
    created() {

    },
 
    methods: {
       ...mapMutations({
              保存当前登录状态:"更改登录状态"
        }),
       点击跟换二维码(){
            this.imgurl=""
            this.$nextTick(()=>{
                this.imgurl="/admin/Applogin/yzcode"
            })
         },
      点击确认验证码(){
          if(this.valuenum!==""){
                    var obj={
                               phone:this.user.phone,
                               zcode:this.valuenum,
                           }
                      获取验证码(obj).then(x=>{

                        if(x.data.code==1){
                           this.show=false
                          this.是否发送验证码=false
                           this.时间 = 60;
                           this.定时器 = setInterval(() => {
                            this.时间--;
                              if (this.时间 <= 0) {
                                  clearInterval(this.定时器);
                                  this.是否发送验证码=true
                              }
                              }, 1000);
                            
                        }else if(x.data.code==-2){
                           this.valuenum=""
                            this.imgurl=""
                            this.$nextTick(()=>{
                                this.imgurl="/admin/Applogin/yzcode"
                            })
                          Toast(x.data.msg)
                        }else{ 
                          this.valuenum=""
                           this.imgurl=""
                           this.$nextTick(()=>{
                            this.imgurl="/admin/Applogin/yzcode"
                           })
                           Toast(x.data.msg)
                        }
                      }).catch(err=>{
                          console.log(err)
                      })

          }
      },
        获取验证码的函数(){
                  this.user.verify=""
               if(this.user.phone==""){
                    this.text="请输入手机号"
               }else{
                     if(this.isPhone){
                        this.show=true
                     }else{
                          this.text="请输入正确格式的手机号"
                     }
               }
        },
        注册(){ 
            if(this.user.phone==""){
              this.text="请输入手机号"
            }
            else if (!this.isPhone){
               this.text="请输入正确格式的手机号"
            }else if(this.user.pwd==""){
                this.text="请输入密码"
            }
            else if(!this.isPwd){
              this.text="密码必须由 4-16位字母和数字组成"
            }else if(this.user.verify==""){
              this.text="请输入短信验证码"
            }else{
                var obj={
                  phone:this.user.phone,
                  password:this.user.pwd,
                  code:this.user.verify
                }
                注册(obj).then(x=>{
                  if(x.data.code==1){
                      this.$router.push('/')
                       Toast(x.data.msg.msg)
                       this.保存当前登录状态(true)
                         localStorage.setItem('phone',this.user.phone);
                        localStorage.setItem('token',x.data.msg.cookie);
                  }else{
                       Toast(x.data.msg)
                  }
                  // console.log(x.data.data)
                }).catch(err=>{
                  console.log(err)
                })
              
            }
        },
        短信和验证码切换(){
         this.密码或验证登陆=!this.密码或验证登陆
        },
        返回(){
             history.back()
        },
        海边(value){
          console.log(value)  
          if(value==0){
            this.title="+86"
          }else if(value==1){
            this.title="+886"
          }else if(value==2){
            this.title="+852"
          }else if(value==3){
            this.title="+853"
          }else{
              console.log("出错了")
          }
        },
    },
}


</script>
 <style lang="scss" scoped>
     .弹出框{
           width: 90%;
            border-radius: _vw(10);
        .tc_box{
            margin:0 auto;
            width: 100%;
            background: #999999; 
            border-radius: _vw(10);
            padding:_vw(20) 0px;
            position: relative;
            .定位关闭{
                position: absolute;
                right: 10px;
                top:10px;
                color:red;
                z-index: 2;
                font-size: _vw(20)
            }
           .img_box{
               height: _vw(40);
               display:flex;
               align-items: center;
               
               margin:0 auto;

               img{
               margin:0 auto;
                   height: 100%;
               }
           } 
        }

         .input{
           width: 90%;
           margin: 0px auto;
           display:flex;
           justify-content: space-between;
           align-items: center;
             padding-top:_vw(6);
           .left_input{
               border-radius: _vw(6)  !important;
               background: #ffffff;
             width: 80%;
             box-sizing: border-box;
            
             
             /deep/.van-cell{
                 padding:0px;
                  line-height: _vw(36);
                  padding-left:_vw(10);
                  font-size: _vw(14);
                 .van-field__control{
                  border-radius: _vw(10);
                 }
             }
           }
           .right{
            background: #f5222d;
            width: _vw(60);
            height: _vw(36);
            color:#ffffff;
            border-radius: _vw(6);
            line-height: _vw(36);
            font-size:_vw(13);
            text-align: center;
            margin-left: _vw(6);
             box-sizing: border-box;
             
           }

       }

    }


.登录{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    background:#ffffff;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    
    .title {
    padding: _vw(0) _vw(10);
    // box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    line-height: _vw(44);
    color: #ffffff;
    font-size: _vw(18);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #f22222;
    z-index: 10;
   }
   .content{
       padding-top:_vw(40);
       width: 90%;
       margin:0px auto;
        .引导{
            line-height: _vw(40);
            margin:_vw(16) _vw(0);
           .zhis{
               font-size: _vw(24);
               margin-right: _vw(10);
           }
           .min_yd{
               font-size: _vw(14);
               color:#666;
           }
        }
        .输入框{
             border-bottom:1px solid #ccc;
            height: _vw(49);
            margin-bottom: _vw(10);
            line-height: _vw(49);
            position: relative;
             .定位{
              position: absolute;
              right:_vw(10);
              top:_vw(4);
              .icon{
                font-size: _vw(16);
              }
            }
            .input{
                border:none;
                  height: _vw(34);
                     font-size: _vw(14);
                     width: 100%;
            }
        }
        .账号{
            display:flex;
            align-items: center;
            border-bottom:1px solid #ccc;
            height: _vw(50);
            .left{
                background: green;
                height: _vw(34);
                /deep/.van-dropdown-menu__title::after{
                        top:_vw(12);
                        position: absolute;
                        right: _vw(-10);
                        border: _vw(3) solid;
                        border-color: transparent transparent currentColor currentColor;
                        -webkit-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                          // line-height: _vw(50)
                }
                /deep/.van-cell{
                    font-size: _vw(14);
                }
                /deep/.van-dropdown-menu{
                    height: _vw(34);
                    line-height: _vw(34);
                }
                 /deep/.van-dropdown-menu__title{
                     font-size: _vw(14);
                     line-height: _vw(25)
                }  
            }
            .right{
                line-height: _vw(50);
                margin-left: _vw(20);
                width:100%;
                .input{
                  border:none;
                  height: _vw(34);
                  font-size: _vw(14);
                  width: 100%;
                }
            }
        }
        .验证码{
              height: _vw(50);
              line-height: _vw(50);
              display: flex;
              justify-content: space-between;
              margin-bottom: _vw(10);
             .框{
                 width:65%;
                 border-bottom: 1px solid #acacac;
                 .input{
                   border:none;
                   height: _vw(34);
                   font-size: _vw(14);
                 }
              }
             .验证{
                 width:30%;
                //  border:1px solid  #acacac;
                 text-align: center;
                 font-size: _vw(14);
                 height: _vw(50);
                 line-height: _vw(50);
             }
        }
        .login_btn{
            width:100%;
            height: _vw(40);
            line-height: _vw(40);
            text-align: center;
            color:#fff;
            font-size: _vw(14);
            font-weight: 500;
            border-radius: _vw(20);
            background: #f22222;
            margin:_vw(5) _vw(0) _vw(20) _vw(0);
        }
        .text{
          height: _vw(26);
          font-size: _vw(12);
          line-height:_vw(26);
          color:red;
          .text_box{
            display: flex;
            align-items: center;
            .icon{
              line-height: _vw(26);
              font-size: _vw(14);
              margin-left: _vw(6);
            }
          }
        }
        .登陆方式{
            text-align: right;
             color:#666;
             font-size:_vw(12);
        }
   }
    
}
</style>