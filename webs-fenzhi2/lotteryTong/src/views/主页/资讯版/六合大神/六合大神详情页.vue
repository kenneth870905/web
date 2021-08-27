<template>
    <div class="六合大神详情页">
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>        
        
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">{{title}}</span>
            <span class="sqzj">&nbsp;</span>
        </div>

        <div class="contnt">
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
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
             
            }
        }
    },
    components: { // 注册组件
        
    },
    created() {
      this.titleText()
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
    onSearch(){
         alert(1)
    },
    titleText(){
            var id=this.$route.query.id
            if(id=='zhdsb'){
                this.title="综合大神榜"
                return
            }else if(id=='tmzq'){
                this.title="特码专区"
                return
            }else if(id=='txzq'){
                this.title="特肖专区"
            }else if(id=='pmzq'){
                this.title="平码专区"
            }else if(id=='ptyx'){
                this.title="平特一肖"
            }else if(id=='ptlx'){
                this.title="平特连肖"
            }else if(id=='lxzq'){
                this.title="六肖专区"
            }else if(id=='bzzq'){
                this.title="不中专区"
            }else if(id=='jszq'){
                this.title="绝杀专区"
            }else if(id=='gssh'){
                this.title="公式杀号"
            }else if(id=='gssh'){
                this.title="公式规律"
            }else if(id=='jqdx'){
                this.title="家禽大小"
            }else if(id=='yqjh'){
                this.title="赢钱计划"
            }else if(id=='lhtk'){
                this.title="六合图库"
            }else{
                console.log("头部判断错误")
            }

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
                    //   background:red;
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
                        //   background: red;
                        box-sizing: border-box;
                          .top{
                               display: flex;
                              justify-content: space-between;
                            //    line-height: _vw(40);
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
                                   background: #ebebeb;
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
                        //   color:#999999;
                      }

                  }
              }
          }
      }
   
}
</style>