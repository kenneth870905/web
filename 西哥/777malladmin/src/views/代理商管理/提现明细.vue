<template>
    <div>
        <div class="header-1">
            <el-input class="r15" placeholder v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:80px" v-model="账号类型" slot="prepend">
                    <el-option label="账号" value></el-option>
                    <el-option label="Id" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type size="mini">查询</el-button>
        </div>

        <el-table class="table" v-loading="loading" :data="list" border stripe  size="mini" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <!-- <el-table class="table" v-loading="loading" :data="list" border size="mini" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> -->
            <el-table-column label="用户id" prop="uid" width="60px" align="center">
                <template slot-scope="s">
                    <userPopover>
                        <el-button type="text">{{s.row.uid}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column label="金额" prop="amount"></el-table-column>
            <el-table-column label="收费" prop="charges"></el-table-column>
            <el-table-column label="备注" prop="remarks"></el-table-column>
            <el-table-column label="审核时间" prop="reviewed_at"></el-table-column>
            <el-table-column label="审核人" prop="reviewer"></el-table-column>
            <el-table-column label="状态" prop="state">
                <template slot-scope="s">
                    {{state[s.row.state]}}
                </template>
            </el-table-column>
            <el-table-column label="进度" prop="">
                <template slot-scope="s">
                    {{step[s.row.step]}}
                </template>
            </el-table-column>
            <el-table-column label="" prop=""></el-table-column>
            <el-table-column label="时间" prop="created_at">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]" :current-page="query.page" :page-count="pageCount" @current-change="fenye" @size-change="changeSize"></el-pagination>

    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            账号类型: "",
            会员账号: "",
            // list: [
            //     { id: 1, },
            //     { id: 2, },
            //     {
            //         id: 3,
            //         children: [{ id: 31 }, { id: 32 }]
            //     },
            //     { id: 4 }
            // ],
            // state 1 -1 0  分别对应 成功/失败/等待
            state:{
                1:'成功',
                '-1':'失败',
                0:'等待'
            },
            step:{
                1:'正在审核',
                2:'正在出款',
                3:'审核完毕'
            },
            

            query: {
                page: 1,
                size: 10
            },
            list: [],
            loading: false,
            pageCount: 0

        }
    },
    methods: {
         changeSize(size){
            this.query.page = 1 
            this.query.size = size
            this.AgentDetails()
        },
        fenye(i){
            this.query.page = i
            this.AgentDetails()
        },
        AgentDetails() {
            this.loading=true
            this.$axios.get('AgentWithdrawRecords',{params:this.query}).then(res => {
                if(res.result){
                    this.list = res.data
                    this.pageCount = res.last_page  
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
                console.error(err); 
            })
        }
    },
    mounted() {
        this.AgentDetails()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 10px;
    .r15 {
        margin-right: 15px;
    }
    span {
        font-size: 14px;
    }
}
.table{
    min-height: 300px;
}
</style>