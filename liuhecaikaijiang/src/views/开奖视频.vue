<template>
    <div class="video">
        <div class="title-1">
            <div>開獎視頻</div>
            <div>
                <span>即時開獎驗證：</span>
                開獎現場直播，同步播報中央電視臺1套視頻，開獎過程100%公開公正！
            </div>
        </div>

        <div class="title-2">
            <!-- <span>澳門六合彩</span> -->
        </div>

        <div class="box-1">
            <div v-if="!可以播放" class="zezao">澳門六合彩攪珠直播時間為每晚<span class=""> 21:32-21:38 </span>(北京時間)，敬請查看。</div>    
            <video v-if="可以播放" ref="videoElement"></video>       
            <img class="bofang" v-if="播放失败" @click="播放()" src="static/bofang.png" alt="" srcset="" data-v-7b2a1afb="">    
        </div>

        <iframe :style="{height:height_1+'px','width':'100%','margin-top':'20px'}" v-if="iframe" :src="iframe" frameborder="0"></iframe>

        <div class="title-3">
            <span class="name">澳門六合彩  開獎視頻</span>
            <span class="tishi">開獎視頻回放，僅保留當年部分供用戶查詢觀看</span>
            <span class="flex1"></span>
            <span class="time">今年</span>
            <div class="input">
                <input type="text" name="" v-model="filter" id="" placeholder="请输入期号">
                <img src="static/chazhao.png" alt="" srcset="">
            </div>
        </div>

        <ul class="list">
            <template v-for="item in newList">
                <li v-if="item.content">
                    <div class="img">
                        <img class="bg" src="static/repeat.png" alt="" srcset="">
                        <img class="bofang" src="static/bofang.png" alt="" srcset="" @click="回放(item)">
                    </div>
                    <div class="t1">澳門六合彩 第 <span>{{item.period}}</span> 期 開獎視頻</div>
                </li>
            </template>
        </ul>
        <!-- <div class="分页">
            <div :class="{active:pageIndex==item}" @click="pageIndex=item" v-for="item in pageSize">{{item}}</div>
        </div> -->

        <huifang v-if="显示播放" :item="Selected" @close="显示播放=false"/>
    </div>
</template>

<script>
import { ref ,getCurrentInstance, reactive , onBeforeUnmount , toRefs , computed , watch , onMounted , nextTick } from "vue";
import moment from 'moment';
import huifang from '@/components/回访.vue'
import flvjs from 'flv.js'

export default {
    components: {
        huifang
    },
    setup(props) {
        

        const { proxy } = getCurrentInstance(); 
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
        let 显示播放=ref(false)
        // 即将开奖
        let lastLottery=reactive({
                IssueCode:'',
                showTimer:{ 
                    // h:'00',m:"00",s:'00'
                }
            })
        let time1 = reactive('');   //定时器
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

        let 开奖历史 = reactive([])
        let data = reactive({
            Selected:{}
        }) 
        let 可以播放 = ref(false)
        // let pageSize=ref(0)
        let pageIndex=ref(1)
        let filter = ref('')
        let size = 33
        let newList =computed(()=>{
            let f = filter.value.replace(/\s+/g,"")
            var L = []
            if(f){
                L = 开奖历史.filter(x=>x.period.includes(f))
            }else{  
                L = 开奖历史
            }
            return L;
            // return L.slice(size*(pageIndex.value-1),size*pageIndex.value);
        })

        let pageSize = computed(()=>{
            let f = filter.value.replace(/\s+/g,"")
            var L = []
            if(f){
                L = 开奖历史.filter(x=>x.IssueCode.includes(f))
            }else{  
                L = 开奖历史
            }
            return Math.ceil(L.length / size)
        })

        watch(filter,(newValue, oldValue) => {
            pageIndex.value=1
        })
        

        let 回放=(item)=>{
                data.Selected=item
                显示播放.value=true
            }
       

        let  获取开奖历史=()=>{
            // proxy.$axios.get('/Results/20000/2021/20210428.json').then(res => {
            proxy.$axios.get('/api.php?action=history&size=98').then(res => {
                console.log('获取开奖历史',res)
                let list = res.data
                list.forEach(element => {
                    element.content = element.content ? element.content.split(',') : ''
                });
                开奖历史.push(...list) 
            }).catch(err => {})
        }
        
        let 视频定时器 = ''
        let videoElement = ref(null)
        var flvPlayer = null
        var 播放失败 = ref(false)
        let 开始 = async ()=>{
            console.log('开始')
            if(可以播放.value) return
            可以播放.value= true
            // await new Promise((resolve, reject) => nextTick(()=>resolve()));
            await nextTick()
            // console.log(videoElement.value)
            flvPlayer = flvjs.createPlayer({
                type: 'flv',
                // url: '2032-2.flv'
                url:videoUrl
            });
            flvPlayer.attachMediaElement(videoElement.value);
            flvPlayer.load();
            // 有时候需要用户点击一下
            flvPlayer.play().catch(err=>{
                播放失败.value=true
                alert('如果自动播放失败，请点击播放按钮')
            })
        }
        let 结束 =()=>{
            可以播放.value = false
        }
        let 播放=()=>{
            console.log('点击了播放')
            flvPlayer.play().then(()=>{
                播放失败.value=false
            })
        }


        获取开奖历史()
        onMounted(()=>{
            let minT = 2132
                // minT = 419
            let maxT = 2138
            var date = new Date()
            var t1 = date.getHours()+date.getMinutes().toString()
            console.log(t1)
            if(t1>minT && t1<maxT){
                开始()
            }
            
            视频定时器 = setInterval(()=>{
                var date1 = new Date()
                var t2 = date1.getHours()+date1.getMinutes().toString()
                console.log(t2)
                if(t2>minT && t2<maxT){
                    开始()
                }else{
                    结束()
                }
            }, 1000);
        })

        onBeforeUnmount(()=>{
            随机号.stop()
            try {
                clearInterval(视频定时器)
            } catch (error) {
            }
        })

        return {
            height_1:iframe.height_3,
            iframe:iframe.url_3,

            getColor,
            // go,
            显示播放,
            回放,
            lastLottery,
            近期开奖,
            开奖历史,
            随机号,
            pageSize,
            pageIndex,
            filter,
            newList,
            可以播放,
            ...toRefs(data),

            videoElement,
            播放失败,
            播放
        }
    }
}
</script>

<style lang="scss" scoped>
.video {
    width: 1170px;
    margin: 0px auto;
}
.title-1 {
    margin: 10px auto;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
        font-size: 24px;
        color: #2c2c2c;
    }
    div:nth-child(2) {
        font-size: 14px;
        width: 1000px;
        background: #fdf7e8;
        padding: 0px 15px;
        color: #525252;
        span {
            color: #a68452;
        }
    }
}

.title-2 {
    background: #f0f0f0;
    border-radius: 36px;
    margin: 10px 0px 0px;
    height: 36px;
    span {
        display: inline-block;
        width: 120px;
        line-height: 36px;
        text-align: center;
        background: #d80011;
        border-radius: 36px;
        color: #fff;
    }
}

.box-1{
    height: 368px;
    position: relative;
    background: #000;
    .zezao{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        span{
            color: red;
            margin: 0px 3px;
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    .bofang{
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        margin: auto;
        cursor: pointer;
    }
}

.title-3{
    height: 50px;
    display: flex;
    align-items: center;
    border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
    padding: 0px 15px;
    .name{
        margin: 0px 30px 0px 0px;
    }
    .flex1{
        flex: 1;
    }
    .time{
        height: 36px;
        width: 70px;
        border-radius: 36px;
        text-align: center;
        color: #fff;
        line-height: 36px;
        background: #d80011;
    }
    .tishi{
        height: 25px;
        width: 300px;
        text-align: center;
        line-height: 25px;
        font-size: 14px;
        color: #d80011;
        background-color: #fdf7e8;
    }
    .input{
        margin: 0px 0px 0px 65px;
        width: 150px;
        height: 36px;
        display: flex;
        align-items: center;
        border: 1px solid #d4d4d4;
        overflow: hidden;
        border-radius: 36px;
        padding: 0px 10px;
        input{
            width: 0;
            flex-grow: 1;
            border: none;
            height: 100%;
            outline: none;
        }
    }
}

.list{
    display: flex;
    min-height: 58px;
    padding-left: 29px;
    padding-top: 10px;
    flex-wrap: wrap;
    border: 1px solid #d4d4d4;
    li{
        margin: 0px 29px 25px 0px;
    }
    .img{
        width: 350px;
        position: relative;
        height: 240px;
        .bg{
            height: 100%;
            width: 100%;
        }
        .bofang{
            position: absolute;
            top: 0px;
            bottom: 0px;
            right: 0px;
            left: 0px;
            margin: auto;
            cursor: pointer;
        }
    }
    .t1{
        font-size: 14px;
        color: #414141;
        text-align: center;
        line-height: 30px;
        span{
            color: red;
        }
    }
}

.分页{
    display: flex;
    margin: 15px 0px 30px;
    justify-content: center;
    div{
        cursor: pointer;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin: 0px 5px;
        // border: 1px solid #d4d4d4;
        border-radius: 3px;
        box-shadow: 0px 0px 0px 1px #d4d4d4;
    }
    .active{
        color: #fff;
        background: #d80011;
    }
}


</style>