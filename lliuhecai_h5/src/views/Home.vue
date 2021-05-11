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
                    第<span>{{info.issue}}</span>期
                </div>
                <div class="xiaqi">
                    <div>下期截止時間</div>
                    <div>{{下次}}</div>
                </div>
            </div>
            <div class="daojishi">
                <div class="lottery-time">
                    <span class="number">{{倒计时.h ?  倒计时.h[0] : ''}}</span>
                    <span class="number">{{倒计时.h ?  倒计时.h[1] : ''}}</span>
                    <span class="colon">:</span>
                    <span class="number">{{倒计时.m ?  倒计时.m[0] : ''}}</span>
                    <span class="number">{{倒计时.m ?  倒计时.m[1] : ''}}</span>
                    <span class="colon">:</span>
                    <span class="number">{{倒计时.s ?  倒计时.s[0] : ''}}</span>
                    <span class="number">{{倒计时.s ?  倒计时.s[1] : ''}}</span>
                    <div class="开奖中" v-if="开奖中">正在开奖</div>
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
                <div v-if="开奖历史.length>0 && !开奖中" v-for="item in 开奖历史[0].content">
                    <div class="number" :class="getColor(item).color">{{item}}</div>
                    <div class="sex">{{getColor(item).sx}}</div>
                </div>
                <div v-if="开奖中" v-for="item in 随机号.list">
                    <div class="number" :class="item.color">{{item.number}}</div>
                    <div class="sex">{{item.sx}}</div>
                </div>
            </div>

            <div class="header-2">
                近期开奖
                <img src="static/右.png" :class="{active:展示近期}" @click="展示近期=!展示近期">
            </div>

            <ul class="list" v-if="展示近期">
                <template v-for="(item,index) in 开奖历史">
                    <li v-if="item.content">
                        <div>第<span class="qishu">{{item.period}}</span>期</div>
                        <div class="kaijiang-2">
                            <div v-for="item2 in item.content">
                                <div class="number" :class="getColor(item2).color">{{item2}}</div>
                                <div class="sex">{{getColor(item2).sx}}</div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>

        </div>

        <iframe :style="{height:height_1+'px'}" v-if="iframe" :src="iframe" frameborder="0"></iframe>
    </div>
</template>

<script>
// import { defineComponent, onMounted, ref ,getCurrentInstance, reactive , onBeforeUnmount , toRefs } from "vue";
import { reactive, onMounted, ref , getCurrentInstance , onBeforeUnmount , toRefs} from 'vue'

import Swiper, { Autoplay , Pagination } from 'swiper'
Swiper.use([Pagination,Autoplay])
import "swiper/swiper-bundle.min.css";
import moment from 'moment';
export default {
    components: {
    },
    setup(props) {
        const { proxy } = getCurrentInstance(); 
        let swiper1 = ref(null)
        let 展示近期 = ref(false)
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
                        console.log('正在开奖随机数')
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
            // 开始 = ' 03:45'
        let 开始2 = ' 21:32'
            // 开始2 = ' 03:46'
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
                console.log('获取开奖配置',res)
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
        // CurrentInfo()
        // 获取近期记录()
        获取开奖历史()
        
        

       

        // 获取最后一期()

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
        onBeforeUnmount(()=>{
            pageShow=false
            随机号.stop()
            try {
                clearTimeout(倒计时定时)
            } catch (error) {}
        })
        return {
            height_1:iframe.height_1,
            iframe:iframe.url_1,
            swiper1,

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

            展示近期,

            倒计时秒,
            最近一期
        }
    }
}
</script>

<style lang="scss" scoped>
iframe{
    width: 100%;
}
.swiper1 {
    height: vw(120);
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
    margin: 15px 15px 10px;
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
        position: relative;
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
        .开奖中{
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            background: rgba($color: #000000, $alpha: 0.4);
            color: #fff;
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
