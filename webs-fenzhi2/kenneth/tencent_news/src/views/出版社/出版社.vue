<template>
    <div>
        <van-nav-bar :title="source.name" left-arrow @click-left="$back"></van-nav-bar>
        <div class="header" style="background-image:url('static/image/chubanshe/authorbg.png')">
            <div class="logo_1">
                <img :src="source.logo" alt="" srcset="">
            </div>
            <div class="content">
                <div class="header_1">
                    <span class="title">{{source.name}}</span>
                    <span class="关注" v-show="!关注" @click="设置关注()">
                        <van-icon name="plus" />
                        关注
                    </span>
                    <span class="已关注" v-show="关注" @click="设置关注()">
                        <van-icon name="success" />                
                        已关注
                    </span>
                </div>
                <div class="text_1">{{source.introduce}}</div>
            </div>
        </div>

        <van-list class="list" v-model="news.loading" :finished="!news.loading && news.list.length>=news.total && !news.first" finished-text="没有更多了" @load="onLoad">
            <ul>
                <li v-for="(item, index) in news.list" :key="index">
                    <new1 v-if="item.cover.split(',').length<=1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                    <new2 v-if="item.cover.split(',').length>1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                </li>
            </ul>
        </van-list>



    </div>
</template>

<script>
const new1 = () => import('@/components/新闻/新闻1.vue')
const new2 = () => import('@/components/新闻/新闻2.vue')
import axios from 'axios'
export default {
    name: "",
    components:{
        new1,
        new2
    },
    data() {
        return {
            source:{},
            news: {
                query: {
                    pageIndex: 0,    //从 0 页开始
                    pageSize: 20,
                    sourceId:""
                },
                list: [],
                total: 0,
                loading:false,
                first:true
            },
            关注:false
        }
    },
    methods: {
        获取来源(){
            this.$toast.loading({mask: true,duration:0})
            this.$axios.post('/Source/getById',{'id':this.$route.query.id}).then(x=>{
                console.log(x)
                this.source=x.data;
            }).catch(err=>{})
        },
        onLoad(){
            console.log('onLoad')
            this.news.first = false
            this.news.query.pageIndex++
            this.获取新闻();
        },
        获取新闻() {
            this.news.query.sourceId = this.$route.query.id
            this.$axios.post('/News/findAll', this.news.query).then(x => {
                console.log(x)
                this.news.list = [...this.news.list, ...x.data.data];
                this.news.total = x.data.total;
                this.news.loading = false;
            }).catch(err => { 
                this.news.loading = false;
            })
        },
        async 查询关注(){
            this.$toast.loading({mask: true,duration:0})
            let r = await this.$axios.post('/GuanZhu/queryOne',{'sourceId':this.$route.query.id})
            this.关注 = r.data.code == 1 
            this.$toast.clear();
        },
        设置关注(){
            this.$toast.loading({mask: true,duration:0})
            this.$axios.post('/GuanZhu/index',{'sourceId':this.$route.query.id}).then(x=>{
                this.查询关注()
            }).catch(err=>{
                this.$toast('系统错误稍后再试')
                this.$toast.clear();
            })
        }
    },
    mounted() {
        this.获取来源();
        this.查询关注();
    },
}
</script>

<style lang="scss" scoped>
.关注,
.已关注{
    line-height: _vw(22);
    border-radius: _vw(22);
    padding: 0px _vw(5);
    font-size: _vw(12);
}
.关注{
    background: rgb(76, 126, 255);
    color: #ffffff;
}
.已关注{
    background: rgb(237, 242, 250);
}

.header{
    display: flex;
    padding: _vw(20);
    .logo_1{
        width: _vw(60);
        height: _vw(60);
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        background: #eeeeee;
        border-radius: 100%;
        img{
            border-radius: 100%;
            width:100%;
            height:100%;
            object-fit: cover;
        }
    }
    .content{
        flex:1;
    }
    .header_1{
        margin: 0px 0px _vw(10) 0px;
        display: flex;
        .title{
            flex:1;
        }
    }
    .text_1{
        font-size: _vw(12);
        color: rgb(112, 113, 117);
    }
}

</style>

