<template>
    <div class="cart">
        <el-row class="w1280">
            <el-col :span="16" class="left">
                <div class="titl-1">
                    <el-checkbox v-model="全选" @change="点击全选()">全选</el-checkbox>
                    <span v-show="选中数量>0" @click="删除()">删除选中</span>
                </div>
                <ul>
                    <li class="item-box" v-for="item in newList">
                        <div class="checkbox">
                            <el-checkbox @change="勾选()" v-model="item.checked"></el-checkbox>
                        </div>
                        <div class="img-box">
                            <img :src="$img_url+item.sp.cover" alt srcset />
                        </div>
                        <div class="t2">
                            <div>{{item.sp.title}}</div>
                            <div>规格：{{item.规格.color}}；{{item.规格.size}}</div>
                            <div>单价：₱{{item.规格.price | setMoney}}</div>
                        </div>
                        <div class="number">x{{item.数量}}</div>
                        <div class="jiage">₱{{小计(item)}}</div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8">
                <div class="right">
                    <div class="title-3">订单摘要</div>
                    <div class="item-2">
                        <div class="label">数量</div>
                        <div>{{选中数量}}件</div>
                    </div>
                    <div class="item-2">
                        <div class="label">配送</div>
                        <div>已实际为准</div>
                    </div>
                    <div class="item-2">
                        <div class="label">运费</div>
                        <div>已实际为准</div>
                    </div>
                    <div class="item-2">
                        <div class="label">合计（不包含运费）</div>
                        <div class="jiage">₱{{总价}}</div>
                    </div>
                    <div class="btn-1" @click="结算()">结算</div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { setMoney } from "@/assets/自定义函数.js";
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            obj:{
                name:""
            },
            全选:true
        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo',
            newList:"购物车",
            立即购买:"立即购买"
        }),
        选中数量(){
            return this.newList.filter(x=>x.checked).length
        },
        总价(){
            let n = 0
            this.newList.forEach(item=>{
                if(item.checked){
                    n+=parseInt(Math.round(item.数量*item.规格.price*100))/100
                }
            })
            return setMoney(n)
        }
    },
    filters:{
        setMoney
    },
    methods: {
        ...mapMutations({
            setValue:"setValue",
            删除购物车:"删除购物车"
        }),
        小计(item){
            let n = parseInt(Math.round(item.数量*item.规格.price*100))/100
            return  setMoney(n)
        },
        点击全选(){
            this.newList.forEach(item=>{
                item.checked = this.全选
            })
        },
        勾选(){
            this.全选 = !this.newList.find(x=>!x.checked)
        },
        删除(){
            this.newList.forEach(item=>{
                if(item.checked){
                    this.删除购物车(item.gid)
                }
            })
        },
        结算(){
            if(!this.userInfo.id){
                this.错误('请先登录')
            }else if(this.选中数量==0){
                this.错误('请选择需要结算的商品')
            }else{
                this.立即购买.type=1
                this.立即购买.list = this.newList.filter(x=>x.checked)
                this.setValue(['立即购买',this.立即购买])
                this.$router.push('/buy')
            }
        }
    },
    mounted() {
        for (let i = 0; i < this.newList.length; i++) {
            this.$set(this.newList[i],'checked',true)
        }
    },
    
}
</script>

<style lang="scss" scoped>
.cart {
    background: #f4f4f4;
    padding: 15px 0px 100px;
}
.left {
    padding: 0px 15px 0px 0px;
}
.titl-1 {
    height: 40px;
    padding: 0px 10px;
    background: #fff;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 15px;
    span {
        color: rgba($color: #000000, $alpha: 0.5);
        cursor: pointer;
        &:hover {
            color: red;
        }
    }
}
.item-box {
    background: #fff;
    margin: 0px 0px 12px;
    display: flex;
    padding: 10px 15px;
    .checkbox {
        width: 30px;
        display: flex;
        align-items: center;
    }
    .img-box {
        width: 80px;
        height: 80px;
        margin-right: 12px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .t2 {
        flex: 1;
        font-size: 13px;
    }
    .number {
        width: 100px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .jiage {
        width: 200px;
        text-align: center;
        color: #f27124;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.right {
    background: #fff;
    padding: 10px 20px 15px;
    .title-3 {
        font-size: 18px;
    }
    .item-2 {
        display: flex;
        padding: 30px 0px;
        border-bottom: 1px solid #eee;
        .label {
            font-size: 14px;
            color: #757575;
        }
        > div:nth-child(2) {
            flex: 1;
            text-align: right;
        }
        .jiage {
            color: #f57224;
            font-weight: bold;
        }
    }
    .btn-1 {
        background: rgba($color: #f57224, $alpha: 0.7);
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            background: #f57224;
        }
    }
}

.订单提交{
    /deep/ .el-dialog__body{
        padding: 0px 20px;
    }
}
</style>