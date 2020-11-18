<template>
    <div class="header">
        <div class="t1 w1200">
            <div>
                <span>GMT+8</span>
                <span>2020-02-14</span>
                <span>12:55:40</span>
                <a href="#/">网站首页</a>
                <span>｜</span>
                <span><a href="javascript:;">在线客服</a></span>
            </div>
            <div>
                <div class="btn_list">
                    <!-- <input placeholder="账号" />
                    <div>
                        <input placeholder="密码">
                        <div>忘记？</div>
                    </div> -->
                    <button><span>登录</span><i></i></button>
                    <button><span>注册</span><i></i></button>
                </div>
            </div>
        </div>
        <div class="navigation">
            <div class="content1">
                <div class="item">
                    <div class="t2" @click="$router.push('/sports')">
                        <span>亚博体育</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 体育">
                            <template v-for="(item,index) in list.tiyu">
                                <div class="item2">
                                    <div :style="{'background-image':`url(static/image/daohang/${item.img})`}">
                                        <p class="title_1">{{item.name}}</p>
                                        <p class="title_2">{{item.title}}</p>
                                    </div>
                                </div>
                                <div class="rebate">
                                    <p class="p2">YABO SPORTS<br>EVENTS</p>
                                    <p class="p3">返水最高可达</p>
                                    <div>
                                        {{item.rebate}}
                                        <span>%</span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2" @click="$router.push('/athletics')">
                        <span>电子竞技</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 电竞">
                            <div class="item2" v-for="(item, index1) in list.dianjing" :key="index1">
                                <div class="title_1">{{item.name}}</div>
                                <div class="title_2">{{item.title}}</div>
                                <div class="bg" style="background-image:url('static/image/daohang/daohang_3.png')"></div>
                            </div>
                            <div class="rebate">
                                <p class="p2">ELECTRONIC<br>SPORTS</p>
                                <p class="p3">返水最高可达</p>
                                <div>
                                    1.10
                                    <span>%</span>
                                    <!-- <img src="https://webstatic.0am08m.com/assets/navbar/sprites/percentage.png" alt="" srcset=""> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2" @click="$router.push('/realbet')">
                        <span>真人娱乐</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 真人">
                            <div class="item2" v-for="(item, index) in list.zhenren" :key="index">
                                <div class="bg1" style="background-image:url('static/image/daohang/daohang_4.png')"></div>
                                <p class="title_3">{{item.name}}</p>
                                <div class="bg2" style="background-image:url('static/image/daohang/daohang_4.png')"></div>
                            </div>
                            <div class="rebate">
                                <p class="p1">真人娱乐</p>
                                <p class="p2">LIVE<br>CASINO</p>
                                <p class="p3">返水最高可达</p>
                                <div>
                                    1.00
                                    <span>%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2" @click="$router.push('/lottery')">
                        <span>彩票投注</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 彩票">
                            <div class="item2" v-for="(item, index) in list.caipiao" :key="index">
                                <div class="bg1" style="background-image: url('static/image/daohang/daohang_5.png')"></div>
                                <p>{{item.name}}</p>
                                <div class="bg2" style="background-image: url('static/image/daohang/daohang_5.png')"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2">
                        <span>电子游艺</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 电子">
                            <div class="item2" v-for="(item, index) in list.dianzi" :key="index">
                                <div class="bg1" style="background-image:url('static/image/daohang/daohang_6.png')"></div>
                                <p>{{item.name}}</p>
                                <div class="bg2" style="background-image:url('static/image/daohang/daohang_6.png')"></div>
                            </div>
                            <div class="rebate">
                                <p class="p1">电子游戏</p>
                                <p class="p2">SLOT<br>GAME</p>
                                <p class="p3">返水最高可达</p>
                                <div>
                                    1.20<span>%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="log"><img src="https://webstatic.0am08m.com/assets/navbar/yabo_logo.png.webp"></div>
                <div class="item">
                    <div class="t2">
                        <span>棋牌游戏</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 棋牌">
                            <div class="item2" v-for="(item, index) in list.qipai" :key="index">
                                <div class="bg1" style="background-image:url('static/image/daohang/daohang_7.png')"></div>
                                <div class="rebate">
                                    <h3 class="text1">{{item.name}}</h3>
                                    <p class="text2">{{item.title}}</p>
                                    <span class="text3">CHESS GAME</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2">
                        <span>手机APP</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 手机app">
                            <div class="item2">
                                <div class="bg1" style="background-image:url('static/image/daohang/cell_app_nav1.png')"></div>
                                <div class="text1">
                                    <h3 class="text2">体育APP</h3>
                                    <div class="img_1">
                                        <img src="https://0698aa.com/App_Upload/appBet.png" alt="" srcset="">
                                    </div>
                                    <p class="text3">扫一扫下载体育APP</p>
                                    <p class="text4">支持iOS &amp; Android等全部移动设备</p>
                                    <a href="https://www.yb57.app">www.yb57.app</a>
                                </div>
                            </div>
                            <div class="item2">
                                <div class="bg1" style="background-image:url('static/image/daohang/cell_app_nav2.png')"></div>
                                <div class="text1">
                                    <h3 class="text2">全站APP</h3>
                                    <div class="img_1">
                                        <img src="https://0698aa.com/App_Upload/appBet.png" alt="" srcset="">
                                    </div>
                                    <p class="text3">扫一扫下载全站APP</p>
                                    <p class="text4">支持iOS &amp; Android等全部移动设备</p>
                                    <a href="https://www.yb409.app">www.yb409.app</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="t2">
                        <span>赞助专题</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <ul class="w1200 list 赞助">
                            <li class="item2" v-for="(item, index) in list.zanzhu" :key="index">
                                <div class="bg1" style="background-image:url('static/image/daohang/sprite.png')"></div>
                                <p>{{item.name}}</p>
                                <p>{{item.title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="item">
                    <div class="t2">
                        <span>合营计划</span>
                        <!-- <i class="el-icon-arrow-down"></i> -->
                    </div>
                </div>
                <div class="item">
                    <div class="t2">
                        <span>优惠活动</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="c2">
                        <div class="w1200 list 优惠">
                            <div class="item2">
                                <div class="bg1" style="background-image:url('static/image/daohang/activity_sprite1.png')"></div>
                                <div class="text_1">
                                    <h3>劲爆优惠</h3>
                                    <p>体育首存即送50%红利</p>
                                    <span>PROMOTIONS</span>
                                </div>
                            </div>
                            <div class="item2">
                                <div class="bg1" style="background-image:url('static/image/daohang/activity_sprite2.png')"></div>
                                <div class="text_1">
                                    <h3>亚博全员福利</h3>
                                    <p>邀请有礼 亚博等你</p>
                                    <span>PROMOTIONS</span>
                                </div>
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
            list: {
                tiyu: [
                    { name: "亚博体育", img: "daohang_1.png", title: "奇幻赛事、特别投注 ，各种趣味玩法，最全赛事覆盖助你花式收米赢到人生巅峰", rebate: '1.18' },
                    { name: "IM体育", img: "daohang_1.png", title: "最多投注类型，最强投注体验，支持提前兑现，收米也要快人一步，想你所想，投你所爱", rebate: '1.18' }
                ],
                dianjing: [
                    { name: "IM电竞", img: "", title: "最全赛事 一应俱全" },
                    { name: "泛亚电竞", img: "", title: "赛事最多 玩法最多" }
                ],
                zhenren: [
                    { name: "AG真人", img: "", title: "" },
                    { name: "EBET真人", img: "", title: "" },
                    { name: "OG真人", img: "", title: "" },
                    { name: "GD真人", img: "", title: "" },
                    { name: "BBIN真人", img: "", title: "" },
                ],
                caipiao: [
                    { name: "双赢彩票", img: "", title: "" },
                    { name: "LB彩票", img: "", title: "" },
                    { name: "KG彩票", img: "", title: "" },
                    { name: "BBIN彩票", img: "", title: "" },
                    { name: "TCG彩票", img: "", title: "" },
                ],
                dianzi: [
                    { name: "PG电子", img: "", title: "" },
                    { name: "PT电子", img: "", title: "" },
                    { name: "MG电子", img: "", title: "" },
                    { name: "PP电子", img: "", title: "" },
                    { name: "DT电子", img: "", title: "" },
                    { name: "捕鱼游戏", img: "", title: "" },
                ],
                qipai: [
                    { name: "高登棋牌", img: "", title: "玩出运气 赢得喜气" },
                    { name: "双赢棋牌", img: "", title: "真金白银斗阵 其乐无穷" },
                ],
                zanzhu:[
                    { name: "英超曼联", img: "", title: "全球赞助商" },
                    { name: "意大利甲级联赛", img: "", title: "全球赞助商" },
                    { name: "德甲拜仁慕尼黑", img: "", title: "亚洲区赞助商" },
                    { name: "杰拉德", img: "", title: "代言人专题" },
                    { name: "英超莱斯特城", img: "", title: "亚洲区赞助商" },
                    { name: "阿根廷国家队", img: "", title: "官方合作伙伴" },
                    { name: "法甲摩纳哥", img: "", title: "官方合作伙伴" },
                    { name: "德甲柏林赫塔", img: "", title: "官方合作伙伴" }
                ]
            }
        }
    },
    mounted() {
        CSS.registerProperty({
            name: '--start-1',
            syntax: '<color>',
            inherits: false,
            initialValue: 'transparent'
        });
        CSS.registerProperty({
            name: '--end-1',
            syntax: '<color>',
            inherits: false,
            initialValue: 'transparent'
        });
    },
}
</script>

<style lang="scss" scoped>
.header {
    background: #3d4145;
    position: fixed;
    width: 100%;
    left: 0px;
    top: 0px;
    z-index: 5;
}

.t1 {
    height: 34px;
    line-height: 34px;
    display: flex;
    justify-content: space-between;
    color: #c0c0c0;
    a {
        color: #c0c0c0;
        text-decoration: none;
        &:hover {
            color: #ffffff;
        }
    }
    span {
        margin: 0px 5px 0px 0px;
    }
    > div:nth-child(1) {
        span:nth-child(2) {
            margin: 10px;
        }
        span:nth-child(3) {
            margin: 0px 40px 0px 0px;
        }
    }
    .btn_list {
        height: 100%;
        display: flex;
        align-items: center;
        button {
            color: #ededfc;
            width: 72px;
            height: 28px;
            line-height: 28px;
            border: none;
            float: left;
            cursor: pointer;
            font-size: 14px;
            border-radius: 4px;
            margin: 0px 0px 0px 10px;
            position: relative;
            span {
                position: relative;
                z-index: 1;
            }
            i {
                background: #ee8f13;
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: 0px;
                top: 0px;
                z-index: 0;
                border-radius: 4px;
                transition: all 0.2s;
                transform: scale(0);
                opacity: 0;
            }
            &:hover {
                i {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
        button:nth-child(1) {
            background: #01a69c;
        }
        button:nth-child(2) {
            background: #1c97ce;
        }
    }
}

.navigation {
    position: relative;
    background: #fff;
    .log {
        cursor: pointer;
        width: 140px;
        img {
            width: 100%;
        }
    }
    .content1 {
        width: 1200px;
        margin: 0px auto;
        height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .t2 {
        line-height: 86px;
        transition: all 0.3s;
        cursor: pointer;
        font-size: 16px;
        i {
            margin: 0px 0px 0px 5px;
            transition: all 0.3s;
            display: inline-block;
        }
        &:hover {
            color: #00a5e2;
            i {
                transform: rotate(180deg);
            }
        }
    }
    .c2 {
        overflow: hidden;
        height: 0;
        width: 100%;
        background: rgba(239, 242, 245, 0.95);
        position: absolute;
        left: 0px;
        top: 85px;
        transition: all 0.5s;
        box-shadow: 0 10px 15px 0 rgba(0,0,0,.15);
    }
    .item2{
        --start-1: rgba(255, 255, 255, 0);
        --end-1: rgba(255, 255, 255, 0);
        background: linear-gradient(
            0deg,
            var(--start-1),
            var(--end-1),
            var(--start-1)
        );
        transition: --start-1 0.5s, --end-1 0.5s;
        &:hover {
            --start-1: rgba(255, 255, 255, 0.72);
            --end-1: rgba(255, 255, 255, 0);
            .bg2 {
                transform: scale(1.03);
            }
        }
    }
    .item:hover .c2 {
        height: 300px;
    }
    .list {
        display: flex;
        height: 300px;
    }
    .title_1 {
        font-size: 40px;
        margin: 0px;
        color: #343434;
        line-height: 52px;
        text-align: center;
    }
    .title_2 {
        text-align: center;
        width: 420px;
        margin: 0 auto;
        line-height: 21px;
        font-size: 16px;
        color: #999;
    }
    .rebate {
        flex-grow: 1;
        flex-shrink: 0;
        padding: 60px 0px 0px 23px;
        .p1 {
            font-size: 30px;
            color: #3e93d8;
            margin: 0px;
        }
        .p2 {
            line-height: 28px;
            font-size: 20px;
            color: #343434;
            margin: 0px 0px 0px 0px;
        }
        .p3 {
            margin: 3px 0px 0px 0px;
            color: #666;
            font-size: 18px;
        }
        div {
            font-size: 65px;
            font-weight: bold;
            letter-spacing: -5px;
            color: #4092d6;
            margin: 10px 0px 0px 0px;
            transform: scaleY(1.3);
            span {
                font-size: 24px;
                margin: 0px 0px 0px -8px;
            }
        }
    }
}

.体育 {
    .item2 {
        cursor: pointer;
        width: 420px;
        &:hover {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.72),
                transparent,
                rgba(255, 255, 255, 0.72)
            );
        }
        div {
            height: 100%;
            padding: 25px 0px 0px;
            background-size: 100% auto;
            background-repeat: no-repeat;
            background-position: center bottom;
            // background: linear-gradient(0deg, rgba(255, 255, 255, 0.72), transparent,rgba(255, 255, 255, 0.72));
        }
    }
}
.电竞 {
    .item2 {
        width: 500px;
        padding: 25px 0px 0px;
        cursor: pointer;
        &:hover {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.72),
                transparent,
                rgba(255, 255, 255, 0.72)
            );
            .bg {
                transform: scale(1.03);
            }
        }
    }
    .bg {
        background-size: cover;
        width: 417px;
        height: 178px;
        margin: 24px auto 0;
        transition: all 0.3s;
    }
    .item2:nth-child(1) .bg {
        background-position: -422px 0px;
    }
    .item2:nth-child(2) .bg {
        background-position: 0px 0px;
    }
}
.真人 {
    .item2 {
        cursor: pointer;
        width: calc((100% - 200px) / 5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:hover {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.72),
                transparent,
                rgba(255, 255, 255, 0.72)
            );
            .bg2 {
                transform: scale(1.03);
            }
        }
    }
    .title_3 {
        font-size: 16px;
        color: #000;
        margin: 11px 0 15px;
        text-align: center;
    }
    .rebate {
        width: 200px;
        flex-shrink: 0;
    }
    .bg2 {
        width: 140px;
        height: 140px;
        transition: all 0.3s;
    }
    .item2:nth-child(1) {
        .bg1 {
            width: 109px;
            height: 35px;
            background-position: -142px 0px;
            background-size: 1187px 140px;
        }
        .bg2 {
            background-position: 0px 0px;
            background-size: 1187px 140px;
        }
    }
    .item2:nth-child(2) {
        .bg1 {
            width: 103px;
            height: 31px;
            background-position: -628px 0px;
            background-size: 1187px 140px;
        }
        .bg2 {
            background-position: -486px 0px;
            background-size: 1187px 140px;
        }
    }
    .item2:nth-child(3) {
        .bg1 {
            width: 72px;
            height: 53px;
            background-position: -1115px 0px;
            background-size: 1187px 140px;
        }
        .bg2 {
            background-position: -973px 0px;
            background-size: 1187px 140px;
        }
    }
    .item2:nth-child(4) {
        .bg1 {
            width: 96px;
            height: 35px;
            background-position: -875px 0px;
            background-size: 1187px 140px;
        }
        .bg2 {
            background-position: -733px 0px;
            background-size: 1187px 140px;
        }
    }
    .item2:nth-child(5) {
        .bg1 {
            width: 89px;
            height: 34px;
            background-position: -395px 0px;
            background-size: 1187px 140px;
        }
        .bg2 {
            background-position: -253px 0px;
            background-size: 1187px 140px;
        }
    }
}

.彩票 {
    .item2 {
        cursor: pointer;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        --start-1: rgba(255, 255, 255, 0);
        --end-1: rgba(255, 255, 255, 0);
        background: linear-gradient(
            0deg,
            var(--start-1),
            var(--end-1),
            var(--start-1)
        );
        // transition: all 2s;
        transition: --start-1 0.5s, --end-1 0.5s;
        &:hover {
            --start-1: rgba(255, 255, 255, 0.72);
            --end-1: rgba(255, 255, 255, 0);
            .bg2 {
                transform: scale(1.03);
            }
        }
    }
    p {
        margin: 14px 0 0;
        font-size: 16px;
        color: #000;
    }
    .bg2 {
        transition: all 0.5s;
    }
    .item2:nth-child(1) {
        .bg1 {
            width: 29px;
            height: 29px;
            background-position: -878px 0px;
            background-size: 1121px 183px;
        }
        .bg2 {
            background-position: -700px 0px;
            background-size: 1121px 183px;
            width: 176px;
            height: 183px;
        }
    }
    .item2:nth-child(2) {
        .bg1 {
            width: 56px;
            height: 26px;
            background-position: -642px 0px;
            background-size: 1121px 183px;
        }
        .bg2 {
            width: 176px;
            height: 183px;
            background-position: -464px 0px;
            background-size: 1121px 183px;
        }
    }
    .item2:nth-child(3) {
        .bg1 {
            width: 34px;
            height: 32px;
            background-position: -428px 0px;
            background-size: 1121px 183px;
        }
        .bg2 {
            width: 176px;
            height: 183px;
            background-position: -250px 0px;
            background-size: 1121px 183px;
        }
    }
    .item2:nth-child(4) {
        .bg1 {
            width: 70px;
            height: 27px;
            background-position: -178px 0px;
            background-size: 1121px 183px;
        }
        .bg2 {
            width: 176px;
            height: 183px;
            background-position: 0px 0px;
            background-size: 1121px 183px;
        }
    }
    .item2:nth-child(5) {
        .bg1 {
            width: 34px;
            height: 34px;
            background-position: -1087px 0px;
            background-size: 1121px 183px;
        }
        .bg2 {
            width: 176px;
            height: 183px;
            background-position: -909px 0px;
            background-size: 1121px 183px;
        }
    }
}
.电子{
    .item2 {
        cursor: pointer;
        width: calc( (100% - 200px) / 5 );
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .bg2{
        transition: all 0.5s;
    }
    .item2:nth-child(1){
        .bg1{
            width: 50px;
            height: 26px;
            background-position: -743px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: -602px 0px;
            background-size: 1137px 139px;
        }
    }
    .item2:nth-child(2){
        .bg1{
            width: 39px;
            height: 26px;
            background-position: -1098px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: -957px 0px;
            background-size: 1137px 139px;
        }
    }
    .item2:nth-child(3){
        .bg1{
            width: 32px;
            height: 32px;
            background-position: -568px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: -427px 0px;
            background-size: 1137px 139px;
        }
    }
    .item2:nth-child(4){
        .bg1{
            width: 29px;
            height: 40px;
            background-position: -926px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: -785px 0px;
            background-size: 1137px 139px;
        }
    }
    .item2:nth-child(5){
        .bg1{
            width: 109px;
            height: 11px;
            background-position: -316px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: -175px 0px;
            background-size: 1137px 139px;
        }
    }
    .item2:nth-child(6){
        .bg1{
            width: 32px;
            height: 32px;
            background-position: -141px 0px;
            background-size: 1137px 139px;
        }
        .bg2{
            width: 139px;
            height: 139px;
            background-position: 0px 0px;
            background-size: 1137px 139px;
        }
    }
}

.棋牌{
    .item2 {
        cursor: pointer;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            .bg1{
                transform: scale(1.03);
            }
        }
    }
    .rebate{
        flex-grow: 0;
    }
    .text1{
        font-size: 40px;
        color: #343434;
        margin: 0px;
        font-weight: 500;
    }
    .text2{
        font-size: 16px;
        color: #999;
        margin: 15px 0 12px;
    }
    .text3{
        font-size: 24px;
    }
    .bg1{
        width: 242px;
        height: 260px;
        transition: all 0.5s;
    }
    .item2:nth-child(1){
        .bg1{
            background-position: 0px 0px;
            background-size: 492px 269px;
        }
    }
    .item2:nth-child(2){
        .bg1{
            background-position: -244px 0px;
            background-size: 492px 269px;
        }
    }
}

.手机app{
    .item2 {
        cursor: pointer;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            .bg1{
                transform: scale(1.03);
            }
        }
    }
    .bg1{
        width: 304px;
        height: 249px;
        margin-top: 50px;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 0.5s;
    }
    .text1{
        text-align: center;
        margin: 0px 0px 0px 25px;
        .text2{
            color: #333;
            font-size: 24px;
            margin-bottom: 9px;
            font-weight: 500;
        }
        .img_1{
            margin: auto;
            width: 97px;
            height: 97px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text3{
            font-size: 16px;
            color: #333;
            margin: 12px 0px 0px;
        }
        .text4{
            font-size: 12px;
            color: #666;
            margin: 6px 0 3px;
        }
        a{
            font-size: 18px;
            color: #3b9be5;
            text-decoration: none;
        }
    }
}

.赞助{
    display: flex;
    text-align: center;
    .item2{
        width: calc(100% / 8);
        padding: 46px 0px 0px;
        cursor: pointer;
    }
    p{
        margin: 0px;
    }
    .bg1{
        margin: 0px auto 15px;
        width: 118px;
        height: 118px;
    }
    @for $i from 1 through 8 { 
        .item2:nth-child(#{$i}){
           .bg1{
               background-position: -122px * ($i - 1)  0px;
           } 
        } 
    }
}

.优惠{
    .item2{
        cursor: pointer;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            .bg1{   
                transform: scale(1.03);
            }
        }
    }
    .bg1{
        width: 282px;
        height: 258px;
        background-size: cover;
        transition: all 0.5s;
    }
    .text_1{
        margin: 0px 0px 0px 18px;
        h3{
            font-size: 40px;
            color: #343434;
            font-weight: 500;
            margin: 0px;
        }
        p{
            font-size: 16px;
            color: #999;
            margin: 15px 0 12px;
        }
        span{
            font-size: 24px;
        }
    }
}

</style>
