<template>
<div>
    <div class="header">
        <div class="left"><img src="images/zjt.png" alt=""></div>
        <div class="zhong">优惠详情</div>
        <div class="right"></div>
    </div>
    <div class="banner">
        <img src="images/banner.png" alt="">
    </div>
    <div class="textBox">
        <!-- <div class="gg">
             <i><img src="images/gg.png" alt=""></i>
         </div> -->
        <transition name="slide">
            <p class="text" :key="text.id">{{text.val}}</p>
        </transition>
    </div>
    <div class="活动说明">
        <p>活 动 说 明</p>
        <div class="白底1">
            <p>活动对象:亚博全站会员</p>
            <p>活动时间：2019年12月15日-2019年12月28日</p>
            <p>有效投注额每满1888可获得1次“砸金蛋，抽现金”的机会，每日可砸金蛋2次</p>
            <div class="bg">
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
                <div class="包裹">
                    <div class="金蛋"></div>
                    <div class="底座"></div>
                </div>
            </div>
            <div class="锤子">
                <div><img src="images/hammer.png" alt=""></div>
                <div><img src="images/x-0.png" alt=""></div>
            </div>
            <!-- <div class="za">砸金蛋,赢大奖!</div> -->
        </div>
    </div>
    <div class="活动奖品">
        <i></i>
        <p>活 动 奖 品</p>
        <div class="白底2">
            <div class="commodity">
                <div v-for="(item,index) in 商品" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{item.name}}</p>
                    <p>市场价: <span>${{item.price}}</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="活动规则">
        <p>活 动 规 则</p>
        <div class="白底3">
            <p>1.每日有效投注计算时间为北京时间00:00:00至23:59:59，超时未砸金蛋则自动清零，不予补偿；</p>
            <p>举例：15号当天满足了两次砸金蛋的机会，但会员未在当日的23:59:59前操作，过了次日16号的0点以后系统将会清零。</p>
            <p>2.网站每日公布获奖名单，实物奖派发将会在活动结束后统一安排，具体到货时间以快递公司为准</p>
            <p>3.实物奖不予折现，图片仅供参考，实际物品以收到的为准；</p>
            <p>4.现金奖需满足1倍流水方可取款</p>
            <p>5.每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备每日只可参与2次，若有违规者，将不享受此红利；</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            textArr: [
                '第一条公告',
                '第二条公告第二条公告',
                '第三条公告第三条公告第三条公告'
            ],
            number: 0,
            商品: [{
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
                {
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
                {
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
                {
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
                {
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
                {
                    img: 'images/shopping1.png',
                    name: '洗衣机',
                    price: '26,999'
                },
            ]
        }
    },
    computed: {
        text() {
            return {
                id: this.number,
                val: this.textArr[this.number]
            }
        }
    },
    mounted() {
        this.startMove()
    },
    methods: {
        startMove() {
            // eslint-disable-next-line
            let timer = setTimeout(() => {
                if (this.number === 2) {
                    this.number = 0;
                } else {
                    this.number += 1;
                }
                this.startMove();
            }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
        }
    }
}
</script>

<style lang="scss">
.header {
    width: 100%;
    height: _vw(40);
    background: ghostwhite;
    display: flex;
    text-align: center;
    line-height: _vw(40);

    .left {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: _vw(22);
            height: _vw(22);
        }
    }

    .zhong {
        width: 80%;
        font-size: _vw(18);
        font-weight: 600
    }

    .right {
        width: 10%;
    }
}

.banner img {
    width: 100%;
    height: _vw(160);
}

.textBox {
    width: 100%;
    height: _vw(25);
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: center;
}

.text {
    width: 100%;
    position: absolute;
    bottom: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s linear;
}

.slide-enter {
    transform: translateY(20px) scale(1);
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
}

.gg {
    float: left;
    display: flex;
    margin-left: _vw(10);
    margin-top: _vw(5);

    img {
        width: _vw(20);

    }
}

.活动说明 {
    width: 90%;
    height: 100%;
    background: linear-gradient(180deg, #852a26, #e8d6a6);
    padding: 0 _vw(10) 0px;
    text-align: center;
    margin: 0 auto;
    border-radius: _vw(5);
    margin-top: _vw(5);
    padding-bottom: _vw(15);

    >p {
        display: block;
        padding: _vw(10) 0 _vw(10);
        font-size: _vw(15);
        color: white;
        font-weight: 600;
    }

    .bg {
        background-image: url(/images/stage.png);
        background-size: 100% 100%;
        border-radius: _vw(5);
        width: 95%;
        height: _vw(350);
        margin: 0 auto;
        margin-bottom: _vw(10);
        display: flex;
        flex-wrap: wrap;
    }
}

.白底1 {
    background: rgba(255, 255, 255, 0.9);
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 1px #d2d2d2;

    >p {
        color: black;
        font-size: _vw(13);
        padding: _vw(5) _vw(5);
    }
}

.za {
    width: 30%;
    height: _vw(30);
    line-height: _vw(30);
    background: #f3f7fb;
    border-radius: _vw(30);
    margin: 0 auto;
    font-size: _vw(15);
    padding: 3px 11px 3px 11px;
}

.活动奖品 {
    width: 90%;
    height: 100%;
    background: linear-gradient(180deg, #852a26, #e8d6a6);
    padding: 0 _vw(10) 0px;
    text-align: center;
    margin: 0 auto;
    border-radius: _vw(5);
    margin-top: _vw(30);
    padding-bottom: _vw(15);

    >p {
        display: block;
        padding: _vw(10) 0 _vw(10);
        font-size: _vw(15);
        color: white;
        font-weight: 600;
    }
}

.白底2 {
    background: rgba(255, 255, 255, 0.9);
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 1px #d2d2d2;
}

.commodity {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.commodity div {
    width: 46%;
    height: _vw(170);
    border: 1px solid #efe5b2;
    border-radius: _vw(5);
    margin-top: _vw(10);
    margin-bottom: _vw(10);

    img {
        width: _vw(100);
        height: _vw(100);
    }

    p {
        font-size: _vw(13);
        margin-top: _vw(2);

        span {
            font-size: _vw(14);
            color: #db8b22;
        }
    }
}

.活动规则 {
    width: 90%;
    height: 100%;
    background: linear-gradient(180deg, #852a26, #e8d6a6);
    padding: 0 _vw(10) 0px;
    text-align: center;
    margin: 0 auto;
    border-radius: _vw(5);
    margin-top: _vw(30);
    padding-bottom: _vw(15);
    margin-bottom: _vw(20);

    >p {
        display: block;
        padding: _vw(10) 0 _vw(10);
        font-size: _vw(15);
        color: white;
        font-weight: 600;
    }
}

.白底3 {
    background: rgba(255, 255, 255, 0.9);
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 1px #d2d2d2;
    overflow: auto;
    >p {
        font-size: _vw(13);
        margin-top: _vw(10);
    }
}

.金蛋 {
    background-image: url(/images/golden-eggs.png);
    background-size: 100% 100%;
    width: 90%;
    height: 80%;
    margin: 0 auto;
    animation-name: upAnimation;
    transform-origin: center bottom;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-delay: .5s;

}
@keyframes upAnimation {
    0% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }

    10% {
        transform: rotate(-12deg);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }

    20% {
        transform: rotate(12deg);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }

    28% {
        transform: rotate(-10deg);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }

    36% {
        transform: rotate(10deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    42% {
        transform: rotate(-8deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    48% {
        transform: rotate(8deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    52% {
        transform: rotate(-4deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    56% {
        transform: rotate(4deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    60% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
    }

    100% {
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
}

.底座 {
    background-image: url(/images/platform.png);
    background-size: 100% 100%;
    width: 90%;
    height: _vw(25);
    margin: 0 auto;
}

.包裹 {
    width: 33.3%;
    height: _vw(150);
    margin-top: _vw(20);
}

.锤子 {
    width: _vw(120);
    height: _vw(45);
    background: #801813;
    margin: 0 auto;
    display: flex;
     border-radius: _vw(10);
     align-items: center;
}

.锤子 div {
    width: _vw(50);
    margin: 0 auto;
    img {
        width: _vw(40);
        margin-top: _vw(5);
    }
}
</style>
