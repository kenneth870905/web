<template>
   <div class="tixian">
        <van-nav-bar title="提现" left-arrow :fixed="true" @click-left="onClickLeft"/>
        <div class="提现金额">
            <span>可用金额：<span class="fred">500.00</span>元(最小提现金额<span class="num_min">100.00</span>)</span>
        </div>
        <ul>
            <li>  

                <div class="left">提现金额:</div>
              <div class="right">
                  <van-cell-group>
                    <van-field v-model="value" placeholder="请输入你要充值的金额" />
                    </van-cell-group>
              </div>
           </li>

            <li>  
              <div class="left">提现到银行卡:</div>
              <div class="right">建设银行建设银行(1718)</div>
           </li>

           <li>  
              <div class="left">提现密码:</div>
              <div class="right">
                  <!-- <span> 还未设置提现密码？<span class="fred">立即设置</span></span> -->
                    <span> 还未设置提现密码？<span class="fred"  @click="$router.push('/my/zfpassword')">立即设置</span></span>
                  
                  </div>
           </li>
    
    
    
    
    
   

        </ul>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
    
    },
    data() {
        return {
            num:"",
        }
    },
    methods: {
        onClickLeft(){
            history.back()
        },
       
    },
}
</script>

<style lang="scss" scoped>
 .tixian{
    padding-top:_vw(60);
    background: #f3f3f4;
    height: 600px;
    ul{
    
        margin-top:_vw(20);
    background: #ffffff;
    // padding:auto _vw(30);
    // display: flex;
    // justify-content:space-between;
       li:nth-child(2) .right, li:nth-child(3) .right{
           padding-left: _vw(20);
       }
       li:nth-child(3){
           border-bottom: none  !important;
       }
    li{
        height: _vw(50);
        width: 90%;
        margin:0px auto;
        display: flex;
        line-height: _vw(50);
        border-bottom: 1px solid #ccc !important;   
      
        .left{
            width: 30%;
            font-size: _vw(16);
           height: _vw(50);
         
        }
        .right{
        //    background: red;
         width: 70%;
        height: _vw(50);
            font-size: _vw(16); 
            box-sizing: border-box;      
            .van-cell{
            height: _vw(50);
            line-height: _vw(25);
                
            }
        }
    }   
    }
    .提现金额{
    background: #ffffff;
    height: _vw(50);
    line-height: _vw(50);
    font-size:_vw(18);
    padding:auto _vw(10);
    text-align: center;
    .num_min{
        font-weight:600;
   }
    .fred{
        color:red;
        font-size: _vw(22);
    }
     
    }
}

</style>

