<template>
    <div>
        <Header />
        <div class="bg_tiaokuan">
            <div id="hdpublic" class="w1000">
                <img src="static/beiyongwangzhi/181011085119.jpg" alt />
            </div>
            <div id="Game-Menual" class="w1000">
                <div class="left_1">
                    <div class="Game-Menual-box">
                        <a v-for="(item,index) in config.left_list" :key="index" :href="'#'+item.url" target="_self">{{item.name}}</a>
                    </div>
                </div>
                <div class="right_1">
                    
                    <div class="txt">
                        <p style="color:white; font-size:13px;">
                            {{config.title}}网站（此“网站”）使用Cookies功能，为客户提供更好及更个性化的服务。
                            <br />
                            <br />此Cookies政策将解释什么是cookies、cookies在网站中是如何使用的以及怎样管理cookies的使用。
                            <br />
                            <br />什么是Cookie?
                            <br />
                            <br />Cookies是包含少量信息的小型文字档案，在您使用网络时会传递及储存至您的电脑、智能手机或其他终端设备中。Cookies会在之后的每次网站访问时回传信息，以使相关网站可以辨别用户信息。
                            <br />
                            <br />如想获取关于cookies的更多信息，请访问www.allaboutcookies.org。相关cookies视频可在www.google.co.uk/goodtoknow/data-on-the-web/cookies查看。
                            <br />
                            <br />
                            <br />
                            <br />网站Cookies的使用
                            <br />
                            <br />关于网站中Cookies的使用，有以下若干原因。
                            <br />
                            <br />其中包括但不仅限于：
                            <br />
                            <br />(i)允许用户登录自己的{{config.title}}帐户；
                            <br />
                            <br />(ii)允许用户选择登录首选项；
                            <br />
                            <br />(iii)监控和收集网站上有关交易的信息；
                            <br />
                            <br />(iv)预防欺骗和保障隐私。
                            <br />
                            <br />Cookies的使用通常可增进和加强用户体验。一些cookies的使用可有助于网站的运行。
                            <br />
                            <br />{{config.title}}的网站cookies使用可分为以下几类：
                            <br />
                            <br />Session管理 - 此类cookies可用来确保网站的使用，能够管理session信息并确保用户的网站浏览。
                            <br />
                            <br />功能性 - 此类cookies储存信息可确保我们记住用户的使用偏好，如：偏好语言、分类类型、媒体设定等。此外还能帮助增进用户体验，例如停止相同信息被显示两次的情况。
                            <br />
                            <br />预防欺骗 - 此类cookies储存信息可帮助我们阻止网络欺骗。
                            <br />
                            <br />跟踪 - 此类cookies可确保我们储存用户的网站访问信息，我们需要记录该信息以向合作会员支付佣金。
                            <br />
                            <br />{{config.title}}不使用第三方跟踪cookies。
                            <br />
                            <br />关于网站提供的第三方网站链接，请注意这些网站设有自己的cookies及隐私政策。如果您决定进入任何链接的第三方网站，请在访问前阅读其cookies与隐私条款。
                            <br />
                            <br />
                            <br />
                            <br />管理Cookies
                            <br />
                            <br />如果您想删除任何已储存在您电脑上的Cookies，或想停止那些记录您浏览网站模式的Cookies，您可以删除现有Cookies和/或更改浏览器上的隐私设置（此过程在各个浏览器间有所不同）。如想获知更多关于如何操作的信息，请访问www.allaboutcookies.org。您在浏览器中的“帮助”部分也可查看到如何进行此操作的相关信息。
                            <br />
                            <br />请注意，如果删除我们的Cookies或阻挡我们之后的Cookies，将导致您无法使用网站的某些区域或特色功能。例如：如果您的浏览器中设置禁用“session”cookies，可能会导致您无法登录自己的{{config.title}}帐户。
                            <br />
                            <br />关于{{config.title}}保护个人隐私的详细信息可在我们的隐私政策中查看。
                        </p>
                    </div>
                
                </div>
            </div>

        </div>
        <Fotter />
    </div>
</template>

<style scoped>

.txt {
    padding: 50px;
}
#publiclinesshua {
    margin: 60px auto 10px auto;
    width: 236px;
    height: 32px;
    line-height: 32px;
    color: #000000;
    background: url(../../assets/beiyongwangzhi/buttonbg.jpg) no-repeat;
    text-align: center;
    font-size: 16px;
}
.hengxian {
    border: 0.5px solid #999;
}
.wangzhi_inp {
    position: absolute;
    margin-left: 787px;
    margin-top: -245px;
    color: #fff;
    font-size: 17px;
}
.wangzhi_inp ul {
    margin-top: 10px;
}
.wangzhi_inp ul li input {
    background: #f000;
    border: 0;
    color: #fff;
}

#hdpublic img {
    width: 100%;
}
.bg_tiaokuan {
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#Game-Menual {
    display: flex;
}
#Game-Menual .left_1{
    flex-shrink: 0;
}
#Game-Menual .right_1{
    width: 100%;
}
#Game-Menual a {
    font-size: 12px;
    display: block;
    height: 33px;
    width: 222px;
    line-height: 33px;
    color: #8f8f8f;
    text-align: center;
    text-decoration: none;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center top;
    margin-bottom: 6px;
}
#Game-Menual a:hover {
    color: #fff;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center bottom;
}
#left_down {
    margin: 0;
    height: 40px;
}
#left_down img {
    display: none;
}
/* 1111111111111 */
#lineswwbox img {
    margin-left: 221px;
    margin-top: -348px;
}
</style>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
        };
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
    computed: {
        ...mapState({
            config:'config'
        })
        
    },
};
</script>
