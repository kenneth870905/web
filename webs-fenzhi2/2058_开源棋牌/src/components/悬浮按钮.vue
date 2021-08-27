<template>
    <div class="悬浮按钮"  :class="{'展开':展开,'收起':!展开}">
        <div class="遮罩" @tap="展开=false"></div>
        <div class="圆圈" ref="悬浮按钮" :class="{'回弹':!移动中,'靠左':!靠右}" :style="{'top':y+'px','left':x+'px'}" @click="展开=!展开" @touchstart="圆心开始拖动($event)" @touchmove.prevent="圆心滑动中($event)" @touchend="圆心手指离开()">
            <div class="聊天室按钮" @click="聊天室()">
                <van-icon name="chat" />
                <div>聊天室</div>
            </div>
            <div class="圆心">
                <div class="圆点1">
                    <i class="van-icon van-icon-question-o"></i>
                    <div>助手</div>
                </div>
                <div class="圆点2">
                    <i class="van-icon van-icon-cross"></i>
                </div>
            </div>
            <ul class="list">
                <li class="item_0" @click="$router.push('/tzjilu?back=1')">
                    <i class="van-icon van-icon-shopping-cart-o"></i>
                    <div>注单</div>
                </li>
                <li class="item_1" @click="$router.push('/kjzs?id='+彩票id+'&zs=1')">
                    <i class="van-icon van-icon-chart-trending-o"></i>
                    <div>走势</div>
                </li>
                <li class="item_2" @click="$router.push('/kjzs?id='+彩票id)">
                    <i class="van-icon van-icon-medel-o"></i>
                    <div>开奖</div>
                </li>
                <li class="item_3" @click="$router.push('/chongzhi')">
                    <i class="van-icon van-icon-refund-o"></i>
                    <div>充值</div>
                </li>
                <!-- <li class="item_3" @click="$router.push('/orders?back=1')">
                    <i class="icon iconfont icon-mingxi"></i>
                    <div>记录</div>
                </li> -->
                <li class="item_4" @click="$router.push('/游戏规则')">
                    <i class="van-icon van-icon-orders-o"></i>
                    <div>玩法</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            点击x:0,    //鼠标点击位置
            点击y:0,
            l:0,
            t:0,

            x:0,        
            y:0,
            移动中:true,
            展开:false
        }
    },
    computed: {
        ...mapState({
            定位x:state=>state.悬浮按钮.x, 
            定位y:state=>state.悬浮按钮.y,
            靠右:state=>state.悬浮按钮.靠右,
            彩票id:state=>state.投注.彩票id
        }),
        url(){
            return this.$route.query.u
        }
    },
    methods: {
        ...mapMutations({
            设置state:"悬浮按钮/设置state"
        }),
        聊天室(){
            if(this.url=='chat'){
                history.back();
            }else{
                this.$router.push('/chatBoxes')
            }
        },
        圆心开始拖动(event){
            this.移动中=true;
            //获取x坐标和y坐标
            this.点击x = event.touches[0].clientX;
            this.点击y = event.touches[0].clientY;

            // this.触碰y点=event.touches[0].clientY;
            this.l = this.$refs.悬浮按钮.offsetLeft;
            this.t = this.$refs.悬浮按钮.offsetTop;
        },
        圆心滑动中(event){
            var x=event.touches[0].clientX;
            var y=event.touches[0].clientY;
            this.x=x - (this.点击x - this.l);
            this.y=y - (this.点击y - this.t);
        },
        圆心手指离开(){
            this.移动中=false;
            var ww = window.innerWidth;
            var hh=window.innerHeight; 
            var x中线=ww/2;
            if(this.x + 40/2>x中线){
                this.设置state(['靠右',true])
                this.x=ww -40 - 5;
            }else{
                this.x=5
                this.设置state(['靠右',false])
            }
            if(this.y<160/2 - 10){
                this.y=160/2 - 10
            }else if(this.y+160/2 + 50>hh){
                this.y= hh - 160/2 - 50
            }

            this.设置state(['x',this.x])
            this.设置state(['y',this.y])
        }
    },
    mounted() {
        var ww = window.innerWidth;
        var hh=window.innerHeight;
        if(this.定位x!=0 && this.定位y!=0){
            this.x=this.定位x
            this.y=this.定位y
        }else{
            this.x=ww - 40 - 5;
            this.y=hh/2-40;
        }

    },
}
</script>

<style lang="scss" scoped>
.悬浮按钮{
    .遮罩{
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10;
        top:0px;
        left:0px;
    }
}

.聊天室按钮{
    position: absolute;
    bottom: 50px;
    left: 0px;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    background: #3891ff;
    border-radius: 100%;
    font-size: 10px;
    color: #ffffff;
    .van-icon{
        font-size: 16px;
        display: block;
    }
}
.悬浮按钮.展开{
    .聊天室按钮{
        bottom: 115px;
    }
    .遮罩{
        display: block;
    }
    .圆心 {
        .圆点1{
            opacity: 0;
            // transform: rotate(360deg);
        }
        .圆点2{
            opacity: 1;
            // transform: rotate(360deg);
        }
    }
    .list{
        li{
            opacity: 1;
            i{
                transform: rotate(0deg);
            }
        }
    }
    .item_0{
        top: calc(-160px / 2 + 40px / 2 );
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .item_1{
        top: calc(-160px / 2 + 38px);
        left: calc(-160px / 2 + 38px);
    }
    .item_2{
        top:calc(100% / 2 - 15px);
        left: calc(-160px / 2 + 40px / 2 );
    }
    .item_3{
        bottom: calc(-160px / 2 + 38px);
        left: calc(-160px / 2 + 38px);
    }
    .item_4{
        top:calc(160px / 2 - 12px);
        left: calc(100% / 2 - 15px);
    }

    .靠左{
        .item_1{
            top: calc(-160px / 2 + 38px);
            left: calc(24px / 2 + 38px);
            // left: auto;
        }
        .item_2{
            top:calc(100% / 2 - 15px);
            // left: auto;
            left: calc(50px + 40px / 2 );
        }
        .item_3{
            bottom: calc(-160px / 2 + 38px);
            // left: auto;
            left: calc(24px / 2 + 38px);
        }
    }
}
.悬浮按钮.收起{
    .list{
        li{
            top: 0px;
            left: 0px;
            opacity: 0;
        }
    }
}


.圆圈.回弹{
    transition: all 1s;
}
.圆圈{
    z-index: 10;
    position: fixed;
    top: 50%;
    right: 10px;
    height: 40px;
    width: 40px;
    // &::after{
    //     width: 160px;
    //     height: 160px;
    //     border: 1px solid #ffffff;
    //     content: "";
    //     position: absolute;
    //     top: calc(-160px / 2 + 40px /2);
    //     left: calc(-160px / 2 + 40px /2);
    //     border-radius: 100%;
    // }
    .圆心{
        position: relative;
        z-index: 1;
        @include bgcolor;
        width: 100%;
        height: 100%;
        font-size: 12px;
        border-radius: 100%;
        text-align: center;
        color: #ffffff;
        >div{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.3s;
        }
        .圆点2{
            opacity: 0;
        }
    }
    .list{
        li{
            transition: all 0.2s;
            position: absolute;
            width: 30px;
            height: 30px;
            @include bgcolor;
            border-radius: 100%;
            text-align: center;
            i{
                line-height: 30px;
                color: #ffffff;
                font-size: 16px;
                display: block;
                transform: rotate(360deg);
                transition: all 1s;
            }
            div{
                position: absolute;
                width: 100%;
                left: 0px;
                bottom: -16px;
                font-size: 12px;
                color: #ffffff;
            }

        }
    }
    
}

</style>
