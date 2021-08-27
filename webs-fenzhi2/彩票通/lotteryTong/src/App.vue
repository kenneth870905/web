<template>
    <div id="app" class="app">
         
            <van-popup v-model="弹框.itemshow" :overlay="true"  class="弹出框" :close-on-click-overlay="false" >
               <div class="通知" v-if="hdshow">
                       <div class="关闭" @click="弹框.itemshow=false"><img src="@/assets/img/home/close.d142dd8.png" alt=""></div>
                   <div  class="tongz">
                      <div class="title">温馨提示</div> 
                      <p>尊敬的会员：由于系统升级加强安全防护，设置简易密码如（123456）的账号会出现冻结状态，
                        
                        为了广大会员的资金安全密码请使用字母带数字的密码 防止系统检测再次冻结。
                    </p>
                   </div>
               </div> 

              <div class="最新活动" v-if="dshow">
                       <div class="关闭" @click="dshow=false"><img src="@/assets/img/home/close.d142dd8.png" alt=""></div>

                   <div  class="bj_box">
                      <div class="title">双奖活动大派送</div> 
                      <p><img src="@/assets/img/home/submit.fbca15f.png" alt="">
                    </p>
                   </div>
               </div>
               
          </van-popup>

        <loginbtn v-if="登录框显示隐藏"></loginbtn>
        <register v-if="注册框显示隐藏"></register>
        <gpwd v-if="更改密码框显示隐藏"></gpwd>

        <router-view class="router"/>
        <router-view name="底部" class="底部"></router-view>
    </div>
</template>
<script>
import loginbtn from '@/components/登陆/登陆.vue'
import register from '@/components/注册/注册.vue'
import gpwd from '@/components/忘记密码/忘记密码.vue'

 import { mapState , mapMutations} from 'vuex'
export default {
    data() {
        return {
          hdshow:true,
          dshow:true,
        }
    },
    components: {loginbtn,register,gpwd},// 注册组件
    computed: {
        ...mapState({
            登录框显示隐藏:'登录框显示隐藏',
            注册框显示隐藏:'注册框显示隐藏',
            更改密码框显示隐藏:'更改密码框显示隐藏',
            弹框:"弹框"

        })
    },
    methods: { 
        
   
    },
    created() {
      
    },
//     watch: { //this.$route.path 代表当前路由状态
//     $route(to, from) {
//         console.log(this.$route.path);
//         if (this.$route.path == '/') {
//            this.弹框.第一次=false
//         }
       
//     }
// },

  
}
</script>
<style lang="scss">
.bjw{
  background: #1d1e23  !important;
}
.bjb{
  background: #ffffff ortant;
}
html,
body {
    padding: 0px;
    margin: 0px;
    transform: none;
    height: 100%;
    overflow: auto;
}
#app{
    height: 100%;
   /deep/.van-popup{
        background-color:rgba(0,0,0,0.0) !important;
        overflow-y:visible !important;
    }
    .弹出框{
        width: 100%;
            .通知{
            width:_vw(300);
            height:_vw(300);
            margin:0px auto;
            background:url('~@/assets/img/home/bluting.73ff6ea.png') no-repeat;
            background-size: 100% 100%;
                position: relative;
                z-index: 20;

                   .关闭{
                    position: absolute;
                    left: 50%;
                    bottom:_vw(-50);
                    margin-left: _vw(-20);
                    width: _vw(40);
                    height: _vw(40);
                    z-index: 20;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            .tongz{
                width: _vw(160);
                margin:0px auto;
                color:#ffffff;
                font-size: _vw(14);
               
                .title{
                  text-align: center;
                  padding:_vw(40) _vw(0) _vw(20) _vw(0);
                  box-sizing: border-box;
                }
                p{
                    margin: 0;
                }
            }
        }
        .最新活动{
              width: 90%;
              width:_vw(340);
              height:_vw(400);
            // background:red;
            position: absolute;
            top:_vw(-38);
            left:50%;
            margin-left: _vw(-170);
            z-index: 30;
             .关闭{
                    position: absolute;
                    right:_vw(50);
                    top:_vw(-50);
                    bottom:_vw(-50);
                    margin-left: _vw(-20);
                    width: _vw(40);
                    height: _vw(40);
                    z-index: 30;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
        }
         .bj_box{
                width:100%;
                height:_vw(300);
                margin:0px auto;
                color:#ffffff;
                font-size: _vw(14);
                  background:url('~@/assets/img/home/activity-new.794c1c8.png') no-repeat;
                  background-size: 100% 100%;
                .title{
                  text-align: center;
                  padding:_vw(90) _vw(0) _vw(120) _vw(0);
                  box-sizing: border-box;
                  color:black;
                  font-size: _vw(18);
                  font-weight: 800;
                }
                p{
                   width: 54%;
                   height:_vw(40);
                   margin:0px auto;
                   img{
                       width: 100%;
                       height: 100%;
                   }
                }
            }

    }
  
}
.fred {
    color: red;
}
.fgreen {
    color: green;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}



</style>
