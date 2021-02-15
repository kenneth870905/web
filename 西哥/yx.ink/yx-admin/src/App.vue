<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.分页{
  margin: 10px 0px;
  text-align: right;
}
.hide{
    display: none;
}
ul{
    padding: 0px;
    margin: 0px;
}
li{
  list-style: none;
}

//联动选择器高度
.el-cascader-menu__wrap{
  height: 350px;
}
//大图预览关闭按钮
.el-image-viewer__close{
  color:#fff;
}


</style>
