<template>
    <div class="flex100">
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px;" size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-input class="r15" placeholder="请输入内容" v-model="input1" size="mini" style="width: 350px;">
                <template slot="prepend">操作员账号</template>
            </el-input>
            <el-button size="mini" @click="查询()">查询</el-button>
        </div>

        <el-table class="table" height="100%" v-loading="loading" :data="list" stripe border size="mini" >
            <el-table-column label="用户" prop="uid" width="200px" align="center">
                <template slot-scope="s">
                    <userPopover :userId="s.row.uid">
                        <el-button type="text">{{s.row.username}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="内容" prop="content"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="时间" prop="created_at" width="160px" align="center">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-show="last_page>0" class="分页" :current-page="query.page" :page-count="last_page" @current-change="fenye" @size-change="changeSize" layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]"></el-pagination>

    </div>
</template>

<script>
var 啊 = {"id":"18","nick":"孟总","oid":"24","cid":"2","name":"冻结账户","content":"冻结账户ID[24]","remarks":"dongjie yige","created_at":"2021-04-02 20:09:18"}
import moment from 'moment'
export default {
    props: ['userId'],
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
            input1: "",

            // cid 1为赠送彩金  2为冻结账户  3为解冻账户
            query: {
                page: 1,
                size: 10,
            },
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            loading: false,
            last_page: 0,
           

        }
    },
    methods: {
        changeSize(size) {
            this.query.page = 1
            this.query.size = size
            this.getList()
        },
        fenye(i) {
            this.query.page = i
            this.getList()
        },
        getList() {
            this.loading=true
            this.$axios.post('Message',this.query ).then(res => {
                if (res.result) {
                    this.list = res.data
                    this.last_page = res.last_page
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
.flex100{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.table {
    flex: 1;
}

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