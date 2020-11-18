<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">在线充值</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="提示">选择支付通道</div>
            <ul class="mui-table-view list_1">
                <li class="mui-table-view-cell item" @click="选择卡(item)" v-for="(item, index) in list" :key="index">
                    <i class="图标 icon iconfont icon-card"></i>
                    <div class="mui-media-body">
                        <p class="mui-ellipsis">额度范围：<span class="红色">{{item.Min}} ~ {{item.Max ? item.Max : '不限制'}}</span></p>
                        <p>备注：<span>{{item.Note ? item.Note : '无'}}</span></p>
                    </div>
                    <span class="mui-badge mui-badge-primary">
                        <!-- {{args[type]}} -->
                        {{item.PayWay}}
                    </span>
                </li>
            </ul>
            <div class="提示1" v-if="!loading && list.length==0">
                暂无相关数据
            </div>
        </div>

        <div class="mui-content mui-fullscreen" v-show="当前选中">
            <div class="充值">
                <ul class="mui-table-view list_1">
                    <!-- <li class="mui-table-view-cell title_1">
                        选择通道
                    </li> -->
                    <li class="mui-table-view-cell 红色字体">
                        <a @click="当前选中=''"  class="mui-navigate-right">
                            重新选择支付通道
                        </a>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        当前通道
                    </li>
                    <li class="mui-table-view-cell item">
                        <i class="图标 icon iconfont icon-card"></i>
                        <div class="mui-media-body">
                            <p class="mui-ellipsis">额度范围：<span class="红色">{{当前选中.Min}} ~ {{当前选中.Max ? 当前选中.Max : '不限制'}}</span></p>
                            <p>备注：<span>{{当前选中.Note ? 当前选中.Note : '无'}}</span></p>
                        </div>
                        <span class="mui-badge mui-badge-primary">
                            <!-- {{args[type]}} -->
                            {{当前选中.PayWay}}
                        </span>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        充值信息
                    </li>
                    <li class="mui-table-view-cell item" @click="选择银行()" v-if="当前选中.Select">
                        <label>选中银行</label>
                        <div :class="{'提示语2':!payData}">
                            {{payData ? payData.text : '--选中银行--'}}
                        </div>
                        <!-- <input type="text" v-model="name" readonly placeholder="请输入姓名"> -->
                    </li>
                    <li class="mui-table-view-cell item" v-show="快捷输入.length>0">
                        <label>快速选择</label>
                        <div class="快速选择">
                            <div v-for="(item, index) in 快捷输入" :key="index" @click="totalAmount=item">
                                <div :class="{active:totalAmount==item}">{{item}}</div>
                            </div>
                        </div>
                    </li>
                    <li class="mui-table-view-cell item">
                        <label>存款金额</label>
                        <span>￥</span>
                        <input type="text" v-model="totalAmount" placeholder="存款金额">
                    </li>
                </ul>

                <btn @click.native="提交()"/>
             </div>
        </div>

    </div>
</template>

<script>
import btn from '@/components/btn.vue';
import { api_在线充值账号 , api_在线充值 } from '@/api/资金接口.js';
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
            type:"",
            当前选中:"",

            name:"",
            totalAmount:"",
            payData:"", //选中银行
            args:{
                qq: 'QQ钱包',
                alipay: '支付宝',
                wechat: '微信',
                cloudpay:'云闪付',
                kuaijie: '快捷支付',
                bank: '网银支付',
                jd: '京东钱包',
                ylsm:'银联扫码',
            }
        }
    },
    computed: {
        快捷输入(){
            if(!this.当前选中.AmountOptions){
                return []
            }else{
                return this.当前选中.AmountOptions.split(',')
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        选择卡(item){
            this.当前选中=item
        },
        选择银行(){
            var 选择器 = new mui.PopPicker();
            this.当前选中.Select.forEach(item => {
                item.text=item.Text
            });
            选择器.setData(this.当前选中.Select);
            选择器.show((items)=> {
                this.payData=items[0];
                选择器.dispose();
                选择器 = null;
            });
        },
        提交(){
                    
            // alert('准备跳转页面')
            // window.open('https://www.baidu.com/')
            if(this.当前选中.Select && !this.payData){
                this.$toast('请选择银行');
                return 
            }else if(!this.totalAmount){
                this.$toast('请输入金额')
                return
            }else if(this.当前选中.Min && this.当前选中.Min>this.totalAmount){
                this.$toast('金额不能小于'+this.当前选中.Min)
                return 
            }else if(this.当前选中.Max && this.当前选中.Max<this.totalAmount){
                this.$toast('金额不能大于'+this.当前选中.Min)
                return
            }

            var obj = {
                    payId:this.当前选中.Id,
                    totalAmount:this.totalAmount,
                    payData:this.payData ? this.payData.Id : ""
                };
            this.加载中(true)
            api_在线充值(obj).then(x=>{
                if(x.data.code==0){
                    if (window.plus) {
                        plus.runtime.openURL(x.data.msg);
                    }else{
                        try {
                            window.webkit.messageHandlers.FillMoney.postMessage({ link: x.data.msg });                        
                        } catch (error) {
                            this.$dialog.alert({
                                title: '标题',
                                message: '极速前往充值页面.',
                                confirmButtonText:"前往支付"
                            }).then(() => {
                                window.open(x.data.msg,'_blank');
                            });
                        }
                        // mui.alert('极速前往充值页面', '支付', '前往支付', function () {
                        //     window.open(x.data.msg, '_blank');
                        // });
                    }
                }else{
                    this.$toast(JSON.stringify(x))
                }
                this.加载中(false);
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
                this.加载中(false);
            })

        },
    },
    mounted() {
        this.type=this.$route.query.id;

        this.加载中(true)
        api_在线充值账号({type:this.args[this.type]}).then(x=>{
            this.list=x.data;
            this.loading=false
            this.加载中(false)
        }).catch(err=>{
            this.加载中(false)
            this.loading=false
        })
    },
}
</script>

<style lang="scss" scoped>
.红色{
    color: red;
}
.快速选择{
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    >div{
        width: calc(100% / 3) ;
        padding: 10px _vw(5) 0px;
        box-sizing: border-box;
        text-align: center;
        font-size: _vw(12);
        div{
            border-radius: 5px;
            padding: _vw(5) 0px;
            border: 1px solid #eeeeee;
            transition: all 0.5s;
        }
        .active{
            @include border-full(1px)
        }
    }
}

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
.list_1{
    .item{
        display: flex;
        align-items: center;
        .图标{
            font-size: _vw(30);
            margin: 0px _vw(10) 0px 0px;
        }
    }
}

.充值{
    margin-top: 0px;
    font-size: _vw(14);
    .title_1{
        background:#efeff4;
    }
    .mui-table-view-cell.mui-active{
        background: #ffffff;
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
    .提示语2{
        color: #6d6d6d
    }
}
</style>
