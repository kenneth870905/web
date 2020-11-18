<template>
<div class="help ">
    <van-nav-bar class="title" title="帮助中心" left-arrow :fixed="true" @click-left="onClickLeft"/>

    <ul class="help_content">

        <li @click="$router.push('/helps/novia')">
            <p class="p_title">新手指南</p>
            <p class="p_icon"   ><van-icon name="arrow" /></p>
        </li>

           <li  @click="$router.push('/helps/issue')">
            <p class="p_title">常见问题</p>
            <p class="p_icon" ><van-icon name="arrow" /></p>
           </li>

           <li  @click="$router.push('/helps/withfunding')">
            <p class="p_title">配资相关</p>
            <p class="p_icon" ><van-icon name="arrow" /></p>
           </li>

             <li  @click="$router.push('/helps/registerAgreement')">
            <p class="p_title">注册协议</p>
            <p class="p_icon" ><van-icon name="arrow" /></p>
           </li>

             <li   @click="$router.push('/APP')">
            <p class="p_title">APP下载</p>
            <p class="p_icon"><van-icon name="arrow" /></p>
           </li>
        
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
    .help_content{
        padding:_vw(20) ;
        padding:0px _vw(20)  _vw(20)  _vw(20);
        background: #ffffff;
      li{
          display:flex;
          justify-content:space-between;
          border-bottom:1px solid #ccc;
          line-height: _vw(54);
          height:_vw(54);
        .p_title{
          font-size: _vw(16);           
        }
        .p_icon{
          color:#ccc;
          font-size: _vw(22);
        }
      }
    }
}
</style>