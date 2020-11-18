<template>
    <div class="视频教程">
        <div class="内容">
            <div class="header">
                教程
                <i @click="关闭视频教程()" class="icon iconfont icon-guanbi"></i>
            </div>
            <div class="video_box">
                <video controls autoplay loop="loop" src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    inject:['关闭视频教程'],
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.视频教程{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    padding: _vw(30) _vw(10);
    .内容{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .header{
            line-height: 44px;
            flex-shrink: 1;
            background: $color;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
            i{
                position: absolute;
                top:0px;
                right: 10px;
            }
        }
        .video_box{
            height: calc(100% - 44px);
            flex-grow: 1;
            background: #ffffff;
            padding: _vw(10);
            video{
                width: 100%;
                height: 100%;
                background: #000000;
            }
        }
    }
}
</style>
