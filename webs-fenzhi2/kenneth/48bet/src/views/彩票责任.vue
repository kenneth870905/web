<template>
  <div class="内容">
    <div class="contentfirst-us">
      <div class="h-xq-bt">
        <h2>博彩责任</h2>
      </div>
      <div class="adapt h-xq-nr">
        <h3 style="padding:0 0 20px 0; line-height:30px;">未满博彩年龄</h3>
        <p>
          {{
            config.title
          }}娱乐城积极推行负责任博彩，并极力拒绝未成年玩家使用我们的软体进行网上娱乐城。同时，我们更通过专业人员及各种有效方法，以防止问题博彩的发生。
          一旦发现使用该本网站的客户未满18岁，我们将会没收所有赢取的彩金并保留立即终止客户的投注户口操作的权利。
        </p>
        <p>
          本服务不提供给未满十八岁之任何人士。所有使用本服务的人士所提供的数据显示其年龄已满十八岁。如本公司认知未满十八岁之人士尝试或已提供数据给予本网站，本公司将不接受其数据并采取清除其数据的动作。
        </p>
        <p>
          如您的电脑被未满18岁的人士使用，
          我们建议您设定电脑资料保密以防止帐户号码/用户名称被盗用。
        </p>
        <h3>博彩行为检视</h3>
        <p>
          博彩只是一种娱乐城，大部分玩家视博彩为消闲娱乐城。然而小部分玩家无法自制，沉迷于赌博，往往对自己及社会均造成伤害。以下是为玩家准备的博彩问题测试，阁下可以测试是否面临以下的问题。
        </p>
        <ol class="h-xq-ol">
          <li>您是否因为博彩而不上班或不上学？</li>
          <li>您博彩是否为了逃避烦闷或不愉快的生活？</li>
          <li>
            当您博彩花光钱时，您是否感到失望甚至绝望，并且希望马上能再进行赌博？
          </li>
          <li>您会否博彩到最后一分钱才罢休？</li>
          <li>您有否曾经用谎言掩饰您花在博彩上的时间和金钱？</li>
          <li>您博彩是不是因为争执，沮丧或失望？</li>
          <li>您有没有因为博彩而感到失落甚至轻生？</li>
          <li>您是否对您的家人，朋友或爱好失去了兴趣？</li>
          <li>您输了之后，是否马上想把输的钱赢回来？</li>
        </ol>
        <p>在这些问题中您回答的‘是’越多，您就越接近具备严重博彩问题。</p>
        <p>为了协助您判定所设定的限制是否合适于您，请仔细考虑：</p>
        <ol class="h-xq-ol">
          <li>在还未开始博彩之前制定一个可以接受的输赢额度</li>
          <li>留意您花费多长时间在博彩游戏</li>
          <li>按您实际情况制定一个您每天、每周或每月的投注额度</li>
        </ol>
        <h3>责任感和正直诚信</h3>
        <p>
          {{
            config.title
          }}娱乐城致力于提高服务水准，并承诺向客户履行最大程度上的责任，包括诚信、透明度、合法性等各方面。如客户遇上任何有关责任博彩的问题，可24小时向我们的客户服务部联络。我们承诺会于一年365日，不间断地为用户提供技术支援及相关问题解答服务。
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
.title_1 {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0px 0px;
}

.内容 {
  padding-top: 10px;
}
.banner {
  img {
    width: 100%;
  }
}
.列表 {
  display: flex;
  .导航 {
    flex-shrink: 0;
    width: 240px;
    margin-right: 20px;
    background: #d3d3d3;
    min-height: 600px;
    overflow: hidden;
    li {
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      border-bottom: 2px solid #f2f2f2;
      text-indent: 25px;
      position: relative;
      cursor: pointer;
      position: relative;
    }
    li::after {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 0px;
      height: 100%;
      content: "";
      background: #ff4b4b;
      transition: all 0.3s;
    }
    li.active {
      background: #ff4b4b;
      color: #d3d3d3;
    }
    li:hover::after {
      width: 5px;
    }
  }
  .内容 {
    flex-grow: 1;
  }
}
.h-xq-bt {
  height: 60px;
  border-bottom: 2px solid #232323;
  h2 {
    line-height: 60px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 200;
    color: #e21;
  }
}
.h-xq-nr {
  padding: 30px 30px 50px 30px;
  p {
    line-height: 32px;
    font-size: 14px;
    text-indent: 2em;
  }
  h3 {
    line-height: 64px;
    font-size: 18px;
    padding-top: 10px;
    font-weight: 500;
  }
}

.tb-tab1 {
  margin: 10px 0 0px 0;
  font-size: 13px;
  border-left: 1px solid #312741;
  border-top: 1px solid #312741;
}
.tb-tab1 td,
.tb-tab1 th {
  height: 44px;
  text-align: center;
  vertical-align: middle;
  border-right: 1px solid #312741;
  border-bottom: 1px solid #312741;
  color: #222;
  background: #fff;
}
.tb-tab1 thead td,
.tb-tab1 th {
  background: #231a32;
  font-weight: bold;
  color: #fff;
}
</style>
