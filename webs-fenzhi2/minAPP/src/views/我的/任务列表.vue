<template>
    <div class="任务列表">
     <van-nav-bar  title="任务列表" class="title" left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="content">

        <div class="完成步骤">
            <div class="title"><span class="iconfont iconjifenjilu"></span><span>每日任务</span></div>
            <ul >
                <li @click="$router.push('/SignIn')">
                    <div class="left" v-if="每日任务">
                        <span   class="iconfont iconxuanzhong green"></span> 点击签到 
                    </div>
                    <div class="left" v-if="!每日任务">
                        <span   class="iconfont iconxuanzhong green"></span> 点击签到 
                    </div>
                
                    <div class="right">{{每日任务 ? "已完成" : "未完成"}}  <van-icon name="arrow" />
                    </div>
                </li>
            
            </ul>
        </div>

        <div class="完成步骤">
            <div class="title"><span class="iconfont iconjifenjilu"></span><span>每周任务</span></div>
            <ul>
                <li @click="$router.push('/vip')">
                    <div class="left" v-if="每周任务">
                        <span   class="iconfont iconxuanzhong green"></span> 邀请新人 
                    </div>
                    <div class="left" v-if="!每周任务">
                        <span   class="iconfont iconxuanzhong green"></span> 邀请新人 
                    </div>
                    <div class="right"> {{每周任务 ? "已完成" : "未完成"}} <van-icon name="arrow" />
                    </div>
                </li>
            
            </ul>
        </div>


        <!-- <div class="完成步骤">
          <div class="title"><span class="iconfont iconjifenjilu"></span><span>每周任务</span></div>
         <ul>
             <li>
                 <div class="left" v-if="每周任务">
                <span   class="iconfont iconxuanzhong green"></span> 邀请新人 
              </div>
              <div class="left" v-if="!每周任务">
                <span   class="iconfont iconxuanzhong acacac"></span> 邀请新人
              </div>
              <div class="right"> 
                  <span>+0</span>
                  <span> <van-icon name="arrow" /></span>
              </div>
            </li>
         </ul>
       </div> -->
         

  
        </div>
    </div>

</template>

<script> 
import {任务列表} from "@/api/我的.js"
export default {
    data() {
        return {    
              每日任务:false,
              每周任务:false,
        }
    },
    computed: {
    },
    created(){
        任务列表().then(x=>{
               this.每周任务= x.data.data.everyWeek==0 ? false :true
               this.每日任务=x.data.data.sign==0 ? false :true
                  // console.log(x)
                }).catch(err=>{
                    console.log(err)
           })
    },
    methods: {
          onClickLeft() {//头部
            history.back()
         },
    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>
.任务列表{
    position: absolute;
    left: 0px;
    top:0px;
    height: 100%;
    overflow-x:auto;
    background: 100%;
    width: 100%;
    background:#ffffff;
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
         padding-top:_vw(60);
        
  .完成步骤{
      .title{
        border-bottom:1px solid #cccc;
        line-height: _vw(40);
        color:goldenrod;
        padding-left:_vw(10);
        background: #ffffff;
        font-size: _vw(14);
         .iconfont{
          font-size: _vw(14);
         }
      }
      ul{
        li{
          line-height: _vw(40);
          display:flex;
           justify-content: space-between;
           padding:_vw(10) _vw(10) _vw(0) _vw(10);
           box-sizing:border-box;
           font-size: _vw(14);
           .left{
             .iconfont{
               font-size: _vw(14);
             }
             .green{
               color:rgb(96, 180, 128);
             }
             .acacac{
               color:#b9b7b7;
             }
           }
           .right{
             color:#acacac;
             display:flex;
             align-items: center;
             text-align: center;
            //  span{
            //      line-height: _vw(30);
            //      text-align: center;
            //      font-size: _vw(14);
            //  }
           }
        }
      }
    }
     }
}


</style>