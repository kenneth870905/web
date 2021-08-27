<template>
    <div class="lottery">
        <div class="bg">
            <img :src="config.img_url+'image/lottery/cp-banner.jpg'" alt="" srcset="">
        </div>
        <div class="container">
            <!-- <ul>
                <li>
                    <img :src="config.img_url+'image/lottery/cp-gf.jpg'" alt="">
                    <a :href="config.iframe_url+'/Lottery/Home/Index/1'" target="view_window">进入大厅</a>
                </li>
                <li>
                    <img :src="config.img_url+'image/lottery/cp-xy.jpg'" alt="">
                    <a :href="config.iframe_url+'/Lottery/Home/Index/2'" target="view_window">进入大厅</a>
                </li>
            </ul> -->
            <ul>
                <li>
                    <img :src="config.img_url + 'image/lottery/xtcp.jpg'" alt="" />
                    <div class="btn_1">
                        <a :href="config.iframe_url + '/Lottery/Home/Index/1'" target="view_window">圆角分玩法</a>
                        <a :href="config.iframe_url + '/Lottery/Home/Index/2'" target="view_window">信用玩法</a>
                    </div>
                </li>
                <li @click="vr()">
                    <img :src="config.img_url + 'image/lottery/cp-vr.jpg'" alt="" />
                    <a class="btn2" href="javascript:;">进入大厅</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mapMutations , mapActions } from "vuex";
export default {
    data() {
        return {
            config: config,
            num: 0
        }
    },
    methods: {
        ...mapMutations({
            修改state: '修改state'
        }),
        ...mapActions({
            获取平台余额: '获取平台余额',
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框',
        }),
        vr(){
            // var obj={
            //         name: "VR彩票",
            //         type: "VR",
            //         gid: "16"
            //     }
            this.修改state(['Moneymin', ''])
            this.修改state(['Aname', ''])
            var obj = {
                name: 'VR彩票',
                type: 'VR',
                gid: 16
            }
            this.设置待进入游戏(obj)
            this.设置进入游戏弹框(true)
        }
    },
}
</script>


<style lang="scss" scoped>
.lottery {
    position: relative;
    padding-bottom: 10px;
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .container {
        height: 100%;
        padding-top: 562px;
        ul {
            display: flex;
            justify-content: space-between;
            position: relative;
            // height: 300px;
            width: 100%;
            li {
                height: 300px;
                width: 48%;
                position: relative;
                font-size: 0px;
                img {
                    width: 100%;
                    height: 100%;
                }
                .btn2 {
                    position: absolute;
                    width: 100%;
                    left: 0px;
                    bottom: 0px;
                    transition: all 0.2s;
                    line-height: 50px;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 18px;
                    text-decoration: none;
                    border-top: 1px solid #5f5f5f;
                }
                .btn_1{
                    position: absolute;
                    width: 100%;
                    left: 0px;
                    bottom: 1px;
                    font-size: 18px;
                    text-align: center;
                    // &::after{
                    //     position: absolute;
                    //     left: 50%;
                    //     bottom: 1px;
                    //     width: 1px;
                    //     height: 100%;
                    //     content: "";
                    //     background: #7b7b7b;
                    // }
                    a{
                        position: absolute;
                        line-height: 50px;
                        color: #ffffff;
                        width: 50%;
                        bottom: 0px;
                        text-decoration: none;
                        transition:  all 0.3s;
                        border-top: 1px solid #5f5f5f;
                        &:nth-child(1){
                            left: 0px;
                            border-right: 1px solid #5f5f5f;
                        }
                        &:nth-child(2){
                            right: 0px;
                            border-left: 1px solid #5f5f5f;
                        }
                        &:hover{
                            bottom: 4px;
                        }
                    }
                }
            }
            li:hover {
                .btn2 {
                    line-height: 54px;
                    background: rgba(0, 0, 0, 0.4);
                }
            }
        }
    }
}
</style>

