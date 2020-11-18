<template>
  <div class="联系我们">
    <div class="title_1">联系我们</div>
    <div class="content">
      <div class="title_2">
        我们的客服人员将在一周7天，全天24小时在线为您提供服务。
      </div>
      <ul class="list1">
        <li>您可通过以下方式与我们联系：</li>
        <li>
          在线客服：
          <a class="color1" target="_blank" :href="在线客服">点击咨询</a>
        </li>
        <li>
          QQ客服：
          <a
            class="color1"
            target="_blank"
            :href="
              'https://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes'
            "
            >{{ qq }}</a
          >
        </li>
        <li>
          微信客服：<a href="javascript:;" @click="微信客服()" class="color1"
            >点击获取二维码</a
          >
        </li>
        <li v-if="service_email">
          客服专员邮箱：
          <a class="color1" :href="'mailto:' + service_email">{{
            service_email
          }}</a>
        </li>
        <li v-if="toushu_email">
          投诉建议邮箱：
          <a class="color1" :href="'mailto:' + toushu_email">{{
            toushu_email
          }}</a>
        </li>
        <!-- <li class="color1">48bet微信公众号：live48 </li> -->
      </ul>
      <div class="虚线"></div>
      <div class="title_2">技术支持【商务洽谈】</div>
      <ul class="list1">
        <li class="color1">
          {{
            config.title
          }}平台由【博乐技术团队】独家支持，平台业务洽谈请联系技术负责人。
        </li>
        <li v-if="技术支持">
          负责人Telegram：
          <a
            class="color1"
            target="_blank"
            :href="
              config.telegram && config.telegram.a
                ? config.telegram.a
                : 'javascript:;'
            "
          >
            {{
              config.telegram && config.telegram.number
                ? config.telegram.number
                : ""
            }}
          </a>
        </li>
        <li>
          在线客服：
          <a class="color1" target="_blank" :href="在线客服">点击咨询</a>
        </li>
        <li>
          如果您需要咨询平台方相关事宜，或者事想提供宝贵意见，请联系我们公关部门。
        </li>
      </ul>
    </div>

    <el-dialog
      class="二维码弹框"
      title="微信客服"
      :visible.sync="显示二维码"
      width="300px"
    >
      <div>
        <div class="img_box">
          <img :src="config.api_url + '/App_Upload/wechatkf.jpg'" alt="" />
        </div>
        <div class="提示">
          扫一扫添加好友
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      显示二维码: false
    };
  },
  computed: {
    ...mapState({
      config: "config",
      userInfo: x => x.user.userinfo,
      技术支持: "技术支持"
    }),
    ...mapGetters({
      站点配置: "站点配置",
      试玩: "user/试玩"
    }),
    在线客服() {
      if (this.站点配置.online_chat) {
        return this.站点配置.online_chat;
      } else {
        return this.config.online_chat;
      }
    },
    qq() {
      if (this.站点配置.qq) {
        return this.站点配置.qq;
      } else {
        return this.config.QQ;
      }
    },
    toushu_email() {
      if (this.站点配置.toushu_email) {
        return this.站点配置.toushu_email;
      } else {
        return this.config.toushu_email;
      }
    },
    service_email() {
      if (this.站点配置.service_email) {
        return this.站点配置.service_email;
      } else {
        return this.config.service_email;
      }
    }
  },
  methods: {
    微信客服() {
      if (!config.ck) {
        config.ck = 0;
      }
      if (!this.userInfo.UserId) {
        this.$confirm("登录后可查看微信二维码，请先登录?", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      } else if (this.试玩) {
        this.$message("请使用非试玩账号查看！");
      } else if (this.userInfo.Ck < config.ck) {
        this.$confirm(
          "充值少于" + config.ck + "次无法显示，是否现在去充值?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            window.open(config.api_url + "/Members/Money/Recharge");
          })
          .catch(() => {});
      } else {
        this.显示二维码 = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.联系我们 {
  padding: 1px 36px;
}
.title_1 {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0px 0px;
}
.title_2 {
  color: #ffff00;
  margin: 10px 0px 5px;
}
.list1 {
  line-height: 30px;
  font-size: 14px;
  .color1 {
    color: red;
    font-weight: bold;
  }
}
.虚线 {
  border-bottom: 1px dashed #ffffff;
  margin: 20px 0px;
}
.content {
  padding: 10px 0px;
}

.二维码弹框 {
  .img_box {
    img {
      width: 100%;
    }
  }
  .提示 {
    text-align: center;
  }
}
</style>
