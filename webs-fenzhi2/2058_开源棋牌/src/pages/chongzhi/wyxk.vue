<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">手机转账</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="提示">选择银行</div>
            <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell" @click="选择卡(item)" v-for="(item, index) in list.Banks" :key="index">
                    <a href="javascript:;" class="mui-navigate-right">
                        <div class="mui-media-body">
                            <p class="mui-ellipsis">银行户名：{{item.UserName}}</p>
                            <p>卡号：<span class="红色">{{item.Account}}</span></p>
                            <p class="mui-ellipsis">{{item.Khh}}</p>
                        </div>
                    </a>
                    <span class="mui-badge mui-badge-primary">{{item.BankName}}</span>
                </li>
            </ul>
            <div class="提示1" v-if="!loading && list.length==0">
                暂无相关数据
            </div>
        </div>

        <div class="mui-content mui-fullscreen" v-show="银行卡">
            <div class="充值">
                <ul class="mui-table-view mui-table-view-chevron ">
                    <!-- <li class="mui-table-view-cell title_1">
                        选择银行
                    </li> -->
                    <li class="mui-table-view-cell 红色字体">
                        <a @click="银行卡=''"  class="mui-navigate-right">
                            重新选择银行
                        </a>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        收款银行
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>银行户名</label>
                        <div>{{银行卡 ? 银行卡.UserName : ""}}</div>
                        <button type="button" @click="复制('UserName')" class="mui-btn mui-btn-primary">复制</button>
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>收款卡号</label>
                        <div id="aaa">{{银行卡 ? 银行卡.Account : ''}}</div>
                        <button type="button" @click="复制('Account')" class="mui-btn mui-btn-primary">复制</button>
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>开户支行</label>
                        <div>{{银行卡 ? 银行卡.Khh : ''}}</div>
                        <!-- <button type="button" class="mui-btn mui-btn-primary">复制</button> -->
                    </li>
                    <li class="mui-table-view-cell title_1">
                        存款信息 (请转账后填写)
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>存款人姓名</label>
                        <input type="text" v-model="name" placeholder="请输入姓名">
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>存款金额</label>
                        <input type="text" v-model="金额" :placeholder="存款金额范围">
                    </li>
                </ul>

                <btn @click.native="提交()"/>
             </div>
        </div>

    </div>
</template>

<script>

import btn from '@/components/btn.vue';
import { api_获取网银卡 , api_网银转账 } from '@/api/资金接口.js';
import { mapMutations } from 'vuex';

// import VueClipboard from 'vue-clipboard2'
export default {
    name: "",
    components:{
        btn
    },
    data() {
        return {
            list:[],
            loading:true,
            银行卡:"",

            name:"",
            金额:""
        }
    },
    computed: {
        存款金额范围(){
            if(!this.银行卡){
                return ''
            }
            if(this.银行卡.Min || this.银行卡.Max){
                return '存款金额范围:'+(this.银行卡.Min ? this.银行卡.Min : 0)+'~'+(this.银行卡.Max ? this.银行卡.Max : '无上限')+'元'
            }else if(this.list.MinAccount || this.list.MaxAccount){
                return '存款金额范围:'+(this.list.MinAccount ? this.list.MinAccount : 0)+'~'+(this.list.MaxAccount ? this.list.MaxAccount : '无上限')+'元'
            }else{
                return ''
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        选择卡(item){
            this.银行卡=item
        },
        复制(key){
            var text=this.银行卡[key]

            // if(!window.plus){
                this.$copyText( text ).then((e)=>{
                    this.$toast('复制成功')
                },(e)=>{
                    // this.$toast('复制失败，请手动复制')
                    mui.alert('复制失败，请手动复制','提示','确定',()=>{},'div')
                })
            // }
        },
        提交(){
            var min=this.银行卡.Min ? this.银行卡.Min :  this.list.MinAccount;
            var max=this.银行卡.Max ? this.银行卡.Max :  this.list.MaxAccount;
            if(!this.name){
                this.$toast('请输入姓名');
                return
            }else if(!this.金额){
                this.$toast('请输入金额');
                return
            }else if(this.金额<min || this.金额>max){
                this.$toast('金额必须在'+min+'~'+max+'之间')
                return
            }
            var obj = {
                    bankId: this.银行卡.Id,
                    payWay: '20',
                    amount: this.金额,
                    transferUserName: this.name ,
                    isGift: false
                };
            this.加载中(true)
            api_网银转账(obj).then(x=>{
                console.log(x)
                if(x.data.code==0){
                    this.$toast('提交成功');
                    history.back();
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false);
            }).catch(err=>{
                this.加载中(false);
            })

        },
    },
    mounted() {
        api_获取网银卡().then(x=>{
            this.list=x.data;
            this.loading=false
        }).catch(err=>{
            this.loading=false
        })
    },
}
</script>

<style lang="scss" scoped>
.红色字体{
    color: $color;
}
.提示 {
    line-height: _vw(40);
    padding: 0px _vw(15);
    font-size: _vw(14);
}
.提示1{
    text-align: center;
    padding: _vw(20) 0px;
    font-size: _vw(14);
    color: #7b7b7b;
}
.红色{
    color: red;
}

.充值{
    margin-top: 0px;
    font-size: _vw(14);
    .title_1{
        background:#efeff4;
    }
    .item{
        display: flex;
        align-items: center;
        label{
            width: _vw(78);
            flex-shrink: 0
        }
        input{
            margin: 0px;
            padding: 0px;
            border: none;
            height: auto;
        }
    }
}
</style>
