<template>
    <div class="home">
        <div class="swiper-container swiper1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" @click="go()">
                    <img src="static/Banners-1.jpg" alt />
                </div>
                <div class="swiper-slide" @click="go()">
                    <img src="static/Banners-2.jpg" alt />
                </div>
                <div class="swiper-slide" @click="go()">
                    <img src="static/Banners-3.jpg" alt />
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <div class="mainLottery">
            <div class="top">
                <div class="lotteryTitle">
                    <span class="title">澳門六合彩</span>
                    <span class="nextTime">第{{info.issue}}期截止時間：{{下次}}</span>
                </div>
                <div class="content">
                    <div class="left">
                        <div class="lastTitle">
                            <span class="t1">澳門六合彩</span> 
                            <template v-if="!开奖中">
                                第<span class="qihao" >{{开奖历史.length>0 ? 开奖历史[0].period : ''}}</span>期
                            </template>
                            <template v-if="开奖中">
                                第<span class="qihao" >{{info.lastIssue}}</span>期
                            </template>
                        </div>
                        <div class="num">
                            <span class="ball" v-if="开奖历史.length>0 && !开奖中" v-for="item in 开奖历史[0].content">
                                <span class="balls" :class="getColor(item).color">{{item}}</span>
                                <span class="shengxiao">{{getColor(item).sx}}</span>
                            </span>
                            <span class="ball" v-if="开奖中" v-for="item in 随机号.list">
                                <span class="balls" :class="item.color">
                                    {{item.number}}
                                </span>
                                <span class="shengxiao">{{item.sx}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="leftTime">
                            <span class="num-1">{{倒计时.h ? 倒计时.h[0] : ''}}</span>
                            <span class="num-1">{{倒计时.h ? 倒计时.h[1] : ''}}</span>
                            <span class="dot">:</span>
                            <span class="num-1">{{倒计时.m ? 倒计时.m[0] : ''}}</span>
                            <span class="num-1">{{倒计时.m ? 倒计时.m[1] : ''}}</span>
                            <span class="dot">:</span>
                            <span class="num-1">{{倒计时.s ? 倒计时.s[0] : ''}}</span>
                            <span class="num-1">{{倒计时.s ? 倒计时.s[1] : ''}}</span>
                        </div>
                        <div class="check">
                            <div class="button">
                                開獎驗證
                                <div class="suf">
                                    <div class="title">
                                        <img src="static/gantanhao.png" alt="" srcset="">
                                        <div class="title-text">即時開獎驗證</div>
                                    </div>
                                    <p>開獎現場直播，同步播報中央電視臺1套視頻，開獎過程100%公開公正！</p>
                                </div>
                            </div>
                            <div class="video" @click="$router.push('/video')">直播</div>
                        </div>
                        <div class="history" @click="$router.push('/DrawHistory')">
                            歷史開獎查詢
                            <img src="static/you.png" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table-1">
            <thead>
                <tr>
                    <th>期號</th>
                    <th>開獎時間</th>
                    <th>中獎號碼</th>
                    <th>開獎回放</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item,index) in 开奖历史" >
                    <tr v-if="item.content">
                        <td>第 <span class="qihao">{{item.period}}</span> 期</td>
                        <td>{{item.t}}</td>
                        <td>
                            <div class="numbers">
                                <div v-for="item2 in item.content">
                                    <div class="number" :class="getColor(item2).color"><span>{{item2}}</span></div>
                                    <div class="sex">{{getColor(item2).sx}}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="btn" @click="回放(item)">回放</div>
                        </td>
                    </tr>
                </template>

            </tbody>
        </table>

        <huifang v-if="显示播放" :item="Selected" @close="显示播放=false"/>

    </div>
    <iframe :style="{height:height_1+'px','width':'100%'}" v-if="iframe" :src="iframe" frameborder="0"></iframe>

</template>

<script>

// $.base.markSixNums
import { defineComponent, onMounted, ref ,getCurrentInstance, reactive , onBeforeUnmount , toRefs } from "vue";

// https://www.jianshu.com/p/51fa180e6fd6  swiper vue3 用法
import Swiper, { Pagination , Autoplay} from 'swiper'
Swiper.use([Pagination , Autoplay])
import "swiper/swiper-bundle.min.css";

import huifang from '@/components/回访.vue'
import moment from 'moment';

export default {
    name: '',
    components: {
        huifang
    },
    setup(props, ctx ) {
        onMounted(() => {
            new Swiper(".swiper1", {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                },
                autoplay:true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
            });
        })
        

        const { proxy } = getCurrentInstance(); 
        let pageShow = true

        let markSixNums = $.base.markSixNums
        let nums = []
        for (const key in markSixNums.nums) {
            let o = Object.assign({},markSixNums.nums[key])
                o.number = key
            nums.push(o)
        }
        // console.log(markSixNums)
        // console.log(nums)
        let getColor = (number) => {
            return markSixNums.nums[number]
        }
        let go=()=>{
            window.open(baseURL)
        }

        
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
                        // this.list = []
                        this.list[0] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[1] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[2] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[3] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[4] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[5] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        this.list[6] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        // this.list[7] = nums[Math.floor(Math.random()*(48-0+1)+0)]
                        // console.log(this.list[0].number)
                        // this.test = Math.floor(Math.random()*(48-0+1)+0);
                    }, 200);
                }
            })
        
        let 开奖中 = ref(false)
        let 显示播放=ref(false)
        let info= reactive({
            issue:'',
            lastIssue:""
        })
        let 下次 = ref('')
        let 倒计时秒=""
        let 倒计时 = ref({
            // h:'00',m:"00",s:'00'
        })

        let 开始 = ' 21:15'
            // 开始 = ' 20:38'
        let 开始2 = ' 21:32'
            // 开始2 = ' 20:39'
        let 结束 = ' 21:40'
        // 倒计时
        let 倒计时定时 = ''
        let 最近一期 = reactive({
            content:"",
            period:""
        })
        function setVal2() {
            console.log('倒计时')
            倒计时秒--;
            if (倒计时秒 <= 0) {
                //已到开奖时间
                倒计时.value = { h: '00', m: '00', s: '00' };
                随机号.start()
                开奖中.value=true
                setTimeout(()=>{
                    设置时间()
                },3000)
            } else {
                var h = '00' + Math.floor(倒计时秒 / 3600);
                var m = '00' + Math.floor((倒计时秒 / 60 % 60));
                var s = '00' + Math.floor((倒计时秒 % 60));
                倒计时.value = { h: h.substr(h.length - 2), m: m.substr(m.length - 2), s: s.substr(s.length - 2) };
                倒计时定时 = setTimeout(() => {
                    setVal2()
                }, 1000);
            }
        }

        // 获取即将开奖
        let CurrentInfo=()=>{
            proxy.$axios.post('/api.php?action=CurrentInfo','').then(res => {
                console.log('获取即将开奖期号',res)
                info.issue=res.data.issue
                info.lastIssue = res.data.lastIssue
            }).catch(err => {})
        }

        let 获取最后一期 = ()=>{
            if(!pageShow) return
            proxy.$axios.get('/api.php?action=new','').then(res => {
                console.log('最后一期',res)
                let data = res.data
                if(!data.content){
                    setTimeout(() => {
                        获取最后一期()
                    }, 1000*20);
                }else{
                    data.content = data.content.split(',')
                    最近一期.content =  data.content
                    最近一期.period=data.period
                    最近一期.t=data.t
                    最近一期.video=data.video
                    if(!开奖历史.find(x=>x.period==data.period)){
                        开奖历史.unshift(data)
                    }else{
                        let data2 = 开奖历史.find(x=>x.period==data.period)
                            data2.content = data.content
                    }
                    console.log('查询到最新结果')
                    设置时间()
                    随机号.stop()
                }
            }).catch(err => {})
        }
        
        let 设置时间 =()=>{
            if(new Date() < new Date(moment().format('YYYY-MM-DD')+开始)){
                console.log('没到开奖时间')
                下次.value = moment().format('YYYY-MM-DD')+开始
                开奖中.value=false
                随机号.stop()
                倒计时秒 = (new Date(下次.value).getTime() - new Date().getTime())/1000
                setVal2()
            }else if(new Date() < new Date(moment().format('YYYY-MM-DD')+开始2)){
                下次.value = moment().add(1,'days').format('YYYY-MM-DD')+开始
                console.log('等待开奖')
                开奖中.value=true
                随机号.start()
                倒计时.value = {h:'00',m:'00',s:'00'}
                setTimeout(() => {
                    设置时间()
                }, 1000*10);
            }else if(new Date() < new Date(moment().format('YYYY-MM-DD')+结束)){
                下次.value = moment().add(1,'days').format('YYYY-MM-DD')+开始
                console.log('开奖时间内')
                if(最近一期.content){
                    开奖中.value=false
                    随机号.stop()
                    倒计时秒 = (new Date(下次.value).getTime() - new Date().getTime())/1000
                    setVal2()
                }else{
                    开奖中.value=true
                    随机号.start()
                    获取最后一期()
                    倒计时.value = {h:'00',m:'00',s:'00'}
                }
                // 随机号.start()
                // 倒计时秒 = 0
            }else{
                console.log('等待明天开奖')
                下次.value = moment().add(1,'days').format('YYYY-MM-DD')+开始
                开奖中.value=false
                随机号.stop()
                倒计时秒 = (new Date(下次.value).getTime() - new Date().getTime())/1000
                setVal2()
            }
            CurrentInfo()
        }
        设置时间()
        
        

        let 开奖历史 = reactive([])
        let data = reactive({
            Selected:{}
        })   

        let 回放=(item)=>{
                data.Selected=item
                显示播放.value=true
            }
       
        

        let  获取开奖历史=()=>{
            // proxy.$axios.get('/Results/20000/2021/20210428.json').then(res => {
            proxy.$axios.get('/api.php?action=history&size=6').then(res => {
                console.log('获取开奖历史',res)
                let list = res.data
                list.forEach(element => {
                    element.content = element.content ? element.content.split(',') : ''
                });
                开奖历史.length=0
                开奖历史.push(...list) 
            }).catch(err => {})
        }
        
        获取开奖历史()
        
     


        onBeforeUnmount(()=>{
            pageShow=false
            随机号.stop()
            try {
                clearTimeout(倒计时定时)
            } catch (error) {}
        })
        // console.log(proxy.$axios)
        return {
            height_1:iframe.height_1,
            iframe:iframe.url_1,

            getColor,
            go,
            显示播放,
            回放,
            info,
            下次,
            开奖历史,
            倒计时,
            开奖中,

            随机号,
            ...toRefs(data),
            最近一期
            // GetBetResults
        }

        
    }
}
</script>

<style lang="scss" scoped>
.home {
    width: 1170px;
    margin: 15px auto;
}
.swiper1 {
    height: 373px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.mainLottery {
    margin: 15px 0px 0px;
    height: 282px;
    box-shadow: 0 1px 4px #c8c8c8;
    border-radius: 4px;
    background-color: #fff;
    color: #646464;
    .lotteryTitle {
        background-color: #ffc9c9;
        border: 1px solid #d80011;
        color: #d80011;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 0 20px;
        .title {
            font-size: 20px;
        }
        .nextTime {
            font-size: 14px;
        }
    }
    .content {
        display: flex;
        padding: 0px 0px 0px 20px;
        justify-content: space-between;
    }
    .lastTitle {
        line-height: 20px;
        margin-top: 50px;
        margin-bottom: 22px;
        .t1 {
            margin: 0px 15px 0px 0px;
        }
        .qihao {
            color: #d80011;
        }
    }
    .num {
        display: flex;
        text-align: center;
        .ball {
            margin: 0px 30px 0px 0px;
        }
        .balls {
            display: block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            color: #000;
            text-align: center;
            background-size: 70px;
            background-position: -6px -4px;
            margin: 0px 0px 10px 0px;
            &.红 {
                background-image: url(~@/assets/红.png);
            }
            &.绿 {
                background-image: url(~@/assets/绿.png);
            }
            &.蓝 {
                background-image: url(~@/assets/蓝.png);
            }
        }
    }
    .leftTime {
        margin: 42px 0px 0px;
        display: flex;
        .num-1 {
            font-size: 48px;
            color: #3b3b3b;
            display: inline-block;
            width: 40px;
            height: 54px;
            line-height: 54px;
            border: 1px solid #d4d4d4;
            border-radius: 3px;
            text-align: center;
            margin-right: 6px;
        }
        .dot {
            font-size: 48px;
            line-height: 50px;
            color: #3b3b3b;
            margin-right: 6px;
        }
    }
    .check {
        margin: 28px 0px 0px;
        display: flex;
        justify-content: center;
        .button {
            height: 34px;
            line-height: 34px;
            width: 100px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            float: left;
            cursor: pointer;
            outline: none;
            background-image: url(~@/assets/btn-1.png);
            background-repeat: no-repeat;
            margin: 0px 20px 0px 0px;
            position: relative;
            &:hover{
                .suf{
                    display: block;
                }
            }
            .suf{
                display: none;
                position: absolute;
                top: 40px;
                left: -8px;
                text-align: left;
                width: 300px;
                height: 120px;
                background-image: url(~@/assets/bg1.png);
                background-repeat: no-repeat;
                background-size: 306px 124px;
                background-position: -4px -8px;
                z-index: 1;
                color: #525252;
                padding: 15px;
                .title{
                    display: flex;
                    align-items: center;
                }
                p{
                    margin: 0px 0px ;
                    line-height: 26px;
                    font-size: 12px;
                }
            }
        }
        .video {
            height: 34px;
            line-height: 34px;
            text-align: center;
            width: 87px;
            cursor: pointer;
            font-size: 14px;
            background-image: url(~@/assets/btn-2.png);
            color: #fff;
        }
    }
    .history{
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #3f3f3f;
        margin-top: 20px;
        margin-left: 60px; 
        &:hover{
            color: #d80011;
        } 
    }
}

.table-1{
    border-collapse:collapse;
    width: 100%;
    margin: 15px 0px 0px;
    text-align: center;
    border-top: 1px solid #d4d4d4;
    border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
    font-size: 14px;
    color: #414141;
    tr{
        border-bottom: 1px solid #d4d4d4;
    }
    th{
        background: #efefef;
        height: 35px;
        font-weight: 400;
    }
    .qihao{
        color:#d80011;
    }
    .numbers{
        display: flex;
        justify-content: center;
        >div{
            margin: 0px 10px 0px 0px;
            position: relative;
            &:nth-child(6){
                margin-right: 20px;
                &::after{
                    position: absolute;
                    content: '+';
                    right: -15px;
                    top: 5px;
                    color: red;
                }
            }
        }
        .sex{
            font-size: 12px;
        }
        .number{
            width: 30px;
            height: 30px;
            background-size: 100% 100%;
            line-height: 27px;
            text-align: center;
            &.红{
                background-image: url(~@/assets/红.png);
            }
            &.绿{
                background-image: url(~@/assets/绿.png);
            }
            &.蓝{
                background-image: url(~@/assets/蓝.png);
            }
            span{
                zoom: 0.8;
            }
        }
    }
    .btn{
        display: block;
        margin: 0px auto;
        width: 87px;
        height: 34px;
        line-height: 34px;
        color: #fff;
        cursor: pointer;
        background-image: url(~@/assets/btn-2.png);
        text-align: center; 
    }
}

</style>
