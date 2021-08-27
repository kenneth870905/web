<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>
        <div class="adapt h-xq-nr wanfa_content">
            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、排列三采用计算机网络系统发行销售，定期开奖。</p>
            <p> 3、排列三实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、{{name}}由中国福利彩票发行管理中心发行和组织销售，并由各福利彩票销售机构在所辖区域内销售。</p>
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
                        <td>每晚 21:10</td>
                        <td>1期</td>
                        <td>一天一期</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p>
                1、每期从0-9中随机开出3个号码作为开奖号。
            </p>
            <p>2、玩法分为定位胆、不定胆和排列三，具体玩法说明如下：</p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                定位胆：在任意位置上选1个号码，所选号与开奖号一致，且位置相同，即为中奖。
            </p>
            <p>

            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                不定胆：不限顺序，开奖号中包含所选号，即为中奖。
            </p>
            <p>

            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                直选：选择三个数字投注，顺序一致。将投注号码以唯一的排列方式进行投注。
            </p>
            <p>

            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                组选三：选择三个数字投注，顺序不限，但投注的三位号码有两位相同（对子）。有2个数字相同的3个数字有3种不同的排列方式，即1次投注有3个中奖机会，
                这种 投注方式为组选三。示例：112，排列方式有112、121、211。
            </p>
            <p>

            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                组选六：选择三个数字投注，顺序不限，且投注的三位号码各不相同。3个不同的数字有6种不同的排列方式，即1次投注有6个中奖机会，这种投注方式为组选六。
                示例：123，排列方式有123、132、213、231、312、321。
            </p>
            <p>

            </p>
            <p>3、具体玩法说明如下：</p>

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
                                <td rowspan="2" class="wanfa_first">直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从百、十、个位各选1个号码组成一注。所选号与开奖号相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值</td>
                                <td>从0-27中任选1个号码组成一注。所选号等于开奖号的三个号码相加之和，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="3" class="wanfa_first">组选</td>
                                <td class="wanfa_first">组三</td>
                                <td>从0-9中任选2个号码组成两注。不限顺序，开奖号中包含全部所选号，且其中一个号码出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">组六</td>
                                <td>从0-9中任选3个号码组成一注。不限顺序，开奖号中包含全部所选号，且其中一个号码出现2次，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">混合</td>
                                <td>手动输入1个三位数号码组成一注。开奖号中包含输入的3个号码，其中一个输入号出现两次，则中组三奖；三个号码均无重复，则中组六奖。</td>
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
                                <td rowspan="2" class="wanfa_first">后二-直选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从十、个位中各选1个号码组成一注。所选号与开奖号十、个位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值</td>
                                <td>从0-18中任选1个号码组成一注。所选号等于开奖号十、个位两个号码相加之和，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="1" class="wanfa_first">后二-组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从0-9中任选2个号码组成一注。不限顺序，所选号与开奖号十、个位相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="2" class="wanfa_first">前二-直选</td>
                                <td class="wanfa_first">复选</td>
                                <td>从百、十位中各选1个号码组成一注。所选号与开奖号百、十位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                            <tr>

                                <td class="wanfa_first">和值</td>
                                <td>从0-18中任选1个号码组成一注。所选号等于开奖号百、十位两个号码相加之和，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowspan="1" class="wanfa_first">前二-组选</td>
                                <td class="wanfa_first">复式</td>
                                <td>从0-9中任选2个号码组成一注。不限顺序，开奖号百、十位中包含全部所选号，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="3" title="定位胆">
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
                                <td>从百、十、个位任意一个位置上选1个号码组成一注。所选号与开奖号一致，且位置相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="4" title="不定胆">
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
                                <td class="wanfa_first">一码</td>
                                <td>从0-9中任选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</td>
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
