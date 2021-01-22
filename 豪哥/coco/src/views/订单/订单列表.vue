<template>
    <div class="订单列表">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单记录</BreadcrumbItem>
        </Breadcrumb>
        
        <Table class="table" :loading="loading" border :columns="columns" :data="list">
            <template slot-scope="{ row, index }" slot="xinhao">
                {{filterName(row.setId)}}
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
                    title: '型号',
                    slot: 'xinhao',
                },
                {
                    title: '购买时间',
                    key: 'createdAt',
                    width:200
                },
            ],
            q: {
                page: 1, size: 3
            },
            list:[],
            total:0,
            loading:true
        }
    },
    computed:{
        ...mapState({
            设备类型:"设备类型"
        })
    },
    methods: {
        filterName(setId){
            return this.设备类型.find(x=>x.setId == setId) ? this.设备类型.find(x=>x.setId == setId).name : '' 
        },
        orderList() {
            this.loading=true
            this.$axios.get(`/api/order`, { params: this.q })
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
    min-height: 300px;
}
.分页{
    margin: 10px 0px 0px;
    text-align: right;
}
</style>