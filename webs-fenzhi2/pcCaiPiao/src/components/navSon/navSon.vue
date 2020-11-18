<template>
<!-- nav导航栏左侧 hove菜单 -->
<div class="hover_nav">
    <ul class="ul_type">
        <li v-for="(item,index) in SonList.Sontop" :class="{官信:item.gf}">
            <div class="title_box_img"><img :src="item.img"></div>
            <div class="title_name">
                <a :href="item.titleA ? item.titleA : 'javascript:;'"> <span class="title_name_a">{{item.name}}</span></a>
            </div>
            <div class="wfruls">
                <div v-if="item.xy"><a :href="item.xy">{{item.textXY}}</a></div>
                <div v-if="item.gf"><a :href="item.gf">{{item.textGF}}</a></div>
                <div v-if="!item.gf"><a :href="item.titleA">{{item.text}}</a></div>
            </div>
        </li>
    </ul>

    <div class="lottery_classify">
        <ul class="bottom_ul">
            <li :class="item.Son_li" v-for="(item,index) in SonList.Sonbottom">
                <el-row>
                    <el-col :span="5">
                        <div class="classify_left red" :style="{background:item.Bcolor,color:item.Fcolor}">{{item.name}}</div>
                    </el-col>
                    <el-col :span="16">
                        <ul class="classify_centter">
                            <li v-for="(item1,index) in item.title"><a :href="item1.href">{{item1.sonname}}</a></li>
                        </ul>
                    </el-col>

                    <el-col :span="2"><i :class="item.icon"></i></el-col>
                </el-row>
                <div :class="item.classactive">
                    <h3 v-if="item.hoverSon">{{item.hoverSon.hoverSonTitle}}</h3>
                    <ul v-if="item.hoverSon && item.hoverSon.length>0">
                        <li v-for="(item2,index) in item.hoverSon[0].hoverSontext">
                            <a :href="item2.hoverSonHref">{{item2.hoverSonName}}</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="AllType" @click="全部彩种()">全部彩种&nbsp;>></div>

    </div>

</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            dataconfig: {
                api_urlData: config.api_url //api_url
            },
            selectLab: "/", //默认路径  
            headerNavSon: false,
            SonList: {
                Sonbottom: [{
                        name: "高频彩",
                        icon: "el-icon-arrow-right",
                        Bcolor: "#FFCDCD",
                        Fcolor: "#FF0000",
                        Son_li: "trueSon",
                        classactive: "hover_son",
                        title: [{
                                sonname: "极速PK拾",
                                href: config.api_url + "/Lottery/Bet/Index/1/20000"
                            },
                            {
                                sonname: "分分时时彩",
                                href: config.api_url + "/Lottery/Bet/Index/1/10001"
                            },
                            {
                                sonname: "五分PK拾",
                                href: config.api_url + "/Lottery/Bet/Index/1/20004"
                            },
                            {
                                sonname: "三分时时彩",
                                href: config.api_url + "/Lottery/Bet/Index/1/10000"
                            },
                        ],
                        hoverSon: [{
                            hoverSonTitle: "高频彩（官方玩法）",
                            hoverSontext: [{
                                    hoverSonName: "极速六合彩",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/70000"
                                },
                                {
                                    hoverSonName: "极速PK拾",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/20000"
                                },
                                {
                                    hoverSonName: "三分时时彩",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/10000"
                                },
                                // {
                                //     hoverSonName: "北京PK拾",
                                //     hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/20001"
                                // },
                                // {
                                //     hoverSonName: "重庆时时彩",
                                //     hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/10002"
                                // },
                                {
                                    hoverSonName: "山东11选5",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/60000"
                                },

                                {
                                    hoverSonName: "新幸运飞艇",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/20005"
                                }, {
                                    hoverSonName: "极速PK10",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/20000"
                                }, {
                                    hoverSonName: "五分PK拾",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/20004"
                                }, {
                                    hoverSonName: "分分快3",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/40004"
                                },
                                {
                                    hoverSonName: "极速3D",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/30002"
                                },
                                {
                                    hoverSonName: "广东11选5",
                                    hoverSonHref: config.api_url + "/Lottery/Bet/Index/1/60001"
                                },

                            ]
                        }]

                    },
                    {
                        name: "低频彩",
                        Bcolor: "#dce5ff",
                        Fcolor: "#0040ff",
                        Son_li: "falseSon",
                        // classactive:"hover_son",
                        title: [{
                                sonname: "排列三",
                                href: config.api_url + "/Lottery/Bet/Index/1/30000"
                            },
                            {
                                sonname: "福彩3D",
                                href: config.api_url + "/Lottery/Bet/Index/1/30001"
                            },
                            {
                                sonname: "香港六合彩",
                                href: config.api_url + "/Lottery/Bet/Index/1/70001"
                            },
                            {
                                sonname: "澳门六合彩",
                                href: config.api_url + "/Lottery/Bet/Index/1/70002"
                            },

                        ],
                    }
                ],

                Sontop: [
                    {
                        name: "香港六合彩",
                        img: config.api_url + "/Areas/Lottery/Content/img/70001.png",
                        titleA: config.api_url + "/Lottery/Bet/Index/1/70001",
                        // gf: config.api_url + "/Lottery/Bet/Index/1/70001",
                        // xy: config.api_url + "/Lottery/Bet/Index/2/70001",
                        // textGF: "",
                        // textXY: "",
                        text: "每周3期"
                    },{
                        name: "澳门六合彩",
                        img: config.api_url + "/Areas/Lottery/Content/img/70002.png",
                        titleA: config.api_url + "/Lottery/Bet/Index/1/70002",
                        // gf: config.api_url + "/Lottery/Bet/Index/1/70002",
                        // xy: config.api_url + "/Lottery/Bet/Index/2/70002",
                        // textGF: "",
                        // textXY: "",
                        text: "每天1期"
                    },{
                        name: "五分PK拾",
                        img: config.api_url + "/Areas/Lottery/Content/img/20004.png",
                        gf: config.api_url + "/Lottery/Bet/Index/1/20004",
                        xy: config.api_url + "/Lottery/Bet/Index/2/20004",
                        textGF: "官方",
                        textXY: "信用"
                    },{
                        name: "分分时时彩",
                        img: config.api_url + "/Areas/Lottery/Content/img/10001.png",
                        gf: config.api_url + "/Lottery/Bet/Index/1/10001",
                        xy: config.api_url + "/Lottery/Bet/Index/2/10001",
                        textGF: "官方",
                        textXY: "信用"
                    },{
                        name: "威尼斯飞艇",
                        img: config.api_url + "/Areas/Lottery/Content/img/20003.png",
                        gf: config.api_url + "/Lottery/Bet/Index/1/20003",
                        xy: config.api_url + "/Lottery/Bet/Index/2/20003",
                        textGF: "官方",
                        textXY: "信用"
                    },{
                        name: "新幸运飞艇",
                        img: config.api_url + "/Areas/Lottery/Content/img/20005.png",
                        gf: config.api_url + "/Lottery/Bet/Index/1/20005",
                        xy: config.api_url + "/Lottery/Bet/Index/2/20005",
                        textGF: "官方",
                        textXY: "信用"
                    },{
                        name: "极速六合彩",
                        img: config.api_url + "/Areas/Lottery/Content/img/70000.png",
                        titleA: config.api_url + "/Lottery/Bet/Index/1/70000",
                        // gf: config.api_url + "/Lottery/Bet/Index/1/70000",
                        // xy: config.api_url + "/Lottery/Bet/Index/2/70000",
                        // textGF: "官方",
                        // textXY: "信用"
                        text:"5分钟一期"
                    },{
                        name: "台湾六合彩",
                        img: config.api_url + "/Areas/Lottery/Content/img/70003.png",
                        titleA: config.api_url + "/Lottery/Bet/Index/1/70003",
                        // gf: config.api_url + "/Lottery/Bet/Index/1/70000",
                        // xy: config.api_url + "/Lottery/Bet/Index/2/70000",
                        // textGF: "官方",
                        // textXY: "信用"
                        text:"每周2期"
                    },

                    // {
                    //     name: "重庆时时彩",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/10002.png",
                    //     gf: config.api_url + "/Lottery/Bet/Index/1/10002",
                    //     xy: config.api_url + "/Lottery/Bet/Index/2/10002",
                    //     textGF: "官方",
                    //     textXY: "信用"
                    // },
                    // {
                    //     name: "五分PK拾",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/20004.png",
                    //     gf: config.api_url + "/Lottery/Bet/Index/1/20004",
                    //     xy: config.api_url + "/Lottery/Bet/Index/2/20004",
                    //     textGF: "官方",
                    //     textXY: "信用"
                    // },
                    // {
                    //     name: "新幸运飞艇",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/20005.png",
                    //     gf: config.api_url + "/Lottery/Bet/Index/1/20005",
                    //     xy: config.api_url + "/Lottery/Bet/Index/2/20005",
                    //     textGF: "官方",
                    //     textXY: "信用"
                    // },
                    // {
                    //     name: "北京PK拾",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/20001.png",
                    //     gf: config.api_url + "/Lottery/Bet/Index/1/20001",
                    //     xy: config.api_url + "/Lottery/Bet/Index/2/20001",
                    //     textGF: "官方",
                    //     textXY: "信用"
                    // },
                    // {
                    //     name: "极速六合彩",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/70000.png",
                    //     titleA: config.api_url + "/Lottery/Bet/Index/1/70000",
                    //     gf: "",
                    //     xy: "",
                    //     text: "5分钟1期"
                    // },
                    // {
                    //     name: "香港六合彩",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/70001.png",
                    //     titleA: config.api_url + "/Lottery/Bet/Index/1/70001",
                    //     gf: "",
                    //     xy: "",
                    //     text: "每周3期"
                    // },
                    // {
                    //     name: "澳门六合彩",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/70002.png",
                    //     titleA: config.api_url + "/Lottery/Bet/Index/1/70002",
                    //     gf: "",
                    //     xy: "",
                    //     text: "每天1期"
                    // },
                    // {
                    //     name: "台湾六合彩",
                    //     img: config.api_url + "/Areas/Lottery/Content/img/70003.png",
                    //     titleA: config.api_url + "/Lottery/Bet/Index/1/70003",
                    //     gf: "",
                    //     xy: "",
                    //     text: "每周2期"
                    // },

                ],
            },

        }
    },
    computed: {
        ...mapState({
            显示子菜单: "显示子菜单"
        }),
        route_1() {
            return this.$route
        }
    },
    methods: {
        全部彩种() {
            window.open(this.dataconfig.api_urlData + "/Lottery/Home/Index/2")
        }
    },
    //解决导航激活样式刷新后自动套到首页的问题
    watch: { //this.$route.path 代表当前路由状态
        $route(to, from) {
            console.log(this.selectLab)
            if (this.selectLab == '/') {
                this.selectLab = this.$route.path
                this.headerNavSon = true;
            } else {
                this.headerNavSon = false;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.container_left {
    background: #ffffff;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10px;
    display: none !important;
    width: 240px;

    // hover菜单
    .hover_nav {
        background: #ffffff;
        // background:#5607eb;
        border: 2px solid #da1b25;
        border-top: none;
        width: 240px;
        padding: 4px 0px 0px 0px;

        //hover菜单上半部分开始
        ul {
            background: #ffffff;

            .官信 {
                &:hover {
                    .title_name {
                        width: 0px;
                    }
                }

                .wfruls {
                    cursor: pointer;

                    div {
                        transition: all 0.2s;
                    }

                    div:hover {
                        transform: scale(1.2);
                    }
                }
            }

            li {
                padding: 4px 0px 4px 0px !important;
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 20 !important;
                background: #ffffff !important;
                align-items: center;

                .title_box_img {
                    // width: 46px;  
                    width: 39px;
                    height: 39px;
                    border-radius: 50%;
                    margin-left: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .title_name {
                    transition: all 0.3s;
                    white-space: nowrap;
                    overflow: hidden;
                    color: #333333;
                    font-weight: 400;
                    font-size: 16px;
                    // line-height: 46px;
                    margin: 0px 0px 0px 10px;
                    text-align: left;
                    width: 85px;

                    a {
                        color: #333333;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 27px;

                        /deep/ span {
                            text-align: left !important;
                        }

                        span:hover {
                            text-decoration: underline;
                        }
                    }
                }

                .wfruls {
                    flex: 1;
                    display: flex;
                    justify-content: flex-start;
                    padding-top: 8px;
                    text-align: center;
                    padding: 0px 15px 0px 0px;
                    align-items: center;

                    div:nth-child(1) {
                        background: red;
                    }

                    div:nth-child(2) {
                        background: rgb(3, 164, 238);
                    }

                    div {
                        flex: 1;
                        text-align: center;
                        font-size: 14px;
                        font-weight: 500;
                        // min-width:34px;
                        height: 27px;
                        line-height: 27px;
                        color: #fff;

                        a {
                            display: block;
                            width: 100%;
                            height: 100%;
                            color: #fff;
                        }
                    }
                }
            }
        }

        //hover菜单上半部分结束

        //hover菜单下半部分开始
        .lottery_classify {
            .bottom_ul {

                //  border-left:none !important;
                .trueSon:hover .hover_son {
                    color: #ccc;
                    display: block;
                    z-index: 10;
                }

                .trueSon:hover {
                    border-top: 2px solid #f89b9b;
                    border-bottom: 2px solid #f89b9b;
                    border-right: none;
                    border-left: none;

                    &::after {
                        position: absolute;
                        width: 4px;
                        height: 100%;
                        background: #fff;
                        top: 0px;
                        right: -3px;
                        content: "";
                        z-index: 11;
                    }
                }

                .trueSon {
                    height: 90px;
                    // background: red;
                    box-sizing: border-box;
                    padding: 0px;

                    .el-row {
                        padding: 5px 0px;
                    }
                }

                .falseSon {
                    border-bottom: 1px dashed #ccc;
                }

                .falseSon,
                .trueSon {
                    z-index: 4;
                    position: relative;
                    font-size: 14px;
                    background: #ffffff;
                    border-top: 1px dashed #ccc;

                    .el-row {
                        width: 100%;

                        .red {
                            background: rgb(168, 19, 19);
                            color: #e94335;
                        }

                        .green {
                            background: #d9f9df;
                        }

                        .blue {
                            background: #dce5ff;
                            color: #0040ff;
                        }

                        .classify_left {
                            padding-top: 3px;
                            margin-left: 10px;
                            width: 26px;
                            height: 60px;
                            border-radius: 6px;
                            font-size: 14px;
                            text-align: center;
                        }

                        .classify_centter {
                            padding-top: 6px;
                            border-left: none;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;

                            // align-items:
                            li {
                                margin-right: 10px;
                                width: 70px;
                                // height:20px;
                                background: goldenrod;

                                a:hover {
                                    text-decoration: underline;
                                }

                                a {
                                    text-align: right;
                                    font-size: 14px;
                                    color: #666666;
                                }
                            }
                        }

                        .el-col-2 {
                            padding-top: 20px;

                            // padding-left: 8px;
                            .el-icon-arrow-right {
                                font-size: 20px;
                                font-weight: 600;
                                color: #666666;
                            }
                        }
                    }
                }

                .hover_son {
                    padding-left: 20px;
                    display: none;
                    position: absolute;
                    top: -2px;
                    left: 240px;
                    background: #fff;
                    z-index: 1;
                    width: 734px;
                    height: 86px;
                    border: 2px solid #f89b9b;

                    h3 {
                        color: #666666;
                    }

                    ul {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            width: 12%;
                            border-top: none;

                            a:hover {
                                color: red;
                                text-decoration: underline;
                            }

                            a {
                                color: #666666;
                            }
                        }
                    }
                }
            }

            .AllType {
                width: 100%;
                height: 44px;
                //  background: gold;
                text-align: center;
                line-height: 44px;
                color: #666666;
                border-left: none;
                font-size: 14px;
            }
        }
    }
}
</style>
