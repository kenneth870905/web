<template>
    <div>
        <div class="mui-content mui-fullscreen" :class="{焦点:焦点}">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" v-if="正在聊天 && 正在聊天.SenderProfile">
                    <span v-if="正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.Nickname}}</span>
                    <span v-if="!正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.MemberId}}</span>
                </h1>
            </header>

            <ul class="内容列表" ref="内容列表" @scroll="scroll($event)" @click="失去焦点1()">
                <!-- {{styles}} -->
                <li v-for="(item, index) in 正在聊天.list" :key="index">
                    <!-- 图片 -->
                    <tp :obj="item" v-if="item.MessageType==4"/>
                    <!-- 纯文字 -->
                    <textbox1 :obj="item" v-if="item.MessageType==1"/>
                </li>
                <li ref="锚点"></li>
            </ul>
            
        </div>

            <div @click="显示自定义添加=false;显示表情包.show=false" class="遮罩1" v-if="显示自定义添加 || 显示表情包.show"></div>
            
            <div class="底部">
            <!-- <div class="底部" ref="底部输入框"> -->
                <div @click="向上滚动()" class="向下" v-if="!私聊state.到达底部">
                    <div class="数量" v-if="私聊state.未读条数>0">{{私聊state.未读条数>99 ? 99 : 私聊state.未读条数}}</div>
                    <div class="icon_box">
                         <i> <img src="image/liaotian/icon-down.jpg" style="border-radius: 50%;"> </i>
                    </div>
                </div>
                <ul class="键盘">
                    <li class="icon_box" @click="设置自定义()">
                         <i class="fa fa-plus-circle" style="padding-top: 5px;"></i>
                        <!-- <i class="icon iconfont icon-jiahao" style="font-size: 8vw;color: #818181;"></i> -->
                    </li>
                    
                    <li class="icon_input" ref="icon_input">
                        <pre wrap="hard">{{消息文本}}</pre>
                        <textarea @keyup.enter="键盘按下($event)" wrap="hard" id="textarea" class="textarea" ref="input_2" v-model="消息文本" type="text" @focus="获取焦点()" @blur="失去焦点()" placeholder="长按消息可撤回"></textarea>
                    </li>
                    <li class="icon_box" @click="设置表情()">
                        <i><img src="image/liaotian/smile_1148343.png" alt=""  style="width:35px;height:35px;margin-top: 8px;"></i>
                    </li>
                    <li class="icon_box" @click="发送($event)">
                        <label for="textarea">
                         <i class="fa fa-arrow-circle-up" style="color:#00a044;padding-top: 5px;"></i>
                        </label>
                    </li>
                </ul>
                <ul class="列表1" v-if="显示自定义添加">
                    <li @click="选择图片()">
                        <div><i> <img src="image/liaotian/icon-image.png" style="width:40px;height:40px;margin-top:5px;" alt=""> </i></div>
                        <div>照片</div>
                    </li>
                    <li @click="$toast('暂未开放')">
                        <div><i><img src="image/liaotian/icon-red-envelope.jpg" style="width:40px;height:40px;margin-top:5px;"></i></div>
                        <div>红包</div>
                    </li>
                    <li class="换行"></li>
                    <!-- <li @click="显示选择彩票=true">
                        <div>
                            <i class="icon iconfont icon-caipiao1"></i>
                        </div>
                        <div>彩票</div>
                    </li>
                    <li @click="$router.push('/ltsOrders?back=1&state=1')">
                        <div>
                            <i class="注单 icon iconfont icon-wenben"></i>
                        </div>
                        <div>注单</div>
                    </li>
                    <li @click="$router.push('/my/chongzhi')">
                        <div>
                            <i class="充值 icon iconfont icon-chongzhijilu"></i>
                        </div>
                        <div>充值</div>
                    </li>
                    <li @click="$router.push('/my/tixian')">
                        <div>
                            <i class="提现 icon iconfont icon-qianbao"></i>
                        </div>
                        <div>提现</div>
                    </li> -->
                </ul>
                <div class="表情" v-if="显示表情包.show">
                    <div class="content_1">
                        <ul class="字体表情" v-if="显示表情包.type==0">
                            <li @click="发送字体表情(item)" v-for="(item, index) in 字体表情" :key="index">{{item}}</li>
                        </ul>
                        <ul class="表情包2" v-if="显示表情包.type==1">
                            <li v-for="(item, index) in 表情列表1" :key="index">
                                <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                            </li>
                        </ul>
                        <ul class="表情包3" v-if="显示表情包.type==2">
                            <li v-for="(item, index) in 表情列表2" :key="index">
                                <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                            </li>
                        </ul>
                    </div>
                    <ul class="表情选项">
                        <li @click="显示表情包.type=0"><img :src="config.img_url+'static/image/liaotian/emoji-0.png'" alt="" srcset=""></li>
                    </ul>
                </div>
            </div>


        <!-- 会员详情 -->
        <hyxq v-if="私聊state.显示会员详情"/>
        <!-- 操作 -->
        <caozuo v-show="私聊state.操作.show"/>

        <input ref="input_file" class="mui-hidden" v-if="file_show" id="upload_file" @change="input_change()"  type="file" accept="image/*">


    </div>
</template>


<script>
const btn = () =>import("@/components/btn.vue");
const caozuo = ()=>import('./私聊/操作.vue')
 
//纯文字
const textbox1 = () =>import('./私聊/纯文字1.vue');
// 系统提示1
const xtts1 =()=>import('./components/系统提示1.vue');
//一键计划
const jh1 = () =>import('./components/计划.vue');
const tp = () => import('./私聊/图片.vue');

// const spjc = () => import('./components/视频教程.vue');
const hyxq = () =>import('./会员详情.vue');

import { api_GetLotteryInfos } from "@/api/游戏彩票接口.js";
import { 开奖倒计时 } from "@/assets/js/通用.js";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Swiper from 'swiper'
import 压缩图片 from '@/assets/js/图片压缩.js'

export default {
    name: "",
    components: {
        btn,
        hyxq,
        caozuo,

        textbox1,
        xtts1,
        jh1,
        tp,
        //视频教程
        // spjc
    },
    provide() {
        return {
            关闭选择彩票: () => {
                this.显示选择彩票 = false
            },
            关闭视频教程: () => {
                this.显示视频教程 = false
            },
            设置抢红包:(type)=>{
                this.抢红包 = type;
            }
        }
    },
    data() {
        return {
            js3: "",
            密码输入: {
                show: false,
                房间密码: '',
                房间密码1:[],
                密码焦点: false,
            },
            显示房间: false,
            彩票定时器: "",
            显示自定义添加: false,
            显示表情包: {
                show: false,
                type: 0
            },
            字体表情: ['😀', '😁', '😂', '😃', '😅', '😆', '😇', '😈', '😉', '😑', '😒', '😓', '😔', '😕', '😖', '😘', '😡', '😭', '😣', '😤', '😨',
                '😩', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '🎤', '🎲', '🎵', '🏀', '🏂', '🏡', '🀄', '💡', '💢', '💣', '💤', '💩', '💪', '💰', '📚',
                '📞', '📢', '🚫', '🚿', '🌏', '🌻', '🍚', '🍫', '🍻', '👊', '👌', '👍', '👎', '👏', '👪', '👫', '😬', '👻', '👼', '👽', '👿', '💊', '💋', '💍',
                '🔫', '😊', '😋', '😌', '😍', '😎', '😏', '😚', '😜', '😝', '😞', '😟', '😪', '😫', '😢', '😯', '🙊', '🙏', '🌙', '🌲', '🌹', '🍉', '🍖',
                '🍦', '🍷', '🎁', '🎂', '🎄', '🎉', '🎓', '🐴', '🐶', '🐷', '👑', '💄', '💔', '🔥', '🕖', '🙈', '🙉', '🚀', '⭐', '⏰', '⏳', '⚡', '⚽', '⛄',
                '⛅', '☝', '☺', '✊', '✋', '✌', '✏', '☀', '☁', '☔', '☕', '❄'],
            表情列表1: [
                'lottery_1.gif', 'lottery_2.gif', 'lottery_3.gif', 'lottery_4.gif', 'lottery_5.gif', 'lottery_6.gif', 'lottery_7.gif', 'lottery_8.gif', 'lottery_9.gif', 'lottery_10.gif',
                'lottery_11.gif', 'lottery_12.gif', 'lottery_13.gif', 'lottery_14.gif', 'lottery_15.gif', 'lottery_16.gif', 'lottery_17.gif', 'lottery_19.gif', 'lottery_20.gif',
                'lottery_21.gif', 'lottery_22.gif', 'lottery_23.gif', 'lottery_24.gif', 'lottery_25.gif', 'lottery_26.gif', 'lottery_27.gif', 'lottery_28.gif', 'lottery_29.gif', 'lottery_30.gif',
            ],
            表情列表2: [
                'chick_1.gif', 'chick_2.gif', 'chick_3.gif', 'chick_4.gif', 'chick_5.gif', 'chick_6.gif', 'chick_7.gif', 'chick_8.gif', 'chick_9.gif',
                'chick_10.gif', 'chick_11.gif', 'chick_12.gif', 'chick_13.gif', 'chick_14.gif', 'chick_15.gif', 'chick_16.gif',
            ],
            查询条件: {
                menuCode: "",
                lotteryCodes: []
            },
            init: false,
            焦点: false,

            显示选择彩票: false,
            显示视频教程: false,

            消息文本: "",
            时间1:0,
            isapp:false,
            抢红包:false,
            msglist:[],
            code:"",
            定时器:"",
            file_show:true
        }
    },
    computed: {
        ...mapState({
            config: "config",
            私聊state:x=>x.私聊,
            正在聊天:x=>x.私聊.正在聊天
        }),
        styles() {
            if (this.焦点) {
                if(mui.os.ios){
                    if(this.isapp){
                        return {position: "absolute","bottom": "0px" }
                    }else{
                        return {"bottom": "0px" }
                    }
                }else{
                    return { "bottom": "0px" }
                }
            } else {
                return ""
            }
        },
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            登录聊天室: "聊天室/登录聊天室",
            退出聊天室: "聊天室/退出聊天室",
            发送消息:"私聊/发送消息",
            获取最新消息:"私聊/获取最新消息",
            销毁定时器:"私聊/销毁定时器",
            私聊初始化:'私聊/私聊初始化',
        }),
        选择图片(){
            this.$refs.input_file.click();
        },
        async input_change(){
            var this_1=this
            var file = this.$refs.input_file.files[0]

            var this_1=this
            var file = this.$refs.input_file.files[0]
            if(file.size / 1024 / 1024 > 10){
                this.$toast('图片不能大于10M，请重新选择。')
                return
            }
            this.显示自定义添加=false
            this.加载中(true);
            var r = await 压缩图片(file,{quality:0.5});
            var fd = new FormData();
                fd.append('file',r);
            $.ajax({
                url:this.config.img_upload+'/upload.php?action=up',
                type:'POST',
                data:fd,
                processData:false,      
                contentType: false,     
                success:(r)=>{
                    // this.$toast(JSON.stringify(r));
                    if(!r.result){
                        this.$toast(r.msg)
                        this.加载中(false);
                        return
                    }
                    this.file_show=false;
                    this.$nextTick(()=>{
                        this.file_show=true;
                    });
                    var obj={
                            ReceiverCode:this.code,
                            MessageType:4,
                            Message:r.url
                        };
                    this.发送消息(obj);
                    this.加载中(false);
                },
                error:(e)=>{
                    this.file_show=false;
                    this.$nextTick(()=>{
                        this.file_show=true;
                    });
                    this.加载中(false);
                }
            })
        },
        失去焦点1(){
            // console.log('失去焦点1');
        },
        向上滚动(){
            this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
        },
        键盘按下(e){
            if(e.shiftKey){
                if(!this.消息文本 || this.消息文本=='' || this.消息文本.match(/^\s+$/)){

                }else{
                    this.发送(e)   
                }
            }
        },
        发送(e) {
            if (!this.消息文本 || this.消息文本=='' || this.消息文本.match(/^\s+$/)) {
                this.$toast('请输入消息');
            } else {
                this.私聊state.到达底部 = true;
                var obj={
                        ReceiverCode:this.code,
                        MessageType:1,
                        Message:this.消息文本
                    }
                this.发送消息(obj);
                this.消息文本 = ""
            }

                this.$refs.input_2.focus();
            setTimeout(() => {
                this.$refs.input_2.focus();            
            }, 200);
            e.preventDefault();
        },
        发送字体表情(item) {
            this.消息文本=this.消息文本+item;

            // this.显示表情包.show=false;
            // var obj={
            //         Type:1,
            //         Content:item
            //     }
            // this.发送消息(obj);
        },
        获取焦点() {
            this.焦点 = true;
            this.显示自定义添加=false;
            this.显示表情包.show=false;
            var time= setInterval(() => {
                this.$refs.锚点.scrollIntoView({block: 'start' })
            }, 100);
            setTimeout(() => {
                clearInterval(time)
            }, 1000);
        },
        失去焦点(){
            this.焦点=false;
            var time= setInterval(() => {
                this.$refs.锚点.scrollIntoView({block: 'start' })
            }, 100);
            setTimeout(() => {
                clearInterval(time)
            }, 1000);
        },
        设置自定义() {
            this.显示自定义添加 = !this.显示自定义添加;
            this.显示表情包.show = false
        },
        设置表情() {
            this.显示表情包.show = !this.显示表情包.show;
            this.显示自定义添加 = false;
        },
        scroll(e) {
            this.滚动条 = e.target.scrollTop;
            var h1 = e.target.offsetHeight;
            var h2 = e.target.scrollHeight;
            // console.log(h1,t1,h2);
            if (h1 + this.滚动条 + 20 >= h2) {
                this.私聊state.未读条数=0
                this.私聊state.到达底部 = true;
            } else {
                this.私聊state.到达底部 = false;
            }
        }
    },
    created() {
        
    },
    mounted() {
        var this_1=this
        this.code=this.$route.query.Code;
        // this.初始化()
        this.私聊初始化(this.code);

        if(window.plus){
            this.isapp=true
            plus.webview.currentWebview().setStyle({
                softinputMode: "adjustResize"
            });
        }else{
            document.addEventListener('plusready', function(){
                this_1.isapp=true
                plus.webview.currentWebview().setStyle({
                    softinputMode: "adjustResize"
                });
            });
        }
                
        var this_1 = this;
        this.$refs.锚点.scrollIntoView({block: 'start' })
    },
    watch: {
        "正在聊天.list"() {
            this.$nextTick(() => {
                if (this.私聊state.到达底部) {
                    this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                }
                setTimeout(() => {
                    if (this.私聊state.到达底部) {
                        this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                    }
                }, 300);
            })
        },
        "正在聊天.PrivateMessages"() {
            this.$nextTick(() => {
                if (this.私聊state.到达底部) {
                    this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                }
                setTimeout(() => {
                    if (this.私聊state.到达底部) {
                        this.$refs.锚点.scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                    }
                }, 300);
            })
        }
    },
    beforeDestroy() {
        // console.group("%c%s","color:red",'beforeDestroy-- vue实例销毁前的状态')
        this.加载中(false)
        this.销毁定时器()
        this.私聊state.正在聊天code='';
    },
    destroyed() {
        // console.group("%c%s","color:red",'destroyed-- vue实例销毁完成时调用')
    },
}
</script>

<style lang="scss" scoped>
.header_icon{
    color: #fff;
}



.mui-bar-nav{
    z-index: 21;
    .mui-title{
        .icon_1{
            display: inline-block;
            transition: all 0.5s;
            &.active{
                // transform: rotate(540deg);
                transform: rotateX(180deg);
            }
        }
    }
}
.密码输入 {
    position: absolute;
    width: 100%;
    // height: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .van-password-input{
        margin: 0px;
    }
    .内容 {
        background: #ffffff;
        position: relative;
        width: 80%;
        padding: 0px _vw(20);
        border-radius: 10px;
        .标题 {
            padding: _vw(20) 0px;
            text-align: center;
        }
        .关闭 {
            position: absolute;
            top: _vw(15);
            right: _vw(15);
        }
        .input_box {
            position: relative;
            input {
                opacity: 0;
                width: 200%;
                position: absolute;
                top: 0px;
                right: 0px;
                margin: 0px;
                padding: 0px;
                height: 100%;
                z-index: 1;
                background: none;
                bottom: none;
            }
            ul {
                display: flex;
                li {
                    width: calc(100% / 6);
                    padding: 0px _vw(5);
                    .外框 {
                        border: 1px solid #ccc;
                        height: _vw(33);
                        position: relative;
                        .明码{
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0px;
                            left: 0px;
                            line-height: _vw(33) ;
                            text-align: center;
                            font-size: _vw(12);
                        }
                        i {
                            position: absolute;
                            width: _vw(5);
                            height: _vw(5);
                            background: #000000;
                            border-radius: 100%;
                            top: 0px;
                            left: 0px;
                            bottom: 0px;
                            right: 0px;
                            margin: auto;
                        }
                        span {
                            position: absolute;
                            height: 70%;
                            background: red;
                            width: 2px;
                            // left: calc(50% + #{_vw(5)});
                            left: 50%;
                            right: 50%;
                            top: 0px;
                            bottom: 0px;
                            margin: auto;
                            animation: identifier 0.8s step-start infinite;
                            &.right{
                                left: calc(50% + #{_vw(5)});
                            }
                        }
                    }
                }
            }
        }
    }
}
@keyframes identifier {
    0% {
        background-color: #fff;
    }
    50% {
        background-color: #ec0022;
    }
    to {
        background-color: #fff;
    }
}


.遮罩1 {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
}
.开奖中 {
    text-align: center;
    color: $color;
    font-size: _vw(14);
}
.mui-content {
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    &.焦点{
        .开奖列表{
            z-index: 0;
        }
        .内容列表{
            z-index: 1;
        }
    }
}

.开奖列表 {
    flex-shrink: 0;
    height: _vw(85);
    padding: _vw(8) 0px;
    position: fixed;
    width: 100%;
    left: 0px;
    top: 44px;
    background: #efeff4;
    z-index: 1;
    .swiper1 {
        height: 100%;
    }
    .swiper-slide {
        width: 85%;
        height: 100%;
        background: #ffffff;
        border-radius: 5px;
        display: flex;
        padding: 0px _vw(10);
        align-items: center;
        .img_box {
            flex-shrink: 0;
            width: _vw(42);
            height: _vw(42);
            margin: 0px 5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .content_1 {
            width: 100%;
            .彩票头部 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: _vw(14);
                span:nth-child(2) {
                    font-size: _vw(12);
                    color: #999;
                }
            }
        }
    }
}

.内容列表 {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    background: #ffffff;
    // padding-bottom: _vw(100);
    padding-bottom: _vw(50);
    // padding-top: calc(#{_vw(85)} + 44px);
    padding-top: 60px;
    &.active{
        padding-bottom: _vw(50);
    }
    // margin-bottom: _vw(110);
}
.底部 {
    transition: all 0.3s;
    flex-shrink: 0;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 2;
    &.焦点{
        bottom: 0px;
    }
}
.键盘 {
    background: #eeeeee;
    display: flex;
    // height: _vw(44);
    min-height: _vw(44);
    align-items: center;
    .icon_input {
        // background: #fff;
        flex-grow: 1;
        position: relative;
        .textarea{
            font-size: _vw(14);
            min-height: _vw(30);
            // height: _vw(30);
            margin: 0px;
            padding: 0px _vw(10);
            // line-height: _vw(30);
            background: #fff;
            -webkit-user-select:text;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            padding-top: _vw(4);

            word-wrap : break-word;
            word-break: break-all;
            // white-space: pre-wrap;

        }
        input {
            font-size: _vw(14);
            height: _vw(30);
            margin: 0px;
            padding: 0px _vw(10);
            line-height: _vw(30);
        }
        pre{
            min-height: _vw(30);
            padding: 0px;
            margin: 0px;
            max-height: _vw(60);
            overflow: auto;

            
            word-wrap : break-word;
            word-break: break-all;
            // line-height: _vw(30)
        }
    }
    .icon_box {
        font-size: _vw(30);
        margin: 0px 5px;
    }
    .icon-jia-tianchong {
        color: #818181;
    }
    .icon-upbxiangshang {
        color: #00a044;
    }
    
}

.向下{
    position: absolute;
    top: _vw(-80);
    right: _vw(10);
    .数量{
        width: _vw(24);
        height: _vw(24);
        text-align: center;
        @include bgcolor;
        color: #ffffff;
        border-radius: 100%;
        font-size: _vw(12);
        line-height: _vw(24);
    }
    .icon_box{
        width: _vw(24);
        height: _vw(24);
        text-align: center;
        line-height: _vw(24);
        border-radius: 100%;
        border: 1px solid #ccc;
        font-size: _vw(15);
        background: #eeeeee;
    }
}

.列表1 {
    height: _vw(200);
    overflow: auto;
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-content: baseline;
    padding: 15px;
    .换行{
        width: 100%;
    }
    li:not(.换行) {
        width: calc(100% / 5);
        margin: 0px 0px _vw(10);
        > div:nth-child(1) {
            width: _vw(50);
            height: _vw(50);
            margin: 0px auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: _vw(30);
            line-height: _vw(50);
            color: #7f8388;
        }
        > div:nth-child(2) {
            font-size: _vw(12);
            color: #7f8388;
        }
    }
    .icon-hongbao {
        color: red;
        font-size: _vw(34);
    }
    .icon-yqh {
        color: #1fb500;
    }
    .icon-caipiao1 {
        color: #afb600;
    }
    .icon-tuiguang {
        color: #6f70f2;
    }
    .注单{
        color: #3abf32;
    }
    .充值{
        color: red;
    }
    .提现{
        color: #0064ff;
    }

}

.表情 {
    background: #ffffff;
    height: _vw(200);
    display: flex;
    flex-direction: column;
    .content_1 {
        height: 100%;
        overflow: auto;
    }
    .字体表情 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 6);
            font-size: _vw(30);
        }
    }
    .表情选项 {
        flex-shrink: 0;
        border-top: 1px solid #cccccc;
        height: _vw(40);
        display: flex;
        li {
            width: _vw(40);
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ccc;
        }
        img {
            width: _vw(25);
        }
    }
    .表情包2 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 5);
            padding: _vw(5);
        }
        img {
            width: 100%;
        }
    }
    .表情包3 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 4);
            padding: 0px _vw(15);
        }
        img {
            width: 100%;
        }
    }
}

</style>
