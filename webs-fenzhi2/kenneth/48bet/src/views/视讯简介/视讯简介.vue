<template>
  <div class="简介 w1200">
    <gdtz />

    <div class="title_1">真人娱乐--{{ title[type][gid] }}</div>
    <ul class="内容" v-if="type == 'AG'">
      <li>
        <img src="static/image/sxjs/ag.png" alt="" srcset="" />
      </li>
      <li>
        <p>
          平台简介:<br />
          (TG_AG平台)是目前最具創意及創新的合法博彩娛樂平台供應商。從2012年開始，我們的團隊憑著大膽革新的思維，使AG平台能迅速在市場上佔一席位。Asia
          Gaming全球首創VIP包桌及咪牌百家樂，讓網上娛樂平台衝破傳統的束縛，帶來一個革命性的新體驗。AG平台同時符合IOM及First
          Cagayan認證,
          並獲得TST公平認證。我們的宗旨是秉持一個『公平、公正、公開』的真人荷官博彩平台，讓玩家感覺更逼真更震撼，仿如置身現場。017-A-02。
          <br /><br />
          產品特色种类：百家乐（旗舰厅、实地厅、VIP包桌）VIP包桌：玩家擁有獨立私人空間，且權限更多，例如：要求更換荷官咪牌百家樂：桌主自行咪牌，感覺更實在，耍樂更興奮。
        </p>
      </li>
    </ul>
    <ul class="内容" v-if="type == 'BY'">
      <li>
        <img src="static/image/sxjs/bg.png" alt="" srcset="" />
      </li>
      <li>
        <p class="vistext">
          平台简介:<br />
          奢华贵气的艳紫色系，荷官与主 播性感美艳的全新黑色礼服，使用更
          加便利的游戏介面，以及清晰的直播画面与现场收音等，都是BG专业视讯团队将为您奉上的新一代BG真人视讯厅豪华设计，全新摄影棚视觉效果将让人惊艳无比。<br />
          游戏种类:<br />
          全新的牛牛、共咪百家乐与全彩百家乐模式。
        </p>
      </li>
    </ul>
    <ul class="内容" v-if="type == 'BG'">
      <li>
        <img src="static/image/sxjs/BBIN.png" alt="" srcset="" />
      </li>
      <li>
        <p>
          平台简介:<br />
          BBIN
          成立於1999年，17年來穩健的經營並成功的將產品銷售至亞洲各地。以追求最佳品質，重視消費者回饋的博彩娛樂平台服務著稱，並以系統化標準開發每一款遊戲，不斷創新的圖形技術結合東方元素，建構亞洲的最大遊戲供應商。<br />
          BBIN
          是亞洲享有盛名的網路博彩娛樂集團，提供多元網路娛樂服務平台和遊戲商品開發、真人視訊、電子遊藝、桌上遊戲、樂透彩等皆有豐富多樣的選擇。..<br />
          游戏种类:<br />
          百家乐、龙虎、
          骰宝、轮盘、二八杠、三公、牛牛、温州牌九、德州扑克、色碟、无限21点<br />
        </p>
      </li>
    </ul>

    <div class="btn_1">
      <el-button @click="进入游戏()" type="warning">进入游戏</el-button>
    </div>
  </div>
</template>

<script>
import gdtz from "@/components/滚动通知.vue";
import { mapActions } from "vuex";
export default {
  name: "",
  components: {
    gdtz
  },
  data() {
    return {
      title: {
        AG: {
          2: "AG国际厅",
          1: "AG旗舰厅"
        },
        BY: {
          live: "BG视讯大厅"
        },
        BG: {
          1: "波音厅"
        }
      }
    };
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    gid() {
      return this.$route.params.gid;
    }
  },
  methods: {
    ...mapActions({
      设置进入游戏: "待入游戏/设置进入游戏"
    }),
    进入游戏() {
      var obj = {
        name: this.title[this.type][this.gid],
        type: this.type,
        gid: this.gid
      };
      this.设置进入游戏(obj);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.简介 {
  background: #232323;
}
.title_1 {
  padding: 20px 10px;
}
.内容 {
  display: flex;
  padding: 0px 10px;
  > li:nth-child(1) {
    width: 40%;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  > li:nth-child(2) {
    width: 40%;
    margin: 0px 0px 0px 20px;
    line-height: 30px;
  }
}

.btn_1 {
  padding: 20px 0px 50px;
  text-align: center;
  button {
    width: 300px;
  }
}
</style>
