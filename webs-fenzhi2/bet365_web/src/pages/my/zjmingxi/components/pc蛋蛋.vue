<template>
    <ul class="购买号码">
        <li v-for="(item, index) in list" :key="index" :style="{'background':getcolor(item)}">{{item}}</li>
    </ul>
</template>

<script>
export default {
    name:'',
    props:{
        list:{
            default:()=>{
                return [];
            }
        }
    },
    data() {
        return {
            colorList:[
                {
                    color:'#6c757d',
                    name:"灰色",
                    list:[0,13,14]
                },
                {
                    color:"#28a745",
                    name:"绿色",
                    list:[1,4,7,10,16,19,22,25]
                },{
                    color:'#007bff',
                    name:"蓝色",
                    list:[2,5,8,11,17,20,23,26]
                },{
                    color:"#dc3545",
                    name:"红色",
                    list:[3,6,9,12,15,18,21,24,27]
                }
            ]
        }
    },
    methods: {
        getcolor(item1){
            var color="";
            this.colorList.forEach(item => {
                var obj=item.list.find(x=>x==item1);
                if(obj){
                    color=item.color
                } 
            });
            return color;
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.购买号码{
    display: flex;
    justify-content: center;
    margin: _vw(5) 0px 0px;
    li{
        width: _vw(20);
        height: _vw(20);
        line-height: _vw(20);
        color: #ffffff;
        font-size: _vw(10);
        text-align: center;
        margin: 0px _vw(2);
        border-radius: 100%;
    }
    img{
        width: 100%;
    }
    // $colorList:(#eedd0f, #0092dd, #4b4b4b,#ff7600,#17e2e5,#5234ff,#bfbfbf,#ff2600,#07bf00);
    // @for $i from 1 through length($colorList) {
    //     $color1:nth($colorList, $i );
    //     @if($i<10){
    //         $i:'0'+$i;
    //     }
    //     .item_#{$i}{
    //         background: $color1
    //     }
    // }
}


</style>
