<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">群信息</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="userlist">
                <li v-for="(item, index) in 20" :key="index">
                    <div>
                        <img :src="config.img_url + 'static/image/hbgame/22.png'" alt="" srcset="">
                    </div>
                    <div>张三</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { api_获取在线会员 } from "@/api/聊天室接口.js";
export default {
    name:"",
    data() {
        return {
            userList:[]
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        
    },
    mounted() {
        api_获取在线会员().then(x=>{
            console.log(x)
        }).catch(err=>{
            console.log(err)
        })
    },
    
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffffff;
}
.userlist{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    >li{
        width: 20%;
    }
}
</style>
