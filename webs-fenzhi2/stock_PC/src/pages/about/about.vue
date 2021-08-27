<template>
  <div class="about">
    <div class="container ">
      <div class="zs"></div>
      <el-row>
        <el-col :span="4">
          <Navcontact></Navcontact>
        </el-col>
        <el-col :span="20" class="zp" >
               <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import Navcontact from "@/components/Navcontact/navcontact.vue";
export default {
  data() {
    return {
      num: 0
    };
  },
  components: {
    // 注册组件
    //  Home,
    Navcontact
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.about{
  min-height:600px;
  background: #F5F5F5;
 .container {
  //版心
  width: 1200px;
  margin: 0 auto;
  .zs{
    height:5px;
    background-color:#BB9767;
  }
  .zp{
    padding:15px 0px 0px 15px;
  }

}
}

</style>