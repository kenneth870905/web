<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>充值记录</BreadcrumbItem>
        </Breadcrumb>

        <Table class="table" :loading="loading" border :columns="columns" :data="list">
            <template slot-scope="{ row, index }" slot="status">
                <span class="status_1" v-if="row.status==1">处理中</span>
                <span class="status_2" v-if="row.status==2">已到账</span>
                <span class="status_3" v-if="row.status==3">驳回</span>
            </template>
        </Table>

        <Page class="分页" :total="total" :page-size="q.size" @on-change="changePage"/>


    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            columns:[
                {
                    title: 'id',
                    key: 'id',
                    width:100
                },
                {
                    title: '金额',
                    key: 'amount',
                },{
                    title:"充值单号",
                    key:"billNo"
                },
                {
                    title: '状态',
                    slot: 'status',
                },
                {
                    title: '提交时间',
                    key: 'createdAt',
                    width:200
                },
            ],
            q: {
                page: 1, size: 3 , uid:""
            },
            list:[],
            total:0,
            loading:true
        }
    },
    computed:{
        ...mapState({
            userInfo:"userInfo"
        })
    },
    methods: {
        orderList() {
            this.loading=true
            this.q.uid = this.userInfo.id
            this.$axios.get(`/api/loadrecord`, { params: this.q })
                .then(res => {
                    console.log(res)
                    if(res.data.code===0){
                        this.total = res.data.total
                        this.list = res.data.data
                    }
                    this.loading=false
                })
                .catch(err => {
                    this.loading=false
                })
        },
        changePage(i){
            console.log(i)
            this.q.page = i
            this.orderList()
        }
    },
    mounted() {
        this.orderList()
    },
}
</script>

<style lang="scss" scoped>
.订单列表{
    background: #fff;
}
.Breadcrumb{
    border-bottom: 1px solid #eee;
    padding: 0px 0px 5px;
}
.table{
    margin: 15px 0px 0px;
}
.分页{
    margin: 10px 0px 0px;
    text-align: right;
}

.status_2{
    color: #007dfd;
}
.status_3{
    color:red;
}
</style>