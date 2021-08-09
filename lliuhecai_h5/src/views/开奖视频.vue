<template>
    <div class="title-1">澳門六合彩</div>
    <div class="tongzhi">
        <div>即時開獎驗證</div>
        <div>開獎現場直播，同步播報中央電視臺1套視頻，開獎過程100%公開公正！</div>
    </div>

    <div class="box-1">
        <div class="text" v-if="!可以播放">
            <div>澳門六合彩攪珠直播視頻開播時間為每晚</div>
            <div><span>21:32-21:38</span>(北京時間)，敬請查看。</div>
        </div>
        <video v-if="可以播放" ref="videoElement"></video> 
        <img src="static/bofang2.png" v-if="播放失败" @click="播放()">
    </div>

    <iframe :style="{height:height_1+'px'}" v-if="iframe" :src="iframe" frameborder="0" style="width:100%;margin-top:20px;"></iframe>

    <div class="title-2">
        <div class="l">
            <div>開獎視頻</div>
        </div>
        <div class="r">
            <input type="text" v-model="filter" placeholder="開獎查詢">
            <img src="static/sousuo.png" alt="" srcset="">
        </div>
    </div>

    <div class="time1">
        <span>今年</span>
    </div>

    <div class="video-notice">開獎視頻回放，僅保留當年部分供用戶查看</div>
    
    <ul class="list">
        <template v-for="item in newList">
            <li v-if="item.content">
                <div class="bg-1" @click="回放(item)">
                    <img class="bg" src="static/video_bg.jpg" alt="" srcset="">
                    <img class="btn" src="static/bofang2.png" alt="" srcset="">
                </div>
                <div class="t1">
                    澳門六合彩
                    <br>
                    第{{item.period}}期開獎視頻
                </div>
            </li>
        </template>
    </ul>
    <huifang v-if="显示播放" :item="Selected" @close="显示播放=false"/>

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
        // let nums = []
        // for (const key in markSixNums.nums) {
        //     let o = Object.assign({},markSixNums.nums[key])
        //         o.number = key
        //     nums.push(o)
        // }
        let getColor = (number) => {
            return markSixNums.nums[number]
        }
        let 开奖历史 = reactive([])
        let data = reactive({
            Selected:{}
        }) 
        let 可以播放 = ref(false)
        let 显示播放=ref(false)
        let filter = ref('')
        let newList =computed(()=>{
            let f = filter.value.replace(/\s+/g,"")
            var L = []
            if(f){
                L = 开奖历史.filter(x=>x.period.includes(f))
            }else{  
                L = 开奖历史
            }
            return L
            // return L.slice(size*(pageIndex.value-1),size*pageIndex.value);
        })
        let 回放=(item)=>{
                data.Selected=item
                显示播放.value=true
            }
        let  获取开奖历史=()=>{
            // proxy.$axios.get('/Results/20000/2021/20210428.json').then(res => {
            proxy.$axios.get('/api.php?action=history&size=100').then(res => {
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
            console.log(videoElement.value)
            flvPlayer = flvjs.createPlayer({
                type: 'flv',
                // url: '2032-2.flv'
                // url:"https://vd1-qq.kangtuoshe.com/live/2032-2.flv",  已经失效了
                // url:"https://vd1-aliqq.dancheqike.com/live/2032-2.flv"
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
            flvPlayer.play().then(()=>{
                播放失败.value=false
            })
        }

        获取开奖历史()

        onMounted(()=>{
            let minT = 2132
                // minT = 424
            let maxT = 2138
            var date = new Date()
            var t1 = date.getHours()+date.getMinutes().toString()
            if(t1>minT && t1<maxT){
                开始()
            }
            
            视频定时器 = setInterval(()=>{
                var date1 = new Date()
                var t2 = date1.getHours()+date1.getMinutes().toString()
                if(t2>minT && t2<maxT){
                    开始()
                }else{
                    结束()
                }
            }, 1000);
        })

        onBeforeUnmount(()=>{
            try {
                clearInterval(视频定时器)
            } catch (error) {}
        })

        return{
            
            height_1:iframe.height_3,
            iframe:iframe.url_3,


            getColor,
            显示播放,
            回放,
            newList,
            filter,
            可以播放,
            开奖历史,

            ...toRefs(data),
            videoElement,
            播放失败,
            播放
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
.box-1{
    margin: 15px 10px 0px;
    background: #000;
    height: 205px;
    position: relative;
    .text{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #fff;
        span{
            color: red;
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    img{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
    }
}

.title-2{
    padding: 15px;
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

.time1{
    padding: 5px 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
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

.video-notice{
    margin: 15px 10px 0 10px;
    padding: 0 10px;
    background-color: #fadce9;
    font-size: 10px;
    line-height: 25px;
    height: 25px;
    color:#c30055;
}

.list{
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px 50px;
    li{
        width: 50%;
        padding: 0px 10px;
        margin: 0px 0px 10px 0px;
    }
    .bg-1{
        position: relative;
    }
    .bg{
        width: 100%;
    }
    .btn{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 40px;
    }
    .t1{
        font-size: 12px;
        line-height: 20px;
    }
}



</style>