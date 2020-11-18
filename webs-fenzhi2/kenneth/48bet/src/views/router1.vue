<template>
  <div class="line">
    <div class="banner">
      <img src="static/image/line/1.jpg" alt="" srcset="" />
    </div>
    <div class="w1200 router_box">
      <gdtz />

      <div class="content">
        <div class="left">
          <div class="img_box">
            <img src="static/image/about_title.jpg" alt="" srcset="" />
          </div>
          <ul class="list1">
            <router-link tag="li" to="/register">免费注册</router-link>
            <li>
              <a
                :href="config.iframe_url + '/Lottery/Home/Index/1'"
                target="view_window"
              >
                体育投注
              </a>
            </li>
            <router-link tag="li" to="/visual">真人娱乐</router-link>
            <router-link tag="li" to="/game">电子游艺</router-link>
            <router-link tag="li" to="/lottery">彩票游戏</router-link>
            <router-link tag="li" to="/bywz">备用网址</router-link>
            <router-link tag="li" to="/activity">优惠活动</router-link>
          </ul>
          <div class="img_box">
            <img src="static/image/about_bottom.jpg" alt="" srcset="" />
          </div>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gdtz from "@/components/滚动通知.vue";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    gdtz
  },
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
.line {
  background: #232323;
}
.banner {
  img {
    width: 100%;
  }
}
.content {
  display: flex;
}
.left {
  flex-shrink: 0;
  width: 220px;
  // margin: 0px 10px 0px 0px;
  .img_box {
    font-size: 0px;
    img {
      width: 100%;
    }
  }
  .list1 {
    li {
      cursor: pointer;
      display: block;
      height: 32px;
      width: 220px;
      line-height: 32px;
      color: #fcdcda;
      text-align: center;
      text-decoration: none;
      background: url("~@/assets/image/about_btn.jpg") center top;
      &:hover {
        color: #ffcc00;
        background: url("~@/assets/image/about_btn.jpg") no-repeat center bottom;
      }
      &.router-link-active {
        color: #ffcc00;
        background: url("~@/assets/image/about_btn.jpg") no-repeat center bottom;
      }
      a {
        color: inherit;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
      }
    }
  }
}
.right {
  width: 100%;
  flex-grow: 1;
}
.router_box {
  background: #3a3a3a;
}
</style>
