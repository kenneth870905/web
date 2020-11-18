<template>
    <div class="information">
        <!-- //查看免费阅读弹出层 -->
         <div class="弹出层"  v-if="show" @click="show=false">
            <div  class="弹出层内容" @click.stop>
                <h2>每天免费阅读数量</h2>
                <ul>
                    <li> <span>每日免费观看精彩视频</span> <span class="fred"> {{objdata.videonum}}</span>个</li>
                    <li> <span>每日免费观看精品漫画</span><span  class="fred">{{objdata.manhuanum}}</span>部</li>
                    <li> <span>每日免费观看全能小说</span><span  class="fred">{{objdata.xiaoshuonum}}</span>部</li>
                    <li> <span>每日免费观看有声小说</span><span  class="fred">{{objdata.youshengnum}}</span>部</li>
                    <li> <span>每日免费下载电影种子</span><span  class="fred">{{objdata.zhongzinum}}</span>部</li>
                    <li> <span>每日免费浏览低俗内容</span><span class="fred"> {{objdata.disunum}}</span>篇</li>
                </ul>
            </div>
         </div>

        <div class="information_content"> 
            <div class="top">
                    <!-- ============================已经登录显示的div 开始=============================== -->
                <div class="top_top" v-if="取出当前数据"> 
                    <div class="当前">
                        <p class="name_d">{{userinof.user_name}}</p>
                          <div class="haha">
                            <div class="img_box"><img :src="段位展示"  alt=""></div>
                            <span class="text_baiyin">{{userinof.level}}</span>
                        </div>
                    </div>
                    <div class="input">
                        <div class="btn_top">
                            <div class="yb_box"><span>元宝:&nbsp;</span><div class="yb">{{userinof.points}}</div></div>
                             <div class="jyz_box"><span>经验值:&nbsp;</span><div class="jyz">{{userinof.exp}}</div></div>
                        </div>
                        <div class="费阅读数" >
                            <span @click="show=true">查看免费阅读</span>
                        </div>
                    </div>
                </div>  
          <!-- ============================已经登录显示的div 结束=============================== -->
       <!-- ============================未登录显示的div 开始=============================== -->
                <div class="top_top" v-if="!取出当前数据"> 
                    <div class="当前" @click="$router.push('/login')">
                        <p>请先登陆</p>
                    </div>
                    <!-- <div class="input">
                          游客身份 
                    </div> -->
                </div>  
          <!-- ============================未登录显示的div 结束=============================== -->
                <div class="轮播">
                    <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                        <van-swipe-item v-for="(item, index) in banner" :key="index">
                            <div @click="go轮播(item.Id)"><img :src="item" alt></div>
                        </van-swipe-item>
                    </van-swipe>
                </div> 
            </div>
            
            <div CLASS="步骤条">
                <div class="text">
                   <span class="iconfont iconVIP1"></span><span class="dengji">等级</span>
                </div>
                
                <div class="right_div">
                    <img src="../../assets/img/vip/duan.png" alt="">
                </div>
            </div>



             <!-- <fieldset class="分享 规则">
            <legend class="title">升级规则</legend>
               <div class="div_gz "  v-if="obj.baiying"><div><van-icon name="gem" class="黄金" />白银: </div><div>所需经验<span class="fred">{{obj.baiying.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.baiying.SuoXuYuanBao}}</span></div></div>
               <div class="div_gz "  v-if="obj.huangjing"><div><van-icon name="gem"   class="钻石" /> 黄金:</div><div>所需经验<span class="fred">{{obj.huangjing.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.huangjing.SuoXuYuanBao}}</span></div></div>
               <div class="div_gz "  v-if="obj.SuoXuYuanBao"><div><van-icon name="gem"   class="钻石" /> 铂金:</div><div>所需经验<span class="fred">{{obj.bojing.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.bojing.SuoXuYuanBao}}</span></div></div>
               <div class="div_gz "  v-if="obj.zuanshi"><div><van-icon name="gem"   class="星耀" /> 钻石:</div><div>所需经验<span class="fred">{{obj.zuanshi.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.zuanshi.SuoXuYuanBao}}</span></div></div>
               <div class="div_gz "  v-if="obj.xingyao"><div><van-icon name="gem"   class="王者"  /> 星耀:</div><div>所需经验<span class="fred">{{obj.xingyao.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.xingyao.SuoXuYuanBao}}</span></div></div>   
               <div class="div_gz "  v-if="obj.wangzhe"><div><van-icon name="gem"   class="王者"  /> 王者:</div><div>所需经验<span class="fred">{{obj.wangzhe.SuoXuYuanBao}}</span></div><div>所需元宝<span class="fred">{{obj.wangzhe.SuoXuYuanBao}}</span></div></div>   

                 
            <div class="额度消耗">
              <p class="title_ed">元宝消耗:</p>
              <div class="list_row"  >
                 <div class="li">小说:章节消耗/10分</div>
                 <div class="list_row_right">低俗内容每页面/1分</div>
              </div>
              <div class="list_row">
                 <div class="list_row_left">漫画:每章消耗经验/10分</div> 
                 <div class="list_row_right">有声小说每篇/20分</div>
              </div>
              <div class="list_row">
                 <div class="list_row_left">&nbsp;&nbsp;电影:每个种子/10分</div>
                 <div class="list_row_left">&nbsp;&nbsp;低俗内容:每场/100分</div>
              </div>
            </div>   
            
           </fieldset> -->
           <fieldset class="分享 规则">
               <legend class="title">升级规则</legend>
               <ul >
                   <li @click="查看(obj.baiying,'白银')" :class="{activeDiv:typedata=='白银'}">查看白银</li>
                   <li @click="查看(obj.huangjing,'黄金')" :class="{activeDiv:typedata=='黄金'}">查看黄金</li>
                   <li @click="查看(obj.bojing,'铂金')" :class="{activeDiv:typedata=='铂金'}">查看铂金</li>
                   <li @click="查看(obj.zuanshi,'砖石')" :class="{activeDiv:typedata=='砖石'}">查看砖石</li>
                   <li @click="查看(obj.xingyao,'星耀')" :class="{activeDiv:typedata=='星耀'}">查看星耀</li>
                   <li @click="查看(obj.wangzhe,'王者')" :class="{activeDiv:typedata=='王者'}">查看王者</li>
               </ul>

               <div class="列表"  v-if="title" >
                   <div class="div_gz "><div class="icon_box"><van-icon name="gem" :class="typedata" />{{typedata}}: </div>
                   <div class="font_c">所需经验&nbsp;<span class="fred">{{itemObj.SuoXuYuanBao}}</span></div><div>所需元宝&nbsp;<span class="fred">{{itemObj.SuoXuYuanBao}}</span></div></div>
                    <div class="额度消耗">
                            <p class="title_ed">{{typedata}}元宝消耗:</p>
                            <div class="list_row"  >
                                <div class="li">小说章节消耗/{{itemObj.XiaoShuoJiFeng}}分</div>
                                <div class="list_row_right">每个视频消耗/{{itemObj.ShiPingJiFeng}}分</div>
                            </div>
                            <div class="list_row">
                                <div class="list_row_left">漫画:每章消耗/{{itemObj.ManHuaJiFeng}}分</div> 
                                <div class="list_row_right">有声小说每篇/{{itemObj.YouShengJiFeng}}分</div>
                            </div>
                            <div class="list_row">
                                <div class="list_row_left">&nbsp;&nbsp;每个电影种子/{{itemObj.ZhongZiJiFeng}}分</div>
                                <div class="list_row_left">&nbsp;&nbsp;每篇低俗内容/{{itemObj.XiaoShuoJiFeng}}分</div>
                            </div>
                    </div>   

                     <div class="额度消耗">
                            <p class="title_ed">{{typedata}}每日免费阅读量:</p>
                            <div class="list_row"  >
                                <div class="li">视频每日免费阅读/{{itemObj.XiaoShuoJiFeng}}分</div>
                                <div class="list_row_right">每个视频消耗/{{itemObj.ShiPingJiFeng}}分</div>
                            </div>
                            <div class="list_row">
                                <div class="list_row_left">漫画:每章消耗/{{itemObj.ManHuaJiFeng}}分</div> 
                                <div class="list_row_right">有声小说每篇/{{itemObj.YouShengJiFeng}}分</div>
                            </div>
                            <div class="list_row">
                                <div class="list_row_left">&nbsp;&nbsp;每个电影种子/{{itemObj.ZhongZiJiFeng}}分</div>
                                <div class="list_row_left">&nbsp;&nbsp;每篇低俗内容/{{itemObj.XiaoShuoJiFeng}}分</div>
                            </div>
                    </div>          
               </div>


           </fieldset>
            
            <fieldset class="分享 链接" v-if="取出当前数据" >
                <legend class="title">平台签到</legend>
                <div class="lianjie_box">
                      <div class="left">连续签到<span class="num">3</span>天可升至<span>{{xdw}}</span></div>
                    
                    <div class="right" @click="$router.push('/SignIn')">点击签到</div>
                </div>
           </fieldset>

             <fieldset class="分享 链接" v-if="取出当前数据">
                <legend class="title">充值比例 1:1</legend>
                <div class="lianjie_box">
                      <div class="left">充值<span class="num">100</span>元宝可升至<span>{{xdw}}</span></div>
                    <div class="right">点击充值</div>
                </div>
           </fieldset>

               <fieldset class="分享 链接">
                <legend class="title">邀请注册</legend>
                <div class="lianjie_box">
                      <div class="left">{{objdata.registe}}</div>
                    <div class="right" @click="复制()">点击复制邀请</div>
                </div>
           </fieldset>
      <!-- 
           <fieldset class="分享 链接">
                <legend class="title">邀请注册升级</legend>
                <div class=lianjie_box>
                    <div class="left"> http://67.229.173.202:9000/Appspread/registe?name=1111111111111123</div>
                                     
                    <div class="left">{{objdata.registe}}</div>

                    <div class="right" @click="复制()">复制链接</div>
                </div>
                <p class="shuom">链接分享<span class="fred">20</span>次可升级至<span>{{xdw}}</span>&nbsp;&nbsp;&nbsp;</p>
           </fieldset>    -->

           <fieldset class="分享">
               <legend class="title">分享二维码</legend>
                <div class="box">
                      <div class="left_b">
                          <p>分享网站:</p>
                         <div class="img_div">
                           <img :src="configData.api_url+'/admin/Appspread/shareUrl'" alt="">
                         </div>
                      </div>

                         <div  class="right_b">
                         <p>邀请注册:</p>
                         <div class="img_div">
                           <img :src="configData.api_url+'/admin/Appspread/registeUrl'" alt="">
                         </div>
                      </div>
                </div>
            </fieldset>
            </div>
        </div>

</template>

<script>
 import { mapState } from 'vuex' 
import { VIP广告图, VIP数据} from "@/api/VIP.js"
import {获取用户信息} from "@/api/用户信息.js"
import { Toast } from 'vant';
export default {
    data() {
        return {
             title:false,
             show:false,
             tableType:0,
             configData: config,
            active: 1,
            banner: [
                require('../../assets/img/130.jpg'),
                require('../../assets/img/131.jpg'),
                require('../../assets/img/130.jpg'),
            ],
            userinof:{
            },
            leveldata:"",//当前等级
            xdw:"",//下一段位
            objdata:{
            },
            obj:{
             baiying:{
             }   
            },
             typedata:"",
             itemObj:{},
         }
    },
        components: { // 注册组件
        },
    created() {
        this.请求banner图()
        this.获取用户信息的函数()
        this.获取VIP数据()
    },

     mounted () {
      window.addEventListener('beforeunload', e => {
      window.localStorage.removeItem('titleName')
    });
  },
    computed: {
           ...mapState({
                     个人用户信息:"userinfo",
                       取出当前数据:"是否登录",
                }),
    段位展示(){
         if(this.userinof.level=="白银"){
                return require("@/assets/img/vip/by.png") 
         }
         else if(this.userinof.level=="黄金"){
              return require("@/assets/img/vip/hj.png") 
         }
          else if(this.userinof.level=="铂金"){
            return require("@/assets/img/vip/bj.png") 
         }
         else if(this.userinof.level=="钻石"){
            return require("@/assets/img/vip/zs.png") 
         }
         else if(this.userinof.level=="星耀"){
            return require("@/assets/img/vip/xy.png") 
         }
         else if(this.userinof.level=="王者"){
            return require("@/assets/img/vip/wz.png") 
         }else{
             console.log("找不到vip图片")
             return '找不到vip图片'
         }
       }
    },
    methods: {
        查看(item,type){
            this.title=true
           console.log(item)
          this.itemObj=item
           this.typedata=type
        },
        获取VIP数据(){
            VIP数据().then(x=>{
               if(x.data.code==1){
                     this.objdata=x.data.data
                   this.obj=x.data.data.list
                   console.log( this.obj)
               }else{
                console.log("请求失败")
               }
           }).catch(err=>{
               console.log(err)
           })      
        },
        获取用户信息的函数(){
          获取用户信息().then(x=>{
              console.log(x)
              if(x.data.code==1){
                  this.userinof= x.data.data
                  this.leveldata=this.userinof.level
                         if(this.leveldata=="白银"){
                                 this.xdw="黄金"
                               // this.jjby=100
                         }else if(this.leveldata=="黄金"){
                                 this.xdw="铂金"
                               //    this.jjby=1000
                         }else if(this.leveldata=="铂金"){
                                 this.xdw="钻石"
                                //  this.jjby=10000
                         }else if(this.leveldata=="钻石"){
                                 this.xdw="星耀"
                                // this.jjby=100000
                         }else if(this.leveldata=="星耀"){
                                 this.xdw="王者"
                                //  this.jjby=1000000
                         }else if(this.leveldata=="王者"){
                                 this.xdw=""
                                //  this.jjby=10000000
                         }else{
                            console.log("晋级错误")
                         }
              }
          }).catch(err=>{
              console.log(err)
          })
        },

            请求banner图(){
            },
             tablego(index) {
            this.tableType = index
            },
         复制(){
             if(this.取出当前数据==true){
                 var text=this.objdata.registe
                this.$copyText(text).then((e) => {
                    this.$toast("复制成功")
                }, (e) => {
                    this.$toast("复制失败，请手动复制")
                })
             }else{
                 this.$toast("复制成功，登录后再邀请好友可增加元宝哟!")
             }
             
            },

            onClickLeft() {//头部
                history.back()
            },
    }
}
</script>
<style lang="scss" scoped>
.弹出层{
    position:fixed;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    z-index: 50;
    //  overflow-y:auto;
    background: rgba(0,0,0,0.6);
    padding-top:_vw(230);
    .弹出层内容{
        width: 60%;
        // height: _vw(300);
        background: #ffffff;
        margin:0px auto;
        border-radius: _vw(10);
        padding:_vw(10) _vw(20) _vw(20) _vw(20);

       h2{
           text-align: center;
            color:#3a3434;
       }
        ul{
               li{
                 line-height:_vw(30);
                 height: _vw(30);
                 border-bottom: 1px solid rgb(185, 180, 180);
                 text-align: center;
                 font-size: _vw(14);
                 color:#3a3434;
                //  background: #ec304c;
                .fred{
                    font-weight: 600;
                    margin-left: _vw(2);
                    margin-right: _vw(2);

                }
               }
           }
    }
}
.information{
   // 查看免费阅读弹出层
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    overflow-x:auto;
}


.activeDiv{
    background: #cb1c36;
    color:#ffffff!important;
}
.fred{

}
.iconvip{
    font-weight: 1000;
}
.白银{
    color:rgb(251, 246, 246);
}
.黄金{
    color:rgb(241, 227, 96);   
}
.铂金{
    color:rgb(25, 135, 238);
}
.砖石{
    color:rgb(120, 24, 184);
}
.星耀{
    color:rgb(187, 136, 8);
}
.王者{
    color:rgb(56, 1, 1);
}
/deep/.van-step--horizontal .van-step__title{
    margin-left:9px;
}
/deep/.van-icon, .van-icon-checked, .van-step__icon{
   font-size: _vw(16);
}
.information_content {
    background: #ffffff;
    padding-bottom:_vw(44);
    .top {
        height: _vw(200);
        position: relative;
        box-sizing: border-box;
       background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
        padding-top: _vw(10);
        margin-bottom: _vw(30);
        .top_top{
              padding-top:_vw(4);
               width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0px auto;
            .当前{
                color:#ffffff;
                p{
                    margin:0px;
                }
                .name_d{
                    margin:0;
                    font-size: _vw(16);
                }
                .haha {
                   display: flex;
                   align-items: center;
                   .text_baiyin{
                       font-size:_vw(14);
                   }
                   .img_box{
                       height: _vw(22);
                       width: _vw(26);
                       img{
                           width: 100%;
                           height: 100%;
                       }
                   }
                }
             }
                  .input {
                      font-size:_vw(14);
                      color:#ffffff;
                    //   display:flex;
                      .btn_top{
                            font-size:_vw(14);
                            color:#ffffff;
                            display:flex;
                            .yb_box, .jyz_box{
                            margin-right: _vw(10);
                            display: flex;
                            align-items: center;
                            .yb,.jyz{
                                width:_vw(50) ;
                                height: _vw(24);
                                border-radius: _vw(25);
                                text-align: center;
                                line-height: _vw(24);
                                background: #ffffff;
                            }
                            .yb{
                                color:#f01111;
                            }
                            .jyz{
                                color:#f01111;
                                color:rgb(138, 102, 25);
                            }
                        }
                      }
                      .费阅读数{
                          font-size:_vw(14);
                          color:#ffffff;
                          display: flex;
                          justify-content:flex-end;
                          padding-right: _vw(10);
                          padding-top:_vw(4);
                      }
             
            }
        }

       
        .轮播 {
            padding-top: _vw(20);
            width: 90%;
            margin: 0px auto;
            .ii{
                height: _vw(110);
            }
            .van-swipe {
                border-radius: _vw(10) !important;
            }
        }
    }

    .步骤条 {
        height: _vw(60);
        width: 88%;
        margin-top: _vw(200);
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .text {
            width: 16%;
            line-height: _vw(62);
            background: #ffffff;
            .iconVIP1{
                color:goldenrod;
                font-size: _vw(20)
            }
            .dengji{
                font-size: _vw(16);
            }
        }
        .right_div {
            margin-top:_vw(20);
            width:84%;
           img{
               width: 100%;
           }
        }
    }
    .分享{
        width: 80%;
        margin:0px auto;
        border: 1px solid #ec304c;
        border-radius: _vw(6);
         .title{
            color:#ec304c;
            font-size: _vw(20);
            font-weight: 600;
        }
  
        .box{
           display: flex;
           justify-content: space-between;
        justify-content: center;

        .left_b,.right_b{
            p{
                margin:0px;
                text-align: center;
                font-size: _vw(14);
                
            }
          .img_div{
            width:_vw(120);
            height:_vw(120);
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        
          }
        }
        
            // .text{
            // font-size: _vw(14);
            // padding-top:_vw(0);
            // }

        }
       

    }
    .链接{
        margin-bottom: _vw(20);
        margin-top: _vw(20);
      .lianjie_box{
           display:flex;
            justify-content:space-between;
         width: 92%;
          margin:0px auto;
          border:1px solid #ccc;
          height: _vw(30);

           .left{
            padding-left: _vw(4);
            width: _vw(195);
            line-height: _vw(30);
            font-size: _vw(14);
            overflow: hidden !important;
            flex:1;


            .num{
                color:#ec304c;
                overflow: hidden !important;
                font-size: _vw(12)
            }

          }
          .right{
            //   width: _vw(120);
              width: 35%;  
            color:#ffffff;
            text-align: center;
            line-height: _vw(30);
            background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
            font-size:_vw(14);
            
          }
      }
  
      .shuom{
          font-size: _vw(14);
          text-align: right;
      }
    }
    .规则{
      ul{
          display: flex;
          justify-content: center;
        flex-wrap: wrap;
          li{
              width:30%;
              line-height: _vw(30);
              border:1px solid #ccc;
              border-radius: _vw(4);
              font-size: _vw(14);
              margin-left: _vw(2);
              margin-right: _vw(2);
              text-align: center;
              margin-bottom: _vw(5); 
              color:#555353;
          }
      }
      .列表{
             margin-top:_vw(10);
             .div_gz{
                 border-bottom: 1px solid #7a7878;
                 line-height: _vw(30);
                 display: flex;
                 justify-content:space-between;
                 align-items: center;
                 .icon_box{
                  display: flex;
                 align-items: center;
                 }
                 div:nth-child(2),div:nth-child(3){
                      width: 38%;
                     text-align: center;
                 }
                 >div{
                
                     text-align: center;
                     font-size: _vw(14)
                 }
             }
             .额度消耗{
                 .title_ed{
                     margin:0px;
                     font-size: _vw(15);
                     line-height: _vw(30);
                     color:red;
                 }
                .list_row{
                    display:flex;
                    justify-content:space-between;
                    font-size:_vw(14);
                    border-bottom: 1px solid #7a7878;
                    line-height: _vw(30);
                     color:#555353;
                }
            }
      }
    }
    // .规则{
    //     margin-top:_vw(10);
    //  .div_gz{
    //      border-bottom: 1px solid rgb(7, 5, 5);
    //      line-height: _vw(30);
    //      display: flex;
    //      justify-content:space-between;
    //      align-items: center;
    //      div:nth-child(2),div:nth-child(3){
    //           width: 38%;
    //          text-align: center;
    //      }
    //      >div{
           
    //          text-align: center;
    //          font-size: _vw(14)
    //      }
    //  }
    //  .额度消耗{
    //      .title_ed{
    //          margin:0px;
    //          font-size: _vw(15);
    //          line-height: _vw(30);
    //          color:red;
    //      }
    //     .list_row{
    //         display:flex;
    //         justify-content:space-between;
    //         font-size:_vw(14);
    //         border-bottom: 1px solid black;
    //         line-height: _vw(30);
         
    //     }
    //  }
    // }


}
</style>