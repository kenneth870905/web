<template>
    <div class="phone">
        <div class="container">
            <div class="container_left">
                <div class="container_left_box">
                    <img src="image/phone/phonebg.jpg">
                </div>
            </div>

            <div class="container_right">
                <div class="right_top">
                    <img src="image/phone/phonebg1.jpg">
                </div>
                <div class="right_content">
                    <div class="right_content_left">
                        <img src="image/phone/iphonedownwps.png">
                    </div>
                    <div class="right_content_right">
                        <img src="image/phone/androiddown.png">
                    </div>
                </div>
                <div class="right_bottom">
                    <div class="right_bottom_left">
                        <img :src="站点配置.appUrl">
                    </div>
                    <div class="right_bottom_right">
                        <img :src="站点配置.appUrl">
                    </div>
                </div>
            </div>
        </div>
        <div class="Phone_bottom">
            <div class="container" style="background-image: url('image/phone/phonebottom.png');"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            dataconfig: {

            },
            dataconfig: {
                api_urlImg: config.api_url,//api_url
                api_urlData: config.api_urlImg,//api_urlData
            },
        }
    },
    computed: {

        ...mapGetters({
            站点配置: "站点配置"
        })
    },

    created() {
        if (!this.站点配置.appUrl) {
            this.$router.push('/')
        }
    },
}
</script>
  <style lang="scss" scoped>
.phone {
    background: #ffdc37;
    .container {
        display: flex;
        .container_left {
            .container_left_box {
                margin-right: 50px;
                height: 578px;
                width: 440px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .container_right {
            .right_top {
                width: 518px;
                height: 218px;
                margin-left: 60px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right_content {
            margin-top: 30px;
            margin-bottom: 40px;
            display: flex;
            .right_content_left,
            .right_content_right {
                margin: 0px 20px;
                width: 280px;
                height: 60px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right_bottom {
            display: flex;
            .right_bottom_left,
            .right_bottom_right {
                margin: 0px auto;
                width: 200px;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .Phone_bottom {
        background: #e94335;
        padding: 20px 0px 20px 0px;
        .container {
            width: 1000px;
            height: 56px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
  