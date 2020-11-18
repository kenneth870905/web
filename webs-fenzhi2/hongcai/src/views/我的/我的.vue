<template>
  <div class="我的">
       <div class="title">
           <div class="img_box">
               <span v-if="是否登录==false" @click="$router.push('/login')">登录</span>
               <img v-if="是否登录==true" src="@/assets/img/ty.png" alt="">
           </div>
           
           <div class="footer" v-if="是否登录==false">
             <span class="title_e">球神榜通行证</span><span  @click="$router.push('/login')">登录</span>&nbsp;/&nbsp;<span  @click="$router.push('/register')">注册</span>
             <div><span @click="$router.push('/login?type=my')">密码登陆</span>&nbsp;|&nbsp;<span  @click="$router.push('/login?type=yzm')">手机验证码登陆</span></div>
           </div>
           <div class="r_t"  v-if="是否登录==true">
               <div class="t_t"><span>{{phone}}</span>&nbsp;| &nbsp;<span class="out"  @click="退出登录()">退出</span></div>
               <!-- <div class="b_b" >
                   <div class="left_b">红豆</div>
                   <div class="left_r">充值</div>
               </div> -->
           </div>
       </div>

       <ul>
            <li  @click="收藏方案()" >
               <span><span>收藏方案</span> </span>
               <span><van-icon name="arrow" /></span>
           </li>
            <li  @click="详情()">
               <span><span>消息中心</span> </span>
               <span><van-icon name="arrow" /></span>
           </li>
            <li  @click="详情()">
               <span><span>意见反馈</span> </span>
               <span><van-icon name="arrow" /></span>
           </li>
            <li  @click="详情()">
               <span><span>帮助中心</span> </span>
               <span><van-icon name="arrow" /></span>
           </li>
        
       </ul>


       <div class="退出登录"  v-if="是否登录==true"><div class="out" @click="退出登录()">退出登录</div></div>


  </div>
</template>
<script>
import { 退出登录, } from "@/api/登陆注册.js"
import { Toast  } from 'vant';
import {  mapMutations} from 'vuex' 
  import {  mapState } from 'vuex' 
export default {
    data() {
        return {
            phone:"",
        }
    },
    components: { // 注册组件

    },
    computed: {
          ...mapState({
                    是否登录:"是否登录"
           }),
        
    },
    created() {
        console.log(this.是否登录)
         this.phone=localStorage.getItem('phone');
        console.log(this.phone)
    },
 
    methods: {
         
          ...mapMutations({
              保存当前登录状态:"更改登录状态"
        }),
        详情(){
           Toast('对不起，此功能暂时未开放')
        },
        收藏方案(){
            if(this.是否登录){
               this.$router.push('/scheme')
            }else{
                Toast('登陆后才能查看我的收藏')
            }
        
        },

     退出登录(){
       退出登录().then(x=>{
           console.log(x)
          if(x.data.code==1){
              this.保存当前登录状态(false)
             Toast(x.data.msg)
             this.$router.push('/')
             localStorage.removeItem('token');
             localStorage.removeItem('phone');

          }
       }).catch(err=>{
           console.log(err)
       })
     }
        
     
    },
   
}


</script>

<style lang="scss" scoped>
.我的{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    background:#ffffff;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    .title{
        display:flex;
        justify-content:space-between;
        align-items: center;
        padding:_vw(20);
            background: linear-gradient(to top right,#ff6439,#fd0334);
        .img_box{
            width:_vw(65);
            height: _vw(65);
            margin-right:_vw(20);
            border-radius: 50%;
            background-color: #ffffff;
            text-align: center;
            span{
                line-height: _vw(65);
                color:red;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%
            }
        }
        .footer{
            font-size: _vw(14);
             color:#ffffff;
             line-height: _vw(26);
              flex:1;
            .title_e{
                margin-right: _vw(10);
            }
            .fg{
                margin:_vw(0) _vw(6);
            }

        }
        .r_t{
            flex:1;
            .t_t{
                display:flex;
                align-items: center;
                font-size: _vw(14);
                color:#ffffff;
                line-height: _vw(26);
                margin-bottom: _vw(10);
                .out{
                   color: hsla(0,0%,100%,.5);
                }
            }
            // .b_b{
            //          display:flex;
            //          align-items: center;
            //          justify-content: space-between;
            //          .left_b{
            //                 color:yellow;
            //                 border:1px solid yellow
            //             }
            //             .left_r{
            //                 color:#ffffff;
            //                 border:1px solid #ffffff
            //             }
            //             .left_b,.left_r{
            //                 width: _vw(65);
            //                 height: _vw(27);
            //                 line-height: _vw(27);
            //                 text-align: center;
            //             }
            //     }
        }

    }
    ul{
        li:last-child{
            // border-bottom: none;
        }
        li{
            display:flex;
            justify-content:space-between;
            line-height: _vw(51);
            border-bottom: 1px solid #ccc;
            padding:_vw(0) _vw(20);
            color:#646464;
        }
    }
    .退出登录{
        position: absolute;
        left: 0px;
        bottom: _vw(70);
        width: 100%;
        .out{
            width: 90%;
            margin:0px auto;
            line-height: _vw(40);
            font-size: _vw(16);
            color:#ffffff;
            background: #fd0334;
            text-align: center;
            border-radius: _vw(8);
        }
    }
}
</style>