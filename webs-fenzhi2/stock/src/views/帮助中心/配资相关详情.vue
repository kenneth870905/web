<template>
    <div class="chongzhi">
           <div v-if="id==1">
             <van-nav-bar  title="1、简单五步，申请配资轻松赚钱"  left-arrow :fixed="true" @click-left="onClickLeft"/>   
                  <p>选择配资产品 > 填写配资申请 > 配资机构审核 > 确认缴纳保证金 > 获取交易账号炒股。</p>
                  <p>宝贷配资提供三种配资产品：</p>
           </div>

             <div v-if="id==2">
             <van-nav-bar  title="2、如何进行配资炒股"  left-arrow :fixed="true" @click-left="onClickLeft"/>   
                  <p>选择配资产品 > 填写配资申请 > 配资机构审核 > 确认缴纳保证金 > 获取交易账号炒股。</p>
                  <p>宝贷配资提供三种配资产品：</p>
           </div>
           

             <div v-if="id==3">
             <van-nav-bar  title="3、配资利息多少，如何支付"  left-arrow :fixed="true" @click-left="onClickLeft"/>   
                  <p>选择配资产品 > 填写配资申请 > 配资机构审核 > 确认缴纳保证金 > 获取交易账号炒股。</p>
                  <p>宝贷配资提供三种配资产品：</p>
           </div>

              <div v-if="id==4">
             <van-nav-bar  title="4、配资对购买股票的限制"  left-arrow :fixed="true" @click-left="onClickLeft"/>   
                  <p>选择配资产品 > 填写配资申请 > 配资机构审核 > 确认缴纳保证金 > 获取交易账号炒股。</p>
                  <p>宝贷配资提供三种配资产品：</p>
           </div>
     </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
    },
    data() {
        return {
           id:"",  
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
    created(){
         this.id=this.$route.query.PZid
    //  
    },
    methods: {
        onClickLeft(){
            history.back()
        },
    },
}
</script>

<style lang="scss" scoped>

.chongzhi{
    padding-top:_vw(50);
    background: #ffffff;
     height: 100%;
    .van-nav-bar{
    font-size: _vw(22);
    }
    .chongzhi_content{
        height: 100%;
        padding:_vw(60) _vw(20) _vw(20) _vw(20);
        text-indent: _vw(20)
    }
 }
</style>

