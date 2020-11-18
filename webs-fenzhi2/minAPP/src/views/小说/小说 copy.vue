<template>
<div class="发现">
       <topnav></topnav>
       <div class="content">
        <div class="immortal_box">
             <ul class="ul_title">
                 <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">
                  言情小说
                 </li>
                 <li @click="clicktite(1)"  :class="{'titleActive':tableType ==1}">yy小说</li>
                 <li @click="clicktite(2)"  :class="{'titleActive':tableType ==2}">同仁小说</li>
                 <li @click="clicktite(3)"  :class="{'titleActive':tableType ==3}">有声小说</li>
             </ul>
             <ul  class="top_content">

                 <li v-if="tableType==0">
                   
                   <div class="top_content_top">
                       <div class="left_top">
                           <p  class="fred">HOT热门推荐</p>
                           <p class="fac">小编本期推荐</p>
                           <div class="top_img"><img src="../../assets/img/xiaoshuo/xiaoshuo3.jpg" alt=""></div>
                       </div>
                       <div  class="right_top">
                           <div class="right_top_top">
                              <div class="right_left">
                                   <p  class="fred">Good本月好评</p>
                                  <p class="fac">本月最佳阅读体验</p> 
                             </div> 
                              <div  class="right_right"><img src="../../assets/img/xiaoshuo/xiaoshuo2.jpg" alt=""></div> 
                           </div>

                           <div class="right_bottom">
                                  <div class="right_left">
                                   <p  class="fred">New新书上架</p>
                                  <p class="fac">全网同步每天最新</p> 
                             </div> 
                              <div  class="right_right"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div> 
                           </div>
                       </div>
                   </div>



                 </li>
                 <li v-if="tableType==1">1</li>
                 <li v-if="tableType==2">2</li>
                 <li v-if="tableType==3">3</li>
             </ul>

             <div class="热门推荐">
                 <div class="title_div">
                     <div class="fred">
                           <van-icon name="hot-o" class="rm"/>
                         <span> 热门推荐</span>
                     </div>
                     <div class="fac">
                         <span>更多推荐</span>
                         <van-icon name="arrow" class="xy"/>
                     </div>
                 </div>
                 <ul class="img_shu">
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo4.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo3.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo2.jpg" alt=""></li>
                      <li><img src="../../assets/img/xiaoshuo/xiaoshuo2.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo4.jpg" alt=""></li>
                     <li><img src="../../assets/img/xiaoshuo/xiaoshuo3.jpg" alt=""></li>
                 </ul>
             </div>
          </div>
     
     </div>
  
</div>
</template>

<script>
const topnav = () => import('@/components/头部导航/头部导航.vue') //进入游戏组件
export default {
    data() {
        return {
             active: 2,
             tableType:0,
        }
    },
    components: { // 注册组件
       topnav,
    },
    created() {
      
        
    },
    computed: {
        
    },
      methods: {
             clicktite(index) {
            this.tableType = index
        },

    },
}


</script>
<style lang="scss" scoped>
P{
 margin:0px;
}

  .fred{
        font-size: _vw(13)
    }
    .fac{
        font-size: _vw(12)
    }

.发现{

.content{
    padding-top:_vw(50);

     .immortal_box{
           width: 100%;
        //    min-height: 600px;
           .ul_title{
               box-sizing: border-box;
               background: #ffffff;
               padding:_vw(10) _vw(10) _vw(10) _vw(0);
               height:70px;
               display: flex;
               justify-content: space-around;
                width: 100%;  
                    li:nth-child(1){
                   background:url("../../assets/img/yanqing.png") no-repeat 100% 100%;
                   }
                       li:nth-child(2){
                   background:url("../../assets/img/yypsd.png") no-repeat 100% 100%;
                   }    li:nth-child(3){
                   background:url("../../assets/img/tongren.png") no-repeat 100% 100%;
                   }  
                     li:nth-child(4){
                   background:url("../../assets/img/qing.png") no-repeat 100% 100%;
                   }
                  
                  
               li{
                   border-radius: _vw(6);
                  font-size: _vw(14);
                   width:_vw(70);
                   height: _vw(70);
                color:#ffffff;
                text-align:center;
                 line-height: _vw(70);
                text-align: center;
              
               }
           }
           .top_content{
                   margin-top:_vw(10);
               background: #ffffff;
                       padding:_vw(10);

               .top_content_top{
                   display:flex;
                   justify-content:space-between;
                 
                   .left_top{
                       border-right:1px solid #ccc;
                       padding-top:_vw(20);
                       box-sizing: border-box;
                    width:40%;
                    .top_img{
                        margin:0px auto;
                        width: 80%;
                        height: _vw(160);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p{
                        text-align: center;
                        
                    }

                   }
                   .right_top{
                    width:60%;
                    padding-left:_vw(10);
                
                     .right_top_top ,.right_bottom{
                         height: 50%;
                         border-bottom:1px solid #ccc;
                         display: flex;
                         justify-content:space-between;
                         box-sizing: border-box;
                         .right_left{
                             padding-top:_vw(10);
                             width: 50%;
                         }
                         .right_right{
                            margin:_vw(10);
                             width: 40%;
                             height: _vw(100);
                             img{
                                 width: 100%;
                                 height: 100%;
                             }
                         }
                     }
                         .right_bottom{
                        border-bottom:none;
                        
                    }
                     p{
                        text-align: center
                     }

                   }

               }
           }
          .热门推荐{
              background: #ffffff;
              margin-top:_vw(10);
              .title_div{
                  display:flex;
                  justify-content:space-between;
                  padding:_vw(0) _vw(10) _vw(0) _vw(10);
                  line-height: _vw(30);
                  font-size: _vw(15);
                  align-items: center;
                  .rm{
                  align-items: center;
                         
                  }
                  .xy{
                  align-items: center;
                                 
                  }
              }
              .img_shu{
                  display:flex;
                  justify-content:space-between;
                  flex-wrap: wrap;
                  padding:_vw(0) _vw(10) _vw(10) _vw(10);
                  margin-bottom:_vw(10);
                  li{
                      width:23%;
                      height: _vw(100);
                      margin-bottom:_vw(10);
                      
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
              }
              
          }
       }
}
    
}

</style>