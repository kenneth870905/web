<template>
    <div>
        <header1 />
        <div class="Main">
            <van-list class="list" v-model="news.loading" :finished="!news.loading && news.list.length>=news.total && !news.first" finished-text="没有更多了" @load="onLoad">
                <ul>
                    <li v-for="(item, index) in news.list" :key="index">
                        <new1 v-if="item.cover.split(',').length<=1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                        <new2 v-if="item.cover.split(',').length>1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
const header1 =()=>import('@/components/header.vue');
import navigation from '@/components/navigation.vue'
const new1 = () => import('@/components/新闻/新闻1.vue');
const new2 = () => import('@/components/新闻/新闻2.vue');
import { mapActions, mapState } from "vuex";
export default {
    name: "",
    components: {
        navigation,
        new1,
        new2,
        header1
    },
    data() {
        return {
            news: {
                query: {
                    pageIndex: 0,    //从 0 页开始
                    pageSize: 20,
                    t2id:""
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
            t1:'t1'
        })
    },
    methods: {
        ...mapActions({
            获取t1:"获取t1"
        }),
        onLoad(){
            this.news.first = false
            this.news.query.pageIndex++
            this.获取新闻();
        },
        获取新闻() {
            this.$axios.post('/News/findAll', this.news.query).then(x => {
                this.news.list = [...this.news.list, ...x.data.data];
                this.news.total = x.data.total;
                this.news.loading = false;
            }).catch(err => {
                this.news.loading = false;
            })
        },
        async 初始化(){
            if(this.t1.length==0){
                await this.获取t1()
            }
            console.log(this.t1)
            console.log(this.t1.find(x=>x.name='推荐'))
            this.news.query.t2id = this.t1.find(x=>x.name=='推荐') ? this.t1.find(x=>x.name=='推荐').id : ''
            // this.获取新闻()
        }
    },
    mounted() {
        this.初始化()
    },
}
</script>

<style lang="scss" scoped>
.Main{
    background: #ffffff;
    min-height: 50%;
    border-top-left-radius: _vw(15);
    border-top-right-radius: _vw(15);
}
</style>
