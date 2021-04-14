<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            
            <el-input style="width: 150px;" class="r15" size="mini" v-model="代理" placeholder="代理账号"></el-input>
            <el-input class="r15" placeholder="会员账号" v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:100px" v-model="会员类型" slot="prepend">
                    <el-option label="普通会员" value></el-option>
                    <el-option label="高级会员" value="2"></el-option>
                </el-select>
            </el-input>
            <el-select class="r15" v-model="彩种" size="mini" style="width: 100px;">
                <el-option label="全部彩种" value></el-option>
                <el-option label="彩票1" value="1"></el-option>
                <el-option label="彩票2" value="2"></el-option>
            </el-select>
            <el-button type size="mini">查询</el-button>
            <el-button type="success" size="mini">图形报表</el-button>
        </div>
        
         <el-table :data="list" border size="mini" >
            <el-table-column label="日期"></el-table-column>
            <el-table-column label="订单数量"></el-table-column>
            <el-table-column label="投注金额"></el-table-column>
            <el-table-column label="会员数量"></el-table-column>
            <el-table-column label="平台输赢"></el-table-column>
        </el-table>

    </div>
</template>

<script>
import moment from 'moment'
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
            time:"",
            代理: "",
            会员类型: "",
            会员账号: "",
            彩种: "",
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
        }
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
</style>