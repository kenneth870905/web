<template>
    <div>
        <div class="title1">
            <span>会员管理</span>
            <el-button type="" size="mini" @click="查看所有积分()">积分变化(所有人)</el-button>
        </div>
        <div class="table">
            <el-table :data="list" border size="mini">
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <img class="touxiang" :src="scope.row.avatarUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickName"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        {{scope.row.gender==1 ? '男' : "女"}}
                    </template>
                </el-table-column>
                <el-table-column label="级别" prop="level"></el-table-column>
                <el-table-column label="积分" prop="credit"></el-table-column>
                <el-table-column label="佣金" prop="kickback"></el-table-column>
                <el-table-column label="消费金额" prop="totalCost"></el-table-column>
                <el-table-column label="下级人数" prop="subordinateCount"></el-table-column>
                <el-table-column label="创建时间" prop="createdAt" width="150px"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <!-- <el-button @click="删除(scope.row)" type="danger" size="mini" icon="el-icon-delete" circle></el-button> -->
                        <el-button @click="$router.push(`/index/user?id=${scope.row.id}`)"  type="primary" size="mini">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="积分统计" class="全部统计" :visible.sync="显示全部积分" width="800px">
            <div class="积分统计">
                <div class="title2">
                    <div>选择日期查询</div>
                    <el-date-picker value-format="yyyy-MM-dd" @change="changeTime3" size="small" v-model="time3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="table2">
                    <el-table :data="list3" border size="mini">
                        <el-table-column width="100px" label="会员名称" prop="toUserName"></el-table-column>
                        <el-table-column width="150px" label="时间" prop="createdAt"></el-table-column>
                        <el-table-column label="变更详情" prop="content"></el-table-column>
                    </el-table>
                </div>
                <div class="分页">
                    <el-pagination background @current-change="changePage3" :page-size="query.size" layout="prev, pager, next" :total="total3">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: "",
    data() {
        return {
            query: {
                page: 1,
                size: 10
            },
            total: 0,
            list: [],
            user: {},
            newCredit: 0,
            dialogVisible: false,
            
            //全部
            time3:[
                moment().subtract(7,'days').format('YYYY-MM-DD'),
                moment().add(1,'days').format('YYYY-MM-DD')
            ],
            显示全部积分:false,
            list3:[],
            total3:0,
            q3:{
                page:1,
                size:10
            }
            
        }
    },
    methods: {
        getList() {
            this.$axios.get('/api/user/', { params: this.query }).then(res => {
                if (res.code === 0) {
                    this.list = res.data
                    this.total = res.total
                }
            })
        },
        changePage(i) {
            this.query.page = i
            this.getList()
        },
        
        查看所有积分(){
            this.显示全部积分 = true
            this.q3.page = 1
            this.q3.size = 10
            this.查询所有积分变动()
        },
        查询所有积分变动(){
            var q = {
                uid:"",
                page:this.q3.page,
                size:this.q3.size,
                startDate:this.time3 ? this.time3[0] : '',
                endDate:this.time3 ?  this.time3[1] : ''
            }
            this.$axios.get('/api/creditLog',{params:q}).then(res => {
                if(res.code===0){
                    this.list3 = res.data
                    this.total3 = res.total
                }
            }).catch(err => {})
        },
        changePage3(i){
            this.q3.page = i
            this.查询所有积分变动()
        },
        changeTime3(){
            this.q3.page = 1
            this.查询所有积分变动()
        }
    },
    mounted() {
        this.getList()        
    },
    watch: {
        newCredit(newValue, old) {
            this.newCredit = newValue ? parseFloat(newValue) : 0
        }
    }
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table {
    min-height: 400px;
}
.分页 {
    text-align: right;
    margin: 10px 0px;
}

.touxiang {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
.提示 {
    margin: 0px 0px 25px;
    span {
        color: red;
    }
}
.修改积分{
    /deep/ .el-dialog__body {
        padding: 0px 20px;
    }
}
.个人统计{
    /deep/ .el-dialog__body {
        padding: 0px 20px 5px;
    }
}

.积分统计{
    .title2{
        >div{
            margin: 0px 0px 3px;
        }
    }
    .table2{
        min-height: 400px;
    }
}

.全部统计{
    /deep/ .el-dialog__body {
        padding: 0px 20px 5px;
    }
}
</style>
