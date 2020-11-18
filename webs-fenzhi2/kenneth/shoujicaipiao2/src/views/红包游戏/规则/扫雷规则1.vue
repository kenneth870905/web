<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="img_list">
                <li>
                    <img :src="config.img_url+'static/image/hbgame/saolei_1.jpg'" alt="" srcset="">
                </li>
                <li>
                    <img :src="config.img_url+'static/image/hbgame/saolei_2.jpg'" alt="" srcset="">
                </li>
                <li>
                    <img :src="config.img_url+'static/image/hbgame/saolei_3.jpg'" alt="" srcset="">
                </li>
                <li>
                    <img :src="config.img_url+'static/image/hbgame/saolei_4.jpg'" alt="" srcset="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
}
</script>

<style lang="scss" scoped>
.img_list{
    font-size: 0px;
    img{
        width: 100%;
    }
    li{
        background: #fffbff;
    }
    li:nth-child(1){
        margin: 0px 0px 10px 0px;
    }
    li:nth-child(3){
        margin: 0px 0px 10px 0px;
        padding: 0px 0px 10px 0px;
    }
}
</style>
