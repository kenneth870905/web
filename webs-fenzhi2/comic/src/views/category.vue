<template>
<div>

    <topHeader title="分类"/>
    <!-- <div class="top-category">
        <div class="top4">
            <ul>
                <li @click="$router.push('/CategoryDetails')">
                    <span>条漫</span>
                    <span>城会</span>
                </li>
                <li>
                    <span>
                        <span>独家</span>
                        <span>就我</span>
                    </span>
                </li>
                <li>
                    <span>
                        <span>完结</span>
                        <span>选我</span>
                    </span>
                </li>
                <li>
                    <span>
                        <span>日漫</span>
                        <span>神作</span>
                    </span>
                </li>
            </ul>
        </div>
    </div> -->
    <div class="category-list">
        
        <router-link  tag="div" :to="{path:'/CategoryDetails',query:{id:item.id,name:item.name}}" class="category-list-img" v-for="(item,index) in category" :key="index" >
            <p class="category-title">| {{item.name}}</p>
            <img :src="item.cover" alt="">
        </router-link>
    </div>
</div>
</template>

<script>
import {
    api_分类
} from "@/api/api.js";
import topHeader from "@/components/header.vue"
export default {
    data() {
        return {
            active: '1',
            category: []
        }
    },
    methods: {
        分类() {
            var obj = {
                pageIndex: 1,
                pageSize: 10
            };
            api_分类(obj).then( x => {
                console.log(x.data)
                this.category = x.data.slice(0,14)
            })
        },
       跳转详情(){
        //     this.$router.push({  
        //     path: 'CategoryDetails',   
        //     name: 'CategoryDetails',  
        //     params: {   
        //         name: this.category,   
        //         // msgKey: this.msg  
        //     }  
        //     /*query: {  
        //         key: 'key',   
        //         msgKey: this.msg  
        //     }*/  
        // })  
       }
    },
    mounted() {
        this.分类()
    },
    components: {
        topHeader
    }
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
    height: 2.2rem;
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

.top-category {
    width: 95%;
    height: 4rem;
    background: white;
    margin: auto;
    margin-top: 0.4rem;
}

.top4 ul li {
    float: left;
    width: 50%;
    background: white;
    text-align: center;
    margin-top: 0.6667rem;
}

.top4 ul li span {
    background: white;
}

.top4 ul li span:nth-child(2) {
    color: white;
    background: #de8275;
    display: inline-block;
    color: white;
    background-image: url("/images/top4bg.png");
    width: 1.775rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 0.4rem;
    vertical-align: middle;
    text-align: right;
    line-height: 0.75rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 0.15rem;
    margin-left: 6px;
}

.top4 ul:first-child {
    color: #969696;
    font-size: 0.75rem;
}

.category-list {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.6667rem;
}

.category-list-img {
    width: 47%;
    height: 110px;
    margin: auto;
    margin-top: 0.4rem;
}

.category-list-img img {
    width: 100%;
    height: 100%;
}

.category-list-img:last-child {
    margin-bottom: 20px;
}

.category-title {
    position: absolute;
    color: #535252;
    background: white;
    font-size: 0.6667rem;
    line-height: 110px;
    margin-left: 0.5rem;
    height: 0.6667rem;
}
</style>
