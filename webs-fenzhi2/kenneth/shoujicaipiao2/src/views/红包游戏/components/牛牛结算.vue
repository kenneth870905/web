<template>
    <li class="item">
        <div class="img_box">
            <i class="icon iconfont icon-kefu"></i>
        </div>
        <div class="cont" @click="进入详情()">
            <p class="title">
                <span>牛牛结算员</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <div class="msg 牛牛结算">
                <div class="top1">
                    <img class="bg1" :src="`${config.img_url}static/image/hbgame/ic_cow_log.png`" alt="" srcset="">
                    <div class="输赢">
                        <img class="bg2" v-if="Content.PlayWin==0" :src="`${config.img_url}static/image/hbgame/ic_bank_win.png`" alt="通杀" srcset="">
                        <img class="bg2" v-if="Content.BankWin==0" :src="`${config.img_url}static/image/hbgame/ic_bank_fail.png`" alt="通配" srcset="">
                        <div class="f1">
                            <p>庄赢<span>{{Content.BankWin}}</span></p>
                            <p>闲赢<span>{{Content.PlayWin}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="f2">
                    <div class="img2">
                        <img v-if="Content.ImgId" :src="`${config.img_url}static/image/touxiang/${Content.ImgId}`" alt="" srcset="">
                        <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="" srcset="">
                    </div>
                    <div class="name">
                        <span>{{Content.Nickname}}</span>
                        <div class="庄">
                            <p>庄家</p>
                            <img class="牛" :src="`${config.img_url}static/image/hbgame/ic_cow_${Content.Niu}.png`" alt="" srcset="">
                        </div>
                    </div>
                    <div class="btn1">
                        详情
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    props:{
        obj:{
            default(){
                return {}
            }
        },
    },
    computed: {
        ...mapState({
            config:"config"
        }),
        Content(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return {}
            }
        },
    },
    data() {
        return {
            
        }
    },
    methods: {
        进入详情(){
            this.$router.push(`/hbGame/lqxq1?b=${this.Content.Id}&t=7`)
        }
    },
}
</script>

<style lang="scss" scoped>
.item{
    margin: _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(40);
        height: _vw(40);
        margin: 0px _vw(10) 0px _vw(10);
        font-size: _vw(40);
        color: #73a73f;
        border-radius: 100%;
        i{
            line-height: _vw(40);
            display: block;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
    .title{
        color: #656565;
        font-size: _vw(12);
        display: flex;
        align-items: center;
        margin-bottom: _vw(5);
        img{
            min-height: _vw(16);
        }
        span{
            margin: 0px _vw(3);
        }
    }
}
.牛牛结算{
    width: _vw(230);
    .top1{
        position: relative;
        font-size: 0;
        .bg1{
            width: 100%;
        }
        .输赢{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .bg2{
            position: absolute;
            top: 7px;
            left: 25px;
            width: _vw(60);
        }
        .f1{
            position: absolute;
            width: 100%;
            bottom: 5px;
            left: 0px;
            display: flex;
            justify-content: space-evenly;
            p{
                color: #fff;
                margin: 0px;
            }
            span{
                font-weight: bold;
                margin: 0px 3px 0px;
                color: #ff0;
            }
            &::after{
                position: absolute;
                left: 0px;
                right: 0px;
                top: 0px;
                margin: auto;
                width: 1px;
                height: 100%;
                background: #fff;
                content: '';
            }
        }
    }
    .f2{
        border-left: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background: #f3f3f3;
        display: flex;
        align-items: center;
        padding: 5px;
        .img2{
            width: _vw(40);
            height: _vw(40);
            margin: 0px _vw(10) 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .name{
            flex: 1;
            width: 0;
            margin: 0px 10px 0px 0px;
            span{
                display: block;
                font-size: _vw(12);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .庄{
                display: flex;
                align-items: center;
            }
            p{
                font-size: _vw(12);
                margin: 0px 10px 0px 0px;
                width: _vw(40);
                background: linear-gradient(45deg, #ff4d44, #ffbd51);
                color: #fff;
                text-align: center;
                line-height: _vw(20);
                border-radius: _vw(20);
            }
            .牛{
                width: _vw(15);
            }
        }
        .btn1{
            color: #555;
            font-size: _vw(12);
            display: flex;
            align-items: center;
        }
    }
}
</style>
