<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>
        <div class="wanfa_content">
            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p>2、时时彩采用计算机网络系统发行销售，定期开奖。</p>
            <p>3、时时彩实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、{{name}} 时时彩由中国福利彩票发行管理中心在所辖区域内发行，并由福利彩票发行中心承销。</p>
            </div>

            <h1>三、购彩方式</h1>
            <p>1、用户可通过本站投注，对选定的号码进行投注，或返点投注，返点越高投注赔率则越低。</p>
            <p>2、用户可选择机选号码投注和自选号码投注。机选号码投注：指对投注随机产生号码进行投注；
                自选号码投注：指对用户所选的号码进行投注。</p>
            <p>3、追号：指将一注或一组号码进行两期或两期以上的投注，分为连续追号和间隔追号。
                连续追号：追号的期数是连续的；间隔追号：指追号的期数不连续。</p>

            <h1>四、开奖及返奖</h1>
            <p>1、开奖：</p>
            <table class="kaijiang">
                <thead>
                    <tr class="黄色背景">
                        <td>彩种名称</td>
                        <td>开奖时间</td>
                        <td>开奖期数</td>
                        <td>开奖频率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="3">{{name}}时时彩</td>
                        <td>10:00~22:00</td>
                        <td>0024~0096，共73期</td>
                        <td>10分钟</td>
                    </tr>
                    <tr>

                        <td>22:00~00:00</td>
                        <td>0097~0120，共24期</td>
                        <td>5分钟</td>
                    </tr>
                    <tr>

                        <td>00:00~02:00</td>
                        <td>0001~0023，共23期</td>
                        <td>5分钟</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p>1、时时彩投注区分为万位、千位、百位、十位和个位，各位号码范围为0～9。每期从各位上开出1个号码作为中奖号码，即开奖号码为5位数。
                时时彩玩法即是竞猜5位开奖号码的全部号码、部分号码或部分号码特征。</p>
            <p>2、时时彩中“复式”和“单式”的玩法规则相同，区别于单式需手动勾选位置、输入号码。</p>
            <p>3、时时彩分星彩玩法和大小单双玩法。星彩玩法包括五星、三星、二星和一星。</p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png"> 直选：将投注号码以唯一的排列方式进行投注。</p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                组选：将投注号码的所有排列方式作为一注投注号码进行投注。示例：123，排列方式有123、132、213、231、312、321，共计6种。</p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                组选三：在三星组选中，如果一注组选号码的3个数字有两个数字相同，则有3种不同的排列方式，
                因而就有3个中奖机会，这种组选投注方式简称组选三。 示例：112，排列方式有112、121、211。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                组选六：在三星组选中，如果一注组选号码的3个数字各不相同，则有6种不同的排列方式，因而就有6个中奖机会，这种组选投注方式简称组选六。
                示例：123，排列方式有123、132、213、231、312、321，共计6种。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                大小单双：号码0～9中，0～4为小，5～9为大，1、3、5、7、9为单，0、2、4、6、8为双。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                龙虎：根据指定位置上的号码数值比大小，首选号大于后选号为龙，小则为虎。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                跨度：对指定位置上的号码的最大最小数字差值进行投注。
            </p>
            <p>4、具体玩法说明如下：</p>

            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="五星" name="1">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3" class="wanfa_first">直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万千百十个位各选1个号码，所选号与开奖号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个五位数号码，所选号与开奖号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组合</td>
                                <td>从万、千、百、十、个位中各选1个号码组成1-5星组合，共5注。所选号的个位与开奖号个位相同，则中1个5等奖；所选号的十、个位与开奖号十、个位相同，则中1个5等奖和4等奖，以此类推，最高可中5个奖。如所选号个位不中奖，则余号均视为不中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="6" class="wanfa_first">组选</td>
                                <td class="wanfa_first">组选120</td>
                                <td>从0-9中任选5个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选60</td>
                                <td>选1个二重号，3个单号组成一注。不限顺序，开奖号中包含全部所选号，且二重号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选30</td>
                                <td>选2个二重号，1个单号组成一注。不限顺序，开奖号中包含全部所选号，且2个二重号各出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选20</td>
                                <td>选1个三重号，2个单号组成一注。不限顺序，开奖号中包含全部所选号，且三重号出现3次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选10</td>
                                <td>从三重号和二重号中各选1个号码组成一注。不限顺序，开奖号中所选的三重号出现3次，二重号出现2次，即为中奖。</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first">组选5</td>
                                <td>选1个四重号，1个单号组成一注。不限顺序，开奖号中包含全部所选号，且四重号出现4次，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item title="四星" name="2">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3" class="wanfa_first">后四-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从千、百、十、个位中各选1个号码，所选号与开奖号后四位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个四位数号码，所选号与开奖号后四位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组合</td>
                                <td>从千、百、十、个位中各选1个号码组成1-4星组合，共4注。所选号的个位与开奖号个位相同，则中1个4等奖；所选号的十、个位与开奖号十、个位相同，则中1个4等奖和3等奖，以此类推，最高可中4个奖。如所选号个位不中奖，则余号均视为不中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">后四-组选</td>
                                <td class="wanfa_first">组选24</td>
                                <td>从0-9中任选4个号码组成一注。不限顺序，开奖号后四位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选12</td>
                                <td>选1个二重号，2个单号组成一注。不限顺序，开奖号后四位中包含全部所选号，且二重号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选6</td>
                                <td>选2个二重号组成一注。不限顺序，开奖号后四位中2个二重号各出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选4</td>
                                <td>选1个三重号，1个单号组成一注。不限顺序，开奖号后四位中包含全部所选号，且三重号出现3次，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="3" class="wanfa_first">前四-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千、百、十位中各选1个号码，所选号与开奖号前四位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个四位数号码，所选号与开奖号前四位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组合</td>
                                <td>从万、千、百、十位中各选1个号码组成1-4星组合，共4注。所选号的十位与开奖号十位相同，则中1个4等奖；所选号的百、十位与开奖号百、十位相同，则中1个4等奖和3等奖，以此类推，最高可中4个奖。如所选号十位不中奖，则余号均视为不中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">前四-组选</td>
                                <td class="wanfa_first">组选24</td>
                                <td>从0-9中任选4个号码组成一注。不限顺序，开奖号前四位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选12</td>
                                <td>选1个二重号，2个单号组成一注。不限顺序，开奖号前四位中包含全部所选号，且二重号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选6</td>
                                <td>选2个二重号组成一注。不限顺序，开奖号前四位中2个二重号各出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选4</td>
                                <td>选1个三重号，1个单号组成一注。不限顺序，开奖号前四位中包含全部所选号，且三重号出现3次，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item title="三星" name="3">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="5" class="wanfa_first">后三-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从百、十、个位中各选1个号码，所选号与开奖号后三位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个三位数号码，所选号与开奖号后三位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选和值</td>
                                <td>从0-27中任选一个号，所选号数值等于开奖号后三位数相加之和，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选跨度</td>
                                <td>从0-9中任选1个号码组成一注。所选号数值等于开奖号后三位的最大最小数字差值，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值尾数</td>
                                <td>对开奖号后三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号后三位号码相加之和的尾数与所选号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">后三-组选</td>
                                <td class="wanfa_first">组三</td>
                                <td>从0-9中任选2个号码组成两注。不限顺序，开奖号后三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组六</td>
                                <td>任选3个不同的号码组成一注。开奖号后三位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">混合组选</td>
                                <td>手动输入一个3位数号码（不含豹子号）组成一注。其中1个所选号在开奖号后三位中出现2次， 则中组三奖；开奖号后三位中包含全部所选号，且无重复号码出现，则中组六奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选包胆</td>
                                <td>从0-9中任选1个包胆号码为一注。不限顺序，开奖号后三位中包含所选的包胆号（不含豹子号），即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="5" class="wanfa_first">中三-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从千、百、十位中各选1个号码，所选号与开奖号中间三位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个三位数号码，所选号与开奖号中间三位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选和值</td>
                                <td>从0-27中任选一个号，所选号数值等于开奖号中间三位数相加之和，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选跨度</td>
                                <td>从0-9中任选1个号码组成一注。所选号数值等于开奖号中间三位的最大最小数字差值，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值尾数</td>
                                <td>对开奖号中间三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号中间三位号码相加之和的尾数与所选号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">中三-组选</td>
                                <td class="wanfa_first">组三</td>
                                <td>从0-9中任选2个号码组成两注。不限顺序，开奖号中间三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组六</td>
                                <td>任选3个不同的号码组成一注。开奖号中间三位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">混合组选</td>
                                <td>手动输入一个3位数号码（不含豹子号），其中1个所选号在开奖号中间三位里出现2次，则中组三奖； 开奖号中间三位中包含全部所选号，且无重复号码出现，则中组六奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选包胆</td>
                                <td>从0-9中任选1个包胆号码为一注。不限顺序，开奖号中间三位中包含所选的包胆号（不含豹子号），即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="5" class="wanfa_first">前三-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千、百位中各选1个号码，所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个三位数号码，所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选和值</td>
                                <td>从0-27中任选一个号，所选号数值等于开奖号前三位数相加之和，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选跨度</td>
                                <td>从0-9中任选1个号码组成一注。所选号数值等于开奖号前三位的最大最小数字差值，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值尾数</td>
                                <td>对开奖号前三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号前三位号码相加之和的尾数与所选号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">前三-组选</td>
                                <td class="wanfa_first">组三</td>
                                <td>从0-9中任选2个号码组成两注。不限顺序，开奖号前三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组六</td>
                                <td>任选3个不同的号码组成一注。开奖号前三位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">混合组选</td>
                                <td>手动输入一个3位数号码（不含豹子号），其中1个所选号在开奖号前三位中出现2次， 则中组三奖；开奖号前三位中包含全部所选号，且无重复号码出现，则中组六奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选包胆</td>
                                <td>从0-9中任选1个包胆号码为一注。不限顺序，开奖号前三位中包含所选的包胆号（不含豹子号），即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item title="二星" name="4">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="5" class="wanfa_first">后二-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从十、个位中各选1个号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选和值</td>
                                <td>从0-18中任选一个号，所选号数值等于开奖号后两位数相加之和，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选跨度</td>
                                <td>从0-9中任选1个号码组成一注。所选号数值等于开奖号后两位的最大最小数字差值，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值尾数</td>
                                <td>对开奖号后两位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号后两位号码相加之和的尾数与所选号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="3" class="wanfa_first">后二-组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从0-9中任选2个号码，不限顺序，开奖号后两位数中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码，不限顺序，开奖号后两位数中包含所选号即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选包胆</td>
                                <td>从0-9中任选1个包胆号码为一注。不限顺序，开奖号后两位中包含所选的包胆号（不含对子号），即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="5" class="wanfa_first">前二-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千位中各选1个号码，所选号与开奖号前二位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码，所选号与开奖号前二位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选和值</td>
                                <td>从0-18中任选1个号码，所选号数值等于开奖号前两位数相加之和，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">直选跨度</td>
                                <td>从0-9中任选1个号码组成一注。所选号数值等于开奖号前两位的最大最小数字差值，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值尾数</td>
                                <td>对开奖号前两位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号前两位号码相加之和的尾数与所选号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="3" class="wanfa_first">前二-组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从0-9中任选2个号码，不限顺序，开奖号前两位数中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码，不限顺序，开奖号前两位数中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选包胆</td>
                                <td>从0-9中任选1个包胆号码为一注。不限顺序，开奖号前两位中包含所选的包胆号（不含对子号），即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item title="定位胆" name="5">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">定位胆</td>
                                <td>从十、个位中各选1个号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="6" title="不定胆">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="6" class="wanfa_first">三星不定位</td>
                                <td class="wanfa_first">后三一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号后三位号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">中三一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号中间三位号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">前三一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号前三位号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">后三二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号后三位号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">中三二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号中间三位号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">前三二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号前三位号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="6" class="wanfa_first">四星不定位</td>
                                <td class="wanfa_first">前四一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号前四位号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">后四一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号后四位号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">前四二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号前四位号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">后四二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号后四位号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">前四三码</td>
                                <td>从0-9中任选3个号码为一注。不限顺序，开奖号前四位号码中包含所选的3个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">后四三码</td>
                                <td>从0-9中任选3个号码为一注。不限顺序，开奖号后四位号码中包含所选的3个号码，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="4" class="wanfa_first">五星不定位</td>
                                <td class="wanfa_first">五星一码</td>
                                <td>从0-9中任选1个号码为一注。不限顺序，开奖号5个号码中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">五星二码</td>
                                <td>从0-9中任选2个号码为一注。不限顺序，开奖号5个号码中包含所选的2个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">五星三码</td>
                                <td>从0-9中任选3个号码为一注。不限顺序，开奖号5个号码中包含所选的3个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">五星四码</td>
                                <td>从0-9中任选4个号码为一注。不限顺序，开奖号5个号码中包含所选的4个号码，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="7" title="任选">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3" class="wanfa_first">任二</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千、百、十、个位中的任意两个位置上各选1个号码，所选2个位置上的开奖号与全部所选号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动勾选任意两个位置，并输入1个两位数号码，所选2个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组选</td>
                                <td>从万、千、百、十、个位中的任意两个位置上各选1个号码，不限顺序，所选2个位置上的开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="5" class="wanfa_first">任三</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千、百、十、个位中的任意三个位置上各选1个号码，所选3个位置上的开奖号与所选号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动勾选任意三个位置，并输入1个三位数号码，所选3个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组三</td>
                                <td>手动勾选任意三个位置，并从0-9中任选2个号码为两注。不限顺序，所选3个位置上的开奖号中包含全部所选号，且其中一个号码出现两次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组六</td>
                                <td>手动勾选任意三个位置，并从0-9中任选3个不同的号码为一注。不限顺序，所选3个位置上的开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">混合组选</td>
                                <td>勾选任意三个位置，并手动输入1个三位数号码（不含豹子号）为一注。不限顺序，所选3个位置上的开奖号中包含全部输入号，且其中一个号码出现2次，则中组三奖；不限顺序，所选3个位置上的开奖号与全部输入号相同，则中组六奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="2" class="wanfa_first">任四</td>
                                <td class="wanfa_first">复式</td>
                                <td>从万、千、百、十、个位中任意4个位置上各选1个号码，所选4个位置上的开奖号与全部所选号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1位四位数号码，并勾选4个位置，所选4个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="8" title="趣味">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">一帆风顺</td>
                                <td>从0-9中任选1个号码，不限顺序，开奖号中包含所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">好事成双</td>
                                <td>从0-9中任选1个二重号，所选号在开奖号中出现2次，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">三星报喜</td>
                                <td>从0-9中任选1个三重号，所选号在开奖号中出现3次，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">四季发财</td>
                                <td>从0-9中任选1个四重号，所选号在开奖号中出现4次，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="9" title="龙虎">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">万千</td>
                                <td>根据万位和千位的数字比大小，万位号码大于千位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">万百</td>
                                <td>根据万位和百位的数字比大小，万位号码大于百位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">万十</td>
                                <td>根据万位和十位的数字比大小，万位号码大于十位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">万个</td>
                                <td>根据万位和个位的数字比大小，万位号码大于个位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">千百</td>
                                <td>根据千位和百位的数字比大小，千位号码大于百位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">千十</td>
                                <td>根据千位和十位的数字比大小，千位号码大于十位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">千个</td>
                                <td>根据千位和个位的数字比大小，千位号码大于个位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">百十</td>
                                <td>根据百位和十位的数字比大小，百位号码大于十位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">百个</td>
                                <td>根据百位和个位的数字比大小，百位号码大于个位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">十个</td>
                                <td>根据十位和个位的数字比大小，十位号码大于个位号码则为龙，小于则为虎，相同则为和。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="10" title="大小单双">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">总和</td>
                                <td>对5个开奖号相加之和的大（23～45）、小（0~22）、单（总和值为单）、双（总和值为双）进行投注，任选1个形态为一注。所选形态与开奖号5个号码相加之和相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">定位-万位</td>
                                <td>对开奖号的万位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的万位号码形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">定位-千位</td>
                                <td>对开奖号的千位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的千位号码形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">定位-百位</td>
                                <td>对开奖号的百位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的百位号码形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">定位-十位</td>
                                <td>对开奖号的十位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的十位号码形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">定位-个位</td>
                                <td>对开奖号的个位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的个位号码形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">串关</td>
                                <td>对5个开奖号的大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选位置及形态与开奖号的位置及形态相同，即为中奖。注：如当次所选的位置及形态有多个，则须与开奖号位置及形态全部相同，只中任意一个位置或形态均不算中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="11" title="特殊号">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">前三</td>
                                <td>对开奖号前三位的号码形态进行投注，任选1个形态组成一注。不限顺序，开奖号前三位的号码形态与所选形态相同，即为中奖。中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">中三</td>
                                <td>对开奖号中间三位号码的形态进行投注，任选1个形态组成一注。不限顺序，开奖号中间三位的号码形态与所选形态相同，即为中奖。中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">后三</td>
                                <td>对开奖号后三位号码的形态进行投注，任选1个形态组成一注。不限顺序，开奖号后三位的号码形态与所选形态相同，即为中奖。中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse>
                    <el-collapse-item name="12" title="斗牛">
                        <table>
                            <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                            </thead>
                            <tbody>
                                <tr><td class="wanfa_first ">斗牛</td><td>开奖号码中任意三位的和值为10的倍数（注：0看做10），为有牛，否则为无牛。若为有牛，剩余两位的和值的尾数是0，为牛牛；剩余两位的和值的尾数是X（X表示1~9），为牛X。从牛牛、无牛、牛一～牛九选择1个组成1注，所选投注组合与开奖号码的型态一致，为中奖。</td></tr>
                            </tbody>
                        </table>
                    </el-collapse-item>
                </el-collapse>

            </el-collapse>

        </div>
    </div>
</template>

<script>
export default {
  name: '',
  props: {
    name: {
      default: ''
    },
    type: {
      default: ''
    }
  },
  data () {
    return {
      activeNames: ''
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.header_1 {
    line-height: 60px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 200;
    color: #e21;
    border-bottom: 1px solid #cccccc;
}

.黄色背景{
    background: #fc9;
}
.wanfa_first{
    width: 70px;
    text-align: center;
}

.wanfa_content{
    padding: 30px 30px 50px 30px;
    p{
        line-height: 32px;
        font-size: 14px;
        color: #666;
    }
    img{
        width: 26px;
    }
    table{
        border: 1px solid #cccccc;
        border-spacing: 0;
    }
    tr:nth-child(1){
        td{
            border-top: 1px solid #cccccc;
        }
    }
    tr{
        td{
            padding: 3px 20px;
            border-left: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }

    /deep/ .el-collapse-item__header{
        background: none;
        font-weight: bold;
        font-size: 22px;
    }
}
</style>
