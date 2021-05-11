<template>
    <div class="huifang">
        <div class="main">
            <div class="header">
                <div class="t1">
                    澳門六合彩&nbsp;第<span class="n">{{item.period}}</span>期
                    <span class="btn-1">回放</span>
                </div>
                <div class="time-1">{{item.t}}</div>
                <span class="close" @click="clo()">×</span>
                <div class="videoCode">
                    <span class="vtitle">開獎號碼：</span>
                    <div class="numbers">
                        <span class="ball" v-for="item2 in item.content">
                            <span class="balls" :class="getColor(item2).color">
                                <i>{{item2}}</i>
                            </span>
                            <span class="shengxiao">{{getColor(item2).sx}}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="content">
                <!-- <video @canplay="加载完成()" loop="loop" :src="`${mp4url}${item.video}`" autoplay="autoplay" class="backV"></video> -->
                <video @canplay="加载完成()" loop="loop" :src="`https://amlhckjjg.oss-cn-hongkong.aliyuncs.com/video/${mp4}`" autoplay="autoplay" class="backV"></video>
                <div class="loading" v-if="showloading">
                    <div class="wrap">
                        <div class="one"></div>
                        <div class="two"></div>
                        <div class="three"></div>
                        <div class="four"></div>
                        <div class="five"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive , toRefs , computed} from 'vue'
export default {
    props: {
        item: Object,
    },
    setup(props , {emit }) {
            
        let markSixNums = $.base.markSixNums

        let data = reactive({
            showloading:true
        })


        let clo=()=>{
            emit('close');
        }
        let getColor = (number) => {
            return markSixNums.nums[number]
        }
        let 加载完成=()=>{
            data.showloading=false            
        }
        console.log(props.item)
        let mp4 = computed(()=>{
            // let obj = Object.assign({},props)
            let l = props.item.video.split('/')
            return l[l.length-1]
        })
        
        
        return {
            mp4,
            mp4url:mp4url,
            ...toRefs(data),
            clo,
            getColor,
            加载完成
            
        }
    }
}
</script>

<style lang="scss" scoped>
.huifang {
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main {
    width: 95%;
    background-color: #000;
    position: relative;
}
.header {
    width: 100%;
    padding: 5px 10px;
    background-color: #fff;
    position: relative;
    .t1{
        display: flex;
        align-items: center;
        font-size: 15px;
        .n{
            color: #d80011;
        }
        .btn-1{
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 12px;
            background: #d80011;
            color:#fff;
            margin: 0px 0px 0px 3px;
        }
    }
    .time-1{
        line-height: 25px;
        color: #666;
        font-size: 12px;
        margin: 5px 0px 0px;
    }
    .close{
        position: absolute;
        top: 0px;
        right: 5px;
        font-size: 30px;
    }
    .videoCode{
        display: flex;
        .vtitle{
            font-size: 12px;
            color: #666;
            margin: 6px 0px 0px;
        }
    }
}

.numbers {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    .ball {
        // margin: 0px 5px 0px 0px;
        position: relative;
        &:nth-child(6) {
            margin-right: 14px;
            &::after {
                position: absolute;
                content: "+";
                right: -12px;
                top: 0px;
                color: red;
                line-height: 27px;
            }
        }
    }
    .sex {
        font-size: 12px;
    }
    .balls {
        display: block;
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        line-height: 29px;
        text-align: center;
        &.红 {
            background-image: url(~@/assets/红.png);
        }
        &.绿 {
            background-image: url(~@/assets/绿.png);
        }
        &.蓝 {
            background-image: url(~@/assets/蓝.png);
        }
        i {
            zoom: 0.8;
            font-style: inherit;
        }
    }
}
.content{
    height: vw(205);
    position: relative;
}

.loading {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000;
    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            background-color: #fff;
            height: 60px;
            width: 5px;
            margin-right: 10px;
            animation: loading 1s ease-in-out infinite;
        }
        .two{
            animation-delay: -0.9s;
        }
        .three{
            animation-delay: -0.8s;
        }
        .four{
            animation-delay: -0.7s;
        }
        .five{
            animation-delay: -0.6s;
        }
    }
}
@keyframes loading {
    0%,
    40%,
    to {
        transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1);
    }
}

video{
    width: 100%;
    height: 100%;
}

</style>