<template>
    <div class="积分变化">
        <div class="title">订单记录</div>
        <div class="table2">
            <el-table :data="list2" border size="mini">
                <el-table-column width="165px" label="订单编号" prop="orderSn"></el-table-column>
                <el-table-column width="100px" label="支付方式" >
                    <template slot-scope="s">
                        {{s.row.payType==2? '现金' :"积分"}}   
                    </template>
                </el-table-column>
                <el-table-column label="总额">
                    <template slot-scope="s">
                        <span v-show="s.row.payType==1">{{s.row.totalCreditPrice}}积分</span>
                        <span v-show="s.row.payType==2">￥{{s.row.totalPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="s">
                        <span v-show="s.row.status==1">未支付</span>   
                        <span v-show="s.row.status==2">支付</span>   
                        <span v-show="s.row.status==3">取消</span>   
                    </template>
                </el-table-column>
                <el-table-column width="150px" label="时间" prop="createdAt"></el-table-column>
            </el-table>
        </div>
        <div class="分页" v-show="total2> q1.size">
            <el-pagination background @current-change="changePage2" :page-size="q1.size" layout="prev, pager, next" :total="total2">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            userid:"",
            list2:[],
            total2:0,
            q1:{    //查询个人积分记录
                page:1,
                size:10,
                uid:""
            },
        }
    },
    methods: {
        查询订单(){
            this.list2 = []
            this.q1.uid = this.userid
            this.$axios.get('/api/order',{params:this.q1}).then(res => {
                if(res.code===0){
                    this.total2 = res.total
                    this.list2 = res.data
                }
            }).catch(err => {
            })
        },
        changePage2(i){
            this.q1.page = i
            this.查询订单()
        },
    },
    mounted() {
        this.userid = this.$route.query.id
        this.查询订单()
    },
}
</script>

<style lang="scss" scoped>
.title {
    padding-bottom: 5px;
    border-bottom: 1px solid #d0d0d0;
    margin: 0px 0px 10px 0px;
}
.积分变化{
    box-shadow: 0px 0px 5px 0px #737373;
    padding: 10px;
    border-radius:5px;
    font-size: 14px;
}
.table2{
    min-height: 400px;
}
.分页{
    padding: 3px 0px 0px;
    text-align: right;
}
</style>