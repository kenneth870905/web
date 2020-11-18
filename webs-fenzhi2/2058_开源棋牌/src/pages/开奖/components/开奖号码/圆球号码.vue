<template>
    <ul class="号码">
        <li v-for="(item, index) in 球组" :key="index">{{item}}</li>
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
        width: _vw(20);
        height: _vw(20);
        background: #ec0909;
        font-size: _vw(12);
        line-height: _vw(20);
        text-align: center;
        color: #ffffff;
        margin: _vw(2);
        border-radius: 100%;
    }
}
</style>
