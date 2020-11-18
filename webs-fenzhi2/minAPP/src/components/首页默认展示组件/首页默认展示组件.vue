
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
                 {{公告内容}}
                </marquee>
            </div>
            <div class="right_r"><span class="iconfont icongengduo"></span></div>
        </div>
        <!-- ==============视频======================== -->
          <div class="immortal_box" v-if="shiping.length>0">
            <div class="table_titile">
                <div class="left" @click="go('/Videl')">视频</div>
                <div class="right" @click="go('/Videl')">更多视频&nbsp;<span class="iconfont icongengduo"></span></div>
            </div>
                <ul  class="ship_ul">
                   <li class="content_div" v-for="(keey, index) in shiping "  v-show="index<6"  :key="index" @click="查看视频(keey)">
                        <div class="img_box"><img :src="configData.api_url+keey.imgurl" alt=""></div>
                        <div class="p_text">
                            {{keey.title}}
                        </div>
                    </li>
                </ul>
         </div>
          
        <!-- ==============漫画======================== -->
        <div class="immortal_box" v-if="manhua.length>0">
            <div class="table_titile" @click="go('/cartoon')">
                <div class="left" >漫画</div>
                <div class="right" >更多漫画&nbsp;<span class="iconfont icongengduo"></span></div>
            </div>
            <ul class="guanz_ul">
                <li v-for="(keey,index) in manhua" v-show="index<6"  @click="查看漫画(keey)">
                    <div class="img_box"><img :src="configData.api_url+keey.fengmian" alt=""></div>
                    <div class="name_title" >{{keey.name}}</div>
                </li>
            </ul>
        </div>

          <!-- ==============小说======================== -->
        <div class="immortal_box"  v-if="xiaoshuo.length>0">
            <div class="table_titile" @click="go('/cartoon')">
                <div class="left" >小说</div>
                <div class="right">更多小说&nbsp;<span class="iconfont icongengduo"></span></div>
            </div>
            <ul class="img_shu">
                <li v-for="(keey,index) in xiaoshuo"  v-show="index<6"   @click="查看小说(keey)">
                    <div class="left"><img  :src="configData.api_url+keey.fengmian" alt=""></div>
                    <div class="right">
                        <div class="book_t">{{keey.name}}</div>
                        <div class="book_c">{{keey.description}} </div>
                        
                        <div class="bottom_b">
                            <span></span>
                            <!-- <span class="span_i" @click="小说收藏()"  v-if="!xiaosSC"><span class="iconfont iconshoucang activeSC"></span>收藏</span>
                            <span class="span_i" @click="小说收藏()"  v-if="xiaosSC"><span class="iconfont iconshoucang activemr" ></span>收藏</span> -->
                            <span class="ck" > 查看</span>
                        </div>
                        </div>
                </li>
            </ul> 
        </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import {获取公告} from "@/api/公告.js"
import {漫画详情页} from "@/api/漫画.js"
import { Toast } from 'vant';
import {获取首页轮播优惠,热门视频,热门漫画,热门小说,} from "@/api/首页.js"
import {小说详情页} from "@/api/小说.js"
import { 视频播放页 } from "@/api/视频.js"
export default {
    name: "",
    data() {
        return {
            configData:config,
            banner:[],//轮播图
            // isActive:true,//漫画收藏
            xiaosSC:true,//小说收藏
            tableType:0,//视频默认显示索引
            manhType:0,//漫画默认显示索引
            xiaosType:0,//小说默认显示索引
            currentPage:1,//当前页
            zhongY:12,//总页数

            shiping:[],
            manhua:[],
            xiaoshuo:[],

             公告内容:""
        };
    },
    computed:{
     
    },
    created(){
       this.首页默认数据()
       this.获取公告函数()
    },
    mounted() {
      
    },
    methods:{
      获取公告函数(){
           获取公告().then(x=>{
              this.公告内容=x.data.list[0].content
               console.log(x)
           }).catch(err=>{
            console.log(err)
           })
        },

        首页默认数据(){
            获取首页轮播优惠().then(x=>{
                this.banner=x.data.list
                }).catch(err=>{
                    console.log(err)
                })

            热门视频().then(x=>{
            if(x.data.code==1){
                this.shiping=x.data.data.class[0].lbimg;
                console.log(x.data.data)
            }else{
                console.log("失败")
            }
            }).catch(err=>{
            
            })
            热门小说().then(x=>{
                    if(x.data.code==1){
                           this.xiaoshuo=x.data.data.class[0].lb
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

        },
        查看视频(item){
            var obj = { id: item.id, check_status:1,  }
            视频播放页(obj).then(x => {
                if (x.data.code == 1) {
                     if(x.data.data.usePoints!==0){
                        Toast(x.data.data.usePoints)
                     }
                   this.$router.push("/videoContent?id=" + item.id );
                } else {
                     if(x.data.code == -9){
                    Dialog.confirm({
                    title: x.data.msg,
                    message:"是否跳转到登录页",
                    className: "tanchukuang",
                     }).then(() => {
                            this.$router.push('/login');
                        }).catch(() => {

                        });
                    }else{
                        Toast(x.data.msg)
                    }

                }
            }).catch(err => {
                console.log(err)
            })
        },
        查看漫画(item){
             var obj={ id: item.id, check_status:1,}  
              漫画详情页(obj).then(x=>{
                        if(x.data.code==1){
                             if(x.data.data.usePoints!==0){
                              Toast(x.data.data.usePoints)
                              }
                             this.$router.history.push("/cartoonDetails?mhid=" + item.id); //点击跳转的对应地址
                        }else{
                              if(x.data.code == -9){
                                Dialog.confirm({
                                title: x.data.msg,
                                message:"是否跳转到登录页",
                                className: "tanchukuang",
                                }).then(() => {
                                        this.$router.push('/login');
                                    }).catch(() => {

                                    });
                                }else{
                                    Toast(x.data.msg)
                                }

                        }
                    }).catch(err=>{
                        console.log(err)
                    })
        },
 
           查看小说(item){
                var obj = { id: item.id, check_status:1,} //漫画唯一id ;
                小说详情页(obj).then(x => {
                    if (x.data.code == 1) {
                         if(x.data.data.usePoints!==0){
                             Toast(x.data.data.usePoints )
                        }
                      this.$router.history.push("/fictionDetails?mhid="+ item.id); //点击跳转的对应地址
                    } else {
                        if(x.data.code == -9){
                            Dialog.confirm({
                        title: x.data.msg,
                        message:"是否跳转到登录页",
                        className: "tanchukuang",
                        }).then(() => {
                                this.$router.push('/login');
                            }).catch(() => {

                            });
                        }else{
                            Toast(x.data.msg)
                        }

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
          go轮播(item){
                 this.$router.push("/discounts?id=" + item.id); 
          console.log(item)
         },
          go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },

           漫画切换(index) {
            this.manhType = index
        },
          小说类型切换(index) {
            this.xiaosType = index
        },
 
         小说收藏(){ 
            this.xiaosSC=!this.xiaosSC;
        }
    }
};
</script> 

<style lang="scss" scoped>

// .主页默认组件{
    .content_tA{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0px;
            top:0px;
            overflow-y:auto;
            padding-top: _vw(43);
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
                            font-size: _vw(14);
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
              margin:_vw(10) _vw(10);
            .left {
                width: 20%;
                font-size: _vw(24);
            }
           
            .right {
                // width: 20%;
                height: _vw(25);
                line-height: _vw(25);
                font-size: _vw(14);
                border-radius: _vw(4);
                // background: #ec304c;
                color: #ec340c;
                text-align: center;
                display:flex;
                .iconfont{
                   font-size: _vw(14);
                }
            }
        }
           .img_shu{ //小说
                padding-bottom: _vw(60);
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
                                    font-size: _vw(14);
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
         .guanz_ul { //漫画
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
         .ship_ul { //视频
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding-top:_vw(10);
                            .content_div {
                                margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 96%;
                                    margin: 0px auto;
                                    height: _vw(100);
                                    // background: rgba(0,0,0,0.2);
                                        background: rgba(121, 90, 90, 0.2);
                                    img {
                                        width: 100%;
                                        height: 100%;
                                       object-fit:contain;
                                    }
                                }
                                .p_text {
                                    width: 88%;
                                    margin: 0px auto;
                                    color: #ff516b;
                                    padding: _vw(0) _vw(10);
                                    font-size: _vw(14);
                                    overflow:hidden; //超出的文本隐藏
                                    text-overflow:ellipsis; //溢出用省略号显示
                                    white-space:nowrap; 
                                }
                               
                            }
                        }

         }

        }
</style>



