<template>
    <div class="orderList">
        <van-nav-bar fixed title="订单" left-arrow @click-left="$router.push('/my')"></van-nav-bar>
        <van-tabs v-model="query.type" @change="changeTabs">
            <van-tab name="" title="全部订单"></van-tab>
            <van-tab name="0" title="待付款"></van-tab>
            <van-tab name="1" title="待发货"></van-tab>
            <van-tab name="2" title="待收货"></van-tab>
            <van-tab name="3" title="已收货"></van-tab>
        </van-tabs>

        <div class="order-item" v-for="item in list">
            <div class="t1">
                <span class="time">{{item.creationTime}}</span>
                <span class="stats" :class="'type'+item.type">{{type[item.type].text}}</span>
            </div>
            <div v-if="item.orderInfo.length==0" class="商品异常">商品信息异常</div>
            <ul>
                <li class="sp" v-for="item2 in item.orderInfo" >
                    <div class="img-box" @click="$router.push('/products?id='+item2.goodsInfo.id)">
                        <img :src="$img_url+item2.goodsInfo.cover" alt srcset />
                    </div >
                    <div class="xiangqing" @click="$router.push('/products?id='+item2.goodsInfo.id)">
                        <div class="t2">{{item2.goodsInfo.title}}</div>
                        <div class="guige">{{item2.specification.color}};{{item2.specification.size}}</div>
                        <div class="jiage">₱{{item2.specification.price | qian}}</div>
                        <div class="number">x{{item2.number}}</div>
                    </div>
                    <div class="pingjia" v-if="item.type==3 && !item2.pingJia">
                        <div class="btn-1" @click="$router.push('/addPj?goodsId='+item2.goodsInfo.id+'&orderId='+item.id)">评价</div>
                    </div>
                </li>
            </ul>
            <div class="f3" v-if="(item.type==2 || item.type==3) && item.logistics ">
                物流：{{item.logistics}}
            </div>
            <div class="f1">
                <span>商品总价：₱{{总价(item)}}</span>
                <!-- <span>实付：₱90.00</span> -->
            </div>
            <div class="f2" v-if="item.type==2">
                <!-- <span>删除订单</span>
                <span>买了换钱</span> -->
                <span @click="确认收货(item)">确认收货</span>
            </div>
        </div>
        <load :loading="loading" :total="total" :length="list.length" :reachBottom="daoDi"/>
    </div>
</template>

<script>
import load from "@/components/load.vue";
export default {
    components:{
        load
    },
    data() {
        return {
            type:{
                0:{text:'待付款'},
                1:{text:'待发货'},
                2:{text:'待收货'},
                3:{text:"已收货"},
                '-1':{text:"异常或关闭"}
            },
            query: {
                page: 0,
                size: 5,
                type: '',    //0 待付款  1 已付款或已支付定金待发货  2已发货待收货 3已收货 -1订单异常或取消	
            },
            list:[],
            total:-1,
            loading:false,
            axios_source:""
        }
    },
    filters:{
        qian(number){
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    methods: {
        daoDi(){
            this.获取订单()
        },
        评价(){
            this.$toast('功能开发中')
        },
        确认收货(item){
            this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
        // this.$toast.clear();
            let o = Object.assign({},item)
                o.type = 3
            this.$axios.post('/Order/modifyOrder',o).then(res => {
                if(res.code==1){
                    item.type=3
                    this.$toast('设置成功')
                }else{
                    this.$toast('设置失败，请联系客服')
                }
            }).catch(err => {
                this.$toast('系统错误，请联系客服')
            })
        },
        总价(item){
            let n = 0 
            item.orderInfo.forEach(element => {
                n += Math.round(element.number*element.specification.price*100)/100
            });
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n)
        },
        changeTabs(){
            // if (typeof this.axios_source === 'function') {
                this.axios_source.cancel('终止请求'); //取消请求
            // }
            this.list = []
            this.query.page = 0
            this.loading = false
            this.total = -1
            this.获取订单()
        },
        获取订单() {
            if(this.loading || (this.total!=-1 && this.list.length>=this.total)){
                return
            }
            this.query.page++
            this.loading=true
            // this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
            var CancelToken = this.$axios.CancelToken;
            this.axios_source = CancelToken.source();
            this.$axios.post('/Order/getOrder', this.query,{cancelToken:this.axios_source.token}).then(res => {
                this.list = [...this.list,...res.data.data]
                this.total = res.data.total
                this.loading=false
                // this.$toast.clear();
            }).catch(err => {
                console.error(err);
                if(err.message!='终止请求'){
                    this.loading=false
                }
                // this.$toast.clear();
            })
        }
    },
    mounted() {
        this.query.type = this.$route.query.type ? this.$route.query.type : ''
        this.获取订单()
    },
}
</script>

<style lang="scss" scoped>
.orderList {
    padding: 46px 0px 0px;
}
.order-item {
    margin: 15px 10px 15px;
    background: #fff;
    border-radius: 10px;
    .t1 {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 15px;
        border-bottom: 1px solid #eee;
        .stats {
            font-size: 14px;
            color: #ff5000;
        }
        .time {
            color: #666;
            font-size: 12px;
        }
    }
    .商品异常{
        line-height: 100px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        color: rgba($color: #000000, $alpha: 0.6);
        text-align: center;
    }
    .sp {
        display: flex;
        padding: 12px 10px;
        border-bottom: 1px solid #eee;
        // margin: 12px 0px 12px;
        .img-box {
            width: 90px;
            height: 90px;
            flex-shrink: 0;
            margin: 0px 15px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .xiangqing {
            flex: 1;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .pingjia{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            .btn-1{
                font-size: 12px;
                border: 1px solid rgba($color: #000000, $alpha: 0.6);
                color: rgba($color: #000000, $alpha: 0.6);
                line-height: 22px;
                width: 50px;
                text-align: center;
                border-radius: 22px;
            }
        }
        .t2 {
            color: #333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .guige {
            color: rgb(153, 153, 153);
        }
        .jiage {
            font-weight: bold;
        }
    }
    .f1 {
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0px 15px;
        font-size: 12px;
        span{
            color: #333;
        }
        // span:nth-child(1) {
        //     color: rgb(153, 153, 153);
        // }
        // span:nth-child(2) {
        //     color: #333;
        // }
    }
    .f2 {
        padding: 5px 15px;
        text-align: right;
        border-top: 1px solid #eee;
        span {
            margin: 0px 0px 0px 10px;
            display: inline-block;
            width: 70px;
            line-height: 26px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 26px;
            border: 1px solid #666;
        }
    }
    .f3{
        padding: 5px 15px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
    }
}
</style>