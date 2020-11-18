<template>
    <!-- <div v-if="显示登录框" class="登录弹窗" @click.self="隐藏()"> -->
    <div  class="登录弹窗">
        <el-dialog title="用户登录" width="400px" :visible.sync="显示登录框" :before-close="handleClose" :close-on-click-modal="false">   
            <iframe :style="style" src="/index/pcLogin/index.html?nh=1" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: '',
    data() {
        return {
            style:{}
        }
    },
    computed: {
        ...mapGetters({
            显示登录框: '显示登录框'
        })
    },
    methods: {
        ...mapActions({
            设置是否显示登录框: '设置是否显示登录框',
            getUserInfo: 'getUserInfo'
        }),
        handleClose() {
            this.设置是否显示登录框(false)
        },
        // 隐藏(){
        //     console.log('隐藏')
        // }
    },
    mounted() {
        
        var this_1 = this
        window.login={
            toRegister:function(){
                console.log('跳转注册')
                this_1.$router.push('/register')
                this_1.设置是否显示登录框(false)
            },
            loginSuccessfully:function(){
                console.log('登录成功')
                this_1.getUserInfo()
                this_1.设置是否显示登录框(false)
            },
            close:function(){
                console.log('关闭弹窗')
                this_1.设置是否显示登录框(false)
            },
            setHeight(h){
                console.log(h)
                this_1.style = {height:h+'px'}
            }
        }
    },
    watch: {
        isPhone() {
            // 移除
            this.$refs['user'].clearValidate()
        }
    }
}
</script>

<style lang="scss" scoped>
// .登录弹窗{
//     position: fixed;
//     top: 0px;
//     left: 0px;
//     width: 100%;
//     height: 100%;
//     background: rgba(0,0,0,0.3);
//     z-index: 2005;
//     display: flex;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     iframe{
//         width: 400px;
//         height: 360px;
//     }
// }

iframe{
    width: 100%;
    height: 305px;
}
/deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
}
/deep/ .el-dialog__body{
    padding: 0px;
}
.验证码 {
    display: flex;
    /deep/ .el-input {
        width: 200px;
    }
}
.phone {
    display: flex;
    /deep/ .el-input {
        width: 150px;
        margin: 0px 10px 0px 0px;
    }
}
.text-right {
    text-align: right;
}
.红色字体 {
    color: red;
}
</style>
