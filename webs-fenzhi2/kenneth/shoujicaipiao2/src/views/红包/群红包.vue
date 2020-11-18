<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">群红包</h1>
            <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="$toast('暂未开放')">
                <i class="mui-icon mui-icon-help"></i>
            </button>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="list">
                <li class="title">数量设定</li>
                <li class="item">
                    <div>红包个数</div>
                    <input type="number" placeholder="填写个数" v-model="redEnvelope.quantity">
                    <div>个</div>
                </li>
                <li class="title">当前为拼手气红包</li>
                <li class="item">
                    <div>总金额</div>
                    <input type="number" placeholder="输入金额" v-model="redEnvelope.totalAmount">
                    <div>元</div>
                </li>
                <li class="text_1">
                    <textarea name="" id="" cols="30" rows="10" v-model="redEnvelope.Note"></textarea>
                </li>
                <li class="钱">
                    ￥{{redEnvelope.totalAmount | fm}}
                </li>
            </ul>
            <btn value="塞钱进红包" @click.native="添加()"/>
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
import { number_format } from "@/assets/js/通用.js";
import { api_发布群红包 } from "@/api/红包接口.js";
import { mapMutations } from 'vuex';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            redEnvelope:{
                Note:"恭喜发财,大吉大利",
                chatId:'',      //房间Id
                quantity:'',    //红包数量
                totalAmount:'',  //总金额
                // gameType:"",
            }
        }
    },
    filters:{
        fm(value){
            return number_format(value)
        }
    },
    computed: {
        
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        async 添加(){
            var kong = /^\s+$/;
            if(!this.redEnvelope.quantity || this.redEnvelope.quantity<1){
                this.$toast('请输入红包数量');
                return
            }else if(!this.redEnvelope.totalAmount || this.totalAmount<0){
                this.$toast('请输入红包金额');
                return
            }
            this.加载中(true)
            try {
                var r =await api_发布群红包(this.redEnvelope);
            } catch (error) {
                this.$toast('系统错误，稍后再试')
                this.加载中(false)
                return
            }
            this.加载中(false)
            if(r.data.code==0){
                history.back()
                this.$toast('发布成功');
            }else{
                this.$toast(r.data.msg);
            }
        }
    },
    
    

    mounted() {
        this.redEnvelope.chatId = this.$route.query.i;
        this.$axios('static/json/hongbao.json').then(x=>{
            console.log(x);
            // this.标语= x.data;
            if(x.data.length>0){
                let n = Math.floor(Math.random()*x.data.length);
                this.redEnvelope.Note = x.data[n] ;
            }else{
                this.redEnvelope.Note='恭喜发财,大吉大利'
            }
        }).catch(err=>{
            this.redEnvelope.Note='恭喜发财,大吉大利'
        })
    },
}
</script>

<style lang="scss" scoped>
.list{
    padding:0px _vw(5);
    .title{
        line-height: _vw(36);
        font-size: _vw(14);
        color: #828282;
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
    }
}
</style>