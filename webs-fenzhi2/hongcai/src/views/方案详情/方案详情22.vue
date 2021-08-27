<template>
  <div class="方案详情">
    <div class="title">
        <span class="返回" @click="返回()"><van-icon name="arrow-left" /></span>
        <span>方案详情</span>
        <div></div>
    </div>

     <div class="top_div">
         <div class="top">
             <p class="biaoti">西班牙超级杯单场解析，巴萨马竞谁的战意更强？</p>
             <div class="time">
                 <span>4小时前发布</span>
                  <div class="b_r">红</div>
                 </div>
         </div>
         <div class="up">
             <div class="img_box"><img src="@/assets/img/ty.png" alt=""></div>
             <div class="t_right">
                 <div class="l_L">
                     <div class="name">彭国伟</div>
                     <div class="ext_n">前国脚</div>
                 </div>
                 <div class="关注">&#10010;关注</div>
             </div>
         </div>
     </div>

     <div class="对详情">
          <div class="dy"> 
            <span>[竞足 <span>单关</span>]</span>
           <span class="bei">西超杯</span>
           <span class="bj">|</span>
           <span class="bia">01/10  03:00</span>
           <span class="kais">已结束</span>
         </div>

           <div class="row">
              <div class="tou">让球</div>
              <div class="dui">
                  <div class="l_name">曼城</div>
                  <div class="d_d">
                      <div class="img_b"><img src="@/assets/img/log1.jpg" alt=""></div>
                      <div class="ccc"><span>1</span>:<span>3</span></div>
                      <div class="img_b"><img src="@/assets/img/log1.jpg" alt=""></div>
                  </div>
                  <div class="r_name">曼城曼城</div>
              </div>
           </div>
               <!-- ===================已结束 足球 statr=================== -->
             <div class="ge">
              <div class="tou">0</div>
              <div class="dui">
                  <div class="name_l" :class="{'是否主客胜' : 主客胜==false}">
                        <div class="主客胜" v-if="!主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <p>主胜</p>
                     <p>4.55</p>
                  </div>
                  <div class="ee">
                       <p>平</p>
                     <p>3.75</p>
                  </div>
                  <div class="name_r"  :class="{'是否主客胜' : 主客胜==true}">
                       <div class="主客胜" v-if="主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <div class="已中" v-if="是否中"><img src="@/assets/img/yizhong.svg" alt=""></div>
                      <div class="已中"  v-if="!是否中"><img src="@/assets/img/weizhong.svg" alt=""></div>
                       <p>客胜</p>
                     <p>4.55</p>
                  </div>
              </div>
             </div>

            <div  v-if="是否显示赔率==false"  class="查看赔率" @click="是否显示赔率=true" >
                <span>查看赔率变化</span>
                <span><van-icon class="icon" name="arrow-down" /></span>
            </div>

            <div class="赔率" v-if="是否显示赔率==true">
                <div class="type">澳彩</div>
                <div class="ju">
                    <p>初盘</p>
                    <p>即时</p>
                </div>
                <ul class="ul_row">
                    <li>
                        <p>1.43</p>
                        <p class="fred">1.43</p>
                    </li>
                    <li>
                        <p>3.85</p>
                        <p class="fgreen">4</p>
                    </li>
                    <li>
                        <p>6.6</p>
                        <p class="fgreen">6.8</p>
                    </li>
                </ul>
            </div> 
            <!-- ========================未开始结束 足球 篮球 statr===================================== -->
<!-- 
             <div class="ge">
              <div class="tou">0</div>
              <div class="dui">
                  <div class="name_l">
                      <p>主胜</p>
                     <p>4.55</p>
                  </div>
                  <div class="ee">
                       <p>平</p>
                     <p>3.75</p>
                  </div>
                  <div class="name_r">
                       <p>客胜</p>
                     <p>4.55</p>
                  </div>
              </div>
             </div>

              <div class="zjtou">让球</div>

             <div class="ge">
              <div class="tou">0</div>
              <div class="dui">
                  <div class="name_l" >
                      <p>主胜</p>
                     <p>4.55</p>
                  </div>
                  <div class="ee">
                       <p>平</p>
                     <p>3.75</p>
                  </div>
                  <div class="name_r"  >
                     
                       <p>客胜</p>
                     <p>4.55</p>
                  </div>
              </div>
             </div> -->
             <!-- ========================篮球  已结束statr=================================================== -->
            <!-- <div class="ge">
              <div class="tou">0</div>
              <div class="dui">
                  <div class="name_l 篮球" :class="{'是否主客胜' : 主客胜==false}">
                        <div class="主客胜" v-if="!主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <p>主胜</p>
                     <p>4.55</p>
                  </div>
                 
                  <div class="name_r 篮球"  :class="{'是否主客胜' : 主客胜==true}">
                       <div class="主客胜" v-if="主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <div class="已中" v-if="是否中"><img src="@/assets/img/yizhong.svg" alt=""></div>
                      <div class="已中"  v-if="!是否中"><img src="@/assets/img/weizhong.svg" alt=""></div>
                       <p>客胜</p>
                     <p>4.55</p>
                  </div>
              </div>
             </div>

            <div  v-if="是否显示赔率==false"  class="查看赔率" @click="是否显示赔率=true" >
                <span>查看赔率变化</span>
                <span><van-icon class="icon" name="arrow-down" /></span>
            </div>

             <div class="赔率" v-if="是否显示赔率==true">
                <div class="type">澳彩</div>
                <div class="ju">
                    <p>初盘</p>
                    <p>即时</p>
                </div>
                <ul class="ul_row">
                    <li>
                        <p>1.43</p>
                        <p class="fred">1.43</p>
                    </li>
                    <li>
                        <p>3.85</p>
                        <p class="fgreen">4</p>
                    </li>
                    <li>
                        <p>6.6</p>
                        <p class="fgreen">6.8</p>
                    </li>
                </ul>
             </div>  

               <div class="tou">大小分</div>

             <div class="ge">
              <div class="tou">0</div>
              <div class="dui">
                  <div class="name_l 篮球" :class="{'是否主客胜' : 主客胜==false}">
                       <div class="主客胜" v-if="!主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <p>大分</p>
                     <p>4.55</p>
                  </div>
                 
                  <div class="name_r 篮球"  :class="{'是否主客胜' : 主客胜==true}">
                       <div class="主客胜" v-if="主客胜"> <span><van-icon name="success"  class="checked"/></span></div>
                      <div class="已中" v-if="是否中"><img src="@/assets/img/yizhong.svg" alt=""></div>
                      <div class="已中"  v-if="!是否中"><img src="@/assets/img/weizhong.svg" alt=""></div>
                       <p>小分</p>
                     <p>4.55</p>
                  </div>
              </div>
             </div>
               
            <div  v-if="是否显示赔率==false"  class="查看赔率" @click="是否显示赔率=true" >
                <span>查看赔率变化</span>
                <span><van-icon class="icon" name="arrow-down" /></span>
            </div>

            <div class="赔率" v-if="是否显示赔率==true">
                <div class="type">澳彩</div>
                <div class="ju">
                    <p>初盘</p>
                    <p>即时</p>
                </div>
                <ul class="ul_row">
                    <li class="li_active">
                        <p>1.43</p>
                        <p class="fred">1.43</p>
                    </li>
                    <li>
                        <p>3.85</p>
                        <p class="fgreen">4</p>
                    </li>
                    <li>
                        <p>6.6</p>
                        <p class="fgreen">6.8</p>
                    </li>
                </ul>
            </div>  -->

     </div>

      <div class="推荐理由">
         <h4>推荐理由:</h4> 
         <p>I take Lille HA -1 because there are squad for this game and the coach goes to the game with the best players. Championship is impossible to win because PSG is very strong and this competition may be a bit more easy to win because the stronger teams usually rotate their squads.</p>
         <p>Lille came won from the cup 3-0, then managed the game and conceded 2 goals but the victory was not in danger.</p>
         <p>里尔上一场法国杯中先是3-0领先，然后丢了2个球，不过并没影响到最终取胜。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
         <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>

      </div>
      <div class="tips_wrap">观点建议仅供参考，投注需谨慎</div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            是否中:true,//已中未中图标切换
            主客胜:false,//false 主胜  true客胜
            是否显示赔率:false,
        }
    },
    components: { // 注册组件

    },
    computed: {
        
    },
    created() {
     
    },
 
    methods: {
         返回(){
            history.back()
        }
    },
   
}


</script>

<style lang="scss" scoped>
// ======================= .row,.ge  公用 statr=====================================
        .zjtou{
                 width: _vw(40);
                 margin-right: _vw(20);
                 font-size: _vw(13);
                 text-align: center;
                //  line-height: _vw(40
             }


         .row,.ge{
             display: flex;
             margin:_vw(20) _vw(0);
             color:#666666;
             .tou{
                 width: _vw(40);
                 margin-right: _vw(20);
                 font-size: _vw(13);
                 text-align: center;
             }
             
             .dui{
             flex:1;
             display: flex;
             justify-content: space-between;
             align-items:center;
             .l_name{
                 text-align: right;
             }
       
             .l_name,.r_name{
                 width:_vw(75);
                 font-size: _vw(18);
                 line-height: _vw(34);
             }
             .是否主客胜{
                 background: #a09797;
                 color:red;
             }
             .name_r{                
                .已中{
                    position: absolute;
                    right: 0px;
                    top:0px;
                    width: _vw(28);
                    height: _vw(28);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
             }
             .name_l,.name_r  {
                   width:_vw(93);
                   text-align: center;
                  position: relative; 
                  .主客胜{
                    position: absolute;
                    bottom: _vw(-6);
                    right: _vw(10);
                    z-index: 2;
                    background: rgb(82, 165, 165);
                    width: _vw(20);
                    height: _vw(20);
                    border-radius: 50%;
                    .checked{
                        color:#ffffff;
                        font-size: _vw(14);
                         line-height: _vw(22);
                         text-align: center;
                    }
                }
                p{
                    margin:0px;
                    line-height: _vw(20);
                    // font-size: _vw(13);
                }
             }
             .篮球{
                 width: _vw(139.5) !important;
             }
             .ee{
                  flex:1;
                  border-left: _vw(1) solid #ebe7e7;
                  border-right: _vw(1) solid #ebe7e7;

                    p{
                    margin:0px;
                    text-align: center;
                    line-height: _vw(20);

                }
             }
             .d_d{
                 flex:1;
                display:flex;
                justify-content: space-between;
                align-items: center;
                // align-items: flex-end;
                padding:_vw(0) _vw(10);
                .ccc{
                    font-size: _vw(30);
                    height:_vw(34);
                    font-family: alternategothicno2bt;
                }
               .img_b{
                width: _vw(20);
                height: _vw(20);
                img{ 
                    width: 100%;
                    height: 100%;
                    border-radius: 50%
                }
               }
             }
          }
         }


        //  =======================.rou  .ge公用  over============
.方案详情{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    // background:#ffffff;
    background: #f3f5f7;

    overflow-y:auto;
    // padding-bottom:_vw(44);
    box-sizing: border-box;
    padding-top:_vw(44);
   .title{
       padding:_vw(0) _vw(10);
       display: flex;
       justify-content: space-between;
       line-height: _vw(44);
       color:#ffffff;
       font-size: _vw(18);
       position: fixed;
       top:0px;
       left: 0px;
       width: 100%;
           background: #f22222;
           z-index: 10;
   }
   .top_div{
       background: #ffffff;
       
      .top{
          border-bottom: 1px solid #e2e2e2;
          padding:_vw(0)_vw(20) _vw(10) _vw(20);
          .biaoti{
              font-size: _vw(18);
              color:#1a1a1a;
              font-weight: 600;
              margin-bottom: _vw(10);
          }
          .time{
              color:#666666;
              font-size: _vw(12);
              display:flex;
              justify-content:space-between;
               .b_r{
                     background: #e86b5c;
                     color:#ffffff;
                     width: _vw(17);
                     height: _vw(17);
                     text-align: center;
                     line-height: _vw(17);
                     border-radius: _vw(2);
                 }
          }
      }
      .up{
           display: flex;
          align-items: center;
         padding:_vw(14);
          .img_box{
                width: _vw(38);
                height: _vw(38);
                margin-right: _vw(20);
              img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
         
      }
      .t_right{
          flex:1;
       display: flex;
       align-items: center;
       justify-content:space-between;
       .l_L{
          .name{
              font-size: _vw(16);
          } 
          .ext_n{
              font-size: _vw(11);
              color:#999999;
          }
       }
       .关注{
           width: _vw(64);
           line-height: _vw(30);
           text-align: center;
           color:#ffffff;
           background: red;
           border-radius: _vw(4);
       }
      }
   }
   .对详情{
       padding:_vw(20) _vw(20) _vw(20) _vw(20);
        background: #ffffff;
        margin-top:_vw(20);
       .dy{
         font-size: _vw(12);
         color:#666666;
         .bei{
             margin:_vw(0) _vw(10);
         }
         .bj{
             color:#e7e4e4;
         }
         .bia{
             margin:_vw(0) _vw(10);
         }
         .kais{
             background: #999;
             padding:_vw(0) _vw(2);
             color:#ffffff;
             border-radius: _vw(2);
            text-align: center;
         }
       } 
           .row{
               line-height: _vw(34)
           }
            .ge{
                 font-size: _vw(12);
               height: _vw(40);
               .tou{
                   background: #f7f7f7;
                   line-height:_vw(40);
               }
               .dui{
                     background: #f7f7f7;
               }
           }


       .查看赔率{
           text-align: center;
           font-size: _vw(14);
           color:#666666;
           display: flex;
           align-items: center;
           justify-content:center;
           .icon{
               line-height: _vw(19);
           }
       }
       .赔率{
         display:flex;
         background: #F3F3F4;
         font-size: _vw(11);
         color:#666666;
         text-align: center;
         .type{
             width: _vw(75.5);
             line-height: _vw(56)
         }
         .ju{
             width: _vw(55);
             border-left: 1px solid #ebe7e7;
             border-right: 1px solid #ebe7e7;
             p{
                 margin:0px;
                 line-height: _vw(28);
                 text-align: center;
             }
         }
         .ul_row{
             flex:1;
             //  background: #f19d37;
              display:flex;
              justify-content:space-between;
              .li_active{
                  background: #ffffff;
                  border-right:1px solid #ebe7e7;
              }
              li{
                  width: 33.33%;
                  .fred{
                      color:red
                  }
                  .fgreen{
                      color:green;
                  }
                 p{
                 margin:0px;
                   line-height: _vw(28);
                 text-align: center;
               }
              }
               
         }
       }
   }
   .推荐理由{
       padding:_vw(1) _vw(20) _vw(10) _vw(20);
       margin-top:_vw(10);
       background: #ffffff;
           color: #666;
           font-size: _vw(14)
   }
   .tips_wrap{
       text-align: center;
       font-size: _vw(14);
       color: #666;
       line-height: _vw(30);
   }

}
</style>