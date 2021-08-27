<template>
    <div class="information">
    <van-nav-bar title="配资" left-arrow :fixed="true" @click-left="onClickLeft"/>         
        <div class="content">

            <ul class="title_ul">
                <li @click="clicktite(1)" :class="{'titleActive':tableType ==1}">按天配资 </li>
                <li @click="clicktite(2)" :class="{'titleActive':tableType ==2}">按周配资</li>
                <li @click="clicktite(3)" :class="{'titleActive':tableType ==3}">按月配资</li>
                <li @click="clicktite(4)" :class="{'titleActive':tableType ==4}">免息配资</li>
            </ul>
            <ul class="ul_content">
                <li>
                    <div class="content_min">
                        <div class="baozhengj">输入保证金额</div>
                        <el-input placeholder="保证金额100~100000元,为100的倍数" v-model.number="保证金">
                            <span slot="suffix" class="">元</span>
                        </el-input>
                        <div class="baozhengj">选择杠杆比例，资金放大</div>
                        <el-input @click.native="beishow=true" placeholder="5倍~10倍"  v-model="倍数.multiple" :disabled="true">
                            <span slot="suffix" class="">倍</span>
                        </el-input>
                        <van-popup v-model="beishow" position="bottom" :overlay="true">
                            <van-picker :columns="赔率" value-key="multiple" show-toolbar title="标题" @cancel="beishow=false" @confirm="onConfirm" />
                        </van-popup>
                        <div class="baozhengj">确认超盘信息</div>
                        <ul class="确认超盘信息">
                            <li>
                                <div class="quer_title">总超盘资金</div>
                                <div class="quer_num"><span class="fred">{{总超盘资金}}</span>元</div>
                            </li>
                            <li>
                                <div class="quer_title">风险保证金</div>
                                <div class="quer_num"><span class="fred">{{保证金 ? 保证金 : 0}}</span>元</div>
                            </li>
                            <li>
                                <div class="quer_title">亏损警戒线</div>
                                <div class="quer_num"><span class="fred">{{亏损警戒线}}</span>元</div>
                            </li>
                            <li>
                                <div class="quer_title">亏损平仓线</div>
                                <div class="quer_num"><span class="fred">{{亏损平仓线}}</span>元</div>
                            </li>
                            <li>
                                <div class="quer_title">超盘周期</div>
                                <div class="quer_num">
                                    <span v-if="tableType==1"><span class="fred">2</span>天</span>
                                    <span v-if="tableType==2"><span class="fred">2</span>周</span>
                                    <span v-if="tableType==3"><span class="fred">1</span>个月</span>
                                    <span v-if="tableType==4"><span class="fred">20</span>个交易日</span>
                                </div>
                            </li>
                            <li>
                                <div class="quer_title">资金利率</div>
                                <div class="quer_num"><span class="fred">{{this.倍数.rate}}</span>%</div>
                            </li>
                            <li>
                                <div class="quer_title">账户管理费</div>
                                <div class="quer_num"><span class="">{{管理费}}</span>元/月</div>
                            </li>
                        </ul>
                        <div class="备注">
                            <span class="fred"> 备注:&nbsp;</span>您需要支付的金额为保证金0元+元（管理费）=<span>0</span>元
                        </div>
                        <div class="复选">
                            <van-checkbox v-model="checked">我已阅读并同意<span class="fred">《宝贷服务条款》</span></van-checkbox>
                        </div>
                        <div class="btn">
                            <van-button type="danger" @click="我要超盘()">我要操盘</van-button>
                        </div>
                        <p class="shuom">如你不清楚规则，或有其他疑惑，请联系客服</p>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
import { api_创建合约,api_利息配置 } from "@/api/合约.js";
// import { , } from "@/api/合约.js";
import { mapState } from "vuex";
 import { Dialog } from 'vant';
// Vue.use(Dialog);
export default {
    data() {  
        return {
            beishow: false,                 //选择倍数底部弹框的显示与隐藏
            tableType: 1,                   //按天 1 按周 2 按月 3 免息 4
            保证金: "",                      //保证金input的值
            倍数: {},                        //倍数input的值
            baozhenjing: "",                //验证后的保证金
            checked: true,                    //复选框
            利息配置:[],
            赔率:[]
        }
    },
    components: { // 注册组件
        
    },
    created() {
        
        api_利息配置().then(x => {
            console.log(x);
            if(x.data.code==200){
                this.利息配置=x.data.data;
                this.设置默认倍数()
            }else{
                this.$toast(x.data.msg)
            }
        }).catch(err => {
            this.$toast('系统错误稍后再试')
        })
    },

  
    computed: {
        ...mapState({
            token: 'token'
        }),


        // 风险保证经=输入保证金
        // 亏损警戒线=（保证金  X  倍数）+  （保证金  X  50%）
        // 亏损平仓线=（保证金  X  倍数）+  （保证金  X  20%）
        // 管理费=（保证金  X  倍数）  X  资金利率
        // 需要支付金额= 保证金  +  管理费
        // 资金利率(){
        // },
        总超盘资金() {
            // 总操盘资金=（保证金  X  倍数）  +  保证金
            if(this.保证金){
                return this.保证金*this.倍数.multiple + this.保证金
            }else{
                return 0
            }
        },
        风险保证金() {
            if (this.baozhenjing != "") {
                var risk = parseInt(this.baozhenjing)
                return risk
            } else {
                return 0
            }
        },
        亏损警戒线() {
            // 亏损警戒线=（保证金  X  倍数）+  （保证金  X  50%）
            if (this.保证金) {
                return this.保证金*this.倍数.multiple+this.保证金*0.5
            } else {
                return 0
            }
        },
        亏损平仓线() {
            // 亏损平仓线=（保证金  X  倍数）+  （保证金  X  20%）
            if (this.保证金) {
                return this.保证金*this.倍数.multiple + this.保证金*0.2
            } else {
                return 0
            }
        },
        管理费(){
            //管理费=（保证金  X  倍数）  X  资金利率
            if(this.保证金){
                return this.保证金 * this.倍数.multiple * this.倍数.rate / 100
            }else{
                return 0
            }
        }
    },
    methods: {
        onClickLeft(){//头部
            history.back()
        },
        设置默认倍数(){
            var list = this.利息配置.filter(x=>x.dayType==this.tableType);
                list.sort((x,y)=>{
                    return x.multiple - y.multiple
                })
            this.赔率=list; 
            this.倍数=list[list.length-1]
        },
        我要超盘() {
              var token=this.token.access_token
            //  console.log(token)
            if(token!=''){//登录过的才可以操作 
                if(this.checked==true){
                    if(this.保证金){
                        var obj = {
                            dayType: this.tableType,
                            bondAmount: this.保证金,
                            applyAmount: this.保证金*this.倍数.multiple,
                        }
                        api_创建合约(obj).then(x => {
                            console.log(x)
                            if(x.data.code==200){
                                this.$toast('创建合约成功');
                            }else{
                                this.$toast(x.data.msg);
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }else{
                        this.$toast('请输入保证金')
                    }
                }else{
                    this.$toast('请同意宝贷服务协议')
                }
            }else{
                Dialog.confirm({
                    message: '请先前往登录页!'
                }).then(() => {
                    this.$router.push('/login')
                }).catch(() => {
                    // alert("点击取消触发的函数")
                });
            }
        },
        onConfirm(value, index) { //选择倍数点击确认触发的函数
            this.倍数=value;
            this.beishow = false;
        },
        clicktite(index) {
            this.tableType = index;
            this.设置默认倍数()
        },
    },
    
}


</script>
<style lang="scss" scoped>
.确认超盘信息 {
    margin-top: _vw(20);
    border: 1px solid #ccc;
    li:nth-child(7) {
        border-bottom: none;
    }
    li {
        height: _vw(40);
        border-bottom: 1px solid #ccc;
        line-height: _vw(40);
        display: flex;
        .quer_title {
            width: 40%;
            background: #f6f7f9;
            text-align: center;
            font-size: _vw(14);
            color: #666666;
        }
        .quer_num {
            width: 50%;
            padding-left: _vw(40);
            font-size: _vw(14);
            .fred {
                font-weight: 600;
            }
        }
    }
}
.备注 {
    margin: _vw(30) 0px _vw(20) 0px;
    // height: _vw(68);
    background: #f6f7f9;
    padding: _vw(10) _vw(10) ;
    font-size: _vw(12);
}
.复选 {
    font-size: _vw(16);
    margin: 0px auto;
    width: 84%;
    margin-bottom: _vw(20);
    font-size: _vw(14);
}
.btn {
    margin: 0px auto;
    width: 80%;
    // margin:_vw(20) 0px _vw(20) 0px;
    .van-button {
        margin: 0px auto;
        width: 100%;
        font-size: _vw(18);
        border-radius: _vw(6);
    }
}
.shuom {
    font-size: _vw(14);
    text-align: center;
    color: #999999;
    margin-top: _vw(20);
    padding-bottom: _vw(20);
}

p {
    margin: 0px;
}
.information {
    .title_zhuc {
        background: red;
        color: #ffffff;
        font-size: _vw(24);
        height: _vw(50);
        border-bottom: 1px solid #ccc;
        position: relative;
        .icon {
            position: absolute;
            line-height: _vw(50);
            font-size: _vw(24);
            font-weight: 600;
            top: 0;
            left: 0px;
        }
        h4 {
            text-align: center;
            margin: 0px;
            line-height: _vw(50);
            //  margin-bottom:
        }
    }

    // 开始
    .content {
        padding-top:_vw(47);
        background: #f3f3f4;
        .title_ul {
            margin-bottom: _vw(10);
            display: flex;
            justify-content: space-around;
            background: #ffffff;
            height: _vw(50);
            font-size: _vw(16);
            .titleActive {
                border-bottom: 4px solid #ff6700;
            }
            li {
                width: vw(60);
                line-height: _vw(50);
                height: _vw(50);
            }
        }
        .ul_content {
            background: #ffffff;
            // height: _vw(400);
            padding-top: _vw(10);
            .content_min {
                background: #ffffff;
                width: 90%;
                margin: 0px auto;
                .baozhengj {
                    width: 100%;
                    padding-left: _vw(10);
                    font-size: _vw(14);
                    // background: #ff6700;
                    border-left: 3px solid #ff6700;
                }
                /deep/ .el-input.is-disabled .el-input__inner{
                    color: #000000;
                    background: none;
                }
                /deep/.el-input__inner {
                    font-size: _vw(16) !important;
                    padding-left: _vw(8) !important;
                    margin: _vw(10) 0px _vw(20) 0px;
                }
                /deep/.el-input__suffix {
                    line-height: _vw(64);
                    margin-right: _vw(8);
                    color: black;
                }
            }
        }
    }
}
</style>