<template>
    <div class="连码走势">

        <div class="投注" @click="$router.push('/buyLottery')">
            <img src="@/assets/img/bxtj/betting.6320e08.png" alt="">
        </div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
         </div>


            <van-popup v-model="itemshow" :overlay="true" position="bottom" class="弹出框">
               <van-picker
                show-toolbar
                title="年份"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
                />
          </van-popup>
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">连码走势统计图</span>
            <div class="sqzj" @click="itemshow=true"><span>{{item}}</span><span class="iconfont iconxiala"></span></div>
        </div>

        <div class="content">
             <div class="row">
                 <p>年份/期数</p>
                 <p>正一</p>
                 <p>正二</p>
                 <p>正三</p>
                 <p>正四</p>
                 <p>正五</p>
                 <p>正六</p>
                 <p>特码</p>
             </div>
              <div>
                 <p>2016-138</p>
                 <p> <span class="yuan">25</span></p>
                 <p> <span class="">25</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">31</span></p>
                 <p> <span class="yuan">6</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">17</span></p>
             </div>
              <div>
                 <p>2016-138</p>
                 <p> <span class="yuan">25</span></p>
                 <p> <span class="">25</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">31</span></p>
                 <p> <span class="yuan">6</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">17</span></p>
             </div>
               <div>
                 <p>2016-138</p>
                 <p> <span class="yuan">25</span></p>
                 <p> <span class="">25</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">31</span></p>
                 <p> <span class="yuan">6</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">17</span></p>
             </div>
               <div>
                 <p>2016-138</p>
                 <p> <span class="yuan">25</span></p>
                 <p> <span class="">25</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">31</span></p>
                 <p> <span class="yuan">6</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">17</span></p>
             </div>
               <div>
                 <p>2016-138</p>
                 <p> <span class="yuan">25</span></p>
                 <p> <span class="">25</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">31</span></p>
                 <p> <span class="yuan">6</span></p>
                 <p> <span class="yuan">14</span></p>
                 <p> <span class="">17</span></p>
             </div>
            

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            itemshow:false,
           item:"",
            
            columns: ['2018', '2017', '2016', '2015', '2014'],
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
    var date= new Date
    this.item=date.getFullYear()
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
         onConfirm(value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`);
        this.item=value
        this.itemshow=false
        },
        onCancel() {
        console.log('取消');
        this.itemshow=false

        }
      
    }
    
}


</script>
<style lang="scss" scoped>
.连码走势{

     .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(108);
        right: _vw(-2);
        z-index: 40;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .返回 {
        width: _vw(40);
        height: _vw(40);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        position: fixed;
        top: 50%;
        left: 0px;
        z-index: 30;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }





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
        align-items: center;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(14);
        }
 
        .text {
            font-size: _vw(16);
        }
        .sqzj{
         width: _vw(60);
         height: _vw(26);
         border:1px solid #ffffff;
         text-align:center;
         line-height: _vw(26);
         border-radius: _vw(4);
        }
    }
    .content{
     
           .row{
               background: #f9e9cb !important;   
                position: fixed;
               width: 100%;
               top:_vw(35);
               left: _vw(0);          
           }
           div:nth-child(2n+1){
               background: #f1f5f6;
           }
            div:nth-child(2n){
               background: #ffffff;
           }
           div:nth-child(2){
               padding-top:_vw(65)
           }
           .row,div{
                border-bottom: 1px solid #f1f0f0;               
               display: flex;
               justify-content:space-between;
                font-size: _vw(13);
               p:nth-child(1){
                flex:1;
                 margin:0px;
                text-align: center;
                line-height: _vw(30);
               }
               p{
                   box-sizing: border-box;
                   .yuan{
                  display: block;
                  width:_vw(26) ;
                  height:_vw(26);
                  background: brown;
                  color:#ffffff;
                  border-radius: 50%;
                  margin:0px auto;
                  margin-top:_vw(3);
                  font-size: _vw(13);
                  line-height: _vw(26);
                  text-align: center;
                  
                }
               }
              
                p:not(:first-child){
                width: _vw(41);
                height: _vw(30);
                margin:0px;
                text-align: center;
                line-height: _vw(30);
                border-left: 1px solid #f1f0f0;
               }
           }
    }
   
}
</style>