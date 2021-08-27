<template>
    <div id="app" @click="点击app()">
        <!-- 路由出口 -->

        <Head :滚动条位置="app滚动条位置"></Head>
        <router-view />
        <Footer></Footer>
        <!-- 右侧固定导航栏 -->

        <div :class="{
            btn:true,
            active:activeName === a.haha
        }"></div>

        
        <div class="service">
            <ul>
                <li v-popover:popover1 v-if="技术支持">
                    <i class="iconfont icon-emizhifeiji"></i>
                    <p>技术支持</p>
                </li>
                <el-popover v-if="技术支持" popper-class="纸飞机弹框" ref="popover1" placement="right-start" trigger="click" width="150">
                    <a :href="(vuexconfig.telegram && vuexconfig.telegram.a) ? vuexconfig.telegram.a : 'javascript:;'" target="view_window">
                        <div class="icon_box">
                            <i class="iconfont icon-telegram"></i>
                        </div>
                        <div class="text_1">
                            <div>技术支持-Telegram</div>
                        </div>
                    </a>
                    <div class="text_2">
                        <span>{{vuexconfig.telegram ? vuexconfig.telegram.number : ''}}</span>
                    </div>
                    <a :href="(vuexconfig.telegram && vuexconfig.telegram.a) ? vuexconfig.telegram.a : 'javascript:;'" target="view_window">
                        <div>欢迎加入我们</div>
                    </a>
                </el-popover>
                <li @click="onLineService()">
                    <i class="iconfont icon-liaotian"></i>
                    <p>在线客服</p>
                </li>
                <li v-if="!隐藏wx" v-popover:popover4 @click="设置微信二维码()">
                    <i class="iconfont icon-weixin"></i>
                    <p>微信客服</p>
                </li>
                <el-popover popper-class="二维码弹框" v-model="显示二维码" ref="popover4" :disabled="disabled" placement="right" width="150">
                    <img :src="vuexconfig.api_url+'/App_Upload/wechatkf.jpg'" alt />
                </el-popover>
                <li v-if="!隐藏qq" @click="QQService()">
                    <i class="iconfont icon-qq"></i>
                    <p>QQ客服</p>
                </li>
                <li v-if="!userInfo.UserId" @click="playTest()">
                    <i class="iconfont icon-huaban"></i>
                    <p>试玩体验</p>
                </li>
                <li v-if="站点配置.appUrl">
                    <router-link to="/phone" class="font_c">
                        <i class="iconfont icon-44"></i>
                        <br />
                        <span>手机投注</span>
                    </router-link>
                </li>
                <li @click="goTop()" :class="{'active':app滚动条位置>80}" v-show="app滚动条位置>80">
                    <i class="iconfont icon-fanhuidingbu-"></i>
                    <p>返回顶部</p>
                </li>
            </ul>
        </div>
        <!-- 右侧固定导航栏 结束-->
        <!-- 登录弹出框 -->
        <logoDialog />
        <!-- 进入游戏弹框 -->
        <jryx />

        <!-- 试玩弹框 -->
        <sytk v-if="显示试玩弹框" />
        <!-- 系统弹框 -->
        <xttk />
        <!-- 系统消息 -->
        <el-dialog title="您有新的消息" :visible.sync="显示系统Messages" width="700px" center class="系统Messages" :close-on-click-modal="false" :before-close="closeMessage">
            <span v-html="系统Messages"></span>
            <span slot="footer" class="dialog-footer">
                <el-button style="width:100%" type="primary" size="small" @click="closeMessage()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { api_登录试玩 } from '@/api/登录接口.js'
import { api_隐藏公告 } from '@/api/公告接口.js'

import $ from 'jquery'
import Head from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import logoDialog from '@/components/登录弹出框.vue'
import xttk from '@/components/系统公告.vue'
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

const jryx = () => import('@/components/进入游戏弹出框.vue')
const sytk = () => import('@/components/试玩弹框.vue')

export default {
    provide() {
        return {
            关闭试玩: () => {
                this.显示试玩弹框 = false
            }
        }
    },
    data() {
        return {
            显示二维码: false,
            returnTop: true,
            app滚动条位置: 0,
            显示试玩弹框: false,
            timeinfo: '',
            time_2: '',
            info: {},
            init2: false
        }
    },
    components: {
        // 注册组件
        Head,
        Footer,
        logoDialog,
        jryx,
        sytk,
        xttk
    },
    computed: {
        ...mapGetters({
            站点配置: '站点配置',
            试玩: "试玩",
        }),
        ...mapState({
            userInfo: 'userInfo',
            vuexconfig: 'config',
            显示系统Messages: '显示系统Messages',
            ip: 'ip',
            技术支持: '技术支持'
        }),
        系统Messages() {
            return (this.userInfo.Messages && this.userInfo.Messages.length > 0) ? this.userInfo.Messages[0].Content : ''
        },
        //禁用二维码
        disabled() {
            if (!this.userInfo.UserId) {
                return true
            } else if (this.试玩) {
                return true
            } else {
                if (this.userInfo.Ck >= config.ck) {
                    return false
                } else {
                    return true
                }
            }
        },
        隐藏qq() {
            return this.站点配置.qq === false
        },
        //隐藏微信客服
        隐藏wx() {
            return this.站点配置.hideWx
        }
    },
    methods: {
        ...mapMutations({
            设置用户信息: '设置用户信息',
            修改config: '修改config',
            修改state: '修改state'
        }),
        ...mapActions({
            getUserInfo: 'getUserInfo'
        }),
        设置微信二维码() {
            if (!this.userInfo.UserId) {
                this.$confirm('登录后可查看微信二维码，是否现在去登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.修改state(['显示登录框', true]);
                }).catch(() => { });
            } else if (this.试玩) {
                this.$message('请使用非试玩账号查看！');
            } else if (this.userInfo.Ck < config.ck) {
                this.$confirm('充值少于' + config.ck + '次无法显示，是否现在去充值?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/iframe/deposit')
                }).catch(() => { });
            }
        },
        async closeMessage() {
            var obj = {
                Id: this.userInfo.Messages[0].Id,
                Type: 2,
                groupId: null
            }
            await api_隐藏公告(obj)
            this.getUserInfo()
            this.修改state(['显示系统Messages', false])
        },
        onLineService() {
            if (this.站点配置.online_chat) {
                window.open(this.站点配置.online_chat)
            } else {
                window.open(config.online_chat)
            }
        },
        QQService() {
            // 点击QQ客服触发的函数
            if (this.站点配置.qq) {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.站点配置.qq + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${this.站点配置.qq}`)
            } else {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + config.qq + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${config.qq}`)
            }
        },
        playTest() {
            this.显示试玩弹框 = true
            api_登录试玩().then(x => {
                console.log(x)
                this.$message.success('恭喜你试玩账号登陆成功')
                this.getUserInfo()
            }).catch(err => {
                console.log(err)
            })
            // 点击试玩体验触发的函数
            // alert("点击试玩体验触发的函数");
        },
        // 每100毫秒获取一次app窗口向上的距离
        goTop() {
            $('body,html').animate({ scrollTop: 0 }, 300)
        },
        scroll(e) {
            // console.log(e.target.scrollTop);
            this.app滚动条位置 = e.target.scrollTop
        },
        点击app() { // 点击最顶级组件触发的函数
            // console.log('点击了APP清除定时器重新定时')
            try {
                clearTimeout(this.time_2)
                // console.log('清楚定时器')
            } catch (error) {
                console.log(error)
            }
            // 如果没有登录不需要计时
            if (this.userInfo.UserId && config.time > 0) {
                var itemS = config.time
                this.time_2 = setTimeout(() => {
                    this.$alert('<div><img src="image/chaoshi.gif"/></div>', '', {
                        dangerouslyUseHTMLString: true,
                        customClass: 'addalert',
                        callback: action => {
                            location.reload()
                        }
                    })
                    clearInterval(this.timeinfo)
                }, 1000 * itemS)
            }
        },
        定时获取用户信息() {
            console.log('调用用户信息')
            var this_1 = this
            this.getUserInfo()
            if (this.userInfo.UserId) {
                try {
                    clearTimeout(this.timeinfo)
                } catch (error) { }
                this.timeinfo = setTimeout(() => {
                    this.getUserInfo()
                }, 1000 * 30);

                if (!this.time_2 && config.time > 0) {
                    var itemS = config.time
                    // 开始计时判断是否长时间没有点击页面
                    this.time_2 = setTimeout(() => {
                        this.$alert('<div><img src="image/chaoshi.gif"/></div>', '', {
                            dangerouslyUseHTMLString: true,
                            customClass: 'addalert',
                            callback: action => {
                                location.reload()
                            }
                        })
                        clearInterval(this.timeinfo)
                    }, 1000 * itemS)
                }
            } else {
                // 如果没有登录停止定时器
                clearTimeout(this.timeinfo)
                // clearInterval(this.timeinfo)
                clearTimeout(this.time_2)
            }
        }
    },
    // 判断是电脑版还还是手机版访问
    beforeCreate: function () {
        if (window.innerWidth <= 750 || window.outerWidth <= 750) {
            // location.href = config.mobile_url
            location.href = location.origin
        }
    },
    created: function () {

        var this_1 = this
        if (config.weihu == true) {
            window.location.href = 'err.html'
        }
        var url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
        $.ajax({
            type: 'get',
            url: config.api_url + '/App_Upload/Agents/Json/' + url + '.json',
            // url: config.api_url+'/App_Upload/Agents/Json/www.209132.com.json',
            data: '',
            success: (data) => {
                console.log(data)
                document.title = data.Title
                if (data.Logo) {
                    // 设置LOGO
                    this.修改config(['showlogo', true])
                    this.修改config(['logo', '/App_Upload/Agents/Logo/' + data.Id + '.png'])

                    document.querySelector('link[rel="icon"]').href = '/App_Upload/Agents/ico/' + data.Id + '.ico'
                    // document.  favicon.ico
                } else {
                    document.querySelector('link[rel="icon"]').href = "favicon.ico"
                    // this.修改config(['phonePage', true])
                }
                this.修改config(['title', data.Title])
                this.修改config(['getConfig', 1])
                this.修改config(['logoType', 0])

                // //底部文字
                var footer_text = this.vuexconfig.footer_text
                var text = footer_text.replace(title, data.Title)
                this.修改config(['footer_text', text])
                // //滚动字幕
                var roll_text = this.vuexconfig.roll_text
                for (let i = 0; i < roll_text.length; i++) {
                    roll_text[i].text = roll_text[i].text.replace(title, data.Title)
                }
                // 修改QQ
                if (data.QQ) {
                    this.修改config(['qq', data.QQ])
                }
            },
            error: (err) => {
                document.title = this.vuexconfig.title
                document.querySelector('link[rel="icon"]').href = "favicon.ico"
                // this.修改config(['phonePage', true])
                this.修改config(['showlogo', true])
                this.修改config(['getConfig', 3])
            }
        })

        //获取ip
        if (this.vuexconfig.telegram && this.vuexconfig.telegram.number) {
            if (this.ip) {
                var cname = this.ip.cname;
                cname = cname.toUpperCase();
                if (this.vuexconfig.telegram.whiteList.find(x => x.toUpperCase() == cname)) {
                    this.修改state(['技术支持', true])
                }
            } else {
                console.log('获取ip')
                $.ajax({
                    type: 'get',
                    // url: "http://pv.sohu.com/cityjson?ie=utf-8",
                    url: "//pv.sohu.com/cityjson?ie=utf-8",
                    dataType: "script",
                    success: (data) => {
                        console.log('获取ip:', returnCitySN)
                        this.修改state(['ip', returnCitySN])
                        var cname = returnCitySN.cname;
                        cname = cname.toUpperCase();
                        if (this.vuexconfig.telegram.whiteList.find(x => x.toUpperCase() == cname)) {
                            this.修改state(['技术支持', true])
                        }
                    }
                });
            }
        }

    },
    beforeMount: function () {
    },
    mounted: function () {
        var this_1 = this
        setTimeout(() => {
            this.init2 = true
        }, 500);
        this.定时获取用户信息()
        // $('body,html').scroll(function(e){
        //     console.log(e)
        // })
        $(document).scroll(function (e) {
            this_1.app滚动条位置 = $(this).scrollTop()
        })
    },
    beforeUpdate: function () {
    },
    updated: function () {
    },
    beforeDestroy: function () {
    },
    destroyed: function () {
    },
    watch: {
        'userInfo.UserId'() {
            setTimeout(() => {
                this.定时获取用户信息()
            }, 1000 * 30);
        },
        '$route'() {
            if (this.init2) {
                this.修改state(['Online_init', true]);
                this.定时获取用户信息()
                console.log('路由发生变化')
            }
        }
    }
}
</script>

<style lang="scss">
.纸飞机弹框 {
    text-align: center !important;
    padding: 0px 0px 10px !important;
    a {
        color: #000;
    }
    .icon_box {
        color: #1296db;
        font-size: 50px;
        flex-shrink: 0;
    }
    .text_1 {
        font-size: 12px;
    }
    .text_2 {
        font-size: 16px;
        color: #1296db;
        font-weight: bold;
    }
}

.二维码弹框 {
    height: 150px;
    padding: 0px !important;
    img {
        width: 100%;
        height: 100%;
    }
}
#app {
    padding: 116px 0px 0px;
}
.el-message {
    top: 30% !important;
}
//超时提醒弹窗
.addalert {
    width: 596px !important;
    height: 240px;
    background: url("~@/assets/image/chaoshi.gif") no-repeat !important;
    border-radius: 18px !important;
    position: relative;
    /deep/ .el-message-box__header {
        padding: 0px;
    }
    /deep/ .el-message-box__content {
        padding: 0px;
    }
    /deep/.el-message-box__headerbtn .el-message-box__close {
        color: #eee !important;
        font-size: 36px !important;
        position: absolute;
        top: -13px;
        right: -14px;
        z-index: 101;
    }
    /deep/ .el-button {
        position: absolute;
        width: 245px;
        top: 163px;
        right: 38px;
        z-index: 102;
        background: none !important;
        border-radius: 35px;
        height: 51px;
        color: rgba(0, 0, 0, 0) !important;
        border: none;
    }
    /deep/ .el-button--primary:hover {
        color: rgba(0, 0, 0, 0) !important;
        background: none !important;
        border-color: none !important;
    }
}
.LoadingDem {
    color: red;
}
// 蒙城样式
.form_box {
    width: 500px;
    height: 500px;
}
// 右侧客服固定
.service {
    width: 78px;
    // height:390px;
    position: fixed;
    right: 0px;
    bottom: 150px;
    bottom: 16vh;
    z-index: 10 !important;
    margin-left: 800px;
    color: #fff;
    background: black;
    ul {
        li.active {
            border-bottom: 1px solid red;
            background: red;
        }
        li:hover {
            border-bottom: 1px solid red;
            background: red;
            transition: all 0.5s;
        }
        li {
            cursor: pointer;
            text-align: center;
            background: #191c25;
            width: 100%;
            height: 78px;
            border-bottom: 1px solid black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            i {
                font-size: 30px;
            }
            .icon-huaban {
                font-size: 46px;
                line-height: 48px;
            }
        }
    }
}

html {
    height: 100%;
}
body {
    overflow: auto;
    min-width: 1230px;
    padding-right: 0px !important;
    font-size: 12px;
}
html,
body,
ul,
li {
    padding: 0px;
    margin: 0px;
}

ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
input,
span,
div,
a,
p {
    padding: 0px;
    margin: 0px;
}

#app {
    // height: 100%;
    // overflow: auto;
}

.clear {
    clear: both;
}

li {
    list-style: none;
}
a {
    text-decoration: none;
}
.container {
    //版心
    width: 1200px;
    margin: 0 auto;
}
.red {
    color: red;
}
.font_c {
    color: #fff;
}
.b_green {
    background: green;
}
.c_blue {
    color: blue;
}
.c_ccc {
    color: #898a8b;
}
.b_red {
    background: red;
}
.b_blick {
    background: rgba(0, 0, 0, 0.6);
}
/* LED滚动条 */
.LED_text {
    cursor: pointer;
    position: absolute;
    line-height: 36px;
    color: #fff;
    font-size: 13px;
}
.tb-news:hover {
    animation-play-state: paused;
}
.tb-news {
    width: 100%;
    height: 36px;
    position: relative;
    overflow: hidden;
    z-index: 2;
    margin-top: -37px;

    .tb-news-bg {
        width: 100%;
        height: 36px;
        position: absolute;
        background: #000;
        -moz-opacity: 0.6;
        opacity: 0.6;
        filter: alpha(opacity=60);
    }

    .tb-news-bt .bn-title {
        float: left;
        width: 100px;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        text-indent: 34px;
        color: #fff;
    }

    .tb-news .tb-news-span {
        margin-right: 50px;
        font-size: 12px;
        color: white;
        line-height: 36px !important;
    }
}

.tb-news .tb-news-maq {
    cursor: pointer;
    position: absolute;
    line-height: 36px;
}

.系统Messages {
    .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
}
/* LED滚动结束 */
</style>
