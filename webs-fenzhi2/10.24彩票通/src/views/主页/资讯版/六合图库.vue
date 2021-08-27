<template>
    <div class="六合图库">
          <!-- 放大组件 -->
           <BigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></BigImg>
          <!-- 返回按钮 -->
         <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">六合图库</span>
            <span class="sqzj">&nbsp;</span>
        </div>
        
        <!-- 投注 -->
      <div class="投注"  @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>


         <!-- 投票弹出框 -->
        <div v-if="shouTP" >
           <div class="投票弹出框" v-for="(item,index) in list" v-if="indexs == index" :key="index">
               <div class="top_qihao" >{{item.期号}}<van-icon name="cross" @click="shouTP=false" class="cross" /></div>
               <ul class="tc_ul">
                   <li  v-for="(item1,index) in item.生肖">
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
        <div class="content">
            <!-- 内容左边的 -->
              <ul class="left_ul">
                 <li v-for="(item,index) in list"  :class="{active:(indexs==index)}" v-on:click="a(index)" :key="index">{{item.name}}</li>
             </ul>
             <!-- 内容的 -->
               <div class="right_div" v-for="(item,index) in list" v-if="indexs == index" :key="index">
             
                 <div class="期数">
                        <div class="btn_q" @click="上一期(item)">上一期</div>
                        <div class="dangqian_q">{{item.期号}}期</div>
                        <div class="btn_q"  v-show="outyia" @click="下一期(item)">下一期</div>
                 </div>
                  <!-- 没有AB面 -->
                    <div class="div_img" v-if="item.typeAB==0" @click="clickImg(imgurl)"><img :src="imgurl" alt=""></div>
                  <!-- 有AB面 -->
                    <div class="图片切换"  v-if="item.typeAB==1">
                        <div class="btn_box">
                            <div class="left_btn"  @click="clicktite(0)"  :class="{'titleActive':tableType ==0}">A</div>
                            <div class="right_btn"  @click="clicktite(1)"  :class="{'titleActive':tableType ==1}">B</div>
                        </div>

                        <div >
                            <div class="div_img"  v-if="tableType==0"><img src="@/assets/img/lhds/dbfd858b-404c-48a2-96a9-057780d161c4.jpg" alt=""></div>
                            <div class="div_img" v-if="tableType==1"><img src="@/assets/img/lhds/219e869d-3356-4e66-a3bd-b18201415264.jpg" alt=""></div>
                        </div>

                    </div>

                 
               
                <!-- 投票进度条 -->
                <ul class="票数">
                   <li v-for="(item1,index) in item.生肖">
                        <div class="type_T">{{item1.type}}</div>
                        <div class="jd"> <van-progress :show-pivot="false" color="#f44" :percentage="item1.num/10" /></div>
                        <div class="num">{{item1.num}}</div>
                   </li>
                </ul>                  
                <div class="投票按钮" @click="投票()">投票</div>

                   <!-- 评论区 -->
                  <div class="评论区">
                      <div class="title">
                          <div class="text">评论区</div>
                      </div>
                      <ul class="pl_ul">
                          <li  v-for="(item2,index55) in item.评论">
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

                  <!-- input评论框 -->
                 <div class="评论" :style="{'background':皮肤区分.topbj}">
                    <div class="input" >
                        <div class="left_input">
                            <van-cell-group>
                            <van-field :maxlength="25" v-model="value" placeholder="请输入评论内容，25字以内" />
                            </van-cell-group>
                        </div>
                        <div class="right" @click="评论(item)">评论</div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</template>
<script>
import BigImg from '@/components/imgmax.vue'
import { mapState } from 'vuex'
import { Toast } from 'vant';
export default {
    data() {  
        return {
              btn: ['按钮1','按钮2','按钮3'],
            box: { aa: "tab切换1", bb: "tab切换2", cc: "tab切换3" },
            indexs: 0,
            outyia:false,//控制下一期按钮的显示与隐藏
            add:50,
            shouTP:false,
            tableType:0,
            value:"",//input框的值
            showImg:false,
             xzObj:{
                 img:"",
                 imgShow:"",
                 num:"",
                 type:"",
             },//投票弹框选中的对象
            imgurl:require("@/assets/img/lhds/219e869d-3356-4e66-a3bd-b18201415264.jpg"),
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            },
           list:[],
        }
    },
        components: { BigImg },

   
    created() {
           this.axios.get('webConfig/lhtk.json').then(x => { 
            this.list=x.data 
            console.log(this.list)
            //lhtk.json里字段说明说明  typeAB:：0 表没有AB面2张图    typeAB:：0 表有AB面2张图
           })
    
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
         tick() {//获取当前时间函数
            var date = new Date();
            this.year = date.getFullYear();
            var monthnum = date.getMonth() + 1;
            this.month = monthnum < 10 ? "0" + monthnum : monthnum;
            this.date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            this.hour =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            this.minute =
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var currentTime = this.year + "-" + this.month + "-" + this.date + "  " + this.hour + ":" + this.minute + ":" + this.second;
            return currentTime;
        },
        提交(){//投票弹框提交的函数
        this.shouTP=false
        if(this.xzObj.imgShow==true){
            Toast.success('投票成功');
             console.log(this.xzObj) //把数据发给后端
        }else{
             Toast.fail('投票失败');
        }     
        },
        评论(){
             var obj={
                name:"李寻欢bab",
                time:this.tick(),
               text:this.value
              }
              item.评论.unshift(obj)
              this.value=""
        },
        clickImg(imgurl) {
            this.showImg = true;
            // 获取当前图片地址
            // console.log(item1)
            this.imgSrc = imgurl
        },
            viewImg() {
            this.showImg = false;
        },
          投票(){
            this.shouTP=true
            },
        format(percentage) {
             return percentage
        },
        clicktite(index) {
            this.tableType = index
        },
         a(str) {
            this.indexs = str;
        },
        返回() {//头部
            history.back()
        },
        选中(item1){
            // console.log(item1)
            this.xzObj=item1
            //   this.$set(item1, 'imgShow', !item1.imgShow)
            this.list.forEach(x=>{
                x.生肖.forEach(y=>{
                    if(y!=item1){
                        // y.imgShow=false
                        this.$set(y,'imgShow',false)
                    }else{
                        // y.imgShow=true
                        this.$set(y,'imgShow',true)
                    }
                })
            })
            //   for(var i=0; i<=this.list.lengt; i++){
            //       var obj=this.list[i]
            //         for(var j=0; j<=obj.生肖.lengt; i++){
            //             if(obj.生肖[j]!=item1){
            //                 obj.生肖[i].imgShow=true
            //             }else{
            //                 obj.生肖[i].imgShow=false
            //             }
            //         }
            //   }
          
        },
        上一期(item){
            this.outyia=true
        },
         下一期(item){
            alert("点击下一期触发的函数")
        },
     
    }
    
}


</script>
<style lang="scss" scoped>
.titleActive{
    color:red;
    background-color: #c9a356 !important;
    color: #fff !important;
    height:_vw(40) !important;
}
.active{
  background: #ffffff !important;
  color:red;
  font-weight: 800;
 
}
.六合图库{
    position: absolute;
    left:0px;
    right:0px;
    height: 100%;
    .投票弹出框{
        position: absolute;
            left:0px;
            right:0px;
            height: 100%;
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

  .投注{
        width: _vw(47);
       height: _vw(47);
       border-radius: 50%;
         position: fixed;
       top:_vw(140);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
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
    .content{
     padding-top:_vw(35);
     box-sizing: border-box;

     height: 100%;
     display:flex;
     .left_ul{
       height: 100%;
         overflow :auto;
         width:_vw(109);
         li{
             height:_vw(40);
             background: rgba(0,0,0,.6);
             text-align: center;
             line-height: _vw(40);
             box-shadow: 0 1px 0 0 #ddd;
             background: #e0e0e0;
             font-size: _vw(12);
         }
     }
     .right_div{
         overflow :auto;

         flex:1;
         height: 100%;
         padding: _vw(10)  _vw(10)  _vw(50)  _vw(10);
         box-sizing: border-box;
         .期数{
             display: flex;
             justify-content: space-between;
             align-items: center;
             .btn_q{
                 border:1px solid #c9a356;
                 text-align: center;
                 line-height: _vw(23);
                 width: _vw(65);
                 font-size: _vw(14);
                 border-radius: _vw(6);
                 color:#c9a356;
             }
            
             .dangqian_q{
                //  padding-left:_vw(30);
                 font-size: _vw(14);
             }
         }
         .图片切换{
             margin:_vw(10) _vw(0) _vw(10) _vw(0);
             .btn_box{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 width: 100%;
                 margin-bottom:_vw(10);
                 .left_btn,.right_btn{
                  width: 50%;
                  height: _VW(30);
                  line-height: _vw(30);
                  text-align: center;
                  background-color: #ddd;
                 }
             }
         }

         .div_img{
                width: 100%;
                max-height: _vw(340);
                margin-top:_vw(10);
             img{
                width: 100%;
                height: 100%;
             }
                 
         }

         .票数{
               width: 100%;
                display: flex;
               align-items: center;
               flex-wrap: wrap;
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