<template>
    <div class="content">
        <div>
            <header1 :list="['开奖号码']" :active="查看类型" :styles="{'width':'25%','flex-grow':0}"/>
        </div>

        <div>
            <kjhm />
        </div>
    </div>
</template>


<script>
import header1 from '@/pages/开奖走势/components/头部.vue';
const kjhm=()=>import('./components/时时彩开奖号码.vue');
// const smtj=()=>import('./components/时时彩双面统计.vue');
// const cltj=()=>import('./components/时时彩长龙统计.vue');
// const hmfb=()=>import('./components/时时彩号码分布.vue');
// const jbzs=()=>import('./components/时时彩走势.vue');
export default {
    name:"",
    components:{
        header1,
        kjhm,
        // smtj,
        // cltj,
        // hmfb,
        // jbzs
    },
    provide(){
        return{
            改变头部:(index)=>{
                this.查看类型=index;
            }
        }
    },
    data() {
        return {
            查看类型:0,
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    flex-direction: column;
    height: 100%;
    >div:nth-child(1){
        flex-shrink: 0;
    }
    >div:nth-child(2){
        flex-grow: 1;
        overflow: auto;
    }
}

</style>
