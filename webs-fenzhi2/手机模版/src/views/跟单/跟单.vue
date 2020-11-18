<template>
<div class="help">
    <van-nav-bar class="title" title="小说" left-arrow :fixed="true" @click-left="onClickLeft"/>

    <ul class="help_content">

    </ul>
</div>
</template>
<script>
export default {
    data() {
        return {
         
        }
    },
    components: { // 注册组件
       
    },
    created() {
      
        
    },
    computed: {
        
    },
      methods: {
        onClickLeft(){//头部
            history.back()
        },
       
    },
}


</script>
<style lang="scss" scoped>
.van-nav-bar{
    height: _vw(56);
  line-height: _vw(56);
}

p{
    margin: 0px;
}
.help{
    padding-top:_vw(47);
    // height:800px;
   
}
</style>