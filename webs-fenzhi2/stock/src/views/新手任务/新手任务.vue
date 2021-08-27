<template>
<div class="新手任务">
        <van-nav-bar title="新手任务" :z-index="10" left-arrow @click-left="$back()"/>
  
          <div class="content">
           <div class="img_box"><img src="../../assets/img/xsrw_banner@2x.png" alt=""></div>
            

          </div>
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
  }
}


</script>
<style lang="scss" scoped>
.新手任务{
    position: absolute;
    width: 100%;
    height: 100%;
    // height:800px;
    background: #ffffff;
    .content{
        // padding-top:_vw(60);
        .img_box{
            width: 100%;
            height: _vw(140);
            img{
                width: 100%;
                height:100%;
            }
        }
    }
}
</style>