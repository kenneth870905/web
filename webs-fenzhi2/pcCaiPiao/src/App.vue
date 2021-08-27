<template>
    <div id="app" @click="检查是否已停止()">
        
        <!-- 系统公告 -->
        <xtgg />
        
        <!-- 头部组件 -->
        <top v-if="!$route.meta.隐藏头部"></top>

        <!-- 路由出口 -->
        <router-view class="入口" :style="{'min-height':min_height+'px'}"/>

        <!-- 页尾组件 -->
        <down v-if="!$route.meta.隐藏头部"></down>

        <!-- 对联组件 -->
        <couplet v-if="!$route.meta.隐藏头部"></couplet>

        <!-- 进入游戏弹框 -->
        <jryx/>

    </div>
</template>
<script>
const jryx = () => import('@/components/进入游戏弹窗.vue') //进入游戏组件
import down from '@/components/footer/footer.vue'//页尾组件
import top from '@/components/header/header.vue'//头部组件
import couplet from '@/components/couplet/couplet.vue'//对联组件
import xtgg from '@/components/弹出框/系统公告弹出框.vue';//系统公告组件
import $ from "jquery";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            topDownShow: true,
            info: {},
            time_2: "",
            dataconfig: {
                title: config.title
            },
            min_height:"0"
        }
    },
    components: { // 注册组件
        top: top,
        down,
        couplet,
        xtgg,
        jryx,
    },
    created() {
        if (window.innerWidth<=750 || window.outerWidth<=750) {
            location.href = location.origin
        }

        var this_1 = this;
        if (config.weihu == true) {
            window.location.href = "err.html"
        }

        var url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
        var title = config.title;
        this.修改config(['title',''])
        $.ajax({
            type: "get",
            url: config.api_url + '/App_Upload/Agents/Json/' + url + '.json',  //上线用的
            // url:"https://20200520.com/App_Upload/Agents/Json/www.20200520.com.json",//测试用的
            data: "",
            success: (data) => {
                console.log(data)
                document.title = data.Title;
                if (data.Logo) {
                    //设置LOGO
                    this.修改config(['showlogo', true])
                    this.修改config(['titleImg', '/App_Upload/Agents/Logo/' + data.Id + '.png'])
                    document.querySelector('link[rel="icon"]').href='/App_Upload/Agents/ico/' + data.Id + '.ico'
                    // if(typeof data.Logo !='boolean'){
                    //     this.修改config(['logo',data.Logo])
                    // }
                } else {
                    this.修改config(['phonePage', true]) //修改config里的参数 第一个参数是key  第二个参数是val
                    document.querySelector('link[rel="icon"]').href="favicon.ico"

                }
                this.修改config(['title', data.Title])

                this.修改config(['getConfig', 1])
                // // //底部文字
                // var footer_text=this.vuexconfig.footer_text;
                // var text=footer_text.replace(title,data.Title)
                // this.修改config(['footer_text',text])
                // // //滚动字幕
                // var roll_text= this.vuexconfig.roll_text;
                //     for (let i = 0; i < roll_text.length; i++) {
                //         roll_text[i].text=roll_text[i].text.replace(title,data.Title)
                //     }
                // //设置隐藏底部
                // this.修改config(['footer_show',0])
                // //修改QQ
                // if(data.QQ){
                //     this.修改config(['qq',data.QQ])
                // }
            },
            error: (err) => {
                document.querySelector('link[rel="icon"]').href="favicon.ico"
                document.title = this.dataconfig.title
                // document.title = this.vuexconfig.title;
                this.修改config(['phonePage', true])
                this.修改config(['title',title])
                this.修改config(['showlogo', true])
                this.修改config(['getConfig', 3])
                this.修改config(['footer_show', 1])
            }
        });

        if(this.vuexconfig.telegram && this.vuexconfig.telegram.number ){
            if(this.ip){
                var cname=this.ip.cname;
                    cname=cname.toUpperCase();
                if(this.vuexconfig.telegram.whiteList.find(x=>x.toUpperCase()==cname)){
                    this.修改state(['技术支持',true])
                }
            }else{
                console.log('获取ip')
                $.ajax({
                    type:'get',
                    // url: "http://pv.sohu.com/cityjson?ie=utf-8",
                    url: "//pv.sohu.com/cityjson?ie=utf-8",
                    dataType: "script",
                    success: (data)=>{
                        console.log('获取ip:',returnCitySN)
                        this.修改state(['ip', returnCitySN])
                        var cname=returnCitySN.cname;
                            cname=cname.toUpperCase();
                        if(this.vuexconfig.telegram.whiteList.find(x=>x.toUpperCase()==cname)){
                            // this.$set(this.vuexconfig.telegram,'show',true)
                            this.修改state(['技术支持',true])
                        }
                    }
                });
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            vuexconfig:"config",
            ip:'ip'
            // 显示系统Messages:'显示系统Messages'
        }),
        // 系统Messages(){
        //     return (this.userInfo.Messages && this.userInfo.Messages.length>0) ? this.userInfo.Messages[0].Content : ''
        // }
    },
    methods: {
        ...mapMutations({
            设置用户信息:'设置用户信息',
            修改config: '修改config',
            修改state:'修改state',
        }),
        ...mapActions({
            getUserInfo: 'getUserInfo'
        }),
        检查是否已停止(){
            if (this.userInfo.UserId && config.time > 0) {
                if(this.time_2){
                    try {
                        clearTimeout(this.time_2)
                        this.time_2 = '';
                    } catch (error) {}  
                }
                var itemS = config.time
                this.time_2 = setTimeout(() => {
                    this.修改state(['stop',true])
                    this.$alert('<div></div>', '', {
                        dangerouslyUseHTMLString: true,
                        customClass: "addalert",
                        callback: action => {
                            location.reload()
                        }
                    });
                }, 1000 * itemS);
            }else{
                if(this.time_2){
                    try {
                        clearTimeout(this.time_2)
                        this.time_2 = '';
                    } catch (error) {}
                }
            }
        }
    },
    mounted: function () {
        this.getUserInfo()
        this.检查是否已停止()
        this.min_height=document.body.clientHeight-347-163 - 20
    },
    watch: {
        'userInfo.UserId'() {
            this.检查是否已停止()
        },
        '$route'(){
            this.修改state(['Online_init',true])
            this.getUserInfo();
        }
    },
}
</script>
<style  lang="scss">
.addalert {
    width: 596px !important;
    height: 240px;
    background: gold;
    background: url("~@/assets/images/chaoshi.gif") no-repeat !important;
    background-size: 100% 100%;
    border-radius: 18px !important;
    position: relative;
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

#app {
    height: 100%;
    // overflow: auto;
}
html,
body {
    height: 100%;
    padding: 0px;
    margin: 0px;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}
.container {
    //版心
    width: 1000px;
    margin: 0 auto;
}
.container_min {
    //版心
    width: 978px;
    margin: 0 auto;
}

.fblue {
    color: blue;
}
.fred {
    color: red;
}
.fccc {
    color: #ccc;
}
.fccc_ {
    color: #999999;
}

.bred {
    color: red;
}
</style>
