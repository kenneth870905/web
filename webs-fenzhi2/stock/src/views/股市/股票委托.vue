<template>
    <div class="business">
          <van-nav-bar  title="股票委托"  left-arrow :fixed="true" @click-left="onClickLeft"/>

      <!-- <van-nav-bar title="股票委托" left-arrow :fixed="true" @click-left="onClickLeft"/>      -->
        <div class="business_content">


           <ul class="business_ul"  v-if="entrustAll.length!==0">
          <li class="max_li" v-for="(item,index) in entrustAll">
            <ul class="top_ul">
                <li> 
                  <p>{{item.stockCode}}</p>
                  <p>{{item.stockName}}</p>
                </li>
                <li>
                   <p>{{item.amount}}/{{item.price}}</p>
                  <p>总额/单价</p>
                </li>
                 <li>
                  <p v-if="item.status==0">已挂单</p>
                  <p v-if="item.status==1">手动撤单</p>
                  <p v-if="item.status==2">系统撤单</p>
                  <p v-if="item.status==3">已成交</p>
                   <p>委托状态</p>
                 </li>
                <li>
                   <p>{{item.dealCount}}/{{item.count}}</p>
                  <p>已成/委托数量</p>
                </li>
                <li>
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

<script>
import { api_返回股票的委托数据} from "@/api/股票.js";
export default {
    data(){
        return{
          entrustAll:[],
        }
    },
    created(){
     api_返回股票的委托数据().then(x=>{
        this.entrustAll= x.data.data
     }).catch(err=>{
       console.log(err)
     })
    },
      methods: {
          onClickLeft(){
            history.back()
        },
      }     
}
</script>

<style lang="scss" scoped>
.business{
  background: #ffffff;
  position: absolute !important;
  width: 100%;
  height: 100%;
  overflow:auto;
    
  .business_content{
    padding-top:_vw(60);
    background: #ffffff;
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


       .business_ul{
       position: absolute;
       width: 100%;
       height: 100%;
       background: #ffffff;
      .max_li{
             font-size: _vw(16);
            
          .top_ul{
             margin-bottom:_vw(20);
            display:flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
             border-bottom:1px solid #ccc;
            
           li{
               width: 33.33%;
               text-align: center;
            // }
              p{
                margin: 0px;
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

}
 

</style>
