<template>
  <div class="资讯">
        <div class="title">
            <span>资讯</span>
        </div>

       <van-tabs v-model="active" animated class="资讯title">
             <van-tab  title="足球">
               <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                <ul class="ul_c">
                    <li v-for="(keey,index) in objdata.list"  @click="查看新闻详情(keey,0)">
                        <div class="left">
                            <div class="标题" >{{keey.title}}</div>
                            <div class="xiab" ><span>{{keey.author}}</span> &nbsp;| &nbsp; <span>{{keey.publish_time}}</span></div>
                        </div>
                        <div class="right"><img :src="configData.api_url+keey.thumbnail" alt=""></div>
                    </li>
                </ul>
                </van-list>
            </van-tab>
                  <van-tab  title="篮球">
                  <van-list class="ul外容器" v-model="LQloading" :offset="20" :finished="篮球finished" :finished-text="篮球objdata.total==0 ? '暂无数据' : '没有更多了'" @load="LQonLoad">
                    <ul class="ul_c">
                        <li v-for="(keey,index) in 篮球objdata.list"   @click="查看新闻详情(keey,1)">
                            <div class="left">
                                <div class="标题" >{{keey.title}}</div>
                                <div class="xiab" ><span>{{keey.author}}</span> &nbsp;| &nbsp; <span>{{keey.publish_time}}</span></div>
                            </div>
                            <div class="right"><img :src="configData.api_url+keey.thumbnail" alt=""></div>
                        </li>
                    </ul>
                </van-list>
            </van-tab>
           
     </van-tabs>
  </div>
</template>
<script>

import {新闻资讯}  from "@/api/新闻.js"
export default {
    data() {
        return {
            active:0,
            configData: config,
            currentPagerm:0,
            rowrm:8,
             loading: false,
              objdata: {
                 list:[],
                 total:-1
              },


               篮球objdata: {
                 list:[],
                 total:-1
              },
             LQloading:false,
              篮球currentPagerm:0,
              篮球rowrm:1,

          
        }
    },
    components: { // 注册组件
    },
    computed: {
        
         finished(){
            if(this.objdata.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.objdata.total<=this.objdata.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        },
              篮球finished(){
            if(this.篮球objdata.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.篮球objdata.total<=this.篮球objdata.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        }
    },
    created() {

    },
    methods: {
        查看新闻详情(item,type){
             this.$router.push("/msgParticulars?id=" + item.id +'&type=' + type);
       
        },
         onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.足球新闻数据() //再调取请求数据的函数
         },
           LQonLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发篮球")
            this. 篮球currentPagerm++//当前页数 
            this.篮球新闻数据() //再调取请求数据的函数
         },
         
            篮球新闻数据() {
            var obj = {
                 typeid:1,
                 page: this.篮球currentPagerm,//当前页数
                 row: this. 篮球rowrm,//每页返回多少行数据
            }
            新闻资讯(obj).then(x => {

             if(x.data.code==1){
                  console.log(x)
                    this.篮球objdata.list = [...this.篮球objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                    this.篮球objdata.total = x.data.data.total 
                }else{
                    this.篮球objdata.total = 0
                }
                this.LQloading=false 
            }).catch(err => {
                  this.篮球objdata.total = 0
                   this.LQloading=false
                console.log(err)
            })
        },

         足球新闻数据() {
            var obj = {
                 typeid:0,
                 page: this.currentPagerm,//当前页数
                 row: this.rowrm,//每页返回多少行数据
            }
            新闻资讯(obj).then(x => {

             if(x.data.code==1){
                  console.log(x)
                    this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total 
                }else{
                    this.objdata.total = 0
                }
                this.loading=false 
            }).catch(err => {
                  this.objdata.total = 0
                   this.loading=false
                console.log(err)
            })
        },
    },
   
}

</script>

<style lang="scss" scoped>
// ==========tab title============================

//   /deep/.van-tabs--line .van-tabs__wrap{
//      height: _vw(40) !important;
//      line-height: _vw(40) !important;

//  }
//  /deep/.van-tab{
//      line-height: _vw(40) !important;
//      font-size: _vw(16) !important;
//      height: _vw(40) !important;

//  }
//  .van-tabs__line{
//      height:_vw(3) !important;
//      padding-top:_vw(44) !important;
//  }
// ==========tab title============================
/deep/.van-tabs--line{
    padding-top:0px !important;
}
.资讯{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    // background: palevioletred;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    padding-top: _vw(44);
    background: #ffffff;
    .title{
        position: fixed;
        left: 0px;
        top:0px;
        z-index:10;
        width: 100%;
        height: _vw(44);
        background: red;
        text-align: center;
        color:#ffffff;
        line-height: _vw(44);
        font-size: _vw(18);
        font-weight: 600;
    }
    //=============固定头部栏 start=====
    /deep/.van-tabs__line{
        bottom:_vw(0);
    }
     /deep/.van-tabs__nav--line{
     box-sizing: content-box;
     padding-bottom:0px;
     position: fixed;
     height: _vw(40);
     width: 100%;
     background: #ffffff;
     z-index: 100;
     }
      //=============固定头部栏 over=====
    .资讯title{
        .ul_c{
             padding:_vw(0) _vw(10) _vw(0) _vw(10);
            li{
              padding:_vw(10) _vw(0) _vw(10) _vw(0);
              border-bottom: 1px solid #e7e2e2;
              display: flex;
              justify-content: space-between;
              .right{
                  width: _vw(100);
                  height: _vw(70);
                  margin-left: _vw(4);
                  img{
                    width: 100%;
                    height: 100%;
                  }
              }
              .left{
                  flex: 1;
                  position: relative;
                  .标题{
                      font-size: _vw(14);
                      line-height: _vw(22);
                  }
                  .xiab{
                       font-size: _vw(10);
                       color:#666;
                       position: absolute;
                       bottom: _vw(0);
                       left:_vw(0);
                       z-index:1;
                  }
              }
            }
        }
    }
}
</style>