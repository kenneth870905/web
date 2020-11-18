<template>
    <div class="business">
      <van-nav-bar title="股票撤单" left-arrow :fixed="true" @click-left="onClickLeft"/>     
        <div class="business_content">


           <ul class="business_ul"  v-if="entrustAll.length>0">
            <li v-for="(item,index) in entrustAll">
              <ul class="top_ul">
                  <li> 
                    <p>{{item.stockCode}}</p>
                    <p>{{item.stockName}}</p>
                  </li>
                  <li>
                    <p>{{item.amount}}/{{item.price}}</p>
                    <p>总额/单价</p>
                  </li>
                
                   <li v-if="!btnshow">
                     <div class="btn outbtn">已撤单</div>
                  </li>

                  <li v-if="btnshow">
                      <div class="btn" @click="撤单(item)">撤单</div>
                  </li>

                  <li>
                    <p>{{item.dealCount}}/{{item.count}}</p>
                    <p>已成/委托数量</p>
                  </li>
                

                    <li >
                      <p>成交类型</p>
                    <p>{{item.type}}</p>
                  </li>
                  
            
                  <li>
                    <p>{{item.createTime}}</p>
                    <p>申报时间</p>
                  </li>
              </ul>
            </li>
          </ul>

          <div  v-if="entrustAll.length==0" class="nodata">
              <div><img src="../../assets/img/shuju.png" alt=""></div>
          </div>

        
        </div>
    </div>
</template>
  delegateCode
<script>
import { api_返回股票的委托数据,api_撤销委托单} from "@/api/股票.js";
export default {
    data(){
        return{
          entrustAll:[],
          btnshow:true,
           
        }
    },
    created(){
     api_返回股票的委托数据().then(x=>{
          var entrust = x.data.data
          this.entrustAll=entrust.filter(y=>y.status==0)
     }).catch(err=>{
       console.log(err)
     })
    },
      methods: {
         撤单(item){//delegateCode委托代码
         var delegateCode=item.delegateCode
          api_撤销委托单(delegateCode).then(x=>{
          if(x.data.data==200){
               this.btnshow=false
            }else{
               this.$toast(x.data.msg)                  
               this.btnshow=true
            }
          }).catch(err=>{
            console.log(err)
          })
        },
           onClickLeft(){//头部
            history.back()
         },
      }     
}
</script>

<style lang="scss" scoped>
.business{
  .business_content{
    padding-top:_vw(60);
    position: absolute;
    width: 100%;
  background: #ffffff;height: 100%;     
       .business_ul{
       position: absolute;
       width: 100%;
       height: 100%;
       background: #ffffff;
       li{
              font-size: _vw(16);
              width: 96%;
              margin:_vw(0) auto _vw(0) auto;
              // .top_ul:nth-last-child(1){
              // border-bottom:none;
              // }
          .top_ul{
             margin-bottom:_vw(30);
             border-bottom:1px solid #ccc;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
           li{
               width: 33.33%;
               text-align: center;
               .outbtn{
                 background: #ccc;
               }
            .btn{
              width: _vw(55);
              height: _vw(40);
              text-align: center;
              color:#ffffff;
              line-height: _vw(40);
              margin:0px auto;
              background: #f0ad4e;
              border-radius: _vw(4);
              line-height:_vw(40);
            }
            .uotbtn{
              background: red;
            }
              p{
                margin: 0px;
              }
            }
          }
        
       }
     }


      .nodata{
        width: 100%;
        height: _vw(300);
        // background: #f0ad4e;
        div{
          width: _vw(180);
          height: _vw(220);
          margin: 0px auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }


  }

}
 

</style>
