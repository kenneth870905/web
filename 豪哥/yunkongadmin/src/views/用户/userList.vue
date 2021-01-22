<template>
    <div>
        <div class="header-1">
            <el-input size="small" placeholder="请输入用户名" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table :data="list" border size="mini">
            <el-table-column label="id" width="50px" prop="id" align="center"></el-table-column>
            <el-table-column label="账号" prop="name"></el-table-column>
            <el-table-column label="余额" prop="balance">
                <template slot-scope="s">
                    <div>
                        {{s.row.balance | jiage}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="注册时间" prop="createdAt" width="150px"></el-table-column>

            <el-table-column label="操作" width="100px" align="center">
                <template slot-scope="s">
                    <el-button type size="mini" @click="$router.push(`/user?id=`+s.row.id)">详情</el-button>
                    <!-- <el-button type="warning" size="mini">设备记录</el-button> -->
                    <!-- <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{button:'a1',item:s.row}">资金记录</el-dropdown-item>
                            <el-dropdown-item :command="{button:'a2',item:s.row}">设备信息</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" :total="total" :page-size="10" @current-change="changePage" layout="prev, pager, next" background></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input3: "",
            list: [],
            query:{
                page:1,
                size:10
            },
            total:0
        }
    },
    filters:{
        jiage(num) {
            if(num==0){
                return 0
            }
            return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num / 100)
        }
    },
    methods: {
        changePage(i) {
            this.query.page = i
            this.getList()
        },
        handleCommand(a) {
            console.log(a)
        },
        getList(){
            this.$axios.get('/api/user',this.query).then(res => {
                console.log(res)
                if(res.code===0){
                    this.list = res.data
                    this.total = res.total
                }
            }).catch(err => {
            })
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.header-1{
    text-align: right;
    margin: 0px 0px 10px;
    .input-with-select{
        width: 300px;
    }
}
// 下拉选项样式
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}

.pagination {
    margin: 10px 0px;
    text-align: right;
}
</style>