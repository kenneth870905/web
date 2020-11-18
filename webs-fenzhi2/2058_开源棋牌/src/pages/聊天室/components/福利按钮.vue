<template>
    <ul ref="福利按钮" class="悬浮按钮" :class="{'禁止':!移动中,'展开':展开}" :style="{'top':top+'px','left':left+'px'}"  @touchstart="圆心开始拖动($event)" @touchmove.prevent="圆心滑动中($event)" @touchend="圆心手指离开()">
        <li @click="展开=!展开"><img :src="config.img_url+'image/liaotian/fuli.png'" /></li>
        <li @click="$router.push('/tzjilu?back=1&state=1')"><img :src="config.img_url+'image/liaotian/fuli1.png'" /></li>
        <li @click="$router.push('/qdiframe')"><img :src="config.img_url+'image/liaotian/fuli2.png'" /></li>
        <li @click="设置key(['显示排行榜',true])"><img :src="config.img_url+'image/liaotian/fuli3.png'" /></li>
        <!-- <li @click="设置抢红包(true)"><img src="static/image/liaotian/fuli4.png" /></li> -->
        <li @click="$router.push('/teyaovip')"> <img :src="config.img_url+'image/liaotian/fuli5.png'" alt=""> </li>
    </ul>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            x:0,    //鼠标点击位置
            y:0,    
            移动中:true,
            展开:false,
            触碰y点:0,
            l:0,    //上次悬停位置
            t:0,
            left:0,
            top:0,
        }
    },
    inject:['设置抢红包'],
    computed: {
        ...mapState({

            config:'config',
            定位x:state=>state.悬浮按钮.x,
            定位y:state=>state.悬浮按钮.y,
            靠右:state=>state.悬浮按钮.靠右,
            彩票id:state=>state.投注.彩票id
        })
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        }),
        圆心开始拖动(event){
            this.移动中=true;
            //获取x坐标和y坐标
            this.x = event.touches[0].clientX;
            this.y = event.touches[0].clientY;
            // this.触碰y点=event.touches[0].clientY;
            this.l = this.$refs.福利按钮.offsetLeft;
            this.t = this.$refs.福利按钮.offsetTop;
        },
        圆心滑动中(event){
            var x=event.touches[0].clientX;
            var y=event.touches[0].clientY;
            //计算移动后的左偏移量和顶部的偏移量
            this.left = x - (this.x - this.l);
            this.top = y - (this.y - this.t);
        },
        圆心手指离开(){
            this.移动中=false;
            var ww = window.innerWidth;
            var hh=window.innerHeight;
            var x中线=ww/2;
            if(this.left + 40/2>x中线){
                this.left=ww -40 - 5;
            }else{
                this.left=5
            }
            if(this.top<200){
                this.top=200
            }else if(this.top > hh - 100 - 40){
                this.top= hh - 100 - 40
            }
        }
    },
    mounted() {
        var ww = window.innerWidth;
        var hh=window.innerHeight;
        this.left=ww - 40 - 5;
        this.top = (hh-40) /2;
    },
}
</script>

<style lang="scss" scoped>
.悬浮按钮{
    position: absolute;
    right: 0px;
    top: 50%;
    width: _vw(40);
    height: _vw(40);
    z-index: 1;

    // pointer-events: none;

    &.禁止{
        transition: all 0.5s;
    }
    li{
        position: absolute;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
        &:nth-child(1){
            z-index: 1;
        }
        transition: all 0.3s;
        &:not(:nth-child(1)){
            width: 0px;
            height: 0px;
            left: 50%;
        }
        top: 0px;
    }
    &.展开{
        li{
            @for $i from 1 through 5 {
                &:nth-child(#{$i}){
                    top:calc( -#{_vw(40)} * (#{$i} - 1 ))
                }
            }
            left: 0px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
