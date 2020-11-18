<template>
    <div class="跟单">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">大神推荐</span>
            <span class="iconfont iconjilu" @click="历史记录()"></span>
        </div>

          <div class="table"  :class="皮肤区分.classname" >
            <van-tabs v-model="active"   animated>
                <van-tab v-for="(item,index) in lotteryList">
                    <div slot="title"> {{ item }} </div>
                    <div  class="table_content_title" >

                        <div class="teble_titile">
                           <div class="title_l">专家周排名(在售)</div>
                           <div class="title_r" :style="{'color':皮肤区分.tablecolor,}">
                             <div class="left" @click="clicktite(0)" :class="{active:tableType==0}">盈利率</div>
                             <div class="left" @click="clicktite(1)" :class="{active:tableType==1}">胜率</div>
                             <div class="left" @click="clicktite(2)" :class="{active:tableType==2}">连中</div>
                           </div>
                          </div> 
                          <div class="zj_zp">
                              <div>
                                <div class="img_v"><img src="../../assets/img/gd/girl.c5b1ff4.jpg" alt=""></div>
                                <div class="hg"></div>
                              </div>

                              <div>
                                <div class="img_v"><img src="../../assets/img/gd/girl.c5b1ff4.jpg" alt=""></div>
                                <div class="hg"></div>
                              </div>

                              <div>
                                <div class="img_v"><img src="../../assets/img/gd/girl.c5b1ff4.jpg" alt=""></div>
                                <div class="hg"></div>
                              </div>
                            
                          </div>                  
                    </div>
                </van-tab>
            </van-tabs>
          </div>


    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
          classname:"",
            active: "",
            tableType:0,
            lotteryList:["全部","重庆时时彩","新疆时时彩","天津时时彩","六合彩","北京PK拾","大乐透",],
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
                classname:'ffffff',
                tablecolor:"#ffea00"
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
                classname:"eacd91",
                tablecolor:"#d99513"
            }
        }
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
       created(){
         console.log(this.active)
     },
    methods: {
        历史记录() {
          this.$router.history.push('/documentary-history');
            // console.log("历史记录")
        },
        返回() {//头部
            history.back()
        },
       clicktite(index) {
            this.tableType = index
        },

    },
}


</script>
<style lang="scss" scoped>

.ffffff{
     background: linear-gradient(180deg,#4b6ec7,#4ba2cf);
  /deep/ .van-tab{
    color: #ffffff
  }
   /deep/.van-tab--active{
     color:#ffea00
   }
   /deep/.van-tabs__line{
      background-color:#d99513;
   }
     .title_r{
       border:1px solid #ffffff;
      .active{
            background: #ffffff;
            color:#4b75c8
          }
        div:nth-child(2){
                border-left:1px solid #ffffff;
                border-right:1px solid #ffffff;
        }
     }

}

.eacd91{
   background:#2e2f33;
  /deep/ .van-tab{
    color: #a4a4a5
  }
  /deep/.van-tab--active{
     color:#d99513
   }
   /deep/.van-tabs__line{
      background-color:#d99513;
   }
     .title_r{
       border:1px solid #acacac;
           .active{
                 background: #ffffff;
                 color:#1d1e24
               }
         div:nth-child(2){
                border-left:1px solid #acacac;
                border-right:1px solid #acacac;
          }
     }
}

.跟单 {
    padding-top: _vw(35);
    width: 100%;
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
        .iconjilu {
            font-size: _vw(20);
        }
        .text {
            font-size: _vw(18);
        }
    }
    .table{
          height: _vw(240);
          /deep/.van-tabs__nav {
                background-color:rgba(0,0,0,0.0)!important;
          }
         /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
          border-width: 1px 0;
          border-top: none;
        }
        .table_content_title{
          padding:_vw(10);
         .teble_titile{
          display:flex;
          justify-content: space-between;
          align-items: center;
          .title_l{
            color:#ffffff;
            font-size: _vw(15);
          }
          .title_r{
              display:flex;
           
               div{
                 width:_vw(50);
                 line-height: _vw(18);
                 font-size: _vw(12);
                 text-align: center;
               }
          }
         }
         .zj_zp{
           display:flex;
           justify-content:space-around;
           align-items: center;
           padding-top:_vw(40);
           box-sizing: border-box;
           div:nth-child(1), div:nth-child(3){
             position: relative;
             .img_v{
              width:_vw(60);
              height:_vw(60);
              border-radius: 50%;
              img{
                width: 100%;
                height: 100%;
                border-radius:50%;
              }
             }
           }
           div:nth-child(1){
                 .img_v{
               
                border:4px solid #a6bedc;
             }
              .hg{
                position: absolute;
                left:_vw(-10);
                top:_vw(-10);
                width: _vw(28);
                height:_vw(28);
                background:url('../../assets/img/gd/bluecrown@2x.f79b93b.png') no-repeat;
                background-size: 100% 100%;
             }
           }
           div:nth-child(3){
             .img_v{
               border:4px solid #f9a771;
             }
              .hg{
                 position: absolute;
                left:_vw(-10);
                top:_vw(-10);
                width: _vw(28);
                height:_vw(28);
               background:url('../../assets/img/gd/redcrown@2x.5258bf9.png') no-repeat;
               background-size: 100% 100%;
             }
           }
              div:nth-child(2){
             position: relative;
                .img_v{
                width:_vw(75);
                height:_vw(75);
              border-radius: 50%;
              border:4px solid #fcd012;
              img{
                width: 100%;
                height: 100%;
                border-radius:50%;
              }
             }
               .hg{
                  position: absolute;
                  left:_vw(-13);
                  top:_vw(-10);
                 width: _vw(35);
                 height:_vw(35);
               background:url('../../assets/img/gd/yellowcrown@2x.dfe2af0.png') no-repeat;
               background-size: 100% 100%;
             }
           }
         }
        }
    }
}
</style>