<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>

        <div class="wanfa_content">
            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、PK拾采用计算机网络系统发行销售，定期开奖。</p>
            <p> 3、PK拾实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、{{name}}PK拾由中国福利彩票发行管理中心发行和组织销售，由北京市福利彩票销售机构在所辖区域内销售。</p>
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
                        <td>09:07~23:57</td>
                        <td>0001~0179，共179期</td>
                        <td>5分钟</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p> 1、每期从01-10中随机开出10个号码作为当期开奖车号，顺序从左至右。</p>
            <p> 2、PK拾采用排列式玩法。从左至右共有十个投注位置，排列顺序分别为一至十号位置，每个位置可从01-10的自然数中选择一个号码。</p>
            <p> 3、先选择投注位置个数，投注位置个数最少一个、最多十个，在所选位置上从01-10的自然数中选择一个号码进行投注。</p>
            <p>
                4、若投注位置个数超过两个的，后选位置的投注号码不能与前面所有已选位置的投注号码相同。
            </p>

            <p>5、所选号码按位置顺序排序组成一组号码，该组号码即为一注PK拾投注号码。</p>

            <p>6、具体玩法说明如下：</p>

            <ElCollapse>
                <el-collapse-item name="1" title="前一">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">前一</td>
                                <td>从01-10中任选1个号码组成一注。投注号与开奖号第一位相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="2" title="前二">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">前二</td>
                                <td>从第一位、第二位中各选1个不相同的号码组成一注。所选号与开奖号的前两位号码相同，且顺序一致，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="3" title="前三">
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
                                <td>从第一位至第三位中各选1个不相同的号码组成一注。所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</td>
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
                                <td>从任意位置上选1个号码进行投注。所选号与相同位置上的开奖号一致，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="5" title="冠亚和">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">大小单双</td>
                                <td>对冠、亚军车号相加之和的大（12~19）小（3~11）单双进行投注。所选形态符合开奖号冠、亚军车号相加之和，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">和值</td>
                                <td>从3-19中任选1个号码组成一注。所选号等于开奖号冠、亚军车号相加之和，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="6" title="龙虎">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">冠军</td>
                                <td>对冠军车号大于第十名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的冠军车号大于或小于第十名的形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">亚军</td>
                                <td>对亚军车号大于第九名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的亚军车号大于或小于第九名的形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">季军</td>
                                <td>对季军车号大于第八名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的季军车号大于或小于第八名的形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">第四名</td>
                                <td>对第四名车号大于第七名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的第四名车号大于或小于第七名的形态相同，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">第五名</td>
                                <td>对第五名车号大于第六名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的第五名车号大于或小于第六名的形态相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="7" title="五行">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">冠军</td>
                                <td>对开奖号冠军号码所属的五行进行投注，任选一个组合为一注。开奖号冠军号码在所选五行的范围内，即为中奖。金：01 02，木：03 04，水：05 06，火：07 08，土：09 10。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">亚军</td>
                                <td>对开奖号亚军号码所属的五行进行投注，任选一个组合为一注。开奖号亚军号码在所选五行的范围内，即为中奖。金：01 02，木：03 04，水：05 06，火：07 08，土：09 10。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">季军</td>
                                <td>对开奖号季军号码所属的五行进行投注，任选一个组合为一注。开奖号季军号码在所选五行的范围内，即为中奖。金：01 02，木：03 04，水：05 06，火：07 08，土：09 10。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="8" title="大小单双">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">冠亚季军</td>
                                <td>对开奖号冠、亚、季军的车号大（06~10）小（01~05）单双进行投注。所选形态与相同位置上的开奖号形态一致，即为中奖。</td>
                            </tr>
                            <tr>
                                <td colspan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="wanfa_first ">冠亚和</td>
                                <td>对冠、亚军车号相加之和的大（12~19）小（3~11）单双进行投注，任选一个形态为一注。所选形态符合开奖号冠、亚军车号相加之和的形态，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>
            </ElCollapse>
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
    .kaijiang thead{
        background: #fc9;
    }
    img{
        width: 26px;
    }
    table{
        // border: 1px solid #cccccc;
        // display: none;
        border-spacing: 0;
    }
    tr:nth-child(1){
        td{
            border-top: 1px solid #cccccc;
        }
    }
    tr{
        td:nth-child(1){
            border-left: 1px solid #cccccc;
        }
        td{
            border-right: 1px solid #cccccc;
            padding: 3px 20px;
            // border-left: 1px solid #cccccc;
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
