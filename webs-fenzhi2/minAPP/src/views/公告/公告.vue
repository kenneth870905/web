
<template>
  <div class="公告">
       <van-nav-bar  title="公告"  class="title"  left-arrow  @click-left="onClickLeft" /> 
          <div class="content">
              <van-collapse v-model="activeNames" class="li" v-for="(item,index) in list" @change="zhankai(item)">
                    <van-collapse-item  :title="item.title" :name="index" icon="shop-o"  :value="item.time" >
                         {{item.content}}
                    </van-collapse-item>
             </van-collapse>
         </div>
  </div>
</template>

<script>
import {获取公告} from "@/api/公告.js"
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
             activeNames: [],
             list:[ ],
        };
    },
    computed:{
     
    },
    created(){
        this.获取公告函数()  
    },
    methods:{
        获取公告函数(){
           获取公告().then(x=>{
              this.list=x.data.list
               console.log(x)
           }).catch(err=>{
            console.log(err)
           })
        },
       zhankai(itme){
        console.log("点击了当前公告")     
       },
      onClickLeft() {//头部
            history.back()
         },
    }
};
</script> 

<style lang="scss" scoped>
        /deep/ .van-cell__left-icon {
             line-height: _vw(40);
             font-size: _vw(20)
         }
          /deep/ .van-cell__right-icon {
             line-height: _vw(40);
             font-size: _vw(20)
         }
.公告{
  .title{
      background: #ec304c;
        margin-bottom: none; 
           /deep/.van-nav-bar__title{
           background: #ec304c;
           color:#ffffff;
           font-size: _vw(16)          
            } 
              /deep/.van-nav-bar{
           background: #ec304c;
           font-size: _vw(16)          
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
      }

      .content{
         padding-top:_vw(10);
            /deep/.van-cell{
             line-height: _vw(40);
             font-size: _vw(14)
           }
         .li{
           margin-bottom: _vw(10);
        
         }
      }

    }   
</style>



