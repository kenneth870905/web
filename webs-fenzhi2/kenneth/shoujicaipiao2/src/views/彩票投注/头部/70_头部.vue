<template>
<ul class="开奖头部">
    <li>
        <div class="近期" @click="显示最近记录=!显示最近记录">
            <img class="logo_1" :src="config.img_url+'static/image/home/caipiao/'+当前彩种.id+'.png'">
            <div>近期开奖</div>
            <i class="icon iconfont icon-tubiaozhizuo-"></i>
        </div>
        <ul class="上期开奖">
            <li v-if="近期开奖 && 近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                <div v-if="index1<6" v-for="(item1, index1) in 近期开奖[0].Content" :key="index1">
                    <span class="圆球" :class="marSixNums.nums[item1].color">{{item1}}</span>
                    <span class="生肖">{{marSixNums.nums[item1].sx}}</span>
                </div>
                <div>
                    <span class="圆球" :class="marSixNums.nums[近期开奖[0].Content[6]].color">{{近期开奖[0].Content[6]}}</span>
                    <span class="生肖">{{marSixNums.nums[近期开奖[0].Content[6]].sx}}</span>
                </div>
            </li>
            <li v-else class="红色">
                <div class="开奖中">
                    开奖中...
                </div>
            </li>
        </ul>
    </li>
    <li>
        <div>距{{即将开奖.IssueCode}}期截止</div>
        <div>
            <span v-if="即将开奖.Timer>0">
                {{即将开奖.showTimer.h}}:{{即将开奖.showTimer.m}}:{{即将开奖.showTimer.s}}
            </span>
            <span v-else>开奖中</span>
        </div>
    </li>
    <div class="记录" v-show="显示最近记录">
        <div class="遮罩" @click="显示最近记录=!显示最近记录"></div>
        <ul>
            <li class="item">
                <div class="期数">期数</div>
                <div class="开奖号">开奖号</div>
                <div class="大小">五行</div>
                <div class="单双">特头</div>
                <div class="单双">特尾</div>
            </li>
            <li class="item" v-for="(item, index) in 近期开奖" :key="index">
                <div class="期数2">{{item.IssueCode.substring(4)}}</div>
                <div v-if="item.Content" class="开奖号2">
                    <div v-if="index1<6" v-for="(item1, index1) in item.Content" :key="index1">
                        <span class="圆球" :class="marSixNums.nums[item1].color">{{item1}}</span>
                        <span class="生肖">{{marSixNums.nums[item1].sx}}</span>
                    </div>
                    <div>+</div>
                    <div>
                        <span class="圆球" :class="marSixNums.nums[item.Content[6]].color">{{item.Content[6]}}</span>
                        <span class="生肖">{{marSixNums.nums[item.Content[6]].sx}}</span>
                    </div>
                </div>
                <div v-if="item.Content" class="大小 font14">{{marSixNums.nums[item.Content[6]].wu}}</div>
                <div v-if="item.Content" class="单双 font14">前{{item.Content[6].substring(0,1)}}</div>
                <div v-if="item.Content" class="单双 font14">后{{item.Content[6].substring(1)}}</div>
                <div v-else class="开奖中">
                    开奖中...
                </div>
            </li>
        </ul>
    </div>

    <div class="红包" @click="$router.push('/ifr/liuheHongbao')" v-show="当前彩种.id!='70002' && 当前彩种.id!='70003'">
        <img :src="config.img_url+'static/image/hong.png'" alt="" srcset="">
    </div>
</ul>
</template>

<script>
import {
    mapState,
    mapGetters
} from 'vuex';
export default {
    name: "",
    data() {
        return {
            显示最近记录: false
        }
    },
    computed: {
        ...mapState({
            marSixNums: 'marSixNums',
            config: "config",
            近期开奖: state => state.投注.近期开奖,
            即将开奖: state => state.投注.即将开奖,
        }),
        ...mapGetters({
            当前彩种: '投注/当前彩种'
        })
    },
    methods: {
        计算跨度(arr) {
            return Math.max.apply(null, arr) - Math.min.apply(null, arr);
        },
        计算大小(list) {
            var 和值 = list.reduce((n, m) => parseInt(n) + parseInt(m));
            return 和值 > 13 ? '大' : '小';
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.红包 {
    position: absolute;
    right: 0px;
    top: _vw(14);
    width: _vw(56);
    height: _vw(56);
    z-index: 1;

    img {
        width: 100%;
        height: 100%;
        animation: yaoyiyao 3s linear infinite;
    }
}

@keyframes yaoyiyao {
    0% {
        transform: scale(1) rotate(10deg);
    }

    1% {
        transform: scale(1) rotate(0deg);
    }

    2% {
        transform: scale(1) rotate(-10deg);
    }

    3% {
        transform: scale(1) rotate(0deg);
    }

    4% {
        transform: scale(1) rotate(10deg);
    }

    5% {
        transform: scale(1) rotate(0deg);
    }

    6% {
        transform: scale(1) rotate(-10deg);
    }

    7% {
        transform: scale(1) rotate(0deg);
    }

    8% {
        transform: scale(1) rotate(10deg);
    }

    9% {
        transform: scale(1) rotate(0deg);
    }

    10% {
        transform: scale(1) rotate(-10deg);
    }

    11% {
        transform: scale(1) rotate(0deg);
    }

    12% {
        transform: scale(1) rotate(10deg);
    }

    13% {
        transform: scale(1) rotate(0deg);
    }

    14% {
        transform: scale(1) rotate(-10deg);
    }

    15% {
        transform: scale(1) rotate(0deg);
    }
}

.font14 {
    font-size: _vw(14);
}

.开奖头部 {
    flex-shrink: 0;
    display: flex;
    min-height: _vw(70);
    border-bottom: 1px solid #f2f2f2;
    position: relative;
    z-index: 1;

    >li {
        width: 50%;
        flex-shrink: 0;
        background: #ffffff;
        padding: _vw(10) 0px;
    }

    >li:nth-child(1) {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .近期 {
            margin: 0px 0px _vw(3) 0px;
            display: flex;
            align-items: center;
            font-size: _vw(14);

            .logo_1 {
                width: _vw(24);
                height: _vw(24);
                margin: 0px _vw(5) 0px 0px;
            }

            i {
                font-size: _vw(10);
            }
        }

        .上期开奖 {
            >li {
                display: flex;
                justify-content: center
            }

            .单双 {
                font-size: _vw(12);
            }
        }
    }

    >li:nth-child(2) {
        position: relative;
        z-index: 1;
        border-left: 1px solid #efeff4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        >div:nth-child(1) {
            font-size: _vw(14);
            margin: 0px 0px _vw(3) 0px;
        }

        >div:nth-child(2) {
            font-size: _vw(18);
            color: $color;
        }
    }

    .记录 {
        position: absolute;
        width: 100%;
        left: 0px;
        z-index: 1;
        height: _vw(240);
        bottom: _vw(-240);

        .遮罩 {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
        }

        >ul {
            height: 100%;
            overflow: auto;
            position: relative;
            z-index: 1;
            background: #ffffff;
        }

        .item {
            &:nth-child(2n-1) {
                background: #e5e5e5;
            }

            &:nth-child(1) {
                position: sticky;
                top: 0px;
                line-height: _vw(30);
                font-size: _vw(15);
            }

            // height: _vw(30);
            padding: _vw(2) 0px;
            display: flex;
            text-align: center;
            align-items: center;

            .期数,
            .期数2 {
                width: _vw(65);
                flex-shrink: 0;
                flex-grow: 0;
                line-height: _vw(30);
                border-right: 1px solid #cccccc;
            }

            .期数2 {
                font-size: _vw(12);
            }

            .开奖号,
            .开奖号2 {
                flex-grow: 1;
            }

            .开奖号2 {
                align-items: center;
                display: flex;
                justify-content: center;

                .单双 {
                    font-size: _vw(13);
                }
            }

            .开奖中 {
                flex-grow: 1;
            }

            .和值,
            .大小,
            .单双 {
                width: _vw(40);
            }
        }
    }
}

.生肖 {
    font-size: _vw(12);
    display: block;
    text-align: center;
}

.圆球 {
    font-size: _vw(12);
    width: _vw(20);
    height: _vw(20);
    border-radius: 100%;
    margin: 0px _vw(2);
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    background: $color;
    display: block;

    &.灰 {
        background: #6c757d;
    }

    &.绿 {
        background: #28a745;
    }

    &.蓝 {
        background: #007bff;
    }

    &.红 {
        background: $color;
    }
}
</style>
