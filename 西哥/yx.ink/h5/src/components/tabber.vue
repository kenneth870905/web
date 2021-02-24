<template>
    <div>
        <van-tabbar v-model="active" active-color="#d3232a" :before-change="beforeChange">
            <van-tabbar-item icon="home-o" name="/" @click="$router.push('/')">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" name="/typeList" @click="$router.push('/typeList')">分类</van-tabbar-item>
            <van-tabbar-item icon="chat-o" @click="点击客服()">消息</van-tabbar-item>
            <van-tabbar-item icon="cart-o" :badge="购物车.length>0 ? 购物车.length : ''" @click="$router.push('/cart')">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" name="/my" @click="我的()">我的</van-tabbar-item>
        </van-tabbar>
        <!-- <van-popup v-model="showPopup" position="left">
            <div class="个人中心">
                <div class="box-1" style="background-image:url(static/img/bg.png);">
                    <div class="touxiang">
                        <img src="static/img/touxiang.jfif" alt="" srcset="">
                    </div>
                    <div class="text">
                        <span @click="$router.push('/login')" v-if="!userInfo.id">登录</span>
                        <span v-else>{{userInfo.nickName ? userInfo.nickName : userInfo.userName}}</span>
                    </div>
                </div>
                <ul class="list1">
                    <li @click="$router.push('/cart')">
                        <van-icon name="cart-o"/>购物车
                    </li>
                    <li @click="go('/orderList')">
                        <van-icon name="orders-o" />我的订单
                    </li>
                    <li @click="go('/review')">
                        <van-icon name="orders-o" />我的评价
                    </li>
                    <li @click="go('/addrList')">
                        <van-icon name="location-o" />收货地址
                    </li>
                    <li @click="go('/userInfo')">
                        <van-icon name="manager-o" />个人资料
                    </li>
                </ul>
                <div class="btn-1" v-if="userInfo.id" @click="退出()">
                    退出当前账号
                </div>
            </div>
        </van-popup> -->
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