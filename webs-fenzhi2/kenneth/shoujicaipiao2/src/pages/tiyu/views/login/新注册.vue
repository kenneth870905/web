<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- mui-action-back -->
            <a @click="返回()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">注册</h1>
            <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="免费试玩()">免费试玩</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="img">
                    <!-- <img :src="config.img_url+'static/image/login_1.png'" alt=""> -->
                    <img :src="config.img_url+'static/pages/tiyu/image/logo_2.png'" alt="">
                </div>
            </div>
            <div class="半圆">
                <div>
                    <can></can>
                </div>
            </div>

            <ul class="输入框">
                <li class="提示2">
                    【特邀嘉宾】需在下方输入手机号注册
                </li>
                <li class="item">
                    <input v-model="user.uid" @focus="focus2($event)" ref="uid" type="text" placeholder="请输入手机号或用户名" @keyup.enter="注册()"/>
                    <i v-if="user.uid" @click="user.uid=''" class="icon iconfont icon-guanbi1"></i>
                    
                </li>
                <li v-if="!isphone" class="item">
                    <input v-model="user.pwd" ref="pwd" @focus="focus2($event)" @keyup.enter="注册()" :type="查看密码 ? 'text' : 'password'" placeholder="请输入密码" />
                    <div class="眼睛">
                        <i @click="查看密码=!查看密码" class="van-icon" :class="查看密码 ? 'van-icon-eye-o' : 'van-icon-closed-eye'"></i>
                    </div>
                    <i v-if="user.pwd" @click="user.pwd=''" class="icon iconfont icon-guanbi1"></i>
                </li>

                <li v-if="!isphone" class="item">
                    <input v-model="user.pwd1" ref="pwd1" @focus="focus2($event)" @keyup.enter="注册()" :type="查看密码1 ? 'text' : 'password'" placeholder="请输入确认密码" />
                    <div class="眼睛">
                        <i @click="查看密码1=!查看密码1" class="van-icon" :class="查看密码1 ? 'van-icon-eye-o' : 'van-icon-closed-eye'"></i>
                    </div>
                    <i v-if="user.pwd1" @click="user.pwd1=''" class="icon iconfont icon-guanbi1"></i>
                </li>

                <li v-if="!isphone && 显示推荐人Id" class="item">
                    <input type="text" :class="{只读:ruid只读}" :readonly="ruid只读" v-model="user.ruid" @focus="focus2($event)" @keyup.enter="注册()" placeholder="请输入推荐人ID（选填）">
                </li>
                <li v-if="!isphone" class="item">
                    <input type="text" v-model="user.code" ref="code" @focus="focus1($event)" @keyup.enter="注册()" placeholder="请输入验证码">
                    <div @click="改变验证码()" class="验证码地址">
                        <img :src="验证码地址">
                    </div>
                </li>
                <li v-if="isphone" class="item">
                    <span class="提示">短信验证</span>
                    <input type="text" @keyup.enter="注册()" @focus="focus2($event)" ref="sms" v-model="user.sms" placeholder="请输入验证码">
                    <div class="btn_1" @click="getSms()">
                        {{时间>0 ? 时间+'s' : '获取短信'}}                        
                    </div>
                </li>
                <li class="同意协议">
                    <van-checkbox v-model="同意协议"></van-checkbox>
                    <span>
                        我已知晓并同意 <span>“开户协议”</span>各项条约
                    </span>
                </li>
                <li>
                    <button class="btn_2 mui-btn mui-btn-danger" @click="注册()">注册</button>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
import {  api_获取短息验证码 , api_登录试玩 , api_短信注册接口 , api_普通注册接口} from "@/api/登录接口.js";

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
            同意协议:true,
            查看密码: false,
            查看密码1:false,
            验证码地址: "",
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            user: {
                uid: "",
                pwd: "",
                code: "",   //文字验证嘛
                sms: "",      //短息验证码
                ruid:"" //推荐人id
            },
            定时器: "",
            时间: 0
        }
    },
    computed: {
        ...mapState({
            config: 'config'
        }),
        isphone(){
            var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid)
        },
        path(){
            return this.$route.path
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
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            getUserInfo:'user/getUserInfo',
            获取消息列表:'私聊/获取消息列表'
        }),
        返回(){
            if(this.path=='/reg'){
                this.$router.push('/')
            }else{
                history.back();
            }
        },
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
                    this.$toast('短信已发送，请注意查收');
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
        注册(){
            if(this.isphone){
                var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if(!phoneTest.test(this.user.uid)){
                    this.$toast('请输入电话号码');
                    return
                }else if(!this.user.sms){
                    this.$refs.sms.focus();
                    this.$toast('请输入验证码');
                    return
                }else if(!this.同意协议){
                    this.$toast('请同意用户开会协议')
                    return
                }

                var obj={
                        uid:this.user.uid,
                        sms:this.user.sms,
                        ruid:this.user.ruid ? this.user.ruid :''
                    }
                this.加载中(true)
                api_短信注册接口(obj).then(x=>{
                    if(x.data.code==0){
                        this.$toast.success('注册成功');
                        this.getUserInfo().then(()=>{
                            this.$router.push('/my')
                        })
                        
                    }else{
                        this.$toast(x.data.msg);
                    }
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false)
                    this.$toast('网络异常稍后再试');
                })
            }else{
                if(!this.user.uid){
                    this.$refs.uid.focus();
                    this.$toast('请输入用户名');
                    return
                }else if(!this.user.pwd){
                    this.$refs.pwd.focus()
                    this.$toast('请输入密码');
                    return
                }else if(!this.user.pwd1){
                    this.$refs.pwd1.focus();
                    this.$toast('请确认密码');
                    return
                }else if(this.user.pwd!=this.user.pwd1){
                    this.$toast('两次密码不一致');
                    return;
                }else if(!this.user.code){
                    this.$refs.code.focus();
                    this.$toast('请输入验证码');
                    return;
                }else if(!this.同意协议){
                    this.$toast('请同意用户开会协议')
                    return
                }
                //加密
                var app = '';
                    if (window.plus) {
                        app = plus.os.name;
                    }
                var layout_encrypt = new JSEncrypt();
                    layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj={
                        uid: this.user.uid,
                        pwd: pwd,
                        code: this.user.code,
                        ruid: this.user.ruid,
                        app:app
                    }

                this.加载中(true)
                api_普通注册接口(obj).then(x=>{
                    if(x.data.code==0){
                        this.$toast.success('注册成功');
                        this.getUserInfo().then(()=>{
                            this.$router.push('/my')
                        })
                        this.获取消息列表();
                    }else{
                        this.改变验证码();
                        this.$toast(x.data.msg);
                    }
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false);
                    this.改变验证码()
                    this.$toast('网络异常稍后再试');
                })

            }
        },
        async 免费试玩(){
            this.加载中(true)
            try {
                var r = await api_登录试玩();
            } catch (error) {
                this.$toast('系统错误,稍后再试!')
                return
            }
            if(r.data.code!=0){
                this.$toast(r.data.msg)
                return
            }
            this.getUserInfo().then(()=>{
                this.加载中(false)
                this.$router.push('/my')
            }).catch(err=>{
                this.加载中(false);
            })
        }
    },
    mounted() {
        this.user.ruid=this.$route.query.code
        this.getUserInfo();
    }, 
}
</script>

<style lang="scss" scoped>


.mui-bar-nav {
    box-shadow: none;
    color: #000;
}
.mui-content {
    // background: #ffffff;
}

.box_1{
    @include bgcolor;
    text-align: center;
    padding: 1px 0px;
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
    padding: _vw(20) _vw(10) _vw(20);
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
        position: relative;
    }
    .提示2{
        // position: absolute;
        // left: 0px;
        // bottom: _vw(-18);
        color: red;
        font-size: _vw(12);
        margin-bottom: 2px;
    }
    input{
        margin: 0px;
        padding: 0px _vw(10);
        border: none;
        height: 100%;
        background: none;
        &.只读{
            background: #efefef;
        }
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
        // background: $color;
        @include bgcolor;
        line-height: _vw(40);
        color: #ffffff;
        text-align: center;
    }
    .btn_2{
        width: 100%;
        height: _vw(40);
        border-radius: _vw(40);
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
    .同意协议{
        display: flex;
        height: _vw(30);
        align-items: center;
        margin: _vw(20) 0px _vw(10) 0px;
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
