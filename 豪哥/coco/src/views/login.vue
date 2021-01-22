<template>
    <div class="login">
        <img class="bg" src="static/image/bg.png" alt="" srcset="">

        <div class="box-1">
            <input type="text" class="name" :class="{active:登录信息.name}" v-model="登录信息.name">
            <input type="password" @keyup.enter="logon()" class="password" :class="{active:登录信息.password}" v-model="登录信息.password">
            <button class="btn-1" @click="logon()">Logon</button>
        </div>
        <!-- <div class="box-1">
            <div class="left">
                <img src="~@/assets/login2.jpg" alt srcset />
            </div>
            <Form ref="user" class="right"  :model="登录信息" :rules="ruleValidate">
                <div class="title-1">账号登录</div>
                <FormItem prop="name">
                    <Input size="large"  @on-keyup.enter="handleSubmit()" prefix="md-person" v-model="登录信息.name" placeholder="账号"></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input size="large"  @on-keyup.enter="handleSubmit()" autocomplete="new-password" prefix="md-unlock" type="password" password v-model="登录信息.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="登录信息.记住密码" label="Eat">记住密码</Checkbox>
                </FormItem>
                <FormItem>
                    <Button size="large" style="width:100%" type="primary" @click="handleSubmit()">登录</Button>
                </FormItem>
                <FormItem class="zhuce">
                    <span @click="$router.push('/register')">注册新用户</span>
                </FormItem>
            </Form>
        </div> -->

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            // user: {
            //     name: '',
            //     password:""
            // },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        ...mapState({
            userInfo:"userInfo",
            登录信息:"登录信息"
        })
    },
    methods: {
        ...mapMutations({
            setItem:'setItem'
        }),
        handleSubmit () {
            this.$refs.user.validate((valid) => {
                if (valid) {
                    this.登录()
                } else {
                }
            })
        },
        logon(){
            if(!this.登录信息.name){
                this.错误('请输入账号')
                return
            }else if(!this.登录信息.password){
                this.错误('请输入密码')
                return
            }
            this.登录()
        },
        登录(){
            this.$axios.post('/api/auth/login',this.登录信息).then(res => {
                if(res.data.code===0){
                    if(!this.登录信息.记住密码){
                        this.登录信息.name = ""
                        this.登录信息.password = ''
                    }
                    this.setItem(['登录信息',this.登录信息])
                    this.正确('登录成功')
                    this.setItem(['userInfo',res.data.data])
                    this.$router.push('/')
                }else{
                    this.错误(res.data.message)
                }
            }).catch(err => {
                console.error(err); 
                this.错误('系统错误，稍后再试')
            })
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.login{
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #000000;
}
.bg{
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: 0px;
    margin: auto;
    // height: 100%;
}
.box-1{
    width: calc(100vw / 1920 * 904);
    height: calc(100vw / 1920 * 430);
    // border: 2px solid red;
    position: absolute;
    z-index: 1;
    top: calc(100vw / 1920 * 53);
    left: calc(100vw / 1920 * 112);
    right: 0px;
    bottom: 0px;
    margin: auto;
    input,
    button{
        position: absolute;
        outline: none;
    }
    input:focus{
        background: #8a4420;
    }
    input.active{
        background: #8a4420;
    }

    .name{
        width: calc( 100vw / 1920 * 554);
        height: calc(100vw / 1920 * 78);
        top: calc(100vw / 1920 * 69);
        left: calc(100vw / 1920 * 41);
        right: 0px;
        margin: auto;
        background: none;
        border: 7px solid #01c2eb;
        text-align: center;
        color: #fff;
        font-size: 33px;
    }
    .password{
        width: calc( 100vw / 1920 * 554);
        height: calc(100vw / 1920 * 78);
        top: calc(100vw / 1920 * 157);
        left: calc(100vw / 1920 * 41);
        right: 0px;
        margin: auto;
        background: none;
        border: 7px solid #01c2eb;
        text-align: center;
        color: #fff;
        font-size: 33px;
    }
    .btn-1{
        width: calc( 100vw / 1920 * 554);
        height: calc(100vw / 1920 * 78);
        top: calc(100vw / 1920 * 290);
        left: calc(100vw / 1920 * 41);
        right: 0px;
        margin: auto;
        background: none;
        border: 6px solid #01c2eb;
        cursor: pointer;
        font-size: 30px;
        background: #00ffff;
        color: #fff;
        &:hover{
            background: #01e2e2;
        }
    }
}
</style>