<template>
  <div>
      <van-nav-bar title="系统设置" left-arrow @click-left="onClickLeft" />
       <p class="info_p">偏好设置</p>
        <div style="margin-top:20px;">
             <span style="font-size:14px;padding-left:14px;margin-top:3px;color:#323233;">聊天室中奖弹幕</span>
             <span  style="float:right;padding-right:13px;"><van-switch size="20px" v-model="聊天室.显示最新中奖" active-color="#07c160" inactive-color="#ee0a24" /></span> 
        </div>
         <div style="margin-top:20px;">
             <span style="font-size:14px;padding-left:14px;margin-top:3px;color:#323233;">购彩助手</span>
             <span  style="float:right;padding-right:13px;"><van-switch size="20px"  v-model="偏好设置.购彩助手" active-color="#07c160" inactive-color="#ee0a24" /></span> 
        </div>
        <van-cell title="意见反馈" is-link to="/yijian" />
        <div class="zl_btn">
            <button id="btntc" @click="goOut()">退出登录</button>
        </div>
  </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "vant";
import { Switch } from "vant";

export default {
    data(){
        return{
            switch: "",
            checked: true
        }
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
    
}
</script>

<style scoped>
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
#btntc {
    width: 90%;
    height: 40px;
    color: red;
    background: #efeff4;
    margin-top: 50px;
    margin-left: 5%;
    font-size: 19px;
}
</style>