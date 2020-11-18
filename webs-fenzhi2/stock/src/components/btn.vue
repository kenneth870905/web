<template>
    <div class="btn_1">
        <van-button :style="styles" type="danger" size="normal">{{name}}</van-button>
    </div>
</template>

<script>
// @click.native
export default {
    name:"",
    props:['name','styles'],
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.btn_1{
    display: block;
    margin: _vw(30);
    button{
        width: 100%;
    }
}
</style>
