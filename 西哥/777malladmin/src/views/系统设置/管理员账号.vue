<template>
    <div>
        <div class="header-1">
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="value2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-input class="r15" placeholder="账号" style="width: 150px;" size="mini"></el-input>
            <el-input class="r15" placeholder="姓名" style="width: 150px;" size="mini"></el-input>
            <el-button type size="mini">查询</el-button>
        </div>
        <div class="header-1">
            <span>操作：</span>
            <el-button type size="mini">新增账号</el-button>
            <el-button type size="mini">修改资料</el-button>
            <el-button type size="mini">权限设置</el-button>
            <el-button type size="mini">设置推广账号</el-button>
            <el-button type size="mini">设置取款信息</el-button>
            <el-button type="warning" size="mini">删除</el-button>
        </div>

        <el-table :data="list" stripe border size="mini" @sort-change="change1">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="账号"></el-table-column>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="编号"></el-table-column>
            <el-table-column label="推广"></el-table-column>
            <el-table-column label="卡号"></el-table-column>
            <el-table-column label="创建时间"></el-table-column>
            <el-table-column label="最后登录Ip"></el-table-column>
            <el-table-column label="最后登录时间"></el-table-column>
            <el-table-column label="操作">
                <el-button type="" size="mini">启用</el-button>
                <el-button type="" size="mini">停用</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
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
    font-size: 14px;
    .r15 {
        margin-right: 15px;
    }
    .flex1 {
        flex: 1;
    }
}
</style>