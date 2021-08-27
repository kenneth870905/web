<template>
    <div class="youxi">
        <ul class="w1200">
            <li v-for="(item, index) in list" :key="index">
                <div class="正面">
                    <img class="bg1" :src="`static/image/home/${item.img}`" alt="">
                    <div class="content">
                        <img class="bg2" :src="`static/image/home/${item.img2}`" alt="">
                        <h4>{{item.name}}</h4>
                        <h5>{{item.text1}}</h5>
                    </div>
                </div>
                <ul class="背面" style="background-image:url('static/image/home/bg_blue.png')">
                    <li v-for="(item2, index2) in item.children" :key="index2">
                        <img :src="`static/image/home/${item2.img}`" alt="">
                        <h5>{{item2.name}}</h5>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            list: [
                {
                    name: "真人娱乐", img: "img_1.png", img2:"icon_live_casino.png", text1: "LIVE CASINO",
                    children: [
                        { name: "AG视讯", img: "logo_ag.svg" },
                        { name: "EBET视讯", img: "logo_ebet.svg" },
                        { name: "OG视讯", img: "logo_og.png" },
                        { name: "GD视讯", img: "logo_gd.svg" },
                        { name: "BBIN视讯", img: "logo_zr_gd.svg" }
                    ]
                },
                {
                    name: "电子竞技", img: "img_2.png", img2:'icon_electric.png' , text1: "ELECTRIC CONTEST",
                    children: [
                        { name: "IM电竞", img: "logo-im-gaming.svg" },
                        { name: "泛亚电竞", img: "logo-fanya.svg" }
                    ]
                },
                {
                    name: "彩票投注", img: "img_3.png" , img2:"icon_lottery.png", text1: "LOTTERY GAME",
                    children: [
                        { name: "双赢彩票", img: "logo_double.svg" },
                        { name: "LB彩票", img: "logo_lb.svg" },
                        { name: "KG彩票", img: "logo_kg.svg" },
                        { name: "BBIN彩票", img: "logo_bbin.svg" },
                        { name: "TCG彩票", img: "logo_tcg.svg" }
                    ]
                },
                {
                    name: "捕鱼电玩", img: "img_4.png", img2:"icon_video.png", text1: "VIDEO GAME",
                    children: [
                        { name: "PG电子", img: "logo_pg.svg" },
                        { name: "PT电子", img: "logo_pt.svg" },
                        { name: "MG电子", img: "logo_mg.svg" },
                        { name: "PP电子", img: "logo_pp.svg" },
                        { name: "DT电子", img: "logo_dt.svg" },
                        { name: "捕鱼游戏", img: "logo_fish.svg" }
                    ]
                },
                {
                    name: "棋牌游戏", img: "img_5.png", img2:"icon_chess.png",text1: "CHESS AND CARD",
                    children: [
                        { name: "双赢棋牌", img: "logo_shuangying.svg" },
                        { name: "高登棋牌", img: "logo_gaodeng.svg" }
                    ]
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.youxi {
    padding: 70px 0px 0px;
    background-color: #f4f6f9;
    position: relative;
}
.w1200{
    text-align: center;
    display: flex;
    justify-content: space-between;
    >li{
        width: 194px;
        height: 442px;
        cursor: pointer;
        position: relative;
        transition: all 1s;
        &:hover{
            .正面{
                transform: rotateY(180deg);
            }
            .背面{
                transform: rotateY(0deg) scale(1.186);
            }
        }
    }
    .正面{
        height: 100%;
        position: relative;
        
        // transition: .8s ease-in-out;
        transition: all 1s;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        .bg1{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .content{
            position: relative;
            z-index: 1;
            color: #fff;
            padding: 286px 0px 0px;
            h4{
                font-size: 16px;
                margin: 0px 0px 5px;
                font-weight: 500;
            }
            h5{
                font-weight: 500;
                margin: 0px;
                font-size: 12px;
            }
        }
    }
    .背面{
        // transition: .8s ease-in-out;
        transition: all 1s;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        transform: rotateY(180deg);
        display: flex;
        // display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li{
            width: 130px;
            height: 64px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            &::after{
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 1px;
                content: '';
                background: linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0));
            }
            &:hover{
                background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.15)),
                        linear-gradient(450deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0))
            }
        }
        li:last-child{
            &::before{
                position: absolute;
                left: 0px;
                bottom: 0px;
                width: 100%;
                height: 1px;
                content: '';
                background: linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0));
            }
        }
        h5{
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            margin: 0px;
        }
        img{
            max-height: 26px;
        }
    }
}
</style>
