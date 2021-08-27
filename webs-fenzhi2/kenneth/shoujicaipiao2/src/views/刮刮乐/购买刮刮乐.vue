<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">刮刮乐</h1>
            <button @click="$router.push('/guaguale/orders')" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">历史</button>
        </header>
        <div class="mui-content">
            <ul class="购买列表">
                <li @click="buy=true;buyType=1"><img :src="config.img_url+'static/image/guaguale/bg_1.jpg'" /></li>
                <li @click="buy=true;buyType=2"><img :src="config.img_url+'static/image/guaguale/bg_2.jpg'" /></li>
            </ul>
            <ul class="统计">
                <li>未刮张数(<span class="text_1">{{TotalCount}}</span>)</li>
                <li class="text_1">余额:{{userinfo.Money}}</li>
            </ul>

            <!-- <iframe v-if="src" :src="src" frameborder="0"></iframe> -->

            <div class="购买" v-if="buy">
                <div class="img_box">
                    <img v-if="buyType==1" :src="config.img_url+'static/image/guaguale/bg_3.jpg'" />
                    <img v-if="buyType==2" :src="config.img_url+'static/image/guaguale/bg_4.jpg'" />
                </div>
                <div class="mui-card-content-inner mui-row">
                    <div class="mui-col-xs-6">
                        面值：<span class="红色">{{danjia}}</span> 元
                    </div>
                    <div class="mui-col-xs-6">
                        加倍:<input type="tel" class="倍数" v-model="multiple">倍
                    </div>
                    <div class="mui-col-xs-12">
                        数量:<input type="tel" v-model="nums">张
                    </div>
                </div>
                <div class="footer">
                    <div class="蓝色" @click="购买()">购买</div>
                    <div class="mui-text-center 蓝色" @click="$router.push('/guaguale/gz/'+buyType)">玩法规则</div>
                    <div @click="buy=false" class="mui-text-right 红色">取消</div>
                </div>
            </div>

            <ul v-if="!buy" class="list">
                <li v-for="(item, index) in list" :key="index" @click="$router.push('/guaguale/open/'+item.Type+'/'+item.Id)">
                    <div class="img_box">
                        <div class="编号">{{item.Id}}</div>
                        <img v-if="item.Type==1" :src="config.img_url+'static/image/guaguale/bg_3.jpg'" />
                        <img v-if="item.Type==2" :src="config.img_url+'static/image/guaguale/bg_4.jpg'" />
                    </div>
                    <div class="footer_1">
                        <div class="mui-text-left">金额:<span class="text_1">{{item.Price}}</span></div>
                        <div class="mui-text-center">加倍:<span class="text_1">{{item.Multiple}}</span></div>
                        <div class="mui-text-right  text_1">开始刮奖</div>
                    </div>
                </li>
            </ul>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import { api_获取刮刮乐剩余 , api_购买刮刮乐} from "@/api/刮刮乐.js";
import { mapState, mapMutations } from 'vuex';
export default {
    name: "",
    data() {
        return {
            list: [],
            TotalCount: 0,
            src: "",

            buy:false,
            buyType:1,
            multiple:1,
            nums:1
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo: x => x.user.userinfo
        }),
        danjia(){
            if(this.buyType==1){
                return 1
            }else{
                return 10
            }
        }

    },
    methods: {
        ...mapMutations({
            加载中: "加载中"
        }),
        购买(){
            if(!this.multiple || this.multiple<0){
                this.$toast('请输入倍数');
                return
            }else if(!this.nums || this.nums<0){
                this.$toast('请输入张数');
                return
            }
            var obj={
                    type:this.buyType,
                    multiple:this.multiple,
                    nums:this.nums
                }
            this.加载中(true)
            api_购买刮刮乐(obj).then(x=>{
                if(x.data.code==0){
                    this.$toast('购买成功');
                    this.获取剩余刮刮乐();
                    this.buy=false;
                }else{
                    this.$toast(x.data.msg);
                    this.加载中(false)
                }
            }).catch(err=>{
                this.加载中(false)
                this.$toast('系统错误，稍后再试');
            })
        },
        获取剩余刮刮乐(){
            this.加载中(true)
            api_获取刮刮乐剩余().then(x => {
                this.TotalCount = x.data.TotalCount;
                this.list = x.data.Orders
                this.加载中(false)
            }).catch(err => {
                this.$toast('系统错误，稍后再试！')
                this.加载中(false);
            })
        }
    },
    mounted() {
        // mui.alert('功能更新升级中，敬请期待！','提示','确定',()=>{
        //     this.$router.push('/')
        // });

        this.获取剩余刮刮乐()

    },
    watch: {
        $route(){
            this.获取剩余刮刮乐();
        }
    },
}
</script>

<style lang="scss" scoped>
.购买列表 {
    display: flex;
    > li {
        width: 50%;
        padding: _vw(8);
        img {
            width: 100%;
            border-radius: _vw(5);
        }
    }
}
.统计 {
    padding: _vw(10) _vw(10);
    display: flex;
    justify-content: space-between;
    font-size: _vw(14);
    .text_1 {
        @include textcolor;
    }
}
.list {
    li {
        margin: _vw(10);
        background: #ffffff;
        box-shadow: 1px 3px 2px 0px #d6d6d6;
        .img_box{
            position: relative;
            .编号{
                position: absolute;
                top: 0px;
                right: 0px;
                padding: _vw(2) _vw(5);
                background: rgba(0,0,0,0.6);
                color: #ffffff;
                font-size: _vw(12);
            }
        }
    }
    img {
        width: 100%;
    }
    .footer_1 {
        padding: _vw(10);
        font-size: _vw(14);
        display: flex;
        div {
            width: calc(100% / 3);
        }
        .text_1 {
            @include textcolor;
        }
    }
}

.购买{
    font-size: _vw(14);
    margin: _vw(10);
    background: #ffffff;
    .img_box{
        img{
            width: 100%;
        }
    }
    input{
        width: _vw(50);
        padding: 0px;
        margin: 0px;
        text-align: center;
        height: auto;
        margin: 0px _vw(3);
        &.倍数{
            border: 1px solid $color;
        }
    }
    .footer{
        border-top: 1px solid #cccccc;
        display: flex;
        padding: _vw(10);
        div{
            width: calc(100% / 3);
        }
        .蓝色{
            color: #007aff;
        }
        .红色{
            color: $color;
        }
    }
}
</style>
