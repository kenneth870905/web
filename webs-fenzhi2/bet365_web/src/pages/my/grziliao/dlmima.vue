<template>
   <div>
      <van-nav-bar title="修改登录密码" left-arrow @click-left="onClickLeft" />
      <van-cell-group>
                <van-field
                    v-model="pwd"
                    label="当前密码"
                    type="textarea"
                    placeholder="长度6-20"
                    rows="1"
                    autosize
                />
                <van-field
                    v-model="newPwd"
                    label="新密码"
                    type="textarea"
                    placeholder="长度6-20"
                    rows="1"
                    autosize
                />
                <van-field
                    v-model="newPwd_2"
                    label="确认密码"
                    type="textarea"
                    placeholder="请确认密码"
                    rows="1"
                    autosize
                />
            </van-cell-group>
             <button class="btn" @click="提交()">确定</button>
  </div>
</template>

<script>
import { api_修改登录密码 } from "@/api/个人资料.js";
import JSEncrypt from 'jsencrypt'
import { mapState } from 'vuex';
export default {
    data(){
        return{
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
    methods:{
         onClickLeft() {
            this.$router.go(-1);
        },
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
    }
}
</script>

<style>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
.btn {
    width: 93%;
    height: 40px;
    background: #213862;
    border-radius: 20px;
    color: white;
    margin: 12px;
    margin-top: 30px;
}
</style>