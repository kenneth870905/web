<template>
  <div>
    <!-- <input v-model="user.uid" type="text" placeholder="账号" />
    <input v-model="user.pwd" type="text" placeholder="密码" />
    <br />
    <input type="text" v-model="user.code" @focus="focus1" @keyup.enter="登录()" placeholder="登录" />
    <div @click="改变验证码()" class="验证码地址">-->
    <!-- <img src="https://0698aa.com/Home/Verify?v="> -->
    <!-- <img  :src="验证码地址" />
    </div>
    <button @click="登录()">登录</button>-->
    <span>{{resData.Name}}</span>
  </div>
</template>

<script>
import axios from "axios";
import { api_密码登录 } from "@/api/登录接口.js";
import JSEncrypt from "jsencrypt";

export default {
  data() {
    return {
      验证码地址: "",
      resData: [],
      user: {
        uid: "",
        pwd: "",
        code: ""
      }
    };
  },
  methods: {
    get() {
      var url = "https://0698aa.com/Systems/Activity/InfoGetList";
      axios.post(url, { home: true }).then(function(res) {
        var resData = res.data;
        console.log(resData);
        // this.resData = resData;
      });
    }
  },

  created() {
    this.get();
  }
};
</script>

<style>
.item img {
  width: 100%;
}
</style>
