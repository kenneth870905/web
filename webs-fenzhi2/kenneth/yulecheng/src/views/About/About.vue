<template>
    <div class="container">
        <div class="banner">
            <img src="webConfig/image/us-banner1.jpg" alt="">
        </div>

        <div class="列表">
            <ul class="导航">
                <li :class="{'active':num==0}" @click="num=0">关于我们</li>
                <li :class="{'active':num==1}" @click="num=1">博彩责任</li>
                <li :class="{'active':num==2}" @click="num=2">规则与声明</li>
                <li :class="{'active':num==3}" @click="num=3">常见问题</li>
                <li :class="{'active':num==4}" @click="num=4">联系我们</li>
            </ul>
            <div class="内容">
                <div v-if="num==0" class="contentfirst-us">
                    <div class="h-xq-bt">

                        <h2>关于{{config.title}}娱乐城</h2>
                    </div>
                    <div class="adapt h-xq-nr">
                        <p>{{config.title}}娱乐城成立于2009年，持有菲律宾政府颁发的网络博彩运营执照，同时也是网络博彩委员会制定有合法博彩牌照的网络博彩网站，是正规合法对外营业的专业赌场。公司与亚游（Asia Gaming）,波音（BBIN）, PT（PlayTech），MG（MicroGaming）进行技术合作，共同打造高品质的游戏平台，具有绝对的合法性和公平性。为广大客户提供丰富多彩的博彩活动，并提供丰厚的优惠回馈。</p>
                        <h3>诚信经营</h3>
                        <p>公司严格遵守菲律宾政府规定博彩守则，以“诚”为本。100%信誉保证游戏公平、公正。您的每笔存取款业务在经过审核后都将安全、快捷的完成。</p>
                        <h3>公平公正</h3>
                        <p>真人娱乐城中的荷官均接受严格的国际赌场专业训练与认证，所有赌局都依据荷官动作做出反应，而不是无趣的电脑几率预设结果。我们运用高科技的网络直播技术，带给您亲历赌场的刺激体验。电子游艺使用最公平的随机数产生机率，让您安心享受多元，炫丽的娱乐城性游戏。</p>
                        <h3>安全与隐私</h3>
                        <p>为了客户的网络安全，公司成立网络安全维护中心，并获得GEOTRUST国际认证，确保网站公平公正。而在游戏投注中，我们采用128位SSL加密传输系统，MD5加密保护为游戏平台和客户信息提供进一步保护。我们承诺，将继续不遗余力地严格实行保密和隐私制度，确保个人资料的安全，并保证不将您的资料泄露给任意一方。</p>
                        <h3>友善和专业的客户服务团队</h3>
                        <p>我们亲切友善的客服专员训练有素，在帮助解决客户疑难的同时也能给与您最优越和最贴身的服务。我们也有提供线上聊天的功能，让客户们能即时联络我们。</p>
                        <h3>现场赌厅</h3>
                        <p>{{config.title}}娱乐城在菲律宾马尼拉最豪华的两家赌场云顶赌场（Resort World）和Solaire赌场中均设有VIP赌厅，我们可以为您提供最优质的现场VIP赌厅服务，欢迎新老客户莅临现场参观!</p>
                    </div>
                </div>

                <div v-if="num==1" class="contentfirst-us">
                    <div class="h-xq-bt">
                        <h2>博彩责任</h2>
                    </div>
                    <div class="adapt h-xq-nr">
                        <h3 style="padding:0 0 20px 0; line-height:30px;">未满博彩年龄</h3>
                        <p>{{config.title}}娱乐城积极推行负责任博彩，并极力拒绝未成年玩家使用我们的软体进行网上娱乐城。同时，我们更通过专业人员及各种有效方法，以防止问题博彩的发生。 一旦发现使用该本网站的客户未满18岁，我们将会没收所有赢取的彩金并保留立即终止客户的投注户口操作的权利。</p>
                        <p>本服务不提供给未满十八岁之任何人士。所有使用本服务的人士所提供的数据显示其年龄已满十八岁。如本公司认知未满十八岁之人士尝试或已提供数据给予本网站，本公司将不接受其数据并采取清除其数据的动作。</p>
                        <p>如您的电脑被未满18岁的人士使用， 我们建议您设定电脑资料保密以防止帐户号码/用户名称被盗用。</p>
                        <h3>博彩行为检视</h3>
                        <p>博彩只是一种娱乐城，大部分玩家视博彩为消闲娱乐城。然而小部分玩家无法自制，沉迷于赌博，往往对自己及社会均造成伤害。以下是为玩家准备的博彩问题测试，阁下可以测试是否面临以下的问题。</p>
                        <ol class="h-xq-ol">
                            <li>您是否因为博彩而不上班或不上学？</li>
                            <li>您博彩是否为了逃避烦闷或不愉快的生活？</li>
                            <li>当您博彩花光钱时，您是否感到失望甚至绝望，并且希望马上能再进行赌博？</li>
                            <li>您会否博彩到最后一分钱才罢休？</li>
                            <li>您有否曾经用谎言掩饰您花在博彩上的时间和金钱？</li>
                            <li>您博彩是不是因为争执，沮丧或失望？</li>
                            <li>您有没有因为博彩而感到失落甚至轻生？</li>
                            <li>您是否对您的家人，朋友或爱好失去了兴趣？</li>
                            <li>您输了之后，是否马上想把输的钱赢回来？</li>
                        </ol>
                        <p>在这些问题中您回答的‘是’越多，您就越接近具备严重博彩问题。</p>
                        <p>为了协助您判定所设定的限制是否合适于您，请仔细考虑：</p>
                        <ol class="h-xq-ol">
                            <li>在还未开始博彩之前制定一个可以接受的输赢额度</li>
                            <li>留意您花费多长时间在博彩游戏</li>
                            <li>按您实际情况制定一个您每天、每周或每月的投注额度</li>
                        </ol>
                        <h3>责任感和正直诚信</h3>
                        <p>{{config.title}}娱乐城致力于提高服务水准，并承诺向客户履行最大程度上的责任，包括诚信、透明度、合法性等各方面。如客户遇上任何有关责任博彩的问题，可24小时向我们的客户服务部联络。我们承诺会于一年365日，不间断地为用户提供技术支援及相关问题解答服务。</p>
                    </div>
                </div>

                <div v-if="num==2" class="contentfirst-us">
                    <div class="h-xq-bt">
                        <h2>规则与声明</h2>
                    </div>
                    <div class="adapt h-xq-nr">
                        <p>本公司是合法互联网交易机构，现提醒有意参与本公司所有游戏之客户，应注意其国家或居住地区的相关法律规定，如有疑问，应就相关问题寻求当地法律意见。 本条款涵盖您与本公司，在本网站进行博彩行为时的所有协议。</p>
                        <h3>1、法定要求</h3>
                        <p>根据您所居住国的法律，您必需达到法定年龄，您才可使用本网站。</p>
                        <p>如果您尚未年满18岁，在任何情况下您都不可使用本网站。</p>
                        <p>部份地区或国家法律尚未明确在线博彩的合法性问题，甚至某些地区或国家已明确规范在线博彩为非法行为。我们无意邀请任何人在这些地区或国家非法使用本网站。本网站的存在并不表示我们推广在线博彩于任何赌博非法的地区或国家。您必需确定在您所居住的地区或国家使用在线博彩是否合法，并负完全的责任。</p>
                        <h3>2、帐户规定</h3>
                        <p>客户只能拥有一个账号，如发现客户拥有多个账号，本公司有权冻结客户的账号以及取消该账号内所有胜出的投注。本公司有权保留取消任何因素导致账号结余不正确的金额。此外如发现账号持有人与亲属共同使用多个不同账号，本公司有权限制客户每人各保留最多一个账号。若上述情形已构成欺诈、危害或侵犯本公司及其它用户权利或利益时，本公司有权要求该用户赔偿并没收用户帐户中所存之余额，终止或注销用户继续使用本系统的权利。</p>
                        <h3>3、交易结算</h3>
                        <p>用户有责任及义务在每次游戏交易之前或之后及离开游戏前，检查自己的账户余额。当用户怀疑余额有错误时，必需在进行下一回合的游戏（游戏开始到结账画面出现视为一个回合）前，向本网站在线客服人员或本公司客服部人员提出申诉。如果您不这么做，本公司将视为您放弃提出申诉的权利，并接受目前的余额数据为正确。</p>
                        <p>直接与本公司交易结算的用户，银行帐户名称须与会员登记和申请过程中所使用的姓名一致。若用户使用信用卡或借记卡时，持卡人姓名亦须与会员登记和申请过程中所使用的姓名一致。若发生银行账户名称或持卡人姓名和账户登记(会员注册)时所使用的姓名不一致时，本公司有权拒绝相关交易的结算。</p>
                        <p>直接与本公司交易结算的用户，本公司会依据用户所提供的交易方式信息，将博彩所得存入您的用户帐户中。任何款项或所得在存入账户的过程中，若因为用户所提供的信息不足或信息错误而发生交易错误的情形时，本公司不负任何形式的责任。用户一旦发现帐户内款项有误时，有责任立即通知我们。</p>
                        <p>本公司因用户的结算交易而蒙受的银行费用，包括手续费、电邮费等，本公司有权从用户的帐户余额中扣除和抵扣上述费用。</p>
                        <p>JACKPOT 中奖后将根据具体中奖金额扣取一定的奖池管理费，具体以游戏平台公司的收取金额作为依据。</p>
                        <h3>4、本公司之权利与义务</h3>
                        <p>本公司会采取各种措施保护玩家的账户安全。</p>
                        <p>本公司绝不会以任何人为的手段，影响游戏的公正性。</p>
                        <p>本公司对非法使用玩家账户的行为不负任何责任。</p>
                        <p>本公司保留修改所有制度及规则条款的权利。</p>
                        <p>本公司若发现玩家在游戏中，有作弊、攻击或破坏本系统正常操作以及使用明确表示或暗示的方式以与事实不符、莫须有之说针对「{{config.title}}娱乐城」诋毁、漫骂、恐吓、毁谤的行为，经公司劝阻不止，本公司保留拒绝/禁止和吊销玩家继续使用本系统的所有权利 ，"并将依菲律宾共和国法律进行追诉"。</p>
                        <p>本公司对于您个人的数据及在系统中进行的记录，皆有「备份数据」。但若不幸发生不可抗拒之因素（如天灾、恐怖活动、战争、暴动…）导致上述数据遗失时，本公司会尽全力恢复所有的历史数据，所恢复的数据也将视为公正。</p>
                        <h3>5、促销和优惠</h3>
                        <p>所有促销、优惠和特别活动均须遵守本条款及本公司针对具体优惠活动所不时制定的规则与条款。本公司保留在任何时候中止、取消或修改该等促销、奖励和特别活动之相关规定及条款的权利。</p>
                        <p>若本公司认定有人滥用或企图滥用某项促销或奖励活动，或可能因该等滥用行为而获利时，本公司有权自主决定以其认为合适的方式阻止、拒绝、中止或撤销任何用户参加有关的促销、奖励和特别活动。</p>
                        <h3>6、条款修改政策</h3>
                        <p>本公司保留不时修订、更新和修改本条款和游戏规则的绝对权力。任何修订、更新和修改将在官网上公布。经修订、更新或修改的本条款和游戏规则，在公布时即生效。用户在上述修订、更新和修改公布后，继续使用本网站或游戏时，则视为用户同意并接受本公司的修订、更新和修改。</p>
                        <p>我们建议您定期阅读本网站之规则与条款及游戏规则。</p>
                        <p>上述修订、更新和修改，本公司可自行决定是否通知用户。本公司并无任何义务向用户通知上述之修订、更新和修改。</p>
                    </div>
                </div>

                <div v-if="num==3" class="contentfirst-us question">
                    <div class="h-xq-bt">
                        <h2>常见问题</h2>
                    </div>
                    <div class="adapt h-xq-nr">
                        <h3 style="padding:0 0 20px 0; line-height:30px;color:#d01924;">一．{{config.title}}娱乐城注册</h3>
                        <h5 style="font-size:15px;padding:0 0 10px 0;">1.如何注册{{config.title}}娱乐城真钱账户？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">点击网页右上角“免费开户”按钮，根据弹出页面需求,填写真实有效的信息后，{{config.title}}娱乐城后台系统将自动生成账户。如在此过程中产生任何问题，请立即联系{{config.title}}娱乐城客服人员。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">2.如何登录{{config.title}}娱乐城游戏？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">您可以登录官方网址或通过客户端，登录{{config.title}}娱乐城的游戏页面。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">3.有没有试玩？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">我们提供免费试玩账号，让您了解以及熟悉我们的游戏平台和游戏种类，如果对我们游戏平台满意的话可以存款进行真钱游戏。（备注：试玩彩金仅供试玩，不参与提款）</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">4.为何无法正常浏览{{config.title}}娱乐城网站</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城网站在无法抗拒因素干扰时可能会导致您无法正常浏览网站，如遇此类情况请立即联系{{config.title}}娱乐城客服人员。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">5.{{config.title}}娱乐城客户游戏年龄限制</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城真钱账户年龄最低限制为18岁，凡18岁以下，{{config.title}}娱乐城谢绝注册！</p>

                        <h3 style="padding:10px 0 20px 0; line-height:30px;color:#d01924;">二．{{config.title}}娱乐城账户</h3>
                        <h5 style="font-size:15px;padding:0 0 10px 0;">1.如何更改注册信息</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城必须使用真实姓名注册，一旦注册成功，姓名和账号无法更改；银行卡信息和密码可以在【会员中心】自行更改，如在此过程中遇到任何问题，可以随时联系{{config.title}}娱乐城客服。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">2.忘记密码怎么办？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">
                            {{config.title}}娱乐城共有2个密码。一个是您进入网站或者游戏的登录密码，另外一个是提款时使用的安全密码。<br>
                            <font style="color:#049;">A.登录密码忘记：点击网站右上角的“找回密码”：</font><br>
                            1.通过输入安全密码来重置登录密码；<br>
                            2.通过您注册资料绑定的邮箱重置登录密码；<br>
                            3.通过您游戏账号绑定的手机来找回登录密码；<br>
                            <font style="color:#049;">B.安全密码忘记：</font><br>
                            1.请先登录您的账号，进入【会员中心】&gt;【安全管理】&gt;【安全密码】，通过设置安全问题重置安全密码；<br>
                            2.通过游戏账号绑定的手机重置安全问题，重设安全密码。
                        </p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">3.如何完成存款</h5>
                        <p style="padding-bottom:10px;line-height:24px;text-indent:0;">
                            <font style="color:#049;">A．存款</font><br>
                            自您成功注册帐号之后，您就可以开始存款业务。目前为止{{config.title}}娱乐城接受：“扫码支付” “在线支付”，“支付宝转账”，及“网银转账/ATM及柜台”等存款方式。请您根据实际情况，选择最合适的存款方式。
                        </p>
                        <p style="padding-bottom:10px;line-height:24px;text-indent:0;">
                            <font style="color:#049;">B．完成存款之后多久可以添加到账户中？</font><br>
                            根据您选择的存款方式的不同，金额到帐时间也会有所不同，一般都是即时到帐。如遇问题请联系{{config.title}}娱乐城客服人员。
                        </p>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">
                            <font style="color:#049;">C．存款之后是否有投注要求？</font><br>
                            在您完成存款之后，在您没有领取任何奖金的情况下，您只需要完成存款额一倍的投注额，即可申请提款。
                        </p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">4.如何完成提款</h5>
                        <p style="padding-bottom:10px;line-height:24px;text-indent:0;">
                            <font style="color:#049;">A．提款</font><br>
                            在您的帐号完成所有投注要求之后，您可以在【财务中心】的【会员提款】填写资料后提交申请，相关部门会立刻为您处理；申请提款时，请务必填写真实银行信息。提款一般5分钟内可以到帐。
                        </p>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">
                            <font style="color:#049;">B．提款为什么被拒绝？</font><br>
                            提款业务被{{config.title}}娱乐城相关部门退回之后，请您立即联系{{config.title}}娱乐城客服咨询。
                        </p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">5.如何户内转账？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">登录账号以后，点击右上角的“转账”，选择相应的游戏厅，游戏时选择“转入游戏平台”，提款时选择“转入主账户”。</p>

                        <h3 style="padding:10px 0 20px 0; line-height:30px;color:#d01924;">三．{{config.title}}娱乐城游戏</h3>
                        <h5 style="font-size:15px;padding:0 0 10px 0;">1.{{config.title}}娱乐城提供多少款游戏？</h5>
                        <p style="padding-bottom:0px;line-height:24px;text-indent:0;">{{config.title}}娱乐城目前提供多平台高支付游戏，包含：</p>
                        <table class="tb-tab1" style="margin-bottom:40px;" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th width="30%">游戏类型</th>
                                    <th width="40%">游戏种类</th>
                                    <th>游戏供应商</th>
                                </tr>
                                <tr>
                                    <td rowspan="9">电子游戏</td>
                                    <td rowspan="9">1000多款</td>
                                    <td>PT</td>
                                </tr>
                                <tr>
                                    <td>MG</td>
                                </tr>
                                <tr>
                                    <td>TTG</td>
                                </tr>
                                <tr>
                                    <td>DT</td>
                                </tr>
                                <tr>
                                    <td>SW</td>
                                </tr>
                                <tr>
                                    <td>PP</td>
                                </tr>
                                <tr>
                                    <td>AG</td>
                                </tr>
                                <tr>
                                    <td>BBIN</td>
                                </tr>
                                <tr>
                                    <td>PS</td>
                                </tr>
                                <tr>
                                    <td rowspan="4">真人现场游戏</td>
                                    <td rowspan="4">40多款</td>
                                    <td>AG</td>
                                </tr>
                                <tr>
                                    <td>PT</td>
                                </tr>
                                <tr>
                                    <td>MG</td>
                                </tr>
                                <tr>
                                    <td>BBIN</td>
                                </tr>
                                <tr>
                                    <td rowspan="5">捕鱼游戏</td>
                                    <td rowspan="5">7款</td>
                                    <td>AG</td>
                                </tr>
                                <tr>
                                    <td>PT</td>
                                </tr>
                                <tr>
                                    <td>SW</td>
                                </tr>
                                <tr>
                                    <td>BBIN</td>
                                </tr>
                                <tr>
                                    <td>GG</td>
                                </tr>
                                <tr>
                                    <td rowspan="2">体 育</td>
                                    <td rowspan="2">20多款</td>
                                    <td>BBIN</td>
                                </tr>
                                <tr>
                                    <td>平博</td>
                                </tr>
                            </tbody>
                        </table>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">2.进入游戏很慢怎么办？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">
                            如果您进入我们的网站或游戏过于缓慢，建议您清除下缓存！ IE和360浏览器的步骤为：<br>
                            1.请您先退出我们的网站。<br>
                            2.点击浏览器右上角“工具”选择“Internet选项”，再点击“删除”，勾选“Cookie和网站数据”并点击删除，等待删除完成后请再次尝试进入游戏！
                        </p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">3.游戏中视频无法显示怎么办？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">
                            建议您可以清除您的FLASH 缓存，请您点击这个链接网址：<br>
                            <a style="color:#049;text-decoration:underline;" href="http://www.macromedia.com/support/documentation/cn/flashplayer/help/settings_manager07.html" target="_blank">http://www.macromedia.com/support/documentation/cn/flashplayer/help/settings_manager07.html</a><br>
                            然后点击“删除所有WEB站点”。在弹窗中点击“确认”即可完成操作！
                        </p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">4.手机可以玩游戏吗？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">目前网站支持安卓和苹果手机，您可以使用网页游戏或者下载客户端游戏。但是就算是在WIFI的环境下，目前手机处理器的运行能力还是有限，有时会出现画面卡顿的情况。所以建议还是用电脑运行游戏！</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">5.如何产生游戏结果并保证游戏的公平性？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城所有游戏结果均由游戏供应商所产生，游戏结果真实有效，{{config.title}}娱乐城会对所有的游戏结果负责。真人娱乐城中的荷官均接受严格的国际赌场专业训练与认证，所有赌局都依据荷官动作做出反应，而不是无趣的电脑几率预设结果。电子游艺使用最公平的随机数产生机率，让您安心享受多元，炫丽的娱乐城性游戏。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">6.如何下注，撤销投注，查询游戏记录？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城所有游戏下注均在游戏页面拥有醒目下注按钮，根据您的投注习惯下注即可。老虎机类游戏无法撤销投注，一经点击游戏自动开始，请妥善点击。真人现场类或体育竞技类游戏在投注为被接受之前，可以选择取消投注。所有游戏记录均可在游戏页面菜单中查询。如遇任何问题，请随时联系{{config.title}}娱乐城客服人员。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">7.为什么投注记录中的有效投注额和你们统计的不一致呢？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">AG平台和波音平台都是采用的美东时间（美国东部时间如：纽约、华盛顿时间）所以投注记录中的时间会和实际投注时间有差别。例如实际投注时间为当天晚上20:00则记录上显示的时间为当天早上8:00，有12个小时的时差。MG采用的格林威治时间，和北京时间有8个小时时差。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">8.真人现场游戏是实时游戏吗？游戏页面是否作假？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城真人现场游戏提供商为Playtech、AG、Microgaming、BBIN，其旗下所有真人现场游戏均为实时游戏。PT牌桌旁边电视中播放美国CNN电视台或者其他著名电视台全球同步的节目，此外您还可以随时与真人现场荷官聊天；AG您可以拨打桌面的菲律宾电话进行实时通话。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">9.如果游戏突然中断遇突发状况我该怎么办？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城游戏经过不断完善已经在同行业中属于极为稳定的游戏环境。但是由于国际网络，客户所在国家地区等诸多不可控制因素干扰，游戏有可能会突然中断。如遇到此类问题，请勿惊慌焦躁，立即联系{{config.title}}娱乐城客服人员协助处理。在此{{config.title}}娱乐城郑重承诺，凡是由于{{config.title}}娱乐城方面造成的游戏损失，{{config.title}}娱乐城一定会为此负责及赔偿！</p>

                        <h3 style="padding:10px 0 20px 0; line-height:30px;color:#d01924;">四．{{config.title}}娱乐城投注及奖金要求</h3>
                        <h5 style="font-size:15px;padding:0 0 10px 0;">1.{{config.title}}娱乐城如何获得奖金</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">{{config.title}}娱乐城提供了许多优惠奖金获取机会，部分奖金是您无需申请，自动添加至您的账户中，另外一些奖金则需要您申请，通过之后自动为您添加。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">2.可以取消奖金吗？</h5>
                        <p style="padding-bottom:30px;line-height:24px;text-indent:0;">在您账户获得奖金之后，是无法取消的。</p>

                        <h5 style="font-size:15px;padding:0 0 10px 0;">3.没有完成投注要求是否可以提款？</h5>
                        <p style="padding-bottom:0px;line-height:24px;text-indent:0;">{{config.title}}娱乐城所有真钱账户在没有完成相应奖金投注要求之前，谢绝提款业务。如果您的账户余额低于5元人民币时，之前的所有投注要求将会自动清零。</p>

                    </div>
                </div>

                <div v-if="num==4" class="contentfirst-us question">
                    <div class="h-xq-bt">
                        <h2>联系我们</h2>
                    </div>
                    <div class="adapt h-xq-nr">
                        <h3 style="padding:0 0 20px 0; line-height:30px;">{{config.title}}娱乐城客服部</h3>
                        <p style="padding-bottom:20px;">{{config.title}}娱乐城客服部是指定对客服务部门，客服部工作性质为24小时线上服务，其服务沟通渠道包含“在线客服”“免费热线”“QQ客服”及“投诉与建议”。如果您在{{config.title}}娱乐城游戏中遇到任何问题，您可以通过以下方式联系客服人员寻求帮助，客服部专业24小时客服人员竭诚为您服务！</p>
                        <p style="padding-bottom:20px;"><em>温馨提示：</em>以下联系方式为{{config.title}}娱乐城指定服务通道，如遇到冒充、伪造或未经证实的沟通案例，请勿相信其任何内容，并且请您及时联系本公司客服人员核实或反映情况！在此声明，如客户在虚假服务中受到任何损失，恕本公司概不负责！感谢您的支持帮助与理解！</p>
                        <h3>在线聊天包含:</h3>
                        <p style="padding-bottom:20px;">1. <a href="javascript::" @click="onLineService()">官方在线客服。</a></p>
                        <p style="padding-bottom:20px;">2. QQ客服：<span id="qq">{{config.qq}}</span> </p>
                        <!-- <p style="padding-bottom:20px;">3. 国际客服电话：<span class="sitedh1">{{config.internation_phone}}</span> , 投诉电话：<span class="sitedh2">{{config.supervision_phone}}</span></p> -->
                        <p style="padding-bottom:20px;">
                            3. 电话客服:<span class="sitedh1">{{this.站点配置.kefu_phone ? this.站点配置.kefu_phone : this.config.kefu_phone}}</span> 
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            config: config,
            num: 0
        }
    },
    computed: {
        ...mapGetters({
            站点配置: '站点配置'
        })
    },
    methods: {
        onLineService() {
            if (this.站点配置.online_chat) {
                window.open(this.站点配置.online_chat)
            } else {
                window.open(config.online_chat)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    background: #ffffff;
    padding-top: 10px;
}
.banner {
    img {
        width: 100%;
    }
}
.列表 {
    display: flex;
    .导航 {
        flex-shrink: 0;
        width: 240px;
        margin-right: 20px;
        background: #fff;
        min-height: 600px;
        overflow: hidden;
        li {
            height: 60px;
            line-height: 60px;
            font-size: 15px;
            border-bottom: 2px solid #f2f2f2;
            text-indent: 25px;
            position: relative;
            cursor: pointer;
            position: relative;
        }
        li::after {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 0px;
            height: 100%;
            content: "";
            background: #ff4b4b;
            transition: all 0.3s;
        }
        li.active {
            background: #ff4b4b;
            color: #fff;
        }
        li:hover::after {
            width: 5px;
        }
    }
    .内容 {
        flex-grow: 1;
    }
}
.h-xq-bt {
    height: 60px;
    border-bottom: 2px solid #f0f0f0;
    h2 {
        line-height: 60px;
        margin-left: 30px;
        font-size: 24px;
        font-weight: 200;
        color: #e21;
    }
}
.h-xq-nr {
    padding: 30px 30px 50px 30px;
    p {
        line-height: 32px;
        font-size: 14px;
        color: #666;
        text-indent: 2em;
    }
    h3 {
        line-height: 64px;
        font-size: 18px;
        padding-top: 10px;
        font-weight: 500;
    }
}

.tb-tab1 {
    margin: 10px 0 0px 0;
    font-size: 13px;
    border-left: 1px solid #312741;
    border-top: 1px solid #312741;
}
.tb-tab1 td,
.tb-tab1 th {
    height: 44px;
    text-align: center;
    vertical-align: middle;
    border-right: 1px solid #312741;
    border-bottom: 1px solid #312741;
    color: #222;
    background: #fff;
}
.tb-tab1 thead td,
.tb-tab1 th {
    background: #231a32;
    font-weight: bold;
    color: #fff;
}
</style>
