<template>
   <div class="低俗内容">
        <div class="搜索">
            <span class="返回" v-if="返回" @click="返回主页()">返回</span>
            <div class="搜索框">
                <van-search
                        v-model="valuess"
                        placeholder="请输入搜索关键词"
                        show-action
                        shape="round"
                        class="搜索"
                        >
                 <div slot="action" @click="搜索()">搜索</div>
                </van-search>
            </div>        
       </div> 

       <van-list v-model="loading"  :offset="20"  :finished="finished" finished-text="没有更多了"  :finished-text="obj.total==0 ? '暂无数据' : '没有更多了'"  @load="onLoad"  >
         <ul>
            <li v-for="(item,index) in obj.list">
                
                <div class="left">{{item.title}}</div>                
                <div class="right" @click="点击查看详情(item)"><img   v-lazy="configData.api_url+url+item.jpg[0]"   :src="configData.api_url+obj.url+item.jpg[0]" alt=""></div>

                 <div class="t_t">
                    <div class="t_L">来直:韩国</div>
                    <div class="t_r">2019-1217</div>
                </div>
            </li>
        </ul>
     </van-list>
      


           <!-- <van-pagination class="定位" v-model="currentPage" :page-count="pageCount" mode="simple" :items-per-page="1" @change="当页码改变时()" v-if="pageCount>1" /> -->
    </div>
</template>  

<script>
 import {低俗内容分类数据} from "@/api/低俗内容.js"
import { Toast } from 'vant'

 export default {
    data() {
        return {
            currentPagerm: 0,//当前页数
            rowrm: 5,//每页返回多少行数据
            // pageCountSQrm: 0,
            obj: {
                list:[],
                total:-1
            },
            loading: false,
           url:"",



            configData:config,
             currentPage:1,//当前页数
             row:10,//每页显示多少行数据
             pageCount:"",//总页数
             valuess:"",
             返回:false,
             obj:{
                 list:[],
             },
             name:"",
        }
    },
   
    created() {
    //  this.默认请求所有数据()  
    },
    computed: {
          finished(){
            if(this.obj.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.obj.total<=this.obj.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        }
    },
      methods: {
           onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.获取数据() //再调取请求数据的函数
        },



          返回主页(){
             this.获取数据()  
             this.返回=false
          },

          点击查看详情(item){
            this.$router.history.push("/vulgar?id=" + item.id ); //点击跳转的对应地址   
          },

          默认请求所有数据(){
            this.name=""
            this.获取数据()
          },
          搜索(){
             var valuedata=this.valuess
              if(this.valuess){
                 this.name=valuedata
                 this.获取数据()
              }else{
                Toast('请输入查找的内容');
              }
          },
        获取数据(){
              var obj={
                  page:this.currentPage, //当前页
                  row:this.row,//每页显示多少行数据
                  class:this.name
              }
               低俗内容分类数据(obj).then(x=>{
                 if(x.data.code==1){
                        if(x.data.data.total!==0){
                            console.log(x)
                            this.obj.list = [...this.obj.list , ...x.data.data.list];// x.data.data.list持续加加 
                            this.obj.total = x.data.data.total 
                            this.url=x.data.data.url
                        }else{
                            this.obj.total = 0
                           Toast('未查找到相关数据');
                        }
                    }else{
                        this.obj.total = 0
                    }
                    this.loading=false

              }).catch(err=>{
                    console.log(err)
                     this.obj.total = 0
                      this.loading=false
              })
        },
    },
}

</script>
<style lang="scss" scoped>
/deep/.left ul{
        padding:0px  !important;
}
 .定位{
      
        width: 100%;
        background:rgb(248, 245, 245);
        margin-bottom: _vw(44);
        padding:0px;

    }
    /deep/.低俗内容 ul[data-v-6146db6f]{
        padding:0px;
    }
.低俗内容{
   position: absolute;
   left:0px;
   top:0px;
   width: 100%;
   height: 100%;
   padding-top:_vw(44);
   background: #f7f7f7;
   overflow-y:auto;
    .搜索{
        display:flex;
        align-items: center;
         background: #f7f7f7 !important;

        .van-search__content{
            background: #ffffff;
        }
        .返回{
            width:_vw(40);
           color:red;
           font-size: _vw(14);
           font-weight: 600;
        }
        .搜索框{
            flex:1;
        
        }
    }
   ul{
       box-sizing: border-box;
       li{
        width: 100%;
        margin:_vw(0) auto;
        box-sizing: border-box;
        background:#ffffff;
        margin-bottom: _vw(10);
        padding-top:_vw(10);
        .t_t{
            width: 90%;
           margin:_vw(0) auto;
           display:flex;
           justify-content:space-between;
           color:#aaaaaa; 
           font-size: _vw(12);
           line-height: _vw(30);
        }
         .left{
            width: 90%;
            line-height: _vw(30);
            font-size: _vw(14);
            text-align: center;
           margin:_vw(0) auto;

         }
         .right{
             width: 90%;
              margin:_vw(0) auto;

             img{
                 width: 100%;
             }
         }
       }
   }
}

</style>