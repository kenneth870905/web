<template>
    <div>
        <!-- 主页顶部 -->
        <van-sticky>
        <div class="home_header">
            <img src="webConfig/image/logo.png" alt />
            <span v-if="!userInfo.UserId">
                <button class="btn1" @click="注册()">注册</button>
                <button class="btn1" @click="登录()" style="margin-right:10px;">登录</button>
            </span>
            <router-link
                tag="span"
                to="/my"
                style="float:right; color:#ffffff; margin-top:10px; margin-right:10px;"
                v-if="userInfo.UserId"
            >
                <p>
                    欢迎：
                    <b style="color:yellow">{{userInfo.UserId}}</b>
                </p>
                <p>
                    余额：
                    <b style="color:yellow">{{userInfo.Money}}</b>
                </p>
            </router-link>
        </div>
         </van-sticky>
        <!-- 轮播图 -->
            <van-swipe :autoplay="3000" class="home_lunbo">
                <van-swipe-item v-for="item in resData" :key="item.id">
                    <img v-lazy="item.Img" alt />
                </van-swipe-item>   
            </van-swipe>
       
        <van-notice-bar
            @click="滚动消息()"
            :text="config.roll_titles"
            left-icon="van-icon van-icon-volume"
        />
        <div class="Central_nav">
            <ul>
                <li @click="$router.push('/chatBoxes')">
                    <img src="image/index/liaotianshi.png" alt />
                    <p>聊天室</p>
                </li>
                <li @click="$router.push('/teyaovip')" v-if="!技术支持">
                    <img src="image/index/woshou.jpg" alt />
                    <p>特邀嘉宾</p>
                </li>
                <li type="primary" @click="showPopup">
                    <img src="image/index/libao.png" alt />
                    <p>天天礼包</p>
                </li>
                <van-popup
                    v-model="show"
                    position="bottom"
                    :style="{ height: '25%' }"
                >
                    <div class="libaotk">
                        <div @click="$router.push('/qdiframe')">
                            <img src="image/index/mrqd.png" alt />
                            <p>每日签到</p>
                        </div>
                        <div @click="$router.push('/sciframe')">
                            <img src="image/index/mrsc.png" alt />
                            <p>每日首存</p>
                        </div>
                        <div @click="$router.push('/daili')">
                            <img src="image/index/dlzx.png" alt />
                            <p>代理中心</p>
                        </div>
                        <div @click="$router.push('/yeb')">
                            <img src="image/index/2.png" alt />
                            <p>余额宝</p>
                        </div>
                        <div @click="$router.push('/teyaovip')">
                            <img src="image/index/woshou.jpg" alt />
                            <p>特邀嘉宾</p>
                        </div>
                        <div @click="$router.push('/qpiframe')">
                            <img src="image/index/7.png" alt />
                            <p>玩转棋牌</p>
                        </div>
                    </div>
                </van-popup>
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
        
         <!--  -->
        
        <!-- 游戏列表 -->
        <!-- <van-tabs type="card">
            <van-tab v-for="(item,index) in res" :key="index" :title="item.title">
                <van-tabs v-model="active" v-if="!item.noSub">
                    <van-tab v-for="(game,index) in item.children" :key="index" :title="game.title">
                        <div v-for="(game,index) in item.children" :key="index">
                            <div class="game_list">
                                <ul>
                                    <li
                                        v-for="(item, index) in game.children"
                                        :key="index"
                                        @click="跳转1(game,item)"
                                    >
                                        <img
                                            style="width:50px;"
                                            :src=" 'image/home/'+game.img+'/'+item.imgid+game.ext"
                                            alt
                                        />
                                        <span style="padding-left:10px;">{{item.title}}</span>
                                        <br />
                                        <span
                                            style="padding-left:70px;font-size:10px;color:#3abda6;"
                                            v-if="item.desc"
                                        >每{{item.desc}}开奖</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="game_list" v-if="item.noSub">
                    <ul>
                        <li v-for="(game,index) in item.children" :key="index" @click="跳转(game)">
                            <img
                                style="width:50px;"
                                :src="'image/home/'+game.img+'/'+game.imgid+game.ext"
                                alt
                            />
                            <span style="padding-left:10px;">{{game.title}}</span>
                        </li>
                    </ul>
                </div>
            </van-tab>
        </van-tabs>-->
        <tabs type="boxed" v-if="res.length>0">
            <tab-item :label="item.title" v-for="(item, index) in res" :key="index" >
                    <van-tabs swipeable   v-if="item.title == '彩票'">
                        <van-tab v-for="(item1, index) in item.children"   v-model="active" :key="index" :title="item1.title"  >
                             <div
                        v-for="(game,index) in item1.children"
                        :key="index"
                        class="game_list_new"
                        @click="跳转(game,item1)"
                    >
                                <div class="游戏内容" >
                                    <div class="彩票图片">
                                       <img  v-lazy=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" />
                                    </div>
                                     <div class="彩票文字">
                                       <p>{{game.title}}</p>
                                       <p v-if="game.desc">每{{game.desc}}开奖</p>
                                     </div>
                                </div> 
                           </div>
                        </van-tab>
                    </van-tabs>
                    <!--真人-->
                    <van-tabs  swipeable v-if="item.title == '真人'">
                        <van-tab v-for="(item1, index) in item.children" v-model="active" :key="index" :title="item1.title" >
                             <div
                        v-for="(game,index) in item1.children"
                        :key="index"
                        @click="跳转(game,item1)"
                    >
                        <div class="游戏内容1" >
                                    <div class="彩票图片1">
                                       <img  v-lazy=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" /> 
                                    </div>
                                     <div class="彩票文字1">
                                       <p>{{game.title}}</p>
                                       <p v-if="game.desc">每{{game.desc}}开奖</p>
                                     </div>
                                </div> 
                               </div>
                        </van-tab>
                    </van-tabs>
                    <!-- 电子 -->
                     <van-tabs  swipeable v-if="item.title == '电子'">
                        <van-tab v-for="(item1, index) in item.children"  v-model="active" :key="index" :title="item1.title" >
                             <div
                        v-for="(game,index) in item1.children"
                        :key="index"
                        @click="跳转(game,item1)"
                    >
                        <div class="游戏内容2" >
                                    <div class="彩票图片2">
                                       <img  v-lazy=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" /> 
                                    </div>
                                     <div class="彩票文字2">
                                       <p>{{game.title}}</p>
                                       <p v-if="game.desc">每{{game.desc}}开奖</p>
                                     </div>
                                </div> 
                             </div>
                        </van-tab>
                    </van-tabs>
                    <!-- 棋牌  -->
                    <van-tabs  swipeable v-if="item.title == '棋牌'">
                        <van-tab v-for="(item1, index) in item.children"  v-model="active" :key="index" :title="item1.title" >
                             <div
                        v-for="(game,index) in item1.children"
                        :key="index"
                        @click="跳转(game,item1)"
                    >
                        <div class="游戏内容2" >
                                    <div class="彩票图片2">
                                       <img  v-lazy=" 'image/home/'+item1.img+'/'+game.imgid+item1.ext" /> 
                                    </div>
                                     <div class="彩票文字2">
                                       <p>{{game.title}}</p>
                                       <p v-if="game.desc">每{{game.desc}}开奖</p>
                                     </div>
                                </div> 
                           </div>
                        </van-tab>
                    </van-tabs>
                    <!-- 体育 -->
                    <van-tabs  swipeable v-if="item.noSub">
                        <van-tab v-for="(item1, index) in item.children"  v-model="active" :key="index" :title="item1.title" >
                        <div
                        v-for="(game,index) in item1.children"
                        :key="index"
                        @click="跳转(game,item1)"
                    >
                    </div>
                        <div v-if="item.noSub"  class="游戏内容3" @click="跳转1(item1)">
                            <div class="彩票图片3">
                                <img v-lazy=" 'image/home/'+item1.img+'/'+item1.imgid+item1.ext" />
                            </div>
                            <div class="彩票文字3">
                                <p>{{item1.title}}</p>
                            </div>
                        </div>
                        </van-tab>
                    </van-tabs>
            </tab-item>
            <div class="jg">
                <a :href="config.iframe_url+'/bet365'" target="_blank"  style="padding-bottom:0px;">
                    <p class="tzdn">
                        <i class="fa fa-television"></i>电脑版
                    </p>
                </a>
            </div>
        </tabs>
    </div>
</template>

<script>
import { api_Online } from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
import { Dialog, Toast } from "vant";
export default {
    data() {
        return {
            config: config,
            active: 0,
            res: [],
            resData: [],
            show: false,
            显示技术支持: false,
        };
    },
    created: function() {
        this.list();
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        axios.post(url, { home: true }).then(res => {
            this.resData = res.data;
        });
    },
    computed: {
        ...mapState({
            技术支持: "技术支持",
            userInfo: "userInfo",
            待进入游戏: "待进入游戏",
            ip: "ip"
        }),
        
    },
    mounted() {
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
        showPopup() {
            this.show = true;
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
        注册() {
            this.$router.push("/registered");
        },
        登录() {
            this.$router.push("/login");
        },
        滚动消息() {
            // Dialog.alert({
            //     message: config.roll_titles
            // }).then(() => {}); 
            this.$router.push("/xtgonggao");
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
            console.log('点击了跳转')
            console.log(item1);
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

<style   lang="scss">
.tabs .tab-list{
    font-size: 16px;
}
.van-tab--active{
    color: red;
}
.游戏内容{
    position: relative;
    width: 47%;
    float: left;
    background: #efefef;
    margin: 4px;
    border-radius: 8px;
    height: 80px;
    border: 1px solid #cccccc;
}
.游戏内容 .彩票图片{
    width: 55px;
    height: 55px;
    float: left;
    position: relative;
    margin: 10px 10px;
}
.游戏内容 .彩票文字{
    margin-top: 14px;
}
.游戏内容1{
    position: relative;
    width: 47%;
    float: left;
    margin: 4px;
    border-radius: 8px;
    // height: 150px;
}
// .游戏内容1 .彩票图片1{
//     margin-top: 8px;
// }
.游戏内容1 .彩票文字1{
    // margin: 0px 50px;
    text-align: center;
}
.游戏内容2{
    position: relative;
    width: 19%;
    float: left;
    margin: 10px;
    border-radius: 8px;
}
.游戏内容2 .彩票图片2{
    width: 80px;
    height: 80px;
}
.游戏内容2 .彩票文字2 p{
   text-align: center;
   color: #000000;
   overflow: auto;
}
.游戏内容3{
    position: relative;
    width: 20%;
    float: left;
    margin: 10px;
    border-radius: 8px;
}
.游戏内容3 .彩票图片3{
    width: 100px;
    height: 100px;
}
.游戏内容3 .彩票文字3 p{
   text-align: center;
   color: #000000;
}
.game_list_new{
    width: 100%;
}
.tabs ul{
    border-bottom: 0 !important;
}
.box_1 {
    // background: #ffffff;
    font-size: _vw(12);
    // display: flex;
    > div {
        flex:1;
        // padding-top: _vw(10);
        // padding-bottom: _vw(10);
    }
    .img_box {
        width: _vw(43);
        height: _vw(43);
        margin: 0px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        // img {
            // width: 100%;
            // max-height: 100%;
        // }
        i{
            font-size: _vw(43);
        }
        .技术支持{
            color: #1698dc;
        }
        .teyao{
            color: #ffffff;
            // background: linear-gradient(30deg,#E91E63, #ff6f9f); 
            background: linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209));
            border-radius: _vw(15);
            height:  _vw(38);
            width: _vw(38);
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 2px 0px #ff679b;
            i{
                font-size: _vw(28);
            }
        }
    }
    .icon_box {
        width: _vw(40);
        height: _vw(40);
        margin: 0px auto;
        border-radius: 100%;
        line-height: _vw(40);
        color: #ffffff;
        font-size: _vw(22);
    }
    > div:nth-child(1) {
        .icon_box {
            background: rgb(252, 74, 91);
        }
    }
    > div:nth-child(2) {
        .icon_box {
            background: rgb(169, 143, 241);
        }
    }
    > div:nth-child(3) {
        .icon_box {
            background: rgb(92, 174, 254);
        }
    }
    > div:nth-child(4) {
        .icon_box {
            background: rgba(216, 21, 21, 0.103);
        }
    }
}
.二级菜单 {
    float: left;
    width: 50%;
    text-align: center;
}
.体育游戏 img{
    width: 60px;
    height: 55px;
    margin: 5px 0px 2px 0px;
}
.体育游戏{
    width: 46%;
    height: 90px;
    float: left;
    background: #efefef;
    margin: 6px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 6px #888888;
}

.tabs.is-layout-left li.is-active a{
    border-right: 0px;
    border-radius: 0px;
}
.tb {
    position: relative;
    top: 13px;
    left: 20px;
    z-index: 9999;
}
.tzdn i {
    top: 4px;
    position: relative;
}
.tzdn {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.jg {
    width: 100%;
    height: 100px;
}
.b1 {
    position: relative;
    top: 19px;
    z-index: 999;
    left: 20px;
    overflow: hidden;
    width: 25px;
}
.tab-content {
    margin: 0 !important;
}
.tabs .tab-list {
    background: #ececec;
}
.tabs .tab-list li {
    width: -webkit-fill-available;
    line-height: 34px !important;
}
.van-tabs__nav .van-tabs__nav--line {
    display: none;
}
.game_list {
    width: 48%;
    height: 70px;
    float: left;
    margin: 3px;
    border-radius: 10px;
    background: #efefef;
    border: 1px solid #ccc;
}
.game_list span {
    position: relative;
    top: -20px;
    left: 4px;
}

.game_list img {
    /* width: 131px; */
    height: 56px;
    margin-left: 5px;
    position: relative;
    top: 8px;
}

* {
    border: 0;
    padding: 0;
}
.home_header {
    width: 100%;
    height: 61px;
    background: linear-gradient(#464646, #0b0b0b);
}
.home_header img {
    width: 188px;
    height: 48px;
    margin-top: 5px;
}

.home_lunbo img {
    width: 100%;
    height: 150px;
}
.btn1 {
    width: 53px;
    height: 30px;
    border-radius: 5px;
    background: #3f3f3f;
    color: white;
    position: relative;
    font-size: 14px;
    float: right;
    top: 15px;
    margin-right: 10px;
    border: 0;
}
#youxi_list {
    width: 37%;
    height: 70px;
    background: #efefef;
    border-radius: 8px;
    margin: 8px;
}
#youxi_list img {
    height: 57px;
}
.van-tabs--card {
    padding-top: 5px;
}
.van-tabs__nav--card {
    margin: 0;
}
.van-notice-bar {
    background: white;
    color: #464646;
    border: 1px solid #a5a5a5;
    border-radius: 8px;
    top: -10px;
    box-shadow: 0px 9px 5px #888888;
    margin-bottom: 5px;
}
.Central_nav {
    width: 100%;
    height: 65px;
    margin-bottom: 10px;
}
.Central_nav ul li img {
    width: 47px;
    height: 47px;
}
.Central_nav > ul > li {
    float: left;
    width: 20%;
    text-align: center;
}
.Central_nav > ul > li > p {
    color: #4a4a4a;
}
.libaotk{
    display: flex;
    background: #ffffff;
    flex-wrap: wrap;
    text-align: center;
    border-radius: 10px 10px 0 0;
}
.libaotk div{
    width: 25%;
    margin: 9px 0px 8px;
}
.libaotk img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

</style>
