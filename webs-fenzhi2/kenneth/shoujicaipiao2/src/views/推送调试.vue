<template>
    <div>
        <header class="mui-bar mui-bar-nav">
                <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">推送测试</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <input type="text" v-model="cid">
            <button @click="操作()" type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">Block button</button>
            <div>{{pinf}}</div>
            <div v-html="msgTest"></div>
            <div>跳转内部网址</div>
            <input type="text" v-model="url">
            <button @click="跳转()" type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">跳转</button>
            <div>function test 测试 </div>
            <textarea v-model="func" name="" id="" cols="30" rows="10"></textarea>
            <button @click="测试()" type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">跳转</button>
            
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import qs from 'qs'
export default {
    name:"",
    data() {
        return {
            pinf:"",
            cid:"",
            msgTest:"",

            url:"",
            func:`window.test = ()=>{alert('这只是一个测试')}`
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        跳转(){
            if(this.url){
                this.$router.push(`/ifr/zdy?u=${this.url}`)
            }
        },
        测试(){
            eval(this.func);
            window.test()
        },
        plusready(){
            var this_1 = this;
            this.pinf = plus.push.getClientInfo();
            this.cid = this.pinf.clientid;//客户端标识
            //监听接收透传消息事件  
            plus.push.addEventListener('receive', function (msg) {
                //处理透传消息的业务逻辑代码  
                alert("推送信息" + JSON.parse(msg.payload).PageId);
                this_1.msgTest= ''
                // var $msgTest = $("#msgTest");
                // $msgTest.html('');
                for (var item in msg) {
                    // $msgTest.append(item + ':' + msg[item] + '<br>');
                    this_1.msgTest = item + ':' + msg[item] + '<br>'
                }

                try{
                    plus.runtime.setBadgeNumber(0);
                    if(mui.os.ios){
                        var GeTuiSdk = plus.ios.importClass('GeTuiSdk');  
                        GeTuiSdk.setBadge(0);  
                    }
                    console.log("清除角标")
                }catch(e){
                    alert('清除角标异常')
                }
                plus.push.clear();
            }, false);
        },
        操作(){
            this.$axios.post(this.config.api_url+'/MApi/PrivateChat/PushTest',qs.stringify({cid:this.cid}) ).then(x=>{
                alert(JSON.stringify(x))
            }).catch(err=>{
                alert('错误：'+JSON.stringify(err))
            })
        }
    },
    mounted() {
        if(window.plus){
            this.plusready()
        }else{
            document.addEventListener('plusready',this.plusready)
        }

    },
}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 16px
}
</style>
