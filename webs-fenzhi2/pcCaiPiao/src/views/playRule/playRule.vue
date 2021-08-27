
  <template>
    <div class="lottery">
        <div class="container">
            <div class="面包屑导航">
                <span>
                    <router-link to="/">首页</router-link>
                </span>>
                <span>玩法规则</span>
            </div>
            <div class="content_list">
                <div class="width_3">
                    <div class="titleAll">
                        <span class="iconfont icon-caipiao"></span>
                        <span class="title">所有彩票</span>
                    </div>
                    <ul class="游戏列表">
                        <li @click="选择类型(item)" :class="{'active':id==item.id,'activeTow':id==item.id}" v-for="(item, index) in 游戏列表" :key="index">
                            <span>{{item.name}}</span>

                            <div class="triangle-all"></div>
                            <ul v-if="item.children.length>0">
                                <li @click="选择类型2(item,item_1)" v-for="(item_1, index1) in item.children" :key="index1">{{item_1.name}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="width_21">
                    <!-- <yxgz /> -->
                    <router-view :is="yxgz" :name="name" :type="type" :img="img"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
// const  ssc = () =>import('@/components/游戏规则/时时彩游戏规则.vue')
export default {
    data() {
        return {
            app滚动条位置: 0,
            游戏列表: [],
            id: "",
            name: "",
            type: "",
            yxgz: "",
            img: "",
        };
    },
    created() {
        var idNum = this.$route.query.idNum
        var id = this.$route.query.id
        this.id = id
        this.id = idNum
        console.log(this.id)

        this.goTop()
        var this_1 = this
        $(document).scroll(function (e) {
            this_1.app滚动条位置 = $(this).scrollTop();
        })

    },
    methods: {
        goTop() {
            $('body,html').animate({ scrollTop: 0 }, 0);
        },

        选择类型(item) {
            console.log(item);
            if (item.children.length == 0) {
                this.$router.push("?id=" + item.id);
                this.id = item.id;
                this.name = item.name;
                this.img = item.imgurl;
                this.type = "";
            }
        },
        选择类型2(item, item_2) {
            this.name = item.name;
            this.img = item.imgurl;
            this.id = item.id;
            if (item_2.type) {
                this.$router.push("?id=" + item.id + "&type=" + 2);
                this.type = 2;
            } else {
                this.type = "";
                this.$router.push("?id=" + item.id);
            }
        },
        设置显示模块() {
            console.log(this.id.substring(0, 2));
            var id = this.id.substring(0, 2);
            this.yxgz = "";
            if (id == 10) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/时时彩游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/时时彩信用玩法.vue");
                }
            } else if (id == 20) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/PK拾游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/PK拾信用玩法.vue");
                }
            } else if (id == 30) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/3D游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/3D信用玩法.vue");
                }
            } else if (id == 40) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/快三游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/快三信用玩法.vue");
                }
            } else if (id == 50) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/28游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/28信用玩法.vue");
                }
            } else if (id == 60) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/11选5游戏规则.vue");
                } else {
                    this.yxgz = () => import("@/components/游戏规则/11选5信用玩法.vue");
                }
            } else if (id == 70) {
                if (!this.type) {
                    this.yxgz = () => import("@/components/游戏规则/六合彩游戏规则.vue");
                } else {
                    // this.yxgz = "";
                     this.yxgz = () => import("@/components/游戏规则/六合彩游戏规则.vue");
                }
            } else {
                this.yxgz = "";
            }
            $("#app").animate({ scrollTop: 0 }, 100);
        }
    },

    mounted() {
        this.id = this.$route.query.id ? this.$route.query.id : ""; //页面刷新时根据id来加载
        this.type=this.$route.query.type ? this.$route.query.type : "";//页面刷新时还要根据type来加载

        this.axios.get("json/LotteryList.json").then(x => {
            this.游戏列表 = x.data;
            if (!this.id) { //如果没有id 也就是窗口一加载进来得时候 //没有点击 也就是没有加载数据
                this.id = x.data[0].id; //默认显示第一个id
                this.img = x.data[0].imgurl; //默认显示第一个img
                this.name = x.data[0].name;//默认显示第一个名字
            } else {
                var obj = x.data.find(e => e.id == this.id);
                this.name = obj ? obj.name : "";
                this.img = obj ? obj.imgurl : ''; //默认显示第一个img
            }
            this.设置显示模块();
        }).catch(err => {
            console.log(err);
        });
    },
    watch: {
        $route() {
            console.log("路由发生改变");
            this.设置显示模块();
        }
    }
};
</script>

<style lang="scss" scoped>
.active {
    width: 130px;
    height: 35px;
    background: #ff7f00;
    color: #fff;
    border-radius: 2px;
    .triangle-all {
        display: inline !important;
    }
}
.lottery {
    .container {
        .面包屑导航 {
            height: 42px;
            background: #f6f6f6;
            padding-left: 10px;
            margin-bottom: 20px;
            span:hover {
                text-decoration: underline;
            }
            span {
                height: 42px;
                line-height: 42px;
                font-size: 14px;
                margin-right: 4px;
                a {
                    color: #000000;
                    font-size: 14px;
                }
            }
        }
        .content_list {
            display: flex;
            align-items: flex-start;
            .width_3 {
                border: 1px solid #ff7f00;
                background-color: #fef7f4;
                width: 130px;
                margin-right: 16px;
                // border-radius: 4px;
                .titleAll {
                    height: 36px;
                    background: #ffe3cf;
                    font-size: 14px;
                    padding-left: 46px;
                    position: relative;
                    .icon-caipiao {
                        color: #ff7f00;
                        font-size: 22px;
                        position: absolute;
                        left: 20px;
                        top: 8px;
                        text-align: center;
                    }
                    .title {
                        line-height: 36px;
                    }
                }
                .游戏列表 {
                    li:hover {
                        width: 131px;
                        background: #ff7f00;
                        color: #fff;
                        border-radius: 2px !important;
                    }
                    li:hover .triangle-all {
                        display: inline;
                    }
                    li {
                        position: relative;
                        text-align: center;
                        height: 36px;
                        line-height: 36px;
                        font-size: 14px;
                        .triangle-all {
                            width: 0;
                            height: 0;
                            border-width: 18px;
                            border-style: solid;
                            border-color: transparent transparent transparent
                                #ff7f00; /* 红 黄 蓝 绿 */
                            position: absolute;
                            top: 0px;
                            left: 130px;
                            display: none;
                            border-radius: 5px;
                        }
                        > ul {
                            position: absolute;
                            width: 80px !important;
                            left: 147px;
                            top: -18px;
                            display: none;
                            color: #fff;
                            li:hover {
                                text-decoration: underline;
                                background-color: rgb(253, 184, 114);
                                width: 80px !important;
                            }
                            li::after {
                                position: absolute;
                                content: "";
                                transition: all 0.3s;
                                width: 0px;
                                height: 90%;
                                left: 0px;
                                top: 5%;
                                background: red;
                            }
                            li {
                                background: #ff7f00;
                                //    margin-bottom: 1px;
                            }
                        }
                    }
                    li:hover {
                        > ul {
                            display: block;
                        }
                    }
                }
            }
            .width_21 {
                width: 880px;
                border: 1px solid #ff7f00;
                background: #fffdfa;
            }
        }
    }
}
</style>