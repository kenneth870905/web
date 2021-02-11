<template>
    <div class="w1280">
        <div class="title-1">订单确认</div>
        <div class="title-2">确认收货地址</div>
        <ul class="addressList" v-loading="loading">
            <li v-for="item in 收货地址">
                <el-radio v-model="radio" :label="item.id">{{item.province}} {{item.address}}（{{item.name}}）{{item.contact}}</el-radio>
            </li>
            <div class="nodata" v-if="!loading && 收货地址.length==0">
                <el-button type="" @click="$router.push('/my/address')">添加收货地址</el-button>
            </div>
        </ul>
        <div class="title-2">确认订单信息</div>
        <el-table :data="立即购买.list">
            <el-table-column label="商品信息" width="400px">
                <template slot-scope="s">
                    <div class="spInfo">
                        <div class="img-box">
                            <img :src="$img_url+s.row.sp.cover" alt srcset />
                        </div>
                        <div>{{s.row.sp.title}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="规格" align="center">
                <template slot-scope="s">
                    <div>颜色：{{s.row.规格.color}}；尺寸：{{s.row.规格.size}}</div>
                </template>
            </el-table-column>
            <el-table-column label="单价" align="center">
                <template slot-scope="s">
                    <div>₱{{s.row.规格.price | setMoney}}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买数量" align="center">
                <template slot-scope="s">
                    <div>x{{s.row.数量}}</div>
                </template>
            </el-table-column>
            <el-table-column label="小计" align="center">
                <template slot-scope="s">
                    <div class="qian">₱{{s.row.规格.price * s.row.数量 | setMoney}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div class="heji">
            <span>商品合计（不包含运费）</span>
            <span class="qian2">₱{{合计}}</span>
        </div>
        <el-alert class="提示" title="提示：目前主要以线下支付为主，订单提交以后我们的客服将第一时间联系你，并再次和你确认订单以及收货地址等信息" :closable="false" type="warning"></el-alert>
        <div class="btn-1">
            <el-button type="primary" plain @click="提交订单()">提交订单</el-button>
        </div>

    </div>
</template>

<script>
import { setMoney } from "@/assets/自定义函数.js";
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            radio: "",
            list: [1, 2, 3],
            收货地址:[],
            loading:false
        }
    },
    computed:{
        ...mapState({
            立即购买:'立即购买'
        }),
        合计(){
            let n = 0
            this.立即购买.list.forEach(item => {
                n+=parseInt( Math.round(item.数量*item.规格.price) *100)/100 
            });
            return setMoney(n)
        },
        选中地址(){
            return this.收货地址.find(x=>x.id==this.radio) || ''
        }
    },
    filters:{
        setMoney
    },
    methods: {
        ...mapMutations({
            删除购物车:"删除购物车",
            setValue:"setValue"
        }),
        查询收货地址(){
            this.loading=true
            this.$axios.post('/Address/getAddress','').then(res => {
                if(res.code==1){
                    this.收货地址 = res.data
                    if(this.收货地址.length>0){
                        this.radio = this.收货地址[0].id
                    }
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
            })
        },
        提交订单(){
            if(!this.选中地址){
                this.错误('请选择收货地址')
            }else{
                var o = {
                    address:this.选中地址,
                    list:[]
                }
                this.立即购买.list.forEach(item=>{
                    let obj={}
                        obj.goodsInfo = item.sp
                        obj.specification = item.规格
                        obj.number = item.数量
                    o.list.push(obj)
                })
                this.$Loading(1)
                this.$axios.post('/Order/addOrder',o).then(res => {
                    if(res.code==1){
                        this.正确('提交成功')
                        if(this.立即购买.type==1){
                            this.立即购买.list.forEach(item=>{
                                this.删除购物车(item.gid)
                            })
                        }
                        this.setValue(['立即购买',{type:0,list:[]}])
                        history.back()
                    }else{
                        this.错误(res.message)
                    }
                    this.$Loading()
                }).catch(err => {
                    console.error(err); 
                    this.错误('系统错误，稍后再试')
                    this.$Loading()
                })
            }
        }
    },
    mounted() {
        this.查询收货地址()
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    font-size: 30px;
    margin: 20px 0px;
}
.title-2 {
    font-size: 14px;
    color: #333;
    font-weight: bold;
}
.addressList {
    min-height: 100px;
    li {
        padding: 10px 0px 10px 50px;
        font-size: 12px;
    }
    .nodata{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.spInfo {
    display: flex;
    .img-box {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        margin: 0px 15px 0px 0px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    font-size: 14px;
    word-break: break-all;
    line-height: initial;
}
.qian {
    color: #ff5000;
}
.heji {
    background: #f2f7ff;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 50px 0px 0px;
    font-size: 18px;
    .qian2 {
        color: #ff5000;
        font-weight: bold;
    }
}
.btn-1 {
    margin: 20px 0px 20px;
    text-align: right;
}
.提示{
    margin: 20px 0px 20px;
}

</style>