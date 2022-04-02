<template>
    <div class="login">
        <a-form ref="form" :model="user" @finishFailed="onFinishFailed" @onFinish="onFinish" autocomplete="off">
            <h3>系统登陆</h3>
            <a-form-item name="name" :rules="rules.name">
                <a-input v-model:value="user.name" placeholder="请输入用户名">
                    <template #prefix>
                        <user-outlined type="user" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="rules.password">
                <a-input type="password" @keyup.enter="sub()" v-model:value="user.password" placeholder="请输入密码">
                    <template #prefix>
                        <lock-outlined />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="sub()">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
    // icon图标
    import { UserOutlined , LockOutlined } from "@ant-design/icons-vue";

    import { computed , reactive, ref , getCurrentInstance } from 'vue'
    import { login } from "../api/api.js";
    import { useRouter } from "vue-router";
    import { useStore } from 'vuex'

    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const store = useStore()

    let user = reactive({
        name: "",
        password: ""
    })

    let onFinishFailed = ()=>{
        console.log('onFinishFailed')
    }
    let form = ref(null)
    let rules = {
        name:[
            { required: true, message: '请输入用户名' }
        ],
        password:[
            { required: true, message: '请输入密码' }
        ]
    }

    let onFinish=()=>{
        console.log('onFinish')
    }
    let userInfo = computed(()=>store.state.user.userInfo)
    // console.log(store.state.user.userInfo)
    let sub=()=>{
        form.value.validate().then(res=>{
            login(user).then(res=>{
                store.commit('user/setUserInfo',res.data)
                router.push('/')
            })
        }).catch(err=>{})
    }
        
</script>

<style lang="scss" scoped>
.login {
    height: 100%;
    display: flex;
    background: rgba($color: #2d3a4b, $alpha: 0.9);
    align-items: center;
    justify-content: center;
}
.ant-form{
    width: 350px;
    padding: 20px ;
    box-shadow: 0px 0px 3px 0px #fff;
    border-radius: 10px;
    background: #2d3a4b;
    .ant-btn{
        width: 100%;
    }
}
h3{
    font-size: 26px;
    text-align: center;
    margin: 0px 0px 26px;
    color: #fff;
}
</style>
