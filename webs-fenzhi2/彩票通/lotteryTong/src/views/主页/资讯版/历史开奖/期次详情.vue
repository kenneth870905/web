<template>
    <div class="期次详情">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">期次详情</span>
            <span class="sqzj">&nbsp;</span>
        </div>

       <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
        </div>

        <div class="content">
            <ul class="max_ul">
                <li class="max_li" >
                   <div class="li_top"><span>2013-12-13 </span>&nbsp;<span>152</span> 期</div>
                   <div class="li_c">
                       <ul class="ul_l">
                           <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                             <li class="jia">
                                 +
                            </li>
                             <li>
                               <div class="img_bj">24</div>
                               <p>猴/土</p>
                           </li>
                       </ul>
                   </div>
               </li>

            </ul>

            <div class="content_c">
                <div class="content_t   bj" >
                    <div class="t_l">玩法</div>
                    <div class="t_r">投注中奖的号码</div>
                </div>
            </div>
            <ul  class="content_c  min_ul" >
                <li class="content_t">
                    <div class="t_l">特码</div>
                    <div class="t_r">20</div>
                </li>
                  <li class="content_t">
                    <div class="t_l">正码</div>
                    <div class="t_r">41</div>
                </li>
                  <li class="content_t">
                    <div class="t_l">正特4</div>
                    <div class="t_r">大小单双号</div>
                </li>
                  <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li>
                 <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li> <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li> <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li> <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li> <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li> <li class="content_t">
                    <div class="t_l">玩法</div>
                    <div class="t_r">大小单双号尾号</div>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
           
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
             
            }
        }
    },
    components: { // 注册组件
        
    },
    created() {
        
    
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
    methods:{
        返回() {//头部
            history.back()
        },
      
    }
    
}


</script>
<style lang="scss" scoped>




.期次详情{
       .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
    }

     .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(100);
        right: _vw(20);
        z-index: 40;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .返回 {
        width: _vw(40);
        height: _vw(40);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        position: fixed;
        top: 50%;
        left: 0px;
        z-index: 40;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }

    .content{
        padding-top:_vw(35);
        .max_ul{
              .max_li{
                padding: _vw(10) _vw(20) _vw(10) _vw(10);
                box-sizing:border-box;
                .li_top{
                    font-size: _vw(12);
                   margin-bottom: _vw(4)
                }
                .li_c{
                    // display:flex;
                    // justify-content: space-between;
                    // align-items: center;
                    .ul_l{
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        .jia{
                            line-height: 100%;
                            text-align: center;
                            font-size: _vw(26);
                            color:rgb(190, 186, 186);
                            
                        }
                       li{
                         .img_bj{
                             width:_vw(32);
                             height: _vw(32);
                           background:url("~@/assets/img/lskj/lhc_greenball.png") no-repeat;
                           background-size: 100% 100%;
                           line-height: _vw(32);
                           font-size: _vw(14);
                           text-align: center;
                         }
                         p{
                             text-align: center;
                             margin:0;
                             margin-top:_vw(0);
                             font-size: _vw(12);
                         }
                       }
                    }
                }
                
            }
        }
        .content_c{
            padding:0px _vw(10);
            .bj{
             background-color: #f0f0f0; 
             .t_r{
                 color:black !important;
             } 
            }
            .content_t{
             height: _vw(30); 
             display: flex;
             line-height: _vw(30);
             font-size: _vw(14);
             .t_l{
                 width: _vw(100);
                 text-align: left;
                 padding-left:_vw(5)
             }
             .t_r{
                 flex:1;
                 text-align: left;
               color: #e99d00;
             }
            }
        }

        .min_ul{
                li:nth-child(2n+1){
                   background-color: #ffffff;
                }
                   li:nth-child(2n){
                     background-color: #f0f0f0;  
                }
                li{
                //    background-color: red;
                   
                }
            }
    }

  
}
</style>