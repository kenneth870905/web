<template>
    <div>
        <!-- 蒙层组件 -->
        <Obscuration></Obscuration>
        <!-- 轮播图 -->
        <div class="block banner">
            <div class="registered_box">
                <div class="registered">
                    <span>您炒股，我出钱</span>
                    <br>
                    <span style=" font-weight: 1000;">3-10倍杠杆随意配</span>
                    <br>
                    <span>资金双重保障，100%实盘交易</span>
                    <br>
                    <el-button class="login-btn" @click="registered()">立即注册</el-button>
                    <br>
                    <span>
                        已有账号？
                        <a href="#">立即登录</a>
                    </span>
                    <br>
                    <span>股市有风险，投资需谨慎</span>
                    <br>
                </div>
            </div>
            <el-carousel height="400px">
                <el-carousel-item v-for="(img,index) in imgList" :key="index">
                    <!-- <img v-bind:src="imgAdrees+img.url"> -->
                    <img v-bind:src="img.url">
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 面包屑 -->
        <div class="mbx-box">
            <div class="container">
                <el-row>
                    <el-col :span="2">最新公告</el-col>
                    <el-col :span="20">
                        <marquee>
                            尊敬的新宝配资会员，即日起，凡是线下充值的，都有优惠返利活动，活动即时有效！
                        </marquee>
                    </el-col>
                    <el-col :span="2">
                        <a href="javascript:;" style="color:red">&#160;更多>></a>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="业务展示">
            <div class="container">
                <el-row>
                    <el-col :span="6">
                        <div class="business">
                            <div class="business_div">
                                <img class="business_img" src="static/image/home/icon-1.png">
                            </div>
                            <div class="text_1">
                                <b>资金保障</b>
                                <div>资金第三方托管，专款专用</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="business">
                            <div class="business_div">
                                <img class="business_img" src="static/image/home/icon-2.png">
                            </div>
                            <div class="text_1">
                                <b>资金保障</b>
                                <div>资金第三方托管，专款专用</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="business">
                            <div class="business_div">
                                <img class="business_img" src="static/image/home/icon-3.png">
                            </div>
                            <div class="text_1">
                                <b>资金保障</b>
                                <div>资金第三方托管，专款专用</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="business">
                            <div class="business_div">
                                <img class="business_img" src="static/image/home/icon-4.png">
                            </div>
                            <div class="text_1">
                                <b>资金保障</b>
                                <div>资金第三方托管，专款专用</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 版心 -->
        <div class="bjs">
            <div class="container">
                <!-- style="height:1300px; -->

                <!-- 配资 -->
                <el-row class="configuration" style="margin-bottom:20px">
                    <el-col :span="6" class="c_business" style="background-image: url('static/image/home/configure-bg.png')">
                        <h1 class="stock_title">股票配资</h1>
                        <span>您炒股 我出钱</span>
                        <br>
                        <span>资金放大3-10倍</span>
                        <br>
                        <span>盈利全归您</span>
                        <br>
                        <span>低门槛 提现快</span>
                        <br>
                    </el-col>
                    <el-col :span="18" class="with_funding">
                        <el-row>
                            <!-- 免 -->
                            <el-col :span="6" class="particulars">
                                <h3>免息配资</h3>
                                <el-button class="title_btn" type="danger">不收取管理费，盈利7成归您</el-button>
                                <br>
                                <div class="tese">
                                    <strong>免</strong>
                                    <br>
                                    <span>所有费用</span>
                                </div>
                                <div class="tese_details">
                                    <div>
                                        <div>投资沪深：</div>
                                        <div style="text-align:left">仓位:</div>
                                    </div>
                                    <div>
                                        <div>A 股</div>
                                        <div>不限制</div>
                                    </div>
                                </div>
                                <el-button class="apply" type="danger" plain>立刻申请</el-button>
                            </el-col>
                            <!-- 按天配资 -->
                            <el-col :span="6" class="particulars">
                                <h3>按天配资</h3>
                                <el-button class="title_btn" type="danger">券商独立成户，更快更稳定</el-button>
                                <br>
                                <div class="tese">
                                    <strong>6</strong>元 / 1万
                                    <br>
                                    <span>利率低至</span>
                                </div>
                                <div class="tese_details">
                                    <div>
                                        <div>投资沪深：</div>
                                        <div style="text-align:left">仓位:</div>
                                    </div>
                                    <div>
                                        <div>A 股</div>
                                        <div>不限制</div>
                                    </div>
                                </div>
                                <el-button class="apply" type="danger" plain>立刻申请</el-button>
                            </el-col>
                            <!-- 按周配资 -->
                            <el-col :span="6" class="particulars">
                                <h3>按周配资</h3>
                                <el-button class="title_btn" type="danger">不收取管理费，盈利7成归您</el-button>
                                <br>
                                <div class="tese">
                                    <strong>28</strong>元 / 1万
                                    <br>
                                    <span>所有费用</span>
                                </div>
                                <div class="tese_details">
                                    <div>
                                        <div>投资沪深：</div>
                                        <div style="text-align:left">仓位:</div>
                                    </div>
                                    <div>
                                        <div>A 股</div>
                                        <div>50000</div>
                                    </div>
                                </div>
                                <el-button class="apply" type="danger" plain>立刻申请</el-button>
                            </el-col>

                            <!-- 按月配资 -->
                            <el-col :span="6" class="particulars">
                                <h3>按月配资</h3>
                                <el-button class="title_btn" type="danger">不收取管理费，盈利7成归您</el-button>
                                <br>
                                <div class="tese">
                                    <strong>60</strong>元 / 1万
                                    <br>
                                    <span>所有费用</span>
                                </div>
                                <div class="tese_details">
                                    <div>
                                        <div>投资沪深：</div>
                                        <div style="text-align:left">仓位:</div>
                                    </div>
                                    <div>
                                        <div>A 股</div>
                                        <div>不限制</div>
                                    </div>
                                </div>
                                <el-button class="apply" type="danger" plain>立刻申请</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <!-- 股票 -->
                <el-row class="configuration">
                    <el-col :span="6" class="c_business" style="background-image: url('static/image/home/index_m4.png')">
                        <h1 class="stock_title">行情中心</h1>
                        <span>大盘动向一览无余 </span>
                        <br>
                        <span>指数实时关心</span>
                        <ul class="btn_1">
                            <li @click="行情类型=0" :class="{active:行情类型==0}">上证指数</li>
                            <li @click="行情类型=1" :class="{active:行情类型==1}">深证指数</li>
                        </ul>
                    </el-col>
                    <el-col :span="18" class="with_funding">
                        <el-row class="stockaa">
                            <!-- 股票图片 -->
                            <el-col :span="13" class="stockaa_img">
                                <!-- <el-tabs type="border-card"> -->
                                    <!-- 这是数组写法 -->
                                    <el-tabs tab-position="top">
                                        <el-tab-pane label="分时线" class="img_box">
                                            <img v-if="行情类型==0" :src="'https://image.sinajs.cn/newchart/min/n/sh000001.gif?v='+time" alt>
                                            <img v-if="行情类型==1" :src="'https://image.sinajs.cn/newchart/min/n/sz000001.gif?v='+time" alt>
                                        </el-tab-pane>
                                        <el-tab-pane label="日K线" class="img_box">
                                            <img v-if="行情类型==0" :src="'https://image.sinajs.cn/newchart/daily/n/sh000001.gif?v='+time" alt>
                                            <img v-if="行情类型==1" :src="'https://image.sinajs.cn/newchart/daily/n/sz000001.gif?v='+time" alt>
                                        </el-tab-pane>
                                        <el-tab-pane label="周K线" class="img_box">
                                            <img v-if="行情类型==0" :src="'https://image.sinajs.cn/newchart/weekly/n/sh000001.gif?v='+time" alt>
                                            <img v-if="行情类型==1" :src="'https://image.sinajs.cn/newchart/weekly/n/sz000001.gif?v='+time" alt>
                                        </el-tab-pane>
                                        <el-tab-pane label="周K线" class="img_box">
                                            <img v-if="行情类型==0" :src="'https://image.sinajs.cn/newchart/monthly/n/sh000001.gif?v='+time" alt>
                                            <img v-if="行情类型==1" :src="'https://image.sinajs.cn/newchart/monthly/n/sz000001.gif?v='+time" alt>
                                        </el-tab-pane>
                                    </el-tabs>
                                <!-- </el-tabs> -->
                            </el-col>
                            <!-- 股票行情说明 -->
                            <el-col :span="11" class="stockaa_text">
                                <div class="stockaa_text_title">
                                    <div>
                                        涨跌龙虎榜
                                    </div>
                                    <div>
                                        <img src="static/image/home/shuaxin.png" alt>
                                    </div>
                                </div>
                                <el-row class="title_1">
                                    <el-col :span="12" class="red">
                                        <span>涨幅榜</span>
                                        <img src="static/image/home/sz.png" alt>
                                    </el-col>
                                    <el-col :span="12" class="green">
                                        <span>跌幅榜</span>
                                        <img src="static/image/home/xd.png" alt>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="stockaa_text_text" v-for="(item, index) in 10" :key="index">
                                            <div>[300771]N智莱</div>
                                            <div class="red">4.04/+10.08%</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="stockaa_text_text" v-for="(item, index) in 10" :key="index">
                                            <div>[000890]法尔胜</div>
                                            <div class="green">2.30/+10.05%</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <!-- 新闻中心 -->
                <el-row class="journalism">
                    <el-col :span="8" class="download">
                        <h3>交易软件下载</h3>
                        <p>新用户注册并实名认证后</p>
                        <p>请下载安装此交易软件</p>
                        <p>
                            <img :src="imgAdrees+loginImg">
                        </p>
                        <p>
                            <router-link to="/software">
                                <el-button type="danger">立即下载</el-button>
                            </router-link>
                        </p>
                    </el-col>
                    <el-col :span="8" class="report">
                        <h3>新闻报道</h3>
                        <ul>
                            <li @click="$router.push('/about/new?id='+item.id)" v-for="(item, index) in newList" :key="index">
                                <div>{{item.id}}</div>
                                <!-- <div>一上午卖了60亿!首只科创板基金易方达科技创新大热</div> -->
                                <div>04-26</div>
                            </li>

                        </ul>
                    </el-col>
                    <el-col :span="8" class="information">
                        <h3>行业资讯</h3>
                        <ul>
                            <li @click="$router.push('/about/new?id='+item.id)" v-for="(item, index) in informationList" :key="index">
                                <div>{{item}}一上午卖了60亿!首只科创板基金易方达科技创新大热</div>
                                <!-- <div>一上午卖了60亿!首只科创板基金易方达科技创新大热</div> -->
                                <div>04-26</div>
                            </li>
                        </ul>
                    </el-col>
                </el-row>

                <!-- 业务流程-->
                <div class="flow">
                    <ul>
                        <li>
                            <div>
                                <img src="../../assets/imgs/666_01.png" alt>
                                <p>注册登录</p>
                                <p>0元免费开户</p>
                            </div>
                            <div>
                                <img src="../../assets/imgs/777.png" style="margin-top:60px;" alt>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="../../assets/imgs/666_01.png" alt>
                                <p>注册登录</p>
                                <p>0元免费开户</p>
                            </div>
                            <div>
                                <img src="../../assets/imgs/777.png" style="margin-top:60px;" alt>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="../../assets/imgs/666_01.png" alt>
                                <p>注册登录</p>
                                <p>0元免费开户</p>
                            </div>
                            <div>
                                <img src="../../assets/imgs/777.png" style="margin-top:60px;" alt>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="../../assets/imgs/666_01.png" alt>
                                <p>注册登录</p>
                                <p>0元免费开户</p>
                            </div>
                            <div>
                                <img src="../../assets/imgs/777.png" style="margin-top:60px;" alt>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div style="background:#F7F7F7; height:30px;"></div>
        <!-- 聊天对话 -->
        <div class="dialogue">
            <ul>
                <!-- 咨询 -->
                <div class="relation_box">
                    <a class="hrefIcon" href="00089888"> <i class="iconfont icon-huaban-"></i><br><span>客服</span> </a>
                </div>
                <!-- 客服 -->
                <div class="relation_box consult_box">
                    <a class="hrefIcon" href="00089888">
                        <i class="iconfont icon-huaban-"></i><br>
                        <span>咨询</span></a>
                    <div class="contact_way">
                        <p>客服QQ</p>
                        <el-button @click="kf_relation( )" size="mini" round type="danger">点击交谈</el-button>
                        <p>财务QQ</p>
                        <el-button @click="cw_relation( )" size="mini" round type="danger">点击交谈</el-button>
                        <p>技术QQ</p>
                        <el-button @click="js_relation( )" size="mini" round type="danger">点击交谈</el-button>
                    </div>
                </div>
                <!-- 电话-->
                <div class="relation_box phone_code">
                    <i class="iconfont icon-phone"></i><br>
                    <span>电话</span>
                    <div class="code_num">123456789</div>
                </div>

                <!-- app公众号二维码 -->
                <div class="relation_box gzh_app">
                    <i class="iconfont icon-APPku"></i><br>
                    <span>APP</span>
                    <div class="contact_APP">
                        <img src="../../assets/imgs/wx01.jpg" alt>
                    </div>
                </div>
                <!-- wx公众号二维码 -->
                <div class="relation_box gzh_app">
                    <i class="iconfont icon-weixin"></i><br>
                    <span>公众号</span>
                    <div class="contact_APP">
                        <img src="../../assets/imgs/wx01.jpg" alt>
                    </div>
                </div>
                <!-- 返回顶部按钮 -->
                <div class="relation_box" @click="scroll( )">
                    <i class="iconfont icon-fanhuidingbu"></i><br>
                    <span>返回</span>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { banner } from "@/api/api.js";
// 引入蒙层组件
import Obscuration from "@/components/obscuration/Obscuration.vue";
// import { request } from 'http';
export default {
    data() {
        return {
            newList: [
                // {id:1 , title:"一上午卖了60亿!"},
                // {id:2,title:"5月起 这些新规将影响你的生活"},
                //  {id:3,title:"5月起 这些新规将影响你的生活"},
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
            ],
            informationList: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
            ],
            loginImg: "/imgs/logo-2.png",
            imgList: [
                { url: 'static/image/banner01.png'},
                { url: 'static/image/banner02.png'},
                { url: 'static/image/banner03.png'},
                { url: 'static/image/banner04.png'},
                { url: 'static/image/banner05.png'},
            ],
            行情类型:0,
            time:new Date().getTime(),
            跌幅:[],
            涨幅:[]
        };
    },
    components: {
        // 注册组件
        Obscuration
    },
    methods: {
        // 点击立即注册触发的函数，
        registered() {
            this.$router.history.push("/registered");
        },
        //客服qq交谈触发的函数
        kf_relation() {
            alert("点击客服 QQ交谈触法的函数");
        },
        //财务qq交谈触发的函数
        cw_relation() {
            alert("点击财务 QQ交谈触法的函数");
        },
        //技术qq交谈触发的函数
        js_relation() {
            alert("点击技术 QQ交谈触法的函数");
        },
        //  点击返回顶部触发的函数
        scroll() {
            //定义计时器
            let timer = null;
            //开启计时器
            timer = setInterval(function () {
                // 简单理解： 点击返回顶部按钮，每隔多少毫秒在原有的滚动距离之上减去10px,直到0px位置
                //获取当前的滚动距离
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                //判断滚动距离
                if (sTop <= 0) {
                    clearInterval(timer);
                } else {
                    //在sTop上减去50像素，然后在赋值给当前滚动条
                    document.documentElement.scrollTop = sTop - 10;
                    document.body.scrollTop = sTop - 10;
                }
            }, 5);
        },
        实时更新(){
            var _this=this
            let connection = new signalR.HubConnectionBuilder().withUrl("http://10.10.27.17:8888/PushHub", {
                // accessTokenFactory: () => this.token.access_token
            }).build();
            connection.on("PushStock", function (messageData) {
                // this.zhixuan = messageData
            })
            connection.on("PushGanisAndDeclines", function (data) {
                console.log(data);
                _this.涨幅=data.gains
                _this.跌幅=data.declins
            })
            //监听连接开始逻辑控制，catch捕获异常回调
            connection.start().then((res) => {
                console.log("集线器：连接成功。", res);
            }).catch((err) => {
                console.log("集线器：连接失败。", err);
            });
        },
    },
    mounted() {
        this.实时更新();

        // var url="wss://www.76438.net:5000/socket.io/?EIO=3&transport=websocket&sid=rG3ZplHEEAvQ7JzHAR9-"
        var url="wss://www.76438.net:5000/socket.io/?EIO=3&transport=websocket&sid=rG3ZplHEEAvQ7JzHAR9-"
        function WebSocketTest(){
            if ("WebSocket" in window){
               // 打开一个 web socket
                var ws = new WebSocket(url);
                ws.onopen = function(){
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    // ws.send("发送数据");
                    console.log("数据发送中...");
                };
                ws.onmessage = function (evt) { 
                    var received_msg = evt.data;
                    console.log(evt)
                    // alert("数据已接收...");
                };
                ws.onclose = function(){ 
                    console.log('链接已关闭')
                };
            }else{
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
        }
        WebSocketTest()
        // banner().then(x => {
        //     // console.log(x);
        //     if (x.data.code == 200) {
        //         this.imgList = x.data.list;
        //     }
        // });


    },
};
</script>
<style lang="scss" scoped>

// created3、beforeMount   挂接4、mounted5
// 右侧固定nav
.dialogue {
    width: 60px;
    height: 495px;
    text-align: center;
    position: fixed;
    right: 0px;
    bottom: 150px;
    z-index: 100 !important;
    .consult_box:hover .contact_way {
        //第二个咨询的hover效果
        display: block;
    }
    .gzh_app:hover .contact_APP {
        //第二个咨询的hover效果
        display: block;
    }
    .phone_code:hover {
        transform: translateX(-140px);
    }
    .phone_code {
        transition: all 1s;
        .code_num {
            line-height: 60px;
            font-size: 20px;
            font-weight: 600;
            width: 140px;
            height: 100%;
            position: absolute;
            left: 100%;
            top: 0px;
            background: red;
            color: #fff;
        }
    }
    .relation_box {
        width: 60px;
        height: 60px;
        margin-bottom: 3px;
        background: red;
        vertical-align: middle;
        color: #fff;
        margin-bottom: 10px;
        padding-top: 6px;
        position: relative;
        .hrefIcon {
            color: #fff;
        }
        i {
            font-size: 26px;
            font-weight: 1200px !important;
        }
        // 咨询hover弹窗
        .contact_way {
            width: 170px;
            height: 210px;
            position: absolute;
            left: -195px;
            top: -73px;
            background: #fff;
            border: 1px solid red;
            border-radius: 8px;
            display: none;
            p {
                color: black;
                text-align: left !important;
                margin: 6px 0px 10px 5px;
            }
        }
        // apphover弹窗
        .contact_APP {
            width: 120px;
            height: 120px;
            position: absolute;
            left: -142px;
            top: -20px;
            background: #fff;
            display: none;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
// 右侧固定nav

.bjs {
    background-color: #f7f7f7;
    //  新闻中心
    .journalism {
        height: 320px;
        // background:red;
        margin-top: 30px;
        h3 {
            height: 60px;
            line-height: 60px;
            // background:red;
            border-bottom: 1px solid #f7f7f7;
            color: #333333;
        }
        .download {
            background: #fff;
            height: 320px;
            padding: 0px 15px 0px 15px;

            p {
                text-align: center;
                line-height: 50px;
                color: black;
                .el-button {
                    width: 140px;
                    font-size: 16px;
                }
            }
        }
        .report,
        .information {
            //两个8的格子 新闻列表
            padding: 0px 15px 0px 15px;
            background: #fff;
            height: 320px;
            color: 12px;
            ul {
                li {
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                    line-height: 29px;
                }
            }
        }
    }
}

// 业务流程
.flow {
    background: #fff;
    height: 160px;
    margin-top: 30px !important;
    ul {
        background: #fff;
        height: 160px;
        display: flex;
        justify-content: space-around;
        li {
            width: 200px;
            height: 160px;
            list-style: none;
            display: flex;
            justify-content: space-around;
            img {
                margin-top: 20px;
            }
        }
    }
}
.el-tabs__content {
    padding: 0px !important;
}

// 股票样式
.el-tabs {
    box-shadow: none !important;
}
.el-tabs--bottom {
    box-shadow: none !important;
    height: 316px;
}
.stockaa {
    height: 360px;
    
    .stockaa_img {
        padding: 0px 20px;
        ::v-deep .el-tabs__nav{
            width: 100%;
            text-align: center;
        }
        ::v-deep .el-tabs__item{
            width: 25%;
        }
        .el-tab-pane {
            img {
                width: 100%;
            }
        }
    }
    // 股票走势中间table结束
    // 股票走势列表
    .stockaa_text {
        border-left: 1px solid #f5f5f5;
        .stockaa_text_title {
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
            div {
                height: 19px;
                line-height: 19px;
                margin: 10px 20px 10px 20px;
            }
        }
        .title_1{
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid #f5f5f5;
        }
        .stockaa_text_text {
            display: flex;
            font-size: 12px;
            padding: 0px 0px 0px 3px;
            line-height: 26px;
            >div:nth-child(1){
                min-width: 100px;
            }
        }
    }
}
// 股票走势列表结束

// banner图里面小框
.banner {
    position: relative;
}
.registered_box {
    position: absolute;
    top: 0px;
    z-index: 3;
    top: 40px;
    right: 20%;
    .registered {
        width: 300px;
        height: 300px;
        background: #fff;
        position: relative;
        border-radius: 10px;
        text-align: center;
        padding: 46px 30px 60px 30px;
        box-sizing: border-box;

        span {
            line-height: 30px;
        }
        .login-btn {
            width: 200px;
            background: red;
            border: none;
            color: #fff;
            margin: 10px auto 20px auto;
        }
    }
}
// banner图里面小框结束

// LED滚动
.mbx-box {
    background: #ffffff;
    border-bottom: 1px solid #ccc;
    height: 60px;
    line-height: 60px;
    font-size:14px;
}


/* Make it pretty */
.microsoft {
    position: relative;
    font: 16px "Segoe UI", Tahoma, Helvetica, Sans-Serif;
}
/* ::before was :before before ::before was ::before - kthx */
.microsoft:before,
.microsoft::before {
    z-index: 2;
    content: "";
    position: absolute;
    top: -1em;
    left: -1em;
    width: 0.5em;
    height: 0.5em;
    box-shadow: 1em 1.25em 0 #f65314, 1.6em 1.25em 0 #7cbb00,
        1em 1.85em 0 #00a1f1, 1.6em 1.85em 0 #ffbb00;
}

.microsoft:after,
.microsoft::after {
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2em;
    height: 2em;
    background-image: linear-gradient(90deg, white 70%, rgba(255, 255, 255, 0));
}
// LED滚动结束

// 业务展示板块
.业务展示{
    background: #ffffff;
    padding: 30px 0px;
}
.business {
    color:#333333;
    display: flex;
    align-items: center;
    .business_div {
        width: 64px;
        height: 64px;
        margin: 0px 10px 0px 0px;
        transition: all 0.3s;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }
    }
    &:hover{
        .business_div{
            img{
                transform: rotateY(180deg);
            }
        }
        .text_1{
            color: #bb9767;
        }
    }
    .text_1{
        div{
            margin: 10px 0px 0px;
            font-size: 14px;
        }
    }
}

//  <!-- 配资 -->
.configuration {
    background: #fff;
    // 6的框
    .c_business {
        //  box-sizing: border-box;
        padding: 35px;
        height: 360px;
        // background-image: url("../../assets/imgs/configure-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        .stock_title {
            width: 138px;
            height: 60px;
            margin: 0px 0px 25px 0px;
            border-bottom: 1px solid #fff;
            color: #fff;
        }
        span {
            color: #fff;
            line-height: 25px;
            font-size: 14px;
        }
    }
    .with_funding {
        //  box-sizing: border-box;
        border-top: 3px solid red;
        .particulars {
            box-sizing: border-box;
            padding: 0px 10px 0px 10px;
            text-align: center;
            .title_btn {
                padding: 0px;
                width: 100%;
                height: 28px;
                color: red;
                text-align: center;
                background: #fbd1d3;
                border: none;
                line-height: 8px;
            }
            .tese {
                strong {
                    font-size: 60px;
                    color: red;
                    font-weight: 500;
                }
                span{
                    font-size: 14px
                }
            }
            .tese_details {
                height: 80px;
                //  background:cornflowerblue;
                display: flex;
                justify-content: space-between;
                padding-top: 20px;
                font-size: 14px;
                margin-top: 10px;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
            }
            .apply {
                margin-top: 14px;
            }
        }
    }
    .btn_1{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        color: #ffffff;
        line-height: 38px;
        text-align: center;
        margin-right: -36px;
        li{
            cursor: pointer;
            margin: 12px 0px 0px;
            width: 110px;
            border: 1px solid #ffffff;
            &.active{
                background: #ffffff;
                color: #fc8819;
            }
        }
    }
}
</style>





<style lang="scss" scoped>
.container {
    //版心
    width: 1200px;
    margin: 0 auto;
}
a {
    text-decoration: none;
}
// element-Ui轮播图
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
</style>



