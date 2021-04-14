<template>
    <div class="flex100">
        <div class="header-1">
            <el-input class="r15" placeholder v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:80px" v-model="账号类型" slot="prepend">
                    <el-option label="账号" value></el-option>
                    <el-option label="Id" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type size="mini">查询</el-button>
        </div>

        <el-table class="table" height="100%" v-loading="loading" :data="list" border stripe  size="mini" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <!-- <el-table class="table" v-loading="loading" :data="list" border size="mini" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> -->
            <el-table-column label="用户Id" prop="uid" width="60px" align="center">
                <template slot-scope="s">
                    <userPopover :userId="s.row.uid">
                        <el-button type="text">{{s.row.uid}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column label="等级" prop="level"></el-table-column>
            <el-table-column label="订单ID" prop="oid"></el-table-column>
            <el-table-column label="类别" prop="category"></el-table-column>
            <el-table-column label="金额" prop="amount"></el-table-column>
            <el-table-column label="变更后" prop="amount_after"></el-table-column>
            <el-table-column label="变更前" prop="amount_before"></el-table-column>
            <el-table-column label="时间" prop="created_at">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="" width="100px" align="center">
                <template>
                    <el-button type="" size="mini">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="sizes,prev, pager, next , jumper" :current-page="query.page" :page-count="pageCount" @current-change="fenye" @size-change="changeSize" :page-sizes="[10, 20 , 50]" ></el-pagination>
        
        <!-- <div>
            <el-button type="" @click="$router.push('/BillingDetails')">跳转结算详情</el-button>
            <el-button type="" @click="$router.push('/ordersDetails')">跳转下单详情</el-button>
            <el-button type="" @click="$router.push('/withdrawDetails')">跳转提现详情</el-button>
            <el-button type="" @click="$router.push('/commission')">跳转佣金转入详情</el-button>
        </div> -->

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
            // type:{
            //     '1':'结算',
            //     '2':'下单',
            //     '3':'提现',
            //     '4':'提现撤回',
            //     '5':'佣金转入',
            //     '6':'下单撤回'
            // },

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
            this.query.size = size
            this.query.page = 1
            this.AgentDetails()
        },
        fenye(i){
            this.query.page = i
            this.AgentDetails()
        },
        AgentDetails() {
            this.loading=true
            this.$axios.get('AgentDetails',{params:this.query}).then(res => {
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

.flex100{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.table {
    flex: 1;
}
</style>