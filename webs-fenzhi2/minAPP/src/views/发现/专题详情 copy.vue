<template>
    <div class="CreditsLog">
                <van-nav-bar  title="专题详情"  class="title"   left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="content">
            <ul>
                <li  @click="点击查看视频(item)" v-for="(item,index) in list">
                    <div class="bottom" >{{item.title}}</div>
                    <div class="top"><img :src="configData.api_url+item.imgurl" alt=""></div>
                </li>
                
            </ul>
        </div>
    </div>

</template>

<script> 
import {视频大分类} from "@/api/视频.js"
export default {
    data() {
        return {
         configData:config,
          list:[],
          currentPagerm:1,
          rowrm:2,
          queryName:""
        }
    },
    computed: {
         
    },
    created(){
               this.queryName = this.$route.query.type;
            var obj = {
                        page: this.currentPagerm,//当前页数
                        row: this.rowrm,//每页返回多少行数据
                        class: this.queryName
                    }
                 
          视频大分类(obj).then(x=>{
            console.log(x)
            if(x.data.code==1){
              this.list=x.data.data.list
            console.log(this.list)
            }else{
                console.log("请求失败")
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        点击查看视频(item){
            this.$router.push("/videoContent?id=" + item.id );
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

.CreditsLog{
     position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    overflow-y:auto;
   
    background:  #f3f3f4;
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
            // padding-top:_vw(64);
                   padding:_vw(64) _vw(10) _vw(54)  _vw(10) ;
                   box-sizing: border-box;

            ul{
                li{
                    margin-bottom: _vw(20);

                    
                  .top{
                      width: 100%;
                      height: _vw(200);
                      img{
                          width: 100%;
                          height: 100%;
                           border-bottom-left-radius:_vw(10);
                      border-bottom-right-radius:_vw(10);
                      }
                  }
                  .bottom{
                       border-top-left-radius:_vw(10);
                      border-top-right-radius:_vw(10);
                      width: 100%;
                      font-size: _vw(14);
                      color:#928f8f;
                      background: #ffffff;
                      line-height: _vw(34);
                     padding:_vw(0) _vw(10);
                   box-sizing: border-box;

                  }
                }
            }
        }



}




</style>