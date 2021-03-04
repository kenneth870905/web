<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 310px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" start-placeholder="计划封盘时间" end-placeholder="计划封盘时间" ></el-date-picker>
            <el-input class="r15" v-model="期号" placeholder="期号" size="mini" style="width: 100px;"></el-input>
            <el-select class="r15" v-model="彩种" size="mini" style="width: 100px;">
                <el-option label="全部彩种" value></el-option>
                <el-option label="彩种1" value="1"></el-option>
                <el-option label="彩种2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="状态" size="mini" style="width: 100px;">
                <el-option label="全部状态" value></el-option>
                <el-option label="状态1" value="1"></el-option>
                <el-option label="状态2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="结算" size="mini" style="width: 100px;">
                <el-option label="全部结算" value></el-option>
                <el-option label="未结算" value="1"></el-option>
                <el-option label="已结算" value="1"></el-option>
            </el-select>
            <el-button type="primary" style="mini" size="mini">查询</el-button>
        </div>

        <el-table :data="list" border stripe size="mini" @sort-change="change1">
            <el-table-column label="异常"></el-table-column>
            <el-table-column label="期号">00000</el-table-column>
            <el-table-column label="彩种"></el-table-column>
            <el-table-column label="创建时间"></el-table-column>
            <el-table-column label="计划封盘"></el-table-column>
            <el-table-column label="实际封盘"></el-table-column>
            <el-table-column label="实际采集"></el-table-column>
            <el-table-column label="开奖内容"></el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="开奖类型"></el-table-column>
            <el-table-column label="已结算"></el-table-column>
            <el-table-column label="未结算"></el-table-column>
            <el-table-column label="会员数"></el-table-column>
            <el-table-column label="结算时长"></el-table-column>
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
            期号:"",
            彩种:'',
            状态:"",
            结算:"",

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