
<template>
  <div class="优惠">

            <!-- <van-overlay :show="show" @click="show = false" :z-index="1000">
        <div class="wrapper" @click.stop>
              11116666
            <div class="block" />
        </div>
        
   </van-overlay> -->



       <van-nav-bar  title="优惠"  class="title"  left-arrow  @click-left="onClickLeft" /> 

          <div class="content">
              <van-collapse v-model="activeNames" class="li" v-for="(item,index) in list" @change="zhankai(item)">
                    <van-collapse-item   :title="item.title" :name="index" icon="shop-o"  value="" >
                        <h4 >活动时间:&nbsp;  <span>{{item.start}}</span>至<span>{{item.finish}}</span></h4>
                         {{item.content}}
                    </van-collapse-item>
            </van-collapse>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
             activeNames: [],
             list:[
                 {
                   time:"2019-11-11",//公告发布时间
                   title:"充值好礼",//公告标题
                   content:"hhahahhahhhh",//公告内容
                   start:"2019-11-11",//开始时间
                   finish:"2019-11-12",//结束时间
                   img:"",//图片路径
                   id: 1,//每条信息的唯一值
                 },
                  {
                   time:"2019-11-11",//公告发布时间
                   title:"充值好礼",//公告标题
                   content:"hhahahhahhhh",//公告内容
                   start:"2019-11-11",//开始时间
                   finish:"2019-11-12",//结束时间
                   img:"",//图片路径
                    id: 1,//每条信息的唯一值
                 },
                
                  {
                   time:"2019-11-11",//公告发布时间
                   title:"充值好礼",//公告标题
                   content:"hhahahhahhhh",//公告内容
                   start:"2019-11-11",//开始时间
                   finish:"2019-11-12",//结束时间
                   img:"",//图片路径
                    id: 1,//每条信息的唯一值
                 },
                
             
             ]
        };
    },
    computed:{
     
    },
    mounted() {
      
    },
    methods:{
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

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
     height: 100%;
     background: #cb1c36;
    }

    .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
    }



        /deep/ .van-cell__left-icon {
             line-height: _vw(40);
             font-size: _vw(20)
         }
          /deep/ .van-cell__right-icon {
             line-height: _vw(40);
             font-size: _vw(20)
         }
.优惠{
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

            h4{
                color:red;
                margin-top:0px;

            }
        //     /deep/.van-cell__right-icon{
        //           /deep/.van-cell__left-icon, .van-cell__right-icon{
        //        line-height: _vw(40);
        //      font-size: _vw(18)
        //  }
        //    }
         
      
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



