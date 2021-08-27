<template>
    <div>
        <div class="红包弹框">
            <div class="遮罩" @click="领取红包.领取弹框 = false"></div>
            <div class="content_1">
                <img class="bg" :src="config.img_url + 'static/image/liaotian/bg1.png'" alt="" srcset="">
                <div class="content_2">
                    <div class="header_1">
                        <div class="头像">
                            <img v-if="领取红包.红包.ImgId" :src="`${config.img_url}static/image/touxiang/${领取红包.红包.ImgId}`" alt="">
                            <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="">
                        </div>
                        <div class="title_1">
                            <span>{{领取红包.红包.Nickname ? 领取红包.红包.Nickname : 领取红包.红包.MemberId}}</span>
                        </div>
                        <div class="text_1" v-if="领取红包.状态.msg">
                            {{红包详情.Note ? 红包详情.Note : '什么也没说'}}
                        </div>
                        <div class="text_1" v-else>
                            手慢了，红包已领完
                        </div>
                    </div>
                    <div class="tishi_2" v-if="领取红包.状态.msg">快速点击拼手速</div>
                    <div class="btn_1" v-if="领取红包.状态.msg" @click="领取()" :class="{'active':旋转}">
                        <img class="vbl" :src="config.img_url + 'static/image/liaotian/bg3.png'" alt="" srcset="">
                        <img class="hid" :src="config.img_url + 'static/image/liaotian/bg4.png'" alt="" srcset="">
                    </div>
                    <div class="btn_1" v-else></div>
                    <div class="tishi">
                        <span @click="查看手气()">
                            查看大家的手气
                        </span>
                        <i class="icon iconfont icon-xiangyou"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_领取群红包 } from "@/api/红包接口.js";
import { mapState, mapActions } from "vuex";
export default {
    name:"",
    data() {
        return {
            旋转:false
        }
    },
    computed: {
        ...mapState({
            config:'config',
            领取红包:x=>x.聊天室.领取红包
        }),
        红包详情(){
            try {
                return JSON.parse(this.领取红包.红包.Content)
            } catch (error) {
                return {};
            }
        }
    },
    methods: {
        查看手气(){
            this.$router.push(`/hbxq?b=${this.红包详情.bonusId}`)
            this.领取红包.领取弹框=false;
        },
        async 领取(){
            // this.旋转 = true;
            //等待一秒
            // await new Promise((resolve, reject) => setTimeout(() => resolve() ,1000) )
            var q = {
                    bonusId:this.红包详情.bonusId
                }
            try {
                var r = await api_领取群红包(q)         
            } catch (error) {
                this.$toast('系统错误，稍后再试')
                // this.旋转 = false;
                return
            }
            console.log(r)
            if(r.data.code!=0){
                if(r.data.msg == '提交请求过快'){
                    return
                }else if(r.data.msg == '已领取'){
                    this.领取红包.领取弹框=false;
                    this.$router.push(`/hbxq?b=${this.红包详情.bonusId}`)
                }
                this.$toast(r.data.msg);
                // this.旋转 = false;
                return
            }
            this.领取红包.领取弹框=false;
            this.$router.push(`/hbxq?b=${this.红包详情.bonusId}`)
            // console.log(r);
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.红包弹框{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 21;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ebcd99;
    .遮罩{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0,0,0,0.3);
    }
    .content_1{
        position: relative;
        z-index: 1;
        width: _vw(300);
        height: _vw(490);
        background: #e52600;
        border-radius: 15px;
        overflow: hidden;
        .bg{
            width: 100%;
            position: absolute;
            left: 0px;
            bottom: -20px;
        }
    }
    .content_2{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }
    .头像{
        margin: _vw(70) 0px 0px;
        img{
            width: _vw(50);
            height: _vw(50);
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .tishi_2{
        font-size: _vw(13);
        color: #ebcd99;
        margin: 0px 0px _vw(8);
    }
    .header_1{
        // height: _vw(280);
        height: _vw(260);
    }
    .title_1{
        font-size: _vw(14);
    }
    .text_1{
        font-size: 26px;
        text-align: center;
        margin: 10px 0px ;
    }
    .btn_1{
        margin: 0px auto _vw(20);
        width: _vw(80);
        height: _vw(80);
        transform-style: preserve-3d;
        // transform: rotateY(180deg);
        img{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            background: #e52600;
            border-radius: 100%;
            width: 100%;
            animation: fangda 0.5s linear infinite;
        }
        .vbl{backface-visibility:visible;}
        .hid{backface-visibility:hidden;}
        &.active{
            // transition: all 2s;
            transition-property: all;
            transition-duration: 2s;
            transition-timing-function: cubic-bezier(0.57, 0.18, 0.49, 0.76);
            transition-delay: 0s;
            // 4圈
            transform: rotateY(1440deg);
            // animation: xuanzhuan 1s linear infinite;
        }
        
    }
    .tishi{
        font-size: _vw(12);
    }
}
@keyframes fangda {
    0%{
        transform: scale(1);
    }50% {
        transform: scale(1.1);
    }100%{
        transform: scale(1);
    }
}

// @keyframes ani-visible{
//  from{transform:rotatey(0);}
//  to{transform:rotatey(360deg);}
// }

</style>