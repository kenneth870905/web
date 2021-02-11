<template>
    <div class="search"> 
        <div class="header">
            <van-icon name="arrow-left" class="icon-left" @click="$back()"/>
            <van-field class="input" v-model="query.title" placeholder="请输入用户名" clearable />
            <span @click="搜索()">搜索</span>
        </div>

        <div class="box-2">
            <van-dropdown-menu class="menu">
                <van-dropdown-item @change="chageOrder" v-model="query.order" :options="option2" />
            </van-dropdown-menu>
        </div>

        <ul class="list">
            <li class="item" v-for="item in list" @click="$router.push('/products?id='+item.id)">
                <div class="img-box">
                    <img :src="$img_url+item.cover" alt srcset />
                </div>
                <div class="t1">{{item.title}}</div>
                <div class="f">
                    <span>₱{{item.price | qian}}</span>
                    <span>99+人付款</span>
                </div>
            </li>
        </ul>

        <!-- <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
        <van-empty v-if="!loading && total==0" description="暂无数据" /> -->
        <!-- <van-loading size="24px" vertical type="spinner">加载中...</van-loading> -->

        <load :loading="loading" :total="total" :length="list.length" :reachBottom="reachBottom"/>
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
            loading:false,
            list:[],
            total:-1,
            option2: [
                { text: '默认排序', value: '' },
                { text: '时间倒序', value: 'creationTime ASC' },
                { text: '时间顺序', value: 'creationTime DESC' },
                { text: '价格倒序', value: 'price asc' },
                { text: '价格排序', value: 'price desc' }
            ],
            query:{
                page:0,
                size:6,
                title:"",
                // goodsType:"",
                order:""
            }
        }
    },
    filters:{
        qian(number){
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    methods: {
        reachBottom(){
            this.getList()
        },
        搜索(){
            this.query.page = 0
            this.loading=false
            this.total = -1
            this.list = []
            this.getList()
        },
        chageOrder(){
            this.query.page = 0
            this.loading=false
            this.total = -1
            this.list = []
            this.getList()
        },
        getList(){
            if(this.loading || (!this.loading && this.total!=-1 && this.total<=this.list.length)) return
            this.loading = true
            this.query.page++
            this.$axios.post('/Goods/getGoods',this.query).then(res => {
                console.log(res)
                if(res.code==1){
                    this.list = [...this.list , ...res.data.data]
                    this.total = res.data.total
                }
                this.loading = false
            }).catch(err => {
                this.loading = false 
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.search {
    padding: 46px 0px 0px;
    // height: 100%;
    // overflow: auto;
}

.header {
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 46px;
    display: flex;
    background: linear-gradient(90deg, #003e52 25%, #196a80 82%, #1a9cb7);
    align-items: center;
    .icon-left {
        padding: 0 16px;
        font-size: 16px;
        color: #1989fa;
        line-height: 46px;
    }
    .input {
        background: none;
        /deep/ .van-field__control {
            color: #fff;
        }
        &::after {
            display: none;
        }
    }
    span {
        color: #fff;
        white-space: nowrap;
        flex-shrink: 0;
        padding: 0px 10px;
    }
}

.box-2{
    // display: flex;
    background: #fff;
    .menu{
        width: 100px;
        /deep/ .van-dropdown-menu__bar{
            box-shadow: none;
        }
    }
}

.list {
    margin: 20px 0px 10px;
    display: flex;
    flex-wrap: wrap;
    padding: 0px 10px;
    justify-content: space-between;
    li {
        width: calc((100vw - 30px) / 2);
        background: #fff;
        margin: 0px 0px 10px;
    }
    .img-box {
        height: calc((100vw - 30px) / 2);
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .t1 {
        margin: 8px 0px;
        padding: 0px 8px;
        color: #404040;
        font-size: 12px;
        height: 32px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .f {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 8px 8px;
        span:nth-child(1) {
            color: #f57224;
        }
        span:nth-child(2) {
            color: rgba($color: #000000, $alpha: 0.6);
            font-size: 12px;
        }
    }
}
</style>