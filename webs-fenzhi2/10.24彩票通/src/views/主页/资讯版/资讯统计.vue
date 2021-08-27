<template>
    <div class="资讯统计">
           <van-popup v-model="show" class="弹出框">
                <div class="top_title">
                    <div class="l_b">&nbsp;&nbsp;<span class="text_t iconbangzhu">填写统计的期数</span></div>
                    <div class="r_b">
                        <van-icon name="cross" class="cross" @click="show=false" />
                    </div>
                </div>
                <div class="C_zh">
                         <div class="input">
                             <div class="name">期数:</div>
                             <!-- <input type="text" style="ime-mode:disabled;" @paste="return false;"  @keypress="keyPress()" /> -->
                            <input type="number"   name="points" min="1" max="100"   v-model="oldNum"/>
                         </div>
                         <div class="btn_box">
                             <div class="left"  @click="show=false" >取消</div>
                             <div class="right"  @click="确定()" >确定</div>
                         </div>
                </div>
        </van-popup>
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">资讯统计</span>
            <div class="sqzj" @click="show=true"><span>100</span><span class="iconfont  iconxiala"></span></div>
        </div>
        <div class="content">
           <ul class="top_ul">
               <li>
                   <div class="top_tile">正码出现期数最多的号码</div >
                   <div class="flex_box">
                       <p>22</p>
                       <p>22</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                       <p>22</p>
                       <p>28</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                   </div>
               </li>
                 <li>
                   <div class="top_tile">正码出现期数最多的号码</div >
                   <div class="flex_box">
                       <p>22</p>
                       <p>22</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                       <p>22</p>
                       <p>28</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                   </div>
               </li>
                 <li>
                   <div class="top_tile">正码出现期数最多的号码</div >
                   <div class="flex_box">
                       <p>22</p>
                       <p>22</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                       <p>22</p>
                       <p>28</p>
                       <p>22</p>
                       <p>24</p>
                       <p>22</p>
                   </div>
               </li>
           </ul>

           <div class="bottom_box">
               <ul class="shengxiao">
                   <li>
                       <div class="left">正码当前遗漏期数最多的生肖</div>
                       <div class="right">
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">正码当前遗漏期数最多的生肖</div>
                       <div class="right">
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">正码当前遗漏期数最</div>
                       <div class="right">
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">正码当前遗漏期数</div>
                       <div class="right">
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                           <span>猪</span>
                       </div>
                   </li>
               </ul>

               <ul class="shengxiao 中间">
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span class="红波">红波</span>
                           <span class="绿波">绿波</span>
                           <span  class="蓝波">蓝波</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span class="红波">红波</span>
                           <span  class="绿波">绿波</span>
                           <span  class="蓝波">蓝波</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span class="红波">红波</span>
                           <span  class="绿波">绿波</span>
                           <span  class="蓝波">蓝波</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span class="红波">红波</span>
                           <span  class="绿波">绿波</span>
                           <span  class="蓝波">蓝波</span>
                       </div>
                   </li>
               </ul>

                <ul class="shengxiao 中间">
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span>9尾</span>
                           <span>9尾</span>
                           <span>9尾</span>
                            <span>9尾</span>
                           <span>9尾</span>
                       </div>
                   </li>
                   <li>
                       <div class="left">特码出现期数最多的波色</div>
                       <div class="right">
                           <span>9尾</span>
                           <span>9尾</span>
                           <span>9尾</span>
                            <span>9尾</span>
                           <span>9尾</span>
                       </div>
                   </li>
                  
               </ul>

           </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            show:false,
            oldNum:100 ,
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
        // inpNum:{
        //    get:function(){
        //         return this.oldNum;
            
        //     },
        //     set:function(newValue){
        //         this.oldNum=newValue.replace(/[^\d]/g,'');
        //     },
        // },
            


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
        确定(){
              this.show=false
        //  if(this.oldNum==!""){
        //      alert(1)
        //      this.show=false
        //  }
        },
        返回() {//头部
            history.back()
        },
         keyPress() {    
            var keyCode = event.keyCode;    
            if ((keyCode >= 48 && keyCode <= 57))    
            {    
                event.returnValue = true;    
            } else {    
                event.returnValue = false;    
            }    
        }    
      
    }
    
}


</script>
<style lang="scss" scoped>
.红波{
    color:red;
}
.绿波{
    color:green;
}
.蓝波{
    color:rgb(17, 21, 238);
}
.资讯统计{
        .弹出框 {
         width: 90%;
         border-radius: _vw(6);
         margin:0 auto;
        // background: red;
        .top_title {
            width: 90%;
            margin:0 auto;
            border-top-left-radius: _vw(10);
            border-top-right-radius: _vw(10);
            display: flex;
            justify-content: space-between;
            height: _vw(35);
            background: #eacd91;
            padding: _vw(0) _vw(10);
            box-sizing: border-box;
            .l_b,
            .r_b {
                line-height: _vw(35);
                .text_t {
                    font-size: _vw(12);
                }
                .cross,
                .iconbangzhu {
                    color: #ffffff;
                }
            }
        }
        .C_zh{
            width: 90%;
            margin:0px auto;
            background:#ffffff;
            height: _vw(200);
            position: relative;
            border-bottom-left-radius: _vw(10);
            border-bottom-right-radius: _vw(10);
            padding-top:_vw(50);
            box-sizing: border-box;
          
            .input{
                width: 70%;
               margin:0px auto;
            //    background:red;
               display: flex;
            //    justify-content:space-between;
            .name{
                width: 20%;
                text-align: center;
            }
               input{
                 margin-left:_vw(10);
                width: 80%;                 
               }
            }
                .btn_box{
                display:flex;
                position: absolute;
                left:0px;
                bottom:0px;
                width: 100%;
                border-top:_vw(1) solid #f0f0f0;
                .left{
                    border-right:1px solid #f0f0f0;
                }
            .left,.right{
                width: 50%;
                text-align: center;
                line-height: _vw(40)
            }
            }
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
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
        .sqzj{
           width: _vw(52);
           height: _vw(26);
           border-radius: _vw(6);
           font-size: _vw(14);
           color:#ffffff;
           border:1px solid #ffffff;
           line-height: _vw(26);
           text-align: center;
        }
    }
    .content{
        width: 100%;
        padding-top:_vw(35);
      .top_ul{
          li{
              .top_tile{
               background:#f0f0f0;
               width: 100%;
               height: _vw(28);
               font-size: _vw(14);
               line-height: _vw(28);
               padding-left: _vw(10);
               box-sizing: border-box;
              }
              .flex_box{
               display:flex;
               justify-content:space-between;
               padding: _vw(0) _vw(4);
                p{
                    background:url('~@/assets/img/qit/lhc_greenball.png') no-repeat;
                    background-size: 100% 100%;
                    width:_vw(32);
                    height:_vw(32);
                    text-align: center;
                    line-height: _vw(32);
                    font-size: _vw(14);
                    margin:0;

                }
              }
          }
      }
      .bottom_box{
          padding-top:_vw(10);
          background:#f0f0f0;
          .shengxiao{
            background:#ffffff;   
            li:nth-last-child(1){
                border:none;
            }
            li{
                height:_vw(36);
                display:flex;
                justify-content:space-between;
                border-bottom: 1px solid #f0f0f0;
                .left{
                    padding-left:_vw(10);
                box-sizing: border-box;
                    width: 52%;

                }
                .left,.right{
                    font-size: _vw(13);
                    line-height: _vw(36)                    
                }
                .right{
                    width: 48%;
                     padding-left:_vw(12);
                    // display:flex;
                    box-sizing: border-box;
                    // padding-left: _vw(20);
                    span{
                    margin:_vw(0) _vw(2);  
                    line-height: _vw(36) ;
                    margin: _vw(0) _vw(4)                    
                    }
                }

            }         
          }
          .中间{
              margin:_vw(10) 0px;
          }
      }
    }
   
}
</style>