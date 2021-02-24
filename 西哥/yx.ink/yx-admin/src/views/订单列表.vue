<template>
    <div class="app-container">
        <div class="header-1">
            <el-button-group >
                <el-button @click="changeType('')" :type="query.type==='' ? 'primary' : ''" size="small">所有订单</el-button>
                <el-button @click="changeType(0)" :type="query.type===0 ? 'primary' : ''" size="small">待收款</el-button>
                <el-button @click="changeType(1)" :type="query.type==1 ? 'primary' : ''" size="small">待发货</el-button>
                <el-button @click="changeType(2)" :type="query.type==2 ? 'primary' : ''" size="small">已发货/待收货</el-button>
                <el-button @click="changeType(3)" :type="query.type==3 ? 'primary' : ''" size="small">已收货</el-button>
                <el-button @click="changeType(-1)" :type="query.type==-1 ? 'primary' : ''" size="small">异常/取消</el-button>
            </el-button-group>
        </div>

        <el-table style="margin:15px 0px;min-height:300px" v-loading="loading" :data="list" border size="mini" stripe>
            <el-table-column label="id" prop="id" width="50px" align="center"></el-table-column>
            <el-table-column label="订单号" prop="orderNumber" width="230px"></el-table-column>
            <el-table-column label="用户账号">
                <template slot-scope="s">
                    {{s.row.user.userName}}
                </template>
            </el-table-column>
            <el-table-column label="商品以及规格" width="250px">
                <template slot-scope="s">
                    <div class="sp" v-for="item in s.row.orderInfo">
                        <div class="img-box">
                            <img :src="$img_url+item.goodsInfo.cover" alt="">
                        </div>
                        <div class="guige">
                            <div class="t1">{{item.goodsInfo.title}}</div>
                            <div class="t2">规格：{{item.specification.color}}，{{item.specification.size}}</div>
                            <div class="t3">₱{{item.specification.price}}</div>
                            <div class="t4">x{{item.number}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="总价" width="80px" align="center">
                <template slot-scope="s">
                    {{总价(s.row)}}
                </template>
            </el-table-column>
            <el-table-column label="收货人信息">
                <template slot-scope="s">
                    <div class="收货地址">
                        <div>{{s.row.address.name}}</div>
                        <div>联系方式：{{s.row.address.contact}}</div>
                        <div>Province：{{s.row.address.province}}</div>
                        <div>详细地址：{{s.row.address.address}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remarks"></el-table-column>
            <el-table-column label="物流信息" prop="logistics"></el-table-column>
            <el-table-column label="创建时间" prop="creationTime"></el-table-column>
            <!-- <el-table-column label="修改时间" prop="updateTime"></el-table-column> -->
            <el-table-column label="订单状态" width="100px">
                <template slot-scope="s">
                    <span v-if="s.row.type==0">待收款</span>
                    <span v-if="s.row.type==1">待发货</span>
                    <span v-if="s.row.type==2">待收货</span>
                    <span v-if="s.row.type==3">已收货</span>
                    <span v-if="s.row.type==-1">取消/关闭</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="110px">
                <template slot-scope="s">
                    <el-button type="" size="mini" @click="修改订单(s.row)">修改状态</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" v-if="total>0" :total="total" :current-page="query.page" :page-size="query.size" @current-change="fenye" background layout="prev, pager, next"></el-pagination>

        <el-dialog title="修改订单" :visible.sync="显示修改弹框" width="500px">
            <el-form :model="订单" size="small">
                <el-form-item label="订单号">
                    <el-input v-model="订单.orderNumber" readonly  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="订单.type" placeholder="" style="width: 100%;">
                        <el-option :value="0" label="待付款"></el-option>
                        <el-option :value="1" label="已付款、待发货"></el-option>
                        <el-option :value="2" label="已发货、待收货"></el-option>
                        <el-option :value="3" label="已收货"></el-option>
                        <el-option v-if="订单.type==0" :value="-1" label="异常或关闭或关闭"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="订单.type==2" label="物流信息">
                    <el-input v-model="订单.logistics" placeholder="如：顺丰-0000000"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="订单.remarks" type="textarea" placeholder="备注用于管理员观看"></el-input>
                </el-form-item>
                <div>
                    <el-button style="width: 100%;" @click="保存()" size="small">保 存</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

export default {
    computed: {
        
    },
    data() {
        return {
            // type:{
            //     0:{text:'待付款'},
            //     1:{text:'待发货'},
            //     2:{text:'待收货'},
            //     3:{text:"已收货"},
            //     '-1':{text:"异常或关闭"}
            // },
            query: {
                page: 1,
                size: 5,
                type: '',    //0 待付款  1 已付款或已支付定金待发货  2已发货待收货 3已收货 -1订单异常或取消	
            },
            list:[],
            loading:false,
            total:-1,
            axios_source:"",
            订单:{},
            显示修改弹框:false
        }
    },
    methods: {
        总价(item){
            let n = 0
            item.orderInfo.forEach(x => {
                n += parseInt( Math.round(x.number* x.specification.price)*100 )/100
            });
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n)
        },
        修改订单(item){
            this.订单 = JSON.parse(JSON.stringify(item))
            this.显示修改弹框=true
        },
        changeType(type){
            this.query.type = type
            this.query.page = 1
            this.获取订单()
        },
        fenye(i){
            this.query.page = i
            this.获取订单()
        },
        获取订单() {
            if(this.loading){
                return
            }
            this.loading=true
            var CancelToken = this.$axios.CancelToken;
            this.axios_source = CancelToken.source();
            this.$axios.post('/Order/getOrder', this.query,{cancelToken:this.axios_source.token}).then(res => {
                this.list = res.data.data
                this.total = res.data.total
                this.loading=false
            }).catch(err => {
                console.error(err);
                if(err.message!='终止请求'){
                    this.loading=false
                }
            })
        },
        保存(){
            this.$Loadading(1)
            this.显示修改弹框=false
            this.$axios.post('/order/modifyOrder',this.订单).then(res => {
                this.$Loadading(0)
                if(res.code==1){
                    this.正确('修改成功')
                    this.获取订单()
                }else{
                    this.错误('修改失败')
                }
            }).catch(err => {
                this.$Loadading(0)
                this.错误('系统错误，稍后再试')
            })
        }
    },
    mounted() {
        this.获取订单()
    },
}
</script>

<style lang="scss" scoped>
.sp{
    display: flex;
    background: #fff;
    padding: 5px 10px;
    font-size: 12px;
    line-height: initial;
    .img-box{
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .guige{
        padding: 0px 10px ;
        flex: 1;
        width: 0;
        .t1{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .t2{
            color: rgba($color: #000000, $alpha: 0.6);
            margin: 5px 0px;
        }
        .t3,
        .t4{
            color: #ff5000;
        }
    }
}
</style>
