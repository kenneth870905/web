<template>
    <div>
        <van-nav-bar title="系统公告" left-arrow @click-left="onClickLeft" />
        <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(item,index) in list" :key="index">
                <div slot="title" @click="getContent(item)">
                    <i  style="color:blue;" class="van-icon van-icon-bars"></i>
                    <span style="color:blue;font-weight:bold">{{item.Title}}</span>
                    <p>{{item.Createtime}}</p>
                </div>
                <div  v-html="item.Content"></div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import { api_获取公告列表, api_公告详情 } from "@/api/公告接口.js";
export default {
    data() {
        return {
            activeNames: ["1"],
            list: []
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getContent(item) {
            if (item.Show) {
                item.Show = !item.Show;
            } else {
                if (item.Content) {
                    item.Show = true;
                } else {    
                    // this.加载中(true)
                    api_公告详情({ Id: item.Id })
                        .then(x => {
                            this.$set(item, "Content", x.data);
                            this.$set(item, "Show", true);
                            //this.加载中(false)
                        })
                        .catch(err => {
                            // this.加载中(false)
                        });
                }
            }
        }
    },
    mounted() {
        api_获取公告列表()
            .then(x => {
                this.list = x.data;
            })
            .catch(er => {});
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
</style>