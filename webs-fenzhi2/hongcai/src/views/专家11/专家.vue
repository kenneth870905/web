<template>
  <div class="专家">
       <van-tabs v-model="active" animated class="专家title">
            <van-tab v-for="index in 2" :title="'选项'+index">
                <ul class="ul_c">
                  <li v-for="index in 5" @click="$router.push('/ExpertsDetails')">
                       <div class="d_l">
                           <div class="name_box" ><img src="@/assets/img/ty.png" alt=""></div>
                           <div class="yuj">
                               <div class="r_top">李客 </div>
                               <div class="jialiu"> <span class="r_dow"> 足球评论员</span> <span class="规则"><span>86%</span>命中率</span></div>
                           </div>
                       </div>
                       <div class="d_r"></div>
                   </li>

                </ul>
            </van-tab>
     </van-tabs>
  </div>
</template>
<script>
// import { } from "@/api/股票.js";
export default {
    data() {
        return {
            active:0,
        }
    },
    components: { // 注册组件

    },
    computed: {
        
    },
    created() {
     
    },
 
    methods: {
     
    },
   
}

</script>

<style lang="scss" scoped>
// ==========tab title============================

//   /deep/.van-tabs--line .van-tabs__wrap{
//      height: _vw(40) !important;
//      line-height: _vw(40) !important;

//  }
//  /deep/.van-tab{
//      line-height: _vw(40) !important;
//      font-size: _vw(16) !important;
//      height: _vw(40) !important;

//  }
//  .van-tabs__line{
//      height:_vw(3) !important;
//      padding-top:_vw(44) !important;
//  }
// ==========tab title============================

.专家{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    // background: palevioletred;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    padding-top: _vw(44);
            background: #ffffff;


        .title{
        position: fixed;
        left: 0px;
        top:0px;
        z-index:10;
        width: 100%;
        height: _vw(44);
        background: red;
        text-align: center;
        color:#ffffff;
        line-height: _vw(44);
        font-size: _vw(18);
        font-weight: 600;

    }
    .专家title{

        .ul_c{
            li{
            padding:_vw(10) _vw(10);
            display:flex;
            align-items: center;
            justify-content:space-between;
             border-bottom: 1px solid #f8f1f1;
            .d_l{
                 display: flex;
                .name_box{
                    width:_vw(48);
                    height: _vw(48);
                     margin-right: _vw(10);
                   img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                   }
                }
                .yuj{
                    .r_top{
                        font-size: _vw(16)
                    }
                    .jialiu{
                        display:flex;
                        align-items: center;
                        .r_dow{
                        font-size: _vw(12);
                        margin-right: _vw(10);
                        line-height: _vw(30);
                            }
                        .规则{
                                font-size: _vw(12);

                                display: block;
                                background: rgba(255,34,34,.05);
                                border: _vw(1) solid #f83900;
                                color:#f83900;
                                border-radius: 0 _vw(6)  _vw(6)  _vw(10);

                                text-align: center;
                                padding:_vw(0) _vw(8) _vw(0) _vw(8) ;
                         }
                   }
                   
                }
                
            }
            .d_r{
             width:_vw(64);
             height: _vw(30);
             background: url('~@/assets/img/gz.png');
             background-repeat: no-repeat;
            background-size: 100% 100%;
            }
            
            }
        }
    }
}
</style>