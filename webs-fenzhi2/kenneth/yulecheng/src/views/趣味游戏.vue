<template>
    <div class="quwei" @mousemove="移动中($event)" ref="quwei" @mouseleave="离开()">
        <div class="bg">
            <img src="image/quwei/bg1.jpg" alt="" srcset="">
        </div>
        <div class="box_1 container" :class="{active:!init}" :style="style1" >
            <ul class="tab-left">
                <li @click="type=1" :class="{active:type==1}">蜗牛赛跑</li>
                <li @click="type=2" :class="{active:type==2}">梯子游戏</li>
            </ul>
            <ul class="tab-right">
                <li v-show="type==1" class="item">
                    <div class="text">
                        <div class="title">蜗牛赛跑</div>
                        <div class="text_2">
                            <div>. 全新游戏体验，玩法多样</div>
                            <div>. 开奖频率高，每2分钟一期</div>
                            <div>. 全国统一开奖，安全可靠</div>
                            <div>. 中奖几率高达66%</div>
                        </div>
                        <a class="btn_1" href="/Html/Snail/index.html" target="woniu">开始游戏</a>
                    </div>
                    <div class="img">
                        <img src="image/quwei/bg3.jpg" alt="" srcset="">
                    </div>
                </li>
                <li v-show="type==2" class="item">
                    <div class="敬请开放">
                        敬请开放
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            type:1,
            // 400 pading  115 导航栏 185 中心
            top:400+115+185,
            width:0,
            style1:{
                left:"0px",
                top:'0px'
            },
            init:false
        }
    },
    methods: {
        移动中(e){
            var l = e.pageX;
            var t = e.pageY;

            if(l< this.width/2-200){
                this.style1.left='-5px'
            }else if(l > this.width/2+200 ){
                this.style1.left = '5px'
            }else{
                this.style1.left = '0px'
            }
            if(t<this.top-100){
                this.style1.top='-5px'
            }else if(t>this.top+100){
                this.style1.top='5px'
            }else{
                this.style1.top='0px'
            }
        },
        离开(){
            this.style1.left = '0px'
            this.style1.top='0px'
        }
    },
    mounted() {
        this.width = this.$refs.quwei.clientWidth
        this.init=true
    },
}
</script>

<style lang="scss" scoped>
.quwei{
    position: relative;
    min-height: 884px;
    padding: 400px 0px 0px;
    box-sizing: border-box;
    background: #f0f0f0;
}
.bg{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    overflow: hidden;
    img{
        width: 100%;
    }
}

.box_1.active{
    transform: rotateX(90deg);
    
}
.box_1{
    transform-origin: bottom;
    transition: all 1s;
    position: relative;
    z-index: 1;
    display: flex;
    border: 1px solid #ededed;
    box-shadow: 0px 0px 12px 1px #404040;
    background: rgba(255,255,255,0.95);
    // background: #fff;
    color: #373d41;
    min-height:370px; 
    .tab-left{
        width: 155px;
        display: flex;
        flex-direction: column;
        padding: 25px 0px;
        font-size: 16px;
        font-weight: 600;
        // background: #f7f7f7;
        background: #eaeaea;
        li{
            height: 24px;
            margin: 22px 20px;
            position: relative;
            cursor: pointer;
            &:hover{
                color: #ff6f22;
            }
        }
        .active{
            color: #ff6f22;
            font-size: 18px;
        }
        .active::after{
            content: "";
            position: absolute;
            width: 4px;
            height: 34px;
            top: -4px;
            left: -21px;
            background: #ff6f22;
        }
    }
    .tab-right{
        flex: 1;
        padding: 25px 30px;
        .item{
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                flex: 1;
                .title{
                    font-weight: 600;
                    font-size: 22px;
                    line-height: 38px;
                    margin-bottom: 27px;
                }
                .text_2{
                    font-size: 14px;
                    color: #373d41;
                    line-height: 23px;
                }
                .btn_1{
                    display: block;
                    margin-top: 40px;
                    background: #ff6f22;
                    width: 84px;
                    height: 32px;
                    text-align: center;
                    line-height: 32px;
                    font-size: 14px;
                    color: #fff;
                    cursor: pointer;
                    &:hover{
                        background: #bf4909;
                    }
                }
            }
            .img{
                width: 480px;
                // height: 320px;
                overflow: hidden;
                cursor: pointer;
                font-size: 0px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.3s ;
                    &:hover{
                        transform: scale(1.1);
                    }
                }
            }
        }
        .敬请开放{
            width: 100%;
            text-align: center;
            font-size: 35px;
        }
    }
}
</style>