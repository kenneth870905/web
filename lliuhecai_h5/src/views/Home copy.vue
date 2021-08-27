<template>
    <div class="page">
        <div class="swiper-container swiper1" ref="swiper1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" @click="go()">
                    <img src="static/banner1.jpg" alt />
                </div>
                <div class="swiper-slide" @click="go()">
                    <img src="static/banner2.jpg" alt />
                </div>
                <div class="swiper-slide" @click="go()">
                    <img src="static/banner3.jpg" alt />
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <div class="m15">
            <div class="header-1">
                <span class="n1">澳門六合彩</span>
                <div class="qishu">
                    第<span>{{lastLottery.IssueCode}}</span>期
                </div>
                <div class="xiaqi">
                    <div>下期截止時間</div>
                    <div>{{lastLottery.xiaci}} 21:15:00</div>
                </div>
            </div>
            <div class="daojishi">
                <div class="lottery-time">
                    <span class="number">{{lastLottery.showTimer.h ?  lastLottery.showTimer.h[0] : ''}}</span>
                    <span class="number">{{lastLottery.showTimer.h ?  lastLottery.showTimer.h[1] : ''}}</span>
                    <span class="colon">:</span>
                    <span class="number">{{lastLottery.showTimer.m ?  lastLottery.showTimer.m[0] : ''}}</span>
                    <span class="number">{{lastLottery.showTimer.m ?  lastLottery.showTimer.m[1] : ''}}</span>
                    <span class="colon">:</span>
                    <span class="number">{{lastLottery.showTimer.s ?  lastLottery.showTimer.s[0] : ''}}</span>
                    <span class="number">{{lastLottery.showTimer.s ?  lastLottery.showTimer.s[1] : ''}}</span>
                </div>
                <div class="foot">
                    <div class="btn-1">開獎驗證</div>
                    <div class="btn-2" @click="$router.push('/video')">直播</div>
                    <div class="flex1"></div>
                    <div class="btn-3" @click="$router.push('/DrawHistory')">
                        歷史開獎查詢
                        <img src="static/右.png" alt="" srcset="">
                    </div>
                </div>
            </div>
            <div class="kaijiang">
                <div v-if="近期开奖.Top1.Content" v-for="item in 近期开奖.Top1.Content">
                    <div class="number" :class="getColor(item).color">{{item}}</div>
                    <div class="sex">{{getColor(item).sx}}</div>
                </div>
                <div v-if="!近期开奖.Top1.Content" v-for="item in 随机号.list">
                    <div class="number" :class="item.color">{{item.number}}</div>
                    <div class="sex">{{item.sx}}</div>
                </div>
            </div>

            <div class="header-2">
                近期开奖
                <img src="static/右.png" :class="{active:展示近期}" @click="展示近期=!展示近期">
            </div>

            <ul class="list" v-if="展示近期">
                <template v-for="(item,index) in 近期开奖.Top5">
                    <li v-if="index<6 && item.Content">
                        <div>第<span class="qishu">{{item.IssueCode}}</span>期</div>
                        <div class="kaijiang-2">
                            <div v-for="item2 in item.Content">
                                <div class="number" :class="getColor(item2).color">{{item2}}</div>
                                <div class="sex">{{getColor(item2).sx}}</div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>

        </div>

    </div>
</template>

<script>
// import { defineComponent, onMounted, ref ,getCurrentInstance, reactive , onBeforeUnmount , toRefs } from "vue";
import { reactive, onMounted, ref , getCurrentInstance } from 'vue'

import Swiper, { Pagination } from 'swiper'
Swiper.use([Pagination])
import "swiper/swiper-bundle.min.css";
import moment from 'moment';
export default {
    components: {
    },
    setup(props) {
        const { proxy } = getCurrentInstance(); 

        let swiper1 = ref(null)
        let 展示近期=ref(true)

        let markSixNums = $.base.markSixNums
        let nums = []
        for (const key in markSixNums.nums) {
            let o = Object.assign({},markSixNums.nums[key])
                o.number = key
            nums.push(o)
        }
        let getColor = (number) => {
            return markSixNums.nums[number]
        }
        let go=()=>{
            window.open(baseURL)
        }
        // 即将开奖
        let lastLottery=reactive({
                IssueCode:'',
                showTimer:{ 
                    // h:'00',m:"00",s:'00'
                }
            })
        let time1 = reactive('');   //定时器 定时获取开奖记录
        let 近期开奖 = reactive({
            Top1:{},
            Top5:[],
        })
        let 随机号 = reactive({
                test:'1',
                time:'',
                list:[],
                stop:function(){
                    try {
                        clearInterval(this.time)
                    } catch (error) {}
                    this.time = ''
                },
                start:function(){
                    this.stop()
                    this.time=setInterval(() => {
                        console.log('定时器')
                        this.list[0] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[1] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[2] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[3] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[4] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[5] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[6] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                    }, 200);
                }
            })

         // 倒计时
        function setVal() {
            lastLottery.Timer--;
            if (lastLottery.Timer <= 0) {
                //已到开奖时间
                lastLottery.showTimer = { h: '00', m: '00', s: '00' };
                try {
                    clearTimeout(time1)
                } catch (error) {}
                time1 = null;
                setTimeout(() => {
                    GetBetResults()
                }, 1000);
                setTimeout(() => {
                    获取近期记录()               
                }, 3000);
            } else {
                var h = '00' + Math.floor(lastLottery.Timer / 3600);
                var m = '00' + Math.floor((lastLottery.Timer / 60 % 60));
                var s = '00' + Math.floor((lastLottery.Timer % 60));
                lastLottery.showTimer = { h: h.substr(h.length - 2), m: m.substr(m.length - 2), s: s.substr(s.length - 2) };
                setTimeout(() => {
                    setVal()
                }, 1000);
            }
        }
        // 获取即将开奖
        let GetBetResults=()=>{
            console.log('获取即将开奖')
            proxy.$axios.post('/Lottery/Bet/GetBetResults',{lotteryCode: 70002,state: 0}).then(res => {
                lastLottery.IssueCode=res.data.IssueCode
                lastLottery.Timer=res.data.Timer
                let 小时 = Math.floor(lastLottery.Timer / 3600);
                lastLottery.xiaci = moment().add(小时, 'hour').format('YYYY-MM-DD')
                setVal();
            }).catch(err => {
                console.log(err)
            })
        }

        let 获取近期记录 = ()=>{
            proxy.$axios.post('/M/Lottery/GetBetResults',{lotteryCode: 70002,state: 1}).then(res => {
                近期开奖.Top1 = res.data.Top1
                近期开奖.Top5 = res.data.Top5
                if(!近期开奖.Top1.Content){
                    随机号.start()
                    setTimeout(() => {
                        获取近期记录()                   
                    }, 5000);
                }else{
                    随机号.stop()
                }
            }).catch(err => {})
        }

        
        GetBetResults()
        获取近期记录()
        onMounted(() => {
            new Swiper(swiper1.value, {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                },
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                }
            });
        })
        return {
            swiper1,
            展示近期,
            lastLottery,
            近期开奖,
            随机号,
            getColor,
            go
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper1 {
    height: vw(155);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.page {
    background: #f0f0f0;
    height: calc(100% - 80px);
    overflow: auto;
}
.m15 {
    margin: 15px 15px 70px;
    // border: 1px solid #c3c3c3;
    background: #fff;
}

.header-1 {
    height: 36px;
    border: 1px solid #d80011;
    background: #ffc9c9;
    padding: 0px 8px;
    display: flex;
    font-size: 12px;
    align-items: center;
    color: #d80011;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    .n1 {
        flex-grow: 1;
    }
    .qishu {
        color: #000;
        span {
            color: #d80011;
        }
    }
    .xiaqi {
        margin: 0px 0px 0px 10px;
        padding: 0px 0px 0px 5px;
        position: relative;
        &::after {
            position: absolute;
            left: -5px;
            top: 20%;
            content: "";
            width: 2px;
            height: 60%;
            background: #d80011;
        }
        // border-left: 3px solid #d80011;
    }
}
.daojishi{
    border: 1px solid #c3c3c3;
    padding: 12px;
    .lottery-time{
        display: flex;
        text-align: center;
        font-size: 37px;
        .number{
            width: 37px;
            border: 1px solid #d0d0d0;
            line-height: 48px;
            border-radius: 3px;
            margin:  0px 5px 0px 0px;
        }
        .colon{
            margin: 0px 3px 0px 0px;
        }
    }
    .foot{
        margin: 10px 0px 0px;
        display: flex;
        align-items: center;
        .flex1{
            flex-grow: 1;
        }
        .btn-1,
        .btn-2{
            width: 62px;
            height: 25px;
            line-height: 25px;
            color: #fff;
            font-size: 12px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }
        .btn-1{
            margin: 0px 10px 0px 0px;
            background-image: url(~@/assets/btn-1.png);
        }
        .btn-2{
            background-image: url(~@/assets/btn-2.png);
        }
        .btn-3{
            font-size: 14px;
            img{
                vertical-align: middle;
                height: 13px;
            }
        }
    }
}

.kaijiang{
    padding: 15px;
    border-left: 1px solid #c3c3c3;
    border-right: 1px solid #c3c3c3;
    display: flex;
    font-size: 12px;
    text-align: center;
    >div:nth-child(6){
        .number{
            position: relative;
            margin-right: 10px;
            &::after{
                position: absolute;
                right: -10px;
                top: 0px;
                content: '+';
                color: #d80011;
                font-size: 15px;
            }
        }
    }
    .number{
        width: 38px;
        height: 38px;
        line-height: 38px;
        background-size: 100% 100%;
    }
    
    .红{
        background-image: url(~@/assets/红.png);
    }
    .绿{
        background-image: url(~@/assets/绿.png);
    }
    .蓝{
        background-image: url(~@/assets/蓝.png);
    }
}

.header-2{
    border: 1px solid #c3c3c3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color:#d80011;
    height: 30px;
    img{
        height: 14px;
        transform: rotate(90deg);
        &.active{
            transform: rotate(-90deg);
        }
    }
}

.list{
    border: 1px solid #c3c3c3;
    font-size: 12px;
    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        &:nth-child(2n-1){
            background: #f4f4f4;
        }
    }
    .qishu{
        color: #d80011;
    }
}
.kaijiang-2{
    display: flex;
    font-size: 12px;
    text-align: center;
    >div:nth-child(6){
        .number{
            position: relative;
            margin-right: 10px;
            &::after{
                position: absolute;
                right: -10px;
                top: 0px;
                content: '+';
                color: #d80011;
                font-size: 15px;
            }
        }
    }
    .number{
        width: 30px;
        line-height: 30px;
        background-size: 100% 100%;
    }
    .红{
        background-image: url(~@/assets/红.png);
    }
    .绿{
        background-image: url(~@/assets/绿.png);
    }
    .蓝{
        background-image: url(~@/assets/蓝.png);
    }
}

</style>
