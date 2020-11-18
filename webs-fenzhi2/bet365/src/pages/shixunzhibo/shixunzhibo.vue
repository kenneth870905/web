<template>
    <div>
        <Header></Header>
        <div class="bg_shixun">
            <div id="top1_img_sx" class="w1000">
                <img src="static/shixunzhibo/181011085456.jpg" alt="" srcset="">
            </div>

            <div class="youxi_list w1000">
                <ul id="publicvisbox">
                    <li @click="设置游戏('AG','AG旗舰厅',1)">
                        <div>
                            <a href="javascript:;" class="newab img_box" ></a>
                        </div>
                        <p>
                            <a href="#"  class="start">免费试玩</a>
                            <span class="mfswshu">|</span>
                            <a href="#">AG旗舰厅</a>
                        </p>
                    </li>
                    <li @click="设置游戏('BY','BBIN娱乐厅','live')">
                        <div>
                            <a href="javascript:;" class="newbbin img_box" ></a>
                        </div>
                        <p>
                            <a href="#"  class="start">免费试玩</a>
                            <span class="mfswshu">|</span>
                            <a href="#">BBIN馆简介</a>
                        </p>
                    </li>
                    <li @click="设置游戏('BG','BG视讯大厅',1)">
                        <div>
                            <a href="javascript:;" class="newbv img_box"></a>
                        </div>
                        <p>
                            <a href="javascript:;" class="start">免费试玩</a>
                            <span class="mfswshu">|</span>
                            <a href="javascript:;">BG大游馆简介</a>
                        </p>
                    </li>
                    <li @click="设置游戏('AG','AG国际厅',2)">
                        <div>
                            <a href="javascript:;" class="newguoji img_box"></a>
                        </div>
                        <p>
                            <a href="javascript:;" class="start">免费试玩</a>
                            <span class="mfswshu">|</span>
                            <a href="javascript:;">AG国际馆简介</a>
                        </p>
                    </li>
                    <div class="cb"></div>
                </ul>
            </div>
        </div>

        <Fotter></Fotter>
    </div>
</template>

<style scoped>

.cb{
    clear: both;
}
.youxi_list {
    margin: 0px auto;
}
.bg_shixun {
    width: 100%;
    margin: 0 auto;
    background: url(../../assets/tiyusaishi/c_bg_x01.jpg);
    position: relative;
} /*通用背景*/
#top2_img {
    margin: 0 auto;
    margin-top: 10px;
}
#top2_img img{
    width: 100%;
}
#top1_img_sx {
    margin: 0 auto;
    position: relative;
}
#top1_img_sx img{
    width: 100%;
}

#publicvisbox li {
    float: left;
    width: 50%;
    margin-top: 6px;
    padding: 2px;
    box-sizing: border-box;
}
#publicvisbox li>div {
    background-image: url(../../assets/shixunzhibo/vlibg.png);
    padding: 5px;
}

#publicvisbox li p {
    margin-top: 5px;
    height: 39px;
    line-height: 39px;
    font-family: "微软雅黑";
}
#publicvisbox a {
    color: #ffffff;
}
#publicvisbox li p :nth-child(2) {
    color: #569598;
}
#publicvisbox li p :nth-child(3) {
    font-size: 12px;
}

#maintence {
    width: 700px;
}
#gameNotice {
    color: red;
}

#sportsbox {
    width: 1000px;
    margin: 0 auto;
    height: auto;
}
#publicvisbox .img_box{
    background-size:100% auto;
    background-position: left top;
    height: 233px;
    display: block;
}
#publicvisbox .img_box:hover{
    background-position: left bottom;
}
#publicvisbox a.newab {
    background-image: url(../../assets/shixunzhibo/va.png);
}
#publicvisbox a.newbbin {
    background-image: url(../../assets/shixunzhibo/vbbin.png);
}

#publicvisbox a.newbv {
    background-image: url(../../assets/shixunzhibo/visbv.png);
}
#publicvisbox a.newds {
    background-image: url(../../assets/shixunzhibo/vds.png);
}
#publicvisbox a.newguoji {
    background-image: url(../../assets/shixunzhibo/vag.png);
}
</style>

<script>
import Header from "@/components/Header/Header.vue";
import Fotter from "@/components/Fotter/Fotter.vue";
import { mapActions, mapState } from 'vuex';
export default {
    components: {
        // 注册组件
        Header,
        Fotter
    },
    computed:{
        ...mapState({
            待进入游戏:'待进入游戏',
            userInfo:'userInfo'
        })
    },  
    methods:{
        ...mapActions({
            设置待进入游戏:'设置待进入游戏'
        }),
        设置游戏(type,name,id,){
            var obj={
                    name:name,
                    type:type,
                    id:id,
                    金额:0
                }
            this.设置待进入游戏(obj)
             if (!this.userInfo.UserId) {
                 this.$message({
                 message: '请登录',
                 type: 'warning'
        });
      }
        }
    }
};
</script>