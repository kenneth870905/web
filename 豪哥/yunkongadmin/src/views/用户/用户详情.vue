<template>
    <div class="xiangqing">
        <el-tabs tab-position="left" class="tabs" v-model="val1" @tab-click="changeTabs">
            <el-tab-pane label="基本信息">
                <el-form label-width="200" size="mini">
                    <el-form-item label="用户Id">
                        {{user.id}}
                    </el-form-item>
                    <el-form-item label="用户名">
                        {{user.name}}
                    </el-form-item>
                    <el-form-item label="账号余额">
                        {{user.balance | jiage}}
                    </el-form-item>
                    <el-form-item label="注册时间">
                        {{user.createdAt}}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="充值记录">
                <el-table :data="chongzhi.list" size="mini"  v-loading="chongzhi.loading">
                    <el-table-column label="id" prop="id" width="100px" align="center"></el-table-column>
                    <el-table-column label="金额">
                        <template slot-scope="s">
                            {{s.row.amount | jiage}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="s">
                            <span v-if="s.row.status==1">待审核</span>
                            <span class="status_2" v-if="s.row.status==2">已通过</span>
                            <span class="status_3" v-if="s.row.status==3">已拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="createdAt"></el-table-column>
                </el-table>
                <el-pagination class="pagination" :total="chongzhi.total" :page-size="10" @current-change="chongzhi.changePage" layout="prev, pager, next"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="设备购买/续费记录">
                <el-table :data="shebei.list" size="mini" v-loading="shebei.loading">
                    <el-table-column label="id" prop="id" width="50px" align="center"></el-table-column>
                    <el-table-column label="设备setId" prop="setId" align="center"></el-table-column>
                    <el-table-column label="orderId" prop="orderId">
                    </el-table-column>
                    <el-table-column label="时间" prop="createdAt"></el-table-column>
                </el-table>
                <el-pagination class="pagination" :total="shebei.total" :page-size="10" @current-change="shebei.changePage" layout="prev, pager, next"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            val1:'0',
            userId:'',
            user:{},
            chongzhi:{
                list:[],
                total:0,
                loading:false,
                query:{
                    uid:'', page:1, size:10
                },
                changePage:(i)=>{
                    this.query.page = i
                    this.获取充值记录()
                }
            },
            shebei:{
                list:[],
                total:0,
                loading:false,
                query:{
                    uid:'', page:1, size:10
                },
                changePage:(i)=>{
                    this.query.page = i
                    this.获取订单记录()
                }
            }
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
        changeTabs(e){
            if(e.index==0){
                // console.log('第一样')
            }else if(e.index==1){
                if(this.chongzhi.list.length==0)
                this.获取充值记录()
            }else{
                if(this.shebei.list.length==0)
                this.获取订单记录()
            }
        },
        获取用户信息(){
            this.$axios.get(`/api/user/${this.userId}`,'')
            .then(res => {
                if(res.code===0){
                    this.user = res.data
                }
            })
            .catch(err => {
            })
        },
        获取充值记录(){
            this.chongzhi.query.uid = this.userId
            this.chongzhi.loading = true
            this.$axios.get('/api/loadrecord',this.chongzhi.query).then(res => {
                console.log(res)
                if(res.code===0){
                    this.chongzhi.list = res.data
                    this.chongzhi.total = res.total
                }
                this.chongzhi.loading = false
            })
            .catch(err => {
                this.chongzhi.loading = false
            })
        },
        获取订单记录(){
            this.shebei.query.uid = this.userId
            this.shebei.loading = true
            this.$axios.get('/api/order',this.shebei.query).then(res => {
                console.log(res)
                if(res.code===0){
                    this.shebei.list = res.data
                    this.shebei.total = res.total
                }
                this.shebei.loading = false
            })
            .catch(err => {
                this.shebei.loading = false
            })
        }
    },
    mounted() {
        this.userId = this.$route.query.id

        this.获取用户信息()
        // this.获取充值记录()
        // this.获取订单记录()
    },
}
</script>


<style lang="scss" scoped>
.xiangqing{
    height: 100%;
}
.tabs{
    height: 100%;
}
.pagination{
    margin: 10px;
    text-align: right;
}
.status_2{
    color: #0036fc;
}
.status_3{
    color: red;
}
</style>