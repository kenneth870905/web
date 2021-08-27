<template>
    <div class="shouLogin">
        <div class="container">
            <div class="shouLogin_img_box" v-if="config.showlogo"><img @click="go('/')" :src="config.titleImg" alt=""> </div>
            <div class="shouLogin_input_box">
                <ul>
                    <li>欢迎您!&nbsp;<span>{{userAll.UserId}}</span></li>
                    <li class="余额">
                        <span>可用余额: </span>&nbsp;<span class="fred">{{userAll.Money}}</span>&nbsp; <span @click="getUserInfo()">刷新</span>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Info/Person'">会员中心</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Money/Recharge'">充值</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Money/Withdraw'">取款</a>
                    </li>|
                    <li>
                        <a :href="config.api_url+'/Members/Info/MyOrder'">投注记录</a>
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
import { api_请求登录, api_Online, } from "@/api/请求登录的接口.js";

import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            dataconfig: {
                titleImg: config.titleImg,//title
                api_urlData: config.api_url//api_url
            },

        }
    },
    created() {

    },
    computed: {
        ...mapState({
            userAll:"userInfo",
            config: 'config'
        }),
    },
    methods: {
        ...mapActions({
            // statusBar: "更新登陆信息",
            getUserInfo: 'getUserInfo',
            退出登录: '退出登录'
        }),
        go(url) {
            this.$router.push(url);
        },
        logout() {
            this.退出登录();
        }
    }
}
</script>
  <style lang="scss" scoped>
.shouLogin {
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0px 10px 0px;
        .shouLogin_img_box {
            height: 68px;
            img {
                height: 100%;
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
                li:nth-child(7) {
                    cursor: pointer;
                }
                li {
                    height: 45px;
                    line-height: 45px;
                    margin: 0px 8px 0px 8px;
                    //  color:#969696 !important;
                    span:nth-child(3) {
                        cursor: pointer;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    a {
                        cursor: pointer;
                        // color: #969696;
                        color: #333333;
                    }
                }
            }
        }
    }
}
</style>
  