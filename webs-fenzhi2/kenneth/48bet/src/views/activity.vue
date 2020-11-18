<template>
    <div class="activity">
        <div class="banner">
            <img src="static/image/activity/1.jpg" alt="" srcset="">
        </div>
        <div class="w1200 content">
            <gdtz />
            <el-collapse accordion class="item_1" v-for="(item, index) in resData" :key="index">
                <el-collapse-item >
                    <template slot="title" >
                        <!-- <img :src="item.Img" alt @click="info(item)"/> -->
                        <img src="static/image/activity/7大电子游艺.png" alt @click="info(item)"/>
                    </template>
                    <div v-html="item.html"></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import gdtz from "@/components/滚动通知.vue";
import { api_获取优惠列表, api_获取优惠详情 } from "@/api/优惠接口.js";
import axios from "axios";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            show3: true,
            resData: []
        };
    },
    components: {
        gdtz
    },
    methods: {
        ...mapActions({
            加载中: "加载中"
        }),
        info(item) {
            console.log(item.Id);
            api_获取优惠详情(item.Id).then(result => {
                this.$set(item, "html", result.data);
            }).catch(err => {
                this.$set(item, "html", result.data);
            });
        }
    },
    created: function () {
        var this_1 = this;
        this.加载中(true);
        axios.post(config.api_url + "/Systems/Activity/InfoGetList", { home: true }).then(res => {
            this.resData = res.data;
            this.加载中(false);
        }).catch(err => {
            this.加载中(false);
        });
    }
};
</script>

<style lang="scss" scoped>
.activity {
    background: #232323;
}
.banner{
    font-size: 0px;
    img{
        width: 100%;
    }
}
.content {
    box-sizing: border-box;
    background: #3a3a3a;
    padding-bottom: 40px;

}
.item_1 {
    margin: 20px 10px;
    border-top: none;
    border-bottom: none;
    padding-bottom: 1px;
    /deep/ .el-collapse-item__header{
        height: 100px;
        .el-icon-arrow-right{
            display: none;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    /deep/ .el-collapse-item__wrap{
        background: #5a5a5a;
        border-bottom: none;
        padding: 20px;
    }
    /deep/ .el-collapse-item__content{
        color: #ffffff;
    }
}

.el-collapse-item__header.is-active {
    background: #007251;
}
/deep/ .el-collapse-item__header {
    height: auto;
}
</style>
