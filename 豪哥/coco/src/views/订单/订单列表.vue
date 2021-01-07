<template>
    <div class="订单列表">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单记录</BreadcrumbItem>
        </Breadcrumb>
        <Table class="table" border :columns="columns" :data="list"></Table>
        <Page class="分页" :total="100" @on-change="changePage"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns:[
                {
                    title: 'Name',
                    key: 'name'
                },
            ],
            q: {
                page: 1, size: 10
            },
            list:[],
            total:0
        }
    },
    methods: {
        orderList() {
            this.$axios.get(`/api/order`, { params: this.q })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        },
        changePage(i){
            console.log(i)
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