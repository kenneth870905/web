<template>
  <div class="资讯版容器">

    <div class="资讯版" :style="{'background':皮肤区分.boxColor}">
         <div class="头部" :style="{'background-image':'url('+皮肤区分.topimg+')','color':皮肤区分.color}">  六合彩推荐资讯  </div>
         <div class="开奖">
             <div class="top" :style="{'color':皮肤区分.color}">第<span class="fred">2019098</span>期开奖结果</div>
             <ul class="kj_ul">
               <li class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
                <li class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">羊/土</div>
               </li>
                <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">虎/水</div>
               </li>
                <li  class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
                <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li> 
                  <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">猴/土</div>
               </li> 
               <li class="jia_li">
                    <div class="jia">&nbsp;</div>
                   <div  class="text">&nbsp;</div>
               </li>
               <li  class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
             </ul>

         <ul class="图标导航">
            <li @click="$router.history.push('/recommend')">
                <div class="img_icon"><img :src="皮肤区分.bxtj" alt=""></div>
                <p :style="{'color':皮肤区分.color}">冰心推荐</p> 
            </li>
             <li  @click="$router.history.push('/markSixSanito')">
                <div class="img_icon"><img :src="皮肤区分.lhds" alt=""></div>
                <p :style="{'color':皮肤区分.color}">六合大神</p>
            </li>
             <li  @click="$router.history.push('/markSixImg')">
                <div class="img_icon"><img :src="皮肤区分.lhtk" alt=""></div>
                <p :style="{'color':皮肤区分.color}">六合图库</p>
            </li>
             <li  @click="$router.history.push('/formulaSelect')">
                <div class="img_icon"><img :src="皮肤区分.gssh" alt=""></div>
                <p :style="{'color':皮肤区分.color}">公式杀号</p>
            </li>
         </ul>

          <ul class="图标导航">
            <li  @click="$router.history.push('/SinatvLottery')">
                <div class="img_icon"><img :src="皮肤区分.zbkj" alt=""></div>
                <p :style="{'color':皮肤区分.color}">直播开奖</p>
            </li>
             <li  @click="$router.history.push('/historyLottery')">
                <div class="img_icon"><img :src="皮肤区分.lisj" alt=""></div>
                <p :style="{'color':皮肤区分.color}">历史开奖</p>
            </li>
             <li  @click="$router.history.push('/chatRoom')">
                <div class="img_icon"><img :src="皮肤区分.lts" alt=""></div>
                <p :style="{'color':皮肤区分.color}">聊天室</p>
            </li>
             <li  @click="$router.history.push('/SelectAssistant')">
                <div class="img_icon"><img :src="皮肤区分.tmzs" alt=""></div>
                <p :style="{'color':皮肤区分.color}">挑码助手</p>
            </li>
         </ul>

           <ul class="图标导航">
            <li  @click="$router.history.push('/queryHelpe')">
                <div class="img_icon"><img :src="皮肤区分.cxzs" alt=""></div>
                <p :style="{'color':皮肤区分.color}">查询助手</p>
            </li>
             <li  @click="$router.history.push('/StatisticalI')">
                <div class="img_icon"><img :src="皮肤区分.zxtj" alt=""></div>
                <p :style="{'color':皮肤区分.color}">资讯统计</p>
            </li>
             <li  @click="$router.history.push('/calendar')">
                <div class="img_icon"><img :src="皮肤区分.kjrl" alt=""></div>
                <p :style="{'color':皮肤区分.color}">开奖日历</p>
            </li>
             <li  @click="$router.history.push('/AlPick')">
                <div class="img_icon"><img :src="皮肤区分.ainxh" alt=""></div>
                <p :style="{'color':皮肤区分.color}">AI智能选号</p>
            </li>
         </ul>

           <ul class="图标导航">
            <li  @click="$router.history.push('/specialZodiac')">
                <div class="img_icon"><img :src="皮肤区分.sxzm" alt=""></div>
                <p :style="{'color':皮肤区分.color}">生肖特码</p>
            </li>
             <li  @click="$router.history.push('/positiveZodiac')">
                <div class="img_icon"><img :src="皮肤区分.sxtm" alt=""></div>
                <p :style="{'color':皮肤区分.color}">生肖正马</p>
            </li>
             <li  @click="$router.history.push('/TailSize')">
                <div class="img_icon"><img :src="皮肤区分.wsdx" alt=""></div>
                <p :style="{'color':皮肤区分.color}">尾数大小</p>
            </li>
             <li  @click="$router.history.push('/jointMarkTrend')">
                <div class="img_icon"><img :src="皮肤区分.lmzs" alt=""></div>
                <p :style="{'color':皮肤区分.color}">连码走势</p>
            </li>
         </ul>
         </div>
        <!-- <img src="../../assets/img/home/hei/divider-line.b0540a1.png" alt=""> -->
    </div>

     <div class="滚动" v-show="shownav" :style="{'background':皮肤区分.boxColor}">
             <div class="left_img"><img :src="皮肤区分.cpttt" alt=""></div>
              <div class="滚动内容">
                  <van-swipe :autoplay="3000"  vertical :show-indicators="false"   class="right_ul">
                   <van-swipe-item class="li"> <p :style="{'color':皮肤区分.color}"> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞  </p> <hr class="hr"/> <p :style="{'color':皮肤区分.color}">099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</p></van-swipe-item>
                   <van-swipe-item class="li"> <p :style="{'color':皮肤区分.color}"> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞  </p> <hr class="hr"/> <p :style="{'color':皮肤区分.color}">099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</p></van-swipe-item>
                   <van-swipe-item class="li"> <p :style="{'color':皮肤区分.color}"> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞  </p> <hr class="hr"/> <p :style="{'color':皮肤区分.color}">099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</p></van-swipe-item>
                   <van-swipe-item class="li"> <p :style="{'color':皮肤区分.color}"> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞  </p> <hr class="hr"/> <p :style="{'color':皮肤区分.color}">099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</p></van-swipe-item>                           
                  </van-swipe>
                 <!--  <ul class="right_ul" id='marquee'>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li> -->
                    <!-- <li> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li> -->
                    <!-- <li>099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</li>
                    <li>099期【沢山】三肖中特【04中04】连连爆中，跟上改变现状生活</li> -->

                <!-- </ul> -->
              </div>
             <div class="guanb" v-if="shownav"   @click="滚动秀()"><img src="../../assets/img/home/close.d142dd8.png" alt=""></div>
        </div>
  </div>
 
</template>

<script> 
 import {mapState} from 'vuex'
export default {
    data() {
        return {
            shownav:true,
             bai:{
               color:"#4d4d4d",
               boxColor:"#ffffff",
               topimg:require("../../assets/img/home/bai/divider-line.35fcc0f.png"),
               cpttt:require("../../assets/img/home/bai/headline.e033936.png"),


               bxtj:require("../../assets/img/home/bai/img_xstj.1c6a8ad.png"),
               lhds:require("../../assets/img/home/bai/img_lhds.7bc9420.png"),
               lhtk:require("../../assets/img/home/bai/img_lhtk.5ac9bdb.png"),
               gssh:require("../../assets/img/home/bai/img_gssh.b3d55b8.png"),
               zbkj:require("../../assets/img/home/bai/img_zbkj.baa51f4.png"),
               lisj:require("../../assets/img/home/bai/img_lskj.dd0783f.png"),
               lts:require("../../assets/img/home/bai/img_lts.d0db907.png"),
               tmzs:require("../../assets/img/home/bai/img_tmzs.6ca018b.png"),

               cxzs:require("@/assets/img/home/bai/img_cxzs.3c882ee.png"),
               zxtj:require("@/assets/img/home/bai/img_zxtj.f3275d6.png"),
               kjrl:require("@/assets/img/home/bai/img_kjrl.e0d5379.png"),
               ainxh:require("@/assets/img/home/bai/img_aiznxh.d41b173.png"),
               sxzm:require("@/assets/img/home/bai/img_sxtm.3361f3a.png"),
               sxtm:require("@/assets/img/home/bai/img_sxzm.ff29b36.png"),
               wsdx:require("@/assets/img/home/bai/img_wsdx.8f66d61.png"),
               lmzs:require("@/assets/img/home/bai/img_lmzs.420109d.png"),



           },
            hei:{
                color:"#ffffff",
                boxColor:"#2c2e36",
                topimg:require("../../assets/img/home/hei/divider-line.b0540a1.png"),
                cpttt:require("../../assets/img/home/hei/headline.e2f2443.png"),

               bxtj:require("../../assets/img/home/hei/img_xstj.d1addbf.png"),
               lhds:require("../../assets/img/home/hei/img_lhds.51308e5.png"),
               lhtk:require("../../assets/img/home/hei/img_lhtk.02b6d3e.png"),
               gssh:require("../../assets/img/home/hei/img_gssh.1d31854.png"),
               zbkj:require("../../assets/img/home/hei/img_zbkj.11bb26c.png"),
               lisj:require("../../assets/img/home/hei/img_lskj.2fbeec5.png"),
               lts:require("../../assets/img/home/hei/img_lts.cdb531c.png"),
               tmzs:require("../../assets/img/home/hei/img_tmzs.992a7be.png"),

               cxzs:require("@/assets/img/home/hei/img_cxzs.904e75a.png"),
               zxtj:require("@/assets/img/home/hei/img_zxtj.2912598.png"),
               kjrl:require("@/assets/img/home/hei/img_lskj.2fbeec5.png"),
               ainxh:require("@/assets/img/home/hei/img_aiznxh.29dfe90.png"),
               sxzm:require("@/assets/img/home/hei/img_sxtm.91e5250.png"),
               sxtm:require("@/assets/img/home/hei/img_sxzm.b4f823e.png"),
               wsdx:require("@/assets/img/home/hei/img_wsdx.22865da.png"),
               lmzs:require("@/assets/img/home/hei/img_lmzs.56fc72e.png"),

           }
        }
    },
    components: { // 注册组件
 
    },
    computed: { 
            ...mapState({
            皮肤切换:'皮肤切换'
        }),
         皮肤区分(){
            if(this.皮肤切换==true){
                return this.bai
            }else{
                return this.hei
            }
        },
    },
    created(){
        // this.新闻滚动();
    },
    methods: {

         滚动秀(){
          this.shownav=false
         clearInterval(this.滚动定时器);
        },


        //  新闻滚动(){
        //     setTimeout(() => {
        //         var marquee = document.getElementById('marquee');
        //         var offset=0;
        //         // console.log(marquee)
        //         var scrollheight =marquee.offsetHeight;
        //         var firstNode = marquee.children[0].cloneNode(true);
        //         marquee.appendChild(firstNode);//还有这里
        //         this.滚动定时器=setInterval(function(){
        //             if(offset == scrollheight){
        //                 offset = 0;
        //             }
        //             marquee.style.marginTop = "-"+offset+"px";
        //             offset += 1;
        //         },50);
        //     }, 1000);            
        // }
    },
 
}


</script>
<style lang="scss" scoped>
.资讯版容器{
   
p{
    margin:0px;
}
.资讯版{
    width: 96%;
    margin:0px auto;
    border-radius: _vw(10);
    padding: _vw(10) _vw(10) _vw(10) _vw(10);
     box-sizing: border-box;
    // background: goldenrod;
    // height: _vw(300);
    .头部{
        height: _vw(10);
         width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: _vw(14);
        line-height:_vw(10);
    }
    .开奖{
        .top{
         font-size: _vw(12);
         margin:_vw(10) _vw(0) _vw(10) _vw(0)
        }
        .kj_ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgb(226, 223, 223);
            padding-bottom:_vw(10);
         .qiu, .jia_li{
             width:_vw(43);
             .green{
                 background: url("../../assets/img/home/img_lhc_green.f7d5291.png") no-repeat;               
             }
             .red{
                 background: url("../../assets/img/home/img_lhc_red.ae2b900.png")
             }
             .green, .red,.jia{
                 width:_vw(42);
                 height: _vw(42);
                 border-radius: 50%;
                 background-size: 100% 100%;
                 line-height: _vw(42);
                 text-align:center;
                 font-size: _vw(14);
                 margin:0px auto;
             }
             .text{
                 font-size: _vw(12);
                //  margin:0px auto;
                 text-align:center;
             }
         }
         .jia_li{
            width: _vw(16) !important;
            .jia{
                width:_vw(16) !important;
                 height: _vw(16) !important;
                 background: url("../../assets/img/home/img_jh@2x.7a2dbc3.png") no-repeat;
                  background-position: center center !important
             }
        }
        }
        .图标导航{
            padding:_vw(10) _vw(0) _vw(10) _vw(0);
            display:flex;
            justify-content: space-between;
            li{
                .img_icon{
                     width:_vw(45);
                     height: _vw(45);
                     margin:0px auto;
                     img{
                         width: 100%;
                         height: 100%;
                     }
                }
                p{
                  text-align:center;
                  font-size: _vw(14)
                }
            } 
        }
    }

    
    
}


 .滚动{
         width: 96%;
         background:red;
        border-radius: _vw(10);
        height: _vw(100);
        margin-bottom: _vw(10);
        display:flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        padding: _vw(10);
        padding-right:_vw(20);
        margin:_vw(10) auto _vw(20) auto;
        .left_img{
            width: 14%;
            height: _vw(45);
            margin-right: _vw(10);
            
            img{
                width: 100%;
                height: 100%;
            }
        }
        .滚动内容{
             width: 100%;
              height:_vw(100);
              overflow:hidden;
            .right_ul{
                height: _vw(100);
                width: 100%;
                padding:_vw(10) _vw(30) _vw(0) _vw(0);
                box-sizing: border-box;
               .li{
                    height: _vw(40);
                .hr{
                        margin-top:0px;
                         background-color: rgb(238, 231, 231) !important,
                    }
                    p{
                     height:_vw(40);
                    font-size: _vw(12); 
                    margin:0px;         
                    }
                }
            }
        }
        .guanb{
            position: absolute;
            top:6px;
            right:4px;
            width: _vw(20);
            height:_vw(20);
            img{
                width: 100%;
                height: 100%;
            }
        }
        
    }
    padding-bottom:_vw(45);
}

</style>