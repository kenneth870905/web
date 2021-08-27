<template>
    <div class="试玩弹框" >
        <div class="内容" :style="'background-image: url('+config.img_url+'image/shiwan/ntb-bg17.png)'">
            <div @click="关闭()" class="关闭"></div>
            <ul>
                <li @click="点击图片('ag','AG','YOPLAY极速赛马','YP803')">
                    <img :src="config.img_url+ 'image/shiwan/sw1.png'">
                </li>
                <li @click="点击图片('ag','AG','YOPLAY奔驰宝马','YP811')">
                    <img :src="config.img_url+ 'image/shiwan/sw2.png'">
                </li>
                <li @click="点击图片('ag','AG','YOPLAY森林舞会','YP801')">
                    <img :src="config.img_url+ 'image/shiwan/sw3.png'">
                </li>
                <li @click="点击图片('ag','AG','AG真人百家乐','21')">
                    <img :src="config.img_url+ 'image/shiwan/sw4.png'">
                </li>
                <li @click="点击图片('ag','AG','AG真人牛牛','32')">
                    <img :src="config.img_url+ 'image/shiwan/sw5.png'">
                </li>
                <li @click="点击图片('ag','AG','AG捕鱼王','6')">
                    <img :src="config.img_url+ 'image/shiwan/sw6.png'">
                </li>
                <li @click="点击图片('ag','AG','YOPLAY水果机','YP813')">
                    <img :src="config.img_url+ 'image/shiwan/sw7.png'">
                </li>
                <li @click="跳转('20001')">
                    <img :src="config.img_url+ 'image/shiwan/sw8.png'">
                </li>
                <li @click="跳转('70000')">
                    <img :src="config.img_url+ 'image/shiwan/sw9.png'">
                </li>
                <li @click="跳转('10000')">
                    <img :src="config.img_url+ 'image/shiwan/sw10.png'">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: '',
  inject: ['关闭试玩'],
  data () {
    return {
      config: config,
      显示试玩: true
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
    关闭 () {
      this.关闭试玩()
    },
    点击图片 (type, Aname, name, gid) {
      this.获取平台余额(type)
      this.修改state(['Aname', Aname])
      // play('YYOPLAY奔驰宝马','ag','bcbm')
      var obj = {
        name: name,
        type: type,
        gid: gid
        // url_key:url_key,
        // url_id:url_id
      }
      this.修改state(['待进入游戏', obj])
      this.设置进入游戏弹框(true)
    },
    跳转 (id) {
      window.open(config.iframe_url + '/Lottery/Bet/Index/2/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.试玩弹框{
    position: fixed;
    z-index: 10;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .内容{
        width: 1180px;
        height: 400px;
        background-size:cover;
        position: relative;
        .关闭{
            position: absolute;
            top: 28px;
            right: 28px;
            width: 35px;
            height: 35px;
            cursor: pointer;
            // border: 1px solid red;
        }
        ul{
            display: flex;
            margin: 120px 0px 0px;
            padding: 0px 50px;
            width: 100%;
            box-sizing: border-box;
            li{
                flex-grow: 1;
                cursor: pointer;
            }
            li:hover{
                img{
                    transform: translate(2px,-4px) ;
                    filter: grayscale(0%);
                }
            }
            img{
                transition: all 0.1s;
                width: 100%;
                filter: grayscale(60%);
            }
        }
    }
}
</style>
