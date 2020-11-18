
<template>
  <div class="低俗内容xian">
      <div class="top"> 
          <div class="返回" @click="返回()"><van-icon name="arrow-left" class="arrow-left" /></div>
          <div class="span_c" ><span >低俗内容详情</span></div>
      </div>
     <div class="content">
         <div class="title">{{obj.title}}</div>
         <ul>
             <li v-for="(item,index) in obj.jpg">
                 <img  v-lazy="configData.api_url+url+item" :src="configData.api_url+url+item" alt="">
            </li>
         </ul>
     </div>
      
  </div>
</template>
<script>
import {低俗内容分类数据} from "@/api/低俗内容.js" 
export default {
    name: "",
    data() {
        return {
            configData:config,
            id:"",
            url:"",//路径前半断
            currentPage:1,//当前页
            row:2,//每页显示多少条数据
            obj:{
              jpg:[],  
              title:""
            }
        };
    },
      computed:{
        
        },
     created(){
            this.id= this.$route.query.id; //唯一id
           this.获取所有数据函数()
    },
    methods:{
     返回() {//头部
            history.back()
        },
      获取所有数据函数(){
              var obj={
                  page:this.currentPage, //当前页
                  row:this.row,//每页显示多少行数据
              }
        低俗内容分类数据(obj).then(x=>{
        var objdata=x.data.data
        this.url=objdata.url//路径前半断
         var objsun=objdata.list.find(x=>x.id==this.id)
           if(objsun){
            this.obj=objsun
           }
        }).catch(err=>{
            console.log(err)
        })
      }

    }
};
</script> 

<style lang="scss" scoped>

.低俗内容xian{
   .content{
      padding-top:_vw(54);
      .title{
          text-align: center;
          font-size: _vw(16);
          font-weight: 800;
          color:red;
          margin:_vw(10) auto;
                    
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行

      }
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
   .top{
       top:0px;
        height:_vw(44);
       line-height: _vw(44);
       background:#ec0909;
       position: fixed;
       left:0px;
       color:#fff;
       width: 100%;
       .span_c{
         text-align: center;
         font-size:_vw(16);
       }
        .arrow-left{
          font-size: _vw(14);
           
        }
    
          .返回{
           width: _vw(30);
           position: absolute;
            top:0px;
            left:_vw(10);
            z-index: 999;
            .iconzuobian{
              color:#ffffff;
              font-size: _vw(14)
            }
        }
      
   }
  
   
  
}
</style>



