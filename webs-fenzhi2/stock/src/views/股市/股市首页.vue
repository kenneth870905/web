<template>
    <div class="portion">
        <van-nav-bar title="股市" left-arrow :fixed="true" @click-left="onClickLeft" />

        <div class="portion_content">
                <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="red"> -->
                        <!-- <p class="fred">刷新次数: {{ count }}</p> -->
        
       
            <!-- ========================头部固定数据数据===================================================================== -->

            <ul class="ul_top" v-if="topshishu.length>0">
                <li>
                    <p :class="{'fred':topshishu[0][3]>0,'fgreen':topshishu[0][3]<0}">{{topshishu[0][1]}}</p> 
                    <p><span class="ffffff">泸</span> <span :class="{'fred':topshishu[0][3]>0,'fgreen':topshishu[0][3]<0}"><span v-if="topshishu[0][3]>0">+</span>{{topshishu[0][3]}}<span >%</span></span></p>
                </li>

                  <li>
                    <p :class="{'fred':topshishu[1][3]>0,'fgreen':topshishu[1][3]<0}">{{topshishu[1][1]}}</p>
                    <p><span class="ffffff">深</span> <span :class="{'fred':topshishu[1][3]>0,'fgreen':topshishu[1][3]<0}"><span v-if="topshishu[1][3]>0">+</span>{{topshishu[1][3]}}<span >%</span></span></p>
                </li>

                  <li >
                    <p :class="{'fred':topshishu[4][3]>0,'fgreen':topshishu[4][3]<0}">{{topshishu[4][1]}}</p>
                    <p><span class="ffffff">创</span> <span :class="{'fred':topshishu[4][3]>0,'fgreen':topshishu[4][3]<0}"><span v-if="topshishu[4][3]>0">+</span>{{topshishu[4][3]}}<span ></span>%</span></span></p>
                </li>
            </ul>
            <!-- ========================自选股开始===================================================================== -->
            <ul class="zx_ul_title">
                <li> 我的自选股 </li>
                <li> 最新价 </li>
                <li> 涨幅 </li>
                <li> 涨跌 </li>
            </ul>

            <div class="content_son" v-if="zhixuan.length>0">
                <!-- <ul class="gf_ul_content" @click="go(item)" v-for="(item,index) in zhixuan"> -->
                <ul class="gf_ul_content" @click="$router.push('/gp/market?id='+item.stockCode)" v-for="(item,index) in zhixuan">
                    <li>
                        <div>{{item.stockName}}</div>
                        <div>{{item.stockCode}}</div>
                    </li>
                    <li :class="{'fred':item.zhangdie > 0,'fgreen':item.zhangdie < 0,'fff':item.zhangdie == 0 }">{{item.stockPrice}}</li>
                    <li :class="{'fred':item.zhangdie > 0,'fgreen':item.zhangdie < 0,'fff':item.zhangdie == 0 }"> <span v-if="item.upDown>0" >+</span> {{item.upDown}}<span>%</span></li>
                    <li :class="{'fred':item.zhangdie > 0,'fgreen':item.zhangdie < 0,'fff':item.zhangdie == 0}"> <span v-if="item.zhangdie > 0">+</span>{{item.zhangdie}}<span v-if="item.upDown==0">.00</span></li>
                </ul>
            </div>

            <div class="btn"  @click="$router.push('/gp/optional')"> 添加自选股 </div>
            <!-- ========================自选股结束===================================================================== -->
            <!-- ========================涨幅榜开始===================================================================== -->
            <ul class="gf_ul_title">
                <li> 涨幅榜 </li>
                <li> 最新价 </li>
                <li> 涨幅 </li>
                <li> 涨跌 </li>
            </ul>

            <div class="content_son">
                <ul class="gf_ul_content" @click="$router.push('/gp/market?id='+item.code)" v-for="(item,index) in zhangfu">
                    <li>
                        <div>{{item.name}}</div>
                        <div>{{item.code}}</div>
                    </li>
                    <li>{{item.trade}}</li>
                    <li> <span>+</span>{{item.changepercent}}%</li>
                    <li> <span>+</span>{{item.pricechange}}</li>
                </ul>
            </div>
            <!-- ========================涨幅榜结束===================================================================== -->
            <!-- ========================跌幅榜开始===================================================================== -->
            <ul class="gf_ul_title">
                <li> 跌幅榜 </li>
                <li> 最新价 </li>
                <li> 涨幅 </li>
                <li> 涨跌 </li>
            </ul>

            <div class="content_son">
                  <ul class="gf_ul_content" @click="$router.push('/gp/market?id='+item.code)" v-for="(item,index) in diefu">
                    <li>
                        <div>{{item.name}}</div>
                        <div>{{item.code}}</div>
                    </li>
                    <li class="fgreen">{{item.trade}} </li>
                    <li class="fgreen"> {{item.changepercent}}%</li>
                    <li class="fgreen">{{item.pricechange}}</li>
                </ul>
            </div>
       <!-- </van-pull-refresh> -->
            <!-- ========================跌幅榜结束===================================================================== -->
        </div>
    </div>
</template>

<script>
// https://blog.csdn.net/xhl_james/article/details/89235081
import { api_获取用户自选股 } from "@/api/股票.js";
import { mapState } from "vuex";
export default {
    data() {
        return {
            son: true,
            topshishu:[],//头部上证指数
            zhixuan:[],//自选股
            zhangfu:[],//涨幅榜
            diefu:[],//跌幅榜
            //   count: 0,
            //  isLoading: false

        }
    },
    computed: {
        ...mapState({
            token: 'token'
        }),
    },
    created() {
       this.自选股()
       this.实时更新()
    },

    methods: {
          
            实时更新(){
                    var _this=this
                    let connection = new signalR.HubConnectionBuilder().withUrl("http://10.10.27.17:8888/PushHub", {
                        accessTokenFactory: () => this.token.access_token
                    }).build();
                    connection.on("PushStock", function (messageData) {
                        // this.zhixuan = messageData
                    })
                    connection.on("PushGanisAndDeclines", function (messageData) {
                    // =====================头顶的上证指数开始=========================        
                        var list=[]
                        var zishu = messageData.compositeIndex
                        //   console.log(messageData)
                        zishu.forEach(function (item) {    
                            var iterArry = item.split(',')  
                                iterArry[1] = Number(iterArry[1].toString().match(/^\d+(?:\.\d{0,2})?/)).toFixed(2)//保留2位小数 不四舍五入
                                iterArry[3] = Number(iterArry[3]).toFixed(2)//保留2位小数  四舍五入
                            list.push(iterArry)
                        })
                        _this.topshishu=list
                    // =====================涨幅=========================        

                        var gains=messageData.gains//涨幅
                            gains.forEach(function (item){  
                            item.trade=Number(item.trade).toFixed(2)//保留2位小数  四舍五入
                            item.pricechange=Number(item.pricechange).toFixed(2)//保留2位小数  四舍五入
                            item.changepercent=Number(item.changepercent).toFixed(2)//保留2位小数  四舍五入
                            })
                            _this.zhangfu=gains
                        //    console.log(gains)
                    // =====================跌幅=========================                
                        var declins=messageData.declins//跌幅
                            declins.forEach(function (item) {
                            item.trade=Number(item.trade).toFixed(2)//保留2位小数  四舍五入
                            item.pricechange=Number(item.pricechange).toFixed(2)//保留2位小数  四舍五入
                            item.changepercent=Number(item.changepercent).toFixed(2)//保留2位小数  四舍五入
                            })
                            _this.diefu=declins
                        //    console.log(declins)
                    })
                    //监听连接开始逻辑控制，catch捕获异常回调
                    connection.start().then((res) => {
                        console.log("集线器：连接成功。", res);
                    }).catch((err) => {
                        console.log("集线器：连接失败。", err);
                        //  return console.error(err.toString());
                    });
          },

        //  onRefresh() {
        //     setTimeout(() => {
        //         this.自选股()
        //          this.实时更新()
        //     this.$toast('刷新成功');
        //     this.isLoading = false;
        //     this.count++;
        //      }, 500);
        //  },
          

           自选股(){
                var obj={
                    pageIndex: 0,
                    pageSize: 10,
                }    
            api_获取用户自选股(obj).then(x=>{  
                var zhixuandata=x.data.data
                console.log(zhixuandata)
                zhixuandata.forEach(function(item){   //stockPrice当前价  yesterdayPrice昨天价
                    var numdata=(item.stockPrice-item.yesterdayPrice).toFixed(2)
                        item.upDown =item.upDown.toFixed(2)//保留2位小数  四舍五入
                    return item.zhangdie=Number(numdata)
                })
                this.zhixuan=zhixuandata
                // console.log(zhixuandata)
            }).catch(err=>{
                console.log(err)
            })
        },
        onClickLeft() {//头部
            history.back()
        },
    }
}
</script>

<style lang="scss" scoped>
// .red{
//     background:#fff;
// }
.fred {
    color: red !important;
}
.fgreen {
    color: green !important;
}
.ffffff {
    color: #ffffff;
    background: #1c1d32;
}
.fff{
    color: #ffffff !important;
}
.portion {
    background: #202136;
    .portion_content {
        padding-top: _vw(110);
        .ul_top {
            background: #1c1d32;
            width: 100%;
            // background: #202136;
            border-bottom: 1px dashed #ccc;
            position: fixed;
            top: 46px;
            left: 0px;
            display: flex;
            li:nth-child(2) {
                border-left: 1px dashed #ccc;
                border-right: 1px dashed #ccc;
            }
            li {
                width: 33.33%;
                text-align: center;
                p {
                    margin: 0px;
                    margin: _vw(10) auto;
                }
            }
        }

        .zx_ul_title,
        .gf_ul_title {
            background: #1c1d32;
            display: flex;
            justify-content: space-around;
            color: #ffffff;
            margin-top: _vw(10);
            li:nth-child(1) {
                width: 30%;
            }
            li {
                line-height: _vw(36);
                text-align: center;
                width: 22%;
            }
        }
        .gf_ul_content {
            border-bottom:1px solid rgb(44, 47, 58);
            display: flex;
            align-items: center;
            justify-content: space-around;
            color: #ffffff;
            padding:_vw(6) _vw(0) _vw(6) _vw(0);
            li:nth-child(1) {
                color: #ffffff;
                width: 30%;
            }
            li {
                color: red;
                text-align: center;
                width: 22%;
            }
        }
        .btn {
            margin: 0px auto;
            margin-top: _vw(20);
            margin-bottom: _vw(20);
            border-radius: _vw(4);
            width: _vw(100);
            height: _vw(33);
            line-height: _vw(33);
            text-align: center;
            border: 1px solid #007aff;
            color: #007aff;
        }
    }
}
</style>
