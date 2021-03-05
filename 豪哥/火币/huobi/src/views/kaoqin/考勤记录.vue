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
            <el-table-column align="center" prop="userId" label="账号" width="180">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="打卡时间">
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
        g1() {
            this.$Loading(true);
            this.$axios.post("/huobi/public/index.php/kaoqin/getList", this.query).then(x => {
                console.log(x);
                this.list = x.data.data;
                this.total = x.data.total;
                this.$Loading(false);
            }).catch(err => {
                this.$Loading(false);
                console.log(err);
            });
        },
    },
    mounted() {
        this.g1()
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