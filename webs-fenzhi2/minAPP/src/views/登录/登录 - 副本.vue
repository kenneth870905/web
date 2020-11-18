


    <template>
    <div class="login">
        <div class="top">
             <van-nav-bar  title="登陆"  class="title"  left-arrow  @click-left="onClickLeft" />
                 <div class="标语">
                 <img src="../../assets/img/yiyi.png" alt="">
             </div>

          <ul class="test_ul">
                 <li>
                      <div class="img_div"><img src="../../assets/img/1.png" alt=""></div><p>vip专享</p>
                </li>
                 <li>
                      <div class="img_div"><img src="../../assets/img/2.png" alt=""></div><p>电影种子</p>
                </li> 
                <li>
                      <div class="img_div"><img src="../../assets/img/3.png" alt=""></div><p>有声小说</p>
                </li> 
                <li>
                      <div class="img_div"><img src="../../assets/img/4.png" alt=""></div><p>低俗内容</p>
                </li> 
                <li>
                      <div class="img_div"><img src="../../assets/img/5.png" alt=""></div><p>漫画</p>
                </li>
             </ul> 
        </div>           
         <div class="半圆">
                <div>
                    <can></can>
                </div>
        </div>
        <!-- 登录表单 -->
        <div  class=" demo-ruleForm" >
            <ul>
                 <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">全部</li>
                 <li @click="clicktite(1)"  :class="{'titleActive':tableType ==1}">AG旗舰</li>
              
            </ul>
              <div  class="title_content"  v-if="tableType==0">

                 <van-cell-group>
                    <van-field  v-model="loginForm.username" required  clearable label="手机号"  placeholder="请输入手机号" @click-right-icon="$toast('question')"  >
                    <van-button slot="button" size="small" type="primary" @click="发送验证码()">发送验证码</van-button>
                    </van-field>
                    <van-field v-model="loginForm.password"  type="password"  label="验证码"  placeholder="请输入验证码"  required />          
                </van-cell-group>

                <div class="font_c"  @click="登录()">立即登录0</div>
                <p class="注册引导">没有账号？   <span class="fred" @click="$router.push('/register')">立即注册</span> </p> 
                  
              </div>
              <div  class="title_content"  v-if="tableType==1">

                  <van-cell-group>
                    <van-field  v-model="loginForm.username" required  clearable label="手机号"  placeholder="请输入手机号" @click-right-icon="$toast('question')"  >
                    <van-button slot="button" size="small" type="primary" @click="发送验证码()">发送验证码</van-button>
                    </van-field>
                    <van-field v-model="loginForm.password"  type="password"  label="验证码"  placeholder="请输入验证码"  required />          
                </van-cell-group>

                <div class="font_c"  @click="登录()">立即登录1</div>
                <p class="注册引导">没有账号？   <span class="fred" @click="$router.push('/register')">立即注册</span> </p> 

              </div>
         
        </div>
        <!-- <div class="demo-ruleForm">
            <van-cell-group>
                    <van-field  v-model="loginForm.username" required  clearable label="手机号"  placeholder="请输入手机号" @click-right-icon="$toast('question')"  >
                    <van-button slot="button" size="small" type="primary" @click="发送验证码()">发送验证码</van-button>
                    </van-field>
                    <van-field v-model="loginForm.password"  type="password"  label="验证码"  placeholder="请输入验证码"  required />          
           </van-cell-group>

            <div class="font_c"  @click="登录()">立即登录</div>
            <p class="注册引导">没有账号？
                <span class="fred" @click="$router.push('/register')">立即注册</span>
            </p>
         </div> -->
    </div>
</template>
<script> 
import can from '@/components/半圆.vue'
import {获取手机验证码,登录接口} from "@/api/登录.js"
import { Toast } from 'vant';
import { mapMutations} from 'vuex' 



export default {
    data() {
       
        return {
                 tableType:0,

            loginForm: {
                username: "",//注册账号
                password: "",//密码
            },
           
        };
    },
    
       computed:{
             isPhone: function () {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.loginForm.username)
          },
       },


    methods: {
           ...mapMutations({
              保存当前数据:"保存登陆状态",
              保存用户信息: "用户信息"
        }),
           clicktite(index) {
            this.tableType = index
        },
          发送验证码(){
                  var Phone={
                     phone:this.loginForm.password
                  } 
          },

          登录(){
                  if(this.isPhone){
                    var Phone={
                         phone:this.loginForm.username
                    } 
                        登录接口(Phone).then(x=>{
                            console.log(x)
                                if(x.data.code=="1"){
                                    Toast(x.data.msg);
                                      this.保存当前数据(true)
                                      var user={
                                          name:this.loginForm.username
                                      }
                                      this.保存用户信息(user)
                                      this.$router.push('/')
                                 }else{
                                     Toast(x.data.msg);
                                    }
                        }).catch(err=>{
                            console.log(err)
                        })
                }else{
                  Toast('请输入正确格式的手机号')
                }
           
               
          },
           onClickLeft() {//头部
            history.back()
         },
       
    },
       components: { // 注册组件
       can,
    },
}
</script>

<style lang="scss" scoped>


/deep/.van-button--primary{
    background: #ec304c;
    border:none;
}
/deep/.van-button--small{
    min-width:_vw(44);
    font-size: _vw(12);
    height: _vw(28);
    line-height: _vw(25);
    
}
/deep/.van-cell{
   line-height: _vw(30);
   font-size: _vw(12);
}

/deep/.el-button--danger{
    background: #ec304c
}
      /deep/.van-nav-bar{       
            border-bottom:0px !important;
        }
         /deep/.van-hairline--bottom::after{
            border-bottom-width: 0px !important;
        }
   /deep/.el-icon-view{
        font-size: _vw(22) !important;
        margin-right:_vw(4)
       }
         /deep/.el-form-item__error{
            font-size: _vw(14) important;
        }
.login{
 background:#ffffff;
 position: absolute;
 width: 100%;
 height: 100%;

  .top{
        background: #ec304c;
        height: _vw(200);
    .title{
        background: #ec304c; 
        margin-bottom: none; 
           /deep/.van-nav-bar__title{
           color:#ffffff !important; 
           font-size:_vw(18);           
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
         }
          .标语{
            width: 46%;
            height:_vw(30);
            margin:0px auto; 
            margin-top:_vw(20);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .test_ul{
            width: 90%;
            margin:0px auto;
            margin-top:_vw(10);
            display: flex;
             justify-content:space-between;
          li{
              width: _vw(60);
              height: _vw(56);
              border-radius: 50%;
              padding-top:_vw(10);
              background: #ffffff;
              box-sizing: border-box;
              margin:_vw(0) _vw(1) _vw(0) _vw(1) ;
              .img_div{
              margin:_vw(4);
              width: _vw(30);
              height: _vw(30);
              margin:0px auto;
              margin-bottom: _vw(14);
                img{
                    width: 100%;
                    height: 100%;
               }
              }
              p{
                  width: 100%;
                  margin:0px;
                  margin-top:_vw(20);
                  text-align: center;
                  font-size: _vw(12);
                  color:#ffffff;
              }
             
          }
        } 
    }
    .半圆 {
    position: relative;
    > div {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 40px;
        left: 0px;
        top: 0px;
    }
    }
.demo-ruleForm{
    box-shadow: 2px 2px 10px #909090;
      position: relative;
       z-index:10;
       margin-top:_vw(140);
            background: #ec304c;

        border:1px solid #ccc;
        width: 88%;
        margin:0px auto;
        padding-top:_vw(20);
        border-radius: 6px;
        .title_content{
          background: #ffffff;
          padding-top:_vw(20);
        }
        ul{
            display: flex;
            .titleActive{
                background: #ffffff;
                // border-bottom: #ec304c;
            }
            li{
                width: 50%;
                line-height: _vw(30);
                text-align: center;
            }
        }

        /deep/.van-cell--required{
            border-radius:_vw(25);
            width: 90%;
            margin: 0 auto;
            margin-bottom:_vw(20);
            border:1px solid #f9f3f3;
        }
        /deep/[class*=van-hairline]::after{
            border:none
        }
        /deep/.van-cell:not(:last-child)::after{
             border:none
        }
        /deep/.van-field__label{
            width: _vw(54);
        }

/deep/.el-form-item__label {
    width: 0px;
}
    .font_c {
        width: 90%;
        margin: 0px auto;
        margin-top:_vw(40);
        margin-bottom: _vw(20);
         background: #ec304c;
         height: _vw(40);
         border-radius: _vw(25);
         text-align: center;
         line-height: _vw(40);
         color:#ffffff;
         font-size: _vw(12);
    }
    .注册引导{
        width: 90%;
        margin: 0px auto _vw(16) auto;
        font-size: _vw(14);
    }
 }
}

// ========提示弹框==============
// /deep/.van-notify {
//     .van-toast{
//     font-size: _vw(16) !important;
//     line-height: _vw(16) !important;
//     padding:_vw(10) _vw(6) _vw(10) _vw(6) !important;
//     }
// }
// /deep/.van-toast--text{
//   font-size: _vw(30);
// }

</style>
