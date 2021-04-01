<template>
    <div>
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px;" size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="type" size="mini" style="width: 100px;">
                <el-option label="所有类型" value=''></el-option>
                <el-option label="内部" value="0"></el-option>
                <el-option label="普通" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="state" size="mini" style="width: 100px;">
                <el-option label="全部状态" value=""></el-option>
                <el-option label="注册异常" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="冻结" value="-1"></el-option>
            </el-select>
            <el-input class="r15" placeholder="请输入内容" v-model="input1" size="mini" style="width: 350px;">
                <template slot="prepend">账号/IP/编号/昵称</template>
                <!-- <el-select style="width:80px" v-model="type2" slot="prepend" placeholder="请选择">
                    <el-option label="账号/ip/id/昵称" value="username"></el-option>
                    <el-option label="ip" value="ip"></el-option>
                    <el-option label="id" value="id"></el-option>
                    <el-option label="昵称" value="nick"></el-option>
                </el-select> -->
            </el-input>
            <el-button size="mini" @click="查询()">查询</el-button>
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

        <el-table :class="{table:last_page==0}" v-loading="loading" :data="list" stripe border size="mini">
            <!-- <el-table v-loading="loading" :data="list" stripe border size="mini" @sort-change="change1"> -->
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column fixed label="id" prop="id" width="40px"></el-table-column>
            <el-table-column fixed label="用户名" prop="username" width="125px">
                <template slot-scope="s">
                    <userPopover :userId="s.row.id">
                        <el-button type="text">{{s.row.username}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column fixed label="昵称" prop="nick" width="120px"></el-table-column>
            <el-table-column fixed label="余额" prop="amount" width="100px"></el-table-column>
            <el-table-column fixed label="首次充值" prop="recharge_first" width="100px"></el-table-column>
            <el-table-column fixed label="充值总额" prop="recharge_total" width="100px"></el-table-column>
            <el-table-column fixed label="首次提现" prop="withdraw_first" width="100px"></el-table-column>
            <el-table-column fixed label="提现总额" prop="withdraw_total" width="100px"></el-table-column>
            <el-table-column fixed label="奖金" prop="bonus"></el-table-column>
            <el-table-column fixed label="奖金提现总额" prop="bonus_withdraw"></el-table-column>
            <el-table-column fixed label="盈亏" prop="profit_total"></el-table-column>
            <el-table-column label="注单总数" prop="orders_total"></el-table-column>

            <el-table-column label="代理线" prop="alid"></el-table-column>
            <el-table-column label="一级" prop="faid"></el-table-column>
            <el-table-column label="二级代理" prop="said"></el-table-column>
            <el-table-column label="状态" prop="state">
                <template slot-scope="s">{{userState[s.row.state]}}</template>
            </el-table-column>
            <el-table-column label="注册时间" prop="created_at" width="140px">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="登录时间" prop="logined_at" width="140px">
                <template slot-scope="s">
                    <div>{{s.row.logined_at}}</div>
                    <div class="bjTime">{{s.row.logined_at | bjTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="登录Ip" prop="login_ip" width="140px"></el-table-column>
            <el-table-column label="注册Ip" prop="register_ip" width="140px"></el-table-column>
            <el-table-column label="代理余额" prop="agent_amount" width="120px"></el-table-column>
            <el-table-column label="代理锁定金额" prop="agent_lockamount"></el-table-column>
            <el-table-column label="一级代理人数" prop="agent_first_total"></el-table-column>
            <el-table-column label="二级代理人数" prop="agent_second_total"></el-table-column>
            <el-table-column label="一级代理总收益" prop="agent_first_fee"></el-table-column>
            <el-table-column label="二级代理总收益" prop="agent_second_fee"></el-table-column>
            <el-table-column label="一级代理奖金费率" prop="agent_first_fee_rate">
                <template slot-scope="s">
                    {{s.row.agent_first_fee_rate*100}}%
                </template>
            </el-table-column>
            <el-table-column label="二级代理奖金费率" prop="agent_second_fee_rate">
                <template slot-scope="s">
                    {{s.row.agent_second_fee_rate*100}}%
                </template>
            </el-table-column>
            <el-table-column label="一级代理充值总额" prop="agent_first_recharge"></el-table-column>
            <el-table-column label="二级代理充值总额" prop="agent_second_recharge"></el-table-column>
            <el-table-column label="一级代理充值费率" prop="agent_first_recharge_rate">
                <template slot-scope="s">
                    {{s.row.agent_first_recharge_rate*100}}%
                </template>
            </el-table-column>
            <el-table-column label="二级代理充值费率" prop="agent_second_recharge_rate">
                <template slot-scope="s">
                    {{s.row.agent_second_recharge_rate*100}}%
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-show="last_page>0" class="分页" :current-page="query.page" :page-count="last_page" @current-change="fenye" @size-change="changeSize" layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]"></el-pagination>
    </div>
</template>

<script>
// import userPopover from '@/components/用户弹框.vue'
import moment from 'moment'
export default {
    components:{
        // userPopover
    },
    provide(){
        return {
            // showUserView(){
            //     console.log('showUserView')
            // }
        }
    },
    props:['userId'],
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
            type: "",
            state: "",
            type2: "username",
            input1: "",

            userState: {
                1: '正常',
                0: '注册异常',
                '-1': '冻结',
                99: "内部账号"
            },


            query: {
                page: 1,
                size: 10,
                // action:"search",
                // type:"",    // 0 内部 1 普通
                // state:"",    //0 注册异常 1 正常 -1冻结
                // st:"",   //开始时间 
                // et:"",      //结束时间
                // search:"",
            },
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            loading: false,
            last_page: 0
        }
    },
    methods: {
        change1(value) {
            console.log(value)
        },
        changeSize(size) {
            console.log(size)
            this.query.page = 1
            this.query.size = size
            this.getUser()
        },
        fenye(i) {
            this.query.page = i
            this.getUser()
        },
        查询(){
            this.query.page = 1
            this.getUser()
        },
        getUser(userId) {
            this.loading = true
            let q = {
                page:this.query.page,
                size:this.query.size,
            }
            // if(this.input1){
                q.action = 'search'
                q.search = this.input1
            // }

            if(userId){
                q.id = userId
            }

            if(this.time && this.time.length>=2){
                q.st=this.time[0]
                q.et=this.time[1]
            }
            if(this.type){
                q.type=this.type
            }
            if(this.state){
                q.state = this.state
            }

            this.$axios.get('Users', { params: q }).then(res => {
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
        console.log(this.userId)
        this.getUser(this.userId)
        // console.log(moment().startOf('week').subtract('week', 1).format('YYYY-MM-DD 00:00:00'))
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
.nowrap {
    white-space: nowrap;
}
.table {
    min-height: 300px;
}
</style>