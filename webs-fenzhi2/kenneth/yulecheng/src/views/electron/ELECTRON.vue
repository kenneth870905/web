<template>
    <div class="electron-banner">
        <div class="container electron_C">
            <ul class="头部">
                <li v-for="(item, key, index) in 电子游艺" :key="index" @click="选择游戏(key)" :class="{'active':activeName==key}">
                    <div>
                        <img :style="key=='fy' || key=='FG' || key=='sw' ? 'width:45px;height:45px;' : ''" :src="config.img_url+'image/dianziyouyi/'+key+'-1.png'" alt="" srcset="">
                        <img :style="key=='fy' || key=='FG' || key=='sw'? 'width:45px;height:45px;' : ''" :src="config.img_url+'image/dianziyouyi/'+key+'-2.png'" alt="" srcset="">
                    </div>
                    <span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
            <!-- 内容头部开始 -->
            <div class="AG_title">
                <div class="title_img_left">
                    <img :class="当前选中.key"  :src="`${config.img_url}image/dianziyouyi/${当前选中.key}-s.png`" alt="" srcset="">
                </div>
                <div class="div_btn" @click="全部()">全部</div>
                <div class="type_select" v-if="当前选中.type && 当前选中.type.length>0">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{过滤类型.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="index" v-for="(item, index) in 当前选中.type" :key="index">{{item}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <div class="input">
                    <el-input placeholder="搜索游戏名" v-model="过滤名称" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>

            <div class="内容">
                <li>
                    <div class="AGlist_left" :class="activeName">
                        <ul>
                            <!-- v-if="index1<size" -->
                            <!-- <li  @click="进入游戏(item1)" v-for="(item1, index1) in 游戏列表" :key="index1"> -->
                            <li v-lazy-container @click="进入游戏(item1)" v-for="(item1, index1) in 游戏列表" :key="index1">
                                <div class="gameImg_box">
                                    <!-- <el-image v-loading="!item1.imgLoad" element-loading-background="rgba(189, 189, 189, 0.8)" @error="img_load(item1)" @load="img_load(item1)" :src="`${config.img_url}image/dianziyouyi/${当前选中.key}/${item1.id}${当前选中.img}`" :lazy="true"></el-image> -->
                                    <img :data-src="`${config.img_url}image/dianziyouyi/${当前选中.key}/${item1.id}${当前选中.img}`" alt="" srcset="">
                                    <div class="gouGame">
                                        <div class="gouGame_btn">开始游戏</div>
                                    </div>
                                </div>
                                <p>{{item1.title}}</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- 左边 -->
                <li>
                    <!--右边的热门和中奖 开始 -->
                    <div class="AGlist_right">
                        <!-- 纵向滚动最新中奖 -->
                        <div class="AGlist_right_rm">
                            <h3>最新中奖</h3>
                            <div class="swiper-container swiper_1" ref="swiper">
                                <ul class="swiper-wrapper">
                                    <li @click="进入游戏(item)" :inde="index" class="swiper-slide" v-for="(item, index) in 最新中奖" :key="index">
                                        <!-- <li class="swiper-slide" :ind="index" v-for="(item, index) in 最新中奖" :key="index"> -->
                                        <div class="content_none zjxx">
                                            <div class="content_none_left">
                                                <div class="content_none_img_box"><img :src="config.img_url+'image/dianziyouyi/'+item.上级key+'/'+item.id+item.img_type" alt=""></div>
                                                <div class="content_none_p">
                                                    <p class="top_P">{{item.title}}</p>
                                                    <p class="bottom_P  bottom_P_zj">中奖&nbsp;<span>￥{{item.money}}</span></p>
                                                </div>
                                            </div>
                                            <div class="content_none_right">
                                                <p>会员&nbsp;<span class="content_none_name">{{item.user}}***</span></p>
                                                <p class="content_none_time">{{item.time}}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        <!-- 热门推荐 -->
                        <div class="AGlist_right_rm">
                            <h3>热门推荐</h3>
                            <ul>
                                <li @click="进入游戏(item)" v-if="index<10" v-for="(item, index) in 热门推荐" :key="index">
                                    <div class="title_block">
                                        <div class="rm_title_box">
                                            <div class="rm_num">{{index+1}}</div>
                                            <div class="rm_title">{{item.title}}</div>
                                        </div>
                                        <div class="rm_xx">
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                        </div>
                                    </div>
                                    <div class="content_none">
                                        <div class="content_none_left">
                                            <div class="content_none_img_box">
                                                <img :src="config.img_url+'image/dianziyouyi/'+item.上级key+'/'+item.id+item.img_type" alt="">
                                            </div>
                                            <div class="content_none_p">
                                                <p class="top_P">{{item.title}}</p>
                                                <p class="bottom_P">YOPLAY厅</p>
                                            </div>
                                        </div>
                                        <div class="content_none_right">
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <span class="el-icon-star-on"></span>
                                            <div class="div_btn">进入游戏</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import $ from 'jquery'

import Mock from 'mockjs'
export default {
    data() {
        return {
            baseUrl: process.env.BASE_URL,
            config: config,
            type: '', // 类型
            Money: '', // 合计余额
            platformMoney: '', // 平台余额

            电子游艺: {

            },
            过滤类型: {
                type: '',
                name: '选择游戏类型'
            },
            过滤名称: '',
            activeName: '',
            最新中奖: [],
            当前选中:{},
            size:20
        }
    },
    computed: {
        游戏列表() {
            var list = this.当前选中.game; 
            if (this.过滤类型.type != '') {
                list = list.filter(x => x.type == this.过滤类型.type)
            }
            if (this.过滤名称) {
                list = list.filter(x => x.title.includes(this.过滤名称))
            }
            return list
        },
        热门推荐() {
            var list = []
            var 电子游艺 = this.电子游艺
            for (const key in 电子游艺) {
                电子游艺[key].game.forEach(item => {
                    if (item.tj == 1) {
                        item.上级key = key
                        list.push(item)
                    }
                })
            }
            return list
        }
    },
    methods: {
        ...mapActions({
            设置进入游戏弹框: '设置进入游戏弹框',
            设置待进入游戏: '设置待进入游戏',
            getallMoney: 'MoneyAll'
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        img_load(item) {
            this.$set(item, 'imgLoad', true)
        },
        // 选择类型
        handleCommand(val) {
            this.过滤类型.type = val
            this.过滤类型.name = this.当前选中.type[val]
        },
        全部() {
            this.过滤类型.type = 0
            this.过滤类型.name = '选择游戏类型'
        },
        选择游戏(key) {
            this.activeName = key
            this.过滤名称 = ''
            this.过滤类型 = {
                type: '',
                name: '选择游戏类型'
            }
            this.当前选中 = this.电子游艺[key];
        },
        进入游戏(item) {
            //  vuex渲染平台类型余额
            var cname = this.电子游艺[item.上级key].cname
            this.修改state(['Aname', cname])
            var type = this.电子游艺[item.上级key].id
            item.name = item.上级key.toUpperCase() + item.title // 渲染title
                
            let obj ={
                    gid:item.gid,
                    id:item.id,
                    name:item.上级key.toUpperCase()+item.title,
                    type:this.电子游艺[item.上级key].id
                }

            this.设置待进入游戏(obj)
            this.设置进入游戏弹框(true)
        }
    },
    mounted() {
        var this_1 = this
        this.axios.get('static/json/delist.json').then(x => {
            var data = x.data
            for (const key in data) {
                data[key].key = key
                data[key].game.reverse()
            }
            this.电子游艺 = data
            var key_1 = Object.keys(data)[0]
            this.activeName = key_1
            this.当前选中=data[key_1];

            // 下面是随机最新中奖
            var 所有游戏列表 = []
            var 电子游艺 = this.电子游艺
            for (const key in 电子游艺) {
                电子游艺[key].game.forEach(item => {
                    item.上级key = key
                    item.img_type = 电子游艺[key].img
                    所有游戏列表.push(item)
                })
            }

            var list = []
            var length = 所有游戏列表.length
            var date = new Date()
            var index = 0
            for (let i = 0; i < 20; i++) {
                index++
                var number = Mock.Random.integer(0, length)
                var obj = Object.assign({}, 所有游戏列表[number])
                obj.user = Mock.Random.character() + Mock.Random.character() + Mock.Random.character()
                if (index < 4) {
                    obj.user = '1' + Mock.Random.integer(2, 9) + Mock.Random.integer(2, 9)
                } else {
                    index = 0
                    obj.user = Mock.Random.string('lower', 3)
                }
                var 随机月 = Mock.Random.integer(1, date.getMonth())
                var 随机天 = Mock.Random.integer(1, 30)
                obj.time = (随机月 > 9 ? 随机月 : '0' + 随机月) + '-' + (随机天 > 9 ? 随机天 : 0)
                obj.money = Mock.Random.integer(1000, 100000)
                list.push(obj)
            }
            this.最新中奖 = list

            this.$nextTick(() => {
                setTimeout(() => {
                    var swiper = new Swiper(this.$refs.swiper, {
                        direction: 'vertical',
                        slidesPerView: 4,
                        loop: true,
                        autoplay: 2000,
                        autoplayDisableOnInteraction: false
                    })
                }, 200)
            })
        }).catch(err => {})
        
    }
}

</script>

<style lang="scss" scoped>
/deep/ .el-image__inner{
    object-fit: contain;
}
.swiper_1 {
    height: 340px;
}

.头部 {
    text-align: center;
    display: flex;
    background: #f4f4f4;
    > li {
        width: 120px;
        height: 120px;
        > div {
            width: 60px;
            height: 60px;
            position: relative;
            margin: 16px auto 6px;
            img {
                position: absolute;
                top: 0px;
                left: 0px;
                bottom: 0px;
                right: 0px;
                margin: auto;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            img:nth-child(2) {
                display: none;
            }
        }
    }
    > li:hover {
        background: #fff;
        box-shadow: 0px 0px 3px 0px #cccccc;
    }
    > li.active {
        background: #f70;
        color: #fff;
        > div {
            img:nth-child(1) {
                display: none;
            }
            img:nth-child(2) {
                display: block;
            }
        }
    }
}

.内容 {
    display: flex;
    > li:nth-child(1) {
        width: 76%;
        flex-grow: 1;
        margin-right: 20px;
    }
    > li:nth-child(2) {
        width: 24%;
        flex-shrink: 0;
        border-left: 1px solid #ccc;
    }
    .el-tabs--border-card {
        box-shadow: none;
        border: none;
    }
}

.electron-banner {
    background-image: url("~@/assets/image/dz-banner.jpg");
    background-repeat: no-repeat;
    background-color: black;
    width: 100%;
    padding-top: 440px;
}

//top样式
.AG_title {
    display: flex;
    background: #f0f2f8;
    color: black;
    height: 60px;
    text-align: center;
    border-top: 1px solid #cccccc;
    .title_img_left {
        // padding-top: 10px;
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 20px;
        img {
            height: 60%;
            &.MG{
                height: 100%;
            }
            &.BG{
                height: 100%;
            }
            &.LY{
                height: 30%;
            }
        }
    }

    // 全部 假按钮
    .div_btn {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        border: 1px solid red;
        // padding-top: 6px;
        color: red;
        margin: 13px 30px 0px 20px;
        cursor: pointer;
    }
    .div_btn:hover {
        background: red;
        color: #fff;
    }
    //   下拉菜单
    .type_select {
        margin-top: 16px;
        margin-right: 30px;
        .el-dropdown-link:hover {
            color: red;
        }
        .el-dropdown-link {
            cursor: pointer;
            color: #50586d;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
    // 搜索框样式
    .input {
        height: 40px;
        padding-top: 10px;
        .input-with-select {
            border-radius: 20px !important;
        }
        .el-select .el-input {
            .input-with-select .el-input-group__prepend {
                background-color: #fff;
            }
        }
    }
    //  搜索框样式结束
}

.electron_C {
    background: #fff;
    // .el-tabs__item {
    //     display: none;
    // }
    // .is-active {
    //     background: chartreuse;
    // }
    // .el-tabs--border-card > .el-tabs__content {
    //     padding: 0px;
    // }
}

.AGlist_left {
    padding-top: 20px;
    ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
            width: calc(100% / 6);
            height: 155px;
            .gameImg_box:hover .gouGame {
                opacity: 1;
            }
            .gameImg_box {
                width: 106px;
                height: 106px;
                margin: auto;
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                .gouGame {
                    //蒙层
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.5);
                    opacity: 0;
                    transition: all 0.3s;
                    .gouGame_btn {
                        width: 80px;
                        height: 24px;
                        background: red;
                        color: #fff;
                        border-radius: 12px;
                        text-align: center;
                        padding-top: 3px;
                        margin: auto;
                        cursor: pointer;
                        margin-top: 50px;
                    }
                }
                .el-image {
                    height: 100%;
                    width: 100%;
                    background: #eeeeee;
                }
                img {
                    //图片
                    border-radius: 8px;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            p:hover {
                color: red;
            }
            p {
                text-align: center;
                display: block;
                height: 42px;
                line-height: 42px;
                font-weight: 600;
            }
        }
    }
}
.AGlist_left.bbin {
    li{
        .gameImg_box{
            img {
                //图片
                object-fit: cover;
            }
        }
    }
}


// 右边的部分
.AGlist_right {
    border-left: 1px solid #ccc;
    h3 {
        //公用样式
        height: 37px;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 37px;
    }
    .AGlist_right_rm {
        padding: 20px 10px 10px 10px;
        ul {
            li:hover .title_block {
                display: none;
            }
            li:hover .content_none {
                display: flex;
            }
            li {
                // 显示的标题
                .title_block {
                    padding: 14px 0px 14px 0px;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: space-between;
                    .rm_title_box {
                        display: flex;
                        .rm_num {
                            text-align: center;
                            width: 22px;
                            height: 22px;
                            background: #ccc;
                            margin-right: 10px;
                        }
                        .rm_title {
                            font-weight: 600;
                            font-size: 15px;
                        }
                    }

                    .rm_xx {
                        span {
                            color: red;
                            font-size: 20px;
                        }
                    }
                }
                // 隐藏的标题 和热门公用样式开始
                .zjxx {
                    display: flex !important;
                }
                .content_none {
                    display: none;
                }
                .zjxx,
                .content_none {
                    padding: 16px 0px 16px 0px;
                    border-top: 1px solid #ccc;
                    // display:flex;
                    justify-content: space-between;
                    .content_none_left {
                        display: flex;
                        .content_none_img_box {
                            width: 60px;
                            height: 60px;
                            margin-right: 10px;
                            img {
                                border-radius: 8px;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .content_none_p {
                            .top_P {
                                font-weight: 600;
                                font-size: 14px;
                            }
                            .bottom_P {
                                margin-top: 16px;
                                color: #ccc;
                                span {
                                    font-weight: 1000;
                                    font-size: 14px;
                                    color: red;
                                }
                            }
                            .bottom_P_zj {
                                color: black;
                                font-size: 14px;
                            }
                        }
                    }
                    .content_none_right {
                        p {
                            .content_none_name {
                                font-size: 14px;
                                color: blue;
                            }
                        }

                        .content_none_time {
                            margin: 16px 0px 0px 26px;
                        }

                        span {
                            font-size: 17px;
                            color: red;
                        }
                        .div_btn {
                            width: 76px;
                            height: 24px;
                            background: red;
                            color: #fff;
                            border-radius: 12px;
                            text-align: center;
                            margin: 12px 0px 0px 4px;
                            padding-top: 3px;
                        }
                    }
                }
                // 隐藏的标题 和热门公用样式结束
            }
        }
    }
}
</style>
