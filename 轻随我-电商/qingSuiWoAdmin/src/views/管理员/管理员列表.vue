<template>
    <div>
        <div class="title1">
            <span>管理员设置</span>
            <el-button type @click="$router.push('/index/admin')" size="small">添加管理员</el-button>
        </div>

        <div class="table">
            <el-table :data="list" size="mini" border>
                <el-table-column prop="id" label="id" width="50px"></el-table-column>
                <el-table-column prop="name" label="账号"></el-table-column>
                <el-table-column label="权限">
                    <template slot-scope="s">
                        <div class="权限">
                            <span v-for="item in s.row.roles">{{权限[item]}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="s" v-if="s.row.name!='admin'">
                        <el-button type @click="$router.push(`/index/admin?id=${s.row.id}`)" size="mini">修改</el-button>
                        <el-button @click="删除(s.row)" type="danger" size="mini">删除</el-button>
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
    name: "",
    data() {
        return {
            list: [],
            query: {
                size: 10,
                page: 1
            },
            total: 0,
            权限: {
                Admin: '拥有所有权限',
                ProductRead: "商品读取",
                ProductWrite: "商品添加/修改",
                UserRead: "用户读取",
                UserWrite: "用户添加/更改",
                OrderRead: "订单读取",
                OrderWrite: "订单修改"
            }
        }
    },
    methods: {
        删除(item) {
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/admin/${item.id}`,'')
                .then(res => {
                    console.log(res)
                    if(res.code===0){
                        this.正确('删除成功')
                        this.获取管理员()
                    }else{
                        this.错误(res.message)
                    }
                })
                .catch(err => {
                    this.错误('删除失败，请联系管理员')
                })
            })
        },
        changePage(i) {
            this.query.page = i
            this.获取管理员()
        },
        获取管理员() {
            this.$axios.get('/api/admin', { params: this.query })
                .then(res => {
                    if (res.code === 0) {
                        this.total = res.total
                        this.list = res.data
                    }
                })
                .catch(err => {
                })
        }
    },
    mounted() {
        this.获取管理员()
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
.table {
    margin: 10px 0px;
}

.权限 {
    span {
        display: inline-block;
        white-space: nowrap;
        padding: 3px 5px;
        background: #f1f1f1;
        margin: 3px;
    }
}

.分页 {
    text-align: right;
    margin: 10px 0px;
}
</style>