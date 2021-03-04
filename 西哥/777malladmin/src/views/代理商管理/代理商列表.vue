<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="类型" size="mini" style="width: 100px;">
                <el-option label="全部类型" value></el-option>
                <el-option label="普通" value="1"></el-option>
                <el-option label="普通2" value="2"></el-option>
            </el-select>

            <el-input class="r15" placeholder v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:80px" v-model="账号类型" slot="prepend">
                    <el-option label="账号" value></el-option>
                    <el-option label="Id" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type size="mini">查询</el-button>
        </div>
        <div class="header-1">
            <span>相关操作：</span>
            <el-button type size="mini">重置密码</el-button>
            <el-button type size="mini">域名/返水</el-button>
            <el-button type size="mini">旗下会员</el-button>
            <el-button type="warning" size="mini">删除</el-button>
        </div>

        <el-table :data="list" border size="mini">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="账号"></el-table-column>
            <el-table-column label="代理余额"></el-table-column>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="分成"></el-table-column>
            <el-table-column label="上级代理"></el-table-column>
            <el-table-column label="注册时间"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template>
                    <el-button type="" size="mini">禁用</el-button>
                </template>
            </el-table-column>
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
            time: "",
            类型: "",
            账号类型: "",
            会员账号: "",
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