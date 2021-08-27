<template>
  <div class="sports">
      <div class="container">
          <div class="sports_box">
             <ul class="ul_title">
                 <li @click="clicktite(index)" v-for="(item, index) in sports"  :class="{'titleActive':tableType ==index}">{{item.title}}</li>
             </ul>
             <ul  class="ul_content">
                 <li v-if="tableType==index" v-for="(item1, index) in sports" >
                     <ul class="ul_content_li_ul">
                         <li @click="typego(item2.url)"  v-for="(item2, index) in item1.contentdata" >
                             <div class="img_box"><img :src="item2.imgurl" alt=""></div>
                             <p>{{item2.name}}</p>
                         </li>
                         <li class="none_li"></li>
                         <li class="none_li"></li>
                         <li class="none_li"></li>
                     </ul>
                 </li>
             </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
         tableType:0,
         
        }
    },
    methods:{
       typego(url){
      alert("点击图片触发的函数")
      },
     clicktite(num){
      this.tableType=num
     }
    },
    components: { // 注册组件
    },

}
</script>
  <style lang="scss" scoped>
  .titleActive{
      background: #ffffff;
      color:#e94335 !important;
      font-weight: 600;
  }
  .sports{
   .container{
       .sports_box{
           width: 100%;
           min-height: 440px;
           border:2px solid #e94335;
           margin-top:10px;
           position: relative;
           .ul_title{
              position: absolute;
                top:0px ;
                left:0px;
               height:50px;
               display: flex;
                width: 100%;  
                background: #e94335;
                // li:nth-child(1){
                //     border-left:1px solid red;
                // }
               li{
                cursor:pointer;  
                width:120px;
                color:#ffffff;
                text-align:center;
                line-height: 50px;
                text-align: center;
               }
           }
           .ul_content{
               height:100%;
                width: 100%;  
                 li::-webkit-scrollbar{
                  width:10px;
                  height:10px;
                  /**/
                }
                li::-webkit-scrollbar-track{
                  background: rgb(239, 239, 239);
                  border-radius:2px;
                }
                li::-webkit-scrollbar-thumb{
                  background: #bfbfbf;
                  border-radius:10px;
                }
                // li::-webkit-scrollbar-thumb:hover{
                //   background: #333;
                // }
                li::-webkit-scrollbar-corner{
                  background: #179a16;
                }
                li{
                   box-sizing: border-box;
                   padding-top:40px;
                    max-height:700px;
                    overflow :auto;
                    //   background: gold;
                      .ul_content_li_ul{
                          width: 100%;
                          display:flex;
                          flex-wrap:wrap;
                          justify-content:space-around;
                          li{
                            width: 200px;
                            height: 200px;
                            margin: 10px;
                            box-sizing: border-box;
                            padding-top:30px;
                            .img_box{
                                margin:0px auto;
                                width: 150px;
                                height: 87px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            p{
                                margin:30px 0px 20px 0px ;
                                text-align: center
                            }
                          }
                      }
                }
                .none_li{
                    background:none !important;
                }
           }
       }
   }
  }
  </style>
  