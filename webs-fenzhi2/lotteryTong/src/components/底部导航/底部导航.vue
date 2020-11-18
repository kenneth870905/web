<template>
    <div class="foor_nav" v-if="!$route.meta.隐藏尾部导航" :class="{bjw:皮肤切换==false, bjb:皮肤切换==true}">
        <ul class="foor_nav_ul">
            <!-- <li>{{皮肤切换}}</li> -->
            <li :class="{activecls:selectLab =='/' && 皮肤切换==true, activeclsw:selectLab =='/' && 皮肤切换==false}" @click="go('/')">
                <div class="icon_box"> 
                    <img  v-if="皮肤切换" :src="selectLab =='/' ? navImg.zynav.zyimg : navImg.zynav.zyimgact" alt="">
                    <img  v-if="!皮肤切换" :src="selectLab =='/' ? navImg.zynav.zyimgactw : navImg.zynav.zyimgw" alt="">
                </div>
                <div class="icon_title">主页</div>
            </li>

            <li :class="{activecls:selectLab =='/open' && 皮肤切换==true, activeclsw:selectLab =='/open' && 皮肤切换==false}" @click="go('/open')">
                <div class="icon_box"> 
                    <img  v-if="皮肤切换" :src="selectLab =='/open' ? navImg.kjnav.kjimgact : navImg.kjnav.kjimg" alt=""> 
                    <img v-if="!皮肤切换"  :src="selectLab =='/open' ? navImg.kjnav.kjimgactw : navImg.kjnav.kjimgw" alt="">
                 </div>
                <div class="icon_title">开奖</div>
            </li>
            <li  class="gouc" :class="{activecls:selectLab =='/buyLottery' && 皮肤切换==true, activeclsw:selectLab =='/buyLottery' && 皮肤切换==false}" @click="go('/buyLottery')">
                <div class="icon_gc">
                     <img  v-if="皮肤切换"  :src="navImg.gcnav.gcimg" alt=""> 
                      <img  v-if="!皮肤切换"  :src="navImg.gcnav.gcimgw" alt="">
                </div>

                <div class="icon_title">购彩</div>
            </li>
            <li :class="{activecls:selectLab =='/documentary' && 皮肤切换==true, activeclsw:selectLab =='/documentary' && 皮肤切换==false}" @click="go('/documentary')">
                <div class="icon_box"> 
                    <img  v-if="皮肤切换" src="../../assets/img/qit/bai/icon_gd_1.png" alt=""> 
                    <img  v-if="!皮肤切换" src="../../assets/img/qit/hei/icon_gd_2.png" alt=""> 
                    </div>
                <div class="icon_title">跟单</div>
            </li>

            <li :class="{activecls:selectLab =='/my' && 皮肤切换==true, activeclsw:selectLab =='/my' && 皮肤切换==false}" @click="go('/my')">
                <div class="icon_box"> 
                    <img v-if="皮肤切换" :src="selectLab =='/my' ? navImg.wdnav.wdimgact : navImg.wdnav.wdimg" alt="">
                    <img v-if="!皮肤切换" :src="selectLab =='/my' ? navImg.wdnav.wdimgactw : navImg.wdnav.wdimgw" alt="">
                </div>
                <div class="icon_title">我的</div>
            </li>
        </ul>
    </div>

</template>
<script>
 import {mapState} from 'vuex'
export default {
    data() {
        return {
            navImg:{
                kjnav: {
                            kjimg: require('@/assets/img/qit/bai/icon_kj_1.png'),
                            kjimgact: require('@/assets/img/qit/bai/icon_kj_act1.png'),

                            kjimgw: require('@/assets/img/qit/hei/icon_kj_2.png'),
                            kjimgactw: require('@/assets/img/qit/hei/icon_kj_act2.png'),
                        },
                gcnav:{
                        gcimg: require('@/assets/img/qit/bai/icon_gc_1.png'),
                        gcimgw: require('@/assets/img/qit/hei/icon_gc_2.png'),
                },

                wdnav: {
                           wdimg: require('@/assets/img/qit/bai/icon_wd_1.png'),
                           wdimgact: require('@/assets/img/qit/bai/icon_wd_act1.png'),

                            wdimgw: require('@/assets/img/qit/hei/icon_wd_2.png'),
                           wdimgactw: require('@/assets/img/qit/hei/icon_wd_act2.png')
                        },

                zynav: {
                        zyimg: require('@/assets/img/qit/bai/icon_zy_1.png'),
                        zyimgact: require('@/assets/img/qit/bai/icon_zy_act1.png'),

                        zyimgw: require('@/assets/img/qit/hei/icon_zy_2.png'),
                        zyimgactw: require('@/assets/img/qit/hei/icon_zy_act2.png')
                },

                // gdnav: {
                //         heiimg: require('@/assets/img/qit/bai/icon_zy_1.png'),
                //         : require('@/assets/img/qit/bai/icon_zy_act1.png'),

                       
                // },
            }
        }
    },
    components: { // 注册组件
        
    },
    created() {
    },
    computed: {
        ...mapState({
            皮肤切换:'皮肤切换'
        }),
        selectLab(){
            return this.$route.path
        }
    },
    methods: {
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        }
    }
}
</script>




<style lang="scss" scoped>
.activecls {
    color: rgb(31, 182, 241) !important;
}
.activeclsw{
    color:goldenrod ortant;
}
.bjw{
    background:black;

}
.bjb{
    background:#ffffff;
}
.foor_nav {
    position: fixed;
    border-top:1px solid #e5e5e5;

    left: 0px;
    bottom: 0px;
    z-index: 10;
    height: _vw(50);
    display: flex;
    align-items: center;
    width: 100%;
    .foor_nav_ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .gouc{
            padding-top:_vw(21) !important;
                position: relative;

           .icon_gc{
                position:absolute;
                  top:_vw(-22);
                  left:50%;
                  width:_vw(46) !important;
                  height:_vw(46) !important;
                  margin-left: _vw(-23);
                  z-index:60 !important;
                  img{ 
                    width: 100%;
                    height: 100%;
                 }
            }
        }
        li {
            text-align: center;
            color: #8d8ba4;
            .icon_box{
                 width:_vw(21) ;
                 height:_vw(21); 
                 margin:0px auto ;

                 img{ 
                    width: 100%;
                    height: 100%;
                 }
            }
            .icon_title{
             font-size:_vw(14);
             text-align: center;
            }
        }
    }
}
</style>