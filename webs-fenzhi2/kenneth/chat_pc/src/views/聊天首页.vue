<template>
    <div class="聊天室首页">
        <el-container class="container_1">
            <el-header class="header">
                <a class="log_img" href="/" :class="{隐藏:隐藏}">
                    <img v-if="config.showlog" :src="config.logo" alt="" srcset="">
                </a>
                <div class="展开收起" @click="隐藏=!隐藏">
                    <i class="el-icon-s-fold"></i>
                </div>
                <el-button v-if="个人资料.MemberType==1" type="" size="mini" plain @click="显示计划()">计划规划</el-button>
                <div class="换色">
                    <el-color-picker @change="changeColor" v-model="user.颜色" size="mini" :predefine="predefineColors"></el-color-picker>
                    <div>点击换色</div>
                </div>
                    
                <div class="手机聊天">
                    <!-- <i class="el-icon-mobile-phone"></i>手机聊天室 -->
                </div>
                 <el-dropdown trigger="click">
                    <div class="user" v-popover:popover v-show="userinfo.UserId">
                        <div class="img_box">
                            <img v-if="个人资料.ImgId" :src="config.img_url+'static/image/touxiang/'+个人资料.ImgId" alt="" srcset="">
                            <img v-if="!个人资料.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                            <el-badge class="角标 mark" :value="未读条数" v-if="未读条数"/>
                        </div>
                        <div>{{个人资料.Nickname ? 个人资料.Nickname : userinfo.UserId}}</div>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <div class="个人信息">
                            <el-dropdown-item>
                                <a href="/">首页</a>                            
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a href="javascript:;">余额：<span class="红色字体">{{userinfo.Money}}</span></a>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/personal">个人资料</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a href="/Members/Money/Recharge" target="pcliaotianshi">充值</a>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a href="/Members/Money/Withdraw" target="pcliaotianshi">提现</a>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a @click="退出()" class="退出" href="javascript:;">退出</a>
                            </el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="btn_1">
                    <el-button v-if="!userinfo.UserId" @click="跳转注册()" type="success" size="small">注册</el-button>
                    <el-button v-if="!userinfo.UserId" @click="设置state(['显示登录框',true])" type="primary" size="small">登录</el-button>
                </div>
            </el-header>
            <el-container class="el-container_3">
                <!-- 左侧 -->
                <el-aside class="left" :width=" 隐藏 ? '0px' : '260px'">
                    <left1 />
                </el-aside>

                <el-container class="container_2">
                    
                    <router-view v-if="showview"></router-view>

                    <div class="右边收起" :class="{'active':隐藏右边}" @click="隐藏右边=!隐藏右边">
                        <i class="el-icon-d-arrow-right"></i>
                    </div>

                </el-container>

                <el-aside class="右侧开奖" :width="隐藏右边 ? '0px' : '440px'" >
                    <right1 />
                </el-aside>

                
            </el-container>
        </el-container>

        <!-- 密码输入 -->
        <mima />
        <!-- 跟单信息 -->
        <cpgd />
        <!-- 投注记录 -->
        <tzjl />
        <!-- 会员详情 -->
        <hyxq />
        <!-- 充值排行榜 -->
        <paihangbang />
        <!-- 操作 -->
        <caozuo />

        <router-view :is="设置计划"></router-view>
    </div>
</template>

<script>
import axios from "axios";
import { api_退出登录 } from "@/api/登录接口.js";
const left1 = ()=>import('@/views/左侧.vue');
const right1 = ()=>import('@/views/右侧.vue');
const room = ()=>import('@/views/房间.vue');
const footer1 = ()=>import('@/views/底部.vue');
const mima = ()=>import('@/views/密码输入框.vue');
const xiaoxi = () =>import('@/views/消息/消息.vue');
const cpgd = ()=>import('./消息/彩票跟单.vue');
const tzjl = ()=>import('./投注记录.vue');
const hyxq = ()=>import('./会员详情.vue');
// const fuli = () =>import('@/components/福利按钮.vue');
const paihangbang = () =>import('@/components/排行榜.vue');
// const zxzj = () =>import('@/components/最新中奖.vue');
const caozuo= ()=>import('./消息/操作.vue');

import { mapState , mapMutations , mapActions} from "vuex";
export default {
    name: "",
    data() {
        return {
            隐藏:false,
            隐藏右边:false,
            predefineColors:[
                '#2e394d',
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
            ],
            showview:true,
            设置计划:"",
        }
    },
    provide(){
        return {
            设置抢红包(){
                console.log(this)
            },
            关闭计划设置:()=>{
                this.设置计划=''
            }
        }
    },
    components:{
        left1,
        right1,
        room,
        footer1,
        mima,
        xiaoxi,
        cpgd,
        tzjl,
        hyxq,
        // fuli,
        paihangbang,
        // zxzj,
        caozuo
    },
    computed: {
        ...mapState({
            config:'config',
            userinfo:'userinfo',
            个人资料:'个人资料',
            user:'user',
            私聊state:x=>x.私聊,
        }),
        未读条数(){
            var n = 0 ;
            this.私聊state.消息列表.forEach(item=>{
                n += item.MessageCount
            })
            return n;
        }
    },
    methods: {
        ...mapMutations({
            设置state:'设置state',
            设置user:'user/设置user',
            聊天室数据初始化:'聊天室/数据初始化'
        }),
        ...mapActions({
            加载中:"加载中",
            成功提示:"成功提示",
            getUserInfo:'getUserInfo',
            获取个人资料:'获取个人资料',
            登录聊天室:'聊天室/登录聊天室',
            获取房间人数:'聊天室/获取房间人数',
            获取人员列表:'聊天室/获取人员列表',
            获取私聊消息列表:"私聊/获取消息列表",
            退出聊天室:'聊天室/退出聊天室',
            清空私聊:'私聊/清空私聊'
        }),
        显示计划(){
            if(this.个人资料.MemberType==1){
                this.设置计划=()=>import('./设置计划/设置计划.vue');
            }
        },
        changeColor(color){
            this.设置user(['颜色',color])
        },
        跳转注册(){
            window.open(config.register);
        },
        async 退出(){
            this.加载中(true);
            try {
                var r = await api_退出登录();            
            } catch (error) {
                this.加载中(false)
                this.错误提示('系统错误稍后再试');
                return
            }
            if(r.data.code!=0){
                this.错误提示(r.data.msg);
                return
            }
            this.成功提示('退出成功');
            this.getUserInfo();
            this.退出聊天室();
            this.清空私聊();
            this.聊天室数据初始化();

            this.加载中(false)
            if(this.$route.meta.login){
                this.$router.push('/')
            }
            this.登录聊天室();
        },
        获取js(url){
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "get",
                    url: url,
                    // data: "data",
                    dataType: "script",
                    success: function (response) {
                        resolve()
                    },
                    error:function(err){
                        reject()
                    }
                });
            });
        },
        async js初始化(){
            if (typeof (appPage) != 'object') {
                this.加载中(true)
                try {
                    await this.获取js(config.api_url + "/Scripts/signalR/jquery.signalR-2.2.2.js")
                    await this.获取js(config.api_url + '/signalr/hubs')
                    await this.获取js(config.api_url + '/Areas/MApi/Content/chat.js')
                } catch (error) {
                    console.log(error);
                }
                this.加载中(false);
                let id=this.$route.params.id ? this.$route.params.id : '';
                this.登录聊天室(id)
            }else{
                let id=this.$route.params.id ? this.$route.params.id : '';
                this.登录聊天室(id)
            }
        }
    },
    beforeCreate: function () {
        if (document.body.clientWidth <= 750) {
            let url = '/M1/#/chatBoxes';
            let id = this.$route.params.id ? '/'+this.$route.params.id : ''
            location.href = url + id +'?noback=1'
        }
    },
    mounted() {
        this.getUserInfo();
        this.获取个人资料();
        this.js初始化();

        this.获取房间人数();
        this.获取人员列表();
        setInterval(() => {
            this.获取房间人数();
            this.获取人员列表();
        }, 1000 * 60);

        this.获取私聊消息列表();

    },
    watch: {
        $route(){
            this.showview=false;
            this.$nextTick(()=>this.showview=true)
        }
    },
}
</script>
<style lang="scss" scoped>
.el-container_3{
    height: calc(100% - 60px) !important;
}

.聊天室首页{
    height: 100%;
}
.换色{
    display: flex;
    color: #ffffff;
    margin: 0px 0px 0px 10px;
    font-size: 14px;
    align-items: center;
    div{
        margin: 0px 3px;
    }
    /deep/ .el-color-picker__trigger{
        border: none;
    }
    // input{
    //     width: 20px;
    //     height: 20px;
    //     border: none;
    //     padding: 0px;
    //     margin: 0px;
    // }
}
.个人信息{
    // width: 120px;
    a{
        display: block;
        color: #4e4e4e;
        line-height: 30px;
        text-decoration: none;
    }
    .退出{
        border-top: 1px solid #eee;
        color: red;
    }
}
.红色字体{
    color: red;
}
.右侧开奖{
    transition: all 0.3s;
}

.右边收起{
    position: absolute;
    right: 15px;
    top: 50%;
    cursor: pointer;
    font-size: 20px;
    &.active{
        transition: all 0.3s;
        transform:rotate(180deg);
    }
}
.展开收起{
    color: #ffffff;
    font-size: 25px;
    margin: 0px 10px 0px 20px;
    cursor: pointer;
}

.el-container{
    height: 100%;
}
.header{
    // background: color(--color);
    background: var(--color);
    // color: var(--color);
    // background: #2e394d;
    display: flex;
    align-items: center;
    padding-left: 0px;
    .log_img {
        height: 60%;
        width: 260px;
        text-align: center;
        transition: all 0.3s;
        overflow: hidden;
        &.隐藏{
            width: 0px;
        }
        img{
            height: 100%;
            cursor: pointer;
        }
    }
    .手机聊天{
        flex-grow: 1;
        color: #ffffff;
        cursor: pointer;
    }
    .btn_1{
        display: flex;
        align-items: center;
    }
    .user{
        display: flex;
        align-items: center;
        margin: 0px 30px 0px 0px;
        color: #ffffff;
        cursor: pointer;
    }
    .img_box{
        width: 35px;
        height: 35px;
        margin: 0px 5px 0px 0px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
        .角标{
            position: absolute;
            top: -6px;
            left:60%;
        }
    }
}
.left{
    background: var(--color);
    // border-top: 1px solid #{var(--color)}*1.1;
    border-top: 1px solid rgba(255, 255, 255,0.3);
    color: lighten(#ffffff,50%);
    transition: all 0.3s;
    &::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background:#409eff;
    }
}
.main{
    padding: 0px;
    display: flex;
    flex-direction: column;
    .房间列表{
        flex-shrink: 0;
    }
    .消息列表{
        flex:1;
        height: 100%;
        overflow: auto;
    }
}
.container_2{
    flex-direction: column;
    position: relative;
    // overflow: hidden;
}
.footer{
    padding: 0px;
}

</style>
<style lang="scss">
html,body,#app{
    height: 100%;
    padding: 0px;
    margin: 0px;
}

ul{
    padding: 0px;
    margin: 0px;
}
li{
    padding: 0px;
    margin: 0px;
    list-style: none;
}

</style>
