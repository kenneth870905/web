<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">主题更换</h1>
        </header>
        <div class="mui-content">
            <ul class="list">
                <li @click="更换主题(item)" :class="{'active':用户主题色.color==item.color}" v-for="(item, index) in list" :key="index" >
                    <div class="img_box">
                        <img :src="item.img" alt="" srcset="">
                    </div>
                    <i class="icon iconfont icon-gouxuanzhong"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            list:[
                {img:config.img_url+"static/image/my/zhuti_1.png",color:"#ec0909",name:"玫瑰红"},
                {img:config.img_url+"static/image/my/zhuti_2.png",color:"#df4f1a",name:"珊瑚色"},
                {img:config.img_url+"static/image/my/zhuti_3.png",color:"#14bd58",name:"草绿"},
                {img:config.img_url+"static/image/my/zhuti_4.png",color:"#4169E1",name:"宝石蓝"},
                {img:config.img_url+"static/image/my/zhuti_5.png",color:"#d09700",name:"金麒麟"},
                {img:config.img_url+"static/image/my/zhuti_6.png",color:"#8A2BE2",name:"紫罗兰"},
                {img:config.img_url+"static/image/my/zhuti_7.png",color:"#FF4500",name:"红橙"},
                {img:config.img_url+"static/image/my/zhuti_8.png",color:"#ec0000",name:"罂粟红"},
                {img:config.img_url+"static/image/my/zhuti_9.png",color:"#213862",name:"高贵蓝"},
                {img:config.img_url+"static/image/my/zhuti_10.png",color:"#333333",name:"炫酷黑"}
            ]
        }
    },
    computed: {
        ...mapState({
            偏好设置:x=>x.user.偏好设置
        }),
        ...mapGetters({
            用户主题色:'user/用户主题色' 
        })
    },
    methods: {
        ...mapMutations({
            设置主题:'user/设置主题'
        }),
        更换主题(item){
            this.设置主题(item)
            if(this.$route.query.back){
                history.back()
            }
            // this.偏好设置.主题色=item
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    padding: _vw(20) _vw(10);
    li{
        position: relative;
        margin: 0px 0px _vw(15) 0px;
        height: _vw(50);
        overflow: hidden;
        .img_box{
            margin: 0px _vw(-4);
        }
        i{
            display: none;
            position: absolute;
            top: 0px;
            left: 0px;
            font-size: _vw(40);
            color: #ffffff;
            line-height: _vw(40);
        }
    }
    li.active{
        border: 1px solid $color;
        border-radius: _vw(5);
        i{
            display: block;
        }
    }
    img{
        width: 100%;
    }
}
</style>
