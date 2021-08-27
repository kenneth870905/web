<template>
    <div class="lottery">
        <div class="container">
            <div class="banner_box">
                <img :src="lotteryRulesBanner" alt="" srcset="">
            </div>
            <el-row>
                <el-col :span="3">
                    <ul class="游戏列表">
                        <li @click="选择类型(item)" :class="{'active':id==item.id}" v-for="(item, index) in 游戏列表" :key="index">
                            <span>{{item.name}}</span>
                            <ul v-if="item.children.length>0">
                                <li @click="选择类型2(item,item_1)" v-for="(item_1, index1) in item.children" :key="index1">{{item_1.name}}</li>
                            </ul>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="21">
                    <!-- <yxgz /> -->
                    <router-view :is="yxgz" :name="name" :type="type"></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
// const  ssc = () =>import('@/components/游戏规则/时时彩游戏规则.vue')
export default {
    data() {
        return {
            lotteryRulesBanner: 'webConfig/image/us-banner1.jpg', // 背景图
            游戏列表: [],
            id: '',
            name: '',
            type: '',
            yxgz: ''
        }
    },
    components: {
        // yxgz
    },
    methods: {
        选择类型(item) {
            if (item.children.length == 0) {
                this.$router.push('?id=' + item.id)
                this.id = item.id
                this.name = item.name
                this.type = ''
            }
        },
        选择类型2(item, item_2) {
            this.name = item.name
            this.id = item.id
            if (item_2.type) {
                this.$router.push('?id=' + item.id + '&type=' + 2)
                this.type = 2
            } else {
                this.type = ''
                this.$router.push('?id=' + item.id)
            }
        },
        设置显示模块() {
            console.log(this.id.substring(0, 2))
            var id = this.id.substring(0, 2)
            this.yxgz = ''
            if (id == 10) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/时时彩游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/时时彩信用玩法.vue')
                }
            } else if (id == 20) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/PK拾游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/PK拾信用玩法.vue')
                }
            } else if (id == 30) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/3D游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/3D信用玩法.vue')
                }
            } else if (id == 40) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/快三游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/快三信用玩法.vue')
                }
            } else if (id == 50) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/28游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/28信用玩法.vue')
                }
            } else if (id == 60) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/11选5游戏规则.vue')
                } else {
                    this.yxgz = () => import('@/components/游戏规则/11选5信用玩法.vue')
                }
            } else if (id == 70) {
                if (!this.type) {
                    this.yxgz = () => import('@/components/游戏规则/六合彩游戏规则.vue')
                } else {
                    this.yxgz = ''
                }
            } else {
                this.yxgz = ''
            }
            $('#app').animate({ scrollTop: 0 }, 100)
        }
    },
    mounted() {
        this.id = this.$route.query.id ? this.$route.query.id : ''
        this.axios.get('static/json/LotteryList.json').then(x => {
            // console.log(x);
            this.游戏列表 = x.data
            if (!this.id) {
                this.id = x.data[0].id
                this.name = x.data[0].name
            } else {
                var obj = x.data.find(e => e.id == this.id)
                this.name = obj ? obj.name : ''
            }
            this.设置显示模块()
        }).catch(err => {
            console.log(err)
        })
    },
    watch: {
        $route() {
            console.log('路由发生改变')
            this.设置显示模块()
        }
    }
}
</script>

<style lang="scss" scoped>
.lottery .container {
    background: #ffffff;
}
.banner_box {
    margin-top: 10px;
    padding-bottom: 0px;
    height: 220.4px;
    img {
        width: 100%;
        height: 100%;
        padding-bottom: 0px;
    }
}
.游戏列表 {
    border-left: 1px solid #d6d6d6;
    padding-bottom: 100px;
    li {
        position: relative;
        text-align: center;
        height: 62px;
        line-height: 60px;
        border-bottom: 1px solid #d6d6d6;
        border-right: 1px solid #d6d6d6;
        background: #ffffff;
        border-left: 1px solid #d6d6d6;
        > ul {
            position: absolute;
            width: 100%;
            left: 100%;
            top: -1px;
            display: none;
            border-top: 1px solid #d6d6d6;
        }
    }
    li.active::after {
        width: 5px;
        // height:100%;
    }
    li::after {
        position: absolute;
        content: "";
        transition: all 0.3s;
        width: 0px;
        height: 90%;
        left: 0px;
        top: 5%;
        background: red;
    }
    li:hover::after {
        width: 5px;
    }
    li:hover {
        > ul {
            display: block;
        }
    }
}
</style>
