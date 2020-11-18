<template>
    <div class="提现提示">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">提现提示</span>
            <span class="sqzj">&nbsp;</span>
        </div>
        <div class="content">
            <p>为了资金安全</p>
            <p>请下载AAP进行提现</p>
            <div class="img_box"><img src="../../assets/img/wd/cptDownlaod.e23a037.png" alt=""></div>
            <div class="btn" @click="APP下载()">APP下载</div>
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
        APP下载(){
         alert("点击下载APP")
        },
        返回() {//头部
            history.back()
        },
      
    }
    
}


</script>
<style lang="scss" scoped>
.提现提示{
        padding-top:_vw(35);
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
        padding-top:_vw(30);
      p{
          margin:0px;
          font-size: _vw(22);
          font-weight: 1000;
          color:#ac1e2d;
          text-align: center;
      }
      .img_box{
          width:_vw(125) ;
          height: _vw(125);
          margin:_vw(28) auto;
          img{
              width: 100%;
              height: 100%;
          }
      }
      .btn{
          width: _vw(240);
          height: _vw(40);
          line-height: _vw(40);
          text-align: center;
          color:#ffffff;
          border-radius: _vw(35);
          margin:0px auto;
          font-size: _vw(22);
          background: #ac1e2d;
          
      }
    }
  
}
</style>