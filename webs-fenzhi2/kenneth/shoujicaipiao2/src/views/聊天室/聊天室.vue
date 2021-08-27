<template>
    <div>
        <div class="room-list" v-if="聊天室state.显示房间" :class="{虚化:聊天室state.显示密码输入框}">
            <div class="遮罩" @click="关闭1()"></div>
            <ul>
                <li @click="选择房间(item)" v-for="(item, index) in 聊天室state.房间列表" :key="index">
                    <div :class="{'active':(item.Id==聊天室state.当前房间.Id && !聊天室state.预设房间) || item.Id==聊天室state.预设房间.Id ,}">
                        <i class="icon iconfont icon-VIP"></i>
                        {{item.Name}}
                        <i class="选中 icon iconfont icon-gouxuanzhong"></i>
                        <span v-if="获取人数(item)">{{获取人数(item)}}人</span>
                    </div>
                </li>
            </ul>
        </div>

       
        <!-- mui-fullscreen -->
        <div class="mui-content mui-fullscreen" :class="{焦点:焦点,操作:聊天室state.操作.show}">
            <header class="mui-bar mui-bar-nav" v-show="!焦点" :style="{backgroundImage:'url('+config.img_url+'static/image/liaotian/header.png)'}">
                <a @tap="返回上一页()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" @click="选中房间()">
                    {{聊天室state.当前房间.Name ? 聊天室state.当前房间.Name :'请选择房间'}}
                    <i :class="{active:聊天室state.显示房间}" class="icon_1 icon iconfont icon-icon-arrow-bottom2"></i>
                </h1>
                <div class="btn_list">
                    <button @click="显示管理员=true" class="btn_2 mui-btn mui-btn-blue mui-btn-link">
                        管理员
                    </button>
                    <button @click="$router.push('/chatlist')" class="btn_1 mui-btn mui-btn-blue mui-btn-link">
                        私信
                        <span v-if="私聊未读>0" class="角标">{{私聊未读 > 99 ? 99 : 私聊未读}}</span>
                        <!-- <span class="角标">99</span> -->
                    </button>
                </div>
            </header>

            <div class="开奖列表" :class="{虚化:聊天室state.显示密码输入框}">
                <div class="swiper-container swiper1" ref="轮播">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item , index) in 开奖列表" :key="index" @tap="$router.push('cpiframe?u=chat&i='+item.key+'&t='+彩票玩法)">
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
            <ul class="内容列表" :class="{虚化:聊天室state.显示密码输入框}" ref="内容列表" @scroll="scroll($event)" @click="失去焦点1()">
                <!-- 系统提示 -->
                <li>
                    <xtts1 />
                </li>
                <li v-for="(item, index) in 聊天室state.msglist" :key="index">
                    <!-- 图片 -->
                    <tp :obj="item" v-if="item.Type==4"/>
                    <!-- 纯文字 -->
                    <textbox1 :obj="item" v-if="item.Type==1"/>
                    <!-- 彩票 -->
                    <cp1 :obj="item" v-if="item.Type==3" />
                    <!-- 计划 -->
                    <jh1 :obj="item" v-if="item.Type==2" />
                    <!-- 红包 -->
                    <hb :obj="item" v-if="item.Type==5"/>
                </li>

                <!-- <button @click="打开烟花()">烟花</button> -->

                <li class="连接提示">
                    <span v-show="聊天室state.连接提示" class="mui-badge">{{聊天室state.连接提示}}</span>
                </li>
            </ul>
        </div>

        <div @click="显示自定义添加=false;显示表情包.show=false" class="遮罩1" v-if="显示自定义添加 || 显示表情包.show"></div>
            
        <div class="底部">
            <div @click="向上滚动()" class="向下" v-if="!聊天室state.到达底部">
                <div class="数量" v-if="聊天室state.未读条数>0">{{聊天室state.未读条数>99 ? 99 : 聊天室state.未读条数}}</div>
                <div class="icon_box">
                    <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                </div>
            </div>
            <ul class="键盘">
                <li class="icon_box" @click="设置自定义()">
                    <i class="icon iconfont icon-jiahao"></i>
                </li>
                
                <li class="icon_input" ref="icon_input">
                    <pre wrap="hard">{{消息文本}}</pre>
                    <textarea @keyup.enter="键盘按下($event)" wrap="hard" id="textarea" class="textarea" ref="input_2" :readonly="!聊天室state.user.IsSend" :placeholder="!聊天室state.user.IsSend ? '等级不足无法发言，请联系客服':'点击管理员头像可私聊'" v-model="消息文本" type="text" @focus="获取焦点()" @blur="失去焦点()"></textarea>
                </li>
                <li class="icon_box" @click="设置表情()">
                    <i class="icon iconfont icon-smile"></i>
                </li>
                <li class="icon_box" @click="发送($event)">
                    <!-- <label for="textarea"> -->
                        <i class="icon iconfont icon-upbxiangshang"></i>
                    <!-- </label> -->
                </li>
            </ul>
            <ul class="列表1" v-if="显示自定义添加">
                <li @click="选择图片()">
                    <div><i class="icon iconfont icon-tupian"></i></div>
                    <div>照片</div>
                </li>
                <li @click="跳转红包()">
                <!-- <li @click="$toast('暂未开放')"> -->
                    <div><i class="icon iconfont icon-hongbao"></i></div>
                    <div>红包</div>
                </li>
                <li @click="$router.push('/jh')">
                    <div><i class="计划 icon iconfont icon-mingxi"></i></div>
                    <div>计划</div>
                </li>
                <li class="换行"></li>
                <li @click="显示选择彩票=true">
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
                </li>
            </ul>
            <div class="表情" v-if="显示表情包.show">
                <div class="content_1">
                    <ul class="字体表情" v-if="显示表情包.type==0">
                        <li @click="发送字体表情(item)" v-for="(item, index) in 字体表情" :key="index">{{item}}</li>
                    </ul>
                    <!-- <ul class="表情包2" v-if="显示表情包.type==1">
                        <li v-for="(item, index) in 表情列表1" :key="index">
                            <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                        </li>
                    </ul>
                    <ul class="表情包3" v-if="显示表情包.type==2">
                        <li v-for="(item, index) in 表情列表2" :key="index">
                            <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                        </li>
                    </ul> -->
                </div>
                <ul class="表情选项">
                    <li @click="显示表情包.type=0"><img :src="config.img_url+'static/image/liaotian/emoji-0.png'" alt="" srcset=""></li>
                    <!-- <li @click="显示表情包.type=1"><img src="static/image/liaotian/emoji-1.png" alt="" srcset=""></li>
                    <li @click="显示表情包.type=2"><img src="static/image/liaotian/emoji-2.png" alt="" srcset=""></li> -->
                </ul>
            </div>
        </div>
        
        <!-- 选择彩票 -->
        <xzcp v-show="显示选择彩票" />
        <!-- <spjc v-if="显示视频教程" /> -->
        <cpgd v-if="跟单彩票.show" />

        <div class="密码输入" v-show="聊天室state.显示密码输入框" >
            <div class="内容" ref="密码输入框">
                <div class="标题">请输入房间密码</div>
                <i @click="设置key(['显示密码输入框',false])" class="关闭 icon iconfont icon-guanbi"></i>
                <div class="input_box">
                    <input ref="pwd_input" @keyup.enter="确认密码()" @focus="密码输入.密码焦点=true" @blur="密码输入.密码焦点=false" type="text" v-model="密码输入.房间密码">
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
        <fuli v-if="!焦点"/>
        <!-- 排行榜 -->
        <phb v-show="聊天室state.显示排行榜"/>
        <!-- 抢红包 -->
        <qhb v-if="抢红包" />
        <!-- 最新中奖 -->
        <zxzj />
        <!-- 会员详情 -->
        <hyxq v-if="聊天室state.显示会员详情"/>
        <!-- 操作 -->
        <!-- <caozuo/> -->
        <caozuo v-show="聊天室state.操作.show"/>
        <!-- 管理员 -->
        <gly v-if="显示管理员"/>
        <!-- 红包弹框 -->
        <hbtk v-if="聊天室state.领取红包.领取弹框"/>
        <!-- 烟花 -->
        <yanhua ref="yanhua"/>
        <input ref="input_file" v-if="file_show" id="upload_file" @change="input_change()"  type="file" accept="image/*">
    </div>
</template>

<script>
const btn = () =>import("@/components/btn.vue");
const RemoteJs = () => import('@/components/RemoteJs')  // 导入组件

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
const hyxq = () =>import('./会员详情.vue');
const caozuo = ()=>import('./components/操作.vue');
const gly = () =>import('./components/管理员.vue')
const hb = () =>import('./components/红包.vue');
const hbtk = () =>import('./components/红包弹框.vue');

const yanhua = () =>import('@/components/烟花.vue');

import { api_GetLotteryInfos } from "@/api/游戏彩票接口.js";
import { 开奖倒计时 } from "@/assets/js/通用.js";
import { mapState, mapGetters , mapActions, mapMutations } from 'vuex';
import Swiper from 'swiper'
import 压缩图片 from '@/assets/js/图片压缩.js'
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
        hyxq,
        caozuo,
        
        yq,
        pk10,
        lhc,
        erba,

        textbox1,
        xtts1,
        cp1,
        jh1,
        tp,
        hb,
        //选择彩票
        xzcp,
        gly,
        //视频教程
        // spjc
        hbtk,
        // 烟花
        yanhua
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
            },
            隐藏管理员:()=>{
                this.显示管理员=false
            },
            打开烟花:()=>{
                this.$refs.yanhua.kaishi()
            },
        }
    },
    data() {
        return {
            第一次:true,
            test1:true,
            value:'',
            showKeyboard:false,
            密码输入: {
                show: false,
                房间密码: '',
                房间密码1:[],
                密码焦点: false,
            },
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
            抢红包:false,
            file_show:true,
            显示管理员:false
        }
    },
    computed: {
        ...mapState({
            config: "config",
            userinfo: x => x.user.userinfo,
            彩票玩法: x => x.user.彩票玩法,
            聊天室state:x=>x.聊天室,
            跟单彩票: x => x.跟单.跟单彩票,
            私聊state:x=>x.私聊
        }),
        ...mapGetters({
            私聊未读:'私聊/未读总条数',
            用户主题色:'user/用户主题色'
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
            发送消息:"聊天室/发送消息",
            获取房间人数:'聊天室/获取房间人数',
            获取人员列表:'聊天室/获取人员列表'
        }),
        
        跳转红包(){
            if(this.聊天室state.user.ChatRole!=1){
                this.$toast('权限不足');
                return
            }
            if(!this.聊天室state.当前房间.Id){
                this.$toast('请选择房间');
                return;
            }
            this.$router.push(`/tjQunHongBao?i=${this.聊天室state.当前房间.Id}`)
        },
        返回上一页(){
            if(this.$route.query.noback){
                this.$router.push('/')
            }else{
                history.back();
            }
        },
        选择图片(){
            if(this.聊天室state.user.IsSend){
                this.$refs.input_file.click();
            }else{
                this.$toast('权限不足')
            }
            // this.$refs.input_file.focus();
        },
        async input_change(){
            var this_1=this
            var file = this.$refs.input_file.files[0]
            if(file.size / 1024 / 1024 > 10){
                this.$toast('图片不能大于10M，请重新选择。')
                return
            }
            this.加载中(true);
            this.显示自定义添加=false
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
                                "Content":r.url,
                                "type":4, // 
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
        获取人数(item){
            var obj=''
            try {
                obj=this.聊天室state.会员人数.find(x=>x.Id==item.Id);                
            } catch (error) {}
            if(obj){
                return obj.UserCount
            }else{
                return 0
            }
        },
        选中房间(){
            this.设置key(['显示房间',!this.聊天室state.显示房间])
            if(this.聊天室state.显示房间){
                this.设置key(['预设房间',''])
            }
        },
        onInput(key) {
            this.密码输入.房间密码 = (this.密码输入.房间密码 + key).slice(0, 6);
        },
        onDelete() {
            this.密码输入.房间密码 = this.密码输入.房间密码.slice(0, this.密码输入.房间密码.length - 1);
        },
        失去焦点1(){
            console.log('失去焦点1');
        },
        向上滚动(){
            console.log('向上滚动')
            this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
        },
        选择房间(item) {
            console.log(item);
            if (!item.IsPwd) {
                this.密码输入.房间密码='';
                this.密码输入.房间密码1=[];
                this.设置key(['显示密码输入框',true])
                this.设置key(['预设房间',item])
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.pwd_input.focus();
                    }, 100);
                })
            } else {
                this.设置key(['init',false])
                this.设置key(['当前房间',item])
                this.登录聊天室();
                this.设置key(['显示房间',false])
            }
        },
        关闭1(){
            this.设置key(['显示房间',false])
            this.设置key(['显示密码输入框',false])
        },
        确认密码() {
            if (!this.密码输入.房间密码 || this.密码输入.房间密码.length < 6) {
                this.$toast('请输入密码')
                return
            } else {
                this.设置key(['init',false])
                this.设置key(['显示房间',false])
                this.设置key(['房间密码',this.密码输入.房间密码]);
                this.设置key(['当前房间',this.聊天室state.预设房间])
                this.设置key(['显示密码输入框',false])
                this.登录聊天室()
                this.密码输入.房间密码="";
            }
        },
        键盘按下(e){
            console.log(e);
            if(e.shiftKey){
                if(!this.消息文本 || this.消息文本=='' || this.消息文本.match(/^\s+$/)){

                }else{
                    this.发送(e)   
                }
            }
        },
        发送(e) {
            if(!this.聊天室state.user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return;
            }
            if (!this.消息文本 || this.消息文本=='' || this.消息文本.match(/^\s+$/)) {
                this.$toast('请输入消息');
            } else {
                this.设置key(['到达底部',true])
                this.时间1=3500;
                setTimeout(() => {
                    this.时间1=0;
                }, 3500);
                var obj={
                        type:1,
                        Content:this.消息文本
                    }
                this.发送消息(obj);
                this.消息文本 = ""
            }
        },
        发送字体表情(item) {
            if(!this.聊天室state.user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return
            }
            this.消息文本 += item;
        },
        获取焦点() {
            this.焦点 = true;
            this.显示自定义添加=false;
            this.显示表情包.show=false;
            console.log('获取焦点')
            // var time= setInterval(() => {
                this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({block: 'start' })
            // }, 100);
        },
        失去焦点(){
            console.log('失去焦点')
            this.焦点=false;
            var time= setInterval(() => {
                this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({block: 'start' })
            }, 100);
            setTimeout(() => {
                clearInterval(time)
            }, 500);
        },
        设置自定义() {
            this.显示自定义添加 = !this.显示自定义添加;
            this.显示表情包.show = false
        },
        设置表情() {
            if(!this.聊天室state.user.IsSend){
                this.$toast('等级不足无法发言，请联系客服')
                return
            }
            this.显示表情包.show = !this.显示表情包.show;
            this.显示自定义添加 = false;
        },
        设置轮播() {
            var this_1=this;
            var index=0
            if(this.聊天室state.偏好彩票 <= Object.keys(this_1.开奖列表).length*2){
                index=this.聊天室state.偏好彩票
            }
            var mySwiper  = new Swiper(this.$refs.轮播, {
                slidesPerView: 'auto',
                spaceBetween: 8,
                // initialSlide:index,
                loop: true,
                centeredSlides: true,
                onInit:function(){
                    setTimeout(() => {
                        mySwiper.slideTo(index, 0, false);//切换到第一个slide，速度为1秒
                    }, 500);
                },
                onSlideChangeEnd: function(swiper){
                    if(swiper.activeIndex<=Object.keys(this_1.开奖列表).length*2){
                        this_1.设置key(['偏好彩票',swiper.activeIndex])
                    }
                },
            });
        },
        初始化() {
            // console.log('初始化')
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
                // console.log('定时获取彩票数据');
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
        async 进入聊天室() {
            var id=this.$route.params.id ? this.$route.params.id : '';
            if (typeof (appPage) != 'object') {
                try {
                    console.log('获取聊天文件')
                    this.聊天室state.连接提示='正在加载聊天文件···'
                    await this.获取js(this.config.api_url + "/Scripts/signalR/jquery.signalR-2.2.2.js?v=1")
                    await this.获取js(this.config.api_url + '/signalr/hubs?v=6')
                    await this.获取js(this.config.api_url + '/Areas/MApi/Content/chat.js?v=7');
                } catch (error) {
                    this.聊天室state.连接提示='聊天室文件加载失败，请重试'
                    this.$toast('获取Js失败，稍后再试！')
                    return
                }
                setTimeout(() => {
                    this.登录聊天室(id);                
                }, 2000);
            } else {
                console.log('无需获取聊天文件') 
                // console.log('再次进入聊天室')
                this.登录聊天室(id)
            }
        }
    },
    mounted() {
        var this_1=this
        this.获取房间人数()
        setInterval(() => {
            this.获取房间人数()  
        }, 1000 * 60);
        // console.log(mui.os.ios)
        // var test = "123 \n   ";
        //var test = "";
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

        if(window.plus){
            this.isapp=true
            // plus.webview.currentWebview().setStyle({
            //     softinputMode: "adjustResize"
            // });
            plus.navigator.setStatusBarBackground('#6d19fa');
        }else{
            document.addEventListener('plusready', function(){
                this_1.isapp=true
                // plus.webview.currentWebview().setStyle({
                //     softinputMode: "adjustResize"
                // });
                plus.navigator.setStatusBarBackground('#6d19fa');
            });
        }
        
        this.获取人员列表()

        var this_1 = this;
        this.初始化();
        this.进入聊天室();
        this.开始计时();
        this.设置key(['到达底部',true])
        // this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
        this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ block: 'start' })

    },
    watch: {
        '聊天室state.msglist'() {
            this.$nextTick(() => {
                if (this.聊天室state.到达底部) {
                    // this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ 'behavior': 'smooth', block: 'start' })
                    this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView({ block: 'start' })
                    if(!this.聊天室state.msglist[this.聊天室state.msglist.length-1]){
                        return
                    }
                    let type=''
                        if(this.第一次){
                            type={ block: 'start' }
                        }else{
                            type = { 'behavior': 'smooth', block: 'start' }
                        }
                    if(this.聊天室state.msglist[this.聊天室state.msglist.length-1].Type==4){
                        setTimeout(() => {
                            this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView(type)
                        }, 1000);
                    }else{
                        setTimeout(() => {
                            this.$refs.内容列表.querySelector('.内容列表>li:last-child').scrollIntoView(type)
                        }, 500);
                    }
                }   
                this.第一次=false
            })
        },
        '密码输入.房间密码'(){
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
        this.加载中(false)
        try {
            clearInterval(this.彩票定时器)
        } catch (error) {}


        if(window.plus){
            // var clientid = plus.push.getClientInfo().clientid;
            plus.navigator.setStatusBarBackground(this.用户主题色.color);
        }else{
            document.addEventListener('plusready', function(){
                // var clientid = plus.push.getClientInfo().clientid;
                plus.navigator.setStatusBarBackground(this.用户主题色.color);
            });
        }
    },
    destroyed() {
        // console.group("%c%s","color:red",'destroyed-- vue实例销毁完成时调用')
        // console.log(this.$route)
        var url=this.$route.path
        console.log(this.$route)
        var url_lsit = ['/hbxq','/tjQunHongBao','/jh','/ltsOrders','/my/chongzhi','/my/tixian']
        // var 刷新名单=['/home/home','/','']
        // if(刷新名单.find(x=>x==url)){
        //     this.退出聊天室()
        // }
        if(!url_lsit.find(x=>x==url)){
            this.退出聊天室()
        }
    },
}
</script>

<style lang="scss" scoped>


@media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    .底部{
        bottom: 20px;
    }
}
/*iPhone XS max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3) {
    .底部{
        bottom: 20px;
    }
}
/*iPhone XR max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) {
    .底部{
        bottom: 20px;
    }
}



.btn_list{
    position: absolute;
    top: 0px;
    right: 0px;
    button{
        font-size: 12px;
    }
    .btn_2{
        margin: 0px 10px 0px 0px;
        position: relative;

        &::after{
            position: absolute;
            top: 0px;
            bottom: 0px;
            margin: auto;
            width: 1px;
            right: -8px ;
            height: 15px;
            content: "";
            background: #ffffff;
        }
    }
}

.btn_1{
    padding: 0px 5px;
    position: relative;
    margin: 0px 8px 0px 0px;
    .角标{
        background: red;
        position: absolute;
        top: 7px;
        right: -7px;
        font-size: 10px;
        line-height: 16px;
        border-radius: 16px;
        min-width: 16px;
        padding: 0px 2px;
        color: #fff;
        text-align: center;
    }
}


.header_icon{
    color: #fff;
}
.虚化{
    filter: blur(2px);
}


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
    background-size: cover;
    z-index: 21;
    .mui-title{
        max-width: 180px;
        margin: 0px auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .icon_1{
            flex-shrink: 0;
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
    top: 44px;
    left: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 31;
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
    top: 44px;
    width: 100%;
    height: 100%;
    z-index: 22;
    // padding: 44px 0px 0px;
    .遮罩 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.1);
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
        max-height: 50%;
        min-height: 30%;
        overflow: auto;
        align-content: baseline;
        box-shadow: 0px 0px 10px 2px #999;
        li {
            padding: 0px _vw(10);
            width: 50%;
            margin: 0px 0px _vw(10) 0px;
        }
        $list:(
            linear-gradient(90deg,#ff484a,#fe6352),
            linear-gradient(90deg,#f75f75,#ff80a6),
            linear-gradient(90deg,#2f76ff,#4ab7fa),
            linear-gradient(90deg,#684fff,#9c7bff)
        );
        @for $i from 1 through length($list) {
            $item:  nth($list, $i );
            li:nth-child(4n + #{$i} ){
                div{
                    background: $item;
                }
            }
        }
        div {
            color: #fff;
            display: block;
            background: #ececec;
            padding: _vw(8) 0px;
            border-radius: 5px;
            position: relative;
            &.active {
                // @include border-full(1px);
                .选中 {
                    display: block;
                }
            }
            .选中 {
                position: absolute;
                top: 0px;
                left: 0px;
                display: block;
                font-size: 28px;
                display: none;
            }
            .icon-VIP{
                font-size: _vw(16);
            }
            span{
                font-size: _vw(10);
                line-height: _vw(12);
                padding: 0px _vw(3);
                text-align: center;
                background: red;
                color: #fff;
                position: absolute;
                top: _vw(-3);
                right: _vw(-3);
                border-radius: _vw(12);
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
    &.操作{
        overflow: hidden;
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
    padding-top: calc(#{_vw(85)} + 44px);
    &.active{
        padding-bottom: _vw(50);
    }
    .连接提示{
        padding: _vw(20) 0px;
        text-align: center;
        color: #6f6f6f;
        font-size: _vw(12);
        >div{
            width: 50%;
            margin: 0px auto;
            line-height: _vw(30);
            border-radius: _vw(30);
            border:1px solid #eeeeee;
        }
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
            min-height: _vw(40);
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
            padding-top: _vw(9);
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
            min-height: _vw(40);
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
    .icon-jiahao {
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
    .计划{
        color: #3abf32;
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
