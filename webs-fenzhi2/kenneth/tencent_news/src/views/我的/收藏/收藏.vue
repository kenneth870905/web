<template>
    <div>
        <van-nav-bar title="收藏" left-arrow @click-left="$back" fixed></van-nav-bar>

        <div class="Main">
            <div class="提示">提示:左滑可删除</div>
            <van-list :offset="30" class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-swipe-cell v-for="(item, index) in list" :key="index">
                    <div>
                        <new1 v-if="item.cover.split(',').length<=1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                        <new2 v-if="item.cover.split(',').length>1" :obj="item" @click.native="$router.push(`/new?id=${item.id}`)" />
                    </div>
                    <template slot="right">
                        <van-button square type="danger" @click="删除(item,index)" text="删除" />
                    </template>
                </van-swipe-cell>
            </van-list>
        </div>

    </div>
</template>

<script>
const new1 = () => import('@/components/新闻/新闻1.vue')
const new2 = () => import('@/components/新闻/新闻2.vue')
export default {
    name: "",
    components: {
        new1,
        new2
    },
    data() {
        return {
            loading: false,
            query: {
                pageIndex: 0,
                pageSize: 10
            },
            list: [],
            total: -1,
        }
    },
    computed: {
        finished() {
            return !this.loading && this.list.length >= this.total && this.total!=-1;
        }
    },
    methods: {
        onLoad() {
            console.log('onLoad')
            this.loading = true
            this.query.pageIndex++;
            this.获取收藏()
        },
        async 获取收藏() {
            let r = await this.$axios.post('/ShouCang/queryAll', this.query)
            this.list = [...this.list, ...r.data.data];
            this.total = r.data.total;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        async 删除(item,index) {
            let r = await this.$dialog.confirm({ title: '提示', message: '确认删除？' }).then(() => true).catch(() => false);
            if (!r) return;
            
            this.$toast.loading({mask: true,duration:0});
            let r1 = await this.$axios.post('/ShouCang/index',{'newsId':item.id});
            if(r1.data.code==1){
                this.list.splice(index,1);
                this.total--;
            }else{
                this.$toast(x.data.message); 
            }
            console.log(r1);
            this.$toast.clear();
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.van-swipe-cell__right {
    button {
        height: 100%;
    }
}

.提示 {
    color: #e41111;
    font-size: _vw(12);
    padding: _vw(10) _vw(15);
}
</style>
