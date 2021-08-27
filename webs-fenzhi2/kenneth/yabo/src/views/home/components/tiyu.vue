<template>
    <div class="tiyu">
        <div class="w1200">
            <div class="left">
                <div class="title_1">
                    <h1>应有尽有 享你所有</h1>
                    <h5>每天为您提供近千场精彩赛事</h5>
                </div>
                <div class="top">
                    <div class="l1">
                        <div class="title_2">
                            <h1>英格兰超级联赛</h1>
                            <h2>2020-02-18 04:00:00</h2>
                        </div>
                        <div class="对局">
                            <div>
                                <img src="http://static.0am08m.com///prod/leaguematches/England_qieerxi.png">
                                <div>切尔西</div>
                            </div>
                            <div>VS</div>
                            <div>
                                <img src="http://static.0am08m.com///prod/leaguematches/England_manlian.png">
                                <div>曼联</div>
                            </div>
                        </div>
                    </div>
                    <ul class="r1">
                        <li>胜2.05</li>
                        <li>
                            <div>-0.5</div>
                            <div>2.05</div>
                        </li>
                        <li>
                            <div>大2.5</div>
                            <div>1.94</div>
                        </li>
                        <li>负3.80</li>
                        <li>
                            <div>+0.5</div>
                            <div>1.88</div>
                        </li>
                        <li>
                            <div>小2.5</div>
                            <div>1.96</div>
                        </li>
                        <li>平3.45</li>
                        <a href="javascript:;">进入投注</a>
                    </ul>
                </div>

                <div class="bottom">
                    <div>
                        <div class="title_3">
                            <div>
                                <img src="http://static.0am08m.com///prod/leaguematches/1c5f24940e26207d9dc7be4d52d449a415457a8d.png">
                                <div>波鸿</div>
                            </div>
                            <div>
                                <h1>苏格兰足总杯</h1>
                                <h2>2020-02-18 03:30:00</h2>
                                <a href="javascript:;">进入投注</a>
                            </div>
                            <div>
                                <img src="http://static.0am08m.com///prod/leaguematches/Germany_situjiate.png">
                                <div>斯图加特</div>
                            </div>
                        </div>
                        <ul class="list">
                            <li>胜3.85</li>
                            <li>负1.92</li>
                            <li>平3.70</li>
                        </ul>
                    </div>
                    <div>
                        <div class="title_3">
                            <div>
                                <img src="http://static.0am08m.com///prod/15eff8b317ff7ec1f3bd76af1009556b5fd69995.png">
                                <div>米迪兰特</div>
                            </div>
                            <div>
                                <h1>丹麦超级联赛</h1>
                                <h2>2020-02-18 02:00:00</h2>
                                <a href="javascript:;">进入投注</a>
                            </div>
                            <div>
                                <img src="http://static.0am08m.com///prod/778b7a8a5cc4eb252e71d24846e92a15d8a9025c.jpg">
                                <div>宁比</div>
                            </div>
                        </div>
                        <ul class="list">
                            <li>胜1.32</li>
                            <li>负8.90</li>
                            <li>平5.50</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bg">
                <img src="static/image/home/bg_tozhu.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {

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
@mixin btnStyle(){
    border: 0;
    background: linear-gradient(270deg,#489edb,#48cff7);
    color: #fff;
    text-decoration: none;
    margin: 0px 0px 0px 20px;
    transition: all 0.5s;
    &:hover{
        box-shadow: 0 0 4px #0697c3;
        background: linear-gradient(90deg,#489edb,#48cff7)
    }
}
.tiyu {
    min-height: 600px;
    padding: 70px 0px 40px;
    background-color: #f4f6f9;
    position: relative;
}
.w1200{
    position: relative;
}
.left{
    width: 644px;
    text-align: center;
    position: relative;
    z-index: 1;
    .title_1{
        margin:0px 0px 10px;
        @include textColor;
        margin: 0px 0px 10px;
        h1{
            font-weight: 400;
            font-size: 52px;
            line-height: 52px;
            margin: 0px;
        }
        h5{
            margin: 9px 0px 0px;
            font-size: 24px;
            font-weight: 500;
        }
    }
}
 
.top{
    background: rgba(255,255,255,0.7);
    box-shadow: 0 2px 27px 6px rgba(0,0,0,.12);
    border-radius: 5px;
    display: flex;
    padding: 15px;
    .l1{
        width: 314px;
        padding:0px 32px 0px 0px;
        flex-shrink: 0;
    }
    .title_2{
        @include textColor;
        h1{
            font-size: 22px;
            margin: 0px;
            font-weight: 500;
        }
        h2{
            font-size: 14px;
            margin: 4px 0px;
            font-weight: 500;
        }
    }
    .对局{
        display: flex;
        align-items: center;
        img{
            width: 74px;
            height: 74px;
        }
        >div:nth-child(2){
            font-size: 23px;
            flex: 1;
            color: #3eb5e7;
            font-weight: bold;
        }
    }
    .r1{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: end;
        li{
            width: 88px;
            height: 38px;
            margin-bottom: 10px;
            background-color: #eef2f6;
            border-radius: 5px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 14px;
            color: #717379;
        }
        a{
            line-height: 38px;
            border-radius: 20px;
            flex:1;
            @include btnStyle;
        }
    }
}
.bottom{
    margin: 15px 0px 0px;
    display: flex;
    justify-content: space-between;
    >div{
        padding: 25px 16px 10px;
        width: 314px;
        // background: #fff;
        background: rgba(255,255,255,0.7);
        box-shadow: 0 2px 27px 6px rgba(0,0,0,.12);
        border-radius: 5px;
    }
    .title_3{
        display: flex;
        img{
            width: 74px;
        }
        >div:nth-child(2){
            flex: 1;
        }
        h1{
            @include textColor;
            font-size: 16px;
            font-weight: 500;
            margin: 0px;
        }
        h2{
            white-space: nowrap;
            margin: 2px 0px;
            @include textColor;
            font-size: 14px;
            font-weight: 500;
        }
        a{
            @include btnStyle;
            display: inline-block;
            line-height: 26px;
            width: 100px;
            border-radius: 26px;
        }
    }
    .list{
        display: flex;
        justify-content: space-between;
        margin: 13px 0px 0px;
        li{
            width: 88px;
            height: 38px;
            margin-bottom: 10px;
            background-color: #eef2f6;
            border-radius: 5px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 14px;
            color: #717379;
        }
    }
}
.bg{
    position: absolute;
    top: -60px;
    left: 300px;
    width: 1200px;
    height: 640px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
