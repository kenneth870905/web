<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                额度转换
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="头部">
                <li :class="{'active':type==0}" @click="type=0">转换额度</li>
                <li :class="{'active':type==1}" @click="type=1">转换记录</li>
                <!-- <li :class="{'active':type==2}" @click="type=2">投注记录</li> -->
            </ul>

            <!-- 额度转换 -->
            <keep-alive>
                <edzh v-if="type==0"/>        
            </keep-alive>
            <!-- 转换记录 -->
            <zhjl v-if="type==1"/>
        </div>
    </div>
</template>
<script>
const edzh=()=>import('./components/额度转换.vue');
const zhjl=()=>import('./components/转换记录.vue')
export default {
    name: "",
    components:{
        edzh,
        zhjl
    },
    data() {
        return {
            type:0,
        }
    },
    methods: {
       
    },
}
</script>

<style lang="scss" scoped>

.头部{
    height: _vw(40);
    line-height: _vw(40);
    text-align: center;
    font-size: _vw(14);
    background: #ffffff;
    display: flex;
    li{
        width: calc(100% / 2);
    }
    .active{
        color: $color;
        border-bottom: 1px solid $color;
    }
}

</style>
