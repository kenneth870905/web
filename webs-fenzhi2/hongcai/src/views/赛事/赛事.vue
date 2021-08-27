
   <!-- status==0">未开始 status==1">进行中  status==2">延期   status==3">结束 -->

<template>
    <div class="赛事"  >
        <van-popup @opened="opened" v-model="show" position="top" :style="{ height: '100%' }">
            <sssx ref="sssx" :tableType="tableType" v-on:success="success()" />
        </van-popup>
        <div class="title">
            <div class="c_tit">
                <div @click="clicktite(0)" :class="{'activetit':tableType==0}"><span>关注</span></div>
                <div @click="clicktite(1)" :class="{'activetit':tableType==1}"><span>足球</span></div>
                <!-- <div @click="clicktite(2)" :class="{'activetit':tableType==2}"><span>篮球</span></div> -->
            </div>
            <div class="定位" @click="点击筛选()" v-if="tableType==1 || tableType==2 "><span class="iconfont iconshaixuan "></span></div>
        </div>

        <div class="content" v-show="tableType==0">
            <van-tabs v-model="activeyi" animated class="选项框" @click="onClick">
                <!-- ============================足球关注内容 start============================= -->
         
                <van-tab title="足球" class="tab">

                    <div @click="$router.push('/login')" class="没有关注的内容" v-if="!是否有登录">
                        <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                        <div class="提示文字">你还没有登录,点击进行登录</div>
                    </div>


                   <div v-else>
                        <div class="没有关注的内容" v-if="关注的赛事show">
                            <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                            <div class="提示文字">你还没有关注的赛事</div>
                        </div>
                        
                        <div v-else>
                              <div class="缓冲图标" v-if="关注加载缓冲图标">
                                  <van-loading size="2rem" vertical>加载中...</van-loading>
                                </div>

                            <ul  class="ul_cc" v-if="关注加载缓冲图标==false">
                                <li v-for=" (keey,index ) in 关注足球数据" @click="赛事详情(keey,'gzind')">
                                    <div class="top jia">
                                        <div class="t_t font_c">{{keey.league}}</div>
                                        <div class="c_t">
                                            <div class="ll">{{keey.start_time}}</div>
                                                <span  class="cc" v-if="keey.status==0">未开始</span>
                                                <span  class="cc" v-if="keey.status==1">中</span>
                                                <span   class="cc" v-if="keey.status==2">延期</span>
                                                <span  class="cc" v-if="keey.status==3">完</span>
                                            <div class="rr">
                                                <span class="r_l" v-if="keey.status==3 || keey.status==1 "><span>{{keey.halfScore}}</span></span>
                                                <span class="r_l" v-if="keey.status==3 || keey.status==1 "><span>{{keey.cornerKick}}</span></span>
                                            </div>
                                        </div>

                                        <div class="b_t" v-if="keey.status==0 || keey.status==2 " v-on:click.stop="是否关注赛事(keey)">
                                            <van-icon :name="keey.isCollect_race==1 ? 'star' : 'star-o'"   :class="keey.isCollect_race==1 ? 'activeicon' : 'star'" />
                                        </div>
                                        <div class="b_t" v-if="keey.status==3 || keey.status==1">&nbsp;</div>
                                    </div>

                                    <div class="top">
                                        <div class=" t_t font_c" :class="{'type_j' : keey.status==1 }">{{keey.status==1 ? "进行中":"&nbsp;"}}</div>
                                        <div class="cc_c">
                                            <div class="ll">
                                                <div class="name_ kk"> {{keey.homeTeam_teamName}}</div>
                                            </div>

                                            <span class="cc" v-if="keey.status==0 || keey.status==2 ">VS</span>
                                            <div class="cc" v-if="keey.status==3 || keey.status==1 ">
                                                <span>{{keey.homeScore}}</span>
                                                <span>&nbsp;-&nbsp;</span>
                                                <span>{{keey.guestScore}}</span>
                                            </div>

                                            <div class="ll">
                                                <div class="name_">{{keey.guestTeam_teamName}}</div>
                                            </div>
                                        </div>
                                        <div class="num_f">&nbsp;</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                   
                    <!-- <div class="热门title">
                        <div class="bs"></div>
                        <div>热门赛事</div>
                    </div>
                    <ul class="ul_cc">
                        <li v-for="index in 5" @click="$router.push('/CompParticulars')">
                            <div class="top">
                                <div class="t_t" :class="{'font_c':activeyi==1}">NBA</div>
                                <div class="c_t">
                                    <div> 01.06 11:00</div>
                                    <div>&nbsp;&nbsp;&nbsp;末</div>
                                </div>
                                <div class="b_t">
                                    <van-icon name="star-o" class="star-o" />
                                </div>
                            </div>
                            <div class="top" v-if="activeyi==0">
                                <div>周日305</div>
                                <div></div>
                                <div class="num_f">14条方案</div>
                            </div>

                            <div class="top" v-if="activeyi==1">
                                <div :class="{'font_c':activeyi==1}">周日305</div>
                                <div class="cc_c">
                                    <span>那不勒斯</span>
                                    <span class="cc">&nbsp;&nbsp;VS&nbsp;&nbsp;</span>
                                    <span>国际米兰</span>
                                </div>
                                <div class="num_f">14条方案</div>
                            </div>

                            <div class="d_b" v-if="activeyi==0">
                                <div>
                                    <p>开阔者</p>
                                    <p>热火</p>
                                </div>
                                <div class="b_Y">
                                    VS
                                </div>
                                <div>
                                </div>
                            </div>

                        </li>
                    </ul> -->
                </van-tab>

                <!-- ========================足球关注内容 out============================ -->
                <!-- =======================篮球关注内容start======================= -->
                <!-- <van-tab title="篮球" class="tab">
                    <ul class="篮球内容" v-if="关注篮球数据.length>0 && 是否有登录==true">
                        <li v-for="(keey,index) in 关注篮球数据" @click="赛事详情(keey)">
                            <div class="up">
                                <div class="up_l">{{keey.league}}</div>
                                <div class="con_c" v-if="keey.status!==1">
                                    <span> {{keey.start_time}}</span>
                                    <span v-if="status==0">未开始</span>
                                    <span v-if="status==2">延期</span>
                                    <span v-if="status==3">完</span>
                                </div>
                                <div class="con_c" v-if="keey.status==1">
                                    <span> {{keey.start_time}}</span>
                                    <span class="dan">
                                        <span v-if="keey.JinXingDeJieDuan==0">准备阶段</span>&nbsp;
                                        <span v-if="keey.JinXingDeJieDuan==1">第一节</span>&nbsp;
                                        <span v-if="keey.JinXingDeJieDuan==2">第二节</span>&nbsp;
                                        <span v-if="keey.JinXingDeJieDuan==3">第三节</span>&nbsp;
                                        <span v-if="keey.JinXingDeJieDuan==4">第四节</span>&nbsp;
                                        <div >01:36</div>
                                    </span>
                                </div>

                                <div class="xing" v-if="keey.status!==2 ||  keey.status!==0">&nbsp;</div>
                                <div class="xing" v-if="keey.status==2 ||  keey.status==0" @click.stop="是否关注赛事(keey)">
                                    <van-icon :name="keey.isCollect_race==1 ? 'star' : 'star-o'"   :class="keey.isCollect_race==1 ? 'activeicon' : 'star'" />
                                </div>
                            </div>
                            <div class="up">
                                <div class="up_l name_n">{{keey.homeTeam_teamName}}</div>
                                <div class="VS" v-if="keey.status==0 || keey.status==2 ">
                                    VS
                                </div>
                                <ul class="con_c dui">
                                    <li v-for="(items,index) in keey.home_jieduan">{{items==null ?'-' : items }}</li>
                                    <li v-if="keey.status==1 || keey.status==3 ">{{keey.homeScore}}</li>
                                </ul>
                                <div class="xing"></div>
                            </div>
                            <div class="up">
                                <div class="up_l name_n">{{keey.guestTeam_teamName}}</div>
                                <ul class="con_c dui  ">
                                    <li v-for="(items,index) in keey.guest_jieduan">{{items==null ?'-' : items }}</li>
                                    <li v-if="keey.status==1 || keey.status==3 ">{{keey.guestScore}}</li>
                                </ul>
                                <div class="xing"></div>
                            </div>

                            <div class="up">
                                <div class="up_l ">
                                    <div class="type_j" v-if="keey.status==1">进行中</div>
                                </div>
                                <ul class="con_c  dui jjud" v-if="keey.status==1 || keey.status==3 ">
                                    <li>ITD</li>
                                    <li>DFF</li>
                                    <li>KKH</li>
                                    <li>OOP</li>
                                    <li>总</li>
                                </ul>
                                <div class="xing"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="有关注的内容" v-if="关注足球数据.length==0 && 是否有登录==true">
                        <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                        <div class="提示文字">你还没有关注的赛事</div>
                    </div>

                    <div @click="$router.push('/login')" class="没有关注的内容" v-if="是否有登录==false">
                        <div class="img_box"> <img src="@/assets/img/wnr.png" alt=""></div>
                        <div class="提示文字">你还没有登录,点击进行登录</div>
                    </div>


                </van-tab> -->
                <!-- =========================篮球关注内容out==================================================== -->
            </van-tabs>

        </div>

        <div class="content" v-show="tableType==1">

            <div class="jiaji">
                <div @click="足球title(itmell,index)" class="time_t" :class="{'titleActive':足球index ==index}" v-for="(itmell,index) in 足球time" :key="index">
                    <div class="day_d">{{itmell[0]}}</div>
                    <div class="week_d">{{itmell[1]}}</div>
                </div>
            </div>
            <div class=" 足球_ul">
                  <div class="缓冲图标 " v-if="足球加载缓冲图标">
                    <van-loading size="2rem" vertical>加载中...</van-loading>
                </div>
                <ul class="ul_cc" v-else >
                    <li v-for=" (keey,index ) in 足球list" @click="赛事详情(keey,'zqinde')">
                        <div class="top jia">
                            <div class="t_t font_c">{{keey.league}}</div>

                            <div class="c_t">
                                <div class="ll">{{keey.start_time}}</div>
                                <span  class="cc" v-if="keey.status==0">未开始</span>
                                <span  class="cc" v-if="keey.status==1">中</span>
                                <span   class="cc" v-if="keey.status==2">延期</span>
                                <span  class="cc" v-if="keey.status==3">完</span>
                                <div class="rr">
                                    <span class="r_l" v-if="keey.status==3 || keey.status==1 "><span>{{keey.halfScore}}</span></span>
                                    <span class="r_l" v-if="keey.status==3 || keey.status==1 "><span>{{keey.cornerKick}}</span></span>
                                </div>
                            </div>

                            <div class="b_t" v-if="keey.status==0 || keey.status==2 " @click.stop="是否关注赛事(keey)">
                                    <van-icon :name="keey.isCollect_race==1 ? 'star' : 'star-o'"   :class="keey.isCollect_race==1 ? 'activeicon' : 'star'" />
                            </div>
                            <div class="b_t" v-if="keey.status==3 || keey.status==1">&nbsp;</div>
                        </div>

                        <div class="top">
                            <div class=" t_t font_c" :class="{'type_j' : keey.status==1 }">{{keey.status==1 ? "进行中":"&nbsp;"}}</div>
                            <div class="cc_c">
                                <div class="ll">
                                    <div class="name_ kk"> {{keey.homeTeam_teamName}}</div>
                                </div>

                                <span class="cc" v-if="keey.status==0 || keey.status==2 ">VS</span>
                                <div class="cc" v-if="keey.status==3 || keey.status==1 ">
                                    <span>{{keey.homeScore}}</span>
                                    <span>&nbsp;-&nbsp;</span>
                                    <span>{{keey.guestScore}}</span>
                                </div>

                                <div class="ll">
                                    <div class="name_">{{keey.guestTeam_teamName}}</div>
                                </div>
                            </div>
                            <div class="num_f">&nbsp;</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- <div class="content" v-show="tableType==2">
            <div class="jiaji 篮球标题">
                <div @click="篮球title('非胜负彩',item,index,)" class="time_t " :class="{'篮球标题激活':篮球index ==index}" v-for="(item,index) in 篮球time" :key="index">
                    <div class="day_d">{{item[0]}}</div>
                    <div class="week_d">{{item[1]}}</div>
                </div>
                <div @click="篮球title('胜负彩',)" class="time_t " :class="{'篮球标题激活':篮球index =='胜负彩'}">
                    <div class="胜负彩">胜负彩 </div>
                </div>
            </div>

            <ul class="篮球内容">
                <li v-for="(keey,index) in 篮球list" @click="赛事详情(keey,'lanqind')">
                    <div class="up">
                        <div class="up_l">{{keey.league}}</div>
                        <div class="con_c" v-if="keey.status!==1">
                            <span> {{keey.start_time}}</span>
                            <span v-if="status==0">未开始</span>
                            <span v-if="status==2">延期</span>
                            <span v-if="status==3">完</span>
                        </div>
                        <div class="con_c" v-if="keey.status==1">
                            <span> {{keey.start_time}}</span>
                            <span class="dan">
                                <span v-if="keey.JinXingDeJieDuan==0">准备阶段</span>&nbsp;
                                <span v-if="keey.JinXingDeJieDuan==1">第一节</span>&nbsp;
                                <span v-if="keey.JinXingDeJieDuan==2">第二节</span>&nbsp;
                                <span v-if="keey.JinXingDeJieDuan==3">第三节</span>&nbsp;
                                <span v-if="keey.JinXingDeJieDuan==4">第四节</span>&nbsp;
                                <div v-if="keey.status==1 && keey.JinXingDeJieDuan!==0">01.32</div>
                            </span>
                        </div>

                    <div class="xing" v-if="keey.status!==2 ||  keey.status!==0">&nbsp;</div>
                            <div class="xing" v-if="keey.status==2 ||  keey.status==0" @click.stop="是否关注赛事(keey)">
                                <van-icon :name="keey.isCollect_race==1 ? 'star' : 'star-o'"   :class="keey.isCollect_race==1 ? 'activeicon' : 'star'" />
                            </div>
                    </div>
                    <div class="up">
                        <div class="up_l name_n">{{keey.homeTeam_teamName}}</div>
                        <div class="VS" v-if="keey.status==0 || keey.status==2 ">
                            VS
                        </div>
                        <ul class="con_c dui">
                            <li v-for="(items,index) in keey.home_jieduan">{{items==null ?'-' : items }}</li>
                            <li v-if="keey.status==1 || keey.status==3 ">{{keey.homeScore}}</li>
                        </ul>
                        <div class="xing"></div>
                    </div>
                    <div class="up">
                        <div class="up_l name_n">{{keey.guestTeam_teamName}}</div>
                        <ul class="con_c dui  ">
                            <li v-for="(items,index) in keey.guest_jieduan">{{items==null ?'-' : items }}</li>
                            <li v-if="keey.status==1 || keey.status==3 ">{{keey.guestScore}}</li>
                        </ul>
                        <div class="xing"></div>
                    </div>

                    <div class="up">
                        <div class="up_l ">
                            <div class="type_j" v-if="keey.status==1">进行中</div>
                        </div>
                        <ul class="con_c  dui jjud" v-if="keey.status==1 || keey.status==3 ">
                            <li>ITD</li>
                            <li>DFF</li>
                            <li>KKH</li>
                            <li>OOP</li>
                            <li>总</li>
                        </ul>
                        <div class="xing"></div>
                    </div>
                </li>
            </ul>

        </div> -->
    </div>
</template>
<script>
import { 比赛时间, 比赛列表, 是否关注此比赛, 关注的赛事 } from "@/api/比赛.js"
import { 添加关注, 取消关注 } from "@/api/专家.js"
import { Toast } from 'vant'
import { Loading } from 'vant';
import {  mapState } from 'vuex' 

// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const sssx = () => import('@/components/赛事筛选/赛事筛选.vue') //进入游戏组件
export default {
    provide(){
        return{
            筛选确认:(a ,type)=>{
                 this.show=false
                if(!a){
                    console.log('全选')
                    console.log(type)
                    if(type==0){
                       var objdata = {
                            whatday:this.足球time[1][0],//时间
                             typeid: 0,
                              class:"",
                              }
                        比赛列表(objdata).then(x => {
                            this.足球list = x.data.data
                              this.tableType=1
                             this.足球index=1
                        }).catch(err => {
                            console.log(err)
                        })

                    }else{
                       var objdata = {
                            whatday:this.足球time[1][0],//时间
                            typeid: 1,
                              class:"",
                              }
                        比赛列表(objdata).then(x => {
                            this.足球list = x.data.data
                            this.tableType=2
                             this.足球index=1
                        }).catch(err => {
                            console.log(err)
                        })
                    }

                }else{//非全选
                      console.log(type)
                       var list=[]
                      for( let i = 0; i < a.length ; i++) { 
                                list.push( a[i].value)
                            }
                    console.log(list)

                    list=JSON.stringify( list );
                    console.log(list)

                
                    if(type==0){//==0是足球
                       var objdata = {
                            whatday:this.足球time[1][0],//时间
                            typeid: 0,
                            class:list,
                              }
                        比赛列表(objdata).then(x => {
                            this.足球list = x.data.data
                              this.tableType=1
                             this.足球index=1
                        }).catch(err => {
                            console.log(err)
                        })

                    }else{//是蓝球
                       var objdata = {
                            whatday:this.足球time[1][0],//时间
                            typeid: 1,
                              class:list,
                              }
                        比赛列表(objdata).then(x => {
                            this.足球list = x.data.data
                            this.tableType=2
                             this.足球index=1
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                   
                }
            }
        }
    },
    data() {
        return {
            足球time: [],
            篮球time: [],
            show: false,
            tableType: 1,
            activeyi: 0, //关注的篮球足球切换
            足球index: 1,
            篮球index: 1,
            足球list: [],
            篮球list: [],
            flag: true,
            关注足球数据: [],
            关注加载缓冲图标:true,
            足球加载缓冲图标:true,
            关注篮球数据: [],
            关注的赛事show:false,

        
            // 关注: [
            //     {
            //         title: "足球",
            //         关注列表: [],
            //         推荐列表: [],
            //         loading:false
            //     },
            //     {
            //         title: "篮球",
            //         关注列表: [],
            //         推荐列表: [],
            //          loading:false
            //     },
            // ],
        }
    },
     components: { sssx },
      computed:{
        ...mapState({
                    是否有登录:"是否登录",
                    SSinde:"SSinde",
                }) 
        },
    created() {

          this.初始化()

          var maxind=this.SSinde.maxindex
          this.tableType=maxind
          var zqind=this.SSinde.minindex
          var gzind=this.SSinde.gzindex
          var listT=this.SSinde.zqtitle
      console.log(listT)
      if(listT.length!==0){
           if(maxind==1){//属于足球
              this.足球index=zqind
              var zqactivedata=this.足球index
              this.足球title(listT,zqactivedata)
            }else{//属于关注
                    this.activeyi=gzind
                    this.请求关注数据的函数()
            }
      }
      
    },

    methods: {
      
       
        opened() {
            //调用子组件方法
            this.$refs.sssx.setActive()
        },

        赛事详情(item,type) {
            if(type=='gzind'){ //点击的关注里面的查看详情
            this.SSinde.gzindex=0
            }else{//点击的赛事里的查看详情
            var zqsy=this.足球index
            this.SSinde.minindex=zqsy
            }
            this.$router.push("/CompParticulars?id=" + item.id);
        },

        onClick(index, name, item) {
            console.log(index, name)
            this.请求关注数据的函数()
        },

        请求关注数据的函数() {
            this.关注加载缓冲图标=true
            // return
            var obj = {
                typeid: this.activeyi
            }
            关注的赛事(obj).then(x => {
                if (this.activeyi == 0) {
                    console.log('获取关注足球')
                    if( x.data.data.list.length==0){
                        this.关注的赛事show=true;
                    }else{
                        this.关注的赛事show=false;
                       this.关注足球数据 = x.data.data.list;
                       this.关注加载缓冲图标=false
                    }
                    console.log(x.data.data)
                } else if (this.activeyi == 1) {
                    this.关注篮球数据 = x.data.data
                } else {
                    console.log("有错误了")
                }
            }).catch(err => {
                console.log(err)
            })
              
        },

        是否关注赛事(item) {
            console.log(item)
            var obj = { id: item.id, table: 'snake_collect_race' }
            if (item.isCollect_race == 0) {
                添加关注(obj).then(x => {
                    console.log(x.data.data)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        item.isCollect_race = 1
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
                        item.isCollect_race = 0
                    } else {
                        console.log("取消关注失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },

        async 初始化() {
            var x = await 比赛时间()
            this.足球time = x.data.data.time
            this.篮球time = x.data.data.time
            var obj = {
                足球: {
                    day: this.足球time[1][0],
                    type: 0
                },
                篮球: {
                    day: this.篮球time[1][0],
                    type: 1
                }
            }
              this.足球加载缓冲图标=true
            this.请求对应日期的比赛数据(obj)
        },
       请求对应日期的比赛数据(obj) {
           
            if (this.flag == true) {
                var objdata = {
                    whatday: obj.足球.day,//时间
                    typeid: obj.足球.type
                }
                比赛列表(objdata).then(x => {
                    this.足球list = x.data.data
                     this.足球加载缓冲图标=false
                }).catch(err => {
                    console.log(err)
                })

            } else {
                var objdata = {
                    whatday: obj.篮球.day,//时间
                    typeid: obj.篮球.type
                }
                比赛列表(objdata).then(x => {
                    this.篮球list = x.data.data
                }).catch(err => {
                    console.log(err)
                })
            }


        },
        点击筛选() {
            this.show = true
        },
        success() {
            this.show = false;
        },
        足球title(item, index) {    
            this.SSinde.zqtitle=item
            this.flag = true
            this.足球index = index
            var obj = {
                足球: {
                    day: item[0],
                    type: 0
                },
            }
            this.足球加载缓冲图标=true
            this.请求对应日期的比赛数据(obj)
        },

        篮球title(type, item, index) {
            if (type == '非胜负彩') {
                this.flag = false
                this.篮球index = index
                var obj = {
                    篮球: {
                        day: item[0],
                        type: 1
                    }
                }
                this.请求对应日期的比赛数据(obj)
            } else {
                console.log('点击了胜负彩')
            }
        },
        clicktite(index) {  
            this.SSinde.maxindex=index
            this.tableType = index
            var obj = {
                足球: {
                    day: this.足球time[1][0],
                    type: 0
                },
                /////////////////////这里报错
                篮球: {
                    day: this.篮球time[1][0],
                    type: 1
                }
            }
            if (index == 2) {
                this.flag = false
                this.足球index = 1
                this.请求对应日期的比赛数据(obj)
            } else if (index == 1) {
                this.flag = true
                this.篮球index = 1

                this.请求对应日期的比赛数据(obj)
            } else {
                this.请求关注数据的函数()
                console.log("点击的第一个")
            }

        },
    },
}
</script>
<style lang="scss" scoped>
/deep/.van-tabs--line .van-tabs__wrap {
    position: fixed;
    top: _vw(0); //加篮球
    left: _vw(0);
    width: 100%;
    z-index: 2;
}
.van-tabs--line{ //加篮球
    padding-top:_vw(0) !important;
}
.type_j {
    //足球 篮球 进行中  样式
    color: #ff6e25 !important;
    background: #fff0e9;
    line-height: _vw(16);
    height: _vw(16);
    border-radius: _vw(10);
    text-align: center;
    width: _vw(57);
    font-size: _vw(10);
}

    .没有关注的内容 {
        background-color: #ffffff !important;
        height: 100%;
        padding-top:_vw(140);
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
            color: rgb(141, 135, 135);
            font-size: _vw(14);
        }
        
    }

//=============公用足球=====================
.缓冲图标{
    // font-size: _vw(30);
    padding-top:_vw(200);
    .van-loading__text{
        font-size: _vw(16);
    font-weight: 500;
    }
   /deep/ .van-loading{
    color:red;
    font-size:_vw(30);
        
    }

}
.ul_cc {
    width: 100%;
    li {
        width: 100%;
        padding: _vw(10) _vw(10);
        border-bottom: 1px solid rgb(230, 227, 227);
        box-sizing: border-box;
        .jia {
            margin-bottom: _vw(6);
        }
        .top {
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            .font_c {
                color: #1a1a1a !important;
            }
            .t_t {
                font-size: _vw(10);
            }
            .type_j {
                color: #ff6e25 !important;
            }
            > div {
                width: 100 % 3;
                font-size: _vw(8);
                color: #999999;
            }
            .cc_c {
                font-size: _vw(16);
                color: #1a1a1a;
                display: flex;
                justify-content: space-between;
                .cc {
                    font-family: alternategothicno2bt;
                    font-size: _vw(24);
                    font-weight: 500;
                }
            }
            .b_t {
                text-align: right;

                .star {
                    font-size: _vw(16);
                    // color:red !important;
                }
            }
            .c_t {
                display: flex;
                justify-content: space-between;
                font-size: _vw(10);
            }
        }
    }
}
.mj_l {
    margin-left: _vw(2);
}
.mj_r {
    margin-right: _vw(2);
}

.rr {
    width: _vw(79);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

}

.ll {
    width: _vw(79);
    display: flex;
    box-sizing: border-box;
    .kk {
        text-align: right;
    }
    .name_ {
        border-radius: _vw(4);
        // background: rgba(243, 220, 220, 0.2);
    }
}

.cc {
    width: _vw(50);
    text-align: center;
}
.t_t {
    width: _vw(57);
}
.num_f {
    width: _vw(62);
    text-align: right;
}
.b_t {
    width: _vw(62);
    text-align: center;
}
.activeicon {
    color: red !important;
    font-size: _vw(16) !important;
}
//===============公用足球out===================

.赛事 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: _vw(44);
    box-sizing: border-box;
    background-color: #ffffff;

    .title {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 1000;
        width: 100%;
        background: red;
        color: #ffffff;        
        height: _vw(40);
        .c_tit {
            max-width: 40%;
            margin: 0px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .activetit {
                background-color: rgba(100, 98, 98, 0.6);
            }
            div {
                margin-top:_vw(8);
                padding: _vw(2) _vw(10);
                border-radius: _vw(15);
                box-sizing: border-box;
                span {
                    font-size: _vw(18);
                    font-weight: 500;
                }
            }
        }
        .定位 {
            position: absolute;
            right: _vw(10);
            top: _vw(0);
            line-height: _vw(40);
            .iconfont {
                color: #ffffff;
                font-size: _vw(20);
            }
        }
    }
    .content {
        padding-top: _vw(40);
        box-sizing: border-box;
       height: 100%;
    //  background: #ff6700;

        // ====================  tableType == 0  开始========================

        .选项框 {
          height: 100%;
         /deep/ .van-tabs__content--animated{
                  height: 100%;
          }
             .tab{
                  background-color: #f3f5f7 !important;
              height: 100%;
                 
             }
           /deep/ .van-tab__pane{
                  height: 100%;
                  background:#ffffff;
                //   padding-top:_vw(20); //加篮球
            }


            .热门title {
                display: flex;
                padding: _vw(10) 0px;
                border-bottom: 1px solid #e6e4e4;
                .bs {
                    background: #ff6700;
                    width: _vw(6);
                    margin-right: _vw(10);
                }
                .热门赛事 {
                    font-size: _vw(16);
                }
            }
            .ul_cc {
                li {
                    .d_b {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        > div {
                            width: 100 % 3;
                            font-size: _vw(14);
                            .b_Y {
                                font-weight: 800;
                            }
                            p {
                                margin: 0px;
                            }
                        }
                    }
                }
            }
        }

        // ====================  tableType == 1  开始========================
        .jiaji {
            position: fixed;
            left: 0px;
            top: _vw(40);
            background: #ffffff !important;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            // justify-content:space-between;
            justify-content: space-around;
            padding: _vw(0) _vw(6) _vw(0) _vw(6);
            border-bottom: 1px solid rgb(230, 227, 227);
            z-index: 1000;

            .time_t {
                color: #5e5858;
                font-size: _vw(12);
                text-align: center;
                .day_d {
                    margin-top: _vw(6);
                }
                .week_d {
                    padding-bottom: _vw(4);
                }
                .胜负彩 {
                    line-height: _vw(44.5);
                    border-left: _vw(1) solid #bebaba;
                    color: #5e5858;
                    font-size: _vw(12);
                }
            }

            //  .胜负彩{
            //             line-height: _vw(44.5);
            //             border-left: _vw(1) solid #bebaba ;
            //             color:#5e5858;
            //          font-size: _vw(12);
            //         }

            .titleActive {
                color: red;
                border-bottom: _vw(1.5) solid red;
            }
            .篮球标题激活 {
                width: 60%;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    left: 0px;
                    right: 0;
                    bottom: 0px;
                    width: 50%;
                    height: _vw(2);
                    margin: auto;
                    background: red;
                    margin: auto;
                }
            }
        }
        .足球_ul {
            padding-top: _vw(40);
        }
        // ====================  tableType == 2  开始========================

        .篮球标题 {
            width: 100%;
            //    background: gold !important;
            .time_t {
                width: 16.6%;
            }
        }
        .篮球内容 {
            padding-top: _vw(40);
            > li {
                padding: _vw(16);
                box-sizing: border-box;
                border-bottom: 1px solid rgb(230, 227, 227);
                .up {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    .up_l {
                        width: 35%;
                        font-size: _vw(11);
                        color: #666666;
                        .type_j {
                            width: _vw(57);
                        }
                    }

                    .VS {
                        font-size: _vw(16);
                        position: absolute;
                        left: 50%;
                        top: _vw(16);
                        margin-left: _vw(-10);
                        font-weight: 1000;
                        font-family: alternategothicno2bt;
                    }
                    .xing {
                        width: 20%;
                        text-align: right;
                        .star {
                            font-size: _vw(16);
                            color: #ccc;
                        }
                    }
                    .name_n {
                        font-size: _vw(16);
                        color: #1a1a1a;
                    }
                    .con_c {
                        width: 45%;
                        font-size: _vw(9);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .dan {
                            display: flex;
                            justify-content: space-between;
                            
                        }
                    }
                    .dui {
                        display: flex;
                        justify-content: space-between;
                        font-size: _vw(16);
                        font-weight: 600;
                        color: rgb(107, 102, 102) !important;
                        font-family: alternategothicno2bt;
                        li:last-child {
                            color: #ff6700;
                        }
                    }
                    .jjud {
                        font-weight: 400 !important;
                        font-size: _vw(10);
                        li:last-child {
                            font-weight: 500;
                        }
                    }
                }
               
            }
        }
    }
}
/deep/.van-tabs__line {
    width: 94px;
    transform: translateX(94px) translateX(-50%);
    transition-duration: 0.3s;
}


</style>


          