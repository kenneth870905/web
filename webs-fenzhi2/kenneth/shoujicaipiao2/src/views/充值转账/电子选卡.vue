<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{type=='数字货币' ? '数字货币' : "手机转账"}}</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="提示">{{type=='数字货币' ? '选择账号' : '选择银行'}}</div>
            <ul class="mui-table-view list_1">
                <li class="mui-table-view-cell item" @click="选择卡(item)" v-for="(item, index) in list.Alipays" :key="index">
                    <i class="icon iconfont 图标" :class="{'icon-icon--':!item.QrCode , 'icon-erweima':item.QrCode}"></i>
                    <div class="mui-media-body">
                        <p class="mui-ellipsis">
                            <!-- <label>账户：</label> -->
                            {{item.Account}}
                        </p>
                        <p class="mui-ellipsis">
                            <!-- <label>户名：</label> -->
                            {{item.UserName}}
                        </p>
                        <p class="mui-ellipsis">
                            <!-- <label>描述：</label> -->
                            {{item.Note}}
                        </p>
                    </div>
                    <span class="mui-badge mui-badge-primary">{{item.Type}}</span>
                </li>
            </ul>
            <div class="提示1" v-if="!loading && list.length==0">
                暂无相关数据
            </div>
        </div>

        <div class="mui-content mui-fullscreen" v-if="选中账户">
            <div class="充值">
                <ul class="mui-table-view mui-table-view-chevron ">
                    <!-- <li class="mui-table-view-cell title_1">
                        选择账号
                    </li> -->
                    <li class="mui-table-view-cell 红色字体">
                        <a @click="选中账户=''" class="mui-navigate-right">
                            重新选择账号
                        </a>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        收款信息(类型：{{选中账户.Type}})
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>{{选中账户.Account.split('：')[0]}}：</label>
                        <div>{{选中账户.Account.split('：')[1]}}</div>
                        <button type="button" @click="复制('Account')" class="mui-btn mui-btn-primary">复制</button>
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>{{选中账户.UserName.split('：')[0]}}：</label>
                        <div class="UserName">{{选中账户.UserName.split('：')[1]}}</div>
                        <button type="button" @click="复制('UserName')" class="mui-btn mui-btn-primary">复制</button>
                    </li>
                    <li class="mui-table-view-cell item" v-if="选中账户.Note">
                        <label>描述：</label>
                        <div v-if="选中账户.Note.split('：').length>1">{{选中账户.Note.split('：')[1]}}</div>
                        <div v-if="选中账户.Note.split('：').length==1">无</div>
                    </li>
                    <li class="mui-table-view-cell item" v-if="type=='数字货币'">
                        <label>汇率：</label>
                        <div>{{选中账户.ExchangeRate}}</div>
                    </li>
                    <div v-if="选中账户.QrCode" class="text-center 二维码图片">
                        <img :src="config.api_url + 选中账户.QrCode" class="m-3"/>
                        <!-- <p style="padding-bottom: 1rem;font-size: 1.6rem;" v-show="showImgTip">点击图片保存到相册</p> -->
                    </div>

                    <li class="mui-table-view-cell title_1">
                        存款信息 (请转账后填写)
                    </li>
                    <li class="mui-table-view-cell item">
                        <label v-if="type == '支付宝'">姓名</label>
                        <label v-else-if="type == '云闪付'">姓名</label>
                        <label v-else-if="type == '数字货币'">姓名</label>
                        <label v-else>微信昵称</label>
                        <input type="text" v-model="transferUserName" placeholder="请输入姓名">
                    </li>
                    <li class="mui-table-view-cell item" v-if="type=='数字货币'">
                        <label>货币数量</label>
                        <input type="number" v-model="amount" placeholder="请输入货币数量">
                    </li>
                    <li class="mui-table-view-cell item" v-if="type=='数字货币'">
                        <label>存款金额</label>
                        <input type="text" class="huise" style="padding-left: 10px;" :value="(amount*选中账户.ExchangeRate).toFixed(2)" readonly>
                    </li>
                    <li class="mui-table-view-cell item" v-if="type!='数字货币'">
                        <label>存款金额</label>
                        <input type="text" v-model="amount" :placeholder="存款金额范围">
                    </li>
                    
                    <li class="mui-table-view-cell item">
                        <label>交易标识</label>
                        <input type="text" v-model="transferAccount" :placeholder="选中账户 ? 选中账户.Tips : ''">
                    </li>
                </ul>

                <btn @click.native="提交()" />
            </div>
        </div>

    </div>
</template>

<script>

import btn from '@/components/btn.vue';
import { api_电子转账账号, api_网银转账 } from '@/api/资金接口.js';
import { mapMutations , mapState} from 'vuex';
import 复制 from '@/assets/js/复制.js'

// import VueClipboard from 'vue-clipboard2'
export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {
            list: [],
            loading: true,
            选中账户: "",
            type:"",
            transferUserName: "",   //姓名
            amount: "",     //金额
            transferAccount:""  //交易标识
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        存款金额范围(){
            if(!this.选中账户){
                return ''
            }
            if(this.选中账户.Min || this.选中账户.Max){
                return '存款金额范围:'+(this.选中账户.Min ? this.选中账户.Min : 0)+'~'+(this.选中账户.Max ? this.选中账户.Max : '无上限')+'元'
            }else if(this.list.MinAccount || this.list.MaxAccount){
                return '存款金额范围:'+(this.list.MinAccount ? this.list.MinAccount : 0)+'~'+(this.list.MaxAccount ? this.list.MaxAccount : '无上限')+'元'
            }else{
                return ''
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中: "加载中"
        }),
        选择卡(item) {
            this.选中账户 = item
        },
        复制(key) {
            var list=this.选中账户[key].split('：')
            复制(this , list[1])
        },
        提交() {
            var min = this.选中账户.Min ? this.选中账户.Min : this.list.MinAccount;
            var max = this.选中账户.Max ? this.选中账户.Max : this.list.MaxAccount;
            if (!this.transferUserName) {
                this.$toast('请输入姓名');
                return
            } else if (!this.amount) {
                this.$toast('请输入金额');
                return
            } else if (this.amount < min || this.amount > max) {
                this.$toast('金额必须在' + min + '到' + max + '之间')
                return
            }

            var 金额 = this.type != '数字货币' ? this.amount : (this.amount*this.选中账户.ExchangeRate).toFixed(2)
            var obj = {
                    alipayId: this.选中账户.Id,
                    payWay: this.选中账户.PayWayId,
                    amount: 金额,    
                    transferUserName: this.transferUserName,
                    transferAccount: this.transferAccount,
                    isGift: false
                };
            this.加载中(true)
            api_网银转账(obj).then(x => {
                console.log(x)
                if (x.data.code == 0) {
                    this.$toast('提交成功');
                    history.back();
                } else {
                    this.$toast(x.data.msg)
                }
                this.加载中(false);
            }).catch(err => {
                this.加载中(false);
            })
        },
    },
    mounted() {


        var id = this.$route.query.id
        var query = {
            type: ""
        }
        if (id == 'alipay') {
            query.type = "支付宝"
        } else if (id == 'wechat') {
            query.type = "微信"
        } else if (id == 'cloudpay') {
            query.type = '云闪付'
        }else if(id=='currency'){
            query.type = '数字货币'
        }
        this.type=query.type
        
        this.加载中(true)
        api_电子转账账号(query).then(x => {
            console.log(x)
            this.list = x.data;
            this.loading = false
            this.加载中(false)
        }).catch(err => {
            this.加载中(false)
            this.loading = false
        })
    },
    watch: {
        amount(){
            if(this.amount<0){
                this.amount = 0
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.红色字体{
    color: $color;
}
.huise{
    background: #eee;
    
}
.list_1{
    .item{
        display: flex;
        align-items: center;
        .图标{
            font-size: _vw(30);
            margin: 0px _vw(5) 0px 0px;
        }
    }
}


.提示 {
    line-height: _vw(40);
    padding: 0px _vw(15);
    font-size: _vw(14);
}
.提示1 {
    text-align: center;
    padding: _vw(20) 0px;
    font-size: _vw(14);
    color: #7b7b7b;
}
.红色 {
    color: red;
}

.充值 {
    margin-top: 0px;
    font-size: _vw(14);
    .title_1 {
        background: #efeff4;
    }
    .item {
        display: flex;
        align-items: center;
        label {
            width: _vw(78);
            flex-shrink: 0;
        }
        .UserName{
            width: _vw(211);
            overflow: hidden;
            text-overflow: ellipsis;
        }
        input {
            margin: 0px;
            padding: 0px;
            border: none;
            height: auto;
        }
    }
    .二维码图片{
        text-align: center;
        img{
            width: _vw(150);
            height: _vw(150);
            margin: _vw(10) 0px;
        }
    }
}
</style>
