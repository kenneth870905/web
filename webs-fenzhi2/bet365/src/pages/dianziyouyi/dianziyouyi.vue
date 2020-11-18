<template>
    <div>
        <Header />
        <div class="bg">
            <div class="dainyiyouyi w1000">
                <img src="static/dianziyouyi/181011072258.jpg" alt />
            </div>
            <div class="slot_header w1000">
                <ul>
                    <li @click="设置选中(item)" :class="{active:item==当前选中}" v-for="(item,key,index) in res" :key="index">
                        <span class="s_h_ico s_h_ico_CQ" :style="'background: url(static/dianziyouyi/'+key.toLowerCase()+'-1.png) no-repeat center'"></span>
                        <span class="s_h_name">{{item.name}}</span>
                    </li>
                    <div class="cb"></div>
                </ul>
            </div>
            <!--  -->
            <div class="slot_body">
                <!--    搜索栏-->
                <div class="slot_banner">
                    <div class="slot_banner_in hb-logo w1000">
                        <div class="slot_search hb-color">
                            <input type="text" name="keyWord" v-model="过滤名称" class="slot_input" />
                            <input type="submit" class="slot_sub" value="" style="color:yellow;width:40px;" />
                        </div>
                        <div class="cb"></div>
                    </div>
                </div>
                <!--    分类-->
                <div class="slot_menu2 hb-color w1000">
                    <div class="slot_menu2_text">游戏分类：</div>
                    <div class="slot_menu2_list" @click="选中类型='-1'">
                        <a :class="{'cur':选中类型=='-1'}">全部</a>
                    </div>
                    <div class="slot_menu2_list" @click="选中类型=index" v-for="(item1,index) in 当前选中.type" :key="index">
                        <a @click="当前选中" :class="{'cur':选中类型==index}">{{item1}}</a>
                    </div>
                </div>
                <div class="clear"></div>

                <!--    全部游戏-->
                <div class="splite_title hb-border w1000">
                    <span class="hb-color">全部游戏</span>
                    <span style="float: right;"></span>
                </div>
                <div class="newgame_main w1000">
                    <div class="newgame_inner">
                        <ul id="allgames" class="gamenewslots">
                            <li class="hb" v-for="(x,index) in 新数据" :key="index">
                                <div class="slotliitem">
                                    <div class="picbox">
                                        <a href="javascript:;">
                                            <img class="pic" :src="'static/dianziyouyi/'+当前选中.cname.toLowerCase()+'/'+x.id+当前选中.img " />
                                            <!-- <img class="pic" :src="'static/dianziyouyi/'+当前选中.cname.toLowerCase()+'/'+x.id+当前选中.img " /> -->
                                        </a>
                                    </div>
                                    <div class="titlebox">
                                        <a href="javascript:;" target="_blank">{{x.title}}</a>
                                    </div>
                                    <div class="pthvbg">
                                        <a href="javascript:;" target="_blank"></a>
                                    </div>
                                    <a href="javascript:;" @click="设置游戏(x.type,x.title,x.gid)" class="gameinto animated bounceIn">进入游戏</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <Fotter />
        </div>
    </div>
</template>

<style scoped>
.dz_logo {
    position: relative;
    left: 450px;
}
.dainyiyouyi img{
    width: 100%;
}
.bg {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
}
.slot_header {
    background: #272727;
    border: 1px solid #363636;
    border-radius: 5px;
    margin: 5px auto;
    box-sizing: border-box;
    position: relative;
    padding: 5px;
}
.slot_header ul {
    margin: 0;
    padding: 0;
}
.slot_header ul li {
    list-style: none;
    width: 76px;
    height: 100%;
    float: left;
    border-radius: 10px;
}
.slot_header ul li.active {
    background: #fff;
}
.slot_header ul li .gamenav {
    width: 67px;
    display: block;
    height: 54px;
    margin: 2px auto;
    border-radius: 5px;
}
.slot_header ul li.cur .gamenav,
.slot_header ul li:hover .gamenav {
    background: #fff;
}
.slot_header ul li .s_h_ico {
    margin-top: 2px;
    width: 100%;
    height: 43px;
    display: inline-block;
}
.slot_header ul li .s_h_name {
    width: 100%;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    display: inline-block;
    font-size: 12px;
    color: red;
}
.slot_header ul li.cur .s_h_name,
.slot_header ul li:hover .s_h_name {
    color: #000;
}
.slot_body {
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
}
/*  */
gamenewslots li {
    position: relative;
    display: block;
    float: left;
    width: 190px;
}
#allgames li {
    box-sizing: border-box;
    padding: 5px;
    float: left;
    width: calc(100% / 6);
}
.gamenewslots li .slotliitem {
    position: relative;
    width: 179px;
    margin: 0 auto;
    border: 1px solid #7f7f7c;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #2f2e2e;
    padding: 7px;
}
.gamenewslots li .picbox {
    margin: 0px auto;
    background: #0a0111;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
}
.gamenewslots li .picbox img.pic {
    width: 100%;
    height: 100%;
}
.gamenewslots li .picbox div.pic {
    width: 100%;
    height: 100%;
}

.gamenewslots li .titlebox {
    height: 35px;
    margin: 0 auto;
    text-align: center;
    border-radius: 5px;
    background-color: #171717;
    margin-top: 5px;
}
.gamenewslots li .titlebox a {
    line-height: 35px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
}
.gamenewslots li .pthvbg {
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000000;
    filter: alpha(opacity=80);
    -moz-opacity: 0.8;
    -khtml-opacity: 0.8;
    opacity: 0.8;
    z-index: 3;
}
.gamenewslots li:hover .pthvbg a {
    display: block;
    width: 100%;
    height: 100%;
}

.gamenewslots li:hover .pthvbg {
    display: block;
}
.gamenewslots li .gameinto {
    display: none;
    width: 102px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    font-size: 17px;
    font-family: "微软雅黑";
    background: url() no-repeat;
    position: absolute;
    z-index: 5;
    color: #ffffff;
    top: 85px;
    left: 33px;
}
.gamenewslots li:hover .gameinto {
    display: block;
    color: #ff0;
}
.g_all_game_loaded {
    display: none;
    text-align: center;
    color: #fff;
}
.g_loading {
    display: none;
    text-align: center;
    color: #fff;
}

/* .s_h_ico_CQ {
  background: url("../../assets/dianziyouyi/cq9.png") no-repeat center top;
} */
/* .cq-logo { background:url(logo/cqLogo.png) no-repeat 30px center; } */
.cq-color {
    background-color: #d69324;
}
.cq-border {
    border-color: #d69324;
}
.gamenewslots li.cq .picbox {
    height: 159px;
}

.s_h_ico_FG {
    background: url("../../assets/dianziyouyi/fg.png") no-repeat center top;
}
/* .fg-logo { background:url(logo/fgLogo.png) no-repeat 30px center; } */
.fg-color {
    background-color: #c8236a;
}
.fg-border {
    border-color: #c8236a;
}
.gamenewslots li.fg .picbox {
    height: 156px;
}

.s_h_ico_MG {
    background: url("../../assets/dianziyouyi/mg.png") no-repeat center top;
}
/* .mg-logo { background:url(logo/mgLogo.png) no-repeat 30px center; } */
.mg-color {
    background-color: #219d8e;
}
.mg-border {
    border-color: #219d8e;
}
.gamenewslots li.mg .picbox {
    width: 145px;
    height: 136px;
    background: #fff;
}
.gamenewslots li.mg .titlebox {
    width: 145px;
}
.gamenewslots li.mg .picbox div.pic {
    background-position: 0px 0px;
}
.gamenewslots li.mg .picbox div.pic:hover {
    background-position: -145px 0px !important;
}

.s_h_ico_MP {
    background: url("../../assets/dianziyouyi/mg.png") no-repeat center top;
}
/* .mp-logo { background:url(logo/mpLogo.png) no-repeat 30px center; } */
.mp-color {
    background-color: #219d8e;
}
.mp-border {
    border-color: #219d8e;
}
.gamenewslots li.mp .picbox {
    width: 145px;
    height: 136px;
    background: #fff;
}
.gamenewslots li.mp .titlebox {
    width: 145px;
}
.gamenewslots li.mp .picbox div.pic {
    background-position: 0px 0px;
}
.gamenewslots li.mp .picbox div.pic:hover {
    background-position: -145px 0px !important;
}

.s_h_ico_PT {
    background: url("../../assets/dianziyouyi/pt.png") no-repeat center top;
}
/* .pt-logo { background:url(logo/ptLogo.png) no-repeat 30px center; } */
.pt-color {
    background-color: #bfb908;
}
.pt-border {
    border-color: #bfb908;
}
.gamenewslots li.pt .picbox {
    height: 136px;
}

.s_h_ico_YG {
    background: url("../../assets/dianziyouyi/dt.png") no-repeat center top;
}
/* .yg-logo { background:url(logo/ygLogo.png) no-repeat 30px center; } */
.yg-color {
    background-color: #0d9c0c;
}
.yg-border {
    border-color: #0d9c0c;
}
.gamenewslots li.yg .picbox {
    height: 120px;
}

.s_h_ico_HB {
    background: url("../../assets/dianziyouyi/hb.png") no-repeat center top;
}
.hb-logo {
    background: url(../../assets/dianziyouyi/hbLogo.png) no-repeat 30px center;
}
.hb-color {
    background-color: #c54d3d;
}
.hb-border {
    border-color: #c54d3d;
}
.gamenewslots li.hb .picbox {
    height: 156px;
}

.s_h_ico_DT {
    background: url("../../assets/dianziyouyi/sw.png") no-repeat center top;
}
/* .dt-logo { background:url(logo/dtLogo.png?v=1) no-repeat 30px center;  } */
.dt-color {
    background-color: #618f9e;
}
.dt-border {
    border-color: #618f9e;
}
.gamenewslots li.dt .picbox {
    height: 180px;
}

.s_h_ico_SW {
    background: url("../../assets/dianziyouyi/sw.png") no-repeat center top;
}
/* .sw-logo { background:url(logo/swLogo.png) no-repeat 30px center; } */
.sw-color {
    background-color: #2489b2;
}
.sw-border {
    border-color: #2489b2;
}
.gamenewslots li.sw .picbox {
    height: 159px;
}

.s_h_ico_VT {
    background: url("../../assets/dianziyouyi/vt.png") no-repeat center top;
}
/* .vt-logo { background:url(logo/vtLogo.png) no-repeat 30px center; } */
.vt-color {
    background-color: #8c2f07;
}
.vt-border {
    border-color: #8c2f07;
}
.gamenewslots li.vt .picbox {
    height: 156px;
}

.s_h_ico_MW {
    background: url("../../assets/dianziyouyi/mw.png") no-repeat center top;
}

.s_h_ico_BG {
    background: url("../../assets/dianziyouyi/bbin.png") no-repeat center top;
}

.s_h_ico_BY {
    background: url("../../assets/dianziyouyi/ag.png") no-repeat center top;
}
/*  */

.slot_banner {
    height: 60px;
    margin-top: 1px;
}
.slot_banner_in {
    height: 70px;
}
.slot_search {
    float: right;
    margin-top: 16px;
    margin-right: 50px;
    padding: 3px;
    height: 24px;
}
.slot_search input {
    height: 100%;
}
.slot_input {
    float: left;
    padding-left: 5px;
    width: 149px;
    height: 25px;
    line-height: 25px;
    background: #ffffff;
    border: 0px;
    color: #333333;
}
.slot_sub {
    background: url(../../assets/dianziyouyi/search.png) no-repeat center center;
    border: 0px;
    margin-left: 5px;
    cursor: pointer;
    height: 25px;
}

.slot_menu2 {
    height: 40px;
    background: #1f1f1f;
    position: relative;
    background: red;
}
.slot_menu2_text {
    float: left;
    width: 100px;
    line-height: 40px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
}
.slot_menu2_list {
    float: left;
    padding-top: 5px;
}
.slot_menu2 .slot_menu2_list a {
    float: left;
    display: block;
    width: 83px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin-right: 5px;
}
.slot_menu2 .slot_menu2_list a:hover,
.slot_menu2 .slot_menu2_list a.cur {
    background: #fff;
    color: #000;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    font-size: 12px;
}

.splite_title {
    height: 30px;
    border-bottom: 3px solid;
    margin: 10px auto 0;
}
.splite_title span {
    display: inline-block;
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.newgame_main,
.tuijian_main {
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    padding: 10px 0px;
    background: #262626;
    position: relative;
}


.tuijianhd {
    margin: 15px auto 0;
}
.tuijianhd ul {
    display: block;
    text-align: center;
}
.tuijianhd ul li {
    list-style: none;
    margin: 0 5px;
    height: 14px;
    overflow: hidden;
    width: 14px;
    background: #999;
    cursor: pointer;
    border-radius: 50%;
    display: inline-block;
    zoom: 1;
}
.tuijianhd ul .on {
    background-position: 0 0;
    background: #eb5502;
}
.tj_prev,
.tj_next {
    line-height: 35px;
    text-align: center;
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    font-size: 26px;
    color: #fff;
    opacity: 0.8;
}
.tj_prev {
    left: 10px;
    top: 100px;
}
.tj_next {
    right: 10px;
    top: 100px;
}
.tj_prev:hover,
.tj_next:hover {
    opacity: 1;
}
/*  */

.s_h_ico_HB {
    background: url(../../assets/dianziyouyi/hbLogo.png) no-repeat center top;
}
.hb-logo {
    background: url() no-repeat 30px center;
}
.hb-color {
    background-color: #c54d3d;
}
.hb-border {
    border-color: #c54d3d;
}
.gamenewslots li.hb .picbox {
    height: 156px;
}
</style>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
import axios from "axios";

import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            active: 2,
            res: {},
            当前选中: {},
            选中类型: "-1", //'' 表示全部
            过滤名称: ""
        };
    },
    computed: {
        ...mapState({
            待进入游戏: "待进入游戏",
            userInfo: "userInfo"
        }),
        新数据() {
            var list = [];
            if (this.选中类型 == "-1") {
                list = this.当前选中.game;
            } else {
                list = this.当前选中.game.filter(x => x.type == this.选中类型);
            }
            if (this.过滤名称) {
                list = list.filter(x => x.title.includes(this.过滤名称));
            }
            return list;
        },
    },
    mounted() {
        this.list();
    },
    methods: {
        dowm(index) {
            //将点击的元素的索引赋值给变量
            this.active = index
        },
        选择游戏(key) {
            this.activeName = key;
            this.过滤名称 = "";
            this.过滤类型 = {
                type: "",
                name: "选择游戏类型"
            };
        },

        ...mapActions({
            设置待进入游戏: "设置待进入游戏"
        }),
        设置选中(item) {
            this.当前选中 = item;
            this.选中类型 = "-1";
        },
        设置游戏(type, name, id) {
            var obj = {
                name: name,
                type: type,
                id: id,
                金额: 0
            };
            this.设置待进入游戏(obj);
            if (!this.userInfo.UserId) {
                this.$message({
                    message: "请登录",
                    type: "warning"
                });
            }
        },
        list() {
            this.$axios.get("static/webConfig/delist.json").then(x => {
                //console.log(x.data);
                this.res = x.data;
                var keyarr = Object.keys(this.res);
                this.当前选中 = this.res[keyarr[0]];
            });
        }
    },
    components: {
        // 注册组件
        Header,
        Fotter
    }
};
</script>
 