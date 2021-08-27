<template>
    <div>
        <header class="mui-bar mui-bar-nav" @click="$router.back()">
            <a  class=" mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">充值类型</h1>
        </header>
        <div class="mui-content mui-fullscreen">
       
            <ul class="mui-table-view 个人信息">
                <li class="mui-table-view-cell mui-media">
                    <!-- <a href="javascript:;"> -->
                        <i class="fa fa-user-circle-o" style="float:left;"></i>
                        <div class="mui-media-body" style="font-size:18px;padding-left:7px;">
                            {{userInfo.UserId}}
                            <p class="mui-ellipsis">余额：<span class="红色字体">{{userInfo.Money}}</span></p>
                        </div>
                    <!-- </a> -->
                </li>
            </ul>
            <div v-if="充值类型.AuditRecharge">
                <div class="title_1">存款信息</div>
                <div class="mui-input-group 存款信息">
                    <div class="mui-input-row">
                        <label>审核状态</label>
                        <div class="row-content 红色字体">
                            {{充值类型.AuditRecharge.State}}
                        </div>
                    </div>
                    <div class="mui-input-row">
                        <label>收款卡号</label>
                        <div class="row-content">
                            {{充值类型.AuditRecharge.BankAccount}}
                        </div>
                    </div>
                    <div class="mui-input-row">
                        <label>收款银行</label>
                        <div class="row-content">
                            {{充值类型.AuditRecharge.BankUserName}}                            
                        </div>
                    </div>
                    <div class="mui-input-row">
                        <label>支付姓名</label>
                        <div class="row-content">
                            {{充值类型.AuditRecharge.TransferUserName}}                            
                        </div>
                    </div>
                    <div class="mui-input-row">
                        <label>存款金额</label>
                        <div class="row-content">
                            {{充值类型.AuditRecharge.Amount}}                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="title_1">手机转账 Mobile transfer</div>
            <ul class="mui-table-view 充值方式">
                <li class="mui-table-view-cell" @click="跳转选卡(item)" v-for="(item, index) in 充值类型.Transfer" :key="index">
                    <a class="mui-navigate-right item">
                        <img :src="config.img_url+'image/zhifu/'+item.Id+'.png'" alt="">
                        <span>{{item.Title}}</span>
                    </a>
                </li>
            </ul>
            <div class="title_1">在线支付 Online Payment</div>
            <ul class="mui-table-view 充值方式">
                <li class="mui-table-view-cell"  @click="跳转选卡(item)" v-for="(item, index) in 充值类型.Online" :key="index">
                    <a class="mui-navigate-right item">
                        <img :src="config.img_url+'image/zhifu/'+item.Id+'.png'" alt="">
                        <span>{{item.Title}}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { api_获取充值类型接口 } from "@/api/资金接口.js";
import { mapState } from 'vuex';
export default {
    name: "",
    data() {
        return {
            充值类型:{
                AuditRecharge: null,
                Online: [],
                Transfer: []
            }
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userInfo: "userInfo",
        })
    },
    methods: {
        跳转选卡(item){
            if(item.Type=='wyzz'){
                // 网银选卡
                if(this.充值类型.AuditRecharge){
                    this.$toast('您已提交过申请，请等待审核')
                }else{
                    this.$router.push('/wyxk?id='+item.Id)
                }
            }else if(item.Type=='dzzz'){
                if(this.充值类型.AuditRecharge){
                    this.$toast('您已提交过申请，请等待审核')
                }else{
                    //电子选卡
                    this.$router.push('/dzxk?id='+item.Id)
                }
            }else{
                this.$router.push('/zxxk?id='+item.Id);
            }
        }
    },
    mounted() {
        api_获取充值类型接口().then(x=>{
            this.充值类型=x.data;
        }).catch(err=>{
            console.log(err);
        })
    },
}
</script>

<style lang="scss" scoped>
.个人信息{
    i{
        font-size: 42px;
        color: $color;
    }
}
.红色字体{
        color: $color;
    }

.存款信息{
    font-size: 14px;
    .row-content{
        padding: 11px 0px;
    }
}

.title_1{
    height: _vw(40);
    line-height: _vw(40);
    align-items: center;
    padding: 0px 10px;
    font-size: _vw(15);
    color: #6d6d72;
}

.充值方式{
    font-size: _vw(17);
    .item{
        display: flex;
        align-items: center;
    }
    img{
        width: _vw(36);
        height: _vw(36);
        flex-shrink: 0;
        margin: 0px _vw(12) 0px 0px;
    }
}
.mui-content>.mui-table-view:first-child{
    margin-top: 20;
}
</style>
