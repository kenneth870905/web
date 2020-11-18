<template>
    <ul class="号码">
        <li v-for="(item, index) in 球组" v-if="index<球组.length-1" :key="index">
            <!-- <div class="圆球" :class="{'红':(item%6==1 || item%6==2),'蓝':(item%6==3 || item%6==4),'绿':(item%6==5 || item%6==0)}">{{item}}</div> -->
            <div class="圆球" :class="marSixNums.nums[item].color">{{item}}</div>
            <div class="生肖">
                {{marSixNums.nums[item].sx}}
            </div>
        </li>
        <li>
            <strong>+</strong>
        </li>
        <li>
            <div class="圆球" :class="marSixNums.nums[特码].color">{{特码}}</div>
            <div class="生肖">
                <!-- {{生肖[特码%12]}} -->
                {{marSixNums.nums[特码].sx}}
            </div>            
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    props:{
        球组:{
            default:()=>{
                return []
            },
        },
    },
    data() {
        return {
            生肖:['鼠','猪','狗','鸡','猴','羊','马','蛇','龙','兔','虎','牛','鼠'],
        }
    },
    computed: {
        ...mapState({
            marSixNums:'marSixNums'
        }),
        特码(){
            return this.球组[this.球组.length-1]
        },
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.号码{
    display: flex;
    li{
        // width: _vw(20);
        // height: _vw(20);
        // background: red;
        // font-size: _vw(12);
        // line-height: _vw(20);
        // text-align: center;
        // color: #ffffff;
        // margin: _vw(2);
    };
    text-align: center;
    .生肖{
        font-size: _vw(12);
        color: #212121;
    }
    .圆球 {
        font-size: _vw(12);
        width: _vw(20);
        height: _vw(20);
        border-radius: 100%;
        margin: 0px _vw(2);
        text-align: center;
        line-height: _vw(20);
        color: #ffffff;
        // background: $color;
        &.红{
            background: $color;
        }
        &.蓝{
            background: #007fff;
        }
        &.绿{
            background: #34c604;
        }
    }
}


</style>
