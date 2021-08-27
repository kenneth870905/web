<template>
    <div>
        <div class="my_header">
            <i class="fa fa-home" style="font-size:35px;color:white;" @click="$router.push('/')"></i>
            <p>会员中心</p>
            <button class="my_btn" @click="goOut()">退出</button>
        </div>
        <div
            class="my_userinfo"
            style="background-image:url('image/my/bg_0.png');   background-repeat:no-repeat;background-size: 103% 97%; -moz-background-size:100% 100%; "  >
           
            <div class="等级" @click="$router.push('/viplist')">
                 普通用户
             </div>
             <div class="头像" align="center" @click="$router.push('/basic')">
                <img v-if="!Person.ImgId" src="image/touxiang/wutu.jpg" alt="" srcset="">
                    <img v-if="Person.ImgId" :src="'image/touxiang/'+Person.ImgId" alt="" srcset="">
             </div>
             <div class="昵称"  @click="$router.push('/basic')" :class="{'提示':!Person.Nickname}">
                  <p> {{Person.Nickname ? Person.Nickname :'未设置'}}<i class="van-icon van-icon-edit"></i></p>
             </div>
             <div class="我的钱">
                 ￥{{userInfo.Money}}
             </div>
        </div>
        <div class="my_list">
            <ul>
                <li @click="$router.push('/grziliao')">
                    <img src="image/my/menu-profile.png" alt />
                    <p>个人资料</p>
                </li>
                <li @click="$router.push('/chongzhi')">
                    <img src="image/my/menu-funds.png" alt />
                    <p>资金管理</p>
                </li>
                <li @click="$router.push('/tzjilu')">
                    <img src="image/my/menu-record.png" alt />
                    <p>注单详情</p>
                </li>
                 <li @click="$router.push('/gonggao')">
                    <img src="image/my/menu-message.png" alt />
                    <p>信息公告</p>
                </li>
                <li @click="$router.push('/czjilu')">
                    <img src="image/my/icon-chongzhi.jpg" alt  style="border-radius: 50%;height:67px;"/>
                    <p>充值记录</p>
                </li>
                <li @click="$router.push('/kjzs')">
                    <img src="image/my/kj_trend.png" alt />
                    <p>开奖走势</p>
                </li>
                 <li @click="$router.push('/kefu')">
                    <img src="image/my/menu-service.png" alt />
                    <p>客服中心</p>
                </li>
                <li  @click="$router.push('/yhk')">
                    <img src="image/my/menu-bankaccount.png" alt />
                    <p>银行卡</p>
                </li>
                <li @click="$router.push('/daili')">
                    <img src="image/my/menu-myreco.png" alt />
                    <p>代理申请</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { mapGetters, mapActions, mapState,mapMutations } from "vuex";
import { Dialog, Toast } from "vant";
export default {
    data() {
        return {
            active: 4
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
             Person:x=>x.个人资料.Person,
        })
    },

    methods: {
          ...mapActions({
            Online: "Online",
            进入资金明细:"资金明细/进入资金明细",
            获取个人等级:'user/获取个人等级',
            getPersonInfo:'个人资料/getPersonInfo'
        }),
        ...mapMutations({
            修改state: "修改state"
        }),
      goOut() {
            api_退出登录().then(result => {
                console.log(result.data.code);
                this.Online();
                if (result.data.code == 0) {
                    Toast("退出成功");
                    this.$router.push('/')
                }
            });
        },
    },
      mounted() {
        this.获取个人等级();
        this.getPersonInfo();
        var number=74478802.20;
    },
};
</script>

<style>
.等级{
    text-align: center;
    color: #64717a;
    font-size: 17px;
    padding-top: 20px;
    margin-bottom: 8px;
    font-weight: bold;
}
.头像 img{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px 4px #171111;
}
.昵称 p{
    text-align: center;
    color: #64717a;
    padding-top: 5px;
    font-size: 15px;
}
.我的钱{
    text-align: center;
    color: #64717a;
    padding-top: 5px;
    font-weight: bold;
    margin-right: 10px;
}
.my_header {
    width: 100%;
    height: 41px;
    background: #c1c1c1;
}
.my_header p {
    text-align: center;
    margin-top: -33px;
    font-size: 22px;
    color: white;
    font-weight: bold;
}
.my_btn {
    width: 64px;
    height: 34px;
    border-radius: 5px;
    background: #c1c1c1;
    color: white;
    position: relative;
    font-size: 17px;
    float: right;
    top: 10px;
    margin-right: 5px;
    border: 1px solid #aeaeae;
    margin-top: -39px;
}
.my_userinfo {
    width: 100%;
    height: 205px;
    background: #d9d9d9;
}
.my_userinfo p {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    padding-top: 18px;
    color: #64717a;
}
.my_huodong{
    margin-top:24px; 
}
.my_huodong button {
    background: #59c7ff;
    color: white;
    width: 22%;
    margin: 7px 0px 0px 10px;

}

.my_list {
    width: 100%;
    height: 100%;
}
.my_list ul li {
    width: 33.3%;
    float: left;
    background: #e0e0e0;
    border: 1px solid white;
    border-bottom: 0px;
    border-left: 0px;
    height: 120px;
}
.my_list ul li p {
    text-align: center;
    padding-top: 10px;
}
.my_list ul li img {
    margin-left: 37px;
    width: 72px;
    height: 61px;
    margin-top: 10px;
}
</style>
