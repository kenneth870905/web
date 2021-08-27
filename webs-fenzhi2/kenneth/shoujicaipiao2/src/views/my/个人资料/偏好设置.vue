<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">设置</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="title_1">
                偏好设置
            </div>
            <ul class="mui-table-view list">
                <li class="mui-table-view-cell item" >
                    <span>购彩助手</span>
                    <van-switch v-model="偏好设置.购彩助手" size="20px" active-color="#07c160" inactive-color="#e4e4e4"/>
                </li>
                <li class="mui-table-view-cell item" >
                    <span>聊天室中奖弹幕</span>
                    <van-switch v-model="聊天室.显示最新中奖" size="20px" active-color="#07c160" inactive-color="#e4e4e4"/>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/my/ztsz')">
					<a class="mui-navigate-right item1">
                        <span>更换主题</span>
                        <div :style="{color:用户主题色.color}">{{用户主题色.name}}</div>
					</a>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/my/feedback')">
					<a class="mui-navigate-right item1">
                        <span>意见反馈</span>
                        <div></div>
					</a>
                </li>
            </ul>

            <div class="mui-button-row out" @click="goOut()">
                退出登录
            </div>

            <div class="版本" v-show="当前版本">当前版本:{{当前版本}}</div>

            <div class="testBug" @click="addNumber()"></div>
        </div>
    </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            switch:'',
            当前版本:"",
            number:0,
            time1:''
        }
    },
    computed: {
        ...mapState({
            偏好设置:x=>x.user.偏好设置,
            聊天室:x=>x.聊天室,
            引导:x=>x.引导
        }),
        ...mapGetters({
            用户主题色:'user/用户主题色' 
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中",
            清空聊天室:'聊天室/清空聊天室',
            设置state:"设置state",
            M特邀引导:'引导/M特邀引导'
        }),
        ...mapActions({
            getUserInfo: "user/getUserInfo",
        }),
        async goOut(url) {
            // this.引导重置数据()
            // return
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

        },
        addNumber(){
            this.number++
            if(this.number>=10){
                this.$router.push('/testPush')
                console.log('准备跳转')
            }
            try {
                clearTimeout(this.time1)
            } catch (error) {}
            this.time1 = setTimeout(() => {
                this.number=0
                console.log('超时')
            }, 1000);
        }
    },
    mounted() {
        var this_1 = this;
        if(window.plus){
            plus.runtime.getProperty(plus.runtime.appid, function(inf) {
                this_1.当前版本 = inf.version;
            });
        }else{
            document.addEventListener('plusready', function  () {
                plus.runtime.getProperty(plus.runtime.appid, function(inf) {
                    this_1.当前版本 = inf.version;
                });
            })
        }
    },
}
</script>

<style lang="scss" scoped>

.testBug{
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100px;
    height: 100px;
}

.版本{
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    font-size: _vw(12);
    line-height: _vw(44);
    text-align: center;
    color: #696969;
}
.mui-content{
    // background: #ffffff;
}

.out {
    background: #ffffff;
    height: 40px;
    margin-top: _vw(37);
    color: red;
    padding-top: -vw(8);
    // position: absolute;
    // width: 100%;
    // bottom: 0px;
    // left: 0px;
}

.title_1{
    background: #efeff4;
    line-height: _vw(40);
    font-size: _vw(14);
    padding: 0px 15px;
}
.list{
    font-size: _vw(14);
    .item1,
    .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .item1{
        padding-right: _vw(30);
    }
}
</style>
 