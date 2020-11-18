<template>
    <div>
        <canvas ref="canvas" :width="width" :height="height" class="canvas"></canvas>
        <!-- <button class="开始" @click="开始()">开始</button> -->
    </div>
</template>

<script>
function getRandom(a, b) {
    return Math.random()*(b - a) + a
}

function CreateFireObj() {
    this.fragArr = [];
    this.boomJudge = true;
    //烟花爆炸，产生碎片
    this.boom = function() {
        // 烟花数量
        var scope = Math.round(getRandom(10, 40));
            scope = 30
        var w1 = window.innerWidth
        var w2 = Math.round(getRandom(w1-800 , w1+800)) 
        //var scope = 1;
        for (var i=0; i<scope; i++) {
            var angel = getRandom(0, 2*Math.PI);
            var range = Math.round(getRandom(50, 300)); 	//扩张
            var targetX = w2/2 + range*Math.cos(angel);
            var targetY = 200 + range*Math.sin(angel);

            var r = Math.round(getRandom(0, 255));
            var g = Math.round(getRandom(0, 255));
            var b = Math.round(getRandom(0, 255));
            var color = 'rgb(' + r + ',' + g + ',' + b + ')';
            var frag = new CreateFrag(color, targetX, targetY , w2);
            // console.log(frag)
            this.fragArr.push(frag);
        }
    }
}

function CreateFrag(color, tx, ty , w2) {
    var that = this
    that.x = w2/2;
    that.y = 200;
    that.ty = ty;
    that.tx = tx;
    that.color = color;
    that.width = 10;
    that.height = 10
    that.disappear = false;
    that.globalAlpha = 1

    that.翻滚频率 = getRandom(0,0.05);
    that.旋转 = 0
    that.draw = function() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = that.color;
        ctx.translate(that.x, that.y); 
        // 假如 x = 100 y = 200
        that.旋转=that.旋转 + that.翻滚频率*100
        ctx.rotate( that.旋转 *Math.PI/180);
        // that.width=that.width-that.翻滚频率;
        that.height = that.height-that.翻滚频率;
        if(Math.abs(that.height)>10){
            that.height = 10
        }
        // 透明度递减
        that.globalAlpha = (that.globalAlpha-0.002 < 0) ? 0 : that.globalAlpha-0.002
        ctx.globalAlpha = that.globalAlpha
        ctx.fillRect(-5, 0, that.width , that.height);
        if(that.globalAlpha<=0){
            that.fragDisappear = true;
        }
        // console.log((1-that.翻滚频率 < 0) ? 0 : 1-that.翻滚频率)
        ctx.restore();
    }
    that.move = function() {
        that.ty = that.ty + 0.5;
        var dx = that.tx - that.x, dy = that.ty - that.y;
        that.x = Math.abs(dx) < 0.1 ? that.tx : (that.x + dx*0.05);
        that.y = Math.abs(dy) < 0.1 ? that.ty : (that.y + dy*0.05);
    }
}

var canvas ,ctx,animation,fireArr ,fragments;
export default {
    name: "",
    data() {
        return {
            width: "",
            height: "",
            定时器: ""
        }
    },
    methods: {
        开始(){
            cancelAnimationFrame(this.定时器)
            this.定时器 = ''
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fragments=[]
            this.定时()
        },
        定时() {
            // console.log(1)
            this.定时器 = requestAnimationFrame(this.定时)
            this.animate()
        },
        animate() {
            var this_1 = this;
            var ww = this.width;
            var wh = this.height
            // ctx.fillStyle = 'rgba(0,0,0,0.05)'; //产生拖尾效果
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (fragments.length > 1) {
                fragments.forEach(function (item, index) {
                    if (item.boomJudge) {
                        item.boom();
                        item.boomJudge = false;
                    }
                })
            } else {
                let obj = new CreateFireObj();
                fragments.push(obj);
            }

            // 散开烟花
            if (fragments.length) {
                fragments.forEach(function (item1, index1) {
                    item1.fragArr.forEach(function (item2, index2) {
                        if (item2.fragDisappear) {
                            console.log('结束')
                            fragments.splice(index1, 1);
                            cancelAnimationFrame(this_1.定时器)
                        }
                        item2.draw();
                        item2.move();
                    })
                })
            }
        }
    },
    mounted() {
        this.width = document.querySelector('body').offsetWidth;
        this.height = window.innerHeight;
        canvas = this.$refs.canvas;
        ctx = canvas.getContext('2d');
        animation;
        fireArr = [];
        fragments = [];

    },
}
</script>

<style lang="scss" scoped>
.canvas {
    position: fixed;
    top: 0px;
    left: 0px;
    pointer-events: none;
    z-index: 22;
}
.开始 {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
}
</style>
