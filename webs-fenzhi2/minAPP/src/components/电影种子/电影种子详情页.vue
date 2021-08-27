<template>
<div class="电影种子详情页">
    <van-nav-bar  title="电影种子详情"  class="title" left-arrow  @click-left="onClickLeft" />
      <div class="content">

            <fieldset class="kang" >
                <legend class="kang_title">种子详情</legend>
                   <div class="w_div">标题：&nbsp;<span>{{obj.name}}</span></div>
                    <div class="w_div">文件大小：&nbsp;<span>{{obj.size}}</span></div>
                   <div class="w_div" v-if="obj.created">文创建时间：&nbsp;<span>{{obj.created}}</span></div>
                   <div class="w_div">文件数量：&nbsp;<span>{{obj.num_files}}</span></div>
                    <div class="left_hh" @click="点击复制(obj.hash_title)" ><span class="fred">点击复制：</span><span>{{obj.hash_title}} </span> </div>  
                    <div class="left_hh  " @click="点击复制(obj.hash_content)" ><span class="fred">点击复制：</span> <span>{{obj.hash_content}}</span> </div>  
           </fieldset>
      </div>
</div>
</template>  

<script>
import {电影种子详情} from "@/api/电影种子.js"
import { Toast } from 'vant';
 export default { 
    data() {
        return {
            configData:config,
            type:"",
            id:"",
            currentPage:1,//当前页数
            row:1,//每页返回多少行数据
            obj:{},
        }
    },
   

    created() {
          this.id= this.$route.query.id; //唯一id
        this.请求所有数据的函数()
    },


    computed: {
    },
      methods: {
         点击复制(text){  
            this.$copyText(text).then((e) => {
                   this.$toast('复制地址成功');
            }, (e) => {
                   this.$toast('复制失败，请手动复制');
            })
        },
         
    
          onClickLeft() {//头部
            history.back()
         },
         
          请求所有数据的函数(){
            var obj={
                id:this.id,
            }
               电影种子详情(obj).then(x=>{
                  if(x.data.code==1){
                   this.obj= x.data.data
                  }else{
                    Toast(x.data.msg)  
                      console.log("请求数据失败")
                  }
              }).catch(err=>{
                  console.log(err)
              })
        },


      
       
        
    },
}

</script>
<style lang="scss" scoped>
.电影种子详情页{
    position: absolute;
    left:0px;
    top:0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
  .title{
        background: #ec304c; 
        margin-bottom: none; 
      
           /deep/.van-nav-bar__title{
           color:#ffffff !important; 
           font-size:_vw(18);           
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
        }
        .content{
            padding-top:_vw(44);
            width: 100%;
            // height: _vw(20);
            //  background: green;
            .kang{
                 width:80%;
                 margin:0px auto;
                  border: _vw(2) solid #ec304c;
                  border-radius: _vw(6);
                     padding:_vw(10) _vw(10) _vw(10) _vw(10);
                  .kang_title{
                   color:red;
                   font-size: _vw(20);
                   font-weight:800;
                   margin-bottom: _vw(6);
                  }
                  .w_div{
                      color:#6d6565;
                        font-size: _vw(14);
                      span{
                          color:red;
                      }
                  }
                 .left_hh{
                     line-height:_vw(30);
                     height: auto;
                     word-break:break-all;
                      word-wrap:break-word;
                    //   min-height: _vw(150);
                      max-height: _vw(380);
                      overflow-y:auto;
                        margin-top:_vw(10);
                        border-top:1px solid rgb(218, 212, 212);
                      
                        font-size: _vw(14);
                        .fred{
                         font-weight: 600;
                         font-size: _vw(20);
                        //  display: block;
                        //  width: _vw(120);
                        //  line-height: _vw(30)
                        }
                 }
            }
            
        }
}
 
       
    
</style>