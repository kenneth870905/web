<template>
    <div>
        <div class="my_bg" >
            <van-row type="flex" justify="space-between">
                <van-col span="6" style="margin-left:10px;">账号:{{userInfo.UserId}}</van-col>

                <i
                    class="van-icon van-icon-setting-o"
                    @click="$router.push('/xtshezhi')"
                    style="margin-right:10px;"
                ></i>
            </van-row>
            <div class="等级" @click="$router.push('/viplist')">普通用户</div>
            <div class="头像" align="center" @click="$router.push('/basic')">
                <img v-if="!Person.ImgId" src="image/touxiang/wutu.jpg" alt srcset />
                <img v-if="Person.ImgId" :src="'image/touxiang/'+Person.ImgId" alt srcset />
            </div>
            <div class="昵称" @click="$router.push('/basic')" :class="{'提示':!Person.Nickname}">
                <p>
                    {{Person.Nickname ? Person.Nickname :'未设置'}}
                    <i class="van-icon van-icon-edit"></i>
                </p>
            </div>
            <div class="我的钱">￥{{userInfo.Money}}</div>
            <div class="充值提现">
                <ul>
                    <li>
                        <button class="my_btn1" @click="chongzhi()">立即充值</button>
                    </li>
                    <li>
                        <button class="my_btn2" @click="tixian()">马上提现</button>
                    </li>
                </ul>
            </div>
        </div>
        <van-grid :column-num="3">
            <van-grid-item
                icon="van-icon van-icon-manager-o"
                @click="$router.push('/grziliao')"
                text="个人资料"
            />
            <van-grid-item
                icon="van-icon van-icon-points"
                @click="$router.push('/tzjilu')"
                text="投注记录"
            />
            <van-grid-item
                icon="van-icon van-icon-gold-coin-o"
                @click="$router.push('/zjmingxi')"
                text="资金明细"
            />
            <van-grid-item
                icon="van-icon van-icon-refund-o"
                @click="$router.push('/czjilu')"
                text="充值记录"
            />
            <van-grid-item
                icon="van-icon van-icon-chat-o"
                @click="$router.push('/chatlist')"
                text="通讯录"
            />
             <span class="未读" v-show="未读总条数>0">{{未读总条数>99 ? '99+' : 未读总条数}}</span>
            <van-grid-item
                icon="van-icon van-icon-user-circle-o"
                @click="$router.push('/daili')"
                text="代理中心"
            />
            <van-grid-item
                icon="van-icon van-icon-chat-o"
                @click="$router.push('/gonggao')"
                text="信息公告"
            />
            <van-grid-item
                icon="van-icon van-icon-phone-circle-o"
                @click="$router.push('/kefu')"
                text="客服中心"
            />
            <van-grid-item
                icon="van-icon van-icon-setting-o"
                @click="$router.push('/xtshezhi')"
                text="系统设置"
            />
        </van-grid>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
    data() {
        return {
            active: 4
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            config:'config',
            Person: x => x.个人资料.Person
        }),
         ...mapGetters({
            未读总条数:'私聊/未读总条数'
        }),
        
    },
    methods: {
        chongzhi() {
            this.$router.push("/chongzhi");
        },
        tixian() {
            this.$router.push("/tixian");
        },
        ...mapActions({
            进入资金明细: "资金明细/进入资金明细",
            获取个人等级: "user/获取个人等级",
            getPersonInfo: "个人资料/getPersonInfo"
        })
    },
    mounted() {
        this.获取个人等级();
        this.getPersonInfo();
        var number = 74478802.2;
    }
};
</script>

<style lang="scss" scoped >
.未读{
    line-height: 3.2vw;
    height: 3.2vw;
    min-width: 3.2vw;
    font-size: 2.66667vw;
    padding: 0px 2px;
    position: absolute;
    top: 24.33333vw;
    right: 34.33333vw;
    background: red;
    color: #ffffff;
    border-radius: 3.2vw;
    }
.等级 {
    text-align: center;
    color: white;
    font-size: 17px;
    margin-top: 5px;
    margin-bottom: 8px;
}
.头像 img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px 4px #171111;
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
.my_bg {
    width: 100%;
    height: 250px;
    background: #393939;
}
.van-row--justify-space-between {
    color: white;
    font-size: 15px;
    padding-top: 10px;
}
.a1 {
    color: white;
    font-size: 17px;
    margin-top: 20px;
}
.a2 {
    color: white;
    font-size: 8.66667vw;
    font-weight: 700;
    font-family: Microsoft YaHei, Arial, sans-serif;
    margin-top: 17px;
}
.a3 {
    color: yellow;
}
.my_btn1 {
    width: 55%;
    border: 0;
}
.my_btn2 {
    width: 55%;
    border: 0;
}
.my_business ul {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
}
.my_business ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    width: 33.3%;
    border-left: -vw(1) solid #eee;
    border-top: -vw(1) solid #eee;
    height: 90px;
    padding-top: -vw(10);
    border: 1px solid #eee;
}
.my_business ul li img {
    width: 30px;
}
.充值提现 {
    width: 100%;
}
.充值提现 ul li {
    float: left;
    width: 50%;
    text-align: center;
}
</style>
