<template>
    <!-- <div class="tiyu" :style="`background-image: url(${config.img_url}static/image/tiyu/bg1.jpg)`"> -->
    <div class="tiyu">
        <!-- <div class="遮罩"></div> -->
        <ul>
            <li v-for="(item, index) in obj.children" @click="跳转(item)" :key="index">
                <!-- <img v-if="!obj.noSub && 显示图片" v-lazy="config.img_url+imgheader+item.imgid+imgtype" :key="config.img_url+item.imgid"> -->
                <!-- <img v-lazy="`${config.img_url}static/image/tiyu/${item.imgid}.jpg`" :key="config.img_url+item.imgid"> -->
                <img :src="`${config.img_url}static/image/home/tiyu/${item.imgid}.jpg`" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState , mapActions } from "vuex";
export default {
    name:"",
    props:{
        obj:{
            default:()=>{}
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo:x=>x.user.userinfo,
        })
    },
    methods: {
        ...mapActions({
            设置类型:"进入游戏/设置类型"
        }),
        跳转(item){
            if(item.news){
                this.$router.push(item.path)
            }else if(!item.彩票){
                if(this.userinfo.UserId){
                    this.设置类型(item)
                }else{
                    this.$router.push('/login')
                }
            }else if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.id}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?i='+item.id+'&t='+this.彩票玩法)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.tiyu{
    position: relative;
    // padding: _vw(230) _vw(5) _vw(5);
    padding: 0px _vw(10) _vw(5);
    background-size: cover;
    background-position: center;
    .遮罩{
        position: absolute;
        top: _vw(180);
        left: 0px;
        width: 100%;
        height: _vw(50);
        background: linear-gradient(0deg, #0c893d, #14903d00);
    }
    li{
        font-size: 0px;
        margin: 0px 0px _vw(10);
        // border-bottom: 1px solid #000000;
        border-radius: 5px;
        // box-shadow: 0 0.05333rem 0.21333rem rgba(50,0,0,.2);
        box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.53);
        img{
            height: _vw(94);
            width: 100%;
            border-radius: 5px;
        }
    }
}
</style>
