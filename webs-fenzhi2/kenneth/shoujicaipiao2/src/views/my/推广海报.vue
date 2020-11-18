<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">推广海报</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="bg1">
                <img src="static/image/tuiguang/bg0.png" alt="" srcset="">
                <img src="static/image/tuiguang/bg1.png" alt="" srcset="">
            </div>
            <div class="bg_2">
                <img src="static/image/tuiguang/bg2.png" alt="" srcset="">
            </div>
            <div class="bg_3">
                <img class="bg" src="static/image/tuiguang/bg3.png" alt="" srcset="">
                <div class="内容">
                    <div class="邀请信息">
                        <div>
                            <img src="https://tg-cdn2.gdbzh.com.cn/71326acc-469d-46da-9e9f-7a2b18c6bdf9.png" alt="" srcset="">
                        </div>
                        <div>
                            <span>邀请人:007</span>
                            <span>邀请码:007</span>
                        </div>
                        <div>
                            <button @click="show=true">选择</button>
                        </div>
                    </div>
                    <div class="二维码">
                        <img class="二维码1" src="static/image/tuiguang/erweima.png" alt="" srcset="">
                        <img class="小头像" src="https://tg-cdn2.gdbzh.com.cn/71326acc-469d-46da-9e9f-7a2b18c6bdf9.png" alt="" srcset="">
                    </div>
                </div>
            </div>

            <van-popup v-model="show" position="bottom">
                <van-picker :columns="columns" @change="onChange" :show-toolbar="true" title="推广码" @cancel="quxiao" @confirm="wancheng" />
            </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            columns: ['官方平台(6.0%)'],
            show:false
        }
    },
    methods: {
        onChange(picker, value, index){
            console.log(picker, value, index)
        },
        quxiao(){
            this.show=false
        },
        wancheng(){
            this.show=false
        }  
    },
}
</script>

<style lang="scss" scoped>
.bg1{
    width: 100%;
    height: 100%;
    position: fixed;
    img{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
    img:nth-child(2){
        z-index: 1;
    }
}
.bg_2{
    position: relative;
    z-index: 2;
    width: 90%;
    margin: _vw(25) auto 0px;
    img{
        width: 100%;
    }
}
.bg_3{
    position: relative;
    z-index: 2;
    width: 100%;
    padding-left: _vw(32);
    .bg{
        width: 100%;
    }
    .内容{
        position: absolute;
        width: 100%;
        top: 0px;
        left:0px;
    }
    .邀请信息{
        width: 60%;
        padding: 40px 0px 0px;
        display: flex;
        margin: 0px auto;
        >div:nth-child(1){
            width: _vw(50);
            height: _vw(50);
            flex-shrink: 0;
            margin: 0px _vw(10) 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        >div:nth-child(2){
            flex-grow: 1;
            font-size: _vw(13);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: _vw(5) 0px;
        }
        >div:nth-child(3){
            flex-shrink: 0;
            display: flex;
            align-items: center;
            button{
                background: #fa7645;
                font-size: _vw(12);
                color: #ffffff;
                padding: 3px 10px;
                border: none;
            }
        }
    }
    .二维码{
        width: 30%;
        margin: 20px auto;
        position: relative;
        .二维码1{
            width: 100%;
        }
    }
    .小头像{
        position: absolute;
        width: _vw(30);
        height: _vw(30);
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        img{
            width: 100%;
        }
    }
}
</style>
