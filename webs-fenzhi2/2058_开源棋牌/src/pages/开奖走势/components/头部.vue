<template>
    <ul class="Header">
        <li @click="选择(index)" :style="styles" :class="{'active':index==active}" v-for="(item, index) in list" :key="index">{{item}}</li>  
    </ul>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:"",
    inject:['改变头部'],
    props:{
        list:{
            default:()=>{
                return []
            }
        },
        active:{
            default:0
        },
        styles:{
            default:""
        }
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        选择(index){
            if(this.list[index].includes('走势')){
                this.加载中(true)
                this.改变头部(index);
                this.$nextTick(()=>{
                    setTimeout(() => {
                        this.加载中(false)                    
                    }, 300);
                })   
            }else{
                this.改变头部(index);
            }
        }
    },
}
</script>

<style lang="scss">
.Header{
    border-bottom: 1px solid #efeff4;
    text-align: center;
    line-height: _vw(40);
    font-size: _vw(14);
    background: #ffffff;
    // margin: _vw(5) 0px 0px;
    display: flex;
    margin: 0 !important;
    list-style: none;
    >li{
        // flex: 1;
        flex-grow: 1;
        margin: 0 !important;
        list-style: none;
    }
    .active{
        border-bottom: 1px solid $color;
        color: $color;
         margin: 0;
    }
}
</style>
