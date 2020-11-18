<template>
    <div class="在线支付">

        <div class="div_top">
            <div class="img"> <img src= "@/assets/img/wd/logo_alipay.jpg" alt=""></div>
        </div>
        <div class="content">
            <div class="bj_hb">
                
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
            QQID:"",
            message:"",
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
    components: { // 注册组件
        
    },
    created() {
        
    
    },

    computed: {
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
.在线支付{
    .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(63);
        border-bottom:1px solid #acacac;
       .img{
           margin:0px auto;
           width: _vw(130);
           height: _vw(38);
           margin-top:_vw(14);
           text-align: center;
           img{
             width: 100%;
             height: 100%;
           }

       }
      
    }
    .content{
        .bj_hb{
          height: _vw(12);
          width: 100%;
        }
    }
    
}
</style>