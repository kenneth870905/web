<template>
    <div>
        <div class="banner">
            <img src="static/image/banner02.png" alt="" srcset="">
        </div>
        <div class="container">
            <ul class="导航1">
                <router-link tag="li"  to="/pz/1">按天配资</router-link>
                <router-link tag="li" to="/pz/2">按周配资</router-link>
                <router-link tag="li" to="/pz/3">按月配资</router-link>
                <router-link tag="li" to="/pz/4">免息配资</router-link>
            </ul>
            <div class="配资信息">
                <ul class="left_1">
                    <li>
                        <div class="title_1 flex">
                            <div>预警线</div>
                            <img src="static/image/wenhao.png" alt="">
                        </div>
                        <div class="right_2">
                            <span>{{亏损警戒线}}</span>
                            <span class="font14">
                                元（预警线 = 配资资金 + 保证金 X <span class="红色">0.5</span>）
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="title_1 flex">
                            <div>平仓线</div>
                            <img src="static/image/wenhao.png" alt="">
                        </div>
                        <div class="right_2">
                            <span>{{亏损平仓线}}</span>
                            <span class="font14">
                                元（平仓线 = 配资资金 + 保证金 X <span class="红色">0.2</span>）
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="title_1">
                            配资管理费
                        </div>
                        <div class="right_2 font14">
                            {{管理费}}
                        </div>
                    </li>
                    <li>
                        <div class="title_1">
                            自动续期
                        </div>
                        <div class="right_2 font14">
                            {{续费方式[dayType]}}
                        </div>
                    </li>
                    <li>
                        <div class="title_1">
                            操盘须知
                        </div>
                        <div class="right_2 font14">
                            投资沪深A股，仓位不限制，收益70%归您。
                        </div>
                    </li>
                </ul>
                <ul class="right_1">
                    <li>
                        <div class="title_1">保证金</div>
                        <div class="input_box">
                            <el-input v-model.number="保证金" placeholder=""></el-input>
                        </div>
                        <span class="单位">元</span>
                        <div class="说明">（保证金介于 500 - 500万 元之间）</div>
                    </li>
                    <li>
                        <div class="title_1">配资资金</div>
                        <div class="input_box">
                            <el-select v-model="倍数" value-key="multiple" placeholder="请选择">
                                <el-option v-for="item in 赔率" :key="item.multiple" :label="item.multiple" :value="item"></el-option>
                            </el-select>
                        </div>
                        <span class="单位">倍</span>
                        <div class="说明">（固定倍率 -- 配资资金为500元）</div>
                    </li>
                    <li>
                        <div class="title_1">选择操盘期限</div>
                        <div class="input_box">
                            <el-input readonly :value="期限[dayType]" placeholder=""></el-input>
                        </div>
                        <!-- <span class="单位">元</span> -->
                        <div class="说明">（固定天数）</div>
                    </li>
                    <li>
                        <div class="title_1">总操盘资金</div>
                        <div class="说明">{{总超盘资金}}元 = {{保证金}}元（保证金）+ {{Math.round(保证金*倍数.multiple*100)/100}}元（配资资金）</div>
                    </li>
                    <li>
                        <div class="title_1">需准备资金</div>
                        <div class="说明">{{准备资金}}元= {{保证金}}元（保证金）+ {{管理费}}元（一次性收取管理费）</div>
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <el-checkbox v-model="同意协议">我已阅读并同意</el-checkbox>
                <a href="javascript:;">《实盘交易平台操盘协议》 </a><br>
                <div class="btn_1">
                    <el-button @click="提交()" type="danger">立即申请</el-button>
                </div>
            </div>

            <div class="zhuyi">
                <h1>注意事项：</h1>
                <ul>
                    <li>1.全程按天支付账户管理费（不包含交易印花税、过户费和佣金），无其他任何费用。</li>
                    <li>2.投资本金：您用于投资股票的资金,起点相当低。</li>
                    <li>3.资金使用期限：按天计算，包含各类节假日。</li>
                    <li>4.每天支付管理费：如1月8日配资，1月8日支付当日管理费，1月9日支付第2日管理费，以此类推。</li>
                    <li>5.亏损警告线：当总配资资金低于警戒线以下时，新宝配资会短信通知补交保证金。</li>
                    <li>6.亏损平仓线：当总配资资金低于平仓线以下时，我们将有权把您的股票进行平仓，为避免平仓发生，请时刻关注本金是否充足。</li>
                    <li>7.开始交易时间：交易日当天14:50之前的申请于当日生效（当天开始收取账户管理费），交易日当天14：50后的申请于下个交易日生效。</li>
                    <li>8.股市有风险，投资需谨慎。</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { api_创建合约 , api_利息配置 } from "@/api/合约.js";
import { mapState, mapActions } from "vuex";
export default {
    name:'',
    data() {
        return {
            保证金:500,
            倍数: {},                        //倍数input的值
            同意协议: true,                    //复选框
            利息配置:[],
            赔率:[],

            // 期限:'2天',
            期限:['占位','2天','1周','1月','30天'],
            续费方式:['占位','禁止自动续期','自动续期','自动续期','自动续期'],
        }
    },
    computed: {
        ...mapState({
            token: 'token'
        }),
        dayType(){
            return this.$route.params.type ? this.$route.params.type : 1 
        },
        总超盘资金() {
            // 总操盘资金=（保证金  X  倍数）  +  保证金
            if(this.保证金){
                return this.保证金*this.倍数.multiple + this.保证金
            }else{
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
        },
        准备资金(){
            if(this.保证金){
                var 管理费=this.保证金 * this.倍数.multiple * this.倍数.rate / 100;
                return Math.round( (this.保证金 + 管理费)*100 )/100
            }else{
                return 0
            }
        }
    },
    methods: {
        ...mapActions({
            加载中:"加载中",
            成功提示:"成功提示",
            错误提示:'错误提示'
        }),
        设置默认倍数(){
            var list = this.利息配置.filter(x=>x.dayType==this.dayType);
                list.sort((x,y)=>{
                    return x.multiple - y.multiple
                })
            this.赔率=list; 
            this.倍数=list[list.length-1]
        },
        提交(){
            var token=this.token.access_token
            //  console.log(token)
            if(token!=''){//登录过的才可以操作 
                if(this.同意协议){
                    if(this.保证金){
                        var obj = {
                            dayType: this.dayType,
                            bondAmount: this.保证金,
                            applyAmount: this.保证金*this.倍数.multiple,
                        }
                        api_创建合约(obj).then(x => {
                            console.log(x)
                            if(x.data.code==200){
                                this.成功提示('创建合约成功');
                            }else{
                                this.错误提示(x.data.msg);
                            }
                        }).catch(err => {
                            this.错误提示('系统错误稍后再试')
                        })
                    }else{
                        this.错误提示('请输入保证金')
                    }
                }else{
                    this.错误提示('请同意宝贷服务协议')
                }
            }else{
                this.$alert('提交需要登录，是否现在去登录？', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.psuh('/login');      
                    }
                });
            }
        }
    },
    mounted() {
        api_利息配置().then(x => {
            console.log(x)
            if(x.data.code==200){
                this.利息配置=x.data.data;
                this.设置默认倍数()
            }else{
                this.错误提示(x.data.msg)
            }
        }).catch(err => {
            console.log(err)
            this.错误提示('系统错误稍后再试')
        })
    },
    watch: {
        $route(){
            this.设置默认倍数();
        }
    },
}
</script>

<style lang="scss" scoped>
.banner{
    font-size: 0px;
    img{
        width: 100%;
    }
}
.container{
    padding: 30px 0px;
}
.font14{
    font-size: 14px;
    color: #666666;
}
.红色{
    color: red;
}

.导航1{
    height: 66px;
    background: #f1eadf;
    margin-top: 30px;
    display: flex;
    line-height: 66px;
    >li{
        width: 180px;
        font-size: 16px;
        text-align: center;
        color: #333;
        cursor: pointer;
        &.router-link-active{
            background: #fff;
            color: #ba9767;
            box-shadow: 5px -5px 8px rgba(66, 66, 66, 0.1);
        }
    }
}

.配资信息{
    background: #fff;
    display: flex;
    padding: 0px 20px 20px 0px;
    border-bottom: 1px solid #d9d9d9;
    >ul{
        width: 50%;
    }
    .left_1{
        padding: 20px 20px 0px;
        box-sizing: border-box;
        >li{
            display: flex;
            height: 80px;
            align-items: center;
            border-bottom: 1px solid #ECECEC;
        }
        .title_1{
            width: 120px;
            flex-shrink: 0;
            &.flex{
                display: flex;
                justify-content: space-between;
                img{
                    margin: 0px 30px 0px 0px;
                }
            }
        }
        .right_2{
            width: 100%;
            flex-grow: 1;
        }
    }
    .right_1{
        background: #f9f9f9;
        padding: 0px 20px 0px;
        margin: 20px 0px 0px;
        li{
            height: 80px;
            display: flex;
            font-size: 18px;
            align-items: center;
            .title_1{
                width: 120px;
                flex-shrink: 0;
            }
            .input_box{
                width: 180px;
                margin: 0px 5px 0px 0px;
                text-align: center;
                ::v-deep input{
                    text-align: center;
                }
            }
            .说明{
                color: #999;
                font-size:14px;
            }
        }
    }
}

.box_2{
    text-align: center;
    font-size: 14px;
    padding-top: 30px;
    background: #fff;
    .btn_1{
        margin: 20px 0px 0px;
    }
}

.zhuyi{
    margin: 0 auto;
    padding: 30px 30px 40px 30px;
    background: #fff;
    margin-bottom: 40px;
    h1{
        font-size: 22px;
        font-weight: normal;
        line-height: 50px;
        border-bottom: 1px dashed #D9D9D9;
        color: #bb9767;
    }
    ul{
        margin: 20px 0px 0px;
        li{
            font-size: 14px;
            color: #bb9767;
            line-height: 30px;
        }
    }
}



</style>
