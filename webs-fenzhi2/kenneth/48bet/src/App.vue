<template>
    <div>
        <div ref="theader">
            <topheader class="theader" />
        </div>

        <router-view class="views" ref="views" :style="{ 'min-height': minheight + 'px' }"></router-view>

        <div ref="bfooter">
            <bottonfooter class="bfooter" />
        </div>

        <div class="左侧 侧栏" v-if="对联.左侧 && config.celan && config.celan.left.length > 0">
            <!-- <img src="static/image/left.gif" alt="" srcset=""> -->
            <div @click="侧栏跳转(item)" v-for="(item, index) in config.celan.left" :key="index">
                <img :src="item.img" alt="" srcset="" />
            </div>
            <div class="关闭" @click="对联.关闭('左侧')">
                <div></div>
            </div>
        </div>
        <div class="右侧 侧栏" v-if="对联.右侧 && config.celan && config.celan.right.length > 0">
            <!-- <img src="static/image/right.gif" alt="" srcset=""> -->
            <div @click="侧栏跳转(item)" v-for="(item, index) in config.celan.right" :key="index">
                <img :src="item.img" alt="" srcset="" />
            </div>
            <div class="关闭" @click="对联.关闭('右侧')">
                <div></div>
            </div>
        </div>

        <!-- 系统公告 -->
        <el-dialog class="系统公告" title="系统公告" width="900px" :visible.sync="系统公告.show" :close-on-click-modal="false" :before-close="close1">
            <div class="iframe">
                <iframe :src="系统公告.url" frameborder="0"></iframe>
            </div>
            <div class="底部">
                <el-button @click="close1" type="danger" size="mini">我知道了</el-button>
            </div>
        </el-dialog>

        <!-- 系统消息 -->
        <el-dialog title="您有新的消息" :visible.sync="系统公告.显示系统Messages" width="700px" center class="系统Messages" :close-on-click-modal="false" :before-close="closeMessage">
            <span v-html="系统公告.系统Messages"></span>
            <span slot="footer" class="dialog-footer">
                <el-button style="width:100%" type="primary" size="small" @click="closeMessage()">确 定</el-button>
            </span>
        </el-dialog>

        <jryx />

    </div>
</template>

<script>
import { api_隐藏公告 } from "@/api/公告接口.js";
import topheader from "./views/header.vue";
import bottonfooter from "./views/footer.vue";
const jryx = () => import("@/components/进入游戏弹出框.vue");

import $ from "jquery";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "",
    components: {
        topheader,
        bottonfooter,
        jryx
    },
    data() {
        return {
            minheight: 0,
            对联: {
                左侧: true,
                右侧: true,
                关闭(type) {
                    this[type] = false;
                }
                // this_1:()=>{
                //     return this
                // }
            }
        };
    },
    computed: {
        ...mapState({
            userinfo: x => x.user.userinfo,
            config: "config",
            ip: "ip"
        }),
        ...mapGetters({
            系统公告: "user/系统公告"
        })
    },
    methods: {
        ...mapMutations({
            修改state: "修改state"
        }),
        ...mapActions({
            getUserInfo: "user/getUserInfo"
        }),
        侧栏跳转(item) {
            if (item.url) {
                window.open(item.url);
            } else if (item.path) {
                this.$router.push(item.path);
            }
        },
        async closeMessage() {
            var obj = {
                Id: this.userinfo.Messages[0].Id,
                Type: 2,
                groupId: null
            };
            await api_隐藏公告(obj);
            this.getUserInfo();
        },
        async close1() {
            if (this.userinfo.Notices && this.userinfo.Notices.length > 0) {
                if (this.userinfo.Notices[0].Group) {
                    var obj = {
                        Id: 0,
                        Type: 1,
                        groupId: this.userinfo.Notices[0].Group
                    };
                } else {
                    var obj = {
                        Id: this.userinfo.Notices[0].Ids[0].Id,
                        Type: 1,
                        groupId: null
                    };
                }
                await api_隐藏公告(obj);
            } else if (this.userinfo.Ids && this.userinfo.Ids.length > 0) {
                var obj = { Id: this.userinfo.Ids[0].Id, Type: 1 };
                await api_隐藏公告(obj);
            }
            this.getUserInfo();
        }
    },
    created() {
        console.log(config.mobile_url);
        if (window.innerWidth <= 750 && config.mobile_url) {
            console.log(config.mobile_url);
            location.href = config.mobile_url
        }
    },
    mounted() {
        this.minheight = document.body.clientHeight - this.$refs.theader.clientHeight - this.$refs.bfooter.clientHeight;

        //侧边广告跟随滚动
        var imgArr = document.querySelectorAll(".侧栏");
        window.onscroll = function () {
            var val = window.pageYOffset;
            animate(imgArr[0], val + 80);
            animate(imgArr[1], val + 80);
        };
        //滑动动画封装
        function animate(ele, target) {
            var hh = document.querySelector("html").clientHeight;
            var ele_h = ele.clientHeight;
            clearInterval(ele.timer);
            ele.timer = setInterval(function () {
                var ht = document.querySelector("html").scrollTop;
                ele.style.top = (hh - ele_h) / 2 + ht + "px";
                // var step = (target - ele.offsetTop) / 10;
                // step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // ele.style.top = (ele.offsetTop + step) + "px";
                // if (Math.abs(target - ele.offsetTop) < Math.abs(step)) {
                //     ele.style.top = target + "px";
                //     clearInterval(ele.timer);
                // }
            }, 18);
        }

        var url = window.location.origin.includes("www.") ? window.location.hostname : "www." + window.location.hostname;
        this.axios.get(config.api_url + "/App_Upload/Agents/Json/" + url + ".json").then(x => {
            // this.axios.get(config.api_url + '/App_Upload/Agents/Json/www.1996996.com.json').then(x=>{
            document.title = x.data.Title;
            this.config.title = x.data.Title;
            if (x.data.Logo) {
                this.config.showlog = true;
                this.config.logo = this.config.api_url + "/App_Upload/Agents/Logo/" + x.data.Id +".png";
            }
            this.config.getConfig = 1; //1 表示获取文件成功 3 表示获取文件失败
            if (x.data.QQ) {
                this.config.qq = x.data.QQ;
            }
        }).catch(err => {
            document.title = this.config.title;
            this.config.showlog = true;
            this.config.getConfig = 3;
        });

        if (this.config.telegram && this.config.telegram.number) {
            if (this.ip) {
                var cname = this.ip.cname;
                cname = cname.toUpperCase();
                if (
                    this.config.telegram.whiteList.find(x => x.toUpperCase() == cname)
                ) {
                    this.修改state(["技术支持", true]);
                }
            } else {
                console.log("获取ip");
                $.ajax({
                    type: "get",
                    // url: "http://pv.sohu.com/cityjson?ie=utf-8",
                    url: "//pv.sohu.com/cityjson?ie=utf-8",
                    dataType: "script",
                    success: data => {
                        console.log("获取ip:", returnCitySN);
                        this.修改state(["ip", returnCitySN]);
                        var cname = returnCitySN.cname;
                        cname = cname.toUpperCase();
                        if (
                            this.config.telegram.whiteList.find(x => x.toUpperCase() == cname)
                        ) {
                            this.修改state(["技术支持", true]);
                        }
                    }
                });
            }
        }

        // window.onscroll=function(){
        //     var hh=document.querySelector()
        // }
    },
    watch: {
        userinfo() {
            if (!this.userinfo.UserId) {
                var meta = this.$route.meta;
                if (meta.需要登录) {
                    this.$router.push("/");
                }
            }
        }
    }
};
</script>

<style lang="scss">
body {
    min-width: 1200px;
    position: relative;
}
html,
body {
    height: 100%;
    margin: 0px;
    // background: #232323;
    color: #ffffff;
    background-image: url("~@/assets/image/bg1.png");

    &::-webkit-scrollbar {
        width: 12px;
        // background-color: #eee;
    }
    // &::-webkit-scrollbar-track {
    //     background-color: #eee;
    // }
    &::-webkit-scrollbar-thumb {
        background: #a8a8a8;
    }
    // &::-webkit-scrollbar-button:start {
    //     // background: url(./imgs/up.png) no-repeat;
    //     background-size: 12px 12px;
    // }
    // &::-webkit-scrollbar-button:end {
    //     // background: url(./imgs/down.png) no-repeat;
    //     background-size: 12px 12px;
    // }
}
.iconfont {
    font-size: inherit;
}
ul {
    padding: 0px;
    margin: 0px;
}
li {
    list-style: none;
}
</style>
<style lang="scss" scoped>
.侧栏 {
    position: absolute;
    z-index: 1;
    // top: 30%;
    top: calc((100vh - 400px) / 2);
    transition: all 0.5s ease-in-out;
    > div {
        cursor: pointer;
        &:not(.关闭) {
            font-size: 0px;
        }
    }
    .关闭 {
        margin: 0px auto;
        width: 0;
        height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-top: 30px solid #e9e887;
        position: relative;
        cursor: pointer;
        > div {
            position: absolute;
            top: -30px;
            left: -26px;
            margin: 0px auto;
            width: 0;
            height: 0;
            border-left: 26px solid transparent;
            border-right: 26px solid transparent;
            border-top: 26px solid #212121;
            &::after {
                content: "x";
                position: absolute;
                left: -5px;
                top: -27px;
                color: #ffffff;
            }
        }
    }
    &.左侧 {
        left: 0px;
    }
    &.右侧 {
        right: 0px;
    }
}

.系统公告 {
    /deep/ .el-dialog__header {
        text-align: center;
        background: red;
        padding-top: 10px;
        .el-dialog__title {
            color: #ffffff;
        }
        .el-dialog__headerbtn {
            top: 13px;
            .el-dialog__close {
                color: #ffffff;
            }
        }
    }

    /deep/ .el-dialog__body {
        height: 550px;
        padding-left: 0px;
        padding-right: 0px;
        overflow: auto;
        padding-top: 0px;
    }
    .iframe {
        height: 100%;
    }
    iframe {
        width: 100%;
        height: 100%;
    }
    .底部 {
        position: absolute;
        background: #cccccc;
        left: 0px;
        width: 100%;
        bottom: 0px;
        text-align: center;
        padding: 10px 0px;
    }
}

.系统Messages {
    .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
}
</style>
