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
                <p>1、{{name}}由中国福利彩票发行管理中心发行和组织销售，由北京市福利彩票销售机构在所辖区域内销售。</p>
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
            <p>1~10两面：指单、双；大，小。</p>
            <p>单、双：号码为双的叫双，如4、8；号码为单效叫单，如5、9。</p>
            <p>大、小：开出之号码大于或等于6为大，小于或等于5为小。</p>
            <p>第一名～第十名车号指定：每一个车号为一投注组合，开奖结果"投主车号"对应所投名次视为中奖，其余情形视为不中奖。</p>
            <p>1~5龙虎【注意规则】为：</p>
            <p>冠军龙虎："第一名"车号大于"第十名"车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
            <p>亚军龙虎："第二名"车号大于"第九名"车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
            <p>第三名龙虎："第三名"车号大于"第八名"车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
            <p>第四名龙虎："第四名"车号大于"第七名"车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
            <p>第五名龙虎："第五名"车号大于"第六名"车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
            <p>冠军车号 亚军车号=冠亚和值</p>
            <p>冠亚和值单双："冠亚和值"为单视为投注"单"的注单视为中奖，为双视为投注"双"的注单视为中奖，等于11的注单视为打和，退换本金。</p>
            <p>冠亚和值大小："冠亚和值"大于11时投注"大"的注单视为中奖，小于11时投注"小"的注单视为中奖，等于11的注单视为打和，退换本金。</p>
            <p>冠亚和值："冠亚和值"可能出现的结果为3~19，投中对应"冠亚和值"数字的视为中奖，其余视为不中奖。</p>
            <p>冠亚组合：根据前两位数字（相当冠军、亚军）的中奖号码做为对奖号码。投注两个码，如果这两个号码均在开奖结果的前两位数中存在，不分顺序，为中奖，其余视为不中奖。</p>
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
