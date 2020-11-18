<template>
    <ul class="购买号码">
        <li v-for="(item, index) in list" :key="index">{{item}}</li>
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
            
        }
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
        border-radius: 100%;
        color: #ffffff;
        font-size: _vw(10);
        text-align: center;
        margin: 0px _vw(2);
        background: red;
    }
}
</style>
