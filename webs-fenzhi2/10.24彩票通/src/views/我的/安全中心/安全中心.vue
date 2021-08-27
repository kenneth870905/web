<template>
    <div class="安全中心">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">安全中心</span>
            <span class="sqzj">&nbsp;</span>
        </div>
      <div class="content">
          <div class="top_t">
              <div class="img_box"><img src="@/assets/img/wd/anquan.png" alt=""></div>
              <span> 一直为 你守候</span>
          </div>
            <ul>
                <li @click="修改密码()">
                    <div class="left_l">修改密码</div>
                    <div class="left_r"><span class="iconfont iconyoubian"></span></div>
                </li>
                <li @click="$router.history.push('/loginHistory')">
                    <div class="left_l">登录历史</div>
                    <div class="left_r"><span class="iconfont iconyoubian"></span></div>
                </li>
            </ul>
      </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
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
           ...mapActions({
            改变密码框显示隐藏: '改变密码框显示隐藏',
            }),
            修改密码(){
             this.改变密码框显示隐藏(true)
            },
            返回() {//头部
                history.back()
            },
    }
}
</script>
<style lang="scss" scoped>
.安全中心{
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
        .top_t{
            height: _vw(150);
            text-align: center;
            background: #1e1f24;
            color:#ffffff;
            padding-top:_vw(60);
            box-sizing: border-box;
                .img_box{
                  width: _vw(23);
                  height: _vw(27);
                  margin:0 auto;
                  img{
                      width: 100%;
                      height: 100%;
                  }  
                }
        }
        ul{
            padding:_vw(0) _vw(15);
            li{
              line-height: _vw(44);
              border-bottom: 1px solid #f0f0f0;
              display: flex;
              justify-content:space-between;
              .left_l{
                margin-left: _vw(10);
              }
              .left_r{
                 margin-right: _vw(10);
              }
            }
        }

    }
}
</style>