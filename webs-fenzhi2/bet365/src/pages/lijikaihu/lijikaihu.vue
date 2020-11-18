<template>
    <div>
        <Header />
        <div class="bg">
            <div id="hdpublic" class="w1000">
                <img src="static/lijikaihu/181011073009.jpg" alt />
            </div>
            <div id="Game-Menual" class="w1000">
                <div class="left_1">
                    <div class="Game-Menual-box" v-for="(item,index) in config.left_list" :key="index">
                        <a :href="'#'+item.url" target="_self">{{item.name}}</a>
                        <!-- <router-link :to="item.url"></router-link> -->
                    </div>
                </div>
                <!--  -->
                <div class="form">
                    <div class="reg_top" id="reg_top"></div>
                    <span class="aaa" v-if="btnStatus == 0 ">
                        <h2 style="color:red; font-size:15px;" @click="changeStatus" v-if="btnStatus == 0 ">切换手机号注册</h2>
                        <div class="use">
                            <label>
                                <span>用户名:</span>
                                <input v-model="user.uid" name="username" type="text" placeholder="用户名" />
                            </label>
                        </div>
                        <div class="pass">
                            <label>
                                <span>登录密码:</span>
                                <input v-model="user.pwd" name="password" type="password" placeholder="登录密码" />
                            </label>
                        </div>
                        <div class="rep">
                            <label>
                                <span>确认密码:</span>
                                <input v-model="user.pwd1" name="repassword" type="password" placeholder="确认密码" />
                            </label>
                        </div>
                        <div class="use">
                            <label>
                                <span>推荐人ID:</span>
                                <input v-model="user.ruid" name="username" type="text" placeholder="选填" />
                            </label>
                        </div>

                        <div @click="改变验证码()" class="验证码地址2">
                            <label>
                                <span>请输入验证码:</span>
                                <input type="text" v-model="user.code" @focus="focus1" class="yz_inp" placeholder="验证码" />
                            </label>
                            <img v-if="验证码地址" :src="验证码地址" />
                        </div>
                        <div id="cbox">
                            <input style="width:15px;height:15px;margin-top:14px;" type="checkbox" checked />
                            <span style="color:yellow; font-size:12px; margin-left:25px">我已届满合法博彩年龄﹐且同意各项开户条约。</span>
                        </div>
                        <div class="submitDiv verifyRandom">
                            <el-button type="success" round @click="注册()" style="width:180px; margin-left:100px;">立即注册</el-button>
                        </div>

                        <div class="reg_bottom"></div>
                    </span>

                    <span class="aaa" v-if="btnStatus == 1">
                        <h2 style="color:red; font-size:15px;" @click="changeStatus" v-if="btnStatus == 1 ">切换账号注册</h2>
                        <div class="use">
                            <label>
                                <span>手机号码:</span>
                                <input name="username" type="text" v-model="user.uid" /> * 11位手机号码
                            </label>
                        </div>
                        <div class="pass">
                            <label>
                                <span>短信验证:</span>
                                <input name="password" type="password" v-model="user.sms" value />
                                <span style="color:red;text-align:left;" @click="getSms()">{{时间>0 ? 时间+'s' : '获取短信验证码'}}</span>
                            </label>
                        </div>

                        <div id="cbox">
                            <input style="width:15px;height:15px;margin-top:14px;" type="checkbox" checked />
                            <span style="color:yellow; font-size:12px; margin-left:25px">我已届满合法博彩年龄﹐且同意各项开户条约。</span>
                        </div>
                        <div class="submitDiv verifyRandom">
                            <el-button type="success" round @click="注册2()" style="width:180px; margin-left:100px;">立即注册</el-button>
                        </div>
                        <div class="reg_bottom"></div>
                    </span>
                </div>
            </div>

        </div>

        <Fotter />
    </div>
</template>

<style scoped>
.验证码地址 img {
    width: 70px;
    height: 30px;
    /* position: absolute;
    left: 1100px;
    top: 55px; */
}
.验证码地址2 img {
    height: 26px;
    margin-left: 195px;
    margin-top: 6px;
}
.yz_inp {
    position: absolute;
    left: 205px;
    top: 0px;
}
.aaa {
    /* position: absolute;
    left: 700px;
    top: 222px; */
    display: block;
    margin: 40px auto;
    width: 750px;
}

.el-button--small.is-round {
    left: 655px;
    position: absolute;
    top: 20px;
}
#cbox input {
    position: absolute;
    width: 15px !important;
    height: 15px !important;
}
#submitbutton {
    position: absolute;
    left: 207px;
    width: 183px;
}
#register div select {
    background: url(../../assets/lijikaihu/reg_input.png) no-repeat 0px -84px;
    margin: 0px;
    padding: 3px;
    height: 27px;
    width: 184px;
    border: none 0px;
    line-height: 27px;
    vertical-align: middle;
    background-color: transparent;
}
#register {
    position: absolute;
    left: 681px;
    top: 215px;
}
/* form{ line-height:28px; position: absolute; top: 0px; } */
.form label span {
    display: block;
    width: 90px;
    float: left;
    text-align: right;
    padding-right: 15px;
    color: red;
    color: #ffeb3b;
    font-size: 12px;
}
.form h2 {
    font-weight: bold;
    color: #ff0;
    padding-left: 16px;
    background: url(../../assets/lijikaihu/reg_border_top.png) no-repeat 15px
        bottom;
    height: 20px;
    line-height: 15px;
    font-size: 12px;
}
.form div {
    font-size: 12px;
    line-height: 40px;
    height: 40px;
    color: #f8e678;
    border-right: solid 2px #9b836f;
    border-left: solid 2px #9b836f;
    width: 631px;
    margin-left: 15px;
    padding-left: 100px;
    position: relative;
}
.form div ul {
    position: absolute;
    top: -18px;
    left: 340px;
    background: url() no-repeat 15px 29px;
    height: 41px;
    list-style-type: none;
    font-size: 13px;
}
.form div ul li {
    color: #fff;
    line-height: 16px;
    background-color: #f00;
    filter: Alpha(Opacity=70);
    opacity: 0.7;
    border: 2px solid #e7e9c3;
    padding: 3px;
    height: 16px;
}
.form input {
    float: left;
    height: 27px;
    background: url(../../assets/lijikaihu/reg_input.png) no-repeat 0px -84px;
    margin: 0px;
    border: none 0px;
    background-color: transparent;
    padding: 0px 5px 0px 10px;
    vertical-align: middle;
    line-height: 27px;
    margin-top: 6px;
    margin-right: 5px;
}
.form .fltxt {
    display: block;
    float: left;
    font: none;
}

form textarea {
    width: 80%;
    height: 200px;
}
.form .reg_top {
    margin-left: 0px;
    height: 60px;
    background: url() no-repeat;
    width: 764px;
    border: none 0px;
    padding-left: 0px;
}
.form .reg_add {
    margin-left: 0px;
    background: url() no-repeat center center;
    height: 48px;
    padding-top: 7px;
    font-weight: bold;
    padding-left: 280px;
    margin-top: 10px;
    width: 444px;
    margin-bottom: 10px;
    border: none 0px;
}
.form .reg_bottom {
    background: url(../../assets/lijikaihu/reg_border_bottom.png) no-repeat;
    height: 15px;
    border: none 0px;
    width: 735px;
    margin-bottom: 15px;
    padding-left: 0px;
}
.form #register .submitDiv {
    padding-left: 250px;
    width: 481px;
}
.form dl {
    padding-left: 30px;
    color: #c9b2a0;
}
.form dl dd span {
    color: #f8e678;
}
.form .check input {
    background-image: none;
    height: 13px;
    width: 13px;
    margin-right: 10px;
}

.form div.reg_add_top_left {
    float: left;
    width: 48px;
    height: 48px;
    border: 0px;
    margin: 0;
    padding: 0px;
}
.form div.reg_add_top_right {
    float: left;
    width: 300px;
    height: 41px;
    border: 0px;
    margin: 0;
    padding: 0px;
    padding-left: 10px;
    padding-top: 7px;
}

.form .reg_head {
    width: 100%;
    height: 48px;
    padding: 5px;
    background: url() no-repeat center -4px;
    text-align: center;
    border: none;
}
.form .reg_head p.add_title {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding-left: 55px;
    line-height: 48px;
}
.form .reg_desc {
    padding-left: 24px;
    border: none;
    line-height: 24px;
    padding-bottom: 10px;
    height: auto;
}

#publiclinesshua {
    margin: 60px auto 10px auto;
    width: 236px;
    height: 32px;
    line-height: 32px;
    color: #000000;
    background: url(../../assets/beiyongwangzhi/buttonbg.jpg) no-repeat;
    text-align: center;
    font-size: 16px;
}
.hengxian {
    border: 0.5px solid #999;
}
.wangzhi_inp {
    position: absolute;
    margin-left: 787px;
    margin-top: -245px;
    color: #fff;
    font-size: 17px;
}
.wangzhi_inp ul {
    margin-top: 10px;
}
.wangzhi_inp ul li input {
    background: #f000;
    border: 0;
    color: #fff;
}

#hdpublic img {
    width: 100%;
}
.bg {
    width: 100%;
    height: 770px;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
}
#Game-Menual {
    height: auto;
    display: flex;
}
#Game-Menual {
    flex-shrink: 0;
}
#Game-Menual .form {
    width: 100%;
}
#Game-Menual a {
    font-size: 12px;
    display: block;
    height: 33px;
    width: 222px;
    line-height: 33px;
    color: #8f8f8f;
    text-align: center;
    text-decoration: none;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center top;
    margin-bottom: 6px;
}
#Game-Menual a:hover {
    color: #fff;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center bottom;
}
#left_down {
    margin: 0;
    height: 40px;
}
#left_down img {
    display: none;
}
#lineswwbox img {
    margin-left: 221px;
    margin-top: -348px;
}
</style>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
import {
    api_短信注册接口,
    api_普通注册接口,
    api_获取短息验证码
} from "@/api/登录接口.js";
import JSEncrypt from "jsencrypt";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            config: config,
            btnStatus: 0,
            验证码地址: "",
            user: {
                uid: "",
                pwd: "",
                pwd1: "",
                code: "", //文字验证嘛
                sms: "", //短息验证码
                ruid: "" //推荐人id
            },
            定时器: "",
            时间: 0
        };
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
    methods: {
        ...mapActions({
            Online:'Online'
        }),
        //切换注册方式  账号或者短信
        changeStatus() {
            this.btnStatus = this.btnStatus === 0 ? 1 : 0;
        },
        注册() {
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
            api_普通注册接口(obj).then(x => {
                if (x.data.code == 0) {
                    console.log("注册成功");
                    this.getUserInfo().then(() => {
                        // this.$router.push('/my')
                    });
                } else {
                    // this.改变验证码();
                    // console.log(x.data.msg);
                    this.$message({ showClose: true, message: x.data.msg, type: 'error' });
                }
            }).catch(err => {
                // this.改变验证码()
                this.$message({ showClose: true, message: '系统错误稍后再试', type: 'error' });
                console.log("网络异常稍后再试");
            });
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
            api_获取短息验证码({ uid: this.user.uid }).then(x => {
                if (x.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: '验证码已发送，请注意查收',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: x.data.msg,
                        type: 'error'
                    });
                }
            }).catch(err => { });
        },
        注册2() {
            // if (this.isphone) {
                var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!phoneTest.test(this.user.uid)) {
                    this.$message({showClose: true,message: '手机号码格式不正确',type: 'error'});
                    return;
                } else if (!this.user.sms) {
                    this.$message({showClose: true,message: '请输入短信验证码',type: 'error'});
                    return;
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                };
                api_短信注册接口(obj).then(x=>{
                    if (x.data.code == 0) {
                        this.$message({showClose: true,message: '注册成功',type: 'error'});
                        this.Online()
                    } else {
                        this.$message({showClose: true,message: x.data.msg,type: 'error'});
                    }
                }).catch(err => {
                    this.$message({showClose: true,message: '系统错误稍后再试',type: 'error'});
                });
            // } else {
            //     if (!this.user.uid) {
            //         this.$message("请输入用户名");
            //         return;
            //     } else if (!this.user.pwd) {
            //         this.$message("请输入密码");
            //         return;
            //     } else if (!this.user.code) {
            //         this.$message("请输入验证码");
            //         return;
            //     }
            // }
        },
        focus1() {
            if (!this.验证码地址) {
                this.验证码地址 = config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            console.log(111);
            this.验证码地址 = config.api_url + "/Home/Verify?v=" + Math.random();
        }
    }
};
</script>
