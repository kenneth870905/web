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
        width: 20px;
        height: 20px;
        background: #ec0909;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
        margin: 2px;
        border-radius: 100%;
    }
}
</style>
