<template>
    <div id="app">
        <top v-show="showTop" />
        <top2 v-show="showTop" ref="top2" />

        <router-view />
        <!-- 回到顶部 -->
        <el-backtop></el-backtop>
        <!-- 悬浮 -->
        <div class="悬浮">
            <el-popover v-if="二维码" trigger="hover" placement="left-end">
                <div  class="item" slot="reference">微信</div>
                <div class="二维码">
                    <img v-if="二维码" :src="$img_url+二维码.content" alt="" srcset="">
                </div>
            </el-popover>
        </div>

        <fot />
    </div>
</template>

<script>
import top from '@/components/top.vue'
import top2 from '@/components/top2.vue'
import fot from '@/components/fot.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name: "",
    provide() {
        return {
            setLeftMenu: (type) => {
                // console.log(this.$refs.top2)
                if (type) {
                    this.$refs.top2.showLfetMenu = true
                }
            }
        }
    },
    components: {
        top,
        top2,
        fot
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            basic:"basic"
        }),
        二维码(){
            return this.basic.find(x=>x.keyName=='wechatQR')
        },
        showTop() {
            return this.$route.path != '/register'
        }
    },
    methods: {
        ...mapActions({
            获取基本信息: "获取基本信息"
        })
    },
    mounted() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            location.href = '/h5/'
            // 移动端操作
        }
        this.获取基本信息()
    },
    watch: {
        $route() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0px;
    // background: #f5f5f5;
}

.w1200,
.w1280 {
    width: 1280px;
    margin: auto;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
* {
    box-sizing: border-box;
}

.breadcrumb {
    padding: 20px 0px;
}
.hide {
    display: none;
}

.悬浮 {
    position: fixed;
    right: 40px;
    bottom: 100px;
    .item {
        background: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        border-radius: 100%;
        color: #409eff;
        position: relative;
        cursor: pointer;
        &::after {
            position: absolute;
            width: 100%;
            height: 100%;
            content: "";
            left: 0px;
            right: 0px;
            border-radius: 100%;
        }
        &::after {
            animation: fangda 2s infinite linear;
            border: 1px solid #409eff;
        }
    }
}
.二维码{
    width: 250px;
    img{
        width: 100%;
    }
}
@keyframes fangda {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
