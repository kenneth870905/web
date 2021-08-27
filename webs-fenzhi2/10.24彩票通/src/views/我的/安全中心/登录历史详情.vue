<template>
    <div class="登录历史">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">登录历史</span>
            <span class="sqzj">&nbsp;</span>
        </div>
      <div class="content">
         <ul>
             <li>
                 <div class="left_l">
                     <p>登录设备</p>
                     <p>上海市闵行区<span>2019-10-22</span></p>
                 </div>
                 <div class="left_r">正常</div>
             </li>
              <li>
                 <div class="left_l">
                     <p>登录设备</p>
                     <p><span>2019-9-19</span></p>
                 </div>
                 <div class="left_r">正常</div>
             </li>
              <li>
                 <div class="left_l">
                     <p>登录设备</p>
                     <p><span>2019-8-22</span></p>
                 </div>
                 <div class="left_r">正常</div>
             </li>
         </ul>
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
      
    }
    
}
</script>
<style lang="scss" scoped>
.登录历史{
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
      ul{
            padding:_vw(0) _vw(15);
          li{
              padding:_vw(0) _vw(15);
              display:flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #f0f0f0;
             .left_l{
                 p{
                     margin:0px;
                     line-height: _vw(24)
                 }
                 p:nth-child(2){
                     color:#999999;
                     font-size: _vw(12);
                 }

             } 
             .left_r{

             }
          }
      }
    }
}
</style>