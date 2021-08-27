<template>
    <div class="公式杀号">
        <!-- 点击问好弹框 -->
        <van-popup v-model="show" class="弹出框">
            <div class="top_title">
                <div class="l_b"><span class="iconfont iconbangzhu"></span>&nbsp;&nbsp;<span class="text_t">帮助说明</span></div>
                <div class="r_b">
                    <van-icon name="cross" class="cross" @click="show=false" />
                </div>
            </div>

            <div class="C_zh">
                <h3>什么是杀号？..............</h3>
                <p class="p">杀号意味着该号码不推荐参考，建议剔除杀掉</p>
                <p class="p">当开出结果与杀号号码一致时，代表杀错，该期计划失败</p>
                <p class="p">当开出结果与杀号号码不一致时，代表杀对，该期计划成功</p>
                <div class="bottom_b">
                    <div class="l_top">公式：</div>
                    <div class="r_p">代表此类杀号计划由算法师结合各类数学公式演算而成</div>
                </div>
                <div class="bottom_b">
                    <div class="l_top">统计：</div>
                    <div class="r_p">点击统计按钮展示计划的统计信息，按住拖动可移动按钮位置</div>
                </div>
            </div>
        </van-popup>
        
        <!-- 按钮 开始-->
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
        </div>
         <!-- 头部-->
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">公式杀号</span>
            <span class="sqzj iconfont iconbangzhu" :style="{'color':皮肤区分.color}" @click="show=true"></span>
        </div>
         <!-- 开奖时间-->
        <div class="开奖">
            <p> <span>距离&nbsp;</span><span class="be505c">2019105</span><span>&nbsp;期开奖&nbsp;</span><span class="be505c">32:43:40</span></p>
        </div>

        <div class="table">
            <van-tabs type="card" animated class="vantabs" sticky :offset-top="65" ref="vantabs">
                <!-- 正马杀号 -->
                <van-tab title="正码杀号" >
                    <div class="固定栏头部">
                        <div class="left">
                            <select class="期数">
                                <option value="volvo">20期</option>
                                <option value="saab">20期</option>
                                <option value="opel">40期</option>
                                <option value="audi">60期</option>
                            </select>
                            <span class="kaij">&nbsp;开奖</span>
                        </div>
                        <ul class="right">
                            <li>
                                <p>sin</p>
                                <p>公式</p>
                            </li>
                            <li>
                                <p>sin</p>
                                <p>公式</p>
                            </li>
                            <li>
                                <p>sin</p>
                                <p>公式</p>         
                            </li>
                            <li>
                                <p>sin</p>
                                <p>公式</p>
                            </li>
                            <li>
                                <p>sin</p>
                                <p>公式</p>
                            </li>
                        </ul>
                    </div>
                    <ul class="ul">
                        <li>
                            <div class="left_le">
                                <div class="left_num">105</div>
                                <div class="right_num"><span class="iconfont iconbangzhu"></span></div>
                            </div>
                            <ul class="gs_ul">
                                <li class="active_x">
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                            </ul>
                        </li>
                        <li v-for="(item, index) in 30" :key="index">
                            <div class="left_le">
                                <div class="left_num">105</div>
                                <div class="right_num">43,45,34,15,18</div>
                            </div>
                            <ul class="gs_ul">
                                <li>
                                    <p>14</p>
                                </li>
                                <li class="active_x">
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                                <li>
                                    <p>14</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="bottom_ul">
                        <li>
                            <div class="b_left">准确率</div>
                            <ul class="b_right">
                                <li>
                                    <p>25%</p>
                                </li>
                                <li>
                                    <p>25%</p>
                                </li>
                                <li>
                                    <p>25%</p>
                                </li>
                                <li>
                                    <p>25%</p>
                                </li>
                                <li>
                                    <p>25%</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="b_left">准确率</div>
                            <ul class="b_right">
                                <li>
                                    <p>21</p>
                                </li>
                                <li>
                                    <p>21</p>
                                </li>
                                <li>
                                    <p>21</p>
                                </li>
                                <li>
                                    <p>21</p>
                                </li>
                                <li>
                                    <p>21</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="b_left">准确率</div>
                            <ul class="b_right">
                                <li>
                                    <p>8</p>
                                </li>
                                <li>
                                    <p>8</p>
                                </li>
                                <li>
                                    <p>8</p>
                                </li>
                                <li>
                                    <p>8</p>
                                </li>
                                <li>
                                    <p>8</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </van-tab>
                  <!-- 特码杀号 -->
                <van-tab title="特码杀号" class="特码杀号_title">
                    
                             <div class="固定栏头部_tmsh">
                                <div class="left">
                                    <div class="期数_box top_q">
                                        <select class="期数">
                                            <option value="volvo">20期</option>
                                            <option value="saab">20期</option>
                                            <option value="opel">40期</option>
                                            <option value="audi">60期</option>
                                        </select>
                                    </div>
                                    <div class="haha top_q"> 开奖</div>
                                </div>
                                 <ul class="right">
                                    <li>
                                        <p>sin</p>
                                        <p>公式</p>
                                    </li>
                                    <li>
                                        <p>sec</p>
                                        <p>公式</p>
                                    </li>
                                    <li>
                                        <p>cos</p>
                                        <p>公式</p>         
                                    </li>
                                    <li>
                                        <p>sin</p>
                                        <p>公式</p>
                                    </li>
                                    <li>
                                        <p>sin</p>
                                        <p>公式</p>
                                    </li>
                                </ul>
                        </div>
                         
                         <ul class="ul_c">
                              <li>
                                   <div class="left">
                                    <div class="期数_box num_qs">
                                      117
                                    </div>
                                    <div class="haha"><span class="iconfont iconbangzhu"></span></div>
                                </div>
                                 <ul class="right">
                                    <li>
                                        <p>26</p>
                                    </li>
                                    <li>
                                        <p>39</p>
                                    </li>
                                    <li class="active_x">
                                        <p>41</p>      
                                    </li>
                                    <li>
                                        <p>32</p>
                                       
                                    </li>
                                    <li>
                                        <p>11</p>
                                    </li>
                                </ul>
                             </li>
                             <li  v-for="(item, index) in 40" :key="index">
                                   <div class="left">
                                    <div class="期数_box num_qs">
                                      117
                                    </div>
                                    <div class="haha"><div class="num_yuan">22</div></div>
                                </div>
                                 <ul class="right">
                                    <li>
                                        <p>26</p>
                                    </li>
                                    <li>
                                        <p>39</p>
                                    </li>
                                    <li class="active_x">
                                        <p>41</p>      
                                    </li>
                                    <li>
                                        <p>32</p>
                                       
                                    </li>
                                    <li>
                                        <p>11</p>
                                    </li>
                                </ul>
                             </li>
                         </ul>

                          <ul class=" ul_b">
                               <li class="_li" v-for="(item, index) in 3" :key="index">
                                 <div class="left huhu">
                                     <div clas="zq">准确率</div>
                                    
                                </div>
                                 <ul class="right">
                                    <li>
                                        <p>89%</p>
                                    </li>
                                    <li>
                                        <p>89%</p>
                                    </li>
                                    <li >
                                        <p>89%</p>      
                                    </li>
                                    <li>
                                        <p>89%</p>
                                       
                                    </li>
                                    <li>
                                        <p>89%</p>
                                    </li>
                                </ul>
                             </li>    
                         </ul>   
                </van-tab>
            </van-tabs>

        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            active: "",
            show: false,//弹框
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",

            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            },
            container:null
        }
    },
    components: { // 注册组件

    },
    created() {
    },
    mounted() {
        this.container=this.$refs.vantabs        
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
    methods: {
        点击函数(item) {
            console.log(item)
        },
        返回() {//头部
            history.back()
        },
        改变() {
            console.log(88)
        },
        返回() {//头部
            history.back()
        },
    }
}

</script>
<style lang="scss" scoped>

   .active_x {
                background-color: #f3fff2 !important;
            }


            .left {
                border-right: 1px solid #f0f0f0;
                display: flex;
                // width:40%;
                flex: 1;
                align-items: center;

                .num_qs{
                    font-size: _vw(12)
                }
                .top_q{
                    line-height: _vw(35) !important;
                }
                .期数_box{
                       width: 60%;
                        text-align: center;
                        line-height: _vw(25);
                    .期数 {
                        width: _vw(74);
                        height: _vw(26);
                        line-height: _vw(26);
                        text-align: center;
                        font-size: _vw(14);
                        border-radius: _vw(4);
                        background: #fff;
                    }
                }
                .haha {
                    font-size: _vw(14);
                    width: 40%;
                    text-align: center;
                    border-left: 1px solid #f0f0f0;
                    line-height: _vw(25);
                    box-sizing: border-box;
                    .iconbangzhu{
                       color:red;
                       font-weight: 600;
                    }
                    .num_yuan{
                        width: _vw(20);
                        height: _vw(20);
                        background: #d99513;
                        color:#fff;
                        border-radius: 50%;
                        line-height: _vw(20);
                        text-align: center;
                        margin:0 auto;
                        margin-top:_vw(2);
                        font-size: _vw(12);
                     
                    }
                }
            }
            .right {
                display: flex;
                align-items: center;
                width:60%;

                li {
                    width: 20%;
                    border-right: 1px solid #f0f0f0;
                    p {
                        margin: 0;
                        text-align: center;
                        font-size: _vw(12);
                    }
                }
            }



  .特码杀号_title{
      position: relative;
      .ul_c{
          >li{    
            border-bottom: 1px solid #f0f0f0;
             width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center; 
            .right{
                  .active_x {
                background-color: #f3fff2 ;
            } 
                li{
                    line-height: _vw(25);
                    background: #fff7f6;

                }
            }
          }
            
      }
        .固定栏头部_tmsh{
            position: absolute;
            top:_vw(35);
            left: 0px;
              width: 100%;
            background: #ffffff;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center; 
            .left,
            .right {
                height: _vw(34);
                // width: 50%;
            }
        }
        .ul_c{
            padding-top:_vw(70);
            height: 100%;
            overflow:auto;
        }
        .ul_b{
             position: absolute;
            bottom:_vw(0);
            left: 0px;
              width: 100%;
            width: 100%;
           
            .huhu{
                text-align: center !important;
                font-size: _vw(14);
                line-height: _vw(25);
                justify-content: center;
            }
            ._li{
               
                 width: 100%;
                 background: #faebd7; 
                display:flex;
                border-bottom: 1px solid #fff;
                p{
                    line-height: _vw(25);
                    border-left: 1px solid #fff  !important;

                }

            }
          
        }

        }


P{
    margin:0px;
     text-align: center;
    font-size: _vw(12);
}
.公式杀号 {
    height: 100%;
    .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(100);
        right: _vw(20);
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
        z-index: 40;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
            font-size: _vw(16)
        }
    }

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
        .C_zh {
            width: 90%;
            margin:0 auto;
            border-bottom-left-radius: _vw(10);
            border-bottom-right-radius: _vw(10);

            font-size: _vw(12);
            background: #FFFFFF;
            h3 {
                margin: 0px;
                padding: _vw(12) _vw(10) _vw(10) _vw(0);
            }
            p {
                margin: 0px;
            }
            padding: _vw(10);
            .bottom_b {
                display: flex;
                margin-top: _vw(10);
                margin-bottom: _vw(10);
                .l_top {
                    width: _vw(60);
                    font-size: _vw(14);
                    font-weight: 800;
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
        padding: _vw(0) _vw(6);
        .iconzuobian {
            font-size: _vw(17);
        }
        .text {
            font-size: _vw(16);
        }
        .iconbangzhu {
            font-size: _vw(19);
        }
    }
    .开奖 {
        position: fixed;
        top: _vw(35);
        left: 0px;
        width: 100%;
        height: _vw(30);
        font-size: _vw(12);
        line-height: _vw(35);
        background: #ffffff;
        z-index: 50;
        p {
            margin: 0px;
            text-align: center;
            .be505c {
                color: #be505c;
            }
        }
    }
    .table {
        height: 100%;
        padding: 63px 0px 0px;
        box-sizing: border-box;
      
        width: 100%;
      
        /deep/.van-tabs--card {
            padding-top: 0px;
            .van-tab {
                color: black;
                border: none;
            }
            .van-tabs__nav--card .van-tab {
            }
            .van-ellipsis{
                    line-height: _vw(35);
                    font-size: _vw(14)
             
            }
            .van-tabs__nav {
                  position: fixed;
                    top:_vw(65);
                    left:0px;
                    width: 100%;
                    z-index: 50;
                    height: _vw(35);
            }
            .van-tabs__nav--card {
                background: #f9e9cb;
                border: none;
                    line-height: _vw(35);
                // position: fixed;
                // top: _vw(65);
                // left: 0px;
                width: 100%;
                // z-index: 50;
                margin: 0px;
            }
            .van-tabs__nav--card .van-tab.van-tab--active {
                background: #d99513;
                color: #ffffff;
            }
        }
      


        .固定栏头部{
            position: fixed;
            top: _vw(35);
            left: 0px;
            width: 100%;
            z-index: 40;
            background: #ffffff;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left,
            .right {
                height: _vw(34);
                width: 50%;
            }
            .left {
                border-right: 1px solid #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                .期数 {
                    width: _vw(74);
                    height: _vw(26);
                    line-height: _vw(26);
                    text-align: center;
                    font-size: _vw(14);
                    border-radius: _vw(4);
                    background: #fff;
                }
                .kaij {
                    font-size: _vw(14);
                }
            }
            .right {
                display: flex;
                align-items: center;
                li {
                    width: 20%;
                    border-right: 1px solid #f0f0f0;
                    p {
                        margin: 0;
                        text-align: center;
                        font-size: _vw(12);
                    }
                }
            }
        }

        .ul {
            overflow: auto;
            height: 100%;
            padding-top:_vw(70);
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                border-bottom: 1px solid #f0f0f0;

                .left_le,
                .gs_ul {
                    width: 50%;
                    height: _vw(26);
                    font-size: _vw(13);
                    line-height: _vw(26);
                }
                .left_le {
                    border-right: 1px solid #f0f0f0;

                    display: flex;
                    align-items: center;
                    .left_num {
                        width: 20%;
                        text-align: center;
                        border-right: 1px solid #f0f0f0;
                    }
                    .right_num {
                        width: 80%;
                        text-align: center;
                        .iconbangzhu {
                            color: red;
                        }
                    }
                }
                .gs_ul {
                    width: 50%;
                    display: flex;
                    
                    li {
                        background-color: #fff7f6;
                        width: 20%;
                        line-height: _vw(26);
                        border-right: 1px solid #f0f0f0;
                        p {
                            width: 100%;
                            margin: 0;
                            text-align: center !important;
                        }
                    }
                }
            }
        }

        .bottom_ul {
            position: fixed;
            z-index: 50 ;
            left: 0px;
            bottom: _vw(0);
            background-color: #faebd7;
            width: 100%;
            li {
                border-bottom: 1px solid #fff;
                display: flex;
                justify-content: space-between;
                height: _vw(26);
                .b_left,
                .b_right {
                    width: 50%;
                    font-size: _vw(13);
                }
                .b_left {
                    text-align: center;
                    line-height: _vw(26);
                }
                .b_right {
                    display: flex;
                    justify-content: space-between;
                    li {
                        width: 20%;
                        line-height: _vw(26);
                        border-left: 1px solid #fff;
                        p {
                            width: 100%;
                            margin: 0;
                            text-align: center;
                            text-align: center !important;
                        }
                    }
                }
            }
        }



    }
    .vantabs{
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // /deep/ .van-tabs__wrap{
        //     flex-shrink: 0;
        // }
        /deep/ .van-tabs__content{
            height: 100%;
        }
        /deep/ .van-tab__pane-wrapper{
            height: 100%;
            display:flex;
        }
        /deep/ .van-tab__pane{
            height: 100%;
            // display:flex;
        }
    }
}
</style>
