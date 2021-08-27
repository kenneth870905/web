<template>
<div class="help ">
    <van-nav-bar class="title" title="常见问题" left-arrow :fixed="true" @click-left="onClickLeft"/>

    <ul class="help_content">

        <li  @click="$router.push('/helps/issueText?id='+item.id)" v-for="(item,index) in 常见问题 ">
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
                    title:"1、如何注册会员账号？",
                    text:"打开宝贷配资（www.bdpz.com），点击官网右上角【免费注册】，系统会跳转至“注册”页面，根据页面提示信息填写注册信息，即可完成注册。",
                },
                {
                  id:2,
                  title:"2、如何进行实名认证？",
                  text:"操作步骤：登录我的账户---〉实名认证---〉真实姓名---〉身份证号码---〉保存",
                },
                 {
                  id:3,
                  title:"3、如何绑定银行卡？",
                  text:"操作步骤：登录我的账户---〉银行卡管理---〉银行卡信息---〉提交",
                },
                 {
                  id:4,
                  title:"4、如何进行账户充值？",
                  text:"操作步骤：登录我的账户---〉充值---〉付款完成---〉提交",
                },
                 {
                  id:5,
                  title:"5、如何修改登录密码？",
                  text:"操作步骤：登录我的账户---〉登录密码---〉新密码---〉保存",
                },
                 {
                  id:6,
                  title:"6、怎么找回登录密码？",
                  text:"打开官网“www.bdpz.com”点击网站右上角【立即登录】点击“忘记密码”，通过手机短信验证码进行找回。",
                },
                 {
                  id:7,
                  title:"7、如何申请配资方案？",
                  text:"操作步骤：登录我的账户---〉按天配资/按月配资---〉操作完成---〉立即操盘",
                },
                 {
                  id:8,
                  title:"8、如何提取操盘盈利？",
                  text:"操作步骤：登录我的账户---〉配资订单---〉盈利提取---〉确认",
                },
                {
                  id:9,
                  title:"9、如何申请提现？",
                  text:"操作步骤：登录我的账户---〉提现---〉提款金额---〉选择提款银行卡---〉提交",
                },
                {
                  id:10,
                  title:"10、如何追加保证金？",
                  text:"操作步骤：登录我的账户---〉配资订单---〉追加保证金---〉输入金额---〉确认",
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