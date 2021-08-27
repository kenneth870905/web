<template>
    <!-- <canvas width="300" height="300" ref="canvas"></canvas> -->
    <canvas width="300" height="250" ref="canvas"></canvas>
</template>

<script>
export default {
    name:"",
    props:{
        o:{
            default:()=>{}
        }
    },
    data() {
        return {
            
        }
    },
    mounted() {
        // var canvas = document.getElementById('canvas');
        var canvas = this.$refs.canvas
        var ctx = canvas.getContext('2d');
        // 实心圆
        ctx.beginPath();
        ctx.arc(150, 150, 75 /*圆形半径*/, 0, Math.PI * 2, true); // 绘制
        ctx.strokeStyle = "#3a97e5"; //圆边框
        ctx.fillStyle = "#3a97e5";  //填充色
        ctx.fill();
        // 灰色半圆
        ctx.beginPath();
        ctx.strokeStyle = "#cccccc"; //圆边框
        ctx.lineWidth = 16;
        ctx.setLineDash([42, 12])  //长度 间距
        ctx.arc(150, 150, 90, Math.PI * 0.5 + 0.8, Math.PI * 2.5 - 0.8, false);
        ctx.stroke();
        // 浅蓝色
        ctx.beginPath();
        ctx.strokeStyle = '#cdeaf6'
        ctx.lineWidth = 30;
        ctx.setLineDash([20, 12])  //长度 间距
        ctx.arc(150, 150, 120, Math.PI * 0.5 + 0.8, Math.PI * 2.5 - 0.8, false);
        ctx.stroke();

        // 深蓝色
        // ctx.beginPath();
        // ctx.strokeStyle = '#21b5ec'
        // ctx.lineWidth = 15;
        // ctx.setLineDash([10, 6])  //长度 间距
        // ctx.arc(75,75,60, Math.PI*0.5 + 0.8 , Math.PI*2.5 - 0.8  , false);  
        // ctx.stroke();
        if(this.o.name && this.o.amount){
            ctx.beginPath();
            ctx.textAlign="right";
            ctx.textBaseline = "middle";
            ctx.font = "normal bold 70px serif";
            ctx.fillStyle = "#fff";  //填充色
            ctx.fillText(this.o.amount, 170, 150);
            ctx.textAlign="left";
            ctx.font = "normal bold 40px serif";
            ctx.fillText(this.o.name, 170, 150);
        }

        //起点
        var path = Math.PI * 0.5 + 0.8
        var this_ = this 
        function animation() {
            path += 0.1
            // 深蓝色
            ctx.beginPath();
            ctx.strokeStyle = '#21b5ec'
            ctx.lineWidth = 30;
            ctx.setLineDash([20, 12])  //长度 间距
            ctx.arc(150, 150, 120, Math.PI * 0.5 + 0.8, path, false);
            ctx.stroke();
                    // (最大 - 最小)*百分比/100 + 最小
            if (path >= ((Math.PI*2.5-0.8) - (Math.PI*0.5+0.8)) * this_.o.baifenbi / 100 + Math.PI * 0.5 + 0.8) {
                return
            }
            window.requestAnimationFrame(animation);
        }
        if(this.o.baifenbi && this.o.baifenbi>0){
            window.requestAnimationFrame(animation);
        }
    },
}
</script>

<style lang="scss" scoped>
canvas{
    width: 100%;
    height: 100%;
}
</style>