<template>
    <div class="title-1">澳門六合彩</div>
    <div class="tongzhi">
        <div>重要通知</div>
        <div>澳門六合彩於14/5/2020起，攪珠時間變更為每天晚間舉行，並於網絡現場直播。</div>
    </div>
    <div class="title-2">
        <div class="l">
            <div>澳門六合彩</div>
            <div>開獎公告</div>
        </div>
        <div class="r">
            <input type="text" v-model="filter" placeholder="開獎查詢">
            <img src="static/sousuo.png" alt="" srcset="">
        </div>
    </div>
    <div class="p15">
        <div class="top1">
            <div class="t1" v-if="!开奖中 && 开奖历史.length>0">第<span>{{开奖历史[0].period}}</span>期開獎號碼</div>
            <div class="t1" v-if="开奖中">第<span>{{info.lastIssue}}</span>期開獎號碼</div>
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
        </div>
        <div class="djs">
            <div class="t1">下期截止時間<span>{{下次}}</span></div>
            <div class="lottery-time">
                <span class="number">{{倒计时.h ? 倒计时.h[0] : ''}}</span>
                <span class="number">{{倒计时.h ? 倒计时.h[1] : ''}}</span>
                <span class="colon">:</span>
                <span class="number">{{倒计时.m ? 倒计时.m[0] : ''}}</span>
                <span class="number">{{倒计时.m ? 倒计时.m[1] : ''}}</span>
                <span class="colon">:</span>
                <span class="number">{{倒计时.s ? 倒计时.s[0] : ''}}</span>
                <span class="number">{{倒计时.s ? 倒计时.s[1] : ''}}</span>
                <div class="开奖中" v-if="开奖中">正在开奖</div>
            </div>
        </div>
    </div>

    <iframe :style="{height:height_1+'px'}" v-if="iframe" :src="iframe" frameborder="0" style="width:100%"></iframe>

    <div class="time1">
        <span>今年</span>
    </div>

    <ul class="list">
        <template v-for="item in newList">
            <li v-if="item.content">
                <div class="l">
                    <div>
                        <div class="label">期号</div>
                        <div>第{{item.period}}期</div>
                    </div>
                    <div>
                        <div class="label">開獎時間</div>
                        <div>{{item.t}}</div>
                    </div>
                    <div>
                        <div class="label">中獎號碼</div>
                        <div class="kaijiang-1">
                            <div v-for="item2 in item.content">
                                <div class="number" :class="getColor(item2).color">{{item2}}</div>
                                <div class="sex">{{getColor(item2).sx}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r">
                    <img src="static/bofang.png" alt="" @click="回放(item)" srcset="">
                </div>
            </li>
        </template>
    </ul>

    <huifang v-if="显示播放" :item="Selected" @close="显示播放=false"/>
</template>

<script>
import { reactive , ref , getCurrentInstance , computed , toRefs , onBeforeUnmount} from 'vue'
import moment from 'moment';
import huifang from '@/components/回访.vue'

export default {
    components: {
        huifang
    },
    setup(props) {
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
            // 开始 = ' 04:02'
        let 开始2 = ' 21:32'
            // 开始2 = ' 04:03'
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
                        CurrentInfo()
                    }, 5000);
                }else{
                    data.content = data.content.split(',')
                    最近一期.content =  data.content
                    最近一期.period=data.period
                    最近一期.t=data.t
                    最近一期.video=data.video
                    if(!开奖历史.find(x=>x.period==data.period)){
                        开奖历史.unshift(data)
                    }else{
                        let data = 开奖历史.find(x=>x.period==data.period)
                            data.content = data.content
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
        
        
        let filter = ref('')
        let newList = computed(()=>{
            let f = filter.value.replace(/\s+/g,"")
            var L = []
            if(f){
                L = 开奖历史.filter(x=>x.period.includes(f))
            }else{  
                L = 开奖历史
            }
            return L
        })


        onBeforeUnmount(()=>{
            随机号.stop()
            try {
                clearTimeout(倒计时定时)
            } catch (error) {}
            pageShow=false
        })

        return {
            height_1:iframe.height_2,
            iframe:iframe.url_2,

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
            newList,
            filter
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1{
    line-height: 40px;
    color: #fff100;
    font-size: 15px;
    background: #d80011;
    text-align: center;
}
.tongzhi{
    margin: 10px;
    padding: 15px;
    background: #fff6e4;
    div:nth-child(1){
        line-height: 24px;
        font-size: 15px;
        font-weight: 700;
        color: #946405;
    }
    div:nth-child(2){
        font-size: 12.5px;
        line-height: 20px;
        display: inline-block;
        color: #595757;
    }
}
.title-2{
    padding: 15px;
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .l{
        font-size: 18px;
        color: #343434;
    }
    .r{
        width: 180px;
        height: 34px;
        padding: 0px 5px;
        display: flex;
        align-items: center;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        input{
            width: 0;
            flex-grow: 1;
            border: none;
            outline: none;
        }
        img{
            height: 20px;
        }
    }
}
.p15{
    padding: 0px 15px;
}
.top1{
    padding: 15px 0px;
    border-bottom: 1px solid #c4c4c4;
    .t1{
        color: #999;
        font-size: 16px;
        margin-bottom: 15px;
        span{
            margin: 0px 3px;
            color: #d80011;
        }
    }
}
.kaijiang{
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

.djs{
    padding: 15px 0px;
    .t1{
        color: #999;
        font-size: 13px;
        margin-bottom: 15px;
        span{
            margin: 0px 3px;
            color: #d80011;
        }
    }
}
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

.time1{
    font-size: 14px;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    span{
        display: block;
        width: 37px;
        line-height: 26px;
        text-align: center;
        background: #d80011;
        color: #fff;
        border-radius: 5px;
    }
}

.list{
    font-size: 13px;
    color: #3e3e3e;
    li{
        padding: 5px 0px;
        border-bottom: 1px solid #c4c4c4;
        display: flex;
        align-items: center;
    }
    .l{
        flex-grow: 1;
        >div{
            display: flex;
            margin: 5px 0px 0px;
        }
        .label{
            font-size: 13px;
            color: #d80011;
            text-align: right;
            width: 76px;
            margin: 0px 15px 0px 0px;
        }
    }
    .r{
        width: 50px;
        text-align: left;
        img{
            width: 18px;
        }
    }
}
.kaijiang-1{
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
        height: 30px;
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