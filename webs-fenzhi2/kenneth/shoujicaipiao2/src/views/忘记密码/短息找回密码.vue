<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">手机找回密码</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <van-cell-group class="list">
                <van-field
                    v-model="username"
                    clearable
                    placeholder="请输入用户名"/>
                <van-field
                    v-model="phone"
                    clearable
                    placeholder="请输入用户名"/>
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证"
                    placeholder="请输入验证码">
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
                <van-field
                    v-model="password"
                    :type="查看密码 ? 'text' : 'password'"
                    clearable
                    :right-icon="查看密码 ? 'eye-o' : 'closed-eye'"
                    placeholder="新密码"
                    @click-right-icon="查看密码=!查看密码"/>
                <van-field
                v-model="password"
                :type="查看密码 ? 'text' : 'password'"
                clearable
                :right-icon="查看密码 ? 'eye-o' : 'closed-eye'"
                placeholder="重复密码"
                @click-right-icon="查看密码=!查看密码"/>
            </van-cell-group>
            <btn />
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            username:"",
            sms:"",
            phone:"",
            password:"",
            查看密码:false
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    margin: _vw(5) 0px 0px;
    /deep/ input{
        margin: 0px ;
        padding: 0px;
        height: auto;
        border: none;
        line-height: 24px;
    }
}
</style>
