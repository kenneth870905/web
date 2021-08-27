<template>
    <div class="chess">
        <div class="chess_banner"><img src="image/chess/qp-banner.jpg" alt=""></div>
        <div class="container">
            <div class="swiper-container swiper_1" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item" v-for="(item, index) in header" :key="index" :style="{background:item.bg}">
                        <div class="img_1">
                            <img :src="config.img_url + item.img_url " alt="" srcset="">
                        </div>
                        <div>
                            <img class="img_2" :src="item.img_2" alt="" srcset="">
                            <div class="text_1">{{item.text}}</div>
                            <div class="btn" :class="'btn_'+index" :i="index">{{item.btn ? item.btn :  '开始游戏'}} </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-next" ref="next1"></div>
                <div class="swiper-button-prev" ref="prev1"></div>
            </div>

            <div class="chess_conent">
                <ul>
                    <li @click="跳转(item)" v-for="(item, index) in play_list" :key="index">
                        <div>
                            <div class="img_box">
                                <img :src="config.img_url+'image/chess/'+item.img" alt="">
                            </div>
                            <div class="chess_title">{{item.name}}</div>
                            <div class="chess_begin">
                                <el-button class="begin-btn" type="danger">开始游戏</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import $ from "jquery";
export default {
    data() {
        return {
            config: config,
            header: [
                {
                    type: 'KY',
                    gid: '0',
                    name: '开元棋牌',
                    img_url: 'image/chess/header_kaiyuan_1.png',
                    img_2: 'image/chess/header_kaiyuan_2.png',
                    text:'巅峰对决 经典棋牌在线竞技',
                    bg:"linear-gradient(90deg, #31d886, #00f781,#31d886)", 
                },
                {
                    type: 'GM',
                    gid: '0',
                    name: 'GM棋牌',
                    img_url: 'image/chess/header_gm_1.png',
                    img_2: 'image/chess/header_gm_2.png',
                    text:'汇聚精彩 随时随地组局畅玩',
                    bg:"linear-gradient(90deg, #0dabd8, #69edef,#0dabd8)", 
                },
                // {
                //     // btn: '敬请期待',
                //     type: 'QL',
                //     gid: '0',
                //     name: '761棋牌',
                //     img_url: 'image/chess/header_761_1.png',
                //     img_2: 'image/chess/header_761_2.png',
                //     text:'汇聚精彩 随时随地组局畅玩',
                //     bg:"linear-gradient(90deg, #0a8efd, #49cbfd , #0a8efd)", 
                // },
                {
                    // btn: '敬请期待',
                    type: 'HL',
                    gid: '0',
                    name: '欢乐棋牌',
                    img_url: 'image/chess/header_huanle_1.png',
                    img_2: 'image/chess/header_huanle_2.png',
                    text:"汇聚精彩 换了如影随行",
                    bg:"linear-gradient(90deg, #5309b3, #7231c5, #4e02b1)", 
                },
                //========================
                {
                    type: 'LY',
                    gid: '0',
                    name: '乐游棋牌',
                    img_url: 'image/chess/ly1.png',
                    img_2: 'image/chess/ly2.png',
                    text:"汇聚精彩 换了如影随行",
                    bg:"linear-gradient(90deg, #cf5f06, #fddbc0, #cf5f06)", 
                },
                // {
                //     type: 'CQ',
                //     gid: 'AD03',
                //     name: 'CQ9棋牌',
                //     img_url: 'image/chess/cq91.png',
                //     img_2: 'image/chess/cq92.png',
                //     text:"汇聚精彩 换了如影随行",
                //     bg:"linear-gradient(90deg,#83b6ee, #7231c5, #83b6ee)", 
                // },
                {
                    type: 'DT',
                    gid: '0',
                    name: 'DT棋牌',
                    img_url: 'image/chess/DT1.png',
                    img_2: 'image/chess/DT2.png',
                    text:"汇聚精彩 换了如影随行",
                    bg:"linear-gradient(90deg, #fb59fd, #7231c5, #fb59fd)", 
                }
                
            ],
            play_list: [
                {
                    name: '开元斗地主',
                    type: 'ky',
                    id: 'ddz',
                    gid: '610',
                    img: '_kyddz.jpg'
                },
                {
                    name: '开元抢庄牛牛',
                    type: 'ky',
                    id: 'qznn',
                    gid: '830',
                    img: '_kyqznn.jpg'
                }, {
                    name: '开元德州扑克',
                    type: 'ky',
                    id: 'dzpk',
                    gid: '620',
                    img: '_kydzpk.jpg'
                }, {
                    name: '开元押庄龙虎',
                    type: 'ky',
                    id: 'yzlh',
                    gid: '900',
                    img: '_kyyzlh.jpg'
                }, {
                    name: '开元二八杠',
                    type: 'ky',
                    id: 'ebg',
                    gid: '720',
                    img: '_kyebg.jpg'
                }, {
                    name: '开元炸金花',
                    type: 'ky',
                    id: 'zjh',
                    gid: '220',
                    img: '_kyzjh.jpg'
                }, {
                    name: '开元三公',
                    type: 'ky',
                    id: 'sg',
                    gid: '860',
                    img: '_kysg.jpg'
                }, {
                    name: '开元21点',
                    type: 'ky',
                    id: 'esyd',
                    gid: '600',
                    img: '_kyesyd.jpg'
                }, {
                    name: '开元通比牛牛',
                    type: 'ky',
                    id: 'tbnn',
                    gid: '870',
                    img: '_kytbnn.jpg'
                }, {
                    name: '开元极速炸金花',
                    type: 'ky',
                    id: 'jszjh',
                    gid: '230',
                    img: '_kyjszjh.jpg'
                }, {
                    name: '开元抢庄牌九',
                    type: 'ky',
                    id: 'qzpj',
                    gid: '730',
                    img: '_kyqzpj.jpg'
                },
                {
                    name: '开元十三水',
                    type: 'ky',
                    id: 'sss',
                    img: '_kysss.jpg'
                }, {
                    name: '开元幸运五张',
                    type: 'ky',
                    id: 'xywz',
                    gid: '380',
                    img: '_kyxywz.jpg'
                }, {
                    name: '开元射龙门',
                    type: 'ky',
                    id: 'slm',
                    gid: '390',
                    img: '_kyslm.jpg'
                }, {
                    name: '开元百家乐',
                    type: 'ky',
                    id: 'bjl',
                    gid: '910',
                    img: '_kybjl.jpg'
                },
                {
                    name: 'AG真人牛牛',
                    type: 'ag',
                    id: 'zrnn',
                    gid: '32',
                    img: 'agzrnn.jpg'
                }, {
                    name: 'AG21点',
                    type: 'ag',
                    id: '21d',
                    gid: '33',
                    img: 'ag21d.jpg'
                }, {
                    name: 'AG炸金花',
                    type: 'ag',
                    id: 'zrzjh',
                    gid: '36',
                    img: 'agzjh.jpg'
                }, {
                    name: 'BBIN德州扑克',
                    type: 'BY',
                    id: 'dzpk',
                    gid: '3010',
                    img: 'bydzpk.jpg'
                }, {
                    name: 'BBIN温州牌九',
                    type: 'BY',
                    id: 'wzpj',
                    gid: '3006',
                    img: 'bywzpj.jpg'
                }, {
                    name: 'BBIN三公',
                    type: 'BY',
                    id: 'sg',
                    gid: '860',
                    img: 'bysg.jpg'
                }, {
                    name: 'BBIN番摊',
                    type: 'BY',
                    id: 'ft',
                    gid: '3015',
                    img: 'byft.jpg'
                }, {
                    name: 'BBIN鱼虾蟹',
                    type: 'BY',
                    id: 'yxx',
                    gid: '3016',
                    img: 'byyxx.jpg'
                }

            ],
            list:[]
        }
    },
    methods: {
        ...mapMutations({
            修改state: '修改state'
        }),
        ...mapActions({
            获取平台余额: '获取平台余额'
        }),
        跳转(item) {
            if (item.btn == '敬请期待') {
                this.$message({
                    message: '暂未开放，敬请期待',
                    type: 'warning',
                    duration: 1500
                })
                return
            }

            this.修改state(['显示进入游戏弹框', true])
            this.修改state(['Aname', item.type.toUpperCase()])
            var obj = {
                'name': item.name,
                'type': item.type,
                'gid': item.gid
            }
            this.修改state(['待进入游戏', obj])
            this.获取平台余额(item.type)
        }
    },
    mounted() {
        var this_1=this
        $(this.$refs.swiper).on('click','.btn', function () {
            console.log($(this).attr('i'))
            let i = $(this).attr('i')
            this_1.跳转(this_1.header[i])
        });


        var mySwiper = new Swiper(this.$refs.swiper, {
            autoplay: 3000,//可选选项，自动滑动
            slidesPerView :4,
            nextButton: this.$refs.next1,
            prevButton: this.$refs.prev1,
            autoplayDisableOnInteraction : false,
            mousewheelControl : true,   //鼠标
            loop : true,
            // spaceBetween: 30
        })
        
    }
}
</script>

<style lang="scss" scoped>
.swiper_1{
    .swiper-slide{
        height: 300px;
        color: #fff;
    }
    &:hover{
        .swiper-button-prev,
        .swiper-button-next{
            opacity: 1;
        }
    }

    .swiper-button-prev,
    .swiper-button-next{
        height: 100%;
        top: 0px;
        margin-top: 0px;
        background-color: rgba(0,0,0,0.5);
        transition: all 0.5s;
        background-size:15px;
        width: 30px;
        opacity: 0;
    }
    .swiper-button-prev{
        left: 0px;
    }
    .swiper-button-next{
        right: 0px;
    }
}


.header_1 ,
.swiper_1 {
    display: flex;
    margin: 0px 0px 20px;
    .item {
        box-sizing: border-box;
        // width: 25%;
        border-left: 1px solid #000000;
        position: relative;
        // height: calc(300px * 9/16);
        height: 200px;
        padding: 10px;
        display: flex;
        align-items: center;
        .img_1{
            width: 40%;
            margin: 0px 10px 0px 0px;
            img{
                width: 100%;
            }
        }
        .text_1{
            color: #ffffff;
            margin: 0px 0px 20px;
        }
        .btn {
            width: 130px;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            color: #fff;
            border: 2px solid rgba(255, 255, 255, 0.6);
            background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
            transition: all 0.2s;
        }
        .btn:hover {
            transform: scale(1.1);
        }
    }
}
.chess {
    width: 100%;
    // height:100%;
    background: rgba(2, 1, 7, 0.993);
    .chess_banner {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .chess_conent {
        width: 100%;
        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li:hover .chess_title {
                display: none;
            }
            li:hover .chess_begin {
                opacity: 1;
            }
            li {
                width: 33.3%;
                padding: 0px 5px;
                height: 200px;
                margin-bottom: 16px;
                border-radius: 8px;
                // background: url("~@/assets/image/_kyddz.jpg") no-repeat;
                // background-size: 100% 100%;
                position: relative;
                box-sizing: border-box;
                > div {
                    height: 100%;
                    position: relative;
                }
                .img_box {
                    width: 100%;
                    height: 100%;
                    img {
                        border-radius: 15px;
                        width: 100%;
                        height: 100%;
                        // object-fit: cover;
                        object-fit: contain;
                    }
                }
                .chess_title {
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    background: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    width: 100%;
                    padding: 10px 0px;
                }
                .chess_begin {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    opacity: 0;
                    transition: all 0.5s;
                    .begin-btn {
                        background: rgba(56, 1, 1, 0.8);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-top: -20px;
                        margin-left: -49px;
                    }
                }
            }
        }
    }
}
</style>
