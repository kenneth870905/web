<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="type1" size="mini" style="width: 100px;">
                <el-option label="全部项目" value></el-option>
                <el-option label="项目1" value="1"></el-option>
                <el-option label="项目2" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="type2" size="mini" style="width: 100px;">
                <el-option label="全部类型" value></el-option>
                <el-option label="类型1" value="1"></el-option>
                <el-option label="类型2" value="2"></el-option>
            </el-select>
            <el-input class="r15" v-model="type3" placeholder="单号" size="mini" style="width: 150px;"></el-input>
            <el-input class="r15" v-model="type4" placeholder="代理" size="mini" style="width: 150px;"></el-input>
            <el-input class="r15" placeholder="会员账号" v-model="input3" size="mini" style="width: 250px;">
                <el-select style="width:100px" v-model="type5" slot="prepend" placeholder="请选择">
                    <el-option label="普通会员" value></el-option>
                    <el-option label="内部会员" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button size="mini">查询</el-button>
        </div>

        <el-table :data="list" border size="mini">
            <el-table-column fixed="" label="订单编号">
                编号
            </el-table-column>
            <el-table-column fixed="" label="账号"></el-table-column>
            <el-table-column fixed="" label="金额"></el-table-column>
            <el-table-column fixed="" label="项目"></el-table-column>
            <el-table-column fixed="" label="类型"></el-table-column>
            <el-table-column fixed="" label="备注"></el-table-column>
            <el-table-column fixed="" label="时间"></el-table-column>
            <el-table-column fixed="" label="操作者"></el-table-column>
        </el-table>
        
        <el-pagination class="分页" background layout="prev, pager, next" :total="1000"></el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            time:'',
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
            type1:"",
            type2:"",
            type3:"",
            type4:"",
            type5:"",
            input3:"",
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
    span{
        font-size: 14px;
    }
}
</style>