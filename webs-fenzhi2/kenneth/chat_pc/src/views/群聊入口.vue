<template>
    <div class="聊天室入口">
        <el-main class="main">
            <!-- 房间选择 -->
            <room class="房间列表"/>
            <!-- 消息 -->
            <xiaoxi class="消息列表"/>
        </el-main>
        <div class="footer">
            <footer1 />
        </div>
        <!-- 最新中奖 -->
        <zxzj />
        <!-- 福利按钮 -->
        <fuli />
        <!-- 发布红包 -->
        <hbfb />

        <!-- <button @click="$refs.yanhua.开始()">打开烟花</button> -->
        
        <yanhua ref="yanhua"/>
    </div>
</template>

<script>
const room = ()=>import('@/views/房间.vue');
const xiaoxi = () =>import('@/views/消息/消息.vue');
const footer1 = ()=>import('@/views/底部.vue');
const zxzj = () =>import('@/components/最新中奖.vue');
const fuli = () =>import('@/components/福利按钮.vue');
const hbfb = () =>import('./红包/发布红包.vue');
// 烟花
const yanhua = () =>import('@/components/烟花.vue');

import { mapState, mapMutations , mapActions } from "vuex";
export default {
    name:"",
    components:{
        room,
        xiaoxi,
        footer1,
        zxzj,
        fuli,
        hbfb,
        // 烟花
        yanhua
    },
    provide(){
        return{
            打开烟花:()=>{
                this.$refs.yanhua.开始()
            },
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            当前房间:x=>x.聊天室.当前房间 
        })
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        })
    },
    mounted() {
        if(!this.当前房间.Id){
            this.设置key(['显示选房',true])
        }
        
    },
}
</script>

<style lang="scss" scoped>
.聊天室入口{
    height: 100%;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}
.main{
    padding: 0px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 170px);
    flex-grow: 1;
    .房间列表{
        flex-shrink: 0;
    }
    .消息列表{
        flex:1;
        height: 100%;
        overflow: auto;
    }
}
.footer{
    padding: 0px;
    flex-shrink: 0;
}
</style>