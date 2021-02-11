<template>
    <div class="orderItem">
        <div class="title-1">
            <div>
                <div>订单号：<span class="color-1">{{order.orderNumber}}</span></div>
                <div class="time">{{order.creationTime}}</div>
            </div>
            <div class="color-1">{{type[order.type]}}</div>
        </div>
        <ul>
            <li class="order-item" v-for="item in order.orderInfo" v-if="order.orderInfo.length>0">
                <div class="img-box">
                    <img :src="$img_url+item.goodsInfo.cover" alt="" srcset="">
                </div>
                <div class="title-2">
                    <div>{{item.goodsInfo.title}}</div>
                    <div>{{item.specification.color}}；{{item.specification.size}}</div>
                    <div>₱{{item.specification.price | setMoney}}</div>
                </div>
                <div class="flex1 shuliang">
                    x{{item.number}}
                </div>
                <div class="flex1 jiage">₱ {{ item.number*item.specification.price | setMoney}}</div>
                <div class="flex1 pingjia">
                    <span class="btn-1" @click="pingjia()">评价</span>
                </div>
            </li>
            <li class="zongjia"  v-if="order.orderInfo.length>0">商品总价（不包含运费）<span>₱{{总价}}</span></li>
            <li class="异常"  v-if="order.orderInfo.length==0">商品信息异常</li>
            <li class="address">
                <div>收货信息：</div>
                <div>{{order.address.address}}（{{order.address.name}} 收）{{order.address.contact}}</div>
            </li>
            <li class="wuliu"  v-if="order.type==2 || order.type==3">物流：{{order.logistics}}</li>
        </ul>
    </div>
</template>

<script>
import { setMoney } from "@/assets/自定义函数.js";
export default {
    props:{
        order:{
            type:Object,
            default:()=>({})
        }
    },
    data() {
        return {
            // 0待付款1已付款或已支付定金待发货2已发货待收货，3已收货 -1订单异常或取消
            type:{
                0:'待付款',
                1:'待发货',
                2:"待收货",
                3:"已收货",
                '-1':'关闭/取消'
            }
        }
    },
    filters:{
        setMoney
    },
    computed:{
        总价(){
            let n = 0
            this.order.orderInfo.forEach(item => {
                n+= parseInt( Math.round(item.number* item.specification.price*100))/100 
            });
            return setMoney(n)
        }
    },
    methods: {
        pingjia(){
            this.正确('暂未开通此功能')
        }
    },
}
</script>

<style lang="scss" scoped>
.orderItem{
    background: #fff;
    margin: 0px 0px 15px;
}

.title-1{
    background: #fff;
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #dadada;
    .time{
        color: #757575;
        font-size: 12px;
    }
    .color-1{
        cursor: pointer;
        color: #1a9cb7;
        font-weight: 500;
    }
}

.order-item{
    padding: 24px 0px 24px 0px;
    margin: 0px 12px 0px 36px;
    display: flex;
    border-bottom: 1px solid #eee;
    .img-box{
        width: 80px;
        height: 80px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .title-2{
        width: 280px;
        flex-shrink: 0;
        margin: 0px 24px 0px 12px;
        font-size: 14px;
        color: #212121;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
    }
    .flex1{
        flex: 1;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shuliang{
        color: #bbb;
    }
    .pingjia{
        width: 150px;
    }
    .btn-1{
        display: inline-block;
        width: 60px;
        line-height: 24px;
        border-radius: 24px;
        border: 1px solid #adadad;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
    }
}
.异常{
    line-height: 100px;
    text-align: center;
}
.zongjia{
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    text-align: right;
    font-size: 14px;
    span{
        color: #f57224;
        font-weight: bold;
    }
}
.address{
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    word-break: break-all;
    div:nth-child(1){
        white-space: nowrap;
        flex-shrink: 0;
    }
}
.wuliu{
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: rgba($color: #000000, $alpha: 0.8);
}

</style>