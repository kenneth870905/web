<template>
    <div class="规则">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <img :src="config.img_url+'static/image/guaguale/'+type+'.png?v=0217'" alt="">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            type:1    
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    mounted() {
        this.type=this.$route.params.type;
        // console.log(this.$route.params.type)
    },
}
</script>

<style lang="scss" scoped>
.规则{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0px;
    left: 0px;
}
img{
    width: 100%;
}
</style>
