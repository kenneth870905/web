<template>
    <div class="商品列表">
        <div class="header1">
            <el-button @click="$router.push('/index/product')" type="primary" size="small">添加商品</el-button>
        </div>

        <div class="table">
            <el-table :data="list" border size="small">
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <el-table-column label="商品名称" prop="name"></el-table-column>
                <el-table-column label="一级价格" prop="levelOnePrice"></el-table-column>
                <el-table-column label="二级价格" prop="levelTwoPrice"></el-table-column>
                <el-table-column label="积分价格" prop="creditPrice"></el-table-column>
                <el-table-column label="购买级别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.level==0">所有用户</span>
                        <span v-if="scope.row.level==1">一级和二级用户</span>
                        <span v-if="scope.row.level==2">二级用户</span>
                    </template>
                </el-table-column>
                <el-table-column label="返利">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isKickback">无</span>
                        <span v-else>{{scope.row.kickbackRate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="销量" prop="soldCount"></el-table-column>
                <el-table-column label="创建时间" prop="createdAt"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button @click="$router.push(`/index/product?id=${scope.row.id}`)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
                        <el-button @click="删除(scope.row)" type="danger" size="mini" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            list: [],
            total: 0,
            query: {
                page: 1,
                size: 8
            }
        }
    },
    methods: {
        getList() {
            this.$axios.get('/api/product', { params: this.query }).then(res => {
                if (res.code != 0) return
                this.list = res.data;
                this.total = res.total
            })
        },
        changePage(i) {
            this.query.page = i;
            this.getList()
        },
        删除(item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$loading(1)
                this.$axios.delete(`/api/product/${item.id}`).then(res => {
                    if (res.code == 0) {
                        this.$message({ showClose: true, message: '删除成功', type: 'success' });
                    } else {
                        this.$message({ showClose: true, message: '删除失败', type: 'error' });
                    }
                    this.getList()
                    this.$loading(0)
                }).catch(err => {
                    this.$loading(0)
                    this.$message({ showClose: true, message: '删除失败', type: 'error' });
                })
            })
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.商品列表 {
    // height: 100%;
}
.header1 {
    margin: 0px 0px 10px;
    text-align: right;
}
.table {
    min-height: 400px;
}
.分页 {
    text-align: right;
    margin: 10px 0px;
}
</style>