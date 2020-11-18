<template>
    <div class="赛事详情切换">
        <van-tabs v-model="active" animated>
            <van-tab title="方案" class="方案">
                <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                    <ul class="ul_c">
                        <li class="关注的专家方案" v-for="(item,index) in  objdata.list" @click="查看方案详情(item )">
                            <div class="top">
                                <div class="img_box"><img :src="configData.api_url+item.head" alt=""></div>
                                <div class="r_div">
                                    <p class="name">{{item.name}}</p>
                                    <p class="type">{{item.type}}</p>
                                </div>
                            </div>
                            <p class="niaoy">
                                <span class="lcfa" v-if="item.identify!=='' && item.identify!==null">[{{item.identify}}]</span>
                                {{item.title}}
                          </p>
                            <div class="dui_box">
                                <div class="dui">
                                    <div class="div">竞{{item.typeid==0 ? '足' :'篮'}}</div>
                                    <span>{{item.start_time}}</span>
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
                    </ul>
                </van-list>
            </van-tab>

            <van-tab title="盘口" class="盘口">

                <ul class="title_ul">
                    <li @click="clickTab(0)" :class="{'activetit':tableType==0, 'leftTitle':tableType==0}">欧赔</li>
                    <li @click="clickTab(1)" :class="{'activetit':tableType==1 , 'contentTitle':tableType==1 }">亚盘</li>
                    <li @click="clickTab(2)" :class="{'activetit':tableType==2 , 'rightTitle':tableType==2}">大小</li>
                </ul>

                <ul class="盘口_ul">
                    <li v-for="(item,index) in 盘口数据">
                        <div class="left"> {{item.number}}</div>
                        <div class="content_c">

                            <ul class="ul_cont">
                                <li>{{tableType==0 ? '终赔' : '终盘'}}</li>
                                <li :class="{'红': item.zhusheng_peilv_color==2,'绿': item.zhusheng_peilv_color==1 }">{{item.zhusheng_peilv}}</li>
                                <li :class="{'红': item.zhusheng_peilv_color==2,'绿': item.zhusheng_peilv_color==1 }">{{item.pingju__peilv}}</li>
                                <li :class="{'红': item.zhusheng_peilv_color==2,'绿': item.zhusheng_peilv_color==1 }">{{item.kesheng__peilv}}</li>
                            </ul>
                            <ul class="ul_cont">
                                <li>{{tableType==0 ? '初赔' : '初盘'}} </li>
                                <li>{{item.zhusheng_peilv_chu}}</li>
                                <li class="绿">{{item.pingju__peilv_chu}}</li>
                                <li>{{item.kesheng__peilv_chu}}</li>
                            </ul>
                        </div>

                        <div class="right">
                            <van-icon name="arrow" class="arrow" />&nbsp; </div>
                    </li>
                </ul>
            </van-tab>

        </van-tabs>

    </div>
</template>
<script>
import { 赛事详情, 赛事详情比赛方案 } from "@/api/比赛.js"
import { mapState } from 'vuex'

export default {
    props: ['id', 'dataTab'],
    data() {
        return {
             objdata: {
                 list:[],
                 total:-1
              },
              currentPagerm: 1,//当前页数
               rowrm: 5,//每页返回多少行数据
               loading: false,



            configData: config,
            tableType: 0,
            active: 0,
            // 关注的专家方案数据: [],
            // 关注的专家方案数据:[],
        }
    },
    computed: {
        ...mapState({
            是否登录: "是否登录"
        }),
        盘口数据() {
            if (!this.dataTab) {
                console.log("这里目前没拿到数据")
                return
            }
            switch (this.tableType) {
                case 0: return this.dataTab.ty11; break;
                case 1: return this.dataTab.ty12; break;
                case 2: return this.dataTab.ty13; break;
            }
        },
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
        }
    },
    mounted() {

    },
    created() {

    },

    methods: {
        onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("onLoad")
            this.currentPagerm++//当前页数
            this.初始化()
        },
        clickTab(index) {
            this.tableType = index
        },

        初始化() {
            var objData = {
                raceid: this.id,
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
            }

            赛事详情比赛方案(objData).then(x => {
                if (x.data.code == 1) {
                    if (this.objdata.total == 0) {
                        console.log("没有数据的走这里")
                    }
                    console.log(this.objdata.list)
                    this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total
                    console.log(this.objdata.total)
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



        查看方案详情(item) {
            if (this.是否登录 == true) {
                this.$router.push("/PlanDetails?id=" + item.id);
            } else {
                Toast('请先登陆再查看方案详情!')
                this.$router.push('/login')
            }
        },

    },
}


</script>

<style lang="scss" scoped>
.红 {
    color: red;
}
.绿 {
    color: green;
}
/deep/.van-tabs--line {
    padding-top: _vw(0) !important;
}
/deep/.van-tabs__wrap {
    position: fixed;
    top: _vw(188);
    left: 0px;
    width: 100%;
    z-index: 100;
}
.赛事详情切换 {
    padding-top: _vw(216);
    background: #f5f3f3;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: auto;
    z-index: 1;
    .盘口 {
        .title_ul {
            display: flex;
            width: _vw(150);
            line-height: _vw(30);
            font-size: _vw(14);
            border: _vw(1) solid #e2d9d9;
            border-radius: _vw(25);
            margin-bottom: _vw(10);
            margin: _vw(30) auto _vw(12) auto;
            background: #fff;
            color: #acacac;

            .activetit {
                background: red;
                color: #ffffff;
            }
            .leftTitle {
                border-top-left-radius: _vw(25);
                border-bottom-left-radius: _vw(25);
            }
            .rightTitle {
                border-top-right-radius: _vw(25);
                border-bottom-right-radius: _vw(25);
            }
            .contentTitle {
                border-top-left-radius: _vw(0);
                border-bottom-left-radius: _vw(0);
            }
            > li {
                width: _vw(50);
                text-align: center;
            }
        }
        .盘口_ul {
            width: 92%;
            margin: 0px auto;
            > li {
                margin-bottom: _vw(10);
                border-radius: _vw(10);
                background: #ffffff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    width: 20%;
                    text-align: center;
                }
                .content_c {
                    flex: 1;
                    .ul_cont {
                        display: flex;
                        justify-content: space-around;
                        height: _vw(30);

                        li:nth-child(1) {
                            color: #acacac;
                        }
                        > li {
                            line-height: _vw(30);
                        }
                    }
                }
                .right {
                    width: 14%;
                    //    background: red;
                    text-align: right;
                    .arrow {
                        font-size: _vw(14);
                    }
                }
            }
        }
    }
    .方案 {
        .ul_c {
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
                    .lcfa {
                        color: #ff6700;
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
}
</style>