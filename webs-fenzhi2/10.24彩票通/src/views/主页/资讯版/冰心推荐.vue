<template>
    <div class="冰心推荐">
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="六合大神" @click="$router.history.push('/markSixSanito')"><img src="@/assets/img/bxtj/icon_lhds.3759253.png" alt=""></div>        
        <div class="返回" @click="返回()"><van-icon name="arrow-left" class="arrow_left" /></div>
    <div class="top_fixid"> 
        <div class="LED展示" v-if="led">
            <div class="ked_content">
                <div class="left"> <marquee direction="left">This text will scroll from bottom tomarquee direction="up">This text will scroll from bottom to top top</marquee></div>
                <div class="right" @click="关闭()"><van-icon name="cross" class="cross" /></div>
            </div>
        </div>
         <div class="开奖" :class="{height:lottery==false}">
             <div class="收起"  v-if="lottery" :class="{poitnonA:lottery==true}"  @click="开奖()"><van-icon name="arrow-up" class="up" /></div>
             <div class="收起 "  :class="{poitnon:lottery==false}" v-if="!lottery"  @click="开奖()"><van-icon name="arrow-down" class="down" /></div>
               <div class="text_num"  v-if="lottery">2019-09-05 2019102期</div>
          <ul class="kj_ul"  v-if="lottery" >
               <li class="qiu" >
                   <div class="green"> {{lotterynum[0].num}}</div>
                   <div class="text">{{lotterynum[0].text}}</div>
               </li>
                <li class="qiu">
                   <div class="red">{{lotterynum[1].num}}</div>
                   <div class="text">{{lotterynum[1].text}}</div>
               </li>
                <li  class="qiu">
                   <div class="green">{{lotterynum[2].num}}</div>
                   <div class="text">{{lotterynum[2].text}}</div>
               </li>
                <li  class="qiu">
                   <div class="red">{{lotterynum[3].num}}</div>
                   <div class="text">{{lotterynum[3].text}}</div>
               </li>
                <li  class="qiu">
                   <div class="green">{{lotterynum[4].num}}</div>
                   <div class="text">{{lotterynum[4].text}}</div>
               </li> 
                  <li  class="qiu">
                   <div class="green">{{lotterynum[5].num}}</div>
                   <div class="text">{{lotterynum[5].text}}</div>
               </li> 
               <li class="jia_li">
                    <div class="jia">&nbsp;</div>
                   <div  class="text">&nbsp;</div>
               </li>
               <li  class="qiu">
                   <div class="red"> {{lotterynum[6].num}}</div>
                   <div class="text">{{lotterynum[6].text}}</div>
               </li>
             </ul>
         </div>
          <div class="tab_t">
              <div  @click="clicktite(itme)"  v-for="(itme,index) in list" :class="{'titleActive':mei ==itme}" >{{itme.title}}</div>
          </div>
          </div>
          <div  class="tab_content" :class="{padding_top:lottery==false}"> 
              <div class="img_box"><img :src="mei.banner" alt=""></div>
              <ul class="c_ul">
                  <li v-for="(items,index) in mei.contentLi">                                                                                     
                      <div class="top">
                         <div class="left_n">
                             <div class="tx"><img :src="items.nameimg" alt=""></div>
                             <span class="n_text">{{items.comeFrom}}:{{items.name}}</span>
                              <div class="彩帝" v-if="items.caid==1" style="color:#FFEA01">彩帝</div>
                         </div>
                         <div class="right_i">
                             <span class="num_t">{{items.znum}}</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                      </div>
                      <div class="content">
                          {{items.content}}
                      </div>
                      <div class="bottom">
                         <div class="l_time">{{items.time}}</div>
                         <div class="r_icon">
                             <span class="iconfont iconyan"></span>
                             <span class="span_n">{{items.looknum}}</span>
                             <span class="iconfont iconpinglunshu"></span>
                             <span class="span_n" >{{items.pnum}}</span>
                      </div>
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
            led:true,
            lottery:true,
            mei:{ },
             lotterynum:[
                {num:6,text:"马/牛"},
                {num:18,text:"马/猪"},
                {num:6,text:"马/牛"},
                {num:24,text:"马/鸡"},
                {num:6,text:"兔/牛"},
                {num:9,text:"猴/蛇"},
                {num:11,text:"猴/蛇"}
           ],
          
            list:[
                {
                    title:"大厅",
                    banner:require("@/assets/img/bxtj/close.d142dd8.png"),//头部大图
                    contentLi:[
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),//头像
                            name:"最牛逼的大厅",//名字
                            comeFrom:"来自彩圈",//信息来源？
                            znum:"256",//点赞数量pi
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",//内容
                            time:"2019-09-07 21:02:00",//时间
                            pnum:"632",//评论数量
                            looknum:"789",//多少人看过数量
                            caid:0 //是否显示彩帝图标 0表示否  1表示是
                        },
                          {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:1
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:1 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                    ]
                },
                {
                    title:"精华帖",
                    banner:require("@/assets/img/bxtj/close.d142dd8.png"),//头部大图
                    contentLi:[
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),//头像
                            name:"最牛逼的精华帖",//名字
                            comeFrom:"来自彩圈",//信息来源？
                            znum:"256",//点赞数量pi
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",//内容
                            time:"2019-09-07 21:02:00",//时间
                            pnum:"632",//评论数量
                            looknum:"789",//多少人看过数量
                            caid:1//是否显示彩帝图标 0表示否  1表示是
                        },
                          {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:1
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                    ]
                },
                {
                    title:"热门贴",
                       banner:require("@/assets/img/bxtj/close.d142dd8.png"),//头部大图
                    contentLi:[
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),//头像
                            name:"最牛逼的热门贴",//名字
                            comeFrom:"来自彩圈",//信息来源？
                            znum:"256",//点赞数量pi
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",//内容
                            time:"2019-09-07 21:02:00",//时间
                            pnum:"632",//评论数量
                            looknum:"789",//多少人看过数量
                            caid:1 //是否显示彩帝图标 0表示否  1表示是
                        },
                          {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                    ]
                },
                {
                    title:"今日发表",
                    banner:require("@/assets/img/bxtj/close.d142dd8.png"),//头部大图
                    contentLi:[
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),//头像
                            name:"最牛逼的今日发表",//名字
                            comeFrom:"来自彩圈",//信息来源？
                            znum:"256",//点赞数量pi
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",//内容
                            time:"2019-09-07 21:02:00",//时间
                            pnum:"632",//评论数量
                            looknum:"789",//多少人看过数量
                            caid:1 //是否显示彩帝图标 0表示否  1表示是
                        },
                          {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                        {
                            nameimg:require("@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png"),
                            name:"清醒人",
                            comeFrom:"来自彩圈",
                            znum:"226",
                            content:"【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!",
                            time:"2019-09-07 21:02:00",
                            pnum:"222",
                            looknum:"996",
                            caid:0 
                        },
                    ]
                },
                
            ]
        }
    },
    components: { // 注册组件
        
    },
    created() {
        this.mei= this.list[0]
    },

    computed: {
    },
    methods:{
        clicktite(itme) {
            this.mei = itme
        },
        返回() {//头部
            history.back()
        },
             开奖(){
         this.lottery=!this.lottery
        },
        
        关闭(){
            this.led=false;
        }
     
    }
    
}


</script>
<style lang="scss" scoped>
.冰心推荐{
    .投注{
        width: _vw(47);
       height: _vw(47);
       border-radius: 50%;
         position: fixed;
       top:_vw(130);
       right:_vw(0);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
        .六合大神{
        width: _vw(40);
       height: _vw(100);
         position: fixed;
       bottom:_vw(100);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
   .返回{
       width: _vw(40);
       height: _vw(40);
       border-radius: 50%;
       background-color: rgba(0,0,0,.4);
         text-align: center;      
       position: fixed;
       top:50%;
       left:0px;
       z-index:40;
       .arrow_left{
       line-height: _vw(40);
       color:rgb(236, 230, 230);
       }
   }
    .top_fixid{
        background-color:#ffffff;
      position:fixed;
      left:0px;
      top:0px;
      z-index:30;
      width: 100%;
      .LED展示{
        background: #1d1e23;
          height: _vw(40);
          position: fixed;
          left:0px;
          top:0px;
          z-index:20;
          .ked_content{
              display:flex;
              justify-content: space-between;
              width: 94%;
              margin:0px auto;
              .left{
                color:#ffffff;
               line-height: _vw(40);
               flex:1;
               font-size: _vw(12)
              }
              .right{
               width: _vw(40);
                 .cross{
                     color:#ffffff;
                     line-height: _vw(40);
                     margin-left: _vw(10);

                 }
              }
          }
      }
      .height{
          height: _vw(0)  !important;
          .poitnon{
              top:_vw(0)  !important;
          }
      }
      .开奖{
          height: _vw(90);
          border-bottom: 1px solid rgb(226, 223, 223);
           .text_num{
               font-size: _vw(12);
               line-height: _vw(30);
               padding-left: _vw(20);
           }
           .poitnonA{
               top:_vw(90)  !important;
           }
          .收起{
              width: _vw(50);
              height: _vw(14);
              font-size: _vw(11);
               text-align: center;
               position: absolute;
               top:_vw(105);
               left:50%;
               margin-left: _vw(-25);
               background: #ffffff;
               border:1px solid rgb(226, 223, 223);
               border-top:none;
               z-index: 10;
              .up{
                
            }
          }
        .kj_ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:_vw(0) _vw(20) _vw(0) _vw(20);
            box-sizing:border-box;
          
         .qiu, .jia_li{
             width:_vw(36);
             .green{
                 background: url("~@/assets/img/home/img_lhc_green.f7d5291.png") no-repeat;               
             }
             .red{
                 background: url("~@/assets/img/home/img_lhc_red.ae2b900.png") no-repeat;  
             }
             .green, .red,.jia{
                 width:_vw(36);
                 height: _vw(36);
                 border-radius: 50%;
                 background-size: 100% 100%;
                 line-height: _vw(36);
                 text-align:center;
                 font-size: _vw(14);
                 margin:0px auto;
             }
             .text{
                 font-size: _vw(12);
                 text-align:center;
             }
         }
         .jia_li{
            width: _vw(16) !important;
            .jia{
                width:_vw(16) !important;
                 height: _vw(16) !important;
                 background: url("~@/assets/img/home/img_jh@2x.7a2dbc3.png");
                  background-position: center center !important
             }
        }
        }
      }

      .tab_t{
          padding:_vw(10)_vw(0);
        background: #f0f0f0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .titleActive{
              color:#c01833;
              font-weight:1000;
          }
          div{
             font-size: _vw(15);
              border-right:_vw(1) solid #ccc;
              text-align: center;
              width: 25%;
          }
      }
    }
    .padding_top{
        padding-top:_vw(40) !important;
        background: red;
    }
      .tab_content{
          padding-top:_vw(142);
          background-color:#f0f0f0 ;
              width: 100%;
              .img_box{
                  height: _vw(60);
                  width: 100%;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
              .c_ul{
                  width: 100%;
                  li{
                      background: #ffffff;
                      margin-bottom:_vw(10);
                      padding:_vw(10);
                    .top{
                      display:flex;
                      justify-content:space-between;
                      align-items: center;
                      .left_n{
                         display:flex;
                        align-items: center;
                        .tx{
                            width: _vw(42);
                            height: _vw(42);
                            border-radius: 50%;
                            margin-right: _vw(10);
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .n_text{
                            font-size: _vw(14);
                            color:#999999;
                        }
                        .彩帝{
                             background: #000;
                             font-size: _vw(14);
                             margin-left: _vw(10);
                        }
                      }
                      .right_i{
                         display:flex;
                        align-items: center;
                         .i_img{
                            width: _vw(26);
                            height: _vw(26);
                            border-radius: 50%;
                            margin-left: _vw(10);
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .num_t{
                             font-size: _vw(14);
                            color:#999999;
                        }
                      }
                    }
                    .content{
                         color: #000;
                        margin: 2vw 0;
                        line-height: 1.5;
                        font-size: _vw(14);
                        width: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical; 
                    }
                    .bottom{
                         display:flex;
                         justify-content: space-between;
                      .l_time{
                            font-size: _vw(12);
                            color:#999999;
                      }
                      .r_icon{
                         display:flex;
                        align-items: center;
                                color:#999999;

                        .span_n{
                            font-size: _vw(12);
                        }
                        .iconpinglunshu{
                            font-size: _vw(14);
                            margin-left: _vw(10);
                            margin-right: _vw(2)

                        }
                        .iconyan{
                            font-size: _vw(14);                         
                        }                   
                      }
                    }
                  }
              }
          }
}
</style>