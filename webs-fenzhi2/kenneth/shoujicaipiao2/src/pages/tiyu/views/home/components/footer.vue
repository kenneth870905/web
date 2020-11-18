<template>
    <div class="footer1">
        <div class="footer-logo">
            <img class="" :src="config.img_url+'static/pages/tiyu/image/hg-4-1-1.png'" alt="logo">
        </div>
        <div class="wrapper">
            <ul class="list">
                <li>
                    <div class="icon">
                        <img :src="config.img_url+'static/pages/tiyu/image/f1.png'" alt="" srcset="">
                    </div>
                    <div class="txt">
                        <div><span>英国GC</span></div>
                        <div>监督委员会</div>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <img :src="config.img_url+'static/pages/tiyu/image/f2.png'" alt="" srcset="">
                    </div>
                    <div class="txt">
                        <div><span>马耳他博彩牌照</span></div>
                        <div>(MGA)认证</div>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <img :src="config.img_url+'static/pages/tiyu/image/f3.png'" alt="" srcset="">
                    </div>
                    <div class="txt">
                        <div><span>英属维尔京群岛</span></div>
                        <div>(BVI)认证</div>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <img :src="config.img_url+'static/pages/tiyu/image/f4.png'" alt="" srcset="">
                    </div>
                    <div class="txt">
                        <div>菲律宾(PAGCOR)</div>
                        <div>监督博彩执照</div>
                    </div>
                </li>
            </ul>
            <div class="footer-txt">
                HG-4体育 拥有欧洲马耳他博彩管理局(MGA)，英国GC监督委员会(Gambling Commission)和菲律宾政府博彩委员会(pagcor) 颂发的合法执照。注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。
                进行注册并娱乐前，请确保您年满18周岁！
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            config: "config"
        })
    },
}
</script>

<style lang="scss" scoped>
.footer1 {
    background: #333;
}
.footer-logo{
    display: flex;
    height: _vw(45);
    align-items: center;
    img{
        height: 100%;
        margin: 0px _vw(8);
    }
    &:after,
    &::before{
        content: "";
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        height: 1px;
        background: #000;
    }
}

.wrapper{
    padding: _vw(16) _vw(12);
}
.list{
    display: flex;
    font-size: _vw(12);
    color: #ccc;
    text-align: center;
    line-height: _vw(20);
    li{
        width: 25%;
    }
    .icon{
        margin: 0px _vw(5) _vw(10);
        font-size: 0px;
    }
    img{
        width: 100%;
    }
}
.footer-txt{
    margin: _vw(22) 0px;
    color: #888;
    font-size: _vw(12);
}
</style>
