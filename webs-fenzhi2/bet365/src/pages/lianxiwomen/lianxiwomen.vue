<template>
    <div>
        <Header />
        <div class="bg">
            <div id="hdpublic" class="w1000">
                <img src="static/beiyongwangzhi/181011085119.jpg" alt="">
            </div>
            <div id="Game-Menual" class="w1000">
                <div class="left_1">
                    <div class="Game-Menual-box">
                        <a v-for="(item,index) in config.left_list" :key="index" :href="'#'+item.url" target="_self">{{item.name}}</a>
                    </div>
                </div>
                <div class="right_1">

                    <div class="txt">
                        <p style="color:white;">
                            <span style="color:yellow;">我们的客服人员将在一周7天，全天24小时在线为您提供服务。</span> <br>

                            您可通过以下方式与我们联系：<br>

                            驻菲律宾亚洲专线： <span style="color:red;"> 0063-9273611000</span><br>

                            驻菲律宾投诉热线：<span style="color:red;"> 0063-9273611000</span><br>

                            客服专员邮箱：365betzhuanyuan@gmail.com<br>
                            投诉建议邮箱：365bettousu@gmail.com<br>
                            ----------------------------------------------------------------------------------------------------<br>

                            《商务事宜》<br>

                            如果您需要咨询任何媒体方面的事宜，或是想要提供您宝贵的建议，请联系我们的媒体公关部门，并发送邮件到我们的客服邮箱~：365betzhuanyuan@gmail.com 进行咨询建议。<br>

                            想要加入{{config.title}}合营伙伴？想要了解您的福利？欢迎随时与我们取得联系，想做代理代理请加QQ：180348888
                        </p>
                    </div>
            
                </div>
            </div>

        </div>
        <Fotter />
    </div>
</template>

<style scoped>
.txt {
    padding: 50px
}
#publiclinesshua {
    margin: 60px auto 10px auto;
    width: 236px;
    height: 32px;
    line-height: 32px;
    color: #000000;
    background: url(../../assets/beiyongwangzhi/buttonbg.jpg) no-repeat;
    text-align: center;
    font-size: 16px;
}
.hengxian {
    border: 0.5px solid #999;
}
.wangzhi_inp {
    position: absolute;
    margin-left: 787px;
    margin-top: -245px;
    color: #fff;
    font-size: 17px;
}
.wangzhi_inp ul {
    margin-top: 10px;
}
.wangzhi_inp ul li input {
    background: #f000;
    border: 0;
    color: #fff;
}

#hdpublic img {
    width: 100%;
}
.bg {
    width: 100%;
    height: 770px;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#Game-Menual {
    overflow: hidden;
    display: flex;
}
#Game-Menual .left_1{
    flex-shrink: 0;
}
#Game-Menual .right_1{
    width: 100%;
}
#Game-Menual a {
    font-size: 12px;
    display: block;
    height: 33px;
    width: 222px;
    line-height: 33px;
    color: #8f8f8f;
    text-align: center;
    text-decoration: none;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center top;
    margin-bottom: 6px;
}
#Game-Menual a:hover {
    color: #fff;
    background: url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat
        center bottom;
}
#left_down {
    margin: 0;
    height: 40px;
}
#left_down img {
    display: none;
}
/* 1111111111111 */
#lineswwbox img {
    margin-left: 221px;
    margin-top: -348px;
}
</style>

<script>
import Header from '@/components/Header/Header.vue'//头部组件引入
import Fotter from '@/components/Fotter/Fotter.vue'
import { mapState } from "vuex";
export default {
    data() {
        return {
        }
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
}
</script>
