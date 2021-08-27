<template>
    <div class="方案详情">
        <div class="title">
            <span class="返回" @click="返回()">
                <van-icon name="arrow-left" /></span>
            <span>方案详情</span>
            <div class="icon"   @click="是否收藏方案的函数(obj)"><van-icon  :name="obj.isCollect_plan==0 ? 'star-o' : 'star'" /></div>
        </div>

        <div class="top_div">
            <!-- <div class="time">
                <div class="状态">zxxx</div>
                <div class="b_r" :class="obj.show=='1/2' ? '分' : obj.show" >{{obj.show}}</div>
            </div> -->
            <div class="top">
                <p class="biaoti">
                     <span class="lcfa" v-if="obj.identify!=='' && obj.identify!==null">[{{obj.identify}}]</span>
                    {{obj.title}}</p>
                <div class="time">
                    <span>{{obj.publishTime}}</span>
                    <div class="bottom_b_r">
                        <span class="iconfont iconyanjing"></span>
                        <span >&nbsp;{{obj.readNum}}&nbsp;</span>
                        <span>看过</span>
                    </div>
                </div>
            </div>
            <div class="up">
                <div class="img_box" @click="查看专家详情(obj)"><img  :src="configData.api_url+obj.head" alt=""></div>
                <div class="t_right">
                    <div class="l_L">
                        <div class="name_box">
                            <div class="name">{{obj.name}}</div>
                            <div class="jing_l">{{obj.ZuiJinZhanJi}}</div>
                            <div class="l_h" v-if="obj.lianhong!==0">{{obj.lianhong}}连红</div>
                        </div>
                        <div class="ext_n">{{obj.type}}</div>
                    </div>
                    <div class="关注"  :class="obj.isCollect==0 ? '未关注' : '已关注'"  @click="是否关注专家的函数(obj)">
                        <van-icon name="plus" class="icon" v-if="obj.isCollect==0 " />
                        {{obj.isCollect==0 ? '关注' : '已关注'}}
                    </div>
                </div>
            </div>
        </div>

        <div class="对详情" v-if="obj.raceListPanKouList!==0" >
            <van-swipe @change="onChange"  loop class="轮播" v-for="(item,index) in obj.raceListPanKouList">
                <van-swipe-item class="box_li" @click="赛事详情(item)" >
                    <div class="查看框以外的"> 
                    <div class="dy">
                        <span class="bei">{{item.week}} {{item.month}}</span>
                         <!-- <span>单关</span> -->
                        <span>[竞{{item.typeid ==0 ?'足' : '篮'}}]</span>
                        <span class="bei">{{item.league }}</span>
                        <span class="bj">|</span>
                        <span class="bia">{{item.start_time}}</span>
                       <span class="kais" v-if="item.status==0">未开始</span>
                       <span class="kais" v-if="item.status==1">进行中</span>
                       <span class="kais" v-if="item.status==2">延期</span>
                       <!-- <span class="kais" v-if="item.status==3">结束</span> -->
                    </div>
                    <div class="dui_lv">
                        <div class="l_r">
                            <div class="img_b"><img :src="configData.api_url+item.homeTeamhead" alt=""></div>
                            <div class="name">{{item.homeTeam_teamName}}</div>
                        </div> 
                        <div class="d_c">
                            <div class="type" v-if="item.status==3">已结束</div>
                            <div class="type" v-if="item.status==0"><span>距离开始</span><span>16:15:25</span></div>


                             <div class="b_f"  v-if="item.status==0 || item.status==2" >VS</div>
                             <div  class="b_f" v-if="item.status==1 || item.status==3" ><span>{{ item.homeScore}}</span> - <span>{{item.guestScore}}</span></div>  
                        </div> 

                        <div class="l_r">
                            <div class="img_b"><img :src="configData.api_url+item.guestTeamhead" alt=""></div>
                            <div class="name">{{item.guestTeam_teamName}}</div>
                        </div> 
                    </div>


                     <!-- ===================已结束 足球 statr=================== -->
                             <!-- type=0 足球让球盘口 type=1篮球大小分 type=2篮球让球 -->
                              <!-- result  1 主胜2客胜3平局 -->
                              <!-- Rangqiu 让球  zhusheng_peilv 主胜赔率
                                pingju__peilv 平局赔率 
                                kesheng__peilv 客胜赔率

                                1篮球大小分
                                Rangqiu 大小分
                                zhusheng_peilv 大分赔率
                                kesheng__peilv小分赔率

                                2篮球让球
                                Rangqiu  让球

                                zhusheng_peilv 主胜赔率
                                pingju__peilv 平局赔率 
                                kesheng__peilv 客胜赔率 -->

                                <!-- "result1":"1" 主方案, 
                               "result2":"3" 副方案, -->

                               <!--   status 状态 [ "未"=>0,"进行"=>1,"延期"=>2,"完"=>3]; -->

                               <!-- table 传snake_collect_plan是收藏方案， snake_collect_race 是收藏比赛 -->
                               <!-- expertid是专家ID  判断专家是否收藏isCollect        planid是方案id  判断方案是否收藏isCollect_plan   -->
                               
                            <div v-if="item.pankou.length>0" >
                                <div class="ge"  v-for="(keey,index) in  item.pankou" >
                                    <div class="tou">
                                        <p v-if="keey.type==0">让球</p> 
                                        <p v-if="keey.type==1">大小分</p>
                                        <p v-if="keey.type==2">主队</p>
                                        <p>{{keey.rangqiu}}</p>
                                    </div>
                                <!-- =================================足球= start========================================== -->
                            
                                    <div class="dui" v-if="keey.type==0">
                                        <div class="name_l"   :class="{'是否主客胜' : keey.result1==1 || keey.result2==1}"  > 
                                            <div  v-if="keey.result1==1 &&  (keey.result2!==1 ||  keey.result2!==2 ||  keey.result2!==3)" class="主推" >主推</div>
                                            <div class="主客胜" v-if="keey.result==1"> <span><van-icon name="success"  class="checked"/></span></div>
                                            <p>主胜</p>
                                            <p>{{keey.zhusheng_peilv}}</p>
                                        </div>
                                        <div class="ee"  :class="{'是否主客胜' : keey.result1==2 || keey.result2==2 }">
                                            <div v-if="keey.result1==2 &&  ( keey.result2!==1 ||  keey.result2!==2 ||  keey.result2!==3 ) " class="主推">主推</div>
                                            <div class="主客胜" v-if="keey.result==3"> <span><van-icon name="success"  class="checked"/></span></div>
                                            <p>平</p>
                                            <p>{{keey.pingju__peilv}}</p>
                                        </div>
                                        <div class="name_r"  :class="{'是否主客胜' : keey.result1==3 || keey.result2==3}">
                                            <div  v-if="keey.result1==3 && ( keey.result2!==1 ||  keey.result2!==2 ||  keey.result2!==3)" class="主推" >主推</div>
                                            <div class="主客胜"   v-if="keey.result==2"> <span><van-icon name="success"  class="checked"/></span></div>
                                            <div class="已中" v-if="keey.YuCeJieGuo==1"><img src="@/assets/img/yizhong.svg" alt=""></div>
                                            <div class="已中"  v-if="keey.YuCeJieGuo==0"><img src="@/assets/img/weizhong.svg" alt=""></div>
                                            <p>客胜</p>
                                            <p>{{keey.kesheng__peilv}}</p>
                                        </div>
                                    </div>
                                <!-- =================================足球= out========================================== -->
                                
                                <!-- =================================篮球= start========================================== -->
                                    <div class="dui" v-if="keey.type==1 || keey.type==2 ">
                                        <div class="li" :class="{'是否主客胜' : keey.result1==1  && ( keey.result2!==1 ||  keey.result2!==2 ||  keey.result2!==3)}" >
                                            <div class="主客胜" v-if="keey.result==1"> <span><van-icon name="success"  class="checked"/></span></div>
                                            <p>{{keey.type==1 ? '大分' : '主胜'}}</p>
                                            <p>{{keey.zhusheng_peilv}}</p>
                                        </div>
                                        <div class="li"  :class="{'是否主客胜' : keey.result1==2  && ( keey.result2!==1 ||  keey.result2!==2 ||  keey.result2!==3)}">
                                            <div class="主客胜" v-if="keey.result==2"> <span><van-icon name="success"  class="checked"/></span></div>
                                            <div class="已中" v-if="keey.YuCeJieGuo==1"><img src="@/assets/img/yizhong.svg" alt=""></div>
                                            <div class="已中"  v-if="keey.YuCeJieGuo==0"><img src="@/assets/img/weizhong.svg" alt=""></div>
                                            <p>{{keey.type==1 ? '小分' : '客胜'}}</p>
                                            <p>{{keey.kesheng__peilv}}</p>
                                        </div>
                                    </div>
                                <!-- =================================篮球=out========================================== -->
                            

                                </div>
                            </div>
                       </div>
                   

                </van-swipe-item>


                <van-swipe-item   class="交锋战绩"  @click="赛事详情(item)">
                     <div class="标题">
                        <div></div> <span>交锋战绩</span> 
                    </div>
                    <ul class="row_ul">
                        <li class="max_li tou">
                            <ul class="min_ul ul_bt">
                                <li >赛事时间</li>
                                <li >主队</li>
                                <li class="li">比赛</li>
                                <li >客队</li>
                            </ul>
                        </li>
                         <li class="max_li "  v-for="(keey,index) in item.race_history" >
                              <ul class="min_ul " >
                                <li class="kkb" ><p>{{keey.start_time}}</p><p>{{keey.league}}</p></li>

                                <li >{{keey.homeTeam_teamName}}</li>
                                <li  class="li  green"  >{{keey.homeScore}} : {{keey.guestScore}}</li>
                                <li >{{keey.guestTeam_teamName}}</li>
                            </ul>
                        </li>
                      
                    </ul>
                     
                    
                </van-swipe-item>



                <div class="custom-indicator" slot="indicator">
                    <div class="点" :class="{'activezs':current==0}"></div>
                    <div class="点"  :class="{'activezs':current==1}"></div>
                </div>
            </van-swipe>
        </div>

        <div class="推荐理由">
               <div class="标题 tejai">
                  <div></div> <span>推荐理由:</span> 
               </div>
               <div class="p_box" v-html="obj.content">
                    <!-- <p>I take Lille HA -1 because there are squad for this game and the coach goes to the game with the best players. Championship is impossible to win because PSG is very strong and this competition may be a bit more easy to win because the stronger teams usually rotate their squads.</p>
                    <p>Lille came won from the cup 3-0, then managed the game and conceded 2 goals but the victory was not in danger.</p>
                    <p>里尔上一场法国杯中先是3-0领先，然后丢了2个球，不过并没影响到最终取胜。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p>
                    <p>在积分榜上排名第四，落后第二名7分，尽管上次输给了摩纳哥，但积分榜还是很不错的。</p> -->
               </div>
        </div>
        <div class="tips_wrap">观点建议仅供参考，投注需谨慎</div>
    </div>
</template>
<script>

import { 方案详情} from "@/api/方案.js"
import { 添加关注,取消关注} from "@/api/专家.js"
import { Toast } from 'vant';

export default {
    data() {
        return {
            configData: config,
            obj:{},
            是否中: true,//已中未中图标切换
            主客胜: false,//false 主胜  true客胜
            是否显示赔率: false,
            不中退: true,  //false表示不显示
            结果: '黑', //红 分
            是否关注: false,
            current: 0,
            是否显示赔率:false,
            是否开始:0 // 0未开始  1表已结束开始  2 表进行中 start
        }
    },
    components: { // 注册组件

    },
    computed: {

    },
    created() {
        var iddata = this.$route.query.id;
        var obj={
            id:iddata
        }
        方案详情(obj).then(x=>{
            // console.log(x.data.data)
         this.obj=x.data.data
        }).catch(err=>{
            console.log(err)
        })
    },

    methods: {
       查看专家详情(item) {
             console.log(item)
            this.$router.push("/ExpertsDetails?id=" + item.expertID);
        },
      赛事详情(item) {
            this.$router.push("/CompParticulars?id=" + item.id);
        },
        是否收藏方案的函数(item){
            var obj = { id: item.planID,table:'snake_collect_plan' }
            if (item.isCollect_plan == 0) {
                添加关注(obj).then(x => {
                    console.log(x.data.data)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        item.isCollect_plan = 1
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
                        item.isCollect_plan = 0
                    } else {
                        console.log("取消关注失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        是否关注专家的函数(item) {
            var obj = { id: item.expertID }
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
        onChange(index) {
            this.current = index;
            console.log(index)
         },
        返回() {
            history.back()
        }
    },

}


</script>

<style lang="scss" scoped>
// ===============公用================
          .黑 {
                background: #a09797;
            }
            .红 {
                background: red;
            }
            .分 {
                background: #ff6700;
            }
            .b_r {
                color: #ffffff;
                width: _vw(20);
                height: _vw(20);
                text-align: center;
                line-height: _vw(20);
                border-radius: 50%;
                margin-right: _vw(20);
            }
 
        .是否主客胜{
               background: #c9c2c2 ;
                color:#ffffff ;
        }


        .主客胜{
                position: absolute;
                bottom: _vw(-8);
                right: _vw(10);
                z-index: 2;
                background: rgb(82, 165, 165);
                width: _vw(16);
                height: _vw(16);
                border-radius: 50%;
                text-align: center;
                .checked{
                    color:#ffffff;
                    font-size: _vw(10);
                    line-height: _vw(16);
                    text-align: center;
                }
            }
            .主推{
                position: absolute;
                left: _vw(0);
                top:0px;
                z-index: 10;
            font-size: _vw(9);
            background: #ff6700;
             color:#fff;
            }

              .已中{
                            position: absolute;
                            right: 0px;
                            top:0px;
                            width: _vw(28);
                            height: _vw(28);
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }

// ======================= 标题 和 查看=====================================
         .标题{
          display:flex;
          font-size: _vw(14);
          font-weight: 600;
          padding:_vw(4);
            padding-bottom:_vw(10);
          div{
              width: _vw(4);
              background-color:#ff6700;
              margin-right: _vw(10)
          }
      } 

        .查看{
                 font-size: _vw(12);
                 width:100%;
                 margin:0px auto;
                 border-radius: _vw(20);
                 line-height: _vw(30);
                 background:#f3f5f7;
                 margin-bottom: _vw(10);
                 display:flex;
                 align-items: center;
                 justify-content: center;
              
                 .right_sp{
                        .arrow{
                         line-height: _vw(32);
                        font-size: _vw(12);
                    }
                 }
                 
               
                }
// ======================= 标题 查看 over=====================================

.方案详情 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #f3f5f7;

    overflow-y: auto;
    box-sizing: border-box;
    padding-top: _vw(44);
    .title {
        padding: _vw(0) _vw(10);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        line-height: _vw(44);
        color: #ffffff;
        font-size: _vw(18);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background: #f22222;
        z-index: 10;
        .icon{
            color:#ffffff;
        }
    }
    .top_div {
        background: #ffffff;
        .time {
            color: #666666;
            font-size: _vw(12);
            padding-top: _vw(10);
            align-items: center;
            display: flex;
            justify-content: space-between;
            .状态 {
                padding: _vw(4) _vw(4);
                background: #d8d3d3;
                border-top-right-radius: _vw(18);
                border-bottom-right-radius: _vw(18);
            }
            
            .bottom_b_r {
                display: flex;
                align-items: center;
                line-height: _vw(26);
                .iconfont {
                line-height: _vw(26);
                font-size: _vw(14)

                    //  line-height: _vw(32);
                }
            }
        }
        .top {
            border-bottom: 1px solid #e2e2e2;
            padding: _vw(0) _vw(20) _vw(10) _vw(20);
            .biaoti {
                font-size: _vw(18);
                color: #1a1a1a;
                font-weight: 600;
                margin-bottom: _vw(10);
                margin-top:0px;
                padding-top:_vw(18);
                .lcfa{
                    color:#ff6700;
                }
              
            }
        }
        .up {
            display: flex;
            align-items: center;
            padding: _vw(14);
            .img_box {
                width: _vw(38);
                height: _vw(38);
                margin-right: _vw(20);
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }
        .t_right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l_L {
                .name_box {
                    display: flex;
                    align-items: center;
                    .name {
                        font-size: _vw(16);
                        font-weight: 600;
                    }
                    .jing_l,
                    .l_h {
                        border-radius: 0 _vw(6) _vw(6) _vw(10);
                        text-align: center;
                        font-size: _vw(10);
                        padding: _vw(0) _vw(2) _vw(0) _vw(2);
                        // line-height: _vw(16);
                        height: _vw(16);
                        line-height: _vw(16);
                    
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

                .ext_n {
                    font-size: _vw(11);
                    color: #999999;
                }
            }
            .关注 {
                line-height: _vw(26);
                padding: _vw(0) _vw(8);
                text-align: center;
                border-radius: _vw(18);
                font-size: _vw(12);
                display: flex;
                align-items: center;
                justify-content: center;
                .icon {
                    font-size: _vw(12);
                }
            }
            .已关注{
                background: #ebe5e5;
                color:rgb(168, 164, 164);
                border:_vw(1) solid rgb(168, 164, 164);
               
            }
            .未关注{
                background: red;
                color: #ffffff;
            }
        }
    }
.对详情 {
        margin-top: _vw(6);
    .轮播{
               background: #ffffff;
        .box_li {
              padding: _vw(20) _vw(14) _vw(20) _vw(14);
              box-sizing: border-box;
              position: relative;
                .查看框以外的{
                //   max-height: _vw(600); 
                }
        
            .dy {
                font-size: _vw(10);
                color: #666666;
                .bei {
                    margin: _vw(0) _vw(4);
                }
                .bj {
                    color: #e7e4e4;
                }
                .bia {
                    margin: _vw(0) _vw(4);
                }
                .kais{
                    background: #999;
                    padding:_vw(0) _vw(2);
                    color:#ffffff;
                    border-radius: _vw(2);
                    text-align: center;
                }
            }
            .dui_lv{
                display:flex;
                // margin: _vw(20) _vw(0) _vw(20) _vw(60);
                width:88%;
                margin: _vw(30) auto _vw(30)  auto ;
                justify-content:space-between;
                .l_r{
                    .img_b{
                        width: _vw(20);
                        height: _vw(20);
                        margin:0px auto;
                        border:_vw(3) solid #ccc;
                        border-radius: 50%;
                        img{ 
                            width: 100%;
                            height: 100%;
                            border-radius: 50%
                        }
                    }
                    .name{
                        font-size: _vw(14);
                        font-weight: 600;
                        line-height: _vw(30);
                        text-align: center;
                    }
                }
                .d_c{
                        text-align: center;

                    .type{
                         color:#666666;
                        font-size: _vw(12);
                        line-height: _vw(20);
                    }
                    .b_f{
                         font-size: _vw(30);
                        font-family: alternategothicno2bt;
                    }
                }
                 
            }

                .ge{
                    display: flex;
                    margin:_vw(20) _vw(0);
                    color:#666666;
                    font-size: _vw(10);
                    height: _vw(40);
                    .tou{
                        width: _vw(40);
                        margin-right: _vw(20);
                        font-size: _vw(13);
                        text-align: center;
                          background: #f7f7f7;
                          
                          p{
                              margin:0px;
                              text-align: center;
                              line-height: _vw(20)
                          }
                    }
                    
                    .dui{
                    flex:1;
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                    background: #f7f7f7;
                    background: #f7f7f7;
                    .li:nth-child(1){
                        border-right:1px solid #e6e2e2;
                    }
                    .li{
                        width: 50% ;
                        position: relative;
                        p{
                          margin:0px;
                          text-align: center;
                          font-size: _vw(10);
                          line-height: _vw(17);
                        }
                    }
                   
                    .name_r{                
                       
                    }
                    .name_l,.name_r  {
                        width:_vw(93);
                        text-align: center;
                        position: relative; 
                     
                        p{
                            margin:0px;
                            line-height: _vw(20);
                        }
                    }
                    .ee{
                        flex:1;
                        border-left: _vw(1) solid #ebe7e7;
                        border-right: _vw(1) solid #ebe7e7;
                        position: relative;
                            p{
                            margin:0px;
                            text-align: center;
                            line-height: _vw(20);

                        }
                    }
                }
                }
             


           }
     
       .交锋战绩{
         padding-top:_vw(10);
         position: relative;
         background:#ffffff;
         .row_ul{ 
            padding:_vw(10) _vw(0) _vw(18) _vw(0);
             position: relative;
             padding-top:_vw(40);
             height: _vw(200);
             overflow-y: auto;
            background:#ffffff;
            box-sizing: border-box;

            .tou{
                 position: fixed;
                    left: _vw(0);
                     top: _vw(40);
                    width: 100%;  
                     .ul_bt{
                        background: #f7f7f7;
                        border-bottom: none  !important;
                        border-radius: _vw(4);
                    li{
                        line-height: _vw(30) !important;
                        height: _vw(30) !important;
                    }
                }

            }
         
             .max_li{
                 width: 100%;
               
               .min_ul{
                   width: 100%;
                   display: flex;
                   border-bottom: 1px solid #f7f7f7;
                    //  .fred{
                    //         color:red;
                    //     }
                    //     .green{
                    //         color:green;
                    //     }
                   li{
                     width: 28%;
                     height: _vw(44);
                     text-align: center;
                     line-height: _vw(44);
                     color: #666;
                     font-size: _vw(10);
                     p{
                         margin:0px;
                         line-height: _vw(22);
                     }
                   }
                   .li{
                       width: 16% !important;
                   }
               }
            }
         }
        
        
       }
          .custom-indicator {
                color: #ffffff ;
                width: _vw(100) ;
                padding:_vw(10) _vw(0);
                position: absolute;
                left: 50%;
                 margin-left:_vw(-50);
                bottom: _vw(0) ;
                z-index: 100 ;
                display: flex;
                justify-content:center;
      
                .点{
                    width: _vw(10);
                    height: _vw(10);
                    border-radius: 50%;
                    background: #cfcaca;
                    margin-left:_vw(10);
                    margin-right: _vw(10);
                }
                  .activezs{
                    background: red;
                    width: _vw(30);
                    border-radius: _vw(18);
                }
            }
        }
        


    }


   .推荐理由{
       padding:_vw(10) _vw(20) _vw(10) _vw(0);
       margin-top:_vw(6);
       background: #ffffff;
           color: #666;
           font-size: _vw(14);
           .tejai{
               padding-bottom:0px !important; 
               
           }
           .p_box{
               padding-left: _vw(20);
           }
   }
   .tips_wrap{
       text-align: center; 
       font-size: _vw(14);
       color: #666;
       line-height: _vw(30);
   }

    
}
</style>