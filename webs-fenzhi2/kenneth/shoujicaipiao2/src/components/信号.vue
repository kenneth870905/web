<template>
    <ul class="信号" :class="信号强度">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</template>

<script>
export default {
    name:"",
    props:{
        time:{  //时间 毫秒
            default:0
        },
    },
    data() {
        return {
            
        }
    },
    computed: {
        信号强度(){
            if(this.time<100){
                return 'type1'
            }else if(this.time<300){
                return 'type2'
            }else if(this.time<500){
                return 'type3'
            }else {
                return 'type4'
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.信号{
    display: flex;
    align-items: flex-end;
    li{
        margin: 0px 1px;
        background: #c5c5c5;
        width: 3px;
        @for $i from 1 through 4 {
            &:nth-child(#{$i}){
                height: 4px * $i;
            }
        }
    }
    &.type1{
        li{
            background: #39b548;
        }
    }
    &.type2{
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3){
            background: #90c444;
        }
    }
    &.type3{
        li:nth-child(1),
        li:nth-child(2){
            background: #eeb735;
        }
    }
    &.type4{
        li:nth-child(1){
            background: #cf2129;
        }
    }
}
</style>