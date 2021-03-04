<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
            <el-input class="r15" v-model="单号" placeholder="单号" size="mini" style="width: 100px;"></el-input>
            <el-input class="r15" v-model="期号" placeholder="期号" size="mini" style="width: 100px;"></el-input>
            <el-select class="r15" v-model="彩种" placeholder="彩种" size="mini" style="width: 100px;">
                <el-option label="全部彩种" value></el-option>
                <el-option label="彩种1" value="1"></el-option>
                <el-option label="彩种2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="类型" placeholder="类型" size="mini" style="width: 100px;">
                <el-option label="全部类型" value></el-option>
                <el-option label="类型1" value="1"></el-option>
                <el-option label="类型2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="盈亏" placeholder="盈亏" size="mini" style="width: 100px;">
                <el-option label="全部盈亏" value></el-option>
                <el-option label="盈利" value="1"></el-option>
                <el-option label="亏损" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="合买" placeholder="合买" size="mini" style="width: 100px;">
                <el-option label="全部合买" value=""></el-option>
                <el-option label="合买" value="1"></el-option>
                <el-option label="非合买" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="会员" placeholder="会员" size="mini" style="width: 100px;">
                <el-option label="全部会员" value=""></el-option>
                <el-option label="普通会员" value="1"></el-option>
                <el-option label="内部会员" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="启用" size="mini" style="width: 80px;">
                <el-option label="启用" value=""></el-option>
                <el-option label="停用" value="1"></el-option>
            </el-select>
            <el-input class="r15" v-model="账号" size="mini" placeholder="会员账号" style="width: 100px;"></el-input>
            <el-button type="primary" style="mini" size="mini">查询</el-button>
        </div>

        <el-table :data="list" border size="mini" @sort-change="change1">
            <el-table-column label="异常"></el-table-column>
            <el-table-column label="期号">
                0000000
            </el-table-column>
            <el-table-column label="彩种"></el-table-column>
            <el-table-column label="会员"></el-table-column>
            <el-table-column label="玩法"></el-table-column>
            <el-table-column label="投注内容"></el-table-column>
            <el-table-column label="投注金额"></el-table-column>
            <el-table-column label="操作前余额"></el-table-column>
            <el-table-column label="净利润"></el-table-column>
            <el-table-column label="类别"></el-table-column>
            <el-table-column label="下注时间"></el-table-column>
            <el-table-column label="原始赔率"></el-table-column>
            <el-table-column label="返利"></el-table-column>
            <el-table-column label="结算赔率"></el-table-column>
            <el-table-column label="合买"></el-table-column>
            <el-table-column label="二次开奖"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="1000"></el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            time:"",
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今日',
                        onClick(picker) {
                            picker.$emit('pick', [moment().format('YYYY-MM-DD 00:00:00'), moment().add(1, 'day').format('YYYY-MM-DD 00:00:00')]);
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            picker.$emit('pick', [moment().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 00:00:00')]);
                        }
                    }, {
                        text: '本周',
                        onClick(picker) {
                            let start = moment().startOf('week').format('YYYY-MM-DD 00:00:00')  //本周1
                            let end = moment().add(1, 'day').format('YYYY-MM-DD 00:00:00') //明天
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '上周',
                        onClick(picker) {
                            let start = moment().startOf('week').subtract('week', 1).format('YYYY-MM-DD 00:00:00') //上周1
                            let end = moment().startOf('week').format('YYYY-MM-DD 00:00:00')  //本周1
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '本月',
                        onClick(picker) {
                            let start = moment().startOf('month').format('YYYY-MM-DD 00:00:00') //本月1号
                            let end = moment().add(1, 'day').format('YYYY-MM-DD 00:00:00')
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '上月',
                        onClick(picker) {
                            let start = moment().startOf('month').subtract('month', 1).format('YYYY-MM-DD 00:00:00') //上月1号
                            let end = moment().endOf('month').subtract('month', 1).endOf('month').format('YYYY-MM-DD 23:59:00')
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            单号:"",
            期号:"",
            类型:"",
            彩种:'',
            盈亏:"",
            合买:"",
            会员:"",
            启用:"",
            账号:"",
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
        }
    },
    methods:{
        change1(value){
            console.log(value)
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    margin: 0px 0px 10px;
    .r15 {
        margin-right: 15px;
    }
    >*{
        margin-bottom: 10px;
    }
    span{
        font-size: 14px;
    }
}
</style>