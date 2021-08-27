<template>
<div class="top">
    <!-- :title="name" -->
    <topHeader :title="详情.name" />
    <div class="head">
        <div class="head-info">
            <div class="head-img">
                <img :src="详情.cover" alt="">
            </div>
            <div class="head-txt">
                <ul>
                    <li style="font-size:20px;">
                        {{详情.name}}
                        <span class="评分">
                            <b>6.5</b>
                        </span>
                    </li>
                    <li>
                        <label>标签：</label>
                        <span>{{详情.biaoQian}}</span>
                    </li>
                    <!-- <li>
                        <label>作者：</label>
                        <span>岛上</span>
                    </li> -->
                    <li>
                        <label>人气：</label>
                        <span style="color:yellow;">{{详情.renQi}}</span>
                    </li>
                    <!-- <li>
                        <label>月票：</label>
                        <span style="color:yellow;">11</span>
                    </li> -->
                </ul>
            </div>
        </div>
        <svg width="414" height="275" class="banner-svg" id="banner_svg">
            <defs>
                <filter id="f">
                    <!--  :xlink:href=""  -->
                    <feImage id="svg_feImage" :xlink:href="详情.cover" x="0" y="0" width="464" height="325" preserveAspectRatio="xMidYMid slice"></feImage>
                    <feGaussianBlur stdDeviation="30"></feGaussianBlur>
                </filter>
            </defs>
            <rect id="svg_rect" x="0" y="0" width="414" height="275" filter="url(#f)"></rect>
        </svg>
    </div>
    <div class="排行分类">
        <div @click="切换(1)" :class="{active:active == 1 }">详情</div>
        <div @click="切换(2)" :class="{active:active == 2 }">目录</div>
        <!-- <div @click="切换(3)" :class="{active:active == 3 }">评论</div> -->
    </div>
    <div class="detail">
        <div v-show="选择详情 == 1">
            <div class="detail-icon">
                <i class="van-icon van-icon-fire-o"></i>
            </div>
            <div class="detail-summary">
                <p>{{详情.jianJie}}</p>
            </div>
            <!-- <div class="mod-recommend3">
                <span>骚年们都在看：</span>
                <div class="推荐书单">
                    <div class="书单" v-for="(item,index) in 书单" :key="index">
                        <img :src="item.imgs" alt="">
                        <p>{{item.title}}</p>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div> -->
        </div>

        <div v-show="选择详情 == 2" style="width:100%">
            <div class="chapter">
                <ul>
                    <router-link  tag="li" :to="{path:'/comic',query:{id:item.id}}" v-for="(item,index) in 章节" :key="index">{{item.name}}</router-link>
                </ul>
                <router-link  tag="div"   class="加载更多" :to="{path:'/MoreCatalog',query:{id:this.$route.query.id}}">查看更多目录</router-link >
              
            </div>
        </div>
        <!-- <div v-show="选择详情 == 3" style="width:100%">
            <div class="评论" v-for="(item,index) in 评论" :key="index">

            </div>
        </div> -->
    </div>
</div>
</template>

<script>
import {
    api_文章详情
} from "@/api/api.js"
import { api_漫画章节 } from "@/api/api.js"
import topHeader from "@/components/header.vue"
export default {
    data() {
        return {
            active: "2",
            选择详情: "2",
            书单: [{
                    imgs: "images/210.jpg",
                    title: "妖怪名单",
                    content: "少年成功逆袭"
                },
                {
                    imgs: "images/212.jpg",
                    title: "妖怪名单",
                    content: "少年成功逆袭"
                }, {
                    imgs: "images/213.jpg",
                    title: "妖怪名单",
                    content: "少年成功逆袭"
                }
            ],
            id: "",
            详情: [],
            分类漫画详情:[],
            章节:[],
        }
    },
    components: {
        topHeader,
    },
    methods: {
        切换(index) {
            this.选择详情 = index;
            this.active = index;
        },
        文章详情() {
            var wzid = {
                id: this.$route.query.id
            }
            api_文章详情(wzid).then(x => {
                this.详情 = x.data
                console.log(this.详情)
            })
        },
        漫画章节(){
            var mhzj = {
                wenZhangId:this.$route.query.id
            }
            api_漫画章节(mhzj).then(x => {
                console.log(x.data);
                this.章节 = x.data.slice(0,9)
            })
        }
    },
    mounted() {
        this.文章详情();
        this.漫画章节();
    },
}
</script>

<style scoped>
* {
    background: none;
}

.active {
    border-bottom: 2px solid #ff9a6a;
    width: 20%;
}

.top {
    background: white;
    height: 100%;
}

.head {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.head-info {
    display: flex;
    position: absolute;
}

.head-img {
    width: 143px;
    height: 192px;
}

.head-img img {
    width: 100%;
    height: 100%;
}

.head-txt ul li {
    color: white;
    font-size: 0.6rem;
    margin: 0.4rem;
}

.评分 {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    background: #d97e5c;
    border-radius: 100%;
}

.排行分类 {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 2rem;
    border-top: 1px solid #f8f8f8;
    line-height: 2rem;
    margin-bottom: 10px;
}

.排行分类 div {
    width: 50%;
    text-align: center;
    background: white;
    font-size: 0.72rem;
    color: #969696;
}

.detail {
    display: flex;
    justify-content: center;
}

.detail-icon {
    text-align: center;
    margin: 10px;
}

.detail-summary {
    width: 90%;
    margin: 0 auto;
}

.detail-summary p {
    font-size: 0.6rem;
    color: #535252;
    line-height: 170%;
}

.推荐书单 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.书单 {
    width: 28%;
    height: 100%;
    margin-bottom: 10px;
}

.书单 p {
    font-size: 0.6133rem;
    text-align: center;
    background: white;
    margin-top: -5px;
}

.书单 img {
    width: 100%;
    height: 85%;
    border-radius: 5px 5px 0 0;
}

.mod-recommend3 span {
    font-size: 0.6rem;
    color: #969696;
    margin: 15px;
    display: inline-block;
}

.time span {
    font-size: 0.6rem;
    color: #969696;
}

.chapter {
    width: 100%;
    height: 200px;
}

.chapter ul li {
    float: left;
    width: 30%;
    height: 47px;
    border: 1px solid #C5C5C5;
    margin: 0.16rem;
    text-align: center;
    line-height: 47px;
    color: #535252;
}

.加载更多 {
    float: left;
    width: 95%;
    height: 50px;
    border: 1px solid #C5C5C5;
    margin: 4px;
    text-align: center;
    line-height: 50px;
    color: #535252;
    font-size: 0.8rem;
}
</style>
