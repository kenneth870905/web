<template>
    <div>
        <div class="title1">订单管理</div>
        <div class="title2">
            <el-button-group>
                <el-button size="mini" :plain="query.status!=''" @click="changeStatus('')" type="primary">全部订单</el-button>
                <el-button size="mini" :plain="query.status!=1" @click="changeStatus(1)" type="primary">未支付</el-button>
                <el-button size="mini" :plain="query.status!=2" @click="changeStatus(2)" type="primary">待发货（已支付）</el-button>
                <el-button size="mini" :plain="query.status!=4" @click="changeStatus(4)" type="primary">已发货</el-button>
                <el-button size="mini" :plain="query.status!=5" @click="changeStatus(5)" type="primary">已收货</el-button>
                <el-button size="mini" :plain="query.status!=3" @click="changeStatus(3)" type="primary">已取消</el-button>
            </el-button-group>
            <el-date-picker style="width: 250px;margin-left:10px;" value-format="yyyy-MM-dd" @change="changeTime3" size="mini" v-model="time3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            <el-select v-model="searchType" style="width: 100px;margin-left:5px" size="mini" slot="prepend" placeholder="请选择">
                <el-option label="用户id" :value="1"></el-option>
                <el-option label="订单标号" :value="2"></el-option>
            </el-select>
            <el-input class="input1" style="width: 250px;" size="mini" v-model="searchText" :placeholder="searchType==1 ? '请输入用户Id' : '请输入订单编号'">
                <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="搜索名字" v-if="searchType==1">
                （知道名字不知道用户id？
                <span @click="查询用户=true">点击这里</span>查询）
            </div>
            <el-button style="margin-left:10px" @click="下载订单()" type="primary" size="mini">下载订单</el-button>
        </div>
        <div class="table">
            <el-table :data="list" border size="small" stripe>
                <el-table-column label="标号" width="170px" prop="orderSn"></el-table-column>
                <el-table-column label="商品">
                    <template slot-scope="scope">
                        <div class="商品列表">
                            <div v-if="!scope.row.items">商品已被删除</div>
                            <div v-for="item in scope.row.items">
                                <span @click="查看商品详情(item)" class="name">{{item.product.name}}</span>
                                <span class="数量">x{{item.count}}</span>
                                <span class="商品类型" v-if="item.product.isSeckill">秒杀商品</span>
                            </div>
                            <!-- <div class="商品图片" v-for="item in scope.row.items">
                                <el-image style="width: 60px; height: 60px" :src="$api_url+'/'+item.product.coverImg" :preview-src-list="srcList(scope.row)"></el-image>
                                <span>x{{item.count}}</span>
                            </div>-->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="200px" prop="comment"></el-table-column>
                <el-table-column label="收货地址" width="80px" align="center" prop="comment">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.addressId">--</span>
                        <el-button @click="获取收货地址(scope.row)" v-if="scope.row.addressId" type="text">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="用户" width="100px" prop="用户详情.nickName"></el-table-column>
                <el-table-column label="金额" width="100px">
                    <template slot-scope="scope">
                        <div v-show="scope.row.payType==2">￥{{scope.row.totalPrice}}</div>
                        <div v-show="scope.row.payType==1">{{scope.row.totalCreditPrice}}积分</div>
                    </template>
                </el-table-column>
                <el-table-column label="支付" width="100px">
                    <template slot-scope="scope">{{scope.row.payType==2 ? '现金':"积分"}}</template>
                </el-table-column>
                <el-table-column label="状态" width="130px">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">未支付</span>
                        <span v-show="scope.row.status==2">待发货（已支付）</span>
                        <span v-show="scope.row.status==3">取消</span>
                        <span v-show="scope.row.status==4">已发货</span>
                        <span v-show="scope.row.status==5">已收货</span>
                    </template>
                </el-table-column>
                <el-table-column label="时间" width="150px" prop="createdAt"></el-table-column>
                <el-table-column label="操作" v-if="roles.OrderWrite || roles.Admin" width="120px">
                    <template slot-scope="s">
                        <el-button :type="s.row.status==2 ? 'primary' : 'warning'" @click="更改订单(s.row)" size="mini" v-if="s.row.status==2 || s.row.status==4">{{s.row.status==2 ? '设为已发货' : "设为已收货"}}</el-button>
                    </template>
                    <!-- <el-button type="" size="mini">修改状态</el-button> -->
                </el-table-column>
            </el-table>
        </div>

        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total"></el-pagination>
        </div>

        <el-dialog title="输入名字搜索用户" class="搜索用户" width="500px" :visible.sync="查询用户" :close-on-click-modal="false">
            <div class="搜索用户">
                <el-input size="small" @keydown.enter.native="search_2()" v-model="query_2.name" placeholder="请输入用户名称">
                    <el-button @click="search_2()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-table class="table2" :data="userList" border size="mini" stripe>
                    <el-table-column label="id" prop="id"></el-table-column>
                    <el-table-column label="昵称" prop="nickName"></el-table-column>
                    <el-table-column lang="复制" width="50px">
                        <template slot-scope="scope">
                            <i @click="搜索2(scope.row)" class="fuzhi el-icon-search"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="分页">
                <el-pagination background @current-change="changePage_2" :page-size="query_2.size" layout="prev, pager, next" :total="total_2"></el-pagination>
            </div>
        </el-dialog>

        <el-dialog title="收货地址" class="收货地址" width="400px" :visible.sync="显示收货地址" :close-on-click-modal="false">
            <div class>
                <table>
                    <tbody>
                        <tr>
                            <td>姓名：</td>
                            <td>{{收货地址.name}}</td>
                        </tr>
                        <tr>
                            <td>电话：</td>
                            <td>{{收货地址.telephone}}</td>
                        </tr>
                        <tr>
                            <td>区域：</td>
                            <td>{{收货地址.省市县}}</td>
                        </tr>
                        <tr>
                            <td>详细地址：</td>
                            <td>{{收货地址.address}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
// import AboutUs from '../../../../qingSuiWoWeiXi/pages/AboutUs/AboutUs.vue'
import province from '@/assets/diqu/province.js'
import city from '@/assets/diqu/city.js'
import district from '@/assets/diqu/district.js'
export default {
    // components: { AboutUs },
    name: "",
    data() {
        return {
            query: {
                size: 10,
                page: 1,
                status: "",   //未支付：1 已支付：2 取消：3
                uid: "",       //用户id
                orderSn: '',      //订单编号
                startDate: "",
                endDate: ""
            },
            time3: '',
            // time3: [
            //     moment().subtract(7, 'days').format('YYYY-MM-DD'),
            //     moment().add(1, 'days').format('YYYY-MM-DD')
            // ],
            searchType: 1, //1 根据用户名查询 2 订单编号
            searchText: "",


            list: [],
            total: 0,

            //查询用户
            查询用户: false,
            query_2: {
                size: 8,
                page: 1,
                name: ""
            },
            userList: [],
            total_2: 0,
            // 用户详情: {}
            显示收货地址: false,
            收货地址: {}
        }
    },
    computed: {
        ...mapState({
            loginInfo: "loginInfo"
        }),
        ...mapGetters({
            roles: 'roles'
        })
    },
    methods: {
        更改订单(item) {
            console.log(item)
            if (item.status == 2) {
                //设为已发货
                var o = { status: 4 }
                var text = '确定将此订单设置为已发货?'
            } else {
                //设为已收货
                var o = { status: 5 }
                var text = '确定将此订单设置为已收货?'
            }
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.put(`/api/order/${item.id}`, o).then(res => {
                    console.log(res)
                    if(res.code===0){
                        this.正确('设置成功')
                        this.getList()
                    }else{
                        this.错误(res.message)
                    }
                }).catch(err => {
                    console.error(err);
                    this.错误('设置失败，请联系管理员')
                })
            })
            
        },
        查看商品详情(item) {
            if (item.product.isSeckill) {
                this.$router.push('/index/orderMsSp?id=' + item.product.id)
                // var msgWindow = window.open('#/index/orderMsSp?id='+item.product.id,'product')
            } else {
                this.$router.push('/index/orderSp?id=' + item.product.id)
                // var msgWindow = window.open('#/index/orderSp?id='+item.product.id,'product')
            }
            // if(msgWindow){
            //     msgWindow.location.reload(true); 
            // }
        },
        changeTime3() {
            console.log(123)
            this.query.page = 1
            this.getList()
        },
        获取收货地址(item) {
            var data = item.address
            var 省 = province.find(x => x.id == data.province)
            var 市 = 省 ? city[省.id].find(x => x.id == data.city) : ""
            var 县 = 市 ? district[市.id].find(x => x.id == data.district) : ""
            console.log(省, 市, 县)
            data.省市县 = `${省 ? 省.name : ""}/${市 ? 市.name : ""}/${县 ? 县.name : ''}`
            this.收货地址 = data
            this.显示收货地址 = true
        },
        下载订单() {
            var query = {
                startDate: this.time3 ? this.time3[0] : '',
                endDate: this.time3 ? this.time3[1] : '',
                orderSn: this.searchType == 2 ? this.searchText : '',      //订单编号
                uid: this.searchType == 1 ? this.searchText : '',
                status: this.query.status
            }
            this.$axios.get('/api/export/order', { params: query })
                .then(res => {
                    if (res.code === 0) {
                        window.open(this.$api_url + '/' + res.data)
                    } else {
                        this.$message({
                            showClose: true,
                            message: x.message,
                            type: 'error'
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        showClose: true,
                        message: '系统错误，请稍后再试',
                        type: 'error'
                    });
                })
        },
        changeStatus(s) {
            this.query.status = s
            this.query.page = 1
            this.getList()
        },
        search() {
            this.query.page = 1
            this.getList()
        },
        srcList(item) {
            var list = []
            item.items.forEach(x => {
                list.push(this.$api_url + '/' + x.product.coverImg)
            })
            return list
        },
        getList() {
            this.query.startDate = this.time3 ? this.time3[0] : ''
            this.query.endDate = this.time3 ? this.time3[1] : ''
            this.query.uid = this.searchType == 1 ? this.searchText : ''
            this.query.orderSn = this.searchType == 2 ? this.searchText : ""
            this.list = []
            this.$axios.get('/api/order', { params: this.query }).then(res => {
                if (res.code == 0) {
                    var data = res.data
                    data.forEach(item => {
                        item.用户详情 = {}
                        this.获取用户(item)
                    })
                    this.list = data
                    this.total = res.total
                }
            })
        },
        获取用户(item) {
            this.$axios.get(`/api/user/${item.userId}`).then(res => {
                if (res.code === 0) {
                    item.用户详情 = res.data
                }
            })
        },
        changePage(i) {
            this.query.page = i
            this.getList()
        },
        search_2() {
            this.query_2.page = 1
            this.getUserList()
        },
        getUserList() {
            this.$axios.get('/api/user', { params: this.query_2 }).then(res => {
                if (res.code === 0) {
                    this.userList = res.data
                    this.total_2 = res.total
                }
            })
        },
        changePage_2(i) {
            this.query_2.page = i
            this.getUserList()
        },
        搜索2(item) {
            this.查询用户 = false
            this.searchText = item.id
            this.query.page = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
        console.log(province)
    }
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
}
.title2 {
    padding: 5px 0px;
    display: flex;
    align-items: center;
    // div {
    //     margin: 0px 0px 0px 15px;
    //     font-size: 14px;
    //     color: #5d5d5d;
    // }
    .搜索名字 {
        font-size: 14px;
    }
    span {
        cursor: pointer;
        color: red;
    }
}
.table {
    margin: 10px 0px 0px;
    min-height: 400px;
}

.商品列表 {
    // display: flex;
    // flex-wrap: wrap;
    .name {
        color: #1d6bcc;
        cursor: pointer;
    }
    .数量 {
        margin: 0px 0px 0px 5px;
        color: red;
    }
    .商品类型 {
        margin: 0px 0px 0px 5px;
        color: #a7a7a7;
    }
    // .商品图片 {
    //     display: flex;
    //     align-items: center;
    //     padding: 5px;
    //     border: 1px solid #c1c1c1;
    //     margin: 5px;
    //     img {
    //         margin: 0px 10px 0px 0px;
    //         width: 60px;
    //         height: 60px;
    //         object-fit: cover;
    //         border: 1px solid #eee;
    //     }
    // }
}

.分页 {
    text-align: right;
    margin: 10px 0px;
}

.搜索用户 {
    /deep/ .el-dialog__header {
        padding: 10px 20px 10px;
    }
    /deep/ .el-dialog__headerbtn {
        top: 10px;
    }
    /deep/ .el-dialog__body {
        padding: 10px 20px;
    }
}
.table2 {
    min-height: 325px;
    margin: 5px 0px;
    .fuzhi {
        color: #409eff;
        font-size: 18px;
        cursor: pointer;
    }
}

.收货地址 {
    /deep/ .el-dialog__header {
        padding: 10px 20px 10px;
    }
    /deep/ .el-dialog__headerbtn {
        top: 10px;
    }
    /deep/ .el-dialog__body {
        padding: 10px;
    }
    table {
        border-right: 1px solid #eee;
        width: 100%;
        border-bottom: 1px solid #eee;
    }
    td {
        padding: 5px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
    }
    tr:nth-child(1) {
        width: 70px;
    }
}
</style>
