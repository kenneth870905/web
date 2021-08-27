<template>
    <div>
        <div class="header_1">
            {{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}
        </div>
        <div class="wanfa_content">

            <h1>一、总则</h1>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、<span class="lottery_name">{{name}}</span>采用计算机网络系统发行销售，定期开奖。</p>
            <p> 3、<span class="lottery_name">{{name}}</span>实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h1>二、类型及承销</h1>
            <div class="type">
                <p>1、{{name}}是一种在线即开型彩票玩法，属于基诺型彩票范畴，由本站管理中心负责承销。</p>
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
                        <td>08:00-06:00（次日）</td>
                        <td>每2分钟一期，全天660期（06:00-08:00期间不开奖）</td>
                        <td>2分钟</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h1>五、玩法说明</h1>
            <p>
                1、投注号码竞猜范围为0-27，共28个号码。每期开出3个号码作为开奖号码，3个号码之和即为特码。
            </p>
            <p>
                2、玩法分为：豹子、混合、波色、特码和特码包三。
            </p>
            <p>
                3、混合：指对开奖特码的形态进行投注，形态号码如下
            </p>
            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                大小：14~27为大，0~13为小
            </p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                极大小：22~27为极大，0~5为极小
            </p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                大单：15、17、19、21、23、25、27
            </p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                大双：14、16、18、20、22、24、26
            </p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                小单：1、3、5、7、9、11、13
            </p>

            <p>
                <img class="u17" src="image/san/gz_arrow.png">
                小双：0、2、4、6、8、10、12
            </p>

            <p>4、波色：指对开奖特码的波色进行投注，波色号码如下：</p>
            <p style="text-indent:20px;">绿波号码：1、4、7、10、16、19、22、25</p>
            <p style="text-indent:20px;">蓝波号码：2、5、8、11、17、20、23、26</p>
            <p style="text-indent:20px;">红波号码：3、6、9、12、15、18、21、24</p>
            <p style="text-indent:20px;">灰波号码：0、13、14、27（若开出灰波号码，则投注任何波色均视为不中奖。）</p>
            <p>5、具体玩法说明如下：</p>

            <el-collapse>
                <el-collapse-item name="1" title="混合">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">混合</td>
                                <td>对特码的大（14-27）、小（0-13）、单、双、极大（22-27）、极小（0-5）形态进行投注，任选1个形态组成一注。所选形态与开奖特码的形态相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="2" title="波色">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">波色</td>
                                <td>对开奖特码的波色进行投注，任选1个波色组成一注。所选波色与开奖特码波色相同，即为中奖。如开出灰波（0、13、14、27）则投注任何波色均视为不中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="3" title="豹子">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">豹子</td>
                                <td>投注当期的3个开奖号为豹子号码。3个开奖号码为同一号码，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="4" title="特码包三">
                    <table>
                        <thead>
                            <tr>
                                <td>玩法</td>
                                <td>规则</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="wanfa_first ">特码包三</td>
                                <td>对开奖特码进行投注，任选3个号码组成一注。所选的3个号码中任一号码与开奖特码相同，即为中奖。</td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>

                <el-collapse-item name="5" title="特码">
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
                                <td>对开奖特码进行投注，任选1个号码组成一注。所选号与开奖特码相同，即为中奖。</td>
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
