<template>
    <!-- <div id="app" ref="app" @touchstart="触碰屏幕($event)" @touchend="手指头离开屏幕($event)" :style="{'--var1':用户主题色.color}"> -->
    <div id="app" ref="app" @touchstart="触碰屏幕($event)" @touchend="手指头离开屏幕($event)" :class="appClass">

        <!-- <header class="mui-bar mui-bar-nav">
                <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">123</h1>
                <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">类型</button>
            </header> -->
        <!-- <div class="mui-content mui-fullscreen">
                </div>-->

        <router-view class="nav" name="nav"></router-view>

        <!-- <transition :name="pageDirection"> -->
        <!-- <transition name="slide"> -->
            <router-view class="Router" v-if="显示页面"></router-view>
        <!-- </transition> -->

        <div class="A加载中" v-show="加载中">
            <div>
                <van-loading color="white" size="50px" />
            </div>
        </div>
        <!-- 进入游戏弹框 -->
        <jryxtk />
        <!-- 系统消息弹框 -->
        <xtxx />


    </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
const jryxtk = () => import('@/components/进入游戏弹框.vue');
const xtxx = () => import('@/components/系统消息弹框.vue');
export default {
    name: "",
    components: {
        jryxtk,
        xtxx
    },
    data() {
        return {
            isLoading: false,
            count: 0,
            显示页面: true,
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0,
        }
    },
    computed: {
        ...mapState({
            config: "config",
            加载中: '加载中',
            pageDirection: 'pageDirection',
            上一页: "上一页",
            偏好设置:x=>x.user.偏好设置,
            ip:'ip'
        }),
        ...mapGetters({
            用户主题色:'user/用户主题色'
        }),
        appClass(){
            if(this.用户主题色.color){
               return 'C_'+this.用户主题色.color.substring(1)
            }else{
                return '';
            }
        },
        router_1() {
            return this.$route
        }
    },
    methods: {
        ...mapMutations({
            设置config: '设置config',
            设置聊天室key:'聊天室/设置key',
            设置state_1:'设置state',
            设置userState:'user/设置state'
        }),
        ...mapActions({
            getUserInfo: 'user/getUserInfo',
            获取json配置:'获取json配置',
            读取配置:'读取配置',
            获取消息列表:"私聊/获取消息列表",
            取消获取列表:"私聊/取消获取列表"
        }),
        keyup(e){
            console.log(e);
        },
        触碰屏幕(e) {
            //左滑返回
            this.y1 = e.touches[0].clientY;
            this.x1 = e.touches[0].clientX;
        },
        手指头离开屏幕(e) {
            this.y2 = e.changedTouches[0].clientY;
            this.x2 = e.changedTouches[0].clientX;
        },
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 500);
        },
        onClickLeft() {
            this.$toast('返回');
        },
        onClickRight() {
            this.$toast('按钮');
        },
        设置获取私聊列表(){
            var url1 = ['/','/home/home','/yxdt','/orders','/discovery','/my','/chatBoxes','/chatlist'];
            var path=this.$route.path;

            if(url1.includes(path)){
                setTimeout(() => {
                    this.获取消息列表()                
                }, 3000);
            }else{
                this.取消获取列表();
            }
        }
    },
    mounted() {
        var this_1=this;
        // smoothScrollTo
        // scrollTo
        // scrollIntoView 
        this.设置聊天室key(['init',false])

        window.addEventListener('hashchange', () => {
            let currentPath = window.location.hash.slice(1)
            if (this.$route.path !== currentPath) {
                console.log('改变跳转方式')
                this.$router.push(currentPath)
            }
        }, false)

        this.读取配置();
        this.设置userState(['Online_init',true])
        this.getUserInfo();
        // this.获取消息列表();
        
        if(window.plus){
            var clientid = plus.push.getClientInfo().clientid;
            plus.navigator.setStatusBarBackground(this.用户主题色.color);
        }else{
            document.addEventListener('plusready', ()=>{
                var clientid = plus.push.getClientInfo().clientid;
                plus.navigator.setStatusBarBackground(this.用户主题色.color);
            });
        }
        
        //设置返回键
        // setTimeout(() => {
        //     this.$refs.app.addEventListener("swiperight", () => {
        //         console.log(this.$route.meta)
        //         setTimeout(() => {
        //             if (this.y1 < this.y2 + 30) {
        //                 if (!this.$route.meta.不能返回) {
        //                     if (window.history.length == 1) {
        //                         this.$router.push('/my')
        //                     } else {
        //                         history.back();
        //                     }
        //                 }
        //             }
        //         }, 100)
        //     });
        // }, 3000)


        //获取ip
        if(this.ip){
            var cname=this.ip.cname;
                cname=cname.toUpperCase();
                // 设置技术支持
            if(this.config.telegram && this.config.telegram.number){
                if(this.config.telegram.whiteList.find(x=>x.toUpperCase()==cname)){
                    this.设置state_1(['技术支持',true])
                }
            }
        }else{
            var sohu_url='';
            if(typeof LineSwitch!='undefined'){
                sohu_url=(LineSwitch ? 'https:' : '') +"//pv.sohu.com/cityjson?ie=utf-8"                    
            }else{
                sohu_url="//pv.sohu.com/cityjson?ie=utf-8"
            }
            $.ajax({
                type:'get',
                url: sohu_url,
                dataType: "script",
                success: (data)=>{
                    console.log('获取ip:',returnCitySN)
                    this.设置state_1(['ip', returnCitySN])
                    var cname=returnCitySN.cname;
                        cname=cname.toUpperCase();
                    // 设置技术支持
                    if(this.config.telegram && this.config.telegram.number){
                        if(this.config.telegram.whiteList.find(x=>x.toUpperCase()==cname)){
                            this.设置state_1(['技术支持', true])
                        }
                    }
                }
            });
        }

        function plusready(){
            //监听接收透传消息事件  
                //处理透传消息的业务逻辑代码  
                try{
                    plus.runtime.setBadgeNumber(0);
                    if(mui.os.ios){
                        var GeTuiSdk = plus.ios.importClass('GeTuiSdk');  
                        GeTuiSdk.setBadge(0);  
                    }
                    console.log("清除角标")
                }catch(e){
                    // alert('清除角标异常')
                }
                plus.push.clear();
                plus.webview.currentWebview().setStyle({
                    softinputMode: "adjustResize"
                });
        }

        if(window.plus){
           plusready()
        }else{
            document.addEventListener('plusready',plusready);
        }

        if(window.appVue){
            window.appVue.toPath = function (url) {
                this.$router.push(url)
            };
        }else{
            window.appVue={
                toPath:(url)=>{
                    this.$router.push(url)
                }
            }
        }

    },
    watch: {
        $route(){
            this.设置获取私聊列表();
            this.设置userState(['Online_init',true])
            this.getUserInfo()
        }
    },
    beforeDestroy() {
    },
}
</script>

<style lang="scss">
// *,
.可复制{
    -webkit-user-select: auto !important;
}

.A加载中 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 23;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    > div {
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
    }
}

a {
    text-decoration: none;
}
// html{
//     overflow: hidden;
// }
// body{
//     overflow: auto;
// }
html,
body {
    height: 100%;
    padding: 0px;
    margin: 0px;
    line-height: inherit;
    font-family: Microsoft YaHei, Arial, sans-serif;
    // background-color:#f2f2f2;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
#app {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav {
    }
    .nav ~ .Router {
        .mui-content{
            padding-bottom: 60px;
        }
    }
    .Router {
        // top: 0px;
        // bottom: 0px;
        // position: absolute;
        // position: fixed;
        width: 100%;
    }
}

.mui-content {
    //    background:#f2f2f2;
}
.mui-fullscreen {
    overflow: auto;
    // position: fixed;
    min-height: 100%;
    height: 100%;
}

.mui-bar-nav {
    a {
        color: #ffffff;
    }
    .mui-title {
        color: #ffffff;
    }
    .mui-btn-link {
        color: #ffffff;
    }
    .mui-btn-link:active {
        color: #ffffff;
    }
    .mui-btn-blue:enabled:active {
        border: none;
    }
    @include bgcolor;
}

//左右切换
.slide-left-enter,
.slide-right-leave-active {
    //  opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    // -webkit-transform: translate(-100%, 0);
    // transform: translate(-100% 0);
}

//退出
// Router slide-right-leave-active slide-right-leave-to
// Router slide-right-enter-active slide-right-enter-to
//进入
// Router slide-left-enter-active slide-left-enter-to
// Router slide-left-leave-active slide-left-leave-to
//进入
.slide-right-enter-active{
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
}
.slide-right-leave-active{
    z-index: 11;
    position: absolute;
    width: 100%;
    height: 100%;
}
// slide-left-leave-to  //退出的
// slide-left-enter-to  //进入的
.slide-left-enter-to{
    z-index: 11;
    position: absolute;
    width: 100%;
    height: 100%;
}
.slide-left-leave-to{
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
}

.Router {
    // position: absolute;
    // width: 100%;
    transition: all 0.3s ease;
}

.b_f {
    color: rgba(4, 127, 241, 0.692);
}
.g_f {
    color: rgb(58, 189, 58);
}
.c_f {
    color: rgb(228, 103, 228);
}
.y_f {
    color: rgb(236, 185, 15);
}
.e_f {
    color: rgb(250, 103, 6);
}
.f_f {
    color: rgb(6, 221, 250);
}
.ye_f {
    color: rgb(246, 250, 6);
}
.r_f {
    color: rgb(248, 79, 79);
}

@media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    #app {
        .nav ~ .Router {
            .mui-content{
                padding-bottom: 80px;
            }
        }
    }
}
/*iPhone XS max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3) {
    #app {
        .nav ~ .Router {
            .mui-content{
                padding-bottom: 80px;
            }
        }
    }
}
/*iPhone XR max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) {
    #app {
        .nav ~ .Router {
            .mui-content{
                padding-bottom: 80px;
            }
        }
    }
}

</style>
