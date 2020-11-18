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
            if(!this.球组){
                return number
            }
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
        display: flex;
        align-items: center;
    };
    text-align: center;
    .加号{
        margin: 0px 2px;
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
        background: red;
        &.红色{
            background: red;
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
