<template>
<div class="video_box">
         
                 <div class="c_c">
                   <div  v-if="默认热门"  class="icon" @click="返回热门()"><span class="iconfont iconremen1"></span>热门</div>
                    <div   v-if="!默认热门" class="icon" @click="返回热门()">返回热门</div>
                   <div class="ss_box">
                      <van-search
                      class="shurk"
                      v-model="valueSQ"
                      placeholder="请输入搜索关键词"
                      show-action
                      shape="round"
                    >
                      <!-- @search="onSearch" -->

                      <div slot="action" @click="查找(valueSQ,'ss')">搜索</div>
                    </van-search>
                  </div>
                 </div>
                
                 
            <div v-if="!默认热门">
                <div  class="ul_ss">
                     <div class="li"  v-for="(item,index) in objCZ.list" @click="点击查看种子详情(item,valueSQ)">
                         <div class="地址">{{item.name}}</div>
                         <div class="neirong">
                           <span class="text_sm">文件大小：</span>  <span class="fd_zd">{{item.num_files}}</span>
                           <span  class="text_sm">文件数量：</span>  <span class="fd_zd">{{item.size}}</span>
                          </div>
                     </div>
                      
                      <van-pagination 
                    class="定位"
                    v-model="currentPage" 
                    :total-items="pageCountSQrm"  
                    mode="simple" 
                    @change="ss"
                  />

                </div>
            </div>



            <div class="video_content" v-if="默认热门">

              <div class="btn_group">
                  <div class="max_box"  v-for="(item,index) in listTitle"   @click="查找(item,'rm')" :key="index">{{item}}</div>
                </div>

                <van-pagination 
                    v-if="pageCountSQrm>0"
                    class="定位"
                    v-model="currentPagerm" 
                    :total-items="pageCountSQrm"  
                    mode="simple" 
                    @change="rm"
                  />


            </div>
</div>
</template>  

<script>
import { Toast } from 'vant'
import {电影种子分类数据,电影种子} from "@/api/电影种子.js"
 export default {
    data() {
        return {
            listTitle:[],
            configData:config,
            valueSQ:"",//搜索内容
            objList:{},
            objCZ:{},//根据搜索查找出来的obj

             currentPage:1,//当前页数   
             row:3,//每页返回多少行数据
             pageCountSQ:0,//总页数 

                currentPagerm:1,//当前页数   
             rowrm:3,//每页返回多少行数据
             pageCountSQrm:0,//总页数 
             当前选中:{},
             默认热门:true,

             itemdata:"",

        }
    },
   
    created() {
        this.请求所有数据的函数()
    },
    computed: {

    },
      methods: { 
      
        点击查看种子详情(item,type){
              this.$router.history.push("/filmSeed?id="+ item.id +"&type="+type); //点击跳转的对应地址
        },
          // 当页码改变时(){ 
          //    this.请求所有数据的函数()
          // },
            ss(){ 
              console.log(this.currentPage)
              this.查找(this.valueSQ,'ss')
          },
               rm(){ 
              console.log(this.currentPagerm)

              this.查找(this.itemdata,'rm')
          },
          返回热门(){
            this.valueSQ="",
            this.默认热门=true
          },
          请求所有数据的函数(){
              电影种子分类数据().then(x=>{ 
                   if(x.data.code==1){
                        this.listTitle=x.data.data
                       this.当前选中 = this.listTitle[0]
                     
                   }else{
                     console.log('请求失败')
                   }
              }).catch(err=>{
                 console.log(err)
              })
          },
         
          // 点击(item,index){ //对应类型的数据
          //       var obj={
          //       page:this.currentPage,//当前页数
          //       row:this.row,//每页返回多少行数据
          //       class:item
          //   }
          //     电影种子(obj).then(x=>{
          //            if(x.data.code==1){
          //              if(x.data.data.list.length>1 ||  x.data.data.list.length==1){
          //                    this.默认热门=false
          //                    this.objCZ=x.data.data
          //                   this.pageCountSQ=x.data.data.total
          //              } else{
          //                Toast('未查找到该类型的数据');
          //              }
          //            }else{
          //              console.log("请求失败")
          //            }
          //       }).catch(err=>{
          //         console.log(err)
          //       })
            
          // },
        查找(item,type){

          if(type=="rm"){
          this.itemdata=item
           
          console.log(type)
              var obj={
                page:this.currentPagerm,//当前页数
                row:this.rowrm,//每页返回多少行数据
                class:this.item
            }
             电影种子(obj).then(x=>{
                     if(x.data.code==1){
                       if(x.data.data.list.length>1 ||  x.data.data.list.length==1){
                             this.objCZ=x.data.data
                            this.pageCountSQrm=x.data.data.total
                       } else{
                         Toast('未查找到该类型的数据');
                       }
                     
                     }else{
                       console.log("请求失败")
                     }
                }).catch(err=>{
                  console.log(err)
                })
          }else if(type=="ss"){
          console.log(type)
           if(this.valueSQ){
            var obj={
                page:this.currentPage,//当前页数
                row:this.row,//每页返回多少行数据
                class:this.valueSQ
            }
                电影种子(obj).then(x=>{
                     if(x.data.code==1){
                       if(x.data.data.list.length>1 ||  x.data.data.list.length==1){
                             this.默认热门=false
                             this.objCZ=x.data.data
                            this.pageCountSQ=x.data.data.total

                       } else{
                         Toast('未查找到该类型的数据');
                       }
                     
                     }else{
                       console.log("请求失败")
                     }
                }).catch(err=>{
                  console.log(err)
                })
        }else{
           Toast('请输入查找的类型44');
        }
           
          }else{
            console.log("不是搜索点击去的也不是热门点进去的")
          }
       
           
        },
          
        
    },
}

</script>
<style lang="scss" scoped>
// =======================公用样式开始============================
       
          .ul_ss{
                      padding-left: _vw(16);
                      padding-right: _vw(16);
                      box-sizing: border-box;
                       padding-top:_vw(130);

                      .li{
                        
                          border-bottom: 1px solid #dad7d7;
                           font-size: _vw(14);
                          //  overflow-x: hidden;
                           .地址{
                             font-size:_vw(15);
                             line-height: _vw(30);
                             width: 100%;
                              word-wrap:break-word;
                              word-break:break-all;                         
                             height: auto;

                            //  height: 300px;
                           }
                           .neirong{
                             display: flex;
                             justify-content:flex-end;
                             margin-bottom: _vw(5);
                             .text_sm{
                           color:#797676;

                               font-size: _vw(12);
                               margin-left: _vw(10);
                             }
                             .fd_zd{
                                 font-size: _vw(12);
                                   color:red;
                               font-weight: 600;
                             }
                           }
                      }
                    }

                    .定位{
                      position: fixed;
                      left: 0px;
                      bottom: 54px;
                      width: 100%;
                      background: #dad7d7;
                    }


// =======================公用样式结束============================
//=========================激活样式=====================
// .djactive{
//   background: #ce1e38;
//   color:#ffffff !important;
//   border:none;
// }





.video_box{
  position: absolute;
   left: 0;
   top:0;
   height: 100%;
    width: 100%;
         .c_c{
              display: flex;
                position: fixed;
                top:_vw(44);
                height: _vw(50);
                width: 100%;
                z-index:2;
                display:flex;
                justify-content:space-between;
                align-items: center;
               .icon{
                 width: 20%;
                 line-height: _vw(50);
                 padding-left: _vw(10);
                 box-sizing: border-box;
                 color:red;
                 .iconremen1{
                   font-size: _vw(18);
                 }
               } 
            .ss_box{ 
              width: 80%;
                /deep/.van-search__content--round{
                  border:1px solid #acacac;

                }
              .shurk{
                width: 100%;
                margin:0px auto;
                // border:1px solid red;
              }
            }
       }
        .video_content{
        
           padding-top:_vw(10);
                  .btn_group{
                   display: flex;
                  flex-wrap: wrap;
                  box-sizing: border-box;
                  top:_vw(110);
                  position: fixed;
                  width: 100%;
                    background: #ffffff;
                   z-index:2;
                   .max_box{
                     border-radius: _vw(35);
                      padding-left: _vw(10);
                      padding-right: _vw(10);
                      box-sizing: border-box;
                      margin:_vw(5);
                      line-height: _vw(30);
                      border:1px solid #e9e3e3;
                      // text-align: center;
                      color:#797676;
                      font-size: _vw(14);
                 
                  }

                  }
                  .wrap{
                     
   
                  } 
     }

   
    }
</style>