<template>
    <div class="home">
        <div class="ttop">
            <ul>
                <li>主页</li>
                <router-link to="Kitten" tag="li">活体</router-link>
                <router-link to="SafeGuard" tag="li">保障</router-link>
                <router-link to="shop" tag="li">体验馆</router-link>
                <router-link to="about" tag="li">联系</router-link>
            </ul>
            <img src="static/images/logo2.png" />
        </div>
        <topSwiper />

        <div class="title_1">
            <div class="tit-cn">热门品种</div>
            <div class="tit-en">POPULAR</div>
        </div>

        <div class="xz">
            <div v-for="(item, index) in kittenType" :key="index" v-if="index < 5">
                <span @click="$router.push(`/Kitten/${item.id}`)">{{ item.name }}</span>
            </div>
            <div>
                <span @click="$router.push(`/Kitten`)" class="last">全部</span>
            </div>
        </div>

        <div class="jd" :class="{ jd1: index % 2 == 0, jd2: index % 2 == 1 }" v-for="(item, index) in SySafeGuard" :key="index">
            <div class="jd-img">
                <img :src="`${$api_url}/tmm/public/storage/${item.cover}`" />
            </div>
            <div>
                <div class="jd-tit">科学繁育</div>
                <div class="jd-des">
                    <div>优生优育 拒绝带病繁殖</div>
                    <div>科学喂养 精心照顾80天</div>
                </div>
                <div @click="$router.push('/SafeGuard')" class="jd-more">查看更多></div>
            </div>
        </div>

        <!-- <div class="jd jd2">
            <div class="jd-img"><img src="static/images/t2.jpg"></div>
            <div class="jd-txt">
                <div class="jd-tit">健康保障</div>
                <div class="jd-line"></div>
                <div class="jd-des">
                    <div>一宠一芯片 10天健康保障</div>
                    <div>一宠一保险 90天健康医保</div>
                </div>
                <div  @click="$router.push('/SafeGuard')" class="jd-more">查看更多></div>
            </div>
        </div>-->

        <div class="gy">
            <div class="gy-tit">关于我们</div>
            <div class="gy-line"></div>
            <div class="gy-des">
                {{ about.intro }}
                <!-- <p>“淘喵喵”品牌自创立以来，已经有九年的时间；</p>
                <p>我们坚持为消费者提供健康活泼、性格稳定的品种猫咪;</p>
                <p>目前在上海拥有2家宠物店3家名猫体验馆；</p>
                <p>宠物店以销售猫咪活体为主，猫咪的周边用品为辅；</p>
                <p>名猫体验馆提供与猫咪互动的体验服务。</p>-->
            </div>
        </div>

        <div class="lx">
            <div class="lx-tit">联系</div>
            <div class="lx-line"></div>
            <ul class="lx-ul">
                <li v-for="item in shop">
                    <div class="lx-img" @click="$router.push(`/shopDetails?id=${item.id}`)">
                        <img :src="`${$api_url}/tmm/public/storage/${item.cover}`" />
                    </div>
                    <div class="lx-bt">{{ item.shopName }}</div>
                    <div class="lx-dz">{{ item.address }}</div>
                    <div class="lx-dh">{{ item.contact }}</div>
                </li>
            </ul>
        </div>
        <div class="code">TAOMIAOMIAO</div>
    </div>
</template>

<script>
import topSwiper from '@/components/topSwiper.vue'

export default {
    name: '',
    components: {
        topSwiper
    },
    data() {
        return {
            kittenType: [],
            about: {},
            shop: [],
            SySafeGuard: []
        }
    },
    methods: {
        getKittenType() {
            this.$axios.post('Kitten/selectList', {}).then(res => {
                if (res.data.code == 1)
                    this.kittenType = res.data.data;
            }).catch(err => { })
        },
        getAuto() {
            this.$axios.post('About/getAbout', {}).then(res => {
                if (res.data.code == 1)
                    this.about = res.data.data
            }).catch(err => { })
        },
        getShop() {
            this.$axios.post('Shop/getList', { 'pageSize': 6 }).then(res => {
                this.shop = res.data.data
            }).catch(err => { })
        },
        //获取首页保障说明
        getSySafeGuard() {
            this.$axios.post('SySafeGuard/getList', '').then(res => {
                console.log(res)
                if (res.data.code)
                    this.SySafeGuard = res.data.data
            }).catch(err => {
            })
        }
    },
    mounted() {
        this.getKittenType();
        this.getAuto();
        this.getShop();
        this.getSySafeGuard()
    },
}
</script>

<style lang="scss" scoped>
.ttop {
    height: _vw(55);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0px 10px;
    ul {
        display: flex;

        li {
            padding: 0 12px;
            line-height: _vw(55);
            font-size: _vw(14);
        }
    }
}

.swiper-container {
    height: _vw(200);

    img {
        height: 100%;
    }
}

.title_1 {
    text-align: center;
    margin: _vw(20) 0px 0px;

    .tit-cn {
        color: #333;
        letter-spacing: _vw(20);
        font-size: _vw(16);
        margin-bottom: 5px;
    }

    .tit-en {
        color: #cdb380;
        letter-spacing: 8px;
        font-size: _vw(12);
    }
}

.xz {
    display: flex;
    flex-wrap: wrap;
    div {
        width: 50%;
        padding: 5px;
        box-sizing: border-box;
    }
    span {
        letter-spacing: 4px;
        font-size: 12px;
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        color: #666;
        display: block;
        background: url(~@/assets/images/jt.png) right 5px center no-repeat;
        background-size: 16px;
    }
    .last {
        color: #cdb380;
        background: url(~@/assets/images/jt2.png) right 5px center no-repeat;
    }
}

.jd {
    background-size: 100%;
    padding: 20px 15px;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    .jd-img {
        width: 50%;
        img {
            width: 100%;
        }
    }
    .jd-tit {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
        position: relative;
        padding: 0px 0px 10px;
        &::after {
            position: absolute;
            content: "";
            width: 20px;
            height: 2px;
            background: #cdb380;
            left: 0px;
            bottom: 0px;
        }
    }
    .jd-des {
        font-size: 13px;
        color: #666;
        margin: 10px 0;
        line-height: 1.8;
    }
    .jd-more {
        font-size: 14px;
        color: #cdb380;
    }
}
.jd1 {
    background-image: url(~@/assets/images/dbg.png);
    flex-direction: row-reverse;
}
.jd2 {
    background-image: url(~@/assets/images/dbg2.png);
}

.gy {
    text-align: center;
    width: 95%;
    .gy-tit {
        font-size: 14px;
        font-weight: 600;
        padding-bottom: 10px;
        color: #333;
        position: relative;
    }
    .gy-line {
        height: 2px;
        width: 20px;
        background: #cdb380;
        margin: auto;
    }
    .gy-des {
        white-space: break-spaces;
        font-size: 14px;
        color: #666;
        margin: 10px 0;
        line-height: 2;
        p {
            margin: 0px;
        }
    }
}

.lx {
    padding: 10px;
    margin: 20px 0;
    .lx-tit {
        font-size: 14px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
    }
    .lx-line {
        height: 2px;
        width: 20px;
        background: #cdb380;
        margin: auto;
    }
    .lx-ul {
        display: flex;
        flex-wrap: wrap;
        margin: 15px 0px 0px;
        li {
            padding: 10px;
            width: 50%;
        }
        img {
            width: 100%;
        }
    }
    .lx-img {
        height: 105px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .lx-bt {
        font-size: 13px;
        color: #333;
        margin-top: 5px;
    }
    .lx-dz {
        margin: 3px 0;
        font-size: 9px;
        line-height: 2;
        padding-left: 21px;
        color: #555;
        background: url(~@/assets/images/dzico.png) left center no-repeat;
        background-size: 20px;
    }
    .lx-dh {
        font-size: 12px;
        line-height: 2;
        padding-left: 21px;
        color: #555;
        background: url(~@/assets/images/dzdh.jpg) left center no-repeat;
        background-size: 18px;
    }
}

.code {
    background: #000;
    height: 40px;
    margin-bottom: -50px;
    line-height: 40px;
    color: #fff;
    letter-spacing: 15px;
    text-align: center;
    padding-left: 15px;
}
/deep/ .swiper-pagination-bullet {
    background: #000;
}
</style>
