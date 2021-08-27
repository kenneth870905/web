<template>
    <div class="主页">

      <div class="title">
          <div class="img_box"><img src="@/assets/img/logo.svg" alt=""></div>
      </div> 

        <div class="上半段">
            <van-swipe class="轮播" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in Allobj.LunBoTu"><img :src="configData.api_url+item" alt=""></van-swipe-item>
            </van-swipe>

            <div class="选项卡">
                <div class="更多" @click="更多()"><span class="text">更多</span><span class="icon">
                 <van-icon name="arrow" /></span></div>
                   <van-tabs v-model="active" animated class="明星"   @click="onClick">
                    <van-tab title="足球"  v-for="(item,index) in 专家列表数据" :title="item.title">
                        <ul class="ul_c">
                            <li  v-for="(keey,indexs) in item.minlist"  >
                                <div>
                                    <div class="img_box"><img :src="configData.api_url+keey.head" alt=""></div>
                                    <div class="name">{{keey.name}}</div>
                                </div>
                            </li>
                        </ul>
                    </van-tab>
                    <!-- <van-tab title="篮球">
                        <ul class="ul_c">
                            <li v-for="(keey,index) in 篮球专家" v-show="index<8">
                                <div>
                                    <div class="img_box"><img :src="configData.api_url+keey.head" alt=""></div>
                                    <div class="name">{{keey.name}}</div>
                                </div>
                            </li>
                        </ul>
                    </van-tab> -->
                </van-tabs>
            </div>

            <div class="content_c">
                <ul class="top">
                    <li v-for="(item,index) in Allobj.JingXuan">
                        <div class="右上角">精选</div>
                        <div class="title_bt"><span>[{{item.typeid==0?'足':'篮'}}] </span>{{item.footballLiveScore_status}} <span>{{item.start_time}}</span></div>
                        <div class="对">
                            <div class="dui_l">
                                <div class="left_img"><img :src="configData.api_url+item.homeTeamhead" alt=""></div>
                                <div class="dui_n">{{item.homeTeam_teamName}}</div>
                            </div>
                            <div class="dui_r">
                                {{item.footballLiveScore_homeScore}}
                            </div>
                        </div>
                        <div class="对">
                            <div class="dui_l">
                                <div class="left_img"><img :src="configData.api_url+item.guestTeamhead" alt=""></div>
                                <div class="dui_n">{{item.guestTeam_teamName}}</div>
                            </div>
                            <div class="dui_r">
                                {{item.footballLiveScore_guestScore}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

      <van-sticky >
   
        <div class="下半段">
       <div class="header">
             <ul class="顶部固定_titile" >
                <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">全部</li>

                 <li  @click="clicktite(1)" :class="{'titleActive':tableType ==1}">
                    <span>足球&nbsp;</span> <span class="iconfont" :class="zhuqshow==true ? 'iconxiangshang' : 'iconxiangxia'"></span>
                 </li>
                  
                 <li  @click="clicktite(2)" :class="{'titleActive':tableType ==2}">
                    <span>篮球&nbsp;</span> <span class="iconfont" :class="lanqshow==true ? 'iconxiangshang' : 'iconxiangxia'" ></span>
                 </li>
            </ul>

              <van-popup v-model="弹框显示隐藏" position="top" :style="{ height: '50%' }" overlay-class="huhuk"  @close="关闭弹出层时触发()"  >

                 <ul class="顶部固定_titile" :class="{ 'activedat': show==false}">
                    <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">全部</li>

                    <li  @click="clicktite(1)" :class="{'titleActive':tableType ==1}">
                        <span>足球&nbsp;</span> <span class="iconfont" :class="zhuqshow==true ? 'iconxiangshang' : 'iconxiangxia'"></span>
                    </li>
                    
                    <li  @click="clicktite(2)" :class="{'titleActive':tableType ==2}">
                        <span>篮球&nbsp;</span> <span class="iconfont" :class="lanqshow==true ? 'iconxiangshang' : 'iconxiangxia'" ></span>
                    </li>
                </ul>

                <div class="header_con 联赛"   v-if="tableType==1" >
                    <div class="kong">&nbsp;&nbsp;</div>
                    <ul class="c_c" v-show="mintable==0">
                        <li  :class="{'activepp':indexs==index}"  @click="选中类型(item,index,0)"   v-for="(item,index) in Allobj.ZuQiuLianSaiFenLei">{{item}}</li>
                    </ul>
                    <div class="rii"></div>
                </div>

                <div class="header_con 联赛"  v-if="tableType==2" >
                        <div class="kong">&nbsp;&nbsp;</div>
                        <div class="c_c"></div>
                    <ul class="rii" v-show="mintable==0">
                        <li   :class="{'activepp':indexs==index}"  @click="选中类型(item,index,1)"   v-for="(item,index) in Allobj.LanQiuLianSaiFenLei">{{item}}</li>
                    </ul>
                </div>
             </van-popup>               
           </div>
         </div>
        </van-sticky>
     
         <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
        <ul class="专家列表" v-if="objdata.total!==0" >
         <li v-for="(item,index)  in objdata.list" @click="查看方案详情(item)"> 
                 <div class="版心">
                     <div class="固定右">
                         <div class="up">
                              <span class="num"> {{item.MingZhongLv_avg*100}}</span>
                              <div class="j_g"><span class="b_f">%</span></div>
                         </div>
                         <div class="dow">命中率</div>
                     </div>
                     <div class="个人信息框">
                         <div class="tx_l"> <img :src="configData.api_url+item.head" alt=""></div>
                         <div class="tx_r">
                             <div class="name">{{item.name}}</div>
                             <div class="name_n">
                                 <span>{{item.type}}</span> 
                                 <div class="jing_l" v-if="item.ZuiJinZhanJi!=='' && item.lianhong!==null">{{item.ZuiJinZhanJi}}</div>
                                 <div class="l_h" v-if="item.lianhong!==0 && item.lianhong!==null ">{{item.lianhong}}连红</div>
                             </div>
                         </div>
                     </div>
                     <div class="精彩点评">早场西甲，巴伦西亚优势明显，埃瓦尔能否扛得住？</div>
    

                     <div class="对绝详情">
                         <div class="j_l"> 
                             <div class="j_B">[竞{{item.typeid==0 ? '足' : "篮"}}]</div>
                            <span class="type_d">{{item.start_time}}</span>
                            <span>{{item.league}}</span>
                            <span class="z_w">|</span>
                            <span>{{item.guestTeam_teamName}}</span>
                            <span>&nbsp;VS&nbsp;</span>
                            <span>{{item.homeTeam_teamName}}</span>
                         </div>
                         <div><van-icon name="arrow"/></div>
                     </div>
                     <div class="状态说明">
                         <span class="time_t">{{item.publishTime}}</span>
                     </div>
                 </div>
              </li>
           </ul>
              </van-list>
    </div>
</template>
<script>
import {所有专家数据 } from "@/api/专家.js"
import { 首页数据,首页专家列表} from "@/api/首页.js"
import { Toast } from "vant";
export default {
    data() {
        return {
            类型:"",
            足蓝区分:0,
            // league:"",//"" 为全部   
            参数:"",
            专家列表数据:[
                {
                    title:"足球",
                    minlist:[],
                },
                {
                      title:"篮球",
                      minlist:[],
                }
            ],
              objdata: {
                 list:[],
                 total:-1
              },
              currentPagerm: 0,//当前页数
               rowrm: 2,//每页返回多少行数据
               loading: false,
               Allobj: {
                LunBoTu: [],
                JingXuan: [],
            },
            configData: config,
            zhuqshow: false,//icon 足球的展开收起
            lanqshow: false,//icon 足球的展开收起
            弹框显示隐藏:false,
            active: 0,
            show: true,
            scrollTop: 0,
            tableType: 0, //0全部 1足球  2篮球
            mintable: 0,
            indexs: 0,
        }
    },
    components: { // 注册组件
         
    },
    computed: {
         finished(){
            if(this.objdata.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.objdata.total<=this.objdata.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        }
    },
    created() {
        this.请求所有数据的函数()
        // this.所有专家数据的函数()
          var obj={  class:"ZuQiuShouYe"}
             所有专家数据(obj).then(x=>{
                console.log(x.data.data.list)
                this.专家列表数据[0].minlist=x.data.data.list
            }).catch(err=>{
                console.log(err)
            })
    },

    methods: {
           onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
             if(this.tableType==0){ //点击的全部
                  var obj = {
                        league: "",// "" 为请求所有数据  "西假" 或 "德假"
                        page: this.currentPagerm,//当前页数
                        row: this.rowrm,//每页返回多少行数据
                    }
                this.专家列表(obj)
             }else{
                   var obj = {
                  league:this.类型,// "" 为请求所有数据  "西假" 或 "德假"
                 page: this.currentPagerm,//当前页数
                 row: this.rowrm,//每页返回多少行数据
                   typeid: this.足蓝区分//足球0 篮球1
               }

              this.专家列表(obj)
                //  this.专家列表() //再调取请求数据的函数
             }
           
        },
        查看方案详情(item){ this.$router.push("/PlanDetails?id=" + item.id );  },
        选中类型(item, index,num) {// item 选中的类型  index点击的索引  num 是足球还是篮球
                console.log(item)
          
                this.类型=item
                this.足蓝区分=num
                 this.弹框显示隐藏=false
                if(num==0){
                    this.zhuqshow=true
                }else{
                    this.lanqshow=true
                }
                this.indexs = index
                this.currentPagerm=1
                   var obj = {
                  league:this.类型,// "" 为请求所有数据  "西假" 或 "德假"
                 page: this.currentPagerm,//当前页数
                 row: this.rowrm,//每页返回多少行数据
                   typeid: this.足蓝区分//足球0 篮球1
            }

              this.专家列表(obj)

            this.zhuqshow = false 
        },
        请求所有数据的函数() {
            首页数据().then(x => {
                 this.Allobj = x.data.data
                  //    console.log(this.Allobj)
            }).catch(err => {
                console.log(err)
            })
        },

 
        专家列表(obj) {
         
            首页专家列表(obj).then(x => {

             if(x.data.code==1){
                 if(   this.objdata.total == 0){
                   console.log("没有数据的走这里")
                 }
                  console.log(x)
                    this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total 
                }else{
                    this.objdata.total = 0
                }
                this.loading=false 
                // this.list = x.data.data
            }).catch(err => {
                  this.objdata.total = 0
                   this.loading=false
                console.log(err)
            })
        },
        更多() {
                this.$router.push("/expert?type="+this.active );
        },
        onClick(name, title,item) {
                console.log(name)
                console.log(title)
             if(name==0){
                 this.参数="ZuQiuShouYe"
             }else if(name==1){
                  this.参数="LanQiuShouYe"
             }else{
                    console.log('报错了')
             }
             var obj={  class:this.参数 }
             所有专家数据(obj).then(x=>{
                console.log(x.data.data)
                 this.专家列表数据[name].minlist=x.data.data.list
            }).catch(err=>{
                console.log(err)
            })

            },
        clicktite(index) {
            this.tableType = index
            if (index == 0) {//如果点击的是全部
                this.弹框显示隐藏 = false //展开收起icon图标
                      var obj = {
                        league: "",// "" 为请求所有数据  "西假" 或 "德假"
                        page: this.currentPagerm,//当前页数
                        row: this.rowrm,//每页返回多少行数据
                    }
                this.专家列表(obj)

            } else {
                this.弹框显示隐藏 = true
                this.zhuqshow=true;
                this.lanqshow=true;
            }
            //  this.show=false
        },
        clickcont(index) {
            this.mintable = index
        },
        关闭弹出层时触发() {
             this.zhuqshow=false
             this.lanqshow=false
        //    console.log(11)
        }
    },
    destroyed() {
        //离开该页面需要移除这个监听的事件
        // window.removeEventListener('scroll', this.handleScroll)
    },

}
</script>

<style lang="scss" scoped>
// ==========tab title============================

//   /deep/.van-tabs--line .van-tabs__wrap{
//      height: _vw(40) !important;
//  }
//  /deep/.van-tab{
//      line-height: _vw(40) !important;
//      font-size: _vw(16) !important;
//  }

/deep/.van-tabs__nav {
    padding-right: _vw(34);
}
// /deep/.van-tabs__line{
//     width: _vw(62) !important;
// }
//  .van-tabs__line{
//      height:_vw(3) !important;
//  }
// ==========tab title============================

.主页 {
    // position: absolute;
    // left: 0px;
    // top: 0px;
    // width: 100%;
    // overflow-y: auto;
    padding-bottom: _vw(44);
    padding-top: _vw(44);
    box-sizing: border-box;
    .title {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 20;
        width: 100%;
        height: _vw(44);
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
        .img_box {
            width: 50%;
            height: 60%;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .上半段 {
        margin-bottom: _vw(4);
        .轮播 {
            height: _vw(155);
            background: palevioletred;
        }
        .选项卡 {
            position: relative !important;
            .更多 {
                // background: green !important;
                top: _vw(0);
                right: _vw(15);
                position: absolute !important;
                z-index: 10 !important;
                display: flex;
                align-items: center;
                color: #999999;
                .text {
                    font-size: _vw(12);
                    line-height: _vw(42);
                }
                .icon {
                    line-height: _vw(42);
                    font-size: _vw(12);
                    font-weight: 500;
                }
            }
            /deep/.van-tabs--line {
                padding-top: _vw(0) !important;
            }
            .明星 {
                background: #ffffff;

                .ul_c {
                    display: flex;
                    flex-wrap: wrap;
                    // padding-top:_vw(20);
                    li {
                        box-sizing: border-box;
                        padding: _vw(10);
                        width: 25%;
                        display: flex;
                        justify-content: center;
                        .img_box {
                            width: _vw(50);
                            height: _vw(50);
                            img {
                                border-radius: 50%;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .name {
                            text-align: center;
                            line-height: _vw(30);
                            font-size: _vw(14);
                        }
                    }
                }
            }
        }
        .content_c {
            padding: _vw(10) _vw(10) _vw(0) _vw(10);
            background: #ffffff;
            margin-top: _vw(10);
            .top {
                display: flex;
                justify-content: space-between;
                li {
                    width: 49%;
                    border: 1px solid #f3f0f0;
                    border-radius: _vw(4);
                    padding: _vw(4) _vw(10) _vw(0) _vw(10);
                    box-sizing: border-box;
                    position: relative;
                    margin-bottom:_vw(10);
                    .右上角 {
                        position: absolute;
                        right: 0;
                        top: 0;
                        background: #fc272e;
                        color: #fff;
                        width: _vw(40);
                        height: _vw(22);
                        line-height: _vw(22);
                        border-radius: 0 _vw(4) 0 _vw(18);
                        z-index: 1;
                        text-align: center;
                        font-size: _vw(12);
                    }
                    .title_bt {
                        font-size: _vw(12);
                        display: flex;
                        align-items: center;
                        margin-bottom: _vw(4);
                    }
                    .对 {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        line-height: _vw(30);
                        .dui_l {
                            display: flex;
                            align-items: center;

                            .left_img {
                                width: _vw(23);
                                height: _vw(23);
                                margin-right: _vw(4);
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .dui_n {
                                font-size: _vw(14);
                            }
                        }
                        .dui_r {
                            font-size: _vw(20);
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
    .ss {
        height: _vw(100);
        background: #e86b5c;
        position: sticky;
    }
    .ss_s {
        background: #65afff;
    }
    .下半段 {
        .header {
          
            .huhuk {
                height: _vw(500);
                background: #fc272e;
            }
            .顶部固定_titile {
                display: flex;
                justify-content: space-around;
                //  text-align: center;
                height: _vw(44);
                background: #ffffff;
                margin-top: 0;
                line-height: _vw(40);
                width: 100%;
                border-bottom: _vw(1) solid #e9e5e5;
                li {
                    text-align: left;
                    line-height: _vw(40);
                    font-size: _vw(14);
                    .iconfont {
                        color: #acacac;
                    }
                }
                .titleActive {
                    color: red;
                    .iconfont {
                        color: red;
                    }
                }
            }
            .header_con {
                position: absolute;
                top: _vw(40);
                left: _vw(0);
                width: 100%;
            }
            .联赛 {
                display: flex;
                justify-content: space-around;
                text-align: center;
                width: 100%;
                background: #ffffff;
                margin-top: _vw(20);
                .kong {
                    width: _vw(32);
                }

                .rii,
                .c_c {
                    line-height: _vw(40);
                    background: #ffffff;
                    overflow-y: auto;
                }
                  .activepp{
                        color:#f83900;
                    }

                .rii {
                    min-width: _vw(52);
                }
            }
        }

    }
    
        
    .专家列表 {
        width: 100%;
        padding: _vw(0) 0px _vw(0) _vw(0);

        overflow-y: auto;
        li {
            background: #ffffff;
            width: 100%;
            margin-bottom: _vw(4);
            padding-top: _vw(10);
            .版心 {
                width:94%;
                margin: 0 auto;
                position: relative;
                .固定右 {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    color: #e86b5c;
                    width: _vw(47);
                    height: _vw(47);
                    .up {
                        display: flex;
                        .num {
                            font-size: _vw(25);
                            font-weight: 1000;
                            font-family: alternategothicno2bt;
                        }
                        .j_g {
                            padding-top: _vw(2);
                            .b_f {
                                font-size: _vw(12);
                            }
                        }
                    }
                    .dow {
                        font-size: _vw(12);
                    }
                }
                .个人信息框 {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .tx_l {
                        width: _vw(40);
                        height: _vw(40);
                        margin-right: _vw(10);
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .tx_r {
                        .name {
                            font-size: _vw(14);
                        }
                        .name_n {
                            font-size: _vw(12);
                            display: flex;
                            span {
                                // font-size: _vw(13);
                            }
                            .jing_l,
                            .l_h {
                                border-radius: 0 _vw(6) _vw(6) _vw(10);
                                text-align: center;
                                padding: _vw(0) _vw(8) _vw(0) _vw(8);
                            }
                            .jing_l {
                                border: 1px solid #65afff;
                                color: #65afff;
                                margin: _vw(0) _vw(5);
                            }
                            .l_h {
                                background: rgba(255, 34, 34, 0.05);
                                border: 1px solid #f83900;
                                color: #f83900;
                            }
                        }
                    }
                }
                .精彩点评 {
                    margin: _vw(14) 0px;
                    font-size: _vw(14);
                }
                .对绝详情 {
                    display: flex;
                    justify-content: space-between;
                    font-size: _vw(12);
                    background: #f7f8fb;
                    line-height: _vw(24);
                    color: #666666;
                    box-sizing: border-box;
                    // padding: _vw(0) _vw(4) _vw(0) _vw(8);


                    .j_l {
                        display: flex;
                        font-size: _vw(12);
                        margin-left: _vw(4);
                        .j_B {
                            color: #65afff;
                        }
                        .type_d {
                            margin: 0 _vw(3) _vw(0) _vw(3);
                        }
                        .z_w {
                            margin: 0 _vw(6) _vw(0) _vw(6);
                        }
                    }
                }
                .状态说明 {
                    font-size: _vw(12);
                    line-height: _vw(40);
                    display: flex;
                    align-items: center;
                    .time_t {
                        color: #b4b4b4;
                    }
                    .dd {
                        color: #a07967;
                    }
                    .f_G {
                        margin: _vw(0) _vw(10);
                        color: #b4b4b4;
                    }
                    .红豆 {
                        width: _vw(12);
                        height: _vw(12);
                        background: url("~@/assets/img/hd.svg");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-position: center;
                        margin-right: _vw(7);
                    }
                }
            }
        }
    }
}
</style>