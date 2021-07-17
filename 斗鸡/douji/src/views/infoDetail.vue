<template>
    <div class="banner">
        <img v-if="type=='sv388'" src="static/image/sv388-banner.jpg" alt srcset />
        <img v-if="type=='digmaan'" src="static/image/digmaan-banner.jpg" alt srcset />
    </div>
    <div class="box-1">
        <div class="w1200">
            <div class="title">通知:</div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>
    <div class="w1200">
        <div class="title-1">{{type}}</div>
    </div>

    <div v-if="type=='sv388'" class="info-content">
        <div>
            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">总规则</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站只限于符合该地区司法所规定符合法定年龄的个体。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站对于任何使用本网站而侵犯任何国家法律，联邦法律或者国际法的用户</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">,</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站不持有任何的法律责任。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">用户须对自己的行为负责任，并受到各自国家的法律限制，包括国家法律或法律问题。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">所有代理人须为各自的成员账户负责，并承兑所有成员呈交后经确认的投注。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">代理人不是本网站的合伙人。因此本网站将不会对玩家和代理人之间的差异或争议负责任。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">防止未经授权使用用户帐号和密码是用户的责任。用户帐号和密码如果被盗用或破坏，用户必须马上联系其代理人。代理人将更改该用户的账号状态和密码。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在用户帐号和密码被盗用的情况下，用户须为各自的帐户负责并且承兑已呈交的投注。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">游戏规则</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站决定的比赛结果是最终和有约束力的。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如有争议，本网站和玩家的管理人双方必须同意以本网站的事务日志资料库作为该争议的最终仲裁者。所有争议必须在比赛成绩出炉的同一天提呈。比赛隔天的索赔将不会被承兑。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">玩家须全权负责核实其帐户所有交易记录的准确性。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">请务必要在用电脑提交投注前检阅您的投注以避免错误，误差或遗漏。投注一旦被电脑接受，您将不能做任何更改或删除。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">限制和债务</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">对于前述条文的概论没有成见，在下列的情况下，包括被破坏、不可抗力，和（或）对本网站中央电脑系统、记录或任何部分所发生的故障，损坏或毁坏；或延误，损失，错误，遗漏或其他导致电讯或任何数据传输系统故障；或任何延误导致参赛无收据，本网站</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">将不须向任何人负责任。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">所有因自然灾害、敌对行动、暴动、内乱、恐怖主义行为、政府或当局行为（包括拒绝或撤销任何执照或许可）、火灾爆炸、水灾、盗窃、恶意破坏、罢工、锁定、工业行动而造成的损失，本网站将不须负任何责任。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果因网络连接、通信、系统或人为错误导致投注时出现问题，例如双倍投注被接受、投注不能被确认、比赛开始后才下注等等，在这类情况下，我们保留权利针对个案表态，和采取其他行动以纠正该错误。对这类错误，我们没有义务对您或任何第三者负责任。如果您遇到这类错误后，在没有通知上线的情况下继续投注，一旦错误再次发生，您将必须负责任并且承兑所有盈亏结果。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">这些规则和条列将构成双方之间的整体协议和谅解。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果英语版本的规则和条例和任何其他语言版本有任何差异，英语版本将取代其他语言，并且被视为正确及有效的。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">展望</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站的愿景是通过提供高度诚信，品质服务，绝妙游戏体验满足所有客户的需求。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">使命</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">提升斗鸡业作为我国经济的推动者之一。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">提倡该运动作为数以万计的菲律宾人的生计来源。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">保护每个斗鸡爱好者的固有权利和热忱，让他们能享受这项运动，作为我国传统的一部分。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:24.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">斗鸡饲养员全国联合会</span>
                                    </span>
                                </span>
                            </b>
                            <b>
                                <span style="font-size:24.0pt">
                                    <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">(NFGB)</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">赛事规则</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">斗鸡是菲律宾独特的遗产，一种体现了体育精神的传统文化。诚实遵守公平竞赛，尊敬彼此和大方的接受失败是这运动的规范，菲律宾人都无一例外严格遵守。在追求这运动中，爱好者被冠于崇高的敬意，而批评者将被排斥。这项运动符合了民主主义。社会的两个极端，从赤脚的农民，到崇高和威武的，以及两者之间的人们，都一视同仁。</span>
                                </span>
                            </span>
                            <br />
                            <br />
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">通过采用这种统一的赛事规则和服从其要求，我们希望最终能成功的启发公众，以及减少（如果不能完全消除）社会对</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Sabong</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">的偏见和不屑。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">术语的定义</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">为了有序和有益地进行斗鸡比赛，让参赛者和爱好者对</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Sabong</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">运动里常用的词汇和短语有共识是势在必行的。因此，我们必须统一规则，使用受限于以下成立的词汇意思，作为我们的斗鸡赛事的通用语，以至让一名来自</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Iloilo</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">到</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Tuguegarao</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">参赛的参赛者不会遇到赛事行话的复杂场面，因为他知道</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Pagba</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">和</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">Cvgba</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">所用的斗鸡词汇和短语都拥有同样的意思，因两边的协会都采用联合会的统一赛事规则。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">协会</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡饲养员的一个组织，亦是联合会的成员。</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">‘</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">联合会</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">’</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">或</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">‘NFGB’</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">词汇包括了旗下所有协会，除非另有限定。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">推广员</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">组织赛事的人</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">赛事委员会（全国性）</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">临时或定期委员会，由三（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">3</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）名联合会特定的成员组成（包括至少两（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">2</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）名协会主席和一（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）名高级全国性赛事主管），以监督赛事程序，并有最终权利解决涉及任何规则，和那些可能没有被列下的规则而引发的争议。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">赛事委员会（本地）</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本地的赛事委员会是由本地的协会主席组成，包括两名董事会成员和一名联合会代表。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">拒绝的权利</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">本网站可以因为内部的原因履行自由裁量的拒绝参与任何赛事的资格。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">成</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">熟斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一支成熟的雄鸡，并已经历第一次的年度换毛，生性好斗，被饲养和训练以提升它的战斗能力。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">雄斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一只年龄是十二</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(12)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">个月或以下的雄鸡。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">中</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">龄</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一只年龄大过十二</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(12)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">个月的</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">雄斗鸡（是雄鸡在介于雄斗鸡和成</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">熟斗鸡之间的阶段）（注释：成</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">熟斗鸡</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一词包括雄斗鸡和中</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">龄</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡，除非另有限定）</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/SULTADA –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">两</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(2)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">只配有刀</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(Tari)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">的斗鸡之间的斗争，结果将根据所投注的一方。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">赛事</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">由联合会或推广员组织的斗鸡活动。参赛者同意参加所定的斗鸡赛事数量，依据重量的均匀度或相近度。结果将使一池</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(Pot)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">的资金被除去，再由联合会</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">推广员付钱给获胜者。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">COCKPIT / SABUNGAN / GALLERA –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡的场地</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">竞技场</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/ RUEDA –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡战斗的竞技场。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">利刀</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/TARI –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一个弯曲形状的钢铁武器，附有单边锋利的刀锋锥形成一个穿刺尖点，用于斗鸡比赛。这枚武器是菲律宾艺术家仿造传统艺术和技术进化而成，也仍不断被此贸易的继承者改进。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">竞技场管理员</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">这名人员会在</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">Soltada</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">开始之前，根据规则控制和管理竞技场的程序，并强制执行纪律和秩序。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">裁判</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/SENTECIADOR –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">这名人员在竞技场上全权主持和控制斗鸡比赛，从战斗开始，直到他决定比赛结果。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">经手人</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/SOLTADOR –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在斗鸡赛释放斗鸡的人员</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">脚跟人员</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/MANANARI –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在斗鸡脚上绑上利刀的专家</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">由参赛者或代表参赛者命名，参赛者的斗鸡将以此名战斗和鉴定，为了成立其参加赛事的权利和义务。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛费用</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛者欲参赛时所须缴付的一笔所定的金额。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">赛事奖金</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛费用的总数。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">中央投注</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/PARADA –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">经由某赛事竞技场管理员放置的投注。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">热门鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/LLAMADO –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">代表着赢率较高与被大部分在竞技场里的人所喜爱的鸡只。拥有较多中央投注。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">冷门鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/DEJADO –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">代表着赢率较低与不被看好的鸡只。拥有较少中央投注。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">庄家</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">拥有较多中央投注的斗鸡所占的竞技场区域。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">闲家</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">拥有较少中央投注的斗鸡所占的竞技场区域</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">增加</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">为了提高闲家的中央投注而提出的投注请求，以使其投注与庄家的划一。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">记录重量</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">为了参赛所提交的斗鸡重量，会被输入赛事记录。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">实际重量</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">绑利刀或重绑利刀时测量的斗鸡重量。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">脚环</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡脚上绑着带有号码的环带，以作鉴定，会在赛事开始之前，在竞技场或</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">rueda</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">里拆除。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">匹配</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一个甄选过程，相同或相似重量的斗鸡将被匹配相斗。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">双战</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">匹配两个参赛者在赛事同一天有两场战斗。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">CARREO/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">对抗</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">当其中一只斗鸡停止打斗，让两只斗鸡面对面（喙对喙）的过程，以决定是否继续打斗或当下做出输赢决定，由裁判根据规则里附件</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">’A’</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">所叙述的传统</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">3-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">上</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-3 –</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">下系统执行。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">休息</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡相互打斗和（或）互啄而导致</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">Carreo</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">中断。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">错误重量</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡的实际重量高过或低于记录重量的数据超过规则里设定所允许的限度。注释：一旦主角的记录重量有差异，较高的记录重量将被用于两只斗鸡的超出重量的计算。如在记录重量以下，计算将采用两只斗鸡的个别记录重量以鉴定其重量是否低于规则所设定的限度。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">恶劣状态</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡显而易见或可核查的不完整、不自然外貌或状态，并会或很大可能性会提高，恐吓或削弱其对手的生成战斗能力。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">未履行</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛者无法在规定期限内呈交其斗鸡让它绑脚环、称重、绑利刀或互斗。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">替代</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在某种情况下以其他斗鸡代换已匹配的斗鸡。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">代换斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">替代情况下代换的斗鸡。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">点数</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡打斗时所积的分数。赢了得到一</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(1)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">分；平手则得半</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(1/2)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">分；输了得零</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(0)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">分。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">无负担打斗</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">-</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在一场赛事里已编程的战斗，一旦被允许继续，比赛成绩将不会影响赛事结果，包括特别奖。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">四十二</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(42)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">小时</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">十六</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">(16)</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">场打斗条例</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">改期的赛事恢复的时间和打斗次数。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">小丑</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">竞技场管理员提供的斗鸡。在匹配过程中因重量约束而无法配到对手的斗鸡，</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">‘</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">小丑</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">’</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">将与未被匹配的斗鸡打斗。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">倒数</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">时间单位的反向计算，用来计算赛事的时间，以确保遵守十分钟的时限。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">翅膀环</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">–</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">每年四月在公鸡的翅膀绑上的识别标签，以确保斗鸡季节时打斗的斗鸡年龄尽可能一致。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则一（重量限度）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">将在联合会赛事战斗的雄斗鸡</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">/</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">斗鸡，在雄斗鸡赛事里斗鸡重量不能低于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1.7</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤或高于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">2.2</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤；在成熟斗鸡赛事里斗鸡重量不能低于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1.9</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤或高于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">2.450</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤。在中龄斗鸡赛事里，斗鸡重量不能低于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1.8</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤或高于</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">2.3</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公斤。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则二（重量提交）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">参赛的斗鸡重量必须在赛事预定时间前，在本网站指定的地点与时间提交。过后，比赛将马上开始。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则三（拒绝的权利）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">本网站有权利因内部原因不允许任何参赛者参加赛事。特别是三个最低或最高重量的预定赛事（淘汰赛、半决赛、决赛</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">/</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">锦标赛），将无追索权地被断然拒绝参赛。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则四（重量记录）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如果由本网站事先公布，将参赛的斗鸡重量必须由参赛者或参赛者代表进行记录。记录有两个部分：</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">第一部分包含了参赛者号码和名字，在</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">’a’</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">标记的下拉框中；而第二部分包含了参赛者号码和重量，在</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">’b’</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">标记的下拉框中。相同的资料须呈现给赛事委员会的授权人员，以确保里面数据的可读性，否则，重量数据将以比较实际的个人形式提交，通过电话，手机或任何相似的方式。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则五（电脑匹配；无战斗合约；多重参赛）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p>
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">斗鸡赛事的匹配将由电脑完成，并且必须在赛事委员会和有兴趣的参赛者在场的情况下进行。电脑附有程序以进行匹配，从相同重量的斗鸡开始匹配，然后以重量差距最大的一对斗鸡结束。</span>
                                </span>
                            </span>
                            <br />
                            <br />
                            <b>
                                <span lang="ZH-CN" style="font-size:10.5pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">重量的上限和下限规则</span>
                                    </span>
                                </span>
                            </b>
                            <b>
                                <span style="font-size:10.5pt">
                                    <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">:</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">给</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">9</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">公斤或以下的雄斗鸡和中龄斗鸡，所允许的重量上限和下限是</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">20</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">克；</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1.9</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">公斤以上的雄斗鸡和中龄斗鸡，所允许的重量上限和下限是</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">30</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">克。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">给</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">2</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">公斤或以下的成</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">熟斗鸡，所允许的重量上限和下限是</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">30</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">克；</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">2.2</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">公斤以上的成</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">熟斗鸡，所允许的重量上限和下限是</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">50</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">克。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">战斗规则将不允许最多三项合意的参赛</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则六（无双战）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">电脑程序会避免双战赛事。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则七（电脑匹配的例外）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如果没有电脑匹配（当电脑故障、操作者不舒服、或发生停电，或类似的起因），过去广泛采用的匹配系统将被采用。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则八（战斗顺序）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">战斗顺序将严格按照早战，早结束，晚战，晚结束的步骤；如果可行，战斗之间的时间都得大约相近。最初的五场或以上的战斗（依据战斗的数量）将会从最低重量的一对斗鸡开始，按升序；接着同等数量的战斗将从最高重量的一对斗鸡开始，按降序。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则九（可施加罪则）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如有违反上述规定的规则，可施加的是任何下列的罪则或组合</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">:</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛者的雄斗鸡如有错误重量或恶劣状态而违反规则</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">18</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">和</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">19</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">，将被施加相等于最低中央投注或以特定的巴仙率计算的罚款。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">没收参赛费用；</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">其他赛事委员会可施加的罚款，没收和罚金；</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">禁止继续参加预定或改期的赛事，会在分数板</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">表上显示</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">’X’</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">参赛资格将被取消；以及</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">无限期或永久取消参加任何由本网站推广的所有赛事的参赛资格。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十（形状：不佳）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">斗鸡形状不佳的例子和效果如下：</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <ul>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">一瘸一拐</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">犹豫战斗</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ul>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">在瘫痪和犹豫战斗的情况下，参赛者只允许第二次重新上升，参赛者要么改变雄斗鸡</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">/</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">中龄斗鸡</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">/</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">公鸡，要么继续同一只斗鸡。如果他们选择改变，参赛者的罚款</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">2,500</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">（延迟）和斗鸡重量限度规则</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">部分适用。</span>
                                </span>
                            </span>
                            <br />
                            <br />
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如果斗鸡仍然停留在瘫痪，则用替代斗鸡，该斗鸡的重量不得超过对方提出的倾斜或重新上升所采取的实际重量，以较高者为准，也不得超过三十五（</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">35</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">）克。</span>
                                </span>
                            </span>
                            <br />
                            <br />
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">该入场单位的罚款等于最低中心投注的（</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1/2</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">）罚款，并按规则一</span>
                                </span>
                            </span>
                            <br />
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">雄斗鸡</span>
                                </span>
                            </span>&nbsp;
                            <br />
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如果替代斗鸡也跛行或以其他任何形式形状不佳，则其所属的进入将遭受</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">a</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">和</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">d</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">节规定的规则十，并遵守规则一，确定对手的得分。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <ol>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果一个斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">雄斗鸡表现出任何犹豫战斗的迹象，例如头后的羽毛，沮丧的身体羽毛，或在另外一只斗鸡的面前移动，或者在下降之前，如下垂，发抖，受伤或戒烟，其对手或任何其他类似的条件，替代斗鸡的使用重量应等于或小于三分之三（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">35</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）克，而不是比上次或重新倾倒时所采取的对手实际重量的三十五（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">35</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）克更高，战斗重新排列在规则编号规定的限度内规则</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">确定其对手的得分无罚。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">在这两种斗鸡都已经被释放的情况下，一个斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">雄斗鸡在任何实际的联系被指示之前拒绝打架，比赛将被视为</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">“</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">不匹配</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">”</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">比赛。在这种情况下，第</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">11</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">号规则规定了斗争中表现出犹豫的战争持续战斗</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">展示的进入，尽管有机会在规则编号的时期内给予替换。</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">，处罚五千比索，并处以规则编号。</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">10</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">，再给他一个机会放一个替代斗鸡或者雄斗鸡。</span>
                                        </span>
                                        <br />
                                        <br />
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果在取代雄斗鸡</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">/</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">斗鸡的两次机会之后也拒绝打架，入场者将受到规则</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">10</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">应遵守规则编号设定的规则</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">确定对手的得分。</span>
                                        </span>
                                        <br />
                                        <br />
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">为了测试一名斗鸡是否犹豫打架，德比委员会可以指示，公鸡应由其处理人员在最后被扣留并持有，而裁判员或由德比委员会指定的人员则会在距离足够近的距离看到另一只斗鸡引起斗鸡的反应。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果斗鸡的外观已经大大改变（例如，脖子羽毛被切割以模拟秃鹰的肖像，或者羽毛被染成与斗鸡天然的颜色或任何其他类似的改变），错误的进入应受到上文第二款（</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">b</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">）项规定的相同的处罚和后果。形状不好由德比委员会在坑或其他地方决定，视其酌情决定权而定。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="color:black">
                            <span style="line-height:normal">
                                <span style="tab-stops:list .5in">
                                    <span style="font-family:Calibri,sans-serif">
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">如果斗鸡处于任何其他条件或情况下，会有或将会损害其自身的对抗能力或对手的自然能力，则违规行为将受到规则编号的规则十</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">;</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">因此应遵守规则编号规定的规则</span>
                                        </span>
                                        <span style="font-size:10.5pt">
                                            <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">1</span>
                                        </span>
                                        <span lang="ZH-CN" style="font-size:10.5pt">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">确定其对手的得分。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ol>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十一（斗争距离）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">斗鸡斗争不超过十（</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">10</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">）分钟，或击中另一个或当他们同时击中时。当裁判员在允许的期限内对战斗结果作出决定，战斗应视为完成</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">;</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">条件是，以外当倒数正在进行</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">,</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">将继续确定其结果。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十二（裁判权威）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">从战斗开始直到对此作出决定，裁判员对竞技场及其中的诉讼具有充分的控制权力。在行事中，每当他根据事件或情况的要求，他可以要求在场上的人的协助裁判员对竞技场及其中的诉讼具有充分的控制权力。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十三（定时器和待机发电机）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">衡量战斗期的时间装置由联合会的场地所有人</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">/</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">经营者提供，并提供备用发电机。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十四（执行倒数）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">如果在战斗期间的任何一个时期，一个或两个斗鸡停止战斗，裁判员应立即执行卡拉或对抗，应用规则的</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">3</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">比</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">3</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">的</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">3</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">系统。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                        <span style="color:black">规则十五（获奖者声明）</span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:normal">
                        <span style="font-family:Calibri,sans-serif">
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">要宣布获胜者，斗鸡必须采取两（</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">2</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">）个啄（不管是否连接）或一（</span>
                                </span>
                            </span>
                            <span style="font-size:10.5pt">
                                <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">1</span>
                                </span>
                            </span>
                            <span lang="ZH-CN" style="font-size:10.5pt">
                                <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                    <span style="color:black">）个（无论是否连接），但不一定触及对手，而后者既不啄也不打在倒数过程中。</span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">&nbsp;</p>
        </div>
    </div>

    <div v-if="type=='digmaan'" class="info-content">
        <div>
            <p align="center" style="text-align:center; margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:107%">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:16.0pt">
                                    <span style="line-height:107%">
                                        <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                            <span style="color:black">DIGMAAN</span>
                                        </span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <p style="text-align:justify; margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="text-justify:inter-ideograph">
                        <span style="line-height:107%">
                            <span style="font-family:Calibri,sans-serif">
                                <span lang="ZH-CN" style="font-size:12.0pt">
                                    <span style="line-height:107%">
                                        <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                            <span style="color:black">在每个组织中，重要的是我们与客户分享我们的信念。同样，我们的客户也应该知道我们对我们的产品和服务感到自豪，并在我们的系统中建立了与我们的使命和愿景一致的信任。</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>

            <p style="margin-bottom:11px">&nbsp;</p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:107%">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:16.0pt">
                                    <span style="line-height:107%">
                                        <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                            <span style="color:black">我们的愿景</span>
                                        </span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ul>
                <li style="text-align:justify">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">我们致力于提供最高水平的完整性，服务和游戏体验，以满足我们目前和将来的客户。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="text-align:justify">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">全国鸡禽饲养者联合会（</span>
                                            </span>
                                        </span>
                                    </span>
                                    <span style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">National Federation of Gamefowl Breeders，Inc.）是该国最重要的鸡禽饲养者组织（FIGBA），致力于并将这项运动作为一种行业和一种崇高的传统进行推广，在该运动中，斗鸡被视为一种国家消遣和一种消遣。体现诚实，正直和公平竞赛的真正含义的运动。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="text-align:justify; margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">我们致力于通过提供高质量，许可和可靠的</span>
                                            </span>
                                        </span>
                                    </span>
                                    <span style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">Live Feed成为现场Sabong流媒体和广播菲律宾过去对世界充满热情的市场领导者。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ul>

            <p style="margin-bottom:11px">&nbsp;</p>

            <p style="margin-bottom:11px">
                <span style="font-size:11pt">
                    <span style="line-height:107%">
                        <span style="font-family:Calibri,sans-serif">
                            <b>
                                <span lang="ZH-CN" style="font-size:16.0pt">
                                    <span style="line-height:107%">
                                        <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                            <span style="color:black">我们的职责</span>
                                        </span>
                                    </span>
                                </span>
                            </b>
                        </span>
                    </span>
                </span>
            </p>

            <ul>
                <li style="text-align:justify">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">提升游戏禽业作为我们经济的推动者之一。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="text-align:justify">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">促进这项运动成为数百万菲律宾人的生活来源。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
                <li style="text-align:justify; margin-bottom:11px">
                    <span style="font-size:11pt">
                        <span style="text-justify:inter-ideograph">
                            <span style="line-height:107%">
                                <span style="font-family:Calibri,sans-serif">
                                    <span lang="ZH-CN" style="font-size:12.0pt">
                                        <span style="line-height:107%">
                                            <span style="font-family:&quot;Microsoft JhengHei&quot;,&quot;sans-serif&quot;">
                                                <span style="color:black">保护每一位斗鸡爱好者固有的权利和激情，并享受这项运动作为我国传统的一部分。</span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
    setup(props) {

        let route = useRoute()

        let type = computed(() => {
            return route.params.type
        })

        return {
            type
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    font-size: 0px;
    img {
        width: 100%;
    }
}
.title-1 {
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--color);
    margin: 40px 0px 20px;
}

.info-content {
    background: #c8af96;
    width: 1200px;
    margin: 0px auto 30px;
    padding: 20px;
}

.box-1 {
    background: var(--color);
    line-height: 40px;
    > div {
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        &::after,
        &::before {
            content: "";
            width: 100px;
            height: 100px;
            position: absolute;
        }
        &::before {
            top: -50px;
            left: -20px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
        &::after {
            top: -10px;
            right: -30px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
    }
    .title {
        white-space: nowrap;
        flex-shrink: 0;
        color: #fff;
        position: relative;
        z-index: 1;
    }
    marquee {
        background: #fff;
    }
}
</style>