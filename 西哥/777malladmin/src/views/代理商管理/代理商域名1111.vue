<template>
    <div>
        <div class="header-1">
            <span>创建时间:</span>
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="退水类型" size="mini" style="width: 130px;">
                <el-option label="全部退水类型" value></el-option>
                <el-option label="退水类型1" value="1"></el-option>
                <el-option label="退水类型2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="域名" size="mini" style="width: 100px;">
                <el-option label="有域名" value></el-option>
                <el-option label="无域名" value="1"></el-option>
            </el-select>
            <el-input class="r15" v-model="input3" size="mini" style="width: 300px;">
                <el-select style="width:100px" v-model="代理" slot="prepend">
                    <el-option label="代理商" value></el-option>
                    <el-option label="用户名" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type size="mini">提交</el-button>
        </div>
        <div class="header-1">
            <span>操作：</span>
            <el-button type="" size="mini">编辑域名</el-button>
            <el-button type="" size="mini">添加域名</el-button>
        </div>

        <el-table :data="list" border size="mini">
            <el-table-column label="推广编号"></el-table-column>
            <el-table-column label="代理商"></el-table-column>
            <el-table-column label="域名" width="300px">
                <el-input value="www.baidu.com" size="mini">
                    <template slot="append">修改同步</template>
                </el-input>
            </el-table-column>
            <el-table-column label="网站类型"></el-table-column>
            <el-table-column label="退水方案">
                <template>
                    默认盈利
                    <i class="el-icon-edit"></i> 
                </template>
            </el-table-column>
            <el-table-column label="退水类型"></el-table-column>
            <el-table-column label="会员数量"></el-table-column>
            <el-table-column label="退水总额"></el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="创建时间"></el-table-column>
            <el-table-column label="创建人"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: '',
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
            退水类型: '',
            域名: "",
            代理: "",
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