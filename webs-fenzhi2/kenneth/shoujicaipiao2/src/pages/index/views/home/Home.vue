<template>
    <div class="home">
        <!-- 分支测试 -->
        <!-- <button @click="特邀引导.步骤=1">特邀引导</button>
        <button @click="接口测试()">接口测试</button>
        <button @click="特邀领取状态()">接口测试2</button> -->
        <!-- <button @click="$router.push('/hbgame')">红包游戏</button> -->
        <!-- <div class="mui-content" :class="'步骤_'+特邀引导.步骤+' '+ '步骤_'+特邀引导.gameName+' '+特邀引导.gameName_2" > -->
        <div class="mui-content" :class="引导class_1" >
            
            <router-view :is="header"></router-view>
            <!-- 轮播图 -->
            <lunbo />
            <!-- <ContentLoader class="g1" :animate="false">
                <rect x="5%" :y="10+20*index+10*index" width="90%" height="20" v-for="(item, index) in 5" :key="index"/>
            </ContentLoader> -->
            <!-- <button @click="$router.push('/hbgame')">红包页面</button> -->
            <ul class="公告" @click="$router.push('/notice')">
                <li>公告</li>
                <li>
                    <marquee scrolldelay="100">
                        {{config.roll_titles}}
                    </marquee>
                </li>
                <li>
                    <i class="icon iconfont icon-xiangyou"></i>
                </li>
            </ul>
            <table>
                <tr>
                   <td ></td> 
                </tr>
            </table>
            <div class="img_2" v-if="引导.新特邀.show" :class="{active:引导状态.type==2}">
                <img class="img_21" @click="g2()" :src="config.img_url+'static/image/hongbao.png'" >
                <img class="newTy newTy_1" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
                <div class="newTy newTy_2">特邀嘉宾您好！抢888红包点这里，赶紧试试吧！</div>
            </div>
        
            <div class="mui-row box_1 mui-text-center">
                <div>
                    <div class="img_box" @click="进入聊天室()">
                        <img :src="config.img_url+'static/image/home_2.png'" alt="" srcset="">
                    </div>
                    <div @click="进入聊天室()">聊天室</div>
                </div>
                <div v-if="!技术支持 && config.noTelegram" :class="{saoleiYd:引导状态.type==3}">
                    <div class="img_box" @click="g1()">
                        <div>
                            <img :src="config.img_url+config.noTelegram.img">
                        </div>
                    </div>
                    <div>{{config.noTelegram.name}}</div>
                    <img class="扫雷引导" :src="config.img_url+'static/image/yindao/saolei1.png'" alt="" srcset="">
                </div>
                <div @click="天天礼包()" class="天天礼包">
                    <div class="img_box">
                        <div>
                            <img :src="config.img_url+'static/image/home_6.png'">
                        </div>
                    </div>
                    <img class="特邀步骤 礼包箭头" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
                    <div>天天礼包</div>
                </div>
                <div>
                    <div class="img_box" @click="$router.push('/home/discounts')">
                        <img :src="config.img_url+'static/image/home_3.png'">
                    </div>
                    <div @click="$router.push('/home/discounts')">优惠活动</div>
                </div>
                <div>
                    <div class="img_box" @click="$router.push('/my/zxkf')">
                        <img :src="config.img_url+'static/image/home_4.png'">
                    </div>
                    <div @click="$router.push('/my/zxkf')">在线客服</div>
                </div>
                
                <div v-if="技术支持" @click="显示技术支持=true">
                    <div class="img_box">
                        <i class="技术支持 icon iconfont icon-telegram"></i>
                    </div>
                    <div>技术支持</div>
                </div>

                <div class="特邀步骤 礼包说明">
                    特邀嘉宾请点击这里领取活动大奖
                </div>
            </div>

            <div class="box_2" ref="box_2">
                <van-sticky :offset-top="-1" :z-index="20">
                <div class="置顶">
                    <ul class="header_1">
                        <li :class="{'active':当前选中==item,'yingdao_active':item.title==特邀引导.gameName}" @click="选中游戏(item,index)" v-for="(item, index) in game1" :key="index" >
                            <div>
                                <i class="icon iconfont" :class="icon[item.title]"></i>
                            </div>
                            <div>{{item.title}}</div>
                            <img class="特邀步骤 类型箭头" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
                            <div class="特邀步骤 类型说明">
                                点击下方选择类型
                            </div>
                        </li>
                    </ul>
                    <div class="swiper-container swiper_2" ref="swiper_2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide item" :class="{'active':index==type_index}" @click="选中类型(index)" v-for="(item, index) in type" :key="index">{{item.title}}</div>
                        </div>
                    </div>
                    <!-- <div class="特邀步骤 类型说明">
                        点击下方选择类型
                    </div> -->
                </div>
                </van-sticky>

                <div class="步骤_51">
                    <img class="特邀步骤 游戏箭头" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
                    <div class="特邀步骤 游戏说明">
                        点击下方开始游戏
                    </div>
                </div>

                <div  class="官信" v-if="当前选中.title=='彩票'">
                    <i class="icon iconfont icon-huo"></i>
                    <span>{{彩票玩法 ==2 ? '信用玩法' : '官方玩法'}}</span>
                    <van-button @click="切换官信()" type="danger" size="small">{{彩票玩法 ==1 ? '切换信用' : '切换官方'}}</van-button>
                </div>
                <div class="swiperlist">
                    <div class="遮罩">
                        <div class="特邀步骤 斗地主_圆圈" @click='进入游戏({"id":"610","imgid":"610","title":"斗地主",type:"KY"})'>
                            <div>
                                <img :src="config.img_url+'static/image/home/ky/610.png'" lazy="loaded">
                                <div>斗地主</div>
                            </div>
                        </div>
                        <div class="特邀步骤 森林舞会多人版" @click='进入游戏({"id": "YP810","imgid": "YP810","title": "森林舞会多人版",type:"AG"})'>
                            <div>
                                <img :src="config.img_url+'static/image/home/ag/YP810.jpg'" lazy="loaded">
                                <div>森林舞会多人版</div>
                            </div>
                        </div>
                        <div class="特邀步骤 cq9捕鱼" @click='进入游戏({"id": "AT01","imgid": "cq9_AT01","title": "CQ9一炮捕鱼","type": "CQ"})'>
                            <div>
                                <img :src="config.img_url+'static/image/home/buyu/cq9_AT01.jpg'" lazy="loaded">
                            </div>
                        </div>
                        <div class="特邀步骤 cq9跳起来" @click='进入游戏({"id": "7","imgid": "7","title": "跳起来",type:"CQ"})'>
                            <div>
                                <img :src="config.img_url+'static/image/home/cq9/138.png'" lazy="loaded">
                                <div>跳起来</div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-container " ref="swiperlist">
                        
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in game2" :key="index">
                                <cpys :obj="item" v-if="item.title!='体育'"/>
                                <tiyu :obj="item" v-if="item.title=='体育'"/>
                            </div>
                            <!-- <div class="swiper-slide" v-for="(item, index) in game2" :key="index">
                                <cpys :obj="item" v-if="item.title!='体育'"/>
                                <tiyu :obj="item" v-if="item.title=='体育'"/>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="刮刮乐" @click="guaguale()">
                <img :src="config.img_url+'static/image/gglhome.jpg'" />
            </div>
            <zxzj />
        </div>

        <transition name="bounce">
            <lbtk v-if="显示礼包弹框"/>
        </transition>
        <van-popup v-model="显示技术支持">
            <div @click="跳转纸飞机()" class="纸飞机弹框" target="view_window">
                <div class="header_1">技术支持</div>
                <div class="content_1">
                    <div class="cont_3">
                        <i class="icon iconfont icon-telegram"></i>
                        <div>Telegram:{{config.telegram ? config.telegram.number : ''}}</div>
                    </div>
                    <div class="cont_2">
                        欢迎联系我们
                        <br>
                        Welcome to contact us
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- <ContentLoader ></ContentLoader>
        <FacebookLoader></FacebookLoader>
        <CodeLoader></CodeLoader>
        <BulletListLoader></BulletListLoader>
        <InstagramLoader></InstagramLoader>
        <ListLoader></ListLoader> -->

        <!-- <yd1 v-if="特邀引导.步骤==1 || 特邀引导.步骤==4 || 特邀引导.步骤==5" :zIndex="20"/> -->
        <yd1 v-if="引导状态.type==1 && (引导状态.步骤==1 || 引导状态.步骤==4 || 引导状态.步骤==5)" :zIndex="20"/>
        <!-- 游戏引导弹框 -->
        <!-- <youXiYinDaoTk v-if="特邀引导.步骤==3"/> -->
        <youXiYinDaoTk v-if="引导状态.type==1 && 引导状态.步骤==3"/>

        <van-overlay :show="引导状态.type==2 || 引导状态.type==3" z-index="20"/>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const cpys=()=>import('./components/彩票游戏.vue');
const tiyu=()=>import('./components/体育.vue');
const lbtk=()=>import('@/components/礼包弹框.vue')
const zxzj=()=>import('./components/中奖.vue');
const lunbo = () =>import('./components/首页轮播.vue');

const yd1=()=>import('@/components/引导遮罩.vue')
const youXiYinDaoTk=()=>import('./components/游戏引导弹框.vue')
import { api_特邀getinfo , api_是否进入游戏  , api_查看vip引导  } from "@/api/特邀嘉宾.js";
 
import Swiper from "swiper";
export default {
    name: "home",
    components: {
        lbtk,
        cpys,
        zxzj,
        lunbo,
        tiyu,

        yd1,
        youXiYinDaoTk
    },
    provide(){
        return{
            关闭礼包弹框:()=>{
                this.显示礼包弹框=false
            }
        }
    },
    data() {
        return {
            礼包引导:false,

            显示主页:false,
            header:'',
            显示技术支持:false,
            优惠活动:[],
            显示下载: true,
            显示礼包弹框:false,
            icon: {
                '彩票': "icon-caipiao",
                '棋牌': "icon-qipai",
                '电子': "icon-94",
                '捕鱼': "icon--yu",
                '真人': "icon-shipinmov",
                '体育': "icon-zuqiu"
            },
            //二级类型
            type_index: 0,
            当前选中: "",
            swiper2: "",

            swiperlist1:"",
            特邀GetIndex:0,  //未查询特邀信息
        };
    },
    computed: {
        ...mapState({
            技术支持:'技术支持',
            game1: "游戏彩票类型",
            config:'config',
            彩票玩法:x=>x.user.彩票玩法,
            userinfo:x=>x.user.userinfo,
            ip:'ip',
            特邀引导:x=>x.引导.特邀引导,
            urlType:"urlType",
            getJson:"getJson",
            引导:'引导'
        }),
        ...mapGetters({
            用户主题色:'user/用户主题色',
            引导状态:"引导/引导状态"
        }),
        引导class_1(){
            if(this.引导状态.type==1){
                return '步骤_'+this.特邀引导.步骤+' '+ '步骤_'+this.特邀引导.gameName+' '+this.特邀引导.gameName_2
            }else{
                return ''
            }
        },
        game3(){
            let href = window.location.href;
            return href
        },
        game2(){
            var list=[];
            this.game1.forEach( item=> {
                if(item.noSub){
                    item.title1=item.title
                    list.push(item)
                }else{
                    item.children.forEach(item1=>{
                        item1.title1=item.title;
                        list.push(item1)
                    })
                }
            });
            return list;
        },
        type() {
            if (this.当前选中 && !this.当前选中.noSub) {
                return this.当前选中.children;
            } else {
                return []
            }
        },
        下级() {
            if (this.当前选中) {
                if (this.当前选中.noSub) {
                    return this.当前选中.children;
                } else {
                    return this.当前选中.children[this.type_index]
                }
            } else {
                return []
            }
        },
        轮播索引(){
            var list=[];
            for (let i = 0; i < this.game1.length; i++) {
                if(this.game1[i].noSub){
                    var obj={
                            index1:i,
                            index2:0
                        }
                    list.push(obj);
                }else{
                    for (let j = 0; j < this.game1[i].children.length; j++) {
                        var obj={
                                index1:i,
                                index2:j
                            }
                        list.push(obj);
                    }
                }
            }
            return list
        }
    },
    methods: {
        ...mapActions({
            获取游戏彩票: "获取游戏彩票",
            退出聊天室: "聊天室/退出聊天室",
            设置类型:"进入游戏/设置类型",
            引导init:'引导/init',
        }),
        ...mapMutations({
            设置state_1:'设置state',
            设置state:'user/设置state',
        }),
        guaguale(){
            mui.alert('功能更新升级中，敬请期待！','提示');
            // $router.push('/guaguale/buy')
        },
        天天礼包(){
            this.显示礼包弹框=true;
            if(this.特邀引导.步骤==1){
                this.特邀引导.步骤 = 2
            }
        },
        g1(){
            if(this.config.noTelegram.path=='/hbgame'){
                setTimeout(() => {
                    this.引导.扫雷引导.已查看=true
                }, 1000);
                this.$router.push(this.config.noTelegram.path)
                return
            }
            // 不是扫雷红包就需要登录
            if(this.userinfo.UserId && (this.userinfo.UserId.startsWith('demo') || this.userinfo.UserId.startsWith('Demo'))){
                this.$toast('亲！试玩账号不用进入哦~');
                return
            }
            if(!this.userinfo.UserId){
                this.$toast('请先登录');                
                return
            }
            this.$router.push(this.config.noTelegram.path)
        },
        g2(){
            setTimeout(() => this.引导.新特邀.已查看=true , 2000);
            this.$router.push(`/ifr/zdy?u=${this.config.newTeYao.url}`)
        },
        进入聊天室(){
            this.$router.push('/chatBoxes');
        },
        跳转纸飞机(){
            if(!this.config.telegram || !this.config.telegram.a){
                return
            }
            if (window.plus) {
                plus.runtime.openURL(this.config.telegram.a);
            }else if (window.webkit) {
                window.webkit.messageHandlers.FillMoney.postMessage({ link: this.config.telegram.a });
            }else {
                window.open(this.config.telegram.a)
            }
        },
        download1(){
            if(this.config.title=='传奇'){
                var url='https://www.hongruizhixiaozixun.com/down.php?id=1002'
            }else{
                var url=config.app_download;
            }
            window.open(url)
        },
        切换官信(){
            this.设置state(['彩票玩法', this.彩票玩法==1 ? 2 : 1 ])
        },
        选中类型(index) {
            if(index<2){
                this.swiper2.slideTo(0, 300, false);//切换到第一个slide，速度为1秒
            }else{
                this.swiper2.slideTo(index-2, 300, false);//切换到第一个slide，速度为1秒
            }
            this.type_index = index;
            var index1 = this.game1.findIndex(x=>x==this.当前选中);
            var index2=this.轮播索引.findIndex(x=>x.index1==index1 && x.index2==index);
            this.swiperlist1.slideTo(index2, 0, false);//切换到第一个slide，速度为1秒
        },
        引导轮播(){
            var name = this.特邀引导.gameName;
            this.特邀引导.步骤=5
            if(name=='棋牌'){
                var index_2 = this.game2.findIndex(x=>x.title=='开元棋牌')
                console.log(index_2)
                this.swiperlist1.slideTo(index_2, 0, false);//切换到第一个slide，速度为1秒
                var qipai = this.game1.find(x=>x.title == '棋牌');
                var index_3 = qipai.children.findIndex(x=>x.title=='开元棋牌')
                this.type_index = index_3
            }else if(name == '电子'){
                if( this.特邀引导.gameName_2==''){
                    var index_2 = this.game2.findIndex(x=>x.title=='AG街机')
                    console.log(index_2)
                    this.swiperlist1.slideTo(index_2, 0, false);//切换到第一个slide，速度为1秒
                    var qipai = this.game1.find(x=>x.title == '电子');
                    var index_3 = qipai.children.findIndex(x=>x.title=='AG街机')
                    this.type_index = index_3
                }else{
                    var index_2 = this.game2.findIndex(x=>x.title=='CQ9电子')
                    console.log(index_2)
                    this.swiperlist1.slideTo(index_2, 0, false);//切换到第一个slide，速度为1秒
                    var qipai = this.game1.find(x=>x.title == '电子');
                    var index_3 = qipai.children.findIndex(x=>x.title=='CQ9电子')
                    this.type_index = index_3
                }
            }else if(name == '捕鱼'){
                var index_2 = this.game2.findIndex(x=>x.title=='捕鱼')
                // console.log(index_2)
                this.swiperlist1.slideTo(index_2, 0, false);//切换到第一个slide，速度为1秒
                // var qipai = this.game1.find(x=>x.title == '电子');
                // var index_3 = qipai.children.findIndex(x=>x.title=='AG电子')
                // this.type_index = index_3
            }
        },
        选中游戏(item , index) {
            this.当前选中 = item;
            this.type_index = 0;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.swiper2.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
                }, 500)
            })
            var index1=this.轮播索引.findIndex(x=>x.index1==index && x.index2==0)
            console.log('选中游戏',index1)
            if(this.特邀引导.步骤!=4){
                this.swiperlist1.slideTo(index1, 0, false);//切换到第一个slide，速度为1秒
            }else if(this.特邀引导.步骤==4){
                this.引导轮播()
            }
        },
        初始化() {
            if (!this.game1 || this.game1.length == 0) {
                this.获取游戏彩票().then(() => {
                    this.当前选中 = this.game1[0];
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.swiper2.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
                        }, 500)
                    })
                })
            } else {
                this.当前选中 = this.game1[0]
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.swiper2.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
                    }, 500)
                })
            }
        },
        进入游戏(obj){
            this.设置类型(obj)
            this.特邀引导.步骤 = 6
        }
    },
    mounted() {
        // http://10.10.27.30:100/other/play/IsOldPlayer
        if(this.getJson){
            // console.log('mounted中调用get特邀getinfo')
            this.特邀GetIndex = 1
            this.引导init()
        }
        try {
            this.退出聊天室()
        } catch (error) {}
        if(this.config.LineSwitch){
            this.header=()=>import('./components/头部2.vue')
        }else{
            this.header=()=>import('./components/头部1.vue')
        }
        var this_1=this
        if(window.plus){
            this_1.显示下载=false;
        }else{
            document.addEventListener('plusready', function(){
                if(window.plus){
                    this_1.显示下载=false;
                }
            });    
        }

        this.swiper2 = new Swiper(this.$refs.swiper_2, {
            slidesPerView: 5.5,
            observer: true
        });
        
        this.初始化();       
        
        setTimeout(() => {
            this.swiperlist1 = new Swiper(this.$refs.swiperlist, {
                slidesPerView: 1,
                // slidesPerView: 'auto',
                observer: true,
                autoHeight: true,   //高度随内容变化
                observeParents:true,
                onTransitionEnd:(swiper)=>{
                    var activeIndex=swiper.activeIndex;
                    console.log(activeIndex)
                    var length=0;
                    var index=0;
                    this.当前选中=this.game1[this.轮播索引[activeIndex].index1];
                    this.type_index=this.轮播索引[activeIndex].index2;
                    if(this.type_index<2){
                        this.swiper2.slideTo(0, 300, false);//切换到第一个slide，速度为1秒
                    }else{
                        this.swiper2.slideTo(this.type_index-2, 300, false);//切换到第一个slide，速度为1秒
                    }
                }
            });
        }, 100);
    },
    beforeDestroy: function () {
        this.显示=false
        console.log('beforeDestroy 销毁前状态===============》');
    },
    watch: {
        'config.LineSwitch'(){
            if(this.config.LineSwitch){
                this.header=()=>import('./components/头部2.vue')
            }else{
                this.header=()=>import('./components/头部1.vue')
            }
        },
        getJson(){
            console.log('watch中调用get特邀getinfo')
            if(this.特邀GetIndex==0){
                // this.查询特邀状态 = 1
                this.引导init()
            }
        },
    },
};
</script>

<style lang="scss" scoped>
// 扫雷引导
.扫雷引导{
    display: none;
}
.saoleiYd{
    position: relative;
    z-index: 21;
    color: #fff;
    .扫雷引导{
        display: block;
        position: absolute;
        top: _vw(-112);
        left: _vw(-54);
        width: _vw(250);
        // animation: shangxia 1s linear infinite;
    }
}



// 新特邀嘉宾引导
.newTy{
    display: none;
}
.img_2{
    position: relative;
    
    .img_21{
        width: 100%;
    }
}
.img_2.active{
    z-index: 21;
    .newTy{
        display: block;
    }
    .newTy_1{
        position: absolute;
        top: _vw(-40);
        left: 0px;
        right: 0px;
        margin:auto;
        width: _vw(40);
        animation: shangxia 0.5s linear infinite;
    }
    .newTy_2{
        position: absolute;
        width: 100%;
        font-size: _vw(14);
        z-index: 22;
        top: _vw(-75);
        left: 0px;
        text-align: center;
        color: #ffffff;
    }
}




.特邀步骤{
    display: none;
}
.步骤_1{
    .礼包箭头,
    .礼包说明{
        display: block;
    }
    .天天礼包{
        position: relative;
        z-index: 22;
        border-radius: 100%;
        border:5px dashed #fff;
        color: #fff;
    }
    .礼包箭头{
        position: absolute;
        top: -60%;
        left: 0px;
        right: 0px;
        margin:auto;
        width: _vw(40);
        animation: shangxia 1s linear infinite;
    }
    .礼包说明{
        position: absolute;
        width: 100%;
        font-size: _vw(20);
        z-index: 22;
        top: _vw(-95);
        left: 0px;
        text-align: center;
        color: #ffffff;
    }
}
.步骤_4{
    .yingdao_active{
        z-index: 22;
        border:5px dashed #fff;
        border-radius: 100%;
        .类型箭头{
            display: block;
            position: absolute;
            left: 0px;
            right: 0px;
            top: _vw(-46);
            z-index: 23;
            margin: auto;
            width: _vw(40);
        }
        .类型说明{
            display: block;
        }
    }
    .header_1{
        li:nth-child(2),
        li:nth-child(3),
        li:nth-child(4),
        li:nth-child(5){
            .类型箭头{
                animation: shangxia 1s linear infinite;
            }
            .类型说明{
                left: _vw(-30);
            }
        }
        li:nth-child(1){
            .类型箭头{
                left: auto;
                right: _vw(-30);
                animation: shangxia_2 1s linear infinite;
            }
            .类型说明{
                left: _vw(30);
            }
        }
        li:nth-child(6){
            .类型箭头{
                right: auto;
                left: _vw(-30);
                animation: shangxia_3 1s linear infinite;
            }
            .类型说明{
                left: _vw(-85);
            }
        }
    }
    .类型说明{
        // display: block;
        position: absolute;
        white-space: nowrap;
        
        top: _vw(-75);
        text-align: center;
        color: #ffffff;
        z-index: 22;
    }
}
.步骤_5{
    // .官信,
    // .swiper_2,
    .swiperlist{
        z-index: 22;
        // background: #fff;
        position: relative;
        .遮罩{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            background: rgba(0,0,0,0.6);
            z-index: 2;
            // pointer-events:none;
        }
    }
    &.步骤_棋牌{
        .斗地主_圆圈{
            display: block;
            position: absolute;
            border-radius: 100%;
            background: #666;
            color: #fff;
            width: 25%;
            text-align: center;
            top: _vw(107);
            left:50%;
            font-size: _vw(13);
            img{
                width: 100%;
                height: 100%;
            }
            &:after{
                position: absolute;
                width: 120%;
                height: 120%;
                left: -10%;
                top: -10%;
                border-radius: 100%;
                content: '';
                border:5px dashed #fff;
                box-sizing: border-box;
            }
        }
        .游戏箭头{
            left: 56%;
            top: _vw(45);
        }
        .游戏说明{
            left: 43%;
            top: _vw(16);
        }
    }
    &.步骤_电子:not(.电子2){
        .森林舞会多人版{
            display: block;
            position: absolute;
            border-radius: 100%;
            background: #666;
            color: #fff;
            width: 25%;
            text-align: center;
            top: _vw(10);
            left:25%;
            font-size: _vw(13);
            img{
                width: _vw(75);
                height: _vw(75);
            }
            &:after{
                position: absolute;
                width: 120%;
                height: 120%;
                left: -10%;
                top: -10%;
                border-radius: 100%;
                content: '';
                border:5px dashed #fff;
                box-sizing: border-box;
            }
        }
        .游戏箭头{
            left: 31%;
            top: _vw(-54);
        }
        .游戏说明{
            left: 19%;
            top: _vw(-88);
        }
    }
    &.步骤_捕鱼{
        .cq9捕鱼{
            display: block;
            position: absolute;
            border-radius: 100%;
            background: #666;
            color: #fff;
            width: 50%;
            text-align: center;
            top: _vw(10);
            left:50%;
            font-size: _vw(13);
            img{
                width: 97%;
            }
            &:after{
                position: absolute;
                width: 120%;
                height: 120%;
                left: -10%;
                top: -10%;
                border-radius: 100%;
                content: '';
                border:5px dashed #fff;
                box-sizing: border-box;
            }
        }
        .游戏箭头{
            left: 70%;
            top: _vw(-54);
        }
        .游戏说明{
            left: 58%;
            top: _vw(-88);
        }
    }
    &.步骤_电子.电子2{
        .cq9跳起来{
            display: block;
            position: absolute;
            border-radius: 100%;
            background: #666;
            color: #fff;
            width: 25%;
            text-align: center;
            top: _vw(10);
            left:25%;
            font-size: _vw(13);
            img{
                width: _vw(75);
                height: _vw(75);
            }
            &:after{
                position: absolute;
                width: 120%;
                height: 120%;
                left: -10%;
                top: -10%;
                border-radius: 100%;
                content: '';
                border:5px dashed #fff;
                box-sizing: border-box;
            }
        }
        .游戏箭头{
            left: 31%;
            top: _vw(-54);
        }
        .游戏说明{
            left: 19%;
            top: _vw(-88);
        }
    }
    
    
    .步骤_51{
        position: relative;
        z-index: 23;
        .游戏箭头{
            display: block;
            position: absolute;
            margin: auto;
            width: _vw(50);
            animation: shangxia 1s linear infinite;
        }
        .游戏说明{
            display: block;
            position: absolute;
            text-align: center;
            color: #fff;
        }
    }
}


@keyframes shangxia{
    0%{
        margin-top: 0px;
    }50%{
        margin-top:-10px;
    }100%{
        margin-top: 0px;
    }
}

@keyframes shangxia_2{
    0%{
        // margin-top: 0px;
        transform: translate(10px, -10px) rotate(45deg);
    }50%{
        // margin-top:-10px;
        transform: translate(0px, 0px) rotate(45deg);
    }100%{
        // margin-top: 0px;
        transform: translate(10px, -10px) rotate(45deg);
    }
}

@keyframes shangxia_3{
    0%{
        // margin-top: 0px;
        transform: translate(-10px, -10px) rotate(-45deg);
    }50%{
        // margin-top:-10px;
        transform: translate(0px, 0px) rotate(-45deg);
    }100%{
        // margin-top: 0px;
        transform: translate(-10px, -10px) rotate(-45deg);
    }
}



.g1{
    height: _vw(134);
    width: 100%;
}

.版本切换{
    position: absolute;
    top: _vw(65);
    right: 0;
    z-index: 2;
    width: _vw(85);
    text-align: center;
    line-height: _vw(28);
    background: rgba(2,2,2,.61);
    font-size: _vw(14);
    color: #ffffff;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: _vw(-14);
        width: 0;
        height: 0;
        border-color: transparent rgba(2,2,2,.61) transparent transparent;
        border-style: solid;
        border-width:_vw(14) _vw(14) _vw(14) 0;
    }
}
.纸飞机弹框{
    width: _vw(240);
    height: _vw(160);
    border-radius: _vw(10);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .header_1{
        line-height: _vw(44);
        border-bottom: 1px solid #cccccc;
        flex-basis: 0;
        color: #000000;
    }
    .content_1{
        flex-grow: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .icon_1{
        font-size: _vw(50);
        line-height: _vw(50);
        flex-shrink: 0;
        margin: 0px 10px;
        color: #1698dc;
    }
    .cont_2{
        font-size: _vw(14);
        text-align: center;
        color: #000000;
    }
    .cont_3{
        white-space: nowrap;
        font-size: _vw(16);
        display: flex;
        flex-direction: column;
        justify-content: center;
         color: #1698dc;
        i{
            font-size: 30px;
            color: #1698dc;
        }
    }
}

.mui-bar-nav{
    position: relative;
    // position: absolute;
    position: sticky;
    top: -1px;
    z-index: 3;
    span{
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;

    }
}


.刮刮乐{
    margin: _vw(5) 0px 0px;
    img{
        width: 100%;
    }
}

.swiperlist{
    .swiper-slide{
        height:1px
    }
     /* 随意指定一个height值即可 */    
    .swiper-slide-active { 
        height:auto
    }
    .swiper-wrapper{
        height: auto !important;
    }
}

.box_2.fixed{
    position: relative;
    margin: 0px;
}
.box_2 {
    margin: _vw(5) 0px 0px;
    
    .置顶 {
        //定位到顶部
        // position: sticky;
        position: relative;
        background: #ffffff;
        // top: -1px;
        // z-index: 20;
    }
    .header_1 {
        display: flex;
        font-size: _vw(14);
        border-bottom: 1px solid #eee;
        li {
            flex-grow: 1;
            width: calc(100vw / 6);
            height: _vw(54);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
        }
        i {
            font-size: _vw(20);
        }
        @mixin colors($color) {
            color: $color;
            &.active {
                color: #ffffff;
                background: $color;
            }
        }
        li:nth-child(1) {
            @include colors(red);
        }
        li:nth-child(2) {
            @include colors(#91cc52);
        }
        li:nth-child(3) {
            @include colors(#49abe0);
        }
        li:nth-child(4) {
            @include colors(#f5a518);
        }
        li:nth-child(5) {
            @include colors(#f25269);
        }
        li:nth-child(6) {
            @include colors(#9d63f3);
        }
    }
    .官信 {
        height: 45px;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        font-size: 18px;
        font-weight: bold;
        margin-top: -5px;
        i {
            color: $color;
            font-size: 20px;
        }
        span {
            flex-grow: 1;
        }
    }
    .swiper_2 {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        text-align: center;
        margin: 0px 0px 5px;
        .item {
            // line-height: 36px;
            // height: _vw(37);
            line-height: _vw(30);
            color: #b3b3b3;
            font-size: _vw(12);
            border-right: 1px solid #cccccc;
            // width: calc(100% / 5.5 );
        }
        .active {
            color: $color;
        }
    }
}

// .bouncea-enter-active {
//     animation: bounce1 0.5s;
// }
// .bouncea-leave-active {
//     animation: bounce1 0.5s;
// }
// @keyframes bounce1 {
//     0% {
//         opacity: 0;
//         top: 100%;
//     }
//     100% {
//         top: 0px;
//         opacity: 1;
//     }
// }

.公告 {
    background: #ffffff;
    border-bottom: 1px solid #efeff4;
    height: _vw(36);
    display: flex;
    > li {
        height: 100%;
        white-space: nowrap;
        line-height: _vw(36);
    }
    > li:nth-child(1) {
        color: $color;
        font-size: _vw(14);
        font-weight: bold;
        text-align: center;
        width: _vw(44);
        flex-shrink: 0;
    }
    >li:nth-child(2){
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }
    > li:nth-child(3) {
        font-size: _vw(16);
        color: #999;
        width: _vw(26);
        flex-shrink: 0;
        text-align: center;
    }
    marquee {
        font-size: _vw(12);
        height: 100%;
        width: 100%;
        * {
            display: inline-block;
        }
    }
}

.box_1 {
    background: #ffffff;
    font-size: _vw(12);
    display: flex;
    position: relative;
    > div {
        flex:1;
        padding-top: _vw(10);
        padding-bottom: _vw(10);
    }
    .礼包引导{
        display: none;
    }
    .img_box {
        width: _vw(43);
        height: _vw(43);
        margin: 0px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
            width: 100%;
            max-height: 100%;
        }
        i{
            font-size: _vw(43);
        }
        .技术支持{
            color: #1698dc;
        }
        // .teyao{
        //     color: #ffffff;
        //     background: linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209));
        //     border-radius: _vw(15);
        //     height:  _vw(38);
        //     width: _vw(38);
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     box-shadow: 0px 0px 2px 0px #ff679b;
        //     i{
        //         font-size: _vw(28);  
        //     }
        // }
    }
    .icon_box {
        width: _vw(40);
        height: _vw(40);
        margin: 0px auto;
        border-radius: 100%;
        line-height: _vw(40);
        color: #ffffff;
        font-size: _vw(22);
    }
    > div:nth-child(1) {
        .icon_box {
            background: rgb(252, 74, 91);
        }
    }
    > div:nth-child(2) {
        .icon_box {
            background: rgb(169, 143, 241);
        }
    }
    > div:nth-child(3) {
        .icon_box {
            background: rgb(92, 174, 254);
        }
    }
    > div:nth-child(4) {
        .icon_box {
            background: rgb(253, 149, 21);
        }
    }
}

.点击下载 {
    position: fixed;
    // position: absolute;
    left: 0px;
    bottom: 50px;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    height: 49px;
    img {
        width: 100%;
    }
    div {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 14px;
        padding: 10px 10px 0px;
        span {
            flex-grow: 1;
        }
        i {
            font-weight: bold;
            margin: 0px 10px 0px 0px;
        }
        button {
            width: 70px;
            height: 28px;
            padding: 0px;
            color: red;
        }
    }
}

@media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    .点击下载{
        bottom: 70px;
    }
}
/*iPhone XS max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3) {
    .点击下载{
        bottom: 70px;
    }
}
/*iPhone XR max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) {
    .点击下载{
        bottom: 70px;
    }
}
</style>
