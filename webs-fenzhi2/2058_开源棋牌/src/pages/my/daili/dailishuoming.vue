<template>
  <div>
      <van-nav-bar title="代理说明" left-arrow @click-left="onClickLeft" />
      <div>
           <img  style="width:100%;" src="image/daili/hz.png" alt="">
          <ul id="list">
                <li>
                    <div class="title_1">代理说明</div>
                    <div class="content_1">
                        本站隆重推出会员代理新模式，每个会员均可生成10个推广链接,推广链接又可以任意选择绑定一种代理分成模式，一个账号十条代理链接五大代理模式，让您轻松实现致富梦想。
                    </div>
                </li> 
                <li>
                    <div class="title_1">打码分成</div>
                    <div class="content_1">
                        凡是通过您代理链接注册来的会员，该会员订单结算成功后(无论输赢)的下注金额为打码量。
                        打码量乘以相应的百分比就是您的提成收益部分。当月旗下会员总打码量超过200万，下月
                        自动升级为VIP代理，享受保底工资加30%-50%的超高盈亏分成模式。
                    </div>
                </li>
                <li>
                    <div class="title_1">自定义赔率</div>
                    <div class="content_1">
                凡是通过您代理链接注册来的会员，该会员的所有彩票玩法的赔率均为您设置的相应赔率。
                会员下注盈利时，标准赔率盈利减去自定义赔率盈利的差值为您的提成收益部分。
                    </div>
                </li>
                <li>
                    <div class="title_1">盈亏分成</div>
                    <div class="content_1">
                    凡是通过您代理链接注册来的会员，该会员下注亏损的部分，再乘以相应比例为您的提成收益部分。
                    </div>
                </li>
                <li>
                    <div class="title_1">存款分成</div>
                    <div class="content_1">
                凡是通过您代理链接注册来的会员，该会员充值金额扣除相应比例后为您的提成收益部分。
                会员实际到账金额为扣除您提成后的金额。
                    </div>
                </li>
                <li>
                    <div class="title_1">取款分成</div>
                    <div class="content_1">
                        凡是通过您代理链接注册来的会员，该会员充值金额扣除相应比例后为您的提成收益部分，会员实际到账金额为扣除您提成后的金额。
                    </div>
                </li>
            </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
     methods:{
         onClickLeft() {
            this.$router.go(-1);
        },
    }
}
</script>

<style>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
#list li{
  
        margin: 0px 0px 20px 0px;
    }
#list .title_1{
        font-weight: bold;
        color: #ec0909;
        margin: 0px 0px 14px 0px;
        font-size: 17px;
 }
#list .content_1{
        text-indent: 12px;
        font-size: 14px;
        color: #3e3e3e;
    }
</style>