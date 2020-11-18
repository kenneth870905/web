<template>
    <ul class="号码">
        <li :class="'color_'+item" v-for="(item, index) in 球组" :key="index">{{item}}</li>
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
        width: 20px;
        height: 20;
        background: red;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
        margin: 2px;
    };
    $colorlist: #eedd0f #0092dd #4b4b4b #ff7600 #17e2e5 #5234ff #bfbfbf #ff2600 #780b00 #07bf00 ;
    @each $color1 in $colorlist{
        $i:index($colorlist, $color1);
        @if ($i<10){
            $i:'0'+$i
        }
        .color_#{$i}{
            background: $color1;
        }
    } 
    
    
}


</style>
