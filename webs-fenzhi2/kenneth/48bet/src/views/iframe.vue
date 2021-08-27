<template>
  <div>
    <div class="iframe_box" :style="'height:' + height + 'px'">
      <iframe
        ref="iframe"
        @load="load_1()"
        v-if="iframe[type]"
        :src="config.iframe_url + iframe[type]"
        frameborder="0"
      ></iframe>
      <!-- <iframe ref="iframe" @load="load_1()" v-if="iframe[type]" :src="iframe[type]" frameborder="0"></iframe> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      height: 600,
      config: config,
      iframe: {
        person: "/Members/Info/Person?bet=1", // 会员中心
        deposit: "/Members/Money/Recharge?bet=1", //存款
        withdrawal: "/Members/Money/Withdraw?bet=1", //取款
        orders: "/Members/Info/MyOrder?bet=1",
        test: "test.html" //测试高度用
      },
      type: "",
      loading_1: ""
    };
  },
  methods: {
    ...mapActions({
      加载中: "加载中"
    }),
    init() {
      this.加载中(true);
      this.type = this.$route.params.type;
      this.$nextTick(() => {
        setTimeout(() => {
          this.加载中(false);
        }, 500);
      });
    },
    load_1() {
      // var iframe = document.getElementById(id);
      var iframe = this.$refs.iframe;
      try {
        var height = iframe.contentWindow.document.documentElement.scrollHeight;
        this.height = height;
      } catch (error) {}
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.height = 600;
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.iframe_box {
  height: 600px;
}
iframe {
  height: 100%;
  width: 100%;
}
</style>
