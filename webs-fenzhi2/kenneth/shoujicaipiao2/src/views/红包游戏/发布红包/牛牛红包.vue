<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">牛牛红包</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <ul class="list">
                <li class="钱">
                    ￥{{redEnvelope.totalAmount | fm}}
                </li>
                <li class="title title_1">
                    <span>金额</span>
                    <span class="余额">账户余额：{{userinfo.Money}}</span>
                </li>
                <li class="item">
                    <div>红包金额</div>
                    <input type="number" placeholder="请输入总金额" v-model="redEnvelope.totalAmount">
                    <div>元</div>
                </li>
                
                <li class="title">数量</li>
                <li class="item">
                    <div>牛牛红包个数</div>
                    <input type="number" placeholder="5-9" v-model="redEnvelope.quantity">
                    <div>个</div>
                </li>
            </ul>
            
            <btn value="塞钱进红包" @click.native="添加()"/>
            <div class="提示">牛牛红包不结算红包金额，只结算输赢金额</div>
        </div>   
    </div>
</template>

<script>
import { api_发布牛牛红包 } from "@/api/红包游戏.js";
import btn from '@/components/btn.vue'
import { mapState } from "vuex";
export default {
    name:"",
    components:{btn},
    data() {
        return {
            redEnvelope:{
                chatGameId:'',  //房间Id
                totalAmount:0,  //金额
                quantity:"",    //红包个数
            }
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo
        })
    },
    filters:{
        fm(value){
            return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 ,maximumFractionDigits:2}).format(value || 0)
        }
    },
    methods: {
        添加(){
            var kong = /^\s+$/;
            if(!this.redEnvelope.totalAmount || this.redEnvelope.totalAmount<1){
                this.$toast('请输入正确红包金额');
                return
            }else if(this.redEnvelope.quantity<5 || this.redEnvelope.quantity>9){
                this.$toast('请输入5-9之间的红包个数');
                return
            }
            api_发布牛牛红包(this.redEnvelope).then(x=>{
                console.log(x)
                if(x.data.code === 0){
                    this.$toast('发表成功')
                    history.back();
                }else{
                    this.$toast(x.data.msg)
                }
            }).catch(err=>{
                this.$toast('系统错误，稍后再试！')
            })
        }
    },
    mounted() {
        this.redEnvelope.chatGameId = this.$route.query.id;
    },
}
</script>

<style lang="scss" scoped>
.提示{
    text-align: center;
    font-size: _vw(12);
    margin: 0px 0px _vw(30);
}
.list{
    margin: 35px 0px 0px;
    padding:0px _vw(5);
    .title{
        line-height: _vw(36);
        font-size: _vw(14);
        color: #828282;
    }
    .title_1{
        display: flex;
        justify-content: space-between;
    }
    .余额{
        font-size: _vw(12);
        color: #e0a113;
        margin-right: 10px;
    }
    .item{
        display: flex;
        align-items: center;
        background: #ffffff;
        height: _vw(40);
        white-space: nowrap;
        padding: 0px _vw(10);
        font-size: _vw(14);
    }
    input{
        margin: 0px;
        padding: 0px _vw(20);
        border: none;
        text-align: right;
        height: 100%;
    }
    .text_1{
        margin: _vw(20) 0px 0px;
        textarea{
            height: _vw(70);
            border: none;
        }
    }
    .钱{
        font-size: _vw(30);
        text-align: center;
        margin: 5px 0px;
    }
}
</style>
