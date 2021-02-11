<template>
    <div class="my">
        <div class="w1280">
            <el-row>
                <el-col :span="4">
                    <div class="t1">欢迎：{{userInfo.nickName ? userInfo.nickName : userInfo.userName}}</div>
                    <div class="t2"> 管理我的账户 </div>
                    <div class="t3" @click="$router.push('/my')">个人信息</div>
                    <div class="t3" @click="$router.push('/my/address')">地址簿</div>
                    <div class="t3" @click="$router.push('/my/orderlist')">我的订单</div>
                    <div class="t3" @click="$router.push('/my/evaluate')">我的评论</div>
                </el-col>
                <el-col :span="20">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            userInfo:"userInfo"
        })
    }
}
</script>

<style lang="scss" scoped>
.my{
    background: #eff0f4;
    padding: 0px 0px 100px;
    min-height: 500px;
}
.t1{
    color: #424242;
    font-size: 12px;
    margin: 26px 0px 20px;
}
.t2{
    font-weight: bold;
    color: #424242;
}
.t3{
    padding: 0px 0px 0px 20px;
    font-size: 14px;
    color: #424242;
    margin: 10px 0px;
    cursor: pointer;
    &:hover{
        color: #1a9cb7;
    }
}
</style>