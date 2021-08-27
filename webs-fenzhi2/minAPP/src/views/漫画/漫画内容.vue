
<template>
  <div class="漫画内容">
      <div class="top"> 
          <div class="返回" @click="返回()"><van-icon name="arrow-left" class="arrow-left" /></div>
          <div class="span_c" ><span >漫画内容</span></div>
      </div>

       <div class="content">
           <div class="img_box" v-for="item in size" ><img  v-lazy="configData.api_url+imgQZ+item+'.jpg'" v-if="imgQZ && item" :src="configData.api_url+imgQZ+item+'.jpg'" alt=""></div> 
        </div>

  
  </div>
</template>
<script>
import {漫画详情页} from "@/api/漫画.js" 
export default {
    name: "",
    data() {
        return {
            configData:config,
            imgQZ:"",
             size:'',
            datamax:[],

        };
    },
      computed:{
  
        },
     created(){
      this.获取所有数据函数()
    },
    methods:{
          获取所有数据函数(){ 
              var xqmhid= this.$route.query.xqmhid; //每部漫画的唯一id
                var obj={ id:xqmhid}
                    漫画详情页(obj).then(x=>{
                        console.log(x)
                    if(x.data.code==1){
                        this.imgQZ=x.data.data.jpgsurl//图片路径前段
                        this.size=x.data.data.size
                        
                    }else{
                        console.log("请求数据失败")
                    }
                }).catch(err=>{
                    console.log(err)
                })
          },
         返回() {//头部
            history.back()
        },
    }
};
</script> 

<style lang="scss" scoped>

.漫画内容{
   .top, .bottom{
       height:_vw(44);
       line-height: _vw(44);
       background:#ec0909;
       position: fixed;
       left:0px;
       color:#fff;
       width: 100%;
       .span_c{
         text-align: center;
         font-size:_vw(14);
       }
   }
   .top{
       top:0px;
        .arrow-left{
          font-size: _vw(14);
           
        }
        .bt_t{
            font-size: _vw(16)
        }
          .返回{
          width: _vw(30);
           position: absolute;
            top:0px;
            left:_vw(10);
            z-index: 999;
            .iconzuobian{
              color:#ffffff;
            }
        }
      
   }
   .bottom{
       bottom: 0px ;
   }
   .content{
       padding:_vw(44) _vw(0) _vw(44) _vw(0);
      .img_box{
       width: 100%;
       img{
           width: 100%;
           height: 100%;
       }
    }
   }
  
}
</style>



