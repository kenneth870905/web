<template>
    <div class="mint-tab-container-item lottery-rule wfgz-rule">
        <div class="rule">
            <p>五星</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        五星直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                    </div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万千百十个位各选1个号码，所选号与开奖号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个五位数号码，所选号与开奖号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>组合</span>
                            <p>从万、千、百、十、个位中各选1个号码组成1-5星组合，共5注。所选号的个位与开奖号个位相同，则中1个5等奖；所选号的十、个位与开奖号十、个位相同，则中1个5等奖和4等奖，以此类推，最高可中5个奖。如所选号个位不中奖，则余号均视为不中奖。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        五星组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i>
                    </div>
                    <div style="display: none;">
                        <div class="content"><span>组选120</span>
                            <p>从0-9中任选5个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选60</span>
                            <p>选1个二重号，3个单号组成一注。不限顺序，开奖号中包含全部所选号，且二重号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选30</span>
                            <p>选2个二重号，1个单号组成一注。不限顺序，开奖号中包含全部所选号，且2个二重号各出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选20</span>
                            <p>选1个三重号，2个单号组成一注。不限顺序，开奖号中包含全部所选号，且三重号出现3次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选10</span>
                            <p>从三重号和二重号中各选1个号码组成一注。不限顺序，开奖号中所选的三重号出现3次，二重号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选5</span>
                            <p>选1个四重号，1个单号组成一注。不限顺序，开奖号中包含全部所选号，且四重号出现4次，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>四星</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        后四直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从千、百、十、个位中各选1个号码，所选号与开奖号后四位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个四位数号码，所选号与开奖号后四位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>组合</span>
                            <p>从千、百、十、个位中各选1个号码组成1-4星组合，共4注。所选号的个位与开奖号个位相同，则中1个4等奖；所选号的十、个位与开奖号十、个位相同，则中1个4等奖和3等奖，以此类推，最高可中4个奖。如所选号个位不中奖，则余号均视为不中奖。
                            </p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        后四组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>组选24</span>
                            <p>从0-9中任选4个号码组成一注。不限顺序，开奖号后四位中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选12</span>
                            <p>选1个二重号，2个单号组成一注。不限顺序，开奖号后四位中包含全部所选号，且二重号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选6</span>
                            <p>选2个二重号组成一注。不限顺序，开奖号后四位中2个二重号各出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选4</span>
                            <p>选1个三重号，1个单号组成一注。不限顺序，开奖号后四位中包含全部所选号，且三重号出现3次，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前四直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千、百、十位中各选1个号码，所选号与开奖号前四位相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个四位数号码，所选号与开奖号前四位相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>组合</span>
                            <p>从万、千、百、十位中各选1个号码组成1-4星组合，共4注。所选号的十位与开奖号十位相同，则中1个4等奖；
                                所选号的百、十位与开奖号百、十位相同，则中1个4等奖和3等奖，以此类推，最高可中4个奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前四组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>组选24</span>
                            <p>从0-9中任选4个号码组成一注。不限顺序，开奖号前四位中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选12</span>
                            <p>选1个二重号，2个单号组成一注。不限顺序，开奖号前四位中包含全部所选号，且二重号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选6</span>
                            <p>选2个二重号组成一注。不限顺序，开奖号前四位中2个二重号各出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选4</span>
                            <p>选1个三重号，1个单号组成一注。不限顺序，开奖号前四位中包含全部所选号，且三重号出现3次，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>三星</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        后三直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从百、十、个位中各选1个号码，所选号与开奖号后三位相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个三位数号码，所选号与开奖号后三位相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选和值</span>
                            <p>从0-27中任选一个号，所选号数值等于开奖号后三位数相加之和，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选跨度</span>
                            <p>从0-9中任选1个号码组成一注。所选号数值等于开奖号后三位的最大最小数字差值，即为中奖。</p>
                        </div>
                        <div class="content"><span>和值尾数</span>
                            <p>对开奖号后三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号后三位号码相加之和的尾数与所选号相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        后三组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>组三</span>
                            <p>从0-9中任选2个号码组成两注。不限顺序，开奖号后三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组六</span>
                            <p>任选3个不同的号码组成一注。开奖号后三位中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>混合组选</span>
                            <p>手动输入一个3位数号码（不含豹子号）组成一注。其中1个所选号在开奖号后三位中出现2次， 则中组三奖；开奖号后三位中包含全部所选号，且无重复号码出现，则中组六奖。</p>
                        </div>
                        <div class="content"><span>组选包胆</span>
                            <p>从0-9中任选1个包胆号码为一注。不限顺序，开奖号后三位中包含所选的包胆号（不含豹子号），即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        中三直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从千、百、十位中各选1个号码，所选号与开奖号中间三位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个三位数号码，所选号与开奖号中间三位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选和值</span>
                            <p>从0-27中任选一个号，所选号数值等于开奖号中间三位数相加之和，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选跨度</span>
                            <p>从0-9中任选1个号码组成一注。所选号数值等于开奖号中间三位的最大最小数字差值，即为中奖。</p>
                        </div>
                        <div class="content"><span>和值尾数</span>
                            <p>对开奖号中间三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号中间三位号码相加之和的尾数与所选号相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        中三组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>组三</span>
                            <p>从0-9中任选2个号码组成两注。不限顺序，开奖号中间三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组六</span>
                            <p>任选3个不同的号码组成一注。开奖号中间三位中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>混合组选</span>
                            <p>手动输入一个3位数号码（不含豹子号），其中1个所选号在开奖号中间三位里出现2次，则中组三奖； 开奖号中间三位中包含全部所选号，且无重复号码出现，则中组六奖。</p>
                        </div>
                        <div class="content"><span>组选包胆</span>
                            <p>从0-9中任选1个包胆号码为一注。不限顺序，开奖号中间三位中包含所选的包胆号（不含豹子号），即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前三直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千、百位中各选1个号码，所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个三位数号码，所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选和值</span>
                            <p>从0-27中任选一个号，所选号数值等于开奖号前三位数相加之和，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选跨度</span>
                            <p>从0-9中任选1个号码组成一注。所选号数值等于开奖号前三位的最大最小数字差值，即为中奖。</p>
                        </div>
                        <div class="content"><span>和值尾数</span>
                            <p>对开奖号前三位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号前三位号码相加之和的尾数与所选号相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前三组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>组三</span>
                            <p>从0-9中任选2个号码组成两注。不限顺序，开奖号前三位中包含全部所选号，且其中一个所选号出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组六</span>
                            <p>任选3个不同的号码组成一注。开奖号前三位中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>混合组选</span>
                            <p>手动输入一个3位数号码（不含豹子号），其中1个所选号在开奖号前三位中出现2次， 则中组三奖；开奖号前三位中包含全部所选号，且无重复号码出现，则中组六奖。</p>
                        </div>
                        <div class="content"><span>组选包胆</span>
                            <p>从0-9中任选1个包胆号码为一注。不限顺序，开奖号前三位中包含所选的包胆号（不含豹子号），即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>二星</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        后二直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从十、个位中各选1个号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个两位数号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选和值</span>
                            <p>从0-18中任选一个号，所选号数值等于开奖号后两位数相加之和，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选跨度</span>
                            <p>从0-9中任选1个号码组成一注。所选号数值等于开奖号后两位的最大最小数字差值，即为中奖。</p>
                        </div>
                        <div class="content"><span>和值尾数</span>
                            <p>对开奖号后两位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号后两位号码相加之和的尾数与所选号相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        后二组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从0-9中任选2个号码，不限顺序，开奖号后两位数中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个两位数号码，不限顺序，开奖号后两位数中包含所选号即为中奖。</p>
                        </div>
                        <div class="content"><span>组选包胆</span>
                            <p>从0-9中任选1个包胆号码为一注。不限顺序，开奖号后两位中包含所选的包胆号（不含对子号），即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前二直选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千位中各选1个号码，所选号与开奖号前二位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个两位数号码，所选号与开奖号前二位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选和值</span>
                            <p>从0-18中任选1个号码，所选号数值等于开奖号前两位数相加之和，即为中奖。</p>
                        </div>
                        <div class="content"><span>直选跨度</span>
                            <p>从0-9中任选1个号码组成一注。所选号数值等于开奖号前两位的最大最小数字差值，即为中奖。</p>
                        </div>
                        <div class="content"><span>和值尾数</span>
                            <p>对开奖号前两位号码相加之和的尾数进行投注，从0-9中任选1个号码为一注。开奖号前两位号码相加之和的尾数与所选号相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        前二组选
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从0-9中任选2个号码，不限顺序，开奖号前两位数中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1个两位数号码，不限顺序，开奖号前两位数中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选包胆</span>
                            <p>从0-9中任选1个包胆号码为一注。不限顺序，开奖号前两位中包含所选的包胆号（不含对子号），即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>不定位</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        三星不定位
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>后三一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号后三位号码中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>中三一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号中间三位号码中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>前三一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号前三位号码中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>后三二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号后三位号码中包含所选的2个号码，即为中奖。</p>
                        </div>
                        <div class="content"><span>中三二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号中间三位号码中包含所选的2个号码，即为中奖。</p>
                        </div>
                        <div class="content"><span>前三二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号前三位号码中包含所选的2个号码，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        四星不定位
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>前四一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号前四位中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>后四一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号后四位中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>前四二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号前四位中包含所选的二码，即为中奖。</p>
                        </div>
                        <div class="content"><span>后四二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号后四位中包含所选的二码，即为中奖。</p>
                        </div>
                        <div class="content"><span>前四三码</span>
                            <p>从0-9中任选3个号码为一注。不限顺序，开奖号前四位中包含所选的三码，即为中奖。</p>
                        </div>
                        <div class="content"><span>后四三码</span>
                            <p>从0-9中任选3个号码为一注。不限顺序，开奖号后四位中包含所选的三码，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        五星不定位
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>五星一码</span>
                            <p>从0-9中任选1个号码为一注。不限顺序，开奖号中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>五星二码</span>
                            <p>从0-9中任选2个号码为一注。不限顺序，开奖号中包含所选的二码，即为中奖。</p>
                        </div>
                        <div class="content"><span>五星三码</span>
                            <p>从0-9中任选3个号码为一注。不限顺序，开奖号中包含所选的三码，即为中奖。</p>
                        </div>
                        <div class="content"><span>五星四码</span>
                            <p>从0-9中任选4个号码为一注。不限顺序，开奖号中包含所选的四码，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>任选</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        任二
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千、百、十、个位中的任意两个位置上各选1个号码，所选2个位置上的开奖号与全部所选号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动勾选任意两个位置，并输入1个两位数号码，所选2个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>组选</span>
                            <p>从万、千、百、十、个位中的任意两个位置上各选1个号码，不限顺序，所选2个位置上的开奖号中包含全部所选号，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        任三
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千、百、十、个位中的任意三个位置上各选1个号码，所选3个位置上的开奖号与所选号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动勾选任意三个位置，并输入1个三位数号码，所选3个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>组三</span>
                            <p>手动勾选任意三个位置，并从0-9中任选2个号码为两注。不限顺序，所选3个位置上的开奖号中包含全部所选号，且其中一个号码出现两次，即为中奖。</p>
                        </div>
                        <div class="content"><span>组六</span>
                            <p>手动勾选任意三个位置，并从0-9中任选3个不同的号码为一注。不限顺序，所选3个位置上的开奖号中包含全部所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>混合组选</span>
                            <p>勾选任意三个位置，并手动输入1个三位数号码（不含豹子号）为一注。不限顺序，所选3个位置上的开奖号中包含全部输入号，且其中一个号码出现2次，则中组三奖；不限顺序，所选3个位置上的开奖号与全部输入号相同，则中组六奖。
                            </p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        任四
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>复式</span>
                            <p>从万、千、百、十、个位中任意4个位置上各选1个号码，所选4个位置上的开奖号与全部所选号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <div class="content"><span>单式</span>
                            <p>手动输入1位四位数号码，并勾选4个位置，所选4个位置上的开奖号与全部输入号相同，且顺序一致，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>趣味</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        特殊
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>一帆风顺</span>
                            <p>从0-9中任选1个号码，不限顺序，开奖号中包含所选号，即为中奖。</p>
                        </div>
                        <div class="content"><span>好事成双</span>
                            <p>从0-9中任选1个二重号，所选号在开奖号中出现2次，即为中奖。</p>
                        </div>
                        <div class="content"><span>三星报喜</span>
                            <p>从0-9中任选1个三重号，所选号在开奖号中出现3次，即为中奖。</p>
                        </div>
                        <div class="content"><span>四季发财</span>
                            <p>从0-9中任选1个四重号，所选号在开奖号中出现4次，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        龙虎
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>万千</span>
                            <p>根据万位和千位的数字比大小，万位号码大于千位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>万百</span>
                            <p>根据万位和百位的数字比大小，万位号码大于百位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>万十</span>
                            <p>根据万位和十位的数字比大小，万位号码大于十位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>万个</span>
                            <p>根据万位和个位的数字比大小，万位号码大于个位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>千百</span>
                            <p>根据千位和百位的数字比大小，千位号码大于百位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>千十</span>
                            <p>根据千位和十位的数字比大小，千位号码大于十位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>千个</span>
                            <p>根据千位和个位的数字比大小，千位号码大于个位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>百十</span>
                            <p>根据百位和十位的数字比大小，百位号码大于十位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>百个</span>
                            <p>根据百位和个位的数字比大小，百位号码大于个位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <div class="content"><span>十个</span>
                            <p>根据十位和个位的数字比大小，十位号码大于个位号码则为龙，小于则为虎，相同则为和。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>大小单双</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        总和
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>总和</span>
                            <p>对5个开奖号相加之和的大（23～45）、小（0~22）、单（总和值为单）、双（总和值为双）进行投注，任选1个形态为一注。所选形态与开奖号5个号码相加之和相同，即为中奖。
                            </p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        定位
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>万位</span>
                            <p>对开奖号的万位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的万位号码形态相同，即为中奖。</p>
                        </div>
                        <div class="content"><span>千位</span>
                            <p>对开奖号的千位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的千位号码形态相同，即为中奖。</p>
                        </div>
                        <div class="content"><span>百位</span>
                            <p>对开奖号的百位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的百位号码形态相同，即为中奖。</p>
                        </div>
                        <div class="content"><span>十位</span>
                            <p>对开奖号的十位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的十位号码形态相同，即为中奖。</p>
                        </div>
                        <div class="content"><span>个位</span>
                            <p>对开奖号的个位进行大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选形态与开奖号的个位号码形态相同，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        串关
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>串关</span>
                            <p>对5个开奖号的大（5~9）、小（0~4）、单、双进行投注，任选1个形态为一注。所选位置及形态与开奖号的位置及形态相同，即为中奖。注：如当次所选的位置及形态有多个，则须与开奖号位置及形态全部相同，只中任意一个位置或形态均不算中奖。
                            </p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>特殊号</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        特殊号
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>前三</span>
                            <p>对开奖号前三位的号码形态进行投注，任选1个形态组成一注。不限顺序，开奖号前三位的号码形态与所选形态相同，即为中奖。
                                中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）
                            </p>
                        </div>
                        <div class="content"><span>中三</span>
                            <p>对开奖号中间三位号码的形态进行投注，任选1个形态组成一注。不限顺序，开奖号中间三位的号码形态与所选形态相同，即为中奖。
                                中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）
                            </p>
                        </div>
                        <div class="content"><span>后三</span>
                            <p>对开奖号后三位号码的形态进行投注，任选1个形态组成一注。不限顺序，开奖号后三位的号码形态与所选形态相同，即为中奖。
                                中奖顺序：豹子（3个号码相同）&gt;顺子（3个号码相连）&gt;对子（3个号码中任意2个号码相同）&gt;半顺（3个号码中任意2个号码相连）&gt;杂六（不含豹子、顺子、对子、半顺的号码，即3个号码之间无关联性）
                            </p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <p>定位胆</p>
            <div class="box">
                <!---->
                <div class="item">
                    <div class="title">
                        定位胆
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                    <div style="display: none;">
                        <div class="content"><span>定位胆</span>
                            <p>从十、个位中各选1个号码，所选号与开奖号后二位号码相同，且顺序一致，即为中奖。</p>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        <div id="a"></div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            
        }
    },
    mounted() {
        $('.title').click(function(){
            $(this).next().slideToggle(300);
        })
    },
}
</script>

<style lang="scss" scoped>
.wfgz-rule{
    padding-bottom: 40px;
}
.rule{
    >p{
        background: #f5f5f9;
        padding: 5px 10px;
        margin: 0px;
    }
    .title{
        padding: 0px 10px 0px 35px;
        border-bottom: 1px solid #e4e4e4;
        line-height: 36px;
        font-size: 14px;
        i{
            float: right;
            color: #929292;
            font-size: 14px;
        }
    }
}
.content{
    padding: 0px 15px;
}
</style>
