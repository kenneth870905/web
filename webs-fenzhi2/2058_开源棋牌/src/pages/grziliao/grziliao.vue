<template>
    <div>
        <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />
        <div
            class="ziliao"
            style="background-image:url('image/index/bg.jpg'); 
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 850px;
                background-color: #fff;
                overflow: hidden;"
        >
            <div class="头像" align="center" @click="$router.push('/basic')">
                        <img v-if="!Person.ImgId" src="image/touxiang/wutu.jpg" alt srcset />
                        <img v-if="Person.ImgId" :src="'image/touxiang/'+Person.ImgId" alt srcset />
                    </div>
                    <div  class="昵称"  @click="$router.push('/basic')" :class="{'提示':!Person.Nickname}"  >
                        <p> {{Person.Nickname ? Person.Nickname :'未设置'}}
                           <i class="van-icon van-icon-edit" ></i>
                        </p>
                    </div>
                    <div class="我的钱">￥{{userInfo.Money}}</div>
            <ul>
                <p class="info_p">基本信息</p>
                <li>
                    <p style="float:left;padding-left:8px;">账号：</p>
                    <p style="float:right; padding-right:8px;">{{userInfo.UserId}}</p>
                </li>
                <li>
                    <p style="float:left;padding-left:8px;">余额：</p>
                    <p style="float:right; padding-right:8px;">{{userInfo.Money}}</p>
                </li>
                <li>
                    <p style="float:left;padding-left:8px;">真实姓名：</p>
                    <p style="float:right; padding-right:8px;" v-if="info.Name">{{info.Name}}</p>
                    <p style="float:right; padding-right:8px;" v-else>未设置真实姓名</p>
                </li>
                <!-- <li>
                    <p style="float:left;padding-left:8px;">银行卡号：</p>
                    <p
                        style="float:right; padding-right:8px;"
                        v-if="info.BankAccount"
                    >{{info.BankAccount}}</p>
                    <p style="float:right; padding-right:8px;" v-else>未设置银行卡</p>
                </li> -->
               <p class="info_p">安全设置</p>
                 <li class="安全" @click="$router.push('/aqwenti')">
                     <span class="标题">安全问题</span>
                     <i class="van-icon van-icon-arrow 箭头" ></i>
                 </li>
                   <li class="安全" @click="$router.push('/yhk')">
                     <span class="标题">银行卡信息</span>
                     <i class="van-icon van-icon-arrow 箭头" ></i>
                 </li>
                   <li class="安全" @click="$router.push('/dlmima')">
                     <span class="标题">登录密码</span>
                     <i class="van-icon van-icon-arrow 箭头" ></i>
                 </li>
                   <li class="安全" @click="$router.push('/aqmima')">
                     <span class="标题">安全密码</span>
                     <i class="van-icon van-icon-arrow 箭头" ></i>
                 </li>
                 <p class="info_p">偏好设置</p>
                 <li>
                      <div style="margin-top:5px;">
                        <span style="font-size:16px;padding-left:10px;color:#323233;">聊天室中奖弹幕</span>
                        <span  style="float:right;padding-right:10px;"><van-switch size="20px" v-model="聊天室.显示最新中奖" active-color="#07c160" inactive-color="#ee0a24" /></span> 
                    </div>
                 </li>
                <li>
                <div style="margin-top:5px;">
                    <span style="font-size:16px;padding-left:10px;color:#323233;">购彩助手</span>
                    <span  style="float:right;padding-right:10px;"><van-switch size="20px"  v-model="偏好设置.购彩助手" active-color="#07c160" inactive-color="#ee0a24" /></span> 
                </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { api_获取提款卡 } from "@/api/资金接口.js";
export default {
    data() {
        return {
            info: {}
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        获取提款信息() {
            api_获取提款卡()
                .then(x => {
                    this.info = x.data;
                    console.log(this.info);
                })
                .catch(err => {});
        }
    },
    mounted() {
        this.获取提款信息();
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            Person: x => x.个人资料.Person,
             偏好设置: x => x.user.偏好设置,
            聊天室: x => x.聊天室,
        }),
        ...mapMutations({
                修改state: "修改state"
            }),
        ...mapActions({
            Online: "Online",
            getUserInfo: "user/getUserInfo"
        })
    }
};
</script>

<style scoped>
.van-nav-bar {
    background: #c1c1c1;
}
.van-nav-bar__title {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
.van-nav-bar .van-icon {
    color: white;
}
.ziliao ul li:first-child {
    margin-top: 15px;
}
.ziliao ul li {
    width: 100%;
    height: 35px;
    background: #d9d9d9;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    margin-top: 2px;
}
.ziliao ul li p {
    font-size: 16px;
    margin-top: 5px;
    color: #242a32;
}
.头像 img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px 4px #171111;
    margin-top: 1rem;
}
.昵称 p {
    text-align: center;
    color: white;
    padding-top: 5px;
    font-size: 15px;
}
.我的钱 {
    text-align: center;
    color: white;
    padding-top: 5px;
}
.info_p {
    font-size: 15px;
    margin: 10px 0 10px 10px;
    font-weight: bold;
    color: brown;
}
/* .安全 span{
    font-size: 16px;
    margin-top: 5px;
} */
.标题{
    font-size: 16px;
    margin-top: 6px;
    padding-left: 10px;
    position:absolute;
}
.箭头{
    float: right;
    font-size: 23px;
    margin-top: 4px;
    padding-right:5px;
}
</style>