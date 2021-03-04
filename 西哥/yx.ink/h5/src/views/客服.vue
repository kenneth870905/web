<template>
    <div class="content">
        <van-nav-bar fixed title="7*24小时在线客服"></van-nav-bar>
        <div class="banner">
            <img src="static/img/kefu.png" alt=""> 
        </div>

        <div class="list">
            <van-cell v-if="telegram">
                <div class="item">
                    <img src="static/img/Telegram.png" alt="" srcset="">
                    <div class="cont">{{telegram.content}}</div>
                    <span @click="复制(telegram.content)">复制</span>
                </div>
            </van-cell>
            <van-cell v-if="weixin">
                <div class="item">
                    <img src="static/img/weixin.png" alt="" srcset="">
                    <div class="cont">{{weixin.content}}</div>
                    <span @click="复制(weixin.content)">复制</span>
                </div>
            </van-cell>
            <van-cell v-if="phone">
                <div class="item">
                    <img src="static/img/phone.png" alt="" srcset="">
                    <a href="aaa.com" class="cont">{{phone.content}}</a>
                    <span @click="复制(phone.content)">复制</span>
                </div>
            </van-cell>
        </div>
        
        <div class="二维码" v-if="wechatQR">
            <div class="title">微信二维码</div>
            <img :src="$img_url+wechatQR.content" alt="" srcset="">
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import VueClipboard from 'vue-clipboard2'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            basic:"basic"
        }),
        telegram(){
            return this.basic.find(x=>x.keyName=='telegram')
        },
        weixin(){
            return this.basic.find(x=>x.keyName=='weixin')
        },
        phone(){
            return this.basic.find(x=>x.keyName=='phone')
        },
        wechatQR(){
            return this.basic.find(x=>x.keyName=='wechatQR')
        },
    },
    methods: {
        复制(string){
            this.$copyText(string).then( e => {
                this.$toast('复制成功')
            }, function (e) {
                this.$toast('复制失败')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    padding-top: 46px;
}
.banner{
    padding: 10px;
    img{
        width: 100%;
    }
}
.list{
    margin: 10px;
    .van-cell{
        margin: 0px 0px 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .item{
        display: flex;
        img{
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }
        .cont{
            color: #000;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0px 10px;
        }
        span{
            flex-shrink: 0;
            color: #0008ff99;
        }
    }
}
.二维码{
    text-align: center;
    margin: 10px;
    .title{
        margin: 10px;
    }
    img{
        width: 100%;
    }
}
</style>