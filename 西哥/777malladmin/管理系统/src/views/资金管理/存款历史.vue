<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-select class="r15" v-model="时间类型" size="mini" style="width: 100px;">
                <el-option label="入款时间" value></el-option>
                <el-option label="提交时间" value="1"></el-option>
            </el-select>
            <el-date-picker class="r15" style="width: 310px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" ></el-date-picker>
            <el-input class="r15" v-model="单号" placeholder="单号" size="mini" style="width: 120px;"></el-input>
            <el-select class="r15" v-model="负责人" size="mini" style="width: 120px;">
                <el-option label="全部负责人" value></el-option>
                <el-option label="张三" value="1"></el-option>
                <el-option label="李四" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="结果" size="mini" style="width: 100px;">
                <el-option label="全部结果" value></el-option>
                <el-option label="通过" value="1"></el-option>
                <el-option label="未通过" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="会员" size="mini" style="width: 100px;">
                <el-option label="全部会员" value></el-option>
                <el-option label="普通会员" value="1"></el-option>
                <el-option label="其他会员" value="1"></el-option>
            </el-select>
            <el-input class="r15" v-model="账号" placeholder="会员账号" size="mini" style="width: 150px;"></el-input>
            <el-button type="" size="mini">查询</el-button>
        </div>
        <div class="header-1">
            <span>操作：</span>
            <el-button type="" size="mini">导出金额</el-button>
        </div>

        <el-table :data="list" border stripe size="mini">
            <el-table-column label="编号/时间"></el-table-column>
            <el-table-column label="会员账号"></el-table-column>
            <el-table-column label="分成"></el-table-column>
            <el-table-column label="入款人/单号"></el-table-column>
            <el-table-column label="支付方式/单号"></el-table-column>
            <el-table-column label="次数"></el-table-column>
            <el-table-column label="收款银行信息"></el-table-column>
            <el-table-column label="结果"></el-table-column>
            
            <el-table-column label="审核者/时间"></el-table-column>
            <el-table-column label="申请金额"></el-table-column>
            <el-table-column label="优惠"></el-table-column>
            <el-table-column label="彩金"></el-table-column>
            <el-table-column label="打码量"></el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="会员备注"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="100"></el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            时间类型:"",
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
            负责人:"",
            结果:"",
            会员:"",
            账号:""
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