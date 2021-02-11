<template>
    <div class="home">
        <van-sticky offset-top="0" @scroll="scroll">
            <div class="box-1" :class="{isFixed:isFixed}">
                <div class="sousuo" @click="$router.push('/search')">
                    <span class="search">
                        <van-icon name="search" />
                    </span>
                    <span class="text">Search in Lazada</span>
                </div>
            </div>
        </van-sticky>

        <div class="box-2">
            <van-swipe class="my-swipe" indicator-color="white">
                <van-swipe-item class="swiper-box" v-for="item in list1" @click="clickSw(item)">
                    <img :src="$img_url + item.content" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>

        <ul class="box-3">
            <li v-if="index<4" @click="$router.push('/productList?tid='+item.id)" v-for="(item,index) in typeList">
                <div>
                    <img :src="$img_url+item.cover" alt="" srcset="">
                </div>
                <span>{{item.title}}</span>
            </li>
            <li @click="$router.push('/typeList')">
                <div>
                    <img src="static/img/分类.png" alt="" srcset="">
                </div>
                <span>
                    更多分类
                </span>
            </li>
        </ul>

        <div class="box-4">
            <div class="title-1">新品上架</div>
            <ul class="list">
                <li class="item" v-for="item in sp" @click="$router.push('/products?id='+item.id)">
                    <div class="img-box">
                        <img :src="$img_url+item.cover" alt="" srcset="">
                    </div>
                    <div class="t1">
                        {{item.title}}
                    </div>
                    <div class="f">
                        <span>₱{{item.price | qian}}</span>
                        <span>99+人付款</span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- <div class="box-4">
            <div class="title-1">Just For You</div>
            <ul class="list">
                <li class="item" v-for="item in 6" @click="$router.push('/products')">
                    <div class="img-box">
                        <img src="https://my-test-11.slatic.net/p/333560fc5107ed3ff6fd2bff11b80afa.jpg_360x360q90.jpg" alt="" srcset="">
                    </div>
                    <div class="t1">
                        K姐自制【纸片人衬衫】韩国绒五色选小翻领纯色简约单排扣衬衫
                    </div>
                    <div class="f">
                        <span>₱99.00</span>
                        <span>99+人付款</span>
                    </div>
                </li>
            </ul>
        </div> -->



    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: '',
    components: {
    },
    data() {
        return {
            isFixed:false,
            sp:[],
            list1:[]
        }
    },
    computed:{
        ...mapState({
            typeList:'goodsType'
        })
    },
    filters:{
        qian(number){
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    methods: {
        ...mapActions({
            获取商品类型:"获取商品类型" 
        }),
        scroll(e){
            this.isFixed = e.isFixed
        },
        查询轮播图(){
            this.$axios.post('/Basic/get',{keyName:'h5Carousel'}).then(res => {
                if(res.code==1){
                    this.list1 = res.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        查询商品(){
            let q= {
                page: 1,
                size: 6,
                title: '',
                goodsType:""
            }
            this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
        // this.$toast.clear();
            this.$axios.post('/Goods/getGoods',q).then(res => {
                this.sp = res.data.data
                this.$toast.clear();
            }).catch(err => {
                this.$toast.clear();
                // console.error(err); 
            })
        },
        clickSw(item){
            console.log(item)
            if(item.url){
                if(item.url[0]=='/'){
                    this.$router.push(item.url)
                }else{
                    window.open(item.url)
                }
            }
        }
    },
    mounted() {
        this.查询轮播图()
        this.获取商品类型()
        this.查询商品()
    },
}
</script>

<style lang="scss" scoped>
.box-1 {
    &.isFixed{
        box-shadow: 0px 0px 5px 0px #8a8a8a;
        background-image: linear-gradient(to bottom,#fff,rgba(255,255,255,1));
    }
    padding: 10px;
    // background: #fff;
    background-image: linear-gradient(to bottom,#fff,rgba(255,255,255,0.5));
    // position: sticky;
    // top: 0px;
    // z-index: 1;
    // box-shadow: 0px 0px 5px 0px #8a8a8a;
    transition: all 2s;
    .sousuo {
        height: 35px;
        border: 1px solid #fe4960;
        border-radius: 5px;
        display: flex;
        align-items: center;
    }
    .search {
        background-color: #fe4960;
        background-image: linear-gradient(145deg, #f93782, #ff933f);
        width: 35px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 24px;
    }
    .text {
        color: #999;
        padding: 0px 0px 0px 10px;
    }
}

.box-2{
    padding: 0px 0px 10px;
    background: linear-gradient(to bottom,rgba(255,255,255,0.5),rgba(255,255,255,0));
    .my-swipe{
        width: ww(350);
        height: ww(120);
        margin: 0px auto;
        border-radius: 15px;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.box-3{
    display: flex;
    padding: 0px 10px;
    justify-content: space-between;
    text-align: center;
    font-size: 12px;
    color: #757575;
    li{
        width: 55px;
        div{
            margin: 0px 0px 4px;
            height: 55px;
            border-radius: 10px;
            background: #fff;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            }
        }
        &:not(:last-child){
            div{
                padding: 5px;
            }
        }

    }
}

.box-4{
    margin: 20px 0px 0px;
    .title-1{
        padding: 0px 10px 8px;
        font-size: 20px;
        color: #757575;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        padding: 0px 10px;
        justify-content: space-between;
        li{
            width: calc( (100vw - 30px) /2 );
            background: #fff;
            margin: 0px 0px 10px;
        }
        .img-box{
            height: calc( (100vw - 30px) /2 );
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .t1{
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
        .f{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 8px 8px;
            span:nth-child(1){
                color: #f57224;
            }
            span:nth-child(2){
                color: rgba($color: #000000, $alpha: 0.6);
                font-size: 12px;
            }
        }
    }
}


</style>
