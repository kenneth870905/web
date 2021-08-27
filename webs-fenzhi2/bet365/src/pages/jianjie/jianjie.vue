<template>
    <div>
        <Header />
        <div class="bg_tiaokuan">
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
                        <p style="color:white; font-size:13px;">
                            A.简介<br /><br />
                            如果客户使用和/或访问{{config.title}}.com网站或我们拥有的任何其他网站（简称“网站”）或应用程序的任何部分和/或在网站上注册，则将被视为同意受制于：(i)这些条款与规则；(ii)我们的隐私政策；以及(iii)下方第二段中提及的有关我们投注或游戏产品的规则（共称“条款”），并被视为接受和理解全部条款。
                            <br /><br />
                            请仔细阅读条款，如果您不接受这些条款，请勿使用网站。条款亦适用于所有电话投注和通过手机设备进行的投注或游戏，包括可下载至手机设备上的软件（凡提述您对网站的使用，即等同于提述您对我们电话投注和/或手机设备投注服务的使用）。
                            <br /><br />
                            1.当您通过网站进行任何游戏或投注时，将被视为接受并同意受规则的制约，这些规则适用于网站上的相应产品。规则可在网站的“帮助”部分查看，具体位置如下：
                            <br /><br />
                            (a)体育投注产品的规则可通过点击此处查看；(b)娱乐场产品的规则可通过点击此处查看；(c)扑克牌产品的规则可通过点击此处查看；(d)游戏产品的规则可通过点击此处查看；(e)维加斯产品的规则可通过点击此处查看。
                            <br /><br />
                            2.当在以下内容中提及“{{config.title}}”、“我们”或“我们的”时：
                            <br /><br />
                            体育投注产品 - 指Hillside (New Media)有限公司，在英格兰和威尔士（公司编号3958393）注册成立的公司，其注册办公地点设于Hillside, Festival Way, Stoke-on-Trent, Staffordshire, ST1 5SH。全部体育投注将被视为在英国境内所投注并接受。Hillside(New Media)有限公司是由英国博彩委员会颁发执照（执照号码000875）和监管；(b) 游戏产品 - 指Hillside（直布罗陀）有限公司，在直布罗陀（公司编号97927）注册成立，其注册办公地点设于Unit First Floor, Waterport Place, 2 Europort Avenue, Gibraltar。全部游戏产品投注将被视为在直布罗陀境内所投注并接受.Hillside（直布罗陀）有限公司是由直布罗陀博彩委员会颁发执照（执照号码035）和监管。
                            <br /><br />
                            3. 出于多种原因（包括遵循适用的法律、法规以及监管要求），我们可能需要不时更改这些条款和规则。所有更改均将会公布在网站上。最近更新的条款可以在我们的网站上查看。如果任何条款的变更是您无法接受的，您应该停止使用网站和/或关闭您的账户。但是如果在这些条款与规则的更改生效之后，您还继续使用网站，您将被视为已经接受这些更改。
                            <br /><br />
                            4. 当提及“您”、“您的”或“客户”时，是指任何使用网站或{{config.title}}服务的人，和/或在{{config.title}}注册的任何客户。
                            <br /><br />
                            5. 您也许知道，访问和/或使用网站（包括网站上提供的任何或全部产品）在某些国家可能是非法的（例如：美国）。您有责任确保您对网站的访问和/或使用符合您所在辖区的相关适用法律，且有责任向我们担保博彩在您的居住地并非非法。
                            <br /><br />
                            6. {{config.title}}致力于提供最佳的客户服务。作为该承诺的一部分，{{config.title}}支持博彩责任。欲知详情，请点击此处。虽然{{config.title}}将尽力执行其博彩责任政策，但是如果客户仍然继续博彩和/或出于故意逃避现有相关措施的目的而使用网站和/或因非可控原因{{config.title}}无法执行其相关措施/政策，{{config.title}}将不承担任何责任或义务。
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
    width: 100%;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#Game-Menual {
    display: flex;
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
            config:"config"
        })
    },
}
</script>
