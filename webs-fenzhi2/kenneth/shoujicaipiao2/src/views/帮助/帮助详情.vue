<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">帮助中心</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            
            <div v-if="type=='zhuce'">
                <!-- <div>充值</div> -->
                <ul class="list">
                    <li>
                        <div class="title2">1、如何注册成为会员？</div>
                        <div class="text1">
                        用户进入彩票网站首页，在首页右上方点击"免费开户"，进入用户注册页面，按提示填写相关信息后阅读并同意《彩票网络开户协议》即可完成注册。
                        </div>
                    </li>
                    <li>
                        <div class="title2">2、用户注册时需注意什么？</div>
                        <div class="text1">
                        用户名一旦提交不可更改，请选择容易记忆且安全级别高的用户名，并妥善保管。
                        </div>
                    </li>
                    <li>
                        <div class="title2">3、实名注册相关事项？</div>
                        <div class="text1">
                            彩票中心规定按【实名制】销售彩票，为确保用户中奖权益，请务必注册后在“提款”页面绑定银行卡、真实姓名和提款密码。
                        </div>
                    </li>
                    <li>
                        <div class="title2">4、注册信息错误如何修改？</div>
                        <div class="text1">
                            一经绑定，用户本人无法直接修改真实姓名，需联系在线客服人员进行修改。
                        </div>
                    </li>
                </ul>
            </div>

            <div v-if="type=='chongzhi'">
                <ul class="list">
                    <li>
                        <div class="title2">
                        1、用户游戏如何充值？
                        </div>
                        <div class="text1">
                        账号登录后点击右上方【充值】即可进入充值页面。请选择您的充值方式，按充值流程提示如实填写充值金额信息，成功提交充值订单后2-5分钟左右，刷新账户余额，即可查看是否到账。
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                        2、支持哪些充值方式？
                        </div>
                        <div class="text1">
                        {{config.title}}人彩票提供多种便捷的充值方式供您选择，包括：微信在线扫码支付，微信线下转银行卡支付、支付宝在线扫码支付、支付宝线下转银行卡支付、QQ钱包扫码支付，网银/手机银行转账。第三方在线支付。
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                        3、充值需要手续费吗？
                        </div>
                        <div class="text1">
                        充值安全、方便、快捷，不收取任何入款手续费。
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                        4、为何存款不到账？
                        </div>
                        <div class="text1">
                            <div>
                        *.提交的充值金额和实际汇款金额不一致，会导致不到账。
                            </div>
                            <div>
                        *.充值时未按照官网刷新后页面显示的实际入款信息进行转账。
                            </div>
                            <div>
                        *.如因用户转账时并未获取最新收款信息汇款到旧的收款账号而导致资金损失，需由用户自行承担。
                            </div>
                            <div>
                        *.充值超过五分钟未到账请及时咨询在线客服，并提供用户名及汇款详情单。
                            </div>
                            <div>
                        *.充值时间在平台服务时间外或银行系统维护时。
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div v-if="type=='tikuan'">
                <ul class="list">
                    <li>
                        <div class="title2">
                        1、如何提款？
                        </div>
                        <div class="text1">
                        点击“提款”进入提款页面，需查看是否绑定银行账号信息，支持全国各大银行。
                        填写需要提现的金额，输入提款密码后提交提款订单3-5分钟即可到账。
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                        2、提款注意事项？                        
                        </div>
                        <div class="text1">
                        *.确认提现时提交的银行信息的正确性。
                        *.提款需完成存款的一倍打码量才可申请提现。（打码量是指用户的有效投注金额、不含和局退款。）
                        *.提现银行卡建议使用大型银行，以便能快速到账。
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                        3、提款不成功怎么办？
                        </div>
                        <div class="text1">
                            <div>
                            /提款申请未成功：
                            </div>
                            <div>
                        *提款金额大于账户实有金额。
                            </div>
                            <div>
                        *提款时填写的提款密码与用账户信息设置的提款密码不一致。
                            </div>
                            <div>
                        *银行卡信息不符合规定格式。
                            </div>
                            <div>
                        /申请提款成功，但款项没有到达指定账户：
                            </div>
                            <div>
                    *银行卡卡号填写错误，与用户姓名不符，银行退单。 
                            </div>
                            <div>
                    一旦发生上述现象，请及时联系客服，由客服人员为您服务。
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="title2">
                    4、提款的次数与金额有没有限制？
                        </div>
                        <div class="text1">
                    本平台单笔提款金额最低100元起，每天免提款次数为5次，超出以上次数将收取提款手续费10元和50元的行政手续费。
                        </div>
                    </li>
                </ul>
            </div>

            <div v-if="type=='goucai'">
                <ul class="list">
                    <li>
                        <div class="title2">1、购彩流程？</div>
                        <div class="text1">
                            <div>· 购彩前需要先进行充值，账户有余额才可以进行购彩投注；</div>
                            <div>· 充值完成后，可进入＂首页购彩大厅＂选择您喜欢的彩票进行投注；</div>
                            <div>· 投注完成后，可以进入＂会员中心>投注记录＂，查看您的投注明细，查看是否中奖；</div>
                            <div>· 投注完成后，需等开奖后，才能查看是否中奖；</div>
                            <div>· 投注成功后，系统将自动从您的账户余额扣除对应的投注金额，如果中奖，奖金会自动添加到您的账户余额；</div>
                            <div>· 可以进入＂会员中心>资金明细＂，查看您的账户交易明细；</div>
                        </div>
                    </li>
                    <li>
                        <div class="title2">2、投注方式都有哪些？</div>
                        <div class="text1">
                            <div>标准投注：包括单式投注和复式投注。</div>
                            <div>单式投注：即用户选择一注号码进行投注。</div>
                            <div>复式投注：即用户将两注以上号码的组合方式作为一组投注号码同时投注</div>
                            <div>机选投注：指由系统随机产生投注号码进行投注。</div>
                            <div>直选投注：指将所选号码以唯一的排列方式进行投注。</div>
                            <div>组选投注：指将所选号码的所有排列方式作为一注号码进行投注。</div>
                            <div>追号投注：指将一注或一组号码进行两期或两期以上的投注。追号可分为连续追号和间隔追号，连续追号指追号的期数是连续的，间隔追号指追号的期数不连续。</div>
                            <div>和值投注：指投注各号码相加之和，如3D号码123，其和值为6。和值投注即用该和值的所有号码进行投注，如用户选择3D直选和值1，共3注：001、010和100。</div>
                            <div>包号投注：指将用户所选择号码的所有组合形式进行投注。如3D组三包号01，共2注：001和110。</div>
                            <div>胆拖投注：也叫基数组合投注，通常由胆码和拖码组成。胆码是用户认为出现机会非常大的号码，在所投注的每一注彩票里都固定出现；拖码即彩民补充的其他不同的号码。拖码与胆码共同组成一注完整的投注号码。</div>
                        </div>
                    </li>
                    <li>
                        <div class="title2">3、对于投注号码是否有进行规定？</div>
                        <div class="text1">
                            公司对于下注单注或单项号码等限制投注不可超过总号码的70%、涉嫌无风险投注公司根据会员投注的数量、金额等根据实际情况处理、公司保留严重者冻结会员账号不予结余的权利，谢谢
                        </div>
                    </li>
                    <li>
                        <div class="title2">4、网上投注的优势有哪些？</div>
                        <div class="text1">
                            <div>安全便捷：安全、方便、快捷，足不出户，轻松购彩。</div>
                            <div>永无弃奖：大奖人工通知并自动返还，小奖自动返还。</div>
                            <div>随时随地：无地域限制，除开奖时间外24小时投注。</div>
                            <div>信息服务：提供全方位、多样化的彩票信息服务。</div>
                        </div>
                    </li>
                    <li>
                        <div class="title2">5、网上投注如何保障彩民利益？</div>
                        <div class="text1">
                            <div>
                            自动返奖："自动兑奖，自动返奖"，所有奖金均由网站系统自动开兑并自动返还到用户的账户中。
                            </div>
                            <div>
                            公开查询：用户可以查询自己的投注记录、中奖记录以及资金明细记录，一切做到有据可查，数据公开。
                            </div>
                            <div>数据安全：投注数据及相关资料时时备份，网络系统独立设置、隔离并安装有大型硬、软防火墙，安全级别高，确保数据绝对安全。</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="type=='zhongjiang'">
                <ul class="list">
                    <li>
                        <div class="title2">1、如何查看是否中奖？</div>
                        <div class="text1">登录官网后点击“会员中心”，点击“投注记录”，即可查看中奖纪录。</div>
                    </li>
                    <li>
                        <div class="title2">2、中奖后如何返奖？</div>
                        <div class="text1">{{config.title}}人平台采用“自动兑奖，自动返奖”，所有奖金均由网站系统自动开兑，并自动返还到用户的游戏账户中。</div>
                    </li>
                    <li>
                        <div class="title2">3、为何迟不开奖？</div>
                        <div class="text1">官方未开奖，系统无法获取数据导致开奖延迟。</div>
                    </li>
                </ul>
            </div>
            
            <div v-if="type=='anquan'">
                <ul class="list">
                    <li>
                        <div class="title2">1、保证资金安全应该注意哪些事项？</div>
                        <div class="text1">
                            <div>用户必须注意自己电脑或手机中是否有键盘记录或远程控制等木马程序，使用病毒实时监控程序和网络防火墙并注意升级更新操作系统厂商所提供的安全补丁；</div>
                            <div>尽量不要在公共场所（如网吧）等登陆本网站；</div>
                            <div>牢记密码，密码不得告诉他人，包括自己的亲朋好友；</div>
                            <div>预留密码时不要选用您的身份证、生日、电话、门牌、街巷、重复或连续等易他人破译的数字。建议选用既不易被他人猜到，又方便记忆的密码；</div>
                            <div>发现泄密的危险时，及时更换密码；不定期更换密码。</div>
                        </div>
                    </li>
                    <li>
                        <div class="title2">2、在{{config.title}}人平台购奖安全么？</div>
                        <div class="text1">本站是福彩中心与体彩中心授权的合法的网上投注平台，所售彩票都是福彩中心与体彩中心正规发行的彩票。游戏体验业界第一，强大的技术团队缔造稳定且快速的游戏体验，原生态APP更是业界首屈一指、本站彩票已在工信部备案，是真实有效合法的网上投注平台。</div>
                    </li>
                    <li>
                        <div class="title2">3、如何确保账户安全？</div>
                        <div class="text1">用户在本站充值时选择任一银行卡支付通道后立即进入银行网关，银行卡资料全部在银行网关加密页面上填写，资料提交过程全部采用国际通用的SSL或SET及数字证书进行加密传输，安全性由银行全面提供支持和保护，各银行网上支付系统对网上支付的安全提供保障。</div>
                    </li>
                    <li>
                        <div class="title2">4、为什么登录后长时间不登录，要重新登录？</div>
                        <div class="text1">用户登录后，长时间不操作电脑，系统就认为用户离开自己的电脑了。为了避免别人趁机使用您的账户投注和保护彩民用户账户的安全，系统有要求用户重新登录的设置。</div>
                    </li>
                </ul>
            </div>

            <div v-if="type=='guize'">
                <ul class="list">
                    <li>
                        <div class="text1">
            重要通知：禁止刷7码以上，禁止利用平台进行套利、套现、对打等违规行为，风控系统检测到将对该账号进行封号处理，请遵守“彩票”游戏规则，祝您游戏愉快，盈利多多！！！
                        </div>
                    </li>
                </ul>
            </div>


        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            type:''
        }
    },
    computed: {
        ...mapState({
            config:'config'
        })
    },
    mounted() {
        this.type=this.$route.query.t
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    padding: 50px _vw(10) _vw(10);
}
.list{
    >li{
        margin: 0px 0px _vw(20);
    }
    .title2{
        font-size: _vw(16);
        font-weight: bold;
        margin-bottom: _vw(5);
    }
    .text1{
        color: #505050;
        font-size: _vw(14);
        div{
            margin: _vw(5) 0px _vw(5)
        }
    }
}


</style>
