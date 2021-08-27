<template>
    <div class="fot">
       <div class="w1280 box-1">
           <div class="item">
               <div class="title-1">
                    联系我们
               </div>
               <p>
                    飞机：{{飞机 ? 飞机.content : ""}}
                    <br>
                    微信：{{weixin ? weixin.content : ''}}
                    <br>
                    手机：{{phone ? phone.content : ''}}
                    <br>
               </p>
           </div>
           <div class="item">
                <div class="title-1">
                   运费说明
                </div>
                <p>一件起送</p>
                <p>满{{baoyou ? baoyou.content : ''}}p包邮</p>
                <p>不满则运费到付</p>
                <p>换货运费自行承担</p>
           </div>
           <div class="item">
                <div class="title-1">付款方式</div>
                <p>支付宝、微信</p>
                <p>现金货到付款</p>
                <p>收款账号联系客服获取</p>
           </div>
       </div>
       <div class="box-2">
           © YiShang 2021
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            basic:"basic"
        }),
        飞机(){
            return this.basic.find(x=>x.keyName=='telegram')
        },
        weixin(){
            return this.basic.find(x=>x.keyName=='weixin')
        },
        phone(){
            return this.basic.find(x=>x.keyName=='phone')
        },
        wechatQR(){
            return this.basic.find(x=>x.keyName=='wechatQR')
        },
        baoyou(){
            return this.basic.find(x=>x.keyName=='baoyou')
        }
    }
}
</script>

<style lang="scss" scoped>
.fot{
    background: #fff;
    padding: 50px 0px 0px;
    color: #6c6c6c ;
    border-top: 1px solid #eee;
}
.box-1{
    display: flex;
    .item{
        width: 33%;
        
    }
    .title-1{
        font-size: 24px;
        margin: 0px 0px 40px;
    }
    p{
        font-size: 14px;
    }
}

.box-2{
    line-height: 44px;
    text-align: center;
    border-top: 1px solid #eee;
}
</style>