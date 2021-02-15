<template>
    <div class="tem">
        <van-nav-bar fixed title="订单确认" left-arrow @click-left="$back()"></van-nav-bar>

        <van-cell v-if="!选中收货地址" title="添加收货地址" icon="location-o" is-link to="/addrList" />
        <van-cell v-if="选中收货地址" icon="location-o" :title="选中收货地址.name" is-link center to="/addrList?back=1">
            <template #label>
                <div class="dizhi">{{选中收货地址.address}}</div>
            </template>
        </van-cell>

        <ul class="spList">
            <van-cell title="商品信息" />
            <li v-for="item in newList" v-if="item.checked">
                <div class="img-1">
                    <img :src="$img_url+item.sp.cover" alt srcset />
                </div>
                <div class="xiangqing">
                    <div class="t1">{{item.sp.title}}</div>
                    <div class="t2">{{item.规格.color}}，{{item.规格.size}}</div>
                    <div class="t3">
                        <span class="jiage">₱{{item.规格.price | qian}}</span>
                        <span>x{{item.数量}}</span>
                    </div>
                </div>
                <div class="异常" v-if="item.异常">商家已修改商品信息，请重新选择商品</div>
            </li>
        </ul>

        <van-notice-bar style="margin-top:10px;" wrapable :scrollable="false" text="提交订单后，我们的客服会第一时间与您确认订单以及收货地址等信息" />

        <div class="box-1">
            <van-cell-group>
                <van-cell title="商品总额" :value="'₱'+合计" />
                <van-cell title="配送方式" :value="'已实际为准'" />
                <van-cell title="运输费用" value="已实际为准" />
                <van-cell title="促销优惠" value="无" />
                <van-cell title="付款方式" value="已实际为准" />
            </van-cell-group>
            <div class="van-cell 总计">
                总计：
                <span>₱{{合计}}</span>
            </div>
        </div>

        <div class="btn-1">
            <van-button round type="info" block @click="确定()">提交订单</van-button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            showACtion: false,
            收货地址: [],
            newList:[]
        }
    },
    computed: {
        ...mapState({
            选中收货地址: "选中收货地址",
            购物车: "购物车"
        }),
        合计() {
            let 合计 = 0
            this.购物车.forEach(item => {
                if (item.checked) {
                    let num = item.数量 * item.规格.price
                    num = parseFloat(num.toFixed(2))
                    合计 += num
                }
            })
            // return 合计
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(合计)
        }
    },
    filters: {
        qian(number) {
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    methods: {
        ...mapMutations({
            setValue: "setValue",
            删除购物车:"删除购物车"
        }),
        onSelect(item) {
            this.showACtion = false
        },
        查询收货地址() {
            this.$axios.post('/Address/getAddress', '').then(res => {
                console.log(res)
                let data = res.data
                //收货地址不存在了
                if (data.length == 0) {
                    this.setValue(['选中收货地址', ''])
                } else {
                    if (!this.选中收货地址) {
                        this.setValue(['选中收货地址', data[0]])
                    } else {
                        if (!data.find(x => x.id == this.选中收货地址.id)) {
                            this.setValue(['选中收货地址', data[0]])
                        }
                    }
                }
            }).catch(err => {
            })
        },
        核对商品(){
            let list = []
            for (let i = 0; i < this.购物车.length; i++) {
                if(this.购物车[i].checked){
                    let p = new Promise((resolve, reject) => {
                        console.log('查询单个商品')
                        this.$axios.post('/Goods/getGoodsById',{id:this.购物车[i].sp.id}).then(res => {
                            resolve(res.data)
                        }).catch(err => {
                            console.error(err); 
                            resolve(false)
                        })
                    });
                    list.push(p)
                }
            }
            this.$toast.loading({ message: '正在核对商品', forbidClick: true,duration:0});
            Promise.all(list).then(all=>{
                for (let i = 0; i < this.newList.length; i++) {
                    let sp = all[i]
                    let sp2 = this.newList[i]
                    if(!sp){
                        this.$set(this.newList[i],'异常',true)
                    }else{
                        if(!sp.priceList.find(x=>x.color==sp2.规格.color && x.size==sp2.规格.size && x.price==sp2.规格.price)){
                            this.$set(this.newList[i],'异常',true)
                        }
                    }              
                }
                this.$toast.clear();
                if(this.newList.find(x=>x.异常)){
                    this.$dialog.alert({
                        title: '提示',
                        message: '商家已修改部分商品商品信息，无法继续提交订单，请重购物车删除商品重新购买',
                    }).then(() => {});
                }
            })
        },
        确定(){
            if(this.newList.find(x=>x.异常)){
                this.$dialog.alert({
                    title: '提示',
                    message: '商家已修改部分商品商品信息，无法继续提交订单，请重购物车删除商品重新购买',
                }).then(() => {});
                return
            }else if(!this.选中收货地址){
                this.$toast('请选择收货地址')
                return
            }
            let o = {
                address:this.选中收货地址,
                list:[]
            }
            this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
            this.newList.forEach(item=>{
                o.list.push({
                    goodsInfo:item.sp,
                    specification:item.规格,
                    number:item.数量
                })
            })
            this.$axios.post('/Order/addOrder',o).then(res => {
                if(res.code==1){
                    let l = []
                    for (let i = 0; i < this.购物车.length; i++) {
                        if(this.购物车[i].checked){
                            l.push(i)
                        }
                    }
                    this.删除购物车(l)
                    this.$toast('提交成功')
                    this.$router.push('/orderList')
                }else{
                    this.$toast(res.message)
                }
            }).catch(err => {
                console.error(err); 
                this.$toast('系统错误，稍后再试')
            })
        },
    },
    mounted() {
        this.newList = JSON.parse(JSON.stringify(this.购物车.filter(x=>x.checked)))

        this.查询收货地址()
        this.核对商品()

       
    },
}
</script>

<style lang="scss" scoped>
.tem {
    padding: 50px 0px 0px 0px;
}

.dizhi {
    word-break: break-all;
}

.spList {
    margin: 15px 0px 0px;
    li {
        display: flex;
        padding: 10px 10px;
        background: #fff;
        border-bottom: 1px solid #eee;
        position: relative;
    }
    .异常{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: red;
        font-weight: bold;
        background: rgba($color: #000000, $alpha: 0.7);
    }
    .img-1 {
        width: 75px;
        height: 75px;
        flex-shrink: 0;
        margin: 0px 10px 0px 0px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .xiangqing {
        flex: 1;
        .t1 {
            color: #333;
            margin-bottom: 3px;
            font-size: 14px;
            height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .t2 {
            margin-bottom: 6px;
            font-size: 12px;
            color: #999;
        }
        .t3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #999;
            font-size: 12px;
            .jiage {
                color: #f2270c;
                font-weight: bold;
            }
        }
    }
}
.box-1 {
    margin: 15px 0px 0px;
    .总计 {
        justify-content: flex-end;
        span {
            color: #f2270c;
            font-weight: bold;
        }
    }
}
.btn-1 {
    margin: 30px 15px 20px;
}
</style>