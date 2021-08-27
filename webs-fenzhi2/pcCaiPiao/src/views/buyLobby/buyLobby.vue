<template>
    <div class="buyLobby">
        <buyLobbytitle v-if="!userInfo.UserId"></buyLobbytitle>
        <buyLobbylogin v-if="userInfo.UserId"></buyLobbylogin>
        <div class="buyLobby_content">
            <div class="buyLobby_nav">
                <div class="title_top">
                    <div><i class="iconfont icon-shouye"></i></div>
                    <div><span>购彩大厅</span></div>
                </div>

                
                <el-menu  class="about_detail" background-color="#fff" active-text-color="red" :router="true" :default-active="$route.fullPath" :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>所有彩票</span></div>
                        </template>
                        <el-menu-item index="/buyLobby">所有彩票</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>三分彩</span></div>
                        </template>
                        <el-menu-item index="/sanfen?id=10000">三分时时彩</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>时时彩</span></div>
                        </template>
                        <el-menu-item index="/shishicai?id=10001">分分时时彩</el-menu-item>
                        <el-menu-item index="/shishicai?id=10002">重庆时时彩</el-menu-item>
                        <el-menu-item index="/shishicai?id=10003">五分时时彩</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>PK10</span></div>
                        </template>
                        <el-menu-item index="/PKshi?id=20000">极速PK拾</el-menu-item>
                        <el-menu-item index="/PKshi?id=20004">五分PK拾</el-menu-item>
                        <el-menu-item index="/PKshi?id=20001">北京PK拾</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>飞艇</span></div>
                        </template>
                        <el-menu-item index="/feiting?id=20002">幸运飞艇</el-menu-item>
                        <el-menu-item index="/feiting?id=20003">威尼斯飞艇</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>六合彩</span></div>
                        </template>
                        <el-menu-item index="/liuhecai?id=70000">极速六合彩</el-menu-item>
                        <el-menu-item index="/liuhecai?id=70001">香港六合彩</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>快3</span></div>
                        </template>
                        <el-menu-item index="/kauisan?id=40004">分分快3</el-menu-item>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>PC蛋蛋</span></div>
                        </template>
                        <el-menu-item index="/PCdd?id=50000">幸运28</el-menu-item>
                    </el-submenu>
                    <el-submenu index="9">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>11选5</span></div>
                        </template>
                        <el-menu-item index="/llxuanwu?id=60005">分分11选5</el-menu-item>
                        <el-menu-item index="/llxuanwu?id=60000">山东11选5</el-menu-item>
                        <el-menu-item index="/llxuanwu?id=60001">广东11选5</el-menu-item>
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title">
                            <div class="title_img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/sanfencai.png'" alt=""></div>
                            <div><span>低频彩</span></div>
                        </template>
                        <el-menu-item index="/dipingcai?id=30002">极速3D</el-menu-item>
                        <el-menu-item index="/dipingcai?id=30000">排列三</el-menu-item>
                        <el-menu-item index="/dipingcai?id=30001">福彩3D</el-menu-item>
                    </el-submenu>
                </el-menu>

            </div>
            <div class="buyLobby_table_content">
                <div class="title_top">
                  <div><i class="el-icon-loading"></i></div>
                  <div><span>Hi, 欢迎来到彩票大厅</span></div>
                </div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import buyLobbytitle from '@/components/彩票大厅登陆头部/彩票大厅登陆头部.vue'//彩票大厅头部组件
import buyLobbylogin from '@/components/彩票大厅登陆后头部/彩票大厅登陆后头部.vue'//彩票大厅登陆后头部组件
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import { api_登录试玩 } from "@/api/请求登录的接口.js";

export default {
    data() {
        return {
            config: config,
            loading_1: ""
        }
    },
    components: { // 注册组件
        buyLobbytitle,
        buyLobbylogin,
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        ...mapGetters({
            userInfo: "userInfo"
        }),
        route(){
            return this.$route
        }
    },

    methods: {

    },
    mounted() {
    }

}
</script>
  <style lang="scss" scoped>
.buyLobby {
    .buyLobby_content {
        display: flex;
        /deep/.buyLobby_nav {
            width: 200px;
            border: 1px solid #ccc;
            height: 800px;
            color: #ffffff !important;
            background: rgb(0, 195, 255);
            .title_top {
                height: 33px;
                font-weight: 800px;
                background: #e94335;
                display: flex;
                width: 201px;
                line-height: 33px;
                div:nth-child(1) {
                    padding-left: 20px;
                    margin-right: 20px;
                    .icon-shouye {
                        font-size: 20px;
                    }
                }
            }
            
            .el-menu {
                border: none;
                .el-submenu {
                    /deep/ .el-submenu__title {
                        width: 200px !important;
                        border-bottom: 1px solid #ccc !important;
                        height: 48px !important;
                        line-height: 48px !important;
                        font-size: 16px;
                        display: flex;
                        .title_img_box {
                            width: 27px;
                            height: 27px;
                            margin-right: 20px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .el-submenu__icon-arrow {
                            color: #333333;
                            font-weight: 1000;
                            font-size: 24px;
                            line-height: 18px;
                        }
                    }
                }
                /deep/ .el-menu-item:hover {
                    background: #ffe4cc;
                }
                /deep/ .el-menu-item {
                    color: rgb(7, 6, 6);
                    background: #f7f7f7 !important;
                    width: 200px !important;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #ccc !important;
                    font-size: 16px;
                    text-align: center;
                }
            }
        }
        .buyLobby_table_content {
            width: 100%;
            height: 1400px;
            // background: gold;
            .title_top{
              height:33px;
              background: #fff5f5;
              border-top:1px solid  #ffd8d7;
              border-bottom:1px solid  #ffd8d7;
              padding-left: 10px;
              display: flex;
             
              line-height: 33px;
              i{
                color:#e94335;
                font-size: 20px;
              }
              div:nth-child(1){
                margin-right:13px;
              }
            }
        }
    }
}


.is-active{
    background: #ff6700 !important;
    color: #ff6700 !important;
}
</style>
  