<template>
    <div>
        <Header />
        <div class="bg_tiaokuan" >
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
                            热门—常见问题<br /><br />

                            *如果我忘记了自己的用户名/密码怎么办？<br /><br />

                            我们理解无法登录账户是怎样的苦恼，因此我们在此提供一些帮助指南来协助您解决问题。<br />
                            如果您忘记了登录信息，例如您的账户用户名和/或密码，只需点击我们网页右上角的“忘记密码?”，然后输入您的账户选择您的密保问题，再输入您的密保答案您将可重新设置一个新的账户密码或者找回您的用户名。<br />
                            如果您在找回丢失密码时，遇到任何问题，请在客户服务中联系我们。<br /><br />

                            *为什么我的用户名和密码无法登录账户?<br /><br />

                            我们很理解您无法登录账户的苦恼。请您注意您的密码是有大小写区分的，如果您输入错误密码超过三次，您的账户将会被自动锁定。<br />
                            如果您不小心锁定了您的账户，您可以通过忘记密码的功能来重新获得登录信息。只需点击我们网站右上角的“忘记密码？”。然后输入您的账户选择您的密保问题，再输入您的密保答案您将可重新设置一个新的账户密码或者找回您的用户名。<br />
                            如果您在登录时收到了错误信息ACTSTA，请在客户服务处联系我们，同时准备好账户及个人资料 【用户名和/或密码、手机号码、提款银行账号、提款密码、身份证扫描件（必要时）】<br />
                            如果您在以上操作中遇到任何问题，请在客户服务中联系我们。<br /><br />

                            *什么是“结束投注”，它是如何操作的？<br /><br />

                            “结束投注”特色可以让您在所选投注项盘口关闭前得到返还。如果您的投注项表现出色，您可以盈利，或者您觉得投注胜算很低，也可使用该特色降低您的损失。<br />
                            您可按照投注单“结束投注”按钮上显示的返还金额选择是否“结束投注”。该金额取决于不断波动的现场盘口赔率，可能高于或者低于您的初始投注额。<br />
                            您所需要做的就是时刻关注“结束投注”返还额以及您的投注项表现。如果您对于提供的金额满意，即可使用“结束投注”按钮提前结束您的投注。<br />
                            您的“结束投注”申请一旦成功，投注随即结算，返还至您账户中的金额与投注单上“结束投注”按钮上显示的金额一致。您的投注即被结算，而相关盘口的最终实际结果将不影响返还至您账户中的金额。<br />
                            结束投注适用于特定的赛前及滚球盘口，涵盖包括足球、网球及篮球等一系列体育项目的单注和过关投注。<br />
                            结束投注举例：<br />
                            如果进行了一个五串一的足球投注，其中四场比赛在周六举行，余下一场在周日。您在周六的所有四项赛事投注均获胜，只剩下最后在周日进行的投注项还没有结果。依据获胜投注项与剩余投注项的赔率，您将被提供一个“结束投注”返还额。您可以选择接受该金额或者继续等待比赛自然结束。<br />
                            如果开赛前在球队A上进行了比赛获胜者的单注，离比赛还有20分钟结束时，球队A以2-0领先并有绝对优势获胜，但是也不能排除球队B在最后阶段反败为胜。这时“结束投注”将提供一个返还金额帮您消除顾虑，去除风险。<br />
                            如果开赛前在球队A上进行了比赛获胜者的单注，半场时的比分为0-0，并且您的投注项看上去进球得分并赢得比赛的几率不高。“结束投注”可能在此时提供一个比您初始投注额低的返还，但是却为您提供了一个可以拿回部分投注额的机会，而不是看着自己的投注全部输掉。<br />
                            <br />
                            *在哪里可以找到投注结算相关规则？<br /><br />

                            我们专门设有“规则”部分，您可通过点击网站底部导航的“条款与规则”中查看到。或者，该信息也可在此处查阅。<br /><br />

                            *我的投注需要多长时间才能得到结算？<br /><br />

                            我们一直努力尽快结算投注，但对于某些赛事我们需要等待官方结果确认后才可以结算投注，有时可能会稍有延迟。我们致力在赛事结束或是滚球盘投注结果揭晓后的1小时内完成所有投注结算。<br />
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
export default {
    data() {
        return {
            config: config,
        }
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
}
</script>
