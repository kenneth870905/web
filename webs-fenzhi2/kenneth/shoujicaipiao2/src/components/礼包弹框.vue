<template>
    <div class="礼包弹框" :class="{'引导':特邀引导.步骤==2}">

        <yd1 v-if="特邀引导.步骤==2" :zIndex="1" position="absolute"/>
        <div class="内容">
            <ul class="时间框">
                <li class="时间">
                    <div class="天">{{new Date().getDate()}}</div>
                    <div class="星期">
                        <div>{{星期[new Date().getDay()]}}</div>
                        <div>{{年月}}</div>
                    </div>
                </li>
                <li class="提示">娱乐手游领导者——{{config.title}}</li>
            </ul>
            <ul class="list2">
                <li @click="跳转(item)"  v-for="(item, index) in 礼包2" :key="index">
                    <div class="img_box">
                        <img :src="config.img_url + item.img" />
                    </div>
                    <div class="name">{{item.name}}</div>
                </li>
            </ul>
            <ul class="list">
                <li @click="跳转(item)" :class="item.name" v-for="(item, index) in config.libao" :key="index">
                    <!-- <transition name="bounce"> -->
                        <div  class="item">
                            <div class="img_box">
                                <img :src="config.img_url+item.img" alt="" srcset="" v-if="item.img">
                                <div class="teyao" v-if="!item.img && item.icon" :style="{'background':item.bg}">
                                    <i :class="item.icon"></i>
                                </div>
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    <!-- </transition> -->
                    <div class="圆圈 特邀引导"></div>
                    <img class="箭头 特邀引导" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
                    <div class="说明 特邀引导">
                        特邀嘉宾请点击这里领取大奖
                    </div>
                </li>
                <li class="占位置" v-if="config.libao.length<5"></li>
            </ul>
        </div>
        <div class="关闭" @click="关闭礼包弹框()">
            <i class="icon iconfont icon-guanbi"></i>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
const yd1=()=>import('@/components/引导遮罩.vue')

export default {
    name:"",
    components:{
        yd1
    },
    inject:['关闭礼包弹框'],
    data() {
        return {
            // showlist:[false,false,false,false,false],
            showlist:[],
            星期:['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
        }
    },
    computed: {
        ...mapState({
            config:'config',
            userinfo:x=>x.user.userinfo,
            试玩:x=>x.user.试玩,
            技术支持:'技术支持',
            特邀引导:x=>x.引导.特邀引导
        }),
        礼包2(){
            return this.config.libao2 ? this.config.libao2 : [] 
        },
        年月(){
            var date=new Date();
            var 年=date.getFullYear();
            var 月=date.getMonth();
            if(月<9){
                return '0'+(月+1)+'/'+年
            }else{
                return 月+1+'/'+年
            }
        }
    },
    methods: {
        跳转(item){
            if(this.userinfo.UserId && (this.userinfo.UserId.startsWith('demo') || this.userinfo.UserId.startsWith('Demo'))){
                this.$toast('亲！试玩账号不用进入哦~');
                return
            }
            if(!this.userinfo.UserId){
                this.$toast('请先登录');                
                return
            }
            if(!item.path && !item.url){
                this.$toast('暂未开放！')
                return
            }
            
            if(item.NoShiWan && this.试玩){
                this.$toast('此功能暂未对试玩账号开放！');
                return
            }
            if(item.path){
                this.$router.push(item.path)
            }else if(item.url){
                window.open(item.url)
            }
        }
    },
    mounted() {
        // var this_1=this
        // function setShow(){
        //     this_1.showlist.push(true);
        //     if(this_1.showlist.length <= this_1.config.libao.length){
        //         setTimeout(() => {
        //             setShow();
        //         }, 200);
        //     }
        // }
        // setTimeout(() => {
        //     setShow()        
        // }, 500);
        
        // var date= new Date();
    },
}
</script>

<style lang="scss" scoped>
.list2{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: _vw(13);
    padding: 20px 0px 0px;
    align-items: baseline;
    li{
        width: 25%;
    }
    .img_box{
        width: _vw(70);
        height: _vw(70);
        margin: 0px auto;
        font-size: 0px;
        img{
            width: 100%;
            height: 100%;
        }
    }

}
.定位测试{
    position: absolute;
    color: #ffffff;
    z-index: 2;
}
.引导{
    .特邀嘉宾{
        z-index: 100;
        color: #ffffff;
        .特邀引导{
            display: block;
        }
        .箭头{
            position: absolute;
            top: -75%;
            right: _vw(-20);
            margin:auto;
            width: _vw(40);
            animation: shangxia 1s linear infinite;
            z-index: 100;
            // transform: rotate(20deg);
        }
        .说明{
            position: absolute;
            width: 100vw;
            font-size: _vw(20);
            z-index: 22;
            top: _vw(-95);
            left: 0px;
            text-align: center;
            color: #ffffff;
        }
        .圆圈{
            position: absolute;
            top: -20%;
            left: 0px;
            width: 100%;
            height: 140%;
            border-radius: 100%;
            border:5px dashed #fff;
        }
    }
}

@keyframes shangxia{
    0%{
        // margin-top: 0px;
        transform: translate(-10px, 10px) rotate(30deg);
    }50%{
        // margin-top:-10px;
        transform: translate(0px, 0px) rotate(30deg);
    }100%{
        // margin-top: 0px;
        transform: translate(-10px, 10px) rotate(30deg);
    }
}


.bounce-enter-active {
    animation: bounce1 .2s;
    position: absolute;
}
.bounce-leave-active {
    position: absolute;
    animation: bounce1 1s reverse;
}

@keyframes bounce1 {
    0% {
        opacity: 0;
        top: 100%;
    }
    70% {
        top: -30px;
        opacity: 1;
    }80%{
        top: -10px;
    }100%{
        top: 0px;
    }
}

.礼包弹框{
    position: fixed;
    z-index: 22;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.9);
    padding: _vw(100) 0px 0px;
    display: flex;
    flex-direction: column;
    .内容{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        // overflow: auto;
        padding: 0px 0px _vw(15);
    }
    .关闭{
        line-height: _vw(40);
        text-align: center;
        border-top: 1px solid #cccccc;
        color: red;
    }
}

.时间框{
    padding: 0px 0px 0px _vw(22);
    .时间{
        display: flex;
        align-items: center;
    }
    .天{
        font-size: _vw(50);
    }
    .星期{
        margin: 0px 0px 0px _vw(15);
        font-size: _vw(13);
        div{
            margin: _vw(3) 0px;
        }
    }
    .提示{
        font-size: _vw(14);
    }
}

.list{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: _vw(13);
    >li{
        min-height: _vw(87);
        margin: 0px 0px _vw(25);
        width: 25%;
        &.占位置{
            width: 100%;
        }
        position: relative;
    }
    .特邀引导{
        display: none;
    }
    .item{
        width: 100%;
        left: 0px;
        top: 0px;
        .img_box{
            width: _vw(70);
            height: _vw(70);
            margin: 0px auto;
            font-size: 0px;
        }
        .teyao{
            width: _vw(60);
            height: _vw(60);
            margin: 0px auto 0px;
            border-radius: 100%;
            background: linear-gradient(30deg,#E91E63, #ff6f9f);
            // background: #E91E63;
            box-shadow: 0px 0px 3px 1px #E91E63;
            display: flex;
            align-items: center;
            justify-content: center;
            i{
                
                color: #ffffff;
                font-size: _vw(51);
                line-height: _vw(51);
            }
        }
        img{
            width: _vw(70);
            height: _vw(70);
        }
    }
}
</style>
