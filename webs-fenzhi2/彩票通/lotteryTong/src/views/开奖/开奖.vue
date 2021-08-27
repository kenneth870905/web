<template>
    <div class="跟单">

 

          <div class="table"  :class="皮肤区分.classname" >
            <van-tabs v-model="active"   animated>
                <van-tab v-for="(item,index) in lotteryList" :title="item.name">
                    <ul class="content">
                        <li class="content_li">
                            <div class="top">
                                <div class="left">澳洲ATC</div>
                                <div class="right">第<span class="numaction">20190906048</span>期开奖结果</div>
                            </div>

                            <!-- <div class="澳洲ATC">
                                <ul class="left_ul">
                                    <li class="left_ul_li">21</li>
                                    <li>22</li>
                                    <li>33</li>
                                    <li>44</li>
                                    <li>55</li>
                                    <li>66</li>
                                    <li>77</li>
                                    <li>88</li>
                                    <li>99</li>
                                    <li>10</li>
                                    <li>66</li>
                                    <li>77</li>
                                    <li>88</li>
                                    <li>99</li>
                                    <li>10</li>
                                    <li>66</li>
                                    <li>77</li>
                                    <li>88</li>
                                    <li>99</li>
                                    <li>10</li>
                                </ul>
                                <div class="right_icon "><span class="iconfont iconyoubian"></span></div>
                            </div> -->

                               <!-- <div class="左右下 澳洲时时彩">
                                   <div class="num_top">
                                         <ul class="left_ul">
                                            <li>4</li>
                                            <li>2</li>
                                            <li>3</li>
                                            <li>7</li>
                                            <li>6</li>
                                        </ul>
                                        <div class="right_icon "><span class="iconfont iconyoubian"></span></div>
                                   </div>
                                   <div class="bottom_type">
                                       <div>30</div>
                                       <div>大</div>
                                       <div>双</div>
                                       <div>虎</div>

                                   </div>
                                </div> -->


                                <div class="左右下 澳洲F1赛车">
                                   <div class="num_top">
                                         <ul class="left_ul">
                                            <li class="left_ul_li">4</li>
                                            <li class="left_ul_li">2</li>
                                            <li class="left_ul_li">3</li>
                                            <li class="left_ul_li">7</li>
                                            <li class="left_ul_li">6</li>
                                            <li class="left_ul_li">4</li>
                                            <li class="left_ul_li">2</li>
                                            <li class="left_ul_li">3</li>
                                            <li class="left_ul_li">7</li>
                                            <li class="left_ul_li">6</li>
                                        </ul>
                                        <div class="right_icon "><span class="iconfont iconyoubian"></span></div>
                                   </div>
                                   <div class="bottom_type">
                                       <div>30</div>
                                       <div>大</div>
                                       <div>双</div>
                                       <div>虎</div>
                                   </div>
                                </div> 

                            <div class="bottom">
                                <div class="left">第<span class="numaction">20190906048</span>期开奖结果</div>
                                <div class="right">开奖截至:<span class="green">00:02:23</span></div>
                            </div>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>

         
          </div>


    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
          classname:"",
            active: "",
            tableType:0,
            lotteryList:[
                {name:"全部",list:["qi","dx"]},
                {name:"重庆时时彩",list:["qi","dx"]},
                {name:"新疆时时彩",list:["qi","dx"]},
                {name:"天津时时彩",list:["qi","dx"]},
                {name:"六合彩",list:["qi","dx"]},
                {name:"北京PK拾",list:["qi","dx"]},
                {name:"大乐透",list:["qi","dx"]},
            ],
            bai: {
                topbj: "#5dadff",
                classname:'ffffff',
                tablecolor:"#ffea00"
            },
            hei: {
                topbj: "#1d1e23",
                classname:"eacd91",
                tablecolor:"#d99513"
            }
        }
    },
    computed: {
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
    },
       created(){
         console.log(this.active)
     },
    methods: {
   
       clicktite(index) {
            this.tableType = index
        },

    },
}


</script>
<style lang="scss" scoped>
 .numaction{
   color:#ff5b10;
 }
.green{
    color:#2197ff;
    margin-left:_vw(4);
}

.ffffff{
     background:#fff;
  /deep/ .van-tab{
    color: #666666
  }
   /deep/.van-tab--active{
     color:red
   }
   /deep/.van-tabs__line{
      background-color:red;
   }
   .content{
      .content_li{
           border-bottom:1px solid rgb(226, 226, 226);
           .左右下{
                .bottom_type{
                    div{
                     color:#666666!important;    
                    }
             }
           }
      
           .top{
                .left{
                   color:#333333;
                }
                .right{
                  color:#999999;
                  font-size: _vw(11);
                 
                }
           }
             .bottom{
                .left{
                   color:#999999;
                }
                .right{
                   color:#999999;
                }
           }
       }
   }
}

.eacd91{
   background:#2e2f33;
  /deep/ .van-tab{
    color: #a4a4a5
  }
  /deep/.van-tab--active{
     color:#d99513
   }
   /deep/.van-tabs__line{
      background-color:#d99513;
   }
      .content{
       li{
           border-bottom:1px solid #3e3d3d;
           .top{
                .left{
                   color:#ffffff;
                }
                .right{
                  color:#999999;
                  font-size: _vw(11);
                 
                }
           }
             .bottom{
                .left{
                   color:#999999;
                }
                .right{
                   color:#999999 ;
                }
           }
       }
   }
     
}

.跟单 {
    width: 100%;
    .table{
          height: _vw(240);
          /deep/.van-tabs__nav {
                background-color:rgba(0,0,0,0.0)!important;
          }
              
          /deep/.van-ellipsis{
            font-size:_vw(12);
          }
         /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
          border-width: 1px 0;
          border-top: none;
          border-bottom: 1px solid #ccc;
        }
        .content{
            li{
                padding:_vw(20) _vw(10);
                .top{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                }








                .content_c{
                    // display:flex;
                    // justify-content: space-between;
                    // align-items: center;
                    // width: 100%;
                    // margin:_vw(20) _vw(0) _vw(10) _vw(0);
                }


              .澳洲ATC{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    margin:_vw(20) _vw(0) _vw(10) _vw(0);
                 .left_ul{
                          width: 93%;
                          display:flex;
                          flex-wrap: wrap;
                        .left_ul_li{
                          padding:0px;
                          width: _vw(28);
                          height: _vw(28);
                          text-align: center;
                          color:#ffffff;
                          line-height: _vw(28);
                          font-size: _vw(14);
                          font-weight: 800;
                          background: green;
                          margin-right:_vw(5);
                          margin-bottom:_vw(6);
                          border-radius: _vw(4);
                        }
                    }
                    .right_icon{
                          width: 7%;     
                          .iconyoubian{
                          font-size: _vw(15); 
                          color:#999999;  
                          }
                    }

              }

              .左右下{
                   width: 100%;
                    margin:_vw(20) _vw(0) _vw(10) _vw(0);
                 .num_top{
                     display:flex;
                    justify-content: space-between;
                    align-items: center;
                    .left_ul{
                          width: 93%;
                          display:flex;
                          flex-wrap: wrap;
                          li{
                          padding:0px;
                       
                          text-align: center;
                          color:#ffffff;
                       
                          font-size: _vw(14);
                          background: red;
                          margin-bottom:_vw(6);
                          }
                    }
                    .right_icon{
                         width: 7%;     
                          text-align:right;
                          .iconyoubian{
                          font-size: _vw(15); 
                          color:#999999;  
                          }
                    }
                 } 
                 .bottom_type{
                       display:flex;
                       div{
                          width: _vw(24);
                          height: _vw(24);
                          text-align: center;
                          line-height: _vw(24);
                          border:_vw(1) solid #807b7b;
                          color:#ffffff; 
                          margin-right: _vw(10);
                          border-radius:_vw(4);
                          font-size: _vw(13);
                       }
                 }
              }

              .澳洲时时彩{
                   .num_top{
                       .left_ul{
                           li{
                            width: _vw(32);
                            height: _vw(32);
                            line-height: _vw(32);
                            border-radius: 50%;
                            margin-right:_vw(20);
                           }
                           

                       }
                   }
              }

                 .澳洲F1赛车{
                   .num_top{
                       .left_ul{
                           justify-content: space-between;
                           li{
                            width: _vw(28);
                            height: _vw(28);
                            line-height: _vw(28);
                            border-radius: _vw(4);
                            // margin-right:_vw(10);
                            font-weight: 800;
                           }
                           

                       }
                   }
              }
















                .bottom{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        font-size: _vw(11);
                    }
                    .right{
                        font-size: _vw(11);
                    }
                }
            }
        }
       
    }
}
</style>