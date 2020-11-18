<template>
  <div class="stockOperation">
    <div class="touch">
      <h1>超盘细则</h1>
      <span class="el-icon-time"></span>
      <span>2017-05-05</span>
    </div>
  
    <div class="content">
        <ul>
        <li>
            <div class="stock_title">
                <div class="title_tb">1</div>&nbsp;&nbsp;
                <div class="title">股票交易限制</div>
            </div>
            
            <p>不得购买权证类可以T+0交易的证券；</p>
            <p>不得购买首日上市新股（或复牌首日股票）等当日不设涨跌停板限制的股票；</p>
            <p>不得购买平台当日限制股票。</p>
        </li>
        <li>
            <div class="stock_title">
            <div class="title_tb">2</div>&nbsp;&nbsp;
            <div class="title">什么是警戒线</div>
            </div>
            <p>亏损掉杠杆保证金的50%为警戒线。当实盘资产低于警戒线时，您将被限制买入新的股票，但允许卖出已持有的股票，您可以通过增加保证金的方式解除限制买入</p>
        </li>
         <li>
            <div class="stock_title">
            <div class="title_tb">3</div>&nbsp;&nbsp;
            <div class="title">什么是止损线</div>
            </div>
        <p>亏损掉杠杆保证金的80%为平仓线。当总操盘资金低于止损线以下时，我们将有权把您的股票进行平仓，为避免平仓发生，请时刻关注本金是否充足。</p>
        </li>
         <li>
            <div class="stock_title">
            <div class="title_tb">4</div>&nbsp;&nbsp;
            <div class="title">强平执行规则</div>
            </div>
        <p>当合约触发强平指令时，系统按照优先成交的原则进行挂单，不能保证卖出价格，但是请您放心的是成交价格是当时的市价成交，如因其它不可抗力因素不能卖出，系统会持续执行卖出申请，直至卖掉股票，期间造成的损失全由用户承担</p>
        </li>
          <li>
            <div class="stock_title">
            <div class="title_tb">5</div>&nbsp;&nbsp;
            <div class="title">强平执行规则</div>
            </div>
        <p>盘中能提取利润，利润提取时间段：交易日08:00到20:00，非交易日全天，免息赢不可提取利润；您可以在合约中点击去交易按钮，在有盈利的情况下在页面的右上方会出现提取盈利这个按钮；点击按钮后输入相应金额。提取的利润必须是可用资金，或将股票卖出变为可用资金后方能提取。</p>
        </li>
         <li>
            <div class="stock_title">
            <div class="title_tb">6</div>&nbsp;&nbsp;
            <div class="title">合约限买制度</div>
            </div>
        <p>合约欠费或者触及警戒线将被限制买入，当合约解除欠费限制且市值高于警戒线之上系统会自动解除限买限制</p>
        </li>
         <li>
            <div class="stock_title">
            <div class="title_tb">7</div>&nbsp;&nbsp;
            <div class="title">零股处理规则</div>
            </div>
        <p>账户中如有零股，需一次性全部卖出，例如账户中某股票150股，用户可一次性卖出150股也可先卖出100股在卖出50股，但不可先卖出50股后再卖出100股。</p>
        </li>
         <li>
            <div class="stock_title">
            <div class="title_tb">8</div>&nbsp;&nbsp;
            <div class="title">手续费，过户费，印花税</div>
            </div>
        <p>1、手续费不包含印花税、过户费，印花税和过户费按财政部和交易所规定收取，交易佣金是万2单边（不够一万按5元收取），印花税是千分1 ，过户费是十万分之2。交易佣金是由证券公司收取的，过户费等是国家相关部门收取的，印花税由国家直接收取。</p>
        </li>
        </ul>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    // 注册组件
    //  Navcontact
  }
};
</script>

<style lang="scss" scoped>
.stockOperation{
  // 标题
  .touch {
    height: 100px;
    border-bottom: 1px solid #ccc;
  }
  // 内容
  .content {
    margin: 10px 20px 10px 20px;
    ul li{
        margin-bottom:40px;
        // list-style: none;
      .stock_title{
        display:flex;
       .title_tb{
           text-align: center;
      width:30px;
      height:30px;
      background: #ff6700;
      border-radius: 50%;
     line-height:30px;
    color:#fff;
    font-size: 26px;
    }
    .title{
        line-height:30px;
        font-size:18px;
        font-weight:1000;
    }
    }
    }
    
   
  }
}
</style>

