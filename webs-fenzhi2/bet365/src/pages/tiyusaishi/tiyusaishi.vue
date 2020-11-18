<template>
    <div>
        <Header></Header>
        <div id="center">
            <div class="wrapc" id="wrapc">
                <div id="public">
                    <img class="w1000" src="static/tiyusaishi/181010071340.jpg" alt />
                </div>
                <div style="clear:both;"></div>
                <div id="wrapbox">
                    <div id="wrapw">
                        <link href="static/tiyusaishi/hg.png" type="text/css" rel="stylesheet" />
                        <div class="sports-container w1000">
                            <ul class="sports-list">
                                <li class="hg-s">
                                    <a href="javascript:;">
                                        <img src="static/tiyusaishi/tiyu_1.jpg" />
                                        <span class="btn-name" @click="设置游戏('BY','BBIN体育','ball')">波音体育</span>
                                    </a>
                                </li>
                                <li class="ts-s">
                                    <a href="javascript:;">
                                        <img src="static/tiyusaishi/tiyu_2.jpg" />
                                        <span class="btn-name" @click="设置游戏('AG','AG体育','TASSPTA')">AG体育</span>
                                    </a>
                                </li>
                                <li class="ts-s">
                                    <a href="javascript:;">
                                        <img src="static/tiyusaishi/tiyu_3.jpg" />
                                        <span class="btn-name" @click="设置游戏('SS','三昇体育',0)">三昇体育</span>
                                    </a>
                                </li>
                                <li class="ts-s">
                                    <a href="javascript:;">
                                        <img src="static/tiyusaishi/tiyu_4.jpg" />
                                        <span class="btn-name" @click="设置游戏('FY','泛亚电竞',3)">泛亚电竞</span>
                                    </a>
                                </li>
                                <!-- <li class="more-s"></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Fotter></Fotter>
    </div>
</template>

<style scoped >
.el-dialog--center .el-dialog__body {
    padding: 23px 100px 30px;
}
body {
    background: #007251;
}
.container ul li {
    list-style: none;
    width: 300px;
    float: left;
    position: relative;
    top: -369px;
    left: 300px;
    margin-left: 20px;
}
.saishi_BBIN img {
    position: absolute;
    left: 0px;
}
#center {
    margin: 0;
    padding: 0;
    height: auto;
    overflow: hidden;
}
#wrapbox {
    margin: 0;
    padding: 0;
    height: auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    overflow: hidden;
    height: 583px;
}
#wrapw {
    height: auto;
    margin: 0 auto;
    padding-bottom: 10px;
}

#sportwrap {
    background: url();
}
#sportbox {
    width: 1000px;
    margin: 0 auto;
    height: auto;
}
/* background:url(../../assets/tiyusaishi/181010071340.jpg) no-repeat center top; */
#public {
    height: 180px;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
    text-align: center;
}
#hdpbox {
    position: absolute;
    top: 21px;
    left: 21px;
    width: 208px;
    height: 132px;
}
/* */
.sports-container {
    padding-top: 55px;
    display: block;
    margin: 0 auto;
}
.sports-list {
    list-style: none;
    display: flex;
}
.sports-list li {
    position: relative;
    display: inline-block;
    background-image: url(../../assets/tiyusaishi/border.png) ;
    background-size: 100% 100%;
    padding-bottom: 30px;
    width: 25%;
    margin: 0px 5px;
    padding: 13px;
}
.sports-list li:hover {
    background-image : url(../../assets/tiyusaishi/borderh.png);
}
.sports-list li a {
    display: block;
    width: 100%;
    position: relative;
}
.sports-list li a.sp-rule {
    width: 70px;
    height: 28px;
    border: 2px solid #f1a111;
    border-radius: 6px;
    position: absolute;
    right: 36px;
    bottom: 61px;
    background: #85692d;
    z-index: 100;
    color: #eea010;
    line-height: 28px;
    font-size: 16px;
}
.sports-list li a.sp-rule:hover {
    border: 2px solid #dc0303;
    text-decoration: none;
}
.sports-list li img {
    width: 100%;
}
.sports-list li span {
    display: block;
    position: absolute;
    bottom: -42px;
    left: 0px;
    right: 0px;
    width: 220px;
    height: 60px;
    margin: 0px auto;
    text-align: center;
    background-image: url(../../assets/tiyusaishi/btn.png);
    background-size: 100% 100%;
    color: #fff;
    font-size: 20px;
    line-height: 60px;
    font-weight: bold;
}
.sports-list li:hover span {
    background: url(../../assets/tiyusaishi/btnh.png) no-repeat;
}
.sports-list li.more-s {
    background-image: url(../../assets/tiyusaishi/more.png);
}
</style>

<script>
import { api_密码登录, api_Online, api_退出登录 } from "@/api/登录接口.js";
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
import axios from "axios";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            input: ""
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            待进入游戏: "待进入游戏"
        })
    },
    methods: {
        ...mapActions({
            Online: "Online",
            获取平台余额: "获取平台余额",
            设置待进入游戏: "设置待进入游戏"
        }),
        ...mapMutations({
            修改state: "修改state"
        }),
        显示游戏弹框() {
            //第一步
            this.修改state(["显示进入游戏弹框", true]);
            // 第二部
            this.修改state(["待进入游戏", { name: "name" }]);
            //下进三步
            // this.获取平台余额({'type':''}).then(x=>{
            //           this.修改state(['Moneymin',x.data.msg]);
            //       }).catch(err=>{});
        },
        设置游戏(type, name, id) {
            var obj = {
                name: name,
                type: type,
                id: id,
                金额: 0
            };
            this.设置待进入游戏(obj);
            if (!this.userInfo.UserId) {
                this.$message({
                    message: "请登录",
                    type: "warning"
                });
            }
        }
    },
    components: {
        // 注册组件
        Header,
        Fotter
    }
};
</script>
