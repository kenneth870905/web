<template>
    <div class="引导" :style="{'z-index':zIndex,position:position }">
        <div @click="结束引导()">
            <span>我无需要引导 </span>
            <i class="icon iconfont icon-guanbi"></i>
        </div>
        <img :src="config.img_url + 'static/image/yindao/jiantou2.png'" alt="">
    </div>
</template>

<script>
import { api_设置vip引导 } from "@/api/特邀嘉宾.js";
import { mapState, mapMutations } from "vuex";
export default {
    name:"",
    props:{
        zIndex:{
            default:0
        },
        position:{
            default:'fixed'
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config",
            特邀引导:x=>x.引导.特邀引导
        })
    },
    methods: {
        ...mapMutations({
            设置state:"设置state",
            M特邀引导:"引导/M特邀引导"
        }),
        bodyScroll(event){
            event.preventDefault();
        },
        结束引导(){
            console.log('点击了结束')
            // 特邀引导
            this.$dialog.confirm({
                title: '提示',
                message: '确定要跳过特邀引导吗？'
            }).then(() => {
                this.特邀引导.步骤 = 0
                this.M特邀引导(['引导结束',true])
                api_设置vip引导(true)
            }).catch(() => {});
        }
    },
    mounted() {
        //  document.body.style.overflow='hidden';
        // document.body.addEventListener('touchmove',this.bodyScroll,false)
        // document.addEventListener('touchmove', this.bodyScroll,false);
        // document.querySelector('html').addEventListener('touchmove',this.bodyScroll,false)
    },
}
</script>

<style lang="scss" scoped>
.引导{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    // pointer-events:none;
    div{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #ffffff;
        font-size: 14px;
    }
    img{
        position: absolute;
        top: 40px;
        right: 40px;
        transform: rotate(-90deg);
        width: 30px;
    }
}
</style>

