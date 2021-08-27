<template>
    <div  style="background-image:url('image/index/bg.jpg'); 
  width:100%;height:1000px;
    overflow: hidden;">
        <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" style="background:#cdcdcd"/>
         <div class="registered">
             <p>为了您的资金安全，请使用真实资料!</p>
              <ul>
                  <li @click="添加边框(1)" :class="{active:active == 1}">
                       <span><img src="image/my/icon-user.png" alt=""></span> 
                       <input type="text" placeholder="请输入账号或者手机号" style="padding-left:5px;"  v-model="user.uid">
                  </li>
                  <p v-if="!isphone">*请使用6-15位英文或数字的组合</p>
                  <li v-if="!isphone"  @click="添加边框(2)" :class="{active:active == 2}">
                       <span><img src="image/my/icon-pwd.png" alt=""></span> 
                       <input type="password" placeholder="请输入密码" style="padding-left:5px;"  v-model="user.pwd">
                  </li>
                  <p v-if="!isphone">*请使用至少6位字符</p>
                   <li v-if="!isphone"  @click="添加边框(3)" :class="{active:active == 3}">
                       <span><img src="image/my/icon-pwd.png" alt=""></span> 
                       <input type="password" placeholder="请确认密码" style="padding-left:5px;"  v-model="user.pwd1">
                  </li>
                  <p v-if="!isphone">*选填(非必填)</p>
                   <li v-if="!isphone"  @click="添加边框(4)" :class="{active:active == 4}">
                       <span><img src="image/my/icon-user.png" alt=""></span> 
                       <input type="password" placeholder="推荐人ID" style="padding-left:5px;"  v-model="user.ruid">
                  </li>
                  <p v-if="!isphone">*验证码</p>
                     <div @click="改变验证码()" class="验证码地址" v-if="!isphone"  >
                            <input
                                type="text"
                                v-model="user.code"
                                @focus="focus1"
                                @keyup.enter="登录()"
                                placeholder="请输入验证码"
                            />
                       <img v-if="验证码地址" :src="验证码地址" style=" position: relative; top:-35px;" />
                    </div>
                  <li v-if="isphone"  @click="添加边框(6)" :class="{active:active == 6}">
                       <span><img src="image/my/icon-pwd.png" alt=""></span> 
                       <input type="password" placeholder="请输入验证码" style="padding-left:5px;"  v-model="user.sms">
                       <b class="zhuce_sms" @click="getSms()">{{时间>0 ? 时间+'s' : '获取短信'}}</b>
                  </li>
              </ul>
                
               <button class="login_zc" @click="注册()">注册</button>
               <button class="btn_2" @click="$router.push('/login')">返回登录</button>
               <button class="btn_2" @click="$router.push('/')">返回首页</button>
         </div>
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
            active: 0,
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
            active:""
        };
    },
    computed: {
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid);
        }
    },
    methods: {
        添加边框(index){
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
                        Toast("短信发送成功");
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
            console.log(index)
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

<style scoped>
.active{
    border:1px solid #983939 !important;
}
.zhuce_sms {
    position: relative;
    left: 259px;
    top: -43px;
}
.验证码图片 img {
    position: absolute;
    z-index: 1;
    left: 239px;
    height: 35px;
    top: 294px;
}
.van-nav-bar__title{
    font-size: 18px;
    color: #444444;
    font-weight: bold;
}
.van-nav-bar .van-icon{
    color: #444444;
}
.registered p{
    margin: 15px 0 0 24px;
}
.registered ul li{
    width: 90%;
    height: 40px;
    border:1px solid #f2f2f2;
    margin: 0 auto;
    margin-top: 8px;
}
.registered ul li img{
    width: 27px;
    height: 27px;
    margin: 6px;
}
.registered ul li input{
    position: relative;
    top: -17px;
    width: 86%;
    height: 35px;
    border: 0 !important;
    padding: 0 !important;
    background: #c0c0c0;
    margin-bottom: 0;
    padding-left: 10px !important;
}
.验证码地址{
    width: 88%;
    height: 50px;
}
.验证码地址 img{
    float: right;
}
.验证码地址 input{
    width: 103%;
    margin: -39px 0px 0px 19px;
    margin-top: 4px;
    background: #c0c0c0;
    border: 1px solid #f2f2f2;
}
.login_zc {
    width: 90%;
    height: 50px;
    background: #1e87ff;
    margin: 19px;
    color: white;
    font-size: 15px;
}
.btn_2 {
    width: 90%;
    height: 34px;
    background: #ececec;
    color: #579cec;
    font-size: 15px;
    margin: 10px 0px 0 18px;
}
</style>
