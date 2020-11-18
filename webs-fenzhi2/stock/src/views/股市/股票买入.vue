<template>
    <div class="business">
        <van-popup v-model="beishow" position="bottom" :overlay="true">
            <!-- <van-picker :columns="beicolumns" @change="onChange" show-toolbar @confirm="onConfirm"/> -->
            <van-picker :columns="合约" show-toolbar value-key="title" @cancel="beishow=false" @confirm="onConfirm" />
        </van-popup>
        <van-nav-bar title="买入" left-arrow :fixed="true" @click-left="onClickLeft" />
        <div class="business_content">
            <ul class="top_ul">
                <li>
                    <div class="title_li niputleft ">合约选择</div>
                    <div class="content_input"   @click="beishow=true">{{inputvalue.title}}
                        <!-- <van-cell-group>
                            <van-field @click.native="beishow=true" :value="inputvalue.title" placeholder="请选择合约" />
                        </van-cell-group> -->
                    </div>
                </li>
                <li>
                    <div class="title_li">证卷代码</div>
                    <div class="content_li">
                        <div class="num">{{id}}</div>
                        <div class="titile">{{stockName}}</div>
                    </div>
                </li>
                <li>
                    <div class="title_li">委托价格</div>
                    <div class="content_li add_box">
                        <van-button class="subtract"  @click="subtract(0.01)">-0.01</van-button>
                        <div  class="num">
                            <van-cell-group>
                                <van-field v-model="numminwt" placeholder="" />
                            </van-cell-group>
                        </div>
                        <van-button class="add"  @click="add(0.01)">+0.01</van-button>
                    </div>
                </li>

                <li>
                    <div class="title_li">买入数量</div>
                    <div class="content_li add_box">
                        <van-button class="subtract"  @click="subtractsl(100)">-100</van-button>
                        <div class="num">
                            <van-cell-group>
                                <van-field v-model="numminsl" placeholder=""/>
                            </van-cell-group>
                        </div>
                        <van-button class="add"  @click="addsl(100)">+100</van-button>
                    </div>
                </li>
            </ul>

            <!-- ============================================================== -->
            <div class="清空和买入">
                <div class="清空">
                    <div class="top">
                        <div>可用余额</div>
                        <!-- <div></div> -->
                        <div>{{inputvalue.availableBalance}}</div>
                    </div>
                    <van-button class="btn_left" @click="清空()">清空</van-button>
                </div>
                <div class="买入">
                    <div class="top">
                        <div>
                            <div>全仓</div>
                            <div>{{quanchuang}}</div>
                        </div>
                        <div>
                            <div>半仓</div>
                            <div>{{banchang}}</div>
                        </div>
                        <div>
                            <div>1/3仓</div>
                            <div>{{sanfenchang}}</div>
                        </div>
                    </div>
                    <van-button @click="买入()" class="btn_right">买入</van-button>
                </div>
            </div>

            <div class="图标"> </div>

            <div class="买">
                <ul class="right">
                    <li v-for="(item,index) in selldata">
                        <ul class="li_ul">
                            <li>卖{{index+1}} </li>
                            <li class="fred">{{item.Price}} </li>
                            <li class="bili">
                                <div class="bili_son"  :style="'width:'+ item.zhanbi+'%;'"></div>
                            </li>
                            <li>{{item.volume}}</li>
                        </ul>
                    </li>
                </ul>

               
                <ul class="right">
                    <li v-for="(item,index) in buydata">
                        <ul class="li_ul">
                            <li>买{{index+1}} </li>
                            <li class="fred">{{item.Price}}</li>
                            <li class="bili">
                                 <!-- :style="'width:'+ 10 * 3.3 +'%;'" -->
                                <div class="bili_son" :style="'width:'+ item.zhanbi+'%;'"  ></div>
                            </li>
                            <li>{{item.volume}}</li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>

    </div>
</template>

<script>
// const citys = {
//   // '按月配资10倍[0625]': ["",],
//   '按月配资10倍[0625]': ['神州高铁', '中国宝安', '建投能源', '天舟文化', ],
//   '福建': ['福州', '厦门', '莆田', '三明', '泉州']
// };
import { api_有效合约, api_创建委托 } from "@/api/股票.js";
import { mapState } from "vuex";
// import { mapState } from "vuex";

export default {
    data() {
        return {
            inputvalue: {
                availableBalance:"0.00",
                title:"请选择合约"
            },//input框的值
            // beicolumns: ['按月配资10倍[0625]',], //input框倍数备选值
            multiple: "",
            beishow: false,//底部弹出框的显示与隐藏
            valueNum: "",//加减的值
            numminsl: 100,
            // ContractCode: "",
            合约:[],
            id:"",//股票代码
            stockName:"", //名字
            numminwt:"",//当前价
            quanchuang:"_",//全仓
            banchang:"_",//半仓
            sanfenchang:"_",//三分仓
            topshishu:[],//上证指数
            selldata:[],//买
            buydata:[],//卖
            add111:30,

        }
    },
        computed: {
        ...mapState({
            token: 'token'
        })
        },
    created() {
         this.实时更新()
        api_有效合约().then(x => {
            // console.log(x.data.data)
            this.合约=x.data.data;
            // console.log()
        }).catch(err => {
            console.log(err)
        })
        this.id = this.$route.query.id 
        this.stockName=this.$route.query.stockName
        this.numminwt= Number(this.$route.query.currentPrice) //单价
    },
      methods: {
           实时更新(){

                    var _this=this
                    let connection = new signalR.HubConnectionBuilder().withUrl("http://10.10.27.17:8888/PushHub", {
                        accessTokenFactory: () => this.token.access_token
                    }).build();
                   
                    connection.on("SendStockHistory", function (messageData){
                      var todayLow=messageData.todayLow//开盘价
                    //   var todayLow=messageData.todayLow//开盘价
                                console.log(messageData)
                    var id =_this.id
                    var Alldata=messageData.find(x=>x.stockCode=id)
                       // =================================买=======================
                       var buyalll=Alldata.buy
                       var   ALL= buyalll[0].volume + buyalll[1].volume + buyalll[2].volume + buyalll[3].volume +buyalll[4].volume
                       buyalll.forEach(function(item){
                         
                                item .zhanbi=parseInt((item.volume / ALL) *100)
                        return  item.volume=item.volume /100
                       })
                        //   console.log(buyalll)                       

                        _this.buydata=buyalll
                     // =================================卖=======================
                         var sellAll=Alldata.sell
                       var   ALL= sellAll[0].volume + sellAll[1].volume + sellAll[2].volume + sellAll[3].volume +sellAll[4].volume
                       sellAll.forEach(function(item){
                                item.zhanbi=parseInt((item.volume / ALL) *100)
                        return  item.volume=item.volume /100
                       })
                        _this.selldata=sellAll
                    //     console.log(sell)

                    })
                    //监听连接开始逻辑控制，catch捕获异常回调
                    connection.start().then((res) => {
                        console.log("集线器：连接成功。", res);
                    }).catch((err) => {
                        console.log("集线器：连接失败。", err);
                        //  return console.error(err.toString());
                    });
          },

        清空(){
         this.numminsl=0
        },
        买入(){
             var obj = {
                StockCode: this.id, //股票代码
                StockName: this.stockName,//股票名称
                Count: this.numminsl,//委托数量
                ContractCode: this.inputvalue.contractCode ,//合约代码
                Price: this.numminwt,//委托单价 
                delegateType:1, 
            }
            // console.log( this.inputvalue.contractCode+"合约代码")
            api_创建委托(obj).then(x =>{
                console.log(x.data)
                if(x.data==200){
                this.$toast("买入成功")
                }else{
                this.$toast(x.data.msg)                  
                }
                console.log(x.data)
            }).catch(err => {

            })
        },
        subtract(subtract) {//减法
             if(this.numminwt <= 0.00){
                this.numminwt=0
            }else{
            this.numminwt = ( Number(this.numminwt) - Number(subtract)).toFixed(2)
            }

        },
        add(addnum) {//加法
            this.numminwt = ( Number(this.numminwt) + Number(addnum) ).toFixed(2)   
        },
        subtractsl(subtract) {//减法
            if(this.numminsl ==0){
                this.numminsl ==0
            }else{
            this.numminsl =  Number(this.numminsl) - Number(subtract)               
            }
        },
        addsl(add) {//加法
            this.numminsl =  Number(this.numminsl) + Number(add) 
        },
        onChange(picker, values) {
            picker.setColumnValues(1, citys[values[0]]);
        },
        onClickLeft() {//头部
            history.back()
        },
        onConfirm(value, index) { //选择合约触发的函数
            this.inputvalue = value
           var yue=value.availableBalance//余额
            // console.log(value)
            var dajian= this.numminwt//单价

            var quandata= yue / dajian 
            this.quanchuang= parseInt(quandata / 100) *100

            var quandata= (yue / 2) / dajian 
            this.banchang= parseInt(quandata / 100) *100
            //  console.log(this.banchang)

               var quandata= (yue / 3) / dajian 
            this.sanfenchang= parseInt(quandata / 100) *100
            //  console.log(this.sanfenchang)

            this.beishow = false;
        },                                                                                                                         
    }
}
</script>

<style lang="scss" scoped>
.business {
    .business_content {
        padding-top: _vw(60);
        .top_ul {
            background: #ffffff;
            padding: _vw(4) _vw(10) _vw(4) _vw(10);
            li {
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: space-around;
                padding: _vw(4) _vw(10) _vw(4) _vw(10);
                .title_li {
                    line-height: _vw(40);
                    width: _vw(100);
                }
                .add_box {
                    border: 1px solid rgb(20, 160, 241);
                    width: _vw(180);
                    border-radius: _vw(4);
                    text-align: center;
                    .subtract,
                    .add {
                        text-align: center;
                        width: _vw(60);
                        // width: 30%;
                        height: 100%;
                        color: #ffffff;
                        background: rgb(20, 160, 241);
                    }
                    /deep/ .van-field {
                        padding: 0px !important;
                        line-height: _vw(40);
                        padding-left: _vw(10) !important;
                        font-size: _vw(16);
                    }
                    /deep/.num {
                        width: _vw(60) !important;
                    }
                }
                .content_li {
                    display: flex;
                    justify-content: space-between;
                    width: _vw(180);
                    line-height: _vw(40);
                }
                .niputleft{
                    // width: _vw(80);

                }
                .content_input {
                    width: _vw(180);
                        border: 1px solid rgb(20, 160, 241);
                        font-size: _vw(14);
                        line-height: _vw(40);
                        text-align: center;
                    // /deep/.van-cell {
                    //     border: 1px solid rgb(20, 160, 241);
                    //     height: _vw(40);
                    //     width: _vw(180);
                    //     line-height: _vw(20);
                    //     font-size: _vw(14);
                    // }
                    // /deep/ .van-field {
                    //     padding: 0px !important;
                    //     line-height: _vw(40);
                    //     padding-left: _vw(10) !important;
                    // }
                }
            }
        }
        .清空和买入 {
            display: flex;
            padding: _vw(10) _vw(20) _vw(10) _vw(20);
            background: #ffffff;
            .清空 {
                width: 40%;
                .top {
                    border-right: 1px solid rgb(20, 160, 241);
                    width: 100%;
                    line-height: _vw(25);
                    margin-bottom: _vw(20);
                }
                .btn_left {
                    background: #55437d;
                    margin: 0px auto;
                    width: _vw(75);
                    height: _vw(40);
                    color: #ffffff;
                    line-height: _vw(40);
                    border-radius: _vw(4);
                }
            }
            .买入 {
                width: 60%;
                .top {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    line-height: _vw(25);
                    margin-bottom: _vw(20);
                }
                .btn_right {
                    background: #dd524d;
                    width: _vw(200);
                    height: _vw(40);
                    color: #ffffff;
                    line-height: _vw(40);
                    border-radius: _vw(4);
                    margin: 0px auto;
                }
            }
        }

        .图标 {
            height: _vw(300);
            background: #dd524d;
        }

        .买 {
            margin-top: _vw(20);
            border-top: 2px solid #ccc;
            display: flex;
            // .left {
            //     border-right: 1px solid #ccc;
            // }
            // .left,
            .right {
                width: 50%;
                border-right:1px solid #ccc;
                li {
                    .li_ul {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: _vw(0) _vw(4) _vw(0) _vw(4);
                       li:nth-child(3) {
                            width:25%;
                            // background: #295772;

                            .bili_son {
                                background: #909090;
                                height: _vw(10);
                                // width: _vw(10);
                            }
                        }
                        li:nth-child(2){
                            padding-right: _vw(20);
                            box-sizing: border-box;
                            // background: #dd524d
                            
                        }
                          li:nth-last-child(1){
                             text-align:right;
                             padding-right: _vw(6);
                            // background: #6db60d

                        }
                        li {
                            //    height: _vw(0);
                                width:23%;

                                text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>