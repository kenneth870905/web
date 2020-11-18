<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">详细设定</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="头部">
                <div class="swiper-container swiper_1" ref="swiper1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="切换类型(item)" :class="{'active':item==type1}" v-for="(item, index) in type" :key="index">{{item}}</div>
                    </div>
                </div>

                <ul class="header_1">
                    <li>项目</li>
                    <li>单项（号）限额</li>
                    <li>单注限额</li>
                </ul>
            </div>
            <div class="内容">
                <router-view :is="组件"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'

export default {
    name: "",
    data() {
        return {
            type1:"PK10",
            type: ['PK10','时时彩','快三','11选5','PC蛋蛋','六合彩','3D/P3','快乐十分','低频彩'],
            组件:""
        }
    },
    methods: {
        切换类型(item){
            this.type1=item;
            this.设置组件();
        },
        设置组件(){
            if(this.type1=='PK10'){
                this.组件=()=>import('./pk10设定.vue');
            }else if(this.type1=='时时彩'){
                this.组件=()=>import('./时时彩设定.vue');
            }else if(this.type1=='快三'){
                this.组件=()=>import('./快三设定.vue');
            }else if(this.type1=='11选5'){
                this.组件=()=>import('./11选5设定.vue');
            }else if(this.type1=='PC蛋蛋'){
                this.组件=()=>import('./pc蛋蛋设定.vue');
            }else if(this.type1=='六合彩'){
                this.组件=()=>import('./六合彩设定.vue');
            }else if(this.type1=='3D/P3'){
                this.组件=()=>import('./3d设定.vue');
            }else if(this.type1=='快乐十分'){
                this.组件=()=>import('./快乐十分设定.vue');
            }else{
                this.组件=()=>import('./其他设定.vue');
            }
        }
    },
    mounted() {
        this.设置组件()
        var swiper2 = new Swiper(this.$refs.swiper1, {
            slidesPerView : '4.5',
            observer:true,
            // loop :true, //循环
        });
    },
}
</script>

<style lang="scss" scoped>
.swiper_1{
    width: 100%;
    flex-shrink: 0;
    line-height: _vw(40);
    background: #ffffff;
    text-align: center;
    font-size: _vw(14);
    // .swiper-slide{
    //     width: 100px;
    // }
    .active{
        color: $color;
        border-bottom: 2px solid $color;
    }
}

.header_1{
    line-height: _vw(38);
    text-align: center;
    font-size: _vw(12);
    display: flex;
    background: #ffdfd7;
    li{
        width: calc(100% / 3);
    }
}



.mui-content{
    display: flex;
    flex-direction: column;   
}
.头部{
    flex-shrink: 0;
}
.内容{
    flex-grow: 1;
    overflow: auto;
    background: #ffffff;
}
</style>
