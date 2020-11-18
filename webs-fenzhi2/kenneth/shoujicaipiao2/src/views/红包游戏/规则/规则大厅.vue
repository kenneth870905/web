<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="img_1">
                <img :src="config.img_url+'static/image/hbgame/guize_1.png'" alt="" srcset="">
            </div>

            <div class="title">
                <div><span>扫雷红包</span></div>
            </div>
            <ul class="item">
                <li @click="$router.push('/hbGame/ruleDetails?t1=1&t2=1')">
                    <img :src="config.img_url+'static/image/hbgame/guize_2.png'" alt="" srcset="">
                </li>
                <li>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=1&t2=2')">
                        <img :src="config.img_url+'static/image/hbgame/guize_3.png'" alt="" srcset="">
                    </div>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=1&t2=3')">
                        <img :src="config.img_url+'static/image/hbgame/guize_4.png'" alt="" srcset="">
                    </div>
                </li>
            </ul>

            <div class="title">
                <div><span>禁抢红包</span></div>
            </div>
            <ul class="item">
                <li @click="$router.push('/hbGame/ruleDetails?t1=2&t2=1')">
                    <img :src="config.img_url+'static/image/hbgame/jq1.png'" alt="" srcset="">
                </li>
                <li>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=2&t2=2')">
                        <img :src="config.img_url+'static/image/hbgame/jq2.png'" alt="" srcset="">
                    </div>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=2&t2=3')">
                        <img :src="config.img_url+'static/image/hbgame/jq3.png'" alt="" srcset="">
                    </div>
                </li>
            </ul>

            <div class="title">
                <div><span>牛牛红包</span></div>
            </div>
            <ul class="item">
                <li @click="$router.push('/hbGame/ruleDetails?t1=7&t2=1')">
                    <img :src="config.img_url+'static/image/hbgame/niuniu_rule1.png'" alt="" srcset="">
                </li>
                <li>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=7&t2=2')">
                        <img :src="config.img_url+'static/image/hbgame/niuniu_rule2.png'" alt="" srcset="">
                    </div>
                    <div @click="$router.push('/hbGame/ruleDetails?t1=7&t2=3')">
                        <img :src="config.img_url+'static/image/hbgame/niuniu_rule3.png'" alt="" srcset="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config" 
        })
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffd881;
}
.img_1{
    min-height: _vw(268);
    img{
        width: 100%;
    }
}
.title{
    color: #f82b30;
    font-weight: bold;
    margin: 0px 0px 20px 0px ;
    display: flex;
    justify-content: center;
    div{
        position: relative;
    }
    div::before,
    div::after{
        position: absolute;
        content: '';
        background:#ffdf00;
        width: 15px ;
        height: 15px;
        border-radius: 100%;
    }
    div::before{
        left: -8px ;
        top: -4px;
    }
    div::after{
        right: -8px;
        bottom: -4px;
    }
    span{
        position: relative;
        z-index: 2;
    }
}

.item{
    background: #ffffff;
    padding: 10px;
    margin: 0px 10px 20px;
    font-size: 0px;
    display: flex;
    li:nth-child(1){
        margin: 0px 10px 0px 0px;
    }
    div:nth-child(1){
        margin: 0px 0px 10px 0px;
    }
    img{
        width: 100%;
    }
}
</style>
