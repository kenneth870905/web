<template>
    <div class="huifang">
        <div class="main">
            <div class="header">
                <span class="videoName">澳門六合彩</span>
                <span class="videoIssue">
                    第 <span>{{item.period}}</span> 期
                </span>
                <span class="videoTitle">回放</span>
                <img src="static/close-2.png" alt srcset @click="clo()"/>
                <div class="videoTime">開獎時間：{{item.t}}</div>
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
                <div class="control"></div>
            </div>
            <!-- <video @canplay="加载完成()" loop="loop" :src="`https://amlhckjjg.oss-cn-hongkong.aliyuncs.com/video/${item.IssueCode}.mp4`" autoplay="autoplay" class="backV"></video> -->
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
            ...toRefs(data),
            clo,
            getColor,
            加载完成,
            mp4url:mp4url,
            mp4
            
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
    width: 640px;
    height: 450px;
    background-color: #000;
    position: relative;
}
.header {
    height: 90px;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    position: relative;
    img {
        background-color: grey;
        border-radius: 50%;
        height: 25px;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
    }
    .videoName {
        color: #515151;
        font-size: 16px;
        font-weight: 600;
        height: 30px;
        line-height: 30px;
        padding-right: 15px;
    }
    .videoIssue {
        height: 30px;
        line-height: 30px;
        color: #515151;
        font-size: 16px;
        padding-right: 15px;
        span {
            color: #d80011;
        }
    }
    .videoTitle {
        color: #fff;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        padding: 0 10px;
        background-color: #d80011;
        border-radius: 10px;
    }
    .videoTime {
        color: grey;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        width: 230px;
    }
    .videoCode {
        position: absolute;
        top: 0px;
        color: grey;
        line-height: 30px;
        font-size: 14px;
        top: 30px;
        left: 270px;
        display: flex;
        align-items: center;

        .numbers {
            display: flex;
            justify-content: center;
            text-align: center;
            .ball {
                margin: 0px 5px 0px 0px;
                position: relative;
                &:nth-child(6) {
                    margin-right: 14px;
                    &::after {
                        position: absolute;
                        content: "+";
                        right: -12px;
                        top: 0px;
                        color: red;
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
                line-height: 27px;
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
    }
}
.loading {
    position: absolute;
    top: 90px;
    left: 0px;
    width: 100%;
    height: 368px;
    background: #000;
    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            background-color: #fff;
            height: 150px;
            width: 16px;
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
    width: 640px;
    height: 368px;
}

</style>