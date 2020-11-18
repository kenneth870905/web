
<template>
    <div class="sports" :style="{'background':'url('+sports.sportsBanner+')'}">
        <div class="container">

            <div class="swiper-container swiper_1" ref="swiper">
                <ul class="swiper-wrapper">
                    <!-- <div class="swiper-slide item" v-for="(item, index) in sports.sportsContent" :key="index">
                        <img :src="'image/fish/'+item.img" alt="" srcset="">
                        <div class="btn_1" :i="index">开始游戏</div>
                    </div> -->
                    <li class="swiper-slide item" v-for="(item,index) in sports.sportsContent" :key="index" :style="{background:item.bg}">
                        <img class="img_1" :src="item.playRule" alt="" srcset="">
                        <img class="img_2" v-if="item.img_2" :src="item.img_2" alt="">
                        <div class="text_1">{{item.text}}</div>
                        <div class="lobby" @click="sportsGet(item)" >
                            <div></div>
                            <span>进入游戏</span>
                        </div>
                    </li>
                </ul>
                <div class="swiper-button-next" ref="next1">
                    <i class="el-icon-arrow-right"></i>                
                </div>
                <div class="swiper-button-prev" ref="prev1">
                    <i class="el-icon-arrow-left"></i>
                </div>
            </div>

            <!-- <ul>
                <li v-for="(item,index) in sports.sportsContent" :key="index" :style="{background:item.bg}">
                    <img class="img_1" :src="item.playRule" alt="" srcset="">
                    <img class="img_2" v-if="item.img_2" :src="item.img_2" alt="">
                    <div class="text_1">{{item.text}}</div>
                    <div class="lobby" @click="sportsGet(item)" >
                        <div :style="{background:item.bg}"></div>
                        <span>进入游戏</span>
                    </div>
                </li>
            </ul> -->


        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            sports: {
                sportsBanner: config.img_url + 'image/sports/SportsBg.jpg',
                sportsContent: [
                    
                    {
                        type: 'WG',
                        Aname: 'WG',
                        gid: 'lobby',
                        // name: '万游体育',
                        name: '皇冠体育',
                        playRule: config.img_url + 'image/sports/WG-3.png?v=3',
                        img_2: config.img_url + 'image/sports/WG-2.png?v=2',
                        bg:"linear-gradient(90deg, #0055b4, #478cef, #0055b4)", 
                        text: '网络世界各类游戏竞技精彩'
                    },
                    {
                        type: 'SS',
                        Aname: 'SS',
                        gid: '0',
                        name: '三昇体育',
                        playRule: config.img_url + 'image/sports/Sports-SS.png?v=2',
                        img_2: config.img_url + 'image/sports/Sports-SS_1.png?v=2',
                        bg:"linear-gradient(90deg, #005f8b, #0079a8,#005f8b)",
                        text: '畅想体育赛事竞技精彩'
                    },
                    {
                        type: 'FY',
                        Aname: 'FY',
                        gid: '3',
                        name: '泛亚电竞',
                        playRule: config.img_url + 'image/sports/Sports-YF.png?v=3',
                        img_2: config.img_url + 'image/sports/Sports-YF_1.png?v=2',
                        bg:"linear-gradient(90deg, #6600ad, #8437e0,#6600ad)", 
                        text: '网络世界各类游戏竞技精彩'
                    },
                    {
                        type: 'ag',
                        Aname: 'AG',
                        gid: 'TASSPTA',
                        name: 'AG体育',
                        playRule: config.img_url + 'image/sports/Sports-AG.png?v=2',
                        img_2: config.img_url + 'image/sports/Sports-AG_1.png?v=2',
                        bg:"linear-gradient(90deg, #008a3e, #00ba59,#008a3e)",
                        text: '提供最佳在线体育赔率'
                    },
                    {
                        type: 'BY',
                        Aname: 'BBIN',
                        gid: 'ball',
                        name: '波音体育',
                        playRule: config.img_url + 'image/sports/Sports-BBIN.png?v=2',
                        img_2: config.img_url + 'image/sports/Sports-BBIN_1.png?v=2',
                        bg:"linear-gradient(90deg, #f0a400, #ecd507,#f0a400)",
                        text:"网络世界各类体育彩票直播"
                    }
                ]
            }
        }
    },
    methods: {
        ...mapActions({
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框',
            获取平台余额: '获取平台余额'
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        sportsGet(item) { // 充值蒙层
            var obj = Object.assign({}, item)
            this.修改state(['Moneymin', ''])
            this.修改state(['Aname', item.Aname])

            var obj = {
                name: item.name,
                type: item.type,
                gid: item.gid
            }
            this.设置待进入游戏(obj)
            this.设置进入游戏弹框(true)
            // this.获取平台余额(item.type)
        }
    },
    mounted() {
        var this_1 = this;

        var mySwiper = new Swiper(this.$refs.swiper, {
            // autoplay: 3000,//可选选项，自动滑动
            // slidesPerView : 'auto',
            slidesPerView: '4.3',
            nextButton: this.$refs.next1,
            prevButton: this.$refs.prev1,
            autoplayDisableOnInteraction: false,
            mousewheelControl: true,            //鼠标
            // loop: true,
            spaceBetween: 10
        })
    },
}
</script>

<style lang="scss" scoped>
.swiper_1{
    .swiper-button-next,
    .swiper-button-prev{
        background-image: none;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
        top: 0px;
        margin-top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        width: 30px;
    }
    .swiper-button-prev{
        left: 0px;
    }
    .swiper-button-next{
        right: 0px;
    }
    .swiper-button-prev.swiper-button-disabled, 
    .swiper-button-next.swiper-button-disabled{
        display: none;
    }
}

.sports {
    padding-bottom: 10px;
    background-size: 100% 100%;
    .img_2 {
        position: absolute;
        top: 64px;
        right: 30px;
    }
    .text_1 {
        position: absolute;
        top: 103px;
        color: #fff;
        // left: 160px;
        width: 115px;
        text-align: right;
        right: 30px;
        text-shadow: 0px 1px 1px #000000;
        font-size: 14px;
        opacity: 0.9;
    }
    .container {
        height: 100%;
        padding-top: 560px;
        ul {
            display: flex;
            justify-content: space-between;
            position: relative;
            width: 100%;
            li:hover {
                .img_1{
                    transform: scale(1.1);
                }
                .lobby {
                    height: 54px;
                    cursor: pointer;
                    span{
                        line-height: 54px;
                    }
                    div{
                        opacity: 0.9;
                    }
                    // background: rgb(226, 86, 4);
                }
            }
            >li:nth-child(2){
                .text_1{
                    right: 40px;
                    width: 110px;
                }
            }
            li {
                // height: 300px;
                height: 280px;
                // width: 25%;
                // margin: 0px 5px;
                // background-size: 100% 100%;
                position: relative;
                overflow: hidden;
                .img_1{
                    transition: all 0.3s;
                    height: 100%;
                }
                .lobby {
                    display: inline-block;
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    height: 50px;
                    transition: all 0.1s;
                    // background: rgba(226, 86, 4, 0.5);
                    // background: rgba(0,0,0,0.3);
                    width: 100%;
                    color: #fff;
                    text-align: center;
                    div{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0px;
                        left: 0px;
                        opacity: 0.8;
                        transition: all 0.1s;
                        
                        background: rgba(0, 0, 0, 0.4);
                    }
                    span {
                        position: relative;
                        z-index: 1;
                        line-height: 50px;
                        font-size: 18px;
                        transition: all 0.1s;
                    }
                }
            }
        }
        
    }
}
</style>
