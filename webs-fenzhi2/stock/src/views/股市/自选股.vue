<template>
    <div class="portion">
      <van-nav-bar title="添加自选股" left-arrow :fixed="true" @click-left="onClickLeft"/>  
      <div class="optional_content">
       <div class="title_Search">查询股票</div>

            <van-search
                v-model="value"
                placeholder="股票代码"
                show-action
                shape="round"
                @search="onSearch"
                @input="按下()"

                >
                <div slot="action" @click="取消()">取消</div>
             </van-search>

           <ul class="son_ul"> 
               <li v-for="(item,index) in valueInputAll"> 
                   <!-- isExist为true代表已经在当前自选股中 -->
                   <div class="title"><span>{{item.stockCode}}</span><span>{{item.stockName}}</span></div>
                   <div class="delete_tj" v-if="!item.isExist" @click="添加(item)"><span>添加</span><span class="iconfont icon-tianjia"></span></div>
                   <div class="delete_sc"  v-if="item.isExist"  @click="删除(item)"><span>删除</span><span class="iconfont icon-shanchu"></span></div>
               </li>
           </ul>
           
      </div>       
 
    </div>
</template>

<script>
import { api_股票代码模糊查询,api_添加自选股,api_删除自选股} from "@/api/股票.js";
export default {
    data(){
        return{
           value:"",
           valueInputAll:'',
        }
    },
      methods: {
          取消(){
            this.valueInputAll="";
            this.value="";
          },
          添加(item){
              var valueInput=item.stockCode
                api_添加自选股(valueInput).then(x=>{
                      if(x.data.code==200){
                        item.isExist=true   
                      this.$toast(x.data.msg)                      
                    } else if(x.data.code==1){
                        item.isExist=true
                      this.$toast(x.data.msg)                                            
                    }
                    else{
                      this.$toast("添加失败")                                                                
                    }                                  
                   
                    console.log(x.data)
                }).catch(err=>{
                this.$toast("系统错误稍后再试")
                console.log(err)
               })
          },
            删除(item){
               var valueInput=item.stockCode
                api_删除自选股(valueInput).then(x=>{
                    if(x.data.code==200){
                       item.isExist=false
                      this.$toast(x.data.msg)                      
                    }else{
                        
                    this.$toast("删除失败")
                    }                                         
                    
                    console.log(x.data)
                }).catch(err=>{
                this.$toast("系统错误稍后再试")
                console.log(err)
               })       
          },
            按下(){
          if(this.value.length>=4){
                    var valueInput=parseInt(this.value)
                 api_股票代码模糊查询(valueInput).then(x=>{
                    console.log(x.data.data)
                   this.valueInputAll=x.data.data
                }).catch(err=>{
                this.$toast("系统错误稍后再试")
                console.log(err)
               })
          }
              
          },
          
          onSearch(){
           alert(1)
          },
       
          onClickLeft(){//头部
            history.back()
        },
      }     
}
</script>

<style lang="scss" scoped>
.portion{
    .optional_content{
        padding-top:_vw(60);
        .title_Search{
            font-size: _vw(14);
            margin:_vw(10) 0px;
            color:#999999;
            padding-left: _vw(10);
        }
        .van-search{
            padding: _vw(8) _vw(4) _vw(8) _vw(8);
            .van-search__content--round{
                border-radius:_vw(4);
            }
               .van-cell{
                border-radius:!important;
                padding:0px;
                height: _vw(50);
                line-height: _vw(50);
                font-size: _vw(18);
                /deep/i{
                font-size: _vw(28);
                font-weight:600;
                color:#999999;
                }
            }
        }
         .van-search__action{
                color:#dd524d;
                font-size: _vw(18);
                font-weight: 600;
         } 
         .son_ul{
             background: #ffffff;
             margin-top:_vw(10);
             padding: _vw(0) _vw(10);
             li:nth-last-child(1){
                 border-bottom:none;
             }
             li{
                 padding: _vw(10) _vw(0);
                  border-bottom:1px solid #ccc;
                 display: flex;
                 justify-content:space-between;
                 .title{
                     line-height: _vw(40);
                 }
                 .delete_sc{
                     background: #dd524d; 
                       .iconfont{
                         font-size: _vw(18);
                     }                 
                 }
                  .delete_tj{
                     background: #12c557;  
                     .iconfont{
                         font-size: _vw(16);
                     }                
                 }
                 .delete_sc,.delete_tj{
                     border-radius: _vw(4);
                     width: _vw(70);
                     height: _vw(36);
                     text-align: center;
                     color:#ffffff;
                     line-height: _vw(36);
                 }

             }
         }
        
    }

}



</style>
