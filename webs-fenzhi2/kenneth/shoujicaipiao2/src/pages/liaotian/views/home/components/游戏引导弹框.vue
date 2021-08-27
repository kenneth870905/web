<template>
    <div class="引导弹框">
        <div class="mask"></div>
        <div class="tkContent">
            <div><img :src="config.img_url + 'static/image/yindao/HB3_01.png'" alt="" srcset=""></div>
            <div><img @click="选择类型('棋牌','')" :src="config.img_url + 'static/image/yindao/HB3_02.png'" alt="" srcset=""></div>
            <div><img @click="选择类型('电子','')" :src="config.img_url + 'static/image/yindao/HB3_03.png'" alt="" srcset=""></div>
            <div><img @click="选择类型('捕鱼','')" :src="config.img_url + 'static/image/yindao/HB3_04.png'" alt="" srcset=""></div>
            <div><img @click="选择类型('电子','电子2')" :src="config.img_url + 'static/image/yindao/HB3_05.png'" alt="" srcset=""></div>
            <div><img :src="config.img_url + 'static/image/yindao/HB3_06.png'" alt="" srcset=""></div>
            <!-- <ul>
                <li @click="选择类型('棋牌')"></li>
                <li @click="选择类型('电子')"></li>
                <li @click="选择类型('捕鱼')"></li>
                <li @click="选择类型('真人')"></li>
                <li @click="选择类型('体育')"></li>
                <li @click="选择类型('彩票')"></li>
            </ul> -->
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
            config:"config" ,
            特邀引导:x=>x.引导.特邀引导
        })
    },
    methods: {
        选择类型(name,name1){
            this.特邀引导.gameName = name
            this.特邀引导.gameName_2 = name1
            this.特邀引导.步骤 = 4;
        }
    },
}
</script>

<style lang="scss" scoped>
.引导弹框{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top:0px;
        background: rgba(0,0,0,0.7);
    }
    .tkContent{
        z-index: 1;
        max-width: 70%;
        position: relative;
        font-size: 0px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>

