<template>
  <div class="my">
      <div class="top">
        <div class="top_top" >
            <div class="top_content">
                <div class="left">
                    <div class="left_name" >
                        <span v-if="userinof.head==''" class="iconfont iconwode"></span>
                        <img v-if="!userinof.head==''" :src="configData.api_url+userinof.head" alt="">
                    </div>
                </div>
                <div class="right_text">
                    <div class="right_text_top">
                      <div class="name" >{{userinof.user_name}}</div> 
                      <div class="type_bo"><div class="i_div"><img :src="段位展示.maxImg" alt=""></div><div class="right_t">{{userinof.level}}</div></div>
                            <div class="div_right_btn">兑换</div>
                    </div>
                    <div></div>
                    <div  class="right_text_bottom">
                        流量池:<span>&ensp;{{userinof.points + userinof.points_sign + userinof.points_invite }}元宝</span>
                    </div>
                    <div class="type_num">
                        <div class="num"> 充值:<span> &#8197;{{userinof.points}}</span></div>
                          <div class="num"> 赠送:<span>&#8197;{{userinof.points_sign}}</span></div>
                          <div class="num"> 邀请:<span> &#8197;{{userinof.points_invite}}</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="进度条">
            <div class="title_jy">
                   <div class="经验值">当前等级:</div>
                    <div class="img_box">
                      <img :src="段位展示.minImg" alt="">
                    </div>
            </div>
             <p>{{userinof.exp}}/{{段位展示.biy}}</p>
              <van-progress  class="进度条展示" v-if="percentagedata!==0"  :percentage="percentagedata"  :pivot-text="`${percentagedata}%`"    color="#f2826a" />   
              <van-progress  class="进度条展示" v-if="percentagedata==0"  :percentage="percentagedata+ 0.01"  :pivot-text="`${percentagedata}%`"    color="#f2826a" />   
        </div>
      </div>


      <div class="常用功能">
        <h4>
            <p class="_P_i">|</p>
            <p class="t_t">&nbsp;常用功能</p>
         </h4>
           <ul class="ul_cy">
                <li  @click="$router.push('/SignIn')">
                    <div class="div_box img_1"><span class="iconfont iconjifenjilu"></span></div>
                    <p>每日签到</p>
                </li>
                  <li  @click="$router.push('/changeDatum')">
                    <div class="div_box img_2" ><span class="iconfont iconxiugaiziliao"></span></div>
                    <p>修改资料</p>
                </li>
                 <li  @click="$router.push('/collection')">
                    <div class="div_box img_3"><span class="iconfont iconicon-test"></span></div>
                    <p>我的收藏</p>
                </li>
                 <li  @click="$router.push('/historyjl')">
                    <div class="div_box img_4"><span class="iconfont iconlishijilu"></span></div>
                    <p>历史记录</p>
                </li>
                 <li  @click="$router.push('/jurisdiction')">
                    <div class="div_box img_5"><span class="iconfont iconquanxian"></span></div>
                    <p>任务列表</p>
                </li>
                 <li  @click="$router.push('/CreditsLog')">
                    <div class="div_box img_6"><span class="iconfont iconjifenjilu"></span></div>
                    <p>兑换记录</p>
                </li>
                 <li  @click="$router.push('/NewGuidelines')">
                    <div class="div_box img_7"><span class="iconfont icontixianjilu"></span></div>
                    <p>新手指引</p>
                </li>
                <li  @click="$router.push('/Recharge')">
                    <div class="div_box img_8"><span class="iconfont iconquanxian"></span></div>
                    <p>元宝充值</p>
                </li>
            </ul>
      </div>

      <div class="常用功能 平台报表">
        <h4>
            <p  class="_P_i">|</p>
            <p  class="t_t">&nbsp;平台报表</p>
         </h4>
           <ul class="ul_cy">
                <li  @click="$router.push('/vip')">
                    <div class="div_box img_1"><span class="iconfont iconjifenjilu"></span></div>
                    <p>获取元宝</p>
                </li>
                  <li  @click="$router.push('/ship')">
                    <div class="div_box img_2" ><span class="iconfont iconxiugaiziliao"></span></div>
                    <p>热门视频</p>
                </li>
                 <li  @click="$router.push('/youshenXS')">
                    <div class="div_box img_3"><span class="iconfont iconicon-test"></span></div>
                    <p>有声小说</p>
                </li>
                 <li  @click="$router.push('/xiaoshuo')">
                    <div class="div_box img_4"><span class="iconfont iconlishijilu"></span></div>
                    <p>全能小说</p>
                </li>
                 <li  @click="$router.push('/manhua')">
                    <div class="div_box img_5"><span class="iconfont iconquanxian"></span></div>
                    <p>精品漫画</p>
                </li>
                 <li  @click="$router.push('/dyzz')">
                    <div class="div_box img_6"><span class="iconfont iconjifenjilu"></span></div>
                    <p>电影种子</p>
                </li>
                 <li  @click="$router.push('/dslr')">
                    <div class="div_box img_7"><span class="iconfont icontixianjilu"></span></div>
                    <p>低俗内容</p>
                </li>
                <li  @click="$router.push('/generalizeDetails')">
                    <div class="div_box img_8"><span class="iconfont iconquanxian"></span></div>
                    <p>热门专题</p>
                </li>
            </ul>
      </div>

      <div class="out" @click="退出登录()">退出登陆</div>
    
</div>  
</template>


<script>
  import {获取用户信息} from "@/api/用户信息.js"
import { VIP数据} from "@/api/VIP.js" 
import { 退出登录} from "@/api/登录.js"
import { Toast } from 'vant';
 import { mapMutations } from 'vuex' 

export default {
      data() {
        return {
            configData: config,
            userinof:{
            } ,
            percentagedata:0,
            leveldata:0,
            jjby:0,
            obj:{

            },
            时间:0,
        }
    }, 
    created(){
         VIP数据().then(x=>{
                this.obj=x.data.data.list
                  console.log(this.obj)
                //    this.更改当前登陆状态(false)
                }).catch(err=>{
                    console.log(err)
                })
        this.获取用户信息的函数()
    },
     computed: {
       段位展示(){
         if(this.userinof.level=="白银"){
               return {
                 minImg:require("@/assets/img/vip/byQ.png") ,
                 maxImg:require("@/assets/img/vip/by.png"),
                 biy: this.obj.huangjing.SuoXujingyan ,
             }
         }
         else if(this.userinof.level=="黄金"){
               return {
                 minImg:require("@/assets/img/vip/hjQ.png") ,
                 maxImg:require("@/assets/img/vip/hj.png"),
                 biy: this.obj.bojing.SuoXujingyan ,
             }
         }
          else if(this.userinof.level=="铂金"){
                 return {
                 minImg:require("@/assets/img/vip/bjQ.png") ,
                 maxImg:require("@/assets/img/vip/bj.png") ,
                 biy: this.obj.zuanshi.SuoXujingyan  ,
             }
         }
         else if(this.userinof.level=="砖石"){
               return {
                 minImg:require("@/assets/img/vip/zsQ.png") ,
                 maxImg:require("@/assets/img/vip/zs.png") ,
                 biy: this.obj.xingyao.SuoXujingyan ,
             }
         }
         else if(this.userinof.level=="星耀"){
               return {
                 minImg:require("@/assets/img/vip/xyQ.png") ,
                 maxImg:require("@/assets/img/vip/xy.png") ,
                 biy: this.obj.wangzhe.SuoXujingyan  ,

             }
         }
         else if(this.userinof.level=="王者"){
               return {
                 minImg:require("@/assets/img/vip/wzQ.png") ,
                 maxImg:require("@/assets/img/vip/wz.png") ,
                 biy: this.obj.wangzhe.SuoXujingyan  ,

             }
         }else{
             console.log("找不到vip图片")
             return '找不到vip图片'
         }
       },
    
     },
      beforeDestroy(){

      },
       methods: {
           ...mapMutations({
              更改当前登陆状态:"保存登陆状态",
           }),
               退出登录(){
                   退出登录().then(x=>{
                    if(x.data.code==1){
                            this.更改当前登陆状态(false)
                       Toast(x.data.msg)
                       this.时间=setTimeout(()=>{
                           this.$router.push("/")
                         },1000)
                    }else{
                        Toast(x.data.msg)
                    }
                   }).then(err=>{
                       console.log(err)
                   })
               },
               获取用户信息的函数(){

                获取用户信息().then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                        var this_=this
                      setTimeout(function(){ //因为用到
                          this_.userinof= x.data.data
                        var num= this_.userinof.exp / this_.段位展示.biy  //当前积分 除以 需要晋级段位的经验值  得到完成比列 展示进度条
                        var numdata=(num *100).toFixed(2)
                        this_.percentagedata=parseInt(numdata)
                        console.log(  this_.percentagedata)
                        console.log( typeof this_.percentagedata)
                    },200)  
                    }else{
                     aler(1)
                    //    this.更改当前登陆状态(false)
                    //    this.$router.push('/')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
         }
}
</script>
<style lang="scss" scoped>

/deep/.van-toast, .van-toast--middle, .van-toast--text{
  font-size: _vw(20) !important;
  color:#cb1c36 !important;
}
// ========提示弹框==============
/deep/.van-toast{
  font-size: _vw(16);
  line-height: _vw(16);
  padding:_vw(10) _vw(6) _vw(10) _vw(6)
}
.my{
    //头部开始
    .top{
        position: fixed;
        top:0px;
        left:0px;
          height: _vw(200);
          background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
          width: 100%;
          .top_top{
              height: _vw(100);
            .top_content{
                display: flex;
                align-items: center;
                 width: 90%;
                 margin:0px auto;
                 padding-top:_vw(46);
                 height: _vw(60);
                 
                    .left{
                        height: _vw(60);
                        width: 24%;
                        .left_name{
                        margin: 0px auto;
                        width: _vw(60);;
                        height: _vw(60);
                        border-radius: 50%;
                        background: #ffffff;
                        text-align: center;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                        .iconwode{
                            color:#cccccc;
                            font-size: _vw(34);
                            line-height: _vw(56);
                        }
                        }
                    }
                .right_text{
                    width: 76%;
                 .right_text_top{
                     display: flex;
                     align-items: center;
                     color:#ffffff;
                     line-height: _vw(30);
                     .name{
                         margin-right: _vw(10);
                         font-size: _vw(16);
                        //  font-weight:600;
                         
                     }
                     .type_bo{
                          width: _vw(60);
                          height:_vw(25);
                          background:rgba(0,0,0,0.5);
                          border-radius: _vw(45);
                          display: flex;
                           justify-content: center;
                          align-items: center;
                          margin-right: _vw(5);
                          .i_div{
                              width:_vw(20);
                              height:_vw(18);
                              line-height:0px;
                              img{
                                width: 100%;
                                height: 100%;
                              }
                          }
                          .right_t{
                              line-height:_vw(24);
                               font-size: _vw(14);
                          }
                         .gem{
                          color:goldenrod;
                          font-size: _vw(14);
                         }
                     }
                      .div_right_btn{
                                color:#ffffff;
                                background:goldenrod;
                                height: _vw(24);
                                width: _vw(50);
                                border-radius: _vw(25);
                                text-align: center;
                                line-height: _vw(24);
                                font-size: _vw(14);
                            }
                 }
                 .type_num{
                     display:flex;
                       .num{
                       color:#ffffff;
                       font-size: _vw(14);
                       margin-right: _vw(10);
                   }
                 }
                 .right_text_bottom{
                       color:#ffffff;
                       font-size: _vw(14);
                       line-height: _vw(30);
                       width: 100%;
                   .num{
                       color:#ffffff;
                       font-size: _vw(14);
                       line-height: _vw(30);

                   }
          
                 }
                }
         }

        } 
        .进度条{
            width: 90%;
            margin: 0px auto;
            height: _vw(110);
            background: #ffffff;
            margin-top:_vw(40);
            box-sizing: border-box;
            padding-top:_vw(16);
            border-radius: _vw(10);
            border:1px solid #ccc;
            box-shadow: 2px 2px 10px #909090;
           p{
                width: 90%;
                margin:_vw(4) auto _vw(12) auto;
                color:#909090;
                font-size: _vw(13)
           }
            .title_jy{
                width: 90%;
                margin:0px auto;
                display:flex;
                justify-content: space-between;
                align-items: center;
                .经验值{
                    font-size: _vw(14);
                }
                .img_box{
                    width:_vw(220);
                     height: _vw(30);
                    img{
                        width: 100%;
                    }
                }
            }
            .进度条展示{
                width: 90%;
                height: _vw(6);
                margin:0px auto;
                margin-top: _vw(10);
                /deep/.van-progress__pivot{
                  font-size: _vw(12)
                }
            }
        }
    }
    //头部结束
    .平台报表{
        margin-top:_vw(20) !important;
        margin-bottom:_vw(20)  !important ;
    }
    .常用功能{
        width: 90%;
        margin: 0px auto;
        background:#ffffff;
        // adow: 2px 2px 10px #909090;
        margin-top:_vw(260);
        border-radius: _vw(10);
        padding: _vw(0) _vw(20);
        box-sizing: border-box;
        .t_t{
            font-size: _vw(16);
        }
        ._P_i{
            font-size: _vw(16);
            font-weight: 1000;
        }
        h4{
            display: flex;
            border-bottom:1px solid #ccc;
            line-height: _vw(40);
            margin:0px;
            p:nth-child(1){
             font-weight: 1000;
             color:goldenrod;
             line-height: _vw(38);
             margin:_vw(4) 0px;
            }
              p:nth-child(2){
               margin:_vw(4) 0px;                
              }
        }
        .ul_cy{
             display:flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
            padding:_vw(10);
            li{
                width: 24%;
                height: _vw(70);
                margin-bottom: _vw(10);
                p{
                    font-size: _vw(12);
                }
                 .img_1{
                   background:rgb(118, 218, 231);
                    }   
                    .img_2{
                        background:rgb(214, 231, 118);
                    }
                    .img_3{
                        background:rgb(170, 154, 243);
                    }
                    .img_4{
                        background:rgb(245, 198, 112);
                    }
                    .img_5{
                        background:rgb(240, 113, 54);
                    }
                    .img_6{
                        background:rgb(222, 118, 231);
                    }
                     .img_7{
                        background:rgb(104, 236, 126);
                    }
                     .img_8{
                        background:rgb(222, 118, 231);
                    }
                .div_box{
                    width:_vw(50);
                    height: _vw(50);
                    border-radius: 50%;
                    margin:0px auto;
                    text-align: center;
                    span{
                        line-height: _vw(50);
                        text-align: center;
                        color:#ffffff;
                        font-size: _vw(30);
                    }
                }
                p{
                    margin:0px;
                    font-size: _vw(14);
                    text-align: center;
                }
            }
        }

    }
    .out{
        width: 90%;
        margin:0 auto;
        line-height: _vw(40);
        background: #d4213c;
        color:#ffffff;
        text-align: center;
        border-radius: _vw(10);
        margin-bottom: _vw(10);
        font-size: _vw(14)
    }

}
 </style>