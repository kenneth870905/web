<template>
    <div>
        <Header />
        <div class="bg_zenren">
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
                            我们为客户在博彩自律方面提供多方面的帮助，其中包括：<br />

                            在线存款限额 - 暂时关闭帐户 - 关于控制投注的信息 - 问题性博彩问卷调查 <br />

                            未满博彩年龄 <br /><br />

                            未满18岁的人士进行博彩属非法行为，{{config.title}}会在此方面绝对严格执行。我们会对客户进行年龄验证，并可能要求其上交补充文件。对任何未满18岁人士使用此网站所获得的彩金，一旦发现，将被没收并上报有关部门处理。<br />
                            <br />

                            雇员培训 <br />

                            我们所有的客户服务人员在问题性博彩方面都经过严格的培训。<br /><br />

                            在线存款限额<br />

                            此功能可帮助您控制每24小时或每168小时（7日）的在线存款限额。您可以随时减少此限额，若要提高限额，则需要24小时的生效时间。我们的客户服务小组很乐意为您提供帮助，但我们不能更改您设定的限制。登陆您的帐户之后，您可以访问“服务”区，在“会员” - “我的账户” - “我的信息” - “个人资料”中设定或修改您的存款限额。
                            <br /><br />

                            查看账户历史 <br />

                            您可随时查看账户的交易历史以及存取款记录。账户余额通常可以在“服务” - “会员” - “银行” - “余额”部分中查看，同时您也可以在登录账户时在页面右上角查看。<br /><br />

                            有节制博彩<br />

                            {{config.title}}允许顾客自我禁止使用帐户，限期为6个月 、1 年、2 年或5 年。帐户一旦关闭，客户无论任何原因都不能重开帐户直至所设定的期限到期。在关闭期间{{config.title}}将尽其所能避免客户另外开设一个新帐户。如果帐户状态只是单纯的“关闭”，该帐户可以在任何时间重开。如果您希望使用这项功能或想知道更多相关信息，请联系我们。我们专业的客服人员将竭诚为您服务。
                            <br /><br />

                            关于控制您投注的信息<br />

                            在人们用他们的方式博彩的同时，博彩成了某些人的问题。以下提示也许能帮助您控制博彩问题：<br />

                            1. 博彩只是一种娱乐，不应被视为赚钱的方法 2. 避免有把输的钱赢回来的想法 3. 只投注您付得起的金额 4. 时刻记着花在博彩上的时间和金钱 5. 如果您暂时不想博彩了，可以选择使用自我控制期的关闭账户 6. 如果您需要咨询问题博彩，请联系365betzhuanyuan@gmail.com
                            <br />

                            问题性博彩问卷调查 <br />

                            如果您担心博彩已严重影响到自己或他人的生活，以下问题可帮您找到答案：<br />

                            1. 您进行博彩是否为了逃避乏味或不愉快的生活？ <br />
                            2. 进行博彩并花光钱时，您是否感到迷茫或绝望，并且想尽快再开始博彩？ <br />
                            3. 您博彩时是否会输掉最后一分钱才罢休（甚至是回家的路费或茶水钱）？ <br />
                            4. 您是否曾经用谎言掩饰花在博彩上的金钱或时间？ <br />
                            5. 您是否因博彩而对自己的家庭、朋友或爱好失去了兴趣？ <br />
                            6. 输钱之后，您是否觉得一定要尽快把这些钱赢回来？ <br />
                            7. 争执、挫折或失望是否会导致您想进行博彩？ <br />
                            8. 您是否因为博彩而感到情绪低落甚至轻生？<br />

                            在这些问题中，您问答的“是”越多，您就越可能有严重博彩问题。如想了解更多相关信息，请访问Gambling Therapy的网站联系他们：www.gamblingtherapy.org。<br />
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
.bg_zenren {
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
