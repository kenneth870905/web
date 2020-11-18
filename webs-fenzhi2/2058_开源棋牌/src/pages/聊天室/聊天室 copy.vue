<template>
    <div>
        <div class="room-list" v-if="显示房间">
            <!-- <div class="遮罩" @click="显示房间=false"></div> -->
            <div class="遮罩" @click="关闭1()"></div>
            <ul>
                <li @click="选择房间(item)" v-for="(item, index) in 房间列表" :key="index">
                    <span :class="{'active':item.Id==当前房间.Id}">
                        {{item.Name}}
                        <i class="icon iconfont icon-gouxuanzhong"></i>
                    </span>
                </li>
            </ul>
        </div>

        <!-- mui-fullscreen -->
        <div class="mui-content mui-fullscreen" :class="{焦点:焦点}">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <!-- <a @click="返回()" class="mui-icon mui-icon-left-nav mui-pull-left"></a> -->
                <h1 class="mui-title" @click="显示房间=!显示房间">
                    <!-- {{到达底部}} -->
                    {{当前房间.Name}}
                    <i :class="{active:显示房间}" class="icon_1 icon iconfont icon-icon-arrow-bottom2"></i>
                </h1>
                <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
                <span @click="$router.push('/my/zxkf')" class="icon iconfont icon-kefu mui-icon mui-pull-right"></span>
            </header>

            <div class="开奖列表">
                <div class="swiper-container swiper1" ref="轮播">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item , index) in 开奖列表" :key="index" @click="$router.push('cpiframe?i='+item.key+'&t='+彩票玩法)">
                            <div class="img_box">
                                <img :src="config.img_url+'static/image/home/caipiao/'+item.key+'.png'" alt="" srcset="">
                            </div>
                            <div class="content_1">
                                <div class="彩票头部"><span>{{item.Name}}</span> <span>{{item.IssueCode.substring(4)}}期正在投注</span></div>
                                <div v-if="item.Content" class="开奖列表1">
                                    <!-- 时时彩 -->
                                    <yq v-if="item.type=='10' || item.type=='30' || item.type=='40' || item.type=='60'" :球组="item.Content" />
                                    <!-- pk10 -->
                                    <pk10 v-if="item.type=='20'" :球组="item.Content" />
                                    <!-- 28 -->
                                    <erba v-if="item.type=='50'" :球组="item.Content" />
                                    <!-- 六合彩 -->
                                    <lhc v-if="item.type=='70'" :球组="item.Content" />
                                </div>
                                <div v-if="!item.Content" class="开奖中">
                                    开奖中
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="内容列表" :class="{active:焦点}" ref="内容列表" @scroll="scroll($event)" @click="失去焦点()">
                <!-- 系统提示 -->
                <li>
                    <xtts1 />
                </li>
                <!-- <button @click="登录聊天室({pwd: '123456',房间:{Id: '2',IsPwd: false,Name: '至尊团队 神算计划'}})">123456</button> -->
                <!-- {{styles}} -->
                <li v-for="(item, index) in msglist" :key="index">
                    <!-- 图片 -->
                    <tp :type="item.user.name==userinfo.UserId ? 'right':'left'" :content="item.content" v-if="item.type=='img'" />
                    <!-- 纯文字 -->
                    <textbox1 :obj="item" v-if="item.Type==1"/>
                    <!-- 系统提示 -->
                    <!-- <xtts1 /> -->
                    <!-- 彩票 -->
                    <cp1 :obj="item" v-if="item.Type==3" />
                    <!-- 计划 -->
                    <jh1 :type="item.user.name==userinfo.UserId ? 'right':'left'" :content="item.content" v-if="item.type=='jihua'" />
                </li>
                <li></li>
            </ul>
            
        </div>

        <div @click="显示自定义添加=false;显示表情包.show=false" class="遮罩1" v-if="显示自定义添加 || 显示表情包.show"></div>
            
            <div class="底部" :style="styles">
            <!-- <div class="底部" ref="底部输入框"> -->
                <div @click="向上滚动()" class="向下" v-if="!到达底部">
                    <div class="数量" v-if="未读条数>0">{{未读条数>99 ? 99 : 未读条数}}</div>
                    <div class="icon_box">
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                    </div>
                </div>
                <ul class="键盘">
                    <li class="icon_box" @click="设置自定义()">
                        <i class="icon iconfont icon-jia-tianchong"></i>
                    </li>
                    
                    <li class="icon_input" ref="icon_input">
                        <pre wrap="hard">{{消息文本}}</pre>
                        <textarea wrap="hard" id="textarea" class="textarea" ref="input_2" :readonly="!聊天室user.IsSend" :placeholder="!聊天室user.IsSend ? '等级不足无法发言，请联系客服':''" v-model="消息文本" type="text" @focus="获取焦点()" @blur="失去焦点()"></textarea>
                        <!-- <div class="textarea" contenteditable="true" ref="input_2" :readonly="!聊天室user.IsSend" :placeholder="!聊天室user.IsSend ? '等级不足无法发言，请联系客服':''" v-model="消息文本" type="text" @focus="获取焦点()" @blur="失去焦点()"></div> -->
                        <!-- <input ref="input_2" :readonly="!聊天室user.IsSend" :placeholder="!聊天室user.IsSend ? '等级不足无法发言，请联系客服':''" v-model="消息文本" type="text" @focus="获取焦点()" @blur="失去焦点()"> -->
                        <!-- <div ref="发送图标">
                            <i class="icon iconfont icon-upbxiangshang"></i>
                        </div> -->
                    </li>
                    <li class="icon_box" @click="设置表情()">
                        <i class="icon iconfont icon-smile"></i>
                    </li>
                    <li class="icon_box" @click="发送($event)">
                        <label for="textarea">
                        <i class="icon iconfont icon-upbxiangshang"></i>
                        </label>
                    </li>
                </ul>
                <ul class="列表1" v-if="显示自定义添加">
                    <li @click="$toast('暂未开放')">
                        <div><i class="icon iconfont icon-tupian"></i></div>
                        <div>照片</div>
                    </li>
                    <li @click="$toast('暂未开放')">
                        <div><i class="icon iconfont icon-hongbao"></i></div>
                        <div>红包</div>
                    </li>
                    <!-- <li @click="$toast('暂未开放')">
                        <div>
                            <i class="icon iconfont icon-yqh"></i>
                        </div>
                        <div>活动</div>
                    </li> -->
                    <!-- <li>
                        <div>
                            <i class="icon iconfont icon-caipiao1"></i>
                        </div>
                        <div>彩票</div>
                    </li>
                    <li>
                        <div>
                            <i class="icon iconfont icon-tuiguang"></i>
                        </div>
                        <div>合买</div>
                    </li>
                    <li v-for="(item, index) in 5" :key="index">
                        <div>
                            <i class="icon iconfont icon-tuiguang"></i>
                        </div>
                        <div>其他</div>
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
                        <!-- <li @click="显示表情包.type=1"><img src="static/image/liaotian/emoji-1.png" alt="" srcset=""></li>
                        <li @click="显示表情包.type=2"><img src="static/image/liaotian/emoji-2.png" alt="" srcset=""></li> -->
                    </ul>
                </div>
            </div>

            <ul class="底部2" :class="{'隐藏':焦点}">
                <div class="遮罩" v-show="焦点"></div>
                <li @click="显示选择彩票=true">
                    <!-- <img :src="config.img_url+'static/image/liaotian/fast-1.png'" /> -->
                    <div class="icon_box"><i class="icon iconfont icon-caipiao1"></i></div>
                    <div class="text_1">投注</div>
                </li>
                <li @click="$router.push('/ltsOrders?back=1&state=1')">
                    <!-- <img :src="config.img_url+'static/image/liaotian/fast-2.png'" /> -->
                    <div class="icon_box"><i class="icon iconfont icon-wenben"></i></div>
                    <div class="text_1">记录</div>
                </li>
                <!-- <li @click="显示视频教程=true">
                    <img :src="config.img_url+'static/image/liaotian/fast-3.png'" />
                    <div class="icon_box"><i class="icon iconfont icon-shipinmov"></i></div>
                    <div class="text_1">教程</div>
                </li> -->
                <li @click="$router.push('/my/chongzhi')">
                    <!-- <img :src="config.img_url+'static/image/liaotian/fast-4.png'" /> -->
                    <div class="icon_box"><i class="icon iconfont icon-chongzhijilu"></i></div>
                    <div class="text_1">充值</div>
                </li>
                <li @click="$router.push('/my/tixian')">
                    <!-- <img :src="config.img_url+'static/image/liaotian/fast-5.png'" /> -->
                    <div class="icon_box"><i class="icon iconfont icon-qianbao"></i></div>
                    <div class="text_1">提现</div>
                </li>
            </ul>

        <!-- 选择彩票 -->
        <xzcp v-show="显示选择彩票" />
        <!-- <spjc v-if="显示视频教程" /> -->
        <cpgd v-if="跟单彩票.show" />

        <div class="密码输入" v-show="显示密码输入框" >
            <div class="内容" ref="密码输入框">
                <div class="标题">请输入房间密码</div>
                <i @click="设置key(['显示密码输入框',false])" class="关闭 icon iconfont icon-guanbi"></i>
                <div class="input_box">
                    <input ref="pwd_input" @keyup.enter="确认密码()" @focus="密码输入.密码焦点=true" @blur="密码输入.密码焦点=false" @input="input_1()" type="text" v-model="密码输入.房间密码">
                    <ul>
                        <li v-for="(item, index) in 6" :key="index">
                            <div class="外框">
                                <div class="明码" v-if="密码输入.房间密码1.length>index" v-show="密码输入.房间密码1[index].show">{{密码输入.房间密码1[index].number}}</div>
                                <i v-if="密码输入.房间密码.length>index && 密码输入.房间密码1.length>index" v-show="!密码输入.房间密码1[index].show"></i>
                                <span v-show="密码输入.密码焦点" :class="{right:密码输入.房间密码.length==6 && index==5}" v-if="密码输入.房间密码.length==index || (密码输入.房间密码.length==0 && index==0) || (密码输入.房间密码.length==6 && index==5)"></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <van-password-input :mask="false" :value="密码输入.房间密码" @focus="showKeyboard = true"/> -->
                <div class="btn-1">
                    <btn @click.native="确认密码()" value="确定" style="margin:20px 0px;" />
                </div>
            </div>
        </div>

        <!-- 福利按钮 -->
        <fuli />
        <!-- 排行榜 -->
        <phb v-show="显示排行榜"/>
        <!-- 抢红包 -->
        <qhb v-if="抢红包" />
        <!-- 最新中奖 -->
        <zxzj />


        <remote-js v-if="js1" :js-url="js1" :js-load-call-back="loadRongJs1"></remote-js>
        <remote-js v-if="js2" :js-url="js2" :js-load-call-back="loadRongJs2"></remote-js>
        <remote-js v-if="js3" :js-url="js3" :js-load-call-back="loadRongJs3"></remote-js>
    </div>
</template>


<script>
const btn = () =>import("@/components/btn.vue");
const RemoteJs = () => import('@/components/RemoteJs')  // 导入组件
// require('http://10.10.27.180/Scripts/signalR/jquery.signalR-2.2.2.min.js')
// require('http://10.10.27.180/signalr/hubs')
// require('http://10.10.27.180/Areas/MApi/Content/chat.js')
// require(['http://10.10.27.180/Scripts/signalR/jquery.signalR-2.2.2.min.js'],function(angular,$){
//     console.log(123)
// });
// 开奖号码
const yq = () => import('@/views/开奖/components/开奖号码/圆球号码.vue')
const pk10 = () =>import('@/views/开奖/components/开奖号码/pk10号码.vue')
const lhc = () =>import('@/views/开奖/components/开奖号码/六合彩号码.vue')
const erba = () =>import('@/views/开奖/components/开奖号码/28.vue')

//纯文字
const textbox1 = () =>import('./components/纯文字1.vue');
// 系统提示1
const xtts1 =()=>import('./components/系统提示1.vue');
// 彩票
const cp1 =()=>import('./components/彩票1.vue');
//一键计划
const jh1 = () =>import('./components/计划.vue');
const tp = () => import('./components/图片.vue');

const xzcp = () => import('./components/选择彩票.vue');
const spjc = () => import('./components/视频教程.vue');
const cpgd = () => import('./components/彩票跟单.vue');
const fuli = () => import('./components/福利按钮.vue');
const phb = () => import('./components/排行榜.vue');
const qhb = () =>import('./components/抢红包.vue');
const zxzj = () =>import('./components/最新中奖.vue');

import { api_GetLotteryInfos } from "@/api/游戏彩票接口.js";
import { 开奖倒计时 } from "@/assets/js/通用.js";
import { mapState, mapActions, mapMutations } from 'vuex';
import Swiper from 'swiper'

export default {
    name: "",
    components: {
        btn,
        RemoteJs,
        cpgd,
        fuli,
        phb,
        qhb,
        zxzj,

        yq,
        pk10,
        lhc,
        erba,

        textbox1,
        xtts1,
        cp1,
        jh1,
        tp,
        //选择彩票
        xzcp,
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
            test1:true,
            value:'',
            showKeyboard:false,
            // js1:"http://10.10.27.180/Scripts/signalR/jquery.signalR-2.2.2.min.js",
            js1: "",
            js2: "",
            js3: "",
            预选房间: "",
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
            开奖列表: {},
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
            抢红包:false
        }
    },
    computed: {
        ...mapState({
            config: "config",
            userinfo: x => x.user.userinfo,
            彩票玩法: x => x.user.彩票玩法,
            msglist: x => x.聊天室.msglist,
            滚动条位置: x => x.聊天室.滚动条位置,
            跟单彩票: x => x.聊天室.跟单彩票,
            房间列表: x => x.聊天室.房间列表,
            当前房间: x => x.聊天室.当前房间,
            聊天室user:x=>x.聊天室.user,
            到达底部:x=>x.聊天室.到达底部,
            未读条数:x=>x.聊天室.未读条数,
            显示密码输入框:x=>x.聊天室.显示密码输入框,
            偏好彩票:x=>x.聊天室.偏好彩票,
            显示排行榜:x=>x.聊天室.显示排行榜
        }),
        styles() {
            // if(mui.os.ios && this.isapp){
                if (this.焦点) {
                    if(mui.os.ios){
                        if(this.isapp){
                            return {position: "absolute","bottom": "0px" }
                        }else{
                            return {"bottom": "0px" }
                            // return {position: 'fixed',"bottom": "0px" }
                        }
                    }else{
                        return { "bottom": "0px" }
                    }
                } else {
                    // return { position: "fixed" }
                    return ""
                }
        },
    },
    methods: {
        ...mapMutations({
            设置key: '聊天室/设置key',
            加载中:"加载中"
        }),
        ...mapActions({
            登录聊天室: "聊天室/登录聊天室",
            退出聊天室: "聊天室/退出聊天室",
            发送消息:"聊天室/发送消息"
        }),
         onInput(key) {
            this.密码输入.房间密码 = (this.密码输入.房间密码 + key).slice(0, 6);
        },
        onDelete() {
            this.密码输入.房间密码 = this.密码输入.房间密码.slice(0, this.密码输入.房间密码.length - 1);
        },

        失去焦点(){
            console.log('点击了内容');
        },
        返回(){
            // history.back()
            // location.href='index.html'
        },
        向上滚动(){
            this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
            // this.$refs.内容列表.querySelectorAll('ul>li')[this.$refs.内容列表.querySelectorAll('ul>li').length - 1].scrollIntoView({ 'behavior': 'smooth', block: 'start' })            
        },
        选择房间(item) {
            console.log(item);
            if (!item.IsPwd) {
                this.密码输入.房间密码='';
                this.密码输入.房间密码1=[];
                
                this.预选房间 = item
                // this.密码输入.show = true;
                this.设置key(['显示密码输入框',true])
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.pwd_input.focus();
                    }, 100);
                })
            } else {
                var obj = {
                    房间: item,
                    pwd: ''
                }
                this.登录聊天室(obj);
                this.显示房间=false;
            }
        },
        关闭1(){
            this.显示房间=false
            // this.密码输入.show = false;
            this.设置key(['显示密码输入框',false])
            // this.登录聊天室({pwd: '123456',房间:{Id: '2',IsPwd: false,Name: '至尊团队 神算计划'}})
        },
        确认密码() {
            if (!this.密码输入.房间密码 || this.密码输入.房间密码.length < 6) {
                this.$toast('请输入密码')
                return
            } else {
                // this.密码输入.show = false;
                // this.设置key(['显示密码输入框',false])
                this.显示房间=false;
                var obj = {
                    房间: this.预选房间,
                    pwd: this.密码输入.房间密码
                }
                this.登录聊天室(obj)           
            }
        },
        input_1() {
            this.密码输入.房间密码 = this.密码输入.房间密码.slice(0, 6);
            
            if(this.密码输入.房间密码1.length<this.密码输入.房间密码.length){
                var obj={
                        number:this.密码输入.房间密码.slice(this.密码输入.房间密码.length-1,this.密码输入.房间密码.length),
                        show:true,
                        time:setTimeout(() => {
                            obj.show=false
                        }, 500)
                    }
                this.密码输入.房间密码1.push(obj);
            }else if(this.密码输入.房间密码1.length>this.密码输入.房间密码.length){
                this.密码输入.房间密码1.splice(this.密码输入.房间密码.length)
            }
        },
        loadRongJs1() {
            this.js2 = config.api_url + "/signalr/hubs"
        },
        loadRongJs2() {
            this.js3 = config.api_url + "/Areas/MApi/Content/chat.js"
        },
        loadRongJs3() {
            console.log('js 加载完成');
            this.登录聊天室();
        },
        发送(e) {
            if(!this.聊天室user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return;
            }
            // var str=this.消息文本.replace(/' '/g,'');
            // console.log(str,str.length)
            if (!this.消息文本 || this.消息文本=='' || this.消息文本.match(/^\s+$/)) {
                this.$toast('请输入消息');
            } else 
            // if(this.时间1>0) {
            //     this.$toast('亲，您发言太频繁了');
            // }else 
            {
                this.设置key(['到达底部',true])
                this.时间1=3500;
                setTimeout(() => {
                    this.时间1=0;
                }, 3500);
                var obj={
                        Type:1,
                        Content:this.消息文本
                    }
                // this.$refs.input_2.blur()
                this.发送消息(obj);
                // appPage.chatSend(this.消息文本);
                this.消息文本 = ""
            }
                this.$refs.input_2.focus();
            setTimeout(() => {
                this.$refs.input_2.focus();            
            }, 200);
            e.preventDefault();
        },
        发送字体表情(item) {
            if(!this.聊天室user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return
            }
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
                this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({block: 'start' })
            }, 100);
            setTimeout(() => {
                clearInterval(time)
            }, 1000);
        },
        失去焦点(){
            this.焦点=false;
            var time= setInterval(() => {
                this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({block: 'start' })
            }, 100);
            setTimeout(() => {
                clearInterval(time)
            }, 1000);
        },
        设置自定义() {
            if(!this.聊天室user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return
            }
            this.显示自定义添加 = !this.显示自定义添加;
            this.显示表情包.show = false
        },
        设置表情() {
            if(!this.聊天室user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return
            }
            this.显示表情包.show = !this.显示表情包.show;
            this.显示自定义添加 = false;
        },
        设置轮播() {
            var this_1=this;
            // var index=0;
            // if(this.偏好彩票){
            //     index=this.开奖列表.findIndex(x=>x.key==this.偏好彩票.key);
            // }
            var swiper = new Swiper(this.$refs.轮播, {
                slidesPerView: 'auto',
                spaceBetween: 8,
                initialSlide :this.偏好彩票,
                loop: true,
                centeredSlides: true,
                onSlideChangeEnd: function(swiper){
                    var length = this_1.开奖列表.length;
                    console.log(swiper.activeIndex)  //切换结束时，告诉我现在是第几个slide
                    // this_1.偏好彩票 
                    this_1.设置key(['偏好彩票',swiper.activeIndex])
                },
            });
        },
        初始化() {
            console.log('初始化')
            api_GetLotteryInfos(this.查询条件).then(x => {
                
                var data = x.data;
                if (!this.init) {
                    var list=[]
                    for (const key in data) {
                        data[key].key = key.substring(1);
                        data[key].type = key.substring(1, 3);
                        开奖倒计时(data[key]);
                        list.push(data[key])
                    }
                    this.开奖列表 = data;
                    // this.开奖列表 = list;
                    this.$nextTick(() => {
                        this.设置轮播()
                    });
                } else {
                    for (const key in data) {
                        data[key].key = key.substring(1);
                        data[key].type = key.substring(1, 3);
                        开奖倒计时(data[key]);
                        // var obj=this.开奖列表.find(y=>y.key==key);
                        this.开奖列表[key] = data[key];
                    }
                }
                this.init = true;
            }).catch(err => { })
        },
        开始计时() {
            try {
                clearInterval(this.彩票定时器)
            } catch (error) {}

            this.彩票定时器 = setInterval(() => {
                console.log('定时获取彩票数据');
                this.查询条件.lotteryCodes = []
                for (const key in this.开奖列表) {
                    if (this.开奖列表[key].Timer <= 1) {
                        this.查询条件.lotteryCodes.push(key.substring(1))
                    }
                }
                if (this.查询条件.lotteryCodes.length > 0) {
                    this.初始化()
                }
            }, 5000);
        },
        scroll(e) {
            this.滚动条 = e.target.scrollTop;
            var h1 = e.target.offsetHeight;
            var h2 = e.target.scrollHeight;
            // console.log(h1,t1,h2);
            if (h1 + this.滚动条 + 20 >= h2) {
                this.设置key(['未读条数',0])
                this.设置key(['到达底部',true])
            } else {
                this.设置key(['到达底部',false])
            }
        },
        进入聊天室() {
            if (typeof (appPage) != 'object') {
                this.js1 = config.api_url + "/Scripts/signalR/jquery.signalR-2.2.2.js";
            } else {
                console.log('再次进入聊天室')
                this.登录聊天室()
            }
        }
    },
    created() {
        
    },
    mounted() {
        var this_1=this
        console.log(mui.os.ios)
        
        var test = "   123 \n   ";
        //var test = "      ";
        // if(test.match(/^\s+$/)){
        //     console.log("all space or \\n")
        // }
        // if(test.match(/^[ ]+$/)){
        //     console.log("all space")
        // }
        // if(test.match(/^[ ]*$/)){
        //     console.log("all space or empty")
        // }
        // if(test.match(/^\s*$/)){
        //     console.log("all space or \\n or empty")
        // }

        
        
        // if(mui.os.ios){
        //     // 解决在ios上fixed元素focusin时位置出现错误的问题 
        //     document.addEventListener('DOMContentLoaded',function(){
        //         console.log('设置底部')
        //         // var footerDom = document.querySelector('.底部');
        //         var footerDom = document.querySelector('footer');
        //         // var footerDom=this.$refs.底部输入框
        //         document.addEventListener('focusin', function() {
        //             footerDom.style.position = 'absolute';
        //         });
        //         document.addEventListener('focusout', function() {
        //             footerDom.style.position = 'fixed';
        //         });
        //     });
        // }

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
                

        if(!config.my.chatBoxes){
            history.back()
            return
        }
        var this_1 = this;
        this.初始化();
        this.进入聊天室();
        this.开始计时();
        if(this.到达底部){
            console.log('到达底部')
            this.$refs.内容列表.scrollTo({ top: 100000, behavior: "smooth" })
            // this.$refs.内容列表.querySelectorAll('ul>li')[this.$refs.内容列表.querySelectorAll('ul>li').length - 1].scrollIntoView({ 'behavior': 'smooth', block: 'center' })
        }else if (this.滚动条位置) {
            this.$refs.内容列表.scrollTo({ top: this.滚动条位置, behavior: "smooth" })
        }
    },
    watch: {
        msglist() {
            console.log(this.$refs.内容列表.scrollTop)
            this.$nextTick(() => {
                if (this.到达底部) {
                    // var height= this.$refs.内容列表.clientHeight
                    // this.$refs.内容列表.scrollTo({ top: height, behavior: "smooth" })
                    this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                }
                setTimeout(() => {
                    if (this.到达底部) {
                        // var height= this.$refs.内容列表.clientHeight
                        // this.$refs.内容列表.scrollTo({ top: height, behavior: "smooth" })
                        this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                    }
                }, 300);
            })
        }
    },
    beforeMount() {
        // console.group("%c%s","color:red",'beforeMount--挂载之前的状态')
    },
    beforeUpdate(){
        // console.group("%c%s","color:red",'beforeUpdate--数据更新前的状态')
    },
    updated() {
        // console.group("%c%s","color:red",'updated--数据更新完成时状态')
    },
    activated() {
        // console.group("%c%s","color:red",'activated-- keep-alive 组件激活时调用')
    },
    deactivated(){
        // console.group("%c%s","color:red",'deactivated-- keep-alive 停用时调用')
    },
    beforeDestroy() {
        // console.group("%c%s","color:red",'beforeDestroy-- vue实例销毁前的状态')
        this.设置key(['滚动条位置', this.滚动条])
        this.加载中(false)
        try {
            clearInterval(this.彩票定时器)
        } catch (error) {}
    },
    destroyed() {
        // console.group("%c%s","color:red",'destroyed-- vue实例销毁完成时调用')
        console.log(this.$route)
        var url=this.$route.path
        var 刷新名单=['/home/home','/']
        if(刷新名单.find(x=>x==url)){
            // location.reload();
            // $.connection.hub.stop()
            this.退出聊天室()
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖列表1{
    display: flex;
    align-items: center;
    font-size: 12px;
}
.定位测试{
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: flex-end;
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

.room-list {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 44px 0px 0px;
    .遮罩 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 0;
    }
    ul {
        position: relative;
        z-index: 1;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        font-size: _vw(12);
        padding: _vw(10) 0px 0px;
        li {
            padding: 0px _vw(10);
            width: 50%;
            margin: 0px 0px _vw(10) 0px;
        }
        span {
            display: block;
            background: #ececec;
            padding: _vw(8) 0px;
            border-radius: 5px;
            position: relative;
            &.active {
                @include border-full(1px);
                @include textcolor;
                i {
                    display: block;
                }
            }
            i {
                position: absolute;
                top: 0px;
                left: 0px;
                display: block;
                font-size: 28px;
                display: none;
            }
        }
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
    padding-bottom: _vw(100);
    padding-top: calc(#{_vw(85)} + 44px);
    &.active{
        padding-bottom: _vw(50);
    }
    // margin-bottom: _vw(110);
}
.底部 {
    transition: all 0.3s;
    flex-shrink: 0;
    position: fixed;
    bottom: _vw(50);
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
    li {
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

.底部2 {
    &.隐藏{
        bottom: _vw(-50);
    }
    transition: all 0.3s;
    z-index: 1;
    border-top: 1px solid #cccccc;
    background: #ffffff;
    height: _vw(50);
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    .遮罩{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left:0px;
    }
    li {
        width: 25%;
        text-align: center;
        img {
            width: _vw(26);
        }
        .icon_box {
            font-size: _vw(22);
        }
        .text_1 {
            font-size: _vw(12);
        }
        @include textcolor;
    }
}
</style>
