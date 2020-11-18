<template>
    <div class="agency">
        <div class="agency_title">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">代理中心</h1>
            </header>
            <div class="user_box">
                <div class="user-title">
                    <!-- <img :src="config.img_url+'static/image/touxiang.png'"> -->
                    <img v-if="!Person.ImgId" src="static/image/touxiang/wutu.jpg" alt="" srcset="">
                    <img v-if="Person.ImgId" :src="'static/image/touxiang/'+Person.ImgId" alt="" srcset="">
                </div>
                <div class="user-name">
                    <p>{{userinfo.UserId}}</p>
                    <p>￥<span>{{userinfo.Money}}</span></p>
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

        <div class="agency_message">
            <div class="explain_box">
                <div class="explain" @click="$router.push('/agent/agencyExplain')">
                    <div><span class="iconfont icon-wenhao- e_f"></span><span>代理说明</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/agent/generalizeAdmin')">
                    <div><span class="iconfont icon-fenxiang y_f"></span><span>推广管理</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <!-- <div class="explain" @click="go('/agent/agencyCommission')"> -->
                <div class="explain" @click="进入资金明细2('11')">
                    <div><span class="iconfont icon-qian f_f"></span><span>代理拥金</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/agent/betDetail')">
                    <div><span class="iconfont icon-mingxi g_f"></span><span>投注明细</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div class="explain" @click="$router.push('/agent/detail')">
                    <div><span class="iconfont icon-mingxi1 b_f"></span><span>交易明细</span></div>
                    <div>
                        <van-icon name="arrow" class="right" />
                    </div>
                </div>
                <div v-show="显示代理咨询" class="explain" @click="咨询()">
                    <div>
                        <span class="icon iconfont icon-kefu1 "></span><span>代理咨询</span></div>
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
            userinfo: state => state.user.userinfo,
            Person:x=>x.个人资料.Person
        }),
        显示代理咨询(){
            return (this.config.Agent_consultants && (this.config.Agent_consultants.qq || this.config.Agent_consultants.Skype)) ? true : false 
        }
    },
    methods: {
        ...mapActions({
            进入资金明细:"资金明细/进入资金明细",
            getPersonInfo:'个人资料/getPersonInfo'
        }),
        进入资金明细2(value){
            this.$router.push('/my/zhmx')
            this.进入资金明细(value)
        },
        咨询(){
            
            let str = '请联系专员咨询合作详情<br/>代理联系QQ：'+this.config.Agent_consultants.qq
            if(this.config.Agent_consultants.Skype){
                str += '<br/> Skype用户：'+this.config.Agent_consultants.Skype
            }
            mui.alert(str,'代理咨询','确定',()=>{},'div')
        }
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

.mui-bar-nav {
    background: none;
    box-shadow: none;
}
.icon-kefu1{
    color: red;
}
.agency {
    min-height: 100%;
}
.咨询{
    font-size: _vw(12);
}

.agency_title {
    background-image: url('~@/assets/bg/agent-bj.png');
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