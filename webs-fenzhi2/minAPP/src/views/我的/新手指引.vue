<template>
<div class="新手指引">
    <van-nav-bar  title="新手指引"  class="title"  left-arrow  @click-left="onClickLeft" /> 

    <div class="content">
        <h4>关于元宝和经验</h4>
        <p>元宝可以兑换相应的经验 ，拥有较高的经验值才能段位升级 ，不同的段位每日免费浏览的资源不同   兑换比列1:1</p>

        <h4>关于任务</h4>
        <p>周任务和每日任务 必须完成，否者将不能获得等级对应的奖励</p>
    </div>
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
    position: absolute;
    left: 0px;
    top:0px;
    background: #ffffff;
    overflow-x:auto;
    width: 100%;
    height: 100%;
    .content{
         padding:_vw(10);
         font-size: _vw(14);
    }
    .title{
          background: #ec304c; 
          margin-bottom: none; 
           /deep/.van-nav-bar__title{
           color:#ffffff !important; 
             font-size:_vw(18) !important;           
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
        }
}
</style>