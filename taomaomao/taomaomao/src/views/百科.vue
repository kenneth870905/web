<template>
    <div>
        <navigation />
        <topSwiper />

        <div class="pz_SideLayer">
            <li @click="go(item)" :class="{active:typeId==item.id}" v-for="item in newsType"><a>{{item.name}}</a></li>
        </div>

        <ul class="ul_4">
            <li v-for="item in news.data" @click="$router.push('/newsDetails?id='+item.id)">
                <div class="img"><img :src="`${item.cover}`"></div>
                <div class="lc1">
                    <h4>{{item.title}}</h4>
                    <div class="p">{{item.intro}}</div>
                    <h6>
                        <span class="time">{{item.lastTime | ft}}</span>
                        <span class="More">more+</span>
                    </h6>
                </div>
            </li>
        </ul>

        <div class="LaoCMS-page" v-show="news.last_page>1">
            <a href="javascript:;" @click="over(1)" v-show="news.current_page>1">第一页</a>
            <a href="javascript:;" @click="over(news.current_page-1)" v-show="news.current_page>1">上一页</a>
            <a href="javascript:;">{{news.current_page}}</a>
            <a href="javascript:;" @click="over(news.current_page+1)" v-show="news.current_page<news.last_page">下一页</a>
            <a href="javascript:;" @click="over(news.last_page)" v-show="news.current_page<news.last_page">最末页</a>
        </div>

        <footer1 />
    </div>
</template>

<script>

import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import footer1 from '@/components/footer.vue'
import moment from 'moment'
export default {
    name: "",
    components: {
        navigation,
        topSwiper,
        footer1
    },
    data() {
        return {
            news:{
                list_rows:10,       //每页条数
                current_page:1,     //当前页
                last_page:1,        //最后页数
                data:[]
            },
            newsType:[],
        }
    },
    filters:{
        ft(time){
            return moment(time).format('YYYY-MM-DD')
        }
    },
    computed:{
        typeId(){
            return this.$route.query.id
        }
    },
    methods: {
        getNewsType(){
            this.$axios.post('News/getType','')
            .then(res => {
                if(res.data.code==1)
                this.newsType = res.data.data
            })
            .catch(err => {
            })
        },
        getNewsList(){
            var p = {
                    typeId:this.typeId,
                    list_rows:this.news.list_rows,
                    page:this.news.current_page
                }
            this.$axios.post('News/getNewsList',p)
            .then(res => {
                if(res.data.code==1)
                this.news = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        over(index){
            this.news.current_page = index
            this.getNewsList()
        },
        go(item){
            if(this.typeId!=item.id){
                this.$router.replace('/news?id='+item.id).then(()=>{
                    this.init()
                    this.getNewsList()
                })
            }else{
                this.$router.replace('/news').then(()=>{
                    this.init()
                    this.getNewsList()
                })
            }
        },
        init(){
            this.news={
                list_rows:10,       //每页条数
                current_page:1,     //当前页
                last_page:1,        //最后页数
                data:[]
            }
        }
    },
    mounted() {
        this.getNewsType()
        this.getNewsList()
    },
}
</script>

<style lang="scss" scoped>
.pz_SideLayer {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px;
    .active a {
        color: #e1a85b;
        border-bottom-color: #e1a85b;
    }
    li {
        width: 50%;
        padding: 5px;
        a {
            padding: 10px 2px;
            color: #666;
            font-size: 14px;
            line-height: 18px;
            text-align: center;
            display: block;
            border: 1px solid #eeeeee;
        }
    }
}

.ul_4 {
    margin: 20px 0;
    padding: 0 5px;
    li {
        margin: 6px 0;
        background: #f6f6f6;
        display: flex;
        height: 88px;
        align-items: center;
    }
    .img {
        flex-shrink: 0;
        width: 120px;
        height: 68px;
        left: 10px;
        top: 10px;
        overflow: hidden;
        margin: 0px 0px 0px 10px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .lc1{
        flex: 1;
        width: 0;
        padding: 7px 10px;
        margin: 0px 0px 0px 10px;
        border-left: 1px solid #fff;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    h4 {
        width: 100%;
        font-size: 16px;
        color: #1c1c1c;
        margin: 0px;
        overflow: hidden;
        letter-spacing: 1px;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .p{
        width: 100%;
        font-size: 14px;
        color: #898989;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    h6{
        display: flex;
        margin: 0px;
        justify-content: space-between;
        font-size: 14px;
        color: #a9a9a9;
        font-weight: 400;
    }
}

.LaoCMS-page {
    padding: 14px 0 10px;
    font-size: 13px;
    text-align: center;
    a {
        height: 25px;
        margin-left: 6px;
        padding: 0 8px;
        border: 1px solid #d3d3d3;
        text-align: center;
        color: #767676;
        display: inline-block;
        line-height: 24px;
    }
}
</style>
