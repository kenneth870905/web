<template>
    <div class="账户消息">
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">账户信息</span>
            <span class="sqzj">&nbsp;</span>
        </div>
              <!-- 时间弹出框 -->

              <van-popup v-model="showitem" :overlay="true" position="bottom" class="弹出框" :close-on-click-overlay="false">
                 <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                     :min-date="minDate"
                     @cancel="onCancel"
                     @confirm="onConfirm"
                    />
              </van-popup>

      <div class="content">
         <div class="div_t">
             <div  class="left_d"><img src="@/assets/img/wd/girl.c5b1ff4.jpg" alt=""></div>
             <div class="right_d">
                账户:&nbsp;15824966424
             </div>
         </div>
         <ul class="c_ul">
             <li>
                 <div class="left_l">真实姓名</div>
                 <div class="right_r">未设置</div>
             </li>
               <li>
                 <div class="left_l">昵称</div>
                 <div class="right_r">李寻欢龙</div>
             </li>
               <li>
                 <div class="left_l">性别</div>
                 <div class="right_r">女<span class="iconfont iconyoubian"></span></div>
             </li>
              <li>
                 <div class="left_l">生日</div>
                 <div class="right_r" @click="showitem=true">{{time}}<span class="iconfont iconyoubian"></span></div>
             </li>
         </ul>
    
         <ul class="c_ul">
             <li>
                 <div class="left_l">上次登录</div>
                 <div class="right_r">2019-10-21 19:12:00</div>
             </li>
               <li>
                 <div class="left_l">上次登录地区</div>
                 <div class="right_r">上海</div>
             </li>
               <li>
                 <div class="left_l">上次访问IP</div>
                 <div class="right_r">116.93.11.231</div>
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
            time:"2019-8-16",
            showitem:false,
             currentDate: new Date(),
              minDate: new Date(),
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
         onConfirm(d) {
            var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() 
            this.time=datetime
            this.showitem=false;
        },
        onCancel(){
            this.showitem=false;

        }
    }
    
}


</script>
<style lang="scss" scoped>
.账户消息{
       background: #f0f0f0;
      height: 100%;
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
        box-sizing: border-box;
        .iconzuobian {
            font-size: _vw(17);
        }
        .text {
            font-size: _vw(18);
        }
    }
    .content{
        .div_t{
            display: flex;
            align-items: center;
            width: 100%;
            padding:_vw(15) _vw(0) _vw(20) _vw(15);
            margin-bottom: _vw(20);
            background: #ffffff;
            .left_d{
                height: _vw(66);
                width: _vw(66);
                border-radius: 50%;
                margin-right: _vw(10);
                img{
                    width: 100%;
                    height: 100%;
                     border-radius: 50%;
                }
            }
            .right_d{
                margin-left: _vw(10);
            }
        }
        .c_ul{
            margin:_vw(0) _vw(0) _vw(20) _vw(0);
            background: #ffffff;
            padding:_vw(0) _vw(10);
            box-sizing: border-box;
            li:not(:last-child){
                border-bottom: none;
            }
            li{
                font-size: _vw(14);
                display: flex;
                justify-content: space-between;
                line-height: _vw(44);
                border-bottom: _vw(1) solid #f0f0f0;
                .left_l{
                    margin-left: _vw(10);
                }
                .right_r{
                    color:#999999;
                    margin-right: _vw(10);
                    .iconyoubian{
                        font-size: _vw(12);
                    }
                }
            }
        }
    }
  
}
</style>