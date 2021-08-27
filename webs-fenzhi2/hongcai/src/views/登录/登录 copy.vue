<template>
  <div class="登录">
       <div class="title">
            <span class="返回" @click="返回()">
                <van-icon name="arrow-left" /></span>
            <span>登录</span>
            <div></div>
        </div>
        <div class="content">
            <div class="引导">
                <span class="zhis">手机号登录</span><span class="min_yd" @click="$router.push('/register')">去注册</span>
            </div>
            <form id="user">
             <div  class="账号" >
                 <div class="left">
                     <van-dropdown-menu active-color="#ee0a24" :change="海边(value1)">
                        <van-dropdown-item  v-model="value1"  :title="title"   :options="option1" />
                    </van-dropdown-menu>
                 </div>
                 <div class="right">
                    <input type="text" placeholder="请输入手机号"  v-model="user.pbone" class="input">
                 </div>
             </div>


             <div class="输入框"  v-if="密码或验证登陆">
                   <input type="text" placeholder="请输入密码"   v-model="user.pwd"   class="input">
             </div>


             <div class="验证码" v-if="!密码或验证登陆" >
                 <div class="框">
                    <input type="text" placeholder="请输入短息验证码"   v-model="user.verify"  class="input">
                 </div>
                 <div class="验证" @click="获取验证码()">获取验证码</div>
             </div>
              <div class="login_btn">登陆</div>
              <div class="登陆方式" @click="短信和验证码切换()">
                  {{ 密码或验证登陆==true ? "使用短信验证登陆" : "使用密码验证登陆"}}
              </div>
               </form>
        </div>
  </div>
</template>
<script>
import {登陆} from "@/api/登陆注册.js"
export default {
    data() {
        return {
            是否登录:true,
            value1: 0,
            title:"",
            密码或验证登陆:false,
              user:{
              pbone:"",
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
    computed: {
        
    },
    created() {
     
    },
         computed: {
               isPhone: function () {
              var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
             return phoneTest.test(this.user.pbone)
           },
     
    },
    methods: {
        获取验证码(){
           
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
// /deep/.van-dropdown-menu__title{
//                      font-size: _vw(14) !important;
//                 }  
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
            // width: 100%;
            // background: #f22222;
            .input{
                border:none;
                  height: _vw(34);
                     font-size: _vw(14);
            // width: 100%;

            }
        }
        .账号{
            display:flex;
            align-items: center;
            border-bottom:1px solid #ccc;
            // border-top:1px solid #ccc;
            height: _vw(50);
            margin-bottom: _vw(20);
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
                }  
            }
            .right{
                  line-height: _vw(50);
                margin-left: _vw(20);
                .input{
                  border:none;
                  height: _vw(34);
                  font-size: _vw(14);
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
                 border:1px solid  #acacac;
                //  background: gold;
                 text-align: center;
                     font-size: _vw(14);
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
            margin:_vw(20) _vw(0);
        }
        .登陆方式{

            text-align: right;
             color:#666;
             font-size:_vw(12);
        }

   }
    
}
</style>