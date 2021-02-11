<template>
    <div class="products" ref="products" @scroll="scroll">
        <van-nav-bar v-if="showBar" fixed z-index="2" class="topbar" title="商品详情" left-arrow @click-left="$back()">
            <div slot="title" class="title-1">
                <span :class="{active:mdDndex==0}" @click="锚点(1)">商品</span>
                <span :class="{active:mdDndex==1}" @click="锚点(2)">评价</span>
                <span :class="{active:mdDndex==2}" @click="锚点(3)">详情</span>
                <span :class="{active:mdDndex==3}" @click="锚点(4)">推荐</span>
            </div>
        </van-nav-bar>

        <div class="header">
            <span class="icon-left" @click="$back()">
                <van-icon name="arrow-left" />
            </span>
        </div>

        <div ref="md1"></div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in sp.image">
                <img :src="$img_url+item" alt srcset />
            </van-swipe-item>
        </van-swipe>

        <!-- 商品详情 -->
        <div class="box-1">
            <div class="jiage">₱{{sp.price | qian}}</div>
            <div class="title-1">{{sp.title}}</div>
            <div class="pinfen">
                <van-rate :value="5" size="14px" color="#ffd21e" />
            </div>
            <van-cell is-link class="规格" @click="showSku=true">
                <template slot="title">
                    <div class="t1">选择规格</div>
                </template>
                <template>
                    <div class="text">
                        <!-- 尺寸：L;颜色：红色 -->
                    </div>
                </template>
            </van-cell>
        </div>

        <div ref="md2" class="评价">
            <van-cell title="评价(0)" value="查看全部" is-link></van-cell>
            <ul class="list">
                <!-- <li v-for="item in 3">
                    <div class="title-1">
                        <span>qsdf**sdf - 2021-10-01 00:00</span>
                        <van-rate :value="5" size="14px" color="#ffd21e" />
                    </div>
                    <div class="text-1">还不错，质量挺好，做工精细，整体还不错还不错，质量挺好，做工精细，整体还不错还不错，质量挺好，做工精细，整体还不错还不错，质量挺好，做工精细，整体还不错</div>
                    <div class="imgList">
                        <img src="https://sg-test-11.slatic.net/other/roc/96cd42b0253362bbe966ceb0b27b438b.jpg" alt srcset />
                        <img src="https://sg-test-11.slatic.net/other/roc/96cd42b0253362bbe966ceb0b27b438b.jpg" alt srcset />
                    </div>
                </li> -->
                <van-empty description="暂无评论" />
            </ul>
        </div>

        <div ref="md3" class="介绍">
            <div class="title-1">产品介绍</div>
            <div class="cont" v-html="sp.details">
                
            </div>
        </div>

        <div ref="md4" class="推荐">
            <div class="title-1">猜你喜欢</div>
            <ul class="list">
                <li v-for="item in 推荐商品" @click="$router.replace('/products?id='+item.id)">
                    <div class="img-box">
                        <img :src="$img_url+item.cover" alt srcset />
                    </div>
                    <div class="title-2">{{item.title}}</div>
                    <div class="jiage">₱{{item.price | qian}}</div>
                </li>
            </ul>
        </div>

        <van-goods-action>
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="购物车.length==0 ? '' : 购物车.length" @click="$router.push('/cart')"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="showSku=true" />
            <van-goods-action-button type="danger" text="立即购买" @click="showSku=true" />
        </van-goods-action>

        <van-sku v-model="showSku" :sku="规格" :goods="缩略图" @buy-clicked="BuyClicked" @add-cart="AddCartClicked">
            <template #sku-header-price="props">
                <div class="van-sku__goods-price">
                    <span class="van-sku__price-symbol">₱ </span>
                    <span class="van-sku__price-num">{{ props.price }}</span>
                </div>
            </template>
        </van-sku>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            id:"",
            sp:{
                image:[],
            },
            推荐商品:[],

            showBar: false,     //显示顶部导航
            mdDndex: 0,         //顶部锚点
            showSku: false,     //显示选择规格
            // 选择规格
            缩略图: {
                // 默认商品 sku 缩略图
                picture: ''
            },
            // 用法参考 https://vant-contrib.gitee.io/vant/#/zh-CN/sku
            规格:{}
        }
    },
    filters:{
        qian(number){
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    computed:{
        ...mapState({
            购物车:"购物车"
        })
    },
    methods: {
        ...mapMutations({
            添加购物车:"添加购物车"
        }),
        BuyClicked(value) {
            console.log(value)

            // this.$router.push('/Checkout')
        },
        AddCartClicked(value) {
            console.log(value)
            let o = {
                sp:{
                    id:this.sp.id,
                    cover:this.sp.cover,
                    title:this.sp.title,
                },
                规格:{
                    color:value.selectedSkuComb.color,
                    size:value.selectedSkuComb.size,
                    price:value.selectedSkuComb.price/100  //
                },
                数量:value.selectedNum,
                checked:true
            }
            this.添加购物车(o)
            this.$toast('加入成功')
            this.showSku=false
            // this.$router.push('/cart')
        },
        scroll(e) {
            this.showBar = e.target.scrollTop > 50
            let topArr = []
            topArr.push(this.$refs.md1.getBoundingClientRect().top)
            topArr.push(this.$refs.md2.getBoundingClientRect().top)
            topArr.push(this.$refs.md3.getBoundingClientRect().top)
            topArr.push(this.$refs.md4.getBoundingClientRect().top)
            // console.log(topArr)
            var index = 0
            topArr.reduce(function (prev, curr, currentIndex) {
                if (Math.abs(curr - 0) < Math.abs(prev - 0)) {
                    index = currentIndex
                    return curr
                } else {
                    return prev
                }
            });
            this.mdDndex = index
            // console.log(index)
        },
        锚点(index) {
            this.$refs['md' + index].scrollIntoView({ behavior: "smooth", block: 'start' })
        },
        设置规格(){
            let color=this.sp.color
                color.forEach(item => {
                    item.id=item.name,
                    item.previewImgUrl=this.$img_url+item.previewImgUrl
                });
            let size = this.sp.size
                size.forEach(item=>{
                    item.id = item.name
                })
            let tree =[
                {
                    k:"颜色",
                    k_s:"color",
                    v:color
                },
                {
                    k:"尺寸",
                    k_s:'size',
                    v:size
                }
            ]
            let list = JSON.parse(JSON.stringify(this.sp.priceList))
                list.forEach(item=>{
                    item.price = item.price*100
                    item.stock_num = parseInt(item.stock_num)
                })
            this.规格 = {
                tree:tree,
                list:list,
                price:new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(this.sp.price) ,
                stock_num:this.sp.amount
            }
        },
        查询单个商品(){
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            this.$axios.post('/Goods/getGoodsById',{id:this.id}).then(res => {
                this.sp = res.data
                this.缩略图.picture =this.$img_url+this.sp.cover
                this.设置规格()
                this.$toast.clear();
            }).catch(err => {
            })
        },
        查询商品列表(){
            let q={
                page:1,
                size:6,
            }
            this.$axios.post('/Goods/getGoods',q).then(res => {
                this.推荐商品 = res.data.data
            }).catch(err => {
            })
        }
    },
    mounted() {
        // let offsetTopArr = []
        //     offsetTopArr.push(this.$ref.md1)
        // console.log(this.$refs.md2)
        // console.log(this.$refs.md2.getBoundingClientRect())
        // console.log(this.$refs.md2.getAttribute("class"))
        this.id = this.$route.query.id
        this.查询单个商品()
        this.查询商品列表()
    },
    watch:{
        '$route'(){
            this.id = this.$route.query.id
            this.查询单个商品()
            this.$refs.products.scrollTo({top:0})
        }
    }
}
</script>

<style lang="scss" scoped>
.products {
    height: 100%;
    overflow: auto;
    padding-bottom: 100px;
}
.topbar {
    .title-1 {
        display: flex;
        font-size: 14px;
        span {
            margin: 0px 10px;
            line-height: 44px;
        }
        .active {
            color: #f57224;
        }
    }
}
.header {
    height: 46px;
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    z-index: 1;
    .icon-left {
        margin: 0px 0px 0px 10px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background: rgba($color: #000000, $alpha: 0.4);
        font-size: 20px;
        border-radius: 100%;
    }
}
.my-swipe {
    height: 100vw;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.box-1 {
    .jiage {
        background: #fff;
        color: #f57224;
        font-size: 24px;
        font-weight: bold;
        padding: 8px 15px;
    }
    .title-1 {
        padding: 0px 15px;
        color: #212121;
        background: #fff;
    }
    .pinfen {
        padding: 8px 15px;
        background: #fff;
    }
    .规格 {
        margin: 10px 0px 0px;
        /deep/ .van-cell__title {
            flex: auto;
            flex-grow: 0;
            width: 85px;
            color: rgba($color: #000000, $alpha: 0.7);
        }
        /deep/ .van-cell__value {
            text-align: left;
            color: #000;
        }
    }
}

.评价 {
    margin: 10px 0px 0px;
    background: #fff;
    .list {
        padding: 0px 15px;
        li {
            border-bottom: 1px solid #e7e8ec;
        }
        .title-1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            height: 36px;
            color: rgba($color: #000000, $alpha: 0.7);
        }
        .text-1 {
            font-size: 14px;
            color: #191919;
        }
        .imgList {
            margin: 5px 0px 0px 0px;
            img {
                width: 40px;
                height: 40px;
                border: 1px solid #eee;
                object-fit: contain;
                margin: 0px 5px 5px 0px;
            }
        }
    }
}

.介绍 {
    margin: 10px 0px 0px;
    background: #fff;
    .title-1 {
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .cont {
        /deep/ img {
            max-width: 100%;
        }
    }
}

.推荐 {
    margin: 15px 0px 0px;
    background: #fff;
    .title-1 {
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 15px;
        justify-content: space-between;
        li {
            width: calc((100vw - 30px - 15px) / 3);
            margin: 0px 0px 10px;
        }
        .img-box {
            width: calc((100vw - 30px - 15px) / 3);
            height: calc((100vw - 30px - 15px) / 3);
            img {
                object-fit: contain;
                border-radius: 8px;
                width: 100%;
                height: 100%;
            }
        }
        .title-2 {
            margin: 4px 0 0;
            height: 34px;
            color: #333;
            font-size: 12px;
            font-weight: 400;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .jiage {
            color: #f57224;
        }
    }
}
</style>