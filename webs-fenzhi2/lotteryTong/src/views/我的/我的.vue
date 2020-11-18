<template>
    <div class="我的">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
           <div> <span class="iconfont iconzuobian" @click="返回()"></span> </div>
            <div class="text" :class="{imgheight:皮肤切换==true}"><img :src="皮肤区分.topwd" alt=""></div>
            <div class="sqzj"><img :src="皮肤区分.topkf" alt=""></div>
        </div>

        <div class="contnt">
          <div class="卡" :class="{heibj:皮肤切换==false}" :style="{'background-image':'url('+皮肤区分.kbj+')'}">
              <div class="top_content">
                <div class="left"><img src="../../assets/img/wd/girl.c5b1ff4.jpg" alt=""></div>
                <div class="right">
                    <div class="name_top"><span>李寻欢龙</span><div class="vip"><img src="../../assets/img/wd/VIP0@2x.7a9c914.png" alt=""></div></div>
                    <div class="name_content">
                        <span>余额</span><span>&yen;0.00</span>
                        <div class="刷新"><img src="../../assets/img/wd/flreshMyBanlance.96f2dea.png" alt="">  </div>
                    </div>
                    <div class="name_bottom">
                        <span>邀请码:<span>0787297</span></span>
                    </div>
                </div>
             </div>
             <ul class="div_bottom">
                 <li @click="$router.history.push('/recharge')">
                     <div class="top_imh"><img :src="皮肤区分.wycz" alt=""></div>
                     <p>我要充值</p>
                 </li>
                   <li @click="$router.history.push('/cash')">
                     <div class="top_imh"><img :src="皮肤区分.mstx" alt=""></div>
                     <p>马上提现</p>
                 </li>
                   <li @click="$router.history.push('/detai')">
                     <div class="top_imh"><img :src="皮肤区分.zjmx" alt=""></div>
                     <p>资金明细</p>
                 </li>
             </ul>
          </div>

          <ul class="nav_ul" :style="{'background':皮肤区分.iconbj}">
              <li>
                  <div class="nav_img"><img :src="皮肤区分.wdqb" alt=""></div>
                  <p>我的钱包</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.zhxx" alt=""></div>
                  <p>账户信息</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.aqzx" alt=""></div>
                  <p>安全中心</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.wdbb" alt=""></div>
                  <p>我的报表</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.tzjl" alt=""></div>
                  <p>投注记录</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.xxzx" alt=""></div>
                  <p>消息中心</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.szzz" alt=""></div>
                  <p>设置中心</p>
              </li>
               <li>
                  <div class="nav_img"><img :src="皮肤区分.fx" alt=""></div>
                  <p>分享</p>
              </li>
              

          </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
export default {
    data() {  
        return {
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
                iconbj:"#ffffff",
                topwd: require('../../assets/img/wd/bai/icon_my.e73287d.png'),
                topkf: require('../../assets/img/wd/bai/icon_kf.801b1a7.png'),
                kbj: require('../../assets/img/wd/bai/bg_wd.86f718b.png'),

                wycz: require('../../assets/img/wd/bai/icon_wycz.f9e77b9.png'),
                mstx: require('../../assets/img/wd/bai/icon_mstx.e1b7679.png'),
                zjmx: require('../../assets/img/wd/bai/icon_zjmx.0945371.png'),

                wdqb: require('../../assets/img/wd/bai/wdqb.918b19e.png'),
                zhxx: require('../../assets/img/wd/bai/zhxx.36112f0.png'),
                aqzx: require('../../assets/img/wd/bai/aqzx.66fcd5f.png'),
                wdbb: require('../../assets/img/wd/bai/wdbb.1478574.png'),
                tzjl: require('../../assets/img/wd/bai/tzjl.afcd0e1.png'),
                xxzx: require('../../assets/img/wd/bai/xxzx.33242e9.png'),
                szzz: require('../../assets/img/wd/bai/zhsz.6e22d4a.png'),
                fx: require('../../assets/img/wd/bai/share.881e5cf.png'),

            },


            hei:{
                color: "#eacd91",
                topbj: "#1d1e23",
                iconbj:"#1d1e23",
                topwd: require('../../assets/img/wd/hei/get-now.699f3f1.png'),
                topkf: require('../../assets/img/wd/hei/icon_kf.8b8368b.png'),
                kbj: require('../../assets/img/wd/hei/bg_wd.c813e76.png'),

                wycz: require('../../assets/img/wd/hei/icon_wycz.cb6d418.png'),
                mstx: require('../../assets/img/wd/hei/icon_mstx.f4f5f16.png'),
                zjmx: require('../../assets/img/wd/hei/icon_zjmx.d14b04f.png'),

                 wdqb: require('../../assets/img/wd/hei/wdqb.71da888.png'),
                zhxx: require('../../assets/img/wd/hei/zhxx.8566753.png'),
                aqzx: require('../../assets/img/wd/hei/aqzx.cc1154c.png'),
                wdbb: require('../../assets/img/wd/hei/wdbb.4aed68a.png'),
                tzjl: require('../../assets/img/wd/hei/tzjl.0193b30.png'),
                xxzx: require('../../assets/img/wd/hei/xxzx.b811c13.png'),
                szzz: require('../../assets/img/wd/hei/zhsz.faef6d6.png'),
                fx: require('../../assets/img/wd/hei/share.35c8a81.png'),
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
.我的{
    padding-bottom:_vw(50);
       .div_top{
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        div{
            span{
                line-height: _vw(30);
                font-size: _vw(16)
            }
        }
        .imgheight{
            height:_vw(26) !important;

        }
        .text,.sqzj{
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            width: _vw(60);
            height:_vw(19);
            
        }
           .sqzj{
            width: _vw(40);
            height:_vw(24);
        }
    }
    .contnt{
        padding-top:_vw(35);
        .heibj{
            background: #1d1e23;
        }
       .卡{
           height:_vw(311);
           background-repeat:no-repeat;
           background-size: 100% 100%;
            box-sizing: border-box;
            padding-top:_vw(30);
        .top_content{
            box-sizing: border-box;
            width: 80%;
            margin:0px auto;
            height: _vw(80);
            display: flex;
            margin-bottom: _vw(30);
                .left{
                    width:_vw(69);
                    height: _vw(69);
                        border-radius: 50%;
                        margin-right: _vw(20);
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;

                    }
                }
                .right{
                  .name_top{
                      display:flex;
                      line-height: _vw(21);
                      color:#ffffff;
                      font-weight: 650;
                      .vip{
                          width: _vw(47);
                          height: _vw(21);
                          margin-left: _vw(10);
                          img{
                              width: 100%;
                              height:100%;
                          }
                      }

                  }
                  .name_content{
                   line-height: _vw(24);
                   font-size: _vw(18);
                   display: flex;
                   align-items: center;
                   margin:_vw(4) 0px;
                   span:nth-child(1){
                       color:#ffffff;
                   }
                    span:nth-child(2){
                       color:#ffe822;
                       margin:0px _vw(10);
                   }
                   .刷新{
                     width: _vw(17);
                     height: _vw(17);
                     img{
                         width: 100%;
                         height: 100%;
                     }
                   }
                  }
                  .name_bottom{
                    line-height: _vw(15);
                    color:#f1ebeb;
                  }
                }
            }
            .div_bottom{
            width: 80%;
            margin:0px auto;
            height: _vw(80);
            display:flex;
            justify-content: space-between;
            align-items: center;
            li{
                .top_imh{
                     width: _vw(63);
                     height: _vw(63);
                     border-radius: 50%;
                     img{
                         width: 100%;
                         height: 100%;
                        border-radius: 50%;
                     }
                }
                p{
                    margin:0px;
                    margin-top:_vw(6);
                    text-align: center;
                    color:#ffffff;
                    font-size:_vw(13)
                }
            }
            }
       }
       .nav_ul{
           margin:0px;
           padding:0px;
           display:flex;
          flex-wrap: wrap;
          li{
              margin:_vw(20) 0px;
              width: 33.33%;
              .nav_img{
                  width: _vw(48);
                  height: _vw(48);
                  margin:0px auto;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
              p{
                  margin:0px;
                  text-align: center;
                  color:#999999;
                  font-size: _vw(14);
                  margin-top:_vw(6);
              }
          }
       }
    }
}
</style>