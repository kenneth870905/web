<template>
    <div>
        <van-nav-bar title="安全中心" left-arrow @click-left="onClickLeft" />
        <!-- <van-cell title="个人信息"  is-link to="/grxinxi" /> -->
        <van-cell title="安全问题"  is-link to="/aqwenti" />
        <van-cell title="银行卡信息" is-link to="/yhk" />
        <van-cell title="登录密码"  is-link to="/dlmima" />
        <van-cell title="安全密码"  is-link to="/aqmima" />
        <!-- <van-cell title="" icon="van-icon van-icon-bars" is-link to="/jiaoyimingxi" /> -->
        <!-- <div class="zl_btn" >
          <button id="btn_tc" @click="goOut()">退出登录</button>
        </div> -->
    </div>
</template>

<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { mapActions, mapMutations, mapState } from "vuex";
import { Toast } from 'vant';
export default {
    data() {
        return {};
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
          ...mapActions({
            Online: "Online",
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
    computed: {
        ...mapState({
            userInfo: "userInfo"
        })
    },
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
.zl_btn{
    width: 298px;
    height: 40px;
    margin: 0 auto;
    display:flex; 
    align-items:center;
    margin-top: 30px;
}
#btn_tc{
    width: 298px;
    height: 40px;
    background: red;
    border-radius: 20px;
    color: white; 
}
.info_p {
    margin: 20px 0 10px 10px;
}
</style>