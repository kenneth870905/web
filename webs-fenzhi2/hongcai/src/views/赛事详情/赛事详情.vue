<template>
    <!-- status==0">未开始    status==1">进行中  status==2">延期  status==3">结束 -->
    <div class="赛事详情">
        <div class="title_box">
            <div class="title">
                <span class="返回" @click="返回()">
                    <van-icon name="arrow-left" />
                </span>
                <div class="title_cont">
                    <p>[竞{{obj.typeid==0 ? '足' : '篮'}}.单关] {{obj.league}}</p>
                    <p>{{obj.start_time}}</p>
                    <p v-if="obj.status==1">半(4-0)</p>
                </div>
                <div class="icon" @click="是否关注赛事的函数(obj)">
                    <van-icon :name="obj.isCollect_race==0 ? 'star-o' : 'star'" />
                </div>
            </div>
            <div class="对">
                <div class="bian">
                    <div class="img_box"><img :src="configData.api_url+obj.homeTeamhead" alt=""></div>
                    <div class="name_">{{obj.homeTeam_teamName}}</div>
                </div>
                <div class="C_content">
                    <p class="bidui" v-if="obj.status==0 || obj.status==2 ">VS</p>
                    <p class="bidui" v-if="obj.status==1|| obj.status==3 "><span>{{obj.homeScore}}</span> - <span>{{obj.guestScore}}</span> </p>

                    <P class="状态" v-if="obj.status==0">未开始</P>
                    <P class="状态" v-if="obj.status==2">延期</P>
                    <P class="状态" v-if="obj.status==3">完</P>
                    <P class="状态 进行中" v-if="obj.status==1">进行中{{85}}'</P>
                </div>
                <div class="bian">
                    <div class="img_box"><img :src="configData.api_url+obj.guestTeamhead" alt=""></div>
                    <div v class="name_">{{obj.guestTeam_teamName}}</div>
                </div>
            </div>
        </div>
        <ssxqTab :id="iddata" :dataTab="obj.PanKouPeiLv"> </ssxqTab>
    </div>
</template>
<script>
import { 添加关注, 取消关注 } from "@/api/专家.js"
import { 赛事详情 } from "@/api/比赛.js"
import { Toast } from 'vant';
const ssxqTab = () => import('@/components/赛事详情切换/赛事详情切换.vue') //进入游戏组件
import {  mapState } from 'vuex' 

export default {
    data() {
        return {
            是否登录: false,
            obj: {},
            configData: config,
            PanKouPeiLv: {}
        }
    },
    components: { ssxqTab },

    computed: {
            ...mapState({
                    是否有登录:"是否登录",

                }),
    },
    created() {
        this.iddata = this.$route.query.id;
        var obj = { id: this.iddata }
        赛事详情(obj).then(x => {
            this.obj = x.data.data
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        返回() {
            history.back()
        },
        是否关注赛事的函数(item) {
            if(this.是否有登录){
            var obj = { id: item.id, table: 'snake_collect_race' }
            if (item.isCollect_race == 0) {
                添加关注(obj).then(x => {
                    console.log(x.data.data)
                    if (x.data.code == 1) {
                        Toast(x.data.msg);
                        item.isCollect_race = 1
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
                        item.isCollect_race = 0
                        //   console.log(x.data.data)
                    } else {
                        console.log("取消关注失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
          }else{
              this.$router.push('/login')
          }
        },
    },
}

</script>

<style lang="scss" scoped>
.赛事详情 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #f5f3f3;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    z-index: 2;
    .title_box {
        position: fixed;
        top: _vw(0);
        left: _vw(0);
        width: 100%;
        z-index: 100;
        background: url("~@/assets/img/bjbanne.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        width: 100%;
        .title {
            padding: _vw(0) _vw(10);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: _vw(44);
            color: #ffffff;
            font-size: _vw(18);
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            z-index: 10;
            .title {
                color: #ffffff;
            }
            .返回 {
                font-size: _vw(20);
            }
            .title_cont {
                p {
                    margin: 0px;
                    font-size: _vw(12);
                    line-height: _vw(26);
                    text-align: center;
                }
            }
            .icon {
                font-size: _vw(20);
            }
        }
        .对 {
            width: 90%;
            margin: 0px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: _vw(70);
            padding-bottom: _vw(40);

            .bian {
                width: 40%;
                .img_box {
                    width: _vw(48);
                    height: _vw(48);
                    margin: 0px auto;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .name_ {
                    font-size: _vw(16);
                    color: #ffffff;
                    text-align: center;
                    line-height: _vw(30);
                }
            }
            .C_content {
                width: 20%;
                //    width: _vw(105);
                p {
                    margin: 0px auto;
                    text-align: center;
                }
                .bidui {
                    font-size: _vw(30);
                    font-weight: 500;
                    font-family: alternategothicno2bt;
                    color: #ffffff;
                }
                .状态 {
                    color: #78b9ff;
                    font-size: _vw(12);
                    line-height: _vw(30);
                }
                .进行中 {
                    color: #ff6700;
                    font-size: _vw(12);
                }
            }
        }
    }
}
</style>