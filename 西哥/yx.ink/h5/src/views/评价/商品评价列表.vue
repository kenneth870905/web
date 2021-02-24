<template>
    <div class="content">
        <van-nav-bar fixed title="评价" left-arrow @click-left="$back()" />

        <pj v-for="(item, index) in list" :ismy="ismy" :item="item" :key="index"/>

        <load :loading="loading" :total="total" :length="list.length" :reachBottom="到底"/>
    </div>
</template>

<script>
import load from '@/components/load.vue'
import pj from '@/components/商品评价.vue'
import { mapState } from 'vuex'
export default {
    components:{
        load,
        pj
    },
    data() {
        return {
            query:{
                page:0,
                size:10,
                goodsId:'',
                userId:'',
                type:1
            },
            ismy:false,
            list:[],
            total:-1,
            loading:false
        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo'
        })
    },
    methods: {
        到底(){
            this.查询评价()
        },
        查询评价(){
            if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
                return
            }
            this.loading = true
            this.query.page++
            this.$axios.post('/Translation/getByGoodsId',this.query).then(res => {
                if(res.code==1){
                    this.list =[...this.list , ...res.data.data ] 
                    this.total = res.data.total
                }else{
                    this.total=0
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
                this.total = 0
            })
        }
    },
    mounted() {
        // 没有商品id就是查询自己的
        if(this.$route.query.goodsId){
            this.query.goodsId = this.$route.query.goodsId
        }else{
            this.query.userId = this.userInfo.id
            this.ismy = true
        }
        this.查询评价()
    },
}
</script>

<style lang="scss" scoped>
.content{
    padding: 60px 0px 0px;
}
</style>