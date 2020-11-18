<template>
    <div class="home">

        <div class="彩票">
            <!-- 左边固定 -->
            <div class="固定" :class="{ active: 显示全部 }">
                <div class="titleg" @click="显示全部=true" :class="{ active: 显示全部 }">推荐</div>
            </div>
            <!-- 右边边固定 -->
            <div class="右边边固定" @click="go('/NavClass')">
                <span class="iconfont icongengduo1"></span>
            </div>
            <!-- 标题栏 -->
            <van-tabs class="table" title-active-color="#499af6" v-model="type" @click="onClick" :class="{active:!显示全部}">
                <van-tab class="nav_n" v-for="(item, index) in 导航" :key="index" :title="item">
                </van-tab>
            </van-tabs>
            <!-- ===============================热门的内容显示最左边=============================== -->
            <div class="content_tA" v-if="显示全部">
                <moren> </moren>
            </div>
            <!-- ===============================热门的内容显示最左边结束=============================== -->

            <div class="content_t" v-if="index==type && !显示全部" v-for="(item,index) in 导航">
                <div v-if="item=='精彩视频'">
                    <ship></ship>
                </div>

                <div v-if="item=='特色漫画'">
                    <manhua></manhua>
                </div>

                <div v-if="item=='全能小说'">
                    <xiaoshuo></xiaoshuo>
                </div>

                <div v-if="item=='有声小说'"> 
                    <youshenXS></youshenXS>
                </div>

                 <div v-if="item=='电影种子'"> 
                    <dyzz></dyzz>
                </div>

                 <div v-if="item=='低俗内容'">
                    <dslr></dslr>
                </div>
            </div>
        </div>
        

    </div>
</template>
<script>
import { Duplex } from 'stream'
const moren = () => import('@/components/首页默认展示组件/首页默认展示组件.vue') 
const ship = () => import('@/components/视频/视频.vue') 
const manhua = () => import('@/components/漫画/漫画.vue') 
const xiaoshuo = () => import('@/components/小说/小说.vue') 
const youshenXS = () => import('@/components/有声小说/有声小说.vue') 
const dyzz = () => import('@/components/电影种子/电影种子.vue') 
const dslr = () => import('@/components/低俗内容/低俗内容.vue') 
export default {
    data() {
        return {
            show: false,
            tableType: 0,
            manhType: 0,
            xiaosType: 0,
            title: "",
            hah: " ",
            banner: [
                require('../../assets/img/banner1.jpg'),
                require('../../assets/img/banner2.jpg'),
                require('../../assets/img/banner3.jpg'),
            ],
            显示全部: true,
            //  导航更多分类:false,
            type: 0,
            导航: [
                "精彩视频",
                "特色漫画",
                "全能小说",
                "有声小说",
                "电影种子",
                "低俗内容",
                  ""
            ]
        }
    },
    components: { moren, ship, manhua, xiaoshuo, youshenXS,dyzz,dslr },// 注册组件

    computed: {

    },
    created() {

    },
    methods: {
     
        全部() {
            this.全部内容 = true
            this.active = 0
            this.isActive = true
        },
        onClick(name, title,item) {
            this.显示全部 = false
            this.hah = title
            console.log(title)
            console.log(name)
        //  switch (title) {
        //      case "精彩视频":  this.$router.push('/VidelRM');
        //         break;
        //       case "特色漫画":  this.$router.push('/cartoonRM');
        //         break;
        //     case "有声小说":  this.$router.push('/videoFictionRM');
        //         break;
        //      case "全能小说":  this.$router.push('/fictionRM');
        //         break;
        //            case "电影种子":  this.$router.push('/fictionRM');
        //         break;
        //            case "低俗内容":  this.$router.push('/fictionRM');
        //         break;
        //     default: alert("router里没找到文件地址");
        //     }

        },
        go轮播(item) {rrr
            console.log(item)
        },
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
        tablego(index) {
            this.tableType = index
        },
        漫画切换(index) {
            this.manhType = index
        },
        小说切换(index) {
            this.xiaosType = index
        },
        搜索() {
            this.show = !this.show;
        },
    },
    mounted() {

    },
}


</script>

<style lang="scss" scoped>

/deep/.van-tabs--line{
    padding-top:_vw(0) !important;
}




.content_tA {
}
.content_t {
    padding-top: _vw(43);
    height: 100%;
    // position: absolute;
    // left: 0px;
    // top:0px;
    // width: 100%;
    // height: 100%;
}
/deep/.van-tab {
    color: #fff;
    font-size: _vw(14);
    line-height: _vw(43);
}
/deep/.van-tabs--line .van-tabs__wrap {
    height: _vw(43);
}
.titleActive {
    color: #ec304c;
}
.home {
    background: #ffffff;
    width: 100%;
    // ++++++++++++++++++table切花开始+++++++++++++++++++++++
    .彩票 {
        background: #ffffff;
        overflow: auto;
        position: absolute;
        width: 100%;
        left: 0px;
        top: 0px;
        height: 100%;
        box-sizing: border-box;
        .右边边固定 {
            position: fixed;
            right: 0px;
            top: 0px;
            z-index: 20;
            width: _vw(30);
            height: _vw(43);
            background: #d61f3a;
            // background: #ffffff;
            text-align: center;
            line-height: _vw(43);
            color: #fff;
            .icongengduo1 {
                font-size: _vw(20);
            }
        }
        .table {
            margin-left: _vw(65);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10;
            width: 100%;
            height: _vw(43);
            /deep/ .van-tabs__line {
                // display: none
                background-color: #fff;
                margin-bottom:_vw(3);
            }

            /deep/.van-tabs__nav {
                background: linear-gradient(135deg, #ec304c 0%, #cb1c36 100%);
            }
            /deep/ .van-tab--active {
                color: #fff;
            }
        }
        .table.active {
            /deep/ .van-tabs__line {
                display: block;
            }
        }

        /deep/.active {
            //右边热门激活样式
            color: #499af6 !important;

            font-weight: 400;
        }

        .固定 {
            position: fixed;
            top: 0px;
            // width: 100%;
            height: _vw(43);
            z-index: 20;
            background: linear-gradient(135deg, #ec304c 0%, #cb1c36 100%);
            .titleg {
                width: _vw(66);
                height: _vw(43);
                line-height: _vw(43);
                text-align: center;
                box-shadow: 1px -4px 10px rgba(0, 0, 0, 0.45);
                color: #fff;
                font-size: _vw(18);
            }
        }
        /deep/.van-tabs__wrap {
            color: #fff;
        }
    }
}
</style>