<template>
    <div>
        <div class="title1">
            订单管理
        </div>
        <div class="title2">
            <el-button-group >
                <el-button size="mini" :plain="query.status!=''" @click="changeStatus('')" type="primary">全部订单</el-button>
                <el-button size="mini" :plain="query.status!=1" @click="changeStatus(1)" type="primary">已支付</el-button>
                <el-button size="mini" :plain="query.status!=2" @click="changeStatus(2)" type="primary">未支付</el-button>
                <el-button size="mini" :plain="query.status!=3" @click="changeStatus(3)" type="primary">已取消</el-button>
            </el-button-group>
            <el-input class="input1" size="mini" v-model="query.uid" placeholder="根据用户id查询">
                <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div>
                （知道名字不知道用户id？<span @click="查询用户=true">点击这里</span>查询）
            </div>
        </div>
        <div class="table">
            <el-table :data="list" border size="small" stripe>
                <el-table-column label="标号" width="170px" prop="orderSn"></el-table-column>
                <el-table-column label="商品">
                    <template slot-scope="scope">
                        <div class="商品列表">
                            <div class="商品图片" v-for="item in scope.row.items">
                                <el-image style="width: 60px; height: 60px" :src="$api_url+'/'+item.product.coverImg" :preview-src-list="srcList(scope.row)">
                                </el-image>
                                <span>x{{item.count}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="200px" prop="comment"></el-table-column>
                <el-table-column label="用户" width="100px" prop="用户详情.nickName"></el-table-column>
                
                <el-table-column label="金额" width="100px">
                    <template slot-scope="scope">
                        <div v-show="scope.row.payType==1">￥{{scope.row.totalPrice}}</div>
                        <div v-show="scope.row.payType==2">{{scope.row.totalCreditPrice}}积分</div>
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" width="100px">
                    <template slot-scope="scope">
                        {{scope.row.payType==2 ? '现金':"积分"}}
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" width="100px">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">未支付</span>
                        <span v-show="scope.row.status==2">已支付</span>
                        <span v-show="scope.row.status==3">取消</span>
                    </template>
                </el-table-column>
                <el-table-column label="时间" width="150px" prop="createdAt"></el-table-column>
                <el-table-column label="操作" width="50px">
                </el-table-column>
            </el-table>
        </div>

        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total">
            </el-pagination>
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
                            <i @click="搜索2(scope.row)"  class="fuzhi el-icon-search"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="分页">
                <el-pagination background @current-change="changePage_2" :page-size="query_2.size" layout="prev, pager, next" :total="total_2">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            query: {
                size: 10,
                page: 1,
                status:"",   //未支付：1 已支付：2 取消：3
                uid:""       //用户id
            },
            list: [],
            total: 0,

            //查询用户
            查询用户: false,
            query_2:{
                size:8,
                page:1,
                name:""
            },
            userList:[],
            total_2:0
            // 用户详情: {}
        }
    },
    methods: {
        changeStatus(s){
            this.query.status = s
            this.query.page = 1
            this.getList()
        },
        search(){
            this.query.page = 
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
        search_2(){
            this.query_2.page = 1
            this.getUserList()
        },
        getUserList(){
            this.$axios.get('/api/user',{params:this.query_2}).then(res => {
                if(res.code===0){
                    this.userList = res.data
                    this.total_2 = res.total
                }
            })
        },
        changePage_2(i){
            this.query_2.page = i
            this.getUserList()
        },
        搜索2(item){
            this.查询用户=false
            this.query.uid = item.id
            this.query.page = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
}
.title2{
    padding: 5px 0px;
    display: flex;
    align-items: center;
    .input1{
        margin: 0px 0px 0px 15px;
        width: 200px;
    }
    div{
        margin: 0px 0px 0px 15px;
        font-size: 14px;
        color: #5d5d5d;
    }
    span{
        cursor: pointer;
        color: red;
    }
}
.table {
    margin: 10px 0px 0px;
    min-height: 400px;
}

.商品列表 {
    display: flex;
    flex-wrap: wrap;
    .商品图片 {
        display: flex;
        align-items: center;
        padding: 5px;
        border: 1px solid #c1c1c1;
        margin: 5px;
        img {
            margin: 0px 10px 0px 0px;
            width: 60px;
            height: 60px;
            object-fit: cover;
            border: 1px solid #eee;
        }
    }
}

.分页 {
    text-align: right;
    margin: 10px 0px;
}


.搜索用户{
    /deep/ .el-dialog__header{
        padding: 10px 20px 10px;
    }
    /deep/ .el-dialog__headerbtn{
        top: 10px;
    }
    /deep/ .el-dialog__body{
        padding: 10px 20px;
    } 
}
.table2{
    min-height: 325px;
    margin: 5px 0px;
    .fuzhi{
        color: #409eff;
        font-size: 18px;
        cursor: pointer;
    }
}
</style>
