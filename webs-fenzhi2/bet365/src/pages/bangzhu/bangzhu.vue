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
                <div class="right-1">

                    <div class="txt">
                        <p style="color:white; font-size:13px;">
                            存款说明:<br /><br />

                            1. 会员登入後点选”在线存款”。<br />
                            2. 选择公司入款支付宝付款或线上存款﹐如有任何问题﹐请跟{{config.title}}亚洲专线第一时间取得联系。<br />
                            3. 选择”支付银行”。<br />
                            支援借记卡：中国农业银行,北京银行,交通银行,中国建设银行,中国光大银行,兴业银行,中国民生银行总行,<br />
                            招商银行,中信银行,广东发展银行,中国工商银行,深圳发展银行,上海浦东发展银行,中国银行,中国邮政。<br />
                            4. 确认送出後﹐将载入网络银行页面﹐已将您帐户资料加密﹐请耐心等待。<br />
                            5. 进入网路银行页面﹐请确实填写您银行帐号资讯 ﹐支付成功﹐额度将立即加入您的{{config.title}}帐户。<br />
                            <br /><br />
                            存款需知:<br />
                            {{config.title}}最低存款为￥100人民币﹐使用在线支付单笔最高上限￥50000，使用银行卡划款无最高限制，会员存款金额一经确认将会在2分钟之内完成额度添加动作，使用公司入款将可额外获得公司赠送的1.2%存款手续费（建议玩家使用银行卡划款 方便 快捷 安全）<br />
                            未开通网银的会员﹐请亲洽您的银行柜台办理。<br />
                            如有任何问题﹐请洽24小时线上客服。<br />
                            <br /><br />

                            取款帮助<br />

                            会员登入后点选“在线取款”。<br />
                            1.输入取款密码，确认提款人姓名与您银行帐号持有人相符。<br />
                            2.输入出款额度,如有任何问题，请跟{{config.title}}亚洲专线第一时间取得联系、<br /><br />

                            确认提款银行帐号正确。<br />

                            3.绑定工商银行、农业银行、建设银行、招商银行、中国银行、交通银行、中信银行、光大银行、华夏银行、民生银行、广东发展银行、深圳发展银行、邮政储蓄、农村信用合作社为出款银行的会员，取款$1000000RMB以内，可随时提出申请，并享受5分钟到帐<br />

                            取款需知<br />
                            4.{{config.title}}最低取款为$100人民币，最高取款上限為單筆￥1000000人民幣，一天可不限次数申请。<br />
                            5.会员可在24小时内享有第一次提款$1000000内5分钟内到帐，申请提款额度超过$1000000RMB，或距离上次出款未达24小时重复申请者，需经过审核，30分钟内到帐。<br />
                            6.24小时内无限次数提款，如发现会员是恶意连续存取款增加我们工作人员的工作量，{{config.title}}亚洲有权限制该会员的24小时内取款次数，每次出款无须承担任何手续费用。<br />
                            7.{{config.title}}保留权利审核会员账户，若由上次出款起，有效下注金额未达"最后一次入款后帐户的总余额"，而申请出款者，公司将收取"最后一次入款后帐户的总余额"10%的行政费用，以及￥50出款手续费。<br />
                            【例1】1月1日 12:00当下额度1000,并在存入3000元,则在1月1日 12:00后,有效投注额必须为(1000+3000)以上出款,才不被扣除行政费用+手续费用<br />
                            【例2】若有效投注未达到(1000+3000)元,则会扣除行政费用(1000+3000)*10%+手续费50 =须被扣除450元<br />
                            请注意： 各游戏和局/未接受/取消注单，不纳入有效投注计算。 运动博弈游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。**大赔率产品包括: 过关、波胆、总入球、半全场。<br />
                            8.如有任何问题，请洽24小时在线客服。<br />
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
