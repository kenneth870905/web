<template>
    <ul class="号码">
        <li v-for="(item, index) in 球组" :key="index">
            <div class="圆球">{{item}}</div>
            <strong v-if="index!=球组.length-1" class="加号">+</strong>
        </li>
        <li>
            <strong class="加号">=</strong>
        </li>
        <li>
            <div class="圆球 红色">{{特码}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    name:"",
    props:{
        球组:{
            default:()=>{
                return []
            },
        },
    },
    computed: {
        特码(){
            var number=0;
            this.球组.forEach(item => {
                number=number+parseInt(item)
            });
            return number
        }
    },
    data() {
        return {
        }
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
        display: flex;
        align-items: center;
    };
    text-align: center;
    .加号{
        margin: 0px _vw(2);
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
        &.红色{
            // background: $color;
        }
        &.蓝色{
            background: #007fff;
        }
        &.绿色{
            background: #34c604;
        }
    }
}


</style>
