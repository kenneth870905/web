<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">绑定银行卡</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div>
                <ul class="mui-table-view list">
                    <li class="mui-table-view-cell title_1">
                        请选择卡类信息
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="选择银行()">
                            <label>卡类型:</label>
                            <span :class="{'提示':!obj.BankName}">{{obj.BankName ? obj.BankName : '请选择银行'}}</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        请填写银行信息
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>银行卡号:</label>
                        <input v-model="obj.BankAccount" type="text" placeholder="请输入银行卡号" />
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>开户行:</label>
                        <input v-model="obj.Bankkai" type="text" placeholder="如：工商银行**市支行" />
                    </li>
                    <li class="mui-table-view-cell item" v-if="首次添加">
                        <label>持卡人:</label>
                        <input v-model="obj.name" type="text" placeholder="请输入真实姓名" />
                    </li>
                    <li class="mui-table-view-cell item" v-if="首次添加">
                        <label>安全密码:</label>
                        <input type="password" v-model="obj.qkPwd" maxlength="4" placeholder="4位数字" />
                    </li>
                </ul>
            </div>
            <btn @click.native="提交()" />
        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue';
import { api_添加银行卡 , api_银行卡列表 } from "@/api/银行卡接口.js";
import { api_设置银行 } from "@/api/个人资料.js";

import { mapState , mapMutations } from "vuex";
export default {
    name:"",
    data() {
        return {
            obj:{
                BankAccount:"",     //银行卡号
                Bankkai:"",         //开户行
                BankName:"",         //银行名

                qkPwd:"",       //用于旧接口
                name:"",        //用于旧接口
            },
            银行卡:{
                currentBank:{}, //默认
                otherBanks:[]   //列表
            }
        }
    },
    components:{
        btn
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        首次添加(){
            return (!this.银行卡.currentBank.BankAccount && this.银行卡.otherBanks.length==0)
        }
    },
    methods: {
        ...mapMutations({
            加载中:'加载中'
        }),
        选择银行() {
            var list = [];
            this.config.bank.forEach(item => {
                list.push({
                    value: "",
                    text: item
                });
            });
            var this_1 = this;
            var 选择器 = new mui.PopPicker();
            选择器.setData(list);
            选择器.show(items => {
                this.obj.BankName = items[0].text;
                选择器.dispose();
                选择器 = null;
            });
        },
        提交(){
            if(!this.首次添加){
                this.添加银行卡()
            }else{
                this.旧接口添加();
            }
        },
        旧接口添加(){
            if (!this.obj.BankName) {
                this.$toast("请选择银行");
                return;
            } else if (!this.obj.BankAccount || this.obj.BankAccount.length < 16 ||this.BankAccount > 19) {
                this.$toast("请输入16-19位银行卡号");
                return;
            } else if (!this.obj.name) {
                this.$toast("请输持卡人姓名");
                return;
            } else if (this.obj.name.length < 2 || this.obj.name.length > 15) {
                this.$toast("名字长度为2-15位数");
                return;
            } else if (this.obj.qkPwd.length != 4) {
                this.$toast("请输入4位数安全密码");
                return;
            }
            var obj={
                    name:this.obj.name,
                    khBank:this.obj.BankName,
                    bank:this.obj.Bankkai,
                    bankAccount:this.obj.BankAccount,
                    qkPwd:this.obj.qkPwd
                }
                //  name: "",
                // khBank: "", //开户行
                // bank: "", //支行名
                // bankAccount: "", //账号
                // qkPwd: "" // 安全密码

            this.加载中(true);
            api_设置银行(obj).then(x => {
                console.log(222)
                console.log(x);
                if (x.data.code == 0) {
                    this.$toast("设置成功");
                    history.back();
                } else {
                    this.$toast(x.data.msg);
                }
                this.加载中(false);
            }).catch(err => {
                this.加载中(false);
                this.$toast("系统错误稍后再试");
            });
        },
        添加银行卡(){
            if (!this.obj.BankName) {
                this.$toast("请选择银行");
                return;
            } else if (!this.obj.BankAccount || this.obj.BankAccount.length < 16 ||this.BankAccount > 19) {
                this.$toast("请输入16-19位银行卡号");
                return;
            }else if(!this.obj.Bankkai){
                this.$toast('请输入开户行')
                return
            }
            this.加载中(true)
            api_添加银行卡(this.obj).then(x=>{
                if(x.data.code==0){
                    this.$toast('添加成功');
                    history.back();
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false);
            }).catch(err=>{
                this.加载中(false);
            })
        }
    },
    mounted() {
        api_银行卡列表().then(x=>{
            console.log(x);
            this.银行卡=x.data;
        }).catch(err=>{
            console.log(err);
        })

    },
}
</script>

<style lang="scss" scoped>
.list{
    font-size: _vw(14);
    .title_1{
        background: #efeff4;
        color: #868686;
    }
    .item{
        display: flex;
        align-items: center;
        label{
            flex-shrink: 0;
            width: _vw(70);
        }
        input{
            padding: 0px;
            margin: 0px;
            height: auto;
            border: none;
        }
        .提示 {
            color: #9c9c9c;
        }
    }
}
.mui-bar-nav{
    background: #c1c1c1;
}
.mui-title{
    color: white;
}
</style>