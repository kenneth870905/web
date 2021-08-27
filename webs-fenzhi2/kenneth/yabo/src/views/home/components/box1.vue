<template>
    <div class="box_1">
        <div class="w1200">
            <div class="赞助商">
                <a href="https://www.manutd.com/zh/partners/global/yabo%20sports" target="_blank">
                    <img src="static/image/home/icon-united.png">
                    <div>
                        <p>英超曼联</p>
                        <p>全球赞助商</p>
                    </div>
                </a>
                <a href="http://www.legaseriea.it/en" target="_blank">
                    <img src="static/image/home/icon-serieatm.png">
                    <div>
                        <p>意大利甲级联赛</p>
                        <p>全球赞助商</p>
                    </div>
                </a>
                <a href="http://www.fcbayern.cn/news/4098" target="_blank">
                    <img src="static/image/home/icon-bayern.png">
                    <div>
                        <p>德甲拜仁慕尼黑</p>
                        <p>亚洲区赞助商</p>
                    </div>
                </a>
                <a href="https://www.lcfc.com/news/1347075/leicester-city-name-yabo-sports-as-official-club-partner/press-release" target="_blank">
                    <img src="static/image/home/icon-leicestercity.png">
                    <div>
                        <p>英超莱斯特城</p>
                        <p>亚洲区赞助商</p>
                    </div>
                </a>
                <a href="https://www.afa.com.ar/es/posts/afa-presenta-un-nuevo-sponsor-regional" target="_blank">
                    <img src="static/image/home/icon-argentina.png">
                    <div>
                        <p>阿根廷国家队</p>
                        <p>官方合作伙伴</p>
                    </div>
                </a>
                <a href="https://www.asmonaco.com/cn/yabo-sport-premier-regional-partner-de-las-monaco-en-asie/" target="_blank">
                    <img src="static/image/home/icon-monaco.png">
                    <div>
                        <p>法甲摩纳哥</p>
                        <p>官方合作伙伴</p>
                    </div>
                </a>
                <a href="https://www.herthabsc.de/en/teams/yabo-sports/page/748--4-4-.html" target="_blank">
                    <img src="static/image/home/icon-berlinhertha.png">
                    <div>
                        <p>德甲柏林赫塔</p>
                        <p>官方合作伙伴</p>
                    </div>
                </a>
            </div>

            <div class="app介绍">
                <div class="picture">
                    <div class="体育imglist" :class="{hide:type!=0}">
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone2_sport.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone1_sport.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone3_sport.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_cr7-1.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_messi-1.png"></div>
                    </div>
                    <div class="全站imglist" :class="{hide:type!=1}">
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone2.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone1.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_iphone3.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_shaizi.png"></div>
                        <div><img src="https://webstatic.0am08m.com/assets/home/img_poker.png"></div>
                    </div>
                </div>
                <div class="文字介绍">
                    <h1>方寸之间 从容尽显</h1>
                    <h3>业内最顶尖的手机投注APP</h3>
                    <div class="btnList">
                        <button @click="type=0" @mouseover="hoverIndex=0" @mouseout="hoverIndex=''" :class="{active:setClass(0)}" type="button">体育APP</button>
                        <button @click="type=1" @mouseover="hoverIndex=1" @mouseout="hoverIndex=''" :class="{active:setClass(1)}" type="button">全站APP</button>
                    </div>
                    <div class="体育描述" v-if="type==0">
                        <div class="text_1">
                            <p>业内赔率最高！覆盖世界各地赛事,让球、大小、半全场、波胆、单双、</p>
                            <p>总入球、连串过关等多元竞猜。更有动画直播、视频直播，让您体验轻</p>
                            <p>松聊球，娱乐投注两不误 。</p>
                        </div>
                        <div class="下载详情">
                            <div>
                                <div class="bg_1">
                                    <img src="https://0698aa.com/App_Upload/appBet.png" alt="" srcset="">
                                </div>
                                <p>扫码下载APP</p>
                                <div>支持iOS &amp; Android 全部移动设备</div>
                                <a href="https://www.yb61.app">www.yb57.app</a>
                            </div>
                            <div>
                                <div class="bg_2">
                                    <img src="https://webstatic.0am08m.com/assets/home/h5_icon.png">
                                </div>
                                <p>无需下载直接访问</p>
                                <span>无需下载，手机输入网址即可访问</span>
                                <a href="https://www.yabo334.com">www.yabo334.com</a>
                            </div>
                        </div>
                    </div>
                    <div class="全站APP描述" v-if="type==1">
                        <div class="text_1">
                            <p>赛事竞技、真人娱乐、电子游戏、棋牌，您所要的尽在亚博，行业最</p>
                            <p>全游戏竞技娱乐APP，亚博为您呈现别样、缤纷的极致体验。</p>
                            <p> </p>
                        </div>
                        <div class="下载详情">
                            <div>
                                <div class="bg_1">
                                    <img src="https://0698aa.com/App_Upload/appBet.png" alt="" srcset="">
                                    <!-- <canvas height="133" width="133" style="height: 133px; width: 133px;"></canvas> -->
                                </div>
                                <p>扫码下载APP</p>
                                <div>支持iOS &amp; Android 全部移动设备</div>
                                <a href="https://www.yb409.app">www.yb409.app</a>
                            </div>
                            <div>
                                <div class="bg_2">
                                    <img src="https://webstatic.0am08m.com/assets/home/h5_icon.png">
                                </div>
                                <p>无需下载直接访问</p>
                                <div>无需下载，手机输入网址即可访问</div>
                                <a href="https://www.yabo334.com">www.yabo334.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            type:0,  // 体育APP 全站APP,
            hoverIndex:'',
        }
    },
    methods: {
        setClass(i){
            if(this.hoverIndex !== ''){
                return this.hoverIndex == i
            }else{
                return this.type == i
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.box_1 {
    background: #f4f6f9;
    position: relative;
    z-index: 1;
    height: 900px;
}
.赞助商 {
    padding: 30px 0px 0px;
    display: flex;
    justify-content: space-between;
    a {
        border: none;
        outline: none;
        text-align: center;
        width: 163px;
        height: 134px;
        border-radius: 8px;
        color: #666;
        text-decoration: none;
        background: #fff;
        &:hover {
            transition: all 0.3s;
            background: linear-gradient(0deg, #3b9ee5, #42d2e8);
            color: #fff;
        }
    }
    img {
        width: 60px;
        margin: 12px 0 10px;
    }
    p {
        margin: 0px;
        font-size: 14px;
        line-height: 20px;
    }
}

.app介绍{
    display: flex;
    padding-top: 61px;
    .picture{
        width: 730px;
        margin-right: 15px;
    }
    .文字介绍{
        width: 455px;
        height: 549px;
        margin-top: 44px;
    }
    .体育imglist.hide{
        // display: none;
        opacity: 0;
        div:first-child {
            left: -36px;
        }
        div:nth-child(2) {
            transform: scale(0.9);
        }
        div:nth-child(3) {
            right: 0px;
        }
        div:nth-child(4) ,
        div:nth-child(5) {
            transform: scale(0.9)
        }
    }
    .体育imglist{
        transition: all 0.5s;
        position: relative;
        img{
            width: 100%;
        }
        div{
            transition: all 1s;
        }
        div:first-child {
            position: absolute;
            left: -18px;
            top: 51px;
            width: 279px;
        }
        div:nth-child(2) {
            position: absolute;
            left: 188px;
            top: 0;
            z-index: 1;
            width: 323px;
        }
        div:nth-child(3) {
            position: absolute;
            right: 18px;
            top: 53px;
            height: 550px;
            width: 279px;
        }
        div:nth-child(4) {
            position: absolute;
            left: 16px;
            top: 215px;
            z-index: 0;
            width: 218px;
        }
        div:nth-child(5) {
            position: absolute;
            right: -20px;
            top: 230px;
            z-index: 0;
            width: 290px;
        }
    }
    .全站imglist.hide{
        opacity: 0;
        div:first-child {
            left: -23px - 15px;
        }
        div:nth-child(2) {
            transform: scale(0.9);
        }
        div:nth-child(3) {
            right: 23px - 15px;
        }
        div:nth-child(4),
        div:nth-child(5){
            transform: scale(0.9);
        }
    }
    .全站imglist{
        position: relative;
        transition: all 0.5s;
        img{
            width: 100%;
        }
        div{
            transition: all 1s;
        }
        div:first-child {
            position: absolute;
            left: -23px;
            top: 51px;
            width: 279px;
        }
        div:nth-child(2) {
            position: absolute;
            left: 183px;
            top: 0;
            z-index: 1;
            width: 328px;
        }
        div:nth-child(3) {
            position: absolute;
            right: 23px;
            top: 53px;
            width: 279px;
        }
        div:nth-child(4) {
            position: absolute;
            left: 47px;
            top: 409px;
            width: 165px;
        }
        div:nth-child(5) {
            position: absolute;
            right: 23px;
            top: 387px;
            width: 316px;
        }
    }
    .文字介绍{
        text-align: center;
        h1{
            font-size: 52px;
            font-weight: 300;
            margin:0px 0px 10px;
            background: linear-gradient(90deg,#42d2e8,#3b9ee5);
            color: transparent;
            -webkit-background-clip:text;
        }
        h3{
            margin: 0px;
            font-size: 24px;
            font-weight: 500;
            background: linear-gradient(90deg,#42d2e8,#3b9ee5);
            color: transparent;
            -webkit-background-clip:text;
        }
        .btnList{
            padding: 27px 0 34px;
            border: 0;
            button{
                outline: none;
                width: 180px;
                height: 50px;
                font-size: 16px;
                border-radius: 50px;
                color: #3b9fe5;
                background: hsla(0,0%,100%,.4);
                -webkit-box-shadow: 0 0 8px rgba(59,161,230,.25);
                box-shadow: 0 0 8px rgba(59,161,230,.25);
                border: none;
                margin: 0px 7px;
                cursor: pointer;
                &.active{
                    background: linear-gradient(90deg,#42d2e8,#3a97e5);
                    color: #fff;
                    box-shadow: 0 6px 10px 6px rgba(0,180,255,.3);
                }
            }
        }
        .全站APP描述,
        .体育描述{
            .text_1{
                color: #666;
                text-align: center;
                margin: 0px 0px 30px;
                p{
                    margin: 0px 0px 10px;
                }
            }
            .下载详情{
                display: flex;
                >div{
                    flex: 1;
                }
                p{
                    color: #3a97e5;
                    font-size: 17px;
                    margin: 8px 0;
                }
                a{
                    width: 150px;
                    display: inline-block;
                    overflow: hidden;
                    text-align: center;
                    color: #3a97e5;
                    font-size: 14px;
                    text-decoration: none;
                }
            }
            .bg_1{
                width: 133px;
                height: 133px;
                margin: 8px auto 12px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .bg_2{
                margin: 8px auto 12px;
                width: 116px;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>
