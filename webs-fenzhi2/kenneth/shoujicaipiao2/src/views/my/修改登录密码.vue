<template>
    <div>
         <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改登录密码</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="list">
                <van-cell-group>
                    <van-field
                        v-model="pwd"
                        label="当前密码"
                        placeholder="长度6-20"
                        type="password"
                    />
                    <van-field
                        type="password"
                        v-model="newPwd"
                        label="新密码"
                        placeholder="长度6-20"
                    />
                    <van-field
                        v-model="newPwd_2"
                        label="确认密码"
                        type="password"
                        placeholder="请确认密码"
                    />
                </van-cell-group>
            </div>
            <btn @click.native="提交()"/>
        </div>
    </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'
import { api_修改登录密码 } from "@/api/个人资料.js";

import btn from '@/components/btn.vue';
import { mapState } from 'vuex';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            pwd:"",
            newPwd:'',
            newPwd_2:""
        }
    },
    computed: {
        ...mapState({
            publicKey:'publicKey'
        }),
    },
    methods: {
        提交(){
            if(!this.pwd){
                this.$toast('请输入旧密码');
                return
            }else if(this.pwd.length<6 || this.pwd.length>20){
                this.$toast('旧密码长度错误');
                return
            }else if(!this.newPwd){
                this.$toast('请输入新密码')
                return
            }else if(this.newPwd.length<6 || this.newPwd.length>20){
                this.$toast('新密码长度有误')
                return
            }else if(this.newPwd!=this.newPwd_2){
                this.$toast('两次密码不一致')
                return
            }
            var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(this.publicKey);
            var obj={
                    pwd: layout_encrypt.encrypt(this.pwd) ,
                    newPwd: layout_encrypt.encrypt(this.newPwd) 
                }

            api_修改登录密码(obj).then(x=>{
                if(x.data.code==0){
                    this.$toast('设置成功')
                }else{
                    this.$toast(x.data.msg)     
                }
            }).catch(err=>{
                this.$toast('系统错误稍后再试')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
   /deep/ .van-field {
       input{
            padding: 0px;
            margin: 0px;
            border: none;
            height: auto;
        }
    }
}
</style>

