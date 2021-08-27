<template>
    <div class="shouLogin">
        <div class="container">

            <div class="shouLogin_img_box" v-if="vuexConfig.showlogo"><img @click="go('/')" :src="vuexConfig.titleImg" alt=""> </div>
            <!-- <div class="shouLogin_img_box" v-if="vuexConfig.showlogo"><img @click="go('/')" :src="dataconfig.titleImg" alt=""> </div> -->

            <el-form :model="user" ref="user" class="shouLogin_input_box">
                <div class="form_box">
                    <el-form-item prop="uid" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                        <el-input placeholder="请输入账号" v-model="user.uid" :clearable="true"  ref="账号"  @keyup.enter.native="submitForm()">
                            <i slot="prefix" class="iconfont icon-zhanghu"></i>
                        </el-input>
                    </el-form-item>
                </div>

                <div class="form_box" v-if="!isPhone">
                    <el-form-item prop="pwd"  :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                        <el-input  type="password" placeholder="请输入密码" v-model="user.pwd" :clearable="true"  ref="密码" @keyup.enter.native="submitForm()">
                            <i slot="prefix" class="iconfont icon-mima"></i>
                        </el-input>
                    </el-form-item>
                </div>

                <div class="yzm_input form_box" v-if="!isPhone">
                    <el-form-item prop="code"   :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                        <el-input placeholder="验证码" v-model="user.code" :clearable="true" @focus="codeFocus()" ref="验证码"  @keyup.enter.native="submitForm()">
                            <img slot="prefix" @click="changeCode()" :src="codeUrl" /> 
                        </el-input>
                    </el-form-item>
                </div>

                <div style="width:150px" class="form_box" v-if="isPhone">
                    <el-form-item>
                        <el-input placeholder="请输入短信验证码" v-model="user.sms" :clearable="true"  @keyup.enter.native="submitForm()"></el-input>
                    </el-form-item>
                </div>

                <div class="form_box" v-if="isPhone">
                    <el-button size="medium" type="danger" @click="getSms()">{{时间>0 ? 时间+'s' : '获取短息验证码'}}</el-button>
                </div>
                
                <div class="form_box">
                    <el-button size="medium" type="danger" @click="submitForm()">登陆</el-button>
                </div>
                <div class="form_box">
                    <router-link to="/register">
                        <el-button size="medium" type="danger">注册</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { api_请求登录 , api_获取短息验证码 , api_短息登录 } from "@/api/请求登录的接口.js";
import JSEncrypt from 'jsencrypt'
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            config: config,
            dataconfig: {
               titleImg:config.titleImg,//title
            },
            codeUrl: "",//页面一刷新不获取 为空
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            定时器: "",
            时间: 0,
            user: {
                uid: "",
                pwd: "",
                code: "",   //文字验证嘛
                sms:""
            },
            rules: {
                uid: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],
              
            }
        }
    },
    computed: {

         ...mapState({
            vuexConfig:'config'
        }),

        isPhone: function () {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid)
        },
    },
    //    mounted(){
    //         this.$nextTick(function(){
    //         this.$refs.账号.focus()
    //         })  
    //     this.focusCode()
    //     },
    methods: {
        focusCode(){
         if(this.user.uid){
             this.$refs.账号.focus()
         }else if(this.user.pwd){
             this.$refs.密码.focus()
            
         }else if(this.user.code){
             this.$refs.验证码.focus()
         }
        },
        ...mapActions({
            'getUserInfo':'getUserInfo'
        }),
       go(url) {
            this.$router.push(url);
        },
        //提交
        submitForm() {

            this.$refs['user'].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        codeFocus() {
            if (!this.codeUrl) {
                this.codeUrl = this.config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        //跟换验证码
        changeCode() {
            this.codeUrl = this.config.api_url + "/Home/Verify?v=" + Math.random();
        },
        login() {
            // console.log(this.isPhone);
            if (this.isPhone) {
                if(!this.user.sms){
                    this.$message('请输入短信验证码');
                    return
                }
                var obj={
                        uid:this.user.uid,
                        sms:this.user.sms
                    }
                api_短息登录(obj).then(x=>{
                    this.getUserInfo()
                    if(x.data.code==0){
                        this.$message.success('登录成功');
                    }else{
                        this.$message(x.data.msg);
                    }
                }).catch(err=>{})
            } else {
                //加密
                var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj = { 
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code
                }
                //  this.$message.success('登录成功');
                api_请求登录(obj).then(x=>{
                    console.log(x)
                    // 这里是获取个人信息
                    this.getUserInfo();
                    // this.设置是否显示登录框(false);
                    if(x.data.code==0){
                      this.getUserInfo()
                        this.$message.success('登录成功');
                    }else{
                        this.$message(x.data.msg);
                    }
                }).catch(err=>{
                    this.changeCode()
                    console.log(err);
                })
            }
        },
        getSms() {
            if (this.时间 != 0) {
                return
            }
            this.时间 = 60
            this.定时器 = setInterval(() => {
                this.时间--
                if (this.时间 <= 0) {
                    clearInterval(this.定时器)
                }
            }, 1000)
            api_获取短息验证码({ 'uid': this.user.uid }).then(x => {
                if(x.data.code==0){
                    this.$message.success('短息已经发送，请注意查收')
                }else{
                    this.$message(x.data.msg);
                }
            }).catch(err => { 
                this.$message('系统错误，稍后再试')
            })
        },

    },
    mounted(){
        this.$nextTick(function(){
            this.$refs.账号.focus()
        })
        this.focusCode()
    },
    watch: {
        isPhone() {
            //移除
            this.$refs['user'].clearValidate();
        }
    },
}
</script>
  <style lang="scss" scoped>
.shouLogin {
    .container {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        .shouLogin_img_box {
            height: 60px;
            img {
                height: 100%;
            }
        }

        .shouLogin_input_box {
            margin-top: 15px;
            display: flex;
            justify-content: flex-end;
            height: 60px;
            .yzm_input {
                width: 150px;
                height: 40px;
                /deep/.el-input__inner {
                    padding-left: 76px !important;
                }
                .el-input__prefix,
                .el-input__suffix {
                    position: relative;
                    width: 30px;
                    img {
                        position: absolute;
                        top: 5px;
                        left: 0px;
                    }
                }
            }

            /deep/ .form_box {
                outline: none !important;
                margin-right: 20px;
                .iconfont {
                    line-height: 40px;
                    font-size: 24px;
                    color: red;
                    // background: red;
                    height: 100%;
                }
                /deep/ .el-input--prefix .el-input__inner {
                    width: 150px !important;
                    outline: none !important;
                    //  border:none !important;
                }
                .el-input.is-active .el-input__inner,
                .el-input__inner:focus {
                    border-color: red !important;
                }
            }
        }
    }
}
</style>
  