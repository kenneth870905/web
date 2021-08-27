<template>
    <div class="home">
        <!-- <div class="box-1">
            <div class="w1200 cont">
                <h1>全部现货、钱可以再赚、衣服下架就没有了</h1>
                <p>
                    本店标价为比索、支持支付宝、微信、美金、Gcash等
                    <br />招代理、一件代发、加入我们请联系客服
                </p>
                <p>马尼拉地区可预约配送、grab配送当天达、官方客服微信：FXKJ 0579</p>
            </div>
        </div> -->
        <div class="banner">
            <div class="w1280">
                <div class="swiper-box" ref="swiper">
                    <swiper class="swiper" :options="swiperOptions" @clickSlide="clickSw">
                        <swiper-slide v-for="item in list1">
                            <img :src="$img_url+item.content" alt srcset />
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
            </div>
        </div>
        

        <div class="box-2 w1200">
            <div class="title-1">精选分类</div>
            <ul class="list">
                <li v-if="index<10" v-for="(item,index) in goodsType" @click="$router.push('/productList?tid='+item.id)">
                    <div class="img">
                        <img :src="$img_url+item.cover" alt="" srcset="">
                    </div>
                    <div>
                        {{item.title}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="box-3 w1200">
            <div class="title-1">新品上架</div>
            <ul class="list">
                <li v-for="item in 新品" @click="$router.push('/detail?id='+item.id)">
                    <div class="img">
                        <img :src="$img_url + item.cover" alt="">
                    </div>
                    <div class="title-2">{{item.title}}</div>
                    <div class="jiage">
                        <span>₱</span>
                        {{item.price | setMoney}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="box-3 w1200">
            <div class="title-1">You may also like</div>
            <ul class="list">
                <li v-for="item in 随机商品" @click="$router.push('/detail?id='+item.id)">
                    <div class="img">
                        <img :src="$img_url+ item.cover" alt="">
                    </div>
                    <div class="title-2">{{item.title}}</div>
                    <div class="jiage">
                        <span>₱</span>
                        {{item.price | setMoney}}
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { setMoney } from "@/assets/自定义函数.js";
import { mapState } from 'vuex';
export default {
    name: '',
    inject:['setLeftMenu'],
    data() {
        return {
            swiperOptions: {
                // centeredSlides : true
                loop:true,
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            新品:[],
            随机商品:[],
            // list1:[],
        }
    },
    filters:{
        setMoney
    },
    computed:{
        ...mapState({
            goodsType:'goodsType',
            basic:'basic'
        }),
        list1(){
            return this.basic.filter(x=>x.keyName=='webCarousel')
        }
    },
    methods: {
        查询新品(){
            this.$axios.post('/Goods/getGoods',{page:1,size:5}).then(res => {
                if(res.code==1){
                    this.新品= res.data.data
                }
            }).catch(err => {
            })
        },
        获取随机商品(){
            this.$axios.post('/Goods/getRandomGoods',{size:10}).then(res => {
                if(res.code==1){
                    this.随机商品 = res.data
                }
            })
            .catch(err => {})
        },
        // 查询轮播图(){
        //     this.$axios.post('/Basic/get',{keyName:'webCarousel'}).then(res => {
        //         if(res.code==1){
        //             this.list1 = res.data
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err); 
        //     })
        // },
        clickSw(index,reallyIndex){
            if(this.list1[reallyIndex].url){
                if(this.list1[reallyIndex].url[0]=='/'){
                    this.$router.push(this.list1[reallyIndex].url)
                }else{
                    window.open(this.list1[reallyIndex].url)
                }
            }
        }
    },
    mounted() {
        // this.查询轮播图()
        this.查询新品()
        this.获取随机商品()

        let io = new IntersectionObserver(
            entries => {
                // console.log(entries)
                if(entries[0].isIntersecting){
                    this.setLeftMenu(true)
                }
            },{
                // root: document.querySelector('#scrollArea'),
                // rootMargin: '0px',
                threshold: 0
            }
        );
        io.observe(this.$refs.swiper);
    },
}
</script>

<style lang="scss" scoped>
.home{
    background: #f5f5f5;
    padding: 1px 0px;
}

.banner{
    background: #eff0f5;
    >div{
        padding-left: 200px;
    }
    .swiper-box{
        height: 100%;
        height: 344px;
    }
    .swiper{
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}


.box-1{
    background: url(~@/assets/img/hero.jpg);
    background-attachment:fixed;
    .cont{
        padding: 110px 0px;
        text-align: center;
        h1{
            font-weight: 300;
            font-size: 60px;
        }
        p{
            font-size: 17px;
        }
    }
}

.box-2{
    .title-1{
        font-size: 32px;
        text-align: center;
        margin: 60px 0px 20px;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        text-align: center;
        font-size: 14px;
        li{
            width: calc(100%/5);
            height: 150px;
            padding-top:16px;
            border-left: 1px solid #e2e2e2;
            border-bottom: 1px solid #e2e2e2;
            box-sizing: border-box;
            cursor: pointer;
            div{
                margin: 10px 12px 0;
            }
            &:hover{
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
            }
        }
        li:nth-child(5n+1){
            border-left: none;
        }
        .img{
            width: 80px;
            height: 80px;
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        
    }
}

.box-3{
    margin-bottom: 60px;
    .title-1{
        font-size: 32px;
        text-align: center;
        margin: 60px 0px 20px;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            width: 240px;
            background: #fff;
            padding-bottom: 10px;
            margin: 0px 0px 20px 0px;
            cursor: pointer;
            border: 1px solid transparent;
            &:hover{
                box-shadow: 0 4px 8px 0 rgba(0,0,0,.24);
                border: 1px solid rgba(250,80,0,.54);
            }
        }
        .img{
            height: 240px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title-2{
            height: 32px;
            margin: 8px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(0,0,0,.54);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.3;
        }
        .jiage{
            height: 20px;
            line-height: 20px;
            margin: 16px 8px 0;
            font-size: 18px;
            color: #FF5000;
            span{
                font-size: 12px;
            }
        }
    }
}



</style>
