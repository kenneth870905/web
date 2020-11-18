<template>
    <div class="home">
        <topnav></topnav>

        <div class="轮播">
            <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <div class="lb_box_img" @click="go轮播(item)"><img :src="item" alt></div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="公告" @click="go('/announcement')">
            <div class="left_l">公告</div>
            <div class="content_c">
                <marquee  class="marquee"  direction="left" behavior="scroll" scrollamount="5"  loop="-1">
                    指整个Marquee对齐方式; (2)behavior:设置滚动的方式: scroll:表示由一端滚动到另一端,会重复,缺陷是不能无缝滚动。 slide:表示由一段滚动到另一端,不会重复...
                </marquee>
            </div>
            <div class="right_r"><span class="iconfont icongengduo"></span></div>
        </div>

        <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%视屏%%%%%%%%%%%%%%%%%%%%% -->
             <div class="彩票">
                <div class="固定" :class="{ active: 显示全部 }">
                    <div class="titleg" @click="显示全部=true" :class="{ active: 显示全部 }">热门</div>
                </div>
                <van-tabs class="table" v-model="type" @click="onClick" :class="{active:!显示全部}">
                    <van-tab  class="nav_n" v-for="(item, index) in 导航" :key="index" :title="item">
                    </van-tab>
                </van-tabs>

                <div class="content_tA" v-if="显示全部">
                  <ul class="ul_content">
                     <li v-if="tableType==0">
                            <div class="content_div" @click="go('videoContent')">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                    <p class="fred"><i class="iconfont iconshoucang"></i></p>
                                </div>
                                <div class="text_right">
                                   230645(6)
                                </div>
                            </div>
                             <div class="content_div" @click="go('videoContent')">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                    <p class="fred"><i class="iconfont iconshoucang"></i></p>
                                </div>
                                <div class="text_right">
                                   230645(6)
                                </div>
                            </div>
                             <div class="content_div" @click="go('videoContent')">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                    <p class="fred"><i class="iconfont iconshoucang"></i></p>
                                </div>
                                <div class="text_right">
                                   230645(6)
                                </div>
                            </div>
                             <div class="content_div" @click="go('videoContent')">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                    <p class="fred"><i class="iconfont iconshoucang"></i></p>
                                </div>
                                <div class="text_right">
                                   230645(6)
                                </div>
                            </div>
                      </li>
                    </ul>
                </div>




                <div class="content_t" v-if="index==type && !显示全部" v-for="(item,index) in 导航">
                <div v-if="item=='视频'">
                 <ship></ship>
                </div>
                
                <div v-if="item=='漫画'">
                 <manhua></manhua>
                </div>
                
                <div v-if="item=='小说'">
                  <xiaoshuo></xiaoshuo>
                </div>
                
                <div v-if="item=='有声小说'">
                  <youshenXS></youshenXS>
                </div>

                </div>
         </div>

        <!-- ==============视频======================== -->
        <!-- <div class="immortal_box">
            <div class="table_titile">
                <div class="left" @click="go('/Videl')">视频</div>
                <div class="cotent">
                    <ul class="ul_title">
                        <li @click="tablego(0)" :class="{'titleActive':tableType ==0}">最热</li>
                        <li @click="tablego(1)" :class="{'titleActive':tableType ==1}">中文</li>
                        <li @click="tablego(2)" :class="{'titleActive':tableType ==2}">港台</li>
                        <li @click="tablego(3)" :class="{'titleActive':tableType ==3}">日韩</li>
                        <li @click="tablego(4)" :class="{'titleActive':tableType ==4}">欧美</li>
                        <li @click="tablego(5)" :class="{'titleActive':tableType ==6}">国产</li>
                    </ul>
                </div>
                <div class="right" @click="go('/Videl')">更多视频</div>
            </div>
            <ul class="ul_content">
                <li v-if="tableType==0">
                    <div class="content_div">
                        <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                        <div class="p_text">
                            <p class="text_left">韩国美女热舞867</p>
                            <p class="fred"><i class="iconfont iconshoucang"></i></p>
                        </div>
                        <div class="text_right">
                            2019-03-12
                        </div>
                    </div>

                    <div class="content_div">
                        <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                        <div class="p_text">
                            <p class="text_left">韩国美女热舞867</p>
                            <p class="fred"><i class="iconfont iconshoucang"></i></p>
                        </div>
                        <div class="text_right">
                            2019-03-12
                        </div>
                    </div>

                    <div class="content_div">
                        <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                        <div class="p_text">
                            <p class="text_left">韩国美女热舞867</p>
                            <p class="fred"><i class="iconfont iconshoucang"></i></p>
                        </div>
                        <div class="text_right">
                            2019-03-12
                        </div>
                    </div>

                    <div class="content_div">
                        <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                        <div class="p_text">
                            <p class="text_left">韩国美女热舞867</p>
                            <p class="fred"><i class="iconfont iconshoucang"></i></p>
                        </div>
                        <div class="text_right">
                            2019-03-12
                        </div>
                    </div>
                </li>
                <li v-if="tableType==1">1</li>
                <li v-if="tableType==2">2</li>
                <li v-if="tableType==3">3</li>
                <li v-if="tableType==4">4</li>
                <li v-if="tableType==5">5</li>
            </ul>
        </div> -->

        <!-- ==============漫画======================== -->
        <!-- <div class="immortal_box">
            <div class="table_titile">
                <div class="left" @click="go('/cartoon')">漫画</div>
                <div class="cotent">
                    <ul class="ul_title">
                        <li @click="漫画切换(0)" :class="{'titleActive':manhType ==0}">热门</li>
                        <li @click="漫画切换(1)" :class="{'titleActive':manhType ==1}">分类</li>
                        <li @click="漫画切换(2)" :class="{'titleActive':manhType ==2}">连载</li>
                        <li @click="漫画切换(3)" :class="{'titleActive':manhType ==3}">排行</li>
                        <li @click="漫画切换(4)" :class="{'titleActive':manhType ==4}">完结</li>
                        <li @click="漫画切换(5)" :class="{'titleActive':manhType ==6}">免费</li>
                    </ul>
                </div>
                <div class="right" @click="go('/cartoon')">更多漫画</div>
            </div>
            <ul class="ul_content ">

                <li v-if="manhType==0">
                    <div class="关注">
                        <ul class="guanz_ul">
                            <li @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                            <li @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban4.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                            <li  @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban2.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                            <li  @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban3.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                            <li  @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                            <li  @click="go('/cartoonMin')">
                                <div class="img_box"><img src="../../assets/img/manhua/moban4.jpg" alt=""></div>
                                <div class="name_title">单元测试覆盖率单元测试覆盖率单元测试覆盖率</div>
                                <div class="text_bottom">
                                    <div class="收藏 fac">第124话</div>
                                    <div class="titme fac">6-17</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-if="manhType==1">1</li>
                <li v-if="manhType==2">2</li>
                <li v-if="manhType==3">3</li>
                <li v-if="manhType==4">4</li>
                <li v-if="manhType==5">5</li>
            </ul>
        </div> -->

        <!-- ==============小说======================== -->

        <!-- <div class="immortal_box">
            <div class="table_titile">
                <div class="left" @click="go('/fiction')">小说 </div>
                <div class="cotent">
                    <ul class="ul_title">
                        <li @click="小说切换(0)" :class="{'titleActive':xiaosType ==0}">热门</li>
                        <li  @click="go('/fiction')">分类 </li>
                        <li @click="小说切换(2)" :class="{'titleActive':xiaosType ==2}">连载</li>
                        <li @click="小说切换(3)" :class="{'titleActive':xiaosType ==3}">排行</li>
                        <li @click="小说切换(4)" :class="{'titleActive':xiaosType ==4}">完结</li>
                        <li @click="小说切换(5)" :class="{'titleActive':xiaosType ==5}">有声</li>
                    </ul>
                </div>
                <div class="right">更多小说</div>
            </div>
            <ul class="ul_content 小说">
                <li v-if="xiaosType==0">
                    <div class="content_t" v-if="tableType==0">
                        <div class="今天">
                            <ul class="ul_x">
                                <li class="li_x">
                                    <div class="left"> <img src="../../assets/img/wode4.png" alt=""></div>
                                    <div class="right">
                                        <h5>爱的意义|心灵是快乐的源泉</h5>
                                        <div>爱到底是什么呢</div>
                                        <div class="icon_box">
                                            <div class="tub">
                                               <span class="iconfont iconshoucang"></span><span class="text_s"> 收藏</span></div>
                                            <div class="tub">
                                                查看
                                            </div>

                                        </div>
                                    </div>
                                </li>

                                <li class="li_x">
                                    <div class="left"> <img src="../../assets/img/wode4.png" alt=""></div>
                                    <div class="right">
                                        <h5>爱的意义|心灵是快乐的源泉</h5>
                                        <div>爱到底是什么呢</div>
                                        <div class="icon_box">
                                            <div class="tub">
                                               <span class="iconfont iconshoucang"></span><span class="text_s"> 收藏</span></div>
                                            <div class="tub">
                                                查看
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li v-if="xiaosType==2">2</li>
                <li v-if="xiaosType==3">3</li>
                <li v-if="xiaosType==4">4</li>
                <li v-if="xiaosType==5">5</li>

            </ul>
        </div> -->

    </div>
</template>
<script>
const topnav = () => import('@/components/头部导航/头部导航.vue') //进入游戏组件
const ship = () => import('@/components/视频/视频.vue') //进入游戏组件
const manhua = () => import('@/components/漫画/漫画.vue') //进入游戏组件
const xiaoshuo = () => import('@/components/小说/小说.vue') //进入游戏组件
const youshenXS = () => import('@/components/有声小说/有声小说.vue') //进入游戏组件
export default {
    data() {
        return {
            show: false,
            tableType: 0,
            manhType: 0,
            xiaosType: 0,
            banner: [
                require('../../assets/img/banner1.jpg'),
                require('../../assets/img/banner2.jpg'),
                require('../../assets/img/banner3.jpg'),
            ],
             显示全部: true,
            type: 0,
            导航:[
                "视频",
                "漫画",
                "小说",
                "有声小说",
            ]


        }
    },
    components: { topnav,ship,manhua,xiaoshuo,youshenXS},// 注册组件


    computed: {

    },
    created() {

    },
    methods: {
           全部() {
            this.全部内容 = true
            this.active = 0
            this.isActive = true
        },
        onClick(name, title) {
            this.显示全部 = false    
        },
   
        go轮播(item){
          console.log(item)
        },
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
        tablego(index) {
            this.tableType = index
        },

        漫画切换(index) {
            this.manhType = index
        },
        小说切换(index) {
            this.xiaosType = index
        },


        搜索() {
            this.show = !this.show;
        },
        // clicktite(index) {
        //     this.tableType = index
        // },
        // go(url) {
        //     this.$router.history.push(url); //点击跳转的对应地址
        // }
    },
    mounted() {

    },
}


</script>

<style lang="scss" scoped>
  .content_tA{
            width: 100%;
            height: 100%;
            height: _vw(400);
            .ul_content {
                height: _VW(200);
                width: 100%;
                li {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    .content_div {
                        margin-bottom: _vw(20);
                        width: 50%;
                        .img_box {
                            width: 88%;
                            margin: 0px auto;
                            height: _vw(76);
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .p_text {
                            width: 88%;
                            margin: 0px auto;
                            display: flex;
                            justify-content: space-between;
                            color: #ff516b;
                        }

                        .text_right {
                            width: 88%;
                            margin: 0px auto;
                            color: #acacac;
                            text-align: right;
                            font-size: _vw(12);
                        }

                        p {
                            margin: 0px;
                            font-size: _vw(14);
                        }
                    }
                }
            }
        }








.titleActive {
    color: #ec304c;
    // border-bottom: 1px solid #ff516b;
}
.home {
    background: #ffffff;
    width: 100%;



    // ++++++++++++++++++table切花开始+++++++++++++++++++++++
.彩票 {
    margin-top:_vw(295);
    // height: 100%;
    background: #ffffff;
    overflow: auto;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
    // background: green;

    .table{
    /deep/ .van-tabs__line{
        display: none
    }
      /deep/ .van-tab--active{
          color: #7d7e80
    }
}
.table.active{
    /deep/ .van-tabs__line{
        display: block
    }
}

/deep/.active{
    color: red !important;
    font-size: 18px;
    font-weight: 700;
}

    .固定 {
        position: absolute;
        top: 0px;
        width: 100%;
            height:43px;

        .titleg {
            width:64px;
            height: 43px;
            line-height:43px;
            border-bottom:1px solid #eef0f5;
            text-align: center;
         
        }
      
    }
    /deep/.van-tabs__wrap{
        }
  .table {
         
        margin-left:64px;
        .nav_n{
        

        }
    }
}

// ++++++++++++++++++table切花结束+++++++++++++++++++++++




    .轮播 {
        margin-top: _vw(50);
        width: 100%;
        .lb_box_img {
            width: 100%;
            height: _vw(200);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .公告{
        // height:_vw(40);
        // background: #ec304c;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
        .left_l,.right_r{
            width: 10%;
            line-height: _vw(40);
            text-align: center;
            .icongengduo{
                color:#ccc;
            }
        }
        .content_c{
            flex:1;
            // background: green;
            .marquee{
                line-height: _vw(40)
            }
        }
    }

    .immortal_box {
        padding: _vw(10) _vw(4) _vw(0) _vw(4);
        .table_titile {
            display: flex;
            justify-content: space-between;
            align-items: center;
            //   background: gold;
            .left {
                width: 20%;
                font-size: _vw(24);
            }
            .cotent {
                width: 80%;
                .ul_title {
                    display: flex;
                    line-height: _vw(40);
                    align-items: center;
                    color: #acacac;
                    li {
                        font-size: _vw(15);
                        margin: _vw(0) _vw(4) _vw(0) _vw(4);
                    }
                }
            }
            .right {
                width: 20%;
                height: _vw(25);
                line-height: _vw(25);
                font-size: _vw(14);
                border-radius: _vw(4);
                background: #ec304c;
                color: #ffffff;
                text-align: center;
            }
        }

        .关注 {
            background: #ffffff;

            .guanz_ul {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                li {
                    margin-bottom: _vw(20);
                    width: 30%;
                    .img_box {
                        width: 86%;
                        margin: 0px auto;
                        height: _vw(120);
                        img {
                            border-radius: _vw(6) !important;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name_title {
                        width: 86%;
                        margin: 0px auto;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .text_bottom {
                        display: flex;
                        width: 86%;
                        margin: 0px auto;
                        justify-content: space-between;
                        .收藏 {
                            font-size: _vw(12);
                        }
                        .titme {
                            font-size: _vw(12);
                        }
                    }
                }
            }
        }



        .小说 {
            width: 100%;
            // height: 500px;
            > li {
                width: 100%;
                .content_t{
                width: 100%;
                    .今天 {
                    width: 100%;
                        background: #ffffff;
                        .ul_x{
                          width: 100%;
                            .li_x:nth-last-child(1) {
                                .right {
                                    border-bottom: none;
                                }
                            }
                        .li_x {
                         width: 100%;
                            padding: _vw(10) _vw(10) _vw(0) _vw(10);
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            .left {
                            max-width: 72px;
                            max-height: 72px;
                            margin-right: _vw(20);
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right {
                            padding-bottom: _vw(10);
                            flex: 1;
                            border-bottom: 1px solid #d8d2d2;
                            h5 {
                                margin: 0px;
                            }
                            .tub {
                                text-align: right;
                            
                            }
                            .icon_box {
                                margin-top: _vw(10);
                                display: flex;
                                justify-content: space-between;
                                .tub {
                                    display: flex;
                                     align-items: center;
                                     color:#acacac;
                                         font-size:_vw(14);
                                     .iconshoucang{
                                         font-size:_vw(14);
                                         color:red;
                                     }
                                  
                                }
                            }
                        }
                    }
                  }
                }
            }

                //   .li_ul_xiaoshuo{
                //         width: 100%;
                //         padding: _vw(0) _vw(4) _vw(0) _vw(4);
                //     li{
                //         width: 100%;
                //         display:flex;
                //       justify-content:space-between;
                //        border-bottom: 1px solid #ec304c;
                //        font-size: _vw(14);
                //        line-height: _vw(34);
                //        .top_right{
                //            color:#acacac;
                //            margin-right: _vw(4);
                //        }
                //        .top_left{
                //            margin-left: _vw(4);
                //        }
                //     }
                //   }
            }
        }
    }

    
}
</style>