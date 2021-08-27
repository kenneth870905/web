<template>
    <div style="background-image:url('image/index/bg.jpg'); 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;">
        <!-- 主页顶部 -->
        <van-sticky>
            <div class="home_header">
                <img src="webConfig/image/logo.jpg" alt />
                <span v-if="!userInfo.UserId">
                    <button class="btn1" @click="试玩()" style="margin-right:10px;">试玩</button>
                    <button class="btn1" @click="注册()">注册</button>
                    <button class="btn1" @click="登录()" style="margin-right:10px;">登录</button>
                </span>
                <div style="float:right; color:#ffffff; margin-top:10px; margin-right:10px;">
                    <div @click="showPopup" class="lachu" v-if="userInfo.UserId">
                        <router-link to="/my">
                            <i class="fa fa-user" style="font-size:18px; margin: 8px 5px 0 0;color: white;">{{userInfo.UserId}}</i>
                        </router-link>
                        <i class="fa fa-bars" style="font-size: 30px; margin: 0px 2px 0px 3px; padding-left:7px;"></i>
                    </div>
                    <van-popup v-model="show" position="right" :style="{ height: '100%' }" v-if="userInfo.UserId">
                        <div class="home_nav_right">
                            <div class="nav_right_header">
                                <div class="header_user" @click="刷新用户信息()">
                                    <p>{{config.title}}</p>
                                    <p>{{userInfo.UserId}}</p>
                                    <p>余额：{{userInfo.Money}}<img :id="xuanzhuan" style="width:20px;height:20px;top:5px; position: relative;" src="image/my/refresh.png" alt=""> </p>
                                </div>
                                <div class="money">
                                    <ul>
                                        <li @click="$router.push('/chongzhi')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 19% 0%;position: relative; top: 15%;">
                                                <span style="color:#000;">充值</span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/tixian')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 19% 11%;position: relative; top: 20%;">
                                                <span style="color:#000;">提现</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nav_list">
                                    <ul>
                                        <li @click="$router.push('/grziliao')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 12%;position: relative; top: 27%;">
                                                <span style="color:#000;margin-left:100px;">
                                                    个人资料
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/tzjilu')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 22%;position: relative; top: 27%;">
                                                <span style="color:#000;margin-left:100px;">
                                                    投注记录
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/kaijiang')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 33%;position: relative; top: 27%;">
                                                <span style="color:#000;margin-left:100px;">
                                                    开奖结果
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/zjmingxi')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 44%;position: relative; top: 27%;">
                                                <span style="color:#000;margin-left:100px;">
                                                    账户管理
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/gonggao')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 64%;position: relative; top: 27%;">
                                                <span style="color:#000;margin-left:100px;">
                                                    站内短信
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="$router.push('/youhui')">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 75%;position: relative; top: 27%;height:30px;">
                                                <span style="color:#000;margin-left:100px;">
                                                    优惠活动
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="back()">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 86%;position: relative; top: 27%;height:30px;">
                                                <span style="color:#000;margin-left:100px;">
                                                    返回大厅
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                        <li @click="goOut()">
                                            <p style="background-image:url('image/index/user-icon.png'); background-repeat: no-repeat; background-size:2rem; background-position: 20% 97%;position: relative; top: 27%; height:30px;">
                                                <span style="color:#000;margin-left:100px;">
                                                    退出登录
                                                    <i class="van-icon van-icon-arrow" style="top:2px;left:8px;"></i>
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </van-popup>
                </div>
            </div>
        </van-sticky>
        <!-- 轮播 -->
        <van-swipe :autoplay="3000" class="home_lunbo">
            <van-swipe-item v-for="item in resData" :key="item.id">
                <img :src="item.Img" alt />
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar @click="滚动消息()" :text="config.roll_titles" left-icon="van-icon van-icon-volume" />
        <!-- <div class="central_nav">
            <ul>
                <li>
                    <img src="image/index/appxz.png" alt />
                    <p>下载</p>
                </li>
                <li @click="$router.push('/chongzhi')">
                    <img src="image/index/ck.png" alt />
                    <p>存款</p>
                </li>
                <li @click="$router.push('/tixian')">
                    <img src="image/index/wk.png" alt />
                    <p>取款</p>
                </li>
                <li @click="$router.push('/tzjilu')">
                    <img src="image/index/lxb.png" alt />
                    <p>注单</p>
                </li>
                <li @click="$router.push('/kefu')">
                    <img src="image/index/kf.png" alt />
                    <p>客服</p>
                </li>
            </ul>
        </div> -->
         
         <div class="Central_nav">
            <ul>
                <li @click="$router.push('/chatBoxes')">
                    <img src="image/index/liaotianshi.png" alt />
                    <p>聊天室</p>
                </li>
                <li @click="$router.push('/teyaovip')" v-if="!技术支持">
                    <img src="image/index/woshou.jpg" alt style="border-radius:50%" />
                    <p>特邀嘉宾</p>
                </li>
                <!-- @click="showPopup1" -->
                <li type="primary" >
                    <img src="image/index/libao.png" alt />
                    <p>天天礼包</p>
                </li>
                
                <!-- <van-popup
                    v-model="show1"
                    position="right"
                    :style="{ height: '53%' }"
                    class="libaotk"
                >
                    <ul>
                        <li @click="$router.push('/qdiframe')">
                            <img src="image/index/mrqd.png" alt />
                            <p>每日签到</p>
                        </li>
                        <li @click="$router.push('/sciframe')">
                            <img src="image/index/mrsc.png" alt />
                            <p>每日首存</p>
                        </li>
                        <li @click="$router.push('/daili')">
                            <img src="image/index/dlzx.png" alt />
                            <p>代理中心</p>
                        </li>
                        <li @click="$router.push('/yeb')">
                            <img src="image/index/ye.jpg" alt />
                            <p>余额宝</p>
                        </li>
                        <li @click="$router.push('/teyaovip')">
                            <img src="image/index/woshou.jpg" alt />
                            <p>特邀嘉宾</p>
                        </li>
                    </ul>
                </van-popup> -->
                <li @click="$router.push('/youhui')">
                    <img src="image/index/youhui.png" alt />
                    <p>优惠活动</p>
                </li>
                <li @click="$router.push('/kefu')">
                    <img src="image/index/kefu.png" alt />
                    <p>在线客服</p>
                </li>
                <!-- v-if="技术支持" -->
                <li @click="技术支持弹框()" v-if="技术支持">
                    <i
                        class="mui-icon mui-icon-paperplane"
                        style="font-size: 41px; background: rgb(22, 152, 220);color: white; border-radius: 40%;margin-top: 1px;"
                    ></i>
                    <p style="margin-top:10px;">技术支持</p>
                </li>
            </ul>
        </div>
        <div class="rm_txt">
            <img src="image/index/icon-game.png" alt />
            <span>热门游戏</span>
        </div>
        <!-- 游戏列表 -->
        <tabs type="boxed" v-if="res.length>0">
            <tab-item :label="item.title" v-for="(item, index) in res" :key="index" @click="qipai(item.title)">
                <div v-for="(item1, index) in item.children" :key="index">
                    <div v-for="(game,index) in item1.children" :key="index" class="game_list" @click="跳转(game,item1)" v-if="item.title !== '棋牌'">
                       
                        <img :src=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" />
                        <p>{{game.title}}</p>
                    </div>
                    <div v-if="item.noSub" class="game_list" @click="跳转1(item1)">
                        <img :src=" 'image/home/'+item1.img+'/'+item1.imgid+item1.ext" />
                        <p>{{item1.title}}</p>
                    </div>
                    <div v-if="item.title == '棋牌'">
                        <div v-for="(game,index) in item1.children" :key="index" class="棋牌" @click="跳转(game,item1)">
                            <ul>
                                <li>
                                    <img :src=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" />
                                    <button>立刻游戏</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </tab-item>
            <!-- 三个优惠活动 -->
            <div class="youhui_list">
                <i class="van-icon van-icon-point-gift-o"></i>
                <span>优惠活动</span>
                <span style="float:right;color:#3c3c3c;padding-right:5px;" @click="$router.push('/youhui')">查看更多>></span>
            </div>
            <van-collapse v-model="activeNames" animated>
                <van-collapse-item v-for="(item,index) in youhui_list" :key="index" right-icon="van-icon van-icon-plus">
                    <div slot="title">
                        <p style="color:#000;font-weight:bold">{{item.Name}}</p>
                        <img @click="info(item)" :src="item.Img" alt />
                        <!-- <b style="font-size:12px;" class="van-icon van-icon-eye-o">点击图片查看详情</b> -->
                    </div>
                    <div v-html="item.html"></div>
                </van-collapse-item>
            </van-collapse>
            <div class="jg">
                <p>COPYRIGHT © {{config.title}} RESERVED</p>
            </div>
        </tabs>
    </div>
</template>

<script>
import { api_退出登录, api_登录试玩 } from "@/api/登录接口.js";
import { api_获取优惠列表, api_获取优惠详情 } from "@/api/优惠接口.js";
import { api_Online } from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
import { Dialog, Toast } from "vant";
export default {
    data() {
        return {
            show: false,
            show1: false,
            config: config,
            active: 0,
            res: [],
            resData: [],
            activeNames: ["1"],
            优惠列表: [],
            youhui_list: [],
            deg: 0,
            xuanzhuan: "",
            棋牌: ""
        };
    },
    created: function() {
        this.list();
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        axios.post(url, { home: true }).then(res => {
            this.resData = res.data;
        });
        var this_1 = this;
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        axios.post(url, { home: true }).then(res => {
            this.优惠列表 = res.data;
            var list = this.优惠列表.slice(2, 5);
            this.youhui_list = list;
        });
    },
    computed: {
        ...mapState({
             技术支持: "技术支持",
            userInfo: "userInfo",
            待进入游戏: "待进入游戏",
            ip: "ip"
            
        })
    },
    mounted() {
        this.getUserInfo();
         //获取ip
        if (this.config.telegram && this.config.telegram.number) {
            if (this.ip) {
                var cname = this.ip.cname;
                cname = cname.toUpperCase();
                if (
                    this.config.telegram.whiteList.find(
                        x => x.toUpperCase() == cname
                    )
                ) {
                    this.设置state_1(["技术支持", true]);
                }
            } else {
                console.log("需获取ip");
                var sohu_url = "";
                if (typeof LineSwitch != "undefined") {
                    sohu_url =
                        (LineSwitch ? "https:" : "") +
                        "//pv.sohu.com/cityjson?ie=utf-8";
                } else {
                    sohu_url = "//pv.sohu.com/cityjson?ie=utf-8";
                }
                $.ajax({
                    type: "get",
                    // url: "http://pv.sohu.com/cityjson?ie=utf-8",
                    url: sohu_url,
                    dataType: "script",
                    success: data => {
                        console.log("获取ip:", returnCitySN);
                        // alert(JSON.stringify(returnCitySN))
                        this.设置state_1(["ip", returnCitySN]);
                        var cname = returnCitySN.cname;
                        cname = cname.toUpperCase();
                        if (
                            this.config.telegram.whiteList.find(
                                x => x.toUpperCase() == cname
                            )
                        ) {
                            this.设置state_1(["技术支持", true]);
                        }
                    }
                });
            }
        }
    },
    methods: {
        qipai(item) {
            console.log(item);
        },
        刷新用户信息() {
            this.xuanzhuan = "xuanzhuan";
            this.Online();
        },
        async 试玩() {
            if (this.userInfo.UserId) {
                this.$toast("请先退出当前账号");
                return;
            }
            var r = await api_登录试玩();
            if (r.data.code == 0) {
                this.$toast("登录成功");
                this.getUserInfo();
                this.获取平台余额();
            } else {
                this.$toast(r.data.msg);
            }
        },
        goOut() {
            api_退出登录().then(result => {
                console.log(result.data.code);
                this.Online();
                if (result.data.code == 0) {
                    Toast("退出成功");
                }
            });
        },
        info(item) {
            api_获取优惠详情(item.Id)
                .then(result => {
                    this.$set(item, "html", result.data);
                })
                .catch(err => {
                    this.$set(item, "html", result.data);
                });
        },
        showPopup() {
            this.show = true;
        },
        showPopup1() {
            this.show1 = true;
        },
        back() {
            this.show = false;
        },
        ...mapMutations({
            修改state: "修改state",
              设置state_1:'设置state',
            设置state:'user/设置state'
        }),
        ...mapActions({
            Online: "Online",
            获取平台余额: "获取平台余额",
            设置待进入游戏: "设置待进入游戏",
            设置类型: "进入游戏/设置类型",
            彩票玩法: "彩票玩法"
        }),
        ...mapActions({
            getUserInfo: "user/getUserInfo"
        }),
        注册() {
            this.$router.push("/registered");
        },
        登录() {
            this.$router.push("/login");
        },
        滚动消息() {
            Dialog.alert({
                message: config.roll_titles
            }).then(() => {});
        },
        list() {
            this.$axios.get("json/home.json").then(x => {
                this.res = x.data;
            });
        },
        跳转1(item1) {
            if (item1.type !== "cp") {
                this.设置类型(item1);
            } else if (item1.type == "cp") {
            }
        },
        跳转(game, item1) {
            if (item1.type !== "cp") {
                var obj = Object.assign({}, game);
                obj.type = item1.type;
                console.log(obj);
                this.设置类型(obj);
            } else if (item1.type == "cp") {
                this.$router.push("/cpiframe?i=" + game.id + "&t=" + 1);
            }
        },
         技术支持弹框() {
            Dialog.alert({
                title: "技术支持",
                message:
                    "<i class='mui-icon mui-icon-paperplane' style='font-size: 43px; background: rgb(22, 152, 220); color: white; border-radius: 50%;'></i><br/> <a href='https://t.me/boleee'>Telegram:@boleee</a><br/>欢迎联系我们<br/> Welcome to contact us"
            }).then(() => {
                // on close
            });
        }
    }
};
</script>

<style >
* {
    border: 0;
    padding: 0;
}

.棋牌 {
    width: 100%;
}
.棋牌 ul {
    width: 31%;
    float: left;
    margin: 5px 4px;
}
.棋牌 ul li {
    height: 100%;
}
.棋牌 ul li button {
    float: left;
    background: #ff8502;
    margin-left: 17.5%;
    border-radius: 20px;
    border: 0;
    color: white;
    margin-bottom: 10px;
    font-weight: 600;
}
.棋牌 ul li img {
    width: 100%;
    height: 117px;
}
.Central_nav {
    width: 95%;
    height: 82px;
    margin-bottom: 10px;
    background: #e0e0e0;
    margin: 10px;
    border-radius: 5px;
}
.Central_nav ul li img {
    width: 47px;
    height: 47px;
}
.Central_nav > ul > li {
    float: left;
    width: 20%;
    text-align: center;
    padding-top: 5px;
}
.Central_nav > ul > li > p {
    color: #4a4a4a;
}
.libaotk {
    width: 80px;
    background: #fdfdfe !important;
    border-radius: 7px 0px 0px 7px;
}
.libaotk > ul > li {
    width: 100%;
    text-align: center;
    margin-top: 5px;
}
.libaotk > ul > li > p {
    color: black;
}
.home_header {
    width: 100%;
    height: 50px;
    background: #c1c1c1;
}
.home_header img {
    width: 188px;
    height: 48px;
}

.home_lunbo img {
    width: 100%;
    height: 181px;
}
.btn1 {
    width: 45px;
    height: 34px;
    border-radius: 5px;
    background: #c1c1c1;
    color: white;
    position: relative;
    font-size: 17px;
    float: right;
    top: 11px;
    margin-right: 10px;
    border: 1px solid #aeaeae;
    padding: 0px;
}
.home_nav_right {
    width: 200px;
    height: 100%;
    background: linear-gradient(
        to right,
        #b9b9b9,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #ffffff,
        #b9b9b9
    );
}
.home_nav_right .nav_right_header {
    width: 100%;
    height: 90px;
    background: linear-gradient(to right, #8c94e4, #66ceef);
}
.header_user p {
    color: white;
    text-align: center;
    padding-top: 7px;
}
.money ul li {
    float: left;
    width: 50%;
    height: 45px;
    text-align: center;
    border: 1px solid #ebebeb;
    margin-top: 4px;
    border-bottom: 0px;
    border-left: 0px;
}
.money ul li p {
    padding-top: 5px;
    height: 28px;
    text-align: center;
    padding-left: 40px;
    color: #000;
}
.nav_right_header .nav_list ul li {
    width: 100%;
    height: 45px;
    overflow: hidden;
    border: 1px solid #ebebeb;
    counter-reset: #000;
    border-bottom: 0px;
}
.nav_list ul li:last-child {
    border-bottom: 1px solid #ebebeb;
}
.van-notice-bar {
    background: #e0e0e0;
    color: #464646;
    margin-top: -5px;
    border-bottom: 1px solid #ebebeb;
}
.central_nav {
    width: 93%;
    height: 70px;
    background: #e0e0e0;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 10px;
}
.central_nav ul li {
    width: 20%;
    height: 56px;
    float: left;
}
.central_nav ul li img {
    width: 36px;
    height: 36px;
    margin: 5px 18px 0;
}
.central_nav ul li p {
    margin-left: 21px;
    color: #000;
    font-weight: 500;
    font-size: 13px;
}

.rm_txt img {
    width: 21px;
    height: 24px;
    margin: 5px 8px 0 20px;
}
.rm_txt span {
    color: #5c5c5c;
    font-size: 18px;
    font-weight: bold;
}
.youhui_list {
    width: 100%;
    height: 40px;
    margin-top: 20px;
}
.youhui_list img {
    width: 21px;
    height: 24px;
}
.youhui_list span {
    font-size: 17px;
    font-weight: bold;
    padding-left: 5px;
}
.tabs ul {
    background: #e0e0e0;
    border-radius: 10px;
}
.tabs li.is-active a {
    border-bottom-color: red;
    color: red;
}
.van-tabs__nav--line {
    background: red !important;
}
.tabs .tab-list {
    width: 95% !important;
    margin: 0 auto;
}
.tabs {
    width: 100% !important;
}
.tab {
    width: 94%;
    margin: 10px auto;
}
.top {
    overflow: hidden;
    background: #e0e0e0;
    height: 44px;
    border-radius: 12px 0 12px 0;
}
.top li {
    float: left;
    width: 20%;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
}
.tabs .tab-list li {
    width: -webkit-fill-available;
    line-height: 34px !important;
}
.tabs .tab-list {
    border-radius: 0 !important;
}
.game_list {
    width: 30%;
    height: 109px;
    float: left;
    margin: 5px;
    border-radius: 5px;
    background: #e0e0e0;
    border: 1px solid #ccc;
    position: relative;

}
.game_list img {
    /* width: 131px; */
    height: 60px;
    top: 8px;
    position: absolute;
    /* top: 0;
    bottom: 0; */
    left: 0;
    right: 0;
    margin: auto;
}
.game_list p {
    text-align: center;
    margin-top: 58%;
    padding-top: 5px;
    color: #575e68;
    font-weight: 600;
}
.tabs .tab-content {
    margin: 9px 2px 0px 6px !important;
}
.van-tabbar {
    background-color: #d9d9d9;
}
.jg {
    width: 100%;
    height: 180px;
}
.jg p {
    text-align: center;
    margin-top: 60px;
}
.van-cell {
    background: #e0e0e0;
}
.van-cell__right-icon {
    display: none;
}
.tabs .tab-list {
    font-size: 18px;
}
.tabs li.is-active span {
    color: red;
    border-bottom: 2px solid red;
}
.tabs.is-boxed li.is-active a {
    background: #e0e0e0 !important;
    border-left: 0px;
    border-right: 0px;
}
.van-swipe__indicator {
    width: 9px;
    height: 9px;
}
.van-swipe__indicator {
    opacity: 1;
    color: white;
}
/*动画效果*/
#xuanzhuan {
    /*animation (动画) :绑定选择器, 4s完成动画 linear(匀速) infinite(循环) */
    animation: que 1s linear;
}
/*通过@keyframes规则,能够创建动画 , que 定义动画的名称 可自己定义*/
@keyframes que {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0% {
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
