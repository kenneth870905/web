<template>
    <div class="login">
        <!-- <div class="title-2">coco</div> -->
        <div class="box-1">
            <Form ref="user" class="right"  :model="user" :rules="ruleValidate">
                <div class="title-1">注册账号</div>
                <FormItem prop="name" label="登录账号">
                    <Input size="large" @on-keyup.enter="handleSubmit()" prefix="md-person" v-model="user.name" placeholder="请输入登录账号" />
                </FormItem>
                <FormItem prop="password" label="登录密码">
                    <Input size="large" @on-keyup.enter="handleSubmit()" autocomplete="new-password" prefix="md-unlock" type="password" password v-model="user.password" placeholder="请输入密码" />
                </FormItem>
                <FormItem prop="password2" label="确认密码">
                    <Input size="large" @on-keyup.enter="handleSubmit()" autocomplete="new-password" prefix="md-unlock" type="password" password v-model="user.password2" placeholder="请确认密码" />
                </FormItem>
                <FormItem>
                    <Button size="large" style="width:100%" type="primary" @click="handleSubmit()">注 册</Button>
                </FormItem>
                <FormItem class="zhuce">
                    <span @click="$router.push('/login')">已有账号前往登录</span>
                </FormItem>
            </Form>
        </div>
        <!-- <div class="footer">Copyright&copy;</div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                password:"",
                password2:""
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                password2:[
                    { required: true, trigger: 'blur',
                        asyncValidator:(rule, value) => {
                            return new Promise((resolve, reject) => {
                                if(!value){
                                    reject('请确认密码')
                                }else if(this.user.password!=value){
                                    reject('两次密码不一致')
                                }else{
                                    reject()
                                }
                            });
                        }
                    },
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs.user.validate((valid) => {
                if (valid) {
                    this.注册()
                } else {
                    return false
                }
            })
        },
        注册(){
            this.$axios.post(`/api/auth/register`,this.user).then(res => {
                console.log(res)
                if(res.data.code===0){
                    this.正确('注册成功')
                    history.back()
                }else{
                    this.错误(res.data.message)
                }
            }).catch(err => {
                console.error(err); 
                this.错误('系统错误，稍后再试')
            })
        }
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
    overflow: auto;
    display: flex;
}
.right{
    width: 528px;
    padding: 50px 70px 40px;
    background: #fff;
    border-radius: 15px;
    .title-1{
        font-size: 28px;
        margin-bottom: 40px;
        text-align: center;
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