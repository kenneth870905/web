<template>
    <div class="mui-fullscreen">
        <iframe @load="load1()" :src="config.online_chat" frameborder="0"></iframe>
        <!-- <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">在线客服</h1>
        </header>
        <div class="mui-content mui-fullscreen">

        </div> -->
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config' 
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        load1(){
            setTimeout(() => {  
               this.加载中(false)                
            }, 500);
        }
    },
    mounted() {
        this.加载中(true)
    },
}
</script>

<style lang="scss" scoped>
iframe{
    width: 100%;
    min-height: 100%;
}
</style>