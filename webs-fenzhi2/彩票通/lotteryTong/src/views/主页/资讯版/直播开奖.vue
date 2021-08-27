<template>
    <div class="直播开奖">
      
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
          <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
         </div>

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">直播开奖</span>
            <span class="sqzj">&nbsp;</span>
        </div>
        
        <div class="content_flex">
        <div class="蒙层">
            <div class="banx">
                <div class="item_div">
                    <div >&nbsp;</div>
                   <div class="time_top"><span>距下星期:&nbsp;</span><span><span class="ffd74b">0</span>天<span class="ffd74b">0</span>小时<span class="ffd74b">14</span>分<span class="ffd74b">12</span>秒</span></div>                  
                </div>
                <div class="kj_num">
                    <div class="qi_title">第104期最新开奖结果</div>
                     <ul class="qu_ul">
                         <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                          <li>
                             <div class="qu_img">23</div>
                             <p>土/蛇</p>
                         </li>
                     </ul>
                </div>
            
            
            </div>

           
        </div>


        </div>

        <ul class="ka_ul">
          <li class="max_li">
            <div class="top_title"><span class="mac_span"><span>2019-09-10</span>第<span>2019105</span>期推荐</span></div>
            <ul class="min_ul">
                <li>
                    <div class="left_li">
                        <span class="s_title">本期推荐:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">本期推荐:</span>
                        <span>【羊】DFKLJS</span>
                    </div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">本期推荐:</span>
                        <span>【羊】DL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">本期推荐:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">本期推荐:</span>
                        <span>【羊】DFKLL</span>
                    </div>
                </li>
            </ul>
          </li>

           <li class="max_li">
            <div class="top_title"><span class="mac_span"><span>2019-09-10</span>第<span>2019105</span>期推荐</span></div>
            <ul class="min_ul">
                <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJS</span>
                    </div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLL</span>
                    </div>
                </li>
            </ul>
          </li>
           <li class="max_li">
            <div class="top_title"><span class="mac_span"><span>2019-09-10</span>第<span>2019105</span>期推荐</span></div>
            <ul class="min_ul">
                <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJS</span>
                    </div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLJSAKFDKSAL</span>
                    </div>
                    <div class="right_li"><img src="@/assets/img/zbkj/iocn.e9e7dae.png" alt=""></div>
                </li>
                 <li>
                    <div class="left_li">
                        <span class="s_title">推荐平特一肖:</span>
                        <span>【羊】DFKLL</span>
                    </div>
                </li>
            </ul>
          </li>

        </ul>
        

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
.直播开奖{
     background:#cccccc;
     position: absolute;
     left:0px;
     top:0px;
    //  height: 100%;
     width: 100%;
    .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(108);
        right: _vw(-2);
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
        z-index: 30;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }

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

        .content_flex{
        height:_vw(210);
        width:100%;
        position:fixed;
        top:_vw(35);
        left:_vw(0);
        background:red;
        color:#ffffff;
        font-size: _vw(30);
        z-index: 20;
        .蒙层{
            position: absolute;
            left:0px;
            height: 0px;
            z-index: 30;
            background:rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            .banx{
                width: 92%;
                margin: 0px auto;
                box-sizing: border-box;
                .item_div{
                    display: flex;
                    margin-top:_vw(14);
                    margin-bottom:_vw(14);
                    justify-content: space-between;
                    .time_top{
                         
                            height: _vw(18);
                            background:rgba(0, 0, 0, 0.34);
                            font-size: _vw(12);
                            padding:0px _vw(6);
                            span{
                                line-height: _vw(20)
                            }
                            l
                            .ffd74b{
                                color:#ffd74b
                            }
                        }
                }
                
                .kj_num{
                    width: 100%;
                    height: _vw(98);
                    padding:_vw(22) _vw(20) _vw(0) _vw(20);
                    box-sizing: border-box;
                    background:url("~@/assets/img/zbkj/kjk.png") no-repeat;
                    background-size: 100% 100%;
                    margin-top:_vw(30);
                    margin:0px auto;
                    position: relative;
                    .qi_title{
                        position: absolute;
                        top:_vw(-10);
                        left:50%;
                        width: 50%;
                        margin-left: -25%;
                        height: _vw(34);
                        background:url("~@/assets/img/zbkj/bt.png") no-repeat;
                        background-size: 100% 100%;
                        line-height: _vw(34);
                        font-size: _vw(14);
                        text-align: center;
                    }
                   .qu_ul{
                       display:flex;
                       justify-content: space-around;
                       width: 100%;
                       li{
                         .qu_img{
                             width: _vw(30);
                             height: _vw(30);
                             font-size:_vw(12);
                             line-height: _vw(28);
                             text-align: center;
                             color:black;
                             margin:0px auto;
                               background:url("~@/assets/img/zbkj/lhc_greenball.png") no-repeat;
                              background-size: 100% 100%;
                         }
                           p{
                                  margin:0;
                                  text-align: center;
                                  font-size:_vw(12);
                                  color:black;
                                  margin-top:_vw(4)
                              }
                       }
                   }
 
                }
            }
        }


        }
        .ka_ul{
            padding-top:_vw(240);
            box-sizing: border-box;
            
            .max_li{
                width: 92%;
                margin:_vw(10) auto _vw(10) auto;
                // height: 300px;
                .top_title{
                       border-top-left-radius:_vw(6);
                     border-top-right-radius:_vw(6);
                    font-size: _vw(14);                           
                    color:#ffffff;
                    text-align: center;
                    background:#baa069;
                    line-height:_vw(30);

                }
                .min_ul{
                background:#ffffff;
                    padding: _vw(10) _vw(20) _vw(10) _vw(20);
                      border-bottom-left-radius:_vw(6);
                     border-bottom-right-radius:_vw(6);
                   li{
                       display:flex;
                       justify-content: space-between;
                       align-items:center;
                        border-bottom: 1px solid #f0f0f0;
                       .left_li{
                          font-size: _vw(14);    
                          line-height: _vw(25);
                          .s_title{
                              color:#999999;
                          }
                       }
                       .right_li{
                           width: _vw(16);
                           height: _vw(16);
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