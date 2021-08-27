<template>
    <div class="跟单">
        <div class="order-info">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell item">
                    <div class="img_box"><img :src="config.img_url+'static/image/home/caipiao/'+跟单彩票.obj.LotteryCode+'.png'"></div>
                    <div class="text_1">
                        <div>{{跟单彩票.obj.LotteryName}}</div>
                        <div>期号:{{跟单彩票.obj.IssueCode ? 跟单彩票.obj.IssueCode.substring(跟单彩票.obj.IssueCode.length-3) : ''}}期</div>
                    </div>
                    <div class="rt">封盘时间：<van-count-down :time="跟单彩票.obj.Timer*1000" @finish="finish" /></div>
                    <i @click="跟单彩票.show=false" class="关闭 icon iconfont icon-guanbi"></i>
                </li>
                <li class="mui-table-view-cell item">
                    <span>投注玩法</span>
                    <span class="name 红色">{{跟单彩票.obj.MethodName}}</span>
                </li>
                <li class="mui-table-view-cell item">
                    <span>投注内容</span>
                    <span class="name 红色">{{跟单彩票.obj.Content}}</span>
                </li>
                <li class="mui-table-view-cell item">
                    <span>投注注数</span>
                    <span class="name 红色">x{{跟单彩票.obj.Nums}}</span>
                </li>
                <li class="mui-table-view-cell item">
                    <span>总金额</span>
                    <span class="name 红色">{{ Math.round(跟单彩票.obj.Price*跟单彩票.obj.Nums * 100) / 100}}</span>
                </li>
                <li class="mui-table-view-cell item">
                    <span>当前余额</span>
                    <span class="name 余额">{{ userinfo.Money }}</span>
                </li>
                <li class="mui-table-view-cell">
                    <div>单注金额</div>
                    <ul class="item_1">
                        <li class="input_box">
                            <span>￥</span>
                            <input class="红色" @input="input1()" type="number" v-model.number="跟单彩票.obj.Price" />
                        </li>
                        <li :class="{结束:结束}" class="btn_1" @click="确认跟单()">跟单</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            结束:false,
            // 单注金额:0
        }
    },
    computed: {
        ...mapState({
            config:'config',
            跟单彩票: x => x.跟单.跟单彩票,
            userinfo:x=>x.user.userinfo
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中",
        }),
        ...mapActions({
            getUserInfo:'user/getUserInfo',
            确认跟单:"跟单/确认跟单"
        }),
        finish(){
            this.结束=true;
        },
        input1(){
            if(this.跟单彩票.obj.Price && this.跟单彩票.obj.Price<0){
                this.跟单彩票.obj.Price=0
            }else if(this.跟单彩票.obj.Price && this.跟单彩票.obj.Price>0){
                this.跟单彩票.obj.Price=parseInt(this.跟单彩票.obj.Price)
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.跟单{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: _vw(12);
    color: #4e4e4e;
    .order-info{
        max-height: 100%;
        overflow: auto;
        width: _vw(300);
        background: #ffffff;
        border-radius: _vw(10);
    }
    .红色{
        color: #fc7a11;
    }
    .余额{
        color: #0055f7
    }
    .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .img_box{
        width: _vw(32);
        height: _vw(32);
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        max-width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .text_1{
        flex-grow: 1;
    }
    .rt{
        flex-basis: 0;
        white-space: nowrap;
    }
    .关闭{
        flex-shrink: 0;
        margin: 0px 0px 0px _vw(10);
        color: #a9a9a9;
    }
    .item_1{
        margin: _vw(5) 0px 0px;
        display: flex;
        align-items: center;
        input{
            margin: 0px ;
            padding: 0px _vw(5);
            border: none;
            height: _vw(30);
        }
        .input_box{
            display: flex;
            align-items: center;
            font-size: _vw(18);
            border: 1px solid #ccc;
            color: #fc7a11;
            margin: 0px _vw(10) 0px 0px;
            padding: 0px _vw(5);
        }
        .btn_1{
            width: _vw(100);
            line-height: _vw(30);
            background: #fc7a11;
            color: #ffffff;
            flex-shrink: 0;
            text-align: center;
            &.结束{
                background: #7b7b7b;
            }
        }
    }
}

</style>
