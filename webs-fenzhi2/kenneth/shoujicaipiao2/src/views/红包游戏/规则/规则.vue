<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <img :src="url" alt="" srcset="">
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            url:""
        }
    },
    computed: {
        ...mapState({
            config:"config" 
        })
    },
    methods: {
        init(){
            var o = {
                    1:{
                        1:`${this.config.img_url}static/image/hbgame/saolei1.png`,
                        2:`${this.config.img_url}static/image/hbgame/saolei2.png`,
                        3:`${this.config.img_url}static/image/hbgame/saolei3.png`
                    },
                    2:{
                        1:`${this.config.img_url}static/image/hbgame/jq4.png`,
                        2:`${this.config.img_url}static/image/hbgame/jq5.png`,
                        3:`${this.config.img_url}static/image/hbgame/jq6.png`,
                    },
                    7:{
                        1:`${this.config.img_url}static/image/hbgame/niuniu_rule1-1.png`,
                        2:`${this.config.img_url}static/image/hbgame/niuniu_rule2-1.png`,
                        3:`${this.config.img_url}static/image/hbgame/niuniu_rule3-1.png`,
                    }
                }
            var k1 = this.$route.query.t1;
            var k2 = this.$route.query.t2
            this.url = o[k1][k2]
        }
    },
    mounted() {
        this.init()
    },
}
</script>

<style lang="scss" scoped>
img{
    width: 100%;
}

</style>
