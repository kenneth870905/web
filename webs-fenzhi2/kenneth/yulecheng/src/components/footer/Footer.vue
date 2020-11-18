<template>
    <div class="tb-foot fl">
        <div class="main">
            <div class="tb-foot-1 fl" v-if="config.footer_show==1">
                <div class="bottom w1000" :style="'  background: url('+config.footer_1+') top center no-repeat;'">
                    <div class="wz">
                        {{config.footer_text}}
                    </div>
                    <div class="tp">
                        <img :src="config.footer_2" height="99" width="316">
                    </div>
                </div>
            </div>
            <ul class="tb-foot-2 fl">
                <li>
                    <a href="javascript:;" @click="go('/About')">关于{{config.title}}娱乐城</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">博彩责任</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">规则与声明</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">常见问题</a>
                    <span>|</span>
                </li>
                <li>
                    <p>建议使用谷歌chrome浏览器、搜狗浏览器、360浏览器，给您的体验会更好哦！<br>
                    {{config.title}} 娱乐城<span>|</span>版权所有
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      config: config
    }
  },
  methods: {
    go (url) {
      this.$router.push(url)
      console.log(123)
      $('body,html').animate({ scrollTop: 0 }, 300)
    }
  }
}

</script>
<style lang="scss" scoped>
.main{
    max-width: 100%;
}
/*2017-08-08-底部样式-开始*/
body {
    font: 12px/1.5 arial, "Microsoft YaHei", "SimSun";
    font-family: "Microsoft YaHei";
    background: #f5f5f5;
    color: #000;
    width: 100%;
}

.tb-foot {
    width: 100%;
    background: #1f1e22;

    .tb-foot-1 {
        width: 100%;
        padding-bottom: 25px;
        border-bottom: 1px solid #151515;

        .bottom {
            height: 322px;
            position: relative;
            width: 0;
            width: 1000px;
            margin: 0 auto;
            .wz {
                position: absolute;
                left: 0;
                top: 130px;
                color: #969696;
                font-family: "Microsoft Yahei";
                line-height: 24px;
                width: 325px;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
                overflow: hidden;
                max-height: 120px;
            }

            .tp {
                position: absolute;
                right: 0px;
                top: 130px;
            }
        }
    }

    .tb-foot-2 {
        width: 100%;
        padding: 10px 0;
        border-top: 1px solid #2b2a2e;

        li {
            text-align: center;
            line-height: 28px;
            padding: 10px 0;

            a {
                display: inline-block;
                padding: 0 6px;
                font-size: 13px;
                color: #fff;
                font-weight: 200;
            }

            a:hover {
                color: #ff3a2b;
                text-decoration: underline;
            }

            span {
                display: inline-block;
                margin: 0 30px;
                color: #363636;
            }

            p {
                color: #808080;
                font-size: 12px;
                font-weight: 600;

                span {
                    display: inline-block;
                    margin: 0 30px;
                    color: #363636;
                }
            }
        }
    }
}

/*2017-08-08-底部样式-结束*/
</style>
