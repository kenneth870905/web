<template>
    <div class="game">
        <div class="banner">
            <img src="static/image/game/1.jpg" alt="" srcset="" />
        </div>
        <div class="w1200">
            <gdtz />
            <ul class="list1">
                <li :class="{ active: 当前游戏 == item }" @click="切换游戏(item)" v-for="(item, key, index) in 电子游艺" :key="index">
                    <div class="img_box">
                        <img :class="key" :src="'static/image/dianziyouyi/' + key + '-1.png'" />
                    </div>
                    <div class="title_1">{{ item.name }}</div>
                </li>
            </ul>
            <div class="box_2">
                <div class="img">
                    <img :class="当前游戏.key" :src="'static/image/dianziyouyi/' + 当前游戏.key + '-3.png'" />
                </div>
                <div class="搜索">
                    <input type="text" v-model="name" />
                    <div class="icon_box">
                        <i class="el-icon-search"></i>
                    </div>
                </div>
            </div>
            <ul class="box_3">
                <li class="title_1">游戏分类：</li>
                <li @click="分类 = -1" :class="{ active: 分类 == -1 }" class="item">
                    全部
                </li>
                <li @click="分类 = index" :class="{ active: 分类 == index }" class="item" v-for="(item, index) in 当前游戏.type" :key="index">
                    {{ item }}
                </li>
            </ul>

            <div class="splite_title">
                <span class="mg-color">推荐游戏</span>
                <span class=""></span>
            </div>

            <div class="推荐 swiper1">
                <div class="swiper-container" ref="swiper1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="进入游戏(item)" v-for="(item, index) in 推荐" :key="index">
                            <div class="item">
                                <div class="img_box">
                                    <img :src="'static/image/dianziyouyi/' +item.key +'/' +item.id +item.img" />
                                </div>
                                <div class="name">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="splite_title">
                <span class="mg-color">全部游戏</span>
                <span class="">共{{ 新游戏.length }}款游戏</span>
            </div>
            <ul class="list2">
                <li @click="进入游戏(item)" v-for="(item, index) in 新游戏" :key="index">
                    <div class="item">
                        <div class="img_box">
                            <!-- <el-image v-loading="!item1.imgLoad" element-loading-background="rgba(189, 189, 189, 0.8)" @error="img_load(item1)" @load="img_load(item1)" :src="'static/image/dianziyouyi/'+当前游戏.key+'/'+item.id+当前游戏.img" lazy></el-image> -->
                            <el-image v-loading="!item.imgLoad" @error="$set(item, 'imgLoad', true)" @load="$set(item, 'imgLoad', true)" :src="'static/image/dianziyouyi/' +当前游戏.key +'/' +item.id +当前游戏.img" lazy></el-image>
                            <!-- <img :src="'static/image/dianziyouyi/'+当前游戏.key+'/'+item.id+当前游戏.img" alt="" srcset="">   -->
                        </div>
                        <div class="name">{{ item.title }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import gdtz from "@/components/滚动通知.vue";
import { mapActions } from "vuex";
export default {
    name: "",
    components: {
        gdtz
    },
    data() {
        return {
            电子游艺: {},
            当前游戏: {},
            name: "",
            分类: "-1",
            推荐: []
        };
    },
    computed: {
        新游戏() {
            var list = [];
            if (!this.当前游戏.game) {
                return [];
            }
            if (this.分类 == -1) {
                list = this.当前游戏.game;
            } else {
                list = this.当前游戏.game.filter(x => x.type == this.分类);
            }
            if (this.name) {
                list = list.filter(x => x.title.includes(this.name));
            }
            // list=list.reverse();
            return list;
        }
    },
    methods: {
        ...mapActions({
            设置进入游戏: "待入游戏/设置进入游戏",
            加载中: "加载中"
        }),
        切换游戏(item) {
            this.分类 = -1;
            this.name = "";
            this.当前游戏 = item;
        },
        设置轮播() {
            var swiper = new Swiper(this.$refs.swiper1, {
                slidesPerView: 6,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
            });
        },
        进入游戏(item) {
            console.log(item);
            var obj = {
                name: item.key.toUpperCase() + item.title,
                type: item.key,
                gid: item.gid
            };
            this.设置进入游戏(obj);
        }
    },
    mounted() {
        this.加载中(true);
        this.axios
            .get("static/json/delist.json")
            .then(x => {
                console.log(x);
                var data = x.data;
                var list = [];
                for (const key in data) {
                    data[key].key = key;
                    data[key].game.reverse();
                    data[key].game.forEach(element => {
                        element.key = key;
                        element.img = data[key].img;
                        if (element.tj) {
                            list.push(element);
                        }
                    });
                }
                this.推荐 = list;
                this.$nextTick(() => {
                    this.设置轮播();
                });
                this.电子游艺 = data;
                var key = Object.keys(this.电子游艺)[0];
                this.当前游戏 = this.电子游艺[key];
                this.加载中(false);
            })
            .catch(err => {
                console.lgo(err);
                this.加载中(false);
            });
    }
};
</script>

<style lang="scss" scoped>
.game {
    background: #232323;
}
.w1200 {
    background: #272727;
    border-left: 1px solid #3a3a3a;
    border-right: 1px solid #3a3a3a;
}
.banner {
    img {
        width: 100%;
    }
}

.list1 {
    // margin: 10px 0px 0px;
    padding: 10px 0px 10px 20px;
    display: flex;
    font-size: 12px;
    text-align: center;
    border-bottom: 3px solid #3a3a3a;
    li {
        margin: 0px 5px;
        width: 76px;
        border-radius: 5px;
        cursor: pointer;
        &.active {
            background: #fff;
            color: #000000;
        }
        &:hover {
            background: #fff;
            color: #000000;
        }
    }
    .img_box {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            &.fy,
            &.FG {
                width: 42px;
            }
            &.HB{
                width: 45px;
            }
            &.LY{
                width: 60px;
            }
            &.cp9{
                width: 54px;
            }
            &.sw{
                width: 43px;
            }
        }
    }
    .title_1 {
        padding: 5px 0px;
    }
}

.box_2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 20px;
    .img {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            max-height: 100%;
            &.HB{
                height: 46px;
            }
            &.LY{
                height: 30px;
            }
            &.cq9{
                height: 30px;
            }
            &.sw{
                height: 40px;
            }
        }
    }
    .搜索 {
        margin: 0px 70px 0px 0px;
        // padding: 0px 10px 0px 0px;
        width: 200px;
        background: #219d8e;
        border: 2px solid #219d8e;
        display: flex;
        align-items: center;
        input {
            flex-grow: 1;
            padding: 0px 5px;
            height: 30px;
            // margin: 0px 5px 0px 0px;
            width: 100%;
        }
        .icon_box {
            width: 36px;
            text-align: center;
            flex-shrink: 0;
        }
    }
}

.box_3 {
    background: #219d8e;
    display: flex;
    align-items: center;
    .title_1 {
        width: 100px;
        line-height: 40px;
        height: 40px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
    }
    .item {
        min-width: 70px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        padding: 0px 10px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 5px;
        &.active {
            color: #219d8e;
            background: #fff;
        }
        &:hover {
            color: #219d8e;
            background: #fff;
        }
    }
}

.splite_title {
    border-bottom: 2px solid #219d8e;
    margin: 10px 20px 0px;
    display: flex;
    justify-content: space-between;
    span {
        display: inline-block;
        width: 100px;
        text-align: center;
        float: left;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .mg-color {
        background: #219d8e;
    }
}

@mixin style_1() {
    .item {
        padding: 15px;
        border: 1px solid #7f7f7c;
        border-radius: 5px;
        background: #2f2e2e;
    }
    .img_box {
        height: 152px;
        overflow: hidden;
        cursor: pointer;
        .el-image {
            width: 100%;
            height: 100%;
        }
        /deep/ .el-image__inner,
        img {
            transition: all 0.3s;
            width: 100%;
            height: 100%;
            object-fit: contain;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
    .name {
        // height: 35px;
        line-height: 35px;
        margin: 0 auto;
        text-align: center;
        border-radius: 5px;
        background-color: #171717;
        margin-top: 5px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: #565656;
        }
    }
}

.swiper1 {
    padding: 10px 20px 40px;
    @include style_1;
}

.list2 {
    flex-wrap: wrap;
    display: flex;
    margin: 0px 20px 0px;
    padding: 20px 0px 40px;
    > li {
        width: calc(100% / 6);
        padding: 5px;
        box-sizing: border-box;
    }
    @include style_1;
}
</style>
