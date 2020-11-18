<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发雷红包</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="list">
                <li class="title">固定数量</li>
                <li class="item">
                    <div>红包个数</div>
                    <input readonly type="number" placeholder="填写个数" v-model="redEnvelope.quantity">
                    <div>个</div>
                </li>
                <li class="title title_1">
                    <span>当前为拼手气红包</span>
                    <span class="余额">账户余额：{{userinfo.Money}}</span>
                </li>
                <li class="item">
                    <div>总金额</div>
                    <input type="number" placeholder="请输入总金额" v-model="redEnvelope.totalAmount">
                    <div>元</div>
                </li>
                <li class="title">雷号范围:0-9</li>
                <li class="item">
                    <div>雷号</div>
                    <input type="tel"  @input="input_1()" placeholder="0-9之间任意一个数字" v-model="redEnvelope.bomb">
                    <div></div>
                </li>
                <li class="text_1">
                    <textarea name="" id="" cols="30" rows="10" v-model="redEnvelope.Note"></textarea>
                </li>
                <li class="钱">
                    ￥{{redEnvelope.totalAmount | fm}}
                </li>
            </ul>
            <btn value="塞钱进红包" @click.native="添加()"/>
            <div class="提示">未领取的红包，将于5分钟后发起退款</div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
import { number_format } from "@/assets/js/通用.js";
import { api_发布游戏红包 } from "@/api/红包游戏.js";
import { mapMutations, mapState } from 'vuex';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            redEnvelope:{
                Note:"恭喜发财,大吉大利",
                gameType:"100",     //扫雷游戏
                chatId:'',          //房间Id
                quantity:'7',       //红包数量
                totalAmount:'',     //总金额
                bomb:"",            //炸弹
            }
        }
    },
    filters:{
        fm(value){
            return number_format(value)
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo 
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        async 添加(){
            var kong = /^\s+$/;
            // if(!this.redEnvelope.quantity || this.redEnvelope.quantity<1){
            //     this.$toast('请输入红包数量');
            //     return
            // }else 
            if(!this.redEnvelope.totalAmount || this.redEnvelope.totalAmount<1){
                this.$toast('请输入红包金额');
                return
            }else if(!this.redEnvelope.bomb){
                this.$toast('请输入雷数');
                return
            }else if(this.redEnvelope.bomb<0 || this.redEnvelope.bomb>9){
                this.$toast('请输入正确的雷数范围');
                return
            }
            this.加载中(true)
            try {
                var r =await api_发布游戏红包(this.redEnvelope);
            } catch (error) {
                this.$toast('系统错误，稍后再试')
                this.加载中(false)
                return
            }
            this.加载中(false)
            if(r.data.code==0){
                this.$toast('发布成功');
                history.back()
            }else{
                this.$toast(r.data.msg);
            }
        },
        input_1(){
            var n = /^[0-9]/
            console.log(this.redEnvelope.bomb)
            this.redEnvelope.bomb = this.redEnvelope.bomb.slice(0,1)
            console.log(this.redEnvelope.bomb)
            if(!n.test(this.redEnvelope.bomb)){
                this.redEnvelope.bomb = ''
            }
        }
    },
    mounted() {
        this.redEnvelope.chatId = this.$route.query.id;
        this.$axios('static/json/hongbao.json').then(x=>{
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
.提示{
    text-align: center;
    font-size: _vw(12);
    margin: 0px 0px _vw(30);
}
.list{
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
    }
}
</style>