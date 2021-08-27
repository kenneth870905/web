<template>
    <div class="购彩版"  >


        <div class="滚动" v-show="shownav" :style="{'background':皮肤区分.boxColor}">
             <div class="left_img"><img :src="皮肤区分.cpttt" alt=""></div>
              <div class="滚动内容">
                <ul class="right_ul" id='marquee'>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <li :style="{'color':皮肤区分.color}"> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li>
                    <!-- <li> <p> 099期【眉眼如初】平特一肖【15中15】挑战20连准,赶紧上车,带你装逼带你飞</p></li> -->
                    <!-- <li>099期【富豪梦想】中特2肖『03中03』期期狂中，实现富豪梦想</li>
                    <li>099期【沢山】三肖中特【04中04】连连爆中，跟上改变现状生活</li> -->

                </ul>
              </div>
             <div class="guanb" v-if="shownav"   @click="滚动秀()"><img src="../../assets/img/home/close.d142dd8.png" alt=""></div>
        </div>
          <div class="图标列表" :style="{'background':皮肤区分.boxColor}">
             <div class="金额">
                <div class="left">
                    <span :style="{'color':皮肤区分.color}">余额</span>
                    <span class="fred"> &nbsp;&yen;&nbsp;<span>0.00</span></span>
                </div>
                <div class="right">
                    <div class="cz_btn" :style="{'background':皮肤区分.btnbackCZ}" >充值</div>
                    <div class="tx_btn" :style="{'background':皮肤区分.btnbackTX}">提现</div>
                    <div class="icon_img"><img src="../../assets/img/home/voice.4f0a195.png" alt=""></div>
                </div>

             </div>

             <div class="收藏编辑">
               <div class="left"><div class="xing"><img src="../../assets/img/home/collection.db34089.png" alt=""></div><span :style="{'color':皮肤区分.color}">我的收藏</span></div>
               <div class="right">编辑</div>               
             </div>
             <ul class="icon_list">
                 <li>
                     <div class="icon_img"><img :src="皮肤区分.lhc" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">六合彩</p>
                 </li>
                 <li>
                     <div class="icon_img"><img :src="皮肤区分.zjh" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">炸金花</p>
                 </li>
                 <li>
                     <div class="icon_img"><img :src="皮肤区分.qzll" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">抢庄牛牛</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.clzx" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">长龙资讯</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.azsc" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">澳洲F1赛车</p>
                 </li>
                 <li>
                     <div class="icon_img"><img :src="皮肤区分.dzpk" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">德州PK10</p>
                 </li>
                 <li>
                     <div class="icon_img"><img :src="皮肤区分.dzss" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">德州时时彩</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.dzlh" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">德州六合彩</p>
                 </li>


                 <li>
                     <div class="icon_img"><img :src="皮肤区分.xyft" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">幸运飞艇</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.pcdd" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">PC蛋蛋</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.azss" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">澳洲时时彩</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.btbff" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">比特币分分彩</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.eyd" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">21点</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.sss" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">十三水</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.aggj" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">AG国际厅</p>
                 </li>
                  <li>
                     <div class="icon_img"><img :src="皮肤区分.gdcz" alt=""></div>
                     <p :style="{'color':皮肤区分.color}">更多彩种</p>
                 </li>
             </ul>
        </div>

          <div class="底部功能">
              <div class="l_B"><img :src="皮肤区分.kefu" alt=""></div>
              <div class="c_B"><img :src="皮肤区分.lts" alt=""></div>
              <div class="r_B"><img :src="皮肤区分.xzAPP" alt=""></div>
         </div> 
    </div>

</template>

<script> 
 import {mapState} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            shownav:true,//新闻滚动显示与隐藏
            滚动定时器:0,
             bai:{
               color:"#4d4d4d",
               boxColor:"#ffffff", 
               cpttt:require("../../assets/img/home/bai/headline.e033936.png"),
               btnbackCZ:"#eb7137",
               btnbackTX:"#5DADFF",

               lhc:require("../../assets/img/home/bai/1201.fe85452.png"),
               zjh:require("../../assets/img/home/bai/220.83b7b30.png"),
               qzll:require("../../assets/img/home/bai/830.3ad088e.png"),
               clzx:require("../../assets/img/home/bai/9901.2e7a75a.png"),
               azsc:require("../../assets/img/home/bai/2203.a446b63.png"),
               dzpk:require("../../assets/img/home/bai/1304.dc3e787.png"),
               dzss:require("../../assets/img/home/bai/1106.93f159c.png"),
               dzlh:require("../../assets/img/home/bai/1202.4d1de60.png"),
               xyft:require("../../assets/img/home/bai/1401.99e5348.png"),
               pcdd:require("../../assets/img/home/bai/1501.5cfcc10.png"),
               azss:require("../../assets/img/home/bai/2202.24090b6.png"),
               btbff:require("../../assets/img/home/bai/1601.315aa94.png"),
               eyd:require("../../assets/img/home/bai/600.89e8541.png"),
               sss:require("../../assets/img/home/bai/630.0f8ab00.png"),
               aggj:require("../../assets/img/home/bai/20000.60925fa.png"),
               gdcz:require("../../assets/img/home/bai/more.fe584fc.png"),

               kefu:require("../../assets/img/home/bai/customer.d5bbcb1.png"),
               lts:require("../../assets/img/home/bai/chartroom.c98f650.png"),
               xzAPP:require("../../assets/img/home/bai/download.353bc88.png"),
           },
            hei:{
                color:"#ffffff",
                boxColor:"#2c2e36",
                cpttt:require("../../assets/img/home/hei/headline.e2f2443.png"),
                btnbackCZ:"#AC1E2D",
                btnbackTX:"#AE9358",
                
                lhc:require("../../assets/img/home/hei/1201.3ea1b73.png"),
               zjh:require("../../assets/img/home/hei/220.d0d3d3e.png"),
               qzll:require("../../assets/img/home/hei/830.a379d42.png"),
               clzx:require("../../assets/img/home/hei/9901.f5c5c5f.png"),
               azsc:require("../../assets/img/home/hei/2203.b74160a.png"),
               dzpk:require("../../assets/img/home/hei/1304.caef882.png"),
               dzss:require("../../assets/img/home/hei/1106.2f75dd1.png"),
               dzlh:require("../../assets/img/home/hei/1202.2efb496.png"),
               xyft:require("../../assets/img/home/hei/1401.b199ebd.png"),
               pcdd:require("../../assets/img/home/hei/1501.bd58691.png"),
               azss:require("../../assets/img/home/hei/1106.2f75dd1.png"),
               btbff:require("../../assets/img/home/hei/1601.faa0b4b.png"),
               eyd:require("../../assets/img/home/hei/600.9544d9c.png"),
               sss:require("../../assets/img/home/hei/630.fed61b2.png"),
               aggj:require("../../assets/img/home/hei/20000.a5fd774.png"),
               gdcz:require("../../assets/img/home/hei/more.4d3f863.png"),
                
              kefu:require("../../assets/img/home/hei/customer.a5dddd4.png"),
               lts:require("../../assets/img/home/hei/chartroom.825157a.png"),
               xzAPP:require("../../assets/img/home/hei/download.e51678a.png"),
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
        this.新闻滚动()
    },
    methods: {
        滚动秀(){
          this.shownav=false
         clearInterval(this.滚动定时器);
        },
        新闻滚动(){
            setTimeout(() => {
                var marquee = document.getElementById('marquee');
                var offset=0;
                // console.log(marquee)
                var scrollheight =marquee.offsetHeight;
                var firstNode = marquee.children[0].cloneNode(true);
                marquee.appendChild(firstNode);//还有这里
                this.滚动定时器=setInterval(function(){
                    if(offset == scrollheight){
                        offset = 0;
                    }
                    marquee.style.marginTop = "-"+offset+"px";
                    offset += 1;
                },50);
            }, 1000);            
        }
    },
     destroyed() {
        clearInterval(this.定时器);
    },
 
}


</script>
<style lang="scss" scoped>
.购彩版{
    width:96%;
    margin:0px auto;
    .滚动{
        // width: 100%;
        border-radius: _vw(10);
        height: _vw(100);
        margin-bottom: _vw(10);
        display:flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        padding: _vw(10);
        padding-right:_vw(20);
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
             width: 86%;
              height:_vw(100);
              overflow:hidden;
            .right_ul{
                // height: _vw(400);
                width: 100%;
                padding:_vw(10) _vw(30) _vw(0) _vw(0);
                li{
                    height: _vw(50);
                    p{
                        // line-height: _vw(100);
                    font-size: _vw(12); 
                    margin:0px;  
                    // border-bottom:1px solid #ccc;   
                    // margin-bottom:_vw(10);           
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
    .图标列表{
        width: 100%;
        margin:0px auto;
        border-radius: _vw(10);
        // height: _vw(800);
        .金额{
            padding:0px _vw(10);
            height:_vw(34);
            display:flex;
            justify-content:space-between;
            align-items: center;
            border-bottom:1px solid #ccc;
            .left{
             font-size: _vw(14);
             line-height: _vw(34);
            }
            .right{
                display: flex;
                justify-content:flex-end;
              .icon_img{
                  width: _vw(22);
                  height: _vw(22);
                  img{
                      width: 100%;
                      height: 100%;
                  }
               }
               .cz_btn,.tx_btn{
                      width: _vw(55);
                      height: _vw(23);
                      border-radius: _vw(12);
                      margin-right: _vw(13);
                      line-height: _vw(23);
                      text-align:center;
                      color:#ffffff;
                      font-size: _vw(15)
                  }
            }
        }
        .收藏编辑{
              display: flex;
             justify-items: center;
             justify-content:space-between;
             padding:_vw(8) _vw(10);
         .left{
             display: flex;
             justify-items: center;
           .xing{
               width: _vw(16);
               height: _vw(16);
               margin-right: _vw(6);
               img{
                   width: 100%;
                   height: 100%;
               }
               span{
                   line-height: _vw(16);
               }
           }
         }
         .right{
               width: _vw(40);
               height: _vw(20);
               line-height: _vw(20);
               color:#e1c58c;
               border:1px solid #e1c58c;
               border-radius: _vw(13);
               text-align: center;
               font-size: _vw(14)
           }
        }
        .icon_list{
            width: 100%;
            display:flex;
            flex-wrap: wrap;  
            // height:_vw(800); 
            // justify-content:space-between;         
          li{
              margin-bottom:_vw(10);
              width: 25%;
              .icon_img{
                  width: _vw(55);
                  height: _vw(55);
                  margin:0px auto;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
          }
          p{
              text-align:center;
              margin:0px;
              font-size: _vw(14)
          }
        }
    }

    .底部功能{
       margin-top:_vw(10);
       padding-bottom:_vw(80);
       display: flex;
       justify-content: space-between;
       div{
        width: 32%;
        height:_vw(60);
        img{
            width: 100%;
            height: 100%;
        }
       }
    }
}

</style>