<template>
    <div>
        <van-tabbar v-model="active" active-color="#d3232a" :before-change="beforeChange">
            <van-tabbar-item icon="home-o" name="/" @click="$router.push('/')">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" name="/typeList" @click="$router.push('/typeList')">分类</van-tabbar-item>
            <van-tabbar-item icon="chat-o" name="/kefu" @click="$router.push('/kefu')">客服</van-tabbar-item>
            <van-tabbar-item icon="cart-o" :badge="购物车.length>0 ? 购物车.length : ''" @click="$router.push('/cart')">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" name="/my" @click="我的()">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            active:'/',
            showPopup:false
        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo',
            token:"token" ,
            购物车:"购物车"
        }),
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        点击客服(){
            this.$toast('客服升级中，请求期待')
        },
        我的(){
            if(this.userInfo.id){
                this.$router.push('/my')
            }else{
                this.$router.push('/login?url=my')
            }
            //  this.showPopup=true
            // this.$router.push('/my/personal')
            // this.$router.push('/login')
        },
        go(path){
            if(!this.token){
                this.$toast('请选登录')
            }else{
                this.$router.push(path)
            }
        },
        beforeChange(name){
            // console.log(name)
            return name!=3
        },
        退出(){
            this.setValue(['token',''])
            this.setValue(['userInfo',{}])
            this.$toast('退出成功')
            this.showPopup=false
        }
    },
    mounted() {
        this.active= this.$route.path
    },
    watch:{
        $route(){
            this.active= this.$route.path
        }
    }
}
</script>

<style lang="scss" scoped>
.个人中心{
    width: 250px;
    height: 100vh;
    .box-1{
        background-size: cover;
        padding: 15px;
        .touxiang{
            width: 60px;
            height: 60px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .text{
            color: #fff;
            margin: 30px 0px 0px;
        }
    }
    .list1{
        li{
            height: 44px;
            display: flex;
            align-items: center;
            padding: 0px 15px;
            color: #333;
            font-size: 14px;
            i{
                font-size: 20px;
                margin-right: 15px;
            }
        }

    }
    .btn-1{
        line-height: 44px;
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        text-align: center;
        // border-bottom: 1px solid #eee;
        background: #eee;
    }
}
</style>