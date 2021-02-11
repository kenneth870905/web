<template>
    <div>
        <div class="title-1">我的订单</div>
        <el-tabs v-model="type">
            <el-tab-pane label="全部订单" name="all"></el-tab-pane>
            <el-tab-pane label="待付款" name="0"></el-tab-pane>
            <el-tab-pane label="待发货" name="1"></el-tab-pane>
            <el-tab-pane label="待收货" name="2"></el-tab-pane>
            <el-tab-pane label="已收货" name="3"></el-tab-pane>
        </el-tabs>

        <orderItem  v-for="item in list" :order="item"/>
        <el-pagination class="pagination" v-if="total>0" @current-change="fenye" :total="total" :page-size="query.size" :current-page="query.page" layout="prev, pager, next" background></el-pagination>

    </div>
</template>

<script>
import orderItem from './components/orderItem.vue'
export default {
    components:{
        orderItem
    },
    data() {
        return {
            // 0待付款1已付款或已支付定金待发货2已发货待收货，3已收货 -1订单异常或取消
            type:'all',
            query:{
                page:1,
                size:5,
                type:''
            },
            total:-1,
            list:[],
        }
    },
    methods: {
        查询订单(){
            this.$Loading(1)
            this.query.type = this.type == 'all' ? '' : this.type
            this.$axios.post('/Order/getOrder',this.query).then(res => {
                console.log(res)
                if(res.code==1){
                    this.list = res.data.data
                    this.total = res.data.total
                }
                this.$Loading()
            }).catch(err => {
                this.$Loading()
            })
        },
        fenye(i){
            this.query.page = i
            this.查询订单()
        }
    },
    mounted() {
        this.查询订单()
    },
    watch:{
        type(){
            this.total = -1
            this.query.page = 1
            this.查询订单()
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1{
    line-height: 60px;
    font-size: 22px;
}

.pagination{
    text-align: right;
}


</style>