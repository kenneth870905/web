<template>
    <div>
        <el-dialog title="用户登录" width="400px" :visible.sync="显示登录框" :before-close="handleClose" :close-on-click-modal="false">
            <!-- <el-form :model="user" :rules="rules" ref="user"> -->
            <el-form :model="user" ref="user">
                <el-form-item prop="uid" :rules="[{ required: true, message: '请输入手机号码或用户名', trigger: 'blur' }]">
                    <el-input v-model="user.uid" placeholder="请输入手机号码或用户名" :clearable="true" @keyup.enter.native="submitForm()"></el-input>
                </el-form-item>
                <el-form-item prop="pwd" v-if="!isPhone" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                    <el-input type="password" v-model="user.pwd" placeholder="请输入密码" @keydown.enter.native="submitForm()"></el-input>
                </el-form-item>
                <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" v-if="!isPhone">
                    <div class="验证码">
                        <el-input v-model="user.code" placeholder="验证码" @focus="codeFocus()" @keydown.enter.native="submitForm()"></el-input>
                        <img @click="changeCode()" :src="codeUrl" alt="" srcset="">
                    </div>
                </el-form-item>
                <el-form-item label="" v-if="isPhone" prop="sms" :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur' }]">
                    <div class="phone">
                        <el-input v-model="user.sms" placeholder="短息验证码" @keydown.enter.native="submitForm()"></el-input>
                        <el-button type="primary" @click="getSms()">
                            {{时间>0 ? 时间+'s' : '获取短息验证码'}}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" style="width:100%" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
                <div class="text-right">
                    还没有账号？
                    <a href="javascript:;" class="红色字体" @click="跳转注册()">
                        点击注册
                    </a>

                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { api_用户登录, api_获取短息验证码, api_短息登录 } from '@/api/登录接口.js'
import { mapGetters, mapActions , mapState , mapMutations} from 'vuex'
import JSEncrypt from 'jsencrypt'
export default {
    name: '',
    data() {
        return {
            config: config,
            domains: [{
                value: ''
            }],
            publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB',
            codeUrl: '',
            user: {
                uid: '',
                pwd: '',
                code: '', // 文字验证嘛
                sms: '' // 短息验证码
            },
            定时器: '',
            时间: 0,
            rules: {
                uid: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                sms: [
                    { required: true, message: '请输入短信验证', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            显示登录框: '显示登录框'
        }),
        isPhone: function () {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/
            return phoneTest.test(this.user.uid)
        }
    },
    methods: {
        ...mapMutations({
            设置state:'设置state'
        }),
        ...mapActions({
            加载中:'加载中',
            成功提示:"成功提示",
            失败提示:"失败提示",
            getUserInfo: 'getUserInfo',
            获取私聊消息列表:"私聊/获取消息列表",
            获取房间人数:'聊天室/获取房间人数',
            获取人员列表:'聊天室/获取人员列表',
            获取个人资料:'获取个人资料'
        }),
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
            this.加载中(true)
            api_获取短息验证码({ 'uid': this.user.uid }).then(x => {
                this.加载中(false)
                this.成功提示('短息已经发送')
            }).catch(err => {
                this.加载中(false)
                this.失败提示('系统错误稍后再试')
            })
        },
        跳转注册() {
            this.$router.push('/register')
            this.设置state(['显示登录框',false])
        },
        codeFocus() {
            if (!this.codeUrl) {
                this.codeUrl = this.config.api_url + '/Home/Verify?v=' + Math.random()
            }
        },
        // 跟换验证码
        changeCode() {
            this.codeUrl = this.config.api_url + '/Home/Verify?v=' + Math.random()
        },
        handleClose() {
            this.设置state(['显示登录框',false])
        },
        // 提交
        submitForm() {
            this.$refs['user'].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    return false
                }
            })
        },
        login() {
            if (this.isPhone) {
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                }
                this.加载中(true)
                api_短息登录(obj).then(x => {
                    this.getUserInfo()
                    if(x.data.code==0){
                        this.设置state(['显示登录框',false])
                        this.成功提示('登录成功')
                        this.获取私聊消息列表();
                        this.获取房间人数();
                        this.获取人员列表();
                        this.获取个人资料()
                        this.user={
                                uid: '',
                                pwd: '',
                                code: '', 
                                sms: ''
                            }
                        this.codeUrl=''
                    }else{
                        this.失败提示(x.data.msg)
                    }
                    this.加载中(false)
                }).catch(err => {
                    this.失败提示('系统错误稍后再试')
                    this.加载中(false)
                })
            } else {
                // 加密
                var layout_encrypt = new JSEncrypt()
                layout_encrypt.setPublicKey(this.publicKey)
                var pwd = layout_encrypt.encrypt(this.user.pwd)
                var obj = {
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code
                }
                this.加载中(true)
                api_用户登录(obj).then(x => {
                    this.getUserInfo()
                    if(x.data.code==0){
                        this.成功提示('登录成功')
                        this.获取房间人数();
                        this.获取人员列表();
                        this.设置state(['显示登录框',false])
                        this.获取私聊消息列表();
                        this.获取个人资料();
                        this.user={
                                uid: '',
                                pwd: '',
                                code: '', // 文字验证嘛
                                sms: '' // 短息验证码
                            }
                        this.codeUrl='';
                    }else{
                        this.失败提示(x.data.msg)
                        this.changeCode()
                    }
                    this.加载中(false)
                }).catch(err => {
                    this.changeCode()
                    this.加载中(false)
                    console.log(err)
                    this.失败提示('系统错误稍后再试')
                })
            }
        }
    },
    mounted() {

    },
    watch: {
        isPhone() {
            // 移除
            this.$refs['user'].clearValidate()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
}
.验证码 {
    display: flex;
    /deep/ .el-input {
        width: 200px;
    }
}
.phone {
    display: flex;
    /deep/ .el-input {
        width: 150px;
        margin: 0px 10px 0px 0px;
    }
}
.text-right {
    text-align: right;
}
.红色字体 {
    color: red;
}
</style>
