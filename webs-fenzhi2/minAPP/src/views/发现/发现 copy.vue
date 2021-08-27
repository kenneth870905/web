<template>
<div class="发现">
       <div class="content">
        <div class="immortal_box">
              <div class="top_top">
                <div class="icon" @click="返回()"><van-icon name="arrow-left" /></div>
                <div class="c_c">发现你想要的</div>
               <div>&nbsp;</div>
            </div>
            
             <ul class="ul_title">
                 <li @click="clicktite(0)" >
                       <div class="nav_box"><img src="../../assets/img/wode4.png" alt=""></div>
                     <div class="text"  :class="{'titleActive':tableType ==0}">我的收藏</div>
                     </li>
                 <li @click="clicktite(1)" >
                     <div class="nav_box"><img src="../../assets/img/wode3.png" alt=""></div>
                     <div class="text"  :class="{'titleActive':tableType ==1}">热门推荐</div>
                     </li>
                 <li @click="clicktite(2)" >
                       <div class="nav_box"><img src="../../assets/img/wode4.png" alt=""></div>
                     <div class="text"  :class="{'titleActive':tableType ==2}">榜上排名</div>
                     </li>
                 <li @click="clicktite(3)">
                       <div class="nav_box"><img src="../../assets/img/wode5.png" alt=""></div>
                     <div class="text"  :class="{'titleActive':tableType ==3}">新品上架</div>
                  </li>
             </ul>
  
             <ul  class="ul_content">
                 <li v-if="tableType==0">
                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>漫画</div>
                        <ul class="guanz_ul">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 5">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测</div>
                            </li>
                        </ul>
                   </div>

                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconxiaoshuo"></span>小说</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                            
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>       
                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconyoushengxiaoshuo"></span>有声书</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"><span class="iconfont iconerji"></span></span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>
                 </li>
                 <li v-if="tableType==1">

                    <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>视频</div>
                         <div class="Ul_j">
                            <div class="content_div" v-for="item in 3">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                </div>
                            </div>
                        </div>
                   </div>
                     <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>漫画</div>
                        <ul class="guanz_ul">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 5">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测</div>
                            </li>
                        </ul>
                   </div>

                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconxiaoshuo"></span>小说</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>       
                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconyoushengxiaoshuo"></span>有声书</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                               醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"><span class="iconfont iconerji"></span></span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>
                 </li>
                 <li v-if="tableType==2">
                      <!-- <ul class="jia_ul_title">
                          <li >视频</li>
                          <li>漫画</li>
                          <li>小说</li>
                          <li>有声书</li>
                          <li>直播</li>
                          <li>huhu</li>
                      </ul> -->
                    <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>视频</div>
                         <div class="Ul_j">
                            <div class="content_div" v-for="item in 3">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                </div>
                            </div>
                        </div>
                   </div>
                     <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>漫画</div>
                        <ul class="guanz_ul">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 5">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测</div>
                            </li>
                        </ul>
                   </div>

                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconxiaoshuo"></span>小说</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>       
                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconyoushengxiaoshuo"></span>有声书</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                               醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"><span class="iconfont iconerji"></span></span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>
                 </li>
                 <li v-if="tableType==3">
                     <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>视频</div>
                         <div class="Ul_j">
                            <div class="content_div" v-for="item in 3">
                                <div class="img_box"><img src="../../assets/img/banner2.jpg" alt=""></div>
                                <div class="p_text">
                                    <p class="text_left">韩国美女热舞867</p>
                                </div>
                            </div>
                        </div>
                   </div>
                     <div class="关注">
                      <div class="title_type"><span class="iconfont iconmanhua"></span>漫画</div>
                        <ul class="guanz_ul">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 5">
                                <div class="img_box"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                <div class="name_title">单元测</div>
                            </li>
                        </ul>
                   </div>

                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconxiaoshuo"></span>小说</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                            醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>       
                  <div class="关注">
                      <div class="title_type"><span class="iconfont iconyoushengxiaoshuo"></span>有声书</div>
                        <ul class="guanz_ul_xs">
                            <li @click="go('/cartoonMin')" v-for="(item,index) in 3">
                                  <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                    <div class="right">
                                        <div class="book_t">儿媳妇</div>
                                        <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                               醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                        </div>
                                        <div class="bottom_b">
                                            <span class="ck" @click="go('/fictionDetails')"><span class="iconfont iconerji"></span></span>
                                        </div>
                                    </div>
                            </li>
                        </ul>
                   </div>


                 </li>
             </ul>
          </div>
     
     </div>
  
</div>
</template>

<script>
// const topnav = () => import('@/components/头部导航/头部导航.vue') //进入游戏组件
export default {
    data() {
        return {
             active: 2,
             tableType:0,
        }
    },
    components: { // 注册组件
    //    topnav,
    },
    created() {
      
        
    },
    computed: {
        
    },
      methods: {
             clicktite(index) {
            this.tableType = index
        },
           返回() {//头部
            history.back()
        },

    },
}


</script>
<style lang="scss" scoped>

.发现{
  .titleActive{
      color:red;
  }
    .content{
        .top_top{
            height: _vw(44);
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            background: #ffffff;
            padding-left: 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #f3ecec;
            .c_c,.icon{
                font-size: _vw(16)
            }
        }
        .immortal_box{
            width: 100%;
            min-height: 600px;
            .ul_title{ 
                position: fixed;
                left: 0px;
                top:_vw(44);
                z-index: 20;
                width: 100%;
                padding:_vw(10) _vw(0) _vw(10) _vw(0);
                margin-bottom: _vw(10);
                background:#ffffff;
                display: flex;
                justify-content: space-around;
                    width: 100%;  
                    align-items: center;
                
                    li{
                        width:_vw(60);
                       
                        .text{
                            font-size: _vw(15);
                            text-align: center;
                            
                        }
                        .nav_box{
                    border-radius: _vw(6);
                            font-size: _vw(14);
                            width:_vw(60);
                            height: _vw(60);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        }
                    }
            }
            .ul_content{
                    width: 100%;  
                    padding-top:_vw(150);
                    >li{
                        width: 100%;
                        //  .jia_ul_title{
                        //     display:flex;
                            
                        //     padding-left: _vw(10);
                        //     li{
                        //        width:20%;
                        //        height: _vw(28);
                        //        line-height: _vw(28);
                        //        font-size: _vw(14);
                        //        border-radius: _vw(25);
                        //        border:1px solid #acacac;
                        //        text-align: center;
                               
                        //     }
                        // }
                   .关注 {
                        background: #ffffff;
                        .title_type{
                            line-height: _vw(44);
                            font-size: _vw(15);
                            margin-left: _vw(10);
                            color:red;
                            .iconmanhua{
                                font-size: _vw(20);
                                color:red;
                            }
                            .iconxiaoshuo{
                                 font-size: _vw(20);
                                color:red; 
                            }
                            .iconyoushengxiaoshuo{
                                  font-size: _vw(20);
                                color:red; 
                            }
                        }
                            .img_shu{
                                    li{
                                        padding:_vw(0) _vw(10);
                                        display:flex;
                                        justify-content: space-between;
                                        margin-bottom:_vw(10);
                                        .left{
                                        margin-right:_vw(10);
                                        width: _vw(100);
                                        height: _vw(120);
                                        img{
                                            width: 100%;
                                            height: 100%;
                                        }
                                        }
                                        .right{
                                        border-bottom:1px solid #f0f0f0;
                                        flex:1;
                                        .book_t{
                                            font-weight: 600;
                                              height: _vw(30);
                                            line-height:_vw(31);
                                            }
                                        .book_c{
                                            height:_vw(60);
                                            overflow:hidden;
                                            text-overflow:ellipsis;
                                            display:-webkit-box;
                                            -webkit-line-clamp:3;
                                            -webkit-box-orient:vertical;
                                            font-size: _vw(14)
                                            
                                            }
                                        }
                                    }
                                }
                                .guanz_ul_xs {
                                    >li {
                                        padding:_vw(0) _vw(10);
                                        display:flex;
                                        justify-content: space-between;
                                        margin-bottom:_vw(10);
                                        .left{
                                        margin-right:_vw(10);
                                        width: _vw(100);
                                        height: _vw(120);
                                        img{
                                            width: 100%;
                                            height: 100%;
                                        }
                                        }
                                        .right{
                                        border-bottom:1px solid #f0f0f0;
                                        flex:1;
                                        .book_t{
                                            font-weight: 600;
                                            height: _vw(30);
                                            line-height:_vw(30);
                                            font-size: _vw(14)
                                            }
                                        .book_c{
                                            height:_vw(62);
                                            overflow:hidden;
                                            text-overflow:ellipsis;
                                            display:-webkit-box;
                                            -webkit-line-clamp:4;
                                            -webkit-box-orient:vertical;
                                            font-size: _vw(12)
                                            
                                            }
                                            
                                        .bottom_b{
                                            // display: flex;
                                            // justify-content: space-between;
                                            font-size: _vw(12);
                                                height: _vw(30);
                                                line-height: _vw(30);
                                                .ck{
                                                    display: block;
                                                    width: 100%;
                                                color:#acacac;
                                                text-align: right;
                                                }
                                        } 
                                        }


                                }

                                }

                                  .Ul_j{
                                        display: flex;
                                        justify-content: space-between;
                                        flex-wrap: wrap;
                                        padding-top:_vw(10); 
                            .content_div{
                               margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 88%;
                                    margin: 0px auto;
                                    height: _vw(100);
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

                                p {
                                    margin: 0px;
                                    font-size: _vw(14);
                                }
                                        }

                                  }
                                .guanz_ul {
                                    display: flex;
                                    flex-wrap: wrap;
                                    margin-bottom:_vw(10);
                                    >li {
                                        margin-bottom: _vw(20);
                                        width: 33.33%;

                                        .img_box {
                                            width: 86%;
                                            margin: 0px auto;
                                            height: _vw(146);
                                            img {
                                                border-radius: _vw(6) !important;
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }
                                        .name_title {
                                            width: 100%;
                                            margin: 0px auto;
                                            text-align: center;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            font-size: _vw(14);
                                        }
                                    }
                                }
                            }







                      
                    }
            }
        }
    }
    
}

</style>