<template>
    <div class="购物车">
        <van-nav-bar fixed title="购物车" :right-text="len>0 ? '删除选中' : ''" left-arrow @click-left="$back()" @click-right="ClickRight"></van-nav-bar>
        <ul class="list">
            <li v-for="item in 购物车">
                <div class="checkbox">
                    <van-checkbox v-model="item.checked"></van-checkbox>
                </div>
                <div class="img">
                    <img :src="$img_url+item.sp.cover" alt="" srcset="">
                </div>
                <div class="xiangq">
                    <div class="name">{{item.sp.title}}</div>
                    <div class="规格">颜色系列：{{item.规格.color}}，尺寸：{{item.规格.size}}</div>
                    <div class="购买">
                        <span class="qian">₱{{item.规格.price | qian}}</span>
                        <span>数量：x{{item.数量}}</span>
                    </div>
                </div>
            </li>
        </ul>

        <van-empty description="购物车空空如也" v-if="购物车.length==0"/>

        <van-submit-bar currency="₱" :price="合计" button-text="结算" @submit="jiesuan" >
            <van-checkbox v-model="checked" @click="全选()">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            val1:true,
            checked:true
        }
    },
    filters:{
        qian(number){
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
        }
    },
    computed:{
        ...mapState({
            购物车:"购物车",
            立即购买:'立即购买'
        }),
        len(){
            return this.购物车.filter(x=>x.checked).length
        },
        合计(){
            let 合计= 0;
            this.购物车.forEach(item=>{
                if(item.checked){
                    let num = item.数量 * item.规格.price
                        num = parseFloat(num.toFixed(2)) 
                    合计 += num
                }
            })
            return  合计 * 100
        }
    },
    methods: {
        ...mapMutations({
            删除购物车:"删除购物车",
            setValue:"setValue"
        }),
        ClickRight(){
            this.购物车.forEach(item=>{
                if(item.checked){
                    this.删除购物车(item.gid)
                }
            })
        },
        jiesuan(){
            this.立即购买.type=1
            this.立即购买.list = this.购物车.filter(x=>x.checked)
            this.setValue(['立即购买',this.立即购买])
            this.$router.push('/Checkout')
        },
        全选(){
            console.log(this.checked)
            this.购物车.forEach(item=>{
                item.checked=this.checked
            })
        }
    },
    mounted() {
        for (let i = 0; i < this.购物车.length; i++) {
            this.$set(this.购物车[i],'checked',true)
        }
    },
    watch:{
        len(){
            this.checked = this.len==this.购物车.length
        }
    }
}
</script>

<style lang="scss" scoped>
.购物车{
    padding: 46px 0px 0px;
}

.list{
    margin: 20px 0px 0px;
    li{
        display: flex;
        background: #fff;
        padding: 10px 10px;
        margin: 10px 0px;
    }
    .checkbox{
        flex-shrink: 0;
        width: 30px;
        text-align: center;
        display: flex;
        align-items: center;
    }
    .img{
        width: 90px;
        height: 90px;
        flex-shrink: 0;
        background: #eee;
        margin: 0px 10px 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .xiangq{
        flex: 1;
        font-size: 12px;
        .name{
            height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
        }
        .规格{
            color: rgba($color: #000000, $alpha: 0.6);
            margin: 15px 0px 8px;
        }
        .购买{
            display: flex;
            justify-content: space-between;
            .qian{
                color: rgb(255, 51, 12);
                font-weight: bold;
            }
        }
    }
}

</style>