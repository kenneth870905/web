<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" style="width: 310px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" start-placeholder="计划封盘时间" end-placeholder="计划封盘时间" ></el-date-picker>
            <el-input class="r15" v-model="单号" placeholder="单号" size="mini" style="width: 120px;"></el-input>
            <el-input class="r15" v-model="代理" placeholder="代理" size="mini" style="width: 120px;"></el-input>
            <el-select class="r15" v-model="会员类型" size="mini" style="width: 100px;">
                <el-option label="全部会员" value></el-option>
                <el-option label="普通会员" value="1"></el-option>
                <el-option label="其他会员" value="1"></el-option>
            </el-select>
            <el-input class="r15" v-model="会员" placeholder="会员账号" size="mini" style="width: 120px;"></el-input>
            <el-button type="primary" size="mini">查询</el-button>
        </div>
        <div class="header-1">
            <span>相关操作：</span>
            <el-button size="mini">手动存款</el-button>
            <el-button size="mini">手动扣款</el-button>
            <el-button size="mini">代理赠送彩金</el-button>
        </div>


        <el-table :data="list" border stripe size="mini" @sort-change="change1">
            <el-table-column label="订单"></el-table-column>
            <el-table-column label="账号"></el-table-column>
            <el-table-column label="金额"></el-table-column>
            <el-table-column label="余额"></el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="时间"></el-table-column>
            <el-table-column label="操作者"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="100"></el-pagination>

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
            代理:"",
            会员类型:"",
            会员:"",

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