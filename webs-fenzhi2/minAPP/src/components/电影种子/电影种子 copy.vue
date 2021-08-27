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
                      @search="onSearch"
                    >
                      <div slot="action" @click="onSearch()">搜索</div>
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
                    :page-count="pageCountSQ"
                    mode="simple" 
                    :change="搜索当页码改变时()"
                  />

                </div>
            </div>



            <div class="video_content" v-if="默认热门">

             <div class="btn_group">
                 <div class="max_box"  v-for="(item,index) in listTitle"   :class="{djactive:当前选中 == item}"  @click="点击(item,index)" :key="index">{{item}}</div>
              </div>

              <div class="wrap">
                 <div  class="ul">
                     <div class="li"  v-for="(item,index) in objList.list" @click="点击查看种子详情(item,当前选中)">
                         <div class="地址">{{item.name}}</div>
                         <div class="neirong">
                           <span class="text_sm">文件大小：</span>  <span class="fd_zd">{{item.num_files}}</span>
                           <span  class="text_sm">文件数量：</span>  <span class="fd_zd">{{item.size}}</span>
                          </div>
                     </div>
                      
                     
                      <van-pagination 
                      class="定位"
                      v-model="currentPage" 
                      :page-count="pageCount"
                      mode="simple" 
                      @change="当页码改变时()"
                    />
                </div>
              </div>
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

            indexs: 0,
            currentPage:1,//当前页数
             row:1,//每页返回多少行数据
             pageCount:0,//总页数

             pageCounSQ:0,//总页数 
             currentPageSQ:1,//当前页数
             rowSQ:1,//每页返回多少行数据

             当前选中:{},
             默认热门:true,

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
          当页码改变时(){ 
             this.请求所有数据的函数()
          },
            搜索当页码改变时(){ 
             this.onSearch()
          },
          返回热门(){
            this.默认热门=true
          },
          请求所有数据的函数(){
              电影种子分类数据().then(x=>{ 
                   if(x.data.code==1){
                        this.listTitle=x.data.data
                       this.当前选中 = this.listTitle[0]
                        var obj={
                            page:this.currentPage,//当前页数
                            row:this.row,//每页返回多少行数据\
                            class:this.listTitle[0]
                        }
                         电影种子(obj).then(x=>{
                             if(x.data.code==1){
                              this.pageCount=x.data.data.total
                                   this.objList=x.data.data
                                }
                            }).catch(err=>{
                                
                            })
                   }else{
                     console.log('请求失败')
                   }
              }).catch(err=>{
                 console.log(err)
              })
          },
         
          点击(item,index){ //对应类型的数据
             this.当前选中=item
             var obj={
                page:this.currentPageSQ,//当前页数
                row:this.rowSQ,//每页返回多少行数据
                class:item
            }
                电影种子(obj).then(x=>{
                  if(x.data.code==1){
                  this.objList=x.data.data
                  this.pageCount=x.data.data.total
                  }
                }).catch(err=>{
                  console.log(err)
                })
          },
        onSearch(){
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
           Toast('请输入查找的类型');
        }
           
        },
          
        
    },
}

</script>
<style lang="scss" scoped>
// =======================公用样式开始============================
            .ul_ss{
              padding-top:_vw(145);
            }
              .ul{
              padding-top:_vw(170);
            }
            .ul,.ul_ss{
                      padding-left: _vw(16);
                      padding-right: _vw(16);
                      box-sizing: border-box;
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
                    }


// =======================公用样式结束============================
//=========================激活样式=====================
.djactive{
  background: #ce1e38;
  color:#ffffff !important;
  border:none;
}





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