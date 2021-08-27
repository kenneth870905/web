<template>
    <ul class="购买号码">
        <li v-for="(item, index) in list" :key="index" :class="'item_'+item">
            <img :src="config.img_url+'static/image/ky/k3_'+item+'.png'" alt="" srcset="">
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
    computed: {
        ...mapState({
            config:"config" 
        })
    },
    data() {
        return {
            
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
