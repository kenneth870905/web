<template>
    <div class="business">
        <van-popup v-model="beishow" position="bottom" :overlay="true">
            <van-picker :columns="columns" value-key="title" show-toolbar values="stockInfos" @confirm="onConfirm" @change="onChange" />
            <!-- <van-picker :columns="合约" show-toolbar value-key="title" @cancel="beishow=false" @confirm="onConfirm" @change="change1"/> -->
        </van-popup>
        <van-nav-bar title="卖出" left-arrow :fixed="true" @click-left="onClickLeft" />
        <div class="business_content">
            <ul class="top_ul">
                <li>
                    <div class="title_li niputleft ">合约选择</div>
                    <div class="content_input"   @click="beishow=true">
                        {{选中合约1.title ? 选中合约1.title : '请选择合约'}}
                      
                    </div>
                </li>
                <li>
                    <div class="title_li">证卷代码</div>
                    <div class="content_li">
                        <div class="num">{{选中合约2.stockCode}}</div>
                        <div class="titile">
                            <!-- {{stockName}} -->
                            {{选中合约2.stockName}}
                        </div>
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
                    <div class="title_li">卖出数量</div>
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
            <div class="清空和卖出">
                <div class="清空">
                    <div class="top">
                        <div>持仓/可用</div>
                        <!-- <div></div> -->
                        <div>{{选中合约2.quantityCount}}/{{选中合约2.tranCount}}</div>
                    </div>
                    <van-button class="btn_left" @click="清空()">清空</van-button>
                </div>
                <div class="卖出">
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
                    <van-button @click="卖出()" class="btn_right">卖出</van-button>
                </div>
            </div>

            <div class="图标"> </div>

            <div class="买">
                <ul class="right">
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.2 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.33 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.1 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.1 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>

                </ul>
                <ul class="left">
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.2 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.33 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.1 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="li_ul">
                            <li>买1</li>
                            <li class="fred">70.68</li>
                            <li class="bili">
                                <div class="bili_son" :style="'width:'+ 100* 0.1 +'%;'"></div>
                            </li>
                            <li>11</li>
                        </ul>
                    </li>

                </ul>

            </div>
        </div>

    </div>
</template>

<script>
const citys = {
    '浙江': [
        '杭州', 
        '宁波', 
        '温州', 
        '嘉兴', 
        '湖州'
    ],
    '福建': [
        '福州',
        '厦门'
    ]
};
import { api_有效合约, api_创建委托 } from "@/api/股票.js";
export default {
    data() {
        return {
            inputvalue: {
                availableBalance:"0.00",
                title:"请选择合约"
            },
            multiple: "",
            beishow: false,//底部弹出框的显示与隐藏
            valueNum: "",//加减的值
            numminsl: 100,
            yuedata:0.00,//余额
            price:0,
            // ContractCode: "",
            合约:[],
            columns: [
                {
                    values:[],
                },
                {
                    values: [],
                }
            ],

            // id:"",//股票代码
            // stockName:"", //名字
            numminwt:"",//当前价
            quanchuang:"_",//全仓
            banchang:"_",//半仓
            sanfenchang:"_",//三分仓
            选中合约1:{},
            选中合约2:{}
        }
    },
    computed: {
        
    },
    created() {
        api_有效合约().then(x => {
            this.合约=x.data.data;
            console.log(this.合约)
            var list1=[];
            var list2=[]
            x.data.data.forEach(item => {  
                list1.push(item)
            });
            x.data.data[0].stockInfos.forEach(item=>{
                list2.push(item.stockName)
            })
            
            this.columns[0].values=list1;
            this.columns[1].values=list2;
            // ================== //设置默认选中第一个合约的所有数据=========================
            
            this.选中合约1=this.合约[0] 
            this.选中合约2=this.合约[0].stockInfos[0]
            this.numminwt=this.合约[0].stockInfos[0].price//默认显示的单件

            //  var dajian=this.合约[0].stockInfos[0].price//单价
            //   var yue=this.合约[0].availableBalance//余额

            //    var quandata= yue / dajian 
            // this.quanchuang= parseInt(quandata / 100) *100

            // var quandata= (yue / 2) / dajian 
            // this.banchang= parseInt(quandata / 100) *100

            //    var quandata= (yue / 3) / dajian 
            // this.sanfenchang= parseInt(quandata / 100) *100
    // ================== //设置默认选中第一个合约的所有数据=========================
        }).catch(err => {
            console.log(err)
        })
        // this.id = this.$route.query.id 
        // this.stockName=this.$route.query.stockName
        // this.numminwt= Number(this.$route.query.currentPrice) //单价
    },
    methods: {
        
        清空(){
         this.numminsl=0
        },
        卖出(){
             var obj = {
                StockCode: this.选中合约2.stockCode, //股票代码
                StockName: this.选中合约2.stockName,//股票名称
                Count: this.numminsl,//委托数量
                ContractCode: this.选中合约1.contractCode ,//合约代码
                Price: this.numminwt,//委托单价 
                delegateType:2, 
            }
            // console.log( this.inputvalue.contractCode+"合约代码")
            api_创建委托(obj).then(x => {
                if(x.data==200){
                this.$toast("卖出成功")
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
            var list=[];
                values[0].stockInfos.forEach(item=>{
                    list.push(item.stockName)
                })
            picker.setColumnValues(1, list);            
            console.log(picker)
            console.log(values)
        },
        onClickLeft() {//头部
            history.back()
        },
        onConfirm(value, index) { //选择合约触发的函数
        console.log(value)
            this.选中合约1=this.合约[index[0]];
            this.选中合约2=this.选中合约1.stockInfos[index[1]]

            this.inputvalue = value

             var yue=value[0].availableBalance //余额 
            this.numminwt= this.选中合约2.price//单价
            var dajian= this.numminwt//单价

           
            var quandata= yue / dajian 
            this.quanchuang= parseInt(quandata / 100) *100

            var quandata= (yue / 2) / dajian 
            this.banchang= parseInt(quandata / 100) *100

            var quandata= (yue / 3) / dajian 
            this.sanfenchang= parseInt(quandata / 100) *100

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
                    // line-height: _vw(40);
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
        .清空和卖出 {
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
            .卖出 {
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
            //  padding:_vw(5) _vw(0)  _vw(5) _vw(0);
            display: flex;
            .left {
                border-right: 1px solid #ccc;
            }
            .left,
            .right {
                width: 50%;
                li {
                    .li_ul {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: _vw(0) _vw(4) _vw(0) _vw(4);
                        .bili {
                            width: _vw(30);
                            .bili_son {
                                background: #909090;
                                height: _vw(10);
                                width: _vw(10);
                            }
                        }
                        li {
                        }
                    }
                }
            }
        }
    }
}
</style>