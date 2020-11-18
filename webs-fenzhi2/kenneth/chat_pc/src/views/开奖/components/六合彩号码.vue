<template>
    <ul class="号码">
        <li v-for="(item, index) in 球组" v-if="index<球组.length-1" :key="index">
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
        }
    },
    computed: {
        ...mapState({
            marSixNums:'marSixNums'
        }),
        特码(){
            try {
                return this.球组[this.球组.length-1]            
            } catch (error) {
                return ''
            }
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
    };
    text-align: center;
    .生肖{
        font-size: 12px;
        color: #212121;
    }
    .圆球 {
        font-size: 12px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin: 0px 2px;
        text-align: center;
        line-height: 20px;
        color: #ffffff;
        &.红{
            background: red;
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
