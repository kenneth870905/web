<template>
    <div class="login">

        <div class="box-2">
            <img class="bg" src="static/image/bg1.png" alt="" srcset="">

            <div class="box-1">
                <input type="text" class="name" :class="{active:登录信息.name}" v-model="登录信息.name" placeholder="UserName">
                <input type="password" @keyup.enter="logon()" class="password" :class="{active:登录信息.password}" v-model="登录信息.password" placeholder="Password">
                <div class="btn btn-1" @click="$router.push('/register')">注册</div>
                <div class="btn btn-2" @click="logon()">登录</div>
            </div>
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
    overflow: hidden;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.box-2{
    width: 1280px;
    height: 720px;
    position: relative;
    flex-shrink: 0;
}
.bg{
    width: 100%;
    height: 100%;
}
.box-1{
    input,
    .btn,
    button{
        position: absolute;
        outline: none;
    }
    // input:focus{
    //     background: #8a4420;
    //     box-shadow: inset 0px 0px 6px 0px #fff;
    // }
    // input.active{
    //     background: #8a4420;
    //     box-shadow: inset 0px 0px 6px 0px #fff;
    // }

    .name{
        width: 370px;
        height: 51px;
        top: 280px;
        left: 507px;
        background: none;
        // border: 4px solid #01c2eb;
        border: none;
        text-align: center;
        color: #fff;
        font-size: 24px;
        &::-webkit-input-placeholder {
            color: #d2d2d2;
        }
        &:-moz-placeholder {/* Firefox 18- */
            color: #d2d2d2;
        }
        &::-moz-placeholder{/* Firefox 19+ */
            color: #d2d2d2;
        }
        &:-ms-input-placeholder {
            color: #d2d2d2;
        }
    }
    .password{
        width: 370px;
        height: 50px;
        top: 343px;
        left: 507px;
        background: none;
        border: none;
        // border: 4px solid #01c2eb;
        text-align: center;
        color: #fff;
        font-size: 24px;
        &::-webkit-input-placeholder {
            color: #d2d2d2;
        }
        &:-moz-placeholder {/* Firefox 18- */
            color: #d2d2d2;
        }
        &::-moz-placeholder{/* Firefox 19+ */
            color: #d2d2d2;
        }
        &:-ms-input-placeholder {
            color: #d2d2d2;
        }
    }
    .btn-1{
        width: 120px;
        text-align: center;
        line-height: 50px;
        left: 543px;
        top: 423px;
        background: none;
        cursor: pointer;
        font-size: 22px;
        // border: 1px solid #fff;
        color: #fff;
        &:hover{
            font-size: 24px;
        }
    }
    .btn-2{
        width: 120px;
        text-align: center;
        line-height: 50px;
        left: 706px;
        top: 422px;
        background: none;
        cursor: pointer;
        font-size: 22px;
        // border: 1px solid #fff;
        color: #fff;
        &:hover{
             font-size: 24px;
        }
    }
}
</style>