<template>
    <div>
        <van-nav-bar title="优惠活动" left-arrow @click-left="onClickLeft" />
        <van-collapse v-model="activeNames"  >
            <van-collapse-item v-for="(item,index) in 优惠列表" :key="index" right-icon="van-icon van-icon-plus">
                <div slot="title">
                    <p style="color:blue;font-weight:bold">{{item.Name}}</p>
                    <img @click="info(item)" :src="item.Img" alt />
                    <b style="font-size:12px;" class="van-icon van-icon-eye-o">点击图片查看详情</b>
                </div>
                <div v-html="item.html"></div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import { api_获取优惠列表, api_获取优惠详情 } from "@/api/优惠接口.js";
import axios from "axios";
export default {
    data() {
        return {
            activeNames: ["1"],
            优惠列表: []
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        info(item) {
            api_获取优惠详情(item.Id)
                .then(result => {
                    this.$set(item, "html", result.data);
                })
                .catch(err => {
                    this.$set(item, "html", result.data);
                });
        }
    },
    created: function() {
        var this_1 = this;
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        axios.post(url, { home: true }).then(res => {
            this.优惠列表 = res.data;
            //console.log(res.data);
        });
    }
};
</script>

<style  scopde>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
</style>