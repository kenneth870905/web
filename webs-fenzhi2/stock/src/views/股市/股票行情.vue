<template>
    <div class="market">
      <van-nav-bar title="股票行情[title]" left-arrow :fixed="true" @click-left="onClickLeft"/> 
          
      <div class="market_content">
<!-- 
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <p>刷新次数: {{ count }}</p>
</van-pull-refresh> -->


          <div class="market_content_title">
                <ul class="title_ul">
                    <li>{{stockName}}</li>
                    <li>昨收</li>
                    <li>现价</li>
                    <li class="fred" :class="{'fred':zhangdie >=0,'fgreen':zhangdie < 0,}"><span v-if="zhangdie>=0">+</span>{{zhangdie}}</li>
               </ul>
                <ul class="content_ul">
                    <li>{{id}}</li>
                    <li>{{yesPrice}}</li>
                    <li class="fred" :class="{'fred':zhangdie >=0,'fgreen':zhangdie < 0,}">{{currentPrice}}</li>
                    <li class="fred" :class="{'fred':zhangdie >= 0,'fgreen':zhangdie < 0,}">[<span v-if="zhangdie>=0">+</span>{{zhangfu}}<span>%</span>]</li>
               </ul>
          </div>
                
            <div class="Charts_top" id="echarts_div" ></div>
            
            <div class="Charts_bottom" ></div>
        
          
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
          <!-- <div class="买">
              <ul class="left"> 
                  <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>
                    <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>  <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>  <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>
                  
              </ul>
              <ul class="right">
                    <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>
                    <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>  <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>  <li>
                      <ul class="li_ul">
                          <li>买1</li>
                          <li class="fred">70.68</li>
                          <li class="bili"></li>
                          <li>11</li>
                      </ul>
                  </li>
                  
              </ul>
          </div> -->
      </div>    

      <ul class="bottom_fixed">
             <li  v-if="!istoken"  class="bred"  @click="$router.push('/login')" >登陆</li>
             <li   v-if="!istoken" class="byello"  @click="$router.push('/register')" >注册</li>
             <li  v-if="!istoken"  class="bhui"  @click="$router.push('/')" >首页</li>


             <li  v-if="istoken" class="bred"  @click="$router.push('/gp/buy?id='+id+'&stockName='+stockName+'&currentPrice='+currentPrice)" >买入</li>
             <li  v-if="istoken" class="byello"  @click="$router.push('/gp/sell?id='+id+'&stockName='+stockName+'&currentPrice='+currentPrice)" >卖出</li>
             <li  v-if="istoken" class="bhui"  @click="$router.push('/gp/revoke')" >撤单</li>
             <li   v-if="istoken" class="bhui"  @click="$router.push('/gp/entrust')" >委托</li>
      </ul>
    </div>
</template>

<script> 
import $ from "jquery";
import { api_股票详情 } from "@/api/股票.js";
import { mapState } from "vuex";

export default {
    data(){
        return{
              count: 0,
              istoken:false,
             isLoading: false,
            id:'',
            stockName:'',
            currentPrice:'',//当前
            trade:'',
            zhangdie:'',//涨跌
            zhangfu:"",//涨幅
            yesPrice:"",//昨收
            buydata:[],
            selldata:[]
        }
    },

 
        computed: {
        ...mapState({
            token: 'token'
        }),
    },
    created(){ 
      this.实时更新()
        if(this.token.access_token!==""){
              this.istoken=true          
        }
         

        
       var id= this.$route.query.id //接收传过来的did 
        this.id=id          
         api_股票详情(id).then(x=>{
               this.stockName= x.data.data.name//名字
               this.currentPrice= x.data.data.currentPrice//当前价
               var currentPricedata= x.data.data.currentPrice //当前价

               this.yesPrice= x.data.data.yesPrice//昨天价
               var  yesPricedata= x.data.data.yesPrice //昨天

                  // 求涨跌=(当前价-昨天价)
                 var numdata=(currentPricedata-yesPricedata).toFixed(2)
                this.zhangdie=Number(numdata)
                var zhangdiedata=Number(numdata)//涨跌

           // 求涨幅=(当前价-昨天价)/ 昨天价 *100
          this.zhangfu=Number( ((zhangdiedata / yesPricedata)*100).toFixed(2)) 
         })
          
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



          onRefresh() {
            setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
            this.count++;
             }, 500);
         },
        //   echarts(){
        //     //初始化容器，拿到echarts实例
        //         chart = echarts.init(document.getElementById('echarts_div'));
        //         chart.showLoading({
        //             text: '数据正在积极加载中···',
        //             color: '#c23531',
        //             textColor: '#000',
        //             maskColor: 'rgba(255, 255, 255, 0.8)',
        //             zlevel: 0
        //         })//立刻显示加载动画
        //   },
          onClickLeft(){//头部
            history.back()
        },
    }     
}
</script>

<style lang="scss" scoped>

.fred {
    color: red !important;
}
.fgreen {
    color: green !important;
}

.market{
    padding-bottom:_vw(60);
    .market_content{
        padding-top:_vw(60);
        .market_content_title{
              border-bottom:1px solid #ccc;
            .title_ul,.content_ul{
                display:flex;
                justify-content:space-around;
                li{
                    width: 24%;
                    text-align: center;
                    height: _vw(30);
                    line-height: _vw(30);
                }

            }
        }
        .Charts_top{
             margin-top:_vw(20);
            // width: 100%;
            height: _vw(300);
            border:1px solid #ccc;
        }
         .Charts_bottom{
             margin-top:_vw(20);
            // width: 100%;
            height: _vw(200);
            border:1px solid red;
        }

         .买 {
            margin-top: _vw(20);
            border-top: 2px solid #ccc;
            display: flex;
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


        // .买{
        //     margin-top:_vw(20);
        //     border-top:2px solid #ccc;
        //     //  padding:_vw(5) _vw(0)  _vw(5) _vw(0);
        //      display:flex;
        //     .left{
        //         border-right:1px solid #ccc;              
        //     } 
        //     .left,.right{
        //         width: 50%;
        //         li{
        //             .li_ul{
        //                 display:flex;
        //                 justify-content:space-between;
        //                 align-items: center;
        //                     padding:_vw(0) _vw(4) _vw(0) _vw(4);   
        //                 .bili{
        //                     width: _vw(30);
        //                     background: #909090;
        //                     height: _vw(10);
        //                 }
        //                 li{

        //                 }
        //             }
        //         }
        //     }
        // }
    }
    .bottom_fixed{
               box-shadow: 2px 2px 10px #909090;
                z-index: 10;
                background: #ffffff;
                display: flex;
                justify-content:space-around;
                position:fixed;
                bottom:0px;
                left:0px;
                border-top:1px solid #ccc;
                // height: _vw(60);
                padding:_vw(4) _vw(0) _vw(4) _vw(0);

                width: 100%;
                   .bred{
                        background: red;
                    }
                     .byello{
                        background: rgb(233, 183, 18);                        
                    }
                     .bhui{
                        background: rgb(172, 172, 159);                        
                        
                    }
                li{
                    width: _vw(80);
                    height: _vw(40);
                    text-align: center;
                    line-height: _vw(40);
                    color:#ffffff;
                    // border:1px solid #ccc;/
                    border-radius: _vw(4);
                }

            }
}


</style>
