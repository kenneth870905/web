<template>
    <div class="shezhi">
        <van-nav-bar fixed title="设置中心" left-arrow @click-left="$back()"></van-nav-bar>
        
        <van-cell-group class="box-1">
            <van-cell title="基本信息" is-link to="/userInfo"/>
            <van-cell title="登录密码" is-link to="/userInfo"/>
            <van-cell title="收货地址" is-link to="/addrList"/>
        </van-cell-group>
        <van-button class="btn-1" type="danger" block @click="退出()">退出账号</van-button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        退出(){
            this.setValue(['token',''])
            this.setValue(['userInfo',{}])
            this.$toast('退出成功')
            this.$router.push('/')
        }
    },
}
</script>

<style lang="scss" scoped>
.shezhi{
    height: 100%;
    padding: 46px 0px 0px;
}
.box-1{
    margin: 30px 0px;
    position: relative;
}
.btn-1{
    position: absolute;
    left: 0px;
    bottom: 20px;
}
</style>