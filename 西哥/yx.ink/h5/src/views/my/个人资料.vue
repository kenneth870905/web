<template>
    <div>
        <van-nav-bar title="个人资料" left-arrow @click-left="$back()" :right-text="编辑 ? '' : '编辑'" @click-right="onClickRight"></van-nav-bar>
        
        <div class="form">
            <van-form @submit="submit" :readonly="!编辑">
                <van-field label="账号" readonly v-model="user.userName" />
                <van-field label="昵称" placeholder="未设置" v-model="user.nickName" />
                <van-field label="邮箱" placeholder="未设置" v-model="user.email"/>
                <van-field v-show="!编辑" label="密码" value="******"/>
                <van-field v-show="编辑" label="新密码" :placeholder="编辑 ? '不修改可不填写':''" v-model="user.password"/>
                <van-field v-show="编辑" label="确认密码" :placeholder="编辑 ? '不修改可不填写':''" v-model="user.password2"/>
                <div style="margin: 16px;" v-if="编辑">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
            <div style="margin: 16px;" v-if="!编辑">
                <van-button round block plain  type="info" @click="编辑=true">修改资料或密码</van-button>
            </div>
            <!-- {{process.env}} -->
        </div>

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            user:{
                userName:'',
                nickName:"",
                email:"",
                password:"",
                password2:"",
            },
            编辑:false
        }
    },
    computed:{
        ...mapState({
            userInfo:"userInfo"
        })
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        submit(){
            if(this.user.password && this.user.password!=this.user.password2){
                this.$toast('两次密码不一致')
                return
            }

            this.$toast('提交成功');
            this.编辑 = false
            this.$toast.loading({ message: '加载中...', forbidClick: true});
            this.$axios.post('/User/modify',this.user).then(res => {
                if(res.code==1){
                    this.$toast('修改成功')
                    this.$axios.post('/User/getUserById','').then(res => {
                        if(res.code==1){
                            this.setValue(['userInfo',res.data])
                        }
                    }).catch(err => {
                    })
                }else{
                    this.$toast(res.message)
                }
            }).catch(err => {
                console.log(err)
                this.$toast('系统错误，稍后再试')
            })
        },
        onClickRight(){
            this.编辑 = true
        },
        查询个人信息(){
            this.$toast.loading({ message: '加载中...', forbidClick: true});
            this.$axios.post('/User/getUserById','')
            .then(res => {
                if(res.code==1){
                    this.user = res.data
                    this.setValue(['userInfo',res.data])
                }
                this.$toast.clear();
            })
            .catch(err => {
                this.$toast.clear();
            })
        },

    },
    mounted() {
        this.查询个人信息()
    },
}
</script>

<style lang="scss" scoped>
.form{
    margin: 20px 0px;
}
</style>