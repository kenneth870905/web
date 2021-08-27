<template>
    <div class="侧导航" :class="{open:isOpen}">
        <div class="content">
            <div class="关闭" @click="close()">
                <span></span>
                <span></span>
            </div>
            <div class="content_2">
                <div class="user" v-if="userinfo.UserId">
                    <div><i class="icon iconfont icon-wode"></i></div>
                    <div>
                        <div>{{userinfo.UserId}}</div>
                        <div>￥{{userinfo.Money}}</div>
                    </div>
                </div>
                <ul class="充值提现" v-if="userinfo.UserId">
                    <li @click="to('/my/tixian')">
                        <div><i class="icon iconfont icon-jilu"></i></div>
                        <div class="text">提现</div>
                    </li>
                    <li @click="to('/edzh')">
                        <div ><i class="icon iconfont icon-zhuanhuan"></i></div>
                        <div class="text">额度转换</div>
                    </li>
                    <li @click="to('/my/chongzhi')">
                        <div ><i class="icon iconfont icon-chongzhijilu"></i></div>
                        <div class="text">充值</div>
                    </li>
                </ul>
                <ul class="list">
                    <li @click="to('/')">
                        <span class="mui-icon mui-icon-home"></span>
                        首页
                    </li>
                    <li @click="to('/yxdt')">
                        <span class="icon iconfont icon-94"></span>
                        游戏大厅
                    </li>
                    <li @click="to('/discovery')">
                        <span class="icon iconfont icon-faxian"></span>
                        发现
                    </li>
                    <li @click="to('/my')">
                        <span class="icon iconfont icon-wode"></span>
                        个人中心
                    </li>
                </ul>
                <ul class="list">
                    <li @click="to('/kefu')">
                        <span class="icon iconfont icon-kefu1"></span>
                        在线客服
                    </li>
                    <li @click="download1()" v-show="显示下载">
                        <span class="icon iconfont icon-icon--"></span>
                        App下载
                    </li>
                </ul>
                <div class="bnt_1" v-show="!userinfo.UserId" @click="to('/login')">
                    登录/注册
                </div>
                <div class="bnt_1" v-show="userinfo.UserId" @click="goOut()">
                    退出登录
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name:"",
    data() {
        return {
            isOpen:false,
            显示下载:true
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo
        }),
        下载地址(){
            if(typeof website == "object"){
                var url = location.hostname.replace('www.','');
                var obj={}
                if (website.list.hasOwnProperty(url)) {
                    var key = website.list[url]
                    if (website.hasOwnProperty(key)) {
                        obj = website[key]
                    }
                }
                if(obj.app_download){
                    return obj.app_download
                }else{
                    return config.app_download;
                }
            }else{
                return config.app_download;
            }
        },
    },
    methods: {
        ...mapMutations({
            加载中:"加载中",
            清空聊天室:'聊天室/清空聊天室',
            M特邀引导:'引导/M特邀引导'
        }),
        ...mapActions({
            getUserInfo: "user/getUserInfo",
        }),
        download1(){
            window.open(this.下载地址)
        },
        to(path){
            this.$router.push(path)
            this.isOpen=false
            document.querySelector('body').style.overflow=''
            document.querySelector('body').style.position=''
        },
        close(){
            this.isOpen=false
            document.querySelector('body').style.overflow=''
            document.querySelector('body').style.position=''
        },
        open(){
            this.isOpen=true
            document.querySelector('body').style.overflow='hidden'
            document.querySelector('body').style.position='fixed'
        },
        async goOut(url) {
            this.加载中(true);
            try {
                var r = await api_退出登录();          
            } catch (error) {
                console.log(error)
                this.$toast('系统错误，稍后再试！')
            }
                this.加载中(false)
            if (r.data.code == 0) {
                this.$toast('退出成功');
                this.$router.push('/');
                //避免切换账号的时候不弹出特邀引导
                this.M特邀引导(['引导结束',false])
            } else {
                this.$toast(r.data.msg);
            }
            this.getUserInfo();
            this.清空聊天室();

            this.isOpen=false
            document.querySelector('body').style.overflow=''
            document.querySelector('body').style.position=''
        },
    },
    mounted() {
         if(window.plus){
            this.显示下载=false
        }else{
            document.addEventListener('plusready', ()=>{
                this.显示下载=false
            });
        }
        // 判断是不是ios 桌面快捷方式
        if(window.navigator.standalone){
            this.显示下载=false
        }
    },
}
</script>

<style lang="scss" scoped>
.侧导航{
    position: fixed;
    top: 0px;
    left: 100%;
    width: 100%;
    height: 100%;
    z-index: 23;
    transition: all 0.5s;
}
.侧导航.open{
    left: 0px;
    background: rgba(0,0,0,0.6);
    .关闭{
        span:nth-child(1){
            transform: rotate(45deg);
        }
        span:nth-child(2){
            transform: rotate(-45deg);
        }
    }
}
.user{
    position: absolute;
    top: 0px;
    left: _vw(24);
    height: _vw(50);
    color: #ffffff;
    display: flex;
    align-items: center;
    >div:nth-child(1){
        font-size: _vw(26);
        margin: 0px 10px 0px 0px;
    }
    >div:nth-child(2){
        font-size: _vw(12);
        >div:nth-child(2){
            font-weight: bolder;
        }
    }
}
.充值提现{
    height: _vw(65);
    display: flex;
    background: #f3f3f3;
    position: relative;
    li{
        width: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        position: relative;
        &::after{
            position: absolute;
            width: 1px;
            height: 60%;
            top: 20%;
            left: 0px;
            content: '';
            background: #8c8c8c;
        }
        &:nth-child(1)::after{
            display: none;
        }
    }
    .icon{
        font-size: 22px;
    }
    .text{
        font-size: _vw(14);
        // margin: 0px 0px 0px _vw(5);
    }
}

.content{
    height: 100%;
    width: _vw(280);
    background: #323232;
    padding: _vw(50) 0px 0px;
    position: absolute;
    top: 0px;
    right: 0px;
}
.content_2{
    height: 100%;
    overflow: auto;
}
.关闭{
    position: absolute;
    top: _vw(10);
    right: _vw(10);
    width: _vw(26);
    height: _vw(26);
    span{
        position: absolute;
        width: 100%;
        height: 2px;
        background: #ffffff;
        left:0px;
    }
    span:nth-child(1){
        top: calc(50% - 1px);
        transition: all 0.5s;
        // transform: rotate(45deg);
    }
    span:nth-child(2){
        top: calc(50% - 1px);
        transition: all 0.5s;
        // transform: rotate(-45deg);
    }
}
.list{
    padding: 0px _vw(24);
    border-top: 1px solid #6d6d6d;
    line-height: _vw(56);
    color: #ffffff;
    li{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #3c3c3c;
        font-size: _vw(14);
    }
    span{
        font-size: _vw(26);
        margin: 0px _vw(8) 0px 0px;
    }
}

.bnt_1{
    line-height: _vw(35);
    border-radius: _vw(35);
    text-align: center;
    color: #333;
    background: #ffffff;
    margin: _vw(20) _vw(24);
    font-size: _vw(14);
}
</style>
