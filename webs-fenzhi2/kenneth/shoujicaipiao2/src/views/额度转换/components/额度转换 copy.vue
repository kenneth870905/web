<template>
    <div>
        <ul class="mui-table-view list">
            <li class="mui-table-view-cell" @click="选择类型()">
                <a class="mui-navigate-right item">
                    <span>
                        {{当前选中.value ? '切换平台' : '选择平台' }}
                    </span>
                    <span :class="{提示:!当前选中.value}">
                        {{当前选中.value ? 当前选中.text : '选择平台' }}
                    </span>
                </a>
            </li>
            <li class="mui-table-view-cell" v-show="当前选中.value">
                <van-radio-group v-model="radio" class="切换">
                    <van-radio name="1">
                        <van-button type="default" size="small">彩票平台</van-button>
                        <i class="icon iconfont icon-jiantou zuojian"></i>
                        <van-button type="default" size="small">{{当前选中.text}}</van-button>
                    </van-radio>
                    <van-radio name="2">
                        <van-button type="default" size="small">{{当前选中.text}}</van-button>
                        <i class="icon iconfont icon-jiantou youjian"></i>
                        <van-button type="default" size="small">彩票平台</van-button>
                    </van-radio>
                </van-radio-group>
            </li>
        </ul>

        <ul class="mui-table-view 输入额度">
            <li class="mui-table-view-cell item">
                <span>彩票平台：</span>
                <span class="金额">{{userinfo.Money}}</span>
            </li>
            <li class="mui-table-view-cell item" v-show="当前选中.value">
                <span>{{当前选中.text}}：</span>
                <span class="金额">{{余额}}</span>
            </li>
            <li class="mui-table-view-cell 输入框">
                <span>￥</span>
                <input type="number" step="0.1" placeholder="请输入金额" v-model.number="转账金额" @blur="blur1()">
            </li>
            <li class="mui-table-view-cell">
                <div>
                    <button @click="确认转账()" type="button" class="btn_1 mui-btn mui-btn-danger mui-btn-block disable">确认</button>
                </div>
            </li>
        </ul>

        <van-popup round v-model="数字键盘" class="密码弹框" overlay-class="密码遮罩">
            <div class="title_1">请输入支付密码</div>
            <van-password-input :value="pwd" :length="4" @click="数字键盘 = true" />
        </van-popup>
        
        <!-- 数字键盘 -->
        <van-number-keyboard :show="数字键盘" @input="onInput" @delete="onDelete" close-button-text="确定" @close="queren" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { api_获取平台余额 , api_转入金额 , api_转出金额 } from "@/api/余额接口.js";
import { api_余额宝详情2 , api_余额宝转入 } from "@/api/资金接口.js";
export default {
    name:"",
    data() {
        return {
            radio:"1",
            type:[
                { value: "yeb", text: "余额宝" },
                { value: 'ag', text: 'AG平台' },
                { value: 'kg', text: 'KG平台' },
                { value: 'by', text: 'BBIN平台' },
                { value: 'ky', text: 'KY平台' },
                { value: "mg", text: "MG平台" },
                { value: "ss", text: "三昇体育" },
                { value: "mg", text: "MG平台" },
                { value: "fg", text: "FG平台" },
                { value: "fy", text: "泛亚电竞" },
                { value: "bg", text: "BG平台" },
                { value: "vr", text: "VR平台" },
                { value: "gm", text: "GM平台" },
                { value: "QL", text: "爱棋牌" },
                { value: "HL", text: "欢乐棋牌" },
                { value: "HB", text: "哈巴电游" },
                { value: "LY", text: "乐游棋牌" },
                { value: "CQ", text: "CQ9平台" },
                { value: "SW", text: "SW平台" },
                { value: "DT", text: "DT平台" },
            ],
            当前选中:{},
            余额:0,
            转账金额:"",
            数字键盘:false,
            pwd:''
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
        ...mapActions({
            getUserInfo:'user/getUserInfo'
        }),
        onInput(key) {
            this.pwd = (this.pwd + key).slice(0, 4);
        },
        onDelete() {
            this.pwd = this.pwd.slice(0, this.pwd.length - 1);
        },
        blur1(){
            this.转账金额 = parseFloat(this.转账金额)
            if(this.转账金额){
                this.转账金额 = Math.floor(this.转账金额*10)/10
            }
        },
        刷新(){
            this.$toast.loading({
                mask: true,
                message: '加载中...'
            });
        },
        选择类型(){
            var 选择器 = new mui.PopPicker();
                选择器.setData(this.type);
                选择器.pickers[0].setSelectedValue(this.当前选中.value);
                选择器.show((items) => {
                    this.当前选中 = items[0];
                    this.查询平台余额()
                    选择器.dispose();
                    选择器 = null;
                });
        },
        查询平台余额(){
            this.余额='正在查询···'
            if(this.当前选中.value!='yeb'){
                api_获取平台余额({type:this.当前选中.value}).then(x=>{
                    console.log(x)
                    this.余额 = x.data.msg
                }).catch(err=>{
                    this.余额='查询失败，稍后再试'
                    this.$toast('系统错误，稍后再试')
                })
            }else{
                api_余额宝详情2().then(x=>{
                    this.余额 = x.data.Amount
                }).catch(err=>{
                    this.余额='查询失败，稍后再试'
                    this.$toast('系统错误，稍后再试')
                })
            }
        },
        确认转账(){
            if(!this.当前选中.value){
                this.$toast('请选择平台')
                return
            }else if(!this.转账金额){
                this.$toast('请输入金额')
                return
            }else if(this.转账金额<0){
                this.$toast('输入金额有误')
                return
            }
            if(this.当前选中.value!='yeb'){
                this.平台转换()
            }else{
                this.数字键盘 = true
            }
        }, 
        平台转换(){
            let obj = {
                    amount: this.转账金额,
                    type: this.当前选中.value
                }
            this.加载中(true)
            if(this.radio==1){
                api_转入金额(obj).then(x=>{
                    if(x.data.code == 0){
                        this.$toast('转入成功');
                        this.转账金额 = ''
                        this.查询平台余额();
                        this.getUserInfo();
                        this.转账金额 = ''
                    }else{
                        this.$toast(x.data.msg)
                    }
                    this.加载中(false)
                }).catch(err=>{
                    this.$toast('系统错误，稍后再试')
                    this.加载中(false)
                })
            }else{
                api_转出金额(obj).then(x=>{
                    if(x.data.code == 0){
                        this.$toast('转入成功');
                        this.转账金额 = ''
                        this.查询平台余额();
                        this.getUserInfo()
                    }else{
                        this.$toast(x.data.msg)
                    }
                    this.加载中(false)
                }).catch(err=>{
                    this.$toast('系统错误，稍后再试')
                    this.加载中(false)
                })
            }
        },
        queren(){
            console.log(this.pwd);
            if(this.pwd.length<4){
                this.$toast('密码长度错误')
                return
            }
            this.余额宝转换()
        },
        余额宝转换(){
            let obj = {
                    model: {
                        Money: this.转账金额,
                        // TransferType:1 //1表示转入 2 表示转出
                        TransferType: this.radio
                    },
                    pwd: this.pwd
                }
            this.数字键盘 = false
            this.加载中(true)
            api_余额宝转入(obj).then(x => {
                if (x.data.code == 0) {
                    this.$toast((this.radio == 1 ? '转入' : "转出") + '成功');
                    this.getUserInfo();
                    this.查询平台余额()
                    this.转账金额 = '';
                } else {
                    this.$toast(x.data.msg)
                }
                this.pwd = ''
                this.加载中(false)
            }).catch(err => {
                this.pwd = ''
                this.$toast('系统错误');
                this.加载中(false);
            })
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
/deep/ .密码遮罩{
    z-index: 9 !important;
}
.密码弹框{
    // top: auto;
    top: calc(50% - 100px);
    width: _vw(250);
    padding-bottom: _vw(15);
    .title_1{
        padding: _vw(15);
        text-align: center;
    }
    // [class*=van-hairline]::after{
    //     border: 1px solid #808080;
    // }
    .van-password-input__security{
        border: 1px solid #bbbbbb;
    }
    li:not(:last-child){
        border-right: 1px solid #bbbbbb;
    }
}



.mui-table-view-cell.mui-active{
    background-color: #ffffff;
}
.切换{
    /deep/ .van-radio__label{
        display: flex;
        align-items: center;
        flex: 1;
        button{
            flex: 1;
        }
        button::before,
        button:active{
            color: #000;    
            border-color:#ebedf0;
            background-color: #ffffff;
        }
    }
    ::v-deep .van-radio__icon--checked .van-icon{
        // color: 
        @include bgcolor;
        @include border-full(1px);
    }
    
    .van-radio:nth-child(1){
        margin-bottom: _vw(5);
    }
    .van-radio[aria-checked=true]{
        .iconfont{
            color: #1989fa;
        }
    }
    .youjian{
        transform: rotate(90deg);
        margin: 0px _vw(10);
    }
    .zuojian{
        margin: 0px _vw(10);
        transform: rotate(-90deg);
    }
    .iconfont {
        color: #8e8e8e;

    }
}
.list{
    margin: _vw(5) 0px 0px;
    .mui-navigate-right{
        padding-right: 35px;
    }
    .item{
        display: flex;
        justify-content: space-between;
        font-size: _vw(14);
        .提示{
            color: #b3b3b3;
        }
    }
}
.输入额度{
    font-size: _vw(14);
    margin: _vw(5) 0px 0px;
    .title_1{
        padding: _vw(10)  0px;
    }
    .van-password-input{
        margin: 0px;
    }
    .金额{
        color: #dd524d;
        font-weight: bold;
    }
    .输入框{
        display: flex;
        align-items: center;
        font-size: _vw(24);
        input{
            border: none;
            margin: 0px ;
            padding: 0px;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */
            color: #bfbfbf;
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #bfbfbf;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #bfbfbf;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #bfbfbf;
        }
    }
    .btn_1{
        height: _vw(40);
        margin: 0px;
        padding: 0px;
    }
}

</style>
