


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
        <div class="demo-ruleForm">
        <el-form :model="loginForm"  :rules="rules" ref="loginForm" label-width="0px" >

            <!-- 账号 -->
            <el-form-item label="" prop="username" class="font_c">
                <el-input placeholder="请输账号" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.username" >
                    <span slot="prefix" class="iconfont iconicon"></span>
                        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" class="font_c">
                <el-input placeholder="请输入密码" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" show-password v-model="loginForm.password" >
                    <span slot="prefix" class="iconfont iconmima1"></span>
                </el-input>
            </el-form-item>

            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="font_c">
                <el-button type="danger" @click="submitForm('loginForm')" class="login_btn">登录</el-button><br>
            </el-form-item>

        </el-form>

        <div class="footer_nav">
            <div>
                <router-link to="/" style="color:red">忘记密码</router-link>
            </div>
            <div>
                <span class="login_nav">还没账号? </span>
                <router-link to="/register" style="color:red">立即注册</router-link>
            </div>

        </div>

         </div>

    </div>
</template>
<script>
import can from '@/components/半圆.vue'
export default {
 
    data() {
        // 包含特殊字符的函数
        const checkSpecificKey = str => {
            var specialKey =
                "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
            for (var i = 0; i < str.length; i++) {
                if (specialKey.indexOf(str.substr(i, 1)) != -1) {
                    return false;
                }
            }
            return true;
        };

        // 验证密码的函数
        const pass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 4 || value.length > 12) {
                callback(new Error("密码长度 4 - 12位"));
            } else if (!checkSpecificKey(value)) {
                callback(new Error("密码不能包含特殊字符"));
            } else {
                if (this.loginForm.checkPwd !== "") {
                    // 如果确认密码不为空
                    this.$refs.loginForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
                }
                // 成功的回调
                callback();
            }
        };
        return {
            // 登录表单的数据
            loginForm: {
                username: "lixunhuan",//注册账号
                password: "123456",//密码
                // graph:"",//图形验证码
            },
            rules: {
                // 验证用户名
                username: [
                    // 非空验证
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { min: 4, max: 12, message: "账号长度在 6 - 12 位", trigger: "blur" }
                ],
                // 验证密码
                password: [
                    { required: true, validator: pass, trigger: "blur" }
                ],
            }
        };
    },
  
    methods: {
         
        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate(valid => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    alert("前端验证成功 能提交给后端！");                  
                } else {
                    // 否则就是false
                    alert("前端验证失败 不能提交给后端！");
                    return false;
                }
            });
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
            width: 80%;
            margin:0px auto;
          
            margin-top:_vw(10);
            display: flex;
             justify-content:space-between;
          li{
              width: _vw(50);
              height: _vw(50);
              border-radius: 50%;
              padding-top:_vw(10);
              background: #ffffff;
              box-sizing: border-box;
              margin:_vw(0) _vw(2) _vw(0) _vw(2) ;
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
                  margin:0px;
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
       background: #ffffff;
        border:1px solid #ccc;
        width: 80%;
        margin:0px auto;
        padding-top:_vw(20);
        border-radius: 6px;
/deep/.iconfont {
    font-size: _vw(24);
    margin-left: _vw(3);
}


/deep/.radioK {
    width: _vw(260) !important;
    height: _vw(30);
    text-align: center;
}
.login {
    padding-bottom: _vw(50);
}
.login_btn {
    width: 100%;
    border-radius: _vw(35);
    margin: 0px auto;
    height: _vw(40);
    font-size: _vw(14);
}

/deep/.el-form-item__label {
    width: 0px;
}
.font_c {
    width: 90%;
    margin: 0px auto;
    margin-bottom: _vw(20);

    /deep/ .el-input__inner {
        position: relative;
        width: 100%;
        border-radius: _vw(35);
        margin: 0px auto;
        padding-left: _vw(36);
    }
}

.footer_nav{
    display: flex;
    justify-content:space-between;
    font-size: _vw(14);
    margin-bottom:_vw(20);
    div:nth-child(2){
        padding-right: _vw(10);
    }
      div:nth-child(1){
        padding-left: _vw(10);
    }

}

}

}

/deep/.el-input__inner{
  height: _vw(40) !important;
  font-size: _vw(14)  !important;
}
/deep/.el-form-item__content{
  line-height: _vw(40) !important;
}
/deep/.el-input__icon{
  line-height: _vw(40) !important;
}
/deep/.el-icon-view{
    margin-right: _vw(20) !important;
}

</style>
