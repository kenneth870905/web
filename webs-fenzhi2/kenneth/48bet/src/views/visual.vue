<template>
    <div class="visual">
        <div class="banner">
            <img src="static/image/visual/1.jpg" />
        </div>
        <div class="w1200">
            <gdtz />
            <div class="title_1">视讯直播</div>
            <ul class="list">
                <li v-for="(item, index) in list" :key="index">
                    <div>
                        <div class="img_box" @click="进入游戏(item)">
                            <img class="bg_1" src="static/image/visual/bg_1.png" alt="" srcset="" />
                            <div class="bg_2">
                                <img :src="item.img" alt="" srcset="" />
                            </div>
                        </div>
                        <div class="footer_1">
                            <span @click="进入游戏(item)" v-if="!userinfo.UserId" class="试玩">试玩</span>
                            <span @click="$router.push('/sxjs/' + item.type + '/' + item.gid)" class="简介">{{ item.name }}简介</span>
                        </div>
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
                    type: "AG",
                    img: "static/image/visual/ag_1.png",
                    name: "AG国际厅",
                    gid: "2"
                },
                {
                    type: "AG",
                    img: "static/image/visual/ag_2.png",
                    name: "AG旗舰厅",
                    gid: "1"
                },
                {
                    type: "BY",
                    img: "static/image/visual/bg.png",
                    name: "BG视讯大厅",
                    gid: "live"
                },
                {
                    type: "BG",
                    img: "static/image/visual/bbin.png",
                    name: "波音厅",
                    gid: "1"
                }
            ]
        };
    },
    computed: {
        ...mapState({
            userinfo: x => x.user.userinfo
        })
    },
    methods: {
        ...mapActions({
            设置进入游戏: "待入游戏/设置进入游戏"
        }),
        进入游戏(item) {
            var obj = {
                name: item.name,
                type: item.type,
                gid: item.gid
            };
            this.设置进入游戏(obj);
        }
    }
};
</script>

<style lang="scss" scoped>
.visual {
    background: #232323;
}
.title_1 {
    padding: 10px;
}
.banner {
    img {
        width: 100%;
    }
}
.w1200 {
    background: #3a3a3a;
}

.list {
    display: flex;
    flex-wrap: wrap;
    // margin: 0px -5px;
    background: #3a3a3a;
    > li {
        width: 50%;
        padding: 2.5px;
        box-sizing: border-box;
    }
    .img_box {
        cursor: pointer;
        font-size: 0px;
        position: relative;
        img {
            width: 100%;
        }
        .bg_2 {
            position: absolute;
            top: 5px;
            bottom: 5px;
            left: 5px;
            right: 5px;
            overflow: hidden;
            box-sizing: border-box;
            padding: 5px;
            img {
                position: absolute;
                left: 0px;
                top: 0px;
                height: 200%;
            }
        }
        &:hover {
            .bg_2 {
                img {
                    opacity: 0.8;
                    top: auto;
                    bottom: 0px;
                }
            }
        }
    }
    .试玩 {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border-right: 1px solid #ffffff;
        &:hover {
            text-decoration: underline;
        }
    }
    .简介 {
        cursor: pointer;
        font-size: 12px;
        margin: 0px 10px;
        padding: 0px 10px;
        &:hover {
            text-decoration: underline;
        }
    }
    .footer_1 {
        line-height: 39px;
    }
}
</style>
