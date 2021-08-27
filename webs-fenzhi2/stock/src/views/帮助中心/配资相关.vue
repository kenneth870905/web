<template>
<div class="help ">
    <van-nav-bar class="title" title="配资相关" left-arrow :fixed="true" @click-left="onClickLeft"/>

    <ul class="help_content">

        <li  @click="$router.push('/helps/withfundingText?PZid='+item.id)" v-for="(item,index) in 常见问题 ">
            <p class="p_title">{{item.title}}</p>
            <p class="p_icon"><van-icon name="arrow" /></p>
        </li>
    </ul>

          <van-pagination   v-model="currentPage" :page-count="12" mode="simple"  />
</div>
</template>
<script>
export default {
    data() {
        return {
              currentPage: 1,
          常见问题:[
                {
                    id:1,
                    title:"1、简单五步，申请配资轻松赚钱",
                },
                {
                  id:2,
                  title:"2、如何进行配资炒股",
                },
                 {
                  id:3,
                  title:"3、配资利息多少，如何支付",
                },
                 {
                  id:4,
                  title:"4、配资对购买股票的限制",
                },
                 {
                  id:5,
                  title:"5、什么是配资风控系数",
                },
                 {
                  id:6,
                  title:"6、对于股票配资来说，其作用体现在哪",
                },
          ]
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