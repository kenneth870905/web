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
                        <vue-photo-zoom-pro class="zoom-pro" :out-zoomer="true" v-if="大图" :url="encodeURI($img_url + 大图)"></vue-photo-zoom-pro>
                        <!-- <vue-photo-zoom-pro class="zoom-pro" :out-zoomer="true" v-if="大图" url="http://110.34.166.141/yiku/yx-serve/runtime/storage/image/20210213/0.11452600%201613227445.jpeg"></vue-photo-zoom-pro> -->
                    </div>
                    <div class="lunbo">
                        <swiper ref="mySwiper" class="swiper" :options="swiperOptions" @clickSlide="clickSwipr1">
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
                        <div class="label">选择规格</div>
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
                    <div class="item footprint">
                        <i :class="{active:收藏}" @click="点击收藏()" class="icon-1 el-icon-star-on"></i>
                        加入收藏
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
                    <el-tabs class="tabs" value="xq" @tab-click="changeTabs">
                        <el-tab-pane name="xq">
                            <span class="label" slot="label">商品详情</span>
                            <div v-html="sp.details"></div>
                        </el-tab-pane>
                        <el-tab-pane name="pj">
                            <span class="label" slot="label">累计评价</span>
                            <div class="title-1">商品评价</div>
                            <nodata v-if="评价total==0"/>
                            <ul class="list-1" v-loading="评价Loading">
                                <li v-for="item in 评价list">
                                    <div class="t1">
                                        <img src="static/img/peisong.jpg" alt />
                                        <span class="name">
                                            <span v-if="item.nickName">{{item.nickName | name}}</span>
                                            <span v-else>{{item.userName | name}}</span>
                                            的评价：
                                        </span>
                                        <el-rate v-model="item.number" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                                        <div class="time">{{item.creationTime}}</div>
                                    </div>
                                    <p class="comment">{{item.text}}</p>
                                    <div class="pic-list">
                                        <el-image v-for="item2 in item.image" fit="contain " style="margin: 0px 10px 10px 0px;background:#eee;width: 50px; height: 50px" :src="$img_url+item2" :preview-src-list="srcList(item.image)"></el-image>
                                    </div>
                                    <div v-for="item2 in item.huifu"  class="回复">
                                        <span>[商家回复]</span>{{item2.text}}
                                    </div>
                                </li>
                            </ul>

                            <el-pagination class="pagination" v-if="评价total>0" @current-change="pjfenye" :total="评价total" :page-size="评价query.size" :current-page="评价query.page" layout="prev, pager, next" background></el-pagination>
                            
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { toTreeData, setMoney } from "@/assets/自定义函数.js";
import { mapMutations, mapState } from 'vuex'
import nodata from '@/components/nodata.vue'

export default {
    components: {
        nodata
    },
    data() {
        return {
            id: "",
            sp: {},
            大图: '',
            大图index: 0,
            color: '',
            size: '',


            lookToLook: [],      //看了有看
            新品: [],
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
            收藏: "",
            评价query: {
                page: 1,
                size: 10,
                goodsId:'',
                type:1
            },
            评价list: [],
            评价total: -1,
            评价Loading: false

        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo',
            goodsType: "goodsType",
            立即购买: "立即购买",
            购物车: '购物车'
        }),
        newType() {
            let list = JSON.parse(JSON.stringify(this.goodsType))
            return this.goodsType ? toTreeData(list, 0) : []
        },
        面包销() {
            let list = []
            if (this.sp.goodsType) {
                let t1 = this.goodsType.find(x => x.id == this.sp.goodsType)
                if (t1) {
                    list.push(t1)
                    if (t1.parentId) {
                        let t2 = this.goodsType.find(x => x.id == t1.parentId)
                        if (t2) list.unshift(t2)
                    }
                }
            }
            return list
        },
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
        选中规格() {
            if (this.color && this.size) {
                if (this.sp.priceList.find(x => x.color == this.color.name && x.size == this.size.name)) {
                    let o = this.sp.priceList.find(x => x.color == this.color.name && x.size == this.size.name)
                    o.stock_num = parseInt(o.stock_num)
                    return o
                } else {
                    return ''
                }
            } else {
                return ''
            }
        },
    },
    filters: {
        setMoney,
        name(name) {
            if (!name) return name
            return name.substring(0, 4) + '***'
        }
    },
    methods: {
        ...mapMutations({
            setValue: "setValue"
        }),
        // 查看评论大图列表
        srcList(list){
            let L = []
            list.forEach(x => {
               L.push(this.$img_url+x) 
            });
            return L;
        },
        购买(type) {
            if (!this.userInfo.id) {
                this.错误('请先登录')
            } else if (!this.选中规格) {
                this.错误('请选择规格')
            } else if (this.选中规格.stock_num <= 0) {
                this.错误('此规格库存不足')
            } else if (this.购买数量 <= 0) {
                this.错误('请选择购买数量')
            } else {
                if (type == 0) {
                    this.立即购买.type = 0
                    this.立即购买.list = []
                    let o = { sp: {}, 规格: {}, 数量: 0 }
                    o.sp.id = this.sp.id
                    o.sp.cover = this.sp.cover
                    o.sp.title = this.sp.title
                    o.规格 = this.选中规格
                    o.数量 = this.购买数量
                    this.立即购买.list.push(o)
                    this.setValue(['立即购买', this.立即购买])
                    this.$router.push('/buy')

                } else {
                    let o = { sp: {}, 规格: {}, 数量: 0 }
                    o.sp.id = this.sp.id
                    o.sp.cover = this.sp.cover
                    o.sp.title = this.sp.title
                    o.规格 = this.选中规格
                    o.数量 = this.购买数量
                    o.gid = Math.random()
                    this.购物车.push(o)
                    this.setValue(['购物车', this.购物车])
                    this.$router.push('/cart')
                }
            }
        },
        选择规格(type, item) {
            // type 1选颜色 2选尺寸
            if (type == 1) {
                this.color = item
                if (item.previewImgUrl) {
                    this.大图 = item.previewImgUrl
                } else {
                    this.正确('该款未设置对应图片')
                    this.大图 = this.sp.image[this.大图index]
                }
            } else {
                this.size = item
            }
            if (this.选择规格 && this.购买数量 > this.选中规格.stock_num) {
                this.购买数量 = this.选中规格.stock_num
            }
        },
        //点击轮播图
        clickSwipr1(index) {
            this.大图index = index
            this.大图 = this.sp.image[this.大图index]
        },
        click2(item) {
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
                    this.sp = res.data
                    if (this.sp.image.length > 0) {
                        this.大图 = this.sp.image[0]
                    }
                    this.查询相关商品()
                } else {
                    this.$alert('该商品已下架', '提示', {
                        confirmButtonText: '确定',
                        callback: action => { }
                    })
                }
                this.$Loading()
            }).catch(err => {
                console.error(err);
                this.$Loading()
            })
        },
        查询相关商品() {
            let q = {
                page: 1,
                size: 10,
                goodsType: this.sp.goodsType
            }
            this.$axios.post('/Goods/getGoods', q).then(res => {
                this.lookToLook = res.data.data
            }).catch(err => { })
        },
        查询新品() {
            let q = {
                page: 1,
                size: 10
            }
            this.$axios.post('/Goods/getGoods', q).then(res => {
                this.新品 = res.data.data
            }).catch(err => { })
        },
        changeTabs(e) {
            if (e.name == "pj" && !this.评价Loading) {
                this.查询评价()
            }
        },
        pjfenye(i){
            this.评价query.page=i
            this.查询评价()
        },
        查询评价() {
            this.评价Loading = true
            this.评价query.goodsId = this.id
            this.$axios.post('/Translation/getByGoodsId', this.评价query).then(res => {
                if (res.code == 1) {
                    this.评价list = res.data.data
                    this.评价total = res.data.total
                } else {
                    this.评价total = 0
                }
                this.评价Loading = false
            }).catch(err => {
                this.评价total = 0
                this.评价Loading = false
            })
        },
        查询收藏() {
            this.$axios.post('/Favorite/getOne', { goodsId: this.id })
                .then(res => {
                    if (res.code == 1) {
                        this.收藏 = res.data
                    } else {
                        this.收藏 = ''
                    }
                })
                .catch(err => {
                    this.收藏 = ''
                })
        },
        点击收藏() {
            if (!this.userInfo.id) {
                this.错误('请先登录')
                return
            }
            this.收藏 = {
                userId: this.userInfo.id,
                goodsId: this.id
            }
            this.$Loading(1)
            this.$axios.post('/Favorite/save', this.收藏).then(res => {
                this.$Loading()
                if (res.code == 1) {
                    this.正确('设置成功')
                    this.查询收藏()
                } else {
                    this.错误('设置失败')
                }
            }).catch(err => {
                this.$Loading()
                this.错误('系统错误，请联系客服')
            })
        },
        添加足迹() {
            this.$axios.post('/Footprint/add', { goodsId: this.id }).then(res => {
            }).catch(err => {})
        },
        init() {
            this.id = this.$route.query.id
            this.查询单个商品()
            this.查询新品()
            // this.查询评价()
            if (this.userInfo.id) {
                this.查询收藏()
                this.添加足迹()
            }
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        $route() {
            this.init()
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination{
    text-align: right;
}
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
    .footprint {
        .icon-1 {
            font-size: 25px;
            cursor: pointer;
            &.active {
                color: #ff5000;
            }
        }
        font-size: 12px;
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
        min-height: 200px;
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
    }
    .回复{
        margin-left: 140px;
        font-size: 14px;
        color: #BD7F00;
        padding: 10px 10px 10px 10px;
        background: #f6f6f6;
        span{
            color: #AAA;
        }
    }
}
</style>