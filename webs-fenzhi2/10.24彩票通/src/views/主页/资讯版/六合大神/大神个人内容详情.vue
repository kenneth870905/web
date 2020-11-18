<template>
    <div class="冰心推荐">
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="六合大神" @click="$router.history.push('/markSixSanito')"><img src="@/assets/img/bxtj/icon_lhds.3759253.png" alt=""></div>        
        <div class="返回" @click="返回()"><van-icon name="arrow-left" class="arrow_left" /></div>
         


                 <!-- 投票弹出框 -->
        <div v-if="shouTP" >
            <div class="投票弹出框">
         
               <div class="top_qihao" >{{期号}}<van-icon name="cross" @click="shouTP=false" class="cross" /></div>
               <ul class="tc_ul">
                   <li  v-for="(item1,index) in 生肖">
                       <div class="tptc_img" @click="选中(item1)">
                           <img  v-if="!item1.imgShow"  src="@/assets/img/lhds/efad2800-f096-44c7-91ee-385fc60e4c01.png" alt="">
                           <img  v-if="item1.imgShow" src="@/assets/img/lhds/396e43c7-bb71-4d3b-a749-ef64077b0f9a.png" alt="">
                        </div>
                       <p>{{item1.type}} <span class="fred">{{item1.num}}</span>票</p> 
                   </li>
               </ul>
               <div class="tijiao_btn" @click="提交()" >提交</div>  
           </div>
        </div>




     <div class="top_fixid"> 
      
         <div class="开奖" :class="{height:lottery==false}">
              <div class="收起"  v-if="lottery" :class="{poitnonA:lottery==true}"  @click="开奖()"><van-icon name="arrow-up" class="up" /></div>
              <div class="收起 "  :class="{poitnon:lottery==false}" v-if="!lottery"  @click="开奖()"><van-icon name="arrow-down" class="down" /></div>
              <div class="text_num"  v-if="lottery">2019-09-05 2019102期</div>
              <ul class="kj_ul"  v-if="lottery" >
                <li class="qiu" >
                    <div class="green"> {{lotterynum[0].num}}</div>
                    <div class="text" >{{lotterynum[0].text}}</div>
                </li>
                    <li class="qiu">
                    <div class="red">{{lotterynum[1].num}}</div>
                    <div class="text" >{{lotterynum[1].text}}</div>
                </li>
                    <li  class="qiu">
                    <div class="green">{{lotterynum[2].num}}</div>
                    <div class="text" >{{lotterynum[2].text}}</div>
                </li>
                    <li  class="qiu">
                    <div class="red">{{lotterynum[3].num}}</div>
                    <div class="text" >{{lotterynum[3].text}}</div>
                </li>
                    <li  class="qiu">
                    <div class="green">{{lotterynum[4].num}}</div>
                    <div class="text" >{{lotterynum[4].text}}</div>
                </li> 
                    <li  class="qiu">
                    <div class="green">{{lotterynum[5].num}}</div>
                    <div class="text" >{{lotterynum[5].text}}</div>
                </li> 
                <li class="jia_li">
                        <div class="jia">&nbsp;</div>
                    <div  class="text">&nbsp;</div>
                </li>
                <li  class="qiu">
                    <div class="red"> {{lotterynum[6].num}}</div>
                    <div class="text" >{{lotterynum[6].text}}</div>
                </li>
              </ul>
         </div>

         <div class="content">  
            <div class="个人信息头部">
                <div class="头像"><img src="@/assets/img/lhds/txname.jpg" alt=""></div>
                <span class="name_n">财神版主</span>
                <span class="num_fs">3129个粉丝</span>
            </div>
         <div class="CFhtml">
          <h1>存放的html</h1>
         </div>

         <!-- 投票 -->
         <ul class="票数">
                   <li v-for="(item1,index) in 生肖">
                        <div class="type_T">{{item1.type}}</div>
                        <div class="jd"> <van-progress :show-pivot="false" color="#f44" :percentage="item1.num/10" /></div>
                        <div class="num">{{item1.num}}</div>
                   </li>
         </ul>                  
         <div class="投票按钮" @click="投票()">投票</div>
        
        <!-- 评论 -->
         <div class="评论区" >
                      <div class="title">
                          <div class="text">评论区</div>
                      </div>
                      <ul class="pl_ul">
                          <li  v-for="(item2,index55) in 评论">
                           <div class="top_li">
                               <div class="li_left_top">
                                   <div class="toux" v-if="item2.tximg "><img src="@/assets/img/lhds/girl.c5b1ff4.jpg" alt=""></div>
                                   <div class="toux" v-if="!item2.tximg"><img src="@/assets/img/lhds/100.jpg" alt=""></div>
                                   <span class="name">{{item2.name}}</span>
                               </div>
                               <div class="li_right_top">{{item2.time}}</div>
                           </div>
                           <div class="bottom_li">{{item2.text}}</div>
                          </li>
                      </ul>
            </div> 
               <!-- input评论框 :style="{'background':皮肤区分.topbj}" -->
                 <div class="评论"  v-if="!bottomBox" :style="{'background':皮肤区分.topbj}">
                    <div class="input" >
                        <div class="left_input">
                            <van-cell-group>
                            <van-field :maxlength="25" v-model="value" placeholder="请输入评论内容，25字以内" />
                            </van-cell-group>
                        </div>
                        <div class="right" @click="评论按钮()">评论</div>
                    </div>
                </div> 
                 <!-- 底部固定栏 -->
                <div class="底部固定栏" v-if="bottomBox">
                    <div class="time_t">2019-10-24 23:51:44</div>
                    <div class="input_i" @click="bottomBox=false">点击评论</div>
                    <div class="icon_i"><span class="iconfont iconyan"></span>&nbsp; <span>2034</span><span class="iconfont icondianzan"></span>&nbsp;<span>23</span></div>
                </div>
         </div>
     </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Toast } from 'vant';
export default {
    data() {  
        return {
            led:true,
            lottery:true,
            list:[],
            value:"",//input 框的值
            shouTP:false,//投票弹框的显示隐藏
            bottomBox:true,//底部框的显示和隐藏
            lotterynum:[
                {num:6,text:"马/牛"},
                {num:18,text:"马/猪"},
                {num:6,text:"马/牛"},
                {num:24,text:"马/鸡"},
                {num:6,text:"兔/牛"},
                {num:9,text:"猴/蛇"},
                {num:11,text:"猴/蛇"}
           ],
             xzObj:{
                 img:"",
                 imgShow:"",
                 num:"",
                 type:"",
             },//投票弹框  选中的对象


             bai: {
                color: "#ffffff",
                topbj: "#5dadff",
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            }, 
             期号:"2019104",
            "生肖":[
                {
                    "type":"猪",
                    "num":51,
                    "img":"@/assets/img/lhds/efad2800-f096-44c7-91ee-385fc60e4c01.png"
                },
                {
                    "type":"牛",
                    "num":32,
                    "img":"@/assets/img/lhds/18701e35-fa17-4930-9ce5-b9c2129ecade.png"
                },
                {
                    "type":"鼠",
                    "num":51,
                    "img":"@/assets/img/lhds/a57667c7-d5da-4292-8ea5-5d3469b884d6.png"
                },
                {
                    "type":"羊",
                    "num":32,
                    "img":"@/assets/img/lhds/72b487c2-8331-412c-acdc-f16e5d63c8be.png"
                },
                {
                    "type":"兔",
                    "num":51,
                    "img":"@/assets/img/lhds/4bf2fc7c-6e82-4e3e-8fbc-5f45354a8def.png"
                },
                {
                    "type":"鸡",
                    "num":8,
                    "img":"@/assets/img/lhds/d67fcf07-fc64-4d1f-a69e-08e1d278b38d.png"
                },
                {
                    "type":"龙",
                    "num":6,
                    "img":"@/assets/img/lhds/16d78898-3261-46b8-b3ac-5783df3a38ce.png"
                },
                {
                    "type":"狗",
                    "num":7,
                    "img":"@/assets/img/lhds/4704d4d8-0817-4f24-a682-3e6baac690ee.png"
                },
                {
                    "type":"虎",
                    "num":7,
                    "img":"@/assets/img/lhds/643301e9-b152-4fd9-b812-e0d97c38eee0.png"
                },
                {
                    "type":"蛇",
                    "num":7,
                    "img":"@/assets/img/lhds/bc7f948d-2e46-43de-9592-61403a3f19da.png"
                },
                {
                    "type":"马",
                    "num":7,
                    "img":"@/assets/img/lhds/bc80c724-739c-44da-b716-10ebcc77e048.png"
                },
                {
                    "type":"猴",
                    "num":7,
                    "img":"@/assets/img/lhds/d5b33da9-e58d-4e73-9ced-957b8c41f729.png"
                }
                
            ],
            评论:[
                {
                    "name":"李寻欢",
                    "time":"2019-09-09 19:44:47",
                    "text":"6677888"
                },
                {
                    "name":"网二",
                    "time":"2019-09-09 19:44:47",
                    "text":"香港挂牌香港挂牌"
                },
                {
                    "name":"赵柳",
                    "time":"2019-09-09 19:44:47",
                    "text":"按钮2按钮2按钮2"
                }
            ]
        }
    },
    components: { // 注册组件
        
    },
    created() {
          var id = this.$route.query.id; //接收六合大神详情页传过来的id
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
             开奖(){
         this.lottery=!this.lottery
        },
         评论按钮(){
             console.log(this.value)
             if(this.value==!""){
                var obj={
                name:"李寻欢bab",
                time:this.tick(),
               text:this.value
              }
              item.评论.unshift(obj)
              this.value=""
             }else{
                 Toast('请输入内容');
             }
            
        },
        关闭(){
            this.led=false;
        },
         投票(){
            this.shouTP=true
            },
          提交(){//投票弹框提交的函数
        this.shouTP=false
        if(this.xzObj.imgShow==true){
            Toast.success('投票成功');
        
             console.log("投票成功 这里可以把数据发给后端") //把数据发给后端
        }else{
             Toast.fail('投票失败');
        }     
        },

            选中(item1){
            this.xzObj=item1
            this.$set(item1, 'imgShow', !item1.imgShow)
            this.生肖.forEach(y=>{
                    if(y!=item1){
                        this.$set(y,'imgShow',false)
                    }else{
                        this.$set(y,'imgShow',true)
                    }
                })
            }
    }
}

</script>
<style lang="scss" scoped>
.冰心推荐{
    // position: relative;
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
       height: _vw(90);
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

           .投票弹出框{
            // position: absolute;
            position: fixed;
            width: 100%;
            height: 100%;
            left:0px;
            right:0px;
            z-index: 50;
            background:#ffffff;
            .cross{
                  position: absolute;
                    right:_vw(10);
                    top:_vw(14);
                    color:#b89648;
                    font-size: _vw(22)
            }
             .top_qihao{
            height: _vw(50);
            line-height: _vw(50);
            text-align: center;
            color:#b89648;
            background:black;
           }
           .tc_ul{
               padding:_vw(20) _vw(10) _vw(10) _vw(10);
               display: flex;
               flex-wrap: wrap;
               align-items: center;
               justify-content: space-between;
               li{
                width: 23%;
                margin-bottom:_vw(10);
                p{
                    margin:0px;
                    // padding-left:_vw(20);
                    font-size: _vw(14);
                    text-align: center;
                }
                .tptc_img{
                    width:_vw(77);
                    height: _vw(77);
                    margin:0px auto;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
               }
           }
           .tijiao_btn{
               margin:0px auto;
               width: _vw(150);
               height: _vw(35);
               background:rgb(207, 23, 31);
               text-align:center;
               line-height: _vw(35);
               font-size: _vw(15);
               color:#ffffff;
               border-radius: _vw(6);
               margin-top:_vw(10);

           }
    }


    .top_fixid{
     background-color:#ffffff;
      position:fixed;
      left:0px;
      top:0px;
      z-index:30;
      width: 100%;
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
      .content{
          background: "#cccccc";
          .个人信息头部{
              display:flex;
              align-items: center;
              padding:  _vw(13);
              font-size: _vw(14);
              border-bottom: 1px solid #e2dfdf;
              .name_n{
                  margin: _vw(0) _vw(10);
              }
              .头像{
                  width:_vw(30);
                  height: _vw(30);
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
              .num_fs{
                  color:#cac6c6;
                  font-size: _vw(12)

              }
          }

           .CFhtml{

          }


         .票数{
             width: 100%;
                display: flex;
               align-items: center;
               flex-wrap: wrap;
               padding:_vw(0) _vw(10);
               box-sizing: border-box;

            li{
                padding-left: _vw(4);
                padding-right: _vw(4);
                box-sizing: border-box;
               width: 50%;
               margin-bottom: _vw(6);           
               display: flex;
               align-items: center;
               justify-content: space-between;
               .type_T,.num{
                 font-size: _vw(13)
               }
               .jd{
                   width: 66%;
                   /deep/.van-progress{
                       height: _vw(7);
                   }
               }
            }
         }
         .投票按钮{
             width: _vw(80);
             color:_vw(12);
             line-height: _vw(25);
             text-align: center;
             border-radius: _vw(25);
             color:#ffffff;
             font-size: _vw(14);
             background:url('~@/assets/img/lhds/button_tp.png') no-repeat;
             background-size: 100% 100%;
             margin:_vw(12) auto _vw(30) auto;
         }
         .评论区{
           .title{
               margin-bottom: _vw(10);
               border-bottom: 1px solid rgb(224, 221, 221);
               position: relative;
               .text{
                   position: absolute;
                   left:50%;
                   height: _vw(30);
                   line-height: _vw(30);
                   background:#ffffff;
                    width: _vw(60);
                    font-size: _vw(14);
                   top:_vw(-15);
                   text-align: center;
                   margin-left: _vw(-30);
                   color:#666
               }
           }
           .pl_ul{
               li{
                   padding:_vw(6);
                   border-bottom: 1px solid rgb(224, 221, 221);
                   .top_li{
                       margin-bottom: _vw(4);
                       display: flex;
                       justify-content:space-between;
                       align-items: center;
                       .li_left_top{
                             display: flex;
                            align-items: center;
                           .toux{
                               width: _vw(30);
                               height: _vw(30);
                               margin-right: _vw(10);
                               border-radius: 50%;
                               img{
                                   width: 100%;
                                   height: 100%;
                                   border-radius: 50%
                               }
                           }
                           .name{
                            //    color:#333333;
                              font-size: _vw(12)
                           }
                       }
                       .li_right_top{
                           color:#999999;
                           font-size: _vw(12)
                       }

                   }
                   .bottom_li{
                   padding-left:_vw(40);
                     font-size: _vw(12);
                     color:#666666;
                   }
               }
           }
         }
         .底部固定栏{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: _vw(13);
             position: fixed;
             bottom:_vw(0);
            left:_vw(0);
          z-index:40;
          line-height: _vw(50);
          background: #333;
          padding:_vw(0) _vw(10);
          width: 100%;
           color:#fff;
           box-sizing: border-box;
           .icon_i{
               display:flex;
               align-items: center;
               justify-content: flex-end;
             .icondianzan{
              color:yellow;
              margin-left: _vw(10);
          }
           }
         }
        .评论{
        height: _vw(50);
        width: 100%;
        position: fixed;
        bottom:_vw(0);
        left:_vw(0);
        z-index:40;
        .input{
            width: 90%;
            margin: 0px auto;
            display:flex;
            justify-content: space-between;
            align-items: center;
                padding-top:_vw(6);
            .left_input{
                border-radius: _vw(20)  !important;
                background: #f5222d;
                width: 80%;
                box-sizing: border-box;
                /deep/.van-cell{
                    padding:0px;
                    line-height: _vw(36);
                    padding-left:_vw(10);
                    border-radius: _vw(6);
                    .van-field__control{
                    border-radius: _vw(10);
                        //  height: _vw(33);
                    }
                }
            }
            .right{
                background: #f5222d;
                width: _vw(60);
                height: _vw(36);
                color:#ffffff;
                border-radius: _vw(6);
                line-height: _vw(36);
                font-size:_vw(13);
                text-align: center;
            }

        }
        }



      }
     
     
    }
  

}
</style>