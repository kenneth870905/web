<template>
    <div class="跟单历史">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">跟单历史</span>
            <span class="sazj" @click="$router.history.push('/specialist')">申请专家</span>
        </div>

          <div class="table"  :class="皮肤区分.classname" >
            <van-tabs v-model="active"   animated>
                <van-tab v-for="(item,index) in lotteryList">
                    <div slot="title"> {{ item }} </div>
                    <div class="gdls" v-show="item=='跟单历史'"> 

                        <select class="select">
                            <option value ="volvo">全部</option>
                            <option value ="saab">重庆时时彩</option>
                            <option value="opel">新疆</option>
                            <option value="audi">北京</option>
                        </select>
                    </div>
                       <div class="td" v-show="item=='我的推单'"> 
                          <div  v-if="!showzj"  class="否专家">
                              <div class="img_box"><img src="../../assets/img/gd/notGod.de0f5c9.png" alt=""></div>
                              <p>您还不是专家</p>
                              <div class="btn" @click="$router.history.push('/specialist')">申请专家</div>
                          </div>
                          <div  v-if="showzj"  class="是专家" >是专家</div>
                      </div>
                       <div v-show="item=='我的关注'"> 
                        {{item}}
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
            showzj:false,//是否专家
          classname:"",
            active: "",
            tableType:0,
            lotteryList:["跟单历史","我的推单","我的关注",],
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
  /deep/ .van-tab{
    color: #333;
  }
   /deep/.van-tabs__line{
      background-color:#d99513;;
   }


}

.eacd91{
  /deep/ .van-tab{
    color: #333
  }
   /deep/.van-tabs__line{
      background-color:#d99513;
   }

}

.跟单历史 {
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
        .sazj {
            font-size: _vw(15);
        }
        .text {
            font-size: _vw(18);
        }
    }
    .table{
          height: _vw(240);
          /deep/.van-tabs__nav {
                background-color:#f2f4ff !important;
          }
         /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
          border-width: 1px 0;
          border-top: none;
        }
        .gdls{
            margin-top: _vw(20);
            .select{
                display: block;
                width: 90%;
                margin:0px auto;
                height:_vw(30);
                background:#eeeeee;
            }
        }
        .td{
         .否专家{
           .img_box{
               width: _vw(210);
               height: _vw(160);
               margin:_vw(65) auto _vw(0) auto;
               img{
                   width: 100%;
                   height: 100%;
               }
           }
           p{
             text-align: center;
             font-size: _vw(20);
           }
           .btn{
               width: _vw(210);
               height: _vw(37);
               margin:0px auto;
               text-align: center;
               line-height: _vw(37);
            border-radius: _vw(35);
            background: #dddd;

               
           }
         }
         .是专家{

         }
        }
    
    }
}
</style>