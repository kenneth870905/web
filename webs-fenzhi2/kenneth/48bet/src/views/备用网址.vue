<template>
  <div>
    <div class="img_box">
      <img src="static/image/bywz/bj2.png" alt="" />
    </div>

    <ul class="网址列表">
      <li v-for="(item, index) in cesu_list" :key="index">
        <div>{{ item.url }}</div>
        <div><span>→</span> 时间：{{ 计算时间(item.time) }}</div>
        <div>
          <span>→</span>
          <a :href="item.url" target="_blank">打开链接</a>
        </div>
        <img :src="item.url + '/' + time" @error="error(item)" />
      </li>
    </ul>

    <!-- <button class="btn_1">重新测速</button> -->
    <div class="btn_1">
      <el-button type="warning" @click="开始测速()" size="small" plain
        >重新检测访问速度</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cesu_list: config.cesu_list,
      time: ""
    };
  },
  methods: {
    计算时间(time) {
      if (!time) {
        return "测速中···";
      } else {
        return time > this.time ? time - this.time + "ms" : "测速中···";
      }
    },
    开始测速() {
      var date = new Date();
      this.time = date.getTime();
    },
    error(item) {
      console.log("结束");
      var date1 = new Date();
      this.$set(item, "time", date1.getTime());
    }
  },
  mounted() {
    this.开始测速();
  }
};
</script>

<style lang="scss" scoped>
.img_box {
  text-align: center;
  overflow: hidden;
  height: 150px;
}
.网址列表 {
  font-size: 14px;
  width: 600px;
  margin: 0px auto;
  > li {
    margin: 10px 0px 0px;
    border-bottom: 1px solid #cccccc;
    padding: 0px 10px;
    display: flex;
    height: 30px;
    align-items: center;
    div {
      &:nth-child(1) {
        width: 45%;
        flex-shrink: 0;
        white-space: nowrap;
      }
      &:nth-child(2) {
        flex-grow: 1;
        width: 100%;
      }
      &:nth-child(3) {
        flex-shrink: 0;
        white-space: nowrap;
        display: flex;
        align-items: center;
        span {
          margin: 0px 5px 0px 0px;
        }
      }
    }
    a {
      width: 64px;
      height: 26px;
      background: linear-gradient(180deg, #fffff3, #f6eb43, #fffaba);
      display: inline-block;
      color: #000000;
      text-decoration: none;
      font-size: 12px;
      line-height: 26px;
      text-align: center;
      transition: all 0.3s;
      &:hover {
        background: linear-gradient(180deg, #ffff77, #c1b71b, #fdf04e);
      }
    }
    img {
      display: none;
    }
  }
}
.btn_1 {
  text-align: center;
  margin: 30px 0px 30px;
  button {
    width: 220px;
  }
}
</style>
