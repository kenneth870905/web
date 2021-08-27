<template>
    <div>
        <div class="w1200">
            <gdtz />
            <div class="swpier_1">
                <div class="swiper-container" ref="swiper1">
                    <div class="swiper-wrapper">
                        <div @click="$router.push('/activity')" class="swiper-slide item" v-for="(item, index) in banner" :key="index">
                            <img :src="item.Img" alt="" srcset="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="横线"></div>

        <div class="w1200">
            <ul class="list1">
                <li v-for="(item, index) in list" @click="跳转(item)" :key="index">
                    <div class="content">
                        <div class="img_1">
                            <img :src="item.img" alt="" srcset="" />
                        </div>
                        <div class="btn_1">{{ item.text }}</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="app下载" @click="$router.push('/phone')">
            <img src="static/image/home/home1.png" alt="" srcset="" />
        </div>
    </div>
</template>

<script>
import { api_获取优惠列表 } from "@/api/优惠接口.js";
import Swiper from "swiper";
import gdtz from "@/components/滚动通知.vue";
import { mapState, mapGetters } from "vuex";
export default {
    name: "home",
    components: {
        gdtz
    },
    data() {
        return {
            banner: [],
            list: [
                {
                    img: "static/image/home/t_1.jpg",
                    text: "存款优惠",
                    path: "/activity"
                },
                {
                    img: "static/image/home/t_2.jpg",
                    text: "48BET体育彩票",
                    path: "/sports"
                },
                { img: "static/image/home/t_3.jpg", text: "娱乐城", path: "/visual" },
                {
                    img: "static/image/home/t_4.jpg",
                    text: "新3D老虎机游戏",
                    path: "/game"
                },
                {
                    img: "static/image/home/t_5.jpg",
                    text: "48BET 快乐彩",
                    path: "/lottery"
                },
                { img: "static/image/home/t_6.jpg", text: "在线客服", url: "1" }
            ]
        };
    },
    computed: {
        ...mapState({
            config: "config"
        }),
        ...mapGetters({
            站点配置: "站点配置"
        }),
        在线客服() {
            if (this.站点配置.online_chat) {
                return this.站点配置.online_chat;
            } else {
                return this.config.online_chat;
            }
        }
    },
    methods: {
        跳转(item) {
            if (item.path) {
                // document.querySelector('html,body').scrollTo({ top: 0, behavior: "smooth" })
                document.querySelector("html,body").scrollTo({ top: 0 });
                this.$router.push(item.path);
            } else if (item.url == 1) {
                window.open(this.在线客服);
            }
        }
    },
    mounted() {
        api_获取优惠列表({ home: true, type: "bet" }).then(x => {
            console.log(x);
            this.banner = x.data;
            this.$nextTick(() => {
                var swiper = new Swiper(this.$refs.swiper1, {
                    loop: true,
                    autoplay: {
                        delay: 6000,
                        disableOnInteraction: false
                    }
                });
            });
        }).catch(err => {
            console.log(err);
        });
    }
};
</script>

<style lang="scss" scoped>
.app下载 {
    position: fixed;
    left: 0px;
    bottom: 0px;
}

.swpier_1 {
    height: 340px;
    .item {
        height: 340px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.横线 {
    height: 1px;
    background: #000000;
    box-shadow: 0px 0px 10px 0px #000000;
    margin: 10px 0px;
}
.list1 {
    display: flex;
    flex-wrap: wrap;
    margin: 0px -5px;
    > li {
        width: calc(100% / 3);
        padding: 0px 5px;
        box-sizing: border-box;
        margin: 0px 0px 10px;
    }
    .content {
        position: relative;
        background: #6f6f6f;
        padding: 5px;
    }
    .img_1 {
        font-size: 0px;
        img {
            width: 100%;
        }
    }
    .btn_1 {
        margin: 10px 0px 0px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #4c4b4b;
        border-radius: 5px;
        background: linear-gradient(0deg, #2e2e2e, #4d4c4c, #777777);
        cursor: pointer;
        &:hover {
            background: linear-gradient(0deg, #0e0e0e, #4d4c4c, #6b6b6b);
        }
    }
}
</style>
