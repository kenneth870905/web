<template>
    <div class="shouLogin">
        <div class="Nocontainer">
            <div class="shouLogin_img_box"><img :src="dataconfig.api_urlData+'image/cpindex/img/logo.png'" alt=""> </div>
            <div class="shouLogin_input_box">
                <ul>
                    <li>欢迎您!&nbsp;<span>{{userAll.UserId}}</span></li>
                    <li class="余额">
                        <span>可用余额: </span>&nbsp;<span class="fred">{{userAll.Money}}</span>&nbsp; <span @click="userlist()">刷新</span>
                    </li>|
                    <li>
                        <router-link to="/">首页</router-link>
                        <!-- <router-link to="MemberCenter">会员中心</router-link> -->
                    </li>|
                    <li>
                        <a class="fred" :href="config.zaixianUrl">在线客服</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Info/Person'">会员中心</a>
                    </li>|
                    <li>
                        <a class="fred" :href="config.api_url+'/Members/Money/Recharge'">充值</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Money/Withdraw'">提现</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Info/MyOrder'">投注记录</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Info/MyOrder'">合买记录</a>
                    </li>|
                    <li>
                        <span @click="logout()">退出</span>
                    </li>|
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
import { api_请求登录, api_Online } from "@/api/请求登录的接口.js";

// import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            userAll: "",
            dataconfig: {
                api_urlData: config.api_url//api_url
            },
        }
    },
    computed: {
        ...mapState({
            config:'config'
        })
    },
    created() {
        this.userlist()

    },
    methods: {
        ...mapActions({
            退出登录: '退出登录'
        }),
        logout() {
            this.退出登录();
        },
        userlist() {
            console.log('登录后头部')
            var hash = location.hash.substring(1).split('?')[0]!='/' ? location.hash.substring(1).split('?')[0] : ''
            var obj ={
                    init:false,
                    n:1,
                    hash
                }
            api_Online(obj).then(x => {
                this.userAll = x.data
            }).catch(err => {
                console.log(err);
            })
        }

    }

}
</script>
  <style lang="scss" scoped>
.shouLogin {
    .Nocontainer {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        padding: 10px 0px 10px 0px;
        .shouLogin_img_box {
            height: 46px;
            margin-right: 100px;
            width: 142px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .shouLogin_input_box {
            ul {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                height: 45px;
                line-height: 45px;
                font-size: 14px;
                .active_nav {
                    color: red;
                }
                li {
                    cursor: pointer;
                    height: 45px;
                    line-height: 45px;
                    margin: 0px 8px 0px 8px;
                    //  color:#969696 !important;
                    a:hover {
                        text-decoration: underline;
                    }
                    a {
                        // color: #969696;
                        color: #333333;
                    }
                }
            }
        }
    }
}
</style>
  