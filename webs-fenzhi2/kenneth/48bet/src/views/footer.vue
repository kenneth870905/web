<template>
  <div class="footer">
    <ul class="w1200 footer_1">
      <li class="赞助商">
        <div>鼎力赞助：</div>
        <div>
          <img src="static/image/footer/zanzhushang.png" alt="" srcset="" />
        </div>
      </li>
      <li class="foot_right">
        <ul class="底部导航">
          <li @click="go(item)" v-for="(item, index) in list" :key="index">
            <span>{{ item.text }}</span>
          </li>
        </ul>
        <ul class="list_1">
          <li>
            <div>安全与信任:</div>
            <div class="alist">
              <a
                class="img_1"
                target="_blank"
                href="http://www.gov.im/gambling/"
              ></a>
              <a
                class="img_2"
                target="_blank"
                href="http://www.tstglobal.com/"
              ></a>
              <a
                class="img_3"
                target="_blank"
                href="http://www.thawte.com/"
              ></a>
            </div>
          </li>
          <li>
            <div>博彩责任:</div>
            <div class="alist">
              <a
                class="img_4"
                target="_blank"
                href="/zh-cn/corporate-affairs/responsible-gaming"
              ></a>
              <a
                class="img_5"
                target="_blank"
                href="http://www.gamcare.org.uk/"
              ></a>
              <a
                class="img_6"
                target="_blank"
                href="http://www.gambleaware.co.uk/"
              ></a>
            </div>
          </li>
          <li class="支付方式">
            <div>支付方式</div>
            <div class="alist">
              <a
                class="img_7"
                href="/zh-cn/info-centre/banking-info/deposit"
                target="_blank"
              ></a>
              <a
                class="img_8"
                href="/zh-cn/info-centre/banking-info/deposit"
                target="_blank"
              ></a>
            </div>
          </li>
          <li>
            <div>社交媒体:</div>
            <div class="alist">
              <a
                class="img_9"
                href="https://www.weibo.com/login.php"
                target="_blank"
              ></a>
              <a class="img_10" href="javacsript::"></a>
              <a class="img_11" href="javacsript::"></a>
              <a class="img_12" href="javacsript::"></a>
            </div>
          </li>
        </ul>
        <ul class="list_2">
          <li>
            {{ config.title }}
            属于Cube有限公司登记注册。公司注册办事处地址Clinch's House, Lord
            Street, Douglas, Isle of Man IM1 1JD
          </li>
          <li>
            注册日期从31/08/2007(最后更新31/08/2012) 在 Isle of Man, British
            Isles
          </li>
          <li>版权所有 © 2019 {{ config.title }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      list: [
        { url: "/ContactUs", text: "联系我们" },
        { url: "/AboutUs", text: "关于我们" },
        { url: "/AccessHelp", text: "存取款帮助" },
        { url: "/guizi", text: "规则和条款" },
        { url: "/caipiaozeren", text: "博彩责任" },
        { url: "/cjwt", text: "常见问题" }
        // {url:'',text:'合作伙伴'}
      ]
    };
  },
  computed: {
    ...mapState({
      config: "config"
    })
  },
  methods: {
    go(item) {
      if (item.url) {
        this.$router.push(item.url);
      }
      document
        .querySelector("html,body")
        .scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #4d4d4d;
  background: #232323;
  color: #666;
  font-size: 12px;
  padding: 10px 0px 10px;
}
.footer_1 {
  display: flex;
  align-items: center;
  .赞助商 {
    text-align: center;
    flex-shrink: 0;
    margin: 0px 10px 0px 0px;
    div {
      margin: 10px 0px;
    }
  }
  .foot_right {
    width: 100%;
  }
}
.底部导航 {
  display: flex;
  height: 26px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #484848;
  li {
    width: 90px;
    &:not(:nth-child(1)) {
      border-left: 1px solid #484848;
    }
    span:hover {
      color: red;
      cursor: pointer;
    }
  }
}
.list_1 {
  padding: 10px 0px 10px;
  margin-bottom: 10px;
  display: flex;
  border-bottom: 1px solid #484848;
  > li:not(:nth-child(1)) {
    margin-left: 10px;
  }
  ul {
    display: flex;
  }
  .支付方式 {
    flex-grow: 1;
  }
  .alist {
    margin-top: 5px;
    display: flex;
    a {
      opacity: 0.8;
      height: 38px;
      margin: 0px 5px 0px 0px;
      background-image: url("~@/assets/image/foot_1.png");
      &:hover {
        opacity: 1;
      }
    }
  }
  .img_1 {
    width: 38px;
  }
  .img_2 {
    width: 48px;
    background-position: -43px 0px;
  }
  .img_3 {
    width: 83px;
    background-position: -90px 0px;
  }
  .img_4 {
    width: 30px;
    background-position: -181px 0px;
  }
  .img_5 {
    width: 30px;
    background-position: -217px 0px;
  }
  .img_6 {
    width: 110px;
    background-position: -249px 0px;
  }
  .img_7 {
    width: 55px;
    background-position: -366px 0px;
  }
  .img_8 {
    width: 60px;
    background-position: -423px 0px;
  }
  .img_9 {
    width: 32px;
    background-position: 163px 0px;
  }
  .img_10 {
    width: 32px;
    background-position: 129px 0px;
  }
  .img_11 {
    width: 32px;
    background-position: 98px 0px;
  }
  .img_12 {
    width: 32px;
    background-position: 68px 0px;
  }
}

.list_2 {
  font-size: 12px;
}
</style>
