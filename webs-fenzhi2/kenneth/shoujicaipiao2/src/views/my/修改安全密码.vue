<template>
    <div>
         <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改提款密码</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="list">
                <van-cell-group>
                    <van-field
                        readonly
                        v-model="pwd"
                        label="当前密码"
                        placeholder="请输入4位数字"
                        maxlength="4"
                        @focus="显示键盘('pwd')"
                        :type="type1 ? 'password' : 'text'"
                        :right-icon="type1 ? 'closed-eye' : 'eye-o'"
                        @click-right-icon="type1=!type1"
                    />
                    <!-- @touchstart.native.stop="显示键盘('pwd')" -->
                    <van-field
                        readonly
                        v-model="newPwd"
                        label="新密码"
                        placeholder="请输入4位数字"
                        maxlength="4"
                        @focus="显示键盘('newPwd')"
                        :type="type2 ? 'password' : 'text'"
                        :right-icon="type2 ? 'closed-eye' : 'eye-o'"
                        @click-right-icon="type2=!type2"
                    />
                    <van-field
                        readonly
                        v-model="newPwd_2"
                        label="确认密码"
                        placeholder="请确认密码"
                        maxlength="4"
                        @focus="显示键盘('newPwd_2')"
                        :type="type3 ? 'password' : 'text'"
                        :right-icon="type3 ? 'closed-eye' : 'eye-o'"
                        @click-right-icon="type3=!type3"
                    />
                </van-cell-group>
            </div>

            <btn @click.native="提交()"/>

            <van-number-keyboard
                close-button-text="完成"
                @input="onInput"
                @delete="onDelete"
                :show="show"
                :maxlength="4"
                @blur="show = false"
            />

        </div>
    </div>
</template>

<script>

import JSEncrypt from 'jsencrypt'
import { api_修改安全密码 } from "@/api/个人资料.js";

import btn from '@/components/btn.vue';
import { mapState } from 'vuex';

export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            type:'',
            show:false,

            type1:true,
            type2:true,
            type3:true,

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
        显示键盘(type){
            this.type=type
            if(this.show==false){
                this.show=true;
            }
        },
        onInput(key){
            console.log(key);
            this[this.type] = (this[this.type]+key).slice(0, 4);
        },
        onDelete(){
            console.log('删除');
            this[this.type] = this[this.type].substring(0,this[this.type].length-1)
            // this.value = this.value.slice(0, this.value.length - 1);
        },
        提交(){
            if(!this.pwd){
                this.$toast('请输入旧密码');
                return
            }else if(this.pwd.length!=4){
                this.$toast('旧密码长度错误');
                return
            }else if(!this.newPwd){
                this.$toast('请输入新密码')
                return
            }else if(this.newPwd.length!=4){
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

            api_修改安全密码(obj).then(x=>{
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

