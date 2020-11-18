<template>
    <div class="lottery">
        <div class="bg">
            <img :src="config.img_url+'image/lottery/cp-banner.jpg'" alt="" srcset="">
        </div>
        <div class="container">
            <ul>
                <li>
                    <img :src="config.img_url+'image/lottery/cp-gf.jpg'" alt="">
                    <a :href="config.iframe_url+'/Lottery/Home/Index/1'" target="view_window">进入大厅</a>
                </li>
                <li>
                    <img :src="config.img_url+'image/lottery/cp-xy.jpg'" alt="">
                    <a :href="config.iframe_url+'/Lottery/Home/Index/2'" target="view_window">进入大厅</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      config: config,
      num: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.lottery{
    position: relative;
    padding-bottom: 10px;
    .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;

        img{
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
                img{
                    width: 100%;
                    height: 100%;
                }
                a{
                    position: absolute;
                    width: 100%;
                    height: 50px;
                    left: 0px;
                    bottom: 0px;
                    transition: all 0.2s;
                    line-height: 50px;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 18px;
                }
            }
            li:hover{
                a{
                    height: 51px;
                    background: rgba(0,0,0,0.4);
                }
            }
        }
    }
}
</style>
