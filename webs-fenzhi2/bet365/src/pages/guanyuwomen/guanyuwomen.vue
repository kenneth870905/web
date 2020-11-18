<template>
    <div>
        <Header />
        <div class="bg">
            <div id="hdpublic" class="w1000">
                <img src="static/beiyongwangzhi/181011085119.jpg" alt="">
            </div>
            <div id="Game-Menual" class="w1000">
                <div class="left_1">
                    <div class="Game-Menual-box">
                        <a v-for="(item,index) in config.left_list" :key="index" :href="'#'+item.url" target="_self">{{item.name}}</a>
                    </div>
                </div>
                <div class="right_1">

                    <div class="txt">
                        <p style="color:white;">
                            <span style="color:yellow;">我们的客服人员将在一周7天，全天24小时在线为您提供服务。</span><br />
                            您可通过以下方式与我们联系：<br />
                            驻菲律宾亚洲专线： <span style="color:red;">+639052877555</span> <br />
                            驻菲律宾投诉热线： <span style="color:red;">+6309273611000</span> <br />
                            代理QQ：180348888<br />
                            客服专员邮箱：365betzhuanyuan@gmail.com<br />

                            投诉专员邮箱：365bettousu@gmail.com<br />

                            {{config.title}} ,我们的理念：不是最好，但我们敢创，一切只为您！<br />

                            {{config.title}}线上娱乐城经营博彩现金投注多年。是目前世界最大的网络博彩集团之一！{{config.title}}线上娱乐城在200多个不同的国家地区，拥用超500多万名的用户。{{config.title}}集团员工总数现超过2,100名，为全球用户提供7×24全天在线客户服务、在线投注。<br />

                            {{config.title}}官方网站属于英国民营企业前10强的上市集团公司，一个值得您信赖的公司，官方网站采用方便快捷的一户通系统，您只需要一个用户名，一个密码及一种存款方式。就可以无限制体验我们提供的体育投注、真人视讯、电子游艺、彩票等多种互动游戏供玩家选择！<br />

                            为了更好地保证用户的利益﹐{{config.title}}官方网站加入了IBAS(博彩独立仲裁委员会)。是一个权威性的、完全独立的第三方仲裁机构，当客户与博彩公司之间发生不可解决的投注纠纷时，IBAS将提供独立判决。{{config.title}}是一家已在IBAS注册的博彩公司。<br />

                            为了然所有玩家有一个安全的游戏环境，特推出{{config.title}}直营亚洲版官方网：www.asia28365.com,本站只针对亚洲地区玩家开放！且当日可提款1000万，只需5分钟即可到账！<br />
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
    padding: 30px;
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
.bg {
    width: 100%;
    height: 770px;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#Game-Menual {
    display: flex;
}
.left_1{
    flex-shrink: 0;
}
.right_1{
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
import Header from '@/components/Header/Header.vue'//头部组件引入
import Fotter from '@/components/Fotter/Fotter.vue'
import { mapState } from "vuex";
export default {
    data() {
        return {
            
        }
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
}
</script>
