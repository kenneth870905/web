<template>
    <div class="考勤记录">
        <div class="header">
            <div class="input_1">
                <el-input size="small" placeholder="请输入账号" v-model="query.account" class="input-with-select">
                    <el-button @click="查询()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <el-table class="table" border :data="list" size="mini" style="width: 100%">
            <el-table-column align="center" prop="userId" label="操作员" width="180">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="交易单号" width="180">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="币种">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="数量">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="价格">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="总金额">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="昵称">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="实名">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="交易时间">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="买卖">
            </el-table-column>
            <el-table-column align="center" label="类型">
                <template slot-scope="scope">
                    <div :class="scope.row.type==1 ? '红色' : '绿色'">
                        {{ scope.row.type == 1 ? '下班卡':"上班卡"}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            query: {
                page:1,
                pageSize:3
            },
            list: [],
            total:0
        }
    },
    methods: {
       
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.header {
    margin: 0px 0px 20px;
    display: flex;
    justify-content: flex-end;
    .input_1 {
        width: 300px;
    }
}
.考勤记录 {
    padding: 20px;
}
.红色{
    color: red;
}
</style>