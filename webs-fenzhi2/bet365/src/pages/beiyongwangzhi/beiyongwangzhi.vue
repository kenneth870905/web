<template>
    <div>
        <Header />
        <div class="bg">
            <div id="hdpublic" class="w1000">
                <img src="static/beiyongwangzhi/181011085119.jpg" alt />
            </div>
            <div id="Game-Menual" class="w1000">
                <div class="list1">
                    <div class="Game-Menual-box" v-for="(item,index) in config.left_list" :key="index">
                        <a :href="'#'+ item.url">{{item.name}}</a>
                    </div>
                </div>
                <div class="right_1">
                    <div id="lineswwbox">
                        <img src="static/beiyongwangzhi/bj2.png" alt />
                    </div>
                    
                    <div class="wangzhi_inp1">
                        <ul>
                            <li v-for="(item, index) in config.cesu_list" :key="index">
                                <input style="font-size:17px; color:yellow;" type="text" :value="item.url" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;->时间:&nbsp;&nbsp;
                                <img :src="item.url+'/'+time" @error="error(item)" alt />
                                <span>
                                    {{计算时间(item.time)}}ms
                                </span>
                                <a class="linesboxa" :href="item.url"  target="_blank">打开链接</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div></div>
        </div>
        <Fotter />
    </div>
</template>


<style scoped>
.linesboxa {
    display: block;
    width: 75px !important;
    height: 26px;
    font-size: 16px;
    text-align: center;
    background: url(../../assets/beiyongwangzhi/buttonbg.jpg) no-repeat !important;
    color: #000000;
    position: relative;
} 
.time {
    float: left;
}
.cesu {
    position: absolute;
    top: 315px;
    left: 796px;
    width: 100%;
    height: 230px;
    color: yellow;
}

input {
    font-size: 12px;
    padding: 0 5px;
    line-height: 21px;
    font-family: tahoma;
    border: 1px solid #ccc;
    height: 21px;
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
.wangzhi_inp1 {
    color: aqua;
    font-size: 17px;
    display: flex;
    justify-content: center;
}
.wangzhi_inp1 span{
    display: inline-block;
    width: 85px;
}
.wangzhi_inp1 ul {
    margin-top: 10px;
}
.wangzhi_inp1 ul li{
    display: flex;
    align-items: center;
}
.wangzhi_inp1 ul li input {
    background: #f000;
    border: 0;
    color: #fff;
}
.wangzhi_inp1 ul li a{
    margin-left: 80px;
   
}

#hdpublic img {
    width: 100%;
}
.bg {
    min-height: calc(100vh - 90px - 80px);
    width: 100%;
    height: auto;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#Game-Menual {
    height: auto;
    display: flex;
}
#Game-Menual .list1{
    flex-shrink: 0;
}
#Game-Menual .right_1{
    width: 100%;
    padding-bottom: 50px;
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

#lineswwbox {
    text-align: center;
    height: 160px;
    overflow: hidden;
}
</style>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";

export default {
    data() {
        return {
            config: config,
            time: "",
            
        };
    },
    components: {
        // 注册组件
        Header,
        Fotter
    },
    methods: {
        计算时间(time) {
            if (!time) {
                return "测速中";
            } else {
                return time - this.time < 200
                    ? time - this.time
                    : time - this.time;
            }
        },
        error(item) {
            console.log("结束");
            var date1 = new Date();
            item.time = date1.getTime();
        }
    },
    mounted() {
        var date = new Date();
        this.time = date.getTime();
    }
    // mounted() {
    // var tim = 1;
    // setInterval(tim++, 100);
    // var b = 1;
    // var autourl = new Array();
    // autourl[1] = "http://m.t2209.com/#module/common/action/home";
    // autourl[2] = "https://0698aa.com/M1/#/yxdt";
    // autourl[3] = "https://www.baidu.com";
    // autourl[4] = "https://0698aa.com/Index/#/chess";

    // function butt() {
    //     document.write(
    //         "<form    name=autof style=' position:absolute; top:430px; left:750px; padding:0px; margin:0px;    color: yellow;'>"
    //     );
    //     for (var i = 1; i < autourl.length; i++)
    //         document.write(
    //             "<input type=text name=txt" +
    //                 i +
    //                 " size=25 style='margin-top: 15px;    margin-left: 50px; border-radius: 20px; color:#999;' value=测试中…> =》<input type=text name=url" +
    //                 i +
    //                 " style='border-radius: 20px;size=40;margin-left: 50px;' > =》<input type=button value=GO onclick=window.open(this.form.url" +
    //                 i +
    //                 ".value)><br>"
    //         );
    //     document.write(
    //         "<input onclick='window.location.reload()' type=submit value='刷新' style=' margin-left: 50px;margin-top:10px;border-radius: 20px;'></form>"
    //     );
    // }
    // butt();
    // function auto(url) {
    //     document.forms[0]["url" + b].value = url;
    //     if (tim > 200) {
    //         document.forms[0]["txt" + b].value = "网址" + b + "链接超时";
    //     } else {
    //         document.forms[0]["txt" + b].value =
    //             "网址" + b + ": 访问速度" + tim * 10 + "ms";
    //     }
    //     b++;
    // }
    // function run() {
    //     for (var i = 1; i < autourl.length; i++)
    //         document.write(
    //             "<img src=" +
    //                 autourl[i] +
    //                 "/" +
    //                 Math.random() +
    //                 " width=1 height=1 onerror=auto('" +
    //                 autourl[i] +
    //                 "') style='display:none'>"
    //         );
    // }
    // run();
    // }
};
</script>