<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="value2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="type" size="mini" style="width: 100px;">
                <el-option label="所有类型" value></el-option>
                <el-option label="普通" value="1"></el-option>
                <el-option label="内部" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="type2" size="mini" style="width: 100px;">
                <el-option label="全部状态" value></el-option>
                <el-option label="状态1" value="1"></el-option>
                <el-option label="状态2" value="1"></el-option>
            </el-select>
            <el-input class="r15" placeholder="请输入内容" v-model="input3" size="mini" style="width: 500px;">
                <el-select style="width:170px" v-model="type3" slot="prepend" placeholder="请选择">
                    <el-option label="账号/注册ip/编号/姓名" value></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
            </el-input>
            <el-button size="mini">查询</el-button>
        </div>
        <div class="header-1">
            <span>操作勾选：</span>
            <el-button size="mini">重置密码</el-button>
            <el-button size="mini">修改资料</el-button>
            <el-button size="mini">赠送彩金</el-button>
            <el-button size="mini">手动存款</el-button>
            <el-button size="mini">会员详情</el-button>
            <el-button size="mini">余额汇总</el-button>
        </div>

        <el-table :data="list" stripe border size="mini" @sort-change="change1">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed label="类型"></el-table-column>
            <el-table-column label="账号"></el-table-column>
            <el-table-column sortable="custom" label="姓名" prop="id"></el-table-column>
            <el-table-column label="会员分成" width="100px">
                <el-button type="text" size="mini">默认分成<i class="el-icon-edit"></i> </el-button>
            </el-table-column>
            <el-table-column label="vip"></el-table-column>
            <el-table-column label="上级代理">
                <el-button type="text" size="mini">aaa<i class="el-icon-edit"></i> </el-button>
            </el-table-column>
            <el-table-column label="余额"></el-table-column>
            <el-table-column label="存款总数"></el-table-column>
            <el-table-column label="存款次数"></el-table-column>
            <el-table-column label="取款总数"></el-table-column>
            <el-table-column label="取款次数"></el-table-column>
            <el-table-column label="平台输赢"></el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="域名类型"></el-table-column>
            <el-table-column label="注册时间"></el-table-column>
            <el-table-column label="注册ip"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            value2: '',
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
            type: "",
            type2: "",
            type3: "",
            input3: ""
        }
    },
    methods: {
        change1(value) {
            console.log(value)
        }
    },
    mounted() {
        console.log(moment().startOf('week').subtract('week', 1).format('YYYY-MM-DD 00:00:00'))
    }
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
    font-size: 14px;
    .r15 {
        margin-right: 15px;
    }
    .flex1 {
        flex: 1;
    }
}
</style>