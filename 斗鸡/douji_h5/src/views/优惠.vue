<template>
    <div class="banner">
        <img src="static/image/youhui-banner.jpg" alt="" srcset="">
    </div>
    <van-notice-bar left-icon="volume-o" background="var(--color)" color="#fff" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />

    <ul class="list">
        <li v-for="item in 3" @click="showPopup=true">
            <div>
                <img src="https://file.32828a.com/images/LUCKYCF/3eae58be1dace3463c2368c8cf33cf30_5178877.jpg" alt="" srcset="">
            </div>
            <div class="title-1">不计输赢 天天洗码 1% 无上限</div>
        </li>
    </ul>

    <van-popup v-model:show="showPopup">
        <div class="Details">
            <div class="header-1">
                <span>红利优惠</span>
                <van-icon name="cross" size="20" @click="showPopup=false"/>
            </div>
            <div class="content">
                <img src="https://file.32828a.com/images/LUCKYCF/22445990dc36a1b1b1cd1f7c05c0bbf7_5133943.jpg" alt="" srcset="">
                <div v-for="item in 50">优惠活动{{item}}</div>
            </div>
        </div>
    </van-popup>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    setup(props) {
        
        const showPopup = ref(true);
        return{
            showPopup
        }
    }
}
</script>

<style lang="scss" scoped>
.banner{
    font-size: 0px;
    img{
        width: 100%;
    }
}

.list{
    margin: 50px 15px 50px;
    li{
        padding: 15px;
        background: #c8af96;
        margin: 30px 0px ;
    }
    .title-1{
        text-align: center;
        color:#fff;
        font-size: 20px;
        margin: 10px 0px 0px;
    }
    img{
        width: 100%;
    }
}

.Details{
    width: 85vw;
    height: 85vh;
    overflow: auto;
    .header-1{
        height: 56px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 15px;
        border-bottom: 1px solid #eee;
        background: #fff;
        position: sticky;
        top: 0px;
    }
    .content{
        padding: 10px;
        img{
            max-width: 100%;
        }
    }
}
</style>