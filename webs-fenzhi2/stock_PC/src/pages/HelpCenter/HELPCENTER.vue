<template>
<div class="HelpCenter">
  <div class="touch">
     <h1>帮助中心</h1>
     <span class="el-icon-time"></span><span>2017-05-05</span>
  </div>
  <div class="content">
     <ul>
         <li v-for="item in items" @click="$router.push('/about/HelpCenter?id='+item.title)"  :key="item.id">

         <!-- <li @click="$router.push('/about/HelpCenter?id='+item)" :key="item.id"  v-for="item in 3" > -->
           <div>{{item.title}}</div>
            <div>{{item.time}}</div>
         </li>
     </ul>
       
</div>
</div>

</template>

<script>

export default {
  data() {
    return {
      items:[
        {id:1,title:"如何申请配资",time:"2019-4-30", text:"第一步:填写手机号 第二步：注册账号吗" },
        {id:2,title:"如何进行实名认证",time:"2019-4-16", text:"操作步骤：登录我的账户---〉实名认证---〉真实姓名---〉身份证号码---〉保存" }
        // {id:1},
        // {id:2},
        // {id:3},
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.HelpCenter{
  // 标题
      .touch{
      height:100px;
      border-bottom:1px solid #ccc;
      }
      // 内容
      .content{
      margin:10px 20px 10px 20px;
      ul{
        li{
          display:flex;
          justify-content:space-between;
             border-bottom:1px solid #ccc;
          div{
            height:40px;
            line-height:40px;
          }
        }
      }
      }

}
</style>