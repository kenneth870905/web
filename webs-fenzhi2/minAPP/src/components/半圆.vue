
<template>
    <canvas ref="canvas" width="750px" height="40px" style="width:100%;height:100%"></canvas>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
            width: ""
        };
    },
    computed:{
        // ...mapGetters({
        //     用户主题色:'user/用户主题色'
        // })
    },
    mounted() {
        var width = 750;
        var height = 80;
        var canvas = this.$refs.canvas;
        var ctx = canvas.getContext("2d");
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(width / 2, height, width, 0); 
        ctx.fillStyle ="#ec304c"
        ctx.fill();
    }
};
</script> 

<style lang="scss" scoped>
canvas {
    display: block;
}
</style>

