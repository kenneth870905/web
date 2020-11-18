<template>
    <div>
          <div class="header_1">
          <div class="box_img"><img :src="dataconfig.api_urlData+img" alt=""></div> <div>{{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}</div>  

        </div>
        <div class="wanfa_content">
            <h4>一、总则</h4>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、香港六合彩实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>3、不得向未成年人出售彩票或兑付奖金。</p>
            <h4>二、类型及承销</h4>
            <div class="type">
                <p>1、{{name}}是从1至49个号码中选出六个为中奖号码的奖券，由本站管理中心负责承销。</p>
            </div>

            <h4>三、购彩方式</h4>
            <p>1、用户可通过本站投注，对选定的号码进行投注，或返点投注，返点越高投注赔率则越低。</p>
            <p>2、用户可选择机选号码投注和自选号码投注。机选号码投注：指对投注随机产生号码进行投注；
                自选号码投注：指对用户所选的号码进行投注。</p>
            <p>3、追号：指将一注或一组号码进行两期或两期以上的投注，分为连续追号和间隔追号。
                连续追号：追号的期数是连续的；间隔追号：指追号的期数不连续。</p>

            <h4>四、开奖及返奖</h4>

            <p>1、开奖：</p>
            <table class="kaijiang">
                <thead>
                    <tr>
                        <td>彩种名称</td>
                        <td>开奖时间</td>
                        <td class="qishu" v-if="id==70000">开奖期数</td>
                        <td>开奖频率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 开奖配置.起始时间" :key="index">
                        <td :rowspan="开奖配置.起始时间.length" v-if="index==0">{{name}}</td>
                        <td>{{item}}</td>
                        <td v-if="id==70000">{{开奖配置.期数[index]}}</td>
                        <td>{{开奖配置.间隔}}</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h4>五、玩法说明</h4>
            <p>
                1、每期从01-49中随机开出7个号码，首6个号码为：正码，第7个号码为：特码。
            </p>
            <p>2、具体规则说明如下：</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                特码大小单双
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• 特大：开出的特码在25~48范围内。</p>
            <p style="text-indent:20px;">• 特小：开出的特码在01~24范围内。</p>
            <p style="text-indent:20px;">• 特双：特码为双数，如18、20、34、42。</p>
            <p style="text-indent:20px;">• 特单：特码为单数，如01、11、35、47。</p>
            <p style="text-indent:20px;">• 和局：当期开出的特码为49时，视为和局，自动返还投注本金。</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                特码和数大小单双
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• 合大：指特码的个位加上十位之和大于等于7，如07、09、43、36。</p>
            <p style="text-indent:20px;">• 合小：指特码的个位与十位相加之和小于等于6，如30、14、22。</p>
            <p style="text-indent:20px;">• 合双：指特码的个位加上十位之和为“双数”，如02、11、33、44。</p>
            <p style="text-indent:20px;">• 合单：指特码的个位加上十位之和为“单数”，如01、14、36、47。</p>
            <p style="text-indent:20px;">• 合局：当期开出的特码为49时，视为和局，自动返还投注本金。</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                特码尾数大小
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• 特尾大：5尾~9尾为大，如05、18、19。</p>
            <p style="text-indent:20px;">• 特尾小：0尾~4尾为小，如01、32、44。</p>
            <p style="text-indent:20px;">• 和局：当期开出的特码为49时，视为和局，自动返还投注本金。</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                总和大小单双
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• 总和大：当期开奖号码的7个号码相加之和大于或等于175。</p>
            <p style="text-indent:20px;">• 总和小：当期开奖号码的7个号码相加之和小于或等于174。</p>
            <p style="text-indent:20px;">• 总和单：当期开奖号码的7个号码相加之和为奇数。</p>
            <p style="text-indent:20px;">• 总和双：当期开奖号码的7个号码相加之和为偶数。</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                生肖，顺序为 鼠 &gt;牛 &gt;虎 &gt;兔 &gt;龙 &gt;蛇 &gt;马 &gt;羊 &gt;猴 &gt;鸡 &gt;狗 &gt;猪 ，如今年是狗年，则以狗开始，依顺序将49个号码分为12个生肖，具体如下：
            </p>
            <p></p>
            <p style="text-indent:20px;" v-for="(item, index) in markSixNums.sx" :key="index">• {{item.name}}:{{item.list.join('、')}}</p>
            <p>注：生肖中49亦算输赢，不为和。</p>
            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                色波，指49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下：
            </p>
            <p></p>
            <p style="text-indent:20px;" v-for="(item, index) in markSixNums.colors" :key="index">• {{item.name}}：{{item.list.join('、')}}</p> 

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                特码头数：
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• "0"头：01、02、03、04、05、06、07、08、09</p>

            <p style="text-indent:20px;">• "1"头：10、11、12、13、14、15、16、17、18、19</p>

            <p style="text-indent:20px;">• "2"头：20、21、22、23、24、25、26、27、28、29</p>

            <p style="text-indent:20px;">• "3"头：30、31、32、33、34、35、36、37、38、39</p>

            <p style="text-indent:20px;">• "4"头：40、41、42、43、44、45、46、47、48、49</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                特码尾数：
            </p>
            <p>

            </p>
            <p style="text-indent:20px;">• "0"尾：10、20、30、40</p>

            <p style="text-indent:20px;">• "1"尾：01、11、21、31、41</p>

            <p style="text-indent:20px;">• "2"尾：02、12、22、32、42</p>

            <p style="text-indent:20px;">• "3"尾：03、13、23、33、43</p>

            <p style="text-indent:20px;">• "4"尾：04、14、24、34、44</p>

            <p style="text-indent:20px;">• "5"尾：05、15、25、35、45</p>

            <p style="text-indent:20px;">• "6"尾：06、16、26、36、46</p>

            <p style="text-indent:20px;">• "7"尾：07、17、27、37、47</p>

            <p style="text-indent:20px;">• "8"尾：08、18、28、38、48</p>

            <p style="text-indent:20px;">• "9"尾：09、19、29、39、49</p>

            <p>
                <img class="u17" src="image/playRule/gz_arrow.png">
                五行：
            </p>
            <p></p>
            <p style="text-indent:20px;" v-for="(item, index) in 五行" :key="index">• {{item.name}}：{{item.list.join('、')}}</p>
            <p>3、具体玩法说明如下：</p>

            <el-collapse>
                <el-collapse-item name="1" title="两面">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">两面</td>
                                <td>指大小单双。对特码的总和及形态或正码1-6的和数及双形态进行投注。所选号与开奖号的位置、形态相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="2" title="特码">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">特码</td>
                                <td>当期开出的第七个号码为特码，从01-49中任选1个号码组成一注。所选号码与开奖特码相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>
                
                <el-collapse-item name="3" title="正码">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">正码</td>
                                <td>从01-49中任选1个号码组成一注。不限顺序，开奖的正码中包含投注号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="4" title="正码特">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">正码特</td>
                                <td>指正1特至正6特，任选1个号码组成一注。投注号与开奖的正码号码及位置相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="5" title="正码1-6">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">正码1-6</td>
                                <td>任选1个形态组成一注。投注号与开奖号的正码位置、形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>注释</td>
                                <td style="padding: 0;">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>大小</td>
                                                <td>指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49为和。</td>
                                            </tr>
                                            <tr>
                                                <td>单双</td>
                                                <td>以指定出现正码的位置与号码为单数或双数下注，开出49为和。</td>
                                            </tr>
                                            <tr>
                                                <td>合数大小</td>
                                                <td>以指定出现正码的位置与号码个位和十位的数字和值来判断大小，和数大于或等于7为大，小于或等于6为小。</td>
                                            </tr>
                                            <tr>
                                                <td>合数单双</td>
                                                <td>以指定出现正码的位置与号码个位和十位数字和值来判断单双。</td>
                                            </tr>
                                            <tr>
                                                <td>色波</td>
                                                <td>以指定出现正码的位置的球色下注，开奖的球色与下注的颜色相同，即为中奖。</td>
                                            </tr>
                                            <tr>
                                                <td>尾数大小</td>
                                                <td>以指定出现正码的位置与号码尾数大小下注，0尾~4尾为小、5尾~9尾为大。</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="6" title="正码过关">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">正码过关</td>
                                <td>从正一至正六中任选2个位置，并各选1个形态组成一注。开奖号与所选号的位置、形态相同，即为中奖。可同时选投多个正码形态，串联成投注组合，赔率为所选串联赔率的总乘积。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="7" title="连码">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">四全中</td>
                                <td>任选4个号码为一注。不限顺序，开奖的正码中包含4个所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">三全中</td>
                                <td>任选3个号码为一注。不限顺序，开奖的正码中包含3个所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">三中二</td>
                                <td>任选3个号码为一注。不限顺序，开奖的正码中包含所选号中的任意2个号码，即中“三中二”；若开奖的正码中包含3个所选号，即中“三中二中三”。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">二全中</td>
                                <td>任选2个号码为一注。不限顺序，开奖的正码中包含2个所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">二中特</td>
                                <td>任选2个号码为一注。开奖号码的正码中包含2个所选号，则中“二中特之中二”；若所选号中1个是正码，1个是特码，则中“二中特之中特”。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">特串</td>
                                <td>任选2个号码为一注。2个所选号一个出现在开奖的正码中，一个出现在开奖的特码中，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="8" title="连肖连尾">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">连肖连尾</td>
                                <td>对7个开奖号码所属的生肖或尾数进行投注。不限顺序，7个开奖号中包含全部所选生肖或尾数，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="9" title="自选不中">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">自选不中</td>
                                <td>7个开奖号中均不包含全部所选号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="10" title="生肖">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">特肖</td>
                                <td>1.对开奖特码所属的生肖进行投注，任选1个生肖为一注。开奖特码在所选生肖范围内，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">正肖</td>
                                <td>对开奖的6个正码（不含特码，不限顺序）对应的生肖进行投注。开奖的6个正码中任意1个号码落在所选生肖范围内，即为中奖。若有N个开奖的正码在所选范围内，中奖金额=本金*（赔率-1）*中奖次数+本金。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">一肖</td>
                                <td>任选1个生肖为一注。7个开奖号中任意一个号码在所选生肖的范围内，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">总肖</td>
                                <td>对7个开奖号的不同生肖总数进行投注。所选的不同生肖总数与7个开奖号的不同生肖总数相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="11" title="合肖">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">合肖</td>
                                <td>对开奖特码所属生肖进行投注，任选1个生肖为一注。开奖特码在所选生肖范围内，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>注释</td>
                                <td style="padding: 0;">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>野兽</td>
                                                <td>鼠（01 13 25 37 49）、虎（11 23 35 47）、兔（10 22 34 46）、龙（09 21 33 45）、蛇（08 20 32 44）、猴（05 17 29 41）</td>
                                            </tr>
                                            <tr>
                                                <td>家禽</td>
                                                <td>牛（12 24 36 48）、马（07 19 31 43）、羊（06 18 30 42）、鸡（04 16 28 40）、狗（03 15 27 39）、猪（02 14 26 38）</td>
                                            </tr>
                                            <tr>
                                                <td>天肖</td>
                                                <td>牛（12 24 36 48）、兔（10 22 34 46）、龙（09 21 33 45）、马（07 19 31 43）、猴（05 17 29 41）、猪（02 14 26 38）</td>
                                            </tr>
                                            <tr>
                                                <td>地肖</td>
                                                <td>鼠（01 13 25 37 49）、虎（11 23 35 47）、蛇（08 20 32 44）、羊（06 18 30 42）、鸡（04  16 28 40）、狗（03 15 27 39）</td>
                                            </tr>
                                            <tr>
                                                <td>前肖</td>
                                                <td>鼠（01 13 25 37 49）、牛（12 24 36 48）、虎（11 23 35 47）、兔（10 22 34 46）、龙（09 21 33 45）蛇（08 20 32 44）</td>
                                            </tr>
                                            <tr>
                                                <td>后肖</td>
                                                <td>马（07 19 31 43）、羊（06 18 30 42）、猴（05 17 29 41）、鸡（04 16 28 40）、狗（03 15 27 39）、猪（02 14 26 38）</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="12" title="色波">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">三色波</td>
                                <td>对开奖的特码波色进行投注，任选1个波色为一注。所选波色与开奖的特码色波相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">半波</td>
                                <td>以开奖的特码色波和大小单双为一个组合，任选1个组合为一注。所选组合与开奖的特码相符，即为中奖。如开奖的特码为49，则为和局，系统自动退还投注金额。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">半半波</td>
                                <td>以开奖的特码色波和大小单双为一个组合，任选1个组合为一注。所选组合与开奖的特码相符，即为中奖。如开奖号特码为49，则为和局，系统自动退还投注金额。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">七色波</td>
                                <td>以7个开奖号的色波，哪个颜色最多为中奖色波。以下3种结果视为和局：6个正码开出3蓝3绿，特码是1.5红 6个正码开出3蓝3红，特码是1.5绿 6个正码开出3绿3红，特码是1.5蓝 &gt;如投注红、蓝、绿波时开出和局，则系统自动退还投注金额；会员也可以下注“和局”。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="13" title="尾数">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">头尾数</td>
                                <td>对开奖特码头（十位）或尾（个位）数进行投注，任选1个类型为一注。所选的头数或尾数与开奖特码位置、号码相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">正特尾数 </td>
                                <td>对6个正码和特码的尾数进行投注，任选1个类型为一注。6个正码或特码中任意一个尾数与所选尾数相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="14" title="七码五行">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">七码</td>
                                <td>对7个开奖号中大小单双各有多少个进行投注。所选的大小单双个数与7个开奖号的大小单双数量相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">五行</td>
                                <td>对开奖的特码的五行进行投注。开奖的特码在所选的五行号码范围内，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="15" title="中一">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">中一</td>
                                <td>对应不同的选号数量要求，所选号码在当期7个开奖号码中出现任意1个，即为中奖，出现2个或以上所选号，则不中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>

<script>
import 规则 from './规则.js'
export default {
    name: "",
    props: {
        name: {
            default: ""
        },
        type: {
            default: ""
        },
        img: {
            default: ""
        }
    },
    data() {
        return {
             dataconfig: {
                api_urlData:config.api_url//api_url
            },
            activeNames: '',
            markSixNums:$.base.markSixNums
        }
    },
    computed: {
        五行(){
            var list=[{name:"金",key:"J"},{name:"木",key:'M'},{name:"水",key:"S"},{name:"火",key:"H"},{name:"土",key:'T'}];
            list.forEach(x=>{
                x.list=this.markSixNums.wus[x.key].list;
                // x.list=this.markSixNums.wus.find(y=>y.name==x.name);
            })
            return list
        },
        id(){
            return this.$route.query.id
        },
        开奖配置(){
            if(规则[this.id]){
                return 规则[this.id];            
            }else{
                return {}
            }
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.header_1 {
    line-height: 60px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 200;
    color: #e21;
     display:flex;
     margin-top:20px;
    .box_img{
           width: 60px;
         height: 60px;
         margin-right:10px;
        img{
         width: 100%;
         height: 100%;
        }
    }
}

.黄色背景 {
    background: #fc9;
}
.wanfa_first {
    width: 70px;
    text-align: center;
}

.wanfa_content {
    padding: 30px 30px 50px 30px;
    p {
        line-height: 32px;
        font-size: 14px;
        color: #666;
    }
    thead {
        background: #f2f2f2;
    }
    .kaijiang thead {
        background: #fc9;
    }
    img {
          width: 18px;
        height:16px;
    }
    table {
        // border: 1px solid #cccccc;
        // display: none;
        border-spacing: 0;
    }
    tr:nth-child(1) {
        td {
            border-top: 1px solid #cccccc;
        }
    }
    tr {
        td:nth-child(1) {
            border-left: 1px solid #cccccc;
        }
        td {
            border-right: 1px solid #cccccc;
            padding: 3px 20px;
            // border-left: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }

    /deep/ .el-collapse-item__header {
        background: none;
        font-weight: bold;
        font-size: 22px;
    }
}
</style>