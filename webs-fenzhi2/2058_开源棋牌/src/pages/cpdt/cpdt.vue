<template>
    <div
        style="background-image:url('image/index/bg.jpg');  width:100%;height:100%; overflow: hidden;"
    >
        <van-sticky>
        <van-nav-bar title="彩票大厅" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <div class="cpdt_userinfo">
            <ul>
                <li>
                    <i
                        class="fa fa-user"
                        style="font-size:17px; margin: 8px 0 0 0;color: white;"
                    >{{userInfo.UserId}}</i>
                </li>
                <li>
                    <p>￥{{userInfo.Money}}</p>
                </li>
                <li>
                    <button @click="$router.push('/chongzhi')" >充值</button>
                    <button @click="$router.push('/tixian')">提现</button>
                </li>
            </ul>
        </div>
         <van-notice-bar
            @click="滚动消息()"
            :text="config.roll_titles"
            left-icon="van-icon van-icon-volume"
        />
        </van-sticky>
        <div>
            <div v-for="(item,index) in res" :key="index">
                <div v-for="(item1,index) in item.children" :key="index">
                    <div v-for="(game,index) in item1.children" :key="index" class="cpdt_game">
                        <!-- <p v-if="item1.type == 'cp'">{{game.title}}</p> -->
                        <ul>
                            <li v-if="item1.type == 'cp'">
                                <p>{{game.title}}</p>
                                <button  @click="tzcp(game)">立即游戏</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import { Dialog, Toast } from "vant";
export default {
    data() {
        return {
            config: config,
            res: []
        };
    },
     computed: {
        ...mapState({
            userInfo: "userInfo",
        })
    },
    methods: {
         ...mapActions({
            Online: "Online",
            设置类型: "进入游戏/设置类型",
        }),
        onClickLeft() {
            this.$router.go('-1')
        },
        onClickRight() {},
        list() {
            this.$axios.get("json/home.json").then(x => {
                this.res = x.data;
                console.log(this.res);
            });
        },
        tzcp(game){
        console.log(game.id)
         this.$router.push("/cpiframe?i=" + game.id + "&t=" + 1);
        },
         滚动消息() {
            Dialog.alert({
                message: config.roll_titles
            }).then(() => {});
        },
    },
    created: function() {
        this.list();
    }
};
</script>

<style scoped>
.van-nav-bar {
    background: #c1c1c1;
}
.cpdt_userinfo {
    width: 100%;
    height: 40px;
    background: #b1b1b1;
}
.cpdt_userinfo ul li {
    float: left;
    width: 33%;
    padding-left: 23px;
}
.cpdt_userinfo ul li p {
    font-size: 17px;
    color: white;
    margin: 8px 0 0 0;
    font-weight: 600;
}
.cpdt_userinfo ul li button {
    background-color: rgba(250, 252, 250, 0.01);
    color: #f5f5f5;
    border: solid 1px rgba(0, 0, 0, 0.1);
    box-shadow: inset 1px 1px 0 rgba(250, 250, 250, 0.22);
    color: #fff;
    margin: 1px;
    font-weight: 600;
}
.cpdt_game ul li {
    width: 45%;
    height: 118px;
    background: #ccc;
    float: left;
    margin: 10px;
    text-align: center;
    border: solid 1px rgba(255, 255, 255, 0.29);
    background: rgba(255, 255, 255, 0.19);
    box-shadow: 0 5px 4px -1px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}
.cpdt_game ul li p:first-child{
    font-size: 18px;
    color: #ffffff;
    font-weight: bold;
   margin-top: 28px;
   margin-bottom: 6px;
}
.cpdt_game ul li button{
    width: 100px;
    height: 35px;
    background: rgba(255, 255, 255, .08);
    padding: 4px 12px;
    border: solid 1px rgba(0, 0, 0, .1);
    border-radius: 5px;
    position: relative;
    font-weight: 700;
    color: #ffffff;
    margin: 10px;
    font-size: 15px;
}
.van-notice-bar{
    background: #c0c0c0;
    border-bottom: 0;
}
.jg {
    width: 100%;
    height: 100px;
}
.van-nav-bar__title{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}
.van-nav-bar .van-icon{
    color: #fff;
    font-size: 20px;
}
</style>