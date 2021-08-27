<template>
    <div class="content">
        <div>
            <header1 :list="['开奖号码','双面统计','长龙统计','号码分析']" :active="查看类型"/>
        </div>
        <!-- 开奖号码 -->
        <div>
            <kjhm v-if="查看类型==0"/>
            <!-- 双面统计 -->
            <smtj v-if='查看类型==1'/>
            <!-- 长龙统计 -->
            <cltj v-if="查看类型==2" />
            <!-- 号码分布 -->
            <hmfb v-if="查看类型==3"/>
            <!-- 基本走势 -->
            <!-- <jbzs v-if="查看类型==4"/> -->
        </div>
    </div>
</template>


<script>
import header1 from '@/pages/开奖走势/components/头部.vue';
const kjhm=()=>import('./快乐十分开奖号码.vue');
const smtj=()=>import('./快乐十分双面统计');
const cltj=()=>import('./快乐十分长龙统计.vue');
const hmfb=()=>import('./快乐十分号码分布.vue')
// const jbzs=()=>import('./快乐十分走势.vue');
export default {
    name:"",
    components:{
        header1,
        kjhm,
        smtj,
        cltj,
        hmfb,
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
            查看类型:3,
            组件名称:""
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
