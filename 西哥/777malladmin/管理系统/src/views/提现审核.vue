<template>
    <div>
        <div class="header-1">
            <!-- <span>查询条件：</span> -->
            <el-date-picker class="r15" style="width: 350px;" size="mini" v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-input class="r15" placeholder="用户名" v-model="value2" size="mini" style="width: 200px;"></el-input>
            <el-button class="r15" size="mini">查询</el-button>
            <el-select v-model="refreshTime" size="mini" style="width: 120px;">
                <el-option label="每隔10秒刷新" value="10"></el-option>
                <el-option label="每隔30秒刷新" value="30"></el-option>
                <el-option label="每隔60秒刷新" value="60"></el-option>
                <el-option label="不自动刷新" value=""></el-option>
            </el-select>
        </div>

        <el-table class="table" v-loading="loading" :data="list" stripe border size="mini" :row-class-name="tableRowClassName">
            <el-table-column label="订单id" prop="id" width="60px"></el-table-column>
            <el-table-column label="时间" prop width="140px">
                <template slot-scope="s">
                    <div>{{s.row.created_at}}</div>
                    <div class="bjTime">{{s.row.created_at | bjTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="会员Id" prop="uid" width="60px" align="center">
                <template slot-scope="s">
                    <userPopover :userId="s.row.uid">
                        <el-button type="text">{{s.row.uid}}</el-button>
                    </userPopover>
                </template>
            </el-table-column>
            <el-table-column label="取款金额(amount)" prop="amount" width="140px"></el-table-column>
            <el-table-column label="实际金额(actual_amount)" prop="actual_amount" width="180px"></el-table-column>
            <el-table-column label="状态(state)" prop="state">
                <template slot-scope="s">{{state[s.row.state]}}</template>
            </el-table-column>
            <el-table-column label="进度(step)" prop="step">
                <template slot-scope="s">{{step[s.row.step]}}</template>
            </el-table-column>
            <el-table-column label="正在审核(reviewer)" prop="reviewer"></el-table-column>
            <el-table-column label="备注(remarks)" prop="remarks">
                <template slot-scope="s">
                    <span v-if="s.row.step!=0">{{s.row.remarks}}</span>
                    <el-input v-if="s.row.step==0" v-model="s.row.remarks" size="mini" class="input-with-select"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop align="right" width="200px">
                <template slot-scope="s">
                    <el-button type size="mini" v-if="s.row.step==0" @click="开始审核(s.row)">开始审核</el-button>
                    <el-button type="warning" size="mini" @click="审核出款(s.row)">审核出款</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column label="()" prop=""></el-table-column> -->
        </el-table>


        <el-dialog class="dialog" title="取款审核" :visible.sync="ShowReviewBox" width="600px" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="ReviewBox">
                <el-row>
                    <el-col :span="24">
                        <span class="t1 color-1">账号：</span>
                        {{detail2.username}}
                    </el-col>

                    <el-col :span="12">
                        <span class="t1 color-1">昵称：</span>
                        {{detail2.nick}}
                    </el-col>
                    <el-col :span="12">
                        <span class="t1 color-1">余额：</span>
                        {{detail2.balance}}
                    </el-col>

                    <el-col :span="12">
                        <span class="t1">银行：</span>
                        {{detail2.bankname}}
                    </el-col>
                    <el-col :span="12">
                        <span class="t1">卡号：</span>
                        {{detail2.accountname}}
                        <span v-if="detail2.state==0" class="color-2">(已禁用)</span>
                        <span v-if="detail2.state==-1" class="color-2">(已删除)</span>
                    </el-col>

                    <!-- <el-col :span="12">
                        <span class="t1">存款：</span>
                        <span class="color-2">
                            {{detail2.recharge_total}}
                            </span>（<span class="color-1">0</span>）
                    </el-col>-->
                    <el-col :span="24">
                        <span class="t1">取款：</span>
                        <span class="color-2">{{detail2.amount}}</span>
                        （
                        <span class="color-1">0</span>）
                    </el-col>

                    <el-col :span="24">
                        <span class="t1">备注：{{detail2.remarks}}</span>
                    </el-col>

                    <el-col :span="12">
                        <span class="t1">当前码量：</span>0.00
                    </el-col>
                    <el-col :span="12">
                        <span class="t1">取款码量：</span>
                        0.00
                        <!-- <span>码量满足</span> -->
                    </el-col>

                    <el-col :span="12">
                        <span class="t1">累计存款：</span>
                        {{detail2.recharge_total}}（0）
                    </el-col>
                    <el-col :span="12">
                        <span class="t1">累计取款：</span>
                        {{detail2.withdraw_total}}（0）
                    </el-col>

                    <el-col :span="24">
                        <span class="t1">内部备注：</span>
                        <el-input v-model="detail2.remarks" placeholder="会员不可见" size="mini"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="t1">会员备注：</span>
                        <el-input v-model="detail2.message" placeholder="会员可见" size="mini"></el-input>
                    </el-col>
                    <el-col :span="24" v-if="审核提示">
                        <el-alert :title="审核提示" type="error" :closable="false"></el-alert>
                    </el-col>
                    <el-col :span="24" class="btn-list">
                        <el-button type="success" @click="pass('yes')" v-if="detail2.state==1">通过</el-button>
                        <el-button type="warning" @click="pass('no')">不通过</el-button>
                        <el-button type="danger" @click="pass('yes')" v-if="detail2.state==1">自动出款</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
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
            value2: "",
            refreshTime:"30",
            time1:"",       //定时获取定时器

            state: {
                1: "成功",
                '-1': '失败',
                0: "等待"
            },
            step: {
                1: '正在审核',
                2: '正在出款',
                3: '审核完毕'
            },
            list: [],
            loading: false,
            last_page: 0,

            ShowReviewBox: false,     //审核弹框
            details: {},     //当前点击的哪条
            detail2: {},     //审核弹框显示内容
            审核提示: "",


        }
    },
    methods: {
        change1(value) {
            console.log(value)
        },
        tableRowClassName({ row, rowIndex }) {
            if (row.id == this.details.id) {
                return 'active'
            }
            return '';
        },
        开始审核(item) {
            this.details = item
            let obj = {
                action: 'review',    //固定参数
                id: item.id,
                remarks: item.remarks ? item.remarks : ''
            }
            this.$axios.get('Withdraw', { params: obj }).then(res => {
                if (res.result == true) {
                    item.step = 1
                    item.reviewer = res.data
                } else {
                    this.错误(res.msg)
                }
            }).catch(err => {
                console.error(err);
            })
        },
        审核出款(item) {
            this.details = Object.assign({}, item)
            let obj = {
                action: 'reviewing',    //固定参数
                id: item.id
                // remarks:item.remarks
            }
            this.$axios.get('Withdraw', { params: obj }).then(res => {
                if (res.result == true) {
                    // item.step = 1
                    if (!res.msg) {
                        this.detail2 = res.data
                        this.审核提示 = ''
                        this.ShowReviewBox = true
                    } else {
                        item.step = 2
                        item.reviewer = res.msg.substring(res.msg.indexOf('[') + 1, res.msg.indexOf(']'))
                        this.detail2 = res.data
                        this.审核提示 = res.msg
                        this.$confirm(res.msg + ', 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.ShowReviewBox = true
                        }).catch(() => { });
                    }
                } else {
                    this.错误(res.msg)
                }
            }).catch(err => {
                console.error(err);
            })
        },
        pass(type) {
            let obj = {
                action: "pass",
                pass: type,
                remarks: this.detail2.remarks,
                message: this.detail2.message,
                id: this.details.id
            }
            this.ShowReviewBox = false
            this.$axios.get('Withdraw?&remarks=&message=&id=', { params: obj }).then(res => {
                if (res.msg == '审核成功') {
                    this.正确(res.msg)
                } else {
                    this.错误(res.msg)
                }
                let index = this.list.findIndex(x => x.id == this.details.id)
                if (index != -1) {
                    this.list.splice(index, 1)
                }
            }).catch(err => {
                this.错误('连接错误，稍后再试')
                this.ShowReviewBox = false
            })
        },

        getList() {
            this.loading = true
            this.$axios.get('Withdraw', '').then(res => {
                if (res.result) {
                    // let list = res.data
                    // for (let i = this.list.length-1; i >= 0; i--) {
                    //     if(!list.find(x=>x.id == this.list[i])){
                    //         this.list.splice(i,1)
                    //     }
                    // }
                    this.list = res.data
                }
                this.loading = false
                this.refresh()
            }).catch(err => {
                this.loading = false
                this.refresh()
            })
        },
        refresh(){
            try {
                clearTimeout(this.time1)
            } catch (error) {}
            if(!this.refreshTime) return
            this.time1 = setTimeout(() => {
                this.getList()
            }, this.refreshTime*1000);
        }
    },
    mounted() {
        this.getList()
        // console.log(moment('2021-03-30 01:48:09').add(150,'minute').format('YYYY-MM-DD HH:mm:ss')) 
    },
    beforeDestroy(){
        try {
            clearTimeout(this.time1)
        } catch (error) {}
    },
    watch:{
        refreshTime(){
            this.refresh()
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
/deep/ .el-dialog__header {
    border-bottom: 1px solid #e6e6e6;
}
/deep/ .el-table .active > td {
    background: #f7bfbf !important;
}
.ReviewBox {
    margin: -10px 0px;
    color: #000;
    .el-col {
        margin-bottom: 10px;
    }
    .t1 {
        color: #606266;
    }
    .color-1 {
        color: #21afe4;
    }
    .color-2 {
        color: red;
    }
    .btn-list {
        display: flex;
        .el-button {
            flex: 1;
        }
    }
}
</style>