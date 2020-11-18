
<template>
  <div class="小说">
     <div class="title_z">
                   <div class="top_content_top">
                       <div class="left_top" @click="查看小说(lbdata[0])">
                           <div>
                                 <p  class="fred ">HOT热门推荐333</p>
                                <p class="fac">小编本期推荐</p>
                                <div class="top_img"  ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+lbdata[0].fengmian" alt=""></div>
                           </div>
                       </div>
                       <div  class="right_top">
                           <div class="right_top_top" @click="查看小说(lbdata[1])">
                              <div class="right_left">
                                  <div class="box">
                                       <p  class="fred">Good好评</p>
                                       <p class="fac">最佳阅读体验</p>
                                  </div>
                             </div> 
                              <div  class="right_right" ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+lbdata[1].fengmian" alt=""></div> 
                           </div>

                           <div class="right_bottom" @click="查看小说(lbdata[2])">
                                  <div class="right_left">
                                      <div class="box">
                                          <p  class="fred">New新书</p>
                                           <p class="fac">全网每天最新</p> 
                                      </div>                            
                             </div> 
                              <div  class="right_right" ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+lbdata[2].fengmian"  alt=""></div> 
                           </div>
                       </div>
                 </div>
       </div>

        <div class="热门推荐">
            <div class="title_div">
                <div class="fred title_e">
                    <van-icon name="hot-o" class="rm"/>
                    <span> 热门推荐</span>
                </div>
                <div class="fac"  @click="go('/fiction')">
                    <span>更多分类</span>
                    <van-icon name="arrow" class="xy"/>
                </div>
            </div>
            <ul class="img_shu" > 
                <li v-for="(item,index) in list[0].lb">
                    <div class="left"  @click="查看小说(item,list[0].title)" ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+item.fengmian" alt=""></div>
                    <div class="right">
                        <div class="book_t"  @click="查看小说(item,list[0].title)">{{item.name}}</div>
                        <div class="book_c"  @click="查看小说(item,list[0].title)"> {{item.description}}</div>
                       
                        <div class="bottom_b">
                              <span class="span_i"  @click="收藏(item)"  :class="{'hong':item.collect==1}" >
                                  <span  class="iconfont iconshoucang"  :class="{'hong':item.collect==1}"  ></span> 收藏
                               </span>
                            <span class="ck" @click="查看小说(item,list[0].title)"> 查看</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
import {小说热门,推荐小说,小说详情页} from "@/api/小说.js"
import {添加收藏,删除收藏} from "@/api/首页.js"
import {mapMutations } from "vuex";

export default {
    name: "",
    data() {
        return {
            shouchang:true,
             configData:config,
              mrimg:"/vdata/XiaoShuo/default.jpg",

                list:[
                    {
                        lb:{},
                    }
                ],
                     lbdata:[
                         {
                             fengmian:"",
                         },
                         {
                             fengmian:"",
                         },
                         {
                             fengmian:"",
                         },
                     ],
        };
    },
    computed:{
     
    },
  created() {
       this.请求所有数据()
       this.顶部推荐小说三本()
    },
     methods:{
            ...mapMutations({
              记录当前信息:"小说内容数据信息",
        }),
      dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      },
       顶部推荐小说三本(){
           推荐小说().then(x=>{
             console.log(x)
              if(x.data.code==1){
                this.lbdata=x.data.data.class[0].lb
              }else{
                console.log("请求数据失败")
            }
         }).catch(err=>{
             console.log(err)
         })
       },
         
        请求所有数据(){
           小说热门().then(x=>{
             console.log(x.data.data)
            if(x.data.code==1){
                this.list=x.data.data.class
            }else{
                console.log("请求数据失败")
            }
            }).catch(err=>{
                console.log(err)
            })
        },
           go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
       查看小说(item,type) { 
            var obj = { id: item.id, check_status:1, } //漫画唯一id ;
                小说详情页(obj).then(x => {
                    if (x.data.code == 1) {
                        if(x.data.data.usePoints!==0){
                             Toast(x.data.data.usePoints)
                        }
                         var objdata={
                            zjid:""
                        }
                        this.记录当前信息(objdata)
                      this.$router.history.push("/fictionDetails?mhid="+ item.id+'&type='+type); //点击跳转的对应地址
                    } else {
                        if(x.data.code == -9){ //== -9 代表未登录
                            Dialog.confirm({
                            title: x.data.msg,
                            message:"是否跳转到登录页",
                            className: "tanchukuang",
                            }).then(() => {
                                this.$router.push('/login?router='+ '/xiaoshuo');
                            }).catch(() => {

                            });
                        }else{
                            Toast(x.data.msg)
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
          收藏(item) {
            if(item.collect==0){
                var obj={
                    class:"xiaoshuo",
                    id:item.id
                }
                 添加收藏(obj).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                         Toast(x.data.msg);
                         item.collect=1
                    }else{
                        Toast('收藏失败111');
                    }
                }).catch(err=>{
                        Toast('收藏失败');
                    console.log(err)
                })
                
            }else{
                 var objDelete={
                    class:"xiaoshuo",
                    id:item.id
                }
                 删除收藏(objDelete).then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                          Toast(x.data.msg);
                          item.collect=0
                    }else{
                        console.log("撤销收藏失败")
                    }
                }).catch(err=>{
                  Toast('撤销收藏失败'); 
                    console.log(err)
                })
            }
              this.shouchang = !this.shouchang 
        },
    }
};
</script> 

<style lang="scss" scoped>

.fred{
   font-size: _vw(12);
   font-weight: 600;
 
}
.title_e{
    display: flex;
   align-items: center;
}
  .fac{
      font-size: _vw(12)
  }
.小说{
   background: #f0f0f0;
   padding-top: _vw(44);
   box-sizing: border-box;
  .title_z{ 
    .top_content_top{
        display:flex;
        justify-content:space-between;
        background:#ffffff;
        // margin-top:_vw(10);
        .left_top{
             border-right:1px solid #ccc;
             box-sizing: border-box;
             width:40%;
             display: flex;
             align-items: center;
             >div{
                 width: 100%;
                 margin:0 auto;
             }
       p{
           margin-top:_vw(11);
           margin-bottom:_vw(10);
       }
        .top_img{
            margin:0px auto;
            width: 80%;
            height: _vw(160);
           
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            text-align: center;
            
        }

        }
        .right_top{
             width:60%;
             padding-left:_vw(10);
            .right_top_top ,.right_bottom{
                height: 50%;
                border-bottom:1px solid #ccc;
                display: flex;
                justify-content:space-between;
                box-sizing: border-box;
                .right_left{
                    display: flex;
                    align-items: center;
                    width: 40%;
                }
                .right_right{
                  margin:_vw(10);
                    width: 60%;
                    height: _vw(140);
                     
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .right_bottom{
                border-bottom:none;
            }
            p{
            text-align: center
            }
        }
    }
  }

    .热门推荐{
              background: #ffffff;
              margin-top:_vw(10);
              .title_div{
                  display:flex;
                  justify-content:space-between;
                  align-items: center;
                  padding:_vw(0) _vw(10) _vw(0) _vw(10);
                  line-height: _vw(40);
                  font-size: _vw(15);
                  align-items: center;
                  .rm{
                   align-items: center;   
                   font-size: _vw(14);
                  }
                  .xy{
                  align-items: center;            
                  }
                  .fac{
                      display: flex;
                      align-items: center;
                  }
              }
              .img_shu{
                  li{
                      padding:_vw(0) _vw(10);
                      display:flex;
                      justify-content: space-between;
                      margin-bottom:_vw(10);
                    .left{
                      margin-right:_vw(10);
                      width: _vw(100);
                      height: _vw(120);
                   
                      img{
                          width: 100%;
                          height: 100%;
                       }
                    }
                    .right{
                       border-bottom:1px solid #f0f0f0;
                       flex:1;
                       .book_t{
                         font-weight: 600;
                         height: _vw(30);
                         line-height:_vw(30);
                         font-size: _vw(14);
                        }
                       .book_c{
                         height:_vw(60);
                         overflow:hidden;
                         text-overflow:ellipsis;
                         display:-webkit-box;
                         -webkit-line-clamp:3;
                         -webkit-box-orient:vertical;
                         font-size: _vw(14);
                        }
                        
                       .bottom_b{
                           display: flex;
                           justify-content: space-between;
                           font-size: _vw(12);
                            height: _vw(30);
                            line-height: _vw(30);
                            .ck{
                               color:#acacac;
                            }
                              .hong{
                                  color:red !important;
                            }
                           .span_i{
                             display: flex;
                             justify-content: space-between; 
                               align-items: center;
                            .iconshoucang{
                                font-size: _vw(14);
                                 color:#acacac;  
                            }  
                            .hui{

                            }
                            .hong{
                                      color:red !important;
                             }
                           }
                        
                       }    
                    }
                  }
              }
              
   }
}
</style>

