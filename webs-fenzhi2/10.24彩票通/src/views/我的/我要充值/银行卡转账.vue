<template>
    <div class="银行卡转账">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">银行卡转账</span>
            <span class="sqzj">&nbsp;</span>
        </div>
         <div class="content">
             <div class="yi">
                 <span>1.打开</span>
                 <span class="hred">"打开银行卡"</span>  
                  <div class="img_div"> <img src="@/assets/img/wd/7c24c282-a422-4f2d-9fb3-116edd77a2e0.png" alt=""></div>  
                   <span>点击</span> 
                    <span  class="hred">"转账"</span>
                  <div class="div_img"> <img src="@/assets/img/wd/czjl.png" alt=""></div>  
             </div>
             <div class="title">
                 <span>2.收款人信息</span>
                 <ul class="zyxx">
                     <li>
                      <div class="left">
                         <span>金额</span>
                         <span class="hred">&yen;100.00</span>
                      </div>
                       <!-- <div class="right">复制</div> -->
                     </li>

                     <li>
                      <div class="left">
                         <span>姓名</span>
                         <span >&yen;沈阳友悦商贸行</span>
                      </div>
                       <div class="right" @click="复制('沈阳友悦商贸行')" >复制</div>
                     </li>

                     <li>
                      <div class="left">
                         <span>卡号</span>
                         <span >&yen;6232510730828196</span>
                      </div>
                       <div class="right"  @click="复制('6232510730828196')" >复制</div>
                     </li>

                       <li>
                      <div class="left">
                         <span>银行</span>
                         <span >&yen;中国建设银行</span>
                      </div>
                       <div class="right"  @click="复制('中国建设银行')" >复制</div>
                     </li>
                 </ul>
             </div>

              <div class="title">
                 <span>2.收款人信息</span>
               
                  <div class="input"><input type="text" v-model="nametext"></div>
                 <div class="input_ts">与绑定身份证姓名相同</div>

                 <div class="btn">提交</div>
                 <div class="ts">充值完成后，重新进入App查看余额</div>
                   
            </div>
       </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
export default {
    data() {  
        return {
            nametext:'',
            objdata:{
                name:"",
                kaid:"",
                dz:"",
            },
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            }
        }
    },
    components: {
    },
    created() {

    },
    computed:{
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },

        
     
    },
    methods:{
             复制(text){
            // alert(text)
            this.$copyText(text).then((e) => {
                this.$toast("复制成功")
            }, (e) => {
                this.$toast("复制失败，请手动复制")
            })
        },
  
        返回() {//头部
            history.back()
        },
       提交申请(){
          if(this.message==''){
              Dialog.alert({ message: '封神理由不能为空'
                }).then(() => {
                });
          }else{
                 Dialog.alert({ message: '提交成功等待审核'
                }).then(() => {
                });
          }
       }
    }
    
}

</script>
<style lang="scss" scoped>
.hred{
    color:#ac1e2d;
}
.银行卡转账{
       .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
    }
    .content{
        padding:_vw(55) _vw(10) _vw(0) _vw(10);
     .yi{
         display:flex;
         font-size: _vw(15);
         line-height: _vw(15);
         font-weight: 600;
        margin-bottom: _vw(25);
         span{
             margin:0px _vw(4);
         }
         .img_div{
             width: _vw(25);
             height: _vw(15);
             img{
                 width: 100%;
                 height: 100%;
             }
         }
         .div_img{
               width: _vw(17);
             height: _vw(17);
             img{
                 width: 100%;
                 height: 100%;
             }
         }
     }
     .title{
              font-size: _vw(15);
              line-height: _vw(15);
              font-weight: 600;
              margin-bottom: _vw(25);
              .input{
                  width: 60%;
                  margin:0px auto;
                  margin:_vw(20) auto _vw(4) auto;
              }
              .input_ts{
                  text-align: center;
                  color:#ac1e2d;
                  font-size: _vw(13)
              }
              .btn{
                   width: 60%;
                  margin:0px auto; 
                  background: #ff8610;
                  border-radius: _vw(25);
                  height: _vw(32);;
                  color:#ffffff;
                  text-align: center;
                  line-height: _vw(32);
                  font-size: _vw(16);
                  margin:_vw(20) auto;

              }
         .zyxx{
             width: 98%;
             margin: 0px auto;
             background:url('../../../assets/img/wd/cz_skrxx@2x.8a4f012.png') no-repeat;
             background-size: 100% 100%;
             height:_vw(165);
             margin-top:_vw(20);
           
             padding:_vw(20);
             box-sizing: border-box;
             li{
                display: flex;
                justify-content:space-between;
             margin-bottom:_vw(14);
             box-sizing: border-box;
                .left{
                span:nth-child(1){
                    margin-right: _vw(10);
                }
                }
                .right{
                width: _vw(60);
                height: _vw(21);
                text-align: center;
                line-height: _vw(21);
                font-size: _vw(14);
                color:#ffffff;
                border-radius: _vw(25);
                    background: #a38353;
                }
             }

         }
     }
    }
    
}
</style>