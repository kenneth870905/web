<template>
    <div>
        <!-- <header class="mui-bar mui-bar-transparent"> -->
            <!-- <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <!-- <h1 class="mui-title">{{$route.meta.title}}</h1> -->
            <!-- <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">类型</button> -->
        <!-- </header> -->
        <div class="返回" @click="返回()">返回</div>
        <div class="mui-content mui-fullscreen" :style="{'background-image': 'url('+config.img_url+'image/teyaojiabin/bg.png'+')'}">
            <img class="bg" :src="config.img_url+'image/teyaojiabin/bg.png'" alt="" srcset="">
            <img class="bg1" :src="config.img_url+'image/teyaojiabin/fangan.png'" alt="" srcset="">
            <ul class="list">
                <li v-for="(item, index) in 6" :key="index">
                    <img class="img_1" :src="config.img_url+'image/teyaojiabin/'+item+'.png'" alt="" srcset="">
                    <img v-if="index < times" class="img_2" :src="config.img_url+'image/teyaojiabin/yilingqu.png'" alt="" srcset="">
                </li>
            </ul>
            <div class="btn_1">
                <img @click="点击领取()" src="image/teyaojiabin/btn_1.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
import { api_领取 , api_获取 } from "@/api/特邀嘉宾.js";
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            times:0
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        返回(){
            history.back();
        },
        点击领取(){
            api_领取().then(x=>{
                if(x.data.code==0){
                    this.$toast('领取成功')
                }else{
                    this.$toast(x.data.msg)
                }
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
            })
        },
        获取数据(){
            api_获取().then(x=>{
                console.log(x)
                if (x.data.IsTrue) {
                } else {
                }
                if(x.data.times){
                    this.times = x.data.times;
                }
            }).catch(err=>{
                
            })
        }
    },
    mounted() {
        this.获取数据();
        
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background-size: 100% auto;
    
}
.返回{
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0,0,0,0.7);
    color: #ffffff;
    z-index: 2;
    border-radius: 3px;
}
.bg{
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}
.bg1{
    width: 50%;
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    margin: auto;
}
.list{
    position: relative;
    z-index: 1;
    display: grid;
    padding: 351px 60px 0px;
    // grid-template-rows: 50% 50%;
    grid-template-columns: 50% 50%;
    >li{
        margin: 0px 3px;
        position: relative;
        .img_1{
            width: 100%;
        }
        .img_2{
            position: absolute;
            width: 80%;
            top: 0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
            margin: auto;
            pointer-events: none;
        }
    }
}

.btn_1{
    position: relative;
    z-index: 1;
    text-align: center;
    margin: 15px 0px 10px;
    img{
        width:180px;
    }
}

</style>