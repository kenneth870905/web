<template>
    <div class="w1280">
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="'/productList?tid='+item.id" v-for="item in 面包销">{{item.title}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{sp.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div ref="锚点"></div>
        <el-row type="flex">
            <el-col :span="7">
                <div class>
                    <div class="datu">
                        <vue-photo-zoom-pro class="zoom-pro" :out-zoomer="true" v-if="大图" :url="$img_url + 大图"></vue-photo-zoom-pro>
                    </div>
                    <div class="lunbo">
                        <swiper ref="mySwiper" class="swiper" :options="swiperOptions"  @clickSlide="clickSwipr1">
                            <swiper-slide v-for="(item,index) in sp.image" :class="{active:大图index==index}">
                                <img :src="$img_url+item" alt srcset />
                            </swiper-slide>
                            <div v-show="sp.image && sp.image.length>4" class="swiper-button-prev" slot="button-prev"></div>
                            <div v-show="sp.image && sp.image.length>4" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
            </el-col>
            <el-col :span="13" class="r1">
                <div class="box-1">
                    <div class="title-1">{{sp.title}}</div>
                    <div class="item">
                        <div class="label">价格</div>
                        <div class="jiage">
                            ₱
                            <span v-if="!选中规格">{{sp.price | setMoney}}</span>
                            <span v-else>{{选中规格.price | setMoney}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">选择颜色</div>
                        <div class="yanse">
                            <span :class="{active:item==color}" v-for="item in sp.color" @click="选择规格(1,item)">{{item.name}}</span>
                            <!-- <span class="active">蓝色</span> -->
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">选择尺码</div>
                        <div class="size">
                            <!-- <span class="active">S</span> -->
                            <span :class="{active:item==size}" v-for="item in sp.size" @click="选择规格(2,item)">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">购买数量</div>
                        <div class="number">
                            <el-input-number size="large" :min="0" :max="选中规格.stock_num ? 选中规格.stock_num : sp.amount" v-model="购买数量"></el-input-number>
                            <span>件(库存{{选中规格 ? 选中规格.stock_num : sp.amount}}件)</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="btn-1" @click="购买(0)">立即购买</div>
                        <div class="btn-2" @click="购买(1)">加入购物车</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="box-2">
                    <div class="title-1">
                        <span>看了又看</span>
                    </div>
                    <ul class="list">
                        <li v-for="item in lookToLook" @click="$router.push('?id='+item.id)">
                            <div class="img-box">
                                <img :src="$img_url+item.cover" alt srcset />
                            </div>
                            <div class="t2">{{item.title}}</div>
                            <div class="jiage">₱{{item.price | setMoney}}</div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="box-3">
                    <div class="title-1">宝贝分类</div>
                    <ul class="list-1">
                        <li v-for="item in newType">
                            <div @click="$router.push(`productList?tid=${item.id}`)">{{item.title}}</div>
                            <div @click="$router.push(`productList?tid=${item.id}`)" v-for="item2 in item.children">{{item2.title}}</div>
                        </li>
                    </ul>
                    <div class="title-1">上架新品</div>
                    <ul class="list-2">
                        <li v-for="item in 新品" @click="$router.push('?id='+item.id)">
                            <div class="img-box">
                                <img :src="$img_url+item.cover" alt srcset />
                            </div>
                            <div class="t2">{{item.title}}</div>
                            <div class="jiage">₱{{item.price | setMoney}}</div>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="box-4">
                    <el-tabs class="tabs" value="0">
                        <el-tab-pane>
                            <span class="label" slot="label">商品详情</span>
                            <div v-html="sp.details"></div>
                        </el-tab-pane>
                        <el-tab-pane label="配置管理">
                            <span class="label" slot="label">累计评价</span>
                            <div class="title-1">商品评价</div>
                            <ul class="list-1">

                                <li v-for="item in 0">
                                    <div class="t1">
                                        <img src="static/img/peisong.jpg" alt />
                                        <span class="name">余***云 的评论：</span>
                                        <div class="time">2020-10-01</div>
                                    </div>
                                    <p class="comment">发货快的比较便宜，面料很舒服，手感不错，大小合适，穿身上很暖和，无色差，信赖京东，包退包换，服务一流。发货快，搞活动下单的，用优惠券买的比较便宜，面料很舒服，手感不错，大小合适，穿身上很暖和，无色差，信赖京东，包退包换，服务一流。</p>
                                    <div class="pic-list">
                                        <img src="//img30.360buyimg.com/n0/s48x48_jfs/t1/157376/30/1108/273739/5fef27dcE6edefd7b/a126403222fcf24a.jpg" />
                                        <img src="//img30.360buyimg.com/n0/s48x48_jfs/t1/160338/21/1080/321715/5fef27ddE3df7e691/8d8338955092bb62.jpg" />
                                    </div>
                                    <div class="f">
                                        <img src="static/img/点赞.png" alt srcset />
                                        0
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { toTreeData , setMoney } from "@/assets/自定义函数.js";
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
    },
    data() {
        return {
            id: "",
            sp:{},
            大图:'',
            大图index:0,
            color:'',
            size:'',
            

            lookToLook:[],      //看了有看
            新品:[],
            购买数量: 1,


            swiperOptions: {
                slidesPerView: 4,
                spaceBetween: 10,
                slideToClickedSlide: true,
                // centeredSlides : true,
                // centeredSlidesBounds: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slideToClickedSlide: true,
                // centeredSlides : true
            },
            
            
        }
    },
    computed: {
        ...mapState({
            userInfo:'userInfo',
            goodsType:"goodsType",
            立即购买:"立即购买",
            购物车:'购物车'
        }),
        newType(){
            let list = JSON.parse(JSON.stringify(this.goodsType))
            return this.goodsType ? toTreeData(list,0) : []
        },
        面包销(){
            let list = []
            if(this.sp.goodsType){
                let t1 = this.goodsType.find(x=>x.id==this.sp.goodsType)
                if(t1){
                    list.push(t1)
                    if(t1.parentId){
                        let t2 = this.goodsType.find(x=>x.id==t1.parentId)
                        if(t2) list.unshift(t2)
                    }
                }
            }
            return list
        },
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
        选中规格(){
            if(this.color && this.size){
                if(this.sp.priceList.find(x=>x.color==this.color.name && x.size==this.size.name)){
                    let o = this.sp.priceList.find(x=>x.color==this.color.name && x.size==this.size.name)
                        o.stock_num = parseInt(o.stock_num)
                    return o
                }else{
                    return ''
                }
            }else{
                return ''
            }
        },
    },
    filters:{
        setMoney
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        购买(type){
            if(!this.userInfo.id){
                this.错误('请先登录')
            }else if(!this.选中规格){
                this.错误('请选择规格')
            }else if(this.选中规格.stock_num<=0){
                this.错误('此规格库存不足')
            }else if(this.购买数量<=0){
                this.错误('请选择购买数量')
            }else{
                if(type==0){
                    this.立即购买.type=0
                    this.立即购买.list = []
                    let o = {sp:{},规格:{},数量:0}
                        o.sp.id = this.sp.id
                        o.sp.cover = this.sp.cover
                        o.sp.title = this.sp.title
                        o.规格 = this.选中规格
                        o.数量 = this.购买数量
                    this.立即购买.list.push(o)
                    this.setValue(['立即购买',this.立即购买]) 
                    this.$router.push('/buy')
                    
                }else{
                    let o = {sp:{},规格:{},数量:0}
                        o.sp.id = this.sp.id
                        o.sp.cover = this.sp.cover
                        o.sp.title = this.sp.title
                        o.规格 = this.选中规格
                        o.数量 = this.购买数量
                        o.gid=Math.random()
                    this.购物车.push(o)
                    this.setValue(['购物车',this.购物车]) 
                    this.$router.push('/cart')
                }
            }
        },
        选择规格(type,item){
            // type 1选颜色 2选尺寸
            if(type==1){
                this.color = item
                if(item.previewImgUrl){
                    this.大图 = item.previewImgUrl
                }else{
                    this.正确('该款未设置对应图片')
                    this.大图 = this.sp.image[this.大图index]
                }
            }else{
                this.size = item
            }
            if(this.选择规格 && this.购买数量>this.选中规格.stock_num){
                this.购买数量 = this.选中规格.stock_num
            }
        },
        //点击轮播图
        clickSwipr1(index){
            this.大图index = index
            this.大图 = this.sp.image[this.大图index]
        },
        click2(item){
            console.log(item)
        },
        加入购物车() {
            this.$message({
                showClose: true,
                message: '加入购物车成功',
                type: 'success'
            });
        },
        查询单个商品() {
            this.$Loading(1)
            this.$axios.post('/Goods/getGoodsById', { id: this.id }).then(res => {
                if (res.code == 1 && res.data) {
                    this.sp=res.data
                    if(this.sp.image.length>0){
                        this.大图 = this.sp.image[0]
                    }
                    this.查询相关商品()
                } else {
                    this.$alert('该商品已下架', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
                this.$Loading()
            }).catch(err => {
                console.error(err);
                this.$Loading()
            })
        },
        查询相关商品(){
            let q = {
                page:1,
                size:10,
                goodsType:this.sp.goodsType
            }
            this.$axios.post('/Goods/getGoods',q).then(res => {
                this.lookToLook = res.data.data
            }).catch(err => {})
        },
        查询新品(){
            let q = {
                page:1,
                size:10
            }
            this.$axios.post('/Goods/getGoods',q).then(res => {
                this.新品 = res.data.data
            }).catch(err => {})
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.查询单个商品()
        this.查询新品()
    },
    watch:{
        $route(){
            this.id = this.$route.query.id
            this.查询单个商品()
            this.查询新品()
        }
    }
}
</script>

<style lang="scss" scoped>
.datu {
    position: relative;
    height: 380px;
    border: 1px solid #eee;
    .zoom-pro {
        height: 100%;
    }
}
// 轮播
.lunbo {
    margin: 20px 0px;
    height: 85px;

    .swiper {
        height: 100%;
        width: 100%;
    }
    .swiper-slide {
        background: #eee;
    }
    .active {
        border: 2px solid #e53e41;
    }
    .swiper-button-prev {
        left: 0px;
        width: 15px;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.7);
        top: 0px;
        margin-top: 0px;
    }
    .swiper-button-next {
        right: 0px;
        width: 15px;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.7);
        top: 0px;
        margin-top: 0px;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 20px;
        color: #fff;
    }

    img {
        width: 100%;
        height: 100%;
        // object-fit: contain;
        object-fit: cover;
    }
}

.box-1 {
    padding: 0px 20px;
    .title-1 {
        margin: 20px 0px 50px;
        font-size: 30px;
        min-height: 80px;
    }
    .item {
        margin: 0px 0px 30px;
        display: flex;
        align-items: center;
        padding: 0px 0px 0px 20px;
        .label {
            flex-shrink: 0;
            width: 80px;
            color: #999;
            font-size: 12px;
        }
        .jiage {
            color: #f40;
            font-size: 20px;
            span {
                font-size: 30px;
            }
        }
        .yanse {
            span {
                display: inline-block;
                padding: 0px 13px;
                line-height: 34px;
                border: 1px dashed #898989;
                color: #888;
                font-size: 14px;
                cursor: pointer;
                margin: 0px 10px 0px 0px;
            }
            .active {
                color: #f40;
                border: 1px solid #f40;
            }
        }
        .size {
            span {
                display: inline-block;
                padding: 0px 13px;
                line-height: 34px;
                border: 1px dashed #898989;
                color: #888;
                font-size: 14px;
                cursor: pointer;
                margin: 0px 10px 0px 0px;
            }
            .active {
                color: #f40;
                border: 1px solid #f40;
            }
        }
        .number span {
            margin-left: 5px;
        }
        .btn-1 {
            width: 136px;
            line-height: 40px;
            font-size: 14px;
            color: #e5511d;
            border: 1px solid #f0cab6;
            background: #ffe4d0;
            text-align: center;
            margin-right: 20px;
            cursor: pointer;
        }
        .btn-2 {
            cursor: pointer;
            width: 136px;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            border: 1px solid #f40;
            background: #f40;
            text-align: center;
        }
    }
}

// 侧面商品样式
@mixin cmsp {
    padding: 20px 0px 0px;
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
    li {
        width: 150px;
        margin: 0px auto 30px;
        cursor: pointer;
        &:hover {
            .t2,
            .jiage {
                color: #ff4400;
            }
        }
    }
    .img-box {
        height: 150px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .t2 {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 5px 0px;
    }
    .jiage {
        font-size: 12px;
        text-align: center;
    }
}

.box-2 {
    height: 100%;
    border-left: 1px solid #eee;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    max-height: 550px;
    .title-1 {
        flex-shrink: 0;
        text-align: center;
        color: #999;
        font-size: 12px;
        position: relative;
        span {
            background: #fff;
        }
        &::after {
            position: absolute;
            width: 80%;
            height: 1px;
            background: #eee;
            left: 10%;
            top: 0px;
            bottom: 0px;
            margin: auto;
            content: "";
        }
    }
    .list {
        @include cmsp;
    }
}

.box-3 {
    .title-1 {
        padding: 10px;
        background-color: #f7f7f7;
        border: 1px solid #eee;
        color: #666;
        font-size: 14px;
    }
    .list-1 {
        margin: 0px 0px 20px;
        border: 1px solid #eee;
        border-top: none;
        font-size: 14px;
        line-height: 32px;
        color: #666;
        div:nth-child(1) {
            padding-left: 40px;
        }
        div:not(:nth-child(1)) {
            padding-left: 60px;
        }
        div {
            cursor: pointer;
            &:hover {
                background: #eee;
                color: #e4393c;
            }
        }
    }
    .list-2 {
        border: 1px solid #eee;
        @include cmsp;
    }
}

.box-4 {
    padding-left: 20px;
    .tabs {
        .label {
            padding: 0px 20px 0px 20px;
        }
        /deep/ .el-tabs__item {
            padding: 0px;
        }
        /deep/ .el-tabs__active-bar {
            background-color: #ff4400;
        }
        /deep/ .el-tabs__item.is-active {
            color: #ff4400;
        }
    }

    .title-1 {
        padding: 10px;
        background-color: #f7f7f7;
        border: 1px solid #eee;
        color: #666;
        font-size: 14px;
    }
    .list-1 {
        margin-top: 10px;
        li {
            border-bottom: 1px solid #eee;
            padding: 0px 0px 5px 0px;
        }
        .t1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 10px 0px;
            img {
                width: 25px;
                height: 25px;
                border-radius: 100%;
                margin: 0px 10px;
            }
            .time {
                flex: 1;
                text-align: right;
                color: #999;
                font-size: 12px;
            }
        }
        .comment {
            font-size: 14px;
            margin-top: 0px;
            padding: 0px 0px 0px 150px;
            line-height: 180%;
            color: #333;
        }
        .pic-list {
            padding: 0px 0px 0px 150px;
            img {
                width: 52px;
                height: 52px;
                border: 1px solid #eee;
                margin: 0px 10px 10px 0px;
                object-fit: contain;
            }
        }
        .f {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 12px;
            img {
                margin-right: 3px;
                width: 18px;
                cursor: pointer;
                vertical-align: middle;
                filter: brightness(0);
                opacity: 0.5;
                &:hover {
                    filter: brightness(1);
                    opacity: 1;
                }
            }
        }
    }
}
</style>