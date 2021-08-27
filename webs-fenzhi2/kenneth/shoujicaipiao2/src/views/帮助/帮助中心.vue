<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">帮助中心</h1>
            <a class="mui-btn mui-btn-link mui-pull-right" @click="显示新人指南=true">新手指导</a>
        </header>
        <div class="mui-content mui-fullscreen">
            <!-- <div class="帮助">
                <div>
                    <span :class="{'active':index==type}" @click="type=index" v-for="(item, index) in list" :key="index">{{item}}</span>
                </div>
                <div @click="show=true">
                    <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                </div>
            </div> -->

            <!-- <div class="展开帮助" v-if="show">
                <div class="遮罩" @click="show=false"></div>
                <div class="头部">
                    <div>全部类型</div>
                    <div>
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                    </div>
                </div>
                <div class="list">
                    <span :class="{'active':index==type}" @click="type=index,show=false" v-for="(item, index) in list" :key="index">{{item}}</span>
                </div>
            </div> -->

            <div class="问题列表">
                <div class="title_1">功能引导</div>
                <ul class="list1">
                    <li @click="$router.push('/helpDetails?t=zhuce')">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_1.png'" alt="" srcset="">
                        </div>
                        <div>注册</div>
                    </li>
                    <li @click="$router.push('/helpDetails?t=chongzhi')">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_2.png'" alt="" srcset="">
                        </div>
                        <div>充值</div>
                    </li>
                    <li @click="$router.push('/helpDetails?t=tikuan')">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_3.png'" alt="" srcset="">
                        </div>
                        <div>提款</div>
                    </li>
                    <li @click="$router.push('/helpDetails?t=goucai')">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_4.png'" alt="" srcset="">
                        </div>
                        <div>购彩</div>
                    </li>
                    <li @click="$router.push('/helpDetails?t=zhongjiang')" class="nobottom">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_5.png'" alt="" srcset="">
                        </div>
                        <div>中奖</div>
                    </li>
                    <li class="nobottom" @click="$router.push('/helpDetails?t=anquan')">
                        <div>
                            <img :src="config.img_url+'static/image/help/help_6.png'" alt="" srcset="">
                        </div>
                        <div>账号安全</div>
                    </li>
                </ul>
            </div>

            <div class="问题列表 问题列表1">
                <div class="title_1">常见问题</div>
                <ul class="list">
                    <li @click="$router.push('/helpDetails?t=zhuce')"><div></div>如何注册成为会员？</li>
                    <li @click="$router.push('/helpDetails?t=chongzhi')"><div></div>用户游戏如何充值？</li>
                    <li @click="$router.push('/helpDetails?t=tikuan')"><div></div>如何提款？</li>
                    <li @click="$router.push('/helpDetails?t=goucai')"><div></div>购彩流程？</li>
                    <li @click="$router.push('/helpDetails?t=zhongjiang')"><div></div>如何查看是否中奖？</li>
                    <li @click="$router.push('/helpDetails?t=guize')"><div></div>彩票规则</li>
                </ul>
            </div>
        </div>

        <xszl v-if="显示新人指南"/>
    </div>
</template>

<script>
import xszl from '@/components/新手指南.vue'
import { mapState } from "vuex";
export default {
    name: "",
    components:{
        xszl
    },
    provide(){
        return {
            关闭新手指南:()=>{
                this.显示新人指南=false
            }
        }
    },
    data() {
        return {
            show: false,
            type: 0,
            显示新人指南:false
        }
    },
    computed: {
        ...mapState({
            config:'config' 
        })
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
}
.帮助 {
    flex-shrink: 0;
    // height: _vw(40);
    display: flex;
    line-height: _vw(40);
    align-items: center;
    background: #ffffff;
    padding: 0px 0px 0px _vw(10);
    > div:nth-child(1) {
        flex-grow: 1;
        width: 0;
        white-space: nowrap;
        overflow: auto;
        font-size: _vw(14);
        color: #4a4a4a;
        span {
            padding: 0px 15px;
            display: inline-block;
            &.active {
                color: #ff5000;
                border-bottom: 2px solid #ff5000;
            }
        }
        &::-webkit-scrollbar {
            //滚动条的宽度
            width: 0px;
            height: 0px;
        }
    }
    > div:nth-child(2) {
        flex-shrink: 0;
        width: _vw(40);
        text-align: center;
        box-shadow: 0px -3px 1px 2px #dadada;
    }
}

.展开帮助 {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 44px;
    bottom: 0px;
    .遮罩 {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .头部 {
        position: relative;
        z-index: 2;
        background: #ffffff;
        display: flex;
        line-height: _vw(40);
        align-items: center;
        background: #ffffff;
        padding: 0px 0px 0px _vw(10);
        font-size: _vw(14);
        > div:nth-child(1) {
            flex-grow: 1;
        }
        > div:nth-child(2) {
            flex-shrink: 0;
            width: _vw(40);
            text-align: center;
            box-shadow: 0px -3px 1px 2px #dadada;
        }
    }
    .list {
        position: relative;
        z-index: 2;
        background: #ffffff;
        font-size: _vw(13);
        color: #4a4a4a;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        span {
            width: calc(100% / 3);
            height: _vw(40);
            line-height: _vw(40);
        }
        .active {
            color: rgb(255, 80, 0);
        }
    }
}
.问题列表1{
    flex-grow: 1
}
.问题列表{
    margin: _vw(5) 0px 0px;
    // flex-grow: 1;
    background: #ffffff;
    .title_1{
        line-height: 40px;
        font-size: _vw(16);
        padding: 0px _vw(10);
        border-bottom: 1px solid #eeeeee;
    }
    .list1{
        display: flex;
        flex-wrap: wrap;
        color: #989899;
        font-size: _vw(14);
        >li{
            height: _vw(90);
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            text-align: center;
            img{
                width: _vw(25);
            }
            &:nth-child(4n){
                &::before{
                    display: none;
                }
            }
            &.nobottom{
                &::after{
                    display: none;
                }
            }
            &::after{
                position: absolute;
                width: 80%;
                height: 1px;
                content: "";
                background: #e2e2e2;
                bottom: 0px;
                left: 0px;
                right: 0px;
                margin: auto;
            }
            &:before{
                position: absolute;
                width: 1px;
                height: 80%;
                content: "";
                background: #e2e2e2;
                right: 0;
                top: 0px;
                bottom: 0px;
                margin: auto;
            }
        }
    }
    .list{
        padding: 0px _vw(10);
        line-height: _vw(40);
        font-size: _vw(16);
        li{
            display: flex;
            align-items: center;
            div{
                width: _vw(10);
                height: _vw(10);
                border-radius: 100%;
                border: 1px solid #cccccc;
                margin: 0px _vw(4) 0px 0px;
            }
        }
    }
}


</style>
