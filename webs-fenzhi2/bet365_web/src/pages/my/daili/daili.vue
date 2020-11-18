<template>
    <div class="agency" style="background-color: #efeff4;" >
        <div class="agency_title">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color:#fff"></a>
                <h1 class="mui-title" style="color:#fff">代理中心</h1>
            </header>
            <div class="user_box">
                <div class="user-title">
                    <!-- <img :src="config.img_url+'static/image/touxiang.png'"> -->
                    <img v-if="!Person.ImgId" src="image/touxiang/wutu.jpg" alt="" srcset="">
                    <img v-if="Person.ImgId" :src="'image/touxiang/'+Person.ImgId" alt="" srcset="">
                </div>
                <div class="user-name">
                    <p>{{userInfo.UserId}}</p>
                    <p>￥<span>{{userInfo.Money}}</span></p>
                </div>
            </div>
        </div>

        <ul class="box_1">
            <li>
                <div>拥有会员</div>
                <p>{{统计.MemberCount}}</p>
            </li>
            <li>
                <div>可用收益</div>
                <p>{{统计.AgentMoney}}</p>
            </li>
            <li>
                <div>总收益</div>
                <p>{{统计.ZShouYi}}</p>
            </li>
        </ul>

        <div class="agency_message" >
            <div class="explain_box">
                <div class="explain" @click="$router.push('/dailishuoming')">
                    <div> <span  class="van-icon van-icon-question"></span><span>代理说明</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/tuiguangguanli')">
                    <div><span class="van-icon van-icon-manager"></span><span>推广管理</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <!-- <div class="explain" @click="go('/agent/agencyCommission')"> -->
                <div class="explain" @click="$router.push('/zjmingxi')">
                    <div><span class="van-icon van-icon-gold-coin"></span><span>代理拥金</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/touzhumingxi')">
                    <div><span class="van-icon van-icon-wap-nav"></span><span>投注明细</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/jiaoyimingxi')">
                    <div><span class="van-icon van-icon-card"></span><span>交易明细</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_代理统计 } from "@/api/代理接口.js";
import { mapState, mapActions } from 'vuex';
export default {
    // name:"",
    data() {
        return {
            统计:{
                AgentId:"",
                AgentMoney:"0.00",
                GradeName:"",
                MemberCount:0,
                ZShouYi:"0.00",
            },
        }
    },
    computed: {
        ...mapState({
            config:"config",
            // userinfo: state => state.user.userinfo,
            userInfo: "userInfo",
            Person:x=>x.个人资料.Person
        })
    },
    methods: {
        ...mapActions({
            进入资金明细:"资金明细/进入资金明细",
            getPersonInfo:'个人资料/getPersonInfo'
        }),
    },
    mounted() {
        this.getPersonInfo();
        api_代理统计().then(x=>{
            var data=x.data;
            var obj={}
            data.forEach(item => {
                obj[item.Key]=item.Value;
            });
            this.统计=obj;
        })
    },
}
</script>

<style lang="scss" scoped>
.agency_message .explain_box .explain div span[data-v-108e3224]:nth-child(1){
    font-size: 4.86667vw;
    margin-top: -4px;
    position: relative;
    top: 4px;
}
.mui-bar-nav {
    background: none;
    box-shadow: none;
}

.agency_title {
    background-image: url('/image/my/agent-bj.png');
    height: _vw(160);
    width: 100%;
    background-size: 100% 100%;
    .user_box {
        display: flex;
        padding-top: _vw(60);
        padding-left: _vw(30);
        .user-title {
            width: _vw(80);
            height: _vw(80);
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
    }
    .user-name {
        padding-left: _vw(20);
        padding-top: _vw(4);

        p {
            color: #fff;
            font-size: -vw(22);
        }
        p:nth-child(2) {
            font-size: -vw(18);
        }
    }
}

.box_1{
    display: flex;
    background: #fff;
    justify-content: space-around;
    margin: 0px 0px _vw(5) 0px;
    li {
        text-align: center;
        width: calc(100% / 3);
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: _vw(54);
    }
    li:not(:nth-child(1)){
        border-left: 1px solid #eeeeee;
    }
    div{
        font-size: _vw(14);
    }
    p{
        margin: 0px;
        color: #000000;
    }
}

.agency_message {
    background: #fff;
    .explain_box {
        padding: 0px _vw(10) 0px _vw(10) !important;
        .explain {
            height: _vw(50);
            display: flex;
            justify-content: space-between;
            line-height: _vw(50);
            padding: 0px _vw(10) 0px _vw(10);
            border-bottom: 1px solid #eee;
            div {
                span:nth-child(1) {
                    font-size: _vw(22);
                }
                span:nth-child(2) {
                    padding-left: _vw(10);
                    font-size: _vw(15);
                    //  color:#ccc;
                }
            }
            .right {
                color: #ccc;
            }
        }
    }
}
</style>