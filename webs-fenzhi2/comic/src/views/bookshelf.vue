<template>
<div>
    <topHeader title="热门" />
    <div class="排行分类">
        <div @click="切换(1)" :class="{active:active == 1 }">推荐</div>
        <div @click="切换(2)" :class="{active:active == 2 }">经典</div>
    </div>
    <div>
        <div v-show="选择详情 == 1">
            <router-link  tag="div" :to="{path:'/details',query:{id:item.id}}" class="排行列表" v-for="(item,index) in 推荐.data" :key="index">
                <div class="列表内容">
                    <div class="排行列表图片"><img :src="item.cover" alt=""></div>
                    <div class="列表文字">
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
             <router-link  tag="div" :to="{path:'/details',query:{id:item.id}}" class="排行列表" v-for="(item,index) in 推荐.data" :key="index">
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
    </div>
</div>
</template>

<script>
import {
    api_分类漫画
} from "@/api/api.js";
import topHeader from "@/components/header.vue"
export default {
    data() {
        return {
            active: "1",
            选择详情: "1",
            推荐:[]
        }
    },
    components: {
        topHeader
    },
    methods: {
        切换(index) {
            this.选择详情 = index;
            this.active = index;
             var obj = {
                leiBieId: 6,
                pageIndex: this.active,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.推荐 = x.data
                console.log(this.推荐)
            })
        },
        推荐漫画(){
            var obj = {
                leiBieId: 6,
                pageIndex: this.active,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.推荐 = x.data
                console.log(this.推荐)
            })
        }
    },

    mounted() {
        this.推荐漫画();
        var nubType = window.location.href.slice(-1);
        if (nubType == 1) {
            this.active = 1;
        } else {
            this.active = 2;
        }
        console.log(nubType);
    },
}
</script>

<style scoped>
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

.fav-bgLayBox {
    width: 100%;
    height: 319px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.fav-bgLayBox div {
    width: 100%;
    text-align: center;
}

.fav-bgLayBox img {
    width: 96px;
    height: 170px;
    padding-top: 20px;
}

.fav-bgLayBox .fav-bgP {
    font-size: 0.7rem;
    color: #C5C5C5;
    padding-bottom: 5px;
    padding-top: 8px;
}
.login{
    width: 4rem !important;
    height: 1.6333rem;
    border:1px solid #ff9a6a;
    color: #ff9a6a;
    background: white;
    line-height: 1.6333rem;
    font-size: 20px;
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
.mod-recommend3 span{
    font-size: 0.6rem;
    color: #969696;
    margin: 15px;
    display: inline-block;
}
.空白条{
    width: 100%;
    height: 5px;
    background: white;
}
.fav-bgLayBoximg{
    width: 193px !important;
    height: 151px;
}
.fav-bgLayBoximg img{
    width: 100%;
    height: 100%;
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
    width: 77px;
    height: 111px;
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
.tab-edit{
    color: #ff9a6a;
    height: 100%;
    background: white;
    width: 10%;
}
</style>
