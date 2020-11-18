<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">找回密码</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="list">
                <!-- <li @click="$router.push('/zhmm')">  -->
                <li @click="跳转客服()">
                    <img :src="config.img_url+'static/image/kefu.png'" alt="" srcset="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {}
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        跳转客服(){
            if (window.plus) {
                plus.runtime.openURL(config.online_chat);
            }else if (window.webkit) {
                window.webkit.messageHandlers.FillMoney.postMessage({ link: config.online_chat });
            }else {
                window.open(config.online_chat)            
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    padding: _vw(10);
    li{
        margin: 0px 0px _vw(10);
    }
    img{
        width: 100%;
    }
}
</style>
