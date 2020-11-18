<template>
    <div class="我的收藏">
        <div class="content">
           <van-nav-bar  title="我的收藏"  class="title"  left-arrow  @click-left="onClickLeft" /> 
             
          <van-tabs  @click="onClick" >
            <van-tab title="精彩视频" >
                     <div v-if="list.length<1">暂时没有收藏的数据</div>
                   
                  <div  class="ship_ul"  v-if="list.length>0">
                      <li  class="content_div" v-for="(item,index) in list"  @click="点击查看视频(item)">
                        <div class="img_box"><img  :src="configData.api_url+item.imgurl" alt=""></div>
                        <div class="p_text">
                          {{item.title}}
                        </div>
                      </li> 
                 </div>
            </van-tab>
            <van-tab title="特色漫画">
                      <div v-if="list.length<1">暂时没有收藏的数据</div>
                        <ul class="guanz_ul"  v-if="list.length>0">
                           <li  v-for="(item,index) in list">
                               <div class="img_box"><img v-on:error.once="dosomething($event)" :src="configData.api_url+item.fengmian" alt=""></div>
                               <div class="name_title">{{item.name}}</div>
                          </li>
                        </ul>
            </van-tab>
            <van-tab title="全能小说">
              <div v-if="list.length<1">暂时没有收藏的数据</div>
            <ul class="img_shu" v-if="list.length>0">   
                <li  v-for="(item,index) in list" :key="index" @click="查看小说(item)">
                    <div class="left"  ><img  v-on:error.once="dosomething($event)" :src="configData.api_url+item.fengmian" alt=""></div>
                    <div class="right">
                        <div class="book_t">{{item.name}}</div>
                        <div class="book_c" > {{item.description}}</div>
                        <div class="bottom_b">
                            <span class="ck"> 查看</span>
                        </div>
                    </div>
                    </li> 
              </ul> 
            </van-tab>
        </van-tabs>
        </div>
    </div>

</template>

<script> 
import { 收藏列表 } from "@/api/首页.js"
export default {
    data() {
        return {
          nameTitle:"",
          list:[],
           configData:config,
            mrimg:"/vdata/XiaoShuo/default.jpg",
        }
    },
    computed: {
         
    },
    created(){
    this.onClick()
    },
    methods: { 
       dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      },

    点击查看视频(item){
        this.$router.history.push("/videoContent?id="+ item.id); //点击跳转的对应地址
    },
      查看小说(item){
         this.$router.history.push("/fictionDetails?mhid="+ item.id); //点击跳转的对应地址
      },
         
            onClick(name, title,item){
               if(title=="精彩视频") {
                 this.nameTitle="video"
                 this.所有数据()
                 console.log(this.list)
               }else if(title=="特色漫画"){
                   this.nameTitle="manhua"
                 this.所有数据()
                 console.log(this.list)
               }else if(title=="全能小说"){
                   this.nameTitle="xiaoshuo"
                 this.所有数据()
                 console.log(this.list)
               }else{
                  this.nameTitle="video"
                  this.所有数据()
               }
            },
            所有数据(nameTitle){
                var obj={
                    page:1,
                    row:10,
                    class:this.nameTitle      
                }
              收藏列表(obj).then(x=>{
                  this.list=x.data.data
              }).catch(err=>{
                  console.log(err)
              })
            },
        onClickLeft() {//头部
            history.back()
         },
    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>
/deep/ .van-tabs__wrap{
  height: _vw(44);
  .van-tab{
    line-height: _vw(44);
    font-size:_vw(16);
  }
}
/deep/.van-nav-bar{
         background: #ec304c !important;  
     }
     /deep/.van-nav-bar .van-icon{
         color:#ffffff;
         color:_vw(18);

     }
     /deep/.van-nav-bar__title{
         color:_vw(18);
         color:#ffffff;
         font-size: _vw(14);
         color:#ffffff !important;  
     }
.我的收藏{
            background:#ffffff;
            position: absolute;
            width: 100%;
            height: 100%;
 .优惠{
   
  .title{
         background: #ec304c; 
         margin-bottom: none; 
         position: fixed;
         top:0px;
         left: 0px;
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
      }

      .content{
         padding-top:_vw(10);
        
        //     /deep/.van-cell__right-icon{
        //           /deep/.van-cell__left-icon, .van-cell__right-icon{
        //        line-height: _vw(40);
        //      font-size: _vw(18)
        //  }
        //    }
         
      
            /deep/.van-cell{
             line-height: _vw(40);
             font-size: _vw(14)
           }
         .li{
           margin-bottom: _vw(10);
        
         }
      }

    }
  
    .content{
        // 视频开
              
              .ship_ul{
                       display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding-top:_vw(10);

                           .content_div {
                                margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 88%;
                                    margin: 0px auto;
                                    height: _vw(100);
                                  
                                        background:rgba(0,0,0,0.2);

                                    img {
                                        width: 100%;
                                        height: 100%;
                                         object-fit:contain;
                                            
                                    }
                                }
                                .p_text {
                                    width: 88%;
                                    margin: 0px auto;
                                    color: #ff516b;
                                  overflow:hidden; //超出的文本隐藏
                                  text-overflow:ellipsis; //溢出用省略号显示
                                  white-space:nowrap;
                                    font-size: _vw(14);
                                    line-height: _vw(34);
                                }
                            }
                 }

      
        // 视频完
        //漫话开
        .guanz_ul{
                    display: flex;
                    padding-top:_vw(20);
                    // justify-content: space-around;
                    flex-wrap: wrap;
                    li{
                        margin-bottom:_vw(20);
                        width: 30%;
                        .img_box{
                        width:86%;
                        margin: 0px auto;
                        height: _vw(120);
                        img{
                        border-radius:_vw(6) !important;
                            width: 100%;
                            height: 100%;
                        }
                        }
                        .name_title{
                            width:86%;
                        margin:0px auto;
                        text-overflow:ellipsis; white-space:nowrap; overflow:hidden; 
                        }
                        // .text_bottom{
                        //     display:flex;
                        //     width:86%;
                        //     margin:0px auto;
                        //     justify-content: space-between;
                        //     .收藏{
                        //     font-size: _vw(12);                        
                        //     }
                        //     .titme{
                        //     font-size: _vw(12);
                        //     }
                        // }
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
                        font-size: _vw(14)
                        
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
                            .hong{
                                      color:red !important;
                            }
                           }
                        
                       } 
                    }
                  }
              }
         //漫话完

      
    }

    


    .ul_nav{
        margin-top:_vw(10);
        background: #ffffff;
        padding: _vw(0)  _vw(10)  _vw(0)  _vw(10);
        li:nth-last-child(1){
            border-bottom: none;
        }
        li{
            
            border-bottom:1px solid rgb(248, 246, 246);
            display: flex;
            justify-content:space-between;
        }
    }

    .btn{
        height: _vw(40);
        width:92%;
        margin: _vw(10) auto _vw(10) auto; 
        color:#ffffff;
        text-align: center;
        line-height: _vw(40);
        background: linear-gradient(135deg, #ff516b 0%,#826cfd 100%) !important;
    }

}

</style>