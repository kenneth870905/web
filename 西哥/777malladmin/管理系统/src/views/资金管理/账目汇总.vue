<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 310px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
            <el-input class="r15" style="width: 150px;" v-model="代理" size="mini" placeholder="代理"></el-input>
            <el-button type size="mini">查询</el-button>
        </div>
        <el-table :data="list" border stripe size="mini" :span-method="arraySpanMethod">
            <el-table-column label="项目名称" prop="name"></el-table-column>
            <el-table-column label="收入笔数"></el-table-column>
            <el-table-column label="收入金额" prop="money"></el-table-column>
            <el-table-column label="支出项目"></el-table-column>
            <el-table-column label="支出笔数"></el-table-column>
            <el-table-column label="支出金额"></el-table-column>
        </el-table>

        <div class="chehui">
            <div>（资金明细/会员订单）</div>
            <div>撤单数量：<span>0</span> / <span>0</span></div>
            <div>撤单金额：<span>0</span> / <span>0</span> <a href="javascript:;">查询资金明细</a> </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            list: [
                { name: '公司入款' }, { name: '线上支付' }, { name: '取款手续费' }, { name: '取款行政费' }, { name: '手动存款',money:10 }, { name: '平台输赢',money:10 },
            ],
            time: "",
            代理: ""
        }
    },
    methods: {
        arraySpanMethod(value) {
            if(value.row.name=='平台输赢' ){
                if(value.columnIndex==0){
                    return [1,2]
                }else if(value.columnIndex==1){
                    return [0,0]
                }
            }
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
    > * {
        margin-bottom: 10px;
    }
    span {
        font-size: 14px;
    }
}
.chehui{
    font-size: 14px;
    margin: 15px 0px;
    span{
        color: red;
    }
    a{
        color: #428bca;
    }
}
</style>