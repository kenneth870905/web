<template>
    <div class="app-container">
        <div class="header-1">
            <el-input placeholder="输入id/昵称/账号查询" v-model="query.filter" style="width: 250px;" size="small">
                <el-button slot="append" icon="el-icon-search" @click="搜索()"></el-button>
            </el-input>
        </div>
        <el-table :data="list" size="mini" border>
            <el-table-column label="id" prop="id" align="center" width="50px"></el-table-column>
            <el-table-column label="账号" prop="userName"></el-table-column>
            <el-table-column label="昵称" prop="nickName"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="注册时间" width="150px" align="center" prop="creationTime"></el-table-column>
        </el-table>
        <el-pagination class="分页" :total="total" :page-size="query.size" :current-page="query.page" @current-change="fenye" background layout="prev, pager, next"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            total: 0,
            loading: false,
            query: {
                page: 1,
                size: 10,
                filter: ''
            }
        }
    },
    methods: {
        getList() {
            this.loading = true
            this.$axios.post('/user/userList', this.query)
                .then(res => {
                    console.log(res)
                    this.list = res.data
                    this.total = res.total
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        fenye(i) {
            this.query.page = i
            this.getList()
        },
        搜索(){
            this.query.page = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.header-1{
    margin: 0px 0px 10px;
}
</style>
