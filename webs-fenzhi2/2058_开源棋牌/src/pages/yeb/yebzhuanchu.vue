<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title"> {{type1==1 ? '转入' : '转出'}}</h1>
            <!-- <a class="mui-btn mui-btn-link mui-pull-right">明细</a> -->
        </header>
        <div class="mui-content mui-fullscreen" :class="{'弹出键盘':showKeyboard}">
            <div class="转出金额">
                <div class="title">平台余额: <span class="红色">{{userInfo.Money}}</span> </div>
                <div class="title">余额宝额度: <span class="红色">{{profit.YuBaoMoney}}</span> </div>
                
                <div class="title">{{type1==1 ? '转入' : "转出"}}金额(元)</div>
                <ul>
                    <li class="钱">￥</li>
                    <input v-model="obj.model.Money" type="text" :placeholder="type1==1 ? '请输入转入金额':'本次最大可转出'+最大转出">
                    <li v-if="type1==1" class="text" @click="全部()">全部{{type1==1 ? '转入':'转出'}}</li>
                </ul>
                <div class="title title1">支付密码</div>
                <ul>
                    <!-- 密码输入框 -->
                    <van-password-input :value="obj.pwd" :length="4" :mask="type=='password'" @focus="showKeyboard = true" />
                    <!-- :gutter="15" -->
                    <!-- <input v-model="obj.pwd" :type="type" class="input1"  placeholder="请输入支付密码"> -->
                    <li>
                        <!-- van-icon van-icon-closed-eye -->
                        <!-- van-icon van-icon-browsing-history -->
                        <i @click="切换类型()" :class="{'van-icon-closed-eye':type=='password','van-icon-browsing-history':type!='password'}" class="van-icon" style="font-size:25px;"></i>
                    </li>
                </ul>
            </div>
            <div class="提示">
                每次{{type1==1 ? '转入' : "转出"}}时系统会自动将【当前收益】加入【余额宝总金额】，并清空【当天收益】重新计算！
            </div>
            <div> 
 <van-button type="danger" @click.native="提交()">提交</van-button>
            </div>
            
        </div>

        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" close-button-text="完成" @blur="showKeyboard = false" />
    </div>
</template>

<script>
import { api_余额宝转入 , api_余额宝详情2} from "@/api/资金接口.js";
// import btn from '@/components/btn.vue'
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name: "",
    components: {
        // btn
    },
    data() {
        return {
            showKeyboard: false,
            profit:{},
            type: "password",
            obj: {
                model: {
                    Money: '',
                    // TransferType:1 //1表示转入 2 表示转出
                    TransferType: 1
                },
                pwd: ""
            },
            init:false
        }
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
        }),
        type1() {
            return this.$route.query.t ? this.$route.query.t : 1
        },
        最大转出(){
            if(this.profit.YuBaoMoney){
                return parseInt(this.profit.YuBaoMoney)
            }else{
                return 0
            }
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: 'user/getUserInfo'
        }),
        ...mapMutations({
            加载中:'加载中'
        }),
        onInput(key) {
            this.obj.pwd = (this.obj.pwd + key).slice(0, 4);
        },
        onDelete() {
            this.obj.pwd = this.obj.pwd.slice(0, this.obj.pwd.length - 1);
        },
        全部() {
            this.obj.model.Money = parseInt(this.userInfo.Money);
        },
        切换类型() {
            if (this.type == 'password') {
                this.type = 'text'
            } else {
                this.type = 'password'
            }
        },
        提交() {
            this.obj.model.TransferType = this.type1
            if (!this.obj.model.Money) {
                this.$toast('请输入金额')
                return
            } else if (!this.obj.pwd) {
                this.$toast('请输入密码');
                return
            }
            if(!this.init){
                this.加载中(true)
            }
            api_余额宝转入(this.obj).then(x => {
                if (x.data.code == 0) {
                    this.$toast((this.type1 == 1 ? '转入' : "转出") + '成功');
                    this.getUserInfo();
                    history.back();
                } else {
                    this.$toast(x.data.msg)
                }
                this.init=true
                this.加载中(false)
            }).catch(err => {
                this.$toast('系统错误');
                this.加载中(false);
            })
        },
        获取余额宝详情(){
            this.加载中(true)
            api_余额宝详情2().then(x=>{
                this.profit=x.data;
                this.加载中(false)
            }).catch(err=>{
                this.$toast('系统错误，稍后再试！')
                this.加载中(false)
            })
        }
    },
    mounted() {
        this.获取余额宝详情();
    },
}
</script>

<style lang="scss" scoped>
.提示{
    color: #757575;
    font-size: 12px;
    padding: 10px; 
}
.红色 {
    color: red;
}
.弹出键盘 {
    padding-bottom: 1000px;
}
.转出金额 {
    background: #ffffff;
    margin: 5px 0px 0px;
    padding: 0px 10px;
    .title1 {
        margin-top: 20px;
    }
    .title {
        font-size: 14px;
        padding: 10px 0px;
        color: #363636;
    }
    > ul {
        display: flex;
        align-items: center;
        padding: 10px 0px 10px;
        border-bottom: 1px solid #e6e6e6;
        .钱 {
            font-size: 24px;
        }
        .input1 {
            letter-spacing: 5px;
        }
        input {
            flex-grow: 1;
            padding: 0px;
            margin: 0px;
            border: none;
            &::-webkit-input-placeholder {
                color: #d6d6d6;
            }
            &:-moz-placeholder {
                color: #d6d6d6;
            }
            &::-moz-placeholder {
                color: #d6d6d6;
            }
            &::-ms-input-placeholder {
                color: #d6d6d6;
            }
        }
        .text {
            color: red;
            font-size: 16px;
            white-space: nowrap;
            flex-shrink: 0;
        }
    }

    .van-password-input__security {
        border-right: 1px solid #cccccc;
        li {
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            border-left: 1px solid #cccccc;
        }
    }
}
// [class*=van-hairline]::after{
//     border: 1px solid #cccccc
// }
.van-password-input {
    width: 100%;
}
.van-button--danger{
    width: 90%;
    margin: 18px;
}
</style>
