
<template>
  <div class="content_tA">
                <div class="轮播">
                <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                    <van-swipe-item v-for="(item, index) in banner" :key="index">
                        <div class="lb_box_img" @click="go轮播(item)" ><img :src="configData.api_url+item.image" alt></div>
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
        <!-- ==============视频======================== -->
          <div class="immortal_box">
            <div class="table_titile">
              <div class="cotent">
                    <ul class="ul_title">
                        <li @click="tablego(0)" :class="{'titleActive':tableType ==0}">视频</li>
                        <li @click="tablego(1)" :class="{'titleActive':tableType ==1}">漫画</li>
                         <li @click="tablego(2)" :class="{'titleActive':tableType ==2}">小说</li>
                         <li @click="tablego(3)" :class="{'titleActive':tableType ==3}">有声小说</li>
                         <li @click="tablego(4)" :class="{'titleActive':tableType ==4}">直播</li>
                    </ul>
                </div>
                <div class="right" @click="go('/Videl')"><van-icon name="arrow" /></div>
            </div>
            <ul class="ul_content">
                <li  v-if="tableType==0" >
                        <div class="content_div" v-for="item in 3" >
                            <div class="img_box"><img src="@/assets/img/130.jpg" alt=""></div>
                            <div class="p_text">
                                <p class="text_left">美女</p>
                            </div>
                        </div>
                </li>
                   <li  v-if="tableType==1" >
                        <div class="关注">
                            <ul class="guanz_ul" >
                                <li v-for="(item,index) in 5">
                                    <div class="img_box"  @click="go('/cartoonMin')"><img src="../../assets/img/manhua/moban1.jpg" alt=""></div>
                                    <div class="name_title"  @click="go('/cartoonMin')">单元测</div>
                                    <div class="text_bottom">
                                        <div class="收藏 fac">第124话</div>
                                        <div class="titme fred" v-if="isActive"  @click="收藏()"><i class="iconfont iconshoucang  activeSC "></i></div>
                                        <div class="titme fred"   v-if="!isActive"  @click="收藏()"><i class="iconfont iconshoucang  activemr " ></i></div>
                                    </div>
                                </li>
                            </ul>
                        </div>  
                   </li>
                     <li  v-if="tableType==2" >
                          <div class="关注">
                            <ul class="img_shu">
                              <li v-for="(item,index) in 6">
                                <div class="left"><img src="../../assets/img/xiaoshuo/xiaoshuo1.jpg" alt=""></div>
                                <div class="right">
                                    <div class="book_t">儿媳妇</div>
                                    <div class="book_c">醉酒醒来以后，发现身边睡着的是美女院长
                                        醉酒醒来以后，发现身边睡着的是美女院长的是美女院长 的是美女院长 的是美女院长 的是美女院长 的是美女院长的是美女院长
                                    </div>
                                    <div class="bottom_b">
                                        <span class="span_i" @click="小说收藏()"  v-if="!xiaosSC"><span class="iconfont iconshoucang activeSC"></span>收藏</span>
                                        <span class="span_i" @click="小说收藏()"  v-if="xiaosSC"><span class="iconfont iconshoucang activemr" ></span>收藏</span>
                                        <span class="ck" @click="go('/fictionDetails')"> 查看</span>
                                    </div>
                                 </div>
                                </li>
                            </ul>
                         </div>
                    </li>
                         <li  v-if="tableType==3" >
                          <h1>有声小说内容</h1>
                        </li>
                           <li  v-if="tableType==4" >
                          <h1>直播内容</h1>
                        </li>
            </ul>
         </div>

  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import {获取首页轮播优惠,获取首页热门视频} from "@/api/首页.js"
export default {
    name: "",
    data() {
        return {
            configData:config,
            banner:[],//轮播图
            isActive:true,//漫画收藏
            xiaosSC:true,//小说收藏
            tableType:0,//视频默认显示索引
            manhType:0,//漫画默认显示索引
            xiaosType:0,//小说默认显示索引
            currentPage:1,//当前页
            zhongY:12,//总页数
            shiping:{},
            tab:[
                {
                    title:"视频",
                     shouchang:false, //false没有收藏功能 true有收藏功能
                    list:[
                        {
                            id:1,//每个视频的唯一值
                            img:require('../../assets/img/130.jpg'),//显示的图片
                            url:    require('../../assets/img/130.jpg'),//视频地址
                           
                        },
                         {
                            id:2,//每个视频的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            url:"",//视频地址
                           
                        }
                    ]
                   
                },
                 {
                    title:"漫画",
                      shouchang:true,
                      list:[
                        {
                            id:1,//每个漫画的唯一值
                            img:require('../../assets/img/130.jpg'),//显示的图片
                            scshow:1//  0表不收藏  1表收藏 
                        },
                         {
                            id:2,//每个，漫画的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:1//  0表不收藏  1表收藏 
                        }
                    ]
                },
                 {
                    title:"小说",
                      shouchang:true,
                     list:[
                        {
                            id:1,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        },
                         {
                            id:2,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        }
                    ]
                },
                  {
                    title:"小说",
                      shouchang:true,
                     list:[
                        {
                            id:1,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        },
                         {
                            id:2,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        }
                    ]
                },
                  {
                    title:"小说",
                      shouchang:true,
                     list:[
                        {
                            id:1,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        },
                         {
                            id:2,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        }
                    ]
                },
                  {
                    title:"小说",
                      shouchang:true,
                     list:[
                        {
                            id:1,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        },
                         {
                            id:2,//每个小说的唯一值
                            img:    require('../../assets/img/130.jpg'),//显示的图片
                            scshow:0//  0表不收藏  1表收藏 
                        }
                    ]
                },
            ]
        };
    },
    computed:{
     
    },
    created(){
       this.首页默认数据()
    },
    mounted() {
      
    },
    methods:{
        首页默认数据(){
            获取首页轮播优惠().then(x=>{
                this.banner=x.data.list
                }).catch(err=>{
                    console.log(err)
                })

            获取首页热门视频().then(x=>{
            //   console.log(x);
            if(x.data.code==1){
                this.shiping=x.data.data
            }else{
                console.log("失败")
            }
            }).catch(err=>{
            
            })
        },
        点击查看视频(item){
            this.$router.push("/discounts?id=" + item.id); 
        },
          go轮播(item){
                 this.$router.push("/discounts?id=" + item.id); 
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
          小说类型切换(index) {
            this.xiaosType = index
        },
        收藏(){  //漫画收藏
            this.isActive=!this.isActive;
        },
         小说收藏(){ 
            this.xiaosSC=!this.xiaosSC;
        }
    }
};
</script> 

<style lang="scss" scoped>
  .titleActive{
    color:red !important;
}
// .主页默认组件{
    .content_tA{
            width: 100%;
            height: 100%;
            padding-top:_vw(43);
                .轮播 {
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
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #f0f0f0;
                    height: _vw(40);
                    .left_l,.right_r{
                        width: 10%;
                        line-height: _vw(40);
                        text-align: center;
                        .icongengduo{
                            color:#ccc;
                        }
                    }
                    .left_l{
                        color:red;
                        font-size: _vw(14);
                    }
                    .content_c{
                        flex:1;
                        background:_vw(13);
                        .marquee{
                            line-height: _vw(40);
                            font-size: _VW(12);
                             font-size: _vw(14);
                        }
                    }
                }




  .immortal_box {
        padding: _vw(0) _vw(4) _vw(0) _vw(4);
        .table_titile {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                width: 30%;
                font-size: _vw(24);
                display: flex;
                align-items: center;
                font-weight: 500;
               .rm{
                   font-size: _vw(24);
                   line-height: _vw(34)
               }
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
                width: 10%;
                // height: _vw(25);
                line-height: _vw(25);
                font-size: _vw(16);
                // border-radius: _vw(4);
                // background: #ec304c;
                color: #acacac;
                text-align: right
            }
        }
            .ul_content {
                    height: _VW(200);
                    width: 100%;
                    li {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding-top:_vw(10);
                    .关注 {
                            background: #ffffff;
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
                                                line-height:_vw(30);
                                                font-size: _vw(14);
                                                }
                                            .book_c{
                                                height:_vw(58);
                                                overflow:hidden;
                                                text-overflow:ellipsis;
                                                display:-webkit-box;
                                                -webkit-line-clamp:3;
                                                -webkit-box-orient:vertical;
                                                font-size: _vw(14)
                                                
                                                }
                                                
                                            .bottom_b{
                                                display: flex;
                                                justify-content: space-between;
                                                font-size: _vw(12);
                                                    height: _vw(30);
                                                    line-height: _vw(30);
                                                    .ck{
                                                    color:#acacac;
                                                    }
                                                .span_i{
                                                    display: flex;
                                                    justify-content: space-between; 
                                                
                                                    .iconshoucang{
                                                        font-size: _vw(16);
                                                    } 
                                                    .activeSC{
                                                        color:red !important;
                                                    } 
                                                    .activemr{
                                                            color:#ACACAC !important;
                                                        }
                                                }
                                            } 
                                            }
                                        }
                                    }
                                    .guanz_ul {
                                        display: flex;
                                        flex-wrap: wrap;
                                        li {
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
                                                width: 86%;
                                                margin: 0px auto;
                                                text-align: center;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                overflow: hidden;
                                                font-size: _vw(14);
                                            }
                                            .text_bottom {
                                                display: flex;   
                                                width: 86%;
                                                margin: 0px auto;
                                                justify-content: space-between;
                                                .收藏 {
                                                    font-size: _vw(12);
                                                }
                                                .iconshoucang{
                                                    font-size: _vw(14);
                                                }
                                                .titme {
                                                    font-size: _vw(12);
                                                .activeSC{
                                                    color:#acacac  !important;
                                                }
                                                .activemr{
                                                    color:red  !important;
                                                    ;
                                                }
                                                }
                                            }
                                        }
                                    }
                    }
                     .content_div {
                                margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 88%;
                                    margin: 0px auto;
                                    height: _vw(100);
                                        background:#ec304c;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                         object-fit:contain;
                                            
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
                }

    }

        }
</style>



