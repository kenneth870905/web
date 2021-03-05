<template>
    <div class="考勤记录">
        <div class="header">
            <div>
                <el-select size="mini" v-model="query.banci" placeholder="请选择">
                    <el-option label="全天" value=""></el-option>
                    <el-option label="早班" value="1"></el-option>
                    <el-option label="中班" value="2"></el-option>
                    <el-option label="晚班" value="3"></el-option>
                </el-select>
            </div>
            <div>
                <el-date-picker size="mini" v-model="query.riqi" :type="timeType==0 ? 'date' : 'month'" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                <el-button size="mini" @click="切换日期类型()">{{timeType==0 ? '按月' :"按天"}}</el-button>
            </div>
            <div>
                <el-input size="mini" placeholder="请输入操作员昵称" v-model="query.nickname" class="input-with-select"></el-input>
            </div>
            <div>
                <el-input size="mini" placeholder="请输入操作员账号" v-model="query.caozuoyuan" class="input-with-select">
                    <el-button @click="查询()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <el-table class="table" border :data="list" size="mini" style="width: 100%">
            <el-table-column align="center" prop="caozuoyuan" label="操作员" width="180">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column align="center" prop="riqi" label="日期" width="180"></el-table-column>
            <el-table-column align="center" label="班次">
                <template slot-scope="scope">
                    <span v-if="scope.row.banci == 1">早班</span>
                    <span v-else-if="scope.row.banci == 2">中班</span>
                    <span v-else>晚班</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="fbgoumaibishu" label="FB购买笔数">
            </el-table-column>
            <el-table-column align="center" prop="fbchushoubishu" label="FB出售笔数">
            </el-table-column>
            <el-table-column align="center" prop="fabilirun" label="法币利润">
            </el-table-column>
            <el-table-column align="center" prop="bbgoumaibishu" label="BB购买笔数">
            </el-table-column>
            <el-table-column align="center" prop="bbchushoubishu" label="BB出售笔数">
            </el-table-column>
            <el-table-column align="center" prop="bblirun" label="币币利润">
            </el-table-column>
            <el-table-column align="center" prop="zonglirun" label="总利润">
            </el-table-column>
        </el-table>

        <div class="fenye">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="query.pageSize"
                @current-change="fenye">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                query: {
                    page: 1,
                    row: 10,
                    banci: "",      // 1 代表早，2代表中，3代表晚
                    riqi: "",
                    caozuoyuan: "",
                },
                timeType:0,   // 0按天 1 按月
                list: [],
                total: 0
            }
        },
        methods: {
            查询(){
                this.query.page = 1;
                this.g1();
            },
            切换日期类型(){
                this.timeType = this.timeType==0 ? 1 : 0;
                this.query.riqi = ''
            },
            fenye(index) {
                this.query.page = index;
                this.g1();
            },
            g1() {
                this.$axios.post('/huobi/public/index.php/Excelsearch/index', this.query).then(x => {
                    if (x.data.code == 1) {
                        this.list = x.data.data;
                        this.total = x.data.total;
                    } else {
                        this.$message({ showClose: true, message: x.data.message, type: 'error' });
                    }
                }).catch(err => {
                    this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
                })
            }
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
        /* justify-content: flex-end; */
        >div{
            margin: 0px 15px 0px 0px;
        }
        .input_1 {
            width: 300px;
        }
    }

    .考勤记录 {
        padding: 20px;
    }

    .红色 {
        color: red;
    }

    .table {
        min-height: 300px;
    }

    .fenye {
        text-align: center;
        margin: 20px 0px 0px;
    }
</style>