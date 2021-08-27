<template>
    <div class="红包弹框">
        <div class="遮罩" @click="领取红包.弹框 = false"></div>
        <div class="content_1">
            <img class="bg" :src="config.img_url + 'static/image/liaotian/bg1.png'" alt="" srcset="">
            <div class="content_2">
                <div class="header_1">
                    <div class="头像">
                        <img v-if="领取红包.红包.ImgId" :src="`${config.img_url}static/image/touxiang/${领取红包.红包.ImgId}`" alt="">
                        <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="">
                    </div>
                    <div class="title_1">
                        {{领取红包.红包.Nickname ? 领取红包.红包.Nickname : 领取红包.红包.MemberId}}
                    </div>

                    <div v-show="领取红包.红包.Type==6">发了一个扫雷红包，金额随机</div>
                    <div v-show="领取红包.红包.Type==7">发了一个牛牛红包，金额随机</div>

                    <div class="text_1" v-if="领取红包.红包.Type==8">红包已截止</div>
                    <div class="text_1" v-else-if="领取红包.红包.Type==7 && 领取红包.状态.msg">恭喜发财，大吉大利</div>
                    <div class="text_1" v-else-if="领取红包.状态.msg">
                        {{红包详情.Note ? 红包详情.Note : '什么也没说'}}
                    </div>
                    <div class="text_1" v-else>手慢了，红包已领完</div>
                </div>
                <div class="btn_1" v-if="领取红包.状态.msg && 领取红包.红包.Type!=8" @click="领取()" :class="{'active':旋转}">
                    <img class="vbl" :src="config.img_url + 'static/image/liaotian/bg3.png'" />
                    <img class="hid" :src="config.img_url + 'static/image/liaotian/bg2.png'" />
                </div>
                <!-- 占位用的 -->
                <div class="btn_1" v-else></div>
                <div class="tishi" v-if="可查看手气">
                    <span @click="查看手气()">
                        查看大家的手气
                    </span>
                    <i class="icon iconfont icon-xiangyou"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_领取群红包 } from "@/api/红包接口.js";
import { api_参加游戏 ,api_领取牛牛 } from "@/api/红包游戏.js";
import { mapState } from "vuex";
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
            领取红包:x=>x.红包游戏.领取红包
        }),
        红包详情(){
            try {
                return JSON.parse(this.领取红包.红包.Content)
            } catch (error) {
                return {};
            }
        },
        可查看手气(){
            // 7 牛牛
            if(this.领取红包.红包.Type==5){
                return true
            }else if(this.领取红包.红包.Type==6 || this.领取红包.红包.Type==7){
                // 可以领取红包 并且还没有领取的不能提前查看
                if(this.领取红包.状态.code==0 && this.领取红包.状态.msg){
                    return false
                }else{
                    return true
                }
            }else if(this.领取红包.红包.Type==8){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        查看手气(){
            var id = ''
            if(this.领取红包.红包.Type==5){
                id = this.红包详情.bonusId
            }else if(this.领取红包.红包.Type==6 || this.领取红包.红包.Type==8 || this.领取红包.红包.Type==7){
                id = this.红包详情.Id
            }
            // 7 牛牛红包
            if(this.领取红包.红包.Type == 7){
                this.$router.push(`/hbGame/lqxq1?b=${id}&t=${this.领取红包.红包.Type}`)
            }else{
                this.$router.push(`/hbxq?b=${id}&t=${this.领取红包.红包.Type}`)
            }
            this.领取红包.弹框=false;
        },
        async 领取(){
            this.旋转 = true;
            //等待一秒
            await new Promise((resolve, reject) => setTimeout(() => resolve() ,1000) )
            var id=''
            // 领取普通红包
            if(this.领取红包.红包.Type==5){
                id = this.红包详情.bonusId
                try {
                    var r = await api_领取群红包({bonusId:id})
                } catch (error) {
                    this.$toast('系统错误，稍后再试')
                    this.旋转 = false;
                    return
                }
            }else if(this.领取红包.红包.Type==6){
                id = this.红包详情.Id
                try {
                    var r = await api_参加游戏({gameId:id})
                } catch (error) {
                    this.$toast('系统错误，稍后再试')
                    this.旋转 = false;
                    return
                }
            }else if(this.领取红包.红包.Type==7){
                id = this.红包详情.Id
                try {
                    var r = await api_领取牛牛({gameId:id})
                } catch (error) {
                    this.$toast('系统错误，稍后再试')
                    this.旋转 = false;
                    return
                }
            }
            
            if(r.data.code!=0){
                this.$toast(r.data.msg);
                this.旋转 = false;
                if(r.data.msg=='红包已领完'){
                    this.领取红包.状态.msg = false
                }
                return
            }
            this.领取红包.弹框=false;
            // 7牛牛
            if(this.领取红包.红包.Type == 7){
                this.$router.push(`/hbGame/lqxq1?b=${id}&t=${this.领取红包.红包.Type}`)
            }else{
                this.$router.push(`/hbxq?b=${id}&t=${this.领取红包.红包.Type}`)
            }
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
    .header_1{
        height: _vw(280);
    }
    .title_1{
        font-size: _vw(18);
        margin: 5px 0px;
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
// @keyframes xuanzhuan {
//     0%{
//         transform: rotateY(0deg);
//     }100% {
//         transform: rotateY(360deg);
//     }
// }

// @keyframes ani-visible{
//  from{transform:rotatey(0);}
//  to{transform:rotatey(360deg);}
// }

</style>
