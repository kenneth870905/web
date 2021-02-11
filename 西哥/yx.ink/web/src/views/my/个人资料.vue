<template>
    <div>
        <div class="title-1">个人信息</div>
        <div class="cont">
            <el-form class="from" :model="user">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="账号">
                            <el-input v-model="user.userName" readonly  placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称">
                            <el-input v-model="user.nickName" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电子邮箱">
                            <el-input v-model="user.email" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新密码（不修改可不填写）">
                            <el-input show-password v-model="user.password" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="确认密码">
                            <el-input show-password v-model="user.password2" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="">
                            <el-button style="width: 100%;" type="warning" @click="保存()">保存更改</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            user:{}
        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo'
        })
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        保存(){
            if(this.user.password || this.user.password2){
                if(this.user.password!=this.user.password2){
                    this.错误('两次密码不一致')
                    return
                }
            }
            this.$Loading(1)
            this.$axios.post('/User/modify',this.user).then(res => {
                if(res.code==1){
                    this.正确('修改成功')
                    this.查询用户()
                }else{
                    this.错误(res.message)
                }
                this.$Loading()
            }).catch(err => {
                this.$Loading()
                this.错误('系统错误，稍后再试')
            })
        },
        查询用户(){
            this.$axios.post('/User/getUserById','').then(res => {
                if(res.code==1){
                    this.setValue(['userInfo',res.data])
                }
            }).catch(err => {
            })
        }
    },
    mounted() {
        this.user = JSON.parse(JSON.stringify(this.userInfo))
    },
}
</script>

<style lang="scss" scoped>
.cont{
    background: #fff;
    padding: 40px;
}
.title-1{
    line-height: 60px;
    font-size: 22px;
}
.from{
    .el-col{
        padding: 0px 20px;
    }
}
</style>