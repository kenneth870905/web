<template>
    <div class="服务">
        <div class="title">
            <h1>凡所应有 无所不有</h1>
            <h4>亚博为您提供最优质的服务</h4>
        </div>
        <ul class="w1200 list1">
            <li v-for="(item, index) in list" :key="index">
                <div class="canvas">
                    <canvas1 :o="item.o"/>
                </div>
                <div class="text">
                    <h5>YABO</h5>
                    <h5>ADVANTAGE</h5>
                    <p>{{item.name}}</p>
                </div>
            </li>
        </ul>
        <ul class="w1200 list2">
            <li>
                <img src="static/image/home/pb_icon.png" />
                <div>
                    <span>更专业</span>
                    <p>每天为您提供近千场精彩体育赛事，更有真人、彩票、电子游戏等多种娱乐方式选择，让您拥有完美游戏体验。</p>
                </div>
            </li>
            <li>
                <img src="static/image/home/convenient_icon.png" />
                <div>
                    <span>更安全</span>
                    <p>独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注，无后顾之忧！</p>
                </div>
            </li>
            <li>
                <img src="static/image/home/security_icon1.png" />
                <div>
                    <span>更便捷</span>
                    <p>引领市场的卓越技术，自主研发了全套终端应用，让您畅享 Web、H5，更有 iOS、Android原生App，让您随时随地，娱乐投注随心所欲！7×24小时在线客服提供最贴心、最优质的服务。</p>
                </div>
            </li>
            <li>
                <img src="static/image/home/icon_kuaijie.png" />
                <div>
                    <span>更快速</span>
                    <p>最新技术自主研发的财务处理系统，真正做到极速存、取、转。独家网络优 化技术，为您提供一流的游戏体验，最大优化网络延迟。</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import canvas1 from './canvas1.vue'
export default {
    name: "",
    components:{canvas1},
    data() {
        return {
            list:[
                {
                    name:"平均存款时间",
                    o:{baifenbi:50,name:'秒',amount:60},
                },{
                    name:"合作支付平台",
                    o:{baifenbi:80,name:'家',amount:80},
                },{
                    name:"平均取款时间",
                    o:{baifenbi:45,name:'秒',amount:90},
                },{
                    name:"合作游戏平台",
                    o:{baifenbi:35,name:'家',amount:22},
                }
            ]
        }
    },
    
}
</script>

<style lang="scss" scoped>
@mixin textColor(){
    background: linear-gradient(90deg,#42d2e8,#3b9ee5);
    color: transparent;
    -webkit-background-clip:text;
}
.服务{
    padding: 84px 0 104px;
    background: #f4f6f9;
}
.title{
    @include textColor;
    text-align: center;
    h1{
        font-size: 52px;
        font-weight: 300;
        font-weight: 500;
        margin: 0px;
    }
    h4{
        margin: 9px 0px 0px;
        font-size: 24px;
        font-weight: 500;
    }
}

.list1{
    padding: 26px 0px 0px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .canvas{
        width: 150px;    
    }
    h5{
        color: #21b8ed;
        font-size: 12px;
        margin: 0px 0;
        font-weight: 500;
    }
    p{
        font-weight: 500;
        color: #666;
        font-size: 16px;
        margin: 0px 0px;
    }
    .text{
        margin: -10px 0px 0px;
    }
}

.list2{
    display: flex;
    flex-wrap: wrap;
    li{
        width: 50%;
        padding: 38px 65px 0 0;
        display: flex;
        align-items: center;
        img{
            width: 74px;
            margin: 0px 35px 0px 0px;
        }
        span{
            color: #3a97e5;
            font-size: 18px;
            font-weight: 400;
        }
        p{
            margin: 5px 0;
            font-size: 13px;
            line-height: 20px;
            color: #666;
        }
    }
}

</style>
