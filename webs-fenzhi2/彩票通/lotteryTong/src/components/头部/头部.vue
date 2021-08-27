<template>
    <div class="头部">
        <div class="content"  :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <div class="left">
                <img src="../../assets/img/home/logo.a19c84d.png" alt="">
            </div>

            <div class="right" v-if="!是否登陆">
                <div class="img_box"><img src="../../assets/img/home/gift.cf9ecc4.png" alt=""></div>
                <div class="dl" :style="{'border-color':皮肤区分.color}" @click="登录()"> 登录</div>
                <div class="zc"  @click="注册()">注册</div>
            </div>

             <div class="right y_right" v-if="是否登陆">
                 <div><span class="iconfont icondenglu"></span></div>
                <div class="dl">{{user.name}}</div>
                <div  :class="{hei_z:皮肤切换==false,zc:皮肤切换==true}" @click="退出登录()">退出</div>
                <div class="img_box"><img src="../../assets/img/home/gift.cf9ecc4.png" alt=""></div>
            </div>
        </div>
    </div>

</template>

<script> 
 import {mapState , mapMutations} from 'vuex'
export default {
    data() {
        return {
           bai:{
               color:"#ffffff",
               topbj: "#5dadff",
           },
            hei:{
               color:"#eacd91",
               topbj: "#1d1e23",
             
           }
        }
    },
    components: { // 注册组件
    },
    computed: { 
          ...mapState({
            皮肤切换:'皮肤切换',
            是否登陆:'是否登陆',
            user:"user"
         }),
        皮肤区分(){
            if(this.皮肤切换==true){
                return this.bai
            }else{
                return this.hei
            }
          
        }
    },
    created(){
         
    },
    methods: {
        ...mapMutations({
            更改登录框显示隐藏:'更改登录框显示隐藏',
            更改注册框显示隐藏:'更改注册框显示隐藏',
            更改登陆状态:"更改登陆状态",
        }),
          登录(){
            this.更改登录框显示隐藏(true)
       },
          注册(){
            this.更改注册框显示隐藏(true)
       },
        退出登录(){
            this.更改登陆状态(false)
        }
    },
   
}


</script>
<style lang="scss" scoped>
.头部{
 .content{
     padding:_vw(6) _vw(12);
     box-sizing: border-box;
     display: flex;
     justify-content: space-between;
     align-items: center;
     .left{
         height: _vw(21);
         width:_vw(108);
         img{
             width: 100%;
             height: 100%;
         }
     }
     .right{
          font-size: _vw(16);
          display: flex;
          align-items: center;
         .img_box{
          width: _vw(25);
          height: _vw(25);
          img{
              width: 100%;
              height: 100%;
          }
         }
         .dl{
             padding: 0px _vw(8);
             margin:0px _vw(8);
             border-left:2px solid #ffffff;
             border-right: 2px solid #ffffff;
             line-height: 100%;
         }
     }
      .y_right{
           .iconfont{
                  font-size: _vw(20);
            //  line-height: 100%;
              }
          .dl{
              border-left:none;
              border-right:none;
             margin:0px;
          }
          .hei_z{
            height: _vw(25);
             border-radius: _vw(20);
             background: #33353c;
             width: _vw(36);
             line-height: _vw(25);
            padding: 0px _vw(8) ;
            margin-right: _vw(10);
              text-align: center;
              color:#ffffff;
          }
          .zc{
             padding: 0px _vw(8) ;
             margin:0px _vw(8);
              text-align: center;
              border-right:2px solid #ffffff;
              line-height: 100%;

          }
     }
 }
}
</style>