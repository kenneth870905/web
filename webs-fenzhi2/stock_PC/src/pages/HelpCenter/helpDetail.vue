<template>
    <div>
         <div v-wechat-title="$route.meta.title=indexTitle"></div>
        <h1>我是帮助中心的明细页面</h1>
        <div>{{id.text}}</div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            indexTitle:"",
            id:"",
            item:[
        {id:1,title:"如何申请配资",time:"2019-4-30", text:"第一步:填写手机号 第二步：注册账号吗" },
        {id:2,title:"如何进行实名认证",time:"2019-4-16", text:"操作步骤：登录我的账户---〉实名认证---〉真实姓名---〉身份证号码---〉保存" }
        // {id:1},
        // {id:2},
        // {id:3},
      ]


        }
    },
    mounted(){
        //获取id
        this.id=this.$route.query.id;
        // 把id的值赋值给title
        this.indexTitle=this.$route.query.id;
        // console.log(this.$route)
    }
}
</script>
