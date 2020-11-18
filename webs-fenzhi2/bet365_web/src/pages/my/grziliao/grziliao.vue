<template>
    <div>
        <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />
        <p class="info_p">头像昵称</p>
        <van-cell title="头像昵称" is-link to="/basic" />
        <p class="info_p">安全设置</p>
        <van-cell title="安全问题" is-link to="/aqwenti" />
        <van-cell title="银行卡信息" is-link to="/yhk" />
        <van-cell title="登录密码" is-link to="/dlmima" />
        <van-cell title="安全密码" is-link to="/aqmima" />
        <!-- <p class="info_p">偏好设置</p>
        <div style="margin-top:20px;">
             <span style="font-size:14px;padding-left:14px;margin-top:3px;color:#323233;">聊天室中奖弹幕</span>
             <span  style="float:right;padding-right:13px;"><van-switch size="20px" v-model="聊天室.显示最新中奖" active-color="#07c160" inactive-color="#ee0a24" /></span> 
        </div>
         <div style="margin-top:20px;">
             <span style="font-size:14px;padding-left:14px;margin-top:3px;color:#323233;">购彩助手</span>
             <span  style="float:right;padding-right:13px;"><van-switch size="20px"  v-model="偏好设置.购彩助手" active-color="#07c160" inactive-color="#ee0a24" /></span> 
        </div>
        <div class="zl_btn">
            <button id="btn_tc" @click="goOut()">退出登录</button>
        </div> -->
    </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "vant";
import { Switch } from "vant";

export default {
    name: "",
    data() {
        return {
            switch: "",
            checked: true
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        ...mapActions({
            Online: "Online",
            getUserInfo: "user/getUserInfo"
        }),
        ...mapMutations({
            修改state: "修改state",
            清空聊天室: "聊天室/清空聊天室"
        }),
        goOut() {
            api_退出登录().then(result => {
                console.log(result.data.code);
                this.Online();
                if (result.data.code == 0) {
                    Toast("退出成功");
                    this.$router.push("/");
                }
            });
        }
    },
    computed: {
        ...mapState({
            偏好设置: x => x.user.偏好设置,
            聊天室: x => x.聊天室,
            userInfo: "userInfo"
        })
    }
};
</script>

<style>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
.info_p {
    font-size: 15px;
    margin: 10px 0 10px 10px;
    font-weight: bold;
    color: brown;
}
</style>