<template>
    <div class="flex100">
        <div class="header-1">
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="time" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
            <!-- <el-input class="r15" v-model="单号" placeholder="单号" size="mini" style="width: 100px;"></el-input>
            <el-input class="r15" v-model="期号" placeholder="期号" size="mini" style="width: 100px;"></el-input>
            <el-select class="r15" v-model="彩种" placeholder="彩种" size="mini" style="width: 100px;">
                <el-option label="全部彩种" value></el-option>
                <el-option label="彩种1" value="1"></el-option>
                <el-option label="彩种2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="类型" placeholder="类型" size="mini" style="width: 100px;">
                <el-option label="全部类型" value></el-option>
                <el-option label="类型1" value="1"></el-option>
                <el-option label="类型2" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="盈亏" placeholder="盈亏" size="mini" style="width: 100px;">
                <el-option label="全部盈亏" value></el-option>
                <el-option label="盈利" value="1"></el-option>
                <el-option label="亏损" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="合买" placeholder="合买" size="mini" style="width: 100px;">
                <el-option label="全部合买" value=""></el-option>
                <el-option label="合买" value="1"></el-option>
                <el-option label="非合买" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="会员" placeholder="会员" size="mini" style="width: 100px;">
                <el-option label="全部会员" value=""></el-option>
                <el-option label="普通会员" value="1"></el-option>
                <el-option label="内部会员" value="2"></el-option>
            </el-select>
            <el-select class="r15" v-model="启用" size="mini" style="width: 80px;">
                <el-option label="启用" value=""></el-option>
                <el-option label="停用" value="1"></el-option>
            </el-select> -->
            <el-input class="r15" v-model="账号" size="mini" placeholder="会员账号" style="width: 150px;"></el-input>
            <el-button type="primary" style="mini" size="mini">查询</el-button>
        </div>

        <el-table v-loading="loading" class="table" height="100%" :data="list" border stripe="" size="mini" @sort-change="change1">
            <el-table-column label="用户id" prop="uid" width="60px" align="center">
                <template slot-scope="s">
                    <userPopover :userId="s.row.uid">
                        <el-button type="text">{{s.row.uid}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="s">
                    {{type[s.row.type]}}
                </template>
            </el-table-column>
            <el-table-column label="类别" prop="category"></el-table-column>
            <el-table-column label="金额" prop="amount"></el-table-column>
            <el-table-column label="变更前" prop="amount_before"></el-table-column>
            <el-table-column label="变更后" prop="amount_after"></el-table-column>
            <el-table-column label="时间" prop="created_at">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="" width="100px" align="center">
                <template>
                    <el-button type="" size="mini">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="sizes, pager, next , jumper" :current-page="query.page" :page-count="pageCount" @current-change="fenye" @size-change="changeSize" :page-sizes="[10, 20 , 50]"></el-pagination>

    </div>
</template>

<script>
// method:1 content对应买数字0-9
// method:2 content买颜色对应 ｒ ｇ  ｖ

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
            单号:"",
            期号:"",
            类型:"",
            彩种:'',
            盈亏:"",
            合买:"",
            会员:"",
            启用:"",
            账号:"",

            content:{
                0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,r:'Red',g:'Green',v:'Violet'
            },

            type:{
                '1':'结算',
                '2':'下单',
                '3':'提现',
                '4':'提现撤回',
                '5':'佣金转入',
                '6':'下单撤回'
            },

            query:{
                page:1,
                size:10
            },
            list: [],
            loading:false,
            pageCount:0

        }
    },
    methods:{
        change1(value){
            console.log(value)
        },
        changeSize(size){
            this.query.size = size
            this.query.page = 1
            this.getList()
        },
        fenye(i){
            this.query.page = i
            this.getList()
        },
        getList(){
            this.loading = true
            this.$axios.get('Details',{params:this.query}).then(res => {
                if(res.result){
                    this.list = res.data
                    this.pageCount = res.last_page  
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
                console.error(err); 
            })
        }
    },
    mounted() {
        this.getList()
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
.flex100{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.table {
    flex: 1;
}
</style>