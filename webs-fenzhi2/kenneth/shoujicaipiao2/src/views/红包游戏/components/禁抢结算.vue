
<template>
    <li class="item">
        <div class="img_box">
            <i class="icon iconfont icon-kefu"></i>
        </div>

        <div class="cont">
            <p class="title">
                <span>禁抢结算员</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <div class="msg">
                <ul class="文本">
                    <li>发包用户：【{{Content.Id.substring(0,2)+'***'+Content.Id.slice(-2)}}】</li>
                    <li>发包金额：【{{Content.Amount}}】</li>
                    <li>发包数量：【{{Content.Quantity}}】</li>
                    <li>红包玩法：【{{Content.GameName}}】</li>
                    <li>埋雷号码：【{{Content.Bomb}}】</li>
                    <li>中雷数量：【{{Content.bombCount}}】</li>
                    <li>红包赔率：【{{Content.Odds}}】</li>
                    <li>奖励金额：【{{Content.WinAmount}}】</li>
                </ul>
                <!-- <div class="文本" v-text="obj.Content"></div> -->
            </div>
        </div>
    </li>
</template>

<script>
import { mapState , mapMutations , mapActions} from "vuex";
export default {
    name:"",
    props:{
        obj:{
            default(){
                return {}
            }
        },
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config',
        }),
        Content(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return {}
            }
        },
    },
    methods: {
      
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
    .msg{
        display: flex;
    }
}
.文本{
    padding: _vw(5) _vw(10);
    font-size: _vw(14);
    background: #efeff4;
    max-width: _vw(250);
    border-radius: _vw(4);
    word-break: break-all;
    white-space: pre-wrap;
    position: relative;
    &::after{
        position: absolute;
        top: 0px;
        left: -7px;
        content: '';
        width: 0;
        height: 0;
        border: 8px solid transparent;
        // border-top: 12px solid #a0e759;
        border-top: 12px solid #efeff4;
    }
}
</style>


