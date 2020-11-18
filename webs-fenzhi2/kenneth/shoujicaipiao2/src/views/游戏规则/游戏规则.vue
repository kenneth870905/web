<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <div class="title_1" @click="选中彩票()">{{type1}} <i class="icon iconfont icon-arrow-bottom"></i> </div>
            </h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="切换类型 mui-segmented-control mui-segmented-control-inverted mui-segmented-control-negative">
                <a class="mui-control-item mui-active" @click="切换类型2(0)">彩种介绍</a>
                <a class="mui-control-item"  @click="切换类型2(1)">官方玩法规则</a>
                <a class="mui-control-item"  @click="切换类型2(2)">信用玩法规则</a>
            </div>
            <!-- <div class="swiper-container swiper_1" ref="swiper1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" @click="切换类型(item)" :class="{'active':item==type1}" v-for="(item, index) in type" :key="index">{{item}}</div>
                </div>
            </div> -->
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
            type2:0,
            type: ['PK10','时时彩','快三','11选5','PC蛋蛋','六合彩','3D/P3','快乐十分','其他彩票'],
            组件:""
        }
    },
    methods: {
        选中彩票(){
            var picker = new mui.PopPicker(); 
            var list=[
                    {'text':'PK10',value:'PK10'},
                    {'text':'时时彩',value:'时时彩'},
                    {'text':'快三',value:'快三'},
                    {'text':'11选5',value:'11选5'},
                    {'text':'PC蛋蛋',value:'PC蛋蛋'},
                    {'text':'六合彩',value:'六合彩'},
                    {'text':'低频彩',value:'低频彩'}
                ]
                picker.setData(list); 
                picker.show((items)=>{
                    console.log(items);
                    this.type1=items[0].value;

                    this.$router.replace('?t1='+this.type1)
                    this.设置组件();
                    picker.dispose();
                    picker = null;
                })
        },
        切换类型2(index){
            this.type2=index;
            this.设置组件();
        },
        切换类型(item){
            // this.type1=item;
            // this.设置组件();
        },
        设置组件(){
            var 文件夹名=""
            if(this.type2==0){
                文件夹名='彩种介绍'
            }else if(this.type2==1){
                文件夹名="官方"
            }else{
                文件夹名="信用"
            }
            this.组件=()=>import('./'+文件夹名+'/'+this.type1+'.vue');
        }
    },
    mounted() {
        if(this.$route.query.i){
            //传入彩票id 如 10000
            let type=this.$route.query.i.substring(0,2);
            let type2={
                    10:'时时彩',
                    20:"PK10",
                    30:"其他彩票",
                    40:"快三",
                    50:"PC蛋蛋",
                    60:"11选5",
                    70:"六合彩",
                }
            this.type1 = type2[type] ? type2[type] : '';
        }else if(this.$route.query.t1){
            //传入彩票类型
            this.type1=this.$route.query.t1
        }
        this.设置组件()
    },
}
</script>

<style lang="scss" scoped>
.mui-fullscreen{
    height: 100%;
}
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

.mui-title{
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        width: 100px;
        border: 1px solid #ffffff;
        line-height: 26px;
        i{
            font-size: 14px;
        }
    }
}

.切换类型{
    background: #ffffff;
    flex-shrink: 0;
    border-bottom: 1px solid #cccccc;
}

.mui-content{
    display: flex;
    flex-direction: column;   
}
.内容{
    background: #ffffff;
    flex-grow: 1;
    overflow: auto;
}
</style>
