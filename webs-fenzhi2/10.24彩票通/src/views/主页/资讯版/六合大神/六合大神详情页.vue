<template>
<div class="详情页">
    <!-- {{大神区分}} -->
    <div class="六合大神详情页" >
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>        
        
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">{{大神区分.title}}</span>
            <span class="sqzj">&nbsp;</span>
        </div>
        
          <div class="contnt" >

           <div class="搜索">
               <div class="ss_div">
                   <van-search
                    v-model="value"
                    placeholder="搜索：人名"
                    show-action
                    shape="round"
                    @search="onSearch"
                    background="#ebebeb"
                    >
                    <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
               </div>
           </div>
           <ul>    
              <li v-for="(items,index) in 大神区分.list" @click="查看个人详情(items)">
                   <div class="left">
                        <div class="panm"  v-if="index!==0 && index!==1 && index!==2 ">NO.{{index+1}}</div>
                        <div class="img_box" v-if="index==0"><img src="@/assets/img/lhds/rank1.c037057.png" alt=""> </div>
                        <div class="img_box" v-if="index==1"><img src="@/assets/img/lhds/rank2.0acc89d.png" alt=""> </div>
                        <div class="img_box" v-if="index==2"><img src="@/assets/img/lhds/rank3.7aba0e2.png" alt=""> </div>
                   </div>
                   <div class="C_content">
                       <div class="left_l" v-if="items.tximg"><img :src="items.tximg" alt=""></div>
                       <div class="left_l" v-if="!items.tximg"><img src="@/assets/img/lhds/girl.c5b1ff4.jpg" alt=""></div>
                       <div class="right_l">
                           <div class="top">
                                   <p>{{items.name}}</p>
                                   <p>粉丝：{{items.fens}}</p>
                           </div>
                           <div class="bottom">
                               <div class="box">{{items.jzj}}</div>
                               <div class="box_right">最大连中{{items.maxlzq}}期</div>
                           </div>
                       </div>
                    </div>   
                   <div class="right">
                       <p class="">{{items.sl}}</p>
                       <p>胜率</p>
                  </div>       
               </li>
           </ul>
        </div>

<!-- 
        <div class="contnt" >
           <div class="搜索">
               <div class="ss_div">
                   <van-search
                    v-model="value"
                    placeholder="搜索：人名"
                    show-action
                    shape="round"
                    @search="onSearch"
                    background="#ebebeb"
                    >
                    <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
               </div>
           </div>
           <ul>
               <li>
                   <div class="left">
                         <div class="img_box"><img src="@/assets/img/lhds/rank1.c037057.png" alt=""> </div>
                   </div>
                   <div class="C_content">
                       <div class="left_l"><img src="@/assets/img/lhds/100.jpg" alt=""></div>
                       <div class="right_l">
                           <div class="top">
                                   <p>庄狂神王</p>
                                   <p>粉丝：32</p>
                           </div>
                           <div class="bottom">
                               <div class="box">8中8</div>
                               <div class="box_right">最大连中4期</div>
                           </div>
                       </div>
                    </div>   
                   <div class="right">
                       <p class="">100%</p>
                       <p>胜率</p>
                  </div>       
               </li>
           </ul>
        </div> -->
    </div>
</div>

</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            title:'',
            value:"",
            id:"",
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            },
            六合大神:{
                 zhdsb:{
                    title:"综合大神榜",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),//头像
                            name:"特特特丰",//名字
                            maxlzq:"5",//最大连中
                            jzj:"5中4",//几中几
                            fens:"226",//粉丝
                            sl:"100%",//胜率白分比
                            id:101
                        },
                        {
                            tximg:"",
                            name:"庄狂神王",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:102
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"牛一",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:103
                        },
                         {
                            tximg:"",
                            name:"王中王",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:104
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"哈哈哈",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:105
                        }
                    ]
                  },
                  tmzq:{
                    title:"特码专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:201
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:202
                        }
                    ]
                },



                 txzq:{
                    title:"特肖专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:301
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:302
                        }
                    ]
                },
                 pmzq:{
                    title:"平码专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:401
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:402
                        }
                    ]
                },
                 ptyx:{
                    title:"平特一肖",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:501
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:502
                        }
                    ]
                },
                 ptlx:{
                    title:"平特连肖",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:601
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:602
                        }
                    ]
                },
                 lxzq:{
                    title:"六肖专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:701
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:702
                        }
                    ]
                },
                 bzzq:{
                    title:"不中专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:801
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:802
                        }
                    ]
                },
                jszq:{
                    title:"绝杀专区",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:901
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:902
                        }
                    ]
                },
                 gssh:{
                    title:"公式杀号",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1001
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1002
                        }
                    ]
                },
                 gsgl:{
                    title:"公式规律",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1101
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1202
                        }
                    ]
                },
                 jqdx:{
                    title:"家禽大小",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1301
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1402
                        }
                    ]
                },
                 yqjh:{
                    title:"赢钱计划",
                    list:[
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"缘起缘灭",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1501
                        },
                        {
                            tximg:require("@/assets/img/lhds/100.jpg"),
                            name:"一炮见红",
                            maxlzq:"5",
                            jzj:"5中4",
                            fens:"226",
                            sl:"100%",
                            id:1502
                        }
                    ]
                },
            }
            
        }
    },
    components: { // 注册组件
        
    },
    created() {
    this.id=this.$route.query.id
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
        大神区分(){
            if(this.id=='zhdsb'){
                 return this.六合大神.zhdsb
            }else if(this.id=='tmzq'){
                return this.六合大神.tmzq
            }else if(this.id=='txzq'){
                return this.六合大神.txzq
            }else if(this.id=='pmzq'){
                return this.六合大神.pmzq
            }else if(this.id=='ptyx'){
                return this.六合大神.ptyx
            }else if(this.id=='ptlx'){
                return this.六合大神.ptlx
            }else if(this.id=='lxzq'){
                return this.六合大神.lxzq
            }else if(this.id=='bzzq'){
                return this.六合大神.bzzq
            }else if(this.id=='jszq'){
                return this.六合大神.jszq
            }else if(this.id=='gssh'){
                return this.六合大神.gssh
            }else if(this.id=='gsgl'){
                return this.六合大神.gsgl
            }else if(this.id=='jqdx'){
                return this.六合大神.jqdx
            }else if(this.id=='yqjh'){
                return this.六合大神.yqjh
            }else{
                console.log("头部判断错误")
            }
        }
    },
    methods:{
    onSearch(){
        
            var inpval=this.value
             var obj = this.大神区分.list.find(x => x.name == inpval)
             
             if(obj){
               this.大神区分.list=[]
                  this.大神区分.list.push(obj)
                 console.log(obj)
             }else{
                 console.log("亲，请到其他类别搜索")
             }
    },
    查看个人详情(items){
          var idren=items.id
           this.$router.push("/particulars?id="+ idren);

    },
    titleText(){
            },
            返回() {//头部
                history.back()
            },
        
        }
        
    }


</script>
<style lang="scss" scoped>

p{
    margin:0px;
}
.六合大神详情页{
      .投注{
        width: _vw(47);
       height: _vw(47);
       border-radius: 50%;
         position: fixed;
       top:_vw(120);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
     
       .div_top {
        position: fixed ;

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
      .contnt{
          padding-top:_vw(35);
          .搜索{
              background: #ebebeb;
              padding:_vw(10) 0px;
            .ss_div{
              width: 90%;
              margin:0px auto;
              .van-search{
                  padding:0px;
                  .van-search__content {
                      background: #ffffff;
                  }
              }
             
            }
          }
          ul{
              li{
                  border-bottom: 1px solid #ebebeb;
                  padding:_vw(10);
                  width: 100%;
                  display:flex; 
                  align-items: center;
                  .left{
                      width: 10%;
                      font-size: _vw(13);
                    //   font-weight: 500;
                      .panm{
                        //   font-size: _VW(10) !important;
                        //   color:red;
                      }
                    .img_box{
                      width: _vw(30);
                      height: _vw(30);
                      margin-right: _vw(20);
                      img{
                        width: 100%;
                        height: 100%;
                      }
                  }

                  }
                  
                  .C_content{
                     flex:1;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      .left_l{
                          width: _vw(60);
                          border-radius: 50%;
                          height: _vw(60);
                        img{
                          width: 100%;
                          height: 100%;
                          border-radius: 50%
                        }
                      }
                      .right_l{
                          flex:1;
                          padding:_vw(0) _vw(20) _vw(0) _vw(12);
                        box-sizing: border-box;
                          .top{
                               display: flex;
                              justify-content: space-between;
                            margin:_vw(6) _vw(0);
                                p:nth-child(1){
                                    font-size: _vw(16);
                                }
                            p:nth-child(2){
                                font-size: _vw(12);
                                color:#999999;
                            }
                          }
                          .bottom{
                               display: flex;
                               align-items: center;  
                               margin:_vw(6) _vw(0);
                               .box{
                                   width: _vw(38);
                                   height: _vw(15);
                                   text-align: center;
                                   font-size: _vw(12);
                                   color:#ffffff;
                                   line-height: _vw(15);
                                   background: #c01833;
                                   margin-right: _vw(10);
                               }  
                               .box_right{
                                   font-size: _vw(12);
                                   color:#999999;
                               }   


                          }
                      }
                  }
                  .right{
                      width: 16%;
                      p:nth-child(1){
                          font-size: _vw(15);
                          color:red;
                      }
                       p:nth-child(2){
                          font-size: _vw(12);
                      }

                  }
              }
          }
      }
   
}
</style>