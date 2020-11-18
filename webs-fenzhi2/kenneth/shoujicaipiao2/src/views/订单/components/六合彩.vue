<template>
    <ul class="购买号码">
        <li v-for="(item, index) in list" :key="index">
            <div class="球" :class="getColor(item).color">{{item}}</div>
            <div class="生肖">{{getColor(item).sx}}</div>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
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
            
        }
    },
    computed: {
        ...mapState({
            marSixNums:x=>x.marSixNums
        }),
    },
    methods: {
        getColor(number){
            var colorCode=this.marSixNums.nums[number];
            return colorCode;
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
        text-align: center;
        .球{
             width: _vw(20);
            height: _vw(20);
            line-height: _vw(20);
            color: #ffffff;
            font-size: _vw(10);
            text-align: center;
            margin: 0px _vw(2);
            border-radius: 100%;
            &.红{
                background: #dc3545;
            }
            &.蓝{
                background: #007bff;
            }
            &.绿{
                background: #28a745;
            }
        }
        .生肖{
            color: #171717;
            font-size: _vw(12)
        }
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
