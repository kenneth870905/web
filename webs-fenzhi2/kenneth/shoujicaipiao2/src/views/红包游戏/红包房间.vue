<template>
    <div>
        <header class="mui-bar mui-bar-nav" v-if="显示头部">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{name}}</h1>
            <button v-show="红包游戏state.user.ChatRole==1" class="mui-btn mui-btn-blue mui-btn-link btn_2" @click="房间禁言()">{{红包游戏state.房间已禁言 ? '解禁' :"禁言"}}</button>
            <div class="icon_box">
                <!-- <i @click="$router.push('/my/zxkf')" class="icon iconfont icon-kefu1"></i> -->
                <i @click="发红包()" class="icon iconfont icon-hongbao"></i>
            </div>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="内容" ref="content_1" @scroll="scroll($event)" @click="点击内容()">
                <li v-for="(item, index) in 红包游戏state.msglist" :key="index">
                    {{item.type}}
                    <!-- 文字 -->
                    <text1 v-if="item.Type==1" :obj="item" />

                    <!-- 6 扫雷红包 5 普通红包 8 禁抢 7 牛牛红包 -->
                    <hb v-else-if="item.Type==6 || item.Type==5 || item.Type==8" :obj="item" />
                    <!-- 禁抢结算 -->
                    <jqjs v-else-if="item.Type==2" :obj="item" />
                    <!-- 牛牛红包 -->
                    <nnhb v-else-if="item.Type==7" :obj="item"/>
                    <!-- 牛牛结算 -->
                    <nnjs v-else-if="item.Type==9" :obj='item'/>
                </li>

                <li class="连接提示">
                    <span v-show="红包游戏state.连接提示" class="mui-badge">{{红包游戏state.连接提示}}</span>
                </li>
                <li ref="a"></li>
            </ul>
            <footer2 ref="footer2" />
        </div>

        <!-- 红包弹框 -->
        <hbtk v-show="红包游戏state.领取红包.弹框" />

        <ul class="挂件" v-show="显示头部">
            <li @click="$router.push('/my/chongzhi')">
                <img :src="config.img_url+'static/image/hbgame/chongzhi2.png'" alt="" srcset="">
                <div>充值</div>
            </li>
            <li @click="$router.push('/hbGame/rule')">
                <img :src="config.img_url+'static/image/hbgame/wanfa2.png'" alt="" srcset="">
                <div>玩法</div>
            </li>
            <li @click="$router.push('/agent')">
                <img :src="config.img_url+'static/image/hbgame/jiameng2.png'" alt="" srcset="">
                <div>加盟</div>
            </li>
            <li @click="$router.push('/hbOrderList')">
                <img :src="config.img_url+'static/image/hbgame/jilu.png'" alt="">
                <div>记录</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { api_房间禁言 } from "@/api/聊天室接口.js";
import { mapActions, mapState, mapMutations } from 'vuex';

const hb = () => import("./components/红包.vue");
const nnhb = () => import("./components/牛牛红包.vue");
const text1 = () => import('./components/纯文字.vue');
const jqjs = () => import('./components/禁抢结算.vue');
const nnjs = () => import('./components/牛牛结算.vue');

const footer2 = () => import('./components/底部.vue');
const hbtk = () => import('./components/红包弹框.vue');

export default {
    name: "",
    components: { hb, nnhb, text1, jqjs, footer2, hbtk , nnjs },
    provide() {
        return {
            到底: () => {
                this.到达底部()
            }
        }
    },
    data() {
        return {
            name: "",
            显示头部: true,
            type: 100  //100 扫雷红包 300 禁抢红包
        }
    },
    computed: {
        ...mapState({
            config: 'config',
            红包游戏state: x => x.红包游戏
        })
    },
    methods: {
        ...mapActions({
            登录聊天室: '红包游戏/登录聊天室',
            退出聊天室: "红包游戏/退出聊天室",
            获取房间是否禁言: "红包游戏/获取房间是否禁言"
        }),
        发红包() {
            if (this.type == 100) {
                this.$router.push(`/hbGame/sendSaol?id=${this.红包游戏state.房间id}`)
            } else if (this.type == 300) {
                this.$router.push(`/hbGame/sendJQ?id=${this.红包游戏state.房间id}`)
            } else if (this.type == 200) {
                // this.$router.push(`/hbGame/sendJQ?id=${this.红包游戏state.房间id}`)
                this.$router.push(`/hbGame/sendNN?id=${this.红包游戏state.房间id}`)
            } else {
                this.$toast('未定义红包类型');
            }
        },
        点击内容() {
            this.$refs.footer2.显示更多 = 0
            this.显示头部 = true
        },
        scroll(e) {
            var s = e.target.scrollTop;
            var h1 = e.target.offsetHeight;
            var h2 = e.target.scrollHeight;
            // console.log(h1,t1,h2);
            if (h1 + s + 50 >= h2) {
                this.红包游戏state.未读条数 = 0
                this.红包游戏state.到达底部 = true
            } else {
                this.红包游戏state.到达底部 = false
            }
        },
        获取js(url) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "get",
                    url: url,
                    dataType: "script",
                    success: function (response) {
                        resolve()
                    },
                    error: function (err) {
                        reject()
                    }
                });
            });
        },
        async 进入聊天室() {
            var id = this.$route.query.id ? this.$route.query.id : '';
            if (typeof (appPage) != 'object') {
                try {
                    console.log('加载聊天js文件');
                    this.红包游戏state.连接提示 = '正在加载配置文件···'
                    await this.获取js(this.config.api_url + "/Scripts/signalR/jquery.signalR-2.2.2.js")
                    await this.获取js(this.config.api_url + '/signalr/hubs?v=5')
                    await this.获取js(this.config.api_url + '/Areas/MApi/Content/chat.js?v=5');
                } catch (error) {
                    console.log(error)
                    this.红包游戏state.连接提示 = '配置文件加载失败，请重试'
                    this.$toast('获取Js失败，稍后再试！')
                    return
                }
                this.登录聊天室(id);
            } else {
                this.登录聊天室(id)
            }
        },
        到达底部() {
            var scrollHeight = this.$refs.content_1.scrollHeight
            document.querySelector('.内容').scrollTo(0, scrollHeight)
            return
            // this.$refs.a.scrollIntoView({behavior:"smooth", block: 'start'})
            this.红包游戏state.到达底部 = true
            this.红包游戏state.未读条数 = 0
            this.$refs.a.scrollIntoView({ block: 'end' })
        },
        async 房间禁言() {
            var t = '';
            if (!this.红包游戏state.房间已禁言) {
                t = '此操作将会导致房间内所有人无法发言，是否继续？'
            } else {
                t = '确定解除房间解言？'
            }
            mui.confirm(t, '提示', ['确定', '取消'], value => {
                if (value.index == 0) {
                    this.禁言()
                }
            }, 'div')
        },
        禁言() {
            var obj = {
                chatId: this.红包游戏state.房间id,
                isMute: !this.红包游戏state.房间已禁言
                //  chatId (房间Id), isMute (true/false)
            }
            api_房间禁言(obj).then(x => {
                this.获取房间是否禁言();
                if (x.data.code == 0) {
                    this.$toast('设置成功')
                } else {
                    this.$toast(x.data.msg)
                }
            }).catch(err => {
                this.$toast('系统错误，稍后再试')
            })
        },
    },
    mounted() {
        this.type = this.$route.query.type;
        this.name = this.$route.query.name
        this.进入聊天室();
        setTimeout(() => {
            this.红包游戏state.到达底部 = true
            this.红包游戏state.未读条数 = 0
            this.$refs.a.scrollIntoView({ block: 'start' })
        }, 100);
    },
    destroyed() {
        let path = this.$route.path;
        // 发布红包         玩法规则            代理        充值        红包领取详情
        let pathList = ['/hbGame/sendSaol', '/hbGame/rule', '/agent', '/my/chongzhi', '/hbxq', '/hbGame/sendJQ', '/hbGame/sendNN','/hbGame/lqxq1']
        if (!pathList.find(x => x == path)) {
            this.退出聊天室()
        }
    },
    watch: {
        '红包游戏state.msglist'() {
            if (this.红包游戏state.到达底部) {
                this.$nextTick(() => {
                    this.到达底部()
                    setTimeout(() => {
                        this.到达底部()
                    }, 300);
                    // this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ block: 'start' })
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.btn_2 {
    position: absolute;
    top: 0px;
    right: 42px;
}
.mui-bar {
    .mui-title {
        text-overflow: ellipsis;
        right: 80px;
        left: 80px;
    }
    .icon_box {
        position: absolute;
        top: 0px;
        right: 0px;
        color: #ffffff;
        font-size: 26px;
        height: 100%;
        display: flex;
        align-items: center;
        i {
            margin: 0px 10px 0px 0px;
        }
    }
}

.mui-content {
    display: flex;
    flex-direction: column;
    background: #ffffff;
}
.内容 {
    flex: 1;
    overflow: auto;
}

.连接提示 {
    padding: _vw(20) 0px;
    text-align: center;
    color: #6f6f6f;
    font-size: _vw(12);
    > div {
        width: 50%;
        margin: 0px auto;
        line-height: _vw(30);
        border-radius: _vw(30);
        border: 1px solid #eeeeee;
    }
}

.挂件 {
    background: rgba(255,255,255,0.4);
    position: absolute;
    top: 60px;
    right: 10px;
    text-align: center;
    font-size: 13px;
    li {
        margin: 0px 0px 10px 0px;
    }
    img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
        background: #ffffff;
    }
}
</style>
