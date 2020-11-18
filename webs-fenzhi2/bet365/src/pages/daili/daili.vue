<template>
    <div>
        <Header />
        <div class="bg_bangzhu">
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
                            联盟方案：<br /><br />
                            {{config.title}}亚洲拥有多元化的产品，使用最公平、公正、公开的系统，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，给予合作伙伴最优势的营利回报! 无论 拥有的是网络资源，或是人脉资源，都欢迎您来加入{{config.title}}亚洲合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。 选择{{config.title}}亚洲，绝对是您最聪明的选择!
                            代理条件：<br /><br />
                            a.具有便利的计算机上网设备。<br /><br />
                            b.有一定的人脉资源、网络资源或自己的广告网站。<br /><br />
                            c.每个月都要有5个实际有效投注的会员以上，如达不到就累积到下期计算佣金！<br /><br />
                            有效会员：<br /><br />
                            月结区间内进行过最少五次有效下注且投注总额不低于3000RMB的会员！ 如联盟体系当月未达﹛月最低有效会员﹜最低门坎5人，则该月无法领取佣金回馈。联盟体系当月营利达到标准，而﹛月最低有效会员﹜人数未达相应最低门坎，则该月佣金累积到下期计算退佣。<br /><br />
                            代理收入：<br /><br />
                            活动内容：每周新增会员打码量达2000+，（第一个新增会员奖励28元人头奖金，第二个新增会员奖励38元人头奖，第三个新增会员奖励48元人头奖）以此类推。<br /><br />
                            A：比如您本月的代理账号内有赢利的情况下，就可拥有以下收入:<br /><br />
                            1.一个月内公司在您的代理账号内纯赢利达到1000元-50000元，可享受其中15%的佣金。<br /><br />
                            2.一个月内公司在您的代理账号内纯赢利达到50001元-100000元，可享受其中20%的佣金。<br /><br />
                            3.一个月内公司在您的代理账号内纯赢利达到100001元-200000元，可享受其中25%的佣金。<br /><br />
                            4.一个月内公司在您的代理账号内纯赢利达到200001元-500000元，可享受其中30%的佣金。<br /><br />
                            5.一个月内公司在您的代理账号内纯赢利达到500001元以上，可享受其中35%的佣金。<br /><br />

                            请注意：＊每位加入合营商的客户，如果您在第一个月的有效会员未达到公司要求，但有产生佣金，您的佣金将累计到下个月。<br /><br />
                            *注:禁止代理商私自开设会员帐号进行非法投注套利。任何使用不诚实方法骗取代理佣金或下线会员与代理商同IP的我们视为代理商自己开设会员游戏，将取消代理资格并永久冻结账户，佣金一律不予发放。同IP出现多个会员的话，将被视为无效会员，不得计算在内。 敬请联系代理专员QQ：180348888详细洽谈<br /><br />
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
.bg_bangzhu {
    width: 100%;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
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
