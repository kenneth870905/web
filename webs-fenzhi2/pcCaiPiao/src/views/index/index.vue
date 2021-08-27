<template>
<!-- 222 -->
<div class="index">
    <div class="container">
        <div class="container_left">

            <!--  hove菜单上开始 -->
            <shouLogin></shouLogin>

            <!--  hove菜单上结束-->
            <!-- 左侧下 开奖公告开始 -->
            <div class="open_lottery">
                <p class="new_title kjgg"> <i class="iconfont icon-jiangbei1"></i>开奖公告<span class="kjgg_a" @click="go('/notice')">更多>></span></p>
                <ul class="open_lottery_ul">
                    <li v-for="item in kjggLIst">
                        <p><span>{{item.name}}</span>&nbsp;&nbsp; <span class="fccc_"><span>{{item.IssueCode}}</span>期</span></p>
                        <p class="fred p_num"><span v-for="item1 in item.Content" class="fred p_num">{{item1}},</span></p>
                        <p><span class="fccc_ p_time">{{item.ActualTime}}</span><span class="fblue" @click="imgClick(item.keydate)">开奖详情</span><a class="fblue" @click="立即投注(item.keydate)">立即投注</a></p>
                    </li>
                </ul>
            </div>
            <!-- 左侧下 开奖公告结束 -->
        </div>
        <!-- 右侧开始-->
        <div class="container-right">
            <!-- 轮播图上 -->
            <div class="轮播">
                <el-carousel ref="carousel1" :width="'750px'" :height="'267px'" :interval="3000" arrow="always">
                    <el-carousel-item v-for="(item,index) in imgdata">
                        <div class="lb_box_img" @click="go轮播(item)"><img :src="item.Img" alt></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 轮播图下面的内容 作三框右2框 开始-->
            <div class="container-right_bottom">
                <div class="left_3">

                    <!-- table 切换 开始-->
                    <div class="left_3_1">
                        <div class="table">
                            <ul class="tabs">
                                <li class="left-title">
                                    <div><img src="../../assets/images/钱.png" alt=""></div>快速投注
                                </li>
                                <li class="li-tab" v-for="(item,index) in tabsParam" :key="index" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}</li>
                            </ul>

                            <div class="divTab" v-show="nowIndex===index" v-for="(item,index) in sdajlkfd" :key="index">
                                <!-- // table 内容中 第一个div -->
                                <div class="date_title">
                                    <p>第<span>{{item.IssueCode}}</span>期截至:&nbsp;
                                        <span class="fred">{{item.倒计时}}</span>
                                    <p><span @click="go('/playRule?id='+item.idNum)">玩法规则</span>&nbsp;&nbsp;<span @click="imgClick(item.idNum)">开奖公告</span></p>
                                </div>

                                <!-- // table 内容中 第二个div -->
                                <div class="xiazu_num">
                                    <el-button type="danger" plain @click="立即投注(item.idNum)">立即投注</el-button>
                                </div>

                                <!-- // table 内容中 第三个div -->
                                <div class="lettry_num">
                                    <div class="lettry_num_min">
                                        <ul class="lettry_num_min_ul">
                                            <li class="li" v-if="item.Content && item.Content.length > 0" v-for="(item1,index) in item.Content" :key="index">
                                                <div class="div"><span>{{item1}}</span></div>
                                            </li>
                                            <div class="wkj" v-else><span>暂未开奖,敬请关注...</span></div>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- table 切换 结束-->
                    <div class="left_3_2">
                        <p class="new_title zxxx"> <i class="iconfont icon-xinwen"></i>资讯信息</p>
                        <ul class="left_3_2_ul">
                            <li v-for="(item,index) in listzxxx"><span>【 新闻 】</span><span @click="newgo(item)"> {{item.newtitle}}</span></li>
                        </ul>
                    </div>
                    <div class="left_3_3">
                        <p class="new_title kjgb2">开奖公告</p>
                        <el-row>
                            <el-col :span="12">
                                <div class="min_img"> <img src="../../assets/images/lsjl.jpg"></div>
                            </el-col>
                            <el-col :span="12">
                                <ul class="el-col-12_ul">
                                    <li @click="imgClick(70002)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/70002.png'" alt=""></div>
                                        <p>澳门六合彩</p>
                                    </li>
                                    <li @click="imgClick(20003)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/20003.png'" alt=""></div>
                                        <p>威尼斯飞艇</p>
                                    </li>
                                    <li @click="imgClick(50000)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/50000.png'" alt=""></div>
                                        <p>幸运28</p>
                                    </li>
                                    <li @click="imgClick(30002)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/30002.png'" alt=""></div>
                                        <p>极速3D</p>
                                    </li>
                                    <li @click="imgClick(60000)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/60000.png'" alt=""></div>
                                        <p>山东11选5</p>
                                    </li>
                                    <li @click="imgClick(60001)">
                                        <div><img :src="dataconfig.api_urlData+'/Areas/Lottery/Content/img/60001.png'" alt=""></div>
                                        <p>广东11选5</p>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <!-- 右2框开始 -->
                <div class="right_2">

                    <div class="right_2_1" v-if="站点配置.appUrl">
                        <p class="new_title sjkhd"> <i class="iconfont icon-shouji1"></i>手机客户端下载</p>
                        <div class="download_box">
                            <div class="download_img"><img :src="站点配置.appUrl"></div>
                            <div class="download_text">
                                <p><span class="iconfont icon-icon-test"></span>iPhone 版</p>
                                <p><span class="iconfont icon-anzhuo1"></span>Android 版</p>
                                <p @click="go('/phone')">更多方式</p>
                            </div>
                        </div>
                        <p class="p_xszd"><span>新手指导</span></p>
                        <div class="p_xszd_a">
                            <p @click="helpCentergo('01')">如何注册成为会员？</p>
                            <p @click="helpCentergo('19')">忘记登陆密码了怎么办？</p>
                            <p @click="helpCentergo('05')">如何进行充值？</p>
                        </div>
                    </div>

                    <div class="right_2_1" v-if="!站点配置.appUrl">
                        <p class="new_title sjkhd"> <i class="iconfont icon-yuanwenyindao"></i>新手引导</p>
                        <div class="p_xszd_a chuanqifalse">
                            <p @click="helpCentergo('01')">如何注册成为会员？</p>
                            <p @click="helpCentergo('19')">忘记登陆密码了怎么办？</p>
                            <p @click="helpCentergo('05')">如何进行充值？</p>
                            <p @click="helpCentergo('39')">提款不成功怎么办?</p>
                            <p @click="helpCentergo('33')">如何修改手机号码?</p>
                            <p @click="helpCentergo('23')">如何修改真实姓名?</p>
                        </div>

                    </div>

                    <!-- 中奖排行榜开始 -->
                    <div class="right_2_2">
                        <p class="new_title zjphb"> <i class="iconfont icon-paihangbang"></i>中奖排行榜</p>
                        <p class="right_2_2_title"><span>用户名</span><span>奖金</span></p>
                        <div id="box6" class="ul_box">
                            <ul id="ul1" class="rool_ul">
                                <li v-for="(item, index) in 姓名金额">
                                    <div>{{index+1}}</div>
                                    <p class="shujiname">{{item.UserName}}</p>
                                    <p class="fred">{{item.Money}}<span>元</span></p>
                                </li>
                            </ul>
                            <ul id="ul2" class="rool_ul">
                                <li v-for="(item, index) in 姓名金额">
                                    <div>{{index+1}}</div>
                                    <p>{{姓名金额.UserName}}</p>
                                    <p class="fred">{{item.Money}}<span>元</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 中奖排行榜结束 -->
                </div>
                <!-- 右2框开始 -->
            </div>
        </div>
        <!-- 轮播图下面的内容 作3框 右2框结束 -->
    </div>
    <!-- 右侧结束-->
</div>
</template>

<script>
import {
    api_请求随机姓名金额
} from "@/api/api_请求随机姓名金额.js";
import {
    api_开奖公告
} from "@/api/开奖公告.js";
import {
    api_首页轮播
} from "@/api/首页轮播.js";

import Mock from 'mockjs'
import shouLogin from '@/components/navSon/navSon.vue'
import {
    constants
} from 'crypto';
import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {
            imgdata: [], //轮播
            // chuanqifalse:false,
            kjggLIst: [], //左边开奖公告随机
            姓名金额: [],
            彩票类型: {
                10000: "三分时时彩",
                10001: "分分时时彩",
                10002: "重庆时时彩",
                10003: "五分时时彩",
                20000: "极速PK拾",
                20001: "北京PK拾",
                20002: "幸运飞艇",
                20003: "威尼斯飞艇",
                20004: "五分PK拾",
                30000: "排列三",
                30001: "福彩3D",
                30002: "极速3D",
                40004: "分分快3",
                50000: "幸运28",
                60000: "山东11选5",
                60001: "广东11选5",
                60005: "分分11选5",
                70000: "极速六合彩",
                70001: "香港六合彩",
            },
            dataNum: "", //排行榜的数据
            sdajlkfd: [], //开奖板块的数据
            dataconfig: {
                api_urlData: config.api_url, //api_url
            },

            listzxxx: [ //中奖新闻
                {
                    newtitle: " 二等奖以上中奖者的身份可否公开？",
                    href: config.api_url + "/Index/#news?id=306611",
                    id: "1",
                },
                {
                    newtitle: " 厦门1019万元大奖得主：之前就中过两次大奖了",
                    href: config.api_url + "/Index/#news?id=121001",
                    id: "2",
                },
                {
                    newtitle: " 密西西比州将就发行彩票举行投票 当前70%民意支持发行彩票",
                    href: config.api_url + "/Index/#news?id=775511",
                    id: "3",
                },
                {
                    newtitle: " 长沙福彩组织善行志愿者 传承雷锋精神 践行福彩宗旨",
                    href: config.api_url + "/Index/#news?id=121211",
                    id: "4",
                },
                {
                    newtitle: "  公益福彩筑梦前行 助力两会民生大计",
                    href: config.api_url + "/Index/#news?id=325511",
                    id: "5",
                },
                {
                    newtitle: "中福彩中心在辽宁开展专题调研",
                    href: config.api_url + "/Index/#news?id=132120",
                    id: "6",
                },
                {
                    newtitle: "民政部部长黄树贤：把党和政府的温暖送到困难群众身边",
                    href: config.api_url + "/Index/#news?id=651215",
                    id: "7",
                },
                {
                    newtitle: " “旅行”彩票 比旅行青蛙更暖更佛系",
                    href: config.api_url + "/Index/#news?id=204958",
                    id: "8",
                },
            ],

            nowIndex: 0, //默认第一个tab为激活状态
            tabsParam: ['澳门六合彩', '分分时时彩', '威尼斯飞艇', '排列三'], //（这个也可以用对象key，value来实现） '排列三' 
            定时器: ""
        }
    },
    computed: {
        ...mapGetters({
            站点配置: '站点配置',
        }),
    },
    filters: {
        计算时间() {

        }
    },
    created() {
        this.随机姓名金额()
        this.开奖公告table()
        this.中奖排行榜()
        this.All轮播图()

    },
    methods: {
        立即投注(id) {
            window.open(config.api_url + '/Lottery/Bet/Index/2/' + id)
        },
        All轮播图() {
            var obj = {
                home: true
            }
            api_首页轮播(obj).then(x => {
                this.imgdata = x.data //是数组 数组里是对象
            }).catch(err => {
                console.log(err);
            })
        },
        imgClick(idData) { //开奖公告的图片链接
            this.$router.push("/notice?item=" + idData);
        },
        随机姓名金额() {
            api_请求随机姓名金额().then(x => {
                this.姓名金额 = x.data.winList
            }).catch(err => {
                console.log(err);
            })
        },
        开奖公告table() {
            var kgggdata = [] //左边开奖公告随机5条数据
            function reRandom(min, max) {
                var num = Math.floor(Math.random() * (max - min + 1)) + min; //[23,76]
                return num;
            }
            api_开奖公告().then(x => {
                // 左边开奖公告随机
                var add = x.data
                console.log(add);

                let list = []
                var this_1 = this
                for (let key in add) {
                    var obj = add[key];
                    obj.keydate = parseInt([key][0]) //数组的第0个位置就是1000  20001  
                    obj.name = this_1.彩票类型[key]
                    list.push(obj)
                }
                for (let i = 0; i <= 4; i++) { //随机5条数据去渲染
                    var random = reRandom(0, list.length - 1)
                    var obj = list[random]

                    try {
                        obj.ActualTime = obj.ActualTime.slice(0, 10) //处理时间
                    } catch (error) {
                        console.log(error)
                    }
                    kgggdata.push(obj);
                }
                this.kjggLIst = kgggdata
                console.log(this.kjggLIst)

                //  table切换的数据
                var kjggNum = []; //左边开奖公告随机渲染彩票类型
                var qcdata = x.data[70002] ? x.data[70002] : {}
                qcdata.倒计时 = ""
                qcdata.idNum = "70002"

                var ffdata = x.data[10001] ? x.data[10001] : {};
                ffdata.倒计时 = ""
                ffdata.idNum = "10001"

                var bjdata = x.data[20003] ? x.data[20003] : {};
                bjdata.倒计时 = ""
                bjdata.idNum = "20003"

                var ksdata = x.data[30000] ? x.data[30000] : {};
                ksdata.倒计时 = ""
                ksdata.idNum = "30000"

                kjggNum.push(qcdata, ffdata, bjdata, ksdata)
                this.sdajlkfd = kjggNum;

                console.log(this.sdajlkfd);

                this.计算倒计时();
            }).catch(err => {
                console.log(err);
            })
        },
        newgo(item) { //新闻详情
            this.$router.push("/newtext?id=" + item.id);
        },
        helpCentergo(id) { //帮助中心
            this.$router.push("/helpCenter?id=" + id)
        },
        // table选项卡
        toggleTabs: function (index) {
            this.nowIndex = index;
        },
        go(url) {
            this.$router.history.push(url);
        },
        go轮播(item) {
            if (item.Url) {
                window.open(item.Url, 'lottery')
            } else {
                this.$router.push("/discounts?Id=" + item.Id)
            }
        },
        // 右边中奖信息的滚动
        中奖排行榜() {
            var this_1 = this;
            var dataNum = [];
            var num = 1
            for (let i = 0; i < 50; i++) {
                var moneyA = Math.floor(Math.random() * (299 - 240 + 1)) + 240; //[198,338]
                var runderobj = {};
                runderobj.name = Mock.Random.first() + "****"
                runderobj.num = num++
                runderobj.money = moneyA + "0.00"
                dataNum.push(runderobj)
            }
            this.dataNum = dataNum

            //  右边的滚动排行榜
            setTimeout(() => {
                window.onload = roll(40);
            }, 2000)

            function roll(t) {
                // console.log('开始定时器')
                // console.log('定时器')
                var ul1 = document.getElementById("ul1");
                var ul2 = document.getElementById("ul2");
                var box = document.getElementById("box6");

                ul2.innerHTML = ul1.innerHTML;
                // box.scrollTop = 0;
                this_1.定时器 = setInterval(rollStart, t);
                box.onmouseover = function () {
                    clearInterval(this_1.定时器)
                }
                box.onmouseout = function () {
                    this_1.定时器 = setInterval(rollStart, t);
                }
            }

            function rollStart() {
                // console.log(11)
                var box = $('#box6')
                var height = $('#box6').children().eq(0).height();
                var top = $('#box6').children().eq(0).css('marginTop');
                top = parseInt(top);
                top--
                if (top <= -height) {
                    $('#box6').children().eq(0).css('marginTop', '0px')
                } else {
                    $('#box6').children().eq(0).css('marginTop', top + 'px')
                }
            }

        },
        计算倒计时() {
            setInterval(() => { //循环这数据this.sdajlkfd 数组中的4条数据
                this.sdajlkfd.forEach(item => {
                    if (item.Timer > 0) {
                        var add = item.Timer //获取后端传过来的秒数
                        var days = parseInt(add / (60 * 60 * 24));
                        var hours = parseInt((add % (60 * 60 * 24)) / (60 * 60));
                        var minutes = parseInt((add % (60 * 60)) / (60));
                        var seconds = add % 60;
                        var aaaa = days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
                        item.倒计时 = aaaa; //给每一项添加一个属性名叫倒计时
                        item.Timer--;
                    } else if (item.Timer == "") {
                        item.倒计时 = "封盘中";
                    } else {
                        item.倒计时 = "封盘中";
                    }
                });
            }, 1000);
        }
    },
    components: { // 注册组件
        shouLogin,
    },
    destroyed() { //vue 销毁阶段
        clearTimeout(this.定时器);
    },

}
</script>

<style lang="scss" scoped>
// 公用标题开始
.new_title {
    height: 43px;
    margin: 0px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 43px;
    border-bottom: 1px solid #ccc;

    // border-left:1px solid #ccc;
    .iconfont {
        font-size: 20px;
        margin-right: 6px;
    }
}

.kjgg {
    background: #fff4f4;

    .kjgg_a {
        margin-left: 84px;
        font-size: 16px;
        cursor: pointer;
    }

    .icon-jiangbei1 {
        color: red;
    }
}

.kjgb2,
.zxxx {
    background: #f5f7fe;

    .icon-xinwen {
        color: rgb(3, 97, 248);
    }
}

.zjphb {
    background: #f4fff7;

    .icon-paihangbang {
        color: #4ab163;
    }
}

.sjkhd {
    background: #f7f7f7;

    .icon-shouji1 {
        color: indianred;
    }

    .icon-yuanwenyindao {
        color: indianred;
    }
}

// 公用标题结束

//头部激活样式
.active {
    border-bottom: 2px solid red;
    color: red;
}

.index {
    .container {
        position: relative;
        display: flex;
        justify-content: space-between;

        // 左边开始
        .container_left {
            width: 240px;

            //开奖公告开始
            .open_lottery {
                width: 240px;
                margin-top: 10px;
                border: 1px solid #ccc;
                border-bottom: none;

                .open_lottery_ul {
                    li {
                        padding-left: 10px;
                        border-bottom: 1px solid #ccc;

                        p {
                            margin: 13px 0px 12px 0px;
                        }

                        font-size: 13px;

                        .p_num {
                            font-weight: 700;
                        }

                        .p_time {
                            margin-right: 20px;
                        }

                        .fblue {
                            cursor: pointer;
                        }

                        .fblue:hover {
                            text-decoration: underline;
                        }

                        .fblue {
                            padding-left: 10px;
                            font-size: 13px;
                        }
                    }
                }
            }

            //开奖公告结束
        }

        // 左边结束
        // 右边开始
        .container-right {
            padding-top: 10px;
            width: 750px;

            .轮播 {
                width: 750px;
                height: 267px;

                .lb_box_img {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                /deep/ .el-carousel__indicators {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                /deep/ .el-carousel__indicator--horizontal {
                    width: 30px;
                }

                /deep/ .el-carousel__button {
                    width: 100%;
                }
            }

            //轮播图下面的内容 左3框  右2框
            .container-right_bottom {
                display: flex;
                margin-top: 10px;
                justify-content: space-between;

                .left_3 {
                    height: 800px;
                    width: 500px;
                    margin-right: 10px;

                    .left_3_1 {
                        width: 100%;
                        height: 299px;
                        border: 1px solid #ccc;

                        //选项卡切换
                        .table {
                            font-size: 15px;

                            .tabs {
                                border-top: 1px solid #eee;
                                border-bottom: 1px solid #eee;
                                width: 100%;
                                height: 38px;
                                display: flex;
                                justify-content: flex-end;
                            }

                            .left-title {
                                display: flex;
                                width: 23%;
                                line-height: 38px;
                                font-size: 13px;
                                color: #ccc;

                                div {
                                    margin-right: 8px;
                                    padding-top: 8px;
                                    width: 30px;
                                    height: 25px;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }

                            .li-tab {
                                cursor: pointer;
                                line-height: 38px;
                                height: 38px;
                                width: 19%;
                                height: 100%;
                                display: inline-block;
                                text-align: center;
                            }

                            //table对应显示的内容
                            // table 内容中 第一个div
                            .divTab {
                                height: 300px;
                                padding: 20px 10px 0px 10px;

                                .date_title {
                                    height: 40px;
                                    display: flex;
                                    justify-content: space-between;

                                    p:nth-child(2) {
                                        cursor: pointer;

                                        color: #276dff;
                                        font-size: 14px;

                                        span:hover {
                                            text-decoration: underline;
                                        }
                                    }
                                }

                                // table 内容中 第二个div
                                .lettry_num {
                                    margin: 20px 0px 40px 0px;
                                    padding-top: 12px;
                                    height: 60px;
                                    border: 35px;
                                    border-radius: 35px;
                                    padding: 6px 16px 6px 6px;
                                    background: #fdf7f1;

                                    .lettry_num_min {
                                        margin-left: 10px;
                                        height: 60px;
                                        background: #ffeedc;
                                        padding-left: 10px;
                                        border-radius: 35px;

                                        .lettry_num_min_ul {
                                            .wkj {
                                                width: 100%;
                                                text-align: center;
                                                height: 60px;

                                                span {
                                                    text-align: center;
                                                    color: red;
                                                    line-height: 40px;
                                                    font-size: 16px;
                                                }
                                            }

                                            padding: 10px 0px 0px 0px;
                                            height: 60px;
                                            display: flex;
                                            justify-content: flex-start;

                                            .li {
                                                margin-right: 5px;
                                                width: 40px;
                                                height: 40px;
                                                border-radius: 50%;
                                                background: #ff6700;

                                                .div {
                                                    margin: 3px 0px 0px 4px;
                                                    width: 30px;
                                                    height: 30px;
                                                    border-radius: 50%;
                                                    background: #ffff;
                                                    text-align: center;
                                                    font-size: 16px;

                                                    span {
                                                        color: #ff6700;
                                                        line-height: 30px;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                // table 内容中 第三个div
                                .xiazu_num {
                                    display: flex;
                                    justify-content: flex-end;
                                    padding-right: 26px;
                                    margin-top: 25px;
                                    margin-bottom: 35px;
                                }
                            }
                        }
                    }

                    .left_3_2,
                    .left_3_3 {
                        margin-top: 10px;
                        width: 100%;
                        border: 1px solid #ccc;

                        .left_3_2_ul {
                            padding: 10px 10px 10px 10px;

                            li {
                                height: 31px;

                                span:nth-child(1) {
                                    color: #999999;
                                }

                                span:nth-child(2) {
                                    cursor: pointer;
                                }

                                span:nth-child(2):hover {
                                    text-decoration: underline;
                                }

                                span {
                                    line-height: 31px;
                                    font-size: 14px;
                                }
                            }
                        }

                        .min_img {
                            margin-top: 20px;
                            width: 90%;
                            height: 126px;
                            padding-left: 1px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .el-row {
                            height: 200px;
                            padding-top: 16px;

                            .el-col-12 {
                                .el-col-12_ul {
                                    display: flex;
                                    justify-content: space-between;
                                    flex-wrap: wrap;

                                    li {
                                        cursor: pointer;
                                        padding-bottom: 10px;
                                        align-items: center;
                                        margin: 5px 0px 5px 0px;
                                        width: 70px;
                                        height: 65px;

                                        div {
                                            margin: 0 auto;
                                            width: 55px;
                                            height: 55px;

                                            img {
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }

                                        p:hover {
                                            color: red;
                                            text-decoration: underline;
                                        }

                                        p {
                                            text-align: center;
                                            font-size: 12px;
                                            margin: 0px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .right_2 {
                    width: 240px;

                    //手机客户端下载开始
                    .right_2_1 {
                        border: 1px solid #ccc;

                        .download_box {
                            padding-left: 10px;
                            height: 100px;
                            display: flex;

                            .download_img {
                                margin-top: 10px;
                                margin-right: 10px;
                                width: 100px;
                                height: 100px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .download_text {
                                color: #333339;

                                .iconfont {
                                    color: #666666;
                                    font-size: 18px;
                                }

                                p:nth-child(3) {
                                    cursor: pointer;
                                }

                                p:nth-child(3):hover {
                                    color: #ff9300;
                                    text-decoration: underline;
                                }
                            }
                        }

                        .p_xszd {
                            border-bottom: 1px solid #ccc;
                            color: #ff6700;
                            padding-left: 16px;
                            margin: 0px;
                            height: 32px;
                            margin-top: 14px;

                            span {
                                border-bottom: 2px solid #ff6700;
                                line-height: 25px;
                                height: 25px;
                                padding-bottom: 10px;
                            }
                        }

                        .p_xszd_a {
                            padding-left: 10px;
                            font-size: 14px;

                            p {
                                margin: 14px 0px 13px 7px;
                            }

                            cursor: pointer;

                            p:hover {
                                text-decoration: underline;
                            }
                        }

                        .chuanqifalse {
                            height: 240px;
                        }
                    }

                    //手机客户端下载j结束
                    //中奖排行榜开始
                    .right_2_2 {
                        margin-top: 10px;
                        border: 1px solid #ccc;

                        .right_2_2_title {
                            background: #f7f7f7;
                            // border-left: 1px solid #ccc;

                            height: 40px;
                            margin: 0px;

                            span:nth-child(2) {
                                margin-left: 4px;
                            }

                            span {
                                width: 114px;
                                height: 40px;
                                line-height: 40px;
                                padding-left: 54px;
                            }
                        }

                        .ul_box {
                            height: 482px;
                            overflow: hidden;

                            .rool_ul {
                                li {
                                    font-size: 14px;
                                    padding: 13px 0px 12px 14px;
                                    border-bottom: 1px solid #ccc;
                                    display: flex;

                                    div {
                                        width: 19px;
                                        height: 20px;
                                        border: 1px solid #ff6700;
                                        color: #e94335;
                                        background: #ffeedc;
                                        // padding-left: 2px;
                                        text-align: center;
                                    }

                                    /deep/ .shujiname {
                                        text-align: left !important;
                                    }

                                    p:nth-child(2) {
                                        width: 36%;
                                        text-align: right;
                                        margin: 0px 25px 0px 10px;
                                    }

                                    p {
                                        margin: 0px;
                                    }
                                }
                            }
                        }
                    }

                    //  中奖排行榜结束
                }
            }
        }

        // 右边结束
    }
}
</style>
