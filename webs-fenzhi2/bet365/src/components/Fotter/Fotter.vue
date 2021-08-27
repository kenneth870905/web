<template>
    <div>
        <div class="footer">
            <div class="footer_2 w1000">
                <div class="honlogo">
                    <!-- <img src="../assets/btn_join_us.png" alt=""> -->
                </div>
                <div class="foter_txt">
                    <router-link v-for="(item,index) in config.navfotter_list" :key="index" :to="item.url">{{item.name}} |</router-link>
                    <!-- <a :href="item.url" v-for="(item,index) in config.navfotter_list" tag="a" :key="index">{{item.name}} |</a> -->
                    <span>All Rights Reserved2018 {{config.title}}【亚洲版】</span>
                </div>
            </div>
            <!--两侧广告-->
        </div>
        <img class="img1" src="static/public_img/190426063900.gif" v-show="show" @click="show1()" />
        <a href="javascript:;" target="_blank">
            <img class="img1 img2" v-if="show_right" @click="del()" src="static/public_img/190426063909.gif" />
        </a>
    </div>
</template>


<style scoped>

.footer {
    width: 100%;
    height: 90px;
    background: #004532;
    position: relative;
}
.footer .footer_2{
    position: relative;
}
.honlogo {
    background: url(../../assets/index_img/honlogo.png) no-repeat;
    height: 50px;
}
.foter_txt {
    font-size: 12px;
    position: absolute;
    top: 40px;
    right: 0px;
    background: #004532;
}
.foter_txt a {
    background: #004532;
    color: #80a298;
    padding-left: 10px;
}
.foter_txt a:hover {
    color: #64c399;
}
.foter_txt span {
    display: block;
    margin-top: 10px;
    margin-left: 325px;
    background: #004532;
    color: #80a298;
}
.gundong_txt {
    width: 273px;
    height: 50px;
    position: absolute;
    top: 476px;
    left: 444px;
    z-index: 100;
    opacity: 0.8;
}
/* 两侧广告*/
/* .left_advertising{
    position: absolute;
    top:-739px;
    z-index: 100;
}
.right_advertising{
    position: absolute;
    top:-739px;
    left:1738px;
    z-index: 100;
} */
.img1 {
    position: absolute;
    top: 120px;
    left: 5px;
    z-index: 2;
}
.img1.img2 {
    right: 5px;
    left: auto;
}
</style>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            show: true,
            show_right: true
        }
    },
    computed: {
        ...mapState({
            config:"config" 
        })
    },
    methods: {
        del() {
            console.log(11)
            this.show_right = !this.show_right
        },
        show1() {
            console.log(111)
            this.show = !this.show
        },
    }
}
//侧边广告跟随滚动 
var imgArr = document.getElementsByClassName("img1");
window.onscroll = function () {
    var val = window.pageYOffset;
    animate(imgArr[0], val + 80);
    animate(imgArr[1], val + 80);
}
//滑动动画封装
function animate(ele, target) {
    clearInterval(ele.timer);
    //console.log(ele.timer)
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        ele.style.top = ele.offsetTop + step + "px";
        if (Math.abs(target - ele.offsetTop) < Math.abs(step)) {
            ele.style.top = target + "px";
            clearInterval(ele.timer);
        }
    }, 18);
}
</script>
