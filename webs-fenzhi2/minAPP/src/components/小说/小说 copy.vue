
<template>
 <!-- <h1  @click="go('/fiction')">小说</h1> -->
  <div class="小说">
     <div class="title_z">
        
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
       </div>

        <div class="热门推荐">
            <div class="title_div">
                <div class="fred">
                    <van-icon name="hot-o" class="rm"/>
                    <span> 热门推荐</span>
                </div>
                <div class="fac"  @click="go('/fiction')">
                    <span>更多推荐</span>
                    <van-icon name="arrow" class="xy"/>
                </div>
            </div>
            <ul class="img_shu">
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo2.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo3.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
            
            </ul>
        </div>

          <div class="热门推荐">
            <div class="title_div">
                <div class="fred">
                    <van-icon name="hot-o" class="rm"/>
                    <span> 我的收藏</span>
                </div>
                <div class="fac"  @click="go('/fiction')">
                    <span>更多推荐</span>
                    <van-icon name="arrow" class="xy"/>
                </div>
            </div>
            <ul class="img_shu">
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo2.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
                <li>
                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo3.jpg" alt=""></div>
                <div class="right">
                    <div class="book_t">儿媳妇</div>
                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                    </div>
                    <div class="bottom_b">
                        <span class="span_i"><span class="iconfont iconshoucang"></span>收藏</span>
                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                    </div>
                </div>
                </li>
            
            </ul>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
        };
    },
    computed:{
     
    },
    mounted() {
      
    },
     methods:{
           go(url) {
             
            this.$router.history.push(url); //点击跳转的对应地址
        },
    }
};
</script> 

<style lang="scss" scoped>

.小说{
   background: #f0f0f0;
  .title_z{ 
   
    .top_content_top{
        display:flex;
        justify-content:space-between;
        background:#ffffff;
        margin-top:_vw(10);
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
    .content{

    }
  }

    .热门推荐{
              background: #ffffff;
              margin-top:_vw(10);
              .title_div{
                  display:flex;
                  justify-content:space-between;
                  padding:_vw(0) _vw(10) _vw(0) _vw(10);
                  line-height: _vw(40);
                  font-size: _vw(15);
                  align-items: center;
                  .rm{
                  align-items: center;   
                  }
                  .xy{
                  align-items: center;            
                  }
                  .fac{
                      display: flex;
                      align-items: center;
                  }
              }
              .img_shu{
                //   padding-bottom: _vw(200);
                  li{
                      padding:_vw(0) _vw(10);
                      display:flex;
                      justify-content: space-between;
                      margin-bottom:_vw(10);
                    .left{
                      margin-right:_vw(10);
                      width: _vw(100);
                      height: _vw(120);
                      img{
                          width: 100%;
                          height: 100%;
                       }
                    }
                    .right{
                       border-bottom:1px solid #f0f0f0;
                       flex:1;
                       .book_t{
                         font-weight: 600;
                         height: _vw(30);
                         line-height:_vw(30)
                        }
                       .book_c{
                         height:_vw(60);
                         overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:3;
                        -webkit-box-orient:vertical;
                        font-size: _vw(14)
                        
                        }
                        
                       .bottom_b{
                           display: flex;
                           justify-content: space-between;
                           font-size: _vw(12);
                            height: _vw(30);
                            line-height: _vw(30);
                            .ck{
                               color:#acacac;
                            }
                           .span_i{
                             display: flex;
                            justify-content: space-between; 
                               color:#acacac;
                            .iconshoucang{
                             color:red;
                            }  
                           }
                        
                       } 
                    }
                  }
              }
              
   }
}
</style>

