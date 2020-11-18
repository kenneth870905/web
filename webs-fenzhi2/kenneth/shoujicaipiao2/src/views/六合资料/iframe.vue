<template>
    <div>
         <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{title}}</h1>
            <!-- <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">类型</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <iframe @load="加载完成()" :src="src" frameborder="0" ></iframe>
        </div>
    </div>
</template>

<script>
import { mapState , mapMutations} from "vuex";
export default {
    name:"",
    data() {
        return {
            src:"",
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        title(){
            return this.$route.query.n
        }
    },
    methods: {
        ...mapMutations({
            加载中:'加载中'
        }),
        加载完成(){
            setTimeout(() => {
                this.加载中(false);
            }, 500);
        }
    },
    mounted() {
        this.加载中(true);
        this.src = this.config.iframe_url+'/M/System/NewsInfo/'+this.$route.query.i;
    },
}
</script>

<style lang="scss" scoped>
.mui-title{
    font-size: 14px;
}
iframe{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
