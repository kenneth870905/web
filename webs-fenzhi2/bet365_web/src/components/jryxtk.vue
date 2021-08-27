<template>
    <div>
        <van-popup v-model="进入游戏.显示弹框" :close-on-click-overlay="false">
            <div class="游戏弹框">
                <div class="title_1">{{进入游戏.title}} </div>
                <i  style="position: absolute;top: 14px;left:296px;color:red;" @click="设置state(['显示弹框',false])" class="van-icon van-icon-cross"></i>
                <ul class="list">
                    <li>
                        <div class="title_2">转入余额</div>
                        <input type="number" v-model="金额1" />
                        <button @click="转入()" class="mui-btn mui-btn-primary">转入</button>
                    </li>
                    <li>
                        <div class="title_2">转出余额</div>
                        <input type="number" v-model="金额2" />
                        <button @click="转出()" class="mui-btn mui-btn-primary">转出</button>
                    </li>
                    <li>
                        <div class="title_2">平台余额</div>
                        <input class="input_1" type="number" readonly />
                        <button class="mui-btn mui-btn-primary">刷新</button>
                    </li>
                    <li>
                        <div class="title_2">{{进入游戏.type}}余额</div>
                        <input
                            class="input_1"
                            :value="进入游戏.平台余额"
                            type="number"
                            readonly
                            placeholder="正在获取"
                        />
                        <button class="mui-btn mui-btn-primary" @click="获取平台余额()">刷新</button>
                    </li>
                </ul>
                <div class="footer">
                    <button type="button" @click="进入()" class="mui-btn mui-btn-danger">进入游戏</button>
                    <button type="button" @click="试玩()" class="mui-btn mui-btn-primary">试玩游戏</button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { api_登录试玩 } from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "",
    data() {
        return {
            config:config,
            金额1: "",
            金额2: ""
        };
    },
    computed: {
        ...mapState({
            进入游戏: x => x.进入游戏,
            userinfo:'userInfo'
        })
    },
    methods: {
        ...mapMutations({
            设置state: "进入游戏/设置state"
        }),
        ...mapActions({
            获取平台余额: "进入游戏/获取平台余额",
            转入金额: "进入游戏/转入金额",
            转出金额: "进入游戏/转出金额",
            getUserInfo: "user/getUserInfo"
        }),
        转入() {
            var 整数 = /^[0-9]+.?[0-9]*$/; //验证正整数
            if (!this.金额1) {
                this.$toast("请输入转入金额");
            } else if (!整数.test(this.金额1)) {
                this.$toast("请输入整数");
            } else {
                this.转入金额(this.金额1);
            }
        },
        转出() {
            var 整数 = /^[0-9]+.?[0-9]*$/; //验证正整数
            if (!this.金额2) {
                this.$toast("请输入金额");
            } else if (!整数.test(this.金额2)) {
                this.$toast("请输入整数");
            } else {
                this.转出金额(this.金额2);
            }
        },
        async 试玩() {
            if (this.userinfo.UserId) {
                this.$toast("请先退出当前账号");
                return;
            }
            var r = await api_登录试玩();
            if (r.data.code == 0) {
                this.$toast("登录成功");
                this.getUserInfo();
                this.获取平台余额();
            } else {
                this.$toast(r.data.msg);
            }
        },
        进入() {
            var url =
                config.api_url +
                "/M/Other/Go?gameId=" +
                this.进入游戏.id +
                "&tryOut=&type=" +
                this.进入游戏.type;
                console.log(this.进入游戏)
            console.log(url);
            if (window.plus) {
                console.log("跳转1");
                window.location.href = url;
            } else if (window.webkit) {
                console.log("跳转2");
                window.location.href = url;
            } else {
                console.log("跳转3");
                window.open(url);
            }
        }
    },
    mounted() {
        
    }
};
</script>


<style>
.van-popup {
    background: none;
}
.游戏弹框 {
    position: relative;
    width: 320px;
    min-height: 100px;
    border-radius: 20px;
    background: #ffffff;
    font-size: 14px;
    background: gainsboro;
    margin: 50% auto;
}
.游戏弹框 .title_1 {
    line-height: 40px;
    text-align: center;
    /* border: 1px solid #e5e5e5; */
}
.游戏弹框 .关闭 {
    position: absolute;
    top: 12px;
    right: 12px;
    color: red;
}
.游戏弹框 .list {
    padding: 4px 10px;
}
.游戏弹框 .list li {
    display: flex;
    align-items: center;
    margin: 10px 0px;
}
.游戏弹框 .list input {
    margin: 0px;
    padding: 0px 10px;
    height: 32px;
}
.游戏弹框 .list .title_2 {
    width: 130px;
}
.游戏弹框 .list button {
    margin: 0px 0px 0px 20px;
}
.游戏弹框 .list .input_1 {
    background: #e5e5e5;
}

.footer {
    padding: 10px 18px 25px !important;
    display: flex;
    justify-content: space-between;
    background: gainsboro !important;
    border-radius: 25px;
}
.footer button {
    width: 48%;
}
</style>