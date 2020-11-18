// var api_url = 'http://10.10.27.150:3001/api'
var api_url = ''

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

// 宽度 400
// 不需要头部url参数 ?nh=1 整体高度305 nf=1 去除底部
// 需要头部整体高度 360
// 没有头部高度
// iframe 
// window.login={
//     toRegister:function(){
//         console.log('跳转注册')
//     },
//     loginSuccessfully:function(){
//         console.log('登录成功')
//     },
//     close:function(){
//         console.log('关闭弹窗')
//     },
//     setHeight:function(h){
//         设置值高度
//     }
// }
// window.open
// window.addEventListener('storage', (e) => {
//     console.log(e)
// })

var isIframe=false
if (self.frameElement && self.frameElement.tagName == "IFRAME") {
    isIframe = TextTrackCueList
}else{
    var obj = {toRegister:0,loginSuccessfully:0,setHeight:0}
    sessionStorage.pcLogin = JSON.stringify(obj)
}

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
new Vue({
    el:"#vue",
    data() {
        return {
            显示登录框:true,
            publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB',
            codeUrl: '',
            user: {
                uid: '',
                pwd: '',
                code: '',       // 文字验证嘛
                sms: ''         // 短息验证码
            },
            定时器: '',
            时间: 0,
            noHeader:getQueryVariable('nh'),
            noFooter:getQueryVariable('nf'),
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
            },
            isIframe:isIframe,
            visibilityState:[]
        }
    },
    computed: {
        isPhone:function() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/
            return phoneTest.test(this.user.uid)
        }
    },
    methods: {
        close:function(){
            if(this.isIframe){
                window.parent.window.login.close()
            }else{
                window.close()
            }
        },
        getSms:function() {
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
            var this2 = this;
            $.post(api_url+"/Home/GetSmsCode", { 'uid': this.user.uid },function (data, textStatus, jqXHR) {
                    console.log(data)
                    if(data.code==0){
                        this2.$message({
                            duration:1500,
                            showClose:true,
                            message:"验证码已发送，请注意查收",
                            type: 'success'
                        })
                    }else{
                        this2.$message({
                            duration:1500,
                            showClose:true,
                            message:data.msg,
                            type: 'error'
                        })
                    }
                }
            ).catch(function(err){
                console.log(err)
                this2.$message({
                    duration:1500,
                    showClose:true,
                    message:'系统错误稍后再试',
                    type: 'error'
                })
            })
        },
        跳转注册:function() {
            if(this.isIframe){
                // alert('点击了注册')
                window.parent.window.login.toRegister()
            }else{
                var obj ={}
                try {
                    obj = JSON.parse(sessionStorage.pcLogin)
                } catch (error) {}
                    obj.toRegister = new Date();
                sessionStorage.pcLogin = JSON.stringify(obj)
            }
        },
        codeFocus:function() {
            if (!this.codeUrl) {
                this.codeUrl = api_url + '/Home/Verify?v=' + Math.random()
            }
        },
        // 跟换验证码
        changeCode:function() {
            this.codeUrl = api_url + '/Home/Verify?v=' + Math.random()
        },
        handleClose:function() {
            this.设置是否显示登录框(false)
        },
         // 提交
        submitForm:function() {
            var this2 = this
            this.$refs['user'].validate(function(valid){
                if (valid) {
                    this2.login()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        登录成功:function(){
            if(this.isIframe){
                window.parent.window.login.loginSuccessfully()
            }else{
                var obj = {}
                try {
                    obj = JSON.parse(sessionStorage.pcLogin)
                } catch (error) {}
                    obj.loginSuccessfully=new Date()
                sessionStorage.pcLogin = JSON.stringify(obj)
                setTimeout(() => {
                    window.close()
                }, 1500);
            }
        },
        login:function() {
            var this2=this
            if (this.isPhone) {
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                }
                $.post(api_url+"/Home/SmsLogin", obj,function (data, textStatus, jqXHR) {
                    if(data.code==0){
                        this2.$message({
                            duration:1500,
                            showClose:true,
                            message:'登录成功',
                            type: 'success'
                        })
                        this2.登录成功()
                    }else{
                        this2.$message({
                            duration:1500,
                            showClose:true,
                            message:data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    this2.$message({
                        duration:1500,
                        showClose:true,
                        message:'系统错误，稍后再试',
                        type: 'error'
                    })
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
                $.ajax({
                    type: "post",
                    url: api_url+"/Home/LoginReq",
                    data: obj,
                    success: function(x){
                        if(x.code==0){
                            this2.user={uid:"",pwd:"",code:"",sms:""}
                            this2.codeUrl = '';
                            this2.$message({
                                duration:1500,
                                showClose:true,
                                message:'登录成功',
                                type: 'success'
                            })
                            this2.登录成功()
                        }else{
                            this2.$message({
                                duration:1500,
                                showClose:true,
                                message:x.msg,
                                type: 'error'
                            })
                            this2.changeCode()
                        }
                    },
                    error:function(err){
                        this2.changeCode()
                        this2.$message({
                            duration:1500,
                            showClose:true,
                            message:'系统错误，稍后再试',
                            type: 'error'
                        })
                    }
                });
            }
        }
    },
    mounted:function() {
        var this2 = this
        this.$nextTick(function(){
            console.log('页面加载完成2')
            var hh=document.querySelector('#vue').clientHeight
            if(this.isIframe){
                window.parent.window.login.setHeight(hh)
            }else{
                var obj = {}
                try {
                    obj = JSON.parse(sessionStorage.pcLogin)
                } catch (error) {}
                    obj.setHeight = hh
                sessionStorage.pcLogin = JSON.stringify(obj);
            }
        })
        if(!this.isIframe){
            document.addEventListener("visibilitychange", function() {
                console.log( document.visibilityState );
                this2.visibilityState.push(document.visibilityState)
            });
        }
    },
    watch: {
        isPhone:function() {
            // 移除
            this.$refs['user'].clearValidate()
            this.$nextTick(function(){
                var h = document.querySelector('#vue').clientHeight
                if(this.isIframe){
                    window.parent.window.login.setHeight(hh)
                }else{
                    var obj = {}
                    try {
                        obj = JSON.parse(sessionStorage.pcLogin)
                    } catch (error) {}
                        obj.setHeight = hh
                    sessionStorage.pcLogin = JSON.stringify(obj);
                }
            })
        }
    }
})