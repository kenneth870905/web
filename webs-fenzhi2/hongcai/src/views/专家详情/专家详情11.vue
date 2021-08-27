<template>
  <div class="专家详情">
      <van-popup v-model="show" >
          <div class="弹出框">
          <div class="关闭" @click="show=false"><van-icon name="cross" class="cross" /></div>

              <p class="to_p">关于命中率</p>
              <div class="text">按每场比赛推荐玩法的命中结果进行均值计算。比如一场比赛可能会推荐三种玩法，其中两种玩法没中，一种玩法命中，则命中率位33%</div>
                 <p>关于连红数</p>
                 <div class="text">针对专家发布的文章，命中率或盈利率结果值≥50%，则连红计为1；如文章的命中率或盈利率结果≤50%，则连红数计为0，重新开始计算</div>
          </div>

      </van-popup>
      <div class="top">
         <div class="title" @click="返回()"><van-icon name="arrow-left" /></div>

        <div class="title_c">
           <div class="img_box">
               <img src="@/assets/img/ty.png" alt="">
           </div>
      
           <div class="r_t" >
               <div class="b_b" >
                   <div class=" name">彭国伟</div>
                   <div class="text_r">&#10010;关注</div>
               </div>
               <div class="b_b" >
                   <div class="text_n">前国脚</div>
                   <div class="text_n">粉丝<span>25420</span> </div>
               </div>
           </div>
         </div>
          <p class="text">前国脚，曾效力广州太阳神和深圳队，退役后担任恒大预备队主帅和U22男足助教。<a href="">详情></a></p>
      </div>

      <div class="content">
          <div class="content_t">
              <div class="c_left">
                  <div class="num_box">
                      <span class="max_num">100</span><span class="min_num">&nbsp;%</span>
                  </div>
                  <div class="num_right">
                      <p class="_p">命中率</p>
                      <p class="__p">近3场中3场</p>
                  </div>
              </div>
              <div class="c_right">
                 <div class="num_box">
                      <span class="max_num">0</span><span class="min_num">&nbsp;%</span>
                  </div>
                  <div class="num_right">
                      <p class="_p">最近连红</p>
                      <p class="__p" @click="show=true"  >最高10连红<van-icon class="question" name="question-o" /></p>
                  </div>
              </div>
          </div>

         <ul>
             <li v-for="index in 10" @click="$router.push('/PlanDetails')">
                 <div class="baot">  西班牙超级杯单场解析，巴萨马竞谁的战意更强？ </div>
                 <div class="content_cc">
                     <div class="cl">
                         <div class="type">竞足</div>
                         <div>亚青23</div>
                     </div>
                     <div class="cc">
                         <span class="l_n">卡塔尔亚</span>
                          <!-- <span class="c_n">VS</span> -->
                          <span><span>1</span><span>:</span><span>1</span></span>
                          <span class="r_n">叙利亚亚</span>
                     </div>
                     <div class="cr">01/08</div>
                 </div>

                 <div class="bb_b">
                     <div class="b_l">
                         <span>01-14 18:16</span><span class="ss">|</span><span class="aa">查看</span>
                     </div>
                     <div class="b_r">红</div>
                 </div>
             </li>
         </ul>
      </div>
  </div>
</template>
<script>
// import { } from "@/api/股票.js";
export default {
    data() {
        return {
           show:false,
        }
    },
    components: { // 注册组件
      
    },
    computed: {
        
    },
    created() {
     
    },
    methods: {
       showPopup() {
          this.show = true;
        },
        返回(){
            history.back()
        }

    },
}
</script>

<style lang="scss" scoped>
.专家详情{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    background: #f3f5f7;
  /deep/ .van-popup{
        border-radius: _vw(8);
        }
       .弹出框{
        width:_vw(280);
        margin:0px auto;
        padding:_vw(10) _vw(20) _vw(30)_vw(20);
        .关闭{
          text-align: right;
          font-size: _vw(20);
          color:#acacac;
        //   color:red;
        }
        .to_p{
            margin-top:0px;
        }
        p{
            text-align: center;
            font-size: _vw(18);
            color:#1a1a1a;
        }
        .text{
            font-size: _vw(13);
            color:#939393;
        }
      }
    
    .top{
           padding:_vw(0) _vw(20) _vw(30) _vw(20);
          background: linear-gradient(to top right,#ff7348,#e7273c);
          box-sizing:border-box;
        .title{
            height: _vw(44);
            color:#ffffff;
            line-height: _vw(44);
            font-size: _vw(20)
        }

             .title_c{
                display:flex;
                justify-content:space-between;
                align-items: center;
            
                .img_box{
                    width:_vw(65);
                    height: _vw(65);
                    margin-right:_vw(20);
                    border-radius: 50%;
                    background-color: #ffffff;
                    text-align: center;
                
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%
                    }
                }
                .r_t{
                    flex:1;
                    .b_b{
                            display:flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#ffffff;
                            .name{
                                font-size: _vw(18);
                            }
                            .text_n{
                                font-size: _vw(13);
                                line-height: _vw(30);
                            }
                                .text_r{
                                    width: _vw(65);
                                    height: _vw(27);
                                    line-height: _vw(27);
                                    text-align: center;
                                    color:#ffffff;
                                    border:1px solid #ffffff;
                                    font-size: _vw(14);
                                }
                        }
                }

            }
            .text{
                font-size: _vw(14);
                color:#ffffff;
                a{color:#ffffff;
                
                }
            }
    }
    .content{
        .content_t{
            padding:_vw(20) _vw(16) _vw(20) _vw(16);
            display: flex;
            background-color: #ffffff;
            .c_left{
               border-right: 1px solid #ece9e9;
            }
            .c_left,.c_right{
               
                display: flex;
                align-items: center;
                .num_box,.num_right{
                    // width: 50%;
                }
                .num_box{
                    width: 40%;
                    text-align: right;
                    color:#e86b5c;
                    // margin-right: _vw(10);
                    padding-right: _vw(10);
                    .max_num{
                      font-size: _vw(50);
                      font-weight: 600;
                        font-family: alternategothicno2bt;
                    }
                    .min_num{
                      font-size: _vw(14);
                    
                    }

                }
                .num_right{
                    width: 60%;

                    font-size: _vw(14);
                    p{
                        margin:0px;
                    }
                  ._p{
                    color:#666666;
                  }
                  .__p{
                    color:#999999;
                     line-height: _vw(16);
                     display:flex;
                     align-items: center;
                    .question{
                        line-height: _vw(16);
                       font-size: _vw(14);

                    }
                    //   line-height: 
                  }
                }
            }
            .c_left,.c_right{
               width: 50%;  
            }
        }
        ul{
            margin-top:_vw(10);
            li{
               padding:_vw(20); 
               background-color: #ffffff;
               box-sizing: border-box;
               margin-bottom: _vw(20);
               .baot{
                   font-size: _vw(16);
                   font-weight: 600;
               }
               .content_cc{
                   display:flex;
                   justify-content:space-between;
                   align-items: center;
                   font-size: _vw(11);
                   color:#666666;
                   width: 100%;
                   padding:_vw(10) _vw(0);
                   .cl{
                        width: 30%;
                         display:flex;
                         align-items: center;
                        border-right: 1px solid #eee9e9;
                        .type{
                             border: 1px solid #65afff;
                            color:#65afff;
                            font-size: _vw(12);
                            // border-right: _vw(4);
                            border-radius: _vw(4);
                            padding:_vw(0) _vw(2);
                            margin-right: _vw(10);
                        }
                   }
                   .cc{
                    width: 60%;
                    display:flex;
                     align-items: center;
                     justify-content: space-between;
                     
                     .l_n{
                         text-align:right;
                         width: 40%;
                     }
                     .r_n{
                         width: 40%;
                         text-align: left;
                     }
                     .c_n{
                         text-align: center;
                         width: 20%;
                     }
                   }
                   .cr{
                       width: 10%;
                          border-left: 1px solid #eee9e9;
                          padding-left: _vw(10);
                   }
               }
               .bb_b{
                margin-top:_vw(10);
                 display:flex;
                 justify-content:space-between;
                 align-items: center;
                 font-size: _vw(11);
                 .b_l{
                     color:#999999;
                     .ss{
                         margin:_vw(0) _vw(10);
                     }
                     .aa{
                         color:#9d7562;
                     }
                 }
                 .b_r{
                     margin-top:_vw(10);
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
        }
        
    }

}
</style>