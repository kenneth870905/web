<template>
    <div class="刮奖">
        <div @click="返回()" class="关闭">
            <i class=" icon iconfont icon-guanbi"></i>
        </div>
        <iframe v-if="src" :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            type:"",
            id:""
        }
    },
    computed: {
        src(){
            if(!this.type || !this.id){
                return '';
            }else{
                return config.iframe_url+'/M/ScratchCard/Card/'+this.id+'?t='+this.type+'&m1=1'
            }
        }
    },
    methods: {
        返回(){
            history.back();
        }
    },
    mounted() {
        this.type = this.$route.params.type;
        this.id = this.$route.params.id;
    },
}
</script>

<style lang="scss" scoped>
.刮奖{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #ffffff;
    .关闭{
        position: absolute;
        top: _vw(10);
        left: _vw(10);
        color: #ffffff;
        width: _vw(34);
        height: _vw(34);
        background: rgba(0,0,0,0.7);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>
