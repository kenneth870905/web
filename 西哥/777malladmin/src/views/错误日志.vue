<template>
    <div>
        <div class="header-1">
            <!-- <span>查询条件：</span> -->
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-input class="r15" placeholder="用户名" v-model="value2" size="mini" style="width: 200px;"></el-input>
            <el-button size="mini">查询</el-button>
        </div>

        <el-table class="table" v-loading="loading" :data="list" stripe border size="mini">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="类别(category)" prop="category"></el-table-column>
            <el-table-column label="描述(msg)" prop="msg"></el-table-column>
            <el-table-column label="时间(t)" prop="t">
                <template slot-scope="s">
                    <div>{{s.row.t}}</div>
                    <div class=" bjTime">{{s.row.t | bjTime}}</div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-show="last_page>0" class="分页" :current-page="query.page" :page-count="last_page" @current-change="fenye" @size-change="changeSize" layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]" ></el-pagination>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            value1: '',
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
            value2:"",

            state:{
                1:"成功",
                '-1':'失败',
                0:"等待"
            },
            step:{
                1:'正在审核',
                2:'正在出款',
                3:'审核完毕'
            },


            query:{
                page:1,
                size:10
            },
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            loading:false,
            last_page:0
        }
    },
    methods: {
        change1(value) {
            console.log(value)
        },
        changeSize(size){
            console.log(size)
            this.query.page = 1 
            this.query.size = size
            this.getList()
        },
        fenye(i){
            this.query.page=i
            this.getList()
        },
        getList(){
            this.loading = true
            this.$axios.get('ErrorLog',{params:this.query}).then(res => {
                if(res.result){
                    this.list = res.data
                    this.last_page = res.last_page
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
            })
        }
    },
    mounted() {
        this.getList()
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
.nowrap{
    white-space: nowrap;
}
.table{
    min-height: 300px;
}
</style>