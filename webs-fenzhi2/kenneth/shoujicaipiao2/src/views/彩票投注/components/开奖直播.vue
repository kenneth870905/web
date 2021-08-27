<template>
    <div class="开奖直播">
        <div class="live-tips">
            开奖直播时间为<span>21:32-21:45</span> (北京时间)
        </div>
        <video v-if="ok" ref="videoElement"></video>
    </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
    data() {
        return {
            ok:false,
            minT:2132,
            maxT:2145,
            t1:""
        }
    },
    methods: {
        async 开始(){
            console.log('开始')
            if(this.ok) return
            this.ok= true
            await new Promise((resolve, reject) => this.$nextTick(()=>resolve()));
            
            var videoElement = this.$refs.videoElement;
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                // url: '2032-2.flv'
                url:"https://vd1-qq.kangtuoshe.com/live/2032-2.flv"
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
        },
        结束(){
            this.ok = false
        }
    },
    mounted() {
        var date = new Date()
        var t1 = date.getHours()+date.getMinutes().toString()
        if(t1>this.minT && t1<this.maxT){
            this.开始()
        }
        
        this.t1 = setInterval(()=>{
            var date1 = new Date()
            var t2 = date1.getHours()+date1.getMinutes().toString()
            if(t2>this.minT && t2<this.maxT){
                this.开始()
            }else{
                this.结束()
            }
        }, 1000);
    },
    destroyed() {
        try {
            clearInterval(this.t1)
        } catch (error) {
        }
    },
}
</script>


<style lang="scss" scoped>
.开奖直播{
    position: relative;
    background: #353536;
    height: (200/360)*100vw;
    flex-shrink: 0;
}
video{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background:#000
}
.live-tips{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    span{
        color: red;
    }
}

</style>