<template>
    <div>
        <div class="title1">
            <span>管理员设置</span>
            <el-button type="" @click="$router.push('/index/admin')" size="small">添加管理员</el-button>
        </div>

        <div class="table">
            <el-table :data="list">
                <el-table-column label="id"></el-table-column>
                <el-table-column>
                    <template slot-scope="s">
                        <el-button type="" size="mini">修改</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            list:[],
            query:{
                size:10,
                page:1
            },
            total:0
        }
    },
    methods: {
        changePage(i){

        }
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    display: flex;
    justify-content: space-between;
}
.table{
    margin: 10px 0px;
}

.分页 {
    text-align: right;
    margin: 10px 0px;
}
</style>