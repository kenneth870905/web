
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
                 <div class="jaja">
                        <van-tabs @click="onClick">
                                <van-tab title="精彩视频" >
                                    <ul class="ship_ul">
                                            <li class="content_div" v-for="(keey,index) in shiping"   :key="index" @click="查看视频(keey)">
                                                <div class="img_box"><img :src="configData.api_url+keey.imgurl" alt=""></div>
                                                <div class="p_text">
                                                    <p class="text_left">{{keey.name}}</p>
                                                </div>
                                            </li> 
                                        </ul>
                                </van-tab>
                                <van-tab title="特色漫画" >
                                  <ul class="guanz_ul"   >
                                            <li v-for="(keey,index) in manhua" :key="index" @click="查看漫画(keey)">
                                                <div class="img_box" ><img :src="configData.api_url+keey.fengmian" alt=""></div>
                                                <div class="name_title" >{{keey.name}}</div>
                                            </li>
                                        </ul>
                                </van-tab>
                                <van-tab title="全能小说">
                                      <ul class="img_shu" >
                                            <li v-for="(keey,index) in xiaoshuo" :key="index" @click="查看小说(keey)">
                                                <div class="left"><img :src="configData.api_url+keey.fengmian" alt=""></div>
                                                <div class="right">
                                                    <div class="book_t">{{keey.name}}</div>
                                                    <div class="book_c">
                                                        {{keey.description}}
                                                    </div>
                                                    <div class="bottom_b">
                                                        <span></span>
                                                        <span class="ck" > 查看</span>
                                                    </div>
                                                </div>
                                                </li>
                                        </ul>
                                </van-tab>
                        </van-tabs>
                </div>
         </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {获取首页轮播优惠} from "@/api/首页.js"
import {热门漫画,热门小说,热门视频} from "@/api/首页.js"

export default {
    name: "",
    data() {
        return {
            configData:config,
            banner:[],//轮播图
            shiping:[],
            manhua:[],
            xiaoshuo:[],    

             tab:[
                "精彩视频",
                "特色漫画",
                "全能小说",
             ],
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
        查看视频(item){
                this.$router.push("/videoContent?id=" + item.id );
        },
           查看漫画(item){
                this.$router.history.push("/cartoonDetails?mhid="+ item.id); //点击跳转的对应地址
        },
           查看小说(item){
            this.$router.history.push("/fictionDetails?mhid="+ item.id); //点击跳转的对应地址
        },
          onClick(name, title,item){
          },
        首页默认数据(){
            获取首页轮播优惠().then(x=>{
                this.banner=x.data.list
                }).catch(err=>{
                    console.log(err)
                })

                热门视频().then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                      this.shiping=x.data.data.class[0].lbimg;
                    }
                }).catch(err=>{
                    console.log(err)
                })
                 热门小说().then(x=>{
                    if(x.data.code==1){
                           this.xiaoshuo=x.data.data.class[0].lb;
                    }
                }).catch(err=>{
                    console.log(err)
                })
                 热门漫画().then(x=>{
                    console.log(x)
                    if(x.data.code==1){
                         this.manhua=x.data.data.class[0].lb;
                    }
                }).catch(err=>{
                    console.log(err)
                })
       
              console.log(2,this.shiping)

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
        /deep/.van-tabs__wrap{
            z-index:2;
        }
         .jaja{
            /deep/ .van-tab{
                  color:black;
              }

              
              .ship_ul{
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding-top:_vw(60);

                           .content_div {
                                margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 88%;
                                    margin: 0px auto;
                                    height: _vw(100);
                                  
                                        background:#d1cece;

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


                   .guanz_ul {
                                    padding-top:_vw(60);
                                     padding-top:_vw(60);
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
                                    }
                                }

                             .img_shu{
                                   padding-bottom: _vw(100);
                                    li{
                                        padding:_vw(0) _vw(10);
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
                                                color:#817b7b;
                                                }
                                            
                                        } 
                                        }
                                    }
                                }
         }
    }

        }
</style>



