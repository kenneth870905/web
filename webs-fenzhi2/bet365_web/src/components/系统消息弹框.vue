<template>
    <div class="系统公告" v-if="iframe.show">
        <div class="内容">
            <div class="iframe">
                <iframe :src="iframe.url" frameborder="0"></iframe>
            </div>
            <div class="btn_1" @click="关闭()">我知道了</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { api_隐藏公告 } from "@/api/公告接口.js";
export default {
    name: "",
    data() {
        return {
            显示: false
        };
    },
    computed: {
        ...mapState({
            userinfo: "userInfo"
        }),
        iframe() {
            var obj = {
                url: "",
                show: false
            };
            if (
                (!this.userinfo.Messages || this.userinfo.Messages.length == 0) && this.userinfo.Notices && this.userinfo.Notices.length > 0) {
                obj.show = true;
                obj.url =
                    config.api_url +
                    "/Systems/Notice/Show/" +
                    this.userinfo.Notices[0].Id +
                    "?p=" +
                    this.userinfo.Notices[0].HowLong;
            }
            return obj;
            // return config.api_url
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: "user/getUserInfo",
            Online: "Online"
        }),
        关闭() {
            var obj = {
                Id: this.userinfo.Notices[0].Id,
                Type: 1
            };
            console.log(obj);
            api_隐藏公告(obj)
                .then(x => {
                    console.log(x);
                    this.Online();
                })
                .catch(err => {});
        }
    }
};

</script>

<style  scoped>
.系统公告 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
}
.系统公告 .内容 {
    width: 90%;
    height: 90%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 0px 0px 50px 0px;
    position: relative;
}
.btn_1 {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
    line-height: 50px;
    text-align: center;
    background: #f4f5fa;
    border-top: 1px solid #d4d4d4;
}
iframe {
    width: 100%;
    height: 100%;
}
.iframe {
    height: 100%;
    overflow: auto;
}
</style>
