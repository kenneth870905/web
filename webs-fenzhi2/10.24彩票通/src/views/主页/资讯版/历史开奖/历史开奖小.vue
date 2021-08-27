<template>
    <div class="历史开奖">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">历史开奖</span>
            <div class="sqzj" @click="show=true"><span>{{time}}</span><span class="iconfont iconxiala"></span></div>
        </div>

         <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
        </div>


        <van-popup v-model="show" position="bottom" :overlay="false" class="弹出层">
            <van-picker
                show-toolbar
                title="1970年"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
                class="nr"
            />
        </van-popup>
            
        <div class="content">
            <div class="kj_top">
               <div class="t_left"><span>{{time}}</span>年历史开奖记录</div>
               <div class="t_right"><div @click="升序()">升序</div><div  @click="五行()">五行</div></div>
            </div>
           <ul class="max_ul">
               <li class="max_li" @click="$router.history.push('/Lotterydetails')">
                   <div class="li_top"><span>2013-12-13</span>&nbsp;<span>152</span> 期</div>
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
               </li>
                <li class="max_li" @click="$router.history.push('/Lotterydetails')">
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
                       <span class="iconfont iconyoubian"></span>
                   </div>
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
            time:2019,
           show:false,
            columns: ['2018', '2017', '2016', '2015', '2014'],
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
        升序(){
         alert('点击升序触发的函数')
        },
         五行(){
         alert('点击五行触发的函数')           
        },
         onConfirm(value, index) {
          console.log(`当前值：${value}, 当前索引：${index}`);
        this.time=value
        this.show=false;
        },
        onCancel() {
      console.log('取消');
        }
        
    }
    
}


</script>
<style lang="scss" scoped>
.历史开奖{
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
        align-items: center;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
        .sqzj{
            width: _vw(60);
            height: _vw(27);
            text-align: center;
            line-height: _vw(27);
            border:1px solid #ffffff;
            color:#ffffff;
             .iconxiala{
                color:#ffffff;
            }
            border-radius: _vw(4)
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

    
    .弹出层{
        position: absolute;
        left: 0px;
        right: 0px;
        height: 100%;
        background:rgba(0,0,0,0.7);
       .nr{
           position: absolute;
           bottom:0px;
           left:0px;
           width: 100%;
       }
    }
    .content{
        padding-top:_vw(35);
        .kj_top{
            position: fixed;
            width: 100%;
            height: _vw(36);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #faebd7;
            padding:0px _vw(6);
               font-size: _vw(14);
               box-sizing: border-box;
             .t_right{
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
               width: _vw(36);
               height: _vw(26);
               border:1px solid black;
               text-align: center;
               line-height: _vw(26);
               line-height: _vw(26);
               font-size: _vw(14);
               margin-left: _vw(10);
               border-radius: _vw(4);
            }
         }
        }
        .max_ul{
            .max_li{
                border-bottom: 1px solid #ccc;
                padding: _vw(10) _vw(20) _vw(10) _vw(10);
                box-sizing:border-box;
                .li_top{
                    font-size: _vw(12);
                   margin-bottom: _vw(4)
                }
                .li_c{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    .ul_l{
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 90%;
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
                .iconyoubian{
                 font-size: _vw(24);
                //   color:#acacac;
                            
                }
            }
        }
       
    }
   
  
}
</style>