<template>
    <div class="走势内容">
        <ul class="title_1">
            <li :class="{'active':走势查看==0}" @tap="走势查看=0">一位走势</li>
            <li :class="{'active':走势查看==1}" @tap="走势查看=1">二位走势</li>
            <li :class="{'active':走势查看==2}" @tap="走势查看=2">三位走势</li>
            <li :class="{'active':走势查看==3}" @tap="走势查看=3">四位走势</li>
        </ul>
        <ul class="走势列表">
            <li class="header">
                <div class="期数">期号</div>
                <div class="号码">
                    <div class="item" ref="号码item"><span>1</span> </div>
                    <div class="item"> <span>2</span> </div>
                    <div class="item"> <span>3</span> </div>
                    <div class="item"> <span>4</span> </div>
                    <div class="item"> <span>5</span> </div>
                    <div class="item"> <span>6</span> </div>
                    <div class="item"> <span>7</span> </div>
                    <div class="item"> <span>8</span> </div>
                    <div class="item"> <span>9</span> </div>
                    <div class="item"> <span>10</span> </div>
                    <div class="item"> <span>11</span> </div>
                </div>
            </li>
            <li v-for="(item, index) in 走势号码" :key="index">
                <div class="期数">05311094</div>
                <div class="号码">
                    <canvas1 :height="height" :width="item.width" :left="item.left" :start="item.start" v-if="list.length-1>index" class="canvas1"/>
                    <div class="item" :class="{'active':item.number==1}"> <span>1</span> </div>
                    <div class="item" :class="{'active':item.number==2}"> <span>2</span> </div>
                    <div class="item" :class="{'active':item.number==3}"> <span>3</span> </div>
                    <div class="item" :class="{'active':item.number==4}"> <span>4</span> </div>
                    <div class="item" :class="{'active':item.number==5}"> <span>5</span> </div>
                    <div class="item" :class="{'active':item.number==6}"> <span>6</span> </div>
                    <div class="item" :class="{'active':item.number==7}"> <span>7</span> </div>
                    <div class="item" :class="{'active':item.number==8}"> <span>8</span> </div>
                    <div class="item" :class="{'active':item.number==9}"> <span>9</span> </div>
                    <div class="item" :class="{'active':item.number==10}"> <span>10</span> </div>
                    <div class="item" :class="{'active':item.number==11}"> <span>11</span> </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import canvas1 from '../快三/components/斜线canvas';
export default {
    name:"",
    components:{
        canvas1
    },
    data() {
        return {
            走势查看:0,
            list:[
                {number:5},
                {number:2},
                {number:11},
                {number:2},
                {number:5},
                {number:9},
                {number:4},
                {number:4},
                {number:6},
                {number:2},
                {number:5},
                {number:3},
            ],
            width:0,
            height:""
        }
    },
    computed: {
        走势号码(){
            var list=this.list;
                for (let i = 0; i < list.length; i++) {
                    if(list.length-1>i){
                        if(list[i].number < list[i+1].number){
                            list[i].start = 'left';
                            list[i].left = list[i].number*this.width - this.width/2;
                        }else{
                            list[i].start = 'right';
                            list[i].left = list[i+1].number*this.width - this.width/2;
                        }
                        list[i].width = (list[i].number - list[i+1].number)*this.width;
                        list[i].width = Math.abs(list[i].width)==0 ? 1 : Math.abs(list[i].width);
                    }
                }
            return list
        },
    },
    methods: {
        获取宽度(){
            if(!this.width){
                this.width=this.$refs.号码item.offsetWidth;
                this.height=this.$refs.号码item.offsetHeight;
            }
        }
    },
    mounted() {
        this.获取宽度()
    },
}
</script>

<style lang="scss" scoped>

.走势内容{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.title_1{
    flex-shrink: 0;
    height: _vw(48);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px _vw(5);
    background: #efeff4;
    li{
        width: _vw(70);
        height: _vw(24);
        line-height: _vw(24);
        text-align: center;
        border-radius: _vw(24);
        margin: 0px _vw(10) 0px 0px;
        font-size: _vw(14);
    }
    .active{
        background: #ff7a21;
        color: #ffffff;
    }
}
.走势列表{
    flex-grow: 1;
    overflow: auto;
    font-size: _vw(13);
    text-align: center;
    >li{
        display: flex;
        height: _vw(34);
    }
    li:nth-child(2n-1):not(.header){
        background: #ffffff;
        .期数{
            background: #e8e4de
        }
    }
    .header{
        background: #e8e4de;
        position: sticky;
        top: 0px;
        z-index: 2;
    }
    .期数{
        height: 100%;
        width: _vw(75);
        line-height: _vw(34);
        flex-shrink: 0;
    }
    .号码{
        flex-grow: 1;
        display: flex;
        position: relative;
        .item {
            width: calc(100% / 6);
            border-left: 1px solid #ede9e5;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .active{
            span{
                display: block;
                width: _vw(18);
                height: _vw(18);
                background: $color;
                color: #ffffff;
                text-align: center;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
        }
    }
}
</style>
