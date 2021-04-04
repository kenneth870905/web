<template>
    <div class="flex100">
        <div class="header-1">
            <span>查询条件：</span>
            <el-date-picker class="r15" value-format="yyyy-MM-dd HH:mm:ss" style="width: 350px;" size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            <el-select class="r15" v-model="type" size="mini" style="width: 100px;">
                <el-option label="所有类型" value></el-option>
                <el-option label="内部" value="0"></el-option>
                <el-option label="普通" value="1"></el-option>
            </el-select>
            <el-select class="r15" v-model="state" size="mini" style="width: 100px;">
                <el-option label="全部状态" value></el-option>
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
                </el-select>-->
            </el-input>
            <el-button size="mini" @click="查询()">查询</el-button>
        </div>
        <div class="header-1">
            <span>批量操作：</span>
            <el-button size="mini" @click="冻结('ban')">冻结账户</el-button>
            <el-button size="mini" @click="冻结('unban')">解除账户冻结</el-button>
            <el-button size="mini" @click="私信('unban')">群发私信</el-button>
            <!-- <el-button size="mini">重置密码</el-button>
            <el-button size="mini">修改资料</el-button>
            <el-button size="mini">赠送彩金</el-button>
            <el-button size="mini">手动存款</el-button>
            <el-button size="mini">会员详情</el-button>
            <el-button size="mini">余额汇总</el-button>-->
        </div>

        <el-table class="table" height="100%" v-loading="loading" :data="list" stripe border size="mini" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40px" align="center"></el-table-column>
            <el-table-column label="操作" fixed align="center" width="70px">
                <template slot-scope="s">
                    <el-dropdown @command="caozuo" placement="bottom-start" trigger="click">
                        <el-button type="text">
                            更多
                            <i class="el-icon-arrow-down"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="[s.row,'xgmm']">修改密码</el-dropdown-item>
                            <el-dropdown-item :command="[s.row,'xzlg']">修改资料</el-dropdown-item>
                            <el-dropdown-item :command="[s.row,'dlzscc']">独立赠送彩金</el-dropdown-item>
                            <el-dropdown-item :command="[s.row,'sdck']">手动存款</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
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
                <template slot-scope="s">{{s.row.agent_first_fee_rate*100}}%</template>
            </el-table-column>
            <el-table-column label="二级代理奖金费率" prop="agent_second_fee_rate">
                <template slot-scope="s">{{s.row.agent_second_fee_rate*100}}%</template>
            </el-table-column>
            <el-table-column label="一级代理充值总额" prop="agent_first_recharge"></el-table-column>
            <el-table-column label="二级代理充值总额" prop="agent_second_recharge"></el-table-column>
            <el-table-column label="一级代理充值费率" prop="agent_first_recharge_rate">
                <template slot-scope="s">{{s.row.agent_first_recharge_rate*100}}%</template>
            </el-table-column>
            <el-table-column label="二级代理充值费率" prop="agent_second_recharge_rate">
                <template slot-scope="s">{{s.row.agent_second_recharge_rate*100}}%</template>
            </el-table-column>
        </el-table>

        <el-pagination v-show="last_page>0" class="分页" :current-page="query.page" :page-count="last_page" @current-change="fenye" @size-change="changeSize" layout="sizes,prev, pager, next , jumper" :page-sizes="[10, 20 , 50]"></el-pagination>

        <el-dialog title="重置密码" class="changePassword" :visible.sync="showChangePassword" width="500px">
            <el-form label-width="80px" size="small" :model="ChangePassword" :rules="ChangePasswordRules" ref="form1">
                <el-form-item label="账号">
                    <el-input v-model="ChangePassword.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input show-password v-model="ChangePassword.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input show-password v-model="ChangePassword.password2" placeholder="请确认密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="showChangePassword = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="savePassword()">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改资料" class="changeData" :visible.sync="changeData.show" width="500px">
            <el-alert title="账号：+933333333333,昵称：，注册Ip:0.0.0" type="warning" :closable="false"></el-alert>
            <el-form label-width="80px" size="small" :model="changeData.data" :rules="changeData.rules" ref="form1">
                <el-form-item label="账号">
                    <el-input v-model="changeData.data.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input show-password v-model="changeData.data.nick"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="changeData.show = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="changeDataSave()">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="独立赠送彩金" :close-on-click-modal="false" class="independentBonus" :visible.sync="independentBonus.show" width="500px">
            <el-form label-width="95px" size="small" :model="independentBonus.data" :rules="independentBonus.rules" ref="independentBonus">
                <el-form-item label="账号">
                    <el-input v-model="independentBonus.data.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="彩金金额" prop="bonus">
                    <el-input v-model.number="independentBonus.data.bonus" @change="changeNumber('independentBonus.data.bonus')" type="number" placeholder="彩金金额，>=0,最多保留2位小数点"></el-input>
                </el-form-item>
                <el-form-item label="流水倍数" prop="runningtimes">
                    <el-input placeholder v-model.number="independentBonus.data.runningtimes" @change="changeNumber('independentBonus.data.runningtimes')" type="number">
                        <template slot="append">倍</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="后台备注">
                    <el-input type="textarea" v-model="independentBonus.data.remarks" placeholder="后台可见，会员不可见"></el-input>
                </el-form-item>
                <el-form-item label="前台备注">
                    <el-input type="textarea" v-model="independentBonus.data.message" placeholder="请仔细填写备注信息，给玩家知道原因"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="independentBonus.show = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="independentBonusSave()">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="手动存款" class="shouDongCunKuan" :visible.sync="shouDongCunKuan.show" width="500px">
            <el-form label-width="100px" size="small" :model="shouDongCunKuan.data" :rules="shouDongCunKuan.rules" ref="form1">
                <el-form-item label="账号">
                    <el-input v-model="shouDongCunKuan.data.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model="shouDongCunKuan.data.nick" type="number" placeholder="金额，正数"></el-input>
                </el-form-item>
                <el-form-item label="存款赠送优惠">
                    <el-input placeholder v-model="shouDongCunKuan.data.nick">
                        <el-checkbox slot="prepend" v-model="shouDongCunKuan.data.zengsong">赠送</el-checkbox>
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计算打码量">
                    <el-input placeholder v-model="shouDongCunKuan.data.nick">
                        <el-checkbox slot="prepend" v-model="shouDongCunKuan.data.zengsong">计算</el-checkbox>
                        <template slot="append">倍</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计算输赢额">
                    <el-checkbox v-model="shouDongCunKuan.data.zengsong">计算</el-checkbox>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="independentBonus.data.nick" placeholder="请仔细填写备注信息，给玩家知道原因"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="shouDongCunKuan.show = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="shouDongCunKuanSave()">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="群发私信" class="sixin" :visible.sync="sixin.show" width="500px">
            <el-alert :title="`已选中${list2.length}个账号`" type="warning" :closable="false"></el-alert>
            <el-form :model="sixin.data" ref="sixin" :rules="sixin.rules" size="mini">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="sixin.data.title" placeholder="消息标题"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="content">
                    <el-input type="textarea" v-model="sixin.data.content" placeholder="消息内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="sixin.show = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="sixinSave()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
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
            last_page: 0,
            list2: [],   //选中列表

            selectId: "",    //当前选中的
            //修改密码
            showChangePassword: false,   //显示修改密码
            ChangePassword: {},
            ChangePasswordRules: {
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 4, max: 16, message: '长度在 4 到 16 位', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            console.log(value, this.ChangePassword.password)
                            if (value != this.ChangePassword.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ]
            },
            //修改资料
            changeData: {
                show: false,
                data: {},
                rules: {}
            },
            //独立赠送彩金
            independentBonus: {
                show: false,
                data: {
                    action: "bonus",
                    id: "",
                    bonus: 0,    //彩金金额
                    runningtimes: 0, //流水倍数
                    remarks: "", //后台备注
                    message: "", //前台发送给会员的消息
                },
                rules: {
                    bonus: [
                        { required: true, pattern: /^([1-9]\d*.?|0.)\d*$/, message: '金额必须大于0', trigger: 'blur' },
                    ],
                    runningtimes: [
                        { required: true, pattern: /^([1-9]\d*.?|0.)\d*$/, message: '流水倍数必须大于0', trigger: 'blur' },
                    ]
                }
            },
            //手动存款
            shouDongCunKuan: {
                show: false,
                data: {},
                rules: {}
            },
            // 私信
            sixin:{
                show:false,
                data:{
                    title:"",
                    content:""
                },
                rules:{
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' },
                    ],
                    content:[
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ]
                }
            }

        }
    },
    methods: {
        私信(){
            if(this.list2.length==0){
                this.错误('请选择用户')
                return
            }
            this.sixin.show=true
        },
        sixinSave(){
            this.$refs.sixin.validate((valid)=>{
                if(valid){
                    let o = {
                        action:'message',
                        list:[],
                        title:this.sixin.data.title,
                        content:this.sixin.data.content
                    }
                    this.list2.forEach(item=>{
                        o.list.push(item.id)
                    })
                    this.$axios.post('Users',o).then(res => {
                        if(res.result){
                            this.正确(res.msg)
                        }else{
                            this.错误(res.msg)
                        }
                        this.sixin.show=false
                    }).catch(err => {
                        this.sixin.show=false
                        this.错误('连接错误，稍后再试')
                    })
                }else{
                    return false
                }
            })
        },
        冻结(type) {
            if (this.list2.length == 0) {
                this.错误('请选择用户')
                return
            }
            let list = []
            this.list2.forEach(item => {
                list.push(item.id)
            })
            
            let title = type=='ban' ? '冻结用户':"解除冻结用户"
            this.$prompt(`已选中<span style="color:red">${list.length}个用户</span>，此操作将<span style="color:red">${title}</span>，是否继续？如需备注请在下方输入框填写（可不填写）`, title, {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let o = {
                    action: type,
                    list: list,
                    remarks: value
                }
                this.$axios.post('Users', o).then(res => {
                    console.log(res)
                    if(res.result){
                        this.正确(res.msg)
                        this.getUser()
                    }else{
                        this.错误(res.msg)
                    }
                }).catch(err => {
                    this.错误('连接异常，稍后再试')
                })
            }).catch(() => {});
        },
        //数字输入框
        changeNumber(key) {
            // eval(`this.${key}=Math.abs(this.${key})`)
            this.key = parseFloat(Math.abs(this.key).toFixed(2))
            eval(`this.${key} = parseFloat(Math.abs(this.${key}).toFixed(2))`)
        },
        handleSelectionChange(value) {
            this.list2 = value
        },
        //保存手动存款
        shouDongCunKuanSave() {
            this.shouDongCunKuan.show = false
        },
        //保存独立赠送彩金
        async independentBonusSave() {
            await new Promise((resolve, reject) => {
                this.$refs.independentBonus.validate((valid) => {
                    if (valid) {
                        resolve()
                    } else {
                        return false
                    }
                })
            });
            let o = Object.assign({}, this.independentBonus.data)
            // o.bonus = o.bonus.toString()
            delete o.username
            this.$axios.post('Users', o).then(res => {
                console.log(res)
                if (res.result) {
                    this.正确(res.msg)
                    this.getUser()
                } else {
                    this.错误(res.msg)
                }
                this.independentBonus.show = false
            }).catch(err => {
                this.错误('连接错误，稍后再试')
                this.independentBonus.show = false
            })
        },
        // 修改资料
        changeDataSave() {
            this.changeData.show = false
        },
        //保存密码
        savePassword() {
            this.$refs.form1.validate((valid) => {
                if (valid) {
                    console.log('可以提交')
                    let o = {
                        action: "resetpassword",
                        id: this.ChangePassword.id,
                        password: this.ChangePassword.password
                    }
                    this.$axios.post('Users', o).then(res => {
                        if (res.result) {
                            this.正确(res.msg)
                        } else {
                            this.错误(res.msg)
                        }
                        this.showChangePassword = false
                    }).catch(err => {
                        this.错误('连接错误，稍后再试')
                        this.showChangePassword = false
                    })
                } else {
                    return false;
                }
            });
        },
        // 修改密码 资料之类的
        caozuo(value) {
            this.selectId = value[0].id
            // 修改密码
            if (value[1] == "xgmm") {
                this.ChangePassword = Object.assign({}, value[0])
                this.ChangePassword.password = ''
                this.showChangePassword = true
                //修改资料
            } else if (value[1] == 'xzlg') {
                this.changeData.data = Object.assign({}, value[0])
                this.changeData.show = true
                //独立赠送彩金
            } else if (value[1] == 'dlzscc') {
                this.independentBonus.data.id = value[0].id
                this.independentBonus.data.username = value[0].username
                this.independentBonus.data.bonus = 0
                this.independentBonus.data.runningtimes = 0
                this.independentBonus.data.remarks = ''
                this.independentBonus.data.message = ''
                this.independentBonus.show = true
                //手动存款
            } else if (value[1] == 'sdck') {
                this.shouDongCunKuan.data = Object.assign({}, value[0])
                this.shouDongCunKuan.show = true
            }
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
        查询() {
            this.query.page = 1
            this.getUser()
        },
        getUser(userId) {
            this.loading = true
            let q = {
                page: this.query.page,
                size: this.query.size,
            }
            // if(this.input1){
            q.action = 'search'
            q.search = this.input1
            // }

            if (userId) {
                q.id = userId
            }

            if (this.time && this.time.length >= 2) {
                q.st = this.time[0]
                q.et = this.time[1]
            }
            if (this.type) {
                q.type = this.type
            }
            if (this.state) {
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



.changePassword {
    /deep/ .el-dialog__body {
        padding: 20px 20px 10px;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #000;
    }
}

.changeData {
    /deep/ .el-dialog__body {
        padding: 20px 20px 10px;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #000;
    }
}
// 独立赠送彩金
.independentBonus {
    /deep/ .el-dialog__body {
        padding: 20px 20px 10px;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #000;
    }
}
// 手动存款
.shouDongCunKuan {
    /deep/ .el-dialog__body {
        padding: 20px 20px 10px;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #000;
    }
}
</style>