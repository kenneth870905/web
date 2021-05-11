<template>
    <div class>
        <div class="header-1">
            <!-- <span>查询条件：</span>
            <el-date-picker class="r15" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px;" size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-input class="r15" placeholder="请输入内容" v-model="input1" size="mini" style="width: 350px;">
                <template slot="prepend">操作员账号</template>
            </el-input>
            <el-button size="mini" @click="查询()">查询</el-button>-->
            <el-button class="r15" size="mini" @click="近期开奖()">近期开奖</el-button>

            <el-switch v-model="killstart" @change="change" active-text="杀率模式"></el-switch>
        </div>

        <div class="header-2" v-if="显示下期">
            <el-button size="mini" @click="显示下期=false">隐藏结果</el-button>
        </div>
        <el-table v-if="显示下期" class="table" v-loading="loading2" :data="list2" stripe border size="mini">
            <el-table-column label="下期开奖结果" align="center">
                <el-table-column label="gameId" prop="gameId"></el-table-column>
                <el-table-column label="gameName" prop="gameId">
                    <template slot-scope="s">{{game[s.row.gameId]}}</template>
                </el-table-column>
                <el-table-column label="期号(period)" prop="period"></el-table-column>
                <el-table-column label="开奖(result)" prop="result"></el-table-column>
            </el-table-column>
        </el-table>

        <el-table class="table" v-loading="loading" :data="list" stripe border size="mini">
            <el-table-column label="基本信息" align="center">
                <el-table-column label="gameId" prop="gameId"></el-table-column>
                <el-table-column label="gameName" prop="name"></el-table-column>
                <el-table-column label="gametype" prop="gametype"></el-table-column>
                <el-table-column label="最大期限(maxperiod)" prop="maxperiod"></el-table-column>
                <el-table-column label="每天开始时间(starttime)" prop="starttime"></el-table-column>
                <el-table-column label="间隔(duration)" prop="duration">
                    <template slot-scope="s">{{s.row.duration}}秒</template>
                </el-table-column>
                <el-table-column label="停止投注(closetime)" prop="closetime">
                    <template slot-scope="s">最后{{s.row.closetime}}秒</template>
                </el-table-column>
                <el-table-column label="状态(state)" prop="state" align="center">
                    <template slot-scope="s">{{s.row.state==1 ? '运行中': "已封盘"}}</template>
                </el-table-column>
                <el-table-column label="亏损警戒线" prop="state" align="center" width="220px">
                    <template slot-scope="s">
                        <el-input size="mini" style="width: 60px;margin-right:10px;" />
                        <el-switch active-text="强制盈亏" size="mini"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template slot-scope="s">
                        <el-button size="mini" @click="$router.push('/GameConfig?state='+s.row.state+'&gid='+s.row.gameId+'&name='+s.row.name)">修改赔率/配置</el-button>
                        <el-button type="success" v-if="s.row.state==0" size="mini" @click="start('start',s.row)">启动</el-button>
                        <el-button type="warning" v-else size="mini" @click="start('close',s.row)">封盘</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-dialog title="盈亏警戒线设置" :visible.sync="yingKui.show" width="300px" :close-on-click-modal="false">
            <el-form :model="yingKui.data" label-width="90px" size="mini">
                <el-form-item label="亏损警戒线">
                    <template>
                        <el-input v-model="yingKui.data.cordon" placeholder style="width: 80px;"></el-input>倍
                    </template>
                </el-form-item>
                <el-form-item label="强制盈利">
                    <el-switch v-model="yingKui.data.profit" :active-text="yingKui.data.profit ? '已开启' : '已关闭'"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="yingKui.show = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="yingKui.show = false" size="mini">确 定</el-button>
            </span>
        </el-dialog>

        <!-- <el-pagination v-show="last_page>0" class="分页" :current-page="query.page" :page-count="last_page" @current-change="fenye" @size-change="changeSize" layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]"></el-pagination> -->
    </div>
</template>

<script>
var 啊 = { "id": "18", "nick": "孟总", "oid": "24", "cid": "2", "name": "冻结账户", "content": "冻结账户ID[24]", "remarks": "dongjie yige", "created_at": "2021-04-02 20:09:18" }
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
                // page: 1,
                // size: 10,
            },
            list: [],
            loading: false,
            last_page: 0,

            list2: [],
            loading2: false,
            显示下期: false,

            game: {
                10001: "Parity",
                10002: "Sapre",
                10003: "Bcone",
                10004: "Emerd",
            },
            killstart: true,
            yingKui: {
                show: true,
                data: {}
            }
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
            this.loading = true
            this.$axios.post('GameManage', this.query).then(res => {
                if (res.result) {
                    let list = []
                    for (const key in res.data) {
                        let item = res.data[key]
                        item.gameId = key
                        list.push(item)
                    }
                    this.list = list
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        async 近期开奖() {
            var password = await this.$prompt('请输入查询密码', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: "password",
                inputPattern: /\S/,
                inputErrorMessage: '请输入密码'
            }).then(({ value }) => {
                return value
            })
            let q = {
                action: 'result',
                password: password, // asdasd123
            }
            this.loading2 = false
            this.$axios.post('GameManage', q).then(res => {
                this.loading2 = false
                if (res.result) {
                    let list = []
                    for (const key in res.data) {
                        let item = res.data[key]
                        item.gameId = key
                        list.push(item)
                    }
                    this.list2 = list
                    this.显示下期 = true
                } else {
                    this.错误(res.msg)
                }
            }).catch(err => {
                this.loading2 = false
                this.错误('网络异常，稍后再试')
            })
        },
        async start(type, item) {
            this.$confirm('确定更改游戏启动停止状态？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let o = {
                    action: type,
                    gid: parseInt(item.gameId)
                }
                this.$axios.post('GameManage', o).then(res => {
                    if (res.result) {
                        this.正确('设置成功')
                        this.getList()
                    } else {
                        this.错误(res.msg)
                    }
                }).catch(err => {
                    this.错误('连接错误，稍后再试')
                })
            }).catch(() => { });
        },
    },
    mounted() {
        this.getList()

    }
}
</script>

<style lang="scss" scoped>
.flex100 {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.table {
    // flex: 1;
    margin: 20px auto;
}

// .header-2,
.header-1 {
    display: flex;
    align-items: center;
    // justify-content: flex-end;
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

.header-2 {
    margin: 20px 0px 10px;
    display: flex;
    justify-content: flex-end;
}

.table2 {
    width: 100%;
    th,
    td {
        text-align: center;
    }
    th {
        border: 1px solid #eee;
    }
    td {
        border: 1px solid #eee;
    }
}
</style>