<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>
        <div class="wanfa_content">
            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、快3采用计算机网络系统发行销售，定期开奖。</p>
            <p> 3、快3实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、江苏快3（骰宝）由中国福利彩票发行管理中心组织销售、吉林省福利彩票发行中心承销，如开奖时间异动以中国福利彩票管理中心公告为准。</p>
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
                    <tr>
                        <td>彩种名称</td>
                        <td>开奖时间</td>
                        <td>开奖期数</td>
                        <td>开奖频率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="3">江苏快3</td>
                        <td>09:38~22:38</td>
                        <td>0001~0078，共78期</td>
                        <td>10分钟</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p>
                1、快3投注是指以三个号码组合为一注进行单式投注，每个投注号码为1-6共六个自然数中的任意一个，一组三个号码的组合称为一注。
            </p>
            <p> 2、每期从3粒骰子的点数中随机开出3个号码作为开奖号。</p>
            <p> 3、快3根据号码组合共分为“和值”、“三同号”、“二同号”、“三不同号”、“二不同号”、“三连号通选”投注方式，具体规定如下：</p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                和值投注：是指对三个号码的和值进行投注，包括“和值4”至“和值17”投注。</p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                三同号投注：是指对三个相同的号码进行投注，具体分为：
            </p>
            <p style="text-indent:20px;">• 三同号通选：是指对所有相同的三个号码（111、222、…、666）进行投注；</p>
            <p style="text-indent:20px;">• 三同号单选：是指从所有相同的三个号码（111、222、…、666）中任意选择一组号码进行投注。</p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                二同号投注：是指对两个指定的相同号码进行投注，具体分为：
            </p>
            <p style="text-indent:20px;"> • 二同号复选：是指对三个号码中两个指定的相同号码和一个任意号码进行投注；</p>
            <p style="text-indent:20px;"> • 二同号单选：是指对三个号码中两个指定的相同号码和一个指定的不同号码进行投注。</p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                三不同号投注：是指对三个各不相同的号码进行投注。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                二不同号投注：是指对三个号码中两个指定的不同号码和一个任意号码进行投注。
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                三连号通选投注：是指对所有三个相连的号码（仅限：123、234、345、456）进行投注。
            </p>

            <p>4、具体玩法说明如下：</p>

            <el-collapse>

                <el-collapse-item name="1" title="二不同号">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3" class="wanfa_first">二不同号</td>
                                <td class="wanfa_first">标准选号</td>
                                <td>从1-6中任选2个不相同的号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">手动选号</td>
                                <td>手动输入1个不相同的两位数号码，不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">胆拖选号</td>
                                <td>从胆码和拖码位置上各选1个不相同的号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。投注时可在胆码位置任选1个号码作为每注都有的胆码，在拖码位置选1个或多个与胆码不同的号码作为拖码投注。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="2" title="二同号">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2" class="wanfa_first">单选</td>
                                <td class="wanfa_first">标准选号</td>
                                <td>从二同号和不同号中各选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">手动选号</td>
                                <td>手动输入1个三位数号码，且其中一个号码需相同。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="1" class="wanfa_first">复选</td>
                                <td class="wanfa_first">复选</td>
                                <td>从6组对子中任选1组对子号码组成一注。不含豹子号码，开奖号中包含所选的对子号码，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="3" title="三不同号">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2" class="wanfa_first">三不同号</td>
                                <td class="wanfa_first">标准选号</td>
                                <td>从1-6中任选3个不相同的号码组成一注。不限顺序，所选号与开奖号相同，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">手动选号</td>
                                <td>手动输入1个各不相同的三位数号码。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="4" title="三同号">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="1" class="wanfa_first">单选</td>
                                <td class="wanfa_first">标准选号</td>
                                <td>选任意一组豹子号码组成一注。所选号与开奖号相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="1" class="wanfa_first">通选</td>
                                <td class="wanfa_first">复选</td>
                                <td>对6组豹子号码通选，开奖号与6组豹子号中任意一组号码相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="5" title="三连号">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">通选</td>
                                <td>对6组豹子号码通选，开奖号与6组豹子号中任意一组号码相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="6" title="和值">

                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">和值</td>
                                <td>从3-18中任选1个号码组成一注。所选号等于开奖号的3个号码相加之和，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>
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
  },
  mounted () {

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
    thead{
        background: #f2f2f2;
    }
    .kaijiang thead {
        background: #fc9;
    }
    img {
        width: 26px;
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
