<template>
<div>
    <!--  title="恋爱" -->
    <topHeader :title="name" />
    <div class="排行分类">
        <div @click="切换(1)" :class="{active:active == 1 }">更新</div>
        <div @click="切换(2)" :class="{active:active == 2 }">人气</div>
        <!-- <div @click="切换(3)" :class="{active:active == 3 }">收藏</div> -->
    </div>
    <div class="top3-box">
        <div v-show="选择详情 == 1">
            <router-link tag="div" :to="{path:'/details',query:{id:item.id,name:item.name,renQi:item.renQi,biaoQian:item.biaoQian,cover:item.cover}}" class="排行列表" v-for="(item,index) in categoryList.data" :key="index">
                <div class="列表内容">
                    <div class="排行列表图片"><img :src="item.cover" alt=""></div>
                    <div class="列表文字">
                        <!-- <span class="等级">{{item.grade}}</span> -->
                        <div>
                            <p style="color:#535252;font-weight:600;font-size: 18px;">{{item.name}}</p>
                        </div>
                        <div>
                            <p>收藏数：{{item.renQi}}</p>
                        </div>
                        <div>
                            <p>{{item.biaoQian}}</p>
                        </div>
                        <div class="溢出隐藏">
                            <p>{{item.jianJie}}</p>
                        </div>
                    </div>
                </div>
            </router-link>

        </div>
        <div v-show="选择详情 == 2">
            <router-link  tag="div" :to="{path:'/details',query:{id:item.id}}" class="排行列表" v-for="(item,index) in categoryList.data" :key="index">
                <div class="列表内容">
                    <div class="排行列表图片"><img :src="item.cover" alt=""></div>
                    <div class="列表文字">
                        <!-- <span class="等级">{{item.grade}}</span> -->
                        <div>
                            <p style="color:#535252;font-weight:600;font-size: 18px;">{{item.name}}</p>
                        </div>
                        <div>
                            <p>收藏数：{{item.renQi}}</p>
                        </div>
                        <div>
                            <p>{{item.biaoQian}}</p>
                        </div>
                        <div class="溢出隐藏">
                            <p>{{item.jianJie}}</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <div v-if="kong" class="空内容">
                <img :src="kong" alt="">
                <p>空空如也是一种态度</p>
            </div>
        </div>
    </div>

</div>
</template>

<script>
// import Loading from '@/components/loading'
import topHeader from "@/components/header.vue"
import {
    api_分类漫画
} from "@/api/api.js";
export default {
    data() {
        return {
            categoryList: [],
            isLoading: true,
            active: "1",
            选择详情: "2",
            id: '',
            name: "",
            kong:""
        }
    },
    components: {
        topHeader,
        // Loading
    },
    mounted() {
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        console.log(this.name)
        if (this.active == 1) {
            var obj = {
                leiBieId: this.id,
                pageIndex: 1,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.categoryList = x.data
                console.log(this.categoryList)
            })
        }
    },
    methods: {
        切换(index) {
            this.选择详情 = index;
            this.active = index;
            // leiBieId=1&pageIndex=1&pageSize=10
            var obj = {
                leiBieId: this.id,
                pageIndex: this.active,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.categoryList = x.data
                console.log(this.categoryList)
                if( this.categoryList.data == ''){
                    this.kong = "images/empty2-girl.png"
                }
            })
        }

    },
}
</script>

<style>
.空内容{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin:0.8rem 0 0 0; 
}
.空内容 img{
    margin: 0 auto;
}
.空内容 p{
    margin-top: 0.5333rem;
    margin: 0 auto;
    color: #C5C5C5;
}
.溢出隐藏 p {
    position: relative;
    line-height: 1rem;
    height: 1rem;
    overflow: hidden;
}

.溢出隐藏 p:after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 5px;
    background-color: #fff;
}

.top-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 149;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    background-color: #FFFFFF;
}

.top-bar.no-title .top-logo {
    display: block;
}

.top-bar.no-title .top-title,
.top-bar.no-title .btn-top.back {
    display: none;
}

.top-bar .top-logo {
    display: none;
    width: 6rem;
    height: 2.5rem;
    background: url("/images/sc_img_default.png") no-repeat 0rem -2.55rem;
    background-size: 14.8rem 7rem;
    width: 6rem;
    height: 2.5rem;
    ;

    background-repeat: no-repeat;
    text-indent: -2500rem;
    font-size: 0;
}

.top-bar .top-title {
    display: block;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.9rem;
    color: #535252;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.top-bar .padding {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.top-bar .btn-top {
    display: block;
    text-indent: -2500rem;
    font-size: 0;
}

.top-bar .btn-top.back {
    padding: 0.375rem;
}

.top-bar .btn-top.back::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -3.9rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    ;

    background-repeat: no-repeat;
}

.top-bar .btn-top.back:active {
    background-color: #DCDCD6;
}

.top-bar .btn-top.search {
    padding: 0.375rem;
    background: white;
}

.top-bar .btn-top.search::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -7.1rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    ;

    background-repeat: no-repeat;
}

.top-bar .btn-top.search:active {
    background-color: #DCDCD6;
}

.top-bar .btn-top.menu {
    padding: 0.375rem;
    margin-right: 0.125rem;
    background: white;
}

.top-bar .btn-top.menu::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -5.5rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    ;

    background-repeat: no-repeat;
}

.top-bar .btn-top.menu:active {
    background-color: #DCDCD6;
}

.返回 {
    background: white;
}

.返回 i {
    background: white;
    padding: 0.2667rem 0.2667rem;
    top: 0.1333rem;
    color: #ffa378;
}

.返回 span {
    height: 100%;
    background: white;
    color: #535252;
}

.排行分类 {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 2rem;
    border-top: 1px solid #f8f8f8;
    line-height: 2rem;
}

.排行分类 div {
    width: 50%;
    text-align: center;
    background: white;
    font-size: 0.72rem;
    color: #969696;
}

.active {
    border-bottom: 2px solid #ff9a6a;
    width: 20%;
}

.active:after {
    content: '';
    top: auto;
    height: 6px;
    width: 105px;
    background-color: #32b66b;
}

.top3-box {
    background-image: linear-gradient(#f5f5ee, #ffffff);
}

.排行列表 {
    display: flex;
    width: 95%;
    height: 111px;
    background: #ffffff;
    margin: auto;
    flex-wrap: wrap;
    margin-top: 8px;
}

.列表内容 {
    display: flex;
}

.排行列表图片 img {
    width: 2.6667rem;
    height: 5.2rem;
}

.列表文字 {
    background: #ffffff;
    height: 111px;
}

.列表内容 p {
    font-size: 14px;
    width: 99%;
    background: #ffffff;
    color: #969696;
    padding-left: 5px;
    padding-top: 5px;
}

.等级 {
    float: right;
    background: #ffffff;
    color: #C5C5C5;
    font-size: 30px;
}

.comic-item {
    list-style: none;
    width: 96%;
    height: 100%;
    background: white;
    margin: auto;
    margin-top: 7px;
}

.comic-cover {
    width: 90px;
    height: 130px;
    float: left;
}

.comic-cover img {
    width: 100%;
    height: 100%;
}

.comic-info {
    display: flex;
    flex-wrap: wrap;
    padding-left: 7px;
    background: white;
}

.comic-info strong {
    width: 100%;
    font-size: 18px;
    color: #535252;
    background: white;
}

.comic-info small {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    margin: 2px;
    color: #969696;
    background: white;
}
</style>
