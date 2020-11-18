<template>
    <div class="签到">
        <div class="box_1">
            <img class="bg" :src="config.img_url+'static/image/signinhead.jpg'" alt="" srcset="">
            <div class="标题1">距离领取彩金剩余7天</div>
            <ul class="进度">
                <li :class="{'active':days>index}" v-for="(item, index) in 6" :key="index"></li>
                <div class="横线">
                    <div :style="'width:'+width+'%'"></div>
                </div>
            </ul>
        </div>

        <div class="box_2">
            <button>立即领取</button>
        </div>

        <div class="box_3">
            <div>
                <div>累计获赠彩金<span class="红色字体">0天</span></div>
                <div>已连续签到<span class="红色字体">50元</span></div>
            </div>
            <van-button @click="$router.push('/')" type="danger" size="small">返回首页</van-button>
        </div>

        <ul class="详情" style="">
            <li>本活动为会员尊享活动，黄金会员(<span @click="$router.push('/home/vip')" style="color: rgb(255, 0, 0);">查看等级</span>)及其以上方可参加及以上等级方可参加</li>
            <li>连续签到7日后，方可领取一个幸运红包，红包金额18-8888不等</li>
            <li>每日00:00签到状态重置，可参与第二日签到</li>
            <li>每一位会员只可拥有一个账号申请该优惠，同一IP，同提款银行卡均视为同一客户。如发生上述情况，重复领取彩金立即冻结账号!</li>
            <li>若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，本娱乐城有权要求会员向我们提供充足有效的文件，用以确认是否享有该优惠的资质！</li>
            <li>本娱乐城保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利</li>
        </ul>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "",
    data() {
        return {
            days: 5
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        width() {
            var width = (this.days - 1) / (6 - 1) * 100;
            
            return width;
        }
    },
    methods: {
        // 点击签到(){
        //     this.$toast('提示内容');
        // }
    },
}
</script>

<style lang="scss" scoped>
.签到 {
    height: 100%;
    background: #ffffff;
}
.box_1 {
    background: #fde2c1;
    .bg {
        width: 100%;
    }
    .标题1 {
        text-align: center;
        font-size: _vw(25);
        color: $color;
    }
    .进度 {
        margin: _vw(10) 0px 0px;
        width: 90%;
        left: 5%;
        display: flex;
        justify-content: space-between;
        position: relative;
        height: _vw(70);
        .横线 {
            position: absolute;
            width: 100%;
            left: 0px;
            top: _vw(10);
            height: 4px;
            background: #b6b6b6;
            div {
                height: 100%;
                background: $color;
            }
        }
        li {
            width: _vw(24);
            height: _vw(24);
            background: #d6d6d6;
            border: 1px solid #c4c4c4;
            border-radius: 100%;
            z-index: 1;
        }
        .active {
            background: $color;
        }
    }
}

.box_2 {
    background: #fde2c1;
    margin: -27px auto 0px;
    width: 130px;
    height: 54px;
    padding: 5px;
    border-radius: 54px;
    button {
        width: 100%;
        height: 100%;
        border-radius: 44px;
        background: #4cd964;
        border: none;
        color: #ffffff;
    }
}

.box_3 {
    display: flex;
    border-bottom: 1px solid #c4c4c4;
    justify-content: space-between;
    padding: 5px 5px;
    font-size: _vw(15);
    font-weight: bold;
    .红色字体 {
        color: red;
    }
}

.详情{
    list-style: decimal;
    padding: 17px 0px 17px 50px;
    li{
        list-style: inherit;
    }
}
</style>
