<template>
    <div class="login">
        <div class="title-2">coco</div>
        <div class="box-1">
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
        </div>
        <!-- <div class="footer">Copyright&copy;</div> -->
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
.login {
    min-height: 100%;
    display: flex;
    overflow: auto;
    padding: 50px 0px;
    align-items: center;
    justify-content: center;
    background-image:url(~@/assets/login1.svg) ;
    background-color: #f0f2f5;
    background-size: cover;
}
.title-2{
    position: absolute;
    top: 35px;
    left: 26px;
    color: #1890ff;
    font-weight: 600;
    font-size: 38px;
    font-family: Avenir,"Helvetica Neue",Arial,Helvetica,sans-serif;
}
.box-1 {
    height: 620px;
    overflow: auto;
    display: flex;
    .left {
        width: 558px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
        }
    }
}
.right{
    width: 528px;
    padding: 120px 70px;
    background: #fff;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    .title-1{
        font-size: 28px;
        margin-bottom: 80px;
    }
}

.footer{
    position: absolute;
    left: 0px;
    width: 100%;
    bottom: 10px;
    text-align: center;
}

.zhuce{
    text-align: right;
    span{
        cursor: pointer;
    }
}

</style>