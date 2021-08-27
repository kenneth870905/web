<template>
   <div class="签到">
 <!--签到成功弹出层  -->
     <van-popup v-model="show" position="top" :overlay="false" class="确认签到弹出层">
       <div class="content_true">
         <div class="div_content">
            <div class="yuan_j">积</div>
            <span class="text">积分</span>
            <span class="num">+10</span>
         </div>
         <div class="btn_qiandao" @click="点击确定()"></div>
       </div>
     </van-popup>
 <!--签到成功弹出层  -->
     <div class="top">
         <van-nav-bar  title="会员签到"  class="title_nav"  left-arrow  @click-left="onClickLeft" /> 
         <div class="time_top">
             <div class="yuan"><div class="div_yuan"><img  :src="configData.api_url+userinof.head" alt=""></div></div>
             <div class="right">
               <div class="right_top"><span class="name_n">{{userinof.name}}&nbsp;&nbsp;</span> <div class="img_div"><img :src="段位展示.maxImg" alt=""></div>{{userinof.level}}</div>
               <div class="right_bottom">
                  <p class="jdshuo">

                     <span>经验值:<span><span>{{userinof.exp}}/{{段位展示.biy}}</span></span></span>
                    </p>
                     <van-progress  class="进度条展示" v-if="percentagedata!==0"  :percentage="percentagedata"  :pivot-text="`${percentagedata}%`"    color="#f2826a" />   
                     <van-progress  class="进度条展示" v-if="percentagedata==0"  :percentage="percentagedata+ 0.01"  :pivot-text="`${percentagedata}%`"    color="#f2826a" />   
               </div>
               </div>
         </div>
         <div class="time">
           <ul class="item_ul">
             <li v-for="(item,index) in num">
                <div class="div_yuan"  :class="{'已领取': 连续签到次数>=item.numdata,'点击领取样式': item.bool}"  @click="点击领取函数(item)">
                  <p v-if="连续签到次数< item.numdata" class="icon_div"><span class="iconfont iconduihuan" ></span></p>
                  <p v-if="连续签到次数>=item.numdata" >{{item.bool? '已领': '领取'}}</p>
                  <p>+{{item.add}}</p> 
                </div>
               <p class="item_num">{{item.numdata}}天</p>
             </li>
           </ul>
         </div>
     </div> 
     <div class="content">
       <div class="积分">
              <div class="left">
                <div class="xin">
                  <div class="icon_img"><span class="iconfont iconmydata"></span></div>
                  <div class="bottom">
                    <p>元宝<span>180</span></p>
                    <p>如何获取元宝？</p>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="xin">
                  <div class="icon_img"><span class="iconfont iconmydata"></span></div>
                  <div class="bottom">
                    <p>查看元宝</p>
                    <p>获取记录</p>
                  </div>
                </div>
              </div>
       </div>

       <div class="按钮" @click="点击签到()">
          {{今日是否签到==1 ? '当日签到成功' : '点击签到'}}
       </div>

       <div class="完成步骤">
          <div class="title"><span class="iconfont iconjifenjilu"></span><span>每日任务</span></div>
         <ul>
           <li>
              <div class="left" v-if="每日任务">
                <span   class="iconfont iconxuanzhong green"></span> 点击签到 
              </div>
               <div class="left" v-if="!每日任务">
                <span   class="iconfont iconxuanzhong acacac"></span> 点击签到 
              </div>
           
        
              <div class="right">{{每日任务 ? "已完成" : "未完成"}} <van-icon name="arrow" />
              </div>
           </li>
           
         </ul>
       </div>


        <div class="完成步骤">
          <div class="title"><span class="iconfont iconjifenjilu"></span><span>每周任务</span></div>
         <ul>
             <li>
                 <div class="left" v-if="每周任务">
                <span   class="iconfont iconxuanzhong green"></span> 邀请新人 
              </div>
              <div class="left" v-if="!每周任务">
                <span   class="iconfont iconxuanzhong acacac"></span> 邀请新人
              </div>
              <div class="right"> {{每周任务 ? "已完成" : "未完成"}} <van-icon name="arrow" />
              </div>
            </li>
         </ul>
       </div>
     </div>
   </div>
</template>

<script>
    import {  mapState } from 'vuex' 
    import { Toast } from 'vant';
    import {签到接口,连续签到次数查询接口,点击领取积分接口,任务列表} from "@/api/我的.js"
   import {获取用户信息} from "@/api/用户信息.js"
  import { VIP数据} from "@/api/VIP.js"

   

export default {
  data(){
    return{
        jdb:60,
        show:false,//弹出框的显示隐藏
        linqu:true,//连续签到是否领取元宝 显示
        xuanz2:true,//任务完成图标显示切换
        每日任务:false,
        每周任务:false,


        configData: config,
        点击领取:false,
        连续签到次数:0,
        今日是否签到:0, // 今日签到 1，未签到0
         num:[ ],
         userinof:{},

            percentagedata:0,
            leveldata:0,
            obj:{},
    }
  },

   created() {
      VIP数据().then(x=>{
                   this.obj=x.data.data.list
                  console.log(this.obj)
                }).catch(err=>{
                    console.log(err)
           })
              任务列表().then(x=>{
               this.每周任务= x.data.data.everyWeek==0 ? false :true
               this.每日任务=x.data.data.sign==0 ? false :true
                  // console.log(x)
                }).catch(err=>{
                    console.log(err)
           })
      console.log(this.个人用户信息)
      this.连续签到次数查询接口的函数()
      this.获取用户信息的函数()
    },
    computed: {
          ...mapState({
                    取出当前数据:"是否登录",
                     个人用户信息:"userinfo"
                }),

       段位展示(){
         if(this.userinof.level=="白银"){
               return {
                 maxImg:require("@/assets/img/vip/by.png"),
                 biy: this.obj.huangjing.SuoXujingyan ,
             }
         }
         else if(this.userinof.level=="黄金"){
               return {
                 maxImg:require("@/assets/img/vip/hj.png"),
                 biy: this.obj.bojing.SuoXujingyan ,
             }
         }
          else if(this.userinof.level=="铂金"){
                 return {
                 maxImg:require("@/assets/img/vip/bj.png") ,
                 biy: this.obj.zuanshi.SuoXujingyan  ,
             }
         }
         else if(this.userinof.level=="砖石"){
               return {
                 maxImg:require("@/assets/img/vip/zs.png") ,
                 biy: this.obj.xingyao.SuoXujingyan ,
             }
         }
         else if(this.userinof.level=="星耀"){
               return {
                 maxImg:require("@/assets/img/vip/xy.png") ,
                 biy: this.obj.wangzhe.SuoXujingyan  ,

             }
         }
         else if(this.userinof.level=="王者"){
               return {
                 maxImg:require("@/assets/img/vip/wz.png") ,
                 biy: this.obj.wangzhe.SuoXujingyan  ,
             }
         }else{
             console.log("找不到vip图片")
             return '找不到vip图片'
         }
       }, 
    },
      methods: {
     获取用户信息的函数(){
          获取用户信息().then(x=>{
              console.log(x)
              if(x.data.code==1){
                    var this_=this
                    setTimeout(function(){ //因为用到
                          this_.userinof= x.data.data
                        var num= this_.userinof.exp / this_.段位展示.biy  //当前积分 除以 需要晋级段位的经验值  得到完成比列 展示进度条
                        var numdata=( num *100).toFixed(2)
                        this_.percentagedata=parseInt(numdata)
                        console.log(  this_.percentagedata)
                        console.log( typeof this_.percentagedata)
                    },200)
                }else{
                  console.log("请求失败")
                }
          }).catch(err=>{
              console.log(err)
          })
        },
        点击领取函数(item){
          console.log(item)
          if(this.连续签到次数>item.numdata){ //当前签到次数大于列表中的次数 就代表是可以点击领取金币的 
          if( item.bool==false ){ //代表没取过
                var obj={
                  num:item.numdata
                }
                  点击领取积分接口(obj).then(x=>{
                    if(x.data.code==1){
                      console.log(x) 
                      // Toast(x.data.msg)
                       Toast("领取成功")
                        item.bool=true
                        this.num.forEach(y=>{
                          if(y!==item){
                              // y.bool=false
                              this.$set(y,y.bool,false)
                          }else{
                              // y.bool=true
                              this.$set(y,y.bool,true)
                          }
                      })
                    }else{
                      console.log("请求失败11")
                    }
                  }).catch(err=>{
                    console.log(err)
                  })
              }else{
                      Toast("您已经领取过该奖励")
              }   
          }else{
                      Toast("连续签到未满改天数，不可领取金币")
            
          }
      
        },
        连续签到次数查询接口的函数(){
          连续签到次数查询接口().then(x=>{
            if(x.data.code==1){
               console.log(x.data.data)
               this.连续签到次数=x.data.data.sign_continue_count //连续签到次数
               this.今日是否签到=x.data.data.sign_today  // 今日签到 1，未签到0

               this.num=x.data.data.num
               console.log(this.连续签到次数)
            }else{
              console.log("请求失败后台错误")
            }
          }).catch(err=>{
            console.log(err)
          })
        },
          点击签到() {//头部
            if(this.今日是否签到==0){
                      this.show=true;
             
            }else{
               Toast("今日已签到无需再次签到");
            }
         },
         点击确定(){ 
            签到接口().then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                       Toast(x.data.msg);
                         this.show=false; //关闭弹窗
                         this.连续签到次数查询接口的函数() //再次获取签到状态
                         this.每日任务=true
                    }else{
                       Toast(x.data.msg);
                     this.show=false; //关闭弹窗
                    }
                    
                  }).catch(err=>{
                     this.show=false;
                    console.log(err)
                  })
         },
         onClickLeft() {//头部
            history.back()
         },
             clicktite(index) {
            this.tableType = index
        },
    },
}
</script>

<style lang="scss" scoped>
/deep/.van-progress__pivot{
  font-size: _vw(12) !important;
}
/deep/.van-progress{
  height: _vw(6) !important;
}
.签到{
  background: #ffffff;
  padding:0px; 
  position: absolute;
  left: 0px;
  top:0px;   
  width: 100%;
  height: 100%;
  overflow-x:auto;
  .router{
  padding:0px;    
  }
}

/deep/.van-progress__portion{
  background: #ffffff !important;
}
/deep/ .van-progress__portion--with-pivot{
  background: #ffffff  !important;   
}
p{
  margin:0px;
}
.确认签到弹出层{
  background: rgba(0,0,0,0.4);
  position: fixed;
  left:0px;
  top:0px;
  width: 100%;
  height: 100%;
  .content_true{
      background: #cb1c36;
      height: _vw(400);
      width:_vw(300);
      position: absolute;
      top:_vw(100);
      left:50%;
      margin-left:_vw(-150);
      background:url("../../assets/img/wode/qdcg.png") no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
        padding-top:_vw(200);
      .div_content{
        display:flex;
        width:_vw(200);
        margin:0px auto;
        padding-left: _vw(70);
        align-items: center;
      
        .yuan_j{
          width:_vw(40);
          height: _vw(40);
          border-radius: 50%;
          background: rgb(236, 215, 20);
          color:red;
          line-height: _vw(40);
          text-align: center;
          font-size: _vw(18);
        }
        .text{
          color:#ffffff;
          font-size: _vw(18);
          margin:  auto _vw(4);
        }
        .num{
          font-size: _vw(30);
          color:rgb(236, 215, 20);
        }
      }
      .btn_qiandao{
        margin-left:_vw(20);
        width: _vw(140);
        height: _vw(40);
        margin:0px auto;
        margin-top:_vw(86);
      }
  }
}
.签到{
  .top{
    background: #cb1c36;
    position: relative;
    height: _vw(220);
      /deep/.van-nav-bar{       
            border-bottom:0px !important;
        }
         /deep/.van-hairline--bottom::after{
            border-bottom-width: 0px !important;
        }
    .title_nav{
         background: #cb1c36;
      margin-bottom: none; 
      /deep/.van-nav-bar__title{
      color:#ffffff !important; 
      font-size:_vw(18);           
      } 
      /deep/.van-icon{
      color:#ffffff !important;            
      }  
  }
    .time_top{
     padding-top:_vw(15);
     width: 90%;
     margin:0px auto;
     display:flex;
     .yuan{
       width: 20%;
        .div_yuan{
          width: _vw(60);
          height: _vw(60);
          border-radius: 50%;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%
          }
        }
       }
     .right{
       width: 80%;
       box-sizing: border-box;
      .right_top{
        color:#ffffff;
        font-size: _vw(14);
        display:flex;
        .name_n{
          font-size:_vw(16);
          font-weight:600;
        }
        .img_div{
          width: _vw(20);
          height: _vw(20);
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .right_bottom{
        .jdshuo{
        color:#ffffff;
        font-size: _vw(14);

          margin:0px;
          display:flex;
          justify-content:space-between;
          margin-bottom:_vw(12);
          margin-top:_vw(10);
        }
        .进度条展示{
          background:#c7c4c4;
        }
      }
     }
    }
    .time{
      position: absolute;
      width: 100%;
      left:0;
      bottom:0;
      height: _vw(80);
      background:rgba(0,0,0,0.1);
      padding-top:_vw(10);
      box-sizing: border-box;
      .item_ul{
        width: 90%;
        margin:0px auto;
        display:flex;
        justify-content:space-between;
        li{
          .已领取{
            background: #fe7040 !important;
            color:#ffffff !important;
            p{
               line-height: _vw(18) !important;
              font-size:_vw(12) !important;
             
            }
             
          }
          .点击领取样式{
            background: #499af6 !important;
            
            color:#ffffff;
          }
          .div_yuan{
            width: _vw(40);
            height: _vw(40);
            border-radius: 50%;
            background: #cccc  ; 
            text-align: center;
            line-height: _vw(20) ;
            font-size:_vw(12);
            color:#686464;
            .iconfont{
              font-size: _vw(14);
              }
          }
          .item_num{
            text-align: center;
            color:#ffffff;
            font-size: _vw(14)
          }
        }
      }
    }
  }
  .content{
    padding-bottom: _vw(44);
      background: #ffffff;
    .积分{
      display:flex;
      padding-top:_vw(10) ;
  
      .left,.right{
        display: flex;
        width: 50%;
        margin:0px auto;
        .xin{
          padding-top:_vw(10);
          padding-bottom: _vwZ(10);
          width: 80%;
          margin:0px auto;
            display: flex;
              .icon_img{
                width: _vw(40);
                height: _vw(40);
                border-radius: 50%;
                color:#ffffff;
                line-height: _vw(40);
                text-align: center;
                margin-right: _vw(4);
                .iconfont{
                  font-size: _vw(24)
                
                }
              }
              .bottom{
                font-size: _vw(14);
                width: 70%;
              }
            }
      }
      .left{
        .icon_img{
                background:rgb(151, 247, 138);         
        }
      }
      .right{
        border-left:1px solid #ccc;
        .icon_img{
       background: linear-gradient(135deg,#fe7040  0%,  #ec304c 100%) !important; 
        }
      }
    }
    .按钮{
      width:40%;
      height: _vw(40);
      border-radius: _vw(35);
      text-align: center;
      line-height: _vw(40);
       background: linear-gradient(135deg,#fe7040  0%,  #ec304c 100%) !important; 
      margin:_vw(30)  auto  _vw(20)  auto;
      color:#ffffff;
      font-size: _vw(16);
    }
    .完成步骤{
      .title{
        border-bottom:1px solid #cccc;
        line-height: _vw(40);
        color:goldenrod;
        padding-left:_vw(10);
        background: #ffffff;
        font-size: _vw(14);
         .iconfont{
          font-size: _vw(14);
         }
      }
      ul{
        li{
          line-height: _vw(40);
          display:flex;
           justify-content: space-between;
           padding:_vw(10) _vw(10) _vw(0) _vw(10);
           box-sizing:border-box;
           font-size: _vw(14);
           .left{
             .iconfont{
               font-size: _vw(14);
             }
             .green{
               color:rgb(96, 180, 128);
             }
             .acacac{
               color:#b9b7b7;
             }
           }
           .right{
             color:#acacac;
           }
        }
      }
    }
  }

}
</style>
