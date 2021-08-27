<template>
    <div class="home">
        <header1 />

        <ul class="类型">
            <li @click="g1(item)" v-show="index<17" v-for="(item, index) in 偏好频道" :key="index">{{item.name}}</li>
            <li @click="$router.push('/pingdao')">更多</li>
        </ul>
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
const header1=()=>import('@/components/header.vue')
const new1 = () => import('@/components/新闻/新闻1.vue');
const new2 = () => import('@/components/新闻/新闻2.vue');
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        new1,
        new2,
        header1
    },
    data() {
        return {
            active: 0,
            news: {
                query: {
                    pageIndex: 0,    //从 0 页开始
                    pageSize: 20
                },
                list: [],
                total: 0,
                loading:false,
                first:true
            }
        }
    },
    computed: {
        ...mapState({
            偏好频道:x=>x.user.偏好频道 
        })
    },
    methods: {
        ...mapMutations({
            设置默认频道:"user/设置默认频道"
        }),
        g1(item){
            if(item.name=='推荐')
                this.$router.push('/recommend')
            else if(item.name=='视频')
                this.$router.push('/video')
            else 
                this.$router.push(`/newType?t1=${item.id}`)
        },
        onLoad(){
            this.news.first = false
            this.news.query.pageIndex++
            this.获取新闻();
        },
        获取新闻类型() {
            // return new Promise((resolve, reject) => {
            this.$axios.post('/newtype/findall', '').then(x => {
                if(this.偏好频道.length==0)
                this.设置默认频道(x.data.slice(0,20))
            }).catch(err => { });
            // });
        },
        获取新闻() {
            this.$axios.post('/News/findAll', this.news.query).then(x => {
                this.news.list = [...this.news.list, ...x.data.data];
                this.news.total = x.data.total;
                this.news.loading = false;
            }).catch(err => {
                this.news.loading = false;
            })
        }
    },
    mounted() {
        if(this.偏好频道.length==0){
            this.获取新闻类型()
        }
    },
}
</script>

<style lang="scss" scoped>
.类型{
    background: #ffffff;
    display: grid;
    height: _vw(95);
    grid-template-columns:repeat(auto-fill , calc(100% / 6) );
    grid-template-rows: repeat(auto-fill,calc(100% /3));
    align-items: center;
    width: _vw(345);
    box-shadow: rgba(0, 69, 189, 0.1) 0px 1px 6px 0px;
    border-radius: _vw(10);
    margin: 0px auto;
    text-align: center;
}


.切换类型 {
    display: flex;
    align-items: center;
    .tabs {
        width: 0;
        flex-grow: 1;
    }
    .icon_1 {
        width: 30px;
        text-align: center;
    }
}
// .list{
//     flex: 1;
//     overflow: auto;
// }
</style>