<template>
    <div>
        <van-nav-bar title="提现密码" :z-index="10" left-arrow @click-left="$back()"/>

        <div class="content">
            <van-cell-group>
                      <van-field required v-model="obj.newPassword" label="提现密码" :type="type.password2 ? 'password' : 'text'" :right-icon="type.password2 ? 'closed-eye' : 'eye'"  @click-right-icon="type.password2=!type.password2" placeholder="请输入提现密码" />
                    <van-field required v-model="obj.confimPassword" label="确认密码" :type="type.password3 ? 'password' : 'text'" :right-icon="type.password3 ? 'closed-eye' : 'eye'" @click-right-icon="type.password3=!type.password3" placeholder="请再次确认密码" />
                  <van-cell-group>
                        <van-field
                            v-model="obj.mobile"
                            center
                            clearable
                            required
                            label="手机号"
                            placeholder="请输入手机号"
                        >
                            <van-button slot="button" size="small" type="primary" @click="getSms()">
                                   <!-- 发送验证码 -->
                                   {{时间>0 ? 时间+'s' : '获取短信'}}
                                </van-button>
                        </van-field>
                    </van-cell-group>
                <van-field required v-model="obj.code" label="手机验证码"  placeholder="请输入手机验证码" />                               
            </van-cell-group>
            <div class="提示">
                温馨提示: 密码必须大于等于6个字符，请不要设置过于简单的密码，如：123456！
            </div>
            <btn name="确定" @click.native="提交()"/>
        </div>

        
    </div>
</template>

<script>
import {api_修改提款密,api_修改提款密_发送验证码} from "@/api/用户.js";
import btn from '@/components/btn.vue';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
             时间: 0,
            type:{
                // password1:true,
                password2:true,
                password3:true,
                mobile:true,
                // code:true,
            },
            obj:{
                // oldPassword:"",
                newPassword:'',//新密码
                confimPassword:"",//确认新密码
                mobile:"",//电话
                code:""//短信验证码
            }
        }
    },
    methods: {
          getSms() {//点击获取短信触发的函数
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            console.log(this.obj.mobile)
            if (!phoneTest.test(this.obj.mobile)) {
                this.$toast('请输入正确电话号码')
                return
            } else if (this.时间 != 0) {
                return
            }
            this.时间 = 60;
            this.定时器 = setInterval(() => {
                this.时间--;
                if (this.时间 <= 0) {
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_修改提款密_发送验证码(this.obj.mobile).then(x => {
                if (x.data.code == 200) {
                this.$toast("短信已发送，请注意查收")
                } else {
                this.$toast(x.data.msg)
                }
            }).catch(err => { })
        },


        提交(){
           if(!this.obj.newPassword){
                this.$toast('请输入提现密码');
                return
            }else if(this.obj.newPassword.length<6){
                this.$toast('密码长度太短');
                return
            }else if(this.obj.confimPassword!=this.obj.newPassword){
                this.$toast('两次密码不一致');
                return
            }
            var obj={
                code:this.obj.code,
                mobile: this.obj.mobile,
                moneyPwd :this.obj.confimPassword,
            }
            api_修改提款密(obj).then(x=>{
                if(x.data.code==200){
                      this.$message.success(x.data.msg);
                } else{
                      this.$message.success(x.data.msg);
                }
                console.log(x.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    margin: _vw(5) 0px 0px;
}
.提示{
    padding:_vw(15) _vw(10);
    font-size: _vw(12);
    color: red;
}
.list{
    margin: _vw(10) 0px 0px;
    padding: _vw(0) _vw(10);
    background: #ffffff;
    font-size: _vw(13);
    li{
        display: flex;
        align-items: center;
        height: _vw(46);
        border-bottom: 1px solid #cccccc;
        &:last-child{
            border-bottom: none;
        }
        label{
            width: _vw(80);
            flex-shrink: 0;
        }
        input{
            width: 100%;
            border: none;
        }
        .yzmbtn{
            white-space: nowrap;
            height: 100%;
            padding: 0px _vw(15);
            background: none;
            color: red;
            border-right: none;
            border-top: none;
            border-bottom: none;
        }
    }
}
</style>
