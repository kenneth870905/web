<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <button @tap="$router.push('/')" class="mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left"><span class="mui-icon mui-icon-left-nav"></span>首页</button>
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="img">
                    <img :src="config.img_url+'static/pages/tiyu/image/logo_2.png'" alt="">
                </div>
            </div>
            <div class="半圆">
                <div>
                    <can></can>
                </div>
            </div>

            <ul class="输入框">
                <li class="item">
                    <input v-model="user.uid" type="text" ref="uid" placeholder="请输入手机号或用户名" @keyup.enter="登录()"/>
                    <i v-if="user.uid" @click="user.uid=''" class="icon iconfont icon-guanbi1"></i>
                </li>
                <li v-if="!isphone" class="item">
                    <input v-model="user.pwd" ref="pwd" @focus="focus2($event)" @keyup.enter="登录()" :type="查看密码 ? 'text' : 'password'" placeholder="请输入密码" />
                    <div class="眼睛">
                        <i @click="查看密码=!查看密码" class="van-icon" :class="查看密码 ? 'van-icon-eye-o' : 'van-icon-closed-eye'"></i>
                    </div>
                    <i v-if="user.pwd" @click="user.pwd=''" class="icon iconfont icon-guanbi1"></i>
                </li>
                <li v-if="!isphone" class="item">
                    <input type="text" v-model="user.code" ref="code" @focus="focus1($event)" @keyup.enter="登录()" placeholder="请输入验证码">
                    <div @click="改变验证码()" class="验证码地址">
                        <img :src="验证码地址">
                    </div>
                </li>
                <li v-if="isphone" class="item">
                    <span class="提示">短信验证</span>
                    <input type="text" @keyup.enter="登录()" ref="sms" v-model="user.sms" placeholder="请输入验证码">
                    <div class="btn_1" @click="getSms()">
                        {{时间>0 ? 时间+'s' : '获取短信'}}
                    </div>
                </li>
                <li>
                    <button class="btn_2 mui-btn mui-btn-danger" @click="登录()">登录</button>
                </li>
                <li class="item2">
                    <span @click="$router.push('/register')">快速注册</span>
                    <span @click="免费试玩()">免费试玩</span>
                    <span @click="$router.push('/retrieve')">忘记密码</span>
                </li>
                <!-- <div>{{num}}</div> -->
                <!-- <div @click="返回()">返回测试</div>
                <div @click="普通返回()">普通返回</div> -->
            </ul>

        </div>

    </div>
</template>

<script>

import { api_密码登录 , api_获取短息验证码 , api_短息登录 , api_登录试玩} from "@/api/登录接口.js";

import btn from '@/components/btn.vue';
import can from '@/components/半圆.vue'
import { mapState, mapActions, mapMutations } from "vuex";
import JSEncrypt from 'jsencrypt'

export default {
    name: "",
    components: {
        btn,
        can
    },
    data() {
        return {
            查看密码: false,
            验证码地址: "",
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            user: {
                uid: "",
                pwd: "",
                code: "",   //文字验证嘛
                sms: ""      //短息验证码
            },
            定时器: "",
            时间: 0,
            // num:window.history.length
        }
    },
    computed: {
        ...mapState({
            config: 'config'
        }),
        isphone(){
            var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid)
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            getUserInfo:'user/getUserInfo',
            获取消息列表:"私聊/获取消息列表"
        }),
        getSms(){
            if (this.时间!=0){
                return
            }
            this.时间=60;
            this.定时器=setInterval(() => {
                this.时间--;
                if(this.时间<=0){
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_获取短息验证码({'uid':this.user.uid}).then(x=>{
                if(x.data.code==0){
                    this.$toast('短信发送成功');
                }else{
                    this.$toast(x.data.msg);
                }
            }).catch(err=>{})
        },
        focus2(e){
            setTimeout(() => {
                e.target.scrollIntoView({'behavior':'smooth',block:'center'})             
            }, 1000);
        },
        focus1(e) {
            // e.target.scrollIntoView({'behavior':'smooth',block:'center'})       
            setTimeout(() => {
                e.target.scrollIntoView({'behavior':'smooth',block:'center'})             
            }, 1000);
            if (!this.验证码地址) {
                this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码(){
            this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
        },
        登录(){
            if(this.isphone){
                var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if(!phoneTest.test(this.user.uid)){
                    this.$toast('请输入电话号码');
                    this.$refs.uid.focus()
                    return
                }else if(!this.user.sms){
                    this.$refs.msm.focus();
                    this.$toast('请输入验证码');
                    return
                }
                var obj={
                        uid:this.user.uid,
                        sms:this.user.sms
                    }

                this.加载中(true);
                api_短息登录(obj).then(x=>{
                    if(x.data.code==0){
                        this.$toast.success('登录成功');
                        this.getUserInfo().then(()=>{
                            this.返回()
                        })
                        this.获取消息列表()
                    }else{
                        this.$toast(x.data.msg);
                    }
                    this.加载中(false);
                }).catch(err=>{
                    console.log(JSON.stringify(err))
                    this.加载中(false);
                    this.改变验证码()
                    this.$toast('网络异常稍后再试');
                })
            }else{
                if(!this.user.uid){
                    this.$refs.uid.focus()
                    this.$toast('请输入用户名');
                    return
                }else if(!this.user.pwd){
                    this.$refs.pwd.focus()
                    this.$toast('请输入密码');
                    return
                }else if(!this.user.code){
                    this.$refs.code.focus();
                    this.$toast('请输入验证码');
                    return
                }
                //加密
                var layout_encrypt = new JSEncrypt();
                    layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj={
                        uid: this.user.uid,
                        pwd: pwd,
                        code: this.user.code
                    }
                this.加载中(true);

                api_密码登录(obj).then(x=>{
                    console.log(x)
                    if(x.data.code==0){
                        this.getUserInfo().then(()=>{
                            this.$toast.success('登录成功');
                            this.返回()
                            this.加载中(false);
                            this.获取消息列表()
                        })
                    }else{
                        this.改变验证码();
                        this.$toast(x.data.msg);
                        this.加载中(false);
                    }
                }).catch(err=>{
                    console.log(err)
                    this.加载中(false);
                    this.改变验证码()
                    this.$toast('网络异常稍后再试');
                })
            }
        },
        async 免费试玩(){
            try {
                var r = await api_登录试玩();            
            } catch (error) {
                this.$toast('系统错误，稍后再试');
                return
            }
            if(r.data.code!=0){
                this.$toast(r.data.msg);
                return
            }
            this.getUserInfo().then(()=>{
                this.$router.push('/my')
            })
        },
        返回(){
            if(sessionStorage.sjcpPath==1){
                history.back()
            }else{
                this.$router.push('/')
            }
        },
        // 普通返回(){
        //     history.back()
        // }
    },
    mounted() {
        this.getUserInfo();

        // if(window.history.length==1 || window.history.length==2){
        //     history.replaceState(null,null,'#/');
        //     window.history.pushState(null,null,'#'+to.fullPath);
        //     window.history.forward();
        //     console.log('添加一条访问历史')
        //     alert('添加一条访问历史')
        // }
    }, 
}
</script>

<style lang="scss" scoped>


.mui-bar-nav {
    box-shadow: none;
    color: #000;
}

.box_1{
    @include bgcolor;
    text-align: center;
    padding: 1px 0px;
    min-height: _vw(70);
    .login{
        height: _vw(55);
        img{
            height: 100%;
        }
    }
    .img{
        // width: _vw(190);
        width: _vw(250);
        margin: _vw(40) auto _vw(20);
        // margin: 0px auto _vw(20);
        img{
            width: 100%;
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

.输入框{
    position: relative;
    z-index: 1;
    width: 85%;
    margin: 0px auto;
    box-shadow: 0 0 11px 1px #dfdfdf;
    border-radius: 10px;
    padding: _vw(20) _vw(10);
    background: #ffffff;
    font-size: _vw(14);
    .item{
        display: flex;
        align-items: center;
        height: _vw(40);
        margin: 0px 0px _vw(20);
        border: 1px solid #cccccc;
        border-radius: _vw(40);
        overflow: hidden;
    }
    input{
        margin: 0px;
        padding: 0px _vw(10);
        border: none;
        height: 100%;
        background: none;
    }
    .眼睛{
        font-size: _vw(20);
        margin: 0px _vw(10) 0px 0px;
    }
    .提示{
        white-space: nowrap;
        margin: 0px 0px 0px _vw(10);
    }
    .btn_1{
        white-space: nowrap;
        min-width: _vw(75);
        padding: 0px _vw(10);
        background: $color;
        line-height: _vw(40);
        color: #ffffff;
    }
    .btn_2{
        width: 100%;
        height: _vw(40);
        border-radius: _vw(40);
        margin-bottom: _vw(20);
        @include bgcolor;
        @include border-full(1px);
    }
    .icon-guanbi1{
        // color: red;
        @include textcolor;
        font-size: _vw(20);
        margin: 0px _vw(10) 0px 0px;
    }
    .验证码地址{
        width: _vw(75);
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
        }
    }
    .item2{
        display: flex;
        font-size: _vw(13);
        color: #666;
        span:nth-child(2){
            flex-grow: 1;
            margin: 0px 0px 0px 5px;
            padding: 0px 0px 0px 5px;
            border-left: 1px solid #666; 
        }
    }
}

</style>
