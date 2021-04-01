<template>
    <view :style="styles" >
        <!-- <canvas :width="width" :height="height" canvas-id="firstCanvas" id="firstCanvas" ref="canvas"></canvas> -->
        <canvas :style="{width:width+'px',height:height+'px'}" :canvas-id="CanvasId" :id="CanvasId" ></canvas>
    </view>
</template>

<script>
export default {
    name:"",
    props:{
        width:{
            default:0
        },
        height:{
            default:0
        },
        start:'',
        left:0,
		
    },
    data() {
        return {
            ctx:"",
			CanvasId: 'Canvas'+Math.random()
        }
    },
    computed: {
        styles(){
            if(this.height){
                return {'top':this.height/2+'px','left':this.left+'px'}
            }else{
                return {}
            }
        }
    },
    methods: {
        清空测试(){
            this.ctx.clearRect(0,0,this.width,this.height);
        },
        初始化(){
            if(!this.ctx){
                // var c=this.$refs.canvas;
                // this.ctx=c.getContext("2d");
				this.ctx = uni.createCanvasContext(this.CanvasId)
            }
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.beginPath();
			
            this.ctx.strokeStyle="#ec0909";
            if(this.start=='left'){
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(this.width,this.height);
            }else{
                this.ctx.moveTo(this.width,0);
                this.ctx.lineTo(0,this.height);
            }
            this.ctx.stroke();
			this.ctx.draw()

        }
    },
    mounted() {
        if(this.width){
            // setTimeout(()=>{
                this.初始化()
            // },500)
        }
    },
    watch: {
        width(){
            // setTimeout(()=>{
                this.初始化()
            // },500)
        },
        start(){
            // setTimeout(() => {
                this.初始化()
            // }, 500);
        }
        
    },
}
</script>

<style lang="scss" scoped>
view{
    position: absolute;
    z-index: 1;
}
</style>
