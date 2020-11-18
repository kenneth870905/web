<template>
    <div class="专家">
        <van-popup v-model="弹出框" :close-on-click-overlay="false" round>
            <div class="关闭弹框">
                <div></div>
                <div @click="弹出框=false"><span class="iconfont icon2guanbi"></span></div>
            </div>
            <div class="弹出内容框">
                <div class="热门title">
                    <div class="bs"></div>
                    <div class="热门赛事">近期命中率</div>
                </div>
                <p>
                    以实际命中场次数显示最近N场中了X场,以及相应的百分数。
                </p>
                <div class="热门title">
                    <div class="bs"></div>
                    <div class="热门赛事">平均赔率</div>
                </div>
                <p>
                    以月为单位，该月所有场次赔率相加/场次数，其中双选的赔率折算成单选。
                </p>

            </div>
        </van-popup>

        <div class="标题栏">
            <div class="固定" @click="弹出框=true"><span class="iconfont iconbangzhu"></span></div>
            <ul class="title_ul">
                <li :class="{'activebt':type==0}" @click="clicktab(0)">关注</li>
                <li :class="{'activebt':type==1}" @click="clicktab(1)">足球</li>
                <!-- <li :class="{'activebt':type==2}" @click="clicktab(2)">篮球</li> -->
            </ul>
        </div>
        <div class="关注" v-if="type==0">
            <van-tabs v-model="关注active" animated>
                <van-tab v-for="(item,index) in 关注" :title="item.xingx==0 ?item.title:item.title+'(' +item.xingx+')'">

                   <div class="没有关注的内容" @click="$router.push('/login')"   v-if="!是否有登录">
                        <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                        <div class="提示文字">你还没有登录,请点击进行登录</div>
                    </div>
                    <div v-else>
                        <div class="没有关注的内容"  v-if="关注专家show">
                            <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                            <div class="提示文字" v-if="关注active==0"> {{关注active==0 ? '您还没有关注的专家' : '您关注的专家暂无方案'}} </div>
                        </div>

                        <ul class="ul_c" v-else>
                            <li class="关注的专家方案" v-for="(item,index) in  关注的专家方案数据" v-show="关注active==1" @click="查看方案详情(item )">
                                <div class="top">
                                    <div class="img_box"  @click.stop="查看专家详情的函数(item)" ><img :src="configData.api_url+item.head" alt=""></div>
                                    <div class="r_div">
                                        <p class="name">{{item.name}}</p>
                                        <p class="type">{{item.type}}</p>
                                    </div>
                                </div>
                                <p class="niaoy">
                                <span class="lcfa" v-if="item.identify!=='' && item.identify!==null">[{{item.identify}}]</span>
                                    {{item.title}}</p>
                                <div class="dui_box">
                                    <div class="dui">
                                        <div class="div">竞{{item.typeid==0 ? '足' :'篮'}}</div>
                                        <span class="type_d">{{item.start_time}}</span>
                                        <span class="bei">{{item.league}}</span>
                                        <span class="biaog">|</span>
                                        <span>{{item.homeTeam_teamName}}</span>
                                        <span>&nbsp;VS&nbsp;</span>
                                        <span>{{item.guestTeam_teamName}}</span>
                                    </div>
                                    <div class="icon_box">
                                        <van-icon name="arrow" />
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="left_b"><span>{{item.publishTime}}</span>前发布</div>
                                </div>
                            </li>

                            <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                                <li v-show="关注active==0" v-for="(item,index) in objdata.list" class="关注li" @click="查看专家详情(item,'gz')">
                                    <div class="top_z ">
                                        <div class="left">
                                            <div class="div_box"><img :src="configData.api_url+item.head" alt=""></div>
                                        </div>
                                        <div class="right">
                                            <div class="l_r">
                                                <p class="last_child"><span class="name">{{item.name}}</span></p>
                                                    <p><span class="pl" >{{item.type}}</span></p>
                                                <p class="pl"> 近期命中率&nbsp;<span>{{item.MingZhongLv_avg * 100}}%</span></p>
                                                <p class="pl">平均培率&nbsp;<span>{{item.pingjunpeilv}}</span></p>
                                            </div>
                                            <div class="r_r">
                                                <Chartsdata :Objdata="item.MingZhongLv" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="方案提醒" v-if="item.planNewCount!==''">
                                        <div class="left">
                                            <div class="dian"></div>
                                            <span>{{item.planNewCount}}

                                            </span>
                                        </div>
                                        <div class="right">
                                            <van-icon name="arrow" />
                                        </div>
                                    </div>
                                </li>
                            </van-list>
                        </ul>
                    </div>

                </van-tab>

                
            </van-tabs>
        </div>

        <div class="足球" v-if="type==1">
            <van-tabs v-model="足球active" animated @click="onClick">
                <van-tab :title="足球list[0].title">
                    <ul class="ul_c"  >
                        <li class="足球li" v-for="(items,indexmin) in  足球list[0].minlist " @click="查看专家详情(items)">
                            <div class="top_z">
                                <div class="left">
                                    <div class="div_box"><img v-lazy="configData.api_url+items.head" :src="configData.api_url+items.head" alt=""></div>
                                    <div class="btn" :class="{'showgz':items.isCollect==0}" @click.stop="是否关注的函数(items)">{{items.isCollect==0 ? '关注' : '已经关注'}}</div>
                                </div>
                                <div class="right">
                                    <div class="l_r">
                                        <p class="last_child"><span class="name">{{items.name}}</span></p>
                                        <div class="pl" >
                                            <span>{{items.type}}</span>
                                            <div class="jing_l">{{items.ZuiJinZhanJi}}</div>
                                            <div class="l_h" v-if="items.lianhong!==0">{{items.lianhong}}连红</div>
                                        </div>
                                        <p class="pl">平均培率&nbsp;<span>{{items.pingjunpeilv}}</span></p>
                                    </div>
                                    <div class="qi">
                                        <div class="nub_b">
                                            <div class="max_q">{{ items.yinglilv}}</div>
                                            <div class="bfb">%</div>
                                        </div>

                                        <div class="sh"> 盈利率</div>

                                        <div class="bj"><span class="iconfont iconjiangpai"></span></div>
                                    </div>
                                  
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-tab>

                <van-tab :title="足球list[1].title">

                     <div class="没有关注的内容"  @click="$router.push('/login')" v-if="足球list[1].minlist.length==0">
                        <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                        <div class="提示文字"  >暂无人气数据，请到别处去看看吧!</div>
                    </div>

                    <ul class="ul_c" v-if="足球list[1].minlist.length!==0">
                        <li class="足球li" v-for="(items,indexmin) in  足球list[1].minlist " @click="查看专家详情(items)">
                            <div class="top_z">
                                <div class="left">
                                    <div class="div_box"><img v-lazy="configData.api_url+items.head" :src="configData.api_url+items.head" alt=""></div>
                                    <div class="btn" :class="{'showgz':items.isCollect==0}" @click.stop="是否关注的函数(items)">{{items.isCollect==0 ? '关注' : '已经关注'}}</div>
                                </div>

                                <div class="right">
                                    <div class="l_r">
                                        <p class="last_child"><span class="name">{{items.name}}</span><span class="sf" v-show="足球active==2">篮球评论员</span></p>
                                        <div class="pl" >
                                            <span>{{items.type}}</span>
                                            <div class="jing_l">{{items.ZuiJinZhanJi}}</div>
                                            <div class="l_h" v-if="items.lianhong!==0">{{items.lianhong}}连红</div>
                                        </div>
                                        <p class="pl" >新增加粉丝&nbsp;<span>{{items.fans}}</span></p>
                                    </div>
                                    <div class="qi" >
                                        <div class="nub_b">
                                            <div class="max_q" >{{ items.yinglilv}}</div>
                                            <div class="hot" v-show="足球active==1">
                                                <van-icon name="fire" class="hot_s" />
                                            </div>
                                        </div>

                                        <div class="sh">周人气值</div>
                                        <div class="bj" ><span class="iconfont iconjiangpai"></span></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </van-tab>

                <van-tab :title="足球list[2].title">
                      <ul class="ul_c" v-if="足球active==2">
                        <van-list class="ul外容器" v-model="loadingZQ" :offset="10" :finished="finishedZQ" :finished-text="足球list[2].total==0 ? '暂无数据' : '没有更多了'" @load="onLoadZQ">
                            <li class="足球li" v-for="(items,indexmin) in  足球list[2].minlist " @click="查看专家详情(items)">
                                <div class="top_z">
                                    <div class="left">
                                        <div class="div_box"><img v-lazy="configData.api_url+items.head" :src="configData.api_url+items.head" alt=""></div>
                                        <div class="btn" :class="{'showgz':items.isCollect==0}" @click.stop="是否关注的函数(items)">{{items.isCollect==0 ? '关注' : '已经关注'}}</div>
                                    </div>
                                    <div class="right">
                                        <div class="l_r">
                                            <p class="last_child"><span class="name">{{items.name}}</span></p>
                                            <p><span class="pl" >{{items.type}}</span></p>
                                            <p class="pl">近期命中&nbsp; <span>{{items.MingZhongLv_avg}}%</span> </p>
                                            <p class="pl">平均培率&nbsp;<span>{{items.pingjunpeilv}}</span></p>

                                        </div>
                                        <div class="r_r">
                                            <echartsDataZhuqiu :Objdata="items.MingZhongLv" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </van-list>
                    </ul>
                 </van-tab>
               </van-tabs>
        </div>

        <div class="篮球" v-if="type==2">
            <van-tabs v-model="篮球active" animated @click="LaQiuonClick">
                <van-tab v-for="(value,key,index) in 篮球list" :title="value.title">
                    <ul class="ul_c">
                        <li class="篮球li" v-for="(items,indexmin) in  value.minlist " @click="查看专家详情(items)">
                            <div class="top_z">
                                <div class="left">
                                    <div class="div_box"><img v-lazy="configData.api_url+items.head" :src="configData.api_url+items.head" alt=""></div>
                                    <div class="btn" :class="{'showgz':items.isCollect==0}" @click="是否关注的函数(items)">{{items.isCollect==0 ? '关注' : '已经关注'}}</div>
                                </div>
                                <div class="right">
                                    <div class="l_r">
                                        <p class="last_child"><span class="name">{{items.name}}</span><span class="sf" v-show="篮球active==1">{{items.type}}</span></p>
                                        <div class="pl" v-show="篮球active==0">
                                            <span>{{items.type}}</span>
                                            <div class="jing_l">{{items.ZuiJinZhanJi}}</div>
                                            <div class="l_h" v-if="items.lianhong!==0">{{items.lianhong}}连红</div>
                                        </div>
                                        <p class="pl" v-show="篮球active==1">近期命中&nbsp; <span>{{items.MingZhongLv_avg}}%</span> </p>

                                        <p class="pl" v-show="篮球active==1">平均培率&nbsp;<span>{{items.pingjunpeilv}}</span></p>
                                        <p class="pl" v-show="篮球active==0">新增加粉丝&nbsp;<span>{{items.fans}}</span></p>
                                    </div>
                                    <div class="qi" v-show="篮球active==0">
                                        <div class="nub_b">
                                            <div class="max_q">{{items.yinglilv}}</div>
                                            <div class="hot">
                                                <van-icon name="fire" class="hot_s" />
                                            </div>
                                        </div>

                                        <div class="sh">周人气值 </div>
                                        <div class="bj"><span class="iconfont iconjiangpai"></span></div>
                                    </div>
                                    <div class="r_r" v-show="篮球active==1">
                                        <echartsDataLanqiu :Objdata="items.MingZhongLv" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import { 关注列表, 添加关注, 取消关注, 所有专家数据, 关注的专家方案 } from "@/api/专家.js"
import { 首页数据 } from "@/api/首页.js"
import {  mapState,mapMutations } from 'vuex' 

const Chartsdata = () => import('@/views/echartsData/echartsData.vue') //进入游戏组件
const echartsDataLanqiu = () => import('@/views/echartsData/echartsDataLanqiu.vue') //进入游戏组件
const echartsDataZhuqiu = () => import('@/views/echartsData/echartsDataZhuqiu.vue') //进入游戏组件
import { Toast } from 'vant';
export default {
    data() {
        return {
            // ===================关注专家=====================
            objdata: {
                list: [],
                total: -1
            },
            currentPagerm: 0,//当前页数
            rowrm: 2,//每页返回多少行数据
            loading: false,
            // ===================足球全部专家=====================
            currentPagermZQ: 0,//当前页数
            rowrmZQ: 5,//每页返回多少行数据
            loadingZQ: false,

            configData: config,
            关注专家show:false,
            关注的专家方案数据: [],
            足球list: [{
                title: "周盈利",
                minlist: [],
                total: -1,

            }, {
                title: "周人气",
                minlist: [],
                total: -1,

            },
            {
                title: "全部",
                minlist: [],
                total: -1,
            },
            ],
            篮球list: [
                {
                    title: "周人气",
                    minlist: []

                }, {
                    title: "全部",
                    minlist: []

                },
            ],
         
            关注专家列表: [],
            关注active: 0,
            足球active: 2,
            篮球active: 0,
            type: 1,
            弹出框: false,
            足球参数: "",
            篮球参数: "",
          
            关注: [
                {
                    title: "关注的专家",
                    xingx: 0,//是否有心的消息
                    minlist: [

                    ]
                },
                {
                    title: "关注的专家方案",
                    xingx: 0,
                    minlist: [

                    ]
                },

            ],
        }
    },
    components: { // 注册组件
        Chartsdata,
        echartsDataLanqiu,
        echartsDataZhuqiu,
    },
    computed: {
        ...mapState({
                    是否有登录:"是否登录",
                    ZQinde:"ZQinde",

                }),
        finished() {
            if (this.objdata.total == -1) {//默认的时候是-1   return false
                return false
            } else {
                if (this.objdata.total <= this.objdata.list.length) {  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                } else {
                    return false
                }
            }
        },
        finishedZQ() {
            if (this.足球list[2].total == -1) {//默认的时候是-1   return false
                return false
            } else {
                if (this.足球list[2].total <= this.足球list[2].minlist.length) {  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                } else {
                    return false
                }
            }
        }
    },
    created() {
      

        //   var type = this.$route.query.type;
        //     if(type==1){
        //       this.type=2
        //         this.篮球active=1
        //         var  obj = { class:"LanQiuQuanBu"  }
        //           所有专家数据(obj).then(x => {
        //         console.log(x)
        //         this. 篮球list[1].minlist = x.data.data.list
        //     }).catch(err => {
        //         console.log(err)
        //     })
        //   }
        //   else{
        //       this.type=1
        //        this.足球active=2
        //       var  obj = { class:"ZuQiuQuanBu"  }
        //         所有专家数据(obj).then(x => {
        //         console.log(x)
        //         this.足球list[2].minlist = x.data.data.list
        //     }).catch(err => {
        //         console.log(err)
        //     })
        //   } 
        
         
        //    if(this.关注专家show==true){
               this.关注的专家方案函数()
        //    }

          var maxind=this.ZQinde.maxindex
          this.type=maxind
          var zqind=this.ZQinde.minindex
         var gzind=this.ZQinde.gzindex
     
       this.onClick(zqind)
       if(maxind==1){//属于足球
              this.足球active=zqind
              this.onClick(zqind)
       }else{//属于关注
        //   alert(1)
          console.log(gzind)
            this.关注active=gzind
            this.onLoad()
       }

    },
    methods: {
           ...mapMutations({
              更改专家足球maxinde:"更改专家足球maxinde",
              更改专家足球mininde:"更改专家足球mininde",
              更改专家关注mininde:"更改专家关注mininde",
        }),
        onLoad() {                     //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l12")
            this.currentPagerm++       //当前页数 
            this.关注的专家列表()         //再调取请求数据的函数
        },
        onLoadZQ() {                     //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l1222")
            this.currentPagermZQ++   //当前页数 
            this.获取足球全部专家的函数()
        },

        查看专家详情(item,type) {
              if(type){//点击关注里的专家
               this.更改专家关注mininde(0)
              }else{//点击非关注的的专家
              }
            this.$router.push("/ExpertsDetails?id=" + item.id);
        },
        查看专家详情的函数(item){
            // console.log(item)
              this.$router.push("/ExpertsDetails?id=" + item.expertID);
         },
        查看方案详情(item) {
             if(this.是否有登录==true){
                  this.更改专家关注mininde(1)
                this.$router.push("/PlanDetails?id=" + item.id ); 
                }else{
                    Toast('请先登陆再查看方案详情!')
                    this.$router.push('/login')
                }

        },
        关注的专家方案函数() {
            关注的专家方案().then(x => {
                console.log(x.data.data)
                this.关注的专家方案数据 = x.data.data.list
                console.log(this.关注的专家方案数据)
            }).catch(err => {
                console.log(err)
            })
        },
        // LaQiuonClick(name, title, item) {
        //     console.log(name)
        //     console.log(title)
        //     if (name == 0) {
        //         this.篮球参数 = "LanQiuZhouRenQi "
        //     } else if (name == 1) {
        //         this.篮球参数 = "LanQiuQuanBu"
        //     } else {
        //         console.log('报错了')
        //     }
        //     var obj = { class: this.篮球参数 }
        //     所有专家数据(obj).then(x => {
        //         console.log(x)
        //         this.篮球list[name].minlist = x.data.data.list
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },
        获取足球全部专家的函数() {
            var obj = {
                page: this.currentPagermZQ,//当前页数
                row: this.rowrmZQ,//每页返回多少行数据
                class: "ZuQiuQuanBu"
            }
            所有专家数据(obj).then(x => {
                if (x.data.code == 1) {
                    console.log(x.data.data.total)
                    console.log(this.足球list[2].minlist)
                    console.log(x.data.data.list)
                    this.足球list[2].minlist = [...this.足球list[2].minlist, ...x.data.data.list];// x.data.data.list持续加加 
                    // this.足球list[2].total = x.data.data.total
                } else {
                    this.足球list[2].total = 0
                }
                setTimeout(() => {
                    this.loadingZQ = false
                }, 1000);
            }).catch(err => {
                this.足球list[2].total = 0
                this.loadingZQ = false
                console.log(err)
            })
        },
        onClick(index, title, item) {
            this.更改专家足球mininde(index)
            console.log(index)
            console.log(title)
            if (index == 2) {
                console.log("点击的足球全部专家")

            } else {
                if (index == 0) {
                    this.足球参数 = "ZuQiuZhouYingLi"
                } else if (index == 1) {
                    this.足球参数 = "ZuQiuZhouRenQi"
                } else {
                    console.log('报错了')
                }
                var obj = { class: this.足球参数 }
                所有专家数据(obj).then(x => {
                    console.log(x)
                    this.足球list[index].minlist = x.data.data.list
                }).catch(err => {
                    console.log(err)
                })

            }
        },
        关注的专家列表() {
            var obj = {
                class: "",
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
            }
            关注列表(obj).then(x => {
                if (x.data.code == 1) {
                    if( x.data.data.list.length==0){
                           this.关注专家show=true;
                    }else{
                        this.关注专家show=false
                        this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                        this.objdata.total = x.data.data.total
                    }
                  
                } else {
                    this.objdata.total = 0
                }
                this.loading = false
            }).catch(err => {
                this.objdata.total = 0
                this.loading = false
                console.log(err)
            })
        },
        clicktab(index) {
            this.type = index
             this.更改专家足球maxinde(index)
            if (index == 1) {
                var obj = { class: 'ZuQiuZhouYingLi' }
                所有专家数据(obj).then(x => {
                    console.log(x)
                    this.足球list[0].minlist = x.data.data.list

                }).catch(err => {
                    console.log(err)
                })
            }
            //  else if (index == 2) {
            //     var obj = { class: 'LanQiuZhouRenQi' }
            //     所有专家数据(obj).then(x => {
            //         this.篮球list[0].minlist = x.data.data.list
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // } 
            else {
                   this.onLoad()
                 console.log("点击了关注")
            }
        },
        是否关注的函数(item) {
            var obj = { id: item.id }
            if (item.isCollect == 0) {
                添加关注(obj).then(x => {
                    console.log(x.data.data)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        item.isCollect = 1
                        //   console.log(x.data.data)
                    } else {
                        console.log("添加关注失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                取消关注(obj).then(x => {
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        item.isCollect = 0
                        //   console.log(x.data.data)
                    } else {
                        console.log("取消关注失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }

        },
      
        
    },
    
             
    
}

</script>

<style lang="scss" scoped>
/deep/.van-tabs--line .van-tabs__wrap {
    position: fixed;
    top: _vw(44);
    left: _vw(0);
    width: 100%;
    z-index: 2;
}
//================足球>全部 和 关注>关注专家 start ================================
.top_z {
    display: flex;
    padding: _vw(20) _vw(14) _vw(20) _vw(0);
    .left {
        margin-right: _vw(20);
        
        .div_box {
            width: _vw(48);
            height: _vw(48);
            margin: 0px auto;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .showgz {
            background: red !important;
            color: #ffffff !important;
            border: none !important;
        }
        .btn {
            width: _vw(48);
            border-radius: _vw(20);
            font-size: _vw(12);
            margin-top: _vw(10);
            line-height: _vw(20);
            border: 1px solid rgba(231, 225, 225, 0.333);
            text-align: center;
            padding-left: _vw(6);
            padding-right: _vw(6);
        }
    }
    .right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .l_r {
            p {
                margin: 0px;
                line-height: _vw(20);
            }
            .last_child {
                .name {
                    font-size: _vw(16);
                    font-weight: 600;
                    margin-right: _vw(2);
                }
                .sf {
                    font-size: _vw(12);
                    color: #b1abab;
                }
            }
            .pl {
                font-size: _vw(11);
                color: #666666;
                display: flex;
                .jing_l,
                .l_h {
                    border-radius: 0 _vw(6) _vw(6) _vw(10);
                    text-align: center;
                    padding: _vw(0) _vw(4) _vw(0) _vw(4);
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
        .r_r {
            height: _vw(100);
            width: _vw(140);
        }
        .qi {
            text-align: center;

            .nub_b {
                display: flex;
                color: red;
                // text-align: top;
                .hot {
                    // color:red !important;
                    .hot_s {
                        font-size: _vw(14) !important;
                    }
                }
                .bfb {
                    font-size: _vw(12);
                }
                .max_q {
                    //   color: #e86b5c;
                    font-family: alternategothicno2bt;
                    font-size: _vw(30);
                }
            }
            .sh {
                font-size: _vw(12);
                color: red;
            }
            .bj {
                .iconjiangpai {
                    color: goldenrod;
                    font-size: _vw(16);
                }
            }
        }
    }
}
//======================足球>全部 和 关注>关注专家 over =================================
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
.专家 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: _vw(44);
    box-sizing: border-box;
    padding-top: _vw(44);
    background: #f3f5f7;
    .关闭弹框 {
        color: red;
        justify-content: space-between;
        display: flex;
        padding-right: _vw(6);
        padding-top: _vw(4);
        .iconfont {
            font-size: _vw(20);
        }
    }
    .弹出内容框 {
        width: _vw(260);
        width: _vw(260);
        padding: _vw(0) _vw(20) _vw(20) _vw(20);
        margin: 0 auto;
        background: #ffffff;

        .热门title {
            display: flex;
            .bs {
                background: #ff6700;
                width: _vw(4);
                margin-right: _vw(10);
            }
            .热门赛事 {
                font-size: _vw(16);
                font-weight: 500;
            }
        }
        p {
            font-size: _vw(12);
        }
    }

    .标题栏 {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 1000;
        width: 100%;
        height: _vw(44);
        background: red;
        text-align: center;
        color: #ffffff;
        display: flex;
        align-items: center;
        .固定 {
            position: absolute;
            right: _vw(10);
            top: _vw(12);
            .iconfont {
                color: #ffffff;
                font-size: _vw(20);
            }
        }
        .title_ul {
            font-size: _vw(18);
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            // width: 60%;
            width: 40%;

            margin: 0px auto;
            li {
                line-height: _vw(30);
            }
            .activebt {
                background: rgba(0, 0, 0, 0.3);
                border-radius: _vw(20);
                padding: _vw(0) _vw(10);
            }
        }
    }
     .关注{
          .没有关注的内容 {
                background-color: #f3f5f7 !important;
                height: 100%;
                padding-top:_vw(40);
                box-sizing: border-box;
                .img_box {
                    width: _vw(160);
                    height: _vw(160);
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .提示文字 {
                    text-align: center;
                    margin: _vw(10) 0px;
                    color: #999;
                    font-size: _vw(14);
                }
               
            }
     }
    
    
   .关注, .足球,.篮球 {
        .ul_c {
            ///////////关注的专家方案 start///////////////////////////////
            .关注li,
            .足球li,
            .篮球li {
                background: #ffffff;
                padding-left: _vw(14);
                margin-top: _vw(4);

                .方案提醒 {
                    padding: _vw(0) _vw(10) _vw(0) _vw(10);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: _vw(12);
                    color: #666666;
                    border-top: 1px solid #ebe5e5;
                    line-height: _vw(34);
                    .left {
                        display: flex;
                        align-items: center;
                        .dian {
                            width: _vw(5);
                            height: _vw(5);
                            border-radius: 50%;
                            background: red;
                            margin-right: _vw(6);
                        }
                        .num {
                            margin: _vw(0) _vw(4);
                        }
                    }
                    .right {
                        //   font-size: _vw(18);
                    }
                }
            }

            ///////////关注的专家start///////////////////////////////
            .关注li {
                align-items: center;
                .top_z {
                    align-items: center;
                    .right {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        .last_child,
                        .pl {
                            width: 100%;
                        }
                    }
                }
              
            }

            .关注的专家方案 {
                background: #ffffff;
                margin-top: _vw(4);
                padding: _vw(20) _vw(14) _vw(0) _vw(14);
                .top {
                    display: flex;

                    .img_box {
                        width: _vw(48);
                        height: _vw(48);
                        margin-right: _vw(10);
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .r_div {
                        flex: 1;
                        line-height: _vw(24);
                        .name {
                            font-size: _vw(16);
                            font-weight: 600;
                        }
                        p {
                            margin: 0px;
                        }
                        .type {
                            font-size: _vw(12);
                            color: #666666;
                        }
                    }
                }
                .niaoy {
                    font-size: _vw(16);
                      .lcfa{
                        color:#ff6700;
                    }
                }
                .dui_box {
                    display: flex;
                    justify-content: space-between;
                    background: #f3f5f7;
                    align-items: center;
                    padding: _vw(6) _vw(8);
                    .dui {
                        display: flex;
                        font-size: _vw(12);
                        color: #666666;
                        align-items: center;

                        .div {
                            color: #65afff;
                            border: 1px solid #65afff;
                            border-radius: _vw(4);
                            padding: _vw(0) _vw(2);
                            margin-right: _vw(6);
                        }
                        .bei {
                            margin: _vw(0) _vw(2);
                        }
                        .biaog {
                            margin: _vw(0) _vw(4) _vw(0) _vw(2);
                        }
                    }
                    .icon_box {
                        color: #666666;
                    }
                }
                .bottom {
                    display: flex;
                    justify-content: space-between;
                    font-size: _vw(12);
                    color: #666666;
                    line-height: _vw(34);
                    padding: _vw(0) _vw(10);
                    //    .right_b{
                    //        display:flex;
                    //        align-items: center;
                    //       .红豆{
                    //          width: _vw(12);
                    //          height: _vw(12);
                    //        background:url('~@/assets/img/hd.svg');
                    //        background-repeat: no-repeat;
                    //        background-size: 100% 100%;
                    //        background-position: center;
                    //        margin-right: _vw(7);
                    //      }

                    //    }
                }
            }
        }
    }
    .足球 {
    }
}
</style>