<template>
    <div class="my">
        <van-nav-bar class="蓝色" title="个人中心" left-text="首页" fixed @click-left="$router.push('/')" @click-right="$router.push('/pingdao')">
            <van-icon name="wap-nav" slot="right" size="20" />
        </van-nav-bar>
        <div class="Main">
            <div class="header">
                <div class="img_1">
                    <van-icon name="manager" v-if="!userinfo.photoBlobUrl"/>
                    <img v-else :src="`http://10.10.27.150/tp6test/public/user/getPhoto?token=${token}`" alt="" srcset="">
                </div>
                <div class="name">{{userinfo.nickname ? userinfo.nickname : userinfo.userName}}</div>
                <ul class="搜藏">
                    <li @click="$router.push('/my/sc')">
                        <van-icon name="star" />
                        <div>搜藏</div>
                    </li>
                    <li @click="$router.push('/my/gz')">
                        <van-icon name="like" />
                        <div>关注</div>
                    </li>
                    <li @click="$router.push('/my/xiaoxi')">
                        <van-icon name="comment" />
                        <div>消息</div>
                    </li>
                </ul>
            </div>

            <ul class="list1">
                <li>
                    <div class="cont_1">
                        <van-icon name="setting-o" />
                        字号设置
                    </div>
                    <van-icon name="arrow" />
                </li>
                <li @click="$router.push('/fk')">
                    <div class="cont_1">
                        <van-icon name="edit" />
                        意见反馈
                    </div>
                    <van-icon name="arrow" />
                </li>
                <li @click="$router.push('/my/personal')">
                    <div class="cont_1">
                        <van-icon name="edit" />
                        个人资料
                    </div>
                    <van-icon name="arrow" />
                </li>
            </ul>

            <div class="gitout" @click="getOut()">退出</div>

            <!-- <button @click="刷新token()">token</button>
            <button @click="获取user()">user</button>
            <button @click="测试()">测试</button>
            <button @click="测试1()">测试1</button> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "",
    components: {
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo,
            token:x=>x.user.token
        })
    },
    methods: {
        ...mapActions({
            刷新token:"user/刷新token",
            获取user:"user/获取user"
        }),
        测试(){
            this.获取user()
            this.刷新token()
            this.获取user()
            this.获取user()
        },
        getOut(){
            this.$axios.post('/user/getOut').then(x=>{
                console.log(x);
                this.$router.push('/login')
            }).catch(err=>{
                console.log(err);
            })
            // this.$router.push('/login')
        },
        测试1(){
            this.$axios.post('/user/test1').then(x=>{
                console.log(x)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        // this.$axios.get('https://m.ac.qq.com/category/listAll/type/na/rank/pgv?page=65&pageSize=15&style=items').then(x=>{
        //     console.log(err)
        // }).catch(err=>{
        //     console.log(x)
        // })
    },
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
    .van-nav-bar__text {
        color: #ffffff;
    }
    .van-nav-bar__title {
        color: #ffffff;
    }
    .van-icon {
        color: #ffffff;
    }
}
.Main {
}
.header {
    text-align: center;
    background: linear-gradient(180deg, #537bff, #76c0ff);
    margin: 0px 0px _vw(36);
    padding: 60px 0px _vw(60);
    position: relative;
    .img_1 {
        width: _vw(60);
        height: _vw(60);
        margin: 0px auto;
        border-radius: 100%;
        background: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: _vw(40);
            color: #ffffff;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .name {
        margin: _vw(10) 0px 0px;
        color: #ffffff;
        font-size: _vw(18);
    }
    .搜藏 {
        display: flex;
        > li {
            width: calc(100% / 3);
        }
        background: #ffffff;
        position: absolute;
        width: 90%;
        padding: _vw(15) 0px;
        box-shadow: 0px 0px 5px 0px #cccccc;
        border-radius: 5px;
        left: 5%;
        bottom: _vw(-30);
        font-size: _vw(14);
        i {
            color: #537bff;
            font-size: _vw(22);
        }
    }
}
.my{
    background: #f7f8fa;
}
.list1{
    padding: 0px _vw(15);
    background: #ffffff;
    li{
        display: flex;
        align-items: center;
        min-height: _vw(44);
        border-bottom: 1px solid #eeeeee;
        .cont_1{
            flex:1;
        }
    }
}

.gitout{
    background: #ffffff;
    text-align: center;
    line-height: _vw(48);
    color: red;
    margin: _vw(15) 0px;
    font-size: _vw(16); 
}

</style>