<template>
    <div class="sports">
        <div class="img_box">
            <img :src="config.img_url + 'static/image/sports/1.jpg'" alt="" srcset="" />
        </div>
        <div class="w1200 content">
            <gdtz />
            <ul class="list">
                <li v-for="(item, index) in list" @click="进入(item)" :key="index">
                    <div class="item">
                        <!-- <div class="img" :style="{ background: item.bg }"> -->
                        <div class="img">
                            <img :src="item.img" alt="" srcset="" />
                        </div>
                        <div class="btn_1">{{ item.btn }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import gdtz from "@/components/滚动通知.vue";
import { mapState, mapActions } from "vuex";
export default {
    name: "",
    components: {
        gdtz
    },
    data() {
        return {
            list: [
                {
                    bg: "linear-gradient(90deg, #f0a400, #ecd507,#f0a400)",
                    img: "static/image/sports/1.png",
                    btn: "波音体育",
                    gid: "ball",
                    type: "by"
                },
                {
                    bg: "linear-gradient(90deg, #008a3e, #00ba59,#008a3e)",
                    img: "static/image/sports/2.png",
                    btn: "AG体育",
                    gid: "TASSPTA",
                    type: "ag"
                },
                {
                    bg: "linear-gradient(90deg, #005f8b, #0079a8,#005f8b)",
                    img: "static/image/sports/3.png",
                    btn: "三昇体育",
                    gid: "0",
                    type: "ss"
                },
                {
                    bg: "linear-gradient(90deg, #6600ad, #8437e0,#6600ad)",
                    img: "static/image/sports/4.png",
                    btn: "泛亚电竞",
                    gid: "3",
                    type: "FY"
                }
            ]
        };
    },
    computed: {
        ...mapState({
            config: "config"
        })
    },
    methods: {
        ...mapActions({
            设置进入游戏: "待入游戏/设置进入游戏"
        }),
        进入(item) {
            var obj = {
                name: item.btn,
                type: item.type,
                gid: item.gid
            };
            this.设置进入游戏(obj);
        }
    }
};
</script>

<style lang="scss" scoped>
.img_box {
    font-size: 0px;
    img {
        width: 100%;
    }
}
.sports {
    background: #232323;
}
.content {
    background: #3a3a3a;
    padding-bottom: 1px;
}
.list {
    display: flex;
    padding: 30px 0px 30px;
    margin: 0px 0px 50px;
    li {
        padding: 10px 10px 0px;
        width: calc(100% / 4);
        // flex-shrink: 0;
        flex: 1;
        box-sizing: border-box;
        cursor: pointer;
        height: 340px;
        &:hover .img {
            border: 4px solid #797979;
            // background: #797979;
        }
        &:hover .btn_1 {
            // background: #797979;
            background: linear-gradient(150deg, #a9a9a9, #505050);

        }
    }
    .item {
        position: relative;
        padding: 0px 0px 30px;
        height: 100%;
    }
    .img {
        border: 4px solid #505050;
        // background: #505050;
        padding: 0px;
        box-sizing: border-box;
        transition: all 0.3s;
        height: 100%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .btn_1 {
        background: linear-gradient(150deg, #717171, #333333);
        transition: all 0.3s;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 217px;
        height: 60px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        line-height: 60px;
        font-weight: bold;
        &::after,
        &::before{
            position: absolute;
            width: 5px;
            height: 5px;
            border: 1px solid #8e8e8e;
            border-radius: 100%;
            content:"";
            top: 0px;
            bottom: 0px;
            margin: auto;
        }
        &::after{
            left: 10px;
        }
        &:before{
            right: 10px;
        }

    }
}
</style>
