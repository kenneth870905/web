<template>
    <div class="regbj">
        <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />
        <div class="form-group"  :class="{active:active == 1}" @click="选中(1)" >
           <label for="mdl-0_username">用户名</label>
           <input id="mdl-0_username" v-model="user.uid"  class="form-control you1" placeholder="请输入手机号或用户名">
           <i  v-if="user.uid" class="van-icon van-icon-clear 删除按钮" @click="deluid()"></i>
        </div>
         <div class="form-group" @click="选中(2)" :class="{active:active  == 2}"   v-if="!isphone">
           <label for="mdl-0_username">密码</label>
           <input id="mdl-0_username" v-model="user.pwd" type="password" class="form-control you2" placeholder="请输入密码">
           <!-- fa fa-eye -->
           <!-- fa fa-eye-slash -->
           <i  v-if="user.pwd" class="van-icon van-icon-clear 删除按钮" @click="delpwd()"></i>
        </div>
         <div class="form-group" @click="选中(3)" :class="{active:active == 3}"  v-if="!isphone">
           <label for="mdl-0_username" style="padding-right:9px;">确认密码</label>
           <input id="mdl-0_username"  v-model="user.pwd1" type="password" class="form-control you3" placeholder="请确认密码">
            <i  v-if="user.pwd1" class="van-icon van-icon-clear 删除按钮" @click="delpwd1()"></i>
        </div>
        <div class="form-group 验证码图片"  @click="改变验证码(4)" v-if="!isphone" :class="{active:active == 4}">
           <label for="mdl-0_username">验证码</label>
           <input id="mdl-0_username"  v-model="user.code" class="you4" placeholder="请输入验证码"   @focus="focus1"> 
           <label  style="float:right;padding:0;margin-top:-5px;" ><img   v-if="验证码地址" :src="验证码地址" /></label>
        </div>
          <div class="form-group" @click="选中(5)" :class="{active:active == 5}"  v-if="isphone">
           <label for="mdl-0_username">短信验证</label>
           <input id="mdl-0_username"  v-model="user.sms" class="form-control you4" placeholder="请输入验证码">
           <label class="labsms" > <b  @click="getSms()">{{时间>0 ? 时间+'s' : '获取短信'}}</b></label>
        </div>
        <div>
             <van-checkbox class="check" v-model="checked">我已知晓并同意 “开户协议”各项条约</van-checkbox>
        </div>
        <button class="reg" @click="注册()">注册</button>
    </div>
</template>
<script>
import {
    api_普通注册接口,
    api_短信注册接口,
    api_获取短息验证码
} from "@/api/登录接口.js";
import JSEncrypt from "jsencrypt";
import { Toast } from "vant";
export default {
    data() {
        return {
            config: config,
            checked: true,
            验证码地址: "",
            user: {
                uid: "",
                pwd: "",
                pwd1: "",
                code: "", //文字验证码
                sms: "", //短息验证码
                ruid: "" //推荐人id
            },
            定时器: "",
            时间: 0,
            active:"",
        };
    },
    computed: {
        
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid);
        },
         显示推荐人Id(){
            if(this.config.ruidHidden){
                if(this.$route.query.code){
                    return true
                }
            }else{
                return true
            }
        },
        ruid只读(){
            return this.$route.query.code ? true : false
        }
    },
    methods: {
        deluid(){
            this.user.uid = "";
        },
        delpwd(){
            this.user.pwd = '';
        },
        delpwd1(){
             this.user.pwd1 = '';
        },
        选中(index){
          console.log(index);
          this.active = index;
        },
        getSms() {
            if (this.时间 != 0) {
                return;
            }
            this.时间 = 60;
            this.定时器 = setInterval(() => {
                this.时间--;
                if (this.时间 <= 0) {
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_获取短息验证码({ uid: this.user.uid })
                .then(x => {
                    if (x.data.code == 0) {
                        Toast("短信已发送，请注意查收!");
                    } else {
                        Toast(x.data.msg);
                    }
                })
                .catch(err => {});
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        focus1() {
            if (!this.验证码地址) {
                this.验证码地址 =
                    config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码(index) {
            this.验证码地址 =
                config.api_url + "/Home/Verify?v=" + Math.random();
                this.active = index
        },
        注册() {
            if (this.isPhone) {
                var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!phoneTest.test(this.user.uid)) {
                    Toast("请输入电话号码");
                    return;
                } else if (this.user.sms) {
                    Toast("请输入验证码");
                    return;
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms,
                    ruid: this.user.ruid
                };
                api_短信注册接口(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            Toast("注册成功");
                            this.getUserInfo().then(() => {
                                this.$router.push("/login");
                            });
                        } else {
                            Toast(x.data.msg);
                        }
                    })
                    .catch(err => {
                        Toast("网络异常稍后再试");
                    });
            } else {
                var publicKey =
                    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB";
                var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj = {
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code,
                    ruid: this.user.ruid
                };
                if (!this.user.uid) {
                    Toast("请输入用户名");
                    return;
                } else if (!this.user.pwd) {
                    Toast("请输入密码");
                    return;
                } else if (!this.user.code) {
                    Toast("请输入验证码");
                    return;
                }else if(this.checked == false){
                    Toast("请同意开户协议");
                    return;
                }
                api_普通注册接口(obj).then(x => {
                    if (x.data.code == 0) {
                        Toast("注册成功");
                        // this.getUserInfo().then(() => {
                        this.$router.push("/login");
                        // });
                    } else {
                        this.改变验证码();
                        Toast(x.data.msg);
                    }
                });
            }
        }
    }
    
};
</script>

<style  scoped>
input[type=password]{
    height: 20px;
    margin-bottom: 0px;
    border: 0;
}
.active{
    box-shadow:0px 0px 6px #66AFE9  !important;
    border: 1px solid #66AFE9 !important;
}
.删除按钮{
    width: 20px;
    height: 20px;
    font-size: 20px;
    position: absolute;
}
.labsms{
   float:right;
   padding:0 !important;
}
.regbj{
    width: 100%;
    height: 811px;
    background: #f5f5f5;
}
.reg{
    width: 95%;
    height: 38px;
    background: #3f3f3f;
    color:white;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 15px;
}
.form-group{
    display: block;
    width: 95%;
    height: 36px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    margin-top: 15px;
    margin-left: 10px;
}
.form-group>label{
    text-align: center;
    padding: 5px 28px 0 13px;
    color: #333;
    font-weight: bold;
}
.form-group > input{
       width: 70%;
}
.form-group >.you1{
  padding-left: 10px;
}
.form-group >.you2{
  padding-left: 26px;
  margin-right: 14px;
}
.form-group >.you3{
  margin-right: 6px;
}
.form-group >.you4{
  padding-left: 10px;
  width: 40% !important;
}
.zhuce_sms {
    position: relative;
    left: 259px;
    top: -54px;
}
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar__text {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
.user {
    width: 300px;
    height: 30px;
    background: red;
}
.van-button--primary {
    border-radius: 10px;
}
.van-button--large {
    width: 80% !important;
    margin-left: 40px;
}
.check {
    margin-left: 13px;
    margin-top: 15px;
}
.van-field__label {
    width: 70px;
    line-height: 3;
}
.van-cell--required::before {
    content: "";
}
.van-cell:not(:last-child)::after {
    content: none;
}

</style>
