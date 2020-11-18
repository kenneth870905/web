<template>
    <div>
        <t2 />
        <van-sticky>
            <div class="tl">
                <div class="l" v-show="位置!='left'"></div>
                <ul @scroll="scroll($event)">
                    <router-link :class="{active:item.id==news.query.t2id}" tag="li" :to="`/newType?t1=${t1}&t2=${item.id}`" v-for="(item, index) in type" replace>{{item.name}}</router-link>
                    <!-- <li :class="{active:item.id==t2}" v-for="(item, index) in type" :key="index">{{item.name}}</li> -->
                </ul>
                <div class="r" v-show="位置!='right'"></div>
            </div>
        </van-sticky>
        
        <van-list class="list" :offset="20" v-model="news.loading" :finished="!news.loading && news.list.length>=news.total" finished-text="没有更多了" @load="onLoad">
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

const new1 = () => import('@/components/新闻/新闻1.vue');
const new2 = () => import('@/components/新闻/新闻2.vue');
import t2 from '@/components/header_2.vue'
export default {
    name:"",
    components:{
        t2,
        new1,
        new2
    },
    data() {
        return {
            type:[],
            位置:'left',
            t1:"",
            news: {
                query: {
                    pageIndex: 0,    //从 0 页开始
                    pageSize: 5,
                    t2id:""
                },
                list: [],
                total: 0,
                loading:true,
                first:true
            }
        }
    },
    computed: {
        // t2(){
        //     return this.$route.query.t2 ? this.$route.query.t2 : this.type[0].id 
        // }
    },
    methods: {
        onLoad(){
            console.log('加载')
            this.loading=true;
            this.news.first = false
            this.news.query.pageIndex++
            this.获取新闻();
        },
        scroll(e){
            let w = e.target.clientWidth;
            let l = e.target.scrollLeft;
            let sw = e.target.scrollWidth;
            if(l <=10){
                this.位置 = 'left'
            }else if(l+w >= sw-10){
                this.位置 = 'right'
            }else{
                this.位置 = ''
            }
        },
        获取t2(){
            this.$axios.post('/NewType/getT2',{'t1id':this.$route.query.t1}).then(x=>{
                this.type=x.data;
                if(!this.news.query.t2id){
                    this.news.query.t2id = this.type[0].id
                    this.获取新闻()
                }
            }).catch(err=>{})
        },
        获取新闻() {
            console.log('获取数据')
            this.$axios.post('/News/findAll', this.news.query).then(x => {
                this.news.list = [...this.news.list, ...x.data.data];
                this.news.total = x.data.total;
                // this.$nextTick(this.news.loading = false)
                // setTimeout(() => {
                    this.news.loading = false
                // }, 2000);
            }).catch(err => {
                this.news.loading = false;
            })
        }
    },
    mounted() {
        this.t1 = this.$route.query.t1
        
        if(this.$route.query.t2){
            this.news.query.t2id = this.$route.query.t2
            this.获取新闻()
        }
        this.获取t2();
        // document.querySelector('.tl>li:nth-child(18)').scrollIntoView()
    },
    watch: {
        $route(){
            console.log('路由发生变化')
            this.news.query.pageIndex = 0;
            this.news.list = [];
            this.news.total = 0;
            // this.news.loading = true;
            if(this.$route.query.t2){
                this.news.query.t2id = this.$route.query.t2
                this.获取新闻()
            }else{
                this.news.query.t2id = this.type[0].id
                this.获取新闻()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.tl{
    background: #5187fe;
    color: #ffffff;
    position: relative;
    ul{
        overflow: auto;
        white-space: nowrap;
    }
    li{
        display: inline-block;
        padding: 0px _vw(13);
        line-height: _vw(40);
        position: relative;
        &.active::after{
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            background: rgb(130, 255, 254);
            content: '';
            width: 18px;
            height: 3px;
            margin: auto;
        }
    }
    .l,
    .r{
        position: absolute;
        top: 0px;
        height: 100%;
        width: _vw(40);
        content: '';
        z-index: 1;
    }
    .l{
        left: 0px;
        background: linear-gradient(-90deg, rgba(81, 135, 254, 0.3), #537bff);
    }
    .r{
        right: 0px;
        background: linear-gradient(90deg, rgba(81, 135, 254, 0.3), #537bff);
    }
}
</style>
