<template>
    <div>
        <van-nav-bar title="推广管理" left-arrow @click-left="onClickLeft" />
        <p style="margin:8px;">
            <i style="color:red" class="van-icon van-icon-info"></i>
            <span>添加绑定代理线请访问电脑版网站查看</span>
        </p>
        <div>
            <tr class="tuiguang1">
                <td>返佣类型</td>
                <td>推广链接</td>
                <td>会员</td>
                <td>总收益</td>
                <td>操作</td>
            </tr>
            <tr class="tuiguang2" v-for="(item, index) in list" :key="index">
                <td>{{item.TuiShuiType}}</td>
                <td>{{item.Domain}}</td>
                <td>{{item.MemberCount}}</td>
                <td>{{item.TuiShuiTotal}}</td>
                <td @click="复制(item)" style="color:red">复制链接</td>
            </tr>
        </div>
    </div>
</template>

<script>
import { api_获取推广链接 } from "@/api/代理接口.js";
export default {
    data() {
        return {
            list: []
        };
    },
    methods: {
        复制(item){
            this.$copyText(item.Domain).then((e) => {
                this.$toast('复制成功')
            }, (e) => {
                this.$toast('复制失败，请手动复制')
            })
        },
        onClickLeft() {
            this.$router.go(-1);
        },
    },
    mounted() {
        api_获取推广链接().then(x => {
            console.log(x);
            var data = x.data;
            data.forEach(item => {
                if (item.Url) {
                    item.Domain = item.Url;
                } else {
                    item.Domain = location.host + "/p/" + item.Id;
                }
            });
            this.list = x.data;
        });
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
.tuiguang1 {
    width: 100%;
}
.tuiguang1 td {
    width: 10%;
    background: #b9b9b9;
    border: 1px solid #eeeeee;
    text-align: center;
    color: white;
}
.tuiguang2 td {
    width: 10%;
    text-align: center;
    font-size: 12px;
}
</style>