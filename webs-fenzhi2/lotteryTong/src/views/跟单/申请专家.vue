<template>
    <div class="申请专家">

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">申请专家</span>
            <span class="sqzj">&nbsp;</span>
        </div>

        <div class="contnt">
            <van-cell-group>
                  <van-field
                    v-model="QQID"
                    label="QQ号"
                    placeholder="请输入qq号"
                />

                  <van-field 
                    v-model="message"
                    label="封神理由"
                    type="textarea"
                    placeholder="亲输入封神理由"
                    rows="10"
                    autosize
                />
             </van-cell-group>


             <div class="btn" @click="提交申请()" :style="{'background':皮肤区分.btnbj}" >提交申请</div>
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
                btnbj:"#5dadff"
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
                btnbj:"#c21632"
             
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
.申请专家{
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
    .contnt{
        margin-top:_vw(20);
        padding:_vw(35) _vw(10) _vw(10) _vw(10);
       /deep/.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
            border-width: 0px 0;
        }
        p{
            color:#acacac;
        }
        .btn{
            width:80%;
            margin:0px auto;
            border-radius: _vw(35);
            line-height: _vw(40);
            text-align: center;
            color:#ffffff;
        }
    }
}
</style>