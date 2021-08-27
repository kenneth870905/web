<template>
<div class="新手指引">
  <van-nav-bar  title="元宝充值"  class="title"  left-arrow  @click-left="onClickLeft" /> 
  <h1>新手指引</h1>

</div>

</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){

    },
    computed:{

    },
    methods:{
         onClickLeft() {//头部
            history.back()
         },
    }
 
}
</script>

<style lang="scss" scoped>
.新手指引{

    .title{
        background: #ec304c; 
        margin-bottom: none; 
        /deep/.van-nav-bar__title{
        color:#ffffff !important; 
        font-size:_vw(18);           
        } 
        /deep/.van-icon{
        color:#ffffff !important;            
        }  
    }
    
}
</style>