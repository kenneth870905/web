<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-select class="r15" v-model="时间类型" size="mini" style="width: 100px;">
                <el-option label="入款时间" value></el-option>
                <el-option label="提交时间" value="1"></el-option>
            </el-select>
            <el-date-picker class="r15" style="width: 310px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
            <el-input class="r15" v-model="单号" placeholder="单号" size="mini" style="width: 120px;"></el-input>
            <el-select class="r15" v-model="状态" size="mini" style="width: 100px;">
                <el-option label="全部状态" value></el-option>
                <el-option label="状态1" value="1"></el-option>
                <el-option label="状态2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="商家" size="mini" style="width: 100px;">
                <el-option label="全部商家" value></el-option>
                <el-option label="商家1" value="1"></el-option>
                <el-option label="商家2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="方式" size="mini" style="width: 150px;">
                <el-option label="全部支付方式" value></el-option>
                <el-option label="支付宝" value="1"></el-option>
                <el-option label="微信" value="1"></el-option>
            </el-select>
            <el-checkbox class="r15" v-model="手动完成" size="mini" label="手动完成" border></el-checkbox>
            <el-select class="r15" v-model="会员类型" size="mini" style="width: 100px;">
                <el-option label="普通会员" value></el-option>
                <el-option label="全部会员" value="1"></el-option>
            </el-select>
            <el-input class="r15" v-model="会员名" placeholder="会员账号" size="mini" style="width: 120px;"></el-input>
            <el-button type="" size="mini">查询</el-button>
        </div>

        <el-table :data="list" border stripe size="mini">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="订单编号"></el-table-column>
            <el-table-column label="商户单号"></el-table-column>
            <el-table-column label="会员账号"></el-table-column>
            <el-table-column label="金额"></el-table-column>
            <el-table-column label="打码量"></el-table-column>
            <el-table-column label="支付商家"></el-table-column>
            <el-table-column label="支付方式"></el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="提交时间"></el-table-column>
            <el-table-column label="完成时间"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="100"></el-pagination>
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
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            时间类型:"",
            time:"",
            单号:"",
            状态:"",
            商家:"",
            方式:"",
            手动完成:"",
            会员类型:"",
            会员名:""

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