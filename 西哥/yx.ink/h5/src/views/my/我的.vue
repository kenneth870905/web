<template>
    <div>
        <div class="box-1">
            <div class="box-1-1">
                <div class="toxuiang">
                    <img src="static/img/touxiang.jfif" alt srcset />
                </div>
                <div class="nicheng">
                    <div>{{userInfo.nickName ? userInfo.nickName : '昵称未设置'}}</div>
                    <div>{{userInfo.userName}}</div>
                </div>
                <div class="shezhi">
                    <van-icon name="setting-o" @click="$router.push('/setCenter')"/>
                </div>
            </div>
            <div class="box-1-2">
                <div @click="$router.push('/favorite')">
                    <div>{{收藏}}</div>
                    <div>收藏</div>
                </div>
                <div @click="$router.push('/footprint')">
                    <div>{{足迹}}</div>
                    <div>足迹</div>
                </div>
                <div @click="$router.push('/cart')">
                    <div>{{购物车.length}}</div>
                    <div>购物车</div>
                </div>
            </div>
        </div>

        <div class="box-2">
            <van-cell title="我的订单" value="查看全部订单" is-link to="/orderList"/>
            <ul class="list">
                <li @click="$router.push('/orderList?type=0')">
                    <van-icon class="icon-1" name="balance-list" />
                    <div>待付款</div>
                </li>
                <li @click="$router.push('/orderList?type=1')">
                    <van-icon class="icon-1" name="gift-card" />
                    <div>待发货</div>
                </li>
                <li  @click="$router.push('/orderList?type=2')">
                    <van-icon class="icon-1" name="todo-list" />
                    <div>待收货</div>
                </li>
                <li  @click="$router.push('/orderList?type=3')">
                    <van-icon class="icon-1" name="goods-collect" />
                    <div>已收货</div>
                </li>
            </ul>
        </div>

        <!-- <van-cell icon="smile-o" class="pingjia" to="/review" title="我的评价" is-link/> -->
        <van-cell icon="smile-o" class="pingjia" to="/goodsComment" title="我的评价" is-link/>
        
        <ul class="box-3">
            <li>
                <van-icon class="icon-1" name="map-marked" @click="$router.push('/addrList')"/>
                <div>收货地址</div>
            </li>
            <li>
                <van-icon class="icon-1" name="manager" @click="$router.push('/userInfo')"/>
                <div>个人资料</div>
            </li>
            <li>
                <van-icon class="icon-1" name="chat" @click="$router.push('/kefu')"/>
                <div>客服小蜜</div>
            </li>
        </ul>
        


        <div class="box-4">
            <!-- <div>
                联系方式
            </div>
            <ul>
                <li v-if="telegram">飞机：{{telegram.content}}</li>
                <li v-if="weixin">微信：{{weixin.content}}</li>
                <li v-if="phone">手机：{{phone.content}}</li>
                <li v-if="wechatQR">
                    微信二维码:
                    <img class="二维码" :src="$img_url+wechatQR.content" alt="" srcset="">
                </li>
            </ul>
            <br> -->
            <div>平台介绍</div>
            <ul>
                <li>1、衣尚致力于网上购物十多年，总部位于马来西亚最大的金融中心，服务质量和态度整个行业的佼佼者，得到消费者广泛好评</li>
                <li>2、如何付款？提交订单以后我们的客服会第一时间和您取得联系，可以使用微信、支付宝、银行转账、以及货到付款</li>
                <li>3、怎么退货和售后？点击可小蜜和我们的专业人员取得联系</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            收藏:0,
            足迹:0
        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo',
            购物车:"购物车",
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
        查询收藏(){
            this.$axios.post('/Favorite/getTotal','').then(res => {
                if(res.code==1)
                this.收藏 = res.data
            }).catch(err => {
                console.error(err); 
            })
        },
        查询足迹(){
            this.$axios.post('/Footprint/getCount','')
            .then(res => {
                if(res.code==1)
                this.足迹 = res.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.查询收藏()
        this.查询足迹()
    },
}
</script>

<style lang="scss" scoped>
.box-1 {
    background: linear-gradient(90deg, #fe9126, #ff5201);
    padding: 30px 15px 20px;
    color: #fff;
    .box-1-1 {
        display: flex;
        margin: 0px 0px 18px 0px;
        .toxuiang {
            height: 50px;
            width: 50px;
            flex-shrink: 0;
            margin: 0px 15px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .nicheng {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 14px;
        }
        .shezhi {
            font-size: 30px;
        }
    }
    .box-1-2 {
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-size: 14px;
        line-height: 28px;
    }
}

.box-2{
    background: #fff;
    margin: 10px 10px;
    border-radius: 10px;
    overflow: hidden;
    .list{
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-around;
        text-align: center;
        padding: 10px 0px;
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.6);
        .icon-1{
            font-size: 30px;
            color: #ff6e11;
        }
    }
}

.box-3{
    margin: 10px 10px 10px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.8);
    li{
        width: calc(100% / 3);
        text-align: center;
        padding: 20px 0px;
        &:nth-child(2){
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
        }
        .icon-1{
            font-size: 28px;
            color: #ff690f;
        }
    }
}

.pingjia{
    margin: 10px;
    width: auto;
    border-radius: 10px;
}
.box-4{
    margin: 30px 10px 20px;
    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.4);
    line-height: 22px;
    ul{
        padding: 0px 0px 0px 16px;
    }
    .二维码{
        width: 50%;
        display: block;
    }
}

</style>