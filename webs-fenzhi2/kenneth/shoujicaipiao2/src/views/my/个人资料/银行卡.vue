<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">银行卡</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="title_1">
                <b>我的卡</b><span>共{{持卡数}}张</span>
                <van-icon @click="show=!show" :name="show ? 'eye-o' : 'closed-eye'"/>
            </div>
            <ul class="list">
                <li class="item" @click="点击默认()" v-if="银行卡.currentBank.Bank" :style="{'background-image':'url('+config.img_url+'static/image/daili.png)'}">
                    <div class="icon_box">
                        <i class="icon iconfont icon-card"></i>
                    </div>
                    <div v-if="银行卡.currentBank && 银行卡.currentBank.Bank">
                        <div class="银行名">{{银行卡.currentBank.Bank.split('|')[0]}}</div>
                        <div class="支持人">{{银行卡.currentBank.Bank.split('|').length>1 ? 银行卡.currentBank.Bank.split('|')[1] : ' '}}</div>
                        <div class="卡号">
                            <!-- **** **** **** 6789 -->
                            <template v-if="!show">
                                {{银行卡.currentBank.BankAccount | 隐藏卡号}}
                            </template>
                            <template v-else >
                                {{银行卡.currentBank.BankAccount}}
                            </template>
                        </div>
                    </div>
                    <div class="默认" >默认</div>
                </li>
                <li class="item" @click="点击其他(item)" v-for="(item, index) in 银行卡.otherBanks" :key="index" :style="{'background-image':'url('+config.img_url+'static/image/daili.png)'}">
                    <div class="icon_box">
                        <i class="icon iconfont icon-card"></i>
                    </div>
                    <div>
                        <div class="银行名">{{item.BankName}}</div>
                        <div class="支持人">{{item.BankKai}}</div>
                        <div class="卡号">
                            <!-- **** **** **** 6789 -->
                            <template v-if="!show">
                                {{item.BankAccount | 隐藏卡号}}
                            </template>
                            <template v-else >
                                {{item.BankAccount}}
                            </template>
                        </div>
                    </div>
                    <!-- <div class="默认" v-if="item.BankAccount==银行卡.currentBank.BankAccount">默认</div> -->
                </li>
                <li class="add" @click="$router.push('/my/addBankCard')">
                    <van-icon name="plus" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { api_银行卡列表 , api_设置默认银行卡 } from "@/api/银行卡接口.js";
import { mapMutations , mapState} from 'vuex';
export default {
    name:"",
    data() {
        return {
            show:false,
            银行卡:{
                currentBank:{}, //默认
                otherBanks:[]   //列表
            },
            type:""
        }
    },
    filters:{
        隐藏卡号(str){
            if(!str) return str;
            var str1=str.substring(0,str.length-5);
            var str2=str.substring(str.length-4);
            var str3=''
            for (let i = 0; i < str1.length; i++) {
                if(i!=0 && i%4==0){
                    str3+=' '
                }
                str3+='*'
            }
                str3+=' '+str2;
            return str3
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        持卡数(){
            var number=this.银行卡.otherBanks.length;
            if(this.银行卡.currentBank.BankAccount){
                number++;
            }
            return number;
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        点击默认(){
            if(this.type=='huanka'){
                history.back()
            }else{
                mui.alert('默认（正在使用中）银行卡不能进行相关操作','提示','确定',()=>{},'div')
            }
        },
        点击其他(item){
            if(this.type == 'huanka'){
                console.log('换卡',item)
                this.加载中(true);
                api_设置默认银行卡(item).then(x=>{
                    console.log(x)
                    if(x.data.code==0){
                        // this.$toast('设置成功')
                        history.back();
                    }else{
                        this.$toast(x.data.msg)
                    }
                    this.加载中(false);
                }).catch(err=>{
                    this.加载中(false);
                })
            }else{
                this.$router.push('/my/yhk?id='+item.Id)
            }
        },

    },
    mounted() {
        this.type = this.$route.query.t

        this.加载中(true)
        api_银行卡列表().then(x=>{
            this.加载中(false)
            this.银行卡=x.data;
        }).catch(err=>{
            this.加载中(false)
        })
    },
}
</script>

<style lang="scss" scoped>
.title_1{
    padding: _vw(10);
    b{
        font-size: _vw(16);
    }
    span{
        font-size: _vw(12);
        color: #6d6d6d;
        margin: 0px 0px 0px 3px;
    }
    i{
        float: right;
        margin: 5px;
    }
}

.list{
    padding: _vw(10);
    li{
        overflow: hidden;
        margin: 0px 0px _vw(10);
        height: 130px;
        border-radius: 5px;
        display: flex;
        box-shadow: 0px 0px 5px 1px #b5b5b5;
    }
    .item{
        padding: 20px 0px 0px 20px;
        background-color: #4f81be;
        background-size: cover;
        position: relative;
        .icon_box{
            width: _vw(40);
            height: _vw(40);
            background: #ffffff;
            border-radius: 100%;
            flex-shrink: 0;
            text-align: center;
            line-height: _vw(40);
            font-size: _vw(30);
            i{
                display: block;
            }
            margin: 10px _vw(15) 0px 0px;
        }
        .银行名{
            font-size: 20px;
            color: #ffffff;
        }
        .支持人{
            font-size: 14px;
            color: #ffffff;
        }
        .卡号{
            font-size: 25px;
            color: #ffffff;
            margin: 10px 0px 0px;
        }
        .默认{
            position: absolute;
            background: #f8c55c;
            font-size: 12px;
            padding: 2px;
            transform: rotate(45deg);
            text-align: center;

            width: 100px;
            top: 3px;
            right: -39px;
        }
    }
    .add{
        align-items: center;
        justify-content: center;
        font-size: 50px;
        color: #9e9e9e;
        background: #ffffff;
    }
}
</style>