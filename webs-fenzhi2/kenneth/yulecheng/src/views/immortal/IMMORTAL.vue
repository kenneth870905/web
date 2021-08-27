<template>

    <div id="IMMORTAL" class="yl-container body" :style="'background-image: url(image/immortal/online_live_bg.jpg)'">
        <div class="main tbbg-margin">

            <div class="tb-news" @click="readNotice()">
                <div class="tb-news-bg"></div>
                <div class="tb-news-bt" style="background:url(image/immortal/ntb-bg05.png) no-repeat left center;">
                    <div class="bn-title" style="background:url(image/immortal/ntb-bg05.png) no-repeat left center;">
                        系统公告
                    </div>
                </div>
                <marquee direction="left" scrolldelay="80" scrollamount="5" behavior="scroll">
                    <span class="Tb-News-span" v-for="item in config.roll_text" :key="item.id" :data-title="item.title" data-time="">{{item.text}}</span>
                </marquee>
            </div>

            <div class="swiper-container list" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item1" @click="进入游戏(item)" v-for="(item, index) in 游戏" :key="index">
                        <img class="bg1" :src="config.img_url+'image/immortal/online_live_bg_1.jpg'" alt="" srcset="">
                        <img class="bg2" :src="config.img_url+'image/immortal/online_live_bg_2.jpg'" alt="" srcset="">
                        <div class="item2">
                            <div class="l">
                                <img :src="config.img_url+'image/immortal/'+item.img" />
                            </div>
                            <div class="r">
                                <div class="logo">
                                    <img :src="config.img_url+'image/immortal/'+item.img2[0]" alt="">
                                    <img :class="item.type" :src="config.img_url+'image/immortal/'+item.img2[1]" alt="">
                                </div>
                                <div class="text1">{{item.text}}</div>
                                <ul class="l2">
                                    <li v-show="index2<4" v-for="(item2, index2) in item.imglist" :key="index2">
                                        <img :src="config.img_url+'image/immortal/'+item2.img" alt="" srcset="">
                                        <div>{{item2.name}}</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="btn_1">进入游戏</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-next" ref="next1">
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="swiper-button-prev" ref="prev1">
                    <i class="el-icon-arrow-left"></i>
                </div>
            </div>
            <!-- <ul class="list">
                <li class="item1" v-for="(item, index) in 游戏" :key="index" style="background-image:url(image/immortal/online_live_bg_1.jpg)">
                    <div class="l">
                        <img :src="config.img_url+'image/immortal/'+item.img" />
                    </div>
                    <div class="r">
                        <div class="logo">
                            <img :src="config.img_url+'image/immortal/'+item.img2[0]" alt="">
                            <img :src="config.img_url+'image/immortal/'+item.img2[1]" alt="">
                        </div>
                        <div class="text1">{{item.text}}</div>
                        <ul class="l2">
                            <li v-for="(item2, index2) in item.imglist" :key="index2">
                                <img :src="config.img_url+'image/immortal/'+item2.img" alt="" srcset="">
                                <div>{{item2.name}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="btn_1">进入游戏</div>
                </li>
            </ul> -->
            <div class="clear"></div>
        </div>

        <el-dialog class="通知公告" title="公告详情" width="680px" :visible.sync="显示滚动字幕">
            <ul>
                <li class="item" v-for="(item, index)  in NoticeList" :key="index">
                    <div class="title">
                        <p>{{item.Title}}</p>
                        <p>{{item.Createtime}}</p>
                    </div>
                    <div class="text">
                        <div @click="修改show2(item)">*{{item.show2 ? '关闭公告内容' : '点击查看公告内容'}}*</div>
                        <transition name="el-zoom-in-top">
                            <div v-show="item.show2" class="text_text" v-html="item.text"></div>
                        </transition>
                    </div>
                </li>
            </ul>
        </el-dialog>

    </div>
</template>

<script>
import { api_首页公告, api_首页公告详情 } from '@/api/公告接口.js'
import { mapMutations, mapActions } from 'vuex'
import $ from 'jquery'
// import { debug } from 'util'
export default {
    data() {
        return {
            NoticeList: [],         //公告
            显示滚动字幕: false,
            config: config,
            type: 0,
            游戏:[
                {
                    name:"AG国际厅",
                    type:"AG",
                    gid:"2",
                    img:"live-mn-1.png",
                    img2:['ag1.png','ag2.png'],
                    text:"现场360度视角，实时显示输赢排行榜，推荐最好牌路",
                    imglist:[
                        {img:'live-tese-1.png',name:"竞咪"},
                        {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"},
                        {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        // {img:"live-tese-7.png",name:"快速"}
                    ]
                },{
                    name:"AG旗舰厅",
                    type:"AG",
                    gid:"1",
                    img:"live-mn-2.png",
                    img2:["ag3.png","ag4.png"],
                    text:"独创6张牌先发，全球首创，多种创新玩法",
                    imglist:[
                        {img:'live-tese-1.png',name:"竞咪"},
                        {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"},
                        {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        // {img:"live-tese-7.png",name:"快速"}
                    ]
                },{
                    name:"BG视讯大厅",
                    type:"BG",
                    gid:"1",
                    img:"live-mn-3.png",
                    img2:["bg1.png","bg2.png"],
                    text:"与性感兔女郎现场互动，畅享刺激的游戏体验",
                    imglist:[
                        // {img:'live-tese-1.png',name:"竞咪"},
                        {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"}
                        // {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        // {img:"live-tese-7.png",name:"快速"}
                    ]
                },{
                    name:"BBIN厅",
                    type:"BY",
                    gid:"live",
                    img:"live-mn-4.png",
                    img2:["bbin1.png","bbin2.png"],
                    text:"和最棒的荷官一起畅玩百家乐",
                    imglist:[
                        {img:'live-tese-1.png',name:"竞咪"},
                        // {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"},
                        {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        {img:"live-tese-7.png",name:"快速"}
                    ]
                },
                // {
                //     name:"申博视讯大厅",
                //     type:"TG",
                //     gid:"qp",
                //     img:"shengbo2.png",
                //     img2:["shenbo1.png",'shenbo2.png'],
                //     text:"荷官互动360度旋转咪牌，美女如云",
                //     imglist:[
                //         {img:'live-tese-1.png',name:"竞咪"},
                //         {img:"live-tese-3.png",name:"多台"},
                //         {img:"live-tese-4.png",name:"电子游戏"},
                //         {img:"live-tese-7.png",name:"快速"}
                //     ]
                // },
                {
                    name:"欧博视讯大厅",
                    type:"AB",
                    gid:"100",
                    img:"oubo2.png",
                    img2:["oub1.png",'oub2.png'],
                    text:"首创超级多台12桌",
                    imglist:[
                        {img:'live-tese-1.png',name:"竞咪"},
                        {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"},
                        {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        {img:"live-tese-7.png",name:"快速"}
                    ]
                },{
                    name:"易博视讯大厅",
                    type:"EB",
                    gid:"0",
                    img:"boji3.png",
                    img2:['boji1.png','boji2.png'],
                    text:"360°旋转华丽动效，超高品质现场直播",
                    imglist:[
                        {img:'live-tese-1.png',name:"竞咪"},
                        {img:"live-tese-2.png",name:"包桌"},
                        {img:"live-tese-3.png",name:"多台"},
                        // {img:"live-tese-4.png",name:"电子游戏"},
                        // {img:"live-tese-5.png",name:"旗舰"},
                        // {img:"live-tese-6.png",name:"金臂厅"},
                        {img:"live-tese-7.png",name:"快速"}
                    ]
                }
            ]
        }
    },
    methods: {
        ...mapMutations({
            修改state: '修改state'
        }),
        ...mapActions({
            获取平台余额: '获取平台余额'
        }),
        进入游戏(item){
            this.获取平台余额(item.type);
            let obj={
                    name:item.name,
                    type:item.type,
                    gid:item.gid
                }
            this.修改state(['待进入游戏', obj])
            this.修改state(['显示进入游戏弹框', true])
        },
        goKaist(name, type, name1, id, gid) {
            this.获取平台余额(type)
            var obj = {
                'name': name1,
                'type': type,
                'gid': gid
            }
            this.修改state(['待进入游戏', obj])
            this.修改state(['显示进入游戏弹框', true])
        },
        readNotice() { 
            // loading的调用： 1.请求发送前调用为true 2.发送请求后调用(false)  3.抛出错误false
            api_首页公告().then(x => {
                this.NoticeList = x.status == 200 ? x.data : []
                this.显示滚动字幕 = true
            }).catch(err => { })
        },
        修改show2(item) {
            this.$set(item, 'show2', !item.show2)
            if (!item.text) {
                api_首页公告详情({ id: item.Id }).then(x => {
                    this.$set(item, 'text', x.data)
                }).catch(err => { })
            }
        }
    },
    mounted() {
        var mySwiper = new Swiper(this.$refs.swiper, {
            // autoplay: 3000,//可选选项，自动滑动
            // slidesPerView : 'auto',
            slidesPerView: 'auto',
            nextButton: this.$refs.next1,
            prevButton: this.$refs.prev1,
            autoplayDisableOnInteraction: false,
            mousewheelControl: true,   //鼠标
            // loop: true,
            // spaceBetween: 30
        })
    },
}

</script>

<style lang="scss" scoped>
#IMMORTAL .通知公告 {
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ .el-dialog__header {
        position: sticky;
        top: 0px;
        background: red;
        // color: #fff;
        padding-top: 10px;
        .el-dialog__title {
            color: #fff;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #fff;
            font-size: 18px;
        }
    }
    .el-dialog {
        margin: 20px;
        margin-top: 20px !important;
    }
    /deep/ .el-dialog__body {
        min-height: 350px;
        overflow: auto;
        background-color: #f5f5f5;
    }
    .item {
        margin-bottom: 20px;
        padding: 10px 0px;
        background: #ffffff;
        // border-radius: 4px;
        border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        .title {
            width: 100%;
            height: 46px;
            color: red;
            font-size: 15px;
            border-bottom: 1px solid #ccc;
            p {
                padding-left: 20px;
            }
        }
        .text {
            width: 100%;
            height: 100%;
            div {
                padding-left: 20px;
            }
            div:nth-child(1) {
                color: green;
                font-size: 16px;
                width: 100%;
                height: 46px;
                line-height: 50px;
            }
            .text_text {
                //  color:hotpink;
                height: 400px;
                height: 100%;
            }
        }
    }
}

.main {
    width: 1225px;
    margin: 0 auto;
    clear: both;
    // overflow: visible;
}
@ImgAddress: "../img";
ul,
li {
    list-style: none;
}

.body {
    // height: 900px;
    background-size: cover;
    background-position: center;
    marquee {
        cursor: pointer;
        position: absolute;
        line-height: 36px;
        color: #fff;
    }
}

div.tbbg-margin {
    padding-top: 630px;
    padding-bottom: 20px;
}

.tb-news-bg {
    -moz-opacity: 0.4;
    opacity: 0.4;
}


.list{
    &:hover{
        .item1{
            // filter: blur(10px);
            // filter: grayscale(100%);
            .bg1{
                opacity: 0;
            }
            .bg2{
                opacity: 1;
            }
        }
        .logo{
            img:nth-child(1){
                opacity: 0;
                transform: rotateX(-90deg);
                transform-origin:bottom;
            }
            img:nth-child(2){
                opacity: 1;
                transform: rotateX(0deg);
                transform-origin:bottom;
            }
        }
    }
    .swiper-button-prev,
    .swiper-button-next{
        height: 100%;
        top: 0px;
        background-image:none;
        margin: 0px ;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.5);
        width: 40px;
        font-size: 30px;
    }
    .swiper-button-prev{
        left: 0px;
    }
    .swiper-button-next{
        right: 0px;
    }
    .item1{
        width: 566px;
        height: 300px;
        position: relative;
        border-left: 1px solid #000000;
        // background-size: cover;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 0;
        &:hover{
            filter: grayscale(0%);
            .bg1{
                opacity: 1;
            }
            .bg2{
                opacity: 0;
            }
            .logo{
                img:nth-child(1){
                    opacity: 1;
                    transform: rotateX(0deg);
                    transform-origin:bottom;
                }
                img:nth-child(2){
                    opacity: 0;
                    transform: rotateX(-90deg);
                    transform-origin:bottom;
                }
            }
            .btn_1{
                transform: rotateX(0deg)
            }
            .l{
                transform:scale(1.05) 
            }
            .text1{
                margin: 10px 0px 0px 0px;
            }
            .l2{
                margin: 25px 0px 0px 0px;
            }
        }
    }
    .item2{
        position: relative;
        z-index: 1;
        display: flex;
    }
    .bg1,
    .bg2{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s;
        z-index: 0;
    }
    .bg2{
        opacity: 0;
    }
    .l{
        flex-shrink: 0;
        width: 210px;
        height: 100%;
        transition: all 0.3s;
    }
    .r{
        flex:1;
    }
    .logo{
        margin: 30px 0px 0px;
        height: 30px;
        position: relative;
        img{
            position: absolute;
            left: 0px;
            top: 0px;
            max-height: 100%;
            transition: 0.5s;
            transform-origin:bottom;
        }
        img:nth-child(2){
            opacity: 0;
            transform: rotateX(-90deg);
        }
        .BY{
            left: -30px
        }
    }
    .text1{
        color: #ffffff;
        background:linear-gradient(180deg,#fff,#da83ff);
        // background: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#da83ff));
        background-clip: text;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.5);
        margin: 30px 0px 0px 0px;
        transition: all 0.3s;
    }
    .l2{
        color: #ffffff;
        text-align: center;
        white-space: nowrap;
        display: flex;
        flex-wrap: wrap;
        margin: 40px 0px 0px 0px;
        transition: all 0.3s;
        li{
            width: 48px;
            margin:0px 36px 0px 0px;
        }
        img{
            width: 100%;
            margin: 0px 0px 8px 0px;
        }
    }
    .btn_1{
        // opacity: 0;
        position: absolute;
        left: 0px;
        bottom: 0px;
        text-align: center;
        width: 100%;
        height: 50px;
        background: rgba(44, 0, 123, 0.7);
        color: #ffffff;
        line-height: 50px;
        font-size: 14px;
        transform: rotateX(90deg);
        transform-origin:bottom;
        transition: all 0.3s;
    }
}

</style>
