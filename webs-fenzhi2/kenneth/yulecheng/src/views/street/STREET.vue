<template>
    <div class="street" :style='{"background-image":"url("+streetBanner+")"}'>
        <div class="container">
            <div class="entrance_btn" @click="entranceBtn('YOPLAY街机&水果机','ag','yp','YP800')"></div>
            <ul>
                <li @click="entranceBtn('YOPLAY水果拉霸','ag','sglb','YP813')" class="fruits_box"><img :src="fruits" alt="">
                    <div></div>
                </li>
                <li @click="entranceBtn('YOPLAY奔驰宝马','ag','bcbm','YP811')"><img :src="automobile" alt=""></li>
                <li @click="entranceBtn('YOPLAY飞禽走兽','ag','fqzs','YP814')" class="fruits_box"><img :src="animal" alt="">
                    <div></div>
                </li>

            </ul>
        </div>

    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            streetBanner: config.img_url + 'image/street/yo-bg04.jpg', // 大背景
            fruits: config.img_url + 'image/street/yo-bg06.jpg', // 水果
            animal: config.img_url + 'image/street/fqzs.jpg', // 动物
            automobile: config.img_url + 'image/street/yo-bg05.jpg' // 汽车
        }
    },
    methods: {
        ...mapActions({
            设置进入游戏弹框: '设置进入游戏弹框',
            设置待进入游戏: '设置待进入游戏',
            获取平台余额: '获取平台余额'
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        entranceBtn(name, url_key, url_id, gid) {
            this.修改state(['Aname', 'AG'])
            // play('YYOPLAY奔驰宝马','ag','bcbm')
            var obj = {
                name: name,
                type: 'ag',
                gid: gid
            }
            this.修改state(['待进入游戏', obj])
            this.设置进入游戏弹框(true)
        }
    }
}
</script>

<style lang="scss" scoped>
.street {
    height: 892px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .container {
        max-width: 100%;
        padding-top: 536px;
        position: relative;
        .entrance_btn {
            position: absolute;
            left: 551px;
            top: 373px;
            width: 120px;
            height: 120px;
        }
        ul {
            width: 100%;
            display: flex;
            align-items: center;
            li:hover img {
                transform: scale(1.07);
            }
            .fruits_box:hover div {
                display: none;
            }
            li {
                transition: all 2s;
                position: relative;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    transition: all 0.6s;
                }
                div {
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
            }
            li:nth-child(1),
            li:nth-child(3) {
                width: 22%;
                height: 300px;
            }
            li:nth-child(2) {
                width: 56%;
                height: 330px;
                div {
                    display: none;
                }
            }
        }
    }
}
</style>
