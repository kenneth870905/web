<template>
    <div>
        <el-table :data="list" border size="mini">
            <el-table-column label="id" prop="id" width="50px" align="center"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="收款账户" prop="description"></el-table-column>
            <el-table-column label="充值金额">
                <template slot-scope="s">
                    {{s.row.amount | qian}}                        
                </template>
            </el-table-column>
            <el-table-column label="充值单号" prop="billNo"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="s">
                    <span v-if="s.row.status==1" style="color:#b5b5b5">待审核</span>
                    <i v-if="s.row.status==2" class="绿色 el-icon-check"></i>
                    <i v-if="s.row.status==3" class="red-text el-icon-close"></i>
                </template>
            </el-table-column>
            <el-table-column label="时间" prop="createdAt"></el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <template slot-scope="s">
                    <el-button v-if="s.row.status==1" @click="入款(0,s.row)" type size="mini">拒绝入款</el-button>
                    <el-button  v-if="s.row.status==1" @click="入款(1,s.row)" type="warning" size="mini">同意入款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" :total="total" :page-size="query.size" @current-change="changePage" layout="prev, pager, next" background></el-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            list: [],
            query:{
                uid:"", page:1, size:10
            },
            total:0
        }
    },
    filters:{
        qian(num){
            return  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num/100)
        }
    },
    methods: {
        changePage(i){
            this.query.page = i 
            this.getList()
        },
        async 入款(type,item) {
            if(type){
                var str = "确定同意入款，确认后会自动将用户的余额加上？"
                var type = 'success'
                var url = `/api/loadrecord/${item.id}/confirm`
            }else{
                var str = "确定拒绝入款？"
                var type = 'warning'
                var url = `/api/loadrecord/${item.id}/disable`
            }
            
            await new Promise((resolve, reject) => {
                this.$confirm(str, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: type
                }).then(() => {
                    resolve()
                }).catch(() => {});
            });

            this.$loading()
            this.$axios.post(url,'').then(res => {
                console.log(res)
                if(res.code===0){
                    this.正确('设置成功')
                    this.getList()
                }else{
                    this.错误(res.message)
                }
                this.$loading().close()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$loading().close()
                console.error(err); 
            })
        },
        getList(){
            this.$axios.get('/api/loadrecord',this.query).then(res => {
                if(res.code===0){
                    this.total = res.total
                    this.list = res.data
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
.绿色{
    color: #029200;
}
.red-text{
    color: red;
}
.pagination{
    margin: 10px 0px;
    text-align: right;
}
</style>