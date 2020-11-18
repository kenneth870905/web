<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>

        <div class="wanfa_content">
            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p>2、11选5采用计算机网络系统发行销售，定期开奖。</p>
            <p>3、11选5实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、{{name}}由国家体育总局体育彩票管理中心统一发行，山东省体育彩票管理中心在所辖区域内承销。</p>
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
                        <td rowspan="3">{{name}}</td>
                        <td>08:41~23:01</td>
                        <td>0001~0043，共43期</td>
                        <td>20分钟</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p>1、11选5号码投注范围01-11，每期开出5个号码作为开奖号，顺序从左至右。</p>
            <p> 2、11选5玩法即竞猜5位开奖号码的全部或部分号码。</p>
            <p> 3、直选：将投注号码以惟一的排列方式进行投注。</p>
            <p>
                4、组选：将投注号码的所有排列方式作为一注投注号码进行投注，即号码顺序不限，开奖号中包含投注号码则中奖。示例：前三组选01 02 03，
                排列方式有01 02 03、01 03 02、02 01 03、02 03 01、03 01 02、03 02 01，共计6种。
            </p>

            <p>5、具体玩法说明如下：</p>

            <el-collapse>
                <el-collapse-item name="1" title="三码">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2" class="wanfa_first">前三直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从第一、二、三位中各选1个不相同的号码组成一注。所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个三位数号码组成一注。输入的三位号码与开奖号前三位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="2" class="wanfa_first">前三组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从01-11中任选3个不相同的号码组成一注。不限顺序，开奖号前三位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个三位数号码组成一注。不限顺序，开奖号前三位中包含输入的三位号码，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="2" title="二码">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2" class="wanfa_first">前二直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从第一、二位中各选1个不相同的号码组成一注。所选号与开奖号前两位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码组成一注。输入的两位数号码与开奖号前两位相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="2" class="wanfa_first">前二组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从01-11中任选2个不相同的号码组成一注。不限顺序，开奖号前两位中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">单式</td>
                                <td>手动输入1个两位数号码组成一注。不限顺序，开奖号前两位中包含输入的三位号码，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="3" title="不定胆">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="1" class="wanfa_first">不定胆</td>
                                <td class="wanfa_first">前三位</td>
                                <td>从01-11中任选1个号码组成一注。不限顺序，开奖号前三位任意一位中包含所选号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="4" title="定位胆">
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
                                <td>从01-11中任选1个号码组成一注。不限顺序，开奖号前三位任意一位中包含所选号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="5" title="任选">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="8" class="wanfa_first">复式</td>
                                <td class="wanfa_first">一中一</td>
                                <td>从01-11中任选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">二中二</td>
                                <td>从01-11中任选2个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">三中三</td>
                                <td>从01-11中任选3个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">四中四</td>
                                <td>从01-11中任选4个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">五中五</td>
                                <td>从01-11中任选5个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">六中五</td>
                                <td>从01-11中任选6个号码组成一注。不限顺序，开奖号中包含6个所选号中的任意5个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">七中五</td>
                                <td>从01-11中任选7个号码组成一注。不限顺序，开奖号中包含7个所选号中的任意5个号码，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">八中五</td>
                                <td>从01-11中任选8个号码组成一注。不限顺序，开奖号中包含8个所选号中的任意5个号码，即为中奖。</td>
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
    thead {
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
