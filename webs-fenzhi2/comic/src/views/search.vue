<template>
<div>
    <div>
        <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
    </div>
    <div class="search-top">
        <div class="van-icon van-icon-arrow-left left-icon" @click="$router.back()"></div>
        <div class="inp">
            <input type="text" :placeholder="搜索提示" @focus="失去焦点()" @keyup="搜索()" v-model="title">
        </div>
        <div class="search" @click="搜索详情()">
            搜索
        </div>
    </div>
    <div class="search-hot" v-if="!文本">
        <img src="images/touxiang.png" alt="">
        <img src="images/sousuo.png" alt="">
    </div>
    <div class="搜索" v-for="(item,index) in search" :key="index">
        <p v-if="!文本"> {{item.title}}</p>
        <van-divider :style="{ color: '#1989fa',  padding: '0 16px' }" v-if="!文本">
        </van-divider>
    </div>
    <div class="搜索推荐" v-if="!文本">
        <div v-for="(item,index) in 搜索推荐" :key="index">{{item}}</div>
    </div>
    <div v-html="文本">
        {{文本}}
    </div>
    
</div>
</template>

<script>
import Loading from '@/components/loading'
export default {
    data() {
        return {
            title: "",
            search: [],
            搜索提示: "漫画名|作者",
            搜索内容: "",
            搜索推荐: ["武炼巅峰", "神仙婚介所", "我才不是恶毒女配", "也在江湖飘", "荒野追踪", "仙界归来", "牧神记", "鬼衣凤酒", "青梅出马", "英雄？我早就不当了"],
            文本: "",
            isLoading: true
        }
    },
    components: {
        Loading
    },
    methods: {
        失去焦点() {
            this.搜索提示 = '';
        },
        // 获得焦点() {
        //     this.搜索提示 = '漫画名|作者';
        // }
        搜索() {
            this.$axios.get(`apis/search/smart?t=${new Date().getTime()}&word=${this.title}`).then(x => {
                this.isLoading = false
                let res = x.data
                this.search = res.data;
            }).catch(e => console.log(e))
        },
        搜索详情() {
            this.$axios.get(`apis/search/result?t=${new Date().getTime()}&word=${this.title}&page=2&pageSize=10&style=items`).then(x => {
                console.log(x.data)
                this.文本 = x.data;
            })
            if (this.title == '') {
                this.文本 = ""
            } else {
                this.文本 = this.文本
            }
        }
    },
    mounted() {
        this.搜索();
        this.搜索详情();
    },
}
</script>

<style>
.search-top {
    width: 100%;
    height: 55px;
    background: #ff9a6a;
    display: flex;
    justify-content: space-between;
}

.search-top div {
    background: none;
    height: 30px;
}

.search-top input {
    background: white;
    border: 0;
    text-align: center;
    width: 300px;
    height: 23px;
    padding: 4px 0px;
    font-size: 12px;
    margin-top: 10px;
}

input::placeholder {
    color: #c5c5c9;
    font-size: 0.7467rem;
}

.left-icon {
    font-size: 30px;
    color: white;
    padding-left: 0.4rem;
    margin-top: 10px;
}

.search {
    color: white;
    padding-right: 0.4rem;
    font-size: 22px;
    margin-top: 10px;
}

.search-hot {
    margin-top: 10px;
}

.search-hot img {
    height: 40px;
    margin: 5px;
}

.搜索推荐 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.搜索推荐 div {
    width: 47%;
    height: 55px;
    border: 1px solid #C5C5C5;
    background: white;
    border-radius: 30px;
    margin: 5px;
    line-height: 55px;
    text-align: center;
    font-size: 20px;
    color: #535252;
}

.van-divider {
    margin: 10px 0;
}

.搜索 {
    font-size: 0.9rem;
    color: #969696;
    text-align: center;
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
    width: 77px;
    height: 102px;
    float: left;
}

.comic-cover img {
    width: 100%;
    height: 100%;
}

.comic-content {
    display: flex;
    flex-wrap: wrap;
    background: white;
}
</style>
