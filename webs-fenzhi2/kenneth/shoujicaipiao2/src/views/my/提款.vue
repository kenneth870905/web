<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">提款</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <div>
                <div v-if="info.IsAudit">
                    <ul class="list mui-table-view">
                        <li class="mui-table-view-cell title">
                            <span>已提交过审核</span>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>订单号</label>
                            <div class="绿色">{{info.Code}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>提交时间</label>
                            <div>{{info.Createtime}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>审核状态</label>
                            <div>{{info.State}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>银行</label>
                            <div>{{info.BankName}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>银行</label>
                            <div>{{info.BankAccount}}</div>
                        </li>
                        <li class="mui-table-view-cell item">                        
                            <label>持卡人</label>
                            <div v-text="info.MemberName"></div>
                        </li>
                        <li class="mui-table-view-cell item">                        
                            <label>提款金额</label>
                            <div>{{info.Amount}} 元</div>
                        </li>
                        <li v-if="info.TuiShuiAmount" class="mui-table-view-cell item">                        
                            <label>代理收益</label>
                            <div>{{info.TuiShuiAmount}} 元</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>今日提款</label>
                            <div v-text="info.DayCount"></div>
                        </li>
                    </ul>
                </div>

                <div class="添加" @click="$router.push('/my/cardbag')" v-else-if="!info.IsBank || !info.IsQkPwd">
                    <i class="mui-icon mui-icon-plus"></i>
                    <div>添加银行卡</div>
                </div>
                <div v-else>
                    <ul class="list mui-table-view">
                        <li class="mui-table-view-cell title">
                            <span>银行卡信息</span>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>卡号</label>
                            <div class="绿色">{{info.BankAccount}}</div>
                           
                        </li>
                        <li class="mui-table-view-cell">
                            <a class="mui-navigate-right item" @click="$router.push('/my/cardbag?t=huanka')">
                                <label>银行卡</label>
                                <div class="绿色 flex_1">{{info.Bank + '('+info.Name+')'}}</div>
                                <div>切换银行卡</div>
                            </a>
                        </li>
                        <li class="mui-table-view-cell title">
                            提交审核(每日提款{{config.tk ? config.tk : 5}}次后，会额外收费)			
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>当前打码量</label>
                            <div>{{info.TempDml}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>所需打码量</label>
                            <div>{{info.Dml}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>可用余额</label>
                            <div>{{info.Money}}</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>今日提款</label>
                            <div>{{info.DayCount}}次(未通过：{{info.DayNotCount}}次)</div>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>提款金额</label>
                            <input type="number" @blur="blur_1()" v-model="amount" placeholder="100起提" >
                            <span>￥</span>
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>提款密码</label>
                            <input type="password" v-model="pwd" maxlength="4" placeholder="请输入4位提款密码">
                        </li>
                        <li class="mui-table-view-cell item">
                            <label>预计到账</label>
                            <div>{{planAmount}}元</div>
                        </li>
                        <li class="mui-table-view-cell item" v-if="info.ShouXuFei>0">
                            <label>手续费</label>
                            <div>{{info.ShouXuFei}}元</div>
                        </li>
                        <li class="mui-table-view-cell item" v-if="info.XingZhengFei>0">
                            <label>手续费</label>
                            <div>{{info.XingZhengFei}}元</div>
                        </li>
                    </ul>
                    <btn @click.native="提现()"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { api_获取提款卡 , api_提现 } from "@/api/资金接口.js";
import btn from '@/components/btn.vue'
import { mapMutations , mapState } from 'vuex';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            amount:"",
            pwd:"",
            info:{}
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        planAmount: function () {
            var a = this.amount - this.info.ShouXuFei - this.info.XingZhengFei;
            return a > 0 ? a.toFixed(2) : 0;
        }
    },
    methods: {
        ...mapMutations({
            加载中:'加载中'
        }),
        blur_1(){
            this.amount = parseFloat(this.amount)
        },
        提现(){
            if (this.amount < 100) {
                this.$toast('提款金额必须大于100元');
                return
            }else 
            if(this.amount > this.info.Money){
                this.$toast('可用余额不足');
                return
            }else if(this.pwd.length != 4){
                this.$toast('请输入提款密码');
                return
            }
            mui.confirm('确定提交提款审核吗？<br>金额：' + this.amount, '确认', ['否', '是'], (e)=>{
                if (e.index == 1) {
                    this.加载中(true)
                    api_提现({amount: this.amount, pwd: this.pwd }).then(x=>{
                        if(x.data.code==0){
                            this.$toast('提交成功，请等待审核')
                        }else{
                            this.$toast(x.data.msg)                            
                        }
                        this.加载中(false)
                    }).catch(err=>{
                        this.$toast('系统繁忙，稍后再试')
                        this.加载中(false)
                    })
                }
            })
        },
        获取提款信息(){
            this.加载中(true)
            api_获取提款卡().then(x=>{
                this.info=x.data;
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
            })
        }
    },
    mounted() {
       this.获取提款信息()

    },
}
</script>

<style lang="scss" scoped>
.添加{
    // height: _vw(125);
    padding: _vw(26) 0px;
    width: 90%;
    margin: 10px auto 0px;
    text-align: center;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 4px 4px 6px 0px #b1b1b1;
    i{
        color: $color;
        font-size: _vw(45);
    }
}
.flex_1{
    flex:1
}
.list{
    font-size: _vw(14);
    .title{
        background: #efeff4;
    }
    .item{
        display: flex;
        &.mui-navigate-right{
            padding-right: 34px;
        }
        &::after{
            font-size: _vw(20)
        }
    }
    label{
        width: _vw(80);
        flex-shrink: 0;
    }
    input{
        height: auto;
        padding: 0px;
        margin: 0px;
        border: none;
    }
}
.绿色{
    color: #28a745;
}
</style>
