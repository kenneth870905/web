<template>
  <div class="内容">
    <div class="title_1">常见问题</div>

    <div id="middle" class="description">
      <div class="content">
        <p>
          <span style="color:#FFFF00"
            ><span style="font-size:16px">Q1：如何加入娱乐城?</span></span
          ><br />
          <span style="color:rgb(211, 211, 211); font-size:14px"
            >A1：您可以直接点选
            “立即开户”或“会员注册”，确实填写数据后，可立即登记成为</span
          >{{ config.title
          }}<span style="color:#D3D3D3"
            ><span style="font-size:14px">会员。</span></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px"
              >Q2：开户是否要填写真实姓名？</span
            ></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >A2：基于安全理由，提款时财务部会按照注册姓名进行审核，银行卡户名必须与注册姓名相同方可提款，所以请您在开户时填写的姓名必须与您提款的户名相同。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px"
              >Q3：我可以直接在网络上存款吗？</span
            ></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px">A3：可以，</span></span
          >{{ config.title
          }}<span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >提供多种在线存款选择，详情请参照 "存款帮助"。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px"
              >Q4：我在那里可以找到游戏的规则？</span
            ></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >A4：在未登入前，您可以在游戏的最外层看到"游戏规则"选项，清楚告诉您游戏的玩法、规则及派彩方式。
              在游戏窗口中，也有"规则"选项，让您在享受游戏乐趣的同时，可以弹跳窗口随时提醒您游戏规则。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px"
              >Q5：我可以只试玩而不下注吗？</span
            ></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >A5：公司暂时没有开设试玩账号，您可以直接点击“立即开户”或“会员注册”，确实填写资料后，就可成为我们公司的会员。注册会员账号后就可以进入到我们的游戏大厅参观我们的现场真人游戏。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px"
              >Q6：您们的游戏会用多少副牌？</span
            ></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >A6：在百家乐我们会用8副牌，其他游戏则会根据其性质有所调整。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="color:#FFFF00"
            ><span style="font-size:16px">Q7：您们何时会洗牌?</span></span
          ><br />
          <span style="color:#D3D3D3"
            ><span style="font-size:14px"
              >A7：所有纸牌游戏，当红的洗牌记号出现或游戏因线路问题中断时便会进行重新洗牌。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="font-size:14px"
            ><span style="color:#FFFF00"
              ><span style="font-size:16px"
                >Q8：我的注码的限制是多少？</span
              ></span
            ><br />
            <span style="color:#D3D3D3"
              >A8：从最低注单5（视讯）~20（球类）人民币以上即可投注，
              您的注码会根据您的存款有所不同，以及您挑选的游戏不同而有所区别。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="font-size:14px"
            ><span style="color:#FFFF00"
              ><span style="font-size:16px"
                >Q9：如果忘记密码怎么办？</span
              ></span
            ><br />
            <span style="color:#D3D3D3"
              >A9：您可以联系24小时在线客服人员协助找回您的帐号密码。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="font-size:14px"
            ><span style="color:#FFFF00"
              ><span style="font-size:16px"
                >Q10：为什么在线支付成功后额度没有立即返到我的游戏帐号呢？</span
              ></span
            ><br />
            <span style="color:#D3D3D3"
              >A10：这是因为在线支付系统需要经过密锁切换及内部验证程序，而这也是我们的保安程序之一，所以请您不必担心，款项一定不会丢失。如果您在在线支付超过30分钟后仍然还未收到您的款项，请与我们客服联系处理。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="font-size:14px"
            ><span style="color:#FFFF00"
              ><span style="font-size:16px"
                >Q11：为什么观看六局就会断开连接？</span
              ></span
            ><br />
            <span style="color:#D3D3D3"
              >A11：基于两个原因：（1）为了您的账号安全，如果阁下在打开游戏后，又忘记观赏就离开了电脑，万一在这个时间被其他人使用投注，您的损失就很难控制了。（2）每时每刻都有非常多的客户上线进行游戏，为了让网速快而畅通，我们的系统就自动节省网路资源，照顾了在游戏之中的客户，所以观看六局就会断开连接。如因此给您带来不便，敬请见谅。</span
            ></span
          >
        </p>

        <p>
          <br />
          <span style="font-size:14px"
            ><span style="color:#FFFF00"
              ><span style="font-size:16px"
                >Q12：为什么系统会将我登出？</span
              ></span
            ><br />
            <span style="color:#D3D3D3"
              >A12：这是网页的保安程式之一，当您在一定的时间内没有使用有关的网页，那么有关的网页将不再活跃，并且无法浏览最新的页面，在此您必需重新登入；若您重新登入后情况仍然一样请立即联系我们。</span
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      config: "config"
    })
  }
};
</script>

<style lang="scss" scoped>
.内容 {
  padding: 1px 36px;
}
.title_1 {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0px 0px;
}
</style>
